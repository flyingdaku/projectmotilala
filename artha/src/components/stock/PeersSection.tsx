"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { ComputedRatios, PeerComparison } from "@/lib/data/types";

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

type CorrelationPeriod = "1y" | "3y" | "5y";

type PeerCorrelationResponse = {
  period: CorrelationPeriod;
  summary: {
    closestPeer: { symbol: string; name: string; correlation: number | null } | null;
    diversifier: { symbol: string; name: string; correlation: number | null } | null;
    averageCorrelation: number | null;
  };
  peers: Array<PeerComparison & { correlation: number | null; overlapDays: number }>;
  matrixSymbols: string[];
  matrix: Record<string, Record<string, number | null>>;
};

function corrColor(value: number | null | undefined) {
  if (value == null) return "var(--surface-elevated)";
  if (value >= 0.8) return "rgba(245, 158, 11, 0.20)";
  if (value >= 0.6) return "rgba(245, 158, 11, 0.14)";
  if (value >= 0.4) return "rgba(59, 130, 246, 0.14)";
  if (value >= 0.2) return "rgba(16, 185, 129, 0.14)";
  return "rgba(16, 185, 129, 0.20)";
}

function corrLabel(value: number | null | undefined) {
  if (value == null) return "Insufficient overlap";
  if (value >= 0.8) return "Moves very closely";
  if (value >= 0.6) return "Tracks fairly closely";
  if (value >= 0.4) return "Moderately related";
  if (value >= 0.2) return "Offers some diversification";
  return "Diversifies well";
}

interface Props {
  symbol: string;
  currentRatios: Partial<ComputedRatios> | null;
}

