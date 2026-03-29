import { NextRequest, NextResponse } from "next/server";
import { stripe, priceIdFromPlan } from "@/lib/stripe";
import { ensureTables, findLicenseByEmail } from "@/lib/license-db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://cpi-control-website.vercel.app";

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const { email, plan } = await request.json();

    if (!email || !plan) {
      return NextResponse.json({ error: "email and plan are required" }, { status: 400 });
    }

    if (plan === "free") {
      return NextResponse.json({ error: "Free plan does not require checkout" }, { status: 400 });
    }

    const priceId = priceIdFromPlan(plan);
    if (!priceId) {
      return NextResponse.json({ error: `No Stripe price configured for plan: ${plan}` }, { status: 400 });
    }

    // Check if user already has an active license — reuse Stripe customer
    const existing = await findLicenseByEmail(email);
    const customerOptions: Record<string, unknown> = {};
    if (existing?.stripe_customer_id) {
      customerOptions.customer = existing.stripe_customer_id;
    } else {
      customerOptions.customer_email = email;
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      ...customerOptions,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      tax_id_collection: { enabled: true },
      success_url: `${BASE_URL}/license/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/#pricing`,
      metadata: {
        plan,
        email,
      },
      subscription_data: {
        metadata: {
          plan,
          email,
        },
      },
    });

    return NextResponse.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
