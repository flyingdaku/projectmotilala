'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import type { WidgetColumn, ChartConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  chartConfig?: ChartConfig;
}

const LINE_COLORS = [
  '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444',
  '#06B6D4', '#F97316', '#84CC16',
];

const CustomTooltip = ({ active, payload, label }: Record<string, unknown>) => {
  if (!active || !Array.isArray(payload) || payload.length === 0) return null;
  return (
    <div className="rounded px-3 py-2 text-xs shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>{String(label)}</p>
      {(payload as Array<{ name: string; value: unknown; color: string }>).map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : String(p.value)}
        </p>
      ))}
    </div>
  );
};

export function WidgetLineChart({ rows, columns, chartConfig }: Props) {
  const xKey: string = chartConfig?.xAxis ?? columns[0]?.id ?? 'date';
  const valueColumns = columns.filter(c => c.id !== xKey && c.format !== 'text');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={rows} margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey={xKey}
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: 'var(--border)' }}
        />
        <YAxis
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={45}
          tickFormatter={(v: number) => v >= 1e5 ? `${(v/1e5).toFixed(0)}L` : v.toFixed(1)}
        />
        <Tooltip content={<CustomTooltip />} />
        {chartConfig?.showLegend !== false && valueColumns.length > 1 && (
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{value}</span>
            )}
          />
        )}
        {valueColumns.map((col, i) => (
          <Line
            key={col.id}
            type="monotone"
            dataKey={col.id}
            name={col.label}
            stroke={LINE_COLORS[i % LINE_COLORS.length]}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
