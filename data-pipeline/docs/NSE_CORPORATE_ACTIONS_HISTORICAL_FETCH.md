# NSE Corporate Actions Historical Fetch

## Overview

This document describes the process for fetching complete historical corporate actions data from NSE for all symbols from 2000 onwards. The data is stored as raw JSON files for later processing and ingestion.

## Problem Statement

The current NSE corporate actions pipeline (`sources/nse/corporate_actions.py`) only fetches data for specific date ranges (typically daily). This approach has limitations:

1. **Incomplete Historical Coverage**: Only fetches data from ~2005 onwards when the pipeline was first run
2. **Date-Range Limitations**: NSE API date-range queries may miss some events
3. **No Per-Symbol History**: Cannot fetch complete history for individual symbols

## Solution: Per-Symbol Historical Fetch

The new script `scripts/fetch_nse_corporate_actions_historical.py` fetches complete corporate actions history for each symbol individually using the NSE API's per-symbol endpoint.

### Key Features

1. **Per-Symbol Fetching**: Uses `symbol` + `issuer` parameters for complete history
2. **Raw Data Storage**: Saves JSON files in `raw_data/NSE_CORP_ACTIONS/`
3. **No Database Ingestion**: Pure data collection - processing happens separately
4. **Parallel Processing**: Multi-threaded fetching with configurable workers
5. **Idempotent**: Skips symbols with existing files (unless `--force`)
6. **Rate Limiting**: Built-in delays to respect NSE API limits

## NSE API Endpoint

### Working API Call

```bash
curl 'https://www.nseindia.com/api/corporates-corporateActions?index=equities&symbol=RELIANCE&issuer=Reliance%20Industries%20Limited' \
  -H 'accept: */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7' \
  -H 'referer: https://www.nseindia.com/companies-listing/corporate-filings-actions' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
```

### Parameters

- `index=equities` - Required, specifies equity segment
- `symbol=RELIANCE` - NSE symbol
- `issuer=Reliance Industries Limited` - Company name (optional but improves results)
- `from_date=DD-MM-YYYY` - Optional start date
- `to_date=DD-MM-YYYY` - Optional end date

**Note**: Omitting `from_date` and `to_date` returns **complete historical data** for the symbol.

### Session Requirements

NSE API requires:
1. **Cookie Priming**: Visit `https://www.nseindia.com` first to get cookies
2. **Proper Headers**: User-Agent, Referer, Accept headers
3. **Rate Limiting**: ~1-2 seconds between requests recommended

## Usage

### Fetch All Symbols (Recommended)

```bash
# Fetch complete history for all NSE symbols
python scripts/fetch_nse_corporate_actions_historical.py

# With custom workers
python scripts/fetch_nse_corporate_actions_historical.py --workers 5

# Force re-fetch (overwrite existing files)
python scripts/fetch_nse_corporate_actions_historical.py --force
```

### Fetch Specific Symbol

```bash
# Single symbol
python scripts/fetch_nse_corporate_actions_historical.py --symbol RELIANCE

# With verbose logging
python scripts/fetch_nse_corporate_actions_historical.py --symbol RELIANCE --verbose
```

### Year-by-Year Fetching (Alternative)

```bash
# Fetch year by year (creates separate files per year)
python scripts/fetch_nse_corporate_actions_historical.py --by-year --start-year 2000 --end-year 2024
```

## Output Structure

### File Naming

- **All-time fetch**: `{SYMBOL}_all.json`
- **Year-by-year fetch**: `{SYMBOL}_{YEAR}.json`

### File Location

```
raw_data/NSE_CORP_ACTIONS/
├── RELIANCE_all.json
├── TCS_all.json
├── INFY_all.json
└── ...
```

### JSON Structure

```json
{
  "symbol": "RELIANCE",
  "issuer": "Reliance Industries Limited",
  "from_date": null,
  "to_date": null,
  "fetched_at": "2026-03-13T00:14:06.651991",
  "data": [
    {
      "symbol": "RELIANCE",
      "series": "EQ",
      "faceVal": "10",
      "subject": "Dividend - Rs 5.5 Per Share",
      "exDate": "14-Aug-2025",
      "recDate": "14-Aug-2025",
      "bcStartDate": "-",
      "bcEndDate": "-",
      "comp": "Reliance Industries Limited",
      "isin": "INE002A01018",
      "caBroadcastDate": null
    },
    {
      "symbol": "RELIANCE",
      "series": "EQ",
      "faceVal": "10",
      "subject": "Bonus 1:1",
      "exDate": "28-Oct-2024",
      "recDate": "28-Oct-2024",
      "comp": "Reliance Industries Limited",
      "isin": "INE002A01018"
    }
  ]
}
```

## Data Fields

### Metadata Fields (Added by Script)

- `symbol`: NSE symbol
- `issuer`: Company name
- `from_date`: Query start date (null for all-time)
- `to_date`: Query end date (null for all-time)
- `fetched_at`: ISO timestamp of fetch

### Corporate Action Fields (From NSE)

- `symbol`: NSE symbol
- `series`: Trading series (EQ, BE, etc.)
- `faceVal`: Face value of share
- `subject`: Corporate action description (e.g., "Dividend - Rs 5.5 Per Share", "Bonus 1:1")
- `exDate`: Ex-date in DD-MMM-YYYY format
- `recDate`: Record date
- `bcStartDate`: Book closure start date
- `bcEndDate`: Book closure end date
- `comp`: Company name
- `isin`: ISIN code
- `caBroadcastDate`: Broadcast date (often null)

