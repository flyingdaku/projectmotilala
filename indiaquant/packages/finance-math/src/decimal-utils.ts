import Decimal from "decimal.js";

/**
 * Decimal utility helpers.
 * Configure Decimal.js precision globally for financial calculations.
 * 20 significant digits is more than sufficient for INR amounts.
 */

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/** Convert a string or number to a Decimal safely. */
export function toDecimal(value: string | number): Decimal {
  return new Decimal(value);
}

/** Format a Decimal as an INR string, e.g. "₹1,23,456.78" */
export function formatINR(value: Decimal | string | number, decimals = 2): string {
  const d = new Decimal(value);
  const fixed = d.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  // Indian number system: last 3 digits, then groups of 2
  const lastThree = intPart.slice(-3);
  const remaining = intPart.slice(0, -3);
  const formatted =
    remaining.length > 0
      ? remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;
  return `₹${formatted}${decPart !== undefined ? "." + decPart : ""}`;
}

/** Format a number as a percentage string, e.g. "12.34%" */
export function formatPercent(value: Decimal | string | number, decimals = 2): string {
  const d = new Decimal(value);
  return `${d.mul(100).toFixed(decimals)}%`;
}

/** Add two decimal strings safely. */
export function decimalAdd(a: string, b: string): string {
  return new Decimal(a).plus(new Decimal(b)).toFixed(4);
}

/** Subtract b from a safely. */
export function decimalSub(a: string, b: string): string {
  return new Decimal(a).minus(new Decimal(b)).toFixed(4);
}

/** Multiply two decimal strings safely. */
export function decimalMul(a: string, b: string): string {
  return new Decimal(a).mul(new Decimal(b)).toFixed(4);
}

/** Divide a by b safely. Returns "0" if b is zero. */
export function decimalDiv(a: string, b: string): string {
  const divisor = new Decimal(b);
  if (divisor.isZero()) return "0";
  return new Decimal(a).div(divisor).toFixed(8);
}

/** Compare two decimal strings. Returns -1, 0, or 1. */
export function decimalCompare(a: string, b: string): -1 | 0 | 1 {
  return new Decimal(a).comparedTo(new Decimal(b)) as -1 | 0 | 1;
}

/** Returns the larger of two decimal strings. */
export function decimalMax(a: string, b: string): string {
  return Decimal.max(new Decimal(a), new Decimal(b)).toFixed(4);
}

/** Compute compound growth: principal * (1 + rate)^years */
export function compoundGrowth(
  principal: Decimal,
  annualRate: Decimal,
  years: Decimal
): Decimal {
  return principal.mul(annualRate.plus(1).pow(years));
}

/** Convert annual rate to monthly rate: (1 + annual)^(1/12) - 1 */
export function annualToMonthlyRate(annualRate: Decimal): Decimal {
  return annualRate.plus(1).pow(new Decimal(1).div(12)).minus(1);
}

export { Decimal };
