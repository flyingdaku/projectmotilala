"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Calendar, Zap } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { AllocationDonut } from "@/components/charts/donut-chart";
import {
  generatePerformanceData,
  allocationData,
  topMovers,
  upcomingEvents,
} from "@/lib/mock-data";
import { formatINR, formatPercent } from "@/lib/utils";

const EVENT_ICONS = {
  tax: AlertTriangle,
  sip: Zap,
  elss: Calendar,
};

const EVENT_COLORS = {
  tax: "var(--accent-brand)",
  sip: "var(--neutral)",
  elss: "var(--positive)",
};

export default function DashboardPage() {
  const perfData = useMemo(() => generatePerformanceData(12), []);

  const sparkline = useMemo(
    () => perfData.slice(-20).map((d) => ({ v: d.portfolio })),
    [perfData]
  );

  return (
    <div className="space-y-6">
      {/* Row 1 — 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Net Worth"
          value={4850000}
          valueType="currency"
          change={18.2}
          changeType="percent"
          benchmark={{ label: "Nifty 50", value: 3.1 }}
          sparkline={sparkline}
        />
        <MetricCard
          label="Today's Change"
          value={12480}
          valueType="currency"
          change={0.26}
          changeType="percent"
        />
        <MetricCard
          label="XIRR"
          value={22.4}
          valueType="percent"
          change={3.2}
          changeType="percent"
          benchmark={{ label: "Nifty CAGR", value: 14.1 }}
        />
        <MetricCard
          label="vs Benchmark"
          value={8.3}
          valueType="percent"
          change={8.3}
          changeType="percent"
        />
      </div>

      {/* Row 2 — Performance chart + Allocation donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="rounded-xl border p-5 lg:col-span-2"
          style={{ background: "var(--surface)", borderColor: "var(--border)", minHeight: 320 }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Portfolio Performance
          </h2>
          <div style={{ height: 260 }}>
            <PerformanceChart data={perfData} />
          </div>
        </div>

        <div
          className="rounded-xl border p-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Allocation
          </h2>
          <div style={{ height: 280 }}>
            <AllocationDonut data={allocationData} />
          </div>
        </div>
      </div>

      {/* Row 3 — Top movers + Upcoming events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top movers */}
        <div
          className="rounded-xl border p-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Top Movers Today
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                {["Symbol", "Name", "Change", "P&L"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-medium uppercase tracking-widest pb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topMovers.map((m) => (
                <tr
                  key={m.symbol}
                  className="transition-colors duration-100"
                  style={{ height: 44 }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background =
                      "var(--surface-elevated)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                  }
                >
                  <td
                    className="text-sm font-mono font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {m.symbol}
                  </td>
                  <td
                    className="text-sm truncate max-w-[120px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {m.name}
                  </td>
                  <td>
                    <PnLBadge value={m.changePct} type="percent" />
                  </td>
                  <td className="text-right">
                    <span
                      className="text-sm font-mono"
                      style={{
                        color: m.pnl >= 0 ? "var(--positive)" : "var(--negative)",
                      }}
                    >
                      {m.pnl >= 0 ? "+" : ""}
                      {formatINR(m.pnl)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming events */}
        <div
          className="rounded-xl border p-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((ev, i) => {
              const Icon = EVENT_ICONS[ev.type];
              const color = EVENT_COLORS[ev.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                  style={{
                    background: ev.urgent ? "var(--accent-subtle)" : "var(--surface-elevated)",
                    borderColor: ev.urgent ? "rgba(245,158,11,0.2)" : "var(--border)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {ev.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {ev.desc}
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {ev.date}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 4 — Tax snapshot */}
      <div
        className="rounded-xl border p-5"
        style={{
          background: "var(--accent-subtle)",
          borderColor: "rgba(245,158,11,0.2)",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.2)" }}
            >
              <TrendingUp size={16} style={{ color: "var(--accent-brand)" }} />
            </div>
            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--accent-brand)" }}
              >
                Tax Snapshot — FY 2025–26
              </p>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                You have used{" "}
                <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                  ₹32,500
                </span>{" "}
                of your ₹1.25L LTCG exemption.{" "}
                <span style={{ color: "var(--positive)" }}>₹92,500 remaining.</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                LTCG Realised
              </p>
              <p className="text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                ₹32,500
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                STCG Realised
              </p>
              <p className="text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                ₹1,700
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Est. Tax
              </p>
              <p className="text-lg font-semibold font-mono" style={{ color: "var(--negative)" }}>
                ₹4,063
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
            >
              View Tax Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
