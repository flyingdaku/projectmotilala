This is the most complete, production-grade guide you will find for building a direct NSE/BSE data pipeline. This is exactly what Zerodha, Tickertape, and Smallcase's data engineers have built internally.

***

## Architecture Philosophy First

Before writing a single line of code, understand the mental model:

```
NSE/BSE give you TWO types of data:

TYPE 1: FILE DROPS (Free, Public Domain)
  → Bhavcopy (EOD prices)
  → Corporate Actions CSV
  → Index Constituents
  → Market Activity Reports
  These are ZIP/CSV files dropped on public URLs daily.
  Legal to download. No auth required.

TYPE 2: JSON API (Semi-public, Session-gated)
  → Real-time quotes
  → Historical charts (nseindia.com internal)
  → Corporate filing details
  These require cookies from an active browser session.
  NSE's website renders via Next.js — the JSON
  endpoints are available but unofficial.
  NSE actively blocks server IPs without cookies.
```

**For Artha's pipeline, you use Type 1 (File Drops) as your primary source.** It is stable, reliable, requires no cookie management, and is publicly intended for consumption. Type 2 endpoints are supplemental and fragile.

***

## The Complete File Drop Inventory

### NSE Files (Free, Public, Definitive)

```python
# ─── EOD EQUITY BHAVCOPY (Daily Price Data) ───────────────────
# NEW format (post-2024 revamp) — use this
URL = "https://nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_{YYYYMMDD}_F_0000.csv.zip"
# Example: https://nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_20250220_F_0000.csv.zip

# OLD format (pre-2024, still works for historical)
URL = "https://nsearchives.nseindia.com/content/historical/EQUITIES/{YEAR}/{MON}/cm{DD}{MON}{YYYY}bhav.csv.zip"
# Example: .../EQUITIES/2024/JAN/cm01JAN2024bhav.csv.zip

# ─── NSE INDICES EOD ─────────────────────────────────────────
URL = "https://archives.nseindia.com/content/indices/ind_close_all_{DDMMYYYY}.csv"

# ─── NSE CORPORATE ACTIONS ────────────────────────────────────
# This is the JSON endpoint — requires cookies in browser
# But the bulk CSV can be pulled from:
URL = "https://www.nseindia.com/api/corporates-corporateActions?index=equities&from_date={DD-MM-YYYY}&to_date={DD-MM-YYYY}"
# Headers: {'User-Agent': '...', 'Referer': 'https://www.nseindia.com/'}

# ─── NSE MARKET CALENDAR (Trading Holidays) ───────────────────
URL = "https://www.nseindia.com/api/holiday-master?type=trading"

# ─── NSE SECURITY MASTER (ISIN + Symbol Mapping) ─────────────
URL = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv"
# Updated daily. Contains: Symbol, ISIN, Company Name, Series, Listing Date
```

### BSE Files (Free, Public, Definitive)

```python
# ─── EOD EQUITY BHAVCOPY ─────────────────────────────────────
URL = "https://www.bseindia.com/download/BhavCopy/Equity/EQ{DD}{MM}{YY}_CSV.zip"
# Example: EQ220226_CSV.zip for Feb 22, 2026

# ─── BSE CORPORATE ACTIONS ───────────────────────────────────
# BSE does not provide a clean API — requires Selenium
# URL: https://www.bseindia.com/corporates/corporate_act.aspx
# Purpose codes: Bonus=P5, Dividend=P9, Split=P26, Rights=P24

# ─── BSE SECURITY MASTER ────────────────────────────────────
URL = "https://www.bseindia.com/corporates/List_Scrips.aspx"
# Contains: BSE Code, ISIN, Company Name, Group, Listing Status
```

### AMFI (Free, 100% Accurate, Mutual Funds)

```python
# ─── AMFI DAILY NAV ──────────────────────────────────────────
URL = "https://www.amfiindia.com/spages/NAVAll.txt"
# Plain text, pipe-delimited, published by 11 PM IST daily
# Contains ALL mutual funds NAVs for that day
```

***

## The Full Database Schema

