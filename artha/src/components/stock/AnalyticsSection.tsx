"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { TrendingUp, BarChart2 } from "lucide-react";
import type { FactorExposure, EarningsQuality, ComputedRatios } from "@/lib/data/types";

interface Props {
  symbol: string;
}

export function AnalyticsSection({ symbol }: Props) {
  const [data, setData] = useState<{
    factorExposure: FactorExposure | null;
    earningsQuality: EarningsQuality | null;
    ratioHistory: Partial<ComputedRatios>[];
    ratios: ComputedRatios | null;
  } | null>(null);
  const [activeMetric, setActiveMetric] = useState<"peTtm" | "pb" | "evEbitda" | "roce" | "roe">("peTtm");
  const [loadedSymbol, setLoadedSymbol] = useState<string | null>(null);

  const METRIC_LABELS: Record<string, string> = {
    peTtm: "P/E (TTM)",
    pb: "P/B",
    evEbitda: "EV/EBITDA",
    roce: "ROCE %",
    roe: "ROE %",
  };

  useEffect(() => {
    fetch(`/api/stocks/${symbol}/analytics`)
      .then((r) => r.json())
      .then((payload) => {
        setData(payload);
        setLoadedSymbol(symbol);
      });
  }, [symbol]);

  const loading = loadedSymbol !== symbol;

  const historicalChart = useMemo(() => {
    if (!data?.ratioHistory) return [];
    return [...data.ratioHistory].reverse().map((r) => ({
      date: (r.computedDate as string)?.slice(0, 7) ?? "",
      value: r[activeMetric] ?? null,
    })).filter((d) => d.value !== null);
  }, [data, activeMetric]);

  const currentVal = data?.ratios?.[activeMetric] ?? null;

  // Valuation band — ±1 σ of historical values
  const { mean, stddev } = useMemo(() => {
    const vals = historicalChart.map((d) => d.value as number).filter(Boolean);
    if (vals.length === 0) return { mean: null, stddev: null };
    const m = vals.reduce((a, b) => a + b, 0) / vals.length;
    const variance = vals.reduce((a, b) => a + (b - m) ** 2, 0) / vals.length;
    return { mean: m, stddev: Math.sqrt(variance) };
  }, [historicalChart]);

  // Factor radar data
  const factorRadar = useMemo(() => {
    if (!data?.factorExposure) return [];
    const fe = data.factorExposure;
    return [
      { metric: "Market β", value: Math.abs(fe.marketBeta ?? 0) * 50 },
      { metric: "Size (SMB)", value: ((fe.smbLoading ?? 0) + 2) * 25 },
      { metric: "Value (HML)", value: ((fe.hmlLoading ?? 0) + 2) * 25 },
      { metric: "Momentum", value: ((fe.wmlLoading ?? 0) + 2) * 25 },
      { metric: "Alpha", value: ((fe.alpha ?? 0) + 5) * 10 },
    ];
  }, [data]);

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
  };
  const axisStyle = { fontSize: 11, fill: "var(--text-muted)" };

  if (loading) {
    return (
      <section id="analytics" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="scroll-mt-28 space-y-4">
      {/* Valuation Band Chart */}
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Valuation Band</h2>
          <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border gap-0.5">
            {Object.entries(METRIC_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setActiveMetric(key as typeof activeMetric)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeMetric === key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {historicalChart.length === 0 ? (
          <div className="h-56 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
            No historical ratio data available
          </div>
        ) : (
          <>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={axisStyle} minTickGap={50} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} width={40} domain={["auto", "auto"]} />
                  <Tooltip contentStyle={tooltipStyle}
                    formatter={(v: unknown) => [`${(v as number).toFixed(2)}x`, METRIC_LABELS[activeMetric]]} />
                  {mean !== null && stddev !== null && (
                    <>
                      <ReferenceLine y={mean + stddev} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: "+1σ", fontSize: 10, fill: "#F59E0B" }} />
                      <ReferenceLine y={mean} stroke="var(--text-muted)" strokeDasharray="4 4" label={{ value: "Mean", fontSize: 10, fill: "var(--text-muted)" }} />
                      <ReferenceLine y={mean - stddev} stroke="#10B981" strokeDasharray="4 4" label={{ value: "-1σ", fontSize: 10, fill: "#10B981" }} />
                    </>
                  )}
                  {currentVal !== null && (
                    <ReferenceLine y={currentVal} stroke="var(--accent-brand)" strokeWidth={1.5} label={{ value: "Now", fontSize: 10, fill: "var(--accent-brand)" }} />
                  )}
                  <Line type="monotone" dataKey="value" stroke="var(--accent-brand)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Current vs Mean */}
            {mean !== null && currentVal !== null && (
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Current", val: currentVal, color: "var(--accent-brand)" },
                  { label: "5Y Mean", val: mean, color: "var(--text-muted)" },
                  { label: "vs Mean", val: ((currentVal - mean) / mean) * 100, color: currentVal < mean ? "#10B981" : "#EF4444", suffix: "%" },
                ].map((m, i) => (
                  <div key={i} className="p-2 rounded-lg" style={{ background: "var(--surface-elevated)" }}>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                    <div className="text-sm font-bold font-mono" style={{ color: m.color }}>
                      {m.suffix ? `${m.val >= 0 ? "+" : ""}${m.val.toFixed(1)}%` : m.val.toFixed(1) + "x"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Factor Exposure */}
      {data?.factorExposure && (
        <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={16} style={{ color: "var(--accent-brand)" }} />
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Factor Exposure</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "var(--surface-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              Carhart 4-Factor
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={factorRadar} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                  <Radar name="Factor" dataKey="value" stroke="var(--accent-brand)" fill="var(--accent-brand)" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {[
                { label: "Market Beta (β)", val: data.factorExposure.marketBeta, desc: "Sensitivity to market moves" },
                { label: "Size (SMB)", val: data.factorExposure.smbLoading, desc: "Small vs. large cap tilt" },
                { label: "Value (HML)", val: data.factorExposure.hmlLoading, desc: "Value vs. growth tilt" },
                { label: "Momentum (WML)", val: data.factorExposure.wmlLoading, desc: "Trend-following exposure" },
                { label: "Alpha (α)", val: data.factorExposure.alpha, desc: "Unexplained excess return" },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium" style={{ color: "var(--text-primary)" }}>{f.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{f.desc}</div>
                  </div>
                  <span className={`font-mono font-bold text-sm ${f.val && f.val > 0 ? "text-green-400" : f.val && f.val < 0 ? "text-red-400" : "text-muted-foreground"}`}>
                    {f.val != null ? (f.val >= 0 ? "+" : "") + f.val.toFixed(3) : "—"}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t text-xs flex justify-between" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "var(--text-muted)" }}>R² (model fit)</span>
                <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                  {data.factorExposure.rSquared != null ? (data.factorExposure.rSquared * 100).toFixed(1) + "%" : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Ratios Snapshot */}
      {data?.ratios && (
        <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <TrendingUp size={16} style={{ color: "var(--accent-brand)" }} />
            Valuation & Profitability
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "P/E (TTM)", val: data.ratios.peTtm, suffix: "x" },
              { label: "P/B", val: data.ratios.pb, suffix: "x" },
              { label: "EV/EBITDA", val: data.ratios.evEbitda, suffix: "x" },
              { label: "Mkt Cap (Cr)", val: data.ratios.marketCapCr, suffix: "", isCr: true },
              { label: "ROCE %", val: data.ratios.roce, suffix: "%" },
              { label: "ROE %", val: data.ratios.roe, suffix: "%" },
              { label: "OPM %", val: data.ratios.operatingMargin, suffix: "%" },
              { label: "Div. Yield", val: data.ratios.dividendYield, suffix: "%" },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                <div className="text-base font-bold font-mono" style={{ color: "var(--text-primary)" }}>
                  {m.val != null
                    ? m.isCr
                      ? m.val >= 1e5 ? `${(m.val / 1e5).toFixed(2)}L` : m.val.toFixed(0)
                      : `${m.val.toFixed(2)}${m.suffix}`
                    : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
