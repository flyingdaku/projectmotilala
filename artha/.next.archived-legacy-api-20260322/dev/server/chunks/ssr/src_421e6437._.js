module.exports = [
"[project]/src/lib/india-historical-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/app/(app)/analytics/pca/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PCAPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-ssr] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$scatter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScatterChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-scatter.js [app-ssr] (ecmascript) <export default as ScatterChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ScatterChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ScatterChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Scatter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Scatter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ZAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ZAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/india-historical-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// ─── PCA Engine (power iteration, no external lib) ──────────────────────────
const ALL_ASSETS = [
    "nifty50",
    "nifty500",
    "niftyMidcap",
    "gold",
    "debt",
    "balanced"
];
const COLORS = [
    "#6366f1",
    "#f97316",
    "#10b981",
    "#ef4444",
    "#a855f7",
    "#eab308"
];
function runPCA(assets, startYear, endYear) {
    const years = Array.from({
        length: endYear - startYear + 1
    }, (_, i)=>startYear + i).filter((y)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]);
    const n = years.length;
    const p = assets.length;
    // Build return matrix and standardize
    const rawReturns = years.map((y)=>assets.map((a)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANNUAL_RETURNS"][y]?.[a] ?? 0));
    const means = assets.map((_, j)=>rawReturns.reduce((s, row)=>s + row[j], 0) / n);
    const stds = assets.map((_, j)=>{
        const m = means[j];
        return Math.sqrt(rawReturns.reduce((s, row)=>s + Math.pow(row[j] - m, 2), 0) / n);
    });
    const standardized = rawReturns.map((row)=>row.map((v, j)=>stds[j] > 0 ? (v - means[j]) / stds[j] : 0));
    // Correlation matrix (= covariance of standardized data)
    const corrMatrix = Array.from({
        length: p
    }, ()=>Array(p).fill(0));
    for(let i = 0; i < p; i++){
        for(let j = 0; j < p; j++){
            let sum = 0;
            for(let k = 0; k < n; k++)sum += standardized[k][i] * standardized[k][j];
            corrMatrix[i][j] = sum / n;
        }
    }
    // Power iteration to extract eigenvalues/vectors
    const eigenvalues = [];
    const eigenvectors = [];
    const A = corrMatrix.map((row)=>[
            ...row
        ]);
    for(let comp = 0; comp < p; comp++){
        let v = Array.from({
            length: p
        }, ()=>Math.random());
        let eigenvalue = 0;
        for(let iter = 0; iter < 200; iter++){
            // Multiply A * v
            const Av = A.map((row)=>row.reduce((s, val, j)=>s + val * v[j], 0));
            eigenvalue = Math.sqrt(Av.reduce((s, x)=>s + x * x, 0));
            if (eigenvalue === 0) break;
            v = Av.map((x)=>x / eigenvalue);
        }
        eigenvalues.push(eigenvalue);
        eigenvectors.push([
            ...v
        ]);
        // Deflate: A = A - eigenvalue * v * v^T
        for(let i = 0; i < p; i++){
            for(let j = 0; j < p; j++){
                A[i][j] -= eigenvalue * v[i] * v[j];
            }
        }
    }
    const totalVar = eigenvalues.reduce((s, e)=>s + e, 0);
    const varianceExplained = eigenvalues.map((e)=>Math.round(e / totalVar * 10000) / 100);
    const cumulativeVariance = [];
    varianceExplained.reduce((sum, v)=>{
        const c = sum + v;
        cumulativeVariance.push(Math.round(c * 100) / 100);
        return c;
    }, 0);
    // Loadings = eigenvectors (each eigenvector is a column of loadings)
    const loadings = eigenvectors;
    // Scores: project standardized data onto principal components
    const scores = years.map((year, i)=>{
        const row = standardized[i];
        return {
            year,
            pc1: Math.round(row.reduce((s, v, j)=>s + v * eigenvectors[0][j], 0) * 100) / 100,
            pc2: Math.round(row.reduce((s, v, j)=>s + v * (eigenvectors[1]?.[j] ?? 0), 0) * 100) / 100
        };
    });
    return {
        eigenvalues,
        varianceExplained,
        cumulativeVariance,
        loadings,
        scores,
        correlationMatrix: corrMatrix.map((row)=>row.map((v)=>Math.round(v * 100) / 100)),
        assetNames: assets.map((a)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ASSET_LABELS"][a]),
        nComponents: p
    };
}
function PCAPage() {
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("scree");
    const [startYear, setStartYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2000);
    const [endYear, setEndYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["END_YEAR"]);
    const [selectedAssets, setSelectedAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        ...ALL_ASSETS
    ]);
    function toggleAsset(asset) {
        setSelectedAssets((prev)=>prev.includes(asset) ? prev.filter((a)=>a !== asset) : [
                ...prev,
                asset
            ]);
    }
    const isValid = selectedAssets.length >= 3 && startYear < endYear;
    function handleRun() {
        setRunning(true);
        setTimeout(()=>{
            setResults(runPCA(selectedAssets, startYear, endYear));
            setRunning(false);
        }, 50);
    }
    const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
    const inputSt = {
        borderColor: "var(--border)",
        color: "var(--text-primary)"
    };
    const ttSt = {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        fontSize: 11,
        color: "var(--text-primary)"
    };
    // Scree chart data
    const screeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!results) return [];
        return results.varianceExplained.map((v, i)=>({
                component: `PC${i + 1}`,
                variance: v,
                cumulative: results.cumulativeVariance[i]
            }));
    }, [
        results
    ]);
    // Loadings heatmap data
    const loadingsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!results) return [];
        return results.assetNames.map((name, ai)=>{
            const row = {
                asset: name
            };
            for(let c = 0; c < Math.min(results.nComponents, 4); c++){
                row[`PC${c + 1}`] = Math.round(results.loadings[c][ai] * 1000) / 1000;
            }
            return row;
        });
    }, [
        results
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-4 h-[calc(100vh-112px)] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                children: "Principal Component Analysis"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px]",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: "Decompose Indian asset class returns into orthogonal principal components to identify the key drivers of portfolio variance."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Time Period",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Start Year",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: startYear,
                                                onChange: (e)=>setStartYear(Number(e.target.value)),
                                                className: inputCls,
                                                style: inputSt,
                                                children: Array.from({
                                                    length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["END_YEAR"] - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["START_YEAR"]
                                                }, (_, i)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["START_YEAR"] + i).map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: y,
                                                        children: y
                                                    }, y, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 101
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "End Year",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: endYear,
                                                onChange: (e)=>setEndYear(Number(e.target.value)),
                                                className: inputCls,
                                                style: inputSt,
                                                children: Array.from({
                                                    length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["END_YEAR"] - startYear + 1
                                                }, (_, i)=>startYear + 1 + i).filter((y)=>y <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["END_YEAR"]).map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: y,
                                                        children: y
                                                    }, y, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 134
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Select Assets (min 3)",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: ALL_ASSETS.map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedAssets.includes(asset),
                                                        onChange: ()=>toggleAsset(asset),
                                                        className: "rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px]",
                                                        style: {
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$india$2d$historical$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ASSET_LABELS"][asset]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, asset, true, {
                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] mt-1",
                                        style: {
                                            color: selectedAssets.length >= 3 ? "var(--text-muted)" : "var(--negative)"
                                        },
                                        children: [
                                            selectedAssets.length,
                                            " asset",
                                            selectedAssets.length !== 1 ? "s" : "",
                                            " selected",
                                            selectedAssets.length < 3 ? " (need at least 3)" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Interpretation Guide",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] space-y-1.5",
                                    style: {
                                        color: "var(--text-muted)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "PC1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 18
                                                }, this),
                                                " typically captures the broad market/risk-on factor — when most assets move together."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "PC2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 18
                                                }, this),
                                                " often captures the equity-vs-debt rotation or gold-vs-equity divergence."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Loadings"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 18
                                                }, this),
                                                " show how much each asset contributes to each component. Higher absolute values = stronger influence."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Scree plot"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 18
                                                }, this),
                                                ': components to the left of the "elbow" explain meaningful variance; the rest is noise.'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-t",
                        style: {
                            borderColor: "var(--border)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRun,
                            disabled: running || !isValid,
                            className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60",
                            style: {
                                background: "var(--accent-brand)",
                                color: "var(--accent-foreground)"
                            },
                            children: running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "animate-spin w-4 h-4",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "3",
                                                strokeOpacity: "0.3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 97
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 2a10 10 0 0 1 10 10",
                                                stroke: "currentColor",
                                                strokeWidth: "3",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 188
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 27
                                    }, this),
                                    "Computing…"
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 310
                                    }, this),
                                    " Run PCA"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0",
                style: {
                    background: "var(--surface)",
                    borderColor: "var(--border)"
                },
                children: !results && !running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col items-center justify-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                            style: {
                                background: "var(--surface-elevated)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                size: 28,
                                style: {
                                    color: "var(--text-muted)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 228,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-medium",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: "Ready for PCA"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-center max-w-sm",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: "Select assets and time period, then run to decompose returns into principal components."
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full relative",
                    children: [
                        running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm",
                            style: {
                                background: "rgba(0,0,0,0.3)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "animate-spin w-10 h-10",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                style: {
                                    color: "var(--accent-brand)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "3",
                                        strokeOpacity: "0.2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 130
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 2a10 10 0 0 1 10 10",
                                        stroke: "currentColor",
                                        strokeWidth: "3",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 221
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                lineNumber: 239,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                            lineNumber: 238,
                            columnNumber: 15
                        }, this),
                        results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 border-b grid grid-cols-4 gap-2",
                                    style: {
                                        borderColor: "var(--border)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                            label: "PC1 Variance",
                                            value: `${results.varianceExplained[0]}%`,
                                            color: "var(--accent-brand)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                            label: "PC2 Variance",
                                            value: `${results.varianceExplained[1] ?? 0}%`,
                                            color: "#f97316"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                            label: "PC1+PC2",
                                            value: `${results.cumulativeVariance[1] ?? results.cumulativeVariance[0]}%`,
                                            color: "var(--positive)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                            label: "Components",
                                            value: `${results.nComponents}`,
                                            color: "var(--text-primary)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                    lineNumber: 246,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 px-4 pt-2 pb-0 border-b",
                                    style: {
                                        borderColor: "var(--border)"
                                    },
                                    children: [
                                        {
                                            key: "scree",
                                            label: "Scree Plot",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"]
                                        },
                                        {
                                            key: "loadings",
                                            label: "Loadings",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"]
                                        },
                                        {
                                            key: "biplot",
                                            label: "Biplot (PC1 vs PC2)",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$scatter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScatterChart$3e$__["ScatterChart"]
                                        },
                                        {
                                            key: "scores",
                                            label: "Score Timeline",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
                                        },
                                        {
                                            key: "correlation",
                                            label: "Correlation Matrix",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"]
                                        }
                                    ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(t.key),
                                            className: "px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5",
                                            style: {
                                                color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                                                borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 23
                                                }, this),
                                                t.label
                                            ]
                                        }, t.key, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-h-0 p-4 overflow-auto custom-scrollbar",
                                    children: [
                                        activeTab === "scree" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] mb-3 shrink-0",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: 'Variance explained by each principal component. The "elbow" indicates where additional components add diminishing value.'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-h-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: "100%",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: screeData,
                                                            margin: {
                                                                top: 5,
                                                                right: 30,
                                                                left: 10,
                                                                bottom: 5
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3",
                                                                    stroke: "var(--border)",
                                                                    vertical: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "component",
                                                                    tick: {
                                                                        fontSize: 11,
                                                                        fill: "var(--text-muted)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    yAxisId: "left",
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    },
                                                                    tickFormatter: (v)=>`${v}%`,
                                                                    width: 50
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    yAxisId: "right",
                                                                    orientation: "right",
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    },
                                                                    tickFormatter: (v)=>`${v}%`,
                                                                    width: 50,
                                                                    domain: [
                                                                        0,
                                                                        100
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                    contentStyle: ttSt
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                                                    wrapperStyle: {
                                                                        fontSize: 11
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 288,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    yAxisId: "left",
                                                                    dataKey: "variance",
                                                                    name: "Variance Explained %",
                                                                    fill: "#6366f1",
                                                                    radius: [
                                                                        4,
                                                                        4,
                                                                        0,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                                                    yAxisId: "right",
                                                                    type: "monotone",
                                                                    dataKey: "cumulative",
                                                                    name: "Cumulative %",
                                                                    stroke: "#f97316",
                                                                    strokeWidth: 2,
                                                                    dot: {
                                                                        r: 4,
                                                                        fill: "#f97316"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 21
                                        }, this),
                                        activeTab === "loadings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] mb-3",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "Factor loadings show each asset's contribution to each principal component. Values range from -1 to +1."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full text-xs border-collapse",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                style: {
                                                                    background: "var(--surface-elevated)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left px-3 py-2 font-semibold",
                                                                        style: {
                                                                            color: "var(--text-muted)",
                                                                            borderBottom: "1px solid var(--border)"
                                                                        },
                                                                        children: "Asset"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    Array.from({
                                                                        length: Math.min(results.nComponents, 4)
                                                                    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "text-left px-3 py-2 font-semibold",
                                                                            style: {
                                                                                color: "var(--text-muted)",
                                                                                borderBottom: "1px solid var(--border)"
                                                                            },
                                                                            children: [
                                                                                "PC",
                                                                                i + 1,
                                                                                " (",
                                                                                results.varianceExplained[i],
                                                                                "%)"
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: loadingsData.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-b",
                                                                    style: {
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-3 py-1.5 font-semibold",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: row.asset
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                            lineNumber: 316,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        Array.from({
                                                                            length: Math.min(results.nComponents, 4)
                                                                        }, (_, c)=>{
                                                                            const val = row[`PC${c + 1}`];
                                                                            const absVal = Math.abs(val);
                                                                            const bgOpacity = Math.min(absVal * 0.8, 0.4);
                                                                            const bgColor = val > 0 ? `rgba(16,185,129,${bgOpacity})` : `rgba(239,68,68,${bgOpacity})`;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-3 py-1.5 font-mono text-center",
                                                                                style: {
                                                                                    color: "var(--text-primary)",
                                                                                    background: bgColor
                                                                                },
                                                                                children: [
                                                                                    val > 0 ? "+" : "",
                                                                                    val.toFixed(3)
                                                                                ]
                                                                            }, c, true, {
                                                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                                lineNumber: 323,
                                                                                columnNumber: 35
                                                                            }, this);
                                                                        })
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 315,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 298,
                                            columnNumber: 21
                                        }, this),
                                        activeTab === "biplot" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] mb-3 shrink-0",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "Each point is a year plotted on PC1 (x) vs PC2 (y). Arrows show asset loading directions. Years that cluster together had similar return patterns."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-h-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: "100%",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ScatterChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScatterChart"], {
                                                            margin: {
                                                                top: 10,
                                                                right: 30,
                                                                left: 10,
                                                                bottom: 10
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3",
                                                                    stroke: "var(--border)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 343,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "pc1",
                                                                    name: "PC1",
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    },
                                                                    label: {
                                                                        value: `PC1 (${results.varianceExplained[0]}%)`,
                                                                        position: "bottom",
                                                                        fontSize: 11,
                                                                        fill: "var(--text-muted)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    dataKey: "pc2",
                                                                    name: "PC2",
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    },
                                                                    label: {
                                                                        value: `PC2 (${results.varianceExplained[1] ?? 0}%)`,
                                                                        angle: -90,
                                                                        position: "insideLeft",
                                                                        fontSize: 11,
                                                                        fill: "var(--text-muted)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ZAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZAxis"], {
                                                                    range: [
                                                                        40,
                                                                        40
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                    contentStyle: ttSt,
                                                                    formatter: (v)=>Number(v).toFixed(2),
                                                                    labelFormatter: (_, payload)=>{
                                                                        const item = payload?.[0]?.payload;
                                                                        return item ? `Year ${item.year}` : "";
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                    x: 0,
                                                                    stroke: "var(--text-muted)",
                                                                    strokeWidth: 0.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 351,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                    y: 0,
                                                                    stroke: "var(--text-muted)",
                                                                    strokeWidth: 0.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 352,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Scatter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scatter"], {
                                                                    data: results.scores,
                                                                    fill: "#6366f1",
                                                                    children: results.scores.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                                                            fill: s.pc1 > 0 ? "#10b981" : "#ef4444"
                                                                        }, i, false, {
                                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                            lineNumber: 355,
                                                                            columnNumber: 33
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 353,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex flex-wrap gap-3",
                                                    children: results.assetNames.map((name, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 rounded-full",
                                                                    style: {
                                                                        background: COLORS[i % COLORS.length]
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 365,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px]",
                                                                    style: {
                                                                        color: "var(--text-muted)"
                                                                    },
                                                                    children: [
                                                                        name,
                                                                        ": (",
                                                                        results.loadings[0][i] > 0 ? "+" : "",
                                                                        results.loadings[0][i].toFixed(2),
                                                                        ", ",
                                                                        (results.loadings[1]?.[i] ?? 0) > 0 ? "+" : "",
                                                                        (results.loadings[1]?.[i] ?? 0).toFixed(2),
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 366,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 336,
                                            columnNumber: 21
                                        }, this),
                                        activeTab === "scores" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] mb-3 shrink-0",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "PC1 and PC2 scores over time. Positive PC1 typically corresponds to broadly positive market years."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-h-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: "100%",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: results.scores,
                                                            margin: {
                                                                top: 5,
                                                                right: 10,
                                                                left: 10,
                                                                bottom: 5
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3",
                                                                    stroke: "var(--border)",
                                                                    vertical: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "year",
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    tick: {
                                                                        fontSize: 10,
                                                                        fill: "var(--text-muted)"
                                                                    },
                                                                    width: 40
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 385,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                    contentStyle: ttSt,
                                                                    formatter: (v)=>Number(v).toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                                                    wrapperStyle: {
                                                                        fontSize: 11
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                                    y: 0,
                                                                    stroke: "var(--text-muted)",
                                                                    strokeWidth: 0.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 388,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "pc1",
                                                                    name: "PC1 Score",
                                                                    fill: "#6366f1",
                                                                    radius: [
                                                                        2,
                                                                        2,
                                                                        0,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 389,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "pc2",
                                                                    name: "PC2 Score",
                                                                    fill: "#f97316",
                                                                    radius: [
                                                                        2,
                                                                        2,
                                                                        0,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 382,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 376,
                                            columnNumber: 21
                                        }, this),
                                        activeTab === "correlation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] mb-3",
                                                    style: {
                                                        color: "var(--text-muted)"
                                                    },
                                                    children: "Correlation matrix of standardized returns. PCA decomposes this matrix into eigenvalues and eigenvectors."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full text-xs border-collapse",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                style: {
                                                                    background: "var(--surface-elevated)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left px-3 py-2 font-semibold",
                                                                        style: {
                                                                            color: "var(--text-muted)",
                                                                            borderBottom: "1px solid var(--border)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    results.assetNames.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "text-center px-2 py-2 font-semibold",
                                                                            style: {
                                                                                color: "var(--text-muted)",
                                                                                borderBottom: "1px solid var(--border)",
                                                                                fontSize: 10
                                                                            },
                                                                            children: name
                                                                        }, name, false, {
                                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                            lineNumber: 407,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: results.correlationMatrix.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-b",
                                                                    style: {
                                                                        borderColor: "var(--border)"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-3 py-1.5 font-semibold whitespace-nowrap",
                                                                            style: {
                                                                                color: "var(--text-primary)"
                                                                            },
                                                                            children: results.assetNames[i]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                            lineNumber: 414,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        row.map((val, j)=>{
                                                                            const absVal = Math.abs(val);
                                                                            const bgOpacity = Math.min(absVal * 0.5, 0.4);
                                                                            const bgColor = i === j ? "var(--surface-elevated)" : val > 0 ? `rgba(16,185,129,${bgOpacity})` : `rgba(239,68,68,${bgOpacity})`;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-2 py-1.5 font-mono text-center",
                                                                                style: {
                                                                                    color: "var(--text-primary)",
                                                                                    background: bgColor,
                                                                                    fontSize: 11
                                                                                },
                                                                                children: val.toFixed(2)
                                                                            }, j, false, {
                                                                                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                                lineNumber: 420,
                                                                                columnNumber: 35
                                                                            }, this);
                                                                        })
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                                    lineNumber: 413,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
// ─── Small UI helpers ─────────────────────────────────────────────────────────
function Section({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border p-3 space-y-2",
        style: {
            borderColor: "var(--border)",
            background: "var(--surface-elevated)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] font-semibold uppercase tracking-wider",
                style: {
                    color: "var(--text-muted)"
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 446,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
function Field({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-[10px] mb-0.5 block",
                style: {
                    color: "var(--text-muted)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
        lineNumber: 454,
        columnNumber: 5
    }, this);
}
function SummaryCard({ label, value, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border p-2.5",
        style: {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[9px] font-semibold uppercase tracking-wider mb-0.5",
                style: {
                    color: "var(--text-muted)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-mono font-bold leading-tight",
                style: {
                    color
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/analytics/pca/page.tsx",
        lineNumber: 463,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_421e6437._.js.map