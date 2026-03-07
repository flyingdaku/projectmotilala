"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { WatchlistPanel } from "./WatchlistPanel";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useWatchlist } from "@/contexts/watchlist-context";
import { cn } from "@/lib/utils";
import { DEFAULT_WATCHLIST_CONFIG, getWatchlistPanelWidth, type WatchlistConfig } from "@/components/charting/widgets/WatchlistPanel";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isWatchlistOpen } = useWatchlist();
  const [watchlistConfig, setWatchlistConfig] = useState<WatchlistConfig>(DEFAULT_WATCHLIST_CONFIG);
  const watchlistWidth = isWatchlistOpen ? getWatchlistPanelWidth(watchlistConfig) : 0;
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <TopBar />
      <div className="relative flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main
          className={cn(
            "relative z-0 flex-1"
          )}
          style={{ marginRight: watchlistWidth }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-full justify-center p-8"
            >
              <div className="w-full">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        <WatchlistPanel config={watchlistConfig} onConfigChange={setWatchlistConfig} />
      </div>
    </div>
  );
}
