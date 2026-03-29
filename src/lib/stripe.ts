import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY not set — Stripe functionality disabled");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-18.acacia",
});

export const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Map Stripe Price IDs to plan names.
 * Set these via environment variables:
 *   STRIPE_PRICE_TEAM=price_xxx
 *   STRIPE_PRICE_UNLIMITED=price_yyy
 */
export function planFromPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_PRICE_TEAM) return "team";
  if (priceId === process.env.STRIPE_PRICE_UNLIMITED) return "unlimited";
  return "free";
}

export function priceIdFromPlan(plan: string): string | null {
  if (plan === "team") return process.env.STRIPE_PRICE_TEAM || null;
  if (plan === "unlimited") return process.env.STRIPE_PRICE_UNLIMITED || null;
  return null;
}
