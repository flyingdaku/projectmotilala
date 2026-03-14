/**
 * Core type definitions for the Artha Charting Engine.
 * All shared types, enums, and interfaces live here.
 */

// ── Timeframe ─────────────────────────────────────────────────────────────────

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1D' | '1W' | '1M';

export const TIMEFRAMES: { value: Timeframe; label: string; seconds: number }[] = [
  { value: '1m',  label: '1m',  seconds: 60 },
  { value: '5m',  label: '5m',  seconds: 300 },
  { value: '15m', label: '15m', seconds: 900 },
  { value: '30m', label: '30m', seconds: 1800 },
  { value: '1h',  label: '1H',  seconds: 3600 },
  { value: '4h',  label: '4H',  seconds: 14400 },
  { value: '1D',  label: '1D',  seconds: 86400 },
  { value: '1W',  label: '1W',  seconds: 604800 },
  { value: '1M',  label: '1M',  seconds: 2592000 },
];

// ── Chart Type ────────────────────────────────────────────────────────────────

export type ChartType = 'candlestick' | 'ohlc' | 'line' | 'area' | 'bar';

// ── OHLCV Bar (aligned with PriceBar from data/types.ts) ────────────────────

export interface OHLCVBar {
  time: number;         // Unix timestamp (seconds)
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// ── Indicator Config ──────────────────────────────────────────────────────────

export interface IndicatorConfig {
  id: string;           // Unique instance id (UUID)
  type: string;         // Indicator registry key e.g. 'SMA', 'RSI'
  params: Record<string, number | string | boolean>;
  visible: boolean;
  paneIndex: number;    // 0 = main pane, 1+ = sub-panes
  color?: string;
  lineWidth?: number;
}

// ── Drawing Data ──────────────────────────────────────────────────────────────

export type DrawingToolType =
  | 'trendline'
  | 'horzline'
  | 'vertline'
  | 'rectangle'
  | 'fibretrace'
  | 'channel'
  | 'text'
  | 'arrow'
  | 'brush'
  | 'measure';

export interface DrawingPoint {
  time: number;         // Unix timestamp
  price: number;
}

export interface DrawingStyle {
  color?: string;
  lineWidth?: number;
  dashed?: boolean;
  fillColor?: string;
  opacity?: number;
}

export interface DrawingData {
  id: string;           // UUID
  type: DrawingToolType;
  points: DrawingPoint[];
  style?: DrawingStyle;
  text?: string;
  visible?: boolean;
  locked?: boolean;
}

// ── Alert ─────────────────────────────────────────────────────────────────────

export type AlertDirection = 'above' | 'below';

export interface ChartAlert {
  id: string;
  symbol: string;
  price: number;
  direction: AlertDirection;
  active: boolean;
  note?: string;
  createdAt: string;
}

// ── Pane State ────────────────────────────────────────────────────────────────

export interface PaneState {
  id: string;
  index: number;
  height: number;       // pixels
  indicators: string[]; // indicator config ids in this pane
}

// ── Layout State (full serialisable snapshot) ─────────────────────────────────

export interface LayoutState {
  id?: string;
  name: string;
  symbol: string;
  timeframe: Timeframe;
  chartType: ChartType;
  panes: PaneState[];
  indicators: IndicatorConfig[];
  drawings: DrawingData[];
  alerts: ChartAlert[];
  priceScaleAutoScale: boolean;
  timeRangeFrom?: number;
  timeRangeTo?: number;
  updatedAt?: string;
}

// ── Chart Config (init options) ───────────────────────────────────────────────

export interface ChartTheme {
  background: string;
  text: string;
  grid: string;
  border: string;
  upColor: string;
  downColor: string;
  wickUpColor: string;
  wickDownColor: string;
  volumeUpColor: string;
  volumeDownColor: string;
  crosshairColor: string;
  areaFillColor: string;
}

export type ChartContrastMode = 'balanced' | 'vivid';

export function getChartTheme(
  mode: 'light' | 'dark',
  contrast: ChartContrastMode = 'balanced'
): ChartTheme {
  const isDark = mode === 'dark';
  const fillOpacity = contrast === 'vivid'
    ? (isDark ? 0.15 : 0.12)
    : (isDark ? 0.10 : 0.07);

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
    areaFillColor: isDark
      ? `rgba(59,130,246,${fillOpacity})`
      : `rgba(67,56,202,${fillOpacity})`,
  };
}

export const LIGHT_THEME: ChartTheme = getChartTheme('light');

export const DARK_THEME: ChartTheme = getChartTheme('dark');

// ── Crosshair Data (emitted on mouse move) ────────────────────────────────────

export interface CrosshairData {
  time: number | null;
  bar: OHLCVBar | null;
  seriesData: Map<unknown, unknown>;
  x: number;
  y: number;
}

// ── Series Type Enum ──────────────────────────────────────────────────────────

export type SeriesKind = 'candlestick' | 'ohlc' | 'line' | 'area' | 'histogram' | 'bar';

export interface SeriesEntry {
  id: string;
  kind: SeriesKind;
  paneIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api: any; // ISeriesApi — kept as any to avoid importing lwc types in shared types
  indicatorId?: string;
}
