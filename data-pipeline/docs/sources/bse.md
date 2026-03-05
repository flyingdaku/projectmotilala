# BSE Data Source

## Overview
Bombay Stock Exchange — secondary source for equity daily prices. Primary for BSE-only listed stocks (~3,000+ stocks not on NSE).

## Endpoints

### 1. Bhavcopy (Daily OHLCV)
| Format | URL Pattern | Active Period |
|---|---|---|
| **New CSV (2024+)** | `bseindia.com/download/BhsavCopy/Equity/BhavCopy_BSE_CM_0_0_0_{YYYYMMDD}_F.csv` | Jan 2024 → present |
| **Legacy ZIP** | `bseindia.com/download/BhsavCopy/Equity/EQ{DDMMYY}_CSV.ZIP` | ~2010 → 2024 |
| **FTP Archive** | `bseindia.com/download/Bhavcopy/Equity/EQ{DDMMYY}.CSV` (direct) | Pre-2010 (unreliable) |

**Fields**: SC_CODE, SC_NAME, SC_GROUP, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, NO_TRADES, NET_TURNOV, NO_OF_SHRS, ISIN_NO

### 2. Financial Results API (⚠️ Currently Blocked)
- **URL**: `api.bseindia.com/BseWebAPI/api/FinancialResult/w?scripcode={CODE}`
- **Status**: Returns 302 redirect to error page from external IPs.
- **Workaround**: Use MSI or Screener for fundamentals instead.

## Corner Cases
1. **Pre-2010 Gaps**: Legacy FTP endpoint is unreliable; many dates return 404 or empty files.
2. **Zero-byte ZIPs**: Some exchange holidays return empty ZIP files instead of 404.
3. **ISIN Missing**: ~5% of SME/micro-cap scrips lack ISIN in the Bhavcopy.
4. **Scrip Code vs Symbol**: BSE uses numeric scrip codes (e.g., 500325 for Reliance), not ticker symbols.
5. **SC_GROUP Filtering**: Use groups `A`, `B`, `T` for equity. Groups `IF`, `IM` are for mutual funds.

## Date Range Coverage
| Data | Earliest Available | Notes |
|---|---|---|
| Bhavcopy | ~2010 (reliable) | Pre-2010 via legacy FTP, unreliable |
| Financial Results | N/A | API currently blocked externally |

## Integration Priority
- **For daily prices**: Use as secondary source. NSE preferred for dual-listed stocks.
- **For BSE-only stocks**: Primary source. ~3,000 stocks only listed on BSE.
- **For fundamentals**: Skip BSE API. Use MSI/Screener instead.
