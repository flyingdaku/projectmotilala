"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SectorData {
  id: string;
  name: string;
  return: number;
  pe?: number;
  pb?: number;
  marketCapPct?: number;
  stockCount?: number;
}

interface Props {
  data: SectorData[];
  onSectorClick?: (sectorId: string) => void;
  columns?: number;
}

function colorForReturn(r: number) {
  if (r > 5) return "#10B981";
  if (r > 2) return "#34D399";
  if (r > 0) return "#6EE7B7";
  if (r > -2) return "#FCA5A5";
  if (r > -5) return "#F87171";
  return "#EF4444";
}

export function SectorHeatmap({ data, onSectorClick, columns = 4 }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No sector data available</p>
      </div>
    );
  }

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  }[columns] || "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {data.map(sector => {
        const ret = sector.return;
        const isPos = ret > 0;
        const isNeg = ret < 0;
        
        return (
          <button
            key={sector.id}
            onClick={() => onSectorClick?.(sector.id)}
            className="rounded-xl p-4 border flex flex-col gap-1 transition-all hover:scale-[1.02] hover:shadow-lg text-left"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <span className="text-[11px] font-medium leading-tight line-clamp-2" style={{ color: "var(--text-muted)" }}>
              {sector.name}
            </span>
            
            <span className={`text-lg font-bold font-mono ${isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-gray-400"}`}>
              {isPos ? "+" : ""}{ret.toFixed(1)}%
            </span>
            
            <div className="flex items-center gap-1 mt-1">
              {isPos ? <TrendingUp size={11} className="text-emerald-500" /> : isNeg ? <TrendingDown size={11} className="text-rose-500" /> : <Minus size={11} />}
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {sector.pe ? `P/E ${sector.pe.toFixed(1)}` : ""}
                {sector.pe && sector.pb ? " · " : ""}
                {sector.pb ? `P/B ${sector.pb.toFixed(1)}` : ""}
              </span>
            </div>
            
            {sector.stockCount && (
              <span className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {sector.stockCount} stocks
              </span>
            )}
            
            <div className="h-1 rounded-full mt-2" style={{ background: colorForReturn(ret) + "60" }}>
              <div 
                className="h-1 rounded-full transition-all" 
                style={{ 
                  width: `${Math.min(100, Math.abs(ret) * 2)}%`, 
                  background: colorForReturn(ret) 
                }} 
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
