"use client";

import { useState, useMemo } from "react";
import { Play, Layers, BarChart2, Table2, ScatterChart as ScatterIcon } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter, ZAxis, Cell, LineChart, Line, ReferenceLine
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, START_YEAR, END_YEAR
} from "@/lib/india-historical-data";

// ─── PCA Engine (power iteration, no external lib) ──────────────────────────

const ALL_ASSETS: AssetKey[] = ["nifty50", "nifty500", "niftyMidcap", "gold", "debt", "balanced"];
const COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#a855f7", "#eab308"];

interface PCAResult {
  eigenvalues: number[];
  varianceExplained: number[];
  cumulativeVariance: number[];
  loadings: number[][]; // [component][asset]
  scores: { year: number; pc1: number; pc2: number }[];
  correlationMatrix: number[][];
  assetNames: string[];
  nComponents: number;
}

function runPCA(assets: AssetKey[], startYear: number, endYear: number): PCAResult {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    .filter(y => ANNUAL_RETURNS[y]);
  const n = years.length;
  const p = assets.length;

  // Build return matrix and standardize
  const rawReturns = years.map(y => assets.map(a => ANNUAL_RETURNS[y]?.[a] ?? 0));
  const means = assets.map((_, j) => rawReturns.reduce((s, row) => s + row[j], 0) / n);
  const stds = assets.map((_, j) => {
    const m = means[j];
    return Math.sqrt(rawReturns.reduce((s, row) => s + Math.pow(row[j] - m, 2), 0) / n);
  });
  const standardized = rawReturns.map(row => row.map((v, j) => stds[j] > 0 ? (v - means[j]) / stds[j] : 0));

  // Correlation matrix (= covariance of standardized data)
  const corrMatrix: number[][] = Array.from({ length: p }, () => Array(p).fill(0));
  for (let i = 0; i < p; i++) {
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += standardized[k][i] * standardized[k][j];
      corrMatrix[i][j] = sum / n;
    }
  }

  // Power iteration to extract eigenvalues/vectors
  const eigenvalues: number[] = [];
  const eigenvectors: number[][] = [];
  const A = corrMatrix.map(row => [...row]);

  for (let comp = 0; comp < p; comp++) {
    let v = Array.from({ length: p }, () => Math.random());
    let eigenvalue = 0;

    for (let iter = 0; iter < 200; iter++) {
      // Multiply A * v
      const Av = A.map(row => row.reduce((s, val, j) => s + val * v[j], 0));
      eigenvalue = Math.sqrt(Av.reduce((s, x) => s + x * x, 0));
      if (eigenvalue === 0) break;
      v = Av.map(x => x / eigenvalue);
    }

    eigenvalues.push(eigenvalue);
    eigenvectors.push([...v]);

    // Deflate: A = A - eigenvalue * v * v^T
    for (let i = 0; i < p; i++) {
      for (let j = 0; j < p; j++) {
        A[i][j] -= eigenvalue * v[i] * v[j];
      }
    }
  }

  const totalVar = eigenvalues.reduce((s, e) => s + e, 0);
  const varianceExplained = eigenvalues.map(e => Math.round((e / totalVar) * 10000) / 100);
  const cumulativeVariance: number[] = [];
  varianceExplained.reduce((sum, v) => { const c = sum + v; cumulativeVariance.push(Math.round(c * 100) / 100); return c; }, 0);

  // Loadings = eigenvectors (each eigenvector is a column of loadings)
  const loadings = eigenvectors;

  // Scores: project standardized data onto principal components
  const scores = years.map((year, i) => {
    const row = standardized[i];
    return {
      year,
      pc1: Math.round(row.reduce((s, v, j) => s + v * eigenvectors[0][j], 0) * 100) / 100,
      pc2: Math.round(row.reduce((s, v, j) => s + v * (eigenvectors[1]?.[j] ?? 0), 0) * 100) / 100,
    };
  });

  return {
    eigenvalues,
    varianceExplained,
    cumulativeVariance,
    loadings,
    scores,
    correlationMatrix: corrMatrix.map(row => row.map(v => Math.round(v * 100) / 100)),
    assetNames: assets.map(a => ASSET_LABELS[a]),
    nComponents: p,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

type TabKey = "scree" | "loadings" | "biplot" | "scores" | "correlation";

export default function PCAPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<PCAResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("scree");

  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [selectedAssets, setSelectedAssets] = useState<AssetKey[]>([...ALL_ASSETS]);

  function toggleAsset(asset: AssetKey) {
    setSelectedAssets(prev =>
      prev.includes(asset) ? prev.filter(a => a !== asset) : [...prev, asset]
    );
  }

  const isValid = selectedAssets.length >= 3 && startYear < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setResults(runPCA(selectedAssets, startYear, endYear));
      setRunning(false);
    }, 50);
  }

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" };

  // Scree chart data
  const screeData = useMemo(() => {
    if (!results) return [];
    return results.varianceExplained.map((v, i) => ({
      component: `PC${i + 1}`,
      variance: v,
      cumulative: results.cumulativeVariance[i],
    }));
  }, [results]);

  // Loadings heatmap data
  const loadingsData = useMemo(() => {
    if (!results) return [];
    return results.assetNames.map((name, ai) => {
      const row: Record<string, string | number> = { asset: name };
      for (let c = 0; c < Math.min(results.nComponents, 4); c++) {
        row[`PC${c + 1}`] = Math.round(results.loadings[c][ai] * 1000) / 1000;
      }
      return row;
    });
  }, [results]);

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Principal Component Analysis</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Decompose Indian asset class returns into orthogonal principal components to identify the key drivers of portfolio variance.
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

          <Section title="Select Assets (min 3)">
            <div className="space-y-1.5">
              {ALL_ASSETS.map(asset => (
                <label key={asset} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedAssets.includes(asset)} onChange={() => toggleAsset(asset)} className="rounded" />
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{ASSET_LABELS[asset]}</span>
                </label>
              ))}
            </div>
            <p className="text-[9px] mt-1" style={{ color: selectedAssets.length >= 3 ? "var(--text-muted)" : "var(--negative)" }}>
              {selectedAssets.length} asset{selectedAssets.length !== 1 ? "s" : ""} selected{selectedAssets.length < 3 ? " (need at least 3)" : ""}
            </p>
          </Section>

          <Section title="Interpretation Guide">
            <div className="text-[10px] space-y-1.5" style={{ color: "var(--text-muted)" }}>
              <p><strong>PC1</strong> typically captures the broad market/risk-on factor — when most assets move together.</p>
              <p><strong>PC2</strong> often captures the equity-vs-debt rotation or gold-vs-equity divergence.</p>
              <p><strong>Loadings</strong> show how much each asset contributes to each component. Higher absolute values = stronger influence.</p>
              <p><strong>Scree plot</strong>: components to the left of the "elbow" explain meaningful variance; the rest is noise.</p>
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Computing…</>) : (<><Play size={14} /> Run PCA</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <Layers size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Ready for PCA</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Select assets and time period, then run to decompose returns into principal components.
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
                {/* Summary */}
                <div className="p-3 border-b grid grid-cols-4 gap-2" style={{ borderColor: "var(--border)" }}>
                  <SummaryCard label="PC1 Variance" value={`${results.varianceExplained[0]}%`} color="var(--accent-brand)" />
                  <SummaryCard label="PC2 Variance" value={`${results.varianceExplained[1] ?? 0}%`} color="#f97316" />
                  <SummaryCard label="PC1+PC2" value={`${results.cumulativeVariance[1] ?? results.cumulativeVariance[0]}%`} color="var(--positive)" />
                  <SummaryCard label="Components" value={`${results.nComponents}`} color="var(--text-primary)" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-2 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {([
                    { key: "scree" as TabKey, label: "Scree Plot", icon: BarChart2 },
                    { key: "loadings" as TabKey, label: "Loadings", icon: Table2 },
                    { key: "biplot" as TabKey, label: "Biplot (PC1 vs PC2)", icon: ScatterIcon },
                    { key: "scores" as TabKey, label: "Score Timeline", icon: Layers },
                    { key: "correlation" as TabKey, label: "Correlation Matrix", icon: Table2 },
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
                  {activeTab === "scree" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Variance explained by each principal component. The "elbow" indicates where additional components add diminishing value.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={screeData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="component" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} width={50} domain={[0, 100]} />
                            <Tooltip contentStyle={ttSt} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar yAxisId="left" dataKey="variance" name="Variance Explained %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Cumulative %" stroke="#f97316" strokeWidth={2} dot={{ r: 4, fill: "#f97316" }} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "loadings" && (
                    <div className="overflow-auto">
                      <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                        Factor loadings show each asset&apos;s contribution to each principal component. Values range from -1 to +1.
                      </p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>Asset</th>
                            {Array.from({ length: Math.min(results.nComponents, 4) }, (_, i) => (
                              <th key={i} className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
                                PC{i + 1} ({results.varianceExplained[i]}%)
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {loadingsData.map((row, i) => (
                            <tr key={i} className="border-b" style={{ borderColor: "var(--border)" }}>
                              <td className="px-3 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{row.asset}</td>
                              {Array.from({ length: Math.min(results.nComponents, 4) }, (_, c) => {
                                const val = row[`PC${c + 1}`] as number;
                                const absVal = Math.abs(val);
                                const bgOpacity = Math.min(absVal * 0.8, 0.4);
                                const bgColor = val > 0 ? `rgba(16,185,129,${bgOpacity})` : `rgba(239,68,68,${bgOpacity})`;
                                return (
                                  <td key={c} className="px-3 py-1.5 font-mono text-center" style={{ color: "var(--text-primary)", background: bgColor }}>
                                    {val > 0 ? "+" : ""}{val.toFixed(3)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "biplot" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Each point is a year plotted on PC1 (x) vs PC2 (y). Arrows show asset loading directions. Years that cluster together had similar return patterns.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="pc1" name="PC1" tick={{ fontSize: 10, fill: "var(--text-muted)" }} label={{ value: `PC1 (${results.varianceExplained[0]}%)`, position: "bottom", fontSize: 11, fill: "var(--text-muted)" }} />
                            <YAxis dataKey="pc2" name="PC2" tick={{ fontSize: 10, fill: "var(--text-muted)" }} label={{ value: `PC2 (${results.varianceExplained[1] ?? 0}%)`, angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--text-muted)" }} />
                            <ZAxis range={[40, 40]} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => Number(v).toFixed(2)} labelFormatter={(_, payload) => {
                              const item = payload?.[0]?.payload;
                              return item ? `Year ${item.year}` : "";
                            }} />
                            <ReferenceLine x={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Scatter data={results.scores} fill="#6366f1">
                              {results.scores.map((s, i) => (
                                <Cell key={i} fill={s.pc1 > 0 ? "#10b981" : "#ef4444"} />
                              ))}
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                      {/* Loading arrows legend */}
                      <div className="mt-2 flex flex-wrap gap-3">
                        {results.assetNames.map((name, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                              {name}: ({results.loadings[0][i] > 0 ? "+" : ""}{results.loadings[0][i].toFixed(2)}, {(results.loadings[1]?.[i] ?? 0) > 0 ? "+" : ""}{(results.loadings[1]?.[i] ?? 0).toFixed(2)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "scores" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        PC1 and PC2 scores over time. Positive PC1 typically corresponds to broadly positive market years.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.scores} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} width={40} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => Number(v).toFixed(2)} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={0.5} />
                            <Bar dataKey="pc1" name="PC1 Score" fill="#6366f1" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="pc2" name="PC2 Score" fill="#f97316" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "correlation" && (
                    <div className="overflow-auto">
                      <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                        Correlation matrix of standardized returns. PCA decomposes this matrix into eigenvalues and eigenvectors.
                      </p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}></th>
                            {results.assetNames.map(name => (
                              <th key={name} className="text-center px-2 py-2 font-semibold" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)", fontSize: 10 }}>{name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.correlationMatrix.map((row, i) => (
                            <tr key={i} className="border-b" style={{ borderColor: "var(--border)" }}>
                              <td className="px-3 py-1.5 font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{results.assetNames[i]}</td>
                              {row.map((val, j) => {
                                const absVal = Math.abs(val);
                                const bgOpacity = Math.min(absVal * 0.5, 0.4);
                                const bgColor = i === j ? "var(--surface-elevated)" : val > 0 ? `rgba(16,185,129,${bgOpacity})` : `rgba(239,68,68,${bgOpacity})`;
                                return (
                                  <td key={j} className="px-2 py-1.5 font-mono text-center" style={{ color: "var(--text-primary)", background: bgColor, fontSize: 11 }}>
                                    {val.toFixed(2)}
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
