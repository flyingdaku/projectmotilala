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
"[project]/src/lib/screener/dsl/column-map.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DSL token → SQL column/expression mapping.
 * All Indian-context indicator names resolve to columns in:
 *   - a   = assets
 *   - cr  = computed_ratios (latest snapshot)
 *   - ti  = technical_indicators (latest snapshot)
 */ __turbopack_context__.s([
    "INDIA_INDICES",
    ()=>INDIA_INDICES,
    "TYPE_MAP",
    ()=>TYPE_MAP,
    "resolveCall",
    ()=>resolveCall,
    "resolveIndicator",
    ()=>resolveIndicator,
    "resolveSpecialIdent",
    ()=>resolveSpecialIdent
]);
function resolveIndicator(name) {
    return PLAIN_MAP[name.toLowerCase()] ?? null;
}
function resolveCall(name, args) {
    const lc = name.toLowerCase();
    const fn = CALL_MAP[lc];
    if (!fn) return null;
    return fn(args);
}
// ─────────────────────────────────────────────────────────────────────────────
// Plain (no-arg) indicator map
// ─────────────────────────────────────────────────────────────────────────────
const PLAIN_MAP = {
    // Price
    price: {
        sql: 'ti.close',
        table: 'ti'
    },
    close: {
        sql: 'ti.close',
        table: 'ti'
    },
    last: {
        sql: 'ti.close',
        table: 'ti'
    },
    c: {
        sql: 'ti.close',
        table: 'ti'
    },
    open: {
        sql: 'ti.open',
        table: 'ti'
    },
    o: {
        sql: 'ti.open',
        table: 'ti'
    },
    high: {
        sql: 'ti.high',
        table: 'ti'
    },
    h: {
        sql: 'ti.high',
        table: 'ti'
    },
    low: {
        sql: 'ti.low',
        table: 'ti'
    },
    l: {
        sql: 'ti.low',
        table: 'ti'
    },
    // Volume
    volume: {
        sql: 'ti.volume',
        table: 'ti'
    },
    v: {
        sql: 'ti.volume',
        table: 'ti'
    },
    // Previous bar (lag-1) — stored as prev_* in technical_indicators
    prev_close: {
        sql: 'ti.prev_close',
        table: 'ti'
    },
    prev_high: {
        sql: 'ti.prev_high',
        table: 'ti'
    },
    prev_low: {
        sql: 'ti.prev_low',
        table: 'ti'
    },
    prev_open: {
        sql: 'ti.prev_open',
        table: 'ti'
    },
    prev_volume: {
        sql: 'ti.prev_volume',
        table: 'ti'
    },
    // Cap / Market cap (in Cr for India; avol/advol/cap in millions in original — we use Cr)
    cap: {
        sql: 'cr.market_cap_cr',
        table: 'cr'
    },
    mcap: {
        sql: 'cr.market_cap_cr',
        table: 'cr'
    },
    // Average daily volume (21-day default, millions)
    avol: {
        sql: 'ti.volume_ma_20',
        table: 'ti'
    },
    // Average daily DOLLAR volume (21-day default, millions) — approx price * avol
    advol: {
        sql: '(ti.close * ti.volume_ma_20 / 1000000.0)',
        table: 'ti'
    },
    // Relative volume
    rvol: {
        sql: 'ti.rvol',
        table: 'ti'
    },
    // % change
    chopen: {
        sql: 'ti.chopen_pct',
        table: 'ti'
    },
    change: {
        sql: 'ti.change_1d_pct',
        table: 'ti'
    },
    change_1d: {
        sql: 'ti.change_1d_pct',
        table: 'ti'
    },
    change_5d: {
        sql: 'ti.change_5d_pct',
        table: 'ti'
    },
    change_21d: {
        sql: 'ti.change_21d_pct',
        table: 'ti'
    },
    // Gap
    gapup: {
        sql: 'ti.gap_pct',
        table: 'ti'
    },
    gapdn: {
        sql: '(-1 * ti.gap_pct)',
        table: 'ti'
    },
    // Moving averages (default periods stored in ti)
    sma_20: {
        sql: 'ti.sma_20',
        table: 'ti'
    },
    sma_50: {
        sql: 'ti.sma_50',
        table: 'ti'
    },
    sma_200: {
        sql: 'ti.sma_200',
        table: 'ti'
    },
    ema_9: {
        sql: 'ti.ema_9',
        table: 'ti'
    },
    ema_21: {
        sql: 'ti.ema_21',
        table: 'ti'
    },
    ema_50: {
        sql: 'ti.ema_50',
        table: 'ti'
    },
    ema_200: {
        sql: 'ti.ema_200',
        table: 'ti'
    },
    // Oscillators
    rsi_14: {
        sql: 'ti.rsi_14',
        table: 'ti'
    },
    macd_line: {
        sql: 'ti.macd_line',
        table: 'ti'
    },
    macd_signal: {
        sql: 'ti.macd_signal',
        table: 'ti'
    },
    macd_hist: {
        sql: 'ti.macd_hist',
        table: 'ti'
    },
    stoch_k: {
        sql: 'ti.stoch_k',
        table: 'ti'
    },
    stoch_d: {
        sql: 'ti.stoch_d',
        table: 'ti'
    },
    stoch_rsi: {
        sql: 'ti.stoch_rsi',
        table: 'ti'
    },
    cci_20: {
        sql: 'ti.cci_20',
        table: 'ti'
    },
    williams_r_14: {
        sql: 'ti.williams_r_14',
        table: 'ti'
    },
    momentum_12: {
        sql: 'ti.momentum_12',
        table: 'ti'
    },
    roc_10: {
        sql: 'ti.roc_10',
        table: 'ti'
    },
    // Trend
    adx_14: {
        sql: 'ti.adx_14',
        table: 'ti'
    },
    di_plus: {
        sql: 'ti.di_plus_14',
        table: 'ti'
    },
    di_minus: {
        sql: 'ti.di_minus_14',
        table: 'ti'
    },
    psar: {
        sql: 'ti.psar',
        table: 'ti'
    },
    supertrend: {
        sql: 'ti.supertrend',
        table: 'ti'
    },
    supertrend_dir: {
        sql: 'ti.supertrend_dir',
        table: 'ti'
    },
    // Volatility
    atr_14: {
        sql: 'ti.atr_14',
        table: 'ti'
    },
    natr_14: {
        sql: 'ti.natr_14',
        table: 'ti'
    },
    bb_upper: {
        sql: 'ti.bb_upper',
        table: 'ti'
    },
    bb_middle: {
        sql: 'ti.bb_middle',
        table: 'ti'
    },
    bb_lower: {
        sql: 'ti.bb_lower',
        table: 'ti'
    },
    bb_pct_b: {
        sql: 'ti.bb_pct_b',
        table: 'ti'
    },
    bb_width: {
        sql: 'ti.bb_width',
        table: 'ti'
    },
    keltner_upper: {
        sql: 'ti.keltner_upper',
        table: 'ti'
    },
    keltner_lower: {
        sql: 'ti.keltner_lower',
        table: 'ti'
    },
    donchian_upper: {
        sql: 'ti.donchian_upper',
        table: 'ti'
    },
    donchian_lower: {
        sql: 'ti.donchian_lower',
        table: 'ti'
    },
    // Volume indicators
    obv: {
        sql: 'ti.obv',
        table: 'ti'
    },
    cmf_20: {
        sql: 'ti.cmf_20',
        table: 'ti'
    },
    mfi_14: {
        sql: 'ti.mfi_14',
        table: 'ti'
    },
    volume_ma_20: {
        sql: 'ti.volume_ma_20',
        table: 'ti'
    },
    // Pre-computed trend / pattern flags (stored in ti as integers 0/1)
    risunvol: {
        sql: 'ti.flag_risunvol',
        table: 'ti'
    },
    higher_highs_3: {
        sql: 'ti.flag_hh3',
        table: 'ti'
    },
    higher_closes_3: {
        sql: 'ti.flag_hc3',
        table: 'ti'
    },
    // 52-week
    high_52w: {
        sql: 'ti.high_52w',
        table: 'ti'
    },
    low_52w: {
        sql: 'ti.low_52w',
        table: 'ti'
    },
    pct_from_52w_high: {
        sql: 'ti.pct_from_52w_high',
        table: 'ti'
    },
    pct_from_52w_low: {
        sql: 'ti.pct_from_52w_low',
        table: 'ti'
    },
    // Fundamental
    pe: {
        sql: 'cr.pe_ttm',
        table: 'cr'
    },
    pb: {
        sql: 'cr.pb',
        table: 'cr'
    },
    ev_ebitda: {
        sql: 'cr.ev_ebitda',
        table: 'cr'
    },
    enterprise_ebitda: {
        sql: 'cr.ev_ebitda',
        table: 'cr'
    },
    dvd_yield: {
        sql: 'cr.dividend_yield',
        table: 'cr'
    },
    roce: {
        sql: 'cr.roce',
        table: 'cr'
    },
    roe: {
        sql: 'cr.roe',
        table: 'cr'
    },
    roic: {
        sql: 'cr.roic',
        table: 'cr'
    },
    eps: {
        sql: 'cr.eps_ttm',
        table: 'cr'
    },
    ebitda: {
        sql: 'cr.ebitda_ttm',
        table: 'cr'
    },
    // Margins
    pat_margin: {
        sql: 'cr.pat_margin',
        table: 'cr'
    },
    op_margin: {
        sql: 'cr.operating_margin',
        table: 'cr'
    },
    gross_margin: {
        sql: 'cr.gross_margin',
        table: 'cr'
    },
    // Debt / Solvency
    debt_equity: {
        sql: 'cr.debt_equity',
        table: 'cr'
    },
    price_book_ratio: {
        sql: 'cr.pb',
        table: 'cr'
    },
    current_ratio: {
        sql: 'cr.current_ratio',
        table: 'cr'
    },
    quick_ratio: {
        sql: 'cr.quick_ratio',
        table: 'cr'
    },
    interest_coverage: {
        sql: 'cr.interest_coverage',
        table: 'cr'
    },
    // Quality / Solvency scores
    quality_score: {
        sql: 'cr.quality_score',
        table: 'cr'
    },
    piotroski_f_score: {
        sql: 'cr.piotroski_f_score',
        table: 'cr'
    },
    altman_z_score: {
        sql: 'cr.altman_z',
        table: 'cr'
    },
    altman_z: {
        sql: 'cr.altman_z',
        table: 'cr'
    },
    beneish_m_score: {
        sql: 'cr.beneish_m',
        table: 'cr'
    },
    beneish_m: {
        sql: 'cr.beneish_m',
        table: 'cr'
    },
    // Growth
    rev_g1y: {
        sql: 'cr.revenue_growth_1y',
        table: 'cr'
    },
    rev_g3y: {
        sql: 'cr.revenue_growth_3y',
        table: 'cr'
    },
    pat_g1y: {
        sql: 'cr.pat_growth_1y',
        table: 'cr'
    },
    pat_g3y: {
        sql: 'cr.pat_growth_3y',
        table: 'cr'
    },
    eps_g1y: {
        sql: 'cr.eps_growth_1y',
        table: 'cr'
    },
    fcf: {
        sql: 'cr.free_cash_flow',
        table: 'cr'
    },
    // Valuation extras
    book_value: {
        sql: 'cr.book_value_per_share',
        table: 'cr'
    },
    // Shareholding / Governance
    promoter_pct: {
        sql: 'cr.promoter_holding',
        table: 'cr'
    },
    pledged_pct: {
        sql: 'cr.pledged_shares_pct',
        table: 'cr'
    },
    // Legacy / generic growth aliases
    eps_yoy: {
        sql: 'cr.eps_growth_1y',
        table: 'cr'
    },
    revenue_qoq: {
        sql: 'cr.revenue_growth_1q',
        table: 'cr'
    },
    net_income_5y_growth: {
        sql: 'cr.pat_growth_5y',
        table: 'cr'
    },
    // Dividend
    dvd_payout_ratio: {
        sql: 'cr.dividend_payout',
        table: 'cr'
    },
    buyback_yield_5y_avg: {
        sql: 'cr.buyback_yield',
        table: 'cr'
    },
    // Factor exposure — IIMA Carhart 4-Factor (future: ff alias = asset_factor_exposure view)
    ff_beta: {
        sql: 'ff.market_beta',
        table: 'expr'
    },
    ff_smb: {
        sql: 'ff.smb_loading',
        table: 'expr'
    },
    ff_hml: {
        sql: 'ff.hml_loading',
        table: 'expr'
    },
    ff_wml: {
        sql: 'ff.wml_loading',
        table: 'expr'
    },
    ff_alpha: {
        sql: 'ff.alpha',
        table: 'expr'
    },
    ff_r2: {
        sql: 'ff.r_squared',
        table: 'expr'
    },
    quality: {
        sql: 'cr.quality_score',
        table: 'cr'
    }
};
/** Map a SMA/EMA period to the nearest pre-computed column */ function nearestMa(prefix, period, available) {
    return available.reduce((best, p)=>Math.abs(p - period) < Math.abs(best - period) ? p : best);
}
const SMA_AVAIL = [
    20,
    50,
    200
];
const EMA_AVAIL = [
    9,
    21,
    50,
    200
];
const CALL_MAP = {
    sma: ([p = 50])=>{
        const n = nearestMa('sma', p, SMA_AVAIL);
        return {
            sql: `ti.sma_${n}`,
            table: 'ti'
        };
    },
    ema: ([p = 50])=>{
        const n = nearestMa('ema', p, EMA_AVAIL);
        return {
            sql: `ti.ema_${n}`,
            table: 'ti'
        };
    },
    wma: ([p = 50])=>({
            sql: 'ti.wma_50',
            table: 'ti'
        }),
    dema: ([p = 50])=>({
            sql: 'ti.dema_50',
            table: 'ti'
        }),
    tema: ([p = 50])=>({
            sql: 'ti.tema_50',
            table: 'ti'
        }),
    hma: ([p = 50])=>({
            sql: 'ti.hma_50',
            table: 'ti'
        }),
    vwma: ([p = 20])=>({
            sql: 'ti.vwma_20',
            table: 'ti'
        }),
    rsi: ([p = 14])=>({
            sql: 'ti.rsi_14',
            table: 'ti'
        }),
    macd: ([fast = 12, slow = 26, sig = 9])=>({
            sql: 'ti.macd_line',
            table: 'ti'
        }),
    macds: ([fast = 12, slow = 26, sig = 9])=>({
            sql: 'ti.macd_signal',
            table: 'ti'
        }),
    macdh: ([fast = 12, slow = 26, sig = 9])=>({
            sql: 'ti.macd_hist',
            table: 'ti'
        }),
    stoch: ([p = 14, sk = 3, sd = 3])=>({
            sql: 'ti.stoch_k',
            table: 'ti'
        }),
    slowk: ([p = 14, sk = 3, sd = 3])=>({
            sql: 'ti.stoch_k',
            table: 'ti'
        }),
    slowd: ([p = 14, sk = 3, sd = 3])=>({
            sql: 'ti.stoch_d',
            table: 'ti'
        }),
    cci: ([p = 20])=>({
            sql: 'ti.cci_20',
            table: 'ti'
        }),
    williams: ([p = 14])=>({
            sql: 'ti.williams_r_14',
            table: 'ti'
        }),
    willr: ([p = 14])=>({
            sql: 'ti.williams_r_14',
            table: 'ti'
        }),
    mom: ([p = 12])=>({
            sql: 'ti.momentum_12',
            table: 'ti'
        }),
    roc: ([p = 10])=>({
            sql: 'ti.roc_10',
            table: 'ti'
        }),
    ao: ([f = 5, s = 34])=>({
            sql: 'ti.ao',
            table: 'ti'
        }),
    adx: ([p = 14])=>({
            sql: 'ti.adx_14',
            table: 'ti'
        }),
    di_plus: ([p = 14])=>({
            sql: 'ti.di_plus_14',
            table: 'ti'
        }),
    di_minus: ([p = 14])=>({
            sql: 'ti.di_minus_14',
            table: 'ti'
        }),
    psar: ([af = 0.02, max = 0.2])=>({
            sql: 'ti.psar',
            table: 'ti'
        }),
    atr: ([p = 14])=>({
            sql: 'ti.atr_14',
            table: 'ti'
        }),
    natr: ([p = 14])=>({
            sql: 'ti.natr_14',
            table: 'ti'
        }),
    // Bollinger Bands
    bb: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_middle',
            table: 'ti'
        }),
    bbub: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_upper',
            table: 'ti'
        }),
    bblb: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_lower',
            table: 'ti'
        }),
    bbwidth: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_width',
            table: 'ti'
        }),
    bbpctb: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_pct_b',
            table: 'ti'
        }),
    bbmb: ([p = 20, dev = 2])=>({
            sql: 'ti.bb_middle',
            table: 'ti'
        }),
    // Volume
    avol: ([p = 21])=>({
            sql: 'ti.volume_ma_20',
            table: 'ti'
        }),
    advol: ([p = 21])=>({
            sql: '(ti.close * ti.volume_ma_20 / 1000000.0)',
            table: 'ti'
        }),
    vma: ([p = 21])=>({
            sql: 'ti.volume_ma_20',
            table: 'ti'
        }),
    rvol: ([p = 21])=>({
            sql: 'ti.rvol',
            table: 'ti'
        }),
    // OBV, CMF, MFI
    obv: ()=>({
            sql: 'ti.obv',
            table: 'ti'
        }),
    cmf: ([p = 20])=>({
            sql: 'ti.cmf_20',
            table: 'ti'
        }),
    mfi: ([p = 14])=>({
            sql: 'ti.mfi_14',
            table: 'ti'
        }),
    // Fundamental
    pe: ()=>({
            sql: 'cr.pe_ttm',
            table: 'cr'
        }),
    pb: ()=>({
            sql: 'cr.pb',
            table: 'cr'
        }),
    eps: ()=>({
            sql: 'cr.eps_ttm',
            table: 'cr'
        }),
    ebitda: ()=>({
            sql: 'cr.ebitda_ttm',
            table: 'cr'
        }),
    cap: ()=>({
            sql: 'cr.market_cap_cr',
            table: 'cr'
        }),
    dvd_yield: ()=>({
            sql: 'cr.dividend_yield',
            table: 'cr'
        }),
    book_value: ()=>({
            sql: 'cr.book_value_per_share',
            table: 'cr'
        }),
    fcf: ()=>({
            sql: 'cr.free_cash_flow',
            table: 'cr'
        }),
    promoter_pct: ()=>({
            sql: 'cr.promoter_holding',
            table: 'cr'
        }),
    pledged_pct: ()=>({
            sql: 'cr.pledged_shares_pct',
            table: 'cr'
        }),
    altman_z_score: ()=>({
            sql: 'cr.altman_z',
            table: 'cr'
        }),
    beneish_m_score: ()=>({
            sql: 'cr.beneish_m',
            table: 'cr'
        }),
    piotroski_f_score: ()=>({
            sql: 'cr.quality_score',
            table: 'cr'
        }),
    gross_margin: ()=>({
            sql: 'cr.gross_margin',
            table: 'cr'
        }),
    quick_ratio: ()=>({
            sql: 'cr.quick_ratio',
            table: 'cr'
        }),
    debt_equity: ()=>({
            sql: 'cr.debt_equity',
            table: 'cr'
        }),
    interest_coverage: ()=>({
            sql: 'cr.interest_coverage',
            table: 'cr'
        }),
    rev_g1y: ()=>({
            sql: 'cr.revenue_growth_1y',
            table: 'cr'
        }),
    rev_g3y: ()=>({
            sql: 'cr.revenue_growth_3y',
            table: 'cr'
        }),
    pat_g1y: ()=>({
            sql: 'cr.pat_growth_1y',
            table: 'cr'
        }),
    pat_g3y: ()=>({
            sql: 'cr.pat_growth_3y',
            table: 'cr'
        }),
    eps_g1y: ()=>({
            sql: 'cr.eps_growth_1y',
            table: 'cr'
        }),
    pat_margin: ()=>({
            sql: 'cr.pat_margin',
            table: 'cr'
        }),
    op_margin: ()=>({
            sql: 'cr.operating_margin',
            table: 'cr'
        }),
    book_value_per_share: ()=>({
            sql: 'cr.book_value_per_share',
            table: 'cr'
        }),
    // Price performance % over N days
    pp: ([p = 5])=>{
        if (p <= 1) return {
            sql: 'ti.change_1d_pct',
            table: 'ti'
        };
        if (p <= 7) return {
            sql: 'ti.change_5d_pct',
            table: 'ti'
        };
        return {
            sql: 'ti.change_21d_pct',
            table: 'ti'
        };
    },
    // Smar* — SMA of another indicator: smarsi(14,9) etc. Not pre-computed → null (unsupported)
    smarsi: ()=>null,
    smasma: ()=>null,
    // Fibonacci / candlestick patterns → boolean flags in ti
    fibo_ta23: ()=>({
            sql: 'ti.flag_fibo23',
            table: 'ti'
        }),
    fibo_ta38: ()=>({
            sql: 'ti.flag_fibo38',
            table: 'ti'
        }),
    fibo_ta50: ()=>({
            sql: 'ti.flag_fibo50',
            table: 'ti'
        })
};
function resolveSpecialIdent(name) {
    // nh_21 → ti.nh_21 | nh_all → ti.nh_all
    const nhMatch = name.match(/^nh_(\d+|all)$/);
    if (nhMatch) return {
        sql: `ti.nh_${nhMatch[1]}`,
        table: 'ti'
    };
    // pp_5 → ti.change_5d_pct etc.
    const ppMatch = name.match(/^pp_(\d+)$/);
    if (ppMatch) {
        const n = parseInt(ppMatch[1]);
        if (n <= 1) return {
            sql: 'ti.change_1d_pct',
            table: 'ti'
        };
        if (n <= 7) return {
            sql: 'ti.change_5d_pct',
            table: 'ti'
        };
        return {
            sql: 'ti.change_21d_pct',
            table: 'ti'
        };
    }
    // cdl_* → boolean candlestick pattern flag
    if (name.startsWith('cdl_')) return {
        sql: `ti.${name}`,
        table: 'ti'
    };
    // ln_art (above rising trendline) etc.
    if (name === 'ln_art') return {
        sql: 'ti.flag_above_trendline',
        table: 'ti'
    };
    return null;
}
const INDIA_INDICES = {
    nifty50: 'NIFTY 50',
    next50: 'NIFTY NEXT 50',
    nifty100: 'NIFTY 100',
    nifty200: 'NIFTY 200',
    nifty500: 'NIFTY 500',
    sensex: 'BSE SENSEX',
    niftybank: 'NIFTY BANK',
    midcap150: 'NIFTY MIDCAP 150',
    smallcap250: 'NIFTY SMALLCAP 250',
    // aliases used in the DSL spec
    nifty50i: 'NIFTY 50',
    sp500: 'NIFTY 50',
    nasdaq: 'NIFTY 50',
    nasdaq100: 'NIFTY NEXT 50',
    nasd100: 'NIFTY NEXT 50'
};
const TYPE_MAP = {
    stock: 'EQUITY',
    equity: 'EQUITY',
    fund: 'ETF',
    etf: 'ETF',
    reit: 'REIT',
    invit: 'INVIT'
};
}),
"[project]/src/app/api/screener/run/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/db-postgres.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/dsl/column-map.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// ── Market-cap bucket boundaries (₹ Cr) ──────────────────────────────────────
const MCAP_BUCKETS = {
    large: {
        min: 20000
    },
    mid: {
        min: 5000,
        max: 20000
    },
    small: {
        min: 500,
        max: 5000
    },
    micro: {
        max: 500
    }
};
// ── Range helper — uses $N positional params for PostgreSQL ───────────────────
function applyRange(col, range, where, params) {
    if (!range) return;
    if (range.min != null) {
        params.push(range.min);
        where.push(`${col} >= $${params.length}`);
    }
    if (range.max != null) {
        params.push(range.max);
        where.push(`${col} <= $${params.length}`);
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const filters = body.filters ?? {};
        const limit = Math.min(Number(body.limit ?? 200), 500);
        const where = [];
        const params = [];
        // ── Base: active equity assets only ──────────────────────────────────────
        where.push("a.is_active = 1");
        // ── Asset class filter ────────────────────────────────────────────────────
        if (filters.assetClass && filters.assetClass.length > 0) {
            const mapped = filters.assetClass.map((v)=>v.toUpperCase());
            const placeholders = mapped.map((_, i)=>{
                params.push(mapped[i]);
                return `$${params.length}`;
            });
            where.push(`a.asset_class IN (${placeholders.join(",")})`);
        } else {
            where.push("a.asset_class = 'EQUITY'");
        }
        // ── Sector filter ─────────────────────────────────────────────────────────
        if (filters.sector && filters.sector.length > 0) {
            const placeholders = filters.sector.map((v)=>{
                params.push(v);
                return `$${params.length}`;
            });
            where.push(`a.sector IN (${placeholders.join(",")})`);
        }
        // ── Index membership (via index_constituents) ────────────────────────────
        if (filters.indexMembership && filters.indexMembership.length > 0) {
            const indexNames = filters.indexMembership.map((key)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INDIA_INDICES"][key.toLowerCase()] ?? key).filter(Boolean);
            if (indexNames.length > 0) {
                const placeholders = indexNames.map((n)=>{
                    params.push(n);
                    return `$${params.length}`;
                });
                where.push(`
          a.id IN (
            SELECT ic.asset_id
            FROM index_constituents ic
            JOIN assets idx_a ON idx_a.id = ic.index_id
            WHERE idx_a.name IN (${placeholders.join(",")})
              AND ic.date = (
                SELECT MAX(ic2.date) FROM index_constituents ic2
                WHERE ic2.index_id = ic.index_id
              )
          )
        `);
            }
        }
        // ── Market cap bucket ─────────────────────────────────────────────────────
        if (filters.marketCapBucket && filters.marketCapBucket.length > 0) {
            const bucketClauses = [];
            for (const bucket of filters.marketCapBucket){
                const bounds = MCAP_BUCKETS[bucket.toLowerCase()];
                if (!bounds) continue;
                const parts = [];
                if (bounds.min != null) {
                    params.push(bounds.min);
                    parts.push(`cr.market_cap_cr >= $${params.length}`);
                }
                if (bounds.max != null) {
                    params.push(bounds.max);
                    parts.push(`cr.market_cap_cr < $${params.length}`);
                }
                if (parts.length) bucketClauses.push(`(${parts.join(" AND ")})`);
            }
            if (bucketClauses.length) where.push(`(${bucketClauses.join(" OR ")})`);
        }
        // ── Market cap range ──────────────────────────────────────────────────────
        applyRange("cr.market_cap_cr", filters.marketCapCr, where, params);
        // ── Valuation ─────────────────────────────────────────────────────────────
        applyRange("cr.pe_ttm", filters.peTtm, where, params);
        applyRange("cr.pb", filters.pb, where, params);
        applyRange("cr.ev_ebitda", filters.evEbitda, where, params);
        applyRange("cr.dividend_yield", filters.dividendYield, where, params);
        // ── Profitability ─────────────────────────────────────────────────────────
        applyRange("cr.roce", filters.roce, where, params);
        applyRange("cr.roe", filters.roe, where, params);
        applyRange("cr.pat_margin", filters.patMargin, where, params);
        applyRange("cr.operating_margin", filters.operatingMargin, where, params);
        // ── Growth ────────────────────────────────────────────────────────────────
        applyRange("cr.revenue_growth_1y", filters.revenueGrowth1y, where, params);
        applyRange("cr.revenue_growth_3y", filters.revenueGrowth3y, where, params);
        applyRange("cr.pat_growth_1y", filters.patGrowth1y, where, params);
        applyRange("cr.eps_growth_1y", filters.epsGrowth1y, where, params);
        // ── Financial health ──────────────────────────────────────────────────────
        applyRange("cr.debt_equity", filters.debtEquity, where, params);
        applyRange("cr.interest_coverage", filters.interestCoverage, where, params);
        applyRange("cr.current_ratio", filters.currentRatio, where, params);
        // ── Quality ───────────────────────────────────────────────────────────────
        applyRange("cr.quality_score", filters.qualityScore, where, params);
        // ── Technical (from technical_indicators join) ────────────────────────────
        applyRange("ti.rsi_14", filters.rsi14, where, params);
        applyRange("ti.pct_from_52w_high", filters.pctFrom52wHigh, where, params);
        applyRange("ti.pct_from_52w_low", filters.pctFrom52wLow, where, params);
        // ── DSL formula conditions (already use $N syntax from codegen) ───────────
        if (filters.formula && filters.formula.length > 0) {
            for (const frag of filters.formula){
                if (typeof frag === "string" && frag.trim()) {
                    where.push(frag);
                }
            }
        }
        // ── Limit param ───────────────────────────────────────────────────────────
        params.push(limit);
        const limitPlaceholder = `$${params.length}`;
        // ── Build final SQL ───────────────────────────────────────────────────────
        const sql = `
      SELECT
        a.id,
        a.nse_symbol         AS symbol,
        a.name,
        a.sector,
        a.industry_group     AS "industryGroup",
        a.asset_class        AS "assetClass",
        cr.market_cap_cr     AS "marketCapCr",
        cr.pe_ttm            AS pe,
        cr.pb,
        cr.ev_ebitda         AS "evEbitda",
        cr.dividend_yield    AS "dividendYield",
        cr.roce,
        cr.roe,
        cr.pat_margin        AS "patMargin",
        cr.operating_margin  AS "operatingMargin",
        cr.revenue_growth_1y AS "revenueGrowth1y",
        cr.pat_growth_1y     AS "patGrowth1y",
        cr.eps_growth_1y     AS "epsGrowth1y",
        cr.debt_equity       AS "debtEquity",
        cr.quality_score     AS "qualityScore",
        ti.close             AS price,
        ti.change_1d_pct     AS "pctChange",
        ti.rsi_14            AS rsi14,
        ti.pct_from_52w_high AS "pctFrom52wHigh",
        ti.sma_50            AS sma50,
        ti.sma_200           AS sma200
      FROM assets a
      LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
      LEFT JOIN technical_indicators ti ON ti.asset_id = a.id
      WHERE ${where.join(" AND ")}
      ORDER BY cr.market_cap_cr DESC NULLS LAST
      LIMIT ${limitPlaceholder}
    `;
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(sql, params);
        const results = rows.map((r)=>({
                symbol: r.symbol,
                name: r.name,
                sector: r.sector,
                industryGroup: r.industryGroup,
                assetClass: r.assetClass,
                marketCapCr: r.marketCapCr,
                price: r.price,
                pctChange: r.pctChange,
                pe: r.pe,
                pb: r.pb,
                evEbitda: r.evEbitda,
                dividendYield: r.dividendYield,
                roce: r.roce,
                roe: r.roe,
                patMargin: r.patMargin,
                operatingMargin: r.operatingMargin,
                revenueGrowth1y: r.revenueGrowth1y,
                patGrowth1y: r.patGrowth1y,
                epsGrowth1y: r.epsGrowth1y,
                debtEquity: r.debtEquity,
                qualityScore: r.qualityScore,
                rsi14: r.rsi14,
                pctFrom52wHigh: r.pctFrom52wHigh,
                sma50: r.sma50,
                sma200: r.sma200
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results,
            total: results.length
        });
    } catch (err) {
        console.error("Screener run error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to run screen"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__55e4a368._.js.map