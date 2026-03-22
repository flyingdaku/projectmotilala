/**
 * PostgreSQL data adapter backed by the relational and Timescale databases.
 */

import type {
  StockSummary,
  PriceBar,
  CorporateAction,
  CompanyProfile,
  CompanyDocument,
  CompanyEvent,
  QuarterlyResult,
  BalanceSheet,
  CashFlow,
  AnomalyFlag,
  ShareholdingPattern,
  GovernanceScore,
  FactorExposure,
  FactorContext,
  EarningsQuality,
  ComputedRatios,
  PeerComparison,
  FeedItem,
} from "./types";
import type { StockDetail } from "./index";
import { pgDb, tsDb } from "./db-postgres";

const DEFAULT_ALERT_CONFIG = {
  price: true,
  results: true,
  concall: true,
  shareholding: true,
  redFlags: true,
};

type FollowedAssetRow = {
  asset_id: string;
  nse_symbol: string | null;
  bse_code: string | null;
  name: string;
  alert_config: Record<string, boolean> | null;
};

type CorpActionFeedRow = {
  id: string;
  asset_id: string;
  action_type: string;
  ex_date: string;
  record_date: string | null;
  dividend_amount: number | null;
  ratio_numerator: number | null;
  ratio_denominator: number | null;
  raw_announcement: string | null;
  nse_symbol: string | null;
  bse_code: string | null;
  name: string;
};

type QuarterlyFeedRow = {
  asset_id: string;
  period_end_date: string;
  revenue_ops: number | null;
  net_profit: number | null;
  sales_growth_yoy: number | null;
  pat_growth_yoy: number | null;
  basic_eps: number | null;
  nse_symbol: string | null;
  bse_code: string | null;
  name: string;
};

type ShareholdingFeedRow = {
  asset_id: string;
  period_end_date: string;
  promoter_holding: number | null;
  fii_holding: number | null;
  dii_holding: number | null;
  public_holding: number | null;
  pledged_shares: number | null;
  nse_symbol: string | null;
  bse_code: string | null;
  name: string;
};

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

function buildAnnual(quarterly: QuarterlyResult[]): QuarterlyResult[] {
  const byYear = new Map<string, QuarterlyResult[]>();
  for (const q of quarterly) {
    const yr = q.periodEnd?.slice(0, 4) ?? "unknown";
    if (!byYear.has(yr)) byYear.set(yr, []);
    byYear.get(yr)!.push(q);
  }
  return [...byYear.entries()]
    .filter(([, qs]) => qs.length >= 2)
    .map(([yr, qs]) => ({
      periodEnd: `${yr}-03-31`,
      revenue: qs.reduce((s, q) => s + (q.revenue ?? 0), 0) || null,
      operatingProfit: qs.reduce((s, q) => s + (q.operatingProfit ?? 0), 0) || null,
      netProfit: qs.reduce((s, q) => s + (q.netProfit ?? q.pat ?? 0), 0) || null,
      pat: qs.reduce((s, q) => s + (q.pat ?? q.netProfit ?? 0), 0) || null,
      eps: qs.reduce((s, q) => s + (q.eps ?? 0), 0) || null,
    }))
    .sort((a, b) => (b.periodEnd ?? "").localeCompare(a.periodEnd ?? ""));
}

function normalizeAlertConfig(config?: Record<string, boolean> | null): Record<string, boolean> {
  return {
    ...DEFAULT_ALERT_CONFIG,
    ...(config ?? {}),
  };
}

function formatCrores(value: number | null | undefined): string | undefined {
  if (value == null || Number.isNaN(value)) return undefined;
  return `Rs ${value.toFixed(value >= 1000 ? 0 : 1)} Cr`;
}

function buildCorpActionTitle(row: CorpActionFeedRow): string {
  if (row.action_type === "DIVIDEND" && row.dividend_amount != null) {
    return `Dividend announced: Rs ${row.dividend_amount}/share`;
  }
  if ((row.action_type === "BONUS" || row.action_type === "SPLIT") && row.ratio_numerator && row.ratio_denominator) {
    return `${row.action_type === "BONUS" ? "Bonus" : "Split"} ${row.ratio_numerator}:${row.ratio_denominator}`;
  }
  return row.raw_announcement?.slice(0, 120) || row.action_type.replaceAll("_", " ");
}

function buildQuarterlyTitle(row: QuarterlyFeedRow): string {
  const bits: string[] = [];
  const revenue = formatCrores(row.revenue_ops);
  const profit = formatCrores(row.net_profit);
  if (revenue) bits.push(`Revenue ${revenue}`);
  if (profit) bits.push(`PAT ${profit}`);
  if (row.pat_growth_yoy != null) bits.push(`PAT YoY ${row.pat_growth_yoy.toFixed(1)}%`);
  if (bits.length === 0 && row.sales_growth_yoy != null) bits.push(`Sales YoY ${row.sales_growth_yoy.toFixed(1)}%`);
  return bits.length > 0 ? `Quarterly results: ${bits.join(" | ")}` : "Quarterly results updated";
}

