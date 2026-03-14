"use client";

import { useState, useEffect } from "react";
import { TrendingUp, ChevronRight, BarChart3, Activity } from "lucide-react";
import { SectorHeatmap } from "@/components/charts/SectorHeatmap";
import { RRGPlot } from "@/components/charts/RRGPlot";
import type { RRGDataPoint } from "@/lib/utils/rrg";

const PERIODS = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y"] as const;
type Period = typeof PERIODS[number];

type HierarchyLevel = "sector" | "industry_group" | "industry" | "sub_industry";

interface HierarchyNode {
  id: string;
  name: string;
  code: string;
  level: HierarchyLevel;
  returns: Record<Period, number>;
  pe?: number;
  pb?: number;
  marketCapCr?: number;
  marketCapPct?: number;
  stockCount: number;
  avgVolume?: number;
}

const LEVEL_LABELS = {
  sector: "Sectors",
  industry_group: "Industry Groups",
  industry: "Industries",
  sub_industry: "Sub-Industries",
};

export default function SectorPerformancePage() {
  const [period, setPeriod] = useState<Period>("1M");
  const [currentLevel, setCurrentLevel] = useState<HierarchyLevel>("sector");
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [data, setData] = useState<HierarchyNode[]>([]);
  const [rrgData, setRRGData] = useState<RRGDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"heatmap" | "table" | "rrg">("heatmap");

  // Fetch hierarchy data
  useEffect(() => {
    const levelParam = currentLevel;
    const pathParam = selectedPath.join("/");
    const timer = window.setTimeout(() => setLoading(true), 0);

    void fetch(`/api/sectors/hierarchy?level=${levelParam}&path=${pathParam}&period=${period}`)
      .then(r => r.json())
      .then(result => {
        setData(result.nodes || []);
        setRRGData(result.rrgData || []);
      })
      .catch(err => {
        console.error("Failed to fetch sector data:", err);
        setData([]);
        setRRGData([]);
      })
      .finally(() => setLoading(false));

    return () => window.clearTimeout(timer);
  }, [currentLevel, selectedPath, period]);

  const handleDrillDown = (nodeId: string) => {
    const node = data.find(n => n.id === nodeId);
    if (!node) return;

    // Determine next level
    const levels: HierarchyLevel[] = ["sector", "industry_group", "industry", "sub_industry"];
    const currentIdx = levels.indexOf(currentLevel);
    if (currentIdx < levels.length - 1) {
      setCurrentLevel(levels[currentIdx + 1]);
      setSelectedPath([...selectedPath, nodeId]);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      // Back to sectors
      setCurrentLevel("sector");
      setSelectedPath([]);
    } else {
      const levels: HierarchyLevel[] = ["sector", "industry_group", "industry", "sub_industry"];
      setCurrentLevel(levels[index + 1]);
      setSelectedPath(selectedPath.slice(0, index + 1));
    }
  };

  const sorted = [...data].sort((a, b) => b.returns[period] - a.returns[period]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Sector & Industry Analysis
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          4-level hierarchy analysis with performance metrics and RRG plots
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      {selectedPath.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className="hover:underline"
            style={{ color: "var(--accent-brand)" }}
          >
            All Sectors
          </button>
          {selectedPath.map((pathId, idx) => {
            const node = data.find(n => n.id === pathId);
            return (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
                <button
                  onClick={() => handleBreadcrumbClick(idx)}
                  className="hover:underline"
                  style={{ color: idx === selectedPath.length - 1 ? "var(--text-primary)" : "var(--accent-brand)" }}
                >
                  {node?.name || pathId}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Level Indicator */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Viewing: {LEVEL_LABELS[currentLevel]}
        </span>
        <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
          {sorted.length} items
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Period selector */}
        <div className="flex gap-1 flex-wrap">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: period === p ? "var(--selection-bg)" : "var(--surface-elevated)",
                color: period === p ? "var(--selection-text)" : "var(--text-secondary)",
                border: `1px solid ${period === p ? "var(--selection-border)" : "var(--border)"}`,
              }}>
              {p}
            </button>
          ))}
        </div>

        {/* View selector */}
        <div className="flex gap-1">
          {[
            { id: "heatmap", label: "Heatmap", icon: BarChart3 },
            { id: "table", label: "Table", icon: TrendingUp },
            { id: "rrg", label: "RRG Plot", icon: Activity },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setView(v.id as "heatmap" | "table" | "rrg")}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
              style={{
                background: view === v.id ? "var(--selection-bg)" : "var(--surface-elevated)",
                color: view === v.id ? "var(--selection-text)" : "var(--text-secondary)",
                border: `1px solid ${view === v.id ? "var(--selection-border)" : "var(--border)"}`,
              }}
            >
              <v.icon size={14} />
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--accent-brand)", borderTopColor: "transparent" }} />
        </div>
      )}

      {/* Heatmap View */}
      {!loading && view === "heatmap" && (
        <SectorHeatmap
          data={sorted.map(node => ({
            id: node.id,
            name: node.name,
            return: node.returns[period],
            pe: node.pe,
            pb: node.pb,
            marketCapPct: node.marketCapPct,
            stockCount: node.stockCount,
          }))}
          onSectorClick={handleDrillDown}
          columns={4}
        />
      )}

      {/* RRG Plot View */}
      {!loading && view === "rrg" && (
        <div>
          <RRGPlot
            data={rrgData}
            title={`RRG Plot - ${LEVEL_LABELS[currentLevel]} (${period})`}
            showLabels={true}
            height={600}
          />
          <div className="mt-4 p-4 rounded-lg border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Stock Filtering Criteria</h4>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              RRG plots include stocks with: Market Cap ≥ ₹500 Cr, Avg Volume ≥ ₹1 Cr/day, Price ≥ ₹10, Last traded within 30 days
            </p>
          </div>
        </div>
      )}

      {/* Table View */}
      {!loading && view === "table" && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
                <th className="text-left px-4 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>
                  {LEVEL_LABELS[currentLevel].slice(0, -1)}
                </th>
                {PERIODS.map(p => (
                  <th key={p} className="text-right px-3 py-2.5 font-semibold" style={{ color: period === p ? "var(--accent-brand)" : "var(--text-muted)" }}>
                    {p}
                  </th>
                ))}
                <th className="text-right px-3 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>P/E</th>
                <th className="text-right px-3 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>Stocks</th>
                <th className="text-right px-3 py-2.5 font-semibold" style={{ color: "var(--text-muted)" }}>Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((node, i) => (
                <tr
                  key={node.id}
                  onClick={() => handleDrillDown(node.id)}
                  className="cursor-pointer hover:bg-opacity-50"
                  style={{
                    borderBottom: i < sorted.length - 1 ? "1px solid var(--border)" : "none",
                    background: "var(--surface)",
                  }}
                >
                  <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-primary)" }}>
                    <div className="flex items-center gap-2">
                      {node.name}
                      {currentLevel !== "sub_industry" && <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />}
                    </div>
                  </td>
                  {PERIODS.map(p => {
                    const r = node.returns[p];
                    return (
                      <td key={p} className="text-right px-3 py-2.5 font-mono font-semibold"
                        style={{ color: r > 0 ? "#10B981" : r < 0 ? "#EF4444" : "var(--text-muted)" }}>
                        {r > 0 ? "+" : ""}{r.toFixed(1)}%
                      </td>
                    );
                  })}
                  <td className="text-right px-3 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>
                    {node.pe?.toFixed(1) || "—"}
                  </td>
                  <td className="text-right px-3 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>
                    {node.stockCount}
                  </td>
                  <td className="text-right px-3 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>
                    {node.marketCapPct ? `${node.marketCapPct.toFixed(1)}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
