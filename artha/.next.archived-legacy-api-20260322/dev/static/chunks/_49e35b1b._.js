(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/pnl-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PnLBadge",
    ()=>PnLBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function PnLBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "f381e5e7e122c1d7c5e5b031a4169b72bb878f431c84b45b85ca080ac301c1ed") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f381e5e7e122c1d7c5e5b031a4169b72bb878f431c84b45b85ca080ac301c1ed";
    }
    const { value, type, className } = t0;
    const isPositive = value >= 0;
    const arrow = isPositive ? "\u2191" : "\u2193";
    let t1;
    if ($[1] !== arrow || $[2] !== type || $[3] !== value) {
        t1 = type === "percent" ? `${arrow} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(value)}` : `${arrow} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(value)}`;
        $[1] = arrow;
        $[2] = type;
        $[3] = value;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const label = t1;
    const t2 = isPositive ? "text-[var(--positive)] bg-[var(--positive-subtle)]" : "text-[var(--negative)] bg-[var(--negative-subtle)]";
    let t3;
    if ($[5] !== className || $[6] !== t2) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium font-mono whitespace-nowrap", t2, className);
        $[5] = className;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== label || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t3,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/ui/pnl-badge.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[8] = label;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return t4;
}
_c = PnLBadge;
var _c;
__turbopack_context__.k.register(_c, "PnLBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allocationData",
    ()=>allocationData,
    "annualReturns",
    ()=>annualReturns,
    "capitalGainsData",
    ()=>capitalGainsData,
    "generatePerformanceData",
    ()=>generatePerformanceData,
    "harvestingOpportunities",
    ()=>harvestingOpportunities,
    "heatmapCols",
    ()=>heatmapCols,
    "heatmapData",
    ()=>heatmapData,
    "heatmapRows",
    ()=>heatmapRows,
    "holdingsData",
    ()=>holdingsData,
    "topMovers",
    ()=>topMovers,
    "upcomingEvents",
    ()=>upcomingEvents
]);
function generatePerformanceData(months = 12) {
    const data = [];
    let portfolio = 4000000;
    let nifty = 4000000;
    const now = new Date();
    for(let i = months; i >= 0; i--){
        const d = new Date(now);
        d.setMonth(d.getMonth() - i);
        portfolio *= 1 + (Math.random() * 0.06 - 0.02);
        nifty *= 1 + (Math.random() * 0.05 - 0.02);
        data.push({
            date: d.toISOString().slice(0, 10),
            portfolio: Math.round(portfolio),
            nifty: Math.round(nifty)
        });
    }
    return data;
}
const allocationData = [
    {
        name: "Large Cap Equity",
        value: 2200000,
        percent: 45.4
    },
    {
        name: "Mid Cap Equity",
        value: 980000,
        percent: 20.2
    },
    {
        name: "Debt Funds",
        value: 720000,
        percent: 14.9
    },
    {
        name: "International",
        value: 480000,
        percent: 9.9
    },
    {
        name: "Gold",
        value: 310000,
        percent: 6.4
    },
    {
        name: "Cash",
        value: 160000,
        percent: 3.3
    }
];
const holdingsData = [
    {
        id: "1",
        symbol: "RELIANCE",
        company: "Reliance Industries Ltd",
        exchange: "NSE",
        qty: 50,
        avgCost: 2450.0,
        ltp: 2891.5,
        value: 144575,
        pnl: 22075,
        pnlPct: 18.0,
        xirr: 22.4,
        daysHeld: 420,
        isLTCG: true
    },
    {
        id: "2",
        symbol: "INFY",
        company: "Infosys Ltd",
        exchange: "NSE",
        qty: 120,
        avgCost: 1580.0,
        ltp: 1724.3,
        value: 206916,
        pnl: 17316,
        pnlPct: 9.1,
        xirr: 11.2,
        daysHeld: 380,
        isLTCG: true
    },
    {
        id: "3",
        symbol: "HDFCBANK",
        company: "HDFC Bank Ltd",
        exchange: "NSE",
        qty: 80,
        avgCost: 1620.0,
        ltp: 1543.8,
        value: 123504,
        pnl: -6096,
        pnlPct: -4.7,
        xirr: -5.8,
        daysHeld: 290,
        isLTCG: false
    },
    {
        id: "4",
        symbol: "TCS",
        company: "Tata Consultancy Services",
        exchange: "NSE",
        qty: 30,
        avgCost: 3820.0,
        ltp: 4156.2,
        value: 124686,
        pnl: 10086,
        pnlPct: 8.8,
        xirr: 14.1,
        daysHeld: 195,
        isLTCG: false
    },
    {
        id: "5",
        symbol: "WIPRO",
        company: "Wipro Ltd",
        exchange: "BSE",
        qty: 200,
        avgCost: 445.0,
        ltp: 512.6,
        value: 102520,
        pnl: 13520,
        pnlPct: 15.2,
        xirr: 19.8,
        daysHeld: 340,
        isLTCG: false
    },
    {
        id: "6",
        symbol: "BAJFINANCE",
        company: "Bajaj Finance Ltd",
        exchange: "NSE",
        qty: 15,
        avgCost: 6800.0,
        ltp: 7234.5,
        value: 108518,
        pnl: 6518,
        pnlPct: 6.4,
        xirr: 8.9,
        daysHeld: 410,
        isLTCG: true
    },
    {
        id: "7",
        symbol: "AXISBANK",
        company: "Axis Bank Ltd",
        exchange: "NSE",
        qty: 100,
        avgCost: 1050.0,
        ltp: 1124.8,
        value: 112480,
        pnl: 7480,
        pnlPct: 7.1,
        xirr: 9.4,
        daysHeld: 450,
        isLTCG: true
    },
    {
        id: "8",
        symbol: "MARUTI",
        company: "Maruti Suzuki India Ltd",
        exchange: "NSE",
        qty: 10,
        avgCost: 10200.0,
        ltp: 9876.4,
        value: 98764,
        pnl: -3236,
        pnlPct: -3.2,
        xirr: -4.1,
        daysHeld: 120,
        isLTCG: false
    }
];
const topMovers = [
    {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        changePct: 3.2,
        pnl: 4512
    },
    {
        symbol: "INFY",
        name: "Infosys",
        changePct: 2.1,
        pnl: 2890
    },
    {
        symbol: "TCS",
        name: "Tata Consultancy",
        changePct: -1.4,
        pnl: -1820
    },
    {
        symbol: "HDFCBANK",
        name: "HDFC Bank",
        changePct: -0.8,
        pnl: -980
    },
    {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance",
        changePct: 1.7,
        pnl: 1840
    }
];
const upcomingEvents = [
    {
        type: "tax",
        title: "LTCG Exemption Deadline",
        desc: "₹1.25L exemption resets on 31 Mar",
        date: "31 Mar 2026",
        urgent: true
    },
    {
        type: "sip",
        title: "SIP Due — Axis Bluechip",
        desc: "₹5,000 SIP on 5th of every month",
        date: "5 Mar 2026",
        urgent: false
    },
    {
        type: "elss",
        title: "ELSS Lock-in Expiry",
        desc: "Axis Long Term Equity — ₹50,000",
        date: "14 Mar 2026",
        urgent: false
    },
    {
        type: "tax",
        title: "Advance Tax Due",
        desc: "Q4 advance tax payment deadline",
        date: "15 Mar 2026",
        urgent: false
    }
];
const annualReturns = [
    {
        year: "FY20",
        portfolio: -12.4,
        nifty: -26.0
    },
    {
        year: "FY21",
        portfolio: 68.2,
        nifty: 71.0
    },
    {
        year: "FY22",
        portfolio: 22.1,
        nifty: 18.9
    },
    {
        year: "FY23",
        portfolio: -4.8,
        nifty: -0.6
    },
    {
        year: "FY24",
        portfolio: 38.4,
        nifty: 29.0
    },
    {
        year: "FY25",
        portfolio: 18.2,
        nifty: 5.1
    }
];
const heatmapRows = [
    "Large Cap",
    "Mid Cap",
    "Small Cap",
    "Debt",
    "Gold",
    "Intl"
];
const heatmapCols = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025"
];
const heatmapData = [
    {
        row: "Large Cap",
        col: "2019",
        value: 14.9
    },
    {
        row: "Large Cap",
        col: "2020",
        value: 15.1
    },
    {
        row: "Large Cap",
        col: "2021",
        value: 24.1
    },
    {
        row: "Large Cap",
        col: "2022",
        value: 5.0
    },
    {
        row: "Large Cap",
        col: "2023",
        value: 20.3
    },
    {
        row: "Large Cap",
        col: "2024",
        value: 13.9
    },
    {
        row: "Large Cap",
        col: "2025",
        value: 4.2
    },
    {
        row: "Mid Cap",
        col: "2019",
        value: 0.5
    },
    {
        row: "Mid Cap",
        col: "2020",
        value: 22.3
    },
    {
        row: "Mid Cap",
        col: "2021",
        value: 39.4
    },
    {
        row: "Mid Cap",
        col: "2022",
        value: 4.8
    },
    {
        row: "Mid Cap",
        col: "2023",
        value: 32.7
    },
    {
        row: "Mid Cap",
        col: "2024",
        value: 24.6
    },
    {
        row: "Mid Cap",
        col: "2025",
        value: -8.1
    },
    {
        row: "Small Cap",
        col: "2019",
        value: -7.3
    },
    {
        row: "Small Cap",
        col: "2020",
        value: 28.9
    },
    {
        row: "Small Cap",
        col: "2021",
        value: 63.7
    },
    {
        row: "Small Cap",
        col: "2022",
        value: 2.8
    },
    {
        row: "Small Cap",
        col: "2023",
        value: 47.2
    },
    {
        row: "Small Cap",
        col: "2024",
        value: 22.1
    },
    {
        row: "Small Cap",
        col: "2025",
        value: -14.6
    },
    {
        row: "Debt",
        col: "2019",
        value: 9.8
    },
    {
        row: "Debt",
        col: "2020",
        value: 11.2
    },
    {
        row: "Debt",
        col: "2021",
        value: 4.1
    },
    {
        row: "Debt",
        col: "2022",
        value: 3.9
    },
    {
        row: "Debt",
        col: "2023",
        value: 7.2
    },
    {
        row: "Debt",
        col: "2024",
        value: 8.1
    },
    {
        row: "Debt",
        col: "2025",
        value: 7.4
    },
    {
        row: "Gold",
        col: "2019",
        value: 22.4
    },
    {
        row: "Gold",
        col: "2020",
        value: 28.1
    },
    {
        row: "Gold",
        col: "2021",
        value: -4.8
    },
    {
        row: "Gold",
        col: "2022",
        value: 12.3
    },
    {
        row: "Gold",
        col: "2023",
        value: 14.8
    },
    {
        row: "Gold",
        col: "2024",
        value: 21.3
    },
    {
        row: "Gold",
        col: "2025",
        value: 18.7
    },
    {
        row: "Intl",
        col: "2019",
        value: 26.3
    },
    {
        row: "Intl",
        col: "2020",
        value: 18.4
    },
    {
        row: "Intl",
        col: "2021",
        value: 22.1
    },
    {
        row: "Intl",
        col: "2022",
        value: -18.4
    },
    {
        row: "Intl",
        col: "2023",
        value: 24.2
    },
    {
        row: "Intl",
        col: "2024",
        value: 19.8
    },
    {
        row: "Intl",
        col: "2025",
        value: -3.2
    }
];
const capitalGainsData = [
    {
        id: "1",
        symbol: "HDFC MF",
        name: "HDFC Flexi Cap Fund",
        type: "LTCG",
        units: 120.4,
        buyDate: "12 Jan 2023",
        sellDate: "18 Feb 2026",
        costBasis: 48500,
        saleValue: 68200,
        gain: 19700,
        tax: 2463
    },
    {
        id: "2",
        symbol: "ICICI PRU",
        name: "ICICI Pru Bluechip Fund",
        type: "LTCG",
        units: 85.2,
        buyDate: "3 Mar 2023",
        sellDate: "10 Jan 2026",
        costBasis: 32000,
        saleValue: 44800,
        gain: 12800,
        tax: 1600
    },
    {
        id: "3",
        symbol: "WIPRO",
        name: "Wipro Ltd",
        type: "STCG",
        units: 50,
        buyDate: "5 Sep 2025",
        sellDate: "14 Feb 2026",
        costBasis: 24500,
        saleValue: 26200,
        gain: 1700,
        tax: 255
    },
    {
        id: "4",
        symbol: "MARUTI",
        name: "Maruti Suzuki India",
        type: "STCG",
        units: 5,
        buyDate: "20 Oct 2025",
        sellDate: "8 Feb 2026",
        costBasis: 52000,
        saleValue: 49800,
        gain: -2200,
        tax: 0
    }
];
const harvestingOpportunities = [
    {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        units: 80,
        unrealizedLoss: -6096,
        action: "Sell 80 units → realise ₹6,096 loss"
    },
    {
        symbol: "MARUTI",
        name: "Maruti Suzuki India",
        units: 10,
        unrealizedLoss: -3236,
        action: "Sell 10 units → realise ₹3,236 loss"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/portfolio/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/pnl-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const TABS = [
    {
        id: "equity",
        label: "Equity"
    },
    {
        id: "mf",
        label: "Mutual Funds"
    },
    {
        id: "other",
        label: "Gold & Others"
    }
];
function LTCGBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41";
    }
    const { daysHeld, isLTCG } = t0;
    if (isLTCG) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                style: {
                    background: "var(--positive-subtle)",
                    color: "var(--positive)"
                },
                children: "LTCG ✓"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 42,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    const daysToLTCG = 365 - daysHeld;
    if (daysToLTCG <= 30) {
        let t1;
        if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = {
                background: "var(--accent-subtle)",
                color: "var(--accent-brand)"
            };
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        let t2;
        if ($[3] !== daysToLTCG) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                style: t1,
                children: [
                    daysToLTCG,
                    "d"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 66,
                columnNumber: 12
            }, this);
            $[3] = daysToLTCG;
            $[4] = t2;
        } else {
            t2 = $[4];
        }
        return t2;
    }
    let t1;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            style: {
                background: "var(--surface-elevated)",
                color: "var(--text-muted)"
            },
            children: "STCG"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    return t1;
}
_c = LTCGBadge;
function SortIcon(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41";
    }
    const { col, sortKey, sortDir } = t0;
    if (col !== sortKey) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                size: 12,
                style: {
                    color: "var(--text-muted)"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 102,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    if ($[2] !== sortDir) {
        t1 = sortDir === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            size: 12,
            style: {
                color: "var(--accent-brand)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 113,
            columnNumber: 30
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            size: 12,
            style: {
                color: "var(--accent-brand)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 115,
            columnNumber: 13
        }, this);
        $[2] = sortDir;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c1 = SortIcon;
function PortfolioPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(104);
    if ($[0] !== "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41") {
        for(let $i = 0; $i < 104; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bd7742099a1b0013f190768b803de84cd2dcafbde34d90478552faca7bca4d41";
    }
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("equity");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("value");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [expandedRow, setExpandedRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let rows;
    if ($[1] !== search || $[2] !== sortDir || $[3] !== sortKey) {
        rows = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["holdingsData"]
        ];
        if (search) {
            const q = search.toLowerCase();
            rows = rows.filter({
                "PortfolioPage[rows.filter()]": (r)=>r.symbol.toLowerCase().includes(q) || r.company.toLowerCase().includes(q)
            }["PortfolioPage[rows.filter()]"]);
        }
        let t0;
        if ($[5] !== sortDir || $[6] !== sortKey) {
            t0 = ({
                "PortfolioPage[rows.sort()]": (a, b)=>{
                    const av = a[sortKey];
                    const bv = b[sortKey];
                    return sortDir === "asc" ? av - bv : bv - av;
                }
            })["PortfolioPage[rows.sort()]"];
            $[5] = sortDir;
            $[6] = sortKey;
            $[7] = t0;
        } else {
            t0 = $[7];
        }
        rows.sort(t0);
        $[1] = search;
        $[2] = sortDir;
        $[3] = sortKey;
        $[4] = rows;
    } else {
        rows = $[4];
    }
    const filtered = rows;
    let t0;
    if ($[8] !== filtered) {
        t0 = filtered.reduce(_PortfolioPageFilteredReduce, 0);
        $[8] = filtered;
        $[9] = t0;
    } else {
        t0 = $[9];
    }
    let t1;
    if ($[10] !== filtered) {
        t1 = filtered.reduce(_PortfolioPageFilteredReduce2, 0);
        $[10] = filtered;
        $[11] = t1;
    } else {
        t1 = $[11];
    }
    let t2;
    if ($[12] !== filtered) {
        t2 = filtered.reduce(_PortfolioPageFilteredReduce3, 0);
        $[12] = filtered;
        $[13] = t2;
    } else {
        t2 = $[13];
    }
    let t3;
    if ($[14] !== t0 || $[15] !== t1 || $[16] !== t2) {
        t3 = {
            value: t0,
            invested: t1,
            pnl: t2
        };
        $[14] = t0;
        $[15] = t1;
        $[16] = t2;
        $[17] = t3;
    } else {
        t3 = $[17];
    }
    const totals = t3;
    let t4;
    if ($[18] !== sortKey) {
        t4 = function toggleSort(key) {
            if (sortKey === key) {
                setSortDir(_PortfolioPageToggleSortSetSortDir);
            } else {
                setSortKey(key);
                setSortDir("desc");
            }
        };
        $[18] = sortKey;
        $[19] = t4;
    } else {
        t4 = $[19];
    }
    const toggleSort = t4;
    let t10;
    let t11;
    let t12;
    let t13;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[20] !== activeTab || $[21] !== search || $[22] !== sortDir || $[23] !== sortKey || $[24] !== toggleSort) {
        const COLS = [
            {
                key: "symbol",
                label: "Symbol",
                sortable: true
            },
            {
                key: "value",
                label: "Value",
                sortable: true
            },
            {
                key: "pnl",
                label: "P&L (\u20B9)",
                sortable: true
            },
            {
                key: "pnlPct",
                label: "P&L (%)",
                sortable: true
            },
            {
                key: "xirr",
                label: "XIRR",
                sortable: true
            }
        ];
        t11 = "space-y-4";
        let t14;
        if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = {
                background: "var(--surface)",
                borderColor: "var(--border)"
            };
            $[34] = t14;
        } else {
            t14 = $[34];
        }
        let t15;
        if ($[35] !== activeTab) {
            t15 = TABS.map({
                "PortfolioPage[TABS.map()]": (tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "PortfolioPage[TABS.map() > <button>.onClick]": ()=>setActiveTab(tab.id)
                        }["PortfolioPage[TABS.map() > <button>.onClick]"],
                        className: "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 relative whitespace-nowrap",
                        style: activeTab === tab.id ? {
                            background: "var(--selection-bg)",
                            color: "var(--selection-text)",
                            border: "1px solid var(--selection-border)",
                            boxShadow: "var(--shadow-card)"
                        } : {
                            color: "var(--text-muted)",
                            background: "transparent"
                        },
                        children: tab.label
                    }, tab.id, false, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 271,
                        columnNumber: 45
                    }, this)
            }["PortfolioPage[TABS.map()]"]);
            $[35] = activeTab;
            $[36] = t15;
        } else {
            t15 = $[36];
        }
        if ($[37] !== t15) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center rounded-lg p-1 gap-1 w-full sm:w-auto overflow-x-auto overflow-y-hidden border",
                style: t14,
                children: t15
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 289,
                columnNumber: 13
            }, this);
            $[37] = t15;
            $[38] = t12;
        } else {
            t12 = $[38];
        }
        let t16;
        if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = {
                background: "var(--surface)",
                borderColor: "var(--border)"
            };
            $[39] = t16;
        } else {
            t16 = $[39];
        }
        let t17;
        if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 14,
                style: {
                    color: "var(--text-muted)"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 307,
                columnNumber: 13
            }, this);
            $[40] = t17;
        } else {
            t17 = $[40];
        }
        let t18;
        if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = ({
                "PortfolioPage[<input>.onChange]": (e)=>setSearch(e.target.value)
            })["PortfolioPage[<input>.onChange]"];
            $[41] = t18;
        } else {
            t18 = $[41];
        }
        let t19;
        if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
            t19 = {
                color: "var(--text-primary)"
            };
            $[42] = t19;
        } else {
            t19 = $[42];
        }
        let t20;
        if ($[43] !== search) {
            t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-1 max-w-xs rounded-md border px-3 py-2",
                style: t16,
                children: [
                    t17,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search symbol or company\u2026",
                        value: search,
                        onChange: t18,
                        className: "bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--text-muted)]",
                        style: t19
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 334,
                        columnNumber: 115
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 334,
                columnNumber: 13
            }, this);
            $[43] = search;
            $[44] = t20;
        } else {
            t20 = $[44];
        }
        let t21;
        if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
            t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "ml-auto flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90",
                style: {
                    background: "var(--accent-brand)",
                    color: "var(--accent-foreground)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 345,
                        columnNumber: 10
                    }, this),
                    "Add Holding"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 342,
                columnNumber: 13
            }, this);
            $[45] = t21;
        } else {
            t21 = $[45];
        }
        if ($[46] !== t20) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    t20,
                    t21
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 351,
                columnNumber: 13
            }, this);
            $[46] = t20;
            $[47] = t13;
        } else {
            t13 = $[47];
        }
        t9 = "rounded-xl border overflow-hidden";
        if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = {
                borderColor: "var(--border)"
            };
            $[48] = t10;
        } else {
            t10 = $[48];
        }
        t8 = "overflow-x-auto";
        t7 = "w-full";
        if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = {
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)"
            };
            $[49] = t5;
        } else {
            t5 = $[49];
        }
        t6 = COLS.map({
            "PortfolioPage[COLS.map()]": (col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-3 text-xs font-medium uppercase tracking-widest text-left", col.sortable && "cursor-pointer select-none"),
                    style: {
                        color: "var(--text-muted)"
                    },
                    onClick: {
                        "PortfolioPage[COLS.map() > <th>.onClick]": ()=>col.sortable && toggleSort(col.key)
                    }["PortfolioPage[COLS.map() > <th>.onClick]"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            col.label,
                            col.sortable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                col: col.key,
                                sortKey: sortKey,
                                sortDir: sortDir
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 382,
                                columnNumber: 125
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 382,
                        columnNumber: 54
                    }, this)
                }, col.key, false, {
                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                    lineNumber: 378,
                    columnNumber: 43
                }, this)
        }["PortfolioPage[COLS.map()]"]);
        $[20] = activeTab;
        $[21] = search;
        $[22] = sortDir;
        $[23] = sortKey;
        $[24] = toggleSort;
        $[25] = t10;
        $[26] = t11;
        $[27] = t12;
        $[28] = t13;
        $[29] = t5;
        $[30] = t6;
        $[31] = t7;
        $[32] = t8;
        $[33] = t9;
    } else {
        t10 = $[25];
        t11 = $[26];
        t12 = $[27];
        t13 = $[28];
        t5 = $[29];
        t6 = $[30];
        t7 = $[31];
        t8 = $[32];
        t9 = $[33];
    }
    let t14;
    let t15;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "px-4 py-3 text-xs font-medium uppercase tracking-widest text-left",
            style: {
                color: "var(--text-muted)"
            },
            children: "LTCG?"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "w-8"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 415,
            columnNumber: 11
        }, this);
        $[50] = t14;
        $[51] = t15;
    } else {
        t14 = $[50];
        t15 = $[51];
    }
    let t16;
    if ($[52] !== t5 || $[53] !== t6) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                style: t5,
                children: [
                    t6,
                    t14,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 424,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 424,
            columnNumber: 11
        }, this);
        $[52] = t5;
        $[53] = t6;
        $[54] = t16;
    } else {
        t16 = $[54];
    }
    let t17;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = {
            background: "var(--surface-elevated)",
            borderBottom: "1px solid var(--border)"
        };
        $[55] = t17;
    } else {
        t17 = $[55];
    }
    let t18;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = {
            color: "var(--text-secondary)"
        };
        $[56] = t18;
    } else {
        t18 = $[56];
    }
    let t19;
    if ($[57] !== filtered.length) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-2 text-xs font-semibold",
            style: t18,
            children: [
                filtered.length,
                " holdings"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 452,
            columnNumber: 11
        }, this);
        $[57] = filtered.length;
        $[58] = t19;
    } else {
        t19 = $[58];
    }
    let t20;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = {
            color: "var(--text-primary)"
        };
        $[59] = t20;
    } else {
        t20 = $[59];
    }
    let t21;
    if ($[60] !== totals.value) {
        t21 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(totals.value);
        $[60] = totals.value;
        $[61] = t21;
    } else {
        t21 = $[61];
    }
    let t22;
    if ($[62] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-3 text-right font-medium font-mono",
            style: t20,
            children: t21
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 477,
            columnNumber: 11
        }, this);
        $[62] = t21;
        $[63] = t22;
    } else {
        t22 = $[63];
    }
    const t23 = totals.pnl >= 0 ? "var(--positive)" : "var(--negative)";
    let t24;
    if ($[64] !== t23) {
        t24 = {
            color: t23
        };
        $[64] = t23;
        $[65] = t24;
    } else {
        t24 = $[65];
    }
    const t25 = totals.pnl >= 0 ? "+" : "";
    let t26;
    if ($[66] !== totals.pnl) {
        t26 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(totals.pnl);
        $[66] = totals.pnl;
        $[67] = t26;
    } else {
        t26 = $[67];
    }
    let t27;
    if ($[68] !== t25 || $[69] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-end gap-2",
            children: [
                t25,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 505,
            columnNumber: 11
        }, this);
        $[68] = t25;
        $[69] = t26;
        $[70] = t27;
    } else {
        t27 = $[70];
    }
    let t28;
    if ($[71] !== t24 || $[72] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-3 text-right font-medium font-mono",
            style: t24,
            children: t27
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 514,
            columnNumber: 11
        }, this);
        $[71] = t24;
        $[72] = t27;
        $[73] = t28;
    } else {
        t28 = $[73];
    }
    const t29 = totals.pnl / (totals.invested || 1) * 100;
    let t30;
    if ($[74] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PnLBadge"], {
                value: t29,
                type: "percent"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 524,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 524,
            columnNumber: 11
        }, this);
        $[74] = t29;
        $[75] = t30;
    } else {
        t30 = $[75];
    }
    let t31;
    if ($[76] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            colSpan: 3
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 532,
            columnNumber: 11
        }, this);
        $[76] = t31;
    } else {
        t31 = $[76];
    }
    let t32;
    if ($[77] !== t19 || $[78] !== t22 || $[79] !== t28 || $[80] !== t30) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            style: t17,
            children: [
                t19,
                t22,
                t28,
                t30,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 539,
            columnNumber: 11
        }, this);
        $[77] = t19;
        $[78] = t22;
        $[79] = t28;
        $[80] = t30;
        $[81] = t32;
    } else {
        t32 = $[81];
    }
    let t33;
    if ($[82] !== expandedRow || $[83] !== filtered) {
        t33 = filtered.map({
            "PortfolioPage[filtered.map()]": (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "cursor-pointer transition-colors duration-100",
                            style: {
                                height: 52,
                                borderBottom: "1px solid var(--border)"
                            },
                            onMouseEnter: _PortfolioPageFilteredMapTrOnMouseEnter,
                            onMouseLeave: _PortfolioPageFilteredMapTrOnMouseLeave,
                            onClick: {
                                "PortfolioPage[filtered.map() > <tr>.onClick]": ()=>setExpandedRow(expandedRow === row.id ? null : row.id)
                            }["PortfolioPage[filtered.map() > <tr>.onClick]"],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-mono font-semibold",
                                                    style: {
                                                        color: "var(--text-primary)"
                                                    },
                                                    children: row.symbol
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 127
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs rounded px-1.5 py-0.5 font-mono",
                                                    style: {
                                                        background: "var(--neutral-subtle)",
                                                        color: "var(--neutral)"
                                                    },
                                                    children: row.exchange
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 86
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs truncate max-w-[160px] mt-0.5",
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: row.company
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 561,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 556,
                                    columnNumber: 60
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 text-sm font-mono text-right",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(row.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 40
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 text-sm font-mono text-right",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: row.pnl >= 0 ? "var(--positive)" : "var(--negative)"
                                        },
                                        children: [
                                            row.pnl >= 0 ? "+" : "",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(row.pnl)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 565,
                                        columnNumber: 96
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 565,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PnLBadge"], {
                                        value: row.pnlPct,
                                        type: "percent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 567,
                                        columnNumber: 99
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 73
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 text-sm font-mono text-right",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: row.xirr >= 0 ? "var(--positive)" : "var(--negative)"
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(row.xirr)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 567,
                                        columnNumber: 205
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 150
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LTCGBadge, {
                                        daysHeld: row.daysHeld,
                                        isLTCG: row.isLTCG
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 569,
                                        columnNumber: 79
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 53
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 14,
                                        className: "transition-transform duration-150",
                                        style: {
                                            color: "var(--text-muted)",
                                            transform: expandedRow === row.id ? "rotate(90deg)" : "rotate(0deg)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 569,
                                        columnNumber: 167
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 141
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                            lineNumber: 551,
                            columnNumber: 76
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: expandedRow === row.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 7,
                                    style: {
                                        padding: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: "auto",
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.2,
                                            ease: "easeOut"
                                        },
                                        style: {
                                            overflow: "hidden",
                                            background: "var(--surface-elevated)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-6 py-4 border-b",
                                            style: {
                                                borderColor: "var(--border)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-medium uppercase tracking-widest mb-3",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "Lot Details"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
                                                    children: [
                                                        {
                                                            label: "Qty",
                                                            value: row.qty.toString()
                                                        },
                                                        {
                                                            label: "Avg Cost",
                                                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(row.avgCost)
                                                        },
                                                        {
                                                            label: "LTP",
                                                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(row.ltp)
                                                        },
                                                        {
                                                            label: "Days Held",
                                                            value: `${row.daysHeld}d`
                                                        }
                                                    ].map(_PortfolioPageFilteredMapAnonymous)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 593,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 589,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 574,
                                        columnNumber: 16
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 101
                                }, this)
                            }, `${row.id}-expand`, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 572,
                                columnNumber: 72
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                            lineNumber: 572,
                            columnNumber: 28
                        }, this)
                    ]
                }, row.id, true, {
                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                    lineNumber: 551,
                    columnNumber: 47
                }, this)
        }["PortfolioPage[filtered.map()]"]);
        $[82] = expandedRow;
        $[83] = filtered;
        $[84] = t33;
    } else {
        t33 = $[84];
    }
    let t34;
    if ($[85] !== t32 || $[86] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: [
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 615,
            columnNumber: 11
        }, this);
        $[85] = t32;
        $[86] = t33;
        $[87] = t34;
    } else {
        t34 = $[87];
    }
    let t35;
    if ($[88] !== t16 || $[89] !== t34 || $[90] !== t7) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: t7,
            children: [
                t16,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 624,
            columnNumber: 11
        }, this);
        $[88] = t16;
        $[89] = t34;
        $[90] = t7;
        $[91] = t35;
    } else {
        t35 = $[91];
    }
    let t36;
    if ($[92] !== t35 || $[93] !== t8) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: t35
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 634,
            columnNumber: 11
        }, this);
        $[92] = t35;
        $[93] = t8;
        $[94] = t36;
    } else {
        t36 = $[94];
    }
    let t37;
    if ($[95] !== t10 || $[96] !== t36 || $[97] !== t9) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            style: t10,
            children: t36
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 643,
            columnNumber: 11
        }, this);
        $[95] = t10;
        $[96] = t36;
        $[97] = t9;
        $[98] = t37;
    } else {
        t37 = $[98];
    }
    let t38;
    if ($[99] !== t11 || $[100] !== t12 || $[101] !== t13 || $[102] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t11,
            children: [
                t12,
                t13,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 653,
            columnNumber: 11
        }, this);
        $[99] = t11;
        $[100] = t12;
        $[101] = t13;
        $[102] = t37;
        $[103] = t38;
    } else {
        t38 = $[103];
    }
    return t38;
}
_s(PortfolioPage, "7GWVbqBZkafXZOcW6skruNBGejs=");
_c2 = PortfolioPage;
function _PortfolioPageFilteredMapAnonymous(t0) {
    const { label, value } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs uppercase tracking-widest mb-1",
                style: {
                    color: "var(--text-muted)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 669,
                columnNumber: 27
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-mono font-medium",
                style: {
                    color: "var(--text-primary)"
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 671,
                columnNumber: 19
            }, this)
        ]
    }, label, true, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 669,
        columnNumber: 10
    }, this);
}
function _PortfolioPageFilteredMapTrOnMouseLeave(e_1) {
    return e_1.currentTarget.style.background = "transparent";
}
function _PortfolioPageFilteredMapTrOnMouseEnter(e_0) {
    return e_0.currentTarget.style.background = "var(--surface-elevated)";
}
function _PortfolioPageToggleSortSetSortDir(d) {
    return d === "asc" ? "desc" : "asc";
}
function _PortfolioPageFilteredReduce3(s_1, r_2) {
    return s_1 + r_2.pnl;
}
function _PortfolioPageFilteredReduce2(s_0, r_1) {
    return s_0 + r_1.qty * r_1.avgCost;
}
function _PortfolioPageFilteredReduce(s, r_0) {
    return s + r_0.value;
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LTCGBadge");
__turbopack_context__.k.register(_c1, "SortIcon");
__turbopack_context__.k.register(_c2, "PortfolioPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronUp
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-up", __iconNode);
;
 //# sourceMappingURL=chevron-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowUpDown
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 16-4 4-4-4",
            key: "f6ql7i"
        }
    ],
    [
        "path",
        {
            d: "M17 20V4",
            key: "1ejh1v"
        }
    ],
    [
        "path",
        {
            d: "m3 8 4-4 4 4",
            key: "11wl7u"
        }
    ],
    [
        "path",
        {
            d: "M7 4v16",
            key: "1glfcx"
        }
    ]
];
const ArrowUpDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-up-down", __iconNode);
;
 //# sourceMappingURL=arrow-up-down.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUpDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_49e35b1b._.js.map