```sql
-- ─── ASSET MASTER ──────────────────────────────────────────────
CREATE TABLE assets (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isin           VARCHAR(12) UNIQUE,          -- Primary reconciliation key
  nse_symbol     VARCHAR(20),                 -- e.g. RELIANCE
  bse_code       VARCHAR(10),                 -- e.g. 500325
  amfi_code      VARCHAR(10),                 -- for mutual funds
  name           VARCHAR(255) NOT NULL,
  asset_class    VARCHAR(20) NOT NULL,        -- EQUITY | MF | ETF | INDEX
  series         VARCHAR(5),                  -- EQ | BE | BZ (NSE series)
  sector         VARCHAR(100),
  industry       VARCHAR(100),
  listing_date   DATE,
  delisting_date DATE,                        -- NULL if still active
  is_active      BOOLEAN DEFAULT TRUE,
  nse_listed     BOOLEAN DEFAULT FALSE,
  bse_listed     BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_assets_nse_symbol  ON assets(nse_symbol);
CREATE INDEX idx_assets_bse_code    ON assets(bse_code);
CREATE INDEX idx_assets_isin        ON assets(isin);
CREATE INDEX idx_assets_asset_class ON assets(asset_class);

-- ─── DAILY PRICES (TimescaleDB Hypertable) ────────────────────
CREATE TABLE daily_prices (
  asset_id       UUID REFERENCES assets(id) NOT NULL,
  date           DATE NOT NULL,
  open           NUMERIC(14, 4),
  high           NUMERIC(14, 4),
  low            NUMERIC(14, 4),
  close          NUMERIC(14, 4) NOT NULL,     -- Raw unadjusted
  adj_close      NUMERIC(14, 4),              -- Adjusted for splits/bonus/dividends
  volume         BIGINT,
  trades         INTEGER,                     -- No. of trades (from bhavcopy)
  source_exchange VARCHAR(5) NOT NULL,        -- 'NSE' | 'BSE' | 'AMFI'
  is_verified    BOOLEAN DEFAULT FALSE,       -- Cross-validation passed
  PRIMARY KEY    (asset_id, date)
);
SELECT create_hypertable('daily_prices', 'date');
CREATE INDEX ON daily_prices (asset_id, date DESC);

-- ─── CORPORATE ACTIONS ────────────────────────────────────────
CREATE TABLE corporate_actions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id         UUID REFERENCES assets(id) NOT NULL,
  action_type      VARCHAR(20) NOT NULL,
  -- 'SPLIT' | 'BONUS' | 'DIVIDEND' | 'RIGHTS' | 'MERGER' | 'DEMERGER' | 'BUYBACK' | 'NAME_CHANGE'
  ex_date          DATE NOT NULL,             -- The date price adjusts
  record_date      DATE,
  announcement_date DATE,

  -- Split: old_shares:new_shares (e.g., 1:5 means 1 old = 5 new)
  ratio_numerator   NUMERIC(10, 4),
  ratio_denominator NUMERIC(10, 4),

  -- Dividend (cash, in ₹ per share)
  dividend_amount   NUMERIC(10, 4),

  -- Rights issue details
  rights_ratio      VARCHAR(20),
  rights_price      NUMERIC(10, 4),

  adjustment_factor NUMERIC(14, 8),          -- Pre-computed multiplier for adj_close
  source_exchange   VARCHAR(5),              -- 'NSE' | 'BSE'
  raw_announcement  JSONB,                   -- Store original JSON/CSV row for audit
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_corp_actions_asset  ON corporate_actions(asset_id);
CREATE INDEX idx_corp_actions_exdate ON corporate_actions(ex_date);
CREATE INDEX idx_corp_actions_type   ON corporate_actions(action_type);

-- ─── FUNDAMENTALS (Quarterly) ─────────────────────────────────
CREATE TABLE fundamentals (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id           UUID REFERENCES assets(id) NOT NULL,
  period_end_date    DATE NOT NULL,
  fiscal_quarter     VARCHAR(10),             -- e.g. 'Q3FY26'
  fiscal_year        VARCHAR(10),             -- e.g. 'FY2026'
  is_consolidated    BOOLEAN DEFAULT TRUE,    -- Consolidated vs Standalone

  -- Income Statement (in ₹ Crores)
  revenue            NUMERIC(16, 2),
  operating_profit   NUMERIC(16, 2),         -- EBITDA
  ebit               NUMERIC(16, 2),
  interest           NUMERIC(16, 2),
  pbt                NUMERIC(16, 2),         -- Profit Before Tax
  tax                NUMERIC(16, 2),
  pat                NUMERIC(16, 2),         -- Profit After Tax (Net Income)
  eps                NUMERIC(10, 4),         -- Earnings Per Share

  -- Balance Sheet
  total_assets       NUMERIC(16, 2),
  total_equity       NUMERIC(16, 2),
  total_debt         NUMERIC(16, 2),
  cash_equivalents   NUMERIC(16, 2),

  -- Cash Flow
  cfo                NUMERIC(16, 2),         -- Cash From Operations
  capex              NUMERIC(16, 2),
  fcf                NUMERIC(16, 2),         -- Free Cash Flow

  -- Per Share & Ratios (computed at filing time)
  book_value_per_share NUMERIC(10, 4),
  shares_outstanding   BIGINT,               -- CRITICAL: must be accurate

  source             VARCHAR(20),            -- 'BSE_XBRL' | 'NSE_FILING' | 'EODHD'
  filing_date        DATE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, period_end_date, is_consolidated)
);
CREATE INDEX idx_fundamentals_asset ON fundamentals(asset_id, period_end_date DESC);

-- ─── PRE-COMPUTED METRICS (Nightly batch output) ──────────────
CREATE TABLE asset_metrics (
  asset_id         UUID REFERENCES assets(id) PRIMARY KEY,
  computed_on      DATE NOT NULL,

  -- Returns
  return_1d        NUMERIC(8, 4),
  return_1w        NUMERIC(8, 4),
  return_1m        NUMERIC(8, 4),
  return_3m        NUMERIC(8, 4),
  return_6m        NUMERIC(8, 4),
  return_1y        NUMERIC(8, 4),
  return_3y        NUMERIC(8, 4),
  return_5y        NUMERIC(8, 4),
  return_10y       NUMERIC(8, 4),

  -- Risk
  volatility_1y    NUMERIC(8, 4),            -- Annualized std dev
  beta_1y          NUMERIC(8, 4),            -- vs Nifty 50
  max_drawdown_1y  NUMERIC(8, 4),
  sharpe_1y        NUMERIC(8, 4),

  -- Valuation (requires latest fundamentals)
  pe_ratio         NUMERIC(10, 4),
  pb_ratio         NUMERIC(10, 4),
  ev_ebitda        NUMERIC(10, 4),
  market_cap       NUMERIC(20, 2),           -- In ₹
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PIPELINE AUDIT LOG ───────────────────────────────────────
CREATE TABLE pipeline_runs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_date       DATE NOT NULL,
  source         VARCHAR(30) NOT NULL,        -- 'NSE_BHAVCOPY' | 'BSE_BHAVCOPY' | 'AMFI' | 'NSE_CORP_ACTIONS'
  status         VARCHAR(20) NOT NULL,        -- 'SUCCESS' | 'PARTIAL' | 'FAILED'
  records_inserted INTEGER,
  records_skipped  INTEGER,
  circuit_breaks   INTEGER,                  -- How many anomalies triggered
  error_log        JSONB,
  duration_ms      INTEGER,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
```

