/**
 * useChartStore — Zustand store for all chart UI state.
 *
 * Keeps: active timeframe, chart type, indicator configs, drawing state,
 * active tool, layout metadata, and fullscreen flag.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  Timeframe,
  ChartType,
  IndicatorConfig,
  DrawingData,
  DrawingToolType,
  ChartAlert,
  LayoutState,
} from '../core/types';

export interface ChartStore {
  // ── Chart settings ───────────────────────────────────────────────────────
  symbol: string;
  timeframe: Timeframe;
  chartType: ChartType;
  isDark: boolean;
  isFullscreen: boolean;

  // ── Indicators ───────────────────────────────────────────────────────────
  indicators: IndicatorConfig[];

  // ── Drawings ─────────────────────────────────────────────────────────────
  drawings: DrawingData[];
  activeTool: DrawingToolType | 'cursor' | null;

  // ── Alerts ───────────────────────────────────────────────────────────────
  alerts: ChartAlert[];

  // ── Layout persistence ───────────────────────────────────────────────────
  savedLayouts: LayoutState[];
  activeLayoutId: string | null;

  // ── UI visibility ────────────────────────────────────────────────────────
  showDataWindow: boolean;
  showWatchlist: boolean;
  showLayoutPanel: boolean;

  // ── Actions ──────────────────────────────────────────────────────────────
  setSymbol: (symbol: string) => void;
  setTimeframe: (tf: Timeframe) => void;
  setChartType: (type: ChartType) => void;
  toggleDark: () => void;
  toggleFullscreen: () => void;

  addIndicator: (config: IndicatorConfig) => void;
  updateIndicator: (id: string, patch: Partial<IndicatorConfig>) => void;
  removeIndicator: (id: string) => void;

  addDrawing: (drawing: DrawingData) => void;
  updateDrawing: (id: string, patch: Partial<DrawingData>) => void;
  removeDrawing: (id: string) => void;
  clearDrawings: () => void;
  setActiveTool: (tool: DrawingToolType | 'cursor' | null) => void;

  addAlert: (alert: ChartAlert) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;

  setSavedLayouts: (layouts: LayoutState[]) => void;
  setActiveLayoutId: (id: string | null) => void;

  toggleDataWindow: () => void;
  toggleWatchlist: () => void;
  toggleLayoutPanel: () => void;

  /** Reset all state for a new symbol (keeps UI preferences). */
  resetForSymbol: (symbol: string) => void;
}

export const useChartStore = create<ChartStore>()(
  subscribeWithSelector((set, get) => ({
    // ── Defaults ────────────────────────────────────────────────────────────
    symbol:          '',
    timeframe:       '1D',
    chartType:       'candlestick',
    isDark:          false,
    isFullscreen:    false,

    indicators:      [],
    drawings:        [],
    activeTool:      'cursor',
    alerts:          [],

    savedLayouts:    [],
    activeLayoutId:  null,

    showDataWindow:  true,
    showWatchlist:   false,
    showLayoutPanel: false,

    // ── Actions ─────────────────────────────────────────────────────────────
    setSymbol:    (symbol)  => set({ symbol }),
    setTimeframe: (tf)      => set({ timeframe: tf }),
    setChartType: (type)    => set({ chartType: type }),
    toggleDark:   ()        => set(s => ({ isDark: !s.isDark })),
    toggleFullscreen: ()    => set(s => ({ isFullscreen: !s.isFullscreen })),

    addIndicator: (config) =>
      set(s => ({ indicators: [...s.indicators, config] })),

    updateIndicator: (id, patch) =>
      set(s => ({
        indicators: s.indicators.map(ind =>
          ind.id === id ? { ...ind, ...patch } : ind
        ),
      })),

    removeIndicator: (id) =>
      set(s => ({ indicators: s.indicators.filter(ind => ind.id !== id) })),

    addDrawing: (drawing) =>
      set(s => ({ drawings: [...s.drawings, drawing] })),

    updateDrawing: (id, patch) =>
      set(s => ({
        drawings: s.drawings.map(d => d.id === id ? { ...d, ...patch } : d),
      })),

    removeDrawing: (id) =>
      set(s => ({ drawings: s.drawings.filter(d => d.id !== id) })),

    clearDrawings: () => set({ drawings: [] }),

    setActiveTool: (tool) => set({ activeTool: tool }),

    addAlert: (alert) =>
      set(s => ({ alerts: [...s.alerts, alert] })),

    removeAlert: (id) =>
      set(s => ({ alerts: s.alerts.filter(a => a.id !== id) })),

    toggleAlert: (id) =>
      set(s => ({
        alerts: s.alerts.map(a => a.id === id ? { ...a, active: !a.active } : a),
      })),

    setSavedLayouts: (layouts) => set({ savedLayouts: layouts }),
    setActiveLayoutId: (id)    => set({ activeLayoutId: id }),

    toggleDataWindow:  () => set(s => ({ showDataWindow:  !s.showDataWindow })),
    toggleWatchlist:   () => set(s => ({ showWatchlist:   !s.showWatchlist })),
    toggleLayoutPanel: () => set(s => ({ showLayoutPanel: !s.showLayoutPanel })),

    resetForSymbol: (symbol) => {
      const { isDark, isFullscreen, showDataWindow, showWatchlist } = get();
      set({
        symbol,
        indicators:     [],
        drawings:       [],
        activeTool:     'cursor',
        alerts:         [],
        activeLayoutId: null,
        isDark, isFullscreen, showDataWindow, showWatchlist,
      });
    },
  }))
);
