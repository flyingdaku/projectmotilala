import { BaseRepository } from "./base";
import type { FactorDrawdownStat, FactorSnapshot } from "../types";

type FactorSnapshotRow = {
  frequency: "DAILY" | "MONTHLY" | "YEARLY";
  asOf: string;
  marketReturn: number | null;
  marketPremium: number | null;
  rfRate: number | null;
  smb: number | null;
  hml: number | null;
  wml: number | null;
  notes: string | null;
  [key: string]: unknown;
};

type FactorDrawdownRow = {
  factorCode: "ERP" | "HML" | "SMB" | "WML";
  factorName: string;
  annualizedReturn: number | null;
  annualizedVolatility: number | null;
  worstDrawdown: number | null;
  drawdownDurationYears: number | null;
  [key: string]: unknown;
};

type ReleaseTagRow = {
  release_tag: string | null;
  [key: string]: unknown;
};

type FactorRegressionRow = {
  date: string;
  assetReturn: number;
  marketPremium: number;
  smb: number;
  hml: number;
  wml: number;
  rfRate: number | null;
};

export class FactorRepository extends BaseRepository {
  private tableExists(tableName: string): boolean {
    const row = this.db.queryOne<{ name: string }>(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`,
      [tableName]
    );
    return !!row;
  }

  public getLatestSnapshots(): FactorSnapshot[] {
    if (!this.tableExists("ff_factor_returns")) return [];
    const rows = this.db.queryAll<FactorSnapshotRow>(
      `SELECT frequency,
              date AS asOf,
              market_return AS marketReturn,
              market_premium AS marketPremium,
              rf_rate AS rfRate,
              smb,
              hml,
              wml,
              notes
       FROM (
         SELECT frequency,
                date,
                market_return,
                market_premium,
                rf_rate,
                smb,
                hml,
                wml,
                notes,
                ROW_NUMBER() OVER (
                  PARTITION BY frequency
                  ORDER BY date DESC
                ) AS rn
         FROM ff_factor_returns
         WHERE source = 'IIMA'
       ) latest
       WHERE rn = 1
       ORDER BY CASE frequency
         WHEN 'DAILY' THEN 1
         WHEN 'MONTHLY' THEN 2
         WHEN 'YEARLY' THEN 3
         ELSE 4
       END`
    );
    return rows.map((row) => ({
      frequency: row.frequency,
      asOf: row.asOf,
      marketReturn: row.marketReturn,
      marketPremium: row.marketPremium,
      rfRate: row.rfRate,
      smb: row.smb,
      hml: row.hml,
      wml: row.wml,
      notes: row.notes,
    }));
  }

  public getDrawdownStats(): FactorDrawdownStat[] {
    if (!this.tableExists("ff_iima_drawdowns")) return [];
    const rows = this.db.queryAll<FactorDrawdownRow>(
      `SELECT factor_code AS factorCode,
              factor_name AS factorName,
              annualized_return AS annualizedReturn,
              annualized_volatility AS annualizedVolatility,
              worst_drawdown AS worstDrawdown,
              drawdown_duration_years AS drawdownDurationYears
       FROM ff_iima_drawdowns
       ORDER BY CASE factor_code
         WHEN 'ERP' THEN 1
         WHEN 'SMB' THEN 2
         WHEN 'HML' THEN 3
         WHEN 'WML' THEN 4
         ELSE 5
       END`
    );
    return rows.map((row) => ({
      factorCode: row.factorCode,
      factorName: row.factorName,
      annualizedReturn: row.annualizedReturn,
      annualizedVolatility: row.annualizedVolatility,
      worstDrawdown: row.worstDrawdown,
      drawdownDurationYears: row.drawdownDurationYears,
    }));
  }

  public getReleaseTag(): string | null {
    if (this.tableExists("ff_iima_drawdowns")) {
      const row = this.db.queryOne<ReleaseTagRow>(
        `SELECT release_tag
         FROM ff_iima_drawdowns
         WHERE release_tag IS NOT NULL
         ORDER BY created_at DESC
         LIMIT 1`
      );
      if (row?.release_tag) return row.release_tag;
    }
    if (this.tableExists("ff_iima_breakpoints")) {
      const row = this.db.queryOne<ReleaseTagRow>(
        `SELECT release_tag
         FROM ff_iima_breakpoints
         WHERE release_tag IS NOT NULL
         ORDER BY created_at DESC
         LIMIT 1`
      );
      if (row?.release_tag) return row.release_tag;
    }
    return null;
  }

  public getRegressionInputs(assetId: string, lookbackDays: number = 540): FactorRegressionRow[] {
    if (!this.tableExists("daily_prices") || !this.tableExists("ff_factor_returns")) return [];
    const cutoff = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    return this.db.queryAll<FactorRegressionRow>(
      `WITH ranked_prices AS (
         SELECT date,
                adj_close,
                source_exchange,
                ROW_NUMBER() OVER (
                  PARTITION BY date
                  ORDER BY CASE source_exchange WHEN 'NSE' THEN 0 ELSE 1 END
                ) AS rn
         FROM daily_prices
         WHERE asset_id = ?
           AND date >= ?
           AND adj_close IS NOT NULL
           AND adj_close > 0
           AND source_exchange IN ('NSE', 'BSE')
       ), dedup_prices AS (
         SELECT date, adj_close
         FROM ranked_prices
         WHERE rn = 1
       ), asset_returns AS (
         SELECT date,
                ((adj_close / LAG(adj_close) OVER (ORDER BY date)) - 1.0) * 100.0 AS assetReturn
         FROM dedup_prices
       )
       SELECT ar.date AS date,
              ar.assetReturn AS assetReturn,
              ff.market_premium AS marketPremium,
              ff.smb AS smb,
              ff.hml AS hml,
              ff.wml AS wml,
              ff.rf_rate AS rfRate
       FROM asset_returns ar
       INNER JOIN ff_factor_returns ff
         ON ff.date = ar.date
        AND ff.frequency = 'DAILY'
        AND ff.source = 'IIMA'
       WHERE ar.assetReturn IS NOT NULL
         AND ff.market_premium IS NOT NULL
         AND ff.smb IS NOT NULL
         AND ff.hml IS NOT NULL
         AND ff.wml IS NOT NULL
       ORDER BY ar.date ASC`,
      [assetId, cutoff]
    );
  }
}
