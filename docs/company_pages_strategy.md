Here is the full updated blueprint with the three major additions integrated throughout:

***

# 🏗️ Phase 0: Foundation Principles

Before any feature is built, these three principles govern every decision:

1. **One truth per section.** Every data point has exactly one authoritative source. No conflicting numbers across sections.
2. **Progressive disclosure.** A retail investor sees a clean, opinionated summary. One click deeper reveals raw data. Power users get formula breakdowns and factor models.
3. **India-first defaults.** Fiscal year ending March 31. Lakhs/Crores notation. BSE + NSE dual ticker. Nifty 500 as default benchmark.

***

# 1️⃣ Information Architecture

The page is a **single scrollable canvas with sticky section tabs** — not separate pages requiring full reloads (critical for Indian 4G users).

```
[Header] — Company name, BSE/NSE code, CMP, % change, Market Cap, 52W H/L
           + [★ Follow] button (prominent, top-right)
[Sticky Nav] — Overview | Chart | Financials | Ownership | Docs | Analytics | Peers | AI
[Section 1] — Company Overview
[Section 2] — Market Data & Chart (TradingView Charting Library)
[Section 3] — Financials
[Section 4] — Ownership & Governance
[Section 5] — Documents & Intelligence
[Section 6] — Advanced Analytics
[Section 7] — Competitive Positioning
[Section 8] — AI Layer
[Footer] — Disclaimer, data sources, last updated
```

**Sticky Tab Design Rules:**
- Tabs scroll with the user, highlighting the active section automatically via IntersectionObserver.
- Every section has a shareable deep link (`/stocks/reliance-industries/#financials`) — critical for SEO and WhatsApp sharing.
- On mobile, the sticky nav collapses into a single "Jump to section" dropdown.

***

# 2️⃣ Section-by-Section Blueprint

## Section 1: Company Overview

**Biggest gap vs Screener and MarketSmith:** Screener is pure data. MarketSmith focuses on price/EPS patterns. Neither tells you the *story* of the business in a digestible way.

### Components:
- **Business Summary — Two Variants:**
  - *Simple (Retail):* 3-sentence plain-English summary. "Reliance Industries is a conglomerate with businesses in oil refining, telecom (Jio), and retail. It earns most revenue from energy but growth is coming from retail and telecom."
  - *Analyst Version:* One paragraph covering business model, key revenue streams, competitive moat, and capital allocation history.
- **Industry Classification:** GICS sector + sub-sector + a custom Indian Industry Tree (e.g., Refining → Integrated Energy → Conglomerate).
- **Segment Breakdown (Visual):** Donut chart showing revenue mix by segment — updated every quarter. Same chart for EBIT contribution.
- **Revenue Mix by Geography** (where applicable): Horizontal stacked bar with FY trend.
- **Investment Thesis Snapshot:** 5-bullet AI-generated "Why Own This?" card. Refreshed after every quarterly result.
- **Risk Summary:** Top 3 risks as color-coded tags (Regulatory Risk 🟡, Promoter Pledge 🔴, Sector Cyclicality 🟡). Expandable.
- **Key Facts Bar:** Founded year, HQ, employees, exchanges listed, index membership, credit rating.
- **[★ Follow] Button:** Prominently placed. Clicking follows the company, adds it to the user's dashboard feed, and enables alerts. Explained in Section on Follow System.

***

## Section 2: Market Data & Chart *(Major Update)*

**Biggest gap vs Screener/MarketSmith:** Screener has no charting. MarketSmith has proprietary charts but no full drawing tools, no overlay of corporate actions, and no peer relative strength. **The solution is TradingView's open-source Charting Library — the same tool Chartink uses.**

### Which TradingView Library to Use

TradingView maintains two distinct products:

| Library | What it is | Drawing Tools | Custom Indicators | License | Cost |
|---|---|---|---|---|---|
| **lightweight-charts** | A lightweight open-source chart library. Line, area, candlestick, histogram. No drawing tools. | ❌ | ❌ | MIT / Open Source | Free |
| **TradingView Charting Library** | The full-featured, professional charting library with drawings, 100+ built-in indicators, Pine Script. This is what Chartink, Dhan, and other Indian platforms use. | ✅ Full drawing tools | ✅ 100+ built-in + custom Pine | Free for qualifying sites (apply at tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) | Free (apply) |

