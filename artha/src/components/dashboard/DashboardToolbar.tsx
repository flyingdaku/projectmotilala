'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { DashboardSummary } from '@/lib/dashboard/types';

interface Props {
  dashboards: DashboardSummary[];
  activeDashboardId: string | null;
  onSelectDashboard: (id: string) => void;
  onCreateDashboard: (name: string) => void;
  onRenameDashboard: (id: string, name: string) => void;
  onDeleteDashboard: (id: string) => void;
  onDuplicateDashboard: (id: string) => void;
  onResetToDefaults?: (id: string) => void;
  onAddWidget: () => void;
  saving?: boolean;
}

export function DashboardToolbar({
  dashboards,
  activeDashboardId,
  onSelectDashboard,
  onCreateDashboard,
  onRenameDashboard,
  onDeleteDashboard,
  onDuplicateDashboard,
  onResetToDefaults,
  onAddWidget,
  saving,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState('');
  const [creatingNew, setCreatingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const active = dashboards.find((d: DashboardSummary) => d.id === activeDashboardId);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
        setShowActions(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function startRename() {
    setRenameVal(active?.name ?? '');
    setRenaming(true);
    setShowActions(false);
  }

  function commitRename() {
    if (activeDashboardId && renameVal.trim()) {
      onRenameDashboard(activeDashboardId, renameVal.trim());
    }
    setRenaming(false);
  }

  function handleDelete() {
    if (!activeDashboardId) return;
    if (confirmDelete) {
      onDeleteDashboard(activeDashboardId);
      setConfirmDelete(false);
      setShowActions(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  }

  function commitNew() {
    if (newName.trim()) {
      onCreateDashboard(newName.trim());
      setNewName('');
      setCreatingNew(false);
      setShowPicker(false);
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
      {/* Dashboard picker */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowPicker(p => !p)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-medium min-w-[160px] max-w-[240px]"
          style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        >
          <span className="text-[11px]" style={{ color: 'var(--accent-brand)' }}>⊞</span>
          <span className="truncate flex-1 text-left">{active?.name ?? 'Select Dashboard'}</span>
          <svg className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-secondary)' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showPicker && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl z-50 overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="py-1 max-h-56 overflow-y-auto">
              {dashboards.map(d => (
                <button
                  key={d.id}
                  onClick={() => { onSelectDashboard(d.id); setShowPicker(false); }}
                  className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors"
                  style={{ color: d.id === activeDashboardId ? 'var(--accent-brand)' : 'var(--text-primary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  {d.is_default && <span className="text-[10px]" style={{ color: 'var(--accent-brand)' }}>★</span>}
                  <span className="truncate">{d.name}</span>
                </button>
              ))}
            </div>
            <div className="p-2" style={{ borderTop: '1px solid var(--border)' }}>
              {creatingNew ? (
                <div className="flex gap-1.5">
                  <input
                    autoFocus
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') commitNew(); if (e.key === 'Escape') setCreatingNew(false); }}
                    placeholder="Dashboard name..."
                    className="flex-1 rounded px-2 py-1 text-xs outline-none"
                    style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                  <button onClick={commitNew} className="px-2 py-1 text-xs rounded transition-colors" style={{ background: 'var(--accent-brand)', color: '#fff' }}>
                    Create
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCreatingNew(true)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                >
                  <span style={{ color: 'var(--accent-brand)' }}>+</span> New Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rename inline */}
      {renaming ? (
        <div className="flex items-center gap-1.5">
          <input
            autoFocus
            value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenaming(false); }}
            className="rounded px-2 py-1 text-xs outline-none w-40"
            style={{ background: 'var(--bg-hover)', border: '1px solid var(--accent-brand)', color: 'var(--text-primary)' }}
          />
          <button onClick={commitRename} className="text-xs px-1" style={{ color: 'var(--accent-brand)' }}>✓</button>
          <button onClick={() => setRenaming(false)} className="text-xs px-1" style={{ color: 'var(--text-secondary)' }}>✕</button>
        </div>
      ) : (
        /* Dashboard actions dropdown */
        active && (
          <div className="relative" ref={actionsRef}>
            <button
              onClick={() => setShowActions(p => !p)}
              className="p-1.5 rounded transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
              title="Dashboard options"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="3" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="8" cy="13" r="1.2" />
              </svg>
            </button>
            {showActions && (
              <div className="absolute top-full left-0 mt-1 w-44 rounded-lg shadow-xl z-50 overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <button onClick={startRename} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors" style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                  <span>✎</span> Rename
                </button>
                <button
                  onClick={() => { onDuplicateDashboard(activeDashboardId!); setShowActions(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors" style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <span>⎘</span> Duplicate
                </button>
                <div className="mt-1 pt-1" style={{ borderTop: '1px solid var(--border)' }}>
                  {onResetToDefaults && (
                    <button
                      onClick={() => { onResetToDefaults(activeDashboardId!); setShowActions(false); }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-brand)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                    >
                      <span>↺</span> Reset to Defaults
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors"
                    style={{ color: confirmDelete ? '#EF4444' : 'var(--text-secondary)', background: confirmDelete ? 'rgba(239,68,68,0.1)' : 'transparent' }}
                    onMouseEnter={e => { if (!confirmDelete) { (e.currentTarget as HTMLButtonElement).style.color = '#EF4444'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'; } }}
                    onMouseLeave={e => { if (!confirmDelete) { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; } }}
                  >
                    <span>⊗</span> {confirmDelete ? 'Confirm delete?' : 'Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}

      <div className="flex-1" />

      {/* Saving indicator */}
      {saving && (
        <span className="text-[10px] animate-pulse" style={{ color: 'var(--text-secondary)' }}>Saving…</span>
      )}

      {/* Add widget CTA */}
      <button
        onClick={onAddWidget}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
        style={{ background: 'var(--accent-brand)', color: '#fff' }}
      >
        <span className="text-base leading-none">+</span>
        Add Widget
      </button>
    </div>
  );
}
