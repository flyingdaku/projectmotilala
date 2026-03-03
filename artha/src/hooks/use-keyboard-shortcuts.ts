"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NAV_SHORTCUTS: Record<string, string> = {
  "1": "/dashboard",
  "2": "/portfolio",
  "3": "/tax",
  "4": "/backtest",
  "5": "/goals",
  "6": "/research",
};

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Cmd+K — search (future)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // TODO: open command palette
        return;
      }

      // 1–6 for nav sections
      if (!e.metaKey && !e.ctrlKey && !e.altKey && NAV_SHORTCUTS[e.key]) {
        router.push(NAV_SHORTCUTS[e.key]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);
}
