"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { PeerComparison } from "@/lib/data/types";

const METRICS = [
  { key: "peTtm", label: "P/E (TTM)", suffix: "x" },
  { key: "pb", label: "P/B", suffix: "x" },
  { key: "roce", label: "ROCE", suffix: "%" },
  { key: "roe", label: "ROE", suffix: "%" },
  { key: "patMargin", label: "PAT Margin", suffix: "%" },
  { key: "revenueGrowth1y", label: "Rev. Growth 1Y", suffix: "%" },
  { key: "debtEquity", label: "D/E", suffix: "x" },
  { key: "dividendYield", label: "Div. Yield", suffix: "%" },
];

function fmt(v: number | null | undefined, suffix: string) {
  if (v == null) return "—";
  return `${v.toFixed(2)}${suffix}`;
}

function DiffBadge({ val, base }: { val: number | null; base: number | null }) {
  if (val == null || base == null || base === 0) return <span className="text-muted-foreground text-xs">—</span>;
  const diff = ((val - base) / Math.abs(base)) * 100;
  if (diff > 5) return <TrendingUp size={11} className="text-green-400" />;
  if (diff < -5) return <TrendingDown size={11} className="text-red-400" />;
  return <Minus size={11} className="text-muted-foreground" />;
}

interface Props {
  symbol: string;
  currentRatios: {
    peTtm?: number | null;
    roce?: number | null;
    roe?: number | null;
    pb?: number | null;
    debtEquity?: number | null;
    dividendYield?: number | null;
    marketCapCr?: number | null;
  } | null;
}

export function PeersSection({ symbol, currentRatios }: Props) {
  const [peers, setPeers] = useState<PeerComparison[]>([]);
  const [chartMetric, setChartMetric] = useState<string>("peTtm");
  const [loadedSymbol, setLoadedSymbol] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/stocks/${symbol}/peers`)
      .then((r) => r.json())
      .then((d) => {
        setPeers(d.peers ?? []);
        setLoadedSymbol(symbol);
      });
  }, [symbol]);

  const loading = loadedSymbol !== symbol;

  const chartMetricDef = METRICS.find((m) => m.key === chartMetric) ?? METRICS[0];

  const chartData = [
    ...(currentRatios ? [{ name: symbol, value: (currentRatios as Record<string, number | null>)[chartMetric] ?? 0, isSelf: true }] : []),
    ...peers.map((p) => ({
      name: p.nseSymbol ?? p.name.slice(0, 8),
      value: ((p as unknown as Record<string, number | null>)[chartMetric]) ?? 0,
      isSelf: false,
    })),
  ];

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
  };

  if (loading) {
    return (
      <section id="peers" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  if (peers.length === 0) {
    return (
      <section id="peers" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-32"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No peer data available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="peers" className="scroll-mt-28 space-y-4">
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Competitive Positioning</h2>
          <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border overflow-x-auto">
            {METRICS.slice(0, 5).map((m) => (
              <button key={m.key} onClick={() => setChartMetric(m.key)}
                className={`flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${chartMetric === m.key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart comparison */}
        <div className="h-56 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                tickFormatter={(v) => `${v}${chartMetricDef.suffix}`} width={44} />
              <Tooltip contentStyle={tooltipStyle}
                formatter={(v: unknown) => [`${(v as number).toFixed(2)}${chartMetricDef.suffix}`, chartMetricDef.label]} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}
                fill="var(--accent-brand)"
                label={false}>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>Company</th>
                {METRICS.map((m) => (
                  <th key={m.key} className="text-right py-2 px-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{m.label}</th>
                ))}
                <th className="text-right py-2 px-2 font-semibold" style={{ color: "var(--text-muted)" }}>Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {/* Self row highlighted */}
              {currentRatios && (
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--accent-subtle)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--accent-brand)" }}>
                    {symbol} ★
                  </td>
                  {METRICS.map((m) => {
                    const val = (currentRatios as Record<string, number | null>)[m.key] ?? null;
                    return (
                      <td key={m.key} className="text-right py-2.5 px-2 font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                        {fmt(val, m.suffix)}
                      </td>
                    );
                  })}
                  <td className="text-right py-2.5 px-2 font-mono" style={{ color: "var(--text-primary)" }}>
                    {(currentRatios as Record<string, number | null>).marketCapCr
                      ? `₹${((currentRatios as Record<string, number | null>).marketCapCr! / 100).toFixed(0)}B`
                      : "—"}
                  </td>
                </tr>
              )}

              {peers.map((p, i) => {
                const peerRatios = p as unknown as Record<string, number | null | string>;
                return (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}
                    className="hover:bg-[var(--surface-elevated)] transition-colors">
                    <td className="py-2.5 pr-4">
                      <Link href={`/stocks/${p.nseSymbol ?? ""}`}
                        className="font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
                        {p.nseSymbol ?? p.name}
                      </Link>
                      <div className="text-xs truncate max-w-28" style={{ color: "var(--text-muted)" }}>{p.name}</div>
                    </td>
                    {METRICS.map((m) => {
                      const val = peerRatios[m.key] as number | null;
                      const baseVal = currentRatios ? (currentRatios as Record<string, number | null>)[m.key] ?? null : null;
                      return (
                        <td key={m.key} className="text-right py-2.5 px-2">
                          <div className="flex items-center justify-end gap-1">
                            <span className="font-mono" style={{ color: "var(--text-primary)" }}>{fmt(val, m.suffix)}</span>
                            <DiffBadge val={val} base={baseVal} />
                          </div>
                        </td>
                      );
                    })}
                    <td className="text-right py-2.5 px-2 font-mono" style={{ color: "var(--text-muted)" }}>
                      {peerRatios.marketCapCr
                        ? `₹${((peerRatios.marketCapCr as number) / 100).toFixed(0)}B`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
