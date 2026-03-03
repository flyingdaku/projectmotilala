"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
}

export function ContextualNav({
  links,
  backLink = "/analytics",
  backLabel = "Analytics Hub",
}: {
  links: NavLink[];
  backLink?: string;
  backLabel?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Back button */}
      <div>
        <Link
          href={backLink}
          className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ChevronLeft size={14} />
          {backLabel}
        </Link>
      </div>

      {/* Segmented Control / Tabs */}
      <div className="flex items-center overflow-x-auto custom-scrollbar pb-1">
        <div
          className="flex p-1 rounded-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="contextual-nav-tab"
                    className="absolute inset-0 rounded-md"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
