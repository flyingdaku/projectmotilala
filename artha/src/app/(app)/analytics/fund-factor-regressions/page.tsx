"use client";

import { useState, useMemo } from "react";
import { Play, FlaskConical, BarChart2, Table2 } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell, ZAxis
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, START_YEAR, END_YEAR,
  MF_CATEGORIES, MFCategory
} from "@/lib/india-historical-data";

// ─── Factor regression engine ────────────────────────────────────────────────

// Approximate MF category returns using base asset + alpha + noise
// In reality these come from AMFI data; here we derive from underlying assets
function syntheticMFReturns(category: string, year: number): number {
  const cat = MF_CATEGORIES[category];
  if (!cat) return 0;
  // Map categories to underlying asset proxies
  const proxyMap: Record<string, { asset: AssetKey; alpha: number }> = {
    largeCap: { asset: "nifty50", alpha: 1.5 },
    flexiCap: { asset: "nifty500", alpha: 1.8 },
    midCap: { asset: "niftyMidcap", alpha: 2.0 },
    smallCap: { asset: "niftyMidcap", alpha: 3.5 },
    elss: { asset: "nifty500", alpha: 1.2 },
    balanced: { asset: "balanced", alpha: 0.5 },
    aggressive: { asset: "nifty500", alpha: 1.0 },
    shortDuration: { asset: "debt", alpha: 0.3 },
    liquidFund: { asset: "debt", alpha: -1.0 },
    gilt: { asset: "debt", alpha: 0.5 },
  };
  const proxy = proxyMap[category] ?? { asset: "nifty500" as AssetKey, alpha: 1.0 };
  const baseReturn = ANNUAL_RETURNS[year]?.[proxy.asset] ?? 0;
  // Subtract TER to get net return, add category alpha
  return baseReturn - cat.regularTER + proxy.alpha;
}

// Factors: Market (Nifty 500 - Rf), Size (Midcap - Nifty50), Value (proxy: Gold-Debt spread as alternative)
function getFactors(year: number): { market: number; size: number; value: number; rf: number } {
  const rf = 7; // approximate
  const n500 = ANNUAL_RETURNS[year]?.nifty500 ?? 0;
  const n50 = ANNUAL_RETURNS[year]?.nifty50 ?? 0;
  const midcap = ANNUAL_RETURNS[year]?.niftyMidcap ?? 0;
  const gold = ANNUAL_RETURNS[year]?.gold ?? 0;
  const debt = ANNUAL_RETURNS[year]?.debt ?? 0;
  return {
    market: n500 - rf,
    size: midcap - n50,
    value: gold - debt, // proxy for alternative/value tilt
    rf,
  };
}

interface RegressionResult {
  category: string;
  categoryLabel: string;
  alpha: number;
  betaMarket: number;
  betaSize: number;
  betaValue: number;
  rSquared: number;
  residuals: { year: number; actual: number; predicted: number; residual: number }[];
  factorContributions: { factor: string; contribution: number }[];
}

