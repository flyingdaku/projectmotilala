import { describe, it, expect } from "vitest";
import { calculateXIRR, calculateCAGR } from "../finance";

describe("calculateXIRR", () => {
    it("returns null for fewer than 2 cashflows", () => {
        expect(calculateXIRR([{ date: "2023-01-01", amount: -1000 }])).toBeNull();
    });

    it("calculates XIRR correctly for a simple 1-year investment", () => {
        // Invest 10000, get 11200 after 365.25 days -> ~12%
        const cashflows = [
            { date: "2023-01-01", amount: -10000 },
            { date: "2024-01-01", amount: 11200 },
        ];
        const xirr = calculateXIRR(cashflows);
        expect(xirr).not.toBeNull();
        expect(xirr! * 100).toBeCloseTo(12.0, 1);
    });

    it("calculates XIRR correctly for a losing investment", () => {
        const cashflows = [
            { date: "2023-01-01", amount: -10000 },
            { date: "2024-01-01", amount: 8000 },
        ];
        const xirr = calculateXIRR(cashflows);
        expect(xirr).not.toBeNull();
        expect(xirr!).toBeLessThan(0);
        expect(xirr! * 100).toBeCloseTo(-20.0, 1);
    });

    it("handles multiple cashflows correctly", () => {
        const cashflows = [
            { date: "2023-01-01", amount: -10000 },
            { date: "2023-07-01", amount: -10000 },
            { date: "2024-01-01", amount: 22000 },
        ];
        const xirr = calculateXIRR(cashflows);
        expect(xirr).not.toBeNull();
        expect(xirr!).toBeGreaterThan(0.1); // Roughly > 10% annualized
    });
});

describe("calculateCAGR", () => {
    it("calculates CAGR correctly for a doubling over 5 years", () => {
        // (2000/1000)^(1/5) - 1 = 14.87%
        const cagr = calculateCAGR(1000, 2000, 5);
        expect(cagr).not.toBeNull();
        expect(cagr! * 100).toBeCloseTo(14.87, 2);
    });

    it("returns null for invalid inputs", () => {
        expect(calculateCAGR(0, 1000, 5)).toBeNull();
        expect(calculateCAGR(1000, 1000, 0)).toBeNull();
        expect(calculateCAGR(-100, 100, 5)).toBeNull();
    });

    it("calculates negative CAGR correctly", () => {
        const cagr = calculateCAGR(1000, 500, 5);
        expect(cagr).not.toBeNull();
        expect(cagr!).toBeLessThan(0);
    });
});
