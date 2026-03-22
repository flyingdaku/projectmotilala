"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { AlertTriangle, Download, BarChart2 } from "lucide-react";
import { apiGet } from "@/lib/api-client";
import type { FinancialsResponse } from "@/lib/api-types";
import type { QuarterlyResult, BalanceSheet, CashFlow, AnomalyFlag } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { CoverageNotice, DataMetaInline } from "@/components/stock/StockUiPrimitives";
import { exportAllFinancials } from "@/lib/utils/exportFinancials";
import { formatIndianNumber, formatPercent, formatPeriodLabel, MISSING_VALUE_LABEL } from "@/lib/utils/formatters";

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtV(value: number | null | undefined): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return formatIndianNumber(value, 2, { fallback: MISSING_VALUE_LABEL });
}

function fmtPct(value: number | null | undefined): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return formatPercent(value, 1);
}

function calcChange(curr: number | null | undefined, prev: number | null | undefined): number | null {
  if (curr == null || prev == null || prev === 0) return null;
  return ((curr - prev) / Math.abs(prev)) * 100;
}

function periodKey(value: string | null | undefined, index: number): string {
  return `${value ?? "period"}-${index}`;
}

// ── Types ─────────────────────────────────────────────────────────────────────

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

type RowDef = {
  key: string;
  label: string;
  getValue: (row: QuarterlyResult | BalanceSheet | CashFlow) => number | null | undefined;
  isPercent?: boolean;
};

// ── Anomaly detection ─────────────────────────────────────────────────────────

function detectAnomalies(quarterly: QuarterlyResult[] | null | undefined, balanceSheets: BalanceSheet[] | null | undefined): AnomalyFlag[] {
  const flags: AnomalyFlag[] = [];
  const qData = quarterly || [];
  const bsData = balanceSheets || [];

  if (qData.length >= 5) {
    const latest = qData[0];
    const prev = qData[4];
    if (latest && prev) {
      const revGrowth = prev.revenue ? (((latest.revenue ?? 0) - prev.revenue) / Math.abs(prev.revenue)) * 100 : null;
      if ((latest.cfo ?? null) !== null && (latest.netProfit ?? null) !== null && (latest.netProfit ?? 0) > 0) {
        const cfoPatRatio = (latest.cfo ?? 0) / (latest.netProfit ?? 1);
        if (cfoPatRatio < 0.5) {
          flags.push({ type: "CFO_PAT_DIVERGENCE", description: "CFO is less than 50% of reported PAT. Treat earnings quality cautiously.", severity: "WARNING", metric: "CFO/PAT", value: cfoPatRatio, threshold: 0.5 });
        }
      }
      if (revGrowth !== null && revGrowth < -10 && (latest.netProfit ?? 0) > (prev.netProfit ?? 0)) {
        flags.push({ type: "MARGIN_EROSION", description: "Revenue is contracting while profit holds up. Check whether margin expansion is sustainable.", severity: "WARNING", metric: "Revenue growth", value: revGrowth, threshold: -10 });
      }
    }
  }

  if (bsData.length >= 2) {
    const [latest, prev] = bsData;
    if (latest.borrowings && prev.borrowings && prev.borrowings > 0) {
      const debtGrowth = ((latest.borrowings - prev.borrowings) / prev.borrowings) * 100;
      if (debtGrowth > 50) {
        flags.push({ type: "DEBT_SPIKE", description: `Borrowings grew ${debtGrowth.toFixed(0)}% YoY. Verify whether the debt build supports productive assets.`, severity: "CRITICAL", metric: "Debt growth", value: debtGrowth, threshold: 50 });
      }
    }
  }

  return flags;
}

// ── The new FinancialTable component ─────────────────────────────────────────

const CHART_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

type FinancialTableProps<T extends QuarterlyResult | BalanceSheet | CashFlow> = {
  title: string;
  rows: RowDef[];
  data: T[];
  getPeriodLabel: (row: T) => string;
  getPeriodKey: (row: T, index: number) => string;
  unitNote?: string;
  viewMode?: "quarterly" | "annual";
  onViewModeChange?: (mode: "quarterly" | "annual") => void;
};