function buildShareholdingDeltaEvent(rows: ShareholdingFeedRow[]): FeedItem | null {
  if (rows.length === 0) return null;
  const [latest, previous] = rows;
  const pledgeDelta = previous && latest.pledged_shares != null && previous.pledged_shares != null
    ? latest.pledged_shares - previous.pledged_shares
    : null;
  const fiiDelta = previous && latest.fii_holding != null && previous.fii_holding != null
    ? latest.fii_holding - previous.fii_holding
    : null;
  const promoterDelta = previous && latest.promoter_holding != null && previous.promoter_holding != null
    ? latest.promoter_holding - previous.promoter_holding
    : null;

  const eventData: Record<string, unknown> = {};
  if (latest.promoter_holding != null) eventData["Promoter %"] = latest.promoter_holding.toFixed(2);
  if (latest.fii_holding != null) eventData["FII %"] = latest.fii_holding.toFixed(2);
  if (latest.dii_holding != null) eventData["DII %"] = latest.dii_holding.toFixed(2);
  if (latest.pledged_shares != null) eventData["Pledged %"] = latest.pledged_shares.toFixed(2);
  if (fiiDelta != null) eventData["FII QoQ"] = `${fiiDelta >= 0 ? "+" : ""}${fiiDelta.toFixed(2)}pp`;
  if (promoterDelta != null) eventData["Promoter QoQ"] = `${promoterDelta >= 0 ? "+" : ""}${promoterDelta.toFixed(2)}pp`;

  let title = "Shareholding updated";
  let severity: FeedItem["severity"] = "INFO";
  if (pledgeDelta != null && pledgeDelta > 0.5) {
    title = `Pledged shares increased by ${pledgeDelta.toFixed(2)}pp`;
    severity = "WARNING";
  } else if (fiiDelta != null && Math.abs(fiiDelta) >= 1) {
    title = `FII holding ${fiiDelta > 0 ? "rose" : "fell"} by ${Math.abs(fiiDelta).toFixed(2)}pp`;
  } else if (promoterDelta != null && Math.abs(promoterDelta) >= 1) {
    title = `Promoter holding ${promoterDelta > 0 ? "rose" : "fell"} by ${Math.abs(promoterDelta).toFixed(2)}pp`;
  }

  return {
    id: `shareholding:${latest.asset_id}:${latest.period_end_date}`,
    assetId: latest.asset_id,
    nseSymbol: latest.nse_symbol ?? undefined,
    bseCode: latest.bse_code ?? undefined,
    stockName: latest.name,
    eventType: "SHAREHOLDING_CHANGE",
    title,
    severity,
    eventDate: latest.period_end_date,
    isRead: false,
    eventData,
  };
}

async function resolveAssetBySymbol(symbol: string) {
  return pgDb.queryOne<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string }>(
    `SELECT id, nse_symbol, bse_code, name
     FROM assets
     WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
     LIMIT 1`,
    [symbol.toUpperCase()],
  );
}

async function listFollowedAssets(userId: string): Promise<FollowedAssetRow[]> {
  return pgDb.queryAll<FollowedAssetRow>(
    `SELECT uf.asset_id,
            a.nse_symbol,
            a.bse_code,
            a.name,
            uf.alert_config
     FROM user_asset_follows uf
     JOIN assets a ON a.id = uf.asset_id
     WHERE uf.user_id = $1
     ORDER BY uf.updated_at DESC, a.name ASC`,
    [userId],
  );
}

async function getReadEventIds(userId: string, eventIds: string[]): Promise<Set<string>> {
  if (eventIds.length === 0) return new Set();
  const rows = await pgDb.queryAll<{ feed_event_id: string }>(
    `SELECT feed_event_id
     FROM user_feed_reads
     WHERE user_id = $1 AND feed_event_id = ANY($2::text[])`,
    [userId, eventIds],
  );
  return new Set(rows.map((row) => row.feed_event_id));
}

