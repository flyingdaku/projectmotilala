"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Share2, Info } from "lucide-react";
import {
  ASSET_LABELS,
  ANNUAL_RETURNS,
  START_YEAR,
  END_YEAR,
  computeCAGR,
  computeCorpus,
  type AssetKey,
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const HOLDING_PERIODS = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30];
const START_YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

function getColor(cagr: number | null): string {
  if (cagr === null) return "var(--surface-elevated)";
  if (cagr >= 25) return "#064e3b";
  if (cagr >= 20) return "#065f46";
  if (cagr >= 15) return "#047857";
  if (cagr >= 10) return "#059669";
  if (cagr >= 7) return "#10b981";
  if (cagr >= 4) return "#34d399";
  if (cagr >= 1) return "#a7f3d0";
  if (cagr >= 0) return "#d1fae5";
  if (cagr >= -5) return "#fee2e2";
  if (cagr >= -10) return "#fca5a5";
  if (cagr >= -20) return "#ef4444";
  if (cagr >= -30) return "#dc2626";
  return "#7f1d1d";
}

function getTextColor(cagr: number | null): string {
  if (cagr === null) return "var(--text-muted)";
  if (cagr >= 7) return "#fff";
  if (cagr >= 0) return "#065f46";
  if (cagr >= -10) return "#7f1d1d";
  return "#fff";
}

interface TooltipData {
  startYear: number;
  holdingYears: number;
  cagr: number | null;
  corpus: number | null;
  x: number;
  y: number;
}

