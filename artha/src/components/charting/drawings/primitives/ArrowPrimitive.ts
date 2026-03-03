/**
 * ArrowPrimitive — renders a directional arrow between two points.
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class ArrowRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _p1: { x: number; y: number } | null,
    private _p2: { x: number; y: number } | null,
    private _color: string,
    private _width: number,
  ) {}

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
      ctx.strokeStyle = this._color;
      ctx.fillStyle = this._color;
      ctx.lineWidth   = this._width * Math.min(hpr, vpr);
      
      // Draw main line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw arrow head
      const headlen = 15 * Math.min(hpr, vpr); // length of head in pixels
      const dx = x2 - x1;
      const dy = y2 - y1;
      const angle = Math.atan2(dy, dx);

      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.lineTo(x2, y2);
      ctx.fill();

      ctx.restore();
    });
  }
}

class ArrowView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;

  renderer(): IPrimitivePaneRenderer {
    return new ArrowRenderer(
      this._p1, 
      this._p2, 
      this._data.style?.color ?? '#F59E0B', 
      this._data.style?.lineWidth ?? 2
    );
  }

  setPoints(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null): void {
    this._p1 = p1;
    this._p2 = p2;
  }
}

export class ArrowPrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new ArrowView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as ArrowView | undefined;
    if (!view || this._data.points.length < 2) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1, p2);
  }
}
