"use client";

import { TrendingUp, Construction } from "lucide-react";
import Link from "next/link";

export default function MFScreenerPage() {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Mutual Fund Screener</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Filter mutual funds by category, returns, AUM, expense ratio, and more
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-24 gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center max-w-sm">
          <h2 className="text-base font-semibold text-foreground">Coming Soon</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            The MF Screener is under development. In the meantime, try the Stock Screener.
          </p>
        </div>
        <Link
          href="/screener/run"
          className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-4 py-2 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          Go to Stock Screener
        </Link>
      </div>
    </div>
  );
}
