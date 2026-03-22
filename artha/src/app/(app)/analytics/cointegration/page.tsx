"use client";

import { useState, useMemo } from "react";
import { Play, Link2, BarChart2, TrendingUp, Table2 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, ZAxis, Cell
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, START_YEAR, END_YEAR
} from "@/lib/india-historical-data";

// ─── Cointegration Engine ────────────────────────────────────────────────────
// Engle-Granger two-step approach on cumulative log-price series

function runOLS2(y: number[], x: number[]): { alpha: number; beta: number; residuals: number[] } {
  const n = y.length;
  const xMean = x.reduce((s, v) => s + v, 0) / n;
  const yMean = y.reduce((s, v) => s + v, 0) / n;
  let ssXY = 0, ssXX = 0;
  for (let i = 0; i < n; i++) {
    ssXY += (x[i] - xMean) * (y[i] - yMean);
    ssXX += (x[i] - xMean) * (x[i] - xMean);
  }
  const beta = ssXX > 0 ? ssXY / ssXX : 0;
  const alpha = yMean - beta * xMean;
  const residuals = y.map((v, i) => v - alpha - beta * x[i]);
  return { alpha, beta, residuals };
}

// Augmented Dickey-Fuller test statistic (simplified: ADF(0) — no lags)
function adfStatistic(series: number[]): number {
  const n = series.length;
  if (n < 5) return 0;
  // ΔY_t = ρ * Y_{t-1} + ε_t  → test H0: ρ=0
  const dy = series.slice(1).map((v, i) => v - series[i]);
  const yLag = series.slice(0, -1);
  // Regress dy on yLag
  const { beta } = runOLS2(dy, yLag);
  // Standard error of beta
  const residuals = dy.map((v, i) => v - beta * yLag[i]);
  const sse = residuals.reduce((s, r) => s + r * r, 0);
  const mse = sse / (n - 2);
  const yLagMean = yLag.reduce((s, v) => s + v, 0) / yLag.length;
  const ssYLag = yLag.reduce((s, v) => s + (v - yLagMean) ** 2, 0);
  const seBeta = ssYLag > 0 ? Math.sqrt(mse / ssYLag) : 1;
  return seBeta > 0 ? beta / seBeta : 0;
}

// Critical values for ADF (approximate, 5% and 1% for Engle-Granger residual test)
const ADF_CRITICAL_5 = -3.37;
const ADF_CRITICAL_1 = -3.96;

interface CointegrationResult {
  assetA: AssetKey;
  assetB: AssetKey;
  labelA: string;
  labelB: string;
  beta: number; // hedge ratio
  alpha: number;
  adfStat: number;
  isCointegrated5: boolean; // at 5% level
  isCointegrated1: boolean; // at 1% level
  correlation: number;
  halfLife: number; // mean-reversion half-life in years
  spreadData: { year: number; priceA: number; priceB: number; spread: number; zScore: number }[];
}

function buildCumLogPrices(asset: AssetKey, startYear: number, endYear: number): { years: number[]; prices: number[] } {
  const years: number[] = [];
  const prices: number[] = [];
  let cumLog = 0;
  for (let y = startYear; y <= endYear; y++) {
    const ret = ANNUAL_RETURNS[y]?.[asset];
    if (ret === undefined) continue;
    cumLog += Math.log(1 + ret / 100);
    years.push(y);
    prices.push(Math.round(cumLog * 10000) / 10000);
  }
  return { years, prices };
}

