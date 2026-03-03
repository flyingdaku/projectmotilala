import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { stochastic } from '../math';
import type { LineData } from 'lightweight-charts';

export class StochasticIndicator extends IndicatorBase {
  static readonly TYPE = 'STOCH';

  get label(): string {
    return `Stoch (${this.param('k', 14)},${this.param('d', 3)})`;
  }
  get defaultParams(): Record<string, number> { return { k: 14, d: 3 }; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const kP = this.param('k', 14) as number;
    const dP = this.param('d', 3) as number;
    const { k, d } = stochastic(
      bars.map(b => b.high), bars.map(b => b.low), bars.map(b => b.close), kP, dP
    );

    const toLine = (arr: (number | null)[], id: string): ComputeResult => ({
      seriesId: id,
      data: bars
        .map((b, i) => ({ time: this.timeToLwcTime(b.time), value: arr[i] }))
        .filter(d => d.value !== null) as LineData[],
    });

    return [toLine(k, `${this.id}_k`), toLine(d, `${this.id}_d`)];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    const pane = pm.addPane(15);
    this._ownedPaneId = pane.id;
    pm.addIndicatorToPane(pane.id, this.id);
    const pi = pm.getPaneIndex(pane.id);

    sm.addLine(`${this.id}_k`, pi, {
      color: '#3B82F6', lineWidth: 1 as const,
      priceLineVisible: false, lastValueVisible: true, title: '%K',
      autoscaleInfoProvider: () => ({ priceRange: { minValue: 0, maxValue: 100 } }),
    }, this.id);
    sm.addLine(`${this.id}_d`, pi, {
      color: '#F59E0B', lineWidth: 1 as const,
      priceLineVisible: false, lastValueVisible: true, title: '%D',
    }, this.id);
    this._seriesIds = [`${this.id}_k`, `${this.id}_d`];
  }
}

export function createStochastic(config: IndicatorConfig): StochasticIndicator {
  return new StochasticIndicator(config);
}
