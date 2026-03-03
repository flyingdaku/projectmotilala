import Decimal from "decimal.js";
import { decimalMax } from "./decimal-utils";
import type { TaxLot, Transaction } from "@indiaquant/types";
import { TaxLotMethod } from "@indiaquant/types";

/**
 * India Tax Engine — FIFO/LIFO/Min-Gain lot matching for STCG/LTCG.
 *
 * Rules (as of FY 2024-25):
 * - Equity LTCG: >365 days, 12.5% tax, ₹1.25L annual exemption
 * - Equity STCG: ≤365 days, 20% tax
 * - Debt MF (post Apr 2023): slab rate, no indexation, no LTCG benefit
 * - ELSS: 3-year lock-in from purchase date
 * - Grandfathering: for equity bought before Jan 31 2018, cost = max(actual, Jan 31 2018 NAV)
 *
 * All monetary values use Decimal to prevent floating-point drift.
 */

export const LTCG_EXEMPTION_LIMIT = new Decimal("125000"); // ₹1.25L
export const LTCG_TAX_RATE = new Decimal("0.125"); // 12.5%
export const STCG_TAX_RATE = new Decimal("0.20"); // 20%
export const GRANDFATHERING_DATE = "2018-01-31";
export const EQUITY_LTCG_HOLDING_DAYS = 365;
export const ELSS_LOCK_IN_DAYS = 3 * 365; // 3 years

export interface TaxLotMatchResult {
  lotId: string;
  purchaseDate: string;
  saleDate: string;
  unitsSold: string;
  purchaseNav: string;
  saleNav: string;
  purchaseAmount: string;
  saleAmount: string;
  /** Effective cost after grandfathering (Jan 31 2018 rule) */
  effectiveCost: string;
  holdingPeriodDays: number;
  isLongTerm: boolean;
  gainLoss: string; // decimal string, can be negative
  taxType: "STCG" | "LTCG" | "DEBT_SLAB";
  applicableTaxRate: number;
}

export interface TaxSummaryResult {
  financialYear: string;
  totalLTCG: string;
  totalSTCG: string;
  ltcgExemptApplied: string;
  ltcgTaxable: string;
  stcgTaxable: string;
  estimatedLTCGTax: string;
  estimatedSTCGTax: string;
  lotMatches: TaxLotMatchResult[];
}

/**
 * Determine if a holding is equity (for LTCG/STCG rules).
 * Debt MFs post-April 2023 are taxed at slab rate.
 */
export function isEquityForTax(assetClass: string): boolean {
  const equityClasses = ["EQUITY_MF", "ELSS", "INDEX_FUND", "ETF", "DIRECT_EQUITY"];
  return equityClasses.includes(assetClass);
}

/**
 * Calculate holding period in days between two ISO date strings.
 */
export function holdingPeriodDays(purchaseDate: string, saleDate: string): number {
  const purchase = new Date(purchaseDate).getTime();
  const sale = new Date(saleDate).getTime();
  return Math.floor((sale - purchase) / (1000 * 60 * 60 * 24));
}

/**
 * Apply grandfathering rule: for equity bought before Jan 31 2018,
 * effective cost = max(actual purchase cost, Jan 31 2018 NAV × units).
 */
export function applyGrandfathering(
  purchaseDate: string,
  purchaseAmount: string,
  units: string,
  grandfatheredNav: string | null
): string {
  if (purchaseDate > GRANDFATHERING_DATE || grandfatheredNav === null) {
    return purchaseAmount;
  }
  const grandfatheredCost = new Decimal(units).mul(new Decimal(grandfatheredNav));
  return decimalMax(purchaseAmount, grandfatheredCost.toFixed(4));
}

/**
 * Sort tax lots according to the selected method.
 * - FIFO: oldest lots first
 * - LIFO: newest lots first
 * - MIN_GAIN: lots with smallest gain first (to minimize tax)
 */
