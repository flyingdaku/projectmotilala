'use client';

/**
 * IndicatorDialog — searchable modal for adding/managing indicators.
 * Opens from the TopBar "Indicators" button.
 */

import { useState, useMemo } from 'react';
import { Search, X, Eye, EyeOff, Trash2, Settings2 } from 'lucide-react';
import { INDICATOR_REGISTRY, type IndicatorMeta } from '../indicators/registry';
import { useChartStore } from '../store/useChartStore';
import type { IndicatorConfig } from '../core/types';
import { cn } from '@/lib/utils';

function generateId() {
  return `ind_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

interface ParamEditorProps {
  meta: IndicatorMeta;
  params: Record<string, number | string | boolean>;
  onChange: (key: string, value: number | string) => void;
}

function ParamEditor({ meta, params, onChange }: ParamEditorProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {Object.entries(meta.defaultParams).map(([key, def]) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-muted-foreground capitalize">{key}</label>
          <input
            type="number"
            className="w-20 h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:border-amber-500"
            value={String(params[key] ?? def)}
            onChange={e => onChange(key, Number(e.target.value))}
            step={typeof def === 'number' && def < 5 ? 0.1 : 1}
            min={1}
          />
        </div>
      ))}
    </div>
  );
}

interface ActiveRowProps {
  config: IndicatorConfig;
  meta: IndicatorMeta;
}

function ActiveRow({ config, meta }: ActiveRowProps) {
  const { updateIndicator, removeIndicator } = useChartStore();
  const [showParams, setShowParams] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-surface-elevated px-3 py-2 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: config.color ?? meta.defaultColor }}
          />
          <span className="text-xs font-medium text-foreground truncate">{meta.label}</span>
          <span className="text-[10px] text-muted-foreground">
            ({Object.entries(config.params).map(([, v]) => v).join(', ')})
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            className="p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowParams(s => !s)}
            title="Settings"
          >
            <Settings2 size={12} />
          </button>
          <button
            className="p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => updateIndicator(config.id, { visible: !config.visible })}
            title={config.visible ? 'Hide' : 'Show'}
          >
            {config.visible ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button
            className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
            onClick={() => removeIndicator(config.id)}
            title="Remove"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {showParams && (
        <ParamEditor
          meta={meta}
          params={config.params}
          onChange={(key, value) =>
            updateIndicator(config.id, { params: { ...config.params, [key]: value } })
          }
        />
      )}
    </div>
  );
}

interface IndicatorDialogProps {
  open: boolean;
  onClose: () => void;
}

export function IndicatorDialog({ open, onClose }: IndicatorDialogProps) {
  const [search, setSearch] = useState('');
  const { indicators, addIndicator } = useChartStore();
  const allMeta = useMemo(() => INDICATOR_REGISTRY.getAllMeta(), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allMeta.filter(
      m => !q || m.label.toLowerCase().includes(q) || m.group.toLowerCase().includes(q)
    );
  }, [allMeta, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, IndicatorMeta[]>();
    filtered.forEach(m => {
      if (!map.has(m.group)) map.set(m.group, []);
      map.get(m.group)!.push(m);
    });
    return map;
  }, [filtered]);

  const activeIds = new Set(indicators.map(i => i.type));

  function handleAdd(meta: IndicatorMeta) {
    const config: IndicatorConfig = {
      id:        generateId(),
      type:      meta.type,
      params:    { ...meta.defaultParams },
      visible:   true,
      paneIndex: meta.category === 'overlay' ? 0 : -1,
      color:     meta.defaultColor,
      lineWidth: 1,
    };
    addIndicator(config);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-[9999] w-full max-w-xl rounded-xl border border-border bg-background shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="text-sm font-semibold text-foreground">Indicators</h2>
          <button
            className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X size={15} />
          </button>
        </div>

        {/* Active indicators */}
        {indicators.length > 0 && (
          <div className="px-4 py-3 border-b border-border space-y-1.5 flex-shrink-0">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Active</p>
            {indicators.map(config => {
              const meta = INDICATOR_REGISTRY.getMeta(config.type);
              if (!meta) return null;
              return <ActiveRow key={config.id} config={config} meta={meta} />;
            })}
          </div>
        )}

        {/* Search */}
        <div className="px-4 py-2.5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-muted/20">
            <Search size={13} className="text-muted-foreground flex-shrink-0" />
            <input
              className="flex-1 text-xs bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
              placeholder="Search indicators…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground">
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Indicator list */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {grouped.size === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">No indicators found.</p>
          ) : (
            Array.from(grouped.entries()).map(([group, metas]) => (
              <div key={group}>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{group}</p>
                <div className="space-y-0.5">
                  {metas.map(meta => (
                    <button
                      key={meta.type}
                      className={cn(
                        'w-full flex items-start justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors group',
                        activeIds.has(meta.type)
                          ? 'bg-amber-500/10 border border-amber-500/30'
                          : 'hover:bg-muted/40'
                      )}
                      onClick={() => handleAdd(meta)}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: meta.defaultColor }}
                          />
                          <span className="text-xs font-medium text-foreground">{meta.label}</span>
                          <span className={cn(
                            'text-[10px] px-1.5 py-0.5 rounded font-medium',
                            meta.category === 'overlay'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-purple-500/10 text-purple-400'
                          )}>
                            {meta.category === 'overlay' ? 'Overlay' : 'Sub-pane'}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 pl-4">{meta.description}</p>
                      </div>
                      <span className="text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5">
                        + Add
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
