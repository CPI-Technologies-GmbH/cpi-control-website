import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why We Switched from Better Stack to a Local Solution",
  description:
    "How we migrated from Better Stack to CPI-Control for infrastructure monitoring. A candid look at what we gained, what we lost, and when Better Stack is still the better choice.",
};

export default function WhyWeSwitchedFromBetterStack() {
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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            Case Study
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-4">
            Why We Switched from Better Stack to a Local Solution
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>7 min read</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>April 2026</span>
          </div>
        </div>

        <Image
          src="/blog/status-page-hero.png"
          alt="Switching from Better Stack to self-hosted monitoring"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />

        {/* Body */}
        <div className="space-y-6 text-[16px] leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">We Liked Better Stack. Then We Did the Math.</h2>
          <p>
            Let us start with the honest part: Better Stack is a well-designed product. The uptime monitoring is reliable, the status pages look professional, and the incident management workflow is thoughtful. When we first set it up for our infrastructure consultancy, it felt like a significant step up from the patchwork of scripts and manual checks we had been using.
          </p>
          <p>
            We ran Better Stack for about fourteen months. During that time, our infrastructure grew from eight services to around thirty, spread across two Kubernetes clusters, a handful of Vercel deployments, and a few standalone services on DigitalOcean. As our footprint expanded, three issues became impossible to ignore: the monthly cost was growing linearly with our infrastructure, all of our operational telemetry was being sent to a cloud we did not control, and we were paying for a subset of the monitoring capabilities we actually needed while missing others entirely.
          </p>
          <p>
            This is the story of how we migrated away from Better Stack and what we learned in the process.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">The Three Problems</h2>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">1. Vendor Lock-in and Growing Costs</h3>
          <p>
            Better Stack's pricing is reasonable for what it offers. The Team plan runs around $85 per month for basic monitoring, and costs scale with the number of monitors, team members, and log volume. For our thirty-service setup with three team members, we were paying approximately $120 per month, or about 1,400 euros per year. That is not outrageous, but it was money spent on something we increasingly felt we could handle locally.
          </p>
          <p>
            More importantly, we were accumulating configuration debt. Our status pages, incident timelines, on-call schedules, and monitoring rules all lived in Better Stack. The more we invested in the platform, the harder it became to consider leaving. That is vendor lock-in working as intended, and we wanted to get ahead of it before the switching cost became prohibitive.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2. Data Leaving the EU</h3>
          <p>
            As a German infrastructure consultancy working with European clients, we care about data sovereignty. Better Stack processes monitoring data in the cloud, which means our health check results, incident logs, and service metadata are stored on infrastructure we do not control. For some of our client engagements, this created awkward conversations about compliance.
          </p>
          <p>
            We are not suggesting that Better Stack is irresponsible with data. They are not. But for our use case, having the ability to point to a fully local monitoring setup where no operational data leaves the building was a genuine business advantage.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">3. Feature Gaps and Feature Overlap</h3>
          <p>
            Better Stack excels at HTTP uptime monitoring and status pages but does not offer Kubernetes management, deployment tracking across providers, or real-time log streaming from pods. We were supplementing Better Stack with kubectl for cluster management, manual deployment tracking in a spreadsheet, and stern for log streaming. Meanwhile, we were paying for Better Stack features we barely used, like their incident escalation chains designed for larger teams.
          </p>
          <p>
            The mismatch between what we were paying for and what we actually needed became the trigger for evaluating alternatives.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">How We Replaced Each Feature</h2>
          <p>
            We did not migrate everything overnight. It was a gradual process over about three weeks, running both systems in parallel until we were confident nothing was falling through the cracks.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Status Pages</h3>
          <p>
            Better Stack's status pages were one of the features we used most. They are clean, customizable, and give clients a URL to check during incidents. Replacing this required CPI-Control's monitoring agent, a lightweight Go binary that runs on a server and serves branded status pages. The agent communicates with the CPI-Control desktop app over a secure connection and receives service health data to display.
          </p>
          <p>
            The setup took about fifteen minutes: deploy the agent on a small server, point a subdomain at it, and configure which services to expose on the status page. The result is functionally equivalent to what Better Stack provided, with the added benefit that we control the infrastructure hosting it.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Uptime Monitoring</h3>
          <p>
            Better Stack's heartbeat monitoring and HTTP checks were replaced by CPI-Control's built-in health monitoring. CPI-Control automatically discovers services through its provider integrations (Kubernetes, Vercel, GitHub, DigitalOcean) and monitors their health status. For Kubernetes services, it watches pod status, resource usage, and events. For external services, it performs health checks based on the configured endpoints.
          </p>
          <p>
            The transition was seamless because CPI-Control's service discovery is automatic. Once we connected our clusters and providers, CPI-Control picked up all our services and started monitoring them without manual configuration. We did not have to recreate thirty individual monitors.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Incident Management</h3>
          <p>
            Better Stack's incident management includes an incident timeline, status updates, and team notifications. CPI-Control handles this differently. It automatically detects incidents when service health changes, records the timeline locally, and sends push notifications through the desktop app. The notification system supports both in-app toast notifications and system-level notifications through the Notification API.
          </p>
          <p>
            We lost Better Stack's incident update broadcasting to stakeholders, but we gained something arguably more useful: automatic incident detection that does not require someone to manually create an incident. When a Kubernetes pod starts crash-looping, CPI-Control detects it immediately, creates an incident entry, and notifies the relevant team member. With Better Stack, we first had to be alerted that the health check was failing, then manually create an incident, then update it as we worked through the resolution.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">What We Gained</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Full data ownership:</strong> All monitoring data, health check results, incident history, and service metadata is stored locally in a SQLite database on our machines. Nothing leaves our infrastructure. When a client asks where their monitoring data is stored, the answer is "on the engineer's laptop, nowhere else."
            </li>
            <li>
              <strong className="text-gray-200">Zero monthly costs:</strong> CPI-Control is free for up to 50 services. Our annual monitoring bill went from roughly 1,400 euros to zero. Over a five-year horizon, that is 7,000 euros saved, which is meaningful for a small consultancy.
            </li>
            <li>
              <strong className="text-gray-200">Faster data access:</strong> Querying local data is inherently faster than making API calls to a cloud service. Health status, deployment history, and logs are available instantly rather than waiting for a round trip to Better Stack's servers.
            </li>
            <li>
              <strong className="text-gray-200">Unified operational view:</strong> Instead of Better Stack for uptime plus kubectl for Kubernetes plus manual tracking for deployments, we have a single application that covers all three. The context switching reduction alone was worth the migration.
            </li>
            <li>
              <strong className="text-gray-200">Kubernetes management:</strong> This was a net new capability. Better Stack does not manage Kubernetes resources. CPI-Control gives us pod management, resource metrics, events, and terminal access alongside the monitoring features. We retired our separate Kubernetes dashboard.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">What We Lost</h2>
          <p>
            We would not be honest if we did not acknowledge the trade-offs.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Managed log storage:</strong> Better Stack includes log management with searchable, retained logs. CPI-Control streams logs in real-time via stern and buffers them in memory, but does not provide long-term log storage. If you need to search through logs from last week, you need a separate solution. For us, this was acceptable because we rarely needed historical logs and could always check the cluster directly when we did.
            </li>
            <li>
              <strong className="text-gray-200">Public incident pages with subscriber notifications:</strong> Better Stack's incident pages let users subscribe to updates via email. CPI-Control's status pages are public but do not include subscriber management. We solved this for our most critical client-facing services by adding a simple email notification through our existing communication channels, but it is a manual process rather than an automated one.
            </li>
            <li>
              <strong className="text-gray-200">Monitoring when offline:</strong> Because CPI-Control runs as a desktop app, monitoring only happens when the app is running on an engineer's machine. The monitoring agent handles status pages independently, but the full monitoring and notification pipeline requires the desktop app. Better Stack, being cloud-hosted, monitored 24/7 regardless. In practice, we have the desktop app running during work hours and the monitoring agent covers critical health checks around the clock.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">When Better Stack Is Still Better</h2>
          <p>
            Not every team should make this switch. Better Stack remains the better choice in several scenarios:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Pure SaaS teams with no Kubernetes:</strong> If your infrastructure is entirely managed services (Heroku, Railway, Render) with no Kubernetes, CPI-Control's strengths in cluster management are irrelevant. Better Stack's simple HTTP monitoring is exactly what you need.
            </li>
            <li>
              <strong className="text-gray-200">Teams that need managed log storage:</strong> If searching through historical logs is a daily activity for your team, Better Stack's integrated log management is genuinely valuable. CPI-Control's real-time streaming model is not a replacement for indexed, searchable log storage.
            </li>
            <li>
              <strong className="text-gray-200">Organizations requiring 24/7 monitoring without desktop dependency:</strong> If you need guaranteed monitoring that runs regardless of whether any team member has their laptop open, a cloud-hosted solution like Better Stack provides that reliability inherently.
            </li>
            <li>
              <strong className="text-gray-200">Teams with complex on-call rotations:</strong> Better Stack's on-call scheduling and escalation policies are designed for teams with multiple tiers of responders. CPI-Control's notification system is simpler and does not include on-call rotation management.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Final Thoughts</h2>
          <p>
            Switching monitoring tools is never a decision to take lightly. There is always a period of uncertainty where you are not sure if the new tool covers every edge case the old one handled. For us, the migration took three weeks of parallel running, and by the end of that period, we were confident that CPI-Control covered everything we actually used in Better Stack while adding Kubernetes management and deployment tracking we previously handled manually.
          </p>
          <p>
            The annual savings are nice. The data sovereignty is a genuine business advantage. But the biggest win was consolidation. Instead of three separate tools for monitoring, Kubernetes management, and deployment tracking, we have one. That reduction in complexity is hard to put a price on, but every engineer on the team feels it daily.
          </p>
          <p>
            If you are evaluating whether to make a similar switch, our advice is simple: install CPI-Control alongside your existing monitoring tool and run both for two weeks. It takes two minutes to set up and costs nothing. If it covers your needs, you will know within the first week. If it does not, you have lost nothing but a few minutes of setup time.
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
