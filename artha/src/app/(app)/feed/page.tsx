"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, AlertTriangle, Zap, Cpu, Clock,
  Bell, BellOff, CheckCheck, Loader2, RefreshCw,
} from "lucide-react";
import type { FeedItem } from "@/lib/data/types";

const EVENT_META: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  RED_FLAG:            { icon: <AlertTriangle size={14} />, label: "Red Flag",       color: "#EF4444" },
  RESULT:              { icon: <TrendingUp size={14} />,    label: "Results",        color: "#3B82F6" },
  CONCALL:             { icon: <Cpu size={14} />,           label: "Concall",        color: "#8B5CF6" },
  SHAREHOLDING_CHANGE: { icon: <Zap size={14} />,           label: "Shareholding",   color: "#F59E0B" },
  CORP_ACTION:         { icon: <Zap size={14} />,           label: "Corp. Action",   color: "#10B981" },
  ANNOUNCEMENT:        { icon: <Clock size={14} />,         label: "Announcement",   color: "#6B7280" },
  RATING_CHANGE:       { icon: <TrendingDown size={14} />,  label: "Rating Change",  color: "#F97316" },
  INSIDER_TRADE:       { icon: <AlertTriangle size={14} />, label: "Insider Trade",  color: "#EC4899" },
};

const SEVERITY_BORDER: Record<string, string> = {
  CRITICAL: "border-l-red-500",
  WARNING:  "border-l-yellow-500",
  INFO:     "border-l-border",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function FeedCard({ item, onRead }: { item: FeedItem; onRead: (id: string) => void }) {
  const meta = EVENT_META[item.eventType] ?? EVENT_META.ANNOUNCEMENT;
  const borderClass = SEVERITY_BORDER[item.severity ?? "INFO"] ?? SEVERITY_BORDER.INFO;

  return (
    <div
      className={`flex gap-3 p-4 rounded-xl border-l-4 border border-r border-t border-b transition-all ${borderClass} ${item.isRead ? "opacity-70" : ""}`}
      style={{
        background: item.isRead ? "var(--surface)" : "var(--surface-elevated)",
        borderColor: "var(--border)",
        borderLeftColor: meta.color,
      }}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: `${meta.color}18`, color: meta.color }}
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/stocks/${item.nseSymbol ?? ""}`}
                className="text-sm font-bold hover:underline"
                style={{ color: "var(--accent-brand)" }}
              >
                {item.nseSymbol ?? item.assetId}
              </Link>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}40` }}
              >
                {meta.label}
              </span>
              {!item.isRead && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-brand)]" />
              )}
            </div>
            <p className="text-sm mt-0.5 font-medium" style={{ color: "var(--text-primary)" }}>
              {item.title ?? item.eventType.replace(/_/g, " ")}
            </p>
            {item.stockName && (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.stockName}</p>
            )}
          </div>
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
            {timeAgo(item.eventDate)}
          </span>
        </div>

        {/* Event data */}
        {item.eventData && Object.keys(item.eventData).length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(item.eventData as Record<string, unknown>).slice(0, 4).map(([k, v]) => (
              <span key={k} className="text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-secondary)" }}>{k}: </span>
                <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                  {String(v)}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Mark read */}
        {!item.isRead && (
          <button
            onClick={() => onRead(item.id)}
            className="mt-2 text-xs hover:underline transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

export default function FeedPage() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const fetchFeed = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/feed?limit=100");
      const data = await res.json();
      setFeed(data.feed ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchFeed(); }, [fetchFeed]);

  const handleRead = async (eventId: string) => {
    setFeed((prev) => prev.map((f) => f.id === eventId ? { ...f, isRead: true } : f));
    setUnreadCount((c) => Math.max(0, c - 1));
    await fetch("/api/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventIds: [eventId] }),
    });
  };

  const handleMarkAllRead = async () => {
    const unreadIds = feed.filter((f) => !f.isRead).map((f) => f.id);
    if (unreadIds.length === 0) return;
    setFeed((prev) => prev.map((f) => ({ ...f, isRead: true })));
    setUnreadCount(0);
    await fetch("/api/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventIds: unreadIds }),
    });
  };

  const eventTypes = ["ALL", ...Array.from(new Set(feed.map((f) => f.eventType)))];
  const severities = ["ALL", "CRITICAL", "WARNING", "INFO"];

  const filtered = feed.filter((f) => {
    if (filterType !== "ALL" && f.eventType !== filterType) return false;
    if (filterSeverity !== "ALL" && f.severity !== filterSeverity) return false;
    return true;
  });

  // Group by date
  const groups = filtered.reduce<Record<string, FeedItem[]>>((acc, item) => {
    const label = timeAgo(item.eventDate);
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            My Feed
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Events from companies you follow
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
              {unreadCount} unread
            </span>
          )}
          <button
            onClick={() => fetchFeed(true)}
            disabled={refreshing}
            className="p-2 rounded-lg border transition-colors hover:bg-[var(--surface-elevated)]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors hover:bg-[var(--surface-elevated)]"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        {/* Severity */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>Severity:</span>
          {severities.map((s) => (
            <button key={s} onClick={() => setFilterSeverity(s)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterSeverity === s ? "text-[var(--accent-foreground)]" : ""}`}
              style={{
                background: filterSeverity === s ? "var(--accent-brand)" : "var(--surface-elevated)",
                color: filterSeverity === s ? "black" : "var(--text-secondary)",
                border: `1px solid ${filterSeverity === s ? "var(--accent-brand)" : "var(--border)"}`,
              }}>
              {s === "CRITICAL" ? "🔴 Critical" : s === "WARNING" ? "🟡 Warning" : s === "INFO" ? "🔵 Info" : "All"}
            </button>
          ))}
        </div>
        {/* Event Type */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>Type:</span>
          {eventTypes.map((t) => {
            const meta = EVENT_META[t];
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors`}
                style={{
                  background: filterType === t ? (meta ? meta.color : "var(--accent-brand)") : "var(--surface-elevated)",
                  color: filterType === t ? "white" : "var(--text-secondary)",
                  border: `1px solid ${filterType === t ? (meta ? meta.color : "var(--accent-brand)") : "var(--border)"}`,
                }}>
                {meta ? <span>{meta.icon}</span> : null}
                {t === "ALL" ? "All types" : meta?.label ?? t.replace(/_/g, " ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feed Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="animate-spin w-10 h-10 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading your feed…</p>
        </div>
      ) : Object.keys(groups).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "var(--surface-elevated)" }}>
            <BellOff size={36} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              {feed.length === 0 ? "No events yet" : "No matching events"}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {feed.length === 0
                ? "Follow companies to see their earnings, concalls, announcements and more here."
                : "Try removing filters to see all events."}
            </p>
          </div>
          {feed.length === 0 && (
            <Link href="/screener"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "var(--accent-brand)" }}>
              Discover Companies
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groups).map(([dateLabel, items]) => (
            <div key={dateLabel}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}>
                  {dateLabel}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {items.length} event{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <FeedCard key={item.id} item={item} onRead={handleRead} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bell icon hint when not empty */}
      {feed.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <Bell size={12} />
          Manage alert preferences on each company page
        </div>
      )}
    </div>
  );
}
