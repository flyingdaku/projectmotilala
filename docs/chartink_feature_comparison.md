# Chartink vs Artha Screener - Feature Comparison & Roadmap

## Current Status (Feb 2026)

### ✅ What We Have

#### Core DSL Features
- **Technical Indicators**: RSI, EMA, SMA, MACD, Bollinger Bands, ADX, ATR, Stochastic, CCI, Williams %R, Parabolic SAR, Ichimoku, Supertrend
- **Crossover Detection**: `ca` (crossed above), `cb` (crossed below), `tocha`, `tochb`
- **Trend Detection**: `trend_up N`, `trend_dn N`, `new_high N`, `new_low N`
- **Logical Operators**: `and`, `or`, `!` (not)
- **Comparison Operators**: `>`, `<`, `>=`, `<=`, `=`
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`
- **Scoring System**: Weighted conditions with `>=` threshold
- **Universe Filters**: `index()`, `sector()`, `type()`, `ticker()`
- **Sorting**: `sortby(expr, asc|desc)`
- **Conditionals**: `iff(condition, true_val, false_val)`
- **Volume Indicators**: Rising volume, volume spikes
- **Fundamental Filters**: P/E, P/B, Market Cap, ROE, ROCE, Debt/Equity, etc.

#### UI Features
- **Visual Builder**: 5-column layout (Rules | Category | Indicator | Condition | Value)
- **Formula Mode**: Direct DSL text input with syntax validation
- **Rules Panel**: 
  - List view with checkboxes to enable/disable rules
  - Formula view showing DSL expressions
  - Inline editing capability
  - Drag-to-reorder (planned)
- **Parameter Inputs**: Inline spinners for indicator parameters
- **Smart RHS Column**: Conditionally shows number input or indicator picker based on operator
- **DSL Preview**: Live formula preview as you build
- **Saved Screens**: Save and load custom screeners

---

## 🔍 Chartink Feature Analysis

### What Chartink Offers (Based on Research)

#### 1. **Multi-Timeframe Support** ⚠️ **MISSING**
- Weekly, Monthly timeframes in addition to Daily
- Example: `weekly( ema(30) > ema(40) )`
- Syntax: `weekly()`, `monthly()` wrapper functions

#### 2. **Historical Lookback** ⚠️ **PARTIAL**
- Access historical values: `close 1 day ago`, `rsi(14) 5 days ago`
- We have: `trend_up N`, `new_high N` (limited lookback)
- Missing: Arbitrary historical value access

#### 3. **Pattern Recognition** ⚠️ **MISSING**
- Candlestick patterns: Doji, Hammer, Engulfing, etc.
- Chart patterns: Head & Shoulders, Double Top/Bottom
- Syntax: `pattern(doji)`, `pattern(bullish_engulfing)`

#### 4. **Advanced Volume Analysis** ⚠️ **PARTIAL**
- Volume moving averages
- Volume breakouts
- Unusual volume detection
- We have: Basic volume indicators, need more sophisticated analysis

#### 5. **Price Action Indicators** ⚠️ **PARTIAL**
- Support/Resistance levels
- Pivot points (Classic, Fibonacci, Camarilla)
- Price channels
- We have: Basic price comparisons, missing S/R detection

#### 6. **Volatility Indicators** ✅ **HAVE**
- ATR (Average True Range) ✅
- Bollinger Bands ✅
- Standard Deviation ⚠️ (not exposed)
- Historical Volatility ⚠️ **MISSING**

#### 7. **Market Breadth** ⚠️ **MISSING**
- Advance/Decline ratio
- New Highs/Lows ratio
- Sector performance comparison
- Market-wide statistics

#### 8. **Backtesting** ⚠️ **MISSING**
- Test conditions on historical data
- Performance metrics
- Win rate, drawdown, etc.

#### 9. **Alerts & Notifications** ⚠️ **MISSING**
- Real-time alerts when conditions are met
- Email/SMS/Push notifications
- Scheduled scans

#### 10. **Pre-built Scan Templates** ⚠️ **PARTIAL**
- Popular strategies (Breakouts, Reversals, Momentum)
- We have: Saved screens, but need curated templates

---

## 🎯 Priority Roadmap

### Phase 1: Critical Missing Features (Q1 2026)

#### 1.1 Multi-Timeframe Support
**Implementation:**
```typescript
// DSL syntax
weekly( ema(30) > ema(40) )
monthly( rsi(14) < 30 )

