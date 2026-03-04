# Fama-French Factor Automation - Implementation Plan

## Executive Summary

**Goal**: Automate computation of Fama-French 4-factor model (Market, SMB, HML, WML) to match IIMA's methodology with minimal deviation for the last 2-3 years.

**Feasibility**: ✅ **YES** - We can replicate their methodology with our existing data infrastructure.

**Key Challenge**: IIMA uses CMIE Prowess DX (proprietary, expensive). We use NSE/BSE public data. Results will be close but not identical.

**Expected Deviation**: 5-10% correlation difference due to data source differences, acceptable for retail investor use.

---

## 1. IIMA Methodology (Extracted from Documentation)

### Data Source & Universe
- **Source**: CMIE Prowess DX (3 releases/year: March, September, December)
- **Coverage**: Both BSE and NSE listed companies
- **Exchange Selection**: For dual-listed stocks, pick exchange with greater aggregate liquidity
- **Returns**: Total returns (price + dividends) from Prowess DX field

### Stock Filters (Applied Annually)
1. **Micro-cap Filter**: Exclude stocks with market cap < 10% of median market cap in preceding year
   - Example (2019-20): Cutoff = ₹109.5M, excluded bottom 25.8%
2. **Penny Stock Filter**: Exclude stocks with median price < ₹1.00 in preceding year
   - Example (2019-20): Excluded 5.3%
3. **Combined Effect**: ~26.8% of stocks excluded (overlap between filters)

### Portfolio Construction Timeline
- **Fiscal Year**: October to September (not calendar year!)
- **Rebalancing**: Annual for Size-Value portfolios, Monthly for Size-Momentum portfolios
- **Minimum Portfolio Size**: Each double-sort portfolio must have ≥5 stocks
  - If Large-Cap Value has <5 stocks, compute HML as (Small Value - Small Growth) instead

### Factor Definitions

#### 1. **Market Risk Premium (Rm - Rf)**
- **Rm**: Value-weighted return of all stocks in universe
- **Rf**: Annualized yield of 91-day T-Bills (from RBI)
- **Formula**: `Market Premium = Rm - Rf`

#### 2. **SMB (Small Minus Big)** - Size Factor
- **Sort**: Median market cap (50th percentile)
- **Portfolios**: 
  - Small: All stocks below median
  - Big: All stocks above median
- **Formula**: `SMB = Average(Small portfolios) - Average(Big portfolios)`

#### 3. **HML (High Minus Low)** - Value Factor
- **Sort**: Book-to-Market ratio (30th and 70th percentiles)
- **Portfolios**: 
  - Low B/M (Growth): Bottom 30%
  - Medium B/M: Middle 40%
  - High B/M (Value): Top 30%
- **Double Sort**: 2 Size × 3 Value = 6 portfolios
  - Small/Low, Small/Medium, Small/High
  - Big/Low, Big/Medium, Big/High
- **Formula**: `HML = Average(High B/M) - Average(Low B/M)`
- **Fallback**: If Large-Cap Value absent, use `HML = Small/High - Small/Low`

#### 4. **WML (Winners Minus Losers)** - Momentum Factor
- **Sort**: Past 12-month return (excluding most recent month, 30th and 70th percentiles)
- **Portfolios**:
  - Losers: Bottom 30%
  - Winners: Top 30%
- **Double Sort**: 2 Size × 2 Momentum = 4 portfolios
  - Small/Loser, Small/Winner
  - Big/Loser, Big/Winner
- **Formula**: `WML = Average(Winners) - Average(Losers)`
- **Rebalancing**: Monthly

### Survivorship Bias Correction
- **Period**: Only for mid-1990s "vanishing companies" episode
- **Post-1995**: No correction needed (regulatory reforms eliminated issue)
- **Recommendation**: Use survivorship-bias adjusted files for historical analysis

### Return Computation
- **Daily Returns**: Compounded to monthly/yearly
- **Weighting**: Value-weighted (by market cap) within each portfolio
- **Holding Period**: Returns expressed as HPR (Holding Period Return)

---

## 2. Our Data Availability Assessment

### ✅ **What We Have**
From `@/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/schema.sql:1-318`:

