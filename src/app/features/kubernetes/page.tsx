import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kubernetes Management Desktop App",
  description:
    "Multi-cluster Kubernetes management with pod metrics, terminal access, live logs, and deployment tracking. Free desktop app for macOS and Windows.",
  keywords: [
    "kubernetes management",
    "kubernetes desktop app",
    "multi-cluster kubernetes",
    "kubernetes dashboard",
    "kubectl gui",
    "kubernetes pod metrics",
    "kubernetes terminal",
    "kubernetes live logs",
    "lens alternative",
    "k9s alternative",
  ],
  alternates: {
    canonical: "https://cpi-control.com/features/kubernetes",
  },
  openGraph: {
    title: "Kubernetes Management Desktop App | CPI-Control",
    description:
      "Multi-cluster Kubernetes management with pod metrics, terminal access, live logs, and deployment tracking. Free desktop app for macOS and Windows.",
    url: "https://cpi-control.com/features/kubernetes",
    images: [
      {
        url: "/screenshots/02-services.png",
        width: 1920,
        height: 1080,
        alt: "CPI-Control Kubernetes service management with pod metrics and health status",
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
          Kubernetes Management
          <span className="w-6 h-px bg-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6 text-gray-100">
          Multi-Cluster<br />Kubernetes Management
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-10">
          Manage pods, view metrics, access terminals, and stream live logs
          across all your clusters — from one desktop app.
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
            src="/screenshots/02-services.png"
            alt="CPI-Control service list showing Kubernetes pods with health status, CPU and memory metrics, and provider indicators"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <Image src="/blog/kubernetes-hero.png" alt="Kubernetes multi-cluster management with pod metrics, live logs, and deployment tracking" width={1200} height={675} className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mt-12" />
    </section>
  );
}

function FeatureSection({
  tag,
  title,
  description,
  details,
  reverse,
}: {
  tag: string;
  title: string;
  description: string;
  details: string[];
  reverse?: boolean;
}) {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? "direction-rtl" : ""}`}>
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">{tag}</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">{title}</h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">{description}</p>
          <ul className="space-y-4 text-sm text-gray-300">
            {details.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
            <div className="space-y-3">
              {details.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30">
                  <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-sm text-gray-300 font-mono">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiClusterSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Multi-Cluster</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Multi-Cluster Support
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Upload multiple kubeconfig files and manage all your clusters from a single interface. Each cluster
            gets its own adapter with independent connection management, and all services appear in one unified list.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Upload multiple kubeconfig files — EKS, GKE, AKS, k3s, self-hosted
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Each cluster gets its own adapter with independent health checking
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Unified service list across all clusters with provider badges
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Cluster connection status always visible — know instantly if a context is unreachable
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Connected Clusters</div>
            {["production-eu", "staging-us", "dev-local"].map((cluster, i) => (
              <div key={cluster} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-3 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${i < 2 ? "bg-green-400" : "bg-amber-400"}`} />
                  <span className="text-sm font-mono text-gray-200">{cluster}</span>
                </div>
                <span className="text-xs font-mono text-gray-500">{i < 2 ? "connected" : "reconnecting"}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-700/30 flex justify-between text-xs text-gray-500 font-mono">
              <span>3 clusters</span>
              <span>47 services discovered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PodMetricsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Telemetry</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Pod Metrics & Management
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            See CPU usage, memory consumption, restart counts, and pod age at a glance. Restart deployments,
            manage CronJobs, and open a terminal to any pod with a single click — no kubectl required.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Real-time CPU and memory metrics per pod
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Restart counts, pod age, and container status
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              One-click deployment restarts and CronJob triggers
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Built-in terminal — exec into any pod, any container
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Pod Metrics</div>
            {[
              { name: "api-server-7f8d4", cpu: "120m", mem: "256Mi", restarts: 0, status: "Running" },
              { name: "worker-batch-3a1b", cpu: "340m", mem: "512Mi", restarts: 2, status: "Running" },
              { name: "redis-cache-0", cpu: "45m", mem: "128Mi", restarts: 0, status: "Running" },
            ].map((pod) => (
              <div key={pod.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-2 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${pod.restarts > 0 ? "bg-amber-400" : "bg-green-400"}`} />
                  <span className="text-xs font-mono text-gray-200">{pod.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                  <span>CPU {pod.cpu}</span>
                  <span>MEM {pod.mem}</span>
                  <span className={pod.restarts > 0 ? "text-amber-400" : ""}>{pod.restarts} restarts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveLogsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Logs</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Live Log Aggregation
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            CPI-Control uses stern under the hood to collect logs from every pod across every namespace. Logs are kept
            in an in-memory ring buffer and streamed live to your UI via Server-Sent Events — no Loki, no Elasticsearch,
            no cloud log ingestion fees.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              stern-based background collection across namespaces
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Multi-service view with color-coded service badges
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Filter by log level — info, warn, error, debug
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Detachable floating log window for side-by-side monitoring
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-[#0d1117] p-4 font-mono text-xs">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-gray-500">Live Logs — production-eu</span>
            </div>
            {[
              { time: "14:32:01", svc: "api", level: "INF", msg: "GET /health 200 12ms", color: "text-blue-400" },
              { time: "14:32:01", svc: "worker", level: "INF", msg: "Job batch-export completed", color: "text-purple-400" },
              { time: "14:32:02", svc: "api", level: "WRN", msg: "Rate limit threshold 80%", color: "text-blue-400" },
              { time: "14:32:03", svc: "redis", level: "INF", msg: "Memory usage: 45.2MB/128MB", color: "text-green-400" },
              { time: "14:32:03", svc: "api", level: "ERR", msg: "Connection timeout to payments-svc", color: "text-blue-400" },
              { time: "14:32:04", svc: "worker", level: "INF", msg: "Processing queue: 12 pending", color: "text-purple-400" },
            ].map((log, i) => (
              <div key={i} className="flex gap-2 py-0.5 hover:bg-white/[0.02]">
                <span className="text-gray-600 shrink-0">{log.time}</span>
                <span className={`${log.color} shrink-0 w-14`}>{log.svc}</span>
                <span className={`shrink-0 w-8 ${log.level === "ERR" ? "text-red-400" : log.level === "WRN" ? "text-amber-400" : "text-gray-500"}`}>{log.level}</span>
                <span className="text-gray-300">{log.msg}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-500">Streaming from 3 namespaces</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AutoDiscoverySection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Discovery</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Auto-Discovery
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Point CPI-Control at your cluster and it does the rest. Every namespace is scanned for Deployments,
            Services, and Ingresses. Public-facing services are identified automatically by checking for matching
            Ingress rules. No YAML, no annotations, no manual setup.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Scans namespaces for Deployments, Services, and Ingresses
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Determines public vs. private services automatically
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Ghost service detection — removes services that no longer exist
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Periodic re-sync to keep your service list always up to date
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Auto-Discovered Services</div>
            {[
              { name: "api-gateway", ns: "production", type: "Public", icon: "&#127760;" },
              { name: "user-service", ns: "production", type: "Private", icon: "&#128274;" },
              { name: "payment-processor", ns: "production", type: "Public", icon: "&#127760;" },
              { name: "redis-cache", ns: "production", type: "Private", icon: "&#128274;" },
              { name: "background-worker", ns: "production", type: "Private", icon: "&#128274;" },
            ].map((svc) => (
              <div key={svc.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 mb-2 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm font-mono text-gray-200">{svc.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-gray-500">{svc.ns}</span>
                  <span className={`px-2 py-0.5 rounded ${svc.type === "Public" ? "bg-blue-500/10 text-blue-400" : "bg-gray-700/50 text-gray-400"}`}>{svc.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: "Multi-cluster support", cpi: "Unlimited", lens: "1 per window", k9s: "1 per session" },
    { feature: "Pod metrics", cpi: "Built-in", lens: "Built-in", k9s: "Built-in" },
    { feature: "Terminal access", cpi: "One-click", lens: "Built-in", k9s: "Built-in" },
    { feature: "Live log aggregation", cpi: "Multi-service, stern", lens: "Per-pod", k9s: "Per-pod" },
    { feature: "Health monitoring", cpi: "Built-in HTTP checks", lens: "---", k9s: "---" },
    { feature: "Deployment tracking", cpi: "Multi-provider", lens: "---", k9s: "---" },
    { feature: "Status pages", cpi: "Built-in", lens: "---", k9s: "---" },
    { feature: "Price", cpi: "Free", lens: "$299/yr", k9s: "Free" },
    { feature: "Non-K8s services", cpi: "Vercel, GitHub, DO", lens: "---", k9s: "---" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Comparison</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          How CPI-Control compares
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          CPI-Control combines Kubernetes management with monitoring, deployments, and logs.
          Other tools only do one piece.
        </p>
      </div>
      <div className="border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[540px]">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide" />
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-blue-400 uppercase tracking-wide">CPI-Control</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Lens Pro</th>
              <th className="p-4 text-left font-mono text-[11px] font-semibold text-gray-500 uppercase tracking-wide">k9s</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-800/30 hover:bg-white/[0.02]">
                <td className="p-4 text-sm font-medium text-gray-200">{r.feature}</td>
                <td className={`p-4 text-sm font-semibold bg-blue-500/5 ${r.feature === "Price" ? "text-green-400" : "text-gray-100"}`}>{r.cpi}</td>
                <td className={`p-4 text-sm text-gray-400 ${r.feature === "Price" ? "text-red-400/70" : ""}`}>{r.lens}</td>
                <td className="p-4 text-sm text-gray-400">{r.k9s}</td>
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
          Manage all your clusters<br />from <em className="text-blue-400 not-italic">one app.</em>
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Download CPI-Control and connect your first cluster in under two minutes.
          Free for up to 50 services — no account required.
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

export default function KubernetesFeaturePage() {
  return (
    <>
      <Nav />
      <Hero />
      <MultiClusterSection />
      <PodMetricsSection />
      <LiveLogsSection />
      <AutoDiscoverySection />
      <ComparisonSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