// Database: Add weekly/monthly aggregated tables
CREATE TABLE daily_prices_weekly AS 
  SELECT asset_id, 
         date(date, 'weekday 0', '-6 days') as week_start,
         first_value(open) OVER w as open,
         max(high) OVER w as high,
         min(low) OVER w as low,
         last_value(close) OVER w as close,
         sum(volume) OVER w as volume
  FROM daily_prices
  WINDOW w AS (PARTITION BY asset_id, week_start);
```

**Effort:** 2-3 weeks
- Parser: Add `weekly()`, `monthly()` function nodes
- Codegen: Generate queries against aggregated tables
- Pipeline: Create weekly/monthly aggregation jobs
- UI: Add timeframe selector to builder

#### 1.2 Historical Lookback
**Implementation:**
```typescript
// DSL syntax
close 1 day ago
rsi(14) 5 days ago
ema(50) 1 week ago

// SQL: Use LAG() window function
LAG(close, 1) OVER (PARTITION BY asset_id ORDER BY date)
LAG(rsi_14, 5) OVER (PARTITION BY asset_id ORDER BY date)
```

**Effort:** 1-2 weeks
- Parser: Add `N days ago` / `N weeks ago` suffix
- Codegen: Generate LAG() expressions
- UI: Add "days ago" input to builder

#### 1.3 Candlestick Pattern Recognition
**Implementation:**
```python
# Pipeline: compute_patterns.py
def detect_doji(open, high, low, close):
    body = abs(close - open)
    range = high - low
    return body / range < 0.1 if range > 0 else False

def detect_hammer(open, high, low, close):
    body = abs(close - open)
    lower_shadow = min(open, close) - low
    upper_shadow = high - max(open, close)
    return (lower_shadow > 2 * body and 
            upper_shadow < body * 0.1)

# Store in computed_ratios table
ALTER TABLE computed_ratios ADD COLUMN pattern_doji BOOLEAN;
ALTER TABLE computed_ratios ADD COLUMN pattern_hammer BOOLEAN;
ALTER TABLE computed_ratios ADD COLUMN pattern_engulfing BOOLEAN;
```

**Effort:** 2-3 weeks
- Pipeline: Implement 10-15 common patterns
- DSL: Add `pattern(name)` function
- UI: Add "Patterns" category to builder

### Phase 2: Enhanced Analysis (Q2 2026)

#### 2.1 Support/Resistance Detection
**Implementation:**
```python
# Algorithm: Pivot point detection
def find_support_resistance(prices, window=20):
    pivots = []
    for i in range(window, len(prices) - window):
        if all(prices[i] <= prices[i-j] for j in range(1, window+1)) and \
           all(prices[i] <= prices[i+j] for j in range(1, window+1)):
            pivots.append(('support', prices[i]))
        elif all(prices[i] >= prices[i-j] for j in range(1, window+1)) and \
             all(prices[i] >= prices[i+j] for j in range(1, window+1)):
            pivots.append(('resistance', prices[i]))
    return pivots
```

**Effort:** 2 weeks

#### 2.2 Market Breadth Indicators
**Implementation:**
```sql
-- Advance/Decline ratio for Nifty 50
WITH nifty_stocks AS (
  SELECT asset_id FROM index_constituents 
  WHERE index_name = 'NIFTY50'
),
daily_changes AS (
  SELECT date,
         SUM(CASE WHEN close > prev_close THEN 1 ELSE 0 END) as advances,
         SUM(CASE WHEN close < prev_close THEN 1 ELSE 0 END) as declines
  FROM daily_prices
  WHERE asset_id IN (SELECT asset_id FROM nifty_stocks)
  GROUP BY date
)
SELECT date, 
       advances * 1.0 / NULLIF(declines, 0) as ad_ratio
