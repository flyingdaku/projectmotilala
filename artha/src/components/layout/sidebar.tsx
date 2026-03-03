"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home, PieChart, Target, Search, Layers, BarChart2,
  Wrench, History, Activity, ChevronLeft, ChevronRight, Bell,
  Globe, Settings, Sun, Moon, Monitor
} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const ThemeIcon = { light: Sun, dark: Moon, system: Monitor }[theme] ?? Monitor;

  const cycleTheme = () => {
    const order = ["light", "dark", "system"] as const;
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const defaultExpanded = CATEGORIES.filter(cat =>
    cat.items.some(item => pathname.startsWith(item.href))
  ).map(cat => cat.id)[0];

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r transition-all duration-300 ease-in-out shrink-0 app-nav-theme relative z-20",
        collapsed ? "w-16" : "w-[220px]"
      )}
      style={{ borderColor: "var(--nav-border)" }}
    >
      <ScrollArea className="flex-1 py-4">
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
              defaultValue={mounted ? defaultExpanded : undefined}
              className="space-y-0.5"
            >
              {CATEGORIES.map(({ id, icon: Icon, title, items }) => {
                const isActiveCategory = items.some(item => pathname.startsWith(item.href));
                return (
                  <AccordionItem value={id} key={id} className="border-none">
                    <AccordionTrigger
                      className={cn(
                        "py-2 px-3 rounded-md hover:no-underline transition-colors duration-150 hover:bg-white/10",
                        isActiveCategory && "bg-white/10"
                      )}
                      style={{ color: "var(--nav-text)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={15} className="shrink-0 opacity-80" />
                        <span className="text-[12.5px] font-medium tracking-tight">{title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-0.5">
                      <div className="flex flex-col gap-0.5 ml-5 pl-2.5 border-l border-white/15">
                        {items.map(item => {
                          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "px-2.5 py-1.5 text-[13.5px] rounded-md transition-colors duration-150 leading-tight font-medium",
                                isActive
                                  ? "bg-white/15 text-white"
                                  : "text-black hover:bg-white/10 hover:text-black"
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
                      "flex items-center justify-center w-full p-2 rounded-md transition-colors duration-150 h-9",
                      isActiveCategory ? "bg-white/15" : "hover:bg-white/10"
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

      <div className="p-2 border-t space-y-0.5" style={{ borderColor: "var(--nav-border)" }}>
        {/* User controls */}
        {!collapsed && (
          <div className="px-2 py-1">
            <div className="flex items-center gap-1">
              {/* Notifications */}
              <Link href="/feed"
                className="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-white/10"
                style={{ color: "var(--nav-text-muted)" }} title="My Feed">
                <Bell size={16} />
              </Link>

              {/* Theme toggle */}
              <button onClick={cycleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-white/10"
                style={{ color: "var(--nav-text-muted)" }}
                title={`Theme: ${theme}`}>
                <ThemeIcon size={16} />
              </button>

              {/* Avatar */}
              <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold select-none cursor-pointer bg-white/20"
                style={{ color: "#000" }} title="Profile">
                RK
              </div>
            </div>
          </div>
        )}

        <NavItem
          icon={Settings}
          label="Settings"
          href="/settings"
          collapsed={collapsed}
          active={pathname === "/settings"}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-md transition-colors duration-150 hover:bg-white/10"
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
        "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] font-semibold transition-colors duration-150 h-9",
        collapsed && "justify-center px-0",
        active
          ? "bg-white/15 text-white"
          : "hover:bg-white/10"
      )}
      style={{ color: active ? "#fff" : "var(--nav-text)" }}
    >
      <Icon size={15} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
      {!collapsed && <span className="truncate tracking-tight">{label}</span>}
    </Link>
  );
}
