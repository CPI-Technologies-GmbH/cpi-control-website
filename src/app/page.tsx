import Image from "next/image";

function Ticker() {
  const items = [
    "Free Download Available",
    "macOS & Windows",
    "100% Local Data — Zero Cloud",
    "Kubernetes + Vercel + GitHub + AWS",
    "Built with Tauri & React",
  ];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-9 bg-blue-600 overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap" style={{ animation: "tickerScroll 30s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[11px] font-semibold text-white px-10 uppercase tracking-widest">
            {item} <span className="opacity-50 mx-3">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-9 left-0 right-0 z-[100] px-6 md:px-12 py-4 flex items-center justify-between bg-[#0b1120]/85 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
        <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
        CPI-Control
      </div>
      <div className="flex items-center gap-7">
        <a href="#problems" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Why</a>
        <a href="#features" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Features</a>
        <a href="#pricing" className="text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors hidden md:block">Pricing</a>
        <a href="#download" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
          Download Free &#8595;
        </a>
      </div>
    </nav>
  );
}

function ScreenMockup({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-xl border border-gray-700/50 bg-gray-900 shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700/30">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="flex-1 mx-4">
            <div className="bg-gray-700/50 rounded-md px-3 py-1 text-[10px] font-mono text-gray-500 text-center max-w-xs mx-auto">CPI-Control</div>
          </div>
        </div>
        <Image src={src} alt={alt} width={1440} height={900} className="w-full h-auto" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="min-h-screen pt-44 pb-24 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div style={{ animation: "fadeSlideUp 1s ease 0.2s both" }}>
        <div className="font-mono text-xs font-medium text-blue-400 uppercase tracking-[0.12em] mb-7 flex items-center gap-3">
          <span className="w-6 h-px bg-blue-400" />
          Desktop App for DevOps
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-8 text-gray-100">
          Stop tab-hopping.<br />Start <em className="text-blue-400 not-italic">shipping.</em>
        </h1>
        <p className="text-lg leading-relaxed text-gray-400 max-w-lg mb-10">
          CPI-Control puts Kubernetes management, health monitoring,
          deployment tracking, and live logs into one native desktop app.
          Your data never leaves your machine.
        </p>
        <div className="flex gap-3 flex-wrap mb-12">
          <a href="#download" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
            &#8595;&ensp;Download for macOS
          </a>
          <a href="#download" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 font-mono text-sm font-semibold transition-all hover:bg-gray-800/50">
            Download for Windows
          </a>
        </div>
        <div className="flex gap-10 border-t border-gray-800 pt-7">
          {[
            { label: "Annual Cost", value: "€99", unit: "/yr" },
            { label: "Data in Cloud", value: "Zero", color: "text-green-400" },
            { label: "Setup Time", value: "2", unit: "min" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-mono text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">{s.label}</div>
              <div className={`text-3xl font-bold ${s.color || "text-gray-100"}`}>{s.value}{s.unit && <span className="text-base text-gray-500 ml-0.5">{s.unit}</span>}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block" style={{ animation: "fadeSlideUp 1s ease 0.5s both" }}>
        <ScreenMockup src="/screenshots/01-dashboard.png" alt="CPI-Control Dashboard" className="rotate-1 hover:rotate-0 transition-transform duration-500" />
      </div>
    </section>
  );
}

function IntegrationsBar() {
  const items = ["Kubernetes", "Vercel", "GitHub Actions", "AWS", "Google Cloud", "Azure", "DigitalOcean", "Semaphore CI", "Slack"];
  const doubled = [...items, ...items];
  return (
    <section className="py-20 border-t border-b border-gray-800/50 overflow-hidden">
      <p className="text-center font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-8">Works with your stack</p>
      <div className="flex gap-16 items-center" style={{ animation: "tickerScroll 25s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-sm font-medium text-gray-400 opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">{item}</span>
        ))}
      </div>
    </section>
  );
}

function ScreenshotShowcase() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-4">See it in action</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100">Every view, one app.</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <ScreenMockup src="/screenshots/02-services.png" alt="Service List" />
        <ScreenMockup src="/screenshots/05-deployments.png" alt="Deployments" />
        <ScreenMockup src="/screenshots/04-project-detail.png" alt="Project Detail" />
        <ScreenMockup src="/screenshots/06-incidents.png" alt="Incidents" />
      </div>
      <div className="mt-8">
        <ScreenMockup src="/screenshots/07-integrations.png" alt="Integrations" />
      </div>
    </section>
  );
}

