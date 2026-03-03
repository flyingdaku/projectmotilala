"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import type { DailyPrice, CorporateAction } from "@/lib/data/types";

const RANGES = ["1m", "3m", "6m", "1y", "3y", "5y"] as const;
type Range = typeof RANGES[number];

const CA_COLORS: Record<string, string> = {
  DIVIDEND: "#10B981",
  SPLIT: "#3B82F6",
  BONUS: "#8B5CF6",
  BUYBACK: "#F59E0B",
  RIGHTS: "#EF4444",
};

const CA_ICONS: Record<string, string> = {
  DIVIDEND: "💰",
  SPLIT: "✂️",
  BONUS: "🎁",
  BUYBACK: "🔄",
  RIGHTS: "📋",
};

interface Props {
  symbol: string;
  currentPrice: number | null;
  priceChange?: number | null;
}

export function ChartSection({ symbol, currentPrice, priceChange }: Props) {
  const [range, setRange] = useState<Range>("1y");
  const [prices, setPrices] = useState<DailyPrice[]>([]);
  const [corpActions, setCorpActions] = useState<CorporateAction[]>([]);
  const [showVolume, setShowVolume] = useState(true);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [benchmark, setBenchmark] = useState<DailyPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const apiRange = range === "1m" ? "1y" : range === "3m" ? "1y" : range;
    fetch(`/api/stocks/${symbol}/chart?range=${apiRange}`)
      .then((r) => r.json())
      .then((d) => {
        setPrices(d.prices ?? []);
        setCorpActions(d.corpActions ?? []);
        setBenchmark(d.benchmark ?? []);
      })
      .finally(() => setLoading(false));
  }, [symbol, range]);

  const cutoff = useMemo(() => {
    const days = range === "1m" ? 30 : range === "3m" ? 90 : range === "6m" ? 180 :
      range === "1y" ? 365 : range === "3y" ? 1095 : 1825;
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  }, [range]);

  const chartData = useMemo(() => {
    const filtered = [...prices]
      .filter((p) => p.date >= cutoff)
      .reverse();
    if (filtered.length === 0) return [];

    const base = filtered[0].close;
    const bmMap = new Map(benchmark.map((b) => [b.date, b.close]));
    const bmBase = bmMap.get(filtered[0].date) ?? null;

    return filtered.map((p) => ({
      date: p.date,
      close: p.close,
      volume: p.volume,
      stockPct: ((p.close - base) / base) * 100,
      bmPct: bmBase !== null && bmMap.has(p.date)
        ? (((bmMap.get(p.date)! - bmBase) / bmBase) * 100)
        : null,
    }));
  }, [prices, benchmark, cutoff]);

  const caSet = useMemo(() => {
    const m = new Map<string, CorporateAction>();
    corpActions
      .filter((ca) => ca.exDate >= cutoff)
      .forEach((ca) => m.set(ca.exDate, ca));
    return m;
  }, [corpActions, cutoff]);

  const isPositive = priceChange !== null && priceChange !== undefined ? priceChange >= 0 : true;
  const strokeColor = isPositive ? "#10B981" : "#EF4444";

  const formatDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: range === "5y" || range === "3y" ? "2-digit" : undefined });
  };

  const CustomDot = (props: { cx?: number; cy?: number; payload?: { date: string } }) => {
    const { cx, cy, payload } = props;
    if (!payload || !caSet.has(payload.date)) return null;
    const ca = caSet.get(payload.date)!;
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill={CA_COLORS[ca.actionType] ?? "#F59E0B"} stroke="var(--background)" strokeWidth={1.5} />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{value: unknown; name?: string; color?: string}>; label?: string }) => {
    if (!active || !payload?.length) return null;
    const ca = caSet.get(label ?? "");
    return (
      <div className="rounded-lg border p-3 text-xs space-y-1 shadow-lg"
        style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", minWidth: 160 }}>
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{formatDate(label ?? "")}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex justify-between gap-4">
            <span style={{ color: "var(--text-muted)" }}>{p.name}</span>
            <span className="font-mono font-medium" style={{ color: p.color }}>
              {typeof p.value === "number" && p.name?.includes("%") ? `${p.value >= 0 ? "+" : ""}${p.value.toFixed(2)}%` : typeof p.value === "number" ? `₹${p.value.toLocaleString("en-IN")}` : String(p.value)}
            </span>
          </div>
        ))}
        {ca && (
          <div className="pt-1 border-t mt-1" style={{ borderColor: "var(--border)" }}>
            <span style={{ color: CA_COLORS[ca.actionType] ?? "#F59E0B" }}>
              {CA_ICONS[ca.actionType] ?? "📌"} {ca.actionType}
              {ca.dividendAmount ? ` ₹${ca.dividendAmount}` : ""}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="chart" className="scroll-mt-28 space-y-4">
      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Price Chart</h2>
            {currentPrice !== null && currentPrice !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono" style={{ color: "var(--text-primary)" }}>
                  ₹{currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {priceChange !== null && priceChange !== undefined && (
                  <span className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isPositive ? "+" : ""}{priceChange.toFixed(2)}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Range selector */}
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {RANGES.map((r) => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${range === r ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
                  {r.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowVolume((v) => !v)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition-colors ${showVolume ? "border-[var(--accent-brand)] text-[var(--accent-brand)] bg-[var(--accent-subtle)]" : "border-[var(--border)] text-[var(--text-muted)]"}`}>
              <BarChart2 size={12} /> Volume
            </button>

            {benchmark.length > 0 && (
              <button
                onClick={() => setShowBenchmark((v) => !v)}
                className={`px-2 py-1 rounded-md text-xs font-medium border transition-colors ${showBenchmark ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-[var(--border)] text-[var(--text-muted)]"}`}>
                vs Nifty 50
              </button>
            )}
          </div>
        </div>

        {/* Chart */}
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
            No price data available
          </div>
        ) : showBenchmark ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={formatDate}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }} minTickGap={60} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  tickFormatter={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`} width={52} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="stockPct" name={`${symbol} %`} stroke={strokeColor}
                  strokeWidth={2} dot={<CustomDot />} activeDot={{ r: 4 }} />
                {showBenchmark && (
                  <Line type="monotone" dataKey="bmPct" name="Nifty 50 %" stroke="#3B82F6"
                    strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className={showVolume ? "h-56" : "h-80"}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={formatDate}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }} minTickGap={60} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`} width={52} domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="close" name="Price" stroke={strokeColor}
                  strokeWidth={2} dot={<CustomDot />} activeDot={{ r: 4 }} fill="url(#priceGrad)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Volume Chart */}
        {showVolume && !showBenchmark && chartData.length > 0 && (
          <div className="h-20 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                  tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1000).toFixed(0)}k`} width={52} />
                <Bar dataKey="volume" name="Volume" fill={strokeColor} opacity={0.4} radius={[1, 1, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Corporate Actions Legend */}
        {caSet.size > 0 && (
          <div className="mt-3 pt-3 border-t flex flex-wrap gap-3" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Events on chart:</span>
            {Array.from(new Set(corpActions.filter(ca => ca.exDate >= cutoff).map(ca => ca.actionType))).map((type) => (
              <span key={type} className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: CA_COLORS[type] ?? "#F59E0B" }} />
                {CA_ICONS[type] ?? "📌"} {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
