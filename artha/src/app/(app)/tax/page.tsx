"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Plus } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { capitalGainsData, harvestingOpportunities } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

type Tab = "gains" | "harvesting" | "direct" | "elss";
type Filter = "all" | "ltcg" | "stcg" | "losses";

const TABS: { id: Tab; label: string }[] = [
  { id: "gains", label: "Capital Gains" },
  { id: "harvesting", label: "Harvesting" },
  { id: "direct", label: "Direct vs Regular" },
  { id: "elss", label: "ELSS & 80C" },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ltcg", label: "LTCG" },
  { id: "stcg", label: "STCG" },
  { id: "losses", label: "Losses" },
];

export default function TaxPage() {
  const [activeTab, setActiveTab] = useState<Tab>("gains");
  const [filter, setFilter] = useState<Filter>("all");
  const [addedToList, setAddedToList] = useState<Set<string>>(new Set());

  const ltcgTotal = capitalGainsData
    .filter((d) => d.type === "LTCG" && d.gain > 0)
    .reduce((s, d) => s + d.gain, 0);
  const stcgTotal = capitalGainsData
    .filter((d) => d.type === "STCG" && d.gain > 0)
    .reduce((s, d) => s + d.gain, 0);
  const estTax = capitalGainsData.reduce((s, d) => s + d.tax, 0);

  const filteredGains = capitalGainsData.filter((d) => {
    if (filter === "ltcg") return d.type === "LTCG";
    if (filter === "stcg") return d.type === "STCG";
    if (filter === "losses") return d.gain < 0;
    return true;
  });

  const totalGain = filteredGains.reduce((s, d) => s + d.gain, 0);
  const totalTax = filteredGains.reduce((s, d) => s + d.tax, 0);

  const harvestTotal = harvestingOpportunities.reduce((s, h) => s + Math.abs(h.unrealizedLoss), 0);
  const exemptionUsed = ltcgTotal;
  const exemptionLimit = 125000;
  const exemptionPct = Math.min((exemptionUsed / exemptionLimit) * 100, 100);

  return (
    <div className="space-y-5">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="LTCG Realised" value={ltcgTotal} valueType="currency" />
        <MetricCard label="STCG Realised" value={stcgTotal} valueType="currency" />
        <MetricCard label="Est. Tax Liability" value={estTax} valueType="currency" change={-estTax} changeType="currency" />
      </div>

      {/* Alert banner */}
      <div
        className="flex items-start gap-3 rounded-xl border px-5 py-4"
        style={{ background: "var(--accent-subtle)", borderColor: "rgba(245,158,11,0.25)" }}
      >
        <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--warning)" }} />
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "var(--warning)" }}>
            Harvest Opportunity Detected
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
            You can realise{" "}
            <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
              {formatINR(harvestTotal)}
            </span>{" "}
            in losses to offset gains. LTCG exemption resets on 31 Mar 2026.
          </p>
        </div>
        <button
          className="text-xs font-semibold px-3 py-1.5 rounded-md shrink-0 transition-opacity hover:opacity-90"
          style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
        >
          Review →
        </button>
      </div>

      {/* Tabs */}
      <div
        className="inline-flex items-center rounded-lg p-1 gap-1 w-full sm:w-auto overflow-x-auto overflow-y-hidden border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 relative whitespace-nowrap"
            style={
              activeTab === tab.id
                ? {
                    background: "var(--surface-elevated)",
                    color: "var(--text-primary)",
                    boxShadow: "var(--shadow-card)",
                  }
                : { color: "var(--text-muted)", background: "transparent" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Capital Gains Tab */}
      {activeTab === "gains" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Filter pills */}
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150"
                style={
                  filter === f.id
                    ? { background: "var(--accent-brand)", color: "var(--accent-foreground)", borderColor: "var(--accent-brand)" }
                    : { color: "var(--text-muted)", borderColor: "var(--border)", background: "transparent" }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  {["Asset", "Type", "Buy Date", "Sell Date", "Cost Basis", "Sale Value", "Gain / Loss", "Tax"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-left"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredGains.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors duration-100"
                    style={{ height: 52, borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "var(--surface-elevated)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{row.symbol}</p>
                      <p className="text-xs truncate max-w-[140px]" style={{ color: "var(--text-muted)" }}>{row.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-medium rounded-full px-2 py-0.5"
                        style={
                          row.type === "LTCG"
                            ? { background: "var(--positive-subtle)", color: "var(--positive)" }
                            : { background: "var(--neutral-subtle)", color: "var(--neutral)" }
                        }
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{row.buyDate}</td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{row.sellDate}</td>
                    <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--text-secondary)" }}>{formatINR(row.costBasis)}</td>
                    <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--text-primary)" }}>{formatINR(row.saleValue)}</td>
                    <td className="px-4 py-3">
                      <PnLBadge value={row.gain} type="currency" />
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: row.tax > 0 ? "var(--negative)" : "var(--text-muted)" }}>
                      {row.tax > 0 ? formatINR(row.tax) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sticky footer totals */}
            <div
              className="flex items-center justify-end gap-8 px-4 py-3 border-t"
              style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
            >
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Total Gain</p>
                <p className="text-sm font-mono font-semibold" style={{ color: totalGain >= 0 ? "var(--positive)" : "var(--negative)" }}>
                  {totalGain >= 0 ? "+" : ""}{formatINR(totalGain)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Est. Tax</p>
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--negative)" }}>
                  {formatINR(totalTax)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Harvesting Tab */}
      {activeTab === "harvesting" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {/* Exemption progress */}
          <div
            className="rounded-xl border p-5"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                LTCG Exemption Used
              </p>
              <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-primary)" }}>{formatINR(exemptionUsed)}</span>
                {" "}/ ₹1.25L
              </p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${exemptionPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: exemptionPct > 80 ? "var(--negative)" : "var(--positive)" }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              {formatINR(exemptionLimit - exemptionUsed)} remaining before tax applies
            </p>
          </div>

          {/* Recommended actions */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              Recommended Actions
            </p>
            <div className="space-y-3">
              {harvestingOpportunities.map((opp) => (
                <div
                  key={opp.symbol}
                  className="flex items-center gap-4 rounded-xl border p-4"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--negative-subtle)" }}
                  >
                    <TrendingDown size={16} style={{ color: "var(--negative)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                      {opp.symbol}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {opp.action}
                    </p>
                  </div>
                  <PnLBadge value={opp.unrealizedLoss} type="currency" />
                  <button
                    onClick={() => setAddedToList((s) => new Set([...s, opp.symbol]))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all duration-150 shrink-0"
                    style={
                      addedToList.has(opp.symbol)
                        ? { background: "var(--positive-subtle)", color: "var(--positive)", borderColor: "var(--positive)" }
                        : { background: "transparent", color: "var(--accent-brand)", borderColor: "var(--accent-brand)" }
                    }
                  >
                    {addedToList.has(opp.symbol) ? (
                      "✓ Added"
                    ) : (
                      <>
                        <Plus size={12} />
                        Add to list
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Direct vs Regular Tab */}
      {activeTab === "direct" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border p-8 flex flex-col items-center justify-center text-center"
          style={{ background: "var(--surface)", borderColor: "var(--border)", minHeight: 240 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
            <rect x="8" y="12" width="32" height="24" rx="4" stroke="var(--border-strong)" strokeWidth="2" />
            <path d="M16 24h16M16 30h10" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-base font-medium mb-2" style={{ color: "var(--text-primary)" }}>
            Direct vs Regular Analysis
          </p>
          <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
            Import your CAS statement to see how much you&apos;re losing to distributor commissions.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
          >
            Import CAS Statement
          </button>
        </motion.div>
      )}

      {/* ELSS Tab */}
      {activeTab === "elss" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border p-8 flex flex-col items-center justify-center text-center"
          style={{ background: "var(--surface)", borderColor: "var(--border)", minHeight: 240 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
            <circle cx="24" cy="24" r="14" stroke="var(--border-strong)" strokeWidth="2" />
            <path d="M24 16v8l5 3" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-base font-medium mb-2" style={{ color: "var(--text-primary)" }}>
            ELSS & 80C Tracker
          </p>
          <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
            Track your Section 80C investments and ELSS lock-in periods in one place.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
          >
            Add ELSS Investment
          </button>
        </motion.div>
      )}
    </div>
  );
}
