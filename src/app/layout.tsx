import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cpi-control.com"),
  title: {
    default: "CPI-Control — Infrastructure Monitoring Desktop App",
    template: "%s | CPI-Control",
  },
  description:
    "Free desktop app for Kubernetes management, health monitoring, deployment tracking, and live logs. 100% local data, zero cloud dependency. macOS & Windows.",
  keywords: [
    "infrastructure monitoring",
    "kubernetes management",
    "deployment tracking",
    "health monitoring",
    "devops dashboard",
    "kubernetes desktop app",
    "self-hosted monitoring",
    "status page",
    "live logs",
    "datadog alternative",
    "lens alternative",
    "free monitoring tool",
  ],
  authors: [{ name: "CPI Technologies GmbH", url: "https://cpitech.io" }],
  creator: "CPI Technologies GmbH",
  publisher: "CPI Technologies GmbH",
  alternates: {
    canonical: "https://cpi-control.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cpi-control.com",
    siteName: "CPI-Control",
    title: "CPI-Control — Infrastructure Monitoring Desktop App",
    description:
      "Stop tab-hopping. Start shipping. One native desktop app for Kubernetes, health monitoring, deployments, and live logs. Free for up to 50 services.",
    images: [
      {
        url: "/screenshots/01-dashboard.png",
        width: 1920,
        height: 1080,
        alt: "CPI-Control Dashboard — unified infrastructure monitoring with service health, deployments, and incidents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CPI-Control — Infrastructure Monitoring Desktop App",
    description:
      "Free desktop app for Kubernetes, health monitoring, deployments & live logs. 100% local data. macOS & Windows.",
    images: ["/screenshots/01-dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/app-icon.png",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  "name": "CPI-Control",
                  "applicationCategory": "DeveloperApplication",
                  "operatingSystem": "macOS, Windows",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR",
                    "description": "Free for up to 50 services"
                  },
                  "description": "Desktop app for Kubernetes management, health monitoring, deployment tracking, and live logs. 100% local data.",
                  "screenshot": "https://cpi-control.com/screenshots/01-dashboard.png",
                  "url": "https://cpi-control.com",
                  "downloadUrl": "https://cpi-control.com/api/download?platform=mac",
                  "softwareVersion": "0.1.26",
                  "author": {
                    "@type": "Organization",
                    "name": "CPI Technologies GmbH",
                    "url": "https://cpitech.io"
                  },
                  "featureList": [
                    "Multi-cluster Kubernetes management",
                    "Built-in health monitoring",
                    "Cross-provider deployment tracking",
                    "Multi-cluster live logs",
                    "AI-powered diagnostics",
                    "Branded status pages",
                    "Push notifications",
                    "100% local data storage"
                  ]
                },
                {
                  "@type": "Organization",
                  "name": "CPI Technologies GmbH",
                  "url": "https://cpitech.io",
                  "logo": "https://www.cpitech.io/images/68f8d51c2f57198f96420746_logo.svg",
                  "sameAs": [
                    "https://github.com/CPI-Technologies-GmbH"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "CPI-Control",
                  "url": "https://cpi-control.com"
                }
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