***

## The Complete Python Pipeline

### 1. NSE Bhavcopy Ingestion

```python
# pipelines/nse_bhavcopy.py
import requests
import pandas as pd
import io, zipfile
from datetime import date, timedelta
from supabase import create_client

SUPABASE_URL = "your-url"
SUPABASE_KEY = "your-service-key"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

def download_nse_bhavcopy(trade_date: date) -> pd.DataFrame:
    # New 2024 format
    date_str = trade_date.strftime('%Y%m%d')
    url = f"https://nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_{date_str}_F_0000.csv.zip"

    resp = requests.get(url, headers=HEADERS, timeout=30)
    if resp.status_code == 404:
        # Fallback to old format for historical data
        url = (
            f"https://nsearchives.nseindia.com/content/historical/EQUITIES/"
            f"{trade_date.year}/{trade_date.strftime('%b').upper()}/"
            f"cm{trade_date.strftime('%d%b%Y').upper()}bhav.csv.zip"
        )
        resp = requests.get(url, headers=HEADERS, timeout=30)

    resp.raise_for_status()

    with zipfile.ZipFile(io.BytesIO(resp.content)) as z:
        csv_name = [n for n in z.namelist() if n.endswith('.csv')][0]
        df = pd.read_csv(z.open(csv_name))

    # New format columns: TradDt, BizDt, Sgmt, Src, FinInstrmTp,
    # FinInstrmId, ISIN, TckrSymb, SctySrs, OpnPric, HghPric,
    # LwPric, ClsPric, LastPric, PrvsClsgPric, TtlTradgVol, TtlTrfVal
    df = df.rename(columns={
        'TradDt': 'date', 'TckrSymb': 'symbol', 'ISIN': 'isin',
        'SctySrs': 'series', 'OpnPric': 'open', 'HghPric': 'high',
        'LwPric': 'low', 'ClsPric': 'close', 'TtlTradgVol': 'volume',
    })
    # Filter EQ series only (excludes BE, BL, BT debt series)
    df = df[df['series'] == 'EQ'].copy()
    df['date'] = pd.to_datetime(df['date']).dt.date
    df = df[['date', 'isin', 'symbol', 'open', 'high', 'low', 'close', 'volume']]
    return df.dropna(subset=['close'])


def run_circuit_breakers(df: pd.DataFrame, trade_date: date) -> tuple[pd.DataFrame, list]:
    """
    Returns (clean_df, flagged_records)
    Rule 1: Price drop/rise > 40% with no known corporate action
    Rule 2: Price == 0 or negative
    Rule 3: Volume == 0 (suspicious for EQ series)
    """
    flagged = []

    # Get previous day's close from Supabase for comparison
    prev_date = get_previous_trading_date(trade_date)
    prev_close = get_prev_closes_from_db(prev_date)  # returns {isin: close}

    for idx, row in df.iterrows():
        isin = row['isin']
        close = float(row['close'])

        # Rule 2: Zero or negative
        if close <= 0:
            flagged.append({'isin': isin, 'reason': 'ZERO_PRICE', 'value': close})
            df = df.drop(idx)
            continue

        # Rule 1: >40% move with no corporate action
        if isin in prev_close:
            prev = float(prev_close[isin])
            change_pct = abs((close - prev) / prev) * 100
            has_corp_action = check_corporate_action_today(isin, trade_date)
            if change_pct > 40 and not has_corp_action:
                flagged.append({
                    'isin': isin, 'reason': 'PRICE_SPIKE',
                    'prev': prev, 'current': close, 'change_pct': change_pct
                })
                df = df.drop(idx)  # Exclude until manually verified

    return df, flagged


def compute_adj_close(df: pd.DataFrame, trade_date: date) -> pd.DataFrame:
    """
    Fetch all corporate actions up to trade_date from DB.
    For each ISIN, calculate the cumulative adjustment factor.
    adj_close = close * product(all_adjustment_factors_after_this_date)
    """
    # Pull all corporate actions for these ISINs
    isins = df['isin'].tolist()
    actions = fetch_future_corp_actions(isins, from_date=trade_date)

    # Build adjustment factor map: {isin: cumulative_factor}
    factor_map = {}
    for action in actions:
        isin = action['isin']
        factor = float(action['adjustment_factor'])
        factor_map[isin] = factor_map.get(isin, 1.0) * factor

    df['adj_close'] = df.apply(
        lambda r: round(float(r['close']) * factor_map.get(r['isin'], 1.0), 4), axis=1
    )
    return df
```

