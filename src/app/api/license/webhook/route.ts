import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ensureTables, createLicenseKey } from "@/lib/license-db";
import { sql } from "@vercel/postgres";

function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const digest = hmac.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("LEMONSQUEEZY_WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-signature");

    if (!verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    await ensureTables();

    const event = JSON.parse(rawBody);
    const eventName = event.meta?.event_name;
    const data = event.data?.attributes;

    switch (eventName) {
      case "order_created": {
        // Determine plan from variant/product
        const email = data?.user_email;
        const orderId = String(event.data?.id || "");
        const variantName = (data?.first_order_item?.variant_name || "").toLowerCase();

        let plan = "free";
        if (variantName.includes("unlimited")) plan = "unlimited";
        else if (variantName.includes("team")) plan = "team";

        const license = await createLicenseKey(plan, email, orderId);
        console.log(`License created: ${license.key} (${plan}) for ${email}`);

        // TODO: Send email with license key via SendGrid/Resend/etc.
        break;
      }

      case "subscription_payment_success": {
        // Extend expiry by 1 year
        const subId = String(event.data?.id || "");
        await sql`
          UPDATE license_keys
          SET expires_at = NOW() + INTERVAL '1 year', status = 'active'
          WHERE lemon_subscription_id = ${subId}
        `;
        break;
      }

      case "subscription_expired":
      case "subscription_cancelled": {
        const subId = String(event.data?.id || "");
        await sql`
          UPDATE license_keys
          SET status = 'expired'
          WHERE lemon_subscription_id = ${subId}
        `;
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