export function PeersSection({ symbol, currentRatios }: Props) {
  const [peers, setPeers] = useState<PeerComparison[]>([]);
  const [selfRatios, setSelfRatios] = useState<Partial<ComputedRatios> | null>(currentRatios);
  const [chartMetric, setChartMetric] = useState<string>("peTtm");
  const [correlationPeriod, setCorrelationPeriod] = useState<CorrelationPeriod>("1y");
  const [correlationData, setCorrelationData] = useState<PeerCorrelationResponse | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [loadedSymbol, setLoadedSymbol] = useState<string | null>(null);
  const [correlationKey, setCorrelationKey] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/stocks/${symbol}/peers`).then((r) => r.json()),
      fetch(`/api/stocks/${symbol}/analytics`).then((r) => r.json()),
    ])
      .then(([peersPayload, analyticsPayload]) => {
        setPeers(peersPayload.peers ?? []);
        setSelfRatios({
          ...currentRatios,
          ...(analyticsPayload?.ratios ?? {}),
        });
        setLoadedSymbol(symbol);
      })
      .catch(() => {
        setPeers([]);
        setSelfRatios(currentRatios);
        setLoadedSymbol(symbol);
      });
  }, [symbol, currentRatios]);

  useEffect(() => {
    const requestKey = `${symbol}-${correlationPeriod}`;
    fetch(`/api/stocks/${symbol}/peer-correlations?period=${correlationPeriod}`)
      .then((r) => r.json())
      .then((payload) => {
        setCorrelationData(payload);
        setCorrelationKey(requestKey);
      })
      .catch(() => {
        setCorrelationData(null);
        setCorrelationKey(requestKey);
      });
  }, [symbol, correlationPeriod]);

  const loading = loadedSymbol !== symbol;
  const correlationLoading = correlationKey !== `${symbol}-${correlationPeriod}`;
  const displayRatios = selfRatios ?? currentRatios;

  const chartMetricDef = METRICS.find((m) => m.key === chartMetric) ?? METRICS[0];

  const chartData = [
    ...(displayRatios ? [{ name: symbol, value: (displayRatios as Record<string, number | null>)[chartMetric] ?? 0, isSelf: true }] : []),
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
  const rankedCorrelations = [...(correlationData?.peers ?? [])]
    .filter((peer) => peer.correlation != null)
    .sort((left, right) => (right.correlation ?? -1) - (left.correlation ?? -1));

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
              {displayRatios && (
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--accent-subtle)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--accent-brand)" }}>
                    {symbol} ★
                  </td>
                  {METRICS.map((m) => {
                    const val = (displayRatios as Record<string, number | null>)[m.key] ?? null;
                    return (
                      <td key={m.key} className="text-right py-2.5 px-2 font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                        {fmt(val, m.suffix)}
                      </td>
                    );
                  })}
                  <td className="text-right py-2.5 px-2 font-mono" style={{ color: "var(--text-primary)" }}>
                    {(displayRatios as Record<string, number | null>).marketCapCr
                      ? `₹${((displayRatios as Record<string, number | null>).marketCapCr! / 100).toFixed(0)}B`
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
                      <Link href={`/stocks/${p.nseSymbol ?? p.symbol}`}
                        className="font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
                        {p.nseSymbol ?? p.symbol}
                      </Link>
                      <div className="text-xs truncate max-w-28" style={{ color: "var(--text-muted)" }}>{p.name}</div>
                    </td>
                    {METRICS.map((m) => {
                      const val = peerRatios[m.key] as number | null;
                      const baseVal = displayRatios ? (displayRatios as Record<string, number | null>)[m.key] ?? null : null;
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

        <div className="mt-6 border-t pt-6" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Peer Price Correlation</h3>
              <p className="mt-1 text-xs max-w-2xl" style={{ color: "var(--text-muted)" }}>
                Uses adjusted daily returns over overlapping trading sessions. Higher values mean the stocks tend to move together; lower values are usually better for diversification.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
                {(["1y", "3y", "5y"] as CorrelationPeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setCorrelationPeriod(period)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${correlationPeriod === period ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {period.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowMatrix((value) => !value)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--background)" }}
              >
                {showMatrix ? "Hide heatmap" : "View heatmap"}
              </button>
            </div>
          </div>

          {correlationLoading ? (
            <div className="mt-5 flex items-center justify-center h-36 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
              <div className="animate-spin w-6 h-6 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
            </div>
          ) : correlationData && rankedCorrelations.length > 0 ? (
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    label: "Moves Most Like",
                    symbol: correlationData.summary.closestPeer?.symbol ?? "—",
                    detail: correlationData.summary.closestPeer?.correlation != null
                      ? `${correlationData.summary.closestPeer.correlation.toFixed(2)} correlation`
                      : "No signal",
                    tone: corrColor(correlationData.summary.closestPeer?.correlation),
                  },
                  {
                    label: "Best Diversifier",
                    symbol: correlationData.summary.diversifier?.symbol ?? "—",
                    detail: correlationData.summary.diversifier?.correlation != null
                      ? `${correlationData.summary.diversifier.correlation.toFixed(2)} correlation`
                      : "No signal",
                    tone: corrColor(correlationData.summary.diversifier?.correlation),
                  },
                  {
                    label: "Peer Basket Average",
                    symbol: correlationData.summary.averageCorrelation != null
                      ? correlationData.summary.averageCorrelation.toFixed(2)
                      : "—",
                    detail: correlationData.summary.averageCorrelation != null
                      ? corrLabel(correlationData.summary.averageCorrelation)
                      : "No signal",
                    tone: corrColor(correlationData.summary.averageCorrelation),
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--border)", background: card.tone }}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>{card.label}</div>
                    <div className="mt-2 text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{card.symbol}</div>
                    <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>{card.detail}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {rankedCorrelations.map((peer) => {
                  const peerSymbol = peer.nseSymbol ?? peer.symbol;
                  const correlation = peer.correlation ?? 0;
                  const fillWidth = `${Math.max(10, ((correlation + 1) / 2) * 100)}%`;
                  return (
                    <div key={peerSymbol} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/stocks/${peerSymbol}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--text-primary)" }}>
                              {peerSymbol}
                            </Link>
                            <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: corrColor(peer.correlation), color: "var(--text-secondary)" }}>
                              {corrLabel(peer.correlation)}
                            </span>
                          </div>
                          <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            {peer.name} · {peer.overlapDays} overlapping sessions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                            {peer.correlation?.toFixed(2)}
                          </div>
                          <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>Correlation</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: fillWidth,
                            background: "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(245,158,11,0.95) 100%)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {showMatrix && correlationData.matrixSymbols.length > 1 && (
                <div className="rounded-xl border p-4 overflow-x-auto" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Correlation heatmap</div>
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr>
                        <th className="p-2 text-left" style={{ color: "var(--text-muted)" }}>Ticker</th>
                        {correlationData.matrixSymbols.map((col) => (
                          <th key={col} className="p-2 text-center font-medium" style={{ color: "var(--text-muted)" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.matrixSymbols.map((row) => (
                        <tr key={row}>
                          <td className="p-2 font-medium" style={{ color: "var(--text-primary)" }}>{row}</td>
                          {correlationData.matrixSymbols.map((col) => {
                            const value = correlationData.matrix[row]?.[col] ?? null;
                            return (
                              <td key={`${row}-${col}`} className="p-2">
                                <div
                                  className="mx-auto flex h-9 w-12 items-center justify-center rounded-lg font-mono"
                                  style={{
                                    background: corrColor(value),
                                    color: "var(--text-primary)",
                                  }}
                                >
                                  {value != null ? value.toFixed(2) : "—"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border px-4 py-6 text-sm" style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--text-muted)" }}>
              Not enough overlapping adjusted price history to compute a reliable peer-correlation view yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
