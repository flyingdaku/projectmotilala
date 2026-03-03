"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Play, BarChart2 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ASSET_LABELS, AssetKey, runBacktest, rollingReturns,
  BacktestResult, START_YEAR, END_YEAR,
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

type ResultTab = "summary" | "growth" | "rolling" | "annual" | "drawdown" | "heatmap";
const RESULT_TABS: { id: ResultTab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "growth", label: "Growth" },
  { id: "rolling", label: "Rolling" },
  { id: "annual", label: "Annual" },
  { id: "drawdown", label: "Drawdown" },
  { id: "heatmap", label: "Heat Map" },
];

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];
const PORTFOLIO_COLORS = ["var(--accent-brand)", "#6366f1", "#f59e0b"];
const YEAR_OPTIONS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

interface Asset { id: string; key: AssetKey; pct: number; }
interface Portfolio { id: string; label: string; color: string; assets: Asset[]; }

function newPortfolio(label: string, color: string): Portfolio {
  return { id: Math.random().toString(36).slice(2), label, color, assets: [{ id: Math.random().toString(36).slice(2), key: "nifty50", pct: 100 }] };
}

function fmtPct(v: number) { return `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`; }
function fmtRatio(v: number) { return v.toFixed(2); }

const SUMMARY_ROWS: { label: string; key: keyof BacktestResult; fmt: (v: number) => string; desc: string }[] = [
  { label: "CAGR", key: "cagr", fmt: fmtPct, desc: "Compound Annual Growth Rate" },
  { label: "Total Return", key: "totalReturn", fmt: fmtPct, desc: "Total return over the period" },
  { label: "Final Value", key: "finalValue", fmt: (v) => formatINR(v), desc: "Final portfolio value" },
  { label: "Std Deviation", key: "stdDev", fmt: fmtRatio, desc: "Annual return standard deviation (%)" },
  { label: "Sharpe Ratio", key: "sharpe", fmt: fmtRatio, desc: "Risk-adjusted return vs risk-free rate" },
  { label: "Sortino Ratio", key: "sortino", fmt: fmtRatio, desc: "Downside risk-adjusted return" },
  { label: "Calmar Ratio", key: "calmar", fmt: fmtRatio, desc: "CAGR / Max Drawdown" },
  { label: "Max Drawdown", key: "maxDrawdown", fmt: fmtPct, desc: "Largest peak-to-trough decline" },
  { label: "Best Year", key: "bestYearReturn", fmt: fmtPct, desc: "Highest single-year return" },
  { label: "Worst Year", key: "worstYearReturn", fmt: fmtPct, desc: "Lowest single-year return" },
  { label: "Positive Years", key: "positiveYears", fmt: (v) => String(v), desc: "Years with positive returns" },
  { label: "Negative Years", key: "negativeYears", fmt: (v) => String(v), desc: "Years with negative returns" },
];

