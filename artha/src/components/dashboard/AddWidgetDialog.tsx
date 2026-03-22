'use client';

import React, { useState } from 'react';
import { PRESET_WIDGETS } from '@/lib/dashboard/presets';
import type { PresetWidget, WidgetType } from '@/lib/dashboard/types';

interface Props {
  onAdd: (preset: PresetWidget) => void;
  onClose: () => void;
}

const CATEGORIES = ['All', ...Array.from(new Set(PRESET_WIDGETS.map(p => p.category)))];

const TYPE_ICONS: Record<WidgetType, string> = {
  table: '⊞',
  bar: '▬',
  horizontal_bar: '≡',
  pie: '◔',
  line: '∿',
  area: '◬',
  heatmap: '▦',
  metric: '#',
};

const TYPE_LABELS: Record<WidgetType, string> = {
  table: 'Table',
  bar: 'Bar',
  horizontal_bar: 'H-Bar',
  pie: 'Pie',
  line: 'Line',
  area: 'Area',
  heatmap: 'Heatmap',
  metric: 'Metric',
};

export function AddWidgetDialog({ onAdd, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PRESET_WIDGETS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Add Widget</h2>
          <button
            onClick={onClose}
            className="transition-colors p-1 rounded"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search widgets…"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
            style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-5 py-2 overflow-x-auto scrollbar-none" style={{ borderBottom: '1px solid var(--border)' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors"
              style={activeCategory === cat
                ? { background: 'var(--selection-bg, rgba(245,158,11,0.15))', color: 'var(--accent-brand)', border: '1px solid var(--selection-border, rgba(245,158,11,0.3))' }
                : { color: 'var(--text-secondary)', border: '1px solid transparent' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Widget grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm" style={{ color: 'var(--text-secondary)' }}>
              No widgets found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => onAdd(preset)}
                  className="group flex flex-col gap-2 p-4 rounded-lg text-left transition-all"
                  style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-brand)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-mono" style={{ color: 'var(--accent-brand)', opacity: 0.8 }}>
                        {TYPE_ICONS[preset.widget_type]}
                      </span>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                        {preset.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                      {TYPE_LABELS[preset.widget_type]}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {preset.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                      {preset.category}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                      {preset.config.columns.length} cols
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