**Recommendation: Apply for the TradingView Charting Library.** It is free for qualifying financial websites. The application process involves sharing your site URL and explaining usage. Chartink, AngelOne, and Dhan all use this same library. It gives you a full Bloomberg/TradingView-grade chart experience without building it from scratch.

If the application is rejected or still pending, use **lightweight-charts** as a placeholder for Phase 1 and migrate to the full Charting Library in Phase 2.

### Full Chart Feature Set (Using TradingView Charting Library):
- **Timeframes:** 1min, 5min, 15min, 1H, 1D, 1W, 1M — with intraday data for NSE/BSE via Kite/Breeze API.
- **Chart Types:** Candlestick, OHLC, Line, Area, Heikin Ashi, Renko, Point & Figure — all built into the library.
- **Drawing Tools (Full Suite via Charting Library):**
  - Trendlines, channels, rays, extended lines
  - Fibonacci retracement, Fibonacci fan, Fibonacci time zones
  - Pitchfork, Gann fan, Gann box
  - Rectangles, ellipses, triangles
  - Text annotations, price labels, callouts
  - Measure tool (% return over drawn range)
  - All drawings persist per user per stock in your database (linked to their account).
- **Built-in Technical Indicators (100+):** SMA, EMA, MACD, RSI, Bollinger Bands, ATR, Ichimoku, VWAP, and more — all included in the Charting Library.
- **Custom Indicators via Pine Script:** Users can write or paste Pine Script indicators — the Charting Library supports this natively.
- **Corporate Actions Overlay:** Dividends (💰), Splits (✂️), Rights Issues (📋), Buybacks (🔄) displayed as icons on the timeline. Clicking shows the details in a tooltip.
- **Event Markers:** Quarterly results dates, AGM, concall dates — shown as flag icons on the chart. Clicking opens the AI concall summary in a side panel without leaving the chart.
- **Volume Analysis:** Volume bars color-coded by price change. 20-day average volume line. Volume Dry-Up flag when volume drops significantly before a breakout.
- **Benchmark Comparison:** Overlay vs Nifty 500 / sector index / any custom index symbol. Returns normalized to same base (100 = start of period).
- **Peer Relative Strength Chart:** Line chart showing the stock's % performance relative to top 5 peers over the same period — shows instantly if the stock is gaining or losing vs the industry.
- **Saved Layouts:** Users' chart setups (indicators, drawings, timeframe) are saved per stock and auto-restored on return — exactly how TradingView's own platform works.

### Data Feed Integration for the Charting Library:
The TradingView Charting Library requires you to implement a **UDF (Universal Data Feed)** — a simple REST/WebSocket API that serves OHLCV data in TradingView's expected format. This is your own backend that reads from your ClickHouse/Postgres time-series database and serves data to the chart widget. This is straightforward to build (TradingView provides detailed UDF documentation).

***

## Section 3: Financials

**Biggest gap vs Screener:** Screener shows raw numbers in tables but no trend visualization, no growth decomposition, no anomaly flags.

### Design Rule: Tables + Sparklines Together
Every financial table row has a tiny sparkline (5-year trend) next to each metric. This eliminates the need to scroll back and forth to understand if a metric is improving or deteriorating.

### Components:
- **Time Range Toggle:** Annual (default) / Quarterly. Default shows last 10 years annual and 8 quarters.
- **P&L Statement:** Revenue, COGS, Gross Profit, EBITDA, EBIT, PBT, PAT. Each row has a 5Y sparkline + CAGR badge.
- **Balance Sheet:** Assets, Liabilities, Equity. Net Cash / Net Debt highlighted prominently.
- **Cash Flow Statement:** Operating CF, Capex (highlighted), Free Cash Flow, Financing CF. FCF Yield as a separate KPI.
- **Segment Reporting:** Revenue and EBIT by business segment where disclosed.
- **Ratio Dashboard:**
  - Profitability: ROE, ROCE, ROIC, Gross Margin, EBITDA Margin, PAT Margin
  - Efficiency: Asset Turnover, Inventory Days, Receivable Days, Payable Days, Cash Conversion Cycle
  - Leverage: D/E Ratio, Interest Coverage, Net Debt/EBITDA
  - Valuation: P/E, P/B, EV/EBITDA, EV/Sales, Dividend Yield
  - All with color-coded 5Y trend indicators.
