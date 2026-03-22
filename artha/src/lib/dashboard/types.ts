/**
 * Dashboard & Widget type definitions
 */

export type WidgetType =
  | 'table'
  | 'pie'
  | 'bar'
  | 'horizontal_bar'
  | 'line'
  | 'area'
  | 'heatmap'
  | 'metric';

// ── Column definition ─────────────────────────────────────────────────────────

export interface WidgetColumn {
  id: string;
  label: string;
  dslName: string;
  dbColumn?: string;
  aggregation?: 'none' | 'sum' | 'avg' | 'min' | 'max' | 'count';
  format?: 'number' | 'percent' | 'currency' | 'text';
  width?: number;
  colorCode?: boolean;
}

// ── Chart config ──────────────────────────────────────────────────────────────

export interface ChartConfig {
  xAxis?: string;
  yAxis?: string;
  colorField?: string;
  sizeField?: string;
  multiYAxis?: boolean;
  transpose?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  donut?: boolean;
}

// ── Widget config (stored as config_json in DB) ───────────────────────────────

export interface WidgetConfig {
  columns: WidgetColumn[];
  filters: Record<string, unknown>;
  groupColumn?: string | null;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  dataPerSymbol?: number;
  chartConfig?: ChartConfig;
  refreshInterval?: number | null;
  // metric widget only
  metricColumn?: string;
  metricLabel?: string;
  metricPrefix?: string;
  metricSuffix?: string;
}

// ── Grid layout item ──────────────────────────────────────────────────────────

export interface GridLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

// ── Widget DB row ─────────────────────────────────────────────────────────────

export interface UserWidget {
  id: string;
  dashboard_id: string;
  widget_type: WidgetType;
  title: string;
  config_json: WidgetConfig;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── Dashboard DB row ──────────────────────────────────────────────────────────

export interface UserDashboard {
  id: string;
  user_id: string;
  name: string;
  is_default: boolean;
  layout_json: GridLayoutItem[];
  widgets?: UserWidget[];
  created_at: string;
  updated_at: string;
}

// ── Dashboard summary (list view) ────────────────────────────────────────────

export interface DashboardSummary {
  id: string;
  name: string;
  is_default: boolean;
  widget_count: number;
  updated_at: string;
}

// ── Widget query request/response ─────────────────────────────────────────────

export interface WidgetQueryRequest {
  config: WidgetConfig;
  widget_type: WidgetType;
}

export interface WidgetQueryResponse {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  total: number;
  cached?: boolean;
}

// ── Preset widget definition ──────────────────────────────────────────────────

export interface PresetWidget {
  id: string;
  name: string;
  description: string;
  widget_type: WidgetType;
  category: string;
  defaultLayout: { w: number; h: number };
  config: WidgetConfig;
}
