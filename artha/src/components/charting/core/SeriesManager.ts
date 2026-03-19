/**
 * SeriesManager — tracks all series on the chart keyed by UUID.
 *
 * Responsibilities:
 *  - Add/remove/update series of any type (candlestick, line, histogram, etc.)
 *  - Map series to their parent pane index
 *  - Provide typed update helpers for streaming data
 */

import {
  CandlestickSeries,
  LineSeries,
  HistogramSeries,
  AreaSeries,
  BarSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type BarData,
  type LineData,
  type HistogramData,
  type AreaData,
  type DeepPartial,
  type CandlestickSeriesOptions,
  type LineSeriesOptions,
  type HistogramSeriesOptions,
  type AreaSeriesOptions,
  type BarSeriesOptions,
} from 'lightweight-charts';
import type { OHLCVBar, SeriesEntry, SeriesKind, ChartTheme } from './types';

export class SeriesManager {
  private _chart: IChartApi;
  private _series: Map<string, SeriesEntry> = new Map();

  constructor(chart: IChartApi) {
    this._chart = chart;
  }

  // ── Getters ────────────────────────────────────────────────────────────────

  get all(): SeriesEntry[] {
    return Array.from(this._series.values());
  }

  get(id: string): SeriesEntry | undefined {
    return this._series.get(id);
  }

  getAll(): SeriesEntry[] {
    return Array.from(this._series.values());
  }

  findEntryByApi(api: any): SeriesEntry | undefined {
    for (const entry of this._series.values()) {
      if (entry.api === api) return entry;
    }
    return undefined;
  }

  getByIndicator(indicatorId: string): SeriesEntry[] {
    return Array.from(this._series.values()).filter(s => s.indicatorId === indicatorId);
  }

  // ── Add series ─────────────────────────────────────────────────────────────

  addCandlestick(
    id: string,
    theme: ChartTheme,
    paneIndex = 0,
    opts: DeepPartial<CandlestickSeriesOptions> = {},
  ): ISeriesApi<'Candlestick'> {
    const series = this._chart.addSeries(CandlestickSeries, {
      upColor:           theme.upColor,
      downColor:         theme.downColor,
      borderUpColor:     theme.upColor,
      borderDownColor:   theme.downColor,
      wickUpColor:       theme.wickUpColor,
      wickDownColor:     theme.wickDownColor,
      ...opts,
    }, paneIndex);

    this._series.set(id, { id, kind: 'candlestick', paneIndex, api: series });
    return series;
  }

  addOhlc(
    id: string,
    theme: ChartTheme,
    paneIndex = 0,
    opts: DeepPartial<BarSeriesOptions> = {},
  ): ISeriesApi<'Bar'> {
    const series = this._chart.addSeries(BarSeries, {
      upColor:   theme.upColor,
      downColor: theme.downColor,
      ...opts,
    }, paneIndex);
    this._series.set(id, { id, kind: 'bar', paneIndex, api: series });
    return series;
  }

  addBar(
    id: string,
    theme: ChartTheme,
    paneIndex = 0,
    opts: DeepPartial<BarSeriesOptions> = {},
  ): ISeriesApi<'Bar'> {
    const series = this._chart.addSeries(BarSeries, {
      upColor:   theme.upColor,
      downColor: theme.downColor,
      ...opts,
    }, paneIndex);
    this._series.set(id, { id, kind: 'bar', paneIndex, api: series });
    return series;
  }

  addLine(
    id: string,
    paneIndex = 0,
    opts: DeepPartial<LineSeriesOptions> = {},
    indicatorId?: string,
  ): ISeriesApi<'Line'> {
    const series = this._chart.addSeries(LineSeries, opts, paneIndex);
    this._series.set(id, { id, kind: 'line', paneIndex, api: series, indicatorId });
    return series;
  }

  addArea(
    id: string,
    paneIndex = 0,
    opts: DeepPartial<AreaSeriesOptions> = {},
    indicatorId?: string,
  ): ISeriesApi<'Area'> {
    const series = this._chart.addSeries(AreaSeries, opts, paneIndex);
    this._series.set(id, { id, kind: 'area', paneIndex, api: series, indicatorId });
    return series;
  }