- **Growth Decomposition (Innovative):** Waterfall chart showing revenue growth drivers — Volume Growth vs Price Realization vs Mix Change vs New Segments.
- **Anomaly Flags (Innovative):** Auto-flag unusual patterns: "Receivables grew 3x faster than revenue in FY24", "Inventory build-up without revenue growth", "Operating CF significantly below PAT for 3 consecutive years."

***

## Section 4: Ownership & Governance

### Components:
- **Shareholding Pattern:** Pie chart + table. Promoter, FII, DII, Public. Sourced from BSE/NSE quarterly filings.
- **Historical Shareholding Chart:** Stacked area chart showing how promoter, FII, DII allocations changed over 10+ quarters.
- **Promoter Pledge Tracker:** Pledged % shown prominently with a warning badge if >20%.
- **Institutional Flows:** Top 10 institutional holders + change since last quarter.
- **Insider Transactions:** SAST/bulk/block deal disclosures — visual timeline of buys and sells.
- **Board Quality Card:** Independent directors ratio, CEO tenure, AGM voting results, governance score 1–10.

***

## Section 5: Documents & Intelligence

### Components:
- **Annual Reports Archive:** Full PDFs hosted. AI-generated 3-paragraph summary per annual report. AI-extracted management commentary, guidance, and capex plans.
- **Concall Intelligence (Big Differentiator):**
  - Auto-transcript every concall (BSE recordings + Whisper STT).
  - AI summary: Key highlights, management tone, specific guidance numbers extracted.
  - Sentiment trend chart: Management tone over last 8 quarters.
  - "What changed this quarter?" — AI diff comparing to previous quarter.
- **Exchange Announcements Feed:** Sorted by type. Searchable. Real-time.
- **Credit Rating Tracker:** CRISIL/ICRA/CARE timeline with upgrades/downgrades highlighted.
- **Deal/Acquisition Timeline:** M&A activity visualized on a horizontal timeline.

***

## Section 6: Advanced Analytics

### Components:
- **Factor Exposure Dashboard (Your Biggest Moat):** IIMA 4-factor regression on 36-month returns. Display Market Beta, Size Loading (SMB), Value Loading (HML), Momentum Loading (WML), Alpha, R². Plain-English "What kind of stock is this?" statement from loadings.
- **Earnings Quality Score:** CFO/PAT ratio, accruals ratio, revenue recognition risk, auditor history — 1–10 score with breakdown.
- **Financial Health Score:** Altman Z-score (India-modified), Piotroski F-Score, leverage score.
- **Valuation Bands:** Historical P/E band chart with current multiple plotted. Same for EV/EBITDA.
- **Scenario Valuation:** Three sliders — Revenue Growth, Margin Improvement, Multiple — showing implied intrinsic value range dynamically.
- **Risk Heatmap:** Matrix across Business Risk, Financial Risk, Governance Risk, Sector Risk, Liquidity Risk.

***

## Section 7: Competitive Positioning

### Components:
- **Peer Comparison Dashboard:** 4–6 peers side-by-side. Best-in-peer highlighted green, worst red.
- **Relative Valuation Bubble Chart:** EV/EBITDA vs ROE vs Market Cap. Shows cheap vs expensive relative to profitability instantly.
- **Market Share Trends:** Where revenue data is available by company, show market share trend chart.
- **Industry Structure:** AI-generated Porter's Five Forces — 1-line per force, updated annually.

***

## Section 8: AI Layer

