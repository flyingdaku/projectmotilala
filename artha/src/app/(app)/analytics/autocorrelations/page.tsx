"use client";

import React, { useState, useEffect, useMemo } from "react";
import { LineChart as ChartIcon, BarChart2, Plus, X } from "lucide-react";
import { AssetSearch } from "@/components/ui/asset-search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const ASSET_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function AssetAutocorrelationsPage() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>(["RELIANCE", "TCS", "INFY"]);
  const [period, setPeriod] = useState<"1y" | "3y" | "5y">("3y");
  const [maxLag, setMaxLag] = useState<number>(10);
  const [autoCorrData, setAutoCorrData] = useState<Record<string, number[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAutocorrelations() {
      if (selectedAssets.length === 0) {
        setAutoCorrData(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/analytics/autocorrelations?assets=${selectedAssets.join(',')}&period=${period}&maxLag=${maxLag}`);
        if (!res.ok) throw new Error('Failed to fetch autocorrelation data');
        const data = await res.json();
        setAutoCorrData(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }

    fetchAutocorrelations();
  }, [selectedAssets, period, maxLag]);

  const handleAddAsset = (assetId: string) => {
    if (selectedAssets.includes(assetId)) return;
    if (selectedAssets.length >= 5) return; // Limit to 5 assets
    setSelectedAssets([...selectedAssets, assetId]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setSelectedAssets(selectedAssets.filter(a => a !== assetId));
  };

  // Format data for Recharts
  const chartData = useMemo(() => {
    if (!autoCorrData) return [];
    
    const data = [];
    for (let lag = 1; lag <= maxLag; lag++) {
      const point: any = { lag: `Lag ${lag}` };
      selectedAssets.forEach(asset => {
        if (autoCorrData[asset] && autoCorrData[asset].length >= lag) {
          point[asset] = autoCorrData[asset][lag - 1];
        }
      });
      data.push(point);
    }
    return data;
  }, [autoCorrData, maxLag, selectedAssets]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
          <ChartIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Asset Autocorrelations
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Analyze the persistence of daily returns over specified lags to identify momentum or mean-reversion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Settings Panel */}
        <div className="lg:col-span-1 rounded-xl border p-4 space-y-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <BarChart2 size={16} style={{ color: "var(--accent-brand)" }} />
            <h2 className="font-semibold text-sm">Analysis Settings</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Time Period</label>
              <div className="flex bg-muted/20 p-1 rounded-lg border border-border">
                {["1y", "3y", "5y"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p as any)}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${period === p
                        ? "bg-background shadow-sm border border-border text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium uppercase tracking-wider flex justify-between" style={{ color: "var(--text-muted)" }}>
                <span>Max Lags (Days)</span>
                <span>{maxLag}</span>
              </label>
              <input 
                type="range" 
                min="5" max="30" step="1" 
                value={maxLag} 
                onChange={(e) => setMaxLag(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>5</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Add Asset (Max 5)</label>
              <AssetSearch
                onSelect={handleAddAsset}
                placeholder="Search to add stock..."
              />
            </div>
            
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium uppercase tracking-wider flex justify-between" style={{ color: "var(--text-muted)" }}>
                <span>Selected Assets</span>
                <span>{selectedAssets.length}/5</span>
              </label>
              <ScrollArea className="h-40">
                <div className="space-y-2 pr-3">
                  {selectedAssets.map((asset, i) => (
                    <div
                      key={asset}
                      className="flex items-center justify-between px-3 py-2 rounded-md border text-sm transition-colors"
                      style={{
                        background: "var(--surface-elevated)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }}
                        />
                        <span className="font-medium">{asset}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveAsset(asset)}
                        disabled={selectedAssets.length <= 1}
                        className="p-1 rounded opacity-50 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-20 transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)", minHeight: "450px" }}>
            <h3 className="font-semibold mb-4">Autocorrelation Function (ACF)</h3>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center text-[var(--text-muted)] flex-col gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--accent-brand)' }}></div>
                Calculating autocorrelations...
              </div>
            ) : error ? (
              <div className="h-64 flex items-center justify-center text-[var(--negative)]">
                {error}
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis 
                      dataKey="lag" 
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)' }}
                    />
                    <YAxis 
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => val.toFixed(2)}
                      domain={[-0.5, 0.5]}
                    />
                    <Tooltip 
                      contentStyle={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      labelStyle={{ color: 'var(--text-muted)', marginBottom: '8px' }}
                      formatter={(value: any) => [typeof value === 'number' ? value.toFixed(3) : String(value), '']}
                    />
                    <ReferenceLine y={0} stroke="var(--border-strong)" strokeWidth={2} />
                    {/* approximate 95% confidence bounds (±1.96/sqrt(N)) - typically very small for daily data */}
                    <ReferenceLine y={0.05} stroke="var(--text-muted)" strokeDasharray="3 3" opacity={0.5} />
                    <ReferenceLine y={-0.05} stroke="var(--text-muted)" strokeDasharray="3 3" opacity={0.5} />
                    
                    {selectedAssets.map((asset, i) => (
                      <Bar 
                        key={asset} 
                        dataKey={asset} 
                        fill={ASSET_COLORS[i % ASSET_COLORS.length]} 
                        name={asset}
                        radius={[2, 2, 0, 0]}
                        maxBarSize={40}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 flex flex-col gap-2" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
               <h4 className="font-semibold text-sm">How to read Autocorrelation</h4>
               <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                 Autocorrelation measures the relationship between a variable's current value and its past values.
               </p>
               <ul className="text-xs space-y-1.5 mt-2" style={{ color: "var(--text-secondary)" }}>
                 <li><strong style={{ color: "var(--positive)" }}>Positive values</strong> indicate <strong>momentum</strong> or persistence - past positive returns tend to be followed by positive returns.</li>
                 <li><strong style={{ color: "var(--negative)" }}>Negative values</strong> indicate <strong>mean-reversion</strong> - past positive returns tend to be followed by negative returns.</li>
                 <li>Values close to 0 indicate a random walk (no predictable pattern).</li>
               </ul>
            </div>
            
            <div className="rounded-xl border p-4 flex flex-col gap-2" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
               <h4 className="font-semibold text-sm">Significance</h4>
               <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                 For daily stock returns, autocorrelations are typically very small (close to 0) in highly liquid markets, as new information is quickly priced in.
               </p>
               <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                 However, you might observe significant values at Lag 1 for illiquid stocks (due to non-synchronous trading) or at longer lags representing persistent market regimes.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
