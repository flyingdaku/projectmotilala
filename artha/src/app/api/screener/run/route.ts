import { NextRequest, NextResponse } from "next/server";
import type { ScreenerFilters } from "@/lib/data/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filters: ScreenerFilters = body.filters ?? {};

    // Build a mock/stub result set for now — real SQL integration wired via DSL
    // This returns sample data so the UI works end-to-end
    const mockResults = [
      { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Energy", marketCapCr: 1750000, price: 1285.50, pctChange: 0.84, pe: 22.1, pb: 2.4, roce: 11.2, roe: 9.8, rsi14: 54.3 },
      { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", marketCapCr: 1420000, price: 3890.00, pctChange: -0.31, pe: 28.5, pb: 12.1, roce: 48.2, roe: 44.6, rsi14: 47.8 },
      { symbol: "INFY", name: "Infosys Ltd", sector: "IT", marketCapCr: 620000, price: 1498.75, pctChange: 1.12, pe: 24.3, pb: 7.8, roce: 38.9, roe: 32.5, rsi14: 62.1 },
      { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking", marketCapCr: 1180000, price: 1624.30, pctChange: 0.55, pe: 18.7, pb: 2.9, roce: 17.4, roe: 16.8, rsi14: 51.2 },
      { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking", marketCapCr: 890000, price: 1268.50, pctChange: 0.22, pe: 17.2, pb: 3.1, roce: 19.2, roe: 18.1, rsi14: 58.4 },
      { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", sector: "NBFC", marketCapCr: 440000, price: 7120.00, pctChange: -0.75, pe: 32.4, pb: 6.2, roce: 14.8, roe: 22.3, rsi14: 43.6 },
      { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG", marketCapCr: 510000, price: 2180.45, pctChange: 0.18, pe: 52.3, pb: 10.4, roce: 92.1, roe: 78.5, rsi14: 49.7 },
      { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", marketCapCr: 270000, price: 490.25, pctChange: 0.94, pe: 21.8, pb: 3.2, roce: 22.4, roe: 17.9, rsi14: 66.2 },
      { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries", sector: "Pharma", marketCapCr: 390000, price: 1628.90, pctChange: 1.45, pe: 38.2, pb: 5.6, roce: 21.3, roe: 17.2, rsi14: 71.8 },
      { symbol: "ASIANPAINT", name: "Asian Paints Ltd", sector: "Consumer", marketCapCr: 290000, price: 3021.00, pctChange: -0.42, pe: 58.4, pb: 15.8, roce: 35.6, roe: 29.4, rsi14: 38.5 },
    ];

    // Apply basic formula filtering if present
    const formulaFilters = filters.formula ?? [];
    let filtered = mockResults;

    // Basic numeric range filter application
    if (filters.peTtm?.max != null) {
      filtered = filtered.filter(r => r.pe != null && r.pe <= filters.peTtm!.max!);
    }
    if (filters.peTtm?.min != null) {
      filtered = filtered.filter(r => r.pe != null && r.pe >= filters.peTtm!.min!);
    }
    if (filters.roce?.min != null) {
      filtered = filtered.filter(r => r.roce != null && r.roce >= filters.roce!.min!);
    }
    if (filters.rsi14?.min != null) {
      filtered = filtered.filter(r => r.rsi14 != null && r.rsi14 >= filters.rsi14!.min!);
    }
    if (filters.rsi14?.max != null) {
      filtered = filtered.filter(r => r.rsi14 != null && r.rsi14 <= filters.rsi14!.max!);
    }
    if (filters.marketCapCr?.min != null) {
      filtered = filtered.filter(r => r.marketCapCr != null && r.marketCapCr >= filters.marketCapCr!.min!);
    }
    if (filters.marketCapCr?.max != null) {
      filtered = filtered.filter(r => r.marketCapCr != null && r.marketCapCr <= filters.marketCapCr!.max!);
    }

    // If no filters provided, return all mock results
    if (formulaFilters.length === 0 && Object.keys(filters).length === 0) {
      filtered = mockResults;
    }

    return NextResponse.json({
      results: filtered,
      total: filtered.length,
    });
  } catch (err) {
    console.error("Screener run error:", err);
    return NextResponse.json(
      { error: "Failed to run screen" },
      { status: 500 }
    );
  }
}