***

### 2. Corporate Actions Engine (The Critical Piece)

```python
# pipelines/corporate_actions.py
# This is the most complex part of your entire pipeline.

def calculate_adjustment_factor(action_type: str,
                                 ratio_num: float,
                                 ratio_den: float,
                                 dividend_amount: float = 0,
                                 prev_close: float = 0) -> float:
    """
    The adjustment factor is the multiplier applied to ALL historical
    prices BEFORE the ex_date to make them comparable to post-action prices.

    Split 1:5 (1 old share = 5 new shares):
      → New price = Old price / 5
      → Adjustment Factor = 1/5 = 0.2
      → All historical adj_close = historical_close * 0.2

    Bonus 1:1 (1 bonus share per 1 held, so holdings double):
      → New price ≈ Old price / 2
      → Adjustment Factor = 1/(1+1) = 0.5

    Bonus 3:2 (3 bonus shares per 2 held):
      → Total shares become 2+3=5 per 2 original
      → Adjustment Factor = 2/(2+3) = 0.4

    Dividend ₹10 per share:
      → Adjustment Factor = (prev_close - dividend) / prev_close
      → e.g., (100 - 10) / 100 = 0.9

    Rights Issue 1:4 at ₹150 (1 right share per 4 held at ₹150):
      → Theoretical Ex-Rights Price (TERP) = (4 * prev_close + 150) / 5
      → Adjustment Factor = TERP / prev_close
    """
    if action_type == 'SPLIT':
        # ratio_num:ratio_den = old:new (e.g., 1:5 = 1 old becomes 5 new)
        return ratio_num / ratio_den

    elif action_type == 'BONUS':
        # ratio_num:ratio_den = bonus:held (e.g., 1:1 = 1 bonus per 1 held)
        return ratio_den / (ratio_den + ratio_num)

    elif action_type == 'DIVIDEND':
        if prev_close <= 0:
            return 1.0  # Cannot compute, skip adjustment
        return (prev_close - dividend_amount) / prev_close

    elif action_type == 'RIGHTS':
        if prev_close <= 0:
            return 1.0
        # ratio_den shares held + ratio_num right shares at rights_price
        terp = (ratio_den * prev_close + ratio_num * dividend_amount) / (ratio_den + ratio_num)
        return terp / prev_close

    return 1.0  # MERGER, DEMERGER, NAME_CHANGE — handle separately


def retroactively_adjust_history(asset_id: str,
                                  ex_date: date,
                                  adjustment_factor: float):
    """
    When a new corporate action is discovered, update ALL historical adj_close
    for this asset for dates BEFORE the ex_date.
    This is the full retroactive restatement operation.

    adj_close[t < ex_date] = adj_close[t < ex_date] * adjustment_factor
    """
    supabase.rpc('retroactive_adjust', {
        'p_asset_id': asset_id,
        'p_ex_date': str(ex_date),
        'p_factor': adjustment_factor
    }).execute()
    # The SQL function:
    # UPDATE daily_prices
    # SET adj_close = ROUND(adj_close * p_factor, 4)
    # WHERE asset_id = p_asset_id AND date < p_ex_date;
```

