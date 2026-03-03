import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart2, Briefcase, Activity, PieChart, Shield, Calculator as CalcIcon, LineChart } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Logo />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>Artha</span>
        </Link>

        {/* Mega Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          
          <div className="group relative py-6">
            <span className="cursor-pointer hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
              Products <span className="opacity-50 text-[10px]">▼</span>
            </span>
            
            {/* Dropdown */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[600px] bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6 grid grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 border-b border-[var(--border)] pb-2">
                  Backtesting
                </h3>
                <Link href="/analytics/backtest" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <BarChart2 className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Backtest Portfolio</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Test your funds against history</div>
                  </div>
                </Link>
                <Link href="/analytics/asset-allocation" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <PieChart className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Asset Allocation</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Test macro blends and models</div>
                  </div>
                </Link>
                <Link href="/analytics/dynamic-allocation" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <Activity className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Dynamic Allocation</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Market-timing strategies</div>
                  </div>
                </Link>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 border-b border-[var(--border)] pb-2">
                  Portfolio Analysis
                </h3>
                <Link href="/portfolio" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <Briefcase className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Portfolio X-Ray</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Deep dive into holdings</div>
                  </div>
                </Link>
                <Link href="/analytics/factor-regression" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <LineChart className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Factor Analysis</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Fama-French models for India</div>
                  </div>
                </Link>
                <Link href="/analytics/manager-performance" className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                  <Shield className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] mt-0.5 transition-colors" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Manager Performance</div>
                    <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">Alpha generation vs index</div>
                  </div>
                </Link>
              </div>

            </div>
          </div>

          <div className="group relative py-6">
            <span className="cursor-pointer hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
              Calculators <span className="opacity-50 text-[10px]">▼</span>
            </span>
            
            {/* Dropdown */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[300px] bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 space-y-2">
              <Link href="/calculators/sip" className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center group-hover/item:bg-[var(--accent-subtle)] transition-colors">
                  <CalcIcon className="w-4 h-4 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] transition-colors" />
                </div>
                <div className="font-medium text-sm text-[var(--text-primary)]">SIP Calculator</div>
              </Link>
              <Link href="/calculators/fire" className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center group-hover/item:bg-[var(--accent-subtle)] transition-colors">
                  <CalcIcon className="w-4 h-4 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] transition-colors" />
                </div>
                <div className="font-medium text-sm text-[var(--text-primary)]">FIRE Calculator</div>
              </Link>
              <Link href="/calculators/goal" className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center group-hover/item:bg-[var(--accent-subtle)] transition-colors">
                  <CalcIcon className="w-4 h-4 text-[var(--text-muted)] group-hover/item:text-[var(--accent-brand)] transition-colors" />
                </div>
                <div className="font-medium text-sm text-[var(--text-primary)]">Goal Planner</div>
              </Link>
            </div>
          </div>

          <Link href="/pricing" className="hover:text-[var(--text-primary)] transition-colors">Pricing</Link>
          <Link href="/learn" className="hover:text-[var(--text-primary)] transition-colors">Learn</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Log In
          </Link>
          <Button asChild className="rounded-full px-6">
            <Link href="/login?mode=signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
