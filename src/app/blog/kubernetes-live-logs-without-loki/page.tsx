import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aggregate Kubernetes Live Logs — Without Datadog or Loki",
  description:
    "stern-based log collection, multi-service views, and zero infrastructure overhead. Real-time Kubernetes logs without the cost or complexity.",
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
          <h1 className="text-4xl font-bold mt-4 mb-3">Aggregate Kubernetes Live Logs &mdash; Without Datadog or Loki</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>8 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/live-logs-hero.png"
          alt="Aggregating Kubernetes live logs without Loki"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Kubernetes logging is a solved problem &mdash; if you&apos;re willing to deploy Loki with Promtail, or pay for Datadog Log Management, or run an Elasticsearch cluster. But for many teams, especially smaller ones, these solutions are wildly disproportionate to the actual need. You don&apos;t need petabytes of indexed log storage. You don&apos;t need a query language more complex than SQL. You need to see what your services are logging right now, across multiple pods and multiple services, in one place. CPI-Control gives you exactly that, with zero additional infrastructure.
          </p>

          <h2>The Problem with kubectl logs</h2>
          <p>
            The built-in <code>kubectl logs</code> command is the starting point for most Kubernetes log debugging, and its limitations are immediately apparent. It shows logs from one pod at a time. If your deployment has three replicas, you need three terminal windows. If you want to see logs from two different services simultaneously, that&apos;s six terminal windows. Add a third service and you&apos;re managing nine terminals, each running a separate <code>kubectl logs -f</code> command. The cognitive overhead is enormous. You&apos;re spending more time managing terminal windows than actually reading logs.
          </p>
          <p>
            There&apos;s also the context problem. <code>kubectl logs</code> requires you to know the exact pod name, which includes a random suffix that changes with every deployment. You end up running <code>kubectl get pods</code> first, copying the pod name, then running <code>kubectl logs</code>. For pods that restart frequently, the pod name changes and your log stream breaks. These are solvable problems, but they add friction to every debugging session.
          </p>

          <h2>How CPI-Control Solves It</h2>
          <p>
            CPI-Control&apos;s log system is built on three components: stern for collection, an in-memory ring buffer for storage, and Server-Sent Events (SSE) for streaming to the UI. When you connect a Kubernetes cluster, CPI-Control&apos;s LogCollector starts background stern processes for each namespace. Stern is a log tailing tool that follows all pods matching a deployment selector simultaneously, handling pod restarts, new replicas, and terminated pods automatically. CPI-Control runs stern as a managed subprocess, parsing its output and enriching each log line with service identification metadata.
          </p>
          <p>
            The parsed log lines flow into a ring buffer &mdash; a fixed-size, in-memory data structure that keeps the most recent logs and discards the oldest when capacity is reached. The default buffer size is configurable in CPI-Control&apos;s settings, typically set between 10,000 and 100,000 lines. Because the buffer is in-memory, there&apos;s no disk I/O, no log file rotation, and no storage management. When you close CPI-Control, the buffer is cleared. This is intentional: CPI-Control is for live debugging, not for log archival.
          </p>
          <p>
            When you open the log viewer in CPI-Control&apos;s UI, an SSE connection is established. New log lines are pushed to the viewer in real time with sub-second latency. The viewer also immediately loads the current buffer contents, so you see recent history without waiting for new logs to appear. This combination of buffered history and live streaming means you can open the log viewer minutes after an error occurred and still see the relevant log lines, as long as they&apos;re within the buffer window.
          </p>

          <h2>Multi-Service Log View</h2>
          <p>
            The most powerful feature of CPI-Control&apos;s log system is the multi-service view. In the log viewer, you can select any number of services &mdash; 2, 5, 10, or more &mdash; and see all their logs interleaved in a single, chronologically sorted stream. Each log line is color-coded by service, with the service name displayed as a prefix. This makes it possible to follow a request as it flows through multiple services, something that&apos;s nearly impossible with <code>kubectl logs</code> alone.
          </p>
          <p>
            Imagine debugging a checkout flow that involves an API gateway, a payment service, an inventory service, and a notification service. In CPI-Control, you select all four services, and you see the entire request lifecycle in one stream. The API gateway receives the request (blue), the payment service processes the charge (green), the inventory service decrements stock (yellow), and the notification service sends the confirmation email (purple). If the notification service logs an error, you can scroll up and see exactly what the upstream services did in the seconds before, without switching between terminal windows or cross-referencing timestamps manually.
          </p>

          <h2>Filtering: Find What Matters</h2>
          <p>
            When you&apos;re watching logs from 10 services simultaneously, the volume can be overwhelming. CPI-Control&apos;s log viewer provides multiple filtering mechanisms to cut through the noise. The most commonly used is log level filtering. Buttons at the top of the viewer let you toggle visibility for each level: DEBUG, INFO, WARN, and ERROR. During normal operation, you might hide DEBUG and INFO entirely and only show WARN and ERROR. During active debugging, you might enable everything to get the full picture.
          </p>
          <p>
            Beyond log level, you can filter by service (quickly hide a noisy service without removing it from the selection), by source (stdout vs stderr), and by free text search. The text search is applied in real time to incoming logs and to the buffer history. Type a request ID or a user ID into the search field and only matching lines are displayed. This is particularly useful when debugging a specific user&apos;s issue &mdash; filter by their user ID across all services and you see every log line related to their request, regardless of which service generated it.
          </p>

          <h2>The Floating Log Window</h2>
          <p>
            A unique feature in CPI-Control&apos;s log viewer is the floating window mode. Click the detach button and the log viewer pops out into a resizable, always-on-top window. You can then navigate the rest of the CPI-Control dashboard &mdash; checking service health, reviewing deployments, inspecting pod metrics &mdash; while keeping live logs visible in the corner of your screen. This is invaluable during incident response when you need to monitor logs while simultaneously investigating other aspects of the system.
          </p>
          <p>
            The floating window maintains its own scroll state and filter settings. You can have the main dashboard showing one set of services while the floating log window shows logs from a different set. You can minimize the floating window to a small bar that shows just the log count and expands on hover. It&apos;s a small UX detail that makes a big difference in daily workflow, especially on large monitors where you have the screen real estate to keep multiple views open.
          </p>

          <h2>Technical Details: ANSI Stripping and Deduplication</h2>
          <p>
            Kubernetes logs often contain ANSI escape codes for color formatting, especially from Node.js and Python applications that use colored logging libraries. These escape codes render as garbled text in most log viewers. CPI-Control strips ANSI codes during the parsing phase, before logs enter the ring buffer. The result is clean, readable text regardless of the originating application&apos;s logging configuration.
          </p>
          <p>
            Deduplication is another important detail. In certain scenarios &mdash; particularly during pod restarts or stern reconnections &mdash; the same log line can be emitted twice. CPI-Control maintains a short-window deduplication cache that compares incoming log lines against the last N entries for the same pod. Exact duplicates within the deduplication window are silently dropped. This prevents the annoying experience of seeing every log line doubled after a stern reconnection, which is a common issue with raw stern usage.
          </p>

          <h2>CPI-Control vs. Other Logging Solutions</h2>
          <p>
            How does CPI-Control&apos;s logging compare to other tools? Against raw <code>kubectl logs</code>, the advantages are clear: multi-pod, multi-service aggregation, filtering, color coding, and a persistent buffer. Against the stern CLI directly, CPI-Control adds a graphical interface, service-level enrichment (you select services by name, not by pod selectors), the ring buffer, and the floating window. Stern is an excellent tool, and CPI-Control uses it under the hood, but the CLI experience is still limited to a single terminal output stream.
          </p>
          <p>
            Against Loki with Grafana, CPI-Control trades long-term storage for zero-infrastructure simplicity. Loki requires deploying Loki itself (with object storage for chunks), Promtail or Grafana Agent on every node, and a Grafana instance for querying. That&apos;s a minimum of three components to maintain, with their own scaling considerations, storage costs, and configuration complexity. CPI-Control&apos;s logging has no server-side components at all &mdash; stern runs from your desktop, and the buffer lives in your application&apos;s memory.
          </p>
          <p>
            Against Datadog Log Management, the comparison is primarily about cost. Datadog charges per GB of ingested logs, with additional costs for indexing and retention. For a team generating 50 GB of logs per month, the cost can easily reach hundreds of dollars. CPI-Control&apos;s logging is free and unlimited in terms of throughput, though it only retains what fits in the ring buffer. For teams that need real-time log visibility for debugging but don&apos;t need weeks of searchable log history, this is an excellent tradeoff.
          </p>

          <h2>Performance: Ring Buffer and Resource Usage</h2>
          <p>
            The ring buffer is the key to CPI-Control&apos;s logging performance. Unlike file-based log collection that can fill disks and requires rotation policies, the ring buffer has a fixed memory footprint. A buffer configured for 50,000 lines typically uses around 50-80 MB of RAM, depending on average line length. When the buffer is full, the oldest lines are overwritten in constant time &mdash; there&apos;s no garbage collection pause, no compaction, no background cleanup process.
          </p>
          <p>
            The buffer size is configurable in <strong>Settings &rarr; Logs</strong>. For most teams, the default is sufficient for 15-30 minutes of log history at typical application log volumes. If you need deeper history &mdash; for example, if you&apos;re debugging an issue that occurred an hour ago &mdash; you can increase the buffer size at the cost of more memory usage. CPI-Control displays the current buffer utilization so you can tune the setting based on your actual log volume.
          </p>
          <p>
            Stern processes themselves are lightweight. Each stern process watches a single namespace and uses minimal CPU. For a cluster with 10 namespaces, CPI-Control runs 10 stern processes, collectively using under 100 MB of RAM and negligible CPU. Network usage depends on your log volume, but because stern uses the Kubernetes API&apos;s log streaming endpoint, there&apos;s no additional network overhead beyond what <code>kubectl logs -f</code> would use.
          </p>

          <h2>When Loki Is Still the Better Choice</h2>
          <p>
            CPI-Control&apos;s logging is not a replacement for a full log aggregation pipeline in every scenario. If you need long-term log retention for compliance or auditing purposes &mdash; keeping 90 days or a year of searchable logs &mdash; you need a solution like Loki that persists logs to durable storage. If your team has multiple people who need simultaneous access to the same log data, a centralized solution is better because CPI-Control&apos;s buffer is local to each user&apos;s machine.
          </p>
          <p>
            If you need complex log queries &mdash; aggregations, statistical analysis, joining log data with metrics &mdash; Loki&apos;s LogQL or Datadog&apos;s query language provides capabilities that CPI-Control&apos;s text search doesn&apos;t match. And if you&apos;re running a large-scale operation with hundreds of services generating terabytes of logs, a dedicated log pipeline is the right tool for the job.
          </p>
          <p>
            But for the vast majority of small to mid-size teams &mdash; those running 5 to 50 services who primarily need real-time log visibility for debugging &mdash; CPI-Control provides 90% of the value at 0% of the infrastructure cost. You can always add Loki later for long-term retention while keeping CPI-Control as your daily debugging tool. The two approaches are complementary, not competing.
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