function Problems() {
  const cards = [
    { tag: "Cost", title: "Your monitoring costs more than your servers.", desc: "Datadog's host-based pricing and log ingestion fees create bills that scale with your infrastructure — not your budget." },
    { tag: "Fragmentation", title: "Six tools. Six contexts. Zero overview.", desc: "Kubernetes in Lens. Deployments in Vercel. CI/CD in GitHub. Every tool knows one piece. No tool knows everything." },
    { tag: "Privacy", title: "Your data lives on someone else's servers.", desc: "Every SaaS monitoring tool ships your telemetry to US cloud providers. That's a compliance risk you carry every day." },
    { tag: "Speed", title: "3 AM alert. Five logins before you have context.", desc: "By the time you have context, your users already tweeted about it." },
  ];
  return (
    <section id="problems" className="py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 mb-20">
        <div>
          <div className="text-8xl font-bold text-gray-800/50 leading-none mb-[-10px]">01</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Your monitoring<br />stack is broken.</h2>
        </div>
        <div className="text-gray-400 text-base leading-relaxed border-t border-gray-800 pt-5">
          <p>The average DevOps engineer uses six different tools every day. Meanwhile, Datadog charges $15-40 per host per month. There&apos;s a better way.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-0.5">
        {cards.map((c) => (
          <div key={c.tag} className="group p-12 bg-gray-900 border border-gray-800/30 relative overflow-hidden hover:bg-gray-800/50 transition-colors">
            <div className="absolute top-0 left-0 w-[3px] h-0 bg-blue-500 group-hover:h-full transition-all duration-400" />
            <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">{c.tag}</div>
            <h3 className="text-xl font-semibold mb-3 leading-snug text-gray-100">{c.title}</h3>
            <p className="text-sm leading-relaxed text-gray-500">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const rows = [
    { num: "01", label: "Discovery", title: "Zero-config service discovery", desc: "Connect your kubeconfig, Vercel, and GitHub — CPI-Control finds every service automatically." },
    { num: "02", label: "Health", title: "Built-in health monitoring", desc: "HTTP health checks with automatic incident creation, auto-recovery, and response body capture." },
    { num: "03", label: "Kubernetes", title: "Multi-cluster Kubernetes management", desc: "Pod metrics, deployment restarts, CronJob management, and one-click terminal access to any pod." },
    { num: "04", label: "Deploys", title: "Cross-provider deployment tracking", desc: "Vercel, GitHub Actions, Semaphore, K8s — every deployment in one timeline with correlation engine." },
    { num: "05", label: "Logs", title: "Multi-cluster live logs", desc: "Aggregated via stern with in-memory ring buffer, SSE live tail, deduplication, and floating log window." },
    { num: "06", label: "AI", title: "AI-powered diagnostics", desc: "AI analyzes pod logs, events, and metrics to identify root cause and suggest fixes." },
    { num: "07", label: "Alerts", title: "Smart push notifications", desc: "Mute-aware alerts with batching and routing to Slack, email, or webhooks." },
    { num: "08", label: "Projects", title: "Project-based organization", desc: "Group services into projects with dedicated dashboards, timelines, and incident history." },
    { num: "09", label: "Privacy", title: "100% local. Zero cloud dependency.", desc: "SQLite + macOS Keychain. No cloud account. No telemetry. GDPR-compliant by architecture." },
  ];
  return (
    <section id="features" className="py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <div className="text-8xl font-bold text-gray-800/50 leading-none mb-[-10px]">02</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Everything you need.<br />Nothing you don&apos;t.</h2>
      </div>
      {rows.map((r) => (
        <div key={r.num} className="grid lg:grid-cols-[280px_1fr] border-t border-gray-800/60 hover:bg-white/[0.015] transition-colors">
          <div className="py-8 pr-8 font-mono text-sm font-semibold text-blue-400 flex items-start gap-3">
            <span className="text-[10px] text-gray-600">{r.num}</span> {r.label}
          </div>
          <div className="py-8 pl-0 lg:pl-8 lg:border-l border-gray-800/40">
            <h3 className="text-lg font-semibold mb-2 text-gray-100">{r.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xl">{r.desc}</p>
          </div>
        </div>
      ))}
      <div className="border-b border-gray-800/60" />
    </section>
  );
}

function Comparison() {
  const rows = [
    { f: "Annual Cost", cpi: "€99-149", dd: "€9K-30K+", lens: "€299", bs: "€1.5K-3K" },
    { f: "K8s Management", cpi: "Multi-cluster", dd: "Metrics only", lens: "Full IDE", bs: "—" },
    { f: "Health Monitoring", cpi: "Built-in", dd: "Synthetics", lens: "—", bs: "Core feature" },
    { f: "Deploy Tracking", cpi: "Multi-provider", dd: "Yes", lens: "—", bs: "—" },
    { f: "Live Logs", cpi: "Multi-cluster", dd: "Indexed", lens: "Per-pod", bs: "Aggregated" },
    { f: "Terminal to Pod", cpi: "Yes", dd: "—", lens: "Yes", bs: "—" },
    { f: "AI Diagnostics", cpi: "Yes", dd: "Watchdog", lens: "Prism AI", bs: "—" },
    { f: "Data Location", cpi: "Your machine", dd: "US Cloud", lens: "Local", bs: "EU/US Cloud" },
    { f: "Native Desktop", cpi: "Tauri (Rust)", dd: "—", lens: "Electron", bs: "—" },
  ];
  return (
    <section id="pricing" className="py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 mb-20">
        <div>
          <div className="text-8xl font-bold text-gray-800/50 leading-none mb-[-10px]">03</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">The honest<br />comparison.</h2>
        </div>
        <div className="text-gray-400 text-base leading-relaxed border-t border-gray-800 pt-5">
          <p>We&apos;re building for the engineer who manages 3 clusters, 20 services, and doesn&apos;t want to spend &#8364;30K/year to know if things are running.</p>
        </div>
      </div>
      <div className="border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide" />
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-blue-400 uppercase tracking-wide">CPI-Control</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Datadog</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Lens Pro</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Better Stack</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-800/30 hover:bg-white/[0.02]">
                <td className="p-4 text-sm font-medium text-gray-200">{r.f}</td>
                <td className={`p-4 text-sm font-semibold bg-blue-500/5 ${r.f === "Annual Cost" ? "text-green-400 text-lg" : r.f === "Data Location" ? "text-green-400" : "text-gray-100"}`}>{r.cpi}</td>
                <td className={`p-4 text-sm text-gray-400 ${r.f === "Annual Cost" ? "text-red-400/70" : ""}`}>{r.dd}</td>
                <td className="p-4 text-sm text-gray-400">{r.lens}</td>
                <td className="p-4 text-sm text-gray-400">{r.bs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="download" className="py-44 px-6 text-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_60%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
          Download CPI-Control.<br />It&apos;s <em className="text-blue-400 not-italic">free</em> to start.
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Get started with up to 5 services and 1 cluster — no account required, no credit card, no data leaves your machine.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-7">
          <a href="#" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">&#8595;&ensp;Download for macOS</a>
          <a href="#" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 font-mono text-[15px] font-semibold transition-all hover:bg-gray-800/50">Download for Windows</a>
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
        {["Docs", "GitHub", "Changelog", "Privacy"].map((l) => (
          <a key={l} href="#" className="hover:text-gray-300 transition-colors">{l}</a>
        ))}
      </div>
      <div>&copy; 2026 CPI Technologies GmbH</div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav />
      <Hero />
      <IntegrationsBar />
      <ScreenshotShowcase />
      <Problems />
      <Features />
      <Comparison />
      <FinalCTA />
      <Footer />
    </>
  );
}
