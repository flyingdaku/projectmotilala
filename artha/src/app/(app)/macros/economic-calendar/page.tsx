"use client";

import { useState } from "react";
import { Calendar, Clock, AlertTriangle, TrendingUp } from "lucide-react";

type Impact = "HIGH" | "MEDIUM" | "LOW";

interface Event {
  date: string;
  time: string;
  event: string;
  country: string;
  impact: Impact;
  actual?: string;
  forecast?: string;
  previous?: string;
}

const EVENTS: Event[] = [
  { date: "2025-03-05", time: "11:00", event: "RBI Monetary Policy Decision", country: "IN", impact: "HIGH", actual: "6.25%", forecast: "6.25%", previous: "6.50%" },
  { date: "2025-03-07", time: "18:30", event: "US Non-Farm Payrolls", country: "US", impact: "HIGH", forecast: "180K", previous: "256K" },
  { date: "2025-03-10", time: "17:30", event: "India CPI Inflation (YoY)", country: "IN", impact: "HIGH", forecast: "4.2%", previous: "5.22%" },
  { date: "2025-03-12", time: "18:30", event: "US CPI Inflation (MoM)", country: "US", impact: "HIGH", forecast: "0.3%", previous: "0.5%" },
  { date: "2025-03-14", time: "14:00", event: "India WPI Inflation", country: "IN", impact: "MEDIUM", forecast: "1.8%", previous: "2.37%" },
  { date: "2025-03-15", time: "09:00", event: "India Trade Balance", country: "IN", impact: "MEDIUM", previous: "-$22.1B" },
  { date: "2025-03-19", time: "23:30", event: "FOMC Meeting Minutes", country: "US", impact: "HIGH", previous: "" },
  { date: "2025-03-25", time: "14:00", event: "India GDP Growth Rate (Q3)", country: "IN", impact: "HIGH", forecast: "6.4%", previous: "5.4%" },
  { date: "2025-03-28", time: "18:30", event: "US PCE Price Index (MoM)", country: "US", impact: "HIGH", forecast: "0.3%", previous: "0.3%" },
  { date: "2025-04-01", time: "11:00", event: "RBI Credit Policy Statement", country: "IN", impact: "HIGH" },
  { date: "2025-04-04", time: "18:30", event: "US Jobs Report", country: "US", impact: "HIGH" },
  { date: "2025-04-07", time: "17:30", event: "India Industrial Production (IIP)", country: "IN", impact: "MEDIUM" },
];

const IMPACT_COLORS: Record<Impact, string> = {
  HIGH: "#EF4444",
  MEDIUM: "#F59E0B",
  LOW: "#10B981",
};

export default function EconomicCalendarPage() {
  const [filter, setFilter] = useState<"ALL" | "IN" | "US">("ALL");
  const [impactFilter, setImpactFilter] = useState<"ALL" | Impact>("ALL");

  const filtered = EVENTS.filter(e =>
    (filter === "ALL" || e.country === filter) &&
    (impactFilter === "ALL" || e.impact === impactFilter)
  );

  const grouped = filtered.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Economic Calendar</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Upcoming macro events and data releases affecting Indian markets.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          {(["ALL", "IN", "US"] as const).map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: filter === c ? "var(--accent-brand)" : "var(--surface-elevated)",
                color: filter === c ? "var(--accent-foreground)" : "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}>
              {c === "ALL" ? "All Countries" : c === "IN" ? "🇮🇳 India" : "🇺🇸 US"}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map(imp => (
            <button key={imp} onClick={() => setImpactFilter(imp)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: impactFilter === imp ? (imp === "ALL" ? "var(--surface-elevated)" : IMPACT_COLORS[imp as Impact] + "20") : "transparent",
                color: imp === "ALL" ? "var(--text-secondary)" : IMPACT_COLORS[imp as Impact],
                border: `1px solid ${impactFilter === imp ? (imp === "ALL" ? "var(--border)" : IMPACT_COLORS[imp as Impact]) : "var(--border)"}`,
              }}>
              {imp === "ALL" ? "All Impact" : imp}
            </button>
          ))}
        </div>
      </div>

      {/* Event list */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, events]) => {
          const d = new Date(date);
          const isToday = new Date().toDateString() === d.toDateString();
          return (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={14} style={{ color: "var(--accent-brand)" }} />
                <span className="text-sm font-semibold" style={{ color: isToday ? "var(--accent-brand)" : "var(--text-primary)" }}>
                  {d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  {isToday && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--accent-subtle)", color: "var(--accent-brand)" }}>TODAY</span>}
                </span>
              </div>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                {events.map((event, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3"
                    style={{ borderBottom: i < events.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
                    <div className="w-12 text-xs font-mono shrink-0 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <Clock size={10} />
                      {event.time}
                    </div>
                    <div className="w-8 text-center shrink-0">
                      <span className="text-xs font-bold" style={{ color: event.country === "IN" ? "#F59E0B" : "#3B82F6" }}>{event.country}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight" style={{ color: "var(--text-primary)" }}>{event.event}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {event.actual && (
                        <div className="text-right">
                          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Actual</div>
                          <div className="text-xs font-mono font-bold" style={{ color: "var(--text-primary)" }}>{event.actual}</div>
                        </div>
                      )}
                      {event.forecast && (
                        <div className="text-right">
                          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Forecast</div>
                          <div className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{event.forecast}</div>
                        </div>
                      )}
                      {event.previous && (
                        <div className="text-right">
                          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Previous</div>
                          <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{event.previous}</div>
                        </div>
                      )}
                      <div className="flex items-center gap-1 shrink-0">
                        {event.impact === "HIGH" && <AlertTriangle size={11} style={{ color: IMPACT_COLORS.HIGH }} />}
                        {event.impact === "MEDIUM" && <TrendingUp size={11} style={{ color: IMPACT_COLORS.MEDIUM }} />}
                        <span className="text-[10px] font-semibold" style={{ color: IMPACT_COLORS[event.impact] }}>
                          {event.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
