(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/india-historical-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * India Historical Asset Class Data
 * Annual returns (calendar year) for major Indian asset classes
 * Sources: NSE, AMFI, RBI DBIE, MCX (approximated from public data)
 */ __turbopack_context__.s([
    "ANNUAL_RETURNS",
    ()=>ANNUAL_RETURNS,
    "ASSET_LABELS",
    ()=>ASSET_LABELS,
    "END_YEAR",
    ()=>END_YEAR,
    "INDIA_CPI",
    ()=>INDIA_CPI,
    "MF_CATEGORIES",
    ()=>MF_CATEGORIES,
    "START_YEAR",
    ()=>START_YEAR,
    "assetCorrelation",
    ()=>assetCorrelation,
    "assetMeanStdDev",
    ()=>assetMeanStdDev,
    "computeAssetMetrics",
    ()=>computeAssetMetrics,
    "computeCAGR",
    ()=>computeCAGR,
    "computeCorpus",
    ()=>computeCorpus,
    "computeLumpSumReturns",
    ()=>computeLumpSumReturns,
    "computeRollingStats",
    ()=>computeRollingStats,
    "computeSIPReturns",
    ()=>computeSIPReturns,
    "computeSmartSIPReturns",
    ()=>computeSmartSIPReturns,
    "computeTopDrawdowns",
    ()=>computeTopDrawdowns,
    "rollingReturns",
    ()=>rollingReturns,
    "runBacktest",
    ()=>runBacktest
]);
const ASSET_LABELS = {
    nifty50: "Nifty 50",
    nifty500: "Nifty 500",
    niftyMidcap: "Nifty Midcap 150",
    gold: "Gold (MCX)",
    debt: "Short Duration Debt",
    balanced: "Balanced 60/40",
    sensex: "BSE Sensex"
};
const ANNUAL_RETURNS = {
    1990: {
        nifty50: 22.0,
        nifty500: 20.0,
        niftyMidcap: 18.0,
        gold: 7.0,
        debt: 11.0,
        balanced: 16.4
    },
    1991: {
        nifty50: 82.0,
        nifty500: 75.0,
        niftyMidcap: 70.0,
        gold: 12.0,
        debt: 12.0,
        balanced: 49.8
    },
    1992: {
        nifty50: -40.0,
        nifty500: -42.0,
        niftyMidcap: -45.0,
        gold: -5.0,
        debt: 11.0,
        balanced: -21.2
    },
    1993: {
        nifty50: 28.0,
        nifty500: 30.0,
        niftyMidcap: 35.0,
        gold: 8.0,
        debt: 10.0,
        balanced: 22.0
    },
    1994: {
        nifty50: 10.0,
        nifty500: 8.0,
        niftyMidcap: 5.0,
        gold: -2.0,
        debt: 10.0,
        balanced: 8.8
    },
    1995: {
        nifty50: -21.0,
        nifty500: -22.0,
        niftyMidcap: -25.0,
        gold: 1.0,
        debt: 11.0,
        balanced: -8.8
    },
    1996: {
        nifty50: -1.0,
        nifty500: -2.0,
        niftyMidcap: -5.0,
        gold: -5.0,
        debt: 11.0,
        balanced: 3.2
    },
    1997: {
        nifty50: 18.0,
        nifty500: 15.0,
        niftyMidcap: 10.0,
        gold: -15.0,
        debt: 10.0,
        balanced: 13.0
    },
    1998: {
        nifty50: -16.0,
        nifty500: -18.0,
        niftyMidcap: -22.0,
        gold: -1.0,
        debt: 10.0,
        balanced: -6.8
    },
    1999: {
        nifty50: 64.0,
        nifty500: 70.0,
        niftyMidcap: 80.0,
        gold: 3.0,
        debt: 9.0,
        balanced: 45.6
    },
    2000: {
        nifty50: -24.0,
        nifty500: -28.0,
        niftyMidcap: -35.0,
        gold: -5.0,
        debt: 9.0,
        balanced: -13.2
    },
    2001: {
        nifty50: -16.0,
        nifty500: -18.0,
        niftyMidcap: -22.0,
        gold: 3.0,
        debt: 8.5,
        balanced: -7.4
    },
    2002: {
        nifty50: 3.0,
        nifty500: 2.0,
        niftyMidcap: 0.0,
        gold: 25.0,
        debt: 8.0,
        balanced: 4.4
    },
    2003: {
        nifty50: 72.0,
        nifty500: 80.0,
        niftyMidcap: 110.0,
        gold: 13.0,
        debt: 7.5,
        balanced: 51.0
    },
    2004: {
        nifty50: 10.0,
        nifty500: 15.0,
        niftyMidcap: 22.0,
        gold: 1.0,
        debt: 7.0,
        balanced: 11.8
    },
    2005: {
        nifty50: 36.0,
        nifty500: 40.0,
        niftyMidcap: 55.0,
        gold: 9.0,
        debt: 7.0,
        balanced: 26.8
    },
    2006: {
        nifty50: 39.0,
        nifty500: 42.0,
        niftyMidcap: 50.0,
        gold: 20.0,
        debt: 7.5,
        balanced: 28.2
    },
    2007: {
        nifty50: 54.0,
        nifty500: 58.0,
        niftyMidcap: 70.0,
        gold: 16.0,
        debt: 7.5,
        balanced: 37.8
    },
    2008: {
        nifty50: -52.0,
        nifty500: -55.0,
        niftyMidcap: -65.0,
        gold: 28.0,
        debt: 8.0,
        balanced: -29.8
    },
    2009: {
        nifty50: 76.0,
        nifty500: 80.0,
        niftyMidcap: 100.0,
        gold: 18.0,
        debt: 7.0,
        balanced: 50.8
    },
    2010: {
        nifty50: 18.0,
        nifty500: 20.0,
        niftyMidcap: 22.0,
        gold: 24.0,
        debt: 7.0,
        balanced: 14.8
    },
    2011: {
        nifty50: -25.0,
        nifty500: -27.0,
        niftyMidcap: -35.0,
        gold: 32.0,
        debt: 8.5,
        balanced: -12.8
    },
    2012: {
        nifty50: 28.0,
        nifty500: 30.0,
        niftyMidcap: 35.0,
        gold: 10.0,
        debt: 9.0,
        balanced: 21.6
    },
    2013: {
        nifty50: 7.0,
        nifty500: 5.0,
        niftyMidcap: -5.0,
        gold: -18.0,
        debt: 9.0,
        balanced: 6.6
    },
    2014: {
        nifty50: 31.0,
        nifty500: 35.0,
        niftyMidcap: 55.0,
        gold: -6.0,
        debt: 9.5,
        balanced: 24.8
    },
    2015: {
        nifty50: -4.0,
        nifty500: -3.0,
        niftyMidcap: 8.0,
        gold: -6.0,
        debt: 8.5,
        balanced: 1.6
    },
    2016: {
        nifty50: 3.0,
        nifty500: 2.0,
        niftyMidcap: 7.0,
        gold: 11.0,
        debt: 8.0,
        balanced: 4.4
    },
    2017: {
        nifty50: 29.0,
        nifty500: 35.0,
        niftyMidcap: 48.0,
        gold: 5.0,
        debt: 7.0,
        balanced: 23.8
    },
    2018: {
        nifty50: 3.0,
        nifty500: -3.0,
        niftyMidcap: -15.0,
        gold: 7.0,
        debt: 7.5,
        balanced: 1.2
    },
    2019: {
        nifty50: 12.0,
        nifty500: 8.0,
        niftyMidcap: -5.0,
        gold: 25.0,
        debt: 8.0,
        balanced: 8.0
    },
    2020: {
        nifty50: 15.0,
        nifty500: 18.0,
        niftyMidcap: 22.0,
        gold: 28.0,
        debt: 7.0,
        balanced: 13.6
    },
    2021: {
        nifty50: 24.0,
        nifty500: 30.0,
        niftyMidcap: 45.0,
        gold: -4.0,
        debt: 6.5,
        balanced: 20.6
    },
    2022: {
        nifty50: 4.0,
        nifty500: 2.0,
        niftyMidcap: -5.0,
        gold: 12.0,
        debt: 6.0,
        balanced: 3.6
    },
    2023: {
        nifty50: 20.0,
        nifty500: 25.0,
        niftyMidcap: 45.0,
        gold: 14.0,
        debt: 7.0,
        balanced: 17.8
    },
    2024: {
        nifty50: 8.0,
        nifty500: 12.0,
        niftyMidcap: 5.0,
        gold: 20.0,
        debt: 7.5,
        balanced: 10.2
    }
};
const INDIA_CPI = {
    1990: 9.0,
    1991: 13.9,
    1992: 11.8,
    1993: 6.4,
    1994: 10.2,
    1995: 10.2,
    1996: 9.0,
    1997: 7.2,
    1998: 13.2,
    1999: 4.7,
    2000: 4.0,
    2001: 3.7,
    2002: 4.3,
    2003: 3.8,
    2004: 3.8,
    2005: 4.2,
    2006: 5.8,
    2007: 6.4,
    2008: 8.3,
    2009: 10.9,
    2010: 12.1,
    2011: 8.9,
    2012: 9.3,
    2013: 10.9,
    2014: 6.4,
    2015: 4.9,
    2016: 4.5,
    2017: 3.3,
    2018: 3.9,
    2019: 4.8,
    2020: 6.2,
    2021: 5.5,
    2022: 6.7,
    2023: 5.4,
    2024: 4.8
};
const START_YEAR = 1990;
const END_YEAR = 2024;
function computeCAGR(asset, startYear, holdingYears, inflationAdjusted = false) {
    const endYear = startYear + holdingYears - 1;
    if (endYear > END_YEAR) return null;
    if (startYear < START_YEAR) return null;
    let corpus = 100000; // ₹1L
    for(let y = startYear; y <= endYear; y++){
        const ret = ANNUAL_RETURNS[y]?.[asset];
        if (ret === undefined) return null;
        let adjustedRet = ret;
        if (inflationAdjusted) {
            const cpi = INDIA_CPI[y] ?? 6;
            adjustedRet = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
        }
        corpus *= 1 + adjustedRet / 100;
    }
    const cagr = (Math.pow(corpus / 100000, 1 / holdingYears) - 1) * 100;
    return Math.round(cagr * 10) / 10;
}
function computeCorpus(asset, startYear, holdingYears) {
    const endYear = startYear + holdingYears - 1;
    if (endYear > END_YEAR || startYear < START_YEAR) return null;
    let corpus = 100000;
    for(let y = startYear; y <= endYear; y++){
        const ret = ANNUAL_RETURNS[y]?.[asset];
        if (ret === undefined) return null;
        corpus *= 1 + ret / 100;
    }
    return Math.round(corpus);
}
function computeSIPReturns(asset, startYear, years, sipAmount, stepUpPercent = 0) {
    const endYear = startYear + years - 1;
    if (endYear > END_YEAR || startYear < START_YEAR) return null;
    let corpus = 0;
    let totalInvested = 0;
    let currentSIP = sipAmount;
    for(let y = startYear; y <= endYear; y++){
        const annualRet = ANNUAL_RETURNS[y]?.[asset];
        if (annualRet === undefined) return null;
        const monthlyRet = Math.pow(1 + annualRet / 100, 1 / 12) - 1;
        // Add 12 monthly SIPs for this year
        for(let m = 0; m < 12; m++){
            corpus += currentSIP;
            totalInvested += currentSIP;
            corpus *= 1 + monthlyRet;
        }
        // Step-up SIP at year boundary
        if (stepUpPercent > 0) {
            currentSIP *= 1 + stepUpPercent / 100;
        }
    }
    // Approximate XIRR as CAGR on invested amount
    const xirr = (Math.pow(corpus / totalInvested, 1 / years) - 1) * 100;
    return {
        corpus: Math.round(corpus),
        totalInvested: Math.round(totalInvested),
        xirr: Math.round(xirr * 10) / 10
    };
}
function computeLumpSumReturns(asset, startYear, years, amount) {
    const cagr = computeCAGR(asset, startYear, years);
    if (cagr === null) return null;
    const corpus = Math.round(amount * Math.pow(1 + cagr / 100, years));
    return {
        corpus,
        cagr
    };
}
// Risk-free rate proxy by year
const RISK_FREE_RATE = {
    1990: 10,
    1991: 11,
    1992: 11,
    1993: 10,
    1994: 10,
    1995: 11,
    1996: 11,
    1997: 10,
    1998: 10,
    1999: 9,
    2000: 9,
    2001: 8.5,
    2002: 8,
    2003: 7.5,
    2004: 7,
    2005: 7,
    2006: 7.5,
    2007: 7.5,
    2008: 8,
    2009: 7,
    2010: 7,
    2011: 8.5,
    2012: 9,
    2013: 9,
    2014: 9.5,
    2015: 8.5,
    2016: 8,
    2017: 7,
    2018: 7.5,
    2019: 8,
    2020: 7,
    2021: 6.5,
    2022: 6,
    2023: 7,
    2024: 7.5
};
function portfolioAnnualReturn(allocations, year) {
    const totalWeight = allocations.reduce((s, a)=>s + a.weight, 0);
    if (totalWeight === 0) return 0;
    return allocations.reduce((ret, alloc)=>{
        const assetRet = ANNUAL_RETURNS[year]?.[alloc.asset] ?? 0;
        return ret + alloc.weight / totalWeight * assetRet;
    }, 0);
}
function computeAssetMetrics(asset, startYear, endYear, inflationAdjusted = false) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i);
    if (years.length === 0) return null;
    let value = 100000;
    let peakValue = value;
    let maxDrawdown = 0;
    let bestYear = -Infinity;
    let worstYear = Infinity;
    const returns = [];
    for (const year of years){
        let ret = ANNUAL_RETURNS[year]?.[asset] ?? 0;
        if (inflationAdjusted) {
            const cpi = INDIA_CPI[year] ?? 6;
            ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
        }
        value *= 1 + ret / 100;
        returns.push(ret);
        peakValue = Math.max(peakValue, value);
        const dd = (value - peakValue) / peakValue * 100;
        maxDrawdown = Math.min(maxDrawdown, dd);
        bestYear = Math.max(bestYear, ret);
        worstYear = Math.min(worstYear, ret);
    }
    const cagr = (Math.pow(value / 100000, 1 / years.length) - 1) * 100;
    const mean = returns.reduce((a, b)=>a + b, 0) / returns.length;
    const stdDev = Math.sqrt(returns.reduce((a, b)=>a + Math.pow(b - mean, 2), 0) / returns.length);
    // Sharpe & Sortino (Simplified, assumes 6% Risk Free Rate)
    const rf = 6;
    const sharpe = stdDev > 0 ? (cagr - rf) / stdDev : 0;
    const negativeReturns = returns.filter((r)=>r < 0);
    const downsideDev = negativeReturns.length > 0 ? Math.sqrt(negativeReturns.reduce((a, b)=>a + Math.pow(b, 2), 0) / returns.length) : 0;
    const sortino = downsideDev > 0 ? (cagr - rf) / downsideDev : 0;
    return {
        cagr: Math.round(cagr * 100) / 100,
        stdDev: Math.round(stdDev * 100) / 100,
        bestYear: Math.round(bestYear * 100) / 100,
        worstYear: Math.round(worstYear * 100) / 100,
        maxDrawdown: Math.round(maxDrawdown * 100) / 100,
        sharpe: Math.round(sharpe * 100) / 100,
        sortino: Math.round(sortino * 100) / 100
    };
}
function computeTopDrawdowns(allocations, startYear, endYear, limit = 10, inflationAdjusted = false) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i);
    if (years.length === 0) return [];
    let value = 100000;
    let peakValue = value;
    let peakYear = startYear - 1;
    const drawdowns = [];
    let currentDrawdown = null;
    for (const year of years){
        let ret = portfolioAnnualReturn(allocations, year);
        if (inflationAdjusted) {
            const cpi = INDIA_CPI[year] ?? 6;
            ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
        }
        value *= 1 + ret / 100;
        if (value > peakValue) {
            peakValue = value;
            peakYear = year;
            if (currentDrawdown) {
                currentDrawdown.recoveryYear = year;
                drawdowns.push(currentDrawdown);
                currentDrawdown = null;
            }
        } else if (value < peakValue) {
            const depth = (value - peakValue) / peakValue * 100;
            if (!currentDrawdown) {
                currentDrawdown = {
                    startYear: peakYear,
                    endYear: year,
                    depth,
                    durationYears: year - peakYear
                };
            } else {
                currentDrawdown.endYear = year;
                currentDrawdown.depth = Math.min(currentDrawdown.depth, depth);
                currentDrawdown.durationYears = year - currentDrawdown.startYear;
            }
        }
    }
    // Push unrecovered drawdown
    if (currentDrawdown) {
        drawdowns.push(currentDrawdown);
    }
    return drawdowns.sort((a, b)=>a.depth - b.depth) // Sort ascending by depth (most negative first)
    .slice(0, limit).map((d)=>({
            ...d,
            depth: Math.round(d.depth * 100) / 100
        }));
}
function computeRollingStats(allocations, startYear, endYear, periods = [
    1,
    3,
    5,
    7,
    10
], inflationAdjusted = false) {
    return periods.map((period)=>{
        const rolls = rollingReturns(allocations, startYear, endYear, period, undefined, inflationAdjusted);
        if (rolls.length === 0) return {
            period,
            average: 0,
            high: 0,
            low: 0
        };
        const cagrs = rolls.map((r)=>r.cagr);
        const average = cagrs.reduce((a, b)=>a + b, 0) / cagrs.length;
        const high = Math.max(...cagrs);
        const low = Math.min(...cagrs);
        return {
            period,
            average: Math.round(average * 100) / 100,
            high: Math.round(high * 100) / 100,
            low: Math.round(low * 100) / 100
        };
    });
}
// Helper to calculate Beta, Alpha, R2
function calculateRegressionStats(portReturns, bmReturns) {
    if (portReturns.length < 2 || bmReturns.length < 2) return {
        beta: 0,
        alpha: 0,
        rSquared: 0
    };
    const n = portReturns.length;
    const sumX = bmReturns.reduce((a, b)=>a + b, 0);
    const sumY = portReturns.reduce((a, b)=>a + b, 0);
    const sumXY = portReturns.reduce((acc, y, i)=>acc + y * bmReturns[i], 0);
    const sumX2 = bmReturns.reduce((acc, x)=>acc + x * x, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;
    const ssX = sumX2 - sumX * sumX / n;
    const ssXY = sumXY - sumX * sumY / n;
    const beta = ssX !== 0 ? ssXY / ssX : 0;
    const alpha = meanY - beta * meanX;
    // R-squared
    const sst = portReturns.reduce((acc, y)=>acc + Math.pow(y - meanY, 2), 0);
    const ssr = portReturns.reduce((acc, y, i)=>acc + Math.pow(y - (alpha + beta * bmReturns[i]), 2), 0);
    const rSquared = sst !== 0 ? (1 - ssr / sst) * 100 : 0;
    return {
        beta,
        alpha,
        rSquared
    };
}
function runBacktest(config) {
    const { allocations, startYear, endYear, initialAmount, mode, sipAmount = 10000, stepUpPct = 0, benchmark, inflationAdjusted = false } = config;
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i);
    let value = mode === "lumpsum" ? initialAmount : 0;
    let bmValue = mode === "lumpsum" ? initialAmount : 0;
    let totalInvested = mode === "lumpsum" ? initialAmount : 0;
    let currentSIP = sipAmount;
    let peakValue = value;
    let bmPeakValue = bmValue;
    const yearlyData = [];
    const annualReturns = [];
    const bmAnnualReturns = [];
    for (const year of years){
        if (mode === "sip") {
            const yearSIP = currentSIP * 12;
            value += yearSIP;
            bmValue += yearSIP;
            totalInvested += yearSIP;
            if (stepUpPct > 0) currentSIP *= 1 + stepUpPct / 100;
        }
        let ret = portfolioAnnualReturn(allocations, year);
        if (inflationAdjusted) {
            const cpi = INDIA_CPI[year] ?? 6;
            ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
        }
        value *= 1 + ret / 100;
        annualReturns.push(ret);
        peakValue = Math.max(peakValue, value);
        const drawdown = (value - peakValue) / peakValue * 100;
        const point = {
            year,
            value: Math.round(value),
            annualReturn: Math.round(ret * 10) / 10,
            drawdown: Math.round(drawdown * 10) / 10
        };
        if (benchmark) {
            let bmRet = ANNUAL_RETURNS[year]?.[benchmark] ?? 0;
            if (inflationAdjusted) {
                const cpi = INDIA_CPI[year] ?? 6;
                bmRet = ((1 + bmRet / 100) / (1 + cpi / 100) - 1) * 100;
            }
            bmValue *= 1 + bmRet / 100;
            bmAnnualReturns.push(bmRet);
            bmPeakValue = Math.max(bmPeakValue, bmValue);
            point.benchmarkValue = Math.round(bmValue);
            point.benchmarkReturn = Math.round(bmRet * 10) / 10;
            point.benchmarkDrawdown = Math.round((bmValue - bmPeakValue) / bmPeakValue * 1000) / 10;
        }
        yearlyData.push(point);
    }
    const numYears = years.length;
    const base = mode === "lumpsum" ? initialAmount : totalInvested;
    const cagr = numYears > 0 ? (Math.pow(value / base, 1 / numYears) - 1) * 100 : 0;
    const bmCagr = benchmark && numYears > 0 ? (Math.pow(bmValue / base, 1 / numYears) - 1) * 100 : undefined;
    const totalReturn = (value - base) / base * 100;
    const avgRet = annualReturns.reduce((s, r)=>s + r, 0) / Math.max(annualReturns.length, 1);
    const avgRf = years.reduce((s, y)=>s + (RISK_FREE_RATE[y] ?? 7), 0) / Math.max(years.length, 1);
    const variance = annualReturns.reduce((s, r)=>s + Math.pow(r - avgRet, 2), 0) / Math.max(annualReturns.length - 1, 1);
    const stdDev = Math.sqrt(variance);
    const sharpe = stdDev > 0 ? (avgRet - avgRf) / stdDev : 0;
    const downReturns = annualReturns.filter((r)=>r < avgRf);
    const downsideVar = downReturns.length > 0 ? downReturns.reduce((s, r)=>s + Math.pow(r - avgRf, 2), 0) / downReturns.length : 0;
    const sortino = Math.sqrt(downsideVar) > 0 ? (avgRet - avgRf) / Math.sqrt(downsideVar) : 0;
    const maxDrawdown = Math.min(...yearlyData.map((d)=>d.drawdown));
    const calmar = maxDrawdown < 0 ? cagr / Math.abs(maxDrawdown) : 0;
    const bestYearReturn = Math.max(...annualReturns);
    const worstYearReturn = Math.min(...annualReturns);
    const positiveYears = annualReturns.filter((r)=>r > 0).length;
    const negativeYears = annualReturns.filter((r)=>r < 0).length;
    // New Metrics
    let activeReturn, beta, alpha, rSquared, upsideCapture, downsideCapture, trackingError, informationRatio, bmMaxDrawdown, bmStdDev;
    if (benchmark && bmAnnualReturns.length > 0) {
        activeReturn = cagr - (bmCagr ?? 0);
        bmMaxDrawdown = Math.min(...yearlyData.map((d)=>d.benchmarkDrawdown ?? 0));
        const bmAvgRet = bmAnnualReturns.reduce((s, r)=>s + r, 0) / bmAnnualReturns.length;
        bmStdDev = Math.sqrt(bmAnnualReturns.reduce((s, r)=>s + Math.pow(r - bmAvgRet, 2), 0) / Math.max(bmAnnualReturns.length - 1, 1));
        const reg = calculateRegressionStats(annualReturns, bmAnnualReturns);
        beta = reg.beta;
        alpha = reg.alpha;
        rSquared = reg.rSquared;
        const upMonths = bmAnnualReturns.map((r, i)=>r > 0 ? {
                p: annualReturns[i],
                b: r
            } : null).filter(Boolean);
        const downMonths = bmAnnualReturns.map((r, i)=>r <= 0 ? {
                p: annualReturns[i],
                b: r
            } : null).filter(Boolean);
        const avgPortUp = upMonths.reduce((s, m)=>s + m.p, 0) / Math.max(upMonths.length, 1);
        const avgBmUp = upMonths.reduce((s, m)=>s + m.b, 0) / Math.max(upMonths.length, 1);
        upsideCapture = avgBmUp > 0 ? avgPortUp / avgBmUp * 100 : 0;
        const avgPortDown = downMonths.reduce((s, m)=>s + m.p, 0) / Math.max(downMonths.length, 1);
        const avgBmDown = downMonths.reduce((s, m)=>s + m.b, 0) / Math.max(downMonths.length, 1);
        downsideCapture = avgBmDown < 0 ? avgPortDown / avgBmDown * 100 : 0;
        const activeReturnsList = annualReturns.map((r, i)=>r - bmAnnualReturns[i]);
        const avgActive = activeReturnsList.reduce((s, r)=>s + r, 0) / activeReturnsList.length;
        trackingError = Math.sqrt(activeReturnsList.reduce((s, r)=>s + Math.pow(r - avgActive, 2), 0) / Math.max(activeReturnsList.length - 1, 1));
        informationRatio = trackingError > 0 ? avgActive / trackingError : 0;
    }
    // VaR 5% calculation
    const sortedReturns = [
        ...annualReturns
    ].sort((a, b)=>a - b);
    const varIndex = Math.floor(sortedReturns.length * 0.05);
    const var5 = sortedReturns.length > 0 ? sortedReturns[varIndex] : 0;
    // CVaR 5%
    const cvarReturns = sortedReturns.slice(0, Math.max(varIndex, 1));
    const cvar5 = cvarReturns.length > 0 ? cvarReturns.reduce((s, r)=>s + r, 0) / cvarReturns.length : 0;
    // Skewness and Kurtosis
    let skewness = 0;
    let kurtosis = 0;
    if (annualReturns.length > 2 && stdDev > 0) {
        const n = annualReturns.length;
        const mean = avgRet;
        const m3 = annualReturns.reduce((s, r)=>s + Math.pow(r - mean, 3), 0) / n;
        const m4 = annualReturns.reduce((s, r)=>s + Math.pow(r - mean, 4), 0) / n;
        skewness = m3 / Math.pow(stdDev, 3);
        kurtosis = m4 / Math.pow(stdDev, 4) - 3; // Excess kurtosis
    }
    // Treynor Ratio
    const treynor = beta && beta > 0 ? (cagr - avgRf) / beta : 0;
    // Downside Deviation (already calculated for Sortino)
    const downsideDev = Math.sqrt(downsideVar);
    // Gain/Loss Ratio
    const avgWin = positiveYears > 0 ? annualReturns.filter((r)=>r > 0).reduce((s, r)=>s + r, 0) / positiveYears : 0;
    const avgLoss = negativeYears > 0 ? Math.abs(annualReturns.filter((r)=>r < 0).reduce((s, r)=>s + r, 0) / negativeYears) : 0;
    const gainLossRatio = avgLoss > 0 ? avgWin / avgLoss : 0;
    return {
        yearlyData,
        cagr: Math.round(cagr * 100) / 100,
        totalReturn: Math.round(totalReturn * 100) / 100,
        maxDrawdown: Math.round(maxDrawdown * 100) / 100,
        sharpe: Math.round(sharpe * 100) / 100,
        sortino: Math.round(sortino * 100) / 100,
        calmar: Math.round(calmar * 100) / 100,
        bestYear: years[annualReturns.indexOf(bestYearReturn)],
        worstYear: years[annualReturns.indexOf(worstYearReturn)],
        bestYearReturn: Math.round(bestYearReturn * 10) / 10,
        worstYearReturn: Math.round(worstYearReturn * 10) / 10,
        finalValue: Math.round(value),
        totalInvested: Math.round(totalInvested),
        stdDev: Math.round(stdDev * 100) / 100,
        positiveYears,
        negativeYears,
        avgPositiveReturn: positiveYears > 0 ? Math.round(avgWin * 10) / 10 : 0,
        avgNegativeReturn: negativeYears > 0 ? Math.round(annualReturns.filter((r)=>r < 0).reduce((s, r)=>s + r, 0) / negativeYears * 10) / 10 : 0,
        // New metrics
        benchmarkCagr: bmCagr !== undefined ? Math.round(bmCagr * 100) / 100 : undefined,
        benchmarkMaxDrawdown: bmMaxDrawdown !== undefined ? Math.round(bmMaxDrawdown * 100) / 100 : undefined,
        benchmarkStdDev: bmStdDev !== undefined ? Math.round(bmStdDev * 100) / 100 : undefined,
        activeReturn: activeReturn !== undefined ? Math.round(activeReturn * 100) / 100 : undefined,
        beta: beta !== undefined ? Math.round(beta * 100) / 100 : undefined,
        alpha: alpha !== undefined ? Math.round(alpha * 100) / 100 : undefined,
        rSquared: rSquared !== undefined ? Math.round(rSquared * 100) / 100 : undefined,
        upsideCapture: upsideCapture !== undefined ? Math.round(upsideCapture * 100) / 100 : undefined,
        downsideCapture: downsideCapture !== undefined ? Math.round(downsideCapture * 100) / 100 : undefined,
        trackingError: trackingError !== undefined ? Math.round(trackingError * 100) / 100 : undefined,
        informationRatio: informationRatio !== undefined ? Math.round(informationRatio * 100) / 100 : undefined,
        var5: Math.round(var5 * 100) / 100,
        // Advanced Metrics
        cvar5: Math.round(cvar5 * 100) / 100,
        skewness: Math.round(skewness * 100) / 100,
        kurtosis: Math.round(kurtosis * 100) / 100,
        treynor: Math.round(treynor * 100) / 100,
        downsideDev: Math.round(downsideDev * 100) / 100,
        gainLossRatio: Math.round(gainLossRatio * 100) / 100
    };
}
function rollingReturns(allocations, startYear, endYear, windowYears, benchmark, inflationAdjusted = false) {
    const results = [];
    for(let y = startYear; y <= endYear - windowYears + 1; y++){
        let value = 100000;
        let bmValue = 100000;
        for(let wy = y; wy <= y + windowYears - 1; wy++){
            let ret = portfolioAnnualReturn(allocations, wy);
            if (inflationAdjusted) {
                const cpi = INDIA_CPI[wy] ?? 6;
                ret = ((1 + ret / 100) / (1 + cpi / 100) - 1) * 100;
            }
            value *= 1 + ret / 100;
            if (benchmark) {
                let bmRet = ANNUAL_RETURNS[wy]?.[benchmark] ?? 0;
                if (inflationAdjusted) {
                    const cpi = INDIA_CPI[wy] ?? 6;
                    bmRet = ((1 + bmRet / 100) / (1 + cpi / 100) - 1) * 100;
                }
                bmValue *= 1 + bmRet / 100;
            }
        }
        const row = {
            year: y,
            cagr: Math.round((Math.pow(value / 100000, 1 / windowYears) - 1) * 1000) / 10
        };
        if (benchmark) {
            row.benchmarkCagr = Math.round((Math.pow(bmValue / 100000, 1 / windowYears) - 1) * 1000) / 10;
        }
        results.push(row);
    }
    return results;
}
function assetMeanStdDev(asset, startYear, endYear) {
    const rets = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>ANNUAL_RETURNS[startYear + i]?.[asset] ?? 0);
    const mean = rets.reduce((s, r)=>s + r, 0) / rets.length;
    const stdDev = Math.sqrt(rets.reduce((s, r)=>s + Math.pow(r - mean, 2), 0) / rets.length);
    return {
        mean: Math.round(mean * 100) / 100,
        stdDev: Math.round(stdDev * 100) / 100
    };
}
function assetCorrelation(a, b, startYear, endYear) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i);
    const ra = years.map((y)=>ANNUAL_RETURNS[y]?.[a] ?? 0);
    const rb = years.map((y)=>ANNUAL_RETURNS[y]?.[b] ?? 0);
    const ma = ra.reduce((s, r)=>s + r, 0) / ra.length;
    const mb = rb.reduce((s, r)=>s + r, 0) / rb.length;
    const cov = ra.reduce((s, r, i)=>s + (r - ma) * (rb[i] - mb), 0) / ra.length;
    const sa = Math.sqrt(ra.reduce((s, r)=>s + Math.pow(r - ma, 2), 0) / ra.length);
    const sb = Math.sqrt(rb.reduce((s, r)=>s + Math.pow(r - mb, 2), 0) / rb.length);
    return sa > 0 && sb > 0 ? Math.round(cov / (sa * sb) * 100) / 100 : 0;
}
function computeSmartSIPReturns(startYear, years, baseSip, stepUpPercent, cheapPE, cheapMult, expPE, expMult) {
    const endYear = startYear + years - 1;
    if (endYear > END_YEAR || startYear < START_YEAR) return null;
    let corpus = 0;
    let totalInvested = 0;
    let currentSIP = baseSip;
    const dataPoints = [];
    for(let y = startYear; y <= endYear; y++){
        const annualRet = ANNUAL_RETURNS[y]?.["nifty50"];
        if (annualRet === undefined) return null;
        // Mock P/E: inverse of returns gives rough sense, but use a simple sine-based proxy
        const mockPE = 20 + 8 * Math.sin((y - 2000) * 0.4);
        const mult = mockPE < cheapPE ? cheapMult : mockPE > expPE ? expMult : 1.0;
        const activeSIP = currentSIP * mult;
        const monthlyRet = Math.pow(1 + annualRet / 100, 1 / 12) - 1;
        for(let m = 0; m < 12; m++){
            corpus += activeSIP;
            totalInvested += activeSIP;
            corpus *= 1 + monthlyRet;
        }
        dataPoints.push({
            year: y,
            pe: +mockPE.toFixed(1),
            activeMultiplier: mult,
            cumulativeSIP: +corpus.toFixed(0),
            cumulativeInvested: +totalInvested.toFixed(0)
        });
        if (stepUpPercent > 0) currentSIP *= 1 + stepUpPercent / 100;
    }
    const xirr = years > 0 ? (Math.pow(corpus / totalInvested, 1 / years) - 1) * 100 : 0;
    return {
        corpus: +corpus.toFixed(0),
        totalInvested: +totalInvested.toFixed(0),
        xirr: +xirr.toFixed(2),
        dataPoints
    };
}
const MF_CATEGORIES = {
    largeCap: {
        label: "Large Cap",
        regularTER: 1.65,
        directTER: 0.45,
        historicalReturn: 13.5
    },
    flexiCap: {
        label: "Flexi Cap",
        regularTER: 1.82,
        directTER: 0.41,
        historicalReturn: 14.2
    },
    midCap: {
        label: "Mid Cap",
        regularTER: 1.90,
        directTER: 0.55,
        historicalReturn: 16.5
    },
    smallCap: {
        label: "Small Cap",
        regularTER: 1.95,
        directTER: 0.60,
        historicalReturn: 18.0
    },
    elss: {
        label: "ELSS",
        regularTER: 1.75,
        directTER: 0.50,
        historicalReturn: 14.8
    },
    hybrid: {
        label: "Aggressive Hybrid",
        regularTER: 1.70,
        directTER: 0.48,
        historicalReturn: 12.5
    },
    debtShort: {
        label: "Short Duration Debt",
        regularTER: 0.85,
        directTER: 0.25,
        historicalReturn: 7.5
    },
    indexNifty50: {
        label: "Index Fund (Nifty 50)",
        regularTER: 0.50,
        directTER: 0.10,
        historicalReturn: 13.0
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/analytics/asset-allocation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetAllocationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-right.js [app-client] (ecmascript) <export default as ArrowDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/india-historical-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const LAZY_PORTFOLIOS = [
    {
        id: "nifty100",
        name: "100% Nifty 50",
        description: "Pure large-cap equity",
        allocations: [
            {
                asset: "nifty50",
                weight: 100
            }
        ]
    },
    {
        id: "balanced6040",
        name: "Balanced 60/40",
        description: "Classic equity/debt split",
        allocations: [
            {
                asset: "nifty50",
                weight: 60
            },
            {
                asset: "debt",
                weight: 40
            }
        ]
    },
    {
        id: "allweather",
        name: "All-Weather India",
        description: "Diversified across all asset classes",
        allocations: [
            {
                asset: "nifty50",
                weight: 30
            },
            {
                asset: "niftyMidcap",
                weight: 15
            },
            {
                asset: "gold",
                weight: 15
            },
            {
                asset: "debt",
                weight: 40
            }
        ]
    },
    {
        id: "aggressive",
        name: "Aggressive Growth",
        description: "High equity, high risk",
        allocations: [
            {
                asset: "nifty50",
                weight: 40
            },
            {
                asset: "niftyMidcap",
                weight: 40
            },
            {
                asset: "gold",
                weight: 10
            },
            {
                asset: "debt",
                weight: 10
            }
        ]
    },
    {
        id: "conservative",
        name: "Conservative",
        description: "Capital preservation focus",
        allocations: [
            {
                asset: "nifty50",
                weight: 20
            },
            {
                asset: "gold",
                weight: 15
            },
            {
                asset: "debt",
                weight: 65
            }
        ]
    },
    {
        id: "goldhedge",
        name: "Gold-Hedged Equity",
        description: "Equity with gold hedge",
        allocations: [
            {
                asset: "nifty50",
                weight: 50
            },
            {
                asset: "gold",
                weight: 25
            },
            {
                asset: "debt",
                weight: 25
            }
        ]
    },
    {
        id: "midcapTilt",
        name: "Midcap Tilt",
        description: "Overweight midcaps for alpha",
        allocations: [
            {
                asset: "nifty50",
                weight: 25
            },
            {
                asset: "niftyMidcap",
                weight: 50
            },
            {
                asset: "debt",
                weight: 25
            }
        ]
    }
];
const ASSET_OPTIONS = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]);
_c = ASSET_OPTIONS;
const COLORS = [
    "#6366f1",
    "#f97316",
    "#10b981",
    "#ef4444",
    "#a855f7",
    "#eab308",
    "#06b6d4",
    "#ec4899"
];
function AssetAllocationPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(228);
    if ($[0] !== "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8") {
        for(let $i = 0; $i < 228; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8";
    }
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("growth");
    const [startYear, setStartYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2000);
    const [endYear, setEndYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"]);
    const [initialAmount, setInitialAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1000000);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("lumpsum");
    const [sipAmount, setSipAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10000);
    const [stepUpPct, setStepUpPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [benchmark, setBenchmark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("nifty50");
    const [inflationAdjusted, setInflationAdjusted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logScale, setLogScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            {
                id: "1",
                asset: "nifty50",
                weight: 50
            },
            {
                id: "2",
                asset: "niftyMidcap",
                weight: 20
            },
            {
                id: "3",
                asset: "gold",
                weight: 10
            },
            {
                id: "4",
                asset: "debt",
                weight: 20
            }
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [allocations, setAllocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "balanced6040",
            "allweather"
        ];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [selectedLazy, setSelectedLazy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let T0;
    let allSeriesKeys;
    let drawdownData;
    let growthData;
    let handleRun;
    let isValid;
    let loadPreset;
    let returnsData;
    let rollingData;
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t15;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    let toggleLazy;
    let totalWeight;
    let ttSt;
    if ($[3] !== allocations || $[4] !== benchmark || $[5] !== endYear || $[6] !== inflationAdjusted || $[7] !== initialAmount || $[8] !== logScale || $[9] !== mode || $[10] !== results || $[11] !== selectedLazy || $[12] !== sipAmount || $[13] !== startYear || $[14] !== stepUpPct) {
        totalWeight = allocations.reduce(_AssetAllocationPageAllocationsReduce, 0);
        isValid = Math.abs(totalWeight - 100) < 0.01 && startYear < endYear;
        let t16;
        if ($[41] !== allocations) {
            t16 = function addAllocation() {
                setAllocations([
                    ...allocations,
                    {
                        id: Math.random().toString(),
                        asset: "gold",
                        weight: 0
                    }
                ]);
            };
            $[41] = allocations;
            $[42] = t16;
        } else {
            t16 = $[42];
        }
        const addAllocation = t16;
        let t17;
        if ($[43] !== allocations) {
            t17 = function updateAllocation(id, field, value) {
                setAllocations(allocations.map({
                    "AssetAllocationPage[updateAllocation > allocations.map()]": (a_0)=>a_0.id === id ? {
                            ...a_0,
                            [field]: value
                        } : a_0
                }["AssetAllocationPage[updateAllocation > allocations.map()]"]));
            };
            $[43] = allocations;
            $[44] = t17;
        } else {
            t17 = $[44];
        }
        const updateAllocation = t17;
        let t18;
        if ($[45] !== allocations) {
            t18 = function removeAllocation(id_0) {
                setAllocations(allocations.filter({
                    "AssetAllocationPage[removeAllocation > allocations.filter()]": (a_1)=>a_1.id !== id_0
                }["AssetAllocationPage[removeAllocation > allocations.filter()]"]));
            };
            $[45] = allocations;
            $[46] = t18;
        } else {
            t18 = $[46];
        }
        const removeAllocation = t18;
        let t19;
        if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
            t19 = function toggleLazy(id_1) {
                setSelectedLazy({
                    "AssetAllocationPage[toggleLazy > setSelectedLazy()]": (prev)=>prev.includes(id_1) ? prev.filter({
                            "AssetAllocationPage[toggleLazy > setSelectedLazy() > prev.filter()]": (x)=>x !== id_1
                        }["AssetAllocationPage[toggleLazy > setSelectedLazy() > prev.filter()]"]) : [
                            ...prev,
                            id_1
                        ]
                }["AssetAllocationPage[toggleLazy > setSelectedLazy()]"]);
            };
            $[47] = t19;
        } else {
            t19 = $[47];
        }
        toggleLazy = t19;
        let t20;
        if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
            t20 = function loadPreset(portfolio) {
                setAllocations(portfolio.allocations.map(_AssetAllocationPageLoadPresetPortfolioAllocationsMap));
            };
            $[48] = t20;
        } else {
            t20 = $[48];
        }
        loadPreset = t20;
        let t21;
        if ($[49] !== allocations || $[50] !== benchmark || $[51] !== endYear || $[52] !== inflationAdjusted || $[53] !== initialAmount || $[54] !== mode || $[55] !== selectedLazy || $[56] !== sipAmount || $[57] !== startYear || $[58] !== stepUpPct) {
            t21 = function handleRun() {
                setRunning(true);
                setTimeout({
                    "AssetAllocationPage[handleRun > setTimeout()]": ()=>{
                        const customAllocs = allocations.map(_AssetAllocationPageHandleRunSetTimeoutAllocationsMap);
                        const config = {
                            allocations: customAllocs,
                            startYear,
                            endYear,
                            initialAmount,
                            mode,
                            sipAmount,
                            stepUpPct,
                            benchmark,
                            inflationAdjusted
                        };
                        const customResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runBacktest"])(config);
                        const comparisons = selectedLazy.map(_AssetAllocationPageHandleRunSetTimeoutSelectedLazyMap).filter(Boolean).map({
                            "AssetAllocationPage[handleRun > setTimeout() > (anonymous)()]": (portfolio_0)=>({
                                    portfolio: portfolio_0,
                                    result: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runBacktest"])({
                                        ...config,
                                        allocations: portfolio_0.allocations
                                    })
                                })
                        }["AssetAllocationPage[handleRun > setTimeout() > (anonymous)()]"]);
                        setResults({
                            custom: customResult,
                            comparisons
                        });
                        setRunning(false);
                    }
                }["AssetAllocationPage[handleRun > setTimeout()]"], 100);
            };
            $[49] = allocations;
            $[50] = benchmark;
            $[51] = endYear;
            $[52] = inflationAdjusted;
            $[53] = initialAmount;
            $[54] = mode;
            $[55] = selectedLazy;
            $[56] = sipAmount;
            $[57] = startYear;
            $[58] = stepUpPct;
            $[59] = t21;
        } else {
            t21 = $[59];
        }
        handleRun = t21;
        let t22;
        bb0: {
            if (!results) {
                let t23;
                if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
                    t23 = [];
                    $[60] = t23;
                } else {
                    t23 = $[60];
                }
                t22 = t23;
                break bb0;
            }
            const years = results.custom.yearlyData;
            let t23;
            if ($[61] !== benchmark || $[62] !== results.comparisons || $[63] !== years) {
                let t24;
                if ($[65] !== benchmark || $[66] !== results.comparisons) {
                    t24 = ({
                        "AssetAllocationPage[years.map()]": (d, i_0)=>{
                            const row = {
                                year: d.year,
                                "My Portfolio": d.value
                            };
                            if (d.benchmarkValue !== undefined) {
                                row[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = d.benchmarkValue;
                            }
                            for (const c of results.comparisons){
                                row[c.portfolio.name] = c.result.yearlyData[i_0]?.value ?? 0;
                            }
                            return row;
                        }
                    })["AssetAllocationPage[years.map()]"];
                    $[65] = benchmark;
                    $[66] = results.comparisons;
                    $[67] = t24;
                } else {
                    t24 = $[67];
                }
                t23 = years.map(t24);
                $[61] = benchmark;
                $[62] = results.comparisons;
                $[63] = years;
                $[64] = t23;
            } else {
                t23 = $[64];
            }
            t22 = t23;
        }
        growthData = t22;
        let t23;
        bb1: {
            if (!results) {
                let t24;
                if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
                    t24 = [];
                    $[68] = t24;
                } else {
                    t24 = $[68];
                }
                t23 = t24;
                break bb1;
            }
            let t24;
            if ($[69] !== results.comparisons || $[70] !== results.custom.yearlyData) {
                let t25;
                if ($[72] !== results.comparisons) {
                    t25 = ({
                        "AssetAllocationPage[results.custom.yearlyData.map()]": (d_0, i_1)=>{
                            const row_0 = {
                                year: d_0.year,
                                "My Portfolio": d_0.annualReturn
                            };
                            for (const c_0 of results.comparisons){
                                row_0[c_0.portfolio.name] = c_0.result.yearlyData[i_1]?.annualReturn ?? 0;
                            }
                            return row_0;
                        }
                    })["AssetAllocationPage[results.custom.yearlyData.map()]"];
                    $[72] = results.comparisons;
                    $[73] = t25;
                } else {
                    t25 = $[73];
                }
                t24 = results.custom.yearlyData.map(t25);
                $[69] = results.comparisons;
                $[70] = results.custom.yearlyData;
                $[71] = t24;
            } else {
                t24 = $[71];
            }
            t23 = t24;
        }
        returnsData = t23;
        let t24;
        bb2: {
            if (!results) {
                let t25;
                if ($[74] === Symbol.for("react.memo_cache_sentinel")) {
                    t25 = [];
                    $[74] = t25;
                } else {
                    t25 = $[74];
                }
                t24 = t25;
                break bb2;
            }
            let t25;
            if ($[75] !== benchmark || $[76] !== results.comparisons || $[77] !== results.custom.yearlyData) {
                let t26;
                if ($[79] !== benchmark || $[80] !== results.comparisons) {
                    t26 = ({
                        "AssetAllocationPage[results.custom.yearlyData.map()]": (d_1, i_2)=>{
                            const row_1 = {
                                year: d_1.year,
                                "My Portfolio": d_1.drawdown
                            };
                            if (d_1.benchmarkDrawdown !== undefined) {
                                row_1[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = d_1.benchmarkDrawdown;
                            }
                            for (const c_1 of results.comparisons){
                                row_1[c_1.portfolio.name] = c_1.result.yearlyData[i_2]?.drawdown ?? 0;
                            }
                            return row_1;
                        }
                    })["AssetAllocationPage[results.custom.yearlyData.map()]"];
                    $[79] = benchmark;
                    $[80] = results.comparisons;
                    $[81] = t26;
                } else {
                    t26 = $[81];
                }
                t25 = results.custom.yearlyData.map(t26);
                $[75] = benchmark;
                $[76] = results.comparisons;
                $[77] = results.custom.yearlyData;
                $[78] = t25;
            } else {
                t25 = $[78];
            }
            t24 = t25;
        }
        drawdownData = t24;
        let t25;
        bb3: {
            if (!results) {
                let t26;
                if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
                    t26 = [];
                    $[82] = t26;
                } else {
                    t26 = $[82];
                }
                t25 = t26;
                break bb3;
            }
            let t26;
            if ($[83] !== allocations || $[84] !== benchmark || $[85] !== endYear || $[86] !== inflationAdjusted || $[87] !== startYear) {
                const customAllocs_0 = allocations.map(_AssetAllocationPageAllocationsMap);
                const rolls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])(customAllocs_0, startYear, endYear, 5, benchmark, inflationAdjusted);
                let t27;
                if ($[89] !== benchmark) {
                    t27 = ({
                        "AssetAllocationPage[rolls.map()]": (r)=>({
                                year: r.year,
                                "My Portfolio": r.cagr,
                                ...r.benchmarkCagr !== undefined ? {
                                    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]]: r.benchmarkCagr
                                } : {}
                            })
                    })["AssetAllocationPage[rolls.map()]"];
                    $[89] = benchmark;
                    $[90] = t27;
                } else {
                    t27 = $[90];
                }
                t26 = rolls.map(t27);
                $[83] = allocations;
                $[84] = benchmark;
                $[85] = endYear;
                $[86] = inflationAdjusted;
                $[87] = startYear;
                $[88] = t26;
            } else {
                t26 = $[88];
            }
            t25 = t26;
        }
        rollingData = t25;
        let t26;
        if ($[91] === Symbol.for("react.memo_cache_sentinel")) {
            t26 = {
                borderColor: "var(--border)",
                color: "var(--text-primary)"
            };
            $[91] = t26;
        } else {
            t26 = $[91];
        }
        const inputSt = t26;
        let t27;
        if ($[92] === Symbol.for("react.memo_cache_sentinel")) {
            t27 = {
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 11,
                color: "var(--text-primary)"
            };
            $[92] = t27;
        } else {
            t27 = $[92];
        }
        ttSt = t27;
        let keys;
        if ($[93] !== benchmark || $[94] !== results) {
            keys = [
                "My Portfolio"
            ];
            if (results) {
                keys.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]);
                for (const c_2 of results.comparisons){
                    keys.push(c_2.portfolio.name);
                }
            }
            $[93] = benchmark;
            $[94] = results;
            $[95] = keys;
        } else {
            keys = $[95];
        }
        allSeriesKeys = keys;
        t15 = "flex gap-4 h-[calc(100vh-112px)] overflow-hidden";
        t13 = "w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden";
        if ($[96] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = {
                background: "var(--surface)",
                borderColor: "var(--border)"
            };
            $[96] = t14;
        } else {
            t14 = $[96];
        }
        t9 = "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar";
        if ($[97] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-sm font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: "Backtest Asset Allocation"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 563,
                columnNumber: 13
            }, this);
            $[97] = t10;
        } else {
            t10 = $[97];
        }
        if ($[98] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px]",
                style: {
                    color: "var(--text-muted)"
                },
                children: [
                    "Compare your portfolio against Indian lazy portfolios using historical data (1990–",
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"],
                    ")."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 571,
                columnNumber: 13
            }, this);
            $[98] = t11;
        } else {
            t11 = $[98];
        }
        let t28;
        if ($[99] === Symbol.for("react.memo_cache_sentinel")) {
            t28 = ({
                "AssetAllocationPage[<select>.onChange]": (e)=>setStartYear(Number(e.target.value))
            })["AssetAllocationPage[<select>.onChange]"];
            $[99] = t28;
        } else {
            t28 = $[99];
        }
        let t29;
        if ($[100] === Symbol.for("react.memo_cache_sentinel")) {
            t29 = Array.from({
                length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"]
            }, _AssetAllocationPageArrayFrom).map(_AssetAllocationPageAnonymous);
            $[100] = t29;
        } else {
            t29 = $[100];
        }
        let t30;
        if ($[101] !== startYear) {
            t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Start Year",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: startYear,
                    onChange: t28,
                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                    style: inputSt,
                    children: t29
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 598,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 598,
                columnNumber: 13
            }, this);
            $[101] = startYear;
            $[102] = t30;
        } else {
            t30 = $[102];
        }
        let t31;
        if ($[103] === Symbol.for("react.memo_cache_sentinel")) {
            t31 = ({
                "AssetAllocationPage[<select>.onChange]": (e_0)=>setEndYear(Number(e_0.target.value))
            })["AssetAllocationPage[<select>.onChange]"];
            $[103] = t31;
        } else {
            t31 = $[103];
        }
        let t32;
        if ($[104] !== startYear) {
            t32 = Array.from({
                length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - startYear + 1
            }, {
                "AssetAllocationPage[Array.from()]": (__0, i_4)=>startYear + 1 + i_4
            }["AssetAllocationPage[Array.from()]"]).filter(_AssetAllocationPageAnonymous2).map(_AssetAllocationPageAnonymous3);
            $[104] = startYear;
            $[105] = t32;
        } else {
            t32 = $[105];
        }
        let t33;
        if ($[106] !== endYear || $[107] !== t32) {
            t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "End Year",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: endYear,
                    onChange: t31,
                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                    style: inputSt,
                    children: t32
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 627,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 627,
                columnNumber: 13
            }, this);
            $[106] = endYear;
            $[107] = t32;
            $[108] = t33;
        } else {
            t33 = $[108];
        }
        let t34;
        if ($[109] !== t30 || $[110] !== t33) {
            t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    t30,
                    t33
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 636,
                columnNumber: 13
            }, this);
            $[109] = t30;
            $[110] = t33;
            $[111] = t34;
        } else {
            t34 = $[111];
        }
        let t35;
        if ($[112] === Symbol.for("react.memo_cache_sentinel")) {
            t35 = ({
                "AssetAllocationPage[<select>.onChange]": (e_1)=>setMode(e_1.target.value)
            })["AssetAllocationPage[<select>.onChange]"];
            $[112] = t35;
        } else {
            t35 = $[112];
        }
        let t36;
        let t37;
        if ($[113] === Symbol.for("react.memo_cache_sentinel")) {
            t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "lumpsum",
                children: "Lump Sum"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 655,
                columnNumber: 13
            }, this);
            t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "sip",
                children: "SIP (Monthly)"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 656,
                columnNumber: 13
            }, this);
            $[113] = t36;
            $[114] = t37;
        } else {
            t36 = $[113];
            t37 = $[114];
        }
        let t38;
        if ($[115] !== mode) {
            t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Investment Mode",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: mode,
                    onChange: t35,
                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                    style: inputSt,
                    children: [
                        t36,
                        t37
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 665,
                    columnNumber: 44
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 665,
                columnNumber: 13
            }, this);
            $[115] = mode;
            $[116] = t38;
        } else {
            t38 = $[116];
        }
        let t39;
        if ($[117] === Symbol.for("react.memo_cache_sentinel")) {
            t39 = ({
                "AssetAllocationPage[<input>.onChange]": (e_2)=>setInitialAmount(Number(e_2.target.value))
            })["AssetAllocationPage[<input>.onChange]"];
            $[117] = t39;
        } else {
            t39 = $[117];
        }
        let t40;
        if ($[118] !== initialAmount) {
            t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Initial Amount (\u20B9)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    value: initialAmount,
                    onChange: t39,
                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                    style: inputSt
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 682,
                    columnNumber: 54
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 682,
                columnNumber: 13
            }, this);
            $[118] = initialAmount;
            $[119] = t40;
        } else {
            t40 = $[119];
        }
        let t41;
        if ($[120] !== mode || $[121] !== sipAmount || $[122] !== stepUpPct) {
            t41 = mode === "sip" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Monthly SIP (\u20B9)",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            value: sipAmount,
                            onChange: {
                                "AssetAllocationPage[<input>.onChange]": (e_3)=>setSipAmount(Number(e_3.target.value))
                            }["AssetAllocationPage[<input>.onChange]"],
                            className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                            style: inputSt
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 690,
                            columnNumber: 109
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 690,
                        columnNumber: 71
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Annual Step-Up %",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            value: stepUpPct,
                            onChange: {
                                "AssetAllocationPage[<input>.onChange]": (e_4)=>setStepUpPct(Number(e_4.target.value))
                            }["AssetAllocationPage[<input>.onChange]"],
                            className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                            style: inputSt
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 692,
                            columnNumber: 198
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 692,
                        columnNumber: 166
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 690,
                columnNumber: 31
            }, this);
            $[120] = mode;
            $[121] = sipAmount;
            $[122] = stepUpPct;
            $[123] = t41;
        } else {
            t41 = $[123];
        }
        let t42;
        if ($[124] === Symbol.for("react.memo_cache_sentinel")) {
            t42 = ({
                "AssetAllocationPage[<select>.onChange]": (e_5)=>setBenchmark(e_5.target.value)
            })["AssetAllocationPage[<select>.onChange]"];
            $[124] = t42;
        } else {
            t42 = $[124];
        }
        let t43;
        if ($[125] === Symbol.for("react.memo_cache_sentinel")) {
            t43 = ASSET_OPTIONS.map(_AssetAllocationPageASSET_OPTIONSMap);
            $[125] = t43;
        } else {
            t43 = $[125];
        }
        let t44;
        if ($[126] !== benchmark) {
            t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Benchmark",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: benchmark,
                    onChange: t42,
                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                    style: inputSt,
                    children: t43
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 720,
                    columnNumber: 38
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 720,
                columnNumber: 13
            }, this);
            $[126] = benchmark;
            $[127] = t44;
        } else {
            t44 = $[127];
        }
        let t45;
        if ($[128] === Symbol.for("react.memo_cache_sentinel")) {
            t45 = ({
                "AssetAllocationPage[<input>.onChange]": (e_6)=>setInflationAdjusted(e_6.target.checked)
            })["AssetAllocationPage[<input>.onChange]"];
            $[128] = t45;
        } else {
            t45 = $[128];
        }
        let t46;
        if ($[129] !== inflationAdjusted) {
            t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: inflationAdjusted,
                onChange: t45,
                className: "rounded"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 737,
                columnNumber: 13
            }, this);
            $[129] = inflationAdjusted;
            $[130] = t46;
        } else {
            t46 = $[130];
        }
        let t47;
        if ($[131] === Symbol.for("react.memo_cache_sentinel")) {
            t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px]",
                style: {
                    color: "var(--text-muted)"
                },
                children: "Inflation-adjusted"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 745,
                columnNumber: 13
            }, this);
            $[131] = t47;
        } else {
            t47 = $[131];
        }
        let t48;
        if ($[132] !== t46) {
            t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center gap-1.5 cursor-pointer",
                children: [
                    t46,
                    t47
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 754,
                columnNumber: 13
            }, this);
            $[132] = t46;
            $[133] = t48;
        } else {
            t48 = $[133];
        }
        let t49;
        if ($[134] === Symbol.for("react.memo_cache_sentinel")) {
            t49 = ({
                "AssetAllocationPage[<input>.onChange]": (e_7)=>setLogScale(e_7.target.checked)
            })["AssetAllocationPage[<input>.onChange]"];
            $[134] = t49;
        } else {
            t49 = $[134];
        }
        let t50;
        if ($[135] !== logScale) {
            t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: logScale,
                onChange: t49,
                className: "rounded"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 771,
                columnNumber: 13
            }, this);
            $[135] = logScale;
            $[136] = t50;
        } else {
            t50 = $[136];
        }
        let t51;
        if ($[137] === Symbol.for("react.memo_cache_sentinel")) {
            t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px]",
                style: {
                    color: "var(--text-muted)"
                },
                children: "Log scale"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 779,
                columnNumber: 13
            }, this);
            $[137] = t51;
        } else {
            t51 = $[137];
        }
        let t52;
        if ($[138] !== t50) {
            t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center gap-1.5 cursor-pointer",
                children: [
                    t50,
                    t51
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 788,
                columnNumber: 13
            }, this);
            $[138] = t50;
            $[139] = t52;
        } else {
            t52 = $[139];
        }
        let t53;
        if ($[140] !== t48 || $[141] !== t52) {
            t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 pt-1",
                children: [
                    t48,
                    t52
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 796,
                columnNumber: 13
            }, this);
            $[140] = t48;
            $[141] = t52;
            $[142] = t53;
        } else {
            t53 = $[142];
        }
        if ($[143] !== t34 || $[144] !== t38 || $[145] !== t40 || $[146] !== t41 || $[147] !== t44 || $[148] !== t53) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: "Investment Parameters",
                children: [
                    t34,
                    t38,
                    t40,
                    t41,
                    t44,
                    t53
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 804,
                columnNumber: 13
            }, this);
            $[143] = t34;
            $[144] = t38;
            $[145] = t40;
            $[146] = t41;
            $[147] = t44;
            $[148] = t53;
            $[149] = t12;
        } else {
            t12 = $[149];
        }
        T0 = Section;
        t7 = "My Portfolio";
        if ($[150] !== allocations || $[151] !== removeAllocation || $[152] !== updateAllocation) {
            let t54;
            if ($[154] !== allocations.length || $[155] !== removeAllocation || $[156] !== updateAllocation) {
                t54 = ({
                    "AssetAllocationPage[allocations.map()]": (a_5)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: a_5.asset,
                                    onChange: {
                                        "AssetAllocationPage[allocations.map() > <select>.onChange]": (e_8)=>updateAllocation(a_5.id, "asset", e_8.target.value)
                                    }["AssetAllocationPage[allocations.map() > <select>.onChange]"],
                                    className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent flex-1",
                                    style: inputSt,
                                    children: ASSET_OPTIONS.map(_AssetAllocationPageAllocationsMapASSET_OPTIONSMap)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 821,
                                    columnNumber: 116
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-0.5 rounded-md border px-2 py-1.5 w-16 shrink-0",
                                    style: inputSt,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            value: a_5.weight,
                                            onChange: {
                                                "AssetAllocationPage[allocations.map() > <input>.onChange]": (e_9)=>updateAllocation(a_5.id, "weight", Number(e_9.target.value))
                                            }["AssetAllocationPage[allocations.map() > <input>.onChange]"],
                                            className: "bg-transparent text-xs w-full outline-none font-mono text-right",
                                            style: {
                                                color: "var(--text-primary)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 823,
                                            columnNumber: 369
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: "%"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 827,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 823,
                                    columnNumber: 266
                                }, this),
                                allocations.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "AssetAllocationPage[allocations.map() > <button>.onClick]": ()=>removeAllocation(a_5.id)
                                    }["AssetAllocationPage[allocations.map() > <button>.onClick]"],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 10,
                                        style: {
                                            color: "var(--text-muted)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 831,
                                        columnNumber: 77
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 829,
                                    columnNumber: 59
                                }, this)
                            ]
                        }, a_5.id, true, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 821,
                            columnNumber: 60
                        }, this)
                })["AssetAllocationPage[allocations.map()]"];
                $[154] = allocations.length;
                $[155] = removeAllocation;
                $[156] = updateAllocation;
                $[157] = t54;
            } else {
                t54 = $[157];
            }
            t8 = allocations.map(t54);
            $[150] = allocations;
            $[151] = removeAllocation;
            $[152] = updateAllocation;
            $[153] = t8;
        } else {
            t8 = $[153];
        }
        t5 = "flex items-center justify-between pt-0.5";
        let t54;
        let t55;
        if ($[158] === Symbol.for("react.memo_cache_sentinel")) {
            t54 = {
                color: "var(--accent-brand)"
            };
            t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                size: 10
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 857,
                columnNumber: 13
            }, this);
            $[158] = t54;
            $[159] = t55;
        } else {
            t54 = $[158];
            t55 = $[159];
        }
        if ($[160] !== addAllocation) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: addAllocation,
                className: "text-[11px] flex items-center gap-1",
                style: t54,
                children: [
                    t55,
                    " Add"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 865,
                columnNumber: 12
            }, this);
            $[160] = addAllocation;
            $[161] = t6;
        } else {
            t6 = $[161];
        }
        t2 = "text-[11px] font-mono";
        const t56 = isValid ? "var(--positive)" : "var(--negative)";
        if ($[162] !== t56) {
            t3 = {
                color: t56
            };
            $[162] = t56;
            $[163] = t3;
        } else {
            t3 = $[163];
        }
        t4 = totalWeight.toFixed(0);
        $[3] = allocations;
        $[4] = benchmark;
        $[5] = endYear;
        $[6] = inflationAdjusted;
        $[7] = initialAmount;
        $[8] = logScale;
        $[9] = mode;
        $[10] = results;
        $[11] = selectedLazy;
        $[12] = sipAmount;
        $[13] = startYear;
        $[14] = stepUpPct;
        $[15] = T0;
        $[16] = allSeriesKeys;
        $[17] = drawdownData;
        $[18] = growthData;
        $[19] = handleRun;
        $[20] = isValid;
        $[21] = loadPreset;
        $[22] = returnsData;
        $[23] = rollingData;
        $[24] = t10;
        $[25] = t11;
        $[26] = t12;
        $[27] = t13;
        $[28] = t14;
        $[29] = t15;
        $[30] = t2;
        $[31] = t3;
        $[32] = t4;
        $[33] = t5;
        $[34] = t6;
        $[35] = t7;
        $[36] = t8;
        $[37] = t9;
        $[38] = toggleLazy;
        $[39] = totalWeight;
        $[40] = ttSt;
    } else {
        T0 = $[15];
        allSeriesKeys = $[16];
        drawdownData = $[17];
        growthData = $[18];
        handleRun = $[19];
        isValid = $[20];
        loadPreset = $[21];
        returnsData = $[22];
        rollingData = $[23];
        t10 = $[24];
        t11 = $[25];
        t12 = $[26];
        t13 = $[27];
        t14 = $[28];
        t15 = $[29];
        t2 = $[30];
        t3 = $[31];
        t4 = $[32];
        t5 = $[33];
        t6 = $[34];
        t7 = $[35];
        t8 = $[36];
        t9 = $[37];
        toggleLazy = $[38];
        totalWeight = $[39];
        ttSt = $[40];
    }
    const t16 = Math.abs(totalWeight - 100) < 0.01 ? " \u2713" : "";
    let t17;
    if ($[164] !== t16 || $[165] !== t2 || $[166] !== t3 || $[167] !== t4) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t2,
            style: t3,
            children: [
                t4,
                "%",
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 952,
            columnNumber: 11
        }, this);
        $[164] = t16;
        $[165] = t2;
        $[166] = t3;
        $[167] = t4;
        $[168] = t17;
    } else {
        t17 = $[168];
    }
    let t18;
    if ($[169] !== t17 || $[170] !== t5 || $[171] !== t6) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 963,
            columnNumber: 11
        }, this);
        $[169] = t17;
        $[170] = t5;
        $[171] = t6;
        $[172] = t18;
    } else {
        t18 = $[172];
    }
    let t19;
    if ($[173] !== T0 || $[174] !== t18 || $[175] !== t7 || $[176] !== t8) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            title: t7,
            children: [
                t8,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 973,
            columnNumber: 11
        }, this);
        $[173] = T0;
        $[174] = t18;
        $[175] = t7;
        $[176] = t8;
        $[177] = t19;
    } else {
        t19 = $[177];
    }
    let t20;
    if ($[178] !== loadPreset || $[179] !== selectedLazy || $[180] !== toggleLazy) {
        t20 = LAZY_PORTFOLIOS.map({
            "AssetAllocationPage[LAZY_PORTFOLIOS.map()]": (p_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: selectedLazy.includes(p_0.id),
                            onChange: {
                                "AssetAllocationPage[LAZY_PORTFOLIOS.map() > <input>.onChange]": ()=>toggleLazy(p_0.id)
                            }["AssetAllocationPage[LAZY_PORTFOLIOS.map() > <input>.onChange]"],
                            className: "rounded shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 985,
                            columnNumber: 114
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "AssetAllocationPage[LAZY_PORTFOLIOS.map() > <button>.onClick]": ()=>loadPreset(p_0)
                                    }["AssetAllocationPage[LAZY_PORTFOLIOS.map() > <button>.onClick]"],
                                    className: "text-[11px] font-semibold text-left hover:underline block truncate",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    title: `Load ${p_0.name} into My Portfolio`,
                                    children: p_0.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 987,
                                    columnNumber: 140
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] truncate",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: [
                                        p_0.description,
                                        " — ",
                                        p_0.allocations.map(_AssetAllocationPageLAZY_PORTFOLIOSMapP_0AllocationsMap).join(", ")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 991,
                                    columnNumber: 78
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 987,
                            columnNumber: 108
                        }, this)
                    ]
                }, p_0.id, true, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 985,
                    columnNumber: 60
                }, this)
        }["AssetAllocationPage[LAZY_PORTFOLIOS.map()]"]);
        $[178] = loadPreset;
        $[179] = selectedLazy;
        $[180] = toggleLazy;
        $[181] = t20;
    } else {
        t20 = $[181];
    }
    let t21;
    if ($[182] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Compare Against",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                children: t20
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 1004,
                columnNumber: 44
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1004,
            columnNumber: 11
        }, this);
        $[182] = t20;
        $[183] = t21;
    } else {
        t21 = $[183];
    }
    let t22;
    if ($[184] !== t10 || $[185] !== t11 || $[186] !== t12 || $[187] !== t19 || $[188] !== t21 || $[189] !== t9) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            children: [
                t10,
                t11,
                t12,
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1012,
            columnNumber: 11
        }, this);
        $[184] = t10;
        $[185] = t11;
        $[186] = t12;
        $[187] = t19;
        $[188] = t21;
        $[189] = t9;
        $[190] = t22;
    } else {
        t22 = $[190];
    }
    let t23;
    if ($[191] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = {
            borderColor: "var(--border)"
        };
        $[191] = t23;
    } else {
        t23 = $[191];
    }
    const t24 = running || !isValid;
    let t25;
    if ($[192] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            background: "var(--accent-brand)",
            color: "var(--accent-foreground)"
        };
        $[192] = t25;
    } else {
        t25 = $[192];
    }
    let t26;
    if ($[193] !== running) {
        t26 = running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "animate-spin w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "3",
                            strokeOpacity: "0.3"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 1045,
                            columnNumber: 93
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 2a10 10 0 0 1 10 10",
                            stroke: "currentColor",
                            strokeWidth: "3",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 1045,
                            columnNumber: 184
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 1045,
                    columnNumber: 23
                }, this),
                "Running…"
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                    lineNumber: 1045,
                    columnNumber: 302
                }, this),
                " Run Backtest"
            ]
        }, void 0, true);
        $[193] = running;
        $[194] = t26;
    } else {
        t26 = $[194];
    }
    let t27;
    if ($[195] !== handleRun || $[196] !== t24 || $[197] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3 border-t",
            style: t23,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleRun,
                disabled: t24,
                className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60",
                style: t25,
                children: t26
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 1053,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1053,
            columnNumber: 11
        }, this);
        $[195] = handleRun;
        $[196] = t24;
        $[197] = t26;
        $[198] = t27;
    } else {
        t27 = $[198];
    }
    let t28;
    if ($[199] !== t13 || $[200] !== t14 || $[201] !== t22 || $[202] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t13,
            style: t14,
            children: [
                t22,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1063,
            columnNumber: 11
        }, this);
        $[199] = t13;
        $[200] = t14;
        $[201] = t22;
        $[202] = t27;
        $[203] = t28;
    } else {
        t28 = $[203];
    }
    let t29;
    if ($[204] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[204] = t29;
    } else {
        t29 = $[204];
    }
    let t30;
    if ($[205] !== activeTab || $[206] !== allSeriesKeys || $[207] !== benchmark || $[208] !== drawdownData || $[209] !== endYear || $[210] !== growthData || $[211] !== inflationAdjusted || $[212] !== initialAmount || $[213] !== logScale || $[214] !== mode || $[215] !== results || $[216] !== returnsData || $[217] !== rollingData || $[218] !== running || $[219] !== sipAmount || $[220] !== startYear || $[221] !== stepUpPct || $[222] !== ttSt) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0",
            style: t29,
            children: !results && !running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                        style: {
                            background: "var(--surface-elevated)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 28,
                            style: {
                                color: "var(--text-muted)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 1086,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 1084,
                        columnNumber: 199
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Ready to Backtest"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 1088,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-center max-w-sm",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: "Define your asset allocation, select comparison portfolios, and run the backtest to see historical performance using Indian market data."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 1090,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 1084,
                columnNumber: 127
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-full relative",
                children: [
                    running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm",
                        style: {
                            background: "rgba(0,0,0,0.3)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin w-10 h-10",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            style: {
                                color: "var(--accent-brand)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    strokeOpacity: "0.2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2a10 10 0 0 1 10 10",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 105
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                            lineNumber: 1094,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                        lineNumber: 1092,
                        columnNumber: 220
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b grid grid-cols-6 gap-2",
                                style: {
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "CAGR",
                                        value: `${results.custom.cagr}%`,
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Total Return",
                                        value: `${results.custom.totalReturn.toFixed(0)}%`,
                                        color: "var(--positive)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 104
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Max Drawdown",
                                        value: `${results.custom.maxDrawdown}%`,
                                        color: "var(--negative)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 216
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Sharpe",
                                        value: results.custom.sharpe.toFixed(2),
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 317
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Sortino",
                                        value: results.custom.sortino.toFixed(2),
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 416
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Final Value",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.custom.finalValue),
                                        color: "var(--positive)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 517
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                lineNumber: 1096,
                                columnNumber: 228
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-4 pt-2 pb-0 border-b",
                                style: {
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    {
                                        key: "growth",
                                        label: "Portfolio Growth",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                                    },
                                    {
                                        key: "returns",
                                        label: "Annual Returns",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"]
                                    },
                                    {
                                        key: "drawdowns",
                                        label: "Drawdowns",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"]
                                    },
                                    {
                                        key: "rolling",
                                        label: "Rolling Returns",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"]
                                    },
                                    {
                                        key: "metrics",
                                        label: "Comparison Table",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"]
                                    }
                                ].map({
                                    "AssetAllocationPage[(anonymous)()]": (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "AssetAllocationPage[(anonymous)() > <button>.onClick]": ()=>setActiveTab(t.key)
                                            }["AssetAllocationPage[(anonymous)() > <button>.onClick]"],
                                            className: "px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5",
                                            style: {
                                                color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                                                borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1126,
                                                    columnNumber: 18
                                                }, this),
                                                t.label
                                            ]
                                        }, t.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 1121,
                                            columnNumber: 58
                                        }, this)
                                }["AssetAllocationPage[(anonymous)()]"])
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                lineNumber: 1098,
                                columnNumber: 627
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 p-4 overflow-auto custom-scrollbar",
                                children: [
                                    activeTab === "growth" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                            data: growthData,
                                            margin: {
                                                top: 5,
                                                right: 10,
                                                left: 10,
                                                bottom: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    stroke: "var(--border)",
                                                    vertical: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    scale: logScale ? "log" : "auto",
                                                    domain: logScale ? [
                                                        "auto",
                                                        "auto"
                                                    ] : [
                                                        0,
                                                        "auto"
                                                    ],
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _AssetAllocationPageYAxisTickFormatter,
                                                    width: 72
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _AssetAllocationPageTooltipFormatter
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1138,
                                                    columnNumber: 88
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1138,
                                                    columnNumber: 168
                                                }, this),
                                                allSeriesKeys.map(_AssetAllocationPageAllSeriesKeysMap)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 202
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1127,
                                        columnNumber: 154
                                    }, this),
                                    activeTab === "returns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: returnsData,
                                            margin: {
                                                top: 5,
                                                right: 10,
                                                left: 10,
                                                bottom: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    stroke: "var(--border)",
                                                    vertical: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1145,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1145,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _AssetAllocationPageYAxisTickFormatter2,
                                                    width: 50
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1148,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _AssetAllocationPageTooltipFormatter2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1151,
                                                    columnNumber: 89
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1151,
                                                    columnNumber: 170
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                    y: 0,
                                                    stroke: "var(--text-muted)",
                                                    strokeWidth: 0.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1153,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "My Portfolio",
                                                    fill: COLORS[0],
                                                    radius: [
                                                        2,
                                                        2,
                                                        0,
                                                        0
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1153,
                                                    columnNumber: 90
                                                }, this),
                                                results.comparisons.map(_AssetAllocationPageResultsComparisonsMap)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 1140,
                                            columnNumber: 190
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1140,
                                        columnNumber: 142
                                    }, this),
                                    activeTab === "drawdowns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                            data: drawdownData,
                                            margin: {
                                                top: 5,
                                                right: 10,
                                                left: 10,
                                                bottom: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    stroke: "var(--border)",
                                                    vertical: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1158,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1158,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _AssetAllocationPageYAxisTickFormatter3,
                                                    width: 50
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _AssetAllocationPageTooltipFormatter3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1164,
                                                    columnNumber: 89
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1164,
                                                    columnNumber: 170
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                    y: 0,
                                                    stroke: "var(--text-muted)",
                                                    strokeWidth: 0.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 22
                                                }, this),
                                                allSeriesKeys.map(_AssetAllocationPageAllSeriesKeysMap2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 339
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1153,
                                        columnNumber: 291
                                    }, this),
                                    activeTab === "rolling" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] mb-3 shrink-0",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "5-year rolling CAGR — compares your portfolio against the benchmark over every 5-year window."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                lineNumber: 1166,
                                                columnNumber: 249
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                        data: rollingData,
                                                        margin: {
                                                            top: 5,
                                                            right: 10,
                                                            left: 10,
                                                            bottom: 5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                strokeDasharray: "3 3",
                                                                stroke: "var(--border)",
                                                                vertical: false
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1173,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                dataKey: "year",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1173,
                                                                columnNumber: 101
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                tickFormatter: _AssetAllocationPageYAxisTickFormatter4,
                                                                width: 50
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1176,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: ttSt,
                                                                formatter: _AssetAllocationPageTooltipFormatter4
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1179,
                                                                columnNumber: 93
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                                wrapperStyle: {
                                                                    fontSize: 11
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1179,
                                                                columnNumber: 174
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                y: 0,
                                                                stroke: "var(--text-muted)",
                                                                strokeWidth: 0.5
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1181,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                                type: "monotone",
                                                                dataKey: "My Portfolio",
                                                                stroke: COLORS[0],
                                                                strokeWidth: 2.5,
                                                                dot: false
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1181,
                                                                columnNumber: 94
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                                type: "monotone",
                                                                dataKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                                stroke: COLORS[1],
                                                                strokeWidth: 1.5,
                                                                dot: false,
                                                                strokeDasharray: "4 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1181,
                                                                columnNumber: 190
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                        lineNumber: 1168,
                                                        columnNumber: 195
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1168,
                                                    columnNumber: 147
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                lineNumber: 1168,
                                                columnNumber: 115
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 211
                                    }, this),
                                    activeTab === "metrics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-xs border-collapse",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        style: {
                                                            background: "var(--surface-elevated)"
                                                        },
                                                        children: [
                                                            "Metric",
                                                            "My Portfolio",
                                                            ...results.comparisons.map(_AssetAllocationPageResultsComparisonsMap2),
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                                                        ].map(_AssetAllocationPageAnonymous4)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                        lineNumber: 1181,
                                                        columnNumber: 482
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1181,
                                                    columnNumber: 475
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: [
                                                        {
                                                            label: "CAGR",
                                                            key: "cagr",
                                                            fmt: _temp
                                                        },
                                                        {
                                                            label: "Total Return",
                                                            key: "totalReturn",
                                                            fmt: _temp2
                                                        },
                                                        {
                                                            label: "Max Drawdown",
                                                            key: "maxDrawdown",
                                                            fmt: _temp3
                                                        },
                                                        {
                                                            label: "Std Dev",
                                                            key: "stdDev",
                                                            fmt: _temp4
                                                        },
                                                        {
                                                            label: "Sharpe",
                                                            key: "sharpe",
                                                            fmt: _temp5
                                                        },
                                                        {
                                                            label: "Sortino",
                                                            key: "sortino",
                                                            fmt: _temp6
                                                        },
                                                        {
                                                            label: "Calmar",
                                                            key: "calmar",
                                                            fmt: _temp7
                                                        },
                                                        {
                                                            label: "Best Year",
                                                            key: "bestYearReturn",
                                                            fmt: _temp8
                                                        },
                                                        {
                                                            label: "Worst Year",
                                                            key: "worstYearReturn",
                                                            fmt: _temp9
                                                        },
                                                        {
                                                            label: "Positive Years",
                                                            key: "positiveYears",
                                                            fmt: _temp10
                                                        },
                                                        {
                                                            label: "Negative Years",
                                                            key: "negativeYears",
                                                            fmt: _temp11
                                                        },
                                                        {
                                                            label: "Final Value",
                                                            key: "finalValue",
                                                            fmt: _temp12
                                                        },
                                                        {
                                                            label: "VaR (5%)",
                                                            key: "var5",
                                                            fmt: _temp13
                                                        },
                                                        {
                                                            label: "Skewness",
                                                            key: "skewness",
                                                            fmt: _temp14
                                                        },
                                                        {
                                                            label: "Kurtosis",
                                                            key: "kurtosis",
                                                            fmt: _temp15
                                                        }
                                                    ].map({
                                                        "AssetAllocationPage[(anonymous)()]": (metric)=>{
                                                            const allResults = [
                                                                results.custom,
                                                                ...results.comparisons.map(_AssetAllocationPageAnonymousResultsComparisonsMap)
                                                            ];
                                                            const bmResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runBacktest"])({
                                                                allocations: [
                                                                    {
                                                                        asset: benchmark,
                                                                        weight: 100
                                                                    }
                                                                ],
                                                                startYear,
                                                                endYear,
                                                                initialAmount,
                                                                mode,
                                                                sipAmount,
                                                                stepUpPct,
                                                                inflationAdjusted
                                                            });
                                                            const allWithBm = [
                                                                ...allResults,
                                                                bmResult
                                                            ];
                                                            const vals = allWithBm.map({
                                                                "AssetAllocationPage[(anonymous)() > allWithBm.map()]": (r_0)=>r_0[metric.key]
                                                            }["AssetAllocationPage[(anonymous)() > allWithBm.map()]"]);
                                                            const best = metric.key === "maxDrawdown" ? Math.max(...vals) : Math.max(...vals);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-b",
                                                                style: {
                                                                    borderColor: "var(--border)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-3 py-1.5 font-semibold whitespace-nowrap",
                                                                        style: {
                                                                            color: "var(--text-primary)"
                                                                        },
                                                                        children: metric.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                        lineNumber: 1266,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    allWithBm.map({
                                                                        "AssetAllocationPage[(anonymous)() > allWithBm.map()]": (r_1, i_8)=>{
                                                                            const v_22 = r_1[metric.key];
                                                                            const isBest = v_22 === best && metric.key !== "negativeYears";
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-3 py-1.5 font-mono whitespace-nowrap",
                                                                                style: {
                                                                                    color: isBest ? "var(--accent-brand)" : "var(--text-primary)",
                                                                                    fontWeight: isBest ? 600 : 400
                                                                                },
                                                                                children: v_22 !== undefined ? metric.fmt(v_22) : "\u2014"
                                                                            }, i_8, false, {
                                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                                lineNumber: 1272,
                                                                                columnNumber: 36
                                                                            }, this);
                                                                        }
                                                                    }["AssetAllocationPage[(anonymous)() > allWithBm.map()]"])
                                                                ]
                                                            }, metric.label, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                                lineNumber: 1264,
                                                                columnNumber: 30
                                                            }, this);
                                                        }
                                                    }["AssetAllocationPage[(anonymous)()]"])
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                                    lineNumber: 1183,
                                                    columnNumber: 196
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 425
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                        lineNumber: 1181,
                                        columnNumber: 394
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                                lineNumber: 1127,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
                lineNumber: 1092,
                columnNumber: 161
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1084,
            columnNumber: 11
        }, this);
        $[205] = activeTab;
        $[206] = allSeriesKeys;
        $[207] = benchmark;
        $[208] = drawdownData;
        $[209] = endYear;
        $[210] = growthData;
        $[211] = inflationAdjusted;
        $[212] = initialAmount;
        $[213] = logScale;
        $[214] = mode;
        $[215] = results;
        $[216] = returnsData;
        $[217] = rollingData;
        $[218] = running;
        $[219] = sipAmount;
        $[220] = startYear;
        $[221] = stepUpPct;
        $[222] = ttSt;
        $[223] = t30;
    } else {
        t30 = $[223];
    }
    let t31;
    if ($[224] !== t15 || $[225] !== t28 || $[226] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t15,
            children: [
                t28,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1304,
            columnNumber: 11
        }, this);
        $[224] = t15;
        $[225] = t28;
        $[226] = t30;
        $[227] = t31;
    } else {
        t31 = $[227];
    }
    return t31;
}
_s(AssetAllocationPage, "3mven0q4p0ab/4BKNGVQBdWOFuo=");
_c1 = AssetAllocationPage;
// ─── Small UI helpers ─────────────────────────────────────────────────────────
function _AssetAllocationPageAnonymousResultsComparisonsMap(c_5) {
    return c_5.result;
}
function _temp15(v_21) {
    return v_21 !== undefined ? v_21.toFixed(2) : "\u2014";
}
function _temp14(v_20) {
    return v_20 !== undefined ? v_20.toFixed(2) : "\u2014";
}
function _temp13(v_19) {
    return v_19 !== undefined ? `${v_19.toFixed(1)}%` : "\u2014";
}
function _temp12(v_18) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(v_18);
}
function _temp11(v_17) {
    return `${v_17}`;
}
function _temp10(v_16) {
    return `${v_16}`;
}
function _temp9(v_15) {
    return `${v_15.toFixed(1)}%`;
}
function _temp8(v_14) {
    return `${v_14.toFixed(1)}%`;
}
function _temp7(v_13) {
    return v_13.toFixed(2);
}
function _temp6(v_12) {
    return v_12.toFixed(2);
}
function _temp5(v_11) {
    return v_11.toFixed(2);
}
function _temp4(v_10) {
    return `${v_10.toFixed(2)}%`;
}
function _temp3(v_9) {
    return `${v_9.toFixed(1)}%`;
}
function _temp2(v_8) {
    return `${v_8.toFixed(0)}%`;
}
function _temp(v_7) {
    return `${v_7.toFixed(2)}%`;
}
function _AssetAllocationPageAnonymous4(h) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "text-left px-3 py-2 font-semibold whitespace-nowrap",
        style: {
            color: "var(--text-muted)",
            borderBottom: "1px solid var(--border)"
        },
        children: h
    }, h, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1365,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageResultsComparisonsMap2(c_4) {
    return c_4.portfolio.name;
}
function _AssetAllocationPageTooltipFormatter4(v_6) {
    return `${Number(v_6).toFixed(1)}%`;
}
function _AssetAllocationPageYAxisTickFormatter4(v_5) {
    return `${v_5}%`;
}
function _AssetAllocationPageAllSeriesKeysMap2(key_0, i_7) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
        type: "monotone",
        dataKey: key_0,
        stroke: COLORS[i_7 % COLORS.length],
        fill: COLORS[i_7 % COLORS.length],
        fillOpacity: key_0 === "My Portfolio" ? 0.15 : 0.05,
        strokeWidth: key_0 === "My Portfolio" ? 2 : 1
    }, key_0, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1380,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageTooltipFormatter3(v_4) {
    return `${Number(v_4).toFixed(1)}%`;
}
function _AssetAllocationPageYAxisTickFormatter3(v_3) {
    return `${v_3}%`;
}
function _AssetAllocationPageResultsComparisonsMap(c_3, i_6) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
        dataKey: c_3.portfolio.name,
        fill: COLORS[(i_6 + 2) % COLORS.length],
        radius: [
            2,
            2,
            0,
            0
        ]
    }, c_3.portfolio.name, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1389,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageTooltipFormatter2(v_2) {
    return `${Number(v_2).toFixed(1)}%`;
}
function _AssetAllocationPageYAxisTickFormatter2(v_1) {
    return `${v_1}%`;
}
function _AssetAllocationPageAllSeriesKeysMap(key, i_5) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
        type: "monotone",
        dataKey: key,
        stroke: COLORS[i_5 % COLORS.length],
        strokeWidth: key === "My Portfolio" ? 2.5 : 1.5,
        dot: false,
        strokeDasharray: key === "My Portfolio" ? undefined : "4 2"
    }, key, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1398,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageTooltipFormatter(v_0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(Number(v_0));
}
function _AssetAllocationPageYAxisTickFormatter(v) {
    return `₹${(v / 10000000).toFixed(1)}Cr`;
}
function _AssetAllocationPageLAZY_PORTFOLIOSMapP_0AllocationsMap(a_6) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][a_6.asset]} ${a_6.weight}%`;
}
function _AssetAllocationPageAllocationsMapASSET_OPTIONSMap(t0) {
    const [k_0, label_0] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: k_0,
        children: label_0
    }, k_0, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1411,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageASSET_OPTIONSMap(t0) {
    const [k, label] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: k,
        children: label
    }, k, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1415,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageAnonymous3(y_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y_1,
        children: y_1
    }, y_1, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1418,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageAnonymous2(y_0) {
    return y_0 <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"];
}
function _AssetAllocationPageAnonymous(y) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y,
        children: y
    }, y, false, {
        fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
        lineNumber: 1424,
        columnNumber: 10
    }, this);
}
function _AssetAllocationPageArrayFrom(_, i_3) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"] + i_3;
}
function _AssetAllocationPageAllocationsMap(a_4) {
    return {
        asset: a_4.asset,
        weight: a_4.weight
    };
}
function _AssetAllocationPageHandleRunSetTimeoutSelectedLazyMap(id_2) {
    return LAZY_PORTFOLIOS.find({
        "AssetAllocationPage[handleRun > setTimeout() > selectedLazy.map() > LAZY_PORTFOLIOS.find()]": (p)=>p.id === id_2
    }["AssetAllocationPage[handleRun > setTimeout() > selectedLazy.map() > LAZY_PORTFOLIOS.find()]"]);
}
function _AssetAllocationPageHandleRunSetTimeoutAllocationsMap(a_3) {
    return {
        asset: a_3.asset,
        weight: a_3.weight
    };
}
function _AssetAllocationPageLoadPresetPortfolioAllocationsMap(a_2, i) {
    return {
        id: `preset-${i}`,
        asset: a_2.asset,
        weight: a_2.weight
    };
}
function _AssetAllocationPageAllocationsReduce(s, a) {
    return s + a.weight;
}
function Section(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8";
    }
    const { title, children } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            borderColor: "var(--border)",
            background: "var(--surface-elevated)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-muted)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== title) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px] font-semibold uppercase tracking-wider",
            style: t2,
            children: title
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1489,
            columnNumber: 10
        }, this);
        $[3] = title;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== children || $[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border p-3 space-y-2",
            style: t1,
            children: [
                t3,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1497,
            columnNumber: 10
        }, this);
        $[5] = children;
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_c2 = Section;
function Field(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8";
    }
    const { label, children } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            color: "var(--text-muted)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== label) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-[10px] mb-0.5 block",
            style: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1529,
            columnNumber: 10
        }, this);
        $[2] = label;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== children || $[5] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t2,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1537,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = t2;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    return t3;
}
_c3 = Field;
function SummaryCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5968829ce6bd0331ec61322448b6d011ff9d8189fc2eb7ec80a1adc6e25487d8";
    }
    const { label, value, color } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-muted)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== label) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[9px] font-semibold uppercase tracking-wider mb-0.5",
            style: t2,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1580,
            columnNumber: 10
        }, this);
        $[3] = label;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== color) {
        t4 = {
            color
        };
        $[5] = color;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t4 || $[8] !== value) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-mono font-bold leading-tight",
            style: t4,
            children: value
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1598,
            columnNumber: 10
        }, this);
        $[7] = t4;
        $[8] = value;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t3 || $[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border p-2.5",
            style: t1,
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/asset-allocation/page.tsx",
            lineNumber: 1607,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    return t6;
}
_c4 = SummaryCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ASSET_OPTIONS");
__turbopack_context__.k.register(_c1, "AssetAllocationPage");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "Field");
__turbopack_context__.k.register(_c4, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_010e0660._.js.map