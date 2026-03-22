'use client';

import React from 'react';
import type { WidgetColumn, ChartConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  chartConfig?: ChartConfig;
}

function interpolateColor(value: number, min: number, max: number): string {
  if (max === min) return 'rgba(100,116,139,0.3)';
  const t = (value - min) / (max - min);
  if (t < 0.5) {
    const f = t * 2;
    const r = Math.round(239 + (100 - 239) * f);
    const g = Math.round(68 + (116 - 68) * f);
    const b = Math.round(68 + (139 - 68) * f);
    return `rgba(${r},${g},${b},0.7)`;
  } else {
    const f = (t - 0.5) * 2;
    const r = Math.round(100 + (16 - 100) * f);
    const g = Math.round(116 + (185 - 116) * f);
    const b = Math.round(139 + (129 - 139) * f);
    return `rgba(${r},${g},${b},0.7)`;
  }
}

export function WidgetHeatmap({ rows, columns, chartConfig }: Props) {
  const rowLabelKey: string = chartConfig?.yAxis ?? columns[0]?.id ?? 'label';
  const colLabelKey: string = chartConfig?.xAxis ?? columns[1]?.id ?? 'category';
  const valueKey: string = chartConfig?.colorField ?? columns[2]?.id ?? columns[1]?.id ?? 'value';
  const valueCol = columns.find(c => c.id === valueKey);

  // Build unique row/col labels
  const rowLabels = [...new Set(rows.map(r => String(r[rowLabelKey] ?? '')))];
  const colLabels = [...new Set(rows.map(r => String(r[colLabelKey] ?? '')))];

  // Build lookup
  const lookup: Record<string, Record<string, number>> = {};
  for (const row of rows) {
    const rl = String(row[rowLabelKey] ?? '');
    const cl = String(row[colLabelKey] ?? '');
    if (!lookup[rl]) lookup[rl] = {};
    lookup[rl][cl] = Number(row[valueKey] ?? 0);
  }

  const allValues = rows.map(r => Number(r[valueKey] ?? 0));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  function fmt(v: number) {
    if (!valueCol) return v.toFixed(1);
    if (valueCol.format === 'percent') return `${v.toFixed(1)}%`;
    if (valueCol.format === 'currency') return v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(0);
    return v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1);
  }

  return (
    <div className="overflow-auto h-full p-1">
      <table className="text-xs border-collapse w-full">
        <thead>
          <tr>
            <th className="px-1.5 py-1 text-left font-normal sticky left-0 z-10" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
              {columns[0]?.label ?? ''}
            </th>
            {colLabels.map(cl => (
              <th key={cl} className="px-1.5 py-1 font-normal whitespace-nowrap text-center" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                {cl}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map(rl => (
            <tr key={rl}>
              <td className="px-1.5 py-1 whitespace-nowrap sticky left-0 z-10" style={{ color: 'var(--text-primary)', borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
                {rl}
              </td>
              {colLabels.map(cl => {
                const val = lookup[rl]?.[cl];
                const bg = val !== undefined ? interpolateColor(val, min, max) : 'transparent';
                return (
                  <td
                    key={cl}
                    className="px-1.5 py-1 text-center font-mono transition-opacity hover:opacity-80"
                    style={{ backgroundColor: bg, border: '1px solid var(--border)', opacity: 0.9 }}
                    title={`${rl} × ${cl}: ${val !== undefined ? fmt(val) : '—'}`}
                  >
                    <span className="text-[10px]" style={{ color: '#fff', mixBlendMode: 'normal' }}>
                      {val !== undefined ? fmt(val) : '—'}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2 mt-2 px-1">
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Low</span>
        <div
          className="h-2 flex-1 rounded"
          style={{ background: 'linear-gradient(to right, rgba(239,68,68,0.7), rgba(100,116,139,0.3), rgba(16,185,129,0.7))' }}
        />
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>High</span>
      </div>
    </div>
  );
}