### Components:
- **Pros & Cons Summary:** AI-generated from financials + concalls + news. 3 bullish, 3 bearish. Refreshed after each result.
- **Bull vs Bear Case:** One paragraph each, grounded in actual data.
- **Earnings Call Sentiment Chart:** Sentiment score trend across 8 quarters.
- **Red Flag Detector:** Promoter pledge increases, audit qualifications, related-party transactions, CFO vs PAT divergence.
- **Auto-Updated Investment Memo:** 1-page AI-generated PDF. Company snapshot, bull/bear case, valuation, risks. Updated quarterly.

***

## Section 9: Follow System *(New Section — Full Detail)*

This is a core retention and engagement feature, similar to how Screener.in's follow system works but significantly richer.

### How "Follow" Works:
- **Follow Button:** Present on every company page header AND in screener results AND in peer comparison dashboards. One tap/click. Zero friction.
- **What happens when you follow a company:**
  1. Company added to user's "Followed Companies" list.
  2. User receives a personalized **Dashboard Feed** (see below).
  3. User can configure per-company alerts: Price alerts, Result alerts, Concall alerts, Shareholding change alerts, Pledge alerts, Red Flag alerts.
  4. Company appears in the user's "My Universe" screener filter (filter only from followed companies).

### The Dashboard Feed (Heart of the Follow System):
The user's home dashboard (not a company page) becomes a **chronological feed of events for all followed companies** — like a Twitter/X feed but for stocks.

Every item in the feed is an "event card" with a clear type:

| Event Type | What the card shows |
|---|---|
| 📊 Quarterly Result | Company, Revenue/PAT vs estimate, YoY growth, AI 2-line verdict |
| 📞 Concall Published | Company, AI 3-bullet summary, link to full concall section |
| 🏦 Shareholding Change | Company, who bought/sold, % change, whether promoters decreased |
| 🚩 Red Flag Detected | Company, what the flag is, severity badge |
| 📰 Exchange Announcement | Company, announcement type, 1-line summary |
| 💰 Corporate Action | Dividend / Split / Buyback — details + ex-date |
| 📈 Price Alert Triggered | Company, target hit, current price |
| 🏆 Factor Change | If a stock's factor exposure changes significantly (e.g., turns from Growth to Value) |

**Feed Design Rules:**
- Cards are sorted by recency. User can filter by event type.
- Each card has a "Go to section" deep link — clicking the result card takes you directly to the Financials section of that company page.
- On mobile, the feed is the default home screen for logged-in users.
- Feed is also available as a **digest email** (Daily at 8 AM IST / Weekly on Monday) — users configure their preference.
- **WhatsApp digest option:** For power users who prefer WhatsApp to email — a formatted daily WhatsApp message via WhatsApp Business API listing the top 5 events from their followed companies. This is uniquely sticky for Indian retail investors.

### Technical Implementation of the Follow System:
```
User follows company → Stored in users_follows table (user_id, company_id, timestamp)
        │
        ▼
Event Pipeline (Airflow DAG) checks all followed companies for new events
        │
        ▼
New event detected → Written to events table (company_id, event_type, data, timestamp)
        │
        ▼
Fan-out Service → For each event, find all users who follow that company
(Redis Set: followers:{company_id} → Set of user_ids)
        │
        ▼
Write to user_feed table (user_id, event_id, read status, timestamp)
        │
        ▼
Real-time notification → WebSocket push to connected users
Email/WhatsApp digest → Queued in background job
```
This fan-out is manageable because events are low-frequency (tens per day across 5,000 companies), not tick-by-tick.

***

# 3️⃣ UX Improvements vs Screener & MarketSmith

