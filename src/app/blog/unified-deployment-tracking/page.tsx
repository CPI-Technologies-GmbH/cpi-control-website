import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vercel + GitHub Actions + Kubernetes: One Deployment Dashboard",
  description:
    "Stop switching between 3 dashboards. Track every deploy from every provider in one sortable, filterable timeline.",
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
          <h1 className="text-4xl font-bold mt-4 mb-3">Vercel + GitHub Actions + Kubernetes: One Deployment Dashboard</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>6 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/deployment-tracking.png"
          alt="Unified deployment tracking across multiple providers"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Modern applications rarely deploy from a single place. Your marketing site ships through Vercel. Your backend deploys to Kubernetes via GitHub Actions. Your mobile API might go through Semaphore CI. Each provider has its own deployment dashboard, its own notification system, and its own way of presenting deployment history. The result is that nobody on your team has a clear answer to the simplest question in infrastructure: &quot;What deployed where, and when?&quot; CPI-Control answers this question by aggregating deployments from every provider into a single, unified timeline.
          </p>

          <h2>The Problem: Deployment Blindness</h2>
          <p>
            When a production issue appears, the first question is almost always &quot;Did something deploy recently?&quot; If your team deploys through three different platforms, answering this question means checking three different dashboards. You open Vercel to see if a frontend deploy went out. You check GitHub Actions to see if a backend workflow ran. You run <code>kubectl rollout history</code> to see if a Kubernetes deployment was updated. By the time you&apos;ve checked everything, five minutes have passed, and you still might have missed a deploy from a service you forgot to check.
          </p>
          <p>
            This fragmentation also makes it impossible to correlate deployments across services. If the frontend and backend deployed within minutes of each other, and the issue started between those two deploys, that&apos;s critical debugging information. But if you&apos;re looking at each provider in isolation, you won&apos;t notice the timing correlation.
          </p>

          <h2>Setup: Connect Your Providers</h2>
          <p>
            Setting up unified deployment tracking in CPI-Control takes about five minutes. Navigate to <strong>Settings &rarr; Integrations</strong> and add each provider. For Vercel, create a personal access token in your Vercel account settings (Account &rarr; Tokens) and paste it into CPI-Control. For GitHub, generate a fine-grained personal access token with read access to your repositories and actions. For Kubernetes, upload your kubeconfig as described in our Kubernetes setup guide. For Semaphore, add your API token and organization name.
          </p>
          <p>
            Each provider connection is verified immediately after you add it. CPI-Control will show a green checkmark if the token is valid and has the required permissions, or a clear error message if something is wrong. Once connected, CPI-Control starts syncing deployment data automatically. Initial sync pulls recent deployment history, so you&apos;ll see past deployments immediately, not just new ones going forward.
          </p>

          <h2>Auto-Discovery: Services from Every Provider</h2>
          <p>
            After connecting your providers, CPI-Control auto-discovers your services. Vercel projects become services. GitHub repositories with workflow files become services. Kubernetes Deployments become services. Semaphore projects become services. Each service is tagged with its provider, so you can see at a glance which platform manages it. The discovery process runs continuously, so when you create a new Vercel project or add a new GitHub Actions workflow, it appears in CPI-Control automatically.
          </p>
          <p>
            CPI-Control is also smart about avoiding duplicates. If a GitHub repository deploys to a Kubernetes cluster, CPI-Control recognizes this as the same service managed by two providers rather than creating two separate entries. The service shows both the GitHub repository information (commits, branches, CI status) and the Kubernetes runtime information (pods, health, metrics) in a single view. This deduplication is based on naming conventions and infrastructure bindings, and you can manually link services if the automatic matching doesn&apos;t catch a connection.
          </p>

          <h2>The Deployment Timeline</h2>
          <p>
            The deployment timeline is the core feature for cross-provider visibility. It presents every deployment from every connected provider in a single, chronologically sorted table. Each row shows the service name, the provider logo (Vercel&apos;s triangle, GitHub&apos;s octocat, Kubernetes&apos; wheel, Semaphore&apos;s flag), the last commit message, the deployment status (success, failed, in progress, cancelled), the duration from start to finish, and a direct link to the deployment on the original provider&apos;s dashboard.
          </p>
          <p>
            The timeline is sortable by any column. Sort by time to see the most recent deploys first. Sort by status to group all failures together. Sort by service to see the deployment history of a specific application. The table supports infinite scrolling, loading older deployments as you scroll down, so you can trace deployment history back weeks or months.
          </p>

          <h2>Provider Filter Pills</h2>
          <p>
            Above the deployment timeline, a row of filter pills lets you quickly narrow down the view by provider. Click the Vercel pill to see only Vercel deployments. Click GitHub Actions to see only CI-triggered deploys. Click Kubernetes to see only cluster rollouts. The pills are toggleable &mdash; you can activate multiple at once to see, for example, only Vercel and GitHub deployments while hiding Kubernetes rollouts. Each pill shows a count of deployments from that provider in the current time range, giving you a quick sense of deployment volume per platform.
          </p>
          <p>
            Beyond provider filtering, the timeline supports text search across commit messages, service names, and branch names. If you know a specific feature branch name or a commit keyword, you can find its deployment instantly without scrolling through hundreds of entries.
          </p>

          <h2>What Each Deployment Shows</h2>
          <p>
            Click on any deployment row to expand its details. The expanded view varies by provider because each platform provides different metadata, but the core information is consistent. Every deployment shows the triggering commit SHA and message, the branch it was deployed from, the start and end time with duration, and the final status. For GitHub Actions deployments, you&apos;ll also see the workflow name, the specific job that ran, and any artifacts produced. For Vercel deployments, you see the deployment URL (both the unique deployment URL and the production alias), the framework detected, and build output size. For Kubernetes rollouts, you see the image tag that was deployed, the rollout strategy (rolling update or recreate), and the number of pods updated.
          </p>
          <p>
            Each expanded deployment also includes a direct link to the original provider&apos;s deployment page. If you need to see full build logs or trigger a redeployment, you can jump straight to the source with one click. CPI-Control is a monitoring and aggregation layer &mdash; it doesn&apos;t try to replace your providers&apos; dashboards, it ties them together.
          </p>

          <h2>Push Notifications for Deployment Failures</h2>
          <p>
            One of the most valuable aspects of unified deployment tracking is unified alerting. Instead of configuring notification webhooks in Vercel, GitHub, Semaphore, and your Kubernetes cluster separately, you configure notifications once in CPI-Control. Enable deployment failure notifications and you&apos;ll get alerted whenever a deploy fails, regardless of which provider it came from.
          </p>
          <p>
            Notifications are delivered through the operating system&apos;s native notification system (macOS Notification Center or Windows Notifications) and as in-app toast messages. Each notification includes the service name, the provider, the commit message, and the failure reason when available. Clicking a notification takes you directly to the failed deployment&apos;s detail view in CPI-Control, where you can see what went wrong and jump to the provider&apos;s build logs if needed.
          </p>
          <p>
            You can also configure success notifications for critical services. If your production API deploys successfully, you might want to know about it immediately so you can monitor the rollout. For less critical services, you can limit notifications to failures only, keeping your notification volume manageable.
          </p>

          <h2>Deployment Correlation</h2>
          <p>
            The real power of a unified deployment dashboard emerges when you start correlating deployments across providers. CPI-Control automatically identifies deployments triggered by the same commit across different services. If a single git push triggers a Vercel deployment of your frontend and a GitHub Actions workflow that deploys your backend to Kubernetes, CPI-Control groups these as related deployments. You can see them linked in the timeline, making it obvious that they&apos;re part of the same change.
          </p>
          <p>
            This correlation extends to branch-based workflows. If you deploy a feature branch to a preview environment on Vercel and simultaneously deploy the same branch to a staging namespace on Kubernetes, CPI-Control shows these deployments as related. When you later merge the branch and the production deployments trigger, those are linked too. The result is a complete audit trail from feature branch to production, across all providers, without any manual tagging or metadata management.
          </p>
          <p>
            For incident response, deployment correlation is invaluable. When you identify a problematic deployment in production, you can instantly see every other deployment that went out around the same time, across all providers. This cross-provider context often reveals the root cause faster than investigating each service in isolation.
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
