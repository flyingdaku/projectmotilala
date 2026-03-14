"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SectionNav } from "@/components/stock/SectionNav";
import { EmbeddedChart } from "@/components/charting/EmbeddedChart";
import { OverviewSection } from "@/components/stock/OverviewSection";
import { FinancialsSection } from "@/components/stock/FinancialsSection";
import { OwnershipSection } from "@/components/stock/OwnershipSection";
import { DocumentsSection } from "@/components/stock/DocumentsSection";
import { AnalyticsSection } from "@/components/stock/AnalyticsSection";
import { PeersSection } from "@/components/stock/PeersSection";
import { FollowButton } from "@/components/stock/FollowButton";
import { StickyMetricsBar } from "@/components/stock/StickyMetricsBar";
import { FloatingNavButton } from "@/components/stock/FloatingNavButton";
import { getSectorEmoji } from "@/lib/utils/emojis";
import type { StockDetail } from "@/lib/data";
import type { CompanyProfile } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { DataMetaInline, MetricValue } from "@/components/stock/StockUiPrimitives";
import {
  formatCurrency,
  formatMetricRange,
  formatMoneyInCrores,
  formatPercent,
  formatRatio,
  formatSignedChange,
  formatVolume,
} from "@/lib/utils/formatters";

type OverviewResponse = {
  stock: StockDetail | null;
  profile: CompanyProfile | null;
  meta?: {
    hero?: DataMeta;
    overview?: DataMeta;
  } | null;
};

