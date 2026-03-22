(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/stock/SectionNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionNav",
    ()=>SectionNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const SECTIONS = [
    {
        id: "overview",
        label: "Overview"
    },
    {
        id: "chart",
        label: "Price Chart"
    },
    {
        id: "financials",
        label: "Financials"
    },
    {
        id: "ownership",
        label: "Ownership"
    },
    {
        id: "documents",
        label: "Docs"
    },
    {
        id: "analytics",
        label: "Analytics"
    },
    {
        id: "peers",
        label: "Peer Comparison"
    }
];
function SectionNav() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "c9d32631d9831ed0dd7e2b91c826a97af8efd6507872216d0a5c52a9ed20415e") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c9d32631d9831ed0dd7e2b91c826a97af8efd6507872216d0a5c52a9ed20415e";
    }
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "SectionNav[useEffect()]": ()=>{
                observerRef.current = new IntersectionObserver((entries)=>{
                    const visible = entries.filter(_SectionNavUseEffectAnonymousEntriesFilter).sort(_SectionNavUseEffectAnonymousAnonymous);
                    if (visible[0]) {
                        setActive(visible[0].target.id);
                    }
                }, {
                    rootMargin: "-20% 0px -70% 0px",
                    threshold: [
                        0,
                        0.25,
                        0.5,
                        1
                    ]
                });
                SECTIONS.forEach({
                    "SectionNav[useEffect() > SECTIONS.forEach()]": (t2)=>{
                        const { id } = t2;
                        const el = document.getElementById(id);
                        if (el) {
                            observerRef.current.observe(el);
                        }
                    }
                }["SectionNav[useEffect() > SECTIONS.forEach()]"]);
                return ()=>observerRef.current?.disconnect();
            }
        })["SectionNav[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "SectionNav[scrollTo]": (id_0)=>{
                const el_0 = document.getElementById(id_0);
                if (el_0) {
                    const top = el_0.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top,
                        behavior: "smooth"
                    });
                }
                setActive(id_0);
                setMobileOpen(false);
            }
        })["SectionNav[scrollTo]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const scrollTo = t2;
    let t3;
    if ($[4] !== active) {
        t3 = SECTIONS.find({
            "SectionNav[SECTIONS.find()]": (s)=>s.id === active
        }["SectionNav[SECTIONS.find()]"])?.label ?? "Overview";
        $[4] = active;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const activeLabel = t3;
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            background: "color-mix(in srgb, var(--background) 94%, transparent)",
            borderColor: "var(--border)"
        };
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== active) {
        t5 = SECTIONS.map({
            "SectionNav[SECTIONS.map()]": (s_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "SectionNav[SECTIONS.map() > <button>.onClick]": ()=>scrollTo(s_0.id)
                    }["SectionNav[SECTIONS.map() > <button>.onClick]"],
                    className: `whitespace-nowrap border-b-[3px] px-0 py-3 text-sm transition-colors ${active === s_0.id ? "font-semibold" : "font-medium"}`,
                    style: active === s_0.id ? {
                        color: "var(--text-primary)",
                        borderBottomColor: "var(--text-primary)"
                    } : {
                        color: "var(--text-muted)",
                        borderBottomColor: "transparent"
                    },
                    children: s_0.label
                }, s_0.id, false, {
                    fileName: "[project]/src/components/stock/SectionNav.tsx",
                    lineNumber: 125,
                    columnNumber: 44
                }, this)
        }["SectionNav[SECTIONS.map()]"]);
        $[7] = active;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto px-6 md:px-8 hidden md:block",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-8 overflow-x-auto",
                children: t5
            }, void 0, false, {
                fileName: "[project]/src/components/stock/SectionNav.tsx",
                lineNumber: 142,
                columnNumber: 64
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 142,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "SectionNav[<button>.onClick]": ()=>setMobileOpen(_SectionNavButtonOnClickSetMobileOpen)
        })["SectionNav[<button>.onClick]"];
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            color: "var(--text-primary)"
        };
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            color: "var(--text-primary)"
        };
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== activeLabel) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "Jump to: ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: t9,
                    children: activeLabel
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/SectionNav.tsx",
                    lineNumber: 177,
                    columnNumber: 26
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[14] = activeLabel;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    const t11 = `transition-transform ${mobileOpen ? "rotate-180" : ""}`;
    let t12;
    if ($[16] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            size: 16,
            className: t11
        }, void 0, false, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[16] = t11;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== t10 || $[19] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t7,
            className: "flex w-full items-center justify-between px-0 py-3 text-sm font-medium",
            style: t8,
            children: [
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t12;
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== active || $[22] !== mobileOpen) {
        t14 = mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 overflow-hidden rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: SECTIONS.map({
                "SectionNav[SECTIONS.map()]": (s_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "SectionNav[SECTIONS.map() > <button>.onClick]": ()=>scrollTo(s_1.id)
                        }["SectionNav[SECTIONS.map() > <button>.onClick]"],
                        className: `w-full text-left px-4 py-3 text-sm transition-colors ${active === s_1.id ? "font-semibold" : "hover:bg-[var(--surface-elevated)]"}`,
                        style: {
                            color: active === s_1.id ? "var(--text-primary)" : "var(--text-primary)",
                            background: active === s_1.id ? "var(--surface-elevated)" : undefined
                        },
                        children: s_1.label
                    }, s_1.id, false, {
                        fileName: "[project]/src/components/stock/SectionNav.tsx",
                        lineNumber: 207,
                        columnNumber: 46
                    }, this)
            }["SectionNav[SECTIONS.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 203,
            columnNumber: 25
        }, this);
        $[21] = active;
        $[22] = mobileOpen;
        $[23] = t14;
    } else {
        t14 = $[23];
    }
    let t15;
    if ($[24] !== t13 || $[25] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1600px] md:hidden",
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[24] = t13;
        $[25] = t14;
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[27] !== t15 || $[28] !== t6) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "sticky top-[64px] z-30 w-full border-b backdrop-blur-xl -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-4 md:mb-8",
            style: t4,
            children: [
                t6,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/SectionNav.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[27] = t15;
        $[28] = t6;
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    return t16;
}
_s(SectionNav, "YgGpOdifyAFjNIR+5O8HvsPbHZ0=");
_c = SectionNav;
function _SectionNavButtonOnClickSetMobileOpen(o) {
    return !o;
}
function _SectionNavUseEffectAnonymousAnonymous(a, b) {
    return b.intersectionRatio - a.intersectionRatio;
}
function _SectionNavUseEffectAnonymousEntriesFilter(e) {
    return e.isIntersecting;
}
var _c;
__turbopack_context__.k.register(_c, "SectionNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/core/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Core type definitions for the Artha Charting Engine.
 * All shared types, enums, and interfaces live here.
 */ // ── Timeframe ─────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "DARK_THEME",
    ()=>DARK_THEME,
    "LIGHT_THEME",
    ()=>LIGHT_THEME,
    "TIMEFRAMES",
    ()=>TIMEFRAMES,
    "getChartTheme",
    ()=>getChartTheme
]);
const TIMEFRAMES = [
    {
        value: '1m',
        label: '1m',
        seconds: 60
    },
    {
        value: '5m',
        label: '5m',
        seconds: 300
    },
    {
        value: '15m',
        label: '15m',
        seconds: 900
    },
    {
        value: '30m',
        label: '30m',
        seconds: 1800
    },
    {
        value: '1h',
        label: '1H',
        seconds: 3600
    },
    {
        value: '4h',
        label: '4H',
        seconds: 14400
    },
    {
        value: '1D',
        label: '1D',
        seconds: 86400
    },
    {
        value: '1W',
        label: '1W',
        seconds: 604800
    },
    {
        value: '1M',
        label: '1M',
        seconds: 2592000
    }
];
function getChartTheme(mode, contrast = 'balanced') {
    const isDark = mode === 'dark';
    const fillOpacity = contrast === 'vivid' ? isDark ? 0.15 : 0.12 : isDark ? 0.10 : 0.07;
    return {
        background: isDark ? '#1E293B' : '#FFFFFF',
        text: isDark ? '#F1F5F9' : '#0F172A',
        grid: isDark ? '#334155' : '#F1F5F9',
        border: isDark ? '#475569' : '#E2E8F0',
        upColor: isDark ? '#10B981' : '#059669',
        downColor: isDark ? '#EF4444' : '#DC2626',
        wickUpColor: isDark ? '#10B981' : '#059669',
        wickDownColor: isDark ? '#EF4444' : '#DC2626',
        volumeUpColor: isDark ? 'rgba(16,185,129,0.70)' : 'rgba(5,150,105,0.70)',
        volumeDownColor: isDark ? 'rgba(239,68,68,0.70)' : 'rgba(220,38,38,0.70)',
        crosshairColor: isDark ? '#94A3B8' : '#475569',
        areaFillColor: isDark ? `rgba(59,130,246,${fillOpacity})` : `rgba(67,56,202,${fillOpacity})`
    };
}
const LIGHT_THEME = getChartTheme('light');
const DARK_THEME = getChartTheme('dark');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/core/ChartEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartEngine",
    ()=>ChartEngine
]);
/**
 * ChartEngine — thin wrapper around lightweight-charts v5 IChartApi.
 *
 * Responsibilities:
 *  - Create and destroy the chart instance
 *  - Apply and update theme (light/dark)
 *  - Handle container resize via ResizeObserver
 *  - Expose the raw IChartApi for PaneManager and SeriesManager
 *  - Emit crosshair events to subscribers
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-client] (ecmascript)");
;
;
class ChartEngine {
    _chart = null;
    _container = null;
    _resizeObserver = null;
    _crosshairSubs = new Set();
    _theme = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LIGHT_THEME"];
    // ── Lifecycle ──────────────────────────────────────────────────────────────
    /** Initialise the chart into the given DOM container. */ init(container, theme = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LIGHT_THEME"]) {
        if (this._chart) this.destroy();
        this._container = container;
        this._theme = theme;
        this._chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChart"])(container, this._buildOptions(this._theme));
        // Crosshair events
        this._chart.subscribeCrosshairMove((param)=>{
            const bar = param.seriesData.size > 0 ? Array.from(param.seriesData.values())[0] : null;
            const data = {
                time: param.time != null ? param.time : null,
                bar,
                seriesData: param.seriesData,
                x: param.point?.x ?? 0,
                y: param.point?.y ?? 0
            };
            this._crosshairSubs.forEach((fn)=>fn(data));
        });
        // Resize observer — keeps chart filling its container
        this._resizeObserver = new ResizeObserver(()=>{
            if (this._chart && this._container) {
                this._chart.applyOptions({
                    width: this._container.clientWidth,
                    height: this._container.clientHeight
                });
            }
        });
        this._resizeObserver.observe(container);
        return this._chart;
    }
    /** Destroy the chart and clean up observers. */ destroy() {
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this._chart?.remove();
        this._chart = null;
        this._container = null;
        this._crosshairSubs.clear();
    }
    // ── Accessors ──────────────────────────────────────────────────────────────
    get api() {
        if (!this._chart) throw new Error('ChartEngine: chart not initialised — call init() first.');
        return this._chart;
    }
    get isInitialised() {
        return this._chart !== null;
    }
    get theme() {
        return this._theme;
    }
    // ── Theme ──────────────────────────────────────────────────────────────────
    /** Switch between light and dark themes at runtime. */ applyTheme(theme) {
        this._theme = theme;
        this._chart?.applyOptions(this._buildOptions(this._theme));
    }
    // ── Crosshair subscriptions ────────────────────────────────────────────────
    subscribeCrosshair(fn) {
        this._crosshairSubs.add(fn);
        return ()=>this._crosshairSubs.delete(fn);
    }
    // ── Time-scale helpers ─────────────────────────────────────────────────────
    fitContent() {
        this._chart?.timeScale().fitContent();
    }
    scrollToRealtime() {
        this._chart?.timeScale().scrollToRealTime();
    }
    // ── Private ────────────────────────────────────────────────────────────────
    _buildOptions(theme) {
        return {
            autoSize: false,
            layout: {
                background: {
                    color: theme.background
                },
                textColor: theme.text,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 11
            },
            grid: {
                vertLines: {
                    color: theme.grid,
                    visible: true
                },
                horzLines: {
                    color: theme.grid,
                    style: 0
                }
            },
            crosshair: {
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CrosshairMode"].Normal,
                vertLine: {
                    color: theme.crosshairColor,
                    labelBackgroundColor: theme.background
                },
                horzLine: {
                    color: theme.crosshairColor,
                    labelBackgroundColor: theme.background
                }
            },
            rightPriceScale: {
                borderColor: theme.border,
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1
                },
                ticksVisible: true,
                entireTextOnly: false
            },
            localization: {
                priceFormatter: (price)=>{
                    const absPrice = Math.abs(price);
                    if (absPrice >= 1e7) return `₹${(price / 1e7).toFixed(2)}Cr`;
                    if (absPrice >= 1e5) return `₹${(price / 1e5).toFixed(2)}L`;
                    if (absPrice >= 1e3) return `₹${(price / 1e3).toFixed(1)}K`;
                    return `₹${price.toFixed(2)}`;
                }
            },
            timeScale: {
                borderColor: theme.border,
                timeVisible: true,
                secondsVisible: false,
                shiftVisibleRangeOnNewBar: true
            }
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/core/PaneManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PaneManager — manages multi-pane lifecycle on top of lightweight-charts v5.
 *
 * Responsibilities:
 *  - Track active panes (main + sub-panes for indicators)
 *  - Provide typed add/remove helpers that delegate to IChartApi
 *  - Keep pane metadata (height, indicatorIds) in sync
 */ __turbopack_context__.s([
    "PaneManager",
    ()=>PaneManager
]);
class PaneManager {
    _chart;
    _panes = new Map();
    _nextIndex = 1;
    /** Main pane id is a stable constant. */ static MAIN_PANE_ID = 'pane-main';
    constructor(chart){
        this._chart = chart;
        // Register the always-present main pane
        this._panes.set(PaneManager.MAIN_PANE_ID, {
            id: PaneManager.MAIN_PANE_ID,
            index: 0,
            height: 400,
            indicators: []
        });
    }
    // ── Accessors ──────────────────────────────────────────────────────────────
    get panes() {
        return Array.from(this._panes.values()).sort((a, b)=>a.index - b.index);
    }
    getPane(id) {
        return this._panes.get(id);
    }
    getPaneByIndex(index) {
        return Array.from(this._panes.values()).find((p)=>p.index === index);
    }
    getPaneRects() {
        const lwcPanes = this._chart.panes();
        const rects = [];
        let currentTop = 0;
        lwcPanes.forEach((p, i)=>{
            const height = p.getHeight();
            const state = this.getPaneByIndex(i);
            rects.push({
                id: state?.id ?? `unknown-${i}`,
                index: i,
                top: currentTop,
                height,
                indicators: state?.indicators || []
            });
            currentTop += height + 1; // +1 for typical 1px LWC separator
        });
        return rects;
    }
    // ── Mutations ──────────────────────────────────────────────────────────────
    /**
   * Recalculate and apply stretch factors to all panes.
   * Main pane gets the remaining space, each sub-pane gets 15% of total height.
   */ _updateStretchFactors() {
        const lwcPanes = this._chart.panes();
        if (!lwcPanes || lwcPanes.length === 0) return;
        const subPaneCount = lwcPanes.length - 1;
        const subPanePercentage = 15; // 15% per sub-pane
        const totalSubPanePercentage = subPaneCount * subPanePercentage;
        const mainPanePercentage = Math.max(10, 100 - totalSubPanePercentage); // Keep at least 10% for main pane
        // LWC normalizes these values relative to their sum
        lwcPanes.forEach((pane, index)=>{
            if (index === 0) {
                pane.setStretchFactor(mainPanePercentage);
            } else {
                pane.setStretchFactor(subPanePercentage);
            }
        });
    }
    /**
   * Add a new sub-pane below the existing panes.
   * Returns the new PaneState.
   */ addPane(height = 15) {
        const id = `pane-${this._nextIndex}`;
        const state = {
            id,
            index: this._nextIndex,
            height,
            indicators: []
        };
        this._panes.set(id, state);
        this._nextIndex++;
        // We need to wait a tick for the chart to create the pane internally
        // when a series is added to it, but we can't do it right here since
        // addPane is called *before* addSeries. We'll update stretch factors
        // after the series is actually added.
        setTimeout(()=>this._updateStretchFactors(), 0);
        return state;
    }
    /**
   * Remove a sub-pane. The main pane (index 0) cannot be removed.
   * Callers must already have removed all series from this pane first.
   */ removePane(id) {
        const pane = this._panes.get(id);
        if (!pane || pane.index === 0) return;
        this._panes.delete(id);
        setTimeout(()=>this._updateStretchFactors(), 0);
    }
    /** Register an indicator id against a pane. */ addIndicatorToPane(paneId, indicatorId) {
        const pane = this._panes.get(paneId);
        if (pane && !pane.indicators.includes(indicatorId)) {
            pane.indicators.push(indicatorId);
        }
    }
    /** Remove an indicator id from its pane. */ removeIndicatorFromPane(paneId, indicatorId) {
        const pane = this._panes.get(paneId);
        if (pane) {
            pane.indicators = pane.indicators.filter((i)=>i !== indicatorId);
        }
    }
    /** Update stored height (for persistence); doesn't resize the canvas pane. */ setPaneHeight(id, height) {
        const pane = this._panes.get(id);
        if (pane) pane.height = height;
    }
    /** Serialize current pane layout for persistence. */ serialize() {
        return this.panes;
    }
    /** Restore pane layout from persisted state (re-creates sub-panes). */ restore(states) {
        this._panes.clear();
        states.forEach((s)=>{
            this._panes.set(s.id, {
                ...s
            });
            if (s.index >= this._nextIndex) this._nextIndex = s.index + 1;
        });
    }
    // ── Internal pane index lookup for lwc series API ──────────────────────────
    /**
   * Returns the 0-based pane index to pass to chart.addSeries(..., paneIndex).
   * Main pane = 0; sub-panes = 1, 2, … in creation order.
   */ getPaneIndex(paneId) {
        return this._panes.get(paneId)?.index ?? 0;
    }
    // ── Reference to chart API (for callers that need it) ─────────────────────
    get chart() {
        return this._chart;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/core/SeriesManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeriesManager",
    ()=>SeriesManager
]);
/**
 * SeriesManager — tracks all series on the chart keyed by UUID.
 *
 * Responsibilities:
 *  - Add/remove/update series of any type (candlestick, line, histogram, etc.)
 *  - Map series to their parent pane index
 *  - Provide typed update helpers for streaming data
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript)");
;
class SeriesManager {
    _chart;
    _series = new Map();
    constructor(chart){
        this._chart = chart;
    }
    // ── Getters ────────────────────────────────────────────────────────────────
    get all() {
        return Array.from(this._series.values());
    }
    get(id) {
        return this._series.get(id);
    }
    getAll() {
        return Array.from(this._series.values());
    }
    findEntryByApi(api) {
        for (const entry of this._series.values()){
            if (entry.api === api) return entry;
        }
        return undefined;
    }
    getByIndicator(indicatorId) {
        return Array.from(this._series.values()).filter((s)=>s.indicatorId === indicatorId);
    }
    // ── Add series ─────────────────────────────────────────────────────────────
    addCandlestick(id, theme, paneIndex = 0, opts = {}) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CandlestickSeries"], {
            upColor: theme.upColor,
            downColor: theme.downColor,
            borderUpColor: theme.upColor,
            borderDownColor: theme.downColor,
            wickUpColor: theme.wickUpColor,
            wickDownColor: theme.wickDownColor,
            ...opts
        }, paneIndex);
        this._series.set(id, {
            id,
            kind: 'candlestick',
            paneIndex,
            api: series
        });
        return series;
    }
    addOhlc(id, theme, paneIndex = 0, opts = {}) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarSeries"], {
            upColor: theme.upColor,
            downColor: theme.downColor,
            ...opts
        }, paneIndex);
        this._series.set(id, {
            id,
            kind: 'bar',
            paneIndex,
            api: series
        });
        return series;
    }
    addBar(id, theme, paneIndex = 0, opts = {}) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarSeries"], {
            upColor: theme.upColor,
            downColor: theme.downColor,
            ...opts
        }, paneIndex);
        this._series.set(id, {
            id,
            kind: 'bar',
            paneIndex,
            api: series
        });
        return series;
    }
    addLine(id, paneIndex = 0, opts = {}, indicatorId) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSeries"], opts, paneIndex);
        this._series.set(id, {
            id,
            kind: 'line',
            paneIndex,
            api: series,
            indicatorId
        });
        return series;
    }
    addArea(id, paneIndex = 0, opts = {}, indicatorId) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaSeries"], opts, paneIndex);
        this._series.set(id, {
            id,
            kind: 'area',
            paneIndex,
            api: series,
            indicatorId
        });
        return series;
    }
    addHistogram(id, paneIndex = 0, opts = {}, indicatorId) {
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistogramSeries"], opts, paneIndex);
        this._series.set(id, {
            id,
            kind: 'histogram',
            paneIndex,
            api: series,
            indicatorId
        });
        return series;
    }
    // ── Remove ─────────────────────────────────────────────────────────────────
    remove(id) {
        const entry = this._series.get(id);
        if (!entry) return;
        try {
            this._chart.removeSeries(entry.api);
        } catch  {
        // Series may have already been removed (e.g. chart destroyed)
        }
        this._series.delete(id);
    }
    removeByIndicator(indicatorId) {
        this.getByIndicator(indicatorId).forEach((s)=>this.remove(s.id));
    }
    // ── Data updates ───────────────────────────────────────────────────────────
    /** Set full dataset on a candlestick / OHLC / bar series. */ setOHLCVData(id, bars) {
        const entry = this._series.get(id);
        if (!entry) return;
        const kind = entry.kind;
        if (kind === 'candlestick') {
            const data = bars.map((b)=>({
                    time: b.time,
                    open: b.open,
                    high: b.high,
                    low: b.low,
                    close: b.close
                }));
            entry.api.setData(data);
        } else if (kind === 'ohlc' || kind === 'bar') {
            const data = bars.map((b)=>({
                    time: b.time,
                    open: b.open,
                    high: b.high,
                    low: b.low,
                    close: b.close
                }));
            entry.api.setData(data);
        } else if (kind === 'line') {
            const data = bars.map((b)=>({
                    time: b.time,
                    value: b.close
                }));
            entry.api.setData(data);
        } else if (kind === 'area') {
            const data = bars.map((b)=>({
                    time: b.time,
                    value: b.close
                }));
            entry.api.setData(data);
        }
    }
    /** Set histogram (volume) data. */ setVolumeData(id, bars, upColor, downColor) {
        const entry = this._series.get(id);
        if (!entry || entry.kind !== 'histogram') return;
        const toHistogramValue = (value)=>{
            const parsed = typeof value === 'number' ? value : Number(value ?? 0);
            return Number.isFinite(parsed) ? parsed : 0;
        };
        const data = bars.map((b, i)=>({
                time: b.time,
                value: toHistogramValue(b.volume),
                color: i === 0 ? upColor : b.close >= bars[i - 1].close ? upColor : downColor
            }));
        entry.api.setData(data);
    }
    /** Set generic line/histogram data (for indicators). */ setLineData(id, data) {
        const entry = this._series.get(id);
        if (!entry) return;
        entry.api.setData(data);
    }
    setHistogramData(id, data) {
        const entry = this._series.get(id);
        if (!entry) return;
        entry.api.setData(data);
    }
    // ── Live update (streaming last bar) ──────────────────────────────────────
    updateLastBar(id, bar) {
        const entry = this._series.get(id);
        if (!entry) return;
        if (entry.kind === 'candlestick') {
            entry.api.update({
                time: bar.time,
                open: bar.open,
                high: bar.high,
                low: bar.low,
                close: bar.close
            });
        } else if (entry.kind === 'line' || entry.kind === 'area') {
            entry.api.update({
                time: bar.time,
                value: bar.close
            });
        }
    }
    // ── Visibility ─────────────────────────────────────────────────────────────
    setVisible(id, visible) {
        const entry = this._series.get(id);
        if (!entry) return;
        entry.api.applyOptions({
            visible
        });
    }
    // ── Cleanup ────────────────────────────────────────────────────────────────
    clear() {
        this._series.forEach((_, id)=>this.remove(id));
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/data/useChartData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartData",
    ()=>useChartData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
/**
 * useChartData — React hook that fetches OHLCV bars from the existing
 * /api/stocks/[symbol]/chart endpoint and returns them as OHLCVBar[].
 *
 * Maps the server's PriceBar (date string) to lightweight-charts time (Unix seconds).
 */ 'use client';
;
;
/** Intraday timeframes need a shorter date range; EOD uses the existing ranges. */ const TF_TO_RANGE = {
    '1m': '5d',
    '5m': '1m',
    '15m': '3m',
    '30m': '3m',
    '1h': '6m',
    '4h': '1y',
    '1D': '3y',
    '1W': '5y',
    '1M': '10y'
};
function dateStrToUnix(dateStr) {
    return Math.floor(new Date(dateStr).getTime() / 1000);
}
function toFiniteNumber(value, fallback = 0) {
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}
function useChartData(symbol, timeframe) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "2ffda10e6333246a97072f4b45c3dd55dbd178450ab4629c3b624fbddbf3c565") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2ffda10e6333246a97072f4b45c3dd55dbd178450ab4629c3b624fbddbf3c565";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [bars, setBars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rev, setRev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "useChartData[refetch]": ()=>setRev(_useChartDataRefetchSetRev)
        })["useChartData[refetch]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const refetch = t1;
    let t2;
    if ($[3] !== symbol || $[4] !== timeframe) {
        t2 = ({
            "useChartData[useEffect()]": ()=>{
                if (!symbol) {
                    return;
                }
                let cancelled = false;
                setLoading(true);
                setError(null);
                const range = TF_TO_RANGE[timeframe] ?? "3y";
                fetch(`/api/stocks/${encodeURIComponent(symbol)}/chart?range=${range}&tf=${timeframe}`).then(_useChartDataUseEffectAnonymous).then({
                    "useChartData[useEffect() > (anonymous)()]": (data)=>{
                        if (cancelled) {
                            return;
                        }
                        if (data.error) {
                            throw new Error(data.error);
                        }
                        const mapped = (data.prices ?? []).map(_useChartDataUseEffectAnonymousAnonymous).sort(_useChartDataUseEffectAnonymousAnonymous2);
                        const deduped = [];
                        for (const b_0 of mapped){
                            if (deduped.length === 0 || b_0.time > deduped[deduped.length - 1].time) {
                                deduped.push(b_0);
                            }
                        }
                        setBars(deduped);
                    }
                }["useChartData[useEffect() > (anonymous)()]"]).catch({
                    "useChartData[useEffect() > (anonymous)()]": (e)=>{
                        if (!cancelled) {
                            setError(String(e.message ?? e));
                        }
                    }
                }["useChartData[useEffect() > (anonymous)()]"]).finally({
                    "useChartData[useEffect() > (anonymous)()]": ()=>{
                        if (!cancelled) {
                            setLoading(false);
                        }
                    }
                }["useChartData[useEffect() > (anonymous)()]"]);
                return ()=>{
                    cancelled = true;
                };
            }
        })["useChartData[useEffect()]"];
        $[3] = symbol;
        $[4] = timeframe;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== rev || $[7] !== symbol || $[8] !== timeframe) {
        t3 = [
            symbol,
            timeframe,
            rev
        ];
        $[6] = rev;
        $[7] = symbol;
        $[8] = timeframe;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[10] !== bars || $[11] !== error || $[12] !== loading) {
        t4 = {
            bars,
            loading,
            error,
            refetch
        };
        $[10] = bars;
        $[11] = error;
        $[12] = loading;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
_s(useChartData, "ZkC8DInWIxpwVcFoPa80cTmutKA=");
function _useChartDataUseEffectAnonymousAnonymous2(a, b) {
    return a.time - b.time;
}
function _useChartDataUseEffectAnonymousAnonymous(p) {
    return {
        time: dateStrToUnix(p.date),
        open: toFiniteNumber(p.open),
        high: toFiniteNumber(p.high),
        low: toFiniteNumber(p.low),
        close: toFiniteNumber(p.close),
        volume: toFiniteNumber(p.volume, 0)
    };
}
function _useChartDataUseEffectAnonymous(r_0) {
    if (!r_0.ok) {
        throw new Error(`HTTP ${r_0.status}`);
    }
    return r_0.json();
}
function _useChartDataRefetchSetRev(r) {
    return r + 1;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * IndicatorBase — abstract base class for all chart indicators.
 *
 * Design principles (OCP):
 *  - New indicators extend this class and register themselves in registry.ts
 *  - No existing code changes when a new indicator is added
 *
 * Lifecycle:
 *  1. compute(bars)      — pure function, returns series data arrays
 *  2. attach(sm, pm)     — adds series to the chart via SeriesManager
 *  3. updateData(bars)   — re-compute + update series data
 *  4. detach()           — removes all owned series + panes
 */ __turbopack_context__.s([
    "IndicatorBase",
    ()=>IndicatorBase
]);
class IndicatorBase {
    _config;
    _sm = null;
    _pm = null;
    _theme = null;
    _ownedPaneId = null;
    _seriesIds = [];
    constructor(config){
        this._config = {
            ...config
        };
    }
    // ── Accessors ──────────────────────────────────────────────────────────────
    get id() {
        return this._config.id;
    }
    get type() {
        return this._config.type;
    }
    get config() {
        return this._config;
    }
    // ── Shared lifecycle ───────────────────────────────────────────────────────
    /** Update series data after a bar change or param change. */ updateData(bars) {
        if (!this._sm) return;
        const results = this.compute(bars);
        results.forEach((r)=>{
            const entry = this._sm.get(r.seriesId);
            if (!entry) return;
            if (entry.kind === 'histogram') {
                this._sm.setHistogramData(r.seriesId, r.data);
            } else {
                this._sm.setLineData(r.seriesId, r.data);
            }
        });
    }
    /** Remove all owned series and optionally the sub-pane. */ detach() {
        this._seriesIds.forEach((id)=>this._sm?.remove(id));
        this._seriesIds = [];
        if (this._ownedPaneId) {
            this._pm?.removePane(this._ownedPaneId);
            this._ownedPaneId = null;
        }
        this._sm = null;
        this._pm = null;
    }
    /** Update config params and recompute if attached. */ updateConfig(patch, bars) {
        this._config = {
            ...this._config,
            ...patch
        };
        if (bars && this._sm) this.updateData(bars);
    }
    /** Toggle visibility of all owned series. */ setVisible(visible) {
        this._seriesIds.forEach((id)=>this._sm?.setVisible(id, visible));
        this._config.visible = visible;
    }
    // ── Helpers ────────────────────────────────────────────────────────────────
    /** Returns the pane index this indicator lives in. */ get paneIndex() {
        if (this._ownedPaneId) return this._pm?.getPaneIndex(this._ownedPaneId) ?? 1;
        return 0; // overlay on main pane
    }
    param(key, fallback) {
        const v = this._config.params[key];
        return v !== undefined ? v : fallback;
    }
    timeToLwcTime(unix) {
        return unix;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * math.ts — Pure indicator math functions.
 * All functions take number[] and return number[].
 * No chart dependencies — pure TS, easily testable.
 */ __turbopack_context__.s([
    "adx",
    ()=>adx,
    "atr",
    ()=>atr,
    "bollingerBands",
    ()=>bollingerBands,
    "cci",
    ()=>cci,
    "ema",
    ()=>ema,
    "macd",
    ()=>macd,
    "mfi",
    ()=>mfi,
    "obv",
    ()=>obv,
    "rsi",
    ()=>rsi,
    "sma",
    ()=>sma,
    "stddev",
    ()=>stddev,
    "stochastic",
    ()=>stochastic,
    "typicalPrice",
    ()=>typicalPrice,
    "vwap",
    ()=>vwap,
    "williamsR",
    ()=>williamsR,
    "wma",
    ()=>wma
]);
function sma(values, period) {
    return values.map((_, i)=>{
        if (i < period - 1) return null;
        const slice = values.slice(i - period + 1, i + 1);
        return slice.reduce((a, b)=>a + b, 0) / period;
    });
}
function ema(values, period) {
    const result = new Array(values.length).fill(null);
    const k = 2 / (period + 1);
    let prev = null;
    for(let i = 0; i < values.length; i++){
        if (i < period - 1) continue;
        if (prev === null) {
            // Seed with SMA of first `period` values
            const seed = values.slice(0, period).reduce((a, b)=>a + b, 0) / period;
            result[i] = seed;
            prev = seed;
        } else {
            const val = values[i] * k + prev * (1 - k);
            result[i] = val;
            prev = val;
        }
    }
    return result;
}
function wma(values, period) {
    return values.map((_, i)=>{
        if (i < period - 1) return null;
        let num = 0, den = 0;
        for(let j = 0; j < period; j++){
            const w = period - j;
            num += values[i - j] * w;
            den += w;
        }
        return num / den;
    });
}
function stddev(values, period) {
    const means = sma(values, period);
    return values.map((_, i)=>{
        if (means[i] === null) return null;
        const slice = values.slice(i - period + 1, i + 1);
        const mean = means[i];
        const variance = slice.reduce((acc, v)=>acc + (v - mean) ** 2, 0) / period;
        return Math.sqrt(variance);
    });
}
function bollingerBands(values, period, multiplier) {
    const mid = sma(values, period);
    const std = stddev(values, period);
    return {
        upper: mid.map((m, i)=>m !== null && std[i] !== null ? m + multiplier * std[i] : null),
        mid,
        lower: mid.map((m, i)=>m !== null && std[i] !== null ? m - multiplier * std[i] : null)
    };
}
function typicalPrice(highs, lows, closes) {
    return closes.map((c, i)=>(highs[i] + lows[i] + c) / 3);
}
function vwap(highs, lows, closes, volumes) {
    let cumPV = 0, cumVol = 0;
    return closes.map((_, i)=>{
        const tp = (highs[i] + lows[i] + closes[i]) / 3;
        cumPV += tp * (volumes[i] ?? 0);
        cumVol += volumes[i] ?? 0;
        return cumVol > 0 ? cumPV / cumVol : closes[i];
    });
}
function rsi(values, period) {
    const result = new Array(values.length).fill(null);
    if (values.length < period + 1) return result;
    let avgGain = 0, avgLoss = 0;
    for(let i = 1; i <= period; i++){
        const change = values[i] - values[i - 1];
        if (change > 0) avgGain += change;
        else avgLoss += Math.abs(change);
    }
    avgGain /= period;
    avgLoss /= period;
    const rs0 = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    result[period] = 100 - 100 / (1 + rs0);
    for(let i = period + 1; i < values.length; i++){
        const change = values[i] - values[i - 1];
        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? Math.abs(change) : 0;
        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
        const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
        result[i] = 100 - 100 / (1 + rs);
    }
    return result;
}
function macd(values, fast = 12, slow = 26, signal = 9) {
    const fastEma = ema(values, fast);
    const slowEma = ema(values, slow);
    const macdLine = values.map((_, i)=>fastEma[i] !== null && slowEma[i] !== null ? fastEma[i] - slowEma[i] : null);
    // Signal = EMA of macdLine
    const validMacd = macdLine.map((v)=>v ?? 0);
    const rawSignal = ema(validMacd, signal);
    const signalLine = macdLine.map((v, i)=>v !== null ? rawSignal[i] : null);
    const histogram = macdLine.map((v, i)=>v !== null && signalLine[i] !== null ? v - signalLine[i] : null);
    return {
        macd: macdLine,
        signal: signalLine,
        hist: histogram
    };
}
function stochastic(highs, lows, closes, kPeriod = 14, dPeriod = 3) {
    const kLine = closes.map((c, i)=>{
        if (i < kPeriod - 1) return null;
        const slice_h = highs.slice(i - kPeriod + 1, i + 1);
        const slice_l = lows.slice(i - kPeriod + 1, i + 1);
        const hh = Math.max(...slice_h);
        const ll = Math.min(...slice_l);
        return hh === ll ? 50 : (c - ll) / (hh - ll) * 100;
    });
    const kFilled = kLine.map((v)=>v ?? 0);
    const dLine = sma(kFilled, dPeriod).map((v, i)=>kLine[i] !== null ? v : null);
    return {
        k: kLine,
        d: dLine
    };
}
function atr(highs, lows, closes, period = 14) {
    const tr = closes.map((c, i)=>{
        if (i === 0) return highs[0] - lows[0];
        const prevC = closes[i - 1];
        return Math.max(highs[i] - lows[i], Math.abs(highs[i] - prevC), Math.abs(lows[i] - prevC));
    });
    const result = new Array(closes.length).fill(null);
    if (tr.length < period) return result;
    let atrVal = tr.slice(0, period).reduce((a, b)=>a + b, 0) / period;
    result[period - 1] = atrVal;
    for(let i = period; i < tr.length; i++){
        atrVal = (atrVal * (period - 1) + tr[i]) / period;
        result[i] = atrVal;
    }
    return result;
}
function obv(closes, volumes) {
    const result = [
        0
    ];
    for(let i = 1; i < closes.length; i++){
        const prev = result[i - 1];
        if (closes[i] > closes[i - 1]) result.push(prev + (volumes[i] ?? 0));
        else if (closes[i] < closes[i - 1]) result.push(prev - (volumes[i] ?? 0));
        else result.push(prev);
    }
    return result;
}
function cci(highs, lows, closes, period = 20) {
    const tp = typicalPrice(highs, lows, closes);
    const meanTp = sma(tp, period);
    return tp.map((t, i)=>{
        if (meanTp[i] === null) return null;
        const slice = tp.slice(i - period + 1, i + 1);
        const md = slice.reduce((acc, v)=>acc + Math.abs(v - meanTp[i]), 0) / period;
        return md === 0 ? 0 : (t - meanTp[i]) / (0.015 * md);
    });
}
function williamsR(highs, lows, closes, period = 14) {
    return closes.map((c, i)=>{
        if (i < period - 1) return null;
        const hh = Math.max(...highs.slice(i - period + 1, i + 1));
        const ll = Math.min(...lows.slice(i - period + 1, i + 1));
        return hh === ll ? -50 : (hh - c) / (hh - ll) * -100;
    });
}
function mfi(highs, lows, closes, volumes, period = 14) {
    const tp = typicalPrice(highs, lows, closes);
    const mfRaw = tp.map((t, i)=>t * (volumes[i] ?? 0));
    return tp.map((t, i)=>{
        if (i < period) return null;
        let posFlow = 0, negFlow = 0;
        for(let j = i - period + 1; j <= i; j++){
            if (tp[j] > tp[j - 1]) posFlow += mfRaw[j];
            else negFlow += mfRaw[j];
        }
        return negFlow === 0 ? 100 : 100 - 100 / (1 + posFlow / negFlow);
    });
}
function adx(highs, lows, closes, period = 14) {
    const len = closes.length;
    const adxArr = new Array(len).fill(null);
    const plusDIArr = new Array(len).fill(null);
    const minusDIArr = new Array(len).fill(null);
    if (len < period * 2) return {
        adx: adxArr,
        plusDI: plusDIArr,
        minusDI: minusDIArr
    };
    let smoothTR = 0, smoothPlusDM = 0, smoothMinusDM = 0;
    for(let i = 1; i < len; i++){
        const tr = Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i - 1]), Math.abs(lows[i] - closes[i - 1]));
        const plusDM = highs[i] - highs[i - 1] > lows[i - 1] - lows[i] ? Math.max(highs[i] - highs[i - 1], 0) : 0;
        const minusDM = lows[i - 1] - lows[i] > highs[i] - highs[i - 1] ? Math.max(lows[i - 1] - lows[i], 0) : 0;
        if (i < period) {
            smoothTR += tr;
            smoothPlusDM += plusDM;
            smoothMinusDM += minusDM;
            continue;
        }
        smoothTR = smoothTR - smoothTR / period + tr;
        smoothPlusDM = smoothPlusDM - smoothPlusDM / period + plusDM;
        smoothMinusDM = smoothMinusDM - smoothMinusDM / period + minusDM;
        const plusDI = smoothTR > 0 ? smoothPlusDM / smoothTR * 100 : 0;
        const minusDI = smoothTR > 0 ? smoothMinusDM / smoothTR * 100 : 0;
        plusDIArr[i] = plusDI;
        minusDIArr[i] = minusDI;
        const dx = plusDI + minusDI > 0 ? Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100 : 0;
        adxArr[i] = dx; // simplified (not smoothed DX) — good enough for display
    }
    return {
        adx: adxArr,
        plusDI: plusDIArr,
        minusDI: minusDIArr
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/overlays/SMA.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SMAIndicator",
    ()=>SMAIndicator,
    "createSMA",
    ()=>createSMA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class SMAIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'SMA';
    get label() {
        return `SMA (${this.param('period', 20)})`;
    }
    get defaultParams() {
        return {
            period: 20
        };
    }
    compute(bars) {
        const period = this.param('period', 20);
        const closes = bars.map((b)=>b.close);
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sma"])(closes, period);
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const color = this._config.color ?? '#F59E0B';
        sm.addLine(`${this.id}_line`, 0, {
            color,
            lineWidth: this._config.lineWidth ?? 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: this.label
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createSMA(config) {
    return new SMAIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/overlays/EMA.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMAIndicator",
    ()=>EMAIndicator,
    "createEMA",
    ()=>createEMA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class EMAIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'EMA';
    get label() {
        return `EMA (${this.param('period', 20)})`;
    }
    get defaultParams() {
        return {
            period: 20
        };
    }
    compute(bars) {
        const period = this.param('period', 20);
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ema"])(bars.map((b)=>b.close), period);
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        sm.addLine(`${this.id}_line`, 0, {
            color: this._config.color ?? '#3B82F6',
            lineWidth: this._config.lineWidth ?? 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: this.label
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createEMA(config) {
    return new EMAIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/overlays/BollingerBands.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BollingerBandsIndicator",
    ()=>BollingerBandsIndicator,
    "createBB",
    ()=>createBB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class BollingerBandsIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'BB';
    get label() {
        return `BB (${this.param('period', 20)}, ${this.param('mult', 2)})`;
    }
    get defaultParams() {
        return {
            period: 20,
            mult: 2
        };
    }
    compute(bars) {
        const period = this.param('period', 20);
        const mult = this.param('mult', 2);
        const { upper, mid, lower } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bollingerBands"])(bars.map((b)=>b.close), period, mult);
        const toData = (arr)=>bars.map((b, i)=>({
                    time: this.timeToLwcTime(b.time),
                    value: arr[i]
                })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_upper`,
                data: toData(upper)
            },
            {
                seriesId: `${this.id}_mid`,
                data: toData(mid)
            },
            {
                seriesId: `${this.id}_lower`,
                data: toData(lower)
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const color = this._config.color ?? '#8B5CF6';
        const opts = {
            priceLineVisible: false,
            lastValueVisible: false,
            lineWidth: 1
        };
        sm.addLine(`${this.id}_upper`, 0, {
            color: '#3B82F6',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: 'BB Upper'
        }, this.id);
        sm.addLine(`${this.id}_mid`, 0, {
            color: '#F59E0B',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: 'BB Mid'
        }, this.id);
        sm.addLine(`${this.id}_lower`, 0, {
            color: '#3B82F6',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: 'BB Lower'
        }, this.id);
        this._seriesIds = [
            `${this.id}_upper`,
            `${this.id}_mid`,
            `${this.id}_lower`
        ];
    }
}
function createBB(config) {
    return new BollingerBandsIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/overlays/VWAP.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VWAPIndicator",
    ()=>VWAPIndicator,
    "createVWAP",
    ()=>createVWAP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class VWAPIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'VWAP';
    get label() {
        return 'VWAP';
    }
    get defaultParams() {
        return {};
    }
    compute(bars) {
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vwap"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), bars.map((b)=>b.volume ?? 0));
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            }));
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        sm.addLine(`${this.id}_line`, 0, {
            color: this._config.color ?? '#8B5CF6',
            lineWidth: this._config.lineWidth ?? 1,
            priceLineVisible: false,
            lastValueVisible: false,
            title: this.label
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createVWAP(config) {
    return new VWAPIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/RSI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSIIndicator",
    ()=>RSIIndicator,
    "createRSI",
    ()=>createRSI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class RSIIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'RSI';
    get label() {
        return `RSI (${this.param('period', 14)})`;
    }
    get defaultParams() {
        return {
            period: 14
        };
    }
    compute(bars) {
        const period = this.param('period', 14);
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rsi"])(bars.map((b)=>b.close), period);
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const paneIdx = pm.getPaneIndex(pane.id);
        sm.addLine(`${this.id}_line`, paneIdx, {
            color: this._config.color ?? '#F59E0B',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: this.label,
            autoscaleInfoProvider: ()=>({
                    priceRange: {
                        minValue: 0,
                        maxValue: 100
                    }
                })
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createRSI(config) {
    return new RSIIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/MACD.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MACDIndicator",
    ()=>MACDIndicator,
    "createMACD",
    ()=>createMACD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class MACDIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'MACD';
    get label() {
        return `MACD (${this.param('fast', 12)},${this.param('slow', 26)},${this.param('signal', 9)})`;
    }
    get defaultParams() {
        return {
            fast: 12,
            slow: 26,
            signal: 9
        };
    }
    compute(bars) {
        const fast = this.param('fast', 12);
        const slow = this.param('slow', 26);
        const signal = this.param('signal', 9);
        const { macd: macdLine, signal: signalLine, hist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["macd"])(bars.map((b)=>b.close), fast, slow, signal);
        const toLine = (arr, id)=>({
                seriesId: id,
                data: bars.map((b, i)=>({
                        time: this.timeToLwcTime(b.time),
                        value: arr[i]
                    })).filter((d)=>d.value !== null)
            });
        const histData = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: hist[i] ?? 0,
                color: (hist[i] ?? 0) >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)'
            })).filter((_, i)=>hist[i] !== null);
        return [
            toLine(macdLine, `${this.id}_macd`),
            toLine(signalLine, `${this.id}_signal`),
            {
                seriesId: `${this.id}_hist`,
                data: histData
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const paneIdx = pm.getPaneIndex(pane.id);
        sm.addHistogram(`${this.id}_hist`, paneIdx, {
            priceLineVisible: false,
            lastValueVisible: false
        }, this.id);
        sm.addLine(`${this.id}_macd`, paneIdx, {
            color: '#3B82F6',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: 'MACD'
        }, this.id);
        sm.addLine(`${this.id}_signal`, paneIdx, {
            color: '#EF4444',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: 'Signal'
        }, this.id);
        this._seriesIds = [
            `${this.id}_hist`,
            `${this.id}_macd`,
            `${this.id}_signal`
        ];
    }
}
function createMACD(config) {
    return new MACDIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/Stochastic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StochasticIndicator",
    ()=>StochasticIndicator,
    "createStochastic",
    ()=>createStochastic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class StochasticIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'STOCH';
    get label() {
        return `Stoch (${this.param('k', 14)},${this.param('d', 3)})`;
    }
    get defaultParams() {
        return {
            k: 14,
            d: 3
        };
    }
    compute(bars) {
        const kP = this.param('k', 14);
        const dP = this.param('d', 3);
        const { k, d } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stochastic"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), kP, dP);
        const toLine = (arr, id)=>({
                seriesId: id,
                data: bars.map((b, i)=>({
                        time: this.timeToLwcTime(b.time),
                        value: arr[i]
                    })).filter((d)=>d.value !== null)
            });
        return [
            toLine(k, `${this.id}_k`),
            toLine(d, `${this.id}_d`)
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const pi = pm.getPaneIndex(pane.id);
        sm.addLine(`${this.id}_k`, pi, {
            color: '#3B82F6',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: '%K',
            autoscaleInfoProvider: ()=>({
                    priceRange: {
                        minValue: 0,
                        maxValue: 100
                    }
                })
        }, this.id);
        sm.addLine(`${this.id}_d`, pi, {
            color: '#F59E0B',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: '%D'
        }, this.id);
        this._seriesIds = [
            `${this.id}_k`,
            `${this.id}_d`
        ];
    }
}
function createStochastic(config) {
    return new StochasticIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/ATR.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATRIndicator",
    ()=>ATRIndicator,
    "createATR",
    ()=>createATR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class ATRIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'ATR';
    get label() {
        return `ATR (${this.param('period', 14)})`;
    }
    get defaultParams() {
        return {
            period: 14
        };
    }
    compute(bars) {
        const period = this.param('period', 14);
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atr"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), period);
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const pi = pm.getPaneIndex(pane.id);
        sm.addLine(`${this.id}_line`, pi, {
            color: this._config.color ?? '#A78BFA',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: this.label
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createATR(config) {
    return new ATRIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/OBV.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OBVIndicator",
    ()=>OBVIndicator,
    "createOBV",
    ()=>createOBV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class OBVIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'OBV';
    get label() {
        return 'OBV';
    }
    get defaultParams() {
        return {};
    }
    compute(bars) {
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obv"])(bars.map((b)=>b.close), bars.map((b)=>b.volume ?? 0));
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            }));
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const pi = pm.getPaneIndex(pane.id);
        sm.addLine(`${this.id}_line`, pi, {
            color: this._config.color ?? '#06B6D4',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: 'OBV'
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createOBV(config) {
    return new OBVIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/subpane/CCI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CCIIndicator",
    ()=>CCIIndicator,
    "createCCI",
    ()=>createCCI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-client] (ecmascript)");
;
;
class CCIIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'CCI';
    get label() {
        return `CCI (${this.param('period', 20)})`;
    }
    get defaultParams() {
        return {
            period: 20
        };
    }
    compute(bars) {
        const period = this.param('period', 20);
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cci"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), period);
        const data = bars.map((b, i)=>({
                time: this.timeToLwcTime(b.time),
                value: values[i]
            })).filter((d)=>d.value !== null);
        return [
            {
                seriesId: `${this.id}_line`,
                data
            }
        ];
    }
    attach(sm, pm, theme) {
        this._sm = sm;
        this._pm = pm;
        this._theme = theme;
        const pane = pm.addPane(15);
        this._ownedPaneId = pane.id;
        pm.addIndicatorToPane(pane.id, this.id);
        const pi = pm.getPaneIndex(pane.id);
        sm.addLine(`${this.id}_line`, pi, {
            color: this._config.color ?? '#F97316',
            lineWidth: 1,
            priceLineVisible: false,
            lastValueVisible: true,
            title: this.label
        }, this.id);
        this._seriesIds = [
            `${this.id}_line`
        ];
    }
}
function createCCI(config) {
    return new CCIIndicator(config);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/indicators/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Indicator Registry — extensible map of indicator type → factory function.
 *
 * Adding a new indicator:
 *  1. Create a class extending IndicatorBase in overlays/ or subpane/
 *  2. Register it here with INDICATOR_REGISTRY.register(TYPE, factory, meta)
 *  3. No other files need to change (Open/Closed Principle)
 */ __turbopack_context__.s([
    "INDICATOR_REGISTRY",
    ()=>INDICATOR_REGISTRY
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$SMA$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/SMA.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$EMA$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/EMA.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$BollingerBands$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/BollingerBands.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$VWAP$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/VWAP.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$RSI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/RSI.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$MACD$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/MACD.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$Stochastic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/Stochastic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$ATR$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/ATR.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$OBV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/OBV.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$CCI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/CCI.ts [app-client] (ecmascript)");
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
// ── Registry class ─────────────────────────────────────────────────────────────
class IndicatorRegistryClass {
    _entries = new Map();
    register(factory, meta) {
        this._entries.set(meta.type, {
            factory,
            meta
        });
    }
    create(config) {
        const entry = this._entries.get(config.type);
        if (!entry) throw new Error(`Unknown indicator type: ${config.type}`);
        return entry.factory(config);
    }
    getMeta(type) {
        return this._entries.get(type)?.meta;
    }
    /** All registered indicator meta sorted by group then label. */ getAllMeta() {
        return Array.from(this._entries.values()).map((e)=>e.meta).sort((a, b)=>a.group.localeCompare(b.group) || a.label.localeCompare(b.label));
    }
    /** All meta filtered by category. */ getByCategory(category) {
        return this.getAllMeta().filter((m)=>m.category === category);
    }
}
const INDICATOR_REGISTRY = new IndicatorRegistryClass();
// ── Built-in registrations ────────────────────────────────────────────────────
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$SMA$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSMA"], {
    type: 'SMA',
    label: 'Simple Moving Average',
    category: 'overlay',
    group: 'Moving Averages',
    description: 'Arithmetic mean of closing prices over N bars.',
    defaultParams: {
        period: 20
    },
    defaultColor: '#F59E0B'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$EMA$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEMA"], {
    type: 'EMA',
    label: 'Exponential Moving Average',
    category: 'overlay',
    group: 'Moving Averages',
    description: 'Exponentially weighted moving average, more weight on recent bars.',
    defaultParams: {
        period: 20
    },
    defaultColor: '#3B82F6'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$BollingerBands$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBB"], {
    type: 'BB',
    label: 'Bollinger Bands',
    category: 'overlay',
    group: 'Volatility',
    description: 'Price bands 2 standard deviations above/below a moving average.',
    defaultParams: {
        period: 20,
        mult: 2
    },
    defaultColor: '#8B5CF6'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$VWAP$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createVWAP"], {
    type: 'VWAP',
    label: 'VWAP',
    category: 'overlay',
    group: 'Volume',
    description: 'Volume-weighted average price since session start.',
    defaultParams: {},
    defaultColor: '#EC4899'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$RSI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRSI"], {
    type: 'RSI',
    label: 'Relative Strength Index',
    category: 'subpane',
    group: 'Oscillators',
    description: 'Momentum oscillator measuring speed and change of price movements (0–100).',
    defaultParams: {
        period: 14
    },
    defaultColor: '#F59E0B'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$MACD$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMACD"], {
    type: 'MACD',
    label: 'MACD',
    category: 'subpane',
    group: 'Trend',
    description: 'Moving Average Convergence/Divergence — trend following momentum indicator.',
    defaultParams: {
        fast: 12,
        slow: 26,
        signal: 9
    },
    defaultColor: '#3B82F6'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$Stochastic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStochastic"], {
    type: 'STOCH',
    label: 'Stochastic Oscillator',
    category: 'subpane',
    group: 'Oscillators',
    description: 'Compares closing price to price range over N periods (0–100).',
    defaultParams: {
        k: 14,
        d: 3
    },
    defaultColor: '#3B82F6'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$ATR$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createATR"], {
    type: 'ATR',
    label: 'Average True Range',
    category: 'subpane',
    group: 'Volatility',
    description: 'Measures market volatility as the average true range over N periods.',
    defaultParams: {
        period: 14
    },
    defaultColor: '#A78BFA'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$OBV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOBV"], {
    type: 'OBV',
    label: 'On Balance Volume',
    category: 'subpane',
    group: 'Volume',
    description: 'Cumulative volume momentum indicator.',
    defaultParams: {},
    defaultColor: '#06B6D4'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$CCI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCCI"], {
    type: 'CCI',
    label: 'Commodity Channel Index',
    category: 'subpane',
    group: 'Oscillators',
    description: 'Measures deviation of price from its average — identifies overbought/oversold.',
    defaultParams: {
        period: 20
    },
    defaultColor: '#F97316'
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
;
function clampCoverage(value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(1, value));
}
function getCoverage(values) {
    if (values.length === 0) return 0;
    const populated = values.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasDataValue"]).length;
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
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasDataValue"])(selector(row))) populated += 1;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/EmbeddedChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedChart",
    ()=>EmbeddedChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * EmbeddedChart — compact chart embedded in the company/stock page.
 *
 * Shows a lightweight-charts v5 candlestick + volume chart with:
 *  - Range/timeframe quick selector
 *  - "Open full chart" button that triggers fullscreen mode via Zustand
 *  - All tools, indicators, and layouts available in fullscreen mode
 *
 * This replaces the previous recharts-based ChartSection.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as LockOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/ChartEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/PaneManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/SeriesManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/data/useChartData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/theme-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
;
;
;
;
;
const QUICK_PERIODS = [
    {
        label: '1m',
        days: 30,
        tf: '1D'
    },
    {
        label: '3m',
        days: 90,
        tf: '1D'
    },
    {
        label: '6m',
        days: 180,
        tf: '1D'
    },
    {
        label: '1y',
        days: 365,
        tf: '1D'
    },
    {
        label: '3y',
        days: 1095,
        tf: '1D'
    },
    {
        label: '5y',
        days: 1825,
        tf: '1D'
    }
];
function EmbeddedChart(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(129);
    if ($[0] !== "4ede8a7f8778a0671f6c7abbd9ee286726958fb0fc6206a33dacd8ef770e26fa") {
        for(let $i = 0; $i < 129; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4ede8a7f8778a0671f6c7abbd9ee286726958fb0fc6206a33dacd8ef770e26fa";
    }
    const { symbol, currentPrice, priceChange } = t0;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartEngine"]();
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t1);
    const pmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const smRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = new Map();
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const activeInds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t2);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setSymbol, indicators, isDark, timeframe, setTimeframe, chartType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { appearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const t3 = isDark ? "dark" : "light";
    let t4;
    if ($[3] !== appearance.chartContrast || $[4] !== t3) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChartTheme"])(t3, appearance.chartContrast);
        $[3] = appearance.chartContrast;
        $[4] = t3;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const initialThemeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t4);
    const [selectedPeriod, setSelectedPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1y");
    const [isChartLocked, setIsChartLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { bars, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartData"])(symbol, timeframe);
    let t5;
    bb0: {
        if (bars.length === 0) {
            let t6;
            if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
                t6 = [];
                $[6] = t6;
            } else {
                t6 = $[6];
            }
            t5 = t6;
            break bb0;
        }
        let t6;
        if ($[7] !== selectedPeriod) {
            t6 = QUICK_PERIODS.find({
                "EmbeddedChart[QUICK_PERIODS.find()]": (period)=>period.label === selectedPeriod
            }["EmbeddedChart[QUICK_PERIODS.find()]"]);
            $[7] = selectedPeriod;
            $[8] = t6;
        } else {
            t6 = $[8];
        }
        const config = t6;
        if (!config) {
            t5 = bars;
            break bb0;
        }
        const anchorTime = bars[bars.length - 1]?.time ?? 0;
        const cutoffTime = anchorTime - config.days * 86400;
        let t7;
        if ($[9] !== bars || $[10] !== cutoffTime) {
            let t8;
            if ($[12] !== cutoffTime) {
                t8 = ({
                    "EmbeddedChart[bars.filter()]": (bar)=>bar.time >= cutoffTime
                })["EmbeddedChart[bars.filter()]"];
                $[12] = cutoffTime;
                $[13] = t8;
            } else {
                t8 = $[13];
            }
            t7 = bars.filter(t8);
            $[9] = bars;
            $[10] = cutoffTime;
            $[11] = t7;
        } else {
            t7 = $[11];
        }
        const visible = t7;
        t5 = visible.length > 1 ? visible : bars;
    }
    const selectedWindowBars = t5;
    let t6;
    bb1: {
        if (selectedWindowBars.length < 2) {
            t6 = null;
            break bb1;
        }
        const start = selectedWindowBars[0];
        const end = selectedWindowBars[selectedWindowBars.length - 1];
        if (!start?.open) {
            t6 = null;
            break bb1;
        }
        t6 = (end.close - start.open) / start.open * 100;
    }
    const periodReturn = t6;
    let t7;
    if ($[14] !== selectedWindowBars) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDataMeta"])({
            asOf: selectedWindowBars[selectedWindowBars.length - 1] ? new Date(selectedWindowBars[selectedWindowBars.length - 1].time * 1000).toISOString() : null,
            coverage: selectedWindowBars.length > 1 ? 1 : 0,
            status: selectedWindowBars.length > 1 ? "delayed" : "unavailable",
            note: selectedWindowBars.length > 0 ? `${selectedWindowBars.length} sessions in view` : "No price history loaded"
        });
        $[14] = selectedWindowBars;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    const chartMeta = t7;
    const t8 = isDark ? "dark" : "light";
    let t9;
    if ($[16] !== appearance.chartContrast || $[17] !== t8) {
        t9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChartTheme"])(t8, appearance.chartContrast);
        $[16] = appearance.chartContrast;
        $[17] = t8;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    const chartTheme = t9;
    let t10;
    let t11;
    if ($[19] !== setSymbol || $[20] !== symbol) {
        t10 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                setSymbol(symbol);
            }
        })["EmbeddedChart[useEffect()]"];
        t11 = [
            symbol,
            setSymbol
        ];
        $[19] = setSymbol;
        $[20] = symbol;
        $[21] = t10;
        $[22] = t11;
    } else {
        t10 = $[21];
        t11 = $[22];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t10, t11);
    let t12;
    let t13;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                const container = canvasRef.current;
                if (!container) {
                    return;
                }
                const engine = engineRef.current;
                const indicatorRegistry = activeInds.current;
                const chart = engine.init(container, initialThemeRef.current);
                pmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaneManager"](chart);
                smRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeriesManager"](chart);
                return ()=>{
                    engine.destroy();
                    pmRef.current = null;
                    smRef.current = null;
                    indicatorRegistry.clear();
                };
            }
        })["EmbeddedChart[useEffect()]"];
        t13 = [];
        $[23] = t12;
        $[24] = t13;
    } else {
        t12 = $[23];
        t13 = $[24];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t12, t13);
    let t14;
    let t15;
    if ($[25] !== isChartLocked) {
        t14 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                const chart_0 = engineRef.current.api;
                if (!chart_0) {
                    return;
                }
                chart_0.applyOptions({
                    handleScroll: !isChartLocked,
                    handleScale: !isChartLocked
                });
            }
        })["EmbeddedChart[useEffect()]"];
        t15 = [
            isChartLocked
        ];
        $[25] = isChartLocked;
        $[26] = t14;
        $[27] = t15;
    } else {
        t14 = $[26];
        t15 = $[27];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t14, t15);
    let t16;
    let t17;
    if ($[28] !== chartTheme) {
        t16 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                engineRef.current.applyTheme(chartTheme);
            }
        })["EmbeddedChart[useEffect()]"];
        t17 = [
            chartTheme
        ];
        $[28] = chartTheme;
        $[29] = t16;
        $[30] = t17;
    } else {
        t16 = $[29];
        t17 = $[30];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t16, t17);
    let t18;
    let t19;
    if ($[31] !== bars || $[32] !== chartTheme || $[33] !== chartType || $[34] !== isDark || $[35] !== selectedPeriod) {
        t18 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                const sm = smRef.current;
                const pm = pmRef.current;
                const engine_0 = engineRef.current;
                if (!sm || !pm || !engine_0.isInitialised || bars.length === 0) {
                    return;
                }
                const th = chartTheme;
                sm.remove("main");
                sm.remove("volume");
                if (chartType === "candlestick") {
                    sm.addCandlestick("main", th, 0, {
                        upColor: th.upColor,
                        downColor: th.downColor,
                        borderUpColor: th.upColor,
                        borderDownColor: th.downColor,
                        wickUpColor: th.upColor,
                        wickDownColor: th.downColor
                    });
                } else {
                    if (chartType === "ohlc") {
                        sm.addOhlc("main", th, 0, {
                            upColor: th.upColor,
                            downColor: th.downColor
                        });
                    } else {
                        if (chartType === "line") {
                            sm.addLine("main", 0, {
                                color: th.upColor,
                                lineWidth: 2,
                                priceLineVisible: false,
                                lastValueVisible: true
                            });
                        } else {
                            sm.addArea("main", 0, {
                                lineColor: isDark ? "#3B82F6" : "#4338CA",
                                topColor: th.areaFillColor,
                                bottomColor: "transparent",
                                lineWidth: 2,
                                priceLineVisible: false,
                                lastValueVisible: true
                            });
                        }
                    }
                }
                sm.setOHLCVData("main", bars);
                sm.addHistogram("volume", 0, {
                    priceLineVisible: false,
                    lastValueVisible: false,
                    priceScaleId: "volume"
                });
                engine_0.api.priceScale("volume").applyOptions({
                    scaleMargins: {
                        top: 0.9,
                        bottom: 0
                    }
                });
                sm.setVolumeData("volume", bars, th.volumeUpColor, th.volumeDownColor);
                if (selectedPeriod !== "all") {
                    const p_0 = QUICK_PERIODS.find({
                        "EmbeddedChart[useEffect() > QUICK_PERIODS.find()]": (p)=>p.label === selectedPeriod
                    }["EmbeddedChart[useEffect() > QUICK_PERIODS.find()]"]);
                    if (p_0) {
                        const cutoffTime_0 = Math.floor(Date.now() / 1000) - p_0.days * 86400;
                        const visibleBars = bars.filter({
                            "EmbeddedChart[useEffect() > bars.filter()]": (b)=>b.time >= cutoffTime_0
                        }["EmbeddedChart[useEffect() > bars.filter()]"]);
                        if (visibleBars.length > 1) {
                            engineRef.current.api.timeScale().setVisibleRange({
                                from: visibleBars[0].time,
                                to: visibleBars[visibleBars.length - 1].time
                            });
                        }
                    }
                } else {
                    engine_0.fitContent();
                }
            }
        })["EmbeddedChart[useEffect()]"];
        t19 = [
            bars,
            chartTheme,
            chartType,
            isDark,
            selectedPeriod
        ];
        $[31] = bars;
        $[32] = chartTheme;
        $[33] = chartType;
        $[34] = isDark;
        $[35] = selectedPeriod;
        $[36] = t18;
        $[37] = t19;
    } else {
        t18 = $[36];
        t19 = $[37];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t18, t19);
    let t20;
    let t21;
    if ($[38] !== bars || $[39] !== chartTheme || $[40] !== indicators) {
        t20 = ({
            "EmbeddedChart[useEffect()]": ()=>{
                const sm_0 = smRef.current;
                const pm_0 = pmRef.current;
                if (!sm_0 || !pm_0) {
                    return;
                }
                const th_0 = chartTheme;
                const ids = new Set(indicators.map(_EmbeddedChartUseEffectIndicatorsMap));
                activeInds.current.forEach({
                    "EmbeddedChart[useEffect() > activeInds.current.forEach()]": (ind, id)=>{
                        if (!ids.has(id)) {
                            ind.detach();
                            activeInds.current.delete(id);
                        }
                    }
                }["EmbeddedChart[useEffect() > activeInds.current.forEach()]"]);
                indicators.forEach({
                    "EmbeddedChart[useEffect() > indicators.forEach()]": (config_0)=>{
                        if (!activeInds.current.has(config_0.id)) {
                            ;
                            try {
                                const ind_0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].create(config_0);
                                ind_0.attach(sm_0, pm_0, th_0);
                                if (bars.length > 0) {
                                    ind_0.updateData(bars);
                                }
                                activeInds.current.set(config_0.id, ind_0);
                            } catch (t22) {
                                const e = t22;
                                console.warn("Indicator attach failed:", e);
                            }
                        }
                    }
                }["EmbeddedChart[useEffect() > indicators.forEach()]"]);
                if (bars.length > 0) {
                    activeInds.current.forEach({
                        "EmbeddedChart[useEffect() > activeInds.current.forEach()]": (ind_1)=>ind_1.updateData(bars)
                    }["EmbeddedChart[useEffect() > activeInds.current.forEach()]"]);
                }
            }
        })["EmbeddedChart[useEffect()]"];
        t21 = [
            bars,
            chartTheme,
            indicators
        ];
        $[38] = bars;
        $[39] = chartTheme;
        $[40] = indicators;
        $[41] = t20;
        $[42] = t21;
    } else {
        t20 = $[41];
        t21 = $[42];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t20, t21);
    let t22;
    if ($[43] !== setTimeframe || $[44] !== timeframe) {
        t22 = ({
            "EmbeddedChart[handlePeriodSelect]": (period_0)=>{
                setSelectedPeriod(period_0);
                const p_2 = QUICK_PERIODS.find({
                    "EmbeddedChart[handlePeriodSelect > QUICK_PERIODS.find()]": (p_1)=>p_1.label === period_0
                }["EmbeddedChart[handlePeriodSelect > QUICK_PERIODS.find()]"]);
                if (p_2 && timeframe !== p_2.tf) {
                    setTimeframe(p_2.tf);
                }
            }
        })["EmbeddedChart[handlePeriodSelect]"];
        $[43] = setTimeframe;
        $[44] = timeframe;
        $[45] = t22;
    } else {
        t22 = $[45];
    }
    const handlePeriodSelect = t22;
    let t23;
    if ($[46] !== router || $[47] !== symbol) {
        t23 = ({
            "EmbeddedChart[handleOpenFullChart]": ()=>{
                router.push(`/stocks/${symbol}/chart`);
            }
        })["EmbeddedChart[handleOpenFullChart]"];
        $[46] = router;
        $[47] = symbol;
        $[48] = t23;
    } else {
        t23 = $[48];
    }
    const handleOpenFullChart = t23;
    const isPos = (priceChange ?? 0) > 0;
    const isNeg = (priceChange ?? 0) < 0;
    let t24;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = {
            background: "color-mix(in srgb, var(--surface) 96%, transparent)",
            borderColor: "var(--border)"
        };
        $[49] = t24;
    } else {
        t24 = $[49];
    }
    let t25;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            borderColor: "var(--border)"
        };
        $[50] = t25;
    } else {
        t25 = $[50];
    }
    let t26;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-base font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "Price Chart"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 518,
            columnNumber: 11
        }, this);
        $[51] = t26;
    } else {
        t26 = $[51];
    }
    let t27;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = {
            color: "var(--text-primary)"
        };
        $[52] = t27;
    } else {
        t27 = $[52];
    }
    let t28;
    if ($[53] !== currentPrice) {
        t28 = currentPrice != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(currentPrice) : "Unavailable";
        $[53] = currentPrice;
        $[54] = t28;
    } else {
        t28 = $[54];
    }
    let t29;
    if ($[55] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "metric-mono font-semibold",
            style: t27,
            children: t28
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 544,
            columnNumber: 11
        }, this);
        $[55] = t28;
        $[56] = t29;
    } else {
        t29 = $[56];
    }
    const t30 = isPos ? "var(--bull-tint)" : isNeg ? "var(--bear-tint)" : "var(--bg-hover)";
    const t31 = isPos ? "var(--bull-strong)" : isNeg ? "var(--bear-strong)" : "var(--text-secondary)";
    let t32;
    if ($[57] !== t30 || $[58] !== t31) {
        t32 = {
            background: t30,
            color: t31
        };
        $[57] = t30;
        $[58] = t31;
        $[59] = t32;
    } else {
        t32 = $[59];
    }
    let t33;
    if ($[60] !== priceChange) {
        t33 = priceChange != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSignedChange"])(priceChange, 2, "%") : "Flat";
        $[60] = priceChange;
        $[61] = t33;
    } else {
        t33 = $[61];
    }
    let t34;
    if ($[62] !== t32 || $[63] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "metric-mono rounded-full px-2 py-0.5",
            style: t32,
            children: t33
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 574,
            columnNumber: 11
        }, this);
        $[62] = t32;
        $[63] = t33;
        $[64] = t34;
    } else {
        t34 = $[64];
    }
    let t35;
    if ($[65] !== periodReturn || $[66] !== selectedPeriod) {
        t35 = periodReturn != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                color: periodReturn >= 0 ? "var(--bull-strong)" : "var(--bear-strong)"
            },
            children: [
                selectedPeriod.toUpperCase(),
                " return ",
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSignedChange"])(periodReturn, 2, "%")
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 583,
            columnNumber: 34
        }, this) : null;
        $[65] = periodReturn;
        $[66] = selectedPeriod;
        $[67] = t35;
    } else {
        t35 = $[67];
    }
    let t36;
    if ($[68] !== t29 || $[69] !== t34 || $[70] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t26,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap items-center gap-2 text-xs",
                        children: [
                            t29,
                            t34,
                            t35
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                        lineNumber: 594,
                        columnNumber: 62
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                lineNumber: 594,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 594,
            columnNumber: 11
        }, this);
        $[68] = t29;
        $[69] = t34;
        $[70] = t35;
        $[71] = t36;
    } else {
        t36 = $[71];
    }
    let t37;
    if ($[72] !== handlePeriodSelect || $[73] !== selectedPeriod) {
        t37 = QUICK_PERIODS.map({
            "EmbeddedChart[QUICK_PERIODS.map()]": (p_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "EmbeddedChart[QUICK_PERIODS.map() > <button>.onClick]": ()=>handlePeriodSelect(p_3.label)
                    }["EmbeddedChart[QUICK_PERIODS.map() > <button>.onClick]"],
                    className: `px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedPeriod === p_3.label ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                    children: p_3.label.toUpperCase()
                }, p_3.label, false, {
                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                    lineNumber: 605,
                    columnNumber: 52
                }, this)
        }["EmbeddedChart[QUICK_PERIODS.map()]"]);
        $[72] = handlePeriodSelect;
        $[73] = selectedPeriod;
        $[74] = t37;
    } else {
        t37 = $[74];
    }
    let t38;
    if ($[75] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex rounded-xl border border-border bg-muted/20 p-0.5",
            children: t37
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 617,
            columnNumber: 11
        }, this);
        $[75] = t37;
        $[76] = t38;
    } else {
        t38 = $[76];
    }
    let t39;
    if ($[77] !== isChartLocked) {
        t39 = ({
            "EmbeddedChart[<button>.onClick]": ()=>setIsChartLocked(!isChartLocked)
        })["EmbeddedChart[<button>.onClick]"];
        $[77] = isChartLocked;
        $[78] = t39;
    } else {
        t39 = $[78];
    }
    const t40 = `flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${isChartLocked ? "border-border text-muted-foreground hover:text-foreground hover:bg-muted/40" : "border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--brand-tint)] hover:opacity-90"}`;
    const t41 = isChartLocked ? "Chart locked (click to unlock zoom/scroll)" : "Chart unlocked (click to lock)";
    let t42;
    if ($[79] !== isChartLocked) {
        t42 = isChartLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 637,
            columnNumber: 27
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__["LockOpen"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 637,
            columnNumber: 48
        }, this);
        $[79] = isChartLocked;
        $[80] = t42;
    } else {
        t42 = $[80];
    }
    let t43;
    if ($[81] !== t39 || $[82] !== t40 || $[83] !== t41 || $[84] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t39,
            className: t40,
            title: t41,
            children: t42
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 645,
            columnNumber: 11
        }, this);
        $[81] = t39;
        $[82] = t40;
        $[83] = t41;
        $[84] = t42;
        $[85] = t43;
    } else {
        t43 = $[85];
    }
    let t44;
    if ($[86] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 656,
            columnNumber: 11
        }, this);
        $[86] = t44;
    } else {
        t44 = $[86];
    }
    let t45;
    if ($[87] !== handleOpenFullChart) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleOpenFullChart,
            className: "flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-[var(--brand-primary)] transition-all",
            title: "Toggle fullscreen mode",
            children: [
                t44,
                "Open Full Chart"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 663,
            columnNumber: 11
        }, this);
        $[87] = handleOpenFullChart;
        $[88] = t45;
    } else {
        t45 = $[88];
    }
    let t46;
    if ($[89] !== t38 || $[90] !== t43 || $[91] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 flex-wrap",
            children: [
                t38,
                t43,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 671,
            columnNumber: 11
        }, this);
        $[89] = t38;
        $[90] = t43;
        $[91] = t45;
        $[92] = t46;
    } else {
        t46 = $[92];
    }
    let t47;
    if ($[93] !== t36 || $[94] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b",
            style: t25,
            children: [
                t36,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 681,
            columnNumber: 11
        }, this);
        $[93] = t36;
        $[94] = t46;
        $[95] = t47;
    } else {
        t47 = $[95];
    }
    let t48;
    let t49;
    if ($[96] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = {
            height: 400
        };
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: canvasRef,
            className: "w-full h-full"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 694,
            columnNumber: 11
        }, this);
        $[96] = t48;
        $[97] = t49;
    } else {
        t48 = $[96];
        t49 = $[97];
    }
    let t50;
    if ($[98] !== loading) {
        t50 = loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center bg-background/60 z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                size: 24,
                className: "animate-spin text-[var(--brand-primary)]"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                lineNumber: 703,
                columnNumber: 111
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 703,
            columnNumber: 22
        }, this);
        $[98] = loading;
        $[99] = t50;
    } else {
        t50 = $[99];
    }
    let t51;
    if ($[100] !== error || $[101] !== loading) {
        t51 = error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center bg-background/80 z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[var(--bear-strong)]",
                children: [
                    "Failed to load chart: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                lineNumber: 711,
                columnNumber: 121
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 711,
            columnNumber: 32
        }, this);
        $[100] = error;
        $[101] = loading;
        $[102] = t51;
    } else {
        t51 = $[102];
    }
    let t52;
    if ($[103] !== bars.length || $[104] !== error || $[105] !== loading) {
        t52 = !loading && bars.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: "No price data available"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                lineNumber: 720,
                columnNumber: 121
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 720,
            columnNumber: 54
        }, this);
        $[103] = bars.length;
        $[104] = error;
        $[105] = loading;
        $[106] = t52;
    } else {
        t52 = $[106];
    }
    let t53;
    if ($[107] !== t50 || $[108] !== t51 || $[109] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: t48,
            children: [
                t49,
                t50,
                t51,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 730,
            columnNumber: 11
        }, this);
        $[107] = t50;
        $[108] = t51;
        $[109] = t52;
        $[110] = t53;
    } else {
        t53 = $[110];
    }
    let t54;
    if ($[111] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = {
            borderColor: "var(--border)"
        };
        $[111] = t54;
    } else {
        t54 = $[111];
    }
    let t55;
    if ($[112] === Symbol.for("react.memo_cache_sentinel")) {
        t55 = {
            color: "var(--text-muted)"
        };
        $[112] = t55;
    } else {
        t55 = $[112];
    }
    let t56;
    if ($[113] !== chartMeta || $[114] !== selectedPeriod || $[115] !== selectedWindowBars.length) {
        t56 = selectedWindowBars.length > 1 ? `Viewing ${selectedPeriod.toUpperCase()} window through ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(chartMeta.asOf ?? undefined)}.` : "Review long-range structure here first. Switch to fullscreen only for indicators, drawings, and intraday work.";
        $[113] = chartMeta;
        $[114] = selectedPeriod;
        $[115] = selectedWindowBars.length;
        $[116] = t56;
    } else {
        t56 = $[116];
    }
    let t57;
    if ($[117] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[11px]",
            style: t55,
            children: t56
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 768,
            columnNumber: 11
        }, this);
        $[117] = t56;
        $[118] = t57;
    } else {
        t57 = $[118];
    }
    let t58;
    if ($[119] === Symbol.for("react.memo_cache_sentinel")) {
        t58 = {
            color: "var(--brand-primary)"
        };
        $[119] = t58;
    } else {
        t58 = $[119];
    }
    let t59;
    if ($[120] !== handleOpenFullChart) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleOpenFullChart,
            className: "text-[11px] font-medium transition-colors",
            style: t58,
            children: "Open full charting mode →"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 785,
            columnNumber: 11
        }, this);
        $[120] = handleOpenFullChart;
        $[121] = t59;
    } else {
        t59 = $[121];
    }
    let t60;
    if ($[122] !== t57 || $[123] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-t px-5 py-3",
            style: t54,
            children: [
                t57,
                t59
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 793,
            columnNumber: 11
        }, this);
        $[122] = t57;
        $[123] = t59;
        $[124] = t60;
    } else {
        t60 = $[124];
    }
    let t61;
    if ($[125] !== t47 || $[126] !== t53 || $[127] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "chart",
            className: "scroll-mt-28 space-y-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-2xl border shadow-sm",
                style: t24,
                children: [
                    t47,
                    t53,
                    t60
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                lineNumber: 802,
                columnNumber: 66
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 802,
            columnNumber: 11
        }, this);
        $[125] = t47;
        $[126] = t53;
        $[127] = t60;
        $[128] = t61;
    } else {
        t61 = $[128];
    }
    return t61;
}
_s(EmbeddedChart, "o6bW8kvrK2ymQP2Z3exiTUn0PBE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartData"]
    ];
});
_c = EmbeddedChart;
function _EmbeddedChartUseEffectIndicatorsMap(c) {
    return c.id;
}
var _c;
__turbopack_context__.k.register(_c, "EmbeddedChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoverageNotice",
    ()=>CoverageNotice,
    "DataMetaInline",
    ()=>DataMetaInline,
    "DataValue",
    ()=>DataValue,
    "StickyMetricTable",
    ()=>StickyMetricTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function DataMetaInline(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb";
    }
    const { meta, className } = t0;
    if (!meta) {
        return null;
    }
    let t1;
    if ($[1] !== meta.asOf) {
        t1 = meta.asOf ? `As of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(meta.asOf)}` : null;
        $[1] = meta.asOf;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const t2 = meta.status === "live" ? "Live" : meta.status === "delayed" ? "Delayed" : meta.status === "partial" ? "Partial coverage" : "Unavailable";
    const t3 = meta.unitLabel ? meta.unitLabel : null;
    let t4;
    if ($[3] !== t1 || $[4] !== t2 || $[5] !== t3) {
        t4 = [
            t1,
            t2,
            t3
        ].filter(Boolean);
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const parts = t4;
    if (parts.length === 0 && !meta.note) {
        return null;
    }
    let t5;
    if ($[7] !== className) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-meta-inline", className);
        $[7] = className;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const t6 = parts.join(" \xB7 ");
    let t7;
    if ($[9] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== meta.note) {
        t8 = meta.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: meta.note
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 68,
            columnNumber: 22
        }, this) : null;
        $[11] = meta.note;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== t5 || $[14] !== t7 || $[15] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            "aria-label": "Data freshness and coverage",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[13] = t5;
        $[14] = t7;
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    return t9;
}
_c = DataMetaInline;
function CoverageNotice(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb";
    }
    const { meta, title: t1, message, action, className } = t0;
    const title = t1 === undefined ? "Coverage note" : t1;
    let t2;
    if ($[1] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("stock-empty-state", className);
        $[1] = className;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-0.5 rounded-full border p-1.5",
            style: {
                borderColor: "rgba(245,158,11,0.25)",
                background: "var(--accent-subtle)",
                color: "var(--accent-brand)"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                size: 14
            }, void 0, false, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 116,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            color: "var(--text-primary)"
        };
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== title) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            style: t4,
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        $[5] = title;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            color: "var(--text-secondary)"
        };
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] !== message) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-1 text-sm leading-6",
            style: t6,
            children: message
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 149,
            columnNumber: 10
        }, this);
        $[8] = message;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] !== meta) {
        t8 = meta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
            style: {
                color: "var(--text-muted)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCoverageLabel"])(meta.coverage)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 159,
                    columnNumber: 8
                }, this),
                meta.asOf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Latest: ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(meta.asOf)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 159,
                    columnNumber: 70
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 157,
            columnNumber: 17
        }, this) : null;
        $[10] = meta;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== action) {
        t9 = action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3",
            children: action
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 167,
            columnNumber: 19
        }, this) : null;
        $[12] = action;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t5 || $[15] !== t7 || $[16] !== t8 || $[17] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-3",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        t5,
                        t7,
                        t8,
                        t9
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 175,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[14] = t5;
        $[15] = t7;
        $[16] = t8;
        $[17] = t9;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== t10 || $[20] !== t2) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            role: "status",
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t2;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    return t11;
}
_c1 = CoverageNotice;
function DataValue(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb";
    }
    const { value, reason, className } = t0;
    const isUnavailable = typeof value === "string" && value === "-";
    const t1 = isUnavailable ? "data-value data-value--empty" : "data-value";
    let t2;
    if ($[1] !== className || $[2] !== t1) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(t1, className);
        $[1] = className;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: value
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 221,
            columnNumber: 10
        }, this);
        $[4] = value;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== isUnavailable || $[7] !== reason) {
        t4 = isUnavailable && reason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "data-note",
            children: reason
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 229,
            columnNumber: 36
        }, this) : null;
        $[6] = isUnavailable;
        $[7] = reason;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t2 || $[10] !== t3 || $[11] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 238,
            columnNumber: 10
        }, this);
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    return t5;
}
_c2 = DataValue;
function StickyMetricTable(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(27);
    if ($[0] !== "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb") {
        for(let $i = 0; $i < 27; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c689dad387f7b2ff353c2779f43d00e5dddc1c09b29fa56e5590437d5ec7dbcb";
    }
    const { ariaLabel, columns, rows, latestColumnKey, className } = t0;
    let t1;
    if ($[1] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("stock-table-shell", className);
        $[1] = className;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            scope: "col",
            className: "stock-table__sticky stock-table__header stock-table__metric-col",
            children: "Parameters"
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 285,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== columns || $[5] !== latestColumnKey) {
        let t4;
        if ($[7] !== latestColumnKey) {
            t4 = ({
                "StickyMetricTable[columns.map()]": (column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        scope: "col",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("stock-table__header stock-table__number", column.headerClassName, latestColumnKey === column.key && "stock-table__latest"),
                        children: column.label
                    }, column.key, false, {
                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                        lineNumber: 295,
                        columnNumber: 55
                    }, this)
            })["StickyMetricTable[columns.map()]"];
            $[7] = latestColumnKey;
            $[8] = t4;
        } else {
            t4 = $[8];
        }
        t3 = columns.map(t4);
        $[4] = columns;
        $[5] = latestColumnKey;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                children: [
                    t2,
                    t3
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 311,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 311,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== columns || $[12] !== latestColumnKey || $[13] !== rows) {
        let t6;
        if ($[15] !== columns || $[16] !== latestColumnKey) {
            t6 = ({
                "StickyMetricTable[rows.map()]": (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("stock-table__row", row.rowClassName),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "row",
                                className: "stock-table__sticky stock-table__metric-col",
                                children: row.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                lineNumber: 322,
                                columnNumber: 120
                            }, this),
                            columns.map({
                                "StickyMetricTable[rows.map() > columns.map()]": (column_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("stock-table__number", column_0.cellClassName, latestColumnKey === column_0.key && "stock-table__latest"),
                                        children: row.values[column_0.key]
                                    }, column_0.key, false, {
                                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                        lineNumber: 323,
                                        columnNumber: 74
                                    }, this)
                            }["StickyMetricTable[rows.map() > columns.map()]"])
                        ]
                    }, row.key, true, {
                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                        lineNumber: 322,
                        columnNumber: 49
                    }, this)
            })["StickyMetricTable[rows.map()]"];
            $[15] = columns;
            $[16] = latestColumnKey;
            $[17] = t6;
        } else {
            t6 = $[17];
        }
        t5 = rows.map(t6);
        $[11] = columns;
        $[12] = latestColumnKey;
        $[13] = rows;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[18] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 342,
            columnNumber: 10
        }, this);
        $[18] = t5;
        $[19] = t6;
    } else {
        t6 = $[19];
    }
    let t7;
    if ($[20] !== t4 || $[21] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "stock-table",
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 350,
            columnNumber: 10
        }, this);
        $[20] = t4;
        $[21] = t6;
        $[22] = t7;
    } else {
        t7 = $[22];
    }
    let t8;
    if ($[23] !== ariaLabel || $[24] !== t1 || $[25] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            role: "region",
            "aria-label": ariaLabel,
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 359,
            columnNumber: 10
        }, this);
        $[23] = ariaLabel;
        $[24] = t1;
        $[25] = t7;
        $[26] = t8;
    } else {
        t8 = $[26];
    }
    return t8;
}
_c3 = StickyMetricTable;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DataMetaInline");
__turbopack_context__.k.register(_c1, "CoverageNotice");
__turbopack_context__.k.register(_c2, "DataValue");
__turbopack_context__.k.register(_c3, "StickyMetricTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/FinancialsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialsSection",
    ()=>FinancialsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// ── Helpers ──────────────────────────────────────────────────────────────────
function fmtV(value) {
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIndianNumber"])(value, 2, {
        fallback: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
    });
}
function fmtPct(value) {
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(value, 1);
}
function calcChange(curr, prev) {
    if (curr == null || prev == null || prev === 0) return null;
    return (curr - prev) / Math.abs(prev) * 100;
}
function periodKey(value, index) {
    return `${value ?? "period"}-${index}`;
}
// ── Anomaly detection ─────────────────────────────────────────────────────────
function detectAnomalies(quarterly, balanceSheets) {
    const flags = [];
    const qData = quarterly || [];
    const bsData = balanceSheets || [];
    if (qData.length >= 5) {
        const latest = qData[0];
        const prev = qData[4];
        if (latest && prev) {
            const revGrowth = prev.revenue ? ((latest.revenue ?? 0) - prev.revenue) / Math.abs(prev.revenue) * 100 : null;
            if ((latest.cfo ?? null) !== null && (latest.netProfit ?? null) !== null && (latest.netProfit ?? 0) > 0) {
                const cfoPatRatio = (latest.cfo ?? 0) / (latest.netProfit ?? 1);
                if (cfoPatRatio < 0.5) {
                    flags.push({
                        type: "CFO_PAT_DIVERGENCE",
                        description: "CFO is less than 50% of reported PAT. Treat earnings quality cautiously.",
                        severity: "WARNING",
                        metric: "CFO/PAT",
                        value: cfoPatRatio,
                        threshold: 0.5
                    });
                }
            }
            if (revGrowth !== null && revGrowth < -10 && (latest.netProfit ?? 0) > (prev.netProfit ?? 0)) {
                flags.push({
                    type: "MARGIN_EROSION",
                    description: "Revenue is contracting while profit holds up. Check whether margin expansion is sustainable.",
                    severity: "WARNING",
                    metric: "Revenue growth",
                    value: revGrowth,
                    threshold: -10
                });
            }
        }
    }
    if (bsData.length >= 2) {
        const [latest, prev] = bsData;
        if (latest.borrowings && prev.borrowings && prev.borrowings > 0) {
            const debtGrowth = (latest.borrowings - prev.borrowings) / prev.borrowings * 100;
            if (debtGrowth > 50) {
                flags.push({
                    type: "DEBT_SPIKE",
                    description: `Borrowings grew ${debtGrowth.toFixed(0)}% YoY. Verify whether the debt build supports productive assets.`,
                    severity: "CRITICAL",
                    metric: "Debt growth",
                    value: debtGrowth,
                    threshold: 50
                });
            }
        }
    }
    return flags;
}
// ── The new FinancialTable component ─────────────────────────────────────────
const CHART_COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316"
];
function FinancialTable(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(102);
    if ($[0] !== "21203b8dd653bacc6dd6420c1e63ff015deb91589a8d92d09fd42bf1cee8e224") {
        for(let $i = 0; $i < 102; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "21203b8dd653bacc6dd6420c1e63ff015deb91589a8d92d09fd42bf1cee8e224";
    }
    const { title, rows, data, getPeriodLabel, getPeriodKey, unitNote: t1, viewMode: t2, onViewModeChange } = t0;
    const unitNote = t1 === undefined ? "\u20B9 Cr" : t1;
    const viewMode = t2 === undefined ? "quarterly" : t2;
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t3;
    if ($[1] !== rows) {
        t3 = ({
            "FinancialTable[useState()]": ()=>new Set(rows.slice(0, 2).map(_FinancialTableUseStateAnonymous))
        })["FinancialTable[useState()]"];
        $[1] = rows;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const [selectedRows, setSelectedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t3);
    const [showPctChange, setShowPctChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showChart, setShowChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t4;
    if ($[3] !== data) {
        t4 = [
            ...data
        ].reverse();
        $[3] = data;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const chronoData = t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "FinancialTable[useEffect()]": ()=>{
                const el = scrollRef.current;
                if (el) {
                    requestAnimationFrame({
                        "FinancialTable[useEffect() > requestAnimationFrame()]": ()=>{
                            el.scrollLeft = el.scrollWidth;
                        }
                    }["FinancialTable[useEffect() > requestAnimationFrame()]"]);
                }
            }
        })["FinancialTable[useEffect()]"];
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== chronoData) {
        t6 = [
            chronoData
        ];
        $[6] = chronoData;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "FinancialTable[toggleRow]": (key)=>{
                setSelectedRows({
                    "FinancialTable[toggleRow > setSelectedRows()]": (prev)=>{
                        const next = new Set(prev);
                        if (next.has(key)) {
                            if (next.size > 1) {
                                next.delete(key);
                            }
                        } else {
                            next.add(key);
                        }
                        return next;
                    }
                }["FinancialTable[toggleRow > setSelectedRows()]"]);
            }
        })["FinancialTable[toggleRow]"];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const toggleRow = t7;
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            backgroundColor: "var(--surface-elevated, #fff)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--text-primary)"
        };
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    const tooltipStyle = t8;
    let t9;
    if ($[10] !== chronoData || $[11] !== getPeriodLabel || $[12] !== rows || $[13] !== selectedRows) {
        let t10;
        if ($[15] !== getPeriodLabel || $[16] !== rows || $[17] !== selectedRows) {
            t10 = ({
                "FinancialTable[chronoData.map()]": (row)=>{
                    const entry = {
                        period: getPeriodLabel(row)
                    };
                    rows.filter({
                        "FinancialTable[chronoData.map() > rows.filter()]": (r_0)=>selectedRows.has(r_0.key)
                    }["FinancialTable[chronoData.map() > rows.filter()]"]).forEach({
                        "FinancialTable[chronoData.map() > (anonymous)()]": (r_1)=>{
                            const v = r_1.getValue(row);
                            if (v != null) {
                                entry[r_1.label] = v;
                            }
                        }
                    }["FinancialTable[chronoData.map() > (anonymous)()]"]);
                    return entry;
                }
            })["FinancialTable[chronoData.map()]"];
            $[15] = getPeriodLabel;
            $[16] = rows;
            $[17] = selectedRows;
            $[18] = t10;
        } else {
            t10 = $[18];
        }
        t9 = chronoData.map(t10);
        $[10] = chronoData;
        $[11] = getPeriodLabel;
        $[12] = rows;
        $[13] = selectedRows;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    const chartData = t9;
    let t10;
    let t11;
    let t12;
    if ($[19] !== chartData || $[20] !== onViewModeChange || $[21] !== rows || $[22] !== selectedRows || $[23] !== showChart || $[24] !== showPctChange || $[25] !== title || $[26] !== unitNote || $[27] !== viewMode) {
        let t13;
        if ($[31] !== selectedRows) {
            t13 = ({
                "FinancialTable[rows.filter()]": (r_2)=>selectedRows.has(r_2.key)
            })["FinancialTable[rows.filter()]"];
            $[31] = selectedRows;
            $[32] = t13;
        } else {
            t13 = $[32];
        }
        const selectedRowDefs = rows.filter(t13);
        let t14;
        if ($[33] !== chartData) {
            t14 = chartData.some(_FinancialTableChartDataSome);
            $[33] = chartData;
            $[34] = t14;
        } else {
            t14 = $[34];
        }
        const hasChartData = t14;
        t10 = "fin-card";
        let t15;
        if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = {
                borderColor: "var(--border)"
            };
            $[35] = t15;
        } else {
            t15 = $[35];
        }
        let t16;
        if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = {
                color: "var(--text-primary)"
            };
            $[36] = t16;
        } else {
            t16 = $[36];
        }
        let t17;
        if ($[37] !== title) {
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-semibold",
                style: t16,
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this);
            $[37] = title;
            $[38] = t17;
        } else {
            t17 = $[38];
        }
        let t18;
        if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = ({
                "FinancialTable[<input>.onChange]": (e)=>setShowPctChange(e.target.checked)
            })["FinancialTable[<input>.onChange]"];
            $[39] = t18;
        } else {
            t18 = $[39];
        }
        let t19;
        if ($[40] !== showPctChange) {
            t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: showPctChange,
                onChange: t18,
                className: "fin-footer-cb"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 356,
                columnNumber: 13
            }, this);
            $[40] = showPctChange;
            $[41] = t19;
        } else {
            t19 = $[41];
        }
        let t20;
        if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
            t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Show % change"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 364,
                columnNumber: 13
            }, this);
            $[42] = t20;
        } else {
            t20 = $[42];
        }
        let t21;
        if ($[43] !== t19) {
            t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "fin-footer-toggle",
                children: [
                    t19,
                    t20
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 371,
                columnNumber: 13
            }, this);
            $[43] = t19;
            $[44] = t21;
        } else {
            t21 = $[44];
        }
        let t22;
        if ($[45] !== showChart) {
            t22 = ({
                "FinancialTable[<button>.onClick]": ()=>setShowChart(!showChart)
            })["FinancialTable[<button>.onClick]"];
            $[45] = showChart;
            $[46] = t22;
        } else {
            t22 = $[46];
        }
        const t23 = `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${showChart ? "border-amber-500/50 text-amber-500 bg-amber-500/10" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/40"}`;
        const t24 = showChart ? "Hide chart" : "Show chart";
        let t25;
        if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
            t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                size: 12
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 391,
                columnNumber: 13
            }, this);
            $[47] = t25;
        } else {
            t25 = $[47];
        }
        const t26 = showChart ? "Hide" : "Show";
        let t27;
        if ($[48] !== t22 || $[49] !== t23 || $[50] !== t24 || $[51] !== t26) {
            t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: t22,
                className: t23,
                title: t24,
                children: [
                    t25,
                    t26
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 399,
                columnNumber: 13
            }, this);
            $[48] = t22;
            $[49] = t23;
            $[50] = t24;
            $[51] = t26;
            $[52] = t27;
        } else {
            t27 = $[52];
        }
        let t28;
        if ($[53] !== unitNote) {
            t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "fin-unit-note",
                children: unitNote
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 410,
                columnNumber: 13
            }, this);
            $[53] = unitNote;
            $[54] = t28;
        } else {
            t28 = $[54];
        }
        let t29;
        if ($[55] !== onViewModeChange || $[56] !== viewMode) {
            t29 = onViewModeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
                children: [
                    "quarterly",
                    "annual"
                ].map({
                    "FinancialTable[(anonymous)()]": (mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "FinancialTable[(anonymous)() > <button>.onClick]": ()=>onViewModeChange(mode)
                            }["FinancialTable[(anonymous)() > <button>.onClick]"],
                            className: `px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${viewMode === mode ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                            children: mode
                        }, mode, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 419,
                            columnNumber: 52
                        }, this)
                }["FinancialTable[(anonymous)()]"])
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 418,
                columnNumber: 33
            }, this);
            $[55] = onViewModeChange;
            $[56] = viewMode;
            $[57] = t29;
        } else {
            t29 = $[57];
        }
        let t30;
        if ($[58] !== t21 || $[59] !== t27 || $[60] !== t28 || $[61] !== t29) {
            t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    t21,
                    t27,
                    t28,
                    t29
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 431,
                columnNumber: 13
            }, this);
            $[58] = t21;
            $[59] = t27;
            $[60] = t28;
            $[61] = t29;
            $[62] = t30;
        } else {
            t30 = $[62];
        }
        if ($[63] !== t17 || $[64] !== t30) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-3 border-b",
                style: t15,
                children: [
                    t17,
                    t30
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 441,
                columnNumber: 13
            }, this);
            $[63] = t17;
            $[64] = t30;
            $[65] = t11;
        } else {
            t11 = $[65];
        }
        t12 = showChart && hasChartData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fin-chart-area",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 220,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: chartData,
                    margin: {
                        top: 4,
                        right: 16,
                        left: 4,
                        bottom: 0
                    },
                    barCategoryGap: "28%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--border)",
                            opacity: 0.5
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 453,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "period",
                            axisLine: false,
                            tickLine: false,
                            tick: {
                                fontSize: 11,
                                fill: "var(--text-muted)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 453,
                            columnNumber: 126
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            axisLine: false,
                            tickLine: false,
                            tick: {
                                fontSize: 11,
                                fill: "var(--text-muted)"
                            },
                            tickFormatter: _FinancialTableYAxisTickFormatter,
                            width: 60
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 456,
                            columnNumber: 16
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: tooltipStyle,
                            formatter: _FinancialTableTooltipFormatter
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 459,
                            columnNumber: 77
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                            iconType: "circle",
                            wrapperStyle: {
                                fontSize: "11px",
                                paddingTop: "12px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 459,
                            columnNumber: 160
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                            y: 0,
                            stroke: "var(--border)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 462,
                            columnNumber: 16
                        }, this),
                        selectedRowDefs.map(_FinancialTableSelectedRowDefsMap)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 448,
                    columnNumber: 119
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 448,
                columnNumber: 72
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 448,
            columnNumber: 40
        }, this);
        $[19] = chartData;
        $[20] = onViewModeChange;
        $[21] = rows;
        $[22] = selectedRows;
        $[23] = showChart;
        $[24] = showPctChange;
        $[25] = title;
        $[26] = unitNote;
        $[27] = viewMode;
        $[28] = t10;
        $[29] = t11;
        $[30] = t12;
    } else {
        t10 = $[28];
        t11 = $[29];
        t12 = $[30];
    }
    let t13;
    if ($[66] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        };
        $[66] = t13;
    } else {
        t13 = $[66];
    }
    let t14;
    if ($[67] !== title) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "fin-th fin-th--param",
            style: t13,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 492,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 492,
            columnNumber: 11
        }, this);
        $[67] = title;
        $[68] = t14;
    } else {
        t14 = $[68];
    }
    let t15;
    if ($[69] !== chronoData || $[70] !== getPeriodKey || $[71] !== getPeriodLabel) {
        let t16;
        if ($[73] !== chronoData.length || $[74] !== getPeriodKey || $[75] !== getPeriodLabel) {
            t16 = ({
                "FinancialTable[chronoData.map()]": (row_0, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "fin-th fin-th--period",
                        style: idx === chronoData.length - 1 ? {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        } : undefined,
                        children: getPeriodLabel(row_0)
                    }, getPeriodKey(row_0, idx), false, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 503,
                        columnNumber: 61
                    }, this)
            })["FinancialTable[chronoData.map()]"];
            $[73] = chronoData.length;
            $[74] = getPeriodKey;
            $[75] = getPeriodLabel;
            $[76] = t16;
        } else {
            t16 = $[76];
        }
        t15 = chronoData.map(t16);
        $[69] = chronoData;
        $[70] = getPeriodKey;
        $[71] = getPeriodLabel;
        $[72] = t15;
    } else {
        t15 = $[72];
    }
    let t16;
    if ($[77] !== t14 || $[78] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                children: [
                    t14,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 525,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 525,
            columnNumber: 11
        }, this);
        $[77] = t14;
        $[78] = t15;
        $[79] = t16;
    } else {
        t16 = $[79];
    }
    let t17;
    if ($[80] !== chronoData || $[81] !== getPeriodKey || $[82] !== rows || $[83] !== selectedRows || $[84] !== showPctChange) {
        let t18;
        if ($[86] !== chronoData || $[87] !== getPeriodKey || $[88] !== rows.length || $[89] !== selectedRows || $[90] !== showPctChange) {
            t18 = ({
                "FinancialTable[rows.map()]": (rowDef, rowIdx)=>{
                    const isSelected = selectedRows.has(rowDef.key);
                    const isLastRow = rowIdx === rows.length - 1;
                    const values = chronoData.map({
                        "FinancialTable[rows.map() > chronoData.map()]": (row_1)=>rowDef.getValue(row_1)
                    }["FinancialTable[rows.map() > chronoData.map()]"]);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: `fin-tr${isSelected ? " fin-tr--selected" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "fin-td fin-td--param",
                                style: isLastRow ? {
                                    borderBottom: "none",
                                    borderBottomLeftRadius: "0.75rem"
                                } : undefined,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "fin-row-label",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            className: "fin-checkbox",
                                            checked: isSelected,
                                            onChange: {
                                                "FinancialTable[rows.map() > <input>.onChange]": ()=>toggleRow(rowDef.key)
                                            }["FinancialTable[rows.map() > <input>.onChange]"],
                                            "aria-label": `Select ${rowDef.label} for chart`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                            lineNumber: 546,
                                            columnNumber: 61
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fin-row-name",
                                            children: rowDef.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                            lineNumber: 548,
                                            columnNumber: 119
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                    lineNumber: 546,
                                    columnNumber: 28
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 543,
                                columnNumber: 100
                            }, this),
                            values.map({
                                "FinancialTable[rows.map() > values.map()]": (val, idx_0)=>{
                                    const prevVal = idx_0 > 0 ? values[idx_0 - 1] : null;
                                    const pctChange = showPctChange && !rowDef.isPercent ? calcChange(val, prevVal) : null;
                                    const isLastCell = isLastRow && idx_0 === values.length - 1;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "fin-td fin-td--value",
                                        style: {
                                            ...isLastRow ? {
                                                borderBottom: "none"
                                            } : {},
                                            ...isLastCell ? {
                                                borderBottomRightRadius: "0.75rem"
                                            } : {}
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "fin-val",
                                                children: rowDef.isPercent ? fmtPct(val) : fmtV(val)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                lineNumber: 560,
                                                columnNumber: 20
                                            }, this),
                                            showPctChange && !rowDef.isPercent && pctChange != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `fin-pct${pctChange >= 0 ? " fin-pct--pos" : " fin-pct--neg"}`,
                                                children: [
                                                    pctChange >= 0 ? "\u25B2" : "\u25BC",
                                                    Math.abs(pctChange).toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                lineNumber: 560,
                                                columnNumber: 215
                                            }, this)
                                        ]
                                    }, getPeriodKey(chronoData[idx_0], idx_0), true, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 553,
                                        columnNumber: 24
                                    }, this);
                                }
                            }["FinancialTable[rows.map() > values.map()]"])
                        ]
                    }, rowDef.key, true, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 543,
                        columnNumber: 18
                    }, this);
                }
            })["FinancialTable[rows.map()]"];
            $[86] = chronoData;
            $[87] = getPeriodKey;
            $[88] = rows.length;
            $[89] = selectedRows;
            $[90] = showPctChange;
            $[91] = t18;
        } else {
            t18 = $[91];
        }
        t17 = rows.map(t18);
        $[80] = chronoData;
        $[81] = getPeriodKey;
        $[82] = rows;
        $[83] = selectedRows;
        $[84] = showPctChange;
        $[85] = t17;
    } else {
        t17 = $[85];
    }
    let t18;
    if ($[92] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: t17
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 586,
            columnNumber: 11
        }, this);
        $[92] = t17;
        $[93] = t18;
    } else {
        t18 = $[93];
    }
    let t19;
    if ($[94] !== t16 || $[95] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fin-table-shell",
            ref: scrollRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "fin-table",
                children: [
                    t16,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 594,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 594,
            columnNumber: 11
        }, this);
        $[94] = t16;
        $[95] = t18;
        $[96] = t19;
    } else {
        t19 = $[96];
    }
    let t20;
    if ($[97] !== t10 || $[98] !== t11 || $[99] !== t12 || $[100] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t10,
            children: [
                t11,
                t12,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 603,
            columnNumber: 11
        }, this);
        $[97] = t10;
        $[98] = t11;
        $[99] = t12;
        $[100] = t19;
        $[101] = t20;
    } else {
        t20 = $[101];
    }
    return t20;
}
_s(FinancialTable, "/HGADpjZ8BV5GnJ5gcX5bB376p8=");
_c = FinancialTable;
// ── Row definitions ───────────────────────────────────────────────────────────
function _FinancialTableSelectedRowDefsMap(r_3, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
        dataKey: r_3.label,
        fill: CHART_COLORS[i % CHART_COLORS.length],
        radius: [
            3,
            3,
            0,
            0
        ],
        opacity: 0.9
    }, r_3.key, false, {
        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
        lineNumber: 617,
        columnNumber: 10
    }, this);
}
function _FinancialTableTooltipFormatter(value) {
    return [
        fmtV(value)
    ];
}
function _FinancialTableYAxisTickFormatter(v_0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIndianNumber"])(v_0, 0, {
        fallback: ""
    });
}
function _FinancialTableChartDataSome(d) {
    return Object.keys(d).length > 1;
}
function _FinancialTableUseStateAnonymous(r) {
    return r.key;
}
const PL_ROWS = [
    {
        key: "revenue",
        label: "Revenue",
        getValue: (r)=>r.revenue
    },
    {
        key: "ebitda",
        label: "EBITDA",
        getValue: (r)=>r.ebitda
    },
    {
        key: "operatingProfit",
        label: "Operating Profit",
        getValue: (r)=>r.operatingProfit
    },
    {
        key: "ebit",
        label: "EBIT",
        getValue: (r)=>r.ebit
    },
    {
        key: "opm",
        label: "OPM %",
        getValue: (r)=>{
            const q = r;
            return q.revenue && q.operatingProfit != null ? q.operatingProfit / q.revenue * 100 : null;
        },
        isPercent: true
    },
    {
        key: "interest",
        label: "Interest",
        getValue: (r)=>r.interest
    },
    {
        key: "pbt",
        label: "PBT",
        getValue: (r)=>r.pbt
    },
    {
        key: "tax",
        label: "Tax",
        getValue: (r)=>r.tax
    },
    {
        key: "netProfit",
        label: "Net Profit",
        getValue: (r)=>r.netProfit ?? r.pat
    },
    {
        key: "patMargin",
        label: "PAT Margin %",
        getValue: (r)=>r.patMargin,
        isPercent: true
    },
    {
        key: "eps",
        label: "EPS",
        getValue: (r)=>r.eps
    }
];
const BALANCE_ROWS = [
    {
        key: "equityCapital",
        label: "Equity Capital",
        getValue: (r)=>r.equityCapital
    },
    {
        key: "reserves",
        label: "Reserves",
        getValue: (r)=>r.reserves
    },
    {
        key: "totalEquity",
        label: "Total Equity",
        getValue: (r)=>r.totalEquity
    },
    {
        key: "borrowings",
        label: "Borrowings",
        getValue: (r)=>r.borrowings ?? r.totalDebt
    },
    {
        key: "tradeReceivables",
        label: "Trade Receivables",
        getValue: (r)=>r.tradeReceivables
    },
    {
        key: "cashEquivalents",
        label: "Cash & Equiv.",
        getValue: (r)=>r.cashEquivalents ?? r.cash
    },
    {
        key: "totalAssets",
        label: "Total Assets",
        getValue: (r)=>r.totalAssets
    }
];
const CASH_ROWS = [
    {
        key: "operating",
        label: "Operating CF",
        getValue: (r)=>r.cashFromOperating ?? r.operatingCF
    },
    {
        key: "investing",
        label: "Investing CF",
        getValue: (r)=>r.cashFromInvesting ?? r.investingCF
    },
    {
        key: "financing",
        label: "Financing CF",
        getValue: (r)=>r.cashFromFinancing ?? r.financingCF
    },
    {
        key: "capex",
        label: "Capex",
        getValue: (r)=>r.capex
    },
    {
        key: "fcf",
        label: "Free Cash Flow",
        getValue: (r)=>r.freeCashFlow ?? r.freeCF
    }
];
function FinancialsSection(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "21203b8dd653bacc6dd6420c1e63ff015deb91589a8d92d09fd42bf1cee8e224") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "21203b8dd653bacc6dd6420c1e63ff015deb91589a8d92d09fd42bf1cee8e224";
    }
    const { symbol } = t0;
    const [isConsolidated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [plViewMode, setPlViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [bsViewMode, setBsViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [cfViewMode, setCfViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedKey, setLoadedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const requestKey = `${symbol}-${isConsolidated ? "consolidated" : "standalone"}`;
    let t1;
    let t2;
    if ($[1] !== isConsolidated || $[2] !== requestKey || $[3] !== symbol) {
        t1 = ({
            "FinancialsSection[useEffect()]": ()=>{
                fetch(`/api/stocks/${symbol}/financials?consolidated=${isConsolidated}`).then({
                    "FinancialsSection[useEffect() > (anonymous)()]": async (response)=>{
                        const payload = await response.json();
                        if (!response.ok || payload.error) {
                            setData(null);
                            setLoadedKey(requestKey);
                            return;
                        }
                        setData(payload);
                        setLoadedKey(requestKey);
                    }
                }["FinancialsSection[useEffect() > (anonymous)()]"]).catch({
                    "FinancialsSection[useEffect() > (anonymous)()]": ()=>{
                        setData(null);
                        setLoadedKey(requestKey);
                    }
                }["FinancialsSection[useEffect() > (anonymous)()]"]);
            }
        })["FinancialsSection[useEffect()]"];
        t2 = [
            requestKey,
            symbol,
            isConsolidated
        ];
        $[1] = isConsolidated;
        $[2] = requestKey;
        $[3] = symbol;
        $[4] = t1;
        $[5] = t2;
    } else {
        t1 = $[4];
        t2 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const loading = loadedKey !== requestKey;
    let t3;
    bb0: {
        if (!data) {
            let t4;
            if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
                t4 = [];
                $[6] = t4;
            } else {
                t4 = $[6];
            }
            t3 = t4;
            break bb0;
        }
        let t4;
        if ($[7] !== data.anomalies || $[8] !== data.balanceSheets || $[9] !== data.quarterly) {
            t4 = data.anomalies?.length ? data.anomalies : detectAnomalies(data.quarterly, data.balanceSheets);
            $[7] = data.anomalies;
            $[8] = data.balanceSheets;
            $[9] = data.quarterly;
            $[10] = t4;
        } else {
            t4 = $[10];
        }
        t3 = t4;
    }
    const anomalies = t3;
    let t4;
    bb1: {
        if (!data) {
            let t5;
            if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
                t5 = [];
                $[11] = t5;
            } else {
                t5 = $[11];
            }
            t4 = t5;
            break bb1;
        }
        const source = plViewMode === "quarterly" ? data.quarterly : data.annual;
        t4 = source;
    }
    const statementRows = t4;
    if (loading) {
        let t5;
        if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "financials",
                className: "scroll-mt-28",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-xl border flex items-center justify-center h-64",
                    style: {
                        background: "var(--surface)",
                        borderColor: "var(--border)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 842,
                        columnNumber: 12
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 839,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 839,
                columnNumber: 12
            }, this);
            $[12] = t5;
        } else {
            t5 = $[12];
        }
        return t5;
    }
    if (!data) {
        let t5;
        if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "financials",
                className: "scroll-mt-28",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                    title: "Financial statements unavailable",
                    message: "Financial history could not be loaded for this company view."
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 852,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 852,
                columnNumber: 12
            }, this);
            $[13] = t5;
        } else {
            t5 = $[13];
        }
        return t5;
    }
    let t5;
    if ($[14] !== anomalies) {
        t5 = anomalies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: anomalies.map(_FinancialsSectionAnomaliesMap)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 861,
            columnNumber: 34
        }, this);
        $[14] = anomalies;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    let t6;
    if ($[16] !== plViewMode) {
        t6 = ({
            "FinancialsSection[<FinancialTable>.getPeriodLabel]": (row)=>plViewMode === "quarterly" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEnd ?? row.quarter) : row.quarter ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEnd, {
                    annualAlias: true
                })
        })["FinancialsSection[<FinancialTable>.getPeriodLabel]"];
        $[16] = plViewMode;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    let t7;
    if ($[18] !== plViewMode || $[19] !== statementRows || $[20] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
            title: "Profit & Loss",
            rows: PL_ROWS,
            data: statementRows,
            viewMode: plViewMode,
            onViewModeChange: setPlViewMode,
            getPeriodLabel: t6,
            getPeriodKey: _FinancialsSectionFinancialTableGetPeriodKey
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 881,
            columnNumber: 10
        }, this);
        $[18] = plViewMode;
        $[19] = statementRows;
        $[20] = t6;
        $[21] = t7;
    } else {
        t7 = $[21];
    }
    let t8;
    if ($[22] !== bsViewMode || $[23] !== data.balanceSheets) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
            title: "Balance Sheet",
            rows: BALANCE_ROWS,
            data: data.balanceSheets,
            viewMode: bsViewMode,
            onViewModeChange: setBsViewMode,
            getPeriodLabel: _FinancialsSectionFinancialTableGetPeriodLabel,
            getPeriodKey: _FinancialsSectionFinancialTableGetPeriodKey2
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 891,
            columnNumber: 10
        }, this);
        $[22] = bsViewMode;
        $[23] = data.balanceSheets;
        $[24] = t8;
    } else {
        t8 = $[24];
    }
    let t9;
    if ($[25] !== cfViewMode || $[26] !== data.cashFlows) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
            title: "Cash Flow",
            rows: CASH_ROWS,
            data: data.cashFlows,
            viewMode: cfViewMode,
            onViewModeChange: setCfViewMode,
            getPeriodLabel: _FinancialsSectionFinancialTableGetPeriodLabel2,
            getPeriodKey: _FinancialsSectionFinancialTableGetPeriodKey3
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 900,
            columnNumber: 10
        }, this);
        $[25] = cfViewMode;
        $[26] = data.cashFlows;
        $[27] = t9;
    } else {
        t9 = $[27];
    }
    let t10;
    if ($[28] !== t5 || $[29] !== t7 || $[30] !== t8 || $[31] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "financials",
            className: "scroll-mt-28 space-y-6",
            children: [
                t5,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 909,
            columnNumber: 11
        }, this);
        $[28] = t5;
        $[29] = t7;
        $[30] = t8;
        $[31] = t9;
        $[32] = t10;
    } else {
        t10 = $[32];
    }
    return t10;
}
_s1(FinancialsSection, "zWTfVy1ZeTK7emoVDTLnvbLg4uo=");
_c1 = FinancialsSection;
function _FinancialsSectionFinancialTableGetPeriodKey3(row_4, idx_1) {
    return periodKey(row_4.periodEndDate ?? row_4.periodEnd, idx_1);
}
function _FinancialsSectionFinancialTableGetPeriodLabel2(row_3) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row_3.periodEndDate ?? row_3.periodEnd, {
        annualAlias: true
    });
}
function _FinancialsSectionFinancialTableGetPeriodKey2(row_2, idx_0) {
    return periodKey(row_2.periodEndDate ?? row_2.periodEnd, idx_0);
}
function _FinancialsSectionFinancialTableGetPeriodLabel(row_1) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row_1.periodEndDate ?? row_1.periodEnd, {
        annualAlias: true
    });
}
function _FinancialsSectionFinancialTableGetPeriodKey(row_0, idx) {
    return periodKey(row_0.periodEnd ?? row_0.quarter, idx);
}
function _FinancialsSectionAnomaliesMap(flag, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${flag.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 14,
                className: `mt-0.5 flex-shrink-0 ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-500"}`
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 940,
                columnNumber: 222
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-semibold ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-600"}`,
                        children: [
                            flag.severity,
                            ": "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 940,
                        columnNumber: 358
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: flag.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 940,
                        columnNumber: 485
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 940,
                columnNumber: 353
            }, this)
        ]
    }, `${flag.type}-${i}`, true, {
        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
        lineNumber: 940,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "FinancialTable");
