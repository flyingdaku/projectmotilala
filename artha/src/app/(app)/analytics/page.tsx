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
      { name: "Backtest Asset Allocation", href: "/analytics/asset-allocation", icon: PieChart, desc: "Backtest a portfolio with lazy portfolio comparison, growth charts, drawdowns, rolling returns, and comprehensive metrics." },
      { name: "Dynamic Allocation", href: "/analytics/dynamic-allocation", icon: RefreshCw, desc: "Moving-average crossover, relative momentum, dual momentum, and volatility targeting strategies." },
      { name: "Backtest Portfolio", href: "/backtest", icon: LineChart, desc: "Test custom strategies on historical data." },
      { name: "Tactical Allocation", href: "/analytics/tactical-allocation", icon: Layers, desc: "Build & compare custom allocation models." },
    ],
  },
  {
    title: "Asset Analytics",
    description: "Deep dive into individual asset behavior and cross-asset relationships.",
    tools: [
      { name: "Fund Rankings", href: "/analytics/fund-rankings", icon: BarChart2, desc: "Rank MF categories by composite score, Sharpe, Sortino, consistency, and more." },
      { name: "Asset Correlations", href: "/analytics/asset-correlations", icon: Network, desc: "Historical correlation matrix, performance metrics, and rolling analysis." },
      { name: "Asset Autocorrelations", href: "/analytics/autocorrelations", icon: ArrowLeftRight, desc: "Analyze return persistence and mean-reversion across asset classes." },
      { name: "Asset Cointegration", href: "/analytics/cointegration", icon: Zap, desc: "Engle-Granger cointegration test, spread z-scores, and pairs trading signals." },
    ],
  },
  {
    title: "Factor Analysis",
    description: "Deconstruct returns using multi-factor models and principal components.",
    tools: [
      { name: "Factor Regression", href: "/analytics/factor-regression", icon: TrendingUp, desc: "Multi-factor regression for individual assets with rolling alpha and residual analysis." },
      { name: "Fund Factor Regressions", href: "/analytics/fund-factor-regressions", icon: BarChart2, desc: "Analyze mutual fund category factor tilts and contributions." },
      { name: "Principal Component Analysis", href: "/analytics/pca", icon: Network, desc: "Identify hidden market drivers with scree plot, loadings, biplot, and score timeline." },
      { name: "Risk Factor Allocation", href: "/analytics/risk-factor-allocation", icon: Layers, desc: "Allocate based on risk factor premiums." },
    ],
  },
  {
    title: "Quantitative & Risk",
    description: "Advanced statistical modeling and risk assessment tools.",
    tools: [
      { name: "Monte Carlo Simulation", href: "/analytics/monte-carlo", icon: Activity, desc: "Simulate thousands of future portfolio paths with percentile analysis." },
      { name: "Financial Goals", href: "/analytics/financial-goals", icon: Target, desc: "Model retirement, withdrawal, and cashflow goals with success probability." },
      { name: "Efficient Frontier", href: "/analytics/efficient-frontier", icon: TrendingUp, desc: "Optimize portfolio weights for maximum risk-adjusted returns." },
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
