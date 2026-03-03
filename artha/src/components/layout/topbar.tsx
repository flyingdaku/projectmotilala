"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Settings, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useWatchlist } from "@/contexts/watchlist-context";

export function TopBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ symbol: string; name: string }[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleWatchlist } = useWatchlist();

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); setSearchOpen(false); return; }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}&limit=8`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results ?? []);
          setSearchOpen(true);
        }
      } finally { setSearchLoading(false); }
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b shrink-0"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

      {/* Left: Logo */}
      <div className="flex items-center gap-2 min-w-[180px]">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <Logo className="text-[var(--accent-brand)]" />
          <span className="font-bold text-[17px] tracking-tight" style={{ color: "var(--text-primary)" }}>
            Artha
          </span>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-2xl px-4">
        <div ref={searchRef} className="relative w-full max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }} />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => { if (searchResults.length > 0) setSearchOpen(true); }}
            placeholder="Search stocks, e.g. Reliance, TCS…"
            className="pl-9 h-9 text-sm w-full"
            style={{ background: "var(--background)", color: "var(--text-primary)", borderColor: "var(--border)" }}
          />
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-1.5 w-full rounded-lg border shadow-lg overflow-hidden z-50"
              style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
              {searchResults.map(r => (
                <button key={r.symbol}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[var(--surface-hover)] transition-colors"
                  onClick={() => { router.push(`/stocks/${r.symbol}`); setSearchOpen(false); setSearch(""); }}>
                  <span className="font-mono font-semibold text-sm" style={{ color: "var(--accent-brand)" }}>{r.symbol}</span>
                  <span className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 min-w-[180px] justify-end">
        {/* Watchlist */}
        <button
          onClick={toggleWatchlist}
          className="relative p-2 rounded-md transition-colors hover:bg-[var(--surface-elevated)]"
          style={{ color: "var(--text-muted)" }} title="Watchlist">
          <BarChart2 size={17} />
        </button>
      </div>
    </header>
  );
}