__turbopack_context__.k.register(_c1, "FinancialsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/OwnershipSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnershipSection",
    ()=>OwnershipSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
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
const SH_COLORS = {
    Promoter: "#F59E0B",
    FII: "#3B82F6",
    DII: "#10B981",
    MF: "#8B5CF6",
    Public: "#6B7280"
};
function OwnershipSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(121);
    if ($[0] !== "450a3cc3301278815a9b64b8264e3ee296bc80116a27a6c5419551e81caee2d7") {
        for(let $i = 0; $i < 121; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "450a3cc3301278815a9b64b8264e3ee296bc80116a27a6c5419551e81caee2d7";
    }
    const { symbol } = t0;
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("trend");
    let t1;
    if ($[1] !== data?.shareholding) {
        t1 = data?.shareholding ?? [];
        $[1] = data?.shareholding;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const shareholding = t1;
    const governance = data?.governance ?? null;
    let t2;
    let t3;
    if ($[3] !== symbol) {
        t2 = ({
            "OwnershipSection[useEffect()]": ()=>{
                fetch(`/api/stocks/${symbol}/ownership`).then(_OwnershipSectionUseEffectAnonymous).then({
                    "OwnershipSection[useEffect() > (anonymous)()]": (payload)=>{
                        setData({
                            shareholding: Array.isArray(payload?.shareholding) ? payload.shareholding : [],
                            governance: payload?.governance ?? null,
                            meta: payload?.meta
                        });
                        setLoadedSymbol(symbol);
                    }
                }["OwnershipSection[useEffect() > (anonymous)()]"]).catch({
                    "OwnershipSection[useEffect() > (anonymous)()]": ()=>{
                        setData(null);
                        setLoadedSymbol(symbol);
                    }
                }["OwnershipSection[useEffect() > (anonymous)()]"]);
            }
        })["OwnershipSection[useEffect()]"];
        t3 = [
            symbol
        ];
        $[3] = symbol;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    bb0: {
        if (shareholding.length === 0) {
            let t5;
            if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
                t5 = [];
                $[6] = t5;
            } else {
                t5 = $[6];
            }
            t4 = t5;
            break bb0;
        }
        let t5;
        if ($[7] !== shareholding) {
            t5 = [
                ...shareholding
            ].reverse().map(_OwnershipSectionAnonymous);
            $[7] = shareholding;
            $[8] = t5;
        } else {
            t5 = $[8];
        }
        t4 = t5;
    }
    const trendData = t4;
    let t5;
    bb1: {
        if (shareholding.length === 0) {
            let t6;
            if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
                t6 = [];
                $[9] = t6;
            } else {
                t6 = $[9];
            }
            t5 = t6;
            break bb1;
        }
        const s_0 = shareholding[0];
        const t6 = s_0.promoterPct ?? 0;
        let t7;
        if ($[10] !== t6) {
            t7 = {
                name: "Promoter",
                value: t6,
                color: SH_COLORS.Promoter
            };
            $[10] = t6;
            $[11] = t7;
        } else {
            t7 = $[11];
        }
        const t8 = s_0.fiiPct ?? 0;
        let t9;
        if ($[12] !== t8) {
            t9 = {
                name: "FII",
                value: t8,
                color: SH_COLORS.FII
            };
            $[12] = t8;
            $[13] = t9;
        } else {
            t9 = $[13];
        }
        const t10 = s_0.diiPct ?? 0;
        let t11;
        if ($[14] !== t10) {
            t11 = {
                name: "DII",
                value: t10,
                color: SH_COLORS.DII
            };
            $[14] = t10;
            $[15] = t11;
        } else {
            t11 = $[15];
        }
        const t12 = s_0.mfPct ?? 0;
        let t13;
        if ($[16] !== t12) {
            t13 = {
                name: "MF",
                value: t12,
                color: SH_COLORS.MF
            };
            $[16] = t12;
            $[17] = t13;
        } else {
            t13 = $[17];
        }
        const t14 = s_0.publicPct ?? 0;
        let t15;
        if ($[18] !== t14) {
            t15 = {
                name: "Public",
                value: t14,
                color: SH_COLORS.Public
            };
            $[18] = t14;
            $[19] = t15;
        } else {
            t15 = $[19];
        }
        let t16;
        if ($[20] !== t11 || $[21] !== t13 || $[22] !== t15 || $[23] !== t7 || $[24] !== t9) {
            t16 = [
                t7,
                t9,
                t11,
                t13,
                t15
            ].filter(_OwnershipSectionAnonymous2);
            $[20] = t11;
            $[21] = t13;
            $[22] = t15;
            $[23] = t7;
            $[24] = t9;
            $[25] = t16;
        } else {
            t16 = $[25];
        }
        t5 = t16;
    }
    const latestDonut = t5;
    let t6;
    bb2: {
        if (shareholding.length === 0) {
            let t7;
            if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
                t7 = [];
                $[26] = t7;
            } else {
                t7 = $[26];
            }
            t6 = t7;
            break bb2;
        }
        let t7;
        if ($[27] !== shareholding) {
            t7 = [
                ...shareholding
            ].reverse().map(_OwnershipSectionAnonymous3);
            $[27] = shareholding;
            $[28] = t7;
        } else {
            t7 = $[28];
        }
        t6 = t7;
    }
    const pledgeHistory = t6;
    const latestSh = shareholding[0];
    const pledgePct = latestSh?.promoterPledgePct ?? 0;
    const promoterQoQ = shareholding.length >= 2 ? shareholding[0].promoterChangeQoq ?? (shareholding[0].promoterPct ?? 0) - (shareholding[1].promoterPct ?? 0) : null;
    const fiiQoQ = shareholding.length >= 2 ? shareholding[0].fiiChangeQoq ?? (shareholding[0].fiiPct ?? 0) - (shareholding[1].fiiPct ?? 0) : null;
    const diiQoQ = shareholding.length >= 2 ? shareholding[0].diiChangeQoq ?? (shareholding[0].diiPct ?? 0) - (shareholding[1].diiPct ?? 0) : null;
    const mfQoQ = shareholding.length >= 2 ? (shareholding[0].mfPct ?? 0) - (shareholding[1].mfPct ?? 0) : null;
    let axisStyle;
    let meta;
    let t10;
    let t7;
    let t8;
    let t9;
    let tooltipStyle;
    if ($[29] !== data?.meta || $[30] !== diiQoQ || $[31] !== fiiQoQ || $[32] !== governance || $[33] !== loadedSymbol || $[34] !== mfQoQ || $[35] !== promoterQoQ || $[36] !== shareholding || $[37] !== symbol) {
        t10 = Symbol.for("react.early_return_sentinel");
        bb3: {
            const significantChanges = [
                {
                    label: "Promoter",
                    change: promoterQoQ,
                    color: SH_COLORS.Promoter
                },
                {
                    label: "FII",
                    change: fiiQoQ,
                    color: SH_COLORS.FII
                },
                {
                    label: "DII",
                    change: diiQoQ,
                    color: SH_COLORS.DII
                },
                {
                    label: "MF",
                    change: mfQoQ,
                    color: SH_COLORS.MF
                }
            ].filter(_OwnershipSectionAnonymous4);
            let t11;
            if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
                t11 = {
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px"
                };
                $[45] = t11;
            } else {
                t11 = $[45];
            }
            tooltipStyle = t11;
            let t12;
            if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
                t12 = {
                    fontSize: 11,
                    fill: "var(--text-muted)"
                };
                $[46] = t12;
            } else {
                t12 = $[46];
            }
            axisStyle = t12;
            let t13;
            if ($[47] !== data?.meta || $[48] !== governance || $[49] !== shareholding) {
                t13 = data?.meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDataMeta"])({
                    asOfCandidates: [
                        shareholding[0]?.quarterEnd,
                        shareholding[0]?.quarter
                    ],
                    coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoverage"])([
                        shareholding.length ? shareholding : null,
                        governance
                    ]),
                    note: "Ownership updates are quarterly."
                });
                $[47] = data?.meta;
                $[48] = governance;
                $[49] = shareholding;
                $[50] = t13;
            } else {
                t13 = $[50];
            }
            meta = t13;
            if (loadedSymbol !== symbol) {
                let t14;
                if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
                    t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "ownership",
                        className: "scroll-mt-28",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-xl border flex items-center justify-center h-64",
                            style: {
                                background: "var(--surface)",
                                borderColor: "var(--border)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 297,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 294,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 294,
                        columnNumber: 17
                    }, this);
                    $[51] = t14;
                } else {
                    t14 = $[51];
                }
                t10 = t14;
                break bb3;
            }
            t7 = "ownership";
            t8 = "scroll-mt-28 space-y-4";
            t9 = significantChanges.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        size: 14,
                        className: "mt-0.5 flex-shrink-0 text-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 307,
                        columnNumber: 148
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Significant Institutional Changes:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 309,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 mt-1",
                                children: significantChanges.map(_OwnershipSectionSignificantChangesMap)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 309,
                                columnNumber: 63
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 307,
                        columnNumber: 214
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 307,
                columnNumber: 45
            }, this);
        }
        $[29] = data?.meta;
        $[30] = diiQoQ;
        $[31] = fiiQoQ;
        $[32] = governance;
        $[33] = loadedSymbol;
        $[34] = mfQoQ;
        $[35] = promoterQoQ;
        $[36] = shareholding;
        $[37] = symbol;
        $[38] = axisStyle;
        $[39] = meta;
        $[40] = t10;
        $[41] = t7;
        $[42] = t8;
        $[43] = t9;
        $[44] = tooltipStyle;
    } else {
        axisStyle = $[38];
        meta = $[39];
        t10 = $[40];
        t7 = $[41];
        t8 = $[42];
        t9 = $[43];
        tooltipStyle = $[44];
    }
    if (t10 !== Symbol.for("react.early_return_sentinel")) {
        return t10;
    }
    let t11;
    if ($[52] !== pledgePct) {
        t11 = pledgePct > 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-start gap-3 p-3 rounded-lg border text-sm ${pledgePct > 30 ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    size: 14,
                    className: `mt-0.5 flex-shrink-0 ${pledgePct > 30 ? "text-red-400" : "text-yellow-400"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 341,
                    columnNumber: 195
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: [
                                pledgePct.toFixed(1),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 343,
                            columnNumber: 10
                        }, this),
                        " of promoter holding is pledged",
                        pledgePct > 30 ? " \u2014 high risk, monitor closely" : " \u2014 moderate concern",
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 341,
                    columnNumber: 312
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 341,
            columnNumber: 29
        }, this);
        $[52] = pledgePct;
        $[53] = t11;
    } else {
        t11 = $[53];
    }
    let t12;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[54] = t12;
    } else {
        t12 = $[54];
    }
    let t13;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-base font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "Shareholding Pattern"
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        $[55] = t13;
    } else {
        t13 = $[55];
    }
    let t14;
    if ($[56] !== meta) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                        meta: meta
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 370,
                        columnNumber: 43
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 370,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[56] = meta;
        $[57] = t14;
    } else {
        t14 = $[57];
    }
    let t15;
    if ($[58] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = [
            "trend",
            "donut"
        ];
        $[58] = t15;
    } else {
        t15 = $[58];
    }
    let t16;
    if ($[59] !== activeView) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
            children: t15.map({
                "OwnershipSection[(anonymous)()]": (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "OwnershipSection[(anonymous)() > <button>.onClick]": ()=>setActiveView(v)
                        }["OwnershipSection[(anonymous)() > <button>.onClick]"],
                        className: `px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${activeView === v ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground"}`,
                        children: v
                    }, v, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 386,
                        columnNumber: 49
                    }, this)
            }["OwnershipSection[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[59] = activeView;
        $[60] = t16;
    } else {
        t16 = $[60];
    }
    let t17;
    if ($[61] !== t14 || $[62] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-4",
            children: [
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 397,
            columnNumber: 11
        }, this);
        $[61] = t14;
        $[62] = t16;
        $[63] = t17;
    } else {
        t17 = $[63];
    }
    let t18;
    if ($[64] !== activeView || $[65] !== axisStyle || $[66] !== latestDonut || $[67] !== tooltipStyle || $[68] !== trendData) {
        t18 = activeView === "trend" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: trendData,
                    margin: {
                        top: 4,
                        right: 10,
                        left: 0,
                        bottom: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--border)",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 411,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "quarter",
                            axisLine: false,
                            tickLine: false,
                            tick: axisStyle,
                            minTickGap: 40
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 411,
                            columnNumber: 105
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            axisLine: false,
                            tickLine: false,
                            tick: axisStyle,
                            tickFormatter: _OwnershipSectionYAxisTickFormatter,
                            width: 40,
                            domain: [
                                0,
                                100
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 411,
                            columnNumber: 199
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: tooltipStyle,
                            formatter: _OwnershipSectionTooltipFormatter
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 411,
                            columnNumber: 340
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                            iconType: "circle",
                            wrapperStyle: {
                                fontSize: "11px",
                                paddingTop: "12px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 411,
                            columnNumber: 425
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                            type: "monotone",
                            dataKey: "Promoter",
                            stackId: "1",
                            stroke: SH_COLORS.Promoter,
                            fill: SH_COLORS.Promoter,
                            fillOpacity: 0.7
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 16
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                            type: "monotone",
                            dataKey: "FII",
                            stackId: "1",
                            stroke: SH_COLORS.FII,
                            fill: SH_COLORS.FII,
                            fillOpacity: 0.7
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 143
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                            type: "monotone",
                            dataKey: "DII",
                            stackId: "1",
                            stroke: SH_COLORS.DII,
                            fill: SH_COLORS.DII,
                            fillOpacity: 0.7
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 255
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                            type: "monotone",
                            dataKey: "MF",
                            stackId: "1",
                            stroke: SH_COLORS.MF,
                            fill: SH_COLORS.MF,
                            fillOpacity: 0.7
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 367
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                            type: "monotone",
                            dataKey: "Public",
                            stackId: "1",
                            stroke: SH_COLORS.Public,
                            fill: SH_COLORS.Public,
                            fillOpacity: 0.7
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 476
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 406,
                    columnNumber: 106
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 406,
                columnNumber: 58
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 406,
            columnNumber: 36
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-64 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-48 h-48 flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: "100%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                    data: latestDonut,
                                    cx: "50%",
                                    cy: "50%",
                                    innerRadius: 52,
                                    outerRadius: 76,
                                    paddingAngle: 2,
                                    dataKey: "value",
                                    children: latestDonut.map(_OwnershipSectionLatestDonutMap)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 414,
                                    columnNumber: 779
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: tooltipStyle,
                                    formatter: _OwnershipSectionTooltipFormatter2
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 414,
                                    columnNumber: 944
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 414,
                            columnNumber: 769
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 414,
                        columnNumber: 721
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 414,
                    columnNumber: 680
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex-1 space-y-2 pl-4",
                    children: latestDonut.map(_OwnershipSectionLatestDonutMap2)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 414,
                    columnNumber: 1069
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 414,
            columnNumber: 640
        }, this);
        $[64] = activeView;
        $[65] = axisStyle;
        $[66] = latestDonut;
        $[67] = tooltipStyle;
        $[68] = trendData;
        $[69] = t18;
    } else {
        t18 = $[69];
    }
    let t19;
    if ($[70] !== t17 || $[71] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:col-span-2 p-6 rounded-xl border",
            style: t12,
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 426,
            columnNumber: 11
        }, this);
        $[70] = t17;
        $[71] = t18;
        $[72] = t19;
    } else {
        t19 = $[72];
    }
    let t20;
    if ($[73] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[73] = t20;
    } else {
        t20 = $[73];
    }
    let t21;
    if ($[74] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = {
            color: "var(--text-primary)"
        };
        $[74] = t21;
    } else {
        t21 = $[74];
    }
    let t22;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-semibold mb-3 flex items-center gap-2",
            style: t21,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    size: 14,
                    style: {
                        color: "var(--accent-brand)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 454,
                    columnNumber: 90
                }, this),
                "QoQ Change"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 454,
            columnNumber: 11
        }, this);
        $[75] = t22;
    } else {
        t22 = $[75];
    }
    const t23 = latestSh?.promoterPct;
    let t24;
    if ($[76] !== diiQoQ || $[77] !== fiiQoQ || $[78] !== latestSh?.diiPct || $[79] !== latestSh?.fiiPct || $[80] !== latestSh?.publicPct || $[81] !== promoterQoQ || $[82] !== shareholding[0] || $[83] !== shareholding[1] || $[84] !== shareholding.length || $[85] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-5 rounded-xl border",
            style: t20,
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        {
                            label: "Promoter",
                            val: promoterQoQ,
                            current: t23
                        },
                        {
                            label: "FII",
                            val: fiiQoQ,
                            current: latestSh?.fiiPct
                        },
                        {
                            label: "DII",
                            val: diiQoQ,
                            current: latestSh?.diiPct
                        },
                        {
                            label: "Public",
                            val: shareholding.length >= 2 ? (shareholding[0].publicPct ?? 0) - (shareholding[1].publicPct ?? 0) : null,
                            current: latestSh?.publicPct
                        }
                    ].map(_OwnershipSectionAnonymous5)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 464,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 464,
            columnNumber: 11
        }, this);
        $[76] = diiQoQ;
        $[77] = fiiQoQ;
        $[78] = latestSh?.diiPct;
        $[79] = latestSh?.fiiPct;
        $[80] = latestSh?.publicPct;
        $[81] = promoterQoQ;
        $[82] = shareholding[0];
        $[83] = shareholding[1];
        $[84] = shareholding.length;
        $[85] = t23;
        $[86] = t24;
    } else {
        t24 = $[86];
    }
    let t25;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[87] = t25;
    } else {
        t25 = $[87];
    }
    let t26;
    if ($[88] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = {
            color: "var(--text-primary)"
        };
        $[88] = t26;
    } else {
        t26 = $[88];
    }
    const t27 = pledgePct > 20 ? "#EF4444" : "var(--accent-brand)";
    let t28;
    if ($[89] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-semibold mb-3 flex items-center gap-2",
            style: t26,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                    size: 14,
                    style: {
                        color: t27
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 517,
                    columnNumber: 90
                }, this),
                "Pledge Tracker"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 517,
            columnNumber: 11
        }, this);
        $[89] = t27;
        $[90] = t28;
    } else {
        t28 = $[90];
    }
    let t29;
    if ($[91] !== meta || $[92] !== pledgeHistory || $[93] !== pledgePct || $[94] !== tooltipStyle) {
        t29 = pledgeHistory.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-32",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: pledgeHistory,
                    margin: {
                        top: 4,
                        right: 0,
                        left: -20,
                        bottom: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "quarter",
                            axisLine: false,
                            tickLine: false,
                            tick: {
                                fontSize: 9,
                                fill: "var(--text-muted)"
                            },
                            minTickGap: 30
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 532,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            axisLine: false,
                            tickLine: false,
                            tick: {
                                fontSize: 9,
                                fill: "var(--text-muted)"
                            },
                            tickFormatter: _OwnershipSectionYAxisTickFormatter2
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 535,
                            columnNumber: 32
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: tooltipStyle,
                            formatter: _OwnershipSectionTooltipFormatter3
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 538,
                            columnNumber: 69
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: "Pledge %",
                            fill: pledgePct > 20 ? "#EF4444" : "#F59E0B",
                            radius: [
                                2,
                                2,
                                0,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 538,
                            columnNumber: 155
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 527,
                    columnNumber: 108
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 527,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 527,
            columnNumber: 38
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
            meta: meta,
            title: "Pledge history unavailable",
            message: "Promoter pledge trend is hidden until the underlying shareholding dataset provides a usable history."
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 538,
            columnNumber: 291
        }, this);
        $[91] = meta;
        $[92] = pledgeHistory;
        $[93] = pledgePct;
        $[94] = tooltipStyle;
        $[95] = t29;
    } else {
        t29 = $[95];
    }
    let t30;
    if ($[96] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            style: {
                color: "var(--text-muted)"
            },
            children: "Current Pledge: "
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 549,
            columnNumber: 11
        }, this);
        $[96] = t30;
    } else {
        t30 = $[96];
    }
    const t31 = `text-sm font-bold font-mono metric-mono ${pledgePct > 20 ? "text-red-500" : pledgePct > 5 ? "text-yellow-600" : "text-green-500"}`;
    let t32;
    if ($[97] !== pledgePct) {
        t32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(pledgePct, 2);
        $[97] = pledgePct;
        $[98] = t32;
    } else {
        t32 = $[98];
    }
    let t33;
    if ($[99] !== t31 || $[100] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 text-center",
            children: [
                t30,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t31,
                    children: t32
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 567,
                    columnNumber: 50
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 567,
            columnNumber: 11
        }, this);
        $[99] = t31;
        $[100] = t32;
        $[101] = t33;
    } else {
        t33 = $[101];
    }
    let t34;
    if ($[102] !== t28 || $[103] !== t29 || $[104] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-5 rounded-xl border",
            style: t25,
            children: [
                t28,
                t29,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 576,
            columnNumber: 11
        }, this);
        $[102] = t28;
        $[103] = t29;
        $[104] = t33;
        $[105] = t34;
    } else {
        t34 = $[105];
    }
    let t35;
    if ($[106] !== governance) {
        t35 = governance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-5 rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-semibold mb-3 flex items-center gap-2",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                            size: 14,
                            style: {
                                color: "var(--accent-brand)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 591,
                            columnNumber: 10
                        }, this),
                        "Governance"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 589,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 text-xs",
                    children: [
                        [
                            {
                                label: "Independent Directors",
                                val: governance.independentDirectorsPct,
                                suffix: "%"
                            },
                            {
                                label: "Board Size",
                                val: governance.boardSize,
                                suffix: ""
                            },
                            {
                                label: "CEO Tenure",
                                val: governance.ceoTenureYears,
                                suffix: " yrs"
                            },
                            {
                                label: "Audit Opinion",
                                val: null,
                                text: governance.auditOpinion ?? "-"
                            }
                        ].map(_OwnershipSectionAnonymous6),
                        governance.relatedPartyTxnFlag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 mt-2 text-yellow-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 11
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 609,
                                    columnNumber: 142
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Related party transactions flagged"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 609,
                                    columnNumber: 169
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 609,
                            columnNumber: 80
                        }, this),
                        governance.overallScore !== null && governance.overallScore !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 pt-2 border-t flex justify-between items-center",
                            style: {
                                borderColor: "var(--border)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: "Overall Score"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 611,
                                    columnNumber: 12
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold font-mono",
                                    style: {
                                        color: (governance.overallScore ?? 0) >= 60 ? "#10B981" : "#F59E0B"
                                    },
                                    children: [
                                        governance.overallScore?.toFixed(0),
                                        "/100"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 613,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                            lineNumber: 609,
                            columnNumber: 301
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 593,
                    columnNumber: 29
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 586,
            columnNumber: 25
        }, this);
        $[106] = governance;
        $[107] = t35;
    } else {
        t35 = $[107];
    }
    let t36;
    if ($[108] !== t24 || $[109] !== t34 || $[110] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t24,
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 623,
            columnNumber: 11
        }, this);
        $[108] = t24;
        $[109] = t34;
        $[110] = t35;
        $[111] = t36;
    } else {
        t36 = $[111];
    }
    let t37;
    if ($[112] !== t19 || $[113] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
            children: [
                t19,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 633,
            columnNumber: 11
        }, this);
        $[112] = t19;
        $[113] = t36;
        $[114] = t37;
    } else {
        t37 = $[114];
    }
    let t38;
    if ($[115] !== t11 || $[116] !== t37 || $[117] !== t7 || $[118] !== t8 || $[119] !== t9) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: t7,
            className: t8,
            children: [
                t9,
                t11,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 642,
            columnNumber: 11
        }, this);
        $[115] = t11;
        $[116] = t37;
        $[117] = t7;
        $[118] = t8;
        $[119] = t9;
        $[120] = t38;
    } else {
        t38 = $[120];
    }
    return t38;
}
_s(OwnershipSection, "K5+Vy/fdrbJ7fSgsJ/0qaGGPdFQ=");
_c = OwnershipSection;
function _OwnershipSectionAnonymous6(item_2) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "var(--text-muted)"
                },
                children: item_2.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 655,
                columnNumber: 67
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium font-mono metric-mono",
                style: {
                    color: "var(--text-primary)"
                },
                children: item_2.text ?? (item_2.val !== null && item_2.val !== undefined ? `${item_2.val}${item_2.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"])
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 657,
                columnNumber: 29
            }, this)
        ]
    }, item_2.label, true, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 655,
        columnNumber: 10
    }, this);
}
function _OwnershipSectionTooltipFormatter3(v_4) {
    return [
        `${v_4.toFixed(2)}%`
    ];
}
function _OwnershipSectionYAxisTickFormatter2(v_3) {
    return `${v_3}%`;
}
function _OwnershipSectionAnonymous5(item_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "var(--text-secondary)"
                },
                children: item_1.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 668,
                columnNumber: 88
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono font-medium metric-mono",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: item_1.current != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(item_1.current, 2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 670,
                        columnNumber: 70
                    }, this),
                    item_1.val !== null && item_1.val !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-mono font-semibold metric-mono ${item_1.val > 0 ? "text-green-500" : item_1.val < 0 ? "text-red-500" : "text-muted-foreground"}`,
                        children: [
                            item_1.val > 0 ? "\u25B2" : item_1.val < 0 ? "\u25BC" : "\u2022",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSignedChange"])(item_1.val, 2, "")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 672,
                        columnNumber: 150
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 670,
                columnNumber: 29
            }, this)
        ]
    }, item_1.label, true, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 668,
        columnNumber: 10
    }, this);
}
function _OwnershipSectionLatestDonutMap2(d_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex items-center justify-between text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-2.5 h-2.5 rounded-sm",
                        style: {
                            background: d_1.color
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 675,
                        columnNumber: 124
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: d_1.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 677,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 675,
                columnNumber: 83
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono font-medium",
                style: {
                    color: "var(--text-primary)"
                },
                children: [
                    d_1.value.toFixed(2),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 679,
                columnNumber: 33
            }, this)
        ]
    }, d_1.name, true, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 675,
        columnNumber: 10
    }, this);
}
function _OwnershipSectionTooltipFormatter2(v_2) {
    return [
        `${v_2.toFixed(2)}%`
    ];
}
function _OwnershipSectionLatestDonutMap(d_0, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: d_0.color
    }, i, false, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 687,
        columnNumber: 10
    }, this);
}
function _OwnershipSectionTooltipFormatter(v_1) {
    return [
        `${v_1.toFixed(2)}%`
    ];
}
function _OwnershipSectionYAxisTickFormatter(v_0) {
    return `${v_0}%`;
}
function _OwnershipSectionSignificantChangesMap(item_0, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: item_0.color
                },
                children: item_0.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 696,
                columnNumber: 69
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: item_0.change > 0 ? "text-green-500" : "text-red-500",
                children: [
                    item_0.change > 0 ? "+" : "",
                    item_0.change.toFixed(2),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 698,
                columnNumber: 29
            }, this)
        ]
    }, idx, true, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 696,
        columnNumber: 10
    }, this);
}
function _OwnershipSectionAnonymous4(item) {
    return item.change !== null && Math.abs(item.change) >= 1;
}
function _OwnershipSectionAnonymous3(s_1) {
    return {
        quarter: (s_1.quarterEnd ?? s_1.quarter ?? "").slice(0, 7),
        "Promoter %": s_1.promoterPct ?? 0,
        "Pledge %": s_1.promoterPledgePct ?? 0
    };
}
function _OwnershipSectionAnonymous2(d) {
    return d.value > 0;
}
function _OwnershipSectionAnonymous(s) {
    return {
        quarter: (s.quarterEnd ?? s.quarter ?? "").slice(0, 7),
        Promoter: s.promoterPct ?? 0,
        FII: s.fiiPct ?? 0,
        DII: s.diiPct ?? 0,
        MF: s.mfPct ?? 0,
        Public: s.publicPct ?? 0
    };
}
function _OwnershipSectionUseEffectAnonymous(r) {
    return r.json();
}
var _c;
__turbopack_context__.k.register(_c, "OwnershipSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/DocumentsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentsSection",
    ()=>DocumentsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DOC_TABS = [
    {
        key: "announcements",
        label: "Corporate Announcements",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"]
    },
    {
        key: "reports",
        label: "Annual Reports",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        key: "concalls",
        label: "Concalls & Transcripts",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"]
    },
    {
        key: "ratings",
        label: "Credit Ratings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"]
    },
    {
        key: "presentations",
        label: "Investor Presentations",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    }
];
const DOC_ICONS = {
    ANNUAL_REPORT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
        size: 16,
        className: "text-blue-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 32,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    CONCALL_TRANSCRIPT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        size: 16,
        className: "text-purple-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 33,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0)),
    CONCALL_AUDIO: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        size: 16,
        className: "text-purple-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 34,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    EXCHANGE_ANNOUNCEMENT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
        size: 16,
        className: "text-amber-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 35,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0)),
    INVESTOR_PRESENTATION: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
        size: 16,
        className: "text-green-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 36,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0)),
    CREDIT_RATING: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
        size: 16,
        className: "text-red-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 37,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0))
};
const SENTIMENT_COLOR = (v)=>{
    if (v == null) return "var(--text-muted)";
    if (v >= 0.3) return "#10B981";
    if (v <= -0.3) return "#EF4444";
    return "#F59E0B";
};
_c = SENTIMENT_COLOR;
const SENTIMENT_LABEL = (v)=>{
    if (v == null) return null;
    if (v >= 0.3) return "Positive";
    if (v <= -0.3) return "Negative";
    return "Neutral";
};
_c1 = SENTIMENT_LABEL;
function DocCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(52);
    if ($[0] !== "33e7c261c4444116b090554a0e1f78993fa201584f7de3a1167cf049ce8e23b4") {
        for(let $i = 0; $i < 52; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "33e7c261c4444116b090554a0e1f78993fa201584f7de3a1167cf049ce8e23b4";
    }
    const { doc } = t0;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== doc.docType) {
        t2 = DOC_ICONS[doc.docType] ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 75,
            columnNumber: 36
        }, this);
        $[2] = doc.docType;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-0.5",
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            color: "var(--text-primary)"
        };
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== doc.docType || $[8] !== doc.title) {
        t5 = doc.title ?? doc.docType.replace(/_/g, " ");
        $[7] = doc.docType;
        $[8] = doc.title;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium leading-snug",
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[10] = t5;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            color: "var(--text-muted)"
        };
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== doc.docDate) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            style: t7,
            children: doc.docDate
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[13] = doc.docDate;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== doc.fiscalYear) {
        t9 = doc.fiscalYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            style: {
                color: "var(--text-muted)"
            },
            children: [
                "FY",
                doc.fiscalYear
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 134,
            columnNumber: 28
        }, this);
        $[15] = doc.fiscalYear;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== doc.fiscalQuarter) {
        t10 = doc.fiscalQuarter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            style: {
                color: "var(--text-muted)"
            },
            children: doc.fiscalQuarter
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 144,
            columnNumber: 32
        }, this);
        $[17] = doc.fiscalQuarter;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== doc.aiSentiment) {
        t11 = doc.aiSentiment != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-medium px-1.5 py-0.5 rounded-full",
            style: {
                color: SENTIMENT_COLOR(doc.aiSentiment ?? null),
                background: `${SENTIMENT_COLOR(doc.aiSentiment ?? null)}18`,
                border: `1px solid ${SENTIMENT_COLOR(doc.aiSentiment ?? null)}40`
            },
            children: SENTIMENT_LABEL(doc.aiSentiment ?? null)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 154,
            columnNumber: 38
        }, this);
        $[19] = doc.aiSentiment;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== t10 || $[22] !== t11 || $[23] !== t8 || $[24] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 mt-0.5",
            children: [
                t8,
                t9,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t11;
        $[23] = t8;
        $[24] = t9;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] !== t12 || $[27] !== t6) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t6,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[26] = t12;
        $[27] = t6;
        $[28] = t13;
    } else {
        t13 = $[28];
    }
    let t14;
    if ($[29] !== doc.fileUrl) {
        t14 = doc.fileUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: doc.fileUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "p-1.5 rounded hover:bg-[var(--surface)] transition-colors",
            title: "Open",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                size: 13,
                style: {
                    color: "var(--text-muted)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 186,
                columnNumber: 173
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 186,
            columnNumber: 26
        }, this);
        $[29] = doc.fileUrl;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== doc.filePath) {
        t15 = doc.filePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: doc.filePath,
            download: true,
            className: "p-1.5 rounded hover:bg-[var(--surface)] transition-colors",
            title: "Download",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                size: 13,
                style: {
                    color: "var(--text-muted)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 196,
                columnNumber: 153
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 196,
            columnNumber: 27
        }, this);
        $[31] = doc.filePath;
        $[32] = t15;
    } else {
        t15 = $[32];
    }
    let t16;
    if ($[33] !== t14 || $[34] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 flex-shrink-0",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 206,
            columnNumber: 11
        }, this);
        $[33] = t14;
        $[34] = t15;
        $[35] = t16;
    } else {
        t16 = $[35];
    }
    let t17;
    if ($[36] !== t13 || $[37] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-2",
            children: [
                t13,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[36] = t13;
        $[37] = t16;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== doc.aiSummary || $[40] !== expanded) {
        t18 = doc.aiSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "DocCard[<button>.onClick]": ()=>setExpanded(_DocCardButtonOnClickSetExpanded)
                    }["DocCard[<button>.onClick]"],
                    className: "flex items-center gap-1 text-xs font-medium",
                    style: {
                        color: "var(--accent-brand)"
                    },
                    children: [
                        expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 228,
                            columnNumber: 22
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 228,
                            columnNumber: 48
                        }, this),
                        "AI Summary"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 224,
                    columnNumber: 50
                }, this),
                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1.5 text-xs leading-relaxed",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: doc.aiSummary
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 228,
                    columnNumber: 106
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 224,
            columnNumber: 28
        }, this);
        $[39] = doc.aiSummary;
        $[40] = expanded;
        $[41] = t18;
    } else {
        t18 = $[41];
    }
    let t19;
    if ($[42] !== doc.aiKeyPoints || $[43] !== expanded) {
        t19 = (doc.aiKeyPoints?.length ?? 0) > 0 && expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-2 space-y-1",
            children: (doc.aiKeyPoints ?? []).map(_DocCardAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 239,
            columnNumber: 61
        }, this);
        $[42] = doc.aiKeyPoints;
        $[43] = expanded;
        $[44] = t19;
    } else {
        t19 = $[44];
    }
    let t20;
    if ($[45] !== t17 || $[46] !== t18 || $[47] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-w-0",
            children: [
                t17,
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[45] = t17;
        $[46] = t18;
        $[47] = t19;
        $[48] = t20;
    } else {
        t20 = $[48];
    }
    let t21;
    if ($[49] !== t20 || $[50] !== t3) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-lg border transition-colors",
            style: t1,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    t3,
                    t20
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 258,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 258,
            columnNumber: 11
        }, this);
        $[49] = t20;
        $[50] = t3;
        $[51] = t21;
    } else {
        t21 = $[51];
    }
    return t21;
}
_s(DocCard, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c2 = DocCard;
function _DocCardAnonymous(pt, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex items-start gap-1.5 text-xs",
        style: {
            color: "var(--text-secondary)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1.5 w-1 h-1 rounded-full flex-shrink-0",
                style: {
                    background: "var(--accent-brand)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 270,
                columnNumber: 6
            }, this),
            pt
        ]
    }, i, true, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 268,
        columnNumber: 10
    }, this);
}
function _DocCardButtonOnClickSetExpanded(v) {
    return !v;
}
function DocumentsSection(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(31);
    if ($[0] !== "33e7c261c4444116b090554a0e1f78993fa201584f7de3a1167cf049ce8e23b4") {
        for(let $i = 0; $i < 31; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "33e7c261c4444116b090554a0e1f78993fa201584f7de3a1167cf049ce8e23b4";
    }
    const { symbol } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [documents, setDocuments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [loadedKey, setLoadedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("announcements");
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const requestKey = `${symbol}-${activeTab}`;
    let t2;
    let t3;
    if ($[2] !== activeTab || $[3] !== requestKey || $[4] !== symbol) {
        t2 = ({
            "DocumentsSection[useEffect()]": ()=>{
                fetch(`/api/stocks/${symbol}/documents?category=${activeTab}`).then(_DocumentsSectionUseEffectAnonymous).then({
                    "DocumentsSection[useEffect() > (anonymous)()]": (d)=>{
                        setDocuments(d.documents ?? []);
                        setMeta(d.meta ?? null);
                        setLoadedKey(requestKey);
                    }
                }["DocumentsSection[useEffect() > (anonymous)()]"]).catch({
                    "DocumentsSection[useEffect() > (anonymous)()]": ()=>{
                        setDocuments([]);
                        setMeta(null);
                        setLoadedKey(requestKey);
                    }
                }["DocumentsSection[useEffect() > (anonymous)()]"]);
            }
        })["DocumentsSection[useEffect()]"];
        t3 = [
            symbol,
            activeTab,
            requestKey
        ];
        $[2] = activeTab;
        $[3] = requestKey;
        $[4] = symbol;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[7] !== documents || $[8] !== meta) {
        t4 = meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDataMeta"])({
            asOfCandidates: [
                documents[0]?.docDate
            ],
            coverage: documents.length > 0 ? 1 : 0,
            status: documents.length > 0 ? "partial" : "unavailable"
        });
        $[7] = documents;
        $[8] = meta;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const effectiveMeta = t4;
    const loading = loadedKey !== requestKey;
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            borderColor: "var(--border)"
        };
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
            size: 20,
            style: {
                color: "var(--accent-brand)"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 370,
            columnNumber: 10
        }, this);
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "Documents & Filings"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 379,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 379,
            columnNumber: 10
        }, this);
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm mt-1",
            style: {
                color: "var(--text-muted)"
            },
            children: "Corporate announcements, annual reports, concalls, and credit ratings"
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 388,
            columnNumber: 10
        }, this);
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== effectiveMeta) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 border-b",
            style: t6,
            children: [
                t8,
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                        meta: effectiveMeta
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 397,
                        columnNumber: 82
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 397,
                    columnNumber: 60
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 397,
            columnNumber: 11
        }, this);
        $[15] = effectiveMeta;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            borderColor: "var(--border)"
        };
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== activeTab) {
        t12 = DOC_TABS.map({
            "DocumentsSection[DOC_TABS.map()]": (t13)=>{
                const { key, label, icon: Icon } = t13;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "DocumentsSection[DOC_TABS.map() > <button>.onClick]": ()=>setActiveTab(key)
                    }["DocumentsSection[DOC_TABS.map() > <button>.onClick]"],
                    "aria-pressed": activeTab === key,
                    className: `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === key ? "" : "hover:bg-[var(--surface-elevated)]"}`,
                    style: {
                        borderColor: activeTab === key ? "var(--accent-brand)" : "transparent",
                        color: activeTab === key ? "var(--accent-brand)" : "var(--text-muted)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 426,
                            columnNumber: 12
                        }, this),
                        label
                    ]
                }, key, true, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 421,
                    columnNumber: 16
                }, this);
            }
        }["DocumentsSection[DOC_TABS.map()]"]);
        $[18] = activeTab;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b",
            style: t11,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-0 overflow-x-auto px-6",
                children: t12
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 436,
                columnNumber: 49
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 436,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== activeTab || $[23] !== documents || $[24] !== effectiveMeta || $[25] !== loading) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-48",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 444,
                    columnNumber: 98
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 444,
                columnNumber: 43
            }, this) : documents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                meta: effectiveMeta,
                title: `No ${DOC_TABS.find({
                    "DocumentsSection[DOC_TABS.find()]": (tab)=>tab.key === activeTab
                }["DocumentsSection[DOC_TABS.find()]"])?.label.toLowerCase()} yet`,
                message: activeTab === "announcements" ? "Corporate announcements have not been fetched for this company view yet." : activeTab === "reports" ? "Annual report coverage is missing or the latest filings have not been ingested." : activeTab === "concalls" ? "Concalls and transcripts are not connected for this issuer yet." : activeTab === "ratings" ? "Credit ratings are not available from the current document pipeline." : "Investor presentations are not available from the current pipeline."
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 444,
                columnNumber: 244
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: documents.map(_DocumentsSectionDocumentsMap)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 446,
                columnNumber: 573
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 444,
            columnNumber: 11
        }, this);
        $[22] = activeTab;
        $[23] = documents;
        $[24] = effectiveMeta;
        $[25] = loading;
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] !== t10 || $[28] !== t13 || $[29] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "documents",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border",
                style: t5,
                children: [
                    t10,
                    t13,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                lineNumber: 457,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[27] = t10;
        $[28] = t13;
        $[29] = t14;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    return t15;
}
_s1(DocumentsSection, "dxSM+Ecj6xcxQNrGi+7OAVCf4NU=");
_c3 = DocumentsSection;
function _DocumentsSectionDocumentsMap(doc) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocCard, {
        doc: doc
    }, doc.id, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 468,
        columnNumber: 10
    }, this);
}
function _DocumentsSectionUseEffectAnonymous(r) {
    return r.json();
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SENTIMENT_COLOR");
__turbopack_context__.k.register(_c1, "SENTIMENT_LABEL");
__turbopack_context__.k.register(_c2, "DocCard");
__turbopack_context__.k.register(_c3, "DocumentsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/AnalyticsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsSection",
    ()=>AnalyticsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
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
function AnalyticsSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(86);
    if ($[0] !== "fd401f84d259ec2aa695a3899a0093eb17b96eb762af1262224ddce7f3f4df4a") {
        for(let $i = 0; $i < 86; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fd401f84d259ec2aa695a3899a0093eb17b96eb762af1262224ddce7f3f4df4a";
    }
    const { symbol } = t0;
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMetric, setActiveMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("peTtm");
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            peTtm: "P/E (TTM)",
            pb: "P/B",
            evEbitda: "EV/EBITDA",
            roce: "ROCE %",
            roe: "ROE %"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const METRIC_LABELS = t1;
    let t2;
    let t3;
    if ($[2] !== symbol) {
        t2 = ({
            "AnalyticsSection[useEffect()]": ()=>{
                fetch(`/api/stocks/${symbol}/analytics`).then(_AnalyticsSectionUseEffectAnonymous).then({
                    "AnalyticsSection[useEffect() > (anonymous)()]": (payload)=>{
                        setData(payload);
                        setLoadedSymbol(symbol);
                    }
                }["AnalyticsSection[useEffect() > (anonymous)()]"]);
            }
        })["AnalyticsSection[useEffect()]"];
        t3 = [
            symbol
        ];
        $[2] = symbol;
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    const loading = loadedSymbol !== symbol;
    let t4;
    bb0: {
        if (!data?.ratioHistory) {
            let t5;
            if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
                t5 = [];
                $[5] = t5;
            } else {
                t5 = $[5];
            }
            t4 = t5;
            break bb0;
        }
        let t5;
        if ($[6] !== activeMetric || $[7] !== data.ratioHistory) {
            let t6;
            if ($[9] !== activeMetric) {
                t6 = ({
                    "AnalyticsSection[(anonymous)()]": (r_0)=>({
                            date: r_0.computedDate?.slice(0, 7) ?? "",
                            value: r_0[activeMetric] ?? null
                        })
                })["AnalyticsSection[(anonymous)()]"];
                $[9] = activeMetric;
                $[10] = t6;
            } else {
                t6 = $[10];
            }
            t5 = [
                ...data.ratioHistory
            ].reverse().map(t6).filter(_AnalyticsSectionAnonymous);
            $[6] = activeMetric;
            $[7] = data.ratioHistory;
            $[8] = t5;
        } else {
            t5 = $[8];
        }
        t4 = t5;
    }
    const historicalChart = t4;
    const currentVal = data?.ratios?.[activeMetric] ?? null;
    let factorDrawdowns;
    let factorSnapshots;
    let t5;
    if ($[11] !== data?.earningsQuality || $[12] !== data?.factorContext?.drawdowns || $[13] !== data?.factorContext?.latestSnapshots || $[14] !== data?.factorExposure || $[15] !== data?.meta || $[16] !== data?.ratioHistory?.[0]?.computedDate || $[17] !== data?.ratios) {
        factorSnapshots = data?.factorContext?.latestSnapshots ?? [];
        let t6;
        if ($[21] !== data?.factorContext?.drawdowns) {
            t6 = data?.factorContext?.drawdowns ?? [];
            $[21] = data?.factorContext?.drawdowns;
            $[22] = t6;
        } else {
            t6 = $[22];
        }
        factorDrawdowns = t6;
        t5 = data?.meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDataMeta"])({
            asOfCandidates: [
                data?.ratioHistory?.[0]?.computedDate,
                data?.factorContext?.latestSnapshots?.[0]?.asOf,
                data?.factorExposure?.regressionEndDate
            ],
            coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoverage"])([
                data?.factorExposure,
                factorSnapshots.length ? factorSnapshots : null,
                data?.earningsQuality,
                data?.ratios
            ]),
            note: "Ratios are derived from adjusted market history."
        });
        $[11] = data?.earningsQuality;
        $[12] = data?.factorContext?.drawdowns;
        $[13] = data?.factorContext?.latestSnapshots;
        $[14] = data?.factorExposure;
        $[15] = data?.meta;
        $[16] = data?.ratioHistory?.[0]?.computedDate;
        $[17] = data?.ratios;
        $[18] = factorDrawdowns;
        $[19] = factorSnapshots;
        $[20] = t5;
    } else {
        factorDrawdowns = $[18];
        factorSnapshots = $[19];
        t5 = $[20];
    }
    const meta = t5;
    let t6;
    if ($[23] !== historicalChart) {
        bb1: {
            const vals = historicalChart.map(_AnalyticsSectionHistoricalChartMap).filter(Boolean);
            if (vals.length === 0) {
                let t7;
                if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
                    t7 = {
                        mean: null,
                        stddev: null
                    };
                    $[25] = t7;
                } else {
                    t7 = $[25];
                }
                t6 = t7;
                break bb1;
            }
            const m = vals.reduce(_AnalyticsSectionValsReduce, 0) / vals.length;
            let t7;
            if ($[26] !== m) {
                t7 = ({
                    "AnalyticsSection[vals.reduce()]": (a_0, b_0)=>a_0 + (b_0 - m) ** 2
                })["AnalyticsSection[vals.reduce()]"];
                $[26] = m;
                $[27] = t7;
            } else {
                t7 = $[27];
            }
            const variance = vals.reduce(t7, 0) / vals.length;
            let t8;
            if ($[28] !== variance) {
                t8 = Math.sqrt(variance);
                $[28] = variance;
                $[29] = t8;
            } else {
                t8 = $[29];
            }
            let t9;
            if ($[30] !== m || $[31] !== t8) {
                t9 = {
                    mean: m,
                    stddev: t8
                };
                $[30] = m;
                $[31] = t8;
                $[32] = t9;
            } else {
                t9 = $[32];
            }
            t6 = t9;
        }
        $[23] = historicalChart;
        $[24] = t6;
    } else {
        t6 = $[24];
    }
    const { mean, stddev } = t6;
    let t7;
    bb2: {
        if (!data?.factorExposure) {
            let t8;
            if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
                t8 = [];
                $[33] = t8;
            } else {
                t8 = $[33];
            }
            t7 = t8;
            break bb2;
        }
        const fe = data.factorExposure;
        const t8 = Math.abs(fe.marketBeta ?? 0) * 50;
        let t9;
        if ($[34] !== t8) {
            t9 = {
                metric: "Market \u03B2",
                value: t8
            };
            $[34] = t8;
            $[35] = t9;
        } else {
            t9 = $[35];
        }
        const t10 = ((fe.smbLoading ?? 0) + 2) * 25;
        let t11;
        if ($[36] !== t10) {
            t11 = {
                metric: "Size (SMB)",
                value: t10
            };
            $[36] = t10;
            $[37] = t11;
        } else {
            t11 = $[37];
        }
        const t12 = ((fe.hmlLoading ?? 0) + 2) * 25;
        let t13;
        if ($[38] !== t12) {
            t13 = {
                metric: "Value (HML)",
                value: t12
            };
            $[38] = t12;
            $[39] = t13;
        } else {
            t13 = $[39];
        }
        const t14 = ((fe.wmlLoading ?? 0) + 2) * 25;
        let t15;
        if ($[40] !== t14) {
            t15 = {
                metric: "Momentum",
                value: t14
            };
            $[40] = t14;
            $[41] = t15;
        } else {
            t15 = $[41];
        }
        const t16 = ((fe.alpha ?? 0) + 5) * 10;
        let t17;
        if ($[42] !== t16) {
            t17 = {
                metric: "Alpha",
                value: t16
            };
            $[42] = t16;
            $[43] = t17;
        } else {
            t17 = $[43];
        }
        let t18;
        if ($[44] !== t11 || $[45] !== t13 || $[46] !== t15 || $[47] !== t17 || $[48] !== t9) {
            t18 = [
                t9,
                t11,
                t13,
                t15,
                t17
            ];
            $[44] = t11;
            $[45] = t13;
            $[46] = t15;
            $[47] = t17;
            $[48] = t9;
            $[49] = t18;
        } else {
            t18 = $[49];
        }
        t7 = t18;
    }
    const factorRadar = t7;
    let t8;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            backgroundColor: "var(--surface-elevated)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            fontSize: "12px"
        };
        $[50] = t8;
    } else {
        t8 = $[50];
    }
    const tooltipStyle = t8;
    let t9;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            fontSize: 11,
            fill: "var(--text-muted)"
        };
        $[51] = t9;
    } else {
        t9 = $[51];
    }
    const axisStyle = t9;
    if (loading) {
        let t10;
        if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "analytics",
                className: "scroll-mt-28",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-xl border flex items-center justify-center h-64",
                    style: {
                        background: "var(--surface)",
                        borderColor: "var(--border)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 320,
                        columnNumber: 12
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 317,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 317,
                columnNumber: 13
            }, this);
            $[52] = t10;
        } else {
            t10 = $[52];
        }
        return t10;
    }
    let t10;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[53] = t10;
    } else {
        t10 = $[53];
    }
    let t11;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: "Valuation Band"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 339,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[54] = t11;
    } else {
        t11 = $[54];
    }
    let t12;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = Object.entries(METRIC_LABELS);
        $[55] = t12;
    } else {
        t12 = $[55];
    }
    let t13;
    if ($[56] !== activeMetric) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-4 flex-wrap gap-2",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-muted/20 p-0.5 rounded-lg border border-border gap-0.5",
                    children: t12.map({
                        "AnalyticsSection[(anonymous)()]": (t14)=>{
                            const [key, label] = t14;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "AnalyticsSection[(anonymous)() > <button>.onClick]": ()=>setActiveMetric(key)
                                }["AnalyticsSection[(anonymous)() > <button>.onClick]"],
                                className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeMetric === key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                children: label
                            }, key, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 358,
                                columnNumber: 20
                            }, this);
                        }
                    }["AnalyticsSection[(anonymous)()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 355,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 355,
            columnNumber: 11
        }, this);
        $[56] = activeMetric;
        $[57] = t13;
    } else {
        t13 = $[57];
    }
    let t14;
    if ($[58] !== activeMetric || $[59] !== currentVal || $[60] !== historicalChart || $[61] !== mean || $[62] !== meta || $[63] !== stddev) {
        t14 = historicalChart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
            meta: meta,
            title: "Historical valuation hidden",
            message: "A valuation band needs enough ratio history to avoid drawing a misleading mean and sigma range."
        }, void 0, false, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 370,
            columnNumber: 42
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-56",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: "100%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: historicalChart,
                            margin: {
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    vertical: false,
                                    stroke: "var(--border)",
                                    opacity: 0.4
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 375,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "date",
                                    axisLine: false,
                                    tickLine: false,
                                    tick: axisStyle,
                                    minTickGap: 50
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 375,
                                    columnNumber: 107
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    axisLine: false,
                                    tickLine: false,
                                    tick: axisStyle,
                                    width: 40,
                                    domain: [
                                        "auto",
                                        "auto"
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 375,
                                    columnNumber: 198
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: tooltipStyle,
                                    formatter: {
                                        "AnalyticsSection[<Tooltip>.formatter]": (v)=>[
                                                `${v.toFixed(2)}x`,
                                                METRIC_LABELS[activeMetric]
                                            ]
                                    }["AnalyticsSection[<Tooltip>.formatter]"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 375,
                                    columnNumber: 295
                                }, this),
                                mean !== null && stddev !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                            y: mean + stddev,
                                            stroke: "#F59E0B",
                                            strokeDasharray: "4 4",
                                            label: {
                                                value: "+1\u03C3",
                                                fontSize: 10,
                                                fill: "#F59E0B"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 377,
                                            columnNumber: 98
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                            y: mean,
                                            stroke: "var(--text-muted)",
                                            strokeDasharray: "4 4",
                                            label: {
                                                value: "Mean",
                                                fontSize: 10,
                                                fill: "var(--text-muted)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 381,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                            y: mean - stddev,
                                            stroke: "#10B981",
                                            strokeDasharray: "4 4",
                                            label: {
                                                value: "-1\u03C3",
                                                fontSize: 10,
                                                fill: "#10B981"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 385,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true),
                                currentVal !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: currentVal,
                                    stroke: "var(--accent-brand)",
                                    strokeWidth: 1.5,
                                    label: {
                                        value: "Now",
                                        fontSize: 10,
                                        fill: "var(--accent-brand)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 389,
                                    columnNumber: 48
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "value",
                                    stroke: "var(--accent-brand)",
                                    strokeWidth: 2,
                                    dot: false
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 393,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 370,
                            columnNumber: 289
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 370,
                        columnNumber: 241
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 370,
                    columnNumber: 219
                }, this),
                mean !== null && currentVal !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 grid grid-cols-3 gap-3 text-center",
                    children: [
                        {
                            label: "Current",
                            val: currentVal,
                            color: "var(--accent-brand)"
                        },
                        {
                            label: "5Y Mean",
                            val: mean,
                            color: "var(--text-muted)"
                        },
                        {
                            label: "vs Mean",
                            val: (currentVal - mean) / mean * 100,
                            color: currentVal < mean ? "#10B981" : "#EF4444",
                            suffix: "%"
                        }
                    ].map(_AnalyticsSectionAnonymous2)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 393,
                    columnNumber: 197
                }, this)
            ]
        }, void 0, true);
        $[58] = activeMetric;
        $[59] = currentVal;
        $[60] = historicalChart;
        $[61] = mean;
        $[62] = meta;
        $[63] = stddev;
        $[64] = t14;
    } else {
        t14 = $[64];
    }
    let t15;
    if ($[65] !== t13 || $[66] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border",
            style: t10,
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 419,
            columnNumber: 11
        }, this);
        $[65] = t13;
        $[66] = t14;
        $[67] = t15;
    } else {
        t15 = $[67];
    }
    let t16;
    if ($[68] !== data || $[69] !== factorRadar) {
        t16 = data?.factorExposure && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                            size: 16,
                            style: {
                                color: "var(--accent-brand)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 431,
                            columnNumber: 54
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-base font-semibold",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: "Factor Exposure"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 433,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2 py-0.5 rounded-full font-medium",
                            style: {
                                background: "var(--surface-elevated)",
                                color: "var(--text-muted)",
                                border: "1px solid var(--border)"
                            },
                            children: "Carhart 4-Factor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 435,
                            columnNumber: 32
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 431,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-52",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: "100%",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                    data: factorRadar,
                                    cx: "50%",
                                    cy: "50%",
                                    outerRadius: "70%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                            stroke: "var(--border)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 439,
                                            columnNumber: 233
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                            dataKey: "metric",
                                            tick: {
                                                fontSize: 10,
                                                fill: "var(--text-muted)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 439,
                                            columnNumber: 269
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                            name: "Factor",
                                            dataKey: "value",
                                            stroke: "var(--accent-brand)",
                                            fill: "var(--accent-brand)",
                                            fillOpacity: 0.3
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 442,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 439,
                                    columnNumber: 166
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 439,
                                columnNumber: 118
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 439,
                            columnNumber: 96
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                [
                                    {
                                        label: "Market Beta (\u03B2)",
                                        val: data.factorExposure.marketBeta,
                                        desc: "Sensitivity to market moves"
                                    },
                                    {
                                        label: "Size (SMB)",
                                        val: data.factorExposure.smbLoading,
                                        desc: "Small vs. large cap tilt"
                                    },
                                    {
                                        label: "Value (HML)",
                                        val: data.factorExposure.hmlLoading,
                                        desc: "Value vs. growth tilt"
                                    },
                                    {
                                        label: "Momentum (WML)",
                                        val: data.factorExposure.wmlLoading,
                                        desc: "Trend-following exposure"
                                    },
                                    {
                                        label: "Alpha (\u03B1)",
                                        val: data.factorExposure.alpha,
                                        desc: "Unexplained excess return"
                                    }
                                ].map(_AnalyticsSectionAnonymous3),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2 border-t text-xs flex justify-between",
                                    style: {
                                        borderColor: "var(--border)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "R² (model fit)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 464,
                                            columnNumber: 14
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono font-medium",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: data.factorExposure.rSquared != null ? (data.factorExposure.rSquared * 100).toFixed(1) + "%" : "\u2014"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 466,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 462,
                                    columnNumber: 47
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "Sample size"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 468,
                                            columnNumber: 180
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono font-medium",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: data.factorExposure.sampleSize != null ? data.factorExposure.sampleSize : "\u2014"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 470,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 468,
                                    columnNumber: 134
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "Window"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 472,
                                            columnNumber: 159
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono font-medium",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: data.factorExposure.regressionStartDate && data.factorExposure.regressionEndDate ? `${data.factorExposure.regressionStartDate} → ${data.factorExposure.regressionEndDate}` : "\u2014"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 474,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 472,
                                    columnNumber: 113
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 442,
                            columnNumber: 174
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 439,
                    columnNumber: 41
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 428,
            columnNumber: 35
        }, this);
        $[68] = data;
        $[69] = factorRadar;
        $[70] = t16;
    } else {
        t16 = $[70];
    }
    let t17;
    if ($[71] !== data || $[72] !== factorDrawdowns || $[73] !== factorSnapshots || $[74] !== meta) {
        t17 = (factorSnapshots.length > 0 || factorDrawdowns.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3 mb-4 flex-wrap",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "IIMA Factor Regime"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 488,
                                columnNumber: 85
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: data?.factorContext?.releaseTag ? `Delayed release ${data.factorContext.releaseTag}` : "Delayed survivorship-bias-adjusted release"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 490,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 488,
                        columnNumber: 80
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 488,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 xl:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: factorSnapshots.map(_AnalyticsSectionFactorSnapshotsMap)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 492,
                            columnNumber: 220
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: factorDrawdowns.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                                meta: meta,
                                title: "Drawdown statistics unavailable",
                                message: "Factor drawdown statistics are not available for the current analytics sample yet.",
                                className: "h-full min-h-48 flex items-center"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 492,
                                columnNumber: 370
                            }, this) : factorDrawdowns.map(_AnalyticsSectionFactorDrawdownsMap)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 492,
                            columnNumber: 311
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 492,
                    columnNumber: 165
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 485,
            columnNumber: 73
        }, this);
        $[71] = data;
        $[72] = factorDrawdowns;
        $[73] = factorSnapshots;
        $[74] = meta;
        $[75] = t17;
    } else {
        t17 = $[75];
    }
    let t18;
    if ($[76] !== data) {
        t18 = data?.earningsQuality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-base font-semibold mb-4 flex items-center gap-2",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 16,
                            style: {
                                color: "var(--accent-brand)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 508,
                            columnNumber: 10
                        }, this),
                        "Earnings Quality"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 506,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                    children: [
                        {
                            label: "Quality Score",
                            val: data.earningsQuality.overallScore,
                            suffix: "/100"
                        },
                        {
                            label: "CFO / PAT",
                            val: data.earningsQuality.cfoPatRatio,
                            suffix: "x"
                        },
                        {
                            label: "Accrual Ratio",
                            val: data.earningsQuality.accrualRatio,
                            suffix: "x"
                        },
                        {
                            label: "Revenue Consistency",
                            val: data.earningsQuality.revenueConsistency,
                            suffix: "/100"
                        }
                    ].map(_AnalyticsSectionAnonymous4)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 510,
                    columnNumber: 35
                }, this),
                data.earningsQuality.flags && data.earningsQuality.flags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex flex-wrap gap-2",
                    children: data.earningsQuality.flags.map(_AnalyticsSectionDataEarningsQualityFlagsMap)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 526,
                    columnNumber: 123
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 503,
            columnNumber: 36
        }, this);
        $[76] = data;
        $[77] = t18;
    } else {
        t18 = $[77];
    }
    let t19;
    if ($[78] !== data) {
        t19 = data?.ratios && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-base font-semibold mb-4 flex items-center gap-2",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 16,
                            style: {
                                color: "var(--accent-brand)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 539,
                            columnNumber: 10
                        }, this),
                        "Valuation & Profitability"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 537,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                    children: [
                        {
                            label: "P/E (TTM)",
                            val: data.ratios.peTtm,
                            suffix: "x"
                        },
                        {
                            label: "P/B",
                            val: data.ratios.pb,
                            suffix: "x"
                        },
                        {
                            label: "EV/EBITDA",
                            val: data.ratios.evEbitda,
                            suffix: "x"
                        },
                        {
                            label: "Mkt Cap (Cr)",
                            val: data.ratios.marketCapCr,
                            suffix: "",
                            isCr: true
                        },
                        {
                            label: "ROCE %",
                            val: data.ratios.roce,
                            suffix: "%"
                        },
                        {
                            label: "ROE %",
                            val: data.ratios.roe,
                            suffix: "%"
                        },
                        {
                            label: "OPM %",
                            val: data.ratios.operatingMargin,
                            suffix: "%"
                        },
                        {
                            label: "Div. Yield",
                            val: data.ratios.dividendYield,
                            suffix: "%"
                        },
                        {
                            label: "% From 52W High",
                            val: data.ratios.pctFrom52wHigh,
                            suffix: "%"
                        },
                        {
                            label: "Quality Score",
                            val: data.ratios.qualityScore,
                            suffix: "/100"
                        }
                    ].map(_AnalyticsSectionAnonymous5)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 541,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 534,
            columnNumber: 27
        }, this);
        $[78] = data;
        $[79] = t19;
    } else {
        t19 = $[79];
    }
    let t20;
    if ($[80] !== t15 || $[81] !== t16 || $[82] !== t17 || $[83] !== t18 || $[84] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "analytics",
            className: "scroll-mt-28 space-y-4",
            children: [
                t15,
                t16,
                t17,
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 590,
            columnNumber: 11
        }, this);
        $[80] = t15;
        $[81] = t16;
        $[82] = t17;
        $[83] = t18;
        $[84] = t19;
        $[85] = t20;
    } else {
        t20 = $[85];
    }
    return t20;
}
_s(AnalyticsSection, "DEFL63uPnOAs4lZaAff0Ogoj20Q=");
_c = AnalyticsSection;
function _AnalyticsSectionAnonymous5(m_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 rounded-lg",
        style: {
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs mb-1",
                style: {
                    color: "var(--text-muted)"
                },
                children: m_1.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 606,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-bold font-mono",
                style: {
                    color: "var(--text-primary)"
                },
                children: m_1.val != null ? m_1.isCr ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(m_1.val, {
                    digits: 2
                }) : m_1.suffix === "x" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(m_1.val, 2) : m_1.suffix === "%" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(m_1.val, 2) : `${m_1.val.toFixed(2)}${m_1.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 608,
                columnNumber: 25
            }, this)
        ]
    }, m_1.label, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 603,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionDataEarningsQualityFlagsMap(flag) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "px-2 py-1 rounded-full text-xs",
        style: {
            background: "var(--surface-elevated)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)"
        },
        children: flag
    }, flag, false, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 615,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionAnonymous4(metric_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 rounded-lg",
        style: {
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs mb-1",
                style: {
                    color: "var(--text-muted)"
                },
                children: metric_0.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 625,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-bold font-mono",
                style: {
                    color: "var(--text-primary)"
                },
                children: metric_0.val != null ? `${metric_0.val.toFixed(2)}${metric_0.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 627,
                columnNumber: 30
            }, this)
        ]
    }, metric_0.label, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 622,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionFactorDrawdownsMap(drawdown) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-lg border",
        style: {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: drawdown.factorCode
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 635,
                            columnNumber: 67
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: drawdown.factorName
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 637,
                            columnNumber: 39
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 635,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 635,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Ann. return"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 639,
                                columnNumber: 104
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: drawdown.annualizedReturn != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.annualizedReturn, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 641,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 639,
                        columnNumber: 99
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Ann. vol"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 643,
                                columnNumber: 132
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: drawdown.annualizedVolatility != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.annualizedVolatility, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 645,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 643,
                        columnNumber: 127
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Worst drawdown"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 647,
                                columnNumber: 140
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono font-semibold text-red-500",
                                children: drawdown.worstDrawdown != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.worstDrawdown, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 649,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 647,
                        columnNumber: 135
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Recovery window"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 649,
                                columnNumber: 200
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: drawdown.drawdownDurationYears != null ? `${drawdown.drawdownDurationYears.toFixed(1)}y` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 651,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 649,
                        columnNumber: 195
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 639,
                columnNumber: 51
            }, this)
        ]
    }, drawdown.factorCode, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 632,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionFactorSnapshotsMap(snapshot) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-lg border",
        style: {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: snapshot.frequency
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 659,
                        columnNumber: 62
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-mono",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: snapshot.asOf
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 661,
                        columnNumber: 36
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 659,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3 text-sm",
                children: [
                    {
                        label: "Market",
                        value: snapshot.marketReturn
                    },
                    {
                        label: "Mkt-RF",
                        value: snapshot.marketPremium
                    },
                    {
                        label: "SMB",
                        value: snapshot.smb
                    },
                    {
                        label: "HML",
                        value: snapshot.hml
                    },
                    {
                        label: "WML",
                        value: snapshot.wml
                    },
                    {
                        label: "RF",
                        value: snapshot.rfRate
                    }
                ].map(_AnalyticsSectionFactorSnapshotsMapAnonymous)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 663,
                columnNumber: 37
            }, this)
        ]
    }, `${snapshot.frequency}-${snapshot.asOf}`, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 656,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionFactorSnapshotsMapAnonymous(metric) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs",
                style: {
                    color: "var(--text-muted)"
                },
                children: metric.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 684,
                columnNumber: 34
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: metric.value != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(metric.value, 2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 686,
                columnNumber: 28
            }, this)
        ]
    }, metric.label, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 684,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionAnonymous3(f) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: f.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 691,
                        columnNumber: 88
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: f.desc
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 693,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 691,
                columnNumber: 83
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-mono font-bold text-sm ${f.val && f.val > 0 ? "text-green-400" : f.val && f.val < 0 ? "text-red-400" : "text-muted-foreground"}`,
                children: f.val != null ? (f.val >= 0 ? "+" : "") + f.val.toFixed(3) : "\u2014"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 695,
                columnNumber: 30
            }, this)
        ]
    }, f.label, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 691,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionAnonymous2(m_0, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-2 rounded-lg",
        style: {
            background: "var(--surface-elevated)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs mb-0.5",
                style: {
                    color: "var(--text-muted)"
                },
                children: m_0.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 700,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-bold font-mono",
                style: {
                    color: m_0.color
                },
                children: m_0.suffix ? `${m_0.val >= 0 ? "+" : ""}${m_0.val.toFixed(1)}%` : m_0.val.toFixed(1) + "x"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 702,
                columnNumber: 25
            }, this)
        ]
    }, i, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 698,
        columnNumber: 10
    }, this);
}
function _AnalyticsSectionValsReduce(a, b) {
    return a + b;
}
function _AnalyticsSectionHistoricalChartMap(d_0) {
    return d_0.value;
}
function _AnalyticsSectionAnonymous(d) {
    return d.value !== null;
}
function _AnalyticsSectionUseEffectAnonymous(r) {
    return r.json();
}
var _c;
__turbopack_context__.k.register(_c, "AnalyticsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/PeersSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeersSection",
    ()=>PeersSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
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
;
const METRICS = [
    {
        key: "peTtm",
        label: "P/E (TTM)",
        type: "ratio"
    },
    {
        key: "pb",
        label: "P/B",
        type: "ratio"
    },
    {
        key: "roce",
        label: "ROCE",
        type: "percent"
    },
    {
        key: "roe",
        label: "ROE",
        type: "percent"
    },
    {
        key: "patMargin",
        label: "PAT Margin",
        type: "percent"
    },
    {
        key: "revenueGrowth1y",
        label: "Rev. Growth 1Y",
        type: "percent"
    },
    {
        key: "debtEquity",
        label: "D/E",
        type: "ratio"
    },
    {
        key: "dividendYield",
        label: "Div. Yield",
        type: "percent"
    }
];
function formatMetricValue(value, type) {
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return type === "percent" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(value, 2) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(value, 2);
}
function corrColor(value) {
    if (value == null) return "var(--surface-elevated)";
    if (value >= 0.8) return "rgba(245, 158, 11, 0.20)";
    if (value >= 0.6) return "rgba(245, 158, 11, 0.14)";
    if (value >= 0.4) return "rgba(59, 130, 246, 0.14)";
    if (value >= 0.2) return "rgba(16, 185, 129, 0.14)";
    return "rgba(16, 185, 129, 0.20)";
}
function corrLabel(value) {
    if (value == null) return "Insufficient overlap";
    if (value >= 0.8) return "Moves very closely";
    if (value >= 0.6) return "Tracks fairly closely";
    if (value >= 0.4) return "Moderately related";
    if (value >= 0.2) return "Offers some diversification";
    return "Diversifies well";
}
function DiffBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "0e5be8ed7545da439ad73529ae943e48e85817b14e6b8173a6fa31a17c924f2a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e5be8ed7545da439ad73529ae943e48e85817b14e6b8173a6fa31a17c924f2a";
    }
    const { val, base } = t0;
    if (val == null || base == null || base === 0) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground text-xs",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 113,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    const diff = (val - base) / Math.abs(base) * 100;
    if (diff > 5) {
        let t1;
        if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                size: 11,
                className: "text-green-500"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 124,
                columnNumber: 12
            }, this);
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        return t1;
    }
    if (diff < -5) {
        let t1;
        if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                size: 11,
                className: "text-red-500"
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 134,
                columnNumber: 12
            }, this);
            $[3] = t1;
        } else {
            t1 = $[3];
        }
        return t1;
    }
    let t1;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            size: 11,
            className: "text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 143,
            columnNumber: 10
        }, this);
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = DiffBadge;
function PeersSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(129);
    if ($[0] !== "0e5be8ed7545da439ad73529ae943e48e85817b14e6b8173a6fa31a17c924f2a") {
        for(let $i = 0; $i < 129; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e5be8ed7545da439ad73529ae943e48e85817b14e6b8173a6fa31a17c924f2a";
    }
    const { symbol, currentRatios } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [peers, setPeers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [peerMeta, setPeerMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selfRatios, setSelfRatios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentRatios);
    const [chartMetric, setChartMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("peTtm");
    const [correlationPeriod, setCorrelationPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1y");
    const [correlationData, setCorrelationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showMatrix, setShowMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showIncompletePeers, setShowIncompletePeers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [correlationKey, setCorrelationKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    let t3;
    if ($[2] !== currentRatios || $[3] !== symbol) {
        t2 = ({
            "PeersSection[useEffect()]": ()=>{
                Promise.all([
                    fetch(`/api/stocks/${symbol}/peers`).then(_PeersSectionUseEffectAnonymous),
                    fetch(`/api/stocks/${symbol}/analytics`).then(_PeersSectionUseEffectAnonymous2)
                ]).then({
                    "PeersSection[useEffect() > (anonymous)()]": (t4)=>{
                        const [peersPayload, analyticsPayload] = t4;
                        setPeers(peersPayload.peers ?? []);
                        setPeerMeta(peersPayload.meta ?? null);
                        setSelfRatios({
                            ...currentRatios,
                            ...analyticsPayload?.ratios ?? {}
                        });
                        setLoadedSymbol(symbol);
                    }
                }["PeersSection[useEffect() > (anonymous)()]"]).catch({
                    "PeersSection[useEffect() > (anonymous)()]": ()=>{
                        setPeers([]);
                        setPeerMeta(null);
                        setSelfRatios(currentRatios);
                        setLoadedSymbol(symbol);
                    }
                }["PeersSection[useEffect() > (anonymous)()]"]);
            }
        })["PeersSection[useEffect()]"];
        t3 = [
            symbol,
            currentRatios
        ];
        $[2] = currentRatios;
        $[3] = symbol;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[6] !== correlationPeriod || $[7] !== symbol) {
        t4 = ({
            "PeersSection[useEffect()]": ()=>{
                const requestKey = `${symbol}-${correlationPeriod}`;
                fetch(`/api/stocks/${symbol}/peer-correlations?period=${correlationPeriod}`).then(_PeersSectionUseEffectAnonymous3).then({
                    "PeersSection[useEffect() > (anonymous)()]": (payload)=>{
                        setCorrelationData(payload);
                        setCorrelationKey(requestKey);
                    }
                }["PeersSection[useEffect() > (anonymous)()]"]).catch({
                    "PeersSection[useEffect() > (anonymous)()]": ()=>{
                        setCorrelationData(null);
                        setCorrelationKey(requestKey);
                    }
                }["PeersSection[useEffect() > (anonymous)()]"]);
            }
        })["PeersSection[useEffect()]"];
        t5 = [
            symbol,
            correlationPeriod
        ];
        $[6] = correlationPeriod;
        $[7] = symbol;
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    const loading = loadedSymbol !== symbol;
    const correlationLoading = correlationKey !== `${symbol}-${correlationPeriod}`;
    const displayRatios = selfRatios ?? currentRatios;
    let t6;
    if ($[10] !== chartMetric) {
        t6 = METRICS.find({
            "PeersSection[METRICS.find()]": (metric)=>metric.key === chartMetric
        }["PeersSection[METRICS.find()]"]) ?? METRICS[0];
        $[10] = chartMetric;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const selectedMetric = t6;
    const subjectMarketCap = displayRatios?.marketCapCr ?? null;
    let t7;
    if ($[12] !== peers || $[13] !== subjectMarketCap || $[14] !== symbol) {
        const deduped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dedupeByKey"])(peers, _PeersSectionDedupeByKey);
        let t8;
        if ($[16] !== symbol) {
            t8 = ({
                "PeersSection[deduped.filter()]": (peer_0)=>(peer_0.nseSymbol ?? peer_0.symbol ?? "").toUpperCase() !== symbol
            })["PeersSection[deduped.filter()]"];
            $[16] = symbol;
            $[17] = t8;
        } else {
            t8 = $[17];
        }
        let t9;
        if ($[18] !== subjectMarketCap) {
            t9 = ({
                "PeersSection[(anonymous)()]": (peer_1)=>{
                    const completeness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["completenessScore"])([
                        peer_1.peTtm,
                        peer_1.pb,
                        peer_1.roce,
                        peer_1.roe,
                        peer_1.patMargin,
                        peer_1.revenueGrowth1y,
                        peer_1.debtEquity,
                        peer_1.dividendYield,
                        peer_1.marketCapCr
                    ]);
                    const marketCapGap = subjectMarketCap && peer_1.marketCapCr ? Math.abs((peer_1.marketCapCr - subjectMarketCap) / subjectMarketCap * 100) : Number.POSITIVE_INFINITY;
                    return {
                        ...peer_1,
                        displaySymbol: peer_1.nseSymbol ?? peer_1.symbol,
                        completeness,
                        marketCapGap
                    };
                }
            })["PeersSection[(anonymous)()]"];
            $[18] = subjectMarketCap;
            $[19] = t9;
        } else {
            t9 = $[19];
        }
        t7 = deduped.filter(t8).map(t9).sort(_PeersSectionAnonymous);
        $[12] = peers;
        $[13] = subjectMarketCap;
        $[14] = symbol;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    const rankedPeers = t7;
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t15;
    let t16;
    let t17;
    let t18;
    let t19;
    let t20;
    let t8;
    let t9;
    if ($[20] !== chartMetric || $[21] !== correlationData || $[22] !== correlationLoading || $[23] !== correlationPeriod || $[24] !== displayRatios || $[25] !== loading || $[26] !== peerMeta || $[27] !== rankedPeers || $[28] !== selectedMetric || $[29] !== showIncompletePeers || $[30] !== showMatrix || $[31] !== symbol) {
        t20 = Symbol.for("react.early_return_sentinel");
        bb0: {
            const completePeers = rankedPeers.filter(_PeersSectionRankedPeersFilter);
            const incompletePeers = rankedPeers.filter(_PeersSectionRankedPeersFilter2);
            const visiblePeers = showIncompletePeers ? [
                ...completePeers,
                ...incompletePeers
            ] : completePeers;
            const effectiveMeta = peerMeta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDataMeta"])({
                coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoverage"])([
                    visiblePeers.length ? visiblePeers : null
                ]),
                note: "Only peers with comparable metric coverage are shown first."
            });
            let t21;
            if ($[45] !== chartMetric) {
                t21 = ({
                    "PeersSection[(anonymous)()]": (peer_4)=>({
                            name: peer_4.displaySymbol,
                            value: peer_4[chartMetric] ?? null,
                            isSelf: false
                        })
                })["PeersSection[(anonymous)()]"];
                $[45] = chartMetric;
                $[46] = t21;
            } else {
                t21 = $[46];
            }
            const chartData = [
                ...displayRatios ? [
                    {
                        name: symbol,
                        value: displayRatios[chartMetric] ?? null,
                        isSelf: true
                    }
                ] : [],
                ...completePeers.slice(0, 5).map(t21)
            ];
            let t22;
            if ($[47] !== displayRatios) {
                t22 = ({
                    "PeersSection[visiblePeers.map()]": (peer_5)=>({
                            key: peer_5.displaySymbol,
                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/stocks/${peer_5.displaySymbol}`,
                                        className: "font-medium hover:underline",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: peer_5.displaySymbol
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 351,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs truncate",
                                        style: {
                                            color: "var(--text-muted)"
                                        },
                                        children: peer_5.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 353,
                                        columnNumber: 47
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 351,
                                columnNumber: 20
                            }, this),
                            values: Object.fromEntries([
                                ...METRICS.map({
                                    "PeersSection[visiblePeers.map() > METRICS.map()]": (metric_1)=>{
                                        const value_0 = peer_5[metric_1.key] ?? null;
                                        const baseValue = displayRatios ? displayRatios[metric_1.key] ?? null : null;
                                        return [
                                            metric_1.key,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-end gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono metric-mono",
                                                        children: formatMetricValue(value_0, metric_1.type)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 140
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffBadge, {
                                                        val: value_0,
                                                        base: baseValue
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 230
                                                    }, this)
                                                ]
                                            }, `${peer_5.displaySymbol}-${metric_1.key}`, true, {
                                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                lineNumber: 360,
                                                columnNumber: 39
                                            }, this)
                                        ];
                                    }
                                }["PeersSection[visiblePeers.map() > METRICS.map()]"]),
                                [
                                    "marketCapCr",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono metric-mono",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(peer_5.marketCapCr)
                                    }, `${peer_5.displaySymbol}-marketCap`, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 362,
                                        columnNumber: 85
                                    }, this)
                                ]
                            ])
                        })
                })["PeersSection[visiblePeers.map()]"];
                $[47] = displayRatios;
                $[48] = t22;
            } else {
                t22 = $[48];
            }
            const tableRows = [
                ...displayRatios ? [
                    {
                        key: `${symbol}-self`,
                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold",
                                    style: {
                                        color: "var(--accent-brand)"
                                    },
                                    children: [
                                        symbol,
                                        " ★"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 372,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: "Current company"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 374,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 372,
                            columnNumber: 16
                        }, this),
                        values: Object.fromEntries([
                            ...METRICS.map({
                                "PeersSection[METRICS.map()]": (metric_0)=>{
                                    const value = displayRatios[metric_0.key] ?? null;
                                    return [
                                        metric_0.key,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono metric-mono",
                                            children: formatMetricValue(value, metric_0.type)
                                        }, metric_0.key, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 380,
                                            columnNumber: 35
                                        }, this)
                                    ];
                                }
                            }["PeersSection[METRICS.map()]"]),
                            [
                                "marketCapCr",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono metric-mono",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(displayRatios.marketCapCr)
                                }, "marketCapCr", false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 382,
                                    columnNumber: 60
                                }, this)
                            ]
                        ]),
                        rowClassName: "bg-muted/5"
                    }
                ] : [],
                ...visiblePeers.map(t22)
            ];
            let t23;
            if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
                t23 = [
                    ...METRICS.map(_PeersSectionMETRICSMap),
                    {
                        key: "marketCapCr",
                        label: "Mkt Cap"
                    }
                ];
                $[49] = t23;
            } else {
                t23 = $[49];
            }
            const tableColumns = t23;
            let t24;
            if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
                t24 = {
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px"
                };
                $[50] = t24;
            } else {
                t24 = $[50];
            }
            const tooltipStyle = t24;
            const rankedCorrelations = [
                ...correlationData?.peers ?? []
            ].filter(_PeersSectionAnonymous2).sort(_PeersSectionAnonymous3);
            if (loading) {
                let t25;
                if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
                    t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "peers",
                        className: "scroll-mt-28",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-xl border flex items-center justify-center h-64",
                            style: {
                                background: "var(--surface)",
                                borderColor: "var(--border)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 416,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 413,
                            columnNumber: 62
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 413,
                        columnNumber: 17
                    }, this);
                    $[51] = t25;
                } else {
                    t25 = $[51];
                }
                t20 = t25;
                break bb0;
            }
            if (rankedPeers.length === 0) {
                t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    id: "peers",
                    className: "scroll-mt-28",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                        meta: effectiveMeta,
                        title: "Peer comparison unavailable",
                        message: "No comparable peer set with enough market data is available for this company yet."
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 425,
                        columnNumber: 60
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 425,
                    columnNumber: 15
                }, this);
                break bb0;
            }
            t18 = "peers";
            t19 = "scroll-mt-28 space-y-4";
            t12 = "p-6 rounded-xl border space-y-6";
            if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
                t13 = {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                };
                $[52] = t13;
            } else {
                t13 = $[52];
            }
            let t25;
            if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
                t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-base font-semibold",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "Peer Comparison"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 442,
                    columnNumber: 15
                }, this);
                $[53] = t25;
            } else {
                t25 = $[53];
            }
            const t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                    meta: effectiveMeta
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 449,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 449,
                columnNumber: 19
            }, this);
            let t27;
            if ($[54] !== t26) {
                t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t25,
                        t26
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 452,
                    columnNumber: 15
                }, this);
                $[54] = t26;
                $[55] = t27;
            } else {
                t27 = $[55];
            }
            let t28;
            if ($[56] !== chartMetric) {
                t28 = METRICS.slice(0, 5).map({
                    "PeersSection[(anonymous)()]": (metric_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "PeersSection[(anonymous)() > <button>.onClick]": ()=>setChartMetric(metric_3.key)
                            }["PeersSection[(anonymous)() > <button>.onClick]"],
                            className: `flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${chartMetric === metric_3.key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                            children: metric_3.label
                        }, metric_3.key, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 461,
                            columnNumber: 54
                        }, this)
                }["PeersSection[(anonymous)()]"]);
                $[56] = chartMetric;
                $[57] = t28;
            } else {
                t28 = $[57];
            }
            let t29;
            if ($[58] !== t28) {
                t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-muted/20 p-0.5 rounded-lg border border-border overflow-x-auto",
                    children: t28
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 472,
                    columnNumber: 15
                }, this);
                $[58] = t28;
                $[59] = t29;
            } else {
                t29 = $[59];
            }
            if ($[60] !== t27 || $[61] !== t29) {
                t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between flex-wrap gap-3",
                    children: [
                        t27,
                        t29
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 479,
                    columnNumber: 15
                }, this);
                $[60] = t27;
                $[61] = t29;
                $[62] = t14;
            } else {
                t14 = $[62];
            }
            let t30;
            if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
                t30 = {
                    background: "var(--background)",
                    borderColor: "var(--border)"
                };
                $[63] = t30;
            } else {
                t30 = $[63];
            }
            let t31;
            if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
                t31 = {
                    color: "var(--text-primary)"
                };
                $[64] = t31;
            } else {
                t31 = $[64];
            }
            let t32;
            if ($[65] !== selectedMetric.label) {
                t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-medium",
                    style: t31,
                    children: [
                        "Top comparable peers by ",
                        selectedMetric.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 507,
                    columnNumber: 15
                }, this);
                $[65] = selectedMetric.label;
                $[66] = t32;
            } else {
                t32 = $[66];
            }
            let t33;
            if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
                t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-1 text-xs",
                    style: {
                        color: "var(--text-muted)"
                    },
                    children: "Showing the current company plus the five most complete peers first."
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 515,
                    columnNumber: 15
                }, this);
                $[67] = t33;
            } else {
                t33 = $[67];
            }
            let t34;
            let t35;
            if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
                t34 = {
                    top: 4,
                    right: 10,
                    left: 0,
                    bottom: 0
                };
                t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    vertical: false,
                    stroke: "var(--border)",
                    opacity: 0.4
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 531,
                    columnNumber: 15
                }, this);
                $[68] = t34;
                $[69] = t35;
            } else {
                t34 = $[68];
                t35 = $[69];
            }
            let t36;
            if ($[70] === Symbol.for("react.memo_cache_sentinel")) {
                t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: "name",
                    axisLine: false,
                    tickLine: false,
                    tick: {
                        fontSize: 11,
                        fill: "var(--text-muted)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 540,
                    columnNumber: 15
                }, this);
                $[70] = t36;
            } else {
                t36 = $[70];
            }
            let t37;
            if ($[71] === Symbol.for("react.memo_cache_sentinel")) {
                t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                    axisLine: false,
                    tickLine: false,
                    tick: {
                        fontSize: 11,
                        fill: "var(--text-muted)"
                    },
                    width: 44
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 550,
                    columnNumber: 15
                }, this);
                $[71] = t37;
            } else {
                t37 = $[71];
            }
            let t38;
            if ($[72] !== selectedMetric.label || $[73] !== selectedMetric.type) {
                t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    contentStyle: tooltipStyle,
                    formatter: {
                        "PeersSection[<Tooltip>.formatter]": (value_1)=>[
                                formatMetricValue(value_1, selectedMetric.type),
                                selectedMetric.label
                            ]
                    }["PeersSection[<Tooltip>.formatter]"]
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 560,
                    columnNumber: 15
                }, this);
                $[72] = selectedMetric.label;
                $[73] = selectedMetric.type;
                $[74] = t38;
            } else {
                t38 = $[74];
            }
            let t39;
            if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
                t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                    dataKey: "value",
                    radius: [
                        3,
                        3,
                        0,
                        0
                    ],
                    fill: "var(--accent-brand)"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 571,
                    columnNumber: 15
                }, this);
                $[75] = t39;
            } else {
                t39 = $[75];
            }
            const t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: chartData,
                    margin: t34,
                    children: [
                        t35,
                        t36,
                        t37,
                        t38,
                        t39
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 576,
                    columnNumber: 67
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 576,
                columnNumber: 19
            }, this);
            let t41;
            if ($[76] !== t40) {
                t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-64 mt-4",
                    children: t40
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 579,
                    columnNumber: 15
                }, this);
                $[76] = t40;
                $[77] = t41;
            } else {
                t41 = $[77];
            }
            let t42;
            if ($[78] !== t32 || $[79] !== t41) {
                t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border p-4",
                    style: t30,
                    children: [
                        t32,
                        t33,
                        t41
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 587,
                    columnNumber: 15
                }, this);
                $[78] = t32;
                $[79] = t41;
                $[80] = t42;
            } else {
                t42 = $[80];
            }
            let t43;
            if ($[81] === Symbol.for("react.memo_cache_sentinel")) {
                t43 = {
                    background: "var(--background)",
                    borderColor: "var(--border)"
                };
                $[81] = t43;
            } else {
                t43 = $[81];
            }
            let t44;
            if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
                t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-medium",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "Peer shortlist"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 606,
                    columnNumber: 15
                }, this);
                $[82] = t44;
            } else {
                t44 = $[82];
            }
            let t45;
            if ($[83] === Symbol.for("react.memo_cache_sentinel")) {
                t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-1 text-xs",
                    style: {
                        color: "var(--text-muted)"
                    },
                    children: "Complete peers are sorted ahead of sparse rows so the table is decision-ready at first glance."
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 615,
                    columnNumber: 15
                }, this);
                $[83] = t45;
            } else {
                t45 = $[83];
            }
            const t46 = completePeers.slice(0, 3).map(_PeersSectionAnonymous4);
            let t47;
            if ($[84] !== completePeers || $[85] !== effectiveMeta || $[86] !== incompletePeers) {
                t47 = completePeers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                    meta: effectiveMeta,
                    title: "No complete peers yet",
                    message: "Comparable names were found, but none clear the completeness threshold for a first-glance table.",
                    action: incompletePeers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "PeersSection[<button>.onClick]": ()=>setShowIncompletePeers(true)
                        }["PeersSection[<button>.onClick]"],
                        className: "text-xs font-medium",
                        style: {
                            color: "var(--accent-brand)"
                        },
                        children: "Show incomplete peers"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 625,
                        columnNumber: 255
                    }, void 0) : null
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 625,
                    columnNumber: 44
                }, this) : null;
                $[84] = completePeers;
                $[85] = effectiveMeta;
                $[86] = incompletePeers;
                $[87] = t47;
            } else {
                t47 = $[87];
            }
            let t48;
            if ($[88] !== t46 || $[89] !== t47) {
                t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border p-4",
                    style: t43,
                    children: [
                        t44,
                        t45,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-3",
                            children: [
                                t46,
                                t47
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 639,
                            columnNumber: 76
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 639,
                    columnNumber: 15
                }, this);
                $[88] = t46;
                $[89] = t47;
                $[90] = t48;
            } else {
                t48 = $[90];
            }
            if ($[91] !== t42 || $[92] !== t48) {
                t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]",
                    children: [
                        t42,
                        t48
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 647,
                    columnNumber: 15
                }, this);
                $[91] = t42;
                $[92] = t48;
                $[93] = t15;
            } else {
                t15 = $[93];
            }
            if ($[94] !== effectiveMeta || $[95] !== incompletePeers || $[96] !== showIncompletePeers) {
                t16 = incompletePeers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                    meta: effectiveMeta,
                    title: showIncompletePeers ? "Incomplete peers shown" : "Incomplete peers hidden",
                    message: showIncompletePeers ? `${incompletePeers.length} lower-coverage rows are visible below for completeness, but they should not drive a first decision.` : `${incompletePeers.length} lower-coverage peer rows are hidden by default so the compare table stays decision-ready.`,
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "PeersSection[<button>.onClick]": ()=>setShowIncompletePeers(_PeersSectionButtonOnClickSetShowIncompletePeers)
                        }["PeersSection[<button>.onClick]"],
                        className: "text-xs font-medium",
                        style: {
                            color: "var(--accent-brand)"
                        },
                        children: showIncompletePeers ? "Hide incomplete peers" : "Show incomplete peers"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 655,
                        columnNumber: 452
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 655,
                    columnNumber: 44
                }, this) : null;
                $[94] = effectiveMeta;
                $[95] = incompletePeers;
                $[96] = showIncompletePeers;
                $[97] = t16;
            } else {
                t16 = $[97];
            }
            if ($[98] !== tableRows) {
                t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickyMetricTable"], {
                    ariaLabel: "Peer comparison table",
                    columns: tableColumns,
                    rows: tableRows
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 668,
                    columnNumber: 15
                }, this);
                $[98] = tableRows;
                $[99] = t17;
            } else {
                t17 = $[99];
            }
            t8 = "border-t pt-6";
            if ($[100] === Symbol.for("react.memo_cache_sentinel")) {
                t9 = {
                    borderColor: "var(--border)"
                };
                $[100] = t9;
            } else {
                t9 = $[100];
            }
            let t49;
            if ($[101] === Symbol.for("react.memo_cache_sentinel")) {
                t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-semibold",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: "Peer Price Correlation"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 685,
                    columnNumber: 15
                }, this);
                $[101] = t49;
            } else {
                t49 = $[101];
            }
            let t50;
            if ($[102] === Symbol.for("react.memo_cache_sentinel")) {
                t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t49,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs max-w-2xl",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: "Uses adjusted daily returns over overlapping trading sessions. Higher values mean the stocks tend to move together; lower values are usually better for diversification."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 694,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 694,
                    columnNumber: 15
                }, this);
                $[102] = t50;
            } else {
                t50 = $[102];
            }
            let t51;
            if ($[103] !== correlationPeriod) {
                t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
                    children: [
                        "1y",
                        "3y",
                        "5y"
                    ].map({
                        "PeersSection[(anonymous)()]": (period)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "PeersSection[(anonymous)() > <button>.onClick]": ()=>setCorrelationPeriod(period)
                                }["PeersSection[(anonymous)() > <button>.onClick]"],
                                className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${correlationPeriod === period ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                children: period.toUpperCase()
                            }, period, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 704,
                                columnNumber: 54
                            }, this)
                    }["PeersSection[(anonymous)()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 703,
                    columnNumber: 15
                }, this);
                $[103] = correlationPeriod;
                $[104] = t51;
            } else {
                t51 = $[104];
            }
            let t52;
            if ($[105] === Symbol.for("react.memo_cache_sentinel")) {
                t52 = ({
                    "PeersSection[<button>.onClick]": ()=>setShowMatrix(_PeersSectionButtonOnClickSetShowMatrix)
                })["PeersSection[<button>.onClick]"];
                $[105] = t52;
            } else {
                t52 = $[105];
            }
            let t53;
            if ($[106] === Symbol.for("react.memo_cache_sentinel")) {
                t53 = {
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                    background: "var(--background)"
                };
                $[106] = t53;
            } else {
                t53 = $[106];
            }
            const t54 = showMatrix ? "Hide heatmap" : "View heatmap";
            let t55;
            if ($[107] !== t54) {
                t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: t52,
                    className: "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    style: t53,
                    children: t54
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 736,
                    columnNumber: 15
                }, this);
                $[107] = t54;
                $[108] = t55;
            } else {
                t55 = $[108];
            }
            if ($[109] !== t51 || $[110] !== t55) {
                t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between gap-3 flex-wrap",
                    children: [
                        t50,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 flex-wrap",
                            children: [
                                t51,
                                t55
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 743,
                            columnNumber: 86
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 743,
                    columnNumber: 15
                }, this);
                $[109] = t51;
                $[110] = t55;
                $[111] = t10;
            } else {
                t10 = $[111];
            }
            t11 = correlationLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 flex items-center justify-center h-36 rounded-xl border",
                style: {
                    borderColor: "var(--border)",
                    background: "var(--background)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-6 h-6 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 753,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 750,
                columnNumber: 34
            }, this) : correlationData && rankedCorrelations.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-3",
                        children: [
                            {
                                label: "Moves Most Like",
                                symbol: correlationData.summary.closestPeer?.symbol ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                detail: correlationData.summary.closestPeer?.correlation != null ? `${correlationData.summary.closestPeer.correlation.toFixed(2)} correlation` : "No signal",
                                tone: corrColor(correlationData.summary.closestPeer?.correlation)
                            },
                            {
                                label: "Best Diversifier",
                                symbol: correlationData.summary.diversifier?.symbol ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                detail: correlationData.summary.diversifier?.correlation != null ? `${correlationData.summary.diversifier.correlation.toFixed(2)} correlation` : "No signal",
                                tone: corrColor(correlationData.summary.diversifier?.correlation)
                            },
                            {
                                label: "Peer Basket Average",
                                symbol: correlationData.summary.averageCorrelation != null ? correlationData.summary.averageCorrelation.toFixed(2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                detail: correlationData.summary.averageCorrelation != null ? corrLabel(correlationData.summary.averageCorrelation) : "No signal",
                                tone: corrColor(correlationData.summary.averageCorrelation)
                            }
                        ].map(_PeersSectionAnonymous5)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 753,
                        columnNumber: 214
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: rankedCorrelations.map(_PeersSectionRankedCorrelationsMap)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 768,
                        columnNumber: 49
                    }, this),
                    showMatrix && correlationData.matrixSymbols.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border p-4 overflow-x-auto",
                        style: {
                            borderColor: "var(--border)",
                            background: "var(--background)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold mb-3",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Correlation heatmap"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 771,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-left",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "Ticker"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 88
                                                }, this),
                                                correlationData.matrixSymbols.map(_PeersSectionCorrelationDataMatrixSymbolsMap)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 773,
                                            columnNumber: 84
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 773,
                                        columnNumber: 77
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: correlationData.matrixSymbols.map({
                                            "PeersSection[correlationData.matrixSymbols.map()]": (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 font-medium",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: row
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 91
                                                        }, this),
                                                        correlationData.matrixSymbols.map({
                                                            "PeersSection[correlationData.matrixSymbols.map() > correlationData.matrixSymbols.map()]": (col_0)=>{
                                                                const value_4 = correlationData.matrix[row]?.[col_0] ?? null;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mx-auto flex h-9 w-12 items-center justify-center rounded-lg font-mono metric-mono",
                                                                        style: {
                                                                            background: corrColor(value_4),
                                                                            color: "var(--text-primary)"
                                                                        },
                                                                        children: value_4 != null ? value_4.toFixed(2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                        lineNumber: 781,
                                                                        columnNumber: 74
                                                                    }, this)
                                                                }, `${row}-${col_0}`, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 781,
                                                                    columnNumber: 30
                                                                }, this);
                                                            }
                                                        }["PeersSection[correlationData.matrixSymbols.map() > correlationData.matrixSymbols.map()]"])
                                                    ]
                                                }, row, true, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 77
                                                }, this)
                                        }["PeersSection[correlationData.matrixSymbols.map()]"])
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 775,
                                        columnNumber: 125
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 773,
                                columnNumber: 39
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 768,
                        columnNumber: 201
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 753,
                columnNumber: 182
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-xl border px-4 py-6 text-sm",
                style: {
                    borderColor: "var(--border)",
                    background: "var(--background)",
                    color: "var(--text-muted)"
                },
                children: "Not enough overlapping adjusted price history to compute a reliable peer-correlation view yet."
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 787,
                columnNumber: 103
            }, this);
        }
        $[20] = chartMetric;
        $[21] = correlationData;
        $[22] = correlationLoading;
        $[23] = correlationPeriod;
        $[24] = displayRatios;
        $[25] = loading;
        $[26] = peerMeta;
        $[27] = rankedPeers;
        $[28] = selectedMetric;
        $[29] = showIncompletePeers;
        $[30] = showMatrix;
        $[31] = symbol;
        $[32] = t10;
        $[33] = t11;
        $[34] = t12;
        $[35] = t13;
        $[36] = t14;
        $[37] = t15;
        $[38] = t16;
        $[39] = t17;
        $[40] = t18;
        $[41] = t19;
        $[42] = t20;
        $[43] = t8;
        $[44] = t9;
    } else {
        t10 = $[32];
        t11 = $[33];
        t12 = $[34];
        t13 = $[35];
        t14 = $[36];
        t15 = $[37];
        t16 = $[38];
        t17 = $[39];
        t18 = $[40];
        t19 = $[41];
        t20 = $[42];
        t8 = $[43];
        t9 = $[44];
    }
    if (t20 !== Symbol.for("react.early_return_sentinel")) {
        return t20;
    }
    let t21;
    if ($[112] !== t10 || $[113] !== t11 || $[114] !== t8 || $[115] !== t9) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            style: t9,
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 838,
            columnNumber: 11
        }, this);
        $[112] = t10;
        $[113] = t11;
        $[114] = t8;
        $[115] = t9;
        $[116] = t21;
    } else {
        t21 = $[116];
    }
    let t22;
    if ($[117] !== t12 || $[118] !== t13 || $[119] !== t14 || $[120] !== t15 || $[121] !== t16 || $[122] !== t17 || $[123] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t12,
            style: t13,
            children: [
                t14,
                t15,
                t16,
                t17,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 849,
            columnNumber: 11
        }, this);
        $[117] = t12;
        $[118] = t13;
        $[119] = t14;
        $[120] = t15;
        $[121] = t16;
        $[122] = t17;
        $[123] = t21;
        $[124] = t22;
    } else {
        t22 = $[124];
    }
    let t23;
    if ($[125] !== t18 || $[126] !== t19 || $[127] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: t18,
            className: t19,
            children: t22
        }, void 0, false, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 863,
            columnNumber: 11
        }, this);
        $[125] = t18;
        $[126] = t19;
        $[127] = t22;
        $[128] = t23;
    } else {
        t23 = $[128];
    }
    return t23;
}
_s(PeersSection, "AGdMQEO3qFOIQ41EyLoOpWfdb74=");
_c1 = PeersSection;
function _PeersSectionCorrelationDataMatrixSymbolsMap(col) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "p-2 text-center font-medium",
        style: {
            color: "var(--text-muted)"
        },
        children: col
    }, col, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 874,
        columnNumber: 10
    }, this);
}
function _PeersSectionRankedCorrelationsMap(peer_8) {
    const peerSymbol = peer_8.nseSymbol ?? peer_8.symbol;
    const correlation = peer_8.correlation ?? 0;
    const fillWidth = `${Math.max(10, (correlation + 1) / 2 * 100)}%`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border p-3",
        style: {
            borderColor: "var(--border)",
            background: "var(--background)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/stocks/${peerSymbol}`,
                                        className: "text-sm font-semibold hover:underline",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: peerSymbol
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 885,
                                        columnNumber: 149
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] px-2 py-0.5 rounded-full",
                                        style: {
                                            background: corrColor(peer_8.correlation),
                                            color: "var(--text-secondary)"
                                        },
                                        children: corrLabel(peer_8.correlation)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 887,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 885,
                                columnNumber: 98
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-xs",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: [
                                    peer_8.name,
                                    " · ",
                                    peer_8.overlapDays,
                                    " overlapping sessions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 890,
                                columnNumber: 58
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 885,
                        columnNumber: 73
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-semibold font-mono metric-mono",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: peer_8.correlation?.toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 892,
                                columnNumber: 109
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px]",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Correlation"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 894,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 892,
                        columnNumber: 81
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 885,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 h-2 rounded-full overflow-hidden",
                style: {
                    background: "var(--surface-elevated)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full",
                    style: {
                        width: fillWidth,
                        background: "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(245,158,11,0.95) 100%)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 898,
                    columnNumber: 8
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 896,
                columnNumber: 41
            }, this)
        ]
    }, peerSymbol, true, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 882,
        columnNumber: 10
    }, this);
}
function _PeersSectionAnonymous5(card) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border p-4",
        style: {
            borderColor: "var(--border)",
            background: card.tone
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] font-semibold uppercase tracking-[0.18em]",
                style: {
                    color: "var(--text-muted)"
                },
                children: card.label
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 907,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-lg font-semibold font-mono metric-mono",
                style: {
                    color: "var(--text-primary)"
                },
                children: card.symbol
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 909,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs",
                style: {
                    color: "var(--text-secondary)"
                },
                children: card.detail
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 911,
                columnNumber: 27
            }, this)
        ]
    }, card.label, true, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 904,
        columnNumber: 10
    }, this);
}
function _PeersSectionButtonOnClickSetShowMatrix(value_3) {
    return !value_3;
}
function _PeersSectionButtonOnClickSetShowIncompletePeers(value_2) {
    return !value_2;
}
function _PeersSectionAnonymous4(peer_7) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border px-3 py-3",
        style: {
            borderColor: "var(--border)",
            background: "var(--surface)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/stocks/${peer_7.displaySymbol}`,
                            className: "text-sm font-semibold hover:underline",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: peer_7.displaySymbol
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 925,
                            columnNumber: 68
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: peer_7.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 927,
                            columnNumber: 41
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 925,
                    columnNumber: 63
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-right",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold font-mono metric-mono",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: [
                                Math.round(peer_7.completeness * 100),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 929,
                            columnNumber: 65
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[11px]",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: "metric coverage"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 931,
                            columnNumber: 58
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 929,
                    columnNumber: 37
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 925,
            columnNumber: 6
        }, this)
    }, peer_7.displaySymbol, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 922,
        columnNumber: 10
    }, this);
}
function _PeersSectionAnonymous3(left_0, right_0) {
    return (right_0.correlation ?? -1) - (left_0.correlation ?? -1);
}
function _PeersSectionAnonymous2(peer_6) {
    return peer_6.correlation != null;
}
function _PeersSectionMETRICSMap(metric_2) {
    return {
        key: metric_2.key,
        label: metric_2.label
    };
}
function _PeersSectionRankedPeersFilter2(peer_3) {
    return peer_3.completeness < 0.625;
}
function _PeersSectionRankedPeersFilter(peer_2) {
    return peer_2.completeness >= 0.625;
}
function _PeersSectionAnonymous(left, right) {
    if (right.completeness !== left.completeness) {
        return right.completeness - left.completeness;
    }
    return left.marketCapGap - right.marketCapGap;
}
function _PeersSectionDedupeByKey(peer) {
    return `${(peer.name ?? "").trim().toLowerCase()}::${(peer.nseSymbol ?? peer.symbol ?? "").trim().toUpperCase()}`;
}
function _PeersSectionUseEffectAnonymous3(response_1) {
    return response_1.json();
}
function _PeersSectionUseEffectAnonymous2(response_0) {
    return response_0.json();
}
function _PeersSectionUseEffectAnonymous(response) {
    return response.json();
}
var _c, _c1;
__turbopack_context__.k.register(_c, "DiffBadge");
__turbopack_context__.k.register(_c1, "PeersSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/FollowButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowButton",
    ()=>FollowButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FollowButton({ symbol }) {
    _s();
    const [isFollowing, setIsFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [followerCount, setFollowerCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [alertConfig, setAlertConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        price: true,
        results: true,
        concall: true,
        shareholding: true,
        redFlags: true
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fetched, setFetched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FollowButton.useEffect": ()=>{
            fetch(`/api/stocks/${symbol}/follow`).then({
                "FollowButton.useEffect": (r)=>r.json()
            }["FollowButton.useEffect"]).then({
                "FollowButton.useEffect": (data)=>{
                    setIsFollowing(data.isFollowing);
                    setFollowerCount(data.followerCount);
                    if (data.alertConfig) setAlertConfig(data.alertConfig);
                    setFetched(true);
                }
            }["FollowButton.useEffect"]).catch({
                "FollowButton.useEffect": ()=>setFetched(true)
            }["FollowButton.useEffect"]);
        }
    }["FollowButton.useEffect"], [
        symbol
    ]);
    const handleToggle = async ()=>{
        setLoading(true);
        try {
            if (isFollowing) {
                await fetch(`/api/stocks/${symbol}/follow`, {
                    method: "DELETE"
                });
                setIsFollowing(false);
                setFollowerCount((c)=>c !== null ? Math.max(0, c - 1) : null);
            } else {
                await fetch(`/api/stocks/${symbol}/follow`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        alertConfig
                    })
                });
                setIsFollowing(true);
                setFollowerCount((c)=>c !== null ? c + 1 : 1);
            }
        } finally{
            setLoading(false);
        }
    };
    const handleAlertChange = async (key, val)=>{
        const newConfig = {
            ...alertConfig,
            [key]: val
        };
        setAlertConfig(newConfig);
        if (isFollowing) {
            await fetch(`/api/stocks/${symbol}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    alertConfig: newConfig
                })
            });
        }
    };
    if (!fetched) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleToggle,
                disabled: loading,
                className: `flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isFollowing ? "bg-[var(--accent-brand)] text-[var(--accent-foreground)]" : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"}`,
                children: [
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 14,
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 85,
                        columnNumber: 20
                    }, this) : isFollowing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 85,
                        columnNumber: 83
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 85,
                        columnNumber: 105
                    }, this),
                    isFollowing ? "Following" : "Follow",
                    followerCount !== null && followerCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs opacity-70 font-mono",
                        children: followerCount.toLocaleString("en-IN")
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 87,
                        columnNumber: 57
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FollowButton.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors",
                            title: "Alert settings",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FollowButton.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                        align: "end",
                        className: "w-52",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Alert me for"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            [
                                "price",
                                "results",
                                "concall",
                                "shareholding",
                                "redFlags"
                            ].map((key_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: alertConfig[key_0],
                                    onCheckedChange: (v)=>handleAlertChange(key_0, v),
                                    className: "text-sm capitalize",
                                    children: key_0 === "redFlags" ? "Red Flags" : key_0 === "concall" ? "Concall" : key_0 === "shareholding" ? "Shareholding" : key_0 === "results" ? "Results" : "Price Alerts"
                                }, key_0, false, {
                                    fileName: "[project]/src/components/stock/FollowButton.tsx",
                                    lineNumber: 99,
                                    columnNumber: 112
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FollowButton.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/FollowButton.tsx",
        lineNumber: 83,
        columnNumber: 10
    }, this);
}
_s(FollowButton, "q3WHlxuuY9UJ6FkVi1vwRgFBoP8=");
_c = FollowButton;
var _c;
__turbopack_context__.k.register(_c, "FollowButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/stock/FloatingNavButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingNavButton",
    ()=>FloatingNavButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const sections = [
    {
        id: "overview",
        label: "Overview"
    },
    {
        id: "chart",
        label: "Chart"
    },
    {
        id: "financials",
        label: "Financials"
    },
    {
        id: "ownership",
        label: "Ownership"
    },
    {
        id: "analytics",
        label: "Analytics"
    },
    {
        id: "peers",
        label: "Peers"
    },
    {
        id: "ai",
        label: "AI"
    },
    {
        id: "documents",
        label: "Documents"
    }
];
function FloatingNavButton() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "b0ca4be903473213292f6a182079fe9a3db43cd5292f7fc131ca63c84d17ab90") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b0ca4be903473213292f6a182079fe9a3db43cd5292f7fc131ca63c84d17ab90";
    }
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "FloatingNavButton[scrollToSection]": (id)=>{
                const element = document.getElementById(id);
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 120;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                setIsOpen(false);
            }
        })["FloatingNavButton[scrollToSection]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const scrollToSection = t0;
    let t1;
    if ($[2] !== isOpen) {
        t1 = ({
            "FloatingNavButton[<button>.onClick]": ()=>setIsOpen(!isOpen)
        })["FloatingNavButton[<button>.onClick]"];
        $[2] = isOpen;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            background: "var(--accent-brand)",
            color: "white"
        };
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== isOpen) {
        t3 = isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 24
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
            lineNumber: 83,
            columnNumber: 19
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            size: 24
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
            lineNumber: 83,
            columnNumber: 37
        }, this);
        $[5] = isOpen;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t1 || $[8] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t1,
            className: "md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110",
            style: t2,
            "aria-label": "Quick Navigation",
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[7] = t1;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== isOpen) {
        t5 = isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden fixed inset-0 bg-black/50 z-40",
                    onClick: {
                        "FloatingNavButton[<div>.onClick]": ()=>setIsOpen(false)
                    }["FloatingNavButton[<div>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                    lineNumber: 100,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden fixed bottom-24 right-6 z-50 rounded-lg shadow-xl overflow-hidden",
                    style: {
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border)",
                        minWidth: "200px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-semibold uppercase tracking-wider px-3 py-2",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Jump to Section"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                                lineNumber: 106,
                                columnNumber: 31
                            }, this),
                            sections.map({
                                "FloatingNavButton[sections.map()]": (section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "FloatingNavButton[sections.map() > <button>.onClick]": ()=>scrollToSection(section.id)
                                        }["FloatingNavButton[sections.map() > <button>.onClick]"],
                                        className: "w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        onMouseEnter: _FloatingNavButtonSectionsMapButtonOnMouseEnter,
                                        onMouseLeave: _FloatingNavButtonSectionsMapButtonOnMouseLeave,
                                        children: section.label
                                    }, section.id, false, {
                                        fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                                        lineNumber: 109,
                                        columnNumber: 61
                                    }, this)
                            }["FloatingNavButton[sections.map()]"])
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                        lineNumber: 106,
                        columnNumber: 10
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                    lineNumber: 102,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true);
        $[10] = isOpen;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t4 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t4,
                t5
            ]
        }, void 0, true);
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    return t6;
}
_s(FloatingNavButton, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = FloatingNavButton;
function _FloatingNavButtonSectionsMapButtonOnMouseLeave(e_0) {
    e_0.currentTarget.style.background = "transparent";
}
function _FloatingNavButtonSectionsMapButtonOnMouseEnter(e) {
    e.currentTarget.style.background = "var(--accent-subtle)";
}
var _c;
__turbopack_context__.k.register(_c, "FloatingNavButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/stocks/[symbol]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$SectionNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/SectionNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$EmbeddedChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/EmbeddedChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FinancialsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FinancialsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$OwnershipSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/OwnershipSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$DocumentsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/DocumentsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$AnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/AnalyticsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$PeersSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/PeersSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FollowButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FollowButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FloatingNavButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FloatingNavButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
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
function StockPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(153);
    if ($[0] !== "55ed36899cb5bdf8c0fae7ba3d885aa0c62139fcdd62b63b3c291ed6f4310e15") {
        for(let $i = 0; $i < 153; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "55ed36899cb5bdf8c0fae7ba3d885aa0c62139fcdd62b63b3c291ed6f4310e15";
    }
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const t0 = params?.symbol ?? "";
    let t1;
    if ($[1] !== t0) {
        t1 = t0.toUpperCase();
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const symbol = t1;
    const [stock, setStock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, setOverviewMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [notFound, setNotFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [, setShowFullDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    let t3;
    if ($[3] !== symbol) {
        t2 = ({
            "StockPage[useEffect()]": ()=>{
                if (!symbol) {
                    return;
                }
                fetch(`/api/stocks/${symbol}/overview`).then({
                    "StockPage[useEffect() > (anonymous)()]": (r)=>{
                        if (r.status === 404) {
                            setNotFound(true);
                            setOverviewMeta(null);
                            setLoadedSymbol(symbol);
                            return null;
                        }
                        return r.json();
                    }
                }["StockPage[useEffect() > (anonymous)()]"]).then({
                    "StockPage[useEffect() > (anonymous)()]": (data)=>{
                        if (!data) {
                            return;
                        }
                        setNotFound(false);
                        setStock(data.stock ?? null);
                        setProfile(data.profile ?? null);
                        setOverviewMeta(data.meta ?? null);
                        setShowFullDescription(false);
                        setLoadedSymbol(symbol);
                    }
                }["StockPage[useEffect() > (anonymous)()]"]).catch({
                    "StockPage[useEffect() > (anonymous)()]": ()=>{
                        setOverviewMeta(null);
                        setLoadedSymbol(symbol);
                    }
                }["StockPage[useEffect() > (anonymous)()]"]);
            }
        })["StockPage[useEffect()]"];
        t3 = [
            symbol
        ];
        $[3] = symbol;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    const loading = loadedSymbol !== symbol;
    if (loading) {
        let t4;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-t-transparent",
                    style: {
                        borderColor: "var(--accent-brand)",
                        borderTopColor: "transparent"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 107,
                    columnNumber: 67
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 107,
                columnNumber: 12
            }, this);
            $[6] = t4;
        } else {
            t4 = $[6];
        }
        return t4;
    }
    if (notFound || !stock) {
        let t4;
        if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = {
                color: "var(--text-primary)"
            };
            $[7] = t4;
        } else {
            t4 = $[7];
        }
        let t5;
        if ($[8] !== symbol) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg font-semibold",
                style: t4,
                children: [
                    "Stock not found: ",
                    symbol
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 129,
                columnNumber: 12
            }, this);
            $[8] = symbol;
            $[9] = t5;
        } else {
            t5 = $[9];
        }
        let t6;
        if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/screener",
                className: "text-sm underline",
                style: {
                    color: "var(--accent-brand)"
                },
                children: "← Back to Screener"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 137,
                columnNumber: 12
            }, this);
            $[10] = t6;
        } else {
            t6 = $[10];
        }
        let t7;
        if ($[11] !== t5) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center h-64 gap-4",
                children: [
                    t5,
                    t6
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 146,
                columnNumber: 12
            }, this);
            $[11] = t5;
            $[12] = t7;
        } else {
            t7 = $[12];
        }
        return t7;
    }
    const isPos = (stock.pctChange1d ?? 0) > 0;
    const isNeg = (stock.pctChange1d ?? 0) < 0;
    let t4;
    if ($[13] !== stock.marketCapCr) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(stock.marketCapCr);
        $[13] = stock.marketCapCr;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    let t5;
    if ($[15] !== t4) {
        t5 = {
            label: "Market Cap",
            value: t4,
            reason: "Market capitalization is not available for this listing yet."
        };
        $[15] = t4;
        $[16] = t5;
    } else {
        t5 = $[16];
    }
    let t6;
    if ($[17] !== stock.pe) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(stock.pe, 1);
        $[17] = stock.pe;
        $[18] = t6;
    } else {
        t6 = $[18];
    }
    let t7;
    if ($[19] !== t6) {
        t7 = {
            label: "P/E",
            value: t6,
            reason: "TTM earnings are unavailable or non-positive."
        };
        $[19] = t6;
        $[20] = t7;
    } else {
        t7 = $[20];
    }
    let t8;
    if ($[21] !== stock.roce) {
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(stock.roce, 1);
        $[21] = stock.roce;
        $[22] = t8;
    } else {
        t8 = $[22];
    }
    let t9;
    if ($[23] !== t8) {
        t9 = {
            label: "ROCE",
            value: t8,
            reason: "Return-on-capital history is missing."
        };
        $[23] = t8;
        $[24] = t9;
    } else {
        t9 = $[24];
    }
    let t10;
    if ($[25] !== stock.roe) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(stock.roe, 1);
        $[25] = stock.roe;
        $[26] = t10;
    } else {
        t10 = $[26];
    }
    let t11;
    if ($[27] !== t10) {
        t11 = {
            label: "ROE",
            value: t10,
            reason: "Return-on-equity history is missing."
        };
        $[27] = t10;
        $[28] = t11;
    } else {
        t11 = $[28];
    }
    let t12;
    if ($[29] !== stock.high52w || $[30] !== stock.low52w) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMetricRange"])(stock.low52w, stock.high52w, _StockPageFormatMetricRange);
        $[29] = stock.high52w;
        $[30] = stock.low52w;
        $[31] = t12;
    } else {
        t12 = $[31];
    }
    let t13;
    if ($[32] !== t12) {
        t13 = {
            label: "52W Range",
            value: t12,
            reason: "A full 52-week price range is not available yet."
        };
        $[32] = t12;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    let t14;
    if ($[34] !== stock.avgVolume) {
        t14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVolume"])(stock.avgVolume);
        $[34] = stock.avgVolume;
        $[35] = t14;
    } else {
        t14 = $[35];
    }
    let t15;
    if ($[36] !== t14) {
        t15 = {
            label: "Avg Volume",
            value: t14,
            reason: "Recent average volume is not available."
        };
        $[36] = t14;
        $[37] = t15;
    } else {
        t15 = $[37];
    }
    let t16;
    if ($[38] !== t11 || $[39] !== t13 || $[40] !== t15 || $[41] !== t5 || $[42] !== t7 || $[43] !== t9) {
        t16 = [
            t5,
            t7,
            t9,
            t11,
            t13,
            t15
        ];
        $[38] = t11;
        $[39] = t13;
        $[40] = t15;
        $[41] = t5;
        $[42] = t7;
        $[43] = t9;
        $[44] = t16;
    } else {
        t16 = $[44];
    }
    const keyMetrics = t16;
    let t17;
    if ($[45] !== stock.sector) {
        t17 = stock.sector ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSectorEmoji"])(stock.sector)} ${stock.sector}` : null;
        $[45] = stock.sector;
        $[46] = t17;
    } else {
        t17 = $[46];
    }
    const t18 = stock.industryGroup ?? null;
    const t19 = stock.industry ?? null;
    const t20 = stock.subIndustry ?? null;
    const t21 = stock.exchange ?? (stock.nseSymbol || stock.bseCode ? "NSE/BSE" : null);
    let t22;
    if ($[47] !== t17 || $[48] !== t18 || $[49] !== t19 || $[50] !== t20 || $[51] !== t21) {
        t22 = [
            t17,
            t18,
            t19,
            t20,
            t21
        ].filter(Boolean);
        $[47] = t17;
        $[48] = t18;
        $[49] = t19;
        $[50] = t20;
        $[51] = t21;
        $[52] = t22;
    } else {
        t22 = $[52];
    }
    const identityChips = t22;
    profile?.descriptionShort ?? `${stock.name} is a listed Indian company${stock.industry ? ` operating in ${stock.industry}` : ""}${stock.sector ? ` within the ${stock.sector} sector` : ""}.`;
    let t23;
    let t24;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$SectionNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionNav"], {}, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FloatingNavButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingNavButton"], {}, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[53] = t23;
        $[54] = t24;
    } else {
        t23 = $[53];
        t24 = $[54];
    }
    let t25;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            background: "#fff",
            borderColor: "var(--border)"
        };
        $[55] = t25;
    } else {
        t25 = $[55];
    }
    let t26;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = {
            color: "var(--text-primary)"
        };
        $[56] = t26;
    } else {
        t26 = $[56];
    }
    let t27;
    if ($[57] !== stock.name) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-3xl font-semibold tracking-tight",
            style: t26,
            children: stock.name
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 349,
            columnNumber: 11
        }, this);
        $[57] = stock.name;
        $[58] = t27;
    } else {
        t27 = $[58];
    }
    let t28;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = {
            background: "var(--accent-subtle)",
            color: "var(--accent-brand)",
            border: "1px solid rgba(245,158,11,0.3)"
        };
        $[59] = t28;
    } else {
        t28 = $[59];
    }
    const t29 = stock.nseSymbol ?? stock.symbol;
    let t30;
    if ($[60] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs px-2.5 py-1 rounded-md font-mono font-semibold",
            style: t28,
            children: t29
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 369,
            columnNumber: 11
        }, this);
        $[60] = t29;
        $[61] = t30;
    } else {
        t30 = $[61];
    }
    let t31;
    if ($[62] !== stock.bseCode) {
        t31 = stock.bseCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs px-2.5 py-1 rounded-md font-mono",
            style: {
                background: "var(--surface-elevated)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)"
            },
            children: [
                "BSE ",
                stock.bseCode
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 377,
            columnNumber: 28
        }, this);
        $[62] = stock.bseCode;
        $[63] = t31;
    } else {
        t31 = $[63];
    }
    let t32;
    if ($[64] !== profile) {
        t32 = profile?.analystRatings?.targetPrice != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs px-2.5 py-1 rounded-md font-medium",
            style: {
                border: "1px solid rgba(245,158,11,0.24)",
                background: "var(--accent-subtle)",
                color: "var(--accent-brand)"
            },
            children: [
                "Target ",
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(profile.analystRatings.targetPrice, {
                    decimals: 0
                })
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 389,
            columnNumber: 59
        }, this);
        $[64] = profile;
        $[65] = t32;
    } else {
        t32 = $[65];
    }
    let t33;
    if ($[66] !== t27 || $[67] !== t30 || $[68] !== t31 || $[69] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 flex-wrap",
            children: [
                t27,
                t30,
                t31,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[66] = t27;
        $[67] = t30;
        $[68] = t31;
        $[69] = t32;
        $[70] = t33;
    } else {
        t33 = $[70];
    }
    let t34;
    if ($[71] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = {
            color: "var(--text-secondary)"
        };
        $[71] = t34;
    } else {
        t34 = $[71];
    }
    let t35;
    if ($[72] !== identityChips) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 flex items-center gap-2 flex-wrap text-xs",
            style: t34,
            children: identityChips.map(_StockPageIdentityChipsMap)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 423,
            columnNumber: 11
        }, this);
        $[72] = identityChips;
        $[73] = t35;
    } else {
        t35 = $[73];
    }
    let t36;
    if ($[74] !== profile) {
        t36 = profile?.website && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: profile.website,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                    size: 13,
                    className: "text-[var(--accent-brand)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 431,
                    columnNumber: 199
                }, this),
                profile.website.replace(/^https?:\/\//, "")
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 431,
            columnNumber: 31
        }, this);
        $[74] = profile;
        $[75] = t36;
    } else {
        t36 = $[75];
    }
    let t37;
    if ($[76] !== profile) {
        t37 = profile?.foundedYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5 text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                    size: 13,
                    className: "text-[var(--accent-brand)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 439,
                    columnNumber: 101
                }, this),
                "Founded ",
                profile.foundedYear
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 439,
            columnNumber: 35
        }, this);
        $[76] = profile;
        $[77] = t37;
    } else {
        t37 = $[77];
    }
    let t38;
    if ($[78] !== profile) {
        t38 = profile?.employees && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5 text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    size: 13,
                    className: "text-[var(--accent-brand)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 447,
                    columnNumber: 99
                }, this),
                profile.employees,
                " employees"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 447,
            columnNumber: 33
        }, this);
        $[78] = profile;
        $[79] = t38;
    } else {
        t38 = $[79];
    }
    let t39;
    if ($[80] !== profile) {
        t39 = profile?.headquarters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5 text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                    size: 13,
                    className: "text-[var(--accent-brand)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 455,
                    columnNumber: 102
                }, this),
                "HQ: ",
                profile.headquarters
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 455,
            columnNumber: 36
        }, this);
        $[80] = profile;
        $[81] = t39;
    } else {
        t39 = $[81];
    }
    let t40;
    if ($[82] !== profile) {
        t40 = profile?.creditRating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5 text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                    size: 13,
                    className: "text-[var(--accent-brand)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 463,
                    columnNumber: 102
                }, this),
                "Rating: ",
                profile.creditRating,
                " ",
                profile.creditRatingAgency ? `(${profile.creditRatingAgency})` : ""
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 463,
            columnNumber: 36
        }, this);
        $[82] = profile;
        $[83] = t40;
    } else {
        t40 = $[83];
    }
    let t41;
    if ($[84] !== t36 || $[85] !== t37 || $[86] !== t38 || $[87] !== t39 || $[88] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 flex items-center gap-4 flex-wrap text-xs",
            children: [
                t36,
                t37,
                t38,
                t39,
                t40
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 471,
            columnNumber: 11
        }, this);
        $[84] = t36;
        $[85] = t37;
        $[86] = t38;
        $[87] = t39;
        $[88] = t40;
        $[89] = t41;
    } else {
        t41 = $[89];
    }
    let t42;
    if ($[90] !== t33 || $[91] !== t35 || $[92] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 flex-wrap",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    t33,
                    t35,
                    t41
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 483,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 483,
            columnNumber: 11
        }, this);
        $[90] = t33;
        $[91] = t35;
        $[92] = t41;
        $[93] = t42;
    } else {
        t42 = $[93];
    }
    let t43;
    if ($[94] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = {
            color: "var(--text-primary)"
        };
        $[94] = t43;
    } else {
        t43 = $[94];
    }
    let t44;
    if ($[95] !== stock.price) {
        t44 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(stock.price);
        $[95] = stock.price;
        $[96] = t44;
    } else {
        t44 = $[96];
    }
    let t45;
    if ($[97] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-4xl font-bold font-mono tracking-tight",
            style: t43,
            children: t44
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 510,
            columnNumber: 11
        }, this);
        $[97] = t44;
        $[98] = t45;
    } else {
        t45 = $[98];
    }
    let t46;
    if ($[99] !== stock.pctChange1d) {
        t46 = stock.pctChange1d != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold font-mono",
            style: {
                color: "var(--text-primary)"
            },
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSignedChange"])(stock.pctChange1d)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 518,
            columnNumber: 40
        }, this);
        $[99] = stock.pctChange1d;
        $[100] = t46;
    } else {
        t46 = $[100];
    }
    let t47;
    if ($[101] !== t45 || $[102] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 flex items-end gap-3 flex-wrap",
            children: [
                t45,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 528,
            columnNumber: 11
        }, this);
        $[101] = t45;
        $[102] = t46;
        $[103] = t47;
    } else {
        t47 = $[103];
    }
    let t48;
    if ($[104] !== t42 || $[105] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0 flex-1",
            children: [
                t42,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 537,
            columnNumber: 11
        }, this);
        $[104] = t42;
        $[105] = t47;
        $[106] = t48;
    } else {
        t48 = $[106];
    }
    let t49;
    if ($[107] !== symbol) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start pt-1",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FollowButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FollowButton"], {
                symbol: symbol
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 546,
                columnNumber: 50
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 546,
            columnNumber: 11
        }, this);
        $[107] = symbol;
        $[108] = t49;
    } else {
        t49 = $[108];
    }
    let t50;
    if ($[109] !== t48 || $[110] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-4 flex-wrap",
            children: [
                t48,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 554,
            columnNumber: 11
        }, this);
        $[109] = t48;
        $[110] = t49;
        $[111] = t50;
    } else {
        t50 = $[111];
    }
    let t51;
    if ($[112] !== keyMetrics) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-3 lg:grid-cols-3",
            children: keyMetrics.map(_StockPageKeyMetricsMap)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 563,
            columnNumber: 11
        }, this);
        $[112] = keyMetrics;
        $[113] = t51;
    } else {
        t51 = $[113];
    }
    let t52;
    if ($[114] !== isNeg || $[115] !== isPos || $[116] !== profile) {
        t52 = profile?.analystRatings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 rounded-xl border px-4 py-4",
            style: {
                background: "var(--background)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3 flex-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: "Street View"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 574,
                            columnNumber: 75
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `rounded-full px-2.5 py-1 text-[11px] font-semibold ${isPos ? "text-emerald-500 bg-emerald-500/10" : isNeg ? "text-rose-500 bg-rose-500/10" : "text-muted-foreground bg-muted/20"}`,
                            children: isPos ? "Positive day" : isNeg ? "Negative day" : "Flat day"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 576,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 574,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 grid grid-cols-3 gap-2 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] uppercase tracking-wide text-emerald-500",
                                    children: "Buy"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 576,
                                    columnNumber: 362
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-lg font-semibold font-mono",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: profile.analystRatings.buy
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 576,
                                    columnNumber: 441
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 576,
                            columnNumber: 357
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] uppercase tracking-wide text-amber-500",
                                    children: "Hold"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 578,
                                    columnNumber: 59
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-lg font-semibold font-mono",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: profile.analystRatings.hold
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 578,
                                    columnNumber: 137
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 578,
                            columnNumber: 54
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] uppercase tracking-wide text-rose-500",
                                    children: "Sell"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 580,
                                    columnNumber: 60
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-lg font-semibold font-mono",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: profile.analystRatings.sell
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                    lineNumber: 580,
                                    columnNumber: 137
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 580,
                            columnNumber: 55
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 576,
                    columnNumber: 300
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 571,
            columnNumber: 38
        }, this);
        $[114] = isNeg;
        $[115] = isPos;
        $[116] = profile;
        $[117] = t52;
    } else {
        t52 = $[117];
    }
    let t53;
    if ($[118] !== t50 || $[119] !== t51 || $[120] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border px-6 pb-8 pt-6 mb-10",
            style: t25,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-4 flex-wrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        t50,
                        t51,
                        t52
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 592,
                    columnNumber: 145
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 592,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 592,
            columnNumber: 11
        }, this);
        $[118] = t50;
        $[119] = t51;
        $[120] = t52;
        $[121] = t53;
    } else {
        t53 = $[121];
    }
    const t54 = stock.price ?? null;
    const t55 = stock.pctChange1d ?? null;
    let t56;
    if ($[122] !== symbol || $[123] !== t54 || $[124] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$EmbeddedChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedChart"], {
            symbol: symbol,
            currentPrice: t54,
            priceChange: t55
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 604,
            columnNumber: 11
        }, this);
        $[122] = symbol;
        $[123] = t54;
        $[124] = t55;
        $[125] = t56;
    } else {
        t56 = $[125];
    }
    let t57;
    let t58;
    let t59;
    if ($[126] !== symbol) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FinancialsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FinancialsSection"], {
            symbol: symbol
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 616,
            columnNumber: 11
        }, this);
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$OwnershipSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OwnershipSection"], {
            symbol: symbol
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 617,
            columnNumber: 11
        }, this);
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$AnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalyticsSection"], {
            symbol: symbol
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 618,
            columnNumber: 11
        }, this);
        $[126] = symbol;
        $[127] = t57;
        $[128] = t58;
        $[129] = t59;
    } else {
        t57 = $[127];
        t58 = $[128];
        t59 = $[129];
    }
    let t60;
    if ($[130] !== stock.debtEquity || $[131] !== stock.dividendYield || $[132] !== stock.marketCapCr || $[133] !== stock.pb || $[134] !== stock.pe || $[135] !== stock.roce || $[136] !== stock.roe) {
        t60 = {
            peTtm: stock.pe,
            roce: stock.roce,
            roe: stock.roe,
            pb: stock.pb,
            debtEquity: stock.debtEquity,
            dividendYield: stock.dividendYield,
            marketCapCr: stock.marketCapCr
        };
        $[130] = stock.debtEquity;
        $[131] = stock.dividendYield;
        $[132] = stock.marketCapCr;
        $[133] = stock.pb;
        $[134] = stock.pe;
        $[135] = stock.roce;
        $[136] = stock.roe;
        $[137] = t60;
    } else {
        t60 = $[137];
    }
    let t61;
    if ($[138] !== symbol || $[139] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$PeersSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PeersSection"], {
            symbol: symbol,
            currentRatios: t60
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 652,
            columnNumber: 11
        }, this);
        $[138] = symbol;
        $[139] = t60;
        $[140] = t61;
    } else {
        t61 = $[140];
    }
    let t62;
    if ($[141] !== symbol) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$DocumentsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentsSection"], {
            symbol: symbol
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 661,
            columnNumber: 11
        }, this);
        $[141] = symbol;
        $[142] = t62;
    } else {
        t62 = $[142];
    }
    let t63;
    if ($[143] !== t56 || $[144] !== t57 || $[145] !== t58 || $[146] !== t59 || $[147] !== t61 || $[148] !== t62) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-10",
            children: [
                t56,
                t57,
                t58,
                t59,
                t61,
                t62
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 669,
            columnNumber: 11
        }, this);
        $[143] = t56;
        $[144] = t57;
        $[145] = t58;
        $[146] = t59;
        $[147] = t61;
        $[148] = t62;
        $[149] = t63;
    } else {
        t63 = $[149];
    }
    let t64;
    if ($[150] !== t53 || $[151] !== t63) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-w-0 pb-12",
            children: [
                t23,
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto mt-6 w-full max-w-[1180px]",
                    children: [
                        t53,
                        t63
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 682,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 682,
            columnNumber: 11
        }, this);
        $[150] = t53;
        $[151] = t63;
        $[152] = t64;
    } else {
        t64 = $[152];
    }
    return t64;
}
_s(StockPage, "ZMVf5JFzj7JnLPBwnKfrCCBmzwQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = StockPage;
function _StockPageKeyMetricsMap(metric) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border px-4 py-3",
        style: {
            background: "var(--background)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] font-semibold uppercase tracking-[0.18em]",
                style: {
                    color: "var(--text-muted)"
                },
                children: metric.label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 695,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-base font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataValue"], {
                    value: metric.value,
                    reason: metric.reason,
                    className: "metric-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 699,
                    columnNumber: 8
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 697,
                columnNumber: 28
            }, this)
        ]
    }, metric.label, true, {
        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
        lineNumber: 692,
        columnNumber: 10
    }, this);
}
function _StockPageIdentityChipsMap(chip) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        style: {
            borderColor: "var(--border)",
            background: "var(--surface-elevated)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: chip
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 705,
            columnNumber: 6
        }, this)
    }, chip, false, {
        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
        lineNumber: 702,
        columnNumber: 10
    }, this);
}
function _StockPageFormatMetricRange(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(value, {
        decimals: 0
    });
}
var _c;
__turbopack_context__.k.register(_c, "StockPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_30611fa9._.js.map