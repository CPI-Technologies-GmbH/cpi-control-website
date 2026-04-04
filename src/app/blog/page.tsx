import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, comparisons, and best practices for Kubernetes monitoring, deployment tracking, and infrastructure management with CPI-Control.",
};

const posts = [
  // Comparisons
  {
    slug: "cpi-control-vs-datadog",
    category: "Comparison",
    title: "CPI-Control vs. Datadog: The Honest Comparison for Small Teams",
    desc: "Cost breakdown, feature matrix, and data privacy — when Datadog makes sense and when CPI-Control is enough.",
    readingTime: "8 min",
  },
  {
    slug: "free-datadog-alternatives",
    category: "Comparison",
    title: "5 Free Datadog Alternatives Compared (2026)",
    desc: "CPI-Control, Grafana, Uptime Kuma, Checkly, and Netdata — which one fits your team?",
    readingTime: "10 min",
  },
  {
    slug: "cpi-control-vs-lens",
    category: "Comparison",
    title: "CPI-Control vs. Lens Pro: Kubernetes Management Compared",
    desc: "Both are desktop apps for K8s. One does monitoring too. Here's how they compare.",
    readingTime: "6 min",
  },
  {
    slug: "why-we-switched-from-better-stack",
    category: "Comparison",
    title: "Why We Switched from Better Stack to a Local Solution",
    desc: "Vendor lock-in, cloud costs, and data sovereignty — our migration story.",
    readingTime: "7 min",
  },
  // Tutorials
  {
    slug: "kubernetes-monitoring-5-minutes",
    category: "Tutorial",
    title: "Set Up Kubernetes Monitoring in 5 Minutes (No Cloud Account)",
    desc: "From download to full cluster visibility in one kubeconfig upload.",
    readingTime: "5 min",
  },
  {
    slug: "multi-cluster-kubernetes",
    category: "Tutorial",
    title: "Managing Multi-Cluster Kubernetes with One Tool",
    desc: "3 clusters, 1 dashboard — aggregate logs, deployments, and metrics across clusters.",
    readingTime: "7 min",
  },
  {
    slug: "self-hosted-status-page",
    category: "Tutorial",
    title: "Create a Self-Hosted Status Page in 10 Minutes",
    desc: "Custom domain, branding, automatic HTTPS — powered by your own monitoring agent.",
    readingTime: "6 min",
  },
  {
    slug: "unified-deployment-tracking",
    category: "Tutorial",
    title: "Vercel + GitHub Actions + Kubernetes: One Deployment Dashboard",
    desc: "Stop switching between 3 dashboards. Track every deploy in one timeline.",
    readingTime: "6 min",
  },
  {
    slug: "kubernetes-live-logs-without-loki",
    category: "Tutorial",
    title: "Aggregate Kubernetes Live Logs — Without Datadog or Loki",
    desc: "stern-based log collection, multi-service views, and zero infrastructure overhead.",
    readingTime: "8 min",
  },
  // Best Practices
  {
    slug: "health-monitoring-best-practices",
    category: "Best Practice",
    title: "Health Monitoring Done Right: HTTP Checks That Actually Tell You Something",
    desc: "Why /health returning 200 isn't enough, and how to build checks that catch real problems.",
    readingTime: "7 min",
  },
  {
    slug: "gdpr-compliant-monitoring",
    category: "Best Practice",
    title: "GDPR-Compliant Monitoring: Why Cloud Tools Are a Risk",
    desc: "Personal data in logs, US cloud providers, and the case for local monitoring.",
    readingTime: "6 min",
  },
  {
    slug: "push-notifications-without-alert-fatigue",
    category: "Best Practice",
    title: "Push Notifications for DevOps: Alerting Without Alert Fatigue",
    desc: "Muting, batching, and smart escalation — get notified for what matters.",
    readingTime: "5 min",
  },
  // Industry
  {
    slug: "monitoring-for-agencies",
    category: "Industry",
    title: "Monitoring for Agencies: 20 Client Projects, One Dashboard",
    desc: "Project-based organization, white-label status pages, and zero per-client costs.",
    readingTime: "6 min",
  },
  {
    slug: "saas-startup-monitoring",
    category: "Industry",
    title: "SaaS Startups: Monitoring from MVP to Series A",
    desc: "Start free, scale with your product — without switching tools.",
    readingTime: "7 min",
  },
  {
    slug: "freelancer-monitoring-guide",
    category: "Industry",
    title: "Freelancer Guide: Monitor Client Servers Without Monthly Costs",
    desc: "Professional monitoring and status pages on the free plan.",
    readingTime: "5 min",
  },
];

const categoryStyles: Record<string, string> = {
  Comparison: "bg-blue-500/20 text-blue-400",
  Tutorial: "bg-emerald-500/20 text-emerald-400",
  "Best Practice": "bg-amber-500/20 text-amber-400",
  Industry: "bg-purple-500/20 text-purple-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200"
        >
          <Image
            src="/app-icon.png"
            alt="CPI-Control"
            width={28}
            height={28}
            className="rounded-md"
          />
          CPI-Control
        </Link>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog</h1>
          <p className="text-gray-400 text-lg">
            Guides, comparisons, and best practices for infrastructure monitoring.
          </p>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-gray-800/60 bg-gray-900/40 p-6 transition-all hover:border-gray-700 hover:bg-gray-900/70"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${categoryStyles[post.category]}`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.desc}</p>
              <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            &larr; Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
