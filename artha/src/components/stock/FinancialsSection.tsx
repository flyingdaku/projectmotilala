"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, Minus, DollarSign, Wallet, Activity, Calculator, Download } from "lucide-react";
import type { QuarterlyResult, BalanceSheet, CashFlow, AnomalyFlag } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { buildDataMeta, getCoverage, shouldCollapseSparseGrid, shouldRenderChart } from "@/lib/stock/presentation";
import { MarginWaterfallChart } from "@/components/stock/MarginWaterfallChart";
import { WorkingCapitalCycle } from "@/components/stock/WorkingCapitalCycle";
import { CoverageNotice, DataMetaInline, StickyMetricTable, type StickyMetricTableColumn, type StickyMetricTableRow } from "@/components/stock/StockUiPrimitives";
import { exportAllFinancials } from "@/lib/utils/exportFinancials";
import { formatIndianNumber, formatPercent, formatPeriodLabel, formatSignedChange, MISSING_VALUE_LABEL } from "@/lib/utils/formatters";

function formatStatementValue(value: number | null | undefined): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return formatIndianNumber(value, 2, { fallback: MISSING_VALUE_LABEL });
}

function formatChartValue(value: number | null | undefined): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return formatIndianNumber(value, 1, { fallback: MISSING_VALUE_LABEL });
}

function formatMetricValue(value: number | null | undefined, suffix = ""): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return suffix === "%" ? formatPercent(value, 2) : `${value.toFixed(2)}${suffix}`;
}

function periodKey(value: string | null | undefined, index: number): string {
  return `${value ?? "period"}-${index}`;
}

function Trend({ val }: { val: number | null | undefined }) {
  if (val == null) return <Minus size={12} className="text-muted-foreground" />;
  if (val > 0) return <TrendingUp size={12} className="text-green-500" />;
  return <TrendingDown size={12} className="text-red-500" />;
}

function detectAnomalies(quarterly: QuarterlyResult[] | null | undefined, balanceSheets: BalanceSheet[] | null | undefined): AnomalyFlag[] {
  const flags: AnomalyFlag[] = [];
  const qData = quarterly || [];
  const bsData = balanceSheets || [];

  if (qData.length >= 4) {
    const latest = qData[0];
    const prev = qData[4];
    if (latest && prev) {
      const revGrowth = prev.revenue ? (((latest.revenue ?? 0) - prev.revenue) / Math.abs(prev.revenue)) * 100 : null;
      if ((latest.cfo ?? null) !== null && (latest.netProfit ?? null) !== null && (latest.netProfit ?? 0) > 0) {
        const cfoPatRatio = (latest.cfo ?? 0) / (latest.netProfit ?? 1);
        if (cfoPatRatio < 0.5) {
          flags.push({
            type: "CFO_PAT_DIVERGENCE",
            description: "CFO is less than 50% of reported PAT. Treat earnings quality cautiously.",
            severity: "WARNING",
            metric: "CFO/PAT",
            value: cfoPatRatio,
            threshold: 0.5,
          });
        }
      }
      if (revGrowth !== null && revGrowth < -10 && (latest.netProfit ?? 0) > (prev.netProfit ?? 0)) {
        flags.push({
          type: "MARGIN_EROSION",
          description: "Revenue is contracting while profit holds up. Check whether margin expansion is sustainable.",
          severity: "WARNING",
          metric: "Revenue growth",
          value: revGrowth,
          threshold: -10,
        });
      }
    }
  }

  if (bsData.length >= 2) {
    const [latest, prev] = bsData;
    if (latest.borrowings && prev.borrowings && prev.borrowings > 0) {
      const debtGrowth = ((latest.borrowings - prev.borrowings) / prev.borrowings) * 100;
      if (debtGrowth > 50) {
        flags.push({
          type: "DEBT_SPIKE",
          description: `Borrowings grew ${debtGrowth.toFixed(0)}% YoY. Verify whether the debt build supports productive assets.`,
          severity: "CRITICAL",
          metric: "Debt growth",
          value: debtGrowth,
          threshold: 50,
        });
      }
    }
  }

  return flags;
}

