import { formatDate } from "./utils";

// --- Performance chart data ---
export function generatePerformanceData(months = 12) {
  const data = [];
  let portfolio = 4000000;
  let nifty = 4000000;
  const now = new Date();
  for (let i = months; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    portfolio *= 1 + (Math.random() * 0.06 - 0.02);
    nifty *= 1 + (Math.random() * 0.05 - 0.02);
    data.push({
      date: d.toISOString().slice(0, 10),
      portfolio: Math.round(portfolio),
      nifty: Math.round(nifty),
    });
  }
  return data;
}

// --- Allocation data ---
export const allocationData = [
  { name: "Large Cap Equity", value: 2200000, percent: 45.4 },
  { name: "Mid Cap Equity", value: 980000, percent: 20.2 },
  { name: "Debt Funds", value: 720000, percent: 14.9 },
  { name: "International", value: 480000, percent: 9.9 },
  { name: "Gold", value: 310000, percent: 6.4 },
  { name: "Cash", value: 160000, percent: 3.3 },
];

// --- Holdings data ---
export const holdingsData = [
  {
    id: "1",
    symbol: "RELIANCE",
    company: "Reliance Industries Ltd",
    exchange: "NSE",
    qty: 50,
    avgCost: 2450.0,
    ltp: 2891.5,
    value: 144575,
    pnl: 22075,
    pnlPct: 18.0,
    xirr: 22.4,
    daysHeld: 420,
    isLTCG: true,
  },
  {
    id: "2",
    symbol: "INFY",
    company: "Infosys Ltd",
    exchange: "NSE",
    qty: 120,
    avgCost: 1580.0,
    ltp: 1724.3,
    value: 206916,
    pnl: 17316,
    pnlPct: 9.1,
    xirr: 11.2,
    daysHeld: 380,
    isLTCG: true,
  },
  {
    id: "3",
    symbol: "HDFCBANK",
    company: "HDFC Bank Ltd",
    exchange: "NSE",
    qty: 80,
    avgCost: 1620.0,
    ltp: 1543.8,
    value: 123504,
    pnl: -6096,
    pnlPct: -4.7,
    xirr: -5.8,
    daysHeld: 290,
    isLTCG: false,
  },
  {
    id: "4",
    symbol: "TCS",
    company: "Tata Consultancy Services",
    exchange: "NSE",
    qty: 30,
    avgCost: 3820.0,
    ltp: 4156.2,
    value: 124686,
    pnl: 10086,
    pnlPct: 8.8,
    xirr: 14.1,
    daysHeld: 195,
    isLTCG: false,
  },
  {
    id: "5",
    symbol: "WIPRO",
    company: "Wipro Ltd",
    exchange: "BSE",
    qty: 200,
    avgCost: 445.0,
    ltp: 512.6,
    value: 102520,
    pnl: 13520,
    pnlPct: 15.2,
    xirr: 19.8,
    daysHeld: 340,
    isLTCG: false,
  },
  {
    id: "6",
    symbol: "BAJFINANCE",
    company: "Bajaj Finance Ltd",
    exchange: "NSE",
    qty: 15,
    avgCost: 6800.0,
    ltp: 7234.5,
    value: 108518,
    pnl: 6518,
    pnlPct: 6.4,
    xirr: 8.9,
    daysHeld: 410,
    isLTCG: true,
  },
  {
    id: "7",
    symbol: "AXISBANK",
    company: "Axis Bank Ltd",
    exchange: "NSE",
    qty: 100,
    avgCost: 1050.0,
    ltp: 1124.8,
    value: 112480,
    pnl: 7480,
    pnlPct: 7.1,
    xirr: 9.4,
    daysHeld: 450,
    isLTCG: true,
  },
  {
    id: "8",
    symbol: "MARUTI",
    company: "Maruti Suzuki India Ltd",
    exchange: "NSE",
    qty: 10,
    avgCost: 10200.0,
    ltp: 9876.4,
    value: 98764,
    pnl: -3236,
    pnlPct: -3.2,
    xirr: -4.1,
    daysHeld: 120,
    isLTCG: false,
  },
];

