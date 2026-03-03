'use client';

/**
 * useChartPersistence — auto-save and load chart layouts + drawings from the DB.
 *
 * - Debounced 2s auto-save triggered whenever indicators/drawings change
 * - loadLayout(id) restores a named layout
 * - saveLayout(name) saves current state as a named layout
 */

import { useEffect, useRef, useCallback } from 'react';
import { useChartStore } from '../store/useChartStore';
import type { LayoutState } from '../core/types';

const DEBOUNCE_MS = 2000;

export function useChartPersistence() {
  const store = useChartStore();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load saved layouts list ────────────────────────────────────────────────

  const fetchLayouts = useCallback(async () => {
    try {
      const res  = await fetch('/api/charts/layouts');
      const data = await res.json();
      store.setSavedLayouts(data.layouts ?? []);
    } catch {
      // silently ignore — layouts are non-critical
    }
  }, [store]);

  useEffect(() => {
    fetchLayouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-save drawings debounced ───────────────────────────────────────────

  useEffect(() => {
    const { symbol, timeframe, drawings } = store;
    if (!symbol) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch(`/api/charts/drawings/${symbol}/${timeframe}`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ drawings }),
        });
      } catch {
        // silently ignore
      }
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  // We intentionally only re-run on drawings changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.drawings, store.symbol, store.timeframe]);

  // ── Load drawings when symbol/timeframe changes ────────────────────────────

  useEffect(() => {
    const { symbol, timeframe } = store;
    if (!symbol) return;

    fetch(`/api/charts/drawings/${symbol}/${timeframe}`)
      .then(r => r.json())
      .then(data => {
        // Only restore if user hasn't already added drawings in this session
        if (data.drawings?.length && store.drawings.length === 0) {
          data.drawings.forEach((d: Parameters<typeof store.addDrawing>[0]) => store.addDrawing(d));
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.symbol, store.timeframe]);

  // ── Manual save / load ─────────────────────────────────────────────────────

  const saveLayout = useCallback(async (name: string): Promise<LayoutState | null> => {
    const { symbol, timeframe, chartType, indicators, drawings, alerts } = store;
    const layout: LayoutState = {
      name, symbol, timeframe, chartType,
      panes:               [],
      indicators,
      drawings,
      alerts,
      priceScaleAutoScale: true,
    };
    try {
      const res  = await fetch('/api/charts/layouts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(layout),
      });
      const data = await res.json();
      await fetchLayouts();
      return data.layout;
    } catch {
      return null;
    }
  }, [store, fetchLayouts]);

  const loadLayout = useCallback(async (id: string) => {
    try {
      const res  = await fetch(`/api/charts/layouts/${id}`);
      const data = await res.json();
      const layout: LayoutState = data.layout;
      if (!layout) return;

      store.setTimeframe(layout.timeframe);
      store.setChartType(layout.chartType);
      store.clearDrawings();
      // Restore indicators
      layout.indicators.forEach(ind => store.addIndicator(ind));
      // Restore drawings
      layout.drawings.forEach(d => store.addDrawing(d));
      store.setActiveLayoutId(id);
    } catch {
      // silently ignore
    }
  }, [store]);

  const deleteLayout = useCallback(async (id: string) => {
    try {
      await fetch(`/api/charts/layouts/${id}`, { method: 'DELETE' });
      await fetchLayouts();
    } catch {}
  }, [fetchLayouts]);

  return { saveLayout, loadLayout, deleteLayout, fetchLayouts };
}
