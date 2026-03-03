import { TopNav } from "@/components/layout/top-nav"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <TopNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent-subtle)] via-[var(--background)] to-[var(--background)] -z-10" />
          
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] text-sm font-medium mb-8 text-[var(--text-secondary)] border border-[var(--border)]">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent-brand)] animate-pulse" />
              Advanced Portfolio Analytics for India
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
              Institutional Grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-brand)] to-[var(--accent-light)]">
                Backtesting & Analysis
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Test your asset allocation, analyze Indian mutual funds, and run Fama-French factor regressions with a tool built specifically for the Indian market.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-[var(--accent-subtle)]">
                <Link href="/login">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full">
                <Link href="/analytics/backtest">
                  Try Backtest Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-[var(--surface-elevated)] border-y border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[var(--neutral-subtle)] flex items-center justify-center mb-6">
                  <BarChart2 className="w-6 h-6 text-[var(--neutral)]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Deep Backtesting</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Test custom portfolios of Indian equities, debt, and gold against historical data dating back to 2005. Analyze max drawdowns and rolling returns.
                </p>
              </div>

              <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[var(--positive-subtle)] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-[var(--positive)]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Factor Analysis</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Go beyond simple returns. Decompose mutual fund performance using Fama-French models adapted for the Indian stock market.
                </p>
              </div>

              <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[var(--warning-subtle)] flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-[var(--warning)]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Risk Management</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Run Monte Carlo simulations to forecast portfolio survival rates and model dynamic asset allocation strategies.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-[var(--text-muted)] border-t border-[var(--border)]">
        <p>© 2026 Artha Analytics. Built for India.</p>
      </footer>
    </div>
  )
}
