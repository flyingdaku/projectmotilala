"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { formatINR } from "@/lib/utils";

const PERF_DATA = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(2023, 3 + i, 1);
  const portfolio = 1000000 * Math.pow(1 + 0.015 + Math.sin(i * 0.4) * 0.02, i);
  const nifty = 1000000 * Math.pow(1 + 0.012 + Math.cos(i * 0.3) * 0.015, i);
  return {
    month: date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
    portfolio: Math.round(portfolio),
    nifty: Math.round(nifty),
    drawdown: Math.min(0, (Math.sin(i * 0.6) - 0.5) * 0.08) * 100,
  };
});

const HOLDINGS_PERF = [
  { symbol: "INFY", name: "Infosys Ltd", weight: 18.4, invested: 86225, current: 102480, xirr: 24.8, pnl: 16255 },
  { symbol: "RELIANCE", name: "Reliance Industries", weight: 14.2, invested: 28914, current: 34200, xirr: 19.2, pnl: 5286 },
  { symbol: "WIPRO", name: "Wipro Ltd", weight: 12.8, invested: 102560, current: 94200, xirr: -8.4, pnl: -8360 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", weight: 10.4, invested: 36170, current: 44820, xirr: 28.6, pnl: 8650 },
  { symbol: "SUNPHARMA", name: "Sun Pharma", weight: 9.6, invested: 49269, current: 62400, xirr: 32.4, pnl: 13131 },
];

const SUMMARY = {
  invested: 748000,
  current: 892400,
  pnl: 144400,
  pnlPct: 19.3,
  xirr: 22.4,
  alpha: 4.2,
  beta: 0.94,
  sharpe: 1.42,
};

export default function PerformancePage() {
  const [period, setPeriod] = useState<"1Y" | "2Y" | "MAX">("2Y");

  const slicedData = period === "1Y" ? PERF_DATA.slice(-12) : period === "2Y" ? PERF_DATA : PERF_DATA;

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Portfolio Performance</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Risk-adjusted returns, XIRR, and benchmark comparison.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Portfolio Value", value: formatINR(SUMMARY.current), sub: `Invested ${formatINR(SUMMARY.invested)}`, color: "var(--text-primary)" },
          { label: "Total P&L", value: `+${formatINR(SUMMARY.pnl)}`, sub: `+${SUMMARY.pnlPct}% overall`, color: "#10B981" },
          { label: "XIRR", value: `${SUMMARY.xirr}%`, sub: `Alpha ${SUMMARY.alpha}% vs Nifty`, color: "#F59E0B" },
          { label: "Sharpe Ratio", value: SUMMARY.sharpe, sub: `Beta ${SUMMARY.beta}`, color: "var(--text-primary)" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="rounded-xl p-4 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
            <div className="text-xl font-bold font-mono" style={{ color }}>{value}</div>
            <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Portfolio vs Nifty 50</h3>
          <div className="flex gap-1">
            {(["1Y", "2Y", "MAX"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  background: period === p ? "var(--accent-subtle)" : "transparent",
                  color: period === p ? "var(--accent-brand)" : "var(--text-muted)",
                  border: `1px solid ${period === p ? "var(--accent-brand)" : "var(--border)"}`,
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={slicedData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="niftyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={60}
                tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                formatter={(v: unknown) => [formatINR(v as number)]} />
              <Area type="monotone" dataKey="portfolio" stroke="#F59E0B" fill="url(#portGrad)" strokeWidth={2} dot={false} name="Portfolio" />
              <Area type="monotone" dataKey="nifty" stroke="#3B82F6" fill="url(#niftyGrad)" strokeWidth={1.5} dot={false} name="Nifty 50" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-6 h-0.5 inline-block rounded" style={{ background: "#F59E0B" }} />Portfolio</span>
          <span className="flex items-center gap-1.5"><span className="w-6 h-px inline-block rounded border-t-2 border-dashed" style={{ borderColor: "#3B82F6" }} />Nifty 50</span>
        </div>
      </div>

      {/* Holdings contribution */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b text-sm font-semibold" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Top Holdings Performance
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
              {["Symbol", "Weight", "Invested", "Current", "P&L", "XIRR"].map(h => (
                <th key={h} className={`py-2.5 font-semibold ${h === "Symbol" ? "text-left px-4" : "text-right px-4"}`} style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOLDINGS_PERF.map((h, i) => (
              <tr key={h.symbol} style={{ borderBottom: i < HOLDINGS_PERF.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
                <td className="px-4 py-3">
                  <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{h.symbol}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{h.name}</div>
                </td>
                <td className="text-right px-4 py-3 font-mono" style={{ color: "var(--text-secondary)" }}>{h.weight}%</td>
                <td className="text-right px-4 py-3 font-mono" style={{ color: "var(--text-secondary)" }}>{formatINR(h.invested)}</td>
                <td className="text-right px-4 py-3 font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{formatINR(h.current)}</td>
                <td className={`text-right px-4 py-3 font-mono font-semibold ${h.pnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {h.pnl >= 0 ? "+" : ""}₹{Math.abs(h.pnl).toLocaleString("en-IN")}
                </td>
                <td className={`text-right px-4 py-3 font-mono font-bold ${h.xirr >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {h.xirr >= 0 ? "+" : ""}{h.xirr}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
