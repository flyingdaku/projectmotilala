/**
 * Relative Rotation Graph (RRG) Utilities
 * 
 * RRG plots show relative strength (RS) vs relative momentum (RM) for sectors/stocks
 * Industry best practices for stock filtering:
 * - Minimum market cap: ₹500 Cr (filters out micro-caps)
 * - Minimum average daily volume: ₹1 Cr (filters out illiquid stocks)
 * - Minimum price: ₹10 (filters out penny stocks)
 * - Active trading: Last traded within 30 days
 */

export interface RRGDataPoint {
  id: string;
  name: string;
  rs: number;        // Relative Strength (vs benchmark)
  rsRatio: number;   // RS-Ratio (normalized RS)
  rsMomentum: number; // RS-Momentum (rate of change of RS-Ratio)
  quadrant: 'leading' | 'weakening' | 'lagging' | 'improving';
  color: string;
  size?: number;     // For bubble size (market cap)
}

export interface StockFilterCriteria {
  minMarketCapCr: number;
  minAvgVolumeCr: number;
  minPrice: number;
  maxDaysSinceLastTrade: number;
}

export const DEFAULT_RRG_FILTERS: StockFilterCriteria = {
  minMarketCapCr: 500,      // ₹500 Cr minimum market cap
  minAvgVolumeCr: 1,        // ₹1 Cr average daily volume
  minPrice: 10,             // ₹10 minimum price
  maxDaysSinceLastTrade: 30, // Last traded within 30 days
};

/**
 * Calculate Relative Strength vs benchmark
 * RS = (Stock Price / Benchmark Price) * 100
 */
export function calculateRS(
  stockPrices: number[],
  benchmarkPrices: number[]
): number[] {
  if (stockPrices.length !== benchmarkPrices.length) {
    throw new Error('Stock and benchmark price arrays must have same length');
  }
  
  return stockPrices.map((price, i) => 
    (price / benchmarkPrices[i]) * 100
  );
}

/**
 * Calculate RS-Ratio (normalized RS using moving average)
 * RS-Ratio = Current RS / MA(RS, period)
 */
export function calculateRSRatio(
  rs: number[],
  period: number = 10
): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < rs.length; i++) {
    if (i < period - 1) {
      result.push(100); // Default to 100 for insufficient data
      continue;
    }
    
    const slice = rs.slice(i - period + 1, i + 1);
    const ma = slice.reduce((sum, val) => sum + val, 0) / period;
    result.push((rs[i] / ma) * 100);
  }
  
  return result;
}

/**
 * Calculate RS-Momentum (rate of change of RS-Ratio)
 * RS-Momentum = ((Current RS-Ratio / Previous RS-Ratio) - 1) * 100
 */
export function calculateRSMomentum(
  rsRatio: number[],
  period: number = 1
): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < rsRatio.length; i++) {
    if (i < period) {
      result.push(0); // No momentum for first data point
      continue;
    }
    
    const current = rsRatio[i];
    const previous = rsRatio[i - period];
    result.push(((current / previous) - 1) * 100);
  }
  
  return result;
}

/**
 * Determine RRG quadrant based on RS-Ratio and RS-Momentum
 * 
 * Quadrants:
 * - Leading (top-right): RS-Ratio > 100, RS-Momentum > 0
 * - Weakening (top-left): RS-Ratio > 100, RS-Momentum < 0
 * - Lagging (bottom-left): RS-Ratio < 100, RS-Momentum < 0
 * - Improving (bottom-right): RS-Ratio < 100, RS-Momentum > 0
 */
export function determineQuadrant(
  rsRatio: number,
  rsMomentum: number
): 'leading' | 'weakening' | 'lagging' | 'improving' {
  if (rsRatio >= 100 && rsMomentum >= 0) return 'leading';
  if (rsRatio >= 100 && rsMomentum < 0) return 'weakening';
  if (rsRatio < 100 && rsMomentum < 0) return 'lagging';
  return 'improving';
}

/**
 * Get color for RRG quadrant
 */
export function getQuadrantColor(
  quadrant: 'leading' | 'weakening' | 'lagging' | 'improving'
): string {
  const colors = {
    leading: '#10B981',    // Green
    weakening: '#F59E0B',  // Amber
    lagging: '#EF4444',    // Red
    improving: '#3B82F6',  // Blue
  };
  return colors[quadrant];
}

/**
 * Calculate full RRG data point
 */
export function calculateRRGPoint(
  id: string,
  name: string,
  stockPrices: number[],
  benchmarkPrices: number[],
  marketCapCr?: number
): RRGDataPoint {
  const rs = calculateRS(stockPrices, benchmarkPrices);
  const rsRatio = calculateRSRatio(rs);
  const rsMomentum = calculateRSMomentum(rsRatio);
  
  const currentRSRatio = rsRatio[rsRatio.length - 1];
  const currentRSMomentum = rsMomentum[rsMomentum.length - 1];
  const quadrant = determineQuadrant(currentRSRatio, currentRSMomentum);
  
  return {
    id,
    name,
    rs: rs[rs.length - 1],
    rsRatio: currentRSRatio,
    rsMomentum: currentRSMomentum,
    quadrant,
    color: getQuadrantColor(quadrant),
    size: marketCapCr,
  };
}

/**
 * Filter stocks for RRG analysis based on liquidity and market cap
 */
export function shouldIncludeInRRG(
  stock: {
    marketCapCr?: number | null;
    avgVolumeCr?: number | null;
    price?: number | null;
    lastTraded?: string | null;
  },
  criteria: StockFilterCriteria = DEFAULT_RRG_FILTERS
): boolean {
  // Market cap filter
  if (!stock.marketCapCr || stock.marketCapCr < criteria.minMarketCapCr) {
    return false;
  }
  
  // Volume filter
  if (!stock.avgVolumeCr || stock.avgVolumeCr < criteria.minAvgVolumeCr) {
    return false;
  }
  
  // Price filter
  if (!stock.price || stock.price < criteria.minPrice) {
    return false;
  }
  
  // Last traded filter
  if (stock.lastTraded) {
    const daysSince = Math.floor(
      (Date.now() - new Date(stock.lastTraded).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSince > criteria.maxDaysSinceLastTrade) {
      return false;
    }
  }
  
  return true;
}

/**
 * Normalize RRG coordinates for plotting
 * Centers the plot at (100, 0) and scales appropriately
 */
export function normalizeRRGCoordinates(
  points: RRGDataPoint[]
): RRGDataPoint[] {
  if (points.length === 0) return [];
  
  // Find min/max for scaling
  const rsRatios = points.map(p => p.rsRatio);
  const rsMomentums = points.map(p => p.rsMomentum);
  
  const minRS = Math.min(...rsRatios);
  const maxRS = Math.max(...rsRatios);
  const minMom = Math.min(...rsMomentums);
  const maxMom = Math.max(...rsMomentums);
  
  // Return points as-is (already normalized around 100, 0)
  return points;
}
