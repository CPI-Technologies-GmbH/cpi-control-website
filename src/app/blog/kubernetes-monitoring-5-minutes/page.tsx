import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Set Up Kubernetes Monitoring in 5 Minutes (No Cloud Account)",
  description:
    "From download to full cluster visibility in one kubeconfig upload. No sign-ups, no cloud dependencies, no credit card.",
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
          <h1 className="text-4xl font-bold mt-4 mb-3">Set Up Kubernetes Monitoring in 5 Minutes (No Cloud Account)</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>5 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Most Kubernetes monitoring solutions require you to create a cloud account, install agents into your cluster, configure exporters, and wait for data to start flowing through someone else&apos;s infrastructure. That&apos;s a lot of setup for something that should be simple: seeing what&apos;s happening in your cluster right now. CPI-Control takes a different approach. It runs entirely on your machine, connects directly to your cluster via your existing kubeconfig, and gives you full visibility in about five minutes. No sign-ups, no cloud dependencies, no credit card.
          </p>

          <h2>Prerequisites</h2>
          <p>
            Before you start, make sure you have three things ready. First, a running Kubernetes cluster &mdash; this can be a production cluster on any cloud provider, a managed service like EKS, GKE, or AKS, or even a local cluster running via minikube, k3s, or Docker Desktop. Second, a kubeconfig file that grants access to that cluster. If you can run <code>kubectl get pods</code> successfully, your kubeconfig is working. Third, a Mac or Windows machine to run CPI-Control on. The app is a native desktop application built with Tauri, so it runs as a lightweight binary with minimal resource usage.
          </p>

          <h2>Step 1: Download CPI-Control (30 Seconds)</h2>
          <p>
            Head to the <Link href="/" className="text-blue-400 hover:text-blue-300">CPI-Control homepage</Link> and download the installer for your operating system. On macOS, you&apos;ll get a standard <code>.dmg</code> file &mdash; drag it to your Applications folder and open it. On Windows, run the <code>.msi</code> installer. The entire application is under 30 MB because it doesn&apos;t bundle a browser engine or a JVM. Once installed, launch CPI-Control. You&apos;ll see an empty dashboard with a prompt to connect your first integration.
          </p>

          <h2>Step 2: Upload Your Kubeconfig (30 Seconds)</h2>
          <p>
            Navigate to <strong>Settings &rarr; Integrations &rarr; Kubernetes</strong> and click <strong>Add Cluster</strong>. You can either browse for your kubeconfig file (typically located at <code>~/.kube/config</code>) or drag and drop it directly into the upload area. Give your cluster a descriptive name &mdash; something like &quot;production-eu&quot; or &quot;staging-us-east&quot; &mdash; so you can identify it later if you add more clusters.
          </p>
          <p>
            CPI-Control reads the kubeconfig locally and never sends it to any external server. The file stays on your machine, and all API calls go directly from your desktop to the Kubernetes API server. This is a fundamental architectural decision: your credentials never leave your device.
          </p>

          <h2>Step 3: Auto-Discovery (2 Minutes)</h2>
          <p>
            After uploading your kubeconfig, CPI-Control immediately starts scanning your cluster. The SyncScheduler iterates through all namespaces, discovers Deployments and Services, and cross-references Ingress resources to determine which services are publicly accessible and which are internal. Each discovered workload is automatically registered as a service in CPI-Control with the correct type: &quot;Public&quot; for services with an Ingress, &quot;Private&quot; for everything else.
          </p>
          <p>
            The discovery process also resolves infrastructure bindings using the <code>namespace/deployment-name</code> format as external identifiers. This means CPI-Control knows exactly which Kubernetes resources belong to which logical service, even when deployment names differ from service names. The entire scan typically takes under two minutes, even for clusters with hundreds of workloads. You&apos;ll see services appearing on your dashboard in real time as they&apos;re discovered.
          </p>

          <h2>Step 4: See Everything (1 Minute)</h2>
          <p>
            Once discovery completes, your dashboard transforms into a complete overview of your cluster. Every service shows its current health status &mdash; healthy, degraded, or down &mdash; based on pod readiness. Click on any service to see detailed information: the number of running pods, their individual statuses, recent Kubernetes events (like OOMKilled restarts or failed scheduling), and current resource usage for CPU and memory.
          </p>
          <p>
            The service list is sortable and filterable. You can group services by namespace, filter by health status to quickly find problematic workloads, or search by name. Each service card shows the provider logo (in this case, the Kubernetes icon) so you can instantly distinguish K8s services from those managed by other providers like Vercel or GitHub.
          </p>

          <h2>Step 5: Enable Health Monitoring</h2>
          <p>
            For services that expose HTTP endpoints, you can add URL-based health checks for more granular monitoring. Open any service, go to the <strong>Monitoring</strong> tab, and add the URL you want to check. CPI-Control will periodically send HTTP requests to that endpoint and track response codes and latency. A 200 response marks the service as healthy. A 404 is also treated as healthy &mdash; it means the server is responding, just not at that specific path. Only connection failures and 5xx errors trigger a degraded or down status.
          </p>
          <p>
            You can configure check intervals and set thresholds for response time. If a service consistently responds in over 2 seconds, for example, you might want to flag it as degraded even though it&apos;s technically up. These thresholds are fully customizable per service, because a 500ms response time means very different things for a user-facing API versus an internal batch processor.
          </p>

          <h2>What You Get Immediately</h2>
          <p>
            Without any additional configuration beyond the kubeconfig upload, CPI-Control gives you several capabilities that typically require separate tools or paid services. Pod metrics including CPU and memory usage are pulled directly from the Kubernetes metrics API &mdash; no Prometheus installation required. Kubernetes events are collected and displayed per service, so you can see OOMKills, failed probes, image pull errors, and scheduling failures without running <code>kubectl describe</code> in a terminal.
          </p>
          <p>
            Live logs are collected using stern under the hood, which means you get aggregated logs from all pods in a deployment, with color coding per pod. The logs are streamed in real time via SSE (Server-Sent Events) and stored in an in-memory ring buffer, so there&apos;s no disk usage and no external log storage needed. You can open a floating log window that stays visible while you navigate the rest of the dashboard &mdash; perfect for tailing logs while investigating an issue.
          </p>
          <p>
            Terminal access lets you exec into any running pod directly from the dashboard, without switching to a terminal and remembering the exact pod name and namespace. This is especially useful during incident response when you need to quickly inspect a container&apos;s filesystem or run diagnostic commands.
          </p>

          <h2>Next Steps</h2>
          <p>
            Once your Kubernetes monitoring is running, consider connecting additional providers to build a more complete picture of your infrastructure. Add a GitHub token to track deployments from GitHub Actions &mdash; every push, every CI run, every release will appear alongside your Kubernetes data. Add a Vercel API token to monitor your frontend deployments. CPI-Control correlates deployments across providers, so you can see which commit triggered which deployment and trace issues back to specific changes.
          </p>
          <p>
            You can also enable push notifications to get alerted when services go down or deployments fail. Notifications are delivered via the operating system&apos;s native notification system and in-app toasts, so you don&apos;t need to configure a separate alerting tool or set up email integrations. Everything stays local, everything stays fast, and you maintain full control over your monitoring data.
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
