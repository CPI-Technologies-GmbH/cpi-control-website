import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for CPI-Control and the CPI-Control website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 prose prose-invert prose-sm">
        <h1>Privacy Policy</h1>
        <p className="text-gray-400">Last updated: April 2026</p>

        <h2>1. Controller</h2>
        <p>
          CPI Technologies GmbH<br />
          Contact: info@cpitech.io<br />
          Website: <a href="https://cpitech.io">cpitech.io</a>
        </p>

        <h2>2. CPI-Control Desktop App</h2>
        <p>
          CPI-Control is a desktop application that runs entirely on your local machine.
          <strong> No telemetry, usage data, or personal information is collected or transmitted by the app.</strong>
        </p>
        <ul>
          <li>All monitoring data is stored locally in a SQLite database on your device.</li>
          <li>Credentials (API tokens, kubeconfigs) are stored in your operating system&apos;s secure keychain.</li>
          <li>The app connects only to the infrastructure you configure (Kubernetes clusters, GitHub, Vercel, etc.).</li>
          <li>Optional license validation communicates with our server solely to verify your license key — no usage data is transmitted.</li>
        </ul>

        <h2>3. Website (cpi-control.com)</h2>
        <p>This website collects minimal data:</p>
        <ul>
          <li><strong>Authentication:</strong> When you sign in, we use CPI Auth (auth.cpi.dev) as our identity provider. We store your email address and name to manage your account.</li>
          <li><strong>Cookies:</strong> We use strictly necessary cookies for authentication sessions. No analytics or tracking cookies are used.</li>
          <li><strong>Payment:</strong> Payments are processed by Stripe. We do not store credit card information. Stripe&apos;s privacy policy applies to payment data.</li>
          <li><strong>Hosting:</strong> This website is hosted on Vercel. Vercel may collect basic server logs (IP address, request timestamps) as part of normal web server operations.</li>
        </ul>

        <h2>4. License System</h2>
        <p>
          When you activate a license key, we store:
        </p>
        <ul>
          <li>Your license key and associated plan</li>
          <li>A machine identifier (used solely to enforce activation limits)</li>
          <li>Activation and validation timestamps</li>
        </ul>
        <p>No other data from your device is collected.</p>

        <h2>5. Data Retention</h2>
        <p>
          Account data is retained for the duration of your subscription. Upon account deletion or license deactivation,
          your data is removed within 30 days. Local app data is never transmitted and remains solely under your control.
        </p>

        <h2>6. Your Rights (GDPR)</h2>
        <p>
          If you are located in the European Economic Area, you have the right to access, rectify, delete, or export
          your personal data. Contact us at info@cpitech.io.
        </p>

        <h2>7. Third-Party Services</h2>
        <ul>
          <li><strong>Stripe</strong> — Payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
          <li><strong>Vercel</strong> — Website hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
          <li><strong>CPI Auth</strong> — Authentication (operated by CPI Technologies GmbH)</li>
        </ul>

        <h2>8. Changes</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with an updated date.
        </p>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to Homepage</Link>
        </div>
      </main>
    </div>
  );
}
