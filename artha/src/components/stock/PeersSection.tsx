"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { ComputedRatios, PeerComparison } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { buildDataMeta, completenessScore, dedupeByKey, getCoverage } from "@/lib/stock/presentation";
import { CoverageNotice, DataMetaInline, StickyMetricTable, type StickyMetricTableRow } from "@/components/stock/StockUiPrimitives";
import { formatMoneyInCrores, formatPercent, formatRatio, MISSING_VALUE_LABEL } from "@/lib/utils/formatters";

const METRICS = [
  { key: "peTtm", label: "P/E (TTM)", type: "ratio" as const },
  { key: "pb", label: "P/B", type: "ratio" as const },
  { key: "roce", label: "ROCE", type: "percent" as const },
  { key: "roe", label: "ROE", type: "percent" as const },
  { key: "patMargin", label: "PAT Margin", type: "percent" as const },
  { key: "revenueGrowth1y", label: "Rev. Growth 1Y", type: "percent" as const },
  { key: "debtEquity", label: "D/E", type: "ratio" as const },
  { key: "dividendYield", label: "Div. Yield", type: "percent" as const },
];

type CorrelationPeriod = "1y" | "3y" | "5y";

type PeerCorrelationResponse = {
  period: CorrelationPeriod;
  summary: {
    closestPeer: { symbol: string; name: string; correlation: number | null } | null;
    diversifier: { symbol: string; name: string; correlation: number | null } | null;
    averageCorrelation: number | null;
  };
  peers: Array<PeerComparison & { correlation: number | null; overlapDays: number }>;
  matrixSymbols: string[];
  matrix: Record<string, Record<string, number | null>>;
};

type PeersPayload = {
  peers: PeerComparison[];
  meta?: DataMeta;
};

type RankedPeer = PeerComparison & {
  completeness: number;
  marketCapGap: number;
  displaySymbol: string;
};

function formatMetricValue(value: number | null | undefined, type: "ratio" | "percent"): string {
  if (value == null) return MISSING_VALUE_LABEL;
  return type === "percent" ? formatPercent(value, 2) : formatRatio(value, 2);
}

function corrColor(value: number | null | undefined) {
  if (value == null) return "var(--surface-elevated)";
  if (value >= 0.8) return "rgba(245, 158, 11, 0.20)";
  if (value >= 0.6) return "rgba(245, 158, 11, 0.14)";
  if (value >= 0.4) return "rgba(59, 130, 246, 0.14)";
  if (value >= 0.2) return "rgba(16, 185, 129, 0.14)";
  return "rgba(16, 185, 129, 0.20)";
}

function corrLabel(value: number | null | undefined) {
  if (value == null) return "Insufficient overlap";
  if (value >= 0.8) return "Moves very closely";
  if (value >= 0.6) return "Tracks fairly closely";
  if (value >= 0.4) return "Moderately related";
  if (value >= 0.2) return "Offers some diversification";
  return "Diversifies well";
}

function DiffBadge({ val, base }: { val: number | null | undefined; base: number | null | undefined }) {
  if (val == null || base == null || base === 0) return <span className="text-muted-foreground text-xs">•</span>;
  const diff = ((val - base) / Math.abs(base)) * 100;
  if (diff > 5) return <TrendingUp size={11} className="text-green-500" />;
  if (diff < -5) return <TrendingDown size={11} className="text-red-500" />;
  return <Minus size={11} className="text-muted-foreground" />;
}

interface Props {
  symbol: string;
  currentRatios: Partial<ComputedRatios> | null;
}

