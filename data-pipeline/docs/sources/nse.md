# NSE Data Source

## Overview
National Stock Exchange of India — primary source for equity daily prices, corporate actions, and the security master list.

## Endpoints

### 1. Bhavcopy (Daily OHLCV)
The Bhavcopy is the official end-of-day price file published by NSE after market close (~6 PM IST).

| Format | URL Pattern | Active Period |
|---|---|---|
| **New ZIP (2024+)** | `nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_{YYYYMMDD}_F.csv.zip` | Jan 2024 → present |
| **Full Bhavdata CSV** | `nsearchives.nseindia.com/products/content/sec_bhavdata_full_{DDMMYYYY}.csv` | ~2016 → present |
| **Historical ZIP** | `nsearchives.nseindia.com/content/historical/EQUITIES/{YYYY}/{MMM}/cm{DD}{MMM}{YYYY}bhav.csv.zip` | ~1994 → 2023 |

**Fields**: SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, TOTTRDQTY, TOTTRDVAL, TOTALTRADES, ISIN, TIMESTAMP

> [!WARNING]
> Column names differ across formats. The `sources/nse/bhavcopy.py` normalises them.

### 2. Corporate Actions
- **URL**: `nseindia.com/api/corporates-corporateActions?index=equities&from_date={DD-MM-YYYY}&to_date={DD-MM-YYYY}`
- **Fields**: symbol, subject, exDate, recordDate, bcStartDate, bcEndDate
- **Rate Limit**: Cookie-primed session required. Max ~100 requests/minute.

### 3. Security Master
- **URL**: `nseindia.com/api/equity-stockIndices?index=SECURITIES IN F%26O` (and other indices)
- **Fields**: symbol, identifier, series, isinCode, listingDate, industry, companyName

## Series Filtering
Only these series codes represent equity trading:
- **EQ**: Regular equity
- **BE**: Book Entry (T+1 settlement for some period)
- **BZ**: Trade to Settle
- **SM/ST**: SME platform

Other series (N1, N2, etc.) are reserved for derivatives and should be excluded from `daily_prices`.

## Corner Cases
1. **Symbol Changes**: NSE does not update historical data for renamed stocks. Track via corporate actions `NAME_CHANGE` events.
2. **Pre-2010 ZIP internal filenames**: Some older ZIPs use `cm{DD}{MMM}{YYYY}bhav.csv` (no space/dash), while newer ones may include `_` or `-`.
3. **Weekend/Holiday 404s**: Expected. NSE returns 404 for non-trading days.
4. **Rate Limiting**: NSE aggressively blocks IPs making > ~60 requests/minute. Use 0.5s delay between requests.
5. **Cookie Priming**: All API requests require hitting `https://www.nseindia.com` first to set session cookies.

## Date Range Coverage
| Data | Earliest Available | Notes |
|---|---|---|
| Bhavcopy | ~1994 | Sparse before 2000 |
| Corporate Actions | ~2005 | Via API; earlier ones via archives |
| Security Master | Live only | Refresh daily |
