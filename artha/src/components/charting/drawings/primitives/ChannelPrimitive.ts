/**
 * ChannelPrimitive — renders a parallel channel (three points: start, end, and parallel width).
 * For simplicity in our two-point click model, we'll draw a channel with a fixed width, or 
 * use the y-distance of the second point to define both angle and width.
 * Actually, we'll render a standard trend line + a parallel line offset by a fixed amount initially,
 * since our DrawingManager currently only collects 2 points.
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView, type CoordConverter } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class ChannelRenderer implements IPrimitivePaneRenderer {
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
      ctx.lineWidth   = this._width * Math.min(hpr, vpr);
      
      // Main line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Parallel line (offset by arbitrary vertical distance for 2-point channel)
      // In a real 3-point channel, this offset would come from the 3rd point.
      // Here we'll offset it by 50 pixels down as a placeholder.
      const offset = 50 * vpr;
      ctx.beginPath();
      ctx.moveTo(x1, y1 + offset);
      ctx.lineTo(x2, y2 + offset);
      ctx.stroke();

      // Fill between lines
      ctx.fillStyle = `${this._color}33`; // 20% opacity
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y2 + offset);
      ctx.lineTo(x1, y1 + offset);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    });
  }
}

class ChannelView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;

  renderer(): IPrimitivePaneRenderer {
    return new ChannelRenderer(
      this._p1, 
      this._p2, 
      this._data.style?.color ?? '#F59E0B', 
      this._data.style?.lineWidth ?? 1
    );
  }

  setPoints(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null): void {
    this._p1 = p1;
    this._p2 = p2;
  }
}

export class ChannelPrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new ChannelView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as ChannelView | undefined;
    if (!view || this._data.points.length < 2) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1, p2);
  }
}
