"use client";

import { cn, formatINR, formatPercent } from "@/lib/utils";

interface PnLBadgeProps {
  value: number;
  type: "percent" | "currency";
  className?: string;
}

export function PnLBadge({ value, type, className }: PnLBadgeProps) {
  const isPositive = value >= 0;
  const arrow = isPositive ? "↑" : "↓";
  const label =
    type === "percent"
      ? `${arrow} ${formatPercent(value)}`
      : `${arrow} ${formatINR(value)}`;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium font-mono whitespace-nowrap",
        isPositive
          ? "text-[var(--positive)] bg-[var(--positive-subtle)]"
          : "text-[var(--negative)] bg-[var(--negative-subtle)]",
        className
      )}
    >
      {label}
    </span>
  );
}
