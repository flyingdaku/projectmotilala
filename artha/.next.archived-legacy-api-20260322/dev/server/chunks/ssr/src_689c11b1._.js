module.exports = [
"[project]/src/components/stock/SectionNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionNav",
    ()=>SectionNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
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
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        observerRef.current = new IntersectionObserver((entries)=>{
            const visible = entries.filter((e)=>e.isIntersecting).sort((a, b)=>b.intersectionRatio - a.intersectionRatio);
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
        SECTIONS.forEach(({ id })=>{
            const el = document.getElementById(id);
            if (el) observerRef.current.observe(el);
        });
        return ()=>observerRef.current?.disconnect();
    }, []);
    const scrollTo = (id)=>{
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top,
                behavior: "smooth"
            });
        }
        setActive(id);
        setMobileOpen(false);
    };
    const activeLabel = SECTIONS.find((s)=>s.id === active)?.label ?? "Overview";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "sticky top-[64px] z-30 w-full border-b backdrop-blur-xl -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-4 md:mb-8",
        style: {
            background: "color-mix(in srgb, var(--background) 94%, transparent)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto px-6 md:px-8 hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-8 overflow-x-auto",
                    children: SECTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>scrollTo(s.id),
                            className: `whitespace-nowrap border-b-[3px] px-0 py-3 text-sm transition-colors ${active === s.id ? "font-semibold" : "font-medium"}`,
                            style: active === s.id ? {
                                color: "var(--text-primary)",
                                borderBottomColor: "var(--text-primary)"
                            } : {
                                color: "var(--text-muted)",
                                borderBottomColor: "transparent"
                            },
                            children: s.label
                        }, s.id, false, {
                            fileName: "[project]/src/components/stock/SectionNav.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/SectionNav.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/SectionNav.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-[1600px] md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMobileOpen((o)=>!o),
                        className: "flex w-full items-center justify-between px-0 py-3 text-sm font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Jump to: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: activeLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/SectionNav.tsx",
                                        lineNumber: 97,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/SectionNav.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 16,
                                className: `transition-transform ${mobileOpen ? "rotate-180" : ""}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/SectionNav.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/SectionNav.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 overflow-hidden rounded-xl border",
                        style: {
                            background: "var(--surface)",
                            borderColor: "var(--border)"
                        },
                        children: SECTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>scrollTo(s.id),
                                className: `w-full text-left px-4 py-3 text-sm transition-colors ${active === s.id ? "font-semibold" : "hover:bg-[var(--surface-elevated)]"}`,
                                style: {
                                    color: active === s.id ? "var(--text-primary)" : "var(--text-primary)",
                                    background: active === s.id ? "var(--surface-elevated)" : undefined
                                },
                                children: s.label
                            }, s.id, false, {
                                fileName: "[project]/src/components/stock/SectionNav.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/SectionNav.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/SectionNav.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/SectionNav.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/core/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/charting/core/ChartEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-ssr] (ecmascript)");
;
;
class ChartEngine {
    _chart = null;
    _container = null;
    _resizeObserver = null;
    _crosshairSubs = new Set();
    _theme = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIGHT_THEME"];
    // ── Lifecycle ──────────────────────────────────────────────────────────────
    /** Initialise the chart into the given DOM container. */ init(container, theme = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIGHT_THEME"]) {
        if (this._chart) this.destroy();
        this._container = container;
        this._theme = theme;
        this._chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChart"])(container, this._buildOptions(this._theme));
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
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CrosshairMode"].Normal,
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
}),
"[project]/src/components/charting/core/PaneManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/charting/core/SeriesManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-ssr] (ecmascript)");
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CandlestickSeries"], {
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarSeries"], {
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarSeries"], {
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSeries"], opts, paneIndex);
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaSeries"], opts, paneIndex);
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
        const series = this._chart.addSeries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HistogramSeries"], opts, paneIndex);
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
}),
"[project]/src/components/charting/data/useChartData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartData",
    ()=>useChartData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
/**
 * useChartData — React hook that fetches OHLCV bars from the existing
 * /api/stocks/[symbol]/chart endpoint and returns them as OHLCVBar[].
 *
 * Maps the server's PriceBar (date string) to lightweight-charts time (Unix seconds).
 */ 'use client';
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
    const [bars, setBars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rev, setRev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setRev((r)=>r + 1), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!symbol) return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        const range = TF_TO_RANGE[timeframe] ?? '3y';
        fetch(`/api/stocks/${encodeURIComponent(symbol)}/chart?range=${range}&tf=${timeframe}`).then((r)=>{
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).then((data)=>{
            if (cancelled) return;
            if (data.error) throw new Error(data.error);
            const mapped = (data.prices ?? []).map((p)=>({
                    time: dateStrToUnix(p.date),
                    open: toFiniteNumber(p.open),
                    high: toFiniteNumber(p.high),
                    low: toFiniteNumber(p.low),
                    close: toFiniteNumber(p.close),
                    volume: toFiniteNumber(p.volume, 0)
                }))// ascending by time (lwc requirement)
            .sort((a, b)=>a.time - b.time);
            // Strictly increasing deduplication (lwc requirement)
            const deduped = [];
            for (const b of mapped){
                if (deduped.length === 0 || b.time > deduped[deduped.length - 1].time) {
                    deduped.push(b);
                }
            }
            setBars(deduped);
        }).catch((e)=>{
            if (!cancelled) setError(String(e.message ?? e));
        }).finally(()=>{
            if (!cancelled) setLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        symbol,
        timeframe,
        rev
    ]);
    return {
        bars,
        loading,
        error,
        refetch
    };
}
}),
"[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/charting/indicators/overlays/SMA.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SMAIndicator",
    ()=>SMAIndicator,
    "createSMA",
    ()=>createSMA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class SMAIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sma"])(closes, period);
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
}),
"[project]/src/components/charting/indicators/overlays/EMA.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMAIndicator",
    ()=>EMAIndicator,
    "createEMA",
    ()=>createEMA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class EMAIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ema"])(bars.map((b)=>b.close), period);
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
}),
"[project]/src/components/charting/indicators/overlays/BollingerBands.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BollingerBandsIndicator",
    ()=>BollingerBandsIndicator,
    "createBB",
    ()=>createBB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class BollingerBandsIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const { upper, mid, lower } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bollingerBands"])(bars.map((b)=>b.close), period, mult);
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
}),
"[project]/src/components/charting/indicators/overlays/VWAP.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VWAPIndicator",
    ()=>VWAPIndicator,
    "createVWAP",
    ()=>createVWAP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class VWAPIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'VWAP';
    get label() {
        return 'VWAP';
    }
    get defaultParams() {
        return {};
    }
    compute(bars) {
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vwap"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), bars.map((b)=>b.volume ?? 0));
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
}),
"[project]/src/components/charting/indicators/subpane/RSI.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSIIndicator",
    ()=>RSIIndicator,
    "createRSI",
    ()=>createRSI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class RSIIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rsi"])(bars.map((b)=>b.close), period);
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
}),
"[project]/src/components/charting/indicators/subpane/MACD.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MACDIndicator",
    ()=>MACDIndicator,
    "createMACD",
    ()=>createMACD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class MACDIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const { macd: macdLine, signal: signalLine, hist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["macd"])(bars.map((b)=>b.close), fast, slow, signal);
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
}),
"[project]/src/components/charting/indicators/subpane/Stochastic.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StochasticIndicator",
    ()=>StochasticIndicator,
    "createStochastic",
    ()=>createStochastic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class StochasticIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const { k, d } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stochastic"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), kP, dP);
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
}),
"[project]/src/components/charting/indicators/subpane/ATR.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATRIndicator",
    ()=>ATRIndicator,
    "createATR",
    ()=>createATR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class ATRIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atr"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), period);
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
}),
"[project]/src/components/charting/indicators/subpane/OBV.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OBVIndicator",
    ()=>OBVIndicator,
    "createOBV",
    ()=>createOBV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class OBVIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
    static TYPE = 'OBV';
    get label() {
        return 'OBV';
    }
    get defaultParams() {
        return {};
    }
    compute(bars) {
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["obv"])(bars.map((b)=>b.close), bars.map((b)=>b.volume ?? 0));
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
}),
"[project]/src/components/charting/indicators/subpane/CCI.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CCIIndicator",
    ()=>CCIIndicator,
    "createCCI",
    ()=>createCCI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/IndicatorBase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/math.ts [app-ssr] (ecmascript)");
;
;
class CCIIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$IndicatorBase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorBase"] {
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
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cci"])(bars.map((b)=>b.high), bars.map((b)=>b.low), bars.map((b)=>b.close), period);
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
}),
"[project]/src/components/charting/indicators/registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$SMA$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/SMA.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$EMA$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/EMA.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$BollingerBands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/BollingerBands.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$VWAP$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/overlays/VWAP.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$RSI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/RSI.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$MACD$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/MACD.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$Stochastic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/Stochastic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$ATR$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/ATR.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$OBV$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/OBV.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$CCI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/subpane/CCI.ts [app-ssr] (ecmascript)");
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$SMA$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSMA"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$EMA$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEMA"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$BollingerBands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBB"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$overlays$2f$VWAP$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVWAP"], {
    type: 'VWAP',
    label: 'VWAP',
    category: 'overlay',
    group: 'Volume',
    description: 'Volume-weighted average price since session start.',
    defaultParams: {},
    defaultColor: '#EC4899'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$RSI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRSI"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$MACD$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMACD"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$Stochastic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStochastic"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$ATR$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createATR"], {
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
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$OBV$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOBV"], {
    type: 'OBV',
    label: 'On Balance Volume',
    category: 'subpane',
    group: 'Volume',
    description: 'Cumulative volume momentum indicator.',
    defaultParams: {},
    defaultColor: '#06B6D4'
});
INDICATOR_REGISTRY.register(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$subpane$2f$CCI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCCI"], {
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
}),
"[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
;
function clampCoverage(value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(1, value));
}
function getCoverage(values) {
    if (values.length === 0) return 0;
    const populated = values.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasDataValue"]).length;
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
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasDataValue"])(selector(row))) populated += 1;
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
}),
"[project]/src/components/charting/EmbeddedChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedChart",
    ()=>EmbeddedChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * EmbeddedChart — compact chart embedded in the company/stock page.
 *
 * Shows a lightweight-charts v5 candlestick + volume chart with:
 *  - Range/timeframe quick selector
 *  - "Open full chart" button that triggers fullscreen mode via Zustand
 *  - All tools, indicators, and layouts available in fullscreen mode
 *
 * This replaces the previous recharts-based ChartSection.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as LockOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/ChartEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/PaneManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/SeriesManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/data/useChartData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/theme-context.tsx [app-ssr] (ecmascript)");
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
function EmbeddedChart({ symbol, currentPrice, priceChange }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartEngine"]());
    const pmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const smRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeInds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setSymbol, indicators, isDark, timeframe, setTimeframe, chartType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { appearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const initialThemeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChartTheme"])(isDark ? 'dark' : 'light', appearance.chartContrast));
    const [selectedPeriod, setSelectedPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1y');
    const [isChartLocked, setIsChartLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { bars, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartData"])(symbol, timeframe);
    const selectedWindowBars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (bars.length === 0) return [];
        const config = QUICK_PERIODS.find((period)=>period.label === selectedPeriod);
        if (!config) return bars;
        const anchorTime = bars[bars.length - 1]?.time ?? 0;
        const cutoffTime = anchorTime - config.days * 86400;
        const visible = bars.filter((bar)=>bar.time >= cutoffTime);
        return visible.length > 1 ? visible : bars;
    }, [
        bars,
        selectedPeriod
    ]);
    const periodReturn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedWindowBars.length < 2) return null;
        const start = selectedWindowBars[0];
        const end = selectedWindowBars[selectedWindowBars.length - 1];
        if (!start?.open) return null;
        return (end.close - start.open) / start.open * 100;
    }, [
        selectedWindowBars
    ]);
    const chartMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDataMeta"])({
            asOf: selectedWindowBars[selectedWindowBars.length - 1] ? new Date(selectedWindowBars[selectedWindowBars.length - 1].time * 1000).toISOString() : null,
            coverage: selectedWindowBars.length > 1 ? 1 : 0,
            status: selectedWindowBars.length > 1 ? 'delayed' : 'unavailable',
            note: selectedWindowBars.length > 0 ? `${selectedWindowBars.length} sessions in view` : 'No price history loaded'
        }), [
        selectedWindowBars
    ]);
    const chartTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChartTheme"])(isDark ? 'dark' : 'light', appearance.chartContrast), [
        appearance.chartContrast,
        isDark
    ]);
    // Sync symbol into the store
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSymbol(symbol);
    }, [
        symbol,
        setSymbol
    ]);
    // ── Init engine ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = canvasRef.current;
        if (!container) return;
        const engine = engineRef.current;
        const indicatorRegistry = activeInds.current;
        const chart = engine.init(container, initialThemeRef.current);
        pmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaneManager"](chart);
        smRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SeriesManager"](chart);
        return ()=>{
            engine.destroy();
            pmRef.current = null;
            smRef.current = null;
            indicatorRegistry.clear();
        };
    }, []);
    // ── Apply chart lock/unlock ────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const chart = engineRef.current.api;
        if (!chart) return;
        chart.applyOptions({
            handleScroll: !isChartLocked,
            handleScale: !isChartLocked
        });
    }, [
        isChartLocked
    ]);
    // ── Apply theme ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        engineRef.current.applyTheme(chartTheme);
    }, [
        chartTheme
    ]);
    // ── Render series ──────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sm = smRef.current;
        const pm = pmRef.current;
        const engine = engineRef.current;
        if (!sm || !pm || !engine.isInitialised || bars.length === 0) return;
        const th = chartTheme;
        sm.remove('main');
        sm.remove('volume');
        if (chartType === 'candlestick') {
            sm.addCandlestick('main', th, 0, {
                upColor: th.upColor,
                downColor: th.downColor,
                borderUpColor: th.upColor,
                borderDownColor: th.downColor,
                wickUpColor: th.upColor,
                wickDownColor: th.downColor
            });
        } else if (chartType === 'ohlc') {
            sm.addOhlc('main', th, 0, {
                upColor: th.upColor,
                downColor: th.downColor
            });
        } else if (chartType === 'line') {
            sm.addLine('main', 0, {
                color: th.upColor,
                lineWidth: 2,
                priceLineVisible: false,
                lastValueVisible: true
            });
        } else {
            sm.addArea('main', 0, {
                lineColor: isDark ? '#3B82F6' : '#4338CA',
                topColor: th.areaFillColor,
                bottomColor: 'transparent',
                lineWidth: 2,
                priceLineVisible: false,
                lastValueVisible: true
            });
        }
        sm.setOHLCVData('main', bars);
        // Volume (overlay on pane 0 for embedded)
        sm.addHistogram('volume', 0, {
            priceLineVisible: false,
            lastValueVisible: false,
            priceScaleId: 'volume'
        });
        engine.api.priceScale('volume').applyOptions({
            scaleMargins: {
                top: 0.9,
                bottom: 0
            }
        });
        sm.setVolumeData('volume', bars, th.volumeUpColor, th.volumeDownColor);
        // Clip to selected period
        if (selectedPeriod !== 'all') {
            const p = QUICK_PERIODS.find((p)=>p.label === selectedPeriod);
            if (p) {
                const cutoffTime = Math.floor(Date.now() / 1000) - p.days * 86400;
                const visibleBars = bars.filter((b)=>b.time >= cutoffTime);
                if (visibleBars.length > 1) {
                    engineRef.current.api.timeScale().setVisibleRange({
                        from: visibleBars[0].time,
                        to: visibleBars[visibleBars.length - 1].time
                    });
                }
            }
        } else {
            engine.fitContent();
        }
    }, [
        bars,
        chartTheme,
        chartType,
        isDark,
        selectedPeriod
    ]);
    // ── Sync indicators ────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sm = smRef.current;
        const pm = pmRef.current;
        if (!sm || !pm) return;
        const th = chartTheme;
        const ids = new Set(indicators.map((c)=>c.id));
        activeInds.current.forEach((ind, id)=>{
            if (!ids.has(id)) {
                ind.detach();
                activeInds.current.delete(id);
            }
        });
        indicators.forEach((config)=>{
            if (!activeInds.current.has(config.id)) {
                try {
                    const ind = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].create(config);
                    ind.attach(sm, pm, th);
                    if (bars.length > 0) ind.updateData(bars);
                    activeInds.current.set(config.id, ind);
                } catch (e) {
                    console.warn('Indicator attach failed:', e);
                }
            }
        });
        if (bars.length > 0) {
            activeInds.current.forEach((ind)=>ind.updateData(bars));
        }
    }, [
        bars,
        chartTheme,
        indicators
    ]);
    // ── Period selector handler ────────────────────────────────────────────────
    const handlePeriodSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((period)=>{
        setSelectedPeriod(period);
        const p = QUICK_PERIODS.find((p)=>p.label === period);
        if (p && timeframe !== p.tf) setTimeframe(p.tf);
    }, [
        timeframe,
        setTimeframe
    ]);
    const handleOpenFullChart = ()=>{
        router.push(`/stocks/${symbol}/chart`);
    };
    const isPos = (priceChange ?? 0) > 0;
    const isNeg = (priceChange ?? 0) < 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "chart",
        className: "scroll-mt-28 space-y-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-2xl border shadow-sm",
            style: {
                background: 'color-mix(in srgb, var(--surface) 96%, transparent)',
                borderColor: 'var(--border)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b",
                    style: {
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-base font-semibold",
                                        style: {
                                            color: 'var(--text-primary)'
                                        },
                                        children: "Price Chart"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex flex-wrap items-center gap-2 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "metric-mono font-semibold",
                                                style: {
                                                    color: 'var(--text-primary)'
                                                },
                                                children: currentPrice != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(currentPrice) : 'Unavailable'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "metric-mono rounded-full px-2 py-0.5",
                                                style: {
                                                    background: isPos ? 'var(--bull-tint)' : isNeg ? 'var(--bear-tint)' : 'var(--bg-hover)',
                                                    color: isPos ? 'var(--bull-strong)' : isNeg ? 'var(--bear-strong)' : 'var(--text-secondary)'
                                                },
                                                children: priceChange != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSignedChange"])(priceChange, 2, '%') : 'Flat'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            periodReturn != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: periodReturn >= 0 ? 'var(--bull-strong)' : 'var(--bear-strong)'
                                                },
                                                children: [
                                                    selectedPeriod.toUpperCase(),
                                                    " return ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSignedChange"])(periodReturn, 2, '%')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                                lineNumber: 270,
                                                columnNumber: 19
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex rounded-xl border border-border bg-muted/20 p-0.5",
                                    children: QUICK_PERIODS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handlePeriodSelect(p.label),
                                            className: `px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedPeriod === p.label ? 'bg-background shadow-sm text-foreground border border-border' : 'text-muted-foreground hover:text-foreground'}`,
                                            children: p.label.toUpperCase()
                                        }, p.label, false, {
                                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsChartLocked(!isChartLocked),
                                    className: `flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${isChartLocked ? 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40' : 'border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--brand-tint)] hover:opacity-90'}`,
                                    title: isChartLocked ? 'Chart locked (click to unlock zoom/scroll)' : 'Chart unlocked (click to lock)',
                                    children: isChartLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                        lineNumber: 304,
                                        columnNumber: 32
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__["LockOpen"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                        lineNumber: 304,
                                        columnNumber: 53
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleOpenFullChart,
                                    className: "flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-[var(--brand-primary)] transition-all",
                                    title: "Toggle fullscreen mode",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, this),
                                        "Open Full Chart"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    style: {
                        height: 400
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: canvasRef,
                            className: "w-full h-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center bg-background/60 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                size: 24,
                                className: "animate-spin text-[var(--brand-primary)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                lineNumber: 325,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center bg-background/80 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--bear-strong)]",
                                children: [
                                    "Failed to load chart: ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                lineNumber: 331,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this),
                        !loading && bars.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "No price data available"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                                lineNumber: 337,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-t px-5 py-3",
                    style: {
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[11px]",
                            style: {
                                color: 'var(--text-muted)'
                            },
                            children: selectedWindowBars.length > 1 ? `Viewing ${selectedPeriod.toUpperCase()} window through ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateLabel"])(chartMeta.asOf ?? undefined)}.` : 'Review long-range structure here first. Switch to fullscreen only for indicators, drawings, and intraday work.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 344,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleOpenFullChart,
                            className: "text-[11px] font-medium transition-colors",
                            style: {
                                color: 'var(--brand-primary)'
                            },
                            children: "Open full charting mode →"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
            lineNumber: 249,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/charting/EmbeddedChart.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function DataMetaInline({ meta, className }) {
    if (!meta) return null;
    const parts = [
        meta.asOf ? `As of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateLabel"])(meta.asOf)}` : null,
        meta.status === "live" ? "Live" : meta.status === "delayed" ? "Delayed" : meta.status === "partial" ? "Partial coverage" : "Unavailable",
        meta.unitLabel ? meta.unitLabel : null
    ].filter(Boolean);
    if (parts.length === 0 && !meta.note) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-meta-inline", className),
        "aria-label": "Data freshness and coverage",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: parts.join(" · ")
            }, void 0, false, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            meta.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: meta.note
            }, void 0, false, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 30,
                columnNumber: 20
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function CoverageNotice({ meta, title = "Coverage note", message, action, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("stock-empty-state", className),
        role: "status",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-0.5 rounded-full border p-1.5",
                    style: {
                        borderColor: "rgba(245,158,11,0.25)",
                        background: "var(--accent-subtle)",
                        color: "var(--accent-brand)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm leading-6",
                            style: {
                                color: "var(--text-secondary)"
                            },
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        meta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCoverageLabel"])(meta.coverage)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                meta.asOf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Latest: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateLabel"])(meta.asOf)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                    lineNumber: 60,
                                    columnNumber: 28
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this) : null,
                        action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: action
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
function DataValue({ value, reason, className }) {
    const isUnavailable = typeof value === "string" && value === "-";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(isUnavailable ? "data-value data-value--empty" : "data-value", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            isUnavailable && reason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "data-note",
                children: reason
            }, void 0, false, {
                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                lineNumber: 83,
                columnNumber: 34
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function StickyMetricTable({ ariaLabel, columns, rows, latestColumnKey, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("stock-table-shell", className),
        role: "region",
        "aria-label": ariaLabel,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "stock-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "stock-table__sticky stock-table__header stock-table__metric-col",
                                children: "Parameters"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("stock-table__header stock-table__number", column.headerClassName, latestColumnKey === column.key && "stock-table__latest"),
                                    children: column.label
                                }, column.key, false, {
                                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("stock-table__row", row.rowClassName),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "row",
                                    className: "stock-table__sticky stock-table__metric-col",
                                    children: row.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("stock-table__number", column.cellClassName, latestColumnKey === column.key && "stock-table__latest"),
                                        children: row.values[column.key]
                                    }, column.key, false, {
                                        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, row.key, true, {
                            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stock/StockUiPrimitives.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/FinancialsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialsSection",
    ()=>FinancialsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// ── Helpers ──────────────────────────────────────────────────────────────────
function fmtV(value) {
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIndianNumber"])(value, 2, {
        fallback: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
    });
}
function fmtPct(value) {
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(value, 1);
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
function FinancialTable({ title, rows, data, getPeriodLabel, getPeriodKey, unitNote = "₹ Cr", viewMode = "quarterly", onViewModeChange }) {
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedRows, setSelectedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new Set(rows.slice(0, 2).map((r)=>r.key)));
    const [showPctChange, setShowPctChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showChart, setShowChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Chronological order: oldest first (left), latest last (right)
    const chronoData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...data
        ].reverse(), [
        data
    ]);
    // Scroll to right on mount and when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = scrollRef.current;
        if (el) {
            requestAnimationFrame(()=>{
                el.scrollLeft = el.scrollWidth;
            });
        }
    }, [
        chronoData
    ]);
    const toggleRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
        setSelectedRows((prev)=>{
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size > 1) next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }, []);
    const tooltipStyle = {
        backgroundColor: "var(--surface-elevated, #fff)",
        borderColor: "var(--border)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "var(--text-primary)"
    };
    // Build chart data from selected rows × chronoData
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return chronoData.map((row)=>{
            const entry = {
                period: getPeriodLabel(row)
            };
            rows.filter((r)=>selectedRows.has(r.key)).forEach((r)=>{
                const v = r.getValue(row);
                if (v != null) entry[r.label] = v;
            });
            return entry;
        });
    }, [
        chronoData,
        rows,
        selectedRows,
        getPeriodLabel
    ]);
    const selectedRowDefs = rows.filter((r)=>selectedRows.has(r.key));
    const hasChartData = chartData.some((d)=>Object.keys(d).length > 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fin-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-3 border-b",
                style: {
                    borderColor: 'var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold",
                        style: {
                            color: 'var(--text-primary)'
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "fin-footer-toggle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: showPctChange,
                                        onChange: (e)=>setShowPctChange(e.target.checked),
                                        className: "fin-footer-cb"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Show % change"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowChart(!showChart),
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${showChart ? 'border-amber-500/50 text-amber-500 bg-amber-500/10' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'}`,
                                title: showChart ? 'Hide chart' : 'Show chart',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    showChart ? 'Hide' : 'Show'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "fin-unit-note",
                                children: unitNote
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            onViewModeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
                                children: [
                                    "quarterly",
                                    "annual"
                                ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onViewModeChange(mode),
                                        className: `px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${viewMode === mode ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                        children: mode
                                    }, mode, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            showChart && hasChartData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fin-chart-area",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 220,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: chartData,
                        margin: {
                            top: 4,
                            right: 16,
                            left: 4,
                            bottom: 0
                        },
                        barCategoryGap: "28%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                vertical: false,
                                stroke: "var(--border)",
                                opacity: 0.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "period",
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    fontSize: 11,
                                    fill: "var(--text-muted)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                axisLine: false,
                                tickLine: false,
                                tick: {
                                    fontSize: 11,
                                    fill: "var(--text-muted)"
                                },
                                tickFormatter: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIndianNumber"])(v, 0, {
                                        fallback: ""
                                    }),
                                width: 60
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: tooltipStyle,
                                formatter: (value)=>[
                                        fmtV(value)
                                    ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 253,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                iconType: "circle",
                                wrapperStyle: {
                                    fontSize: "11px",
                                    paddingTop: "12px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: 0,
                                stroke: "var(--border)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 255,
                                columnNumber: 15
                            }, this),
                            selectedRowDefs.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: r.label,
                                    fill: CHART_COLORS[i % CHART_COLORS.length],
                                    radius: [
                                        3,
                                        3,
                                        0,
                                        0
                                    ],
                                    opacity: 0.9
                                }, r.key, false, {
                                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                    lineNumber: 257,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 249,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fin-table-shell",
                ref: scrollRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "fin-table",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "fin-th fin-th--param",
                                        style: {
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    chronoData.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "fin-th fin-th--period",
                                            style: idx === chronoData.length - 1 ? {
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0
                                            } : undefined,
                                            children: getPeriodLabel(row)
                                        }, getPeriodKey(row, idx), false, {
                                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: rows.map((rowDef, rowIdx)=>{
                                const isSelected = selectedRows.has(rowDef.key);
                                const isLastRow = rowIdx === rows.length - 1;
                                const values = chronoData.map((row)=>rowDef.getValue(row));
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `fin-tr${isSelected ? " fin-tr--selected" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "fin-td fin-td--param",
                                            style: isLastRow ? {
                                                borderBottom: 'none',
                                                borderBottomLeftRadius: '0.75rem'
                                            } : undefined,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "fin-row-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "fin-checkbox",
                                                        checked: isSelected,
                                                        onChange: ()=>toggleRow(rowDef.key),
                                                        "aria-label": `Select ${rowDef.label} for chart`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "fin-row-name",
                                                        children: rowDef.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                lineNumber: 288,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this),
                                        values.map((val, idx)=>{
                                            const prevVal = idx > 0 ? values[idx - 1] : null;
                                            const pctChange = showPctChange && !rowDef.isPercent ? calcChange(val, prevVal) : null;
                                            const isLastCell = isLastRow && idx === values.length - 1;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "fin-td fin-td--value",
                                                style: {
                                                    ...isLastRow ? {
                                                        borderBottom: 'none'
                                                    } : {},
                                                    ...isLastCell ? {
                                                        borderBottomRightRadius: '0.75rem'
                                                    } : {}
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "fin-val",
                                                        children: rowDef.isPercent ? fmtPct(val) : fmtV(val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 25
                                                    }, this),
                                                    showPctChange && !rowDef.isPercent && pctChange != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `fin-pct${pctChange >= 0 ? " fin-pct--pos" : " fin-pct--neg"}`,
                                                        children: [
                                                            pctChange >= 0 ? "▲" : "▼",
                                                            Math.abs(pctChange).toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, getPeriodKey(chronoData[idx], idx), true, {
                                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                                lineNumber: 305,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    ]
                                }, rowDef.key, true, {
                                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
// ── Row definitions ───────────────────────────────────────────────────────────
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
function FinancialsSection({ symbol }) {
    const [isConsolidated, setIsConsolidated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [plViewMode, setPlViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [bsViewMode, setBsViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [cfViewMode, setCfViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("annual");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedKey, setLoadedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const requestKey = `${symbol}-${isConsolidated ? "consolidated" : "standalone"}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/stocks/${symbol}/financials?consolidated=${isConsolidated}`).then(async (response)=>{
            const payload = await response.json();
            if (!response.ok || payload.error) {
                setData(null);
                setLoadedKey(requestKey);
                return;
            }
            setData(payload);
            setLoadedKey(requestKey);
        }).catch(()=>{
            setData(null);
            setLoadedKey(requestKey);
        });
    }, [
        requestKey,
        symbol,
        isConsolidated
    ]);
    const loading = loadedKey !== requestKey;
    const anomalies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data) return [];
        return data.anomalies?.length ? data.anomalies : detectAnomalies(data.quarterly, data.balanceSheets);
    }, [
        data
    ]);
    const statementRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data) return [];
        const source = plViewMode === "quarterly" ? data.quarterly : data.annual;
        return source;
    }, [
        data,
        plViewMode
    ]);
    const statementMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>data?.meta ?? null, [
        data
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "financials",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border flex items-center justify-center h-64",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                    lineNumber: 408,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 406,
            columnNumber: 7
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "financials",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                title: "Financial statements unavailable",
                message: "Financial history could not be loaded for this company view."
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/FinancialsSection.tsx",
            lineNumber: 416,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "financials",
        className: "scroll-mt-28 space-y-6",
        children: [
            anomalies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: anomalies.map((flag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${flag.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                size: 14,
                                className: `mt-0.5 flex-shrink-0 ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-500"}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 429,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-600"}`,
                                        children: [
                                            flag.severity,
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 431,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: flag.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                        lineNumber: 432,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                                lineNumber: 430,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${flag.type}-${i}`, true, {
                        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                        lineNumber: 428,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 426,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
                title: "Profit & Loss",
                rows: PL_ROWS,
                data: statementRows,
                viewMode: plViewMode,
                onViewModeChange: setPlViewMode,
                getPeriodLabel: (row)=>plViewMode === "quarterly" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEnd ?? row.quarter) : row.quarter ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEnd, {
                        annualAlias: true
                    }),
                getPeriodKey: (row, idx)=>periodKey(row.periodEnd ?? row.quarter, idx)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
                title: "Balance Sheet",
                rows: BALANCE_ROWS,
                data: data.balanceSheets,
                viewMode: bsViewMode,
                onViewModeChange: setBsViewMode,
                getPeriodLabel: (row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEndDate ?? row.periodEnd, {
                        annualAlias: true
                    }),
                getPeriodKey: (row, idx)=>periodKey(row.periodEndDate ?? row.periodEnd, idx)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 453,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialTable, {
                title: "Cash Flow",
                rows: CASH_ROWS,
                data: data.cashFlows,
                viewMode: cfViewMode,
                onViewModeChange: setCfViewMode,
                getPeriodLabel: (row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPeriodLabel"])(row.periodEndDate ?? row.periodEnd, {
                        annualAlias: true
                    }),
                getPeriodKey: (row, idx)=>periodKey(row.periodEndDate ?? row.periodEnd, idx)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FinancialsSection.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/FinancialsSection.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/OwnershipSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnershipSection",
    ()=>OwnershipSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
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
function OwnershipSection({ symbol }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("trend");
    const shareholding = data?.shareholding ?? [];
    const governance = data?.governance ?? null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/stocks/${symbol}/ownership`).then((r)=>r.json()).then((payload)=>{
            setData({
                shareholding: Array.isArray(payload?.shareholding) ? payload.shareholding : [],
                governance: payload?.governance ?? null,
                meta: payload?.meta
            });
            setLoadedSymbol(symbol);
        }).catch(()=>{
            setData(null);
            setLoadedSymbol(symbol);
        });
    }, [
        symbol
    ]);
    const trendData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (shareholding.length === 0) return [];
        return [
            ...shareholding
        ].reverse().map((s)=>({
                quarter: (s.quarterEnd ?? s.quarter ?? "").slice(0, 7),
                Promoter: s.promoterPct ?? 0,
                FII: s.fiiPct ?? 0,
                DII: s.diiPct ?? 0,
                MF: s.mfPct ?? 0,
                Public: s.publicPct ?? 0
            }));
    }, [
        shareholding
    ]);
    const latestDonut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (shareholding.length === 0) return [];
        const s = shareholding[0];
        return [
            {
                name: "Promoter",
                value: s.promoterPct ?? 0,
                color: SH_COLORS.Promoter
            },
            {
                name: "FII",
                value: s.fiiPct ?? 0,
                color: SH_COLORS.FII
            },
            {
                name: "DII",
                value: s.diiPct ?? 0,
                color: SH_COLORS.DII
            },
            {
                name: "MF",
                value: s.mfPct ?? 0,
                color: SH_COLORS.MF
            },
            {
                name: "Public",
                value: s.publicPct ?? 0,
                color: SH_COLORS.Public
            }
        ].filter((d)=>d.value > 0);
    }, [
        shareholding
    ]);
    const pledgeHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (shareholding.length === 0) return [];
        return [
            ...shareholding
        ].reverse().map((s)=>({
                quarter: (s.quarterEnd ?? s.quarter ?? "").slice(0, 7),
                "Promoter %": s.promoterPct ?? 0,
                "Pledge %": s.promoterPledgePct ?? 0
            }));
    }, [
        shareholding
    ]);
    const latestSh = shareholding[0];
    const pledgePct = latestSh?.promoterPledgePct ?? 0;
    // Calculate QoQ changes for institutional holdings
    const promoterQoQ = shareholding.length >= 2 ? shareholding[0].promoterChangeQoq ?? (shareholding[0].promoterPct ?? 0) - (shareholding[1].promoterPct ?? 0) : null;
    const fiiQoQ = shareholding.length >= 2 ? shareholding[0].fiiChangeQoq ?? (shareholding[0].fiiPct ?? 0) - (shareholding[1].fiiPct ?? 0) : null;
    const diiQoQ = shareholding.length >= 2 ? shareholding[0].diiChangeQoq ?? (shareholding[0].diiPct ?? 0) - (shareholding[1].diiPct ?? 0) : null;
    const mfQoQ = shareholding.length >= 2 ? (shareholding[0].mfPct ?? 0) - (shareholding[1].mfPct ?? 0) : null;
    // Identify significant changes (>1% absolute change)
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
    ].filter((item)=>item.change !== null && Math.abs(item.change) >= 1.0);
    const tooltipStyle = {
        backgroundColor: "var(--surface-elevated)",
        borderColor: "var(--border)",
        borderRadius: "8px",
        fontSize: "12px"
    };
    const axisStyle = {
        fontSize: 11,
        fill: "var(--text-muted)"
    };
    const meta = data?.meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDataMeta"])({
        asOfCandidates: [
            shareholding[0]?.quarterEnd,
            shareholding[0]?.quarter
        ],
        coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoverage"])([
            shareholding.length ? shareholding : null,
            governance
        ]),
        note: "Ownership updates are quarterly."
    });
    if (loadedSymbol !== symbol) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "ownership",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border flex items-center justify-center h-64",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "ownership",
        className: "scroll-mt-28 space-y-4",
        children: [
            significantChanges.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        size: 14,
                        className: "mt-0.5 flex-shrink-0 text-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Significant Institutional Changes:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 mt-1",
                                children: significantChanges.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: item.color
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: item.change > 0 ? "text-green-500" : "text-red-500",
                                                children: [
                                                    item.change > 0 ? "+" : "",
                                                    item.change.toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this),
            pledgePct > 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-start gap-3 p-3 rounded-lg border text-sm ${pledgePct > 30 ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        size: 14,
                        className: `mt-0.5 flex-shrink-0 ${pledgePct > 30 ? "text-red-400" : "text-yellow-400"}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    pledgePct.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            " of promoter holding is pledged",
                            pledgePct > 30 ? " — high risk, monitor closely" : " — moderate concern",
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 165,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 p-6 rounded-xl border",
                        style: {
                            background: "var(--surface)",
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-base font-semibold",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: "Shareholding Pattern"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 179,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                                                    meta: meta
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
                                        children: [
                                            "trend",
                                            "donut"
                                        ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveView(v),
                                                className: `px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${activeView === v ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground"}`,
                                                children: v
                                            }, v, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            activeView === "trend" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                                        data: trendData,
                                        margin: {
                                            top: 4,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3",
                                                vertical: false,
                                                stroke: "var(--border)",
                                                opacity: 0.4
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "quarter",
                                                axisLine: false,
                                                tickLine: false,
                                                tick: axisStyle,
                                                minTickGap: 40
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 199,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                axisLine: false,
                                                tickLine: false,
                                                tick: axisStyle,
                                                tickFormatter: (v)=>`${v}%`,
                                                width: 40,
                                                domain: [
                                                    0,
                                                    100
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 200,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: tooltipStyle,
                                                formatter: (v)=>[
                                                        `${v.toFixed(2)}%`
                                                    ]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                                iconType: "circle",
                                                wrapperStyle: {
                                                    fontSize: "11px",
                                                    paddingTop: "12px"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "Promoter",
                                                stackId: "1",
                                                stroke: SH_COLORS.Promoter,
                                                fill: SH_COLORS.Promoter,
                                                fillOpacity: 0.7
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "FII",
                                                stackId: "1",
                                                stroke: SH_COLORS.FII,
                                                fill: SH_COLORS.FII,
                                                fillOpacity: 0.7
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 204,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "DII",
                                                stackId: "1",
                                                stroke: SH_COLORS.DII,
                                                fill: SH_COLORS.DII,
                                                fillOpacity: 0.7
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "MF",
                                                stackId: "1",
                                                stroke: SH_COLORS.MF,
                                                fill: SH_COLORS.MF,
                                                fillOpacity: 0.7
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "Public",
                                                stackId: "1",
                                                stroke: SH_COLORS.Public,
                                                fill: SH_COLORS.Public,
                                                fillOpacity: 0.7
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-64 flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-48 h-48 flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: latestDonut,
                                                        cx: "50%",
                                                        cy: "50%",
                                                        innerRadius: 52,
                                                        outerRadius: 76,
                                                        paddingAngle: 2,
                                                        dataKey: "value",
                                                        children: latestDonut.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: d.color
                                                            }, i, false, {
                                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 50
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: tooltipStyle,
                                                        formatter: (v)=>[
                                                                `${v.toFixed(2)}%`
                                                            ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "flex-1 space-y-2 pl-4",
                                        children: latestDonut.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2.5 h-2.5 rounded-sm",
                                                                style: {
                                                                    background: d.color
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-secondary)"
                                                                },
                                                                children: d.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-medium",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: [
                                                            d.value.toFixed(2),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, d.name, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 226,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-xl border",
                                style: {
                                    background: "var(--surface)",
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold mb-3 flex items-center gap-2",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 14,
                                                style: {
                                                    color: "var(--accent-brand)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this),
                                            "QoQ Change"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            {
                                                label: "Promoter",
                                                val: promoterQoQ,
                                                current: latestSh?.promoterPct
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
                                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "var(--text-secondary)"
                                                        },
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-medium metric-mono",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: item.current != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(item.current, 2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 21
                                                            }, this),
                                                            item.val !== null && item.val !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-xs font-mono font-semibold metric-mono ${item.val > 0 ? "text-green-500" : item.val < 0 ? "text-red-500" : "text-muted-foreground"}`,
                                                                children: [
                                                                    item.val > 0 ? "▲" : item.val < 0 ? "▼" : "•",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSignedChange"])(item.val, 2, "")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, item.label, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-xl border",
                                style: {
                                    background: "var(--surface)",
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold mb-3 flex items-center gap-2",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                size: 14,
                                                style: {
                                                    color: pledgePct > 20 ? "#EF4444" : "var(--accent-brand)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, this),
                                            "Pledge Tracker"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    pledgeHistory.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-32",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                                data: pledgeHistory,
                                                margin: {
                                                    top: 4,
                                                    right: 0,
                                                    left: -20,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
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
                                                        lineNumber: 282,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 9,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        tickFormatter: (v)=>`${v}%`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: tooltipStyle,
                                                        formatter: (v)=>[
                                                                `${v.toFixed(2)}%`
                                                            ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
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
                                                        lineNumber: 285,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                                        meta: meta,
                                        title: "Pledge history unavailable",
                                        message: "Promoter pledge trend is hidden until the underlying shareholding dataset provides a usable history."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Current Pledge: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm font-bold font-mono metric-mono ${pledgePct > 20 ? "text-red-500" : pledgePct > 5 ? "text-yellow-600" : "text-green-500"}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(pledgePct, 2)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            governance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-xl border",
                                style: {
                                    background: "var(--surface)",
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold mb-3 flex items-center gap-2",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                size: 14,
                                                style: {
                                                    color: "var(--accent-brand)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            "Governance"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "var(--text-muted)"
                                                            },
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium font-mono metric-mono",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: item.text ?? (item.val !== null && item.val !== undefined ? `${item.val}${item.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"])
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, item.label, true, {
                                                    fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this)),
                                            governance.relatedPartyTxnFlag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 mt-2 text-yellow-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        size: 11
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Related party transactions flagged"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, this),
                                            governance.overallScore !== null && governance.overallScore !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 pt-2 border-t flex justify-between items-center",
                                                style: {
                                                    borderColor: "var(--border)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Overall Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/OwnershipSection.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/OwnershipSection.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/DocumentsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentsSection",
    ()=>DocumentsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-ssr] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"]
    },
    {
        key: "reports",
        label: "Annual Reports",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        key: "concalls",
        label: "Concalls & Transcripts",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"]
    },
    {
        key: "ratings",
        label: "Credit Ratings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"]
    },
    {
        key: "presentations",
        label: "Investor Presentations",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    }
];
const DOC_ICONS = {
    ANNUAL_REPORT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
        size: 16,
        className: "text-blue-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 19,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    CONCALL_TRANSCRIPT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        size: 16,
        className: "text-purple-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 20,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0)),
    CONCALL_AUDIO: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        size: 16,
        className: "text-purple-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 21,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    EXCHANGE_ANNOUNCEMENT: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
        size: 16,
        className: "text-amber-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 22,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0)),
    INVESTOR_PRESENTATION: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
        size: 16,
        className: "text-green-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 23,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0)),
    CREDIT_RATING: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
        size: 16,
        className: "text-red-400"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 24,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0))
};
const SENTIMENT_COLOR = (v)=>{
    if (v == null) return "var(--text-muted)";
    if (v >= 0.3) return "#10B981";
    if (v <= -0.3) return "#EF4444";
    return "#F59E0B";
};
const SENTIMENT_LABEL = (v)=>{
    if (v == null) return null;
    if (v >= 0.3) return "Positive";
    if (v <= -0.3) return "Negative";
    return "Neutral";
};
function DocCard({ doc }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-lg border transition-colors",
        style: {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-0.5",
                    children: DOC_ICONS[doc.docType] ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 47,
                        columnNumber: 60
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium leading-snug",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: doc.title ?? doc.docType.replace(/_/g, " ")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mt-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: doc.docDate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 17
                                                }, this),
                                                doc.fiscalYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                    lineNumber: 56,
                                                    columnNumber: 36
                                                }, this),
                                                doc.fiscalQuarter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: doc.fiscalQuarter
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 39
                                                }, this),
                                                doc.aiSentiment != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium px-1.5 py-0.5 rounded-full",
                                                    style: {
                                                        color: SENTIMENT_COLOR(doc.aiSentiment ?? null),
                                                        background: `${SENTIMENT_COLOR(doc.aiSentiment ?? null)}18`,
                                                        border: `1px solid ${SENTIMENT_COLOR(doc.aiSentiment ?? null)}40`
                                                    },
                                                    children: SENTIMENT_LABEL(doc.aiSentiment ?? null)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 flex-shrink-0",
                                    children: [
                                        doc.fileUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: doc.fileUrl,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "p-1.5 rounded hover:bg-[var(--surface)] transition-colors",
                                            title: "Open",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                size: 13,
                                                style: {
                                                    color: "var(--text-muted)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this),
                                        doc.filePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: doc.filePath,
                                            download: true,
                                            className: "p-1.5 rounded hover:bg-[var(--surface)] transition-colors",
                                            title: "Download",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 13,
                                                style: {
                                                    color: "var(--text-muted)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        doc.aiSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setExpanded((v)=>!v),
                                    className: "flex items-center gap-1 text-xs font-medium",
                                    style: {
                                        color: "var(--accent-brand)"
                                    },
                                    children: [
                                        expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 88,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 88,
                                            columnNumber: 55
                                        }, this),
                                        "AI Summary"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-xs leading-relaxed",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    children: doc.aiSummary
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        (doc.aiKeyPoints?.length ?? 0) > 0 && expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-2 space-y-1",
                            children: (doc.aiKeyPoints ?? []).map((pt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-1.5 text-xs",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-1.5 w-1 h-1 rounded-full flex-shrink-0",
                                            style: {
                                                background: "var(--accent-brand)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this),
                                        pt
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
function DocumentsSection({ symbol }) {
    const [documents, setDocuments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadedKey, setLoadedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("announcements");
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const requestKey = `${symbol}-${activeTab}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/stocks/${symbol}/documents?category=${activeTab}`).then((r)=>r.json()).then((d)=>{
            setDocuments(d.documents ?? []);
            setMeta(d.meta ?? null);
            setLoadedKey(requestKey);
        }).catch(()=>{
            setDocuments([]);
            setMeta(null);
            setLoadedKey(requestKey);
        });
    }, [
        symbol,
        activeTab,
        requestKey
    ]);
    const effectiveMeta = meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDataMeta"])({
        asOfCandidates: [
            documents[0]?.docDate
        ],
        coverage: documents.length > 0 ? 1 : 0,
        status: documents.length > 0 ? "partial" : "unavailable"
    });
    const loading = loadedKey !== requestKey;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "documents",
        className: "scroll-mt-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b",
                    style: {
                        borderColor: "var(--border)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                    size: 20,
                                    style: {
                                        color: "var(--accent-brand)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: "Documents & Filings"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mt-1",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: "Corporate announcements, annual reports, concalls, and credit ratings"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                                meta: effectiveMeta
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b",
                    style: {
                        borderColor: "var(--border)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-0 overflow-x-auto px-6",
                        children: DOC_TABS.map(({ key, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(key),
                                "aria-pressed": activeTab === key,
                                className: `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === key ? "" : "hover:bg-[var(--surface-elevated)]"}`,
                                style: {
                                    borderColor: activeTab === key ? "var(--accent-brand)" : "transparent",
                                    color: activeTab === key ? "var(--accent-brand)" : "var(--text-muted)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    label
                                ]
                            }, key, true, {
                                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-48",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                            lineNumber: 188,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 187,
                        columnNumber: 13
                    }, this) : documents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                        meta: effectiveMeta,
                        title: `No ${DOC_TABS.find((tab)=>tab.key === activeTab)?.label.toLowerCase()} yet`,
                        message: activeTab === "announcements" ? "Corporate announcements have not been fetched for this company view yet." : activeTab === "reports" ? "Annual report coverage is missing or the latest filings have not been ingested." : activeTab === "concalls" ? "Concalls and transcripts are not connected for this issuer yet." : activeTab === "ratings" ? "Credit ratings are not available from the current document pipeline." : "Investor presentations are not available from the current pipeline."
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: documents.map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocCard, {
                                doc: doc
                            }, doc.id, false, {
                                fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                                lineNumber: 209,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                        lineNumber: 207,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/DocumentsSection.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/DocumentsSection.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stock/DocumentsSection.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/AnalyticsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsSection",
    ()=>AnalyticsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AnalyticsSection({ symbol }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMetric, setActiveMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("peTtm");
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const METRIC_LABELS = {
        peTtm: "P/E (TTM)",
        pb: "P/B",
        evEbitda: "EV/EBITDA",
        roce: "ROCE %",
        roe: "ROE %"
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/stocks/${symbol}/analytics`).then((r)=>r.json()).then((payload)=>{
            setData(payload);
            setLoadedSymbol(symbol);
        });
    }, [
        symbol
    ]);
    const loading = loadedSymbol !== symbol;
    const historicalChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data?.ratioHistory) return [];
        return [
            ...data.ratioHistory
        ].reverse().map((r)=>({
                date: r.computedDate?.slice(0, 7) ?? "",
                value: r[activeMetric] ?? null
            })).filter((d)=>d.value !== null);
    }, [
        data,
        activeMetric
    ]);
    const currentVal = data?.ratios?.[activeMetric] ?? null;
    const factorSnapshots = data?.factorContext?.latestSnapshots ?? [];
    const factorDrawdowns = data?.factorContext?.drawdowns ?? [];
    const meta = data?.meta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDataMeta"])({
        asOfCandidates: [
            data?.ratioHistory?.[0]?.computedDate,
            data?.factorContext?.latestSnapshots?.[0]?.asOf,
            data?.factorExposure?.regressionEndDate
        ],
        coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoverage"])([
            data?.factorExposure,
            factorSnapshots.length ? factorSnapshots : null,
            data?.earningsQuality,
            data?.ratios
        ]),
        note: "Ratios are derived from adjusted market history."
    });
    // Valuation band — ±1 σ of historical values
    const { mean, stddev } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const vals = historicalChart.map((d)=>d.value).filter(Boolean);
        if (vals.length === 0) return {
            mean: null,
            stddev: null
        };
        const m = vals.reduce((a, b)=>a + b, 0) / vals.length;
        const variance = vals.reduce((a, b)=>a + (b - m) ** 2, 0) / vals.length;
        return {
            mean: m,
            stddev: Math.sqrt(variance)
        };
    }, [
        historicalChart
    ]);
    // Factor radar data
    const factorRadar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data?.factorExposure) return [];
        const fe = data.factorExposure;
        return [
            {
                metric: "Market β",
                value: Math.abs(fe.marketBeta ?? 0) * 50
            },
            {
                metric: "Size (SMB)",
                value: ((fe.smbLoading ?? 0) + 2) * 25
            },
            {
                metric: "Value (HML)",
                value: ((fe.hmlLoading ?? 0) + 2) * 25
            },
            {
                metric: "Momentum",
                value: ((fe.wmlLoading ?? 0) + 2) * 25
            },
            {
                metric: "Alpha",
                value: ((fe.alpha ?? 0) + 5) * 10
            }
        ];
    }, [
        data
    ]);
    const tooltipStyle = {
        backgroundColor: "var(--surface-elevated)",
        borderColor: "var(--border)",
        borderRadius: "8px",
        fontSize: "12px"
    };
    const axisStyle = {
        fontSize: 11,
        fill: "var(--text-muted)"
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "analytics",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border flex items-center justify-center h-64",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "analytics",
        className: "scroll-mt-28 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4 flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: "Valuation Band"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex bg-muted/20 p-0.5 rounded-lg border border-border gap-0.5",
                                children: Object.entries(METRIC_LABELS).map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveMetric(key),
                                        className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeMetric === key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                        children: label
                                    }, key, false, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    historicalChart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                        meta: meta,
                        title: "Historical valuation hidden",
                        message: "A valuation band needs enough ratio history to avoid drawing a misleading mean and sigma range."
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-56",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                                        data: historicalChart,
                                        margin: {
                                            top: 10,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3",
                                                vertical: false,
                                                stroke: "var(--border)",
                                                opacity: 0.4
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "date",
                                                axisLine: false,
                                                tickLine: false,
                                                tick: axisStyle,
                                                minTickGap: 50
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
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
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: tooltipStyle,
                                                formatter: (v)=>[
                                                        `${v.toFixed(2)}x`,
                                                        METRIC_LABELS[activeMetric]
                                                    ]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this),
                                            mean !== null && stddev !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                        y: mean + stddev,
                                                        stroke: "#F59E0B",
                                                        strokeDasharray: "4 4",
                                                        label: {
                                                            value: "+1σ",
                                                            fontSize: 10,
                                                            fill: "#F59E0B"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
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
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                        y: mean - stddev,
                                                        stroke: "#10B981",
                                                        strokeDasharray: "4 4",
                                                        label: {
                                                            value: "-1σ",
                                                            fontSize: 10,
                                                            fill: "#10B981"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            currentVal !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
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
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                                type: "monotone",
                                                dataKey: "value",
                                                stroke: "var(--accent-brand)",
                                                strokeWidth: 2,
                                                dot: false
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            mean !== null && currentVal !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 rounded-lg",
                                        style: {
                                            background: "var(--surface-elevated)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs mb-0.5",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: m.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 171,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-bold font-mono",
                                                style: {
                                                    color: m.color
                                                },
                                                children: m.suffix ? `${m.val >= 0 ? "+" : ""}${m.val.toFixed(1)}%` : m.val.toFixed(1) + "x"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 172,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 170,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            data?.factorExposure && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                size: 16,
                                style: {
                                    color: "var(--accent-brand)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Factor Exposure"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-2 py-0.5 rounded-full font-medium",
                                style: {
                                    background: "var(--surface-elevated)",
                                    color: "var(--text-muted)",
                                    border: "1px solid var(--border)"
                                },
                                children: "Carhart 4-Factor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-52",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadarChart"], {
                                        data: factorRadar,
                                        cx: "50%",
                                        cy: "50%",
                                        outerRadius: "70%",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                                stroke: "var(--border)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                dataKey: "metric",
                                                tick: {
                                                    fontSize: 10,
                                                    fill: "var(--text-muted)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 199,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Radar"], {
                                                name: "Factor",
                                                dataKey: "value",
                                                stroke: "var(--accent-brand)",
                                                fill: "var(--accent-brand)",
                                                fillOpacity: 0.3
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 200,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    [
                                        {
                                            label: "Market Beta (β)",
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
                                            label: "Alpha (α)",
                                            val: data.factorExposure.alpha,
                                            desc: "Unexplained excess return"
                                        }
                                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: f.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs",
                                                            style: {
                                                                color: "var(--text-muted)"
                                                            },
                                                            children: f.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-mono font-bold text-sm ${f.val && f.val > 0 ? "text-green-400" : f.val && f.val < 0 ? "text-red-400" : "text-muted-foreground"}`,
                                                    children: f.val != null ? (f.val >= 0 ? "+" : "") + f.val.toFixed(3) : "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, f.label, true, {
                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2 border-t text-xs flex justify-between",
                                        style: {
                                            borderColor: "var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "R² (model fit)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono font-medium",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: data.factorExposure.rSquared != null ? (data.factorExposure.rSquared * 100).toFixed(1) + "%" : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Sample size"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono font-medium",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: data.factorExposure.sampleSize != null ? data.factorExposure.sampleSize : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Window"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono font-medium",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: data.factorExposure.regressionStartDate && data.factorExposure.regressionEndDate ? `${data.factorExposure.regressionStartDate} → ${data.factorExposure.regressionEndDate}` : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 185,
                columnNumber: 9
            }, this),
            (factorSnapshots.length > 0 || factorDrawdowns.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 mb-4 flex-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: "IIMA Factor Regime"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: data?.factorContext?.releaseTag ? `Delayed release ${data.factorContext.releaseTag}` : "Delayed survivorship-bias-adjusted release"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: factorSnapshots.map((snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg border",
                                        style: {
                                            background: "var(--surface-elevated)",
                                            borderColor: "var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-semibold",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: snapshot.frequency
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-mono",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: snapshot.asOf
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                ].map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: metric.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono font-semibold",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: metric.value != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(metric.value, 2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, metric.label, true, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${snapshot.frequency}-${snapshot.asOf}`, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: factorDrawdowns.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                                    meta: meta,
                                    title: "Drawdown statistics unavailable",
                                    message: "Factor drawdown statistics are not available for the current analytics sample yet.",
                                    className: "h-full min-h-48 flex items-center"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this) : factorDrawdowns.map((drawdown)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg border",
                                        style: {
                                            background: "var(--surface-elevated)",
                                            borderColor: "var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-semibold",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: drawdown.factorCode
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs",
                                                            style: {
                                                                color: "var(--text-muted)"
                                                            },
                                                            children: drawdown.factorName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 291,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: "Ann. return"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono font-semibold",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: drawdown.annualizedReturn != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.annualizedReturn, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: "Ann. vol"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono font-semibold",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: drawdown.annualizedVolatility != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.annualizedVolatility, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: "Worst drawdown"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono font-semibold text-red-500",
                                                                children: drawdown.worstDrawdown != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(drawdown.worstDrawdown, 1) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: "Recovery window"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono font-semibold",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: drawdown.drawdownDurationYears != null ? `${drawdown.drawdownDurationYears.toFixed(1)}y` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                                lineNumber: 297,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, drawdown.factorCode, true, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 290,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, this),
            data?.earningsQuality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold mb-4 flex items-center gap-2",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                size: 16,
                                style: {
                                    color: "var(--accent-brand)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            "Earnings Quality"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg",
                                style: {
                                    background: "var(--surface-elevated)",
                                    border: "1px solid var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mb-1",
                                        style: {
                                            color: "var(--text-muted)"
                                        },
                                        children: metric.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-bold font-mono",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: metric.val != null ? `${metric.val.toFixed(2)}${metric.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, metric.label, true, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 337,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this),
                    data.earningsQuality.flags && data.earningsQuality.flags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-2",
                        children: data.earningsQuality.flags.map((flag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 rounded-full text-xs",
                                style: {
                                    background: "var(--surface-elevated)",
                                    color: "var(--text-secondary)",
                                    border: "1px solid var(--border)"
                                },
                                children: flag
                            }, flag, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 348,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 346,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 325,
                columnNumber: 9
            }, this),
            data?.ratios && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold mb-4 flex items-center gap-2",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                size: 16,
                                style: {
                                    color: "var(--accent-brand)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 361,
                                columnNumber: 13
                            }, this),
                            "Valuation & Profitability"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg",
                                style: {
                                    background: "var(--surface-elevated)",
                                    border: "1px solid var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mb-1",
                                        style: {
                                            color: "var(--text-muted)"
                                        },
                                        children: m.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 378,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-bold font-mono",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: m.val != null ? m.isCr ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(m.val, {
                                            digits: 2
                                        }) : m.suffix === "x" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(m.val, 2) : m.suffix === "%" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(m.val, 2) : `${m.val.toFixed(2)}${m.suffix}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                        lineNumber: 379,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, m.label, true, {
                                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                                lineNumber: 377,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
                lineNumber: 359,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/AnalyticsSection.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/PeersSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeersSection",
    ()=>PeersSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stock/presentation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
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
    if (value == null) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"];
    return type === "percent" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(value, 2) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(value, 2);
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
function DiffBadge({ val, base }) {
    if (val == null || base == null || base === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-muted-foreground text-xs",
        children: "•"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 75,
        columnNumber: 57
    }, this);
    const diff = (val - base) / Math.abs(base) * 100;
    if (diff > 5) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
        size: 11,
        className: "text-green-500"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 77,
        columnNumber: 24
    }, this);
    if (diff < -5) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
        size: 11,
        className: "text-red-500"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 78,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
        size: 11,
        className: "text-muted-foreground"
    }, void 0, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, this);
}
function PeersSection({ symbol, currentRatios }) {
    const [peers, setPeers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerMeta, setPeerMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selfRatios, setSelfRatios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(currentRatios);
    const [chartMetric, setChartMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("peTtm");
    const [correlationPeriod, setCorrelationPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1y");
    const [correlationData, setCorrelationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showMatrix, setShowMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showIncompletePeers, setShowIncompletePeers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [correlationKey, setCorrelationKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        Promise.all([
            fetch(`/api/stocks/${symbol}/peers`).then((response)=>response.json()),
            fetch(`/api/stocks/${symbol}/analytics`).then((response)=>response.json())
        ]).then(([peersPayload, analyticsPayload])=>{
            setPeers(peersPayload.peers ?? []);
            setPeerMeta(peersPayload.meta ?? null);
            setSelfRatios({
                ...currentRatios,
                ...analyticsPayload?.ratios ?? {}
            });
            setLoadedSymbol(symbol);
        }).catch(()=>{
            setPeers([]);
            setPeerMeta(null);
            setSelfRatios(currentRatios);
            setLoadedSymbol(symbol);
        });
    }, [
        symbol,
        currentRatios
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const requestKey = `${symbol}-${correlationPeriod}`;
        fetch(`/api/stocks/${symbol}/peer-correlations?period=${correlationPeriod}`).then((response)=>response.json()).then((payload)=>{
            setCorrelationData(payload);
            setCorrelationKey(requestKey);
        }).catch(()=>{
            setCorrelationData(null);
            setCorrelationKey(requestKey);
        });
    }, [
        symbol,
        correlationPeriod
    ]);
    const loading = loadedSymbol !== symbol;
    const correlationLoading = correlationKey !== `${symbol}-${correlationPeriod}`;
    const displayRatios = selfRatios ?? currentRatios;
    const selectedMetric = METRICS.find((metric)=>metric.key === chartMetric) ?? METRICS[0];
    const subjectMarketCap = displayRatios?.marketCapCr ?? null;
    const rankedPeers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const deduped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dedupeByKey"])(peers, (peer)=>`${(peer.name ?? "").trim().toLowerCase()}::${(peer.nseSymbol ?? peer.symbol ?? "").trim().toUpperCase()}`);
        return deduped.filter((peer)=>(peer.nseSymbol ?? peer.symbol ?? "").toUpperCase() !== symbol).map((peer)=>{
            const completeness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["completenessScore"])([
                peer.peTtm,
                peer.pb,
                peer.roce,
                peer.roe,
                peer.patMargin,
                peer.revenueGrowth1y,
                peer.debtEquity,
                peer.dividendYield,
                peer.marketCapCr
            ]);
            const marketCapGap = subjectMarketCap && peer.marketCapCr ? Math.abs((peer.marketCapCr - subjectMarketCap) / subjectMarketCap * 100) : Number.POSITIVE_INFINITY;
            return {
                ...peer,
                displaySymbol: peer.nseSymbol ?? peer.symbol,
                completeness,
                marketCapGap
            };
        }).sort((left, right)=>{
            if (right.completeness !== left.completeness) return right.completeness - left.completeness;
            return left.marketCapGap - right.marketCapGap;
        });
    }, [
        peers,
        subjectMarketCap,
        symbol
    ]);
    const completePeers = rankedPeers.filter((peer)=>peer.completeness >= 0.625);
    const incompletePeers = rankedPeers.filter((peer)=>peer.completeness < 0.625);
    const visiblePeers = showIncompletePeers ? [
        ...completePeers,
        ...incompletePeers
    ] : completePeers;
    const effectiveMeta = peerMeta ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDataMeta"])({
        coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stock$2f$presentation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoverage"])([
            visiblePeers.length ? visiblePeers : null
        ]),
        note: "Only peers with comparable metric coverage are shown first."
    });
    const chartData = [
        ...displayRatios ? [
            {
                name: symbol,
                value: displayRatios[chartMetric] ?? null,
                isSelf: true
            }
        ] : [],
        ...completePeers.slice(0, 5).map((peer)=>({
                name: peer.displaySymbol,
                value: peer[chartMetric] ?? null,
                isSelf: false
            }))
    ];
    const tableRows = [
        ...displayRatios ? [
            {
                key: `${symbol}-self`,
                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: "Current company"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                values: Object.fromEntries([
                    ...METRICS.map((metric)=>{
                        const value = displayRatios[metric.key] ?? null;
                        return [
                            metric.key,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono metric-mono",
                                children: formatMetricValue(value, metric.type)
                            }, metric.key, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 209,
                                columnNumber: 31
                            }, this)
                        ];
                    }),
                    [
                        "marketCapCr",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono metric-mono",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(displayRatios.marketCapCr)
                        }, "marketCapCr", false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 211,
                            columnNumber: 25
                        }, this)
                    ]
                ]),
                rowClassName: "bg-muted/5"
            }
        ] : [],
        ...visiblePeers.map((peer)=>({
                key: peer.displaySymbol,
                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/stocks/${peer.displaySymbol}`,
                            className: "font-medium hover:underline",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: peer.displaySymbol
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs truncate",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: peer.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                values: Object.fromEntries([
                    ...METRICS.map((metric)=>{
                        const value = peer[metric.key] ?? null;
                        const baseValue = displayRatios ? displayRatios[metric.key] ?? null : null;
                        return [
                            metric.key,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-end gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono metric-mono",
                                        children: formatMetricValue(value, metric.type)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffBadge, {
                                        val: value,
                                        base: baseValue
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, `${peer.displaySymbol}-${metric.key}`, true, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        ];
                    }),
                    [
                        "marketCapCr",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono metric-mono",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(peer.marketCapCr)
                        }, `${peer.displaySymbol}-marketCap`, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 237,
                            columnNumber: 25
                        }, this)
                    ]
                ])
            }))
    ];
    const tableColumns = [
        ...METRICS.map((metric)=>({
                key: metric.key,
                label: metric.label
            })),
        {
            key: "marketCapCr",
            label: "Mkt Cap"
        }
    ];
    const tooltipStyle = {
        backgroundColor: "var(--surface-elevated)",
        borderColor: "var(--border)",
        borderRadius: "8px",
        fontSize: "12px"
    };
    const rankedCorrelations = [
        ...correlationData?.peers ?? []
    ].filter((peer)=>peer.correlation != null).sort((left, right)=>(right.correlation ?? -1) - (left.correlation ?? -1));
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "peers",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border flex items-center justify-center h-64",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 262,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 261,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 260,
            columnNumber: 7
        }, this);
    }
    if (rankedPeers.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "peers",
            className: "scroll-mt-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                meta: effectiveMeta,
                title: "Peer comparison unavailable",
                message: "No comparable peer set with enough market data is available for this company yet."
            }, void 0, false, {
                fileName: "[project]/src/components/stock/PeersSection.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 270,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "peers",
        className: "scroll-mt-28 space-y-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl border space-y-6",
            style: {
                background: "var(--surface)",
                borderColor: "var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between flex-wrap gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: "Peer Comparison"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataMetaInline"], {
                                        meta: effectiveMeta
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex bg-muted/20 p-0.5 rounded-lg border border-border overflow-x-auto",
                            children: METRICS.slice(0, 5).map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setChartMetric(metric.key),
                                    className: `flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${chartMetric === metric.key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                    children: metric.label
                                }, metric.key, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 283,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border p-4",
                            style: {
                                background: "var(--background)",
                                borderColor: "var(--border)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: [
                                        "Top comparable peers by ",
                                        selectedMetric.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-xs",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: "Showing the current company plus the five most complete peers first."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-64 mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: chartData,
                                            margin: {
                                                top: 4,
                                                right: 10,
                                                left: 0,
                                                bottom: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    vertical: false,
                                                    stroke: "var(--border)",
                                                    opacity: 0.4
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "name",
                                                    axisLine: false,
                                                    tickLine: false,
                                                    tick: {
                                                        fontSize: 11,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    axisLine: false,
                                                    tickLine: false,
                                                    tick: {
                                                        fontSize: 11,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    width: 44
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: tooltipStyle,
                                                    formatter: (value)=>[
                                                            formatMetricValue(value, selectedMetric.type),
                                                            selectedMetric.label
                                                        ]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
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
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border p-4",
                            style: {
                                background: "var(--background)",
                                borderColor: "var(--border)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    children: "Peer shortlist"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-xs",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: "Complete peers are sorted ahead of sparse rows so the table is decision-ready at first glance."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-3",
                                    children: [
                                        completePeers.slice(0, 3).map((peer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border px-3 py-3",
                                                style: {
                                                    borderColor: "var(--border)",
                                                    background: "var(--surface)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/stocks/${peer.displaySymbol}`,
                                                                    className: "text-sm font-semibold hover:underline",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: peer.displaySymbol
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: peer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-semibold font-mono metric-mono",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: [
                                                                        Math.round(peer.completeness * 100),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 343,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[11px]",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "metric coverage"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 19
                                                }, this)
                                            }, peer.displaySymbol, false, {
                                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                lineNumber: 334,
                                                columnNumber: 17
                                            }, this)),
                                        completePeers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                                            meta: effectiveMeta,
                                            title: "No complete peers yet",
                                            message: "Comparable names were found, but none clear the completeness threshold for a first-glance table.",
                                            action: incompletePeers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowIncompletePeers(true),
                                                className: "text-xs font-medium",
                                                style: {
                                                    color: "var(--accent-brand)"
                                                },
                                                children: "Show incomplete peers"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                lineNumber: 358,
                                                columnNumber: 23
                                            }, void 0) : null
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 352,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this),
                incompletePeers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoverageNotice"], {
                    meta: effectiveMeta,
                    title: showIncompletePeers ? "Incomplete peers shown" : "Incomplete peers hidden",
                    message: showIncompletePeers ? `${incompletePeers.length} lower-coverage rows are visible below for completeness, but they should not drive a first decision.` : `${incompletePeers.length} lower-coverage peer rows are hidden by default so the compare table stays decision-ready.`,
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowIncompletePeers((value)=>!value),
                        className: "text-xs font-medium",
                        style: {
                            color: "var(--accent-brand)"
                        },
                        children: showIncompletePeers ? "Hide incomplete peers" : "Show incomplete peers"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                        lineNumber: 382,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 375,
                    columnNumber: 11
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StickyMetricTable"], {
                    ariaLabel: "Peer comparison table",
                    columns: tableColumns,
                    rows: tableRows
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 394,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t pt-6",
                    style: {
                        borderColor: "var(--border)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-3 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: "Peer Price Correlation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 403,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs max-w-2xl",
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "Uses adjusted daily returns over overlapping trading sessions. Higher values mean the stocks tend to move together; lower values are usually better for diversification."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 404,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex bg-muted/20 p-0.5 rounded-lg border border-border",
                                            children: [
                                                "1y",
                                                "3y",
                                                "5y"
                                            ].map((period)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCorrelationPeriod(period),
                                                    className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${correlationPeriod === period ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`,
                                                    children: period.toUpperCase()
                                                }, period, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 409,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowMatrix((value)=>!value),
                                            className: "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                                            style: {
                                                borderColor: "var(--border)",
                                                color: "var(--text-secondary)",
                                                background: "var(--background)"
                                            },
                                            children: showMatrix ? "Hide heatmap" : "View heatmap"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 420,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this),
                        correlationLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex items-center justify-center h-36 rounded-xl border",
                            style: {
                                borderColor: "var(--border)",
                                background: "var(--background)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin w-6 h-6 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this) : correlationData && rankedCorrelations.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 md:grid-cols-3",
                                    children: [
                                        {
                                            label: "Moves Most Like",
                                            symbol: correlationData.summary.closestPeer?.symbol ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                            detail: correlationData.summary.closestPeer?.correlation != null ? `${correlationData.summary.closestPeer.correlation.toFixed(2)} correlation` : "No signal",
                                            tone: corrColor(correlationData.summary.closestPeer?.correlation)
                                        },
                                        {
                                            label: "Best Diversifier",
                                            symbol: correlationData.summary.diversifier?.symbol ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                            detail: correlationData.summary.diversifier?.correlation != null ? `${correlationData.summary.diversifier.correlation.toFixed(2)} correlation` : "No signal",
                                            tone: corrColor(correlationData.summary.diversifier?.correlation)
                                        },
                                        {
                                            label: "Peer Basket Average",
                                            symbol: correlationData.summary.averageCorrelation != null ? correlationData.summary.averageCorrelation.toFixed(2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"],
                                            detail: correlationData.summary.averageCorrelation != null ? corrLabel(correlationData.summary.averageCorrelation) : "No signal",
                                            tone: corrColor(correlationData.summary.averageCorrelation)
                                        }
                                    ].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border p-4",
                                            style: {
                                                borderColor: "var(--border)",
                                                background: card.tone
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] font-semibold uppercase tracking-[0.18em]",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: card.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-lg font-semibold font-mono metric-mono",
                                                    style: {
                                                        color: "var(--text-primary)"
                                                    },
                                                    children: card.symbol
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 text-xs",
                                                    style: {
                                                        color: "var(--text-secondary)"
                                                    },
                                                    children: card.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, card.label, true, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 465,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: rankedCorrelations.map((peer)=>{
                                        const peerSymbol = peer.nseSymbol ?? peer.symbol;
                                        const correlation = peer.correlation ?? 0;
                                        const fillWidth = `${Math.max(10, (correlation + 1) / 2 * 100)}%`;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border p-3",
                                            style: {
                                                borderColor: "var(--border)",
                                                background: "var(--background)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3 flex-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 flex-wrap",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            href: `/stocks/${peerSymbol}`,
                                                                            className: "text-sm font-semibold hover:underline",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: peerSymbol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                            lineNumber: 483,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[11px] px-2 py-0.5 rounded-full",
                                                                            style: {
                                                                                background: corrColor(peer.correlation),
                                                                                color: "var(--text-secondary)"
                                                                            },
                                                                            children: corrLabel(peer.correlation)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                            lineNumber: 486,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 482,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-xs",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: [
                                                                        peer.name,
                                                                        " · ",
                                                                        peer.overlapDays,
                                                                        " overlapping sessions"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg font-semibold font-mono metric-mono",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: peer.correlation?.toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[11px]",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "Correlation"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 498,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 h-2 rounded-full overflow-hidden",
                                                    style: {
                                                        background: "var(--surface-elevated)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full rounded-full",
                                                        style: {
                                                            width: fillWidth,
                                                            background: "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(245,158,11,0.95) 100%)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, peerSymbol, true, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 479,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 473,
                                    columnNumber: 15
                                }, this),
                                showMatrix && correlationData.matrixSymbols.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border p-4 overflow-x-auto",
                                    style: {
                                        borderColor: "var(--border)",
                                        background: "var(--background)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-semibold mb-3",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            children: "Correlation heatmap"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "min-w-full text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-left",
                                                                style: {
                                                                    color: "var(--text-muted)"
                                                                },
                                                                children: "Ticker"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 25
                                                            }, this),
                                                            correlationData.matrixSymbols.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2 text-center font-medium",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: col
                                                                }, col, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: correlationData.matrixSymbols.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2 font-medium",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: row
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 27
                                                                }, this),
                                                                correlationData.matrixSymbols.map((col)=>{
                                                                    const value = correlationData.matrix[row]?.[col] ?? null;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mx-auto flex h-9 w-12 items-center justify-center rounded-lg font-mono metric-mono",
                                                                            style: {
                                                                                background: corrColor(value),
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: value != null ? value.toFixed(2) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MISSING_VALUE_LABEL"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                            lineNumber: 535,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, `${row}-${col}`, false, {
                                                                        fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 31
                                                                    }, this);
                                                                })
                                                            ]
                                                        }, row, true, {
                                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                                    lineNumber: 516,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 435,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 rounded-xl border px-4 py-6 text-sm",
                            style: {
                                borderColor: "var(--border)",
                                background: "var(--background)",
                                color: "var(--text-muted)"
                            },
                            children: "Not enough overlapping adjusted price history to compute a reliable peer-correlation view yet."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/PeersSection.tsx",
                            lineNumber: 555,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stock/PeersSection.tsx",
                    lineNumber: 400,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stock/PeersSection.tsx",
            lineNumber: 282,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stock/PeersSection.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/FollowButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowButton",
    ()=>FollowButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function FollowButton({ symbol }) {
    const [isFollowing, setIsFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [followerCount, setFollowerCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [alertConfig, setAlertConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        price: true,
        results: true,
        concall: true,
        shareholding: true,
        redFlags: true
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fetched, setFetched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/stocks/${symbol}/follow`).then((r)=>r.json()).then((data)=>{
            setIsFollowing(data.isFollowing);
            setFollowerCount(data.followerCount);
            if (data.alertConfig) setAlertConfig(data.alertConfig);
            setFetched(true);
        }).catch(()=>setFetched(true));
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleToggle,
                disabled: loading,
                className: `flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isFollowing ? "bg-[var(--accent-brand)] text-[var(--accent-foreground)]" : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"}`,
                children: [
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 14,
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this) : isFollowing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    isFollowing ? "Following" : "Follow",
                    followerCount !== null && followerCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs opacity-70 font-mono",
                        children: followerCount.toLocaleString("en-IN")
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FollowButton.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors",
                            title: "Alert settings",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/stock/FollowButton.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                        align: "end",
                        className: "w-52",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Alert me for"
                            }, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                fileName: "[project]/src/components/stock/FollowButton.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            [
                                "price",
                                "results",
                                "concall",
                                "shareholding",
                                "redFlags"
                            ].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: alertConfig[key],
                                    onCheckedChange: (v)=>handleAlertChange(key, v),
                                    className: "text-sm capitalize",
                                    children: key === "redFlags" ? "Red Flags" : key === "concall" ? "Concall" : key === "shareholding" ? "Shareholding" : key === "results" ? "Results" : "Price Alerts"
                                }, key, false, {
                                    fileName: "[project]/src/components/stock/FollowButton.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/stock/FollowButton.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stock/FollowButton.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stock/FollowButton.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/stock/FloatingNavButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingNavButton",
    ()=>FloatingNavButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
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
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollToSection = (id)=>{
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110",
                style: {
                    background: "var(--accent-brand)",
                    color: "white"
                },
                "aria-label": "Quick Navigation",
                children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                    lineNumber: 47,
                    columnNumber: 19
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                    lineNumber: 47,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden fixed inset-0 bg-black/50 z-40",
                        onClick: ()=>setIsOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden fixed bottom-24 right-6 z-50 rounded-lg shadow-xl overflow-hidden",
                        style: {
                            background: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            minWidth: "200px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-semibold uppercase tracking-wider px-3 py-2",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: "Jump to Section"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this),
                                sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scrollToSection(section.id),
                                        className: "w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = "var(--accent-subtle)";
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = "transparent";
                                        },
                                        children: section.label
                                    }, section.id, false, {
                                        fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/stock/FloatingNavButton.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/(app)/stocks/[symbol]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$SectionNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/SectionNav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$EmbeddedChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/EmbeddedChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FinancialsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FinancialsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$OwnershipSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/OwnershipSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$DocumentsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/DocumentsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$AnalyticsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/AnalyticsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$PeersSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/PeersSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FollowButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FloatingNavButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/FloatingNavButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stock/StockUiPrimitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
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
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const symbol = (params?.symbol ?? "").toUpperCase();
    const [stock, setStock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [overviewMeta, setOverviewMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadedSymbol, setLoadedSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [notFound, setNotFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFullDescription, setShowFullDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!symbol) return;
        fetch(`/api/stocks/${symbol}/overview`).then((r)=>{
            if (r.status === 404) {
                setNotFound(true);
                setOverviewMeta(null);
                setLoadedSymbol(symbol);
                return null;
            }
            return r.json();
        }).then((data)=>{
            if (!data) return;
            setNotFound(false);
            setStock(data.stock ?? null);
            setProfile(data.profile ?? null);
            setOverviewMeta(data.meta ?? null);
            setShowFullDescription(false);
            setLoadedSymbol(symbol);
        }).catch(()=>{
            setOverviewMeta(null);
            setLoadedSymbol(symbol);
        });
    }, [
        symbol
    ]);
    const loading = loadedSymbol !== symbol;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin w-8 h-8 rounded-full border-2 border-t-transparent",
                style: {
                    borderColor: "var(--accent-brand)",
                    borderTopColor: "transparent"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    }
    if (notFound || !stock) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-64 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold",
                    style: {
                        color: "var(--text-primary)"
                    },
                    children: [
                        "Stock not found: ",
                        symbol
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/screener",
                    className: "text-sm underline",
                    style: {
                        color: "var(--accent-brand)"
                    },
                    children: "← Back to Screener"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this);
    }
    const isPos = (stock.pctChange1d ?? 0) > 0;
    const isNeg = (stock.pctChange1d ?? 0) < 0;
    const keyMetrics = [
        {
            label: "Market Cap",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyInCrores"])(stock.marketCapCr),
            reason: "Market capitalization is not available for this listing yet."
        },
        {
            label: "P/E",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(stock.pe, 1),
            reason: "TTM earnings are unavailable or non-positive."
        },
        {
            label: "ROCE",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(stock.roce, 1),
            reason: "Return-on-capital history is missing."
        },
        {
            label: "ROE",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercent"])(stock.roe, 1),
            reason: "Return-on-equity history is missing."
        },
        {
            label: "52W Range",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetricRange"])(stock.low52w, stock.high52w, (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(value, {
                    decimals: 0
                })),
            reason: "A full 52-week price range is not available yet."
        },
        {
            label: "Avg Volume",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatVolume"])(stock.avgVolume),
            reason: "Recent average volume is not available."
        }
    ];
    const identityChips = [
        stock.sector ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSectorEmoji"])(stock.sector)} ${stock.sector}` : null,
        stock.industryGroup ?? null,
        stock.industry ?? null,
        stock.subIndustry ?? null,
        stock.exchange ?? (stock.nseSymbol || stock.bseCode ? "NSE/BSE" : null)
    ].filter(Boolean);
    const summaryText = profile?.descriptionShort ?? `${stock.name} is a listed Indian company${stock.industry ? ` operating in ${stock.industry}` : ""}${stock.sector ? ` within the ${stock.sector} sector` : ""}.`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-w-0 pb-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$SectionNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionNav"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FloatingNavButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingNavButton"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-6 w-full max-w-[1180px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border px-6 pb-8 pt-6 mb-10",
                        style: {
                            background: "#fff",
                            borderColor: "var(--border)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4 flex-wrap",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-4 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 flex-wrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 flex-wrap",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                            className: "text-3xl font-semibold tracking-tight",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: stock.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 144,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs px-2.5 py-1 rounded-md font-mono font-semibold",
                                                                            style: {
                                                                                background: "var(--accent-subtle)",
                                                                                color: "var(--accent-brand)",
                                                                                border: "1px solid rgba(245,158,11,0.3)"
                                                                            },
                                                                            children: stock.nseSymbol ?? stock.symbol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 145,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        stock.bseCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                            lineNumber: 150,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        profile?.analystRatings?.targetPrice != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs px-2.5 py-1 rounded-md font-medium",
                                                                            style: {
                                                                                border: "1px solid rgba(245,158,11,0.24)",
                                                                                background: "var(--accent-subtle)",
                                                                                color: "var(--accent-brand)"
                                                                            },
                                                                            children: [
                                                                                "Target ",
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(profile.analystRatings.targetPrice, {
                                                                                    decimals: 0
                                                                                })
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 156,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 flex items-center gap-2 flex-wrap text-xs",
                                                                    style: {
                                                                        color: "var(--text-secondary)"
                                                                    },
                                                                    children: identityChips.map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                                                                            style: {
                                                                                borderColor: "var(--border)",
                                                                                background: "var(--surface-elevated)"
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: chip
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                lineNumber: 165,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, chip, false, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 164,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 flex items-center gap-4 flex-wrap text-xs",
                                                                    children: [
                                                                        profile?.website && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: profile.website,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                                    size: 13,
                                                                                    className: "text-[var(--accent-brand)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                    lineNumber: 174,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                profile.website.replace(/^https?:\/\//, "")
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 173,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        profile?.foundedYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-1.5 text-muted-foreground",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                                                    size: 13,
                                                                                    className: "text-[var(--accent-brand)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                    lineNumber: 180,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                "Founded ",
                                                                                profile.foundedYear
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 179,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        profile?.employees && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-1.5 text-muted-foreground",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                                    size: 13,
                                                                                    className: "text-[var(--accent-brand)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                    lineNumber: 186,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                profile.employees,
                                                                                " employees"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 185,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        profile?.headquarters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-1.5 text-muted-foreground",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                                                    size: 13,
                                                                                    className: "text-[var(--accent-brand)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                    lineNumber: 192,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                "HQ: ",
                                                                                profile.headquarters
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 191,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        profile?.creditRating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-1.5 text-muted-foreground",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                                    size: 13,
                                                                                    className: "text-[var(--accent-brand)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                                    lineNumber: 198,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                "Rating: ",
                                                                                profile.creditRating,
                                                                                " ",
                                                                                profile.creditRatingAgency ? `(${profile.creditRatingAgency})` : ""
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                            lineNumber: 197,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 flex items-end gap-3 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-4xl font-bold font-mono tracking-tight",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(stock.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 21
                                                            }, this),
                                                            stock.pctChange1d != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold font-mono",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSignedChange"])(stock.pctChange1d)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start pt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FollowButton"], {
                                                    symbol: symbol
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 grid gap-3 lg:grid-cols-3",
                                        children: keyMetrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border px-4 py-3",
                                                style: {
                                                    background: "var(--background)",
                                                    borderColor: "var(--border)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-semibold uppercase tracking-[0.18em]",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: metric.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-base font-semibold",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$StockUiPrimitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataValue"], {
                                                            value: metric.value,
                                                            reason: metric.reason,
                                                            className: "metric-mono"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, metric.label, true, {
                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    profile?.analystRatings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 rounded-xl border px-4 py-4",
                                        style: {
                                            background: "var(--background)",
                                            borderColor: "var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-semibold",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: "Street View"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `rounded-full px-2.5 py-1 text-[11px] font-semibold ${isPos ? "text-emerald-500 bg-emerald-500/10" : isNeg ? "text-rose-500 bg-rose-500/10" : "text-muted-foreground bg-muted/20"}`,
                                                        children: isPos ? "Positive day" : isNeg ? "Negative day" : "Flat day"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 grid grid-cols-3 gap-2 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] uppercase tracking-wide text-emerald-500",
                                                                children: "Buy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 text-lg font-semibold font-mono",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: profile.analystRatings.buy
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] uppercase tracking-wide text-amber-500",
                                                                children: "Hold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 text-lg font-semibold font-mono",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: profile.analystRatings.hold
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] uppercase tracking-wide text-rose-500",
                                                                children: "Sell"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 253,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 text-lg font-semibold font-mono",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: profile.analystRatings.sell
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$EmbeddedChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmbeddedChart"], {
                                symbol: symbol,
                                currentPrice: stock.price ?? null,
                                priceChange: stock.pctChange1d ?? null
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$FinancialsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FinancialsSection"], {
                                symbol: symbol
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$OwnershipSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OwnershipSection"], {
                                symbol: symbol
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$AnalyticsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnalyticsSection"], {
                                symbol: symbol
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$PeersSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PeersSection"], {
                                symbol: symbol,
                                currentRatios: {
                                    peTtm: stock.pe,
                                    roce: stock.roce,
                                    roe: stock.roe,
                                    pb: stock.pb,
                                    debtEquity: stock.debtEquity,
                                    dividendYield: stock.dividendYield,
                                    marketCapCr: stock.marketCapCr
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stock$2f$DocumentsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentsSection"], {
                                symbol: symbol
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/stocks/[symbol]/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_689c11b1._.js.map