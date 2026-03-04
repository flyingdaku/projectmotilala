"use client";

import { ArrowRight } from "lucide-react";

interface Props {
  debtorDays: number | null;
  inventoryDays: number | null;
  payableDays: number | null;
  period: string;
}

export function WorkingCapitalCycle({ debtorDays, inventoryDays, payableDays, period }: Props) {
  const cashCycleDays = (debtorDays ?? 0) + (inventoryDays ?? 0) - (payableDays ?? 0);
  
  const maxDays = Math.max(debtorDays ?? 0, inventoryDays ?? 0, payableDays ?? 0, 100);
  const scale = 100 / maxDays;

  return (
    <div className="w-full">
      <div className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
        Working Capital Cycle - {period}
      </div>

      <div className="space-y-4">
        {/* Inventory Days */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Inventory Days
            </span>
            <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
              {inventoryDays?.toFixed(0) ?? "—"} days
            </span>
          </div>
          <div className="h-6 rounded" style={{ background: "var(--surface-elevated)" }}>
            <div
              className="h-full rounded flex items-center justify-end px-2"
              style={{
                width: `${(inventoryDays ?? 0) * scale}%`,
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
              }}
            >
              <span className="text-[10px] font-semibold text-white">Inventory</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
        </div>

        {/* Debtor Days */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Debtor Days (Receivables)
            </span>
            <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
              {debtorDays?.toFixed(0) ?? "—"} days
            </span>
          </div>
          <div className="h-6 rounded" style={{ background: "var(--surface-elevated)" }}>
            <div
              className="h-full rounded flex items-center justify-end px-2"
              style={{
                width: `${(debtorDays ?? 0) * scale}%`,
                background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
              }}
            >
              <span className="text-[10px] font-semibold text-white">Debtors</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
        </div>

        {/* Payable Days */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Payable Days (Creditors)
            </span>
            <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
              {payableDays?.toFixed(0) ?? "—"} days
            </span>
          </div>
          <div className="h-6 rounded" style={{ background: "var(--surface-elevated)" }}>
            <div
              className="h-full rounded flex items-center justify-end px-2"
              style={{
                width: `${(payableDays ?? 0) * scale}%`,
                background: "linear-gradient(90deg, #10b981, #34d399)",
              }}
            >
              <span className="text-[10px] font-semibold text-white">Payables</span>
            </div>
          </div>
        </div>

        {/* Cash Cycle Result */}
        <div className="pt-3 mt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Cash Conversion Cycle
            </span>
            <span
              className={`text-lg font-mono font-bold ${
                cashCycleDays < 30 ? "text-green-500" : cashCycleDays < 60 ? "text-yellow-500" : "text-red-500"
              }`}
            >
              {cashCycleDays.toFixed(0)} days
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {cashCycleDays < 30
              ? "Excellent - Very efficient working capital management"
              : cashCycleDays < 60
              ? "Good - Moderate working capital efficiency"
              : "High - Consider optimizing working capital"}
          </p>
        </div>
      </div>
    </div>
  );
}
