'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import type { WidgetColumn, ChartConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  chartConfig?: ChartConfig;
}

const CustomTooltip = ({ active, payload, label }: Record<string, unknown>) => {
  if (!active || !Array.isArray(payload) || payload.length === 0) return null;
  return (
    <div className="rounded px-3 py-2 text-xs shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="mb-1 font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{String(label)}</p>
      {(payload as Array<{ name: string; value: unknown; color: string }>).map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {typeof p.value === 'number' ? `${p.value >= 0 ? '+' : ''}${p.value.toFixed(2)}` : String(p.value)}
        </p>
      ))}
    </div>
  );
};

export function WidgetHBarChart({ rows, columns, chartConfig }: Props) {
  const xKey = chartConfig?.xAxis ?? columns[1]?.id ?? columns[0]?.id;
  const yKey = chartConfig?.yAxis ?? columns[0]?.id ?? 'symbol';
  const colorCol = columns.find(c => c.id === (chartConfig?.colorField ?? xKey));

  const data = rows.map(r => ({
    ...r,
    _label: String(r[yKey] ?? ''),
    _value: Number(r[xKey] ?? 0),
  }));

  const hasNeg = data.some(d => d._value < 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 40, bottom: 4, left: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: 'var(--border)' }}
          tickFormatter={(v: number) => `${v.toFixed(1)}${colorCol?.format === 'percent' ? '%' : ''}`}
        />
        <YAxis
          type="category"
          dataKey="_label"
          tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
        {hasNeg && <ReferenceLine x={0} stroke="var(--border)" />}
        <Bar dataKey="_value" radius={[0, 3, 3, 0]} maxBarSize={20}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={colorCol?.colorCode
                ? entry._value >= 0 ? '#10B981' : '#EF4444'
                : '#F59E0B'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
