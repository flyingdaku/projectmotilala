"use client";

import React, { useState, useMemo } from "react";
import { Layers, Plus, X, BarChart2 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";

import {
  ASSET_LABELS, AssetKey,
  START_YEAR, END_YEAR, ANNUAL_RETURNS, INDIA_CPI,
  runBacktest, BacktestResult, rollingReturns,
  computeAssetMetrics, computeTopDrawdowns, computeRollingStats, assetCorrelation
} from "@/lib/india-historical-data";
import { Switch } from "@/components/ui/switch";
import { formatINR } from "@/lib/utils";

// Theme-aware colors
const PORTFOLIO_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
];

const ASSET_COLORS = {
  nifty50: "var(--chart-1)",
  nifty500: "var(--chart-2)",
  niftyMidcap: "var(--chart-3)",
  gold: "var(--chart-4)",
  debt: "var(--chart-5)",
  balanced: "var(--chart-6)",
};

interface Portfolio {
  id: string;
  label: string;
  color: string;
  allocations: { asset: AssetKey; weight: number }[];
}

const DEFAULT_PORTFOLIOS: Portfolio[] = [
  {
    id: "p1",
    label: "Portfolio 1",
    color: PORTFOLIO_COLORS[0],
    allocations: [{ asset: "nifty50", weight: 60 }, { asset: "debt", weight: 40 }],
  },
  {
    id: "p2",
    label: "Portfolio 2",
    color: PORTFOLIO_COLORS[1],
    allocations: [{ asset: "nifty50", weight: 80 }, { asset: "debt", weight: 20 }],
  },
];

