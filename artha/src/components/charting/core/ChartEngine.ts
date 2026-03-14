/**
 * ChartEngine — thin wrapper around lightweight-charts v5 IChartApi.
 *
 * Responsibilities:
 *  - Create and destroy the chart instance
 *  - Apply and update theme (light/dark)
 *  - Handle container resize via ResizeObserver
 *  - Expose the raw IChartApi for PaneManager and SeriesManager
 *  - Emit crosshair events to subscribers
 */

import {
  createChart,
  CrosshairMode,
  type IChartApi,
  type DeepPartial,
  type ChartOptions,
} from 'lightweight-charts';
import type { ChartTheme, CrosshairData, OHLCVBar } from './types';
import { LIGHT_THEME } from './types';

type CrosshairSubscriber = (data: CrosshairData) => void;

export class ChartEngine {
  private _chart: IChartApi | null = null;
  private _container: HTMLElement | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _crosshairSubs: Set<CrosshairSubscriber> = new Set();
  private _theme: ChartTheme = LIGHT_THEME;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  /** Initialise the chart into the given DOM container. */
  init(container: HTMLElement, theme: ChartTheme = LIGHT_THEME): IChartApi {
    if (this._chart) this.destroy();

    this._container = container;
    this._theme = theme;

    this._chart = createChart(container, this._buildOptions(this._theme));

    // Crosshair events
    this._chart.subscribeCrosshairMove((param) => {
      const bar = param.seriesData.size > 0
        ? (Array.from(param.seriesData.values())[0] as OHLCVBar)
        : null;

      const data: CrosshairData = {
        time: param.time != null ? (param.time as number) : null,
        bar,
        seriesData: param.seriesData,
        x: param.point?.x ?? 0,
        y: param.point?.y ?? 0,
      };

      this._crosshairSubs.forEach(fn => fn(data));
    });

    // Resize observer — keeps chart filling its container
    this._resizeObserver = new ResizeObserver(() => {
      if (this._chart && this._container) {
        this._chart.applyOptions({
          width:  this._container.clientWidth,
          height: this._container.clientHeight,
        });
      }
    });
    this._resizeObserver.observe(container);

    return this._chart;
  }

  /** Destroy the chart and clean up observers. */
  destroy(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._chart?.remove();
    this._chart = null;
    this._container = null;
    this._crosshairSubs.clear();
  }

  // ── Accessors ──────────────────────────────────────────────────────────────

  get api(): IChartApi {
    if (!this._chart) throw new Error('ChartEngine: chart not initialised — call init() first.');
    return this._chart;
  }

  get isInitialised(): boolean {
    return this._chart !== null;
  }

  get theme(): ChartTheme {
    return this._theme;
  }

  // ── Theme ──────────────────────────────────────────────────────────────────

  /** Switch between light and dark themes at runtime. */
  applyTheme(theme: ChartTheme): void {
    this._theme = theme;
    this._chart?.applyOptions(this._buildOptions(this._theme));
  }

  // ── Crosshair subscriptions ────────────────────────────────────────────────

  subscribeCrosshair(fn: CrosshairSubscriber): () => void {
    this._crosshairSubs.add(fn);
    return () => this._crosshairSubs.delete(fn);
  }

  // ── Time-scale helpers ─────────────────────────────────────────────────────

  fitContent(): void {
    this._chart?.timeScale().fitContent();
  }

  scrollToRealtime(): void {
    this._chart?.timeScale().scrollToRealTime();
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private _buildOptions(theme: ChartTheme): DeepPartial<ChartOptions> {
    return {
      autoSize: false,
      layout: {
        background: { color: theme.background },
        textColor:  theme.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize:   11,
      },
      grid: {
        vertLines: { color: theme.grid, visible: true },
        horzLines: { color: theme.grid, style: 0 },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color:         theme.crosshairColor,
          labelBackgroundColor: theme.background,
        },
        horzLine: {
          color:         theme.crosshairColor,
          labelBackgroundColor: theme.background,
        },
      },
      rightPriceScale: {
        borderColor: theme.border,
        scaleMargins: { top: 0.1, bottom: 0.1 },
        ticksVisible: true,
        entireTextOnly: false,
      },
      localization: {
        priceFormatter: (price: number) => {
          const absPrice = Math.abs(price);
          if (absPrice >= 1e7) return `₹${(price / 1e7).toFixed(2)}Cr`;
          if (absPrice >= 1e5) return `₹${(price / 1e5).toFixed(2)}L`;
          if (absPrice >= 1e3) return `₹${(price / 1e3).toFixed(1)}K`;
          return `₹${price.toFixed(2)}`;
        },
      },
      timeScale: {
        borderColor:       theme.border,
        timeVisible:       true,
        secondsVisible:    false,
        shiftVisibleRangeOnNewBar: true,
      },
    };
  }
}
