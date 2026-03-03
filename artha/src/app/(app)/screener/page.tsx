"use client";

import Link from "next/link";
import { SlidersHorizontal, TrendingUp, ChevronRight, Bookmark, Clock } from "lucide-react";

const PRESET_SCREENS = [
  { name: "High ROCE Stocks", desc: "ROCE > 20%, Debt/Equity < 0.5", formula: "roce > 20 and debt_equity < 0.5", tags: ["Quality"] },
  { name: "Undervalued Gems", desc: "PE < 15, ROE > 15%, Market Cap > 500Cr", formula: "pe < 15 and roe > 15 and mcap > 500", tags: ["Value"] },
  { name: "Momentum Leaders", desc: "RSI(14) > 60, price > sma(50) > sma(200)", formula: "rsi(14) > 60 and price ca sma(50)", tags: ["Momentum"] },
  { name: "Dividend Champions", desc: "Dividend yield > 3%, consistent payers", formula: "div_yield > 3 and roce > 15", tags: ["Income"] },
  { name: "Growth at Fair Price", desc: "PEG < 1.5, Revenue growth > 20%", formula: "pe < 25 and rev_growth_1y > 20", tags: ["Growth"] },
  { name: "Technically Oversold", desc: "RSI below 30, near 52-week low", formula: "rsi(14) < 30 and pct_52w_low < 10", tags: ["Technical"] },
];

export default function ScreenerHomePage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Stock Screener</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Filter stocks from the NSE/BSE universe using a powerful formula builder
        </p>
      </div>

      {/* Primary CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/screener/run"
          className="group flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 p-5 transition-colors"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
            <SlidersHorizontal className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground text-[15px] flex items-center gap-1.5">
              Build Your Screen
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Use the formula builder or visual builder to create custom filters
            </p>
          </div>
        </Link>

        <Link
          href="/mf-screener"
          className="group flex items-center gap-4 rounded-xl border border-border hover:border-border/80 bg-card hover:bg-muted/30 p-5 transition-colors"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <TrendingUp className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground text-[15px] flex items-center gap-1.5">
              Mutual Fund Screener
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Screen mutual funds by category, returns, expense ratio, and more
            </p>
          </div>
        </Link>
      </div>

      {/* Preset screens */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Preset Screens</h2>
          <Link href="/screener/run" className="text-xs text-amber-500 hover:text-amber-400 transition-colors">
            Create custom →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_SCREENS.map((screen) => (
            <Link
              key={screen.name}
              href={`/screener/run?formula=${encodeURIComponent(screen.formula)}`}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-card hover:border-amber-500/30 hover:bg-amber-500/5 p-4 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-[13px] text-foreground leading-tight">{screen.name}</span>
                <Bookmark className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-amber-500/60 transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{screen.desc}</p>
              <div className="flex items-center gap-1.5 mt-auto pt-1">
                {screen.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-[11px] text-amber-500/70 group-hover:text-amber-500 transition-colors font-medium">
                  Run →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent screens placeholder */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Recent Screens</h2>
        </div>
        <div className="rounded-lg border border-border border-dashed bg-card/50 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">No saved screens yet.</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Run a screen and save it to see it here.</p>
        </div>
      </div>
    </div>
  );
}
