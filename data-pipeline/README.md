# Artha Market Data Pipeline

Data ingestion and computation stack for the Artha product.

## Current Data Model

The product now uses:

- PostgreSQL as the relational source of truth
- TimescaleDB as the timeseries source of truth

Legacy SQLite files still exist in this repository for historical recovery,
migration, and local debugging workflows, but the frontend no longer treats
SQLite as its active backend.

Key bootstrap files:

- `db/init-postgres.sql`
- `db/init-timescale.sql`
- `db/migrations/002_frontend_product_tables.sql`

Frontend-dependent computed tables:

- `computed_ratios`
- `technical_indicators`

Frontend-dependent product tables:

- `user_asset_follows`
- `user_feed_reads`

## Quick Start

```bash
cd data-pipeline

# 1. Install dependencies
pip install -r requirements.txt

# 2. Copy env template and configure Telegram alerts
cp .env.example .env
# Edit .env with your TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

# 3. Start PostgreSQL and TimescaleDB
docker compose up -d

# 4. Initialize or migrate databases
# Apply db/init-postgres.sql and db/init-timescale.sql to fresh environments.
# Apply db/migrations/002_frontend_product_tables.sql to older relational DBs.

# 5. Run the pipeline for yesterday
python run_pipeline.py

# 6. Run for a specific date
python run_pipeline.py 2024-01-15

# 7. Populate computed frontend tables
python scripts/compute_pg_indicators.py

# 8. Backfill Nifty indices (TRI + Price Return)
python scripts/backfill_indices.py --start 2000-01-01

# 9. Backfill specific indices
python scripts/backfill_indices.py --indices "Nifty 50" "Nifty Bank" --start 2020-01-01

# 10. Full historical backfill (from 2000-01-01)
python -m pipelines.backfill

# 11. Backfill from a specific date
python -m pipelines.backfill 2020-01-01
```

## Project Structure

```
data-pipeline/
├── db/
│   ├── schema.sql          # SQLite schema (adapted from PostgreSQL spec)
│   └── market_data.db      # SQLite database (created on first run)
├── scripts/
│   ├── backfill_indices.py # Nifty indices backfill (TRI + Price Return)
│   ├── fetch_constituents.py # Nifty index constituents
│   └── scrape_msi.py       # MarketSmith India fundamentals scraper
├── pipelines/
│   ├── nse_bhavcopy.py     # NSE EOD prices (primary source)
│   ├── bse_bhavcopy.py     # BSE EOD prices (secondary + BSE-only stocks)
│   ├── amfi_nav.py         # Mutual fund NAVs
│   ├── corporate_actions.py # Corporate actions engine (splits, bonus, dividends...)
│   ├── adjust_prices.py    # Retroactive adj_close recomputation
│   ├── compute_metrics.py  # Nightly returns, beta, Sharpe, drawdown
│   ├── verification.py     # Data quality checks
│   └── backfill.py         # Full historical backfill
├── utils/
│   ├── db.py               # SQLite connection helper
│   ├── alerts.py           # Telegram bot alerts
│   ├── calendar.py         # NSE trading calendar (dynamic, cached)
│   ├── circuit_breakers.py # Anomaly detection rules
│   └── storage.py          # Raw file archival
├── tests/
│   ├── test_corporate_actions.py  # Unit tests for adjustment factors
│   └── test_pipeline_integration.py # Integration tests
├── raw_data/               # Archived raw ZIP/CSV/TXT files
│   ├── NSE_BHAVCOPY/
│   ├── BSE_BHAVCOPY/
│   ├── AMFI_NAV/
│   └── NSE_CORP_ACTIONS/
├── logs/
│   └── pipeline.log
├── run_pipeline.py         # Main nightly runner
├── requirements.txt
└── .env.example
```

## Pipeline Execution Order

Per `docs/data_pipeline.md`, the sequence is critical:

```
1. Refresh NSE holiday cache
2. Fetch NSE Corporate Actions (today's ex_date events)
3. Fetch NSE Bhavcopy (raw prices)
4. Fetch BSE Bhavcopy (cross-validation + BSE-only)
5. Fetch AMFI NAV (mutual funds)
6. Circuit breakers run inside each bhavcopy pipeline
7. Recompute adjusted close (retroactive restatement)
8. Compute nightly metrics (returns, beta, Sharpe)
9. Verification checks
10. Telegram status alert
```

## Running Individual Pipelines

```bash
# NSE Bhavcopy only
python -m pipelines.nse_bhavcopy 2024-01-15

# BSE Bhavcopy only
python -m pipelines.bse_bhavcopy 2024-01-15

# AMFI NAV only
python -m pipelines.amfi_nav 2024-01-15

# Corporate actions (date range)
python -m pipelines.corporate_actions 2024-01-01 2024-01-31

# Recompute all adj_close
python -m pipelines.adjust_prices

# Recompute adj_close for single ISIN
python -m pipelines.adjust_prices INE009A01021

# Verification checks
python -m pipelines.verification 2024-01-15
```

## Nifty Indices Backfill

The `scripts/backfill_indices.py` script fetches historical data for all Nifty indices from niftyindices.com.

### Features

