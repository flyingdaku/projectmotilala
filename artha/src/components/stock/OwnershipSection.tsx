"use client";

import { useState, useEffect, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import { AlertTriangle, Shield, Users } from "lucide-react";
import type { ShareholdingPattern, GovernanceScore } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { buildDataMeta, getCoverage } from "@/lib/stock/presentation";
import { CoverageNotice, DataMetaInline } from "@/components/stock/StockUiPrimitives";
import { formatPercent, formatSignedChange, MISSING_VALUE_LABEL } from "@/lib/utils/formatters";

const SH_COLORS = {
  Promoter: "#F59E0B",
  FII: "#3B82F6",
  DII: "#10B981",
  MF: "#8B5CF6",
  Public: "#6B7280",
};

interface Props {
  symbol: string;
}

export function OwnershipSection({ symbol }: Props) {
  const [data, setData] = useState<{
    shareholding: ShareholdingPattern[];
    governance: GovernanceScore | null;
    meta?: DataMeta;
  } | null>(null);
  const [loadedSymbol, setLoadedSymbol] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"trend" | "donut">("trend");

  useEffect(() => {
    fetch(`/api/stocks/${symbol}/ownership`)
      .then((r) => r.json())
      .then((payload) => {
        setData(payload);
        setLoadedSymbol(symbol);
      })
      .catch(() => {
        setData(null);
        setLoadedSymbol(symbol);
      });
  }, [symbol]);

  const trendData = useMemo(() => {
    if (!data) return [];
    return [...data.shareholding].reverse().map((s) => ({
      quarter: (s.quarterEnd ?? s.quarter ?? "").slice(0, 7),
      Promoter: s.promoterPct ?? 0,
      FII: s.fiiPct ?? 0,
      DII: s.diiPct ?? 0,
      MF: s.mfPct ?? 0,
      Public: s.publicPct ?? 0,
    }));
  }, [data]);

  const latestDonut = useMemo(() => {
    if (!data || data.shareholding.length === 0) return [];
    const s = data.shareholding[0];
    return [
      { name: "Promoter", value: s.promoterPct ?? 0, color: SH_COLORS.Promoter },
      { name: "FII", value: s.fiiPct ?? 0, color: SH_COLORS.FII },
      { name: "DII", value: s.diiPct ?? 0, color: SH_COLORS.DII },
      { name: "MF", value: s.mfPct ?? 0, color: SH_COLORS.MF },
      { name: "Public", value: s.publicPct ?? 0, color: SH_COLORS.Public },
    ].filter((d) => d.value > 0);
  }, [data]);

  const pledgeHistory = useMemo(() => {
    if (!data) return [];
    return [...data.shareholding].reverse().map((s) => ({
      quarter: (s.quarterEnd ?? s.quarter ?? "").slice(0, 7),
      "Promoter %": s.promoterPct ?? 0,
      "Pledge %": s.promoterPledgePct ?? 0,
    }));
  }, [data]);

  const latestSh = data?.shareholding?.[0];
  const pledgePct = latestSh?.promoterPledgePct ?? 0;
  
  // Calculate QoQ changes for institutional holdings
  const promoterQoQ = data && data.shareholding.length >= 2
    ? (data.shareholding[0].promoterChangeQoq ?? ((data.shareholding[0].promoterPct ?? 0) - (data.shareholding[1].promoterPct ?? 0)))
    : null;
  const fiiQoQ = data && data.shareholding.length >= 2
    ? (data.shareholding[0].fiiChangeQoq ?? ((data.shareholding[0].fiiPct ?? 0) - (data.shareholding[1].fiiPct ?? 0)))
    : null;
  const diiQoQ = data && data.shareholding.length >= 2
    ? (data.shareholding[0].diiChangeQoq ?? ((data.shareholding[0].diiPct ?? 0) - (data.shareholding[1].diiPct ?? 0)))
    : null;
  const mfQoQ = data && data.shareholding.length >= 2
    ? (data.shareholding[0].mfPct ?? 0) - (data.shareholding[1].mfPct ?? 0)
    : null;
  
  // Identify significant changes (>1% absolute change)
  const significantChanges = [
    { label: "Promoter", change: promoterQoQ, color: SH_COLORS.Promoter },
    { label: "FII", change: fiiQoQ, color: SH_COLORS.FII },
    { label: "DII", change: diiQoQ, color: SH_COLORS.DII },
    { label: "MF", change: mfQoQ, color: SH_COLORS.MF },
  ].filter(item => item.change !== null && Math.abs(item.change) >= 1.0);

  const tooltipStyle = {
    backgroundColor: "var(--surface-elevated)",
    borderColor: "var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
  };

  const axisStyle = { fontSize: 11, fill: "var(--text-muted)" };
  const meta = data?.meta ?? buildDataMeta({
    asOfCandidates: [data?.shareholding?.[0]?.quarterEnd, data?.shareholding?.[0]?.quarter],
    coverage: getCoverage([
      data?.shareholding?.length ? data.shareholding : null,
      data?.governance,
    ]),
    note: "Ownership updates are quarterly.",
  });

  if (loadedSymbol !== symbol) {
    return (
      <section id="ownership" className="scroll-mt-28">
        <div className="p-6 rounded-xl border flex items-center justify-center h-64"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section id="ownership" className="scroll-mt-28 space-y-4">
      {/* Significant Holdings Changes Alert */}
      {significantChanges.length > 0 && (
        <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-sm">
          <Users size={14} className="mt-0.5 flex-shrink-0 text-blue-400" />
          <div style={{ color: "var(--text-secondary)" }}>
            <strong>Significant Institutional Changes:</strong>
            <div className="flex flex-wrap gap-3 mt-1">
              {significantChanges.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1">
                  <span style={{ color: item.color }}>{item.label}</span>
                  <span className={item.change! > 0 ? "text-green-500" : "text-red-500"}>
                    {item.change! > 0 ? "+" : ""}{item.change!.toFixed(2)}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pledge Warning */}
      {pledgePct > 10 && (
        <div className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${pledgePct > 30 ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
          <AlertTriangle size={14} className={`mt-0.5 flex-shrink-0 ${pledgePct > 30 ? "text-red-400" : "text-yellow-400"}`} />
          <span style={{ color: "var(--text-secondary)" }}>
            <strong>{pledgePct.toFixed(1)}%</strong> of promoter holding is pledged
            {pledgePct > 30 ? " — high risk, monitor closely" : " — moderate concern"}.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Shareholding Pattern</h2>
              <div className="mt-2">
                <DataMetaInline meta={meta} />
              </div>
            </div>
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {(["trend", "donut"] as const).map((v) => (
                <button key={v} onClick={() => setActiveView(v)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${activeView === v ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {activeView === "trend" ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={axisStyle} minTickGap={40} />
                  <YAxis axisLine={false} tickLine={false} tick={axisStyle} tickFormatter={(v) => `${v}%`} width={40} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${(v as number).toFixed(2)}%`]} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                  <Area type="monotone" dataKey="Promoter" stackId="1" stroke={SH_COLORS.Promoter} fill={SH_COLORS.Promoter} fillOpacity={0.7} />
                  <Area type="monotone" dataKey="FII" stackId="1" stroke={SH_COLORS.FII} fill={SH_COLORS.FII} fillOpacity={0.7} />
                  <Area type="monotone" dataKey="DII" stackId="1" stroke={SH_COLORS.DII} fill={SH_COLORS.DII} fillOpacity={0.7} />
                  <Area type="monotone" dataKey="MF" stackId="1" stroke={SH_COLORS.MF} fill={SH_COLORS.MF} fillOpacity={0.7} />
                  <Area type="monotone" dataKey="Public" stackId="1" stroke={SH_COLORS.Public} fill={SH_COLORS.Public} fillOpacity={0.7} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center">
              <div className="w-48 h-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={latestDonut} cx="50%" cy="50%" innerRadius={52} outerRadius={76}
                      paddingAngle={2} dataKey="value">
                      {latestDonut.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${(v as number).toFixed(2)}%`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex-1 space-y-2 pl-4">
                {latestDonut.map((d) => (
                  <li key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                      <span style={{ color: "var(--text-secondary)" }}>{d.name}</span>
                    </div>
                    <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>{d.value.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* QoQ Δ + Pledge */}
        <div className="space-y-4">
          {/* QoQ Changes */}
          <div className="p-5 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Users size={14} style={{ color: "var(--accent-brand)" }} />
              QoQ Change
            </h3>
            <div className="space-y-3">
              {[
                { label: "Promoter", val: promoterQoQ, current: latestSh?.promoterPct },
                { label: "FII", val: fiiQoQ, current: latestSh?.fiiPct },
                { label: "DII", val: diiQoQ, current: latestSh?.diiPct },
                { label: "Public", val: data && data.shareholding.length >= 2 ? (data.shareholding[0].publicPct ?? 0) - (data.shareholding[1].publicPct ?? 0) : null, current: latestSh?.publicPct },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium metric-mono" style={{ color: "var(--text-primary)" }}>
                      {item.current != null ? formatPercent(item.current, 2) : MISSING_VALUE_LABEL}
                    </span>
                    {item.val !== null && item.val !== undefined && (
                      <span className={`text-xs font-mono font-semibold metric-mono ${item.val > 0 ? "text-green-500" : item.val < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                        {item.val > 0 ? "▲" : item.val < 0 ? "▼" : "•"}
                        {formatSignedChange(item.val, 2, "")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pledge Tracker */}
          <div className="p-5 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Shield size={14} style={{ color: pledgePct > 20 ? "#EF4444" : "var(--accent-brand)" }} />
              Pledge Tracker
            </h3>
            {pledgeHistory.length > 0 ? (
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pledgeHistory} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "var(--text-muted)" }} minTickGap={30} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "var(--text-muted)" }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${(v as number).toFixed(2)}%`]} />
                    <Bar dataKey="Pledge %" fill={pledgePct > 20 ? "#EF4444" : "#F59E0B"} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <CoverageNotice meta={meta} title="Pledge history unavailable" message="Promoter pledge trend is hidden until the underlying shareholding dataset provides a usable history." />
            )}
            <div className="mt-2 text-center">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Current Pledge: </span>
              <span className={`text-sm font-bold font-mono metric-mono ${pledgePct > 20 ? "text-red-500" : pledgePct > 5 ? "text-yellow-600" : "text-green-500"}`}>
                {formatPercent(pledgePct, 2)}
              </span>
            </div>
          </div>

          {/* Governance Score */}
          {data?.governance && (
            <div className="p-5 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Shield size={14} style={{ color: "var(--accent-brand)" }} />
                Governance
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Independent Directors", val: data.governance.independentDirectorsPct, suffix: "%" },
                  { label: "Board Size", val: data.governance.boardSize, suffix: "" },
                  { label: "CEO Tenure", val: data.governance.ceoTenureYears, suffix: " yrs" },
                  { label: "Audit Opinion", val: null, text: data.governance.auditOpinion ?? "-" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                    <span className="font-medium font-mono metric-mono" style={{ color: "var(--text-primary)" }}>
                      {item.text ?? (item.val !== null && item.val !== undefined ? `${item.val}${item.suffix}` : MISSING_VALUE_LABEL)}
                    </span>
                  </div>
                ))}
                {data.governance.relatedPartyTxnFlag && (
                  <div className="flex items-center gap-1 mt-2 text-yellow-400">
                    <AlertTriangle size={11} />
                    <span>Related party transactions flagged</span>
                  </div>
                )}
                {data.governance.overallScore !== null && (
                  <div className="mt-2 pt-2 border-t flex justify-between items-center" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "var(--text-muted)" }}>Overall Score</span>
                    <span className="font-bold font-mono" style={{ color: (data.governance.overallScore ?? 0) >= 60 ? "#10B981" : "#F59E0B" }}>
                      {data.governance.overallScore?.toFixed(0)}/100
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
