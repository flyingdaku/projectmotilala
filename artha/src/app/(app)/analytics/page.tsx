"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LineChart,
  Layers,
  Network,
  TrendingUp,
  Activity,
  BarChart2,
  PieChart,
  ArrowLeftRight,
  Target,
  RefreshCw,
  Search,
  Zap,
} from "lucide-react";

const TOOL_CATEGORIES = [
  {
    title: "Backtest Portfolio",
    description: "Analyze historical performance and test custom asset allocation strategies.",
    tools: [
      { name: "Backtest Asset Allocation", href: "/analytics/asset-allocation", icon: PieChart, desc: "Backtest a portfolio asset allocation and compare historical and realized returns and risk characteristics against various lazy portfolios" },
      { name: "Backtest Portfolio", href: "/backtest", icon: LineChart, desc: "Test strategies on historical data" },
      { name: "Backtest Tactical Allocation", href: "/analytics/tactical-allocation", icon: Layers, desc: "Build & compare custom models" },
      { name: "Backtest Dynamic Allocation", href: "/analytics/dynamic-allocation", icon: RefreshCw, desc: "Market-timing & moving average" },
      { name: "Manager Performance Analysis", href: "/analytics/manager-performance", icon: Target, desc: "Analyze alpha vs benchmarks" },
    ],
  },
  {
    title: "Asset Analytics",
    description: "Deep dive into individual asset behavior and cross-asset relationships.",
    tools: [
      { name: "Fund Screener", href: "/research", icon: Search, desc: "Filter and discover mutual funds." },
      { name: "Fund Rankings", href: "/analytics/fund-rankings", icon: BarChart2, desc: "Compare funds by category." },
      { name: "Asset Correlations", href: "/analytics/asset-correlations", icon: Network, desc: "Analyze cross-asset behavior." },
      { name: "Asset Autocorrelation", href: "/analytics/autocorrelation", icon: ArrowLeftRight, desc: "Test for momentum/mean-reversion." },
      { name: "Asset Cointegration", href: "/analytics/cointegration", icon: Zap, desc: "Find pairs for statistical arbitrage." },
    ],
  },
  {
    title: "Factor Analysis",
    description: "Deconstruct returns using Fama-French and custom risk factors.",
    tools: [
      { name: "Factor Regression", href: "/analytics/factor-regression", icon: TrendingUp, desc: "Run multi-factor models." },
      { name: "Risk Factor Allocation", href: "/analytics/risk-factor-allocation", icon: Layers, desc: "Allocate based on risk premiums." },
      { name: "Principal Component Analysis", href: "/analytics/pca", icon: Network, desc: "Identify hidden market drivers." },
      { name: "Fund Factor Regressions", href: "/analytics/fund-factor-regressions", icon: BarChart2, desc: "Analyze mutual fund factor tilts." },
    ],
  },
  {
    title: "Quantitative & Risk",
    description: "Advanced statistical modeling and risk assessment tools.",
    tools: [
      { name: "Efficient Frontier", href: "/analytics/efficient-frontier", icon: TrendingUp, desc: "Optimize portfolio weights." },
      { name: "Monte Carlo Simulation", href: "/analytics/monte-carlo", icon: Activity, desc: "Simulate future portfolio paths." },
      { name: "Financial Goals", href: "/goals", icon: Target, desc: "Model retirement and withdrawal." },
      { name: "Asset Liability Modeling", href: "/analytics/asset-liability", icon: PieChart, desc: "Match assets to future liabilities." },
    ],
  },
];

export default function AnalyticsHubPage() {
  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Analytics & Backtesting Hub
        </h1>
        <p className="text-base mt-2 max-w-3xl" style={{ color: "var(--text-muted)" }}>
          A comprehensive suite of quantitative tools to analyze portfolios, discover asset relationships,
          and run advanced factor regressions.
        </p>
      </div>

      <div className="space-y-12">
        {TOOL_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1, duration: 0.4 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                {category.title}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group block p-5 rounded-xl border transition-all duration-200 card-hover relative overflow-hidden"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <Icon size={18} style={{ color: "var(--accent-brand)" }} />
                      </div>
                      <div className="space-y-1">
                        <h3
                          className="text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--accent-brand)]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {tool.name}
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
