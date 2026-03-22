'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import type { WidgetColumn, ChartConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  chartConfig?: ChartConfig;
}

const COLORS = [
  '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444',
  '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1',
];

function getColor(val: unknown, col?: WidgetColumn): string {
  if (!col?.colorCode) return COLORS[0];
  const n = Number(val);
  if (isNaN(n)) return COLORS[0];
  return n >= 0 ? '#10B981' : '#EF4444';
}

const CustomTooltip = ({ active, payload, label }: Record<string, unknown>) => {
  if (!active || !Array.isArray(payload) || payload.length === 0) return null;
  return (
    <div className="rounded px-3 py-2 text-xs shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="mb-1 font-mono" style={{ color: 'var(--text-primary)' }}>{String(label)}</p>
      {(payload as Array<{ name: string; value: unknown; color: string }>).map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {typeof p.value === 'number' ? p.value.toFixed(2) : String(p.value)}
        </p>
      ))}
    </div>
  );
};

export function WidgetBarChart({ rows, columns, chartConfig }: Props) {
  const xKey: string = chartConfig?.xAxis ?? columns[0]?.id ?? 'symbol';
  const yKey: string = chartConfig?.yAxis ?? columns[1]?.id ?? columns[0]?.id ?? 'value';
  const colorCol = columns.find(c => c.id === (chartConfig?.colorField ?? yKey));

  const data: Array<Record<string, unknown> & { _label: string }> = rows.map(r => ({
    ...r,
    _label: String(r[xKey] ?? ''),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 20, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="_label"
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: 'var(--border)' }}
          angle={-30}
          textAnchor="end"
          interval={0}
          height={40}
        />
        <YAxis
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => v >= 1e5 ? `${(v/1e5).toFixed(0)}L` : v.toFixed(1)}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
        <Bar dataKey={yKey} radius={[3, 3, 0, 0]} maxBarSize={40}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={colorCol ? getColor(entry[yKey], colorCol) : COLORS[i % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