## Processing Raw Data

The raw JSON files can be processed separately to:

1. **Parse Corporate Actions**: Extract action type, ratios, amounts from `subject` field
2. **Normalize Dates**: Convert DD-MMM-YYYY to YYYY-MM-DD
3. **Calculate Adjustment Factors**: Compute price adjustment multipliers
4. **Ingest to Database**: Insert into `corporate_actions` table
5. **Recompute Adjusted Close**: Update `daily_prices.adj_close` retroactively

### Example Processing Script

```python
import json
from pathlib import Path
from datetime import datetime

def parse_corporate_action(ca_dict):
    """Parse NSE corporate action record."""
    subject = ca_dict.get('subject', '').upper()
    
    # Determine action type
    if 'SPLIT' in subject:
        action_type = 'SPLIT'
    elif 'BONUS' in subject:
        action_type = 'BONUS'
    elif 'DIVIDEND' in subject:
        action_type = 'DIVIDEND'
    elif 'FACE VALUE' in subject:
        action_type = 'FACE_VALUE_CHANGE'
    else:
        action_type = 'OTHER'
    
    # Parse ex_date
    ex_date_str = ca_dict.get('exDate', '')
    if ex_date_str and ex_date_str != '-':
        ex_date = datetime.strptime(ex_date_str, '%d-%b-%Y').strftime('%Y-%m-%d')
    else:
        ex_date = None
    
    return {
        'symbol': ca_dict.get('symbol'),
        'action_type': action_type,
        'ex_date': ex_date,
        'record_date': ca_dict.get('recDate'),
        'subject': ca_dict.get('subject'),
        'isin': ca_dict.get('isin')
    }

# Process all files
raw_dir = Path('raw_data/NSE_CORP_ACTIONS')
for json_file in raw_dir.glob('*_all.json'):
    with open(json_file) as f:
        data = json.load(f)
    
    for ca in data.get('data', []):
        parsed = parse_corporate_action(ca)
        # Insert to database or further process
        print(parsed)
```

## Performance Metrics

### Expected Results

- **Total NSE Symbols**: ~2,500 active + delisted
- **Fetch Rate**: ~1 symbol/second (with rate limiting)
- **Total Time**: ~40-60 minutes for all symbols
- **Success Rate**: >95% (some symbols may have no corporate actions)
- **Data Volume**: ~50-100 MB total (compressed JSON)

### Sample Output

```
================================================================================
NSE CORPORATE ACTIONS FETCH COMPLETE
================================================================================
Total symbols: 2,500
Success: 2,450
Failed: 25
Skipped: 25
Output directory: raw_data/NSE_CORP_ACTIONS
================================================================================
Total files: 2,450
```

## Comparison: Historical Fetch vs Daily Pipeline

| Feature | Historical Fetch | Daily Pipeline |
|---------|-----------------|----------------|
| **Endpoint** | Per-symbol (all-time) | Date-range query |
| **Coverage** | Complete history | Daily incremental |
| **Date Range** | 2000+ (symbol dependent) | 2005+ (when started) |
| **Storage** | Raw JSON files | Database only |
| **Processing** | Deferred | Immediate |
| **Use Case** | One-time backfill | Ongoing updates |
| **Idempotency** | File-based | Database-based |

## Next Steps

After fetching raw data:

1. **Verify Coverage**: Check which symbols have data
2. **Parse and Validate**: Extract action types, ratios, amounts
3. **Deduplicate**: Compare with existing `corporate_actions` table
4. **Ingest to Database**: Bulk insert new records
5. **Recompute Adjustments**: Update `daily_prices.adj_close` from 2000 onwards
6. **Cross-Validate**: Compare with EODHD corporate actions

## Troubleshooting

### 403 Forbidden Errors

**Cause**: NSE session cookies expired or rate limiting triggered

**Solution**:
- Reduce `--workers` (try 1-3)
- Increase `REQUEST_DELAY` in script
- Script auto-refreshes session on 403

### Missing Data for Symbol

**Cause**: Symbol may not have corporate actions or API returned empty

**Solution**:
- Check if symbol is valid and active
- Verify company name (`issuer` parameter)
- Try manual curl to confirm

### Slow Fetching

**Cause**: Rate limiting delays

**Solution**:
- This is expected and intentional
- Increase `--workers` cautiously (max 5)
- Run overnight for full fetch

## Monitoring

### Check Progress

```bash
# Watch log file
tail -f logs/nse_ca_historical_fetch.log

# Count fetched files
ls raw_data/NSE_CORP_ACTIONS/*.json | wc -l

# Check file sizes
du -sh raw_data/NSE_CORP_ACTIONS/
```

### Verify Data Quality

```bash
# Sample a file
cat raw_data/NSE_CORP_ACTIONS/RELIANCE_all.json | jq '.data | length'

# Check for errors
grep -i error logs/nse_ca_historical_fetch.log

# List symbols with no data
jq -r 'select(.data | length == 0) | .symbol' raw_data/NSE_CORP_ACTIONS/*.json
```

## Conclusion

The historical fetch script provides a robust solution for collecting complete NSE corporate actions data from 2000 onwards. This addresses the gap in our current pipeline and enables accurate historical price adjustments for quantitative analysis.

**Status**: ✅ Script implemented and tested  
**Data Coverage**: 2000+ (symbol-dependent)  
**Storage**: Raw JSON files in `raw_data/NSE_CORP_ACTIONS/`  
**Next Phase**: Parse and ingest to database with deduplication

