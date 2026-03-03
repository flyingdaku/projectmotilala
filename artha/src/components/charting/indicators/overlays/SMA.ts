import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { sma } from '../math';

export class SMAIndicator extends IndicatorBase {
  static readonly TYPE = 'SMA';

  get label(): string {
    return `SMA (${this.param('period', 20)})`;
  }

  get defaultParams(): Record<string, number> {
    return { period: 20 };
  }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const period = this.param('period', 20) as number;
    const closes = bars.map(b => b.close);
    const values = sma(closes, period);
    const data = bars
      .map((b, i) => ({ time: this.timeToLwcTime(b.time), value: values[i] }))
      .filter(d => d.value !== null) as { time: import('lightweight-charts').Time; value: number }[];
    return [{ seriesId: `${this.id}_line`, data }];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm;
    this._pm = pm;
    this._theme = theme;
    const color = this._config.color ?? '#F59E0B';
    sm.addLine(`${this.id}_line`, 0, {
      color,
      lineWidth: (this._config.lineWidth ?? 1) as 1,
      priceLineVisible: false,
      lastValueVisible: false,
      title: this.label,
    }, this.id);
    this._seriesIds = [`${this.id}_line`];
  }
}

export function createSMA(config: IndicatorConfig): SMAIndicator {
  return new SMAIndicator(config);
}