| Dimension | Screener | MarketSmith India | Your Platform |
|---|---|---|---|
| **Charts** | None | Proprietary, basic drawing | Full TradingView Charting Library (drawings, Pine Script, 100+ indicators) |
| **Narratives** | None | EPS/RS focused | Plain-English + analyst version |
| **AI Layer** | None | None | Concall AI, red flags, investment memo |
| **Factor Analysis** | None | None | IIMA 4-factor for every stock |
| **Mobile UX** | Tables break on mobile | Poor mobile | Mobile-first, progressive disclosure |
| **Document Intel** | BSE links only | None | AI-summarized concalls + annual reports |
| **Valuation Models** | Basic P/E | None | Scenario valuation with sliders |
| **Anomaly Detection** | None | None | Auto-flags financial irregularities |
| **Follow / Feed** | Basic watchlist | Watchlist only | Rich event feed + WhatsApp digest + alerts |
| **Drawing Tools** | None | Limited | Full TradingView suite (Fibonacci, Gann, Pitchfork, etc.) |
| **SEO** | Domain authority | Low | Structured data + SSG + FAQ schema + event-driven content |

***

# 4️⃣ Data Sourcing Strategy

| Data Type | Source | Refresh Rate |
|---|---|---|
| Price & Volume (Real-time) | NSE/BSE WebSocket via Kite API | Real-time |
| Price & Volume (Historical OHLCV) | NSE EOD files (free download) + Kite historical API | Daily |
| Financials (P&L, BS, CF) | CMIE Prowess / BSE Bulk Download / Trendlyne API | Quarterly |
| Shareholding Pattern | BSE/NSE quarterly filings | Quarterly |
| Exchange Announcements | BSE/NSE RSS/XML feeds | Real-time |
| Annual Reports / PDFs | BSE announcements parser | As published |
| Concall Transcripts | BSE recordings + Whisper (OpenAI/local) for STT | As published |
| Credit Ratings | CRISIL/ICRA/CARE website scrapers | As published |
| Promoter Pledges | BSE SAST disclosure feed | As published |
| Insider Transactions | NSE/BSE Bulk/Block deal CSV files | Daily |
| Factor Data (MKT/SMB/HML/WML) | IIMA Data Library (publicly available) | Monthly |
| Macro Data | RBI DBIE API (free) | As published |

***

# 5️⃣ SEO Strategy *(Major Update — Expanded)*

The goal is to rank #1 for "Reliance Industries analysis", "HDFC Bank financials", "TCS share price target" and equivalent queries for all 5,000+ listed companies. This is a long-term compounding asset.

## Technical SEO

- **SSG (Static Site Generation) for all company pages:** Pre-render 5,000 company pages at build time using Next.js `getStaticProps`. Pages are pure static HTML — Google crawls them instantly, page speed is sub-1-second. Rebuild triggered automatically when new financial data arrives (webhook from data pipeline). This is how Screener.in is fast despite being data-heavy.
- **Structured Data (JSON-LD):** Implement `FinancialProduct`, `Organization`, and `BreadcrumbList` schema for every company page. Also implement `FAQPage` schema for AI-generated Q&A sections (see Content SEO below).
- **Deep Linking + Canonical URLs:** Every section gets a canonical URL fragment (`/stocks/reliance-industries/#financials`, `#charts`, `#ownership`). Google indexes these individually. Users can share a direct link to the Shareholding section of HDFC Bank.
- **Core Web Vitals Optimization:**
  - LCP (Largest Contentful Paint): Target < 1.5s. Achieve by SSG + image optimization + critical CSS inlining.
  - CLS (Cumulative Layout Shift): Target < 0.05. Reserve space for chart and table components before they load.
  - FID/INP: < 100ms. The TradingView chart widget loads asynchronously — it must not block the main thread.
- **XML Sitemap:** Auto-generated sitemap covering all 5,000+ company pages + section deep links. Submitted to Google Search Console. Updated automatically when new companies are added.
- **hreflang and Language:** Target both English and Hinglish search queries ("Reliance ka share price", "HDFC Bank ka PE ratio"). Add alternate Hindi-language company summary pages (`/hi/stocks/reliance-industries/`).
- **Robots.txt:** Ensure screener results pages (dynamic filter URLs) are `noindex` to avoid duplicate content penalty. Only canonical company pages are indexed.
- **Internal Linking Strategy:** Every peer comparison section links to the peer's company page. Every sector/industry page links to all companies in that sector. This builds a rich internal link graph that passes PageRank across all 5,000 pages.

