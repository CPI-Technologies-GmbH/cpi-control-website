import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CPI-Control vs. Datadog: The Honest Comparison for Small Teams",
  description:
    "A detailed cost and feature comparison between CPI-Control and Datadog for teams running fewer than 50 services. Real pricing examples, GDPR considerations, and an honest recommendation.",
};

export default function CpiControlVsDatadog() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-[#0b1120]/85 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
        <Link href="/blog" className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors">
          Blog
        </Link>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* Meta */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-4">
            CPI-Control vs. Datadog: The Honest Comparison for Small Teams
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>8 min read</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>April 2026</span>
          </div>
        </div>

        <Image
          src="/blog/comparison-hero.png"
          alt="Comparing CPI-Control and Datadog for infrastructure monitoring"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />

        {/* Body */}
        <div className="space-y-6 text-[16px] leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Why This Comparison Matters</h2>
          <p>
            Datadog is the default answer when someone asks "what should we use for monitoring?" And for good reason: it is a phenomenally powerful platform that covers metrics, traces, logs, synthetics, security, and more. But that power comes with a price tag and a complexity level that can be wildly disproportionate for teams running a handful of services across Kubernetes, Vercel, or DigitalOcean.
          </p>
          <p>
            If you have fewer than 50 services, three to fifteen engineers, and a product that does not generate millions of spans per minute, you are likely paying for capabilities you will never touch. This comparison is written specifically for that audience. We built CPI-Control to solve our own monitoring problems at a small infrastructure consultancy, and we think it is important to be transparent about where it fits and where it does not.
          </p>
          <p>
            This is not a hit piece. Datadog is excellent software. The question is whether it is excellent software <em className="text-gray-200">for you</em>.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Cost Breakdown: A Real Example</h2>
          <p>
            Let us walk through a concrete scenario. You run 20 services: some on a managed Kubernetes cluster, a few on Vercel, and a couple of standalone servers on DigitalOcean. Your team has eight engineers. You want infrastructure monitoring, log management, and deployment tracking.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Datadog Pricing</h3>
          <p>
            Datadog charges per host per month for infrastructure monitoring. The Pro plan starts at $15 per host per month, while the Enterprise plan runs $23 per host per month. On top of that, log management costs $0.10 per ingested GB after the first 500 MB daily allowance on the free tier, and indexed logs are an additional $1.70 per million log events. APM adds another $31 per host per month if you want distributed tracing.
          </p>
          <p>
            For 20 hosts on the Pro plan with moderate log ingestion (around 50 GB per month) and no APM, you are looking at roughly $300 per month for infrastructure plus $375 per month for logs. That is $675 per month or about $8,100 per year. In euros, depending on exchange rates, that is approximately 7,500 to 9,000 euros annually. If you add APM for even half of those hosts, the figure quickly climbs above 15,000 euros. And if your log volume grows or you need custom metrics, the bill can surprise you. Datadog pricing is notoriously difficult to predict, and many teams have reported unexpected invoices after scaling up.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">CPI-Control Pricing</h3>
          <p>
            CPI-Control is free for up to 50 services. There is no per-host fee, no log ingestion fee, and no hidden metering. You download a desktop application, connect your providers (Kubernetes, Vercel, GitHub, DigitalOcean, AWS), and it pulls data directly from their APIs. Logs stream from your clusters via stern in real time and are buffered locally in memory. Your annual cost for 20 services: zero euros.
          </p>
          <p>
            The reason this is possible is architectural. CPI-Control does not run a cloud backend that ingests, stores, and indexes your telemetry. It is a native desktop application built with Tauri and React that communicates directly with your existing infrastructure APIs. There is no intermediary, no data warehouse to maintain, and therefore no variable cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Feature Comparison</h2>
          <p>
            The following table compares the two tools across the categories that matter most for small to medium teams. This is not exhaustive; Datadog has hundreds of integrations that CPI-Control does not attempt to replicate. The focus here is on day-to-day operational features.
          </p>

          <div className="overflow-x-auto my-8 rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/60 text-gray-300 text-left">
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 font-semibold">Datadog</th>
                  <th className="px-5 py-3 font-semibold">CPI-Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Health Monitoring</td>
                  <td className="px-5 py-3">Agent-based, cloud-processed</td>
                  <td className="px-5 py-3">API-based, local processing</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">K8s Management</td>
                  <td className="px-5 py-3">Metrics &amp; dashboards only</td>
                  <td className="px-5 py-3">Full pod management, events, resource usage</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Deployment Tracking</td>
                  <td className="px-5 py-3">Via APM deploy markers</td>
                  <td className="px-5 py-3">Native cross-provider tracking (K8s, Vercel, GitHub Actions)</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Live Logs</td>
                  <td className="px-5 py-3">Cloud-indexed, search-based</td>
                  <td className="px-5 py-3">Real-time streaming, local buffer, multi-service</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Status Pages</td>
                  <td className="px-5 py-3">Not included</td>
                  <td className="px-5 py-3">Built-in, self-hosted via monitoring agent</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">AI Diagnostics</td>
                  <td className="px-5 py-3">Watchdog (auto-detection)</td>
                  <td className="px-5 py-3">AI-powered root cause analysis</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Data Location</td>
                  <td className="px-5 py-3">US/EU cloud (Datadog-hosted)</td>
                  <td className="px-5 py-3">100% local on your machine</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Terminal Access</td>
                  <td className="px-5 py-3">Not available</td>
                  <td className="px-5 py-3">Built-in pod terminal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Data Privacy and GDPR</h2>
          <p>
            This is the elephant in the room that many comparison articles skip. Datadog operates as a cloud-based SaaS platform. When you install the Datadog agent on your hosts, it collects system metrics, container metadata, process information, and depending on your configuration, application traces and logs. All of this data is transmitted to Datadog's infrastructure, which is primarily hosted in the United States with an EU option available on some plans.
          </p>
          <p>
            For European companies subject to GDPR, this raises genuine questions. Even with Datadog's EU data residency option, you are still entrusting a third party with operational data that may contain sensitive information embedded in logs, environment variable names, or Kubernetes labels. The Schrems II ruling and subsequent legal developments have made US-based data processing a compliance liability for many EU organizations.
          </p>
          <p>
            CPI-Control sidesteps this entirely. All data stays on your local machine. No telemetry is sent to any cloud service. The application reads from your provider APIs, processes everything locally, and stores it in a local SQLite database. Your Kubernetes pod logs, deployment histories, and health check results never leave your laptop. For organizations with strict data sovereignty requirements or those operating in regulated industries, this is not a nice-to-have but a hard requirement.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">When Datadog Makes Sense</h2>
          <p>
            It would be dishonest to pretend that CPI-Control replaces Datadog in every scenario. Datadog is the right choice in several situations:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Large-scale enterprise:</strong> If you run 500 or more hosts and need a unified observability platform that correlates metrics, traces, and logs across thousands of services, Datadog's scale is unmatched. The cost at that level is a rounding error in your infrastructure budget.
            </li>
            <li>
              <strong className="text-gray-200">APM and distributed tracing:</strong> If your architecture involves deep microservice chains where you need to trace a request through twelve services, Datadog's APM is genuinely world-class. CPI-Control does not offer distributed tracing.
            </li>
            <li>
              <strong className="text-gray-200">Existing investment:</strong> If your team has already built hundreds of custom dashboards, set up complex alerting rules, and integrated Datadog into your incident response workflow, the switching cost is real and should not be underestimated.
            </li>
            <li>
              <strong className="text-gray-200">Security monitoring:</strong> Datadog's Cloud SIEM and Cloud Security Management are mature products. If you need runtime threat detection and compliance monitoring, Datadog offers this in a way that CPI-Control does not.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">When CPI-Control Is Better</h2>
          <p>
            Conversely, CPI-Control is the better choice in these scenarios:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Small to medium teams:</strong> If you have fewer than 50 services and fewer than 20 engineers, CPI-Control gives you operational visibility without the overhead or cost of a full observability platform. You get health monitoring, deployment tracking, live logs, and Kubernetes management in a single download.
            </li>
            <li>
              <strong className="text-gray-200">Cost-conscious organizations:</strong> If your monitoring budget is zero or close to it, CPI-Control is genuinely free. Not "free tier with aggressive upselling" free, but "we do not charge for the desktop app" free.
            </li>
            <li>
              <strong className="text-gray-200">Privacy and data sovereignty:</strong> If you need your operational data to stay on-premises or simply prefer not to send infrastructure telemetry to a third-party cloud, CPI-Control's local-first architecture is exactly what you need.
            </li>
            <li>
              <strong className="text-gray-200">Multi-provider environments:</strong> If your infrastructure spans Kubernetes, Vercel, GitHub, DigitalOcean, and potentially AWS, CPI-Control gives you a unified view without needing a separate agent or integration for each platform. Datadog handles this too, but each additional integration adds cost.
            </li>
            <li>
              <strong className="text-gray-200">Fast setup:</strong> CPI-Control takes about two minutes from download to first dashboard. There are no agents to install, no YAML to write, no Helm charts to deploy. You authenticate with your providers and the app syncs automatically.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">The Verdict</h2>
          <p>
            Datadog and CPI-Control solve related but different problems. Datadog is an enterprise observability platform designed for organizations with large-scale, complex, distributed systems. CPI-Control is an operational dashboard designed for teams that want to see what is happening across their infrastructure without the cost, complexity, or privacy trade-offs of a cloud-hosted solution.
          </p>
          <p>
            If you are a small team spending thousands of euros per year on Datadog and mostly using it to check if your pods are healthy, view deployment statuses, and tail logs, you are overpaying by an order of magnitude. Download CPI-Control, connect your clusters, and see if it covers your needs. It takes two minutes and costs nothing.
          </p>
          <p>
            If you are a platform engineering team at a company with 200 engineers and 800 microservices, stick with Datadog. CPI-Control is not built for that scale, and we are not going to pretend otherwise.
          </p>
          <p>
            The best tool is the one that matches your actual needs, not the one that matches your ambitions.
          </p>
        </div>

        {/* CTA Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-2">Try CPI-Control free</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Free for up to 50 services. No account required. Your data stays on your machine.
          </p>
          <a
            href="/api/download?platform=mac"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25"
          >
            Download for macOS
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/blog" className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
