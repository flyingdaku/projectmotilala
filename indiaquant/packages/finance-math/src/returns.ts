import Decimal from "decimal.js";

/**
 * Portfolio return metrics: Max Drawdown, Sharpe, Sortino, Ulcer Index,
 * rolling returns, annual/monthly return tables.
 */

export interface PricePoint {
  date: string; // YYYY-MM-DD
  value: number;
}

// ---------------------------------------------------------------------------
// Drawdown
// ---------------------------------------------------------------------------

export interface DrawdownResult {
  maxDrawdown: number; // e.g. -0.55 = -55%
  maxDrawdownDate: string;
  recoveryDate: string | null;
  recoveryPeriodDays: number | null;
  longestDrawdownDays: number;
  /** Full underwater series for chart rendering */
  underwaterSeries: Array<{ date: string; drawdown: number }>;
}

/**
 * Compute max drawdown and underwater series from a price series.
 */
export function calculateDrawdown(series: PricePoint[]): DrawdownResult {
  if (series.length === 0) {
    return {
      maxDrawdown: 0,
      maxDrawdownDate: "",
      recoveryDate: null,
      recoveryPeriodDays: null,
      longestDrawdownDays: 0,
      underwaterSeries: [],
    };
  }

  let peak = series[0].value;
  let maxDrawdown = 0;
  let maxDrawdownDate = series[0].date;
  let recoveryDate: string | null = null;
  let longestDrawdownDays = 0;
  let currentDrawdownStartDate = series[0].date;

  const underwaterSeries: Array<{ date: string; drawdown: number }> = [];

  for (const point of series) {
    if (point.value > peak) {
      // New peak — check if this ends a drawdown period
      if (peak > 0) {
        const drawdownDays =
          (new Date(point.date).getTime() - new Date(currentDrawdownStartDate).getTime()) /
          (1000 * 60 * 60 * 24);
        if (drawdownDays > longestDrawdownDays) {
          longestDrawdownDays = drawdownDays;
        }
      }
      peak = point.value;
      currentDrawdownStartDate = point.date;
    }

    const drawdown = peak > 0 ? (point.value - peak) / peak : 0;
    underwaterSeries.push({ date: point.date, drawdown });

    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownDate = point.date;
      recoveryDate = null; // Reset — not yet recovered
    }

    // Check if recovered from max drawdown
    if (maxDrawdown < 0 && recoveryDate === null && point.value >= peak && point.date > maxDrawdownDate) {
      recoveryDate = point.date;
    }
  }

  const recoveryPeriodDays =
    recoveryDate !== null
      ? (new Date(recoveryDate).getTime() - new Date(maxDrawdownDate).getTime()) /
        (1000 * 60 * 60 * 24)
      : null;

  return {
    maxDrawdown,
    maxDrawdownDate,
    recoveryDate,
    recoveryPeriodDays,
    longestDrawdownDays,
    underwaterSeries,
  };
}

// ---------------------------------------------------------------------------
// Risk-Adjusted Returns
// ---------------------------------------------------------------------------

/**
 * Annualized Sharpe Ratio: (mean_return - risk_free_rate) / std_dev * sqrt(252)
 * Uses daily returns series.
 */
export function calculateSharpe(
  dailyReturns: number[],
  annualRiskFreeRate = 0.065 // India 10yr G-Sec ~6.5%
): number {
  if (dailyReturns.length < 2) return 0;
  const dailyRfr = annualRiskFreeRate / 252;
  const excessReturns = dailyReturns.map((r) => r - dailyRfr);
  const mean = excessReturns.reduce((a, b) => a + b, 0) / excessReturns.length;
  const variance =
    excessReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
    (excessReturns.length - 1);
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return 0;
  return (mean / stdDev) * Math.sqrt(252);
}

/**
 * Annualized Sortino Ratio: uses only downside deviation.
 */
export function calculateSortino(
  dailyReturns: number[],
  annualRiskFreeRate = 0.065
): number {
  if (dailyReturns.length < 2) return 0;
  const dailyRfr = annualRiskFreeRate / 252;
  const excessReturns = dailyReturns.map((r) => r - dailyRfr);
  const mean = excessReturns.reduce((a, b) => a + b, 0) / excessReturns.length;
  const downsideReturns = excessReturns.filter((r) => r < 0);
  if (downsideReturns.length === 0) return Infinity;
  const downsideVariance =
    downsideReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / excessReturns.length;
  const downsideStdDev = Math.sqrt(downsideVariance);
  if (downsideStdDev === 0) return 0;
  return (mean / downsideStdDev) * Math.sqrt(252);
}

