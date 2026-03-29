import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPI-Control — Infrastructure at a Glance",
  description: "One native desktop app for Kubernetes, health monitoring, deployments, and live logs. Your data stays local. Your wallet stays intact.",
  openGraph: {
    title: "CPI-Control — Infrastructure at a Glance",
    description: "Stop tab-hopping. Start shipping. One desktop app for all your infrastructure.",
    images: ["/screenshots/01-dashboard.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