async function buildUserFeed(userId: string): Promise<FeedItem[]> {
  const follows = await listFollowedAssets(userId);
  if (follows.length === 0) return [];

  const assetIds = follows.map((row) => row.asset_id);
  const followsByAsset = new Map(follows.map((row) => [row.asset_id, normalizeAlertConfig(row.alert_config)]));
  const items: FeedItem[] = [];

  const [corpActions, quarterlies, shareholdingRows] = await Promise.all([
    pgDb.queryAll<CorpActionFeedRow>(
      `SELECT ca.id,
              ca.asset_id,
              ca.action_type,
              ca.ex_date,
              ca.record_date,
              ca.dividend_amount,
              ca.ratio_numerator,
              ca.ratio_denominator,
              ca.raw_announcement,
              a.nse_symbol,
              a.bse_code,
              a.name
       FROM corporate_actions ca
       JOIN assets a ON a.id = ca.asset_id
       WHERE ca.asset_id = ANY($1::text[])
         AND ca.ex_date >= $2
       ORDER BY ca.ex_date DESC
       LIMIT 200`,
      [assetIds, daysAgo(365)],
    ),
    tsDb.queryAll<QuarterlyFeedRow>(
      `WITH ranked AS (
         SELECT q.asset_id,
                q.period_end_date::text AS period_end_date,
                q.revenue_ops,
                q.net_profit,
                q.sales_growth_yoy,
                q.pat_growth_yoy,
                q.basic_eps,
                a.nse_symbol,
                a.bse_code,
                a.name,
                ROW_NUMBER() OVER (PARTITION BY q.asset_id ORDER BY q.period_end_date DESC) AS rn
         FROM src_msi_quarterly q
         JOIN assets a ON a.id = q.asset_id
         WHERE q.asset_id = ANY($1::text[])
       )
       SELECT asset_id, period_end_date, revenue_ops, net_profit, sales_growth_yoy, pat_growth_yoy, basic_eps, nse_symbol, bse_code, name
       FROM ranked
       WHERE rn = 1`,
      [assetIds],
    ),
    tsDb.queryAll<ShareholdingFeedRow>(
      `WITH ranked AS (
         SELECT sh.asset_id,
                sh.period_end_date::text AS period_end_date,
                sh.promoter_holding,
                sh.fii_holding,
                sh.dii_holding,
                sh.public_holding,
                sh.pledged_shares,
                a.nse_symbol,
                a.bse_code,
                a.name,
                ROW_NUMBER() OVER (PARTITION BY sh.asset_id ORDER BY sh.period_end_date DESC) AS rn
         FROM src_msi_shareholding sh
         JOIN assets a ON a.id = sh.asset_id
         WHERE sh.asset_id = ANY($1::text[])
       )
       SELECT asset_id, period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares, nse_symbol, bse_code, name
       FROM ranked
       WHERE rn <= 2
       ORDER BY asset_id, period_end_date DESC`,
      [assetIds],
    ),
  ]);

  for (const row of corpActions) {
    const alerts = followsByAsset.get(row.asset_id) ?? DEFAULT_ALERT_CONFIG;
    if (!alerts.price && !alerts.redFlags && !alerts.results && !alerts.shareholding && !alerts.concall) continue;
    items.push({
      id: `corp:${row.id}`,
      assetId: row.asset_id,
      nseSymbol: row.nse_symbol ?? undefined,
      bseCode: row.bse_code ?? undefined,
      stockName: row.name,
      eventType: "CORP_ACTION",
      title: buildCorpActionTitle(row),
      severity: row.action_type === "SUSPENSION" ? "WARNING" : "INFO",
      eventDate: row.ex_date,
      isRead: false,
      eventData: {
        actionType: row.action_type,
        ...(row.record_date ? { recordDate: row.record_date } : {}),
        ...(row.dividend_amount != null ? { dividendPerShare: row.dividend_amount } : {}),
      },
    });
  }

  for (const row of quarterlies) {
    const alerts = followsByAsset.get(row.asset_id) ?? DEFAULT_ALERT_CONFIG;
    if (!alerts.results) continue;
    items.push({
      id: `results:${row.asset_id}:${row.period_end_date}`,
      assetId: row.asset_id,
      nseSymbol: row.nse_symbol ?? undefined,
      bseCode: row.bse_code ?? undefined,
      stockName: row.name,
      eventType: "RESULT",
      title: buildQuarterlyTitle(row),
      severity: row.pat_growth_yoy != null && row.pat_growth_yoy < 0 ? "WARNING" : "INFO",
      eventDate: row.period_end_date,
      isRead: false,
      eventData: {
        ...(row.revenue_ops != null ? { revenueCr: row.revenue_ops } : {}),
        ...(row.net_profit != null ? { patCr: row.net_profit } : {}),
        ...(row.pat_growth_yoy != null ? { patGrowthYoy: row.pat_growth_yoy } : {}),
        ...(row.basic_eps != null ? { eps: row.basic_eps } : {}),
      },
    });
  }

  const shareholdingByAsset = new Map<string, ShareholdingFeedRow[]>();
  for (const row of shareholdingRows) {
    const group = shareholdingByAsset.get(row.asset_id) ?? [];
    group.push(row);
    shareholdingByAsset.set(row.asset_id, group);
  }
  for (const [assetId, rows] of shareholdingByAsset.entries()) {
    const alerts = followsByAsset.get(assetId) ?? DEFAULT_ALERT_CONFIG;
    if (!alerts.shareholding && !alerts.redFlags) continue;
    const item = buildShareholdingDeltaEvent(rows);
    if (item) items.push(item);
  }

  items.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  const readIds = await getReadEventIds(userId, items.map((item) => item.id));
  return items.map((item) => ({
    ...item,
    isRead: readIds.has(item.id),
  }));
}

