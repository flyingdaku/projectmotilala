import { NextRequest, NextResponse } from "next/server";
import type { ScreenerFilters, RangeFilter } from "@/lib/data/types";
import { getDb } from "@/lib/data/db";
import { INDIA_INDICES } from "@/lib/screener/dsl/column-map";

// ── Market-cap bucket boundaries (₹ Cr) ──────────────────────────────────────
const MCAP_BUCKETS: Record<string, { min?: number; max?: number }> = {
  large:  { min: 20000 },
  mid:    { min: 5000,  max: 20000 },
  small:  { min: 500,   max: 5000  },
  micro:  {             max: 500   },
};

// ── Range helper → SQL fragment + push params ─────────────────────────────────
function applyRange(
  col: string,
  range: RangeFilter | undefined,
  where: string[],
  params: unknown[],
) {
  if (!range) return;
  if (range.min != null) {
    params.push(range.min);
    where.push(`${col} >= ?`);
  }
  if (range.max != null) {
    params.push(range.max);
    where.push(`${col} <= ?`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filters: ScreenerFilters = body.filters ?? {};
    const limit = Math.min(Number(body.limit ?? 200), 500);

    const db = getDb();
    const where: string[] = [];
    const params: unknown[] = [];

    // ── Base: active equity assets only ──────────────────────────────────────
    where.push("a.is_active = 1");

    // ── Asset class filter ────────────────────────────────────────────────────
    if (filters.assetClass && filters.assetClass.length > 0) {
      const mapped = filters.assetClass.map(v => v.toUpperCase());
      where.push(`a.asset_class IN (${mapped.map(() => "?").join(",")})`);
      params.push(...mapped);
    } else {
      where.push("a.asset_class = 'EQUITY'");
    }

    // ── Sector filter ─────────────────────────────────────────────────────────
    if (filters.sector && filters.sector.length > 0) {
      where.push(`a.sector IN (${filters.sector.map(() => "?").join(",")})`);
      params.push(...filters.sector);
    }

    // ── Index membership (via index_constituents) ────────────────────────────
    if (filters.indexMembership && filters.indexMembership.length > 0) {
      const indexNames = filters.indexMembership
        .map(key => INDIA_INDICES[key.toLowerCase()] ?? key)
        .filter(Boolean);
      if (indexNames.length > 0) {
        // Use latest date in index_constituents for current membership
        where.push(`
          a.id IN (
            SELECT ic.asset_id
            FROM index_constituents ic
            JOIN assets idx_a ON idx_a.id = ic.index_id
            WHERE idx_a.name IN (${indexNames.map(() => "?").join(",")})
              AND ic.date = (
                SELECT MAX(ic2.date) FROM index_constituents ic2
                WHERE ic2.index_id = ic.index_id
              )
          )
        `);
        params.push(...indexNames);
      }
    }

    // ── Market cap bucket ─────────────────────────────────────────────────────
    if (filters.marketCapBucket && filters.marketCapBucket.length > 0) {
      const bucketClauses: string[] = [];
      for (const bucket of filters.marketCapBucket) {
        const bounds = MCAP_BUCKETS[bucket.toLowerCase()];
        if (!bounds) continue;
        const parts: string[] = [];
        if (bounds.min != null) { parts.push(`cr.market_cap_cr >= ?`); params.push(bounds.min); }
        if (bounds.max != null) { parts.push(`cr.market_cap_cr < ?`);  params.push(bounds.max); }
        if (parts.length) bucketClauses.push(`(${parts.join(" AND ")})`);
      }
      if (bucketClauses.length) where.push(`(${bucketClauses.join(" OR ")})`);
    }

    // ── Market cap range ──────────────────────────────────────────────────────
    applyRange("cr.market_cap_cr", filters.marketCapCr, where, params);

    // ── Valuation ─────────────────────────────────────────────────────────────
    applyRange("cr.pe_ttm",       filters.peTtm,       where, params);
    applyRange("cr.pb",           filters.pb,           where, params);
    applyRange("cr.ev_ebitda",    filters.evEbitda,     where, params);
    applyRange("cr.dividend_yield", filters.dividendYield, where, params);

    // ── Profitability ─────────────────────────────────────────────────────────
    applyRange("cr.roce",             filters.roce,            where, params);
    applyRange("cr.roe",              filters.roe,             where, params);
    applyRange("cr.pat_margin",       filters.patMargin,       where, params);
    applyRange("cr.operating_margin", filters.operatingMargin, where, params);

    // ── Growth ────────────────────────────────────────────────────────────────
    applyRange("cr.revenue_growth_1y", filters.revenueGrowth1y, where, params);
    applyRange("cr.revenue_growth_3y", filters.revenueGrowth3y, where, params);
    applyRange("cr.pat_growth_1y",     filters.patGrowth1y,     where, params);
    applyRange("cr.eps_growth_1y",     filters.epsGrowth1y,     where, params);

    // ── Financial health ──────────────────────────────────────────────────────
    applyRange("cr.debt_equity",      filters.debtEquity,      where, params);
    applyRange("cr.interest_coverage", filters.interestCoverage, where, params);
    applyRange("cr.current_ratio",    filters.currentRatio,    where, params);

    // ── Quality ───────────────────────────────────────────────────────────────
    applyRange("cr.quality_score", filters.qualityScore, where, params);

    // ── Technical (from technical_indicators join) ────────────────────────────
    applyRange("ti.rsi_14",            filters.rsi14,          where, params);
    applyRange("ti.pct_from_52w_high", filters.pctFrom52wHigh, where, params);
    applyRange("ti.pct_from_52w_low",  filters.pctFrom52wLow,  where, params);

    // ── DSL formula conditions ────────────────────────────────────────────────
    // DSL formulas are passed as pre-built WHERE fragments (from codegen)
    // For now, simple string formulas are injected directly (sanitised by codegen)
    // Full parser integration to follow — for now we trust codegen output strings
    if (filters.formula && filters.formula.length > 0) {
      for (const frag of filters.formula) {
        if (typeof frag === "string" && frag.trim()) {
          // Replace $N param placeholders with ? for SQLite
          const converted = frag.replace(/\$\d+/g, "?");
          where.push(converted);
        }
      }
    }

    // ── Build final SQL ───────────────────────────────────────────────────────
    const sql = `
      SELECT
        a.id,
        a.nse_symbol        AS symbol,
        a.name,
        a.sector,
        a.industry_group    AS industryGroup,
        a.asset_class       AS assetClass,
        cr.market_cap_cr    AS marketCapCr,
        cr.pe_ttm           AS pe,
        cr.pb,
        cr.ev_ebitda        AS evEbitda,
        cr.dividend_yield   AS dividendYield,
        cr.roce,
        cr.roe,
        cr.pat_margin       AS patMargin,
        cr.operating_margin AS operatingMargin,
        cr.revenue_growth_1y AS revenueGrowth1y,
        cr.pat_growth_1y    AS patGrowth1y,
        cr.eps_growth_1y    AS epsGrowth1y,
        cr.debt_equity      AS debtEquity,
        cr.quality_score    AS qualityScore,
        ti.close            AS price,
        ti.change_1d_pct    AS pctChange,
        ti.rsi_14           AS rsi14,
        ti.pct_from_52w_high AS pctFrom52wHigh,
        ti.sma_50           AS sma50,
        ti.sma_200          AS sma200
      FROM assets a
      LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
      LEFT JOIN technical_indicators ti ON ti.asset_id = a.id
      WHERE ${where.join(" AND ")}
      ORDER BY cr.market_cap_cr DESC NULLS LAST
      LIMIT ?
    `;
    params.push(limit);

    const rows = db.queryAll<Record<string, unknown>>(sql, params);

    const results = rows.map(r => ({
      symbol:          r.symbol,
      name:            r.name,
      sector:          r.sector,
      industryGroup:   r.industryGroup,
      assetClass:      r.assetClass,
      marketCapCr:     r.marketCapCr,
      price:           r.price,
      pctChange:       r.pctChange,
      pe:              r.pe,
      pb:              r.pb,
      evEbitda:        r.evEbitda,
      dividendYield:   r.dividendYield,
      roce:            r.roce,
      roe:             r.roe,
      patMargin:       r.patMargin,
      operatingMargin: r.operatingMargin,
      revenueGrowth1y: r.revenueGrowth1y,
      patGrowth1y:     r.patGrowth1y,
      epsGrowth1y:     r.epsGrowth1y,
      debtEquity:      r.debtEquity,
      qualityScore:    r.qualityScore,
      rsi14:           r.rsi14,
      pctFrom52wHigh:  r.pctFrom52wHigh,
      sma50:           r.sma50,
      sma200:          r.sma200,
    }));

    return NextResponse.json({
      results,
      total: results.length,
    });
  } catch (err) {
    console.error("Screener run error:", err);
    return NextResponse.json(
      { error: "Failed to run screen" },
      { status: 500 }
    );
  }
}
