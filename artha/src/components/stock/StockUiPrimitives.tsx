"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DataMeta } from "@/lib/stock/presentation";
import { formatCoverageLabel } from "@/lib/stock/presentation";
import { formatDateLabel } from "@/lib/utils/formatters";

export function DataMetaInline({
  meta,
  className,
}: {
  meta?: DataMeta | null;
  className?: string;
}) {
  if (!meta) return null;

  const parts = [
    meta.asOf ? `As of ${formatDateLabel(meta.asOf)}` : null,
    meta.status === "live" ? "Live" : meta.status === "delayed" ? "Delayed" : meta.status === "partial" ? "Partial coverage" : "Unavailable",
    meta.unitLabel ? meta.unitLabel : null,
  ].filter(Boolean);

  if (parts.length === 0 && !meta.note) return null;

  return (
    <div className={cn("data-meta-inline", className)} aria-label="Data freshness and coverage">
      <span>{parts.join(" · ")}</span>
      {meta.note ? <span>{meta.note}</span> : null}
    </div>
  );
}

export function CoverageNotice({
  meta,
  title = "Coverage note",
  message,
  action,
  className,
}: {
  meta?: DataMeta | null;
  title?: string;
  message: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("stock-empty-state", className)} role="status">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full border p-1.5" style={{ borderColor: "rgba(245,158,11,0.25)", background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
          <Info size={14} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{title}</div>
          <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{message}</p>
          {meta ? (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>{formatCoverageLabel(meta.coverage)}</span>
              {meta.asOf ? <span>Latest: {formatDateLabel(meta.asOf)}</span> : null}
            </div>
          ) : null}
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function DataValue({
  value,
  reason,
  className,
}: {
  value: ReactNode;
  reason?: string | null;
  className?: string;
}) {
  const isUnavailable = typeof value === "string" && value === "-";
  return (
    <div className={cn(isUnavailable ? "data-value data-value--empty" : "data-value", className)}>
      <span>{value}</span>
      {isUnavailable && reason ? <span className="data-note">{reason}</span> : null}
    </div>
  );
}

export type StickyMetricTableColumn = {
  key: string;
  label: ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type StickyMetricTableRow = {
  key: string;
  label: ReactNode;
  values: Record<string, ReactNode>;
  rowClassName?: string;
};

export function StickyMetricTable({
  ariaLabel,
  columns,
  rows,
  latestColumnKey,
  className,
}: {
  ariaLabel: string;
  columns: StickyMetricTableColumn[];
  rows: StickyMetricTableRow[];
  latestColumnKey?: string;
  className?: string;
}) {
  return (
    <div className={cn("stock-table-shell", className)} role="region" aria-label={ariaLabel}>
      <table className="stock-table">
        <thead>
          <tr>
            <th scope="col" className="stock-table__sticky stock-table__header stock-table__metric-col">
              Parameters
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "stock-table__header stock-table__number",
                  column.headerClassName,
                  latestColumnKey === column.key && "stock-table__latest",
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className={cn("stock-table__row", row.rowClassName)}>
              <th scope="row" className="stock-table__sticky stock-table__metric-col">
                {row.label}
              </th>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "stock-table__number",
                    column.cellClassName,
                    latestColumnKey === column.key && "stock-table__latest",
                  )}
                >
                  {row.values[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
