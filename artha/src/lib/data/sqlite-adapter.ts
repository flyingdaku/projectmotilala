/**
 * SQLite Data Adapter
 * -------------------
 * Reads from the market_data.db SQLite database and implements the
 * same DataAdapter interface as the old mock, so all API routes are
 * unchanged.
 *
 * Data priority:
 *   Prices           → daily_prices (NSE preferred, BSE fallback)
 *   Fundamentals     → MSI (msi_*) preferred, Screener fallback
 *   Shareholding     → msi_shareholding preferred, screener_shareholding fallback
 *   Corporate Actions→ corporate_actions (BSE source)
 *   Peers            → same screener 4-level sub_industry code, ranked by market cap
 */

import { getDb } from "./db";
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
    EarningsQuality,
    ComputedRatios,
    PeerComparison,
    FeedItem,
} from "./types";
import type { StockDetail } from "./index";

// ── Helper: compute quarter label from ISO date ───────────────────────────────

function periodToQuarter(dateStr: string): string {
    if (!dateStr) return "";
    // MSI uses "Sep-25" format already; Screener returns "2025-09-30"
    if (dateStr.includes("-") && dateStr.length <= 6) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const month = d.getMonth(); // 0-indexed
    const year = String(d.getFullYear()).slice(2);
    // Indian fiscal quarters end: Jun, Sep, Dec, Mar
    const qMap: Record<number, string> = { 5: "Jun", 8: "Sep", 11: "Dec", 2: "Mar" };
    const label = qMap[month] ?? d.toLocaleString("en-IN", { month: "short" });
    return `${label}-${year}`;
}

function periodToFY(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    // Indian FY: Apr 1 to Mar 31; year ending Mar 31 2025 → FY25
    const y = d.getMonth() < 3 ? d.getFullYear() : d.getFullYear() + 1;
    return `FY${String(y).slice(2)}`;
}

// ── Lookup asset_id by symbol ─────────────────────────────────────────────────

function resolveAssetId(symbol: string): string | null {
    const db = getDb();
    const row = db.queryOne<{ id: string }>(
        `SELECT id FROM assets
     WHERE (nse_symbol = ? OR bse_code = ?) AND is_active = 1
     LIMIT 1`,
        [symbol, symbol]
    );
    return row?.id ?? null;
}

function resolveAsset(symbol: string) {
    const db = getDb();
    return db.queryOne<{
        id: string; nse_symbol: string | null; bse_code: string | null;
        isin: string | null; name: string; sector: string | null;
        industry_group: string | null; industry: string | null;
        sub_industry: string | null; screener_sector_code: string | null;
        screener_industry_code: string | null; screener_sub_industry_code: string | null;
        msi_sector: string | null; msi_industry_group: string | null;
        msi_group_rank: number | null; listing_date: string | null;
        nse_listed: number; bse_listed: number; is_active: number;
        website_url: string | null; face_value: number | null;
        management_json: string | null; description: string | null;
    }>(
        `SELECT id, nse_symbol, bse_code, isin, name, sector, industry_group,
            industry, sub_industry, screener_sector_code, screener_industry_code,
            screener_sub_industry_code, msi_sector, msi_industry_group, msi_group_rank,
            listing_date, nse_listed, bse_listed, is_active,
            website_url, face_value, management_json, description
     FROM assets
     WHERE (nse_symbol = ? OR bse_code = ?) AND is_active = 1
     LIMIT 1`,
        [symbol, symbol]
    );
}

// ── Latest close price for a known asset_id ───────────────────────────────────

function getLatestPrice(assetId: string): { close: number; date: string; pct_change: number } | null {
    const db = getDb();
    // Get last 2 prices to compute 1d change
    const rows = db.queryAll<{ close: number; date: string; open: number }>(
        `SELECT close, open, date FROM daily_prices
     WHERE asset_id = ? AND source_exchange IN ('NSE','BSE')
     ORDER BY date DESC, source_exchange ASC
     LIMIT 2`,
        [assetId]
    );
    if (!rows.length) return null;
    const latest = rows[0];
    const prev = rows[1];
    const pct_change = prev
        ? +((((latest.close - prev.close) / prev.close) * 100).toFixed(2))
        : 0;
    return { close: latest.close, date: latest.date, pct_change };
}

// ── Market cap approximation: close * shares_outstanding ─────────────────────
// shares_outstanding = equity_capital (₹ Cr) * 1e7 / face_value
// MSI balance sheet equity_capital is in INR Cr.

