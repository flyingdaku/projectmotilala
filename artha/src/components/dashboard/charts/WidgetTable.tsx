'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { WidgetColumn } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
}

function formatValue(val: unknown, col: WidgetColumn): string {
  if (val === null || val === undefined) return '—';
  const n = Number(val);
  if (isNaN(n)) return String(val);
  switch (col.format) {
    case 'percent':
      return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
    case 'currency':
      return n >= 1e7
        ? `₹${(n / 1e7).toFixed(2)}Cr`
        : n >= 1e5
        ? `₹${(n / 1e5).toFixed(2)}L`
        : `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    case 'number':
      return n >= 1e7
        ? `${(n / 1e7).toFixed(2)}Cr`
        : n >= 1e5
        ? `${(n / 1e5).toFixed(2)}L`
        : n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    default:
      return String(val);
  }
}

function valueColor(val: unknown, col: WidgetColumn): React.CSSProperties {
  if (!col.colorCode) return {};
  const n = Number(val);
  if (isNaN(n)) return {};
  if (n > 0) return { color: 'var(--positive, #10B981)' };
  if (n < 0) return { color: 'var(--negative, #EF4444)' };
  return { color: 'var(--text-secondary)' };
}

export function WidgetTable({ rows, columns }: Props) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const symbolCol = columns.find(c => c.dslName === 'symbol');

  const sorted = [...rows].sort((a, b) => {
    if (!sortCol) return 0;
    const av = a[sortCol] ?? 0;
    const bv = b[sortCol] ?? 0;
    const cmp = Number(av) - Number(bv);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  function handleSort(colId: string) {
    if (sortCol === colId) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(colId);
      setSortDir('desc');
    }
  }

  return (
    <div className="overflow-auto h-full">
      <table className="w-full text-xs border-collapse">
        <thead className="sticky top-0 z-10">
          <tr style={{ background: 'var(--surface)' }}>
            {columns.map(col => (
              <th
                key={col.id}
                onClick={() => handleSort(col.id)}
                className="px-2 py-1.5 text-left text-[11px] font-medium cursor-pointer whitespace-nowrap select-none"
                style={{
                  color: sortCol === col.id ? 'var(--accent-brand)' : 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {col.label}
                {sortCol === col.id && (
                  <span className="ml-1" style={{ color: 'var(--accent-brand)' }}>
                    {sortDir === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const symbol = symbolCol ? String(row[symbolCol.id] ?? row['symbol'] ?? '') : '';
            return (
              <tr
                key={i}
                className="transition-colors"
                style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-hover)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
              >
                {columns.map(col => {
                  const val = row[col.id];
                  const isSymbol = col.dslName === 'symbol';
                  const colorStyle = valueColor(val, col);
                  return (
                    <td
                      key={col.id}
                      className="px-2 py-1.5 whitespace-nowrap"
                      style={colorStyle}
                    >
                      {isSymbol && symbol ? (
                        <Link
                          href={`/stocks/${symbol}`}
                          className="font-mono font-medium"
                          style={{ color: 'var(--accent-brand)' }}
                        >
                          {symbol}
                        </Link>
                      ) : (
                        <span
                          className={col.format !== 'text' ? 'font-mono' : ''}
                          style={Object.keys(colorStyle).length === 0 ? { color: col.format === 'text' ? 'var(--text-primary)' : 'var(--text-primary)' } : {}}
                        >
                          {formatValue(val, col)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
