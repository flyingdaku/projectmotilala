import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { rsi } from '../math';
import type { LineData } from 'lightweight-charts';

export class RSIIndicator extends IndicatorBase {
  static readonly TYPE = 'RSI';

  get label(): string { return `RSI (${this.param('period', 14)})`; }
  get defaultParams(): Record<string, number> { return { period: 14 }; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const period = this.param('period', 14) as number;
    const values = rsi(bars.map(b => b.close), period);
    const data: LineData[] = bars
      .map((b, i) => ({ time: this.timeToLwcTime(b.time), value: values[i] }))
      .filter(d => d.value !== null) as LineData[];
    return [{ seriesId: `${this.id}_line`, data }];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    const pane = pm.addPane(15);
    this._ownedPaneId = pane.id;
    pm.addIndicatorToPane(pane.id, this.id);
    const paneIdx = pm.getPaneIndex(pane.id);

    sm.addLine(`${this.id}_line`, paneIdx, {
      color: this._config.color ?? '#F59E0B',
      lineWidth: 1 as const,
      priceLineVisible: false, lastValueVisible: true, title: this.label,
      autoscaleInfoProvider: () => ({ priceRange: { minValue: 0, maxValue: 100 } }),
    }, this.id);
    this._seriesIds = [`${this.id}_line`];
  }
}

export function createRSI(config: IndicatorConfig): RSIIndicator {
  return new RSIIndicator(config);
}
