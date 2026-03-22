"use client";

import { useState, useMemo } from "react";
import { Play, TrendingUp, BarChart2, Table2, ArrowDownRight, Activity } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, INDIA_CPI, START_YEAR, END_YEAR,
  PortfolioAllocation, runBacktest
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

// ─── Strategy Types ──────────────────────────────────────────────────────────

type StrategyType = "sma-crossover" | "momentum" | "dual-momentum" | "volatility-targeting";

interface StrategyConfig {
  type: StrategyType;
  riskAsset: AssetKey;
  safeAsset: AssetKey;
  lookbackYears: number;
  // SMA crossover: switch to safe if trailing return < 0
  // Momentum: invest in whichever of risk/safe had better trailing return
  // Dual momentum: must beat safe AND have positive absolute momentum
  // Vol targeting: scale equity exposure by targetVol / realizedVol
  targetVol?: number; // for vol-targeting, annual % target
}

interface DynamicResult {
  yearlyData: {
    year: number;
    dynamicValue: number;
    buyHoldValue: number;
    safeValue: number;
    dynamicReturn: number;
    buyHoldReturn: number;
    signal: "risk" | "safe" | "partial";
    equityPct: number;
    dynamicDrawdown: number;
    buyHoldDrawdown: number;
  }[];
  dynamicCagr: number;
  buyHoldCagr: number;
  safeCagr: number;
  dynamicMaxDD: number;
  buyHoldMaxDD: number;
  dynamicSharpe: number;
  buyHoldSharpe: number;
  dynamicSortino: number;
  buyHoldSortino: number;
  dynamicFinal: number;
  buyHoldFinal: number;
  turnoverCount: number;
  yearsInRisk: number;
  yearsInSafe: number;
  dynamicStdDev: number;
  buyHoldStdDev: number;
}

const STRATEGY_LABELS: Record<StrategyType, string> = {
  "sma-crossover": "SMA Crossover (Trend Following)",
  "momentum": "Relative Momentum",
  "dual-momentum": "Dual Momentum (Absolute + Relative)",
  "volatility-targeting": "Volatility Targeting",
};

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];

const COLORS = {
  dynamic: "#6366f1",
  buyHold: "#f97316",
  safe: "#10b981",
  positive: "#10b981",
  negative: "#ef4444",
};

type TabKey = "growth" | "signals" | "drawdowns" | "returns" | "metrics";

// ─── Dynamic Strategy Engine ─────────────────────────────────────────────────

