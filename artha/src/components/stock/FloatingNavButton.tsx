"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "chart", label: "Chart" },
  { id: "financials", label: "Financials" },
  { id: "ownership", label: "Ownership" },
  { id: "analytics", label: "Analytics" },
  { id: "peers", label: "Peers" },
  { id: "ai", label: "AI" },
  { id: "documents", label: "Documents" },
];

export function FloatingNavButton() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{
          background: "var(--accent-brand)",
          color: "white",
        }}
        aria-label="Quick Navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className="md:hidden fixed bottom-24 right-6 z-50 rounded-lg shadow-xl overflow-hidden"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              minWidth: "200px",
            }}
          >
            <div className="p-2">
              <div
                className="text-xs font-semibold uppercase tracking-wider px-3 py-2"
                style={{ color: "var(--text-muted)" }}
              >
                Jump to Section
              </div>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors"
                  style={{
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
