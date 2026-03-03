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
 */

import type { SeriesManager } from '../core/SeriesManager';
import type { PaneManager } from '../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../core/types';
import type { LineData, HistogramData } from 'lightweight-charts';

export interface ComputeResult {
  seriesId: string;
  data: LineData[] | HistogramData[];
}

export abstract class IndicatorBase {
  protected _config: IndicatorConfig;
  protected _sm: SeriesManager | null = null;
  protected _pm: PaneManager | null = null;
  protected _theme: ChartTheme | null = null;
  protected _ownedPaneId: string | null = null; // null → overlay on main pane
  protected _seriesIds: string[] = [];

  constructor(config: IndicatorConfig) {
    this._config = { ...config };
  }

  // ── Accessors ──────────────────────────────────────────────────────────────

  get id(): string { return this._config.id; }
  get type(): string { return this._config.type; }
  get config(): IndicatorConfig { return this._config; }

  // ── Abstract API (subclasses must implement) ───────────────────────────────

  /** Human-readable label for the indicator, e.g. "SMA (20)". */
  abstract get label(): string;

  /** Default params object for this indicator type. */
  abstract get defaultParams(): Record<string, number | string | boolean>;

  /**
   * Pure computation function.
   * Given OHLCV bars, returns one or more named data series.
   */
  abstract compute(bars: OHLCVBar[]): ComputeResult[];

  /**
   * Add the required series to the chart.
   * Called once after construction. Must populate this._seriesIds.
   */
  abstract attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void;

  // ── Shared lifecycle ───────────────────────────────────────────────────────

  /** Update series data after a bar change or param change. */
  updateData(bars: OHLCVBar[]): void {
    if (!this._sm) return;
    const results = this.compute(bars);
    results.forEach(r => {
      const entry = this._sm!.get(r.seriesId);
      if (!entry) return;
      if (entry.kind === 'histogram') {
        this._sm!.setHistogramData(r.seriesId, r.data as HistogramData[]);
      } else {
        this._sm!.setLineData(r.seriesId, r.data as LineData[]);
      }
    });
  }

  /** Remove all owned series and optionally the sub-pane. */
  detach(): void {
    this._seriesIds.forEach(id => this._sm?.remove(id));
    this._seriesIds = [];

    if (this._ownedPaneId) {
      this._pm?.removePane(this._ownedPaneId);
      this._ownedPaneId = null;
    }

    this._sm = null;
    this._pm = null;
  }

  /** Update config params and recompute if attached. */
  updateConfig(patch: Partial<IndicatorConfig>, bars?: OHLCVBar[]): void {
    this._config = { ...this._config, ...patch };
    if (bars && this._sm) this.updateData(bars);
  }

  /** Toggle visibility of all owned series. */
  setVisible(visible: boolean): void {
    this._seriesIds.forEach(id => this._sm?.setVisible(id, visible));
    this._config.visible = visible;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Returns the pane index this indicator lives in. */
  protected get paneIndex(): number {
    if (this._ownedPaneId) return this._pm?.getPaneIndex(this._ownedPaneId) ?? 1;
    return 0; // overlay on main pane
  }

  protected param<T extends number | string | boolean>(key: string, fallback: T): T {
    const v = this._config.params[key];
    return (v !== undefined ? v : fallback) as T;
  }

  protected timeToLwcTime(unix: number): import('lightweight-charts').Time {
    return unix as unknown as import('lightweight-charts').Time;
  }
}
