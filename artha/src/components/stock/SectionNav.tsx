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
  { id: "chart", label: "Price Chart" },
  { id: "financials", label: "Financials" },
  { id: "ownership", label: "Ownership" },
  { id: "documents", label: "Docs" },
  { id: "analytics", label: "Analytics" },
  { id: "peers", label: "Peer Comparison" },
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
      className="sticky top-[64px] z-30 w-full border-b backdrop-blur-xl -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-4 md:mb-8"
      style={{ background: "color-mix(in srgb, var(--background) 94%, transparent)", borderColor: "var(--border)" }}
    >
      {/* Desktop nav */}
      <div className="mx-auto px-6 md:px-8 hidden md:block">
        <div className="flex items-center gap-8 overflow-x-auto">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`whitespace-nowrap border-b-[3px] px-0 py-3 text-sm transition-colors ${active === s.id
              ? "font-semibold"
              : "font-medium"
              }`}
            style={active === s.id
              ? {
                  color: "var(--text-primary)",
                  borderBottomColor: "var(--text-primary)",
                }
              : { color: "var(--text-muted)", borderBottomColor: "transparent" }}
          >
            {s.label}
          </button>
        ))}
        </div>
      </div>

      {/* Mobile nav — "Jump to section" dropdown */}
      <div className="mx-auto max-w-[1600px] md:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex w-full items-center justify-between px-0 py-3 text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          <span>Jump to: <span style={{ color: "var(--text-primary)" }}>{activeLabel}</span></span>
          <ChevronDown size={16} className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && (
          <div
            className="mt-2 overflow-hidden rounded-xl border"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${active === s.id
                  ? "font-semibold"
                  : "hover:bg-[var(--surface-elevated)]"
                  }`}
                style={{
                  color: active === s.id ? "var(--text-primary)" : "var(--text-primary)",
                  background: active === s.id ? "var(--surface-elevated)" : undefined,
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
