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
"[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicAllocationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-right.js [app-client] (ecmascript) <export default as ArrowDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
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
const STRATEGY_LABELS = {
    "sma-crossover": "SMA Crossover (Trend Following)",
    "momentum": "Relative Momentum",
    "dual-momentum": "Dual Momentum (Absolute + Relative)",
    "volatility-targeting": "Volatility Targeting"
};
const ASSET_OPTIONS = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]);
_c = ASSET_OPTIONS;
const COLORS = {
    dynamic: "#6366f1",
    buyHold: "#f97316",
    safe: "#10b981",
    positive: "#10b981",
    negative: "#ef4444"
};
// ─── Dynamic Strategy Engine ─────────────────────────────────────────────────
function runDynamicStrategy(config, startYear, endYear, initialAmount) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i);
    // Compute trailing returns for lookback
    function trailingReturn(asset, currentYear, lookback) {
        let cumulative = 1;
        for(let y = currentYear - lookback; y < currentYear; y++){
            const r = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]?.[asset] ?? 0;
            cumulative *= 1 + r / 100;
        }
        return (cumulative - 1) * 100;
    }
    function realizedVol(asset, currentYear, lookback) {
        const rets = [];
        for(let y = currentYear - lookback; y < currentYear; y++){
            rets.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]?.[asset] ?? 0);
        }
        if (rets.length === 0) return 20; // default
        const mean = rets.reduce((s, r)=>s + r, 0) / rets.length;
        return Math.sqrt(rets.reduce((s, r)=>s + Math.pow(r - mean, 2), 0) / rets.length);
    }
    let dynamicValue = initialAmount;
    let buyHoldValue = initialAmount;
    let safeValue = initialAmount;
    let dynamicPeak = initialAmount;
    let buyHoldPeak = initialAmount;
    let turnoverCount = 0;
    let yearsInRisk = 0;
    let yearsInSafe = 0;
    let prevSignal = "risk";
    const yearlyData = [];
    const dynamicReturns = [];
    const buyHoldReturns = [];
    for (const year of years){
        const riskReturn = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.[config.riskAsset] ?? 0;
        const safeReturn = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.[config.safeAsset] ?? 0;
        // Determine signal
        let signal = "risk";
        let equityPct = 100;
        if (year > startYear + config.lookbackYears - 1) {
            const riskTrailing = trailingReturn(config.riskAsset, year, config.lookbackYears);
            const safeTrailing = trailingReturn(config.safeAsset, year, config.lookbackYears);
            switch(config.type){
                case "sma-crossover":
                    // If trailing return is negative, go to safe
                    signal = riskTrailing > 0 ? "risk" : "safe";
                    equityPct = signal === "risk" ? 100 : 0;
                    break;
                case "momentum":
                    // Invest in whichever had better trailing return
                    signal = riskTrailing > safeTrailing ? "risk" : "safe";
                    equityPct = signal === "risk" ? 100 : 0;
                    break;
                case "dual-momentum":
                    // Must beat safe AND have positive absolute momentum
                    if (riskTrailing > safeTrailing && riskTrailing > 0) {
                        signal = "risk";
                        equityPct = 100;
                    } else {
                        signal = "safe";
                        equityPct = 0;
                    }
                    break;
                case "volatility-targeting":
                    const vol = realizedVol(config.riskAsset, year, config.lookbackYears);
                    const target = config.targetVol ?? 15;
                    equityPct = Math.min(100, Math.max(0, Math.round(target / Math.max(vol, 1) * 100)));
                    signal = equityPct > 50 ? "risk" : equityPct > 0 ? "partial" : "safe";
                    break;
            }
        }
        if (signal !== prevSignal) turnoverCount++;
        if (signal === "risk" || signal === "partial") yearsInRisk++;
        else yearsInSafe++;
        prevSignal = signal;
        // Apply returns
        const dynamicReturn = equityPct / 100 * riskReturn + (100 - equityPct) / 100 * safeReturn;
        dynamicValue *= 1 + dynamicReturn / 100;
        buyHoldValue *= 1 + riskReturn / 100;
        safeValue *= 1 + safeReturn / 100;
        dynamicPeak = Math.max(dynamicPeak, dynamicValue);
        buyHoldPeak = Math.max(buyHoldPeak, buyHoldValue);
        const dynamicDrawdown = (dynamicValue - dynamicPeak) / dynamicPeak * 100;
        const buyHoldDrawdown = (buyHoldValue - buyHoldPeak) / buyHoldPeak * 100;
        dynamicReturns.push(dynamicReturn);
        buyHoldReturns.push(riskReturn);
        yearlyData.push({
            year,
            dynamicValue: Math.round(dynamicValue),
            buyHoldValue: Math.round(buyHoldValue),
            safeValue: Math.round(safeValue),
            dynamicReturn: Math.round(dynamicReturn * 10) / 10,
            buyHoldReturn: riskReturn,
            signal,
            equityPct,
            dynamicDrawdown: Math.round(dynamicDrawdown * 10) / 10,
            buyHoldDrawdown: Math.round(buyHoldDrawdown * 10) / 10
        });
    }
    const n = years.length;
    const dynamicCagr = n > 0 ? Math.round((Math.pow(dynamicValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;
    const buyHoldCagr = n > 0 ? Math.round((Math.pow(buyHoldValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;
    const safeCagr = n > 0 ? Math.round((Math.pow(safeValue / initialAmount, 1 / n) - 1) * 10000) / 100 : 0;
    const dynamicMaxDD = Math.round(Math.min(...yearlyData.map((d)=>d.dynamicDrawdown)) * 10) / 10;
    const buyHoldMaxDD = Math.round(Math.min(...yearlyData.map((d)=>d.buyHoldDrawdown)) * 10) / 10;
    const dMean = dynamicReturns.reduce((s, r)=>s + r, 0) / n;
    const bMean = buyHoldReturns.reduce((s, r)=>s + r, 0) / n;
    const dStd = Math.sqrt(dynamicReturns.reduce((s, r)=>s + Math.pow(r - dMean, 2), 0) / n);
    const bStd = Math.sqrt(buyHoldReturns.reduce((s, r)=>s + Math.pow(r - bMean, 2), 0) / n);
    const rf = 7; // approximate risk-free
    const dynamicSharpe = dStd > 0 ? Math.round((dMean - rf) / dStd * 100) / 100 : 0;
    const buyHoldSharpe = bStd > 0 ? Math.round((bMean - rf) / bStd * 100) / 100 : 0;
    const dDownDev = Math.sqrt(dynamicReturns.filter((r)=>r < rf).reduce((s, r)=>s + Math.pow(r - rf, 2), 0) / Math.max(dynamicReturns.filter((r)=>r < rf).length, 1));
    const bDownDev = Math.sqrt(buyHoldReturns.filter((r)=>r < rf).reduce((s, r)=>s + Math.pow(r - rf, 2), 0) / Math.max(buyHoldReturns.filter((r)=>r < rf).length, 1));
    const dynamicSortino = dDownDev > 0 ? Math.round((dMean - rf) / dDownDev * 100) / 100 : 0;
    const buyHoldSortino = bDownDev > 0 ? Math.round((bMean - rf) / bDownDev * 100) / 100 : 0;
    return {
        yearlyData,
        dynamicCagr,
        buyHoldCagr,
        safeCagr,
        dynamicMaxDD,
        buyHoldMaxDD,
        dynamicSharpe,
        buyHoldSharpe,
        dynamicSortino,
        buyHoldSortino,
        dynamicFinal: Math.round(dynamicValue),
        buyHoldFinal: Math.round(buyHoldValue),
        turnoverCount,
        yearsInRisk,
        yearsInSafe,
        dynamicStdDev: Math.round(dStd * 100) / 100,
        buyHoldStdDev: Math.round(bStd * 100) / 100
    };
}
function DynamicAllocationPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(96);
    if ($[0] !== "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486") {
        for(let $i = 0; $i < 96; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486";
    }
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("growth");
    const [strategyType, setStrategyType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dual-momentum");
    const [riskAsset, setRiskAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("nifty50");
    const [safeAsset, setSafeAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("debt");
    const [lookbackYears, setLookbackYears] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [targetVol, setTargetVol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15);
    const [startYear, setStartYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2000);
    const [endYear, setEndYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"]);
    const [initialAmount, setInitialAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1000000);
    const isValid = startYear + lookbackYears < endYear;
    let t0;
    if ($[1] !== endYear || $[2] !== initialAmount || $[3] !== lookbackYears || $[4] !== riskAsset || $[5] !== safeAsset || $[6] !== startYear || $[7] !== strategyType || $[8] !== targetVol) {
        t0 = function handleRun() {
            setRunning(true);
            setTimeout({
                "DynamicAllocationPage[handleRun > setTimeout()]": ()=>{
                    const result = runDynamicStrategy({
                        type: strategyType,
                        riskAsset,
                        safeAsset,
                        lookbackYears,
                        targetVol
                    }, startYear, endYear, initialAmount);
                    setResults(result);
                    setRunning(false);
                }
            }["DynamicAllocationPage[handleRun > setTimeout()]"], 50);
        };
        $[1] = endYear;
        $[2] = initialAmount;
        $[3] = lookbackYears;
        $[4] = riskAsset;
        $[5] = safeAsset;
        $[6] = startYear;
        $[7] = strategyType;
        $[8] = targetVol;
        $[9] = t0;
    } else {
        t0 = $[9];
    }
    const handleRun = t0;
    let t1;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            borderColor: "var(--border)",
            color: "var(--text-primary)"
        };
        $[10] = t1;
    } else {
        t1 = $[10];
    }
    const inputSt = t1;
    let t2;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 11,
            color: "var(--text-primary)"
        };
        $[11] = t2;
    } else {
        t2 = $[11];
    }
    const ttSt = t2;
    let t3;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    let t4;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "Dynamic Allocation"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 302,
            columnNumber: 10
        }, this);
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    let t5;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px]",
            style: {
                color: "var(--text-muted)"
            },
            children: "Test tactical timing strategies: shift between risk and safe assets based on momentum or volatility signals."
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 311,
            columnNumber: 10
        }, this);
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "DynamicAllocationPage[<select>.onChange]": (e)=>setStrategyType(e.target.value)
        })["DynamicAllocationPage[<select>.onChange]"];
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = Object.entries(STRATEGY_LABELS).map(_DynamicAllocationPageAnonymous);
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== strategyType) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Strategy Type",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: strategyType,
                onChange: t6,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t7
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 336,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 336,
            columnNumber: 10
        }, this);
        $[17] = strategyType;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            color: "var(--text-muted)"
        };
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    const t10 = strategyType === "sma-crossover" && "Go to safe asset when trailing return is negative (trend reversal).";
    const t11 = strategyType === "momentum" && "Invest in whichever asset (risk or safe) had the better trailing return.";
    const t12 = strategyType === "dual-momentum" && "Must beat safe asset AND have positive absolute return to stay in risk asset.";
    const t13 = strategyType === "volatility-targeting" && "Scale equity exposure inversely with realized volatility to maintain a target vol.";
    let t14;
    if ($[20] !== t10 || $[21] !== t11 || $[22] !== t12 || $[23] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[9px] leading-relaxed",
            style: t9,
            children: [
                t10,
                t11,
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 357,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t11;
        $[22] = t12;
        $[23] = t13;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    if ($[25] !== t14 || $[26] !== t8) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Strategy",
            children: [
                t8,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 368,
            columnNumber: 11
        }, this);
        $[25] = t14;
        $[26] = t8;
        $[27] = t15;
    } else {
        t15 = $[27];
    }
    let t16;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = ({
            "DynamicAllocationPage[<select>.onChange]": (e_0)=>setRiskAsset(e_0.target.value)
        })["DynamicAllocationPage[<select>.onChange]"];
        $[28] = t16;
    } else {
        t16 = $[28];
    }
    let t17;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ASSET_OPTIONS.map(_DynamicAllocationPageASSET_OPTIONSMap);
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    let t18;
    if ($[30] !== riskAsset) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Risk Asset",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: riskAsset,
                onChange: t16,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t17
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 393,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[30] = riskAsset;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "DynamicAllocationPage[<select>.onChange]": (e_1)=>setSafeAsset(e_1.target.value)
        })["DynamicAllocationPage[<select>.onChange]"];
        $[32] = t19;
    } else {
        t19 = $[32];
    }
    let t20;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = ASSET_OPTIONS.map(_DynamicAllocationPageASSET_OPTIONSMap2);
        $[33] = t20;
    } else {
        t20 = $[33];
    }
    let t21;
    if ($[34] !== safeAsset) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Safe Asset",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: safeAsset,
                onChange: t19,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t20
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 417,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 417,
            columnNumber: 11
        }, this);
        $[34] = safeAsset;
        $[35] = t21;
    } else {
        t21 = $[35];
    }
    let t22;
    if ($[36] !== t18 || $[37] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Assets",
            children: [
                t18,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 425,
            columnNumber: 11
        }, this);
        $[36] = t18;
        $[37] = t21;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = ({
            "DynamicAllocationPage[<select>.onChange]": (e_2)=>setLookbackYears(Number(e_2.target.value))
        })["DynamicAllocationPage[<select>.onChange]"];
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = [
            1,
            2,
            3,
            5
        ].map(_DynamicAllocationPageAnonymous2);
        $[40] = t24;
    } else {
        t24 = $[40];
    }
    let t25;
    if ($[41] !== lookbackYears) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Lookback Period (Years)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: lookbackYears,
                onChange: t23,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t24
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 450,
                columnNumber: 50
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 450,
            columnNumber: 11
        }, this);
        $[41] = lookbackYears;
        $[42] = t25;
    } else {
        t25 = $[42];
    }
    let t26;
    if ($[43] !== strategyType || $[44] !== targetVol) {
        t26 = strategyType === "volatility-targeting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Target Volatility (%)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                value: targetVol,
                min: 5,
                max: 40,
                onChange: {
                    "DynamicAllocationPage[<input>.onChange]": (e_3)=>setTargetVol(Number(e_3.target.value))
                }["DynamicAllocationPage[<input>.onChange]"],
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 458,
                columnNumber: 91
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 458,
            columnNumber: 54
        }, this);
        $[43] = strategyType;
        $[44] = targetVol;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    let t27;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = ({
            "DynamicAllocationPage[<select>.onChange]": (e_4)=>setStartYear(Number(e_4.target.value))
        })["DynamicAllocationPage[<select>.onChange]"];
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    let t28;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = Array.from({
            length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"]
        }, _DynamicAllocationPageArrayFrom).map(_DynamicAllocationPageAnonymous3);
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== startYear) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Start Year",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: startYear,
                onChange: t27,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t28
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 487,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 487,
            columnNumber: 11
        }, this);
        $[48] = startYear;
        $[49] = t29;
    } else {
        t29 = $[49];
    }
    let t30;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = ({
            "DynamicAllocationPage[<select>.onChange]": (e_5)=>setEndYear(Number(e_5.target.value))
        })["DynamicAllocationPage[<select>.onChange]"];
        $[50] = t30;
    } else {
        t30 = $[50];
    }
    let t31;
    if ($[51] !== startYear) {
        t31 = Array.from({
            length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - startYear + 1
        }, {
            "DynamicAllocationPage[Array.from()]": (__0, i_0)=>startYear + 1 + i_0
        }["DynamicAllocationPage[Array.from()]"]).filter(_DynamicAllocationPageAnonymous4).map(_DynamicAllocationPageAnonymous5);
        $[51] = startYear;
        $[52] = t31;
    } else {
        t31 = $[52];
    }
    let t32;
    if ($[53] !== endYear || $[54] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "End Year",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: endYear,
                onChange: t30,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t31
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 516,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 516,
            columnNumber: 11
        }, this);
        $[53] = endYear;
        $[54] = t31;
        $[55] = t32;
    } else {
        t32 = $[55];
    }
    let t33;
    if ($[56] !== t29 || $[57] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-2",
            children: [
                t29,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 525,
            columnNumber: 11
        }, this);
        $[56] = t29;
        $[57] = t32;
        $[58] = t33;
    } else {
        t33 = $[58];
    }
    let t34;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = ({
            "DynamicAllocationPage[<input>.onChange]": (e_6)=>setInitialAmount(Number(e_6.target.value))
        })["DynamicAllocationPage[<input>.onChange]"];
        $[59] = t34;
    } else {
        t34 = $[59];
    }
    let t35;
    if ($[60] !== initialAmount) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Initial Amount (\u20B9)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                value: initialAmount,
                onChange: t34,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 543,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 543,
            columnNumber: 11
        }, this);
        $[60] = initialAmount;
        $[61] = t35;
    } else {
        t35 = $[61];
    }
    let t36;
    if ($[62] !== t25 || $[63] !== t26 || $[64] !== t33 || $[65] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Parameters",
            children: [
                t25,
                t26,
                t33,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 551,
            columnNumber: 11
        }, this);
        $[62] = t25;
        $[63] = t26;
        $[64] = t33;
        $[65] = t35;
        $[66] = t36;
    } else {
        t36 = $[66];
    }
    let t37;
    if ($[67] !== t15 || $[68] !== t22 || $[69] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar",
            children: [
                t4,
                t5,
                t15,
                t22,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 562,
            columnNumber: 11
        }, this);
        $[67] = t15;
        $[68] = t22;
        $[69] = t36;
        $[70] = t37;
    } else {
        t37 = $[70];
    }
    let t38;
    if ($[71] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = {
            borderColor: "var(--border)"
        };
        $[71] = t38;
    } else {
        t38 = $[71];
    }
    const t39 = running || !isValid;
    let t40;
    if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = {
            background: "var(--accent-brand)",
            color: "var(--accent-foreground)"
        };
        $[72] = t40;
    } else {
        t40 = $[72];
    }
    let t41;
    if ($[73] !== running) {
        t41 = running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                            lineNumber: 592,
                            columnNumber: 93
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 2a10 10 0 0 1 10 10",
                            stroke: "currentColor",
                            strokeWidth: "3",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                            lineNumber: 592,
                            columnNumber: 184
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                    lineNumber: 592,
                    columnNumber: 23
                }, this),
                "Running…"
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                    lineNumber: 592,
                    columnNumber: 302
                }, this),
                " Run Strategy"
            ]
        }, void 0, true);
        $[73] = running;
        $[74] = t41;
    } else {
        t41 = $[74];
    }
    let t42;
    if ($[75] !== handleRun || $[76] !== t39 || $[77] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3 border-t",
            style: t38,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleRun,
                disabled: t39,
                className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60",
                style: t40,
                children: t41
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 600,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 600,
            columnNumber: 11
        }, this);
        $[75] = handleRun;
        $[76] = t39;
        $[77] = t41;
        $[78] = t42;
    } else {
        t42 = $[78];
    }
    let t43;
    if ($[79] !== t37 || $[80] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden",
            style: t3,
            children: [
                t37,
                t42
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 610,
            columnNumber: 11
        }, this);
        $[79] = t37;
        $[80] = t42;
        $[81] = t43;
    } else {
        t43 = $[81];
    }
    let t44;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[82] = t44;
    } else {
        t44 = $[82];
    }
    let t45;
    if ($[83] !== activeTab || $[84] !== endYear || $[85] !== lookbackYears || $[86] !== results || $[87] !== riskAsset || $[88] !== running || $[89] !== safeAsset || $[90] !== startYear || $[91] !== strategyType) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0",
            style: t44,
            children: !results && !running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                        style: {
                            background: "var(--surface-elevated)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                            size: 28,
                            style: {
                                color: "var(--text-muted)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                            lineNumber: 631,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                        lineNumber: 629,
                        columnNumber: 199
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Ready to Test Strategy"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                        lineNumber: 633,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-center max-w-sm",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: "Choose a timing strategy, configure assets and lookback period, then run to compare dynamic allocation against buy-and-hold."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                        lineNumber: 635,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 629,
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
                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                    lineNumber: 641,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2a10 10 0 0 1 10 10",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                    lineNumber: 641,
                                    columnNumber: 105
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                            lineNumber: 639,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                        lineNumber: 637,
                        columnNumber: 208
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
                                        label: "Dynamic CAGR",
                                        value: `${results.dynamicCagr}%`,
                                        sub: `vs ${results.buyHoldCagr}% B&H`,
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Max Drawdown",
                                        value: `${results.dynamicMaxDD}%`,
                                        sub: `vs ${results.buyHoldMaxDD}% B&H`,
                                        color: "var(--negative)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 151
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Sharpe",
                                        value: results.dynamicSharpe.toFixed(2),
                                        sub: `vs ${results.buyHoldSharpe.toFixed(2)} B&H`,
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 286
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Final Value",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.dynamicFinal),
                                        sub: `vs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.buyHoldFinal)}`,
                                        color: "var(--positive)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 436
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Turnovers",
                                        value: `${results.turnoverCount}`,
                                        sub: `${results.yearsInRisk}yr risk / ${results.yearsInSafe}yr safe`,
                                        color: "var(--text-primary)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 581
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                        label: "Volatility",
                                        value: `${results.dynamicStdDev}%`,
                                        sub: `vs ${results.buyHoldStdDev}% B&H`,
                                        color: "var(--accent-brand)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 747
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                lineNumber: 641,
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
                                        key: "signals",
                                        label: "Signal Timeline",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
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
                                        key: "metrics",
                                        label: "Comparison Table",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"]
                                    }
                                ].map({
                                    "DynamicAllocationPage[(anonymous)()]": (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "DynamicAllocationPage[(anonymous)() > <button>.onClick]": ()=>setActiveTab(t.key)
                                            }["DynamicAllocationPage[(anonymous)() > <button>.onClick]"],
                                            className: "px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5",
                                            style: {
                                                color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                                                borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 18
                                                }, this),
                                                t.label
                                            ]
                                        }, t.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                            lineNumber: 666,
                                            columnNumber: 60
                                        }, this)
                                }["DynamicAllocationPage[(anonymous)()]"])
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                lineNumber: 643,
                                columnNumber: 892
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 p-4 overflow-auto custom-scrollbar",
                                children: [
                                    activeTab === "growth" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                            data: results.yearlyData,
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
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _DynamicAllocationPageYAxisTickFormatter,
                                                    width: 60
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _DynamicAllocationPageTooltipFormatter
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 90
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 172
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                    type: "monotone",
                                                    dataKey: "dynamicValue",
                                                    name: "Dynamic Strategy",
                                                    stroke: COLORS.dynamic,
                                                    strokeWidth: 2.5,
                                                    dot: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                    type: "monotone",
                                                    dataKey: "buyHoldValue",
                                                    name: `Buy & Hold (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][riskAsset]})`,
                                                    stroke: COLORS.buyHold,
                                                    strokeWidth: 1.5,
                                                    dot: false,
                                                    strokeDasharray: "4 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 147
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                    type: "monotone",
                                                    dataKey: "safeValue",
                                                    name: `Safe (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][safeAsset]})`,
                                                    stroke: COLORS.safe,
                                                    strokeWidth: 1,
                                                    dot: false,
                                                    strokeDasharray: "2 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 319
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                            lineNumber: 672,
                                            columnNumber: 204
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 672,
                                        columnNumber: 156
                                    }, this),
                                    activeTab === "signals" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] mb-3 shrink-0",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: [
                                                    "Equity allocation % over time. Green = in risk asset, orange = in safe asset. ",
                                                    strategyType === "volatility-targeting" ? "Partial allocations based on vol ratio." : "Binary switches based on signal."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 578
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                        data: results.yearlyData,
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
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 692,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                dataKey: "year",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 692,
                                                                columnNumber: 101
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                tickFormatter: _DynamicAllocationPageYAxisTickFormatter2,
                                                                width: 40,
                                                                domain: [
                                                                    0,
                                                                    100
                                                                ]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: ttSt,
                                                                formatter: _DynamicAllocationPageTooltipFormatter2
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 113
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                dataKey: "equityPct",
                                                                name: "Equity Allocation %",
                                                                radius: [
                                                                    2,
                                                                    2,
                                                                    0,
                                                                    0
                                                                ],
                                                                children: results.yearlyData.map(_DynamicAllocationPageResultsYearlyDataMap)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 196
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 302
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 254
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                lineNumber: 687,
                                                columnNumber: 222
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 685,
                                        columnNumber: 540
                                    }, this),
                                    activeTab === "returns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: results.yearlyData,
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
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _DynamicAllocationPageYAxisTickFormatter3,
                                                    width: 50
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _DynamicAllocationPageTooltipFormatter3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 91
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 174
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                    y: 0,
                                                    stroke: "var(--text-muted)",
                                                    strokeWidth: 0.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "dynamicReturn",
                                                    name: "Dynamic",
                                                    fill: COLORS.dynamic,
                                                    radius: [
                                                        2,
                                                        2,
                                                        0,
                                                        0
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 90
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "buyHoldReturn",
                                                    name: "Buy & Hold",
                                                    fill: COLORS.buyHold,
                                                    radius: [
                                                        2,
                                                        2,
                                                        0,
                                                        0
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 180
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                            lineNumber: 698,
                                            columnNumber: 466
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 698,
                                        columnNumber: 418
                                    }, this),
                                    activeTab === "drawdowns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                            data: results.yearlyData,
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
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "year",
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 97
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 10,
                                                        fill: "var(--text-muted)"
                                                    },
                                                    tickFormatter: _DynamicAllocationPageYAxisTickFormatter4,
                                                    width: 50
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: ttSt,
                                                    formatter: _DynamicAllocationPageTooltipFormatter4
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 91
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    wrapperStyle: {
                                                        fontSize: 11
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 174
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                    y: 0,
                                                    stroke: "var(--text-muted)",
                                                    strokeWidth: 0.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                    type: "monotone",
                                                    dataKey: "dynamicDrawdown",
                                                    name: "Dynamic",
                                                    stroke: COLORS.dynamic,
                                                    fill: COLORS.dynamic,
                                                    fillOpacity: 0.15,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 90
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                    type: "monotone",
                                                    dataKey: "buyHoldDrawdown",
                                                    name: "Buy & Hold",
                                                    stroke: COLORS.buyHold,
                                                    fill: COLORS.buyHold,
                                                    fillOpacity: 0.05,
                                                    strokeWidth: 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 236
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                            lineNumber: 711,
                                            columnNumber: 385
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 711,
                                        columnNumber: 337
                                    }, this),
                                    activeTab === "metrics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-xs border-collapse",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                background: "var(--surface-elevated)"
                                                            },
                                                            children: [
                                                                "Metric",
                                                                "Dynamic Strategy",
                                                                `Buy & Hold (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][riskAsset]})`,
                                                                "Difference"
                                                            ].map(_DynamicAllocationPageAnonymous6)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 536
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 529
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: [
                                                            {
                                                                label: "CAGR",
                                                                dynamic: `${results.dynamicCagr}%`,
                                                                buyHold: `${results.buyHoldCagr}%`,
                                                                diff: results.dynamicCagr - results.buyHoldCagr,
                                                                pct: true
                                                            },
                                                            {
                                                                label: "Max Drawdown",
                                                                dynamic: `${results.dynamicMaxDD}%`,
                                                                buyHold: `${results.buyHoldMaxDD}%`,
                                                                diff: results.dynamicMaxDD - results.buyHoldMaxDD,
                                                                pct: true
                                                            },
                                                            {
                                                                label: "Std Dev",
                                                                dynamic: `${results.dynamicStdDev}%`,
                                                                buyHold: `${results.buyHoldStdDev}%`,
                                                                diff: results.dynamicStdDev - results.buyHoldStdDev,
                                                                pct: true
                                                            },
                                                            {
                                                                label: "Sharpe Ratio",
                                                                dynamic: results.dynamicSharpe.toFixed(2),
                                                                buyHold: results.buyHoldSharpe.toFixed(2),
                                                                diff: results.dynamicSharpe - results.buyHoldSharpe,
                                                                pct: false
                                                            },
                                                            {
                                                                label: "Sortino Ratio",
                                                                dynamic: results.dynamicSortino.toFixed(2),
                                                                buyHold: results.buyHoldSortino.toFixed(2),
                                                                diff: results.dynamicSortino - results.buyHoldSortino,
                                                                pct: false
                                                            },
                                                            {
                                                                label: "Final Value",
                                                                dynamic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.dynamicFinal),
                                                                buyHold: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.buyHoldFinal),
                                                                diff: results.dynamicFinal - results.buyHoldFinal,
                                                                pct: false
                                                            },
                                                            {
                                                                label: "Total Turnovers",
                                                                dynamic: `${results.turnoverCount}`,
                                                                buyHold: "0",
                                                                diff: 0,
                                                                pct: false
                                                            },
                                                            {
                                                                label: "Years in Risk Asset",
                                                                dynamic: `${results.yearsInRisk}`,
                                                                buyHold: `${results.yearlyData.length}`,
                                                                diff: 0,
                                                                pct: false
                                                            },
                                                            {
                                                                label: "Years in Safe Asset",
                                                                dynamic: `${results.yearsInSafe}`,
                                                                buyHold: "0",
                                                                diff: 0,
                                                                pct: false
                                                            }
                                                        ].map(_DynamicAllocationPageAnonymous7)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 162
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                lineNumber: 724,
                                                columnNumber: 479
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 rounded-lg border p-3",
                                                style: {
                                                    borderColor: "var(--border)",
                                                    background: "var(--surface-elevated)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold mb-2",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: "Strategy Notes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 18
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "text-[10px] space-y-1",
                                                        style: {
                                                            color: "var(--text-muted)"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    "• Strategy: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: STRATEGY_LABELS[strategyType]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                        lineNumber: 787,
                                                                        columnNumber: 36
                                                                    }, this),
                                                                    " with ",
                                                                    lookbackYears,
                                                                    "-year lookback"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 20
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    "• Risk asset: ",
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][riskAsset],
                                                                    " → Safe asset: ",
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][safeAsset]
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 124
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    "• Period: ",
                                                                    startYear,
                                                                    "–",
                                                                    endYear,
                                                                    " (",
                                                                    endYear - startYear + 1,
                                                                    " years)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 212
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    "• During the lookback warmup period (first ",
                                                                    lookbackYears,
                                                                    " year",
                                                                    lookbackYears > 1 ? "s" : "",
                                                                    "), the strategy defaults to the risk asset"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 286
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: "• No transaction costs or taxes applied. Real-world returns would be lower due to slippage."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 430
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 38
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                                lineNumber: 780,
                                                columnNumber: 76
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                        lineNumber: 724,
                                        columnNumber: 448
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                                lineNumber: 672,
                                columnNumber: 62
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 637,
                columnNumber: 149
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 629,
            columnNumber: 11
        }, this);
        $[83] = activeTab;
        $[84] = endYear;
        $[85] = lookbackYears;
        $[86] = results;
        $[87] = riskAsset;
        $[88] = running;
        $[89] = safeAsset;
        $[90] = startYear;
        $[91] = strategyType;
        $[92] = t45;
    } else {
        t45 = $[92];
    }
    let t46;
    if ($[93] !== t43 || $[94] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4 h-[calc(100vh-112px)] overflow-hidden",
            children: [
                t43,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 803,
            columnNumber: 11
        }, this);
        $[93] = t43;
        $[94] = t45;
        $[95] = t46;
    } else {
        t46 = $[95];
    }
    return t46;
}
_s(DynamicAllocationPage, "B5rYjf476z4dWWH+bqvdFtLCk7w=");
_c1 = DynamicAllocationPage;
// ─── Small UI helpers ─────────────────────────────────────────────────────────
function _DynamicAllocationPageAnonymous7(row) {
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
                children: row.label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 817,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-1.5 font-mono",
                style: {
                    color: "var(--accent-brand)"
                },
                children: row.dynamic
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 819,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-1.5 font-mono",
                style: {
                    color: "var(--text-primary)"
                },
                children: row.buyHold
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 821,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-1.5 font-mono",
                style: {
                    color: row.diff > 0 ? "var(--positive)" : row.diff < 0 ? "var(--negative)" : "var(--text-muted)"
                },
                children: row.diff !== 0 ? `${row.diff > 0 ? "+" : ""}${row.pct ? row.diff.toFixed(1) + "%" : row.label === "Final Value" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(row.diff) : row.diff.toFixed(2)}` : "\u2014"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
                lineNumber: 823,
                columnNumber: 26
            }, this)
        ]
    }, row.label, true, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 815,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageAnonymous6(h) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "text-left px-3 py-2 font-semibold whitespace-nowrap",
        style: {
            color: "var(--text-muted)",
            borderBottom: "1px solid var(--border)"
        },
        children: h
    }, h, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 828,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageTooltipFormatter4(v_7) {
    return `${Number(v_7).toFixed(1)}%`;
}
function _DynamicAllocationPageYAxisTickFormatter4(v_6) {
    return `${v_6}%`;
}
function _DynamicAllocationPageTooltipFormatter3(v_5) {
    return `${Number(v_5).toFixed(1)}%`;
}
function _DynamicAllocationPageYAxisTickFormatter3(v_4) {
    return `${v_4}%`;
}
function _DynamicAllocationPageResultsYearlyDataMap(d, i_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
        fill: d.signal === "risk" ? COLORS.positive : d.signal === "partial" ? COLORS.dynamic : COLORS.buyHold
    }, i_1, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 846,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageTooltipFormatter2(v_3) {
    return `${Number(v_3)}% equity`;
}
function _DynamicAllocationPageYAxisTickFormatter2(v_2) {
    return `${v_2}%`;
}
function _DynamicAllocationPageTooltipFormatter(v_1) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(Number(v_1));
}
function _DynamicAllocationPageYAxisTickFormatter(v_0) {
    return `₹${(v_0 / 100000).toFixed(0)}L`;
}
function _DynamicAllocationPageAnonymous5(y_2) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y_2,
        children: y_2
    }, y_2, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 861,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageAnonymous4(y_1) {
    return y_1 <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"];
}
function _DynamicAllocationPageAnonymous3(y_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y_0,
        children: y_0
    }, y_0, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 867,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageArrayFrom(_, i) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"] + i;
}
function _DynamicAllocationPageAnonymous2(y) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y,
        children: [
            y,
            " year",
            y > 1 ? "s" : ""
        ]
    }, y, true, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 873,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageASSET_OPTIONSMap2(t0) {
    const [k_1, l_0] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: k_1,
        children: l_0
    }, k_1, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 877,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageASSET_OPTIONSMap(t0) {
    const [k_0, l] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: k_0,
        children: l
    }, k_0, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 881,
        columnNumber: 10
    }, this);
}
function _DynamicAllocationPageAnonymous(t0) {
    const [k, v] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: k,
        children: v
    }, k, false, {
        fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
        lineNumber: 885,
        columnNumber: 10
    }, this);
}
function Section(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486";
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 920,
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 928,
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
    if ($[0] !== "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486";
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 960,
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 968,
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2de69612fb4de9f53c70e1e9a02a3ed9702c653127393416df497b68cc51d486";
    }
    const { label, value, sub, color } = t0;
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 1012,
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
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 1030,
            columnNumber: 10
        }, this);
        $[7] = t4;
        $[8] = value;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            color: "var(--text-muted)"
        };
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== sub) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[9px] mt-0.5",
            style: t6,
            children: sub
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 1048,
            columnNumber: 10
        }, this);
        $[11] = sub;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t3 || $[14] !== t5 || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border p-2.5",
            style: t1,
            children: [
                t3,
                t5,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/dynamic-allocation/page.tsx",
            lineNumber: 1056,
            columnNumber: 10
        }, this);
        $[13] = t3;
        $[14] = t5;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    return t8;
}
_c4 = SummaryCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ASSET_OPTIONS");
__turbopack_context__.k.register(_c1, "DynamicAllocationPage");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "Field");
__turbopack_context__.k.register(_c4, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_5863e87c._.js.map