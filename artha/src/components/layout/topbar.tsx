"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bookmark,
  ChevronDown,
  User,
  Bell,
  Palette,
  Settings,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { apiGet } from "@/lib/api-client";
import type { StockSummary } from "@/lib/api-types";
import { useWatchlist } from "@/contexts/watchlist-context";
import { useTheme, type Theme } from "@/contexts/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PROFILE_MENU_THEME_OPTIONS: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export function TopBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: number; symbol: string; name: string }[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleWatchlist } = useWatchlist();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); setSearchOpen(false); return; }
    const timer = setTimeout(async () => {
      try {
        const data = await apiGet<{ results: StockSummary[] }>("/api/search", { q: search, limit: 8 });
        setSearchResults((data.results ?? []).map((item, index) => ({
          id: Number(item.id ?? index),
          symbol: item.symbol,
          name: item.name,
        })));
        setSearchOpen(true);
      } finally { /* noop */ }
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

  const openSettings = (section?: "profile" | "notifications" | "appearance") => {
    router.push(section ? `/settings?section=${section}` : "/settings");
  };

  return (
    <header
      className="sticky top-0 z-50 flex h-16 w-full min-w-0 items-center justify-between border-b px-3 md:px-5 shrink-0 backdrop-blur-xl"
      style={{ background: "color-mix(in srgb, var(--surface) 92%, transparent)", borderColor: "var(--border)" }}
    >

      {/* Left: Logo */}
      <div className="flex min-w-0 shrink-0 items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{ background: "var(--brand-tint)", borderColor: "color-mix(in srgb, var(--brand-primary) 20%, var(--border) 80%)" }}
          >
            <Logo className="h-7 w-7 text-[var(--brand-primary)]" />
          </div>
          <span className="font-bold text-[17px] tracking-tight" style={{ color: "var(--text-primary)" }}>
            Artha
          </span>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex min-w-0 flex-1 justify-center px-2 md:px-4">
        <div ref={searchRef} className="relative w-full max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }} />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => { if (searchResults.length > 0) setSearchOpen(true); }}
            placeholder="Search stocks, e.g. Reliance, TCS…"
            className="pl-9 text-sm w-full rounded-xl"
            style={{ background: "var(--surface)", color: "var(--text-primary)", borderColor: "var(--border)" }}
          />
          {searchOpen && searchResults.length > 0 && (
            <div
              className="absolute top-full mt-2 w-full rounded-2xl border shadow-lg overflow-hidden z-50"
              style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              {searchResults.map(r => (
                <button key={`${r.symbol}-${r.id}`}
                  className="w-full flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-[var(--surface-hover)]"
                  style={{ borderBottom: "1px solid color-mix(in srgb, var(--border) 58%, transparent)" }}
                  onClick={() => { router.push(`/stocks/${r.symbol}`); setSearchOpen(false); setSearch(""); }}>
                  <span
                    className="inline-flex min-w-[68px] items-center justify-center rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
                    style={{ color: "var(--brand-primary)", background: "var(--brand-tint)" }}
                  >
                    {r.symbol}
                  </span>
                  <span className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex shrink-0 items-center gap-2 justify-end">
        {/* Watchlist */}
        <button
          onClick={toggleWatchlist}
          className="relative flex h-[var(--control-height)] items-center gap-2 rounded-lg border px-3 transition-all active:scale-95 group"
          style={{ color: "var(--brand-primary)", background: "var(--brand-tint)", borderColor: "transparent" }}
          title="Watchlist"
        >
          <Bookmark size={16} className="transition-colors group-hover:text-[var(--brand-hover)]" />
          <span className="text-xs font-semibold transition-colors group-hover:text-[var(--brand-hover)]">Watchlist</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="topbar-profile-menu-trigger"
              type="button"
              className="ml-1 flex h-10 items-center gap-1 rounded-full border px-1.5 transition-colors"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-card)",
              }}
              title="Profile menu"
              aria-label="Open profile menu"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: "var(--brand-primary)", color: "#fff" }}
              >
                RK
              </span>
              <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            id="topbar-profile-menu-content"
            align="end"
            sideOffset={10}
            className="w-64 rounded-2xl border p-1.5"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "var(--brand-primary)", color: "#fff" }}
                >
                  RK
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Rahul Kumar
                  </div>
                  <div className="truncate text-xs" style={{ color: "var(--text-secondary)" }}>
                    rahul@example.com
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => openSettings("profile")} className="rounded-xl px-3 py-2.5">
              <User size={15} style={{ color: "var(--brand-primary)" }} />
              <span>Profile & Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openSettings("notifications")} className="rounded-xl px-3 py-2.5">
              <Bell size={15} style={{ color: "var(--brand-primary)" }} />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openSettings("appearance")} className="rounded-xl px-3 py-2.5">
              <Palette size={15} style={{ color: "var(--brand-primary)" }} />
              <span>Appearance</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openSettings()} className="rounded-xl px-3 py-2.5">
              <Settings size={15} style={{ color: "var(--brand-primary)" }} />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="px-3 pb-1 pt-2 text-[11px] uppercase tracking-[0.08em]">
              Quick Theme
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
              {PROFILE_MENU_THEME_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuRadioItem
                    key={option.id}
                    value={option.id}
                    className="rounded-xl px-3 py-2.5"
                  >
                    <Icon size={15} style={{ color: "var(--brand-primary)" }} />
                    <span>{option.label}</span>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
