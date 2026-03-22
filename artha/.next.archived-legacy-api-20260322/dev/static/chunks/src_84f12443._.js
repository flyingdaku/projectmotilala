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
"[project]/src/app/(app)/analytics/factor-regression/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FactorRegressionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ScatterChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ScatterChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Scatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Scatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ZAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ZAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/india-historical-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// ─── OLS Engine ──────────────────────────────────────────────────────────────
function runOLS(y, X) {
    const n = y.length;
    const p = X[0].length;
    const XtX = Array.from({
        length: p
    }, ()=>Array(p).fill(0));
    for(let i = 0; i < p; i++)for(let j = 0; j < p; j++)for(let k = 0; k < n; k++)XtX[i][j] += X[k][i] * X[k][j];
    const Xty = Array(p).fill(0);
    for(let i = 0; i < p; i++)for(let k = 0; k < n; k++)Xty[i] += X[k][i] * y[k];
    const aug = XtX.map((row, i)=>[
            ...row,
            ...Array(p).fill(0).map((_, j)=>i === j ? 1 : 0)
        ]);
    for(let i = 0; i < p; i++){
        let maxRow = i;
        for(let k = i + 1; k < p; k++)if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k;
        [aug[i], aug[maxRow]] = [
            aug[maxRow],
            aug[i]
        ];
        const pivot = aug[i][i];
        if (Math.abs(pivot) < 1e-12) continue;
        for(let j = 0; j < 2 * p; j++)aug[i][j] /= pivot;
        for(let k = 0; k < p; k++){
            if (k === i) continue;
            const f = aug[k][i];
            for(let j = 0; j < 2 * p; j++)aug[k][j] -= f * aug[i][j];
        }
    }
    const inv = aug.map((row)=>row.slice(p));
    const coeffs = inv.map((row)=>row.reduce((s, v, j)=>s + v * Xty[j], 0));
    const yMean = y.reduce((s, v)=>s + v, 0) / n;
    const ssTotal = y.reduce((s, v)=>s + Math.pow(v - yMean, 2), 0);
    const residuals = y.map((v, i)=>v - X[i].reduce((s, xv, j)=>s + xv * coeffs[j], 0));
    const ssResid = residuals.reduce((s, r)=>s + r * r, 0);
    const rSquared = ssTotal > 0 ? 1 - ssResid / ssTotal : 0;
    return {
        coeffs,
        rSquared,
        residuals
    };
}
const FACTOR_LABELS = {
    market: "Market (Nifty 500 − Rf)",
    size: "Size (Midcap − Large)",
    goldDebt: "Gold − Debt",
    momentum: "Momentum (prev yr return)"
};
function getFactorValue(factor, year, asset) {
    const rf = 7;
    switch(factor){
        case "market":
            return (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.nifty500 ?? 0) - rf;
        case "size":
            return (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.niftyMidcap ?? 0) - (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.nifty50 ?? 0);
        case "goldDebt":
            return (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.gold ?? 0) - (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year]?.debt ?? 0);
        case "momentum":
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][year - 1]?.[asset ?? "nifty50"] ?? 0;
        default:
            return 0;
    }
}
const ASSET_OPTIONS = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"]);
_c = ASSET_OPTIONS;
const ALL_FACTORS = [
    "market",
    "size",
    "goldDebt",
    "momentum"
];
function runFactorModel(asset, factors, startYear, endYear) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i).filter((y)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]);
    const rf = 7;
    const y = years.map((yr)=>(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][yr]?.[asset] ?? 0) - rf);
    const X = years.map((yr)=>[
            1,
            ...factors.map((f)=>getFactorValue(f, yr, asset))
        ]);
    const { coeffs, rSquared, residuals: resids } = runOLS(y, X);
    const [alpha, ...betas] = coeffs;
    const residualData = years.map((yr, i)=>({
            year: yr,
            actual: Math.round(y[i] * 100) / 100,
            predicted: Math.round((y[i] - resids[i]) * 100) / 100,
            residual: Math.round(resids[i] * 100) / 100
        }));
    // Rolling 5-year alpha
    const rollingAlpha = [];
    const window = 5;
    for(let end = startYear + window - 1; end <= endYear; end++){
        const wYears = Array.from({
            length: window
        }, (_, i)=>end - window + 1 + i).filter((yr)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][yr]);
        if (wYears.length < window) continue;
        const wy = wYears.map((yr)=>(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][yr]?.[asset] ?? 0) - rf);
        const wX = wYears.map((yr)=>[
                1,
                ...factors.map((f)=>getFactorValue(f, yr, asset))
            ]);
        const { coeffs: wCoeffs } = runOLS(wy, wX);
        rollingAlpha.push({
            year: end,
            alpha: Math.round(wCoeffs[0] * 100) / 100
        });
    }
    return {
        asset,
        assetLabel: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSET_LABELS"][asset],
        alpha: Math.round(alpha * 100) / 100,
        betas: factors.map((f, i)=>({
                factor: f,
                beta: Math.round(betas[i] * 1000) / 1000
            })),
        rSquared: Math.round(rSquared * 10000) / 100,
        residualData,
        rollingAlpha
    };
}
function FactorRegressionPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(64);
    if ($[0] !== "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd") {
        for(let $i = 0; $i < 64; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd";
    }
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("summary");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            "nifty50",
            "niftyMidcap",
            "gold"
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [selectedAssets, setSelectedAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "market",
            "size",
            "goldDebt"
        ];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [selectedFactors, setSelectedFactors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [startYear, setStartYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2000);
    const [endYear, setEndYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"]);
    const [activeResult, setActiveResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = function toggleAsset(a) {
            setSelectedAssets({
                "FactorRegressionPage[toggleAsset > setSelectedAssets()]": (prev)=>prev.includes(a) ? prev.filter({
                        "FactorRegressionPage[toggleAsset > setSelectedAssets() > prev.filter()]": (x)=>x !== a
                    }["FactorRegressionPage[toggleAsset > setSelectedAssets() > prev.filter()]"]) : [
                        ...prev,
                        a
                    ]
            }["FactorRegressionPage[toggleAsset > setSelectedAssets()]"]);
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const toggleAsset = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = function toggleFactor(f) {
            setSelectedFactors({
                "FactorRegressionPage[toggleFactor > setSelectedFactors()]": (prev_0)=>prev_0.includes(f) ? prev_0.filter({
                        "FactorRegressionPage[toggleFactor > setSelectedFactors() > prev_0.filter()]": (x_0)=>x_0 !== f
                    }["FactorRegressionPage[toggleFactor > setSelectedFactors() > prev_0.filter()]"]) : [
                        ...prev_0,
                        f
                    ]
            }["FactorRegressionPage[toggleFactor > setSelectedFactors()]"]);
        };
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const toggleFactor = t3;
    const isValid = selectedAssets.length >= 1 && selectedFactors.length >= 1 && startYear < endYear;
    let t4;
    if ($[5] !== endYear || $[6] !== selectedAssets || $[7] !== selectedFactors || $[8] !== startYear) {
        t4 = function handleRun() {
            setRunning(true);
            setTimeout({
                "FactorRegressionPage[handleRun > setTimeout()]": ()=>{
                    setResults(selectedAssets.map({
                        "FactorRegressionPage[handleRun > setTimeout() > selectedAssets.map()]": (a_0)=>runFactorModel(a_0, selectedFactors, startYear, endYear)
                    }["FactorRegressionPage[handleRun > setTimeout() > selectedAssets.map()]"]));
                    setRunning(false);
                }
            }["FactorRegressionPage[handleRun > setTimeout()]"], 50);
        };
        $[5] = endYear;
        $[6] = selectedAssets;
        $[7] = selectedFactors;
        $[8] = startYear;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const handleRun = t4;
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            borderColor: "var(--border)",
            color: "var(--text-primary)"
        };
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const inputSt = t5;
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 11,
            color: "var(--text-primary)"
        };
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const ttSt = t6;
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold",
            style: {
                color: "var(--text-primary)"
            },
            children: "Factor Regression"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 274,
            columnNumber: 10
        }, this);
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px]",
            style: {
                color: "var(--text-muted)"
            },
            children: "Multi-factor regression for individual asset classes. Decompose returns into systematic factor exposures and alpha."
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 283,
            columnNumber: 10
        }, this);
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "FactorRegressionPage[<select>.onChange]": (e)=>setStartYear(Number(e.target.value))
        })["FactorRegressionPage[<select>.onChange]"];
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = Array.from({
            length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"]
        }, _FactorRegressionPageArrayFrom).map(_FactorRegressionPageAnonymous);
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== startYear) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Start Year",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: startYear,
                onChange: t10,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t11
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 310,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[17] = startYear;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = ({
            "FactorRegressionPage[<select>.onChange]": (e_0)=>setEndYear(Number(e_0.target.value))
        })["FactorRegressionPage[<select>.onChange]"];
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== startYear) {
        t14 = Array.from({
            length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"] - startYear + 1
        }, {
            "FactorRegressionPage[Array.from()]": (__0, i_0)=>startYear + 1 + i_0
        }["FactorRegressionPage[Array.from()]"]).filter(_FactorRegressionPageAnonymous2).map(_FactorRegressionPageAnonymous3);
        $[20] = startYear;
        $[21] = t14;
    } else {
        t14 = $[21];
    }
    let t15;
    if ($[22] !== endYear || $[23] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "End Year",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: endYear,
                onChange: t13,
                className: "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent",
                style: inputSt,
                children: t14
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 339,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[22] = endYear;
        $[23] = t14;
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] !== t12 || $[26] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Time Period",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    t12,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 348,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 348,
            columnNumber: 11
        }, this);
        $[25] = t12;
        $[26] = t15;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== selectedAssets) {
        t17 = ASSET_OPTIONS.map({
            "FactorRegressionPage[ASSET_OPTIONS.map()]": (t18)=>{
                const [k, label] = t18;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: selectedAssets.includes(k),
                            onChange: {
                                "FactorRegressionPage[ASSET_OPTIONS.map() > <input>.onChange]": ()=>toggleAsset(k)
                            }["FactorRegressionPage[ASSET_OPTIONS.map() > <input>.onChange]"],
                            className: "rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 360,
                            columnNumber: 82
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px]",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 362,
                            columnNumber: 100
                        }, this)
                    ]
                }, k, true, {
                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                    lineNumber: 360,
                    columnNumber: 16
                }, this);
            }
        }["FactorRegressionPage[ASSET_OPTIONS.map()]"]);
        $[28] = selectedAssets;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    let t18;
    if ($[30] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Dependent Variables (Assets)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                children: t17
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 374,
                columnNumber: 57
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[30] = t17;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== selectedFactors) {
        t19 = ALL_FACTORS.map({
            "FactorRegressionPage[ALL_FACTORS.map()]": (f_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: selectedFactors.includes(f_0),
                            onChange: {
                                "FactorRegressionPage[ALL_FACTORS.map() > <input>.onChange]": ()=>toggleFactor(f_0)
                            }["FactorRegressionPage[ALL_FACTORS.map() > <input>.onChange]"],
                            className: "rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 383,
                            columnNumber: 125
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px]",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: FACTOR_LABELS[f_0]
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 385,
                            columnNumber: 96
                        }, this)
                    ]
                }, f_0, true, {
                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                    lineNumber: 383,
                    columnNumber: 57
                }, this)
        }["FactorRegressionPage[ALL_FACTORS.map()]"]);
        $[32] = selectedFactors;
        $[33] = t19;
    } else {
        t19 = $[33];
    }
    let t20;
    if ($[34] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1.5",
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[34] = t19;
        $[35] = t20;
    } else {
        t20 = $[35];
    }
    let t21;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[9px] mt-1 italic",
            style: {
                color: "var(--text-muted)"
            },
            children: "R(asset) − Rf = α + Σ βᵢ·Factorᵢ + ε"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 404,
            columnNumber: 11
        }, this);
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    let t22;
    if ($[37] !== t20) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Independent Variables (Factors)",
            children: [
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 413,
            columnNumber: 11
        }, this);
        $[37] = t20;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== t16 || $[40] !== t18 || $[41] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar",
            children: [
                t8,
                t9,
                t16,
                t18,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 421,
            columnNumber: 11
        }, this);
        $[39] = t16;
        $[40] = t18;
        $[41] = t22;
        $[42] = t23;
    } else {
        t23 = $[42];
    }
    let t24;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = {
            borderColor: "var(--border)"
        };
        $[43] = t24;
    } else {
        t24 = $[43];
    }
    const t25 = running || !isValid;
    let t26;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = {
            background: "var(--accent-brand)",
            color: "var(--accent-foreground)"
        };
        $[44] = t26;
    } else {
        t26 = $[44];
    }
    let t27;
    if ($[45] !== running) {
        t27 = running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 451,
                            columnNumber: 93
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 2a10 10 0 0 1 10 10",
                            stroke: "currentColor",
                            strokeWidth: "3",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 451,
                            columnNumber: 184
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                    lineNumber: 451,
                    columnNumber: 23
                }, this),
                "Regressing…"
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                    lineNumber: 451,
                    columnNumber: 305
                }, this),
                " Run Regression"
            ]
        }, void 0, true);
        $[45] = running;
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    let t28;
    if ($[47] !== handleRun || $[48] !== t25 || $[49] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3 border-t",
            style: t24,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleRun,
                disabled: t25,
                className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60",
                style: t26,
                children: t27
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 459,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 459,
            columnNumber: 11
        }, this);
        $[47] = handleRun;
        $[48] = t25;
        $[49] = t27;
        $[50] = t28;
    } else {
        t28 = $[50];
    }
    let t29;
    if ($[51] !== t23 || $[52] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden",
            style: t7,
            children: [
                t23,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 469,
            columnNumber: 11
        }, this);
        $[51] = t23;
        $[52] = t28;
        $[53] = t29;
    } else {
        t29 = $[53];
    }
    let t30;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[54] = t30;
    } else {
        t30 = $[54];
    }
    let t31;
    if ($[55] !== activeResult || $[56] !== activeTab || $[57] !== results || $[58] !== running || $[59] !== selectedFactors) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0",
            style: t30,
            children: !results && !running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                        style: {
                            background: "var(--surface-elevated)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                            size: 28,
                            style: {
                                color: "var(--text-muted)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 490,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                        lineNumber: 488,
                        columnNumber: 199
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium",
                        style: {
                            color: "var(--text-primary)"
                        },
                        children: "Factor Model Ready"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                        lineNumber: 492,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-center max-w-sm",
                        style: {
                            color: "var(--text-muted)"
                        },
                        children: "Select assets and factors to run a multi-factor regression and decompose asset returns."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                        lineNumber: 494,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 488,
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
                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                    lineNumber: 500,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2a10 10 0 0 1 10 10",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                    lineNumber: 500,
                                    columnNumber: 105
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                            lineNumber: 498,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                        lineNumber: 496,
                        columnNumber: 171
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-4 pt-2 pb-0 border-b",
                                style: {
                                    borderColor: "var(--border)"
                                },
                                children: [
                                    {
                                        key: "summary",
                                        label: "Regression Summary",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"]
                                    },
                                    {
                                        key: "residuals",
                                        label: "Residuals",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"]
                                    },
                                    {
                                        key: "scatter",
                                        label: "Actual vs Predicted",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"]
                                    },
                                    {
                                        key: "rolling",
                                        label: "Rolling Alpha",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                                    }
                                ].map({
                                    "FactorRegressionPage[(anonymous)()]": (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "FactorRegressionPage[(anonymous)() > <button>.onClick]": ()=>setActiveTab(t.key)
                                            }["FactorRegressionPage[(anonymous)() > <button>.onClick]"],
                                            className: "px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5",
                                            style: {
                                                color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                                                borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 18
                                                }, this),
                                                t.label
                                            ]
                                        }, t.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                            lineNumber: 519,
                                            columnNumber: 59
                                        }, this)
                                }["FactorRegressionPage[(anonymous)()]"])
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                lineNumber: 500,
                                columnNumber: 228
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 p-4 overflow-auto custom-scrollbar",
                                children: [
                                    activeTab === "summary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-left px-3 py-2 font-semibold",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderBottom: "1px solid var(--border)"
                                                                    },
                                                                    children: "Asset"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 22
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-left px-3 py-2 font-semibold",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderBottom: "1px solid var(--border)"
                                                                    },
                                                                    children: "Alpha (α)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 34
                                                                }, this),
                                                                selectedFactors.map(_FactorRegressionPageSelectedFactorsMap),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-left px-3 py-2 font-semibold",
                                                                    style: {
                                                                        color: "var(--text-muted)",
                                                                        borderBottom: "1px solid var(--border)"
                                                                    },
                                                                    children: "R²"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 100
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 244
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 237
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: results.map({
                                                            "FactorRegressionPage[results.map()]": (r, i_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-b cursor-pointer hover:opacity-80",
                                                                    style: {
                                                                        borderColor: "var(--border)",
                                                                        background: activeResult === i_1 ? "var(--surface-elevated)" : undefined
                                                                    },
                                                                    onClick: {
                                                                        "FactorRegressionPage[results.map() > <tr>.onClick]": ()=>setActiveResult(i_1)
                                                                    }["FactorRegressionPage[results.map() > <tr>.onClick]"],
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-3 py-1.5 font-semibold",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: r.assetLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                            lineNumber: 542,
                                                                            columnNumber: 78
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-3 py-1.5 font-mono",
                                                                            style: {
                                                                                color: r.alpha > 0 ? "var(--positive)" : r.alpha < 0 ? "var(--negative)" : "var(--text-muted)"
                                                                            },
                                                                            children: [
                                                                                r.alpha > 0 ? "+" : "",
                                                                                r.alpha.toFixed(2),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                            lineNumber: 544,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        r.betas.map(_FactorRegressionPageResultsMapRBetasMap),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-3 py-1.5 font-mono font-semibold",
                                                                            style: {
                                                                                color: r.rSquared > 70 ? "var(--positive)" : "var(--text-muted)"
                                                                            },
                                                                            children: [
                                                                                r.rSquared.toFixed(1),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                            lineNumber: 546,
                                                                            columnNumber: 131
                                                                        }, this)
                                                                    ]
                                                                }, r.asset, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 72
                                                                }, this)
                                                        }["FactorRegressionPage[results.map()]"])
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 187
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] mt-3",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: "Click a row to view its residuals, scatter, and rolling alpha in other tabs."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 77
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                        lineNumber: 525,
                                        columnNumber: 156
                                    }, this),
                                    activeTab === "residuals" && results[activeResult] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] mb-3 shrink-0",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: [
                                                    "Residuals for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: results[activeResult].assetLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 198
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                        data: results[activeResult].residualData,
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
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                dataKey: "year",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 101
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                tickFormatter: _FactorRegressionPageYAxisTickFormatter,
                                                                width: 45
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: ttSt,
                                                                formatter: _FactorRegressionPageTooltipFormatter
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 93
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                y: 0,
                                                                stroke: "var(--text-muted)",
                                                                strokeWidth: 0.5
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 174
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                dataKey: "residual",
                                                                name: "Residual",
                                                                radius: [
                                                                    2,
                                                                    2,
                                                                    0,
                                                                    0
                                                                ],
                                                                children: results[activeResult].residualData.map(_FactorRegressionPageAnonymous4)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 242
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 167
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 119
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 87
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 160
                                    }, this),
                                    activeTab === "scatter" && results[activeResult] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] mb-3 shrink-0",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: [
                                                    "Actual vs predicted for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: results[activeResult].assetLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 42
                                                    }, this),
                                                    " (R² = ",
                                                    results[activeResult].rSquared,
                                                    "%)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 564,
                                                columnNumber: 520
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ScatterChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScatterChart"], {
                                                        margin: {
                                                            top: 10,
                                                            right: 10,
                                                            left: 10,
                                                            bottom: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                strokeDasharray: "3 3",
                                                                stroke: "var(--border)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                dataKey: "predicted",
                                                                name: "Predicted",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                label: {
                                                                    value: "Predicted (%)",
                                                                    position: "bottom",
                                                                    fontSize: 11,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 84
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                dataKey: "actual",
                                                                name: "Actual",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                label: {
                                                                    value: "Actual (%)",
                                                                    angle: -90,
                                                                    position: "insideLeft",
                                                                    fontSize: 11,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ZAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZAxis"], {
                                                                range: [
                                                                    50,
                                                                    50
                                                                ]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: ttSt,
                                                                formatter: _FactorRegressionPageTooltipFormatter2,
                                                                labelFormatter: _FactorRegressionPageTooltipLabelFormatter
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 52
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Scatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scatter"], {
                                                                data: results[activeResult].residualData,
                                                                fill: "#6366f1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 194
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 218
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 170
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 566,
                                                columnNumber: 138
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                        lineNumber: 564,
                                        columnNumber: 482
                                    }, this),
                                    activeTab === "rolling" && results[activeResult] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] mb-3 shrink-0",
                                                style: {
                                                    color: "var(--text-muted)"
                                                },
                                                children: [
                                                    "5-year rolling alpha for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: results[activeResult].assetLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 43
                                                    }, this),
                                                    " — shows how excess return after factor adjustment evolves over time."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 403
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                        data: results[activeResult].rollingAlpha,
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
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                dataKey: "year",
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 101
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                tick: {
                                                                    fontSize: 10,
                                                                    fill: "var(--text-muted)"
                                                                },
                                                                tickFormatter: _FactorRegressionPageYAxisTickFormatter2,
                                                                width: 45
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 598,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: ttSt,
                                                                formatter: _FactorRegressionPageTooltipFormatter3
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 601,
                                                                columnNumber: 94
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                y: 0,
                                                                stroke: "var(--text-muted)",
                                                                strokeWidth: 0.5
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 601,
                                                                columnNumber: 176
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                dataKey: "alpha",
                                                                name: "Rolling \u03B1",
                                                                radius: [
                                                                    2,
                                                                    2,
                                                                    0,
                                                                    0
                                                                ],
                                                                children: results[activeResult].rollingAlpha.map(_FactorRegressionPageAnonymous5)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                                lineNumber: 601,
                                                                columnNumber: 244
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 247
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 199
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                                lineNumber: 590,
                                                columnNumber: 167
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                        lineNumber: 588,
                                        columnNumber: 365
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                                lineNumber: 525,
                                columnNumber: 61
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
                lineNumber: 496,
                columnNumber: 112
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 488,
            columnNumber: 11
        }, this);
        $[55] = activeResult;
        $[56] = activeTab;
        $[57] = results;
        $[58] = running;
        $[59] = selectedFactors;
        $[60] = t31;
    } else {
        t31 = $[60];
    }
    let t32;
    if ($[61] !== t29 || $[62] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4 h-[calc(100vh-112px)] overflow-hidden",
            children: [
                t29,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 613,
            columnNumber: 11
        }, this);
        $[61] = t29;
        $[62] = t31;
        $[63] = t32;
    } else {
        t32 = $[63];
    }
    return t32;
}
_s(FactorRegressionPage, "Uwj+LZBVM7FtK3y1UZ2BIh+QkEw=");
_c1 = FactorRegressionPage;
// ─── Small UI helpers ─────────────────────────────────────────────────────────
function _FactorRegressionPageAnonymous5(d_1, i_3) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: d_1.alpha >= 0 ? "#6366f1" : "#ef4444"
    }, i_3, false, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 625,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageTooltipFormatter3(v_3) {
    return `${Number(v_3).toFixed(2)}%`;
}
function _FactorRegressionPageYAxisTickFormatter2(v_2) {
    return `${v_2}%`;
}
function _FactorRegressionPageTooltipLabelFormatter(__1, payload) {
    const d_0 = payload?.[0]?.payload;
    return d_0 ? `Year ${d_0.year}` : "";
}
function _FactorRegressionPageTooltipFormatter2(v_1) {
    return `${Number(v_1).toFixed(1)}%`;
}
function _FactorRegressionPageAnonymous4(d, i_2) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: d.residual >= 0 ? "#10b981" : "#ef4444"
    }, i_2, false, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 641,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageTooltipFormatter(v_0) {
    return `${Number(v_0).toFixed(2)}%`;
}
function _FactorRegressionPageYAxisTickFormatter(v) {
    return `${v}%`;
}
function _FactorRegressionPageResultsMapRBetasMap(b) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "px-3 py-1.5 font-mono",
        style: {
            color: "var(--text-primary)"
        },
        children: [
            b.beta > 0 ? "+" : "",
            b.beta.toFixed(3)
        ]
    }, b.factor, true, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 650,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageSelectedFactorsMap(f_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "text-left px-3 py-2 font-semibold whitespace-nowrap",
        style: {
            color: "var(--text-muted)",
            borderBottom: "1px solid var(--border)"
        },
        children: [
            "β ",
            FACTOR_LABELS[f_1].split("(")[0].trim()
        ]
    }, f_1, true, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 655,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageAnonymous3(y_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y_1,
        children: y_1
    }, y_1, false, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 661,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageAnonymous2(y_0) {
    return y_0 <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["END_YEAR"];
}
function _FactorRegressionPageAnonymous(y) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y,
        children: y
    }, y, false, {
        fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
        lineNumber: 667,
        columnNumber: 10
    }, this);
}
function _FactorRegressionPageArrayFrom(_, i) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_YEAR"] + i;
}
function Section(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd";
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
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 705,
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
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 713,
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
    if ($[0] !== "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1fc0999f08b0ff8065aeb69fe28a5e6d9efdd7e8b4e48e6c5ab7f527836436cd";
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
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 745,
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
            fileName: "[project]/src/app/(app)/analytics/factor-regression/page.tsx",
            lineNumber: 753,
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
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ASSET_OPTIONS");
__turbopack_context__.k.register(_c1, "FactorRegressionPage");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_84f12443._.js.map