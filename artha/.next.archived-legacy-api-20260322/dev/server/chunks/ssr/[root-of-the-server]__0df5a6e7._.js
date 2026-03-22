module.exports = [
"[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useChartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set, get)=>({
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
"[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/charting/drawings/primitives/TrendLinePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TrendLinePrimitive — renders a two-point trend line on the chart canvas.
 */ __turbopack_context__.s([
    "TrendLinePrimitive",
    ()=>TrendLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class TrendLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
class TrendLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/HorzLinePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HorzLinePrimitive — renders a full-width horizontal price line.
 */ __turbopack_context__.s([
    "HorzLinePrimitive",
    ()=>HorzLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class HorzLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _y = null;
    setY(y) {
        this._y = y;
    }
    renderer() {
        return new HorzLineRenderer(this._y, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 1, this._data.style?.dashed ?? false);
    }
}
class HorzLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
"[project]/src/components/charting/drawings/primitives/MeasuringToolPrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
;
;
class MeasuringToolPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
class MeasuringToolView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
            const line1 = `${sign}₹${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIndianNumber"])(Math.abs(priceDiff), 2)} (${sign}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPercentage"])(Math.abs(pricePercent), 2)})`;
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
}),
"[project]/src/components/charting/drawings/primitives/RectanglePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RectanglePrimitive — two-point rectangle drawing tool.
 */ __turbopack_context__.s([
    "RectanglePrimitive",
    ()=>RectanglePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class RectangleView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
class RectanglePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/VertLinePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * VertLinePrimitive — renders a full-height vertical line at a specific time.
 */ __turbopack_context__.s([
    "VertLinePrimitive",
    ()=>VertLinePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class VertLineView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _x = null;
    setX(x) {
        this._x = x;
    }
    renderer() {
        return new VertLineRenderer(this._x, this._data.style?.color ?? '#3B82F6', this._data.style?.lineWidth ?? 1, this._data.style?.dashed ?? false);
    }
}
class VertLinePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/FibretracePrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FibretracePrimitive — renders Fibonacci retracement levels between two points.
 */ __turbopack_context__.s([
    "FibretracePrimitive",
    ()=>FibretracePrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class FibretraceView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
class FibretracePrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/ChannelPrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class ChannelView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
class ChannelPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/TextPrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TextPrimitive — renders text on the chart canvas.
 */ __turbopack_context__.s([
    "TextPrimitive",
    ()=>TextPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class TextView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
    _p1 = null;
    renderer() {
        return new TextRenderer(this._p1, this._data.text ?? 'Text', this._data.style?.color ?? '#F59E0B');
    }
    setPoints(p1) {
        this._p1 = p1;
    }
}
class TextPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/primitives/ArrowPrimitive.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ArrowPrimitive — renders a directional arrow between two points.
 */ __turbopack_context__.s([
    "ArrowPrimitive",
    ()=>ArrowPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/BasePrimitive.ts [app-ssr] (ecmascript)");
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
class ArrowView extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseDrawingView"] {
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
class ArrowPrimitive extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$BasePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasePrimitive"] {
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
}),
"[project]/src/components/charting/drawings/DrawingManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TrendLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/TrendLinePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$HorzLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/HorzLinePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$MeasuringToolPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/MeasuringToolPrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$RectanglePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/RectanglePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$VertLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/VertLinePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$FibretracePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/FibretracePrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ChannelPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/ChannelPrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TextPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/TextPrimitive.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ArrowPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/primitives/ArrowPrimitive.ts [app-ssr] (ecmascript)");
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
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TrendLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrendLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'horzline':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$HorzLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HorzLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'vertline':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$VertLinePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VertLinePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'measure':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$MeasuringToolPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeasuringToolPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'rectangle':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$RectanglePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RectanglePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'fibretrace':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$FibretracePrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FibretracePrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'channel':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ChannelPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChannelPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'text':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$TextPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextPrimitive"](data, (d)=>this._onUpdated(data.id, d));
            case 'arrow':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$primitives$2f$ArrowPrimitive$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowPrimitive"](data, (d)=>this._onUpdated(data.id, d));
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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
}),
"[project]/src/lib/utils/emojis.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DropdownMenu({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dropdown-menu",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DropdownMenuPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dropdown-menu-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function DropdownMenuTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dropdown-menu-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "dropdown-menu-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function DropdownMenuGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "dropdown-menu-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DropdownMenuSub({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sub"], {
        "data-slot": "dropdown-menu-sub",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
function DropdownMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"], {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
                className: "ml-auto"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
function DropdownMenuSubContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"], {
        "data-slot": "dropdown-menu-sub-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        "data-slot": "dropdown-menu-checkbox-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"], {
        "data-slot": "dropdown-menu-radio-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                        className: "size-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset]:pl-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "dropdown-menu-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-border -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
function DropdownMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground ml-auto text-xs tracking-widest", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer", {
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
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
Button.displayName = "Button";
;
}),
"[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Select = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full appearance-none items-center justify-between whitespace-nowrap rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-[var(--text-primary)] [&>option]:bg-[var(--surface-elevated)]", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
Select.displayName = "Select";
;
}),
"[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript) <export * as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Root, {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Trigger, {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Portal, {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Overlay, {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Content, {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props,
        children: [
            children,
            showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Title, {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Description, {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-[var(--control-height)] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-[var(--control-padding-x)] py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-focus)] focus-visible:border-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-ssr] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
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
const WATCHLIST_PANEL_SYMBOL_WIDTH = 100;
const WATCHLIST_PANEL_INDUSTRY_WIDTH = 24;
const WATCHLIST_PANEL_CHANGE_WIDTH = 72;
const WATCHLIST_PANEL_PRICE_WIDTH = 88;
const WATCHLIST_PANEL_PADDING_WIDTH = 36;
const WATCHLIST_MAX_CUSTOM_COLUMNS = 10;
const WATCHLIST_METRICS = [
    {
        key: 'rvol1',
        label: 'RVol',
        shortLabel: 'RVol',
        width: 64,
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
        width: 64,
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
        width: 64,
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
        width: 60,
        kind: 'multiple'
    },
    {
        key: 'pb',
        label: 'P/B',
        shortLabel: 'P/B',
        width: 60,
        kind: 'multiple'
    },
    {
        key: 'roe',
        label: 'ROE',
        shortLabel: 'ROE',
        width: 60,
        kind: 'percent'
    },
    {
        key: 'roce',
        label: 'ROCE',
        shortLabel: 'ROCE',
        width: 60,
        kind: 'percent'
    },
    {
        key: 'debtToEquity',
        label: 'Debt / Eq',
        shortLabel: 'D/E',
        width: 64,
        kind: 'multiple'
    },
    {
        key: 'dividendYield',
        label: 'Dividend Yield',
        shortLabel: 'Div Yld',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'salesGrowth',
        label: 'Sales Growth',
        shortLabel: 'Sales Gr',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'profitGrowth',
        label: 'Profit Growth',
        shortLabel: 'Profit Gr',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'marketCap',
        label: 'Market Cap',
        shortLabel: 'MCap',
        width: 72,
        kind: 'currencyCompact'
    }
];
const METRIC_DEFINITIONS = Object.fromEntries(WATCHLIST_METRICS.map((metric)=>[
        metric.key,
        metric
    ]));
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
function SortArrow({ active, direction }) {
    if (!active) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
            size: 12,
            className: "shrink-0 self-center text-foreground/70"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 223,
            columnNumber: 12
        }, this);
    }
    if (direction === 'asc') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
            size: 12,
            className: "shrink-0 self-center text-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 227,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
        size: 12,
        className: "shrink-0 self-center text-foreground"
    }, void 0, false, {
        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
        lineNumber: 230,
        columnNumber: 10
    }, this);
}
function WatchlistPanel({ config, onConfigChange, onSymbolSelect, onClose }) {
    const { symbol: activeSymbol, setSymbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('symbol');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('asc');
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [watchlists, setWatchlists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_WATCHLIST_COLLECTIONS);
    const [selectedWatchlistIds, setSelectedWatchlistIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        DEFAULT_WATCHLIST_COLLECTIONS[0].id
    ]);
    const enabledMetricColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getEnabledMetricColumns(config), [
        config
    ]);
    const enabledIndicatorCount = enabledMetricColumns.length;
    const activeWatchlists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>watchlists.filter((watchlist)=>selectedWatchlistIds.includes(watchlist.id)), [
        selectedWatchlistIds,
        watchlists
    ]);
    const activeWatchlist = activeWatchlists[0] ?? watchlists[0];
    const industryCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = new Map();
        (activeWatchlist?.items ?? []).forEach((item)=>{
            counts.set(item.industryGroup, (counts.get(item.industryGroup) ?? 0) + 1);
        });
        return counts;
    }, [
        activeWatchlist
    ]);
    const gridTemplateColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const segments = [
            `${WATCHLIST_PANEL_SYMBOL_WIDTH}px`
        ];
        if (config.industryIcon.enabled) {
            segments.push(`${WATCHLIST_PANEL_INDUSTRY_WIDTH}px`);
        }
        enabledMetricColumns.forEach((metric)=>{
            segments.push(`${metric.width}px`);
        });
        segments.push(`${WATCHLIST_PANEL_CHANGE_WIDTH}px`);
        return segments.join(' ');
    }, [
        config.industryIcon.enabled,
        enabledMetricColumns
    ]);
    const sortedItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const items = [
            ...activeWatchlist?.items ?? []
        ];
        items.sort((left, right)=>{
            if (sortKey === 'industryGroup') {
                const leftCount = industryCounts.get(left.industryGroup) ?? 0;
                const rightCount = industryCounts.get(right.industryGroup) ?? 0;
                if (leftCount !== rightCount) {
                    return sortDirection === 'asc' ? leftCount - rightCount : rightCount - leftCount;
                }
                const industryCompare = left.industryGroup.localeCompare(right.industryGroup);
                if (industryCompare !== 0) {
                    return sortDirection === 'asc' ? industryCompare : -industryCompare;
                }
            }
            const leftValue = getSortValue(left, sortKey);
            const rightValue = getSortValue(right, sortKey);
            if (typeof leftValue === 'string' && typeof rightValue === 'string') {
                return sortDirection === 'asc' ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
            }
            return sortDirection === 'asc' ? Number(leftValue) - Number(rightValue) : Number(rightValue) - Number(leftValue);
        });
        return items;
    }, [
        activeWatchlist,
        industryCounts,
        sortDirection,
        sortKey
    ]);
    function handleSelect(item) {
        setSymbol(item.symbol);
        onSymbolSelect?.(item.symbol);
    }
    function handleClose() {
        onClose?.();
    }
    function toggleWatchlistSelection(watchlistId) {
        setSelectedWatchlistIds((current)=>{
            if (current.includes(watchlistId)) {
                return current.length === 1 ? current : current.filter((id)=>id !== watchlistId);
            }
            return [
                watchlistId,
                ...current.filter((id)=>id !== watchlistId)
            ];
        });
    }
    function addWatchlist() {
        setWatchlists((current)=>{
            const nextIndex = current.length + 1;
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
                ...current,
                nextWatchlist
            ];
        });
    }
    function removeWatchlist(watchlistId) {
        setWatchlists((current)=>{
            if (current.length === 1) {
                return current;
            }
            const nextWatchlists = current.filter((watchlist)=>watchlist.id !== watchlistId);
            setSelectedWatchlistIds((selected)=>{
                const filtered = selected.filter((id)=>id !== watchlistId);
                return filtered.length > 0 ? filtered : [
                    nextWatchlists[0].id
                ];
            });
            return nextWatchlists;
        });
    }
    function removeRow(symbol) {
        if (!activeWatchlist) {
            return;
        }
        setWatchlists((current)=>current.map((watchlist)=>{
                if (watchlist.id !== activeWatchlist.id) {
                    return watchlist;
                }
                return {
                    ...watchlist,
                    items: watchlist.items.filter((item)=>item.symbol !== symbol)
                };
            }));
    }
    function handleSort(nextKey) {
        if (sortKey === nextKey) {
            setSortDirection((current)=>current === 'asc' ? 'desc' : 'asc');
            return;
        }
        setSortKey(nextKey);
        setSortDirection(nextKey === 'symbol' || nextKey === 'industryGroup' ? 'asc' : 'desc');
    }
    function updateColumnEnabled(columnKey, enabled) {
        onConfigChange((current)=>{
            if (columnKey !== 'industryIcon' && enabled && !current[columnKey].enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS) {
                return current;
            }
            return {
                ...current,
                [columnKey]: {
                    ...current[columnKey],
                    enabled
                }
            };
        });
    }
    function updateColumnPeriod(columnKey, period) {
        onConfigChange((current)=>({
                ...current,
                [columnKey]: {
                    ...current[columnKey],
                    period
                }
            }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col overflow-hidden border-l border-border bg-background/95 shadow-2xl backdrop-blur",
        style: {
            width: `${getWatchlistPanelWidth(config)}px`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b border-border px-2 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "h-7 w-7",
                                title: "Add stock to watchlist",
                                onClick: ()=>setSearchOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "h-7 w-[172px] justify-between gap-1.5 px-1.5 text-left text-xs font-semibold tracking-tight text-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: activeWatchlist?.name ?? 'Watchlist'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    size: 12,
                                                    className: "shrink-0 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 420,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "start",
                                        className: "w-[260px] p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                children: "My Watchlists"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, this),
                                            watchlists.map((watchlist)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                                            checked: selectedWatchlistIds.includes(watchlist.id),
                                                            onSelect: (event)=>event.preventDefault(),
                                                            onCheckedChange: ()=>toggleWatchlistSelection(watchlist.id),
                                                            className: "flex-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate",
                                                                children: watchlist.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                lineNumber: 435,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: (event)=>{
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                removeWatchlist(watchlist.id);
                                                            },
                                                            className: "mr-1 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
                                                            disabled: watchlists.length === 1,
                                                            title: "Remove watchlist",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, watchlist.id, true, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 452,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                onSelect: addWatchlist,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Add watchlist"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 453,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-7 w-7",
                                        title: "Watchlist settings",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 464,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                    align: "end",
                                    className: "w-[320px] p-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                className: "px-0 py-0 text-foreground",
                                                children: "Watchlist Columns"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 469,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 468,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 471,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-h-[420px] space-y-3 overflow-y-auto p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-medium text-foreground",
                                                                children: "Industry Group"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                lineNumber: 475,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>updateColumnEnabled('industryIcon', !config.industryIcon.enabled),
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors', config.industryIcon.enabled ? 'border-amber-500/40 bg-amber-500/10 text-amber-500' : 'border-border text-muted-foreground hover:bg-muted/50'),
                                                            children: [
                                                                config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                    lineNumber: 487,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: config.industryIcon.enabled ? 'Include' : 'Exclude'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                    lineNumber: 488,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 17
                                                }, this),
                                                [
                                                    {
                                                        title: 'Technicals',
                                                        keys: TECHNICAL_METRIC_KEYS
                                                    },
                                                    {
                                                        title: 'Fundamentals',
                                                        keys: FUNDAMENTAL_METRIC_KEYS
                                                    }
                                                ].map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
                                                                children: section.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                lineNumber: 497,
                                                                columnNumber: 21
                                                            }, this),
                                                            section.keys.map((metricKey)=>{
                                                                const metric = METRIC_DEFINITIONS[metricKey];
                                                                const column = config[metric.key];
                                                                const limitReached = !column.enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-lg border border-border bg-background px-3 py-2.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start justify-between gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-sm font-medium text-foreground",
                                                                                        children: metric.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                        lineNumber: 507,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                    lineNumber: 506,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    disabled: limitReached,
                                                                                    onClick: ()=>updateColumnEnabled(metric.key, !column.enabled),
                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50', column.enabled ? 'border-amber-500/40 bg-amber-500/10 text-amber-500' : 'border-border text-muted-foreground hover:bg-muted/50'),
                                                                                    children: [
                                                                                        column.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                            size: 12
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                            lineNumber: 520,
                                                                                            columnNumber: 50
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            children: column.enabled ? 'Included' : 'Include'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                            lineNumber: 521,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                    lineNumber: 509,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                            lineNumber: 505,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        metric.periodOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2 grid grid-cols-[1fr_84px] items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[11px] text-muted-foreground",
                                                                                    children: "Parameter"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                    lineNumber: 527,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: String(column.period ?? metric.periodOptions[0]),
                                                                                    onChange: (event)=>updateColumnPeriod(metric.key, Number(event.target.value)),
                                                                                    className: "h-7 text-xs",
                                                                                    children: metric.periodOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: option,
                                                                                            children: option
                                                                                        }, option, false, {
                                                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                            lineNumber: 534,
                                                                                            columnNumber: 35
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                                    lineNumber: 528,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                            lineNumber: 526,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, metric.key, true, {
                                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 25
                                                                }, this);
                                                            })
                                                        ]
                                                    }, section.title, true, {
                                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 472,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 467,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid items-center gap-px border-b border-border bg-muted/30 pl-3 pr-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
                style: {
                    gridTemplateColumns
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>handleSort('symbol'),
                        className: "flex min-w-0 items-center gap-1 text-left leading-none hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Symbol"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 552,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                active: sortKey === 'symbol',
                                direction: sortDirection
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this),
                    config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>handleSort('industryGroup'),
                        className: "flex items-center justify-center gap-1 text-center leading-none hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Ind"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 558,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                active: sortKey === 'industryGroup',
                                direction: sortDirection
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 557,
                        columnNumber: 11
                    }, this),
                    enabledMetricColumns.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleSort(metric.key),
                            className: "flex items-center justify-end gap-1 text-right leading-none hover:text-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        metric.shortLabel,
                                        config[metric.key].period ? `(${config[metric.key].period})` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 565,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                    active: sortKey === metric.key,
                                    direction: sortDirection
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 566,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, metric.key, true, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 564,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>handleSort('change'),
                        className: "flex items-center justify-end gap-1 text-right leading-none hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Chg%"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                active: sortKey === 'change',
                                direction: sortDirection
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 570,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 550,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-0 pb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: sortedItems.map((item)=>{
                            const isActive = item.symbol === activeSymbol;
                            const isPositive = item.change > 0;
                            const isNegative = item.change < 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleSelect(item),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group relative grid min-h-8 w-full items-center gap-px border-b border-border/80 pl-3 pr-3 py-1.5 text-left transition-colors', isActive ? 'bg-amber-500/5 hover:bg-muted/40' : 'bg-transparent hover:bg-muted/40'),
                                style: {
                                    gridTemplateColumns
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex flex-col justify-center truncate",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('min-w-0 truncate text-[12px] font-semibold leading-tight', isActive ? 'text-amber-500' : 'text-foreground'),
                                                children: item.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 597,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 truncate text-[10px] text-muted-foreground leading-tight",
                                                title: item.name,
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 600,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 596,
                                        columnNumber: 17
                                    }, this),
                                    config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center text-base leading-none",
                                        title: item.industryGroup,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIndustryGroupEmoji"])(item.industryGroup)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 606,
                                        columnNumber: 19
                                    }, this),
                                    enabledMetricColumns.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "truncate text-right text-[11px] font-mono text-foreground/90",
                                            children: formatMetricValue(item, metric.key)
                                        }, metric.key, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 612,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('truncate text-right text-[11px] font-semibold', isPositive ? 'text-emerald-500' : isNegative ? 'text-rose-500' : 'text-muted-foreground'),
                                                children: [
                                                    isPositive ? '+' : '',
                                                    item.change.toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 618,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate text-right text-[10px] font-mono text-muted-foreground",
                                                children: [
                                                    "₹",
                                                    item.price.toLocaleString('en-IN', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 621,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 617,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        role: "button",
                                        tabIndex: 0,
                                        onClick: (event)=>{
                                            event.stopPropagation();
                                            removeRow(item.symbol);
                                        },
                                        onKeyDown: (event)=>{
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                removeRow(item.symbol);
                                            }
                                        },
                                        className: "absolute right-0.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-rose-500 group-hover:opacity-100",
                                        title: "Remove row",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 11
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 643,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 626,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.symbol, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 584,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this),
                    sortedItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-32 items-center justify-center border-b border-dashed border-border text-sm text-muted-foreground",
                        children: "This watchlist is empty."
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 651,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: searchOpen,
                onOpenChange: setSearchOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Add Stock to Watchlist"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 659,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 664,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Search by symbol or name...",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            className: "pl-9",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 665,
                                            columnNumber: 15
                                        }, this),
                                        searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSearchQuery(''),
                                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                lineNumber: 677,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 663,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Search functionality coming soon..."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 681,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 662,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 658,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
        lineNumber: 409,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/widgets/TopBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * TopBar — the chart's top control strip.
 * Symbol + price, timeframe selector, chart type selector, indicators button,
 * theme toggle, fullscreen toggle.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-ssr] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-area.js [app-ssr] (ecmascript) <export default as AreaChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-ssr] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column-increasing.js [app-ssr] (ecmascript) <export default as BarChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-ssr] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-ssr] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 34,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Candlestick'
    },
    {
        value: 'ohlc',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 35,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'OHLC'
    },
    {
        value: 'line',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 36,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Line'
    },
    {
        value: 'area',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__["AreaChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 37,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Area'
    },
    {
        value: 'bar',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
            lineNumber: 38,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Bar'
    }
];
function TopBar({ symbol, currentPrice, priceChange, onIndicatorsClick, onScreenshot, fullscreenMode = false, embeddedPanel = false, workspaceMode = false, multiChartMode = false, panelNumber, extraControls, watchlistConfig, onWatchlistConfigChange }) {
    const { timeframe, chartType, isDark, isFullscreen, indicators, showWatchlist, showLayoutPanel, setTimeframe, setChartType, toggleDark, toggleFullscreen, toggleWatchlist, toggleLayoutPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showChartTypeMenu, setShowChartTypeMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isPos = (priceChange ?? 0) > 0;
    const isNeg = (priceChange ?? 0) < 0;
    const handleFullscreenClick = ()=>{
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
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 border-b border-border bg-background select-none z-10', embeddedPanel ? 'px-2 py-1.5' : 'px-3 py-2 flex-wrap'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-2 py-1 rounded-md bg-muted/20 border border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold font-mono text-foreground",
                        children: symbol || 'RELIANCE'
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    embeddedPanel && panelNumber ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-[var(--brand-tint)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand-primary)]",
                        children: [
                            "P",
                            panelNumber
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this) : null,
                    currentPrice != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-mono font-semibold text-foreground",
                                children: [
                                    "₹",
                                    currentPrice.toLocaleString('en-IN', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            priceChange != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xs font-mono font-medium', isPos ? 'text-emerald-500' : isNeg ? 'text-rose-500' : 'text-muted-foreground'),
                                children: [
                                    isPos ? '+' : '',
                                    priceChange.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-4 bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-[88px] shrink-0', embeddedPanel ? 'w-[80px]' : null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                    "aria-label": "Timeframe",
                    value: timeframe,
                    onChange: (e)=>setTimeframe(e.target.value),
                    className: "h-8 rounded-md border-[var(--border)] bg-[var(--bg-card)] pr-8 text-xs font-semibold text-[var(--text-primary)] shadow-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                            label: "Intraday",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMEFRAMES"].filter((tf)=>tf.seconds < 86400).map((tf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: tf.value,
                                    children: tf.label
                                }, tf.value, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                            label: "Higher Timeframes",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMEFRAMES"].filter((tf)=>tf.seconds >= 86400).map((tf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: tf.value,
                                    children: tf.label
                                }, tf.value, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-4 bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowChartTypeMenu((s)=>!s),
                        className: "flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
                        title: "Chart type",
                        children: [
                            CHART_TYPES.find((c)=>c.value === chartType)?.icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "capitalize text-[11px]",
                                children: chartType
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    showChartTypeMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-[100]",
                                onClick: ()=>setShowChartTypeMenu(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-full left-0 mt-1 z-[101] bg-background border border-border rounded-lg shadow-xl py-1 min-w-[140px]",
                                children: CHART_TYPES.map((ct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 w-full px-3 py-1.5 text-xs transition-colors', chartType === ct.value ? 'text-amber-500 bg-amber-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                                        onClick: ()=>{
                                            setChartType(ct.value);
                                            setShowChartTypeMenu(false);
                                        },
                                        children: [
                                            ct.icon,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: ct.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, ct.value, true, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-4 bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onIndicatorsClick,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors', indicators.length > 0 ? 'bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Indicators"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    indicators.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-0.5 bg-amber-500 text-black text-[9px] font-bold px-1 rounded-full",
                        children: indicators.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this),
            extraControls ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-border"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    extraControls
                ]
            }, void 0, true) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleWatchlist,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex h-[var(--control-height-sm)] items-center gap-2 rounded-lg border px-3 transition-all active:scale-[0.98] group', showWatchlist ? 'border-transparent bg-[var(--brand-tint)] text-[var(--brand-primary)]' : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'),
                        title: "Watchlist",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                size: 16,
                                className: "transition-colors group-hover:text-[var(--brand-hover)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold transition-colors group-hover:text-[var(--brand-hover)]",
                                children: "Watchlist"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            showWatchlist ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-[var(--bg-card)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST"].length
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                                    title: "Configure watchlist",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                align: "end",
                                className: "w-80 p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                        children: "Watchlist Columns"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                        checked: watchlistConfig.industryIcon.enabled,
                                        onSelect: (e)=>e.preventDefault(),
                                        onCheckedChange: (checked)=>onWatchlistConfigChange((prev)=>({
                                                    ...prev,
                                                    industryIcon: {
                                                        ...prev.industryIcon,
                                                        enabled: Boolean(checked)
                                                    }
                                                })),
                                        children: "Industry Icon"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                        checked: watchlistConfig.rvol1.enabled,
                                        onSelect: (e)=>e.preventDefault(),
                                        onCheckedChange: (checked)=>onWatchlistConfigChange((prev)=>({
                                                    ...prev,
                                                    rvol1: {
                                                        ...prev.rvol1,
                                                        enabled: Boolean(checked)
                                                    }
                                                })),
                                        children: "RVOL"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                        checked: watchlistConfig.atr.enabled,
                                        onSelect: (e)=>e.preventDefault(),
                                        onCheckedChange: (checked)=>onWatchlistConfigChange((prev)=>({
                                                    ...prev,
                                                    atr: {
                                                        ...prev.atr,
                                                        enabled: Boolean(checked)
                                                    }
                                                })),
                                        children: "ATR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                        checked: watchlistConfig.natr.enabled,
                                        onSelect: (e)=>e.preventDefault(),
                                        onCheckedChange: (checked)=>onWatchlistConfigChange((prev)=>({
                                                    ...prev,
                                                    natr: {
                                                        ...prev.natr,
                                                        enabled: Boolean(checked)
                                                    }
                                                })),
                                        children: "NATR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 px-2 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "RVOL Period"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: String(watchlistConfig.rvol1.period ?? 1),
                                                        onChange: (e)=>onWatchlistConfigChange((prev)=>({
                                                                    ...prev,
                                                                    rvol1: {
                                                                        ...prev.rvol1,
                                                                        period: Number(e.target.value)
                                                                    }
                                                                })),
                                                        className: "h-8 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "1",
                                                                children: "1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "5",
                                                                children: "5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "10",
                                                                children: "10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 334,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "20",
                                                                children: "20"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "ATR Period"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: String(watchlistConfig.atr.period ?? 14),
                                                        onChange: (e)=>onWatchlistConfigChange((prev)=>({
                                                                    ...prev,
                                                                    atr: {
                                                                        ...prev.atr,
                                                                        period: Number(e.target.value)
                                                                    }
                                                                })),
                                                        className: "h-8 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "7",
                                                                children: "7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "14",
                                                                children: "14"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 351,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "21",
                                                                children: "21"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                lineNumber: 338,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-[1fr_88px] items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "NATR Period"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: String(watchlistConfig.natr.period ?? 14),
                                                        onChange: (e)=>onWatchlistConfigChange((prev)=>({
                                                                    ...prev,
                                                                    natr: {
                                                                        ...prev.natr,
                                                                        period: Number(e.target.value)
                                                                    }
                                                                })),
                                                        className: "h-8 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "7",
                                                                children: "7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "14",
                                                                children: "14"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "21",
                                                                children: "21"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                                lineNumber: 369,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 236,
                columnNumber: 26
            }, this),
            !embeddedPanel && !multiChartMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleLayoutPanel,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-1.5 rounded transition-colors', showLayoutPanel ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                title: "Layouts",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 391,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 381,
                columnNumber: 9
            }, this),
            !embeddedPanel && onScreenshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onScreenshot,
                className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
                title: "Screenshot",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 402,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 397,
                columnNumber: 9
            }, this),
            !embeddedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleDark,
                className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
                title: isDark ? 'Light mode' : 'Dark mode',
                children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 413,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 413,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 408,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleFullscreenClick,
                className: "p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
                title: embeddedPanel ? 'Open full chart' : workspaceMode || fullscreenMode ? 'Back to company' : isFullscreen ? 'Exit fullscreen' : 'Fullscreen',
                children: embeddedPanel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 423,
                    columnNumber: 26
                }, this) : workspaceMode || fullscreenMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 423,
                    columnNumber: 89
                }, this) : isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 423,
                    columnNumber: 131
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                    lineNumber: 423,
                    columnNumber: 157
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/TopBar.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/widgets/DrawingToolbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrawingToolbar",
    ()=>DrawingToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * DrawingToolbar — vertical left-side toolbar for drawing tools.
 * Activates a tool in the Zustand store; DrawingManager picks it up.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-ssr] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-horizontal.js [app-ssr] (ecmascript) <export default as MoveHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-vertical.js [app-ssr] (ecmascript) <export default as MoveVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-ssr] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-ssr] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-ssr] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dot.js [app-ssr] (ecmascript) <export default as Dot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-ssr] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const TOOLS = [
    {
        id: 'cursor',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 22,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Select / Cursor',
        dividerAfter: true
    },
    {
        id: 'trendline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 23,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Trend Line'
    },
    {
        id: 'horzline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 24,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Horizontal Line'
    },
    {
        id: 'vertline',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveVertical$3e$__["MoveVertical"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 25,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Vertical Line'
    },
    {
        id: 'rectangle',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 26,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Rectangle'
    },
    {
        id: 'fibretrace',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 27,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Fibonacci Retracement'
    },
    {
        id: 'channel',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__["MoveHorizontal"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 28,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Parallel Channel'
    },
    {
        id: 'text',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 29,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Text Annotation'
    },
    {
        id: 'arrow',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 30,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Arrow',
        dividerAfter: true
    }
];
const CROSSHAIR_MODES = [
    {
        id: 'normal',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 36,
            columnNumber: 25
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Normal Crosshair'
    },
    {
        id: 'laser',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveHorizontal$3e$__["MoveHorizontal"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 37,
            columnNumber: 25
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Laser Pointer'
    },
    {
        id: 'dot',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__["Dot"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 38,
            columnNumber: 25
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Dot Pointer'
    },
    {
        id: 'hidden',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
            lineNumber: 39,
            columnNumber: 25
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Hide Crosshair'
    }
];
function DrawingToolbar() {
    const { activeTool, setActiveTool, clearDrawings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [crosshairMode, setCrosshairMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('normal');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-0.5 w-9 py-2 border-r border-border bg-background flex-shrink-0",
        children: [
            TOOLS.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTool(tool.id),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 flex items-center justify-center rounded transition-colors', activeTool === tool.id ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                            title: tool.label,
                            children: tool.icon
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        tool.dividerAfter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-px bg-border my-1"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, tool.id, true, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)),
            CROSSHAIR_MODES.map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setCrosshairMode(mode.id),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 flex items-center justify-center rounded transition-colors', crosshairMode === mode.id ? 'bg-blue-500/20 text-blue-500 border border-blue-500/40' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                    title: mode.label,
                    children: mode.icon
                }, mode.id, false, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-5 h-px bg-border my-1"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setActiveTool('measure'),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 flex items-center justify-center rounded transition-colors', activeTool === 'measure' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                title: "Measuring Tool",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: clearDrawings,
                className: "w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors",
                title: "Clear all drawings",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/DrawingToolbar.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/widgets/DataWindow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataWindow",
    ()=>DataWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatters.ts [app-ssr] (ecmascript)");
'use client';
;
;
function DataWindow({ bar, seriesData }) {
    // Always show, even without bar data
    const hasBar = bar != null;
    // Get volume from seriesData if available
    let volume = null;
    if (seriesData) {
        for (const [api, data] of seriesData){
            if (data && 'value' in data && typeof data.value === 'number') {
                // Assume this is the volume series for now
                volume = data.value;
                break;
            }
        }
    }
    const change = hasBar && bar.open > 0 ? (bar.close - bar.open) / bar.open * 100 : 0;
    const isPos = change > 0;
    const isNeg = change < 0;
    // Extract main series and volume if needed, but here we just show the bar
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-3 left-3 z-10 bg-white border border-border rounded-lg shadow-sm px-3 py-2 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4 text-[11px] font-mono",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-foreground",
                            children: "O"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground",
                            children: hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(bar.open) : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-foreground",
                            children: "H"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground",
                            children: hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(bar.high) : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-foreground",
                            children: "L"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground",
                            children: hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(bar.low) : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-foreground",
                            children: "C"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground",
                            children: hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(bar.close) : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-foreground",
                            children: "V"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground",
                            children: volume !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatVolume"])(volume) : hasBar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatVolume"])(bar.volume) : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-muted-foreground",
                            children: "Chg"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: isPos ? 'text-emerald-500 font-semibold' : isNeg ? 'text-rose-500 font-semibold' : 'text-muted-foreground',
                            children: hasBar ? `${isPos ? '+' : ''}${change.toFixed(2)}%` : '—'
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/charting/widgets/DataWindow.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/widgets/IndicatorDialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndicatorDialog",
    ()=>IndicatorDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * IndicatorDialog — searchable modal for adding/managing indicators.
 * Opens from the TopBar "Indicators" button.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-ssr] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
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
function ParamEditor({ meta, params, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-3 mt-2",
        children: Object.entries(meta.defaultParams).map(([key, def])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-[11px] font-medium text-muted-foreground capitalize",
                        children: key
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        className: "w-20 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500",
                        value: String(params[key] ?? def),
                        onChange: (e)=>onChange(key, Number(e.target.value)),
                        step: typeof def === 'number' && def < 5 ? 0.1 : 1,
                        min: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, key, true, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function ActiveRow({ config, meta }) {
    const { updateIndicator, removeIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [showParams, setShowParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-border bg-surface-elevated px-3 py-2 space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                                style: {
                                    background: config.color ?? meta.defaultColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-foreground truncate",
                                children: meta.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-muted-foreground",
                                children: [
                                    "(",
                                    Object.entries(config.params).map(([, v])=>v).join(', '),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
                                onClick: ()=>setShowParams((s)=>!s),
                                title: "Settings",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
                                onClick: ()=>updateIndicator(config.id, {
                                        visible: !config.visible
                                    }),
                                title: config.visible ? 'Hide' : 'Show',
                                children: config.visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 80,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 80,
                                    columnNumber: 51
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors",
                                onClick: ()=>removeIndicator(config.id),
                                title: "Remove",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            showParams && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParamEditor, {
                meta: meta,
                params: config.params,
                onChange: (key, value)=>updateIndicator(config.id, {
                        params: {
                            ...config.params,
                            [key]: value
                        }
                    })
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
function IndicatorDialog({ open, onClose }) {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { indicators, addIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const allMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].getAllMeta(), []);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = search.toLowerCase();
        return allMeta.filter((m)=>!q || m.label.toLowerCase().includes(q) || m.group.toLowerCase().includes(q));
    }, [
        allMeta,
        search
    ]);
    const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        filtered.forEach((m)=>{
            if (!map.has(m.group)) map.set(m.group, []);
            map.get(m.group).push(m);
        });
        return map;
    }, [
        filtered
    ]);
    const activeIds = new Set(indicators.map((i)=>i.type));
    function handleAdd(meta) {
        const config = {
            id: generateId(),
            type: meta.type,
            params: {
                ...meta.defaultParams
            },
            visible: true,
            paneIndex: meta.category === 'overlay' ? 0 : -1,
            color: meta.defaultColor,
            lineWidth: 1
        };
        addIndicator(config);
    }
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9998] flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[9999] w-full max-w-xl rounded-xl border border-border bg-background shadow-2xl flex flex-col max-h-[80vh]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-semibold text-foreground",
                                children: "Indicators"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    indicators.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-border space-y-1.5 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            indicators.map((config)=>{
                                const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].getMeta(config.type);
                                if (!meta) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveRow, {
                                    config: config,
                                    meta: meta
                                }, config.id, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 172,
                                    columnNumber: 22
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-2.5 border-b border-border flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-muted/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 13,
                                    className: "text-muted-foreground flex-shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "flex-1 text-xs bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground",
                                    placeholder: "Search indicators…",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSearch(''),
                                    className: "text-muted-foreground hover:text-foreground",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto flex-1 p-4 space-y-4",
                        children: grouped.size === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground text-center py-6",
                            children: "No indicators found."
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this) : Array.from(grouped.entries()).map(([group, metas])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5",
                                        children: group
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: metas.map((meta)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-start justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors group', activeIds.has(meta.type) ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-muted/40'),
                                                onClick: ()=>handleAdd(meta),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-2 h-2 rounded-full flex-shrink-0",
                                                                        style: {
                                                                            background: meta.defaultColor
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                        lineNumber: 218,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-foreground",
                                                                        children: meta.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                        lineNumber: 222,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-[10px] px-1.5 py-0.5 rounded font-medium', meta.category === 'overlay' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'),
                                                                        children: meta.category === 'overlay' ? 'Overlay' : 'Sub-pane'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                        lineNumber: 223,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-muted-foreground mt-0.5 pl-4",
                                                                children: meta.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                                lineNumber: 232,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5",
                                                        children: "+ Add"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, meta.type, true, {
                                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                                lineNumber: 206,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, group, true, {
                                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/IndicatorDialog.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/persistence/useChartPersistence.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
const DEBOUNCE_MS = 2000;
function useChartPersistence() {
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const saveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Load saved layouts list ────────────────────────────────────────────────
    const fetchLayouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await fetch('/api/charts/layouts');
            const data = await res.json();
            store.setSavedLayouts(data.layouts ?? []);
        } catch  {
        // silently ignore — layouts are non-critical
        }
    }, [
        store
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchLayouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ── Auto-save drawings debounced ───────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { symbol, timeframe, drawings } = store;
        if (!symbol) return;
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(async ()=>{
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
        }, DEBOUNCE_MS);
        return ()=>{
            if (saveTimer.current) clearTimeout(saveTimer.current);
        };
    // We intentionally only re-run on drawings changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        store.drawings,
        store.symbol,
        store.timeframe
    ]);
    // ── Load drawings when symbol/timeframe changes ────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { symbol, timeframe } = store;
        if (!symbol) return;
        fetch(`/api/charts/drawings/${symbol}/${timeframe}`).then((r)=>r.json()).then((data)=>{
            // Only restore if user hasn't already added drawings in this session
            if (data.drawings?.length && store.drawings.length === 0) {
                data.drawings.forEach((d)=>store.addDrawing(d));
            }
        }).catch(()=>{});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        store.symbol,
        store.timeframe
    ]);
    // ── Manual save / load ─────────────────────────────────────────────────────
    const saveLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name)=>{
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
    }, [
        store,
        fetchLayouts
    ]);
    const loadLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            const res = await fetch(`/api/charts/layouts/${id}`);
            const data = await res.json();
            const layout = data.layout;
            if (!layout) return;
            store.setTimeframe(layout.timeframe);
            store.setChartType(layout.chartType);
            store.clearDrawings();
            // Restore indicators
            layout.indicators.forEach((ind)=>store.addIndicator(ind));
            // Restore drawings
            layout.drawings.forEach((d)=>store.addDrawing(d));
            store.setActiveLayoutId(id);
        } catch  {
        // silently ignore
        }
    }, [
        store
    ]);
    const deleteLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            await fetch(`/api/charts/layouts/${id}`, {
                method: 'DELETE'
            });
            await fetchLayouts();
        } catch  {}
    }, [
        fetchLayouts
    ]);
    return {
        saveLayout,
        loadLayout,
        deleteLayout,
        fetchLayouts
    };
}
}),
"[project]/src/components/charting/widgets/LayoutPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutPanel",
    ()=>LayoutPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * LayoutPanel — collapsible right-side panel for saving/loading named layouts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-ssr] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-ssr] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$persistence$2f$useChartPersistence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/persistence/useChartPersistence.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function LayoutPanel({ symbol }) {
    const { savedLayouts, activeLayoutId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { saveLayout, loadLayout, deleteLayout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$persistence$2f$useChartPersistence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartPersistence"])();
    const [saveName, setSaveName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const symbolLayouts = savedLayouts.filter((l)=>l.symbol === symbol);
    async function handleSave() {
        const name = saveName.trim() || `Layout ${symbolLayouts.length + 1}`;
        setSaving(true);
        await saveLayout(name);
        setSaveName('');
        setSaving(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full p-3 gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                        size: 13,
                        className: "text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-foreground",
                        children: "Saved Layouts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "flex-1 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500 placeholder:text-muted-foreground",
                        placeholder: "Layout name…",
                        value: saveName,
                        onChange: (e)=>setSaveName(e.target.value),
                        onKeyDown: (e)=>e.key === 'Enter' && handleSave()
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: saving,
                        className: "flex items-center gap-1 px-2 h-7 rounded text-[11px] bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25 transition-colors disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            saving ? '…' : 'Save'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto space-y-1",
                children: symbolLayouts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-muted-foreground text-center py-4",
                    children: [
                        "No saved layouts for ",
                        symbol
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this) : symbolLayouts.map((layout)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border transition-colors group', activeLayoutId === layout.id ? 'border-amber-500/40 bg-amber-500/10' : 'border-border hover:border-border/80 hover:bg-muted/30'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-foreground truncate",
                                        children: layout.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-muted-foreground",
                                        children: [
                                            layout.timeframe,
                                            " · ",
                                            layout.indicators.length,
                                            " indicators"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>loadLayout(layout.id),
                                        className: "p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                                        title: "Load layout",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                            size: 11
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteLayout(layout.id),
                                        className: "p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500",
                                        title: "Delete layout",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 11
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        ]
                    }, layout.id, true, {
                        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/LayoutPanel.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/ChartContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartContainer",
    ()=>ChartContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/ChartEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/PaneManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/SeriesManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$DrawingManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/drawings/DrawingManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/data/useChartData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/indicators/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/TopBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/DrawingToolbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DataWindow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/DataWindow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/IndicatorDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$LayoutPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/LayoutPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/core/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
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
;
;
;
;
;
;
/**
 * Inner chart content — decoupled so it can be rendered
 * both inside the page and inside a portal.
 */ function ChartContent({ symbol, currentPrice, priceChange, fullscreenMode = false, embeddedPanel = false, workspaceMode = false, minimalPanel = false, panelNumber }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$ChartEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartEngine"]());
    const pmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const smRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeInds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [showIndDialog, setShowIndDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [crosshair, setCrosshair] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paneRects, setPaneRects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [watchlistConfig, setWatchlistConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST_CONFIG"]);
    const { appearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const { timeframe, chartType, isDark, indicators, drawings, activeTool, addDrawing, updateDrawing, removeDrawing, showLayoutPanel, showWatchlist, removeIndicator } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const { bars, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$data$2f$useChartData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartData"])(symbol, timeframe);
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChartTheme"])(isDark ? 'dark' : 'light', appearance.chartContrast), [
        appearance.chartContrast,
        isDark
    ]);
    const hasBars = bars.length > 0;
    const watchlistWidth = showWatchlist ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWatchlistPanelWidth"])(watchlistConfig) : 0;
    // ── 1. Initialise chart engine ────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = canvasRef.current;
        if (!container) return;
        const engine = engineRef.current;
        const indicatorRegistry = activeInds.current;
        const chart = engine.init(container, theme);
        pmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$PaneManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaneManager"](chart);
        smRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$core$2f$SeriesManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SeriesManager"](chart);
        // Subscribe to crosshair
        const unsub = engine.subscribeCrosshair((data)=>{
            setCrosshair(data);
        });
        return ()=>{
            unsub();
            dmRef.current?.destroy();
            dmRef.current = null;
            engine.destroy();
            pmRef.current = null;
            smRef.current = null;
            indicatorRegistry.clear();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // ── 2. Apply theme changes ────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        engineRef.current.applyTheme(theme);
    }, [
        theme
    ]);
    // ── 3. Render main series when bars or chart type changes ─────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sm = smRef.current;
        const engine = engineRef.current;
        if (!sm || !engine.isInitialised || bars.length === 0) return;
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
            priceScaleId: 'volume'
        });
        // Position volume at the bottom 10% of the chart
        engine.api.priceScale('volume').applyOptions({
            scaleMargins: {
                top: 0.9,
                bottom: 0
            }
        });
        sm.setVolumeData('volume', bars, th.volumeUpColor, th.volumeDownColor);
        engine.fitContent();
    }, [
        bars,
        chartType,
        isDark,
        theme
    ]);
    // ── 4. Init DrawingManager once after main series exists ──────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sm = smRef.current;
        const engine = engineRef.current;
        const container = canvasRef.current;
        if (!hasBars || !sm || !engine.isInitialised || !container || dmRef.current) return;
        const mainSeries = sm.get('main');
        if (!mainSeries) return;
        dmRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$drawings$2f$DrawingManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DrawingManager"](engine.api, mainSeries.api, container, (d)=>addDrawing(d), (id, patch)=>updateDrawing(id, patch), (id)=>removeDrawing(id));
        // Restore existing drawings from store
        if (drawings.length > 0) {
            dmRef.current.restoreDrawings(drawings);
        }
        // Apply current tool
        if (activeTool) dmRef.current.setTool(activeTool);
    }, [
        activeTool,
        addDrawing,
        drawings,
        hasBars,
        removeDrawing,
        updateDrawing
    ]);
    // ── 4a. Sync active drawing tool to DrawingManager ───────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dmRef.current && activeTool !== null) {
            dmRef.current.setTool(activeTool);
        }
    }, [
        activeTool
    ]);
    // ── 4b. Sync clear drawings ───────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (drawings.length === 0 && dmRef.current) {
            dmRef.current.clearAll();
        }
    }, [
        drawings.length
    ]);
    // ── 5. Sync indicators (add new / remove deleted) ─────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sm = smRef.current;
        const pm = pmRef.current;
        if (!sm || !pm) return;
        const th = theme;
        const currentIds = new Set(indicators.map((c)=>c.id));
        // Remove detached indicators
        activeInds.current.forEach((ind, id)=>{
            if (!currentIds.has(id)) {
                ind.detach();
                activeInds.current.delete(id);
            }
        });
        // Add new indicators
        indicators.forEach((config)=>{
            if (!activeInds.current.has(config.id)) {
                try {
                    const ind = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$indicators$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_REGISTRY"].create(config);
                    ind.attach(sm, pm, th);
                    if (bars.length > 0) ind.updateData(bars);
                    activeInds.current.set(config.id, ind);
                } catch (e) {
                    console.warn('Failed to attach indicator', config.type, e);
                }
            }
        });
        // Update data for all active indicators when bars change
        if (bars.length > 0) {
            activeInds.current.forEach((ind)=>ind.updateData(bars));
        }
        // Sync visibility
        indicators.forEach((config)=>{
            activeInds.current.get(config.id)?.setVisible(config.visible);
        });
        // We delay slightly to allow lightweight-charts to finish rendering panes
        setTimeout(()=>{
            if (pmRef.current) {
                setPaneRects(pmRef.current.getPaneRects());
            }
        }, 50);
    }, [
        bars,
        indicators,
        theme
    ]);
    // ── 5. Screenshot ────────────────────────────────────────────────────────
    const handleScreenshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const container = canvasRef.current;
        if (!container) return;
        try {
            const { default: html2canvas } = await __turbopack_context__.A("[project]/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript, async loader)");
            const canvas = await html2canvas(container, {
                useCORS: true,
                scale: 2
            });
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = `${symbol}_${timeframe}_chart.png`;
            a.click();
        } catch (e) {
            console.error('Screenshot failed', e);
        }
    }, [
        symbol,
        timeframe
    ]);
    // ── Render ────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full overflow-hidden bg-background",
        style: {
            background: theme.background
        },
        children: [
            !minimalPanel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopBar"], {
                symbol: symbol,
                currentPrice: currentPrice,
                priceChange: priceChange,
                onIndicatorsClick: ()=>setShowIndDialog(true),
                onScreenshot: handleScreenshot,
                fullscreenMode: fullscreenMode,
                embeddedPanel: embeddedPanel,
                workspaceMode: workspaceMode,
                panelNumber: panelNumber,
                watchlistConfig: watchlistConfig,
                onWatchlistConfigChange: setWatchlistConfig
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 317,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-1 min-h-0 overflow-hidden",
                children: [
                    !minimalPanel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DrawingToolbar"], {}, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 335,
                        columnNumber: 26
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 min-w-0 min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: canvasRef,
                                className: "w-full h-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-background/60 z-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 28,
                                    className: "animate-spin text-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this),
                            error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-background/80 z-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-rose-400",
                                    children: [
                                        "Failed to load chart data: ",
                                        error
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DataWindow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataWindow"], {
                                    bar: crosshair?.bar ?? null,
                                    seriesData: crosshair?.seriesData
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            paneRects.filter((p)=>p.index > 0).map((pane)=>{
                                const paneIndicators = pane.indicators.map((id)=>activeInds.current.get(id)).filter(Boolean);
                                if (paneIndicators.length === 0) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-2 z-10 flex items-center gap-4 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-border/50 text-[11px] font-mono",
                                    style: {
                                        top: pane.top + 8
                                    },
                                    children: paneIndicators.map((ind)=>{
                                        const entries = smRef.current?.getByIndicator(ind.id) || [];
                                        let valStr = '—';
                                        if (crosshair?.seriesData) {
                                            for (const entry of entries){
                                                const data = crosshair.seriesData.get(entry.api);
                                                if (data && typeof data === 'object' && 'value' in data && typeof data.value === 'number') {
                                                    valStr = data.value.toFixed(2);
                                                    break;
                                                }
                                            }
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-foreground",
                                                    children: ind.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground mr-1",
                                                    children: valStr
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeIndicator(ind.id),
                                                    className: "text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                                    title: "Remove Indicator",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, ind.id, true, {
                                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                            lineNumber: 393,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, pane.id, false, {
                                    fileName: "[project]/src/components/charting/ChartContainer.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    !minimalPanel && showLayoutPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-56 border-l border-border flex-shrink-0 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$LayoutPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayoutPanel"], {
                            symbol: symbol
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 413,
                        columnNumber: 11
                    }, this),
                    !minimalPanel && showWatchlist ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        style: {
                            width: `${watchlistWidth}px`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 418,
                        columnNumber: 43
                    }, this) : null,
                    !minimalPanel && showWatchlist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-0 bottom-0 z-30 flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
                            config: watchlistConfig,
                            onConfigChange: setWatchlistConfig
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/ChartContainer.tsx",
                            lineNumber: 423,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/ChartContainer.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            !minimalPanel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorDialog"], {
                open: showIndDialog,
                onClose: ()=>setShowIndDialog(false)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 429,
                columnNumber: 24
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/ChartContainer.tsx",
        lineNumber: 314,
        columnNumber: 5
    }, this);
}
function ChartContainer(props) {
    const { fullscreenMode = false } = props;
    const { isFullscreen, toggleFullscreen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])();
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(()=>()=>{}, ()=>true, ()=>false);
    // Keyboard shortcut: Escape closes fullscreen
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isFullscreen) return;
        const handler = (e)=>{
            if (e.key === 'Escape') toggleFullscreen();
        };
        window.addEventListener('keydown', handler);
        return ()=>window.removeEventListener('keydown', handler);
    }, [
        isFullscreen,
        toggleFullscreen
    ]);
    if (mounted && (isFullscreen && mounted || fullscreenMode)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[9997] flex flex-col bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContent, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/charting/ChartContainer.tsx",
                lineNumber: 458,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/ChartContainer.tsx",
            lineNumber: 457,
            columnNumber: 7
        }, this), document.body);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContent, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/charting/ChartContainer.tsx",
            lineNumber: 466,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/charting/ChartContainer.tsx",
        lineNumber: 465,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/workspace-layouts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WORKSPACE_LAYOUT_OPTIONS",
    ()=>WORKSPACE_LAYOUT_OPTIONS,
    "WORKSPACE_LAYOUT_STORAGE_KEY",
    ()=>WORKSPACE_LAYOUT_STORAGE_KEY,
    "getWorkspaceLayout",
    ()=>getWorkspaceLayout,
    "isWorkspaceLayout",
    ()=>isWorkspaceLayout
]);
const WORKSPACE_LAYOUT_STORAGE_KEY = 'artha.chart.workspaceLayout';
const WORKSPACE_LAYOUT_OPTIONS = [
    {
        id: 'single',
        label: 'Single chart',
        shortLabel: '1-up',
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
        shortLabel: '2-up',
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
        shortLabel: '4-up',
        description: 'Balanced 2 x 2 grid',
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
        shortLabel: '9-up',
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
        shortLabel: 'Focus',
        description: 'Primary chart with two smaller charts below',
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
function getWorkspaceLayout(layout) {
    return WORKSPACE_LAYOUT_OPTIONS.find((option)=>option.id === layout) ?? WORKSPACE_LAYOUT_OPTIONS[0];
}
function isWorkspaceLayout(value) {
    return WORKSPACE_LAYOUT_OPTIONS.some((option)=>option.id === value);
}
}),
"[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkspaceLayoutPicker",
    ()=>WorkspaceLayoutPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-ssr] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/workspace-layouts.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function LayoutPreview({ layoutId }) {
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspaceLayout"])(layoutId);
    const previewClassName = {
        single: 'grid-cols-1 grid-rows-1',
        'two-up': 'grid-cols-2 grid-rows-1',
        quad: 'grid-cols-2 grid-rows-2',
        nine: 'grid-cols-3 grid-rows-3',
        'hero-bottom': 'grid-cols-2 grid-rows-[1.5fr_1fr]'
    }[layoutId];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('grid h-9 w-11 gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-app)] p-1', previewClassName),
        children: layout.cells.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-[3px] border border-[var(--border)] bg-[var(--bg-card)]', layoutId === 'hero-bottom' && cell.key === 'hero' ? 'col-span-2' : null)
            }, cell.key, false, {
                fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
function WorkspaceLayoutPicker({ value, onChange }) {
    const activeLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspaceLayout"])(value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: value === 'single' ? 'outline' : 'selected',
                    size: "sm",
                    className: "gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden sm:inline",
                            children: activeLayout.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "rounded-full bg-[var(--brand-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-primary)]",
                            children: activeLayout.panelCount
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 14,
                            className: "text-[var(--text-muted)]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: "w-[22rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                        children: "Chart layouts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WORKSPACE_LAYOUT_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                            onClick: ()=>onChange(option.id),
                            className: "items-start gap-3 rounded-md px-3 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutPreview, {
                                    layoutId: option.id
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-[var(--text-primary)]",
                                                            children: option.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-[var(--bg-hover)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]",
                                                            children: option.shortLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                                            lineNumber: 79,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 17
                                                }, this),
                                                value === option.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    size: 14,
                                                    className: "text-[var(--brand-primary)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 40
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-xs text-[var(--text-secondary)]",
                                            children: option.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, option.id, true, {
                            fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/charting/MultiChartWorkspace.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MultiChartWorkspace",
    ()=>MultiChartWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$ChartContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/ChartContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/workspace-layouts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WorkspaceLayoutPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WorkspaceLayoutPicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/TopBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/IndicatorDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/DrawingToolbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-ssr] (ecmascript)");
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
function MultiChartWorkspace({ symbol, initialLayout = 'single' }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLayout);
    const [showIndDialog, setShowIndDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [watchlistConfig, setWatchlistConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST_CONFIG"]);
    const showWatchlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartStore"])((state)=>state.showWatchlist);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialLayout !== 'single') return;
        const saved = globalThis.window?.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WORKSPACE_LAYOUT_STORAGE_KEY"]);
        if (saved && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWorkspaceLayout"])(saved)) {
            setLayout(saved);
        }
    }, [
        initialLayout
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        globalThis.window?.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WORKSPACE_LAYOUT_STORAGE_KEY"], layout);
        const query = layout === 'single' ? '' : `?layout=${layout}`;
        router.replace(`${pathname}${query}`, {
            scroll: false
        });
    }, [
        layout,
        pathname,
        router
    ]);
    const activeLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$workspace$2d$layouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspaceLayout"])(layout), [
        layout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen min-h-screen flex-col overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopBar"], {
                symbol: symbol,
                onIndicatorsClick: ()=>setShowIndDialog(true),
                workspaceMode: true,
                multiChartMode: true,
                watchlistConfig: watchlistConfig,
                onWatchlistConfigChange: setWatchlistConfig,
                extraControls: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WorkspaceLayoutPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WorkspaceLayoutPicker"], {
                    value: layout,
                    onChange: setLayout
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                    lineNumber: 62,
                    columnNumber: 24
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1 overflow-hidden p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$DrawingToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DrawingToolbar"], {}, void 0, false, {
                        fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-0 min-w-0 flex-1 pl-3",
                        children: activeLayout.panelCount === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$ChartContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartContainer"], {
                                symbol: symbol,
                                minimalPanel: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('grid h-full min-h-0 gap-3', activeLayout.gridClassName),
                            children: activeLayout.cells.map((cell, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative min-h-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm', cell.className),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg-card)_82%,transparent)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-[var(--text-secondary)] backdrop-blur-sm",
                                            children: [
                                                "PANEL ",
                                                index + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$ChartContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartContainer"], {
                                            symbol: symbol,
                                            minimalPanel: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, cell.key, true, {
                                    fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                                    lineNumber: 76,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    showWatchlist ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-3 flex min-h-0 flex-shrink-0 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
                            config: watchlistConfig,
                            onConfigChange: setWatchlistConfig,
                            onSymbolSelect: (nextSymbol)=>{
                                const query = layout === 'single' ? '' : `?layout=${layout}`;
                                router.push(`/stocks/${encodeURIComponent(nextSymbol)}/chart${query}`);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$IndicatorDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorDialog"], {
                open: showIndDialog,
                onClose: ()=>setShowIndDialog(false)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/charting/MultiChartWorkspace.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0df5a6e7._.js.map