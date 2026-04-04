import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cross-Provider Deployment Tracking",
  description:
    "Track deployments from Vercel, GitHub Actions, Semaphore, and Kubernetes in one timeline. Automatic service correlation and CI status.",
  keywords: [
    "deployment tracking",
    "deployment dashboard",
    "vercel deployments",
    "github actions dashboard",
    "kubernetes deployments",
    "ci cd tracking",
    "deployment timeline",
    "multi-provider deployments",
    "deployment monitoring",
    "devops dashboard",
  ],
  alternates: {
    canonical: "https://cpi-control.com/features/deployments",
  },
  openGraph: {
    title: "Cross-Provider Deployment Tracking | CPI-Control",
    description:
      "Track deployments from Vercel, GitHub Actions, Semaphore, and Kubernetes in one timeline. Automatic service correlation and CI status.",
    url: "https://cpi-control.com/features/deployments",
    images: [
      {
        url: "/screenshots/05-deployments.png",
        width: 1920,
        height: 1080,
        alt: "CPI-Control deployment timeline showing deployments from Vercel, GitHub Actions, and Kubernetes",
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
          Deployment Tracking
          <span className="w-6 h-px bg-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6 text-gray-100">
          Every Deployment.<br />Every Provider.<br />One Timeline.
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-10">
          Stop switching between Vercel, GitHub, and your cluster dashboard.
          See every deployment in one filterable view.
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
            src="/screenshots/05-deployments.png"
            alt="CPI-Control deployment timeline showing multi-provider deployments with status, commit messages, and duration"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <Image src="/blog/deployment-tracking.png" alt="Cross-provider deployment tracking with Vercel, GitHub Actions, Semaphore, and Kubernetes in one timeline" width={1200} height={675} className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mt-12" />
    </section>
  );
}

function MultiProviderSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Providers</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Multi-Provider Support
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            CPI-Control pulls deployment data from Vercel, GitHub Actions, Semaphore CI, and Kubernetes
            automatically. Each deployment is correlated to the correct service using repository URLs,
            container images, and namespace bindings. No manual mapping required.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Vercel — project deployments with preview and production environments
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              GitHub Actions — workflow runs with job-level status
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Semaphore CI — pipeline executions with promotion tracking
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Kubernetes — rollout updates detected from deployment events
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Connected Providers</div>
            {[
              { name: "Vercel", count: 12, color: "bg-white", textColor: "text-gray-100" },
              { name: "GitHub Actions", count: 8, color: "bg-gray-400", textColor: "text-gray-100" },
              { name: "Semaphore CI", count: 3, color: "bg-green-400", textColor: "text-gray-100" },
              { name: "Kubernetes", count: 15, color: "bg-blue-400", textColor: "text-gray-100" },
            ].map((provider) => (
              <div key={provider.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-3 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${provider.color}`} />
                  <span className={`text-sm font-medium ${provider.textColor}`}>{provider.name}</span>
                </div>
                <span className="text-xs font-mono text-gray-500">{provider.count} deployments today</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RichDetailsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Details</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Rich Deployment Details
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Every deployment shows the service name, commit message, CI status, duration, and direct links
            back to the provider. Filter by provider, status, or environment to find exactly what you need.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Service name, commit SHA, and commit message
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              CI status with build duration and timestamps
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Direct links to the deployment in the provider dashboard
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Filter by provider, status (success/failed/building), and environment
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Recent Deployments</div>
            {[
              { svc: "api-gateway", msg: "fix: rate limiter config", status: "success", provider: "Vercel", time: "2m ago", duration: "48s" },
              { svc: "auth-service", msg: "feat: add SSO support", status: "building", provider: "GitHub", time: "5m ago", duration: "..." },
              { svc: "payment-svc", msg: "chore: bump deps", status: "failed", provider: "Semaphore", time: "12m ago", duration: "1m 34s" },
              { svc: "web-frontend", msg: "style: update nav colors", status: "success", provider: "Vercel", time: "18m ago", duration: "52s" },
            ].map((deploy) => (
              <div key={deploy.svc + deploy.time} className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-2 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${deploy.status === "success" ? "bg-green-400" : deploy.status === "failed" ? "bg-red-400" : "bg-amber-400 animate-pulse"}`} />
                    <span className="text-sm font-medium text-gray-200">{deploy.svc}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-600">{deploy.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate max-w-[200px]">{deploy.msg}</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <span>{deploy.provider}</span>
                    <span>{deploy.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NotificationsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Alerts</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Push Notifications
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Get notified instantly when a deployment fails. CPI-Control sends native desktop notifications
            with the service name, commit message, and provider. Muted services are automatically excluded —
            no alert storms during maintenance windows.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Native desktop notifications for failed deployments
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Mute-aware — no alerts for services in maintenance mode
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              In-app toast notifications with quick action links
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Click notification to jump directly to deployment details
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Notification Feed</div>
            {[
              { type: "error", title: "Deployment Failed", desc: "payment-svc — chore: bump deps (Semaphore)", time: "12m ago" },
              { type: "success", title: "Deployment Succeeded", desc: "api-gateway — fix: rate limiter config (Vercel)", time: "2m ago" },
              { type: "muted", title: "Muted — Skipped", desc: "staging-api — test: integration suite (GitHub)", time: "8m ago" },
            ].map((notif, i) => (
              <div key={i} className={`p-4 rounded-lg border mb-3 last:mb-0 ${notif.type === "error" ? "bg-red-500/5 border-red-500/20" : notif.type === "muted" ? "bg-gray-800/30 border-gray-700/30 opacity-50" : "bg-green-500/5 border-green-500/20"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold ${notif.type === "error" ? "text-red-400" : notif.type === "muted" ? "text-gray-500" : "text-green-400"}`}>{notif.title}</span>
                  <span className="text-[10px] font-mono text-gray-600">{notif.time}</span>
                </div>
                <p className="text-xs text-gray-400">{notif.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectViewsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Organization</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Project-Based Views
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Group related services into projects and see only the deployments that matter.
            Each project gets its own deployment tab, so you can focus on one product at a time
            without noise from unrelated services.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Group services into projects for focused views
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Dedicated deployment timeline per project
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Project-scoped incident history and health overview
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Cross-project global timeline always available
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Projects</div>
            {[
              { name: "E-Commerce Platform", services: 8, deploys: 23, status: "healthy" },
              { name: "Internal Tools", services: 4, deploys: 7, status: "healthy" },
              { name: "Data Pipeline", services: 6, deploys: 15, status: "degraded" },
            ].map((project) => (
              <div key={project.name} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-200">{project.name}</span>
                  <div className={`w-2 h-2 rounded-full ${project.status === "healthy" ? "bg-green-400" : "bg-amber-400"}`} />
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                  <span>{project.services} services</span>
                  <span>{project.deploys} deploys this week</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          One timeline for<br /><em className="text-blue-400 not-italic">every</em> deployment.
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Connect your providers and see every deployment — past, present, and in-progress —
          in one searchable, filterable view. Free for up to 50 services.
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

export default function DeploymentsFeaturePage() {
  return (
    <>
      <Nav />
      <Hero />
      <MultiProviderSection />
      <RichDetailsSection />
      <NotificationsSection />
      <ProjectViewsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
