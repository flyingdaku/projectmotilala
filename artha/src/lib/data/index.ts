import type { StockSummary } from "./types";

export type * from "./types";

export interface StockDetail extends StockSummary {
  nseSymbol?: string;
  bseCode?: string;
  price?: number;
  priceDate?: string;
  pctChange1d?: number;
  high52w?: number;
  low52w?: number;
  marketCapCr?: number;
  pe?: number;
  pb?: number;
  dividendYield?: number;
  roce?: number;
  roe?: number;
  debtEquity?: number;
  volume?: number;
  avgVolume?: number;
  faceValue?: number;
  isin?: string;
  listedDate?: string;
  industryGroup?: string;
  subIndustry?: string;
}
