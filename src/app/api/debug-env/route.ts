import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    keys: Object.keys(process.env).filter(k => k.startsWith("PG") || k.startsWith("DATABASE") || k.includes("URL")),
    dbUrl: !!process.env.DATABASE_URL,
    dbUrlLength: process.env.DATABASE_URL?.length
  })
}
