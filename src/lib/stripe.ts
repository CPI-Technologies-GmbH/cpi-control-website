import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY not set");
    _stripe = new Stripe(key, {
      apiVersion: "2024-12-18.acacia" as any,
    });
  }
  return _stripe;
}

export const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

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
