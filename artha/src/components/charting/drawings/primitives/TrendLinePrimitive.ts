/**
 * TrendLinePrimitive — renders a two-point trend line on the chart canvas.
 */

import type {
  IPrimitivePaneRenderer,
} from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class TrendLineRenderer implements IPrimitivePaneRenderer {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;
  private _color: string;
  private _width: number;

  constructor(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null, color: string, width: number) {
    this._p1    = p1;
    this._p2    = p2;
    this._color = color;
    this._width = width;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (!this._p1 || !this._p2) return;
    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
      ctx.save();
      ctx.strokeStyle = this._color;
      ctx.lineWidth   = this._width * Math.min(hpr, vpr);
      ctx.beginPath();
      ctx.moveTo(this._p1!.x * hpr, this._p1!.y * vpr);
      ctx.lineTo(this._p2!.x * hpr, this._p2!.y * vpr);
      ctx.stroke();
      ctx.restore();
    });
  }
}

class TrendLineView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;

  renderer(): IPrimitivePaneRenderer {
    return new TrendLineRenderer(this._p1, this._p2, this._data.style?.color ?? '#F59E0B', this._data.style?.lineWidth ?? 1);
  }

  setPoints(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null): void {
    this._p1 = p1;
    this._p2 = p2;
  }
}

export class TrendLinePrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new TrendLineView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as TrendLineView | undefined;
    if (!view || this._data.points.length < 2) return;
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    view.update(this._data, this._buildConverter()!);
    view.setPoints(p1, p2);
  }
}
