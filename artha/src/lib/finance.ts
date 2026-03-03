export interface Cashflow {
    date: string;
    amount: number;
}

/**
 * Calculate XIRR using Newton-Raphson method.
 */
export function calculateXIRR(cashflows: Cashflow[]): number | null {
    if (cashflows.length < 2) return null;

    const dates = cashflows.map((cf) => new Date(cf.date).getTime());
    const amounts = cashflows.map((cf) => cf.amount);
    const firstDate = dates[0];

    // Days from first cashflow
    const dayOffsets = dates.map((d) => (d - firstDate) / (1000 * 60 * 60 * 24));

    function npv(rate: number): number {
        return amounts.reduce((sum, amount, i) => {
            const exponent = dayOffsets[i] / 365.25;
            return sum + amount / Math.pow(1 + rate, exponent);
        }, 0);
    }

    function npvDerivative(rate: number): number {
        return amounts.reduce((sum, amount, i) => {
            const t = dayOffsets[i] / 365.25;
            return sum - (t * amount) / Math.pow(1 + rate, t + 1);
        }, 0);
    }

    let rate = 0.1; // Initial guess
    for (let i = 0; i < 100; i++) {
        const npvValue = npv(rate);
        const derivative = npvDerivative(rate);

        if (Math.abs(derivative) < 1e-15) break;

        const newRate = rate - npvValue / derivative;
        if (Math.abs(newRate - rate) < 1e-7) return newRate;
        rate = newRate;

        if (rate < -1) rate = -0.999;
    }

    return null;
}

/**
 * Calculate Compound Annual Growth Rate (CAGR).
 */
export function calculateCAGR(startValue: number, endValue: number, years: number): number | null {
    if (startValue <= 0 || years <= 0) return null;
    return Math.pow(endValue / startValue, 1 / years) - 1;
}
