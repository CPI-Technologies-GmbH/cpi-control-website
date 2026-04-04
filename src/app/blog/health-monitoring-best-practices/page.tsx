import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Health Monitoring Done Right: HTTP Checks That Actually Tell You Something",
  description:
    "Why /health returning 200 isn't enough, and how to build checks that catch real problems before your users do.",
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
          <span className="text-xs font-mono bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">Best Practice</span>
          <h1 className="text-4xl font-bold mt-4 mb-3">Health Monitoring Done Right: HTTP Checks That Actually Tell You Something</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>7 min read</span>
            <span>&middot;</span>
            <time>April 2026</time>
          </div>
        </div>
        <Image
          src="/blog/health-monitoring-hero.png"
          alt="Health monitoring best practices for HTTP checks"
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mb-8"
        />
        <div className="prose prose-invert prose-sm max-w-none">
          <p>
            Every monitoring tutorial starts the same way: create a <code>/health</code> endpoint that returns <code>200 OK</code>.
            Congratulations, you now have a health check that tells you absolutely nothing. Your database could be unreachable,
            your Redis cache could be full, your disk could be at 99% &mdash; and that endpoint will happily return 200 until the
            entire service collapses.
          </p>
          <p>
            False positives are annoying. False negatives are dangerous. A health check that says &ldquo;everything is fine&rdquo; while
            your application is silently failing is worse than having no health check at all, because it gives you confidence you
            haven&rsquo;t earned. Let&rsquo;s talk about how to build HTTP checks that actually catch problems.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Status Code Mapping: Not Every Non-200 Is a Problem</h2>
          <p>
            The first mistake teams make is treating any non-200 response as a failure. This leads to alert storms that train
            your team to ignore notifications &mdash; the exact opposite of what you want. Here&rsquo;s a more nuanced mapping:
          </p>
          <p>
            <strong>200-299:</strong> Healthy. The service is responding and functioning. This is your baseline.
          </p>
          <p>
            <strong>404 Not Found:</strong> Usually healthy. If you&rsquo;re monitoring the root path of an API that doesn&rsquo;t serve
            anything at <code>/</code>, a 404 means the server is running and responding to requests &mdash; it just doesn&rsquo;t have
            a handler for that path. CPI-Control treats 404 as healthy by default because this pattern is extremely common with
            API servers, Kubernetes ingress controllers, and reverse proxies.
          </p>
          <p>
            <strong>401/403 Unauthorized/Forbidden:</strong> The server is running and enforcing authentication. Unless your
            health check endpoint is supposed to be public, these codes confirm the service is alive and security is working.
            Don&rsquo;t alert on these unless you explicitly expect a 200 from that endpoint.
          </p>
          <p>
            <strong>429 Too Many Requests:</strong> The service is alive but rate-limiting. This is degradation, not downtime.
            Track it as a warning, not a critical alert.
          </p>
          <p>
            <strong>500-503:</strong> This is where you pay attention. A 500 means unhandled errors, 502 means the upstream is
            unreachable, and 503 means the service is explicitly telling you it&rsquo;s unavailable. These are critical.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Response Time as a Degradation Signal</h2>
          <p>
            Slow is the new down. A service that responds in 15 seconds is technically &ldquo;up&rdquo; but completely unusable for your
            customers. Response time monitoring catches the degradation phase that precedes most outages &mdash; the period where
            database connections are pooling up, memory is leaking, or a downstream dependency is timing out.
          </p>
          <p>
            Set response time thresholds based on your actual baseline, not arbitrary numbers. If your API normally responds
            in 120ms, a 500ms response is a yellow flag. A 2-second response is a red flag. If your health check endpoint
            queries the database, cache, and any critical dependencies, its response time becomes a composite indicator of
            overall system health.
          </p>
          <p>
            CPI-Control captures response time on every check and stores it as metadata. You can see trends over time and
            spot degradation before it turns into downtime. A service that goes from 100ms to 800ms over 30 minutes is telling
            you something &mdash; listen to it.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Consecutive Failure Thresholds: Don&rsquo;t Page on One Timeout</h2>
          <p>
            Networks are unreliable. DNS resolvers hiccup. Load balancers rotate. A single failed health check means almost
            nothing. Two consecutive failures are concerning. Three are a pattern. Five are an incident.
          </p>
          <p>
            Configure your monitoring to require multiple consecutive failures before escalating. The exact number depends on
            your check interval and your tolerance for detection latency. If you check every 30 seconds and require 3 consecutive
            failures, you&rsquo;ll detect a real outage within 90 seconds while ignoring momentary blips.
          </p>
          <p>
            This is one of the highest-impact configurations you can make. Teams that alert on every single failure end up
            with hundreds of notifications per week, most of which are transient network issues. Teams that use consecutive
            thresholds get maybe 2-3 alerts per week &mdash; and every single one matters.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Auto-Recovery: Know When to Close Incidents</h2>
          <p>
            A good monitoring system doesn&rsquo;t just detect failures &mdash; it detects recovery. When your service comes back
            online and passes consecutive health checks, the incident should close automatically. This prevents stale
            incidents from cluttering your dashboard and gives you accurate uptime calculations.
          </p>
          <p>
            Auto-recovery should mirror your failure detection. If you require 3 consecutive failures to open an incident,
            require 2-3 consecutive successes to close it. This prevents flapping &mdash; the scenario where a struggling service
            passes one check, closes the incident, fails the next check, opens a new incident, and repeats in an endless cycle.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Response Body Capture: What Happened When It Went Down</h2>
          <p>
            When a service goes down at 3 AM and recovers by 3:15 AM, the first question in the morning standup is: &ldquo;What
            happened?&rdquo; If all you have is &ldquo;it returned 503 for 15 minutes,&rdquo; you&rsquo;re going to spend hours digging through
            logs trying to reconstruct the timeline.
          </p>
          <p>
            Capture the response body on failure. Many applications return error details in their 500 responses &mdash; stack
            traces, error codes, database connection errors, memory warnings. This metadata turns a vague &ldquo;it was down&rdquo; into
            a specific &ldquo;PostgreSQL connection pool was exhausted at 03:02 UTC.&rdquo;
          </p>
          <p>
            CPI-Control stores response metadata including status codes, response times, headers, and body snippets for every
            failed check. When you review an incident, you see exactly what the service returned at the moment it failed &mdash;
            not what it returns now that it&rsquo;s recovered.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">Muting During Maintenance Windows</h2>
          <p>
            Deploying a new version? Migrating a database? Rotating certificates? These planned operations will trigger health
            check failures, and those failures will generate notifications that your team will ignore. Worse, they&rsquo;ll condition
            your team to ignore all notifications &mdash; including the real ones.
          </p>
          <p>
            Mute specific services before planned maintenance. A muted service is still checked (you want to know when it comes
            back), but failures don&rsquo;t generate notifications or incidents. When maintenance is complete, unmute the service.
            If you forgot to unmute, set an auto-unmute timer.
          </p>
          <p>
            This is one of those features that seems trivial until you don&rsquo;t have it. One Kubernetes rolling update across 20
            services without muting can generate 60+ notifications in 5 minutes. That&rsquo;s not monitoring &mdash; that&rsquo;s spam.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">CPI-Control&rsquo;s Approach</h2>
          <p>
            CPI-Control implements all of these patterns out of the box. Health checks are configurable per service with custom
            intervals, timeout thresholds, and expected status codes. 404 responses are treated as healthy by default. Incidents
            are created automatically after consecutive failures and closed automatically on recovery. Response metadata &mdash;
            status codes, response times, and body snippets &mdash; is captured and stored locally in SQLite, so you always have
            the forensic data you need.
          </p>
          <p>
            Muting is built into the notification system: mute a service, deploy your update, and unmute when you&rsquo;re done.
            No alert storms, no notification fatigue, no false sense of security. Just health checks that actually tell you
            something.
          </p>
        </div>
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
