"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, ZAxis } from "recharts";
import type { RRGDataPoint } from "@/lib/utils/rrg";

interface Props {
  data: RRGDataPoint[];
  title?: string;
  showLabels?: boolean;
  height?: number;
}

export function RRGPlot({ data, title = "Relative Rotation Graph", showLabels = true, height = 500 }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No data available for RRG plot</p>
      </div>
    );
  }

  const chartData = data.map(d => ({
    ...d,
    x: d.rsRatio,
    y: d.rsMomentum,
    z: d.size || 100, // Bubble size
  }));

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
      )}
      
      <div className="rounded-lg border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
            
            {/* Axes */}
            <XAxis
              type="number"
              dataKey="x"
              name="RS-Ratio"
              domain={[90, 110]}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
              label={{ value: "RS-Ratio (Relative Strength)", position: "bottom", fill: "var(--text-secondary)", fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="RS-Momentum"
              domain={[-5, 5]}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
              label={{ value: "RS-Momentum", angle: -90, position: "left", fill: "var(--text-secondary)", fontSize: 12 }}
            />
            <ZAxis type="number" dataKey="z" range={[50, 400]} />
            
            {/* Reference lines for quadrants */}
            <ReferenceLine x={100} stroke="var(--border)" strokeWidth={2} strokeDasharray="5 5" />
            <ReferenceLine y={0} stroke="var(--border)" strokeWidth={2} strokeDasharray="5 5" />
            
            {/* Quadrant labels */}
            <text x="75%" y="15%" fill="var(--text-muted)" fontSize={11} fontWeight="600">Leading</text>
            <text x="25%" y="15%" fill="var(--text-muted)" fontSize={11} fontWeight="600">Weakening</text>
            <text x="25%" y="85%" fill="var(--text-muted)" fontSize={11} fontWeight="600">Lagging</text>
            <text x="75%" y="85%" fill="var(--text-muted)" fontSize={11} fontWeight="600">Improving</text>
            
            <Tooltip
              contentStyle={{
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;
                const point = payload[0].payload as RRGDataPoint;
                return (
                  <div className="p-2" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "6px" }}>
                    <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{point.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      RS-Ratio: <span className="font-mono">{point.rsRatio.toFixed(2)}</span>
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      RS-Momentum: <span className="font-mono">{point.rsMomentum.toFixed(2)}%</span>
                    </p>
                    <p className="text-xs mt-1 capitalize" style={{ color: point.color }}>
                      {point.quadrant}
                    </p>
                  </div>
                );
              }}
            />
            
            <Scatter data={chartData} fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
            <span style={{ color: "var(--text-secondary)" }}>Leading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
            <span style={{ color: "var(--text-secondary)" }}>Weakening</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }} />
            <span style={{ color: "var(--text-secondary)" }}>Lagging</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#3B82F6" }} />
            <span style={{ color: "var(--text-secondary)" }}>Improving</span>
          </div>
        </div>

        {showLabels && (
          <div className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <p><strong>Leading:</strong> Outperforming with positive momentum</p>
            <p><strong>Weakening:</strong> Outperforming but losing momentum</p>
            <p><strong>Lagging:</strong> Underperforming with negative momentum</p>
            <p><strong>Improving:</strong> Underperforming but gaining momentum</p>
          </div>
        )}
      </div>
    </div>
  );
}
