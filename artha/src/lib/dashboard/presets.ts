/**
 * Preset widget definitions — shipped with first-visit seeding
 */
import type { PresetWidget, WidgetColumn } from './types';

// ── Shared column helpers ────────────────────────────────────────────────────

const COL_SYMBOL: WidgetColumn = { id: 'symbol', label: 'Symbol', dslName: 'symbol', dbColumn: 'a.nse_symbol', format: 'text' };
const COL_NAME: WidgetColumn = { id: 'name', label: 'Name', dslName: 'name', dbColumn: 'a.name', format: 'text' };
const COL_SECTOR: WidgetColumn = { id: 'sector', label: 'Sector', dslName: 'sector', dbColumn: 'a.sector', format: 'text' };
const COL_CLOSE: WidgetColumn = { id: 'close', label: 'Price', dslName: 'price', dbColumn: 'ti.close', format: 'currency', colorCode: false };
const COL_CHANGE_1D: WidgetColumn = { id: 'change_1d', label: '% Change', dslName: 'change_1d_pct', dbColumn: 'ti.change_1d_pct', format: 'percent', colorCode: true };
const COL_VOLUME: WidgetColumn = { id: 'volume', label: 'Volume', dslName: 'volume', dbColumn: 'ti.volume', format: 'number' };
const COL_MCAP: WidgetColumn = { id: 'mcap', label: 'Mkt Cap (Cr)', dslName: 'mcap', dbColumn: 'cr.market_cap_cr', format: 'currency' };
const COL_PE: WidgetColumn = { id: 'pe', label: 'P/E', dslName: 'pe', dbColumn: 'cr.pe_ttm', format: 'number', colorCode: true };
const COL_ROE: WidgetColumn = { id: 'roe', label: 'ROE %', dslName: 'roe', dbColumn: 'cr.roe', format: 'percent', colorCode: true };
const COL_ROCE: WidgetColumn = { id: 'roce', label: 'ROCE %', dslName: 'roce', dbColumn: 'cr.roce', format: 'percent', colorCode: true };
const COL_RSI: WidgetColumn = { id: 'rsi', label: 'RSI(14)', dslName: 'rsi', dbColumn: 'ti.rsi_14', format: 'number', colorCode: true };
const COL_52W_HIGH: WidgetColumn = { id: 'pct_52w_high', label: '% from 52W High', dslName: 'pctFrom52wHigh', dbColumn: 'ti.pct_from_52w_high', format: 'percent', colorCode: true };
const COL_52W_LOW: WidgetColumn = { id: 'pct_52w_low', label: '% from 52W Low', dslName: 'pctFrom52wLow', dbColumn: 'ti.pct_from_52w_low', format: 'percent', colorCode: true };
const COL_DIV_YIELD: WidgetColumn = { id: 'div_yield', label: 'Div Yield %', dslName: 'div_yield', dbColumn: 'cr.dividend_yield', format: 'percent', colorCode: true };
const COL_DEBT_EQ: WidgetColumn = { id: 'de', label: 'D/E', dslName: 'de', dbColumn: 'cr.debt_equity', format: 'number' };
const COL_REV_G: WidgetColumn = { id: 'rev_g1y', label: 'Rev Gr % (1Y)', dslName: 'rev_g1y', dbColumn: 'cr.revenue_growth_1y', format: 'percent', colorCode: true };

// ── Preset definitions ────────────────────────────────────────────────────────

