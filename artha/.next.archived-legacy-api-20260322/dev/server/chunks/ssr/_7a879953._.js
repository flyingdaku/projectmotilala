module.exports = [
"[project]/src/components/ui/pnl-badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PnLBadge",
    ()=>PnLBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
function PnLBadge({ value, type, className }) {
    const isPositive = value >= 0;
    const arrow = isPositive ? "↑" : "↓";
    const label = type === "percent" ? `${arrow} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(value)}` : `${arrow} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(value)}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium font-mono whitespace-nowrap", isPositive ? "text-[var(--positive)] bg-[var(--positive-subtle)]" : "text-[var(--negative)] bg-[var(--negative-subtle)]", className),
        children: label
    }, void 0, false, {
        fileName: "[project]/src/components/ui/pnl-badge.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/app/(app)/portfolio/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-ssr] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/pnl-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
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
function LTCGBadge({ daysHeld, isLTCG }) {
    if (isLTCG) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            style: {
                background: "var(--positive-subtle)",
                color: "var(--positive)"
            },
            children: "LTCG ✓"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    const daysToLTCG = 365 - daysHeld;
    if (daysToLTCG <= 30) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            style: {
                background: "var(--accent-subtle)",
                color: "var(--accent-brand)"
            },
            children: [
                daysToLTCG,
                "d"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        style: {
            background: "var(--surface-elevated)",
            color: "var(--text-muted)"
        },
        children: "STCG"
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
function SortIcon({ col, sortKey, sortDir }) {
    if (col !== sortKey) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
        size: 12,
        style: {
            color: "var(--text-muted)"
        }
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 61,
        columnNumber: 31
    }, this);
    return sortDir === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
        size: 12,
        style: {
            color: "var(--accent-brand)"
        }
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 63,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
        size: 12,
        style: {
            color: "var(--accent-brand)"
        }
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 64,
        columnNumber: 7
    }, this);
}
function PortfolioPage() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("equity");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("value");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [expandedRow, setExpandedRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let rows = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holdingsData"]
        ];
        if (search) {
            const q = search.toLowerCase();
            rows = rows.filter((r)=>r.symbol.toLowerCase().includes(q) || r.company.toLowerCase().includes(q));
        }
        rows.sort((a, b)=>{
            const av = a[sortKey];
            const bv = b[sortKey];
            return sortDir === "asc" ? av - bv : bv - av;
        });
        return rows;
    }, [
        search,
        sortKey,
        sortDir
    ]);
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            value: filtered.reduce((s, r)=>s + r.value, 0),
            invested: filtered.reduce((s, r)=>s + r.qty * r.avgCost, 0),
            pnl: filtered.reduce((s, r)=>s + r.pnl, 0)
        }), [
        filtered
    ]);
    function toggleSort(key) {
        if (sortKey === key) setSortDir((d)=>d === "asc" ? "desc" : "asc");
        else {
            setSortKey(key);
            setSortDir("desc");
        }
    }
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
            label: "P&L (₹)",
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center rounded-lg p-1 gap-1 w-full sm:w-auto overflow-x-auto overflow-y-hidden border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.id),
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
                        lineNumber: 117,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-1 max-w-xs rounded-md border px-3 py-2",
                        style: {
                            background: "var(--surface)",
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 14,
                                style: {
                                    color: "var(--text-muted)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search symbol or company…",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                className: "bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--text-muted)]",
                                style: {
                                    color: "var(--text-primary)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "ml-auto flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90",
                        style: {
                            background: "var(--accent-brand)",
                            color: "var(--accent-foreground)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            "Add Holding"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border overflow-hidden",
                style: {
                    borderColor: "var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: "var(--surface)",
                                        borderBottom: "1px solid var(--border)"
                                    },
                                    children: [
                                        COLS.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-4 py-3 text-xs font-medium uppercase tracking-widest text-left", col.sortable && "cursor-pointer select-none"),
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                onClick: ()=>col.sortable && toggleSort(col.key),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        col.label,
                                                        col.sortable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                            col: col.key,
                                                            sortKey: sortKey,
                                                            sortDir: sortDir
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 21
                                                }, this)
                                            }, col.key, false, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-xs font-medium uppercase tracking-widest text-left",
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "LTCG?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "w-8"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            background: "var(--surface-elevated)",
                                            borderBottom: "1px solid var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 text-xs font-semibold",
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: [
                                                    filtered.length,
                                                    " holdings"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-right font-medium font-mono",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(totals.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-right font-medium font-mono",
                                                style: {
                                                    color: totals.pnl >= 0 ? "var(--positive)" : "var(--negative)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-end gap-2",
                                                    children: [
                                                        totals.pnl >= 0 ? "+" : "",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(totals.pnl)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PnLBadge"], {
                                                    value: totals.pnl / (totals.invested || 1) * 100,
                                                    type: "percent"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 3
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    filtered.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "cursor-pointer transition-colors duration-100",
                                                    style: {
                                                        height: 52,
                                                        borderBottom: "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                    onClick: ()=>setExpandedRow(expandedRow === row.id ? null : row.id),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-mono font-semibold",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: row.symbol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                            lineNumber: 237,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs rounded px-1.5 py-0.5 font-mono",
                                                                            style: {
                                                                                background: "var(--neutral-subtle)",
                                                                                color: "var(--neutral)"
                                                                            },
                                                                            children: row.exchange
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                            lineNumber: 240,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                    lineNumber: 236,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs truncate max-w-[160px] mt-0.5",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: row.company
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                    lineNumber: 247,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-sm font-mono text-right",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(row.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-sm font-mono text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: row.pnl >= 0 ? "var(--positive)" : "var(--negative)"
                                                                },
                                                                children: [
                                                                    row.pnl >= 0 ? "+" : "",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(row.pnl)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PnLBadge"], {
                                                                value: row.pnlPct,
                                                                type: "percent"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-sm font-mono text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: row.xirr >= 0 ? "var(--positive)" : "var(--negative)"
                                                                },
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(row.xirr)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LTCGBadge, {
                                                                daysHeld: row.daysHeld,
                                                                isLTCG: row.isLTCG
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 14,
                                                                className: "transition-transform duration-150",
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    transform: expandedRow === row.id ? "rotate(90deg)" : "rotate(0deg)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                    children: expandedRow === row.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 7,
                                                            style: {
                                                                padding: 0
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-6 py-4 border-b",
                                                                    style: {
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium uppercase tracking-widest mb-3",
                                                                            style: {
                                                                                color: "var(--text-muted)"
                                                                            },
                                                                            children: "Lot Details"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                            lineNumber: 295,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
                                                                            children: [
                                                                                {
                                                                                    label: "Qty",
                                                                                    value: row.qty.toString()
                                                                                },
                                                                                {
                                                                                    label: "Avg Cost",
                                                                                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(row.avgCost)
                                                                                },
                                                                                {
                                                                                    label: "LTP",
                                                                                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(row.ltp)
                                                                                },
                                                                                {
                                                                                    label: "Days Held",
                                                                                    value: `${row.daysHeld}d`
                                                                                }
                                                                            ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs uppercase tracking-widest mb-1",
                                                                                            style: {
                                                                                                color: "var(--text-muted)"
                                                                                            },
                                                                                            children: label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                                            lineNumber: 306,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-sm font-mono font-medium",
                                                                                            style: {
                                                                                                color: "var(--text-primary)"
                                                                                            },
                                                                                            children: value
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                                            lineNumber: 309,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, label, true, {
                                                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                                    lineNumber: 305,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                            lineNumber: 298,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, `${row.id}-expand`, false, {
                                                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, row.id, true, {
                                            fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/portfolio/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/portfolio/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-up", __iconNode);
;
 //# sourceMappingURL=chevron-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const ArrowUpDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-up-down", __iconNode);
;
 //# sourceMappingURL=arrow-up-down.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-ssr] (ecmascript) <export default as ArrowUpDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUpDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_7a879953._.js.map