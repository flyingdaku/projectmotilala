# EODHD Data Source

## Overview

EODHD (End-of-Day Historical Data) is a supplementary validation and gap-filling source for NSE/BSE equity prices. It provides both raw and adjusted OHLCV data through a REST API.

**Integration Strategy**: EODHD supplements existing NSE/BSE pipelines; it does NOT replace them. NSE/BSE remain the primary sources for Indian market data.

**API Token**: `685c39e666b732.62337737`

## Endpoints

### 1. EOD Historical Data
| Format | URL Pattern | Active Period |
|--------|-------------|---------------|
| JSON | `https://eodhd.com/api/eod/{SYMBOL}.{EXCHANGE}?api_token={TOKEN}&fmt=json&from={START}&to={END}` | All historical data |

**Parameters**:
- `SYMBOL`: Stock symbol (e.g., RELIANCE)
- `EXCHANGE`: NSE or BSE
- `api_token`: API authentication token
- `fmt`: Response format (json or csv)
- `from`: Start date (YYYY-MM-DD)
- `to`: End date (YYYY-MM-DD)

**Response Fields**:
```json
[
  {
    "date": "2024-01-15",
    "open": 2450.50,
    "high": 2475.00,
    "low": 2440.00,
    "close": 2460.75,
    "adjusted_close": 2460.75,
    "volume": 12500000
  }
]
```

**Key Feature**: Returns both `close` (raw) and `adjusted_close` (pre-computed by EODHD) in a single call.

### 2. Exchange Symbol List
| Format | URL Pattern | Active Period |
|--------|-------------|---------------|
| JSON | `https://eodhd.com/api/exchange-symbol-list/{EXCHANGE}?api_token={TOKEN}&fmt=json` | Current |

**Response Fields**:
```json
[
  {
    "Code": "RELIANCE",
    "Name": "Reliance Industries Limited",
    "Country": "India",
    "Exchange": "NSE",
    "Currency": "INR",
    "Type": "Common Stock",
    "Isin": "INE002A01018"
  }
]
```

**Usage**: Symbol mapping and discovery.

### 3. Dividends API
| Format | URL Pattern | Active Period |
|--------|-------------|---------------|
| JSON | `https://eodhd.com/api/div/{SYMBOL}.{EXCHANGE}?api_token={TOKEN}&fmt=json&from={START}` | Historical |

**Usage**: Corporate action validation.

### 4. Splits API
| Format | URL Pattern | Active Period |
|--------|-------------|---------------|
| JSON | `https://eodhd.com/api/splits/{SYMBOL}.{EXCHANGE}?api_token={TOKEN}&fmt=json&from={START}` | Historical |

**Usage**: Corporate action validation.

## Rate Limits

- **Standard Plan**: 20 API calls/second, 100,000 calls/day
- **Implementation**: 0.05s delay between requests (20 req/sec max)
- **Retry Strategy**: Exponential backoff on 429 errors
- **Max Retries**: 5 attempts

## Data Coverage

### NSE Coverage
- **Equities**: ~2,000-2,500 active stocks
- **Historical Depth**: Varies by symbol, typically 10+ years
- **Update Frequency**: Daily after market close

### BSE Coverage
- **Equities**: ~3,000+ stocks (including BSE-only)
- **Historical Depth**: Varies by symbol
- **Update Frequency**: Daily after market close

### Coverage Gaps
- Not all BSE-only micro-caps available
- Some delisted stocks may have incomplete history
- ISIN matching required for reliable symbol mapping

## Symbol Mapping Strategy

### Mapping Process

1. **ISIN-Based Matching** (Primary)
   - Most reliable method
   - Fetch EODHD symbol lists for NSE/BSE
   - Match with `assets` table by ISIN
   - ~85-90% success rate

2. **Symbol Name Matching** (Fallback)
   - Normalize symbols (uppercase, remove special chars)
   - Match by NSE symbol, BSE code, or company name
   - ~5-10% additional coverage

3. **Manual Review** (Final)
   - Unmapped assets logged to `logs/eodhd_unmapped_assets.json`
   - Quarterly review and manual mapping

