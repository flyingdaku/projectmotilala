# 🇮🇳 IndiaQuant — Product Plan v1.0
### A Portfolio Visualizer + PinkLion for Indian Investors
*Last updated: February 2026*

---

## Table of Contents
1. [Product Vision](#vision)
2. [Target Users](#users)
3. [Information Architecture & UI Philosophy](#ia)
4. [Navigation Structure](#nav)
5. [Phase 0 — Viral Hook Tools](#phase0)
6. [Phase 1 — Core Portfolio Tracking MVP](#phase1)
7. [Phase 2 — India Tax Engine](#phase2)
8. [Phase 3 — India Backtesting Engine](#phase3)
9. [Phase 4 — Retirement & Goal Planning](#phase4)
10. [Phase 5 — Power Analytics & Research](#phase5)
11. [Phase 6 — Broker Integrations & Mobile](#phase6)
12. [Pricing Architecture](#pricing)
13. [Data Sources](#data)
14. [Tech Stack Recommendations](#tech)

---

## 1. Product Vision <a name="vision"></a>

> **"The only platform where an Indian investor can backtest their allocation, track their real portfolio, compute their tax liability, and simulate their retirement — all in one place, built for INR, Indian tax laws, and Indian market data."**

### What We Are
- **Portfolio Visualizer** for Indian asset classes (Nifty 500, Gold, G-Sec, MF categories) going back to 1990
- **PinkLion** for live Indian portfolio tracking with CAS import and XIRR
- **Sharesight** for Indian tax reporting (STCG, LTCG, grandfathering, ELSS)
- **Portfolio Charts** for India-specific withdrawal rate research and FIRE planning
- **Nothing that exists in India today** — no single tool combines all of this

### What We Are Not
- Not a broker (no order execution)
- Not a mutual fund distributor (no regular plan recommendations)
- Not a robo-advisor (no SEBI registration required for analytics tools)
- Not a trading platform (no F&O analytics in v1)

### Core Design Principles
1. **India-first, not India-adapted** — INR default, FY dates (Apr–Mar), Indian benchmarks, Indian tax laws
2. **Show the math** — every number is explainable, every chart is downloadable
3. **No ads, no affiliate links** — trust is the product; revenue only from subscriptions
4. **Free tier is genuinely useful** — the viral tools are fully free, no email required
5. **One screen = one answer** — each tool answers one specific question clearly

---

## 2. Target Users <a name="users"></a>

### Primary: The DIY Investor (80% of users)
- Age 25–45, salaried, investing ₹10K–₹1L/month
- Has Zerodha or Groww account, does SIPs in 3–8 mutual funds
- Tracks portfolio manually in Excel or doesn't track at all
- Tax filing is painful — doesn't know exact LTCG/STCG until CA tells them in July
- **Pain:** "Am I beating the index? Am I investing in the right mix? How much tax will I pay?"

### Secondary: The FIRE Planner (10% of users)
- Age 28–42, high earner (₹20–60L+ per year), aggressive saver (40–60% savings rate)
- Active on r/FIREIndia, Twitter investing community, Telegram groups
- Has heard of the "4% rule" but knows it doesn't apply to India
- **Pain:** "What is India's safe withdrawal rate? How many years to FI? Can I retire at 45?"

### Tertiary: The RIA / Financial Advisor (10% of users, 30% of revenue)
- SEBI-registered investment advisor managing 50–200 client portfolios
- Needs: client-level reporting, tax reports to share with CA, portfolio analytics to justify recommendations
- **Pain:** "I need to show clients their true performance and tax liability, and currently do it manually in Excel"

---

## 3. Information Architecture & UI Philosophy <a name="ia"></a>

### The Core UI Problem to Solve
Most finance tools fail in one of two ways:
1. **Too simple** (Groww, INDmoney) — show you what you have, not what it means
2. **Too complex** (Portfolio Visualizer, Koyfin) — powerful but intimidating, no guided flow

The solution is **progressive disclosure** — simple surface, deep on demand.

### Progressive Disclosure Model
```
Layer 1 (visible by default):     The answer — one number, one chart, one insight
Layer 2 (one click away):          The explanation — how we calculated it, what it means
Layer 3 (expandable/settings):    The assumptions — change inputs, re-run, export
```

**Example — Portfolio Dashboard:**
- Layer 1: "Your portfolio is up ₹3.4L (+18.2% XIRR) — beating Nifty 50 by 3.1%"
- Layer 2: Click → see per-holding breakdown, XIRR by asset class, rolling chart
- Layer 3: Click "Change benchmark" → pick from 8 Indian benchmarks

### Visual Language
- **Primary color:** Deep navy (#0F1B2D) — conveys trust, not casino
- **Accent:** Saffron/amber (#F59E0B) — India identity without being garish
- **Success/positive:** Emerald green (#10B981)
- **Loss/negative:** Warm red (#EF4444) — never panic-inducing, just informative
- **Typography:** Inter for UI, JetBrains Mono for numbers (all financial numbers in monospace)
- **Charts:** Recharts or Plotly — clean, no chart junk, tooltips on hover
- **Data density:** Medium — more than a banking app, less than Bloomberg

### INR Formatting Rules (applied everywhere)
- < ₹1,000: show as ₹945
- ₹1,000 – ₹99,999: show as ₹45,230
- ₹1L – ₹99L: show as ₹12.4L (lakhs, 1 decimal)
- ₹1Cr+: show as ₹2.34Cr (crores, 2 decimals)
- In tables: always right-aligned, same decimal precision per column
- Percentages: always show sign (+18.2% or -4.5%), green/red color-coded

---

## 4. Navigation Structure <a name="nav"></a>

### Top-Level Navigation (Sidebar on Desktop, Bottom Tab on Mobile)

```
🏠  Dashboard          — Net worth snapshot, daily change, top movers
📊  Portfolio          — Holdings, performance, allocation breakdown
💰  Tax                — LTCG/STCG report, harvesting, ELSS tracker
📈  Backtest           — India asset backtest, SIP simulator, heat map
🎯  Goals & Retire     — FI calculator, Monte Carlo, goal tracker
🔍  Research           — Screener, stock pages, mutual fund analysis
⚙️  Settings           — Accounts, broker sync, tax settings, plan
```

### Sub-Navigation Within Each Section

**Portfolio section:**
```
Portfolio/
  ├── Overview          (net worth, XIRR, day change)
  ├── Holdings          (equity, MF, gold, debt, others — tabbed)
  ├── Performance       (vs benchmark, rolling returns, contribution analysis)
  ├── Allocation        (pie by asset class, sector, market cap)
  └── Income            (dividends, SGB interest, FD interest)
```

**Tax section:**
```
Tax/
  ├── Summary           (total LTCG, STCG, estimated tax — current FY)
  ├── Capital Gains     (full FIFO lot-level report)
  ├── Harvesting        (opportunities to harvest gains/losses)
  ├── Direct vs Regular (switch analyzer)
  └── ELSS & 80C        (lock-in tracker, 80C utilization)
```

**Backtest section:**
```
Backtest/
  ├── Asset Allocation  (build & compare portfolio strategies)
  ├── SIP Simulator     (test SIP across all start years)
  ├── Heat Map          (year × holding period CAGR grid)
  ├── Drawdown          (crash scenarios, max drawdown)
  └── Named Portfolios  (pre-built India allocation strategies)
```

**Goals & Retire section:**
```
Goals/
  ├── My Goals          (education, wedding, house, emergency, custom)
  ├── FI Calculator     (savings rate → years to FI)
  ├── Retirement Sim    (Monte Carlo, NPS/EPF inputs)
  └── Withdrawal Rates  (India safe WR chart — the signature feature)
```

**Research section:**
```
Research/
  ├── Stock Screener    (NSE/BSE with India-specific filters)
  ├── MF Screener       (by category, AMC, returns, expense ratio)
  ├── Stock Page        (fundamentals, charts, quality score)
  └── MF Page           (NAV history, portfolio overlap, returns)
```

---

## 5. Phase 0 — Viral Hook Tools <a name="phase0"></a>
**Timeline: Month 1–2 | Team: 1 engineer | Zero auth required**

These tools live at standalone URLs (e.g., indiaquant.in/heatmap), require no login,
load in under 2 seconds, and have a "Share this chart" button on every result.
Goal: 50,000 organic visits and 5,000 email signups before the MVP launches.

---

### Tool 1: India Asset Class Heat Map
**URL:** /tools/heatmap
**Tagline:** "What if you had invested in any year since 1990?"

#### Feature List
- [ ] Grid display: rows = start year (1990–2024), columns = years held (1–30)
- [ ] Each cell shows: CAGR for that specific (start year, duration) combination
- [ ] Color scale: deep red (negative) → white (0%) → deep green (positive real returns)
- [ ] Toggle: Nominal returns vs. Inflation-adjusted (India CPI) returns
- [ ] Asset selector: Nifty 50 | Nifty 500 | Nifty Midcap | Gold | Short Duration Debt | Balanced (60/40)
- [ ] Hover tooltip: "₹1L invested in 1999, held for 10 years = ₹3.45L (13.2% CAGR)"
- [ ] Highlight row on click: show all returns for a given start year
- [ ] Highlight column on click: show all returns for a given holding period
- [ ] "Worst cell" and "Best cell" auto-highlighted with labels
- [ ] Download as PNG button (for Twitter/WhatsApp sharing)
- [ ] Email capture: "Get notified when we add more assets" below the chart

#### UI Layout
```
┌─────────────────────────────────────────────────────────┐
│  India Heat Map                          [Asset ▼] [CPI toggle]
│                                                         │
│  Asset: Nifty 50 (1990–2024) — Inflation-adjusted CAGR │
│                                                         │
│       1yr  2yr  3yr  5yr  7yr  10yr 15yr 20yr 25yr 30yr│
│  1990 [  ] [  ] [  ] [  ] [  ] [  ] [  ] [  ] [  ] [  ]│
│  1991 ...                                               │
│  ...                                                    │
│  2020 [  ] [  ] [  ] [  ] [  ] [N/A][N/A][N/A][N/A][N/A]│
│                                                         │
│  [Download Chart]  [Share]  [Get email updates]         │
└─────────────────────────────────────────────────────────┘
```

---

### Tool 2: SIP vs Lump Sum Visualizer
**URL:** /tools/sip-vs-lumpsum
**Tagline:** "Does timing the market beat time in the market?"

#### Feature List
- [ ] Input: Monthly SIP amount (₹) or equivalent lump sum
- [ ] Input: Start date (month/year picker, from 1995)
- [ ] Input: End date (default: today)
- [ ] Asset: Nifty 50 | Nifty 500 | Nifty Midcap | Gold | User's choice
- [ ] Output — SIP card: Final corpus, XIRR, total invested, absolute gain (₹ and %)
- [ ] Output — Lump Sum card: Final corpus, CAGR, total invested, absolute gain (₹ and %)
- [ ] Chart: Month-by-month portfolio value for both strategies on same axis
- [ ] Annotation: Auto-mark crash dates (2008, 2020 etc.) on chart with labels
- [ ] Show "SIP advantage during crash" — highlight the dip-buying effect visually
- [ ] Step-up SIP mode: "Increase SIP by 10% annually" checkbox
- [ ] Shareable URL: each result has a unique URL (e.g., /tools/sip?asset=nifty50&start=2010-01)

#### UI Layout
```
┌───────────────────────────────────────────────────────────┐
│  SIP vs Lump Sum                                          │
│                                                           │
│  [Asset: Nifty 50 ▼]  [From: Jan 2010 ▼]  [To: Feb 2026]│
│  [SIP Amount: ₹10,000/mo]  [Step-up: 10%/yr ☐]          │
│                           [Calculate →]                   │
│                                                           │
│  ┌─────────────────┐    ┌─────────────────┐              │
│  │    SIP Result   │    │  Lump Sum Equiv │              │
│  │  ₹38.4L corpus  │    │  ₹31.1L corpus  │              │
│  │  XIRR: 14.2%    │    │  CAGR: 12.8%    │              │
│  │  Invested: ₹19L │    │  Invested: ₹19L │              │
│  │  +₹19.4L gain   │    │  +₹12.1L gain   │              │
│  └─────────────────┘    └─────────────────┘              │
│                                                           │
│  [Portfolio value chart, both on same axis]               │
│                                                           │
│  [Share this result]  [Try another asset]                 │
└───────────────────────────────────────────────────────────┘
```

---

### Tool 3: Direct vs Regular Mutual Fund Calculator
**URL:** /tools/direct-vs-regular
**Tagline:** "How much is your distributor charging you in lifetime returns?"

#### Feature List
- [ ] Input: Fund category selector (Large Cap, Flexi Cap, ELSS, etc.) OR manual expense ratio input
- [ ] Auto-fill: Regular plan TER vs Direct plan TER (AMFI data, pre-loaded for all categories)
- [ ] Input: Current investment amount (lump sum or monthly SIP)
- [ ] Input: Investment horizon (years)
- [ ] Input: Expected gross return % (pre-set to category historical average, editable)
- [ ] Output: Side-by-side corpus — Regular plan vs Direct plan at end of period
- [ ] Output: "You lose ₹X.X Lakhs to your distributor over Y years"
- [ ] Output: Year-by-year gap chart (gap widens exponentially — shocking visual)
- [ ] Output: "Switch analysis" — if currently in regular plan:
  - [ ] Current unrealized gain (estimated)
  - [ ] Tax on switching today (LTCG/STCG)
  - [ ] Break-even months: when do savings exceed the tax cost of switching?
  - [ ] Verdict: "Switch now" / "Wait X months for LTCG" / "Already optimal"
- [ ] Fund-specific lookup: type a fund name → auto-fetch direct vs regular TER from AMFI

#### UI Layout
```
┌────────────────────────────────────────────────────────────┐
│  Direct vs Regular Calculator                              │
│                                                            │
│  Fund category: [Flexi Cap ▼]  OR  [Enter fund name]      │
│  Regular TER: 1.82%  |  Direct TER: 0.41%  (auto-filled)  │
│                                                            │
│  Investment: [₹ 5,000/month ▼]   Horizon: [20 years ▼]   │
│  Expected return: [12% gross ▼]          [Calculate →]    │
│                                                            │
│  ╔══════════════════╗  ╔══════════════════╗               │
│  ║  Regular Plan    ║  ║  Direct Plan     ║               │
│  ║  ₹44.7L          ║  ║  ₹51.2L          ║               │
│  ╚══════════════════╝  ╚══════════════════╝               │
│                                                            │
│  ⚠️  You lose ₹6.5 Lakhs by staying in Regular Plan       │
│                                                            │
│  [Gap over time chart — exponential divergence]           │
│                                                            │
│  [Already in Regular Plan? See switch analysis ↓]         │
└────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 1 — Core Portfolio Tracking MVP <a name="phase1"></a>
**Timeline: Month 2–4 | Tier: Free + Investor (₹199/mo)**

---

### 1.1 Onboarding Flow

#### Step-by-step onboarding (first-time user)
```
Step 1: "How do you want to add your portfolio?"
  Option A → Upload CAS PDF            (recommended — covers all MF)
  Option B → Import broker CSV         (for equity/ETF heavy users)
  Option C → Connect broker (Zerodha)  (Phase 6, show as "coming soon" in MVP)
  Option D → Add manually              (for anyone)

Step 2: (If CAS) "Drop your CAS PDF here"
  → Parse automatically
  → Show preview: "We found 12 mutual funds, 3 AMCs, ₹8.4L total"
  → Confirm and import

Step 3: "Add your other assets" (optional, skippable)
  → Equity holdings (if not in CAS)
  → PPF balance
  → EPF balance
  → FD details
  → Physical Gold (grams)
  → NPS corpus

Step 4: Set tax preferences
  → Financial year start: April (default, fixed)
  → Tax slab: 20% / 30% (for tax liability estimates)
  → State of residence (for professional tax, future use)

Step 5: Dashboard ready → celebrate with "Your portfolio is live 🎉"
```

---

### 1.2 CAS Import Engine

#### Feature List
- [ ] Accept CAMS CAS PDF and KFintech CAS PDF (two different formats)
- [ ] Parse: folio number, scheme name, AMFI code, units held, NAV as of date, current value
- [ ] Parse: all transaction history — purchase date, units, NAV, amount (for XIRR and tax)
- [ ] Auto-detect: Direct vs Regular plan from scheme name
- [ ] Auto-detect: ELSS funds (for 80C tracker)
- [ ] Auto-match AMFI code → current NAV via mfapi.in API
- [ ] Handle: dividend reinvestment entries, switch transactions, STP entries
- [ ] Show import summary before confirming
- [ ] Flag any unrecognized entries for manual review
- [ ] Re-import on update: "Upload new CAS to sync latest transactions"

---

### 1.3 Holdings Management

#### Holdings Table — Equity Tab
| Column | Description |
|--------|-------------|
| Stock | NSE ticker + company name + sector badge |
| Qty | Units held |
| Avg Cost | Average purchase price (₹) |
| Current Price | Live (delayed 15min free, real-time paid) |
| Current Value | Qty × Current Price |
| P&L (₹) | Unrealized gain/loss in rupees |
| P&L (%) | % gain/loss from avg cost |
| XIRR | Personal return accounting for purchase timing |
| Holding Period | Days since first purchase |
| LTCG eligible? | Yes/No badge (crossed 1 year) |

#### Holdings Table — Mutual Funds Tab
| Column | Description |
|--------|-------------|
| Fund | Scheme name (truncated) + AMC logo |
| Plan | Direct / Regular badge (colored) |
| Category | Large Cap / Flexi Cap / ELSS etc. |
| Units | Total units across all folios |
| Avg NAV | Average purchase NAV |
| Current NAV | Today's NAV (from AMFI, updated by 11pm daily) |
| Current Value | Units × Current NAV |
| Invested | Total amount invested (all SIPs + lumpsum) |
| P&L (₹) | Unrealized gain |
| XIRR | Personal XIRR |
| ELSS Lock-in | Unlock date for oldest locked units (if ELSS) |

#### Holdings Table — Others Tab
- PPF: balance, rate, maturity date, projected maturity amount
- EPF: balance, monthly contribution, projected corpus
- NPS: corpus, allocation (E/C/G), fund house
- FDs: bank, amount, rate, maturity date, interest income this FY
- SGBs: grams, issue price, current gold price, CAGR
- Physical Gold: grams, estimated value (based on MCX spot)

---

### 1.4 Dashboard Screen

#### Layout (Desktop — 3 column grid)
```
┌─────────────────────────────────────────────────────────────────┐
│  Good morning, Aakash  |  FY 2025–26  |  Feb 20, 2026         │
├──────────────┬──────────────┬──────────────────────────────────┤
│ NET WORTH    │ TODAY'S MOVE │  PORTFOLIO XIRR                  │
│ ₹48.4L       │ +₹12,450     │  18.4% pa                        │
│ +₹8.2L       │ (+0.26%)     │  vs Nifty 50: 15.3%             │
│ since invest │              │  You're beating by +3.1%         │
├──────────────┴──────────────┴──────────────────────────────────┤
│  ALLOCATION PIE                │  PERFORMANCE CHART (1Y)       │
│  [Equity 62% | MF 28%          │  [Line chart: portfolio vs    │
│   Debt 5% | Gold 3%            │   Nifty 50, normalized]       │
│   Others 2%]                   │                               │
├────────────────────────────────┴───────────────────────────────┤
│  TOP MOVERS (today)            │  UPCOMING                     │
│  RELIANCE  +2.4%  +₹3,200      │  • ELSS unlocks in 18 days    │
│  HDFCBANK  -1.1%  -₹1,100      │  • SIP due: 5 Mar ₹15,000    │
│  PGIM Flexi +0.3% +₹800        │  • FY ends in 39 days         │
│                                │  • LTCG harvest opportunity   │
├────────────────────────────────┴───────────────────────────────┤
│  TAX SNAPSHOT (FY 2025–26)                                     │
│  LTCG realized: ₹42,000  |  LTCG exemption left: ₹83,000      │
│  STCG realized: ₹8,200   |  Estimated tax: ₹5,250             │
│  [See full tax report →]                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

### 1.5 Performance Screen

#### Feature List
- [ ] Time range selector: 1M | 3M | 6M | 1Y | 3Y | 5Y | All time | Custom
- [ ] FY selector: FY24-25 | FY25-26 (aligns with Indian tax year)
- [ ] Primary chart: Portfolio value vs chosen benchmark, normalized to same start
- [ ] Metric cards: XIRR, absolute P&L (₹), CAGR (for clean lump-sum periods), TWR
- [ ] Contribution analysis table:
  - Which holdings added/subtracted most to total return
  - Column: Holding | Contribution (₹) | Contribution (%) | XIRR
  - Sort by biggest contributor
- [ ] Benchmark selector: Nifty 50 | Nifty 500 | Nifty Midcap 150 | BSE Sensex | SBI FD Rate | Custom
- [ ] Asset class performance breakdown: how did equity vs MF vs gold perform separately
- [ ] Rolling returns chart: 1Y rolling XIRR over portfolio life

---

### 1.6 Allocation Screen

#### Feature List
- [ ] Allocation by asset class (equity, debt MF, liquid MF, ELSS, gold, PPF/EPF, FD, others)
- [ ] Allocation by sector (for equity holdings — auto-fetched from NSE sector classification)
- [ ] Allocation by market cap (Large/Mid/Small — for equity + equity MF, with MF look-through)
- [ ] Allocation by AMC (for MF — how concentrated are you in one AMC?)
- [ ] Geographic allocation: India vs US vs Global (if user holds US ETFs/funds)
- [ ] "MF Look-Through" toggle: when enabled, the equity pies include what your equity MFs own
- [ ] Target allocation: set target % for each asset class, show deviation from target
- [ ] Rebalancing suggestion: "You're 8% overweight in Large Cap. Redirect next SIP to Midcap?"

---

## 7. Phase 2 — India Tax Engine <a name="phase2"></a>
**Timeline: Month 4–7 | Tier: Investor (₹199/mo) for report, Pro for optimizer**

---

### 2.1 Tax Summary Screen

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Tax Summary  |  FY 2025–26  [Change FY ▼]                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ LTCG         │  │ STCG         │  │ EST. TAX LIABILITY   │  │
│  │ ₹1,24,000    │  │ ₹18,500      │  │ ₹17,825 (@ 30% slab) │  │
│  │ Equity only  │  │ Equity       │  │ Update slab →        │  │
│  │ ₹1,000 exempt│  │              │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ALERTS                                                         │
│  🟡 LTCG exemption: ₹1,000 of ₹1,25,000 used (₹1,24,000 left) │
│  🟢 3 holdings become LTCG-eligible in next 30 days             │
│  🔴 Year-end in 39 days — harvest ₹X in losses before Mar 31   │
├─────────────────────────────────────────────────────────────────┤
│  [Download PDF report]  [Share with CA]  [See lot-level detail] │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Capital Gains Lot-Level Report

#### Feature List
- [ ] Every disposed lot listed: stock/fund, buy date, sell date, units, buy price, sell price
- [ ] Auto-computed: holding period (days), gain/loss (₹), type (LTCG/STCG)
- [ ] Grandfathering: for pre-Jan 31, 2018 equity purchases, auto-apply higher of cost or Jan 31 2018 price
- [ ] Grandfathering price auto-fetched from NSE historical data per ticker
- [ ] FIFO lot matching by default; option to switch to LIFO or Highest Cost First
- [ ] MF units: FIFO across all folios of same scheme
- [ ] Filter by: LTCG | STCG | All | Equity | MF | Loss-making only
- [ ] Sort by: date, gain amount, holding period
- [ ] ITR-2 compatible grouping: Schedule CG format
- [ ] Export: PDF (clean report for CA), Excel (raw data for import into ITR software)

---

### 2.3 LTCG Harvesting Optimizer

#### Feature List
- [ ] Show current LTCG realized this FY and remaining exemption (₹1.25L limit)
- [ ] List all holdings with unrealized LTCG eligible gains (held > 1 year)
- [ ] For each: show "units to sell to stay within ₹1.25L exemption"
- [ ] Recommendation: "Sell X units of RELIANCE (gain = ₹38,000) + Y units of HDFC MF (gain = ₹72,000) = total ₹1,10,000 — within exemption limit"
- [ ] "Buy back immediately" option explanation: you can immediately repurchase to reset cost basis (no wash sale rule in India unlike US)
- [ ] FY deadline countdown: "39 days left to harvest"
- [ ] Loss harvesting: show unrealized STCG losses to offset existing realized STCG

---

### 2.4 Direct vs Regular Switch Analyzer

#### Feature List
- [ ] Auto-detect all Regular plan MF holdings from portfolio
- [ ] For each Regular fund, show:
  - [ ] Current corpus value
  - [ ] Unrealized gain (₹ and %)
  - [ ] Estimated LTCG/STCG tax if switched today
  - [ ] Equivalent Direct plan scheme (auto-matched by scheme name)
  - [ ] Annual saving after switching (TER difference × corpus)
  - [ ] Break-even months (tax cost / annual saving)
  - [ ] Recommendation: "Switch now" / "Wait X months for LTCG" / "Already Direct"
- [ ] Portfolio-level summary: "Total annual drag from Regular plans: ₹X,XXX"
- [ ] Optimal switch schedule: sorted by highest break-even priority, respecting ₹1.25L LTCG limit per year

---

### 2.5 ELSS & 80C Tracker

#### Feature List
- [ ] List all ELSS holdings with purchase lots and lock-in expiry dates
- [ ] Calendar view: which months have ELSS units unlocking
- [ ] Value unlocking per period: "₹32,000 worth of units unlock in March 2026"
- [ ] 80C utilization meter:
  - [ ] ELSS invested this FY
  - [ ] EPF employee contribution (manual input)
  - [ ] PPF contribution this FY
  - [ ] Total 80C used vs ₹1.5L limit
  - [ ] "₹X remaining — invest more before March 31 to save ₹Y in tax"
- [ ] 80CCD(1B) tracker: NPS additional contribution (₹50K extra deduction)
- [ ] HRA/LTA not included (out of scope — this is portfolio-specific)

---

## 8. Phase 3 — India Backtesting Engine <a name="phase3"></a>
**Timeline: Month 7–12 | Tier: Analyst (₹499/mo)**

---

### 3.1 Asset Allocation Backtest Screen

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Build Your Portfolio                                           │
│                                                                 │
│  Portfolio A          Portfolio B          Portfolio C          │
│  [Nifty 500:  60% ]  [Nifty 500:  70% ]  [Benchmark: Nifty 50]│
│  [Gold:       20% ]  [Nifty Mid:  20% ]                        │
│  [Short Dur:  20% ]  [Gold:       10% ]                        │
│  Total: 100% ✅       Total: 100% ✅                            │
│                                                                 │
│  Settings:                                                      │
│  Start year: [1995 ▼]   End: [2026 ▼]   Rebalance: [Annual ▼] │
│  Mode: [Lump Sum ▼]     Amount: [₹10,00,000]                   │
│  Inflation adjust: [On ✅]                                      │
│                                [Run Backtest →]                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Results Layout (after running)
```
┌─────────────────────────────────────────────────────────────────┐
│  Results  (1995–2026, 31 years)                                 │
├───────────────────┬───────────────────┬─────────────────────── ┤
│                   │   Portfolio A     │   Portfolio B          │
│  CAGR (real)      │   9.4%            │   10.1%                │
│  Max Drawdown     │  -42% (2008)      │  -51% (2008)           │
│  Recovery (mo)    │  28               │  34                    │
│  Sharpe (vs FD)   │  0.74             │  0.81                  │
│  Final Corpus     │  ₹1.12 Cr         │  ₹1.31 Cr              │
│  Worst Year       │  -28% (2008)      │  -38% (2008)           │
│  Best Year        │  +71% (2003)      │  +84% (2003)           │
├───────────────────┴───────────────────┴────────────────────────┤
│  [Growth chart]  [Rolling Returns]  [Drawdown]  [Annual Table] │
└─────────────────────────────────────────────────────────────────┘
```

#### Feature List
- [ ] Add up to 3 portfolios including benchmark
- [ ] Asset library: all Indian asset class proxies (see Section 13)
- [ ] Rebalancing: Never | Annual | Semi-annual | Quarterly | ±5% threshold
- [ ] Investment mode: Lump sum | Monthly SIP | Step-up SIP (10%/yr)
- [ ] Date range: 1990/1995/2000 (dependent on asset) to present
- [ ] Output tabs:
  - [ ] Summary stats table (all metrics side by side)
  - [ ] Growth chart (portfolio value over time, log/linear toggle)
  - [ ] Rolling returns (1Y, 3Y, 5Y, 10Y rolling CAGR over time)
  - [ ] Annual returns table (FY-based, April–March)
  - [ ] Drawdown chart (depth and duration of every drawdown)
  - [ ] Year-by-year comparison heatmap
- [ ] Save portfolio: "Save as 'My All-Weather India'" to load later
- [ ] Share: unique URL for each backtest configuration

---

### 3.2 SIP Backtest Simulator

#### Feature List
- [ ] Test: "₹5,000/month SIP starting from every possible month since 1995"
- [ ] Asset selector: Nifty 50, Nifty 500, Nifty Midcap, or any index in library
- [ ] SIP duration: 5 / 10 / 15 / 20 / 25 years
- [ ] Step-up option: 0% / 5% / 10% / 15% annual increase
- [ ] Output:
  - [ ] Distribution chart: all historical SIP outcomes as histogram
  - [ ] Best start year, worst start year, median start year
  - [ ] Table: start year | final corpus | XIRR | total invested | absolute gain
  - [ ] "If you started in 2008 (worst) vs 2004 (best), difference = ₹X lakhs"
  - [ ] Probability of achieving target corpus: "at ₹15K/mo for 20 years, X% of start years beat ₹1 Cr"

---

### 3.3 India Asset Heat Map (Full Interactive Version)

Full version of the Phase 0 viral tool, now embedded in the product:
- [ ] All assets in the library available (not just Nifty 50)
- [ ] Custom portfolio blend as an asset (e.g., 60/40 Nifty/Debt as one heatmap)
- [ ] FY-aligned version: rows = FY start, columns = FYs held
- [ ] Hover shows: absolute gain on ₹1L invested, CAGR, inflation-adjusted equivalent
- [ ] Download as CSV (all values), PNG (for sharing)

---

### 3.4 Named India Portfolio Library

Each portfolio page includes:
- [ ] Allocation table with rationale
- [ ] Full backtest results (all metrics, all charts) auto-generated
- [ ] Tyler-style commentary: "why this allocation, who it's for, what it sacrifices"
- [ ] Link to Backtest screen with this portfolio pre-loaded

| Portfolio Name | Allocation | Target User |
|---|---|---|
| All-India 60/40 | 60% Nifty 500 + 40% Short Duration | Moderate risk, wealth builder |
| Indian Permanent | 25% Nifty 50 + 25% Long G-Sec + 25% Gold + 25% Liquid | Capital preservation, all-weather |
| FIRE Accumulator | 70% Nifty 500 + 10% Nifty Midcap + 10% Intl + 10% Gold | Long-horizon aggressive growth |
| Conservative Retiree | 30% Nifty 50 + 50% Short Dur + 20% Gold | Capital protection + income |
| Flexi-Cap Heavy | 60% Nifty 500 + 20% Nifty Midcap 150 + 20% Gold | Growth with volatility tolerance |
| NPS Auto (age 35) | 50% Eq + 30% Corp Bond + 20% G-Sec | NPS equivalent benchmark |
| Three-Asset India | 50% Nifty 500 + 30% Debt + 20% Gold | Simplest diversified portfolio |

---

### 3.5 India Crash Scenario Library

Pre-loaded historical crash scenarios, available in Backtest screen as date presets:

| Scenario | Period | Nifty Drop | Trigger |
|---|---|---|---|
| Kargil + IT bubble | Jan 2000 – Mar 2003 | -56% | Dot-com bust + geopolitical |
| Global Financial Crisis | Jan 2008 – Mar 2009 | -60% | Subprime mortgage collapse |
| Eurozone + INR crisis | Nov 2010 – Dec 2011 | -25% | INR fell to 55/USD |
| Demonetisation | Nov 2016 – Dec 2016 | -10% | Cash crunch, liquidity shock |
| IL&FS + NBFC crisis | Sep 2018 – Feb 2019 | -15% | Credit market freeze |
| COVID crash | Feb 2020 – Mar 2020 | -38% | Fastest 38% crash in history |
| 2024–25 Smallcap correction | Sep 2024 – present | -30% MidSmall | Valuation excess unwinding |

---

## 9. Phase 4 — Retirement & Goal Planning <a name="phase4"></a>
**Timeline: Month 10–15 | Tier: Analyst (₹499/mo)**

---

### 4.1 India Withdrawal Rate Chart (Signature Feature)

**This does not exist anywhere for Indian data. This is the product's Portfolio Charts moment.**

#### Feature List
- [ ] Using Nifty 500 + Gold + Debt historical returns from 1990–2026
- [ ] For each historical start year: compute the maximum annual withdrawal (as % of corpus) that would have lasted the chosen period
- [ ] Display four lines:
  - Blue: Individual withdrawal rates per start year
  - Orange: India SAFEMAX — worst-case safe withdrawal rate
  - Green: Perpetual WR — never touched real principal
  - Grey: Median WR
- [ ] Duration selector: 10 / 15 / 20 / 25 / 30 / 35 / 40 years
- [ ] Portfolio selector: choose from named portfolio library or custom blend
- [ ] Toggle: Nominal vs Real (inflation-adjusted) withdrawals
- [ ] "India vs US comparison" toggle: overlay US 4% rule line for context
- [ ] Key insight auto-generated: "For a 30-year retirement starting in India, the Safe WR has historically been X.X% — compared to 4% for US portfolios"
- [ ] Download as image (extremely shareable in FIRE communities)
- [ ] Methodology footnote: fully transparent about data sources and assumptions

---

### 4.2 Monte Carlo Retirement Simulator

#### Input Panel
```
Current age: [35]          Retirement age: [50]
Current corpus: [₹ 50L]    Monthly expense (today's ₹): [₹ 80,000]
Monthly SIP till retire: [₹ 50,000]   SIP step-up: [10%/yr]
Expected India inflation: [6% default, editable]
Expected return (pre-retire): [12% — Nifty 500 historical]
Expected return (post-retire): [10% — conservative allocation]

Include:
  EPF at retirement: [₹ 30L manual]
  NPS at retirement: [₹ 15L manual]
  PPF maturity: [₹ 8L manual]
  Rental income: [₹ 0/mo from age 50]

Run 10,000 simulations → [Calculate]
```

#### Output Panel
- [ ] Probability of corpus surviving to age 85 / 90 / 95
- [ ] Median corpus at age 85 (in today's ₹ purchasing power)
- [ ] Fan chart: 10th, 25th, 50th, 75th, 90th percentile corpus paths
- [ ] Breakdown: how much of retirement corpus comes from market vs EPF/NPS/PPF
- [ ] "What if I retire at 55 instead of 50?" quick sensitivity slider
- [ ] "What if I reduce expenses by 10%?" sensitivity slider
- [ ] Warning if probability of success < 80%: "Consider increasing SIP or reducing target spend"

---

### 4.3 FI Calculator

#### Feature List
- [ ] Input: Current monthly expense, target monthly expense at retirement (often different)
- [ ] Input: Current portfolio value, monthly savings amount
- [ ] Auto-compute: FI Number = (annual expense / India Safe WR)
- [ ] Show: years to FI at current savings rate and expected returns
- [ ] Sensitivity table: FI years vs. savings rate (10% to 70% in 5% steps)
- [ ] "What moves the needle most?" ranking: savings rate > expense reduction > return > current corpus
- [ ] "Coast FI" calculator: at what corpus can you stop contributing and coast to FI?
- [ ] "Barista FI": how much part-time income reduces FI years?

---

### 4.4 Goal-Based Planning

#### Goal Templates
- [ ] Child's Higher Education (target year, inflation-adjusted cost estimate)
- [ ] Child's Wedding (target year, cost estimate)
- [ ] House Down Payment (target amount, target year)
- [ ] Emergency Fund (3 / 6 / 12 months of expense)
- [ ] Retirement Corpus (links to Monte Carlo simulator)
- [ ] Custom goal (name, amount, target year)

#### Per-Goal Features
- [ ] Required SIP calculator: "to reach ₹50L in 10 years at 12% returns, SIP = ₹X"
- [ ] Progress gauge: % funded today
- [ ] Allocated holdings: tag specific MF / FD to this goal
- [ ] On-track / off-track status with reason
- [ ] "What if I increase SIP by ₹1,000/mo?" quick impact calculator

---

### 4.5 NPS / EPF / PPF Projection Tool

#### Feature List
- [ ] EPF: current balance + monthly contribution → projected corpus at 58 using current EPF rate (8.25%)
- [ ] NPS Tier-I: current corpus + monthly VPF contribution + employer NPS → project at 60 + show 40% annuity mandate
- [ ] PPF: current balance + annual contribution → projected at maturity (15yr) + extension options
- [ ] Combined view: "At age 60, your guaranteed instruments (EPF+NPS+PPF) will be worth ₹X. Your market portfolio needs to contribute ₹Y more."

---

## 10. Phase 5 — Power Analytics & Research <a name="phase5"></a>
**Timeline: Month 15–24 | Tier: Pro (₹999/mo)**

---

### 5.1 India Stock Screener

#### Filter Categories

**Fundamental:**
- P/E ratio (TTM, FY estimate)
- P/B ratio
- EV/EBITDA
- ROCE (Return on Capital Employed — India's preferred metric over ROE)
- ROE
- Revenue Growth (1yr, 3yr CAGR)
- PAT (Profit After Tax) Growth (1yr, 3yr CAGR)
- Debt/Equity ratio
- Interest coverage ratio
- Dividend yield
- FCF yield
- Promoter holding % (India-specific red/green flag)
- Promoter pledge % (India-specific — high pledge = serious red flag)

**Market:**
- Market cap (with Indian Cr denomination)
- Market cap band (Large >₹20K Cr, Mid ₹5K–20K Cr, Small <₹5K Cr, Micro <₹500 Cr)
- 52-week high/low proximity
- Volume vs 20-day average

**Institutional:**
- FII holding % (trending up/down — India-specific momentum signal)
- DII holding % (trending up/down)
- Mutual fund holding % change QoQ
- Insider buying/selling (SEBI disclosure data)

**Sector/Industry:**
- NSE sector classification
- BSE industry classification
- Index membership (Nifty 50, Nifty 500, Nifty Midcap 150 etc.)

#### Pre-Built Screens
| Screen Name | Criteria |
|---|---|
| Quality Compounders | ROCE > 20%, Debt/Eq < 0.3, Revenue growth > 15%, P/E < 40 |
| Dividend Aristocrats India | Dividend yield > 2.5%, 5yr dividend growth positive, payout < 60% |
| Hidden Gems (Smallcap) | Market cap < ₹2K Cr, ROCE > 15%, Promoter holding > 50%, Low debt |
| Promoter High Conviction | Promoter holding > 70%, no pledge, bought shares in last 2 qtrs |
| FII Darlings | FII holding increased > 2% in last quarter, ROCE > 15% |
| Value Picks | P/E < sector median, P/B < 2, positive FCF, no promoter pledge |
| Momentum + Quality | 6-month return > 20%, ROCE > 15%, Debt/Eq < 0.5 |

---

### 5.2 India Mutual Fund Screener

#### Filter Categories
- AMC (fund house)
- Category: Large Cap / Flexi Cap / ELSS / Midcap / Smallcap / Debt / Hybrid / Index / ETF
- Direct / Regular plan filter
- Expense ratio range (highlight funds >1.5% as overpriced)
- AUM (fund size — avoid very small funds)
- Trailing returns: 1Y, 3Y, 5Y, 10Y
- Rolling return consistency: "beats benchmark X% of rolling 3yr periods"
- Alpha (vs benchmark category, Sortino adjusted)
- Manager tenure (years with this fund)
- Portfolio overlap with other funds in your portfolio

#### Unique India Feature: Portfolio Overlap Analyzer
- Select any two MF schemes → show % of overlapping holdings
- "Your Parag Parikh Flexi Cap and your Axis Bluechip overlap 38% by weight"
- Portfolio-level overlap: "Across your 6 equity MFs, effective unique stock exposure = 43 stocks (you think you own 180)"

---

### 5.3 India Quality Score (Proprietary)

#### Score Components (per NSE/BSE listed stock)
| Sub-Score | Metrics | Weight |
|---|---|---|
| Profitability | ROCE, ROE, PAT margin, CFO/PAT ratio | 30% |
| Growth | Revenue CAGR (3yr), PAT CAGR (3yr), EPS growth | 25% |
| Financial Health | Debt/Equity, Interest coverage, Current ratio, Altman Z proxy | 25% |
| Governance | Promoter holding, Promoter pledge %, Audit qualification flag | 20% |

- Score: 0–100 for each stock
- Portfolio-level weighted average score
- "Before/after" simulator: swap one stock and see portfolio score change
- Score history: track score change over last 4 quarters

---

### 5.4 Portfolio Efficient Frontier (India)

#### Feature List
- [ ] Input: select up to 8 Indian assets from the asset library
- [ ] Compute: every possible combination at 10% intervals
- [ ] Plot: risk (std dev or Ulcer Index) vs return (CAGR) for all combinations
- [ ] Highlight: Max Sharpe (vs India FD rate), Min Volatility, Max Return portfolios
- [ ] Your current allocation: shown as a dot — "are you on the frontier?"
- [ ] Efficient frontier line: the boundary of optimal portfolios
- [ ] "Suggested improvement": "Shift 10% from Large Cap to Gold to move to the frontier"
- [ ] Historical efficient frontier: computed from actual India data (1995–2026)

---

### 5.5 Factor Analysis — India First

#### Feature List
- [ ] Run Fama-French 3-factor model on Indian mutual fund returns
- [ ] India-specific factors computed from BSE data:
  - Market Factor (Nifty 500 excess return over T-bill)
  - SMB: Small-minus-Big (Nifty Smallcap vs Nifty 50 return differential)
  - HML: High-minus-Low (Value minus Growth in Indian equities)
- [ ] For any active MF: output alpha, beta, size tilt, value tilt, R-squared
- [ ] Rolling alpha chart: "Is this fund's alpha consistent or was it a 2018 accident?"
- [ ] "This fund charges 1.5% expense ratio but generates only 0.3% alpha — you're paying 1.2% for factor exposure you can get cheaper via index"
- [ ] Compare two funds: which generates more real alpha per rupee of fees?

---

## 11. Phase 6 — Broker Integrations & Mobile <a name="phase6"></a>
**Timeline: Month 18–30 | Tier: Pro (₹999/mo) for broker sync**

---

### 11.1 Broker Integration Priority

| Priority | Broker | API | User Base | Notes |
|---|---|---|---|---|
| 1 | Zerodha | Kite Connect (paid, ₹2,000/mo) | 7M+ active | Best developer API in India |
| 2 | Groww | No public API (scraper workaround) | 10M+ accounts | MF + equity both |
| 3 | Upstox | Upstox API v2 (free) | 3M+ active | Open, documented API |
| 4 | Angel One | SmartAPI (free) | 5M+ active | Well-documented |
| 5 | HDFC Sec | No public API | 3M+ | Statement upload fallback |
| 6 | MF Central | CAMS/KFintech API | All MF investors | For direct MF sync |

### 11.2 CDSL/NSDL Demat Sync
- [ ] CDSL EASI API: auto-fetch equity demat holdings daily
- [ ] NSDL IDeAS API: same for NSDL-held demat accounts
- [ ] Combined: covers 100% of Indian equity holdings without broker-by-broker integrations
- [ ] Sync daily at midnight; show "last synced: X hours ago"
- [ ] Manual refresh button

### 11.3 Mobile App (React Native — iOS + Android)

#### Mobile Navigation (Bottom Tab)
```
[🏠 Home] [📊 Portfolio] [💰 Tax] [📈 Backtest] [⚙️ More]
```

#### Mobile-Specific Features
- [ ] Biometric login (FaceID / fingerprint)
- [ ] Widget: home screen portfolio value + day change
- [ ] Push notifications:
  - "Your RELIANCE holding just crossed 1 year — now LTCG eligible"
  - "SIP of ₹15,000 executed today in PGIM Flexi Cap"
  - "ELSS units worth ₹28,000 unlock in 7 days"
  - "LTCG harvest opportunity: ₹82,000 exemption unused, 12 days to FY end"
  - "New NAV updated for all your mutual funds"
- [ ] Quick add: scan broker contract note / trade confirmation → add trade
- [ ] Offline mode: cached portfolio data viewable without internet

---

## 12. Pricing Architecture <a name="pricing"></a>

| Tier | Price | Features | Target User |
|---|---|---|---|
| **Free** | ₹0 | Heat map, SIP visualizer, direct/regular calc, basic tracking (20 holdings, 3 MFs), XIRR | Casual investor, trial |
| **Investor** | ₹199/mo (₹1,999/yr) | Unlimited holdings, CAS import, full XIRR, full performance reports, goal tracking, basic tax summary, ELSS tracker | Active DIY investor |
| **Analyst** | ₹499/mo (₹4,999/yr) | All of Investor + full backtesting, SIP backtest, heat map, named portfolios, withdrawal rate chart, Monte Carlo, FI calculator, direct/regular switch analyzer, full LTCG/STCG report with export | Serious DIY investor, FIRE planner |
| **Pro** | ₹999/mo (₹9,999/yr) | All of Analyst + India screener, quality score, efficient frontier, factor analysis, fundamentals, correlation matrix, broker auto-sync (Zerodha/Upstox), family portfolio | Power user, part-time trader |
| **RIA / Advisor** | ₹2,999/mo (₹29,999/yr) | All of Pro + multi-client dashboard, client report generation, API access, white-label PDF reports, priority support | SEBI RIA, financial advisors |

### Pricing Philosophy
- Annual plan = 2 months free (standard SaaS)
- Student discount: 50% off with .edu email
- No free trial with CC required — 14-day full free trial, no card needed
- Referral: 1 month free for each friend who subscribes (both get 1 month)

---

## 13. India Data Sources <a name="data"></a>

| Data Type | Source | Cost | Latency |
|---|---|---|---|
| NSE/BSE equity EOD prices | NSE official data, Quandl | Free/low cost | End of day |
| NSE/BSE intraday (real-time) | NSE Connect API or Truedata | ~₹5,000–15,000/mo | 15-min delay free, real-time paid |
| Mutual fund NAV (all schemes) | mfapi.in / AMFI direct | Free | Updated by 11pm daily |
| MF historical NAV | mfapi.in (free API, full history) | Free | Historical complete |
| India CPI inflation | RBI DBIE (Database of Indian Economy) | Free | Monthly, 6 week lag |
| Nifty index historical data | NSE website / Investing.com | Free | End of day |
| Gold price (MCX spot) | MCX / Investing.com | Free/low cost | End of day |
| G-Sec yield series (10yr) | RBI DBIE | Free | Daily |
| SBI FD rates historical | Manual curation + RBI DBIE | Free (manual) | Quarterly update |
| BSE quarterly results (XBRL) | BSE bulk download | Free | Within 24hr of filing |
| NSE shareholding patterns | NSE bulk data | Free | Quarterly |
| Promoter pledge data | BSE XBRL filings | Free | As filed |
| Grandfathering prices (Jan 31, 2018) | NSE historical EOD | Free | One-time |
| NHB Residex (property index) | NHB website | Free | Quarterly |

---

## 14. Tech Stack Recommendations <a name="tech"></a>

> **Goal:** Achieve minimal maintenance overhead across Website, Android, and iOS while ensuring a simple, highly responsive, and performant user experience.
> A **Universal App Architecture (React Native)** is the optimal choice here.

### 🌐 Frontend & Mobile (Universal App)
- **Framework:** **Expo Router (React Native)** — iOS + Android + Web from one codebase. File-based routing like Next.js, compiles to true native apps and supports web SEO.
- **Styling:** **NativeWind v4 (Tailwind)** — Use the exact same Tailwind classes on web and native.
- **UI Components:** **Shadcn (web) + RN UI Lib (native)** — Beautiful, accessible, minimal maintenance.
- **Complex Charts:** **Victory Native (Skia) + D3.js (web)** — Best-in-class per platform (Victory uses Skia for 60fps).
- **Data Tables:** **TanStack Table + Virtual** — Handles 10K+ row holdings tables without lag.
- **State Management:** **Zustand** (client state) + **TanStack Query** (server state/caching).
- **Animations:** **Reanimated 3** — Hardware-accelerated, no jank on mobile.
- **URL State (Web):** **Expo Router `useLocalSearchParams` + Zod** — Serializes tool states (e.g., SIP calculator inputs) to the URL for easy sharing.

### 🔒 Finance & Mobile Specifics (Critical)
- **Financial Math:** **`decimal.js` or `dinero.js`** — JS floating-point math (`0.1 + 0.2 = 0.30000000000000004`) will destroy tax calculations. This is a mandatory safety layer.
- **CAS PDF Parsing:** **Client-Side (`pdf.js`)** — DO NOT send financial PDFs to a server. Parse them entirely on the device. Massive privacy/trust win, zero server/egress costs.
- **Secure Storage:** **`expo-secure-store`** — Supabase JWTs and broker API keys must be stored in iOS Keychain / Android Keystore.
- **Fast Local Storage:** **`react-native-mmkv`** — For offline mode caching (Phase 6). 30x faster than Async Storage.
- **Privacy:** **`expo-screen-capture`** — Prevent users from taking screenshots of sensitive portfolio screens.
- **PDF Generation:** **`expo-print` (Mobile) / `@media print` (Web)** — Generate Tax and Portfolio PDFs natively without server costs.
- **Notifications:** **Expo Notifications** — Critical for "ELSS unlocking" or "LTCG harvesting" time-sensitive alerts.

### ⚙️ Backend, Data & Infrastructure (Zero-Ops BaaS)
- **Backend / DB / Auth:** **Supabase (Mumbai region)** — All-in-one Postgres, Auth, and RLS. < 50ms latency from India. Standard Postgres handles 35-year EOD data easily with BRIN indexes.
- **Analytics Engine:** **FastAPI + Python (NumPy/Pandas)** — Backtesting, Monte Carlo, XIRR, factor analysis.
- **Cache / Queue:** **Upstash Redis (serverless)** — Pay-per-use Redis for rate-limiting NSE/BSE API fetches and hot-caching daily NAVs.
- **Background Jobs:** **Inngest** — Scheduled jobs (midnight CDSL/NSDL sync, daily NAV sync), webhooks, zero queue management.

### 🛠️ DevOps, Quality & Integrations
- **Monorepo:** **Turborepo** — Shared types, shared UI, cached builds.
- **Mobile CI/CD:** **EAS Build + EAS Update (OTA)** — Ship iOS without a Mac, hotfix without App Store review.
- **CDN / Storage:** **Cloudflare Pages + R2** — Mumbai PoP, no egress fees.
- **Payments:** **Razorpay** — UPI + cards + EMI, Indian-first.
- **Monitoring:** **Sentry** (universal SDK for crashes) + **PostHog** (product analytics/feature flags).
- **Email:** **Resend** — Transactional alerts, reports.
- **Code Quality & Testing:** **TypeScript (strict)**, **Biome** (lint/format), **Vitest + Playwright** (unit/E2E testing).

---

*This document is a living product spec — update after each phase ships.*
*Version 1.0 | February 2026*