export function createPgAdapter() {
  return {
    stocks: {
      async search(query: string, limit = 10): Promise<StockSummary[]> {
        const q = `%${query.toLowerCase()}%`;
        const rows = await pgDb.queryAll<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string; sector: string | null; industry_group: string | null; industry: string | null; sub_industry: string | null; isin: string | null }>(
          `SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin
           FROM assets
           WHERE is_active = 1
             AND (LOWER(nse_symbol) LIKE $1 OR LOWER(name) LIKE $1 OR bse_code LIKE $1)
           ORDER BY CASE
             WHEN LOWER(nse_symbol) = LOWER($2) THEN 0
             WHEN LOWER(nse_symbol) LIKE LOWER($2)||'%' THEN 1
             ELSE 2
           END, name
           LIMIT $3`,
          [q, query, limit * 2],
        );
        const seen = new Set<string>();
        const results: StockSummary[] = [];
        for (const r of rows) {
          const symbol = r.nse_symbol ?? r.bse_code ?? "";
          if (!symbol || seen.has(symbol)) continue;
          seen.add(symbol);
          results.push({
            id: r.id as unknown as number,
            symbol,
            name: r.name,
            exchange: r.nse_symbol ? "NSE" : "BSE",
            sector: r.sector ?? undefined,
            industryGroup: r.industry_group ?? undefined,
            industry: r.industry ?? undefined,
            subIndustry: r.sub_industry ?? undefined,
            isin: r.isin ?? undefined,
            assetClass: "EQUITY",
          });
          if (results.length >= limit) break;
        }
        return results;
      },
      async getById(id: number): Promise<StockSummary | null> {
        const r = await pgDb.queryOne<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string; sector: string | null }>(
          `SELECT id, nse_symbol, bse_code, name, sector FROM assets WHERE id = $1`,
          [String(id)],
        );
        if (!r) return null;
        return { id: r.id as unknown as number, symbol: r.nse_symbol ?? r.bse_code ?? "", name: r.name, sector: r.sector ?? undefined, assetClass: "EQUITY" };
      },
      async getBySymbol(symbol: string): Promise<StockSummary | null> {
        const r = await pgDb.queryOne<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string; sector: string | null; industry_group: string | null; industry: string | null; sub_industry: string | null; isin: string | null; nse_listed: number; msi_sector: string | null; msi_industry_group: string | null }>(
          `SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,
          [symbol.toUpperCase()],
        );
        if (!r) return null;
        return {
          id: r.id as unknown as number,
          symbol: r.nse_symbol ?? r.bse_code ?? symbol,
          name: r.name,
          exchange: r.nse_listed ? "NSE" : "BSE",
          sector: r.sector ?? r.msi_sector ?? undefined,
          industryGroup: r.industry_group ?? undefined,
          industry: r.industry ?? r.msi_industry_group ?? undefined,
          subIndustry: r.sub_industry ?? undefined,
          isin: r.isin ?? undefined,
          assetClass: "EQUITY",
        };
      },
      async getDetail(symbol: string): Promise<StockDetail | null> {
        const asset = await pgDb.queryOne<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string; sector: string | null; industry_group: string | null; industry: string | null; sub_industry: string | null; isin: string | null; nse_listed: number; msi_sector: string | null; msi_industry_group: string | null; listing_date: string | null; face_value: number | null }>(
          `SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group, listing_date, face_value
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,
          [symbol.toUpperCase()],
        );
        if (!asset) return null;
        const [lp, range, cr, vol] = await Promise.all([
          tsDb.queryOne<{ close: number; date: string; prev_close: number | null }>(
            `SELECT close, date, LAG(close) OVER (ORDER BY date) AS prev_close
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`,
            [asset.id],
          ),
          tsDb.queryOne<{ high52w: number; low52w: number }>(
            `SELECT MAX(high) AS high52w, MIN(low) AS low52w
             FROM daily_prices
             WHERE asset_id = $1 AND date >= $2 AND source_exchange IN ('NSE','BSE')`,
            [asset.id, daysAgo(365)],
          ),
          pgDb.queryOne<{ market_cap_cr: number | null; pe_ttm: number | null; pb: number | null; dividend_yield: number | null; roe: number | null; roce: number | null; debt_equity: number | null }>(
            `SELECT market_cap_cr, pe_ttm, pb, dividend_yield, roe, roce, debt_equity
             FROM computed_ratios
             WHERE asset_id = $1`,
            [asset.id],
          ),
          tsDb.queryOne<{ volume: number }>(
            `SELECT volume
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`,
            [asset.id],
          ),
        ]);
        const price = lp?.close ?? 0;
        const pctChange1d = lp?.prev_close && lp.prev_close > 0 ? +((price / lp.prev_close - 1) * 100).toFixed(2) : 0;
        return {
          id: asset.id as unknown as number,
          symbol: asset.nse_symbol ?? asset.bse_code ?? symbol,
          nseSymbol: asset.nse_symbol ?? undefined,
          bseCode: asset.bse_code ?? undefined,
          name: asset.name,
          exchange: asset.nse_listed ? "NSE" : "BSE",
          sector: asset.sector ?? asset.msi_sector ?? undefined,
          industryGroup: asset.industry_group ?? undefined,
          industry: asset.industry ?? asset.msi_industry_group ?? undefined,
          subIndustry: asset.sub_industry ?? undefined,
          isin: asset.isin ?? undefined,
          assetClass: "EQUITY",
          price,
          priceDate: lp?.date ?? undefined,
          pctChange1d,
          high52w: range?.high52w ?? undefined,
          low52w: range?.low52w ?? undefined,
          marketCapCr: cr?.market_cap_cr ?? undefined,
          pe: cr?.pe_ttm ?? undefined,
          pb: cr?.pb ?? undefined,
          dividendYield: cr?.dividend_yield ?? undefined,
          roe: cr?.roe ?? undefined,
          roce: cr?.roce ?? undefined,
          debtEquity: cr?.debt_equity ?? undefined,
          volume: vol?.volume ?? undefined,
          faceValue: asset.face_value ?? 1,
          listedDate: asset.listing_date ?? undefined,
        };
      },
      async getPeers(symbol: string): Promise<PeerComparison[]> {
        const asset = await pgDb.queryOne<{ id: string; sector: string | null; screener_industry_code: string | null; msi_sector: string | null }>(
          `SELECT id, sector, screener_industry_code, msi_sector
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,
          [symbol.toUpperCase()],
        );
        if (!asset) return [];
        const field = asset.screener_industry_code ? "screener_industry_code" : asset.sector ? "sector" : "msi_sector";
        const val = asset.screener_industry_code ?? asset.sector ?? asset.msi_sector;
        if (!val) return [];
        const peers = await pgDb.queryAll<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string }>(
          `SELECT id, nse_symbol, bse_code, name
           FROM assets
           WHERE ${field} = $1 AND id != $2 AND is_active = 1
           ORDER BY CASE WHEN nse_symbol IS NOT NULL THEN 0 ELSE 1 END, name
           LIMIT 12`,
          [val, asset.id],
        );
        const results = await Promise.all(peers.map(async (p) => {
          const [lp, cr] = await Promise.all([
            tsDb.queryOne<{ close: number; date: string }>(
              `SELECT close, date
               FROM daily_prices
               WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
               ORDER BY date DESC
               LIMIT 1`,
              [p.id],
            ),
            pgDb.queryOne<{ market_cap_cr: number | null; pe_ttm: number | null; pb: number | null; ev_ebitda: number | null; roce: number | null; roe: number | null; debt_equity: number | null; pat_margin: number | null; operating_margin: number | null; revenue_growth_1y: number | null; pat_growth_1y: number | null; dividend_yield: number | null }>(
              `SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield
               FROM computed_ratios
               WHERE asset_id = $1`,
              [p.id],
            ),
          ]);
          if (!lp || lp.close <= 0) return null;
          return {
            symbol: p.nse_symbol ?? p.bse_code ?? "",
            nseSymbol: p.nse_symbol ?? undefined,
            name: p.name,
            marketCapCr: cr?.market_cap_cr ?? null,
            peTtm: cr?.pe_ttm ?? null,
            pb: cr?.pb ?? null,
            evEbitda: cr?.ev_ebitda ?? null,
            roce: cr?.roce ?? null,
            roe: cr?.roe ?? null,
            debtEquity: cr?.debt_equity ?? null,
            patMargin: cr?.pat_margin ?? null,
            operatingMargin: cr?.operating_margin ?? null,
            price: lp.close,
            revenueGrowth1y: cr?.revenue_growth_1y ?? null,
            patGrowth1y: cr?.pat_growth_1y ?? null,
            dividendYield: cr?.dividend_yield ?? null,
          } as PeerComparison;
        }));
        return results.filter((p): p is PeerComparison => p !== null);
      },
    },

    prices: {
      async getPrices(assetId: number, opts?: { startDate?: string; endDate?: string; range?: string }): Promise<PriceBar[]> {
        let startDate = opts?.startDate ?? "2000-01-01";
        const endDate = opts?.endDate ?? new Date().toISOString().split("T")[0];
        if (!opts?.startDate && opts?.range) {
          const map: Record<string, number> = { "1W": 7, "1M": 30, "3M": 90, "6M": 180, "1Y": 365, "3Y": 1095, "5Y": 1825, "10Y": 3650, "MAX": 12000 };
          startDate = daysAgo(map[opts.range.toUpperCase()] ?? 365);
        }
        const rows = await tsDb.queryAll<{ date: string; open: number; high: number; low: number; close: number; volume: number; source_exchange: string }>(
          `SELECT date, open, high, low, close, volume, source_exchange
           FROM daily_prices
           WHERE asset_id = $1 AND date >= $2 AND date <= $3
           ORDER BY date ASC`,
          [String(assetId), startDate, endDate],
        );
        const byDate = new Map<string, typeof rows[0]>();
        for (const r of rows) {
          const dKey = typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10);
          const existing = byDate.get(dKey);
          if (!existing || r.source_exchange === "NSE") byDate.set(dKey, r);
        }
        return [...byDate.values()].map((r) => ({
          date: typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10),
          open: r.open,
          high: r.high,
          low: r.low,
          close: r.close,
          volume: r.volume,
        }));
      },
    },

    company: {
      async getProfile(assetId: string): Promise<CompanyProfile> {
        const r = await pgDb.queryOne<{ name: string; description: string | null; website_url: string | null; listing_date: string | null; management_json: string | null; nse_symbol: string | null }>(
          `SELECT name, description, website_url, listing_date, management_json, nse_symbol
           FROM assets
           WHERE id = $1`,
          [assetId],
        );
        let mgmt: { md?: string; chairman?: string } = {};
        if (r?.management_json) {
          try {
            mgmt = JSON.parse(r.management_json);
          } catch {
            mgmt = {};
          }
        }
        return {
          description: r?.description ?? `${r?.name ?? "Company"} is a listed Indian company.`,
          descriptionShort: r?.description ?? `${r?.name ?? "Company"} is a listed Indian company.`,
          founded: r?.listing_date?.slice(0, 4) ?? "N/A",
          foundedYear: r?.listing_date ? Number(r.listing_date.slice(0, 4)) : null,
          website: r?.website_url ?? `https://www.${(r?.nse_symbol ?? "company").toLowerCase()}.com`,
          md: mgmt.md ?? "N/A",
          chairman: mgmt.chairman ?? "N/A",
          indexMemberships: [],
        };
      },
      async getCorporateActions(assetId: string, limit = 20): Promise<CorporateAction[]> {
        const rows = await pgDb.queryAll<{ id: string; action_type: string; ex_date: string; record_date: string | null; dividend_amount: number | null }>(
          `SELECT id, action_type, ex_date, record_date, dividend_amount
           FROM corporate_actions
           WHERE asset_id = $1
           ORDER BY ex_date DESC
           LIMIT $2`,
          [assetId, limit],
        );
        return rows.map((r) => ({
          id: 0,
          actionType: r.action_type,
          exDate: r.ex_date,
          recordDate: r.record_date ?? undefined,
          dividendAmount: r.dividend_amount ?? undefined,
        }));
      },
      async getEvents(_assetId: string, _limit = 10): Promise<CompanyEvent[]> {
        return [];
      },
      async getDocuments(_assetId: string, _docType?: string): Promise<CompanyDocument[]> {
        return [];
      },
      async getFinancials(assetId: string, opts?: { consolidated?: boolean }) {
        const cons = opts?.consolidated ?? true;
        const qT = cons ? "src_msi_quarterly" : "src_msi_quarterly_standalone";
        const bsT = cons ? "src_msi_balance_sheet" : "src_msi_balance_sheet_standalone";
        const cfT = cons ? "src_msi_cashflow" : "src_msi_cashflow_standalone";
        const [msiQ, msiBS, msiCF, msiR, scrQ] = await Promise.all([
          tsDb.queryAll<{ period_end_date: string; revenue_ops: number | null; operating_profit: number | null; finance_costs: number | null; depreciation: number | null; profit_before_tax: number | null; net_profit: number | null; basic_eps: number | null }>(
            `SELECT period_end_date, revenue_ops, operating_profit, finance_costs, depreciation, profit_before_tax, net_profit, basic_eps
             FROM ${qT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`,
            [assetId],
          ),
          tsDb.queryAll<{ period_end_date: string; equity_capital: number | null; reserves: number | null; long_term_borrowings: number | null; short_term_borrowings: number | null; total_assets: number | null; cash_equivalents: number | null; fixed_assets: number | null; investments: number | null }>(
            `SELECT period_end_date, equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets, cash_equivalents, fixed_assets, investments
             FROM ${bsT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`,
            [assetId],
          ),
          tsDb.queryAll<{ period_end_date: string; net_cash_operating: number | null; net_cash_investing: number | null; net_cash_financing: number | null; capex: number | null }>(
            `SELECT period_end_date, net_cash_operating, net_cash_investing, net_cash_financing, capex
             FROM ${cfT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`,
            [assetId],
          ),
          tsDb.queryAll<{ period_end_date: string; roce: number | null; net_profit_margin: number | null; ebit_margin: number | null; debtor_days: number | null }>(
            `SELECT period_end_date, roce, net_profit_margin, ebit_margin, debtor_days
             FROM src_msi_ratios
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 12`,
            [assetId],
          ),
          tsDb.queryAll<{ period_end_date: string; sales: number | null; operating_profit: number | null; pbt: number | null; net_profit: number | null; eps: number | null }>(
            `SELECT period_end_date, sales, operating_profit, pbt, net_profit, eps
             FROM src_screener_quarterly
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`,
            [assetId],
          ),
        ]);
        const quarterly: QuarterlyResult[] = msiQ.length > 0
          ? msiQ.map((r) => ({ periodEnd: r.period_end_date, revenue: r.revenue_ops ?? null, operatingProfit: r.operating_profit ?? null, interest: r.finance_costs ?? null, depreciation: r.depreciation ?? null, pbt: r.profit_before_tax ?? null, netProfit: r.net_profit ?? null, pat: r.net_profit ?? null, eps: r.basic_eps ?? null }))
          : scrQ.map((r) => ({ periodEnd: r.period_end_date, revenue: r.sales ?? null, operatingProfit: r.operating_profit ?? null, pbt: r.pbt ?? null, netProfit: r.net_profit ?? null, pat: r.net_profit ?? null, eps: r.eps ?? null }));
        const balanceSheet: BalanceSheet[] = msiBS.map((r) => {
          const eq = (r.equity_capital ?? 0) + (r.reserves ?? 0);
          const debt = (r.long_term_borrowings ?? 0) + (r.short_term_borrowings ?? 0);
          return {
            periodEnd: r.period_end_date,
            totalEquity: eq || null,
            totalDebt: debt || null,
            totalAssets: r.total_assets ?? null,
            cash: r.cash_equivalents ?? null,
            cashEquivalents: r.cash_equivalents ?? null,
            fixedAssets: r.fixed_assets ?? null,
            investments: r.investments ?? null,
            bookValue: eq || null,
          };
        });
        const cashFlow: CashFlow[] = msiCF.map((r) => ({
          periodEnd: r.period_end_date,
          operatingCf: r.net_cash_operating ?? undefined,
          investingCf: r.net_cash_investing ?? undefined,
          financingCf: r.net_cash_financing ?? undefined,
          capex: r.capex ?? undefined,
        }));
        const ratios = msiR.map((r) => ({
          periodEndDate: r.period_end_date,
          debtorDays: r.debtor_days ?? null,
          inventoryDays: null,
          daysPayable: null,
          roce: r.roce ?? null,
          operatingMargin: r.ebit_margin ?? null,
          patMargin: r.net_profit_margin ?? null,
        }));
        return { quarterly, annual: buildAnnual(quarterly), balanceSheet, cashFlow, ratios, anomalies: [] as AnomalyFlag[] };
      },
      async getOwnership(assetId: string): Promise<{ shareholding: ShareholdingPattern[]; governance: GovernanceScore }> {
        const rows = await tsDb.queryAll<{ period_end_date: string; promoter_holding: number | null; fii_holding: number | null; dii_holding: number | null; public_holding: number | null; pledged_shares: number | null }>(
          `SELECT period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares
           FROM src_msi_shareholding
           WHERE asset_id = $1
           ORDER BY period_end_date DESC
           LIMIT 8`,
          [assetId],
        );
        return {
          shareholding: rows.map((r) => ({
            quarterEnd: r.period_end_date,
            promoterPct: r.promoter_holding ?? undefined,
            fiiPct: r.fii_holding ?? undefined,
            diiPct: r.dii_holding ?? undefined,
            publicPct: r.public_holding ?? undefined,
            pledgedPct: r.pledged_shares ?? undefined,
          })),
          governance: { overall: null },
        };
      },
      async getAnalytics(assetId: string) {
        const [lp, cr, msi] = await Promise.all([
          tsDb.queryOne<{ close: number }>(
            `SELECT close FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1`,
            [assetId],
          ),
          pgDb.queryOne<{ market_cap_cr: number | null; pe_ttm: number | null; pb: number | null; ev_ebitda: number | null; roce: number | null; roe: number | null; debt_equity: number | null; pat_margin: number | null; operating_margin: number | null; revenue_growth_1y: number | null; pat_growth_1y: number | null; dividend_yield: number | null; quality_score: number | null }>(
            `SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield, quality_score
             FROM computed_ratios
             WHERE asset_id = $1`,
            [assetId],
          ),
          pgDb.queryOne<{ composite_rating: number | null; pct_from_high: number | null }>(
            `SELECT composite_rating, pct_from_high FROM msi_company_data WHERE asset_id = $1`,
            [assetId],
          ),
        ]);
        const price = lp?.close ?? 0;
        return {
          factorExposure: null as FactorExposure | null,
          factorContext: { releaseTag: "", latestSnapshots: [], drawdowns: [] } as FactorContext,
          earningsQuality: { overallScore: msi?.composite_rating ?? null, cfoPatRatio: null, flags: [] } as EarningsQuality,
          ratioHistory: [] as Partial<ComputedRatios>[],
          ratios: {
            peTtm: cr?.pe_ttm ?? undefined,
            pb: cr?.pb ?? undefined,
            evEbitda: cr?.ev_ebitda ?? undefined,
            marketCapCr: cr?.market_cap_cr ?? undefined,
            price,
            pctFrom52wHigh: msi?.pct_from_high ?? undefined,
            roe: cr?.roe ?? undefined,
            roce: cr?.roce ?? undefined,
            debtEquity: cr?.debt_equity ?? undefined,
            dividendYield: cr?.dividend_yield ?? undefined,
            patMargin: cr?.pat_margin ?? undefined,
            operatingMargin: cr?.operating_margin ?? undefined,
            revenueGrowth1y: cr?.revenue_growth_1y ?? undefined,
            patGrowth1y: cr?.pat_growth_1y ?? undefined,
            qualityScore: cr?.quality_score ?? undefined,
          } as ComputedRatios,
        };
      },
    },

    follow: {
      async getStatus(userId: string, symbol: string) {
        const asset = await resolveAssetBySymbol(symbol);
        if (!asset) return { isFollowing: false, followerCount: 0, alertConfig: normalizeAlertConfig() };
        const [followRow, countRow] = await Promise.all([
          pgDb.queryOne<{ alert_config: Record<string, boolean> | null }>(
            `SELECT alert_config FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2`,
            [userId, asset.id],
          ),
          pgDb.queryOne<{ follower_count: string | number }>(
            `SELECT COUNT(*) AS follower_count FROM user_asset_follows WHERE asset_id = $1`,
            [asset.id],
          ),
        ]);
        return {
          isFollowing: Boolean(followRow),
          followerCount: Number(countRow?.follower_count ?? 0),
          alertConfig: normalizeAlertConfig(followRow?.alert_config),
        };
      },
      async follow(userId: string, symbol: string, alertConfig?: Record<string, boolean>) {
        const asset = await resolveAssetBySymbol(symbol);
        if (!asset) throw new Error(`Unknown asset: ${symbol}`);
        const normalized = normalizeAlertConfig(alertConfig);
        await pgDb.queryOne(
          `INSERT INTO user_asset_follows (user_id, asset_id, alert_config)
           VALUES ($1, $2, $3::jsonb)
           ON CONFLICT (user_id, asset_id) DO UPDATE SET
             alert_config = EXCLUDED.alert_config,
             updated_at = NOW()
           RETURNING asset_id`,
          [userId, asset.id, JSON.stringify(normalized)],
        );
      },
      async unfollow(userId: string, symbol: string) {
        const asset = await resolveAssetBySymbol(symbol);
        if (!asset) return;
        await pgDb.queryOne(
          `DELETE FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2 RETURNING asset_id`,
          [userId, asset.id],
        );
      },
    },

    feed: {
      async getUserFeed(userId: string, limit = 50, offset = 0): Promise<FeedItem[]> {
        const feed = await buildUserFeed(userId);
        return feed.slice(offset, offset + limit);
      },
      async getUnreadCount(userId: string): Promise<number> {
        const feed = await buildUserFeed(userId);
        return feed.filter((item) => !item.isRead).length;
      },
      async markAsRead(userId: string, eventIds: string[]): Promise<void> {
        const uniqueIds = [...new Set(eventIds.filter(Boolean))];
        for (const eventId of uniqueIds) {
          await pgDb.queryOne(
            `INSERT INTO user_feed_reads (user_id, feed_event_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, feed_event_id) DO NOTHING
             RETURNING feed_event_id`,
            [userId, eventId],
          );
        }
      },
    },
  };
}