### Mapping Table

**Table**: `eodhd_symbol_mapping`

**Fields**:
- `asset_id`: Internal asset ID (FK to assets)
- `eodhd_nse_symbol`: EODHD NSE ticker (e.g., RELIANCE.NSE)
- `eodhd_bse_symbol`: EODHD BSE ticker (e.g., RELIANCE.BSE)
- `isin`: ISIN code for validation
- `exchange_preference`: NSE or BSE (for dual-listed stocks)
- `is_active`: 1 = active, 0 = inactive
- `last_verified`: Last verification timestamp
- `notes`: Mapping method and notes

### Building Mappings

```bash
# Initial mapping build
python scripts/build_eodhd_mapping.py

# Rebuild all mappings
python scripts/build_eodhd_mapping.py --refresh
```

## Data Storage

### EODHD Daily Prices

**Table**: `eodhd_daily_prices`

**Schema**:
```sql
CREATE TABLE eodhd_daily_prices (
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  open REAL,
  high REAL,
  low REAL,
  close REAL NOT NULL,
  adjusted_close REAL,      -- EODHD's pre-computed adjusted close
  volume INTEGER,
  eodhd_symbol TEXT,
  exchange TEXT,             -- NSE or BSE
  fetched_at TEXT,
  PRIMARY KEY (asset_id, date, exchange)
);
```

**Key Points**:
- Stores EODHD's `adjusted_close` separately from our computed `adj_close`
- Supports both NSE and BSE data for dual-listed stocks
- Idempotent inserts (INSERT OR REPLACE)

### Price Reconciliation

**Table**: `price_reconciliation`

**Schema**:
```sql
CREATE TABLE price_reconciliation (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  nse_close REAL,
  bse_close REAL,
  eodhd_nse_close REAL,
  eodhd_bse_close REAL,
  internal_adj_close REAL,  -- Our computed adj_close
  eodhd_adj_close REAL,     -- EODHD's adjusted_close
  close_deviation_pct REAL,
  adj_close_deviation_pct REAL,
  volume_nse INTEGER,
  volume_eodhd INTEGER,
  status TEXT,               -- MATCH, MINOR_DEVIATION, MAJOR_DEVIATION, etc.
  flags TEXT,                -- JSON array of issues
  reconciled_at TEXT
);
```

**Reconciliation Statuses**:
- `MATCH`: All prices match within thresholds
- `MINOR_DEVIATION`: Close price deviation 0.5-2%
- `MAJOR_DEVIATION`: Close price deviation >2% (alert)
- `MISSING_SOURCE`: Data missing in primary source
- `EODHD_ONLY`: Only EODHD has data

## Price Reconciliation Engine

### Reconciliation Rules

| Metric | Minor Deviation | Major Deviation | Action |
|--------|----------------|-----------------|--------|
| Close Price | 0.5% - 2% | >2% | Alert + manual review |
| Adjusted Close | 2% - 5% | >5% | Alert + CA audit |
| Volume | 20% - 50% | >50% | Flag only (informational) |

### Running Reconciliation

```bash
# Reconcile yesterday's prices
python -m pipelines.eodhd_reconciliation

# Reconcile specific date
python -m pipelines.eodhd_reconciliation 2024-01-15

# Disable Telegram alerts
python -m pipelines.eodhd_reconciliation 2024-01-15 --no-alert
```

### Reconciliation Workflow

1. **Fetch Prices**: Get NSE, BSE, EODHD NSE, EODHD BSE prices
2. **Compare**: Calculate deviations for close, adj_close, volume
3. **Classify**: Assign status (MATCH, MINOR, MAJOR, etc.)
4. **Store**: Insert reconciliation record
5. **Alert**: Send Telegram alert on major deviations

## Integration with Daily Pipeline

### Pipeline Execution Order

1. NSE/BSE Corporate Actions
2. **Parallel Ingestion** (includes EODHD EOD)
   - NSE Bhavcopy
   - BSE Bhavcopy
   - AMFI NAV
   - Fundamentals
   - IIMA FF
   - Nifty Indices
   - BSE Indices
   - **EODHD EOD** ← New