export function sortLotsByMethod(
  lots: TaxLot[],
  method: TaxLotMethod,
  saleNav: string
): TaxLot[] {
  const sorted = [...lots];

  switch (method) {
    case TaxLotMethod.FIFO:
      return sorted.sort(
        (a, b) =>
          new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
      );

    case TaxLotMethod.LIFO:
      return sorted.sort(
        (a, b) =>
          new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
      );

    case TaxLotMethod.MIN_GAIN: {
      // Sort by gain per unit ascending (smallest gain = least tax)
      return sorted.sort((a, b) => {
        const gainA = new Decimal(saleNav).minus(new Decimal(a.purchase_nav)).toNumber();
        const gainB = new Decimal(saleNav).minus(new Decimal(b.purchase_nav)).toNumber();
        return gainA - gainB;
      });
    }

    default:
      return sorted;
  }
}

/**
 * Match a sale transaction against available tax lots.
 * Returns the lot matches and updated remaining lots.
 */
export function matchSaleToLots(
  saleTx: Pick<Transaction, "date" | "units" | "nav">,
  availableLots: TaxLot[],
  method: TaxLotMethod,
  assetClass: string
): { matches: TaxLotMatchResult[]; remainingLots: TaxLot[] } {
  const sortedLots = sortLotsByMethod(availableLots, method, saleTx.nav);
  const matches: TaxLotMatchResult[] = [];
  const updatedLots = sortedLots.map((lot) => ({ ...lot }));

  let unitsToSell = new Decimal(saleTx.units);

  for (const lot of updatedLots) {
    if (unitsToSell.isZero()) break;

    const lotUnits = new Decimal(lot.units);
    const unitsSoldFromLot = Decimal.min(unitsToSell, lotUnits);

    const purchaseAmount = unitsSoldFromLot.mul(new Decimal(lot.purchase_nav)).toFixed(4);
    const saleAmount = unitsSoldFromLot.mul(new Decimal(saleTx.nav)).toFixed(4);
    const effectiveCost = applyGrandfathering(
      lot.purchase_date,
      purchaseAmount,
      unitsSoldFromLot.toFixed(8),
      lot.grandfathered_nav
    );

    const gainLoss = new Decimal(saleAmount).minus(new Decimal(effectiveCost)).toFixed(4);
    const days = holdingPeriodDays(lot.purchase_date, saleTx.date);
    const isEquity = isEquityForTax(assetClass);
    const isLongTerm = isEquity && days > EQUITY_LTCG_HOLDING_DAYS;

    let taxType: TaxLotMatchResult["taxType"];
    let applicableTaxRate: number;

    if (!isEquity) {
      taxType = "DEBT_SLAB";
      applicableTaxRate = 0; // Slab rate — computed at user's income tax level
    } else if (isLongTerm) {
      taxType = "LTCG";
      applicableTaxRate = LTCG_TAX_RATE.toNumber();
    } else {
      taxType = "STCG";
      applicableTaxRate = STCG_TAX_RATE.toNumber();
    }

    matches.push({
      lotId: lot.id,
      purchaseDate: lot.purchase_date,
      saleDate: saleTx.date,
      unitsSold: unitsSoldFromLot.toFixed(8),
      purchaseNav: lot.purchase_nav,
      saleNav: saleTx.nav,
      purchaseAmount,
      saleAmount,
      effectiveCost,
      holdingPeriodDays: days,
      isLongTerm,
      gainLoss,
      taxType,
      applicableTaxRate,
    });

    // Reduce remaining units in this lot
    lot.units = lotUnits.minus(unitsSoldFromLot).toFixed(8);
    unitsToSell = unitsToSell.minus(unitsSoldFromLot);
  }

  // Filter out fully consumed lots
  const remainingLots = updatedLots.filter((lot) => new Decimal(lot.units).greaterThan(0));

  return { matches, remainingLots };
}

/**
 * Compute full tax summary for a financial year from lot matches.
 * Applies the ₹1.25L LTCG exemption.
 */
