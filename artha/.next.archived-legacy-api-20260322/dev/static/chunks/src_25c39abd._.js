(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartStore",
    ()=>useChartStore
]);
/**
 * useChartStore — Zustand store for all chart UI state.
 *
 * Keeps: active timeframe, chart type, indicator configs, drawing state,
 * active tool, layout metadata, and fullscreen flag.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useChartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set, get)=>({
        // ── Defaults ────────────────────────────────────────────────────────────
        symbol: '',
        timeframe: '1D',
        chartType: 'candlestick',
        isDark: false,
        isFullscreen: false,
        indicators: [],
        drawings: [],
        activeTool: 'cursor',
        alerts: [],
        savedLayouts: [],
        activeLayoutId: null,
        showDataWindow: true,
        showWatchlist: false,
        showLayoutPanel: false,
        // ── Actions ─────────────────────────────────────────────────────────────
        setSymbol: (symbol)=>set({
                symbol
            }),
        setTimeframe: (tf)=>set({
                timeframe: tf
            }),
        setChartType: (type)=>set({
                chartType: type
            }),
        toggleDark: ()=>set((s)=>({
                    isDark: !s.isDark
                })),
        toggleFullscreen: ()=>set((s)=>({
                    isFullscreen: !s.isFullscreen
                })),
        addIndicator: (config)=>set((s)=>({
                    indicators: [
                        ...s.indicators,
                        config
                    ]
                })),
        updateIndicator: (id, patch)=>set((s)=>({
                    indicators: s.indicators.map((ind)=>ind.id === id ? {
                            ...ind,
                            ...patch
                        } : ind)
                })),
        removeIndicator: (id)=>set((s)=>({
                    indicators: s.indicators.filter((ind)=>ind.id !== id)
                })),
        addDrawing: (drawing)=>set((s)=>({
                    drawings: [
                        ...s.drawings,
                        drawing
                    ]
                })),
        updateDrawing: (id, patch)=>set((s)=>({
                    drawings: s.drawings.map((d)=>d.id === id ? {
                            ...d,
                            ...patch
                        } : d)
                })),
        removeDrawing: (id)=>set((s)=>({
                    drawings: s.drawings.filter((d)=>d.id !== id)
                })),
        clearDrawings: ()=>set({
                drawings: []
            }),
        setActiveTool: (tool)=>set({
                activeTool: tool
            }),
        addAlert: (alert)=>set((s)=>({
                    alerts: [
                        ...s.alerts,
                        alert
                    ]
                })),
        removeAlert: (id)=>set((s)=>({
                    alerts: s.alerts.filter((a)=>a.id !== id)
                })),
        toggleAlert: (id)=>set((s)=>({
                    alerts: s.alerts.map((a)=>a.id === id ? {
                            ...a,
                            active: !a.active
                        } : a)
                })),
        setSavedLayouts: (layouts)=>set({
                savedLayouts: layouts
            }),
        setActiveLayoutId: (id)=>set({
                activeLayoutId: id
            }),
        toggleDataWindow: ()=>set((s)=>({
                    showDataWindow: !s.showDataWindow
                })),
        toggleWatchlist: ()=>set((s)=>({
                    showWatchlist: !s.showWatchlist
                })),
        toggleLayoutPanel: ()=>set((s)=>({
                    showLayoutPanel: !s.showLayoutPanel
                })),
        resetForSymbol: (symbol)=>{
            const { isDark, isFullscreen, showDataWindow, showWatchlist } = get();
            set({
                symbol,
                indicators: [],
                drawings: [],
                activeTool: 'cursor',
                alerts: [],
                activeLayoutId: null,
                isDark,
                isFullscreen,
                showDataWindow,
                showWatchlist
            });
        }
    })));
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
"[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * BasePrimitive — shared helpers for all ISeriesPrimitive drawing implementations.
 *
 * lightweight-charts v5 custom series primitives render onto the canvas
 * via the pane renderer API. Each drawing type extends this class.
 */ __turbopack_context__.s([
    "BaseDrawingView",
    ()=>BaseDrawingView,
    "BasePrimitive",
    ()=>BasePrimitive,
    "dashedLine",
    ()=>dashedLine
]);
function dashedLine(ctx, x1, y1, x2, y2, dash = [
    6,
    3
]) {
    ctx.save();
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}
class BaseDrawingView {
    _data;
    _converter = null;
    constructor(data){
        this._data = data;
    }
    update(data, converter) {
        this._data = data;
        this._converter = converter;
    }
    zOrder() {
        return 'normal';
    }
}
class BasePrimitive {
    _data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _param = null;
    _views = [];
    _onUpdate;
    constructor(data, onUpdate){
        this._data = {
            ...data
        };
        this._onUpdate = onUpdate;
    }
    // ── ISeriesPrimitive ───────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attached(param) {
        this._param = param;
        this._createViews();
        this._updateViews();
    }
    detached() {
        this._param = null;
        this._views = [];
    }
    paneViews() {
        return this._views;
    }
    // Called by lightweight-charts on every render tick
    updateAllViews() {
        this._updateViews();
    }
    // ── Public API ─────────────────────────────────────────────────────────────
    getData() {
        return this._data;
    }
    updateData(data) {
        this._data = {
            ...this._data,
            ...data
        };
        this._updateViews();
        this._param?.requestUpdate();
    }
    // ── Helpers ────────────────────────────────────────────────────────────────
    _buildConverter() {
        if (!this._param) return null;
        const series = this._param.series;
        const chart = this._param.chart;
        return {
            timeToX: (time)=>{
                const coord = chart.timeScale().timeToCoordinate(time);
                return coord ?? null;
            },
            priceToY: (price)=>{
                const coord = series.priceToCoordinate(price);
                return coord ?? null;
            }
        };
    }
    _toPixel(p) {
        const conv = this._buildConverter();
        if (!conv) return null;
        const x = conv.timeToX(p.time);
        const y = conv.priceToY(p.price);
        if (x === null || y === null) return null;
        return {
            x,
            y
        };
    }
    _requestUpdate() {
        this._param?.requestUpdate();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/TrendLinePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TrendLinePrimitive — renders a two-point trend line on the chart canvas.
 */ __turbopack_context__.s([
    "TrendLinePrimitive",
    ()=>TrendLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class TrendLineRenderer {
    _p1 = null;
    _p2 = null;
    _color;
    _width;
    constructor(p1, p2, color, width){
        this._p1 = p1;
        this._p2 = p2;
        this._color = color;
        this._width = width;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._p2) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            ctx.save();
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._width * Math.min(hpr, vpr);
            ctx.beginPath();
            ctx.moveTo(this._p1.x * hpr, this._p1.y * vpr);
            ctx.lineTo(this._p2.x * hpr, this._p2.y * vpr);
            ctx.stroke();
            ctx.restore();
        });
    }
}
class TrendLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    renderer() {
        return new TrendLineRenderer(this._p1, this._p2, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 1);
    }
    setPoints(p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    }
}
class TrendLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new TrendLineView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        view.update(this._data, this._buildConverter());
        view.setPoints(p1, p2);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/HorzLinePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HorzLinePrimitive — renders a full-width horizontal price line.
 */ __turbopack_context__.s([
    "HorzLinePrimitive",
    ()=>HorzLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class HorzLineRenderer {
    _y;
    _color;
    _width;
    _dashed;
    constructor(_y, _color, _width, _dashed){
        this._y = _y;
        this._color = _color;
        this._width = _width;
        this._dashed = _dashed;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (this._y === null) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, bitmapSize, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            ctx.save();
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._width * Math.min(hpr, vpr);
            if (this._dashed) ctx.setLineDash([
                6 * hpr,
                3 * hpr
            ]);
            ctx.beginPath();
            ctx.moveTo(0, this._y * vpr);
            ctx.lineTo(bitmapSize.width, this._y * vpr);
            ctx.stroke();
            ctx.restore();
        });
    }
}
class HorzLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _y = null;
    setY(y) {
        this._y = y;
    }
    renderer() {
        return new HorzLineRenderer(this._y, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 1, this._data.style?.dashed ?? false);
    }
}
class HorzLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new HorzLineView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length === 0) return;
        const pt = this._data.points[0];
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setY(conv.priceToY(pt.price));
    }
}
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
"[project]/src/components/charting/drawings/primitives/MeasuringToolPrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * MeasuringToolPrimitive — two-point measurement tool showing:
 * - Distance (price change)
 * - Percentage change
 * - Number of bars
 * - Number of days
 */ __turbopack_context__.s([
    "MeasuringToolPrimitive",
    ()=>MeasuringToolPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
;
;
class MeasuringToolPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new MeasuringToolView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1, p2, this._data.points[0], this._data.points[1]);
    }
}
class MeasuringToolView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    _pt1 = null;
    _pt2 = null;
    renderer() {
        return new MeasuringToolRenderer(this._p1, this._p2, this._pt1, this._pt2, this._converter);
    }
    setPoints(p1, p2, pt1, pt2) {
        this._p1 = p1;
        this._p2 = p2;
        this._pt1 = pt1;
        this._pt2 = pt2;
    }
}
class MeasuringToolRenderer {
    _p1;
    _p2;
    _pt1;
    _pt2;
    _converter;
    constructor(_p1, _p2, _pt1, _pt2, _converter){
        this._p1 = _p1;
        this._p2 = _p2;
        this._pt1 = _pt1;
        this._pt2 = _pt2;
        this._converter = _converter;
    }
    draw(target) {
        if (!this._p1 || !this._p2 || !this._pt1 || !this._pt2) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr, mediaSize } = scope;
            const x1 = this._p1.x * hpr;
            const y1 = this._p1.y * vpr;
            const x2 = this._p2.x * hpr;
            const y2 = this._p2.y * vpr;
            const priceDiff = this._pt2.price - this._pt1.price;
            const isUp = priceDiff >= 0;
            const themeColor = isUp ? '#22C55E' : '#EF4444';
            const bgColor = isUp ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
            ctx.save();
            // 1. Draw boundary-less rectangle
            const left = Math.min(x1, x2);
            const top = Math.min(y1, y2);
            const width = Math.abs(x2 - x1);
            const height = Math.abs(y2 - y1);
            ctx.fillStyle = bgColor;
            ctx.fillRect(left, top, width, height);
            // 2. Draw Horizontal and Vertical Arrows
            ctx.strokeStyle = themeColor;
            ctx.fillStyle = themeColor;
            ctx.lineWidth = 1.5 * Math.min(hpr, vpr);
            const drawArrow = (fromX, fromY, toX, toY)=>{
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.stroke();
                const headlen = 8 * Math.min(hpr, vpr);
                const angle = Math.atan2(toY - fromY, toX - fromX);
                ctx.beginPath();
                ctx.moveTo(toX, toY);
                ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
                ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
                ctx.fill();
                // Also add arrow at the start
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(fromX + headlen * Math.cos(angle - Math.PI / 6), fromY + headlen * Math.sin(angle - Math.PI / 6));
                ctx.lineTo(fromX + headlen * Math.cos(angle + Math.PI / 6), fromY + headlen * Math.sin(angle + Math.PI / 6));
                ctx.fill();
            };
            const xMid = left + width / 2;
            const yMid = top + height / 2;
            // Vertical arrow in the middle
            drawArrow(xMid, y1, xMid, y2);
            // Horizontal arrow in the middle
            drawArrow(x1, yMid, x2, yMid);
            // 3. Info Box
            const pricePercent = priceDiff / this._pt1.price * 100;
            const timeDiff = Math.abs(this._pt2.time - this._pt1.time);
            const bars = Math.round(timeDiff / 86400); // 1 day = 1 bar for daily charts
            const sign = isUp ? '+' : '-';
            const line1 = `${sign}₹${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIndianNumber"])(Math.abs(priceDiff), 2)} (${sign}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercentage"])(Math.abs(pricePercent), 2)})`;
            const line2 = `${bars} bars, ${bars} days`;
            const fontSize = 12 * Math.min(hpr, vpr);
            ctx.font = `500 ${fontSize}px Inter, sans-serif`;
            const padding = 8 * Math.min(hpr, vpr);
            const lineHeight = 18 * Math.min(hpr, vpr);
            const maxWidth = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width);
            const boxWidth = maxWidth + padding * 2;
            const boxHeight = 2 * lineHeight + padding * 1.5;
            // Position box near the second point or middle
            let boxX = xMid - boxWidth / 2;
            let boxY = isUp ? top - boxHeight - 10 * vpr : top + height + 10 * vpr;
            // Keep within bounds
            if (boxX < 10 * hpr) boxX = 10 * hpr;
            if (boxX + boxWidth > mediaSize.width * hpr - 10 * hpr) boxX = mediaSize.width * hpr - boxWidth - 10 * hpr;
            if (boxY < 10 * vpr) boxY = top + height + 10 * vpr; // Flip to bottom if cuts top
            if (boxY + boxHeight > mediaSize.height * vpr - 10 * vpr) boxY = top - boxHeight - 10 * vpr; // Flip to top if cuts bottom
            // Draw box background
            ctx.fillStyle = isUp ? '#064E3B' : '#450A0A'; // Dark green / Dark red background
            // Round rect
            const radius = 6 * Math.min(hpr, vpr);
            ctx.beginPath();
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
            ctx.fill();
            // Draw text
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'top';
            ctx.fillText(line1, boxX + padding, boxY + padding * 0.75);
            ctx.fillStyle = '#94A3B8'; // Slate 400 for second line
            ctx.font = `${fontSize * 0.9}px Inter, sans-serif`;
            ctx.fillText(line2, boxX + padding, boxY + padding * 0.75 + lineHeight);
            ctx.restore();
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/RectanglePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RectanglePrimitive — two-point rectangle drawing tool.
 */ __turbopack_context__.s([
    "RectanglePrimitive",
    ()=>RectanglePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class RectangleRenderer {
    _p1 = null;
    _p2 = null;
    _color;
    _lineWidth;
    _dashed;
    constructor(p1, p2, color, lineWidth, dashed){
        this._p1 = p1;
        this._p2 = p2;
        this._color = color;
        this._lineWidth = lineWidth;
        this._dashed = dashed;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._p2) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            const x1 = this._p1.x * hpr;
            const y1 = this._p1.y * vpr;
            const x2 = this._p2.x * hpr;
            const y2 = this._p2.y * vpr;
            ctx.save();
            // Calculate rect bounds
            const left = Math.min(x1, x2);
            const top = Math.min(y1, y2);
            const width = Math.abs(x2 - x1);
            const height = Math.abs(y2 - y1);
            // Draw background fill (20% opacity)
            ctx.fillStyle = `${this._color}33`;
            ctx.fillRect(left, top, width, height);
            // Draw border
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._lineWidth * Math.min(hpr, vpr);
            if (this._dashed) {
                ctx.setLineDash([
                    5 * hpr,
                    5 * hpr
                ]);
            }
            ctx.strokeRect(left, top, width, height);
            ctx.setLineDash([]);
            ctx.restore();
        });
    }
}
class RectangleView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    renderer() {
        return new RectangleRenderer(this._p1, this._p2, this._data.style?.color ?? '#3B82F6', this._data.style?.lineWidth ?? 1, this._data.style?.dashed ?? false);
    }
    setPoints(p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    }
}
class RectanglePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new RectangleView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1, p2);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/VertLinePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * VertLinePrimitive — renders a full-height vertical line at a specific time.
 */ __turbopack_context__.s([
    "VertLinePrimitive",
    ()=>VertLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class VertLineRenderer {
    _x;
    _color;
    _width;
    _dashed;
    constructor(_x, _color, _width, _dashed){
        this._x = _x;
        this._color = _color;
        this._width = _width;
        this._dashed = _dashed;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (this._x === null) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, bitmapSize, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            ctx.save();
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._width * Math.min(hpr, vpr);
            if (this._dashed) ctx.setLineDash([
                6 * vpr,
                3 * vpr
            ]);
            ctx.beginPath();
            ctx.moveTo(this._x * hpr, 0);
            ctx.lineTo(this._x * hpr, bitmapSize.height);
            ctx.stroke();
            ctx.restore();
        });
    }
}
class VertLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _x = null;
    setX(x) {
        this._x = x;
    }
    renderer() {
        return new VertLineRenderer(this._x, this._data.style?.color ?? '#3B82F6', this._data.style?.lineWidth ?? 1, this._data.style?.dashed ?? false);
    }
}
class VertLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new VertLineView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length === 0) return;
        const pt = this._data.points[0];
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setX(conv.timeToX(pt.time));
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/FibretracePrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FibretracePrimitive — renders Fibonacci retracement levels between two points.
 */ __turbopack_context__.s([
    "FibretracePrimitive",
    ()=>FibretracePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
const FIB_LEVELS = [
    {
        value: 0,
        color: '#787B86'
    },
    {
        value: 0.236,
        color: '#F44336'
    },
    {
        value: 0.382,
        color: '#81C784'
    },
    {
        value: 0.5,
        color: '#4CAF50'
    },
    {
        value: 0.618,
        color: '#009688'
    },
    {
        value: 0.786,
        color: '#64B5F6'
    },
    {
        value: 1,
        color: '#787B86'
    },
    {
        value: 1.618,
        color: '#2196F3'
    },
    {
        value: 2.618,
        color: '#E91E63'
    }
];
class FibretraceRenderer {
    _p1;
    _p2;
    _p1LogicalY;
    _p2LogicalY;
    _converter;
    constructor(_p1, _p2, _p1LogicalY, _p2LogicalY, _converter){
        this._p1 = _p1;
        this._p2 = _p2;
        this._p1LogicalY = _p1LogicalY;
        this._p2LogicalY = _p2LogicalY;
        this._converter = _converter;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._p2 || !this._p1LogicalY || !this._p2LogicalY || !this._converter) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr, bitmapSize } = scope;
            const x1 = this._p1.x * hpr;
            const x2 = this._p2.x * hpr;
            const isUp = this._p2LogicalY > this._p1LogicalY;
            const diff = this._p2LogicalY - this._p1LogicalY;
            ctx.save();
            // Draw trend line
            ctx.strokeStyle = '#787B86';
            ctx.lineWidth = Math.min(hpr, vpr);
            ctx.setLineDash([
                5 * hpr,
                5 * hpr
            ]);
            ctx.beginPath();
            ctx.moveTo(x1, this._p1.y * vpr);
            ctx.lineTo(x2, this._p2.y * vpr);
            ctx.stroke();
            ctx.setLineDash([]);
            // Draw levels
            const left = Math.min(x1, x2);
            const right = Math.max(x1, x2) + 100 * hpr; // Extend lines to the right
            ctx.font = `${11 * Math.min(hpr, vpr)}px monospace`;
            ctx.textBaseline = 'middle';
            for (const level of FIB_LEVELS){
                const levelLogicalY = this._p1LogicalY + diff * level.value;
                const yPx = this._converter.priceToY(levelLogicalY);
                if (yPx === null) continue;
                const y = yPx * vpr;
                ctx.strokeStyle = level.color;
                ctx.fillStyle = level.color;
                ctx.lineWidth = Math.min(hpr, vpr);
                ctx.beginPath();
                ctx.moveTo(left, y);
                ctx.lineTo(right, y);
                ctx.stroke();
                ctx.fillText(`${level.value.toFixed(3)}`, right + 5 * hpr, y);
            }
            ctx.restore();
        });
    }
}
class FibretraceView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    _p1LogicalY = null;
    _p2LogicalY = null;
    setPoints(p1, p2, p1LogicalY, p2LogicalY) {
        this._p1 = p1;
        this._p2 = p2;
        this._p1LogicalY = p1LogicalY;
        this._p2LogicalY = p2LogicalY;
    }
    renderer() {
        return new FibretraceRenderer(this._p1, this._p2, this._p1LogicalY, this._p2LogicalY, this._converter);
    }
}
class FibretracePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new FibretraceView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1, p2, this._data.points[0].price, this._data.points[1].price);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/ChannelPrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ChannelPrimitive — renders a parallel channel (three points: start, end, and parallel width).
 * For simplicity in our two-point click model, we'll draw a channel with a fixed width, or 
 * use the y-distance of the second point to define both angle and width.
 * Actually, we'll render a standard trend line + a parallel line offset by a fixed amount initially,
 * since our DrawingManager currently only collects 2 points.
 */ __turbopack_context__.s([
    "ChannelPrimitive",
    ()=>ChannelPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class ChannelRenderer {
    _p1;
    _p2;
    _color;
    _width;
    constructor(_p1, _p2, _color, _width){
        this._p1 = _p1;
        this._p2 = _p2;
        this._color = _color;
        this._width = _width;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._p2) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            const x1 = this._p1.x * hpr;
            const y1 = this._p1.y * vpr;
            const x2 = this._p2.x * hpr;
            const y2 = this._p2.y * vpr;
            ctx.save();
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._width * Math.min(hpr, vpr);
            // Main line
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            // Parallel line (offset by arbitrary vertical distance for 2-point channel)
            // In a real 3-point channel, this offset would come from the 3rd point.
            // Here we'll offset it by 50 pixels down as a placeholder.
            const offset = 50 * vpr;
            ctx.beginPath();
            ctx.moveTo(x1, y1 + offset);
            ctx.lineTo(x2, y2 + offset);
            ctx.stroke();
            // Fill between lines
            ctx.fillStyle = `${this._color}33`; // 20% opacity
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, y2 + offset);
            ctx.lineTo(x1, y1 + offset);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
    }
}
class ChannelView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    renderer() {
        return new ChannelRenderer(this._p1, this._p2, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 1);
    }
    setPoints(p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    }
}
class ChannelPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new ChannelView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1, p2);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/TextPrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TextPrimitive — renders text on the chart canvas.
 */ __turbopack_context__.s([
    "TextPrimitive",
    ()=>TextPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class TextRenderer {
    _p1;
    _text;
    _color;
    constructor(_p1, _text, _color){
        this._p1 = _p1;
        this._text = _text;
        this._color = _color;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._text) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            const x = this._p1.x * hpr;
            const y = this._p1.y * vpr;
            ctx.save();
            const fontSize = 14 * Math.min(hpr, vpr);
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            ctx.fillStyle = this._color;
            ctx.textBaseline = 'middle';
            // Add a slight shadow for readability over candles
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 4 * Math.min(hpr, vpr);
            ctx.shadowOffsetX = 1 * hpr;
            ctx.shadowOffsetY = 1 * vpr;
            ctx.fillText(this._text, x, y);
            ctx.restore();
        });
    }
}
class TextView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    renderer() {
        return new TextRenderer(this._p1, this._data.text ?? 'Text', this._data.style?.color ?? '#F59E0B');
    }
    setPoints(p1) {
        this._p1 = p1;
    }
}
class TextPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new TextView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length === 0) return;
        const p1 = this._toPixel(this._data.points[0]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/primitives/ArrowPrimitive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ArrowPrimitive — renders a directional arrow between two points.
 */ __turbopack_context__.s([
    "ArrowPrimitive",
    ()=>ArrowPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-client] (ecmascript)");
;
class ArrowRenderer {
    _p1;
    _p2;
    _color;
    _width;
    constructor(_p1, _p2, _color, _width){
        this._p1 = _p1;
        this._p2 = _p2;
        this._color = _color;
        this._width = _width;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draw(target) {
        if (!this._p1 || !this._p2) return;
        target.useBitmapCoordinateSpace((scope)=>{
            const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
            const x1 = this._p1.x * hpr;
            const y1 = this._p1.y * vpr;
            const x2 = this._p2.x * hpr;
            const y2 = this._p2.y * vpr;
            ctx.save();
            ctx.strokeStyle = this._color;
            ctx.fillStyle = this._color;
            ctx.lineWidth = this._width * Math.min(hpr, vpr);
            // Draw main line
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            // Draw arrow head
            const headlen = 15 * Math.min(hpr, vpr); // length of head in pixels
            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
            ctx.lineTo(x2, y2);
            ctx.fill();
            ctx.restore();
        });
    }
}
class ArrowView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    _p2 = null;
    renderer() {
        return new ArrowRenderer(this._p1, this._p2, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 2);
    }
    setPoints(p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    }
}
class ArrowPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasePrimitive"] {
    _createViews() {
        this._views = [
            new ArrowView(this._data)
        ];
    }
    _updateViews() {
        const view = this._views[0];
        if (!view || this._data.points.length < 2) return;
        const p1 = this._toPixel(this._data.points[0]);
        const p2 = this._toPixel(this._data.points[1]);
        const conv = this._buildConverter();
        if (!conv) return;
        view.update(this._data, conv);
        view.setPoints(p1, p2);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/drawings/DrawingManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DrawingManager — orchestrates drawing creation, editing, and removal.
 *
 * Responsibilities:
 *  - Listens to mouse events on the chart container
 *  - On first click: sets anchor point for the active drawing tool
 *  - On second click (for 2-point tools): finalises the drawing
 *  - Attaches ISeriesPrimitive instances to the main series
 *  - Syncs completed drawings back to the Zustand store
 *
 * Usage:
 *   const dm = new DrawingManager(chart, mainSeries, store);
 *   dm.setTool('trendline');
 *   // ... when done
 *   dm.destroy();
 */ __turbopack_context__.s([
    "DrawingManager",
    ()=>DrawingManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TrendLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/TrendLinePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$HorzLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/HorzLinePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$MeasuringToolPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/MeasuringToolPrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$RectanglePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/RectanglePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$VertLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/VertLinePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$FibretracePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/FibretracePrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ChannelPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/ChannelPrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TextPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/TextPrimitive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ArrowPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/ArrowPrimitive.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
function generateId() {
    return `drw_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
class DrawingManager {
    _chart;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _series;
    _container;
    _tool = 'cursor';
    _anchor = null;
    _preview = null;
    _primitives = new Map();
    _onAdded;
    _onUpdated;
    _onRemoved;
    // Bound event handlers (so we can remove them)
    _handleClick;
    _handleMouseMove;
    constructor(chart, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series, container, onAdded, onUpdated, onRemoved){
        this._chart = chart;
        this._series = series;
        this._container = container;
        this._onAdded = onAdded;
        this._onUpdated = onUpdated;
        this._onRemoved = onRemoved;
        this._handleClick = this._onClick.bind(this);
        this._handleMouseMove = this._onMouseMove.bind(this);
        this._container.addEventListener('click', this._handleClick);
        this._container.addEventListener('mousemove', this._handleMouseMove);
    }
    // ── Public API ─────────────────────────────────────────────────────────────
    setTool(tool) {
        this._tool = tool;
        this._anchor = null;
        this._clearPreview();
        this._container.style.cursor = tool === 'cursor' ? 'default' : 'crosshair';
    }
    /** Restore existing drawings from the store (e.g. loaded from DB). */ restoreDrawings(drawings) {
        drawings.forEach((d)=>this._attachPrimitive(d));
    }
    /** Remove a single drawing by id. */ removeDrawing(id) {
        const prim = this._primitives.get(id);
        if (prim) {
            this._series.detachPrimitive(prim);
            this._primitives.delete(id);
        }
        this._onRemoved(id);
    }
    /** Remove all drawings. */ clearAll() {
        this._primitives.forEach((prim, id)=>{
            this._series.detachPrimitive(prim);
            this._onRemoved(id);
        });
        this._primitives.clear();
        this._clearPreview();
        this._anchor = null;
    }
    destroy() {
        this.clearAll();
        this._container.removeEventListener('click', this._handleClick);
        this._container.removeEventListener('mousemove', this._handleMouseMove);
        this._container.style.cursor = 'default';
    }
    // ── Coordinate helpers ─────────────────────────────────────────────────────
    _eventToPoint(e) {
        const rect = this._container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const time = this._chart.timeScale().coordinateToTime(x);
        const price = this._series.coordinateToPrice(y);
        if (time === null || price === null) return null;
        return {
            time: time,
            price
        };
    }
    // ── Event handlers ─────────────────────────────────────────────────────────
    _onClick(e) {
        console.log('[DrawingManager] Click event:', {
            tool: this._tool,
            hasAnchor: !!this._anchor
        });
        if (this._tool === 'cursor') return;
        const pt = this._eventToPoint(e);
        if (!pt) {
            console.warn('[DrawingManager] Failed to convert event to point');
            return;
        }
        console.log('[DrawingManager] Point:', pt);
        // Single-point tools
        if (this._tool === 'horzline') {
            this._finalise([
                pt
            ]);
            return;
        }
        // Two-point tools
        if (!this._anchor) {
            this._anchor = pt;
            return;
        }
        // Second click — finalise
        this._finalise([
            this._anchor,
            pt
        ]);
        this._anchor = null;
    }
    _onMouseMove(e) {
        if (this._tool === 'cursor' || !this._anchor) return;
        const pt = this._eventToPoint(e);
        if (!pt) return;
        // Update preview primitive
        const previewData = {
            id: '__preview__',
            type: this._tool,
            points: [
                this._anchor,
                pt
            ],
            style: {
                color: '#F59E0B66',
                lineWidth: 1,
                dashed: true
            }
        };
        if (this._preview) {
            this._preview.updateData(previewData);
        } else {
            this._preview = this._createPrimitive(previewData);
            if (this._preview) this._series.attachPrimitive(this._preview);
        }
    }
    // ── Drawing lifecycle ──────────────────────────────────────────────────────
    _finalise(points) {
        this._clearPreview();
        const drawing = {
            id: generateId(),
            type: this._tool,
            points,
            style: {
                color: '#F59E0B',
                lineWidth: 1,
                dashed: false
            }
        };
        this._attachPrimitive(drawing);
        this._onAdded(drawing);
    }
    _attachPrimitive(drawing) {
        const prim = this._createPrimitive(drawing);
        if (!prim) return;
        this._series.attachPrimitive(prim);
        this._primitives.set(drawing.id, prim);
    }
    _createPrimitive(data) {
        switch(data.type){
            case 'trendline':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TrendLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrendLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'horzline':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$HorzLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HorzLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'vertline':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$VertLinePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VertLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'measure':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$MeasuringToolPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasuringToolPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'rectangle':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$RectanglePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RectanglePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'fibretrace':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$FibretracePrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FibretracePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'channel':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ChannelPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'text':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TextPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'arrow':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ArrowPrimitive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            default:
                console.warn(`[DrawingManager] Unknown drawing type: ${data.type}`);
                return null;
        }
    }
    _clearPreview() {
        if (this._preview) {
            this._series.detachPrimitive(this._preview);
            this._preview = null;
        }
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
    if ($[0] !== "eb0e68b5096bdde5720b25ebde104410d5b5e43a3c2190223ad5cbef858469fd") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "eb0e68b5096bdde5720b25ebde104410d5b5e43a3c2190223ad5cbef858469fd";
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
                        setBars(mapped);
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
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatDateShort",
    ()=>formatDateShort,
    "formatINR",
    ()=>formatINR,
    "formatPercent",
    ()=>formatPercent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatINR(value) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 1_00_00_000) {
        return `${sign}₹${(abs / 1_00_00_000).toFixed(2)}Cr`;
    }
    if (abs >= 1_00_000) {
        const lakhs = abs / 1_00_000;
        return `${sign}₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
    }
    if (abs >= 1000) {
        return `${sign}₹${abs.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        })}`;
    }
    return `${sign}₹${abs.toFixed(0)}`;
}
function formatPercent(value, decimals = 1) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}
function formatDate(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function formatDateShort(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Generated Sector and Industry Group Emojis Mapping
__turbopack_context__.s([
    "INDUSTRY_GROUP_EMOJIS",
    ()=>INDUSTRY_GROUP_EMOJIS,
    "SECTOR_EMOJIS",
    ()=>SECTOR_EMOJIS,
    "getIndustryGroupEmoji",
    ()=>getIndustryGroupEmoji,
    "getSectorEmoji",
    ()=>getSectorEmoji
]);
const SECTOR_EMOJIS = {
    "Financial Svcs": "🏦",
    "Finance": "💳",
    "Banks": "🏛️",
    "Chemicals": "🧪",
    "Paper & Paper Products": "📜",
    "Apparel": "👕",
    "Food": "🍔",
    "Medical": "🏥",
    "Healthcare": "⚕️",
    "Bldg": "🏗️",
    "Leisure": "🏖️",
    "Auto Manufacturers": "🏭",
    "Auto/Truck": "🚙",
    "Agricultural Operations": "🚜",
    "Computer": "💻",
    "Computer Sftwr": "💾",
    "Comp Sftwr": "👨‍💻",
    "Insurance": "🛡️",
    "Electrical": "⚡",
    "Aerospace/Defense": "🚀",
    "Machinery": "⚙️",
    "Utility": "🔌",
    "Utilities": "💡",
    "Transportation": "🚆",
    "Transport": "🚚",
    "Comml Svcs": "🏢",
    "Cosmetics/Personal Care": "💄",
    "Oil&Gas": "🛢️",
    "Energy": "🔋",
    "Metal Proc & Fabrication": "🛠️",
    "Steel": "🔩",
    "Tobacco": "🚬",
    "Retail/Whlsle": "🏪",
    "Retail": "🛍️",
    "Wholesale": "📦",
    "Pollution Control": "♻️",
    "Hsehold": "🏠",
    "Hsehold/Office Furniture": "🪑",
    "Office Supplies Mfg": "🖇️",
    "Containers/Packaging": "🥡",
    "Real Estate Dvlpmt/Ops": "🏙️",
    "Mining": "⛏️",
    "Media": "📰",
    "Beverages": "🥤",
    "Telecom Svcs": "📡",
    "Telecom": "📱",
    "Diversified Operations": "🌐",
    "Consumer Svcs": "🛎️",
    "Elec": "🔌",
    "Trucks & Parts": "🚛",
    "Electronic": "📺",
    "Internet": "🌐",
    "Soap & Clng Preparatns": "🧼",
    "Security/Sfty": "🔒",
    "Consumer Prod": "🧴",
    "Metal Prds": "🔧",
    "Group Not Available": "❓",
    "Industrials": "🏗️",
    "Commodities": "🌾",
    "Financial Services": "🏦",
    "Information Technology": "💻",
    "Diversified": "🌐",
    "Services": "🛎️",
    "Consumer Discretionary": "🛍️",
    "Fast Moving Consumer Goods": "🛒",
    "Telecommunication": "📡"
};
const INDUSTRY_GROUP_EMOJIS = {
    "Banks-Private Sector": "🏛️",
    "Banks-Public Sector": "🏦",
    "Finance-NBFC": "💳",
    "Finance-Housing": "🏠",
    "Software-Services": "👨‍💻",
    "IT-Services": "💻",
    "Chemicals-Specialty": "🧪",
    "Pharmaceuticals-Indian": "💊",
    "Banks-Money Center": "🏛️",
    "Computer-Tech Services": "💻",
    "Oil&Gas-Integrated": "🛢️",
    "Electronic-Consumer": "📺",
    "Internet-Services": "🌐"
};
function getSectorEmoji(sector) {
    if (!sector) return "🏢";
    // Try exact match first
    if (SECTOR_EMOJIS[sector]) {
        return SECTOR_EMOJIS[sector];
    }
    // Fallback heuristics
    const s = sector.toLowerCase();
    if (s.includes("bank") || s.includes("financ")) return "🏦";
    if (s.includes("tech") || s.includes("soft") || s.includes("it")) return "💻";
    if (s.includes("health") || s.includes("pharm") || s.includes("medic")) return "🏥";
    if (s.includes("auto") || s.includes("motor")) return "🚗";
    if (s.includes("fmcg") || s.includes("food") || s.includes("beverag")) return "🛒";
    if (s.includes("chem")) return "🧪";
    if (s.includes("metal") || s.includes("steel")) return "🔩";
    if (s.includes("power") || s.includes("energy") || s.includes("gas") || s.includes("oil")) return "⚡";
    if (s.includes("infra") || s.includes("construct") || s.includes("real est")) return "🏗️";
    if (s.includes("telecom")) return "📡";
    if (s.includes("retail")) return "🛍️";
    if (s.includes("media") || s.includes("entertain")) return "🎬";
    return "🏭"; // Generic industry fallback
}
function getIndustryGroupEmoji(group) {
    if (!group) return "🏭";
    if (INDUSTRY_GROUP_EMOJIS[group]) {
        return INDUSTRY_GROUP_EMOJIS[group];
    }
    // Fallback heuristics for industry groups
    const g = group.toLowerCase();
    if (g.includes("bank")) return "🏛️";
    if (g.includes("financ") || g.includes("nbfc") || g.includes("credit") || g.includes("invest")) return "💳";
    if (g.includes("software") || g.includes("it-")) return "��";
    if (g.includes("pharm") || g.includes("bio") || g.includes("medic")) return "💊";
    if (g.includes("health") || g.includes("hosp")) return "🏥";
    if (g.includes("auto") || g.includes("vehic") || g.includes("tyre")) return "🚗";
    if (g.includes("chem") || g.includes("fertil") || g.includes("pestic")) return "🧪";
    if (g.includes("fmcg") || g.includes("food") || g.includes("agro") || g.includes("dairy")) return "🥐";
    if (g.includes("metal") || g.includes("steel") || g.includes("iron") || g.includes("alumin")) return "🔩";
    if (g.includes("power") || g.includes("electr") || g.includes("energy") || g.includes("utilit")) return "⚡";
    if (g.includes("gas") || g.includes("oil") || g.includes("petrol")) return "🛢️";
    if (g.includes("construct") || g.includes("infra") || g.includes("cement") || g.includes("build")) return "🏗️";
    if (g.includes("real est") || g.includes("realty")) return "🏙️";
    if (g.includes("telecom") || g.includes("cable")) return "📡";
    if (g.includes("retail") || g.includes("consum")) return "🛍️";
    if (g.includes("media") || g.includes("tv") || g.includes("cinema")) return "📺";
    if (g.includes("textil") || g.includes("apparel") || g.includes("cloth")) return "👕";
    if (g.includes("paper") || g.includes("wood") || g.includes("laminat")) return "📜";
    if (g.includes("travel") || g.includes("hotel") || g.includes("tourism") || g.includes("leisur")) return "🏖️";
    if (g.includes("transport") || g.includes("logist") || g.includes("ship") || g.includes("courier")) return "🚚";
    if (g.includes("plastic") || g.includes("packag") || g.includes("contain")) return "📦";
    if (g.includes("machin") || g.includes("equip") || g.includes("engin")) return "⚙️";
    return "🏭"; // Generic industry fallback
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DropdownMenu(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "dropdown-menu",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 28,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = DropdownMenu;
function DropdownMenuPortal(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
            "data-slot": "dropdown-menu-portal",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = DropdownMenuPortal;
function DropdownMenuTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "dropdown-menu-trigger",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = DropdownMenuTrigger;
function DropdownMenuContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, sideOffset: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
    }
    const sideOffset = t1 === undefined ? 4 : t1;
    let t2;
    if ($[5] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className);
        $[5] = className;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== sideOffset || $[9] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dropdown-menu-content",
                sideOffset: sideOffset,
                className: t2,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 129,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = sideOffset;
        $[9] = t2;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    return t3;
}
_c3 = DropdownMenuContent;
function DropdownMenuGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
            "data-slot": "dropdown-menu-group",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 159,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c4 = DropdownMenuGroup;
function DropdownMenuSub(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"], {
            "data-slot": "dropdown-menu-sub",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 187,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c5 = DropdownMenuSub;
function DropdownMenuRadioGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
            "data-slot": "dropdown-menu-radio-group",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 215,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c6 = DropdownMenuRadioGroup;
function DropdownMenuSubTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let children;
    let className;
    let inset;
    let props;
    if ($[1] !== t0) {
        ({ className, inset, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = inset;
        $[5] = props;
    } else {
        children = $[2];
        className = $[3];
        inset = $[4];
        props = $[5];
    }
    let t1;
    if ($[6] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
            className: "ml-auto"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 263,
            columnNumber: 10
        }, this);
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== children || $[10] !== inset || $[11] !== props || $[12] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
            "data-slot": "dropdown-menu-sub-trigger",
            "data-inset": inset,
            className: t1,
            ...props,
            children: [
                children,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 270,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = inset;
        $[11] = props;
        $[12] = t1;
        $[13] = t3;
    } else {
        t3 = $[13];
    }
    return t3;
}
_c7 = DropdownMenuSubTrigger;
function DropdownMenuSubContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
            "data-slot": "dropdown-menu-sub-content",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 313,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c8 = DropdownMenuSubContent;
function DropdownMenuItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let inset;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, inset, variant: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = inset;
        $[4] = props;
        $[5] = t1;
    } else {
        className = $[2];
        inset = $[3];
        props = $[4];
        t1 = $[5];
    }
    const variant = t1 === undefined ? "default" : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== inset || $[9] !== props || $[10] !== t2 || $[11] !== variant) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
            "data-slot": "dropdown-menu-item",
            "data-inset": inset,
            "data-variant": variant,
            className: t2,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 363,
            columnNumber: 10
        }, this);
        $[8] = inset;
        $[9] = props;
        $[10] = t2;
        $[11] = variant;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c9 = DropdownMenuItem;
function DropdownMenuCheckboxItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let checked;
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, checked, ...props } = t0);
        $[1] = t0;
        $[2] = checked;
        $[3] = children;
        $[4] = className;
        $[5] = props;
    } else {
        checked = $[2];
        children = $[3];
        className = $[4];
        props = $[5];
    }
    let t1;
    if ($[6] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 414,
                    columnNumber: 143
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 414,
                columnNumber: 106
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 414,
            columnNumber: 10
        }, this);
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== checked || $[10] !== children || $[11] !== props || $[12] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
            "data-slot": "dropdown-menu-checkbox-item",
            className: t1,
            checked: checked,
            ...props,
            children: [
                t2,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 421,
            columnNumber: 10
        }, this);
        $[9] = checked;
        $[10] = children;
        $[11] = props;
        $[12] = t1;
        $[13] = t3;
    } else {
        t3 = $[13];
    }
    return t3;
}
_c10 = DropdownMenuCheckboxItem;
function DropdownMenuRadioItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                    className: "size-2 fill-current"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 468,
                    columnNumber: 143
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 468,
                columnNumber: 106
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 468,
            columnNumber: 10
        }, this);
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== children || $[9] !== props || $[10] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
            "data-slot": "dropdown-menu-radio-item",
            className: t1,
            ...props,
            children: [
                t2,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 475,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = props;
        $[10] = t1;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    return t3;
}
_c11 = DropdownMenuRadioItem;
function DropdownMenuLabel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let inset;
    let props;
    if ($[1] !== t0) {
        ({ className, inset, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = inset;
        $[4] = props;
    } else {
        className = $[2];
        inset = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset]:pl-8", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== inset || $[8] !== props || $[9] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            "data-slot": "dropdown-menu-label",
            "data-inset": inset,
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 521,
            columnNumber: 10
        }, this);
        $[7] = inset;
        $[8] = props;
        $[9] = t1;
        $[10] = t2;
    } else {
        t2 = $[10];
    }
    return t2;
}
_c12 = DropdownMenuLabel;
function DropdownMenuSeparator(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border -mx-1 my-1 h-px", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
            "data-slot": "dropdown-menu-separator",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 563,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c13 = DropdownMenuSeparator;
function DropdownMenuShortcut(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground ml-auto text-xs tracking-widest", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            "data-slot": "dropdown-menu-shortcut",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 604,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c14 = DropdownMenuShortcut;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c3, "DropdownMenuContent");
__turbopack_context__.k.register(_c4, "DropdownMenuGroup");
__turbopack_context__.k.register(_c5, "DropdownMenuSub");
__turbopack_context__.k.register(_c6, "DropdownMenuRadioGroup");
__turbopack_context__.k.register(_c7, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c8, "DropdownMenuSubContent");
__turbopack_context__.k.register(_c9, "DropdownMenuItem");
__turbopack_context__.k.register(_c10, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c11, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c12, "DropdownMenuLabel");
__turbopack_context__.k.register(_c13, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c14, "DropdownMenuShortcut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] shadow-sm",
            destructive: "bg-[var(--bear-tint)] text-[var(--bear-strong)] hover:opacity-90 shadow-sm",
            outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--surface-hover)] hover:border-[var(--brand-primary)] text-[var(--text-primary)]",
            selected: "border border-[var(--selection-border)] bg-[var(--selection-bg)] text-[var(--selection-text)] hover:bg-[var(--selection-bg-hover)] shadow-[var(--selection-shadow)]",
            secondary: "bg-[var(--brand-tint)] text-[var(--brand-primary)] hover:opacity-90",
            ghost: "hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            link: "text-[var(--brand-primary)] underline-offset-4 hover:text-[var(--brand-hover)] hover:underline"
        },
        size: {
            default: "h-[var(--control-height)] px-4 py-2",
            sm: "h-[var(--control-height-sm)] rounded-lg px-3 text-xs",
            lg: "h-[calc(var(--control-height)+0.25rem)] rounded-lg px-8",
            icon: "h-[var(--control-height)] w-[var(--control-height)]"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 48,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Select = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full appearance-none items-center justify-between whitespace-nowrap rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-[var(--text-primary)] [&>option]:bg-[var(--surface-elevated)]", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/20advantage/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "h-4 w-4 opacity-50 text-[var(--text-primary)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m6 9 6 6 6-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 17,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Select;
Select.displayName = "Select";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Select$React.forwardRef");
__turbopack_context__.k.register(_c1, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript) <export * as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function Dialog(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Root, {
            "data-slot": "dialog",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = Dialog;
function DialogTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Trigger, {
            "data-slot": "dialog-trigger",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = DialogTrigger;
function DialogPortal(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Portal, {
            "data-slot": "dialog-portal",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = DialogPortal;
function DialogClose(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            "data-slot": "dialog-close",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c3 = DialogClose;
function DialogOverlay(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Overlay, {
            "data-slot": "dialog-overlay",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c4 = DialogOverlay;
function DialogContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, children, showCloseButton: t1, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const showCloseButton = t1 === undefined ? true : t1;
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 195,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== className) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className);
        $[7] = className;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== showCloseButton) {
        t4 = showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            "data-slot": "dialog-close",
            className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 210,
                    columnNumber: 443
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 210,
                    columnNumber: 452
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 210,
            columnNumber: 29
        }, this);
        $[9] = showCloseButton;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== children || $[12] !== props || $[13] !== t3 || $[14] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
            "data-slot": "dialog-portal",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Content, {
                    "data-slot": "dialog-content",
                    className: t3,
                    ...props,
                    children: [
                        children,
                        t4
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 218,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 218,
            columnNumber: 10
        }, this);
        $[11] = children;
        $[12] = props;
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    return t5;
}
_c5 = DialogContent;
function DialogHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "dialog-header",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 261,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c6 = DialogHeader;
function DialogFooter(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, showCloseButton: t1, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const showCloseButton = t1 === undefined ? false : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== showCloseButton) {
        t3 = showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                children: "Close"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 311,
                columnNumber: 67
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 311,
            columnNumber: 29
        }, this);
        $[8] = showCloseButton;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    let t4;
    if ($[10] !== children || $[11] !== props || $[12] !== t2 || $[13] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "dialog-footer",
            className: t2,
            ...props,
            children: [
                children,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 319,
            columnNumber: 10
        }, this);
        $[10] = children;
        $[11] = props;
        $[12] = t2;
        $[13] = t3;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    return t4;
}
_c7 = DialogFooter;
function DialogTitle(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Title, {
            "data-slot": "dialog-title",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 362,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c8 = DialogTitle;
function DialogDescription(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Description, {
            "data-slot": "dialog-description",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 403,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-[var(--control-height)] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-[var(--control-padding-x)] py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-focus)] focus-visible:border-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WATCHLIST",
    ()=>DEFAULT_WATCHLIST,
    "DEFAULT_WATCHLIST_CONFIG",
    ()=>DEFAULT_WATCHLIST_CONFIG,
    "WatchlistPanel",
    ()=>WatchlistPanel,
    "getWatchlistPanelWidth",
    ()=>getWatchlistPanelWidth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
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
const WATCHLIST_PANEL_SYMBOL_WIDTH = 120;
const WATCHLIST_PANEL_INDUSTRY_WIDTH = 24;
const WATCHLIST_PANEL_CHANGE_WIDTH = 68;
const WATCHLIST_PANEL_PRICE_WIDTH = 90;
const WATCHLIST_PANEL_PADDING_WIDTH = 12;
const WATCHLIST_MAX_CUSTOM_COLUMNS = 10;
const WATCHLIST_METRICS = [
    {
        key: 'rvol1',
        label: 'RVol',
        shortLabel: 'RVol',
        width: 72,
        kind: 'number',
        periodOptions: [
            1,
            5,
            10,
            20
        ]
    },
    {
        key: 'atr',
        label: 'ATR',
        shortLabel: 'ATR',
        width: 72,
        kind: 'number',
        periodOptions: [
            7,
            14,
            21
        ]
    },
    {
        key: 'natr',
        label: 'NATR',
        shortLabel: 'NATR',
        width: 72,
        kind: 'percent',
        periodOptions: [
            7,
            14,
            21
        ]
    },
    {
        key: 'pe',
        label: 'P/E',
        shortLabel: 'P/E',
        width: 68,
        kind: 'multiple'
    },
    {
        key: 'pb',
        label: 'P/B',
        shortLabel: 'P/B',
        width: 68,
        kind: 'multiple'
    },
    {
        key: 'roe',
        label: 'ROE',
        shortLabel: 'ROE',
        width: 68,
        kind: 'percent'
    },
    {
        key: 'roce',
        label: 'ROCE',
        shortLabel: 'ROCE',
        width: 70,
        kind: 'percent'
    },
    {
        key: 'debtToEquity',
        label: 'Debt / Eq',
        shortLabel: 'D/E',
        width: 72,
        kind: 'multiple'
    },
    {
        key: 'dividendYield',
        label: 'Dividend Yield',
        shortLabel: 'Div Yld',
        width: 78,
        kind: 'percent'
    },
    {
        key: 'salesGrowth',
        label: 'Sales Growth',
        shortLabel: 'Sales Gr',
        width: 76,
        kind: 'percent'
    },
    {
        key: 'profitGrowth',
        label: 'Profit Growth',
        shortLabel: 'Profit Gr',
        width: 76,
        kind: 'percent'
    },
    {
        key: 'marketCap',
        label: 'Market Cap',
        shortLabel: 'MCap',
        width: 84,
        kind: 'currencyCompact'
    }
];
const METRIC_DEFINITIONS = Object.fromEntries(_c1 = WATCHLIST_METRICS.map(_c = (metric)=>[
        metric.key,
        metric
    ]));
_c2 = METRIC_DEFINITIONS;
const TECHNICAL_METRIC_KEYS = [
    'rvol1',
    'atr',
    'natr'
];
const FUNDAMENTAL_METRIC_KEYS = [
    'pe',
    'pb',
    'roe',
    'roce',
    'debtToEquity',
    'dividendYield',
    'salesGrowth',
    'profitGrowth',
    'marketCap'
];
const DEFAULT_WATCHLIST = [
    {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        price: 2984.5,
        change: 1.23,
        industryGroup: 'Oil&Gas-Integrated',
        rvol1: 1.84,
        atr: 72.4,
        natr: 2.43,
        pe: 28.1,
        pb: 2.1,
        roe: 8.4,
        roce: 9.8,
        debtToEquity: 0.34,
        dividendYield: 0.37,
        salesGrowth: 11.6,
        profitGrowth: 7.8,
        marketCap: 2015
    },
    {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        price: 4120.3,
        change: -1.08,
        industryGroup: 'Computer-Tech Services',
        rvol1: 0.91,
        atr: 94.2,
        natr: 2.29,
        pe: 31.4,
        pb: 14.1,
        roe: 45.8,
        roce: 58.2,
        debtToEquity: 0.02,
        dividendYield: 1.24,
        salesGrowth: 8.6,
        profitGrowth: 9.1,
        marketCap: 1492
    },
    {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        price: 1642.15,
        change: 0.34,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.12,
        atr: 31.7,
        natr: 1.93,
        pe: 19.7,
        pb: 2.8,
        roe: 14.7,
        roce: 8.9,
        debtToEquity: 5.91,
        dividendYield: 0.95,
        salesGrowth: 15.2,
        profitGrowth: 18.4,
        marketCap: 1254
    },
    {
        symbol: 'INFY',
        name: 'Infosys',
        price: 1540,
        change: -0.79,
        industryGroup: 'Computer-Tech Services',
        rvol1: 1.06,
        atr: 34.6,
        natr: 2.25,
        pe: 24.9,
        pb: 7.6,
        roe: 31.2,
        roce: 39.5,
        debtToEquity: 0.05,
        dividendYield: 2.12,
        salesGrowth: 6.8,
        profitGrowth: 8.4,
        marketCap: 639
    },
    {
        symbol: 'ICICIBANK',
        name: 'ICICI Bank',
        price: 1148.9,
        change: 1.46,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.35,
        atr: 26.1,
        natr: 2.27,
        pe: 18.4,
        pb: 3.2,
        roe: 17.9,
        roce: 9.5,
        debtToEquity: 5.42,
        dividendYield: 0.68,
        salesGrowth: 20.6,
        profitGrowth: 23.7,
        marketCap: 811
    },
    {
        symbol: 'SBIN',
        name: 'State Bank of India',
        price: 780.45,
        change: 1.58,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.41,
        atr: 21.6,
        natr: 2.77,
        pe: 9.8,
        pb: 1.6,
        roe: 16.4,
        roce: 8.1,
        debtToEquity: 8.42,
        dividendYield: 1.42,
        salesGrowth: 18.5,
        profitGrowth: 21.3,
        marketCap: 696
    },
    {
        symbol: 'BAJFINANCE',
        name: 'Bajaj Finance',
        price: 7200.8,
        change: -0.68,
        industryGroup: 'Finance-Consumer Loans',
        rvol1: 0.88,
        atr: 145.3,
        natr: 2.02,
        pe: 29.8,
        pb: 5.4,
        roe: 20.1,
        roce: 12.8,
        debtToEquity: 3.71,
        dividendYield: 0.48,
        salesGrowth: 24.6,
        profitGrowth: 27.5,
        marketCap: 447
    },
    {
        symbol: 'ADANIENT',
        name: 'Adani Enterprises',
        price: 2980,
        change: 3.22,
        industryGroup: 'Trading & Logistics',
        rvol1: 1.93,
        atr: 126.4,
        natr: 4.24,
        pe: 92.5,
        pb: 8.8,
        roe: 9.2,
        roce: 10.4,
        debtToEquity: 1.34,
        dividendYield: 0,
        salesGrowth: 28.9,
        profitGrowth: 16.3,
        marketCap: 340
    },
    {
        symbol: 'TATAMOTORS',
        name: 'Tata Motors',
        price: 870.9,
        change: -2.1,
        industryGroup: 'Auto-Cars/Passenger Vehicles',
        rvol1: 1.52,
        atr: 29.4,
        natr: 3.38,
        pe: 10.6,
        pb: 2.3,
        roe: 19.7,
        roce: 16.9,
        debtToEquity: 0.78,
        dividendYield: 0.72,
        salesGrowth: 14.3,
        profitGrowth: 19.8,
        marketCap: 320
    },
    {
        symbol: 'ASIANPAINT',
        name: 'Asian Paints',
        price: 2891.2,
        change: 0.52,
        industryGroup: 'Chemicals-Paints',
        rvol1: 0.76,
        atr: 68.1,
        natr: 2.36,
        pe: 52.8,
        pb: 14.3,
        roe: 27.4,
        roce: 33.5,
        debtToEquity: 0.11,
        dividendYield: 0.91,
        salesGrowth: 9.2,
        profitGrowth: 11.4,
        marketCap: 277
    }
];
const DEFAULT_WATCHLIST_CONFIG = {
    industryIcon: {
        enabled: true
    },
    rvol1: {
        enabled: true,
        period: 1
    },
    atr: {
        enabled: false,
        period: 14
    },
    natr: {
        enabled: false,
        period: 14
    },
    pe: {
        enabled: false
    },
    pb: {
        enabled: false
    },
    roe: {
        enabled: false
    },
    roce: {
        enabled: false
    },
    debtToEquity: {
        enabled: false
    },
    dividendYield: {
        enabled: false
    },
    salesGrowth: {
        enabled: false
    },
    profitGrowth: {
        enabled: false
    },
    marketCap: {
        enabled: false
    }
};
const DEFAULT_WATCHLIST_COLLECTIONS = [
    {
        id: 'default',
        name: 'Core',
        items: DEFAULT_WATCHLIST
    },
    {
        id: 'momentum',
        name: 'Momentum',
        items: DEFAULT_WATCHLIST.filter((item)=>item.change > 0)
    },
    {
        id: 'financials',
        name: 'Financials',
        items: DEFAULT_WATCHLIST.filter((item)=>item.industryGroup.includes('Bank') || item.industryGroup.includes('Finance'))
    }
];
function getEnabledMetricColumns(config) {
    return WATCHLIST_METRICS.filter((metric)=>config[metric.key].enabled).slice(0, WATCHLIST_MAX_CUSTOM_COLUMNS);
}
function getWatchlistPanelWidth(config) {
    const metricsWidth = getEnabledMetricColumns(config).reduce((sum, metric)=>sum + metric.width, 0);
    return WATCHLIST_PANEL_PADDING_WIDTH + WATCHLIST_PANEL_SYMBOL_WIDTH + WATCHLIST_PANEL_CHANGE_WIDTH + metricsWidth + (config.industryIcon.enabled ? WATCHLIST_PANEL_INDUSTRY_WIDTH : 0);
}
function formatMetricValue(item, metricKey) {
    const value = item[metricKey];
    const definition = METRIC_DEFINITIONS[metricKey];
    if (definition.kind === 'percent') {
        return `${value.toFixed(2)}%`;
    }
    if (definition.kind === 'multiple') {
        return value.toFixed(2);
    }
    if (definition.kind === 'currencyCompact') {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(2)}T`;
        }
        return `${value.toFixed(0)}B`;
    }
    return value.toFixed(2);
}
function getSortValue(item, sortKey) {
    if (sortKey === 'symbol' || sortKey === 'industryGroup') {
        return item[sortKey].toLowerCase();
    }
    return item[sortKey];
}
function SortArrow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "f3124ee7b797f14335fce8da774ed668b6990c2c357abadea9e08a97d060009a") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3124ee7b797f14335fce8da774ed668b6990c2c357abadea9e08a97d060009a";
    }
    const { active, direction } = t0;
    if (!active) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                size: 11,
                className: "text-foreground/70 self-center"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 441,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    if (direction === "asc") {
        let t1;
        if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                size: 11,
                className: "text-foreground self-center"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 451,
                columnNumber: 12
            }, this);
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        return t1;
    }
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
            size: 11,
            className: "text-foreground self-center"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 460,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c3 = SortArrow;
function WatchlistPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(167);
    if ($[0] !== "f3124ee7b797f14335fce8da774ed668b6990c2c357abadea9e08a97d060009a") {
        for(let $i = 0; $i < 167; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3124ee7b797f14335fce8da774ed668b6990c2c357abadea9e08a97d060009a";
    }
    const { config, onConfigChange, onSymbolSelect } = t0;
    const { symbol: activeSymbol, setSymbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("symbol");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("asc");
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [watchlists, setWatchlists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_WATCHLIST_COLLECTIONS);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            DEFAULT_WATCHLIST_COLLECTIONS[0].id
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selectedWatchlistIds, setSelectedWatchlistIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] !== config) {
        t2 = getEnabledMetricColumns(config);
        $[2] = config;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const enabledMetricColumns = t2;
    const enabledIndicatorCount = enabledMetricColumns.length;
    let t3;
    if ($[4] !== selectedWatchlistIds || $[5] !== watchlists) {
        let t4;
        if ($[7] !== selectedWatchlistIds) {
            t4 = ({
                "WatchlistPanel[watchlists.filter()]": (watchlist)=>selectedWatchlistIds.includes(watchlist.id)
            })["WatchlistPanel[watchlists.filter()]"];
            $[7] = selectedWatchlistIds;
            $[8] = t4;
        } else {
            t4 = $[8];
        }
        t3 = watchlists.filter(t4);
        $[4] = selectedWatchlistIds;
        $[5] = watchlists;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const activeWatchlists = t3;
    const activeWatchlist = activeWatchlists[0] ?? watchlists[0];
    let counts;
    if ($[9] !== activeWatchlist?.items) {
        counts = new Map();
        (activeWatchlist?.items ?? []).forEach({
            "WatchlistPanel[(anonymous)()]": (item)=>{
                counts.set(item.industryGroup, (counts.get(item.industryGroup) ?? 0) + 1);
            }
        }["WatchlistPanel[(anonymous)()]"]);
        $[9] = activeWatchlist?.items;
        $[10] = counts;
    } else {
        counts = $[10];
    }
    const industryCounts = counts;
    let segments;
    if ($[11] !== config.industryIcon.enabled || $[12] !== enabledMetricColumns) {
        segments = [
            `${WATCHLIST_PANEL_SYMBOL_WIDTH}px`
        ];
        if (config.industryIcon.enabled) {
            segments.push(`${WATCHLIST_PANEL_INDUSTRY_WIDTH}px`);
        }
        enabledMetricColumns.forEach({
            "WatchlistPanel[enabledMetricColumns.forEach()]": (metric)=>{
                segments.push(`${metric.width}px`);
            }
        }["WatchlistPanel[enabledMetricColumns.forEach()]"]);
        segments.push(`${WATCHLIST_PANEL_CHANGE_WIDTH}px`);
        $[11] = config.industryIcon.enabled;
        $[12] = enabledMetricColumns;
        $[13] = segments;
    } else {
        segments = $[13];
    }
    const gridTemplateColumns = segments.join(" ");
    let items;
    if ($[14] !== activeWatchlist?.items || $[15] !== industryCounts || $[16] !== sortDirection || $[17] !== sortKey) {
        items = [
            ...activeWatchlist?.items ?? []
        ];
        let t4;
        if ($[19] !== industryCounts || $[20] !== sortDirection || $[21] !== sortKey) {
            t4 = ({
                "WatchlistPanel[items.sort()]": (left, right)=>{
                    if (sortKey === "industryGroup") {
                        const leftCount = industryCounts.get(left.industryGroup) ?? 0;
                        const rightCount = industryCounts.get(right.industryGroup) ?? 0;
                        if (leftCount !== rightCount) {
                            return sortDirection === "asc" ? leftCount - rightCount : rightCount - leftCount;
                        }
                        const industryCompare = left.industryGroup.localeCompare(right.industryGroup);
                        if (industryCompare !== 0) {
                            return sortDirection === "asc" ? industryCompare : -industryCompare;
                        }
                    }
                    const leftValue = getSortValue(left, sortKey);
                    const rightValue = getSortValue(right, sortKey);
                    if (typeof leftValue === "string" && typeof rightValue === "string") {
                        return sortDirection === "asc" ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
                    }
                    return sortDirection === "asc" ? Number(leftValue) - Number(rightValue) : Number(rightValue) - Number(leftValue);
                }
            })["WatchlistPanel[items.sort()]"];
            $[19] = industryCounts;
            $[20] = sortDirection;
            $[21] = sortKey;
            $[22] = t4;
        } else {
            t4 = $[22];
        }
        items.sort(t4);
        $[14] = activeWatchlist?.items;
        $[15] = industryCounts;
        $[16] = sortDirection;
        $[17] = sortKey;
        $[18] = items;
    } else {
        items = $[18];
    }
    const sortedItems = items;
    let t4;
    if ($[23] !== onSymbolSelect || $[24] !== setSymbol) {
        t4 = function handleSelect(item_0) {
            setSymbol(item_0.symbol);
            onSymbolSelect?.(item_0.symbol);
        };
        $[23] = onSymbolSelect;
        $[24] = setSymbol;
        $[25] = t4;
    } else {
        t4 = $[25];
    }
    const handleSelect = t4;
    let t5;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = function toggleWatchlistSelection(watchlistId) {
            setSelectedWatchlistIds({
                "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds()]": (current)=>{
                    if (current.includes(watchlistId)) {
                        return current.length === 1 ? current : current.filter({
                            "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]": (id)=>id !== watchlistId
                        }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]"]);
                    }
                    return [
                        watchlistId,
                        ...current.filter({
                            "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]": (id_0)=>id_0 !== watchlistId
                        }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]"])
                    ];
                }
            }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds()]"]);
        };
        $[26] = t5;
    } else {
        t5 = $[26];
    }
    const toggleWatchlistSelection = t5;
    let t6;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = function addWatchlist() {
            setWatchlists({
                "WatchlistPanel[addWatchlist > setWatchlists()]": (current_0)=>{
                    const nextIndex = current_0.length + 1;
                    const nextWatchlist = {
                        id: `custom-${nextIndex}`,
                        name: `Watchlist ${nextIndex}`,
                        items: [
                            ...DEFAULT_WATCHLIST.slice(0, Math.max(3, 6 - nextIndex % 3))
                        ]
                    };
                    setSelectedWatchlistIds([
                        nextWatchlist.id
                    ]);
                    return [
                        ...current_0,
                        nextWatchlist
                    ];
                }
            }["WatchlistPanel[addWatchlist > setWatchlists()]"]);
        };
        $[27] = t6;
    } else {
        t6 = $[27];
    }
    const addWatchlist = t6;
    let t7;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = function removeWatchlist(watchlistId_0) {
            setWatchlists({
                "WatchlistPanel[removeWatchlist > setWatchlists()]": (current_1)=>{
                    if (current_1.length === 1) {
                        return current_1;
                    }
                    const nextWatchlists = current_1.filter({
                        "WatchlistPanel[removeWatchlist > setWatchlists() > current_1.filter()]": (watchlist_0)=>watchlist_0.id !== watchlistId_0
                    }["WatchlistPanel[removeWatchlist > setWatchlists() > current_1.filter()]"]);
                    setSelectedWatchlistIds({
                        "WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds()]": (selected)=>{
                            const filtered = selected.filter({
                                "WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds() > selected.filter()]": (id_1)=>id_1 !== watchlistId_0
                            }["WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds() > selected.filter()]"]);
                            return filtered.length > 0 ? filtered : [
                                nextWatchlists[0].id
                            ];
                        }
                    }["WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds()]"]);
                    return nextWatchlists;
                }
            }["WatchlistPanel[removeWatchlist > setWatchlists()]"]);
        };
        $[28] = t7;
    } else {
        t7 = $[28];
    }
    const removeWatchlist = t7;
    let t8;
    if ($[29] !== activeWatchlist) {
        t8 = function removeRow(symbol) {
            if (!activeWatchlist) {
                return;
            }
            setWatchlists({
                "WatchlistPanel[removeRow > setWatchlists()]": (current_2)=>current_2.map({
                        "WatchlistPanel[removeRow > setWatchlists() > current_2.map()]": (watchlist_1)=>{
                            if (watchlist_1.id !== activeWatchlist.id) {
                                return watchlist_1;
                            }
                            return {
                                ...watchlist_1,
                                items: watchlist_1.items.filter({
                                    "WatchlistPanel[removeRow > setWatchlists() > current_2.map() > watchlist_1.items.filter()]": (item_1)=>item_1.symbol !== symbol
                                }["WatchlistPanel[removeRow > setWatchlists() > current_2.map() > watchlist_1.items.filter()]"])
                            };
                        }
                    }["WatchlistPanel[removeRow > setWatchlists() > current_2.map()]"])
            }["WatchlistPanel[removeRow > setWatchlists()]"]);
        };
        $[29] = activeWatchlist;
        $[30] = t8;
    } else {
        t8 = $[30];
    }
    const removeRow = t8;
    let t9;
    if ($[31] !== sortKey) {
        t9 = function handleSort(nextKey) {
            if (sortKey === nextKey) {
                setSortDirection(_WatchlistPanelHandleSortSetSortDirection);
                return;
            }
            setSortKey(nextKey);
            setSortDirection(nextKey === "symbol" || nextKey === "industryGroup" ? "asc" : "desc");
        };
        $[31] = sortKey;
        $[32] = t9;
    } else {
        t9 = $[32];
    }
    const handleSort = t9;
    let t10;
    if ($[33] !== enabledIndicatorCount || $[34] !== onConfigChange) {
        t10 = function updateColumnEnabled(columnKey, enabled) {
            onConfigChange({
                "WatchlistPanel[updateColumnEnabled > onConfigChange()]": (current_4)=>{
                    if (columnKey !== "industryIcon" && enabled && !current_4[columnKey].enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS) {
                        return current_4;
                    }
                    return {
                        ...current_4,
                        [columnKey]: {
                            ...current_4[columnKey],
                            enabled
                        }
                    };
                }
            }["WatchlistPanel[updateColumnEnabled > onConfigChange()]"]);
        };
        $[33] = enabledIndicatorCount;
        $[34] = onConfigChange;
        $[35] = t10;
    } else {
        t10 = $[35];
    }
    const updateColumnEnabled = t10;
    let t11;
    if ($[36] !== onConfigChange) {
        t11 = function updateColumnPeriod(columnKey_0, period) {
            onConfigChange({
                "WatchlistPanel[updateColumnPeriod > onConfigChange()]": (current_5)=>({
                        ...current_5,
                        [columnKey_0]: {
                            ...current_5[columnKey_0],
                            period
                        }
                    })
            }["WatchlistPanel[updateColumnPeriod > onConfigChange()]"]);
        };
        $[36] = onConfigChange;
        $[37] = t11;
    } else {
        t11 = $[37];
    }
    const updateColumnPeriod = t11;
    let t12;
    if ($[38] !== config) {
        t12 = getWatchlistPanelWidth(config);
        $[38] = config;
        $[39] = t12;
    } else {
        t12 = $[39];
    }
    const t13 = `${t12}px`;
    let t14;
    if ($[40] !== t13) {
        t14 = {
            width: t13
        };
        $[40] = t13;
        $[41] = t14;
    } else {
        t14 = $[41];
    }
    let t15;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            title: "Add stock to watchlist",
            onClick: {
                "WatchlistPanel[<Button>.onClick]": ()=>setSearchOpen(true)
            }["WatchlistPanel[<Button>.onClick]"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 798,
                columnNumber: 44
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 796,
            columnNumber: 11
        }, this);
        $[42] = t15;
    } else {
        t15 = $[42];
    }
    const t16 = activeWatchlist?.name ?? "Watchlist";
    let t17;
    if ($[43] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "truncate",
            children: t16
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 806,
            columnNumber: 11
        }, this);
        $[43] = t16;
        $[44] = t17;
    } else {
        t17 = $[44];
    }
    let t18;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 814,
            columnNumber: 11
        }, this);
        $[45] = t18;
    } else {
        t18 = $[45];
    }
    let t19;
    if ($[46] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                className: "h-7 w-[172px] justify-between gap-1 px-1 text-left text-[13px] font-semibold text-foreground",
                children: [
                    t17,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 821,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 821,
            columnNumber: 11
        }, this);
        $[46] = t17;
        $[47] = t19;
    } else {
        t19 = $[47];
    }
    let t20;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
            children: "My Watchlists"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 829,
            columnNumber: 11
        }, this);
        $[48] = t20;
    } else {
        t20 = $[48];
    }
    let t21;
    if ($[49] !== selectedWatchlistIds || $[50] !== watchlists) {
        let t22;
        if ($[52] !== selectedWatchlistIds || $[53] !== watchlists.length) {
            t22 = ({
                "WatchlistPanel[watchlists.map()]": (watchlist_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                checked: selectedWatchlistIds.includes(watchlist_2.id),
                                onSelect: _WatchlistPanelWatchlistsMapDropdownMenuCheckboxItemOnSelect,
                                onCheckedChange: {
                                    "WatchlistPanel[watchlists.map() > <DropdownMenuCheckboxItem>.onCheckedChange]": ()=>toggleWatchlistSelection(watchlist_2.id)
                                }["WatchlistPanel[watchlists.map() > <DropdownMenuCheckboxItem>.onCheckedChange]"],
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: watchlist_2.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 841,
                                    columnNumber: 114
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 839,
                                columnNumber: 122
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "WatchlistPanel[watchlists.map() > <button>.onClick]": (event_0)=>{
                                        event_0.preventDefault();
                                        event_0.stopPropagation();
                                        removeWatchlist(watchlist_2.id);
                                    }
                                }["WatchlistPanel[watchlists.map() > <button>.onClick]"],
                                className: "mr-1 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
                                disabled: watchlists.length === 1,
                                title: "Remove watchlist",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 847,
                                    columnNumber: 287
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 841,
                                columnNumber: 193
                            }, this)
                        ]
                    }, watchlist_2.id, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 839,
                        columnNumber: 60
                    }, this)
            })["WatchlistPanel[watchlists.map()]"];
            $[52] = selectedWatchlistIds;
            $[53] = watchlists.length;
            $[54] = t22;
        } else {
            t22 = $[54];
        }
        t21 = watchlists.map(t22);
        $[49] = selectedWatchlistIds;
        $[50] = watchlists;
        $[51] = t21;
    } else {
        t21 = $[51];
    }
    let t22;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 864,
            columnNumber: 11
        }, this);
        $[55] = t22;
    } else {
        t22 = $[55];
    }
    let t23;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
            onSelect: addWatchlist,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 871,
                    columnNumber: 53
                }, this),
                "Add watchlist"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 871,
            columnNumber: 11
        }, this);
        $[56] = t23;
    } else {
        t23 = $[56];
    }
    let t24;
    if ($[57] !== t21) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
            align: "start",
            className: "w-[260px] p-1",
            children: [
                t20,
                t21,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 878,
            columnNumber: 11
        }, this);
        $[57] = t21;
        $[58] = t24;
    } else {
        t24 = $[58];
    }
    let t25;
    if ($[59] !== t19 || $[60] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                    children: [
                        t19,
                        t24
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 886,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 886,
            columnNumber: 11
        }, this);
        $[59] = t19;
        $[60] = t24;
        $[61] = t25;
    } else {
        t25 = $[61];
    }
    let t26;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                title: "Watchlist settings",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                    size: 15
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 895,
                    columnNumber: 130
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 895,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 895,
            columnNumber: 11
        }, this);
        $[62] = t26;
    } else {
        t26 = $[62];
    }
    let t27;
    let t28;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                className: "px-0 py-0 text-foreground",
                children: "Watchlist Columns"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 903,
                columnNumber: 32
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 903,
            columnNumber: 11
        }, this);
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 904,
            columnNumber: 11
        }, this);
        $[63] = t27;
        $[64] = t28;
    } else {
        t27 = $[63];
        t28 = $[64];
    }
    let t29;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-medium text-foreground",
                children: "Industry Group"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 913,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 913,
            columnNumber: 11
        }, this);
        $[65] = t29;
    } else {
        t29 = $[65];
    }
    let t30;
    if ($[66] !== config.industryIcon.enabled || $[67] !== updateColumnEnabled) {
        t30 = ({
            "WatchlistPanel[<button>.onClick]": ()=>updateColumnEnabled("industryIcon", !config.industryIcon.enabled)
        })["WatchlistPanel[<button>.onClick]"];
        $[66] = config.industryIcon.enabled;
        $[67] = updateColumnEnabled;
        $[68] = t30;
    } else {
        t30 = $[68];
    }
    const t31 = config.industryIcon.enabled ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-border text-muted-foreground hover:bg-muted/50";
    let t32;
    if ($[69] !== t31) {
        t32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors", t31);
        $[69] = t31;
        $[70] = t32;
    } else {
        t32 = $[70];
    }
    let t33;
    if ($[71] !== config.industryIcon.enabled) {
        t33 = config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 940,
            columnNumber: 42
        }, this);
        $[71] = config.industryIcon.enabled;
        $[72] = t33;
    } else {
        t33 = $[72];
    }
    const t34 = config.industryIcon.enabled ? "Include" : "Exclude";
    let t35;
    if ($[73] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t34
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 949,
            columnNumber: 11
        }, this);
        $[73] = t34;
        $[74] = t35;
    } else {
        t35 = $[74];
    }
    let t36;
    if ($[75] !== t30 || $[76] !== t32 || $[77] !== t33 || $[78] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2",
            children: [
                t29,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: t30,
                    className: t32,
                    children: [
                        t33,
                        t35
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 957,
                    columnNumber: 123
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 957,
            columnNumber: 11
        }, this);
        $[75] = t30;
        $[76] = t32;
        $[77] = t33;
        $[78] = t35;
        $[79] = t36;
    } else {
        t36 = $[79];
    }
    let t37;
    if ($[80] !== config || $[81] !== enabledIndicatorCount || $[82] !== updateColumnEnabled || $[83] !== updateColumnPeriod) {
        t37 = [
            {
                title: "Technicals",
                keys: TECHNICAL_METRIC_KEYS
            },
            {
                title: "Fundamentals",
                keys: FUNDAMENTAL_METRIC_KEYS
            }
        ].map({
            "WatchlistPanel[(anonymous)()]": (section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 975,
                            columnNumber: 98
                        }, this),
                        section.keys.map({
                            "WatchlistPanel[(anonymous)() > section.keys.map()]": (metricKey)=>{
                                const metric_0 = METRIC_DEFINITIONS[metricKey];
                                const column = config[metric_0.key];
                                const limitReached = !column.enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border bg-background px-3 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-foreground",
                                                        children: metric_0.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 175
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 170
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: limitReached,
                                                    onClick: {
                                                        "WatchlistPanel[(anonymous)() > section.keys.map() > <button>.onClick]": ()=>updateColumnEnabled(metric_0.key, !column.enabled)
                                                    }["WatchlistPanel[(anonymous)() > section.keys.map() > <button>.onClick]"],
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50", column.enabled ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-border text-muted-foreground hover:bg-muted/50"),
                                                    children: [
                                                        column.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 406
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: column.enabled ? "Included" : "Include"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 426
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 256
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 980,
                                            columnNumber: 114
                                        }, this),
                                        metric_0.periodOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 grid grid-cols-[1fr_84px] items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Parameter"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 589
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(column.period ?? metric_0.periodOptions[0]),
                                                    onChange: {
                                                        "WatchlistPanel[(anonymous)() > section.keys.map() > <Select>.onChange]": (event_1)=>updateColumnPeriod(metric_0.key, Number(event_1.target.value))
                                                    }["WatchlistPanel[(anonymous)() > section.keys.map() > <Select>.onChange]"],
                                                    className: "h-7 text-xs",
                                                    children: metric_0.periodOptions.map(_WatchlistPanelAnonymousSectionKeysMapMetric_0PeriodOptionsMap)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 655
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 982,
                                            columnNumber: 522
                                        }, this)
                                    ]
                                }, metric_0.key, true, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 980,
                                    columnNumber: 20
                                }, this);
                            }
                        }["WatchlistPanel[(anonymous)() > section.keys.map()]"])
                    ]
                }, section.title, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 975,
                    columnNumber: 51
                }, this)
        }["WatchlistPanel[(anonymous)()]"]);
        $[80] = config;
        $[81] = enabledIndicatorCount;
        $[82] = updateColumnEnabled;
        $[83] = updateColumnPeriod;
        $[84] = t37;
    } else {
        t37 = $[84];
    }
    let t38;
    if ($[85] !== t36 || $[86] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                children: [
                    t26,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                        align: "end",
                        className: "w-[320px] p-0",
                        children: [
                            t27,
                            t28,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-[420px] space-y-3 overflow-y-auto p-3",
                                children: [
                                    t36,
                                    t37
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 998,
                                columnNumber: 140
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 998,
                        columnNumber: 71
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 998,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 998,
            columnNumber: 11
        }, this);
        $[85] = t36;
        $[86] = t37;
        $[87] = t38;
    } else {
        t38 = $[87];
    }
    let t39;
    if ($[88] !== t25 || $[89] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-b border-border px-2 py-2",
            children: [
                t25,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1007,
            columnNumber: 11
        }, this);
        $[88] = t25;
        $[89] = t38;
        $[90] = t39;
    } else {
        t39 = $[90];
    }
    let t40;
    if ($[91] !== gridTemplateColumns) {
        t40 = {
            gridTemplateColumns
        };
        $[91] = gridTemplateColumns;
        $[92] = t40;
    } else {
        t40 = $[92];
    }
    let t41;
    if ($[93] !== handleSort) {
        t41 = ({
            "WatchlistPanel[<button>.onClick]": ()=>handleSort("symbol")
        })["WatchlistPanel[<button>.onClick]"];
        $[93] = handleSort;
        $[94] = t41;
    } else {
        t41 = $[94];
    }
    let t42;
    if ($[95] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Symbol"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1036,
            columnNumber: 11
        }, this);
        $[95] = t42;
    } else {
        t42 = $[95];
    }
    const t43 = sortKey === "symbol";
    let t44;
    if ($[96] !== sortDirection || $[97] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
            active: t43,
            direction: sortDirection
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1044,
            columnNumber: 11
        }, this);
        $[96] = sortDirection;
        $[97] = t43;
        $[98] = t44;
    } else {
        t44 = $[98];
    }
    let t45;
    if ($[99] !== t41 || $[100] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t41,
            className: "flex min-w-0 items-center gap-px text-left hover:text-foreground",
            children: [
                t42,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1053,
            columnNumber: 11
        }, this);
        $[99] = t41;
        $[100] = t44;
        $[101] = t45;
    } else {
        t45 = $[101];
    }
    let t46;
    if ($[102] !== config.industryIcon.enabled || $[103] !== handleSort || $[104] !== sortDirection || $[105] !== sortKey) {
        t46 = config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "WatchlistPanel[<button>.onClick]": ()=>handleSort("industryGroup")
            }["WatchlistPanel[<button>.onClick]"],
            className: "flex items-center justify-center gap-px text-center hover:text-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Ind"
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1064,
                    columnNumber: 130
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                    active: sortKey === "industryGroup",
                    direction: sortDirection
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1064,
                    columnNumber: 146
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1062,
            columnNumber: 42
        }, this);
        $[102] = config.industryIcon.enabled;
        $[103] = handleSort;
        $[104] = sortDirection;
        $[105] = sortKey;
        $[106] = t46;
    } else {
        t46 = $[106];
    }
    let t47;
    if ($[107] !== config || $[108] !== enabledMetricColumns || $[109] !== handleSort || $[110] !== sortDirection || $[111] !== sortKey) {
        let t48;
        if ($[113] !== config || $[114] !== handleSort || $[115] !== sortDirection || $[116] !== sortKey) {
            t48 = ({
                "WatchlistPanel[enabledMetricColumns.map()]": (metric_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "WatchlistPanel[enabledMetricColumns.map() > <button>.onClick]": ()=>handleSort(metric_1.key)
                        }["WatchlistPanel[enabledMetricColumns.map() > <button>.onClick]"],
                        className: "flex items-center justify-end gap-px text-right hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    metric_1.shortLabel,
                                    config[metric_1.key].period ? `(${config[metric_1.key].period})` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1080,
                                columnNumber: 159
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                active: sortKey === metric_1.key,
                                direction: sortDirection
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1080,
                                columnNumber: 264
                            }, this)
                        ]
                    }, metric_1.key, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 1078,
                        columnNumber: 67
                    }, this)
            })["WatchlistPanel[enabledMetricColumns.map()]"];
            $[113] = config;
            $[114] = handleSort;
            $[115] = sortDirection;
            $[116] = sortKey;
            $[117] = t48;
        } else {
            t48 = $[117];
        }
        t47 = enabledMetricColumns.map(t48);
        $[107] = config;
        $[108] = enabledMetricColumns;
        $[109] = handleSort;
        $[110] = sortDirection;
        $[111] = sortKey;
        $[112] = t47;
    } else {
        t47 = $[112];
    }
    let t48;
    if ($[118] !== handleSort) {
        t48 = ({
            "WatchlistPanel[<button>.onClick]": ()=>handleSort("change")
        })["WatchlistPanel[<button>.onClick]"];
        $[118] = handleSort;
        $[119] = t48;
    } else {
        t48 = $[119];
    }
    let t49;
    if ($[120] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Chg%"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1112,
            columnNumber: 11
        }, this);
        $[120] = t49;
    } else {
        t49 = $[120];
    }
    const t50 = sortKey === "change";
    let t51;
    if ($[121] !== sortDirection || $[122] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
            active: t50,
            direction: sortDirection
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1120,
            columnNumber: 11
        }, this);
        $[121] = sortDirection;
        $[122] = t50;
        $[123] = t51;
    } else {
        t51 = $[123];
    }
    let t52;
    if ($[124] !== t48 || $[125] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t48,
            className: "flex items-center justify-end gap-px text-right hover:text-foreground",
            children: [
                t49,
                t51
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1129,
            columnNumber: 11
        }, this);
        $[124] = t48;
        $[125] = t51;
        $[126] = t52;
    } else {
        t52 = $[126];
    }
    let t53;
    if ($[127] !== t40 || $[128] !== t45 || $[129] !== t46 || $[130] !== t47 || $[131] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid items-center gap-px border-b border-border bg-muted/30 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
            style: t40,
            children: [
                t45,
                t46,
                t47,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1138,
            columnNumber: 11
        }, this);
        $[127] = t40;
        $[128] = t45;
        $[129] = t46;
        $[130] = t47;
        $[131] = t52;
        $[132] = t53;
    } else {
        t53 = $[132];
    }
    let t54;
    if ($[133] !== activeSymbol || $[134] !== config.industryIcon.enabled || $[135] !== enabledMetricColumns || $[136] !== gridTemplateColumns || $[137] !== handleSelect || $[138] !== removeRow || $[139] !== sortedItems) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: sortedItems.map({
                "WatchlistPanel[sortedItems.map()]": (item_2)=>{
                    const isActive = item_2.symbol === activeSymbol;
                    const isPositive = item_2.change > 0;
                    const isNegative = item_2.change < 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "WatchlistPanel[sortedItems.map() > <button>.onClick]": ()=>handleSelect(item_2)
                        }["WatchlistPanel[sortedItems.map() > <button>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative grid min-h-10 w-full items-center gap-px border-b border-border/80 px-2 pr-4 py-2 text-left transition-colors", isActive ? "bg-amber-500/5 hover:bg-muted/40" : "bg-transparent hover:bg-muted/40"),
                        style: {
                            gridTemplateColumns
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex flex-col justify-center truncate",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 truncate text-[12px] font-semibold leading-tight", isActive ? "text-amber-500" : "text-foreground"),
                                        children: item_2.symbol
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 77
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 truncate text-[10px] text-muted-foreground leading-tight",
                                        title: item_2.name,
                                        children: item_2.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 227
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1159,
                                columnNumber: 14
                            }, this),
                            config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center text-base leading-none",
                                title: item_2.industryGroup,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndustryGroupEmoji"])(item_2.industryGroup)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1159,
                                columnNumber: 386
                            }, this),
                            enabledMetricColumns.map({
                                "WatchlistPanel[sortedItems.map() > enabledMetricColumns.map()]": (metric_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-right text-[11px] font-mono text-foreground/90",
                                        children: formatMetricValue(item_2, metric_2.key)
                                    }, metric_2.key, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1160,
                                        columnNumber: 93
                                    }, this)
                            }["WatchlistPanel[sortedItems.map() > enabledMetricColumns.map()]"]),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("truncate text-right text-[11px] font-semibold", isPositive ? "text-emerald-500" : isNegative ? "text-rose-500" : "text-muted-foreground"),
                                        children: [
                                            isPositive ? "+" : "",
                                            item_2.change.toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 131
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-right text-[10px] font-mono text-muted-foreground",
                                        children: [
                                            "₹",
                                            item_2.price.toLocaleString("en-IN", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 346
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1161,
                                columnNumber: 82
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "button",
                                tabIndex: 0,
                                onClick: {
                                    "WatchlistPanel[sortedItems.map() > <span>.onClick]": (event_2)=>{
                                        event_2.stopPropagation();
                                        removeRow(item_2.symbol);
                                    }
                                }["WatchlistPanel[sortedItems.map() > <span>.onClick]"],
                                onKeyDown: {
                                    "WatchlistPanel[sortedItems.map() > <span>.onKeyDown]": (event_3)=>{
                                        if (event_3.key === "Enter" || event_3.key === " ") {
                                            event_3.preventDefault();
                                            event_3.stopPropagation();
                                            removeRow(item_2.symbol);
                                        }
                                    }
                                }["WatchlistPanel[sortedItems.map() > <span>.onKeyDown]"],
                                className: "absolute right-1 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-rose-500 group-hover:opacity-100",
                                title: "Remove row",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 13
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 1177,
                                    columnNumber: 271
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1164,
                                columnNumber: 32
                            }, this)
                        ]
                    }, item_2.symbol, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 1155,
                        columnNumber: 18
                    }, this);
                }
            }["WatchlistPanel[sortedItems.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1150,
            columnNumber: 11
        }, this);
        $[133] = activeSymbol;
        $[134] = config.industryIcon.enabled;
        $[135] = enabledMetricColumns;
        $[136] = gridTemplateColumns;
        $[137] = handleSelect;
        $[138] = removeRow;
        $[139] = sortedItems;
        $[140] = t54;
    } else {
        t54 = $[140];
    }
    let t55;
    if ($[141] !== sortedItems.length) {
        t55 = sortedItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-32 items-center justify-center border-b border-dashed border-border text-sm text-muted-foreground",
            children: "This watchlist is empty."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1193,
            columnNumber: 39
        }, this);
        $[141] = sortedItems.length;
        $[142] = t55;
    } else {
        t55 = $[142];
    }
    let t56;
    if ($[143] !== t54 || $[144] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-0 pb-1",
            children: [
                t54,
                t55
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1201,
            columnNumber: 11
        }, this);
        $[143] = t54;
        $[144] = t55;
        $[145] = t56;
    } else {
        t56 = $[145];
    }
    let t57;
    if ($[146] === Symbol.for("react.memo_cache_sentinel")) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                children: "Add Stock to Watchlist"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 1210,
                columnNumber: 25
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1210,
            columnNumber: 11
        }, this);
        $[146] = t57;
    } else {
        t57 = $[146];
    }
    let t58;
    if ($[147] === Symbol.for("react.memo_cache_sentinel")) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1217,
            columnNumber: 11
        }, this);
        $[147] = t58;
    } else {
        t58 = $[147];
    }
    let t59;
    if ($[148] === Symbol.for("react.memo_cache_sentinel")) {
        t59 = ({
            "WatchlistPanel[<Input>.onChange]": (e)=>setSearchQuery(e.target.value)
        })["WatchlistPanel[<Input>.onChange]"];
        $[148] = t59;
    } else {
        t59 = $[148];
    }
    let t60;
    let t61;
    if ($[149] !== searchQuery) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            placeholder: "Search by symbol or name...",
            value: searchQuery,
            onChange: t59,
            className: "pl-9",
            autoFocus: true
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1234,
            columnNumber: 11
        }, this);
        t61 = searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "WatchlistPanel[<button>.onClick]": ()=>setSearchQuery("")
            }["WatchlistPanel[<button>.onClick]"],
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 1237,
                columnNumber: 142
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1235,
            columnNumber: 26
        }, this);
        $[149] = searchQuery;
        $[150] = t60;
        $[151] = t61;
    } else {
        t60 = $[150];
        t61 = $[151];
    }
    let t62;
    if ($[152] !== t60 || $[153] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t58,
                t60,
                t61
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1247,
            columnNumber: 11
        }, this);
        $[152] = t60;
        $[153] = t61;
        $[154] = t62;
    } else {
        t62 = $[154];
    }
    let t63;
    if ($[155] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-muted-foreground",
            children: "Search functionality coming soon..."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1256,
            columnNumber: 11
        }, this);
        $[155] = t63;
    } else {
        t63 = $[155];
    }
    let t64;
    if ($[156] !== t62) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            children: [
                t57,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        t62,
                        t63
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1263,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1263,
            columnNumber: 11
        }, this);
        $[156] = t62;
        $[157] = t64;
    } else {
        t64 = $[157];
    }
    let t65;
    if ($[158] !== searchOpen || $[159] !== t64) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
            open: searchOpen,
            onOpenChange: setSearchOpen,
            children: t64
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1271,
            columnNumber: 11
        }, this);
        $[158] = searchOpen;
        $[159] = t64;
        $[160] = t65;
    } else {
        t65 = $[160];
    }
    let t66;
    if ($[161] !== t14 || $[162] !== t39 || $[163] !== t53 || $[164] !== t56 || $[165] !== t65) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col overflow-hidden border-l border-border bg-background/95 shadow-2xl backdrop-blur",
            style: t14,
            children: [
                t39,
                t53,
                t56,
                t65
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1280,
            columnNumber: 11
        }, this);
        $[161] = t14;
        $[162] = t39;
        $[163] = t53;
        $[164] = t56;
        $[165] = t65;
        $[166] = t66;
    } else {
        t66 = $[166];
    }
    return t66;
}
_s(WatchlistPanel, "wGHMsgDdpEYFb7mB4PUP3N+1CZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
_c4 = WatchlistPanel;
function _WatchlistPanelAnonymousSectionKeysMapMetric_0PeriodOptionsMap(option) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: option,
        children: option
    }, option, false, {
        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
        lineNumber: 1293,
        columnNumber: 10
    }, this);
}
function _WatchlistPanelWatchlistsMapDropdownMenuCheckboxItemOnSelect(event) {
    return event.preventDefault();
}
function _WatchlistPanelHandleSortSetSortDirection(current_3) {
    return current_3 === "asc" ? "desc" : "asc";
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "METRIC_DEFINITIONS$Object.fromEntries$WATCHLIST_METRICS.map");
__turbopack_context__.k.register(_c1, "METRIC_DEFINITIONS$Object.fromEntries");
__turbopack_context__.k.register(_c2, "METRIC_DEFINITIONS");
__turbopack_context__.k.register(_c3, "SortArrow");
__turbopack_context__.k.register(_c4, "WatchlistPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/TopBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * TopBar — the chart's top control strip.
 * Symbol + price, timeframe selector, chart type selector, indicators button,
 * theme toggle, fullscreen toggle.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-area.js [app-client] (ecmascript) <export default as AreaChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column-increasing.js [app-client] (ecmascript) <export default as BarChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
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
const CHART_TYPES = [
    {
        value: 'candlestick',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 27,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Candlestick'
    },
    {
        value: 'ohlc',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 31,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'OHLC'
    },
    {
        value: 'line',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Line'
    },
    {
        value: 'area',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__["AreaChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 39,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Area'
    },
    {
        value: 'bar',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 43,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Bar'
    }
];
function TopBar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(88);
    if ($[0] !== "27a175f548a7296254390dcecba215c9afd93470822f91bd3b53709c7e956977") {
        for(let $i = 0; $i < 88; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "27a175f548a7296254390dcecba215c9afd93470822f91bd3b53709c7e956977";
    }
    const { symbol, currentPrice, priceChange, onIndicatorsClick, onScreenshot, fullscreenMode: t1, embeddedPanel: t2, workspaceMode: t3, watchlistConfig, onWatchlistConfigChange } = t0;
    const fullscreenMode = t1 === undefined ? false : t1;
    const embeddedPanel = t2 === undefined ? false : t2;
    const workspaceMode = t3 === undefined ? false : t3;
    const { timeframe, chartType, isDark, isFullscreen, indicators, showWatchlist, showLayoutPanel, setTimeframe, setChartType, toggleDark, toggleFullscreen, toggleWatchlist, toggleLayoutPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showChartTypeMenu, setShowChartTypeMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isPos = (priceChange ?? 0) > 0;
    const isNeg = (priceChange ?? 0) < 0;
    let t4;
    if ($[1] !== embeddedPanel || $[2] !== fullscreenMode || $[3] !== router || $[4] !== symbol || $[5] !== toggleFullscreen || $[6] !== workspaceMode) {
        t4 = ({
            "TopBar[handleFullscreenClick]": ()=>{
                if (embeddedPanel) {
                    globalThis.window?.top?.location.assign(`/stocks/${encodeURIComponent(symbol)}/chart`);
                    return;
                }
                if (workspaceMode) {
                    router.push(`/stocks/${symbol}`);
                    return;
                }
                if (fullscreenMode) {
                    router.push(`/stocks/${symbol}`);
                } else {
                    toggleFullscreen();
                }
            }
        })["TopBar[handleFullscreenClick]"];
        $[1] = embeddedPanel;
        $[2] = fullscreenMode;
        $[3] = router;
        $[4] = symbol;
        $[5] = toggleFullscreen;
        $[6] = workspaceMode;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const handleFullscreenClick = t4;
    const t5 = embeddedPanel ? "px-2 py-1.5" : "px-3 py-2 flex-wrap";
    let t6;
    if ($[8] !== t5) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 border-b border-border bg-background select-none z-10", t5);
        $[8] = t5;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    const t7 = symbol || "RELIANCE";
    let t8;
    if ($[10] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-bold font-mono text-foreground",
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 142,
            columnNumber: 10
        }, this);
        $[10] = t7;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== currentPrice || $[13] !== isNeg || $[14] !== isPos || $[15] !== priceChange) {
        t9 = currentPrice != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-mono font-semibold text-foreground",
                    children: [
                        "₹",
                        currentPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 150,
                    columnNumber: 36
                }, this),
                priceChange != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-mono font-medium", isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-muted-foreground"),
                    children: [
                        isPos ? "+" : "",
                        priceChange.toFixed(2),
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 153,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true);
        $[12] = currentPrice;
        $[13] = isNeg;
        $[14] = isPos;
        $[15] = priceChange;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== t8 || $[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 px-2 py-1 rounded-md bg-muted/20 border border-border",
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[17] = t8;
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-px h-4 bg-border"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    const t12 = embeddedPanel ? "overflow-x-auto pr-1" : null;
    let t13;
    if ($[21] !== t12) {
        t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-0.5", t12);
        $[21] = t12;
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== setTimeframe || $[24] !== timeframe) {
        t14 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIMEFRAMES"].map({
            "TopBar[TIMEFRAMES.map()]": (tf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "TopBar[TIMEFRAMES.map() > <button>.onClick]": ()=>setTimeframe(tf.value)
                    }["TopBar[TIMEFRAMES.map() > <button>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-0.5 text-[11px] font-medium rounded transition-colors", timeframe === tf.value ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
                    children: tf.label
                }, tf.value, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 190,
                    columnNumber: 41
                }, this)
        }["TopBar[TIMEFRAMES.map()]"]);
        $[23] = setTimeframe;
        $[24] = timeframe;
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] !== t13 || $[27] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t13,
            children: t14
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[26] = t13;
        $[27] = t14;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-px h-4 bg-border"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 211,
            columnNumber: 11
        }, this);
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    let t17;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "TopBar[<button>.onClick]": ()=>setShowChartTypeMenu(_TopBarButtonOnClickSetShowChartTypeMenu)
        })["TopBar[<button>.onClick]"];
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] !== chartType) {
        t18 = CHART_TYPES.find({
            "TopBar[CHART_TYPES.find()]": (c)=>c.value === chartType
        }["TopBar[CHART_TYPES.find()]"])?.icon;
        $[31] = chartType;
        $[32] = t18;
    } else {
        t18 = $[32];
    }
    let t19;
    if ($[33] !== chartType) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "capitalize text-[11px]",
            children: chartType
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 237,
            columnNumber: 11
        }, this);
        $[33] = chartType;
        $[34] = t19;
    } else {
        t19 = $[34];
    }
    let t20;
    if ($[35] !== t18 || $[36] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t17,
            className: "flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
            title: "Chart type",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 245,
            columnNumber: 11
        }, this);
        $[35] = t18;
        $[36] = t19;
        $[37] = t20;
    } else {
        t20 = $[37];
    }
    let t21;
    if ($[38] !== chartType || $[39] !== setChartType || $[40] !== showChartTypeMenu) {
        t21 = showChartTypeMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100]",
                    onClick: {
                        "TopBar[<div>.onClick]": ()=>setShowChartTypeMenu(false)
                    }["TopBar[<div>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 254,
                    columnNumber: 34
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-full left-0 mt-1 z-[101] bg-background border border-border rounded-lg shadow-xl py-1 min-w-[140px]",
                    children: CHART_TYPES.map({
                        "TopBar[CHART_TYPES.map()]": (ct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 w-full px-3 py-1.5 text-xs transition-colors", chartType === ct.value ? "text-amber-500 bg-amber-500/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
                                onClick: {
                                    "TopBar[CHART_TYPES.map() > <button>.onClick]": ()=>{
                                        setChartType(ct.value);
                                        setShowChartTypeMenu(false);
                                    }
                                }["TopBar[CHART_TYPES.map() > <button>.onClick]"],
                                children: [
                                    ct.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: ct.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 262,
                                        columnNumber: 71
                                    }, this)
                                ]
                            }, ct.value, true, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 257,
                                columnNumber: 46
                            }, this)
                    }["TopBar[CHART_TYPES.map()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 256,
                    columnNumber: 37
                }, this)
            ]
        }, void 0, true);
        $[38] = chartType;
        $[39] = setChartType;
        $[40] = showChartTypeMenu;
        $[41] = t21;
    } else {
        t21 = $[41];
    }
    let t22;
    if ($[42] !== t20 || $[43] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[42] = t20;
        $[43] = t21;
        $[44] = t22;
    } else {
        t22 = $[44];
    }
    let t23;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-px h-4 bg-border"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[45] = t23;
    } else {
        t23 = $[45];
    }
    let t24;
    if ($[46] !== embeddedPanel || $[47] !== indicators || $[48] !== onIndicatorsClick) {
        t24 = !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onIndicatorsClick,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors", indicators.length > 0 ? "bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 289,
                    columnNumber: 340
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Indicators"
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 289,
                    columnNumber: 363
                }, this),
                indicators.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-0.5 bg-amber-500 text-black text-[9px] font-bold px-1 rounded-full",
                    children: indicators.length
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 289,
                    columnNumber: 412
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 289,
            columnNumber: 29
        }, this);
        $[46] = embeddedPanel;
        $[47] = indicators;
        $[48] = onIndicatorsClick;
        $[49] = t24;
    } else {
        t24 = $[49];
    }
    let t25;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[50] = t25;
    } else {
        t25 = $[50];
    }
    let t26;
    if ($[51] !== embeddedPanel || $[52] !== onWatchlistConfigChange || $[53] !== showWatchlist || $[54] !== toggleWatchlist || $[55] !== watchlistConfig) {
        t26 = !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-muted-foreground px-2 py-1 rounded-md border border-border bg-muted/20",
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST"].length,
                        " stocks"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 306,
                    columnNumber: 90
                }, this),
                showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                                title: "Configure watchlist",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 306,
                                    columnNumber: 433
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 306,
                                columnNumber: 305
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                            lineNumber: 306,
                            columnNumber: 269
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                            align: "end",
                            className: "w-80 p-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                    children: "Watchlist Columns"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 306,
                                    columnNumber: 540
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: watchlistConfig.industryIcon.enabled,
                                    onSelect: _TopBarDropdownMenuCheckboxItemOnSelect,
                                    onCheckedChange: {
                                        "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]": (checked)=>onWatchlistConfigChange({
                                                "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]": (prev)=>({
                                                        ...prev,
                                                        industryIcon: {
                                                            ...prev.industryIcon,
                                                            enabled: Boolean(checked)
                                                        }
                                                    })
                                            }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]"])
                                    }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]"],
                                    children: "Industry Icon"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 306,
                                    columnNumber: 596
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: watchlistConfig.rvol1.enabled,
                                    onSelect: _TopBarDropdownMenuCheckboxItemOnSelect2,
                                    onCheckedChange: {
                                        "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]": (checked_0)=>onWatchlistConfigChange({
                                                "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]": (prev_0)=>({
                                                        ...prev_0,
                                                        rvol1: {
                                                            ...prev_0.rvol1,
                                                            enabled: Boolean(checked_0)
                                                        }
                                                    })
                                            }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]"])
                                    }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]"],
                                    children: "RVOL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 316,
                                    columnNumber: 108
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: watchlistConfig.atr.enabled,
                                    onSelect: _TopBarDropdownMenuCheckboxItemOnSelect3,
                                    onCheckedChange: {
                                        "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]": (checked_1)=>onWatchlistConfigChange({
                                                "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]": (prev_1)=>({
                                                        ...prev_1,
                                                        atr: {
                                                            ...prev_1.atr,
                                                            enabled: Boolean(checked_1)
                                                        }
                                                    })
                                            }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]"])
                                    }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]"],
                                    children: "ATR"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 326,
                                    columnNumber: 99
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                    checked: watchlistConfig.natr.enabled,
                                    onSelect: _TopBarDropdownMenuCheckboxItemOnSelect4,
                                    onCheckedChange: {
                                        "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]": (checked_2)=>onWatchlistConfigChange({
                                                "TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]": (prev_2)=>({
                                                        ...prev_2,
                                                        natr: {
                                                            ...prev_2.natr,
                                                            enabled: Boolean(checked_2)
                                                        }
                                                    })
                                            }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange > onWatchlistConfigChange()]"])
                                    }["TopBar[<DropdownMenuCheckboxItem>.onCheckedChange]"],
                                    children: "NATR"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 336,
                                    columnNumber: 98
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 346,
                                    columnNumber: 99
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 px-2 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "RVOL Period"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 224
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(watchlistConfig.rvol1.period ?? 1),
                                                    onChange: {
                                                        "TopBar[<Select>.onChange]": (e_3)=>onWatchlistConfigChange({
                                                                "TopBar[<Select>.onChange > onWatchlistConfigChange()]": (prev_3)=>({
                                                                        ...prev_3,
                                                                        rvol1: {
                                                                            ...prev_3.rvol1,
                                                                            period: Number(e_3.target.value)
                                                                        }
                                                                    })
                                                            }["TopBar[<Select>.onChange > onWatchlistConfigChange()]"])
                                                    }["TopBar[<Select>.onChange]"],
                                                    className: "h-8 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "1",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 71
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "5",
                                                            children: "5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 99
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "10",
                                                            children: "10"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 127
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "20",
                                                            children: "20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 157
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 290
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                            lineNumber: 346,
                                            columnNumber: 162
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "ATR Period"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 264
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(watchlistConfig.atr.period ?? 14),
                                                    onChange: {
                                                        "TopBar[<Select>.onChange]": (e_4)=>onWatchlistConfigChange({
                                                                "TopBar[<Select>.onChange > onWatchlistConfigChange()]": (prev_4)=>({
                                                                        ...prev_4,
                                                                        atr: {
                                                                            ...prev_4.atr,
                                                                            period: Number(e_4.target.value)
                                                                        }
                                                                    })
                                                            }["TopBar[<Select>.onChange > onWatchlistConfigChange()]"])
                                                    }["TopBar[<Select>.onChange]"],
                                                    className: "h-8 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "7",
                                                            children: "7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 71
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "14",
                                                            children: "14"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 99
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "21",
                                                            children: "21"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 129
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 329
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                            lineNumber: 356,
                                            columnNumber: 202
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "NATR Period"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 236
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(watchlistConfig.natr.period ?? 14),
                                                    onChange: {
                                                        "TopBar[<Select>.onChange]": (e_5)=>onWatchlistConfigChange({
                                                                "TopBar[<Select>.onChange > onWatchlistConfigChange()]": (prev_5)=>({
                                                                        ...prev_5,
                                                                        natr: {
                                                                            ...prev_5.natr,
                                                                            period: Number(e_5.target.value)
                                                                        }
                                                                    })
                                                            }["TopBar[<Select>.onChange > onWatchlistConfigChange()]"])
                                                    }["TopBar[<Select>.onChange]"],
                                                    className: "h-8 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "7",
                                                            children: "7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 71
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "14",
                                                            children: "14"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 99
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "21",
                                                            children: "21"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 129
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 302
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                            lineNumber: 366,
                                            columnNumber: 174
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 346,
                                    columnNumber: 124
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                            lineNumber: 306,
                            columnNumber: 486
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 306,
                    columnNumber: 255
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: toggleWatchlist,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1.5 rounded transition-colors", showWatchlist ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
                    title: "Watchlist",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 376,
                        columnNumber: 463
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 376,
                    columnNumber: 218
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 306,
            columnNumber: 29
        }, this);
        $[51] = embeddedPanel;
        $[52] = onWatchlistConfigChange;
        $[53] = showWatchlist;
        $[54] = toggleWatchlist;
        $[55] = watchlistConfig;
        $[56] = t26;
    } else {
        t26 = $[56];
    }
    let t27;
    if ($[57] !== embeddedPanel || $[58] !== showLayoutPanel || $[59] !== toggleLayoutPanel) {
        t27 = !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: toggleLayoutPanel,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1.5 rounded transition-colors", showLayoutPanel ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
            title: "Layouts",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 388,
                columnNumber: 276
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 388,
            columnNumber: 29
        }, this);
        $[57] = embeddedPanel;
        $[58] = showLayoutPanel;
        $[59] = toggleLayoutPanel;
        $[60] = t27;
    } else {
        t27 = $[60];
    }
    let t28;
    if ($[61] !== embeddedPanel || $[62] !== onScreenshot) {
        t28 = !embeddedPanel && onScreenshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onScreenshot,
            className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
            title: "Screenshot",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 398,
                columnNumber: 201
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 398,
            columnNumber: 45
        }, this);
        $[61] = embeddedPanel;
        $[62] = onScreenshot;
        $[63] = t28;
    } else {
        t28 = $[63];
    }
    let t29;
    if ($[64] !== embeddedPanel || $[65] !== isDark || $[66] !== toggleDark) {
        t29 = !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: toggleDark,
            className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
            title: isDark ? "Light mode" : "Dark mode",
            children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 407,
                columnNumber: 218
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 407,
                columnNumber: 238
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 407,
            columnNumber: 29
        }, this);
        $[64] = embeddedPanel;
        $[65] = isDark;
        $[66] = toggleDark;
        $[67] = t29;
    } else {
        t29 = $[67];
    }
    const t30 = embeddedPanel ? "Open full chart" : workspaceMode || fullscreenMode ? "Back to company" : isFullscreen ? "Exit fullscreen" : "Fullscreen";
    let t31;
    if ($[68] !== embeddedPanel || $[69] !== fullscreenMode || $[70] !== isFullscreen || $[71] !== workspaceMode) {
        t31 = embeddedPanel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 418,
            columnNumber: 27
        }, this) : workspaceMode || fullscreenMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 418,
            columnNumber: 87
        }, this) : isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 418,
            columnNumber: 128
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 418,
            columnNumber: 154
        }, this);
        $[68] = embeddedPanel;
        $[69] = fullscreenMode;
        $[70] = isFullscreen;
        $[71] = workspaceMode;
        $[72] = t31;
    } else {
        t31 = $[72];
    }
    let t32;
    if ($[73] !== handleFullscreenClick || $[74] !== t30 || $[75] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleFullscreenClick,
            className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
            title: t30,
            children: t31
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[73] = handleFullscreenClick;
        $[74] = t30;
        $[75] = t31;
        $[76] = t32;
    } else {
        t32 = $[76];
    }
    let t33;
    if ($[77] !== t10 || $[78] !== t15 || $[79] !== t22 || $[80] !== t24 || $[81] !== t26 || $[82] !== t27 || $[83] !== t28 || $[84] !== t29 || $[85] !== t32 || $[86] !== t6) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: [
                t10,
                t11,
                t15,
                t16,
                t22,
                t23,
                t24,
                t25,
                t26,
                t27,
                t28,
                t29,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 439,
            columnNumber: 11
        }, this);
        $[77] = t10;
        $[78] = t15;
        $[79] = t22;
        $[80] = t24;
        $[81] = t26;
        $[82] = t27;
        $[83] = t28;
        $[84] = t29;
        $[85] = t32;
        $[86] = t6;
        $[87] = t33;
    } else {
        t33 = $[87];
    }
    return t33;
}
_s(TopBar, "iMe+egpGED22nXErEMb4UFJ8320=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TopBar;
function _TopBarDropdownMenuCheckboxItemOnSelect4(e_2) {
    return e_2.preventDefault();
}
function _TopBarDropdownMenuCheckboxItemOnSelect3(e_1) {
    return e_1.preventDefault();
}
function _TopBarDropdownMenuCheckboxItemOnSelect2(e_0) {
    return e_0.preventDefault();
}
function _TopBarDropdownMenuCheckboxItemOnSelect(e) {
    return e.preventDefault();
}
function _TopBarButtonOnClickSetShowChartTypeMenu(s) {
    return !s;
}
var _c;
__turbopack_context__.k.register(_c, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/DrawingToolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrawingToolbar",
    ()=>DrawingToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * DrawingToolbar — vertical left-side toolbar for drawing tools.
 * Activates a tool in the Zustand store; DrawingManager picks it up.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-horizontal.js [app-client] (ecmascript) <export default as MoveHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-vertical.js [app-client] (ecmascript) <export default as MoveVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dot.js [app-client] (ecmascript) <export default as Dot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const TOOLS = [
    {
        id: 'cursor',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 21,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Select / Cursor',
        dividerAfter: true
    },
    {
        id: 'trendline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Trend Line'
    },
    {
        id: 'horzline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 30,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Horizontal Line'
    },
    {
        id: 'vertline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveVertical$3e$__["MoveVertical"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 34,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Vertical Line'
    },
    {
        id: 'rectangle',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 38,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Rectangle'
    },
    {
        id: 'fibretrace',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Fibonacci Retracement'
    },
    {
        id: 'channel',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__["MoveHorizontal"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 46,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Parallel Channel'
    },
    {
        id: 'text',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 50,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Text Annotation'
    },
    {
        id: 'arrow',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 54,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Arrow',
        dividerAfter: true
    }
];
const CROSSHAIR_MODES = [
    {
        id: 'normal',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 65,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Normal Crosshair'
    },
    {
        id: 'laser',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__["MoveHorizontal"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 69,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Laser Pointer'
    },
    {
        id: 'dot',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__["Dot"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 73,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Dot Pointer'
    },
    {
        id: 'hidden',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 77,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Hide Crosshair'
    }
];
function DrawingToolbar() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(24);
    if ($[0] !== "8958bf7d993f15ec97f73653aa544d5b7a5178d32acc7654e7af39d490d171c9") {
        for(let $i = 0; $i < 24; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8958bf7d993f15ec97f73653aa544d5b7a5178d32acc7654e7af39d490d171c9";
    }
    const { activeTool, setActiveTool, clearDrawings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [crosshairMode, setCrosshairMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("normal");
    let t0;
    if ($[1] !== activeTool || $[2] !== setActiveTool) {
        t0 = TOOLS.map({
            "DrawingToolbar[TOOLS.map()]": (tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "DrawingToolbar[TOOLS.map() > <button>.onClick]": ()=>setActiveTool(tool.id)
                            }["DrawingToolbar[TOOLS.map() > <button>.onClick]"],
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 flex items-center justify-center rounded transition-colors", activeTool === tool.id ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
                            title: tool.label,
                            children: tool.icon
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                            lineNumber: 97,
                            columnNumber: 111
                        }, this),
                        tool.dividerAfter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-px bg-border my-1"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                            lineNumber: 99,
                            columnNumber: 360
                        }, this)
                    ]
                }, tool.id, true, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 97,
                    columnNumber: 46
                }, this)
        }["DrawingToolbar[TOOLS.map()]"]);
        $[1] = activeTool;
        $[2] = setActiveTool;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    let t1;
    if ($[4] !== crosshairMode) {
        t1 = CROSSHAIR_MODES.map({
            "DrawingToolbar[CROSSHAIR_MODES.map()]": (mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "DrawingToolbar[CROSSHAIR_MODES.map() > <button>.onClick]": ()=>setCrosshairMode(mode.id)
                    }["DrawingToolbar[CROSSHAIR_MODES.map() > <button>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 flex items-center justify-center rounded transition-colors", crosshairMode === mode.id ? "bg-blue-500/20 text-blue-500 border border-blue-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"),
                    title: mode.label,
                    children: mode.icon
                }, mode.id, false, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 110,
                    columnNumber: 56
                }, this)
        }["DrawingToolbar[CROSSHAIR_MODES.map()]"]);
        $[4] = crosshairMode;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-5 h-px bg-border my-1"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 121,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== setActiveTool) {
        t3 = ({
            "DrawingToolbar[<button>.onClick]": ()=>setActiveTool("measure")
        })["DrawingToolbar[<button>.onClick]"];
        $[7] = setActiveTool;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    const t4 = activeTool === "measure" ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "text-muted-foreground hover:text-foreground hover:bg-muted/40";
    let t5;
    if ($[9] !== t4) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 flex items-center justify-center rounded transition-colors", t4);
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 147,
            columnNumber: 10
        }, this);
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== t3 || $[13] !== t5) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t3,
            className: t5,
            title: "Measuring Tool",
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 154,
            columnNumber: 10
        }, this);
        $[12] = t3;
        $[13] = t5;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 163,
            columnNumber: 10
        }, this);
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 170,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== clearDrawings) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: clearDrawings,
            className: "w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors",
            title: "Clear all drawings",
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[17] = clearDrawings;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== t0 || $[20] !== t1 || $[21] !== t10 || $[22] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-0.5 w-9 py-2 border-r border-border bg-background flex-shrink-0",
            children: [
                t0,
                t1,
                t2,
                t7,
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[19] = t0;
        $[20] = t1;
        $[21] = t10;
        $[22] = t7;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    return t11;
}
_s(DrawingToolbar, "L4PrbwQX8n4IEs8D0aqhU2Jwnac=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
_c = DrawingToolbar;
var _c;
__turbopack_context__.k.register(_c, "DrawingToolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/DataWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataWindow",
    ()=>DataWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * DataWindow — OHLCV data overlay that appears at top-left,
 * updating as the crosshair moves. Always visible.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-client] (ecmascript)");
'use client';
;
;
;
function DataWindow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(47);
    if ($[0] !== "5421006a0673172bcd6ddc758f7b8f3d829c984c617672b21a1a500f89febd72") {
        for(let $i = 0; $i < 47; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5421006a0673172bcd6ddc758f7b8f3d829c984c617672b21a1a500f89febd72";
    }
    const { bar, seriesData } = t0;
    const hasBar = bar != null;
    let volume = null;
    if (seriesData) {
        for (const [api, data] of seriesData){
            if (data && "value" in data && typeof data.value === "number") {
                volume = data.value;
                break;
            }
        }
    }
    const change = hasBar && bar.open > 0 ? (bar.close - bar.open) / bar.open * 100 : 0;
    const isPos = change > 0;
    const isNeg = change < 0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-foreground",
            children: "O"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== bar || $[3] !== hasBar) {
        t2 = hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(bar.open) : "\u2014";
        $[2] = bar;
        $[3] = hasBar;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-foreground",
                    children: t2
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 57,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[5] = t2;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-foreground",
            children: "H"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== bar || $[9] !== hasBar) {
        t5 = hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(bar.high) : "\u2014";
        $[8] = bar;
        $[9] = hasBar;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-foreground",
                    children: t5
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 81,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-foreground",
            children: "L"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== bar || $[15] !== hasBar) {
        t8 = hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(bar.low) : "\u2014";
        $[14] = bar;
        $[15] = hasBar;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-foreground",
                    children: t8
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 105,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[17] = t8;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-foreground",
            children: "C"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] !== bar || $[21] !== hasBar) {
        t11 = hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(bar.close) : "\u2014";
        $[20] = bar;
        $[21] = hasBar;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-foreground",
                    children: t11
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 129,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, this);
        $[23] = t11;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-foreground",
            children: "V"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== bar || $[27] !== hasBar || $[28] !== volume) {
        t14 = volume !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVolume"])(volume) : hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVolume"])(bar.volume) : "\u2014";
        $[26] = bar;
        $[27] = hasBar;
        $[28] = volume;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-foreground",
                    children: t14
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 154,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[30] = t14;
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-muted-foreground",
            children: "Chg"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    const t17 = isPos ? "text-emerald-500 font-semibold" : isNeg ? "text-rose-500 font-semibold" : "text-muted-foreground";
    let t18;
    if ($[33] !== change || $[34] !== hasBar || $[35] !== isPos) {
        t18 = hasBar ? `${isPos ? "+" : ""}${change.toFixed(2)}%` : "\u2014";
        $[33] = change;
        $[34] = hasBar;
        $[35] = isPos;
        $[36] = t18;
    } else {
        t18 = $[36];
    }
    let t19;
    if ($[37] !== t17 || $[38] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t16,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t17,
                    children: t18
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 180,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[37] = t17;
        $[38] = t18;
        $[39] = t19;
    } else {
        t19 = $[39];
    }
    let t20;
    if ($[40] !== t12 || $[41] !== t15 || $[42] !== t19 || $[43] !== t3 || $[44] !== t6 || $[45] !== t9) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-3 left-3 z-10 bg-white border border-border rounded-lg shadow-sm px-3 py-2 pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-[11px] font-mono",
                children: [
                    t3,
                    t6,
                    t9,
                    t12,
                    t15,
                    t19
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                lineNumber: 189,
                columnNumber: 136
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[40] = t12;
        $[41] = t15;
        $[42] = t19;
        $[43] = t3;
        $[44] = t6;
        $[45] = t9;
        $[46] = t20;
    } else {
        t20 = $[46];
    }
    return t20;
}
_c = DataWindow;
var _c;
__turbopack_context__.k.register(_c, "DataWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/IndicatorDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndicatorDialog",
    ()=>IndicatorDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * IndicatorDialog — searchable modal for adding/managing indicators.
 * Opens from the TopBar "Indicators" button.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function generateId() {
    return `ind_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function ParamEditor(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2";
    }
    const { meta, params, onChange } = t0;
    let t1;
    if ($[1] !== meta.defaultParams) {
        t1 = Object.entries(meta.defaultParams);
        $[1] = meta.defaultParams;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== onChange || $[4] !== params || $[5] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-3 mt-2",
            children: t1.map({
                "ParamEditor[(anonymous)()]": (t3)=>{
                    const [key, def] = t3;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-medium text-muted-foreground capitalize",
                                children: key
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 48,
                                columnNumber: 65
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "w-20 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500",
                                value: String(params[key] ?? def),
                                onChange: {
                                    "ParamEditor[(anonymous)() > <input>.onChange]": (e)=>onChange(key, Number(e.target.value))
                                }["ParamEditor[(anonymous)() > <input>.onChange]"],
                                step: typeof def === "number" && def < 5 ? 0.1 : 1,
                                min: 1
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 48,
                                columnNumber: 154
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 48,
                        columnNumber: 18
                    }, this);
                }
            }["ParamEditor[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[3] = onChange;
        $[4] = params;
        $[5] = t1;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    return t2;
}
_c = ParamEditor;
function ActiveRow(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2";
    }
    const { config, meta } = t0;
    const { updateIndicator, removeIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [showParams, setShowParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const t1 = config.color ?? meta.defaultColor;
    let t2;
    if ($[1] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
            style: {
                background: t1
            }
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== meta.label) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-medium text-foreground truncate",
            children: meta.label
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[3] = meta.label;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== config.params) {
        t4 = Object.entries(config.params).map(_ActiveRowAnonymous);
        $[5] = config.params;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const t5 = t4.join(", ");
    let t6;
    if ($[7] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-muted-foreground",
            children: [
                "(",
                t5,
                ")"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[7] = t5;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t2 || $[10] !== t3 || $[11] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
                t2,
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 121,
            columnNumber: 10
        }, this);
        $[9] = t2;
        $[10] = t3;
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "ActiveRow[<button>.onClick]": ()=>setShowParams(_ActiveRowButtonOnClickSetShowParams)
        })["ActiveRow[<button>.onClick]"];
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
            onClick: t8,
            title: "Settings",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                size: 12
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 140,
                columnNumber: 152
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 140,
            columnNumber: 10
        }, this);
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== config.id || $[16] !== config.visible || $[17] !== updateIndicator) {
        t10 = ({
            "ActiveRow[<button>.onClick]": ()=>updateIndicator(config.id, {
                    visible: !config.visible
                })
        })["ActiveRow[<button>.onClick]"];
        $[15] = config.id;
        $[16] = config.visible;
        $[17] = updateIndicator;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const t11 = config.visible ? "Hide" : "Show";
    let t12;
    if ($[19] !== config.visible) {
        t12 = config.visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 162,
            columnNumber: 28
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 162,
            columnNumber: 48
        }, this);
        $[19] = config.visible;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== t10 || $[22] !== t11 || $[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
            onClick: t10,
            title: t11,
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t11;
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== config.id || $[26] !== removeIndicator) {
        t14 = ({
            "ActiveRow[<button>.onClick]": ()=>removeIndicator(config.id)
        })["ActiveRow[<button>.onClick]"];
        $[25] = config.id;
        $[26] = removeIndicator;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== t14) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors",
            onClick: t14,
            title: "Remove",
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 198,
            columnNumber: 11
        }, this);
        $[29] = t14;
        $[30] = t16;
    } else {
        t16 = $[30];
    }
    let t17;
    if ($[31] !== t13 || $[32] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 flex-shrink-0",
            children: [
                t9,
                t13,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 206,
            columnNumber: 11
        }, this);
        $[31] = t13;
        $[32] = t16;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] !== t17 || $[35] !== t7) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-2",
            children: [
                t7,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[34] = t17;
        $[35] = t7;
        $[36] = t18;
    } else {
        t18 = $[36];
    }
    let t19;
    if ($[37] !== config.id || $[38] !== config.params || $[39] !== meta || $[40] !== showParams || $[41] !== updateIndicator) {
        t19 = showParams && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ParamEditor, {
            meta: meta,
            params: config.params,
            onChange: {
                "ActiveRow[<ParamEditor>.onChange]": (key, value)=>updateIndicator(config.id, {
                        params: {
                            ...config.params,
                            [key]: value
                        }
                    })
            }["ActiveRow[<ParamEditor>.onChange]"]
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 224,
            columnNumber: 25
        }, this);
        $[37] = config.id;
        $[38] = config.params;
        $[39] = meta;
        $[40] = showParams;
        $[41] = updateIndicator;
        $[42] = t19;
    } else {
        t19 = $[42];
    }
    let t20;
    if ($[43] !== t18 || $[44] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border border-border bg-surface-elevated px-3 py-2 space-y-1",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[43] = t18;
        $[44] = t19;
        $[45] = t20;
    } else {
        t20 = $[45];
    }
    return t20;
}
_s(ActiveRow, "10SUSHvl9aghfF+O/V0lo4a19rc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
_c1 = ActiveRow;
function _ActiveRowButtonOnClickSetShowParams(s) {
    return !s;
}
function _ActiveRowAnonymous(t0) {
    const [, v] = t0;
    return v;
}
function IndicatorDialog(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(40);
    if ($[0] !== "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2") {
        for(let $i = 0; $i < 40; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a13169c547ff38aaeee1c8adfceb6fbb2283d08be082b4a11377cb4f5a3eef2";
    }
    const { open, onClose } = t0;
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { indicators, addIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].getAllMeta();
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const allMeta = t1;
    let t2;
    if ($[2] !== search) {
        const q = search.toLowerCase();
        t2 = allMeta.filter({
            "IndicatorDialog[allMeta.filter()]": (m)=>!q || m.label.toLowerCase().includes(q) || m.group.toLowerCase().includes(q)
        }["IndicatorDialog[allMeta.filter()]"]);
        $[2] = search;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const filtered = t2;
    let map;
    if ($[4] !== filtered) {
        map = new Map();
        filtered.forEach({
            "IndicatorDialog[filtered.forEach()]": (m_0)=>{
                if (!map.has(m_0.group)) {
                    map.set(m_0.group, []);
                }
                map.get(m_0.group).push(m_0);
            }
        }["IndicatorDialog[filtered.forEach()]"]);
        $[4] = filtered;
        $[5] = map;
    } else {
        map = $[5];
    }
    const grouped = map;
    let t3;
    if ($[6] !== indicators) {
        t3 = new Set(indicators.map(_IndicatorDialogIndicatorsMap));
        $[6] = indicators;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    const activeIds = t3;
    let t4;
    if ($[8] !== addIndicator) {
        t4 = function handleAdd(meta) {
            const config = {
                id: generateId(),
                type: meta.type,
                params: {
                    ...meta.defaultParams
                },
                visible: true,
                paneIndex: meta.category === "overlay" ? 0 : -1,
                color: meta.defaultColor,
                lineWidth: 1
            };
            addIndicator(config);
        };
        $[8] = addIndicator;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const handleAdd = t4;
    if (!open) {
        return null;
    }
    let t5;
    if ($[10] !== onClose) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-black/50",
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 353,
            columnNumber: 10
        }, this);
        $[10] = onClose;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold text-foreground",
            children: "Indicators"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 361,
            columnNumber: 10
        }, this);
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 15
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 368,
            columnNumber: 10
        }, this);
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== onClose) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
                    onClick: onClose,
                    children: t7
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                    lineNumber: 375,
                    columnNumber: 112
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 375,
            columnNumber: 10
        }, this);
        $[14] = onClose;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] !== indicators) {
        t9 = indicators.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 border-b border-border space-y-1.5 flex-shrink-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2",
                    children: "Active"
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                    lineNumber: 383,
                    columnNumber: 111
                }, this),
                indicators.map(_IndicatorDialogIndicatorsMap2)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 383,
            columnNumber: 35
        }, this);
        $[16] = indicators;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 13,
            className: "text-muted-foreground flex-shrink-0"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 391,
            columnNumber: 11
        }, this);
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "IndicatorDialog[<input>.onChange]": (e)=>setSearch(e.target.value)
        })["IndicatorDialog[<input>.onChange]"];
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    let t13;
    if ($[20] !== search) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "flex-1 text-xs bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground",
            placeholder: "Search indicators\u2026",
            value: search,
            onChange: t11,
            autoFocus: true
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 408,
            columnNumber: 11
        }, this);
        t13 = search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "IndicatorDialog[<button>.onClick]": ()=>setSearch("")
            }["IndicatorDialog[<button>.onClick]"],
            className: "text-muted-foreground hover:text-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                size: 11
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 411,
                columnNumber: 101
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 409,
            columnNumber: 21
        }, this);
        $[20] = search;
        $[21] = t12;
        $[22] = t13;
    } else {
        t12 = $[21];
        t13 = $[22];
    }
    let t14;
    if ($[23] !== t12 || $[24] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-2.5 border-b border-border flex-shrink-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-muted/20",
                children: [
                    t10,
                    t12,
                    t13
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 421,
                columnNumber: 77
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 421,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t13;
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] !== activeIds || $[27] !== grouped || $[28] !== handleAdd) {
        t15 = grouped.size === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-muted-foreground text-center py-6",
            children: "No indicators found."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 430,
            columnNumber: 32
        }, this) : Array.from(grouped.entries()).map({
            "IndicatorDialog[(anonymous)()]": (t16)=>{
                const [group, metas] = t16;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5",
                            children: group
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                            lineNumber: 433,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-0.5",
                            children: metas.map({
                                "IndicatorDialog[(anonymous)() > metas.map()]": (meta_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-start justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors group", activeIds.has(meta_1.type) ? "bg-amber-500/10 border border-amber-500/30" : "hover:bg-muted/40"),
                                        onClick: {
                                            "IndicatorDialog[(anonymous)() > metas.map() > <button>.onClick]": ()=>handleAdd(meta_1)
                                        }["IndicatorDialog[(anonymous)() > metas.map() > <button>.onClick]"],
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 rounded-full flex-shrink-0",
                                                                style: {
                                                                    background: meta_1.defaultColor
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 151
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium text-foreground",
                                                                children: meta_1.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] px-1.5 py-0.5 rounded font-medium", meta_1.category === "overlay" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"),
                                                                children: meta_1.category === "overlay" ? "Overlay" : "Sub-pane"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 101
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 110
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-muted-foreground mt-0.5 pl-4",
                                                        children: meta_1.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 341
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                lineNumber: 436,
                                                columnNumber: 85
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5",
                                                children: "+ Add"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                lineNumber: 438,
                                                columnNumber: 432
                                            }, this)
                                        ]
                                    }, meta_1.type, true, {
                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                        lineNumber: 434,
                                        columnNumber: 73
                                    }, this)
                            }["IndicatorDialog[(anonymous)() > metas.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                            lineNumber: 433,
                            columnNumber: 139
                        }, this)
                    ]
                }, group, true, {
                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                    lineNumber: 433,
                    columnNumber: 16
                }, this);
            }
        }["IndicatorDialog[(anonymous)()]"]);
        $[26] = activeIds;
        $[27] = grouped;
        $[28] = handleAdd;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-y-auto flex-1 p-4 space-y-4",
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 451,
            columnNumber: 11
        }, this);
        $[30] = t15;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] !== t14 || $[33] !== t16 || $[34] !== t8 || $[35] !== t9) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-[9999] w-full max-w-xl rounded-xl border border-border bg-background shadow-2xl flex flex-col max-h-[80vh]",
            children: [
                t8,
                t9,
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 459,
            columnNumber: 11
        }, this);
        $[32] = t14;
        $[33] = t16;
        $[34] = t8;
        $[35] = t9;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    let t18;
    if ($[37] !== t17 || $[38] !== t5) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[9998] flex items-center justify-center p-4",
            children: [
                t5,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
            lineNumber: 470,
            columnNumber: 11
        }, this);
        $[37] = t17;
        $[38] = t5;
        $[39] = t18;
    } else {
        t18 = $[39];
    }
    return t18;
}
_s1(IndicatorDialog, "zKlleABdRZeVpmxLe6OdSPEvwjA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
_c2 = IndicatorDialog;
function _IndicatorDialogIndicatorsMap2(config_0) {
    const meta_0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].getMeta(config_0.type);
    if (!meta_0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveRow, {
        config: config_0,
        meta: meta_0
    }, config_0.id, false, {
        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
        lineNumber: 484,
        columnNumber: 10
    }, this);
}
function _IndicatorDialogIndicatorsMap(i) {
    return i.type;
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ParamEditor");
__turbopack_context__.k.register(_c1, "ActiveRow");
__turbopack_context__.k.register(_c2, "IndicatorDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/persistence/useChartPersistence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartPersistence",
    ()=>useChartPersistence
]);
/**
 * useChartPersistence — auto-save and load chart layouts + drawings from the DB.
 *
 * - Debounced 2s auto-save triggered whenever indicators/drawings change
 * - loadLayout(id) restores a named layout
 * - saveLayout(name) saves current state as a named layout
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DEBOUNCE_MS = 2000;
function useChartPersistence() {
    _s();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const saveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Load saved layouts list ────────────────────────────────────────────────
    const fetchLayouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChartPersistence.useCallback[fetchLayouts]": async ()=>{
            try {
                const res = await fetch('/api/charts/layouts');
                const data = await res.json();
                store.setSavedLayouts(data.layouts ?? []);
            } catch  {
            // silently ignore — layouts are non-critical
            }
        }
    }["useChartPersistence.useCallback[fetchLayouts]"], [
        store
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChartPersistence.useEffect": ()=>{
            fetchLayouts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useChartPersistence.useEffect"], []);
    // ── Auto-save drawings debounced ───────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChartPersistence.useEffect": ()=>{
            const { symbol, timeframe, drawings } = store;
            if (!symbol) return;
            if (saveTimer.current) clearTimeout(saveTimer.current);
            saveTimer.current = setTimeout({
                "useChartPersistence.useEffect": async ()=>{
                    try {
                        await fetch(`/api/charts/drawings/${symbol}/${timeframe}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                drawings
                            })
                        });
                    } catch  {
                    // silently ignore
                    }
                }
            }["useChartPersistence.useEffect"], DEBOUNCE_MS);
            return ({
                "useChartPersistence.useEffect": ()=>{
                    if (saveTimer.current) clearTimeout(saveTimer.current);
                }
            })["useChartPersistence.useEffect"];
        // We intentionally only re-run on drawings changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useChartPersistence.useEffect"], [
        store.drawings,
        store.symbol,
        store.timeframe
    ]);
    // ── Load drawings when symbol/timeframe changes ────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChartPersistence.useEffect": ()=>{
            const { symbol, timeframe } = store;
            if (!symbol) return;
            fetch(`/api/charts/drawings/${symbol}/${timeframe}`).then({
                "useChartPersistence.useEffect": (r)=>r.json()
            }["useChartPersistence.useEffect"]).then({
                "useChartPersistence.useEffect": (data)=>{
                    // Only restore if user hasn't already added drawings in this session
                    if (data.drawings?.length && store.drawings.length === 0) {
                        data.drawings.forEach({
                            "useChartPersistence.useEffect": (d)=>store.addDrawing(d)
                        }["useChartPersistence.useEffect"]);
                    }
                }
            }["useChartPersistence.useEffect"]).catch({
                "useChartPersistence.useEffect": ()=>{}
            }["useChartPersistence.useEffect"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useChartPersistence.useEffect"], [
        store.symbol,
        store.timeframe
    ]);
    // ── Manual save / load ─────────────────────────────────────────────────────
    const saveLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChartPersistence.useCallback[saveLayout]": async (name)=>{
            const { symbol, timeframe, chartType, indicators, drawings, alerts } = store;
            const layout = {
                name,
                symbol,
                timeframe,
                chartType,
                panes: [],
                indicators,
                drawings,
                alerts,
                priceScaleAutoScale: true
            };
            try {
                const res = await fetch('/api/charts/layouts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(layout)
                });
                const data = await res.json();
                await fetchLayouts();
                return data.layout;
            } catch  {
                return null;
            }
        }
    }["useChartPersistence.useCallback[saveLayout]"], [
        store,
        fetchLayouts
    ]);
    const loadLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChartPersistence.useCallback[loadLayout]": async (id)=>{
            try {
                const res = await fetch(`/api/charts/layouts/${id}`);
                const data = await res.json();
                const layout = data.layout;
                if (!layout) return;
                store.setTimeframe(layout.timeframe);
                store.setChartType(layout.chartType);
                store.clearDrawings();
                // Restore indicators
                layout.indicators.forEach({
                    "useChartPersistence.useCallback[loadLayout]": (ind)=>store.addIndicator(ind)
                }["useChartPersistence.useCallback[loadLayout]"]);
                // Restore drawings
                layout.drawings.forEach({
                    "useChartPersistence.useCallback[loadLayout]": (d)=>store.addDrawing(d)
                }["useChartPersistence.useCallback[loadLayout]"]);
                store.setActiveLayoutId(id);
            } catch  {
            // silently ignore
            }
        }
    }["useChartPersistence.useCallback[loadLayout]"], [
        store
    ]);
    const deleteLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChartPersistence.useCallback[deleteLayout]": async (id)=>{
            try {
                await fetch(`/api/charts/layouts/${id}`, {
                    method: 'DELETE'
                });
                await fetchLayouts();
            } catch  {}
        }
    }["useChartPersistence.useCallback[deleteLayout]"], [
        fetchLayouts
    ]);
    return {
        saveLayout,
        loadLayout,
        deleteLayout,
        fetchLayouts
    };
}
_s(useChartPersistence, "D0X9jSBnEvg3XHbRUU1lz16zaro=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/LayoutPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutPanel",
    ()=>LayoutPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * LayoutPanel — collapsible right-side panel for saving/loading named layouts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-client] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$persistence$2f$useChartPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/persistence/useChartPersistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function LayoutPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(39);
    if ($[0] !== "9270da3fb7aa9fdac700ca2fd74c7bf11bf2175fdd084f933825058b3ab407f0") {
        for(let $i = 0; $i < 39; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9270da3fb7aa9fdac700ca2fd74c7bf11bf2175fdd084f933825058b3ab407f0";
    }
    const { symbol } = t0;
    const { savedLayouts, activeLayoutId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { saveLayout, loadLayout, deleteLayout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$persistence$2f$useChartPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartPersistence"])();
    const [saveName, setSaveName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[1] !== activeLayoutId || $[2] !== deleteLayout || $[3] !== loadLayout || $[4] !== saveLayout || $[5] !== saveName || $[6] !== savedLayouts || $[7] !== saving || $[8] !== symbol) {
        let t6;
        if ($[14] !== symbol) {
            t6 = ({
                "LayoutPanel[savedLayouts.filter()]": (l)=>l.symbol === symbol
            })["LayoutPanel[savedLayouts.filter()]"];
            $[14] = symbol;
            $[15] = t6;
        } else {
            t6 = $[15];
        }
        const symbolLayouts = savedLayouts.filter(t6);
        const handleSave = async function handleSave() {
            const name = saveName.trim() || `Layout ${symbolLayouts.length + 1}`;
            setSaving(true);
            await saveLayout(name);
            setSaveName("");
            setSaving(false);
        };
        t3 = "flex flex-col h-full p-3 gap-3";
        if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                        size: 13,
                        className: "text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 53
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-foreground",
                        children: "Saved Layouts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 107
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 64,
                columnNumber: 12
            }, this);
            $[16] = t4;
        } else {
            t4 = $[16];
        }
        let t7;
        if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = ({
                "LayoutPanel[<input>.onChange]": (e)=>setSaveName(e.target.value)
            })["LayoutPanel[<input>.onChange]"];
            $[17] = t7;
        } else {
            t7 = $[17];
        }
        let t8;
        if ($[18] !== handleSave) {
            t8 = ({
                "LayoutPanel[<input>.onKeyDown]": (e_0)=>e_0.key === "Enter" && handleSave()
            })["LayoutPanel[<input>.onKeyDown]"];
            $[18] = handleSave;
            $[19] = t8;
        } else {
            t8 = $[19];
        }
        let t9;
        if ($[20] !== saveName || $[21] !== t8) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: "flex-1 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500 placeholder:text-muted-foreground",
                placeholder: "Layout name\u2026",
                value: saveName,
                onChange: t7,
                onKeyDown: t8
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 90,
                columnNumber: 12
            }, this);
            $[20] = saveName;
            $[21] = t8;
            $[22] = t9;
        } else {
            t9 = $[22];
        }
        let t10;
        if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                size: 11
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this);
            $[23] = t10;
        } else {
            t10 = $[23];
        }
        const t11 = saving ? "\u2026" : "Save";
        let t12;
        if ($[24] !== handleSave || $[25] !== saving || $[26] !== t11) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSave,
                disabled: saving,
                className: "flex items-center gap-1 px-2 h-7 rounded text-[11px] bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25 transition-colors disabled:opacity-50",
                children: [
                    t10,
                    t11
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this);
            $[24] = handleSave;
            $[25] = saving;
            $[26] = t11;
            $[27] = t12;
        } else {
            t12 = $[27];
        }
        if ($[28] !== t12 || $[29] !== t9) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5",
                children: [
                    t9,
                    t12
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 116,
                columnNumber: 12
            }, this);
            $[28] = t12;
            $[29] = t9;
            $[30] = t5;
        } else {
            t5 = $[30];
        }
        t1 = "flex-1 overflow-y-auto space-y-1";
        t2 = symbolLayouts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px] text-muted-foreground text-center py-4",
            children: [
                "No saved layouts for ",
                symbol
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
            lineNumber: 124,
            columnNumber: 39
        }, this) : symbolLayouts.map({
            "LayoutPanel[symbolLayouts.map()]": (layout)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border transition-colors group", activeLayoutId === layout.id ? "border-amber-500/40 bg-amber-500/10" : "border-border hover:border-border/80 hover:bg-muted/30"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-medium text-foreground truncate",
                                    children: layout.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                    lineNumber: 125,
                                    columnNumber: 347
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] text-muted-foreground",
                                    children: [
                                        layout.timeframe,
                                        " · ",
                                        layout.indicators.length,
                                        " indicators"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                    lineNumber: 125,
                                    columnNumber: 428
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                            lineNumber: 125,
                            columnNumber: 315
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "LayoutPanel[symbolLayouts.map() > <button>.onClick]": ()=>loadLayout(layout.id)
                                    }["LayoutPanel[symbolLayouts.map() > <button>.onClick]"],
                                    className: "p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                                    title: "Load layout",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 127,
                                        columnNumber: 175
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                    lineNumber: 125,
                                    columnNumber: 640
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "LayoutPanel[symbolLayouts.map() > <button>.onClick]": ()=>deleteLayout(layout.id)
                                    }["LayoutPanel[symbolLayouts.map() > <button>.onClick]"],
                                    className: "p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500",
                                    title: "Delete layout",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 129,
                                        columnNumber: 176
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                    lineNumber: 127,
                                    columnNumber: 208
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                            lineNumber: 125,
                            columnNumber: 544
                        }, this)
                    ]
                }, layout.id, true, {
                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                    lineNumber: 125,
                    columnNumber: 53
                }, this)
        }["LayoutPanel[symbolLayouts.map()]"]);
        $[1] = activeLayoutId;
        $[2] = deleteLayout;
        $[3] = loadLayout;
        $[4] = saveLayout;
        $[5] = saveName;
        $[6] = savedLayouts;
        $[7] = saving;
        $[8] = symbol;
        $[9] = t1;
        $[10] = t2;
        $[11] = t3;
        $[12] = t4;
        $[13] = t5;
    } else {
        t1 = $[9];
        t2 = $[10];
        t3 = $[11];
        t4 = $[12];
        t5 = $[13];
    }
    let t6;
    if ($[31] !== t1 || $[32] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[31] = t1;
        $[32] = t2;
        $[33] = t6;
    } else {
        t6 = $[33];
    }
    let t7;
    if ($[34] !== t3 || $[35] !== t4 || $[36] !== t5 || $[37] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
            lineNumber: 162,
            columnNumber: 10
        }, this);
        $[34] = t3;
        $[35] = t4;
        $[36] = t5;
        $[37] = t6;
        $[38] = t7;
    } else {
        t7 = $[38];
    }
    return t7;
}
_s(LayoutPanel, "mTNkOr7WPRO37UQz0bfIHQtT3fc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$persistence$2f$useChartPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartPersistence"]
    ];
});
_c = LayoutPanel;
var _c;
__turbopack_context__.k.register(_c, "LayoutPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/ChartContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartContainer",
    ()=>ChartContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * ChartContainer — the full-screen capable charting shell.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────┐
 *   │  TopBar                                         │
 *   ├─────┬───────────────────────────────────────────┤
 *   │ DT  │  Chart Canvas     │  Layout Panel (opt.)  │
 *   │ ool │                   │                       │
 *   │ bar │  DataWindow       │                       │
 *   └─────┴───────────────────┴───────────────────────┘
 *
 * When isFullscreen=true the whole shell is portal'd to a fixed overlay.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/ChartEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/PaneManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/SeriesManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$DrawingManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/DrawingManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/data/useChartData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/TopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/DrawingToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DataWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/DataWindow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/IndicatorDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$LayoutPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/LayoutPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/theme-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
/**
 * Inner chart content — decoupled so it can be rendered
 * both inside the page and inside a portal.
 */ function ChartContent({ symbol, currentPrice, priceChange, fullscreenMode = false, embeddedPanel = false, workspaceMode = false }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartEngine"]());
    const pmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const smRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeInds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [showIndDialog, setShowIndDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [crosshair, setCrosshair] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paneRects, setPaneRects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [watchlistConfig, setWatchlistConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST_CONFIG"]);
    const { appearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { timeframe, chartType, isDark, indicators, drawings, activeTool, addDrawing, updateDrawing, removeDrawing, showLayoutPanel, showWatchlist, removeIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { bars, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartData"])(symbol, timeframe);
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChartContent.useMemo[theme]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChartTheme"])(isDark ? 'dark' : 'light', appearance.chartContrast)
    }["ChartContent.useMemo[theme]"], [
        appearance.chartContrast,
        isDark
    ]);
    const hasBars = bars.length > 0;
    const watchlistWidth = showWatchlist ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWatchlistPanelWidth"])(watchlistConfig) : 0;
    // ── 1. Initialise chart engine ────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            const container = canvasRef.current;
            if (!container) return;
            const engine = engineRef.current;
            const indicatorRegistry = activeInds.current;
            const chart = engine.init(container, theme);
            pmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaneManager"](chart);
            smRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeriesManager"](chart);
            // Subscribe to crosshair
            const unsub = engine.subscribeCrosshair({
                "ChartContent.useEffect.unsub": (data)=>{
                    setCrosshair(data);
                }
            }["ChartContent.useEffect.unsub"]);
            return ({
                "ChartContent.useEffect": ()=>{
                    unsub();
                    dmRef.current?.destroy();
                    dmRef.current = null;
                    engine.destroy();
                    pmRef.current = null;
                    smRef.current = null;
                    indicatorRegistry.clear();
                }
            })["ChartContent.useEffect"];
        }
    }["ChartContent.useEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    // ── 2. Apply theme changes ────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            engineRef.current.applyTheme(theme);
        }
    }["ChartContent.useEffect"], [
        theme
    ]);
    // ── 3. Render main series when bars or chart type changes ─────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            const sm = smRef.current;
            const engine_0 = engineRef.current;
            if (!sm || !engine_0.isInitialised || bars.length === 0) return;
            // Remove old main series
            sm.remove('main');
            sm.remove('volume');
            const th = theme;
            // Add main series by chart type
            if (chartType === 'candlestick') {
                sm.addCandlestick('main', th, 0, {
                    upColor: th.upColor,
                    downColor: th.downColor,
                    borderUpColor: th.upColor,
                    borderDownColor: th.downColor,
                    wickUpColor: th.upColor,
                    wickDownColor: th.downColor
                });
                sm.setOHLCVData('main', bars);
            } else if (chartType === 'ohlc') {
                sm.addOhlc('main', th, 0, {
                    upColor: th.upColor,
                    downColor: th.downColor
                });
                sm.setOHLCVData('main', bars);
            } else if (chartType === 'line') {
                sm.addLine('main', 0, {
                    color: isDark ? '#3B82F6' : '#4338CA',
                    lineWidth: 2,
                    priceLineVisible: false,
                    lastValueVisible: true
                });
                sm.setOHLCVData('main', bars);
            } else if (chartType === 'area') {
                sm.addArea('main', 0, {
                    lineColor: isDark ? '#3B82F6' : '#4338CA',
                    topColor: theme.areaFillColor,
                    bottomColor: 'transparent',
                    lineWidth: 2,
                    priceLineVisible: false,
                    lastValueVisible: true
                });
                sm.setOHLCVData('main', bars);
            }
            // Volume overlay on main pane (TradingView style)
            sm.remove('volume');
            sm.addHistogram('volume', 0, {
                priceLineVisible: false,
                lastValueVisible: false,
                priceScaleId: 'volume' // Separate scale for volume
            });
            // Position volume at the bottom 10% of the chart
            engine_0.api.priceScale('volume').applyOptions({
                scaleMargins: {
                    top: 0.9,
                    // Start at 90% down
                    bottom: 0 // Go all the way to bottom
                }
            });
            sm.setVolumeData('volume', bars, th.volumeUpColor, th.volumeDownColor);
            engine_0.fitContent();
        }
    }["ChartContent.useEffect"], [
        bars,
        chartType,
        isDark,
        theme
    ]);
    // ── 4. Init DrawingManager once after main series exists ──────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            const sm_0 = smRef.current;
            const engine_1 = engineRef.current;
            const container_0 = canvasRef.current;
            if (!hasBars || !sm_0 || !engine_1.isInitialised || !container_0 || dmRef.current) return;
            const mainSeries = sm_0.get('main');
            if (!mainSeries) return;
            dmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$DrawingManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrawingManager"](engine_1.api, mainSeries.api, container_0, {
                "ChartContent.useEffect": (d)=>addDrawing(d)
            }["ChartContent.useEffect"], {
                "ChartContent.useEffect": (id, patch)=>updateDrawing(id, patch)
            }["ChartContent.useEffect"], {
                "ChartContent.useEffect": (id_0)=>removeDrawing(id_0)
            }["ChartContent.useEffect"]);
            // Restore existing drawings from store
            if (drawings.length > 0) {
                dmRef.current.restoreDrawings(drawings);
            }
            // Apply current tool
            if (activeTool) dmRef.current.setTool(activeTool);
        }
    }["ChartContent.useEffect"], [
        activeTool,
        addDrawing,
        drawings,
        hasBars,
        removeDrawing,
        updateDrawing
    ]);
    // ── 4a. Sync active drawing tool to DrawingManager ───────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            if (dmRef.current && activeTool !== null) {
                dmRef.current.setTool(activeTool);
            }
        }
    }["ChartContent.useEffect"], [
        activeTool
    ]);
    // ── 4b. Sync clear drawings ───────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            if (drawings.length === 0 && dmRef.current) {
                dmRef.current.clearAll();
            }
        }
    }["ChartContent.useEffect"], [
        drawings.length
    ]);
    // ── 5. Sync indicators (add new / remove deleted) ─────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartContent.useEffect": ()=>{
            const sm_1 = smRef.current;
            const pm = pmRef.current;
            if (!sm_1 || !pm) return;
            const th_0 = theme;
            const currentIds = new Set(indicators.map({
                "ChartContent.useEffect": (c)=>c.id
            }["ChartContent.useEffect"]));
            // Remove detached indicators
            activeInds.current.forEach({
                "ChartContent.useEffect": (ind, id_1)=>{
                    if (!currentIds.has(id_1)) {
                        ind.detach();
                        activeInds.current.delete(id_1);
                    }
                }
            }["ChartContent.useEffect"]);
            // Add new indicators
            indicators.forEach({
                "ChartContent.useEffect": (config)=>{
                    if (!activeInds.current.has(config.id)) {
                        try {
                            const ind_0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].create(config);
                            ind_0.attach(sm_1, pm, th_0);
                            if (bars.length > 0) ind_0.updateData(bars);
                            activeInds.current.set(config.id, ind_0);
                        } catch (e) {
                            console.warn('Failed to attach indicator', config.type, e);
                        }
                    }
                }
            }["ChartContent.useEffect"]);
            // Update data for all active indicators when bars change
            if (bars.length > 0) {
                activeInds.current.forEach({
                    "ChartContent.useEffect": (ind_1)=>ind_1.updateData(bars)
                }["ChartContent.useEffect"]);
            }
            // Sync visibility
            indicators.forEach({
                "ChartContent.useEffect": (config_0)=>{
                    activeInds.current.get(config_0.id)?.setVisible(config_0.visible);
                }
            }["ChartContent.useEffect"]);
            // We delay slightly to allow lightweight-charts to finish rendering panes
            setTimeout({
                "ChartContent.useEffect": ()=>{
                    if (pmRef.current) {
                        setPaneRects(pmRef.current.getPaneRects());
                    }
                }
            }["ChartContent.useEffect"], 50);
        }
    }["ChartContent.useEffect"], [
        bars,
        indicators,
        theme
    ]);
    // ── 5. Screenshot ────────────────────────────────────────────────────────
    const handleScreenshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChartContent.useCallback[handleScreenshot]": async ()=>{
            const container_1 = canvasRef.current;
            if (!container_1) return;
            try {
                const { default: html2canvas } = await __turbopack_context__.A("[project]/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript, async loader)");
                const canvas = await html2canvas(container_1, {
                    useCORS: true,
                    scale: 2
                });
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = `${symbol}_${timeframe}_chart.png`;
                a.click();
            } catch (e_0) {
                console.error('Screenshot failed', e_0);
            }
        }
    }["ChartContent.useCallback[handleScreenshot]"], [
        symbol,
        timeframe
    ]);
    // ── Render ────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full overflow-hidden bg-background",
        style: {
            background: theme.background
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBar"], {
                symbol: symbol,
                currentPrice: currentPrice,
                priceChange: priceChange,
                onIndicatorsClick: ()=>setShowIndDialog(true),
                onScreenshot: handleScreenshot,
                fullscreenMode: fullscreenMode,
                embeddedPanel: embeddedPanel,
                workspaceMode: workspaceMode,
                watchlistConfig: watchlistConfig,
                onWatchlistConfigChange: setWatchlistConfig
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-1 min-h-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrawingToolbar"], {}, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 min-w-0 min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: canvasRef,
                                className: "w-full h-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-background/60 z-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 28,
                                    className: "animate-spin text-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 332,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 331,
                                columnNumber: 23
                            }, this),
                            error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-background/80 z-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-rose-400",
                                    children: [
                                        "Failed to load chart data: ",
                                        error
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 337,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 336,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DataWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataWindow"], {
                                    bar: crosshair?.bar ?? null,
                                    seriesData: crosshair?.seriesData
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            paneRects.filter((p)=>p.index > 0).map((pane)=>{
                                const paneIndicators = pane.indicators.map((id_2)=>activeInds.current.get(id_2)).filter(Boolean);
                                if (paneIndicators.length === 0) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-2 z-10 flex items-center gap-4 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-border/50 text-[11px] font-mono",
                                    style: {
                                        top: pane.top + 8
                                    },
                                    children: paneIndicators.map((ind_2)=>{
                                        const entries = smRef.current?.getByIndicator(ind_2.id) || [];
                                        let valStr = '—';
                                        if (crosshair?.seriesData) {
                                            for (const entry of entries){
                                                const data_0 = crosshair.seriesData.get(entry.api);
                                                if (data_0 && typeof data_0 === 'object' && 'value' in data_0 && typeof data_0.value === 'number') {
                                                    valStr = data_0.value.toFixed(2);
                                                    break;
                                                }
                                            }
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-foreground",
                                                    children: ind_2.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground mr-1",
                                                    children: valStr
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeIndicator(ind_2.id),
                                                    className: "text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                                    title: "Remove Indicator",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, ind_2.id, true, {
                                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                            lineNumber: 368,
                                            columnNumber: 22
                                        }, this);
                                    })
                                }, pane.id, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 349,
                                    columnNumber: 18
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    showLayoutPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-56 border-l border-border flex-shrink-0 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$LayoutPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutPanel"], {
                            symbol: symbol
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                            lineNumber: 382,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 381,
                        columnNumber: 29
                    }, this),
                    showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        style: {
                            width: `${watchlistWidth}px`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 385,
                        columnNumber: 27
                    }, this),
                    showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-0 bottom-0 z-30 flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
                            config: watchlistConfig,
                            onConfigChange: setWatchlistConfig
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 390,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndicatorDialog"], {
                open: showIndDialog,
                onClose: ()=>setShowIndDialog(false)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/ChartContainer.tsx",
        lineNumber: 315,
        columnNumber: 10
    }, this);
}
_s(ChartContent, "2k+vrqoWzQK6hKJbRa+MHYvqYGw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartData"]
    ];
});
_c = ChartContent;
function ChartContainer(props) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "50b74b9c3db393609dba841f6ce27bc83be3073e59d2a0ab3de46bb47e15eb7e") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "50b74b9c3db393609dba841f6ce27bc83be3073e59d2a0ab3de46bb47e15eb7e";
    }
    const { fullscreenMode: t0 } = props;
    const fullscreenMode = t0 === undefined ? false : t0;
    const { isFullscreen, toggleFullscreen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(_ChartContainerUseSyncExternalStoreArg, _ChartContainerUseSyncExternalStoreArg2, _ChartContainerUseSyncExternalStoreArg3);
    let t1;
    let t2;
    if ($[1] !== isFullscreen || $[2] !== toggleFullscreen) {
        t1 = ({
            "ChartContainer[useEffect()]": ()=>{
                if (!isFullscreen) {
                    return;
                }
                const handler = {
                    "ChartContainer[useEffect() > handler]": (e)=>{
                        if (e.key === "Escape") {
                            toggleFullscreen();
                        }
                    }
                }["ChartContainer[useEffect() > handler]"];
                window.addEventListener("keydown", handler);
                return ()=>window.removeEventListener("keydown", handler);
            }
        })["ChartContainer[useEffect()]"];
        t2 = [
            isFullscreen,
            toggleFullscreen
        ];
        $[1] = isFullscreen;
        $[2] = toggleFullscreen;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (mounted && (isFullscreen && mounted || fullscreenMode)) {
        let t3;
        if ($[5] !== props) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9997] flex flex-col bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContent, {
                    ...props
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                    lineNumber: 451,
                    columnNumber: 93
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 451,
                columnNumber: 25
            }, this), document.body);
            $[5] = props;
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        return t3;
    }
    let t3;
    if ($[7] !== props) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex flex-col",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContent, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 461,
                columnNumber: 55
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/ChartContainer.tsx",
            lineNumber: 461,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return t3;
}
_s1(ChartContainer, "u74v0y4Xg+y97L4qF+RKwzxaous=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c1 = ChartContainer;
function _ChartContainerUseSyncExternalStoreArg3() {
    return false;
}
function _ChartContainerUseSyncExternalStoreArg2() {
    return true;
}
function _ChartContainerUseSyncExternalStoreArg() {
    return _temp;
}
function _temp() {}
var _c, _c1;
__turbopack_context__.k.register(_c, "ChartContent");
__turbopack_context__.k.register(_c1, "ChartContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/MultiChartWorkspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MultiChartWorkspace",
    ()=>MultiChartWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$ChartContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/ChartContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
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
const STORAGE_KEY = 'artha.chart.workspaceLayout';
const LAYOUT_OPTIONS = [
    {
        id: 'single',
        label: 'Single chart',
        description: 'One focused chart view',
        panelCount: 1,
        gridClassName: 'grid-cols-1 grid-rows-1',
        cells: [
            {
                key: 'single'
            }
        ]
    },
    {
        id: 'two-up',
        label: '2 charts',
        description: 'Side-by-side comparison',
        panelCount: 2,
        gridClassName: 'grid-cols-1 md:grid-cols-2',
        cells: [
            {
                key: 'left'
            },
            {
                key: 'right'
            }
        ]
    },
    {
        id: 'quad',
        label: '4 charts',
        description: 'Balanced 2 × 2 grid',
        panelCount: 4,
        gridClassName: 'grid-cols-1 md:grid-cols-2 md:grid-rows-2',
        cells: [
            {
                key: 'q1'
            },
            {
                key: 'q2'
            },
            {
                key: 'q3'
            },
            {
                key: 'q4'
            }
        ]
    },
    {
        id: 'nine',
        label: '9 charts',
        description: 'Dense market monitor',
        panelCount: 9,
        gridClassName: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3',
        cells: [
            {
                key: 'n1'
            },
            {
                key: 'n2'
            },
            {
                key: 'n3'
            },
            {
                key: 'n4'
            },
            {
                key: 'n5'
            },
            {
                key: 'n6'
            },
            {
                key: 'n7'
            },
            {
                key: 'n8'
            },
            {
                key: 'n9'
            }
        ]
    },
    {
        id: 'hero-bottom',
        label: '1 big + 2 small',
        description: 'Primary chart with two secondary panels',
        panelCount: 3,
        gridClassName: 'grid-cols-1 md:grid-cols-2 md:grid-rows-[minmax(0,1.6fr)_minmax(0,1fr)]',
        cells: [
            {
                key: 'hero',
                className: 'md:col-span-2'
            },
            {
                key: 'bottom-left'
            },
            {
                key: 'bottom-right'
            }
        ]
    }
];
function getLayout(layout) {
    return LAYOUT_OPTIONS.find((option)=>option.id === layout) ?? LAYOUT_OPTIONS[0];
}
function LayoutPreview(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "fbb781d6f0a1b5acdbcabd2487f298965ec7d3220b1bb17a23500839412c2a33") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fbb781d6f0a1b5acdbcabd2487f298965ec7d3220b1bb17a23500839412c2a33";
    }
    const { layoutId } = t0;
    let t1;
    let t2;
    if ($[1] !== layoutId) {
        const layout = getLayout(layoutId);
        const previewClassName = {
            single: "grid-cols-1 grid-rows-1",
            "two-up": "grid-cols-2 grid-rows-1",
            quad: "grid-cols-2 grid-rows-2",
            nine: "grid-cols-3 grid-rows-3",
            "hero-bottom": "grid-cols-2 grid-rows-[1.5fr_1fr]"
        }[layoutId];
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid h-8 w-10 gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-app)] p-1", previewClassName);
        t2 = layout.cells.map({
            "LayoutPreview[layout.cells.map()]": (cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-[3px] border border-[var(--border)] bg-[var(--bg-card)]", layoutId === "hero-bottom" && cell.key === "hero" ? "col-span-2" : null)
                }, cell.key, false, {
                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                    lineNumber: 130,
                    columnNumber: 52
                }, this)
        }["LayoutPreview[layout.cells.map()]"]);
        $[1] = layoutId;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] !== t1 || $[5] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 141,
            columnNumber: 10
        }, this);
        $[4] = t1;
        $[5] = t2;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    return t3;
}
_c = LayoutPreview;
function MultiChartWorkspace(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(48);
    if ($[0] !== "fbb781d6f0a1b5acdbcabd2487f298965ec7d3220b1bb17a23500839412c2a33") {
        for(let $i = 0; $i < 48; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fbb781d6f0a1b5acdbcabd2487f298965ec7d3220b1bb17a23500839412c2a33";
    }
    const { symbol, initialLayout: t1 } = t0;
    const initialLayout = t1 === undefined ? "single" : t1;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLayout);
    let t2;
    let t3;
    if ($[1] !== initialLayout) {
        t2 = ({
            "MultiChartWorkspace[useEffect()]": ()=>{
                if (initialLayout !== "single") {
                    return;
                }
                const saved = globalThis.window?.localStorage.getItem(STORAGE_KEY);
                if (saved && LAYOUT_OPTIONS.some({
                    "MultiChartWorkspace[useEffect() > LAYOUT_OPTIONS.some()]": (option)=>option.id === saved
                }["MultiChartWorkspace[useEffect() > LAYOUT_OPTIONS.some()]"])) {
                    setLayout(saved);
                }
            }
        })["MultiChartWorkspace[useEffect()]"];
        t3 = [
            initialLayout
        ];
        $[1] = initialLayout;
        $[2] = t2;
        $[3] = t3;
    } else {
        t2 = $[2];
        t3 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[4] !== layout || $[5] !== pathname || $[6] !== router) {
        t4 = ({
            "MultiChartWorkspace[useEffect()]": ()=>{
                globalThis.window?.localStorage.setItem(STORAGE_KEY, layout);
                const query = layout === "single" ? "" : `?layout=${layout}`;
                router.replace(`${pathname}${query}`, {
                    scroll: false
                });
            }
        })["MultiChartWorkspace[useEffect()]"];
        t5 = [
            layout,
            pathname,
            router
        ];
        $[4] = layout;
        $[5] = pathname;
        $[6] = router;
        $[7] = t4;
        $[8] = t5;
    } else {
        t4 = $[7];
        t5 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[9] !== layout) {
        t6 = getLayout(layout);
        $[9] = layout;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const activeLayout = t6;
    let t7;
    if ($[11] !== symbol) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-semibold tracking-tight",
            children: symbol
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 225,
            columnNumber: 10
        }, this);
        $[11] = symbol;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    const t8 = activeLayout.panelCount === 1 ? "panel" : "panels";
    let t9;
    if ($[13] !== activeLayout.panelCount || $[14] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "rounded-full bg-[var(--brand-tint)] px-2 py-0.5 text-[11px] font-medium text-[var(--brand-primary)]",
            children: [
                activeLayout.panelCount,
                " ",
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 234,
            columnNumber: 10
        }, this);
        $[13] = activeLayout.panelCount;
        $[14] = t8;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t7 || $[17] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[16] = t7;
        $[17] = t9;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-0.5 text-xs text-[var(--text-secondary)]",
            children: "Switch chart layouts without leaving the fullscreen workspace."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 252,
            columnNumber: 11
        }, this);
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
            size: 15
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== activeLayout.label) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: activeLayout.label
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[23] = activeLayout.label;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            size: 14,
            className: "text-[var(--text-muted)]"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] !== t14) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                size: "sm",
                className: "gap-2",
                children: [
                    t13,
                    t14,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 289,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 289,
            columnNumber: 11
        }, this);
        $[26] = t14;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    let t18;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
            children: "Chart layout"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[28] = t17;
        $[29] = t18;
    } else {
        t17 = $[28];
        t18 = $[29];
    }
    let t19;
    if ($[30] !== layout) {
        t19 = LAYOUT_OPTIONS.map({
            "MultiChartWorkspace[LAYOUT_OPTIONS.map()]": (option_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                    onClick: {
                        "MultiChartWorkspace[LAYOUT_OPTIONS.map() > <DropdownMenuItem>.onClick]": ()=>setLayout(option_0.id)
                    }["MultiChartWorkspace[LAYOUT_OPTIONS.map() > <DropdownMenuItem>.onClick]"],
                    className: "items-start gap-3 rounded-md px-3 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutPreview, {
                            layoutId: option_0.id
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 311,
                            columnNumber: 135
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-[var(--text-primary)]",
                                            children: option_0.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                            lineNumber: 311,
                                            columnNumber: 264
                                        }, this),
                                        layout === option_0.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14,
                                            className: "text-[var(--brand-primary)]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                            lineNumber: 311,
                                            columnNumber: 378
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                    lineNumber: 311,
                                    columnNumber: 207
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-xs text-[var(--text-secondary)]",
                                    children: option_0.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                    lineNumber: 311,
                                    columnNumber: 451
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 311,
                            columnNumber: 175
                        }, this)
                    ]
                }, option_0.id, true, {
                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                    lineNumber: 309,
                    columnNumber: 64
                }, this)
        }["MultiChartWorkspace[LAYOUT_OPTIONS.map()]"]);
        $[30] = layout;
        $[31] = t19;
    } else {
        t19 = $[31];
    }
    let t20;
    if ($[32] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
            align: "end",
            className: "w-80",
            children: [
                t17,
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        $[32] = t19;
        $[33] = t20;
    } else {
        t20 = $[33];
    }
    let t21;
    if ($[34] !== t16 || $[35] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
            children: [
                t16,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 328,
            columnNumber: 11
        }, this);
        $[34] = t16;
        $[35] = t20;
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    let t22;
    if ($[37] !== t12 || $[38] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg-card)] px-4 py-3",
            children: [
                t12,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 337,
            columnNumber: 11
        }, this);
        $[37] = t12;
        $[38] = t21;
        $[39] = t22;
    } else {
        t22 = $[39];
    }
    let t23;
    if ($[40] !== activeLayout.cells || $[41] !== activeLayout.gridClassName || $[42] !== layout || $[43] !== symbol) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-0 flex-1 overflow-hidden p-3",
            children: layout === "single" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$ChartContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartContainer"], {
                    symbol: symbol,
                    workspaceMode: true
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                    lineNumber: 346,
                    columnNumber: 198
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 346,
                columnNumber: 86
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid h-full min-h-0 gap-3", activeLayout.gridClassName),
                children: activeLayout.cells.map({
                    "MultiChartWorkspace[activeLayout.cells.map()]": (cell, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-h-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm", cell.className),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                title: `${symbol} chart panel ${index + 1}`,
                                src: `/stocks/${encodeURIComponent(symbol)}/chart?embed=1&panel=${index + 1}`,
                                className: "h-full w-full border-0 bg-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                lineNumber: 347,
                                columnNumber: 227
                            }, this)
                        }, cell.key, false, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 347,
                            columnNumber: 77
                        }, this)
                }["MultiChartWorkspace[activeLayout.cells.map()]"])
            }, void 0, false, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 346,
                columnNumber: 262
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 346,
            columnNumber: 11
        }, this);
        $[40] = activeLayout.cells;
        $[41] = activeLayout.gridClassName;
        $[42] = layout;
        $[43] = symbol;
        $[44] = t23;
    } else {
        t23 = $[44];
    }
    let t24;
    if ($[45] !== t22 || $[46] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen min-h-screen flex-col overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)]",
            children: [
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[45] = t22;
        $[46] = t23;
        $[47] = t24;
    } else {
        t24 = $[47];
    }
    return t24;
}
_s(MultiChartWorkspace, "Y86yaEvTbH6G23KQsisDHBjuou0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = MultiChartWorkspace;
var _c, _c1;
__turbopack_context__.k.register(_c, "LayoutPreview");
__turbopack_context__.k.register(_c1, "MultiChartWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_25c39abd._.js.map