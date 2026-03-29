import { sql } from "@vercel/postgres";
import crypto from "crypto";

// ─── Plan Limits ─────────────────────────────────────────────────────────

export const PLAN_LIMITS: Record<string, { maxServices: number; maxAgents: number; maxActivations: number }> = {
  free:      { maxServices: 50,    maxAgents: 1,  maxActivations: 2 },
  team:      { maxServices: 500,   maxAgents: 3,  maxActivations: 5 },
  unlimited: { maxServices: 99999, maxAgents: 99, maxActivations: 10 },
};

// ─── Database Setup ──────────────────────────────────────────────────────

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS license_keys (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(255),
      plan VARCHAR(20) NOT NULL DEFAULT 'free',
      status VARCHAR(20) NOT NULL DEFAULT 'active',
      lemon_order_id VARCHAR(100),
      lemon_subscription_id VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS activations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      license_key_id UUID REFERENCES license_keys(id) ON DELETE CASCADE,
      machine_id VARCHAR(255) NOT NULL,
      token VARCHAR(128) UNIQUE NOT NULL,
      activated_at TIMESTAMPTZ DEFAULT NOW(),
      last_validated_at TIMESTAMPTZ DEFAULT NOW(),
      deactivated_at TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_activations_token ON activations(token)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_license_keys_key ON license_keys(key)`;
}

// ─── License Key Generation ──────────────────────────────────────────────

export function generateLicenseKey(): string {
  const segments = Array.from({ length: 4 }, () =>
    crypto.randomBytes(2).toString("hex").toUpperCase()
  );
  return `CPI-${segments.join("-")}`;
}

export function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

// ─── Queries ─────────────────────────────────────────────────────────────

export async function findLicenseByKey(key: string) {
  const { rows } = await sql`
    SELECT * FROM license_keys WHERE key = ${key} AND status = 'active'
  `;
  return rows[0] || null;
}

export async function findActivationByToken(token: string) {
  const { rows } = await sql`
    SELECT a.*, l.plan, l.status as license_status, l.expires_at
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
    WHERE license_key_id = ${licenseKeyId}::uuid
    AND machine_id = ${machineId}
    AND deactivated_at IS NULL
  `;
  return rows[0] || null;
}

export async function createActivation(licenseKeyId: string, machineId: string, token: string) {
  const { rows } = await sql`
    INSERT INTO activations (license_key_id, machine_id, token)
    VALUES (${licenseKeyId}::uuid, ${machineId}, ${token})
    RETURNING *
  `;
  return rows[0];
}

export async function updateLastValidated(token: string) {
  await sql`
    UPDATE activations SET last_validated_at = NOW()
    WHERE token = ${token}
  `;
}

export async function deactivateByToken(token: string) {
  const { rowCount } = await sql`
    UPDATE activations SET deactivated_at = NOW()
    WHERE token = ${token} AND deactivated_at IS NULL
  `;
  return (rowCount ?? 0) > 0;
}

export async function createLicenseKey(plan: string, email: string, lemonOrderId?: string, lemonSubscriptionId?: string) {
  const key = generateLicenseKey();
  const expiresAt = plan === "free" ? null : new Date(Date.now() + 365 * 24 * 3600_000).toISOString();
  const { rows } = await sql`
    INSERT INTO license_keys (key, email, plan, lemon_order_id, lemon_subscription_id, expires_at)
    VALUES (${key}, ${email}, ${plan}, ${lemonOrderId || null}, ${lemonSubscriptionId || null}, ${expiresAt})
    RETURNING *
  `;
  return rows[0];
}
