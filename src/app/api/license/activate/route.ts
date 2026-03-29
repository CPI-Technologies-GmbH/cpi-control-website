import { NextRequest, NextResponse } from "next/server";
import {
  ensureTables,
  findLicenseByKey,
  findExistingActivation,
  countActiveActivations,
  createActivation,
  generateToken,
  getPlanLimits,
} from "@/lib/license-db";

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const { licenseKey, machineId, machineName } = await request.json();

    if (!licenseKey || !machineId) {
      return NextResponse.json({ error: "licenseKey and machineId are required" }, { status: 400 });
    }

    // Find license
    const license = await findLicenseByKey(licenseKey);
    if (!license || (license.status !== "active" && license.status !== "past_due")) {
      return NextResponse.json({ error: "Invalid or inactive license key" }, { status: 404 });
    }

    // Check expiry
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      return NextResponse.json({ error: "License has expired" }, { status: 403 });
    }

    const plan = getPlanLimits(license.plan);

    // Check if already activated on this machine
    const existing = await findExistingActivation(license.id, machineId);
    if (existing) {
      return NextResponse.json({
        token: existing.token,
        plan: license.plan,
        limits: { maxServices: plan.maxServices, maxAgents: plan.maxAgents },
        expiresAt: license.expires_at,
        alreadyActivated: true,
      });
    }

    // Check activation limit
    const activeCount = await countActiveActivations(license.id);
    if (activeCount >= plan.maxActivations) {
      return NextResponse.json(
        { error: `Maximum ${plan.maxActivations} activations reached. Deactivate another device first.` },
        { status: 409 }
      );
    }

    // Create activation
    const token = generateToken();
    await createActivation(license.id, machineId, token, machineName);

    return NextResponse.json({
      token,
      plan: license.plan,
      limits: { maxServices: plan.maxServices, maxAgents: plan.maxAgents },
      expiresAt: license.expires_at,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("License activation error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
