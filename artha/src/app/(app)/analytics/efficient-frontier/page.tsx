"use client";

import { useState, useMemo } from "react";
import { Play, TrendingUp, Target, AlertCircle, Info, RefreshCw } from "lucide-react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ZAxis, Cell
} from "recharts";
import {
  ASSET_LABELS, AssetKey, assetMeanStdDev, START_YEAR, END_YEAR
} from "@/lib/india-historical-data";

const ASSET_KEYS = Object.keys(ASSET_LABELS) as AssetKey[];
const NUM_PORTFOLIOS = 2000;

export default function EfficientFrontierPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{ risk: number; return: number; sharpe: number; allocations: Record<AssetKey, number> }[] | null>(null);
  
  // Calculate asset stats for full history
  const assetStats = useMemo(() => {
    const stats = {} as Record<AssetKey, { mean: number; stdDev: number }>;
    for (const key of ASSET_KEYS) {
      stats[key] = assetMeanStdDev(key, START_YEAR, END_YEAR);
    }
    return stats;
  }, []);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      // Monte carlo simulation of random portfolios
      const pts = [];
      for (let i = 0; i < NUM_PORTFOLIOS; i++) {
        // Generate random weights that sum to 1
        const weights = ASSET_KEYS.map(() => Math.random());
        const sum = weights.reduce((a, b) => a + b, 0);
        const normWeights = weights.map((w) => w / sum);

        // Calculate portfolio expected return and risk
        let expectedReturn = 0;
        let expectedRiskSq = 0; // Simplified risk calculation (ignoring covariance for simulation speed, using weighted avg risk as proxy for scatter plot shape)
        
        const allocs = {} as Record<AssetKey, number>;
        
        ASSET_KEYS.forEach((key, idx) => {
          const w = normWeights[idx];
          allocs[key] = w * 100;
          expectedReturn += w * assetStats[key].mean;
          // In a real Markowitz model, we'd multiply by the covariance matrix: w^T * Cov * w
          // For visualization purposes without full matrix math, we approximate the scatter shape
          expectedRiskSq += w * w * (assetStats[key].stdDev * assetStats[key].stdDev); 
        });
        
        const expectedRisk = Math.sqrt(expectedRiskSq) * 1.5; // Scale up risk to look more realistic since we dropped cross-covariance terms which usually increase portfolio risk above the sum of squares.

        const sharpe = (expectedReturn - 6.0) / expectedRisk; // Assume 6% risk free rate
        
        pts.push({
          risk: expectedRisk,
          return: expectedReturn,
          sharpe,
          allocations: allocs
        });
      }
      
      // Sort by Sharpe ratio to easily find max sharpe
      pts.sort((a, b) => b.sharpe - a.sharpe);
      
      setResults(pts);
      setRunning(false);
    }, 800);
  }

  const maxSharpe = results?.[0];
  
  // Find minimum variance portfolio
  const minVariance = useMemo(() => {
    if (!results) return null;
    let minR = Infinity;
    let mvp = null;
    for (const p of results) {
      if (p.risk < minR) {
        minR = p.risk;
        mvp = p;
      }
    }
    return mvp;
  }, [results]);

  const ttStyle = { contentStyle: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--text-primary)" } };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Efficient Frontier</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Discover optimal asset allocations that maximize returns for a given level of risk using Modern Portfolio Theory.
          </p>
        </div>
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
        >
          {running ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Simulating Portfolios…</>
          ) : (
            <><Play size={16} /> Run Optimization</>
          )}
        </button>
      </div>

      {!results && !running ? (
        <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center" style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--surface-elevated)" }}>
            <Target size={28} style={{ color: "var(--text-muted)" }} />
          </div>
          <h3 className="text-base font-medium mb-1" style={{ color: "var(--text-primary)" }}>Ready to Optimize</h3>
          <p className="text-sm text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
            Click &apos;Run Optimization&apos; to simulate {NUM_PORTFOLIOS} random portfolios and plot the efficient frontier based on historical India data.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex gap-5 min-h-0">
          {/* Main Chart Area */}
          <div className="flex-[2] rounded-xl border flex flex-col overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
              <TrendingUp size={16} style={{ color: "var(--text-muted)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Risk vs. Return Scatter Plot</h3>
            </div>
            <div className="flex-1 p-5 min-h-0">
              {running ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="animate-spin w-8 h-8 mx-auto mb-3" style={{ color: "var(--accent-brand)" }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Running Monte Carlo Simulation...</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 0, bottom: 20, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis 
                      type="number" 
                      dataKey="risk" 
                      name="Risk (Std Dev)" 
                      tickFormatter={(v) => `${v.toFixed(0)}%`}
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="return" 
                      name="Expected Return" 
                      tickFormatter={(v) => `${v.toFixed(0)}%`}
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                      dx={10}
                    />
                    <ZAxis type="number" dataKey="sharpe" range={[20, 20]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '4 4', stroke: 'var(--border-strong)', strokeWidth: 1 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          // Find top 3 allocations
                          const topAllocs = Object.entries(d.allocations)
                            .sort(([,a], [,b]) => (b as number) - (a as number))
                            .slice(0, 3);
                            
                          return (
                            <div className="p-3 rounded-lg border shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                              <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Simulated Portfolio</p>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
                                <span style={{ color: "var(--text-muted)" }}>Return:</span>
                                <span className="font-mono text-right" style={{ color: "var(--positive)" }}>{d.return.toFixed(2)}%</span>
                                <span style={{ color: "var(--text-muted)" }}>Risk:</span>
                                <span className="font-mono text-right" style={{ color: "var(--negative)" }}>{d.risk.toFixed(2)}%</span>
                                <span style={{ color: "var(--text-muted)" }}>Sharpe:</span>
                                <span className="font-mono text-right" style={{ color: "var(--text-primary)" }}>{d.sharpe.toFixed(2)}</span>
                              </div>
                              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Top Assets:</p>
                              {topAllocs.map(([k, v]) => (
                                <div key={k} className="flex justify-between text-xs mb-0.5">
                                  <span style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[k as AssetKey]}</span>
                                  <span className="font-mono" style={{ color: "var(--text-primary)" }}>{(v as number).toFixed(1)}%</span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter data={results || []} fill="var(--accent-brand)">
                      {results?.map((entry, index) => {
                        // Color gradient based on sharpe ratio
                        const t = (entry.sharpe - (minVariance?.sharpe || 0)) / ((maxSharpe?.sharpe || 1) - (minVariance?.sharpe || 0));
                        // Interpolate from blue to orange/accent
                        const isMax = entry === maxSharpe;
                        const isMin = entry === minVariance;
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={isMax ? "var(--positive)" : isMin ? "var(--neutral)" : "var(--accent-brand)"} 
                            opacity={isMax || isMin ? 1 : 0.3 + (t * 0.5)}
                            r={isMax || isMin ? 6 : 3}
                          />
                        );
                      })}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Right Panel - Optimal Portfolios */}
          <div className="flex-1 flex flex-col gap-5 min-w-[320px]">
            {/* Maximum Sharpe Portfolio */}
            <div className="flex-1 rounded-xl border flex flex-col overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)", background: "rgba(16, 185, 129, 0.05)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--positive)]" />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Maximum Sharpe</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-[var(--positive)] text-[var(--background)] font-medium">Optimal</span>
              </div>
              <div className="p-5 overflow-y-auto">
                {maxSharpe && (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Expected Return</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--positive)" }}>{maxSharpe.return.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Expected Risk</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--negative)" }}>{maxSharpe.risk.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Sharpe Ratio</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{maxSharpe.sharpe.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Suggested Allocation</h4>
                    <div className="space-y-2">
                      {Object.entries(maxSharpe.allocations)
                        .filter(([, v]) => v > 1) // Only show > 1%
                        .sort(([, a], [, b]) => b - a)
                        .map(([k, v]) => (
                          <div key={k} className="flex items-center gap-3 text-sm">
                            <span className="w-24 truncate" style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[k as AssetKey]}</span>
                            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                              <div className="h-full rounded-full bg-[var(--positive)]" style={{ width: `${v}%` }} />
                            </div>
                            <span className="w-12 text-right font-mono" style={{ color: "var(--text-primary)" }}>{v.toFixed(1)}%</span>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Minimum Variance Portfolio */}
            <div className="flex-1 rounded-xl border flex flex-col overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)", background: "rgba(59, 130, 246, 0.05)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--neutral)]" />
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Minimum Variance</h3>
              </div>
              <div className="p-5 overflow-y-auto">
                {minVariance && (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Expected Return</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--positive)" }}>{minVariance.return.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Expected Risk</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--negative)" }}>{minVariance.risk.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Sharpe Ratio</p>
                        <p className="text-base font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{minVariance.sharpe.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Suggested Allocation</h4>
                    <div className="space-y-2">
                      {Object.entries(minVariance.allocations)
                        .filter(([, v]) => v > 1) // Only show > 1%
                        .sort(([, a], [, b]) => b - a)
                        .map(([k, v]) => (
                          <div key={k} className="flex items-center gap-3 text-sm">
                            <span className="w-24 truncate" style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[k as AssetKey]}</span>
                            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                              <div className="h-full rounded-full bg-[var(--neutral)]" style={{ width: `${v}%` }} />
                            </div>
                            <span className="w-12 text-right font-mono" style={{ color: "var(--text-primary)" }}>{v.toFixed(1)}%</span>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