export default function TacticalAllocationPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(DEFAULT_PORTFOLIOS);
  const [startYear, setStartYear] = useState(START_YEAR);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [benchmark, setBenchmark] = useState<AssetKey | "none">("nifty50");
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [logScale, setLogScale] = useState(true);

  // --- Actions ---
  const addPortfolio = () => {
    if (portfolios.length >= 3) return;
    setPortfolios([
      ...portfolios,
      {
        id: `p${Date.now()}`,
        label: `Portfolio ${portfolios.length + 1}`,
        color: PORTFOLIO_COLORS[portfolios.length],
        allocations: [{ asset: "nifty50", weight: 100 }],
      },
    ]);
  };

  const removePortfolio = (id: string) => {
    setPortfolios(portfolios.filter(p => p.id !== id));
  };

  const updateAllocation = (pId: string, idx: number, field: "asset" | "weight", val: string | number) => {
    setPortfolios(portfolios.map(p => {
      if (p.id !== pId) return p;
      const newAlloc = [...p.allocations];
      newAlloc[idx] = { ...newAlloc[idx], [field]: val };
      return { ...p, allocations: newAlloc };
    }));
  };

  const addAssetToPortfolio = (pId: string) => {
    setPortfolios(portfolios.map(p => {
      if (p.id !== pId) return p;
      const available = (Object.keys(ASSET_LABELS) as AssetKey[]).filter(k => !p.allocations.find(a => a.asset === k));
      if (available.length === 0) return p;
      return { ...p, allocations: [...p.allocations, { asset: available[0], weight: 0 }] };
    }));
  };

  const removeAssetFromPortfolio = (pId: string, idx: number) => {
    setPortfolios(portfolios.map(p => {
      if (p.id !== pId) return p;
      return { ...p, allocations: p.allocations.filter((_, i) => i !== idx) };
    }));
  };

  // --- Data Engine ---
  const results = useMemo(() => {
    return portfolios.map(p => {
      const totalWeight = p.allocations.reduce((sum, a) => sum + a.weight, 0);
      const normalizedAllocations = p.allocations.map(a => ({
        asset: a.asset,
        weight: totalWeight > 0 ? (a.weight / totalWeight) * 100 : 0
      }));

      return runBacktest({
        allocations: normalizedAllocations,
        startYear,
        endYear,
        initialAmount: 10000,
        mode: "lumpsum",
        benchmark: benchmark === "none" ? undefined : benchmark,
        inflationAdjusted,
      });
    });
  }, [portfolios, startYear, endYear, benchmark, inflationAdjusted]);

  const benchmarkResult = useMemo(() => {
    if (benchmark === "none") return null;
    return runBacktest({
      allocations: [{ asset: benchmark, weight: 100 }],
      startYear,
      endYear,
      initialAmount: 10000,
      mode: "lumpsum",
      inflationAdjusted,
    });
  }, [benchmark, startYear, endYear, inflationAdjusted]);

  // Combined Time Series Data
  const growthData = useMemo(() => {
    if (!results.length) return [];
    return results[0].yearlyData.map((d, i) => {
      const point: Record<string, number | string> = { year: d.year };
      portfolios.forEach((p, pIdx) => {
        point[p.label] = results[pIdx]?.yearlyData[i]?.value ?? 0;
      });
      if (benchmark !== "none" && d.benchmarkValue !== undefined) {
        point[ASSET_LABELS[benchmark]] = d.benchmarkValue;
      }
      return point;
    });
  }, [results, portfolios, benchmark]);

  const annualData = useMemo(() => {
    if (!results.length) return [];
    return results[0].yearlyData.map((d, i) => {
      const point: Record<string, number | string> = { year: d.year };
      portfolios.forEach((p, pIdx) => {
        point[p.label] = results[pIdx]?.yearlyData[i]?.annualReturn ?? 0;
      });
      if (benchmark !== "none" && d.benchmarkReturn !== undefined) {
        point[ASSET_LABELS[benchmark]] = d.benchmarkReturn;
      }
      return point;
    });
  }, [results, portfolios, benchmark]);

  const drawdownData = useMemo(() => {
    if (!results.length) return [];
    const data: Record<string, string | number>[] = [];
    const peaks: Record<string, number> = {};
    const currentVals: Record<string, number> = {};
    
    portfolios.forEach(p => { peaks[p.label] = 10000; currentVals[p.label] = 10000; });
    if (benchmark !== "none") { peaks[ASSET_LABELS[benchmark]] = 10000; currentVals[ASSET_LABELS[benchmark]] = 10000; }

    results[0].yearlyData.forEach((d, i) => {
      const point: Record<string, string | number> = { year: d.year };
      
      portfolios.forEach((p, pIdx) => {
        const ret = results[pIdx]?.yearlyData[i]?.annualReturn ?? 0;
        currentVals[p.label] *= (1 + ret / 100);
        if (currentVals[p.label] > peaks[p.label]) peaks[p.label] = currentVals[p.label];
        point[p.label] = ((currentVals[p.label] - peaks[p.label]) / peaks[p.label]) * 100;
      });

      if (benchmark !== "none" && d.benchmarkReturn !== undefined) {
        const bmLabel = ASSET_LABELS[benchmark];
        currentVals[bmLabel] *= (1 + d.benchmarkReturn / 100);
        if (currentVals[bmLabel] > peaks[bmLabel]) peaks[bmLabel] = currentVals[bmLabel];
        point[bmLabel] = ((currentVals[bmLabel] - peaks[bmLabel]) / peaks[bmLabel]) * 100;
      }
      data.push(point);
    });
    return data;
  }, [results, portfolios, benchmark]);

  const topDrawdownsData = useMemo(() => {
    return portfolios.map(p => computeTopDrawdowns(p.allocations, startYear, endYear, 10, inflationAdjusted));
  }, [portfolios, startYear, endYear, inflationAdjusted]);

  const benchmarkDrawdowns = useMemo(() => {
    if (benchmark === "none") return [];
    return computeTopDrawdowns([{ asset: benchmark, weight: 100 }], startYear, endYear, 10, inflationAdjusted);
  }, [benchmark, startYear, endYear, inflationAdjusted]);

  const rolling3YData = useMemo(() => {
    const ROLLING_PERIOD = 3;
    if (endYear - startYear + 1 < ROLLING_PERIOD) return [];
    const data: Record<string, string | number>[] = [];
    for (let start = startYear; start <= endYear - ROLLING_PERIOD + 1; start++) {
      const end = start + ROLLING_PERIOD - 1;
      const point: Record<string, string | number> = { period: `${start}-${end}` };
      portfolios.forEach(p => {
        point[p.label] = rollingReturns(p.allocations, start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
      });
      if (benchmark !== "none") {
        point[ASSET_LABELS[benchmark]] = rollingReturns([{ asset: benchmark, weight: 100 }], start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
      }
      data.push(point);
    }
    return data;
  }, [portfolios, benchmark, startYear, endYear, inflationAdjusted]);

  const rolling5YData = useMemo(() => {
    const ROLLING_PERIOD = 5;
    if (endYear - startYear + 1 < ROLLING_PERIOD) return [];
    const data: Record<string, string | number>[] = [];
    for (let start = startYear; start <= endYear - ROLLING_PERIOD + 1; start++) {
      const end = start + ROLLING_PERIOD - 1;
      const point: Record<string, string | number> = { period: `${start}-${end}` };
      portfolios.forEach(p => {
        point[p.label] = rollingReturns(p.allocations, start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
      });
      if (benchmark !== "none") {
        point[ASSET_LABELS[benchmark]] = rollingReturns([{ asset: benchmark, weight: 100 }], start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
      }
      data.push(point);
    }
    return data;
  }, [portfolios, benchmark, startYear, endYear, inflationAdjusted]);

  const uniqueAssets = useMemo(() => {
    const assets = new Set<AssetKey>();
    portfolios.forEach(p => p.allocations.forEach(a => assets.add(a.asset)));
    if (benchmark !== "none") assets.add(benchmark);
    return Array.from(assets);
  }, [portfolios, benchmark]);

  const assetMetricsData = useMemo(() => {
    return uniqueAssets.map(asset => ({
      asset,
      metrics: computeAssetMetrics(asset, startYear, endYear, inflationAdjusted)
    }));
  }, [uniqueAssets, startYear, endYear, inflationAdjusted]);

  const assetCorrelationData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    uniqueAssets.forEach(a1 => {
      matrix[a1] = {};
      uniqueAssets.forEach(a2 => {
        matrix[a1][a2] = assetCorrelation(a1, a2, startYear, endYear);
      });
    });
    return matrix;
  }, [uniqueAssets, startYear, endYear]);

  // Trailing Returns
  const trailingReturns = useMemo(() => {
    const periods = [1, 3, 5, 7, 10, 15];
    const data: Record<string, Record<string, number | string>> = {};
    
    periods.forEach(p => {
      if (endYear - startYear + 1 < p) return;
      data[`${p}Y`] = { period: `${p} Year` };
      
      portfolios.forEach((port, idx) => {
        data[`${p}Y`][port.label] = rollingReturns(port.allocations, endYear - p + 1, endYear, p, undefined, inflationAdjusted)[0]?.cagr ?? "-";
      });
      
      if (benchmark !== "none") {
        data[`${p}Y`][ASSET_LABELS[benchmark]] = rollingReturns([{ asset: benchmark, weight: 100 }], endYear - p + 1, endYear, p, undefined, inflationAdjusted)[0]?.cagr ?? "-";
      }
    });
    return Object.values(data);
  }, [portfolios, startYear, endYear, benchmark, inflationAdjusted]);

  // Helpers
  const fmtPct = (val: number | undefined | null | string) => {
    if (val === undefined || val === null || val === "-" || isNaN(Number(val))) return "-";
    return `${Number(val) >= 0 ? "+" : ""}${Number(val).toFixed(2)}%`;
  };

  const fmtRatio = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "-";
    return val.toFixed(2);
  };

  const fmtCurr = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "-";
    return formatINR(val);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
          <Layers size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Tactical Allocation & Model Portfolios
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Build, compare, and deeply analyze multiple custom portfolios against a benchmark.
          </p>
        </div>
      </div>

      {/* --- Section 1: Configuration & Allocations --- */}
      <div className="p-6 rounded-xl border space-y-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Portfolio Configuration</h2>
          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <span style={{ color: "var(--text-secondary)" }}>Inflation Adjusted (Real)</span>
                <Switch checked={inflationAdjusted} onChange={(e) => setInflationAdjusted(e.target.checked)} />
              </label>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--text-secondary)" }}>Time Period:</span>
              <input type="number" min={START_YEAR} max={endYear - 1} value={startYear} onChange={(e) => setStartYear(Math.max(START_YEAR, Math.min(endYear - 1, Number(e.target.value))))} className="w-20 px-2 py-1 rounded border outline-none text-center" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
              <span style={{ color: "var(--text-secondary)" }}>to</span>
              <input type="number" min={startYear + 1} max={END_YEAR} value={endYear} onChange={(e) => setEndYear(Math.max(startYear + 1, Math.min(END_YEAR, Number(e.target.value))))} className="w-20 px-2 py-1 rounded border outline-none text-center" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--text-secondary)" }}>Benchmark:</span>
              <select value={benchmark} onChange={(e) => setBenchmark(e.target.value as AssetKey | "none")} className="px-2 py-1 rounded border outline-none" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                <option value="none">None</option>
                {Object.entries(ASSET_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p, pIdx) => (
            <div key={p.id} className="p-4 rounded-lg border flex flex-col h-full relative" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
               {portfolios.length > 1 && (
                <button onClick={() => removePortfolio(p.id)} className="absolute top-3 right-3 p-1 rounded-md hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--negative)] transition-colors">
                  <X size={16} />
                </button>
              )}
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: p.color }}>
                <span className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                {p.label}
              </h3>
              
              <div className="flex-1 space-y-3">
                {p.allocations.map((alloc, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-2">
                    <select
                      value={alloc.asset}
                      onChange={(e) => updateAllocation(p.id, aIdx, "asset", e.target.value)}
                      className="flex-1 text-xs px-2 py-1.5 rounded border outline-none"
                      style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                      {Object.entries(ASSET_LABELS).map(([k, label]) => (
                        <option key={k} value={k}>{label}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={alloc.weight}
                      onChange={(e) => updateAllocation(p.id, aIdx, "weight", Number(e.target.value))}
                      className="w-16 text-xs px-2 py-1.5 rounded border outline-none text-right"
                      style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>%</span>
                    {p.allocations.length > 1 && (
                      <button onClick={() => removeAssetFromPortfolio(p.id, aIdx)} className="p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)]">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={() => addAssetToPortfolio(p.id)}
                  className="w-full py-1.5 mt-2 rounded border border-dashed text-xs flex justify-center items-center gap-1 transition-colors hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  <Plus size={14} /> Add Asset
                </button>
              </div>

              {/* Donut Chart */}
              <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={p.allocations} dataKey="weight" innerRadius={25} outerRadius={45} paddingAngle={2} stroke="none">
                      {p.allocations.map((a, i) => (
                        <Cell key={`cell-${i}`} fill={ASSET_COLORS[a.asset as keyof typeof ASSET_COLORS] || "var(--text-muted)"} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                      itemStyle={{ color: "var(--text-primary)" }}
                      formatter={(val: number | undefined, name: string | undefined, props: { payload?: { asset: string } }) => {
                        if (val === undefined || !props.payload?.asset) return ["-", "Asset"];
                        return [`${val}%`, ASSET_LABELS[props.payload.asset as AssetKey]];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}

          {portfolios.length < 3 && (
            <button
              onClick={addPortfolio}
              className="p-4 rounded-lg border border-dashed flex flex-col items-center justify-center h-full min-h-[250px] transition-colors hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "transparent" }}
            >
              <Plus size={24} className="mb-2" />
              <span className="text-sm font-medium">Add Portfolio</span>
            </button>
          )}
        </div>
      </div>

      {/* --- Section 2: Portfolio Returns Summary --- */}
      <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
         <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Portfolio Returns</h2>
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Metric</th>
                  {portfolios.map(p => (
                    <th key={p.id} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: p.color }}>{p.label}</th>
                  ))}
                  {benchmark !== "none" && <th className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[benchmark]}</th>}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Initial Balance", key: "totalInvested", fmt: fmtCurr },
                  { label: "Final Balance", key: "finalValue", fmt: fmtCurr },
                  { label: "CAGR", key: "cagr", fmt: fmtPct },
                  { label: "Stdev", key: "stdDev", fmt: fmtPct },
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
                    {results.map((res, rIdx) => {
                      const typedRes = res as unknown as Record<string, number | string | undefined>;
                      return (
                        <td key={`r-${rIdx}`} className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>
                          {row.fmt(typedRes[row.key] as number | undefined)}
                        </td>
                      );
                    })}
                    {benchmark !== "none" && benchmarkResult && (
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                        {row.fmt((benchmarkResult as unknown as Record<string, number | string | undefined>)[row.key] as number | undefined)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
      
       {/* --- Section 3: Trailing Returns --- */}
      <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
         <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Trailing Returns (Annualized)</h2>
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Period</th>
                  {portfolios.map(p => (
                    <th key={p.id} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: p.color }}>{p.label}</th>
                  ))}
                  {benchmark !== "none" && <th className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[benchmark]}</th>}
                </tr>
              </thead>
              <tbody>
                {trailingReturns.map((row, i, arr) => (
                   <tr key={row.period as string} style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td className="py-2 px-3 font-medium text-xs whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{row.period}</td>
                    {portfolios.map(p => (
                      <td key={p.id} className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>
                        {fmtPct(row[p.label] as string)}
                      </td>
                    ))}
                    {benchmark !== "none" && (
                       <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                        {fmtPct(row[ASSET_LABELS[benchmark]] as string)}
                      </td>
                    )}
                   </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      {/* --- Section 4: Comprehensive Metrics --- */}
      <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
         <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Risk & Return Metrics</h2>
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Metric</th>
                  {portfolios.map(p => (
                    <th key={p.id} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: p.color }}>{p.label}</th>
                  ))}
                  {benchmark !== "none" && <th className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{ASSET_LABELS[benchmark]}</th>}
                </tr>
              </thead>
              <tbody>
                {[
                  // Return Metrics
                  { label: "CAGR (Geometric Mean)", key: "cagr", fmt: fmtPct, section: "Returns" },
                  { label: "Arithmetic Mean", key: "avgPositiveReturn", fmt: fmtPct }, // Placeholder for actual arithmetic mean if added to engine
                  { label: "Best Year", key: "bestYearReturn", fmt: fmtPct },
                  { label: "Worst Year", key: "worstYearReturn", fmt: fmtPct },
                  { label: "Positive Years", key: "positiveYears", fmt: (v: number | undefined | null) => v ?? "-" },
                  { label: "Negative Years", key: "negativeYears", fmt: (v: number | undefined | null) => v ?? "-" },
                  
                  // Risk Metrics
                  { label: "Standard Deviation", key: "stdDev", fmt: fmtPct, section: "Risk" },
                  { label: "Downside Deviation", key: "downsideDev", fmt: fmtPct },
                  { label: "Max Drawdown", key: "maxDrawdown", fmt: fmtPct },
                  { label: "Historical VaR (5%)", key: "var5", fmt: fmtPct },
                  { label: "Conditional VaR (5%)", key: "cvar5", fmt: fmtPct },
                  { label: "Skewness", key: "skewness", fmt: fmtRatio },
                  { label: "Excess Kurtosis", key: "kurtosis", fmt: fmtRatio },

                  // Risk-Adjusted Metrics
                  { label: "Sharpe Ratio", key: "sharpe", fmt: fmtRatio, section: "Risk-Adjusted" },
                  { label: "Sortino Ratio", key: "sortino", fmt: fmtRatio },
                  { label: "Treynor Ratio", key: "treynor", fmt: fmtRatio },
                  { label: "Calmar Ratio", key: "calmar", fmt: fmtRatio },
                  { label: "Gain/Loss Ratio", key: "gainLossRatio", fmt: fmtRatio },

                  // Benchmark Relative Metrics
                  { label: "Active Return", key: "activeReturn", fmt: fmtPct, section: "Benchmark Relative" },
                  { label: "Tracking Error", key: "trackingError", fmt: fmtPct },
                  { label: "Information Ratio", key: "informationRatio", fmt: fmtRatio },
                  { label: "Beta", key: "beta", fmt: fmtRatio },
                  { label: "Alpha", key: "alpha", fmt: fmtPct },
                  { label: "R-Squared", key: "rSquared", fmt: fmtRatio },
                  { label: "Upside Capture Ratio", key: "upsideCapture", fmt: fmtRatio },
                  { label: "Downside Capture Ratio", key: "downsideCapture", fmt: fmtRatio },
                ].map((row, i, arr) => (
                  <React.Fragment key={row.key}>
                    {row.section && (
                      <tr>
                        <td colSpan={portfolios.length + (benchmark !== "none" ? 2 : 1)} className="py-3 px-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)", background: "var(--background)", borderTop: i > 0 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
                          {row.section}
                        </td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="py-2 px-3 font-medium text-xs whitespace-nowrap pl-6" style={{ color: "var(--text-primary)" }}>{row.label}</td>
                      {results.map((res, rIdx) => {
                        const typedRes = res as unknown as Record<string, number | string | undefined>;
                        return (
                          <td key={`r-${rIdx}`} className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>
                            {row.fmt(typedRes[row.key] as number | undefined)}
                          </td>
                        );
                      })}
                      {benchmark !== "none" && benchmarkResult && (
                        <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                          {row.fmt((benchmarkResult as unknown as Record<string, number | string | undefined>)[row.key] as number | undefined)}
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      {/* --- Section 5: Growth Chart --- */}
      <div className="p-6 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Portfolio Growth (₹10,000)</h2>
          <label className="flex items-center gap-2 text-sm cursor-pointer group">
            <span style={{ color: "var(--text-secondary)" }}>Log Scale</span>
            <Switch checked={logScale} onChange={(e) => setLogScale(e.target.checked)} />
          </label>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
              <YAxis scale={logScale ? "log" : "auto"} domain={logScale ? ["auto", "auto"] : [0, "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} width={60} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                itemStyle={{ color: "var(--text-primary)" }}
                // @ts-expect-error Recharts formatter types
                formatter={(value: number) => {
                  if (typeof value === "number") return formatINR(value);
                  return value;
                }}
                labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              {portfolios.map((p) => (
                <Line key={p.id} type="monotone" dataKey={p.label} name={p.label} stroke={p.color} strokeWidth={2} dot={false} />
              ))}
              {benchmark !== "none" && (
                <Line type="monotone" dataKey={ASSET_LABELS[benchmark]} name={ASSET_LABELS[benchmark]} stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Section 6: Drawdowns Analysis --- */}
      <div className="p-6 rounded-xl border space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Historical Drawdowns Analysis</h2>
        
        {/* Drawdowns Area Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={drawdownData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                {portfolios.map((p) => (
                  <linearGradient key={`grad-${p.id}`} id={`gradDown-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={p.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={p.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={50} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                formatter={(value: number | undefined) => {
                  if (value === undefined) return ["-"];
                  return [`${value.toFixed(2)}%`];
                }}
                labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              {portfolios.map((p) => (
                <Area key={p.id} type="monotone" dataKey={p.label} name={p.label} stroke={p.color} fill={`url(#gradDown-${p.id})`} strokeWidth={2} />
              ))}
              {benchmark !== "none" && (
                <Line type="monotone" dataKey={ASSET_LABELS[benchmark]} name={ASSET_LABELS[benchmark]} stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Historical Stress Periods Table */}
        <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Historical Market Stress Periods</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                  <th className="text-left text-xs font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Stress Period</th>
                  <th className="text-left text-xs font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Start</th>
                  <th className="text-left text-xs font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>End</th>
                  {portfolios.map((p) => (
                    <th key={`stress-${p.id}`} className="text-right text-xs font-medium py-2 px-3 border-l" style={{ color: p.color, borderColor: "var(--border)" }}>{p.label}</th>
                  ))}
                  {benchmark !== "none" && (
                    <th className="text-right text-xs font-medium py-2 px-3 border-l" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>{ASSET_LABELS[benchmark]}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Harshad Mehta Scam / Asian Crisis", start: 1992, end: 1998 },
                  { name: "Dotcom Crash", start: 2000, end: 2002 },
                  { name: "Global Financial Crisis", start: 2008, end: 2008 },
                  { name: "European Debt Crisis / Taper Tantrum", start: 2011, end: 2013 },
                  { name: "COVID-19 Crash", start: 2020, end: 2020 },
                  { name: "2022 Inflation/Rate Hike Bear Market", start: 2022, end: 2022 },
                ].map(period => {
                  if (period.start < startYear || period.end > endYear) return null;
                  
                  return (
                    <tr key={period.name} style={{ borderBottom: "1px solid var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="px-3 py-2 text-xs font-medium" style={{ color: "var(--text-primary)" }}>{period.name}</td>
                      <td className="px-3 py-2 text-xs" style={{ color: "var(--text-secondary)" }}>{period.start}</td>
                      <td className="px-3 py-2 text-xs" style={{ color: "var(--text-secondary)" }}>{period.end}</td>
                      
                      {portfolios.map((p, i) => {
                        const periodData = results[i]?.yearlyData.filter(d => d.year >= period.start && d.year <= period.end);
                        if (!periodData || periodData.length === 0) return <td key={`p-${i}`} className="px-3 py-2 text-right border-l">-</td>;
                        
                        const startVal = results[i]?.yearlyData.find(d => d.year === period.start - 1)?.value ?? 10000;
                        let peak = startVal;
                        let maxDd = 0;
                        
                        periodData.forEach(d => {
                          peak = Math.max(peak, d.value);
                          const dd = ((d.value - peak) / peak) * 100;
                          maxDd = Math.min(maxDd, dd);
                        });
                        
                        return (
                          <td key={`p-${i}`} className="px-3 py-2 text-right font-mono text-xs border-l" style={{ color: maxDd < 0 ? "var(--negative)" : "var(--text-primary)", borderColor: "var(--border)" }}>
                            {fmtPct(maxDd)}
                          </td>
                        );
                      })}
                      
                      {benchmark !== "none" && (
                        <td className="px-3 py-2 text-right font-mono text-xs border-l" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                          {(() => {
                            const periodData = results[0]?.yearlyData.filter(d => d.year >= period.start && d.year <= period.end);
                            if (!periodData || periodData.length === 0 || periodData[0].benchmarkValue === undefined) return "-";
                            
                            const startVal = results[0]?.yearlyData.find(d => d.year === period.start - 1)?.benchmarkValue ?? 10000;
                            let peak = startVal;
                            let maxDd = 0;
                            
                            periodData.forEach(d => {
                              peak = Math.max(peak, d.benchmarkValue as number);
                              const dd = (((d.benchmarkValue as number) - peak) / peak) * 100;
                              maxDd = Math.min(maxDd, dd);
                            });
                            
                            return fmtPct(maxDd);
                          })()}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 10 Drawdowns Table for Portfolio 1 */}
        {topDrawdownsData[0] && topDrawdownsData[0].length > 0 && (
          <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              Top Drawdowns <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: portfolios[0].color, color: "#fff" }}>{portfolios[0].label}</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Start Year</th>
                    <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>End Year</th>
                    <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Recovery Year</th>
                    <th className="text-right font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Duration (Yrs)</th>
                    <th className="text-right font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Depth</th>
                  </tr>
                </thead>
                <tbody>
                  {topDrawdownsData[0].map((dd, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="py-2 px-3 text-xs" style={{ color: "var(--text-primary)" }}>{dd.startYear}</td>
                      <td className="py-2 px-3 text-xs" style={{ color: "var(--text-primary)" }}>{dd.endYear}</td>
                      <td className="py-2 px-3 text-xs" style={{ color: "var(--text-secondary)" }}>{dd.recoveryYear || "Not Recovered"}</td>
                      <td className="py-2 px-3 text-right text-xs" style={{ color: "var(--text-secondary)" }}>{dd.recoveryYear ? dd.recoveryYear - dd.startYear : endYear - dd.startYear}</td>
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--negative)" }}>{fmtPct(dd.depth)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* --- Section 7: Asset Level Analysis --- */}
      <div className="p-6 rounded-xl border space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Asset Level Analysis</h2>
        
        {/* Asset Metrics Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Individual Asset Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Metric</th>
                  {assetMetricsData.map((data, i) => (
                    <th key={data.asset} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: ASSET_COLORS[data.asset as keyof typeof ASSET_COLORS] || "var(--text-primary)" }}>{ASSET_LABELS[data.asset as keyof typeof ASSET_LABELS]}</th>
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
                      const val = metrics ? metrics[row.key] : undefined;
                      return (
                        <td key={data.asset} className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                          {row.fmt(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annual Asset Returns Matrix */}
        <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Annual Asset Returns Matrix</h3>
          <div className="overflow-x-auto custom-scrollbar" style={{ maxHeight: "400px" }}>
            <table className="w-full text-sm relative">
              <thead className="sticky top-0 z-10" style={{ background: "var(--surface-elevated)", boxShadow: "0 1px 0 var(--border)" }}>
                <tr>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Year</th>
                  {uniqueAssets.map((asset) => (
                    <th key={asset} className="text-right font-medium py-2 px-3 whitespace-nowrap" style={{ color: ASSET_COLORS[asset as keyof typeof ASSET_COLORS] || "var(--text-primary)" }}>{ASSET_LABELS[asset as keyof typeof ASSET_LABELS]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i).map((y) => (
                  <tr key={y} style={{ borderBottom: "1px solid var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td className="py-2 px-3 font-medium text-xs" style={{ color: "var(--text-primary)" }}>{y}</td>
                    {uniqueAssets.map((asset) => {
                      let ret = ANNUAL_RETURNS[y]?.[asset] ?? 0;
                      if (inflationAdjusted) {
                        const cpi = INDIA_CPI[y] ?? 6;
                        ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
                      }
                      return (
                        <td key={asset} className="py-2 px-3 text-right font-mono text-xs" style={{ color: ret < 0 ? "var(--negative)" : (ret > 0 ? "var(--positive)" : "var(--text-secondary)") }}>
                          {fmtPct(ret)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Asset Correlations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>Asset</th>
                  {uniqueAssets.map(a => (
                    <th key={a} className="text-right font-medium py-2 px-3" style={{ color: "var(--text-muted)" }}>{ASSET_LABELS[a as keyof typeof ASSET_LABELS]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueAssets.map((rowAsset, i) => (
                  <tr key={rowAsset} style={{ borderBottom: i === uniqueAssets.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <td className="py-2 px-3 font-medium whitespace-nowrap text-xs" style={{ color: "var(--text-primary)" }}>
                      {ASSET_LABELS[rowAsset as keyof typeof ASSET_LABELS]}
                    </td>
                    {uniqueAssets.map(colAsset => {
                      const val = assetCorrelationData[rowAsset][colAsset];
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
      </div>

      {/* --- Section 8: Active Returns --- */}
      {benchmark !== "none" && (
        <div className="p-6 rounded-xl border space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Active Returns vs {ASSET_LABELS[benchmark]}</h2>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {portfolios.map((p, i) => {
              const portRets = results[i].yearlyData.map(d => d.annualReturn);
              const bmRets = results[i].yearlyData.map(d => d.benchmarkReturn!);
              
              const upMonths = bmRets.map((r, idx) => r > 0 ? { p: portRets[idx], b: r } : null).filter(Boolean) as {p:number, b:number}[];
              const downMonths = bmRets.map((r, idx) => r <= 0 ? { p: portRets[idx], b: r } : null).filter(Boolean) as {p:number, b:number}[];
              
              const upAbove = upMonths.filter(m => m.p > m.b).length;
              const downAbove = downMonths.filter(m => m.p > m.b).length;
              
              // Sort returns for the chart
              const sortedReturns = results[i].yearlyData.map(d => ({
                year: d.year,
                portRet: d.annualReturn,
                bmRet: d.benchmarkReturn!,
                active: d.annualReturn - d.benchmarkReturn!
              })).sort((a, b) => a.bmRet - b.bmRet);

              return (
                <div key={`active-${p.id}`} className="space-y-6">
                  <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: p.color }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    {p.label}
                  </h3>
                  
                  {/* Up vs Down Market Performance Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th rowSpan={2} className="text-left text-xs font-medium py-2 px-3 border-b" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Market Type</th>
                          <th colSpan={4} className="text-center text-xs font-medium py-1 px-3 border-b border-l" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Occurrences</th>
                          <th colSpan={3} className="text-center text-xs font-medium py-1 px-3 border-b border-l" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Average Active Return</th>
                        </tr>
                        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-elevated)" }}>
                          <th className="text-right text-xs font-medium py-1.5 px-3 border-l" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Above Benchmark</th>
                          <th className="text-right text-xs font-medium py-1.5 px-3" style={{ color: "var(--text-muted)" }}>Below Benchmark</th>
                          <th className="text-right text-xs font-medium py-1.5 px-3" style={{ color: "var(--text-muted)" }}>Total</th>
                          <th className="text-right text-xs font-medium py-1.5 px-3" style={{ color: "var(--text-muted)" }}>% Above</th>
                          
                          <th className="text-right text-xs font-medium py-1.5 px-3 border-l" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Above Benchmark</th>
                          <th className="text-right text-xs font-medium py-1.5 px-3" style={{ color: "var(--text-muted)" }}>Below Benchmark</th>
                          <th className="text-right text-xs font-medium py-1.5 px-3" style={{ color: "var(--text-muted)" }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                          <td className="px-3 py-2 text-xs font-medium" style={{ color: "var(--text-primary)" }}>Up Market</td>
                          <td className="px-3 py-2 text-right font-mono text-xs border-l" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>{upAbove}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{upMonths.length - upAbove}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>{upMonths.length}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>{upMonths.length > 0 ? Math.round((upAbove/upMonths.length)*100) : 0}%</td>
                          
                          <td className="px-3 py-2 text-right font-mono text-xs border-l" style={{ borderColor: "var(--border)", color: "var(--positive)" }}>
                            {fmtPct(upMonths.filter(m => m.p > m.b).reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, upAbove))}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--negative)" }}>
                            {fmtPct(upMonths.filter(m => m.p <= m.b).reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, upMonths.length - upAbove))}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>
                            {fmtPct(upMonths.reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, upMonths.length))}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                          <td className="px-3 py-2 text-xs font-medium" style={{ color: "var(--text-primary)" }}>Down Market</td>
                          <td className="px-3 py-2 text-right font-mono text-xs border-l" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>{downAbove}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{downMonths.length - downAbove}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>{downMonths.length}</td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>{downMonths.length > 0 ? Math.round((downAbove/downMonths.length)*100) : 0}%</td>
                          
                          <td className="px-3 py-2 text-right font-mono text-xs border-l" style={{ borderColor: "var(--border)", color: "var(--positive)" }}>
                            {fmtPct(downMonths.filter(m => m.p > m.b).reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, downAbove))}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--negative)" }}>
                            {fmtPct(downMonths.filter(m => m.p <= m.b).reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, downMonths.length - downAbove))}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-xs" style={{ color: "var(--text-primary)" }}>
                            {fmtPct(downMonths.reduce((s, m) => s + (m.p - m.b), 0) / Math.max(1, downMonths.length))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Return vs Benchmark Sorted Chart */}
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sortedReturns} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                          formatter={(value: number | undefined) => {
                            if (value === undefined) return ["-"];
                            return [`${value.toFixed(2)}%`];
                          }}
                          labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                          cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />
                        <Bar dataKey="bmRet" name={ASSET_LABELS[benchmark]} fill="var(--text-secondary)" radius={[2, 2, 0, 0]} opacity={0.5} />
                        <Bar dataKey="portRet" name={p.label} fill={p.color} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- Section 9: Rolling Returns Charts --- */}
      <div className="p-6 rounded-xl border space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Rolling Returns Analysis</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* 3-Year Rolling Returns Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>3-Year Rolling Returns (CAGR)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rolling3YData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return ["-"];
                      return [`${value.toFixed(2)}%`];
                    }}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />
                  {portfolios.map((p) => (
                    <Line key={p.id} type="monotone" dataKey={p.label} name={p.label} stroke={p.color} strokeWidth={2} dot={false} />
                  ))}
                  {benchmark !== "none" && (
                    <Line type="monotone" dataKey={ASSET_LABELS[benchmark]} name={ASSET_LABELS[benchmark]} stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5-Year Rolling Returns Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>5-Year Rolling Returns (CAGR)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rolling5YData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} dy={10} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={(val) => `${val}%`} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--text-primary)" }}
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return ["-"];
                      return [`${value.toFixed(2)}%`];
                    }}
                    labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />
                  {portfolios.map((p) => (
                    <Line key={p.id} type="monotone" dataKey={p.label} name={p.label} stroke={p.color} strokeWidth={2} dot={false} />
                  ))}
                  {benchmark !== "none" && (
                    <Line type="monotone" dataKey={ASSET_LABELS[benchmark]} name={ASSET_LABELS[benchmark]} stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
