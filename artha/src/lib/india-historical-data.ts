/**
 * India Historical Asset Class Data
 * Annual returns (calendar year) for major Indian asset classes
 * Sources: NSE, AMFI, RBI DBIE, MCX (approximated from public data)
 */

export type AssetKey = "nifty50" | "nifty500" | "niftyMidcap" | "gold" | "debt" | "balanced";
export type ExtendedAssetKey = AssetKey | "sensex";

export const ASSET_LABELS: Record<ExtendedAssetKey, string> = {
  nifty50: "Nifty 50",
  nifty500: "Nifty 500",
  niftyMidcap: "Nifty Midcap 150",
  gold: "Gold (MCX)",
  debt: "Short Duration Debt",
  balanced: "Balanced 60/40",
  sensex: "BSE Sensex",
};

// Annual returns % by calendar year (approximate, based on public index data)
// nifty50, nifty500, niftyMidcap, gold, debt (SBI FD / short duration), balanced (60% nifty500 + 40% debt)
export const ANNUAL_RETURNS: Record<number, Record<AssetKey, number> & Partial<Record<"sensex", number>>> = {
  1990: { nifty50: 22.0, nifty500: 20.0, niftyMidcap: 18.0, gold: 7.0, debt: 11.0, balanced: 16.4 },
  1991: { nifty50: 82.0, nifty500: 75.0, niftyMidcap: 70.0, gold: 12.0, debt: 12.0, balanced: 49.8 },
  1992: { nifty50: -40.0, nifty500: -42.0, niftyMidcap: -45.0, gold: -5.0, debt: 11.0, balanced: -21.2 },
  1993: { nifty50: 28.0, nifty500: 30.0, niftyMidcap: 35.0, gold: 8.0, debt: 10.0, balanced: 22.0 },
  1994: { nifty50: 10.0, nifty500: 8.0, niftyMidcap: 5.0, gold: -2.0, debt: 10.0, balanced: 8.8 },
  1995: { nifty50: -21.0, nifty500: -22.0, niftyMidcap: -25.0, gold: 1.0, debt: 11.0, balanced: -8.8 },
  1996: { nifty50: -1.0, nifty500: -2.0, niftyMidcap: -5.0, gold: -5.0, debt: 11.0, balanced: 3.2 },
  1997: { nifty50: 18.0, nifty500: 15.0, niftyMidcap: 10.0, gold: -15.0, debt: 10.0, balanced: 13.0 },
  1998: { nifty50: -16.0, nifty500: -18.0, niftyMidcap: -22.0, gold: -1.0, debt: 10.0, balanced: -6.8 },
  1999: { nifty50: 64.0, nifty500: 70.0, niftyMidcap: 80.0, gold: 3.0, debt: 9.0, balanced: 45.6 },
  2000: { nifty50: -24.0, nifty500: -28.0, niftyMidcap: -35.0, gold: -5.0, debt: 9.0, balanced: -13.2 },
  2001: { nifty50: -16.0, nifty500: -18.0, niftyMidcap: -22.0, gold: 3.0, debt: 8.5, balanced: -7.4 },
  2002: { nifty50: 3.0, nifty500: 2.0, niftyMidcap: 0.0, gold: 25.0, debt: 8.0, balanced: 4.4 },
  2003: { nifty50: 72.0, nifty500: 80.0, niftyMidcap: 110.0, gold: 13.0, debt: 7.5, balanced: 51.0 },
  2004: { nifty50: 10.0, nifty500: 15.0, niftyMidcap: 22.0, gold: 1.0, debt: 7.0, balanced: 11.8 },
  2005: { nifty50: 36.0, nifty500: 40.0, niftyMidcap: 55.0, gold: 9.0, debt: 7.0, balanced: 26.8 },
  2006: { nifty50: 39.0, nifty500: 42.0, niftyMidcap: 50.0, gold: 20.0, debt: 7.5, balanced: 28.2 },
  2007: { nifty50: 54.0, nifty500: 58.0, niftyMidcap: 70.0, gold: 16.0, debt: 7.5, balanced: 37.8 },
  2008: { nifty50: -52.0, nifty500: -55.0, niftyMidcap: -65.0, gold: 28.0, debt: 8.0, balanced: -29.8 },
  2009: { nifty50: 76.0, nifty500: 80.0, niftyMidcap: 100.0, gold: 18.0, debt: 7.0, balanced: 50.8 },
  2010: { nifty50: 18.0, nifty500: 20.0, niftyMidcap: 22.0, gold: 24.0, debt: 7.0, balanced: 14.8 },
  2011: { nifty50: -25.0, nifty500: -27.0, niftyMidcap: -35.0, gold: 32.0, debt: 8.5, balanced: -12.8 },
  2012: { nifty50: 28.0, nifty500: 30.0, niftyMidcap: 35.0, gold: 10.0, debt: 9.0, balanced: 21.6 },
  2013: { nifty50: 7.0, nifty500: 5.0, niftyMidcap: -5.0, gold: -18.0, debt: 9.0, balanced: 6.6 },
  2014: { nifty50: 31.0, nifty500: 35.0, niftyMidcap: 55.0, gold: -6.0, debt: 9.5, balanced: 24.8 },
  2015: { nifty50: -4.0, nifty500: -3.0, niftyMidcap: 8.0, gold: -6.0, debt: 8.5, balanced: 1.6 },
  2016: { nifty50: 3.0, nifty500: 2.0, niftyMidcap: 7.0, gold: 11.0, debt: 8.0, balanced: 4.4 },
  2017: { nifty50: 29.0, nifty500: 35.0, niftyMidcap: 48.0, gold: 5.0, debt: 7.0, balanced: 23.8 },
  2018: { nifty50: 3.0, nifty500: -3.0, niftyMidcap: -15.0, gold: 7.0, debt: 7.5, balanced: 1.2 },
  2019: { nifty50: 12.0, nifty500: 8.0, niftyMidcap: -5.0, gold: 25.0, debt: 8.0, balanced: 8.0 },
  2020: { nifty50: 15.0, nifty500: 18.0, niftyMidcap: 22.0, gold: 28.0, debt: 7.0, balanced: 13.6 },
  2021: { nifty50: 24.0, nifty500: 30.0, niftyMidcap: 45.0, gold: -4.0, debt: 6.5, balanced: 20.6 },
  2022: { nifty50: 4.0, nifty500: 2.0, niftyMidcap: -5.0, gold: 12.0, debt: 6.0, balanced: 3.6 },
  2023: { nifty50: 20.0, nifty500: 25.0, niftyMidcap: 45.0, gold: 14.0, debt: 7.0, balanced: 17.8 },
  2024: { nifty50: 8.0, nifty500: 12.0, niftyMidcap: 5.0, gold: 20.0, debt: 7.5, balanced: 10.2 },
};

