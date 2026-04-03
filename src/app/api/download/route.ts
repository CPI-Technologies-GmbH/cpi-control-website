export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

const REPO = "CPI-Technologies-GmbH/cpi-control";
const RELEASE_TAG = "latest";

export async function GET(request: NextRequest) {
  const platform = request.nextUrl.searchParams.get("platform") || "mac";

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/tags/${RELEASE_TAG}`,
      {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "CPI-Control-Website" },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(`https://github.com/${REPO}/releases/tag/${RELEASE_TAG}`);
    }

    const release = await res.json();
    const assets = release.assets || [];

    let asset;
    if (platform === "windows") {
      asset = assets.find((a: any) => a.name.includes("x64-setup") && a.name.endsWith(".exe"));
      if (!asset) asset = assets.find((a: any) => a.name.endsWith(".msi"));
    } else {
      // macOS default
      asset = assets.find((a: any) => a.name.includes("aarch64") && a.name.endsWith(".dmg"));
      if (!asset) asset = assets.find((a: any) => a.name.endsWith(".dmg"));
    }

    if (asset?.browser_download_url) {
      return NextResponse.redirect(asset.browser_download_url);
    }

    // Fallback to releases page
    return NextResponse.redirect(`https://github.com/${REPO}/releases/tag/${RELEASE_TAG}`);
  } catch {
    return NextResponse.redirect(`https://github.com/${REPO}/releases/tag/${RELEASE_TAG}`);
  }
}
