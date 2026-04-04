import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Self-Hosted Status Pages",
  description:
    "Create branded status pages hosted on your own server. Custom domain, automatic HTTPS, real uptime data. 3 themes included.",
  keywords: [
    "status page",
    "self-hosted status page",
    "branded status page",
    "uptime monitoring",
    "status page custom domain",
    "free status page",
    "open source status page",
    "statuspage alternative",
    "betteruptime alternative",
    "instatus alternative",
  ],
  alternates: {
    canonical: "https://cpi-control.com/features/status-pages",
  },
  openGraph: {
    title: "Self-Hosted Status Pages | CPI-Control",
    description:
      "Create branded status pages hosted on your own server. Custom domain, automatic HTTPS, real uptime data. 3 themes included.",
    url: "https://cpi-control.com/features/status-pages",
    images: [
      {
        url: "/screenshots/statuspage-demo.png",
        width: 1200,
        height: 900,
        alt: "CPI-Control branded status page showing real-time service health and uptime history",
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
          Status Pages
          <span className="w-6 h-px bg-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6 text-gray-100">
          Branded Status Pages<br />on Your Domain
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-10">
          Professional status pages powered by real monitoring data. Self-hosted,
          custom branded, with automatic HTTPS.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
            &#8595;&ensp;Download CPI-Control Free
          </a>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-4 bg-blue-500/5 rounded-2xl blur-xl" />
        <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
          <Image
            src="/screenshots/statuspage-demo.png"
            alt="CPI-Control status page with real-time uptime bars, service health indicators, and branded design"
            width={1200}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <Image src="/blog/status-page-hero.png" alt="Self-hosted branded status pages with custom domain, automatic HTTPS, and real uptime data" width={1200} height={675} className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl shadow-black/50 mt-12" />
    </section>
  );
}

function YourDomainSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Custom Domain</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Your Domain, Your Brand
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Host your status page on your own domain with automatic HTTPS via Let&apos;s Encrypt.
            Upload your company logo, set your brand name, and choose your primary color — your status page
            looks like it was built in-house, because it runs on your infrastructure.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Custom domain with automatic Let&apos;s Encrypt HTTPS certificates
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Upload your logo and set your company name
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Choose your primary accent color to match your brand
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Hosted on your own server — no third-party data processing
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Status Page Config</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1.5 block">Domain</label>
                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm font-mono text-gray-200">status.yourcompany.com</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1.5 block">Company Name</label>
                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm font-mono text-gray-200">Acme Inc.</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1.5 block">Primary Color</label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30">
                  <div className="w-5 h-5 rounded-full bg-blue-500" />
                  <span className="text-sm font-mono text-gray-200">#3B82F6</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-mono text-green-400">HTTPS certificate active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealUptimeSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="lg:order-2">
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Real Data</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Real Uptime Data
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Unlike synthetic monitoring services, CPI-Control status pages are powered by actual health
            check results from your monitoring agent. The uptime history bars adapt their resolution automatically —
            hourly for the last 24 hours, daily for the last month, and condensed for the 90-day view.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Powered by real health monitoring results, not synthetic checks
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Adaptive history bars — hourly, daily, or 90-day resolution
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Response time display for transparency
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-green-400 mt-0.5 text-base">&#10003;</span>
              Automatic incident creation and resolution
            </li>
          </ul>
        </div>
        <div className="lg:order-1 relative">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-5">Uptime — Last 90 Days</div>
            {["API Gateway", "Web App", "Payment Service"].map((svc) => (
              <div key={svc} className="mb-5 last:mb-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-200 font-medium">{svc}</span>
                  <span className="text-xs font-mono text-green-400">99.98%</span>
                </div>
                <div className="flex gap-0.5 h-6">
                  {Array.from({ length: 90 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-[1px] ${
                        i === 34 || i === 67
                          ? "bg-amber-400/70"
                          : i === 52
                            ? "bg-red-400/70"
                            : "bg-green-400/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between text-[10px] font-mono text-gray-600 mt-3">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemesSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Themes</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          Three Themes Included
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Dark (default), Light, and Minimal. All responsive, all fast.
          Static HTML served directly by the monitoring agent — no JavaScript required.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Dark",
            desc: "Default theme. High contrast, easy on the eyes. Perfect for engineering teams.",
            bg: "bg-[#0d1117]",
            text: "text-gray-200",
            bar: "bg-green-400/60",
            border: "border-gray-700",
          },
          {
            name: "Light",
            desc: "Clean white background. Professional look for customer-facing pages.",
            bg: "bg-white",
            text: "text-gray-800",
            bar: "bg-green-500/70",
            border: "border-gray-200",
          },
          {
            name: "Minimal",
            desc: "Stripped-down design. Just the essentials — service name and status.",
            bg: "bg-gray-50",
            text: "text-gray-700",
            bar: "bg-green-500/50",
            border: "border-gray-200",
          },
        ].map((theme) => (
          <div key={theme.name} className={`rounded-xl border ${theme.border} ${theme.bg} p-6 shadow-lg`}>
            <div className={`text-sm font-semibold ${theme.text} mb-1`}>{theme.name}</div>
            <p className="text-xs text-gray-500 mb-4">{theme.desc}</p>
            <div className="space-y-2">
              {["API", "Web", "CDN"].map((svc) => (
                <div key={svc} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className={`text-xs ${theme.text} opacity-70`}>{svc}</span>
                  <div className="flex-1" />
                  <div className="flex gap-px">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className={`w-1 h-3 rounded-[0.5px] ${theme.bar}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EasySetupSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Setup</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6 text-gray-100">
            Easy Setup
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Four steps to a production-ready status page. Install the monitoring agent on any VPS or server,
            create a status page in CPI-Control, select which services to display, and deploy. One-click
            deployment via SSH handles the rest.
          </p>
        </div>
        <div className="relative">
          <div className="space-y-4">
            {[
              { step: "01", title: "Install the Monitoring Agent", desc: "One binary, runs on any Linux server. Handles health checks, HTTPS certs, and serves your status page." },
              { step: "02", title: "Create Status Page in CPI-Control", desc: "Set your domain, upload your logo, choose a theme. The UI guides you through every setting." },
              { step: "03", title: "Select Services to Display", desc: "Pick which services appear on your public status page. Only show what your customers care about." },
              { step: "04", title: "Deploy with One Click", desc: "CPI-Control pushes the configuration to your agent via SSH. Your status page is live in seconds." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 p-5 rounded-xl bg-gray-900/50 border border-gray-800/50">
                <div className="font-mono text-2xl font-bold text-blue-400/30 shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 mb-1">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/50">
      <div className="text-center mb-16">
        <div className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Why Self-Host</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-100">
          Why host your own status page?
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "No Monthly Fees",
            desc: "StatusPage.io charges $29-$399/month. Better Stack starts at $20/month. CPI-Control status pages are free — you only pay for your server.",
          },
          {
            title: "Full Data Control",
            desc: "Your uptime data stays on your infrastructure. No third-party data processing agreements needed. GDPR-compliant by default.",
          },
          {
            title: "No Vendor Lock-in",
            desc: "Static HTML files. Standard HTTPS. Standard DNS. If you ever want to switch, your domain and data stay with you.",
          },
        ].map((benefit) => (
          <div key={benefit.title} className="p-8 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">{benefit.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{benefit.desc}</p>
          </div>
        ))}
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
          Your status page.<br />Your <em className="text-blue-400 not-italic">domain.</em>
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Download CPI-Control, install the monitoring agent, and have a branded status page
          live on your domain in under 10 minutes. Free forever.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-7">
          <a href="/api/download?platform=mac" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25">
            &#8595;&ensp;Download CPI-Control Free
          </a>
        </div>
        <div className="flex gap-6 justify-center flex-wrap font-mono text-xs text-gray-500">
          <span>macOS 12+ (.dmg)</span>
          <span>Windows 10+ (.msi)</span>
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

export default function StatusPagesFeaturePage() {
  return (
    <>
      <Nav />
      <Hero />
      <YourDomainSection />
      <RealUptimeSection />
      <ThemesSection />
      <EasySetupSection />
      <BenefitsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
