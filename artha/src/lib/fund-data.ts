export type FundCategory = 
  | "Large Cap"
  | "Mid Cap"
  | "Small Cap"
  | "Flexi Cap"
  | "ELSS"
  | "Index Fund"
  | "Liquid"
  | "Corporate Bond"
  | "Dynamic Asset Allocation";

export type AssetClass = "Equity" | "Debt" | "Hybrid" | "Commodity";

export interface MutualFund {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  category: FundCategory;
  returns: {
    ytd: number;
    year1: number;
    year3: number;
    year5: number;
  };
  risk: {
    sharpe: number;
    sortino: number;
    volatility: number;
  };
  excessReturns: {
    trackingError: number;
    infoRatio: number;
    upCapture: number;
    downCapture: number;
  };
  info: {
    aum: number; // in Crores
    expenseRatio: number;
    inceptionDate: string;
    yield: number | null; // Mostly for debt funds
  };
}

export const FUND_DATA: MutualFund[] = [
  // Equity - Large Cap
  {
    ticker: "NIFTYBEES",
    name: "Nippon India Nifty 50 BeES ETF",
    assetClass: "Equity",
    category: "Index Fund",
    returns: { ytd: 4.2, year1: 26.5, year3: 16.8, year5: 15.2 },
    risk: { sharpe: 0.85, sortino: 1.2, volatility: 13.5 },
    excessReturns: { trackingError: 0.05, infoRatio: -0.2, upCapture: 99.8, downCapture: 100.2 },
    info: { aum: 28500, expenseRatio: 0.05, inceptionDate: "2001-12-28", yield: 1.2 }
  },
  {
    ticker: "SBIBLUE",
    name: "SBI Bluechip Fund",
    assetClass: "Equity",
    category: "Large Cap",
    returns: { ytd: 3.8, year1: 24.1, year3: 15.5, year5: 14.8 },
    risk: { sharpe: 0.82, sortino: 1.15, volatility: 13.8 },
    excessReturns: { trackingError: 2.1, infoRatio: 0.45, upCapture: 95.5, downCapture: 88.2 },
    info: { aum: 42000, expenseRatio: 0.85, inceptionDate: "2006-02-14", yield: null }
  },
  {
    ticker: "AXISBLUE",
    name: "Axis Bluechip Fund",
    assetClass: "Equity",
    category: "Large Cap",
    returns: { ytd: 2.9, year1: 21.5, year3: 13.2, year5: 13.9 },
    risk: { sharpe: 0.75, sortino: 1.05, volatility: 12.5 },
    excessReturns: { trackingError: 3.5, infoRatio: -0.15, upCapture: 85.0, downCapture: 82.5 },
    info: { aum: 31500, expenseRatio: 0.78, inceptionDate: "2010-01-05", yield: null }
  },
  
  // Equity - Mid/Small Cap
  {
    ticker: "HDFCSMALL",
    name: "HDFC Small Cap Fund",
    assetClass: "Equity",
    category: "Small Cap",
    returns: { ytd: 6.5, year1: 45.2, year3: 28.5, year5: 22.4 },
    risk: { sharpe: 1.15, sortino: 1.85, volatility: 18.5 },
    excessReturns: { trackingError: 5.2, infoRatio: 0.85, upCapture: 115.5, downCapture: 95.2 },
    info: { aum: 28000, expenseRatio: 0.75, inceptionDate: "2008-04-03", yield: null }
  },
  {
    ticker: "NIPSMALL",
    name: "Nippon India Small Cap",
    assetClass: "Equity",
    category: "Small Cap",
    returns: { ytd: 7.2, year1: 48.5, year3: 31.2, year5: 24.5 },
    risk: { sharpe: 1.25, sortino: 2.05, volatility: 19.2 },
    excessReturns: { trackingError: 6.1, infoRatio: 1.15, upCapture: 125.0, downCapture: 98.5 },
    info: { aum: 45000, expenseRatio: 0.82, inceptionDate: "2010-09-16", yield: null }
  },
  {
    ticker: "MOTIMID",
    name: "Motilal Oswal Midcap Fund",
    assetClass: "Equity",
    category: "Mid Cap",
    returns: { ytd: 5.8, year1: 38.5, year3: 24.2, year5: 19.8 },
    risk: { sharpe: 1.05, sortino: 1.65, volatility: 16.5 },
    excessReturns: { trackingError: 4.8, infoRatio: 0.75, upCapture: 108.5, downCapture: 92.5 },
    info: { aum: 12000, expenseRatio: 0.65, inceptionDate: "2014-02-24", yield: null }
  },

  // Equity - Flexi Cap / ELSS
  {
    ticker: "PPFAS",
    name: "Parag Parikh Flexi Cap",
    assetClass: "Equity",
    category: "Flexi Cap",
    returns: { ytd: 4.5, year1: 28.5, year3: 18.5, year5: 20.2 },
    risk: { sharpe: 1.1, sortino: 1.75, volatility: 14.2 },
    excessReturns: { trackingError: 4.5, infoRatio: 0.95, upCapture: 102.5, downCapture: 85.5 },
    info: { aum: 55000, expenseRatio: 0.68, inceptionDate: "2013-05-24", yield: null }
  },
  {
    ticker: "QTEQ",
    name: "Quant ELSS Tax Saver",
    assetClass: "Equity",
    category: "ELSS",
    returns: { ytd: 8.5, year1: 52.4, year3: 26.8, year5: 25.4 },
    risk: { sharpe: 1.2, sortino: 1.95, volatility: 17.8 },
    excessReturns: { trackingError: 8.5, infoRatio: 1.25, upCapture: 135.5, downCapture: 105.2 },
    info: { aum: 8500, expenseRatio: 0.72, inceptionDate: "2000-03-31", yield: null }
  },

  // Debt
  {
    ticker: "SBI-LIQ",
    name: "SBI Liquid Fund",
    assetClass: "Debt",
    category: "Liquid",
    returns: { ytd: 1.5, year1: 7.2, year3: 5.8, year5: 5.4 },
    risk: { sharpe: 3.5, sortino: 5.2, volatility: 0.4 },
    excessReturns: { trackingError: 0.1, infoRatio: 0.5, upCapture: 100.5, downCapture: 99.5 },
    info: { aum: 65000, expenseRatio: 0.15, inceptionDate: "2001-02-14", yield: 7.4 }
  },
  {
    ticker: "HDFC-CORP",
    name: "HDFC Corporate Bond Fund",
    assetClass: "Debt",
    category: "Corporate Bond",
    returns: { ytd: 1.8, year1: 8.5, year3: 6.5, year5: 7.2 },
    risk: { sharpe: 1.8, sortino: 2.5, volatility: 1.8 },
    excessReturns: { trackingError: 0.8, infoRatio: 0.85, upCapture: 105.2, downCapture: 95.5 },
    info: { aum: 28000, expenseRatio: 0.35, inceptionDate: "2010-06-29", yield: 7.8 }
  },

  // Hybrid
  {
    ticker: "ICICI-BAF",
    name: "ICICI Pru BAF",
    assetClass: "Hybrid",
    category: "Dynamic Asset Allocation",
    returns: { ytd: 2.8, year1: 18.5, year3: 12.5, year5: 11.8 },
    risk: { sharpe: 0.95, sortino: 1.45, volatility: 8.5 },
    excessReturns: { trackingError: 4.2, infoRatio: 0.65, upCapture: 65.5, downCapture: 45.2 },
    info: { aum: 52000, expenseRatio: 0.85, inceptionDate: "2002-12-30", yield: null }
  }
];