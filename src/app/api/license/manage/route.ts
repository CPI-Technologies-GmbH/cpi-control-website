import { NextRequest, NextResponse } from "next/server";
import {
  ensureTables,
  findLicenseByKey,
  findLicensesByEmail,
  listActivationsForLicense,
  deactivateByToken,
  getPlanLimits,
} from "@/lib/license-db";
import { getStripe } from "@/lib/stripe";

/**
 * GET /api/license/manage?key=CPI-XXXX-XXXX-XXXX-XXXX
 * or GET /api/license/manage?email=user@example.com
 *
 * Returns license info, plan details, activations, and subscription status.
 */
export async function GET(request: NextRequest) {
  try {
    await ensureTables();

    const key = request.nextUrl.searchParams.get("key");
    const email = request.nextUrl.searchParams.get("email");

    if (!key && !email) {
      return NextResponse.json({ error: "key or email parameter required" }, { status: 400 });
    }

    let licenses;
    if (key) {
      const license = await findLicenseByKey(key);
      licenses = license ? [license] : [];
    } else {
      licenses = await findLicensesByEmail(email!);
    }

    if (licenses.length === 0) {
      return NextResponse.json({ error: "No licenses found" }, { status: 404 });
    }

    // Enrich with activations and plan info
    const result = await Promise.all(
      licenses.map(async (license) => {
        const activations = await listActivationsForLicense(license.id);
        const plan = getPlanLimits(license.plan);

        // Get Stripe subscription status if available
        let subscriptionStatus = null;
        let currentPeriodEnd = null;
        let cancelAtPeriodEnd = false;

        if (license.stripe_subscription_id) {
          try {
            const sub = await getStripe().subscriptions.retrieve(license.stripe_subscription_id) as any;
            subscriptionStatus = sub.status;
            currentPeriodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
            cancelAtPeriodEnd = sub.cancel_at_period_end ?? false;
          } catch {
            // Subscription may have been deleted
          }
        }

        return {
          id: license.id,
          key: license.key,
          email: license.email,
          plan: license.plan,
          planName: plan.name,
          status: license.status,
          limits: {
            maxServices: plan.maxServices,
            maxAgents: plan.maxAgents,
            maxActivations: plan.maxActivations,
          },
          subscription: {
            stripeStatus: subscriptionStatus,
            currentPeriodEnd,
            cancelAtPeriodEnd,
          },
          activations: activations.map((a) => ({
            id: a.id,
            machineId: a.machine_id,
            machineName: a.machine_name,
            activatedAt: a.activated_at,
            lastValidatedAt: a.last_validated_at,
            isActive: !a.deactivated_at,
          })),
          createdAt: license.created_at,
          expiresAt: license.expires_at,
          cancelledAt: license.cancelled_at,
        };
      })
    );

    return NextResponse.json(key ? result[0] : result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Manage error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/license/manage
 * Body: { licenseKey, activationToken }
 * Deactivates a specific activation from a license.
 */
export async function DELETE(request: NextRequest) {
  try {
    await ensureTables();

    const { licenseKey, activationToken } = await request.json();
    if (!licenseKey || !activationToken) {
      return NextResponse.json({ error: "licenseKey and activationToken required" }, { status: 400 });
    }

    // Verify the license key owns this activation
    const license = await findLicenseByKey(licenseKey);
    if (!license) {
      return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
    }

    const success = await deactivateByToken(activationToken);
    if (!success) {
      return NextResponse.json({ error: "Activation not found or already deactivated" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Manage DELETE error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
