"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home, PieChart, Target, Search, Layers, BarChart2,
  Wrench, History, Activity, ChevronLeft, ChevronRight, Bell,
  Globe, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const MAIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "My Feed", href: "/feed", icon: Bell },
];

const CATEGORIES = [
  {
    id: "portfolio",
    icon: PieChart,
    title: "Portfolio",
    items: [
      { label: "Holdings", href: "/portfolio" },
      { label: "Transactions", href: "/portfolio/transactions" },
      { label: "Performance", href: "/portfolio/performance" },
      { label: "Rebalance", href: "/portfolio/rebalance" },
      { label: "Tax Report", href: "/tax" },
    ],
  },
  {
    id: "research",
    icon: Search,
    title: "Research",
    items: [
      { label: "Stock Screener", href: "/screener" },
      { label: "MF Screener", href: "/mf-screener" },
      { label: "Watchlist", href: "/watchlist" },
      { label: "IPO Center", href: "/ipo" },
    ],
  },
  {
    id: "macros",
    icon: Globe,
    title: "Macro & Markets",
    items: [
      { label: "Returns Heatmap", href: "/macros/heatmap" },
      { label: "Sector Performance", href: "/macros/sector-performance" },
      { label: "Market Breadth", href: "/macros/market-breadth" },
      { label: "FII / DII Flows", href: "/macros/fii-dii" },
      { label: "Economic Calendar", href: "/macros/economic-calendar" },
    ],
  },
  {
    id: "portfolio-strategy",
    icon: Layers,
    title: "Portfolio Strategy",
    items: [
      { label: "Risk Factor Allocation", href: "/analytics/risk-factor-allocation" },
      { label: "Asset Liability", href: "/analytics/asset-liability" },
      { label: "Efficient Frontier", href: "/analytics/efficient-frontier" },
      { label: "Dynamic Allocation", href: "/analytics/dynamic-allocation" },
      { label: "Tactical Allocation", href: "/analytics/tactical-allocation" },
    ],
  },
  {
    id: "factor-analysis",
    icon: BarChart2,
    title: "Factor Analysis",
    items: [
      { label: "Factor Analysis", href: "/analytics/factor-analysis" },
      { label: "Factor Regression", href: "/analytics/factor-regression" },
      { label: "Fund Factor Regressions", href: "/analytics/fund-factor-regressions" },
      { label: "Principal Component Analysis", href: "/analytics/pca" },
      { label: "Fund Rankings", href: "/analytics/fund-rankings" },
      { label: "Manager Performance", href: "/analytics/manager-performance" },
    ],
  },
  {
    id: "correlations",
    icon: Activity,
    title: "Correlations",
    items: [
      { label: "Asset Class Correlations", href: "/analytics/asset-class-correlations" },
      { label: "Asset Correlations", href: "/analytics/asset-correlations" },
      { label: "Asset Autocorrelations", href: "/analytics/autocorrelations" },
      { label: "Asset Cointegration", href: "/analytics/cointegration" },
    ],
  },
  {
    id: "backtest",
    icon: History,
    title: "Backtest",
    items: [
      { label: "Backtest Strategy", href: "/backtest" },
      { label: "Asset Allocation", href: "/analytics/asset-allocation" },
    ],
  },
  {
    id: "monte-carlo",
    icon: Target,
    title: "Monte Carlo & Goals",
    items: [
      { label: "Portfolio Simulation", href: "/analytics/monte-carlo" },
      { label: "Financial Goals", href: "/analytics/financial-goals" },
      { label: "Goals Tracker", href: "/goals" },
    ],
  },
  {
    id: "utility-tools",
    icon: Wrench,
    title: "Utility Tools",
    items: [
      { label: "SIP vs Lumpsum", href: "/utilities/sip-vs-lumpsum" },
      { label: "Smart SIP", href: "/utilities/smart-sip" },
      { label: "Tax Optimizer", href: "/utilities/tax-calculator" },
      { label: "Tax Harvesting", href: "/utilities/tax-harvesting" },
      { label: "PPF vs ELSS", href: "/utilities/ppf-vs-elss" },
      { label: "FIRE Simulator", href: "/utilities/fire-calculator" },
      { label: "Prepay vs Invest", href: "/utilities/prepay-vs-invest" },
      { label: "Compound Interest", href: "/utilities/compound-interest" },
      { label: "Loan Calculator", href: "/utilities/loan-calculator" },
      { label: "Direct vs Regular", href: "/utilities/direct-vs-regular" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const defaultExpanded = CATEGORIES.filter(cat =>
    cat.items.some(item => pathname.startsWith(item.href))
  ).map(cat => cat.id)[0];

  return (
    <div
      className={cn(
        "app-nav-theme sticky top-14 z-20 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,250,249,0.96)_100%)] shadow-[0_10px_30px_rgba(10,15,28,0.06)] backdrop-blur-xl transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-[220px]"
      )}
      style={{ borderColor: "var(--nav-border)" }}
    >
      <ScrollArea className="min-h-0 flex-1 py-4">
        <div className="px-2 space-y-0.5">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                collapsed={collapsed}
                active={isActive}
              />
            );
          })}
        </div>

        <div className="px-4 py-3">
          <div className="h-px w-full" style={{ background: "var(--nav-border)" }} />
        </div>

        <div className="px-2">
          {!collapsed ? (
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultExpanded}
              className="space-y-1"
            >
              {CATEGORIES.map(({ id, icon: Icon, title, items }) => {
                const isActiveCategory = items.some(item => pathname.startsWith(item.href));
                return (
                  <AccordionItem value={id} key={id} className="border-none">
                    <AccordionTrigger
                      className={cn(
                        "rounded-xl px-3 py-2.5 hover:no-underline transition-colors duration-150",
                        isActiveCategory ? "bg-[var(--accent-subtle)]" : "hover:bg-[var(--nav-hover-bg)]"
                      )}
                      style={{ color: "var(--nav-text)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={15} className="shrink-0 opacity-80" />
                        <span className="text-[12.5px] font-semibold tracking-tight">{title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-0.5">
                      <div className="ml-5 flex flex-col gap-1 border-l pl-3" style={{ borderColor: "rgba(245,158,11,0.16)" }}>
                        {items.map(item => {
                          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "rounded-lg px-2.5 py-1.5 text-[13px] font-medium leading-tight transition-colors duration-150",
                                isActive
                                  ? "bg-[var(--accent-subtle)] text-[var(--accent-dark)]"
                                  : "text-[color:var(--nav-text-muted)] hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-text)]"
                              )}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <div className="space-y-0.5">
              {CATEGORIES.map(({ id, icon: Icon, title, items }) => {
                const isActiveCategory = items.some(item => pathname.startsWith(item.href));
                return (
                  <button
                    key={id}
                    onClick={() => setCollapsed(false)}
                    title={title}
                    className={cn(
                      "flex h-9 w-full items-center justify-center rounded-xl p-2 transition-colors duration-150",
                      isActiveCategory ? "bg-[var(--accent-subtle)] text-[var(--accent-dark)]" : "hover:bg-[var(--nav-hover-bg)]"
                    )}
                    style={{ color: "var(--nav-text)" }}
                  >
                    <Icon size={15} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-2 space-y-1" style={{ borderColor: "var(--nav-border)" }}>
        <NavItem
          icon={Settings}
          label="Settings"
          href="/settings"
          collapsed={collapsed}
          active={pathname === "/settings"}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-xl p-2 transition-colors duration-150 hover:bg-[var(--nav-hover-bg)]"
          style={{ color: "var(--nav-text-muted)" }}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "flex h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-semibold transition-colors duration-150",
        collapsed && "justify-center px-0",
        active
          ? "bg-[var(--accent-subtle)] text-[var(--accent-dark)]"
          : "hover:bg-[var(--nav-hover-bg)]"
      )}
      style={{ color: active ? "var(--accent-dark)" : "var(--nav-text)" }}
    >
      <Icon size={15} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
      {!collapsed && <span className="truncate tracking-tight">{label}</span>}
    </Link>
  );
}
