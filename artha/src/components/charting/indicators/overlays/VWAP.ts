import { IndicatorBase, type ComputeResult } from '../IndicatorBase';
import type { SeriesManager } from '../../core/SeriesManager';
import type { PaneManager } from '../../core/PaneManager';
import type { OHLCVBar, IndicatorConfig, ChartTheme } from '../../core/types';
import { vwap } from '../math';

export class VWAPIndicator extends IndicatorBase {
  static readonly TYPE = 'VWAP';

  get label(): string { return 'VWAP'; }
  get defaultParams(): Record<string, never> { return {}; }

  compute(bars: OHLCVBar[]): ComputeResult[] {
    const values = vwap(
      bars.map(b => b.high),
      bars.map(b => b.low),
      bars.map(b => b.close),
      bars.map(b => b.volume ?? 0),
    );
    const data = bars.map((b, i) => ({
      time:  this.timeToLwcTime(b.time),
      value: values[i],
    }));
    return [{ seriesId: `${this.id}_line`, data }];
  }

  attach(sm: SeriesManager, pm: PaneManager, theme: ChartTheme): void {
    this._sm = sm; this._pm = pm; this._theme = theme;
    sm.addLine(`${this.id}_line`, 0, {
      color: this._config.color ?? '#8B5CF6',
      lineWidth: (this._config.lineWidth ?? 1) as 1,
      priceLineVisible: false,
      lastValueVisible: false,
      title: this.label,
    }, this.id);
    this._seriesIds = [`${this.id}_line`];
  }
}

export function createVWAP(config: IndicatorConfig): VWAPIndicator {
  return new VWAPIndicator(config);
}
