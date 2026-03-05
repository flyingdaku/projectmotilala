"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { WatchlistPanel } from "./WatchlistPanel";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useWatchlist } from "@/contexts/watchlist-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isWatchlistOpen } = useWatchlist();
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className={cn(
          "flex-1 overflow-y-auto z-0 relative transition-all duration-300 ease-in-out",
          isWatchlistOpen ? "mr-96" : "mr-0"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-full p-8 flex justify-center"
            >
              <div className="w-full max-w-[1400px]">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        <WatchlistPanel />
      </div>
    </div>
  );
}
