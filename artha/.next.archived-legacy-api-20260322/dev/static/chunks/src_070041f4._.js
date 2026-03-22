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
"[project]/src/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Switch = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, checked, onChange, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "relative inline-flex items-center cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                className: "sr-only peer",
                checked: checked,
                onChange: onChange,
                ref: ref,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/switch.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-9 h-5 bg-[var(--border-strong)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--brand-focus)] peer-focus:ring-offset-2 peer-focus:ring-offset-[var(--background)] rounded-full peer transition-colors", "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--background)] after:border after:border-[var(--border)] after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm", "peer-checked:after:translate-x-[16px] peer-checked:bg-[var(--toggle-track-active)] peer-checked:after:bg-[var(--toggle-thumb-active)] peer-checked:after:border-[var(--toggle-thumb-active)]", className)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/switch.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/switch.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Switch;
Switch.displayName = "Switch";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Switch$React.forwardRef");
__turbopack_context__.k.register(_c1, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/analytics/tactical-allocation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TacticalAllocationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/india-historical-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
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
// Theme-aware colors
const PORTFOLIO_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)"
];
const ASSET_COLORS = {
    nifty50: "var(--chart-1)",
    nifty500: "var(--chart-2)",
    niftyMidcap: "var(--chart-3)",
    gold: "var(--chart-4)",
    debt: "var(--chart-5)",
    balanced: "var(--chart-6)"
};
const DEFAULT_PORTFOLIOS = [
    {
        id: "p1",
        label: "Portfolio 1",
        color: PORTFOLIO_COLORS[0],
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
        id: "p2",
        label: "Portfolio 2",
        color: PORTFOLIO_COLORS[1],
        allocations: [
            {
                asset: "nifty50",
                weight: 80
            },
            {
                asset: "debt",
                weight: 20
            }
        ]
    }
];
function TacticalAllocationPage() {
    _s();
    const [portfolios, setPortfolios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PORTFOLIOS);
    const [startYear, setStartYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"]);
    const [endYear, setEndYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"]);
    const [benchmark, setBenchmark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("nifty50");
    const [inflationAdjusted, setInflationAdjusted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logScale, setLogScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // --- Actions ---
    const addPortfolio = ()=>{
        if (portfolios.length >= 3) return;
        setPortfolios([
            ...portfolios,
            {
                id: `p${Date.now()}`,
                label: `Portfolio ${portfolios.length + 1}`,
                color: PORTFOLIO_COLORS[portfolios.length],
                allocations: [
                    {
                        asset: "nifty50",
                        weight: 100
                    }
                ]
            }
        ]);
    };
    const removePortfolio = (id)=>{
        setPortfolios(portfolios.filter((p)=>p.id !== id));
    };
    const updateAllocation = (pId, idx, field, val)=>{
        setPortfolios(portfolios.map((p_0)=>{
            if (p_0.id !== pId) return p_0;
            const newAlloc = [
                ...p_0.allocations
            ];
            newAlloc[idx] = {
                ...newAlloc[idx],
                [field]: val
            };
            return {
                ...p_0,
                allocations: newAlloc
            };
        }));
    };
    const addAssetToPortfolio = (pId_0)=>{
        setPortfolios(portfolios.map((p_1)=>{
            if (p_1.id !== pId_0) return p_1;
            const available = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]).filter((k)=>!p_1.allocations.find((a)=>a.asset === k));
            if (available.length === 0) return p_1;
            return {
                ...p_1,
                allocations: [
                    ...p_1.allocations,
                    {
                        asset: available[0],
                        weight: 0
                    }
                ]
            };
        }));
    };
    const removeAssetFromPortfolio = (pId_1, idx_0)=>{
        setPortfolios(portfolios.map((p_2)=>{
            if (p_2.id !== pId_1) return p_2;
            return {
                ...p_2,
                allocations: p_2.allocations.filter((_, i)=>i !== idx_0)
            };
        }));
    };
    // --- Data Engine ---
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[results]": ()=>{
            return portfolios.map({
                "TacticalAllocationPage.useMemo[results]": (p_3)=>{
                    const totalWeight = p_3.allocations.reduce({
                        "TacticalAllocationPage.useMemo[results].totalWeight": (sum, a_0)=>sum + a_0.weight
                    }["TacticalAllocationPage.useMemo[results].totalWeight"], 0);
                    const normalizedAllocations = p_3.allocations.map({
                        "TacticalAllocationPage.useMemo[results].normalizedAllocations": (a_1)=>({
                                asset: a_1.asset,
                                weight: totalWeight > 0 ? a_1.weight / totalWeight * 100 : 0
                            })
                    }["TacticalAllocationPage.useMemo[results].normalizedAllocations"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runBacktest"])({
                        allocations: normalizedAllocations,
                        startYear,
                        endYear,
                        initialAmount: 10000,
                        mode: "lumpsum",
                        benchmark: benchmark === "none" ? undefined : benchmark,
                        inflationAdjusted
                    });
                }
            }["TacticalAllocationPage.useMemo[results]"]);
        }
    }["TacticalAllocationPage.useMemo[results]"], [
        portfolios,
        startYear,
        endYear,
        benchmark,
        inflationAdjusted
    ]);
    const benchmarkResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[benchmarkResult]": ()=>{
            if (benchmark === "none") return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runBacktest"])({
                allocations: [
                    {
                        asset: benchmark,
                        weight: 100
                    }
                ],
                startYear,
                endYear,
                initialAmount: 10000,
                mode: "lumpsum",
                inflationAdjusted
            });
        }
    }["TacticalAllocationPage.useMemo[benchmarkResult]"], [
        benchmark,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    // Combined Time Series Data
    const growthData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[growthData]": ()=>{
            if (!results.length) return [];
            return results[0].yearlyData.map({
                "TacticalAllocationPage.useMemo[growthData]": (d, i_0)=>{
                    const point = {
                        year: d.year
                    };
                    portfolios.forEach({
                        "TacticalAllocationPage.useMemo[growthData]": (p_4, pIdx)=>{
                            point[p_4.label] = results[pIdx]?.yearlyData[i_0]?.value ?? 0;
                        }
                    }["TacticalAllocationPage.useMemo[growthData]"]);
                    if (benchmark !== "none" && d.benchmarkValue !== undefined) {
                        point[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = d.benchmarkValue;
                    }
                    return point;
                }
            }["TacticalAllocationPage.useMemo[growthData]"]);
        }
    }["TacticalAllocationPage.useMemo[growthData]"], [
        results,
        portfolios,
        benchmark
    ]);
    const annualData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[annualData]": ()=>{
            if (!results.length) return [];
            return results[0].yearlyData.map({
                "TacticalAllocationPage.useMemo[annualData]": (d_0, i_1)=>{
                    const point_0 = {
                        year: d_0.year
                    };
                    portfolios.forEach({
                        "TacticalAllocationPage.useMemo[annualData]": (p_5, pIdx_0)=>{
                            point_0[p_5.label] = results[pIdx_0]?.yearlyData[i_1]?.annualReturn ?? 0;
                        }
                    }["TacticalAllocationPage.useMemo[annualData]"]);
                    if (benchmark !== "none" && d_0.benchmarkReturn !== undefined) {
                        point_0[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = d_0.benchmarkReturn;
                    }
                    return point_0;
                }
            }["TacticalAllocationPage.useMemo[annualData]"]);
        }
    }["TacticalAllocationPage.useMemo[annualData]"], [
        results,
        portfolios,
        benchmark
    ]);
    const drawdownData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[drawdownData]": ()=>{
            if (!results.length) return [];
            const data = [];
            const peaks = {};
            const currentVals = {};
            portfolios.forEach({
                "TacticalAllocationPage.useMemo[drawdownData]": (p_6)=>{
                    peaks[p_6.label] = 10000;
                    currentVals[p_6.label] = 10000;
                }
            }["TacticalAllocationPage.useMemo[drawdownData]"]);
            if (benchmark !== "none") {
                peaks[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = 10000;
                currentVals[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = 10000;
            }
            results[0].yearlyData.forEach({
                "TacticalAllocationPage.useMemo[drawdownData]": (d_1, i_2)=>{
                    const point_1 = {
                        year: d_1.year
                    };
                    portfolios.forEach({
                        "TacticalAllocationPage.useMemo[drawdownData]": (p_7, pIdx_1)=>{
                            const ret = results[pIdx_1]?.yearlyData[i_2]?.annualReturn ?? 0;
                            currentVals[p_7.label] *= 1 + ret / 100;
                            if (currentVals[p_7.label] > peaks[p_7.label]) peaks[p_7.label] = currentVals[p_7.label];
                            point_1[p_7.label] = (currentVals[p_7.label] - peaks[p_7.label]) / peaks[p_7.label] * 100;
                        }
                    }["TacticalAllocationPage.useMemo[drawdownData]"]);
                    if (benchmark !== "none" && d_1.benchmarkReturn !== undefined) {
                        const bmLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark];
                        currentVals[bmLabel] *= 1 + d_1.benchmarkReturn / 100;
                        if (currentVals[bmLabel] > peaks[bmLabel]) peaks[bmLabel] = currentVals[bmLabel];
                        point_1[bmLabel] = (currentVals[bmLabel] - peaks[bmLabel]) / peaks[bmLabel] * 100;
                    }
                    data.push(point_1);
                }
            }["TacticalAllocationPage.useMemo[drawdownData]"]);
            return data;
        }
    }["TacticalAllocationPage.useMemo[drawdownData]"], [
        results,
        portfolios,
        benchmark
    ]);
    const topDrawdownsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[topDrawdownsData]": ()=>{
            return portfolios.map({
                "TacticalAllocationPage.useMemo[topDrawdownsData]": (p_8)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeTopDrawdowns"])(p_8.allocations, startYear, endYear, 10, inflationAdjusted)
            }["TacticalAllocationPage.useMemo[topDrawdownsData]"]);
        }
    }["TacticalAllocationPage.useMemo[topDrawdownsData]"], [
        portfolios,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    const benchmarkDrawdowns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[benchmarkDrawdowns]": ()=>{
            if (benchmark === "none") return [];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeTopDrawdowns"])([
                {
                    asset: benchmark,
                    weight: 100
                }
            ], startYear, endYear, 10, inflationAdjusted);
        }
    }["TacticalAllocationPage.useMemo[benchmarkDrawdowns]"], [
        benchmark,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    const rolling3YData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[rolling3YData]": ()=>{
            const ROLLING_PERIOD = 3;
            if (endYear - startYear + 1 < ROLLING_PERIOD) return [];
            const data_0 = [];
            for(let start = startYear; start <= endYear - ROLLING_PERIOD + 1; start++){
                const end = start + ROLLING_PERIOD - 1;
                const point_2 = {
                    period: `${start}-${end}`
                };
                portfolios.forEach({
                    "TacticalAllocationPage.useMemo[rolling3YData]": (p_9)=>{
                        point_2[p_9.label] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])(p_9.allocations, start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
                    }
                }["TacticalAllocationPage.useMemo[rolling3YData]"]);
                if (benchmark !== "none") {
                    point_2[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])([
                        {
                            asset: benchmark,
                            weight: 100
                        }
                    ], start, end, ROLLING_PERIOD, undefined, inflationAdjusted)[0]?.cagr ?? 0;
                }
                data_0.push(point_2);
            }
            return data_0;
        }
    }["TacticalAllocationPage.useMemo[rolling3YData]"], [
        portfolios,
        benchmark,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    const rolling5YData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[rolling5YData]": ()=>{
            const ROLLING_PERIOD_0 = 5;
            if (endYear - startYear + 1 < ROLLING_PERIOD_0) return [];
            const data_1 = [];
            for(let start_0 = startYear; start_0 <= endYear - ROLLING_PERIOD_0 + 1; start_0++){
                const end_0 = start_0 + ROLLING_PERIOD_0 - 1;
                const point_3 = {
                    period: `${start_0}-${end_0}`
                };
                portfolios.forEach({
                    "TacticalAllocationPage.useMemo[rolling5YData]": (p_10)=>{
                        point_3[p_10.label] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])(p_10.allocations, start_0, end_0, ROLLING_PERIOD_0, undefined, inflationAdjusted)[0]?.cagr ?? 0;
                    }
                }["TacticalAllocationPage.useMemo[rolling5YData]"]);
                if (benchmark !== "none") {
                    point_3[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])([
                        {
                            asset: benchmark,
                            weight: 100
                        }
                    ], start_0, end_0, ROLLING_PERIOD_0, undefined, inflationAdjusted)[0]?.cagr ?? 0;
                }
                data_1.push(point_3);
            }
            return data_1;
        }
    }["TacticalAllocationPage.useMemo[rolling5YData]"], [
        portfolios,
        benchmark,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    const uniqueAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[uniqueAssets]": ()=>{
            const assets = new Set();
            portfolios.forEach({
                "TacticalAllocationPage.useMemo[uniqueAssets]": (p_11)=>p_11.allocations.forEach({
                        "TacticalAllocationPage.useMemo[uniqueAssets]": (a_2)=>assets.add(a_2.asset)
                    }["TacticalAllocationPage.useMemo[uniqueAssets]"])
            }["TacticalAllocationPage.useMemo[uniqueAssets]"]);
            if (benchmark !== "none") assets.add(benchmark);
            return Array.from(assets);
        }
    }["TacticalAllocationPage.useMemo[uniqueAssets]"], [
        portfolios,
        benchmark
    ]);
    const assetMetricsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[assetMetricsData]": ()=>{
            return uniqueAssets.map({
                "TacticalAllocationPage.useMemo[assetMetricsData]": (asset)=>({
                        asset,
                        metrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeAssetMetrics"])(asset, startYear, endYear, inflationAdjusted)
                    })
            }["TacticalAllocationPage.useMemo[assetMetricsData]"]);
        }
    }["TacticalAllocationPage.useMemo[assetMetricsData]"], [
        uniqueAssets,
        startYear,
        endYear,
        inflationAdjusted
    ]);
    const assetCorrelationData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[assetCorrelationData]": ()=>{
            const matrix = {};
            uniqueAssets.forEach({
                "TacticalAllocationPage.useMemo[assetCorrelationData]": (a1)=>{
                    matrix[a1] = {};
                    uniqueAssets.forEach({
                        "TacticalAllocationPage.useMemo[assetCorrelationData]": (a2)=>{
                            matrix[a1][a2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assetCorrelation"])(a1, a2, startYear, endYear);
                        }
                    }["TacticalAllocationPage.useMemo[assetCorrelationData]"]);
                }
            }["TacticalAllocationPage.useMemo[assetCorrelationData]"]);
            return matrix;
        }
    }["TacticalAllocationPage.useMemo[assetCorrelationData]"], [
        uniqueAssets,
        startYear,
        endYear
    ]);
    // Trailing Returns
    const trailingReturns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TacticalAllocationPage.useMemo[trailingReturns]": ()=>{
            const periods = [
                1,
                3,
                5,
                7,
                10,
                15
            ];
            const data_2 = {};
            periods.forEach({
                "TacticalAllocationPage.useMemo[trailingReturns]": (p_12)=>{
                    if (endYear - startYear + 1 < p_12) return;
                    data_2[`${p_12}Y`] = {
                        period: `${p_12} Year`
                    };
                    portfolios.forEach({
                        "TacticalAllocationPage.useMemo[trailingReturns]": (port, idx_1)=>{
                            data_2[`${p_12}Y`][port.label] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])(port.allocations, endYear - p_12 + 1, endYear, p_12, undefined, inflationAdjusted)[0]?.cagr ?? "-";
                        }
                    }["TacticalAllocationPage.useMemo[trailingReturns]"]);
                    if (benchmark !== "none") {
                        data_2[`${p_12}Y`][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rollingReturns"])([
                            {
                                asset: benchmark,
                                weight: 100
                            }
                        ], endYear - p_12 + 1, endYear, p_12, undefined, inflationAdjusted)[0]?.cagr ?? "-";
                    }
                }
            }["TacticalAllocationPage.useMemo[trailingReturns]"]);
            return Object.values(data_2);
        }
    }["TacticalAllocationPage.useMemo[trailingReturns]"], [
        portfolios,
        startYear,
        endYear,
        benchmark,
        inflationAdjusted
    ]);
    // Helpers
    const fmtPct = (val_0)=>{
        if (val_0 === undefined || val_0 === null || val_0 === "-" || isNaN(Number(val_0))) return "-";
        return `${Number(val_0) >= 0 ? "+" : ""}${Number(val_0).toFixed(2)}%`;
    };
    const fmtRatio = (val_1)=>{
        if (val_1 === undefined || val_1 === null || isNaN(val_1)) return "-";
        return val_1.toFixed(2);
    };
    const fmtCurr = (val_2)=>{
        if (val_2 === undefined || val_2 === null || isNaN(val_2)) return "-";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(val_2);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 rounded-lg",
                        style: {
                            background: "var(--accent-subtle)",
                            color: "var(--accent-brand)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                            size: 24
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold tracking-tight",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Tactical Allocation & Model Portfolios"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                style: {
                                    color: "var(--text-secondary)"
                                },
                                children: "Build, compare, and deeply analyze multiple custom portfolios against a benchmark."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-6",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Portfolio Configuration"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: "Inflation Adjusted (Real)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                checked: inflationAdjusted,
                                                onChange: (e)=>setInflationAdjusted(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 357,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: "Time Period:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"],
                                                max: endYear - 1,
                                                value: startYear,
                                                onChange: (e_0)=>setStartYear(Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"], Math.min(endYear - 1, Number(e_0.target.value)))),
                                                className: "w-20 px-2 py-1 rounded border outline-none text-center",
                                                style: {
                                                    background: "var(--background)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: "to"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: startYear + 1,
                                                max: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"],
                                                value: endYear,
                                                onChange: (e_1)=>setEndYear(Math.max(startYear + 1, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"], Number(e_1.target.value)))),
                                                className: "w-20 px-2 py-1 rounded border outline-none text-center",
                                                style: {
                                                    background: "var(--background)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: "Benchmark:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: benchmark,
                                                onChange: (e_2)=>setBenchmark(e_2.target.value),
                                                className: "px-2 py-1 rounded border outline-none",
                                                style: {
                                                    background: "var(--background)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text-primary)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "none",
                                                        children: "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 17
                                                    }, this),
                                                    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]).map(([k_0, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: k_0,
                                                            children: label
                                                        }, k_0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 391,
                                                            columnNumber: 69
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 385,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: [
                            portfolios.map((p_13, pIdx_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg border flex flex-col h-full relative",
                                    style: {
                                        background: "var(--background)",
                                        borderColor: "var(--border)"
                                    },
                                    children: [
                                        portfolios.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removePortfolio(p_13.id),
                                            className: "absolute top-3 right-3 p-1 rounded-md hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--negative)] transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 403,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 42
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-sm mb-4 flex items-center gap-2",
                                            style: {
                                                color: p_13.color
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3 h-3 rounded-full",
                                                    style: {
                                                        background: p_13.color
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, this),
                                                p_13.label
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 space-y-3",
                                            children: [
                                                p_13.allocations.map((alloc, aIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: alloc.asset,
                                                                onChange: (e_3)=>updateAllocation(p_13.id, aIdx, "asset", e_3.target.value),
                                                                className: "flex-1 text-xs px-2 py-1.5 rounded border outline-none",
                                                                style: {
                                                                    background: "var(--surface)",
                                                                    borderColor: "var(--border)",
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]).map(([k_1, label_0])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: k_1,
                                                                        children: label_0
                                                                    }, k_1, false, {
                                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                        lineNumber: 421,
                                                                        columnNumber: 77
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 416,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                max: "100",
                                                                value: alloc.weight,
                                                                onChange: (e_4)=>updateAllocation(p_13.id, aIdx, "weight", Number(e_4.target.value)),
                                                                className: "w-16 text-xs px-2 py-1.5 rounded border outline-none text-right",
                                                                style: {
                                                                    background: "var(--surface)",
                                                                    borderColor: "var(--border)",
                                                                    color: "var(--text-primary)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: "var(--text-secondary)"
                                                                },
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 21
                                                            }, this),
                                                            p_13.allocations.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>removeAssetFromPortfolio(p_13.id, aIdx),
                                                                className: "p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 432,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 431,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, aIdx, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 56
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addAssetToPortfolio(p_13.id),
                                                    className: "w-full py-1.5 mt-2 rounded border border-dashed text-xs flex justify-center items-center gap-1 transition-colors hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]",
                                                    style: {
                                                        borderColor: "var(--border)",
                                                        color: "var(--text-secondary)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 19
                                                        }, this),
                                                        " Add Asset"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-32 mt-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                width: "100%",
                                                height: "100%",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                            data: p_13.allocations,
                                                            dataKey: "weight",
                                                            innerRadius: 25,
                                                            outerRadius: 45,
                                                            paddingAngle: 2,
                                                            stroke: "none",
                                                            children: p_13.allocations.map((a_3, i_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                    fill: ASSET_COLORS[a_3.asset] || "var(--text-muted)"
                                                                }, `cell-${i_3}`, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 59
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            contentStyle: {
                                                                backgroundColor: "var(--surface-elevated)",
                                                                borderColor: "var(--border)",
                                                                borderRadius: "8px",
                                                                fontSize: "12px",
                                                                color: "var(--text-primary)"
                                                            },
                                                            itemStyle: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            formatter: (val_3, name, props)=>{
                                                                if (val_3 === undefined || !props.payload?.asset) return [
                                                                    "-",
                                                                    "Asset"
                                                                ];
                                                                return [
                                                                    `${val_3}%`,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][props.payload.asset]
                                                                ];
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, p_13.id, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 45
                                }, this)),
                            portfolios.length < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addPortfolio,
                                className: "p-4 rounded-lg border border-dashed flex flex-col items-center justify-center h-full min-h-[250px] transition-colors hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]",
                                style: {
                                    borderColor: "var(--border)",
                                    color: "var(--text-secondary)",
                                    background: "transparent"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 24,
                                        className: "mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: "Add Portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 472,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-4",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Portfolio Returns"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 488,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto custom-scrollbar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: "1px solid var(--border)",
                                            background: "var(--surface-elevated)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left font-medium py-2 px-3",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Metric"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 19
                                            }, this),
                                            portfolios.map((p_14)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                    style: {
                                                        color: p_14.color
                                                    },
                                                    children: p_14.label
                                                }, p_14.id, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 43
                                                }, this)),
                                            benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 494,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        {
                                            label: "Initial Balance",
                                            key: "totalInvested",
                                            fmt: fmtCurr
                                        },
                                        {
                                            label: "Final Balance",
                                            key: "finalValue",
                                            fmt: fmtCurr
                                        },
                                        {
                                            label: "CAGR",
                                            key: "cagr",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Stdev",
                                            key: "stdDev",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Best Year",
                                            key: "bestYearReturn",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Worst Year",
                                            key: "worstYearReturn",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Max Drawdown",
                                            key: "maxDrawdown",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Sharpe Ratio",
                                            key: "sharpe",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Sortino Ratio",
                                            key: "sortino",
                                            fmt: fmtRatio
                                        }
                                    ].map((row, i_4, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: i_4 === arr.length - 1 ? "none" : "1px solid var(--border)"
                                            },
                                            onMouseEnter: (e_5)=>e_5.currentTarget.style.background = "var(--surface-elevated)",
                                            onMouseLeave: (e_6)=>e_6.currentTarget.style.background = "transparent",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 font-medium text-xs whitespace-nowrap",
                                                    style: {
                                                        color: "var(--text-primary)"
                                                    },
                                                    children: row.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 21
                                                }, this),
                                                results.map((res, rIdx)=>{
                                                    const typedRes = res;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-2 px-3 text-right font-mono text-xs",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: row.fmt(typedRes[row.key])
                                                    }, `r-${rIdx}`, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 24
                                                    }, this);
                                                }),
                                                benchmark !== "none" && benchmarkResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-right font-mono text-xs",
                                                    style: {
                                                        color: "var(--text-secondary)"
                                                    },
                                                    children: row.fmt(benchmarkResult[row.key])
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 65
                                                }, this)
                                            ]
                                        }, row.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 546,
                                            columnNumber: 39
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 491,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-4",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Trailing Returns (Annualized)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 576,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto custom-scrollbar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: "1px solid var(--border)",
                                            background: "var(--surface-elevated)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left font-medium py-2 px-3",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Period"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 586,
                                                columnNumber: 19
                                            }, this),
                                            portfolios.map((p_15)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                    style: {
                                                        color: p_15.color
                                                    },
                                                    children: p_15.label
                                                }, p_15.id, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 43
                                                }, this)),
                                            benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 582,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 581,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: trailingReturns.map((row_0, i_5, arr_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: i_5 === arr_0.length - 1 ? "none" : "1px solid var(--border)"
                                            },
                                            onMouseEnter: (e_7)=>e_7.currentTarget.style.background = "var(--surface-elevated)",
                                            onMouseLeave: (e_8)=>e_8.currentTarget.style.background = "transparent",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 font-medium text-xs whitespace-nowrap",
                                                    style: {
                                                        color: "var(--text-primary)"
                                                    },
                                                    children: row_0.period
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this),
                                                portfolios.map((p_16)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-2 px-3 text-right font-mono text-xs",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: fmtPct(row_0[p_16.label])
                                                    }, p_16.id, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 45
                                                    }, this)),
                                                benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-right font-mono text-xs",
                                                    style: {
                                                        color: "var(--text-secondary)"
                                                    },
                                                    children: fmtPct(row_0[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]])
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 609,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, row_0.period, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 598,
                                            columnNumber: 61
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 597,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 580,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 579,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 572,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-4",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Risk & Return Metrics"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 625,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto custom-scrollbar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: "1px solid var(--border)",
                                            background: "var(--surface-elevated)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left font-medium py-2 px-3",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Metric"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 19
                                            }, this),
                                            portfolios.map((p_17)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                    style: {
                                                        color: p_17.color
                                                    },
                                                    children: p_17.label
                                                }, p_17.id, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 43
                                                }, this)),
                                            benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                style: {
                                                    color: "var(--text-secondary)"
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 641,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        // Return Metrics
                                        {
                                            label: "CAGR (Geometric Mean)",
                                            key: "cagr",
                                            fmt: fmtPct,
                                            section: "Returns"
                                        },
                                        {
                                            label: "Arithmetic Mean",
                                            key: "avgPositiveReturn",
                                            fmt: fmtPct
                                        },
                                        // Placeholder for actual arithmetic mean if added to engine
                                        {
                                            label: "Best Year",
                                            key: "bestYearReturn",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Worst Year",
                                            key: "worstYearReturn",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Positive Years",
                                            key: "positiveYears",
                                            fmt: (v)=>v ?? "-"
                                        },
                                        {
                                            label: "Negative Years",
                                            key: "negativeYears",
                                            fmt: (v_0)=>v_0 ?? "-"
                                        },
                                        // Risk Metrics
                                        {
                                            label: "Standard Deviation",
                                            key: "stdDev",
                                            fmt: fmtPct,
                                            section: "Risk"
                                        },
                                        {
                                            label: "Downside Deviation",
                                            key: "downsideDev",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Max Drawdown",
                                            key: "maxDrawdown",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Historical VaR (5%)",
                                            key: "var5",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Conditional VaR (5%)",
                                            key: "cvar5",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Skewness",
                                            key: "skewness",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Excess Kurtosis",
                                            key: "kurtosis",
                                            fmt: fmtRatio
                                        },
                                        // Risk-Adjusted Metrics
                                        {
                                            label: "Sharpe Ratio",
                                            key: "sharpe",
                                            fmt: fmtRatio,
                                            section: "Risk-Adjusted"
                                        },
                                        {
                                            label: "Sortino Ratio",
                                            key: "sortino",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Treynor Ratio",
                                            key: "treynor",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Calmar Ratio",
                                            key: "calmar",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Gain/Loss Ratio",
                                            key: "gainLossRatio",
                                            fmt: fmtRatio
                                        },
                                        // Benchmark Relative Metrics
                                        {
                                            label: "Active Return",
                                            key: "activeReturn",
                                            fmt: fmtPct,
                                            section: "Benchmark Relative"
                                        },
                                        {
                                            label: "Tracking Error",
                                            key: "trackingError",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "Information Ratio",
                                            key: "informationRatio",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Beta",
                                            key: "beta",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Alpha",
                                            key: "alpha",
                                            fmt: fmtPct
                                        },
                                        {
                                            label: "R-Squared",
                                            key: "rSquared",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Upside Capture Ratio",
                                            key: "upsideCapture",
                                            fmt: fmtRatio
                                        },
                                        {
                                            label: "Downside Capture Ratio",
                                            key: "downsideCapture",
                                            fmt: fmtRatio
                                        }
                                    ].map((row_1, i_6, arr_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                            children: [
                                                row_1.section && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: portfolios.length + (benchmark !== "none" ? 2 : 1),
                                                        className: "py-3 px-3 text-xs font-bold uppercase tracking-wider",
                                                        style: {
                                                            color: "var(--text-muted)",
                                                            background: "var(--background)",
                                                            borderTop: i_6 > 0 ? "1px solid var(--border)" : "none",
                                                            borderBottom: "1px solid var(--border)"
                                                        },
                                                        children: row_1.section
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 39
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: i_6 === arr_1.length - 1 ? "none" : "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e_9)=>e_9.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e_10)=>e_10.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 font-medium text-xs whitespace-nowrap pl-6",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: row_1.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 779,
                                                            columnNumber: 23
                                                        }, this),
                                                        results.map((res_0, rIdx_0)=>{
                                                            const typedRes_0 = res_0;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right font-mono text-xs",
                                                                style: {
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: row_1.fmt(typedRes_0[row_1.key])
                                                            }, `r-${rIdx_0}`, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 26
                                                            }, this);
                                                        }),
                                                        benchmark !== "none" && benchmarkResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-right font-mono text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: row_1.fmt(benchmarkResult[row_1.key])
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 67
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, row_1.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 765,
                                            columnNumber: 43
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 646,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 629,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 628,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-4",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Portfolio Growth (₹10,000)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 808,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm cursor-pointer group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: "Log Scale"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 812,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        checked: logScale,
                                        onChange: (e_11)=>setLogScale(e_11.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 811,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 807,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[400px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                data: growthData,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        vertical: false,
                                        stroke: "var(--border)",
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 826,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "year",
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fontSize: 12,
                                            fill: "var(--text-muted)"
                                        },
                                        dy: 10,
                                        minTickGap: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 827,
                                        columnNumber: 15
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
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fontSize: 12,
                                            fill: "var(--text-muted)"
                                        },
                                        tickFormatter: (val_4)=>`₹${(val_4 / 1000).toFixed(0)}k`,
                                        width: 60
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 831,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            backgroundColor: "var(--surface-elevated)",
                                            borderColor: "var(--border)",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                            color: "var(--text-primary)"
                                        },
                                        itemStyle: {
                                            color: "var(--text-primary)"
                                        },
                                        // @ts-expect-error Recharts formatter types
                                        formatter: (value)=>{
                                            if (typeof value === "number") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(value);
                                            return value;
                                        },
                                        labelStyle: {
                                            color: "var(--text-muted)",
                                            marginBottom: "4px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 835,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                        iconType: "circle",
                                        wrapperStyle: {
                                            fontSize: "12px",
                                            paddingTop: "20px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 852,
                                        columnNumber: 15
                                    }, this),
                                    portfolios.map((p_18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                            type: "monotone",
                                            dataKey: p_18.label,
                                            name: p_18.label,
                                            stroke: p_18.color,
                                            strokeWidth: 2,
                                            dot: false
                                        }, p_18.id, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 856,
                                            columnNumber: 39
                                        }, this)),
                                    benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                        type: "monotone",
                                        dataKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                        stroke: "var(--text-secondary)",
                                        strokeWidth: 2,
                                        strokeDasharray: "5 5",
                                        dot: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 857,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 820,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 819,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 818,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 803,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-8",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Historical Drawdowns Analysis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 868,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[300px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                data: drawdownData,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: portfolios.map((p_19)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: `gradDown-${p_19.id}`,
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "5%",
                                                        stopColor: p_19.color,
                                                        stopOpacity: 0.3
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 883,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "95%",
                                                        stopColor: p_19.color,
                                                        stopOpacity: 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 884,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `grad-${p_19.id}`, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 882,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 881,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        vertical: false,
                                        stroke: "var(--border)",
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 887,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "year",
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fontSize: 12,
                                            fill: "var(--text-muted)"
                                        },
                                        dy: 10,
                                        minTickGap: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 888,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fontSize: 12,
                                            fill: "var(--text-muted)"
                                        },
                                        tickFormatter: (val_5)=>`${val_5}%`,
                                        width: 50
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 892,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            backgroundColor: "var(--surface-elevated)",
                                            borderColor: "var(--border)",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                            color: "var(--text-primary)"
                                        },
                                        formatter: (value_0)=>{
                                            if (value_0 === undefined) return [
                                                "-"
                                            ];
                                            return [
                                                `${value_0.toFixed(2)}%`
                                            ];
                                        },
                                        labelStyle: {
                                            color: "var(--text-muted)",
                                            marginBottom: "4px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 896,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                        iconType: "circle",
                                        wrapperStyle: {
                                            fontSize: "12px",
                                            paddingTop: "20px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 909,
                                        columnNumber: 15
                                    }, this),
                                    portfolios.map((p_20)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                            type: "monotone",
                                            dataKey: p_20.label,
                                            name: p_20.label,
                                            stroke: p_20.color,
                                            fill: `url(#gradDown-${p_20.id})`,
                                            strokeWidth: 2
                                        }, p_20.id, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 913,
                                            columnNumber: 39
                                        }, this)),
                                    benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                        type: "monotone",
                                        dataKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                        stroke: "var(--text-secondary)",
                                        strokeWidth: 2,
                                        strokeDasharray: "5 5",
                                        dot: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 914,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 875,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                            lineNumber: 874,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 873,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t",
                        style: {
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Historical Market Stress Periods"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    borderBottom: "1px solid var(--border)",
                                                    background: "var(--surface-elevated)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left text-xs font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Stress Period"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left text-xs font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Start"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 936,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left text-xs font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "End"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 939,
                                                        columnNumber: 19
                                                    }, this),
                                                    portfolios.map((p_21)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-right text-xs font-medium py-2 px-3 border-l",
                                                            style: {
                                                                color: p_21.color,
                                                                borderColor: "var(--border)"
                                                            },
                                                            children: p_21.label
                                                        }, `stress-${p_21.id}`, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 942,
                                                            columnNumber: 43
                                                        }, this)),
                                                    benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-right text-xs font-medium py-2 px-3 border-l",
                                                        style: {
                                                            color: "var(--text-secondary)",
                                                            borderColor: "var(--border)"
                                                        },
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 946,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 929,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 928,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: [
                                                {
                                                    name: "Harshad Mehta Scam / Asian Crisis",
                                                    start: 1992,
                                                    end: 1998
                                                },
                                                {
                                                    name: "Dotcom Crash",
                                                    start: 2000,
                                                    end: 2002
                                                },
                                                {
                                                    name: "Global Financial Crisis",
                                                    start: 2008,
                                                    end: 2008
                                                },
                                                {
                                                    name: "European Debt Crisis / Taper Tantrum",
                                                    start: 2011,
                                                    end: 2013
                                                },
                                                {
                                                    name: "COVID-19 Crash",
                                                    start: 2020,
                                                    end: 2020
                                                },
                                                {
                                                    name: "2022 Inflation/Rate Hike Bear Market",
                                                    start: 2022,
                                                    end: 2022
                                                }
                                            ].map((period)=>{
                                                if (period.start < startYear || period.end > endYear) return null;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e_12)=>e_12.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e_13)=>e_13.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-2 text-xs font-medium",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: period.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-2 text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: period.start
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 985,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-2 text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: period.end
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 988,
                                                            columnNumber: 23
                                                        }, this),
                                                        portfolios.map((p_22, i_7)=>{
                                                            const periodData = results[i_7]?.yearlyData.filter((d_2)=>d_2.year >= period.start && d_2.year <= period.end);
                                                            if (!periodData || periodData.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-right border-l",
                                                                children: "-"
                                                            }, `p-${i_7}`, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 994,
                                                                columnNumber: 72
                                                            }, this);
                                                            const startVal = results[i_7]?.yearlyData.find((d_3)=>d_3.year === period.start - 1)?.value ?? 10000;
                                                            let peak = startVal;
                                                            let maxDd = 0;
                                                            periodData.forEach((d_4)=>{
                                                                peak = Math.max(peak, d_4.value);
                                                                const dd = (d_4.value - peak) / peak * 100;
                                                                maxDd = Math.min(maxDd, dd);
                                                            });
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                                style: {
                                                                    color: maxDd < 0 ? "var(--negative)" : "var(--text-primary)",
                                                                    borderColor: "var(--border)"
                                                                },
                                                                children: fmtPct(maxDd)
                                                            }, `p-${i_7}`, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 1003,
                                                                columnNumber: 28
                                                            }, this);
                                                        }),
                                                        benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                            style: {
                                                                color: "var(--text-secondary)",
                                                                borderColor: "var(--border)"
                                                            },
                                                            children: (()=>{
                                                                const periodData_0 = results[0]?.yearlyData.filter((d_5)=>d_5.year >= period.start && d_5.year <= period.end);
                                                                if (!periodData_0 || periodData_0.length === 0 || periodData_0[0].benchmarkValue === undefined) return "-";
                                                                const startVal_0 = results[0]?.yearlyData.find((d_6)=>d_6.year === period.start - 1)?.benchmarkValue ?? 10000;
                                                                let peak_0 = startVal_0;
                                                                let maxDd_0 = 0;
                                                                periodData_0.forEach((d_7)=>{
                                                                    peak_0 = Math.max(peak_0, d_7.benchmarkValue);
                                                                    const dd_0 = (d_7.benchmarkValue - peak_0) / peak_0 * 100;
                                                                    maxDd_0 = Math.min(maxDd_0, dd_0);
                                                                });
                                                                return fmtPct(maxDd_0);
                                                            })()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1011,
                                                            columnNumber: 48
                                                        }, this)
                                                    ]
                                                }, period.name, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 979,
                                                    columnNumber: 24
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 952,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 927,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 926,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 920,
                        columnNumber: 9
                    }, this),
                    topDrawdownsData[0] && topDrawdownsData[0].length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t",
                        style: {
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold flex items-center gap-2",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: [
                                    "Top Drawdowns ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs px-2 py-0.5 rounded-full",
                                        style: {
                                            background: portfolios[0].color,
                                            color: "#fff"
                                        },
                                        children: portfolios[0].label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1043,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1040,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    borderBottom: "1px solid var(--border)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Start Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1054,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "End Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1057,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Recovery Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1060,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-right font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Duration (Yrs)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1063,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-right font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Depth"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1066,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: topDrawdownsData[0].map((dd_1, idx_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e_14)=>e_14.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e_15)=>e_15.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-xs",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: dd_1.startYear
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1075,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-xs",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: dd_1.endYear
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1078,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: dd_1.recoveryYear || "Not Recovered"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1081,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-right text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: dd_1.recoveryYear ? dd_1.recoveryYear - dd_1.startYear : endYear - dd_1.startYear
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 text-right font-mono text-xs",
                                                            style: {
                                                                color: "var(--negative)"
                                                            },
                                                            children: fmtPct(dd_1.depth)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1087,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, idx_2, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1072,
                                                    columnNumber: 61
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1071,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 1049,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1048,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1037,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 864,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-8",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Asset Level Analysis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Individual Asset Metrics"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    borderBottom: "1px solid var(--border)",
                                                    background: "var(--surface-elevated)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Metric"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1118,
                                                        columnNumber: 19
                                                    }, this),
                                                    assetMetricsData.map((data_3, i_8)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                            style: {
                                                                color: ASSET_COLORS[data_3.asset] || "var(--text-primary)"
                                                            },
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][data_3.asset]
                                                        }, data_3.asset, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1121,
                                                            columnNumber: 58
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: [
                                                {
                                                    label: "CAGR",
                                                    key: "cagr",
                                                    fmt: fmtPct
                                                },
                                                {
                                                    label: "Standard Deviation",
                                                    key: "stdDev",
                                                    fmt: fmtPct
                                                },
                                                {
                                                    label: "Best Year",
                                                    key: "bestYearReturn",
                                                    fmt: fmtPct
                                                },
                                                {
                                                    label: "Worst Year",
                                                    key: "worstYearReturn",
                                                    fmt: fmtPct
                                                },
                                                {
                                                    label: "Max Drawdown",
                                                    key: "maxDrawdown",
                                                    fmt: fmtPct
                                                },
                                                {
                                                    label: "Sharpe Ratio",
                                                    key: "sharpe",
                                                    fmt: fmtRatio
                                                },
                                                {
                                                    label: "Sortino Ratio",
                                                    key: "sortino",
                                                    fmt: fmtRatio
                                                }
                                            ].map((row_2, i_9, arr_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: i_9 === arr_2.length - 1 ? "none" : "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e_16)=>e_16.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e_17)=>e_17.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 font-medium text-xs whitespace-nowrap",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: row_2.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1158,
                                                            columnNumber: 21
                                                        }, this),
                                                        assetMetricsData.map((data_4)=>{
                                                            const metrics = data_4.metrics;
                                                            const val_6 = metrics ? metrics[row_2.key] : undefined;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right font-mono text-xs",
                                                                style: {
                                                                    color: "var(--text-secondary)"
                                                                },
                                                                children: row_2.fmt(val_6)
                                                            }, data_4.asset, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 1164,
                                                                columnNumber: 26
                                                            }, this);
                                                        })
                                                    ]
                                                }, row_2.key, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t",
                        style: {
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Annual Asset Returns Matrix"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto custom-scrollbar",
                                style: {
                                    maxHeight: "400px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "sticky top-0 z-10",
                                            style: {
                                                background: "var(--surface-elevated)",
                                                boxShadow: "0 1px 0 var(--border)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1192,
                                                        columnNumber: 19
                                                    }, this),
                                                    uniqueAssets.map((asset_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-right font-medium py-2 px-3 whitespace-nowrap",
                                                            style: {
                                                                color: ASSET_COLORS[asset_0] || "var(--text-primary)"
                                                            },
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][asset_0]
                                                        }, asset_0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1195,
                                                            columnNumber: 48
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1191,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: Array.from({
                                                length: endYear - startYear + 1
                                            }, (__0, i_10)=>endYear - i_10).map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: "1px solid var(--border)"
                                                    },
                                                    onMouseEnter: (e_18)=>e_18.currentTarget.style.background = "var(--surface-elevated)",
                                                    onMouseLeave: (e_19)=>e_19.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 font-medium text-xs",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: y
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 21
                                                        }, this),
                                                        uniqueAssets.map((asset_1)=>{
                                                            let ret_0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]?.[asset_1] ?? 0;
                                                            if (inflationAdjusted) {
                                                                const cpi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDIA_CPI"][y] ?? 6;
                                                                ret_0 = ((1 + ret_0 / 100) / (1 + cpi / 100) - 1) * 100;
                                                            }
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right font-mono text-xs",
                                                                style: {
                                                                    color: ret_0 < 0 ? "var(--negative)" : ret_0 > 0 ? "var(--positive)" : "var(--text-secondary)"
                                                                },
                                                                children: fmtPct(ret_0)
                                                            }, asset_1, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 1215,
                                                                columnNumber: 26
                                                            }, this);
                                                        })
                                                    ]
                                                }, y, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1203,
                                                    columnNumber: 58
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1200,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 1186,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t",
                        style: {
                            borderColor: "var(--border)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Asset Correlations"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    borderBottom: "1px solid var(--border)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left font-medium py-2 px-3",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: "Asset"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1240,
                                                        columnNumber: 19
                                                    }, this),
                                                    uniqueAssets.map((a_4)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-right font-medium py-2 px-3",
                                                            style: {
                                                                color: "var(--text-muted)"
                                                            },
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][a_4]
                                                        }, a_4, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1243,
                                                            columnNumber: 44
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1237,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1236,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: uniqueAssets.map((rowAsset, i_11)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: i_11 === uniqueAssets.length - 1 ? "none" : "1px solid var(--border)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-3 font-medium whitespace-nowrap text-xs",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][rowAsset]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1252,
                                                            columnNumber: 21
                                                        }, this),
                                                        uniqueAssets.map((colAsset)=>{
                                                            const val_7 = assetCorrelationData[rowAsset][colAsset];
                                                            const isPositive = val_7 >= 0;
                                                            const intensity = Math.abs(val_7);
                                                            const bgColor = isPositive ? `color-mix(in srgb, var(--positive) ${intensity * 40}%, transparent)` : `color-mix(in srgb, var(--negative) ${intensity * 40}%, transparent)`;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right font-mono text-xs",
                                                                style: {
                                                                    background: rowAsset === colAsset ? "transparent" : bgColor,
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: val_7.toFixed(2)
                                                            }, colAsset, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                lineNumber: 1262,
                                                                columnNumber: 26
                                                            }, this);
                                                        })
                                                    ]
                                                }, rowAsset, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1249,
                                                    columnNumber: 55
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1248,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                    lineNumber: 1235,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 1098,
                columnNumber: 7
            }, this),
            benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-8",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: [
                            "Active Returns vs ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1281,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-2 gap-8",
                        children: portfolios.map((p_23, i_12)=>{
                            const portRets = results[i_12].yearlyData.map((d_8)=>d_8.annualReturn);
                            const bmRets = results[i_12].yearlyData.map((d_9)=>d_9.benchmarkReturn);
                            const upMonths = bmRets.map((r, idx_3)=>r > 0 ? {
                                    p: portRets[idx_3],
                                    b: r
                                } : null).filter(Boolean);
                            const downMonths = bmRets.map((r_0, idx_4)=>r_0 <= 0 ? {
                                    p: portRets[idx_4],
                                    b: r_0
                                } : null).filter(Boolean);
                            const upAbove = upMonths.filter((m)=>m.p > m.b).length;
                            const downAbove = downMonths.filter((m_0)=>m_0.p > m_0.b).length;
                            // Sort returns for the chart
                            const sortedReturns = results[i_12].yearlyData.map((d_10)=>({
                                    year: d_10.year,
                                    portRet: d_10.annualReturn,
                                    bmRet: d_10.benchmarkReturn,
                                    active: d_10.annualReturn - d_10.benchmarkReturn
                                })).sort((a_5, b)=>a_5.bmRet - b.bmRet);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold flex items-center gap-2",
                                        style: {
                                            color: p_23.color
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2.5 h-2.5 rounded-full",
                                                style: {
                                                    background: p_23.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1317,
                                                columnNumber: 21
                                            }, this),
                                            p_23.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1314,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    rowSpan: 2,
                                                                    className: "text-left text-xs font-medium py-2 px-3 border-b",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: "Market Type"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1328,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    colSpan: 4,
                                                                    className: "text-center text-xs font-medium py-1 px-3 border-b border-l",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: "Occurrences"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1332,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    colSpan: 3,
                                                                    className: "text-center text-xs font-medium py-1 px-3 border-b border-l",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: "Average Active Return"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1336,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1327,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                borderBottom: "1px solid var(--border)",
                                                                background: "var(--surface-elevated)"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3 border-l",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: "Above Benchmark"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1345,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "Below Benchmark"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1349,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "Total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1352,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "% Above"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1355,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3 border-l",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: "Above Benchmark"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1359,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "Below Benchmark"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1363,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right text-xs font-medium py-1.5 px-3",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: "Total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1366,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1341,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1326,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                borderBottom: "1px solid var(--border)"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-xs font-medium",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: "Up Market"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1375,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                                    style: {
                                                                        color: "var(--text-secondary)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: upAbove
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1378,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-secondary)"
                                                                    },
                                                                    children: upMonths.length - upAbove
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1382,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: upMonths.length
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1385,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: [
                                                                        upMonths.length > 0 ? Math.round(upAbove / upMonths.length * 100) : 0,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1388,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                                    style: {
                                                                        borderColor: "var(--border)",
                                                                        color: "var(--positive)"
                                                                    },
                                                                    children: fmtPct(upMonths.filter((m_1)=>m_1.p > m_1.b).reduce((s, m_2)=>s + (m_2.p - m_2.b), 0) / Math.max(1, upAbove))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1392,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--negative)"
                                                                    },
                                                                    children: fmtPct(upMonths.filter((m_3)=>m_3.p <= m_3.b).reduce((s_0, m_4)=>s_0 + (m_4.p - m_4.b), 0) / Math.max(1, upMonths.length - upAbove))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1398,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: fmtPct(upMonths.reduce((s_1, m_5)=>s_1 + (m_5.p - m_5.b), 0) / Math.max(1, upMonths.length))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1403,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1372,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                borderBottom: "1px solid var(--border)"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-xs font-medium",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: "Down Market"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1412,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                                    style: {
                                                                        color: "var(--text-secondary)",
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: downAbove
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1415,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-secondary)"
                                                                    },
                                                                    children: downMonths.length - downAbove
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1419,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: downMonths.length
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1422,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: [
                                                                        downMonths.length > 0 ? Math.round(downAbove / downMonths.length * 100) : 0,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1425,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs border-l",
                                                                    style: {
                                                                        borderColor: "var(--border)",
                                                                        color: "var(--positive)"
                                                                    },
                                                                    children: fmtPct(downMonths.filter((m_6)=>m_6.p > m_6.b).reduce((s_2, m_7)=>s_2 + (m_7.p - m_7.b), 0) / Math.max(1, downAbove))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1429,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--negative)"
                                                                    },
                                                                    children: fmtPct(downMonths.filter((m_8)=>m_8.p <= m_8.b).reduce((s_3, m_9)=>s_3 + (m_9.p - m_9.b), 0) / Math.max(1, downMonths.length - downAbove))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1435,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-2 text-right font-mono text-xs",
                                                                    style: {
                                                                        color: "var(--text-primary)"
                                                                    },
                                                                    children: fmtPct(downMonths.reduce((s_4, m_10)=>s_4 + (m_10.p - m_10.b), 0) / Math.max(1, downMonths.length))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                                    lineNumber: 1440,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                    lineNumber: 1371,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1324,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[200px] mt-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                data: sortedReturns,
                                                margin: {
                                                    top: 10,
                                                    right: 10,
                                                    left: -20,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        vertical: false,
                                                        stroke: "var(--border)",
                                                        opacity: 0.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1459,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "year",
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        dy: 10,
                                                        minTickGap: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1460,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        tickFormatter: (val_8)=>`${val_8}%`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1464,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: {
                                                            backgroundColor: "var(--surface-elevated)",
                                                            borderColor: "var(--border)",
                                                            borderRadius: "8px",
                                                            fontSize: "12px",
                                                            color: "var(--text-primary)"
                                                        },
                                                        formatter: (value_1)=>{
                                                            if (value_1 === undefined) return [
                                                                "-"
                                                            ];
                                                            return [
                                                                `${value_1.toFixed(2)}%`
                                                            ];
                                                        },
                                                        labelStyle: {
                                                            color: "var(--text-muted)",
                                                            marginBottom: "4px"
                                                        },
                                                        cursor: {
                                                            fill: "var(--surface-elevated)",
                                                            opacity: 0.4
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1468,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                        iconType: "circle",
                                                        wrapperStyle: {
                                                            fontSize: "10px",
                                                            paddingTop: "10px"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1484,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        dataKey: "bmRet",
                                                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                        fill: "var(--text-secondary)",
                                                        radius: [
                                                            2,
                                                            2,
                                                            0,
                                                            0
                                                        ],
                                                        opacity: 0.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1488,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        dataKey: "portRet",
                                                        name: p_23.label,
                                                        fill: p_23.color,
                                                        radius: [
                                                            2,
                                                            2,
                                                            0,
                                                            0
                                                        ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1489,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1453,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1452,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1451,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, `active-${p_23.id}`, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1313,
                                columnNumber: 18
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1285,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 1277,
                columnNumber: 32
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-xl border space-y-8",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Rolling Returns Analysis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1503,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-2 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: "3-Year Rolling Returns (CAGR)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[300px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                data: rolling3YData,
                                                margin: {
                                                    top: 10,
                                                    right: 10,
                                                    left: 10,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        vertical: false,
                                                        stroke: "var(--border)",
                                                        opacity: 0.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1521,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "period",
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        dy: 10,
                                                        minTickGap: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1522,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        tickFormatter: (val_9)=>`${val_9}%`,
                                                        width: 40
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1526,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: {
                                                            backgroundColor: "var(--surface-elevated)",
                                                            borderColor: "var(--border)",
                                                            borderRadius: "8px",
                                                            fontSize: "12px",
                                                            color: "var(--text-primary)"
                                                        },
                                                        formatter: (value_2)=>{
                                                            if (value_2 === undefined) return [
                                                                "-"
                                                            ];
                                                            return [
                                                                `${value_2.toFixed(2)}%`
                                                            ];
                                                        },
                                                        labelStyle: {
                                                            color: "var(--text-muted)",
                                                            marginBottom: "4px"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1530,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                        iconType: "circle",
                                                        wrapperStyle: {
                                                            fontSize: "10px",
                                                            paddingTop: "10px"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1543,
                                                        columnNumber: 19
                                                    }, this),
                                                    portfolios.map((p_24)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                            type: "monotone",
                                                            dataKey: p_24.label,
                                                            name: p_24.label,
                                                            stroke: p_24.color,
                                                            strokeWidth: 2,
                                                            dot: false
                                                        }, p_24.id, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1547,
                                                            columnNumber: 43
                                                        }, this)),
                                                    benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                        type: "monotone",
                                                        dataKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                        stroke: "var(--text-secondary)",
                                                        strokeWidth: 2,
                                                        strokeDasharray: "5 5",
                                                        dot: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1548,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1515,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1514,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1513,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1509,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold",
                                        style: {
                                            color: "var(--text-primary)"
                                        },
                                        children: "5-Year Rolling Returns (CAGR)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1556,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[300px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                data: rolling5YData,
                                                margin: {
                                                    top: 10,
                                                    right: 10,
                                                    left: 10,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        vertical: false,
                                                        stroke: "var(--border)",
                                                        opacity: 0.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1567,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "period",
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        dy: 10,
                                                        minTickGap: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1568,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        axisLine: false,
                                                        tickLine: false,
                                                        tick: {
                                                            fontSize: 10,
                                                            fill: "var(--text-muted)"
                                                        },
                                                        tickFormatter: (val_10)=>`${val_10}%`,
                                                        width: 40
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1572,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: {
                                                            backgroundColor: "var(--surface-elevated)",
                                                            borderColor: "var(--border)",
                                                            borderRadius: "8px",
                                                            fontSize: "12px",
                                                            color: "var(--text-primary)"
                                                        },
                                                        formatter: (value_3)=>{
                                                            if (value_3 === undefined) return [
                                                                "-"
                                                            ];
                                                            return [
                                                                `${value_3.toFixed(2)}%`
                                                            ];
                                                        },
                                                        labelStyle: {
                                                            color: "var(--text-muted)",
                                                            marginBottom: "4px"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1576,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                        iconType: "circle",
                                                        wrapperStyle: {
                                                            fontSize: "10px",
                                                            paddingTop: "10px"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1589,
                                                        columnNumber: 19
                                                    }, this),
                                                    portfolios.map((p_25)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                            type: "monotone",
                                                            dataKey: p_25.label,
                                                            name: p_25.label,
                                                            stroke: p_25.color,
                                                            strokeWidth: 2,
                                                            dot: false
                                                        }, p_25.id, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                            lineNumber: 1593,
                                                            columnNumber: 43
                                                        }, this)),
                                                    benchmark !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                        type: "monotone",
                                                        dataKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][benchmark],
                                                        stroke: "var(--text-secondary)",
                                                        strokeWidth: 2,
                                                        strokeDasharray: "5 5",
                                                        dot: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                        lineNumber: 1594,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                                lineNumber: 1561,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                            lineNumber: 1560,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                        lineNumber: 1559,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                                lineNumber: 1555,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                        lineNumber: 1507,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
                lineNumber: 1499,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/analytics/tactical-allocation/page.tsx",
        lineNumber: 324,
        columnNumber: 10
    }, this);
}
_s(TacticalAllocationPage, "sxweRFhKundFf8071s9lf4sCiNk=");
_c = TacticalAllocationPage;
var _c;
__turbopack_context__.k.register(_c, "TacticalAllocationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_070041f4._.js.map