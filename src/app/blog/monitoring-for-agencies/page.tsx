import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Monitoring for Agencies: 20 Client Projects, One Dashboard",
  description:
    "Project-based organization, white-label status pages, and zero per-client costs for digital agencies managing multiple client infrastructures.",
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
          <span className="text-xs font-mono bg-purple-500/20 text-purple-400 px-2.5 py-1 rounded-full">Industry</span>
          <h1 className="text-4xl font-bold mt-4 mb-3">Monitoring for Agencies: 20 Client Projects, One Dashboard</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>6 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/agency-hero.png"
          alt="Infrastructure monitoring dashboard for agencies"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Digital agencies have a monitoring problem that most tools weren&rsquo;t designed to solve. You&rsquo;re managing 20 client
            projects, each on a different stack. Client A is on Vercel with a Next.js frontend. Client B runs Kubernetes on
            DigitalOcean. Client C has a legacy WordPress site on shared hosting. Client D is a React app on AWS with a
            separate API on a bare-metal server. And every single one of them expects you to know when their site goes down
            &mdash; ideally before they do.
          </p>
          <p>
            The typical agency solution is a patchwork: Uptime Robot for basic checks, Vercel&rsquo;s built-in analytics for the
            Vercel clients, kubectl on your laptop for the K8s clients, and hope for the rest. This works until it doesn&rsquo;t
            &mdash; usually when Client C&rsquo;s site has been down for 2 hours and they call you before your monitoring does.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Project-Based Organization</h2>
          <p>
            The first thing an agency needs is clean separation between clients. You don&rsquo;t want Client A&rsquo;s services mixed in
            with Client B&rsquo;s in a flat list of 60 monitors. You need projects &mdash; one per client &mdash; each with its own set of
            services, its own status page, and its own notification settings.
          </p>
          <p>
            CPI-Control&rsquo;s project system was built for exactly this. Create a project for each client, add their services to
            it, and switch between clients with a single click. Each project has its own dashboard showing only that client&rsquo;s
            services, deployments, and incidents. When Client B calls asking about their uptime last month, you don&rsquo;t have to
            filter through 60 services to find the answer &mdash; you open their project and the data is right there.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">White-Label Status Pages</h2>
          <p>
            Status pages have become a client expectation. Enterprise clients want a public URL where they (and their customers)
            can check service status without contacting you. The problem is that most status page services charge per page, and
            running 20 status pages on StatusPage.io or Better Stack adds up fast.
          </p>
          <p>
            CPI-Control lets you deploy a status page for each client project on their own domain. The status page is served
            by the monitoring agent, branded with the client&rsquo;s name and colors, and updated in real time from your monitoring
            data. No additional service, no per-page pricing, no separate login.
          </p>
          <p>
            For clients, this is a professional deliverable: &ldquo;Your project includes a branded status page at
            status.yourclient.com.&rdquo; For you, it&rsquo;s a differentiator that costs nothing to maintain. The status page pulls from
            the same monitoring data you&rsquo;re already collecting, so there&rsquo;s no extra configuration or duplicate monitoring setup.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Zero Per-Client Costs</h2>
          <p>
            This is where the math gets interesting. Most monitoring services charge per monitor, per seat, or per integration.
            At 20 clients with an average of 3 services each, you&rsquo;re looking at 60 monitors. On Uptime Robot Pro, that&rsquo;s
            the $29/month plan. On Better Stack, it&rsquo;s significantly more. On Datadog, you don&rsquo;t even want to calculate it.
          </p>
          <p>
            CPI-Control&rsquo;s free plan covers 50 services. That&rsquo;s enough for most agencies to monitor every client without paying
            a cent. When you grow beyond 50 services, the Team plan covers 500 services &mdash; that&rsquo;s 25 services per client for
            20 clients, more than enough for even complex projects.
          </p>
          <p>
            The cost structure means you can offer monitoring as a standard part of every client engagement without worrying
            about per-client costs eating into your margins. Monitoring goes from a cost center to a value-add that strengthens
            client relationships.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Multi-Provider Discovery</h2>
          <p>
            Agencies work with whatever infrastructure the client has. You don&rsquo;t get to choose a single cloud provider and
            standardize &mdash; you adapt to each client&rsquo;s existing stack. This means you need a monitoring tool that speaks
            Vercel, GitHub, Kubernetes, DigitalOcean, and plain HTTP with equal fluency.
          </p>
          <p>
            CPI-Control&rsquo;s provider adapters connect to each platform using API tokens. Once connected, services are
            auto-discovered: Vercel deployments, GitHub repositories, Kubernetes services and ingresses, DigitalOcean droplets.
            You assign discovered services to the appropriate client project, and monitoring begins immediately.
          </p>
          <p>
            The auto-discovery is particularly valuable for Kubernetes clients. Instead of manually configuring monitors for
            each service, CPI-Control scans the cluster for services and ingresses, determines which are public-facing and
            which are internal, and creates monitors automatically. When the client deploys a new service, it appears in your
            dashboard without any manual configuration.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Client Onboarding in 5 Minutes</h2>
          <p>
            Adding a new client to your monitoring setup should take minutes, not hours. Here&rsquo;s the typical workflow:
          </p>
          <p>
            <strong>Step 1:</strong> Create a new project in CPI-Control with the client&rsquo;s name.
          </p>
          <p>
            <strong>Step 2:</strong> Add the client&rsquo;s infrastructure credentials &mdash; a Vercel API token, a kubeconfig file, a
            DigitalOcean token, or simply the URLs of their services for HTTP monitoring.
          </p>
          <p>
            <strong>Step 3:</strong> Auto-discovered services appear automatically. For HTTP-only monitoring, add the URLs manually.
            Assign everything to the client&rsquo;s project.
          </p>
          <p>
            <strong>Step 4:</strong> Deploy a status page on the client&rsquo;s domain by pointing their DNS to the monitoring agent.
          </p>
          <p>
            <strong>Step 5:</strong> Configure notification preferences &mdash; which Slack channel gets alerts for this client,
            whether to send email summaries, what the escalation thresholds are.
          </p>
          <p>
            Five steps, five minutes. The client has monitoring, a status page, and you have a clean project-based view of
            their infrastructure.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Scaling with Your Agency</h2>
          <p>
            The free plan works until you hit 50 services. For a 20-client agency with 2-3 services per client, that&rsquo;s
            comfortable. But agencies grow, clients add services, and projects get more complex.
          </p>
          <p>
            The Team plan at 500 services gives you room to grow without changing tools. Multiple team members can access the
            dashboard (useful when you have dedicated project managers per client). Multiple monitoring agents can run on
            different networks for clients with isolated infrastructure. AI-powered diagnostics help junior team members
            understand incidents without escalating to senior engineers.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">CPI-Control vs. 20 Separate Uptime Robot Accounts</h2>
          <p>
            The alternative to a unified monitoring tool is the approach many agencies actually use: separate free accounts
            on various monitoring services, one per client or one per stack. This works in the sense that it technically
            monitors things, but it fails in every practical way.
          </p>
          <p>
            You can&rsquo;t see all clients at a glance. You can&rsquo;t compare uptime across clients. You can&rsquo;t manage notifications
            centrally. You have 20 different logins, 20 different dashboards, and 20 different notification configurations.
            When something goes wrong at 2 AM, you&rsquo;re logging into multiple services trying to figure out which client is
            affected and how badly.
          </p>
          <p>
            One dashboard, one tool, all clients. That&rsquo;s the agency monitoring setup that actually works under pressure.
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
