/**
 * RectanglePrimitive — two-point rectangle drawing tool.
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import type { DrawingData } from '../../core/types';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';

class RectangleRenderer implements IPrimitivePaneRenderer {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;
  private _color: string;
  private _lineWidth: number;
  private _dashed: boolean;

  constructor(
    p1: { x: number; y: number } | null, 
    p2: { x: number; y: number } | null, 
    color: string, 
    lineWidth: number,
    dashed: boolean
  ) {
    this._p1 = p1;
    this._p2 = p2;
    this._color = color;
    this._lineWidth = lineWidth;
    this._dashed = dashed;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (!this._p1 || !this._p2) return;

    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
      
      const x1 = this._p1!.x * hpr;
      const y1 = this._p1!.y * vpr;
      const x2 = this._p2!.x * hpr;
      const y2 = this._p2!.y * vpr;

      ctx.save();

      // Calculate rect bounds
      const left = Math.min(x1, x2);
      const top = Math.min(y1, y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);

      // Draw background fill (20% opacity)
      ctx.fillStyle = `${this._color}33`; 
      ctx.fillRect(left, top, width, height);

      // Draw border
      ctx.strokeStyle = this._color;
      ctx.lineWidth = this._lineWidth * Math.min(hpr, vpr);
      if (this._dashed) {
        ctx.setLineDash([5 * hpr, 5 * hpr]);
      }
      ctx.strokeRect(left, top, width, height);
      ctx.setLineDash([]);

      ctx.restore();
    });
  }
}

class RectangleView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;

  renderer(): IPrimitivePaneRenderer {
    return new RectangleRenderer(
      this._p1, 
      this._p2, 
      this._data.style?.color ?? '#3B82F6', 
      this._data.style?.lineWidth ?? 1,
      this._data.style?.dashed ?? false
    );
  }

  setPoints(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null): void {
    this._p1 = p1;
    this._p2 = p2;
  }
}

export class RectanglePrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new RectangleView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as RectangleView | undefined;
    if (!view || this._data.points.length < 2) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1, p2);
  }
}
