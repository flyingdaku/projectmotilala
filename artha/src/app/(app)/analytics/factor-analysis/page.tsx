"use client";

import { useState } from "react";
import { Play, ShieldAlert, BarChart2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell
} from "recharts";
import {
  ASSET_LABELS, AssetKey
} from "@/lib/india-historical-data";

// Define factors (mocking the return data for these conceptual factors)
const FACTORS = [
  { id: "market", label: "Market (Beta)", desc: "Overall equity market return premium" },
  { id: "size", label: "Size (SMB)", desc: "Small cap premium over large cap" },
  { id: "value", label: "Value (HML)", desc: "Value stock premium over growth" },
  { id: "momentum", label: "Momentum (WML)", desc: "Recent winners over recent losers" },
  { id: "quality", label: "Quality (QMJ)", desc: "High quality premium over junk" },
  { id: "lowvol", label: "Low Volatility", desc: "Low risk premium over high risk" },
];

const ASSET_OPTIONS = Object.entries(ASSET_LABELS) as [AssetKey, string][];

export default function FactorAnalysisPage() {
  const [running, setRunning] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<{ asset: string; exposures: any[]; rSquared: number } | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetKey>("nifty50");
  
  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      // In a real app, this would run a multiple regression (e.g. OLS) 
      // of the asset's returns against the factor returns.
      // Here we generate plausible mock exposures based on the selected asset.
      
      const exposures = FACTORS.map(f => {
        let val = 0;
        if (selectedAsset === "nifty50") {
          if (f.id === "market") val = 1.0;
          if (f.id === "size") val = -0.2;
          if (f.id === "value") val = 0.1;
          if (f.id === "momentum") val = 0.05;
          if (f.id === "quality") val = 0.3;
          if (f.id === "lowvol") val = 0.2;
        } else if (selectedAsset === "niftyMidcap") {
          if (f.id === "market") val = 1.1;
          if (f.id === "size") val = 0.6;
          if (f.id === "value") val = 0.2;
          if (f.id === "momentum") val = 0.3;
          if (f.id === "quality") val = 0.1;
          if (f.id === "lowvol") val = -0.1;
        } else if (selectedAsset === "nifty500") {
          if (f.id === "market") val = 1.05;
          if (f.id === "size") val = 0.2;
          if (f.id === "value") val = 0.15;
          if (f.id === "momentum") val = 0.1;
          if (f.id === "quality") val = 0.2;
          if (f.id === "lowvol") val = 0.1;
        } else if (selectedAsset === "gold") {
          if (f.id === "market") val = 0.05;
          if (f.id === "size") val = 0.0;
          if (f.id === "value") val = 0.0;
          if (f.id === "momentum") val = 0.2;
          if (f.id === "quality") val = 0.0;
          if (f.id === "lowvol") val = 0.5;
        } else if (selectedAsset === "debt") {
          if (f.id === "market") val = 0.0;
          if (f.id === "size") val = 0.0;
          if (f.id === "value") val = 0.0;
          if (f.id === "momentum") val = 0.1;
          if (f.id === "quality") val = 0.8;
          if (f.id === "lowvol") val = 0.9;
        } else {
          // generic fallback
          val = (Math.random() * 2) - 0.5;
          if (f.id === "market") val = 0.8 + (Math.random() * 0.4);
        }
        
        return {
          factor: f.label,
          desc: f.desc,
          exposure: Number(val.toFixed(2)),
          tStat: Number((val * (2 + Math.random() * 3)).toFixed(2)), // mock t-stat
          isSignificant: Math.abs(val * 4) > 1.96
        };
      });

      setResults({
        asset: ASSET_LABELS[selectedAsset],
        exposures,
        rSquared: selectedAsset === "gold" || selectedAsset === "debt" ? 0.15 : 0.85 + (Math.random() * 0.1)
      });
      setRunning(false);
    }, 600);
  }

  const inputCls = "w-full rounded-md border px-3 py-2 text-sm outline-none bg-transparent transition-colors";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { contentStyle: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--text-primary)" } };

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] overflow-hidden max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Factor Analysis (Fama-French)</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Decompose historical returns to identify which underlying risk factors drive asset performance.
          </p>
        </div>
      </div>

      <div className="flex gap-6 min-h-0 flex-1">
        {/* Left Config Panel */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Select Asset</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>Target Asset / Fund</label>
                <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value as AssetKey)} className={inputCls} style={inputSt}>
                  {ASSET_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
              </div>
              
              <button 
                onClick={handleRun} 
                disabled={running} 
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 mt-2" 
                style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
              >
                {running ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Running Regression…</>
                ) : (
                  <><Play size={14} /> Analyze Factors</>
                )}
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-5 flex-1 overflow-y-auto" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Factor Definitions</h2>
            <div className="space-y-4">
              {FACTORS.map(f => (
                <div key={f.id}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{f.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className="flex-1 rounded-xl border flex flex-col overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          {!results && !running ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--surface-elevated)" }}>
                <BarChart2 size={28} style={{ color: "var(--text-muted)" }} />
              </div>
              <h3 className="text-base font-medium mb-1" style={{ color: "var(--text-primary)" }}>Factor Regression</h3>
              <p className="text-sm text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
                Select an asset on the left and run the analysis to view its factor exposures (betas) based on historical data.
              </p>
            </div>
          ) : running ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <svg className="animate-spin w-8 h-8 mb-4" style={{ color: "var(--accent-brand)" }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Calculating OLS Regression...</p>
            </div>
          ) : results ? (
            <>
              <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{results.asset}</h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Factor exposures (Betas) from multiple regression</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Model R-Squared</p>
                    <p className="text-2xl font-mono font-semibold" style={{ color: "var(--accent-brand)" }}>{(results.rSquared * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col min-h-0">
                <div className="flex-1 min-h-0 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.exposures} layout="vertical" margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "var(--text-muted)" }} domain={['dataMin - 0.2', 'dataMax + 0.2']} axisLine={false} tickLine={false} dy={10} />
                      <YAxis type="category" dataKey="factor" tick={{ fontSize: 10, fill: "var(--text-primary)", fontWeight: 500 }} width={100} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip 
                        {...ttSt} 
                        cursor={{ fill: "var(--surface-elevated)" }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any, name: any, props: any) => {
                          const d = props.payload;
                          return [
                            <div key="1">
                              <span className="font-mono">{(Number(value) || 0).toFixed(2)}</span>
                              <span className="block text-[10px] mt-1 text-muted">t-stat: {d.tStat.toFixed(2)} {d.isSignificant ? "(Sig.)" : "(Not sig.)"}</span>
                            </div>, 
                            "Exposure (Beta)"
                          ];
                        }}
                      />
                      <ReferenceLine x={0} stroke="var(--border-strong)" strokeWidth={1} />
                      <Bar dataKey="exposure" radius={[0, 4, 4, 0]} maxBarSize={32}>
                        {results.exposures.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.exposure > 0 ? "var(--positive)" : "var(--negative)"} 
                            opacity={entry.isSignificant ? 1 : 0.4}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="shrink-0 p-4 rounded-lg" style={{ background: "var(--surface-elevated)" }}>
                  <div className="flex items-start gap-3">
                    <ShieldAlert size={18} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Interpretation</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Solid bars indicate statistically significant exposures (t-stat &gt; 1.96). Faded bars are not significant. 
                        A high R-Squared ({((results.rSquared) * 100).toFixed(0)}%) means {results.asset}&apos;s returns are {results.rSquared > 0.7 ? "strongly" : "weakly"} explained by these systematic risk factors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
