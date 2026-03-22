"use client";

import { useState, useMemo } from "react";
import { Play, Plus, X, TrendingUp, BarChart2, Table2, LineChart as LineChartIcon, ArrowDownRight } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell, Area, AreaChart
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, INDIA_CPI, START_YEAR, END_YEAR,
  runBacktest, BacktestConfig, BacktestResult, PortfolioAllocation,
  computeTopDrawdowns, computeRollingStats, rollingReturns
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

// ─── Lazy Portfolio Presets (India-adapted) ──────────────────────────────────

interface LazyPortfolio {
  id: string;
  name: string;
  description: string;
  allocations: PortfolioAllocation[];
}

const LAZY_PORTFOLIOS: LazyPortfolio[] = [
  { id: "nifty100", name: "100% Nifty 50", description: "Pure large-cap equity", allocations: [{ asset: "nifty50", weight: 100 }] },
  { id: "balanced6040", name: "Balanced 60/40", description: "Classic equity/debt split", allocations: [{ asset: "nifty50", weight: 60 }, { asset: "debt", weight: 40 }] },
  { id: "allweather", name: "All-Weather India", description: "Diversified across all asset classes", allocations: [{ asset: "nifty50", weight: 30 }, { asset: "niftyMidcap", weight: 15 }, { asset: "gold", weight: 15 }, { asset: "debt", weight: 40 }] },
  { id: "aggressive", name: "Aggressive Growth", description: "High equity, high risk", allocations: [{ asset: "nifty50", weight: 40 }, { asset: "niftyMidcap", weight: 40 }, { asset: "gold", weight: 10 }, { asset: "debt", weight: 10 }] },
  { id: "conservative", name: "Conservative", description: "Capital preservation focus", allocations: [{ asset: "nifty50", weight: 20 }, { asset: "gold", weight: 15 }, { asset: "debt", weight: 65 }] },
  { id: "goldhedge", name: "Gold-Hedged Equity", description: "Equity with gold hedge", allocations: [{ asset: "nifty50", weight: 50 }, { asset: "gold", weight: 25 }, { asset: "debt", weight: 25 }] },
  { id: "midcapTilt", name: "Midcap Tilt", description: "Overweight midcaps for alpha", allocations: [{ asset: "nifty50", weight: 25 }, { asset: "niftyMidcap", weight: 50 }, { asset: "debt", weight: 25 }] },
];

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];
const COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#a855f7", "#eab308", "#06b6d4", "#ec4899"];

type TabKey = "growth" | "returns" | "drawdowns" | "rolling" | "metrics";

// ─── Component ───────────────────────────────────────────────────────────────

