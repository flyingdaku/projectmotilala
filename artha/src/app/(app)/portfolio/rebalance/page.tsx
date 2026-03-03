"use client";

import { useState } from "react";
import { ArrowRight, AlertCircle, CheckCircle2, Sliders } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Holding {
  symbol: string;
  name: string;
  current: number;
  currentPct: number;
  target: number;
  value: number;
}

const PORTFOLIO_VALUE = 892400;

const INITIAL_HOLDINGS: Holding[] = [
  { symbol: "INFY", name: "Infosys Ltd", current: 18.4, currentPct: 18.4, target: 15, value: 164202 },
  { symbol: "RELIANCE", name: "Reliance Industries", current: 14.2, currentPct: 14.2, target: 15, value: 126721 },
  { symbol: "HDFCBANK", name: "HDFC Bank", current: 11.8, currentPct: 11.8, target: 15, value: 105303 },
  { symbol: "WIPRO", name: "Wipro Ltd", current: 12.8, currentPct: 12.8, target: 10, value: 114227 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", current: 10.4, currentPct: 10.4, target: 12, value: 92809 },
  { symbol: "SUNPHARMA", name: "Sun Pharma", current: 9.6, currentPct: 9.6, target: 10, value: 85670 },
  { symbol: "TCS", name: "Tata Consultancy", current: 8.2, currentPct: 8.2, target: 8, value: 73177 },
  { symbol: "AXISBANK", name: "Axis Bank", current: 7.8, currentPct: 7.8, target: 8, value: 69607 },
  { symbol: "MARUTI", name: "Maruti Suzuki", current: 6.8, currentPct: 6.8, target: 7, value: 60683 },
];

function deltaColor(delta: number) {
  if (Math.abs(delta) < 0.5) return "#10B981";
  if (Math.abs(delta) < 2) return "#F59E0B";
  return "#EF4444";
}

export default function RebalancePage() {
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);

  const totalTarget = holdings.reduce((s, h) => s + h.target, 0);

  const trades = holdings.map(h => {
    const targetValue = (h.target / 100) * PORTFOLIO_VALUE;
    const diff = targetValue - h.value;
    return { ...h, targetValue, diff, action: diff > 0 ? "BUY" : diff < 0 ? "SELL" : "HOLD" };
  }).filter(t => Math.abs(t.diff) > 500);

  const updateTarget = (symbol: string, val: number) => {
    setHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, target: val } : h));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Rebalance Portfolio</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Set target allocations and get actionable rebalancing trades.</p>
        </div>
        <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border"
          style={{ background: "var(--surface)", borderColor: Math.abs(totalTarget - 100) < 0.01 ? "#10B981" : "#EF4444" }}>
          {Math.abs(totalTarget - 100) < 0.01
            ? <CheckCircle2 size={14} className="text-emerald-500" />
            : <AlertCircle size={14} className="text-rose-500" />}
          <span style={{ color: Math.abs(totalTarget - 100) < 0.01 ? "#10B981" : "#EF4444" }}>
            Total: {totalTarget.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Allocation editor */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b flex items-center gap-2 text-sm font-semibold"
          style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          <Sliders size={14} />
          Target Allocations
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {holdings.map(h => {
            const delta = h.target - h.currentPct;
            return (
              <div key={h.symbol} className="flex items-center gap-4 px-4 py-3" style={{ background: "var(--surface)" }}>
                <div className="w-36 shrink-0">
                  <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{h.symbol}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{h.name}</div>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="text-xs font-mono w-14 shrink-0" style={{ color: "var(--text-muted)" }}>
                    Now {h.currentPct}%
                  </div>
                  <ArrowRight size={12} style={{ color: "var(--text-muted)" }} className="shrink-0" />
                  <input type="range" min={0} max={30} step={0.5} value={h.target}
                    onChange={e => updateTarget(h.symbol, parseFloat(e.target.value))}
                    className="flex-1 accent-amber-400 h-1.5 rounded" />
                  <div className="w-14 shrink-0 text-right">
                    <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{h.target}%</span>
                  </div>
                </div>
                <div className="w-16 text-right shrink-0">
                  <span className="text-xs font-mono font-semibold" style={{ color: deltaColor(delta) }}>
                    {delta >= 0 ? "+" : ""}{delta.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trade suggestions */}
      {trades.length > 0 && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <div className="px-4 py-3 border-b text-sm font-semibold" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
            Suggested Trades
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
                {["Symbol", "Action", "Current", "Target", "Trade Amount"].map(h => (
                  <th key={h} className={`py-2.5 font-semibold ${h === "Symbol" ? "text-left px-4" : "text-right px-4"}`}
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={t.symbol} style={{ borderBottom: i < trades.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>{t.symbol}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.action === "BUY" ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"}`}>
                      {t.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--text-muted)" }}>{t.currentPct}%</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--text-secondary)" }}>{t.target}%</td>
                  <td className={`px-4 py-3 text-right font-mono font-semibold ${t.action === "BUY" ? "text-emerald-500" : "text-rose-500"}`}>
                    {t.action === "BUY" ? "+" : "-"}{formatINR(Math.abs(t.diff))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
