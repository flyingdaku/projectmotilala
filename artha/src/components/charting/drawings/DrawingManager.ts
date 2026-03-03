/**
 * DrawingManager — orchestrates drawing creation, editing, and removal.
 *
 * Responsibilities:
 *  - Listens to mouse events on the chart container
 *  - On first click: sets anchor point for the active drawing tool
 *  - On second click (for 2-point tools): finalises the drawing
 *  - Attaches ISeriesPrimitive instances to the main series
 *  - Syncs completed drawings back to the Zustand store
 *
 * Usage:
 *   const dm = new DrawingManager(chart, mainSeries, store);
 *   dm.setTool('trendline');
 *   // ... when done
 *   dm.destroy();
 */

import type { IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import type { DrawingData, DrawingPoint, DrawingToolType } from '../core/types';
import { TrendLinePrimitive }  from './primitives/TrendLinePrimitive';
import { HorzLinePrimitive }   from './primitives/HorzLinePrimitive';
import { MeasuringToolPrimitive } from './primitives/MeasuringToolPrimitive';
import { RectanglePrimitive } from './primitives/RectanglePrimitive';
import { VertLinePrimitive } from './primitives/VertLinePrimitive';
import { FibretracePrimitive } from './primitives/FibretracePrimitive';
import { ChannelPrimitive } from './primitives/ChannelPrimitive';
import { TextPrimitive } from './primitives/TextPrimitive';
import { ArrowPrimitive } from './primitives/ArrowPrimitive';
import type { BasePrimitive }  from './primitives/BasePrimitive';

export type DrawingAddedCallback  = (drawing: DrawingData)  => void;
export type DrawingUpdateCallback = (id: string, patch: Partial<DrawingData>) => void;
export type DrawingRemoveCallback = (id: string) => void;

function generateId(): string {
  return `drw_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export class DrawingManager {
  private _chart:      IChartApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _series:     ISeriesApi<any, Time>;
  private _container:  HTMLElement;
  private _tool:       DrawingToolType | 'cursor' = 'cursor';
  private _anchor:     DrawingPoint | null = null;
  private _preview:    BasePrimitive | null = null;
  private _primitives: Map<string, BasePrimitive> = new Map();

  private _onAdded:   DrawingAddedCallback;
  private _onUpdated: DrawingUpdateCallback;
  private _onRemoved: DrawingRemoveCallback;

  // Bound event handlers (so we can remove them)
  private _handleClick:     (e: MouseEvent) => void;
  private _handleMouseMove: (e: MouseEvent) => void;

  constructor(
    chart: IChartApi,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: ISeriesApi<any, Time>,
    container: HTMLElement,
    onAdded:   DrawingAddedCallback,
    onUpdated: DrawingUpdateCallback,
    onRemoved: DrawingRemoveCallback,
  ) {
    this._chart     = chart;
    this._series    = series;
    this._container = container;
    this._onAdded   = onAdded;
    this._onUpdated = onUpdated;
    this._onRemoved = onRemoved;

    this._handleClick     = this._onClick.bind(this);
    this._handleMouseMove = this._onMouseMove.bind(this);

    this._container.addEventListener('click',     this._handleClick);
    this._container.addEventListener('mousemove', this._handleMouseMove);
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  setTool(tool: DrawingToolType | 'cursor'): void {
    this._tool   = tool;
    this._anchor = null;
    this._clearPreview();
    this._container.style.cursor = tool === 'cursor' ? 'default' : 'crosshair';
  }

  /** Restore existing drawings from the store (e.g. loaded from DB). */
  restoreDrawings(drawings: DrawingData[]): void {
    drawings.forEach(d => this._attachPrimitive(d));
  }

  /** Remove a single drawing by id. */
  removeDrawing(id: string): void {
    const prim = this._primitives.get(id);
    if (prim) {
      this._series.detachPrimitive(prim);
      this._primitives.delete(id);
    }
    this._onRemoved(id);
  }

  /** Remove all drawings. */
  clearAll(): void {
    this._primitives.forEach((prim, id) => {
      this._series.detachPrimitive(prim);
      this._onRemoved(id);
    });
    this._primitives.clear();
    this._clearPreview();
    this._anchor = null;
  }

  destroy(): void {
    this.clearAll();
    this._container.removeEventListener('click',     this._handleClick);
    this._container.removeEventListener('mousemove', this._handleMouseMove);
    this._container.style.cursor = 'default';
  }

  // ── Coordinate helpers ─────────────────────────────────────────────────────

  private _eventToPoint(e: MouseEvent): DrawingPoint | null {
    const rect  = this._container.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const time  = this._chart.timeScale().coordinateToTime(x);
    const price = this._series.coordinateToPrice(y);
    if (time === null || price === null) return null;
    return { time: time as unknown as number, price };
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private _onClick(e: MouseEvent): void {
    console.log('[DrawingManager] Click event:', { tool: this._tool, hasAnchor: !!this._anchor });
    if (this._tool === 'cursor') return;

    const pt = this._eventToPoint(e);
    if (!pt) {
      console.warn('[DrawingManager] Failed to convert event to point');
      return;
    }
    console.log('[DrawingManager] Point:', pt);

    // Single-point tools
    if (this._tool === 'horzline') {
      this._finalise([pt]);
      return;
    }

    // Two-point tools
    if (!this._anchor) {
      this._anchor = pt;
      return;
    }

    // Second click — finalise
    this._finalise([this._anchor, pt]);
    this._anchor = null;
  }

  private _onMouseMove(e: MouseEvent): void {
    if (this._tool === 'cursor' || !this._anchor) return;

    const pt = this._eventToPoint(e);
    if (!pt) return;

    // Update preview primitive
    const previewData: DrawingData = {
      id:     '__preview__',
      type:   this._tool,
      points: [this._anchor, pt],
      style:  { color: '#F59E0B66', lineWidth: 1, dashed: true },
    };

    if (this._preview) {
      this._preview.updateData(previewData);
    } else {
      this._preview = this._createPrimitive(previewData);
      if (this._preview) this._series.attachPrimitive(this._preview);
    }
  }

  // ── Drawing lifecycle ──────────────────────────────────────────────────────

  private _finalise(points: DrawingPoint[]): void {
    this._clearPreview();

    const drawing: DrawingData = {
      id:     generateId(),
      type:   this._tool as DrawingToolType,
      points,
      style:  { color: '#F59E0B', lineWidth: 1, dashed: false },
    };

    this._attachPrimitive(drawing);
    this._onAdded(drawing);
  }

  private _attachPrimitive(drawing: DrawingData): void {
    const prim = this._createPrimitive(drawing);
    if (!prim) return;
    this._series.attachPrimitive(prim);
    this._primitives.set(drawing.id, prim);
  }

  private _createPrimitive(data: DrawingData): BasePrimitive | null {
    switch (data.type) {
      case 'trendline':
        return new TrendLinePrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'horzline':
        return new HorzLinePrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'vertline':
        return new VertLinePrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'measure':
        return new MeasuringToolPrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'rectangle':
        return new RectanglePrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'fibretrace':
        return new FibretracePrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'channel':
        return new ChannelPrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'text':
        return new TextPrimitive(data, (d) => this._onUpdated(data.id, d));
      case 'arrow':
        return new ArrowPrimitive(data, (d) => this._onUpdated(data.id, d));
      default:
        console.warn(`[DrawingManager] Unknown drawing type: ${data.type}`);
        return null;
    }
  }

  private _clearPreview(): void {
    if (this._preview) {
      this._series.detachPrimitive(this._preview);
      this._preview = null;
    }
  }
}
