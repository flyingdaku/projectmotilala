import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { macd } from '../math';
import type { LineData, HistogramData } from 'lightweight-charts';

export class MACDIndicator extends IndicatorBase {
  static readonly TYPE = 'MACD';

  get label(): string {
    return `MACD (${this.param('fast', 12)},${this.param('slow', 26)},${this.param('signal', 9)})`;
  }
  get defaultParams(): Record<string, number> { return { fast: 12, slow: 26, signal: 9 }; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const fast   = this.param('fast', 12) as number;
    const slow   = this.param('slow', 26) as number;
    const signal = this.param('signal', 9) as number;
    const { macd: macdLine, signal: signalLine, hist } = macd(bars.map(b => b.close), fast, slow, signal);

    const toLine = (arr: (number | null)[], id: string): ComputeResult => ({
      seriesId: id,
      data: bars
        .map((b, i) => ({ time: this.timeToLwcTime(b.time), value: arr[i] }))
        .filter(d => d.value !== null) as LineData[],
    });

    const histData: HistogramData[] = bars
      .map((b, i) => ({
        time:  this.timeToLwcTime(b.time),
        value: hist[i] ?? 0,
        color: (hist[i] ?? 0) >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)',
      }))
      .filter((_, i) => hist[i] !== null) as HistogramData[];

    return [
      toLine(macdLine, `${this.id}_macd`),
      toLine(signalLine, `${this.id}_signal`),
      { seriesId: `${this.id}_hist`, data: histData },
    ];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    const pane = pm.addPane(15);
    this._ownedPaneId = pane.id;
    pm.addIndicatorToPane(pane.id, this.id);
    const paneIdx = pm.getPaneIndex(pane.id);

    sm.addHistogram(`${this.id}_hist`,   paneIdx, { priceLineVisible: false, lastValueVisible: false }, this.id);
    sm.addLine(`${this.id}_macd`,   paneIdx, { color: '#3B82F6', lineWidth: 1 as const, priceLineVisible: false, lastValueVisible: true, title: 'MACD' }, this.id);
    sm.addLine(`${this.id}_signal`, paneIdx, { color: '#EF4444', lineWidth: 1 as const, priceLineVisible: false, lastValueVisible: true, title: 'Signal' }, this.id);
    this._seriesIds = [`${this.id}_hist`, `${this.id}_macd`, `${this.id}_signal`];
  }
}

export function createMACD(config: IndicatorConfig): MACDIndicator {
  return new MACDIndicator(config);
}
