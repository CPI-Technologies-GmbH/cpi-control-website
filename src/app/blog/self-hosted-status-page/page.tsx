import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create a Self-Hosted Status Page in 10 Minutes",
  description:
    "Custom domain, branding, automatic HTTPS — powered by your own monitoring agent. No vendor lock-in, no monthly fees.",
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
          <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Tutorial</span>
          <h1 className="text-4xl font-bold mt-4 mb-3">Create a Self-Hosted Status Page in 10 Minutes</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>6 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/status-page-hero.png"
          alt="Creating a self-hosted branded status page"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Status pages are the public face of your reliability. When customers see something broken, the first thing they check is your status page. But most status page providers charge monthly fees, host your data on their servers, and give you limited control over branding and presentation. CPI-Control lets you create a fully self-hosted status page that runs on your own infrastructure, uses your own domain, and is powered by real monitoring data rather than manually toggled statuses.
          </p>

          <h2>Why Self-Hosted?</h2>
          <p>
            There are several compelling reasons to host your own status page. First, there&apos;s no vendor lock-in. Your status page doesn&apos;t depend on a third-party service being up &mdash; which is ironic when you think about it, because your status page provider going down means your customers can&apos;t check if <em>you</em> are down. Second, you get complete control over your domain. The page lives at <code>status.yourdomain.com</code>, not <code>yourdomain.statuspage.io</code>. Third, the data stays yours. Uptime percentages, response times, and incident history are stored on your server, not in someone else&apos;s database. And fourth, it&apos;s free &mdash; there&apos;s no per-page or per-service fee because the monitoring agent is a single binary running on a server you already pay for.
          </p>

          <h2>Step 1: Install the Monitoring Agent</h2>
          <p>
            The CPI-Control monitoring agent is a single Go binary that runs on any Linux server. You can install it on the same server that hosts your application or on a dedicated monitoring server. Download the latest release from the CPI-Control releases page and place it in <code>/usr/local/bin/</code>. Then create a systemd service file to ensure it starts automatically and restarts on failure.
          </p>
          <p>
            The agent binary is under 15 MB and uses minimal resources &mdash; typically under 20 MB of RAM and negligible CPU. It runs an HTTP server for serving the status page and a background process for executing health checks. The agent communicates with CPI-Control on your desktop to receive configuration updates, but it operates independently for serving the status page. If your desktop is off, the status page keeps running with the last known configuration.
          </p>

          <h2>Step 2: Register the Agent in CPI-Control</h2>
          <p>
            Open CPI-Control on your desktop and navigate to <strong>Settings &rarr; Agents &rarr; Add Agent</strong>. Enter the IP address or hostname of the server where you installed the agent, along with the SSH credentials CPI-Control will use to push configuration updates. CPI-Control verifies the connection and confirms the agent is running. Once registered, the agent appears in your agents list with its status, uptime, and the number of status pages it&apos;s serving.
          </p>
          <p>
            You can register multiple agents across different servers and regions. Each agent can serve multiple status pages, and you can assign specific agents to specific status pages for geographic redundancy. If you have servers in Europe and the US, you can run an agent on each and have your status page served from the region closest to your customers.
          </p>

          <h2>Step 3: Create a Status Page</h2>
          <p>
            In CPI-Control, go to the <strong>Status Pages</strong> section and click <strong>Create New</strong>. Give your status page a name &mdash; this is the internal name you&apos;ll use to identify it, not the public title. Select the agent that will serve this page. Then enter the domain where the status page will be accessible, like <code>status.yourdomain.com</code>. Make sure your DNS records point this domain to the server running the agent.
          </p>

          <h2>Step 4: Configure Branding</h2>
          <p>
            CPI-Control gives you full control over the appearance of your status page. Upload your company logo, set your company name, choose a primary color that matches your brand, and select one of three available themes. The <strong>Dark</strong> theme features a deep navy background with subtle gradients, ideal for technical products and developer tools. The <strong>Light</strong> theme uses a clean white background with soft shadows, suitable for business-facing applications. The <strong>Minimal</strong> theme strips away all decoration for a no-frills, data-focused presentation.
          </p>
          <p>
            Each theme is responsive and optimized for both desktop and mobile viewing. Your customers will get a professional experience regardless of how they access the page. The branding settings are applied instantly &mdash; you can preview changes in real time before publishing.
          </p>

          <h2>Step 5: Select Services to Display</h2>
          <p>
            Not every service you monitor should appear on your public status page. CPI-Control lets you choose exactly which services to display. You can select individual services or entire projects. For each displayed service, you can customize the public name &mdash; so an internal service called &quot;api-gateway-prod-v2&quot; can appear as &quot;API&quot; on the status page. You can also group services into categories like &quot;Core Platform&quot;, &quot;Integrations&quot;, and &quot;Developer Tools&quot; to organize the page logically.
          </p>
          <p>
            The order of services and groups is fully draggable. Place your most critical services at the top where customers will see them first. Each service on the status page shows its current status (Operational, Degraded, or Down), a 90-day uptime bar chart with daily resolution, and the current response time from the most recent health check.
          </p>

          <h2>Step 6: Deploy</h2>
          <p>
            When you&apos;re satisfied with the configuration, click <strong>Deploy</strong>. CPI-Control pushes the status page configuration to the selected agent via SSH. The agent picks up the new configuration, generates the static page assets, and starts serving the status page on port 443. The entire deployment takes under 10 seconds. Any future changes to the status page &mdash; adding services, updating branding, modifying groups &mdash; can be redeployed with a single click.
          </p>

          <h2>Automatic HTTPS with Let&apos;s Encrypt</h2>
          <p>
            The monitoring agent handles TLS certificate provisioning automatically using Let&apos;s Encrypt. When you deploy a status page with a custom domain, the agent requests a certificate for that domain, validates ownership via HTTP-01 challenge, and installs the certificate &mdash; all without any manual intervention. Certificates are automatically renewed before expiration. You don&apos;t need to install certbot, configure nginx, or set up a reverse proxy. The agent serves HTTPS directly on port 443.
          </p>
          <p>
            For this to work, port 443 on your server must be accessible from the internet, and the domain must point to the server&apos;s IP address. If you&apos;re running behind a load balancer or CDN, you can alternatively provide your own certificate files.
          </p>

          <h2>The Result</h2>
          <p>
            After following these steps, you have a professional status page running on your own infrastructure. It displays real-time health data from your actual monitoring setup &mdash; not manually toggled statuses that someone forgets to update. When a service goes down, the status page reflects it automatically within seconds. When it recovers, the page updates again. Uptime bars show accurate historical data because they&apos;re calculated from real health check results, not from manually logged incidents.
          </p>
          <p>
            The page also includes an incident history section that automatically generates entries when services experience downtime. Each incident shows the affected services, the duration of the outage, and the timeline of status changes. You can optionally add manual incident notes for context &mdash; explaining what went wrong and what was done to fix it &mdash; but the basic incident tracking is fully automatic.
          </p>
          <p>
            Three themes, zero monthly cost, complete data ownership, and a deployment process that takes less time than signing up for a hosted status page service. Your customers see a polished, branded page at your domain, backed by real monitoring data.
          </p>
        </div>
        {/* CTA */}
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
