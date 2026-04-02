export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { ensureTables, findLicenseByKey, findLicenseByEmail } from "@/lib/license-db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://cpi-control-website.vercel.app";

/**
 * POST /api/license/portal
 * Creates a Stripe Customer Portal session for managing subscription.
 * Body: { licenseKey: string } or { email: string }
 */
export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const { licenseKey, email } = await request.json();

    let license;
    if (licenseKey) {
      license = await findLicenseByKey(licenseKey);
    } else if (email) {
      license = await findLicenseByEmail(email);
    }

    if (!license) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    if (!license.stripe_customer_id) {
      return NextResponse.json({ error: "No Stripe customer associated with this license" }, { status: 400 });
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: license.stripe_customer_id,
      return_url: `${BASE_URL}/#pricing`,
    });

    return NextResponse.json({ portalUrl: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Portal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