function FinancialTable<T extends QuarterlyResult | BalanceSheet | CashFlow>({
  title,
  rows,
  data,
  getPeriodLabel,
  getPeriodKey,
  unitNote = "₹ Cr",
  viewMode = "quarterly",
  onViewModeChange,
}: FinancialTableProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(() => new Set(rows.slice(0, 2).map((r) => r.key)));
  const [showPctChange, setShowPctChange] = useState(false);
  const [showChart, setShowChart] = useState(true);

  // Chronological order: oldest first (left), latest last (right)
  const chronoData = useMemo(() => [...data].reverse(), [data]);

  // Scroll to right on mount and when data changes
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      requestAnimationFrame(() => { el.scrollLeft = el.scrollWidth; });
    }
  }, [chronoData]);

  const toggleRow = useCallback((key: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated, #fff)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "var(--text-primary)",
  };

  // Build chart data from selected rows × chronoData
  const chartData = useMemo(() => {
    return chronoData.map((row) => {
      const entry: Record<string, string | number> = { period: getPeriodLabel(row as T) };
      rows.filter((r) => selectedRows.has(r.key)).forEach((r) => {
        const v = r.getValue(row as QuarterlyResult & BalanceSheet & CashFlow);
        if (v != null) entry[r.label] = v;
      });
      return entry;
    });
  }, [chronoData, rows, selectedRows, getPeriodLabel]);

  const selectedRowDefs = rows.filter((r) => selectedRows.has(r.key));
  const hasChartData = chartData.some((d) => Object.keys(d).length > 1);

  return (
    <div className="fin-card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <div className="flex items-center gap-4">
          <label className="fin-footer-toggle">
            <input
              type="checkbox"
              checked={showPctChange}
              onChange={(e) => setShowPctChange(e.target.checked)}
              className="fin-footer-cb"
            />
            <span>Show % change</span>
          </label>
          <button
            onClick={() => setShowChart(!showChart)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showChart
                ? 'border-amber-500/50 text-amber-500 bg-amber-500/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
            title={showChart ? 'Hide chart' : 'Show chart'}
          >
            <BarChart2 size={12} />
            {showChart ? 'Hide' : 'Show'}
          </button>
          <span className="fin-unit-note">{unitNote}</span>
          {onViewModeChange && (
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {(["quarterly", "annual"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                    viewMode === mode
                      ? "bg-background shadow-sm text-foreground border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      {showChart && hasChartData && (
        <div className="fin-chart-area">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 4, right: 16, left: 4, bottom: 0 }} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickFormatter={(v) => formatIndianNumber(v, 0, { fallback: "" })} width={60} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [fmtV(value as number)]} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
              <ReferenceLine y={0} stroke="var(--border)" />
              {selectedRowDefs.map((r, i) => (
                <Bar key={r.key} dataKey={r.label} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[3, 3, 0, 0]} opacity={0.9} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="fin-table-shell" ref={scrollRef}>
        <table className="fin-table">
          <thead>
            <tr>
              <th className="fin-th fin-th--param" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                <span>{title}</span>
              </th>
              {chronoData.map((row, idx) => (
                <th key={getPeriodKey(row as T, idx)} className="fin-th fin-th--period" style={idx === chronoData.length - 1 ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : undefined}>
                  {getPeriodLabel(row as T)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowDef, rowIdx) => {
              const isSelected = selectedRows.has(rowDef.key);
              const isLastRow = rowIdx === rows.length - 1;
              const values = chronoData.map((row) => rowDef.getValue(row as QuarterlyResult & BalanceSheet & CashFlow));
              return (
                <tr key={rowDef.key} className={`fin-tr${isSelected ? " fin-tr--selected" : ""}`}>
                  {/* Row label with checkbox */}
                  <td className="fin-td fin-td--param" style={isLastRow ? { borderBottom: 'none', borderBottomLeftRadius: '0.75rem' } : undefined}>
                    <label className="fin-row-label">
                      <input
                        type="checkbox"
                        className="fin-checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(rowDef.key)}
                        aria-label={`Select ${rowDef.label} for chart`}
                      />
                      <span className="fin-row-name">{rowDef.label}</span>
                    </label>
                  </td>
                  {/* Data cells */}
                  {values.map((val, idx) => {
                    const prevVal = idx > 0 ? values[idx - 1] : null;
                    const pctChange = showPctChange && !rowDef.isPercent ? calcChange(val, prevVal) : null;
                    const isLastCell = isLastRow && idx === values.length - 1;
                    return (
                      <td key={getPeriodKey(chronoData[idx] as T, idx)} className="fin-td fin-td--value" style={{ 
                        ...(isLastRow ? { borderBottom: 'none' } : {}),
                        ...(isLastCell ? { borderBottomRightRadius: '0.75rem' } : {})
                      }}>
                        <span className="fin-val">
                          {rowDef.isPercent ? fmtPct(val as number | null | undefined) : fmtV(val as number | null | undefined)}
                        </span>
                        {showPctChange && !rowDef.isPercent && pctChange != null && (
                          <span className={`fin-pct${pctChange >= 0 ? " fin-pct--pos" : " fin-pct--neg"}`}>
                            {pctChange >= 0 ? "▲" : "▼"}{Math.abs(pctChange).toFixed(1)}%
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Row definitions ───────────────────────────────────────────────────────────

const PL_ROWS: RowDef[] = [
  { key: "revenue",         label: "Revenue",          getValue: (r) => (r as QuarterlyResult).revenue },
  { key: "ebitda",          label: "EBITDA",            getValue: (r) => (r as QuarterlyResult).ebitda },
  { key: "operatingProfit", label: "Operating Profit",  getValue: (r) => (r as QuarterlyResult).operatingProfit },
  { key: "ebit",            label: "EBIT",              getValue: (r) => (r as QuarterlyResult).ebit },
  { key: "opm",             label: "OPM %",             getValue: (r) => { const q = r as QuarterlyResult; return q.revenue && q.operatingProfit != null ? (q.operatingProfit / q.revenue) * 100 : null; }, isPercent: true },
  { key: "interest",        label: "Interest",          getValue: (r) => (r as QuarterlyResult).interest },
  { key: "pbt",             label: "PBT",               getValue: (r) => (r as QuarterlyResult).pbt },
  { key: "tax",             label: "Tax",               getValue: (r) => (r as QuarterlyResult).tax },
  { key: "netProfit",       label: "Net Profit",        getValue: (r) => (r as QuarterlyResult).netProfit ?? (r as QuarterlyResult).pat },
  { key: "patMargin",       label: "PAT Margin %",      getValue: (r) => (r as QuarterlyResult).patMargin, isPercent: true },
  { key: "eps",             label: "EPS",               getValue: (r) => (r as QuarterlyResult).eps },
];

const BALANCE_ROWS: RowDef[] = [
  { key: "equityCapital",    label: "Equity Capital",    getValue: (r) => (r as BalanceSheet).equityCapital },
  { key: "reserves",         label: "Reserves",          getValue: (r) => (r as BalanceSheet).reserves },
  { key: "totalEquity",      label: "Total Equity",      getValue: (r) => (r as BalanceSheet).totalEquity },
  { key: "borrowings",       label: "Borrowings",        getValue: (r) => (r as BalanceSheet).borrowings ?? (r as BalanceSheet).totalDebt },
  { key: "tradeReceivables", label: "Trade Receivables", getValue: (r) => (r as BalanceSheet).tradeReceivables },
  { key: "cashEquivalents",  label: "Cash & Equiv.",     getValue: (r) => (r as BalanceSheet).cashEquivalents ?? (r as BalanceSheet).cash },
  { key: "totalAssets",      label: "Total Assets",      getValue: (r) => (r as BalanceSheet).totalAssets },
];

const CASH_ROWS: RowDef[] = [
  { key: "operating",  label: "Operating CF",  getValue: (r) => (r as CashFlow).cashFromOperating ?? (r as CashFlow).operatingCF },
  { key: "investing",  label: "Investing CF",  getValue: (r) => (r as CashFlow).cashFromInvesting ?? (r as CashFlow).investingCF },
  { key: "financing",  label: "Financing CF",  getValue: (r) => (r as CashFlow).cashFromFinancing ?? (r as CashFlow).financingCF },
  { key: "capex",      label: "Capex",         getValue: (r) => (r as CashFlow).capex },
  { key: "fcf",        label: "Free Cash Flow",getValue: (r) => (r as CashFlow).freeCashFlow ?? (r as CashFlow).freeCF },
];

// ── Main FinancialsSection ────────────────────────────────────────────────────

interface Props { symbol: string; }

export function FinancialsSection({ symbol }: Props) {
  const [isConsolidated, setIsConsolidated] = useState(true);
  const [plViewMode, setPlViewMode] = useState<"quarterly" | "annual">("annual");
  const [bsViewMode, setBsViewMode] = useState<"quarterly" | "annual">("annual");
  const [cfViewMode, setCfViewMode] = useState<"quarterly" | "annual">("annual");
  const [data, setData] = useState<FinancialsPayload | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const requestKey = `${symbol}-${isConsolidated ? "consolidated" : "standalone"}`;

  useEffect(() => {
    apiGet<FinancialsResponse>(`/api/stocks/${symbol}/financials`, { consolidated: isConsolidated })
      .then((payload) => {
        setData(payload as unknown as FinancialsPayload);
        setLoadedKey(requestKey);
      })
      .catch(() => { setData(null); setLoadedKey(requestKey); });
  }, [requestKey, symbol, isConsolidated]);

  const loading = loadedKey !== requestKey;

  const anomalies = useMemo(() => {
    if (!data) return [];
    return data.anomalies?.length ? data.anomalies : detectAnomalies(data.quarterly, data.balanceSheets);
  }, [data]);

  const statementRows = useMemo(() => {
    if (!data) return [];
    const source = plViewMode === "quarterly" ? data.quarterly : data.annual;
    return source;
  }, [data, plViewMode]);

  const statementMeta = useMemo(() => data?.meta ?? null, [data]);

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
        <CoverageNotice title="Financial statements unavailable" message="Financial history could not be loaded for this company view." />
      </section>
    );
  }

  return (
    <section id="financials" className="scroll-mt-28 space-y-6">
      {/* Anomaly banners */}
      {anomalies.length > 0 && (
        <div className="space-y-2">
          {anomalies.map((flag, i) => (
            <div key={`${flag.type}-${i}`} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${flag.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
              <AlertTriangle size={14} className={`mt-0.5 flex-shrink-0 ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-500"}`} />
              <div>
                <span className={`font-semibold ${flag.severity === "CRITICAL" ? "text-red-500" : "text-yellow-600"}`}>{flag.severity}: </span>
                <span style={{ color: "var(--text-secondary)" }}>{flag.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* P&L Table */}
      <FinancialTable
        title="Profit & Loss"
        rows={PL_ROWS}
        data={statementRows}
        viewMode={plViewMode}
        onViewModeChange={setPlViewMode}
        getPeriodLabel={(row) => plViewMode === "quarterly"
          ? formatPeriodLabel(row.periodEnd ?? row.quarter)
          : (row.quarter ?? formatPeriodLabel(row.periodEnd, { annualAlias: true }))}
        getPeriodKey={(row, idx) => periodKey(row.periodEnd ?? row.quarter, idx)}
      />

      {/* Balance Sheet Table */}
      <FinancialTable
        title="Balance Sheet"
        rows={BALANCE_ROWS}
        data={data.balanceSheets}
        viewMode={bsViewMode}
        onViewModeChange={setBsViewMode}
        getPeriodLabel={(row) => formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true })}
        getPeriodKey={(row, idx) => periodKey(row.periodEndDate ?? row.periodEnd, idx)}
      />

      {/* Cash Flow Table */}
      <FinancialTable
        title="Cash Flow"
        rows={CASH_ROWS}
        data={data.cashFlows}
        viewMode={cfViewMode}
        onViewModeChange={setCfViewMode}
        getPeriodLabel={(row) => formatPeriodLabel(row.periodEndDate ?? row.periodEnd, { annualAlias: true })}
        getPeriodKey={(row, idx) => periodKey(row.periodEndDate ?? row.periodEnd, idx)}
      />
    </section>
  );
}
