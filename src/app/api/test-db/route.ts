import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    return NextResponse.json({
      status: "CONNECTED",
      database: "REACHABLE",
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("[DB_TEST_ERROR]", error);
    return NextResponse.json({
      status: "FAILED",
      database: "UNREACHABLE",
      error: error.message,
      env_db_url_exists: !!process.env.DATABASE_URL,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
