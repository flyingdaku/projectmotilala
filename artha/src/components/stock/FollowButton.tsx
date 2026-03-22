"use client";

import { useState, useEffect } from "react";
import { Star, Bell, Check, Loader2 } from "lucide-react";
import { apiGet, apiPost } from "@/lib/api-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface AlertConfig {
  price: boolean;
  results: boolean;
  concall: boolean;
  shareholding: boolean;
  redFlags: boolean;
}

interface Props {
  symbol: string;
}

export function FollowButton({ symbol }: Props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    price: true, results: true, concall: true, shareholding: true, redFlags: true,
  });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    apiGet<{ following: boolean }>(`/api/stocks/${symbol}/follow`)
      .then((data) => {
        setIsFollowing(data.following);
        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, [symbol]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await apiPost<{ following: boolean }>(`/api/stocks/${symbol}/follow`, { action: "unfollow" });
        setIsFollowing(false);
        setFollowerCount((c) => (c !== null ? Math.max(0, c - 1) : null));
      } else {
        await apiPost<{ following: boolean }>(`/api/stocks/${symbol}/follow`, { action: "follow", alertConfig });
        setIsFollowing(true);
        setFollowerCount((c) => (c !== null ? c + 1 : 1));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlertChange = async (key: keyof AlertConfig, val: boolean) => {
    const newConfig = { ...alertConfig, [key]: val };
    setAlertConfig(newConfig);
    if (isFollowing) {
      await apiPost<{ following: boolean }>(`/api/stocks/${symbol}/follow`, { action: "follow", alertConfig: newConfig });
    }
  };

  if (!fetched) return null;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
          isFollowing
            ? "bg-[var(--accent-brand)] text-[var(--accent-foreground)]"
            : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
        }`}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isFollowing ? (
          <Check size={14} />
        ) : (
          <Star size={14} />
        )}
        {isFollowing ? "Following" : "Follow"}
        {followerCount !== null && followerCount > 0 && (
          <span className="text-xs opacity-70 font-mono">{followerCount.toLocaleString("en-IN")}</span>
        )}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
            title="Alert settings"
          >
            <Bell size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-xs text-[var(--text-muted)]">Alert me for</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(["price", "results", "concall", "shareholding", "redFlags"] as (keyof AlertConfig)[]).map((key) => (
            <DropdownMenuCheckboxItem
              key={key}
              checked={alertConfig[key]}
              onCheckedChange={(v) => handleAlertChange(key, v)}
              className="text-sm capitalize"
            >
              {key === "redFlags" ? "Red Flags" : key === "concall" ? "Concall" : key === "shareholding" ? "Shareholding" : key === "results" ? "Results" : "Price Alerts"}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