const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
const ttSt = { contentStyle: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" } };

export default function BacktestPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([newPortfolio("Portfolio A", PORTFOLIO_COLORS[0])]);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<BacktestResult[] | null>(null);
  const [resultTab, setResultTab] = useState<ResultTab>("summary");
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2024);
  const [mode, setMode] = useState<"lumpsum" | "sip">("lumpsum");
  const [initialAmount, setInitialAmount] = useState(1000000);
  const [sipAmount, setSipAmount] = useState(10000);
  const [rollingWindow, setRollingWindow] = useState(5);

  function addPortfolio() {
    if (portfolios.length >= 3) return;
    setPortfolios((p) => [...p, newPortfolio(`Portfolio ${String.fromCharCode(65 + p.length)}`, PORTFOLIO_COLORS[p.length] ?? "#f59e0b")]);
  }
  function removePortfolio(id: string) { setPortfolios((p) => p.filter((x) => x.id !== id)); }
  function addAsset(portId: string) {
    setPortfolios((p) => p.map((port) => port.id === portId ? { ...port, assets: [...port.assets, { id: Math.random().toString(36).slice(2), key: "gold" as AssetKey, pct: 0 }] } : port));
  }
  function removeAsset(portId: string, assetId: string) {
    setPortfolios((p) => p.map((port) => port.id === portId ? { ...port, assets: port.assets.filter((a) => a.id !== assetId) } : port));
  }
  function updateAsset(portId: string, assetId: string, field: "key" | "pct", value: string | number) {
    setPortfolios((p) => p.map((port) => port.id === portId ? { ...port, assets: port.assets.map((a) => a.id === assetId ? { ...a, [field]: value } : a) } : port));
  }

  function handleRun() {
    setRunning(true);
    setResults(null);
    setTimeout(() => {
      const res = portfolios.map((port) =>
        runBacktest({ allocations: port.assets.map((a) => ({ asset: a.key, weight: a.pct })), startYear, endYear, initialAmount, mode, sipAmount })
      );
      setRunning(false);
      setResults(res);
      setResultTab("summary");
    }, 400);
  }

  const growthData = useMemo(() => {
    if (!results) return [];
    return results[0].yearlyData.map((d, i) => {
      const row: Record<string, number | string> = { year: d.year };
      results.forEach((r, ri) => { row[portfolios[ri]?.label ?? `P${ri}`] = r.yearlyData[i]?.value ?? 0; });
      return row;
    });
  }, [results, portfolios]);

  const annualData = useMemo(() => {
    if (!results) return [];
    return results[0].yearlyData.map((d, i) => {
      const row: Record<string, number | string> = { year: d.year };
      results.forEach((r, ri) => { row[portfolios[ri]?.label ?? `P${ri}`] = r.yearlyData[i]?.annualReturn ?? 0; });
      return row;
    });
  }, [results, portfolios]);

  const drawdownData = useMemo(() => {
    if (!results) return [];
    return results[0].yearlyData.map((d, i) => {
      const row: Record<string, number | string> = { year: d.year };
      results.forEach((r, ri) => { row[portfolios[ri]?.label ?? `P${ri}`] = r.yearlyData[i]?.drawdown ?? 0; });
      return row;
    });
  }, [results, portfolios]);

  const rollingData = useMemo(() => {
    if (!results) return [];
    const allRolling = portfolios.map((port) =>
      rollingReturns(port.assets.map((a) => ({ asset: a.key, weight: a.pct })), startYear, endYear, rollingWindow)
    );
    const maxLen = Math.max(...allRolling.map((r) => r.length));
    return Array.from({ length: maxLen }, (_, i) => {
      const row: Record<string, number | string> = { year: allRolling[0][i]?.year ?? "" };
      allRolling.forEach((r, ri) => { row[portfolios[ri]?.label ?? `P${ri}`] = r[i]?.cagr ?? 0; });
      return row;
    });
  }, [results, portfolios, startYear, endYear, rollingWindow]);

  // Heatmap: rows = portfolios, cols = years
  const heatmapYears = useMemo(() => results ? results[0].yearlyData.map((d) => d.year) : [], [results]);
  function heatColor(v: number) {
    if (v >= 30) return "#16a34a";
    if (v >= 15) return "#22c55e";
    if (v >= 5) return "#86efac";
    if (v >= 0) return "#dcfce7";
    if (v >= -10) return "#fecaca";
    if (v >= -25) return "#f87171";
    return "#dc2626";
  }

  return (
    <div className="flex gap-5 h-[calc(100vh-112px)]">
      {/* Left panel — config */}
      <div
        className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {portfolios.map((port, pi) => {
            const total = port.assets.reduce((s, a) => s + Number(a.pct), 0);
            const valid = Math.abs(total - 100) < 0.5;
            return (
              <div
                key={port.id}
                className="rounded-lg border p-3 space-y-2"
                style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: port.color }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{port.label}</span>
                  </div>
                  {pi > 0 && <button onClick={() => removePortfolio(port.id)}><X size={13} style={{ color: "var(--text-muted)" }} /></button>}
                </div>
                {port.assets.map((asset) => (
                  <div key={asset.id} className="flex items-center gap-1.5">
                    <select value={asset.key} onChange={(e) => updateAsset(port.id, asset.id, "key", e.target.value)} className={inputCls + " flex-1"} style={inputSt}>
                      {ASSET_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                    </select>
                    <div className="flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-[68px]" style={inputSt}>
                      <input type="number" min={0} max={100} value={asset.pct} onChange={(e) => updateAsset(port.id, asset.id, "pct", Number(e.target.value))} className="bg-transparent text-xs w-full outline-none font-mono text-right" style={{ color: "var(--text-primary)" }} />
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>%</span>
                    </div>
                    {port.assets.length > 1 && <button onClick={() => removeAsset(port.id, asset.id)}><X size={11} style={{ color: "var(--text-muted)" }} /></button>}
                  </div>
                ))}
                <div className="flex items-center justify-between pt-0.5">
                  <button onClick={() => addAsset(port.id)} className="text-xs flex items-center gap-1" style={{ color: "var(--accent-brand)" }}><Plus size={11} /> Add asset</button>
                  <span className="text-xs font-mono" style={{ color: valid ? "var(--positive)" : "var(--negative)" }}>{total.toFixed(0)}%{valid ? " ✓" : ""}</span>
                </div>
              </div>
            );
          })}
          {portfolios.length < 3 && (
            <button onClick={addPortfolio} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-xs font-medium" style={{ borderColor: "var(--border)", borderStyle: "dashed", color: "var(--text-muted)" }}>
              <Plus size={12} /> Compare Portfolio
            </button>
          )}

          {/* Settings accordion */}
          <div className="rounded-lg border p-3 space-y-3" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Settings</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Start Year</label>
                <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>End Year</label>
                <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {YEAR_OPTIONS.filter((y) => y > startYear).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-1">
              {(["lumpsum", "sip"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={mode === m ? { background: "var(--accent-brand)", color: "var(--accent-foreground)" } : { background: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                  {m === "sip" ? "SIP" : "Lump Sum"}
                </button>
              ))}
            </div>
            {mode === "lumpsum" ? (
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Initial Amount (₹)</label>
                <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
              </div>
            ) : (
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Monthly SIP (₹)</label>
                <input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
              </div>
            )}
          </div>
        </div>

        {/* Run button */}
        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Running…</>) : (<><Play size={14} /> Run Backtest</>)}
          </button>
        </div>
      </div>

      {/* Right panel — results */}
      <div className="flex-1 min-w-0 flex flex-col rounded-xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {!results && !running && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--surface-elevated)" }}
            >
              <BarChart2 size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <div className="text-center max-w-xs">
              <p className="text-base font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                Configure & Run
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Set up your portfolio allocation on the left and click Run Backtest to see results.
              </p>
            </div>
          </div>
        )}

        {running && (
          <div className="flex-1 p-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-16" />)}
            </div>
          </div>
        )}

        {results && !running && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Result tabs */}
            <div
              className="flex items-center gap-1 p-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              {RESULT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setResultTab(tab.id)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
                  style={
                    resultTab === tab.id
                      ? { background: "var(--surface-elevated)", color: "var(--text-primary)", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }
                      : { color: "var(--text-muted)" }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                <motion.div key={resultTab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                  {/* Summary */}
                  {resultTab === "summary" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <th className="text-left text-xs font-medium py-2.5 px-3" style={{ color: "var(--text-muted)" }}>Metric</th>
                            {portfolios.map((p, i) => (
                              <th key={p.id} className="text-right text-xs font-medium py-2.5 px-3" style={{ color: p.color }}>
                                <span className="flex items-center justify-end gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />{p.label}</span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {SUMMARY_ROWS.map((row) => (
                            <tr key={row.key} style={{ borderBottom: "1px solid var(--border)" }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                              <td className="px-3 py-2.5" style={{ color: "var(--text-secondary)" }}>{row.label}</td>
                              {results.map((r, ri) => {
                                const val = r[row.key] as number;
                                return (
                                  <td key={ri} className="px-3 py-2.5 text-right font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                                    {row.fmt(val)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Growth chart */}
                  {resultTab === "growth" && (
                    <div style={{ height: 380 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                          <defs>
                            {portfolios.map((p, i) => (
                              <linearGradient key={p.id} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={p.color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={p.color} stopOpacity={0} />
                              </linearGradient>
                            ))}
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <Tooltip {...ttSt} formatter={(v: number | undefined) => formatINR(Number(v) || 0)} />
                          <Legend />
                          {portfolios.map((p, i) => (
                            <Area key={p.id} type="monotone" dataKey={p.label} stroke={p.color} fill={`url(#grad${i})`} strokeWidth={2} dot={false} />
                          ))}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Annual returns */}
                  {resultTab === "annual" && (
                    <div style={{ height: 380 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={annualData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <Tooltip {...ttSt} formatter={(v: number | undefined) => `${(Number(v) || 0).toFixed(1)}%`} />
                          <ReferenceLine y={0} stroke="var(--border-strong)" />
                          <Legend />
                          {portfolios.map((p) => (
                            <Bar key={p.id} dataKey={p.label} fill={p.color} radius={[2, 2, 0, 0]} maxBarSize={24} />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Rolling returns */}
                  {resultTab === "rolling" && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Window:</span>
                        {[3, 5, 7, 10].map((w) => (
                          <button key={w} onClick={() => setRollingWindow(w)} className="px-2.5 py-1 rounded text-xs font-medium"
                            style={rollingWindow === w ? { background: "var(--accent-brand)", color: "var(--accent-foreground)" } : { background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
                            {w}Y
                          </button>
                        ))}
                      </div>
                      <div style={{ height: 340 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={rollingData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                            <Tooltip {...ttSt} formatter={(v: number | undefined) => `${(Number(v) || 0).toFixed(1)}%`} />
                            <ReferenceLine y={0} stroke="var(--border-strong)" />
                            <Legend />
                            {portfolios.map((p) => (
                              <Line key={p.id} type="monotone" dataKey={p.label} stroke={p.color} strokeWidth={2} dot={false} />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Drawdown */}
                  {resultTab === "drawdown" && (
                    <div style={{ height: 380 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={drawdownData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                          <defs>
                            {portfolios.map((p, i) => (
                              <linearGradient key={p.id} id={`ddgrad${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={p.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={p.color} stopOpacity={0.05} />
                              </linearGradient>
                            ))}
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                          <Tooltip {...ttSt} formatter={(v: number | undefined) => `${(Number(v) || 0).toFixed(1)}%`} />
                          <ReferenceLine y={0} stroke="var(--border-strong)" />
                          <Legend />
                          {portfolios.map((p, i) => (
                            <Area key={p.id} type="monotone" dataKey={p.label} stroke={p.color} fill={`url(#ddgrad${i})`} strokeWidth={2} dot={false} />
                          ))}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Heat Map */}
                  {resultTab === "heatmap" && (
                    <div className="overflow-x-auto">
                      <table className="text-xs border-separate" style={{ borderSpacing: 2 }}>
                        <thead>
                          <tr>
                            <th className="px-2 py-1 text-left" style={{ color: "var(--text-muted)" }}>Portfolio</th>
                            {heatmapYears.map((y) => <th key={y} className="px-2 py-1 text-center font-normal" style={{ color: "var(--text-muted)" }}>{y}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {portfolios.map((port, pi) => (
                            <tr key={port.id}>
                              <td className="px-2 py-1 font-medium whitespace-nowrap" style={{ color: port.color }}>{port.label}</td>
                              {results[pi].yearlyData.map((d) => (
                                <td key={d.year} className="px-2 py-1.5 text-center rounded font-mono font-medium" style={{ background: heatColor(d.annualReturn), color: Math.abs(d.annualReturn) > 10 ? "#fff" : "#111", minWidth: 48 }}>
                                  {d.annualReturn > 0 ? "+" : ""}{d.annualReturn.toFixed(0)}%
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