1. **`assets` table**: 
   - ✅ `nse_symbol`, `bse_code`, `isin`
   - ✅ `asset_class`, `sector`, `industry`
   - ✅ `listing_date`, `delisting_date`, `is_active`
   - ✅ `nse_listed`, `bse_listed`

2. **`daily_prices` table**:
   - ✅ `date`, `open`, `high`, `low`, `close`, `adj_close`
   - ✅ `volume`, `trades`
   - ✅ `source_exchange` (NSE/BSE)

3. **`corporate_actions` table**:
   - ✅ `action_type` (DIVIDEND, SPLIT, BONUS, etc.)
   - ✅ `ex_date`, `dividend_amount`
   - ✅ `adjustment_factor`

4. **`fundamentals` table**:
   - ✅ `period_end_date`, `is_consolidated`
   - ✅ `total_equity`, `shares_outstanding`
   - ❌ **Missing**: Book value per share (can compute from equity/shares)

5. **`screener_balance_sheet` table**:
   - ✅ `share_capital`, `reserves`
   - ✅ `total_assets`, `total_liabilities`

### ❌ **What We're Missing**

1. **Market Capitalization History**
   - IIMA has daily market cap from Prowess
   - We need to compute: `market_cap = close_price × shares_outstanding`
   - **Challenge**: `shares_outstanding` changes with splits/bonuses
   - **Solution**: Track shares outstanding over time, adjust for corporate actions

2. **Book-to-Market Ratio**
   - Need: Book value per share / Market price
   - **Book Value**: `(equity_capital + reserves) / shares_outstanding`
   - **Market Price**: From `daily_prices.close`
   - **Frequency**: Annual rebalancing, so need year-end values

3. **Total Returns (Price + Dividends)**
   - IIMA uses Prowess DX's total return field
   - We need to compute: `total_return = (P1 - P0 + Div) / P0`
   - **Challenge**: Dividend timing (ex-date vs payment date)
   - **Solution**: Use `adj_close` which already adjusts for dividends/splits

4. **91-day T-Bill Yields (Risk-free Rate)**
   - Source: RBI website
   - **URL**: https://www.rbi.org.in/Scripts/BS_ViewMasRates.aspx
   - **Frequency**: Weekly auctions
   - **Storage**: New table `rbi_tbill_yields`

5. **Liquidity Metrics**
   - IIMA picks NSE vs BSE based on "greater aggregate liquidity"
   - **Proxy**: Use `volume × close` as liquidity measure
   - **Rule**: For dual-listed stocks, pick exchange with higher avg daily turnover

---

## 3. Database Schema Extensions

