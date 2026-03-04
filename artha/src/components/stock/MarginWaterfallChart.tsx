"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

interface Props {
  revenue: number;
  operatingProfit: number;
  netProfit: number;
  period: string;
}

export function MarginWaterfallChart({ revenue, operatingProfit, netProfit, period }: Props) {
  const operatingExpenses = revenue - operatingProfit;
  const otherExpenses = operatingProfit - netProfit;

  const data = [
    { name: "Revenue", value: revenue, cumulative: revenue, type: "positive" },
    { name: "Operating Exp", value: -operatingExpenses, cumulative: operatingProfit, type: "negative" },
    { name: "Operating Profit", value: 0, cumulative: operatingProfit, type: "total" },
    { name: "Other Exp", value: -otherExpenses, cumulative: netProfit, type: "negative" },
    { name: "Net Profit", value: 0, cumulative: netProfit, type: "total" },
  ];

  const colors = {
    positive: "#10b981",
    negative: "#ef4444",
    total: "#f59e0b",
  };

  return (
    <div className="w-full">
      <div className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        Margin Waterfall - {period}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis 
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
            tickFormatter={(v) => `₹${(v / 100).toFixed(0)}Cr`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              color: "var(--text-primary)",
            }}
            formatter={(value) => {
              const num = typeof value === 'number' ? value : 0;
              return [`₹${(num / 100).toFixed(2)} Cr`, ""];
            }}
          />
          <ReferenceLine y={0} stroke="var(--border)" />
          <Bar dataKey="cumulative" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.type as keyof typeof colors]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: colors.positive }} />
          <span style={{ color: "var(--text-muted)" }}>Revenue</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: colors.negative }} />
          <span style={{ color: "var(--text-muted)" }}>Expenses</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: colors.total }} />
          <span style={{ color: "var(--text-muted)" }}>Profit</span>
        </div>
      </div>
    </div>
  );
}
