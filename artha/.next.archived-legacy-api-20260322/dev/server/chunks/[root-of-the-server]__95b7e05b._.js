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
"[project]/src/lib/screener/dsl/tokenizer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DSL Tokenizer
 * Converts a raw formula string into a flat token stream.
 */ __turbopack_context__.s([
    "KEYWORDS",
    ()=>KEYWORDS,
    "TT",
    ()=>TT,
    "TokenizeError",
    ()=>TokenizeError,
    "tokenize",
    ()=>tokenize
]);
var TT = /*#__PURE__*/ function(TT) {
    // Literals
    TT["NUMBER"] = "NUMBER";
    TT["STRING"] = "STRING";
    TT["IDENT"] = "IDENT";
    // Punctuation
    TT["LPAREN"] = "(";
    TT["RPAREN"] = ")";
    TT["LBRACKET"] = "[";
    TT["RBRACKET"] = "]";
    TT["LBRACE"] = "{";
    TT["RBRACE"] = "}";
    TT["COMMA"] = ",";
    TT["DOT_DOT"] = "..";
    TT["AT"] = "@";
    TT["BANG"] = "!";
    TT["PLUS"] = "+";
    TT["MINUS"] = "-";
    TT["STAR"] = "*";
    TT["SLASH"] = "/";
    // Comparison operators
    TT["GT"] = ">";
    TT["GTE"] = ">=";
    TT["LT"] = "<";
    TT["LTE"] = "<=";
    TT["EQ"] = "=";
    // Keyword operators (lexed as IDENT then promoted by parser)
    // and | or | not | ca | cb | trend_up | trend_dn | higher_highs | higher_closes
    // risunvol | div_bull | div_bear | nh_N | pp_N | sortby | show | draw | iff
    // type | index | sector | exch | ticker | as | fixed
    TT["EOF"] = "EOF";
    return TT;
}({});
const KEYWORDS = new Set([
    'and',
    'or',
    'not',
    'ca',
    'cb',
    'trend_up',
    'trend_dn',
    'higher_highs',
    'higher_closes',
    'risunvol',
    'div_bull',
    'div_bear',
    'sortby',
    'show',
    'draw',
    'iff',
    'as',
    'fixed',
    'type',
    'index',
    'sector',
    'exch',
    'ticker',
    'hist'
]);
class TokenizeError extends Error {
    pos;
    constructor(msg, pos){
        super(msg), this.pos = pos;
    }
}
/**
 * Strip // line comments and /* block comments from source.
 */ function stripComments(src) {
    // block comments /* … */
    src = src.replace(/\/\*[\s\S]*?\*\//g, ' ');
    // line comments // … \n
    src = src.replace(/\/\/[^\n]*/g, ' ');
    return src;
}
function tokenize(raw) {
    const src = stripComments(raw);
    const tokens = [];
    let i = 0;
    while(i < src.length){
        // whitespace
        if (/\s/.test(src[i])) {
            i++;
            continue;
        }
        const pos = i;
        // two-char operators
        if (src[i] === '>' && src[i + 1] === '=') {
            tokens.push({
                type: ">=",
                value: '>=',
                pos
            });
            i += 2;
            continue;
        }
        if (src[i] === '<' && src[i + 1] === '=') {
            tokens.push({
                type: "<=",
                value: '<=',
                pos
            });
            i += 2;
            continue;
        }
        if (src[i] === '.' && src[i + 1] === '.') {
            tokens.push({
                type: "..",
                value: '..',
                pos
            });
            i += 2;
            continue;
        }
        // single-char operators / punctuation
        switch(src[i]){
            case '(':
                tokens.push({
                    type: "(",
                    value: '(',
                    pos
                });
                i++;
                continue;
            case ')':
                tokens.push({
                    type: ")",
                    value: ')',
                    pos
                });
                i++;
                continue;
            case '[':
                tokens.push({
                    type: "[",
                    value: '[',
                    pos
                });
                i++;
                continue;
            case ']':
                tokens.push({
                    type: "]",
                    value: ']',
                    pos
                });
                i++;
                continue;
            case '{':
                tokens.push({
                    type: "{",
                    value: '{',
                    pos
                });
                i++;
                continue;
            case '}':
                tokens.push({
                    type: "}",
                    value: '}',
                    pos
                });
                i++;
                continue;
            case ',':
                tokens.push({
                    type: ",",
                    value: ',',
                    pos
                });
                i++;
                continue;
            case '@':
                tokens.push({
                    type: "@",
                    value: '@',
                    pos
                });
                i++;
                continue;
            case '!':
                tokens.push({
                    type: "!",
                    value: '!',
                    pos
                });
                i++;
                continue;
            case '+':
                tokens.push({
                    type: "+",
                    value: '+',
                    pos
                });
                i++;
                continue;
            case '-':
                tokens.push({
                    type: "-",
                    value: '-',
                    pos
                });
                i++;
                continue;
            case '*':
                tokens.push({
                    type: "*",
                    value: '*',
                    pos
                });
                i++;
                continue;
            case '/':
                tokens.push({
                    type: "/",
                    value: '/',
                    pos
                });
                i++;
                continue;
            case '>':
                tokens.push({
                    type: ">",
                    value: '>',
                    pos
                });
                i++;
                continue;
            case '<':
                tokens.push({
                    type: "<",
                    value: '<',
                    pos
                });
                i++;
                continue;
            case '=':
                tokens.push({
                    type: "=",
                    value: '=',
                    pos
                });
                i++;
                continue;
        }
        // number (integer or decimal; also dates like 12/31/2019 handled as IDENT post-split)
        if (/[0-9]/.test(src[i])) {
            let num = '';
            while(i < src.length && /[0-9.]/.test(src[i]))num += src[i++];
            tokens.push({
                type: "NUMBER",
                value: num,
                pos
            });
            continue;
        }
        // single-quoted string 'value'
        if (src[i] === "'") {
            i++;
            let s = '';
            while(i < src.length && src[i] !== "'")s += src[i++];
            if (i < src.length) i++; // consume closing '
            tokens.push({
                type: "STRING",
                value: s,
                pos
            });
            continue;
        }
        // identifier / keyword: starts with letter or underscore, may contain letters, digits, underscores
        if (/[a-zA-Z_]/.test(src[i])) {
            let id = '';
            while(i < src.length && /[a-zA-Z0-9_]/.test(src[i]))id += src[i++];
            tokens.push({
                type: "IDENT",
                value: id.toLowerCase(),
                pos
            });
            continue;
        }
        throw new TokenizeError(`Unexpected character '${src[i]}'`, i);
    }
    tokens.push({
        type: "EOF",
        value: '',
        pos: src.length
    });
    return tokens;
}
}),
"[project]/src/lib/screener/dsl/parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INDIA_INDEX_MAP",
    ()=>INDIA_INDEX_MAP,
    "ParseError",
    ()=>ParseError,
    "parseDsl",
    ()=>parseDsl
]);
/**
 * DSL Recursive-Descent Parser
 * Converts a token stream into an AST FormulaNode.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/dsl/tokenizer.ts [app-route] (ecmascript)");
;
class ParseError extends Error {
    pos;
    constructor(msg, pos){
        super(`DSL parse error at pos ${pos}: ${msg}`), this.pos = pos;
    }
}
// ─── Universe / output function names ────────────────────────────────────────
const UNIVERSE_FNS = new Set([
    'index',
    'type',
    'exch',
    'sector',
    'ticker',
    'hist'
]);
const OUTPUT_FNS = new Set([
    'sortby',
    'show',
    'draw'
]);
const AGG_FNS = new Set([
    'max',
    'min',
    'avg',
    'abs'
]);
const INDIA_INDEX_MAP = {
    nifty50: 'NIFTY50',
    next50: 'NIFTYNXT50',
    nifty100: 'NIFTY100',
    nifty200: 'NIFTY200',
    nifty500: 'NIFTY500',
    sensex: 'SENSEX',
    niftybank: 'BANKNIFTY',
    midcap150: 'NIFTYMIDCAP150',
    smallcap250: 'NIFTYSMALLCAP250',
    vix: 'INDIAVIX'
};
class Parser {
    tokens;
    pos = 0;
    directives = [];
    constructor(src){
        this.tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tokenize"])(src);
    }
    // ── Cursor helpers ────────────────────────────────────────────────────
    peek(offset = 0) {
        return this.tokens[this.pos + offset] ?? this.tokens[this.tokens.length - 1];
    }
    cur() {
        return this.peek(0);
    }
    advance() {
        return this.tokens[this.pos++];
    }
    check(type, value) {
        const t = this.cur();
        return t.type === type && (value === undefined || t.value === value);
    }
    eat(type, value) {
        if (!this.check(type, value)) {
            const t = this.cur();
            throw new ParseError(`Expected ${value ?? type} but got '${t.value}' (${t.type})`, t.pos);
        }
        return this.advance();
    }
    tryEat(type, value) {
        if (this.check(type, value)) {
            this.advance();
            return true;
        }
        return false;
    }
    // ── Top-level entry ───────────────────────────────────────────────────
    parse() {
        const body = this.parseExpr();
        if (!this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].EOF)) {
            throw new ParseError(`Unexpected token '${this.cur().value}'`, this.cur().pos);
        }
        return {
            kind: 'formula',
            body,
            directives: this.directives
        };
    }
    // ── Expression hierarchy ──────────────────────────────────────────────
    // Level 0: scoring   (a)+(b)+(c) >= N
    // Level 1: or
    // Level 2: and
    // Level 3: not / !
    // Level 4: comparison / special
    // Level 5: arithmetic + -
    // Level 6: arithmetic * /
    // Level 7: unary minus / atom
    parseExpr() {
        return this.parseScoring();
    }
    // scoring: multiple parenthesised conditions summed, then compared to a threshold
    // (cond1) + (cond2) + (cond3) >= N
    parseScoring() {
        const first = this.parseOr();
        // Detect scoring pattern: current token is '+' AND what follows is a '(' expression
        if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].PLUS) && this.peek(1).type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN) {
            const conditions = [
                first
            ];
            while(this.tryEat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].PLUS)){
                conditions.push(this.parseOr());
            }
            // expect comparison operator + threshold
            const opTok = this.cur();
            let op = '>=';
            if ([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].GTE,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].GT,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LTE,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LT,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].EQ
            ].includes(opTok.type)) {
                this.advance();
                op = opTok.value;
            } else {
                throw new ParseError('Expected comparison after scoring sum', opTok.pos);
            }
            const threshold = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            return {
                kind: 'scoring',
                conditions,
                threshold,
                op
            };
        }
        return first;
    }
    parseOr() {
        let left = this.parseAnd();
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT, 'or')){
            this.advance();
            const right = this.parseAnd();
            if (left.kind === 'or') {
                left.children.push(right);
            } else {
                left = {
                    kind: 'or',
                    children: [
                        left,
                        right
                    ]
                };
            }
        }
        return left;
    }
    parseAnd() {
        let left = this.parseNot();
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT, 'and')){
            this.advance();
            const right = this.parseNot();
            if (left.kind === 'and') {
                left.children.push(right);
            } else {
                left = {
                    kind: 'and',
                    children: [
                        left,
                        right
                    ]
                };
            }
        }
        return left;
    }
    parseNot() {
        if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].BANG) || this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT, 'not')) {
            this.advance();
            return {
                kind: 'not',
                child: this.parseNot()
            };
        }
        return this.parseCmp();
    }
    // comparison / special operators
    parseCmp() {
        // Universe/output functions produce their own node
        if (this.cur().type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT) {
            const name = this.cur().value;
            if (UNIVERSE_FNS.has(name)) return this.parseUniverseCall();
            if (OUTPUT_FNS.has(name)) return this.parseOutputDirective();
        // watchlist: [name]
        }
        if (this.cur().type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LBRACKET && this.peek(1).type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT) {
            return this.parseWatchlistOrIndex();
        }
        const left = this.parseArith();
        // special postfix operators
        const special = this.tryParseSpecial(left);
        if (special) return special;
        // comparison operators
        const op = this.cur();
        if ([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].GT,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].GTE,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LT,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LTE,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].EQ
        ].includes(op.type)) {
            this.advance();
            const right = this.parseArith();
            return {
                kind: 'cmp',
                op: op.value,
                left,
                right
            };
        }
        if (op.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && (op.value === 'ca' || op.value === 'cb')) {
            this.advance();
            const right = this.parseArith();
            return {
                kind: 'cmp',
                op: op.value,
                left,
                right
            };
        }
        return left;
    }
    /** Try to consume a special postfix operator after `subject`. Returns null if none found. */ tryParseSpecial(subject) {
        const t = this.cur();
        if (t.type !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT) return null;
        let op = null;
        switch(t.value){
            case 'trend_up':
                {
                    this.advance();
                    const n = this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) ? Number(this.advance().value) : 1;
                    op = {
                        kind: 'trend_up',
                        n
                    };
                    break;
                }
            case 'trend_dn':
                {
                    this.advance();
                    const n = this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) ? Number(this.advance().value) : 1;
                    op = {
                        kind: 'trend_dn',
                        n
                    };
                    break;
                }
            case 'higher_highs':
                {
                    this.advance();
                    const n = this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) ? Number(this.advance().value) : 3;
                    op = {
                        kind: 'higher_highs',
                        n
                    };
                    break;
                }
            case 'higher_closes':
                {
                    this.advance();
                    const n = this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) ? Number(this.advance().value) : 3;
                    op = {
                        kind: 'higher_closes',
                        n
                    };
                    break;
                }
            case 'risunvol':
                {
                    this.advance();
                    op = {
                        kind: 'risunvol'
                    };
                    break;
                }
            case 'div_bull':
                {
                    this.advance();
                    op = {
                        kind: 'div_bull'
                    };
                    break;
                }
            case 'div_bear':
                {
                    this.advance();
                    op = {
                        kind: 'div_bear'
                    };
                    break;
                }
            default:
                return null;
        }
        return {
            kind: 'special',
            subject,
            op
        };
    }
    // arithmetic: + -
    parseArith() {
        let left = this.parseTerm();
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].PLUS) || this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].MINUS)){
            // Don't consume '+' if it's part of scoring pattern (handled above)
            if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].PLUS) && this.peek(1).type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN) break;
            const op = this.advance().value;
            const right = this.parseTerm();
            left = {
                kind: 'arith',
                op,
                left,
                right
            };
        }
        return left;
    }
    // term: * /
    parseTerm() {
        let left = this.parseUnary();
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].STAR) || this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].SLASH)){
            const op = this.advance().value;
            const right = this.parseUnary();
            left = {
                kind: 'arith',
                op,
                left,
                right
            };
        }
        return left;
    }
    parseUnary() {
        if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].MINUS)) {
            this.advance();
            const n = this.parseAtom();
            return {
                kind: 'arith',
                op: '*',
                left: {
                    kind: 'number',
                    value: -1
                },
                right: n
            };
        }
        return this.parseAtom();
    }
    // atom: number | '(' expr ')' | ident/func | agg | iff
    parseAtom() {
        const t = this.cur();
        // parenthesised expression with optional suffix modifiers
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN) {
            this.advance();
            const inner = this.parseExpr();
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
            return this.parseAtomSuffix(inner);
        }
        // number
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) {
            this.advance();
            return {
                kind: 'number',
                value: Number(t.value)
            };
        }
        // iff(cond, then, else)
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && t.value === 'iff') {
            return this.parseIff();
        }
        // aggregate functions: max, min, avg, abs
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && AGG_FNS.has(t.value)) {
            return this.parseAgg();
        }
        // identifier / indicator call
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT) {
            return this.parseIdentExpr();
        }
        // nh_N or pp_N style bare tokens parsed as ident
        throw new ParseError(`Unexpected token '${t.value}'`, t.pos);
    }
    /** Attach @suffix or [arrayIndex] to a parenthesised expression */ parseAtomSuffix(node) {
        // (expr)@N or (expr)@[0..4] or (expr)@{0..4} or (expr)@daily @ticker
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].AT)){
            this.advance();
            const shift = this.parseShiftSpec();
            // Wrap in a shifted node — we represent this as an IdentExpr wrapper
            // For parens-with-shift we create a synthetic 'shifted_group' — handled in codegen
            return {
                kind: 'ident',
                name: '__shifted__',
                args: [
                    node
                ],
                shift
            };
        }
        return node;
    }
    /** Parse @<spec> — called after consuming '@' */ parseShiftSpec() {
        const t = this.cur();
        // @[0..4]  → OR range
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LBRACKET) {
            this.advance();
            const from = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].DOT_DOT);
            const to = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RBRACKET);
            return {
                kind: 'range',
                from,
                to,
                rangeOp: 'or'
            };
        }
        // @{0..4}  → AND range
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LBRACE) {
            this.advance();
            const from = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].DOT_DOT);
            const to = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RBRACE);
            return {
                kind: 'range',
                from,
                to,
                rangeOp: 'and'
            };
        }
        // @fixed
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && t.value === 'fixed') {
            this.advance();
            return {
                kind: 'fixed'
            };
        }
        // @daily @weekly @monthly @hourly @h4
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && [
            'daily',
            'weekly',
            'monthly',
            'hourly',
            'h4'
        ].includes(t.value)) {
            const tf = t.value;
            this.advance();
            return {
                kind: 'tf',
                tf
            };
        }
        // @N — bars ago
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) {
            const n = Number(this.advance().value);
            return {
                kind: 'bars',
                n
            };
        }
        // @tickersymbol / @index_token
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT) {
            const sym = this.advance().value;
            return {
                kind: 'ticker',
                sym
            };
        }
        throw new ParseError('Expected shift specifier after @', t.pos);
    }
    /** Parse an identifier, optional argument list, optional array index, optional @shift */ parseIdentExpr() {
        const nameTok = this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT);
        let name = nameTok.value;
        // nh_21, pp_5 etc. parsed as ident; keep as-is
        const args = [];
        // function call: name(arg, arg, ...)
        if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN)) {
            this.advance();
            if (!this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN)) {
                args.push(this.parseArg());
                while(this.tryEat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA)){
                    args.push(this.parseArg());
                }
            }
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
        }
        // array index: name[N]
        let arrayIndex;
        if (this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LBRACKET) && this.peek(1).type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) {
            this.advance();
            arrayIndex = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
            this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RBRACKET);
        }
        // @suffix chain — multiple allowed e.g. @aapl@weekly
        let shift;
        while(this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].AT)){
            this.advance();
            const s = this.parseShiftSpec();
            // chain: combine last ticker + tf into one shift
            if (shift && s.kind === 'tf' && shift.kind === 'ticker') {
            // merge: keep ticker, add tf — for codegen simplicity use ticker only
            // (multi-level regime+tf is not supported on snapshot DB)
            } else {
                shift = s;
            }
        }
        return {
            kind: 'ident',
            name,
            args,
            arrayIndex,
            shift
        };
    }
    /** Argument to a function call — could be a string, number, or ident */ parseArg() {
        const t = this.cur();
        // string arg
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].STRING) {
            this.advance();
            return {
                kind: 'ident',
                name: t.value,
                args: []
            };
        }
        // 'as alias' handled in sortby/show — just parse as expression
        return this.parseArith();
    }
    // ─── Universe call: index(nifty50, sensex) etc. ───────────────────────────
    parseUniverseCall() {
        const fn = this.advance().value;
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN);
        const args = [];
        if (!this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN)) {
            args.push(this.readStringOrIdent());
            while(this.tryEat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA)){
                args.push(this.readStringOrIdent());
            }
        }
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
        return {
            kind: 'universe',
            fn,
            args
        };
    }
    readStringOrIdent() {
        const t = this.cur();
        if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].STRING || t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT || t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) {
            this.advance();
            return t.value;
        }
        throw new ParseError('Expected string or identifier', t.pos);
    }
    // ─── Output directive: sortby / show / draw ───────────────────────────────
    parseOutputDirective() {
        const fn = this.advance().value;
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN);
        const args = [];
        let dir;
        let limit;
        if (!this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN)) {
            args.push(this.parseArith());
            while(this.tryEat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA)){
                const t = this.cur();
                if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT && (t.value === 'asc' || t.value === 'desc')) {
                    dir = t.value;
                    this.advance();
                } else if (t.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER) {
                    limit = Number(this.advance().value);
                } else {
                    args.push(this.parseArith());
                }
            }
        }
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
        const directive = {
            kind: 'output',
            fn,
            args,
            dir,
            limit
        };
        this.directives.push(directive);
        return directive;
    }
    // ─── Aggregate: max(h, 10) / min(l, 5) / avg(rsi(14), 10) / abs(x) ──────
    parseAgg() {
        const fn = this.advance().value;
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN);
        const expr = this.parseArith();
        let period;
        if (this.tryEat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA)) {
            period = Number(this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].NUMBER).value);
        }
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
        return {
            kind: 'agg',
            fn,
            expr,
            period
        };
    }
    // ─── IFF conditional ─────────────────────────────────────────────────────
    parseIff() {
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].IDENT, 'iff');
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LPAREN);
        const cond = this.parseExpr();
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA);
        const then = this.parseArith();
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].COMMA);
        const else_ = this.parseArith();
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RPAREN);
        return {
            kind: 'iff',
            cond,
            then,
            else_
        };
    }
    // ─── Watchlist / index  [name] ────────────────────────────────────────────
    parseWatchlistOrIndex() {
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].LBRACKET);
        // collect everything until ']', allowing spaces in watchlist names
        let name = '';
        while(!this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RBRACKET) && !this.check(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].EOF)){
            name += this.advance().value + ' ';
        }
        this.eat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$tokenizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TT"].RBRACKET);
        return {
            kind: 'watchlist',
            name: name.trim()
        };
    }
}
function parseDsl(src) {
    return new Parser(src).parse();
}
}),
"[project]/src/lib/screener/dsl/codegen.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DSL SQL Code Generator
 *
 * Walks an AST FormulaNode and produces:
 *   - A parameterised SQL WHERE clause fragment
 *   - Collected bind params
 *   - Universe constraints (index membership, type, sector, ticker)
 *   - Output directives (sortby, show)
 *
 * Limitations on snapshot DB:
 *   - Time-shifted @N bars-ago conditions use pre-stored lag columns (lag_1_*, lag_2_*)
 *   - Regime filters @ticker resolve to a sub-query against the ticker's own ti row
 *   - Heikin Ashi / intraday timeframes are not supported → condition dropped with warning
 *   - Backtesting variables (posprice, posbar, stopat) → not supported
 *   - Candlestick pattern flags require pre-computation in ti table (stored as integers 0/1)
 */ __turbopack_context__.s([
    "codegenFormula",
    ()=>codegenFormula
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/dsl/column-map.ts [app-route] (ecmascript)");
;
// ─── Codegen context ─────────────────────────────────────────────────────────
class Ctx {
    conditions = [];
    params = [];
    universe = [];
    sort;
    show = [];
    warnings = [];
    needsTechJoin = false;
    nextParam() {
        return this.params.length + 1;
    }
    push(val) {
        this.params.push(val);
        return this.params.length;
    }
    warn(msg) {
        this.warnings.push(msg);
    }
}
function codegenFormula(formula) {
    const ctx = new Ctx();
    // Process output directives first (extracted by parser)
    for (const dir of formula.directives){
        processOutputDirective(dir, ctx);
    }
    const sql = genExpr(formula.body, ctx);
    if (sql && sql !== 'TRUE') ctx.conditions.push(sql);
    return {
        conditions: ctx.conditions,
        params: ctx.params,
        universe: ctx.universe,
        sort: ctx.sort,
        show: ctx.show,
        warnings: ctx.warnings,
        needsTechJoin: ctx.needsTechJoin
    };
}
// ─── Expression dispatcher ────────────────────────────────────────────────────
function genExpr(node, ctx) {
    switch(node.kind){
        case 'formula':
            return genExpr(node.body, ctx);
        case 'number':
            return String(node.value);
        case 'ident':
            return genIdent(node, ctx);
        case 'arith':
            return genArith(node, ctx);
        case 'cmp':
            return genCmp(node, ctx);
        case 'special':
            return genSpecial(node, ctx);
        case 'and':
            return genAnd(node, ctx);
        case 'or':
            return genOr(node, ctx);
        case 'not':
            return genNot(node, ctx);
        case 'scoring':
            return genScoring(node, ctx);
        case 'universe':
            return genUniverseCall(node, ctx);
        case 'output':
            return processOutputDirective(node, ctx);
        case 'agg':
            return genAgg(node, ctx);
        case 'iff':
            return genIff(node, ctx);
        case 'watchlist':
            return genWatchlist(node, ctx);
        default:
            return 'TRUE';
    }
}
// ─── Identifier / indicator resolution ───────────────────────────────────────
function genIdent(node, ctx) {
    // Synthetic __shifted__ wraps a paren group with @shift
    if (node.name === '__shifted__' && node.args.length === 1) {
        return genWithShift(node.args[0], node.shift, ctx);
    }
    // Resolve column
    const col = resolveIdentNode(node, ctx);
    if (!col) return 'TRUE'; // unsupported → drop condition
    if (col.table === 'ti') ctx.needsTechJoin = true;
    // Array indexing: price[0] = current, price[1] = lag1, price[2] = lag2
    if (node.arrayIndex !== undefined && node.arrayIndex > 0) {
        const lagged = lagColumn(col.sql, node.arrayIndex);
        if (lagged) {
            if (col.table === 'ti') ctx.needsTechJoin = true;
            return lagged;
        }
        ctx.warn(`Lag ${node.arrayIndex} not available for ${node.name}`);
        return col.sql;
    }
    // @shift handling
    if (node.shift) {
        return genWithShift({
            kind: 'ident',
            name: node.name,
            args: node.args
        }, node.shift, ctx);
    }
    return col.sql;
}
function resolveIdentNode(node, ctx) {
    // Parameterised call
    if (node.args.length > 0) {
        const argVals = node.args.map((a)=>{
            if (a.kind === 'number') return a.value;
            // ident args like 'asc', 'desc' in sortby — irrelevant here
            return 0;
        });
        const col = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCall"])(node.name, argVals);
        if (col) return col;
    }
    // Plain indicator
    const col = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveIndicator"])(node.name) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveSpecialIdent"])(node.name);
    return col;
}
/** Translate a column reference to its lag-N equivalent */ function lagColumn(sqlCol, n) {
    if (n === 0) return sqlCol;
    // Convention: lag_1_price, lag_1_sma_50, etc. stored in technical_indicators
    // Extract the column name after the table alias
    const base = sqlCol.replace(/^ti\./, '').replace(/^cr\./, '');
    if (n === 1) return `ti.lag1_${base}`;
    if (n === 2) return `ti.lag2_${base}`;
    return null; // only lag1 and lag2 stored
}
// ─── Shift handling ───────────────────────────────────────────────────────────
function genWithShift(node, shift, ctx) {
    if (!shift) return genExpr(node, ctx);
    switch(shift.kind){
        case 'bars':
            {
                // @N → use lag column
                const inner = genExprWithLag(node, shift.n, ctx);
                return inner;
            }
        case 'tf':
            {
                if (shift.tf !== 'daily') {
                    ctx.warn(`Timeframe ${shift.tf} not supported on snapshot DB — using daily`);
                }
                return genExpr(node, ctx);
            }
        case 'ticker':
            {
                // Regime filter: (expr)@aapl — generate a correlated sub-query
                return genRegimeFilter(node, shift.sym, ctx);
            }
        case 'fixed':
            {
                // @fixed — suppress shift expansion (used in range loops)
                return genExpr(node, ctx);
            }
        case 'range':
            {
                return genRangeShift(node, shift.from, shift.to, shift.rangeOp, ctx);
            }
    }
}
/** Replace column references in expr with their lagN equivalents */ function genExprWithLag(node, n, ctx) {
    if (n === 0) return genExpr(node, ctx);
    if (node.kind === 'ident') {
        const col = resolveIdentNode(node, ctx);
        if (!col) return 'TRUE';
        const lagged = lagColumn(col.sql, n);
        if (lagged) {
            ctx.needsTechJoin = true;
            return lagged;
        }
        ctx.warn(`Lag ${n} not available for ${node.name}`);
        return col.sql;
    }
    if (node.kind === 'arith') {
        const left = genExprWithLag(node.left, n, ctx);
        const right = genExprWithLag(node.right, n, ctx);
        return `(${left} ${node.op} ${right})`;
    }
    if (node.kind === 'number') return String(node.value);
    // For grouped / complex nodes, fall back to current
    return genExpr(node, ctx);
}
/** Regime filter: expr must hold for a specific ticker/index (scalar sub-query) */ function genRegimeFilter(node, sym, ctx) {
    const indexName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INDIA_INDICES"][sym.toLowerCase()];
    if (!indexName) {
        ctx.warn(`Regime ticker '${sym}' not found in Indian indices — condition dropped`);
        return 'TRUE';
    }
    // Generate: EXISTS (SELECT 1 FROM assets ra JOIN technical_indicators rti …
    //           WHERE ra.name = ? AND <node evaluated against rti>)
    // This is complex; for now we emit a scalar sub-query comparing the column value
    const col = node.kind === 'ident' ? resolveIdentNode(node, ctx) : null;
    if (!col) {
        ctx.warn(`Cannot generate regime filter for complex expression over '${sym}'`);
        return 'TRUE';
    }
    const pIdx = ctx.push(indexName);
    ctx.needsTechJoin = true;
    // Return as a sub-query scalar for use in comparison
    return `(SELECT ${col.sql.replace('ti.', 'rti.')} FROM assets ra JOIN technical_indicators rti ON rti.asset_id = ra.id AND rti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators) WHERE ra.name = $${pIdx} LIMIT 1)`;
}
/** Range shift: @[from..to] (OR) or @{from..to} (AND) */ function genRangeShift(node, from, to, op, ctx) {
    const parts = [];
    for(let i = from; i <= to; i++){
        parts.push(genExprWithLag(node, i, ctx));
    }
    if (parts.length === 0) return 'TRUE';
    const joiner = op === 'or' ? ' OR ' : ' AND ';
    return `(${parts.join(joiner)})`;
}
// ─── Arithmetic ───────────────────────────────────────────────────────────────
function genArith(node, ctx) {
    const left = genExpr(node.left, ctx);
    const right = genExpr(node.right, ctx);
    return `(${left} ${node.op} ${right})`;
}
// ─── Comparison ───────────────────────────────────────────────────────────────
function genCmp(node, ctx) {
    const left = genExpr(node.left, ctx);
    const right = genExpr(node.right, ctx);
    // If one side is a plain number, bind as parameter
    const leftIsNum = node.left.kind === 'number';
    const rightIsNum = node.right.kind === 'number';
    let lSql = left;
    let rSql = right;
    if (leftIsNum) {
        const p = ctx.push(node.left.value);
        lSql = `$${p}`;
    }
    if (rightIsNum) {
        const p = ctx.push(node.right.value);
        rSql = `$${p}`;
    }
    switch(node.op){
        case 'ca':
            // Crossed above: today lhs >= rhs AND yesterday lhs < rhs
            // Using lag1 columns
            return genCrossed(lSql, rSql, node.left, node.right, 'above', ctx);
        case 'cb':
            return genCrossed(lSql, rSql, node.left, node.right, 'below', ctx);
        case '=':
            return `${lSql} = ${rSql}`;
        default:
            return `${lSql} ${node.op} ${rSql}`;
    }
}
/** Crossed above: today lhs >= rhs AND yesterday lhs < rhs */ function genCrossed(lSql, rSql, leftNode, rightNode, dir, ctx) {
    const lag1Left = leftNode.kind === 'number' ? lSql : lagColumn(lSql, 1) ?? lSql;
    const lag1Right = rightNode.kind === 'number' ? rSql : lagColumn(rSql, 1) ?? rSql;
    ctx.needsTechJoin = true;
    if (dir === 'above') {
        // today: lhs >= rhs  AND  yesterday: lhs < rhs
        return `(${lSql} >= ${rSql} AND ${lag1Left} < ${lag1Right})`;
    } else {
        // today: lhs <= rhs  AND  yesterday: lhs > rhs
        return `(${lSql} <= ${rSql} AND ${lag1Left} > ${lag1Right})`;
    }
}
// ─── Special operators ────────────────────────────────────────────────────────
function genSpecial(node, ctx) {
    const subjectSql = genExpr(node.subject, ctx);
    ctx.needsTechJoin = true;
    switch(node.op.kind){
        case 'trend_up':
            {
                // Pre-computed slope flag: ti.trend_up_N = 1
                // Stored as ti.trend_N_<subject> — use ti.slope flag if available
                const n = node.op.n;
                const lag = lagColumn(subjectSql, n);
                if (lag) return `(${subjectSql} > ${lag})`;
                // Fallback: compare to lag1
                const lag1 = lagColumn(subjectSql, 1);
                if (lag1) return `(${subjectSql} > ${lag1})`;
                ctx.warn(`trend_up ${n}: lag column unavailable, using IS NOT NULL`);
                return `${subjectSql} IS NOT NULL`;
            }
        case 'trend_dn':
            {
                const n = node.op.n;
                const lag = lagColumn(subjectSql, n) ?? lagColumn(subjectSql, 1);
                if (lag) return `(${subjectSql} < ${lag})`;
                return `${subjectSql} IS NOT NULL`;
            }
        case 'higher_highs':
            {
                const n = node.op.n;
                // Pre-computed flag: ti.flag_hh_N
                return `(ti.flag_hh_${n} = 1)`;
            }
        case 'higher_closes':
            {
                const n = node.op.n;
                return `(ti.flag_hc_${n} = 1)`;
            }
        case 'risunvol':
            {
                // Rising on unusual volume: price up AND rvol > 1.5
                return `(ti.change_1d_pct > 0 AND ti.rvol > 1.5)`;
            }
        case 'div_bull':
            {
                // Bullish divergence: pre-computed flag
                return `(ti.flag_div_bull = 1)`;
            }
        case 'div_bear':
            {
                return `(ti.flag_div_bear = 1)`;
            }
        case 'nh':
            {
                return `(ti.nh_${node.op.n} = 1)`;
            }
        case 'pp':
            {
                const col = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCall"])('pp', [
                    node.op.n
                ]);
                return col ? `${col.sql} IS NOT NULL` : 'TRUE';
            }
    }
}
// ─── Boolean logic ────────────────────────────────────────────────────────────
function genAnd(node, ctx) {
    const parts = node.children.map((c)=>genExpr(c, ctx)).filter((s)=>s && s !== 'TRUE');
    if (parts.length === 0) return 'TRUE';
    if (parts.length === 1) return parts[0];
    return `(${parts.join(' AND ')})`;
}
function genOr(node, ctx) {
    const parts = node.children.map((c)=>genExpr(c, ctx)).filter((s)=>s && s !== 'TRUE');
    if (parts.length === 0) return 'TRUE';
    if (parts.length === 1) return parts[0];
    return `(${parts.join(' OR ')})`;
}
function genNot(node, ctx) {
    const inner = genExpr(node.child, ctx);
    if (!inner || inner === 'TRUE') return 'FALSE';
    return `NOT (${inner})`;
}
// ─── Scoring  (cond1)+(cond2)+(cond3) >= N ───────────────────────────────────
function genScoring(node, ctx) {
    // SQL: CAST(cond1 AS INT) + CAST(cond2 AS INT) + ... >= N
    const parts = node.conditions.map((c)=>{
        const sql = genExpr(c, ctx);
        return `CASE WHEN (${sql}) THEN 1 ELSE 0 END`;
    });
    const pIdx = ctx.push(node.threshold);
    return `(${parts.join(' + ')} ${node.op} $${pIdx})`;
}
// ─── Universe calls ───────────────────────────────────────────────────────────
function genUniverseCall(node, ctx) {
    switch(node.fn){
        case 'index':
            {
                // Emit as universe constraint (handled by query builder via index_memberships)
                ctx.universe.push({
                    type: 'index',
                    values: node.args
                });
                return 'TRUE';
            }
        case 'type':
            {
                const mapped = node.args.map((v)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TYPE_MAP"][v.toLowerCase()] ?? v.toUpperCase()).filter(Boolean);
                if (mapped.length === 0) return 'TRUE';
                ctx.universe.push({
                    type: 'type',
                    values: mapped
                });
                const placeholders = mapped.map(()=>`$${ctx.push(mapped.shift())}`);
                // Re-push remaining (already consumed above) — redo cleanly:
                ctx.params.splice(ctx.params.length - placeholders.length);
                const phs = [];
                for (const v of mapped.length ? mapped : node.args.map((v)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TYPE_MAP"][v.toLowerCase()] ?? v.toUpperCase())){
                    phs.push(`$${ctx.push(v)}`);
                }
                return `a.asset_class IN (${phs.join(', ')})`;
            }
        case 'exch':
            {
                // India only supports NSE/BSE — filter to EQUITY as default
                // exch(nse) or exch(bse) → approximate as asset_class = 'EQUITY'
                const hasEquity = node.args.some((a)=>[
                        'nse',
                        'bse',
                        'nasdaq',
                        'nyse'
                    ].includes(a.toLowerCase()));
                if (hasEquity) {
                    const p = ctx.push('EQUITY');
                    return `a.asset_class = $${p}`;
                }
                return 'TRUE';
            }
        case 'sector':
            {
                ctx.universe.push({
                    type: 'sector',
                    values: node.args
                });
                const phs = node.args.map((v)=>`$${ctx.push(v)}`);
                return `a.sector IN (${phs.join(', ')})`;
            }
        case 'ticker':
            {
                ctx.universe.push({
                    type: 'ticker',
                    values: node.args
                });
                const phs = node.args.map((v)=>`$${ctx.push(v.toUpperCase())}`);
                return `a.nse_symbol IN (${phs.join(', ')})`;
            }
        case 'hist':
            {
                // hist(mm/dd/yyyy) — historical snapshot screening not supported on live DB
                ctx.warn('hist() historical screening not supported — condition dropped');
                return 'TRUE';
            }
    }
}
// ─── Aggregate functions ─────────────────────────────────────────────────────
function genAgg(node, ctx) {
    const inner = genExpr(node.expr, ctx);
    switch(node.fn){
        case 'max':
            {
                // max(h, 10) → ti.highest_10 if available
                const p = node.period;
                if (inner === 'ti.high_price' && p) return `ti.high_${p}d`;
                if (inner === 'ti.low_price' && p) return `ti.low_${p}d`;
                ctx.needsTechJoin = true;
                ctx.warn(`max(${inner}, ${p}) approximated — ensure column ti.high_${p}d exists`);
                return inner; // fallback
            }
        case 'min':
            {
                const p = node.period;
                if (inner === 'ti.low_price' && p) return `ti.low_${p}d`;
                if (inner === 'ti.high_price' && p) return `ti.high_${p}d`;
                return inner;
            }
        case 'avg':
            {
                const p = node.period;
                // avg(rsi(14), 10) → ti.rsi_avg_10 if available; else drop
                ctx.warn(`avg(${inner}, ${p}) not pre-computed — condition may return all rows`);
                return inner;
            }
        case 'abs':
            {
                return `ABS(${inner})`;
            }
    }
}
// ─── IFF conditional ─────────────────────────────────────────────────────────
function genIff(node, ctx) {
    const cond = genExpr(node.cond, ctx);
    const then_ = genExpr(node.then, ctx);
    const else_ = genExpr(node.else_, ctx);
    return `CASE WHEN (${cond}) THEN ${then_} ELSE ${else_} END`;
}
// ─── Watchlist reference ──────────────────────────────────────────────────────
function genWatchlist(node, ctx) {
    // Watchlists would be stored in a separate table; not implemented yet
    ctx.warn(`Watchlist filter '[${node.name}]' not yet supported — condition dropped`);
    return 'TRUE';
}
// ─── Output directives ────────────────────────────────────────────────────────
function processOutputDirective(node, ctx) {
    switch(node.fn){
        case 'sortby':
            {
                if (node.args.length > 0) {
                    const colSql = genExpr(node.args[0], ctx);
                    ctx.sort = {
                        sql: colSql,
                        dir: node.dir ?? 'asc',
                        limit: node.limit
                    };
                }
                return 'TRUE';
            }
        case 'show':
            {
                for(let i = 0; i < node.args.length; i++){
                    const colSql = genExpr(node.args[i], ctx);
                    ctx.show.push({
                        sql: colSql,
                        alias: node.alias
                    });
                }
                return 'TRUE';
            }
        case 'draw':
            {
                // draw() is a chart-only directive — no SQL effect
                return 'TRUE';
            }
    }
}
// ─── type() helper — clean version ───────────────────────────────────────────
function genTypeCall(args, ctx) {
    const mapped = [];
    for (const v of args){
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$column$2d$map$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TYPE_MAP"][v.toLowerCase()];
        if (m) mapped.push(m);
    }
    if (mapped.length === 0) return 'TRUE';
    const phs = mapped.map((v)=>`$${ctx.push(v)}`);
    return `a.asset_class IN (${phs.join(', ')})`;
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/dsl/parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$codegen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/dsl/codegen.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
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
        // ── DSL formula conditions ───────────────────────────────────────────────
        if (filters.formula && filters.formula.length > 0) {
            for (const dsl of filters.formula){
                if (typeof dsl === "string" && dsl.trim()) {
                    try {
                        const ast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDsl"])(dsl);
                        const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$dsl$2f$codegen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["codegenFormula"])(ast);
                        // Map the params and re-index placeholders ($1, $2...)
                        const offset = params.length;
                        let sqlFragment = res.conditions.join(" AND ");
                        res.params.forEach((p, i)=>{
                            params.push(p);
                            const oldIndex = i + 1;
                            const newIndex = params.length;
                            // Replace $N with the new index safely using regex
                            sqlFragment = sqlFragment.replace(new RegExp(`\\$${oldIndex}(?![0-9])`, 'g'), `__TEMP_PH_${newIndex}__`);
                        });
                        // Final swap to avoid collision ($ symbol needs escaping in some JS contexts, but here it is just a string)
                        sqlFragment = sqlFragment.replace(/__TEMP_PH_(\d+)__/g, "$$$1");
                        if (sqlFragment) {
                            where.push(`(${sqlFragment})`);
                        }
                    } catch (e) {
                        console.error("DSL parse error for:", dsl, e);
                    }
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
        ti.sma_20            AS sma20,
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
                sma20: r.sma20,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__95b7e05b._.js.map