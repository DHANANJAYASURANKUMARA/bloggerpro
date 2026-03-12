import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Basic check for env presence (sanitized)
  const health = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    authenticated: !!session,
    role: (session?.user as any)?.role || "GUEST"
  };

  return NextResponse.json(health);
}
