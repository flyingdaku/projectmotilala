import Decimal from "decimal.js";
import { annualToMonthlyRate, compoundGrowth } from "./decimal-utils";
import type { SIPInput, SIPResult } from "@indiaquant/types";

/**
 * SIP (Systematic Investment Plan) calculations.
 * All math uses Decimal to avoid floating-point drift.
 */

/**
 * Calculate SIP returns with optional annual step-up.
 *
 * Formula for SIP future value (no step-up):
 *   FV = P * [ (1 + r)^n - 1 ] / r * (1 + r)
 * where r = monthly rate, n = total months, P = monthly SIP amount
 *
 * With step-up: recalculate each year with increased SIP amount.
 */
export function calculateSIP(input: SIPInput): SIPResult {
  const {
    monthly_amount,
    annual_step_up_percent,
    expected_return,
    years,
    inflation_rate,
  } = input;

  const monthlyRate = annualToMonthlyRate(new Decimal(expected_return));
  const monthlyInflationRate = annualToMonthlyRate(new Decimal(inflation_rate));

  let totalInvested = new Decimal(0);
  let portfolioValue = new Decimal(0);
  let currentMonthlyAmount = new Decimal(monthly_amount);

  const yearByYear: SIPResult["year_by_year"] = [];

  for (let year = 1; year <= years; year++) {
    // Step up at the start of each year (except year 1)
    if (year > 1 && annual_step_up_percent > 0) {
      currentMonthlyAmount = currentMonthlyAmount.mul(
        new Decimal(1).plus(new Decimal(annual_step_up_percent).div(100))
      );
    }

    // Compound existing portfolio for 12 months, add monthly contributions
    for (let month = 0; month < 12; month++) {
      portfolioValue = portfolioValue.mul(monthlyRate.plus(1)).plus(currentMonthlyAmount);
      totalInvested = totalInvested.plus(currentMonthlyAmount);
    }

    yearByYear.push({
      year,
      invested: totalInvested.toNumber(),
      value: portfolioValue.toNumber(),
      gains: portfolioValue.minus(totalInvested).toNumber(),
    });
  }

  // Inflation-adjusted final value
  const totalMonths = years * 12;
  const inflationFactor = monthlyInflationRate.plus(1).pow(totalMonths);
  const inflationAdjustedValue = portfolioValue.div(inflationFactor);

  return {
    total_invested: totalInvested.toNumber(),
    final_value: portfolioValue.toNumber(),
    total_gains: portfolioValue.minus(totalInvested).toNumber(),
    inflation_adjusted_value: inflationAdjustedValue.toNumber(),
    year_by_year: yearByYear,
  };
}

/**
 * Calculate lumpsum investment returns.
 */
export function calculateLumpsum(
  principal: number,
  annualReturn: number,
  years: number,
  inflationRate = 0.06
): {
  finalValue: number;
  totalGains: number;
  inflationAdjustedValue: number;
  cagr: number;
} {
  const p = new Decimal(principal);
  const r = new Decimal(annualReturn);
  const y = new Decimal(years);

  const finalValue = compoundGrowth(p, r, y);
  const totalGains = finalValue.minus(p);

  const inflationFactor = compoundGrowth(new Decimal(1), new Decimal(inflationRate), y);
  const inflationAdjustedValue = finalValue.div(inflationFactor);

  return {
    finalValue: finalValue.toNumber(),
    totalGains: totalGains.toNumber(),
    inflationAdjustedValue: inflationAdjustedValue.toNumber(),
    cagr: annualReturn,
  };
}

/**
 * Calculate ELSS Section 80C tax savings.
 * Returns annual tax saved based on income tax slab.
 */
export function calculateELSSTaxSaving(
  annualInvestment: number,
  taxSlab: 0.05 | 0.2 | 0.3
): {
  investmentCapped: number; // Max ₹1.5L under 80C
  taxSaved: number;
  effectiveCost: number; // Investment - tax saved
} {
  const MAX_80C = 150000; // ₹1.5 lakh
  const investmentCapped = Math.min(annualInvestment, MAX_80C);
  const taxSaved = new Decimal(investmentCapped).mul(taxSlab).toNumber();
  const effectiveCost = investmentCapped - taxSaved;

  return { investmentCapped, taxSaved, effectiveCost };
}
