import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");
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
