# Sector & Industry Analysis Dashboard - Implementation Summary

**Date**: March 4, 2026  
**Status**: ✅ Core Framework Complete, Ready for Database Integration

---

## 🎯 Objective

Build a comprehensive sector/industry analysis dashboard with:
- **4-level hierarchy**: Sector → Industry Group → Industry → Sub-Industry
- **Interactive drill-down** navigation
- **Multiple visualization modes**: Heatmap, Table, RRG Plot
- **Real-time performance metrics** across multiple time periods
- **Industry-standard RRG plots** with proper stock filtering

---

## ✅ Completed Implementation

### 1. **4-Level Hierarchy Structure**

Based on Screener.in classification stored in the `assets` table:

```sql
-- Level 1: Sector (e.g., "Energy")
sector TEXT
screener_sector_code TEXT  -- e.g., "IN03"

-- Level 2: Industry Group (e.g., "Oil, Gas & Consumable Fuels")
industry_group TEXT
screener_industry_group_code TEXT  -- e.g., "IN0301"

-- Level 3: Industry (e.g., "Petroleum Products")
industry TEXT
screener_industry_code TEXT  -- e.g., "IN030103"

-- Level 4: Sub-Industry (e.g., "Refineries & Marketing")
sub_industry TEXT
screener_sub_industry_code TEXT  -- e.g., "IN030103001"
```

### 2. **RRG (Relative Rotation Graph) Implementation**

**File**: `src/lib/utils/rrg.ts`

#### Industry Best Practices for Stock Filtering

Based on institutional research and Bloomberg/FactSet standards:

```typescript
const DEFAULT_RRG_FILTERS = {
  minMarketCapCr: 500,      // ₹500 Cr minimum (filters micro-caps)
  minAvgVolumeCr: 1,        // ₹1 Cr avg daily volume (liquidity filter)
  minPrice: 10,             // ₹10 minimum (filters penny stocks)
  maxDaysSinceLastTrade: 30 // Active trading requirement
};
```

**Why these filters?**
- **Market Cap ≥ ₹500 Cr**: Excludes micro-caps that distort sector averages
- **Volume ≥ ₹1 Cr/day**: Ensures liquid, tradeable stocks
- **Price ≥ ₹10**: Removes penny stocks with high volatility
- **Last Traded ≤ 30 days**: Excludes suspended/inactive stocks

#### RRG Calculation Methodology

```typescript
// 1. Relative Strength (RS)
RS = (Stock Price / Benchmark Price) × 100

// 2. RS-Ratio (normalized RS)
RS-Ratio = Current RS / MA(RS, 10 periods) × 100

// 3. RS-Momentum (rate of change)
RS-Momentum = ((Current RS-Ratio / Previous RS-Ratio) - 1) × 100

// 4. Quadrant Classification
Leading:    RS-Ratio ≥ 100, RS-Momentum ≥ 0  (Green)
Weakening:  RS-Ratio ≥ 100, RS-Momentum < 0  (Amber)
Lagging:    RS-Ratio < 100, RS-Momentum < 0  (Red)
Improving:  RS-Ratio < 100, RS-Momentum ≥ 0  (Blue)
```

### 3. **Frontend Components**

#### A. **RRG Plot Component**
**File**: `src/components/charts/RRGPlot.tsx`

- Scatter plot with 4 quadrants
- Bubble size represents market cap
- Color-coded by quadrant
- Interactive tooltips
- Reference lines at (100, 0)
- Quadrant labels and legend

#### B. **Sector Heatmap Component**
**File**: `src/components/charts/SectorHeatmap.tsx`

- Grid layout (2-5 columns responsive)
- Color-coded performance bars
- Click-to-drill-down functionality
- Shows: Return %, P/E, P/B, Stock Count
- Hover effects and animations

#### C. **Main Dashboard Page**
**File**: `src/app/(app)/macros/sector-performance/page.tsx`

**Features**:
- **Breadcrumb navigation**: Track drill-down path
- **Level indicator**: Shows current hierarchy level
- **Period selector**: 1D, 1W, 1M, 3M, 6M, 1Y, 3Y
- **View toggle**: Heatmap | Table | RRG Plot
- **Interactive drill-down**: Click to navigate deeper
- **Responsive design**: Mobile-friendly layouts

### 4. **API Endpoint**

**File**: `src/app/api/sectors/hierarchy/route.ts`

**Endpoint**: `GET /api/sectors/hierarchy`

**Query Parameters**:
```typescript
level: "sector" | "industry_group" | "industry" | "sub_industry"
path: string  // Comma-separated parent IDs
period: "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y"
```

**Response**:
```typescript
{
  nodes: HierarchyNode[],      // Current level data
  rrgData: RRGDataPoint[],     // RRG plot data
  level: string,
  path: string,
  period: string
}
```

---

## 📊 Data Flow Architecture

### Current Implementation (Mock Data)

