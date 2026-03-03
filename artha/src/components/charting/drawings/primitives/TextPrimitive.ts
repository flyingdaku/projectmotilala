/**
 * TextPrimitive — renders text on the chart canvas.
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import { BasePrimitive, BaseDrawingView } from './BasePrimitive';
import type { DrawingData } from '../../core/types';

class TextRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _p1: { x: number; y: number } | null,
    private _text: string,
    private _color: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draw(target: any): void {
    if (!this._p1 || !this._text) return;
    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr } = scope;
      
      const x = this._p1!.x * hpr;
      const y = this._p1!.y * vpr;

      ctx.save();
      
      const fontSize = 14 * Math.min(hpr, vpr);
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = this._color;
      ctx.textBaseline = 'middle';
      
      // Add a slight shadow for readability over candles
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4 * Math.min(hpr, vpr);
      ctx.shadowOffsetX = 1 * hpr;
      ctx.shadowOffsetY = 1 * vpr;
      
      ctx.fillText(this._text, x, y);

      ctx.restore();
    });
  }
}

class TextView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;

  renderer(): IPrimitivePaneRenderer {
    return new TextRenderer(
      this._p1, 
      this._data.text ?? 'Text', 
      this._data.style?.color ?? '#F59E0B'
    );
  }

  setPoints(p1: { x: number; y: number } | null): void {
    this._p1 = p1;
  }
}

export class TextPrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new TextView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as TextView | undefined;
    if (!view || this._data.points.length === 0) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1);
  }
}