/**
 * Ulcer Index: RMS of drawdowns — measures pain of holding through drawdowns.
 * Lower is better.
 */
export function calculateUlcerIndex(series: PricePoint[]): number {
  if (series.length === 0) return 0;
  let peak = series[0].value;
  const drawdownSquares: number[] = [];

  for (const point of series) {
    if (point.value > peak) peak = point.value;
    const drawdownPct = peak > 0 ? ((point.value - peak) / peak) * 100 : 0;
    drawdownSquares.push(Math.pow(drawdownPct, 2));
  }

  const meanSquare = drawdownSquares.reduce((a, b) => a + b, 0) / drawdownSquares.length;
  return Math.sqrt(meanSquare);
}

/**
 * Annualized standard deviation from daily returns.
 */
export function calculateAnnualizedStdDev(dailyReturns: number[]): number {
  if (dailyReturns.length < 2) return 0;
  const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const variance =
    dailyReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
    (dailyReturns.length - 1);
  return Math.sqrt(variance * 252);
}

// ---------------------------------------------------------------------------
// Rolling Returns
// ---------------------------------------------------------------------------

/**
 * Compute rolling N-year CAGR for each date in the series.
 */
export function calculateRollingReturns(
  series: PricePoint[],
  windowYears: number
): Array<{ date: string; cagr: number }> {
  const windowDays = Math.round(windowYears * 365);
  const results: Array<{ date: string; cagr: number }> = [];

  for (let i = 0; i < series.length; i++) {
    // Find the point ~windowDays ago
    const targetDate = new Date(series[i].date).getTime() - windowDays * 24 * 60 * 60 * 1000;
    let startIdx = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (new Date(series[j].date).getTime() <= targetDate) {
        startIdx = j;
        break;
      }
    }

    if (startIdx === 0 && i > 0) continue; // Not enough history

    const startValue = series[startIdx].value;
    const endValue = series[i].value;
    const actualYears =
      (new Date(series[i].date).getTime() - new Date(series[startIdx].date).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000);

    if (actualYears < windowYears * 0.9) continue; // Skip if window is too short

    const cagr = Math.pow(endValue / startValue, 1 / actualYears) - 1;
    results.push({ date: series[i].date, cagr });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Annual / Monthly Return Tables
// ---------------------------------------------------------------------------

/**
 * Compute annual returns from a price series.
 * Returns { "2020": 0.15, "2021": 0.28, ... }
 */
export function calculateAnnualReturns(series: PricePoint[]): Record<string, number> {
  const byYear: Record<string, { start: number; end: number }> = {};

  for (const point of series) {
    const year = point.date.slice(0, 4);
    if (!byYear[year]) {
      byYear[year] = { start: point.value, end: point.value };
    }
    byYear[year].end = point.value;
  }

  const result: Record<string, number> = {};
  for (const [year, { start, end }] of Object.entries(byYear)) {
    result[year] = start > 0 ? (end - start) / start : 0;
  }
  return result;
}

/**
 * Compute monthly returns from a price series.
 * Returns { "2020-01": 0.03, "2020-02": -0.05, ... }
 */
export function calculateMonthlyReturns(series: PricePoint[]): Record<string, number> {
  const byMonth: Record<string, { start: number; end: number }> = {};

  for (const point of series) {
    const month = point.date.slice(0, 7); // YYYY-MM
    if (!byMonth[month]) {
      byMonth[month] = { start: point.value, end: point.value };
    }
    byMonth[month].end = point.value;
  }

  const result: Record<string, number> = {};
  for (const [month, { start, end }] of Object.entries(byMonth)) {
    result[month] = start > 0 ? (end - start) / start : 0;
  }
  return result;
}

/**
 * Compute daily returns from a price series.
 */
export function calculateDailyReturns(series: PricePoint[]): number[] {
  const returns: number[] = [];
  for (let i = 1; i < series.length; i++) {
    const prev = series[i - 1].value;
    const curr = series[i].value;
    if (prev > 0) {
      returns.push((curr - prev) / prev);
    }
  }
  return returns;
}

// Suppress unused import warning — Decimal is used for precision in callers
void Decimal;
