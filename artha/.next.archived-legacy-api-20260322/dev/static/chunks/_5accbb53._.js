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
"[project]/src/app/(app)/watchlist/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WatchlistPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-off.js [app-client] (ecmascript) <export default as BellOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/pnl-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const WATCH_ITEMS = [
    {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        ltp: 2891.4,
        change: 38.5,
        changePct: 1.35,
        high52: 3024.9,
        low52: 2180.0,
        mcap: 19.5,
        pe: 24.2,
        industry: "Oil&Gas-Integrated",
        alert: true,
        tags: [
            "Energy",
            "Large Cap"
        ]
    },
    {
        symbol: "INFY",
        name: "Infosys Ltd",
        ltp: 1724.5,
        change: 35.8,
        changePct: 2.12,
        high52: 1903.3,
        low52: 1358.35,
        mcap: 7.3,
        pe: 28.4,
        industry: "Computer-Tech Services",
        alert: false,
        tags: [
            "IT",
            "Large Cap"
        ]
    },
    {
        symbol: "HDFCBANK",
        name: "HDFC Bank",
        ltp: 1543.8,
        change: -12.3,
        changePct: -0.79,
        high52: 1794.0,
        low52: 1363.45,
        mcap: 11.8,
        pe: 19.8,
        industry: "Banks-Money Center",
        alert: true,
        tags: [
            "Banking",
            "Large Cap"
        ]
    },
    {
        symbol: "TCS",
        name: "Tata Consultancy",
        ltp: 4156.2,
        change: -59.4,
        changePct: -1.41,
        high52: 4592.25,
        low52: 3311.0,
        mcap: 15.1,
        pe: 31.2,
        industry: "Computer-Tech Services",
        alert: false,
        tags: [
            "IT",
            "Large Cap"
        ]
    },
    {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance",
        ltp: 7234.1,
        change: 121.3,
        changePct: 1.71,
        high52: 8192.0,
        low52: 6187.8,
        mcap: 4.4,
        pe: 32.1,
        industry: "Finance-Consumer Loans",
        alert: false,
        tags: [
            "NBFC"
        ]
    },
    {
        symbol: "PIIND",
        name: "PI Industries",
        ltp: 3842.7,
        change: 64.2,
        changePct: 1.7,
        high52: 4890.5,
        low52: 3212.0,
        mcap: 0.58,
        pe: 38.4,
        industry: "Chemicals-Agricultural",
        alert: false,
        tags: [
            "Agrochemicals",
            "Mid Cap"
        ]
    },
    {
        symbol: "DIXIND",
        name: "Dixon Technologies",
        ltp: 12840.5,
        change: -220.4,
        changePct: -1.69,
        high52: 19000.0,
        low52: 9850.0,
        mcap: 0.77,
        pe: 84.2,
        industry: "Electronic-Consumer",
        alert: true,
        tags: [
            "Electronics",
            "Mid Cap"
        ]
    },
    {
        symbol: "ZOMATO",
        name: "Zomato Ltd",
        ltp: 242.8,
        change: 4.1,
        changePct: 1.72,
        high52: 304.7,
        low52: 128.4,
        mcap: 2.14,
        pe: null,
        industry: "Internet-Services",
        alert: false,
        tags: [
            "Internet",
            "New Age"
        ]
    }
];
function WatchlistPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(103);
    if ($[0] !== "73b1c61108d4606fba01b4cd545e53492d6bca12935c22c4fc95d091d2231f02") {
        for(let $i = 0; $i < 103; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "73b1c61108d4606fba01b4cd545e53492d6bca12935c22c4fc95d091d2231f02";
    }
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(WATCH_ITEMS);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("changePct");
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    let t0;
    if ($[1] !== sortKey || $[2] !== sortOrder) {
        t0 = ({
            "WatchlistPage[handleSort]": (key)=>{
                if (sortKey === key) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                } else {
                    setSortKey(key);
                    setSortOrder("desc");
                }
            }
        })["WatchlistPage[handleSort]"];
        $[1] = sortKey;
        $[2] = sortOrder;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    const handleSort = t0;
    let filtered;
    let t1;
    let t10;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[4] !== handleSort || $[5] !== items || $[6] !== search || $[7] !== sortKey || $[8] !== sortOrder) {
        let t11;
        if ($[20] !== search) {
            t11 = ({
                "WatchlistPage[items.filter()]": (i)=>search === "" || i.symbol.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase())
            })["WatchlistPage[items.filter()]"];
            $[20] = search;
            $[21] = t11;
        } else {
            t11 = $[21];
        }
        let t12;
        if ($[22] !== sortKey || $[23] !== sortOrder) {
            t12 = ({
                "WatchlistPage[(anonymous)()]": (a, b)=>{
                    const valA = a[sortKey];
                    const valB = b[sortKey];
                    const safeValA = valA === null || valA === undefined ? -Infinity : valA;
                    const safeValB = valB === null || valB === undefined ? -Infinity : valB;
                    if (typeof safeValA === "string" && typeof safeValB === "string") {
                        return sortOrder === "asc" ? safeValA.localeCompare(safeValB) : safeValB.localeCompare(safeValA);
                    }
                    if (safeValA < safeValB) {
                        return sortOrder === "asc" ? -1 : 1;
                    }
                    if (safeValA > safeValB) {
                        return sortOrder === "asc" ? 1 : -1;
                    }
                    return 0;
                }
            })["WatchlistPage[(anonymous)()]"];
            $[22] = sortKey;
            $[23] = sortOrder;
            $[24] = t12;
        } else {
            t12 = $[24];
        }
        filtered = items.filter(t11).sort(t12);
        let t13;
        if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = ({
                "WatchlistPage[toggleAlert]": (symbol)=>setItems({
                        "WatchlistPage[toggleAlert > setItems()]": (prev)=>prev.map({
                                "WatchlistPage[toggleAlert > setItems() > prev.map()]": (i_0)=>i_0.symbol === symbol ? {
                                        ...i_0,
                                        alert: !i_0.alert
                                    } : i_0
                            }["WatchlistPage[toggleAlert > setItems() > prev.map()]"])
                    }["WatchlistPage[toggleAlert > setItems()]"])
            })["WatchlistPage[toggleAlert]"];
            $[25] = t13;
        } else {
            t13 = $[25];
        }
        const toggleAlert = t13;
        let t14;
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = ({
                "WatchlistPage[removeItem]": (symbol_0)=>setItems({
                        "WatchlistPage[removeItem > setItems()]": (prev_0)=>prev_0.filter({
                                "WatchlistPage[removeItem > setItems() > prev_0.filter()]": (i_1)=>i_1.symbol !== symbol_0
                            }["WatchlistPage[removeItem > setItems() > prev_0.filter()]"])
                    }["WatchlistPage[removeItem > setItems()]"])
            })["WatchlistPage[removeItem]"];
            $[26] = t14;
        } else {
            t14 = $[26];
        }
        const removeItem = t14;
        t8 = "space-y-6 pb-20";
        let t15;
        if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold mb-1",
                style: {
                    color: "var(--text-primary)"
                },
                children: "Watchlist"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 242,
                columnNumber: 13
            }, this);
            $[27] = t15;
        } else {
            t15 = $[27];
        }
        let t16;
        if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t15,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: "Track stocks you're interested in across all your watchlists."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                        lineNumber: 251,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 251,
                columnNumber: 13
            }, this);
            $[28] = t16;
        } else {
            t16 = $[28];
        }
        if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4 flex-wrap",
                children: [
                    t16,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        style: {
                            background: "var(--accent-brand)",
                            color: "var(--accent-foreground)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 262,
                                columnNumber: 12
                            }, this),
                            "Add Stock"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                        lineNumber: 259,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 259,
                columnNumber: 12
            }, this);
            $[29] = t9;
        } else {
            t9 = $[29];
        }
        let t17;
        if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2",
                style: {
                    color: "var(--text-muted)"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 269,
                columnNumber: 13
            }, this);
            $[30] = t17;
        } else {
            t17 = $[30];
        }
        let t18;
        if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = ({
                "WatchlistPage[<input>.onChange]": (e)=>setSearch(e.target.value)
            })["WatchlistPage[<input>.onChange]"];
            $[31] = t18;
        } else {
            t18 = $[31];
        }
        let t19;
        if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
            t19 = {
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-primary)"
            };
            $[32] = t19;
        } else {
            t19 = $[32];
        }
        if ($[33] !== search) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex-1 min-w-48 max-w-sm",
                    children: [
                        t17,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: search,
                            onChange: t18,
                            placeholder: "Search watchlist...",
                            className: "w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none",
                            style: t19
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                            lineNumber: 297,
                            columnNumber: 120
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                    lineNumber: 297,
                    columnNumber: 64
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 297,
                columnNumber: 13
            }, this);
            $[33] = search;
            $[34] = t10;
        } else {
            t10 = $[34];
        }
        t6 = "rounded-xl border overflow-x-auto";
        if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = {
                background: "var(--surface)",
                borderColor: "var(--border)"
            };
            $[35] = t7;
        } else {
            t7 = $[35];
        }
        t4 = "w-full text-sm whitespace-nowrap";
        let t20;
        if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
            t20 = {
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                background: "var(--surface-hover)"
            };
            $[36] = t20;
        } else {
            t20 = $[36];
        }
        let t21;
        if ($[37] !== handleSort) {
            t21 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("symbol")
            })["WatchlistPage[<th>.onClick]"];
            $[37] = handleSort;
            $[38] = t21;
        } else {
            t21 = $[38];
        }
        const t22 = sortKey === "symbol" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t23;
        if ($[39] !== t21 || $[40] !== t22) {
            t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-left py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t21,
                children: [
                    "Company ",
                    t22
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 338,
                columnNumber: 13
            }, this);
            $[39] = t21;
            $[40] = t22;
            $[41] = t23;
        } else {
            t23 = $[41];
        }
        let t24;
        if ($[42] !== handleSort) {
            t24 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("industry")
            })["WatchlistPage[<th>.onClick]"];
            $[42] = handleSort;
            $[43] = t24;
        } else {
            t24 = $[43];
        }
        const t25 = sortKey === "industry" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t26;
        if ($[44] !== t24 || $[45] !== t25) {
            t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-left py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t24,
                children: [
                    "Industry ",
                    t25
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 358,
                columnNumber: 13
            }, this);
            $[44] = t24;
            $[45] = t25;
            $[46] = t26;
        } else {
            t26 = $[46];
        }
        let t27;
        if ($[47] !== handleSort) {
            t27 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("ltp")
            })["WatchlistPage[<th>.onClick]"];
            $[47] = handleSort;
            $[48] = t27;
        } else {
            t27 = $[48];
        }
        const t28 = sortKey === "ltp" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t29;
        if ($[49] !== t27 || $[50] !== t28) {
            t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t27,
                children: [
                    "LTP (₹) ",
                    t28
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 378,
                columnNumber: 13
            }, this);
            $[49] = t27;
            $[50] = t28;
            $[51] = t29;
        } else {
            t29 = $[51];
        }
        let t30;
        if ($[52] !== handleSort) {
            t30 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("changePct")
            })["WatchlistPage[<th>.onClick]"];
            $[52] = handleSort;
            $[53] = t30;
        } else {
            t30 = $[53];
        }
        const t31 = sortKey === "changePct" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t32;
        if ($[54] !== t30 || $[55] !== t31) {
            t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t30,
                children: [
                    "% Chg ",
                    t31
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 398,
                columnNumber: 13
            }, this);
            $[54] = t30;
            $[55] = t31;
            $[56] = t32;
        } else {
            t32 = $[56];
        }
        let t33;
        if ($[57] !== handleSort) {
            t33 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("low52")
            })["WatchlistPage[<th>.onClick]"];
            $[57] = handleSort;
            $[58] = t33;
        } else {
            t33 = $[58];
        }
        const t34 = sortKey === "low52" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t35;
        if ($[59] !== t33 || $[60] !== t34) {
            t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium hidden md:table-cell cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t33,
                children: [
                    "52W Rng ",
                    t34
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 418,
                columnNumber: 13
            }, this);
            $[59] = t33;
            $[60] = t34;
            $[61] = t35;
        } else {
            t35 = $[61];
        }
        let t36;
        if ($[62] !== handleSort) {
            t36 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("pe")
            })["WatchlistPage[<th>.onClick]"];
            $[62] = handleSort;
            $[63] = t36;
        } else {
            t36 = $[63];
        }
        const t37 = sortKey === "pe" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t38;
        if ($[64] !== t36 || $[65] !== t37) {
            t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium hidden lg:table-cell cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t36,
                children: [
                    "P/E ",
                    t37
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 438,
                columnNumber: 13
            }, this);
            $[64] = t36;
            $[65] = t37;
            $[66] = t38;
        } else {
            t38 = $[66];
        }
        let t39;
        if ($[67] !== handleSort) {
            t39 = ({
                "WatchlistPage[<th>.onClick]": ()=>handleSort("mcap")
            })["WatchlistPage[<th>.onClick]"];
            $[67] = handleSort;
            $[68] = t39;
        } else {
            t39 = $[68];
        }
        const t40 = sortKey === "mcap" && (sortOrder === "asc" ? "\u2191" : "\u2193");
        let t41;
        if ($[69] !== t39 || $[70] !== t40) {
            t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium hidden sm:table-cell cursor-pointer hover:text-[var(--text-primary)]",
                onClick: t39,
                children: [
                    "Mkt Cap (T) ",
                    t40
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 458,
                columnNumber: 13
            }, this);
            $[69] = t39;
            $[70] = t40;
            $[71] = t41;
        } else {
            t41 = $[71];
        }
        let t42;
        if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
            t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "text-right py-3 px-4 font-medium",
                children: "Actions"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 467,
                columnNumber: 13
            }, this);
            $[72] = t42;
        } else {
            t42 = $[72];
        }
        if ($[73] !== t23 || $[74] !== t26 || $[75] !== t29 || $[76] !== t32 || $[77] !== t35 || $[78] !== t38 || $[79] !== t41) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    className: "border-b",
                    style: t20,
                    children: [
                        t23,
                        t26,
                        t29,
                        t32,
                        t35,
                        t38,
                        t41,
                        t42
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                    lineNumber: 473,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 473,
                columnNumber: 12
            }, this);
            $[73] = t23;
            $[74] = t26;
            $[75] = t29;
            $[76] = t32;
            $[77] = t35;
            $[78] = t38;
            $[79] = t41;
            $[80] = t5;
        } else {
            t5 = $[80];
        }
        t1 = "divide-y";
        if ($[81] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = {
                borderColor: "var(--border)"
            };
            $[81] = t2;
        } else {
            t2 = $[81];
        }
        let t43;
        if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
            t43 = ({
                "WatchlistPage[filtered.map()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "hover:bg-[var(--surface-hover)] transition-colors group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/stocks/${item.symbol}`,
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0",
                                            style: {
                                                background: "var(--accent-subtle)",
                                                color: "var(--accent-brand)"
                                            },
                                            children: item.symbol.slice(0, 2)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 497,
                                            columnNumber: 240
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    style: {
                                                        color: "var(--text-primary)"
                                                    },
                                                    children: item.symbol
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 54
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] truncate max-w-[140px]",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 39
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 500,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 497,
                                    columnNumber: 166
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 497,
                                columnNumber: 140
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            title: item.industry,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndustryGroupEmoji"])(item.industry)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 122
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            style: {
                                                color: "var(--text-secondary)"
                                            },
                                            children: item.industry.split("-")[0]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 215
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 81
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 504,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono font-semibold",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: item.ltp.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 506,
                                    columnNumber: 102
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 506,
                                columnNumber: 65
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PnLBadge"], {
                                    value: item.changePct,
                                    type: "percent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 510,
                                    columnNumber: 66
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 510,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right hidden md:table-cell",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-xs",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    children: [
                                        item.low52.toLocaleString("en-IN", {
                                            maximumFractionDigits: 0
                                        }),
                                        " – ",
                                        item.high52.toLocaleString("en-IN", {
                                            maximumFractionDigits: 0
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 510,
                                    columnNumber: 179
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 510,
                                columnNumber: 121
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right hidden lg:table-cell",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-xs",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    children: item.pe ?? "\u2014"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 87
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 516,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right hidden sm:table-cell",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-xs",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    children: item.mcap.toFixed(2)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 518,
                                    columnNumber: 106
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 518,
                                columnNumber: 48
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "WatchlistPage[filtered.map() > <button>.onClick]": ()=>toggleAlert(item.symbol)
                                            }["WatchlistPage[filtered.map() > <button>.onClick]"],
                                            className: "p-1.5 rounded-lg transition-colors hover:bg-white/10",
                                            title: item.alert ? "Disable alert" : "Enable alert",
                                            style: {
                                                color: item.alert ? "var(--accent-brand)" : "var(--text-muted)"
                                            },
                                            children: item.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 32
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOff$3e$__["BellOff"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 53
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 520,
                                            columnNumber: 192
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "WatchlistPage[filtered.map() > <button>.onClick]": ()=>removeItem(item.symbol)
                                            }["WatchlistPage[filtered.map() > <button>.onClick]"],
                                            className: "p-1.5 rounded-lg transition-colors hover:bg-rose-500/10",
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 18
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                            lineNumber: 524,
                                            columnNumber: 84
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                    lineNumber: 520,
                                    columnNumber: 86
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                                lineNumber: 520,
                                columnNumber: 49
                            }, this)
                        ]
                    }, item.symbol, true, {
                        fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                        lineNumber: 497,
                        columnNumber: 50
                    }, this)
            })["WatchlistPage[filtered.map()]"];
            $[82] = t43;
        } else {
            t43 = $[82];
        }
        t3 = filtered.map(t43);
        $[4] = handleSort;
        $[5] = items;
        $[6] = search;
        $[7] = sortKey;
        $[8] = sortOrder;
        $[9] = filtered;
        $[10] = t1;
        $[11] = t10;
        $[12] = t2;
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
        $[16] = t6;
        $[17] = t7;
        $[18] = t8;
        $[19] = t9;
    } else {
        filtered = $[9];
        t1 = $[10];
        t10 = $[11];
        t2 = $[12];
        t3 = $[13];
        t4 = $[14];
        t5 = $[15];
        t6 = $[16];
        t7 = $[17];
        t8 = $[18];
        t9 = $[19];
    }
    let t11;
    if ($[83] !== filtered.length) {
        t11 = filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                colSpan: 8,
                className: "py-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                        size: 32,
                        className: "mx-auto mb-3 opacity-20",
                        style: {
                            color: "var(--text-muted)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                        lineNumber: 566,
                        columnNumber: 86
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: "No stocks in watchlist yet."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                        lineNumber: 568,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/watchlist/page.tsx",
                lineNumber: 566,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
            lineNumber: 566,
            columnNumber: 36
        }, this);
        $[83] = filtered.length;
        $[84] = t11;
    } else {
        t11 = $[84];
    }
    let t12;
    if ($[85] !== t1 || $[86] !== t11 || $[87] !== t2 || $[88] !== t3) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            className: t1,
            style: t2,
            children: [
                t3,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
            lineNumber: 578,
            columnNumber: 11
        }, this);
        $[85] = t1;
        $[86] = t11;
        $[87] = t2;
        $[88] = t3;
        $[89] = t12;
    } else {
        t12 = $[89];
    }
    let t13;
    if ($[90] !== t12 || $[91] !== t4 || $[92] !== t5) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: t4,
            children: [
                t5,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
            lineNumber: 589,
            columnNumber: 11
        }, this);
        $[90] = t12;
        $[91] = t4;
        $[92] = t5;
        $[93] = t13;
    } else {
        t13 = $[93];
    }
    let t14;
    if ($[94] !== t13 || $[95] !== t6 || $[96] !== t7) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            style: t7,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
            lineNumber: 599,
            columnNumber: 11
        }, this);
        $[94] = t13;
        $[95] = t6;
        $[96] = t7;
        $[97] = t14;
    } else {
        t14 = $[97];
    }
    let t15;
    if ($[98] !== t10 || $[99] !== t14 || $[100] !== t8 || $[101] !== t9) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: [
                t9,
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/watchlist/page.tsx",
            lineNumber: 609,
            columnNumber: 11
        }, this);
        $[98] = t10;
        $[99] = t14;
        $[100] = t8;
        $[101] = t9;
        $[102] = t15;
    } else {
        t15 = $[102];
    }
    return t15;
}
_s(WatchlistPage, "z/B4iaDmVMcFGnPZZGd5tqz7HRo=");
_c = WatchlistPage;
var _c;
__turbopack_context__.k.register(_c, "WatchlistPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bell-off.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>BellOff
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
            d: "M10.268 21a2 2 0 0 0 3.464 0",
            key: "vwvbt9"
        }
    ],
    [
        "path",
        {
            d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
            key: "178tsu"
        }
    ],
    [
        "path",
        {
            d: "m2 2 20 20",
            key: "1ooewy"
        }
    ],
    [
        "path",
        {
            d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",
            key: "1hqiys"
        }
    ]
];
const BellOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bell-off", __iconNode);
;
 //# sourceMappingURL=bell-off.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bell-off.js [app-client] (ecmascript) <export default as BellOff>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BellOff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-off.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
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
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_5accbb53._.js.map