3. **EODHD Reconciliation** ← New
4. Recompute Adjusted Close
5. Compute Nightly Metrics
6. Verification Checks

### CLI Options

```bash
# Run full pipeline with EODHD
python run_pipeline.py

# Skip EODHD ingestion
python run_pipeline.py --skip-eodhd

# Skip EODHD reconciliation
python run_pipeline.py --skip-eodhd-reconcile

# Skip both
python run_pipeline.py --skip-eodhd --skip-eodhd-reconcile
```

## Verification Checks

### 1. EODHD Completeness
- **Check**: % of mapped assets with EODHD data
- **Threshold**: >=90% coverage
- **Status**: PASS if >=90%, WARN otherwise

### 2. Price Reconciliation Health
- **Check**: % of assets with major deviations
- **Threshold**: <=1% major deviations
- **Status**: PASS if <=1%, WARN otherwise

### 3. Adjusted Close Validation
- **Check**: % of assets with adj_close deviation >2%
- **Threshold**: <=5% deviations
- **Status**: PASS if <=5%, WARN otherwise

## Corner Cases

### 1. Symbol Changes
- **Issue**: NSE/BSE symbols change over time (NAME_CHANGE events)
- **Solution**: ISIN-based matching remains valid; symbol mapping needs periodic refresh
- **Frequency**: Quarterly re-sync recommended

### 2. Delisted Stocks
- **Issue**: EODHD may not have data for recently delisted stocks
- **Solution**: Mark mapping as inactive, log to unmapped report
- **Action**: Manual review for historical backfill

### 3. BSE-Only Stocks
- **Issue**: EODHD coverage lower for BSE-only micro-caps
- **Solution**: Accept lower coverage, use NSE/BSE as primary
- **Monitoring**: Track BSE-only coverage separately

### 4. Adjusted Close Discrepancies
- **Issue**: EODHD's adjustment methodology may differ from ours
- **Solution**: 
  - Compare adjustment factors
  - Fetch EODHD corporate actions
  - Audit discrepancies >5%
  - Our internal CA engine remains authoritative

### 5. Volume Differences
- **Issue**: NSE/BSE report volume differently (trades vs shares)
- **Solution**: Flag only extreme deviations (>50%), don't auto-correct
- **Note**: Volume is informational, not critical for backtests

### 6. Timezone Handling
- **Issue**: EODHD timestamps may be UTC, ours are IST
- **Solution**: Store all dates in YYYY-MM-DD format (no time component)
- **Validation**: Verify date alignment in reconciliation

### 7. Missing Data Days
- **Issue**: EODHD may not have data for all trading days
- **Solution**: 
  - Log missing dates
  - Don't fail pipeline
  - Use NSE/BSE as fallback

## Best Practices

### 1. Never Overwrite Primary Data
- ❌ **Don't**: Replace NSE/BSE prices with EODHD
- ✅ **Do**: Store EODHD separately, reconcile, flag deviations

### 2. Validate Adjusted Prices
- ❌ **Don't**: Trust EODHD adjusted_close blindly
- ✅ **Do**: Compare with our adj_close, audit CA events

### 3. Handle Missing Data Gracefully
- ❌ **Don't**: Fail pipeline on 404 errors
- ✅ **Do**: Log missing symbols, continue processing

### 4. Respect Rate Limits
- ❌ **Don't**: Hammer API without delays
- ✅ **Do**: Implement 0.05s delay, exponential backoff

### 5. Archive Raw Responses
- ❌ **Don't**: Discard API responses after parsing
- ✅ **Do**: Save to `raw_data/EODHD/` for auditability

### 6. Monitor Reconciliation Health
- ❌ **Don't**: Ignore major deviations
- ✅ **Do**: Alert on >1% major deviations, investigate root cause

## Monitoring & Alerts

### Daily Monitoring

1. **EODHD Pipeline Health**
   - Check `pipeline_runs` for EODHD_EOD status
   - Monitor API call count vs 100K limit
   - Track success rate and latency

