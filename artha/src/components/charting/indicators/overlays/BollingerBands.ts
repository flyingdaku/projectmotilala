import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { bollingerBands } from '../math';

export class BollingerBandsIndicator extends IndicatorBase {
  static readonly TYPE = 'BB';

  get label(): string {
    return `BB (${this.param('period', 20)}, ${this.param('mult', 2)})`;
  }
  get defaultParams(): Record<string, number> { return { period: 20, mult: 2 }; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const period = this.param('period', 20) as number;
    const mult   = this.param('mult', 2) as number;
    const { upper, mid, lower } = bollingerBands(bars.map(b => b.close), period, mult);

    const toData = (arr: (number | null)[]) => bars
      .map((b, i) => ({ time: this.timeToLwcTime(b.time), value: arr[i] }))
      .filter(d => d.value !== null) as { time: import('lightweight-charts').Time; value: number }[];

    return [
      { seriesId: `${this.id}_upper`, data: toData(upper) },
      { seriesId: `${this.id}_mid`,   data: toData(mid)   },
      { seriesId: `${this.id}_lower`, data: toData(lower) },
    ];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    const color = this._config.color ?? '#8B5CF6';
    const opts = { priceLineVisible: false as const, lastValueVisible: false as const, lineWidth: 1 as const };
    sm.addLine(`${this.id}_upper`, 0, { color: '#3B82F6', lineWidth: 1, priceLineVisible: false, lastValueVisible: false, title: 'BB Upper' }, this.id);
    sm.addLine(`${this.id}_mid`,   0, { color: '#F59E0B', lineWidth: 1, priceLineVisible: false, lastValueVisible: false, title: 'BB Mid' }, this.id);
    sm.addLine(`${this.id}_lower`, 0, { color: '#3B82F6', lineWidth: 1, priceLineVisible: false, lastValueVisible: false, title: 'BB Lower' }, this.id);
    this._seriesIds = [`${this.id}_upper`, `${this.id}_mid`, `${this.id}_lower`];
  }
}

export function createBB(config: IndicatorConfig): BollingerBandsIndicator {
  return new BollingerBandsIndicator(config);
}
