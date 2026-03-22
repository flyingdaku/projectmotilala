'use client';

/**
 * Dashboard client-side hooks: useDashboard, useWidgetData
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError, apiDelete, apiGet, apiPost, apiPut } from '@/lib/api-client';
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
      const data = await apiGet<{ dashboards: DashboardSummary[] }>('/api/dashboard');
      setDashboards(data.dashboards ?? []);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const createDashboard = useCallback(async (name: string): Promise<DashboardSummary | null> => {
    try {
      const data = await apiPost<{ dashboard: DashboardSummary }>('/api/dashboard', { name });
      await load();
      return data.dashboard;
    } catch {
      return null;
    }
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
      const data = await apiGet<{ dashboard: UserDashboard }>(`/api/dashboard/${id}`);
      setDashboard(data.dashboard);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
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
        await apiPut(`/api/dashboard/${dashboard.id}`, { layout_json: layout });
      } catch {
        // silent — layout will sync on next load
      }
    }, 600);
  }, [dashboard]);

  const renameDashboard = useCallback(async (name: string) => {
    if (!dashboard) return;
    setSaving(true);
    try {
      await apiPut(`/api/dashboard/${dashboard.id}`, { name });
      setDashboard(prev => prev ? { ...prev, name } : null);
    } finally {
      setSaving(false);
    }
  }, [dashboard]);

  const deleteDashboard = useCallback(async (): Promise<boolean> => {
    if (!dashboard) return false;
    try {
      await apiDelete(`/api/dashboard/${dashboard.id}`);
      return true;
    } catch {
      return false;
    }
  }, [dashboard]);

  const duplicateDashboard = useCallback(async (): Promise<string | null> => {
    if (!dashboard) return null;
    try {
      const data = await apiPost<{ dashboard?: UserDashboard }>(`/api/dashboard/${dashboard.id}/duplicate`, {});
      return data.dashboard?.id ?? null;
    } catch {
      return null;
    }
  }, [dashboard]);

  const addWidget = useCallback(async (
    widget_type: WidgetType,
    title: string,
    config: WidgetConfig,
  ): Promise<UserWidget | null> => {
    if (!dashboard) return null;
    try {
      const data = await apiPost<{ widget: UserWidget }>(`/api/dashboard/${dashboard.id}/widget`, {
        widget_type,
        title,
        config_json: config,
      });
      const widget = data.widget as UserWidget;
      setDashboard(prev =>
        prev ? { ...prev, widgets: [...(prev.widgets ?? []), widget] } : null
      );
      return widget;
    } catch {
      return null;
    }
  }, [dashboard]);

  const updateWidget = useCallback(async (
    widgetId: string,
    updates: Partial<Pick<UserWidget, 'title' | 'widget_type' | 'config_json'>>,
  ): Promise<boolean> => {
    if (!dashboard) return false;
    try {
      await apiPut(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, updates);
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
    } catch {
      return false;
    }
  }, [dashboard]);

  const deleteWidget = useCallback(async (widgetId: string): Promise<boolean> => {
    if (!dashboard) return false;
    try {
      await apiDelete(`/api/dashboard/${dashboard.id}/widget/${widgetId}`);
      setDashboard(prev =>
        prev
          ? { ...prev, widgets: (prev.widgets ?? []).filter(w => w.id !== widgetId) }
          : null
      );
      return true;
    } catch {
      return false;
    }
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
      const result = await apiPost<WidgetQueryResponse>('/api/dashboard/widget/query', { config: cfg, widget_type: wt });
      setData(result);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
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