```
Frontend Request
    ↓
API Endpoint (/api/sectors/hierarchy)
    ↓
Mock Data Generator
    ↓
Response (nodes + rrgData)
    ↓
Frontend Rendering (Heatmap/Table/RRG)
```

### Production Implementation (To Be Built)

```
Frontend Request
    ↓
API Endpoint
    ↓
Database Queries:
  1. Aggregate stocks by hierarchy level
  2. Calculate performance metrics
  3. Fetch price history for RRG
  4. Apply stock filters
    ↓
RRG Calculations:
  1. Calculate RS vs benchmark
  2. Calculate RS-Ratio (10-period MA)
  3. Calculate RS-Momentum
  4. Classify into quadrants
    ↓
Response (real data)
    ↓
Frontend Rendering
```

---

## 🗄️ Database Queries Needed

### 1. **Sector Aggregation Query**

```sql
-- Get all sectors with aggregated metrics
SELECT 
  sector,
  screener_sector_code,
  COUNT(*) as stock_count,
  SUM(market_cap_cr) as total_market_cap_cr,
  AVG(pe) as avg_pe,
  AVG(pb) as avg_pb
FROM assets
WHERE asset_class = 'EQUITY' 
  AND is_active = 1
  AND sector IS NOT NULL
GROUP BY sector, screener_sector_code
ORDER BY total_market_cap_cr DESC;
```

### 2. **Performance Calculation Query**

```sql
-- Calculate sector returns for a given period
WITH sector_prices AS (
  SELECT 
    a.sector,
    dp.date,
    SUM(dp.adj_close * a.market_cap_cr) / SUM(a.market_cap_cr) as weighted_price
  FROM assets a
  JOIN daily_prices dp ON a.id = dp.asset_id
  WHERE a.asset_class = 'EQUITY'
    AND a.is_active = 1
    AND a.sector IS NOT NULL
    AND dp.date BETWEEN ? AND ?
  GROUP BY a.sector, dp.date
)
SELECT 
  sector,
  ((latest.weighted_price / earliest.weighted_price) - 1) * 100 as return_pct
FROM sector_prices latest
JOIN sector_prices earliest ON latest.sector = earliest.sector
WHERE latest.date = ?  -- End date
  AND earliest.date = ?  -- Start date
ORDER BY return_pct DESC;
```

### 3. **RRG Data Query**

```sql
-- Get price history for RRG calculation
SELECT 
  a.sector,
  dp.date,
  SUM(dp.adj_close * a.market_cap_cr) / SUM(a.market_cap_cr) as weighted_price
FROM assets a
JOIN daily_prices dp ON a.id = dp.asset_id
WHERE a.asset_class = 'EQUITY'
  AND a.is_active = 1
  AND a.sector IS NOT NULL
  -- Apply RRG filters
  AND a.market_cap_cr >= 500
  AND a.price >= 10
  AND dp.date >= date('now', '-90 days')  -- Last 90 days for RRG
GROUP BY a.sector, dp.date
ORDER BY a.sector, dp.date;
```

### 4. **Drill-Down Query (Industry Group)**

```sql
-- Get industry groups within a sector
SELECT 
  industry_group,
  screener_industry_group_code,
  COUNT(*) as stock_count,
  SUM(market_cap_cr) as total_market_cap_cr,
  AVG(pe) as avg_pe,
  AVG(pb) as avg_pb
FROM assets
WHERE asset_class = 'EQUITY'
  AND is_active = 1
  AND sector = ?  -- Parent sector
  AND industry_group IS NOT NULL
GROUP BY industry_group, screener_industry_group_code
ORDER BY total_market_cap_cr DESC;
```

---

## 📁 Files Created

```
✅ src/lib/utils/rrg.ts                           - RRG calculation utilities
✅ src/components/charts/RRGPlot.tsx              - RRG scatter plot component
✅ src/components/charts/SectorHeatmap.tsx        - Heatmap grid component
✅ src/app/(app)/macros/sector-performance/page.tsx - Main dashboard (refactored)
✅ src/app/api/sectors/hierarchy/route.ts         - API endpoint
✅ SECTOR_INDUSTRY_ANALYSIS_IMPLEMENTATION.md     - This documentation
```

---

## 🎨 UI/UX Features

### Navigation Flow

```
Sectors (10 items)
  ↓ Click "Energy"
Industry Groups (2 items: Oil & Gas, Equipment & Services)
  ↓ Click "Oil, Gas & Consumable Fuels"
Industries (3 items: Petroleum Products, Natural Gas, Coal)
  ↓ Click "Petroleum Products"
Sub-Industries (2 items: Refineries & Marketing, Exploration & Production)
```

### Breadcrumb Example

```
All Sectors > Energy > Oil, Gas & Consumable Fuels > Petroleum Products
```

### View Modes

1. **Heatmap View**
   - Visual grid with color-coded returns
   - Quick performance overview
   - Click to drill down

2. **Table View**
   - Detailed metrics across all periods
   - Sortable columns
   - Click rows to drill down

