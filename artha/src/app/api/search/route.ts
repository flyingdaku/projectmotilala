import { NextRequest, NextResponse } from "next/server";
import { getDataAdapter } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") ?? "";
    const limit = Number(req.nextUrl.searchParams.get("limit") ?? "10");

    if (!q.trim()) {
      return NextResponse.json({ results: [] });
    }

    const adapter = await getDataAdapter();
    const stocks = await adapter.stocks.search(q, limit);

    const results = stocks.map(s => ({
      symbol: s.symbol,
      name: s.name,
      exchange: s.exchange ?? "NSE",
      sector: s.sector,
    }));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[search]", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
