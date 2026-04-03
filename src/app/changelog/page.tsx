import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Changelog",
  description: "See what's new in CPI-Control — release notes, new features, and improvements.",
};

async function getRecentReleases() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/CPI-Technologies-GmbH/cpi-control/releases?per_page=10",
      {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "CPI-Control-Website" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ChangelogPage() {
  const releases = await getRecentReleases();

  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Changelog</h1>
        <p className="text-gray-400 mb-12">New features, improvements, and fixes in CPI-Control.</p>

        {releases.length === 0 ? (
          <p className="text-gray-500">
            No releases found.{" "}
            <a
              href="https://github.com/CPI-Technologies-GmbH/cpi-control/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              View on GitHub &rarr;
            </a>
          </p>
        ) : (
          <div className="space-y-10">
            {releases.map((release: any) => (
              <article key={release.id} className="border-l-2 border-gray-800 pl-6 relative">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-gray-100">
                    {release.name || release.tag_name}
                  </h2>
                  {release.prerelease && (
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                      Pre-release
                    </span>
                  )}
                </div>
                <time className="text-xs text-gray-500 block mb-3">
                  {new Date(release.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {release.body && (
                  <div className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {release.body.slice(0, 500)}
                    {release.body.length > 500 && "..."}
                  </div>
                )}
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
                >
                  View on GitHub &rarr;
                </a>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to Homepage</Link>
        </div>
      </main>
    </div>
  );
}