export function computeTaxSummary(
  financialYear: string,
  lotMatches: TaxLotMatchResult[]
): TaxSummaryResult {
  let totalLTCG = new Decimal(0);
  let totalSTCG = new Decimal(0);

  for (const match of lotMatches) {
    const gain = new Decimal(match.gainLoss);
    if (gain.isNegative()) continue; // Losses don't contribute to tax (can be set off separately)

    if (match.taxType === "LTCG") {
      totalLTCG = totalLTCG.plus(gain);
    } else if (match.taxType === "STCG") {
      totalSTCG = totalSTCG.plus(gain);
    }
  }

  // Apply ₹1.25L LTCG exemption
  const ltcgExemptApplied = Decimal.min(totalLTCG, LTCG_EXEMPTION_LIMIT);
  const ltcgTaxable = Decimal.max(new Decimal(0), totalLTCG.minus(ltcgExemptApplied));

  const estimatedLTCGTax = ltcgTaxable.mul(LTCG_TAX_RATE);
  const estimatedSTCGTax = totalSTCG.mul(STCG_TAX_RATE);

  return {
    financialYear,
    totalLTCG: totalLTCG.toFixed(2),
    totalSTCG: totalSTCG.toFixed(2),
    ltcgExemptApplied: ltcgExemptApplied.toFixed(2),
    ltcgTaxable: ltcgTaxable.toFixed(2),
    stcgTaxable: totalSTCG.toFixed(2),
    estimatedLTCGTax: estimatedLTCGTax.toFixed(2),
    estimatedSTCGTax: estimatedSTCGTax.toFixed(2),
    lotMatches,
  };
}

/**
 * Identify tax harvesting opportunities.
 * Returns lots that can be sold to realize the ₹1.25L LTCG exemption.
 * Sorted by gain descending — sell the most gain first to maximize exemption use.
 */
export function findHarvestingOpportunities(
  lots: TaxLot[],
  currentNavByHoldingId: Record<string, string>,
  assetClassByHoldingId: Record<string, string>,
  alreadyRealizedLTCG: string
): Array<{
  lot: TaxLot;
  unrealizedGain: string;
  holdingPeriodDays: number;
  isEligible: boolean; // >365 days holding
}> {
  const remainingExemption = LTCG_EXEMPTION_LIMIT.minus(new Decimal(alreadyRealizedLTCG));
  if (remainingExemption.isNegative() || remainingExemption.isZero()) return [];

  const today = new Date().toISOString().split("T")[0];

  return lots
    .map((lot) => {
      const currentNav = currentNavByHoldingId[lot.holding_id];
      const assetClass = assetClassByHoldingId[lot.holding_id];
      if (!currentNav || !isEquityForTax(assetClass)) return null;

      const days = holdingPeriodDays(lot.purchase_date, today);
      const currentValue = new Decimal(lot.units).mul(new Decimal(currentNav));
      const effectiveCost = applyGrandfathering(
        lot.purchase_date,
        new Decimal(lot.units).mul(new Decimal(lot.purchase_nav)).toFixed(4),
        lot.units,
        lot.grandfathered_nav
      );
      const unrealizedGain = currentValue.minus(new Decimal(effectiveCost));

      return {
        lot,
        unrealizedGain: unrealizedGain.toFixed(2),
        holdingPeriodDays: days,
        isEligible: days > EQUITY_LTCG_HOLDING_DAYS && unrealizedGain.isPositive(),
      };
    })
    .filter(
      (item): item is NonNullable<typeof item> =>
        item !== null && item.isEligible
    )
    .sort(
      (a, b) =>
        new Decimal(b.unrealizedGain).minus(new Decimal(a.unrealizedGain)).toNumber()
    );
}

/**
 * Calculate ELSS unlock dates and identify locked lots.
 */
export function getELSSStatus(lots: TaxLot[]): Array<{
  lot: TaxLot;
  unlockDate: string;
  isLocked: boolean;
  daysUntilUnlock: number;
}> {
  const today = new Date();

  return lots
    .filter((lot) => lot.is_elss)
    .map((lot) => {
      const purchaseDate = new Date(lot.purchase_date);
      const unlockDate = new Date(purchaseDate);
      unlockDate.setFullYear(unlockDate.getFullYear() + 3);

      const daysUntilUnlock = Math.ceil(
        (unlockDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        lot,
        unlockDate: unlockDate.toISOString().split("T")[0],
        isLocked: daysUntilUnlock > 0,
        daysUntilUnlock: Math.max(0, daysUntilUnlock),
      };
    });
}
