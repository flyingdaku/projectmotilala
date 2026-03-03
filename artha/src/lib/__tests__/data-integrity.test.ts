import { describe, it, expect } from "vitest";
import { ANNUAL_RETURNS, AssetKey } from "../india-historical-data";

describe("Data Integrity & Isolation", () => {
    it("ensures Nifty 50 and Sensex are distinct and not proxies of each other", () => {
        // Find years where they have different returns
        let differences = 0;
        const years = Object.keys(ANNUAL_RETURNS).map(Number);

        for (const year of years) {
            const data = ANNUAL_RETURNS[year];
            if (data.nifty50 !== data.sensex && data.nifty50 !== 0 && data.sensex !== 0) {
                differences++;
            }
        }

        // They should differ in most years because they are different indices
        expect(differences).toBeGreaterThan(years.length * 0.5);
    });

    it("ensures debt returns are calibrated for Indian context (not US rates)", () => {
        const years = Object.keys(ANNUAL_RETURNS).map(Number);
        const lowRates = years.filter(y => ANNUAL_RETURNS[y].debt < 4.0);

        // India 13-week T-bills have rarely been below 4% in the last 30 years.
        // US rates were 0-2% for long periods. If we have many years < 4%, it's contaminated.
        expect(lowRates.length).toBeLessThanOrEqual(3);
    });

    it("ensures Nifty 500 is not a direct duplicate of Nifty 50 (Isolation check)", () => {
        const years = Object.keys(ANNUAL_RETURNS).map(Number).filter(y => y > 2005); // Modern era
        let identical = 0;

        for (const year of years) {
            if (ANNUAL_RETURNS[year].nifty50 === ANNUAL_RETURNS[year].nifty500) {
                identical++;
            }
        }

        // In the modern era, they should never be identical
        expect(identical).toBe(0);
    });

    it("ensures no year has exactly 0.0 for multiple major indices (Data Completeness)", () => {
        const years = Object.keys(ANNUAL_RETURNS).map(Number).filter(y => y > 2010);

        for (const year of years) {
            const data = ANNUAL_RETURNS[year];
            // If both are 0, the scraper likely failed for that year
            const bothZero = data.nifty50 === 0 && data.sensex === 0;
            expect(bothZero).toBe(false);
        }
    });
});
