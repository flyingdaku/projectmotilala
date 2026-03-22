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
 * Two pools:
 *   - pgPool  → artha_relational (port 5432) — assets, follows, feed state, ratios
 *   - tsPool  → artha_timeseries (port 5433) — prices, fundamentals, shareholding
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
 * PostgreSQL data adapter backed by the relational and Timescale databases.
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
const DEFAULT_ALERT_CONFIG = {
    price: true,
    results: true,
    concall: true,
    shareholding: true,
    redFlags: true
};
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
function normalizeAlertConfig(config) {
    return {
        ...DEFAULT_ALERT_CONFIG,
        ...config ?? {}
    };
}
function formatCrores(value) {
    if (value == null || Number.isNaN(value)) return undefined;
    return `Rs ${value.toFixed(value >= 1000 ? 0 : 1)} Cr`;
}
function buildCorpActionTitle(row) {
    if (row.action_type === "DIVIDEND" && row.dividend_amount != null) {
        return `Dividend announced: Rs ${row.dividend_amount}/share`;
    }
    if ((row.action_type === "BONUS" || row.action_type === "SPLIT") && row.ratio_numerator && row.ratio_denominator) {
        return `${row.action_type === "BONUS" ? "Bonus" : "Split"} ${row.ratio_numerator}:${row.ratio_denominator}`;
    }
    return row.raw_announcement?.slice(0, 120) || row.action_type.replaceAll("_", " ");
}
function buildQuarterlyTitle(row) {
    const bits = [];
    const revenue = formatCrores(row.revenue_ops);
    const profit = formatCrores(row.net_profit);
    if (revenue) bits.push(`Revenue ${revenue}`);
    if (profit) bits.push(`PAT ${profit}`);
    if (row.pat_growth_yoy != null) bits.push(`PAT YoY ${row.pat_growth_yoy.toFixed(1)}%`);
    if (bits.length === 0 && row.sales_growth_yoy != null) bits.push(`Sales YoY ${row.sales_growth_yoy.toFixed(1)}%`);
    return bits.length > 0 ? `Quarterly results: ${bits.join(" | ")}` : "Quarterly results updated";
}
function buildShareholdingDeltaEvent(rows) {
    if (rows.length === 0) return null;
    const [latest, previous] = rows;
    const pledgeDelta = previous && latest.pledged_shares != null && previous.pledged_shares != null ? latest.pledged_shares - previous.pledged_shares : null;
    const fiiDelta = previous && latest.fii_holding != null && previous.fii_holding != null ? latest.fii_holding - previous.fii_holding : null;
    const promoterDelta = previous && latest.promoter_holding != null && previous.promoter_holding != null ? latest.promoter_holding - previous.promoter_holding : null;
    const eventData = {};
    if (latest.promoter_holding != null) eventData["Promoter %"] = latest.promoter_holding.toFixed(2);
    if (latest.fii_holding != null) eventData["FII %"] = latest.fii_holding.toFixed(2);
    if (latest.dii_holding != null) eventData["DII %"] = latest.dii_holding.toFixed(2);
    if (latest.pledged_shares != null) eventData["Pledged %"] = latest.pledged_shares.toFixed(2);
    if (fiiDelta != null) eventData["FII QoQ"] = `${fiiDelta >= 0 ? "+" : ""}${fiiDelta.toFixed(2)}pp`;
    if (promoterDelta != null) eventData["Promoter QoQ"] = `${promoterDelta >= 0 ? "+" : ""}${promoterDelta.toFixed(2)}pp`;
    let title = "Shareholding updated";
    let severity = "INFO";
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
        eventData
    };
}
async function resolveAssetBySymbol(symbol) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name
     FROM assets
     WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
     LIMIT 1`, [
        symbol.toUpperCase()
    ]);
}
async function listFollowedAssets(userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT uf.asset_id,
            a.nse_symbol,
            a.bse_code,
            a.name,
            uf.alert_config
     FROM user_asset_follows uf
     JOIN assets a ON a.id = uf.asset_id
     WHERE uf.user_id = $1
     ORDER BY uf.updated_at DESC, a.name ASC`, [
        userId
    ]);
}
async function getReadEventIds(userId, eventIds) {
    if (eventIds.length === 0) return new Set();
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT feed_event_id
     FROM user_feed_reads
     WHERE user_id = $1 AND feed_event_id = ANY($2::text[])`, [
        userId,
        eventIds
    ]);
    return new Set(rows.map((row)=>row.feed_event_id));
}
async function buildUserFeed(userId) {
    const follows = await listFollowedAssets(userId);
    if (follows.length === 0) return [];
    const assetIds = follows.map((row)=>row.asset_id);
    const followsByAsset = new Map(follows.map((row)=>[
            row.asset_id,
            normalizeAlertConfig(row.alert_config)
        ]));
    const items = [];
    const [corpActions, quarterlies, shareholdingRows] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT ca.id,
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
       LIMIT 200`, [
            assetIds,
            daysAgo(365)
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`WITH ranked AS (
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
       WHERE rn = 1`, [
            assetIds
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`WITH ranked AS (
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
       ORDER BY asset_id, period_end_date DESC`, [
            assetIds
        ])
    ]);
    for (const row of corpActions){
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
                ...row.record_date ? {
                    recordDate: row.record_date
                } : {},
                ...row.dividend_amount != null ? {
                    dividendPerShare: row.dividend_amount
                } : {}
            }
        });
    }
    for (const row of quarterlies){
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
                ...row.revenue_ops != null ? {
                    revenueCr: row.revenue_ops
                } : {},
                ...row.net_profit != null ? {
                    patCr: row.net_profit
                } : {},
                ...row.pat_growth_yoy != null ? {
                    patGrowthYoy: row.pat_growth_yoy
                } : {},
                ...row.basic_eps != null ? {
                    eps: row.basic_eps
                } : {}
            }
        });
    }
    const shareholdingByAsset = new Map();
    for (const row of shareholdingRows){
        const group = shareholdingByAsset.get(row.asset_id) ?? [];
        group.push(row);
        shareholdingByAsset.set(row.asset_id, group);
    }
    for (const [assetId, rows] of shareholdingByAsset.entries()){
        const alerts = followsByAsset.get(assetId) ?? DEFAULT_ALERT_CONFIG;
        if (!alerts.shareholding && !alerts.redFlags) continue;
        const item = buildShareholdingDeltaEvent(rows);
        if (item) items.push(item);
    }
    items.sort((a, b)=>new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    const readIds = await getReadEventIds(userId, items.map((item)=>item.id));
    return items.map((item)=>({
            ...item,
            isRead: readIds.has(item.id)
        }));
}
function createPgAdapter() {
    return {
        stocks: {
            async search (query, limit = 10) {
                const q = `%${query.toLowerCase()}%`;
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin
           FROM assets
           WHERE is_active = 1
             AND (LOWER(nse_symbol) LIKE $1 OR LOWER(name) LIKE $1 OR bse_code LIKE $1)
           ORDER BY CASE
             WHEN LOWER(nse_symbol) = LOWER($2) THEN 0
             WHEN LOWER(nse_symbol) LIKE LOWER($2)||'%' THEN 1
             ELSE 2
           END, name
           LIMIT $3`, [
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
                const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`, [
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
                const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group, listing_date, face_value
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`, [
                    symbol.toUpperCase()
                ]);
                if (!asset) return null;
                const [lp, range, cr, vol] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT close, date, LAG(close) OVER (ORDER BY date) AS prev_close
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`, [
                        asset.id
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT MAX(high) AS high52w, MIN(low) AS low52w
             FROM daily_prices
             WHERE asset_id = $1 AND date >= $2 AND source_exchange IN ('NSE','BSE')`, [
                        asset.id,
                        daysAgo(365)
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, dividend_yield, roe, roce, debt_equity
             FROM computed_ratios
             WHERE asset_id = $1`, [
                        asset.id
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT volume
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`, [
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
                const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT id, sector, screener_industry_code, msi_sector
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`, [
                    symbol.toUpperCase()
                ]);
                if (!asset) return [];
                const field = asset.screener_industry_code ? "screener_industry_code" : asset.sector ? "sector" : "msi_sector";
                const val = asset.screener_industry_code ?? asset.sector ?? asset.msi_sector;
                if (!val) return [];
                const peers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, nse_symbol, bse_code, name
           FROM assets
           WHERE ${field} = $1 AND id != $2 AND is_active = 1
           ORDER BY CASE WHEN nse_symbol IS NOT NULL THEN 0 ELSE 1 END, name
           LIMIT 12`, [
                    val,
                    asset.id
                ]);
                const results = await Promise.all(peers.map(async (p)=>{
                    const [lp, cr] = await Promise.all([
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryOne(`SELECT close, date
               FROM daily_prices
               WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
               ORDER BY date DESC
               LIMIT 1`, [
                            p.id
                        ]),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield
               FROM computed_ratios
               WHERE asset_id = $1`, [
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
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT date, open, high, low, close, volume, source_exchange
           FROM daily_prices
           WHERE asset_id = $1 AND date >= $2 AND date <= $3
           ORDER BY date ASC`, [
                    String(assetId),
                    startDate,
                    endDate
                ]);
                const byDate = new Map();
                for (const r of rows){
                    const dKey = typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10);
                    const existing = byDate.get(dKey);
                    if (!existing || r.source_exchange === "NSE") byDate.set(dKey, r);
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
                const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT name, description, website_url, listing_date, management_json, nse_symbol
           FROM assets
           WHERE id = $1`, [
                    assetId
                ]);
                let mgmt = {};
                if (r?.management_json) {
                    try {
                        mgmt = JSON.parse(r.management_json);
                    } catch  {
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
                    indexMemberships: []
                };
            },
            async getCorporateActions (assetId, limit = 20) {
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT id, action_type, ex_date, record_date, dividend_amount
           FROM corporate_actions
           WHERE asset_id = $1
           ORDER BY ex_date DESC
           LIMIT $2`, [
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, revenue_ops, operating_profit, finance_costs, depreciation, profit_before_tax, net_profit, basic_eps
             FROM ${qT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets, cash_equivalents, fixed_assets, investments
             FROM ${bsT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, net_cash_operating, net_cash_investing, net_cash_financing, capex
             FROM ${cfT}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, roce, net_profit_margin, ebit_margin, debtor_days
             FROM src_msi_ratios
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 12`, [
                        assetId
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, sales, operating_profit, pbt, net_profit, eps
             FROM src_screener_quarterly
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`, [
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
                const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsDb"].queryAll(`SELECT period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares
           FROM src_msi_shareholding
           WHERE asset_id = $1
           ORDER BY period_end_date DESC
           LIMIT 8`, [
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield, quality_score
             FROM computed_ratios
             WHERE asset_id = $1`, [
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
            async getStatus (userId, symbol) {
                const asset = await resolveAssetBySymbol(symbol);
                if (!asset) return {
                    isFollowing: false,
                    followerCount: 0,
                    alertConfig: normalizeAlertConfig()
                };
                const [followRow, countRow] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT alert_config FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2`, [
                        userId,
                        asset.id
                    ]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`SELECT COUNT(*) AS follower_count FROM user_asset_follows WHERE asset_id = $1`, [
                        asset.id
                    ])
                ]);
                return {
                    isFollowing: Boolean(followRow),
                    followerCount: Number(countRow?.follower_count ?? 0),
                    alertConfig: normalizeAlertConfig(followRow?.alert_config)
                };
            },
            async follow (userId, symbol, alertConfig) {
                const asset = await resolveAssetBySymbol(symbol);
                if (!asset) throw new Error(`Unknown asset: ${symbol}`);
                const normalized = normalizeAlertConfig(alertConfig);
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`INSERT INTO user_asset_follows (user_id, asset_id, alert_config)
           VALUES ($1, $2, $3::jsonb)
           ON CONFLICT (user_id, asset_id) DO UPDATE SET
             alert_config = EXCLUDED.alert_config,
             updated_at = NOW()
           RETURNING asset_id`, [
                    userId,
                    asset.id,
                    JSON.stringify(normalized)
                ]);
            },
            async unfollow (userId, symbol) {
                const asset = await resolveAssetBySymbol(symbol);
                if (!asset) return;
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`DELETE FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2 RETURNING asset_id`, [
                    userId,
                    asset.id
                ]);
            }
        },
        feed: {
            async getUserFeed (userId, limit = 50, offset = 0) {
                const feed = await buildUserFeed(userId);
                return feed.slice(offset, offset + limit);
            },
            async getUnreadCount (userId) {
                const feed = await buildUserFeed(userId);
                return feed.filter((item)=>!item.isRead).length;
            },
            async markAsRead (userId, eventIds) {
                const uniqueIds = [
                    ...new Set(eventIds.filter(Boolean))
                ];
                for (const eventId of uniqueIds){
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`INSERT INTO user_feed_reads (user_id, feed_event_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, feed_event_id) DO NOTHING
             RETURNING feed_event_id`, [
                        userId,
                        eventId
                    ]);
                }
            }
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/data/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getDataAdapter",
    ()=>getDataAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/pg-adapter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$pg$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
"[project]/src/lib/utils/formatters.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MISSING_VALUE_LABEL",
    ()=>DEFAULT_FALLBACK,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDateLabel",
    ()=>formatDateLabel,
    "formatIndianNumber",
    ()=>formatIndianNumber,
    "formatMetricRange",
    ()=>formatMetricRange,
    "formatMoneyInCrores",
    ()=>formatMoneyInCrores,
    "formatPercent",
    ()=>formatPercent,
    "formatPercentage",
    ()=>formatPercentage,
    "formatPeriodLabel",
    ()=>formatPeriodLabel,
    "formatPrice",
    ()=>formatPrice,
    "formatRatio",
    ()=>formatRatio,
    "formatSignedChange",
    ()=>formatSignedChange,
    "formatVolume",
    ()=>formatVolume,
    "hasDataValue",
    ()=>hasDataValue
]);
const DEFAULT_FALLBACK = "-";
const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
});
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "UTC"
});
function withFallback(value, fallback = DEFAULT_FALLBACK) {
    return value ?? fallback;
}
function normalizedNumber(value) {
    if (value == null || Number.isNaN(value) || !Number.isFinite(value)) return null;
    return value;
}
function hasDataValue(value) {
    if (value == null) return false;
    if (typeof value === "number") return Number.isFinite(value);
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "boolean") return true;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.values(value).some(hasDataValue);
    return false;
}
function formatIndianNumber(value, decimals = 2, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    const absValue = Math.abs(normalized);
    const sign = normalized < 0 ? "-" : "";
    if (absValue >= 1e7) {
        return `${sign}${(absValue / 1e7).toFixed(decimals)}Cr`;
    }
    if (absValue >= 1e5) {
        return `${sign}${(absValue / 1e5).toFixed(decimals)}L`;
    }
    if (absValue >= 1e3) {
        return `${sign}${(absValue / 1e3).toFixed(decimals)}K`;
    }
    return `${sign}${absValue.toFixed(decimals)}`;
}
function formatPrice(value, decimals = 2, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    return normalized.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
function formatCurrency(value, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    const { decimals = 2, signed = false, suffix = "" } = options;
    const sign = signed && normalized > 0 ? "+" : normalized < 0 ? "-" : "";
    const formatted = Math.abs(normalized).toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
    return `${sign}₹${formatted}${suffix}`;
}
function formatMoneyInCrores(value, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    const digits = options.digits ?? 2;
    const absValue = Math.abs(normalized);
    const sign = normalized < 0 ? "-" : "";
    if (absValue >= 100000) {
        return `${sign}₹${(absValue / 100000).toFixed(digits)}L Cr`;
    }
    return `${sign}₹${absValue.toLocaleString("en-IN", {
        minimumFractionDigits: digits > 0 ? Math.min(digits, 2) : 0,
        maximumFractionDigits: digits > 0 ? Math.min(digits, 2) : 0
    })} Cr`;
}
function formatVolume(value, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    if (normalized >= 10000000) return `${(normalized / 10000000).toFixed(2)} Cr`;
    if (normalized >= 100000) return `${(normalized / 100000).toFixed(2)} L`;
    if (normalized >= 1000) return `${(normalized / 1000).toFixed(1)} K`;
    return normalized.toLocaleString("en-IN");
}
function formatPercentage(value, decimals = 2, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    const sign = options.signed && normalized > 0 ? "+" : "";
    return `${sign}${normalized.toFixed(decimals)}%`;
}
function formatPercent(value, decimals = 2, options = {}) {
    return formatPercentage(value, decimals, options);
}
function formatRatio(value, digits = 2, options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    return `${normalized.toFixed(digits)}${options.suffix ?? "x"}`;
}
function formatSignedChange(value, digits = 2, suffix = "%", options = {}) {
    const normalized = normalizedNumber(value);
    if (normalized == null) return withFallback(null, options.fallback);
    return `${normalized > 0 ? "+" : ""}${normalized.toFixed(digits)}${suffix}`;
}
function formatDateLabel(value, options = {}) {
    if (!value) return withFallback(null, options.fallback);
    const date = value instanceof Date ? value : new Date(`${value}`);
    if (Number.isNaN(date.getTime())) return typeof value === "string" ? value : withFallback(null, options.fallback);
    return options.granularity === "month" ? MONTH_FORMATTER.format(date) : DATE_FORMATTER.format(date);
}
function formatPeriodLabel(value, options = {}) {
    if (!value) return withFallback(null, options.fallback);
    const compactFy = /^([A-Za-z]{3})-(\d{2})$/.exec(value);
    if (compactFy) {
        return options.annualAlias ? `FY${compactFy[2]}` : value;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const date = new Date(`${value}T00:00:00Z`);
        if (!Number.isNaN(date.getTime())) {
            if (options.annualAlias) {
                const fiscalYear = date.getUTCMonth() < 3 ? date.getUTCFullYear() : date.getUTCFullYear() + 1;
                return `FY${String(fiscalYear).slice(2)}`;
            }
            return MONTH_FORMATTER.format(date);
        }
    }
    return value;
}
function formatMetricRange(low, high, formatter, fallback = DEFAULT_FALLBACK) {
    const lowValue = normalizedNumber(low);
    const highValue = normalizedNumber(high);
    if (lowValue == null || highValue == null) return fallback;
    return `${formatter(lowValue)} - ${formatter(highValue)}`;
}
;
}),
"[project]/src/lib/stock/presentation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildDataMeta",
    ()=>buildDataMeta,
    "clampCoverage",
    ()=>clampCoverage,
    "completenessScore",
    ()=>completenessScore,
    "dedupeByKey",
    ()=>dedupeByKey,
    "formatCoverageLabel",
    ()=>formatCoverageLabel,
    "getCoverage",
    ()=>getCoverage,
    "getDatasetCoverage",
    ()=>getDatasetCoverage,
    "getLatestDate",
    ()=>getLatestDate,
    "getObjectCoverage",
    ()=>getObjectCoverage,
    "shouldCollapseSparseGrid",
    ()=>shouldCollapseSparseGrid,
    "shouldRenderChart",
    ()=>shouldRenderChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-route] (ecmascript)");
;
function clampCoverage(value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(1, value));
}
function getCoverage(values) {
    if (values.length === 0) return 0;
    const populated = values.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasDataValue"]).length;
    return clampCoverage(populated / values.length);
}
function getObjectCoverage(record, keys) {
    if (!record) return 0;
    return getCoverage(keys.map((key)=>record[key]));
}
function getDatasetCoverage(rows, selectors) {
    if (!rows || rows.length === 0 || selectors.length === 0) return 0;
    let total = 0;
    let populated = 0;
    for (const row of rows){
        for (const selector of selectors){
            total += 1;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasDataValue"])(selector(row))) populated += 1;
        }
    }
    return total === 0 ? 0 : clampCoverage(populated / total);
}
function getLatestDate(candidates) {
    const parsed = candidates.map((value)=>{
        if (!value) return null;
        const timestamp = Date.parse(value);
        return Number.isNaN(timestamp) ? null : {
            value,
            timestamp
        };
    }).filter((entry)=>entry != null);
    if (parsed.length === 0) {
        return candidates.find((candidate)=>Boolean(candidate)) ?? null;
    }
    parsed.sort((left, right)=>right.timestamp - left.timestamp);
    return parsed[0]?.value ?? null;
}
function buildDataMeta(input) {
    const asOf = input.asOf ?? getLatestDate(input.asOfCandidates ?? []);
    const coverage = clampCoverage(input.coverage ?? 0);
    const status = input.status ?? (coverage <= 0 ? "unavailable" : coverage < 0.999 ? "partial" : "delayed");
    return {
        asOf,
        status,
        coverage,
        note: input.note ?? null,
        unitLabel: input.unitLabel ?? null
    };
}
function shouldRenderChart(points, minPoints = 3) {
    return (points?.length ?? 0) >= minPoints;
}
function shouldCollapseSparseGrid(values, threshold = 0.6) {
    return getCoverage(values) < threshold;
}
function completenessScore(values) {
    return getCoverage(values);
}
function formatCoverageLabel(coverage) {
    return `${Math.round(clampCoverage(coverage) * 100)}% coverage`;
}
function dedupeByKey(items, keySelector) {
    const seen = new Set();
    const result = [];
    for (const item of items){
        const key = keySelector(item);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        result.push(item);
    }
    return result;
}
}),
"[project]/src/app/api/stocks/[symbol]/documents/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Map category to document types
const CATEGORY_MAP = {
    announcements: [
        'EXCHANGE_ANNOUNCEMENT',
        'CORPORATE_ACTION'
    ],
    reports: [
        'ANNUAL_REPORT',
        'QUARTERLY_REPORT'
    ],
    concalls: [
        'CONCALL_TRANSCRIPT',
        'CONCALL_AUDIO'
    ],
    ratings: [
        'CREDIT_RATING'
    ],
    presentations: [
        'INVESTOR_PRESENTATION',
        'EARNINGS_PRESENTATION'
    ]
};
async function GET(req, { params }) {
    try {
        const adapter = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataAdapter"])();
        const { symbol: rawSymbol } = await params;
        const symbol = rawSymbol.toUpperCase();
        const category = req.nextUrl.searchParams.get('category');
        const docType = req.nextUrl.searchParams.get('type');
        const stock = await adapter.stocks.getBySymbol(symbol);
        if (!stock) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not found'
        }, {
            status: 404
        });
        const assetId = String(stock.id);
        // Get documents based on category or type
        let documents;
        if (category && CATEGORY_MAP[category]) {
            // Fetch all document types for this category
            const allDocs = await Promise.all(CATEGORY_MAP[category].map((type)=>adapter.company.getDocuments(assetId, type)));
            documents = allDocs.flat().sort((a, b)=>new Date(b.docDate).getTime() - new Date(a.docDate).getTime());
        } else {
            documents = await adapter.company.getDocuments(assetId, docType || undefined);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            documents,
            meta: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildDataMeta"])({
                asOfCandidates: [
                    documents[0]?.docDate
                ],
                coverage: documents.length > 0 ? 1 : 0,
                status: documents.length > 0 ? 'partial' : 'unavailable',
                note: documents.length > 0 ? 'Documents are grouped by filing category.' : 'This category is not fetched for the current company yet.'
            })
        });
    } catch (err) {
        console.error('[stock documents]', err);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c8f9fa72._.js.map