export const PRESET_WIDGETS: PresetWidget[] = [
  {
    id: 'top_gainers',
    name: 'Top Gainers',
    description: 'Stocks with highest % price gain today',
    widget_type: 'horizontal_bar',
    category: 'Market',
    defaultLayout: { w: 6, h: 6 },
    config: {
      columns: [COL_SYMBOL, COL_CHANGE_1D, COL_CLOSE, COL_VOLUME],
      filters: {},
      sortColumn: 'change_1d_pct',
      sortDirection: 'desc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'change_1d_pct', yAxis: 'symbol', colorField: 'change_1d_pct' },
    },
  },
  {
    id: 'top_losers',
    name: 'Top Losers',
    description: 'Stocks with biggest % price decline today',
    widget_type: 'horizontal_bar',
    category: 'Market',
    defaultLayout: { w: 6, h: 6 },
    config: {
      columns: [COL_SYMBOL, COL_CHANGE_1D, COL_CLOSE, COL_VOLUME],
      filters: {},
      sortColumn: 'change_1d_pct',
      sortDirection: 'asc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'change_1d_pct', yAxis: 'symbol', colorField: 'change_1d_pct' },
    },
  },
  {
    id: 'sector_performance',
    name: 'Sector Performance',
    description: 'Average % change by sector today',
    widget_type: 'horizontal_bar',
    category: 'Market',
    defaultLayout: { w: 6, h: 6 },
    config: {
      columns: [COL_SECTOR, { id: 'avg_change', label: 'Avg % Change', dslName: 'change_1d_pct', dbColumn: 'ti.change_1d_pct', aggregation: 'avg', format: 'percent', colorCode: true }],
      filters: {},
      groupColumn: 'sector',
      sortColumn: 'avg_change',
      sortDirection: 'desc',
      limit: 25,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'avg_change', yAxis: 'sector', colorField: 'avg_change' },
    },
  },
  {
    id: 'volume_leaders',
    name: 'Volume Leaders',
    description: 'Top stocks by trading volume today',
    widget_type: 'bar',
    category: 'Market',
    defaultLayout: { w: 6, h: 6 },
    config: {
      columns: [COL_SYMBOL, COL_VOLUME, COL_CLOSE, COL_CHANGE_1D],
      filters: {},
      sortColumn: 'volume',
      sortDirection: 'desc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'symbol', yAxis: 'volume' },
    },
  },
  {
    id: 'near_52w_high',
    name: 'Near 52-Week High',
    description: 'Stocks within 5% of their 52-week high',
    widget_type: 'table',
    category: 'Technical',
    defaultLayout: { w: 6, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_CLOSE, COL_CHANGE_1D, COL_52W_HIGH, COL_SECTOR],
      filters: { pctFrom52wHighMax: 5 },
      sortColumn: 'pct_from_52w_high',
      sortDirection: 'desc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'near_52w_low',
    name: 'Near 52-Week Low',
    description: 'Stocks within 10% of their 52-week low',
    widget_type: 'table',
    category: 'Technical',
    defaultLayout: { w: 6, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_CLOSE, COL_CHANGE_1D, COL_52W_LOW, COL_SECTOR],
      filters: { pctFrom52wLowMax: 10 },
      sortColumn: 'pct_from_52w_low',
      sortDirection: 'asc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'mcap_distribution',
    name: 'Market Cap by Sector',
    description: 'Total market capitalisation distribution across sectors',
    widget_type: 'pie',
    category: 'Fundamental',
    defaultLayout: { w: 5, h: 7 },
    config: {
      columns: [COL_SECTOR, { id: 'total_mcap', label: 'Total Mkt Cap (Cr)', dslName: 'mcap', dbColumn: 'cr.market_cap_cr', aggregation: 'sum', format: 'currency' }],
      filters: {},
      groupColumn: 'sector',
      sortColumn: 'total_mcap',
      sortDirection: 'desc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { colorField: 'sector', donut: true, showLegend: true },
    },
  },
  {
    id: 'oversold_rsi',
    name: 'Oversold (RSI < 30)',
    description: 'Technically oversold stocks — RSI below 30',
    widget_type: 'table',
    category: 'Technical',
    defaultLayout: { w: 6, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_CLOSE, COL_CHANGE_1D, COL_RSI, COL_SECTOR],
      filters: { rsi14Max: 30 },
      sortColumn: 'rsi_14',
      sortDirection: 'asc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'high_roce',
    name: 'High ROCE Leaders',
    description: 'Stocks with ROCE > 20% and low debt',
    widget_type: 'table',
    category: 'Fundamental',
    defaultLayout: { w: 7, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_ROCE, COL_ROE, COL_PE, COL_DEBT_EQ, COL_MCAP, COL_SECTOR],
      filters: { roceMin: 20, debtEquityMax: 0.5 },
      sortColumn: 'roce',
      sortDirection: 'desc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'dividend_champions',
    name: 'Dividend Champions',
    description: 'High dividend yield stocks with strong ROCE',
    widget_type: 'table',
    category: 'Fundamental',
    defaultLayout: { w: 7, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_DIV_YIELD, COL_ROCE, COL_PE, COL_CLOSE, COL_SECTOR],
      filters: { dividendYieldMin: 2, roceMin: 15 },
      sortColumn: 'div_yield',
      sortDirection: 'desc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'revenue_growth',
    name: 'Revenue Growth Leaders',
    description: 'Top stocks by 1-year revenue growth',
    widget_type: 'bar',
    category: 'Fundamental',
    defaultLayout: { w: 6, h: 6 },
    config: {
      columns: [COL_SYMBOL, COL_REV_G, COL_ROE, COL_MCAP],
      filters: { marketCapCrMin: 500, revenueGrowth1yMin: 15 },
      sortColumn: 'rev_g1y',
      sortDirection: 'desc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'symbol', yAxis: 'rev_g1y', colorField: 'rev_g1y' },
    },
  },
  {
    id: 'undervalued_gems',
    name: 'Undervalued Gems',
    description: 'PE < 15, ROE > 15%',
    widget_type: 'table',
    category: 'Fundamental',
    defaultLayout: { w: 7, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_NAME, COL_PE, COL_ROE, COL_ROCE, COL_DEBT_EQ],
      filters: { peTtmMax: 15, roeMin: 15 },
      sortColumn: 'roe',
      sortDirection: 'desc',
      limit: 50,
      dataPerSymbol: 1,
    },
  },
  {
    id: 'roe_leaders',
    name: 'ROE Leaders',
    description: 'Top stocks ranked by Return on Equity',
    widget_type: 'horizontal_bar',
    category: 'Fundamental',
    defaultLayout: { w: 5, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_ROE, COL_ROCE, COL_PE],
      filters: { roeMin: 15 },
      sortColumn: 'roe',
      sortDirection: 'desc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'roe', yAxis: 'symbol', colorField: 'roe' },
    },
  },
  {
    id: 'low_pe',
    name: 'Low P/E Value Picks',
    description: 'Stocks with P/E below 15 — potential value plays',
    widget_type: 'horizontal_bar',
    category: 'Fundamental',
    defaultLayout: { w: 5, h: 7 },
    config: {
      columns: [COL_SYMBOL, COL_PE, COL_ROE, COL_ROCE],
      filters: { peTtmMax: 15, peTtmMin: 1 },
      sortColumn: 'pe',
      sortDirection: 'asc',
      limit: 20,
      dataPerSymbol: 1,
      chartConfig: { xAxis: 'pe', yAxis: 'symbol', colorField: 'pe' },
    },
  },
];

// ── Default 4-widget seeded layout ────────────────────────────────────────────

export const DEFAULT_PRESET_IDS = ['high_roce', 'undervalued_gems', 'roe_leaders', 'low_pe'];

export function getPresetById(id: string): PresetWidget | undefined {
  return PRESET_WIDGETS.find(p => p.id === id);
}

export const PRESET_CATEGORIES = [...new Set(PRESET_WIDGETS.map(p => p.category))];