***

### 3. Handling the Corner Cases

```python
# The 7 Corporate Action Corner Cases you MUST handle:

# ─── CASE 1: MERGER (e.g., HDFC Bank + HDFC Ltd 2023) ────────
# When HDFC Ltd (isin: INE001A01036) merged into HDFC Bank:
# → HDFC Ltd's last trading date was July 12, 2023
# → All HDFC Ltd positions converted to HDFC Bank at 42:25 ratio
# Engineering: Set hdfc_ltd.delisting_date = 2023-07-12
#              Create a merger_events table linking the two ISINs
#              Never delete HDFC Ltd from assets — historical backtests need it
#              The backtest engine must handle "position auto-converts" at merger date

CREATE TABLE merger_events (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  acquired_asset_id   UUID REFERENCES assets(id),  -- The one that disappears
  acquirer_asset_id   UUID REFERENCES assets(id),  -- The one that survives
  effective_date      DATE NOT NULL,
  swap_ratio_acquired NUMERIC(8, 4),               -- e.g. 42
  swap_ratio_acquirer NUMERIC(8, 4),               -- e.g. 25
  notes               TEXT
);

# ─── CASE 2: DEMERGER (e.g., Jio Financial from Reliance) ─────
# Reliance demerged Jio Financial Services (JFS) in Aug 2023
# → Reliance shareholders got 1 JFS share per 1 Reliance share
# → Reliance's price dropped by ~JFS's value on ex-date
# Engineering: Treat as a special dividend (value = JFS listing price)
#              Adjustment factor for Reliance = (Reliance_close - JFS_price) / Reliance_close
#              Create JFS as a new asset in assets table

# ─── CASE 3: FACE VALUE CHANGE (not a split) ─────────────────
# Some companies change Face Value without changing share count
# (e.g., face value ₹10 → ₹2 is a 1:5 split, but ₹10 → ₹5 is 1:2)
# Engineering: Treat exactly like a split
#              Ratio = new_face_value / old_face_value
#              If old_FV=10, new_FV=2: adjustment_factor = 2/10 = 0.2

# ─── CASE 4: RIGHTS ISSUE WITH RENUNCIATION ──────────────────
# Rights can be partly subscribed or renounced
# Engineering: For adj_close purposes, always assume 100% subscription
#              Use theoretical ex-rights price (TERP) formula

# ─── CASE 5: FRACTIONAL BONUS RATIOS ─────────────────────────
# e.g., 3:7 bonus (3 shares per 7 held)
# New total = 7 + 3 = 10 per original 7
# Adjustment Factor = 7/10 = 0.7
# Engineering: Store exact ratio_numerator and ratio_denominator as
#              NUMERIC(10,4) — never convert to decimal before storing

# ─── CASE 6: DIVIDEND IN SPECIE (non-cash dividend) ──────────
# Company pays dividend in shares of a subsidiary
# Engineering: Treat like demerger — calculate fair value of
#              distributed shares as of ex_date

# ─── CASE 7: SUSPENSION / TRADING HALT ──────────────────────
# A stock gets suspended (e.g., DHFL, Yes Bank during crisis)
# No bhavcopy entry for suspended stocks
# Engineering: DO NOT forward-fill prices for suspended stocks
#              Instead, insert a NULL row with a 'SUSPENDED' flag
#              Forward-fill only for normal market holidays
```

