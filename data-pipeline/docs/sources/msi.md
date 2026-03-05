# MarketSmith India (MSI) Data Source

## Overview
MarketSmith India (by William O'Neil) — **highest quality source** for fundamentals, ratings, and institutional data. Requires paid subscription + auth token.

## Data Coverage

### Company Data (`msi_company_data` — 2,915 companies)
- **CANSLIM Ratings**: RS Rating, EPS Rating, SMR Rating, Master Score, A/D Rating, Group Rank
- **Sector/Industry**: MSI's own multi-level classification (differs from Screener's)
- **Profile**: Full Name, Industry Group, Group Rank, Listing Date

### Quarterly Financials (`msi_fundamentals_quarterly` — 70,140 rows)
- **Fields**: Revenue (Ops), PBT, Finance Costs, Depreciation, Tax, Net Profit, Basic EPS, Diluted EPS
- **Depth**: ~24 quarters (6 years) per company

### Balance Sheets (`msi_balance_sheets` — 24,848 rows)
- **Fields**: Equity Capital, Reserves, Long/Short-term Borrowings, Fixed Assets, Investments, Cash, Total Assets/Liabilities, Trade Receivables
- **Depth**: ~10 periods per company

### Cash Flows (`msi_cash_flows` — 24,571 rows)
- **Fields**: Operating, Investing, Financing CF, Capex, Free Cash Flow
- **Depth**: ~10 periods per company

### Shareholding (`msi_shareholding` — 10,068 rows)
- **Fields**: Promoter%, FII%, DII%, Public%, Pledged%
- **Depth**: ~4 quarters per company

### Ratios (`msi_ratios_quarterly` — 156,306 rows)
- **Fields**: PE, PB, EV/EBITDA, Market Cap, ROE, ROCE, Debt/Equity, Current Ratio, and ~40 more
- **Depth**: ~24 quarters per company

## Authentication
- **Method**: Bearer token in `Authorization` header
- **Token Source**: Extract from browser session after login
- **Env Var**: `MSI_AUTH_TOKEN`
- **Expiry**: Tokens last ~24 hours, must be refreshed

## Rate Limits
- ~20 companies per minute before soft throttling
- ~100 companies per batch before session invalidation
- **Strategy**: Random 3-8s delay between requests, batch in groups of 20

## Corner Cases
1. **Coverage Gap**: Only ~2,915 companies (out of 16,961 total). Missing BSE-only and micro-cap stocks.
2. **Auth Token Expiry**: Scraper must detect 401/403 and fail gracefully.
3. **Field Name Variations**: Some fields change names between quarterly/annual views.
4. **Consolidated vs Standalone**: MSI defaults to consolidated. Standalone returns fewer rows.

## Integration Priority
- **Golden source for**: Revenue, PAT, EPS, Balance Sheet, Cash Flow, Shareholding, CANSLIM ratings
- **Fallback from**: No fallback — MSI is always preferred when available
- **Fallback to**: Screener (for stocks not in MSI coverage)
