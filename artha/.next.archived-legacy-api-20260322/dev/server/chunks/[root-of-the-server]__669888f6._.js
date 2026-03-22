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
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
function createClient() {
    const cookieStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://ckyrrsasoslfqrwcvuhe.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreXJyc2Fzb3NsZnFyd2N2dWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTYyNjMsImV4cCI6MjA4NzI3MjI2M30.nijFqFZQ-Z3ZzAN-KERBnwVM35wlZEY6T4MuP4q2rzk"), {
        cookies: {
            async getAll () {
                return (await cookieStore).getAll();
            },
            async setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(async ({ name, value, options })=>{
                        (await cookieStore).set(name, value, options);
                    });
                } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/src/lib/server/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthenticatedUserId",
    ()=>getAuthenticatedUserId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
async function getAuthenticatedUserId() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
}
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
"[project]/src/lib/dashboard/query-engine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "executeWidgetQuery",
    ()=>executeWidgetQuery
]);
/**
 * Widget query engine — translates WidgetConfig into SQL and executes it.
 * Queries span pgDb (relational) for assets/computed_ratios and
 * tsDb (timeseries) for daily_prices via a cross-DB compatible approach
 * (both are on the same PG server, just different databases — we use pgDb
 * which has access to cross-schema via foreign data wrappers, or we read
 * from the relational DB's mirrored views).
 *
 * In practice the relational DB contains:
 *   assets, computed_ratios, technical_indicators, msi_company_data
 * The timeseries DB contains daily_prices, fundamentals, msi_shareholding, etc.
 *
 * For v1, widget queries run against pgDb (relational) which has
 * technical_indicators + computed_ratios as precomputed tables.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/db-postgres.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// ── Column DB mapping ─────────────────────────────────────────────────────────
// Maps dslName → actual SQL expression (table alias assumed in join)
const DSL_TO_SQL = {
    symbol: 'a.nse_symbol',
    name: 'a.name',
    sector: 'a.sector',
    industry_group: 'a.industry_group',
    industry: 'a.industry',
    isin: 'a.isin',
    // Technical indicators (ti.)
    price: 'ti.close',
    close: 'ti.close',
    change_1d_pct: 'ti.change_1d_pct',
    rsi: 'ti.rsi_14',
    rsi_14: 'ti.rsi_14',
    pctFrom52wHigh: 'ti.pct_from_52w_high',
    pctFrom52wLow: 'ti.pct_from_52w_low',
    volume: 'ti.volume',
    sma_20: 'ti.sma_20',
    sma_50: 'ti.sma_50',
    sma_200: 'ti.sma_200',
    // Computed ratios (cr.)
    mcap: 'cr.market_cap_cr',
    pe: 'cr.pe_ttm',
    pe_ttm: 'cr.pe_ttm',
    pb: 'cr.pb',
    ev_ebitda: 'cr.ev_ebitda',
    div_yield: 'cr.dividend_yield',
    dividend_yield: 'cr.dividend_yield',
    roce: 'cr.roce',
    roe: 'cr.roe',
    pat_margin: 'cr.pat_margin',
    op_margin: 'cr.operating_margin',
    rev_g1y: 'cr.revenue_growth_1y',
    rev_g3y: 'cr.revenue_growth_3y',
    pat_g1y: 'cr.pat_growth_1y',
    eps_g1y: 'cr.eps_growth_1y',
    de: 'cr.debt_equity',
    debt_equity: 'cr.debt_equity',
    interest_coverage: 'cr.interest_coverage',
    current_ratio: 'cr.current_ratio',
    quality_score: 'cr.quality_score',
    // MSI ratings (mc.)
    rs_rating: 'mc.rs_rating',
    eps_rating: 'mc.eps_rating',
    master_score: 'mc.master_score',
    group_rank: 'mc.group_rank'
};
const FILTER_MAP = {
    marketCapCrMin: {
        column: 'cr.market_cap_cr',
        op: 'gte'
    },
    marketCapCrMax: {
        column: 'cr.market_cap_cr',
        op: 'lte'
    },
    peTtmMin: {
        column: 'cr.pe_ttm',
        op: 'gte'
    },
    peTtmMax: {
        column: 'cr.pe_ttm',
        op: 'lte'
    },
    pbMin: {
        column: 'cr.pb',
        op: 'gte'
    },
    pbMax: {
        column: 'cr.pb',
        op: 'lte'
    },
    roeMin: {
        column: 'cr.roe',
        op: 'gte'
    },
    roeMax: {
        column: 'cr.roe',
        op: 'lte'
    },
    roceMin: {
        column: 'cr.roce',
        op: 'gte'
    },
    roceMax: {
        column: 'cr.roce',
        op: 'lte'
    },
    debtEquityMin: {
        column: 'cr.debt_equity',
        op: 'gte'
    },
    debtEquityMax: {
        column: 'cr.debt_equity',
        op: 'lte'
    },
    dividendYieldMin: {
        column: 'cr.dividend_yield',
        op: 'gte'
    },
    dividendYieldMax: {
        column: 'cr.dividend_yield',
        op: 'lte'
    },
    patMarginMin: {
        column: 'cr.pat_margin',
        op: 'gte'
    },
    patMarginMax: {
        column: 'cr.pat_margin',
        op: 'lte'
    },
    operatingMarginMin: {
        column: 'cr.operating_margin',
        op: 'gte'
    },
    operatingMarginMax: {
        column: 'cr.operating_margin',
        op: 'lte'
    },
    revenueGrowth1yMin: {
        column: 'cr.revenue_growth_1y',
        op: 'gte'
    },
    revenueGrowth1yMax: {
        column: 'cr.revenue_growth_1y',
        op: 'lte'
    },
    patGrowth1yMin: {
        column: 'cr.pat_growth_1y',
        op: 'gte'
    },
    patGrowth1yMax: {
        column: 'cr.pat_growth_1y',
        op: 'lte'
    },
    epsGrowth1yMin: {
        column: 'cr.eps_growth_1y',
        op: 'gte'
    },
    epsGrowth1yMax: {
        column: 'cr.eps_growth_1y',
        op: 'lte'
    },
    evEbitdaMin: {
        column: 'cr.ev_ebitda',
        op: 'gte'
    },
    evEbitdaMax: {
        column: 'cr.ev_ebitda',
        op: 'lte'
    },
    interestCoverageMin: {
        column: 'cr.interest_coverage',
        op: 'gte'
    },
    interestCoverageMax: {
        column: 'cr.interest_coverage',
        op: 'lte'
    },
    currentRatioMin: {
        column: 'cr.current_ratio',
        op: 'gte'
    },
    currentRatioMax: {
        column: 'cr.current_ratio',
        op: 'lte'
    },
    qualityScoreMin: {
        column: 'cr.quality_score',
        op: 'gte'
    },
    qualityScoreMax: {
        column: 'cr.quality_score',
        op: 'lte'
    },
    rsi14Min: {
        column: 'ti.rsi_14',
        op: 'gte'
    },
    rsi14Max: {
        column: 'ti.rsi_14',
        op: 'lte'
    },
    pctFrom52wHighMin: {
        column: 'ti.pct_from_52w_high',
        op: 'gte'
    },
    pctFrom52wHighMax: {
        column: 'ti.pct_from_52w_high',
        op: 'lte'
    },
    pctFrom52wLowMin: {
        column: 'ti.pct_from_52w_low',
        op: 'gte'
    },
    pctFrom52wLowMax: {
        column: 'ti.pct_from_52w_low',
        op: 'lte'
    },
    sector: {
        column: 'a.sector',
        op: 'eq'
    },
    industryGroup: {
        column: 'a.industry_group',
        op: 'eq'
    },
    marketCapBucket: {
        column: 'a.sector',
        op: 'eq'
    }
};
// ── Column SQL expression builder ─────────────────────────────────────────────
function colToSql(col, alias) {
    const dbExpr = col.dbColumn ?? DSL_TO_SQL[col.dslName] ?? `'${col.dslName}'`;
    const agg = col.aggregation && col.aggregation !== 'none' ? col.aggregation.toUpperCase() : null;
    const expr = agg ? `${agg}(${dbExpr})` : dbExpr;
    const colAlias = alias ?? col.id;
    return `${expr} AS "${colAlias}"`;
}
// ── Build WHERE clauses from filters ─────────────────────────────────────────
function buildWhereClause(filters, params) {
    const clauses = [];
    for (const [key, value] of Object.entries(filters)){
        if (value === null || value === undefined || value === '') continue;
        // marketCapBucket special handling
        if (key === 'marketCapBucket') {
            const bucketMap = {
                large: 'cr.market_cap_cr >= 20000',
                mid: 'cr.market_cap_cr >= 5000 AND cr.market_cap_cr < 20000',
                small: 'cr.market_cap_cr >= 500 AND cr.market_cap_cr < 5000',
                micro: 'cr.market_cap_cr < 500'
            };
            const buckets = Array.isArray(value) ? value : [
                value
            ];
            const parts = buckets.map((b)=>bucketMap[b]).filter(Boolean);
            if (parts.length > 0) {
                clauses.push(`(${parts.join(' OR ')})`);
            }
            continue;
        }
        const def = FILTER_MAP[key];
        if (!def) continue;
        if (def.op === 'gte') {
            params.push(value);
            clauses.push(`${def.column} >= $${params.length}`);
        } else if (def.op === 'lte') {
            params.push(value);
            clauses.push(`${def.column} <= $${params.length}`);
        } else if (def.op === 'eq') {
            if (Array.isArray(value)) {
                if (value.length === 0) continue;
                const placeholders = value.map((v)=>{
                    params.push(v);
                    return `$${params.length}`;
                }).join(', ');
                clauses.push(`${def.column} IN (${placeholders})`);
            } else {
                params.push(value);
                clauses.push(`${def.column} = $${params.length}`);
            }
        }
    }
    return clauses;
}
// ── Main query builder ────────────────────────────────────────────────────────
function needsMsi(columns, filters) {
    const msiCols = [
        'rs_rating',
        'eps_rating',
        'master_score',
        'group_rank'
    ];
    return columns.some((c)=>msiCols.includes(c.dslName)) || Object.keys(filters).some((k)=>k.startsWith('rs') || k.startsWith('eps_rating') || k.startsWith('master'));
}
async function executeWidgetQuery(config, widgetType) {
    const { columns = [], filters = {}, groupColumn, sortColumn, sortDirection = 'desc', limit = 50 } = config;
    if (columns.length === 0) {
        return {
            rows: [],
            columns: [],
            total: 0
        };
    }
    const params = [];
    const useMsi = needsMsi(columns, filters);
    // ── SELECT ───────────────────────────────────────────────────────────────
    const selectParts = [];
    if (groupColumn && groupColumn !== 'symbol') {
        // grouped query: only group col + aggregated value cols
        const groupSqlExpr = DSL_TO_SQL[groupColumn] ?? `a.${groupColumn}`;
        selectParts.push(`${groupSqlExpr} AS "${groupColumn}"`);
        for (const col of columns){
            if (col.dslName === groupColumn || col.id === groupColumn) continue;
            selectParts.push(colToSql(col));
        }
    } else {
        for (const col of columns){
            selectParts.push(colToSql(col));
        }
    }
    // ── FROM + JOINs ─────────────────────────────────────────────────────────
    const joins = [
        `LEFT JOIN technical_indicators ti ON ti.asset_id = a.id AND ti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators)`,
        `LEFT JOIN computed_ratios cr ON cr.asset_id = a.id`
    ];
    if (useMsi) {
        joins.push(`LEFT JOIN msi_company_data mc ON mc.asset_id = a.id`);
    }
    // ── WHERE ─────────────────────────────────────────────────────────────────
    const whereClauses = [
        'a.is_active = 1',
        "a.asset_class = 'EQUITY'",
        'a.nse_symbol IS NOT NULL'
    ];
    whereClauses.push(...buildWhereClause(filters, params));
    // ── GROUP BY ──────────────────────────────────────────────────────────────
    let groupBySql = '';
    if (groupColumn && groupColumn !== 'symbol') {
        const groupSqlExpr = DSL_TO_SQL[groupColumn] ?? `a.${groupColumn}`;
        groupBySql = `GROUP BY ${groupSqlExpr}`;
    }
    // ── ORDER BY ──────────────────────────────────────────────────────────────
    let orderBySql = '';
    if (sortColumn) {
        const sortExpr = DSL_TO_SQL[sortColumn] ?? `"${sortColumn}"`;
        const dir = sortDirection === 'asc' ? 'ASC' : 'DESC';
        orderBySql = `ORDER BY ${sortExpr} ${dir} NULLS LAST`;
    }
    // ── LIMIT ─────────────────────────────────────────────────────────────────
    params.push(Math.min(limit, 500));
    const limitSql = `LIMIT $${params.length}`;
    const sql = [
        `SELECT ${selectParts.join(', ')}`,
        `FROM assets a`,
        joins.join('\n'),
        `WHERE ${whereClauses.join(' AND ')}`,
        groupBySql,
        orderBySql,
        limitSql
    ].filter(Boolean).join('\n');
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(sql, params);
        return {
            rows,
            columns,
            total: rows.length
        };
    } catch (err) {
        console.error('[widget-query-engine] Query failed:', err, '\nSQL:', sql);
        throw err;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/dashboard/widget/query/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
/**
 * POST /api/dashboard/widget/query — execute a widget query and return rows
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$query$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/query-engine.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$query$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$query$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(req) {
    const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthenticatedUserId"])();
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unauthorized'
    }, {
        status: 401
    });
    try {
        const body = await req.json();
        if (!body.config || !body.widget_type) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'config and widget_type are required'
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$query$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWidgetQuery"])(body.config, body.widget_type);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[POST /api/dashboard/widget/query]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__669888f6._.js.map