"use client";

import React from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
  LabelList,
} from "recharts";

import { formatPercent } from "@/lib/utils";

interface AnnualReturn {
  year: string;
  portfolio: number;
  nifty: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--surface-elevated)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.fill }} />
          <span style={{ color: "var(--text-secondary)" }}>{entry.name}:</span>
          <span className="font-mono font-medium">{formatPercent(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function AnnualReturnsChart({ data }: { data: AnnualReturn[] }) {
  const mounted = useIsMounted();

  if (!mounted) return <div className="h-full w-full" />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barGap={2}>
        <XAxis
          dataKey="year"
          tick={{ fill: "var(--text-muted)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis
          tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          width={40}
          dx={10}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-elevated)" }} />
        <ReferenceLine y={0} stroke="var(--border-strong)" strokeWidth={1} />
        <Bar dataKey="portfolio" name="Portfolio" radius={[4, 4, 0, 0]} maxBarSize={32}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.portfolio >= 0 ? "var(--positive)" : "var(--negative)"}
            />
          ))}
          <LabelList
            dataKey="portfolio"
            position="top"
            formatter={(v: unknown) => formatPercent(Number(v), 0)}
            style={{ fill: "var(--text-muted)", fontSize: 9, fontFamily: "JetBrains Mono, monospace" }}
            offset={4}
          />
        </Bar>
        <Bar dataKey="nifty" name="Nifty 50" radius={[4, 4, 0, 0]} maxBarSize={32} fill="var(--border-strong)">
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.nifty >= 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
