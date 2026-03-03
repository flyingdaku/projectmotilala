# Artha Market Data Pipeline

Local SQLite-based data pipeline for NSE/BSE/AMFI market data.

## Quick Start

```bash
cd data-pipeline

# 1. Install dependencies
pip install -r requirements.txt

# 2. Copy env template and configure Telegram alerts
cp .env.example .env
# Edit .env with your TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

# 3. Initialize the database
python -c "from utils.db import init_db; init_db()"

# 4. Run the pipeline for yesterday
python run_pipeline.py

# 5. Run for a specific date
python run_pipeline.py 2024-01-15

# 6. Full historical backfill (from 2000-01-01)
python -m pipelines.backfill

# 7. Backfill from a specific date
python -m pipelines.backfill 2020-01-01
```

## Project Structure

```
data-pipeline/
├── db/
│   ├── schema.sql          # SQLite schema (adapted from PostgreSQL spec)
│   └── market_data.db      # SQLite database (created on first run)
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
- `assets` — master list of all equities, ETFs, mutual funds
- `daily_prices` — EOD OHLCV + adj_close (NSE/BSE/AMFI)
- `corporate_actions` — splits, bonuses, dividends, rights, mergers
- `merger_events` — acquired/acquirer linkage for merger events
- `fundamentals` — quarterly financial data
- `asset_metrics` — pre-computed returns, risk, valuation metrics
- `pipeline_runs` — audit log for every pipeline execution
- `trading_holidays` — NSE holiday cache

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
```
