"use client";

import { useState } from "react";
import { Play, TrendingUp, Plus, X } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, INDIA_CPI
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PortfolioAsset { id: string; key: AssetKey; pct: number; }
type CashflowType = "contribution" | "withdrawal" | "lump-sum";
type CashflowFreq = "annual" | "semi-annual" | "quarterly" | "monthly" | "one-time";
interface CashflowGoal {
  id: string;
  label: string;
  type: CashflowType;
  amount: number;
  frequency: CashflowFreq;
  startYear: number;
  endYear: number;
  inflationAdjusted: boolean;
}
interface SimResults {
  successRate: number;
  safeWithdrawalRate: number;
  percentileTable: { year: number; p10: number; p25: number; p50: number; p75: number; p90: number; }[];
  medianFinal: number;
  p10Final: number;
  p90Final: number;
  ruin: number; // % of sims that hit 0
  returnList: { returnPct: number; successRate: number }[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];
const NUM_SIMULATIONS = 1000;
const HISTORICAL_YEARS = Object.keys(ANNUAL_RETURNS).map(Number).sort();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function randNormal(mean: number, sd: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * sd + mean;
}

function getPortfolioReturn(assets: PortfolioAsset[], year: number): number {
  let r = 0;
  for (const a of assets) {
    const row = ANNUAL_RETURNS[year];
    if (row) r += (a.pct / 100) * (row[a.key] ?? 0);
  }
  return r / 100;
}

function portfolioMeanStd(assets: PortfolioAsset[]): { mean: number; std: number } {
  const returns = HISTORICAL_YEARS.filter(y => ANNUAL_RETURNS[y]).map(y => {
    let r = 0;
    for (const a of assets) r += (a.pct / 100) * (ANNUAL_RETURNS[y][a.key] ?? 0);
    return r / 100;
  });
  const mean = returns.reduce((s, r) => s + r, 0) / returns.length;
  const std = Math.sqrt(returns.reduce((s, r) => s + (r - mean) ** 2, 0) / returns.length);
  return { mean, std };
}

function computeAnnualCashflow(goals: CashflowGoal[], year: number, inflationFactor: number): number {
  let total = 0;
  for (const g of goals) {
    if (year < g.startYear || year > g.endYear) continue;
    let amt = g.amount * (g.inflationAdjusted ? inflationFactor : 1);
    const sign = g.type === "contribution" ? 1 : -1;
    const freqMult = g.frequency === "monthly" ? 12 : g.frequency === "quarterly" ? 4 : g.frequency === "semi-annual" ? 2 : 1;
    total += sign * amt * (g.frequency === "one-time" ? 1 : freqMult);
  }
  return total;
}

function blendPortfolios(
  careerAssets: PortfolioAsset[],
  retireAssets: PortfolioAsset[],
  year: number,
  yearsToRetirement: number,
  glidePathYears: number
): PortfolioAsset[] {
  if (year <= yearsToRetirement - glidePathYears) return careerAssets;
  if (year >= yearsToRetirement) return retireAssets;
  const t = (year - (yearsToRetirement - glidePathYears)) / glidePathYears;
  const keys = new Set([...careerAssets.map(a => a.key), ...retireAssets.map(a => a.key)]);
  return Array.from(keys).map(key => {
    const c = careerAssets.find(a => a.key === key)?.pct ?? 0;
    const r = retireAssets.find(a => a.key === key)?.pct ?? 0;
    return { id: key, key, pct: c * (1 - t) + r * t };
  });
}

function runSimulation(params: {
  initialAmount: number;
  years: number;
  careerAssets: PortfolioAsset[];
  retireAssets: PortfolioAsset[];
  yearsToRetirement: number;
  glidePathYears: number;
  goals: CashflowGoal[];
  simulationModel: string;
  bootstrapModel: string;
  inflationModel: string;
  fixedInflation: number;
  sequenceRisk: string;
}): SimResults {
  const {
    initialAmount, years, careerAssets, retireAssets, yearsToRetirement,
    glidePathYears, goals, simulationModel, bootstrapModel, inflationModel,
    fixedInflation, sequenceRisk
  } = params;

  const careerStats = portfolioMeanStd(careerAssets);
  const retireStats = portfolioMeanStd(retireAssets);
  const cpiMean = Object.values(INDIA_CPI as Record<number,number>).reduce((s, v) => s + v, 0) / Object.values(INDIA_CPI as Record<number,number>).length / 100;
  const cpiValues = Object.values(INDIA_CPI as Record<number,number>).map(v => v / 100);

  const allPaths: number[][] = [];
  let survivedCount = 0;

  for (let sim = 0; sim < NUM_SIMULATIONS; sim++) {
    let balance = initialAmount;
    const path = [balance];
    let inflFactor = 1;
    let ruined = false;

    // Prepare return sequence for sequenceRisk
    let yearReturns: number[] = [];
    for (let y = 1; y <= years; y++) {
      const blended = blendPortfolios(careerAssets, retireAssets, y, yearsToRetirement, glidePathYears);
      let ret: number;
      if (simulationModel === "historical") {
        const pickYear = HISTORICAL_YEARS[Math.floor(Math.random() * HISTORICAL_YEARS.length)];
        ret = getPortfolioReturn(blended, pickYear);
      } else {
        const stats = y <= yearsToRetirement ? careerStats : retireStats;
        ret = randNormal(stats.mean, stats.std);
      }
      yearReturns.push(ret);
    }

    if (sequenceRisk === "worst-first") yearReturns.sort((a, b) => a - b);
    else if (sequenceRisk === "best-first") yearReturns.sort((a, b) => b - a);

    for (let y = 1; y <= years; y++) {
      // Inflation
      let inf: number;
      if (inflationModel === "historical") {
        const cpiYear = HISTORICAL_YEARS[Math.floor(Math.random() * cpiValues.length)];
        const cpiVal = (INDIA_CPI as Record<number,number>)[cpiYear];
        inf = (cpiVal !== undefined ? cpiVal : (cpiMean * 100)) / 100;
      } else {
        inf = fixedInflation / 100;
      }
      inflFactor *= (1 + inf);

      const cashflow = computeAnnualCashflow(goals, y, inflFactor);
      // Apply contributions at end, withdrawals at start
      if (cashflow < 0) balance += cashflow; // withdrawal at start
      balance = balance * (1 + yearReturns[y - 1]);
      if (cashflow > 0) balance += cashflow; // contribution at end
      if (balance < 0) { balance = 0; ruined = true; }
      path.push(balance);
    }

    if (!ruined) survivedCount++;
    allPaths.push(path);
  }

  // Build percentile table
  const percentileTable = [];
  for (let y = 0; y <= years; y++) {
    const vals = allPaths.map(p => p[y]).sort((a, b) => a - b);
    const n = vals.length;
    percentileTable.push({
      year: y,
      p10: vals[Math.floor(0.10 * n)],
      p25: vals[Math.floor(0.25 * n)],
      p50: vals[Math.floor(0.50 * n)],
      p75: vals[Math.floor(0.75 * n)],
      p90: vals[Math.floor(0.90 * n)],
    });
  }

  const finalVals = allPaths.map(p => p[years]).sort((a, b) => a - b);
  const n = finalVals.length;
  const ruinCount = finalVals.filter(v => v <= 0).length;

  // Return list: what success rate at different total return assumptions
  const returnList = [0, 2.5, 5, 7.5, 10, 12.5].map(retPct => {
    const success = allPaths.filter(p => {
      const totalGrowth = p[years] / (initialAmount || 1);
      return totalGrowth >= Math.pow(1 + retPct / 100, years);
    }).length;
    return { returnPct: retPct, successRate: Math.round((success / NUM_SIMULATIONS) * 100) };
  });

  // Safe withdrawal rate: largest annual withdrawal where success ≥ 95%
  let swr = 0;
  for (let w = 0.5; w <= 10; w += 0.1) {
    const withdrawalAmt = (w / 100) * initialAmount;
    let ok = 0;
    for (const path of allPaths) {
      let b = initialAmount;
      let survived = true;
      for (let y = 1; y <= years; y++) {
        b -= withdrawalAmt;
        b *= (1 + (path[y] - path[y - 1]) / (path[y - 1] || 1));
        if (b < 0) { survived = false; break; }
      }
      if (survived) ok++;
    }
    if (ok / NUM_SIMULATIONS >= 0.95) swr = w;
    else break;
  }

  return {
    successRate: Math.round((survivedCount / NUM_SIMULATIONS) * 100),
    safeWithdrawalRate: parseFloat(swr.toFixed(1)),
    percentileTable,
    medianFinal: finalVals[Math.floor(0.50 * n)],
    p10Final: finalVals[Math.floor(0.10 * n)],
    p90Final: finalVals[Math.floor(0.90 * n)],
    ruin: Math.round((ruinCount / NUM_SIMULATIONS) * 100),
    returnList,
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FinancialGoalsPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<SimResults | null>(null);
  const [activeTab, setActiveTab] = useState<"chart" | "table" | "returns">("chart");

  // ── Simulation Model Config ──
  const [planningType, setPlanningType] = useState("retirement");
  const [yearsToRetirement, setYearsToRetirement] = useState(20);
  const [glidePathYears, setGlidePathYears] = useState(5);
  const [initialAmount, setInitialAmount] = useState(5000000);
  const [simulationPeriod, setSimulationPeriod] = useState(30);
  const [simulationModel, setSimulationModel] = useState("historical");
  const [bootstrapModel, setBootstrapModel] = useState("single-year");
  const [sequenceRisk, setSequenceRisk] = useState("none");
  const [inflationModel, setInflationModel] = useState("historical");
  const [fixedInflation, setFixedInflation] = useState(5);
  const [rebalancing, setRebalancing] = useState("annual");

  // ── Career Portfolio ──
  const [careerAssets, setCareerAssets] = useState<PortfolioAsset[]>([
    { id: "c1", key: "nifty50", pct: 60 },
    { id: "c2", key: "niftyMidcap", pct: 20 },
    { id: "c3", key: "debt", pct: 20 },
  ]);

  // ── Retirement Portfolio ──
  const [retireAssets, setRetireAssets] = useState<PortfolioAsset[]>([
    { id: "r1", key: "nifty50", pct: 30 },
    { id: "r2", key: "debt", pct: 50 },
    { id: "r3", key: "gold", pct: 20 },
  ]);

  // ── Cashflow Goals ──
  const [goals, setGoals] = useState<CashflowGoal[]>([
    { id: "g1", label: "Monthly SIP", type: "contribution", amount: 50000, frequency: "monthly", startYear: 1, endYear: 20, inflationAdjusted: false },
    { id: "g2", label: "Retirement Expenses", type: "withdrawal", amount: 800000, frequency: "annual", startYear: 21, endYear: 30, inflationAdjusted: true },
  ]);

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };

  const careerTotal = careerAssets.reduce((s, a) => s + a.pct, 0);
  const retireTotal = retireAssets.reduce((s, a) => s + a.pct, 0);
  const careerValid = Math.abs(careerTotal - 100) < 0.01;
  const retireValid = Math.abs(retireTotal - 100) < 0.01;

  function addCareerAsset() { setCareerAssets([...careerAssets, { id: Math.random().toString(), key: "gold", pct: 0 }]); }
  function updateCareerAsset(id: string, f: "key" | "pct", v: string | number) { setCareerAssets(careerAssets.map(a => a.id === id ? { ...a, [f]: v } : a)); }
  function removeCareerAsset(id: string) { setCareerAssets(careerAssets.filter(a => a.id !== id)); }

  function addRetireAsset() { setRetireAssets([...retireAssets, { id: Math.random().toString(), key: "gold", pct: 0 }]); }
  function updateRetireAsset(id: string, f: "key" | "pct", v: string | number) { setRetireAssets(retireAssets.map(a => a.id === id ? { ...a, [f]: v } : a)); }
  function removeRetireAsset(id: string) { setRetireAssets(retireAssets.filter(a => a.id !== id)); }

  function addGoal() {
    setGoals([...goals, { id: Math.random().toString(), label: "New Goal", type: "contribution", amount: 100000, frequency: "annual", startYear: 1, endYear: simulationPeriod, inflationAdjusted: false }]);
  }
  function updateGoal(id: string, f: keyof CashflowGoal, v: any) { setGoals(goals.map(g => g.id === id ? { ...g, [f]: v } : g)); }
  function removeGoal(id: string) { setGoals(goals.filter(g => g.id !== id)); }

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      const res = runSimulation({
        initialAmount,
        years: simulationPeriod,
        careerAssets,
        retireAssets,
        yearsToRetirement,
        glidePathYears,
        goals,
        simulationModel,
        bootstrapModel,
        inflationModel,
        fixedInflation,
        sequenceRisk,
      });
      setResults(res);
      setRunning(false);
    }, 50);
  }

  const chartData = results?.percentileTable ?? [];

  const successColor = results
    ? results.successRate >= 80 ? "var(--positive)" : results.successRate >= 60 ? "var(--accent-brand)" : "var(--negative)"
    : "var(--text-muted)";

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Financial Goals Simulation</h2>

          {/* Simulation Model Config */}
          <Section title="Simulation Model Configuration">
            <Field label="Planning Type">
              <select value={planningType} onChange={e => setPlanningType(e.target.value)} className={inputCls} style={inputSt}>
                <option value="retirement">Retirement</option>
                <option value="college">College Savings</option>
                <option value="other">Other Goal</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Years to Retirement">
                <input type="number" value={yearsToRetirement} onChange={e => setYearsToRetirement(Number(e.target.value))} className={inputCls} style={inputSt} />
              </Field>
              <Field label="Glide Path Years">
                <input type="number" value={glidePathYears} min={0} onChange={e => setGlidePathYears(Number(e.target.value))} className={inputCls} style={inputSt} />
              </Field>
            </div>
            <Field label="Initial Amount (₹)">
              <input type="number" value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Simulation Period (Years)">
                <input type="number" value={simulationPeriod} onChange={e => setSimulationPeriod(Number(e.target.value))} className={inputCls} style={inputSt} />
              </Field>
              <Field label="Simulation Model">
                <select value={simulationModel} onChange={e => setSimulationModel(e.target.value)} className={inputCls} style={inputSt}>
                  <option value="historical">Historical Returns</option>
                  <option value="statistical">Statistical Returns</option>
                  <option value="forecasted">Forecasted Returns</option>
                  <option value="parameterized">Parameterized</option>
                </select>
              </Field>
            </div>
            {simulationModel === "historical" && (
              <Field label="Bootstrap Model">
                <select value={bootstrapModel} onChange={e => setBootstrapModel(e.target.value)} className={inputCls} style={inputSt}>
                  <option value="single-year">Single Year (Independent)</option>
                  <option value="block">Block Bootstrap</option>
                </select>
              </Field>
            )}
            <Field label="Sequence of Returns Risk">
              <select value={sequenceRisk} onChange={e => setSequenceRisk(e.target.value)} className={inputCls} style={inputSt}>
                <option value="none">None</option>
                <option value="worst-first">Worst Returns First</option>
                <option value="best-first">Best Returns First</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Inflation Model">
                <select value={inflationModel} onChange={e => setInflationModel(e.target.value)} className={inputCls} style={inputSt}>
                  <option value="historical">Historical CPI</option>
                  <option value="fixed">Fixed Rate</option>
                </select>
              </Field>
              <Field label="Rebalancing">
                <select value={rebalancing} onChange={e => setRebalancing(e.target.value)} className={inputCls} style={inputSt}>
                  <option value="annual">Annual</option>
                  <option value="semi-annual">Semi-Annual</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                  <option value="none">None</option>
                </select>
              </Field>
            </div>
            {inflationModel === "fixed" && (
              <Field label="Fixed Inflation Rate (%)">
                <input type="number" step="0.1" value={fixedInflation} onChange={e => setFixedInflation(Number(e.target.value))} className={inputCls} style={inputSt} />
              </Field>
            )}
          </Section>

          {/* Career Portfolio */}
          <Section title={`Career Portfolio (Years 1–${yearsToRetirement})`}>
            {careerAssets.map(a => (
              <div key={a.id} className="flex items-center gap-1.5">
                <select value={a.key} onChange={e => updateCareerAsset(a.id, "key", e.target.value)} className={inputCls + " flex-1"} style={inputSt}>
                  {ASSET_OPTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
                <div className="flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-16 shrink-0" style={inputSt}>
                  <input type="number" min={0} max={100} value={a.pct} onChange={e => updateCareerAsset(a.id, "pct", Number(e.target.value))} className="bg-transparent text-xs w-full outline-none font-mono text-right" style={{ color: "var(--text-primary)" }} />
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>%</span>
                </div>
                {careerAssets.length > 1 && <button onClick={() => removeCareerAsset(a.id)}><X size={10} style={{ color: "var(--text-muted)" }} /></button>}
              </div>
            ))}
            <div className="flex items-center justify-between pt-0.5">
              <button onClick={addCareerAsset} className="text-[11px] flex items-center gap-1" style={{ color: "var(--accent-brand)" }}><Plus size={10} /> Add</button>
              <span className="text-[11px] font-mono" style={{ color: careerValid ? "var(--positive)" : "var(--negative)" }}>{careerTotal.toFixed(0)}%{careerValid ? " ✓" : ""}</span>
            </div>
          </Section>

          {/* Retirement Portfolio */}
          <Section title={`Retirement Portfolio (Years ${yearsToRetirement}+)`}>
            {retireAssets.map(a => (
              <div key={a.id} className="flex items-center gap-1.5">
                <select value={a.key} onChange={e => updateRetireAsset(a.id, "key", e.target.value)} className={inputCls + " flex-1"} style={inputSt}>
                  {ASSET_OPTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
                <div className="flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-16 shrink-0" style={inputSt}>
                  <input type="number" min={0} max={100} value={a.pct} onChange={e => updateRetireAsset(a.id, "pct", Number(e.target.value))} className="bg-transparent text-xs w-full outline-none font-mono text-right" style={{ color: "var(--text-primary)" }} />
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>%</span>
                </div>
                {retireAssets.length > 1 && <button onClick={() => removeRetireAsset(a.id)}><X size={10} style={{ color: "var(--text-muted)" }} /></button>}
              </div>
            ))}
            <div className="flex items-center justify-between pt-0.5">
              <button onClick={addRetireAsset} className="text-[11px] flex items-center gap-1" style={{ color: "var(--accent-brand)" }}><Plus size={10} /> Add</button>
              <span className="text-[11px] font-mono" style={{ color: retireValid ? "var(--positive)" : "var(--negative)" }}>{retireTotal.toFixed(0)}%{retireValid ? " ✓" : ""}</span>
            </div>
          </Section>

          {/* Cashflow Goals */}
          <Section title="Cashflow Goals">
            <div className="space-y-2">
              {goals.map((g, i) => (
                <div key={g.id} className="rounded-md border p-2 space-y-1.5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <div className="flex items-center justify-between">
                    <input value={g.label} onChange={e => updateGoal(g.id, "label", e.target.value)} className="bg-transparent text-[11px] font-semibold outline-none flex-1 min-w-0" style={{ color: "var(--text-primary)" }} />
                    <button onClick={() => removeGoal(g.id)}><X size={10} style={{ color: "var(--text-muted)" }} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <select value={g.type} onChange={e => updateGoal(g.id, "type", e.target.value)} className={inputCls} style={inputSt}>
                      <option value="contribution">Contribution</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="lump-sum">Lump Sum</option>
                    </select>
                    <select value={g.frequency} onChange={e => updateGoal(g.id, "frequency", e.target.value)} className={inputCls} style={inputSt}>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="semi-annual">Semi-Annual</option>
                      <option value="annual">Annual</option>
                      <option value="one-time">One-Time</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>₹</span>
                    <input type="number" value={g.amount} onChange={e => updateGoal(g.id, "amount", Number(e.target.value))} className={inputCls} style={inputSt} placeholder="Amount" />
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] shrink-0" style={{ color: "var(--text-muted)" }}>Yr</span>
                      <input type="number" min={1} value={g.startYear} onChange={e => updateGoal(g.id, "startYear", Number(e.target.value))} className={inputCls} style={inputSt} placeholder="Start Yr" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] shrink-0" style={{ color: "var(--text-muted)" }}>to</span>
                      <input type="number" min={1} value={g.endYear} onChange={e => updateGoal(g.id, "endYear", Number(e.target.value))} className={inputCls} style={inputSt} placeholder="End Yr" />
                    </div>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={g.inflationAdjusted} onChange={e => updateGoal(g.id, "inflationAdjusted", e.target.checked)} className="rounded" />
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Inflation-adjusted</span>
                  </label>
                </div>
              ))}
              <button onClick={addGoal} className="text-[11px] flex items-center gap-1 mt-1" style={{ color: "var(--accent-brand)" }}><Plus size={10} /> Add Goal</button>
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !careerValid || !retireValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Simulating {NUM_SIMULATIONS.toLocaleString()} paths…</>) : (<><Play size={14} /> Run Simulation</>)}
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
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Ready to Forecast Goals</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Configure portfolios and cashflow goals on the left. The simulation will run {NUM_SIMULATIONS.toLocaleString()} Monte Carlo paths using Indian historical data.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full relative">
            {running && (
              <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="flex flex-col items-center gap-3">
                  <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none" style={{ color: "var(--accent-brand)" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Running {NUM_SIMULATIONS.toLocaleString()} simulations…</span>
                </div>
              </div>
            )}

            {results && (
              <>
                {/* ── Summary Cards ── */}
                <div className="p-4 border-b grid grid-cols-5 gap-3" style={{ borderColor: "var(--border)" }}>
                  <SummaryCard label="Success Rate" value={`${results.successRate}%`} sub="Portfolio survives" color={successColor} />
                  <SummaryCard label="Ruin Probability" value={`${results.ruin}%`} sub="Portfolio reaches ₹0" color={results.ruin > 20 ? "var(--negative)" : "var(--text-muted)"} />
                  <SummaryCard label="Median Final" value={formatINR(results.medianFinal)} sub="50th percentile" color="var(--accent-brand)" />
                  <SummaryCard label="Best Case (P90)" value={formatINR(results.p90Final)} sub="90th percentile" color="var(--positive)" />
                  <SummaryCard label="Worst Case (P10)" value={formatINR(results.p10Final)} sub="10th percentile" color="var(--negative)" />
                </div>

                {/* ── Tabs ── */}
                <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {(["chart", "table", "returns"] as const).map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-t-md border-b-2 transition-colors capitalize"
                      style={{
                        color: activeTab === t ? "var(--accent-brand)" : "var(--text-muted)",
                        borderColor: activeTab === t ? "var(--accent-brand)" : "transparent",
                        background: "transparent"
                      }}>
                      {t === "chart" ? "Portfolio Balance" : t === "table" ? "Percentile Table" : "Success by Return"}
                    </button>
                  ))}
                </div>

                {/* ── Chart Tab ── */}
                {activeTab === "chart" && (
                  <div className="flex-1 p-4 min-h-0">
                    <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                      Portfolio balance over {simulationPeriod} years across {NUM_SIMULATIONS.toLocaleString()} simulations. Retirement transition at year {yearsToRetirement} via {glidePathYears}-year glide path.
                    </p>
                    <ResponsiveContainer width="100%" height="90%">
                      <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `Yr ${v}`} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `₹${(v / 1e7).toFixed(1)}Cr`} width={72} />
                        <Tooltip
                          contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" }}
                          formatter={(v) => formatINR(Number(v))}
                          labelFormatter={v => `Year ${v}`}
                        />
                        <Legend wrapperStyle={{ fontSize: 11, color: "var(--text-muted)" }} />
                        {yearsToRetirement > 0 && yearsToRetirement < simulationPeriod && (
                          <ReferenceLine x={yearsToRetirement} stroke="var(--accent-brand)" strokeDasharray="4 2" label={{ value: "Retirement", position: "top", fontSize: 10, fill: "var(--accent-brand)" }} />
                        )}
                        <Line type="monotone" dataKey="p90" name="P90 (Best)" stroke="var(--positive)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="p75" name="P75" stroke="#6ee7b7" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                        <Line type="monotone" dataKey="p50" name="P50 (Median)" stroke="var(--accent-brand)" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="p25" name="P25" stroke="#fca5a5" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                        <Line type="monotone" dataKey="p10" name="P10 (Worst)" stroke="var(--negative)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* ── Percentile Table Tab ── */}
                {activeTab === "table" && (
                  <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                      At the 50th percentile (median), half of simulated portfolios did better and half did worse. All values in ₹ crores.
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ background: "var(--surface-elevated)" }}>
                          {["Year", "P10", "P25", "P50 (Median)", "P75", "P90"].map(h => (
                            <th key={h} className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.filter((_, i) => i % 5 === 0 || i === chartData.length - 1).map(row => (
                          <tr key={row.year} className="border-b" style={{ borderColor: "var(--border)" }}>
                            <td className="px-3 py-1.5 font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{row.year}</td>
                            <td className="px-3 py-1.5 font-mono" style={{ color: "var(--negative)" }}>{(row.p10 / 1e7).toFixed(2)}Cr</td>
                            <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-muted)" }}>{(row.p25 / 1e7).toFixed(2)}Cr</td>
                            <td className="px-3 py-1.5 font-mono font-semibold" style={{ color: "var(--accent-brand)" }}>{(row.p50 / 1e7).toFixed(2)}Cr</td>
                            <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-muted)" }}>{(row.p75 / 1e7).toFixed(2)}Cr</td>
                            <td className="px-3 py-1.5 font-mono" style={{ color: "var(--positive)" }}>{(row.p90 / 1e7).toFixed(2)}Cr</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── Success by Return Tab ── */}
                {activeTab === "returns" && (
                  <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                      Probability that the portfolio achieves at least the specified annualized total return over the full simulation period.
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ background: "var(--surface-elevated)" }}>
                          {["Target Return (CAGR)", "Success Rate", "Bar"].map(h => (
                            <th key={h} className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.returnList.map(row => (
                          <tr key={row.returnPct} className="border-b" style={{ borderColor: "var(--border)" }}>
                            <td className="px-3 py-2 font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{row.returnPct.toFixed(1)}%</td>
                            <td className="px-3 py-2 font-mono" style={{ color: row.successRate >= 70 ? "var(--positive)" : row.successRate >= 40 ? "var(--accent-brand)" : "var(--negative)" }}>{row.successRate}%</td>
                            <td className="px-3 py-2 w-48">
                              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                                <div className="h-full rounded-full" style={{ width: `${row.successRate}%`, background: row.successRate >= 70 ? "var(--positive)" : row.successRate >= 40 ? "var(--accent-brand)" : "var(--negative)" }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Cashflow Goals summary */}
                    <div className="mt-6">
                      <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Cashflow Goals Summary</p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["Goal", "Type", "Amount", "Frequency", "Years", "Inflation Adj."].map(h => (
                              <th key={h} className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {goals.map(g => (
                            <tr key={g.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{g.label}</td>
                              <td className="px-3 py-1.5 capitalize" style={{ color: g.type === "contribution" ? "var(--positive)" : "var(--negative)" }}>{g.type}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{formatINR(g.amount)}</td>
                              <td className="px-3 py-1.5 capitalize" style={{ color: "var(--text-muted)" }}>{g.frequency}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-muted)" }}>{g.startYear}–{g.endYear}</td>
                              <td className="px-3 py-1.5" style={{ color: "var(--text-muted)" }}>{g.inflationAdjusted ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
    <div className="rounded-lg border p-3" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="text-lg font-mono font-bold leading-tight" style={{ color }}>{value}</div>
      <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
    </div>
  );
}
