"use client";

import React, { useState, useMemo } from "react";
import { Network, Plus, X, BarChart2 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

import {
  ASSET_LABELS, AssetKey,
  START_YEAR, END_YEAR, ANNUAL_RETURNS, INDIA_CPI,
  assetCorrelation, computeAssetMetrics
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";

// Distinct colors for up to 6 assets
const ASSET_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export default function AssetCorrelationsPage() {
  const [selectedAssets, setSelectedAssets] = useState<AssetKey[]>(["nifty50", "gold", "debt"]);
  const [startYear, setStartYear] = useState(START_YEAR);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [logScale, setLogScale] = useState(false);

  // --- Data Processing Hooks ---

  // 1. Asset Metrics
  const assetMetricsData = useMemo(() => {
    return selectedAssets.map(asset => ({
      asset,
      metrics: computeAssetMetrics(asset, startYear, endYear, inflationAdjusted)
    }));
  }, [selectedAssets, startYear, endYear, inflationAdjusted]);

  // 2. Correlation Matrix
  const correlationData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    selectedAssets.forEach(a1 => {
      matrix[a1] = {};
      selectedAssets.forEach(a2 => {
        matrix[a1][a2] = assetCorrelation(a1, a2, startYear, endYear);
      });
    });
    return matrix;
  }, [selectedAssets, startYear, endYear]);

  // 3. Time-Series Data (Growth, Annual, Drawdowns)
  const timeSeriesData = useMemo(() => {
    const data = [];
    const peakValues: Record<string, number> = {};
    const currentValues: Record<string, number> = {};
    
    // Initialize starting values (10,000)
    selectedAssets.forEach(a => {
      currentValues[a] = 10000;
      peakValues[a] = 10000;
    });

    for (let y = startYear; y <= endYear; y++) {
      const yearPoint: Record<string, number> = { year: y };
      
      selectedAssets.forEach(a => {
        let ret = ANNUAL_RETURNS[y]?.[a] ?? 0;
        
        if (inflationAdjusted) {
          const cpi = INDIA_CPI[y] ?? 6;
          ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
        }
        
        // Annual Return
        yearPoint[`${a}_return`] = ret;
        
        // Growth Value
        currentValues[a] = currentValues[a] * (1 + ret / 100);
        yearPoint[`${a}_value`] = currentValues[a];
        
        // Drawdown
        if (currentValues[a] > peakValues[a]) {
          peakValues[a] = currentValues[a];
        }
        const drawdown = ((currentValues[a] - peakValues[a]) / peakValues[a]) * 100;
        yearPoint[`${a}_drawdown`] = drawdown;
      });
      
      data.push(yearPoint);
    }
    return data;
  }, [selectedAssets, startYear, endYear, inflationAdjusted]);

  // 4. Rolling Returns (3-Year by default for this view)
  const rollingData = useMemo(() => {
    const ROLLING_PERIOD = 3;
    if (endYear - startYear + 1 < ROLLING_PERIOD) return [];
    
    const data = [];
    for (let start = startYear; start <= endYear - ROLLING_PERIOD + 1; start++) {
      const end = start + ROLLING_PERIOD - 1;
      const point: Record<string, string | number> = { period: `${start}-${end}` };
      
      selectedAssets.forEach(a => {
        let cumulative = 1;
        for (let y = start; y <= end; y++) {
          let ret = ANNUAL_RETURNS[y]?.[a] ?? 0;
          if (inflationAdjusted) {
             const cpi = INDIA_CPI[y] ?? 6;
             ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
          }
          cumulative *= (1 + ret / 100);
        }
        const cagr = (Math.pow(cumulative, 1 / ROLLING_PERIOD) - 1) * 100;
        point[`${a}_cagr`] = cagr;
      });
      data.push(point);
    }
    return data;
  }, [selectedAssets, startYear, endYear, inflationAdjusted]);

  // Helper functions
  const fmtPct = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "-";
    return `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;
  };

  const fmtRatio = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "-";
    return val.toFixed(2);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
          <Network size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Asset Class Correlations
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Analyze historical performance, risk, and correlations between different Indian asset classes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <BarChart2 size={18} style={{ color: "var(--accent-brand)" }} />
              Configuration
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Start Year</label>
                  <input
                    type="number"
                    min={START_YEAR}
                    max={endYear - 1}
                    value={startYear}
                    onChange={(e) => setStartYear(Math.max(START_YEAR, Math.min(endYear - 1, Number(e.target.value))))}
                    className="w-full px-3 py-1.5 rounded-md text-sm border focus:ring-1 outline-none transition-all"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>End Year</label>
                  <input
                    type="number"
                    min={startYear + 1}
                    max={END_YEAR}
                    value={endYear}
                    onChange={(e) => setEndYear(Math.max(startYear + 1, Math.min(END_YEAR, Number(e.target.value))))}
                    className="w-full px-3 py-1.5 rounded-md text-sm border focus:ring-1 outline-none transition-all"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Selected Assets</label>
                <div className="space-y-2">
                  {selectedAssets.map((assetKey, i) => (
                    <div key={`${assetKey}-${i}`} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }} />
                      <select
                        value={assetKey}
                        onChange={(e) => {
                          const newAssets = [...selectedAssets];
                          newAssets[i] = e.target.value as AssetKey;
                          setSelectedAssets(newAssets);
                        }}
                        className="flex-1 px-2 py-1.5 rounded-md text-sm border focus:ring-1 outline-none transition-all"
                        style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                      >
                        {Object.entries(ASSET_LABELS).map(([k, label]) => (
                          <option key={k} value={k}>{label}</option>
                        ))}
                      </select>
                      {selectedAssets.length > 2 && (
                        <button
                          onClick={() => setSelectedAssets(selectedAssets.filter((_, idx) => idx !== i))}
                          className="p-1.5 rounded-md hover:bg-[var(--surface-elevated)] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {selectedAssets.length < 6 && (
                    <button
                      onClick={() => {
                        const available = (Object.keys(ASSET_LABELS) as AssetKey[]).filter(k => !selectedAssets.includes(k));
                        if (available.length > 0) {
                          setSelectedAssets([...selectedAssets, available[0]]);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-2 rounded-md text-sm border border-dashed transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-brand)";
                        e.currentTarget.style.color = "var(--accent-brand)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <Plus size={14} /> Add Asset
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={inflationAdjusted}
                      onChange={(e) => setInflationAdjusted(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-10 h-5 bg-[var(--surface-elevated)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[var(--background)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--background)] after:border-[var(--border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
                         style={inflationAdjusted ? { background: "var(--accent-brand)" } : {}}
                    ></div>
                  </div>
                  <span style={{ color: "var(--text-primary)" }}>Inflation Adjusted (Real)</span>
                </label>
                
                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={logScale}
                      onChange={(e) => setLogScale(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-10 h-5 bg-[var(--surface-elevated)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[var(--background)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--background)] after:border-[var(--border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
                         style={logScale ? { background: "var(--accent-brand)" } : {}}
                    ></div>
                  </div>
                  <span style={{ color: "var(--text-primary)" }}>Logarithmic Scale</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Correlation Matrix */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Asset Correlations</h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Asset</th>
                    {selectedAssets.map(a => (
                      <th key={a} className="text-right font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>{ASSET_LABELS[a]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedAssets.map((rowAsset, i) => (
                    <tr key={rowAsset} style={{ borderBottom: i === selectedAssets.length - 1 ? "none" : "1px solid var(--border)" }}>
                      <td className="py-2 px-3 font-medium flex items-center gap-2 whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }} />
                        {ASSET_LABELS[rowAsset]}
                      </td>
                      {selectedAssets.map(colAsset => {
                        const val = correlationData[rowAsset][colAsset];
                        // Color scale from red (-1) to green (1)
                        const isPositive = val >= 0;
                        const intensity = Math.abs(val);
                        const bgColor = isPositive 
                          ? `color-mix(in srgb, var(--positive) ${intensity * 40}%, transparent)`
                          : `color-mix(in srgb, var(--negative) ${intensity * 40}%, transparent)`;
                        
                        return (
                          <td key={colAsset} className="py-2 px-3 text-right font-mono text-xs" style={{ background: rowAsset === colAsset ? "transparent" : bgColor, color: "var(--text-primary)" }}>
                            {val.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Performance & Risk Metrics</h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                    <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Metric</th>
                    {selectedAssets.map((a, i) => (
                      <th key={a} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: ASSET_COLORS[i % ASSET_COLORS.length] }}>{ASSET_LABELS[a]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "CAGR", key: "cagr", fmt: fmtPct },
                    { label: "Standard Deviation", key: "stdDev", fmt: fmtPct },
                    { label: "Best Year", key: "bestYearReturn", fmt: fmtPct },
                    { label: "Worst Year", key: "worstYearReturn", fmt: fmtPct },
                    { label: "Max Drawdown", key: "maxDrawdown", fmt: fmtPct },
                    { label: "Sharpe Ratio", key: "sharpe", fmt: fmtRatio },
                    { label: "Sortino Ratio", key: "sortino", fmt: fmtRatio },
                  ].map((row, i, arr) => (
                    <tr key={row.key} style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="py-2 px-3 font-medium text-xs whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{row.label}</td>
                      {assetMetricsData.map(data => {
                        const metrics = data.metrics as Record<string, number> | null;
                        const val = metrics ? metrics[row.key] : 0;
                        return (
                          <td key={data.asset} className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                            {row.fmt(val as number)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Asset Growth (₹10,000)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis scale={logScale ? "log" : "auto"} domain={logScale ? ["auto", "auto"] : [0, "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} width={60} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    itemStyle={{ color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => value !== undefined ? formatINR(value) : "-"}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                  {selectedAssets.map((a, i) => (
                    <Line key={a} type="monotone" dataKey={`${a}_value`} name={ASSET_LABELS[a]} stroke={ASSET_COLORS[i % ASSET_COLORS.length]} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Annual Returns Chart */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Annual Returns</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={50} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(2)}%`] : ["-"]}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                    cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                  {selectedAssets.map((a, i) => (
                    <Bar key={a} dataKey={`${a}_return`} name={ASSET_LABELS[a]} fill={ASSET_COLORS[i % ASSET_COLORS.length]} radius={[2, 2, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Drawdowns Chart */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Historical Drawdowns</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    {selectedAssets.map((a, i) => (
                      <linearGradient key={`grad-${a}`} id={`gradDown-${a}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={ASSET_COLORS[i % ASSET_COLORS.length]} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={ASSET_COLORS[i % ASSET_COLORS.length]} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={50} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(2)}%`] : ["-"]}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                  {selectedAssets.map((a, i) => (
                    <Area key={a} type="monotone" dataKey={`${a}_drawdown`} name={ASSET_LABELS[a]} stroke={ASSET_COLORS[i % ASSET_COLORS.length]} fill={`url(#gradDown-${a})`} strokeWidth={2} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Rolling Returns Chart */}
          <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>3-Year Rolling Returns</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rollingData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={50} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(2)}%`] : ["-"]}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                  {selectedAssets.map((a, i) => (
                    <Line key={a} type="monotone" dataKey={`${a}_cagr`} name={ASSET_LABELS[a]} stroke={ASSET_COLORS[i % ASSET_COLORS.length]} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