function runDynamicStrategy(
  config: StrategyConfig,
  startYear: number,
  endYear: number,
  initialAmount: number,
): DynamicResult {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Compute trailing returns for lookback
  function trailingReturn(asset: AssetKey, currentYear: number, lookback: number): number {
    let cumulative = 1;
    for (let y = currentYear - lookback; y < currentYear; y++) {
      const r = ANNUAL_RETURNS[y]?.[asset] ?? 0;
      cumulative *= (1 + r / 100);
    }
    return (cumulative - 1) * 100;
  }

  function realizedVol(asset: AssetKey, currentYear: number, lookback: number): number {
    const rets: number[] = [];
    for (let y = currentYear - lookback; y < currentYear; y++) {
      rets.push(ANNUAL_RETURNS[y]?.[asset] ?? 0);
    }
    if (rets.length === 0) return 20; // default
    const mean = rets.reduce((s, r) => s + r, 0) / rets.length;
    return Math.sqrt(rets.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / rets.length);
  }

  let dynamicValue = initialAmount;
  let buyHoldValue = initialAmount;
  let safeValue = initialAmount;
  let dynamicPeak = initialAmount;
  let buyHoldPeak = initialAmount;
  let turnoverCount = 0;
  let yearsInRisk = 0;
  let yearsInSafe = 0;
  let prevSignal: "risk" | "safe" | "partial" = "risk";

  const yearlyData: DynamicResult["yearlyData"] = [];
  const dynamicReturns: number[] = [];
  const buyHoldReturns: number[] = [];

  for (const year of years) {
    const riskReturn = ANNUAL_RETURNS[year]?.[config.riskAsset] ?? 0;
    const safeReturn = ANNUAL_RETURNS[year]?.[config.safeAsset] ?? 0;

    // Determine signal
    let signal: "risk" | "safe" | "partial" = "risk";
    let equityPct = 100;

    if (year > startYear + config.lookbackYears - 1) {
      const riskTrailing = trailingReturn(config.riskAsset, year, config.lookbackYears);
      const safeTrailing = trailingReturn(config.safeAsset, year, config.lookbackYears);

      switch (config.type) {
        case "sma-crossover":
          // If trailing return is negative, go to safe
          signal = riskTrailing > 0 ? "risk" : "safe";
          equityPct = signal === "risk" ? 100 : 0;
          break;
        case "momentum":
          // Invest in whichever had better trailing return
          signal = riskTrailing > safeTrailing ? "risk" : "safe";
          equityPct = signal === "risk" ? 100 : 0;
          break;
        case "dual-momentum":
          // Must beat safe AND have positive absolute momentum
          if (riskTrailing > safeTrailing && riskTrailing > 0) {
            signal = "risk";
            equityPct = 100;
          } else {
            signal = "safe";
            equityPct = 0;
          }
          break;
        case "volatility-targeting":
          const vol = realizedVol(config.riskAsset, year, config.lookbackYears);
          const target = config.targetVol ?? 15;
          equityPct = Math.min(100, Math.max(0, Math.round((target / Math.max(vol, 1)) * 100)));
          signal = equityPct > 50 ? "risk" : equityPct > 0 ? "partial" : "safe";
          break;
      }
    }

    if (signal !== prevSignal) turnoverCount++;
    if (signal === "risk" || signal === "partial") yearsInRisk++;
    else yearsInSafe++;
    prevSignal = signal;

    // Apply returns
    const dynamicReturn = (equityPct / 100) * riskReturn + ((100 - equityPct) / 100) * safeReturn;
    dynamicValue *= (1 + dynamicReturn / 100);
    buyHoldValue *= (1 + riskReturn / 100);
    safeValue *= (1 + safeReturn / 100);

    dynamicPeak = Math.max(dynamicPeak, dynamicValue);
    buyHoldPeak = Math.max(buyHoldPeak, buyHoldValue);

    const dynamicDrawdown = ((dynamicValue - dynamicPeak) / dynamicPeak) * 100;
    const buyHoldDrawdown = ((buyHoldValue - buyHoldPeak) / buyHoldPeak) * 100;

    dynamicReturns.push(dynamicReturn);
    buyHoldReturns.push(riskReturn);

    yearlyData.push({
      year,
      dynamicValue: Math.round(dynamicValue),
      buyHoldValue: Math.round(buyHoldValue),
      safeValue: Math.round(safeValue),
      dynamicReturn: Math.round(dynamicReturn * 10) / 10,
      buyHoldReturn: riskReturn,
      signal,
      equityPct,
      dynamicDrawdown: Math.round(dynamicDrawdown * 10) / 10,
      buyHoldDrawdown: Math.round(buyHoldDrawdown * 10) / 10,
    });
  }

  const n = years.length;
  const dynamicCagr = n > 0 ? Math.round((Math.pow(dynamicValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;
  const buyHoldCagr = n > 0 ? Math.round((Math.pow(buyHoldValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;
  const safeCagr = n > 0 ? Math.round((Math.pow(safeValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;

  const dynamicMaxDD = Math.round(Math.min(...yearlyData.map(d => d.dynamicDrawdown)) * 10) / 10;
  const buyHoldMaxDD = Math.round(Math.min(...yearlyData.map(d => d.buyHoldDrawdown)) * 10) / 10;

  const dMean = dynamicReturns.reduce((s, r) => s + r, 0) / n;
  const bMean = buyHoldReturns.reduce((s, r) => s + r, 0) / n;
  const dStd = Math.sqrt(dynamicReturns.reduce((s, r) => s + Math.pow(r - dMean, 2), 0) / n);
  const bStd = Math.sqrt(buyHoldReturns.reduce((s, r) => s + Math.pow(r - bMean, 2), 0) / n);

  const rf = 7; // approximate risk-free
  const dynamicSharpe = dStd > 0 ? Math.round(((dMean - rf) / dStd) * 100) / 100 : 0;
  const buyHoldSharpe = bStd > 0 ? Math.round(((bMean - rf) / bStd) * 100) / 100 : 0;

  const dDownDev = Math.sqrt(dynamicReturns.filter(r => r < rf).reduce((s, r) => s + Math.pow(r - rf, 2), 0) / Math.max(dynamicReturns.filter(r => r < rf).length, 1));
  const bDownDev = Math.sqrt(buyHoldReturns.filter(r => r < rf).reduce((s, r) => s + Math.pow(r - rf, 2), 0) / Math.max(buyHoldReturns.filter(r => r < rf).length, 1));
  const dynamicSortino = dDownDev > 0 ? Math.round(((dMean - rf) / dDownDev) * 100) / 100 : 0;
  const buyHoldSortino = bDownDev > 0 ? Math.round(((bMean - rf) / bDownDev) * 100) / 100 : 0;

  return {
    yearlyData,
    dynamicCagr, buyHoldCagr, safeCagr,
    dynamicMaxDD, buyHoldMaxDD,
    dynamicSharpe, buyHoldSharpe,
    dynamicSortino, buyHoldSortino,
    dynamicFinal: Math.round(dynamicValue),
    buyHoldFinal: Math.round(buyHoldValue),
    turnoverCount,
    yearsInRisk, yearsInSafe,
    dynamicStdDev: Math.round(dStd * 100) / 100,
    buyHoldStdDev: Math.round(bStd * 100) / 100,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DynamicAllocationPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<DynamicResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("growth");

  // Config
  const [strategyType, setStrategyType] = useState<StrategyType>("dual-momentum");
  const [riskAsset, setRiskAsset] = useState<AssetKey>("nifty50");
  const [safeAsset, setSafeAsset] = useState<AssetKey>("debt");
  const [lookbackYears, setLookbackYears] = useState(1);
  const [targetVol, setTargetVol] = useState(15);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [initialAmount, setInitialAmount] = useState(1000000);

  const isValid = startYear + lookbackYears < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      const result = runDynamicStrategy(
        { type: strategyType, riskAsset, safeAsset, lookbackYears, targetVol },
        startYear, endYear, initialAmount,
      );
      setResults(result);
      setRunning(false);
    }, 50);
  }

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" };

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Dynamic Allocation</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Test tactical timing strategies: shift between risk and safe assets based on momentum or volatility signals.</p>

          <Section title="Strategy">
            <Field label="Strategy Type">
              <select value={strategyType} onChange={e => setStrategyType(e.target.value as StrategyType)} className={inputCls} style={inputSt}>
                {Object.entries(STRATEGY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <p className="text-[9px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {strategyType === "sma-crossover" && "Go to safe asset when trailing return is negative (trend reversal)."}
              {strategyType === "momentum" && "Invest in whichever asset (risk or safe) had the better trailing return."}
              {strategyType === "dual-momentum" && "Must beat safe asset AND have positive absolute return to stay in risk asset."}
              {strategyType === "volatility-targeting" && "Scale equity exposure inversely with realized volatility to maintain a target vol."}
            </p>
          </Section>

          <Section title="Assets">
            <Field label="Risk Asset">
              <select value={riskAsset} onChange={e => setRiskAsset(e.target.value as AssetKey)} className={inputCls} style={inputSt}>
                {ASSET_OPTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </Field>
            <Field label="Safe Asset">
              <select value={safeAsset} onChange={e => setSafeAsset(e.target.value as AssetKey)} className={inputCls} style={inputSt}>
                {ASSET_OPTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </Field>
          </Section>

          <Section title="Parameters">
            <Field label="Lookback Period (Years)">
              <select value={lookbackYears} onChange={e => setLookbackYears(Number(e.target.value))} className={inputCls} style={inputSt}>
                {[1, 2, 3, 5].map(y => <option key={y} value={y}>{y} year{y > 1 ? "s" : ""}</option>)}
              </select>
            </Field>
            {strategyType === "volatility-targeting" && (
              <Field label="Target Volatility (%)">
                <input type="number" value={targetVol} min={5} max={40} onChange={e => setTargetVol(Number(e.target.value))} className={inputCls} style={inputSt} />
              </Field>
            )}
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
            <Field label="Initial Amount (₹)">
              <input type="number" value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
            </Field>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Running…</>) : (<><Play size={14} /> Run Strategy</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <Activity size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Ready to Test Strategy</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Choose a timing strategy, configure assets and lookback period, then run to compare dynamic allocation against buy-and-hold.
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
                  <SummaryCard label="Dynamic CAGR" value={`${results.dynamicCagr}%`} sub={`vs ${results.buyHoldCagr}% B&H`} color="var(--accent-brand)" />
                  <SummaryCard label="Max Drawdown" value={`${results.dynamicMaxDD}%`} sub={`vs ${results.buyHoldMaxDD}% B&H`} color="var(--negative)" />
                  <SummaryCard label="Sharpe" value={results.dynamicSharpe.toFixed(2)} sub={`vs ${results.buyHoldSharpe.toFixed(2)} B&H`} color="var(--accent-brand)" />
                  <SummaryCard label="Final Value" value={formatINR(results.dynamicFinal)} sub={`vs ${formatINR(results.buyHoldFinal)}`} color="var(--positive)" />
                  <SummaryCard label="Turnovers" value={`${results.turnoverCount}`} sub={`${results.yearsInRisk}yr risk / ${results.yearsInSafe}yr safe`} color="var(--text-primary)" />
                  <SummaryCard label="Volatility" value={`${results.dynamicStdDev}%`} sub={`vs ${results.buyHoldStdDev}% B&H`} color="var(--accent-brand)" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-2 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {([
                    { key: "growth" as TabKey, label: "Portfolio Growth", icon: TrendingUp },
                    { key: "signals" as TabKey, label: "Signal Timeline", icon: Activity },
                    { key: "returns" as TabKey, label: "Annual Returns", icon: BarChart2 },
                    { key: "drawdowns" as TabKey, label: "Drawdowns", icon: ArrowDownRight },
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
                      <LineChart data={results.yearlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `₹${(v / 1e5).toFixed(0)}L`} width={60} />
                        <Tooltip contentStyle={ttSt} formatter={(v) => formatINR(Number(v))} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Line type="monotone" dataKey="dynamicValue" name="Dynamic Strategy" stroke={COLORS.dynamic} strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="buyHoldValue" name={`Buy & Hold (${ASSET_LABELS[riskAsset]})`} stroke={COLORS.buyHold} strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                        <Line type="monotone" dataKey="safeValue" name={`Safe (${ASSET_LABELS[safeAsset]})`} stroke={COLORS.safe} strokeWidth={1} dot={false} strokeDasharray="2 2" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "signals" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Equity allocation % over time. Green = in risk asset, orange = in safe asset. {strategyType === "volatility-targeting" ? "Partial allocations based on vol ratio." : "Binary switches based on signal."}
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.yearlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={40} domain={[0, 100]} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v)}% equity`} />
                            <Bar dataKey="equityPct" name="Equity Allocation %" radius={[2, 2, 0, 0]}>
                              {results.yearlyData.map((d, i) => (
                                <rect key={i} fill={d.signal === "risk" ? COLORS.positive : d.signal === "partial" ? COLORS.dynamic : COLORS.buyHold} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "returns" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.yearlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                        <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                        <Bar dataKey="dynamicReturn" name="Dynamic" fill={COLORS.dynamic} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="buyHoldReturn" name="Buy & Hold" fill={COLORS.buyHold} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "drawdowns" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={results.yearlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                        <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                        <Area type="monotone" dataKey="dynamicDrawdown" name="Dynamic" stroke={COLORS.dynamic} fill={COLORS.dynamic} fillOpacity={0.15} strokeWidth={2} />
                        <Area type="monotone" dataKey="buyHoldDrawdown" name="Buy & Hold" stroke={COLORS.buyHold} fill={COLORS.buyHold} fillOpacity={0.05} strokeWidth={1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}

                  {activeTab === "metrics" && (
                    <div className="overflow-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["Metric", "Dynamic Strategy", `Buy & Hold (${ASSET_LABELS[riskAsset]})`, "Difference"].map(h => (
                              <th key={h} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "CAGR", dynamic: `${results.dynamicCagr}%`, buyHold: `${results.buyHoldCagr}%`, diff: results.dynamicCagr - results.buyHoldCagr, pct: true },
                            { label: "Max Drawdown", dynamic: `${results.dynamicMaxDD}%`, buyHold: `${results.buyHoldMaxDD}%`, diff: results.dynamicMaxDD - results.buyHoldMaxDD, pct: true },
                            { label: "Std Dev", dynamic: `${results.dynamicStdDev}%`, buyHold: `${results.buyHoldStdDev}%`, diff: results.dynamicStdDev - results.buyHoldStdDev, pct: true },
                            { label: "Sharpe Ratio", dynamic: results.dynamicSharpe.toFixed(2), buyHold: results.buyHoldSharpe.toFixed(2), diff: results.dynamicSharpe - results.buyHoldSharpe, pct: false },
                            { label: "Sortino Ratio", dynamic: results.dynamicSortino.toFixed(2), buyHold: results.buyHoldSortino.toFixed(2), diff: results.dynamicSortino - results.buyHoldSortino, pct: false },
                            { label: "Final Value", dynamic: formatINR(results.dynamicFinal), buyHold: formatINR(results.buyHoldFinal), diff: results.dynamicFinal - results.buyHoldFinal, pct: false },
                            { label: "Total Turnovers", dynamic: `${results.turnoverCount}`, buyHold: "0", diff: 0, pct: false },
                            { label: "Years in Risk Asset", dynamic: `${results.yearsInRisk}`, buyHold: `${results.yearlyData.length}`, diff: 0, pct: false },
                            { label: "Years in Safe Asset", dynamic: `${results.yearsInSafe}`, buyHold: "0", diff: 0, pct: false },
                          ].map(row => (
                            <tr key={row.label} className="border-b" style={{ borderColor: "var(--border)" }}>
                              <td className="px-3 py-1.5 font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{row.label}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--accent-brand)" }}>{row.dynamic}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{row.buyHold}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: row.diff > 0 ? "var(--positive)" : row.diff < 0 ? "var(--negative)" : "var(--text-muted)" }}>
                                {row.diff !== 0 ? `${row.diff > 0 ? "+" : ""}${row.pct ? row.diff.toFixed(1) + "%" : row.label === "Final Value" ? formatINR(row.diff) : row.diff.toFixed(2)}` : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-6 rounded-lg border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
                        <p className="text-[11px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Strategy Notes</p>
                        <ul className="text-[10px] space-y-1" style={{ color: "var(--text-muted)" }}>
                          <li>• Strategy: <strong>{STRATEGY_LABELS[strategyType]}</strong> with {lookbackYears}-year lookback</li>
                          <li>• Risk asset: {ASSET_LABELS[riskAsset]} → Safe asset: {ASSET_LABELS[safeAsset]}</li>
                          <li>• Period: {startYear}–{endYear} ({endYear - startYear + 1} years)</li>
                          <li>• During the lookback warmup period (first {lookbackYears} year{lookbackYears > 1 ? "s" : ""}), the strategy defaults to the risk asset</li>
                          <li>• No transaction costs or taxes applied. Real-world returns would be lower due to slippage.</li>
                        </ul>
                      </div>
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

function SummaryCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-lg border p-2.5" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="text-sm font-mono font-bold leading-tight" style={{ color }}>{value}</div>
      <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
    </div>
  );
}
