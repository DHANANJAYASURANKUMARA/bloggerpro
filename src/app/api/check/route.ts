import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "RECOVERY_MODE",
    message: "Zero-dependency check active.",
    timestamp: new Date().toISOString(),
    env_check: {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
      VERCEL_ENV: process.env.VERCEL_ENV || "NOT SET",
      // Show first 15 chars of DB URL to verify instance change (Safe as it's just the protocol/user)
      DB_URL_PREVIEW: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 25) + "..." : "NONE"
    }
  });
}
