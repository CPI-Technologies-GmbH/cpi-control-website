import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Multi-Cluster Live Log Aggregation",
  description:
    "Stream live Kubernetes logs from multiple clusters without Loki or Datadog. stern-based collection, multi-service views, and zero infrastructure overhead.",
  keywords: [
    "kubernetes logs",
    "live log streaming",
    "kubernetes log aggregation",
    "stern logs",
    "multi-cluster logs",
    "kubernetes log viewer",
    "loki alternative",
    "datadog logs alternative",
    "free log aggregation",
    "kubernetes live tail",
  ],
  alternates: {
    canonical: "https://cpi-control.com/features/live-logs",
  },
  openGraph: {
    title: "Multi-Cluster Live Log Aggregation | CPI-Control",
    description:
      "Stream live Kubernetes logs from multiple clusters without Loki or Datadog. stern-based collection, multi-service views, and zero infrastructure overhead.",
    url: "https://cpi-control.com/features/live-logs",
    images: [
      {
        url: "/screenshots/02-services.png",
        width: 1920,
        height: 1080,
        alt: "CPI-Control live log aggregation from multiple Kubernetes clusters",
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
          Live Logs
          <span className="w-6 h-px bg-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6 text-gray-100">
          Live Logs Without<br />the Infrastructure
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-10">
          Stream, filter, and search logs from all your Kubernetes pods — no Loki,
          no Elasticsearch, no cloud account.
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

      {/* Animated live log demo instead of screenshot */}
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-4 bg-blue-500/5 rounded-2xl blur-xl" />
        <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-[#0d1117] p-5 font-mono text-xs shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-gray-500">Live Logs — 3 services selected</span>
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-gray-600">
              <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">INF</span>
              <span className="px-2 py-0.5 rounded bg-gray-800 text-amber-400">WRN</span>
              <span className="px-2 py-0.5 rounded bg-gray-800 text-red-400">ERR</span>
            </div>
          </div>
          {[
            { time: "14:32:01.234", svc: "api-gateway", level: "INF", msg: "GET /api/v1/users 200 OK (12ms)", svcColor: "text-blue-400" },
            { time: "14:32:01.456", svc: "auth-service", level: "INF", msg: "Token validated for user_id=8291 scope=read,write", svcColor: "text-purple-400" },
            { time: "14:32:01.891", svc: "api-gateway", level: "INF", msg: "GET /api/v1/projects 200 OK (34ms)", svcColor: "text-blue-400" },
            { time: "14:32:02.102", svc: "payment-svc", level: "WRN", msg: "Stripe webhook retry attempt 2/5 for evt_1234", svcColor: "text-green-400" },
            { time: "14:32:02.340", svc: "api-gateway", level: "INF", msg: "POST /api/v1/deploy 202 Accepted (8ms)", svcColor: "text-blue-400" },
            { time: "14:32:02.567", svc: "auth-service", level: "INF", msg: "Session refreshed for user_id=4102 ttl=3600s", svcColor: "text-purple-400" },
            { time: "14:32:03.001", svc: "payment-svc", level: "ERR", msg: "Stripe webhook failed: Connection timeout after 30s", svcColor: "text-green-400" },
            { time: "14:32:03.210", svc: "api-gateway", level: "INF", msg: "GET /health 200 OK (1ms)", svcColor: "text-blue-400" },
            { time: "14:32:03.445", svc: "auth-service", level: "INF", msg: "Rate limit check: 42/1000 requests in current window", svcColor: "text-purple-400" },
            { time: "14:32:03.678", svc: "payment-svc", level: "INF", msg: "Invoice inv_5678 created amount=49.99 currency=EUR", svcColor: "text-green-400" },
            { time: "14:32:04.012", svc: "api-gateway", level: "WRN", msg: "Slow upstream response from payment-svc (2.1s)", svcColor: "text-blue-400" },
            { time: "14:32:04.234", svc: "auth-service", level: "INF", msg: "New API key issued for org_id=301 name=ci-deploy", svcColor: "text-purple-400" },
          ].map((log, i) => (
            <div key={i} className="flex gap-3 py-0.5 hover:bg-white/[0.02]">
              <span className="text-gray-600 shrink-0">{log.time}</span>
              <span className={`${log.svcColor} shrink-0 w-24 truncate`}>{log.svc}</span>
              <span className={`shrink-0 w-8 ${log.level === "ERR" ? "text-red-400" : log.level === "WRN" ? "text-amber-400" : "text-gray-500"}`}>{log.level}</span>
              <span className="text-gray-300">{log.msg}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-500">Streaming from 2 clusters, 4 namespaces</span>
            </div>
            <span className="text-gray-600">Buffer: 12,847 / 50,000 lines</span>
          </div>
        </div>
      </div>

      <Image src="/blog/live-logs-hero.png" alt="Live Kubernetes log aggregation with multi-service views, stern-based collection, and zero infrastructure overhead" width={1200} height={675} className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mt-12" />
    </section>
  );
}

function SternSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Collection</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            stern-Based Collection
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            CPI-Control spawns background stern processes for each connected namespace. Logs are collected
            continuously into an in-memory ring buffer and streamed to the UI via Server-Sent Events.
            No log files on disk, no database writes, no ingestion pipeline.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Background stern processes — one per namespace per cluster
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              In-memory ring buffer with configurable size (default 50K lines)
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              SSE live streaming — logs appear in the UI within milliseconds
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Automatic process recovery if stern crashes or disconnects
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Log Collectors</div>
            {[
              { cluster: "production-eu", ns: "default", pods: 12, rate: "~340 lines/min", status: "active" },
              { cluster: "production-eu", ns: "monitoring", pods: 4, rate: "~80 lines/min", status: "active" },
              { cluster: "staging-us", ns: "default", pods: 8, rate: "~120 lines/min", status: "active" },
              { cluster: "staging-us", ns: "batch-jobs", pods: 3, rate: "~45 lines/min", status: "paused" },
            ].map((collector) => (
              <div key={collector.cluster + collector.ns} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-2 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${collector.status === "active" ? "bg-green-400" : "bg-gray-500"}`} />
                  <div>
                    <span className="text-xs font-mono text-gray-200 block">{collector.cluster}</span>
                    <span className="text-[10px] font-mono text-gray-500">{collector.ns} ({collector.pods} pods)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{collector.rate}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-700/30 text-xs font-mono text-gray-500 flex justify-between">
              <span>Ring buffer: 12,847 / 50,000</span>
              <span>~585 lines/min total</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiServiceSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Views</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Multi-Service Views
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Select multiple services and see their logs interleaved in real time. Each service gets a
            color-coded badge so you can instantly tell which service produced which line. Pause the stream,
            search through the buffer, or filter by log level — all without losing your place.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Select any combination of services across clusters
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Color-coded service badges for instant identification
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Pause/resume without losing incoming logs
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Full-text search across the entire ring buffer
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Selected Services</div>
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { name: "api-gateway", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { name: "auth-service", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                { name: "payment-svc", color: "bg-green-500/20 text-green-400 border-green-500/30" },
              ].map((svc) => (
                <span key={svc.name} className={`px-2.5 py-1 rounded text-xs font-mono border ${svc.color}`}>{svc.name}</span>
              ))}
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              {[
                { svc: "api", color: "text-blue-400", msg: "Request processed in 12ms" },
                { svc: "auth", color: "text-purple-400", msg: "Token refresh completed" },
                { svc: "api", color: "text-blue-400", msg: "Upstream timeout: payment-svc" },
                { svc: "pay", color: "text-green-400", msg: "Retry queue: 3 pending" },
                { svc: "auth", color: "text-purple-400", msg: "Session cache hit rate: 94%" },
                { svc: "pay", color: "text-green-400", msg: "Invoice created: EUR 49.99" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-2 p-1 hover:bg-white/[0.02] rounded">
                  <span className={`${log.color} w-8 shrink-0`}>{log.svc}</span>
                  <span className="text-gray-400">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingWindowSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Window</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Floating Log Window
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Detach the log viewer into a separate window that stays on top. Monitor logs on a second monitor
            while you navigate dashboards, manage deployments, or investigate incidents in the main window.
            The floating window maintains its own scroll position and filter state.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              One-click detach into a separate always-on-top window
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Independent scroll position and filter state
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Perfect for multi-monitor setups
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Re-dock back into the main window at any time
            </li>
          </ul>
        </div>
        <div className="relative">
          {/* Main window */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[10px] font-mono text-gray-500">CPI-Control — Dashboard</span>
            </div>
            <div className="h-28 rounded bg-gray-800/30 border border-gray-700/20 flex items-center justify-center">
              <span className="text-xs text-gray-600 font-mono">Service Dashboard</span>
            </div>
          </div>
          {/* Floating window */}
          <div className="absolute -bottom-6 -right-4 w-72 rounded-xl border border-blue-500/30 bg-[#0d1117] p-4 shadow-2xl shadow-blue-500/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
              <span className="ml-1 text-[9px] font-mono text-gray-500">Floating Logs</span>
              <div className="flex-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="space-y-0.5 font-mono text-[9px]">
              <div className="text-gray-400"><span className="text-blue-400">api</span> GET /health 200</div>
              <div className="text-gray-400"><span className="text-purple-400">auth</span> Token validated</div>
              <div className="text-gray-400"><span className="text-green-400">pay</span> Invoice created</div>
              <div className="text-amber-400"><span className="text-blue-400">api</span> Slow response 2.1s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZeroOverheadSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Zero Overhead</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          No infrastructure to maintain
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Traditional log aggregation means running Loki, Elasticsearch, or paying for Datadog&apos;s log ingestion.
          CPI-Control needs none of that.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "No Disk Storage", desc: "Logs live in a ring buffer in memory. When the buffer is full, the oldest lines are evicted. No log rotation, no disk cleanup." },
          { title: "No Database", desc: "No Elasticsearch cluster. No ClickHouse. No TimescaleDB. The ring buffer is the only storage, and it resets when you restart." },
          { title: "No Cloud Account", desc: "No AWS CloudWatch, no GCP Cloud Logging, no Datadog log ingestion. Your logs never leave your machine." },
          { title: "No Maintenance", desc: "No index management, no retention policies, no storage capacity planning. Just connect your cluster and view logs." },
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <h3 className="text-base font-semibold text-gray-100 mb-3">{item.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: "Setup time", cpi: "0 minutes", loki: "Hours", datadog: "Minutes" },
    { feature: "Infrastructure needed", cpi: "None", loki: "Loki + Grafana + Promtail", datadog: "Agent per host" },
    { feature: "Cost (50 services)", cpi: "Free", loki: "Self-hosted cost", datadog: "$200+/month" },
    { feature: "Multi-cluster", cpi: "Built-in", loki: "Manual config", datadog: "Built-in" },
    { feature: "Multi-service view", cpi: "Yes", loki: "LogQL queries", datadog: "Yes" },
    { feature: "Floating window", cpi: "Yes", loki: "---", datadog: "---" },
    { feature: "Data location", cpi: "Your machine", loki: "Your cluster", datadog: "US Cloud" },
    { feature: "Retention", cpi: "Ring buffer (memory)", loki: "Configurable", datadog: "15 days (default)" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Comparison</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          CPI-Control vs. log infrastructure
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          CPI-Control trades long-term log retention for zero operational overhead.
          If you need live debugging and tail-style log viewing, it does the job without the baggage.
        </p>
      </div>
      <div className="border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[540px]">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide" />
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-blue-400 uppercase tracking-wide">CPI-Control</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Loki + Grafana</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Datadog Logs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-800/30 hover:bg-white/[0.02]">
                <td className="p-4 text-sm font-medium text-gray-200">{r.feature}</td>
                <td className={`p-4 text-sm font-semibold bg-blue-500/5 ${r.feature === "Cost (50 services)" || r.feature === "Setup time" || r.feature === "Data location" ? "text-green-400" : "text-gray-100"}`}>{r.cpi}</td>
                <td className="p-4 text-sm text-gray-400">{r.loki}</td>
                <td className={`p-4 text-sm text-gray-400 ${r.feature === "Cost (50 services)" ? "text-red-400/70" : ""}`}>{r.datadog}</td>
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
    <section className="py-36 px-6 text-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_60%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
          Logs from every pod.<br /><em className="text-blue-400 not-italic">Zero</em> infrastructure.
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Connect your clusters and start streaming logs immediately.
          No setup, no infrastructure, no monthly bills. Free for up to 50 services.
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

export default function LiveLogsFeaturePage() {
  return (
    <>
      <Nav />
      <Hero />
      <SternSection />
      <MultiServiceSection />
      <FloatingWindowSection />
      <ZeroOverheadSection />
      <ComparisonSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
