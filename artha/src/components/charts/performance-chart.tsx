"use client";

import React, { useState } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { formatINR, formatDateShort } from "@/lib/utils";

const RANGES = ["1M", "3M", "6M", "1Y", "3Y", "All"] as const;
type Range = (typeof RANGES)[number];

interface DataPoint {
  date: string;
  portfolio: number;
  nifty: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
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
      <p className="mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-0.5">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: entry.color }}
          />
          <span style={{ color: "var(--text-secondary)" }}>{entry.name}:</span>
          <span className="font-mono font-medium">{formatINR(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [activeRange, setActiveRange] = useState<Range>("1Y");
  const mounted = useIsMounted();

  if (!mounted) return <div className="h-full w-full" />;

  return (
    <div className="h-full flex flex-col">
      {/* Range selector */}
      <div className="flex items-center gap-1 mb-4">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRange(r)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150"
            style={
              activeRange === r
                ? { background: "var(--selection-bg)", color: "var(--selection-text)", border: "1px solid var(--selection-border)" }
                : { color: "var(--text-muted)", background: "transparent" }
            }
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--positive)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="niftyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-brand)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--accent-brand)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--text-muted)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatDateShort}
              minTickGap={30}
              dy={10}
            />
            <YAxis
              orientation="right"
              tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
              width={60}
              dx={10}
              domain={['dataMin - 100000', 'dataMax + 100000']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="portfolio"
              name="Portfolio"
              stroke="var(--positive)"
              strokeWidth={2}
              fill="url(#portfolioGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--positive)", stroke: "var(--surface)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="nifty"
              name="Nifty 50"
              stroke="var(--accent-brand)"
              strokeWidth={1.5}
              fill="url(#niftyGrad)"
              dot={false}
              activeDot={{ r: 3, fill: "var(--accent-brand)", stroke: "var(--surface)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        {[
          { color: "var(--positive)", label: "Portfolio" },
          { color: "var(--accent-brand)", label: "Nifty 50" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