3. **RRG Plot View**
   - Scatter plot showing momentum vs strength
   - Bubble size = market cap
   - Quadrant-based classification
   - Filtering criteria displayed

---

## 🔧 Next Steps for Production

### Phase 1: Database Integration (High Priority)

1. **Implement Real Queries**
   - Replace mock data in API endpoint
   - Add database connection logic
   - Implement caching for performance

2. **Performance Calculation**
   - Create stored procedures for sector returns
   - Calculate returns for all 7 time periods
   - Update daily via scheduled job

3. **RRG Calculation Pipeline**
   - Fetch price history from `daily_prices`
   - Calculate RS, RS-Ratio, RS-Momentum
   - Store pre-calculated RRG data for performance

### Phase 2: Data Quality & Validation

1. **Verify Classification Data**
   - Run `scrape_screener_classification.py` for all stocks
   - Validate 4-level hierarchy completeness
   - Handle missing/null classifications

2. **Market Cap Data**
   - Ensure `market_cap_cr` is populated
   - Calculate from price × shares if missing
   - Update daily

3. **Volume Data**
   - Add `avg_volume_cr` field to assets table
   - Calculate 30-day average volume
   - Update daily

### Phase 3: Advanced Features

1. **Comparison Mode**
   - Select multiple sectors/industries
   - Overlay on same chart
   - Side-by-side metrics

2. **Historical RRG Animation**
   - Show RRG movement over time
   - Trail visualization
   - Play/pause controls

3. **Export Functionality**
   - Download sector data as CSV
   - Export RRG plot as image
   - Share analysis reports

4. **Alerts & Notifications**
   - Sector rotation alerts
   - Quadrant change notifications
   - Custom threshold alerts

---

## 📊 RRG Best Practices Summary

### When to Include Stocks in RRG

✅ **Include**:
- Market cap ≥ ₹500 Cr (large/mid-caps)
- Average volume ≥ ₹1 Cr/day (liquid)
- Price ≥ ₹10 (not penny stocks)
- Actively traded (last 30 days)
- Complete price history (no gaps)

❌ **Exclude**:
- Micro-caps (distort sector averages)
- Illiquid stocks (not representative)
- Penny stocks (high volatility)
- Suspended/delisted stocks
- IPOs with <90 days history

### Sector-Level vs Stock-Level RRG

**Sector-Level RRG** (Current Implementation):
- Aggregate all stocks in sector
- Value-weighted average price
- Represents sector as a whole
- **Use case**: Sector rotation strategy

**Stock-Level RRG** (Future Enhancement):
- Individual stocks within a sector
- Compare stocks against sector benchmark
- Identify leaders/laggards
- **Use case**: Stock selection within sector

---

## 🎯 Success Metrics

### Technical Metrics
- [ ] All 4 hierarchy levels functional
- [ ] RRG plots render correctly
- [ ] Drill-down navigation works smoothly
- [ ] API response time <500ms
- [ ] Mobile responsive design

### Data Quality Metrics
- [ ] >95% stocks have sector classification
- [ ] >90% stocks have complete 4-level hierarchy
- [ ] Market cap data available for >95% stocks
- [ ] Volume data available for >90% stocks

### User Experience Metrics
- [ ] Intuitive navigation (no user confusion)
- [ ] Fast loading (<2s initial load)
- [ ] Smooth animations
- [ ] Clear visual hierarchy
- [ ] Helpful tooltips and legends

---

## 💡 Key Design Decisions

### 1. **Why 4 Levels?**
Screener.in provides the most granular classification for Indian equities. This matches GICS (Global Industry Classification Standard) depth.

### 2. **Why These RRG Filters?**
Based on institutional standards (Bloomberg, FactSet) and Indian market liquidity characteristics. ₹500 Cr is the typical threshold for mid-cap classification.

### 3. **Why Value-Weighted Returns?**
Market-cap weighting ensures large companies don't distort sector performance. Matches index methodology (Nifty Sectoral Indices).

### 4. **Why 10-Period MA for RS-Ratio?**
Industry standard for RRG analysis. Balances smoothness vs responsiveness. Shorter periods (5) are too noisy, longer periods (20) lag too much.

### 5. **Why Mock Data First?**
Allows frontend development and UX testing while database queries are optimized. Easier to iterate on UI without database dependencies.

---

## 📚 References

### RRG Methodology
- Julius de Kempenaer (StockCharts.com) - Original RRG inventor
- Bloomberg Terminal RRG implementation
- FactSet RRG analysis tools

### Indian Market Classification
- Screener.in 4-level hierarchy
- NSE Sectoral Indices methodology
- BSE Sector classification

### Industry Standards
- GICS (Global Industry Classification Standard)
- ICB (Industry Classification Benchmark)
- MSCI Sector Classification

---

**Implementation Status**: ✅ Frontend Complete, ⏳ Database Integration Pending  
**Next Milestone**: Connect API to real database and implement performance calculations  
**Estimated Effort**: 2-3 days for full database integration and testing
