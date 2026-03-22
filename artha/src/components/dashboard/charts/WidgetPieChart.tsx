'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
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
  '#14B8A6', '#A78BFA', '#FB923C', '#4ADE80', '#F472B6',
];

const CustomTooltip = ({ active, payload }: Record<string, unknown>) => {
  if (!active || !Array.isArray(payload) || payload.length === 0) return null;
  const entry = payload[0] as { name: string; value: number; payload: { pct: number } };
  return (
    <div className="rounded px-3 py-2 text-xs shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{entry.name}</p>
      <p className="font-mono" style={{ color: 'var(--accent-brand)' }}>{entry.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
      {entry.payload?.pct != null && (
        <p style={{ color: 'var(--text-secondary)' }}>{entry.payload.pct.toFixed(1)}%</p>
      )}
    </div>
  );
};

export function WidgetPieChart({ rows, columns, chartConfig }: Props) {
  const labelKey: string = chartConfig?.colorField ?? columns[0]?.id ?? 'label';
  const valueKey: string = columns[1]?.id ?? columns[0]?.id ?? 'value';

  const total = rows.reduce((s, r) => s + Number(r[valueKey] ?? 0), 0);

  const data = rows.map(r => ({
    name: String(r[labelKey] ?? ''),
    value: Number(r[valueKey] ?? 0),
    pct: total > 0 ? (Number(r[valueKey] ?? 0) / total) * 100 : 0,
  }));

  const isDonut = chartConfig?.donut !== false;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={isDonut ? '40%' : 0}
          outerRadius="65%"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {chartConfig?.showLegend !== false && (
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{value}</span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
