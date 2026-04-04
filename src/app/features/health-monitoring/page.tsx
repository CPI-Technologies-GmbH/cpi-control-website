import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Built-in Health Monitoring",
  description:
    "HTTP health checks with automatic incident detection, response body capture, and push notifications. Free, local, and GDPR-compliant.",
  keywords: [
    "health monitoring",
    "uptime monitoring",
    "http health checks",
    "incident detection",
    "auto recovery monitoring",
    "free uptime monitor",
    "self-hosted monitoring",
    "gdpr compliant monitoring",
    "pingdom alternative",
    "uptimerobot alternative",
  ],
  alternates: {
    canonical: "https://cpi-control.com/features/health-monitoring",
  },
  openGraph: {
    title: "Built-in Health Monitoring | CPI-Control",
    description:
      "HTTP health checks with automatic incident detection, response body capture, and push notifications. Free, local, and GDPR-compliant.",
    url: "https://cpi-control.com/features/health-monitoring",
    images: [
      {
        url: "/screenshots/06-incidents.png",
        width: 1920,
        height: 1080,
        alt: "CPI-Control incident timeline showing automatic detection, response capture, and recovery tracking",
      },
    ],
  },
};

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-4 flex items-center justify-between bg-[#0b1120]/85 backdrop-blur-xl border-b border-white/5">
      <a href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
        <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
        CPI-Control
      </a>
      <div className="flex items-center gap-7">
        <a href="/#features" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Features</a>
        <a href="/#pricing" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Pricing</a>
        <a href="/changelog" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Changelog</a>
        <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
          Download Free &#8595;
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto" style={{ animation: "fadeSlideUp 1s ease 0.2s both" }}>
      <div className="text-center mb-14">
        <div className="font-mono text-xs font-medium text-blue-400 uppercase tracking-[0.12em] mb-5 flex items-center justify-center gap-3">
          <span className="w-6 h-px bg-blue-400" />
          Health Monitoring
          <span className="w-6 h-px bg-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6 text-gray-100">
          Health Monitoring That<br />Works Out of the Box
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-10">
          Automatic health checks, incident detection, and recovery — without a cloud
          account or monthly fee.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
            &#8595;&ensp;Download for macOS
          </a>
          <a href="/api/download?platform=windows" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 font-mono text-sm font-semibold transition-all hover:bg-gray-800/50">
            Download for Windows
          </a>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-4 bg-blue-500/5 rounded-2xl blur-xl" />
        <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
          <Image
            src="/screenshots/06-incidents.png"
            alt="CPI-Control incident detail view showing automatic detection, response body capture, and timeline"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <Image src="/blog/health-monitoring-hero.png" alt="Built-in health monitoring with automatic incident detection, response body capture, and push notifications" width={1200} height={675} className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mt-12" />
    </section>
  );
}

function HTTPChecksSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Configuration</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Configurable HTTP Checks
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Set custom check intervals, timeouts, and expected status codes for each service. CPI-Control
            uses smart status mapping — a 404 response means the route exists and the server is healthy,
            while a 503 or connection timeout means the service is actually down.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Custom check intervals — from 30 seconds to 15 minutes
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Configurable request timeouts per service
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Expected status codes — define what &quot;healthy&quot; means for each endpoint
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Smart status mapping — 404 = healthy, 503 = down, timeout = down
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Health Check Config</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1.5 block">Endpoint</label>
                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm font-mono text-gray-200">https://api.example.com/health</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-mono mb-1.5 block">Interval</label>
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm font-mono text-gray-200">60s</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-mono mb-1.5 block">Timeout</label>
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm font-mono text-gray-200">10s</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1.5 block">Status Mapping</label>
                <div className="space-y-1.5 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">200, 201, 204</span>
                    <span className="text-green-400">Healthy</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">404</span>
                    <span className="text-green-400">Healthy</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">500, 502, 503</span>
                    <span className="text-red-400">Down</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Timeout</span>
                    <span className="text-red-400">Down</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncidentDetectionSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Detection</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Automatic Incident Detection
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            When a health check fails multiple times in a row, CPI-Control automatically creates an incident
            with full metadata — the HTTP status code, response body, response headers, and the exact
            timestamp of first failure. No manual incident creation, no missed outages.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Consecutive failure threshold — avoid false positives from single blips
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Full response body captured for debugging
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Response headers and status codes stored with each incident
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Push notification sent immediately when an incident is created
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Incident Timeline</div>
            {[
              { time: "14:30:00", event: "Health check OK", status: "200", color: "bg-green-400", textColor: "text-green-400" },
              { time: "14:31:00", event: "Health check failed", status: "503", color: "bg-red-400", textColor: "text-red-400" },
              { time: "14:32:00", event: "Health check failed (2/3)", status: "503", color: "bg-red-400", textColor: "text-red-400" },
              { time: "14:33:00", event: "Incident created", status: "503", color: "bg-red-500", textColor: "text-red-400" },
              { time: "14:33:01", event: "Notification sent", status: "---", color: "bg-blue-400", textColor: "text-blue-400" },
            ].map((entry, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${entry.color} shrink-0 mt-1`} />
                  {i < 4 && <div className="w-px h-6 bg-gray-700/50" />}
                </div>
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-medium ${entry.textColor}`}>{entry.event}</span>
                    {entry.status !== "---" && <span className="text-[10px] font-mono text-gray-600 ml-2">HTTP {entry.status}</span>}
                  </div>
                  <span className="text-[10px] font-mono text-gray-600">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AutoRecoverySection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Recovery</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Auto-Recovery
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            When a service comes back online, CPI-Control detects the recovery automatically and resolves the
            incident. The incident record is updated with the recovery timestamp and total downtime duration.
            A recovery notification is sent so your team knows the issue is resolved.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Automatic incident resolution when service recovers
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Total downtime duration calculated and stored
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Recovery notification sent to all configured channels
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Full incident history preserved for post-mortems
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Incident #127 — Resolved</div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-red-400">Incident Started</span>
                  <span className="text-xs font-mono text-gray-500">14:33:00 UTC</span>
                </div>
                <p className="text-xs text-gray-400">api-gateway returned HTTP 503 for 3 consecutive checks</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-400">Auto-Recovered</span>
                  <span className="text-xs font-mono text-gray-500">14:41:00 UTC</span>
                </div>
                <p className="text-xs text-gray-400">Service returned HTTP 200 — incident resolved automatically</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700/30 text-xs font-mono">
                <span className="text-gray-500">Total downtime</span>
                <span className="text-amber-400">8 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MuteSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Maintenance</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Mute & Maintenance
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Deploying a big migration? Doing scheduled maintenance? Mute individual services to suppress
            alerts without disabling monitoring. Choose timed mutes that expire automatically, or permanent
            mutes that stay until you lift them. No alert storms. No false pages.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Mute individual services — not your entire monitoring
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Timed mutes — automatically expire after 15 min, 1 hour, or custom duration
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Permanent mutes for services under long-term maintenance
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Health checks continue running — data is recorded, only alerts are suppressed
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Service Status</div>
            {[
              { name: "api-gateway", status: "Healthy", muted: false, uptime: "99.98%" },
              { name: "payment-svc", status: "Muted (15m)", muted: true, uptime: "99.95%" },
              { name: "web-frontend", status: "Healthy", muted: false, uptime: "99.99%" },
              { name: "batch-worker", status: "Muted (perm)", muted: true, uptime: "---" },
              { name: "auth-service", status: "Healthy", muted: false, uptime: "100%" },
            ].map((svc) => (
              <div key={svc.name} className={`flex items-center justify-between p-3 rounded-lg border mb-2 last:mb-0 ${svc.muted ? "bg-gray-800/30 border-gray-700/20 opacity-60" : "bg-gray-800/50 border-gray-700/30"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${svc.muted ? "bg-gray-500" : "bg-green-400"}`} />
                  <span className="text-sm font-mono text-gray-200">{svc.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-gray-500">{svc.uptime}</span>
                  <span className={svc.muted ? "text-amber-400" : "text-green-400"}>{svc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Benefits</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          Why built-in monitoring wins
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "No Separate Tool",
            desc: "Health monitoring is built into CPI-Control. No Pingdom, no UptimeRobot, no additional SaaS subscription. One app, one dashboard, full picture.",
          },
          {
            title: "GDPR-Compliant",
            desc: "All monitoring data stays on your local machine. No health check results are sent to third-party servers. No DPA required.",
          },
          {
            title: "Correlated Context",
            desc: "When a service goes down, you see the latest deployment, the Kubernetes pod status, and the live logs — all in the same app. No tab-switching for context.",
          },
        ].map((benefit) => (
          <div key={benefit.title} className="p-8 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">{benefit.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-36 px-6 text-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_60%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
          Monitor everything.<br />Pay <em className="text-blue-400 not-italic">nothing.</em>
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Built-in health monitoring for up to 50 services. No cloud account, no credit card,
          no data leaves your machine. Download and start monitoring in two minutes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-7">
          <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
            &#8595;&ensp;Download for macOS
          </a>
          <a href="/api/download?platform=windows" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 font-mono text-[15px] font-semibold transition-all hover:bg-gray-800/50">
            Download for Windows
          </a>
        </div>
        <div className="flex gap-6 justify-center flex-wrap font-mono text-xs text-gray-500">
          <span>macOS 12+ (.dmg)</span>
          <span>Windows 10+ (.msi)</span>
          <span>~45 MB</span>
          <span>No account needed</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-5 font-mono text-[11px] text-gray-500">
      <div className="flex items-center gap-3 font-semibold text-gray-300">
        <Image src="/app-icon.png" alt="CPI-Control" width={20} height={20} className="rounded" />
        CPI-Control
      </div>
      <div className="flex gap-6">
        <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
        <a href="https://github.com/CPI-Technologies-GmbH/cpi-control" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</a>
        <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-gray-300 transition-colors">Terms</a>
      </div>
      <a href="https://cpitech.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-gray-600">Powered by</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://www.cpitech.io/images/68f8d51c2f57198f96420746_logo.svg" alt="CPI Technologies GmbH" className="h-4 opacity-50" />
      </a>
    </footer>
  );
}

export default function HealthMonitoringFeaturePage() {
  return (
    <>
      <Nav />
      <Hero />
      <HTTPChecksSection />
      <IncidentDetectionSection />
      <AutoRecoverySection />
      <MuteSection />
      <BenefitsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
