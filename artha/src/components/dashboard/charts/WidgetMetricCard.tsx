'use client';

import React from 'react';
import type { WidgetColumn, WidgetConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  config: WidgetConfig;
}

function formatMetric(val: unknown, format?: string): string {
  const n = Number(val);
  if (isNaN(n)) return String(val ?? '—');
  switch (format) {
    case 'percent': return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
    case 'currency':
      return n >= 1e7
        ? `₹${(n / 1e7).toFixed(2)} Cr`
        : n >= 1e5
        ? `₹${(n / 1e5).toFixed(2)} L`
        : `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    case 'number':
      return n >= 1e7
        ? `${(n / 1e7).toFixed(2)} Cr`
        : n >= 1e5
        ? `${(n / 1e5).toFixed(2)} L`
        : n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    default:
      return n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }
}

export function WidgetMetricCard({ rows, columns, config }: Props) {
  const metricCol = config.metricColumn
    ? columns.find(c => c.id === config.metricColumn || c.dslName === config.metricColumn)
    : columns[0];

  const rawVal = rows[0]?.[metricCol?.id ?? ''];
  const displayVal = rawVal !== undefined ? formatMetric(rawVal, metricCol?.format) : '—';

  const totalRows = rows.length;
  const isCount = !metricCol || metricCol.aggregation === 'count';
  const subLabel = isCount
    ? `${totalRows.toLocaleString()} stocks`
    : config.metricLabel ?? metricCol?.label ?? '';

  const numVal = Number(rawVal);
  const isPositive = !isNaN(numVal) && numVal > 0 && metricCol?.colorCode;
  const isNegative = !isNaN(numVal) && numVal < 0 && metricCol?.colorCode;

  const valueColor = isPositive
    ? 'var(--positive, #10B981)'
    : isNegative
    ? 'var(--negative, #EF4444)'
    : 'var(--accent-brand)';

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="text-4xl font-bold font-mono tracking-tight" style={{ color: valueColor }}>
        {config.metricPrefix && (
          <span className="text-2xl mr-1" style={{ color: 'var(--text-secondary)' }}>{config.metricPrefix}</span>
        )}
        {displayVal}
        {config.metricSuffix && (
          <span className="text-xl ml-1" style={{ color: 'var(--text-secondary)' }}>{config.metricSuffix}</span>
        )}
      </div>
      {subLabel && (
        <div className="text-xs text-center max-w-[180px] truncate" style={{ color: 'var(--text-secondary)' }}>
          {subLabel}
        </div>
      )}
    </div>
  );
}