## Content SEO

- **AI-Generated Financial Summaries (Critical):** Each company page includes a 300-word auto-generated textual summary of the latest financials. Example: "In FY24, Reliance Industries reported consolidated revenue of ₹9.7 lakh crore, a 5.2% increase from ₹9.2 lakh crore in FY23. EBITDA grew 11.3% YoY to ₹1.9 lakh crore, with margins expanding 100 basis points to 19.5%. PAT stood at ₹79,020 crore..." This gives Google crawlable text content beyond tables.
- **Quarterly Results Analysis Pages (Time-Sensitive SEO — Very High Value):** When quarterly results are announced, within 30 minutes auto-generate a structured "Q2FY25 Results Analysis" subpage (`/stocks/reliance-industries/results/q2fy25/`). Headline, key metrics vs estimates, management guidance, AI verdict. This captures massive time-sensitive search traffic ("Reliance Q2 results", "HDFC Bank quarterly results today") when search volume spikes immediately after announcement.
- **FAQ Schema on Every Company Page (Long-Tail Gold):** AI-generated Q&A pairs targeting long-tail queries:
  - "What is Reliance Industries' P/E ratio?" → Answer: Current P/E is 24.5x, historical average is 22x.
  - "Is TCS debt-free?" → Answer: Yes, TCS is net cash positive with ₹52,000 crore cash.
  - "What is HDFC Bank's ROE?" → Answer: HDFC Bank's ROE for FY24 is 17.2%.
  - These FAQ blocks render as JSON-LD `FAQPage` schema and often win Google's "People Also Ask" boxes — extremely high CTR placement.
- **Concall Quote Pages (Innovative, High SEO Value):** Every quarterly concall generates a dedicated indexed page (`/stocks/reliance-industries/concall/q2fy25/`) with key management quotes, full AI summary, and searchable transcript. Queries like "Mukesh Ambani statement Jio ARPU Q2 2024" will find you.
- **Screener / Filter Result Pages:** Top saved screener templates (e.g., "High ROE Low Debt India Stocks", "Nifty 500 Momentum Stocks") get static, indexed pages with auto-refreshed results. These rank for queries like "best high ROE stocks India 2025."
- **Sector and Industry Hub Pages:** `/sectors/banking/` shows all banking companies, sector P/E, top performers, and links to every banking company page. These hub pages rank for "Indian banking sector analysis", "best banking stocks India."
- **Comparison Pages (Innovative SEO):** Auto-generated side-by-side comparison pages like `/compare/hdfc-bank-vs-icici-bank/`. These rank for high-volume queries like "HDFC Bank vs ICICI Bank comparison" which are among the most searched finance queries in India.
- **Event-Driven Blog Content:** When a major corporate event happens (SEBI order, large acquisition, rating upgrade), auto-generate a structured news summary page for that company + event. Linked from the company's exchange announcements section.
- **Backlink Strategy:**
  - Reach out to Indian personal finance bloggers and offer free data embeds (a shareable widget showing a company's key ratios that links back to your platform — like TradingView's chart embed widget).
  - Submit financial data APIs to developer directories (RapidAPI, etc.) — developers who use your API naturally link back.
  - Build a free "BSE/NSE Results Calendar" tool that the financial media will link to as a reference.

## Local SEO & India-Specific
- **Hinglish content variants:** Hindi-language financial summaries for all companies. "Reliance Industries ka FY24 revenue 9.7 lakh crore raha." These capture Tier-2 and Tier-3 city investors who search in Hinglish.
- **Google Discover optimization:** Use high-quality company logos and chart images in pages — Google Discover prioritizes image-rich content for financial queries in India.

***

# 6️⃣ Monetization