- **Total Return Index (TRI) preferred** - Fetches TRI first (includes dividend reinvestment), falls back to Price Return (PRI)
- **Dual schema support** - Handles both TR (`TRIDate`/`Total Returns Index`) and HR (`HistoricalDate`/`OHLC`) response formats
- **Parallel execution** - 8 workers by default, processes multiple indices concurrently
- **Smart iteration** - Fetches newest chunks first, stops after 3 consecutive empty chunks (fast skip for indices that don't exist in early years)
- **TRI/PRI distinction** - TRI rows stored with `source_exchange='NSE_TRI'`, PRI with `source_exchange='NSE'`

### Usage

```bash
# Full backfill for all 135+ indices from 2000-01-01
python scripts/backfill_indices.py --start 2000-01-01

# Backfill specific indices
python scripts/backfill_indices.py --indices "Nifty 50" "Nifty Bank" --start 2024-01-01

# Adjust worker count (default: 8)
python scripts/backfill_indices.py --start 2000-01-01 --workers 12
```

### Performance

- **Full backfill (135 indices)**: ~6 minutes
- **Single index**: ~5-10 seconds
- **Chunk size**: 1 year per API request
- **Timeout**: 10s (fast-fail on missing early-year data)

### Data Coverage

- **NIFTY 500**: 6,491 days (2000-01-03 → present)
- **NIFTY NEXT 50**: 6,050 days (2000-01-03 → present)
- **Sectoral/Thematic indices**: Varies, typically 2005-2025
- **Total rows**: ~5.9M index price records (69K TRI + 5.8M PRI)

## Running Tests

```bash
pytest tests/ -v
pytest tests/test_corporate_actions.py -v    # Unit tests only
pytest tests/test_pipeline_integration.py -v # Integration tests only
```

## Telegram Alerts Setup

1. Message `@BotFather` on Telegram → `/newbot` → get your token
2. Message `@userinfobot` to get your chat ID
3. Add to `.env`:
   ```
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
   TELEGRAM_CHAT_ID=987654321
   ```

## Database Schema

Key tables:
- `assets` — master list of all equities, ETFs, mutual funds, indices
- `daily_prices` — EOD OHLCV + adj_close (NSE/BSE/AMFI/NSE_TRI)
- `corporate_actions` — splits, bonuses, dividends, rights, mergers
- `merger_events` — acquired/acquirer linkage for merger events
- `fundamentals` — quarterly financial data
- `asset_metrics` — pre-computed returns, risk, valuation metrics
- `pipeline_runs` — audit log for every pipeline execution
- `trading_holidays` — NSE holiday cache

### source_exchange values

- `NSE` — NSE equities (Price Return)
- `BSE` — BSE equities
- `AMFI` — Mutual funds/ETFs NAV
- `NSE_TRI` — Nifty indices (Total Return Index)

## Corporate Action Corner Cases

All 7 corner cases from the spec are handled:

| Case | Handling |
|------|----------|
| Merger | `merger_events` table, acquired asset marked with `delisting_date` |
| Demerger | Treated as special dividend (demerged entity value) |
| Face Value Change | Treated as split (new_fv / old_fv ratio) |
| Rights with Renunciation | TERP formula, assumes 100% subscription |
| Fractional Bonus Ratios | Stored as exact numerator/denominator |
| Dividend in Specie | Treated as dividend with fair value |
| Suspension/Trading Halt | No forward-fill; NULL row with suspended flag |

## Monitoring Queries

```sql
-- Latest pipeline runs
SELECT source, status, records_inserted, circuit_breaks, duration_ms
FROM pipeline_runs ORDER BY created_at DESC LIMIT 10;

-- Data freshness
SELECT MAX(date) as latest, COUNT(DISTINCT asset_id) as assets
FROM daily_prices;

-- Recent corporate actions
SELECT a.nse_symbol, ca.action_type, ca.ex_date, ca.adjustment_factor
FROM corporate_actions ca JOIN assets a ON ca.asset_id = a.id
ORDER BY ca.ex_date DESC LIMIT 10;

-- Assets with most price history
SELECT a.nse_symbol, COUNT(*) as days
FROM daily_prices dp JOIN assets a ON dp.asset_id = a.id
GROUP BY a.id ORDER BY days DESC LIMIT 20;

-- Nifty indices coverage
SELECT 
  COUNT(*) as total_indices,
  COUNT(CASE WHEN source_exchange = 'NSE_TRI' THEN 1 END) as tri_indices,
  COUNT(CASE WHEN source_exchange = 'NSE' AND a.asset_class = 'INDEX' THEN 1 END) as pri_indices
FROM daily_prices dp JOIN assets a ON dp.asset_id = a.id
WHERE a.asset_class = 'INDEX';

-- Top Nifty indices by history length
SELECT 
  a.name,
  COUNT(*) as days,
  MIN(dp.date) as start_date,
  MAX(dp.date) as end_date,
  dp.source_exchange
FROM daily_prices dp 
JOIN assets a ON dp.asset_id = a.id
WHERE a.asset_class = 'INDEX'
GROUP BY a.name, dp.source_exchange
ORDER BY days DESC
LIMIT 10;
```