// India CPI inflation by year (approximate)
export const INDIA_CPI: Record<number, number> = {
  1990: 9.0, 1991: 13.9, 1992: 11.8, 1993: 6.4, 1994: 10.2, 1995: 10.2,
  1996: 9.0, 1997: 7.2, 1998: 13.2, 1999: 4.7, 2000: 4.0, 2001: 3.7,
  2002: 4.3, 2003: 3.8, 2004: 3.8, 2005: 4.2, 2006: 5.8, 2007: 6.4,
  2008: 8.3, 2009: 10.9, 2010: 12.1, 2011: 8.9, 2012: 9.3, 2013: 10.9,
  2014: 6.4, 2015: 4.9, 2016: 4.5, 2017: 3.3, 2018: 3.9, 2019: 4.8,
  2020: 6.2, 2021: 5.5, 2022: 6.7, 2023: 5.4, 2024: 4.8,
};

export const START_YEAR = 1990;
export const END_YEAR = 2024;

/**
 * Compute CAGR for a given asset, start year, and holding period (years)
 * Returns null if data not available
 */
export function computeCAGR(
  asset: AssetKey,
  startYear: number,
  holdingYears: number,
  inflationAdjusted = false
): number | null {
  const endYear = startYear + holdingYears - 1;
  if (endYear > END_YEAR) return null;
  if (startYear < START_YEAR) return null;

  let corpus = 100000; // ₹1L
  for (let y = startYear; y <= endYear; y++) {
    const ret = ANNUAL_RETURNS[y]?.[asset];
    if (ret === undefined) return null;
    let adjustedRet = ret;
    if (inflationAdjusted) {
      const cpi = INDIA_CPI[y] ?? 6;
      adjustedRet = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
    }
    corpus *= 1 + adjustedRet / 100;
  }

  const cagr = (Math.pow(corpus / 100000, 1 / holdingYears) - 1) * 100;
  return Math.round(cagr * 10) / 10;
}

/**
 * Compute final corpus for ₹1L invested for given asset, start year, holding period
 */
export function computeCorpus(
  asset: AssetKey,
  startYear: number,
  holdingYears: number
): number | null {
  const endYear = startYear + holdingYears - 1;
  if (endYear > END_YEAR || startYear < START_YEAR) return null;

  let corpus = 100000;
  for (let y = startYear; y <= endYear; y++) {
    const ret = ANNUAL_RETURNS[y]?.[asset];
    if (ret === undefined) return null;
    corpus *= 1 + ret / 100;
  }
  return Math.round(corpus);
}

/**
 * Compute SIP returns: monthly SIP of `sipAmount` for `years` years starting from `startYear`
 * Returns { corpus, xirr (approx), totalInvested }
 */
