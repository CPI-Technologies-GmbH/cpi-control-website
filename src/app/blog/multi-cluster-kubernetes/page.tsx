import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Managing Multi-Cluster Kubernetes with One Tool",
  description:
    "3 clusters, 1 dashboard — aggregate logs, deployments, and metrics across production, staging, and development environments.",
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
          <h1 className="text-4xl font-bold mt-4 mb-3">Managing Multi-Cluster Kubernetes with One Tool</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>7 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            If you run more than one Kubernetes cluster, you know the pain. Production in one region, staging in another, maybe a dev cluster on a local machine. Each cluster has its own context, its own dashboard, its own set of bookmarked URLs. You spend half your debugging time running <code>kubectl config use-context</code> and the other half wondering if you&apos;re looking at the right cluster. CPI-Control eliminates this problem entirely by letting you upload multiple kubeconfigs and viewing all clusters in a single, unified dashboard.
          </p>

          <h2>The Problem: Context Switching Kills Productivity</h2>
          <p>
            Most teams running multiple Kubernetes clusters end up with a fragmented monitoring setup. Production might have Datadog or Grafana, staging might have a basic Prometheus installation, and the dev cluster often has nothing at all. When an issue spans environments &mdash; a bug that appears in staging but not in dev, a config difference between staging and production &mdash; you&apos;re jumping between tools, tabs, and terminal windows to piece together what&apos;s happening.
          </p>
          <p>
            Even if you use the same monitoring stack everywhere, you still need separate dashboards per cluster. You can&apos;t see staging and production pods side by side. You can&apos;t compare resource usage across environments. You can&apos;t tail logs from a staging service and a production service simultaneously. This fragmentation slows down incident response and makes routine operations more error-prone than they need to be.
          </p>

          <h2>The Solution: Multiple Kubeconfigs, One Dashboard</h2>
          <p>
            In CPI-Control, navigate to <strong>Settings &rarr; Integrations &rarr; Kubernetes</strong> and click <strong>Add Cluster</strong> for each of your clusters. Upload the kubeconfig for your production cluster and name it something descriptive like &quot;production-eu-west&quot;. Then do the same for staging and dev. Each kubeconfig gets its own Kubernetes adapter internally, with its own connection, its own sync schedule, and its own set of discovered services.
          </p>
          <p>
            The key insight is that all services from all clusters appear in the same service list on your dashboard. A service running in your production cluster shows up right next to the same service running in staging. CPI-Control uses the cluster name you provided as a prefix, so you can immediately tell which environment you&apos;re looking at. The service list is filterable by cluster, so you can either see everything at once or focus on a specific environment.
          </p>

          <h2>How It Works Under the Hood</h2>
          <p>
            When you add a kubeconfig, CPI-Control creates a dedicated adapter instance for that cluster. Each adapter runs its own SyncScheduler, which independently scans the cluster&apos;s namespaces for Deployments, Services, and Ingresses. The discovery results are merged into a single service database, with each service tagged with its cluster origin. Infrastructure bindings use the format <code>cluster-name/namespace/deployment-name</code> to ensure uniqueness across clusters.
          </p>
          <p>
            Health checks, pod metrics, and event collection run independently per cluster. This means a network issue with your staging cluster won&apos;t affect monitoring of production. Each adapter maintains its own connection pool and retry logic. If a cluster becomes unreachable, its services are marked as &quot;unknown&quot; status rather than &quot;down&quot; &mdash; CPI-Control distinguishes between a service that&apos;s actually failing and a monitoring connection that&apos;s interrupted.
          </p>

          <h2>Live Logs Across Clusters</h2>
          <p>
            One of the most powerful features in a multi-cluster setup is aggregated log viewing. CPI-Control runs stern processes for each cluster independently, collecting logs into separate ring buffers. But when you open the log viewer, you can select services from any cluster and see their logs interleaved in a single, chronologically sorted view.
          </p>
          <p>
            Imagine debugging a request that flows from a frontend deployed on your production cluster to an API on the same cluster to a background worker on a separate processing cluster. Instead of opening three terminal windows with three different kubectl contexts, you select all three services in CPI-Control&apos;s log viewer and see the entire request flow in one stream. Each log line is color-coded by service and labeled with the cluster name, so you always know where each line originated.
          </p>
          <p>
            The multi-service log viewer supports filtering by log level across all selected services simultaneously. Filter for ERROR level and you&apos;ll see errors from production and staging side by side &mdash; useful for confirming whether a fix deployed to staging actually resolved the error you&apos;re seeing in production.
          </p>

          <h2>Deployments from All Clusters in One Timeline</h2>
          <p>
            The deployment timeline aggregates rollout events from every connected cluster. When a new image is deployed to your staging cluster, it shows up in the timeline. When the same image is promoted to production an hour later, that deployment appears right below it. You can filter the timeline by cluster to see only production deployments, or view everything chronologically to understand the full promotion path of a change.
          </p>
          <p>
            If you&apos;ve also connected GitHub as a provider, CPI-Control correlates deployments with commits and pull requests. You can trace a production deployment back to the PR that introduced the change, see the CI status on that PR, and check whether the same commit was deployed to staging first. This deployment lineage is built automatically from the metadata available in your Kubernetes annotations and GitHub webhook data.
          </p>

          <h2>Practical Tips: Naming Conventions and Organization</h2>
          <p>
            To get the most out of multi-cluster management, establish a consistent naming convention for your clusters. We recommend the format <code>environment-region</code> &mdash; for example, &quot;production-eu-west&quot;, &quot;staging-us-east&quot;, &quot;dev-local&quot;. This makes it immediately clear what you&apos;re looking at in the service list and in log output. Avoid generic names like &quot;cluster-1&quot; or &quot;main&quot; that don&apos;t convey the environment or purpose.
          </p>
          <p>
            Namespace organization matters too. If your clusters use consistent namespace naming &mdash; the same service deployed to the &quot;backend&quot; namespace in both production and staging &mdash; CPI-Control can better correlate services across environments. This isn&apos;t required, but it makes the dashboard more intuitive. Services with matching names in matching namespaces across different clusters are visually grouped, making it easy to compare their health and resource usage.
          </p>
          <p>
            For teams that use namespace-per-feature-branch patterns, CPI-Control&apos;s auto-discovery will pick up new namespaces as they&apos;re created and remove services when namespaces are deleted. The SyncScheduler includes ghost service detection that checks whether a Kubernetes resource still exists before marking it as down, preventing false alerts when ephemeral environments are torn down.
          </p>

          <h2>Managing CronJobs and Deployments Across Clusters</h2>
          <p>
            CronJobs are often the forgotten workloads in multi-cluster setups. They run in the background, and when they fail, nobody notices until a customer reports missing data. CPI-Control discovers CronJobs alongside Deployments and tracks their execution history. You can see the last run time, whether it succeeded, and how long it took &mdash; across all clusters.
          </p>
          <p>
            For Deployments specifically, CPI-Control tracks rollout status in real time. If a deployment in your production cluster is stuck in a rolling update &mdash; maybe the new pods are crash-looping &mdash; you&apos;ll see the rollout status directly on the service card. Combined with live logs from the failing pods, you can diagnose the issue without leaving the dashboard. And because you can see the same service&apos;s status in staging simultaneously, you can quickly verify whether the same image works there, narrowing down the issue to environment-specific configuration.
          </p>
          <p>
            The multi-cluster setup in CPI-Control requires no additional infrastructure, no cross-cluster networking, and no shared monitoring backend. Each cluster is accessed independently through its kubeconfig, and all aggregation happens locally on your machine. This means there&apos;s zero operational overhead &mdash; no monitoring cluster to maintain, no central Prometheus to scale, no Thanos or Cortex to configure. Just upload your kubeconfigs and start seeing everything in one place.
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
