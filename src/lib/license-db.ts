import { sql } from "@vercel/postgres";
import crypto from "crypto";

// ─── Plan Configuration ──────────────────────────────────────────────────

export const PLANS = {
  free: {
    name: "Free",
    maxServices: 50,
    maxAgents: 1,
    maxActivations: 2,
    stripePriceId: null, // No Stripe product for free
  },
  team: {
    name: "Team",
    maxServices: 500,
    maxAgents: 3,
    maxActivations: 5,
    stripePriceId: process.env.STRIPE_PRICE_TEAM || null,
  },
  unlimited: {
    name: "Unlimited",
    maxServices: 99999,
    maxAgents: 99,
    maxActivations: 10,
    stripePriceId: process.env.STRIPE_PRICE_UNLIMITED || null,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export function getPlanLimits(plan: string) {
  return PLANS[plan as PlanId] || PLANS.free;
}

// ─── Database Setup ──────────────────────────────────────────────────────

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS license_keys (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      plan VARCHAR(20) NOT NULL DEFAULT 'free',
      status VARCHAR(20) NOT NULL DEFAULT 'active',
      stripe_customer_id VARCHAR(100),
      stripe_subscription_id VARCHAR(100),
      stripe_checkout_session_id VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ,
      cancelled_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS activations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      license_key_id UUID REFERENCES license_keys(id) ON DELETE CASCADE,
      machine_id VARCHAR(255) NOT NULL,
      machine_name VARCHAR(255),
      token VARCHAR(128) UNIQUE NOT NULL,
      activated_at TIMESTAMPTZ DEFAULT NOW(),
      last_validated_at TIMESTAMPTZ DEFAULT NOW(),
      deactivated_at TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_activations_token ON activations(token)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_license_keys_key ON license_keys(key)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_license_keys_email ON license_keys(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_license_keys_stripe_customer ON license_keys(stripe_customer_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_license_keys_stripe_sub ON license_keys(stripe_subscription_id)`;
}

// ─── Key/Token Generation ────────────────────────────────────────────────

export function generateLicenseKey(): string {
  const segments = Array.from({ length: 4 }, () =>
    crypto.randomBytes(2).toString("hex").toUpperCase()
  );
  return `CPI-${segments.join("-")}`;
}

export function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

// ─── License CRUD ────────────────────────────────────────────────────────

export async function createLicense(data: {
  email: string;
  plan: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeCheckoutSessionId?: string;
}) {
  const key = generateLicenseKey();
  const expiresAt = data.plan === "free" ? null : new Date(Date.now() + 365 * 24 * 3600_000).toISOString();
  const { rows } = await sql`
    INSERT INTO license_keys (key, email, plan, stripe_customer_id, stripe_subscription_id, stripe_checkout_session_id, expires_at)
    VALUES (${key}, ${data.email}, ${data.plan}, ${data.stripeCustomerId || null}, ${data.stripeSubscriptionId || null}, ${data.stripeCheckoutSessionId || null}, ${expiresAt})
    RETURNING *
  `;
  return rows[0];
}

export async function findLicenseByKey(key: string) {
  const { rows } = await sql`SELECT * FROM license_keys WHERE key = ${key}`;
  return rows[0] || null;
}

export async function findLicenseByEmail(email: string) {
  const { rows } = await sql`
    SELECT * FROM license_keys WHERE email = ${email} AND status IN ('active', 'past_due')
    ORDER BY created_at DESC LIMIT 1
  `;
  return rows[0] || null;
}

export async function findLicenseByStripeCustomer(customerId: string) {
  const { rows } = await sql`
    SELECT * FROM license_keys WHERE stripe_customer_id = ${customerId}
    ORDER BY created_at DESC LIMIT 1
  `;
  return rows[0] || null;
}

export async function findLicenseByStripeSubscription(subscriptionId: string) {
  const { rows } = await sql`
    SELECT * FROM license_keys WHERE stripe_subscription_id = ${subscriptionId}
  `;
  return rows[0] || null;
}

export async function findLicensesByEmail(email: string) {
  const { rows } = await sql`
    SELECT * FROM license_keys WHERE email = ${email} ORDER BY created_at DESC
  `;
  return rows;
}

export async function updateLicense(id: string, data: Record<string, unknown>) {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.plan !== undefined) { fields.push("plan"); values.push(data.plan); }
  if (data.status !== undefined) { fields.push("status"); values.push(data.status); }
  if (data.stripeCustomerId !== undefined) { fields.push("stripe_customer_id"); values.push(data.stripeCustomerId); }
  if (data.stripeSubscriptionId !== undefined) { fields.push("stripe_subscription_id"); values.push(data.stripeSubscriptionId); }
  if (data.expiresAt !== undefined) { fields.push("expires_at"); values.push(data.expiresAt); }
  if (data.cancelledAt !== undefined) { fields.push("cancelled_at"); values.push(data.cancelledAt); }

  if (fields.length === 0) return;

  // Build dynamic update (safe — field names are from our code, not user input)
  const setClauses = fields.map((f, i) => `${f} = $${i + 2}`).join(", ");
  const query = `UPDATE license_keys SET ${setClauses}, updated_at = NOW() WHERE id = $1::uuid`;
  await sql.query(query, [id, ...values]);
}

// ─── Activation CRUD ─────────────────────────────────────────────────────

export async function findActivationByToken(token: string) {
  const { rows } = await sql`
    SELECT a.*, l.plan, l.status as license_status, l.expires_at, l.email
    FROM activations a
    JOIN license_keys l ON a.license_key_id = l.id
    WHERE a.token = ${token} AND a.deactivated_at IS NULL
  `;
  return rows[0] || null;
}

export async function countActiveActivations(licenseKeyId: string) {
  const { rows } = await sql`
    SELECT COUNT(*) as count FROM activations
    WHERE license_key_id = ${licenseKeyId}::uuid AND deactivated_at IS NULL
  `;
  return parseInt(rows[0].count, 10);
}

export async function findExistingActivation(licenseKeyId: string, machineId: string) {
  const { rows } = await sql`
    SELECT * FROM activations
    WHERE license_key_id = ${licenseKeyId}::uuid AND machine_id = ${machineId} AND deactivated_at IS NULL
  `;
  return rows[0] || null;
}

export async function createActivation(licenseKeyId: string, machineId: string, token: string, machineName?: string) {
  const { rows } = await sql`
    INSERT INTO activations (license_key_id, machine_id, machine_name, token)
    VALUES (${licenseKeyId}::uuid, ${machineId}, ${machineName || null}, ${token})
    RETURNING *
  `;
  return rows[0];
}

export async function updateLastValidated(token: string) {
  await sql`UPDATE activations SET last_validated_at = NOW() WHERE token = ${token}`;
}

export async function deactivateByToken(token: string) {
  const { rowCount } = await sql`
    UPDATE activations SET deactivated_at = NOW() WHERE token = ${token} AND deactivated_at IS NULL
  `;
  return (rowCount ?? 0) > 0;
}

export async function listActivationsForLicense(licenseKeyId: string) {
  const { rows } = await sql`
    SELECT * FROM activations WHERE license_key_id = ${licenseKeyId}::uuid ORDER BY activated_at DESC
  `;
  return rows;
}
