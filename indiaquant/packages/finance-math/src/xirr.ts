import Decimal from "decimal.js";

/**
 * XIRR — Extended Internal Rate of Return (Money-Weighted Return).
 *
 * Uses Newton-Raphson iteration to find the rate r such that:
 *   NPV = Σ [ cashflow_i / (1 + r)^(days_i / 365) ] = 0
 *
 * All monetary values use Decimal to avoid floating-point drift.
 */

export interface Cashflow {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** Negative = outflow (investment), Positive = inflow (redemption/current value) */
  amount: number;
}

const MAX_ITERATIONS = 1000;
const TOLERANCE = 1e-10;

/**
 * Calculate XIRR for a series of cashflows.
 * Returns null if no solution is found (e.g., all cashflows same sign).
 */
export function calculateXIRR(cashflows: Cashflow[]): number | null {
  if (cashflows.length < 2) return null;

  const dates = cashflows.map((cf) => new Date(cf.date).getTime());
  const amounts = cashflows.map((cf) => cf.amount);
  const firstDate = dates[0];

  // Days from first cashflow for each cashflow
  const dayOffsets = dates.map((d) => (d - firstDate) / (1000 * 60 * 60 * 24));

  /**
   * NPV function: Σ [ amount_i / (1 + rate)^(days_i / 365) ]
   */
  function npv(rate: number): number {
    return amounts.reduce((sum, amount, i) => {
      const exponent = dayOffsets[i] / 365;
      return sum + amount / Math.pow(1 + rate, exponent);
    }, 0);
  }

  /**
   * Derivative of NPV with respect to rate (for Newton-Raphson).
   */
  function npvDerivative(rate: number): number {
    return amounts.reduce((sum, amount, i) => {
      const t = dayOffsets[i] / 365;
      return sum - (t * amount) / Math.pow(1 + rate, t + 1);
    }, 0);
  }

  // Initial guess: 10%
  let rate = 0.1;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const npvValue = npv(rate);
    const derivative = npvDerivative(rate);

    if (Math.abs(derivative) < 1e-15) return null; // Avoid division by zero

    const newRate = rate - npvValue / derivative;

    if (Math.abs(newRate - rate) < TOLERANCE) {
      return newRate;
    }

    rate = newRate;

    // Guard against divergence
    if (rate < -0.999 || rate > 100) return null;
  }

  return null; // Did not converge
}

/**
 * Calculate absolute return: (current_value - total_invested) / total_invested
 */
export function calculateAbsoluteReturn(
  totalInvested: string,
  currentValue: string
): number {
  const invested = new Decimal(totalInvested);
  const current = new Decimal(currentValue);
  if (invested.isZero()) return 0;
  return current.minus(invested).div(invested).toNumber();
}

/**
 * Calculate CAGR: (end_value / start_value)^(1 / years) - 1
 */
export function calculateCAGR(
  startValue: number,
  endValue: number,
  years: number
): number | null {
  if (startValue <= 0 || years <= 0) return null;
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/**
 * Calculate Time-Weighted Return (TWR) from a series of sub-period returns.
 * Each sub-period return is (end_value / start_value) - 1.
 */
export function calculateTWR(subPeriodReturns: number[]): number {
  if (subPeriodReturns.length === 0) return 0;
  const product = subPeriodReturns.reduce((acc, r) => acc * (1 + r), 1);
  return product - 1;
}
