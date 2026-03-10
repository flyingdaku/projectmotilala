/**
 * Data adapter — provides a unified interface to the underlying data store.
 * Currently implemented as an in-memory/mock adapter so the UI works without
 * a live database. Swap out the implementation here when connecting to SQLite
 * or a real backend.
 */

import type {
  FeedItem,
  StockSummary,
  PriceBar,
  CorporateAction,
  CompanyProfile,
  CompanyDocument,
  CompanyEvent,
  QuarterlyResult, BalanceSheet, CashFlow, AnomalyFlag,
  ShareholdingPattern,
  GovernanceScore,
  FactorExposure,
  FactorContext,
  EarningsQuality,
  ComputedRatios,
  PeerComparison,
} from "./types";

// ── StockDetail (extends StockSummary with computed fields) ──────────────────
export interface StockDetail extends StockSummary {
  nseSymbol?: string;
  bseCode?: string;
  price?: number;
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
}

// ── Mock data stores ─────────────────────────────────────────────────────────

const MOCK_STOCKS: StockSummary[] = [
  { id: 1, symbol: "RELIANCE", name: "Reliance Industries Ltd", exchange: "NSE", sector: "Energy", assetClass: "EQUITY" },
  { id: 2, symbol: "TCS", name: "Tata Consultancy Services Ltd", exchange: "NSE", sector: "IT", assetClass: "EQUITY" },
  { id: 3, symbol: "INFY", name: "Infosys Ltd", exchange: "NSE", sector: "IT", assetClass: "EQUITY" },
  { id: 4, symbol: "HDFCBANK", name: "HDFC Bank Ltd", exchange: "NSE", sector: "Banking", assetClass: "EQUITY" },
  { id: 5, symbol: "ICICIBANK", name: "ICICI Bank Ltd", exchange: "NSE", sector: "Banking", assetClass: "EQUITY" },
  { id: 6, symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", exchange: "NSE", sector: "NBFC", assetClass: "EQUITY" },
  { id: 7, symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", exchange: "NSE", sector: "FMCG", assetClass: "EQUITY" },
  { id: 8, symbol: "WIPRO", name: "Wipro Ltd", exchange: "NSE", sector: "IT", assetClass: "EQUITY" },
  { id: 9, symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd", exchange: "NSE", sector: "Pharma", assetClass: "EQUITY" },
  { id: 10, symbol: "ASIANPAINT", name: "Asian Paints Ltd", exchange: "NSE", sector: "Consumer", assetClass: "EQUITY" },
  { id: 11, symbol: "AXISBANK", name: "Axis Bank Ltd", exchange: "NSE", sector: "Banking", assetClass: "EQUITY" },
  { id: 12, symbol: "MARUTI", name: "Maruti Suzuki India Ltd", exchange: "NSE", sector: "Auto", assetClass: "EQUITY" },
  { id: 13, symbol: "NESTLEIND", name: "Nestle India Ltd", exchange: "NSE", sector: "FMCG", assetClass: "EQUITY" },
  { id: 14, symbol: "TITAN", name: "Titan Company Ltd", exchange: "NSE", sector: "Consumer", assetClass: "EQUITY" },
  { id: 15, symbol: "HCLTECH", name: "HCL Technologies Ltd", exchange: "NSE", sector: "IT", assetClass: "EQUITY" },
  { id: 16, symbol: "LTIM", name: "LTIMindtree Ltd", exchange: "NSE", sector: "IT", assetClass: "EQUITY" },
  { id: 17, symbol: "POWERGRID", name: "Power Grid Corporation of India Ltd", exchange: "NSE", sector: "Utilities", assetClass: "EQUITY" },
  { id: 18, symbol: "NTPC", name: "NTPC Ltd", exchange: "NSE", sector: "Utilities", assetClass: "EQUITY" },
  { id: 19, symbol: "SBIN", name: "State Bank of India", exchange: "NSE", sector: "Banking", assetClass: "EQUITY" },
  { id: 20, symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd", exchange: "NSE", sector: "Banking", assetClass: "EQUITY" },
];

// In-memory read status store
const readStatus = new Map<string, boolean>();

function generateMockPrices(assetId: number, startDate?: string): PriceBar[] {
  const bars: PriceBar[] = [];
  const start = startDate ? new Date(startDate) : new Date(Date.now() - 365 * 3 * 24 * 60 * 60 * 1000);
  const end = new Date();
  let price = 500 + assetId * 100;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) {
      const change = (Math.random() - 0.49) * price * 0.02;
      price = Math.max(10, price + change);
      const isUp = Math.random() > 0.5;
      const open = +(price * (1 + (isUp ? -1 : 1) * Math.random() * 0.01)).toFixed(2);
      bars.push({
        date: cur.toISOString().split("T")[0],
        open: open,
        high: +(Math.max(open, price) * (1 + Math.random() * 0.01)).toFixed(2),
        low: +(Math.min(open, price) * (1 - Math.random() * 0.01)).toFixed(2),
        close: +price.toFixed(2),
        volume: Math.floor(100000 + Math.random() * 2000000),
      });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return bars;
}

function generateMockFeed(userId: string): FeedItem[] {
  return [
    {
      id: "evt_1", assetId: "1", nseSymbol: "RELIANCE", stockName: "Reliance Industries",
      eventType: "RESULT", title: "Q3 FY26 Results — PAT up 12% YoY", severity: "INFO",
      eventDate: new Date(Date.now() - 1 * 86400000).toISOString(), isRead: false,
      eventData: { "PAT (Cr)": "₹19,878", "Revenue (Cr)": "₹2,35,481", "YoY PAT Growth": "+12.1%" },
    },
    {
      id: "evt_2", assetId: "3", nseSymbol: "INFY", stockName: "Infosys Ltd",
      eventType: "RESULT", title: "Q3 FY26 — Revenue growth misses estimates", severity: "WARNING",
      eventDate: new Date(Date.now() - 2 * 86400000).toISOString(), isRead: false,
      eventData: { "Revenue ($B)": "4.93", "Guidance": "3.75–4.5%", "Status": "Maintained" },
    },
    {
      id: "evt_3", assetId: "4", nseSymbol: "HDFCBANK", stockName: "HDFC Bank",
      eventType: "CONCALL", title: "Q3 FY26 Earnings Call — Management commentary", severity: "INFO",
      eventDate: new Date(Date.now() - 3 * 86400000).toISOString(), isRead: true,
      eventData: {},
    },
    {
      id: "evt_4", assetId: "2", nseSymbol: "TCS", stockName: "Tata Consultancy Services",
      eventType: "CORP_ACTION", title: "Dividend declared — ₹10/share, ex-date Feb 28", severity: "INFO",
      eventDate: new Date(Date.now() - 4 * 86400000).toISOString(), isRead: false,
      eventData: { "Dividend": "₹10/share", "Ex-date": "Feb 28, 2026", "Record Date": "Mar 1, 2026" },
    },
    {
      id: "evt_5", assetId: "6", nseSymbol: "BAJFINANCE", stockName: "Bajaj Finance",
      eventType: "RED_FLAG", title: "Promoter pledging increased to 14.2%", severity: "CRITICAL",
      eventDate: new Date(Date.now() - 5 * 86400000).toISOString(), isRead: false,
      eventData: { "Pledged": "14.2%", "Previous": "11.8%", "Change": "+2.4pp" },
    },
    {
      id: "evt_6", assetId: "9", nseSymbol: "SUNPHARMA", stockName: "Sun Pharma",
      eventType: "ANNOUNCEMENT", title: "FDA approved new drug application for Winlevi", severity: "INFO",
      eventDate: new Date(Date.now() - 6 * 86400000).toISOString(), isRead: true,
      eventData: {},
    },
    {
      id: "evt_7", assetId: "5", nseSymbol: "ICICIBANK", stockName: "ICICI Bank",
      eventType: "SHAREHOLDING_CHANGE", title: "FII holding crosses 42% threshold", severity: "WARNING",
      eventDate: new Date(Date.now() - 7 * 86400000).toISOString(), isRead: false,
      eventData: { "FII %": "42.1%", "Previous Quarter": "40.8%", "Change": "+1.3pp" },
    },
  ];
}

// ── Adapter interface ────────────────────────────────────────────────────────

interface DataAdapter {
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
    getAnalytics(assetId: string): Promise<{ factorExposure: FactorExposure | null; factorContext: FactorContext; earningsQuality: EarningsQuality; ratioHistory: Partial<ComputedRatios>[]; ratios: ComputedRatios }>;
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

// ── Follow status store ───────────────────────────────────────────────────────
const followStore = new Map<string, { alertConfig: Record<string, boolean> }>();
const followerCounts = new Map<string, number>([
  ["RELIANCE", 4821], ["TCS", 3204], ["INFY", 2918], ["HDFCBANK", 3512],
  ["ICICIBANK", 2341], ["BAJFINANCE", 1823], ["HINDUNILVR", 987], ["WIPRO", 1102],
]);

// ── Mock adapter implementation ──────────────────────────────────────────────

function createMockAdapter(): DataAdapter {
  return {
    stocks: {
      async search(query: string, limit = 10): Promise<StockSummary[]> {
        const q = query.toLowerCase();
        return MOCK_STOCKS
          .filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
          .slice(0, limit);
      },
      async getById(id: number): Promise<StockSummary | null> {
        return MOCK_STOCKS.find(s => s.id === id) ?? null;
      },
      async getBySymbol(symbol: string): Promise<StockSummary | null> {
        return MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase()) ?? null;
      },
      async getDetail(symbol: string): Promise<StockDetail | null> {
        const s = MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase());
        if (!s) return null;
        const basePrice = 500 + s.id * 100;
        return {
          ...s,
          price: +(basePrice * (0.95 + Math.random() * 0.1)).toFixed(2),
          pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2),
          high52w: +(basePrice * 1.35).toFixed(2),
          low52w: +(basePrice * 0.72).toFixed(2),
          marketCapCr: Math.floor(basePrice * 500000 / 100),
          pe: +(15 + Math.random() * 25).toFixed(1),
          pb: +(1.5 + Math.random() * 8).toFixed(2),
          dividendYield: +(Math.random() * 3).toFixed(2),
          roce: +(10 + Math.random() * 30).toFixed(1),
          roe: +(8 + Math.random() * 25).toFixed(1),
          debtEquity: +(Math.random() * 1.5).toFixed(2),
          volume: Math.floor(500000 + Math.random() * 5000000),
          avgVolume: Math.floor(800000 + Math.random() * 3000000),
          faceValue: 1,
          isin: `INE${String(s.id).padStart(6, "0")}01`,
          listedDate: "1995-11-18",
        };
      },
      async getPeers(symbol: string): Promise<PeerComparison[]> {
        const s = MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase());
        if (!s) return [];
        const sector = s.sector;
        return MOCK_STOCKS
          .filter(p => p.sector === sector && p.symbol !== symbol.toUpperCase())
          .slice(0, 6)
          .map(p => ({
            symbol: p.symbol, name: p.name,
            marketCapCr: Math.floor((500 + p.id * 100) * 5000),
            peTtm: +(15 + Math.random() * 25).toFixed(1),
            pb: +(1.5 + Math.random() * 8).toFixed(2),
            roce: +(10 + Math.random() * 30).toFixed(1),
            roe: +(8 + Math.random() * 25).toFixed(1),
            revenueGrowth1y: +((Math.random() - 0.2) * 30).toFixed(1),
            patGrowth1y: +((Math.random() - 0.2) * 35).toFixed(1),
            dividendYield: +(Math.random() * 3).toFixed(2),
            price: +(500 + p.id * 100 + Math.random() * 50).toFixed(2),
            pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2),
          }));
      },
    },
    prices: {
      async getPrices(assetId: number, opts?: { startDate?: string; range?: string }): Promise<PriceBar[]> {
        let startDate = opts?.startDate;
        if (!startDate && opts?.range) {
          const now = new Date();
          const rangeMap: Record<string, number> = { "1m": 30, "3m": 90, "6m": 180, "1y": 365, "3y": 1095, "5y": 1825 };
          const days = rangeMap[opts.range] ?? 365;
          const d = new Date(now);
          d.setDate(d.getDate() - days);
          startDate = d.toISOString().split("T")[0];
        }
        return generateMockPrices(assetId, startDate);
      },
    },
    company: {
      async getProfile(assetId: string): Promise<CompanyProfile> {
        const stock = MOCK_STOCKS.find(s => s.id === Number(assetId));
        return {
          description: `${stock?.name ?? "Company"} is one of India's leading ${stock?.sector ?? "sector"} companies, listed on NSE and BSE. The company operates across multiple business segments and has a strong presence in domestic and international markets.`,
          founded: `${1960 + (Number(assetId) % 30)}`,
          headquarters: "Mumbai, India",
          employees: `${20 + Number(assetId)}K+`,
          website: `https://${(stock?.symbol ?? "example").toLowerCase()}.com`,
          md: "Mukesh Kumar",
          chairman: "Ratan Sharma",
          businessSegments: [
            { name: "Core Business", revenuePct: 65, description: "Primary revenue driver" },
            { name: "New Ventures", revenuePct: 20, description: "High growth emerging segment" },
            { name: "International", revenuePct: 15, description: "Global operations" },
          ],
          riskTags: [
            { label: "Regulatory Risk", severity: "medium", desc: "Subject to sector-specific regulations" },
            { label: "FX Exposure", severity: "low", desc: "Partial exposure to USD/INR fluctuations" },
          ],
          indexMemberships: ["Nifty 50", "Nifty 500", "BSE Sensex"],
          investmentThesis: [
            "Market leader in core segment with strong moat",
            "Consistent dividend payer with healthy cash flows",
            "Expanding into high-margin adjacencies",
          ],
          analystRatings: { buy: 18, hold: 6, sell: 2, targetPrice: 1450 },
        };
      },
      async getCorporateActions(assetId: string, limit = 10): Promise<CorporateAction[]> {
        return [
          { id: 1, actionType: "DIVIDEND", exDate: "2025-10-15", recordDate: "2025-10-16", dividendAmount: 8.5 },
          { id: 2, actionType: "DIVIDEND", exDate: "2025-04-10", recordDate: "2025-04-11", dividendAmount: 7.0 },
          { id: 3, actionType: "BONUS", exDate: "2024-06-20", bonusRatio: "1:2" },
          { id: 4, actionType: "DIVIDEND", exDate: "2024-10-12", dividendAmount: 6.5 },
          { id: 5, actionType: "SPLIT", exDate: "2023-09-15", splitFactor: 5 },
        ].slice(0, limit);
      },
      async getEvents(assetId: string, limit = 10): Promise<CompanyEvent[]> {
        const events: CompanyEvent[] = [
          { id: "ce1", eventType: "RESULT", title: "Q3 FY26 Results Announced", eventDate: new Date(Date.now() - 86400000).toISOString(), severity: "INFO" },
          { id: "ce2", eventType: "CONCALL", title: "Earnings Conference Call", eventDate: new Date(Date.now() - 2 * 86400000).toISOString(), severity: "INFO" },
          { id: "ce3", eventType: "ANNOUNCEMENT", title: "Board Meeting for Dividend", eventDate: new Date(Date.now() - 5 * 86400000).toISOString(), severity: "INFO" },
        ];
        return events.slice(0, limit);
      },
      async getDocuments(assetId: string, docType?: string): Promise<CompanyDocument[]> {
        const docs: CompanyDocument[] = [
          { id: "d1", title: "Annual Report FY2025", docType: "ANNUAL_REPORT", docDate: "2025-06-15", fiscalYear: "2025" },
          { id: "d2", title: "Q3 FY26 Earnings Call Transcript", docType: "CONCALL_TRANSCRIPT", docDate: "2026-01-22", fiscalYear: "2026", fiscalQuarter: "Q3", aiSentiment: 0.4 },
          { id: "d3", title: "Q2 FY26 Earnings Call Transcript", docType: "CONCALL_TRANSCRIPT", docDate: "2025-10-18", fiscalYear: "2026", fiscalQuarter: "Q2", aiSentiment: 0.1 },
          { id: "d4", title: "Annual Report FY2024", docType: "ANNUAL_REPORT", docDate: "2024-06-20", fiscalYear: "2024" },
          { id: "d5", title: "Investor Presentation Q3 FY26", docType: "INVESTOR_PRESENTATION", docDate: "2026-01-22", fiscalYear: "2026", fiscalQuarter: "Q3" },
          { id: "d6", title: "Corporate Governance Report FY25", docType: "EXCHANGE_ANNOUNCEMENT", docDate: "2025-07-01", fiscalYear: "2025" },
        ];
        return docType ? docs.filter(d => d.docType === docType) : docs;
      },
      async getFinancials(assetId: string, _opts?: { consolidated?: boolean }): Promise<{
        quarterly: QuarterlyResult[];
        annual: QuarterlyResult[];
        balanceSheet: BalanceSheet[];
        cashFlow: CashFlow[];
        ratios: Array<{ periodEndDate: string; debtorDays: number | null; inventoryDays: number | null; daysPayable: number | null; roce: number | null; operatingMargin?: number | null; patMargin?: number | null }>;
        anomalies: AnomalyFlag[];
      }> {
        const quarters = ["Q3 FY26", "Q2 FY26", "Q1 FY26", "Q4 FY25", "Q3 FY25", "Q2 FY25", "Q1 FY25", "Q4 FY24"];
        const base = 5000 + Number(assetId) * 1000;
        return {
          quarterly: quarters.map((q, i) => ({
            quarter: q,
            revenue: +(base * (1 + i * 0.03 + Math.random() * 0.05)).toFixed(0),
            ebitda: +(base * 0.22 * (1 + i * 0.02)).toFixed(0),
            pat: +(base * 0.14 * (1 + i * 0.04)).toFixed(0),
            eps: +(25 + i * 1.5 + Math.random() * 3).toFixed(2),
            revenueGrowth: +((Math.random() * 20 - 2).toFixed(1)),
            patGrowth: +((Math.random() * 25 - 3).toFixed(1)),
            ebitdaMargin: +(20 + Math.random() * 8).toFixed(1),
            patMargin: +(12 + Math.random() * 6).toFixed(1),
          })),
          annual: ["FY25", "FY24", "FY23", "FY22", "FY21"].map((y, i) => ({
            quarter: y,
            periodType: "annual",
            revenue: +(base * 4.2 * (1 + i * 0.05)).toFixed(0),
            ebitda: +(base * 1.05 * (1 + i * 0.04)).toFixed(0),
            operatingProfit: +(base * 1.05 * (1 + i * 0.04)).toFixed(0),
            pat: +(base * 0.58 * (1 + i * 0.05)).toFixed(0),
            netProfit: +(base * 0.58 * (1 + i * 0.05)).toFixed(0),
            cfo: +(base * 0.72 * (1 + i * 0.04)).toFixed(0),
            eps: +(92 + i * 4).toFixed(2),
            ebitdaMargin: +(22 + Math.random() * 6).toFixed(1),
            patMargin: +(13 + Math.random() * 5).toFixed(1),
          })),
          balanceSheet: ["FY25", "FY24", "FY23", "FY22", "FY21"].map((y, i) => ({
            year: y,
            totalAssets: +(base * 3.5 * (1 + i * 0.1)).toFixed(0),
            totalEquity: +(base * 1.8 * (1 + i * 0.08)).toFixed(0),
            totalDebt: +(base * 0.6 * (1 - i * 0.05)).toFixed(0),
            cash: +(base * 0.4 * (1 + i * 0.12)).toFixed(0),
            debtEquity: +(0.3 + i * 0.02).toFixed(2),
            bookValue: +(450 + i * 30).toFixed(0),
          })),
          cashFlow: ["FY25", "FY24", "FY23", "FY22"].map((y, i) => ({
            year: y,
            operatingCF: +(base * 0.18 * (1 + i * 0.05)).toFixed(0),
            investingCF: -(+(base * 0.08 * (1 + i * 0.03)).toFixed(0)),
            financingCF: -(+(base * 0.06).toFixed(0)),
            freeCF: +(base * 0.10 * (1 + i * 0.04)).toFixed(0),
            capex: +(base * 0.05).toFixed(0),
          })),
          ratios: ["FY25", "FY24", "FY23", "FY22", "FY21"].map((y, i) => ({
            periodEndDate: `Mar-${String(25 - i).padStart(2, '0')}`,
            debtorDays: null,
            inventoryDays: null,
            daysPayable: null,
            roce: +(18 + Math.random() * 6).toFixed(1),
            operatingMargin: +(20 + Math.random() * 5).toFixed(1),
            patMargin: +(12 + Math.random() * 4).toFixed(1),
          })),
          anomalies: [
            { type: "REVENUE_CONSISTENCY", severity: "low", description: "Revenue recognition pattern is consistent with industry peers" },
          ],
        };
      },
      async getOwnership(assetId: string): Promise<{ shareholding: ShareholdingPattern[]; governance: GovernanceScore }> {
        return {
          shareholding: ["Dec 2025", "Sep 2025", "Jun 2025", "Mar 2025", "Dec 2024"].map((q, i) => ({
            quarter: q,
            promoter: +(42 + i * 0.2 + Math.random() * 0.5).toFixed(2),
            fii: +(28 - i * 0.3 + Math.random() * 0.8).toFixed(2),
            dii: +(18 + i * 0.1 + Math.random() * 0.4).toFixed(2),
            retail: +(12 + Math.random() * 0.5).toFixed(2),
            pledged: +(i * 0.8 + Math.random() * 2).toFixed(2),
          })),
          governance: { overall: 72, boardIndependence: 68, disclosure: 78, relatedParty: 65, auditQuality: 80 },
        };
      },
      async getAnalytics(assetId: string): Promise<{ factorExposure: FactorExposure | null; factorContext: FactorContext; earningsQuality: EarningsQuality; ratioHistory: Partial<ComputedRatios>[]; ratios: ComputedRatios }> {
        const months = Array.from({ length: 24 }, (_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - (23 - i));
          return d.toISOString().split("T")[0];
        });
        return {
          factorExposure: {
            marketBeta: +(0.8 + Math.random() * 0.5).toFixed(2),
            smbLoading: +((Math.random() - 0.5) * 0.6).toFixed(2),
            hmlLoading: +((Math.random() - 0.3) * 0.8).toFixed(2),
            wmlLoading: +((Math.random() - 0.4) * 0.5).toFixed(2),
            alpha: +((Math.random() - 0.3) * 0.02).toFixed(4),
            rSquared: +(0.6 + Math.random() * 0.3).toFixed(3),
            sampleSize: 252,
            regressionStartDate: months[0],
            regressionEndDate: months[months.length - 1],
          },
          factorContext: {
            releaseTag: "2025-12",
            latestSnapshots: [
              {
                frequency: "DAILY",
                asOf: months[months.length - 1],
                marketReturn: +(Math.random() * 4 - 2).toFixed(2),
                marketPremium: +(Math.random() * 4 - 2).toFixed(2),
                rfRate: +(Math.random() * 0.03).toFixed(2),
                smb: +(Math.random() * 3 - 1.5).toFixed(2),
                hml: +(Math.random() * 3 - 1.5).toFixed(2),
                wml: +(Math.random() * 3 - 1.5).toFixed(2),
                notes: "Delayed survivorship-bias-adjusted IIMA release",
              },
              {
                frequency: "MONTHLY",
                asOf: months[months.length - 1],
                marketReturn: +(Math.random() * 8 - 4).toFixed(2),
                marketPremium: +(Math.random() * 8 - 4).toFixed(2),
                rfRate: +(Math.random() * 0.3).toFixed(2),
                smb: +(Math.random() * 6 - 3).toFixed(2),
                hml: +(Math.random() * 6 - 3).toFixed(2),
                wml: +(Math.random() * 6 - 3).toFixed(2),
                notes: "Delayed survivorship-bias-adjusted IIMA release",
              },
            ],
            drawdowns: [
              { factorCode: "ERP", factorName: "Equity Risk Premium (ERP)", annualizedReturn: 12.4, annualizedVolatility: 18.2, worstDrawdown: -56.7, drawdownDurationYears: 3.1 },
              { factorCode: "SMB", factorName: "Size Factor (SMB)", annualizedReturn: 4.3, annualizedVolatility: 15.6, worstDrawdown: -48.2, drawdownDurationYears: 4.2 },
              { factorCode: "HML", factorName: "Value Factor (HML)", annualizedReturn: 6.1, annualizedVolatility: 14.2, worstDrawdown: -39.5, drawdownDurationYears: 2.8 },
              { factorCode: "WML", factorName: "Momentum Factor (WML)", annualizedReturn: 8.9, annualizedVolatility: 16.8, worstDrawdown: -44.7, drawdownDurationYears: 2.2 },
            ],
          },
          earningsQuality: {
            overallScore: +(65 + Math.random() * 25),
            cfoPatRatio: +(0.8 + Math.random() * 0.4).toFixed(2),
            accrualRatio: +(-0.02 + Math.random() * 0.06).toFixed(3),
            revenueConsistency: +(0.75 + Math.random() * 0.2).toFixed(2),
            flags: [],
          },
          ratioHistory: months.map(date => ({
            computedDate: date,
            peTtm: +(15 + Math.random() * 20).toFixed(1),
            pb: +(2 + Math.random() * 5).toFixed(2),
            evEbitda: +(10 + Math.random() * 8).toFixed(1),
            roce: +(12 + Math.random() * 15).toFixed(1),
            roe: +(10 + Math.random() * 12).toFixed(1),
          })),
          ratios: {
            peTtm: +(18 + Math.random() * 20).toFixed(1),
            pb: +(2 + Math.random() * 6).toFixed(2),
            evEbitda: +(12 + Math.random() * 10).toFixed(1),
            dividendYield: +(0.5 + Math.random() * 2.5).toFixed(2),
            roce: +(15 + Math.random() * 20).toFixed(1),
            roe: +(12 + Math.random() * 18).toFixed(1),
            debtEquity: +(0.1 + Math.random() * 1.2).toFixed(2),
            patMargin: +(10 + Math.random() * 15).toFixed(1),
            operatingMargin: +(15 + Math.random() * 12).toFixed(1),
            revenueGrowth1y: +((Math.random() * 25 - 2).toFixed(1)),
            patGrowth1y: +((Math.random() * 30 - 3).toFixed(1)),
            rsi14: +(35 + Math.random() * 40).toFixed(1),
            pctFrom52wHigh: -+(5 + Math.random() * 25).toFixed(1),
            pctFrom52wLow: +(10 + Math.random() * 60).toFixed(1),
            marketCapCr: Math.floor((500 + Number(assetId) * 100) * 5000),
            price: +(500 + Number(assetId) * 100 + Math.random() * 50).toFixed(2),
            pctChange1d: +((Math.random() - 0.48) * 4).toFixed(2),
          },
        };
      },
    },
    follow: {
      async getStatus(userId: string, symbol: string) {
        const key = `${userId}:${symbol}`;
        const existing = followStore.get(key);
        return {
          isFollowing: !!existing,
          followerCount: followerCounts.get(symbol) ?? Math.floor(Math.random() * 500),
          alertConfig: existing?.alertConfig,
        };
      },
      async follow(userId: string, symbol: string, alertConfig?: Record<string, boolean>) {
        const key = `${userId}:${symbol}`;
        followStore.set(key, { alertConfig: alertConfig ?? { price: true, results: true, concall: true, shareholding: true, redFlags: true } });
        followerCounts.set(symbol, (followerCounts.get(symbol) ?? 0) + 1);
      },
      async unfollow(userId: string, symbol: string) {
        const key = `${userId}:${symbol}`;
        if (followStore.has(key)) {
          followStore.delete(key);
          followerCounts.set(symbol, Math.max(0, (followerCounts.get(symbol) ?? 1) - 1));
        }
      },
    },
    feed: {
      async getUserFeed(userId: string, limit = 50, offset = 0): Promise<FeedItem[]> {
        const feed = generateMockFeed(userId).map(item => ({
          ...item,
          isRead: readStatus.get(item.id) ?? item.isRead,
        }));
        return feed.slice(offset, offset + limit);
      },
      async getUnreadCount(userId: string): Promise<number> {
        const feed = generateMockFeed(userId);
        return feed.filter(f => !(readStatus.get(f.id) ?? f.isRead)).length;
      },
      async markAsRead(userId: string, eventIds: string[]): Promise<void> {
        for (const id of eventIds) readStatus.set(id, true);
      },
    },
  };
}

// ── Singleton ────────────────────────────────────────────────────────────────

import { createSqliteAdapter } from "./sqlite-adapter";

let adapterInstance: DataAdapter | null = null;

export async function getDataAdapter(): Promise<DataAdapter> {
  if (!adapterInstance) {
    // Use real SQLite adapter. To swap to Postgres/Clickhouse:
    //   replace createSqliteAdapter() with the new adapter
    //   and update src/lib/data/db.ts accordingly.
    adapterInstance = createSqliteAdapter() as unknown as DataAdapter;
  }
  return adapterInstance;
}

export type { DataAdapter };