function runCointegration(assetA: AssetKey, assetB: AssetKey, startYear: number, endYear: number): CointegrationResult {
  const serA = buildCumLogPrices(assetA, startYear, endYear);
  const serB = buildCumLogPrices(assetB, startYear, endYear);

  // Align years
  const commonYears = serA.years.filter(y => serB.years.includes(y));
  const pA = commonYears.map(y => serA.prices[serA.years.indexOf(y)]);
  const pB = commonYears.map(y => serB.prices[serB.years.indexOf(y)]);

  // Step 1: OLS regression pA = alpha + beta * pB + epsilon
  const { alpha, beta, residuals } = runOLS2(pA, pB);

  // Step 2: ADF test on residuals
  const adfStat = adfStatistic(residuals);

  // Correlation
  const n = commonYears.length;
  const mA = pA.reduce((s, v) => s + v, 0) / n;
  const mB = pB.reduce((s, v) => s + v, 0) / n;
  let cov = 0, vA = 0, vB = 0;
  for (let i = 0; i < n; i++) {
    cov += (pA[i] - mA) * (pB[i] - mB);
    vA += (pA[i] - mA) ** 2;
    vB += (pB[i] - mB) ** 2;
  }
  const correlation = vA > 0 && vB > 0 ? cov / Math.sqrt(vA * vB) : 0;

  // Half-life of mean reversion: regress Δε on ε_{t-1}
  const dRes = residuals.slice(1).map((v, i) => v - residuals[i]);
  const { beta: rho } = runOLS2(dRes, residuals.slice(0, -1));
  const halfLife = rho < 0 ? -Math.log(2) / Math.log(1 + rho) : Infinity;

  // Spread z-score
  const resMean = residuals.reduce((s, v) => s + v, 0) / n;
  const resStd = Math.sqrt(residuals.reduce((s, v) => s + (v - resMean) ** 2, 0) / n);

  const spreadData = commonYears.map((yr, i) => ({
    year: yr,
    priceA: Math.round(Math.exp(pA[i]) * 10000) / 100,
    priceB: Math.round(Math.exp(pB[i]) * 10000) / 100,
    spread: Math.round(residuals[i] * 10000) / 10000,
    zScore: resStd > 0 ? Math.round((residuals[i] - resMean) / resStd * 100) / 100 : 0,
  }));

  return {
    assetA,
    assetB,
    labelA: ASSET_LABELS[assetA],
    labelB: ASSET_LABELS[assetB],
    beta: Math.round(beta * 10000) / 10000,
    alpha: Math.round(alpha * 10000) / 10000,
    adfStat: Math.round(adfStat * 100) / 100,
    isCointegrated5: adfStat < ADF_CRITICAL_5,
    isCointegrated1: adfStat < ADF_CRITICAL_1,
    correlation: Math.round(correlation * 100) / 100,
    halfLife: isFinite(halfLife) ? Math.round(halfLife * 10) / 10 : -1,
    spreadData,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

type TabKey = "matrix" | "spread" | "zscore" | "prices";
const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];
const BASE_ASSETS: AssetKey[] = ["nifty50", "nifty500", "niftyMidcap", "gold", "debt"];

export default function CointegrationPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CointegrationResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("matrix");

  const [selectedAssets, setSelectedAssets] = useState<AssetKey[]>(BASE_ASSETS);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [activePair, setActivePair] = useState<number>(0);

  function toggleAsset(a: AssetKey) {
    setSelectedAssets(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }

  const isValid = selectedAssets.length >= 2 && startYear < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      const pairs: CointegrationResult[] = [];
      for (let i = 0; i < selectedAssets.length; i++) {
        for (let j = i + 1; j < selectedAssets.length; j++) {
          pairs.push(runCointegration(selectedAssets[i], selectedAssets[j], startYear, endYear));
        }
      }
      setResults(pairs);
      setActivePair(0);
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
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cointegration Analysis</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Test pairs of Indian assets for cointegration using the Engle-Granger two-step method. Identifies mean-reverting spreads for pairs trading.
          </p>

          <Section title="Time Period">
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
          </Section>

          <Section title="Assets (min 2)">
            <div className="space-y-1.5">
              {ASSET_OPTIONS.map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedAssets.includes(k)} onChange={() => toggleAsset(k)} className="rounded" />
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{label}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Methodology">
            <div className="text-[10px] space-y-1" style={{ color: "var(--text-muted)" }}>
              <p><strong>Step 1</strong>: OLS regression of log-price(A) on log-price(B) → hedge ratio β</p>
              <p><strong>Step 2</strong>: ADF test on regression residuals</p>
              <p><strong>Cointegrated</strong>: ADF stat &lt; −3.37 (5%) or &lt; −3.96 (1%)</p>
              <p><strong>Half-Life</strong>: Mean-reversion speed of the spread (years)</p>
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Testing…</>) : (<><Play size={14} /> Run Tests</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <Link2 size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Cointegration Ready</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Select assets and run to test for cointegrating relationships and mean-reverting spreads.
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
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-2 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {([
                    { key: "matrix" as TabKey, label: "Pair Matrix", icon: Table2 },
                    { key: "spread" as TabKey, label: "Spread", icon: BarChart2 },
                    { key: "zscore" as TabKey, label: "Z-Score", icon: TrendingUp },
                    { key: "prices" as TabKey, label: "Price Paths", icon: TrendingUp },
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

                <div className="flex-1 min-h-0 p-4 overflow-auto custom-scrollbar">
                  {activeTab === "matrix" && (
                    <div className="overflow-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["Pair", "Hedge β", "ADF Stat", "Coint?", "Corr", "Half-Life (yr)"].map(h => (
                              <th key={h} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr key={`${r.assetA}-${r.assetB}`} className="border-b cursor-pointer hover:opacity-80" style={{ borderColor: "var(--border)", background: activePair === i ? "var(--surface-elevated)" : undefined }} onClick={() => setActivePair(i)}>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{r.labelA} / {r.labelB}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--accent-brand)" }}>{r.beta.toFixed(4)}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: r.isCointegrated5 ? "var(--positive)" : "var(--text-muted)" }}>{r.adfStat.toFixed(2)}</td>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: r.isCointegrated1 ? "var(--positive)" : r.isCointegrated5 ? "#eab308" : "var(--negative)" }}>
                                {r.isCointegrated1 ? "Yes (1%)" : r.isCointegrated5 ? "Yes (5%)" : "No"}
                              </td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{r.correlation.toFixed(2)}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: r.halfLife > 0 && r.halfLife < 5 ? "var(--positive)" : "var(--text-muted)" }}>
                                {r.halfLife > 0 ? `${r.halfLife} yr` : "∞"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-[10px] mt-3" style={{ color: "var(--text-muted)" }}>
                        Click a row to view its spread, z-score, and price paths in other tabs. Pairs with ADF &lt; −3.37 show statistically significant cointegration.
                      </p>
                    </div>
                  )}

                  {activeTab === "spread" && results[activePair] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Regression residual (spread) for <strong>{results[activePair].labelA} / {results[activePair].labelB}</strong>.
                        {results[activePair].isCointegrated5 ? " This spread is mean-reverting." : " This spread is not stationary."}
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={results[activePair].spreadData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} width={50} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => Number(v).toFixed(4)} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={1} strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="spread" name="Spread (ε)" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "zscore" && results[activePair] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Z-score of spread for <strong>{results[activePair].labelA} / {results[activePair].labelB}</strong>. Trading signals: buy spread when z &lt; −2, sell when z &gt; 2.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results[activePair].spreadData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} width={35} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => Number(v).toFixed(2)} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <ReferenceLine y={2} stroke="#ef4444" strokeWidth={1} strokeDasharray="3 3" label={{ value: "+2σ", position: "right", fontSize: 9, fill: "#ef4444" }} />
                            <ReferenceLine y={-2} stroke="#10b981" strokeWidth={1} strokeDasharray="3 3" label={{ value: "−2σ", position: "right", fontSize: 9, fill: "#10b981" }} />
                            <Bar dataKey="zScore" name="Z-Score" radius={[2, 2, 0, 0]}>
                              {results[activePair].spreadData.map((d, i) => (
                                <Cell key={i} fill={d.zScore > 2 ? "#ef4444" : d.zScore < -2 ? "#10b981" : "#6366f1"} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "prices" && results[activePair] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Normalized cumulative growth (base 100) for <strong>{results[activePair].labelA}</strong> and <strong>{results[activePair].labelB}</strong>.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={results[activePair].spreadData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} width={55} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}`} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Line type="monotone" dataKey="priceA" name={results[activePair].labelA} stroke="#6366f1" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="priceB" name={results[activePair].labelB} stroke="#f97316" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
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
