import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for CPI-Control software and the CPI-Control website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 prose prose-invert prose-sm">
        <h1>Terms of Service</h1>
        <p className="text-gray-400">Last updated: April 2026</p>

        <h2>1. Acceptance</h2>
        <p>
          By downloading, installing, or using CPI-Control (&quot;the Software&quot;), you agree to these terms.
          CPI-Control is developed and operated by CPI Technologies GmbH (&quot;we&quot;, &quot;us&quot;).
        </p>

        <h2>2. License Grant</h2>
        <p>
          We grant you a non-exclusive, non-transferable license to use CPI-Control subject to the terms of your
          subscription plan:
        </p>
        <ul>
          <li><strong>Free</strong> — Up to 50 services, 1 remote agent, 2 status pages</li>
          <li><strong>Team</strong> — Up to 500 services, 3 remote agents, 10 status pages</li>
          <li><strong>Unlimited</strong> — No limits on services, agents, or status pages</li>
        </ul>

        <h2>3. License Keys</h2>
        <p>
          Paid plans require a license key. Each key may be activated on a limited number of devices as defined by
          your plan. License keys are personal and may not be shared, resold, or redistributed.
        </p>

        <h2>4. Data Ownership</h2>
        <p>
          CPI-Control stores all monitoring data locally on your device. You retain full ownership of your data.
          We have no access to your local data, credentials, or infrastructure.
        </p>

        <h2>5. Availability</h2>
        <p>
          CPI-Control is a desktop application and does not depend on our servers for core functionality.
          License validation requires periodic internet access. An offline grace period of 7 days is provided.
        </p>

        <h2>6. Payment & Refunds</h2>
        <p>
          Paid subscriptions are billed annually via Stripe. You may cancel at any time; your plan remains active
          until the end of the billing period. Refunds are available within 14 days of purchase if the software
          does not meet your requirements.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          CPI-Control is provided &quot;as is&quot; without warranty of any kind. We are not liable for any damages
          arising from the use of the software, including but not limited to data loss, downtime, or infrastructure issues.
          Our total liability is limited to the amount paid for your subscription in the preceding 12 months.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to terminate your license if you violate these terms. Upon termination,
          you must uninstall the software and delete your license key. Your local data remains yours.
        </p>

        <h2>9. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the software after changes constitutes acceptance.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These terms are governed by the laws of Germany. Any disputes shall be resolved in the courts of the
          registered office of CPI Technologies GmbH.
        </p>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to Homepage</Link>
        </div>
      </main>
    </div>
  );
}
