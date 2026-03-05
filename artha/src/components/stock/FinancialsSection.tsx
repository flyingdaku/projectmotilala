"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, Minus, DollarSign, Wallet, Activity, Calculator, Download } from "lucide-react";
import type { QuarterlyResult, BalanceSheet, CashFlow, AnomalyFlag } from "@/lib/data/types";
import { MarginWaterfallChart } from "@/components/stock/MarginWaterfallChart";
import { WorkingCapitalCycle } from "@/components/stock/WorkingCapitalCycle";
import { exportAllFinancials } from "@/lib/utils/exportFinancials";

function fmt(v: number | null | undefined, unit = "Cr") {
  if (v == null) return "—";
  const abs = Math.abs(v);
  if (abs >= 1e5) return `${(v / 1e5).toFixed(2)}L ${unit}`;
  if (abs >= 100) return `${v.toFixed(0)} ${unit}`;
  return `${v.toFixed(2)} ${unit}`;
}

function fmtPct(v: number | null | undefined) {
  if (v == null) return "—";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function Trend({ val }: { val: number | null | undefined }) {
  if (val == null) return <Minus size={12} className="text-muted-foreground" />;
  if (val > 0) return <TrendingUp size={12} className="text-green-400" />;
  return <TrendingDown size={12} className="text-red-400" />;
}

function detectAnomalies(quarterly: QuarterlyResult[] | null | undefined, balanceSheets: BalanceSheet[] | null | undefined): AnomalyFlag[] {
  const flags: AnomalyFlag[] = [];
  const qData = quarterly || [];
  const bsData = balanceSheets || [];

  if (qData.length >= 4) {
    const latest = qData[0];
    const prev = qData[4];
    if (latest && prev) {
      const revGrowth = prev.revenue ? ((latest.revenue ?? 0) - prev.revenue) / Math.abs(prev.revenue) * 100 : null;
      const patGrowth = prev.netProfit ? ((latest.netProfit ?? 0) - prev.netProfit) / Math.abs(prev.netProfit) * 100 : null;
      if (revGrowth !== null && (latest.cfo ?? null) !== null && (latest.netProfit ?? null) !== null && (latest.netProfit ?? 0) > 0) {
        const cfoPatRatio = (latest.cfo ?? 0) / (latest.netProfit ?? 1);
        if (cfoPatRatio < 0.5) {
          flags.push({ type: "CFO_PAT_DIVERGENCE", description: "CFO is less than 50% of reported PAT — earnings quality concern", severity: "WARNING", metric: "CFO/PAT", value: cfoPatRatio, threshold: 0.5 });
        }
      }
      if (revGrowth !== null && patGrowth !== null && revGrowth < -10 && (patGrowth ?? 0) > 10) {
        flags.push({ type: "MARGIN_EROSION", description: "Revenue declining while margins expanding — unsustainable trend", severity: "WARNING", metric: "Revenue Growth", value: revGrowth, threshold: -10 });
      }
    }
  }
  if (bsData.length >= 2) {
    const [latest, prev] = bsData;
    if (latest.borrowings && prev.borrowings && prev.borrowings > 0) {
      const debtGrowth = (latest.borrowings - prev.borrowings) / prev.borrowings * 100;
      if (debtGrowth > 50) {
        flags.push({ type: "DEBT_SPIKE", description: `Borrowings grew ${debtGrowth.toFixed(0)}% YoY`, severity: "CRITICAL", metric: "Debt Growth", value: debtGrowth, threshold: 50 });
      }
    }
  }
  return flags;
}

interface Props {
  symbol: string;
}

export function FinancialsSection({ symbol }: Props) {
  const [isConsolidated, setIsConsolidated] = useState(true);
  const [data, setData] = useState<{
    quarterly: QuarterlyResult[];
    annual: QuarterlyResult[];
    balanceSheets: BalanceSheet[];
    cashFlows: CashFlow[];
    ratios: Array<{ periodEndDate: string; debtorDays: number | null; inventoryDays: number | null; daysPayable: number | null; roce: number | null }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"quarterly" | "annual">("annual");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/stocks/${symbol}/financials?consolidated=${isConsolidated}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [symbol, isConsolidated]);

  const anomalies = useMemo(() => {
    if (!data) return [];
    return detectAnomalies(data.quarterly, data.balanceSheets);
  }, [data]);

  const plData = useMemo(() => {
    if (!data) return [];
    const quarterly = data.quarterly || [];
    const annual = data.annual || [];
    const src = viewMode === "quarterly" ? [...quarterly].reverse() : [...annual].filter(r => r.periodType === "annual").reverse();
    return src.map((r) => ({
      period: (r.periodEnd ?? "").slice(0, 7),
      Revenue: r.revenue ?? 0,
      "Op. Profit": r.operatingProfit ?? 0,
      "Net Profit": r.netProfit ?? 0,
    }));
  }, [data, viewMode]);

  const bsData = useMemo(() => {
    if (!data) return [];
    const balanceSheets = data.balanceSheets || [];
    return [...balanceSheets].reverse().map((r) => ({
      period: (r.periodEndDate ?? r.periodEnd ?? "").slice(0, 4),
      Equity: (r.equityCapital ?? 0) + (r.reserves ?? 0),
      Debt: r.borrowings ?? 0,
      "Total Assets": r.totalAssets ?? 0,
    }));
  }, [data]);

  const cfData = useMemo(() => {
    if (!data) return [];
    const cashFlows = data.cashFlows || [];
    return [...cashFlows].reverse().map((r) => ({
      period: (r.periodEndDate ?? r.periodEnd ?? "").slice(0, 4),
      "From Ops": r.cashFromOperating ?? 0,
      "From Investing": r.cashFromInvesting ?? 0,
      "From Financing": r.cashFromFinancing ?? 0,
      FCF: r.freeCashFlow ?? 0,
    }));
  }, [data]);

  const ratiosData = useMemo(() => {
    if (!data) return [];
    const ratios = data.ratios || [];
    return [...ratios].reverse().map((r) => ({
      period: r.periodEndDate.slice(0, 4),
      "Debtor Days": r.debtorDays ?? 0,
      "Inventory Days": r.inventoryDays ?? 0,
      ROCE: r.roce ?? 0,
    }));
  }, [data]);

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "var(--text-primary)",
  };

  const axisStyle = { fontSize: 11, fill: "var(--text-muted)" };

  if (loading) {
    return (
      <section id="financials" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section id="financials" className="scroll-mt-28 space-y-6">
      {/* Anomaly Flags */}
      {anomalies.length > 0 && (
        <div className="space-y-2">
          {anomalies.map((flag, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${flag.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
              <AlertTriangle size={14} className={`mt-0.5 flex-shrink-0 ${flag.severity === "CRITICAL" ? "text-red-400" : "text-yellow-400"}`} />
              <div>
                <span className={`font-semibold ${flag.severity === "CRITICAL" ? "text-red-400" : "text-yellow-400"}`}>{flag.severity}: </span>
                <span style={{ color: "var(--text-secondary)" }}>{flag.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Controls */}
      <div className="flex justify-end">
        <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
          {["Consol.", "Standalone"].map((m, idx) => (
            <button key={m} onClick={() => setIsConsolidated(idx === 0)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isConsolidated === (idx === 0) ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* P&L Pane */}
      <div id="financials" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign size={20} style={{ color: "var(--accent-brand)" }} />
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Profit & Loss</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => data && exportAllFinancials(data.quarterly, data.balanceSheets, data.cashFlows, symbol)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
              style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}
              disabled={!data}
            >
              <Download size={14} />
              Export CSV
            </button>
            {["quarterly", "annual"].map((m) => (
              <button key={m} onClick={() => setViewMode(m as any)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize ${viewMode === m ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Margin Waterfall Chart */}
          {data && data.quarterly.length > 0 && data.quarterly[0].revenue && data.quarterly[0].operatingProfit && data.quarterly[0].netProfit && (
            <div className="p-4 rounded-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
              <MarginWaterfallChart
                revenue={data.quarterly[0].revenue}
                operatingProfit={data.quarterly[0].operatingProfit}
                netProfit={data.quarterly[0].netProfit}
                period={data.quarterly[0].periodEnd?.slice(0, 7) ?? "Latest"}
              />
            </div>
          )}

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(v) => fmt(v, "")} width={56} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [fmt(v as number)]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                <Bar dataKey="Revenue" fill="#3B82F6" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="Op. Profit" fill="#F59E0B" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="Net Profit" fill="#10B981" radius={[2, 2, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {data && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="py-2 text-left pr-4 font-semibold min-w-[140px]" style={{ color: "var(--text-muted)" }}>Parameters</th>
                    {data.quarterly.slice(0, 8).map((r, i) => (
                      <th key={i} className="text-right py-2 px-3 font-semibold min-w-[80px]" style={{ color: "var(--text-muted)" }}>
                        {(r.periodEnd ?? "").slice(0, 7)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Revenue (Cr)</td>
                    {data.quarterly.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.revenue)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Operating Profit</td>
                    {data.quarterly.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.operatingProfit)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>OPM %</td>
                    {data.quarterly.slice(0, 8).map((r, i) => {
                      const opm = r.revenue && r.operatingProfit ? (r.operatingProfit / r.revenue * 100) : null;
                      return (
                        <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: opm && opm > 0 ? "#10B981" : "#EF4444" }}>{fmtPct(opm)}</td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Net Profit</td>
                    {data.quarterly.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: (r.netProfit ?? 0) >= 0 ? "#10B981" : "#EF4444" }}>{fmt(r.netProfit)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>NPM %</td>
                    {data.quarterly.slice(0, 8).map((r, i) => {
                      const npm = r.revenue && r.netProfit ? (r.netProfit / r.revenue * 100) : null;
                      return (
                        <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: npm && npm > 0 ? "#10B981" : "#EF4444" }}>{fmtPct(npm)}</td>
                      );
                    })}
                  </tr>
                  <tr className="bg-muted/5 font-bold">
                    <td className="py-3 pr-4" style={{ color: "var(--text-primary)" }}>EPS</td>
                    {data.quarterly.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-3 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{r.eps?.toFixed(2) ?? "—"}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Balance Sheet Pane */}
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-6">
          <Wallet size={20} style={{ color: "var(--accent-brand)" }} />
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Balance Sheet</h3>
        </div>
        <div className="space-y-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bsData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(v) => fmt(v, "")} width={56} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [fmt(v as number)]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                <Bar dataKey="Total Assets" fill="#3B82F6" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="Equity" fill="#10B981" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="Debt" fill="#EF4444" radius={[2, 2, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {data && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="py-2 text-left pr-4 font-semibold min-w-[140px]" style={{ color: "var(--text-muted)" }}>Parameters</th>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <th key={i} className="text-right py-2 px-3 font-semibold min-w-[80px]" style={{ color: "var(--text-muted)" }}>
                        {(r.periodEndDate ?? r.periodEnd ?? "").slice(0, 7)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Equity Capital</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.equityCapital)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Reserves</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.reserves)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Borrowings</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: (r.borrowings ?? 0) > 0 ? "#EF4444" : "var(--text-primary)" }}>{fmt(r.borrowings)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Trade Receivables</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.tradeReceivables)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Cash & Equiv.</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: "#10B981" }}>{fmt(r.cashEquivalents)}</td>
                    ))}
                  </tr>
                  <tr className="bg-muted/5 font-bold">
                    <td className="py-3 pr-4" style={{ color: "var(--text-primary)" }}>Total Assets</td>
                    {data.balanceSheets.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-3 px-3 font-mono" style={{ color: "var(--text-primary)" }}>{fmt(r.totalAssets)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Cash Flow Pane */}
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={20} style={{ color: "var(--accent-brand)" }} />
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Cash Flow Statement</h3>
        </div>
        <div className="space-y-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cfData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(v) => fmt(v, "")} width={56} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [fmt(v as number)]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Bar dataKey="From Ops" fill="#10B981" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="From Investing" fill="#EF4444" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Bar dataKey="From Financing" fill="#3B82F6" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Line type="monotone" dataKey="FCF" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {data && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="py-2 text-left pr-4 font-semibold min-w-[140px]" style={{ color: "var(--text-muted)" }}>Parameters</th>
                    {data.cashFlows.slice(0, 8).map((r, i) => (
                      <th key={i} className="text-right py-2 px-3 font-semibold min-w-[80px]" style={{ color: "var(--text-muted)" }}>
                        {(r.periodEndDate ?? r.periodEnd ?? "").slice(0, 7)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Operating CF</td>
                    {data.cashFlows.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: (r.cashFromOperating ?? 0) >= 0 ? "#10B981" : "#EF4444" }}>{fmt(r.cashFromOperating)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Investing CF</td>
                    {data.cashFlows.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: (r.cashFromInvesting ?? 0) >= 0 ? "#10B981" : "#EF4444" }}>{fmt(r.cashFromInvesting)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>Financing CF</td>
                    {data.cashFlows.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono" style={{ color: (r.cashFromFinancing ?? 0) >= 0 ? "#10B981" : "#EF4444" }}>{fmt(r.cashFromFinancing)}</td>
                    ))}
                  </tr>
                  <tr className="bg-muted/5 font-bold">
                    <td className="py-3 pr-4" style={{ color: "var(--text-primary)" }}>Free Cash Flow</td>
                    {data.cashFlows.slice(0, 8).map((r, i) => (
                      <td key={i} className="text-right py-3 px-3 font-mono" style={{ color: (r.freeCashFlow ?? 0) >= 0 ? "#10B981" : "#EF4444" }}>{fmt(r.freeCashFlow)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Ratios Pane */}
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-6">
          <Calculator size={20} style={{ color: "var(--accent-brand)" }} />
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Key Ratios & Metrics</h3>
        </div>
        <div className="space-y-6">
          {/* Working Capital Cycle Visualization */}
          {data && data.ratios.length > 0 && data.ratios[0].debtorDays && data.ratios[0].inventoryDays && data.ratios[0].daysPayable && (
            <div className="p-4 rounded-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
              <WorkingCapitalCycle
                debtorDays={data.ratios[0].debtorDays}
                inventoryDays={data.ratios[0].inventoryDays}
                payableDays={data.ratios[0].daysPayable}
                period={data.ratios[0].periodEndDate?.slice(0, 7) ?? "Latest"}
              />
            </div>
          )}

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratiosData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                <Line type="monotone" dataKey="Debtor Days" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Inventory Days" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ROCE" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {data && data.quarterly.length >= 2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Revenue YoY", val: data.quarterly[0]?.revenue && data.quarterly[4]?.revenue ? (data.quarterly[0].revenue - data.quarterly[4].revenue) / Math.abs(data.quarterly[4].revenue) * 100 : null },
                { label: "PAT YoY", val: data.quarterly[0]?.netProfit && data.quarterly[4]?.netProfit ? (data.quarterly[0].netProfit - data.quarterly[4].netProfit) / Math.abs(data.quarterly[4].netProfit) * 100 : null },
                { label: "OPM", val: data.quarterly[0]?.revenue && data.quarterly[0]?.operatingProfit ? data.quarterly[0].operatingProfit / data.quarterly[0].revenue * 100 : null },
                { label: "EPS TTM", val: data.quarterly.slice(0, 4).reduce((s, r) => s + (r.eps ?? 0), 0) },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold font-mono" style={{ color: m.val && m.val >= 0 ? "#10B981" : m.val && m.val < 0 ? "#EF4444" : "var(--text-primary)" }}>
                      {m.val != null ? (i < 2 ? fmtPct(m.val) : i === 2 ? `${m.val.toFixed(1)}%` : m.val.toFixed(2)) : "—"}
                    </span>
                    <Trend val={i < 3 ? m.val : null} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
