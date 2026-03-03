/**
 * PaneManager — manages multi-pane lifecycle on top of lightweight-charts v5.
 *
 * Responsibilities:
 *  - Track active panes (main + sub-panes for indicators)
 *  - Provide typed add/remove helpers that delegate to IChartApi
 *  - Keep pane metadata (height, indicatorIds) in sync
 */

import type { IChartApi } from 'lightweight-charts';
import type { PaneState } from './types';

export class PaneManager {
  private _chart: IChartApi;
  private _panes: Map<string, PaneState> = new Map();
  private _nextIndex = 1; // 0 is always the main pane

  /** Main pane id is a stable constant. */
  static readonly MAIN_PANE_ID = 'pane-main';

  constructor(chart: IChartApi) {
    this._chart = chart;
    // Register the always-present main pane
    this._panes.set(PaneManager.MAIN_PANE_ID, {
      id: PaneManager.MAIN_PANE_ID,
      index: 0,
      height: 400,
      indicators: [],
    });
  }

  // ── Accessors ──────────────────────────────────────────────────────────────

  get panes(): PaneState[] {
    return Array.from(this._panes.values()).sort((a, b) => a.index - b.index);
  }

  getPane(id: string): PaneState | undefined {
    return this._panes.get(id);
  }

  getPaneByIndex(index: number): PaneState | undefined {
    return Array.from(this._panes.values()).find(p => p.index === index);
  }

  getPaneRects(): Array<{ id: string; index: number; top: number; height: number; indicators: string[] }> {
    const lwcPanes = this._chart.panes();
    const rects: Array<{ id: string; index: number; top: number; height: number; indicators: string[] }> = [];
    let currentTop = 0;
    
    lwcPanes.forEach((p, i) => {
      const height = p.getHeight();
      const state = this.getPaneByIndex(i);
      rects.push({
        id: state?.id ?? `unknown-${i}`,
        index: i,
        top: currentTop,
        height,
        indicators: state?.indicators || [],
      });
      currentTop += height + 1; // +1 for typical 1px LWC separator
    });
    
    return rects;
  }

  // ── Mutations ──────────────────────────────────────────────────────────────

  /**
   * Recalculate and apply stretch factors to all panes.
   * Main pane gets the remaining space, each sub-pane gets 15% of total height.
   */
  private _updateStretchFactors(): void {
    const lwcPanes = this._chart.panes();
    if (!lwcPanes || lwcPanes.length === 0) return;

    const subPaneCount = lwcPanes.length - 1;
    const subPanePercentage = 15; // 15% per sub-pane
    const totalSubPanePercentage = subPaneCount * subPanePercentage;
    const mainPanePercentage = Math.max(10, 100 - totalSubPanePercentage); // Keep at least 10% for main pane

    // LWC normalizes these values relative to their sum
    lwcPanes.forEach((pane, index) => {
      if (index === 0) {
        pane.setStretchFactor(mainPanePercentage);
      } else {
        pane.setStretchFactor(subPanePercentage);
      }
    });
  }

  /**
   * Add a new sub-pane below the existing panes.
   * Returns the new PaneState.
   */
  addPane(height = 15): PaneState {
    const id = `pane-${this._nextIndex}`;
    const state: PaneState = {
      id,
      index: this._nextIndex,
      height,
      indicators: [],
    };
    this._panes.set(id, state);
    this._nextIndex++;
    
    // We need to wait a tick for the chart to create the pane internally
    // when a series is added to it, but we can't do it right here since
    // addPane is called *before* addSeries. We'll update stretch factors
    // after the series is actually added.
    setTimeout(() => this._updateStretchFactors(), 0);
    
    return state;
  }

  /**
   * Remove a sub-pane. The main pane (index 0) cannot be removed.
   * Callers must already have removed all series from this pane first.
   */
  removePane(id: string): void {
    const pane = this._panes.get(id);
    if (!pane || pane.index === 0) return;
    this._panes.delete(id);
    
    setTimeout(() => this._updateStretchFactors(), 0);
  }

  /** Register an indicator id against a pane. */
  addIndicatorToPane(paneId: string, indicatorId: string): void {
    const pane = this._panes.get(paneId);
    if (pane && !pane.indicators.includes(indicatorId)) {
      pane.indicators.push(indicatorId);
    }
  }

  /** Remove an indicator id from its pane. */
  removeIndicatorFromPane(paneId: string, indicatorId: string): void {
    const pane = this._panes.get(paneId);
    if (pane) {
      pane.indicators = pane.indicators.filter(i => i !== indicatorId);
    }
  }

  /** Update stored height (for persistence); doesn't resize the canvas pane. */
  setPaneHeight(id: string, height: number): void {
    const pane = this._panes.get(id);
    if (pane) pane.height = height;
  }

  /** Serialize current pane layout for persistence. */
  serialize(): PaneState[] {
    return this.panes;
  }

  /** Restore pane layout from persisted state (re-creates sub-panes). */
  restore(states: PaneState[]): void {
    this._panes.clear();
    states.forEach(s => {
      this._panes.set(s.id, { ...s });
      if (s.index >= this._nextIndex) this._nextIndex = s.index + 1;
    });
  }

  // ── Internal pane index lookup for lwc series API ──────────────────────────

  /**
   * Returns the 0-based pane index to pass to chart.addSeries(..., paneIndex).
   * Main pane = 0; sub-panes = 1, 2, … in creation order.
   */
  getPaneIndex(paneId: string): number {
    return this._panes.get(paneId)?.index ?? 0;
  }

  // ── Reference to chart API (for callers that need it) ─────────────────────

  get chart(): IChartApi {
    return this._chart;
  }
}
