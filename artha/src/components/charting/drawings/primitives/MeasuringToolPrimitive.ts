/**
 * MeasuringToolPrimitive — two-point measurement tool showing:
 * - Distance (price change)
 * - Percentage change
 * - Number of bars
 * - Number of days
 */

import type { IPrimitivePaneRenderer } from 'lightweight-charts';
import type { DrawingData } from '../../core/types';
import { BasePrimitive, BaseDrawingView, type CoordConverter } from './BasePrimitive';
import { formatIndianNumber, formatPercentage } from '@/lib/utils/formatters';

export class MeasuringToolPrimitive extends BasePrimitive {
  protected _createViews(): void {
    this._views = [new MeasuringToolView(this._data)];
  }

  protected _updateViews(): void {
    const view = this._views[0] as MeasuringToolView | undefined;
    if (!view || this._data.points.length < 2) return;
    
    const p1 = this._toPixel(this._data.points[0]);
    const p2 = this._toPixel(this._data.points[1]);
    
    const conv = this._buildConverter();
    if (!conv) return;
    
    view.update(this._data, conv);
    view.setPoints(p1, p2, this._data.points[0], this._data.points[1]);
  }
}

class MeasuringToolView extends BaseDrawingView {
  private _p1: { x: number; y: number } | null = null;
  private _p2: { x: number; y: number } | null = null;
  private _pt1: any = null;
  private _pt2: any = null;

  renderer(): IPrimitivePaneRenderer {
    return new MeasuringToolRenderer(this._p1, this._p2, this._pt1, this._pt2, this._converter);
  }

  setPoints(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null, pt1: any, pt2: any): void {
    this._p1 = p1;
    this._p2 = p2;
    this._pt1 = pt1;
    this._pt2 = pt2;
  }
}

class MeasuringToolRenderer implements IPrimitivePaneRenderer {
  constructor(
    private _p1: { x: number; y: number } | null,
    private _p2: { x: number; y: number } | null,
    private _pt1: any,
    private _pt2: any,
    private _converter: CoordConverter | null,
  ) {}

  draw(target: any): void {
    if (!this._p1 || !this._p2 || !this._pt1 || !this._pt2) return;

    target.useBitmapCoordinateSpace((scope: any) => {
      const { context: ctx, horizontalPixelRatio: hpr, verticalPixelRatio: vpr, mediaSize } = scope;
      
      const x1 = this._p1!.x * hpr;
      const y1 = this._p1!.y * vpr;
      const x2 = this._p2!.x * hpr;
      const y2 = this._p2!.y * vpr;

      const priceDiff = this._pt2.price - this._pt1.price;
      const isUp = priceDiff >= 0;
      const themeColor = isUp ? '#22C55E' : '#EF4444';
      const bgColor = isUp ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';

      ctx.save();

      // 1. Draw boundary-less rectangle
      const left = Math.min(x1, x2);
      const top = Math.min(y1, y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);

      ctx.fillStyle = bgColor;
      ctx.fillRect(left, top, width, height);

      // 2. Draw Horizontal and Vertical Arrows
      ctx.strokeStyle = themeColor;
      ctx.fillStyle = themeColor;
      ctx.lineWidth = 1.5 * Math.min(hpr, vpr);
      
      const drawArrow = (fromX: number, fromY: number, toX: number, toY: number) => {
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        const headlen = 8 * Math.min(hpr, vpr);
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.fill();
        
        // Also add arrow at the start
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(fromX + headlen * Math.cos(angle - Math.PI / 6), fromY + headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(fromX + headlen * Math.cos(angle + Math.PI / 6), fromY + headlen * Math.sin(angle + Math.PI / 6));
        ctx.fill();
      };

      const xMid = left + width / 2;
      const yMid = top + height / 2;

      // Vertical arrow in the middle
      drawArrow(xMid, y1, xMid, y2);
      
      // Horizontal arrow in the middle
      drawArrow(x1, yMid, x2, yMid);

      // 3. Info Box
      const pricePercent = (priceDiff / this._pt1.price) * 100;
      const timeDiff = Math.abs(this._pt2.time - this._pt1.time);
      const bars = Math.round(timeDiff / 86400); // 1 day = 1 bar for daily charts
      
      const sign = isUp ? '+' : '-';
      const line1 = `${sign}₹${formatIndianNumber(Math.abs(priceDiff), 2)} (${sign}${formatPercentage(Math.abs(pricePercent), 2)})`;
      const line2 = `${bars} bars, ${bars} days`;

      const fontSize = 12 * Math.min(hpr, vpr);
      ctx.font = `500 ${fontSize}px Inter, sans-serif`;
      const padding = 8 * Math.min(hpr, vpr);
      const lineHeight = 18 * Math.min(hpr, vpr);
      
      const maxWidth = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width);
      const boxWidth = maxWidth + (padding * 2);
      const boxHeight = (2 * lineHeight) + (padding * 1.5);

      // Position box near the second point or middle
      let boxX = xMid - boxWidth / 2;
      let boxY = isUp ? top - boxHeight - (10 * vpr) : top + height + (10 * vpr);
      
      // Keep within bounds
      if (boxX < 10 * hpr) boxX = 10 * hpr;
      if (boxX + boxWidth > mediaSize.width * hpr - 10 * hpr) boxX = mediaSize.width * hpr - boxWidth - 10 * hpr;
      if (boxY < 10 * vpr) boxY = top + height + 10 * vpr; // Flip to bottom if cuts top
      if (boxY + boxHeight > mediaSize.height * vpr - 10 * vpr) boxY = top - boxHeight - 10 * vpr; // Flip to top if cuts bottom

      // Draw box background
      ctx.fillStyle = isUp ? '#064E3B' : '#450A0A'; // Dark green / Dark red background
      
      // Round rect
      const radius = 6 * Math.min(hpr, vpr);
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
      ctx.fill();

      // Draw text
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'top';
      ctx.fillText(line1, boxX + padding, boxY + padding * 0.75);
      
      ctx.fillStyle = '#94A3B8'; // Slate 400 for second line
      ctx.font = `${fontSize * 0.9}px Inter, sans-serif`;
      ctx.fillText(line2, boxX + padding, boxY + padding * 0.75 + lineHeight);

      ctx.restore();
    });
  }
}
