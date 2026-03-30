import { NextRequest, NextResponse } from "next/server";
import { getStripe, WEBHOOK_SECRET, planFromPriceId } from "@/lib/stripe";
import {
  ensureTables,
  createLicense,
  findLicenseByStripeSubscription,
  findLicenseByStripeCustomer,
  updateLicense,
} from "@/lib/license-db";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    await ensureTables();

    switch (event.type) {
      // ── Checkout completed → create license ──
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const email = session.metadata?.email || session.customer_details?.email || "";
        const plan = session.metadata?.plan || "team";
        const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id || "";
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id || "";

        // Check if license already exists for this subscription (idempotency)
        const existing = await findLicenseByStripeSubscription(subscriptionId);
        if (!existing) {
          const license = await createLicense({
            email,
            plan,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripeCheckoutSessionId: session.id,
          });
          console.log(`License created: ${license.key} (${plan}) for ${email}`);
        }
        break;
      }

      // ── Subscription updated (upgrade/downgrade) ──
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const license = await findLicenseByStripeSubscription(subscription.id);
        if (!license) break;

        const priceId = subscription.items.data[0]?.price?.id;
        const newPlan = priceId ? planFromPriceId(priceId) : license.plan;

        const updates: Record<string, unknown> = {
          plan: newPlan,
        };

        if (subscription.status === "active" || subscription.status === "trialing") {
          updates.status = "active";
          updates.expiresAt = new Date((subscription as any).current_period_end * 1000).toISOString();
          updates.cancelledAt = null;
        } else if (subscription.status === "past_due") {
          updates.status = "past_due";
        } else if (subscription.status === "canceled" || subscription.status === "unpaid") {
          updates.status = "expired";
          updates.cancelledAt = new Date().toISOString();
        }

        // Handle cancel_at_period_end (user chose to cancel but still has access)
        if ((subscription as any).cancel_at_period_end) {
          updates.cancelledAt = new Date().toISOString();
          // Don't expire yet — still active until period end
        }

        await updateLicense(license.id, updates);
        console.log(`License ${license.key} updated: plan=${newPlan}, status=${updates.status || license.status}`);
        break;
      }

      // ── Subscription deleted (final cancellation) ──
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const license = await findLicenseByStripeSubscription(subscription.id);
        if (!license) break;

        await updateLicense(license.id, {
          status: "expired",
          cancelledAt: new Date().toISOString(),
        });
        console.log(`License ${license.key} expired (subscription deleted)`);
        break;
      }

      // ── Invoice paid (renewal) ──
      case "invoice.paid": {
        const invoice = event.data.object as any;
        if (!invoice.subscription) break;

        const subId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
        if (!subId) break;

        const license = await findLicenseByStripeSubscription(subId);
        if (!license) break;

        // Extend expiry
        const periodEnd = invoice.lines.data[0]?.period?.end;
        if (periodEnd) {
          await updateLicense(license.id, {
            status: "active",
            expiresAt: new Date(periodEnd * 1000).toISOString(),
          });
          console.log(`License ${license.key} renewed until ${new Date(periodEnd * 1000).toISOString()}`);
        }
        break;
      }

      // ── Payment failed ──
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        if (!invoice.subscription) break;

        const subId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
        if (!subId) break;

        const license = await findLicenseByStripeSubscription(subId);
        if (license) {
          await updateLicense(license.id, { status: "past_due" });
          console.log(`License ${license.key} payment failed — status set to past_due`);
        }
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
