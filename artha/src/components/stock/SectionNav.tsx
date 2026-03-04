"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export interface NavSection {
  id: string;
  label: string;
  icon?: string;
}

const SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "chart", label: "Chart" },
  { id: "financials", label: "Financials" },
  { id: "ownership", label: "Ownership" },
  { id: "documents", label: "Docs" },
  { id: "analytics", label: "Analytics" },
  { id: "peers", label: "Peers" },
];

export function SectionNav() {
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActive(id);
    setMobileOpen(false);
  };

  const activeLabel = SECTIONS.find((s) => s.id === active)?.label ?? "Overview";

  return (
    <nav
      className="sticky top-0 z-30 w-[calc(100%+64px)] -mx-8 px-8"
      style={{ background: "var(--background)", borderColor: "var(--border)" }}
    >
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-0 px-4 overflow-x-auto max-w-[1400px] mx-auto">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${active === s.id
              ? "border-[var(--accent-brand)] text-[var(--accent-brand)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border)]"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Mobile nav — "Jump to section" dropdown */}
      <div className="md:hidden px-4 py-2">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg border text-sm font-medium"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)", background: "var(--surface-elevated)" }}
        >
          <span>Jump to: <span style={{ color: "var(--accent-brand)" }}>{activeLabel}</span></span>
          <ChevronDown size={16} className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && (
          <div
            className="mt-1 rounded-lg border overflow-hidden shadow-lg"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${active === s.id
                  ? "font-semibold"
                  : "hover:bg-[var(--surface-elevated)]"
                  }`}
                style={{
                  color: active === s.id ? "var(--accent-brand)" : "var(--text-primary)",
                  background: active === s.id ? "var(--accent-subtle)" : undefined,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
