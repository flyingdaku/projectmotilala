module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/data/db-postgres.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "pgDb",
    ()=>pgDb,
    "pgPool",
    ()=>pgPool,
    "tsDb",
    ()=>tsDb,
    "tsPool",
    ()=>tsPool,
    "withPgTransaction",
    ()=>withPgTransaction
]);
/**
 * PostgreSQL / TimescaleDB connection pools for the Artha frontend.
 *
 * Replaces better-sqlite3 (synchronous) with pg (async).
 * Two pools:
 *   - pgPool  → artha_relational (port 5432) — assets, corp_actions, computed_ratios, etc.
 *   - tsPool  → artha_timeseries (port 5433) — daily_prices, fundamentals, etc.
 *
 * Usage:
 *   import { pgPool, tsPool } from "@/lib/data/db-postgres";
 *   const rows = await pgPool.query("SELECT * FROM assets LIMIT 5");
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// ── Connection config ────────────────────────────────────────────────────────
const PG_RELATIONAL_URL = process.env.PG_RELATIONAL_URL ?? "postgresql://artha:artha_dev_password@localhost:5432/artha_relational";
const PG_TIMESERIES_URL = process.env.PG_TIMESERIES_URL ?? "postgresql://artha:artha_dev_password@localhost:5433/artha_timeseries";
function createPool(connectionString, label) {
    const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
        ssl: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false
    });
    pool.on("error", (err)=>{
        console.error(`[pg:${label}] Unexpected pool error:`, err.message);
    });
    return pool;
}
// Reuse pools across Next.js hot-reloads in development
if (!globalThis._arthaPgPool) {
    globalThis._arthaPgPool = createPool(PG_RELATIONAL_URL, "relational");
}
if (!globalThis._arthaTsPool) {
    globalThis._arthaTsPool = createPool(PG_TIMESERIES_URL, "timeseries");
}
const pgPool = globalThis._arthaPgPool;
const tsPool = globalThis._arthaTsPool;
function makeDb(pool) {
    return {
        async queryAll (sql, params = []) {
            const result = await pool.query(sql, params);
            return result.rows;
        },
        async queryOne (sql, params = []) {
            const result = await pool.query(sql, params);
            return result.rows[0];
        }
    };
}
const pgDb = makeDb(pgPool);
const tsDb = makeDb(tsPool);
async function withPgTransaction(fn) {
    const client = await pgPool.connect();
    try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally{
        client.release();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/data/pg-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * PostgreSQL Data Adapter — replaces sqlite-adapter.ts
 * Uses pgDb (artha_relational) and tsDb (artha_timeseries).
 */ __turbopack_context__.s([
    "createPgAdapter",
    ()=>createPgAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/db-postgres.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function daysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split("T")[0];
}
function buildAnnual(quarterly) {
    const byYear = new Map();
    for (const q of quarterly){
        const yr = q.periodEnd?.slice(0, 4) ?? "unknown";
        if (!byYear.has(yr)) byYear.set(yr, []);
        byYear.get(yr).push(q);
    }
    return [
        ...byYear.entries()
    ].filter(([, qs])=>qs.length >= 2).map(([yr, qs])=>({
            periodEnd: `${yr}-03-31`,
            revenue: qs.reduce((s, q)=>s + (q.revenue ?? 0), 0) || null,
            operatingProfit: qs.reduce((s, q)=>s + (q.operatingProfit ?? 0), 0) || null,
            netProfit: qs.reduce((s, q)=>s + (q.netProfit ?? q.pat ?? 0), 0) || null,
            pat: qs.reduce((s, q)=>s + (q.pat ?? q.netProfit ?? 0), 0) || null,
            eps: qs.reduce((s, q)=>s + (q.eps ?? 0), 0) || null
        })).sort((a, b)=>(b.periodEnd ?? "").localeCompare(a.periodEnd ?? ""));
}
function createPgAdapter() {
    return {
        stocks: {
            async search (query, limit = 10) {
                const q = `%${query.toLowerCase()}%`;
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin FROM assets WHERE is_active = 1 AND (LOWER(nse_symbol) LIKE $1 OR LOWER(name) LIKE $1 OR bse_code LIKE $1) ORDER BY CASE WHEN LOWER(nse_symbol) = LOWER($2) THEN 0 WHEN LOWER(nse_symbol) LIKE LOWER($2)||'%' THEN 1 ELSE 2 END, name LIMIT $3`, [
                    q,
                    query,
                    limit * 2
                ]);
                const seen = new Set();
                const results = [];
                for (const r of rows){
                    const symbol = r.nse_symbol ?? r.bse_code ?? "";
                    if (!symbol || seen.has(symbol)) continue;
                    seen.add(symbol);
                    results.push({
                        id: r.id,
                        symbol,
                        name: r.name,
                        exchange: r.nse_symbol ? "NSE" : "BSE",
                        sector: r.sector ?? undefined,
                        industryGroup: r.industry_group ?? undefined,
                        industry: r.industry ?? undefined,
                        subIndustry: r.sub_industry ?? undefined,
                        isin: r.isin ?? undefined,
                        assetClass: "EQUITY"
                    });
                    if (results.length >= limit) break;
                }
                return results;
            },
            async getById (id) {
                const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name, sector FROM assets WHERE id = $1`, [
                    String(id)
                ]);
                if (!r) return null;
                return {
                    id: r.id,
                    symbol: r.nse_symbol ?? r.bse_code ?? "",
                    name: r.name,
                    sector: r.sector ?? undefined,
                    assetClass: "EQUITY"
                };
            },
            async getBySymbol (symbol) {
                const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group FROM assets WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1 LIMIT 1`, [
                    symbol.toUpperCase()
                ]);
                if (!r) return null;
                return {
                    id: r.id,
                    symbol: r.nse_symbol ?? r.bse_code ?? symbol,
                    name: r.name,
                    exchange: r.nse_listed ? "NSE" : "BSE",
                    sector: r.sector ?? r.msi_sector ?? undefined,
                    industryGroup: r.industry_group ?? undefined,
                    industry: r.industry ?? r.msi_industry_group ?? undefined,
                    subIndustry: r.sub_industry ?? undefined,
                    isin: r.isin ?? undefined,
                    assetClass: "EQUITY"
                };
            },
            async getDetail (symbol) {
                const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group, listing_date, face_value FROM assets WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1 LIMIT 1`, [
                    symbol.toUpperCase()
                ]);
                if (!asset) return null;
                const [lp, range, cr, vol] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT close, date, LAG(close) OVER (ORDER BY date) as prev_close FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1`, [
                        asset.id
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT MAX(high) as high52w, MIN(low) as low52w FROM daily_prices WHERE asset_id = $1 AND date >= $2 AND source_exchange IN ('NSE','BSE')`, [
                        asset.id,
                        daysAgo(365)
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, dividend_yield, roe, roce, debt_equity FROM computed_ratios WHERE asset_id = $1`, [
                        asset.id
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT volume FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1`, [
                        asset.id
                    ])
                ]);
                const price = lp?.close ?? 0;
                const pctChange1d = lp?.prev_close && lp.prev_close > 0 ? +((price / lp.prev_close - 1) * 100).toFixed(2) : 0;
                return {
                    id: asset.id,
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
                    listedDate: asset.listing_date ?? undefined
                };
            },
            async getPeers (symbol) {
                const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, sector, screener_industry_code, msi_sector FROM assets WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1 LIMIT 1`, [
                    symbol.toUpperCase()
                ]);
                if (!asset) return [];
                const field = asset.screener_industry_code ? "screener_industry_code" : asset.sector ? "sector" : "msi_sector";
                const val = asset.screener_industry_code ?? asset.sector ?? asset.msi_sector;
                if (!val) return [];
                const peers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, nse_symbol, bse_code, name FROM assets WHERE ${field} = $1 AND id != $2 AND is_active = 1 ORDER BY CASE WHEN nse_symbol IS NOT NULL THEN 0 ELSE 1 END, name LIMIT 12`, [
                    val,
                    asset.id
                ]);
                const results = await Promise.all(peers.map(async (p)=>{
                    const [lp, cr] = await Promise.all([
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT close, date FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1`, [
                            p.id
                        ]),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield FROM computed_ratios WHERE asset_id = $1`, [
                            p.id
                        ])
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
                        dividendYield: cr?.dividend_yield ?? null
                    };
                }));
                return results.filter((p)=>p !== null);
            }
        },
        prices: {
            async getPrices (assetId, opts) {
                let startDate = opts?.startDate ?? "2000-01-01";
                const endDate = opts?.endDate ?? new Date().toISOString().split("T")[0];
                if (!opts?.startDate && opts?.range) {
                    const map = {
                        "1W": 7,
                        "1M": 30,
                        "3M": 90,
                        "6M": 180,
                        "1Y": 365,
                        "3Y": 1095,
                        "5Y": 1825,
                        "10Y": 3650,
                        "MAX": 12000
                    };
                    startDate = daysAgo(map[opts.range.toUpperCase()] ?? 365);
                }
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT date, open, high, low, close, volume, source_exchange FROM daily_prices WHERE asset_id = $1 AND date >= $2 AND date <= $3 ORDER BY date ASC`, [
                    String(assetId),
                    startDate,
                    endDate
                ]);
                const byDate = new Map();
                for (const r of rows){
                    const dKey = typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10);
                    const e = byDate.get(dKey);
                    if (!e || r.source_exchange === "NSE") byDate.set(dKey, r);
                }
                return [
                    ...byDate.values()
                ].map((r)=>({
                        date: typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10),
                        open: r.open,
                        high: r.high,
                        low: r.low,
                        close: r.close,
                        volume: r.volume
                    }));
            }
        },
        company: {
            async getProfile (assetId) {
                const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT name, description, website_url, listing_date, management_json, nse_symbol FROM assets WHERE id = $1`, [
                    assetId
                ]);
                let mgmt = {};
                if (r?.management_json) {
                    try {
                        mgmt = JSON.parse(r.management_json);
                    } catch  {}
                }
                return {
                    description: r?.description ?? `${r?.name ?? "Company"} is a listed Indian company.`,
                    descriptionShort: r?.description ?? `${r?.name ?? "Company"} is a listed Indian company.`,
                    founded: r?.listing_date?.slice(0, 4) ?? "N/A",
                    foundedYear: r?.listing_date ? Number(r.listing_date.slice(0, 4)) : null,
                    website: r?.website_url ?? `https://www.${(r?.nse_symbol ?? "company").toLowerCase()}.com`,
                    md: mgmt.md ?? "N/A",
                    chairman: mgmt.chairman ?? "N/A",
                    indexMemberships: []
                };
            },
            async getCorporateActions (assetId, limit = 20) {
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, action_type, ex_date, record_date, dividend_amount, ratio_numerator, ratio_denominator, adjustment_factor, source_exchange, raw_announcement FROM corporate_actions WHERE asset_id = $1 ORDER BY ex_date DESC LIMIT $2`, [
                    assetId,
                    limit
                ]);
                return rows.map((r)=>({
                        id: 0,
                        actionType: r.action_type,
                        exDate: r.ex_date,
                        recordDate: r.record_date ?? undefined,
                        dividendAmount: r.dividend_amount ?? undefined
                    }));
            },
            async getEvents (_assetId, _limit = 10) {
                return [];
            },
            async getDocuments (_assetId, _docType) {
                return [];
            },
            async getFinancials (assetId, opts) {
                const cons = opts?.consolidated ?? true;
                const qT = cons ? "src_msi_quarterly" : "src_msi_quarterly_standalone";
                const bsT = cons ? "src_msi_balance_sheet" : "src_msi_balance_sheet_standalone";
                const cfT = cons ? "src_msi_cashflow" : "src_msi_cashflow_standalone";
                const [msiQ, msiBS, msiCF, msiR, scrQ] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, revenue_ops, operating_profit, finance_costs, depreciation, profit_before_tax, net_profit, basic_eps FROM ${qT} WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 20`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets, cash_equivalents, fixed_assets, investments FROM ${bsT} WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 10`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, net_cash_operating, net_cash_investing, net_cash_financing, capex FROM ${cfT} WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 10`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, roce, net_profit_margin, ebit_margin, debtor_days FROM src_msi_ratios WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 12`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, sales, operating_profit, pbt, net_profit, eps FROM src_screener_quarterly WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 20`, [
                        assetId
                    ])
                ]);
                const quarterly = msiQ.length > 0 ? msiQ.map((r)=>({
                        periodEnd: r.period_end_date,
                        revenue: r.revenue_ops ?? null,
                        operatingProfit: r.operating_profit ?? null,
                        interest: r.finance_costs ?? null,
                        depreciation: r.depreciation ?? null,
                        pbt: r.profit_before_tax ?? null,
                        netProfit: r.net_profit ?? null,
                        pat: r.net_profit ?? null,
                        eps: r.basic_eps ?? null
                    })) : scrQ.map((r)=>({
                        periodEnd: r.period_end_date,
                        revenue: r.sales ?? null,
                        operatingProfit: r.operating_profit ?? null,
                        pbt: r.pbt ?? null,
                        netProfit: r.net_profit ?? null,
                        pat: r.net_profit ?? null,
                        eps: r.eps ?? null
                    }));
                const balanceSheet = msiBS.map((r)=>{
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
                        bookValue: eq || null
                    };
                });
                const cashFlow = msiCF.map((r)=>({
                        periodEnd: r.period_end_date,
                        operatingCf: r.net_cash_operating ?? undefined,
                        investingCf: r.net_cash_investing ?? undefined,
                        financingCf: r.net_cash_financing ?? undefined,
                        capex: r.capex ?? undefined
                    }));
                const ratios = msiR.map((r)=>({
                        periodEndDate: r.period_end_date,
                        debtorDays: r.debtor_days ?? null,
                        inventoryDays: null,
                        daysPayable: null,
                        roce: r.roce ?? null,
                        operatingMargin: r.ebit_margin ?? null,
                        patMargin: r.net_profit_margin ?? null
                    }));
                return {
                    quarterly,
                    annual: buildAnnual(quarterly),
                    balanceSheet,
                    cashFlow,
                    ratios,
                    anomalies: []
                };
            },
            async getOwnership (assetId) {
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares FROM src_msi_shareholding WHERE asset_id = $1 ORDER BY period_end_date DESC LIMIT 8`, [
                    assetId
                ]);
                return {
                    shareholding: rows.map((r)=>({
                            quarterEnd: r.period_end_date,
                            promoterPct: r.promoter_holding ?? undefined,
                            fiiPct: r.fii_holding ?? undefined,
                            diiPct: r.dii_holding ?? undefined,
                            publicPct: r.public_holding ?? undefined,
                            pledgedPct: r.pledged_shares ?? undefined
                        })),
                    governance: {
                        overall: null
                    }
                };
            },
            async getAnalytics (assetId) {
                const [lp, cr, msi] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT close FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield, quality_score FROM computed_ratios WHERE asset_id = $1`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT composite_rating, pct_from_high FROM msi_company_data WHERE asset_id = $1`, [
                        assetId
                    ])
                ]);
                const price = lp?.close ?? 0;
                return {
                    factorExposure: null,
                    factorContext: {
                        releaseTag: "",
                        latestSnapshots: [],
                        drawdowns: []
                    },
                    earningsQuality: {
                        overallScore: msi?.composite_rating ?? null,
                        cfoPatRatio: null,
                        flags: []
                    },
                    ratioHistory: [],
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
                        qualityScore: cr?.quality_score ?? undefined
                    }
                };
            }
        },
        follow: {
            async getStatus (_userId, _symbol) {
                return {
                    isFollowing: false,
                    followerCount: 0,
                    alertConfig: undefined
                };
            },
            async follow () {},
            async unfollow () {}
        },
        feed: {
            async getUserFeed (_userId, _limit = 50, _offset = 0) {
                return [];
            },
            async getUnreadCount (_userId) {
                return 0;
            },
            async markAsRead (_userId, _eventIds) {}
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/data/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Data adapter — provides a unified interface to the underlying data store.
 * Currently implemented as an in-memory/mock adapter so the UI works without
 * a live database. Swap out the implementation here when connecting to SQLite
 * or a real backend.
 */ __turbopack_context__.s([
    "getDataAdapter",
    ()=>getDataAdapter
]);
// ── Singleton ────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/pg-adapter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
// ── Mock data stores ─────────────────────────────────────────────────────────
const MOCK_STOCKS = [
    {
        id: 1,
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        exchange: "NSE",
        sector: "Energy",
        assetClass: "EQUITY"
    },
    {
        id: 2,
        symbol: "TCS",
        name: "Tata Consultancy Services Ltd",
        exchange: "NSE",
        sector: "IT",
        assetClass: "EQUITY"
    },
    {
        id: 3,
        symbol: "INFY",
        name: "Infosys Ltd",
        exchange: "NSE",
        sector: "IT",
        assetClass: "EQUITY"
    },
    {
        id: 4,
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        exchange: "NSE",
        sector: "Banking",
        assetClass: "EQUITY"
    },
    {
        id: 5,
        symbol: "ICICIBANK",
        name: "ICICI Bank Ltd",
        exchange: "NSE",
        sector: "Banking",
        assetClass: "EQUITY"
    },
    {
        id: 6,
        symbol: "BAJFINANCE",
        name: "Bajaj Finance Ltd",
        exchange: "NSE",
        sector: "NBFC",
        assetClass: "EQUITY"
    },
    {
        id: 7,
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd",
        exchange: "NSE",
        sector: "FMCG",
        assetClass: "EQUITY"
    },
    {
        id: 8,
        symbol: "WIPRO",
        name: "Wipro Ltd",
        exchange: "NSE",
        sector: "IT",
        assetClass: "EQUITY"
    },
    {
        id: 9,
        symbol: "SUNPHARMA",
        name: "Sun Pharmaceutical Industries Ltd",
        exchange: "NSE",
        sector: "Pharma",
        assetClass: "EQUITY"
    },
    {
        id: 10,
        symbol: "ASIANPAINT",
        name: "Asian Paints Ltd",
        exchange: "NSE",
        sector: "Consumer",
        assetClass: "EQUITY"
    },
    {
        id: 11,
        symbol: "AXISBANK",
        name: "Axis Bank Ltd",
        exchange: "NSE",
        sector: "Banking",
        assetClass: "EQUITY"
    },
    {
        id: 12,
        symbol: "MARUTI",
        name: "Maruti Suzuki India Ltd",
        exchange: "NSE",
        sector: "Auto",
        assetClass: "EQUITY"
    },
    {
        id: 13,
        symbol: "NESTLEIND",
        name: "Nestle India Ltd",
        exchange: "NSE",
        sector: "FMCG",
        assetClass: "EQUITY"
    },
    {
        id: 14,
        symbol: "TITAN",
        name: "Titan Company Ltd",
        exchange: "NSE",
        sector: "Consumer",
        assetClass: "EQUITY"
    },
    {
        id: 15,
        symbol: "HCLTECH",
        name: "HCL Technologies Ltd",
        exchange: "NSE",
        sector: "IT",
        assetClass: "EQUITY"
    },
    {
        id: 16,
        symbol: "LTIM",
        name: "LTIMindtree Ltd",
        exchange: "NSE",
        sector: "IT",
        assetClass: "EQUITY"
    },
    {
        id: 17,
        symbol: "POWERGRID",
        name: "Power Grid Corporation of India Ltd",
        exchange: "NSE",
        sector: "Utilities",
        assetClass: "EQUITY"
    },
    {
        id: 18,
        symbol: "NTPC",
        name: "NTPC Ltd",
        exchange: "NSE",
        sector: "Utilities",
        assetClass: "EQUITY"
    },
    {
        id: 19,
        symbol: "SBIN",
        name: "State Bank of India",
        exchange: "NSE",
        sector: "Banking",
        assetClass: "EQUITY"
    },
    {
        id: 20,
        symbol: "KOTAKBANK",
        name: "Kotak Mahindra Bank Ltd",
        exchange: "NSE",
        sector: "Banking",
        assetClass: "EQUITY"
    }
];
// In-memory read status store
const readStatus = new Map();
function generateMockPrices(assetId, startDate) {
    const bars = [];
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 365 * 3 * 24 * 60 * 60 * 1000);
    const end = new Date();
    let price = 500 + assetId * 100;
    const cur = new Date(start);
    while(cur <= end){
        const day = cur.getDay();
        if (day !== 0 && day !== 6) {
            const change = (Math.random() - 0.49) * price * 0.02;
            price = Math.max(10, price + change);
            const isUp = Math.random() > 0.5;
            const open = +(price * (1 + (isUp ? -1 : 1) * Math.random() * 0.01)).toFixed(2);
            bars.push({
                date: cur.toISOString().split("T")[0],
                open: open,
                high: +(Math.max(open, price) * (1 + Math.random() * 0.01)).toFixed(2),
                low: +(Math.min(open, price) * (1 - Math.random() * 0.01)).toFixed(2),
                close: +price.toFixed(2),
                volume: Math.floor(100000 + Math.random() * 2000000)
            });
        }
        cur.setDate(cur.getDate() + 1);
    }
    return bars;
}
function generateMockFeed(userId) {
    return [
        {
            id: "evt_1",
            assetId: "1",
            nseSymbol: "RELIANCE",
            stockName: "Reliance Industries",
            eventType: "RESULT",
            title: "Q3 FY26 Results — PAT up 12% YoY",
            severity: "INFO",
            eventDate: new Date(Date.now() - 1 * 86400000).toISOString(),
            isRead: false,
            eventData: {
                "PAT (Cr)": "₹19,878",
                "Revenue (Cr)": "₹2,35,481",
                "YoY PAT Growth": "+12.1%"
            }
        },
        {
            id: "evt_2",
            assetId: "3",
            nseSymbol: "INFY",
            stockName: "Infosys Ltd",
            eventType: "RESULT",
            title: "Q3 FY26 — Revenue growth misses estimates",
            severity: "WARNING",
            eventDate: new Date(Date.now() - 2 * 86400000).toISOString(),
            isRead: false,
            eventData: {
                "Revenue ($B)": "4.93",
                "Guidance": "3.75–4.5%",
                "Status": "Maintained"
            }
        },
        {
            id: "evt_3",
            assetId: "4",
            nseSymbol: "HDFCBANK",
            stockName: "HDFC Bank",
            eventType: "CONCALL",
            title: "Q3 FY26 Earnings Call — Management commentary",
            severity: "INFO",
            eventDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            isRead: true,
            eventData: {}
        },
        {
            id: "evt_4",
            assetId: "2",
            nseSymbol: "TCS",
            stockName: "Tata Consultancy Services",
            eventType: "CORP_ACTION",
            title: "Dividend declared — ₹10/share, ex-date Feb 28",
            severity: "INFO",
            eventDate: new Date(Date.now() - 4 * 86400000).toISOString(),
            isRead: false,
            eventData: {
                "Dividend": "₹10/share",
                "Ex-date": "Feb 28, 2026",
                "Record Date": "Mar 1, 2026"
            }
        },
        {
            id: "evt_5",
            assetId: "6",
            nseSymbol: "BAJFINANCE",
            stockName: "Bajaj Finance",
            eventType: "RED_FLAG",
            title: "Promoter pledging increased to 14.2%",
            severity: "CRITICAL",
            eventDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            isRead: false,
            eventData: {
                "Pledged": "14.2%",
                "Previous": "11.8%",
                "Change": "+2.4pp"
            }
        },
        {
            id: "evt_6",
            assetId: "9",
            nseSymbol: "SUNPHARMA",
            stockName: "Sun Pharma",
            eventType: "ANNOUNCEMENT",
            title: "FDA approved new drug application for Winlevi",
            severity: "INFO",
            eventDate: new Date(Date.now() - 6 * 86400000).toISOString(),
            isRead: true,
            eventData: {}
        },
        {
            id: "evt_7",
            assetId: "5",
            nseSymbol: "ICICIBANK",
            stockName: "ICICI Bank",
            eventType: "SHAREHOLDING_CHANGE",
            title: "FII holding crosses 42% threshold",
            severity: "WARNING",
            eventDate: new Date(Date.now() - 7 * 86400000).toISOString(),
            isRead: false,
            eventData: {
                "FII %": "42.1%",
                "Previous Quarter": "40.8%",
                "Change": "+1.3pp"
            }
        }
    ];
}
// ── Follow status store ───────────────────────────────────────────────────────
const followStore = new Map();
const followerCounts = new Map([
    [
        "RELIANCE",
        4821
    ],
    [
        "TCS",
        3204
    ],
    [
        "INFY",
        2918
    ],
    [
        "HDFCBANK",
        3512
    ],
    [
        "ICICIBANK",
        2341
    ],
    [
        "BAJFINANCE",
        1823
    ],
    [
        "HINDUNILVR",
        987
    ],
    [
        "WIPRO",
        1102
    ]
]);
// ── Mock adapter implementation ──────────────────────────────────────────────
function createMockAdapter() {
    return {
        stocks: {
            async search (query, limit = 10) {
                const q = query.toLowerCase();
                return MOCK_STOCKS.filter((s)=>s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)).slice(0, limit);
            },
            async getById (id) {
                return MOCK_STOCKS.find((s)=>s.id === id) ?? null;
            },
            async getBySymbol (symbol) {
                return MOCK_STOCKS.find((s)=>s.symbol === symbol.toUpperCase()) ?? null;
            },
            async getDetail (symbol) {
                const s = MOCK_STOCKS.find((s)=>s.symbol === symbol.toUpperCase());
                if (!s) return null;
                const basePrice = 500 + s.id * 100;
                return {
                    ...s,
                    price: +(basePrice * (0.95 + Math.random() * 0.1)).toFixed(2),
                    priceDate: new Date().toISOString().slice(0, 10),
                    pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2),
                    high52w: +(basePrice * 1.35).toFixed(2),
                    low52w: +(basePrice * 0.72).toFixed(2),
                    marketCapCr: Math.floor(basePrice * 500000 / 100),
                    pe: +(15 + Math.random() * 25).toFixed(1),
                    pb: +(1.5 + Math.random() * 8).toFixed(2),
                    dividendYield: +(Math.random() * 3).toFixed(2),
                    roce: +(10 + Math.random() * 30).toFixed(1),
                    roe: +(8 + Math.random() * 25).toFixed(1),
                    debtEquity: +(Math.random() * 1.5).toFixed(2),
                    volume: Math.floor(500000 + Math.random() * 5000000),
                    avgVolume: Math.floor(800000 + Math.random() * 3000000),
                    faceValue: 1,
                    isin: `INE${String(s.id).padStart(6, "0")}01`,
                    listedDate: "1995-11-18"
                };
            },
            async getPeers (symbol) {
                const s = MOCK_STOCKS.find((s)=>s.symbol === symbol.toUpperCase());
                if (!s) return [];
                const sector = s.sector;
                return MOCK_STOCKS.filter((p)=>p.sector === sector && p.symbol !== symbol.toUpperCase()).slice(0, 6).map((p)=>({
                        symbol: p.symbol,
                        name: p.name,
                        marketCapCr: Math.floor((500 + p.id * 100) * 5000),
                        peTtm: +(15 + Math.random() * 25).toFixed(1),
                        pb: +(1.5 + Math.random() * 8).toFixed(2),
                        roce: +(10 + Math.random() * 30).toFixed(1),
                        roe: +(8 + Math.random() * 25).toFixed(1),
                        revenueGrowth1y: +((Math.random() - 0.2) * 30).toFixed(1),
                        patGrowth1y: +((Math.random() - 0.2) * 35).toFixed(1),
                        dividendYield: +(Math.random() * 3).toFixed(2),
                        price: +(500 + p.id * 100 + Math.random() * 50).toFixed(2),
                        pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2)
                    }));
            }
        },
        prices: {
            async getPrices (assetId, opts) {
                let startDate = opts?.startDate;
                if (!startDate && opts?.range) {
                    const now = new Date();
                    const rangeMap = {
                        "1m": 30,
                        "3m": 90,
                        "6m": 180,
                        "1y": 365,
                        "3y": 1095,
                        "5y": 1825
                    };
                    const days = rangeMap[opts.range] ?? 365;
                    const d = new Date(now);
                    d.setDate(d.getDate() - days);
                    startDate = d.toISOString().split("T")[0];
                }
                return generateMockPrices(assetId, startDate);
            }
        },
        company: {
            async getProfile (assetId) {
                const stock = MOCK_STOCKS.find((s)=>s.id === Number(assetId));
                return {
                    description: `${stock?.name ?? "Company"} is one of India's leading ${stock?.sector ?? "sector"} companies, listed on NSE and BSE. The company operates across multiple business segments and has a strong presence in domestic and international markets.`,
                    founded: `${1960 + Number(assetId) % 30}`,
                    headquarters: "Mumbai, India",
                    employees: `${20 + Number(assetId)}K+`,
                    website: `https://${(stock?.symbol ?? "example").toLowerCase()}.com`,
                    md: "Mukesh Kumar",
                    chairman: "Ratan Sharma",
                    businessSegments: [
                        {
                            name: "Core Business",
                            revenuePct: 65,
                            description: "Primary revenue driver"
                        },
                        {
                            name: "New Ventures",
                            revenuePct: 20,
                            description: "High growth emerging segment"
                        },
                        {
                            name: "International",
                            revenuePct: 15,
                            description: "Global operations"
                        }
                    ],
                    riskTags: [
                        {
                            label: "Regulatory Risk",
                            severity: "medium",
                            desc: "Subject to sector-specific regulations"
                        },
                        {
                            label: "FX Exposure",
                            severity: "low",
                            desc: "Partial exposure to USD/INR fluctuations"
                        }
                    ],
                    indexMemberships: [
                        "Nifty 50",
                        "Nifty 500",
                        "BSE Sensex"
                    ],
                    investmentThesis: [
                        "Market leader in core segment with strong moat",
                        "Consistent dividend payer with healthy cash flows",
                        "Expanding into high-margin adjacencies"
                    ],
                    analystRatings: {
                        buy: 18,
                        hold: 6,
                        sell: 2,
                        targetPrice: 1450
                    }
                };
            },
            async getCorporateActions (assetId, limit = 10) {
                return [
                    {
                        id: 1,
                        actionType: "DIVIDEND",
                        exDate: "2025-10-15",
                        recordDate: "2025-10-16",
                        dividendAmount: 8.5
                    },
                    {
                        id: 2,
                        actionType: "DIVIDEND",
                        exDate: "2025-04-10",
                        recordDate: "2025-04-11",
                        dividendAmount: 7.0
                    },
                    {
                        id: 3,
                        actionType: "BONUS",
                        exDate: "2024-06-20",
                        bonusRatio: "1:2"
                    },
                    {
                        id: 4,
                        actionType: "DIVIDEND",
                        exDate: "2024-10-12",
                        dividendAmount: 6.5
                    },
                    {
                        id: 5,
                        actionType: "SPLIT",
                        exDate: "2023-09-15",
                        splitFactor: 5
                    }
                ].slice(0, limit);
            },
            async getEvents (assetId, limit = 10) {
                const events = [
                    {
                        id: "ce1",
                        eventType: "RESULT",
                        title: "Q3 FY26 Results Announced",
                        eventDate: new Date(Date.now() - 86400000).toISOString(),
                        severity: "INFO"
                    },
                    {
                        id: "ce2",
                        eventType: "CONCALL",
                        title: "Earnings Conference Call",
                        eventDate: new Date(Date.now() - 2 * 86400000).toISOString(),
                        severity: "INFO"
                    },
                    {
                        id: "ce3",
                        eventType: "ANNOUNCEMENT",
                        title: "Board Meeting for Dividend",
                        eventDate: new Date(Date.now() - 5 * 86400000).toISOString(),
                        severity: "INFO"
                    }
                ];
                return events.slice(0, limit);
            },
            async getDocuments (assetId, docType) {
                const docs = [
                    {
                        id: "d1",
                        title: "Annual Report FY2025",
                        docType: "ANNUAL_REPORT",
                        docDate: "2025-06-15",
                        fiscalYear: "2025"
                    },
                    {
                        id: "d2",
                        title: "Q3 FY26 Earnings Call Transcript",
                        docType: "CONCALL_TRANSCRIPT",
                        docDate: "2026-01-22",
                        fiscalYear: "2026",
                        fiscalQuarter: "Q3",
                        aiSentiment: 0.4
                    },
                    {
                        id: "d3",
                        title: "Q2 FY26 Earnings Call Transcript",
                        docType: "CONCALL_TRANSCRIPT",
                        docDate: "2025-10-18",
                        fiscalYear: "2026",
                        fiscalQuarter: "Q2",
                        aiSentiment: 0.1
                    },
                    {
                        id: "d4",
                        title: "Annual Report FY2024",
                        docType: "ANNUAL_REPORT",
                        docDate: "2024-06-20",
                        fiscalYear: "2024"
                    },
                    {
                        id: "d5",
                        title: "Investor Presentation Q3 FY26",
                        docType: "INVESTOR_PRESENTATION",
                        docDate: "2026-01-22",
                        fiscalYear: "2026",
                        fiscalQuarter: "Q3"
                    },
                    {
                        id: "d6",
                        title: "Corporate Governance Report FY25",
                        docType: "EXCHANGE_ANNOUNCEMENT",
                        docDate: "2025-07-01",
                        fiscalYear: "2025"
                    }
                ];
                return docType ? docs.filter((d)=>d.docType === docType) : docs;
            },
            async getFinancials (assetId, _opts) {
                const quarters = [
                    "Q3 FY26",
                    "Q2 FY26",
                    "Q1 FY26",
                    "Q4 FY25",
                    "Q3 FY25",
                    "Q2 FY25",
                    "Q1 FY25",
                    "Q4 FY24"
                ];
                const base = 5000 + Number(assetId) * 1000;
                return {
                    quarterly: quarters.map((q, i)=>({
                            quarter: q,
                            revenue: +(base * (1 + i * 0.03 + Math.random() * 0.05)).toFixed(0),
                            ebitda: +(base * 0.22 * (1 + i * 0.02)).toFixed(0),
                            pat: +(base * 0.14 * (1 + i * 0.04)).toFixed(0),
                            eps: +(25 + i * 1.5 + Math.random() * 3).toFixed(2),
                            revenueGrowth: +(Math.random() * 20 - 2).toFixed(1),
                            patGrowth: +(Math.random() * 25 - 3).toFixed(1),
                            ebitdaMargin: +(20 + Math.random() * 8).toFixed(1),
                            patMargin: +(12 + Math.random() * 6).toFixed(1)
                        })),
                    annual: [
                        "FY25",
                        "FY24",
                        "FY23",
                        "FY22",
                        "FY21"
                    ].map((y, i)=>({
                            quarter: y,
                            periodType: "annual",
                            revenue: +(base * 4.2 * (1 + i * 0.05)).toFixed(0),
                            ebitda: +(base * 1.05 * (1 + i * 0.04)).toFixed(0),
                            operatingProfit: +(base * 1.05 * (1 + i * 0.04)).toFixed(0),
                            pat: +(base * 0.58 * (1 + i * 0.05)).toFixed(0),
                            netProfit: +(base * 0.58 * (1 + i * 0.05)).toFixed(0),
                            cfo: +(base * 0.72 * (1 + i * 0.04)).toFixed(0),
                            eps: +(92 + i * 4).toFixed(2),
                            ebitdaMargin: +(22 + Math.random() * 6).toFixed(1),
                            patMargin: +(13 + Math.random() * 5).toFixed(1)
                        })),
                    balanceSheet: [
                        "FY25",
                        "FY24",
                        "FY23",
                        "FY22",
                        "FY21"
                    ].map((y, i)=>({
                            year: y,
                            totalAssets: +(base * 3.5 * (1 + i * 0.1)).toFixed(0),
                            totalEquity: +(base * 1.8 * (1 + i * 0.08)).toFixed(0),
                            totalDebt: +(base * 0.6 * (1 - i * 0.05)).toFixed(0),
                            cash: +(base * 0.4 * (1 + i * 0.12)).toFixed(0),
                            debtEquity: +(0.3 + i * 0.02).toFixed(2),
                            bookValue: +(450 + i * 30).toFixed(0)
                        })),
                    cashFlow: [
                        "FY25",
                        "FY24",
                        "FY23",
                        "FY22"
                    ].map((y, i)=>({
                            year: y,
                            operatingCF: +(base * 0.18 * (1 + i * 0.05)).toFixed(0),
                            investingCF: -+(base * 0.08 * (1 + i * 0.03)).toFixed(0),
                            financingCF: -+(base * 0.06).toFixed(0),
                            freeCF: +(base * 0.10 * (1 + i * 0.04)).toFixed(0),
                            capex: +(base * 0.05).toFixed(0)
                        })),
                    ratios: [
                        "FY25",
                        "FY24",
                        "FY23",
                        "FY22",
                        "FY21"
                    ].map((y, i)=>({
                            periodEndDate: `Mar-${String(25 - i).padStart(2, '0')}`,
                            debtorDays: null,
                            inventoryDays: null,
                            daysPayable: null,
                            roce: +(18 + Math.random() * 6).toFixed(1),
                            operatingMargin: +(20 + Math.random() * 5).toFixed(1),
                            patMargin: +(12 + Math.random() * 4).toFixed(1)
                        })),
                    anomalies: [
                        {
                            type: "REVENUE_CONSISTENCY",
                            severity: "low",
                            description: "Revenue recognition pattern is consistent with industry peers"
                        }
                    ]
                };
            },
            async getOwnership (assetId) {
                return {
                    shareholding: [
                        "Dec 2025",
                        "Sep 2025",
                        "Jun 2025",
                        "Mar 2025",
                        "Dec 2024"
                    ].map((q, i)=>({
                            quarter: q,
                            promoter: +(42 + i * 0.2 + Math.random() * 0.5).toFixed(2),
                            fii: +(28 - i * 0.3 + Math.random() * 0.8).toFixed(2),
                            dii: +(18 + i * 0.1 + Math.random() * 0.4).toFixed(2),
                            retail: +(12 + Math.random() * 0.5).toFixed(2),
                            pledged: +(i * 0.8 + Math.random() * 2).toFixed(2)
                        })),
                    governance: {
                        overall: 72,
                        boardIndependence: 68,
                        disclosure: 78,
                        relatedParty: 65,
                        auditQuality: 80
                    }
                };
            },
            async getAnalytics (assetId) {
                const months = Array.from({
                    length: 24
                }, (_, i)=>{
                    const d = new Date();
                    d.setMonth(d.getMonth() - (23 - i));
                    return d.toISOString().split("T")[0];
                });
                return {
                    factorExposure: {
                        marketBeta: +(0.8 + Math.random() * 0.5).toFixed(2),
                        smbLoading: +((Math.random() - 0.5) * 0.6).toFixed(2),
                        hmlLoading: +((Math.random() - 0.3) * 0.8).toFixed(2),
                        wmlLoading: +((Math.random() - 0.4) * 0.5).toFixed(2),
                        alpha: +((Math.random() - 0.3) * 0.02).toFixed(4),
                        rSquared: +(0.6 + Math.random() * 0.3).toFixed(3),
                        sampleSize: 252,
                        regressionStartDate: months[0],
                        regressionEndDate: months[months.length - 1]
                    },
                    factorContext: {
                        releaseTag: "2025-12",
                        latestSnapshots: [
                            {
                                frequency: "DAILY",
                                asOf: months[months.length - 1],
                                marketReturn: +(Math.random() * 4 - 2).toFixed(2),
                                marketPremium: +(Math.random() * 4 - 2).toFixed(2),
                                rfRate: +(Math.random() * 0.03).toFixed(2),
                                smb: +(Math.random() * 3 - 1.5).toFixed(2),
                                hml: +(Math.random() * 3 - 1.5).toFixed(2),
                                wml: +(Math.random() * 3 - 1.5).toFixed(2),
                                notes: "Delayed survivorship-bias-adjusted IIMA release"
                            },
                            {
                                frequency: "MONTHLY",
                                asOf: months[months.length - 1],
                                marketReturn: +(Math.random() * 8 - 4).toFixed(2),
                                marketPremium: +(Math.random() * 8 - 4).toFixed(2),
                                rfRate: +(Math.random() * 0.3).toFixed(2),
                                smb: +(Math.random() * 6 - 3).toFixed(2),
                                hml: +(Math.random() * 6 - 3).toFixed(2),
                                wml: +(Math.random() * 6 - 3).toFixed(2),
                                notes: "Delayed survivorship-bias-adjusted IIMA release"
                            }
                        ],
                        drawdowns: [
                            {
                                factorCode: "ERP",
                                factorName: "Equity Risk Premium (ERP)",
                                annualizedReturn: 12.4,
                                annualizedVolatility: 18.2,
                                worstDrawdown: -56.7,
                                drawdownDurationYears: 3.1
                            },
                            {
                                factorCode: "SMB",
                                factorName: "Size Factor (SMB)",
                                annualizedReturn: 4.3,
                                annualizedVolatility: 15.6,
                                worstDrawdown: -48.2,
                                drawdownDurationYears: 4.2
                            },
                            {
                                factorCode: "HML",
                                factorName: "Value Factor (HML)",
                                annualizedReturn: 6.1,
                                annualizedVolatility: 14.2,
                                worstDrawdown: -39.5,
                                drawdownDurationYears: 2.8
                            },
                            {
                                factorCode: "WML",
                                factorName: "Momentum Factor (WML)",
                                annualizedReturn: 8.9,
                                annualizedVolatility: 16.8,
                                worstDrawdown: -44.7,
                                drawdownDurationYears: 2.2
                            }
                        ]
                    },
                    earningsQuality: {
                        overallScore: +(65 + Math.random() * 25),
                        cfoPatRatio: +(0.8 + Math.random() * 0.4).toFixed(2),
                        accrualRatio: +(-0.02 + Math.random() * 0.06).toFixed(3),
                        revenueConsistency: +(0.75 + Math.random() * 0.2).toFixed(2),
                        flags: []
                    },
                    ratioHistory: months.map((date)=>({
                            computedDate: date,
                            peTtm: +(15 + Math.random() * 20).toFixed(1),
                            pb: +(2 + Math.random() * 5).toFixed(2),
                            evEbitda: +(10 + Math.random() * 8).toFixed(1),
                            roce: +(12 + Math.random() * 15).toFixed(1),
                            roe: +(10 + Math.random() * 12).toFixed(1)
                        })),
                    ratios: {
                        peTtm: +(18 + Math.random() * 20).toFixed(1),
                        pb: +(2 + Math.random() * 6).toFixed(2),
                        evEbitda: +(12 + Math.random() * 10).toFixed(1),
                        dividendYield: +(0.5 + Math.random() * 2.5).toFixed(2),
                        roce: +(15 + Math.random() * 20).toFixed(1),
                        roe: +(12 + Math.random() * 18).toFixed(1),
                        debtEquity: +(0.1 + Math.random() * 1.2).toFixed(2),
                        patMargin: +(10 + Math.random() * 15).toFixed(1),
                        operatingMargin: +(15 + Math.random() * 12).toFixed(1),
                        revenueGrowth1y: +(Math.random() * 25 - 2).toFixed(1),
                        patGrowth1y: +(Math.random() * 30 - 3).toFixed(1),
                        rsi14: +(35 + Math.random() * 40).toFixed(1),
                        pctFrom52wHigh: -+(5 + Math.random() * 25).toFixed(1),
                        pctFrom52wLow: +(10 + Math.random() * 60).toFixed(1),
                        marketCapCr: Math.floor((500 + Number(assetId) * 100) * 5000),
                        price: +(500 + Number(assetId) * 100 + Math.random() * 50).toFixed(2),
                        pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2)
                    }
                };
            }
        },
        follow: {
            async getStatus (userId, symbol) {
                const key = `${userId}:${symbol}`;
                const existing = followStore.get(key);
                return {
                    isFollowing: !!existing,
                    followerCount: followerCounts.get(symbol) ?? Math.floor(Math.random() * 500),
                    alertConfig: existing?.alertConfig
                };
            },
            async follow (userId, symbol, alertConfig) {
                const key = `${userId}:${symbol}`;
                followStore.set(key, {
                    alertConfig: alertConfig ?? {
                        price: true,
                        results: true,
                        concall: true,
                        shareholding: true,
                        redFlags: true
                    }
                });
                followerCounts.set(symbol, (followerCounts.get(symbol) ?? 0) + 1);
            },
            async unfollow (userId, symbol) {
                const key = `${userId}:${symbol}`;
                if (followStore.has(key)) {
                    followStore.delete(key);
                    followerCounts.set(symbol, Math.max(0, (followerCounts.get(symbol) ?? 1) - 1));
                }
            }
        },
        feed: {
            async getUserFeed (userId, limit = 50, offset = 0) {
                const feed = generateMockFeed(userId).map((item)=>({
                        ...item,
                        isRead: readStatus.get(item.id) ?? item.isRead
                    }));
                return feed.slice(offset, offset + limit);
            },
            async getUnreadCount (userId) {
                const feed = generateMockFeed(userId);
                return feed.filter((f)=>!(readStatus.get(f.id) ?? f.isRead)).length;
            },
            async markAsRead (userId, eventIds) {
                for (const id of eventIds)readStatus.set(id, true);
            }
        }
    };
}
;
let adapterInstance = null;
async function getDataAdapter() {
    if (!adapterInstance) {
        adapterInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPgAdapter"])();
    }
    return adapterInstance;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/stocks/[symbol]/follow/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/index.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const MOCK_USER_ID = 'user_demo';
async function GET(_req, { params }) {
    try {
        const adapter = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataAdapter"])();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not found'
        }, {
            status: 404
        });
        const status = await adapter.follow.getStatus(MOCK_USER_ID, symbol);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(status);
    } catch (err) {
        console.error('[follow GET]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal error'
        }, {
            status: 500
        });
    }
}
async function POST(req, { params }) {
    try {
        const adapter = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataAdapter"])();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not found'
        }, {
            status: 404
        });
        const body = await req.json().catch(()=>({}));
        const alertConfig = body.alertConfig;
        await adapter.follow.follow(MOCK_USER_ID, symbol, alertConfig);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            isFollowing: true
        });
    } catch (err) {
        console.error('[follow POST]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal error'
        }, {
            status: 500
        });
    }
}
async function DELETE(_req, { params }) {
    try {
        const adapter = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataAdapter"])();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not found'
        }, {
            status: 404
        });
        await adapter.follow.unfollow(MOCK_USER_ID, symbol);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            isFollowing: false
        });
    } catch (err) {
        console.error('[follow DELETE]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal error'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__501b7365._.js.map