2. **Reconciliation Metrics**
   - % assets with MATCH status
   - Count of MAJOR_DEVIATION cases
   - Top 10 problematic assets

3. **Data Freshness**
   - Latest EODHD data date
   - Lag vs NSE/BSE data

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| EODHD completeness | <95% | <90% |
| Major deviations | >1% | >5% |
| Adj close mismatches | >5% | >10% |
| API failures | >5% | >10% |

### Telegram Alerts

- **MAJOR_DEVIATION**: Sent automatically with top 5 deviations
- **Low Coverage**: Sent if <90% completeness
- **Pipeline Failure**: Sent on EODHD ingestion failure

## Backfill Strategy

### Historical Backfill

```bash
# Full backfill from 2000-01-01
python scripts/backfill_eodhd.py --from 2000-01-01 --workers 5

# Backfill specific date range
python scripts/backfill_eodhd.py --from 2020-01-01 --to 2023-12-31

# Resume from last checkpoint
python scripts/backfill_eodhd.py --resume
```

### Backfill Process

1. **Symbol Mapping** (Day 0): Build complete EODHD symbol mapping (~2-3 hours)
2. **Historical Fetch** (Days 1-3): Fetch EOD data in 1-year chunks (~100K API calls)
3. **Reconciliation** (Day 4): Run reconciliation for all historical dates
4. **CA Validation** (Day 5): Fetch EODHD dividends/splits, compare with our CA table

**Estimated Time**: 5-7 days for full backfill (2000-present)

## Troubleshooting

### Issue: Low EODHD Coverage

**Symptoms**: <90% of mapped assets have EODHD data

**Causes**:
- Symbol mapping incomplete
- EODHD API downtime
- BSE-only stocks not covered

**Solutions**:
1. Run `python scripts/build_eodhd_mapping.py --refresh`
2. Check EODHD API status
3. Review `logs/eodhd_unmapped_assets.json`

### Issue: High Major Deviations

**Symptoms**: >5% of assets have MAJOR_DEVIATION status

**Causes**:
- Corporate action missing in our DB
- EODHD data error
- Symbol mapping incorrect

**Solutions**:
1. Check `price_reconciliation` table for specific assets
2. Fetch EODHD corporate actions for affected symbols
3. Compare with our `corporate_actions` table
4. Add missing CA events if needed

### Issue: API Rate Limit Exceeded

**Symptoms**: 429 errors in logs

**Causes**:
- Too many parallel requests
- Insufficient delay between requests

**Solutions**:
1. Reduce worker count in backfill
2. Increase `REQUEST_DELAY` in `eodhd_eod.py`
3. Check daily API call count vs 100K limit

### Issue: Adjusted Close Mismatches

**Symptoms**: >10% of assets have adj_close deviation >2%

**Causes**:
- Different adjustment methodology
- Missing corporate actions
- EODHD data error

**Solutions**:
1. Run `python scripts/validate_adjustments.py {SYMBOL}`
2. Fetch EODHD corporate actions
3. Compare adjustment factors
4. Audit discrepancies manually

## Integration Priority

- **Golden source for**: None (EODHD is supplementary)
- **Validation source for**: NSE/BSE close prices, adjusted close
- **Fallback from**: None
- **Fallback to**: NSE/BSE (always primary)

## Future Enhancements (Phase 2)

### Intraday Data
- 5-minute and 1-hour resolutions
- 90-day rolling window storage
- Liquidity analysis metrics

### Corporate Action Validation
- Automated CA audit pipeline
- Missing event detection
- Adjustment factor comparison

### Advanced Reconciliation
- Multi-source consensus pricing
- Outlier detection algorithms
- Automated correction suggestions

## References

- EODHD API Documentation: https://eodhd.com/financial-apis/
- Internal Plan: `/Users/a404a/.windsurf/plans/eodhd-integration-plan-becafa.md`
- Schema: `db/schema.sql` (EODHD section)
- Source Code: `sources/eodhd/eodhd_eod.py`
- Reconciliation: `pipelines/eodhd_reconciliation.py`