export default function HeatmapPage() {
  const [asset, setAsset] = useState<AssetKey>("nifty50");
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const [highlightCol, setHighlightCol] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const grid = useMemo(() => {
    return START_YEARS.map((sy) =>
      HOLDING_PERIODS.map((hp) => computeCAGR(asset, sy, hp, inflationAdjusted))
    );
  }, [asset, inflationAdjusted]);

  const { bestCell, worstCell } = useMemo<{
    bestCell: { row: number; col: number; val: number } | null;
    worstCell: { row: number; col: number; val: number } | null;
  }>(() => {
    let best: { row: number; col: number; val: number } | null = null;
    let worst: { row: number; col: number; val: number } | null = null;
    grid.forEach((row, ri) => {
      row.forEach((val, ci) => {
        if (val === null) return;
        if (!best || val > best.val) best = { val, row: ri, col: ci };
        if (!worst || val < worst.val) worst = { val, row: ri, col: ci };
      });
    });
    return { bestCell: best, worstCell: worst };
  }, [grid]);

  const handleCellHover = useCallback(
    (e: React.MouseEvent, startYear: number, holdingYears: number, cagr: number | null) => {
      const corpus = cagr !== null ? computeCorpus(asset, startYear, holdingYears) : null;
      setTooltip({ startYear, holdingYears, cagr, corpus, x: e.clientX, y: e.clientY });
    },
    [asset]
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          India Asset Class Heat Map
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          What if you had invested ₹1 Lakh in any year since 1990? Each cell shows the CAGR for that
          (start year × holding period) combination.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Asset</label>
          <Select value={asset} onChange={(e) => setAsset(e.target.value as AssetKey)} className="w-48">
            {(Object.keys(ASSET_LABELS) as AssetKey[]).map((k) => <option key={k} value={k}>{ASSET_LABELS[k]}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Returns</label>
          <div className="flex gap-1">
            <Button onClick={() => setInflationAdjusted(false)} variant={!inflationAdjusted ? "default" : "outline"} className="text-xs h-8 px-3">
              Nominal
            </Button>
            <Button onClick={() => setInflationAdjusted(true)} variant={inflationAdjusted ? "default" : "outline"} className="text-xs h-8 px-3">
              Real (CPI-adjusted)
            </Button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/macros/heatmap?asset=${asset}&real=${inflationAdjusted}`)}
            variant="outline" className="text-xs gap-1.5 h-8">
            <Share2 size={13} />Share
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>CAGR:</span>
        {[
          { label: "<0%", color: "#ef4444" },
          { label: "0–4%", color: "#a7f3d0", text: "#065f46" },
          { label: "4–10%", color: "#34d399" },
          { label: "10–15%", color: "#10b981" },
          { label: "15–20%", color: "#059669" },
          { label: ">20%", color: "#047857" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{l.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 ml-2">
          <div className="w-3 h-3 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>N/A</span>
        </div>
      </div>

      {/* Grid */}
      <div
        className="rounded-xl border overflow-auto"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <table className="w-full border-collapse text-xs" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 px-3 py-2 text-left font-medium border-b border-r"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  minWidth: 64,
                }}
              >
                Start ↓ / Hold →
              </th>
              {HOLDING_PERIODS.map((hp, ci) => (
                <th
                  key={hp}
                  className="px-2 py-2 text-center font-medium border-b cursor-pointer transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: highlightCol === ci ? "var(--accent-brand)" : "var(--text-muted)",
                    background: highlightCol === ci ? "var(--accent-subtle)" : "var(--surface)",
                    minWidth: 52,
                  }}
                  onClick={() => setHighlightCol(highlightCol === ci ? null : ci)}
                >
                  {hp}yr
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {START_YEARS.map((sy, ri) => (
              <tr key={sy}>
                <td
                  className="sticky left-0 z-10 px-3 py-1 font-medium border-r cursor-pointer transition-colors"
                  style={{
                    background: highlightRow === ri ? "var(--accent-subtle)" : "var(--surface)",
                    borderColor: "var(--border)",
                    color: highlightRow === ri ? "var(--accent-brand)" : "var(--text-secondary)",
                  }}
                  onClick={() => setHighlightRow(highlightRow === ri ? null : ri)}
                >
                  {sy}
                </td>
                {HOLDING_PERIODS.map((hp, ci) => {
                  const cagr = grid[ri][ci];
                  const isBest = bestCell?.row === ri && bestCell?.col === ci;
                  const isWorst = worstCell?.row === ri && worstCell?.col === ci;
                  const isHighlighted = highlightRow === ri || highlightCol === ci;

                  return (
                    <td
                      key={hp}
                      className="px-1 py-1 text-center font-mono cursor-pointer transition-all relative"
                      style={{
                        background: cagr !== null ? getColor(cagr) : "var(--surface-elevated)",
                        color: cagr !== null ? getTextColor(cagr) : "var(--text-muted)",
                        opacity: isHighlighted || (highlightRow === null && highlightCol === null) ? 1 : 0.35,
                        outline: isBest ? "2px solid #10b981" : isWorst ? "2px solid #ef4444" : undefined,
                        outlineOffset: "-2px",
                      }}
                      onMouseEnter={(e) => handleCellHover(e, sy, hp, cagr)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {cagr !== null ? (
                        <div className="relative">
                          {cagr.toFixed(1)}%
                          {isBest && (
                            <span className="absolute -top-1 -right-1 text-[8px] bg-[var(--positive)] text-[var(--background)] rounded px-0.5 leading-tight">
                              Win
                            </span>
                          )}
                          {isWorst && (
                            <span className="absolute -top-1 -right-1 text-[8px] bg-[var(--negative)] text-[var(--background)] rounded px-0.5 leading-tight">
                              Loss
                            </span>
                          )}
                        </div>
                      ) : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight strip */}
      <div
        className="mt-4 flex flex-wrap gap-4 p-4 rounded-xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>How to read:</strong> Click a row to highlight all
            returns for that start year. Click a column to highlight all returns for that holding period.
            Hover any cell for details.
          </p>
        </div>
        {bestCell && (
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium" style={{ color: "var(--positive)" }}>Best:</span>{" "}
            Started {START_YEARS[bestCell.row]}, held {HOLDING_PERIODS[bestCell.col]}yr →{" "}
            <span className="font-mono font-medium" style={{ color: "var(--positive)" }}>
              +{bestCell.val}% CAGR
            </span>
          </div>
        )}
        {worstCell && (
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium" style={{ color: "var(--negative)" }}>Worst:</span>{" "}
            Started {START_YEARS[worstCell.row]}, held {HOLDING_PERIODS[worstCell.col]}yr →{" "}
            <span className="font-mono font-medium" style={{ color: "var(--negative)" }}>
              {worstCell.val}% CAGR
            </span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-lg border shadow-lg text-xs"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 60,
            background: "var(--surface-elevated)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            maxWidth: 220,
          }}
        >
          {tooltip.cagr !== null ? (
            <>
              <p className="font-medium mb-1">
                {ASSET_LABELS[asset]} — {tooltip.startYear} for {tooltip.holdingYears}yr
              </p>
              <p>
                CAGR:{" "}
                <span
                  className="font-mono font-semibold"
                  style={{ color: tooltip.cagr >= 0 ? "var(--positive)" : "var(--negative)" }}
                >
                  {tooltip.cagr > 0 ? "+" : ""}
                  {tooltip.cagr}%
                </span>
              </p>
              {tooltip.corpus && (
                <p style={{ color: "var(--text-secondary)" }}>
                  ₹1L grew to{" "}
                  <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                    {formatINR(tooltip.corpus)}
                  </span>
                </p>
              )}
            </>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>Data not available</p>
          )}
        </div>
      )}
    </div>
  );
}