| Feature | Free | Pro (₹999/mo) | Premium (₹2,499/mo) |
|---|---|---|---|
| Company Overview | ✅ | ✅ | ✅ |
| TradingView Chart (basic) | ✅ (1D/1W/1M/1Y) | ✅ (all timeframes) | ✅ + saved layouts |
| Drawing Tools | ❌ | ✅ | ✅ |
| Custom Pine Script Indicators | ❌ | ✅ | ✅ |
| Intraday Chart Data | ❌ | ✅ | ✅ |
| Financial Data | 5 years | 10Y+ | 10Y+ + segment |
| Ratio Dashboard | 10 ratios | All ratios | All ratios |
| Shareholding + historical | ✅ | ✅ | ✅ |
| Factor Exposure | Preview only | ✅ | ✅ |
| Concall AI Summaries | Last 2 | ✅ all | ✅ |
| Earnings Quality Score | Score only | ✅ + breakdown | ✅ |
| Scenario Valuation | Fixed scenarios | Fixed | ✅ Full sliders |
| Follow Companies | Up to 10 | Up to 100 | Unlimited |
| Dashboard Feed | ✅ (basic) | ✅ (all events) | ✅ + WhatsApp digest |
| Alerts | Email only | Email + App push | Email + Push + WhatsApp |
| Red Flag Alerts | Weekly digest | Real-time | ✅ |
| Investment Memo PDF | ❌ | ✅ | ✅ |
| Screener Access | Basic | Advanced | ✅ Full + Factor |
| API Access | ❌ | ❌ | ✅ |

***

# 7️⃣ Scalability Architecture

```
BSE/NSE/CMIE Data Feeds
        │
        ▼
ETL Pipeline (Apache Airflow) — Ingestion + normalization
        │
        ▼
Data Warehouse
— Postgres: Company metadata, ownership, governance, user follows, events
— ClickHouse: Time-series OHLCV + financials (columnar, fast aggregations)
        │
        ▼
AI Processing Layer (Celery + Redis Queue)
— Concall transcription + summarization (Whisper + GPT-4o)
— Annual report parsing
— Red flag detection
— FAQ generation per company
— Factor regression updates (monthly)
        │
        ▼
API Layer (Go / FastAPI)
— UDF endpoints for TradingView Charting Library (OHLCV feed)
— REST endpoints for all data types
— WebSocket for live price feed + dashboard feed notifications
— Redis caching (popular companies cached 5 minutes)
        │
        ▼
Frontend (Next.js)
— SSG for all company pages (static HTML for SEO + speed)
— SWR/React Query for live price + chart data hydration
— TradingView Charting Library loaded asynchronously
— User feed and follow system hydrated client-side
```

**Key decisions:**
- **SSG for historical data.** Pre-render all 5,000 company pages at build time. Incremental Static Regeneration (ISR) re-builds a page when new financial data arrives.
- **ClickHouse for financials and OHLCV.** Aggregating 10+ years of daily OHLCV + quarterly financials across 5,000 companies requires a columnar database.
- **TradingView UDF backend.** A dedicated Go microservice serves OHLCV data in TradingView's UDF format with sub-100ms response times.
- **Redis Sets for follow fan-out.** `followers:{company_id}` = Redis Set of user_ids. Fan-out on event is O(n) where n = followers of that company.

***

# 8️⃣ Mobile-First UX

- **Critical Path Rendering:** CMP, % change, 1-year chart, and Investment Thesis Snapshot within 1.5 seconds on 4G. Everything else loads asynchronously.
- **Section Tabs as Bottom Sheet** on mobile — thumb-friendly, not a top nav.
- **Tables → Cards on Mobile:** Financial tables convert to swipeable metric cards with sparklines.
- **Chart on Mobile:** The TradingView Charting Library has first-class mobile support — pinch to zoom, tap to crosshair, swipe to pan. Drawing tools collapse to a bottom toolbar.
- **Follow Feed as Default Home Screen** for logged-in mobile users.
- **Offline-First:** Last-loaded company page cached in localStorage. Users can view financial ratios offline.
- **WhatsApp Sharing:** Every AI summary, comparison, and result analysis has a "Share on WhatsApp" button. Pre-formatted message with key metrics. Massive organic growth loop for India.

***

# 9️⃣ Phase-wise Execution Roadmap

## Phase 1 (0–6 months): Foundation
Build the defensible base. Be the most accurate and cleanest source of Indian financial data.

