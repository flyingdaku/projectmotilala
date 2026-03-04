"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { StockDetail } from "@/lib/data";

interface Props {
  stock: StockDetail;
  visible: boolean;
}

export function StickyMetricsBar({ stock, visible }: Props) {
  const isPos = (stock.pctChange1d ?? 0) > 0;
  const isNeg = (stock.pctChange1d ?? 0) < 0;

  return (
    <div
      className={`sticky top-0 z-40 transition-transform duration-300 w-[calc(100%+64px)] -mx-8 px-8 ${visible ? "translate-y-0" : "-translate-y-full h-0 overflow-hidden"
        }`}
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-3">
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
                className="text-lg font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                ₹
                {stock.price?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? "—"}
              </span>
              {stock.pctChange1d != null && (
                <span
                  className={`flex items-center gap-1 text-xs font-semibold font-mono ${isPos
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
                  {isPos ? "+" : ""}
                  {stock.pctChange1d.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          {/* Right: Key Metrics */}
          <div className="hidden md:flex items-center gap-6">
            {[
              {
                label: "Mkt Cap",
                value: stock.marketCapCr
                  ? `₹${(stock.marketCapCr / 100).toFixed(1)}B`
                  : "—",
              },
              { label: "P/E", value: stock.pe?.toFixed(1) ?? "—" },
              { label: "P/B", value: stock.pb?.toFixed(2) ?? "—" },
              {
                label: "52W H",
                value: stock.high52w ? `₹${stock.high52w.toFixed(0)}` : "—",
              },
              {
                label: "52W L",
                value: stock.low52w ? `₹${stock.low52w.toFixed(0)}` : "—",
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
                  className="text-xs font-mono font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
