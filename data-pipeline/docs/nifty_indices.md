# Nifty Indices Backfill

## Overview

The Nifty indices backfill script fetches historical price data for all Nifty indices from niftyindices.com, with a preference for Total Return Index (TRI) data and fallback to Price Return (PRI) data.

## Data Sources

### Primary Source: Nifty Indices (www.niftyindices.com)

- **Endpoint**: `https://www.niftyindices.com/Backpage.aspx/getHistoricaldataDBtoString`
- **Method**: POST with JSON payload
- **Data Types**:
  - `DataType: "TR"` - Total Return Index (includes dividend reinvestment)
  - `DataType: "HR"` - Price Return Index (standard price series)

### Secondary Source: NSE India (www.nseindia.com)

- **Endpoint**: `https://www.nseindia.com/api/allIndices`
- **Purpose**: Fetch complete list of all Nifty indices for database seeding

## Schema Differences

### TRI Response Schema (`DataType: "TR"`)
```json
{
  "TRIDate": "13 Feb 2026",
  "Date": "2026-02-13T00:00:00",
  "Total Returns Index": "83933.44",
  "Index Close": "60186.65"
}
```

### PRI Response Schema (`DataType: "HR"`)
```json
{
  "HistoricalDate": "13 Feb 2026",
  "OPEN": "60100.00",
  "HIGH": "60250.00",
  "LOW": "59950.00",
  "CLOSE": "60186.65"
}
```

## Implementation Details

### Fetch Strategy

1. **TRI First**: Always attempt to fetch Total Return Index data
2. **PRI Fallback**: If TRI returns empty, fall back to Price Return
3. **Chunked Requests**: 1-year chunks (365 days) to avoid timeouts
4. **Newest-First**: Process newest chunks first to hit real data immediately
5. **Early Exit**: Stop after 3 consecutive empty chunks (index didn't exist)

### Parallel Execution

- **Default Workers**: 8 parallel threads
- **Rate Limiting**: 0.15s sleep between chunks within each thread
- **Timeout**: 10s per request (fast-fail on missing data)
- **Batched Writes**: All rows for an index written in a single transaction

### Database Storage

- **TRI Data**: Stored with `source_exchange = 'NSE_TRI'`
- **PRI Data**: Stored with `source_exchange = 'NSE'`
- **OHLC Fields**: TRI data only provides close price; OHLC fields are NULL
- **Idempotent**: Uses `INSERT OR REPLACE` to allow safe re-runs

## Performance Characteristics

### Timing

| Operation | Duration |
|-----------|----------|
| Full backfill (135 indices) | ~6 minutes |
| Single index | ~5-10 seconds |
| Chunk request | ~0.2-2s (data available) |
| Empty chunk timeout | 10s |

### Data Volume

- **Total Indices**: 135 (broad market, sectoral, thematic)
- **Total Rows**: ~5.9M price records
- **TRI Rows**: 69K (newly added)
- **PRI Rows**: 5.8M (existing)

### Coverage by Index Type

| Index Type | Typical Start Date | Example |
|------------|-------------------|---------|
| Broad Market | 2000-01-03 | NIFTY 500, NIFTY NEXT 50 |
| Sectoral | 2004-2006 | NIFTY BANK, NIFTY IT |
| Thematic | 2005-2025 | NIFTY CONSUMPTION, NIFTY INFRA |
| Strategy | 2015-2025 | NIFTY ALPHA 50, NIFTY LOW VOL 50 |

## Usage Examples

### Basic Usage

```bash
# Full backfill for all indices
python scripts/backfill_indices.py --start 2000-01-01

# Backfill specific indices
python scripts/backfill_indices.py --indices "Nifty 50" "Nifty Bank" --start 2024-01-01

# Adjust worker count
python scripts/backfill_indices.py --start 2000-01-01 --workers 12
```

### Advanced Usage

```bash
# Backfill recent data only (last 2 years)
python scripts/backfill_indices.py --start 2024-01-01

# Backfill with custom date range
python scripts/backfill_indices.py --start 2010-01-01 --end 2023-12-31

# Verbose mode (shows warnings for missing chunks)
python scripts/backfill_indices.py --start 2000-01-01 2>&1 | grep WARN
```

## Error Handling

### Common Errors

1. **Timeout on Early Years**: Expected for indices launched after 2000
   - Solution: Script automatically skips after 3 consecutive timeouts
   
2. **DNS Resolution Failure**: Network connectivity issue
   - Solution: Check internet connection or DNS settings

3. **Empty Response**: Index not available on niftyindices.com
   - Solution: Some newer indices may not have historical data

### Retry Logic

- **No Automatic Retries**: Failed chunks are logged as warnings
- **Idempotent Design**: Safe to re-run the script
- **Partial Success**: Failed indices don't affect others

## Data Quality Notes

### TRI vs PRI Divergence

TRI values can be 50%+ higher than PRI over 20+ years due to dividend reinvestment. This is expected and correct for backtesting purposes.

### Missing OHLC for TRI

TRI data only provides close price. Open/High/Low fields are NULL for TRI rows. This is a limitation of the data source.

### Index Launch Dates

Not all indices have data from 2000-01-01. The script handles this gracefully by:
- Trying each chunk
- Skipping empty chunks
- Stopping after 3 consecutive empties

## Integration with Daily Pipeline

The backfill script is standalone and doesn't integrate with the daily pipeline. For daily updates, you would need to:

1. Create a daily indices fetcher similar to equity bhavcopy
2. Add it to `run_pipeline.py` parallel execution
3. Handle the same TRI/PRI logic for incremental updates

## Future Enhancements

1. **Daily Integration**: Add to main pipeline for automatic daily updates
2. **Constituents Tracking**: Fetch and store index constituents over time
3. **Corporate Actions**: Handle index rebalancing events
4. **Benchmark Analytics**: Pre-compute index returns, volatility, correlations
5. **Alternative Sources**: Add fallback to other data providers for missing indices

## Troubleshooting

### Debug Mode

Add print statements to see detailed progress:
```python
# In fetch_index function
print(f"Fetching {index_name} chunk {s}-{e}: {len(rows)} rows")
```

### Verify Data

Check what was actually stored:
```sql
-- Count TRI vs PRI
SELECT source_exchange, COUNT(*) 
FROM daily_prices dp 
JOIN assets a ON dp.asset_id = a.id 
WHERE a.asset_class = 'INDEX' 
GROUP BY source_exchange;

-- Check specific index
SELECT date, close, source_exchange 
FROM daily_prices dp 
JOIN assets a ON dp.asset_id = a.id 
WHERE a.name = 'Nifty 50' 
ORDER BY date DESC LIMIT 10;
```

### Re-run Specific Index

If an index failed, re-run just that one:
```bash
python scripts/backfill_indices.py --indices "NIFTY MIDCAP 50" --start 2000-01-01
```