// --- Top movers ---
export const topMovers = [
  { symbol: "RELIANCE", name: "Reliance Industries", changePct: 3.2, pnl: 4512 },
  { symbol: "INFY", name: "Infosys", changePct: 2.1, pnl: 2890 },
  { symbol: "TCS", name: "Tata Consultancy", changePct: -1.4, pnl: -1820 },
  { symbol: "HDFCBANK", name: "HDFC Bank", changePct: -0.8, pnl: -980 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", changePct: 1.7, pnl: 1840 },
];

// --- Upcoming events ---
export const upcomingEvents = [
  {
    type: "tax" as const,
    title: "LTCG Exemption Deadline",
    desc: "₹1.25L exemption resets on 31 Mar",
    date: "31 Mar 2026",
    urgent: true,
  },
  {
    type: "sip" as const,
    title: "SIP Due — Axis Bluechip",
    desc: "₹5,000 SIP on 5th of every month",
    date: "5 Mar 2026",
    urgent: false,
  },
  {
    type: "elss" as const,
    title: "ELSS Lock-in Expiry",
    desc: "Axis Long Term Equity — ₹50,000",
    date: "14 Mar 2026",
    urgent: false,
  },
  {
    type: "tax" as const,
    title: "Advance Tax Due",
    desc: "Q4 advance tax payment deadline",
    date: "15 Mar 2026",
    urgent: false,
  },
];

// --- Annual returns ---
export const annualReturns = [
  { year: "FY20", portfolio: -12.4, nifty: -26.0 },
  { year: "FY21", portfolio: 68.2, nifty: 71.0 },
  { year: "FY22", portfolio: 22.1, nifty: 18.9 },
  { year: "FY23", portfolio: -4.8, nifty: -0.6 },
  { year: "FY24", portfolio: 38.4, nifty: 29.0 },
  { year: "FY25", portfolio: 18.2, nifty: 5.1 },
];

// --- Heatmap data (calendar year × asset class) ---
export const heatmapRows = ["Large Cap", "Mid Cap", "Small Cap", "Debt", "Gold", "Intl"];
export const heatmapCols = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
export const heatmapData = [
  { row: "Large Cap", col: "2019", value: 14.9 },
  { row: "Large Cap", col: "2020", value: 15.1 },
  { row: "Large Cap", col: "2021", value: 24.1 },
  { row: "Large Cap", col: "2022", value: 5.0 },
  { row: "Large Cap", col: "2023", value: 20.3 },
  { row: "Large Cap", col: "2024", value: 13.9 },
  { row: "Large Cap", col: "2025", value: 4.2 },
  { row: "Mid Cap", col: "2019", value: 0.5 },
  { row: "Mid Cap", col: "2020", value: 22.3 },
  { row: "Mid Cap", col: "2021", value: 39.4 },
  { row: "Mid Cap", col: "2022", value: 4.8 },
  { row: "Mid Cap", col: "2023", value: 32.7 },
  { row: "Mid Cap", col: "2024", value: 24.6 },
  { row: "Mid Cap", col: "2025", value: -8.1 },
  { row: "Small Cap", col: "2019", value: -7.3 },
  { row: "Small Cap", col: "2020", value: 28.9 },
  { row: "Small Cap", col: "2021", value: 63.7 },
  { row: "Small Cap", col: "2022", value: 2.8 },
  { row: "Small Cap", col: "2023", value: 47.2 },
  { row: "Small Cap", col: "2024", value: 22.1 },
  { row: "Small Cap", col: "2025", value: -14.6 },
  { row: "Debt", col: "2019", value: 9.8 },
  { row: "Debt", col: "2020", value: 11.2 },
  { row: "Debt", col: "2021", value: 4.1 },
  { row: "Debt", col: "2022", value: 3.9 },
  { row: "Debt", col: "2023", value: 7.2 },
  { row: "Debt", col: "2024", value: 8.1 },
  { row: "Debt", col: "2025", value: 7.4 },
  { row: "Gold", col: "2019", value: 22.4 },
  { row: "Gold", col: "2020", value: 28.1 },
  { row: "Gold", col: "2021", value: -4.8 },
  { row: "Gold", col: "2022", value: 12.3 },
  { row: "Gold", col: "2023", value: 14.8 },
  { row: "Gold", col: "2024", value: 21.3 },
  { row: "Gold", col: "2025", value: 18.7 },
  { row: "Intl", col: "2019", value: 26.3 },
  { row: "Intl", col: "2020", value: 18.4 },
  { row: "Intl", col: "2021", value: 22.1 },
  { row: "Intl", col: "2022", value: -18.4 },
  { row: "Intl", col: "2023", value: 24.2 },
  { row: "Intl", col: "2024", value: 19.8 },
  { row: "Intl", col: "2025", value: -3.2 },
];

// --- Tax data ---
export const capitalGainsData = [
  {
    id: "1",
    symbol: "HDFC MF",
    name: "HDFC Flexi Cap Fund",
    type: "LTCG" as const,
    units: 120.4,
    buyDate: "12 Jan 2023",
    sellDate: "18 Feb 2026",
    costBasis: 48500,
    saleValue: 68200,
    gain: 19700,
    tax: 2463,
  },
  {
    id: "2",
    symbol: "ICICI PRU",
    name: "ICICI Pru Bluechip Fund",
    type: "LTCG" as const,
    units: 85.2,
    buyDate: "3 Mar 2023",
    sellDate: "10 Jan 2026",
    costBasis: 32000,
    saleValue: 44800,
    gain: 12800,
    tax: 1600,
  },
  {
    id: "3",
    symbol: "WIPRO",
    name: "Wipro Ltd",
    type: "STCG" as const,
    units: 50,
    buyDate: "5 Sep 2025",
    sellDate: "14 Feb 2026",
    costBasis: 24500,
    saleValue: 26200,
    gain: 1700,
    tax: 255,
  },
  {
    id: "4",
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    type: "STCG" as const,
    units: 5,
    buyDate: "20 Oct 2025",
    sellDate: "8 Feb 2026",
    costBasis: 52000,
    saleValue: 49800,
    gain: -2200,
    tax: 0,
  },
];

export const harvestingOpportunities = [
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    units: 80,
    unrealizedLoss: -6096,
    action: "Sell 80 units → realise ₹6,096 loss",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    units: 10,
    unrealizedLoss: -3236,
    action: "Sell 10 units → realise ₹3,236 loss",
  },
];