export default function StockPage() {
  const params = useParams();
  const symbol = (params?.symbol as string ?? "").toUpperCase();

  const [stock, setStock] = useState<StockDetail | null>(null);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [overviewMeta, setOverviewMeta] = useState<OverviewResponse["meta"]>(null);
  const [loadedSymbol, setLoadedSymbol] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    fetch(`/api/stocks/${symbol}/overview`)
      .then(r => {
        if (r.status === 404) {
          setNotFound(true);
          setOverviewMeta(null);
          setLoadedSymbol(symbol);
          return null;
        }
        return r.json();
      })
      .then(data => {
        if (!data) return;
        setNotFound(false);
        setStock(data.stock ?? null);
        setProfile(data.profile ?? null);
        setOverviewMeta(data.meta ?? null);
        setShowFullDescription(false);
        setLoadedSymbol(symbol);
      })
      .catch(() => {
        setOverviewMeta(null);
        setLoadedSymbol(symbol);
      });
  }, [symbol]);

  // Scroll detection for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loading = loadedSymbol !== symbol;

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
  const keyMetrics = [
    { label: "Market Cap", value: formatMoneyInCrores(stock.marketCapCr), reason: "Market capitalization is not available for this listing yet." },
    { label: "P/E", value: formatRatio(stock.pe, 1), reason: "TTM earnings are unavailable or non-positive." },
    { label: "ROCE", value: formatPercent(stock.roce, 1), reason: "Return-on-capital history is missing." },
    { label: "ROE", value: formatPercent(stock.roe, 1), reason: "Return-on-equity history is missing." },
    {
      label: "52W Range",
      value: formatMetricRange(
        stock.low52w,
        stock.high52w,
        (value) => formatCurrency(value, { decimals: 0 }),
      ),
      reason: "A full 52-week price range is not available yet.",
    },
    { label: "Avg Volume", value: formatVolume(stock.avgVolume), reason: "Recent average volume is not available." },
  ];
  const identityChips = [
    stock.sector ? `${getSectorEmoji(stock.sector)} ${stock.sector}` : null,
    stock.industry ?? null,
    stock.exchange ?? (stock.nseSymbol || stock.bseCode ? "NSE/BSE" : null),
    ...(profile?.indexMemberships?.slice(0, 3) ?? []),
  ].filter(Boolean) as string[];
  const summaryText = profile?.descriptionShort
    ?? `${stock.name} is a listed Indian company${stock.industry ? ` operating in ${stock.industry}` : ""}${stock.sector ? ` within the ${stock.sector} sector` : ""}.`;

  return (
    <div className="w-full min-w-0 pb-12">
      {/* Sticky Metrics Bar */}
      {stock && <StickyMetricsBar stock={stock} meta={overviewMeta?.hero ?? null} visible={showStickyBar} />}

      <SectionNav />

      {/* Floating Navigation Button (Mobile) */}
      <FloatingNavButton />

      <div className="mx-auto mt-6 w-full max-w-[1180px] overflow-hidden rounded-[28px] border" style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 18px 40px rgba(10,15,28,0.06)" }}>
        {/* Stock Header */}
        <div className="border-b px-6 pb-8 pt-6" style={{ background: "linear-gradient(180deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 88%, transparent) 100%)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>{stock.name}</h1>
                        <span className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold"
                          style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)", border: "1px solid rgba(245,158,11,0.3)" }}>
                          {stock.nseSymbol ?? stock.symbol}
                        </span>
                        {stock.bseCode && (
                          <span className="text-xs px-2.5 py-1 rounded-md font-mono"
                            style={{ background: "var(--surface-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                            BSE {stock.bseCode}
                          </span>
                        )}
                        {profile?.analystRatings?.targetPrice != null && (
                          <span className="text-xs px-2.5 py-1 rounded-md font-medium"
                            style={{ border: "1px solid rgba(245,158,11,0.24)", background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>
                            Target {formatCurrency(profile.analystRatings.targetPrice, { decimals: 0 })}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap text-xs" style={{ color: "var(--text-secondary)" }}>
                        {identityChips.map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
                            <span>{chip}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end gap-3 flex-wrap">
                    <span className="text-4xl font-bold font-mono tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {formatCurrency(stock.price)}
                    </span>
                    {stock.pctChange1d != null && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold font-mono ${isPos ? "text-emerald-500 bg-emerald-500/10" : isNeg ? "text-rose-500 bg-rose-500/10" : "text-muted-foreground bg-muted/20"}`}>
                        {isPos ? <TrendingUp size={14} /> : isNeg ? <TrendingDown size={14} /> : <Minus size={14} />}
                        {formatSignedChange(stock.pctChange1d)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <DataMetaInline meta={overviewMeta?.hero ?? null} />
                  </div>
                </div>

                <div className="flex items-start pt-1">
                  <FollowButton symbol={symbol} />
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {keyMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border px-4 py-3" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>{metric.label}</div>
                    <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      <MetricValue value={metric.value} reason={metric.reason} className="metric-mono" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border px-4 py-4" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                <p className={`text-sm leading-6 ${showFullDescription ? "" : "line-clamp-2"}`} style={{ color: "var(--text-secondary)" }}>
                  {summaryText}
                </p>
                {summaryText.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowFullDescription((value) => !value)}
                    className="mt-2 text-xs font-medium"
                    style={{ color: "var(--accent-brand)" }}
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
                <div className="mt-2">
                  <DataMetaInline meta={overviewMeta?.overview ?? null} />
                </div>
              </div>

              {profile?.analystRatings && (
                <div className="mt-5 rounded-xl border px-4 py-4" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Street View</div>
                    <div className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isPos ? "text-emerald-500 bg-emerald-500/10" : isNeg ? "text-rose-500 bg-rose-500/10" : "text-muted-foreground bg-muted/20"}`}>
                      {isPos ? "Positive day" : isNeg ? "Negative day" : "Flat day"}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-emerald-500">Buy</div>
                      <div className="mt-1 text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{profile.analystRatings.buy}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-amber-500">Hold</div>
                      <div className="mt-1 text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{profile.analystRatings.hold}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-rose-500">Sell</div>
                      <div className="mt-1 text-lg font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{profile.analystRatings.sell}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="px-6 py-8 space-y-10">
          {/* Overview */}
          <OverviewSection stock={stock} profile={profile} meta={overviewMeta?.overview ?? null} />

          {/* Chart */}
          <EmbeddedChart symbol={symbol} currentPrice={stock.price ?? null} priceChange={stock.pctChange1d ?? null} />

          {/* Financials */}
          <FinancialsSection symbol={symbol} />

          {/* Ownership & Governance */}
          <OwnershipSection symbol={symbol} />

          {/* Analytics & Quality */}
          <AnalyticsSection symbol={symbol} />

          {/* Peer Comparison */}
          <PeersSection
            symbol={symbol}
            currentRatios={{
              peTtm: stock.pe,
              roce: stock.roce,
              roe: stock.roe,
              pb: stock.pb,
              debtEquity: stock.debtEquity,
              dividendYield: stock.dividendYield,
              marketCapCr: stock.marketCapCr,
            }}
          />


          {/* Documents & Filings - At the bottom */}
          <DocumentsSection symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