  addHistogram(
    id: string,
    paneIndex = 0,
    opts: DeepPartial<HistogramSeriesOptions> = {},
    indicatorId?: string,
  ): ISeriesApi<'Histogram'> {
    const series = this._chart.addSeries(HistogramSeries, opts, paneIndex);
    this._series.set(id, { id, kind: 'histogram', paneIndex, api: series, indicatorId });
    return series;
  }

  // ── Remove ─────────────────────────────────────────────────────────────────

  remove(id: string): void {
    const entry = this._series.get(id);
    if (!entry) return;
    try {
      this._chart.removeSeries(entry.api);
    } catch {
      // Series may have already been removed (e.g. chart destroyed)
    }
    this._series.delete(id);
  }

  removeByIndicator(indicatorId: string): void {
    this.getByIndicator(indicatorId).forEach(s => this.remove(s.id));
  }

  // ── Data updates ───────────────────────────────────────────────────────────

  /** Set full dataset on a candlestick / OHLC / bar series. */
  setOHLCVData(id: string, bars: OHLCVBar[]): void {
    const entry = this._series.get(id);
    if (!entry) return;
    const kind: SeriesKind = entry.kind;

    if (kind === 'candlestick') {
      const data: CandlestickData[] = bars.map(b => ({
        time: b.time as unknown as import('lightweight-charts').Time,
        open: b.open, high: b.high, low: b.low, close: b.close,
      }));
      (entry.api as ISeriesApi<'Candlestick'>).setData(data);
    } else if (kind === 'ohlc' || kind === 'bar') {
      const data: BarData[] = bars.map(b => ({
        time: b.time as unknown as import('lightweight-charts').Time,
        open: b.open, high: b.high, low: b.low, close: b.close,
      }));
      entry.api.setData(data);
    } else if (kind === 'line') {
      const data: LineData[] = bars.map(b => ({
        time: b.time as unknown as import('lightweight-charts').Time,
        value: b.close,
      }));
      (entry.api as ISeriesApi<'Line'>).setData(data);
    } else if (kind === 'area') {
      const data: AreaData[] = bars.map(b => ({
        time: b.time as unknown as import('lightweight-charts').Time,
        value: b.close,
      }));
      (entry.api as ISeriesApi<'Area'>).setData(data);
    }
  }

  /** Set histogram (volume) data. */
  setVolumeData(id: string, bars: OHLCVBar[], upColor: string, downColor: string): void {
    const entry = this._series.get(id);
    if (!entry || entry.kind !== 'histogram') return;

    const toHistogramValue = (value: OHLCVBar['volume']): number => {
      const parsed = typeof value === 'number' ? value : Number(value ?? 0);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const data: HistogramData[] = bars.map((b, i) => ({
      time:  b.time as unknown as import('lightweight-charts').Time,
      value: toHistogramValue(b.volume),
      color: i === 0 ? upColor : b.close >= bars[i - 1].close ? upColor : downColor,
    }));
    (entry.api as ISeriesApi<'Histogram'>).setData(data);
  }

  /** Set generic line/histogram data (for indicators). */
  setLineData(id: string, data: LineData[]): void {
    const entry = this._series.get(id);
    if (!entry) return;
    entry.api.setData(data);
  }

  setHistogramData(id: string, data: HistogramData[]): void {
    const entry = this._series.get(id);
    if (!entry) return;
    entry.api.setData(data);
  }

  // ── Live update (streaming last bar) ──────────────────────────────────────

  updateLastBar(id: string, bar: OHLCVBar): void {
    const entry = this._series.get(id);
    if (!entry) return;

    if (entry.kind === 'candlestick') {
      (entry.api as ISeriesApi<'Candlestick'>).update({
        time: bar.time as unknown as import('lightweight-charts').Time,
        open: bar.open, high: bar.high, low: bar.low, close: bar.close,
      });
    } else if (entry.kind === 'line' || entry.kind === 'area') {
      entry.api.update({
        time: bar.time as unknown as import('lightweight-charts').Time,
        value: bar.close,
      });
    }
  }

  // ── Visibility ─────────────────────────────────────────────────────────────

  setVisible(id: string, visible: boolean): void {
    const entry = this._series.get(id);
    if (!entry) return;
    entry.api.applyOptions({ visible });
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────

  clear(): void {
    this._series.forEach((_, id) => this.remove(id));
  }
}