***

### 4. The Verification Pipeline

```python
# pipelines/verification.py
# Runs every Sunday at 2 AM IST

def weekly_cross_validation():
    """
    Cross-validates our adj_close against EODHD for Nifty 50 stocks.
    If delta > 0.5% on any date after a corporate action, alerts.
    """
    nifty_50_isins = fetch_nifty50_isins()

    for isin in nifty_50_isins:
        # Our data
        our_data = supabase.table('daily_prices')\
            .select('date, adj_close')\
            .eq('asset_id', resolve_asset_id(isin))\
            .gte('date', '2020-01-01')\
            .execute().data

        # EODHD data (paid API as ground truth)
        eodhd_data = fetch_eodhd_adj_close(isin)

        # Compare
        our_df = pd.DataFrame(our_data).set_index('date')
        eodhd_df = pd.DataFrame(eodhd_data).set_index('date')
        merged = our_df.join(eodhd_df, how='inner', rsuffix='_eodhd')
        merged['delta_pct'] = abs(
            (merged['adj_close'] - merged['adj_close_eodhd']) / merged['adj_close_eodhd'] * 100
        )

        # Flag anomalies
        anomalies = merged[merged['delta_pct'] > 0.5]
        if not anomalies.empty:
            send_discord_alert(f"ADJ_CLOSE_MISMATCH: {isin} — {len(anomalies)} dates exceed 0.5% delta")


def trading_calendar_check(trade_date: date):
    """
    Ensure we have data for all expected trading days and NOT
    for market holidays. Missing data is as dangerous as wrong data.
    """
    expected_trading_dates = get_nse_trading_calendar()
    our_dates = get_dates_we_have_data_for()
    missing = set(expected_trading_dates) - set(our_dates)
    if missing:
        trigger_backfill(missing)
```

***

## The Scheduler (GitHub Actions)

The entire pipeline runs on a nightly GitHub Actions cron:

```yaml
# .github/workflows/market-data-pipeline.yml
name: Market Data Pipeline

on:
  schedule:
    - cron: '30 15 * * 1-5'  # 9:00 PM IST = 3:30 PM UTC, Mon-Fri
  workflow_dispatch:           # Manual trigger for backfills

jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt
      - name: Run NSE Bhavcopy
        run: python -m pipelines.nse_bhavcopy
      - name: Run BSE Bhavcopy
        run: python -m pipelines.bse_bhavcopy
      - name: Run AMFI NAV
        run: python -m pipelines.amfi_nav
      - name: Run NSE Corporate Actions
        run: python -m pipelines.corporate_actions
      - name: Compute Adj Close
        run: python -m pipelines.adjust_prices
      - name: Nightly Metrics Computation
        run: python -m pipelines.compute_metrics
      - name: Verification Checks
        run: python -m pipelines.verification
    env:
      SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
      DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
```

***

## Pipeline Execution Order (Critical)

The sequence matters. Running steps out of order corrupts data.

```
Every trading day at 9:00 PM IST:

1. FETCH NSE SECURITY MASTER    → Catch new listings / delistings
2. FETCH NSE CORPORATE ACTIONS  → For today's ex_date events
3. FETCH NSE BHAVCOPY           → Today's raw prices
4. FETCH BSE BHAVCOPY           → Cross-validation + BSE-only stocks
5. FETCH AMFI NAV               → All mutual fund NAVs
6. RUN CIRCUIT BREAKERS         → Flag anomalies BEFORE inserting
7. COMPUTE ADJUSTMENT FACTORS   → Calculate today's adj factors
8. INSERT PRICES                → Only after circuit breakers pass
9. RETROACTIVE ADJUSTMENT       → Update historical adj_close if new corp action
10. COMPUTE NIGHTLY METRICS     → Returns, beta, Sharpe, drawdown
11. LOG PIPELINE RUN            → Write to pipeline_runs table
12. SEND STATUS ALERT           → Discord/Slack: "✅ Pipeline ran. 4,847 records inserted. 2 circuit breaks."
```

**Step 9 is what separates professional from amateur pipelines.** Every time you discover a new corporate action, you must go back and recalculate every historical `adj_close` for that asset. This is called a retroactive restatement and is mandatory for backtest integrity.