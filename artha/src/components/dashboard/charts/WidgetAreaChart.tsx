'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import type { WidgetColumn, ChartConfig } from '@/lib/dashboard/types';

interface Props {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  chartConfig?: ChartConfig;
}

const AREA_COLORS = [
  { stroke: '#F59E0B', fill: 'rgba(245,158,11,0.12)' },
  { stroke: '#3B82F6', fill: 'rgba(59,130,246,0.12)' },
  { stroke: '#10B981', fill: 'rgba(16,185,129,0.12)' },
  { stroke: '#8B5CF6', fill: 'rgba(139,92,246,0.12)' },
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

export function WidgetAreaChart({ rows, columns, chartConfig }: Props) {
  const xKey: string = chartConfig?.xAxis ?? columns[0]?.id ?? 'date';
  const valueColumns = columns.filter(c => c.id !== xKey && c.format !== 'text');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={rows} margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
        <defs>
          {valueColumns.map((col, i) => {
            const color = AREA_COLORS[i % AREA_COLORS.length];
            return (
              <linearGradient key={col.id} id={`grad_${col.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.stroke} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color.stroke} stopOpacity={0.02} />
              </linearGradient>
            );
          })}
        </defs>
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
          tickFormatter={(v: number) => v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1)}
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
        {valueColumns.map((col, i) => {
          const color = AREA_COLORS[i % AREA_COLORS.length];
          return (
            <Area
              key={col.id}
              type="monotone"
              dataKey={col.id}
              name={col.label}
              stroke={color.stroke}
              strokeWidth={1.5}
              fill={`url(#grad_${col.id})`}
              dot={false}
              activeDot={{ r: 3, fill: color.stroke }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}
