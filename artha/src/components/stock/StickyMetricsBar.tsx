"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { StockDetail } from "@/lib/data";
import type { DataMeta } from "@/lib/stock/presentation";
import { DataMetaInline } from "@/components/stock/StockUiPrimitives";
import { formatCurrency, formatMoneyInCrores, formatRatio, formatSignedChange } from "@/lib/utils/formatters";

interface Props {
  stock: StockDetail;
  meta?: DataMeta | null;
  visible: boolean;
}

export function StickyMetricsBar({ stock, meta, visible }: Props) {
  const isPos = (stock.pctChange1d ?? 0) > 0;
  const isNeg = (stock.pctChange1d ?? 0) < 0;

  return (
    <div
      className={`sticky top-0 z-40 w-full transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full h-0 overflow-hidden"
        }`}
      style={{
        background: "var(--surface)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Name + Price */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-sm font-semibold truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {stock.name}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold shrink-0"
                style={{
                  background: "var(--accent-subtle)",
                  color: "var(--accent-brand)",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
              >
                {stock.nseSymbol ?? stock.symbol}
              </span>
            </div>

            <div className="flex items-baseline gap-2 shrink-0">
              <span
                className="text-lg font-bold font-mono metric-mono"
                style={{ color: "var(--text-primary)" }}
              >
                {formatCurrency(stock.price)}
              </span>
              {stock.pctChange1d != null && (
                <span
                  className={`flex items-center gap-1 text-xs font-semibold font-mono metric-mono ${isPos
                    ? "text-emerald-500"
                    : isNeg
                      ? "text-rose-500"
                      : "text-muted-foreground"
                    }`}
                >
                  {isPos ? (
                    <TrendingUp size={12} />
                  ) : isNeg ? (
                    <TrendingDown size={12} />
                  ) : (
                    <Minus size={12} />
                  )}
                  {formatSignedChange(stock.pctChange1d)}
                </span>
              )}
            </div>
          </div>

          {/* Right: Key Metrics */}
          <div className="hidden md:flex items-center gap-6">
            {[
              {
                label: "Mkt Cap",
                value: formatMoneyInCrores(stock.marketCapCr),
              },
              { label: "P/E", value: formatRatio(stock.pe, 1) },
              { label: "P/B", value: formatRatio(stock.pb, 2) },
              {
                label: "52W H",
                value: formatCurrency(stock.high52w, { decimals: 0 }),
              },
              {
                label: "52W L",
                value: formatCurrency(stock.low52w, { decimals: 0 }),
              },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div
                  className="text-[9px] font-medium uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {m.label}
                </div>
                <div
                  className="text-xs font-mono font-semibold metric-mono"
                  style={{ color: "var(--text-primary)" }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <DataMetaInline meta={meta ?? null} />
        </div>
      </div>
    </div>
  );
}
