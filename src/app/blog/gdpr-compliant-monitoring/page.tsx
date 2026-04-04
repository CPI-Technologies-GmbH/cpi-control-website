import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "GDPR-Compliant Monitoring: Why Cloud-Based Tools Are a Risk",
  description:
    "Personal data in logs, US cloud providers, and the case for local-first monitoring that keeps your data on your machine.",
};

export default function PostPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
      </header>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <span className="text-xs font-mono bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">Best Practice</span>
          <h1 className="text-4xl font-bold mt-4 mb-3">GDPR-Compliant Monitoring: Why Cloud-Based Tools Are a Risk</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>6 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/gdpr-privacy-hero.png"
          alt="GDPR-compliant monitoring with local data storage"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Your monitoring tool sees everything. Every request, every error, every log line. And buried in that data &mdash;
            often without anyone realizing it &mdash; is personal information. IP addresses in access logs. User IDs in error
            traces. Email addresses in failed authentication attempts. Request payloads containing names, addresses, and
            payment details.
          </p>
          <p>
            Under GDPR, all of this is personal data. And the moment you send it to a cloud-based monitoring service, you&rsquo;ve
            created a data processing relationship that requires legal agreements, documented safeguards, and the ability to
            prove exactly where that data lives and who can access it.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">The Hidden Risk: Your Logs Contain Personal Data</h2>
          <p>
            Most developers don&rsquo;t think of monitoring data as personal data. But consider what a typical error log contains:
            a timestamp, a request URL (which might include query parameters with user identifiers), a client IP address,
            a user agent string, and often a stack trace that includes the data being processed when the error occurred.
          </p>
          <p>
            Kubernetes pod logs are even more revealing. Application logs frequently include database queries with user data,
            API request/response bodies, authentication tokens, and session identifiers. If you&rsquo;re streaming these logs to a
            cloud monitoring service, you&rsquo;re transmitting personal data to a third-party processor &mdash; potentially across
            international borders.
          </p>
          <p>
            The GDPR doesn&rsquo;t require you to avoid processing personal data. It requires you to know where it goes, who
            processes it, and on what legal basis. For most monitoring setups, the honest answer to these questions is:
            &ldquo;We&rsquo;re not entirely sure.&rdquo;
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Post-Schrems II: US Cloud Providers and Legal Uncertainty</h2>
          <p>
            The Schrems II ruling in 2020 invalidated the EU-US Privacy Shield, and the landscape hasn&rsquo;t fully stabilized
            since. The EU-US Data Privacy Framework introduced in 2023 provides a mechanism for certified US companies, but
            legal challenges continue, and the framework&rsquo;s long-term durability remains uncertain.
          </p>
          <p>
            Standard Contractual Clauses (SCCs) are the fallback, but they require a Transfer Impact Assessment demonstrating
            that the recipient country provides adequate data protection. For US-based monitoring services, this assessment
            is complex: US surveillance laws like FISA Section 702 and Executive Order 12333 grant broad access to data held
            by US companies, regardless of where the data is physically stored.
          </p>
          <p>
            This doesn&rsquo;t mean you can&rsquo;t use US-based monitoring tools. It means you need to document your legal basis, conduct
            impact assessments, and be prepared to defend your choices to a Data Protection Authority. For many small and
            medium-sized teams, this compliance overhead exceeds the value of the monitoring tool itself.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">The Audit Problem</h2>
          <p>
            Article 30 of the GDPR requires a record of processing activities. Article 28 requires a Data Processing Agreement
            (Auftragsverarbeitungsvertrag, or AVV in German) with every processor. Article 32 requires appropriate technical
            and organizational measures to protect the data.
          </p>
          <p>
            When a DPA asks &ldquo;Where does your monitoring data go?&rdquo;, you need a clear answer. With a cloud monitoring service,
            the answer involves the monitoring provider&rsquo;s infrastructure, their sub-processors (often AWS, GCP, or Azure in
            various regions), their data retention policies, their encryption practices, and their employee access controls.
            You need to verify all of this, document it, and keep it updated as the provider changes their infrastructure.
          </p>
          <p>
            This is manageable for large enterprises with dedicated compliance teams. For a 5-person development team, it&rsquo;s
            a significant burden that often doesn&rsquo;t get done properly &mdash; creating a compliance gap that surfaces only during
            an audit or, worse, a data breach investigation.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Local Monitoring Eliminates the Problem</h2>
          <p>
            Here&rsquo;s the simple version: if your monitoring data never leaves your machine, there is no third-party processor.
            No DPA needed. No Transfer Impact Assessment. No sub-processor chain to audit. The data stays on your hardware,
            under your control, in your jurisdiction.
          </p>
          <p>
            This isn&rsquo;t a workaround or a loophole &mdash; it&rsquo;s the architecturally cleanest solution. Local-first monitoring means
            your logs, metrics, health check results, and incident history are stored in a local database on your workstation.
            You can back it up, encrypt it, delete it, or move it &mdash; all without involving a third party.
          </p>
          <p>
            For monitoring agents running on your own servers, the data path is equally clean: the agent collects metrics on
            your infrastructure and sends them to your desktop application over an encrypted connection. No cloud intermediary,
            no third-party storage, no cross-border transfer.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Credential Security: Keychain vs. Config Files</h2>
          <p>
            Monitoring tools need credentials: API tokens for GitHub and Vercel, kubeconfig files for Kubernetes, SSH keys for
            server access. How these credentials are stored matters enormously for both security and compliance.
          </p>
          <p>
            Environment variables are common but risky &mdash; they&rsquo;re visible to all processes, often logged accidentally, and
            persist in shell history. Config files are slightly better but still stored as plaintext on disk. Cloud monitoring
            services store your credentials on their servers, adding another attack surface.
          </p>
          <p>
            The gold standard is the operating system&rsquo;s native keychain: macOS Keychain, Windows Credential Manager, or
            Linux Secret Service. These provide encrypted storage, access control, and biometric authentication. Your
            monitoring tool should use the keychain by default &mdash; not as an optional feature, but as the only credential
            storage mechanism.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Five Questions Every Monitoring Tool Should Answer</h2>
          <p>
            Before choosing a monitoring solution, ask these five questions about data residency:
          </p>
          <p>
            <strong>1. Where is the monitoring data stored?</strong> On your machine, in the provider&rsquo;s cloud, or in a
            third-party cloud? Get specific: which region, which provider, which data centers?
          </p>
          <p>
            <strong>2. Who has access to the raw data?</strong> Can the monitoring provider&rsquo;s employees see your logs? Under
            what circumstances? Is access logged and auditable?
          </p>
          <p>
            <strong>3. Where are credentials stored?</strong> In the provider&rsquo;s cloud? In a config file? In the OS keychain?
            Are they encrypted at rest?
          </p>
          <p>
            <strong>4. What happens when you delete your account?</strong> Is data actually deleted or just marked as inactive?
            What&rsquo;s the retention period? Can you get a certificate of deletion?
          </p>
          <p>
            <strong>5. Can you run it without an internet connection?</strong> If the monitoring tool requires a cloud connection
            to function, your data is being transmitted &mdash; even if the provider says it&rsquo;s &ldquo;processed locally.&rdquo;
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">CPI-Control&rsquo;s Architecture</h2>
          <p>
            CPI-Control was designed from the ground up for data sovereignty. All monitoring data is stored in a local SQLite
            database on your disk &mdash; health check results, incident history, deployment records, service metadata. Nothing
            is transmitted to any cloud service.
          </p>
          <p>
            Credentials are stored in the macOS Keychain (or the platform-equivalent on Windows and Linux). API tokens for
            GitHub, Vercel, DigitalOcean, and Kubernetes never touch a config file or environment variable. They&rsquo;re encrypted
            by the OS and protected by your login credentials.
          </p>
          <p>
            The monitoring agent &mdash; if you choose to deploy it on your servers &mdash; communicates directly with your desktop
            application. There is no cloud relay, no intermediary storage, no third-party involvement. Your monitoring data
            stays in your infrastructure, under your control, fully GDPR-compliant without a single DPA.
          </p>
        </div>
        <div className="mt-16 p-8 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
          <h3 className="text-xl font-bold mb-2">Try CPI-Control Free</h3>
          <p className="text-gray-400 text-sm mb-4">Monitor up to 50 services with zero cloud dependency.</p>
          <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all">Download for macOS</a>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to Blog</Link>
        </div>
      </article>
    </div>
  );
}
