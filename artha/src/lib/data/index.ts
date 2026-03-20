import type {
  FeedItem,
  StockSummary,
  PriceBar,
  CorporateAction,
  CompanyProfile,
  CompanyDocument,
  CompanyEvent,
  QuarterlyResult,
  BalanceSheet,
  CashFlow,
  AnomalyFlag,
  ShareholdingPattern,
  GovernanceScore,
  FactorExposure,
  FactorContext,
  EarningsQuality,
  ComputedRatios,
  PeerComparison,
} from "./types";
import { createPgAdapter } from "./pg-adapter";

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

export interface DataAdapter {
  stocks: {
    search(query: string, limit?: number): Promise<StockSummary[]>;
    getById(id: number): Promise<StockSummary | null>;
    getBySymbol(symbol: string): Promise<StockSummary | null>;
    getDetail(symbol: string): Promise<StockDetail | null>;
    getPeers(symbol: string): Promise<PeerComparison[]>;
  };
  prices: {
    getPrices(assetId: number, opts?: { startDate?: string; endDate?: string; range?: string }): Promise<PriceBar[]>;
  };
  company: {
    getProfile(assetId: string): Promise<CompanyProfile>;
    getCorporateActions(assetId: string, limit?: number): Promise<CorporateAction[]>;
    getEvents(assetId: string, limit?: number): Promise<CompanyEvent[]>;
    getDocuments(assetId: string, type?: string): Promise<CompanyDocument[]>;
    getFinancials(assetId: string, opts?: { consolidated?: boolean }): Promise<{
      quarterly: QuarterlyResult[];
      annual: QuarterlyResult[];
      balanceSheet: BalanceSheet[];
      cashFlow: CashFlow[];
      ratios: Array<{
        periodEndDate: string;
        debtorDays: number | null;
        inventoryDays: number | null;
        daysPayable: number | null;
        roce: number | null;
        roe?: number | null;
        roa?: number | null;
        operatingMargin?: number | null;
        patMargin?: number | null;
        ebitMargin?: number | null;
        preTaxMargin?: number | null;
        debtEquity?: number | null;
        currentRatio?: number | null;
        quickRatio?: number | null;
        interestCoverage?: number | null;
        assetTurnover?: number | null;
        inventoryTurnover?: number | null;
        salesGrowthYoy?: number | null;
        netIncomeGrowthYoy?: number | null;
        epsGrowthYoy?: number | null;
        bookValuePerShare?: number | null;
        ebitGrowthYoy?: number | null;
        pbditMargin?: number | null;
        dividendPayout?: number | null;
        earningsRetention?: number | null;
        evEbitda?: number | null;
      }>;
      anomalies: AnomalyFlag[];
    }>;
    getOwnership(assetId: string): Promise<{ shareholding: ShareholdingPattern[]; governance: GovernanceScore }>;
    getAnalytics(assetId: string): Promise<{
      factorExposure: FactorExposure | null;
      factorContext: FactorContext;
      earningsQuality: EarningsQuality;
      ratioHistory: Partial<ComputedRatios>[];
      ratios: ComputedRatios;
    }>;
  };
  follow: {
    getStatus(userId: string, symbol: string): Promise<{ isFollowing: boolean; followerCount: number; alertConfig?: Record<string, boolean> }>;
    follow(userId: string, symbol: string, alertConfig?: Record<string, boolean>): Promise<void>;
    unfollow(userId: string, symbol: string): Promise<void>;
  };
  feed: {
    getUserFeed(userId: string, limit?: number, offset?: number): Promise<FeedItem[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(userId: string, eventIds: string[]): Promise<void>;
  };
}

let adapterInstance: DataAdapter | null = null;

export async function getDataAdapter(): Promise<DataAdapter> {
  if (!adapterInstance) {
    adapterInstance = createPgAdapter() as DataAdapter;
  }
  return adapterInstance;
}
