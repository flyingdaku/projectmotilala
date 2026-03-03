"use client";

import { useState } from "react";
import { Search, Plus, Bell, BellOff, Trash2, Star, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { PnLBadge } from "@/components/ui/pnl-badge";
import { formatINR } from "@/lib/utils";

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
  alert: boolean;
  tags: string[];
}

const WATCH_ITEMS: WatchItem[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", ltp: 2891.4, change: 38.5, changePct: 1.35, high52: 3024.9, low52: 2180.0, mcap: 19.5, pe: 24.2, alert: true, tags: ["Energy", "Large Cap"] },
  { symbol: "INFY", name: "Infosys Ltd", ltp: 1724.5, change: 35.8, changePct: 2.12, high52: 1903.3, low52: 1358.35, mcap: 7.3, pe: 28.4, alert: false, tags: ["IT", "Large Cap"] },
  { symbol: "HDFCBANK", name: "HDFC Bank", ltp: 1543.8, change: -12.3, changePct: -0.79, high52: 1794.0, low52: 1363.45, mcap: 11.8, pe: 19.8, alert: true, tags: ["Banking", "Large Cap"] },
  { symbol: "TCS", name: "Tata Consultancy", ltp: 4156.2, change: -59.4, changePct: -1.41, high52: 4592.25, low52: 3311.0, mcap: 15.1, pe: 31.2, alert: false, tags: ["IT", "Large Cap"] },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", ltp: 7234.1, change: 121.3, changePct: 1.71, high52: 8192.0, low52: 6187.8, mcap: 4.4, pe: 32.1, alert: false, tags: ["NBFC"] },
  { symbol: "PIIND", name: "PI Industries", ltp: 3842.7, change: 64.2, changePct: 1.7, high52: 4890.5, low52: 3212.0, mcap: 0.58, pe: 38.4, alert: false, tags: ["Agrochemicals", "Mid Cap"] },
  { symbol: "DIXIND", name: "Dixon Technologies", ltp: 12840.5, change: -220.4, changePct: -1.69, high52: 19000.0, low52: 9850.0, mcap: 0.77, pe: 84.2, alert: true, tags: ["Electronics", "Mid Cap"] },
  { symbol: "ZOMATO", name: "Zomato Ltd", ltp: 242.8, change: 4.1, changePct: 1.72, high52: 304.7, low52: 128.4, mcap: 2.14, pe: null, alert: false, tags: ["Internet", "New Age"] },
];

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchItem[]>(WATCH_ITEMS);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "changePct" | "mcap">("changePct");

  const filtered = items
    .filter(i => search === "" || i.symbol.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : sortBy === "changePct" ? b.changePct - a.changePct : b.mcap - a.mcap);

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
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          Sort:
          {(["changePct", "mcap", "name"] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              className="px-2.5 py-1.5 rounded-md font-medium transition-colors border"
              style={{
                background: sortBy === s ? "var(--accent-subtle)" : "transparent",
                color: sortBy === s ? "var(--accent-brand)" : "var(--text-muted)",
                borderColor: sortBy === s ? "var(--accent-brand)" : "var(--border)",
              }}>
              {s === "changePct" ? "% Change" : s === "mcap" ? "Mkt Cap" : "Name"}
            </button>
          ))}
        </div>
      </div>

      {/* Watchlist grid */}
      <div className="grid gap-3">
        {filtered.map(item => (
          <div key={item.symbol} className="rounded-xl border p-4 flex items-center gap-4 hover:border-amber-500/30 transition-colors"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <Link href={`/stocks/${item.symbol}`} className="flex-1 min-w-0 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
                {item.symbol.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.symbol}</div>
                <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{item.name}</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {item.tags.map(t => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                      style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-6 text-xs shrink-0">
              <div className="text-right">
                <div className="font-mono font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  ₹{item.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <PnLBadge value={item.changePct} type="percent" />
              </div>
              <div className="text-right hidden md:block">
                <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>52W Range</div>
                <div className="font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>
                  {item.low52.toLocaleString("en-IN", { maximumFractionDigits: 0 })} – {item.high52.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>P/E</div>
                <div className="font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>{item.pe ?? "—"}</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Mkt Cap</div>
                <div className="font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>₹{item.mcap}T</div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleAlert(item.symbol)}
                className="p-2 rounded-lg transition-colors hover:bg-white/5"
                title={item.alert ? "Disable alert" : "Enable alert"}
                style={{ color: item.alert ? "var(--accent-brand)" : "var(--text-muted)" }}>
                {item.alert ? <Bell size={14} /> : <BellOff size={14} />}
              </button>
              <button onClick={() => removeItem(item.symbol)}
                className="p-2 rounded-lg transition-colors hover:bg-rose-500/10"
                style={{ color: "var(--text-muted)" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Star size={32} className="mx-auto mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No stocks in watchlist yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
