"use client";

import { useState, useMemo } from "react";
import { Activity, Play, Info, Calculator, Percent, ArrowRight, TrendingUp, Target, ShieldAlert, X, Plus } from "lucide-react";
import { ContextualNav } from "@/components/layout/contextual-nav";
import { QUANT_LINKS } from "@/lib/nav-links";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";
import {
  ASSET_LABELS, AssetKey, assetMeanStdDev, START_YEAR, END_YEAR
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];

interface Asset { id: string; key: AssetKey; pct: number; }

export default function MonteCarloPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{ paths: number[][], percentiles: Record<string, number>[] } | null>(null);
  
  // Inputs
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", key: "nifty50", pct: 60 },
    { id: "2", key: "debt", pct: 40 }
  ]);
  const [initialAmount, setInitialAmount] = useState(1000000);
  const [sipAmount, setSipAmount] = useState(10000);
  const [years, setYears] = useState(20);
  const [numSimulations, setNumSimulations] = useState(500);

  // Asset stats calculation
  const assetStats = useMemo(() => {
    const stats = {} as Record<AssetKey, { mean: number; stdDev: number }>;
    for (const key of Object.keys(ASSET_LABELS) as AssetKey[]) {
      stats[key] = assetMeanStdDev(key, START_YEAR, END_YEAR);
    }
    return stats;
  }, []);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      // Calculate weighted portfolio mean and std dev
      let portMean = 0;
      let portVar = 0;
      assets.forEach(a => {
        const w = a.pct / 100;
        const s = assetStats[a.key];
        portMean += w * (s.mean / 100);
        portVar += w * w * Math.pow(s.stdDev / 100, 2);
      });
      const portStdDev = Math.sqrt(portVar) * 1.2; // slight scale up to account for ignored covariance

      // Normal distribution helper using Box-Muller transform
      const randNormal = (mean: number, stdDev: number) => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        const num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        return num * stdDev + mean;
      };

      const paths: number[][] = [];
      const finalValues: number[] = [];

      // Run simulations
      for (let s = 0; s < numSimulations; s++) {
        let currentVal = initialAmount;
        const path = [currentVal];
        
        for (let y = 1; y <= years; y++) {
          // Generate a random annual return for this year
          const annualReturn = randNormal(portMean, portStdDev);
          // Apply return and add 12 months of SIP
          currentVal = currentVal * (1 + annualReturn) + (sipAmount * 12);
          path.push(currentVal);
        }
        
        paths.push(path);
        finalValues.push(currentVal);
      }

      // Sort final values to calculate percentiles
      finalValues.sort((a, b) => a - b);
      
      const getPercentilePath = (percentile: number) => {
        // Find the path whose final value is closest to the percentile value
        const targetValue = finalValues[Math.floor((percentile / 100) * (numSimulations - 1))];
        let closestPath = paths[0];
        let minDiff = Infinity;
        
        for (const p of paths) {
          const diff = Math.abs(p[p.length - 1] - targetValue);
          if (diff < minDiff) {
            minDiff = diff;
            closestPath = p;
          }
        }
        return closestPath;
      };

      const p10 = getPercentilePath(10);
      const p50 = getPercentilePath(50);
      const p90 = getPercentilePath(90);

      // Format data for chart
      const chartData = [];
      for (let y = 0; y <= years; y++) {
        chartData.push({
          year: y,
          "10th Percentile (Bottom 10%)": p10[y],
          "50th Percentile (Median)": p50[y],
          "90th Percentile (Top 10%)": p90[y],
        });
      }

      // Keep a small subset of paths for the "spaghetti" background chart
      const spaghettiPaths = [];
      for (let i = 0; i < 50; i++) { // show 50 random paths
        spaghettiPaths.push(paths[Math.floor(Math.random() * numSimulations)]);
      }

      setResults({ paths: spaghettiPaths, percentiles: chartData });
      setRunning(false);
    }, 800);
  }

  // Asset UI helpers
  const totalPct = assets.reduce((s, a) => s + a.pct, 0);
  const isValid = Math.abs(totalPct - 100) < 0.01;

  function updateAsset(id: string, field: "key" | "pct", value: string | number) {
    setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a));
  }
  function removeAsset(id: string) { setAssets(assets.filter(a => a.id !== id)); }
  function addAsset() { setAssets([...assets, { id: Math.random().toString(), key: "gold", pct: 0 }]); }

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { contentStyle: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" } };

  return (
    <div className="flex gap-5 h-[calc(100vh-112px)] overflow-hidden">
      {/* Left Config Panel */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Monte Carlo Simulation</h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Forecast potential future outcomes based on historical volatility and returns.</p>
          </div>

          <div className="rounded-lg border p-3 space-y-2" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Target Portfolio</p>
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center gap-1.5">
                <select value={asset.key} onChange={(e) => updateAsset(asset.id, "key", e.target.value)} className={inputCls + " flex-1"} style={inputSt}>
                  {ASSET_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
                <div className="flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-[68px]" style={inputSt}>
                  <input type="number" min={0} max={100} value={asset.pct} onChange={(e) => updateAsset(asset.id, "pct", Number(e.target.value))} className="bg-transparent text-xs w-full outline-none font-mono text-right" style={{ color: "var(--text-primary)" }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>%</span>
                </div>
                {assets.length > 1 && <button onClick={() => removeAsset(asset.id)}><X size={11} style={{ color: "var(--text-muted)" }} /></button>}
              </div>
            ))}
            <div className="flex items-center justify-between pt-1">
              <button onClick={addAsset} className="text-xs flex items-center gap-1" style={{ color: "var(--accent-brand)" }}><Plus size={11} /> Add asset</button>
              <span className="text-xs font-mono" style={{ color: isValid ? "var(--positive)" : "var(--negative)" }}>{totalPct.toFixed(0)}%{isValid ? " ✓" : ""}</span>
            </div>
          </div>

          <div className="rounded-lg border p-3 space-y-3" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Simulation Parameters</p>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Initial Investment (₹)</label>
              <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Monthly Contribution (₹)</label>
              <input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className={inputCls} style={inputSt} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Years to Project</label>
                <select value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {[5, 10, 15, 20, 25, 30, 40].map((y) => <option key={y} value={y}>{y} Years</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Simulations</label>
                <select value={numSimulations} onChange={(e) => setNumSimulations(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {[100, 500, 1000, 5000].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Running Simulation…</>) : (<><Play size={14} /> Run Monte Carlo</>)}
          </button>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="flex-1 rounded-xl border flex flex-col overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!results && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--surface-elevated)" }}>
              <TrendingUp size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium mb-1" style={{ color: "var(--text-primary)" }}>Ready to Forecast</h3>
            <p className="text-sm text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Configure your portfolio and projection parameters, then run the simulation to see potential future wealth distributions.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2">
                <Target size={16} style={{ color: "var(--accent-brand)" }} />
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Wealth Forecast ({years} Years)</h3>
              </div>
            </div>
            
            <div className="flex-1 p-5 min-h-0 flex flex-col">
              {/* Top Stats Cards */}
              {results && !running && (
                <div className="grid grid-cols-3 gap-4 mb-6 shrink-0">
                  <div className="p-4 rounded-xl border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--negative)" }}>
                      <ShieldAlert size={14} /> 10th Percentile (Poor)
                    </div>
                    <p className="text-2xl font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                      {formatINR(results.percentiles[results.percentiles.length - 1]["10th Percentile (Bottom 10%)"])}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>90% chance of exceeding this</p>
                  </div>
                  
                  <div className="p-4 rounded-xl border relative overflow-hidden" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: "var(--accent-brand)" }} />
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent-brand)" }}>
                      <Target size={14} /> 50th Percentile (Median)
                    </div>
                    <p className="text-2xl font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                      {formatINR(results.percentiles[results.percentiles.length - 1]["50th Percentile (Median)"])}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Expected median outcome</p>
                  </div>

                  <div className="p-4 rounded-xl border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--positive)" }}>
                      <TrendingUp size={14} /> 90th Percentile (Great)
                    </div>
                    <p className="text-2xl font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                      {formatINR(results.percentiles[results.percentiles.length - 1]["90th Percentile (Top 10%)"])}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>10% chance of exceeding this</p>
                  </div>
                </div>
              )}

              {/* Chart */}
              <div className="flex-1 min-h-0 relative">
                {running && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-elevated)]/50 z-10 rounded-lg backdrop-blur-sm">
                    <svg className="animate-spin w-8 h-8 text-[var(--accent-brand)]" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                  </div>
                )}
                {results && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.percentiles} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fontSize: 11, fill: "var(--text-muted)" }} 
                        tickFormatter={(v) => `Year ${v}`}
                        minTickGap={30}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: "var(--text-muted)" }} 
                        tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`}
                        width={80}
                      />
                      <Tooltip 
                        {...ttSt} 
                        formatter={(value: number | string | undefined, name: string | undefined) => [formatINR(Number(value) || 0), name || ""]}
                        labelFormatter={(v) => `Year ${v}`}
                      />
                      
                      {/* Percentile Lines */}
                      <Line type="monotone" dataKey="90th Percentile (Top 10%)" stroke="var(--positive)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="50th Percentile (Median)" stroke="var(--accent-brand)" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="10th Percentile (Bottom 10%)" stroke="var(--negative)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