export function PeersSection({ symbol, currentRatios }: Props) {
  const [peers, setPeers] = useState<PeerComparison[]>([]);
  const [peerMeta, setPeerMeta] = useState<DataMeta | null>(null);
  const [selfRatios, setSelfRatios] = useState<Partial<ComputedRatios> | null>(currentRatios);
  const [chartMetric, setChartMetric] = useState<string>("peTtm");
  const [correlationPeriod, setCorrelationPeriod] = useState<CorrelationPeriod>("1y");
  const [correlationData, setCorrelationData] = useState<PeerCorrelationResponse | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showIncompletePeers, setShowIncompletePeers] = useState(false);
  const [loadedSymbol, setLoadedSymbol] = useState<string | null>(null);
  const [correlationKey, setCorrelationKey] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/stocks/${symbol}/peers`).then((response) => response.json()),
      fetch(`/api/stocks/${symbol}/analytics`).then((response) => response.json()),
    ])
      .then(([peersPayload, analyticsPayload]: [PeersPayload, { ratios?: Partial<ComputedRatios> }]) => {
        setPeers(peersPayload.peers ?? []);
        setPeerMeta(peersPayload.meta ?? null);
        setSelfRatios({
          ...currentRatios,
          ...(analyticsPayload?.ratios ?? {}),
        });
        setLoadedSymbol(symbol);
      })
      .catch(() => {
        setPeers([]);
        setPeerMeta(null);
        setSelfRatios(currentRatios);
        setLoadedSymbol(symbol);
      });
  }, [symbol, currentRatios]);

  useEffect(() => {
    const requestKey = `${symbol}-${correlationPeriod}`;
    fetch(`/api/stocks/${symbol}/peer-correlations?period=${correlationPeriod}`)
      .then((response) => response.json())
      .then((payload) => {
        setCorrelationData(payload);
        setCorrelationKey(requestKey);
      })
      .catch(() => {
        setCorrelationData(null);
        setCorrelationKey(requestKey);
      });
  }, [symbol, correlationPeriod]);

  const loading = loadedSymbol !== symbol;
  const correlationLoading = correlationKey !== `${symbol}-${correlationPeriod}`;
  const displayRatios = selfRatios ?? currentRatios;
  const selectedMetric = METRICS.find((metric) => metric.key === chartMetric) ?? METRICS[0];
  const subjectMarketCap = displayRatios?.marketCapCr ?? null;

  const rankedPeers = useMemo<RankedPeer[]>(() => {
    const deduped = dedupeByKey(peers, (peer) => `${(peer.name ?? "").trim().toLowerCase()}::${(peer.nseSymbol ?? peer.symbol ?? "").trim().toUpperCase()}`);
    return deduped
      .filter((peer) => (peer.nseSymbol ?? peer.symbol ?? "").toUpperCase() !== symbol)
      .map((peer) => {
        const completeness = completenessScore([
          peer.peTtm,
          peer.pb,
          peer.roce,
          peer.roe,
          peer.patMargin,
          peer.revenueGrowth1y,
          peer.debtEquity,
          peer.dividendYield,
          peer.marketCapCr,
        ]);

        const marketCapGap = subjectMarketCap && peer.marketCapCr
          ? Math.abs(((peer.marketCapCr - subjectMarketCap) / subjectMarketCap) * 100)
          : Number.POSITIVE_INFINITY;

        return {
          ...peer,
          displaySymbol: peer.nseSymbol ?? peer.symbol,
          completeness,
          marketCapGap,
        };
      })
      .sort((left, right) => {
        if (right.completeness !== left.completeness) return right.completeness - left.completeness;
        return left.marketCapGap - right.marketCapGap;
      });
  }, [peers, subjectMarketCap, symbol]);

  const completePeers = rankedPeers.filter((peer) => peer.completeness >= 0.625);
  const incompletePeers = rankedPeers.filter((peer) => peer.completeness < 0.625);
  const visiblePeers = showIncompletePeers ? [...completePeers, ...incompletePeers] : completePeers;

  const effectiveMeta = peerMeta ?? buildDataMeta({
    coverage: getCoverage([visiblePeers.length ? visiblePeers : null]),
    note: "Only peers with comparable metric coverage are shown first.",
  });

  const chartData = [
    ...(displayRatios ? [{
      name: symbol,
      value: (displayRatios as Record<string, number | null>)[chartMetric] ?? null,
      isSelf: true,
    }] : []),
    ...completePeers.slice(0, 5).map((peer) => ({
      name: peer.displaySymbol,
      value: (peer as unknown as Record<string, number | null>)[chartMetric] ?? null,
      isSelf: false,
    })),
  ];

  const tableRows: StickyMetricTableRow[] = [
    ...(displayRatios ? [{
      key: `${symbol}-self`,
      label: (
        <div>
          <div className="font-semibold" style={{ color: "var(--accent-brand)" }}>{symbol} ★</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>Current company</div>
        </div>
      ),
      values: Object.fromEntries([
        ...METRICS.map((metric) => {
          const value = (displayRatios as Record<string, number | null>)[metric.key] ?? null;
          return [metric.key, <span className="font-mono metric-mono" key={metric.key}>{formatMetricValue(value, metric.type)}</span>];
        }),
        ["marketCapCr", <span className="font-mono metric-mono" key="marketCapCr">{formatMoneyInCrores((displayRatios as Record<string, number | null>).marketCapCr)}</span>],
      ]),
      rowClassName: "bg-muted/5",
    }] : []),
    ...visiblePeers.map((peer) => ({
      key: peer.displaySymbol,
      label: (
        <div className="min-w-0">
          <Link href={`/stocks/${peer.displaySymbol}`} className="font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
            {peer.displaySymbol}
          </Link>
          <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{peer.name}</div>
        </div>
      ),
      values: Object.fromEntries([
        ...METRICS.map((metric) => {
          const value = (peer as unknown as Record<string, number | null>)[metric.key] ?? null;
          const baseValue = displayRatios ? (displayRatios as Record<string, number | null>)[metric.key] ?? null : null;
          return [
            metric.key,
            <div key={`${peer.displaySymbol}-${metric.key}`} className="flex items-center justify-end gap-1">
              <span className="font-mono metric-mono">{formatMetricValue(value, metric.type)}</span>
              <DiffBadge val={value} base={baseValue} />
            </div>,
          ];
        }),
        ["marketCapCr", <span className="font-mono metric-mono" key={`${peer.displaySymbol}-marketCap`}>{formatMoneyInCrores(peer.marketCapCr)}</span>],
      ]),
    })),
  ];

  const tableColumns = [
    ...METRICS.map((metric) => ({ key: metric.key, label: metric.label })),
    { key: "marketCapCr", label: "Mkt Cap" },
  ];

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
  };

  const rankedCorrelations = [...(correlationData?.peers ?? [])]
    .filter((peer) => peer.correlation != null)
    .sort((left, right) => (right.correlation ?? -1) - (left.correlation ?? -1));

  if (loading) {
    return (
      <section id="peers" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  if (rankedPeers.length === 0) {
    return (
      <section id="peers" className="scroll-mt-28">
        <CoverageNotice
          meta={effectiveMeta}
          title="Peer comparison unavailable"
          message="No comparable peer set with enough market data is available for this company yet."
        />
      </section>
    );
  }

  return (
    <section id="peers" className="scroll-mt-28 space-y-4">
      <div className="p-6 rounded-xl border space-y-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Peer Comparison</h2>
            <div className="mt-2">
              <DataMetaInline meta={effectiveMeta} />
            </div>
          </div>
          <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border overflow-x-auto">
            {METRICS.slice(0, 5).map((metric) => (
              <button
                key={metric.key}
                onClick={() => setChartMetric(metric.key)}
                className={`flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${chartMetric === metric.key ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
          <div className="rounded-xl border p-4" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
            <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Top comparable peers by {selectedMetric.label}
            </div>
            <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
              Showing the current company plus the five most complete peers first.
            </div>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }} width={44} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value: unknown) => [formatMetricValue(value as number, selectedMetric.type), selectedMetric.label]}
                  />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]} fill="var(--accent-brand)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
            <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Peer shortlist</div>
            <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
              Complete peers are sorted ahead of sparse rows so the table is decision-ready at first glance.
            </div>
            <div className="mt-4 space-y-3">
              {completePeers.slice(0, 3).map((peer) => (
                <div key={peer.displaySymbol} className="rounded-lg border px-3 py-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Link href={`/stocks/${peer.displaySymbol}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--text-primary)" }}>
                        {peer.displaySymbol}
                      </Link>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{peer.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold font-mono metric-mono" style={{ color: "var(--text-primary)" }}>
                        {Math.round(peer.completeness * 100)}%
                      </div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>metric coverage</div>
                    </div>
                  </div>
                </div>
              ))}
              {completePeers.length === 0 ? (
                <CoverageNotice
                  meta={effectiveMeta}
                  title="No complete peers yet"
                  message="Comparable names were found, but none clear the completeness threshold for a first-glance table."
                  action={
                    incompletePeers.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setShowIncompletePeers(true)}
                        className="text-xs font-medium"
                        style={{ color: "var(--accent-brand)" }}
                      >
                        Show incomplete peers
                      </button>
                    ) : null
                  }
                />
              ) : null}
            </div>
          </div>
        </div>

        {incompletePeers.length > 0 ? (
          <CoverageNotice
            meta={effectiveMeta}
            title={showIncompletePeers ? "Incomplete peers shown" : "Incomplete peers hidden"}
            message={showIncompletePeers
              ? `${incompletePeers.length} lower-coverage rows are visible below for completeness, but they should not drive a first decision.`
              : `${incompletePeers.length} lower-coverage peer rows are hidden by default so the compare table stays decision-ready.`}
            action={
              <button
                type="button"
                onClick={() => setShowIncompletePeers((value) => !value)}
                className="text-xs font-medium"
                style={{ color: "var(--accent-brand)" }}
              >
                {showIncompletePeers ? "Hide incomplete peers" : "Show incomplete peers"}
              </button>
            }
          />
        ) : null}

        <StickyMetricTable
          ariaLabel="Peer comparison table"
          columns={tableColumns}
          rows={tableRows}
        />

        <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Peer Price Correlation</h3>
              <p className="mt-1 text-xs max-w-2xl" style={{ color: "var(--text-muted)" }}>
                Uses adjusted daily returns over overlapping trading sessions. Higher values mean the stocks tend to move together; lower values are usually better for diversification.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
                {(["1y", "3y", "5y"] as CorrelationPeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setCorrelationPeriod(period)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${correlationPeriod === period ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {period.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowMatrix((value) => !value)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--background)" }}
              >
                {showMatrix ? "Hide heatmap" : "View heatmap"}
              </button>
            </div>
          </div>

          {correlationLoading ? (
            <div className="mt-5 flex items-center justify-center h-36 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
              <div className="animate-spin w-6 h-6 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
            </div>
          ) : correlationData && rankedCorrelations.length > 0 ? (
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    label: "Moves Most Like",
                    symbol: correlationData.summary.closestPeer?.symbol ?? MISSING_VALUE_LABEL,
                    detail: correlationData.summary.closestPeer?.correlation != null
                      ? `${correlationData.summary.closestPeer.correlation.toFixed(2)} correlation`
                      : "No signal",
                    tone: corrColor(correlationData.summary.closestPeer?.correlation),
                  },
                  {
                    label: "Best Diversifier",
                    symbol: correlationData.summary.diversifier?.symbol ?? MISSING_VALUE_LABEL,
                    detail: correlationData.summary.diversifier?.correlation != null
                      ? `${correlationData.summary.diversifier.correlation.toFixed(2)} correlation`
                      : "No signal",
                    tone: corrColor(correlationData.summary.diversifier?.correlation),
                  },
                  {
                    label: "Peer Basket Average",
                    symbol: correlationData.summary.averageCorrelation != null
                      ? correlationData.summary.averageCorrelation.toFixed(2)
                      : MISSING_VALUE_LABEL,
                    detail: correlationData.summary.averageCorrelation != null
                      ? corrLabel(correlationData.summary.averageCorrelation)
                      : "No signal",
                    tone: corrColor(correlationData.summary.averageCorrelation),
                  },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: card.tone }}>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>{card.label}</div>
                    <div className="mt-2 text-lg font-semibold font-mono metric-mono" style={{ color: "var(--text-primary)" }}>{card.symbol}</div>
                    <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>{card.detail}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {rankedCorrelations.map((peer) => {
                  const peerSymbol = peer.nseSymbol ?? peer.symbol;
                  const correlation = peer.correlation ?? 0;
                  const fillWidth = `${Math.max(10, ((correlation + 1) / 2) * 100)}%`;
                  return (
                    <div key={peerSymbol} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/stocks/${peerSymbol}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--text-primary)" }}>
                              {peerSymbol}
                            </Link>
                            <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: corrColor(peer.correlation), color: "var(--text-secondary)" }}>
                              {corrLabel(peer.correlation)}
                            </span>
                          </div>
                          <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            {peer.name} · {peer.overlapDays} overlapping sessions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold font-mono metric-mono" style={{ color: "var(--text-primary)" }}>
                            {peer.correlation?.toFixed(2)}
                          </div>
                          <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>Correlation</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: fillWidth,
                            background: "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(245,158,11,0.95) 100%)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {showMatrix && correlationData.matrixSymbols.length > 1 && (
                <div className="rounded-xl border p-4 overflow-x-auto" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Correlation heatmap</div>
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr>
                        <th className="p-2 text-left" style={{ color: "var(--text-muted)" }}>Ticker</th>
                        {correlationData.matrixSymbols.map((col) => (
                          <th key={col} className="p-2 text-center font-medium" style={{ color: "var(--text-muted)" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.matrixSymbols.map((row) => (
                        <tr key={row}>
                          <td className="p-2 font-medium" style={{ color: "var(--text-primary)" }}>{row}</td>
                          {correlationData.matrixSymbols.map((col) => {
                            const value = correlationData.matrix[row]?.[col] ?? null;
                            return (
                              <td key={`${row}-${col}`} className="p-2">
                                <div
                                  className="mx-auto flex h-9 w-12 items-center justify-center rounded-lg font-mono metric-mono"
                                  style={{
                                    background: corrColor(value),
                                    color: "var(--text-primary)",
                                  }}
                                >
                                  {value != null ? value.toFixed(2) : MISSING_VALUE_LABEL}
                                </div>
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
          ) : (
            <div className="mt-5 rounded-xl border px-4 py-6 text-sm" style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--text-muted)" }}>
              Not enough overlapping adjusted price history to compute a reliable peer-correlation view yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
