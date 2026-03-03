"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SectionNav } from "@/components/stock/SectionNav";
import { OverviewSection } from "@/components/stock/OverviewSection";
import { EmbeddedChart } from "@/components/charting/EmbeddedChart";
import { FinancialsSection } from "@/components/stock/FinancialsSection";
import { OwnershipSection } from "@/components/stock/OwnershipSection";
import { DocumentsSection } from "@/components/stock/DocumentsSection";
import { AnalyticsSection } from "@/components/stock/AnalyticsSection";
import { PeersSection } from "@/components/stock/PeersSection";
import { AISection } from "@/components/stock/AISection";
import { FollowButton } from "@/components/stock/FollowButton";
import type { StockDetail } from "@/lib/data";
import type { CompanyProfile } from "@/lib/data/types";

export default function StockPage() {
  const params = useParams();
  const symbol = (params?.symbol as string ?? "").toUpperCase();

  const [stock, setStock] = useState<StockDetail | null>(null);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    fetch(`/api/stocks/${symbol}/overview`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then(data => {
        if (!data) return;
        setStock(data.stock ?? null);
        setProfile(data.profile ?? null);
      })
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--accent-brand)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (notFound || !stock) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Stock not found: {symbol}</p>
        <Link href="/screener" className="text-sm underline" style={{ color: "var(--accent-brand)" }}>
          ← Back to Screener
        </Link>
      </div>
    );
  }

  const isPos = (stock.pctChange1d ?? 0) > 0;
  const isNeg = (stock.pctChange1d ?? 0) < 0;

  return (
    <div className="-mx-8 -mt-8 w-[calc(100%+4rem)]">
      {/* Stock Header */}
      <div className="px-8 pt-6 pb-4 border-b" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <Link href="/screener" className="inline-flex items-center gap-1 text-xs mb-3 hover:underline"
            style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={12} /> Screener
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            {/* Left: Name + badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{stock.name}</h1>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold"
                  style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  {stock.nseSymbol ?? stock.symbol}
                </span>
                {stock.bseCode && (
                  <span className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: "var(--surface-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                    BSE: {stock.bseCode}
                  </span>
                )}
                {stock.sector && (
                  <span className="text-xs px-2 py-0.5 rounded"
                    style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {stock.sector}
                  </span>
                )}
              </div>

              {/* Price row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-bold font-mono tracking-tight" style={{ color: "var(--text-primary)" }}>
                  ₹{stock.price?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "—"}
                </span>
                {stock.pctChange1d != null && (
                  <span className={`flex items-center gap-1 text-sm font-semibold font-mono ${isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-muted-foreground"}`}>
                    {isPos ? <TrendingUp size={14} /> : isNeg ? <TrendingDown size={14} /> : <Minus size={14} />}
                    {isPos ? "+" : ""}{stock.pctChange1d.toFixed(2)}%
                  </span>
                )}
              </div>

              {/* Key metrics row */}
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                {[
                  { label: "Mkt Cap", value: stock.marketCapCr ? `₹${(stock.marketCapCr / 100).toFixed(1)}B Cr` : "—" },
                  { label: "P/E", value: stock.pe?.toFixed(1) ?? "—" },
                  { label: "P/B", value: stock.pb?.toFixed(2) ?? "—" },
                  { label: "Div Yield", value: stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : "—" },
                  { label: "52W H", value: stock.high52w ? `₹${stock.high52w.toFixed(0)}` : "—" },
                  { label: "52W L", value: stock.low52w ? `₹${stock.low52w.toFixed(0)}` : "—" },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                    <div className="text-sm font-mono font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Follow button */}
            <div className="flex items-start pt-1">
              <FollowButton symbol={symbol} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky section nav */}
      <SectionNav />

      {/* Page content */}
      <div className="px-8 py-8 max-w-[1200px] mx-auto space-y-12">
        {/* Overview */}
        <OverviewSection stock={stock} profile={profile} />
        
        {/* Chart */}
        <div id="chart" className="scroll-mt-28">
          <EmbeddedChart symbol={symbol} currentPrice={stock.price ?? null} priceChange={stock.pctChange1d ?? null} />
        </div>
        
        {/* Financials */}
        <FinancialsSection symbol={symbol} />
        
        {/* Ownership & Governance */}
        <OwnershipSection symbol={symbol} />
        
        {/* Analytics & Quality */}
        <AnalyticsSection symbol={symbol} />
        
        {/* Peer Comparison */}
        <PeersSection symbol={symbol} currentRatios={{ peTtm: stock.pe, roce: stock.roce, roe: stock.roe, pb: stock.pb }} />
        
        {/* AI Insights */}
        <AISection symbol={symbol} stockName={stock.name} />
        
        {/* Documents & Filings - At the bottom */}
        <DocumentsSection symbol={symbol} />
      </div>
    </div>
  );
}
