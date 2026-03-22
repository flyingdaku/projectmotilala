(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(app)/portfolio/performance/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PerformancePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PERF_DATA = Array.from({
    length: 24
}, (_, i)=>{
    const date = new Date(2023, 3 + i, 1);
    const portfolio = 1000000 * Math.pow(1 + 0.015 + Math.sin(i * 0.4) * 0.02, i);
    const nifty = 1000000 * Math.pow(1 + 0.012 + Math.cos(i * 0.3) * 0.015, i);
    return {
        month: date.toLocaleDateString("en-IN", {
            month: "short",
            year: "2-digit"
        }),
        portfolio: Math.round(portfolio),
        nifty: Math.round(nifty),
        drawdown: Math.min(0, (Math.sin(i * 0.6) - 0.5) * 0.08) * 100
    };
});
const HOLDINGS_PERF = [
    {
        symbol: "INFY",
        name: "Infosys Ltd",
        weight: 18.4,
        invested: 86225,
        current: 102480,
        xirr: 24.8,
        pnl: 16255
    },
    {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        weight: 14.2,
        invested: 28914,
        current: 34200,
        xirr: 19.2,
        pnl: 5286
    },
    {
        symbol: "WIPRO",
        name: "Wipro Ltd",
        weight: 12.8,
        invested: 102560,
        current: 94200,
        xirr: -8.4,
        pnl: -8360
    },
    {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance",
        weight: 10.4,
        invested: 36170,
        current: 44820,
        xirr: 28.6,
        pnl: 8650
    },
    {
        symbol: "SUNPHARMA",
        name: "Sun Pharma",
        weight: 9.6,
        invested: 49269,
        current: 62400,
        xirr: 32.4,
        pnl: 13131
    }
];
const SUMMARY = {
    invested: 748000,
    current: 892400,
    pnl: 144400,
    pnlPct: 19.3,
    xirr: 22.4,
    alpha: 4.2,
    beta: 0.94,
    sharpe: 1.42
};
function PerformancePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "bf9874ff0411ba41e00eb677b61424b0a5b970000d34e1a7512128beb2607a71") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bf9874ff0411ba41e00eb677b61424b0a5b970000d34e1a7512128beb2607a71";
    }
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("2Y");
    let t0;
    if ($[1] !== period) {
        t0 = period === "1Y" ? PERF_DATA.slice(-12) : period === "2Y" ? PERF_DATA : PERF_DATA;
        $[1] = period;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const slicedData = t0;
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-xl font-semibold mb-1",
            style: {
                color: "var(--text-primary)"
            },
            children: "Portfolio Performance"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    style: {
                        color: "var(--text-muted)"
                    },
                    children: "Risk-adjusted returns, XIRR, and benchmark comparison."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 104,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            label: "Portfolio Value",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(SUMMARY.current),
            sub: `Invested ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(SUMMARY.invested)}`,
            color: "var(--text-primary)"
        };
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
            children: [
                t3,
                {
                    label: "Total P&L",
                    value: `+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(SUMMARY.pnl)}`,
                    sub: `+${SUMMARY.pnlPct}% overall`,
                    color: "#10B981"
                },
                {
                    label: "XIRR",
                    value: `${SUMMARY.xirr}%`,
                    sub: `Alpha ${SUMMARY.alpha}% vs Nifty`,
                    color: "#F59E0B"
                },
                {
                    label: "Sharpe Ratio",
                    value: SUMMARY.sharpe,
                    sub: `Beta ${SUMMARY.beta}`,
                    color: "var(--text-primary)"
                }
            ].map(_PerformancePageAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "Portfolio vs Nifty 50"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 157,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = [
            "1Y",
            "2Y",
            "MAX"
        ];
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] !== period) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-4",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1",
                    children: t7.map({
                        "PerformancePage[(anonymous)()]": (p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "PerformancePage[(anonymous)() > <button>.onClick]": ()=>setPeriod(p)
                                }["PerformancePage[(anonymous)() > <button>.onClick]"],
                                className: "px-3 py-1 rounded text-xs font-medium transition-colors",
                                style: {
                                    background: period === p ? "var(--accent-subtle)" : "transparent",
                                    color: period === p ? "var(--accent-brand)" : "var(--text-muted)",
                                    border: `1px solid ${period === p ? "var(--accent-brand)" : "var(--border)"}`
                                },
                                children: p
                            }, p, false, {
                                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                                lineNumber: 174,
                                columnNumber: 50
                            }, this)
                    }["PerformancePage[(anonymous)()]"])
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 173,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 173,
            columnNumber: 10
        }, this);
        $[10] = period;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            top: 4,
            right: 8,
            left: 8,
            bottom: 0
        };
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
            id: "portGrad",
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "5%",
                    stopColor: "#F59E0B",
                    stopOpacity: 0.3
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 201,
                    columnNumber: 69
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "95%",
                    stopColor: "#F59E0B",
                    stopOpacity: 0
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 201,
                    columnNumber: 127
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    let t12;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "niftyGrad",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "5%",
                            stopColor: "#3B82F6",
                            stopOpacity: 0.2
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                            lineNumber: 209,
                            columnNumber: 81
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "95%",
                            stopColor: "#3B82F6",
                            stopOpacity: 0
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                            lineNumber: 209,
                            columnNumber: 139
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 209,
                    columnNumber: 22
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
            strokeDasharray: "3 3",
            vertical: false,
            stroke: "var(--border)",
            opacity: 0.4
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[14] = t11;
        $[15] = t12;
    } else {
        t11 = $[14];
        t12 = $[15];
    }
    let t13;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "month",
            tick: {
                fontSize: 10,
                fill: "var(--text-muted)"
            },
            tickLine: false,
            axisLine: false
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[16] = t13;
    } else {
        t13 = $[16];
    }
    let t14;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
            tick: {
                fontSize: 10,
                fill: "var(--text-muted)"
            },
            tickLine: false,
            axisLine: false,
            width: 60,
            tickFormatter: _PerformancePageYAxisTickFormatter
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    let t15;
    let t16;
    let t17;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            contentStyle: {
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 11
            },
            formatter: _PerformancePageTooltipFormatter
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            type: "monotone",
            dataKey: "portfolio",
            stroke: "#F59E0B",
            fill: "url(#portGrad)",
            strokeWidth: 2,
            dot: false,
            name: "Portfolio"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 247,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            type: "monotone",
            dataKey: "nifty",
            stroke: "#3B82F6",
            fill: "url(#niftyGrad)",
            strokeWidth: 1.5,
            dot: false,
            name: "Nifty 50",
            strokeDasharray: "4 2"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[18] = t15;
        $[19] = t16;
        $[20] = t17;
    } else {
        t15 = $[18];
        t16 = $[19];
        t17 = $[20];
    }
    let t18;
    if ($[21] !== slicedData) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: slicedData,
                    margin: t9,
                    children: [
                        t11,
                        t12,
                        t13,
                        t14,
                        t15,
                        t16,
                        t17
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 259,
                    columnNumber: 81
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 259,
                columnNumber: 33
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[21] = slicedData;
        $[22] = t18;
    } else {
        t18 = $[22];
    }
    let t19;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-6 h-0.5 inline-block rounded",
                    style: {
                        background: "#F59E0B"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 267,
                    columnNumber: 55
                }, this),
                "Portfolio"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[23] = t19;
    } else {
        t19 = $[23];
    }
    let t20;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4 mt-3 text-xs",
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-6 h-px inline-block rounded border-t-2 border-dashed",
                            style: {
                                borderColor: "#3B82F6"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                            lineNumber: 276,
                            columnNumber: 114
                        }, this),
                        "Nifty 50"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 276,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[24] = t20;
    } else {
        t20 = $[24];
    }
    let t21;
    if ($[25] !== t18 || $[26] !== t8) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border p-4",
            style: t5,
            children: [
                t8,
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 285,
            columnNumber: 11
        }, this);
        $[25] = t18;
        $[26] = t8;
        $[27] = t21;
    } else {
        t21 = $[27];
    }
    let t22;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = {
            borderColor: "var(--border)"
        };
        $[28] = t22;
    } else {
        t22 = $[28];
    }
    let t23;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 border-b text-sm font-semibold",
            style: {
                background: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-primary)"
            },
            children: "Top Holdings Performance"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 303,
            columnNumber: 11
        }, this);
        $[29] = t23;
    } else {
        t23 = $[29];
    }
    let t24;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border overflow-hidden",
            style: t22,
            children: [
                t23,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    background: "var(--surface-elevated)",
                                    borderBottom: "1px solid var(--border)"
                                },
                                children: [
                                    "Symbol",
                                    "Weight",
                                    "Invested",
                                    "Current",
                                    "P&L",
                                    "XIRR"
                                ].map(_PerformancePageAnonymous2)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                                lineNumber: 314,
                                columnNumber: 120
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                            lineNumber: 314,
                            columnNumber: 113
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: HOLDINGS_PERF.map(_PerformancePageHOLDINGS_PERFMap)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                            lineNumber: 317,
                            columnNumber: 119
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                    lineNumber: 314,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[30] = t24;
    } else {
        t24 = $[30];
    }
    let t25;
    if ($[31] !== t21) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20",
            children: [
                t2,
                t4,
                t21,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[31] = t21;
        $[32] = t25;
    } else {
        t25 = $[32];
    }
    return t25;
}
_s(PerformancePage, "VtbhpkEuvgWuSeTsLu+vkJ9ZVBw=");
_c = PerformancePage;
function _PerformancePageHOLDINGS_PERFMap(h_0, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        style: {
            borderBottom: i < HOLDINGS_PERF.length - 1 ? "1px solid var(--border)" : "none",
            background: "var(--surface)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: h_0.symbol
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                        lineNumber: 336,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px]",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: h_0.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                        lineNumber: 338,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 336,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-right px-4 py-3 font-mono",
                style: {
                    color: "var(--text-secondary)"
                },
                children: [
                    h_0.weight,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 340,
                columnNumber: 31
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-right px-4 py-3 font-mono",
                style: {
                    color: "var(--text-secondary)"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(h_0.invested)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 342,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-right px-4 py-3 font-mono font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(h_0.current)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 344,
                columnNumber: 38
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `text-right px-4 py-3 font-mono font-semibold ${h_0.pnl >= 0 ? "text-emerald-500" : "text-rose-500"}`,
                children: [
                    h_0.pnl >= 0 ? "+" : "",
                    "₹",
                    Math.abs(h_0.pnl).toLocaleString("en-IN")
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 346,
                columnNumber: 37
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `text-right px-4 py-3 font-mono font-bold ${h_0.xirr >= 0 ? "text-emerald-500" : "text-rose-500"}`,
                children: [
                    h_0.xirr >= 0 ? "+" : "",
                    h_0.xirr,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 346,
                columnNumber: 229
            }, this)
        ]
    }, h_0.symbol, true, {
        fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
        lineNumber: 333,
        columnNumber: 10
    }, this);
}
function _PerformancePageAnonymous2(h) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: `py-2.5 font-semibold ${h === "Symbol" ? "text-left px-4" : "text-right px-4"}`,
        style: {
            color: "var(--text-muted)"
        },
        children: h
    }, h, false, {
        fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
        lineNumber: 349,
        columnNumber: 10
    }, this);
}
function _PerformancePageTooltipFormatter(v_0) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(v_0)
    ];
}
function _PerformancePageYAxisTickFormatter(v) {
    return `₹${(v / 100000).toFixed(1)}L`;
}
function _PerformancePageAnonymous(t0) {
    const { label, value, sub, color } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl p-4 border",
        style: {
            background: "var(--surface)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-medium mb-1",
                style: {
                    color: "var(--text-muted)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 369,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xl font-bold font-mono",
                style: {
                    color
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 371,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] mt-1",
                style: {
                    color: "var(--text-muted)"
                },
                children: sub
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
                lineNumber: 373,
                columnNumber: 21
            }, this)
        ]
    }, label, true, {
        fileName: "[project]/src/app/(app)/portfolio/performance/page.tsx",
        lineNumber: 366,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "PerformancePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28app%29_portfolio_performance_page_tsx_2954868b._.js.map