```sql
-- ─── MARKET CAPITALIZATION HISTORY ─────────────────────────────
CREATE TABLE IF NOT EXISTS daily_market_cap (
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  shares_outstanding INTEGER NOT NULL,
  close_price REAL NOT NULL,
  market_cap REAL NOT NULL,  -- close_price × shares_outstanding
  source TEXT,  -- 'COMPUTED' or 'SCREENER'
  PRIMARY KEY (asset_id, date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_daily_market_cap_date ON daily_market_cap(date);

-- ─── BOOK VALUE HISTORY ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS annual_book_value (
  asset_id TEXT NOT NULL,
  fiscal_year_end TEXT NOT NULL,  -- e.g. '2023-03-31'
  book_value_per_share REAL NOT NULL,
  total_equity REAL,
  shares_outstanding INTEGER,
  source TEXT,  -- 'SCREENER' or 'FUNDAMENTALS'
  PRIMARY KEY (asset_id, fiscal_year_end),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- ─── RISK-FREE RATE (91-DAY T-BILLS) ────────────────────────────
CREATE TABLE IF NOT EXISTS rbi_tbill_yields (
  auction_date TEXT PRIMARY KEY,
  maturity_days INTEGER DEFAULT 91,
  yield_pct REAL NOT NULL,  -- Annualized yield
  cutoff_price REAL,
  source_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ─── FACTOR PORTFOLIOS & BREAKPOINTS ────────────────────────────
CREATE TABLE IF NOT EXISTS ff_breakpoints (
  rebalance_date TEXT NOT NULL,  -- e.g. '2023-10-01' (start of fiscal year)
  breakpoint_type TEXT NOT NULL CHECK(breakpoint_type IN ('SIZE', 'VALUE', 'MOMENTUM')),
  percentile INTEGER NOT NULL,  -- 30, 50, 70
  value REAL NOT NULL,  -- The actual breakpoint value
  num_stocks_below INTEGER,
  num_stocks_above INTEGER,
  PRIMARY KEY (rebalance_date, breakpoint_type, percentile)
);

CREATE TABLE IF NOT EXISTS ff_portfolio_constituents (
  portfolio_id TEXT NOT NULL,  -- e.g. 'SMALL_VALUE', 'BIG_LOSER'
  rebalance_date TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  weight REAL NOT NULL,  -- Value-weighted
  market_cap REAL,
  book_to_market REAL,
  past_12m_return REAL,
  PRIMARY KEY (portfolio_id, rebalance_date, asset_id),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS ff_factor_returns (
  date TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK(frequency IN ('DAILY', 'MONTHLY', 'YEARLY')),
  market_return REAL,  -- Rm
  rf_rate REAL,  -- Risk-free rate
  market_premium REAL,  -- Rm - Rf
  smb REAL,  -- Size factor
  hml REAL,  -- Value factor
  wml REAL,  -- Momentum factor
  num_stocks INTEGER,  -- Universe size
  source TEXT DEFAULT 'COMPUTED',  -- 'COMPUTED' or 'IIMA' (for validation)
  PRIMARY KEY (date, frequency)
);
CREATE INDEX IF NOT EXISTS idx_ff_returns_date ON ff_factor_returns(date DESC);

-- ─── VALIDATION & COMPARISON ────────────────────────────────────
CREATE TABLE IF NOT EXISTS ff_validation (
  date TEXT NOT NULL,
  factor TEXT NOT NULL CHECK(factor IN ('MARKET', 'SMB', 'HML', 'WML')),
  our_value REAL,
  iima_value REAL,
  deviation_pct REAL,  -- (our - iima) / iima * 100
  correlation REAL,  -- Rolling 12-month correlation
  notes TEXT,
  PRIMARY KEY (date, factor)
);
```

---

## 4. Implementation Algorithm

### Phase 1: Data Preparation (One-time)

```python
# File: data-pipeline/pipelines/ff_data_prep.py

def prepare_market_cap_history():
    """
    Compute daily market cap for all stocks.
    
    Steps:
    1. Get shares_outstanding from fundamentals (quarterly)
    2. Forward-fill between quarters
    3. Adjust for splits/bonuses using corporate_actions
    4. Multiply by daily close price
    """
    pass

def prepare_book_value_history():
    """
    Compute annual book value per share.
    
    Steps:
    1. Get year-end (March 31) balance sheet data
    2. Book Value = (equity_capital + reserves) / shares_outstanding
    3. Store in annual_book_value table
    """
    pass

def fetch_rbi_tbill_yields():
    """
    Scrape 91-day T-Bill yields from RBI website.
    
    URL: https://www.rbi.org.in/Scripts/BS_ViewMasRates.aspx
    Frequency: Weekly
    Storage: rbi_tbill_yields table
    """
    pass

def apply_stock_filters(date):
    """
    Apply IIMA filters for a given rebalancing date.
    
    Filters:
    1. Micro-cap: market_cap >= 0.1 × median(market_cap)
    2. Penny stock: median_price >= ₹1.00
    3. Active: is_active = 1, has price data
    
    Returns: List of eligible asset_ids
    """
    pass
```

### Phase 2: Factor Computation (Monthly)

