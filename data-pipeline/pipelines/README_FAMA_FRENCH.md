# Fama-French Factor Computation Pipeline

## Overview

This pipeline computes the 4-factor model (Market, SMB, HML, WML) following IIMA's methodology for the Indian equity market.

## Files

### Data Preparation
- **`ff_data_prep.py`** - Computes market cap history and book value history
- **`ff_rbi_tbills.py`** - Manages RBI T-Bill yields (risk-free rate)
- **`ff_iima_downloader.py`** - Downloads IIMA's published factors for validation

### Core Computation
- **`ff_factor_computation.py`** - Main factor computation algorithm (TODO)
- **`ff_validation.py`** - Validates our factors against IIMA (TODO)

### Database
- **`../db/schema_ff_extensions.sql`** - Schema for FF tables (applied)

## Quick Start

### Step 1: Apply Schema
```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db
sqlite3 artha.db < schema_ff_extensions.sql
```

### Step 2: Seed T-Bill Data
```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines
python ff_rbi_tbills.py --action seed
```

### Step 3: Compute Market Cap History
```bash
python ff_data_prep.py --task market_cap --start-date 2021-01-01 --end-date 2024-12-31
```

### Step 4: Compute Book Value History
```bash
python ff_data_prep.py --task book_value --start-date 2021-01-01 --end-date 2024-12-31
```

### Step 5: Download IIMA Data for Validation
```bash
python ff_iima_downloader.py --frequency all
```

### Step 6: Compute Factors (TODO)
```bash
python ff_factor_computation.py --start-date 2021-01-01 --end-date 2024-12-31
```

### Step 7: Validate (TODO)
```bash
python ff_validation.py --start-date 2021-01-01 --end-date 2024-12-31
```

## Database Tables

### Input Tables (Existing)
- `assets` - Stock master data
- `daily_prices` - OHLCV data
- `corporate_actions` - Splits, bonuses, dividends
- `fundamentals` - Quarterly financials
- `screener_balance_sheet` - Annual balance sheet

### New Tables (FF Extensions)
- `daily_market_cap` - Daily market capitalization
- `annual_book_value` - Annual book value per share
- `rbi_tbill_yields` - 91-day T-Bill yields
- `ff_breakpoints` - Size/Value/Momentum breakpoints
- `ff_portfolio_constituents` - Stock-to-portfolio mapping
- `ff_factor_returns` - Computed factor returns
- `ff_portfolio_returns` - Portfolio-level returns
- `ff_validation` - Comparison with IIMA
- `ff_stock_eligibility` - Filter tracking
- `ff_computation_log` - Audit log

## Methodology

### Stock Universe Filters
1. **Micro-cap filter**: Market cap >= 10% of median
2. **Penny stock filter**: Median price >= ₹1.00
3. **Active filter**: is_active = 1, has price data

### Rebalancing Schedule
- **Size-Value portfolios**: Annual (October 1)
- **Size-Momentum portfolios**: Monthly
- **Fiscal year**: October to September

### Factor Definitions

#### Market Premium (Rm - Rf)
- Rm = Value-weighted return of all eligible stocks
- Rf = 91-day T-Bill yield (annualized)

#### SMB (Small Minus Big)
- Median market cap breakpoint (50th percentile)
- SMB = Avg(Small portfolios) - Avg(Big portfolios)

#### HML (High Minus Low)
- Book-to-Market breakpoints (30th, 70th percentiles)
- HML = Avg(High B/M) - Avg(Low B/M)
- Fallback if Large-Value has <5 stocks: HML = Small/High - Small/Low

#### WML (Winners Minus Losers)
- Past 12-month return breakpoints (30th, 70th percentiles)
- Excludes most recent month
- WML = Avg(Winners) - Avg(Losers)

### Portfolio Construction

**6 Size-Value Portfolios:**
- Small/Low, Small/Medium, Small/High
- Big/Low, Big/Medium, Big/High

**4 Size-Momentum Portfolios:**
- Small/Loser, Small/Winner
- Big/Loser, Big/Winner

**Weighting:** Value-weighted by market cap

## Validation Metrics

### Target Correlation with IIMA
- **Minimum (MVP)**: >0.80
- **Target (Production)**: >0.90
- **Stretch (Research)**: >0.95

### Other Metrics
- Mean Absolute Error: <2%
- Sign Agreement: >85%
- RMSE: <3%

## Current Status

- [x] Schema created and applied
- [x] T-Bill data management implemented (16 records seeded)
- [x] IIMA downloader implemented (8,004 daily records)
- [x] Core factor computation algorithm (WORKING!)
- [x] Date range batch processing
- [x] Validation framework
- [x] Execution pipeline script
- [ ] Full backfill for 2021-2024 (ready to run)
- [ ] Validation results and refinement
- [ ] API endpoints (pending)
- [ ] Frontend integration (pending)

## Quick Start - Full Pipeline

### Option 1: Automated Pipeline (Recommended)
```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines
./run_ff_pipeline.sh 2021-01-01 2024-12-31 0.065
```

### Option 2: Step-by-Step

**1. Test Single Date**
```bash
python3 ff_factor_computation.py --date 2024-12-31 --rf-rate 0.0675
```

**2. Compute Date Range**
```bash
python3 ff_factor_computation.py \
  --start-date 2024-01-01 \
  --end-date 2024-12-31 \
  --rf-rate 0.065
```

**3. Validate Results**
```bash
python3 ff_validation.py \
  --start-date 2024-01-01 \
  --end-date 2024-12-31 \
  --plot \
  --output-dir ./validation_plots
```

## Test Results (2024-12-31)

Successfully computed factors for 1,608 eligible stocks:
- **Market Premium**: 0.0237%
- **SMB**: 0.0514% (Small outperformed Big)
- **WML**: 0.1193% (Winners outperformed Losers)
- **HML**: Not yet computed (needs book value data)

Portfolio breakdown:
- SMALL_LOSER: 216 stocks, ₹37,522 Cr
- SMALL_WINNER: 179 stocks, ₹35,178 Cr
- BIG_LOSER: 226 stocks, ₹694,202 Cr
- BIG_WINNER: 263 stocks, ₹554,475 Cr

## Next Steps

1. ✅ ~~Implement core algorithm~~ (DONE)
2. 🔄 Run full backfill for 2021-2024 (IN PROGRESS)
3. ⏳ Validate against IIMA data
4. ⏳ Refine if correlation <0.90
5. ⏳ Create API endpoints
6. ⏳ Frontend integration

## References

- IIMA Data Library: https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/
- Implementation Plan: `/Users/a404a/AllForOne/Skunk/projectmotilala/FAMA_FRENCH_IMPLEMENTATION.md`
