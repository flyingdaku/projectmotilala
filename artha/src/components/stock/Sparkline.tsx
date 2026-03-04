"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Props {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export function Sparkline({ data, color = "#10b981", height = 24, className = "" }: Props) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((value, index) => ({ index, value }));
  const isPositive = data[data.length - 1] >= data[0];

  return (
    <div className={`inline-block ${className}`} style={{ width: 60, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
