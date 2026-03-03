import { describe, it, expect } from "vitest";
import {
  computeTaxSummary,
  matchSaleToLots,
  holdingPeriodDays,
  applyGrandfathering,
  findHarvestingOpportunities,
  LTCG_EXEMPTION_LIMIT,
  LTCG_TAX_RATE,
} from "../tax";
import { TaxLotMethod } from "@indiaquant/types";
import type { TaxLot, Transaction } from "@indiaquant/types";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const makeLot = (overrides: Partial<TaxLot> = {}): TaxLot => ({
  id: "lot-1",
  holding_id: "holding-1",
  transaction_id: "tx-1",
  purchase_date: "2022-01-01",
  units: "100",
  purchase_nav: "10",
  purchase_amount: "1000",
  grandfathered_nav: null,
  is_elss: false,
  elss_unlock_date: null,
  created_at: "2022-01-01T00:00:00Z",
  ...overrides,
});

const makeSale = (overrides: Partial<Pick<Transaction, "date" | "units" | "nav">> = {}) => ({
  date: "2023-06-01",
  units: "50",
  nav: "20",
  ...overrides,
});

// ---------------------------------------------------------------------------
// holdingPeriodDays
// ---------------------------------------------------------------------------

describe("holdingPeriodDays", () => {
  it("calculates correct days between two dates", () => {
    expect(holdingPeriodDays("2022-01-01", "2023-01-01")).toBe(365);
  });

  it("returns 0 for same date", () => {
    expect(holdingPeriodDays("2022-01-01", "2022-01-01")).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// applyGrandfathering
// ---------------------------------------------------------------------------

describe("applyGrandfathering", () => {
  it("returns purchase amount when purchase is after Jan 31 2018", () => {
    const result = applyGrandfathering("2019-01-01", "1000", "100", "15");
    expect(result).toBe("1000");
  });

  it("returns grandfathered cost when it is higher than purchase amount", () => {
    // Bought before Jan 31 2018, grandfathered NAV = 15, purchase NAV = 10
    // grandfathered cost = 100 units × 15 = 1500 > purchase amount 1000
    const result = applyGrandfathering("2017-01-01", "1000", "100", "15");
    expect(parseFloat(result)).toBeCloseTo(1500, 2);
  });

  it("returns purchase amount when it is higher than grandfathered cost", () => {
    // Bought before Jan 31 2018, grandfathered NAV = 5, purchase NAV = 10
    // grandfathered cost = 100 × 5 = 500 < purchase amount 1000
    const result = applyGrandfathering("2017-01-01", "1000", "100", "5");
    expect(parseFloat(result)).toBeCloseTo(1000, 2);
  });

  it("returns purchase amount when grandfatheredNav is null", () => {
    const result = applyGrandfathering("2017-01-01", "1000", "100", null);
    expect(result).toBe("1000");
  });
});

// ---------------------------------------------------------------------------
// matchSaleToLots — FIFO
// ---------------------------------------------------------------------------

describe("matchSaleToLots (FIFO)", () => {
  it("matches a partial sale to the oldest lot", () => {
    const lots = [
      makeLot({ id: "lot-1", purchase_date: "2022-01-01", units: "100", purchase_nav: "10" }),
      makeLot({ id: "lot-2", purchase_date: "2022-06-01", units: "100", purchase_nav: "12" }),
    ];

    const sale = makeSale({ units: "50", nav: "20", date: "2023-06-01" });
    const { matches, remainingLots } = matchSaleToLots(sale, lots, TaxLotMethod.FIFO, "EQUITY_MF");

    expect(matches).toHaveLength(1);
    expect(matches[0].lotId).toBe("lot-1");
    expect(matches[0].unitsSold).toBe("50.00000000");
    expect(remainingLots).toHaveLength(2);
    expect(parseFloat(remainingLots[0].units)).toBeCloseTo(50, 4);
  });

  it("spans multiple lots when sale exceeds first lot", () => {
    const lots = [
      makeLot({ id: "lot-1", purchase_date: "2022-01-01", units: "30", purchase_nav: "10" }),
      makeLot({ id: "lot-2", purchase_date: "2022-06-01", units: "100", purchase_nav: "12" }),
    ];

    const sale = makeSale({ units: "80", nav: "20", date: "2023-06-01" });
    const { matches, remainingLots } = matchSaleToLots(sale, lots, TaxLotMethod.FIFO, "EQUITY_MF");

    expect(matches).toHaveLength(2);
    expect(matches[0].lotId).toBe("lot-1");
    expect(parseFloat(matches[0].unitsSold)).toBeCloseTo(30, 4);
    expect(matches[1].lotId).toBe("lot-2");
    expect(parseFloat(matches[1].unitsSold)).toBeCloseTo(50, 4);
    // lot-1 fully consumed, lot-2 has 50 remaining
    expect(remainingLots).toHaveLength(1);
    expect(remainingLots[0].id).toBe("lot-2");
  });

  it("correctly classifies LTCG vs STCG", () => {
    const lots = [
      // Held > 365 days → LTCG
      makeLot({ id: "lot-ltcg", purchase_date: "2022-01-01", units: "100", purchase_nav: "10" }),
      // Held < 365 days → STCG
      makeLot({ id: "lot-stcg", purchase_date: "2023-05-01", units: "100", purchase_nav: "15" }),
    ];

    const sale = makeSale({ units: "100", nav: "20", date: "2023-06-01" });
    const { matches } = matchSaleToLots(sale, lots, TaxLotMethod.FIFO, "EQUITY_MF");

    expect(matches[0].taxType).toBe("LTCG");
    expect(matches[0].applicableTaxRate).toBeCloseTo(LTCG_TAX_RATE.toNumber(), 4);
  });
});

// ---------------------------------------------------------------------------
// computeTaxSummary
// ---------------------------------------------------------------------------

describe("computeTaxSummary", () => {
  it("applies ₹1.25L LTCG exemption correctly", () => {
    const matches = [
      {
        lotId: "lot-1",
        purchaseDate: "2022-01-01",
        saleDate: "2023-06-01",
        unitsSold: "100",
        purchaseNav: "10",
        saleNav: "20",
        purchaseAmount: "1000",
        saleAmount: "2000",
        effectiveCost: "1000",
        holdingPeriodDays: 516,
        isLongTerm: true,
        gainLoss: "1000", // ₹1,000 LTCG — within exemption
        taxType: "LTCG" as const,
        applicableTaxRate: 0.125,
      },
    ];

    const summary = computeTaxSummary("FY_2024_25", matches);

    expect(parseFloat(summary.totalLTCG)).toBeCloseTo(1000, 2);
    // ₹1000 < ₹1.25L exemption → fully exempt
    expect(parseFloat(summary.ltcgTaxable)).toBeCloseTo(0, 2);
    expect(parseFloat(summary.estimatedLTCGTax)).toBeCloseTo(0, 2);
  });

  it("taxes LTCG above ₹1.25L at 12.5%", () => {
    const bigGain = parseFloat(LTCG_EXEMPTION_LIMIT.toFixed(2)) + 50000; // ₹1.75L
    const matches = [
      {
        lotId: "lot-1",
        purchaseDate: "2022-01-01",
        saleDate: "2023-06-01",
        unitsSold: "100",
        purchaseNav: "10",
        saleNav: "20",
        purchaseAmount: "1000",
        saleAmount: "2000",
        effectiveCost: "1000",
        holdingPeriodDays: 516,
        isLongTerm: true,
        gainLoss: String(bigGain),
        taxType: "LTCG" as const,
        applicableTaxRate: 0.125,
      },
    ];

    const summary = computeTaxSummary("FY_2024_25", matches);

    expect(parseFloat(summary.ltcgTaxable)).toBeCloseTo(50000, 2);
    expect(parseFloat(summary.estimatedLTCGTax)).toBeCloseTo(50000 * 0.125, 2);
  });

  it("taxes STCG at 20%", () => {
    const matches = [
      {
        lotId: "lot-1",
        purchaseDate: "2023-05-01",
        saleDate: "2023-06-01",
        unitsSold: "100",
        purchaseNav: "10",
        saleNav: "15",
        purchaseAmount: "1000",
        saleAmount: "1500",
        effectiveCost: "1000",
        holdingPeriodDays: 31,
        isLongTerm: false,
        gainLoss: "500",
        taxType: "STCG" as const,
        applicableTaxRate: 0.2,
      },
    ];

    const summary = computeTaxSummary("FY_2024_25", matches);

    expect(parseFloat(summary.totalSTCG)).toBeCloseTo(500, 2);
    expect(parseFloat(summary.estimatedSTCGTax)).toBeCloseTo(100, 2); // 500 × 20%
  });

  it("does not include losses in tax calculation", () => {
    const matches = [
      {
        lotId: "lot-1",
        purchaseDate: "2022-01-01",
        saleDate: "2023-06-01",
        unitsSold: "100",
        purchaseNav: "20",
        saleNav: "10",
        purchaseAmount: "2000",
        saleAmount: "1000",
        effectiveCost: "2000",
        holdingPeriodDays: 516,
        isLongTerm: true,
        gainLoss: "-1000", // Loss
        taxType: "LTCG" as const,
        applicableTaxRate: 0.125,
      },
    ];

    const summary = computeTaxSummary("FY_2024_25", matches);

    expect(parseFloat(summary.totalLTCG)).toBeCloseTo(0, 2);
    expect(parseFloat(summary.estimatedLTCGTax)).toBeCloseTo(0, 2);
  });
});

// ---------------------------------------------------------------------------
// findHarvestingOpportunities
// ---------------------------------------------------------------------------

describe("findHarvestingOpportunities", () => {
  it("returns only LTCG-eligible lots (>365 days)", () => {
    const lots: TaxLot[] = [
      makeLot({
        id: "lot-eligible",
        holding_id: "holding-1",
        purchase_date: "2022-01-01", // >365 days ago
        units: "100",
        purchase_nav: "10",
        purchase_amount: "1000",
      }),
      makeLot({
        id: "lot-too-recent",
        holding_id: "holding-1",
        purchase_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 30 days ago
        units: "100",
        purchase_nav: "10",
        purchase_amount: "1000",
      }),
    ];

    const currentNav = { "holding-1": "20" };
    const assetClass = { "holding-1": "EQUITY_MF" };

    const opportunities = findHarvestingOpportunities(lots, currentNav, assetClass, "0");

    expect(opportunities).toHaveLength(1);
    expect(opportunities[0].lot.id).toBe("lot-eligible");
    expect(opportunities[0].isEligible).toBe(true);
  });
});
