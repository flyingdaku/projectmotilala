"use client";

import React, { useState } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { formatINR } from "@/lib/utils";

interface AllocationItem {
  name: string;
  value: number;
  percent: number;
}

const COLORS = [
  "var(--chart-1)", 
  "var(--chart-2)", 
  "var(--chart-3)", 
  "var(--chart-4)", 
  "var(--chart-5)",
  "var(--chart-6)"
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ActiveShape(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={4}
      />
    </g>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--surface-elevated)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-medium mb-1">{d.name}</p>
      <p className="font-mono">{formatINR(d.value)}</p>
      <p style={{ color: "var(--text-muted)" }}>{d.percent.toFixed(1)}%</p>
    </div>
  );
}

export function AllocationDonut({ data }: { data: AllocationItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const mounted = useIsMounted();

  if (!mounted) return <div className="h-full w-full" />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0" style={{ minHeight: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              ...({} as any)}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              dataKey="value"
              paddingAngle={3}
              cornerRadius={4}
              activeIndex={activeIndex}
              activeShape={ActiveShape}
              onMouseEnter={(_: unknown, index: number) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend — two-column grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2 min-w-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span
              className="text-xs truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.name}
            </span>
            <span
              className="text-xs font-mono ml-auto shrink-0"
              style={{ color: "var(--text-primary)" }}
            >
              {item.percent.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