```python
# File: data-pipeline/pipelines/ff_factor_computation.py

def compute_size_breakpoint(eligible_stocks, date):
    """
    Compute median market cap (50th percentile).
    
    Returns: {
        'percentile': 50,
        'value': median_market_cap,
        'num_below': count,
        'num_above': count
    }
    """
    pass

def compute_value_breakpoints(eligible_stocks, date):
    """
    Compute B/M ratio breakpoints (30th, 70th percentiles).
    
    Steps:
    1. Get latest fiscal year-end book value
    2. Get current market cap
    3. Compute B/M = book_value / market_cap
    4. Calculate 30th and 70th percentiles
    
    Returns: [
        {'percentile': 30, 'value': p30},
        {'percentile': 70, 'value': p70}
    ]
    """
    pass

def compute_momentum_breakpoints(eligible_stocks, date):
    """
    Compute past 12-month return breakpoints (30th, 70th).
    
    Steps:
    1. Get returns from (date - 13 months) to (date - 1 month)
    2. Exclude most recent month (as per Fama-French)
    3. Calculate 30th and 70th percentiles
    
    Returns: [
        {'percentile': 30, 'value': p30},
        {'percentile': 70, 'value': p70}
    ]
    """
    pass

def assign_stocks_to_portfolios(eligible_stocks, breakpoints, date):
    """
    Assign stocks to 6 Size-Value + 4 Size-Momentum portfolios.
    
    Size-Value Portfolios:
    - SMALL_LOW, SMALL_MEDIUM, SMALL_HIGH
    - BIG_LOW, BIG_MEDIUM, BIG_HIGH
    
    Size-Momentum Portfolios:
    - SMALL_LOSER, SMALL_WINNER
    - BIG_LOSER, BIG_WINNER
    
    Weighting: Value-weighted by market cap
    
    Returns: Dict[portfolio_id, List[{asset_id, weight}]]
    """
    pass

def compute_portfolio_returns(portfolio_constituents, start_date, end_date):
    """
    Compute value-weighted portfolio returns.
    
    Formula: R_portfolio = Σ(w_i × R_i)
    where w_i = market_cap_i / Σ(market_cap)
    
    Returns: Dict[portfolio_id, return]
    """
    pass

def compute_factor_returns(portfolio_returns, rf_rate):
    """
    Compute the 4 factors.
    
    Market Premium:
      Rm = value-weighted return of all stocks
      Market Premium = Rm - Rf
    
    SMB:
      Small = avg(SMALL_LOW, SMALL_MEDIUM, SMALL_HIGH, SMALL_LOSER, SMALL_WINNER)
      Big = avg(BIG_LOW, BIG_MEDIUM, BIG_HIGH, BIG_LOSER, BIG_WINNER)
      SMB = Small - Big
    
    HML:
      High = avg(SMALL_HIGH, BIG_HIGH)
      Low = avg(SMALL_LOW, BIG_LOW)
      HML = High - Low
      
      # Fallback if BIG_HIGH has <5 stocks:
      HML = SMALL_HIGH - SMALL_LOW
    
    WML:
      Winners = avg(SMALL_WINNER, BIG_WINNER)
      Losers = avg(SMALL_LOSER, BIG_LOSER)
      WML = Winners - Losers
    
    Returns: {
        'market_return': Rm,
        'rf_rate': Rf,
        'market_premium': Rm - Rf,
        'smb': SMB,
        'hml': HML,
        'wml': WML
    }
    """
    pass
```

### Phase 3: Validation

```python
# File: data-pipeline/pipelines/ff_validation.py

def download_iima_factors():
    """
    Download IIMA's published factor returns for validation.
    
    URLs:
    - Daily: https://faculty.iima.ac.in/iffm/.../Daily_SurvivorshipBiasAdjusted.csv
    - Monthly: https://faculty.iima.ac.in/iffm/.../Monthly_SurvivorshipBiasAdjusted.csv
    
    Store in ff_factor_returns with source='IIMA'
    """
    pass

def validate_factors(start_date, end_date):
    """
    Compare our computed factors vs IIMA's published factors.
    
    Metrics:
    1. Correlation (should be >0.90 for good match)
    2. Mean Absolute Deviation
    3. Root Mean Square Error
    
    Store in ff_validation table
    """
    pass

def plot_factor_comparison():
    """
    Generate plots comparing our factors vs IIMA's.
    
    Plots:
    1. Time series overlay (our vs IIMA)
    2. Scatter plot (our vs IIMA)
    3. Rolling correlation
    4. Deviation histogram
    """
    pass
```

---

## 5. Expected Challenges & Solutions

