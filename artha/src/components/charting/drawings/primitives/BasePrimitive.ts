/**
 * BasePrimitive — shared helpers for all ISeriesPrimitive drawing implementations.
 *
 * lightweight-charts v5 custom series primitives render onto the canvas
 * via the pane renderer API. Each drawing type extends this class.
 */

import type {
  ISeriesPrimitive,
  SeriesAttachedParameter,
  IPrimitivePaneView,
  IPrimitivePaneRenderer,
  Time,
} from 'lightweight-charts';
import type { DrawingData, DrawingPoint } from '../../core/types';

export type PrimitiveUpdateHandler = (data: DrawingData) => void;

/** Convert DrawingPoint → pixel coordinates via the chart's API. */
export interface CoordConverter {
  timeToX(time: number): number | null;
  priceToY(price: number): number | null;
}

// ── Utility: draw dashed line on canvas ───────────────────────────────────────

export function dashedLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  dash: number[] = [6, 3],
): void {
  ctx.save();
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

// ── Base pane view ─────────────────────────────────────────────────────────────

export abstract class BaseDrawingView implements IPrimitivePaneView {
  protected _data: DrawingData;
  protected _converter: CoordConverter | null = null;

  constructor(data: DrawingData) {
    this._data = data;
  }

  update(data: DrawingData, converter: CoordConverter): void {
    this._data    = data;
    this._converter = converter;
  }

  abstract renderer(): IPrimitivePaneRenderer;
  zOrder(): 'bottom' | 'normal' | 'top' { return 'normal'; }
}

// ── Abstract BasePrimitive ─────────────────────────────────────────────────────

export abstract class BasePrimitive implements ISeriesPrimitive {
  protected _data: DrawingData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _param: SeriesAttachedParameter<any> | null = null;
  protected _views: BaseDrawingView[] = [];
  protected _onUpdate?: PrimitiveUpdateHandler;

  constructor(data: DrawingData, onUpdate?: PrimitiveUpdateHandler) {
    this._data     = { ...data };
    this._onUpdate = onUpdate;
  }

  // ── ISeriesPrimitive ───────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attached(param: SeriesAttachedParameter<any>): void {
    this._param = param;
    this._createViews();
    this._updateViews();
  }

  detached(): void {
    this._param = null;
    this._views = [];
  }

  paneViews(): IPrimitivePaneView[] {
    return this._views;
  }

  // Called by lightweight-charts on every render tick
  updateAllViews(): void {
    this._updateViews();
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  getData(): DrawingData { return this._data; }

  updateData(data: Partial<DrawingData>): void {
    this._data = { ...this._data, ...data };
    this._updateViews();
    this._param?.requestUpdate();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  protected _buildConverter(): CoordConverter | null {
    if (!this._param) return null;
    const series = this._param.series;
    const chart  = this._param.chart;
    return {
      timeToX: (time: number) => {
        const coord = chart.timeScale().timeToCoordinate(time as unknown as Time);
        return coord ?? null;
      },
      priceToY: (price: number) => {
        const coord = series.priceToCoordinate(price);
        return coord ?? null;
      },
    };
  }

  protected _toPixel(p: DrawingPoint): { x: number; y: number } | null {
    const conv = this._buildConverter();
    if (!conv) return null;
    const x = conv.timeToX(p.time);
    const y = conv.priceToY(p.price);
    if (x === null || y === null) return null;
    return { x, y };
  }

  protected _requestUpdate(): void {
    this._param?.requestUpdate();
  }

  // ── To be implemented by subclasses ───────────────────────────────────────

  protected abstract _createViews(): void;
  protected abstract _updateViews(): void;
}