export function computeSIPReturns(
  asset: AssetKey,
  startYear: number,
  years: number,
  sipAmount: number,
  stepUpPercent = 0
): { corpus: number; totalInvested: number; xirr: number } | null {
  const endYear = startYear + years - 1;
  if (endYear > END_YEAR || startYear < START_YEAR) return null;

  let corpus = 0;
  let totalInvested = 0;
  let currentSIP = sipAmount;

  for (let y = startYear; y <= endYear; y++) {
    const annualRet = ANNUAL_RETURNS[y]?.[asset];
    if (annualRet === undefined) return null;
    const monthlyRet = Math.pow(1 + annualRet / 100, 1 / 12) - 1;

    // Add 12 monthly SIPs for this year
    for (let m = 0; m < 12; m++) {
      corpus += currentSIP;
      totalInvested += currentSIP;
      corpus *= 1 + monthlyRet;
    }

    // Step-up SIP at year boundary
    if (stepUpPercent > 0) {
      currentSIP *= 1 + stepUpPercent / 100;
    }
  }

  // Approximate XIRR as CAGR on invested amount
  const xirr = (Math.pow(corpus / totalInvested, 1 / years) - 1) * 100;
  return { corpus: Math.round(corpus), totalInvested: Math.round(totalInvested), xirr: Math.round(xirr * 10) / 10 };
}

/**
 * Compute lump sum returns for equivalent amount invested at start
 */
export function computeLumpSumReturns(
  asset: AssetKey,
  startYear: number,
  years: number,
  amount: number
): { corpus: number; cagr: number } | null {
  const cagr = computeCAGR(asset, startYear, years);
  if (cagr === null) return null;
  const corpus = Math.round(amount * Math.pow(1 + cagr / 100, years));
  return { corpus, cagr };
}

// ─── Portfolio Backtest Engine ────────────────────────────────────────────────

export interface YearlyDataPoint {
  year: number;
  value: number;
  annualReturn: number;
  drawdown: number;
  benchmarkValue?: number;
  benchmarkReturn?: number;
  benchmarkDrawdown?: number;
}

export interface PortfolioAllocation {
  asset: AssetKey;
  weight: number; // 0–100
}

export interface BacktestConfig {
  allocations: PortfolioAllocation[];
  startYear: number;
  endYear: number;
  initialAmount: number;
  mode: "lumpsum" | "sip";
  sipAmount?: number;
  stepUpPct?: number;
  benchmark?: AssetKey;
  inflationAdjusted?: boolean;
}

export interface BacktestResult {
  yearlyData: YearlyDataPoint[];
  cagr: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpe: number;
  sortino: number;
  calmar: number;
  bestYear: number;
  worstYear: number;
  bestYearReturn: number;
  worstYearReturn: number;
  finalValue: number;
  totalInvested: number;
  stdDev: number;
  positiveYears: number;
  negativeYears: number;
  avgPositiveReturn: number;
  avgNegativeReturn: number;
  // New metrics
  benchmarkCagr?: number;
  benchmarkMaxDrawdown?: number;
  benchmarkStdDev?: number;
  activeReturn?: number;
  beta?: number;
  alpha?: number;
  rSquared?: number;
  upsideCapture?: number;
  downsideCapture?: number;
  trackingError?: number;
  informationRatio?: number;
  var5?: number; // Historical Value at Risk (5%)
  
  // Advanced metrics
  cvar5?: number; // Conditional Value at Risk (Expected Shortfall)
  skewness?: number;
  kurtosis?: number;
  treynor?: number;
  downsideDev?: number;
  gainLossRatio?: number;
  betaDown?: number; // Beta in down markets
}

// Risk-free rate proxy by year
const RISK_FREE_RATE: Record<number, number> = {
  1990:10,1991:11,1992:11,1993:10,1994:10,1995:11,1996:11,1997:10,1998:10,1999:9,
  2000:9,2001:8.5,2002:8,2003:7.5,2004:7,2005:7,2006:7.5,2007:7.5,2008:8,2009:7,
  2010:7,2011:8.5,2012:9,2013:9,2014:9.5,2015:8.5,2016:8,2017:7,2018:7.5,2019:8,
  2020:7,2021:6.5,2022:6,2023:7,2024:7.5,
};

function portfolioAnnualReturn(allocations: PortfolioAllocation[], year: number): number {
  const totalWeight = allocations.reduce((s, a) => s + a.weight, 0);
  if (totalWeight === 0) return 0;
  return allocations.reduce((ret, alloc) => {
    const assetRet = ANNUAL_RETURNS[year]?.[alloc.asset] ?? 0;
    return ret + (alloc.weight / totalWeight) * assetRet;
  }, 0);
}

export interface AssetMetrics {
  cagr: number;
  stdDev: number;
  bestYear: number;
  worstYear: number;
  maxDrawdown: number;
  sharpe: number;
  sortino: number;
}

