"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const SECTORS = [
  { name: "Information Technology", returns: { "1D": 1.4, "1W": 3.2, "1M": 7.8, "3M": 14.2, "6M": 22.1, "1Y": 38.4, "3Y": 89.2 }, pe: 28.4, pb: 7.1, marketCap: 18.4 },
  { name: "Banking & Finance", returns: { "1D": -0.8, "1W": 1.1, "1M": -2.4, "3M": 4.8, "6M": 9.2, "1Y": 18.6, "3Y": 42.1 }, pe: 16.2, pb: 2.4, marketCap: 22.1 },
  { name: "Energy & Oil", returns: { "1D": 0.6, "1W": -1.2, "1M": 3.1, "3M": 8.9, "6M": 14.4, "1Y": 24.8, "3Y": 61.3 }, pe: 12.8, pb: 1.9, marketCap: 15.8 },
  { name: "Consumer Goods", returns: { "1D": 0.3, "1W": 0.8, "1M": 1.9, "3M": 5.2, "6M": 11.8, "1Y": 19.4, "3Y": 47.8 }, pe: 42.1, pb: 9.8, marketCap: 8.2 },
  { name: "Pharmaceuticals", returns: { "1D": 2.1, "1W": 4.8, "1M": 9.2, "3M": 18.4, "6M": 28.6, "1Y": 52.1, "3Y": 112.4 }, pe: 31.4, pb: 5.2, marketCap: 6.8 },
  { name: "Automobiles", returns: { "1D": -1.2, "1W": -2.8, "1M": -4.1, "3M": 2.4, "6M": 8.8, "1Y": 22.4, "3Y": 68.9 }, pe: 22.8, pb: 4.1, marketCap: 5.4 },
  { name: "Real Estate", returns: { "1D": 1.8, "1W": 3.4, "1M": 8.4, "3M": 19.2, "6M": 32.4, "1Y": 64.8, "3Y": 148.2 }, pe: 38.4, pb: 3.8, marketCap: 3.2 },
  { name: "Metals & Mining", returns: { "1D": -2.4, "1W": -4.1, "1M": -8.2, "3M": -6.4, "6M": 4.2, "1Y": 12.8, "3Y": 38.4 }, pe: 9.4, pb: 1.4, marketCap: 4.8 },
  { name: "Infrastructure", returns: { "1D": 0.9, "1W": 1.8, "1M": 4.2, "3M": 10.8, "6M": 18.4, "1Y": 34.2, "3Y": 82.4 }, pe: 28.1, pb: 4.2, marketCap: 4.1 },
  { name: "Telecom", returns: { "1D": 0.2, "1W": -0.8, "1M": 2.1, "3M": 6.8, "6M": 14.2, "1Y": 28.4, "3Y": 71.2 }, pe: 44.8, pb: 6.8, marketCap: 7.2 },
];

const PERIODS = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y"] as const;
type Period = typeof PERIODS[number];

function colorForReturn(r: number) {
  if (r > 5) return "#10B981";
  if (r > 2) return "#34D399";
  if (r > 0) return "#6EE7B7";
  if (r > -2) return "#FCA5A5";
  if (r > -5) return "#F87171";
  return "#EF4444";
}

export default function SectorPerformancePage() {
  const [period, setPeriod] = useState<Period>("1M");
  const sorted = [...SECTORS].sort((a, b) => b.returns[period] - a.returns[period]);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Sector Performance</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Nifty sector indices ranked by returns across time periods.</p>
      </div>

      {/* Period selector */}
      <div className="flex gap-1 flex-wrap">
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
            style={{
              background: period === p ? "var(--accent-brand)" : "var(--surface-elevated)",
              color: period === p ? "#000" : "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}>
            {p}
          </button>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {sorted.map(sector => {
          const ret = sector.returns[period];
          const isPos = ret > 0;
          const isNeg = ret < 0;
          return (
            <div key={sector.name} className="rounded-xl p-4 border flex flex-col gap-1 transition-transform hover:scale-[1.02]"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="text-[11px] font-medium leading-tight" style={{ color: "var(--text-muted)" }}>{sector.name}</span>
              <span className={`text-lg font-bold font-mono ${isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-gray-400"}`}>
                {isPos ? "+" : ""}{ret.toFixed(1)}%
              </span>
              <div className="flex items-center gap-1 mt-1">
                {isPos ? <TrendingUp size={11} className="text-emerald-500" /> : isNeg ? <TrendingDown size={11} className="text-rose-500" /> : <Minus size={11} />}
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>P/E {sector.pe} · P/B {sector.pb}</span>
              </div>
              <div className="h-1 rounded-full mt-2" style={{ background: colorForReturn(ret) + "60" }}>
                <div className="h-1 rounded-full" style={{ width: `${Math.min(100, Math.abs(ret) * 2)}%`, background: colorForReturn(ret) }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
              <th className="text-left px-4 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>Sector</th>
              {PERIODS.map(p => (
                <th key={p} className="text-right px-3 py-2.5 font-semibold" style={{ color: period === p ? "var(--accent-brand)" : "var(--text-muted)" }}>{p}</th>
              ))}
              <th className="text-right px-3 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>P/E</th>
              <th className="text-right px-3 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>Mkt Cap %</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((sector, i) => (
              <tr key={sector.name} style={{ borderBottom: i < sorted.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
                <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-primary)" }}>{sector.name}</td>
                {PERIODS.map(p => {
                  const r = sector.returns[p];
                  return (
                    <td key={p} className="text-right px-3 py-2.5 font-mono font-semibold"
                      style={{ color: r > 0 ? "#10B981" : r < 0 ? "#EF4444" : "var(--text-muted)" }}>
                      {r > 0 ? "+" : ""}{r.toFixed(1)}%
                    </td>
                  );
                })}
                <td className="text-right px-3 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>{sector.pe}</td>
                <td className="text-right px-3 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>{sector.marketCap}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
