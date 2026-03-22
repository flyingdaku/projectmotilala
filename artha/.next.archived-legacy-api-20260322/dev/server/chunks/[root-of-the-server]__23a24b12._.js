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
"[project]/src/lib/dashboard/presets.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Preset widget definitions — shipped with first-visit seeding
 */ __turbopack_context__.s([
    "DEFAULT_PRESET_IDS",
    ()=>DEFAULT_PRESET_IDS,
    "PRESET_CATEGORIES",
    ()=>PRESET_CATEGORIES,
    "PRESET_WIDGETS",
    ()=>PRESET_WIDGETS,
    "getPresetById",
    ()=>getPresetById
]);
// ── Shared column helpers ────────────────────────────────────────────────────
const COL_SYMBOL = {
    id: 'symbol',
    label: 'Symbol',
    dslName: 'symbol',
    dbColumn: 'a.nse_symbol',
    format: 'text'
};
const COL_NAME = {
    id: 'name',
    label: 'Name',
    dslName: 'name',
    dbColumn: 'a.name',
    format: 'text'
};
const COL_SECTOR = {
    id: 'sector',
    label: 'Sector',
    dslName: 'sector',
    dbColumn: 'a.sector',
    format: 'text'
};
const COL_CLOSE = {
    id: 'close',
    label: 'Price',
    dslName: 'price',
    dbColumn: 'ti.close',
    format: 'currency',
    colorCode: false
};
const COL_CHANGE_1D = {
    id: 'change_1d',
    label: '% Change',
    dslName: 'change_1d_pct',
    dbColumn: 'ti.change_1d_pct',
    format: 'percent',
    colorCode: true
};
const COL_VOLUME = {
    id: 'volume',
    label: 'Volume',
    dslName: 'volume',
    dbColumn: 'ti.volume',
    format: 'number'
};
const COL_MCAP = {
    id: 'mcap',
    label: 'Mkt Cap (Cr)',
    dslName: 'mcap',
    dbColumn: 'cr.market_cap_cr',
    format: 'currency'
};
const COL_PE = {
    id: 'pe',
    label: 'P/E',
    dslName: 'pe',
    dbColumn: 'cr.pe_ttm',
    format: 'number',
    colorCode: true
};
const COL_ROE = {
    id: 'roe',
    label: 'ROE %',
    dslName: 'roe',
    dbColumn: 'cr.roe',
    format: 'percent',
    colorCode: true
};
const COL_ROCE = {
    id: 'roce',
    label: 'ROCE %',
    dslName: 'roce',
    dbColumn: 'cr.roce',
    format: 'percent',
    colorCode: true
};
const COL_RSI = {
    id: 'rsi',
    label: 'RSI(14)',
    dslName: 'rsi',
    dbColumn: 'ti.rsi_14',
    format: 'number',
    colorCode: true
};
const COL_52W_HIGH = {
    id: 'pct_52w_high',
    label: '% from 52W High',
    dslName: 'pctFrom52wHigh',
    dbColumn: 'ti.pct_from_52w_high',
    format: 'percent',
    colorCode: true
};
const COL_52W_LOW = {
    id: 'pct_52w_low',
    label: '% from 52W Low',
    dslName: 'pctFrom52wLow',
    dbColumn: 'ti.pct_from_52w_low',
    format: 'percent',
    colorCode: true
};
const COL_DIV_YIELD = {
    id: 'div_yield',
    label: 'Div Yield %',
    dslName: 'div_yield',
    dbColumn: 'cr.dividend_yield',
    format: 'percent',
    colorCode: true
};
const COL_DEBT_EQ = {
    id: 'de',
    label: 'D/E',
    dslName: 'de',
    dbColumn: 'cr.debt_equity',
    format: 'number'
};
const COL_REV_G = {
    id: 'rev_g1y',
    label: 'Rev Gr % (1Y)',
    dslName: 'rev_g1y',
    dbColumn: 'cr.revenue_growth_1y',
    format: 'percent',
    colorCode: true
};
const PRESET_WIDGETS = [
    {
        id: 'top_gainers',
        name: 'Top Gainers',
        description: 'Stocks with highest % price gain today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_CHANGE_1D,
                COL_CLOSE,
                COL_VOLUME
            ],
            filters: {},
            sortColumn: 'change_1d_pct',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'change_1d_pct',
                yAxis: 'symbol',
                colorField: 'change_1d_pct'
            }
        }
    },
    {
        id: 'top_losers',
        name: 'Top Losers',
        description: 'Stocks with biggest % price decline today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_CHANGE_1D,
                COL_CLOSE,
                COL_VOLUME
            ],
            filters: {},
            sortColumn: 'change_1d_pct',
            sortDirection: 'asc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'change_1d_pct',
                yAxis: 'symbol',
                colorField: 'change_1d_pct'
            }
        }
    },
    {
        id: 'sector_performance',
        name: 'Sector Performance',
        description: 'Average % change by sector today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SECTOR,
                {
                    id: 'avg_change',
                    label: 'Avg % Change',
                    dslName: 'change_1d_pct',
                    dbColumn: 'ti.change_1d_pct',
                    aggregation: 'avg',
                    format: 'percent',
                    colorCode: true
                }
            ],
            filters: {},
            groupColumn: 'sector',
            sortColumn: 'avg_change',
            sortDirection: 'desc',
            limit: 25,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'avg_change',
                yAxis: 'sector',
                colorField: 'avg_change'
            }
        }
    },
    {
        id: 'volume_leaders',
        name: 'Volume Leaders',
        description: 'Top stocks by trading volume today',
        widget_type: 'bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_VOLUME,
                COL_CLOSE,
                COL_CHANGE_1D
            ],
            filters: {},
            sortColumn: 'volume',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'symbol',
                yAxis: 'volume'
            }
        }
    },
    {
        id: 'near_52w_high',
        name: 'Near 52-Week High',
        description: 'Stocks within 5% of their 52-week high',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_52W_HIGH,
                COL_SECTOR
            ],
            filters: {
                pctFrom52wHighMax: 5
            },
            sortColumn: 'pct_from_52w_high',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'near_52w_low',
        name: 'Near 52-Week Low',
        description: 'Stocks within 10% of their 52-week low',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_52W_LOW,
                COL_SECTOR
            ],
            filters: {
                pctFrom52wLowMax: 10
            },
            sortColumn: 'pct_from_52w_low',
            sortDirection: 'asc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'mcap_distribution',
        name: 'Market Cap by Sector',
        description: 'Total market capitalisation distribution across sectors',
        widget_type: 'pie',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SECTOR,
                {
                    id: 'total_mcap',
                    label: 'Total Mkt Cap (Cr)',
                    dslName: 'mcap',
                    dbColumn: 'cr.market_cap_cr',
                    aggregation: 'sum',
                    format: 'currency'
                }
            ],
            filters: {},
            groupColumn: 'sector',
            sortColumn: 'total_mcap',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                colorField: 'sector',
                donut: true,
                showLegend: true
            }
        }
    },
    {
        id: 'oversold_rsi',
        name: 'Oversold (RSI < 30)',
        description: 'Technically oversold stocks — RSI below 30',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_RSI,
                COL_SECTOR
            ],
            filters: {
                rsi14Max: 30
            },
            sortColumn: 'rsi_14',
            sortDirection: 'asc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'high_roce',
        name: 'High ROCE Leaders',
        description: 'Stocks with ROCE > 20% and low debt',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_ROCE,
                COL_ROE,
                COL_PE,
                COL_DEBT_EQ,
                COL_MCAP,
                COL_SECTOR
            ],
            filters: {
                roceMin: 20,
                debtEquityMax: 0.5
            },
            sortColumn: 'roce',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'dividend_champions',
        name: 'Dividend Champions',
        description: 'High dividend yield stocks with strong ROCE',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_DIV_YIELD,
                COL_ROCE,
                COL_PE,
                COL_CLOSE,
                COL_SECTOR
            ],
            filters: {
                dividendYieldMin: 2,
                roceMin: 15
            },
            sortColumn: 'div_yield',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'revenue_growth',
        name: 'Revenue Growth Leaders',
        description: 'Top stocks by 1-year revenue growth',
        widget_type: 'bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_REV_G,
                COL_ROE,
                COL_MCAP
            ],
            filters: {
                marketCapCrMin: 500,
                revenueGrowth1yMin: 15
            },
            sortColumn: 'rev_g1y',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'symbol',
                yAxis: 'rev_g1y',
                colorField: 'rev_g1y'
            }
        }
    },
    {
        id: 'undervalued_gems',
        name: 'Undervalued Gems',
        description: 'PE < 15, ROE > 15%',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_PE,
                COL_ROE,
                COL_ROCE,
                COL_DEBT_EQ
            ],
            filters: {
                peTtmMax: 15,
                roeMin: 15
            },
            sortColumn: 'roe',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'roe_leaders',
        name: 'ROE Leaders',
        description: 'Top stocks ranked by Return on Equity',
        widget_type: 'horizontal_bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_ROE,
                COL_ROCE,
                COL_PE
            ],
            filters: {
                roeMin: 15
            },
            sortColumn: 'roe',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'roe',
                yAxis: 'symbol',
                colorField: 'roe'
            }
        }
    },
    {
        id: 'low_pe',
        name: 'Low P/E Value Picks',
        description: 'Stocks with P/E below 15 — potential value plays',
        widget_type: 'horizontal_bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_PE,
                COL_ROE,
                COL_ROCE
            ],
            filters: {
                peTtmMax: 15,
                peTtmMin: 1
            },
            sortColumn: 'pe',
            sortDirection: 'asc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'pe',
                yAxis: 'symbol',
                colorField: 'pe'
            }
        }
    }
];
const DEFAULT_PRESET_IDS = [
    'high_roce',
    'undervalued_gems',
    'roe_leaders',
    'low_pe'
];
function getPresetById(id) {
    return PRESET_WIDGETS.find((p)=>p.id === id);
}
const PRESET_CATEGORIES = [
    ...new Set(PRESET_WIDGETS.map((p)=>p.category))
];
}),
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
/**
 * GET  /api/dashboard  — list user's dashboards
 * POST /api/dashboard  — create a new dashboard
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/db-postgres.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/presets.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function GET() {
    const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthenticatedUserId"])();
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unauthorized'
    }, {
        status: 401
    });
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryAll(`SELECT d.id, d.name, d.is_default, d.updated_at,
              COUNT(w.id)::text AS widget_count
       FROM user_dashboards d
       LEFT JOIN user_widgets w ON w.dashboard_id = d.id
       WHERE d.user_id = $1
       GROUP BY d.id
       ORDER BY d.is_default DESC, d.updated_at DESC`, [
            userId
        ]);
        // First visit: seed a default dashboard
        if (rows.length === 0) {
            const seeded = await seedDefaultDashboard(userId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                dashboards: [
                    seeded
                ]
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            dashboards: rows.map((r)=>({
                    ...r,
                    widget_count: parseInt(r.widget_count, 10)
                }))
        });
    } catch (err) {
        console.error('[GET /api/dashboard]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthenticatedUserId"])();
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unauthorized'
    }, {
        status: 401
    });
    try {
        const body = await req.json();
        const name = body.name?.trim() || 'My Dashboard';
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
       VALUES ($1, $2, false, '[]'::jsonb)
       RETURNING id, name, is_default, updated_at`, [
            userId,
            name
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            dashboard: {
                ...row,
                widget_count: 0
            }
        }, {
            status: 201
        });
    } catch (err) {
        console.error('[POST /api/dashboard]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
// ── Seed helper ───────────────────────────────────────────────────────────────
async function seedDefaultDashboard(userId) {
    const dashboard = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
     VALUES ($1, 'My Dashboard', true, $2::jsonb)
     RETURNING id`, [
        userId,
        JSON.stringify(buildDefaultLayout())
    ]);
    if (!dashboard) throw new Error('Failed to seed dashboard');
    const presets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_PRESET_IDS"].map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].find((p)=>p.id === id)).filter(Boolean);
    for(let i = 0; i < presets.length; i++){
        const p = presets[i];
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$db$2d$postgres$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgDb"].queryOne(`INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
       VALUES ($1, $2, $3, $4::jsonb, $5)`, [
            dashboard.id,
            p.widget_type,
            p.name,
            JSON.stringify(p.config),
            i
        ]);
    }
    return {
        id: dashboard.id,
        name: 'My Dashboard',
        is_default: true,
        widget_count: presets.length,
        updated_at: new Date().toISOString()
    };
}
function buildDefaultLayout() {
    return [
        {
            i: '__placeholder__',
            x: 0,
            y: 0,
            w: 6,
            h: 4,
            minW: 3,
            minH: 2
        },
        {
            i: '__placeholder2__',
            x: 6,
            y: 0,
            w: 6,
            h: 4,
            minW: 3,
            minH: 2
        },
        {
            i: '__placeholder3__',
            x: 0,
            y: 4,
            w: 6,
            h: 5,
            minW: 3,
            minH: 2
        },
        {
            i: '__placeholder4__',
            x: 6,
            y: 4,
            w: 6,
            h: 5,
            minW: 3,
            minH: 2
        }
    ];
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__23a24b12._.js.map