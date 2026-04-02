export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { ensureTables, deactivateByToken } from "@/lib/license-db";

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const success = await deactivateByToken(token);
    if (!success) {
      return NextResponse.json({ error: "Token not found or already deactivated" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("License deactivation error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