type RatiosRow = {
  periodEndDate: string;
  debtorDays: number | null;
  inventoryDays: number | null;
  daysPayable: number | null;
  roce: number | null;
  roe?: number | null;
  roa?: number | null;
  operatingMargin?: number | null;
  patMargin?: number | null;
  ebitMargin?: number | null;
  preTaxMargin?: number | null;
  debtEquity?: number | null;
  currentRatio?: number | null;
  quickRatio?: number | null;
  interestCoverage?: number | null;
  assetTurnover?: number | null;
  inventoryTurnover?: number | null;
  salesGrowthYoy?: number | null;
  netIncomeGrowthYoy?: number | null;
  epsGrowthYoy?: number | null;
  bookValuePerShare?: number | null;
  ebitGrowthYoy?: number | null;
  pbditMargin?: number | null;
  dividendPayout?: number | null;
  earningsRetention?: number | null;
  evEbitda?: number | null;
};

type FinancialsPayload = {
  quarterly: QuarterlyResult[];
  annual: QuarterlyResult[];
  balanceSheets: BalanceSheet[];
  cashFlows: CashFlow[];
  ratios: RatiosRow[];
  anomalies?: AnomalyFlag[];
  meta?: DataMeta;
};

interface Props {
  symbol: string;
}

export function FinancialsSection({ symbol }: Props) {
  const [isConsolidated, setIsConsolidated] = useState(true);
  const [viewMode, setViewMode] = useState<"quarterly" | "annual">("annual");
  const [showAllPeriods, setShowAllPeriods] = useState(false);
  const [showSparseRatios, setShowSparseRatios] = useState(false);
  const [data, setData] = useState<FinancialsPayload | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const requestKey = `${symbol}-${isConsolidated ? "consolidated" : "standalone"}`;

  useEffect(() => {
    fetch(`/api/stocks/${symbol}/financials?consolidated=${isConsolidated}`)
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok || payload.error) {
          setData(null);
          setLoadedKey(requestKey);
          return;
        }
        setData(payload);
        setLoadedKey(requestKey);
      })
      .catch(() => {
        setData(null);
        setLoadedKey(requestKey);
      });
  }, [requestKey, symbol, isConsolidated]);

  const loading = loadedKey !== requestKey;
  const meta = data?.meta ?? null;

  const anomalies = useMemo(() => {
    if (!data) return [];
    return data.anomalies && data.anomalies.length > 0
      ? data.anomalies
      : detectAnomalies(data.quarterly, data.balanceSheets);
  }, [data]);

  const statementRows = useMemo(() => {
    if (!data) return [];
    const source = viewMode === "quarterly" ? data.quarterly : data.annual;
    return source.slice(0, showAllPeriods ? 8 : 5);
  }, [data, viewMode, showAllPeriods]);

  const balanceRows = useMemo(() => (data?.balanceSheets ?? []).slice(0, showAllPeriods ? 8 : 5), [data, showAllPeriods]);
  const cashRows = useMemo(() => (data?.cashFlows ?? []).slice(0, showAllPeriods ? 8 : 5), [data, showAllPeriods]);

  const plChartData = useMemo(() => {
    const source = viewMode === "quarterly" ? data?.quarterly ?? [] : data?.annual ?? [];
    return [...source]
      .slice(0, 8)
      .reverse()
      .map((row) => ({
        period: viewMode === "quarterly"
          ? formatPeriodLabel(row.periodEnd ?? row.quarter)
          : (row.quarter ?? formatPeriodLabel(row.periodEnd, { annualAlias: true })),
        Revenue: row.revenue ?? undefined,
        "Op. Profit": row.operatingProfit ?? undefined,
        "Net Profit": row.netProfit ?? undefined,
      }));
  }, [data, viewMode]);

  const balanceChartData = useMemo(() => {
    return [...(data?.balanceSheets ?? [])]
      .slice(0, 8)
      .reverse()
      .map((row) => ({
        period: row.year ?? formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true }),
        Equity: row.totalEquity ?? row.equityCapital ?? undefined,
        Debt: row.borrowings ?? row.totalDebt ?? undefined,
        "Total Assets": row.totalAssets ?? undefined,
      }));
  }, [data]);

  const cashChartData = useMemo(() => {
    return [...(data?.cashFlows ?? [])]
      .slice(0, 8)
      .reverse()
      .map((row) => ({
        period: row.year ?? formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true }),
        "From Ops": row.cashFromOperating ?? row.operatingCF ?? undefined,
        "From Investing": row.cashFromInvesting ?? row.investingCF ?? undefined,
        "From Financing": row.cashFromFinancing ?? row.financingCF ?? undefined,
        FCF: row.freeCashFlow ?? row.freeCF ?? undefined,
      }));
  }, [data]);

  const ratiosChartData = useMemo(() => {
    return [...(data?.ratios ?? [])]
      .slice(0, 8)
      .reverse()
      .map((row) => ({
        period: formatPeriodLabel(row.periodEndDate, { annualAlias: true }),
        "Operating Margin": row.operatingMargin ?? undefined,
        "PAT Margin": row.patMargin ?? undefined,
        ROCE: row.roce ?? undefined,
      }));
  }, [data]);

  const latestRatio = data?.ratios?.[0] ?? null;
  const ratiosGrid = useMemo(() => {
    if (!latestRatio) return [];
    return [
      { label: "ROE", value: formatMetricValue(latestRatio.roe, "%"), available: latestRatio.roe != null },
      { label: "ROA", value: formatMetricValue(latestRatio.roa, "%"), available: latestRatio.roa != null },
      { label: "EBIT Margin", value: formatMetricValue(latestRatio.ebitMargin, "%"), available: latestRatio.ebitMargin != null },
      { label: "Pre-Tax Margin", value: formatMetricValue(latestRatio.preTaxMargin, "%"), available: latestRatio.preTaxMargin != null },
      { label: "Debt / Equity", value: formatMetricValue(latestRatio.debtEquity, "x"), available: latestRatio.debtEquity != null },
      { label: "Current Ratio", value: formatMetricValue(latestRatio.currentRatio, "x"), available: latestRatio.currentRatio != null },
      { label: "Quick Ratio", value: formatMetricValue(latestRatio.quickRatio, "x"), available: latestRatio.quickRatio != null },
      { label: "Interest Coverage", value: formatMetricValue(latestRatio.interestCoverage, "x"), available: latestRatio.interestCoverage != null },
      { label: "Asset Turnover", value: formatMetricValue(latestRatio.assetTurnover, "x"), available: latestRatio.assetTurnover != null },
      { label: "Sales Growth YoY", value: formatMetricValue(latestRatio.salesGrowthYoy, "%"), available: latestRatio.salesGrowthYoy != null },
      { label: "PAT Growth YoY", value: formatMetricValue(latestRatio.netIncomeGrowthYoy, "%"), available: latestRatio.netIncomeGrowthYoy != null },
      { label: "EPS Growth YoY", value: formatMetricValue(latestRatio.epsGrowthYoy, "%"), available: latestRatio.epsGrowthYoy != null },
      { label: "BVPS", value: formatMetricValue(latestRatio.bookValuePerShare, ""), available: latestRatio.bookValuePerShare != null },
      { label: "EV / EBITDA", value: formatMetricValue(latestRatio.evEbitda, "x"), available: latestRatio.evEbitda != null },
      { label: "Dividend Payout", value: formatMetricValue(latestRatio.dividendPayout, "%"), available: latestRatio.dividendPayout != null },
      { label: "Earnings Retention", value: formatMetricValue(latestRatio.earningsRetention, "%"), available: latestRatio.earningsRetention != null },
      { label: "PBDIT Margin", value: formatMetricValue(latestRatio.pbditMargin, "%"), available: latestRatio.pbditMargin != null },
      { label: "EBIT Growth YoY", value: formatMetricValue(latestRatio.ebitGrowthYoy, "%"), available: latestRatio.ebitGrowthYoy != null },
    ];
  }, [latestRatio]);

  const visibleRatioCards = useMemo(() => {
    const available = ratiosGrid.filter((metric) => metric.available);
    if (showSparseRatios) return ratiosGrid;
    return available.slice(0, 12);
  }, [ratiosGrid, showSparseRatios]);

  const ratiosSparse = shouldCollapseSparseGrid(ratiosGrid.map((metric) => metric.available ? metric.value : null));

  const plColumns: StickyMetricTableColumn[] = statementRows.map((row, index) => ({
    key: periodKey(row.periodEnd ?? row.quarter, index),
    label: viewMode === "quarterly"
      ? formatPeriodLabel(row.periodEnd ?? row.quarter)
      : (row.quarter ?? formatPeriodLabel(row.periodEnd, { annualAlias: true })),
  }));

  const plTableRows: StickyMetricTableRow[] = [
    { key: "revenue", label: "Revenue", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.revenue)])) },
    { key: "operatingProfit", label: "Operating Profit", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.operatingProfit)])) },
    { key: "ebit", label: "EBIT", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.ebit)])) },
    { key: "opm", label: "OPM %", values: Object.fromEntries(statementRows.map((row, index) => {
      const value = row.revenue && row.operatingProfit != null ? (row.operatingProfit / row.revenue) * 100 : null;
      return [periodKey(row.periodEnd ?? row.quarter, index), formatMetricValue(value, "%")];
    })) },
    { key: "interest", label: "Interest", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.interest)])) },
    { key: "pbt", label: "PBT", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.pbt)])) },
    { key: "tax", label: "Tax", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.tax)])) },
    { key: "netProfit", label: "Net Profit", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), formatStatementValue(row.netProfit)])), rowClassName: "font-semibold" },
    { key: "eps", label: "EPS", values: Object.fromEntries(statementRows.map((row, index) => [periodKey(row.periodEnd ?? row.quarter, index), row.eps != null ? row.eps.toFixed(2) : MISSING_VALUE_LABEL])), rowClassName: "font-semibold" },
  ];

  const balanceColumns: StickyMetricTableColumn[] = balanceRows.map((row, index) => ({
    key: periodKey(row.periodEndDate ?? row.periodEnd, index),
    label: formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true }),
  }));

  const balanceTableRows: StickyMetricTableRow[] = [
    { key: "equityCapital", label: "Equity Capital", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.equityCapital)])) },
    { key: "reserves", label: "Reserves", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.reserves)])) },
    { key: "borrowings", label: "Borrowings", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.borrowings ?? row.totalDebt)])) },
    { key: "tradeReceivables", label: "Trade Receivables", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.tradeReceivables)])) },
    { key: "cashEquivalents", label: "Cash & Equiv.", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.cashEquivalents ?? row.cash)])) },
    { key: "totalAssets", label: "Total Assets", values: Object.fromEntries(balanceRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.totalAssets)])), rowClassName: "font-semibold" },
  ];

  const cashColumns: StickyMetricTableColumn[] = cashRows.map((row, index) => ({
    key: periodKey(row.periodEndDate ?? row.periodEnd, index),
    label: formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true }),
  }));

  const cashTableRows: StickyMetricTableRow[] = [
    { key: "operating", label: "Operating CF", values: Object.fromEntries(cashRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.cashFromOperating ?? row.operatingCF)])) },
    { key: "investing", label: "Investing CF", values: Object.fromEntries(cashRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.cashFromInvesting ?? row.investingCF)])) },
    { key: "financing", label: "Financing CF", values: Object.fromEntries(cashRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.cashFromFinancing ?? row.financingCF)])) },
    { key: "capex", label: "Capex", values: Object.fromEntries(cashRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.capex)])) },
    { key: "fcf", label: "Free Cash Flow", values: Object.fromEntries(cashRows.map((row, index) => [periodKey(row.periodEndDate ?? row.periodEnd, index), formatStatementValue(row.freeCashFlow ?? row.freeCF)])), rowClassName: "font-semibold" },
  ];

  const latestQuarter = data?.quarterly?.[0] ?? null;
  const previousAnnual = data?.annual?.[1] ?? null;
  const revenueDelta = latestQuarter && data?.quarterly?.[4]?.revenue
    ? (((latestQuarter.revenue ?? 0) - (data.quarterly[4].revenue ?? 0)) / Math.abs(data.quarterly[4].revenue ?? 1)) * 100
    : null;
  const latestAnnualRevenue = data?.annual?.[0]?.revenue ?? null;
  const annualRevenueDelta = latestAnnualRevenue != null && previousAnnual?.revenue
    ? ((latestAnnualRevenue - previousAnnual.revenue) / Math.abs(previousAnnual.revenue)) * 100
    : null;

  const statementMeta = meta ?? buildDataMeta({
    asOfCandidates: [
      data?.quarterly?.[0]?.periodEnd,
      data?.annual?.[0]?.periodEnd,
      data?.balanceSheets?.[0]?.periodEndDate,
      data?.cashFlows?.[0]?.periodEndDate,
      data?.ratios?.[0]?.periodEndDate,
    ],
    coverage: getCoverage([
      data?.quarterly?.length ? data.quarterly : null,
      data?.annual?.length ? data.annual : null,
      data?.balanceSheets?.length ? data.balanceSheets : null,
      data?.cashFlows?.length ? data.cashFlows : null,
      data?.ratios?.length ? data.ratios : null,
    ]),
    note: '₹ Cr unless stated',
    unitLabel: '₹ Cr unless stated',
  });

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "10px",
    fontSize: "12px",
    color: "var(--text-primary)",
  };

  const axisStyle = { fontSize: 11, fill: "var(--text-muted)" };

  if (loading) {
    return (
      <section id="financials" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="financials" className="scroll-mt-28">
        <CoverageNotice
          title="Financial statements unavailable"
          message="Financial history could not be loaded for this company view. Check whether the selected listing has statement coverage."
        />
      </section>
    );
  }

  return (
    <section id="financials" className="scroll-mt-28 space-y-6">
      {anomalies.length > 0 && (
        <div className="space-y-2">
          {anomalies.map((flag, index) => (
            <div key={`${flag.type}-${index}`} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${flag.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
              <AlertTriangle size={14} className={`mt-0.5 flex-shrink-0 ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-500"}`} />
              <div>
                <span className={`font-semibold ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-600"}`}>{flag.severity}: </span>
                <span style={{ color: "var(--text-secondary)" }}>{flag.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border p-6 space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>Statement Coverage</div>
            <h2 className="mt-1 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Financials</h2>
            <div className="mt-2">
              <DataMetaInline meta={statementMeta} />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {["Consol.", "Standalone"].map((label, index) => (
                <button
                  key={label}
                  onClick={() => setIsConsolidated(index === 0)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isConsolidated === (index === 0) ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {(["quarterly", "annual"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${viewMode === mode ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button
              onClick={() => exportAllFinancials(data.quarterly, data.balanceSheets, data.cashFlows, symbol)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
              style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-5 space-y-5" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign size={20} style={{ color: "var(--accent-brand)" }} />
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Profit & Loss</h3>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {viewMode === "quarterly"
                  ? (revenueDelta != null ? `Latest quarter revenue is ${formatSignedChange(revenueDelta)} versus the same quarter last year.` : "Quarter-on-quarter and YoY revenue comparison is not complete yet.")
                  : (annualRevenueDelta != null ? `Latest annual revenue is ${formatSignedChange(annualRevenueDelta)} versus the prior year.` : "Annual revenue trend needs one more comparable year for a clean delta.")}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAllPeriods((value) => !value)}
              className="text-xs font-medium"
              style={{ color: "var(--accent-brand)" }}
            >
              {showAllPeriods ? "Show latest 5 periods" : "Show all visible periods"}
            </button>
          </div>

          {latestQuarter?.revenue && latestQuarter.operatingProfit != null && latestQuarter.netProfit != null ? (
            <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <MarginWaterfallChart
                revenue={latestQuarter.revenue}
                operatingProfit={latestQuarter.operatingProfit}
                netProfit={latestQuarter.netProfit}
                period={latestQuarter.periodEnd?.slice(0, 7) ?? "Latest"}
              />
            </div>
          ) : null}

          {shouldRenderChart(plChartData, 3) ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plChartData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(value) => formatChartValue(value)} width={56} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [formatStatementValue(value as number)]} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                  <Bar dataKey="Revenue" fill="#3B82F6" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="Op. Profit" fill="#F59E0B" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="Net Profit" fill="#10B981" radius={[3, 3, 0, 0]} opacity={0.9} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <CoverageNotice meta={statementMeta} title="P&L chart hidden" message="There are not enough populated periods to show a reliable profit-and-loss trend yet." />
          )}

          <StickyMetricTable
            ariaLabel="Profit and loss table"
            columns={plColumns}
            rows={plTableRows}
            latestColumnKey={plColumns[0]?.key}
          />
        </div>

        <div className="rounded-xl border p-5 space-y-5" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <Wallet size={20} style={{ color: "var(--accent-brand)" }} />
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Balance Sheet</h3>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Assets, equity, and borrowings are grouped so leverage can be scanned in one pass.
              </div>
            </div>
          </div>

          {shouldRenderChart(balanceChartData, 3) ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={balanceChartData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(value) => formatChartValue(value)} width={56} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [formatStatementValue(value as number)]} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                  <Bar dataKey="Total Assets" fill="#3B82F6" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="Equity" fill="#10B981" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="Debt" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.9} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <CoverageNotice meta={statementMeta} title="Balance sheet chart hidden" message="Balance sheet history is too sparse to compare assets, equity, and debt confidently." />
          )}

          <StickyMetricTable
            ariaLabel="Balance sheet table"
            columns={balanceColumns}
            rows={balanceTableRows}
            latestColumnKey={balanceColumns[0]?.key}
          />
        </div>

        <div className="rounded-xl border p-5 space-y-5" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={20} style={{ color: "var(--accent-brand)" }} />
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Cash Flow Statement</h3>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Operating, investing, and financing cash flows are kept on one scale, with FCF overlaid as the key output line.
              </div>
            </div>
          </div>

          {shouldRenderChart(cashChartData, 3) ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashChartData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(value) => formatChartValue(value)} width={56} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [formatStatementValue(value as number)]} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <Bar dataKey="From Ops" fill="#10B981" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="From Investing" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Bar dataKey="From Financing" fill="#3B82F6" radius={[3, 3, 0, 0]} opacity={0.9} />
                  <Line type="monotone" dataKey="FCF" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <CoverageNotice meta={statementMeta} title="Cash-flow chart hidden" message="Cash-flow history is not complete enough to show the operating/investing/financing split cleanly." />
          )}

          <StickyMetricTable
            ariaLabel="Cash flow table"
            columns={cashColumns}
            rows={cashTableRows}
            latestColumnKey={cashColumns[0]?.key}
          />
        </div>

        <div className="rounded-xl border p-5 space-y-5" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <Calculator size={20} style={{ color: "var(--accent-brand)" }} />
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Key Ratios & Metrics</h3>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                The line chart stays focused on margins and ROCE; the card grid only shows populated metrics first.
              </div>
            </div>
          </div>

          {latestRatio?.debtorDays != null && latestRatio.inventoryDays != null && latestRatio.daysPayable != null ? (
            <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <WorkingCapitalCycle
                debtorDays={latestRatio.debtorDays}
                inventoryDays={latestRatio.inventoryDays}
                payableDays={latestRatio.daysPayable}
                period={latestRatio.periodEndDate?.slice(0, 7) ?? "Latest"}
              />
            </div>
          ) : null}

          {shouldRenderChart(ratiosChartData, 3) ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratiosChartData} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={axisStyle} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} width={40} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                  <Line type="monotone" dataKey="Operating Margin" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="PAT Margin" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="ROCE" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <CoverageNotice meta={statementMeta} title="Ratios chart hidden" message="Ratio history is too sparse to show trend lines without misleading gaps." />
          )}

          {ratiosSparse && (
            <CoverageNotice
              meta={statementMeta}
              title="Some ratio cards are hidden"
              message="Only populated metrics are shown first. Reveal unavailable items only if you need to inspect coverage gaps."
              action={
                <button
                  type="button"
                  onClick={() => setShowSparseRatios((value) => !value)}
                  className="text-xs font-medium"
                  style={{ color: "var(--accent-brand)" }}
                >
                  {showSparseRatios ? "Hide unavailable metrics" : "Show unavailable metrics"}
                </button>
              }
            />
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {visibleRatioCards.map((metric) => (
              <div key={metric.label} className={`rounded-xl border p-3 ${metric.available ? "" : "opacity-90"}`} style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-[11px] mb-1" style={{ color: "var(--text-muted)" }}>{metric.label}</div>
                <div className="text-sm font-semibold font-mono metric-mono" style={{ color: metric.available ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {metric.value}
                </div>
                {!metric.available ? (
                  <div className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    Hidden from scoring until coverage improves.
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {data.quarterly.length >= 5 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Revenue YoY",
                  val: data.quarterly[0]?.revenue && data.quarterly[4]?.revenue
                    ? ((data.quarterly[0].revenue - data.quarterly[4].revenue) / Math.abs(data.quarterly[4].revenue)) * 100
                    : null,
                },
                {
                  label: "PAT YoY",
                  val: data.quarterly[0]?.netProfit && data.quarterly[4]?.netProfit
                    ? ((data.quarterly[0].netProfit - data.quarterly[4].netProfit) / Math.abs(data.quarterly[4].netProfit)) * 100
                    : null,
                },
                {
                  label: "OPM",
                  val: data.quarterly[0]?.revenue && data.quarterly[0]?.operatingProfit
                    ? (data.quarterly[0].operatingProfit / data.quarterly[0].revenue) * 100
                    : null,
                },
                {
                  label: "EPS TTM",
                  val: data.quarterly.slice(0, 4).reduce((sum, row) => sum + (row.eps ?? 0), 0),
                },
              ].map((metric, index) => (
                <div key={metric.label} className="rounded-xl border p-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{metric.label}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold font-mono metric-mono" style={{ color: metric.val != null && metric.val >= 0 ? "#10B981" : metric.val != null && metric.val < 0 ? "#EF4444" : "var(--text-primary)" }}>
                      {metric.val != null ? (index < 3 ? formatPercent(metric.val, 2) : metric.val.toFixed(2)) : MISSING_VALUE_LABEL}
                    </span>
                    <Trend val={index < 3 ? metric.val : null} />
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