**Priority features:**
1. Company Overview (simple + analyst version)
2. 10-year P&L, Balance Sheet, Cash Flow with sparklines and anomaly flags
3. Ratio Dashboard (25 ratios, color-coded trends)
4. Shareholding Pattern + historical trend
5. Exchange Announcements feed (real-time)
6. **TradingView Charting Library integration** (apply immediately, ship as first priority in Phase 1)
7. Basic drawing tools + SMA/EMA/RSI/MACD via Charting Library
8. Corporate actions overlay on chart
9. Event markers on chart (results dates, AGM)
10. **Follow System + Dashboard Feed (basic)** — follow up to 10 companies, basic event cards
11. Peer comparison table
12. Valuation bands (P/E band chart)
13. **SEO foundation:** SSG for all 5,000 company pages, structured data, FAQ schema, results analysis auto-pages

**Goal:** Be better than Screener.in for financial data quality and chart UX within 6 months. Get to 10,000 MAUs organically through SEO.

***

## Phase 2 (6–12 months): Intelligence + Engagement
Add the features that create switching costs.

**Priority features:**
1. Concall AI summarization (largest retention driver)
2. Annual report AI parsing
3. Factor exposure dashboard (IIMA 4-factor)
4. Earnings Quality Score + Red Flag Detection
5. Insider transaction timeline
6. Peer Relative Strength chart
7. **Follow System upgrade:** Unlimited follows for Pro, WhatsApp digest, real-time alerts
8. **Dashboard Feed upgrade:** All event types, filter by type, mark as read
9. Benchmark comparison overlay on chart
10. Pine Script custom indicator support via Charting Library
11. Sector and Industry Hub pages (for SEO)
12. Auto-generated comparison pages (`/compare/X-vs-Y/`) for SEO
13. Mobile app (React Native, sharing the same API layer)
14. Pro tier launch (₹999/month)

**Goal:** 50,000 MAUs, 2,000 paying subscribers, rank Page 1 for top 100 company name + "analysis" queries.

***

## Phase 3 (12–24 months): Moat Building
Build the features that make leaving painful.

**Priority features:**
1. Scenario valuation model (full sliders for Premium)
2. Governance Score (board quality + pledge + audit)
3. Growth Decomposition waterfall charts
4. AI Investment Memo (auto-PDF export, updated quarterly)
5. Portfolio integration (add stocks, track allocation, factor attribution of your portfolio)
6. Factor-based screener (filter by factor exposures)
7. Earnings sentiment trend chart
8. API access (wealth managers and fintech clients)
9. Hinglish language versions of all company pages (SEO for Tier-2 cities)
10. Chart layout sharing (share your chart setup with indicators as a permalink)
11. Concall quote search (search across all concall transcripts — "search what Ambani said about Jio 5G")
12. Premium tier launch (₹2,499/month with API)

**Goal:** 200,000 MAUs, 15,000 paying subscribers, ₹1.5 Crore ARR, rank Page 1 for top 500 company queries.

***

# 🔟 Long-Term Moat Strategy

Three compounding moats:

1. **Data Moat:** Proprietary AI-processed concall transcripts, annual report extractions, and governance scores. Once you have 10 years of AI-processed concalls for 5,000 companies, this dataset becomes uniquely valuable and cannot be rebuilt quickly by a new entrant.

2. **Engagement Moat:** The TradingView chart drawing tools (saved layouts), follow system with WhatsApp digest, watchlist integration, and personalized alerts create daily habits. Drawing a Fibonacci on HDFC Bank and saving it means you come back tomorrow to check that chart — on your platform. Daily habit = platform you do not switch from.

3. **SEO Moat:** 5,000 company pages × (1 overview page + 4 quarterly results pages/year + 4 concall pages/year + comparison pages + sector pages) = **100,000+ indexed SEO pages after 2 years.** This is a compounding asset that Screener.in (mostly static data tables) and MarketSmith India (paywalled, almost no indexable content) have never built. Every new quarterly result generates 5,000 new indexed pages. Your SEO moat grows automatically every quarter.