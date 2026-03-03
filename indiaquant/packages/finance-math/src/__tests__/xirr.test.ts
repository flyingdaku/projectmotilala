import { describe, it, expect } from "vitest";
import { calculateXIRR, calculateCAGR, calculateAbsoluteReturn } from "../xirr";

describe("calculateXIRR", () => {
  it("returns null for fewer than 2 cashflows", () => {
    expect(calculateXIRR([{ date: "2022-01-01", amount: -1000 }])).toBeNull();
  });

  it("calculates XIRR for a simple 1-year investment", () => {
    // Invest ₹10,000 on Jan 1, get ₹11,200 on Dec 31 (~12% return)
    const cashflows = [
      { date: "2023-01-01", amount: -10000 },
      { date: "2023-12-31", amount: 11200 },
    ];
    const xirr = calculateXIRR(cashflows);
    expect(xirr).not.toBeNull();
    expect(xirr!).toBeCloseTo(0.12, 1);
  });

  it("calculates XIRR for monthly SIP", () => {
    // 12 monthly SIPs of ₹1,000, final value ₹13,000 after 1 year
    const cashflows: Array<{ date: string; amount: number }> = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2023, i, 1).toISOString().split("T")[0];
      cashflows.push({ date, amount: -1000 });
    }
    cashflows.push({ date: "2023-12-31", amount: 13000 });

    const xirr = calculateXIRR(cashflows);
    expect(xirr).not.toBeNull();
    expect(xirr!).toBeGreaterThan(0); // Should be positive return
  });

  it("returns negative XIRR for a losing investment", () => {
    const cashflows = [
      { date: "2023-01-01", amount: -10000 },
      { date: "2023-12-31", amount: 8000 }, // Lost ₹2,000
    ];
    const xirr = calculateXIRR(cashflows);
    expect(xirr).not.toBeNull();
    expect(xirr!).toBeLessThan(0);
  });
});

describe("calculateCAGR", () => {
  it("calculates CAGR correctly", () => {
    // ₹1,000 → ₹2,000 in 6 years ≈ 12.25% CAGR
    const cagr = calculateCAGR(1000, 2000, 6);
    expect(cagr).not.toBeNull();
    expect(cagr!).toBeCloseTo(0.1225, 3);
  });

  it("returns null for zero start value", () => {
    expect(calculateCAGR(0, 1000, 5)).toBeNull();
  });

  it("returns null for zero years", () => {
    expect(calculateCAGR(1000, 2000, 0)).toBeNull();
  });
});

describe("calculateAbsoluteReturn", () => {
  it("calculates positive absolute return", () => {
    const result = calculateAbsoluteReturn("10000", "12000");
    expect(result).toBeCloseTo(0.2, 4); // 20%
  });

  it("calculates negative absolute return", () => {
    const result = calculateAbsoluteReturn("10000", "8000");
    expect(result).toBeCloseTo(-0.2, 4); // -20%
  });

  it("returns 0 for zero invested", () => {
    expect(calculateAbsoluteReturn("0", "1000")).toBe(0);
  });
});
