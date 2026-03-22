"use client";

import { useState } from "react";
import { Play, FlaskConical, BarChart2, Table2, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell, ZAxis
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, START_YEAR, END_YEAR
} from "@/lib/india-historical-data";

// ─── OLS Engine ──────────────────────────────────────────────────────────────

function runOLS(y: number[], X: number[][]): { coeffs: number[]; rSquared: number; residuals: number[] } {
  const n = y.length;
  const p = X[0].length;
  const XtX: number[][] = Array.from({ length: p }, () => Array(p).fill(0));
  for (let i = 0; i < p; i++)
    for (let j = 0; j < p; j++)
      for (let k = 0; k < n; k++)
        XtX[i][j] += X[k][i] * X[k][j];
  const Xty: number[] = Array(p).fill(0);
  for (let i = 0; i < p; i++)
    for (let k = 0; k < n; k++)
      Xty[i] += X[k][i] * y[k];
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
      const f = aug[k][i];
      for (let j = 0; j < 2 * p; j++) aug[k][j] -= f * aug[i][j];
    }
  }
  const inv = aug.map(row => row.slice(p));
  const coeffs = inv.map(row => row.reduce((s, v, j) => s + v * Xty[j], 0));
  const yMean = y.reduce((s, v) => s + v, 0) / n;
  const ssTotal = y.reduce((s, v) => s + Math.pow(v - yMean, 2), 0);
  const residuals = y.map((v, i) => v - X[i].reduce((s, xv, j) => s + xv * coeffs[j], 0));
  const ssResid = residuals.reduce((s, r) => s + r * r, 0);
  const rSquared = ssTotal > 0 ? 1 - ssResid / ssTotal : 0;
  return { coeffs, rSquared, residuals };
}

// ─── Factor definitions ──────────────────────────────────────────────────────

type FactorKey = "market" | "size" | "goldDebt" | "momentum";

const FACTOR_LABELS: Record<FactorKey, string> = {
  market: "Market (Nifty 500 − Rf)",
  size: "Size (Midcap − Large)",
  goldDebt: "Gold − Debt",
  momentum: "Momentum (prev yr return)",
};

function getFactorValue(factor: FactorKey, year: number, asset?: AssetKey): number {
  const rf = 7;
  switch (factor) {
    case "market": return (ANNUAL_RETURNS[year]?.nifty500 ?? 0) - rf;
    case "size": return (ANNUAL_RETURNS[year]?.niftyMidcap ?? 0) - (ANNUAL_RETURNS[year]?.nifty50 ?? 0);
    case "goldDebt": return (ANNUAL_RETURNS[year]?.gold ?? 0) - (ANNUAL_RETURNS[year]?.debt ?? 0);
    case "momentum": return ANNUAL_RETURNS[year - 1]?.[asset ?? "nifty50"] ?? 0;
    default: return 0;
  }
}

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];
const ALL_FACTORS: FactorKey[] = ["market", "size", "goldDebt", "momentum"];

interface FactorResult {
  asset: AssetKey;
  assetLabel: string;
  alpha: number;
  betas: { factor: FactorKey; beta: number }[];
  rSquared: number;
  residualData: { year: number; actual: number; predicted: number; residual: number }[];
  rollingAlpha: { year: number; alpha: number }[];
}

