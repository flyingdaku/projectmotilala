'use client';

/**
 * LayoutPanel — collapsible right-side panel for saving/loading named layouts.
 */

import { useState } from 'react';
import { Save, FolderOpen, Trash2, Layout } from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import { useChartPersistence } from '../persistence/useChartPersistence';
import type { LayoutState } from '../core/types';
import { cn } from '@/lib/utils';

interface LayoutPanelProps {
  symbol: string;
}

export function LayoutPanel({ symbol }: LayoutPanelProps) {
  const { savedLayouts, activeLayoutId } = useChartStore();
  const { saveLayout, loadLayout, deleteLayout } = useChartPersistence();
  const [saveName, setSaveName] = useState('');
  const [saving, setSaving]     = useState(false);

  const symbolLayouts = savedLayouts.filter(l => l.symbol === symbol);

  async function handleSave() {
    const name = saveName.trim() || `Layout ${symbolLayouts.length + 1}`;
    setSaving(true);
    await saveLayout(name);
    setSaveName('');
    setSaving(false);
  }

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Layout size={13} className="text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">Saved Layouts</span>
      </div>

      {/* Save input */}
      <div className="flex gap-1.5">
        <input
          className="flex-1 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500 placeholder:text-muted-foreground"
          placeholder="Layout name…"
          value={saveName}
          onChange={e => setSaveName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 px-2 h-7 rounded text-[11px] bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25 transition-colors disabled:opacity-50"
        >
          <Save size={11} />
          {saving ? '…' : 'Save'}
        </button>
      </div>

      {/* Layout list */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {symbolLayouts.length === 0 ? (
          <p className="text-[11px] text-muted-foreground text-center py-4">
            No saved layouts for {symbol}
          </p>
        ) : (
          symbolLayouts.map((layout: LayoutState) => (
            <div
              key={layout.id}
              className={cn(
                'flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border transition-colors group',
                activeLayoutId === layout.id
                  ? 'border-amber-500/40 bg-amber-500/10'
                  : 'border-border hover:border-border/80 hover:bg-muted/30'
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-foreground truncate">{layout.name}</p>
                <p className="text-[9px] text-muted-foreground">
                  {layout.timeframe} · {layout.indicators.length} indicators
                </p>
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => loadLayout(layout.id!)}
                  className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                  title="Load layout"
                >
                  <FolderOpen size={11} />
                </button>
                <button
                  onClick={() => deleteLayout(layout.id!)}
                  className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                  title="Delete layout"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