function estimateMarketCap(assetId: string, price: number, faceValue: number | null): number | null {
    const db = getDb();
    const bs = db.queryOne<{ equity_capital: number }>(
        `SELECT equity_capital FROM msi_balance_sheets
     WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
        [assetId]
    );
    if (!bs?.equity_capital || !faceValue) return null;
    // equity_capital in ₹ Cr → shares = (cr * 1e7) / face_value
    const shares = (bs.equity_capital * 1e7) / faceValue;
    return +((shares * price) / 1e7).toFixed(2); // result in ₹ Cr
}

// ── 52-week high / low ────────────────────────────────────────────────────────

function get52wRange(assetId: string) {
    const db = getDb();
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    const from = cutoff.toISOString().split("T")[0];
    const row = db.queryOne<{ high52w: number; low52w: number }>(
        `SELECT MAX(high) as high52w, MIN(low) as low52w FROM daily_prices
     WHERE asset_id = ? AND date >= ? AND source_exchange IN ('NSE','BSE')`,
        [assetId, from]
    );
    return row ?? { high52w: null, low52w: null };
}

// ── TTM ratios from MSI fundamentals ─────────────────────────────────────────

function getMsiRatios(assetId: string) {
    const db = getDb();
    // Last 4 quarters for TTM calculations
    const rows = db.queryAll<{
        period_end_date: string;
        net_profit: number | null;
        basic_eps: number | null;
        revenue_ops: number | null;
        total_revenue: number | null;
        profit_before_tax: number | null;
        finance_costs: number | null;
    }>(
        `SELECT period_end_date, net_profit, basic_eps, revenue_ops, total_revenue,
            profit_before_tax, finance_costs
     FROM msi_fundamentals_quarterly WHERE asset_id = ?
     ORDER BY period_end_date DESC LIMIT 4`,
        [assetId]
    );

    const bs = db.queryOne<{
        equity_capital: number | null;
        reserves: number | null;
        long_term_borrowings: number | null;
        short_term_borrowings: number | null;
        total_assets: number | null;
    }>(
        `SELECT equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets
     FROM msi_balance_sheets WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
        [assetId]
    );

    if (!rows.length) return null;

    const ttmPat = rows.reduce((s, r) => s + (r.net_profit ?? 0), 0);
    const ttmEps = rows.reduce((s, r) => s + (r.basic_eps ?? 0), 0);
    const ttmRev = rows.reduce((s, r) => s + (r.revenue_ops ?? r.total_revenue ?? 0), 0);

    const equity = bs ? (bs.equity_capital ?? 0) + (bs.reserves ?? 0) : null;
    const debt = bs ? (bs.long_term_borrowings ?? 0) + (bs.short_term_borrowings ?? 0) : null;

    return { ttmPat, ttmEps, ttmRev, equity, debt, totalAssets: bs?.total_assets };
}

// ─────────────────────────────────────────────────────────────────────────────
// ── ADAPTER ──────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const readStatus = new Map<string, boolean>();