### Challenge 1: Data Source Differences
**Issue**: IIMA uses CMIE Prowess (₹2-3L/year subscription), we use free NSE/BSE data.

**Impact**:
- Prowess has cleaner, more comprehensive fundamental data
- Prowess total returns field vs our computed returns
- Prowess has better corporate action handling

**Mitigation**:
- Use `adj_close` from NSE/BSE (already dividend-adjusted)
- Validate against IIMA's published factors
- Accept 5-10% correlation difference as reasonable

### Challenge 2: Shares Outstanding Tracking
**Issue**: Shares outstanding changes with splits, bonuses, buybacks.

**Solution**:
1. Start with latest `shares_outstanding` from fundamentals
2. Walk backwards through corporate_actions:
   - SPLIT: `shares_old = shares_new / split_ratio`
   - BONUS: `shares_old = shares_new / (1 + bonus_ratio)`
   - BUYBACK: `shares_old = shares_new + buyback_shares`
3. Forward-fill between quarterly updates

### Challenge 3: Book Value Timing
**Issue**: IIMA uses fiscal year-end (March 31) book values, rebalances in October.

**Solution**:
- For Oct 2023 rebalancing, use March 2023 book value
- 6-month lag ensures data availability
- Store in `annual_book_value` table with `fiscal_year_end` key

### Challenge 4: Liquidity-Based Exchange Selection
**Issue**: For dual-listed stocks, IIMA picks exchange with higher liquidity.

**Solution**:
```python
def select_primary_exchange(asset_id, date):
    """
    Pick NSE or BSE based on 30-day avg daily turnover.
    
    Turnover = volume × close_price
    """
    nse_turnover = get_avg_turnover(asset_id, 'NSE', date, days=30)
    bse_turnover = get_avg_turnover(asset_id, 'BSE', date, days=30)
    return 'NSE' if nse_turnover > bse_turnover else 'BSE'
```

### Challenge 5: Minimum Portfolio Size
**Issue**: Large-Cap Value portfolio may have <5 stocks.

**Solution**:
```python
if len(BIG_HIGH_portfolio) < 5:
    # Use alternative HML computation
    HML = SMALL_HIGH_return - SMALL_LOW_return
    logging.warning(f"BIG_HIGH portfolio has <5 stocks on {date}, using fallback HML")
```

---

## 6. Validation Strategy

### Step 1: Download IIMA Baseline (Last 3 Years)
```python
# Download 2021-2024 daily/monthly factors from IIMA
# Store in ff_factor_returns with source='IIMA'
```

### Step 2: Compute Our Factors (Same Period)
```python
# Run our algorithm for 2021-2024
# Store in ff_factor_returns with source='COMPUTED'
```

### Step 3: Statistical Comparison
```python
def validate_factor(factor_name, start_date, end_date):
    """
    Compare our factor vs IIMA's.
    
    Metrics:
    1. Correlation (target: >0.85)
    2. Mean Absolute Error (target: <2%)
    3. RMSE (target: <3%)
    4. Sign agreement (target: >80% of days same sign)
    """
    our_values = get_factor_values('COMPUTED', factor_name, start_date, end_date)
    iima_values = get_factor_values('IIMA', factor_name, start_date, end_date)
    
    correlation = np.corrcoef(our_values, iima_values)[0, 1]
    mae = np.mean(np.abs(our_values - iima_values))
    rmse = np.sqrt(np.mean((our_values - iima_values)**2))
    sign_agreement = np.mean(np.sign(our_values) == np.sign(iima_values))
    
    print(f"{factor_name} Validation:")
    print(f"  Correlation: {correlation:.4f}")
    print(f"  MAE: {mae:.4f}")
    print(f"  RMSE: {rmse:.4f}")
    print(f"  Sign Agreement: {sign_agreement:.2%}")
    
    return {
        'correlation': correlation,
        'mae': mae,
        'rmse': rmse,
        'sign_agreement': sign_agreement
    }
```

### Step 4: Identify Divergence Sources
```python
# For days with large deviations, investigate:
# 1. Which stocks are in IIMA's universe but not ours?
# 2. Which stocks have different returns (data quality)?
# 3. Are breakpoints similar?
# 4. Are portfolio weights similar?
```

