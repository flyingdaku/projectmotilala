"use client";

import { useState, useCallback } from "react";
import ConditionBuilder from "@/components/screener/ConditionBuilder";
import type { ScreenerFilters } from "@/lib/data/types";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, TrendingDown, Minus, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ScreenerResult {
  symbol: string;
  name: string;
  sector?: string;
  marketCapCr?: number;
  price?: number;
  pctChange?: number;
  pe?: number;
  pb?: number;
  roce?: number;
  roe?: number;
  rsi14?: number;
}

export default function ScreenerRunPage() {
  const [filters, setFilters] = useState<ScreenerFilters>({});
  const [results, setResults] = useState<ScreenerResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [rulesViewMode, setRulesViewMode] = useState<'list' | 'formula'>('list');

  const handleRun = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/screener/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResults(data.results ?? []);
      setTotalCount(data.total ?? data.results?.length ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  return (
    <div className="space-y-5 pb-20 overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Stock Screener</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Build a formula to filter stocks from NSE/BSE universe
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setRulesViewMode(rulesViewMode === 'list' ? 'formula' : 'list')}
          className="h-7 text-xs gap-1.5 cursor-pointer">
          <Code2 className="w-3 h-3" />
          {rulesViewMode === 'list' ? 'Show DSL' : 'Show List'}
        </Button>
      </div>

      {/* Condition Builder */}
      <ConditionBuilder
        filters={filters}
        onChange={setFilters}
        onRun={handleRun}
        rulesViewMode={rulesViewMode}
      />

      {/* Results */}
      {isLoading && (
        <div className="flex items-center gap-2 py-12 justify-center text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Running screen…</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {results === null && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20">
          <TrendingUp className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Screen Stocks</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
            Build your criteria using the formula builder above, then click "Run Screen" to filter stocks from the NSE/BSE universe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg text-xs">
            <div className="text-center p-3 rounded-lg bg-card border border-border">
              <div className="font-medium text-foreground mb-1">Technical</div>
              <div className="text-muted-foreground">RSI, Moving Averages, MACD</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-card border border-border">
              <div className="font-medium text-foreground mb-1">Fundamental</div>
              <div className="text-muted-foreground">PE, ROE, ROCE, Debt/Equity</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-card border border-border">
              <div className="font-medium text-foreground mb-1">Valuation</div>
              <div className="text-muted-foreground">PEG, PB, EV/EBITDA</div>
            </div>
          </div>
        </div>
      )}

      {results !== null && !isLoading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalCount}</span> stocks matched
            </p>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20">
              <TrendingUp className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">No stocks matched</h3>
              <p className="text-xs text-muted-foreground text-center max-w-sm">
                Try relaxing your filters or check your formula syntax. Consider using broader ranges or fewer conditions.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sector</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mkt Cap</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chg%</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">PE</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">PB</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">ROCE%</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">RSI(14)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {results.map((r, i) => {
                      const isPos = (r.pctChange ?? 0) > 0;
                      const isNeg = (r.pctChange ?? 0) < 0;
                      return (
                        <tr key={r.symbol} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">{i + 1}</td>
                          <td className="px-4 py-2.5">
                            <Link href={`/stocks/${r.symbol}`} className="hover:text-amber-500 transition-colors">
                              <div className="font-medium text-foreground text-[13px]">{r.symbol}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">{r.name}</div>
                            </Link>
                          </td>
                          <td className="px-4 py-2.5">
                            {r.sector && (
                              <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{r.sector}</Badge>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-right text-[13px] font-mono text-foreground">
                            {r.marketCapCr ? `₹${(r.marketCapCr / 100).toFixed(0)}B` : "—"}
                          </td>
                          <td className="px-4 py-2.5 text-right text-[13px] font-mono text-foreground">
                            {r.price != null ? `₹${r.price.toFixed(2)}` : "—"}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {r.pctChange != null ? (
                              <span className={`inline-flex items-center gap-0.5 text-[13px] font-mono font-medium ${isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-muted-foreground"}`}>
                                {isPos ? <TrendingUp className="w-3 h-3" /> : isNeg ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                {r.pctChange > 0 ? "+" : ""}{r.pctChange.toFixed(2)}%
                              </span>
                            ) : "—"}
                          </td>
                          <td className="px-4 py-2.5 text-right text-[13px] font-mono text-foreground">{r.pe?.toFixed(1) ?? "—"}</td>
                          <td className="px-4 py-2.5 text-right text-[13px] font-mono text-foreground">{r.pb?.toFixed(2) ?? "—"}</td>
                          <td className="px-4 py-2.5 text-right text-[13px] font-mono text-foreground">{r.roce != null ? `${r.roce.toFixed(1)}%` : "—"}</td>
                          <td className="px-4 py-2.5 text-right">
                            {r.rsi14 != null ? (
                              <span className={`text-[13px] font-mono font-medium ${r.rsi14 > 70 ? "text-rose-500" : r.rsi14 < 30 ? "text-emerald-500" : "text-foreground"}`}>
                                {r.rsi14.toFixed(1)}
                              </span>
                            ) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
