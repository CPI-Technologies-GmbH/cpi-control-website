import { NextRequest, NextResponse } from "next/server";
import { ensureTables, findActivationByToken, updateLastValidated, getPlanLimits } from "@/lib/license-db";

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const activation = await findActivationByToken(token);
    if (!activation) {
      return NextResponse.json({ valid: false, error: "Invalid or deactivated token" }, { status: 404 });
    }

    // Check license status
    if (activation.license_status !== "active" && activation.license_status !== "past_due") {
      return NextResponse.json({ valid: false, error: "License is no longer active" }, { status: 403 });
    }

    // Check expiry
    if (activation.expires_at && new Date(activation.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, error: "License has expired" }, { status: 403 });
    }

    await updateLastValidated(token);

    const plan = getPlanLimits(activation.plan);

    return NextResponse.json({
      valid: true,
      plan: activation.plan,
      limits: { maxServices: plan.maxServices, maxAgents: plan.maxAgents },
      expiresAt: activation.expires_at,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("License validation error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