### Step 5: Iterative Refinement
```python
# Adjust our methodology to minimize deviation:
# 1. Fine-tune stock filters
# 2. Improve corporate action handling
# 3. Better liquidity measurement
# 4. More accurate book value computation
```

---

## 7. Implementation Timeline

### Week 1: Data Preparation
- [ ] Create new database tables
- [ ] Implement market cap history computation
- [ ] Implement book value history computation
- [ ] Scrape RBI T-Bill yields (2021-2024)
- [ ] Download IIMA factor data for validation

### Week 2: Core Algorithm
- [ ] Implement stock filtering logic
- [ ] Implement breakpoint computation
- [ ] Implement portfolio assignment
- [ ] Implement portfolio return calculation
- [ ] Implement factor return calculation

### Week 3: Validation & Refinement
- [ ] Run algorithm for 2021-2024
- [ ] Compare vs IIMA factors
- [ ] Identify and fix major deviations
- [ ] Document methodology differences
- [ ] Create validation report

### Week 4: Automation & Production
- [ ] Create daily/monthly pipeline jobs
- [ ] Add monitoring and alerts
- [ ] Create API endpoints for factor data
- [ ] Update frontend to display factors
- [ ] Write documentation

---

## 8. Success Criteria

### Minimum Viable (MVP)
- ✅ Correlation with IIMA factors: **>0.80** for all 4 factors
- ✅ Mean Absolute Error: **<5%** for daily returns
- ✅ Sign agreement: **>75%** (same direction as IIMA)
- ✅ Automated monthly computation

### Target (Production-Ready)
- ✅ Correlation with IIMA factors: **>0.90** for all 4 factors
- ✅ Mean Absolute Error: **<2%** for daily returns
- ✅ Sign agreement: **>85%**
- ✅ Automated daily computation
- ✅ Real-time factor exposure for all stocks
- ✅ Factor-based screener and portfolio tools

### Stretch (Research-Grade)
- ✅ Correlation with IIMA factors: **>0.95**
- ✅ Mean Absolute Error: **<1%**
- ✅ Sign agreement: **>90%**
- ✅ Published methodology paper
- ✅ Open-source factor library for Indian market

---

## 9. Cost-Benefit Analysis

### Costs
1. **Development Time**: 4 weeks (1 developer)
2. **Data Storage**: ~50MB for 3 years of factor data (negligible)
3. **Compute**: Daily pipeline ~5 minutes (negligible)
4. **Maintenance**: ~2 hours/month for monitoring

### Benefits
1. **Real-time Factors**: IIMA data is 2-3 months delayed, ours will be daily
2. **Stock-Level Analysis**: Compute factor exposures for individual stocks
3. **Custom Portfolios**: Build factor-tilted portfolios
4. **Research Tools**: Backtest factor strategies
5. **Competitive Advantage**: No other Indian retail platform offers this
6. **User Engagement**: Advanced users will love factor-based tools

### ROI
- **Development Cost**: ₹2L (4 weeks × ₹50K/week)
- **CMIE Prowess Cost**: ₹2-3L/year (avoided)
- **User Value**: Priceless for quant-oriented investors
- **Payback**: Immediate (avoid Prowess subscription)

---

## 10. Next Steps

1. **Approve this plan** and allocate development time
2. **Download IIMA data** for 2021-2024 (validation baseline)
3. **Extend database schema** with new tables
4. **Implement Phase 1** (data preparation)
5. **Implement Phase 2** (factor computation)
6. **Validate** against IIMA data
7. **Iterate** to improve correlation
8. **Deploy** to production
9. **Build UI** for factor analysis tools
10. **Document** and share with community

---

## 11. References

1. IIMA Data Library: https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/
2. Working Paper: https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/four-factors-India-90s-onwards-IIM-WP-Version.pdf
3. FAQ: https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/FAQ.php
4. Fama & French (1993): "Common risk factors in the returns on stocks and bonds"
5. Carhart (1997): "On Persistence in Mutual Fund Performance"

---

**Author**: Artha Development Team  
**Date**: March 4, 2026  
**Status**: Proposed  
**Version**: 1.0
