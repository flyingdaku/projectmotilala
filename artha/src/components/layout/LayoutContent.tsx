'use client';

import { WatchlistPanel } from "@/components/charting/widgets/WatchlistPanel";
import { useWatchlist } from "@/contexts/watchlist-context";
import { Toaster } from "sonner";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { isWatchlistOpen, closeWatchlist } = useWatchlist();

  return (
    <>
      {children}
      {isWatchlistOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex">
          <div className="w-80 border-l border-border bg-background">
            <WatchlistPanel onClose={closeWatchlist} />
          </div>
        </div>
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          },
        }}
      />
    </>
  );
}