function runOLS(y: number[], X: number[][]): { coeffs: number[]; rSquared: number } {
  // y = X * beta, solve via normal equations: beta = (X'X)^-1 X'y
  const n = y.length;
  const p = X[0].length;
  
  // X'X
  const XtX: number[][] = Array.from({ length: p }, () => Array(p).fill(0));
  for (let i = 0; i < p; i++)
    for (let j = 0; j < p; j++)
      for (let k = 0; k < n; k++)
        XtX[i][j] += X[k][i] * X[k][j];

  // X'y
  const Xty: number[] = Array(p).fill(0);
  for (let i = 0; i < p; i++)
    for (let k = 0; k < n; k++)
      Xty[i] += X[k][i] * y[k];

  // Invert XtX via Gauss-Jordan (small matrix)
  const aug = XtX.map((row, i) => [...row, ...Array(p).fill(0).map((_, j) => i === j ? 1 : 0)]);
  for (let i = 0; i < p; i++) {
    let maxRow = i;
    for (let k = i + 1; k < p; k++) if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k;
    [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
    const pivot = aug[i][i];
    if (Math.abs(pivot) < 1e-12) continue;
    for (let j = 0; j < 2 * p; j++) aug[i][j] /= pivot;
    for (let k = 0; k < p; k++) {
      if (k === i) continue;
      const factor = aug[k][i];
      for (let j = 0; j < 2 * p; j++) aug[k][j] -= factor * aug[i][j];
    }
  }
  const inv = aug.map(row => row.slice(p));

  // beta = inv * Xty
  const coeffs = inv.map(row => row.reduce((s, v, j) => s + v * Xty[j], 0));

  // R-squared
  const yMean = y.reduce((s, v) => s + v, 0) / n;
  const ssTotal = y.reduce((s, v) => s + Math.pow(v - yMean, 2), 0);
  const ssResid = y.reduce((s, v, i) => {
    const pred = X[i].reduce((ps, xv, j) => ps + xv * coeffs[j], 0);
    return s + Math.pow(v - pred, 2);
  }, 0);
  const rSquared = ssTotal > 0 ? 1 - ssResid / ssTotal : 0;

  return { coeffs, rSquared };
}

function runFactorRegression(category: string, startYear: number, endYear: number): RegressionResult {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    .filter(y => ANNUAL_RETURNS[y]);

  const cat = MF_CATEGORIES[category];
  const y = years.map(yr => syntheticMFReturns(category, yr) - getFactors(yr).rf);
  const X = years.map(yr => {
    const f = getFactors(yr);
    return [1, f.market, f.size, f.value]; // intercept + 3 factors
  });

  const { coeffs, rSquared } = runOLS(y, X);
  const [alpha, betaMarket, betaSize, betaValue] = coeffs;

  const residuals = years.map((yr, i) => {
    const predicted = X[i].reduce((s, v, j) => s + v * coeffs[j], 0);
    return { year: yr, actual: y[i], predicted: Math.round(predicted * 100) / 100, residual: Math.round((y[i] - predicted) * 100) / 100 };
  });

  const avgFactors = {
    market: years.reduce((s, yr) => s + getFactors(yr).market, 0) / years.length,
    size: years.reduce((s, yr) => s + getFactors(yr).size, 0) / years.length,
    value: years.reduce((s, yr) => s + getFactors(yr).value, 0) / years.length,
  };

  return {
    category,
    categoryLabel: cat?.label ?? category,
    alpha: Math.round(alpha * 100) / 100,
    betaMarket: Math.round(betaMarket * 1000) / 1000,
    betaSize: Math.round(betaSize * 1000) / 1000,
    betaValue: Math.round(betaValue * 1000) / 1000,
    rSquared: Math.round(rSquared * 10000) / 100,
    residuals,
    factorContributions: [
      { factor: "Alpha", contribution: Math.round(alpha * 100) / 100 },
      { factor: "Market", contribution: Math.round(betaMarket * avgFactors.market * 100) / 100 },
      { factor: "Size", contribution: Math.round(betaSize * avgFactors.size * 100) / 100 },
      { factor: "Value/Alt", contribution: Math.round(betaValue * avgFactors.value * 100) / 100 },
    ],
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

type TabKey = "summary" | "contributions" | "residuals" | "scatter";
const CATEGORY_OPTIONS = Object.entries(MF_CATEGORIES).map(([k, v]) => [k, v.label] as [string, string]);
const COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#a855f7", "#eab308"];

export default function FundFactorRegressionsPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<RegressionResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Object.keys(MF_CATEGORIES).slice(0, 6)
  );

  function toggleCategory(cat: string) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  const isValid = selectedCategories.length >= 1 && startYear < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setResults(selectedCategories.map(cat => runFactorRegression(cat, startYear, endYear)));
      setRunning(false);
    }, 50);
  }

  const [activeResult, setActiveResult] = useState(0);

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" };

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Fund Factor Regressions</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Regress MF category returns against market, size, and value/alternative factors to decompose performance into alpha and factor exposures.
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

          <Section title="MF Categories">
            <div className="space-y-1.5">
              {CATEGORY_OPTIONS.map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedCategories.includes(k)} onChange={() => toggleCategory(k)} className="rounded" />
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{label}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Factor Model">
            <div className="text-[10px] space-y-1" style={{ color: "var(--text-muted)" }}>
              <p><strong>Market</strong>: Nifty 500 excess return (Nifty 500 − Rf)</p>
              <p><strong>Size</strong>: Midcap 150 − Nifty 50 (small minus big)</p>
              <p><strong>Value/Alt</strong>: Gold − Debt (alternative asset premium)</p>
              <p><strong>Alpha (α)</strong>: Intercept — skill or unexplained return</p>
              <p className="pt-1 italic">R(fund) − Rf = α + β₁·Market + β₂·Size + β₃·Value + ε</p>
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Regressing…</>) : (<><Play size={14} /> Run Regressions</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <FlaskConical size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Ready to Regress</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Select MF categories and run to decompose their returns into factor exposures.
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
                    { key: "summary" as TabKey, label: "Regression Summary", icon: Table2 },
                    { key: "contributions" as TabKey, label: "Factor Contributions", icon: BarChart2 },
                    { key: "residuals" as TabKey, label: "Residuals", icon: BarChart2 },
                    { key: "scatter" as TabKey, label: "Actual vs Predicted", icon: FlaskConical },
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
                  {activeTab === "summary" && (
                    <div className="overflow-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["Category", "Alpha (α)", "β Market", "β Size", "β Value/Alt", "R²"].map(h => (
                              <th key={h} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr key={r.category} className="border-b cursor-pointer hover:opacity-80" style={{ borderColor: "var(--border)", background: activeResult === i ? "var(--surface-elevated)" : undefined }} onClick={() => setActiveResult(i)}>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{r.categoryLabel}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: r.alpha > 0 ? "var(--positive)" : "var(--negative)" }}>{r.alpha > 0 ? "+" : ""}{r.alpha.toFixed(2)}%</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--accent-brand)" }}>{r.betaMarket.toFixed(3)}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: r.betaSize > 0 ? "var(--positive)" : "var(--text-muted)" }}>{r.betaSize > 0 ? "+" : ""}{r.betaSize.toFixed(3)}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{r.betaValue > 0 ? "+" : ""}{r.betaValue.toFixed(3)}</td>
                              <td className="px-3 py-1.5 font-mono font-semibold" style={{ color: r.rSquared > 70 ? "var(--positive)" : "var(--text-muted)" }}>{r.rSquared.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-[10px] mt-3" style={{ color: "var(--text-muted)" }}>
                        Click a row to view its residuals and scatter plot in other tabs. Higher R² means the factor model explains more of the fund&apos;s return variation.
                      </p>
                    </div>
                  )}

                  {activeTab === "contributions" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Average annualized return contribution from each factor for each MF category.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.map(r => ({ name: r.categoryLabel, ...Object.fromEntries(r.factorContributions.map(f => [f.factor, f.contribution])) }))} margin={{ top: 5, right: 10, left: 10, bottom: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--text-muted)" }} angle={-30} textAnchor="end" height={60} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={45} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(2)}%`} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Bar dataKey="Alpha" stackId="a" fill="#6366f1" />
                            <Bar dataKey="Market" stackId="a" fill="#f97316" />
                            <Bar dataKey="Size" stackId="a" fill="#10b981" />
                            <Bar dataKey="Value/Alt" stackId="a" fill="#ef4444" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "residuals" && results[activeResult] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Residuals for <strong>{results[activeResult].categoryLabel}</strong> — should be randomly scattered around zero if the model fits well.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results[activeResult].residuals} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={45} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(2)}%`} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Bar dataKey="residual" name="Residual" radius={[2, 2, 0, 0]}>
                              {results[activeResult].residuals.map((d, i) => (
                                <Cell key={i} fill={d.residual >= 0 ? "#10b981" : "#ef4444"} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "scatter" && results[activeResult] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Actual vs predicted excess returns for <strong>{results[activeResult].categoryLabel}</strong> (R² = {results[activeResult].rSquared}%).
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="predicted" name="Predicted" tick={{ fontSize: 10, fill: "var(--text-muted)" }} label={{ value: "Predicted (%)", position: "bottom", fontSize: 11, fill: "var(--text-muted)" }} />
                            <YAxis dataKey="actual" name="Actual" tick={{ fontSize: 10, fill: "var(--text-muted)" }} label={{ value: "Actual (%)", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--text-muted)" }} />
                            <ZAxis range={[50, 50]} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} labelFormatter={(_, payload) => {
                              const d = payload?.[0]?.payload;
                              return d ? `Year ${d.year}` : "";
                            }} />
                            <Scatter data={results[activeResult].residuals} fill="#6366f1" />
                          </ScatterChart>
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
