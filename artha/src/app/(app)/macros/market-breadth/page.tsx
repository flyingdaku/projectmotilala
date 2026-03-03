"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";

const BREADTH_HISTORY = Array.from({ length: 60 }, (_, i) => {
  const date = new Date(2025, 3, 1);
  date.setDate(date.getDate() + i);
  const adv = Math.round(800 + Math.sin(i * 0.3) * 300 + Math.random() * 200);
  const dec = Math.round(1200 - adv + Math.random() * 100);
  const unch = 500 - Math.abs(adv - dec) / 10;
  return {
    date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    advancing: adv,
    declining: dec,
    unchanged: Math.max(0, Math.round(unch)),
    adRatio: +(adv / (adv + dec)).toFixed(3),
    nifty: 21000 + i * 40 + Math.sin(i * 0.2) * 400,
  };
});

const TODAY = BREADTH_HISTORY[BREADTH_HISTORY.length - 1];

const INDICES = [
  { name: "Nifty 50", advancing: 31, declining: 19, unchanged: 0 },
  { name: "Nifty 500", advancing: 312, declining: 174, unchanged: 14 },
  { name: "Nifty Midcap 150", advancing: 94, declining: 52, unchanged: 4 },
  { name: "Nifty Smallcap 250", advancing: 148, declining: 94, unchanged: 8 },
  { name: "BSE 500", advancing: 318, declining: 172, unchanged: 10 },
];

export default function MarketBreadthPage() {
  const [view, setView] = useState<"adline" | "ratio">("adline");

  const adLineData = useMemo(() => {
    let cumAD = 0;
    return BREADTH_HISTORY.map(d => {
      cumAD += d.advancing - d.declining;
      return { ...d, adLine: cumAD };
    });
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Market Breadth</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Advance-decline ratio, cumulative breadth line, and market internals.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Advancing", value: TODAY.advancing, color: "#10B981", icon: TrendingUp },
          { label: "Declining", value: TODAY.declining, color: "#EF4444", icon: TrendingDown },
          { label: "Unchanged", value: TODAY.unchanged, color: "var(--text-muted)", icon: Activity },
          { label: "A/D Ratio", value: TODAY.adRatio.toFixed(2), color: TODAY.adRatio > 1 ? "#10B981" : "#EF4444", icon: Activity },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="rounded-xl p-4 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} style={{ color }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
            </div>
            <div className="text-2xl font-bold font-mono" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* View toggle + Chart */}
      <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {view === "adline" ? "Cumulative Advance-Decline Line" : "Daily A/D Ratio (60 days)"}
          </h3>
          <div className="flex gap-1">
            {(["adline", "ratio"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  background: view === v ? "var(--accent-subtle)" : "transparent",
                  color: view === v ? "var(--accent-brand)" : "var(--text-muted)",
                  border: `1px solid ${view === v ? "var(--accent-brand)" : "var(--border)"}`,
                }}>
                {v === "adline" ? "A/D Line" : "A/D Ratio"}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {view === "adline" ? (
              <AreaChart data={adLineData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="adGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} interval={9} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={48} />
                <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="adLine" stroke="#10B981" fill="url(#adGrad)" strokeWidth={2} dot={false} name="A/D Line" />
              </AreaChart>
            ) : (
              <BarChart data={BREADTH_HISTORY.slice(-30)} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={40} domain={[0, 2]} />
                <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} formatter={(v: unknown) => (v as number).toFixed(2)} />
                <ReferenceLine y={1} stroke="#F59E0B" strokeDasharray="4 2" label={{ value: "1.0", fill: "#F59E0B", fontSize: 10 }} />
                <Bar dataKey="adRatio" fill="#3B82F6" radius={[2, 2, 0, 0]} name="A/D Ratio" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-index breadth */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b text-sm font-semibold" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Breadth by Index
        </div>
        {INDICES.map((idx, i) => {
          const total = idx.advancing + idx.declining + idx.unchanged;
          const advPct = (idx.advancing / total) * 100;
          const decPct = (idx.declining / total) * 100;
          return (
            <div key={idx.name} className="px-4 py-3 flex items-center gap-4"
              style={{ borderBottom: i < INDICES.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
              <div className="w-40 shrink-0 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{idx.name}</div>
              <div className="flex-1 flex h-4 rounded-full overflow-hidden gap-0.5">
                <div className="rounded-l-full transition-all" style={{ width: `${advPct}%`, background: "#10B981" }} title={`${idx.advancing} advancing`} />
                <div className="rounded-r-full transition-all" style={{ width: `${decPct}%`, background: "#EF4444" }} title={`${idx.declining} declining`} />
              </div>
              <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                <span className="text-emerald-500">▲ {idx.advancing}</span>
                <span className="text-rose-500">▼ {idx.declining}</span>
                {idx.unchanged > 0 && <span style={{ color: "var(--text-muted)" }}>— {idx.unchanged}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
