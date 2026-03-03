"use client";

import { motion } from "framer-motion";
import { cn, formatINR, formatPercent } from "@/lib/utils";
import { PnLBadge } from "./pnl-badge";
import { Skeleton } from "./skeleton";
import { ResponsiveContainer, LineChart, Line } from "recharts";

import CountUp from "react-countup";

interface MetricCardProps {
  label: string;
  value: number;
  valueType?: "currency" | "percent" | "number";
  change?: number;
  changeType?: "percent" | "currency";
  benchmark?: { label: string; value: number };
  sparkline?: { v: number }[];
  loading?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  valueType = "currency",
  change,
  changeType = "percent",
  benchmark,
  sparkline,
  loading = false,
  className,
}: MetricCardProps) {
  if (loading) {
    return (
      <div
        className={cn("rounded-xl p-5 border", className)}
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-8 w-36 mb-2" />
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-xl p-5 border transition-colors duration-200 group",
        className
      )}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-dark)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      <p
        className="text-xs font-medium uppercase tracking-widest mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <div className="flex items-baseline gap-3 mb-1">
        <span
          className="text-3xl font-semibold tracking-tight font-mono"
          style={{ color: "var(--text-primary)" }}
        >
          {valueType === "currency" ? (
            <CountUp 
              start={0} 
              end={value} 
              duration={0.6} 
              formattingFn={formatINR} 
            />
          ) : valueType === "percent" ? (
            <CountUp 
              start={0} 
              end={value} 
              duration={0.6} 
              decimals={1}
              formattingFn={(v) => formatPercent(v, 1)} 
            />
          ) : (
            <CountUp 
              start={0} 
              end={value} 
              duration={0.6} 
              separator="," 
            />
          )}
        </span>
        {change !== undefined && (
          <PnLBadge value={change} type={changeType ?? "percent"} />
        )}
      </div>

      {benchmark && (
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          vs {benchmark.label}:{" "}
          <span
            className="font-mono"
            style={{
              color: benchmark.value >= 0 ? "var(--positive)" : "var(--negative)",
            }}
          >
            {formatPercent(benchmark.value)}
          </span>
        </p>
      )}

      {sparkline && sparkline.length > 0 && (
        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkline}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={
                  sparkline[sparkline.length - 1].v >= sparkline[0].v
                    ? "var(--positive)"
                    : "var(--negative)"
                }
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
