/**
 * HorzLinePrimitive — renders a full-width horizontal price line.
 */

import type {
  IPrimitivePaneRenderer,
} from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class HorzLineRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _y: number | null,
    private _color: string,
    private _width: number,
    private _dashed: boolean,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (this._y === null) return;
    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, bitmapSize, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
      ctx.save();
      ctx.strokeStyle = this._color;
      ctx.lineWidth   = this._width * Math.min(hpr, vpr);
      if (this._dashed) ctx.setLineDash([6 * hpr, 3 * hpr]);
      ctx.beginPath();
      ctx.moveTo(0, this._y! * vpr);
      ctx.lineTo(bitmapSize.width, this._y! * vpr);
      ctx.stroke();
      ctx.restore();
    });
  }
}

class HorzLineView extends BaseDrawingView {
  private _y: number | null = null;

  setY(y: number | null): void { this._y = y; }

  renderer(): IPrimitivePaneRenderer {
    return new HorzLineRenderer(
      this._y,
      this._data.style?.color ?? '#F59E0B',
      this._data.style?.lineWidth ?? 1,
      this._data.style?.dashed ?? false,
    );
  }
}

export class HorzLinePrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new HorzLineView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as HorzLineView | undefined;
    if (!view || this._data.points.length === 0) return;
    const pt = this._data.points[0];
    const conv = this._buildConverter();
    if (!conv) return;
    view.update(this._data, conv);
    view.setY(conv.priceToY(pt.price));
  }
}
