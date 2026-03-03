import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { obv } from '../math';
import type { LineData } from 'lightweight-charts';

export class OBVIndicator extends IndicatorBase {
  static readonly TYPE = 'OBV';

  get label(): string { return 'OBV'; }
  get defaultParams(): Record<string, never> { return {}; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const values = obv(bars.map(b => b.close), bars.map(b => b.volume ?? 0));
    const data: LineData[] = bars.map((b, i) => ({
      time: this.timeToLwcTime(b.time), value: values[i],
    }));
    return [{ seriesId: `${this.id}_line`, data }];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    const pane = pm.addPane(15);
    this._ownedPaneId = pane.id;
    pm.addIndicatorToPane(pane.id, this.id);
    const pi = pm.getPaneIndex(pane.id);
    sm.addLine(`${this.id}_line`, pi, {
      color: this._config.color ?? '#06B6D4',
      lineWidth: 1 as const, priceLineVisible: false, lastValueVisible: true, title: 'OBV',
    }, this.id);
    this._seriesIds = [`${this.id}_line`];
  }
}

export function createOBV(config: IndicatorConfig): OBVIndicator {
  return new OBVIndicator(config);
}
