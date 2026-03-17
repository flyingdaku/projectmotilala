import { NextResponse } from "next/server";
import { pgDb } from "@/lib/data/db-postgres";
import { INDIA_INDICES } from "@/lib/screener/dsl/column-map";

/**
 * GET /api/screener/meta
 * Returns dynamic options for screener dropdowns:
 *   - sectors: distinct non-null sectors from active equities
 *   - indices:  available index keys (from INDIA_INDICES map + DB presence check)
 */
export async function GET() {
  try {
    // ── Sectors ──────────────────────────────────────────────────────────────
    const sectorRows = await pgDb.queryAll<{ sector: string }>(
      `SELECT DISTINCT sector
       FROM assets
       WHERE is_active = 1
         AND asset_class = 'EQUITY'
         AND sector IS NOT NULL
         AND sector != ''
       ORDER BY sector ASC`
    );
    const sectors = sectorRows.map(r => r.sector);

    // ── Indices (check which ones have constituents in DB) ───────────────────
    const indexNameRows = await pgDb.queryAll<{ name: string }>(
      `SELECT DISTINCT a.name
       FROM index_constituents ic
       JOIN assets a ON a.id = ic.index_id
       ORDER BY a.name ASC`
    );
    const dbIndexNames = new Set(indexNameRows.map(r => r.name));

    // Map back to DSL keys
    const indices = Object.entries(INDIA_INDICES)
      .filter(([, name]) => dbIndexNames.has(name))
      .map(([key, name]) => ({ value: key, label: name }));

    return NextResponse.json({ sectors, indices });
  } catch (err) {
    console.error("Screener meta error:", err);
    return NextResponse.json({ error: "Failed to load screener metadata" }, { status: 500 });
  }
}
