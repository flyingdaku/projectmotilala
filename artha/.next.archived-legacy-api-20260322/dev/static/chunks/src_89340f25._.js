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
"[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCardSkeleton",
    ()=>MetricCardSkeleton,
    "Skeleton",
    ()=>Skeleton,
    "TableRowSkeleton",
    ()=>TableRowSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Skeleton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8";
    }
    const { className } = t0;
    let t1;
    if ($[1] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("skeleton-shimmer rounded-md", className);
        $[1] = className;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1
        }, void 0, false, {
            fileName: "[project]/src/components/ui/skeleton.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c = Skeleton;
function MetricCardSkeleton() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl p-5 border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                    className: "h-3 w-24 mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/skeleton.tsx",
                    lineNumber: 50,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                    className: "h-8 w-32 mb-2"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/skeleton.tsx",
                    lineNumber: 50,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                    className: "h-4 w-20 mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/skeleton.tsx",
                    lineNumber: 50,
                    columnNumber: 84
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                    className: "h-10 w-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/skeleton.tsx",
                    lineNumber: 50,
                    columnNumber: 122
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/skeleton.tsx",
            lineNumber: 47,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = MetricCardSkeleton;
function TableRowSkeleton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "72b737a9323edd7ac73671470593f1723ed35afb0d2de29763dff2d1df9e02b8";
    }
    const { cols: t1 } = t0;
    const cols = t1 === undefined ? 6 : t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            height: 52
        };
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    let t3;
    if ($[2] !== cols) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            style: t2,
            children: Array.from({
                length: cols
            }).map(_TableRowSkeletonAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/skeleton.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[2] = cols;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    return t3;
}
_c2 = TableRowSkeleton;
function _TableRowSkeletonAnonymous(_, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "px-4 py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
            className: "h-4 w-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/skeleton.tsx",
            lineNumber: 91,
            columnNumber: 44
        }, this)
    }, i, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 91,
        columnNumber: 10
    }, this);
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Skeleton");
__turbopack_context__.k.register(_c1, "MetricCardSkeleton");
__turbopack_context__.k.register(_c2, "TableRowSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/metric-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCard",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/pnl-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-countup/build/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function MetricCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(39);
    if ($[0] !== "221a0bbae70cd5fc0a7006b2a873105fedf2057bb7d9021734c2e9b6cfc09e02") {
        for(let $i = 0; $i < 39; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "221a0bbae70cd5fc0a7006b2a873105fedf2057bb7d9021734c2e9b6cfc09e02";
    }
    const { label, value, valueType: t1, change, changeType: t2, benchmark, sparkline, loading: t3, className } = t0;
    const valueType = t1 === undefined ? "currency" : t1;
    const changeType = t2 === undefined ? "percent" : t2;
    const loading = t3 === undefined ? false : t3;
    if (loading) {
        let t4;
        if ($[1] !== className) {
            t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl p-5 border", className);
            $[1] = className;
            $[2] = t4;
        } else {
            t4 = $[2];
        }
        let t5;
        let t6;
        let t7;
        let t8;
        let t9;
        if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = {
                background: "var(--surface)",
                borderColor: "var(--border)"
            };
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-3 w-24 mb-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 67,
                columnNumber: 12
            }, this);
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-8 w-36 mb-2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 68,
                columnNumber: 12
            }, this);
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-5 w-20 mb-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 69,
                columnNumber: 12
            }, this);
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-10 w-full"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 70,
                columnNumber: 12
            }, this);
            $[3] = t5;
            $[4] = t6;
            $[5] = t7;
            $[6] = t8;
            $[7] = t9;
        } else {
            t5 = $[3];
            t6 = $[4];
            t7 = $[5];
            t8 = $[6];
            t9 = $[7];
        }
        let t10;
        if ($[8] !== t4) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t4,
                style: t5,
                children: [
                    t6,
                    t7,
                    t8,
                    t9
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this);
            $[8] = t4;
            $[9] = t10;
        } else {
            t10 = $[9];
        }
        return t10;
    }
    let t4;
    let t5;
    let t6;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            opacity: 0,
            y: 8
        };
        t5 = {
            opacity: 1,
            y: 0
        };
        t6 = {
            duration: 0.2,
            ease: "easeOut"
        };
        $[10] = t4;
        $[11] = t5;
        $[12] = t6;
    } else {
        t4 = $[10];
        t5 = $[11];
        t6 = $[12];
    }
    let t7;
    if ($[13] !== className) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl p-5 border transition-colors duration-200 group", className);
        $[13] = className;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            color: "var(--text-muted)"
        };
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== label) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-medium uppercase tracking-widest mb-3",
            style: t9,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[17] = label;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            color: "var(--text-primary)"
        };
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== value || $[21] !== valueType) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-3xl font-semibold tracking-tight font-mono",
            style: t11,
            children: valueType === "currency" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                start: 0,
                end: value,
                duration: 0.6,
                formattingFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"]
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 163,
                columnNumber: 117
            }, this) : valueType === "percent" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                start: 0,
                end: value,
                duration: 0.6,
                decimals: 1,
                formattingFn: _MetricCardCountUpFormattingFn
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 163,
                columnNumber: 219
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                start: 0,
                end: value,
                duration: 0.6,
                separator: ","
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 163,
                columnNumber: 329
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[20] = value;
        $[21] = valueType;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== change || $[24] !== changeType) {
        t13 = change !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PnLBadge"], {
            value: change,
            type: changeType ?? "percent"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 172,
            columnNumber: 35
        }, this);
        $[23] = change;
        $[24] = changeType;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== t12 || $[27] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-baseline gap-3 mb-1",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 181,
            columnNumber: 11
        }, this);
        $[26] = t12;
        $[27] = t13;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    let t15;
    if ($[29] !== benchmark) {
        t15 = benchmark && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs mb-3",
            style: {
                color: "var(--text-muted)"
            },
            children: [
                "vs ",
                benchmark.label,
                ":",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono",
                    style: {
                        color: benchmark.value >= 0 ? "var(--positive)" : "var(--negative)"
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(benchmark.value)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/metric-card.tsx",
                    lineNumber: 192,
                    columnNumber: 34
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 190,
            columnNumber: 24
        }, this);
        $[29] = benchmark;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    let t16;
    if ($[31] !== sparkline) {
        t16 = sparkline && sparkline.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 h-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: sparkline,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                        type: "monotone",
                        dataKey: "v",
                        stroke: sparkline[sparkline.length - 1].v >= sparkline[0].v ? "var(--positive)" : "var(--negative)",
                        strokeWidth: 1.5,
                        dot: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/metric-card.tsx",
                        lineNumber: 202,
                        columnNumber: 151
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/metric-card.tsx",
                    lineNumber: 202,
                    columnNumber: 123
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/metric-card.tsx",
                lineNumber: 202,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 202,
            columnNumber: 48
        }, this);
        $[31] = sparkline;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== t10 || $[34] !== t14 || $[35] !== t15 || $[36] !== t16 || $[37] !== t7) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t4,
            animate: t5,
            transition: t6,
            className: t7,
            style: t8,
            onMouseEnter: _MetricCardMotionDivOnMouseEnter,
            onMouseLeave: _MetricCardMotionDivOnMouseLeave,
            children: [
                t10,
                t14,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/metric-card.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[33] = t10;
        $[34] = t14;
        $[35] = t15;
        $[36] = t16;
        $[37] = t7;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    return t17;
}
_c = MetricCard;
function _MetricCardCountUpFormattingFn(v) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(v, 1);
}
function _MetricCardMotionDivOnMouseLeave(e_0) {
    e_0.currentTarget.style.borderColor = "var(--border)";
}
function _MetricCardMotionDivOnMouseEnter(e) {
    e.currentTarget.style.borderColor = "var(--accent-dark)";
}
var _c;
__turbopack_context__.k.register(_c, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-is-mounted.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMounted",
    ()=>useIsMounted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useIsMounted() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "634d17edbc1682d5910ec02b36273918b087d07fe2e836b39da48647e1cc096d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "634d17edbc1682d5910ec02b36273918b087d07fe2e836b39da48647e1cc096d";
    }
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "useIsMounted[useEffect()]": ()=>{
                const id = setTimeout({
                    "useIsMounted[useEffect() > setTimeout()]": ()=>setMounted(true)
                }["useIsMounted[useEffect() > setTimeout()]"], 0);
                return ()=>clearTimeout(id);
            }
        })["useIsMounted[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    return mounted;
}
_s(useIsMounted, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charts/performance-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceChart",
    ()=>PerformanceChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-is-mounted.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const RANGES = [
    "1M",
    "3M",
    "6M",
    "1Y",
    "3Y",
    "All"
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "5ecded0e8d025e989a1918db5b0f5202449a149647d40dbbaa9fb5a95342fff5") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5ecded0e8d025e989a1918db5b0f5202449a149647d40dbbaa9fb5a95342fff5";
    }
    const { active, payload, label } = t0;
    if (!active || !payload?.length) {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)",
            color: "var(--text-primary)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-secondary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== label) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-1.5 font-medium",
            style: t2,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[3] = label;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== payload) {
        t4 = payload.map(_CustomTooltipPayloadMap);
        $[5] = payload;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t3 || $[8] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    return t5;
}
_c = CustomTooltip;
function _CustomTooltipPayloadMap(entry) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 mb-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full inline-block",
                style: {
                    background: entry.color
                }
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 84,
                columnNumber: 75
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "var(--text-secondary)"
                },
                children: [
                    entry.name,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 86,
                columnNumber: 10
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono font-medium",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(entry.value)
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 88,
                columnNumber: 28
            }, this)
        ]
    }, entry.name, true, {
        fileName: "[project]/src/components/charts/performance-chart.tsx",
        lineNumber: 84,
        columnNumber: 10
    }, this);
}
function PerformanceChart(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "5ecded0e8d025e989a1918db5b0f5202449a149647d40dbbaa9fb5a95342fff5") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5ecded0e8d025e989a1918db5b0f5202449a149647d40dbbaa9fb5a95342fff5";
    }
    const { data } = t0;
    const [activeRange, setActiveRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1Y");
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMounted"])();
    if (!mounted) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-full"
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 106,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    if ($[2] !== activeRange) {
        t1 = RANGES.map({
            "PerformanceChart[RANGES.map()]": (r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "PerformanceChart[RANGES.map() > <button>.onClick]": ()=>setActiveRange(r)
                    }["PerformanceChart[RANGES.map() > <button>.onClick]"],
                    className: "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150",
                    style: activeRange === r ? {
                        background: "var(--selection-bg)",
                        color: "var(--selection-text)",
                        border: "1px solid var(--selection-border)"
                    } : {
                        color: "var(--text-muted)",
                        background: "transparent"
                    },
                    children: r
                }, r, false, {
                    fileName: "[project]/src/components/charts/performance-chart.tsx",
                    lineNumber: 116,
                    columnNumber: 46
                }, this)
        }["PerformanceChart[RANGES.map()]"]);
        $[2] = activeRange;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 mb-4",
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 134,
            columnNumber: 10
        }, this);
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            top: 10,
            right: 0,
            left: -20,
            bottom: 0
        };
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
            id: "portfolioGrad",
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "5%",
                    stopColor: "var(--positive)",
                    stopOpacity: 0.3
                }, void 0, false, {
                    fileName: "[project]/src/components/charts/performance-chart.tsx",
                    lineNumber: 154,
                    columnNumber: 73
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "95%",
                    stopColor: "var(--positive)",
                    stopOpacity: 0
                }, void 0, false, {
                    fileName: "[project]/src/components/charts/performance-chart.tsx",
                    lineNumber: 154,
                    columnNumber: 139
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 154,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "niftyGrad",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "5%",
                            stopColor: "var(--accent-brand)",
                            stopOpacity: 0.15
                        }, void 0, false, {
                            fileName: "[project]/src/components/charts/performance-chart.tsx",
                            lineNumber: 161,
                            columnNumber: 79
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "95%",
                            stopColor: "var(--accent-brand)",
                            stopOpacity: 0
                        }, void 0, false, {
                            fileName: "[project]/src/components/charts/performance-chart.tsx",
                            lineNumber: 161,
                            columnNumber: 150
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charts/performance-chart.tsx",
                    lineNumber: 161,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 161,
            columnNumber: 10
        }, this);
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "date",
            tick: {
                fill: "var(--text-muted)",
                fontSize: 10
            },
            axisLine: false,
            tickLine: false,
            tickFormatter: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateShort"],
            minTickGap: 30,
            dy: 10
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 168,
            columnNumber: 10
        }, this);
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            fill: "var(--text-muted)",
            fontSize: 10,
            fontFamily: "JetBrains Mono, monospace"
        };
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
            orientation: "right",
            tick: t7,
            axisLine: false,
            tickLine: false,
            tickFormatter: _PerformanceChartYAxisTickFormatter,
            width: 60,
            dx: 10,
            domain: [
                "dataMin - 100000",
                "dataMax + 100000"
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 189,
            columnNumber: 10
        }, this);
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 196,
                columnNumber: 28
            }, void 0),
            cursor: {
                stroke: "var(--border-strong)",
                strokeWidth: 1,
                strokeDasharray: "4 4"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 196,
            columnNumber: 10
        }, this);
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            type: "monotone",
            dataKey: "portfolio",
            name: "Portfolio",
            stroke: "var(--positive)",
            strokeWidth: 2,
            fill: "url(#portfolioGrad)",
            dot: false,
            activeDot: {
                r: 4,
                fill: "var(--positive)",
                stroke: "var(--surface)",
                strokeWidth: 2
            }
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            type: "monotone",
            dataKey: "nifty",
            name: "Nifty 50",
            stroke: "var(--accent-brand)",
            strokeWidth: 1.5,
            fill: "url(#niftyGrad)",
            dot: false,
            activeDot: {
                r: 3,
                fill: "var(--accent-brand)",
                stroke: "var(--surface)",
                strokeWidth: 2
            }
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== data) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-h-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: data,
                    margin: t3,
                    children: [
                        t5,
                        t6,
                        t8,
                        t9,
                        t10,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charts/performance-chart.tsx",
                    lineNumber: 231,
                    columnNumber: 91
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 231,
                columnNumber: 43
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[15] = data;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4 mt-3",
            children: [
                {
                    color: "var(--positive)",
                    label: "Portfolio"
                },
                {
                    color: "var(--accent-brand)",
                    label: "Nifty 50"
                }
            ].map(_PerformanceChartAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] !== t12 || $[19] !== t2) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full flex flex-col",
            children: [
                t2,
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/performance-chart.tsx",
            lineNumber: 252,
            columnNumber: 11
        }, this);
        $[18] = t12;
        $[19] = t2;
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    return t14;
}
_s(PerformanceChart, "9PMoXdMqURyuAh8VdO0hZaMNZek=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMounted"]
    ];
});
_c1 = PerformanceChart;
function _PerformanceChartAnonymous(t0) {
    const { color, label } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full",
                style: {
                    background: color
                }
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 266,
                columnNumber: 65
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                style: {
                    color: "var(--text-muted)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/charts/performance-chart.tsx",
                lineNumber: 268,
                columnNumber: 10
            }, this)
        ]
    }, label, true, {
        fileName: "[project]/src/components/charts/performance-chart.tsx",
        lineNumber: 266,
        columnNumber: 10
    }, this);
}
function _PerformanceChartYAxisTickFormatter(v) {
    return `₹${(v / 100000).toFixed(1)}L`;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "PerformanceChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charts/donut-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AllocationDonut",
    ()=>AllocationDonut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-is-mounted.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$shape$2f$Sector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/shape/Sector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)"
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ActiveShape(props) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5";
    }
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    const t0 = outerRadius + 8;
    let t1;
    if ($[1] !== cx || $[2] !== cy || $[3] !== endAngle || $[4] !== fill || $[5] !== innerRadius || $[6] !== startAngle || $[7] !== t0) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$shape$2f$Sector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sector"], {
                cx: cx,
                cy: cy,
                innerRadius: innerRadius,
                outerRadius: t0,
                startAngle: startAngle,
                endAngle: endAngle,
                fill: fill,
                cornerRadius: 4
            }, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 36,
            columnNumber: 10
        }, this);
        $[1] = cx;
        $[2] = cy;
        $[3] = endAngle;
        $[4] = fill;
        $[5] = innerRadius;
        $[6] = startAngle;
        $[7] = t0;
        $[8] = t1;
    } else {
        t1 = $[8];
    }
    return t1;
}
_c = ActiveShape;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5";
    }
    const { active, payload } = t0;
    if (!active || !payload?.length) {
        return null;
    }
    const d = payload[0].payload;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)",
            color: "var(--text-primary)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== d.name) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-medium mb-1",
            children: d.name
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[2] = d.name;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== d.value) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(d.value);
        $[4] = d.value;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-mono",
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            color: "var(--text-muted)"
        };
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== d.percent) {
        t6 = d.percent.toFixed(1);
        $[9] = d.percent;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: t5,
            children: [
                t6,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 122,
            columnNumber: 10
        }, this);
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t2 || $[14] !== t4 || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t2,
                t4,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 130,
            columnNumber: 10
        }, this);
        $[13] = t2;
        $[14] = t4;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    return t8;
}
_c1 = CustomTooltip;
function AllocationDonut(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c067b7314d639bbde787d9f433dacc8d45d57a649349836a5156f4b54decd6d5";
    }
    const { data } = t0;
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMounted"])();
    if (!mounted) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-full"
            }, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 156,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            minHeight: 180
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {};
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "AllocationDonut[<Pie>.onMouseEnter]": (_, index)=>setActiveIndex(index)
        })["AllocationDonut[<Pie>.onMouseEnter]"];
        t4 = ({
            "AllocationDonut[<Pie>.onMouseLeave]": ()=>setActiveIndex(undefined)
        })["AllocationDonut[<Pie>.onMouseLeave]"];
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] !== data) {
        t5 = data.map(_AllocationDonutDataMap);
        $[6] = data;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== activeIndex || $[9] !== data || $[10] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
            ...t2,
            data: data,
            cx: "50%",
            cy: "50%",
            innerRadius: "60%",
            outerRadius: "85%",
            dataKey: "value",
            paddingAngle: 3,
            cornerRadius: 4,
            activeIndex: activeIndex,
            activeShape: ActiveShape,
            onMouseEnter: t3,
            onMouseLeave: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 204,
            columnNumber: 10
        }, this);
        $[8] = activeIndex;
        $[9] = data;
        $[10] = t5;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 214,
                columnNumber: 28
            }, void 0),
            cursor: false
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 214,
            columnNumber: 10
        }, this);
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-h-0",
            style: t1,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                    children: [
                        t6,
                        t7
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charts/donut-chart.tsx",
                    lineNumber: 221,
                    columnNumber: 101
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 221,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 221,
            columnNumber: 10
        }, this);
        $[13] = t6;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== data) {
        t9 = data.map(_AllocationDonutDataMap2);
        $[15] = data;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-x-4 gap-y-2 mt-3",
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 237,
            columnNumber: 11
        }, this);
        $[17] = t9;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== t10 || $[20] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charts/donut-chart.tsx",
            lineNumber: 245,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t8;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    return t11;
}
_s(AllocationDonut, "LMJ9Xp/yB7Esc5fUzk6kAywQOFk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$is$2d$mounted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMounted"]
    ];
});
_c2 = AllocationDonut;
function _AllocationDonutDataMap2(item, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full shrink-0",
                style: {
                    background: COLORS[i % COLORS.length]
                }
            }, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 255,
                columnNumber: 75
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs truncate",
                style: {
                    color: "var(--text-secondary)"
                },
                children: item.name
            }, void 0, false, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 257,
                columnNumber: 10
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-mono ml-auto shrink-0",
                style: {
                    color: "var(--text-primary)"
                },
                children: [
                    item.percent.toFixed(0),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charts/donut-chart.tsx",
                lineNumber: 259,
                columnNumber: 26
            }, this)
        ]
    }, item.name, true, {
        fileName: "[project]/src/components/charts/donut-chart.tsx",
        lineNumber: 255,
        columnNumber: 10
    }, this);
}
function _AllocationDonutDataMap(__0, index_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: COLORS[index_0 % COLORS.length],
        stroke: "var(--surface)",
        strokeWidth: 2
    }, `cell-${index_0}`, false, {
        fileName: "[project]/src/components/charts/donut-chart.tsx",
        lineNumber: 264,
        columnNumber: 10
    }, this);
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ActiveShape");
__turbopack_context__.k.register(_c1, "CustomTooltip");
__turbopack_context__.k.register(_c2, "AllocationDonut");
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
"[project]/src/app/(app)/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/metric-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/pnl-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charts$2f$performance$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charts/performance-chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charts$2f$donut$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charts/donut-chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const EVENT_ICONS = {
    tax: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
    sip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
    elss: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
};
const EVENT_COLORS = {
    tax: "var(--accent-brand)",
    sip: "var(--neutral)",
    elss: "var(--positive)"
};
function DashboardPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "ba4385047137f5f9db951d31207cc0a6c760845b9271d088975f62c5d1373765") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ba4385047137f5f9db951d31207cc0a6c760845b9271d088975f62c5d1373765";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePerformanceData"])(12);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const perfData = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = perfData.slice(-20).map(_DashboardPageAnonymous);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const sparkline = t1;
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCard"], {
            label: "Net Worth",
            value: 4850000,
            valueType: "currency",
            change: 18.2,
            changeType: "percent",
            benchmark: {
                label: "Nifty 50",
                value: 3.1
            },
            sparkline: sparkline
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCard"], {
            label: "Today's Change",
            value: 12480,
            valueType: "currency",
            change: 0.26,
            changeType: "percent"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
            children: [
                t2,
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCard"], {
                    label: "XIRR",
                    value: 22.4,
                    valueType: "percent",
                    change: 3.2,
                    changeType: "percent",
                    benchmark: {
                        label: "Nifty CAGR",
                        value: 14.1
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 63,
                    columnNumber: 88
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCard"], {
                    label: "vs Benchmark",
                    value: 8.3,
                    valueType: "percent",
                    change: 8.3,
                    changeType: "percent"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 66,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            background: "var(--surface)",
            borderColor: "var(--border)",
            minHeight: 320
        };
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border p-5 lg:col-span-2",
            style: t5,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-sm font-semibold mb-4",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "Portfolio Performance"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 84,
                    columnNumber: 74
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 260
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charts$2f$performance$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceChart"], {
                        data: perfData
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                        lineNumber: 88,
                        columnNumber: 10
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 86,
                    columnNumber: 36
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border p-5",
                    style: t7,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold mb-4",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: "Allocation"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 105,
                            columnNumber: 119
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: 280
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charts$2f$donut$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllocationDonut"], {
                                data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allocationData"]
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                lineNumber: 109,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 107,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 105,
                    columnNumber: 69
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    let t10;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold mb-4",
            style: {
                color: "var(--text-primary)"
            },
            children: "Top Movers Today"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, this);
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border p-5",
            style: t9,
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    "Symbol",
                                    "Name",
                                    "Change",
                                    "P&L"
                                ].map(_DashboardPageAnonymous2)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                lineNumber: 135,
                                columnNumber: 99
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 135,
                            columnNumber: 92
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topMovers"].map(_DashboardPageTopMoversMap)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 135,
                            columnNumber: 183
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 135,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    let t12;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    let t13;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold mb-4",
            style: {
                color: "var(--text-primary)"
            },
            children: "Upcoming Events"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 152,
            columnNumber: 11
        }, this);
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border p-5",
                    style: t12,
                    children: [
                        t13,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upcomingEvents"].map(_DashboardPageUpcomingEventsMap)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 161,
                            columnNumber: 127
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 161,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[15] = t14;
    } else {
        t14 = $[15];
    }
    let t15;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = {
            background: "var(--accent-subtle)",
            borderColor: "rgba(245,158,11,0.2)"
        };
        $[16] = t15;
    } else {
        t15 = $[16];
    }
    let t16;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = {
            background: "rgba(245,158,11,0.2)"
        };
        $[17] = t16;
    } else {
        t16 = $[17];
    }
    let t17;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-8 h-8 rounded-lg flex items-center justify-center",
            style: t16,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                size: 16,
                style: {
                    color: "var(--accent-brand)"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 187,
                columnNumber: 92
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[18] = t17;
    } else {
        t17 = $[18];
    }
    let t18;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-medium uppercase tracking-widest",
            style: {
                color: "var(--accent-brand)"
            },
            children: "Tax Snapshot — FY 2025–26"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 196,
            columnNumber: 11
        }, this);
        $[19] = t18;
    } else {
        t18 = $[19];
    }
    let t19;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = {
            color: "var(--text-secondary)"
        };
        $[20] = t19;
    } else {
        t19 = $[20];
    }
    let t20;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-mono font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "₹32,500"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 214,
            columnNumber: 11
        }, this);
        $[21] = t20;
    } else {
        t20 = $[21];
    }
    let t21;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t18,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mt-0.5",
                            style: t19,
                            children: [
                                "You have used",
                                " ",
                                t20,
                                " ",
                                "of your ₹1.25L LTCG exemption.",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--positive)"
                                    },
                                    children: "₹92,500 remaining."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 172
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 223,
                            columnNumber: 67
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 223,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        $[22] = t21;
    } else {
        t21 = $[22];
    }
    let t22;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-widest mb-1",
            style: {
                color: "var(--text-muted)"
            },
            children: "LTCG Realised"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[23] = t22;
    } else {
        t22 = $[23];
    }
    let t23;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold font-mono",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "₹32,500"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 241,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        $[24] = t23;
    } else {
        t23 = $[24];
    }
    let t24;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-widest mb-1",
            style: {
                color: "var(--text-muted)"
            },
            children: "STCG Realised"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[25] = t24;
    } else {
        t24 = $[25];
    }
    let t25;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold font-mono",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "₹1,700"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 259,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[26] = t25;
    } else {
        t25 = $[26];
    }
    let t26;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-widest mb-1",
            style: {
                color: "var(--text-muted)"
            },
            children: "Est. Tax"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 268,
            columnNumber: 11
        }, this);
        $[27] = t26;
    } else {
        t26 = $[27];
    }
    let t27;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                t26,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold font-mono",
                    style: {
                        color: "var(--negative)"
                    },
                    children: "₹4,063"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 277,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 277,
            columnNumber: 11
        }, this);
        $[28] = t27;
    } else {
        t27 = $[28];
    }
    let t28;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t4,
                t8,
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border p-5",
                    style: t15,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between flex-wrap gap-4",
                        children: [
                            t21,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    t23,
                                    t25,
                                    t27,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90",
                                        style: {
                                            background: "var(--accent-brand)",
                                            color: "var(--accent-foreground)"
                                        },
                                        children: "View Tax Details →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 230
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                lineNumber: 286,
                                columnNumber: 174
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                        lineNumber: 286,
                        columnNumber: 102
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 286,
                    columnNumber: 51
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 286,
            columnNumber: 11
        }, this);
        $[29] = t28;
    } else {
        t28 = $[29];
    }
    return t28;
}
_c = DashboardPage;
function _DashboardPageUpcomingEventsMap(ev, i) {
    const Icon = EVENT_ICONS[ev.type];
    const color = EVENT_COLORS[ev.type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            x: -8
        },
        animate: {
            opacity: 1,
            x: 0
        },
        transition: {
            delay: i * 0.05,
            duration: 0.2
        },
        className: "flex items-start gap-3 p-3 rounded-lg border",
        style: {
            background: ev.urgent ? "var(--accent-subtle)" : "var(--surface-elevated)",
            borderColor: ev.urgent ? "rgba(245,158,11,0.2)" : "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                style: {
                    background: `${color}20`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 14,
                    style: {
                        color
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 313,
                    columnNumber: 8
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 311,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: ev.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                        lineNumber: 315,
                        columnNumber: 50
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-0.5",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: ev.desc
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                        lineNumber: 317,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 315,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-mono shrink-0",
                style: {
                    color: "var(--text-muted)"
                },
                children: ev.date
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 319,
                columnNumber: 29
            }, this)
        ]
    }, i, true, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 299,
        columnNumber: 10
    }, this);
}
function _DashboardPageTopMoversMap(m) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "transition-colors duration-100",
        style: {
            height: 44
        },
        onMouseEnter: _DashboardPageTopMoversMapTrOnMouseEnter,
        onMouseLeave: _DashboardPageTopMoversMapTrOnMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-sm font-mono font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: m.symbol
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 326,
                columnNumber: 118
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-sm truncate max-w-[120px]",
                style: {
                    color: "var(--text-secondary)"
                },
                children: m.name
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 328,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$pnl$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PnLBadge"], {
                    value: m.changePct,
                    type: "percent"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 330,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 330,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-mono",
                    style: {
                        color: m.pnl >= 0 ? "var(--positive)" : "var(--negative)"
                    },
                    children: [
                        m.pnl >= 0 ? "+" : "",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(m.pnl)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 330,
                    columnNumber: 104
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 330,
                columnNumber: 77
            }, this)
        ]
    }, m.symbol, true, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 324,
        columnNumber: 10
    }, this);
}
function _DashboardPageTopMoversMapTrOnMouseLeave(e_0) {
    return e_0.currentTarget.style.background = "transparent";
}
function _DashboardPageTopMoversMapTrOnMouseEnter(e) {
    return e.currentTarget.style.background = "var(--surface-elevated)";
}
function _DashboardPageAnonymous2(h) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "text-left text-xs font-medium uppercase tracking-widest pb-2",
        style: {
            color: "var(--text-muted)"
        },
        children: h
    }, h, false, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 341,
        columnNumber: 10
    }, this);
}
function _DashboardPageAnonymous(d) {
    return {
        v: d.portfolio
    };
}
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_89340f25._.js.map