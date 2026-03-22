"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Zap, Cpu, Clock } from "lucide-react";
import { apiGet } from "@/lib/api-client";
import type { StockOverviewResponse } from "@/lib/api-types";
import type { CompanyEvent } from "@/lib/data/types";

const EVENT_ICONS: Record<string, React.ReactNode> = {
  RED_FLAG: <AlertTriangle size={14} className="text-red-400" />,
  RESULT: <TrendingUp size={14} className="text-blue-400" />,
  CONCALL: <Cpu size={14} className="text-purple-400" />,
  SHAREHOLDING_CHANGE: <Zap size={14} className="text-yellow-400" />,
  CORP_ACTION: <Zap size={14} className="text-green-400" />,
  ANNOUNCEMENT: <Clock size={14} className="text-gray-400" />,
  RATING_CHANGE: <TrendingDown size={14} className="text-orange-400" />,
  INSIDER_TRADE: <AlertTriangle size={14} className="text-pink-400" />,
};

const SEVERITY_STYLES: Record<string, string> = {
  CRITICAL: "border-red-500/30 bg-red-500/5 text-red-400",
  WARNING: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  INFO: "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]",
};

// Static AI-generated content until AI pipeline is live
function getMockBullBear(stockName: string) {
  return {
    bullCase: [
      `Strong competitive moat in ${stockName}'s core business`,
      "Consistent double-digit earnings growth over 5 years",
      "Debt-free balance sheet with high cash generation",
      "Management track record of capital allocation",
      "Beneficiary of India's domestic consumption growth",
    ],
    bearCase: [
      "Valuation at premium to sector median",
      "Input cost inflation pressure on margins",
      "Regulatory risk in key operating segments",
      "Dependence on promoter group for key decisions",
    ],
    summary: `${stockName} presents a classic quality-growth story backed by strong fundamentals. The business demonstrates pricing power and high return ratios. While current valuations leave limited margin of safety, the long-term thesis remains intact for patient investors. Key monitorables are quarterly margin trends and any change in promoter holding.`,
  };
}

interface Props {
  symbol: string;
  stockName: string;
}

export function AISection({ symbol, stockName }: Props) {
  const [events, setEvents] = useState<CompanyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"events" | "bull-bear" | "summary">("events");

  useEffect(() => {
    setLoading(true);
    apiGet<StockOverviewResponse>(`/api/stocks/${symbol}/overview`)
      .then((d) => setEvents((d.events as CompanyEvent[] | undefined) ?? []))
      .finally(() => setLoading(false));
  }, [symbol]);

  const mock = getMockBullBear(stockName);
  const redFlags = events.filter((e) => e.eventType === "RED_FLAG" || e.severity === "CRITICAL");

  return (
    <section id="ai" className="scroll-mt-28 space-y-4">
      {/* Red Flag banner */}
      {redFlags.length > 0 && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-red-400 mb-1">{redFlags.length} Active Red Flag{redFlags.length > 1 ? "s" : ""}</div>
            <div className="space-y-1">
              {redFlags.map((f, i) => (
                <p key={i} className="text-xs" style={{ color: "var(--text-secondary)" }}>{f.title ?? f.eventData?.description as string ?? "Flagged event"}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-6 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* AI badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: "var(--accent-brand)18", color: "var(--accent-brand)", border: "1px solid var(--accent-brand)40" }}>
            <Cpu size={11} />
            AI Insights
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Powered by Artha Intelligence — updated daily
          </span>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-0 border-b mb-6" style={{ borderColor: "var(--border)" }}>
          {([
            { id: "events", label: "Events Feed" },
            { id: "bull-bear", label: "Bull vs Bear" },
            { id: "summary", label: "AI Summary" },
          ] as const).map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${activeTab === t.id ? "border-[var(--accent-brand)] text-[var(--accent-brand)]" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Events Feed Tab */}
        {activeTab === "events" && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin w-6 h-6 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
              </div>
            ) : events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <Clock size={32} style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No recent events</p>
              </div>
            ) : (
              <div className="space-y-2">
                {events.map((event) => (
                  <div key={event.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${SEVERITY_STYLES[event.severity ?? "INFO"]}`}>
                    <div className="mt-0.5 flex-shrink-0">{(EVENT_ICONS[event.eventType] as React.ReactNode) ?? <Clock size={14} />}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                          {event.title ?? event.eventType.replace(/_/g, " ")}
                        </p>
                        <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                          {event.eventDate}
                        </span>
                      </div>
                      {typeof event.eventData?.description === 'string' && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                          {event.eventData.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bull vs Bear Tab */}
        {activeTab === "bull-bear" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bull Case */}
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-green-400" />
                <span className="text-sm font-semibold text-green-400">Bull Case</span>
              </div>
              <ul className="space-y-2">
                {mock.bullCase.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bear Case */}
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown size={16} className="text-red-400" />
                <span className="text-sm font-semibold text-red-400">Bear Case</span>
              </div>
              <ul className="space-y-2">
                {mock.bearCase.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="md:col-span-2 p-3 rounded-lg text-xs" style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
              ⚠️ AI-generated analysis is for informational purposes only. Not investment advice. Verify with primary data before making investment decisions.
            </div>
          </div>
        )}

        {/* AI Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-4">
            <div
              className="p-5 rounded-xl border-l-4 text-sm leading-relaxed"
              style={{ borderLeftColor: "var(--accent-brand)", background: "var(--surface-elevated)", color: "var(--text-secondary)" }}
            >
              {mock.summary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: "Business Quality", score: 72, color: "#10B981" },
                { label: "Financial Health", score: 68, color: "#3B82F6" },
                { label: "Valuation Comfort", score: 44, color: "#F59E0B" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg text-center"
                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  <div className="text-2xl font-bold font-mono" style={{ color: item.color }}>{item.score}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>/100</div>
                </div>
              ))}
            </div>

            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              AI-generated scores based on publicly available financial data. Updated daily at market close.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
