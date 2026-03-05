"use client";

import { useState } from "react";
import { Search, Plus, Bell, BellOff, Trash2, Star, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { formatINR } from "@/lib/utils";
import { getIndustryGroupEmoji } from "@/lib/utils/emojis";

interface WatchItem {
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePct: number;
  high52: number;
  low52: number;
  mcap: number;
  pe: number | null;
  industry: string;
  alert: boolean;
  tags: string[];
}

const WATCH_ITEMS: WatchItem[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", ltp: 2891.4, change: 38.5, changePct: 1.35, high52: 3024.9, low52: 2180.0, mcap: 19.5, pe: 24.2, industry: "Oil&Gas-Integrated", alert: true, tags: ["Energy", "Large Cap"] },
  { symbol: "INFY", name: "Infosys Ltd", ltp: 1724.5, change: 35.8, changePct: 2.12, high52: 1903.3, low52: 1358.35, mcap: 7.3, pe: 28.4, industry: "Computer-Tech Services", alert: false, tags: ["IT", "Large Cap"] },
  { symbol: "HDFCBANK", name: "HDFC Bank", ltp: 1543.8, change: -12.3, changePct: -0.79, high52: 1794.0, low52: 1363.45, mcap: 11.8, pe: 19.8, industry: "Banks-Money Center", alert: true, tags: ["Banking", "Large Cap"] },
  { symbol: "TCS", name: "Tata Consultancy", ltp: 4156.2, change: -59.4, changePct: -1.41, high52: 4592.25, low52: 3311.0, mcap: 15.1, pe: 31.2, industry: "Computer-Tech Services", alert: false, tags: ["IT", "Large Cap"] },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", ltp: 7234.1, change: 121.3, changePct: 1.71, high52: 8192.0, low52: 6187.8, mcap: 4.4, pe: 32.1, industry: "Finance-Consumer Loans", alert: false, tags: ["NBFC"] },
  { symbol: "PIIND", name: "PI Industries", ltp: 3842.7, change: 64.2, changePct: 1.7, high52: 4890.5, low52: 3212.0, mcap: 0.58, pe: 38.4, industry: "Chemicals-Agricultural", alert: false, tags: ["Agrochemicals", "Mid Cap"] },
  { symbol: "DIXIND", name: "Dixon Technologies", ltp: 12840.5, change: -220.4, changePct: -1.69, high52: 19000.0, low52: 9850.0, mcap: 0.77, pe: 84.2, industry: "Electronic-Consumer", alert: true, tags: ["Electronics", "Mid Cap"] },
  { symbol: "ZOMATO", name: "Zomato Ltd", ltp: 242.8, change: 4.1, changePct: 1.72, high52: 304.7, low52: 128.4, mcap: 2.14, pe: null, industry: "Internet-Services", alert: false, tags: ["Internet", "New Age"] },
];

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchItem[]>(WATCH_ITEMS);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof WatchItem>("changePct");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: keyof WatchItem) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const filtered = items
    .filter(i => search === "" || i.symbol.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      // Handle nulls (like P/E) safely for TypeScript
      const safeValA = valA === null || valA === undefined ? -Infinity : valA;
      const safeValB = valB === null || valB === undefined ? -Infinity : valB;

      if (typeof safeValA === "string" && typeof safeValB === "string") {
        return sortOrder === "asc" ? safeValA.localeCompare(safeValB) : safeValB.localeCompare(safeValA);
      }

      if (safeValA < safeValB) return sortOrder === "asc" ? -1 : 1;
      if (safeValA > safeValB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const toggleAlert = (symbol: string) =>
    setItems(prev => prev.map(i => i.symbol === symbol ? { ...i, alert: !i.alert } : i));

  const removeItem = (symbol: string) =>
    setItems(prev => prev.filter(i => i.symbol !== symbol));

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Watchlist</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Track stocks you're interested in across all your watchlists.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--accent-brand)", color: "#000" }}>
          <Plus size={14} />
          Add Stock
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search watchlist..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="rounded-xl border overflow-x-auto" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--surface-hover)" }}>
              <th className="text-left py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("symbol")}>
                Company {sortKey === "symbol" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("industry")}>
                Industry {sortKey === "industry" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("ltp")}>
                LTP (₹) {sortKey === "ltp" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("changePct")}>
                % Chg {sortKey === "changePct" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("low52")}>
                52W Rng {sortKey === "low52" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium hidden lg:table-cell cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("pe")}>
                P/E {sortKey === "pe" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium hidden sm:table-cell cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort("mcap")}>
                Mkt Cap (T) {sortKey === "mcap" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filtered.map(item => (
              <tr key={item.symbol} className="hover:bg-[var(--surface-hover)] transition-colors group">
                <td className="py-3 px-4">
                  <Link href={`/stocks/${item.symbol}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{item.symbol}</div>
                      <div className="text-[11px] truncate max-w-[140px]" style={{ color: "var(--text-muted)" }}>{item.name}</div>
                    </div>
                  </Link>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" title={item.industry}>{getIndustryGroupEmoji(item.industry)}</span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.industry.split('-')[0]}</span>
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                    {item.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <PnLBadge value={item.changePct} type="percent" />
                </td>

                <td className="py-3 px-4 text-right hidden md:table-cell">
                  <div className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                    {item.low52.toLocaleString("en-IN", { maximumFractionDigits: 0 })} – {item.high52.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </div>
                </td>

                <td className="py-3 px-4 text-right hidden lg:table-cell">
                  <div className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{item.pe ?? "—"}</div>
                </td>

                <td className="py-3 px-4 text-right hidden sm:table-cell">
                  <div className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                    {item.mcap.toFixed(2)}
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleAlert(item.symbol)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                      title={item.alert ? "Disable alert" : "Enable alert"}
                      style={{ color: item.alert ? "var(--accent-brand)" : "var(--text-muted)" }}>
                      {item.alert ? <Bell size={14} /> : <BellOff size={14} />}
                    </button>
                    <button onClick={() => removeItem(item.symbol)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-rose-500/10"
                      style={{ color: "var(--text-muted)" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <Star size={32} className="mx-auto mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No stocks in watchlist yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
