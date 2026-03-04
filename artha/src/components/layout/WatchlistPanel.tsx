"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, TrendingUp, TrendingDown, Star } from "lucide-react";
import { useWatchlist } from "@/contexts/watchlist-context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WatchlistItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
    pctChange: number;
}

const MOCK_WATCHLIST: WatchlistItem[] = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2984.50, change: 12.40, pctChange: 0.42 },
    { symbol: "TCS", name: "TATA Consultancy Services", price: 4120.30, change: -45.20, pctChange: -1.08 },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1642.15, change: 5.60, pctChange: 0.34 },
    { symbol: "INFY", name: "Infosys Ltd", price: 1540.00, change: -12.30, pctChange: -0.79 },
];

export function WatchlistPanel() {
    const { isWatchlistOpen, closeWatchlist } = useWatchlist();
    const [search, setSearch] = useState("");

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeWatchlist();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeWatchlist]);

    return (
        <AnimatePresence>
            {isWatchlistOpen && (
                <>
                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute right-0 top-0 bottom-0 w-80 z-30 border-l flex flex-col"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)"
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-transparent to-[var(--surface-elevated)]" style={{ borderColor: "var(--border)" }}>
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-[var(--accent-brand)] fill-[var(--accent-brand)]" />
                                <h2 className="font-bold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>Watchlist</h2>
                            </div>
                            <button
                                onClick={closeWatchlist}
                                className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-all active:scale-90"
                                style={{ color: "var(--text-muted)" }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="p-3">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Find in watchlist..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)]"
                                    style={{
                                        background: "var(--background)",
                                        borderColor: "var(--border)",
                                        color: "var(--text-primary)"
                                    }}
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto px-2 pb-4">
                            <div className="space-y-1">
                                {MOCK_WATCHLIST.map((item) => (
                                    <Link
                                        key={item.symbol}
                                        href={`/stocks/${item.symbol}`}
                                        onClick={closeWatchlist}
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-all group"
                                    >
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>{item.symbol}</span>
                                            <span className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{item.name}</span>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0">
                                            <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                                                {item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                            </span>
                                            <div className={cn(
                                                "flex items-center gap-1 text-[10px] font-medium",
                                                item.change >= 0 ? "text-green-500" : "text-red-500"
                                            )}>
                                                {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                                <span>{item.pctChange > 0 ? "+" : ""}{item.pctChange.toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {MOCK_WATCHLIST.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
                                    <Star size={32} className="text-[var(--text-muted)] opacity-20" />
                                    <p className="text-xs text-[var(--text-muted)] px-8">
                                        Your watchlist is empty. Add stocks to track them here.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
                            <Link
                                href="/watchlist"
                                onClick={closeWatchlist}
                                className="flex items-center justify-center w-full py-2.5 rounded-lg text-xs font-bold transition-all border hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]"
                                style={{
                                    background: "var(--surface-elevated)",
                                    borderColor: "var(--border)",
                                    color: "var(--text-secondary)"
                                }}
                            >
                                Expand Watchlist
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
