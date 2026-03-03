/**
 * VertLinePrimitive — renders a full-height vertical line at a specific time.
 */

import type {
  IPrimitivePaneRenderer,
} from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class VertLineRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _x: number | null,
    private _color: string,
    private _width: number,
    private _dashed: boolean,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (this._x === null) return;
    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, bitmapSize, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
      ctx.save();
      ctx.strokeStyle = this._color;
      ctx.lineWidth   = this._width * Math.min(hpr, vpr);
      if (this._dashed) ctx.setLineDash([6 * vpr, 3 * vpr]);
      ctx.beginPath();
      ctx.moveTo(this._x! * hpr, 0);
      ctx.lineTo(this._x! * hpr, bitmapSize.height);
      ctx.stroke();
      ctx.restore();
    });
  }
}

class VertLineView extends BaseDrawingView {
  private _x: number | null = null;

  setX(x: number | null): void { this._x = x; }

  renderer(): IPrimitivePaneRenderer {
    return new VertLineRenderer(
      this._x,
      this._data.style?.color ?? '#3B82F6',
      this._data.style?.lineWidth ?? 1,
      this._data.style?.dashed ?? false,
    );
  }
}

export class VertLinePrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new VertLineView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as VertLineView | undefined;
    if (!view || this._data.points.length === 0) return;
    const pt = this._data.points[0];
    const conv = this._buildConverter();
    if (!conv) return;
    view.update(this._data, conv);
    view.setX(conv.timeToX(pt.time));
  }
}
