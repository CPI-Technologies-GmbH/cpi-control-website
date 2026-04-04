import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CPI-Control vs. Lens Pro: Kubernetes Management Compared",
  description:
    "A side-by-side comparison of CPI-Control and Lens Pro for Kubernetes management. Both are desktop apps, but they solve different problems. Features, pricing, and use cases explained.",
};

export default function CpiControlVsLens() {
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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-4">
            CPI-Control vs. Lens Pro: Kubernetes Management Compared
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>6 min read</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>April 2026</span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 text-[16px] leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Two Desktop Apps, Two Different Problems</h2>
          <p>
            At first glance, CPI-Control and Lens Pro look like direct competitors. Both are desktop applications for working with Kubernetes clusters. Both offer multi-cluster support, pod management, and terminal access. But once you look past the surface, they solve fundamentally different problems, and understanding that distinction will save you time picking the right tool.
          </p>
          <p>
            Lens Pro is a Kubernetes IDE. It gives you deep, granular access to every Kubernetes resource type, lets you edit manifests in place, manage Helm charts, and extend its functionality through a plugin system. It is designed for platform engineers and DevOps specialists who spend hours per day directly interacting with Kubernetes.
          </p>
          <p>
            CPI-Control is an operational monitoring dashboard. It connects not just to Kubernetes but to Vercel, GitHub, DigitalOcean, and other providers to give you a unified view of your entire infrastructure. Its focus is on health monitoring, deployment tracking, live logs, and status pages rather than on directly manipulating Kubernetes resources.
          </p>
          <p>
            The question is not which is "better." It is which problem you are trying to solve.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">What They Share</h2>
          <p>
            Both tools share a desktop-native approach, which is unusual in the monitoring and Kubernetes management space where cloud-hosted solutions dominate. This means both tools work directly with your kubeconfig, both keep data local, and both offer the snappy performance that comes from native applications rather than browser tabs.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong className="text-gray-200">Multi-cluster support:</strong> Both tools let you connect multiple Kubernetes clusters and switch between them.</li>
            <li><strong className="text-gray-200">Pod management:</strong> Both let you view pod status, restart pods, and access pod details.</li>
            <li><strong className="text-gray-200">Terminal access:</strong> Both provide built-in terminal access to pods without needing to run kubectl exec in a separate window.</li>
            <li><strong className="text-gray-200">Local data:</strong> Neither tool sends your cluster data to a cloud service. Your kubeconfig credentials and cluster information stay on your machine.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Where Lens Excels</h2>
          <p>
            Lens was designed as a full Kubernetes IDE, and in that role, it is hard to beat. If your daily work involves editing Kubernetes manifests, managing Helm releases, or debugging complex resource configurations, Lens provides tools that CPI-Control does not attempt to offer.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Full resource editing:</strong> Lens lets you view and edit any Kubernetes resource type directly. You can modify deployments, services, configmaps, secrets, CRDs, and more through its YAML editor with syntax highlighting and validation.
            </li>
            <li>
              <strong className="text-gray-200">Helm chart management:</strong> Lens includes a Helm chart browser and manager. You can install, upgrade, and rollback Helm releases directly from the UI without touching the command line.
            </li>
            <li>
              <strong className="text-gray-200">Extension ecosystem:</strong> Lens has a plugin architecture that lets the community add features. There are extensions for Flux CD, ArgoCD, network policies visualization, and many other Kubernetes-adjacent tools.
            </li>
            <li>
              <strong className="text-gray-200">Resource topology:</strong> Lens visualizes relationships between Kubernetes resources, showing you how deployments relate to replica sets, pods, services, and ingresses. This is invaluable for debugging connectivity issues.
            </li>
            <li>
              <strong className="text-gray-200">RBAC and security views:</strong> Lens provides visibility into role bindings, service accounts, and network policies, which is important for teams managing multi-tenant clusters.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Where CPI-Control Excels</h2>
          <p>
            CPI-Control's strength lies in operational monitoring and multi-provider awareness. It is built for the question "is everything working and what just happened" rather than "let me edit this deployment manifest."
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-gray-200">Health monitoring:</strong> CPI-Control continuously monitors the health of all your services across all connected providers. You see at a glance which services are healthy, degraded, or down, with automatic incident detection and push notifications when status changes.
            </li>
            <li>
              <strong className="text-gray-200">Cross-provider deployment tracking:</strong> CPI-Control tracks deployments not just in Kubernetes but across Vercel, GitHub Actions, and Semaphore. You can see a unified deployment timeline that shows what was deployed, where, and when, regardless of the platform.
            </li>
            <li>
              <strong className="text-gray-200">Status pages:</strong> CPI-Control includes a monitoring agent that you can deploy on a server to host branded status pages for your services. Lens has no equivalent feature.
            </li>
            <li>
              <strong className="text-gray-200">Live log aggregation:</strong> CPI-Control provides a professional log viewer that can stream logs from multiple services simultaneously, with volume charts, saved configurations, and column selection. While Lens can show pod logs, it does not offer the same level of log analysis tooling.
            </li>
            <li>
              <strong className="text-gray-200">Multi-provider awareness:</strong> CPI-Control is not just a Kubernetes tool. It integrates with Vercel, GitHub, DigitalOcean, and AWS to give you a unified view of all your infrastructure. If your stack is not 100% Kubernetes, this matters.
            </li>
            <li>
              <strong className="text-gray-200">AI diagnostics:</strong> CPI-Control includes AI-powered diagnostics that can analyze pod failures, resource constraints, and service health issues to suggest root causes and remediation steps.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Pricing</h2>
          <p>
            This is straightforward. Lens Pro, since Mirantis acquired the project and moved to a commercial model, costs approximately 299 euros per user per year for the Pro tier that includes the features most teams need. There is a free tier (Lens Personal), but it is restricted to a limited number of clusters and lacks several features like team management and priority support.
          </p>
          <p>
            CPI-Control is free for up to 50 services. There is no per-user fee. If your team has ten engineers who all need operational visibility into your infrastructure, that is zero euros per year versus 2,990 euros per year for Lens Pro.
          </p>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">Comparison Table</h2>

          <div className="overflow-x-auto my-8 rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/60 text-gray-300 text-left">
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 font-semibold">Lens Pro</th>
                  <th className="px-5 py-3 font-semibold">CPI-Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Primary Purpose</td>
                  <td className="px-5 py-3">Kubernetes IDE</td>
                  <td className="px-5 py-3">Operational monitoring dashboard</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Resource Editing</td>
                  <td className="px-5 py-3 text-green-400">Full YAML editor</td>
                  <td className="px-5 py-3 text-red-400">Read-only</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Helm Management</td>
                  <td className="px-5 py-3 text-green-400">Built-in</td>
                  <td className="px-5 py-3 text-red-400">No</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Health Monitoring</td>
                  <td className="px-5 py-3 text-yellow-400">Pod status only</td>
                  <td className="px-5 py-3 text-green-400">Full health checks + notifications</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Deploy Tracking</td>
                  <td className="px-5 py-3 text-red-400">No</td>
                  <td className="px-5 py-3 text-green-400">Cross-provider</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Status Pages</td>
                  <td className="px-5 py-3 text-red-400">No</td>
                  <td className="px-5 py-3 text-green-400">Built-in</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Multi-Provider</td>
                  <td className="px-5 py-3 text-red-400">K8s only</td>
                  <td className="px-5 py-3 text-green-400">K8s, Vercel, GitHub, DO, AWS</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Extensions</td>
                  <td className="px-5 py-3 text-green-400">Plugin system</td>
                  <td className="px-5 py-3 text-red-400">No</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="px-5 py-3 text-gray-200 font-medium">Price</td>
                  <td className="px-5 py-3">~299/user/year</td>
                  <td className="px-5 py-3">Free (&le;50 services)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-100 mt-12 mb-4">The Verdict: Not Either/Or</h2>
          <p>
            Here is the nuanced answer that most comparison articles avoid: some teams should use both. Lens and CPI-Control complement each other because they address different workflows. Lens is where you go to debug a failing deployment by inspecting the replica set, checking the pod events, editing the resource limits, and rolling back a Helm release. CPI-Control is where you go to see the big picture: which services are healthy, what just got deployed, why the health check is failing, and what the logs say across your entire infrastructure.
          </p>
          <p>
            If you are a platform engineer who spends most of your day directly managing Kubernetes resources, Lens is probably your primary tool and CPI-Control is a complement for operational awareness. If you are an engineering lead or a full-stack developer who needs to know "is production working" without diving into kubectl, CPI-Control is likely all you need.
          </p>
          <p>
            If you can only choose one, ask yourself this: do you spend more time editing Kubernetes resources or checking whether your services are healthy? If the former, choose Lens. If the latter, choose CPI-Control. And if your infrastructure extends beyond Kubernetes to Vercel, GitHub Actions, or DigitalOcean, CPI-Control's multi-provider support gives it a significant edge for operational monitoring that Lens simply does not address.
          </p>
          <p>
            Both tools are desktop-native, both keep your data local, and both are well-built. The right choice depends entirely on what you need to do with your clusters on a daily basis.
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
