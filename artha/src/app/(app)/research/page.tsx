"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { formatINR } from "@/lib/utils";

const SCREENER_DATA = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", mcap: 1950000000000, pe: 24.2, pb: 2.1, roe: 9.8, changePct: 1.4, ltp: 2891 },
  { symbol: "INFY", name: "Infosys Ltd", sector: "IT", mcap: 730000000000, pe: 28.4, pb: 7.2, roe: 31.2, changePct: 2.1, ltp: 1724 },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", mcap: 1180000000000, pe: 19.8, pb: 2.8, roe: 16.4, changePct: -0.8, ltp: 1544 },
  { symbol: "TCS", name: "Tata Consultancy", sector: "IT", mcap: 1510000000000, pe: 31.2, pb: 13.4, roe: 48.1, changePct: -1.4, ltp: 4156 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "NBFC", mcap: 440000000000, pe: 32.1, pb: 6.8, roe: 22.4, changePct: 1.7, ltp: 7234 },
  { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", mcap: 270000000000, pe: 22.4, pb: 4.1, roe: 18.9, changePct: 0.9, ltp: 513 },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking", mcap: 350000000000, pe: 14.2, pb: 1.9, roe: 14.8, changePct: 0.4, ltp: 1125 },
  { symbol: "MARUTI", name: "Maruti Suzuki", sector: "Auto", mcap: 298000000000, pe: 28.9, pb: 4.8, roe: 17.2, changePct: -3.2, ltp: 9876 },
];

const SECTORS = ["All", "IT", "Banking", "Energy", "NBFC", "Auto"];