function runFactorModel(
  asset: AssetKey,
  factors: FactorKey[],
  startYear: number,
  endYear: number
): FactorResult {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    .filter(y => ANNUAL_RETURNS[y]);
  const rf = 7;

  const y = years.map(yr => (ANNUAL_RETURNS[yr]?.[asset] ?? 0) - rf);
  const X = years.map(yr => [1, ...factors.map(f => getFactorValue(f, yr, asset))]);

  const { coeffs, rSquared, residuals: resids } = runOLS(y, X);
  const [alpha, ...betas] = coeffs;

  const residualData = years.map((yr, i) => ({
    year: yr,
    actual: Math.round(y[i] * 100) / 100,
    predicted: Math.round((y[i] - resids[i]) * 100) / 100,
    residual: Math.round(resids[i] * 100) / 100,
  }));

  // Rolling 5-year alpha
  const rollingAlpha: { year: number; alpha: number }[] = [];
  const window = 5;
  for (let end = startYear + window - 1; end <= endYear; end++) {
    const wYears = Array.from({ length: window }, (_, i) => end - window + 1 + i).filter(yr => ANNUAL_RETURNS[yr]);
    if (wYears.length < window) continue;
    const wy = wYears.map(yr => (ANNUAL_RETURNS[yr]?.[asset] ?? 0) - rf);
    const wX = wYears.map(yr => [1, ...factors.map(f => getFactorValue(f, yr, asset))]);
    const { coeffs: wCoeffs } = runOLS(wy, wX);
    rollingAlpha.push({ year: end, alpha: Math.round(wCoeffs[0] * 100) / 100 });
  }

  return {
    asset,
    assetLabel: ASSET_LABELS[asset],
    alpha: Math.round(alpha * 100) / 100,
    betas: factors.map((f, i) => ({ factor: f, beta: Math.round(betas[i] * 1000) / 1000 })),
    rSquared: Math.round(rSquared * 10000) / 100,
    residualData,
    rollingAlpha,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

type TabKey = "summary" | "residuals" | "scatter" | "rolling";

export default function FactorRegressionPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<FactorResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  const [selectedAssets, setSelectedAssets] = useState<AssetKey[]>(["nifty50", "niftyMidcap", "gold"]);
  const [selectedFactors, setSelectedFactors] = useState<FactorKey[]>(["market", "size", "goldDebt"]);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [activeResult, setActiveResult] = useState(0);

  function toggleAsset(a: AssetKey) {
    setSelectedAssets(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }
  function toggleFactor(f: FactorKey) {
    setSelectedFactors(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  const isValid = selectedAssets.length >= 1 && selectedFactors.length >= 1 && startYear < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setResults(selectedAssets.map(a => runFactorModel(a, selectedFactors, startYear, endYear)));
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
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Factor Regression</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Multi-factor regression for individual asset classes. Decompose returns into systematic factor exposures and alpha.
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

          <Section title="Dependent Variables (Assets)">
            <div className="space-y-1.5">
              {ASSET_OPTIONS.map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedAssets.includes(k)} onChange={() => toggleAsset(k)} className="rounded" />
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{label}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Independent Variables (Factors)">
            <div className="space-y-1.5">
              {ALL_FACTORS.map(f => (
                <label key={f} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedFactors.includes(f)} onChange={() => toggleFactor(f)} className="rounded" />
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{FACTOR_LABELS[f]}</span>
                </label>
              ))}
            </div>
            <p className="text-[9px] mt-1 italic" style={{ color: "var(--text-muted)" }}>
              R(asset) − Rf = α + Σ βᵢ·Factorᵢ + ε
            </p>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Regressing…</>) : (<><Play size={14} /> Run Regression</>)}
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
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Factor Model Ready</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Select assets and factors to run a multi-factor regression and decompose asset returns.
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
                    { key: "residuals" as TabKey, label: "Residuals", icon: BarChart2 },
                    { key: "scatter" as TabKey, label: "Actual vs Predicted", icon: FlaskConical },
                    { key: "rolling" as TabKey, label: "Rolling Alpha", icon: TrendingUp },
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
                            <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>Asset</th>
                            <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>Alpha (α)</th>
                            {selectedFactors.map(f => (
                              <th key={f} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>β {FACTOR_LABELS[f].split("(")[0].trim()}</th>
                            ))}
                            <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>R²</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr key={r.asset} className="border-b cursor-pointer hover:opacity-80" style={{ borderColor: "var(--border)", background: activeResult === i ? "var(--surface-elevated)" : undefined }} onClick={() => setActiveResult(i)}>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{r.assetLabel}</td>
                              <td className="px-3 py-1.5 font-mono" style={{ color: r.alpha > 0 ? "var(--positive)" : r.alpha < 0 ? "var(--negative)" : "var(--text-muted)" }}>{r.alpha > 0 ? "+" : ""}{r.alpha.toFixed(2)}%</td>
                              {r.betas.map(b => (
                                <td key={b.factor} className="px-3 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{b.beta > 0 ? "+" : ""}{b.beta.toFixed(3)}</td>
                              ))}
                              <td className="px-3 py-1.5 font-mono font-semibold" style={{ color: r.rSquared > 70 ? "var(--positive)" : "var(--text-muted)" }}>{r.rSquared.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-[10px] mt-3" style={{ color: "var(--text-muted)" }}>
                        Click a row to view its residuals, scatter, and rolling alpha in other tabs.
                      </p>
                    </div>
                  )}

                  {activeTab === "residuals" && results[activeResult] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Residuals for <strong>{results[activeResult].assetLabel}</strong>
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results[activeResult].residualData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={45} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(2)}%`} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Bar dataKey="residual" name="Residual" radius={[2, 2, 0, 0]}>
                              {results[activeResult].residualData.map((d, i) => (
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
                        Actual vs predicted for <strong>{results[activeResult].assetLabel}</strong> (R² = {results[activeResult].rSquared}%)
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
                            <Scatter data={results[activeResult].residualData} fill="#6366f1" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "rolling" && results[activeResult] && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        5-year rolling alpha for <strong>{results[activeResult].assetLabel}</strong> — shows how excess return after factor adjustment evolves over time.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results[activeResult].rollingAlpha} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={45} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(2)}%`} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Bar dataKey="alpha" name="Rolling α" radius={[2, 2, 0, 0]}>
                              {results[activeResult].rollingAlpha.map((d, i) => (
                                <Cell key={i} fill={d.alpha >= 0 ? "#6366f1" : "#ef4444"} />
                              ))}
                            </Bar>
                          </BarChart>
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
