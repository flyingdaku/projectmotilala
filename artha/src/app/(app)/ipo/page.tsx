"use client";

import { useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

type IpoStatus = "OPEN" | "UPCOMING" | "LISTED" | "CLOSED";

interface IPO {
  company: string;
  symbol?: string;
  status: IpoStatus;
  openDate: string;
  closeDate: string;
  listingDate?: string;
  priceRange: string;
  lotSize: number;
  issueSize: string;
  subscription?: number;
  gmp?: number;
  listingGain?: number;
  sector: string;
  type: "MainBoard" | "SME";
}

const IPOS: IPO[] = [
  {
    company: "TechNova Solutions Ltd",
    status: "OPEN",
    openDate: "2025-03-14",
    closeDate: "2025-03-18",
    priceRange: "₹420 – ₹445",
    lotSize: 33,
    issueSize: "₹1,240 Cr",
    subscription: 2.84,
    gmp: 62,
    sector: "IT Services",
    type: "MainBoard",
  },
  {
    company: "Greenfield Agro Sciences",
    status: "OPEN",
    openDate: "2025-03-15",
    closeDate: "2025-03-19",
    priceRange: "₹180 – ₹190",
    lotSize: 78,
    issueSize: "₹420 Cr",
    subscription: 1.12,
    gmp: 28,
    sector: "Agrochemicals",
    type: "MainBoard",
  },
  {
    company: "RapidHealth Diagnostics",
    status: "UPCOMING",
    openDate: "2025-03-24",
    closeDate: "2025-03-26",
    priceRange: "₹310 – ₹325",
    lotSize: 46,
    issueSize: "₹890 Cr",
    gmp: 45,
    sector: "Healthcare",
    type: "MainBoard",
  },
  {
    company: "NexGen Logistics",
    status: "UPCOMING",
    openDate: "2025-03-28",
    closeDate: "2025-04-01",
    priceRange: "₹240 – ₹256",
    lotSize: 58,
    issueSize: "₹640 Cr",
    sector: "Logistics",
    type: "MainBoard",
  },
  {
    company: "Bharat EV Tech Ltd",
    symbol: "BETECH",
    status: "LISTED",
    openDate: "2025-03-05",
    closeDate: "2025-03-07",
    listingDate: "2025-03-12",
    priceRange: "₹380 – ₹400",
    lotSize: 37,
    issueSize: "₹1,820 Cr",
    subscription: 48.2,
    gmp: 0,
    listingGain: 42.5,
    sector: "Automobiles",
    type: "MainBoard",
  },
  {
    company: "CloudBase Infra",
    symbol: "CLDINF",
    status: "LISTED",
    openDate: "2025-02-24",
    closeDate: "2025-02-26",
    listingDate: "2025-03-03",
    priceRange: "₹720 – ₹740",
    lotSize: 20,
    issueSize: "₹2,140 Cr",
    subscription: 84.7,
    gmp: 0,
    listingGain: -4.2,
    sector: "IT Services",
    type: "MainBoard",
  },
];

const STATUS_BADGE: Record<IpoStatus, { bg: string; color: string; label: string }> = {
  OPEN: { bg: "#10B98120", color: "#10B981", label: "Open" },
  UPCOMING: { bg: "#F59E0B20", color: "#F59E0B", label: "Upcoming" },
  LISTED: { bg: "#3B82F620", color: "#3B82F6", label: "Listed" },
  CLOSED: { bg: "#6B728020", color: "#6B7280", label: "Closed" },
};

export default function IPOPage() {
  const [filter, setFilter] = useState<"ALL" | IpoStatus>("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "MainBoard" | "SME">("ALL");

  const filtered = IPOS.filter(ipo =>
    (filter === "ALL" || ipo.status === filter) &&
    (typeFilter === "ALL" || ipo.type === typeFilter)
  );

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>IPO Center</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Track active, upcoming, and recently listed IPOs with subscription data and GMP.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          {(["ALL", "OPEN", "UPCOMING", "LISTED"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border"
              style={{
                background: filter === s ? (s === "ALL" ? "var(--surface-elevated)" : STATUS_BADGE[s as IpoStatus]?.bg) : "transparent",
                color: s === "ALL" ? (filter === s ? "var(--text-primary)" : "var(--text-muted)") : STATUS_BADGE[s as IpoStatus]?.color,
                borderColor: filter === s ? (s === "ALL" ? "var(--border)" : STATUS_BADGE[s as IpoStatus]?.color) : "var(--border)",
              }}>
              {s === "ALL" ? "All" : STATUS_BADGE[s as IpoStatus].label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["ALL", "MainBoard", "SME"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border"
              style={{
                background: typeFilter === t ? "var(--accent-subtle)" : "transparent",
                color: typeFilter === t ? "var(--accent-brand)" : "var(--text-muted)",
                borderColor: typeFilter === t ? "var(--accent-brand)" : "var(--border)",
              }}>
              {t === "ALL" ? "All Types" : t}
            </button>
          ))}
        </div>
      </div>

      {/* IPO Cards */}
      <div className="grid gap-4">
        {filtered.map(ipo => {
          const badge = STATUS_BADGE[ipo.status];
          return (
            <div key={ipo.company} className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{ipo.company}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
                      {ipo.type}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
                      {ipo.sector}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs mt-3">
                    <div>
                      <div className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>Price Band</div>
                      <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{ipo.priceRange}</div>
                    </div>
                    <div>
                      <div className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>Lot Size</div>
                      <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{ipo.lotSize} shares</div>
                    </div>
                    <div>
                      <div className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>Issue Size</div>
                      <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{ipo.issueSize}</div>
                    </div>
                    <div>
                      <div className="text-[10px] mb-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <Calendar size={9} /> {ipo.status === "LISTED" ? "Listed" : "Opens"}
                      </div>
                      <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        {ipo.status === "LISTED" ? ipo.listingDate : ipo.openDate}
                      </div>
                    </div>
                    {ipo.status !== "LISTED" && (
                      <div>
                        <div className="text-[10px] mb-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                          <Clock size={9} /> Closes
                        </div>
                        <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{ipo.closeDate}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end shrink-0">
                  {ipo.subscription !== undefined && (
                    <div className="text-right">
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Subscribed</div>
                      <div className={`text-lg font-bold font-mono ${ipo.subscription >= 1 ? "text-emerald-500" : "text-rose-500"}`}>
                        {ipo.subscription}x
                      </div>
                    </div>
                  )}
                  {ipo.gmp !== undefined && ipo.gmp > 0 && (
                    <div className="text-right">
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>GMP</div>
                      <div className="text-sm font-bold font-mono text-emerald-500">+₹{ipo.gmp}</div>
                    </div>
                  )}
                  {ipo.listingGain !== undefined && (
                    <div className="text-right">
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Listing Gain</div>
                      <div className={`text-lg font-bold font-mono ${ipo.listingGain >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                        {ipo.listingGain >= 0 ? "+" : ""}{ipo.listingGain}%
                      </div>
                    </div>
                  )}
                  {(ipo.status === "OPEN" || ipo.status === "UPCOMING") && (
                    <button className="mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
                      {ipo.status === "OPEN" ? "Apply Now" : "Set Reminder"}
                    </button>
                  )}
                </div>
              </div>

              {/* Subscription bar */}
              {ipo.subscription !== undefined && ipo.status === "OPEN" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: "var(--text-muted)" }}>
                    <span>Subscription Progress</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{ipo.subscription}x of target</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                    <div className="h-1.5 rounded-full transition-all" style={{
                      width: `${Math.min(100, (ipo.subscription / 10) * 100)}%`,
                      background: ipo.subscription >= 1 ? "#10B981" : "#F59E0B",
                    }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <AlertCircle size={32} className="mx-auto mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No IPOs found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
