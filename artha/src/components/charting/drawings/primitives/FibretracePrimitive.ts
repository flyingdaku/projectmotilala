/**
 * FibretracePrimitive — renders Fibonacci retracement levels between two points.
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView, type CoordConverter } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

const FIB_LEVELS = [
  { value: 0,      color: '#787B86' },
  { value: 0.236,  color: '#F44336' },
  { value: 0.382,  color: '#81C784' },
  { value: 0.5,    color: '#4CAF50' },
  { value: 0.618,  color: '#009688' },
  { value: 0.786,  color: '#64B5F6' },
  { value: 1,      color: '#787B86' },
  { value: 1.618,  color: '#2196F3' },
  { value: 2.618,  color: '#E91E63' },
];

class FibretraceRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _p1: { x: number; y: number } | null,
    private _p2: { x: number; y: number } | null,
    private _p1LogicalY: number | null,
    private _p2LogicalY: number | null,
    private _converter: CoordConverter | null,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (!this._p1 || !this._p2 || !this._p1LogicalY || !this._p2LogicalY || !this._converter) return;

    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr, bitmapSize } = scope;
      
      const x1 = this._p1!.x * hpr;
      const x2 = this._p2!.x * hpr;
      
      const isUp = this._p2LogicalY! > this._p1LogicalY!;
      const diff = this._p2LogicalY! - this._p1LogicalY!;

      ctx.save();
      
      // Draw trend line
      ctx.strokeStyle = '#787B86';
      ctx.lineWidth = Math.min(hpr, vpr);
      ctx.setLineDash([5 * hpr, 5 * hpr]);
      ctx.beginPath();
      ctx.moveTo(x1, this._p1!.y * vpr);
      ctx.lineTo(x2, this._p2!.y * vpr);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw levels
      const left = Math.min(x1, x2);
      const right = Math.max(x1, x2) + 100 * hpr; // Extend lines to the right

      ctx.font = `${11 * Math.min(hpr, vpr)}px monospace`;
      ctx.textBaseline = 'middle';

      for (const level of FIB_LEVELS) {
        const levelLogicalY = this._p1LogicalY! + (diff * level.value);
        const yPx = this._converter!.priceToY(levelLogicalY);
        
        if (yPx === null) continue;
        const y = yPx * vpr;

        ctx.strokeStyle = level.color;
        ctx.fillStyle = level.color;
        ctx.lineWidth = Math.min(hpr, vpr);
        
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();

        ctx.fillText(`${level.value.toFixed(3)}`, right + 5 * hpr, y);
      }

      ctx.restore();
    });
  }
}

class FibretraceView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;
  private _p1LogicalY: number | null = null;
  private _p2LogicalY: number | null = null;

  setPoints(
    p1: { x: number; y: number } | null, 
    p2: { x: number; y: number } | null,
    p1LogicalY: number | null,
    p2LogicalY: number | null
  ): void {
    this._p1 = p1;
    this._p2 = p2;
    this._p1LogicalY = p1LogicalY;
    this._p2LogicalY = p2LogicalY;
  }

  renderer(): IPrimitivePaneRenderer {
    return new FibretraceRenderer(this._p1, this._p2, this._p1LogicalY, this._p2LogicalY, this._converter);
  }
}

export class FibretracePrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new FibretraceView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as FibretraceView | undefined;
    if (!view || this._data.points.length < 2) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1, p2, this._data.points[0].price, this._data.points[1].price);
  }
}
