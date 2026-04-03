import type { Metadata } from "next";
import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "License Activated",
  description: "Your CPI-Control license has been activated successfully.",
  robots: { index: false, follow: false },
};

async function getLicenseForSession(sessionId: string) {
  try {
    // Wait briefly for webhook to process (Stripe webhook may arrive slightly after redirect)
    const maxAttempts = 5;
    for (let i = 0; i < maxAttempts; i++) {
      const { rows } = await sql`
        SELECT * FROM license_keys WHERE stripe_checkout_session_id = ${sessionId} LIMIT 1
      `;
      if (rows[0]) return rows[0];
      if (i < maxAttempts - 1) await new Promise((r) => setTimeout(r, 1500));
    }
    return null;
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const license = sessionId ? await getLicenseForSession(sessionId) : null;

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <Image src="/app-icon.png" alt="CPI-Control" width={64} height={64} className="mx-auto mb-6 rounded-xl" />

        {license ? (
          <>
            <div className="text-green-400 text-5xl mb-4">&#10003;</div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Payment Successful!</h1>
            <p className="text-gray-400 mb-8">
              Your <span className="text-blue-400 font-semibold capitalize">{license.plan}</span> license is ready.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Your License Key</p>
              <p className="text-2xl font-mono font-bold text-gray-100 tracking-wider select-all">
                {license.key}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Copy this key and enter it in CPI-Control &rarr; Settings &rarr; License
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                We&apos;ve also sent this key to <span className="text-gray-200">{license.email}</span>
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all"
              >
                &#8592; Back to Homepage
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Processing your payment...</h1>
            <p className="text-gray-400 mb-8">
              Your payment is being processed. Your license key will appear here shortly.
              If this page doesn&apos;t update, check your email.
            </p>
            <div className="animate-pulse flex justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-xs text-gray-600 mt-8">
              Session ID: {sessionId || "unknown"}
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mt-4 inline-block">
              &#8592; Back to Homepage
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
