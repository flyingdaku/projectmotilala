"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeatmapCell {
  row: string;
  col: string;
  value: number;
}

interface HeatmapProps {
  data: HeatmapCell[];
  rows: string[];
  cols: string[];
}

function getColor(value: number, min: number, max: number): string {
  if (value === 0) return "var(--surface-hover)";
  if (value > 0) {
    const t = Math.min(value / Math.max(max, 1), 1);
    return `color-mix(in srgb, var(--positive) ${Math.round(t * 100)}%, var(--surface))`;
  } else {
    const t = Math.min(Math.abs(value) / Math.max(Math.abs(min), 1), 1);
    return `color-mix(in srgb, var(--negative) ${Math.round(t * 100)}%, var(--surface))`;
  }
}

function getTextColor(value: number, min: number, max: number): string {
  const intensity = Math.abs(value) / Math.max(Math.abs(min), Math.abs(max), 1);
  return intensity > 0.4 ? "var(--background)" : "var(--text-primary)";
}

export function ReturnsHeatmap({ data, rows, cols }: HeatmapProps) {
  const [tooltip, setTooltip] = useState<{ row: string; col: string; value: number; x: number; y: number } | null>(null);
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const cellMap = new Map(data.map((d) => [`${d.row}|${d.col}`, d.value]));

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="border-separate" style={{ borderSpacing: 3 }}>
          <thead>
            <tr>
              <th className="w-12" />
              {cols.map((col) => (
                <th
                  key={col}
                  className="text-xs font-medium pb-1 text-center"
                  style={{ color: "var(--text-muted)", minWidth: 44 }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td
                  className="text-xs font-medium pr-2 text-right"
                  style={{ color: "var(--text-muted)" }}
                >
                  {row}
                </td>
                {cols.map((col) => {
                  const val = cellMap.get(`${row}|${col}`);
                  if (val === undefined) {
                    return (
                      <td
                        key={col}
                        className="rounded-sm"
                        style={{ width: 44, height: 44, background: "var(--surface)" }}
                      />
                    );
                  }
                  const bg = getColor(val, min, max);
                  const textColor = getTextColor(val, min, max);
                  return (
                    <td
                      key={col}
                      className="rounded-sm text-center cursor-pointer transition-transform duration-150 hover:scale-105"
                      style={{
                        width: 44,
                        height: 44,
                        background: bg,
                        color: textColor,
                        fontSize: 10,
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({ row, col, value: val, x: rect.left, y: rect.top });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {val > 0 ? "+" : ""}
                      {val.toFixed(1)}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend bar */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-xs font-mono" style={{ color: "var(--negative)" }}>
          {min.toFixed(1)}%
        </span>
        <div
          className="flex-1 h-2 rounded-full"
          style={{
            background: "linear-gradient(to right, var(--negative), var(--surface-elevated), var(--positive))",
          }}
        />
        <span className="text-xs font-mono" style={{ color: "var(--positive)" }}>
          +{max.toFixed(1)}%
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 rounded-lg border px-3 py-2 text-xs shadow-lg pointer-events-none"
          style={{
            background: "var(--surface-elevated)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            top: tooltip.y - 60,
            left: tooltip.x,
          }}
        >
          <p style={{ color: "var(--text-secondary)" }}>
            {tooltip.row} — {tooltip.col}
          </p>
          <p
            className="font-mono font-semibold"
            style={{ color: tooltip.value >= 0 ? "var(--positive)" : "var(--negative)" }}
          >
            {tooltip.value >= 0 ? "+" : ""}
            {tooltip.value.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
