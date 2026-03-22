'use client';

/**
 * Dashboard client-side hooks: useDashboard, useWidgetData
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  UserDashboard,
  DashboardSummary,
  UserWidget,
  WidgetConfig,
  WidgetQueryResponse,
  WidgetType,
  GridLayoutItem,
} from './types';

// ── useDashboardList ──────────────────────────────────────────────────────────

export function useDashboardList() {
  const [dashboards, setDashboards] = useState<DashboardSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error(`Failed to load dashboards: ${res.status}`);
      const data = await res.json();
      setDashboards(data.dashboards ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const createDashboard = useCallback(async (name: string): Promise<DashboardSummary | null> => {
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    await load();
    return data.dashboard;
  }, [load]);

  return { dashboards, loading, error, reload: load, createDashboard };
}

// ── useDashboard ──────────────────────────────────────────────────────────────

export function useDashboard(dashboardId: string | null) {
  const [dashboard, setDashboard] = useState<UserDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const layoutSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/${id}`);
      if (!res.ok) throw new Error(`Failed to load dashboard: ${res.status}`);
      const data = await res.json();
      setDashboard(data.dashboard);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dashboardId) load(dashboardId);
  }, [dashboardId, load]);

  // Debounced layout save
  const saveLayout = useCallback((layout: GridLayoutItem[]) => {
    if (!dashboard) return;
    setDashboard(prev => prev ? { ...prev, layout_json: layout } : null);
    if (layoutSaveTimer.current) clearTimeout(layoutSaveTimer.current);
    layoutSaveTimer.current = setTimeout(async () => {
      try {
        await fetch(`/api/dashboard/${dashboard.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ layout_json: layout }),
        });
      } catch {
        // silent — layout will sync on next load
      }
    }, 600);
  }, [dashboard]);

  const renameDashboard = useCallback(async (name: string) => {
    if (!dashboard) return;
    setSaving(true);
    try {
      await fetch(`/api/dashboard/${dashboard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setDashboard(prev => prev ? { ...prev, name } : null);
    } finally {
      setSaving(false);
    }
  }, [dashboard]);

  const deleteDashboard = useCallback(async (): Promise<boolean> => {
    if (!dashboard) return false;
    const res = await fetch(`/api/dashboard/${dashboard.id}`, { method: 'DELETE' });
    return res.ok;
  }, [dashboard]);

  const duplicateDashboard = useCallback(async (): Promise<string | null> => {
    if (!dashboard) return null;
    const res = await fetch(`/api/dashboard/${dashboard.id}/duplicate`, { method: 'POST' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.id ?? null;
  }, [dashboard]);

  const addWidget = useCallback(async (
    widget_type: WidgetType,
    title: string,
    config: WidgetConfig,
  ): Promise<UserWidget | null> => {
    if (!dashboard) return null;
    const res = await fetch(`/api/dashboard/${dashboard.id}/widget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ widget_type, title, config_json: config }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const widget = data.widget as UserWidget;
    setDashboard(prev =>
      prev ? { ...prev, widgets: [...(prev.widgets ?? []), widget] } : null
    );
    return widget;
  }, [dashboard]);

  const updateWidget = useCallback(async (
    widgetId: string,
    updates: Partial<Pick<UserWidget, 'title' | 'widget_type' | 'config_json'>>,
  ): Promise<boolean> => {
    if (!dashboard) return false;
    const res = await fetch(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return false;
    setDashboard(prev =>
      prev
        ? {
            ...prev,
            widgets: (prev.widgets ?? []).map(w =>
              w.id === widgetId ? { ...w, ...updates } : w
            ),
          }
        : null
    );
    return true;
  }, [dashboard]);

  const deleteWidget = useCallback(async (widgetId: string): Promise<boolean> => {
    if (!dashboard) return false;
    const res = await fetch(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return false;
    setDashboard(prev =>
      prev
        ? { ...prev, widgets: (prev.widgets ?? []).filter(w => w.id !== widgetId) }
        : null
    );
    return true;
  }, [dashboard]);

  return {
    dashboard,
    loading,
    saving,
    error,
    reload: () => { if (dashboardId) load(dashboardId); },
    saveLayout,
    renameDashboard,
    deleteDashboard,
    duplicateDashboard,
    addWidget,
    updateWidget,
    deleteWidget,
  };
}

// ── useWidgetData ─────────────────────────────────────────────────────────────

export function useWidgetData(config: WidgetConfig, widgetType: WidgetType, enabled = true) {
  const [data, setData] = useState<WidgetQueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configKey = JSON.stringify({ config, widgetType });
  const configKeyRef = useRef(configKey);

  const run = useCallback(async (cfg: WidgetConfig, wt: WidgetType) => {
    if (!cfg.columns || cfg.columns.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/widget/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: cfg, widget_type: wt }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Query failed: ${res.status}`);
      }
      const result = await res.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    configKeyRef.current = configKey;
    if (!enabled) return;
    run(config, widgetType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey, enabled]);

  const refresh = useCallback(() => {
    run(config, widgetType);
  }, [config, widgetType, run]);

  return { data, loading, error, refresh };
}
