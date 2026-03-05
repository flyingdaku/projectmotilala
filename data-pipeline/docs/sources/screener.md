# Screener.in Data Source

## Overview
Screener.in — free financial data aggregator. Provides broad coverage (~16,000 equities) but lower granularity than MSI. Data is HTML-parsed from the website.

## Data Coverage

### Quarterly Results (`screener_quarterly` — 15,947 rows)
- **Fields**: Sales, Expenses, Operating Profit, OPM%, Other Income, Interest, Depreciation, PBT, Tax%, Net Profit, EPS
- **Depth**: ~40 quarters (10 years) for well-covered stocks; ~4 quarters for login-walled ones

### Balance Sheet (`screener_balance_sheet` — 15,678 rows)
- **Fields**: Share Capital, Reserves, Borrowings, Other Liabilities, Fixed Assets, CWIP, Investments, Other Assets, Total Assets

### Cash Flow (`screener_cashflow` — 14,619 rows)
- **Fields**: Operating CF, Investing CF, Financing CF, Net Cash Flow

### Shareholding (`screener_shareholding` — 0 rows, pipeline not yet run)
- **Fields**: Promoter%, FII%, DII%, Government%, Public%, Num Shareholders

### Ratios (`screener_ratios` — 0 rows, pipeline not yet run)
- **Fields**: Debtor Days, Inventory Days, Days Payable, Cash Conversion Cycle, Working Capital Days, ROC%

### Industry Classification (in `assets` table)
- **4-level hierarchy**: Sector → Industry Group → Industry → Sub-Industry
- **Market codes**: Each level has a Screener code (e.g., IN03, IN0301, IN030103)
- **Source**: `#peers` section of each company page

## URL Patterns
```
/company/{SYMBOL}/consolidated/    # Consolidated financials (preferred)
/company/{SYMBOL}/                 # Standalone fallback
```

## Caching
- HTML pages are cached in `raw_data/SCREENER/{SYMBOL}.html`
- Cache is populated by `scripts/prefetch_raw_data.py`
- ~2,415 pages currently cached (out of ~16,000 possible)

## Corner Cases
1. **Login Wall**: Screener shows only ~4 quarters for non-logged-in users. Full data requires premium login.
2. **BSE Symbol Mapping**: Some stocks use BSE code instead of NSE symbol on Screener.
3. **Period Format**: Headers show "Mar 2023" or "Mar 2023(C)" — `(C)` indicates consolidated.
4. **Rate Limiting**: 429 errors after ~50 requests. Implement 30s exponential backoff.
5. **HTML Structure Changes**: Table selectors (`section#quarters .data-table`) may change without notice.
6. **Row Label Normalization**: Labels like "Sales +" (with disclosure toggle) must be cleaned.

## Integration Priority
- **Golden source for**: Industry Classification (4-level hierarchy with codes)
- **Fallback source for**: Quarterly Results, Balance Sheet, Cash Flow (when MSI lacks coverage)
- **Not useful for**: CANSLIM ratings, proprietary rankings (MSI only)