export function computeAssetMetrics(
  asset: AssetKey,
  startYear: number,
  endYear: number,
  inflationAdjusted = false
): AssetMetrics | null {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  if (years.length === 0) return null;

  let value = 100000;
  let peakValue = value;
  let maxDrawdown = 0;
  
  let bestYear = -Infinity;
  let worstYear = Infinity;
  
  const returns: number[] = [];

  for (const year of years) {
    let ret = ANNUAL_RETURNS[year]?.[asset] ?? 0;
    if (inflationAdjusted) {
      const cpi = INDIA_CPI[year] ?? 6;
      ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
    }
    
    value *= 1 + ret / 100;
    returns.push(ret);
    
    peakValue = Math.max(peakValue, value);
    const dd = ((value - peakValue) / peakValue) * 100;
    maxDrawdown = Math.min(maxDrawdown, dd);
    
    bestYear = Math.max(bestYear, ret);
    worstYear = Math.min(worstYear, ret);
  }

  const cagr = (Math.pow(value / 100000, 1 / years.length) - 1) * 100;
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = Math.sqrt(returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length);
  
  // Sharpe & Sortino (Simplified, assumes 6% Risk Free Rate)
  const rf = 6;
  const sharpe = stdDev > 0 ? (cagr - rf) / stdDev : 0;
  
  const negativeReturns = returns.filter((r) => r < 0);
  const downsideDev = negativeReturns.length > 0 
    ? Math.sqrt(negativeReturns.reduce((a, b) => a + Math.pow(b, 2), 0) / returns.length) 
    : 0;
  const sortino = downsideDev > 0 ? (cagr - rf) / downsideDev : 0;

  return {
    cagr: Math.round(cagr * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100,
    bestYear: Math.round(bestYear * 100) / 100,
    worstYear: Math.round(worstYear * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
    sharpe: Math.round(sharpe * 100) / 100,
    sortino: Math.round(sortino * 100) / 100,
  };
}

export interface DrawdownPeriod {
  startYear: number;
  endYear: number;
  recoveryYear?: number;
  depth: number;
  durationYears: number;
}

export function computeTopDrawdowns(
  allocations: PortfolioAllocation[], 
  startYear: number, 
  endYear: number, 
  limit = 10,
  inflationAdjusted = false
): DrawdownPeriod[] {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  if (years.length === 0) return [];

  let value = 100000;
  let peakValue = value;
  let peakYear = startYear - 1;
  
  const drawdowns: DrawdownPeriod[] = [];
  let currentDrawdown: DrawdownPeriod | null = null;

  for (const year of years) {
    let ret = portfolioAnnualReturn(allocations, year);
    if (inflationAdjusted) {
      const cpi = INDIA_CPI[year] ?? 6;
      ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
    }
    
    value *= 1 + ret / 100;

    if (value > peakValue) {
      peakValue = value;
      peakYear = year;
      if (currentDrawdown) {
        currentDrawdown.recoveryYear = year;
        drawdowns.push(currentDrawdown);
        currentDrawdown = null;
      }
    } else if (value < peakValue) {
      const depth = ((value - peakValue) / peakValue) * 100;
      if (!currentDrawdown) {
        currentDrawdown = {
          startYear: peakYear,
          endYear: year,
          depth,
          durationYears: year - peakYear
        };
      } else {
        currentDrawdown.endYear = year;
        currentDrawdown.depth = Math.min(currentDrawdown.depth, depth);
        currentDrawdown.durationYears = year - currentDrawdown.startYear;
      }
    }
  }

  // Push unrecovered drawdown
  if (currentDrawdown) {
    drawdowns.push(currentDrawdown);
  }

  return drawdowns
    .sort((a, b) => a.depth - b.depth) // Sort ascending by depth (most negative first)
    .slice(0, limit)
    .map(d => ({
      ...d,
      depth: Math.round(d.depth * 100) / 100
    }));
}

export interface RollingStats {
  period: number;
  average: number;
  high: number;
  low: number;
}

export function computeRollingStats(
  allocations: PortfolioAllocation[], 
  startYear: number, 
  endYear: number, 
  periods = [1, 3, 5, 7, 10],
  inflationAdjusted = false
): RollingStats[] {
  return periods.map(period => {
    const rolls = rollingReturns(allocations, startYear, endYear, period, undefined, inflationAdjusted);
    if (rolls.length === 0) return { period, average: 0, high: 0, low: 0 };
    
    const cagrs = rolls.map(r => r.cagr);
    const average = cagrs.reduce((a, b) => a + b, 0) / cagrs.length;
    const high = Math.max(...cagrs);
    const low = Math.min(...cagrs);
    
    return {
      period,
      average: Math.round(average * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100
    };
  });
}

// Helper to calculate Beta, Alpha, R2
function calculateRegressionStats(portReturns: number[], bmReturns: number[]) {
  if (portReturns.length < 2 || bmReturns.length < 2) return { beta: 0, alpha: 0, rSquared: 0 };
  
  const n = portReturns.length;
  const sumX = bmReturns.reduce((a, b) => a + b, 0);
  const sumY = portReturns.reduce((a, b) => a + b, 0);
  const sumXY = portReturns.reduce((acc, y, i) => acc + y * bmReturns[i], 0);
  const sumX2 = bmReturns.reduce((acc, x) => acc + x * x, 0);
  
  const meanX = sumX / n;
  const meanY = sumY / n;
  
  const ssX = sumX2 - (sumX * sumX) / n;
  const ssXY = sumXY - (sumX * sumY) / n;
  
  const beta = ssX !== 0 ? ssXY / ssX : 0;
  const alpha = meanY - beta * meanX;
  
  // R-squared
  const sst = portReturns.reduce((acc, y) => acc + Math.pow(y - meanY, 2), 0);
  const ssr = portReturns.reduce((acc, y, i) => acc + Math.pow(y - (alpha + beta * bmReturns[i]), 2), 0);
  const rSquared = sst !== 0 ? (1 - (ssr / sst)) * 100 : 0;
  
  return { beta, alpha, rSquared };
}

export function runBacktest(config: BacktestConfig): BacktestResult {
  const { allocations, startYear, endYear, initialAmount, mode, sipAmount = 10000, stepUpPct = 0, benchmark, inflationAdjusted = false } = config;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  let value = mode === "lumpsum" ? initialAmount : 0;
  let bmValue = mode === "lumpsum" ? initialAmount : 0;
  let totalInvested = mode === "lumpsum" ? initialAmount : 0;
  let currentSIP = sipAmount;
  let peakValue = value;
  let bmPeakValue = bmValue;
  
  const yearlyData: YearlyDataPoint[] = [];
  const annualReturns: number[] = [];
  const bmAnnualReturns: number[] = [];

  for (const year of years) {
    if (mode === "sip") {
      const yearSIP = currentSIP * 12;
      value += yearSIP;
      bmValue += yearSIP;
      totalInvested += yearSIP;
      if (stepUpPct > 0) currentSIP *= 1 + stepUpPct / 100;
    }
    
    let ret = portfolioAnnualReturn(allocations, year);
    if (inflationAdjusted) {
      const cpi = INDIA_CPI[year] ?? 6;
      ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
    }

    value *= 1 + ret / 100;
    annualReturns.push(ret);
    peakValue = Math.max(peakValue, value);
    const drawdown = ((value - peakValue) / peakValue) * 100;
    
    const point: YearlyDataPoint = { 
      year, 
      value: Math.round(value), 
      annualReturn: Math.round(ret * 10) / 10, 
      drawdown: Math.round(drawdown * 10) / 10 
    };

    if (benchmark) {
      let bmRet = ANNUAL_RETURNS[year]?.[benchmark] ?? 0;
      if (inflationAdjusted) {
        const cpi = INDIA_CPI[year] ?? 6;
        bmRet = ((1 + bmRet / 100) / (1 + cpi / 100) - 1) * 100;
      }
      bmValue *= 1 + bmRet / 100;
      bmAnnualReturns.push(bmRet);
      bmPeakValue = Math.max(bmPeakValue, bmValue);
      point.benchmarkValue = Math.round(bmValue);
      point.benchmarkReturn = Math.round(bmRet * 10) / 10;
      point.benchmarkDrawdown = Math.round(((bmValue - bmPeakValue) / bmPeakValue) * 1000) / 10;
    }

    yearlyData.push(point);
  }

  const numYears = years.length;
  const base = mode === "lumpsum" ? initialAmount : totalInvested;
  
  const cagr = numYears > 0 ? (Math.pow(value / base, 1 / numYears) - 1) * 100 : 0;
  const bmCagr = (benchmark && numYears > 0) ? (Math.pow(bmValue / base, 1 / numYears) - 1) * 100 : undefined;
  
  const totalReturn = ((value - base) / base) * 100;
  
  const avgRet = annualReturns.reduce((s, r) => s + r, 0) / Math.max(annualReturns.length, 1);
  const avgRf = years.reduce((s, y) => s + (RISK_FREE_RATE[y] ?? 7), 0) / Math.max(years.length, 1);
  
  const variance = annualReturns.reduce((s, r) => s + Math.pow(r - avgRet, 2), 0) / Math.max(annualReturns.length - 1, 1);
  const stdDev = Math.sqrt(variance);
  const sharpe = stdDev > 0 ? (avgRet - avgRf) / stdDev : 0;
  
  const downReturns = annualReturns.filter(r => r < avgRf);
  const downsideVar = downReturns.length > 0 ? downReturns.reduce((s, r) => s + Math.pow(r - avgRf, 2), 0) / downReturns.length : 0;
  const sortino = Math.sqrt(downsideVar) > 0 ? (avgRet - avgRf) / Math.sqrt(downsideVar) : 0;
  
  const maxDrawdown = Math.min(...yearlyData.map(d => d.drawdown));
  const calmar = maxDrawdown < 0 ? cagr / Math.abs(maxDrawdown) : 0;
  
  const bestYearReturn = Math.max(...annualReturns);
  const worstYearReturn = Math.min(...annualReturns);
  const positiveYears = annualReturns.filter(r => r > 0).length;
  const negativeYears = annualReturns.filter(r => r < 0).length;

  // New Metrics
  let activeReturn, beta, alpha, rSquared, upsideCapture, downsideCapture, trackingError, informationRatio, bmMaxDrawdown, bmStdDev;
  
  if (benchmark && bmAnnualReturns.length > 0) {
    activeReturn = cagr - (bmCagr ?? 0);
    bmMaxDrawdown = Math.min(...yearlyData.map(d => d.benchmarkDrawdown ?? 0));
    
    const bmAvgRet = bmAnnualReturns.reduce((s, r) => s + r, 0) / bmAnnualReturns.length;
    bmStdDev = Math.sqrt(bmAnnualReturns.reduce((s, r) => s + Math.pow(r - bmAvgRet, 2), 0) / Math.max(bmAnnualReturns.length - 1, 1));
    
    const reg = calculateRegressionStats(annualReturns, bmAnnualReturns);
    beta = reg.beta;
    alpha = reg.alpha;
    rSquared = reg.rSquared;

    const upMonths = bmAnnualReturns.map((r, i) => r > 0 ? { p: annualReturns[i], b: r } : null).filter(Boolean) as {p:number, b:number}[];
    const downMonths = bmAnnualReturns.map((r, i) => r <= 0 ? { p: annualReturns[i], b: r } : null).filter(Boolean) as {p:number, b:number}[];

    const avgPortUp = upMonths.reduce((s, m) => s + m.p, 0) / Math.max(upMonths.length, 1);
    const avgBmUp = upMonths.reduce((s, m) => s + m.b, 0) / Math.max(upMonths.length, 1);
    upsideCapture = avgBmUp > 0 ? (avgPortUp / avgBmUp) * 100 : 0;

    const avgPortDown = downMonths.reduce((s, m) => s + m.p, 0) / Math.max(downMonths.length, 1);
    const avgBmDown = downMonths.reduce((s, m) => s + m.b, 0) / Math.max(downMonths.length, 1);
    downsideCapture = avgBmDown < 0 ? (avgPortDown / avgBmDown) * 100 : 0;

    const activeReturnsList = annualReturns.map((r, i) => r - bmAnnualReturns[i]);
    const avgActive = activeReturnsList.reduce((s, r) => s + r, 0) / activeReturnsList.length;
    trackingError = Math.sqrt(activeReturnsList.reduce((s, r) => s + Math.pow(r - avgActive, 2), 0) / Math.max(activeReturnsList.length - 1, 1));
    
    informationRatio = trackingError > 0 ? avgActive / trackingError : 0;
  }

  // VaR 5% calculation
  const sortedReturns = [...annualReturns].sort((a, b) => a - b);
  const varIndex = Math.floor(sortedReturns.length * 0.05);
  const var5 = sortedReturns.length > 0 ? sortedReturns[varIndex] : 0;
  
  // CVaR 5%
  const cvarReturns = sortedReturns.slice(0, Math.max(varIndex, 1));
  const cvar5 = cvarReturns.length > 0 ? cvarReturns.reduce((s, r) => s + r, 0) / cvarReturns.length : 0;

  // Skewness and Kurtosis
  let skewness = 0;
  let kurtosis = 0;
  if (annualReturns.length > 2 && stdDev > 0) {
    const n = annualReturns.length;
    const mean = avgRet;
    const m3 = annualReturns.reduce((s, r) => s + Math.pow(r - mean, 3), 0) / n;
    const m4 = annualReturns.reduce((s, r) => s + Math.pow(r - mean, 4), 0) / n;
    skewness = m3 / Math.pow(stdDev, 3);
    kurtosis = (m4 / Math.pow(stdDev, 4)) - 3; // Excess kurtosis
  }

  // Treynor Ratio
  const treynor = beta && beta > 0 ? (cagr - avgRf) / beta : 0;
  
  // Downside Deviation (already calculated for Sortino)
  const downsideDev = Math.sqrt(downsideVar);
  
  // Gain/Loss Ratio
  const avgWin = positiveYears > 0 ? annualReturns.filter(r => r > 0).reduce((s, r) => s + r, 0) / positiveYears : 0;
  const avgLoss = negativeYears > 0 ? Math.abs(annualReturns.filter(r => r < 0).reduce((s, r) => s + r, 0) / negativeYears) : 0;
  const gainLossRatio = avgLoss > 0 ? avgWin / avgLoss : 0;

  return {
    yearlyData, cagr: Math.round(cagr * 100) / 100, totalReturn: Math.round(totalReturn * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100, sharpe: Math.round(sharpe * 100) / 100,
    sortino: Math.round(sortino * 100) / 100, calmar: Math.round(calmar * 100) / 100,
    bestYear: years[annualReturns.indexOf(bestYearReturn)], worstYear: years[annualReturns.indexOf(worstYearReturn)],
    bestYearReturn: Math.round(bestYearReturn * 10) / 10, worstYearReturn: Math.round(worstYearReturn * 10) / 10,
    finalValue: Math.round(value), totalInvested: Math.round(totalInvested), stdDev: Math.round(stdDev * 100) / 100,
    positiveYears, negativeYears,
    avgPositiveReturn: positiveYears > 0 ? Math.round(avgWin * 10) / 10 : 0,
    avgNegativeReturn: negativeYears > 0 ? Math.round(annualReturns.filter(r => r < 0).reduce((s, r) => s + r, 0) / negativeYears * 10) / 10 : 0,
    // New metrics
    benchmarkCagr: bmCagr !== undefined ? Math.round(bmCagr * 100) / 100 : undefined,
    benchmarkMaxDrawdown: bmMaxDrawdown !== undefined ? Math.round(bmMaxDrawdown * 100) / 100 : undefined,
    benchmarkStdDev: bmStdDev !== undefined ? Math.round(bmStdDev * 100) / 100 : undefined,
    activeReturn: activeReturn !== undefined ? Math.round(activeReturn * 100) / 100 : undefined,
    beta: beta !== undefined ? Math.round(beta * 100) / 100 : undefined,
    alpha: alpha !== undefined ? Math.round(alpha * 100) / 100 : undefined,
    rSquared: rSquared !== undefined ? Math.round(rSquared * 100) / 100 : undefined,
    upsideCapture: upsideCapture !== undefined ? Math.round(upsideCapture * 100) / 100 : undefined,
    downsideCapture: downsideCapture !== undefined ? Math.round(downsideCapture * 100) / 100 : undefined,
    trackingError: trackingError !== undefined ? Math.round(trackingError * 100) / 100 : undefined,
    informationRatio: informationRatio !== undefined ? Math.round(informationRatio * 100) / 100 : undefined,
    var5: Math.round(var5 * 100) / 100,
    // Advanced Metrics
    cvar5: Math.round(cvar5 * 100) / 100,
    skewness: Math.round(skewness * 100) / 100,
    kurtosis: Math.round(kurtosis * 100) / 100,
    treynor: Math.round(treynor * 100) / 100,
    downsideDev: Math.round(downsideDev * 100) / 100,
    gainLossRatio: Math.round(gainLossRatio * 100) / 100,
  };
}

export function rollingReturns(
  allocations: PortfolioAllocation[], startYear: number, endYear: number, windowYears: number, benchmark?: AssetKey, inflationAdjusted = false
): { year: number; cagr: number; benchmarkCagr?: number }[] {
  const results: { year: number; cagr: number; benchmarkCagr?: number }[] = [];
  for (let y = startYear; y <= endYear - windowYears + 1; y++) {
    let value = 100000;
    let bmValue = 100000;
    for (let wy = y; wy <= y + windowYears - 1; wy++) {
      let ret = portfolioAnnualReturn(allocations, wy);
      if (inflationAdjusted) {
        const cpi = INDIA_CPI[wy] ?? 6;
        ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
      }
      value *= 1 + ret / 100;

      if (benchmark) {
        let bmRet = ANNUAL_RETURNS[wy]?.[benchmark] ?? 0;
        if (inflationAdjusted) {
          const cpi = INDIA_CPI[wy] ?? 6;
          bmRet = ((1 + bmRet / 100) / (1 + cpi / 100) - 1) * 100;
        }
        bmValue *= 1 + bmRet / 100;
      }
    }
    
    const row: { year: number; cagr: number; benchmarkCagr?: number } = { 
      year: y, 
      cagr: Math.round((Math.pow(value / 100000, 1 / windowYears) - 1) * 1000) / 10 
    };

    if (benchmark) {
      row.benchmarkCagr = Math.round((Math.pow(bmValue / 100000, 1 / windowYears) - 1) * 1000) / 10;
    }
    
    results.push(row);
  }
  return results;
}

export function assetMeanStdDev(asset: AssetKey, startYear: number, endYear: number): { mean: number; stdDev: number } {
  const rets = Array.from({ length: endYear - startYear + 1 }, (_, i) => ANNUAL_RETURNS[startYear + i]?.[asset] ?? 0);
  const mean = rets.reduce((s, r) => s + r, 0) / rets.length;
  const stdDev = Math.sqrt(rets.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / rets.length);
  return { mean: Math.round(mean * 100) / 100, stdDev: Math.round(stdDev * 100) / 100 };
}

export function assetCorrelation(a: AssetKey, b: AssetKey, startYear: number, endYear: number): number {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  const ra = years.map(y => ANNUAL_RETURNS[y]?.[a] ?? 0);
  const rb = years.map(y => ANNUAL_RETURNS[y]?.[b] ?? 0);
  const ma = ra.reduce((s, r) => s + r, 0) / ra.length;
  const mb = rb.reduce((s, r) => s + r, 0) / rb.length;
  const cov = ra.reduce((s, r, i) => s + (r - ma) * (rb[i] - mb), 0) / ra.length;
  const sa = Math.sqrt(ra.reduce((s, r) => s + Math.pow(r - ma, 2), 0) / ra.length);
  const sb = Math.sqrt(rb.reduce((s, r) => s + Math.pow(r - mb, 2), 0) / rb.length);
  return sa > 0 && sb > 0 ? Math.round((cov / (sa * sb)) * 100) / 100 : 0;
}

/**
 * Smart SIP: adjusts monthly investment based on Nifty P/E relative to thresholds.
 * Below cheapPE → multiply SIP by cheapMult; above expPE → multiply by expMult; else 1x.
 * Returns dataPoints per year plus summary stats.
 */
export function computeSmartSIPReturns(
  startYear: number,
  years: number,
  baseSip: number,
  stepUpPercent: number,
  cheapPE: number,
  cheapMult: number,
  expPE: number,
  expMult: number
): { corpus: number; totalInvested: number; xirr: number; dataPoints: { year: number; pe: number | null; activeMultiplier: number; cumulativeSIP: number; cumulativeInvested: number }[] } | null {
  const endYear = startYear + years - 1;
  if (endYear > END_YEAR || startYear < START_YEAR) return null;

  let corpus = 0;
  let totalInvested = 0;
  let currentSIP = baseSip;
  const dataPoints: { year: number; pe: number | null; activeMultiplier: number; cumulativeSIP: number; cumulativeInvested: number }[] = [];

  for (let y = startYear; y <= endYear; y++) {
    const annualRet = ANNUAL_RETURNS[y]?.["nifty50"];
    if (annualRet === undefined) return null;

    // Mock P/E: inverse of returns gives rough sense, but use a simple sine-based proxy
    const mockPE = 20 + 8 * Math.sin((y - 2000) * 0.4);
    const mult = mockPE < cheapPE ? cheapMult : mockPE > expPE ? expMult : 1.0;
    const activeSIP = currentSIP * mult;
    const monthlyRet = Math.pow(1 + annualRet / 100, 1 / 12) - 1;

    for (let m = 0; m < 12; m++) {
      corpus += activeSIP;
      totalInvested += activeSIP;
      corpus *= 1 + monthlyRet;
    }

    dataPoints.push({ year: y, pe: +mockPE.toFixed(1), activeMultiplier: mult, cumulativeSIP: +corpus.toFixed(0), cumulativeInvested: +totalInvested.toFixed(0) });

    if (stepUpPercent > 0) currentSIP *= 1 + stepUpPercent / 100;
  }

  const xirr = years > 0 ? (Math.pow(corpus / totalInvested, 1 / years) - 1) * 100 : 0;
  return { corpus: +corpus.toFixed(0), totalInvested: +totalInvested.toFixed(0), xirr: +xirr.toFixed(2), dataPoints };
}

// MF category TER data (approximate, from AMFI averages)
export interface MFCategory {
  label: string;
  regularTER: number;
  directTER: number;
  historicalReturn: number; // gross annual return %
}

export const MF_CATEGORIES: Record<string, MFCategory> = {
  largeCap: { label: "Large Cap", regularTER: 1.65, directTER: 0.45, historicalReturn: 13.5 },
  flexiCap: { label: "Flexi Cap", regularTER: 1.82, directTER: 0.41, historicalReturn: 14.2 },
  midCap: { label: "Mid Cap", regularTER: 1.90, directTER: 0.55, historicalReturn: 16.5 },
  smallCap: { label: "Small Cap", regularTER: 1.95, directTER: 0.60, historicalReturn: 18.0 },
  elss: { label: "ELSS", regularTER: 1.75, directTER: 0.50, historicalReturn: 14.8 },
  hybrid: { label: "Aggressive Hybrid", regularTER: 1.70, directTER: 0.48, historicalReturn: 12.5 },
  debtShort: { label: "Short Duration Debt", regularTER: 0.85, directTER: 0.25, historicalReturn: 7.5 },
  indexNifty50: { label: "Index Fund (Nifty 50)", regularTER: 0.50, directTER: 0.10, historicalReturn: 13.0 },
};
