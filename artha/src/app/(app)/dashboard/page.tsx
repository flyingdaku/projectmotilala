"use client";

import React, { useState, useCallback } from 'react';
import { useDashboardList, useDashboard } from '@/lib/dashboard/hooks';
import { DashboardToolbar } from '@/components/dashboard/DashboardToolbar';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { AddWidgetDialog } from '@/components/dashboard/AddWidgetDialog';
import { WidgetEditor } from '@/components/dashboard/WidgetEditor';
import type { UserWidget, PresetWidget, GridLayoutItem, WidgetType, WidgetConfig } from '@/lib/dashboard/types';
import { PRESET_WIDGETS, DEFAULT_PRESET_IDS } from '@/lib/dashboard/presets';

export default function DashboardPage() {
  const {
    dashboards,
    loading: listLoading,
    createDashboard,
    reload: reloadList,
  } = useDashboardList();

  const [activeDashboardId, setActiveDashboardId] = useState<string | null>(null);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [editingWidget, setEditingWidget] = useState<UserWidget | null>(null);

  const resolvedId = activeDashboardId ?? dashboards[0]?.id ?? null;

  const {
    dashboard,
    loading: dashLoading,
    saving,
    saveLayout,
    renameDashboard,
    deleteDashboard,
    duplicateDashboard,
    addWidget,
    updateWidget,
    deleteWidget,
    reload: reloadDashboard,
  } = useDashboard(resolvedId);

  // Auto-select first dashboard when list loads
  React.useEffect(() => {
    if (!activeDashboardId && dashboards.length > 0) {
      setActiveDashboardId(dashboards[0].id);
    }
  }, [dashboards, activeDashboardId]);

  const handleSelectDashboard = useCallback((id: string) => {
    setActiveDashboardId(id);
  }, []);

  const handleCreateDashboard = useCallback(async (name: string) => {
    const created = await createDashboard(name);
    if (!created) return;
    // Seed default widgets and build initial layout
    const seedLayout: GridLayoutItem[] = [];
    let packX = 0, packY = 0, packRowH = 0;
    for (const presetId of DEFAULT_PRESET_IDS) {
      const preset = PRESET_WIDGETS.find(p => p.id === presetId);
      if (!preset) continue;
      const res = await fetch(`/api/dashboard/${created.id}/widget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widget_type: preset.widget_type, title: preset.name, config_json: preset.config }),
      });
      if (res.ok) {
        const data = await res.json();
        const wid = data.widget?.id;
        if (wid) {
          const w = preset.defaultLayout.w;
          const h = preset.defaultLayout.h;
          if (packX + w > 12) { packY += packRowH; packX = 0; packRowH = 0; }
          seedLayout.push({ i: wid, x: packX, y: packY, w, h });
          packX += w;
          packRowH = Math.max(packRowH, h);
        }
      }
    }
    // Save the initial layout
    if (seedLayout.length > 0) {
      await fetch(`/api/dashboard/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout_json: seedLayout }),
      });
    }
    setActiveDashboardId(created.id);
  }, [createDashboard]);

  const handleRenameDashboard = useCallback(async (_id: string, name: string) => {
    await renameDashboard(name);
  }, [renameDashboard]);

  const handleDeleteDashboard = useCallback(async (id: string) => {
    const ok = await deleteDashboard();
    if (ok) {
      await reloadList();
      const remaining = dashboards.filter(d => d.id !== id);
      setActiveDashboardId(remaining[0]?.id ?? null);
    }
  }, [deleteDashboard, reloadList, dashboards]);

  const handleDuplicateDashboard = useCallback(async (_id: string) => {
    const newId = await duplicateDashboard();
    if (newId) {
      await reloadList();
      setActiveDashboardId(newId);
    }
  }, [duplicateDashboard, reloadList]);

  const handleAddPreset = useCallback(async (preset: PresetWidget) => {
    setShowAddWidget(false);
    const widget = await addWidget(preset.widget_type, preset.name, preset.config);
    if (widget && dashboard) {
      // Compute x,y for the new widget by appending after existing layout
      const existingLayout = dashboard.layout_json ?? [];
      const maxY = existingLayout.reduce((m, l) => Math.max(m, l.y + l.h), 0);
      const usedX = existingLayout
        .filter(l => l.y + l.h >= maxY)
        .reduce((m, l) => Math.max(m, l.x + l.w), 0);
      const w = preset.defaultLayout.w;
      const h = preset.defaultLayout.h;
      const x = usedX + w <= 12 ? usedX : 0;
      const y = maxY;
      const newLayout: GridLayoutItem[] = [...existingLayout, { i: widget.id, x, y, w, h }];
      saveLayout(newLayout);
    }
  }, [addWidget, dashboard, saveLayout]);

  const handleDeleteWidget = useCallback(async (widgetId: string) => {
    await deleteWidget(widgetId);
  }, [deleteWidget]);

  const handleCopyWidget = useCallback(async (widget: UserWidget) => {
    await addWidget(widget.widget_type, `${widget.title} (copy)`, widget.config_json);
  }, [addWidget]);

  const handleUpdateWidget = useCallback(async (
    widgetId: string,
    updates: { title?: string; widget_type?: WidgetType; config_json?: WidgetConfig },
  ): Promise<boolean> => {
    return updateWidget(widgetId, updates);
  }, [updateWidget]);

  const handleResetToDefaults = useCallback(async (id: string) => {
    if (!dashboard) return;
    // Delete all existing widgets
    for (const w of dashboard.widgets ?? []) {
      await fetch(`/api/dashboard/${id}/widget/${w.id}`, { method: 'DELETE' });
    }
    // Re-seed with defaults + layout
    const seedLayout: GridLayoutItem[] = [];
    let packX = 0, packY = 0, packRowH = 0;
    for (const presetId of DEFAULT_PRESET_IDS) {
      const preset = PRESET_WIDGETS.find(p => p.id === presetId);
      if (!preset) continue;
      const res = await fetch(`/api/dashboard/${id}/widget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widget_type: preset.widget_type, title: preset.name, config_json: preset.config }),
      });
      if (res.ok) {
        const data = await res.json();
        const wid = data.widget?.id;
        if (wid) {
          const w = preset.defaultLayout.w;
          const h = preset.defaultLayout.h;
          if (packX + w > 12) { packY += packRowH; packX = 0; packRowH = 0; }
          seedLayout.push({ i: wid, x: packX, y: packY, w, h });
          packX += w; packRowH = Math.max(packRowH, h);
        }
      }
    }
    if (seedLayout.length > 0) {
      await fetch(`/api/dashboard/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout_json: seedLayout }),
      });
    }
    reloadDashboard();
  }, [dashboard, reloadDashboard]);

  const handleLayoutChange = useCallback((layout: GridLayoutItem[]) => {
    saveLayout(layout);
  }, [saveLayout]);

  const isLoading = listLoading || dashLoading;

  return (
    <div className="flex flex-col" style={{ margin: '-1rem -1rem 0' }}>
      {/* Toolbar */}
      <DashboardToolbar
        dashboards={dashboards}
        activeDashboardId={resolvedId}
        onSelectDashboard={handleSelectDashboard}
        onCreateDashboard={handleCreateDashboard}
        onRenameDashboard={handleRenameDashboard}
        onDeleteDashboard={handleDeleteDashboard}
        onDuplicateDashboard={handleDuplicateDashboard}
        onResetToDefaults={handleResetToDefaults}
        onAddWidget={() => setShowAddWidget(true)}
        saving={saving}
      />

      {/* Grid area */}
      <div className="flex-1 overflow-y-auto min-h-0" style={{ padding: '12px 16px' }}>
        {isLoading && !dashboard ? (
          <DashboardSkeleton />
        ) : !dashboard ? (
          <EmptyDashboardState onCreate={() => handleCreateDashboard('My Dashboard')} />
        ) : (
          <WidgetGrid
            widgets={dashboard.widgets ?? []}
            layout={dashboard.layout_json ?? []}
            onLayoutChange={handleLayoutChange}
            onEditWidget={(w) => setEditingWidget(w)}
            onDeleteWidget={handleDeleteWidget}
            onCopyWidget={handleCopyWidget}
          />
        )}
      </div>

      {/* Add widget dialog */}
      {showAddWidget && (
        <AddWidgetDialog
          onAdd={handleAddPreset}
          onClose={() => setShowAddWidget(false)}
        />
      )}

      {/* Widget editor */}
      {editingWidget && (
        <WidgetEditor
          widget={editingWidget}
          onSave={handleUpdateWidget}
          onClose={() => setEditingWidget(null)}
        />
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-64 rounded-lg" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }} />
      ))}
    </div>
  );
}

function EmptyDashboardState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-5xl" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>⊞</div>
      <h3 className="font-medium" style={{ color: 'var(--text-secondary)' }}>No dashboards yet</h3>
      <p className="text-sm text-center max-w-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Create your first dashboard to start tracking market data with customizable widgets.
      </p>
      <button
        onClick={onCreate}
        className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
        style={{ background: 'var(--accent-brand)', color: '#fff' }}
      >
        Create Dashboard
      </button>
    </div>
  );
}