function formatMcap(v: number): string {
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(1)}T`;
  if (v >= 1e9) return `₹${(v / 1e9).toFixed(0)}B`;
  return `₹${(v / 1e6).toFixed(0)}M`;
}

function EquityScreener() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");

  const filtered = SCREENER_DATA.filter((r) => {
    const matchSearch =
      !search ||
      r.symbol.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase());
    const matchSector = sector === "All" || r.sector === sector;
    return matchSearch && matchSector;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 rounded-md border px-3 py-2 flex-1 max-w-sm transition-colors"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search symbol or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--text-muted)]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          <Filter size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} className="mr-1" />
          {SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap"
              style={
                sector === s
                  ? { background: "var(--accent-brand)", color: "var(--accent-foreground)", borderColor: "var(--accent-brand)" }
                  : { color: "var(--text-muted)", borderColor: "var(--border)", background: "transparent" }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-x-auto custom-scrollbar"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Symbol", "Sector", "Mkt Cap", "LTP", "Change", "P/E", "P/B", "ROE"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-left whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.symbol}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.2 }}
                  className="transition-colors duration-150 cursor-pointer"
                  style={{ height: 52, borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "var(--surface-elevated)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                  }
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                      {row.symbol}
                    </p>
                    <p className="text-xs truncate max-w-[140px]" style={{ color: "var(--text-muted)" }}>
                      {row.name}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className="text-xs rounded px-2 py-1 font-medium"
                      style={{ background: "var(--neutral-subtle)", color: "var(--neutral)" }}
                    >
                      {row.sector}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {formatMcap(row.mcap)}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono font-medium whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                    {formatINR(row.ltp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <PnLBadge value={row.changePct} type="percent" />
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.pe.toFixed(1)}x
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.pb.toFixed(1)}x
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-right whitespace-nowrap">
                    <span style={{ color: row.roe >= 20 ? "var(--positive)" : "var(--text-secondary)" }}>
                      {row.roe.toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  No stocks found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

import { FUND_DATA, type AssetClass, type FundCategory } from "@/lib/fund-data";

function FundScreener() {
  const [search, setSearch] = useState("");
  const [assetClass, setAssetClass] = useState<AssetClass | "All">("All");

  const ASSET_CLASSES: (AssetClass | "All")[] = ["All", "Equity", "Debt", "Hybrid", "Commodity"];

  const filtered = FUND_DATA.filter((r) => {
    const matchSearch =
      !search ||
      r.ticker.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase());
    const matchAssetClass = assetClass === "All" || r.assetClass === assetClass;
    return matchSearch && matchAssetClass;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 rounded-md border px-3 py-2 flex-1 max-w-sm transition-colors"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search ticker or fund name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--text-muted)]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          <Filter size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} className="mr-1" />
          {ASSET_CLASSES.map((s) => (
            <button
              key={s}
              onClick={() => setAssetClass(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap"
              style={
                assetClass === s
                  ? { background: "var(--accent-brand)", color: "var(--accent-foreground)", borderColor: "var(--accent-brand)" }
                  : { color: "var(--text-muted)", borderColor: "var(--border)", background: "transparent" }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-x-auto custom-scrollbar"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th rowSpan={2} className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-left whitespace-nowrap border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Fund Info</th>
              <th colSpan={4} className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-center border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--surface-elevated)" }}>Performance</th>
              <th colSpan={3} className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-center border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--surface-elevated)" }}>Risk Measures</th>
              <th colSpan={4} className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-center border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--surface-elevated)" }}>Excess Returns</th>
              <th colSpan={3} className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-center" style={{ color: "var(--text-muted)", background: "var(--surface-elevated)" }}>Details</th>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {/* Performance */}
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>YTD</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>1Y</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>3Y</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>5Y</th>
              {/* Risk */}
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Sharpe</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Sortino</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Volatility</th>
              {/* Excess */}
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Tracking Err</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Info Ratio</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Up Capture</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap border-r" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>Down Capture</th>
              {/* Details */}
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>ER</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>AUM (Cr)</th>
              <th className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Inception</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.ticker}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.2 }}
                  className="transition-colors duration-150 cursor-pointer"
                  style={{ height: 52, borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "var(--surface-elevated)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                  }
                >
                  <td className="px-4 py-3 whitespace-nowrap border-r" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {row.name}
                        </p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {row.ticker}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] rounded px-1.5 py-0.5 font-medium border uppercase tracking-wider block mb-1" style={{ background: "var(--background)", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                          {row.assetClass}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {row.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Performance */}
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: row.returns.ytd >= 0 ? "var(--positive)" : "var(--negative)" }}>
                    {row.returns.ytd >= 0 ? "+" : ""}{row.returns.ytd.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: row.returns.year1 >= 0 ? "var(--positive)" : "var(--negative)" }}>
                    {row.returns.year1 >= 0 ? "+" : ""}{row.returns.year1.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: row.returns.year3 >= 0 ? "var(--positive)" : "var(--negative)" }}>
                    {row.returns.year3 >= 0 ? "+" : ""}{row.returns.year3.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap border-r" style={{ color: row.returns.year5 >= 0 ? "var(--positive)" : "var(--negative)", borderColor: "var(--border)" }}>
                    {row.returns.year5 >= 0 ? "+" : ""}{row.returns.year5.toFixed(2)}%
                  </td>
                  
                  {/* Risk */}
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.risk.sharpe.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.risk.sortino.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap border-r" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                    {row.risk.volatility.toFixed(2)}%
                  </td>

                  {/* Excess */}
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.excessReturns.trackingError.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.excessReturns.infoRatio.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.excessReturns.upCapture.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap border-r" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                    {row.excessReturns.downCapture.toFixed(1)}
                  </td>

                  {/* Details */}
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    {row.info.expenseRatio.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-sm font-mono text-right whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                    ₹{row.info.aum.toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-3 text-xs font-mono text-right whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                    {row.info.inceptionDate}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={15} className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  No mutual funds found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<"stocks" | "funds">("funds");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Screeners
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Discover and analyze Indian equities and mutual funds
          </p>
        </div>

        {/* Segmented Control */}
        <div
          className="flex p-1 rounded-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {(["stocks", "funds"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors"
              style={{
                color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="screener-tab"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "stocks" ? (
          <EquityScreener key="stocks" />
        ) : (
          <FundScreener key="funds" />
        )}
      </AnimatePresence>
    </div>
  );
}
