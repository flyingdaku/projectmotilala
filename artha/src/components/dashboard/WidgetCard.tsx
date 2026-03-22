'use client';

import React, { useState, useCallback } from 'react';
import { useWidgetData } from '@/lib/dashboard/hooks';
import { WidgetRenderer } from './WidgetRenderer';
import type { UserWidget, WidgetConfig } from '@/lib/dashboard/types';

interface Props {
  widget: UserWidget;
  onEdit: (widget: UserWidget) => void;
  onDelete: (widgetId: string) => void;
  onCopy: (widget: UserWidget) => void;
}

function SkeletonLoader() {
  return (
    <div className="h-full flex flex-col gap-2 p-3 animate-pulse">
      <div className="h-3 rounded w-2/3" style={{ background: 'var(--border)' }} />
      <div className="flex-1 rounded" style={{ background: 'var(--border)', opacity: 0.5 }} />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-4 text-center">
      <span className="text-xs font-medium" style={{ color: 'var(--negative, #EF4444)' }}>Query Error</span>
      <span className="text-[11px] leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{message}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5">
      <div className="text-2xl" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>∅</div>
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>No data</span>
    </div>
  );
}

export function WidgetCard({ widget, onEdit, onDelete, onCopy }: Props) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const config = widget.config_json as WidgetConfig;
  const { data, loading, error, refresh } = useWidgetData(config, widget.widget_type);

  const handleDelete = useCallback(() => {
    if (confirmDelete) {
      onDelete(widget.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  }, [confirmDelete, onDelete, widget.id]);

  const handleCsvDownload = useCallback(() => {
    if (!data?.rows?.length) return;
    const cols = data.columns;
    const header = cols.map(c => c.label).join(',');
    const rows = data.rows.map(r =>
      cols.map(c => {
        const v = r[c.id];
        return typeof v === 'string' && v.includes(',') ? `"${v}"` : String(v ?? '');
      }).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${widget.title.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data, widget.title]);

  const cardContent = (
    <div
      className={`flex flex-col rounded-lg overflow-hidden ${
        maximized ? 'fixed inset-4 z-50 shadow-2xl' : 'h-full'
      }`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => { setShowToolbar(false); setConfirmDelete(false); }}
    >
      {/* Title bar — also the drag handle */}
      <div
        className="widget-drag-handle flex items-center justify-between px-3 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border)', cursor: 'grab' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <WidgetTypeIcon type={widget.widget_type} />
          <span className="text-[12px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{widget.title}</span>
          {data && (
            <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
              {data.total.toLocaleString()} rows
            </span>
          )}
        </div>

        {/* Toolbar */}
        <div
          className={`flex items-center gap-0.5 transition-opacity duration-150 ${
            showToolbar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ToolbarBtn title="Refresh" onClick={refresh}>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8a6 6 0 1 0 1.5-3.9M2 4v3h3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn title="Download CSV" onClick={handleCsvDownload}>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2v8M5 7l3 3 3-3M3 13h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn title="Copy widget" onClick={() => onCopy(widget)}>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="5" width="9" height="9" rx="1.5" />
              <path d="M3 11V3h8" strokeLinecap="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn title={maximized ? 'Restore' : 'Maximize'} onClick={() => setMaximized(m => !m)}>
            {maximized ? (
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 11H2v3M11 5h3V2M2 14l4-4M14 2l-4 4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" strokeLinecap="round" />
              </svg>
            )}
          </ToolbarBtn>
          <ToolbarBtn title="Edit widget" onClick={() => onEdit(widget)} highlight>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn
            title={confirmDelete ? 'Click again to confirm' : 'Delete widget'}
            onClick={handleDelete}
            danger
          >
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 4h10M6 4V2h4v2M5 4v9h6V4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex-1 min-h-0 p-1">
        {loading && <SkeletonLoader />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && data && data.rows.length === 0 && <EmptyState />}
        {!loading && !error && data && data.rows.length > 0 && (
          <WidgetRenderer
            widgetType={widget.widget_type}
            rows={data.rows}
            columns={data.columns}
            config={config}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {cardContent}
      {maximized && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMaximized(false)}
        />
      )}
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ToolbarBtn({
  children,
  title,
  onClick,
  highlight,
  danger,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      onMouseDown={e => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="p-1.5 rounded transition-colors"
      style={{
        color: danger ? 'var(--text-secondary)' : highlight ? 'var(--text-secondary)' : 'var(--text-secondary)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.color = danger ? '#EF4444' : highlight ? 'var(--accent-brand)' : 'var(--text-primary)';
        el.style.background = danger ? 'rgba(239,68,68,0.1)' : highlight ? 'rgba(var(--brand-tint-rgb,245,158,11),0.15)' : 'var(--bg-hover)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.color = 'var(--text-secondary)';
        el.style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

function WidgetTypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    table: '⊞',
    bar: '▬',
    horizontal_bar: '≡',
    pie: '◔',
    line: '∿',
    area: '◬',
    heatmap: '▦',
    metric: '#',
  };
  return (
    <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--accent-brand)' }}>
      {icons[type] ?? '?'}
    </span>
  );
}