export default function AssetAllocationPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{ custom: BacktestResult; comparisons: { portfolio: LazyPortfolio; result: BacktestResult }[] } | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("growth");

  // Config
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [initialAmount, setInitialAmount] = useState(1000000);
  const [mode, setMode] = useState<"lumpsum" | "sip">("lumpsum");
  const [sipAmount, setSipAmount] = useState(10000);
  const [stepUpPct, setStepUpPct] = useState(0);
  const [benchmark, setBenchmark] = useState<AssetKey>("nifty50");
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [logScale, setLogScale] = useState(false);

  // Custom portfolio
  const [allocations, setAllocations] = useState<{ id: string; asset: AssetKey; weight: number }[]>([
    { id: "1", asset: "nifty50", weight: 50 },
    { id: "2", asset: "niftyMidcap", weight: 20 },
    { id: "3", asset: "gold", weight: 10 },
    { id: "4", asset: "debt", weight: 20 },
  ]);

  // Comparison lazy portfolios
  const [selectedLazy, setSelectedLazy] = useState<string[]>(["balanced6040", "allweather"]);

  const totalWeight = allocations.reduce((s, a) => s + a.weight, 0);
  const isValid = Math.abs(totalWeight - 100) < 0.01 && startYear < endYear;

  function addAllocation() { setAllocations([...allocations, { id: Math.random().toString(), asset: "gold", weight: 0 }]); }
  function updateAllocation(id: string, field: "asset" | "weight", value: string | number) {
    setAllocations(allocations.map(a => a.id === id ? { ...a, [field]: value } : a));
  }
  function removeAllocation(id: string) { setAllocations(allocations.filter(a => a.id !== id)); }

  function toggleLazy(id: string) {
    setSelectedLazy(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function loadPreset(portfolio: LazyPortfolio) {
    setAllocations(portfolio.allocations.map((a, i) => ({ id: `preset-${i}`, asset: a.asset, weight: a.weight })));
  }

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      const customAllocs: PortfolioAllocation[] = allocations.map(a => ({ asset: a.asset, weight: a.weight }));
      const config: BacktestConfig = {
        allocations: customAllocs,
        startYear, endYear, initialAmount, mode,
        sipAmount, stepUpPct, benchmark, inflationAdjusted,
      };
      const customResult = runBacktest(config);

      const comparisons = selectedLazy
        .map(id => LAZY_PORTFOLIOS.find(p => p.id === id))
        .filter(Boolean)
        .map(portfolio => ({
          portfolio: portfolio!,
          result: runBacktest({ ...config, allocations: portfolio!.allocations }),
        }));

      setResults({ custom: customResult, comparisons });
      setRunning(false);
    }, 100);
  }

  // ── Derived chart data ──
  const growthData = useMemo(() => {
    if (!results) return [];
    const years = results.custom.yearlyData;
    return years.map((d, i) => {
      const row: Record<string, number> = { year: d.year, "My Portfolio": d.value };
      if (d.benchmarkValue !== undefined) row[ASSET_LABELS[benchmark]] = d.benchmarkValue;
      for (const c of results.comparisons) {
        row[c.portfolio.name] = c.result.yearlyData[i]?.value ?? 0;
      }
      return row;
    });
  }, [results, benchmark]);

  const returnsData = useMemo(() => {
    if (!results) return [];
    return results.custom.yearlyData.map((d, i) => {
      const row: Record<string, number> = { year: d.year, "My Portfolio": d.annualReturn };
      for (const c of results.comparisons) {
        row[c.portfolio.name] = c.result.yearlyData[i]?.annualReturn ?? 0;
      }
      return row;
    });
  }, [results]);

  const drawdownData = useMemo(() => {
    if (!results) return [];
    return results.custom.yearlyData.map((d, i) => {
      const row: Record<string, number> = { year: d.year, "My Portfolio": d.drawdown };
      if (d.benchmarkDrawdown !== undefined) row[ASSET_LABELS[benchmark]] = d.benchmarkDrawdown;
      for (const c of results.comparisons) {
        row[c.portfolio.name] = c.result.yearlyData[i]?.drawdown ?? 0;
      }
      return row;
    });
  }, [results, benchmark]);

  const rollingData = useMemo(() => {
    if (!results) return [];
    const customAllocs: PortfolioAllocation[] = allocations.map(a => ({ asset: a.asset, weight: a.weight }));
    const rolls = rollingReturns(customAllocs, startYear, endYear, 5, benchmark, inflationAdjusted);
    return rolls.map(r => ({
      year: r.year,
      "My Portfolio": r.cagr,
      ...(r.benchmarkCagr !== undefined ? { [ASSET_LABELS[benchmark]]: r.benchmarkCagr } : {}),
    }));
  }, [results, allocations, startYear, endYear, benchmark, inflationAdjusted]);

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" };

  const allSeriesKeys = useMemo(() => {
    const keys = ["My Portfolio"];
    if (results) {
      keys.push(ASSET_LABELS[benchmark]);
      for (const c of results.comparisons) keys.push(c.portfolio.name);
    }
    return keys;
  }, [results, benchmark]);

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Backtest Asset Allocation</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Compare your portfolio against Indian lazy portfolios using historical data (1990–{END_YEAR}).</p>

          {/* Time Period & Investment */}
          <Section title="Investment Parameters">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start Year">
                <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {Array.from({ length: END_YEAR - START_YEAR }, (_, i) => START_YEAR + i).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="End Year">
                <select value={endYear} onChange={e => setEndYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {Array.from({ length: END_YEAR - startYear + 1 }, (_, i) => startYear + 1 + i).filter(y => y <= END_YEAR).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Investment Mode">
              <select value={mode} onChange={e => setMode(e.target.value as "lumpsum" | "sip")} className={inputCls} style={inputSt}>
                <option value="lumpsum">Lump Sum</option>
                <option value="sip">SIP (Monthly)</option>
              </select>
            </Field>
            <Field label="Initial Amount (₹)">
              <input type="number" value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
            </Field>
            {mode === "sip" && (
              <div className="grid grid-cols-2 gap-2">
                <Field label="Monthly SIP (₹)">
                  <input type="number" value={sipAmount} onChange={e => setSipAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
                </Field>
                <Field label="Annual Step-Up %">
                  <input type="number" value={stepUpPct} onChange={e => setStepUpPct(Number(e.target.value))} className={inputCls} style={inputSt} />
                </Field>
              </div>
            )}
            <Field label="Benchmark">
              <select value={benchmark} onChange={e => setBenchmark(e.target.value as AssetKey)} className={inputCls} style={inputSt}>
                {ASSET_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select>
            </Field>
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={inflationAdjusted} onChange={e => setInflationAdjusted(e.target.checked)} className="rounded" />
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Inflation-adjusted</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={logScale} onChange={e => setLogScale(e.target.checked)} className="rounded" />
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Log scale</span>
              </label>
            </div>
          </Section>

          {/* Custom Portfolio */}
          <Section title="My Portfolio">
            {allocations.map(a => (
              <div key={a.id} className="flex items-center gap-1.5">
                <select value={a.asset} onChange={e => updateAllocation(a.id, "asset", e.target.value)} className={inputCls + " flex-1"} style={inputSt}>
                  {ASSET_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
                <div className="flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-16 shrink-0" style={inputSt}>
                  <input type="number" min={0} max={100} value={a.weight} onChange={e => updateAllocation(a.id, "weight", Number(e.target.value))} className="bg-transparent text-xs w-full outline-none font-mono text-right" style={{ color: "var(--text-primary)" }} />
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>%</span>
                </div>
                {allocations.length > 1 && <button onClick={() => removeAllocation(a.id)}><X size={10} style={{ color: "var(--text-muted)" }} /></button>}
              </div>
            ))}
            <div className="flex items-center justify-between pt-0.5">
              <button onClick={addAllocation} className="text-[11px] flex items-center gap-1" style={{ color: "var(--accent-brand)" }}><Plus size={10} /> Add</button>
              <span className="text-[11px] font-mono" style={{ color: isValid ? "var(--positive)" : "var(--negative)" }}>{totalWeight.toFixed(0)}%{Math.abs(totalWeight - 100) < 0.01 ? " ✓" : ""}</span>
            </div>
          </Section>

          {/* Lazy Portfolio Presets */}
          <Section title="Compare Against">
            <div className="space-y-1.5">
              {LAZY_PORTFOLIOS.map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedLazy.includes(p.id)} onChange={() => toggleLazy(p.id)} className="rounded shrink-0" />
                  <div className="flex-1 min-w-0">
                    <button onClick={() => loadPreset(p)} className="text-[11px] font-semibold text-left hover:underline block truncate" style={{ color: "var(--text-primary)" }} title={`Load ${p.name} into My Portfolio`}>{p.name}</button>
                    <p className="text-[9px] truncate" style={{ color: "var(--text-muted)" }}>{p.description} — {p.allocations.map(a => `${ASSET_LABELS[a.asset]} ${a.weight}%`).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Running…</>) : (<><Play size={14} /> Run Backtest</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <TrendingUp size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Ready to Backtest</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Define your asset allocation, select comparison portfolios, and run the backtest to see historical performance using Indian market data.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full relative">
            {running && (
              <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.3)" }}>
                <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none" style={{ color: "var(--accent-brand)" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </div>
            )}

            {results && (
              <>
                {/* Summary Cards */}
                <div className="p-3 border-b grid grid-cols-6 gap-2" style={{ borderColor: "var(--border)" }}>
                  <SummaryCard label="CAGR" value={`${results.custom.cagr}%`} color="var(--accent-brand)" />
                  <SummaryCard label="Total Return" value={`${results.custom.totalReturn.toFixed(0)}%`} color="var(--positive)" />
                  <SummaryCard label="Max Drawdown" value={`${results.custom.maxDrawdown}%`} color="var(--negative)" />
                  <SummaryCard label="Sharpe" value={results.custom.sharpe.toFixed(2)} color="var(--accent-brand)" />
                  <SummaryCard label="Sortino" value={results.custom.sortino.toFixed(2)} color="var(--accent-brand)" />
                  <SummaryCard label="Final Value" value={formatINR(results.custom.finalValue)} color="var(--positive)" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-2 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {([
                    { key: "growth" as TabKey, label: "Portfolio Growth", icon: TrendingUp },
                    { key: "returns" as TabKey, label: "Annual Returns", icon: BarChart2 },
                    { key: "drawdowns" as TabKey, label: "Drawdowns", icon: ArrowDownRight },
                    { key: "rolling" as TabKey, label: "Rolling Returns", icon: LineChartIcon },
                    { key: "metrics" as TabKey, label: "Comparison Table", icon: Table2 },
                  ]).map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                      className="px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5"
                      style={{
                        color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                        borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent",
                      }}>
                      <t.icon size={12} />{t.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 min-h-0 p-4 overflow-auto custom-scrollbar">
                  {activeTab === "growth" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis
                          scale={logScale ? "log" : "auto"}
                          domain={logScale ? ["auto", "auto"] : [0, "auto"]}
                          tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                          tickFormatter={v => `₹${(v / 1e7).toFixed(1)}Cr`}
                          width={72}
                        />
                        <Tooltip contentStyle={ttSt} formatter={(v) => formatINR(Number(v))} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        {allSeriesKeys.map((key, i) => (
                          <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={key === "My Portfolio" ? 2.5 : 1.5} dot={false} strokeDasharray={key === "My Portfolio" ? undefined : "4 2"} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "returns" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={returnsData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                        <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                        <Bar dataKey="My Portfolio" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
                        {results.comparisons.map((c, i) => (
                          <Bar key={c.portfolio.name} dataKey={c.portfolio.name} fill={COLORS[(i + 2) % COLORS.length]} radius={[2, 2, 0, 0]} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "drawdowns" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={drawdownData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                        <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                        {allSeriesKeys.map((key, i) => (
                          <Area key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={key === "My Portfolio" ? 0.15 : 0.05} strokeWidth={key === "My Portfolio" ? 2 : 1} />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "rolling" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>5-year rolling CAGR — compares your portfolio against the benchmark over every 5-year window.</p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={rollingData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Line type="monotone" dataKey="My Portfolio" stroke={COLORS[0]} strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey={ASSET_LABELS[benchmark]} stroke={COLORS[1]} strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "metrics" && (
                    <div className="overflow-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["Metric", "My Portfolio", ...results.comparisons.map(c => c.portfolio.name), ASSET_LABELS[benchmark]].map(h => (
                              <th key={h} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "CAGR", key: "cagr", fmt: (v: number) => `${v.toFixed(2)}%` },
                            { label: "Total Return", key: "totalReturn", fmt: (v: number) => `${v.toFixed(0)}%` },
                            { label: "Max Drawdown", key: "maxDrawdown", fmt: (v: number) => `${v.toFixed(1)}%` },
                            { label: "Std Dev", key: "stdDev", fmt: (v: number) => `${v.toFixed(2)}%` },
                            { label: "Sharpe", key: "sharpe", fmt: (v: number) => v.toFixed(2) },
                            { label: "Sortino", key: "sortino", fmt: (v: number) => v.toFixed(2) },
                            { label: "Calmar", key: "calmar", fmt: (v: number) => v.toFixed(2) },
                            { label: "Best Year", key: "bestYearReturn", fmt: (v: number) => `${v.toFixed(1)}%` },
                            { label: "Worst Year", key: "worstYearReturn", fmt: (v: number) => `${v.toFixed(1)}%` },
                            { label: "Positive Years", key: "positiveYears", fmt: (v: number) => `${v}` },
                            { label: "Negative Years", key: "negativeYears", fmt: (v: number) => `${v}` },
                            { label: "Final Value", key: "finalValue", fmt: (v: number) => formatINR(v) },
                            { label: "VaR (5%)", key: "var5", fmt: (v: number) => v !== undefined ? `${v.toFixed(1)}%` : "—" },
                            { label: "Skewness", key: "skewness", fmt: (v: number) => v !== undefined ? v.toFixed(2) : "—" },
                            { label: "Kurtosis", key: "kurtosis", fmt: (v: number) => v !== undefined ? v.toFixed(2) : "—" },
                          ].map(metric => {
                            const allResults = [results.custom, ...results.comparisons.map(c => c.result)];
                            // Get benchmark result via custom result's benchmark fields for the first column
                            const bmResult = runBacktest({
                              allocations: [{ asset: benchmark, weight: 100 }],
                              startYear, endYear, initialAmount, mode, sipAmount, stepUpPct, inflationAdjusted,
                            });
                            const allWithBm = [...allResults, bmResult];
                            const vals = allWithBm.map(r => (r as any)[metric.key] as number);
                            const best = metric.key === "maxDrawdown" ? Math.max(...vals) : Math.max(...vals);
                            return (
                              <tr key={metric.label} className="border-b" style={{ borderColor: "var(--border)" }}>
                                <td className="px-3 py-1.5 font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{metric.label}</td>
                                {allWithBm.map((r, i) => {
                                  const v = (r as any)[metric.key] as number;
                                  const isBest = v === best && metric.key !== "negativeYears";
                                  return (
                                    <td key={i} className="px-3 py-1.5 font-mono whitespace-nowrap" style={{ color: isBest ? "var(--accent-brand)" : "var(--text-primary)", fontWeight: isBest ? 600 : 400 }}>
                                      {v !== undefined ? metric.fmt(v) : "—"}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-3 space-y-2" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{title}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] mb-0.5 block" style={{ color: "var(--text-muted)" }}>{label}</label>
      {children}
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border p-2.5" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="text-sm font-mono font-bold leading-tight" style={{ color }}>{value}</div>
    </div>
  );
}