export function createSqliteAdapter() {
    return {
        stocks: {
            async search(query: string, limit = 10): Promise<StockSummary[]> {
                const db = getDb();
                const q = `%${query.toLowerCase()}%`;
                const rows = db.queryAll<{
                    id: string; nse_symbol: string | null; bse_code: string | null;
                    name: string; sector: string | null; industry: string | null;
                    isin: string | null;
                }>(
                    `SELECT id, nse_symbol, bse_code, name, sector, industry, isin
           FROM assets WHERE is_active = 1 AND (
             LOWER(nse_symbol) LIKE ? OR LOWER(name) LIKE ? OR bse_code LIKE ?
           ) ORDER BY
             CASE WHEN LOWER(nse_symbol) = LOWER(?) THEN 0
                  WHEN LOWER(nse_symbol) LIKE LOWER(?) || '%' THEN 1
                  ELSE 2 END, name LIMIT ?`,
                    [q, q, q, query, query, limit * 2] // Get extra for deduplication
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
                        industry: r.industry ?? undefined,
                        isin: r.isin ?? undefined,
                        assetClass: "EQUITY",
                    });

                    if (results.length >= limit) break;
                }

                return results;
            },

            async getById(id: number): Promise<StockSummary | null> {
                const db = getDb();
                const r = db.queryOne<{ id: string; nse_symbol: string | null; bse_code: string | null; name: string; sector: string | null }>(
                    `SELECT id, nse_symbol, bse_code, name, sector FROM assets WHERE id = ?`,
                    [String(id)]
                );
                if (!r) return null;
                return {
                    id: r.id as unknown as number,
                    symbol: r.nse_symbol ?? r.bse_code ?? "",
                    name: r.name,
                    sector: r.sector ?? undefined,
                    assetClass: "EQUITY",
                };
            },

            async getBySymbol(symbol: string): Promise<StockSummary | null> {
                const asset = resolveAsset(symbol);
                if (!asset) return null;
                return {
                    id: asset.id as unknown as number,
                    symbol: asset.nse_symbol ?? asset.bse_code ?? symbol,
                    name: asset.name,
                    exchange: asset.nse_listed ? "NSE" : "BSE",
                    sector: asset.sector ?? asset.msi_sector ?? undefined,
                    industry: asset.industry ?? asset.msi_industry_group ?? undefined,
                    isin: asset.isin ?? undefined,
                    assetClass: "EQUITY",
                };
            },

            async getDetail(symbol: string): Promise<StockDetail | null> {
                const asset = resolveAsset(symbol);
                if (!asset) return null;

                const latestPrice = getLatestPrice(asset.id);
                const range = get52wRange(asset.id);
                const msiRatios = getMsiRatios(asset.id);
                const fv = asset.face_value ?? 1;
                const price = latestPrice?.close ?? 0;
                const marketCapCr = price > 0 ? estimateMarketCap(asset.id, price, fv) : null;

                // PE (TTM)
                const pe = msiRatios?.ttmEps && msiRatios.ttmEps > 0
                    ? +(price / msiRatios.ttmEps).toFixed(1) : null;

                // Book value per share (equity_capital + reserves) / shares
                const equity = msiRatios?.equity;
                const shares = fv && msiRatios
                    ? (await getShares(asset.id, fv))
                    : null;
                const bookValuePerShare = equity && shares && shares > 0
                    ? +((equity * 1e7) / shares).toFixed(2) : null;
                const pb = bookValuePerShare && price > 0
                    ? +(price / bookValuePerShare).toFixed(2) : null;

                // Dividend yield from latest corporate action
                const db = getDb();
                const lastDiv = db.queryOne<{ dividend_amount: number; ex_date: string }>(
                    `SELECT dividend_amount, ex_date FROM corporate_actions
           WHERE asset_id = ? AND action_type LIKE '%DIVIDEND%'
           ORDER BY ex_date DESC LIMIT 1`,
                    [asset.id]
                );
                const divYield = lastDiv?.dividend_amount && price > 0
                    ? +((lastDiv.dividend_amount / price) * 100).toFixed(2) : null;

                const debt = msiRatios?.debt ?? null;
                const debtEquity = equity && debt && equity > 0
                    ? +(debt / equity).toFixed(2) : null;

                // Recent volume from daily prices
                const volRow = db.queryOne<{ volume: number; avg_volume: number }>(
                    `SELECT p.volume,
                  (SELECT AVG(p2.volume) FROM daily_prices p2
                   WHERE p2.asset_id = p.asset_id AND p2.date >= date('now','-30 days')
                   AND p2.source_exchange = p.source_exchange) as avg_volume
           FROM daily_prices p
           WHERE p.asset_id = ? AND p.source_exchange IN ('NSE','BSE')
           ORDER BY p.date DESC LIMIT 1`,
                    [asset.id]
                );

                return {
                    id: asset.id as unknown as number,
                    symbol: asset.nse_symbol ?? asset.bse_code ?? symbol,
                    nseSymbol: asset.nse_symbol ?? undefined,
                    bseCode: asset.bse_code ?? undefined,
                    name: asset.name,
                    exchange: asset.nse_listed ? "NSE" : "BSE",
                    sector: asset.sector ?? asset.msi_sector ?? undefined,
                    industry: asset.industry ?? asset.msi_industry_group ?? undefined,
                    isin: asset.isin ?? undefined,
                    assetClass: "EQUITY",
                    price,
                    pctChange1d: latestPrice?.pct_change ?? 0,
                    high52w: (range.high52w as number) ?? undefined,
                    low52w: (range.low52w as number) ?? undefined,
                    marketCapCr: marketCapCr ?? undefined,
                    pe: pe ?? undefined,
                    pb: pb ?? undefined,
                    dividendYield: divYield ?? undefined,
                    debtEquity: debtEquity ?? undefined,
                    volume: volRow?.volume ?? undefined,
                    avgVolume: volRow?.avg_volume ? Math.round(volRow.avg_volume) : undefined,
                    faceValue: fv,
                    listedDate: asset.listing_date ?? undefined,
                };
            },

            async getPeers(symbol: string): Promise<PeerComparison[]> {
                const asset = resolveAsset(symbol);
                if (!asset) return [];

                const db = getDb();

                // Use the most specific classification level available (sub_industry > industry > industry_group > sector)
                const codeField = asset.screener_sub_industry_code
                    ? "screener_sub_industry_code"
                    : asset.screener_industry_code
                        ? "screener_industry_code"
                        : asset.sector
                            ? "sector"
                            : null;
                const codeVal = asset.screener_sub_industry_code
                    ?? asset.screener_industry_code
                    ?? asset.sector
                    ?? null;

                if (!codeField || !codeVal) return [];

                const peers = db.queryAll<{
                    id: string; nse_symbol: string | null; bse_code: string | null; name: string;
                    face_value: number | null;
                }>(
                    `SELECT id, nse_symbol, bse_code, name, face_value FROM assets
           WHERE ${codeField} = ? AND id != ? AND is_active = 1
           ORDER BY name LIMIT 20`,
                    [codeVal, asset.id]
                );

                const seen = new Set<string>();
                const filteredPeers = peers.filter(p => {
                    const sym = p.nse_symbol ?? p.bse_code ?? "";
                    if (!sym || seen.has(sym)) return false;
                    seen.add(sym);
                    return true;
                });

                return Promise.all(
                    filteredPeers.map(async (p) => {
                        const latestPrice = getLatestPrice(p.id);
                        const price = latestPrice?.close ?? 0;
                        const fv = p.face_value ?? 1;
                        const msiR = getMsiRatios(p.id);
                        const marketCapCr = price > 0 ? estimateMarketCap(p.id, price, fv) : null;
                        const pe = msiR?.ttmEps && msiR.ttmEps > 0
                            ? +(price / msiR.ttmEps).toFixed(1) : null;
                        // TTM revenue for growth calc (compare last 4 quarters vs prior 4)
                        const rev8 = db.queryAll<{ revenue_ops: number | null; total_revenue: number | null }>(
                            `SELECT revenue_ops, total_revenue FROM msi_fundamentals_quarterly
               WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
                            [p.id]
                        );
                        const revenueGrowth1y = rev8.length >= 8
                            ? +(((
                                rev8.slice(0, 4).reduce((s, r) => s + (r.revenue_ops ?? r.total_revenue ?? 0), 0) /
                                rev8.slice(4, 8).reduce((s, r) => s + (r.revenue_ops ?? r.total_revenue ?? 0), 0) - 1
                            ) * 100).toFixed(1))
                            : null;

                        return {
                            symbol: p.nse_symbol ?? p.bse_code ?? "",
                            nseSymbol: p.nse_symbol ?? undefined,
                            name: p.name,
                            marketCapCr: marketCapCr ?? undefined,
                            peTtm: pe ?? undefined,
                            price,
                            pctChange1d: latestPrice?.pct_change ?? undefined,
                            revenueGrowth1y: revenueGrowth1y ?? undefined,
                        } satisfies PeerComparison;
                    })
                );
            },
        },

        prices: {
            async getPrices(
                assetId: number,
                opts?: { startDate?: string; endDate?: string; range?: string }
            ): Promise<PriceBar[]> {
                const db = getDb();
                let startDate = opts?.startDate;
                const endDate = opts?.endDate ?? new Date().toISOString().split("T")[0];
                if (!startDate && opts?.range) {
                    const rangeMap: Record<string, number> = {
                        "1W": 7, "1M": 30, "3M": 90, "6M": 180,
                        "1Y": 365, "3Y": 1095, "5Y": 1825, "10Y": 3650, "MAX": 12000,
                    };
                    const days = rangeMap[opts.range.toUpperCase()] ?? 365;
                    const d = new Date();
                    d.setDate(d.getDate() - days);
                    startDate = d.toISOString().split("T")[0];
                }

                type PriceRow = { date: string; open: number; high: number; low: number; close: number; volume: number; source_exchange: string;[key: string]: unknown };
                const rows = db.queryAll<PriceRow>(
                    `SELECT date, open, high, low, close, volume, source_exchange
           FROM daily_prices
           WHERE asset_id = ? AND date >= ? AND date <= ?
           ORDER BY date ASC`,
                    [String(assetId), startDate ?? "2000-01-01", endDate]
                );

                // Deduplicate by date — prefer NSE, fallback BSE
                const byDate = new Map<string, PriceRow>();
                for (const r of rows) {
                    const existing = byDate.get(r.date);
                    if (!existing || r.source_exchange === "NSE") byDate.set(r.date, r);
                }
                return [...byDate.values()].map(r => ({
                    date: r.date, open: r.open, high: r.high,
                    low: r.low, close: r.close, volume: r.volume,
                }));
            },
        },

        company: {
            async getProfile(assetId: string): Promise<CompanyProfile> {
                const db = getDb();
                const asset = db.queryOne<{
                    name: string; sector: string | null; msi_sector: string | null;
                    industry_group: string | null; industry: string | null;
                    sub_industry: string | null; listing_date: string | null;
                    website_url: string | null; management_json: string | null;
                    description: string | null; is_active: number;
                }>(
                    `SELECT name, sector, msi_sector, industry_group, industry, sub_industry,
                  listing_date, website_url, management_json, description, is_active
           FROM assets WHERE id = ?`,
                    [assetId]
                );

                let management: { md?: string; chairman?: string } = {};
                if (asset?.management_json) {
                    try { management = JSON.parse(asset.management_json); } catch { /* noop */ }
                }

                // Index memberships placeholder — can be enriched later
                const indexMemberships: string[] = [];

                return {
                    description: asset?.description ?? undefined,
                    founded: asset?.listing_date?.slice(0, 4) ?? undefined,
                    website: asset?.website_url ?? undefined,
                    md: management.md ?? undefined,
                    chairman: management.chairman ?? undefined,
                    indexMemberships,
                };
            },

            async getCorporateActions(assetId: string, limit = 20): Promise<CorporateAction[]> {
                const db = getDb();
                const rows = db.queryAll<{
                    id: string;
                    action_type: string;
                    ex_date: string;
                    record_date: string | null;
                    dividend_amount: number | null;
                    ratio_numerator: number | null;
                    ratio_denominator: number | null;
                    raw_announcement: string | null;
                }>(
                    `SELECT id, action_type, ex_date, record_date, dividend_amount,
                  ratio_numerator, ratio_denominator, raw_announcement
           FROM corporate_actions
           WHERE asset_id = ?
           ORDER BY ex_date DESC LIMIT ?`,
                    [assetId, limit]
                );

                return rows.map((r, i) => {
                    const splitFactor =
                        r.ratio_denominator && r.ratio_denominator > 0 && r.action_type.includes("SPLIT")
                            ? r.ratio_numerator! / r.ratio_denominator
                            : undefined;
                    const bonusRatio =
                        r.action_type.includes("BONUS") && r.ratio_numerator && r.ratio_denominator
                            ? `${r.ratio_numerator}:${r.ratio_denominator}`
                            : undefined;
                    return {
                        id: i + 1,
                        actionType: r.action_type,
                        exDate: r.ex_date,
                        recordDate: r.record_date ?? undefined,
                        dividendAmount: r.dividend_amount ?? undefined,
                        splitFactor,
                        bonusRatio,
                        notes: undefined,
                    };
                });
            },

            async getEvents(assetId: string, limit = 10): Promise<CompanyEvent[]> {
                // Currently no dedicated events table. Return recent corporate actions as events.
                const db = getDb();
                const rows = db.queryAll<{
                    id: string; action_type: string; ex_date: string; dividend_amount: number | null;
                    ratio_numerator: number | null; ratio_denominator: number | null;
                    raw_announcement: string | null;
                }>(
                    `SELECT id, action_type, ex_date, dividend_amount, ratio_numerator,
                  ratio_denominator, raw_announcement
           FROM corporate_actions WHERE asset_id = ? ORDER BY ex_date DESC LIMIT ?`,
                    [assetId, limit]
                );

                return rows.map((r) => {
                    let title = r.action_type;
                    if (r.dividend_amount) title = `Dividend ₹${r.dividend_amount}/share`;
                    else if (r.ratio_numerator && r.ratio_denominator) {
                        title = `${r.action_type}: ${r.ratio_numerator}:${r.ratio_denominator}`;
                    }
                    return {
                        id: r.id,
                        eventType: "CORP_ACTION",
                        title,
                        eventDate: r.ex_date,
                        severity: "INFO" as const,
                    };
                });
            },

            async getDocuments(_assetId: string, _docType?: string): Promise<CompanyDocument[]> {
                // No document pipeline yet — return empty
                return [];
            },

            async getFinancials(assetId: string): Promise<{
                quarterly: QuarterlyResult[];
                balanceSheet: BalanceSheet[];
                cashFlow: CashFlow[];
                anomalies: AnomalyFlag[];
            }> {
                const db = getDb();

                // ── Quarterly (MSI preferred) ──────────────────────────────────────
                const msiQ = db.queryAll<{
                    period_end_date: string;
                    revenue_ops: number | null;
                    total_revenue: number | null;
                    net_profit: number | null;
                    basic_eps: number | null;
                    profit_before_tax: number | null;
                    finance_costs: number | null;
                    depreciation: number | null;
                }>(
                    `SELECT period_end_date, revenue_ops, total_revenue, net_profit, basic_eps,
                  profit_before_tax, finance_costs, depreciation
           FROM msi_fundamentals_quarterly
           WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 16`,
                    [assetId]
                );

                // Screener quarterly as enrichment for operating profit margin
                const scrQ = db.queryAll<{
                    period_end_date: string;
                    sales: number | null;
                    operating_profit: number | null;
                    opm_pct: number | null;
                    net_profit: number | null;
                    eps: number | null;
                }>(
                    `SELECT period_end_date, sales, operating_profit, opm_pct, net_profit, eps
           FROM screener_quarterly WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 16`,
                    [assetId]
                );

                // Merge MSI + Screener: index Screener by period
                const scrByPeriod = new Map(scrQ.map(r => [r.period_end_date, r]));

                // Build unified quarterly from MSI (or Screener fallback)
                const periods = msiQ.length
                    ? msiQ.map(r => r.period_end_date)
                    : scrQ.map(r => r.period_end_date);

                const quarterly: QuarterlyResult[] = periods.map((p) => {
                    const m = msiQ.find(r => r.period_end_date === p);
                    const s = scrByPeriod.get(p);
                    const revenue = m?.revenue_ops ?? m?.total_revenue ?? s?.sales ?? null;
                    const operatingProfit = s?.operating_profit
                        ?? (revenue && m?.profit_before_tax != null && m?.finance_costs != null
                            ? revenue - m.finance_costs : null);
                    const pat = m?.net_profit ?? s?.net_profit ?? null;
                    const ebitdaMargin = s?.opm_pct ?? null;
                    const patMargin = revenue && pat ? +((pat / revenue) * 100).toFixed(1) : null;
                    return {
                        periodEnd: p,
                        quarter: periodToQuarter(p),
                        periodType: "QUARTER",
                        revenue,
                        operatingProfit,
                        ebitda: operatingProfit,
                        pat,
                        netProfit: pat,
                        eps: m?.basic_eps ?? s?.eps ?? null,
                        ebitdaMargin,
                        patMargin,
                    };
                });

                // ── Balance Sheet (MSI) ────────────────────────────────────────────
                const msiBS = db.queryAll<{
                    period_end_date: string;
                    equity_capital: number | null;
                    reserves: number | null;
                    long_term_borrowings: number | null;
                    short_term_borrowings: number | null;
                    total_assets: number | null;
                    cash_equivalents: number | null;
                    trade_receivables: number | null;
                }>(
                    `SELECT period_end_date, equity_capital, reserves, long_term_borrowings,
                  short_term_borrowings, total_assets, cash_equivalents, trade_receivables
           FROM msi_balance_sheets WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
                    [assetId]
                );

                // Screener BS fallback
                const scrBS = db.queryAll<{
                    period_end_date: string;
                    share_capital: number | null;
                    reserves: number | null;
                    borrowings: number | null;
                    total_assets: number | null;
                    investments: number | null;
                }>(
                    `SELECT period_end_date, share_capital, reserves, borrowings, total_assets, investments
           FROM screener_balance_sheet WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
                    [assetId]
                );

                const isMsi = msiBS.length > 0;
                type AnyBsRow = { period_end_date: string; reserves: number | null; total_assets: number | null; equity_capital?: number | null; long_term_borrowings?: number | null; short_term_borrowings?: number | null; cash_equivalents?: number | null; trade_receivables?: number | null; share_capital?: number | null; borrowings?: number | null };
                const bsRows: AnyBsRow[] = isMsi ? msiBS as AnyBsRow[] : scrBS as AnyBsRow[];
                const balanceSheet: BalanceSheet[] = bsRows.map((r) => {
                    const equity = isMsi
                        ? (r.equity_capital ?? 0) + (r.reserves ?? 0)
                        : (r.share_capital ?? 0) + (r.reserves ?? 0);
                    const debt = isMsi
                        ? (r.long_term_borrowings ?? 0) + (r.short_term_borrowings ?? 0)
                        : r.borrowings ?? 0;
                    const debtEquity = equity > 0 ? +(debt / equity).toFixed(2) : null;
                    return {
                        periodEnd: r.period_end_date,
                        year: periodToFY(r.period_end_date),
                        totalAssets: r.total_assets ?? null,
                        totalEquity: equity || null,
                        totalDebt: debt || null,
                        equityCapital: isMsi ? r.equity_capital ?? null : r.share_capital ?? null,
                        reserves: r.reserves ?? null,
                        cash: isMsi ? r.cash_equivalents ?? null : null,
                        cashEquivalents: isMsi ? r.cash_equivalents ?? null : null,
                        tradeReceivables: isMsi ? r.trade_receivables ?? null : null,
                        borrowings: debt || null,
                        debtEquity,
                    };
                });

                // ── Cash Flows (MSI) ───────────────────────────────────────────────
                const msiCF = db.queryAll<{
                    period_end_date: string;
                    net_cash_operating: number | null;
                    net_cash_investing: number | null;
                    net_cash_financing: number | null;
                    capex: number | null;
                }>(
                    `SELECT period_end_date, net_cash_operating, net_cash_investing,
                  net_cash_financing, capex
           FROM msi_cash_flows WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
                    [assetId]
                );

                // Screener cashflow fallback
                const scrCF = db.queryAll<{
                    period_end_date: string;
                    cash_from_operating: number | null;
                    cash_from_investing: number | null;
                    cash_from_financing: number | null;
                }>(
                    `SELECT period_end_date, cash_from_operating, cash_from_investing, cash_from_financing
           FROM screener_cashflow WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
                    [assetId]
                );

                const isCfMsi = msiCF.length > 0;
                type AnyCfRow = { period_end_date: string; net_cash_operating?: number | null; net_cash_investing?: number | null; net_cash_financing?: number | null; capex?: number | null; cash_from_operating?: number | null; cash_from_investing?: number | null; cash_from_financing?: number | null };
                const cfRows: AnyCfRow[] = isCfMsi ? msiCF as AnyCfRow[] : scrCF as AnyCfRow[];
                const cashFlow: CashFlow[] = cfRows.map((r) => {
                    const opCF = isCfMsi ? r.net_cash_operating ?? null : r.cash_from_operating ?? null;
                    const invCF = isCfMsi ? r.net_cash_investing ?? null : r.cash_from_investing ?? null;
                    const finCF = isCfMsi ? r.net_cash_financing ?? null : r.cash_from_financing ?? null;
                    const capex = isCfMsi ? r.capex ?? null : null;
                    const freeCF = opCF != null && capex != null ? opCF + capex : null;
                    return {
                        periodEnd: r.period_end_date,
                        year: periodToFY(r.period_end_date),
                        operatingCF: opCF,
                        cashFromOperating: opCF,
                        investingCF: invCF,
                        cashFromInvesting: invCF,
                        financingCF: finCF,
                        cashFromFinancing: finCF,
                        freeCF,
                        freeCashFlow: freeCF,
                        capex,
                    };
                });

                return { quarterly, balanceSheet, cashFlow, anomalies: [] };
            },

            async getOwnership(assetId: string): Promise<{
                shareholding: ShareholdingPattern[];
                governance: GovernanceScore;
            }> {
                const db = getDb();

                // MSI shareholding (preferred)
                const msiSH = db.queryAll<{
                    period_end_date: string;
                    promoter_holding: number | null;
                    fii_holding: number | null;
                    dii_holding: number | null;
                    public_holding: number | null;
                    pledged_shares: number | null;
                }>(
                    `SELECT period_end_date, promoter_holding, fii_holding, dii_holding,
                  public_holding, pledged_shares
           FROM msi_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
                    [assetId]
                );

                // Screener fallback
                const scrSH = db.queryAll<{
                    period_end_date: string;
                    promoters_pct: number | null;
                    fii_pct: number | null;
                    dii_pct: number | null;
                    public_pct: number | null;
                }>(
                    `SELECT period_end_date, promoters_pct, fii_pct, dii_pct, public_pct
           FROM screener_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
                    [assetId]
                );

                const useMsi = msiSH.length > 0;
                const shRows = useMsi ? msiSH : scrSH;

                type AnyShRow = { period_end_date: string; promoter_holding?: number | null; fii_holding?: number | null; dii_holding?: number | null; public_holding?: number | null; pledged_shares?: number | null; promoters_pct?: number | null; fii_pct?: number | null; dii_pct?: number | null; public_pct?: number | null };
                const typedShRows: AnyShRow[] = useMsi ? msiSH as AnyShRow[] : scrSH as AnyShRow[];
                const shareholding: ShareholdingPattern[] = typedShRows.map((r) => {
                    const n = (v: number | null | undefined) => v ?? undefined;
                    return {
                        quarterEnd: r.period_end_date,
                        quarter: periodToQuarter(r.period_end_date),
                        promoter: n(useMsi ? r.promoter_holding : r.promoters_pct),
                        promoterPct: n(useMsi ? r.promoter_holding : r.promoters_pct),
                        fii: n(useMsi ? r.fii_holding : r.fii_pct),
                        fiiPct: n(useMsi ? r.fii_holding : r.fii_pct),
                        dii: n(useMsi ? r.dii_holding : r.dii_pct),
                        diiPct: n(useMsi ? r.dii_holding : r.dii_pct),
                        retail: n(useMsi ? r.public_holding : r.public_pct),
                        publicPct: n(useMsi ? r.public_holding : r.public_pct),
                        pledged: n(useMsi ? r.pledged_shares : undefined),
                        pledgedPct: n(useMsi ? r.pledged_shares : undefined),
                    };
                });

                return {
                    shareholding,
                    governance: { overall: null }, // No governance data yet
                };
            },

            async getAnalytics(assetId: string): Promise<{
                factorExposure: FactorExposure;
                earningsQuality: EarningsQuality;
                ratioHistory: Partial<ComputedRatios>[];
                ratios: ComputedRatios;
            }> {
                const db = getDb();

                // Use MSI company data for ratings/scores
                const msiData = db.queryOne<{
                    composite_rating: number | null;
                    eps_rating: number | null;
                    rs_rating: number | null;
                    smr_rating: string | null;
                    week_high_52: number | null;
                    week_low_52: number | null;
                    pct_from_high: number | null;
                }>(
                    `SELECT composite_rating, eps_rating, rs_rating, smr_rating,
                  week_high_52, week_low_52, pct_from_high
           FROM msi_company_data WHERE asset_id = ?`,
                    [assetId]
                );

                const asset = db.queryOne<{ face_value: number | null }>(
                    `SELECT face_value FROM assets WHERE id = ?`, [assetId]
                );
                const fv = asset?.face_value ?? 1;
                const msiRatios = getMsiRatios(assetId);
                const latestPrice = getLatestPrice(assetId);
                const price = latestPrice?.close ?? 0;

                // Build rolling P/E history from quarterly data (last 8 quarters)
                const qRows = db.queryAll<{ period_end_date: string; basic_eps: number | null }>(
                    `SELECT period_end_date, basic_eps FROM msi_fundamentals_quarterly
           WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
                    [assetId]
                );

                // TTM EPS for each quarter end (rolling sum of trailing 4)
                const ratioHistory: Partial<ComputedRatios>[] = qRows.slice(0, 5).map((_, i) => {
                    const slice = qRows.slice(i, i + 4);
                    const ttmEps = slice.reduce((s, r) => s + (r.basic_eps ?? 0), 0);
                    return {
                        computedDate: qRows[i]?.period_end_date,
                        peTtm: ttmEps > 0 ? +(price / ttmEps).toFixed(1) : null,
                    };
                });

                const pe = msiRatios?.ttmEps && msiRatios.ttmEps > 0
                    ? +(price / msiRatios.ttmEps).toFixed(1) : null;
                const marketCapCr = price > 0 ? estimateMarketCap(assetId, price, fv) : null;

                // CFO/PAT ratio (earnings quality)
                const cfRow = db.queryOne<{ net_cash_operating: number | null }>(
                    `SELECT net_cash_operating FROM msi_cash_flows WHERE asset_id = ?
           ORDER BY period_end_date DESC LIMIT 1`,
                    [assetId]
                );
                const lastPat = qRows[0] ? msiRatios?.ttmPat : null;
                const cfoPatRatio = cfRow?.net_cash_operating && lastPat && lastPat !== 0
                    ? +(cfRow.net_cash_operating / Math.abs(lastPat)).toFixed(2) : null;

                return {
                    factorExposure: {}, // FF factors deferred
                    earningsQuality: {
                        overallScore: msiData?.composite_rating ?? null,
                        cfoPatRatio: cfoPatRatio ?? null,
                        flags: [],
                    },
                    ratioHistory,
                    ratios: {
                        peTtm: pe ?? null,
                        marketCapCr: marketCapCr ?? null,
                        price,
                        pctChange1d: latestPrice?.pct_change ?? null,
                        pctFrom52wHigh: msiData?.pct_from_high ?? null,
                    },
                };
            },
        },

        follow: {
            async getStatus(userId: string, symbol: string) {
                return {
                    isFollowing: false,
                    followerCount: 0,
                    alertConfig: undefined,
                };
            },
            async follow() { },
            async unfollow() { },
        },

        feed: {
            async getUserFeed(_userId: string, limit = 50, offset = 0): Promise<FeedItem[]> {
                return [];
            },
            async getUnreadCount(_userId: string): Promise<number> { return 0; },
            async markAsRead(_userId: string, _eventIds: string[]): Promise<void> { },
        },
    };
}

// ── Helper used above ────────────────────────────────────────────────────────

async function getShares(assetId: string, faceValue: number): Promise<number | null> {
    const db = getDb();
    const bs = db.queryOne<{ equity_capital: number }>(
        `SELECT equity_capital FROM msi_balance_sheets WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
        [assetId]
    );
    if (!bs?.equity_capital) return null;
    return (bs.equity_capital * 1e7) / faceValue;
}
