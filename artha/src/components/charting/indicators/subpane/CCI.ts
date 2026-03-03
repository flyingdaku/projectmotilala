import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { cci } from '../math';
import type { LineData } from 'lightweight-charts';

export class CCIIndicator extends IndicatorBase {
  static readonly TYPE = 'CCI';

  get label(): string { return `CCI (${this.param('period', 20)})`; }
  get defaultParams(): Record<string, number> { return { period: 20 }; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const period = this.param('period', 20) as number;
    const values = cci(bars.map(b => b.high), bars.map(b => b.low), bars.map(b => b.close), period);
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
    const pi = pm.getPaneIndex(pane.id);
    sm.addLine(`${this.id}_line`, pi, {
      color: this._config.color ?? '#F97316',
      lineWidth: 1 as const, priceLineVisible: false, lastValueVisible: true, title: this.label,
    }, this.id);
    this._seriesIds = [`${this.id}_line`];
  }
}

export function createCCI(config: IndicatorConfig): CCIIndicator {
  return new CCIIndicator(config);
}