FROM daily_changes;
```

**Effort:** 1-2 weeks

#### 2.3 Alerts & Notifications
**Implementation:**
- Backend: Cron job to run saved screens every 15 minutes
- Database: `alerts` table to store user alert configurations
- Notification service: Email (SendGrid), Push (Firebase)
- UI: Alert management panel

**Effort:** 3-4 weeks

### Phase 3: Advanced Features (Q3 2026)

#### 3.1 Backtesting Engine
**Implementation:**
- Simulate historical trades based on conditions
- Calculate metrics: Win rate, Sharpe ratio, max drawdown
- Generate equity curve charts
- Compare strategies

**Effort:** 4-6 weeks

#### 3.2 AI-Powered Scan Suggestions
**Implementation:**
- Analyze user's saved screens
- Suggest similar/complementary conditions
- Auto-generate scans based on market regime

**Effort:** 3-4 weeks

---

## 🎨 UI/UX Improvements

### Immediate (This Week)
1. ✅ Increase Rules pane to w-96
2. ✅ Compact builder columns (w-32, w-44, w-36, flex-1)
3. ✅ Add List/Formula tabs to Rules panel
4. ✅ Inline editing for rules
5. ⏳ Add drag-to-reorder rules
6. ⏳ Add "Duplicate Rule" button
7. ⏳ Add "Edit in Formula Mode" for individual rules

### Short-term (Next 2 Weeks)
1. **Quick Filters Bar**: Common filters at top (Market Cap, Sector, Volume)
2. **Indicator Search**: Search box in Indicator column
3. **Keyboard Shortcuts**: 
   - `Cmd+Enter` to add rule
   - `Cmd+K` to focus search
   - `Cmd+/` to toggle Formula mode
4. **Rule Groups**: Organize rules into collapsible groups (Entry, Exit, Filters)
5. **Color Coding**: Visual distinction for different rule types
6. **Condition Templates**: Pre-filled common conditions (Breakout, Reversal, etc.)

### Medium-term (Next Month)
1. **Visual Chart Preview**: Mini chart showing where condition would trigger
2. **Results Preview**: Show count of matching stocks as you build
3. **Performance Hints**: Suggest optimizations for slow queries
4. **Export Options**: CSV, Excel, PDF reports
5. **Comparison Mode**: Compare multiple saved screens side-by-side

---

## 📊 Technical Debt & Infrastructure

### Database Optimizations
1. **Indexes**: Add composite indexes for common query patterns
2. **Materialized Views**: Pre-compute expensive aggregations
3. **Partitioning**: Partition `daily_prices` by date for faster queries
4. **Caching**: Redis cache for frequently accessed data

### Pipeline Enhancements
1. **Real-time Updates**: WebSocket for live price updates
2. **Incremental Computation**: Only recompute changed indicators
3. **Distributed Processing**: Scale to handle more indicators/stocks
4. **Data Quality Monitoring**: Automated checks for missing/corrupt data

---

## 🎯 Success Metrics

### User Engagement
- **Target**: 100 saved screens per active user
- **Target**: 50% of users create custom formulas
- **Target**: 30% daily active user rate

### Performance
- **Target**: < 2s query execution for 90% of scans
- **Target**: < 500ms UI response time
- **Target**: 99.9% uptime for scanner service

### Feature Adoption
- **Target**: 80% of users use visual builder
- **Target**: 40% of users use formula mode
- **Target**: 60% of users set up alerts

---

## 📝 Notes

### Chartink Strengths to Emulate
1. **Simplicity**: Very intuitive visual builder
2. **Power**: Deep technical analysis capabilities
3. **Speed**: Fast query execution
4. **Community**: Shared scans and templates

### Our Competitive Advantages
1. **Modern UI**: Shadcn components, better aesthetics
2. **Fundamentals**: Deeper fundamental analysis
3. **Data Quality**: Clean, verified Indian market data
4. **Integration**: Seamless with portfolio tracking (future)
5. **Mobile-First**: React Native apps (planned)

### Key Differentiators to Build
1. **AI Insights**: ML-powered pattern detection
2. **Portfolio Integration**: Scan your holdings
3. **Social Features**: Follow top traders' scans
4. **Education**: Interactive tutorials and explanations
5. **Multi-Asset**: Stocks, ETFs, Mutual Funds, Crypto (future)

---

**Last Updated**: Feb 27, 2026
**Next Review**: Mar 15, 2026
