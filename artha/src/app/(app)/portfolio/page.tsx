"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { Skeleton, TableRowSkeleton } from "@/components/ui/skeleton";
import { holdingsData } from "@/lib/mock-data";
import { formatINR, formatPercent, cn } from "@/lib/utils";

type SortKey = "symbol" | "value" | "pnl" | "pnlPct" | "xirr";
type SortDir = "asc" | "desc";
type Tab = "equity" | "mf" | "other";

const TABS: { id: Tab; label: string }[] = [
  { id: "equity", label: "Equity" },
  { id: "mf", label: "Mutual Funds" },
  { id: "other", label: "Gold & Others" },
];

function LTCGBadge({ daysHeld, isLTCG }: { daysHeld: number; isLTCG: boolean }) {
  if (isLTCG) {
    return (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ background: "var(--positive-subtle)", color: "var(--positive)" }}
      >
        LTCG ✓
      </span>
    );
  }
  const daysToLTCG = 365 - daysHeld;
  if (daysToLTCG <= 30) {
    return (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}
      >
        {daysToLTCG}d
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}
    >
      STCG
    </span>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown size={12} style={{ color: "var(--text-muted)" }} />;
  return sortDir === "asc"
    ? <ChevronUp size={12} style={{ color: "var(--accent-brand)" }} />
    : <ChevronDown size={12} style={{ color: "var(--accent-brand)" }} />;
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("equity");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let rows = [...holdingsData];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) => r.symbol.toLowerCase().includes(q) || r.company.toLowerCase().includes(q)
      );
    }
    rows.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return rows;
  }, [search, sortKey, sortDir]);

  const totals = useMemo(() => ({
    value: filtered.reduce((s, r) => s + r.value, 0),
    invested: filtered.reduce((s, r) => s + r.qty * r.avgCost, 0),
    pnl: filtered.reduce((s, r) => s + r.pnl, 0),
  }), [filtered]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  const COLS: { key: SortKey; label: string; sortable: boolean }[] = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "value", label: "Value", sortable: true },
    { key: "pnl", label: "P&L (₹)", sortable: true },
    { key: "pnlPct", label: "P&L (%)", sortable: true },
    { key: "xirr", label: "XIRR", sortable: true },
  ];

  return (
    <div className="space-y-4">
      {/* Tab navigation */}
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

      {/* Controls row */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 flex-1 max-w-xs rounded-md border px-3 py-2"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search symbol or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--text-muted)]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <button
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
        >
          <Plus size={14} />
          Add Holding
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-xs font-medium uppercase tracking-widest text-left",
                      col.sortable && "cursor-pointer select-none"
                    )}
                    style={{ color: "var(--text-muted)" }}
                    onClick={() => col.sortable && toggleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && (
                        <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                      )}
                    </div>
                  </th>
                ))}
                <th
                  className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-left"
                  style={{ color: "var(--text-muted)" }}
                >
                  LTCG?
                </th>
                <th className="w-8" />
              </tr>
            </thead>

            {/* Sticky summary row */}
            <tbody>
              <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
                <td className="px-4 py-2 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  {filtered.length} holdings
                </td>
                <td className="px-4 py-3 text-right font-medium font-mono" style={{ color: "var(--text-primary)" }}>
                  {formatINR(totals.value)}
                </td>
                <td className="px-4 py-3 text-right font-medium font-mono" style={{ color: totals.pnl >= 0 ? "var(--positive)" : "var(--negative)" }}>
                  <div className="flex items-center justify-end gap-2">
                    {totals.pnl >= 0 ? "+" : ""}{formatINR(totals.pnl)}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <PnLBadge
                    value={((totals.pnl / (totals.invested || 1)) * 100)}
                    type="percent"
                  />
                </td>
                <td colSpan={3} />
              </tr>

              {filtered.map((row) => (
                <React.Fragment key={row.id}>
                  <tr
                    className="cursor-pointer transition-colors duration-100"
                    style={{ height: 52, borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "var(--surface-elevated)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                    }
                    onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                          {row.symbol}
                        </span>
                        <span
                          className="text-xs rounded px-1.5 py-0.5 font-mono"
                          style={{ background: "var(--neutral-subtle)", color: "var(--neutral)" }}
                        >
                          {row.exchange}
                        </span>
                      </div>
                      <div className="text-xs truncate max-w-[160px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {row.company}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--text-primary)" }}>
                      {formatINR(row.value)}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-right">
                      <span style={{ color: row.pnl >= 0 ? "var(--positive)" : "var(--negative)" }}>
                        {row.pnl >= 0 ? "+" : ""}{formatINR(row.pnl)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <PnLBadge value={row.pnlPct} type="percent" />
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-right">
                      <span style={{ color: row.xirr >= 0 ? "var(--positive)" : "var(--negative)" }}>
                        {formatPercent(row.xirr)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <LTCGBadge daysHeld={row.daysHeld} isLTCG={row.isLTCG} />
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-150"
                        style={{
                          color: "var(--text-muted)",
                          transform: expandedRow === row.id ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      />
                    </td>
                  </tr>

                  {/* Expanded lot detail */}
                  <AnimatePresence>
                    {expandedRow === row.id && (
                      <tr key={`${row.id}-expand`}>
                        <td colSpan={7} style={{ padding: 0 }}>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{ overflow: "hidden", background: "var(--surface-elevated)" }}
                          >
                            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
                              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                                Lot Details
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                  { label: "Qty", value: row.qty.toString() },
                                  { label: "Avg Cost", value: formatINR(row.avgCost) },
                                  { label: "LTP", value: formatINR(row.ltp) },
                                  { label: "Days Held", value: `${row.daysHeld}d` },
                                ].map(({ label, value }) => (
                                  <div key={label}>
                                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                                      {label}
                                    </p>
                                    <p className="text-sm font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                                      {value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
