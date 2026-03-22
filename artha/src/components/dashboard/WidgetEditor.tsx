'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useWidgetData } from '@/lib/dashboard/hooks';
import { WidgetRenderer } from './WidgetRenderer';
import type {
  UserWidget, WidgetConfig, WidgetColumn, WidgetType, ChartConfig,
} from '@/lib/dashboard/types';

// ── Available columns catalogue ───────────────────────────────────────────────

interface CatalogueColumn extends WidgetColumn {
  category: string;
  available?: boolean;
}

const COLUMN_CATALOGUE: CatalogueColumn[] = [
  // Identity
  { id: 'symbol',    label: 'Symbol',            dslName: 'symbol',    dbColumn: 'a.nse_symbol',           format: 'text',     category: 'Identity' },
  { id: 'name',      label: 'Name',              dslName: 'name',      dbColumn: 'a.name',                 format: 'text',     category: 'Identity' },
  { id: 'sector',    label: 'Sector',            dslName: 'sector',    dbColumn: 'a.sector',               format: 'text',     category: 'Identity' },
  { id: 'isin',      label: 'ISIN',              dslName: 'isin',      dbColumn: 'a.isin',                 format: 'text',     category: 'Identity' },
  // Price / Technical
  { id: 'close',        label: 'Price',             dslName: 'price',         dbColumn: 'ti.close',             format: 'currency', category: 'Technical', colorCode: false },
  { id: 'change_1d',    label: '% Change (1D)',      dslName: 'change_1d_pct', dbColumn: 'ti.change_1d_pct',     format: 'percent',  category: 'Technical', colorCode: true },
  { id: 'volume',       label: 'Volume',             dslName: 'volume',        dbColumn: 'ti.volume',            format: 'number',   category: 'Technical' },
  { id: 'rsi',          label: 'RSI (14)',           dslName: 'rsi',           dbColumn: 'ti.rsi_14',            format: 'number',   category: 'Technical', colorCode: true },
  { id: 'pct_52w_high', label: '% from 52W High',   dslName: 'pctFrom52wHigh',dbColumn: 'ti.pct_from_52w_high', format: 'percent',  category: 'Technical', colorCode: true },
  { id: 'pct_52w_low',  label: '% from 52W Low',    dslName: 'pctFrom52wLow', dbColumn: 'ti.pct_from_52w_low',  format: 'percent',  category: 'Technical', colorCode: true },
  { id: 'sma_20',       label: 'SMA 20',            dslName: 'sma_20',        dbColumn: 'ti.sma_20',            format: 'currency', category: 'Technical' },
  { id: 'sma_50',       label: 'SMA 50',            dslName: 'sma_50',        dbColumn: 'ti.sma_50',            format: 'currency', category: 'Technical' },
  { id: 'sma_200',      label: 'SMA 200',           dslName: 'sma_200',       dbColumn: 'ti.sma_200',           format: 'currency', category: 'Technical' },
  // Valuation
  { id: 'pe',         label: 'P/E (TTM)',         dslName: 'pe',        dbColumn: 'cr.pe_ttm',          format: 'number',   category: 'Valuation', colorCode: true },
  { id: 'pb',         label: 'P/B',              dslName: 'pb',        dbColumn: 'cr.pb',               format: 'number',   category: 'Valuation', colorCode: true },
  { id: 'ev_ebitda',  label: 'EV/EBITDA',        dslName: 'ev_ebitda', dbColumn: 'cr.ev_ebitda',        format: 'number',   category: 'Valuation', colorCode: true },
  { id: 'mcap',       label: 'Mkt Cap (Cr)',      dslName: 'mcap',      dbColumn: 'cr.market_cap_cr',    format: 'currency', category: 'Valuation' },
  { id: 'div_yield',  label: 'Div Yield %',       dslName: 'div_yield', dbColumn: 'cr.dividend_yield',   format: 'percent',  category: 'Valuation', colorCode: true },
  // Profitability
  { id: 'roe',        label: 'ROE %',            dslName: 'roe',       dbColumn: 'cr.roe',              format: 'percent',  category: 'Profitability', colorCode: true },
  { id: 'roce',       label: 'ROCE %',           dslName: 'roce',      dbColumn: 'cr.roce',             format: 'percent',  category: 'Profitability', colorCode: true },
  { id: 'pat_margin', label: 'PAT Margin %',     dslName: 'pat_margin',dbColumn: 'cr.pat_margin',       format: 'percent',  category: 'Profitability', colorCode: true },
  { id: 'op_margin',  label: 'Op Margin %',      dslName: 'op_margin', dbColumn: 'cr.operating_margin', format: 'percent',  category: 'Profitability', colorCode: true },
  // Growth
  { id: 'rev_g1y',   label: 'Rev Growth 1Y %',  dslName: 'rev_g1y',   dbColumn: 'cr.revenue_growth_1y',format: 'percent',  category: 'Growth', colorCode: true },
  { id: 'pat_g1y',   label: 'PAT Growth 1Y %',  dslName: 'pat_g1y',   dbColumn: 'cr.pat_growth_1y',    format: 'percent',  category: 'Growth', colorCode: true },
  { id: 'eps_g1y',   label: 'EPS Growth 1Y %',  dslName: 'eps_g1y',   dbColumn: 'cr.eps_growth_1y',    format: 'percent',  category: 'Growth', colorCode: true },
  // Balance Sheet
  { id: 'de',               label: 'Debt/Equity',      dslName: 'de',              dbColumn: 'cr.debt_equity',       format: 'number',   category: 'Balance Sheet' },
  { id: 'current_ratio',    label: 'Current Ratio',    dslName: 'current_ratio',   dbColumn: 'cr.current_ratio',     format: 'number',   category: 'Balance Sheet', colorCode: true },
  { id: 'interest_coverage',label: 'Interest Coverage',dslName: 'interest_coverage',dbColumn: 'cr.interest_coverage',format: 'number',   category: 'Balance Sheet', colorCode: true },
  { id: 'quality_score',    label: 'Quality Score',    dslName: 'quality_score',   dbColumn: 'cr.quality_score',     format: 'number',   category: 'Balance Sheet', colorCode: true },
  // MSI Ratings
  { id: 'rs_rating',    label: 'RS Rating',    dslName: 'rs_rating',   dbColumn: 'mc.rs_rating',   format: 'number', category: 'MSI Ratings', colorCode: true },
  { id: 'eps_rating',   label: 'EPS Rating',   dslName: 'eps_rating',  dbColumn: 'mc.eps_rating',  format: 'number', category: 'MSI Ratings', colorCode: true },
  { id: 'master_score', label: 'Master Score', dslName: 'master_score',dbColumn: 'mc.master_score',format: 'number', category: 'MSI Ratings', colorCode: true },
];

const COLUMN_CATEGORIES = [...new Set(COLUMN_CATALOGUE.map(c => c.category))];

// ── Filter definitions ────────────────────────────────────────────────────────

interface FilterSpec {
  key: string;
  label: string;
  category: string;
  type: 'range' | 'select';
  options?: { value: string; label: string }[];
  unit?: string;
}

const FILTER_SPECS: FilterSpec[] = [
  // Valuation
  { key: 'peTtmMin',      label: 'P/E Min',          category: 'Valuation',    type: 'range' },
  { key: 'peTtmMax',      label: 'P/E Max',          category: 'Valuation',    type: 'range' },
  { key: 'pbMin',         label: 'P/B Min',          category: 'Valuation',    type: 'range' },
  { key: 'pbMax',         label: 'P/B Max',          category: 'Valuation',    type: 'range' },
  { key: 'evEbitdaMin',   label: 'EV/EBITDA Min',    category: 'Valuation',    type: 'range' },
  { key: 'evEbitdaMax',   label: 'EV/EBITDA Max',    category: 'Valuation',    type: 'range' },
  { key: 'marketCapCrMin',label: 'Mkt Cap Min (Cr)', category: 'Valuation',    type: 'range' },
  { key: 'marketCapCrMax',label: 'Mkt Cap Max (Cr)', category: 'Valuation',    type: 'range' },
  { key: 'dividendYieldMin',label:'Div Yield Min %', category: 'Valuation',    type: 'range' },
  { key: 'dividendYieldMax',label:'Div Yield Max %', category: 'Valuation',    type: 'range' },
  // Profitability
  { key: 'roeMin',            label: 'ROE Min %',         category: 'Profitability', type: 'range' },
  { key: 'roeMax',            label: 'ROE Max %',         category: 'Profitability', type: 'range' },
  { key: 'roceMin',           label: 'ROCE Min %',        category: 'Profitability', type: 'range' },
  { key: 'roceMax',           label: 'ROCE Max %',        category: 'Profitability', type: 'range' },
  { key: 'patMarginMin',      label: 'PAT Margin Min %',  category: 'Profitability', type: 'range' },
  { key: 'patMarginMax',      label: 'PAT Margin Max %',  category: 'Profitability', type: 'range' },
  { key: 'operatingMarginMin',label: 'Op Margin Min %',   category: 'Profitability', type: 'range' },
  { key: 'operatingMarginMax',label: 'Op Margin Max %',   category: 'Profitability', type: 'range' },
  // Growth
  { key: 'revenueGrowth1yMin',label: 'Rev Growth Min %',  category: 'Growth',        type: 'range' },
  { key: 'revenueGrowth1yMax',label: 'Rev Growth Max %',  category: 'Growth',        type: 'range' },
  { key: 'patGrowth1yMin',    label: 'PAT Growth Min %',  category: 'Growth',        type: 'range' },
  { key: 'patGrowth1yMax',    label: 'PAT Growth Max %',  category: 'Growth',        type: 'range' },
  { key: 'epsGrowth1yMin',    label: 'EPS Growth Min %',  category: 'Growth',        type: 'range' },
  { key: 'epsGrowth1yMax',    label: 'EPS Growth Max %',  category: 'Growth',        type: 'range' },
  // Balance Sheet
  { key: 'debtEquityMin',       label: 'D/E Min',             category: 'Balance Sheet', type: 'range' },
  { key: 'debtEquityMax',       label: 'D/E Max',             category: 'Balance Sheet', type: 'range' },
  { key: 'currentRatioMin',     label: 'Current Ratio Min',   category: 'Balance Sheet', type: 'range' },
  { key: 'currentRatioMax',     label: 'Current Ratio Max',   category: 'Balance Sheet', type: 'range' },
  { key: 'interestCoverageMin', label: 'Interest Cov. Min',   category: 'Balance Sheet', type: 'range' },
  { key: 'interestCoverageMax', label: 'Interest Cov. Max',   category: 'Balance Sheet', type: 'range' },
  { key: 'qualityScoreMin',     label: 'Quality Score Min',   category: 'Balance Sheet', type: 'range' },
  { key: 'qualityScoreMax',     label: 'Quality Score Max',   category: 'Balance Sheet', type: 'range' },
  // Technical
  { key: 'rsi14Min',         label: 'RSI Min',          category: 'Technical',     type: 'range' },
  { key: 'rsi14Max',         label: 'RSI Max',          category: 'Technical',     type: 'range' },
  { key: 'pctFrom52wHighMin',label: '52W High % Min',   category: 'Technical',     type: 'range' },
  { key: 'pctFrom52wHighMax',label: '52W High % Max',   category: 'Technical',     type: 'range' },
  { key: 'pctFrom52wLowMin', label: '52W Low % Min',    category: 'Technical',     type: 'range' },
  { key: 'pctFrom52wLowMax', label: '52W Low % Max',    category: 'Technical',     type: 'range' },
  // Cap bucket
  { key: 'marketCapBucket', label: 'Market Cap Bucket', category: 'Valuation', type: 'select',
    options: [
      { value: 'large', label: 'Large Cap (≥20,000 Cr)' },
      { value: 'mid',   label: 'Mid Cap (5,000–20,000 Cr)' },
      { value: 'small', label: 'Small Cap (500–5,000 Cr)' },
      { value: 'micro', label: 'Micro Cap (<500 Cr)' },
    ],
  },
];

const FILTER_CATEGORIES = [...new Set(FILTER_SPECS.map(f => f.category))];

// ── Widget type options ───────────────────────────────────────────────────────

const WIDGET_TYPES: { value: WidgetType; label: string; icon: string }[] = [
  { value: 'table',          label: 'Table',          icon: '⊞' },
  { value: 'bar',            label: 'Bar Chart',      icon: '▬' },
  { value: 'horizontal_bar', label: 'H-Bar Chart',    icon: '≡' },
  { value: 'pie',            label: 'Pie / Donut',    icon: '◔' },
  { value: 'line',           label: 'Line Chart',     icon: '∿' },
  { value: 'area',           label: 'Area Chart',     icon: '⌇' },
  { value: 'heatmap',        label: 'Heatmap',        icon: '▦' },
  { value: 'metric',         label: 'Metric Card',    icon: '#' },
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  widget: UserWidget;
  onSave: (widgetId: string, updates: { title?: string; widget_type?: WidgetType; config_json?: WidgetConfig }) => Promise<boolean>;
  onClose: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: 'var(--bg-hover)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    borderRadius: 6,
    fontSize: 12,
    outline: 'none',
    ...extra,
  };
}

function labelStyle(): React.CSSProperties {
  return { color: 'var(--text-secondary)', fontSize: 11, marginBottom: 3, display: 'block' };
}

// ── Main component ────────────────────────────────────────────────────────────

export function WidgetEditor({ widget, onSave, onClose }: Props) {
  const [title, setTitle] = useState(widget.title);
  const [widgetType, setWidgetType] = useState<WidgetType>(widget.widget_type);
  const [columns, setColumns] = useState<WidgetColumn[]>([...(widget.config_json.columns ?? [])]);
  const [filters, setFilters] = useState<Record<string, unknown>>({ ...(widget.config_json.filters ?? {}) });
  const [sortColumn, setSortColumn] = useState<string>(widget.config_json.sortColumn ?? '');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(widget.config_json.sortDirection ?? 'desc');
  const [limit, setLimit] = useState<number>(widget.config_json.limit ?? 50);
  const [groupColumn, setGroupColumn] = useState<string>(widget.config_json.groupColumn ?? '');
  const [chartConfig, setChartConfig] = useState<ChartConfig>({ ...(widget.config_json.chartConfig ?? {}) });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'columns' | 'filters' | 'sort' | 'chart' | 'preview'>('columns');
  const [colSearch, setColSearch] = useState('');
  const [colCategory, setColCategory] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [addFilterKey, setAddFilterKey] = useState('');

  // Live preview uses the current in-progress config
  const previewConfig: WidgetConfig = {
    columns,
    filters,
    sortColumn: sortColumn || undefined,
    sortDirection,
    limit,
    groupColumn: groupColumn || null,
    chartConfig,
  };
  const { data: previewData, loading: previewLoading } = useWidgetData(previewConfig, widgetType, activeTab === 'preview');

  const handleSave = useCallback(async () => {
    setSaving(true);
    const ok = await onSave(widget.id, {
      title: title.trim() || widget.title,
      widget_type: widgetType,
      config_json: previewConfig,
    });
    setSaving(false);
    if (ok) onClose();
  }, [onSave, widget.id, widget.title, title, widgetType, previewConfig, onClose]);

  // ── Column management ──────────────────────────────────────────────────────

  const addColumn = useCallback((col: CatalogueColumn) => {
    if (columns.find(c => c.id === col.id)) return;
    const { category: _cat, available: _av, ...colDef } = col;
    setColumns(prev => [...prev, colDef]);
  }, [columns]);

  const removeColumn = useCallback((id: string) => {
    setColumns(prev => prev.filter(c => c.id !== id));
  }, []);

  const moveColumn = useCallback((from: number, to: number) => {
    if (to < 0 || to >= columns.length) return;
    setColumns(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }, [columns.length]);

  const updateColumnProp = useCallback(<K extends keyof WidgetColumn>(id: string, key: K, value: WidgetColumn[K]) => {
    setColumns(prev => prev.map(c => c.id === id ? { ...c, [key]: value } : c));
  }, []);

  // ── Filter management ──────────────────────────────────────────────────────

  const activeFilters = Object.keys(filters).filter(k => filters[k] !== '' && filters[k] !== null && filters[k] !== undefined);

  const setFilter = useCallback((key: string, value: unknown) => {
    setFilters(prev => {
      if (value === '' || value === null || value === undefined) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => { const next = { ...prev }; delete next[key]; return next; });
  }, []);

  // ── Filtered catalogue ─────────────────────────────────────────────────────

  const visibleCols = COLUMN_CATALOGUE.filter(c => {
    const matchCat = colCategory === 'All' || c.category === colCategory;
    const matchSearch = !colSearch || c.label.toLowerCase().includes(colSearch.toLowerCase()) || c.id.includes(colSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const visibleFilters = FILTER_SPECS.filter(f => filterCategory === 'All' || f.category === filterCategory);

  // ── Needs chart axes ───────────────────────────────────────────────────────

  const needsAxes = ['bar', 'horizontal_bar', 'line', 'area'].includes(widgetType);
  const needsColorField = ['bar', 'horizontal_bar', 'pie', 'heatmap'].includes(widgetType);
  const needsDonut = widgetType === 'pie';

  const numericColumns = columns.filter(c => c.format !== 'text');

  // ── Tabs ───────────────────────────────────────────────────────────────────

  const TABS = [
    { id: 'columns' as const,  label: 'Columns', badge: columns.length },
    { id: 'filters' as const,  label: 'Filters',  badge: activeFilters.length },
    { id: 'sort' as const,     label: 'Sort & Limit' },
    { id: 'chart' as const,    label: 'Chart Settings' },
    { id: 'preview' as const,  label: 'Preview' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col rounded-xl shadow-2xl w-full max-w-4xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          maxHeight: 'calc(100vh - 48px)',
          minHeight: 500,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="flex-1 min-w-0 px-2 py-1 rounded text-sm font-semibold"
              style={inputStyle({ maxWidth: 280 })}
              placeholder="Widget title..."
            />
            <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>—</span>
            <div className="flex items-center gap-1 flex-wrap">
              {WIDGET_TYPES.map(wt => (
                <button
                  key={wt.value}
                  title={wt.label}
                  onClick={() => setWidgetType(wt.value)}
                  className="px-2 py-1 rounded text-[11px] transition-colors"
                  style={{
                    background: widgetType === wt.value ? 'var(--accent-brand)' : 'var(--bg-hover)',
                    color: widgetType === wt.value ? '#fff' : 'var(--text-secondary)',
                    border: `1px solid ${widgetType === wt.value ? 'var(--accent-brand)' : 'var(--border)'}`,
                  }}
                >
                  <span className="mr-1">{wt.icon}</span>{wt.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors flex-shrink-0"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 px-4 pt-2 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 text-xs rounded-t transition-colors flex items-center gap-1.5"
              style={{
                color: activeTab === tab.id ? 'var(--accent-brand)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-brand)' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {tab.label}
              {'badge' in tab && (tab.badge ?? 0) > 0 && (
                <span className="px-1 rounded-full text-[10px]" style={{ background: 'var(--accent-brand)', color: '#fff' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* ── Columns Tab ──────────────────────────────────────────────── */}
          {activeTab === 'columns' && (
            <div className="flex h-full min-h-0" style={{ minHeight: 360 }}>
              {/* Left: catalogue */}
              <div className="flex flex-col w-64 flex-shrink-0" style={{ borderRight: '1px solid var(--border)' }}>
                <div className="p-3 flex-shrink-0 space-y-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <input
                    value={colSearch}
                    onChange={e => setColSearch(e.target.value)}
                    placeholder="Search columns…"
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle()}
                  />
                  <div className="flex flex-wrap gap-1">
                    {['All', ...COLUMN_CATEGORIES].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setColCategory(cat)}
                        className="px-2 py-0.5 rounded text-[10px] transition-colors"
                        style={{
                          background: colCategory === cat ? 'var(--accent-brand)' : 'var(--bg-hover)',
                          color: colCategory === cat ? '#fff' : 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                  {visibleCols.map(col => {
                    const added = columns.some(c => c.id === col.id);
                    return (
                      <button
                        key={col.id}
                        onClick={() => added ? removeColumn(col.id) : addColumn(col)}
                        className="w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-colors"
                        style={{ color: added ? 'var(--accent-brand)' : 'var(--text-primary)' }}
                        onMouseEnter={e => { if (!added) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                      >
                        <span
                          className="w-4 h-4 rounded flex items-center justify-center text-[10px] flex-shrink-0"
                          style={{ background: added ? 'var(--accent-brand)' : 'var(--border)', color: added ? '#fff' : 'var(--text-secondary)' }}
                        >
                          {added ? '✓' : '+'}
                        </span>
                        <span className="truncate flex-1">{col.label}</span>
                        <span className="text-[10px] opacity-50">{col.format}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: selected columns */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="px-4 py-2 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Selected columns — drag to reorder
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                  {columns.length === 0 && (
                    <div className="flex items-center justify-center h-full" style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                      Select columns from the left panel
                    </div>
                  )}
                  {columns.map((col, idx) => (
                    <SelectedColumnRow
                      key={col.id}
                      col={col}
                      idx={idx}
                      total={columns.length}
                      onRemove={removeColumn}
                      onMove={moveColumn}
                      onUpdate={updateColumnProp}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Filters Tab ──────────────────────────────────────────────── */}
          {activeTab === 'filters' && (
            <div className="p-4 space-y-4">
              {/* Category filter + Add filter dropdown */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Category:</span>
                {['All', ...FILTER_CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className="px-2 py-0.5 rounded text-[10px] transition-colors"
                    style={{
                      background: filterCategory === cat ? 'var(--accent-brand)' : 'var(--bg-hover)',
                      color: filterCategory === cat ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <select
                    value={addFilterKey}
                    onChange={e => setAddFilterKey(e.target.value)}
                    className="px-2 py-1 rounded text-xs"
                    style={inputStyle()}
                  >
                    <option value="">+ Add filter…</option>
                    {visibleFilters.map(f => (
                      <option key={f.key} value={f.key}>{f.label}</option>
                    ))}
                  </select>
                  {addFilterKey && (
                    <button
                      onClick={() => { setFilter(addFilterKey, ''); setAddFilterKey(''); }}
                      className="px-2 py-1 rounded text-xs transition-colors"
                      style={{ background: 'var(--accent-brand)', color: '#fff' }}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>

              {/* Active filter rows */}
              <div className="space-y-2">
                {activeFilters.length === 0 && (
                  <div className="text-xs py-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                    No filters active — use the dropdown above to add filters
                  </div>
                )}
                {activeFilters.map(key => {
                  const spec = FILTER_SPECS.find(f => f.key === key);
                  if (!spec) return null;
                  return (
                    <FilterRow
                      key={key}
                      spec={spec}
                      value={filters[key]}
                      onChange={v => setFilter(key, v)}
                      onRemove={() => removeFilter(key)}
                    />
                  );
                })}
              </div>

              {/* Quick-add common filters */}
              {activeFilters.length === 0 && (
                <div>
                  <p className="text-[11px] mb-2" style={{ color: 'var(--text-secondary)' }}>Common filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'peTtmMax', label: 'P/E Max' },
                      { key: 'roeMin', label: 'ROE Min' },
                      { key: 'roceMin', label: 'ROCE Min' },
                      { key: 'debtEquityMax', label: 'D/E Max' },
                      { key: 'rsi14Min', label: 'RSI Min' },
                      { key: 'rsi14Max', label: 'RSI Max' },
                      { key: 'marketCapCrMin', label: 'Mkt Cap Min' },
                      { key: 'dividendYieldMin', label: 'Div Yield Min' },
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key, '')}
                        className="px-2 py-1 rounded text-[11px] transition-colors"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-brand)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                      >
                        + {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Sort & Limit Tab ─────────────────────────────────────────── */}
          {activeTab === 'sort' && (
            <div className="p-4 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle()}>Sort by</label>
                  <select
                    value={sortColumn}
                    onChange={e => setSortColumn(e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle()}
                  >
                    <option value="">— None —</option>
                    {columns.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle()}>Direction</label>
                  <div className="flex gap-2">
                    {(['desc', 'asc'] as const).map(dir => (
                      <button
                        key={dir}
                        onClick={() => setSortDirection(dir)}
                        className="flex-1 py-1.5 rounded text-xs transition-colors"
                        style={{
                          background: sortDirection === dir ? 'var(--accent-brand)' : 'var(--bg-hover)',
                          color: sortDirection === dir ? '#fff' : 'var(--text-secondary)',
                          border: `1px solid ${sortDirection === dir ? 'var(--accent-brand)' : 'var(--border)'}`,
                        }}
                      >
                        {dir === 'desc' ? '↓ Descending' : '↑ Ascending'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle()}>Row limit</label>
                  <div className="flex gap-2 flex-wrap">
                    {[10, 20, 50, 100, 200, 500].map(n => (
                      <button
                        key={n}
                        onClick={() => setLimit(n)}
                        className="px-3 py-1 rounded text-xs transition-colors"
                        style={{
                          background: limit === n ? 'var(--accent-brand)' : 'var(--bg-hover)',
                          color: limit === n ? '#fff' : 'var(--text-secondary)',
                          border: `1px solid ${limit === n ? 'var(--accent-brand)' : 'var(--border)'}`,
                        }}
                      >
                        {n}
                      </button>
                    ))}
                    <input
                      type="number"
                      value={limit}
                      onChange={e => setLimit(Math.max(1, Math.min(500, Number(e.target.value))))}
                      className="w-16 px-2 py-1 rounded text-xs"
                      style={inputStyle()}
                      min={1} max={500}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle()}>Group by</label>
                  <select
                    value={groupColumn}
                    onChange={e => setGroupColumn(e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle()}
                  >
                    <option value="">— No grouping —</option>
                    <option value="sector">Sector</option>
                    <option value="industry_group">Industry Group</option>
                    {columns.filter(c => c.format === 'text').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  {groupColumn && (
                    <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                      When grouping, numeric columns will use their aggregation setting.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Chart Settings Tab ───────────────────────────────────────── */}
          {activeTab === 'chart' && (
            <div className="p-4 space-y-5">
              {needsAxes && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle()}>X Axis / Label column</label>
                    <select
                      value={chartConfig.xAxis ?? ''}
                      onChange={e => setChartConfig(prev => ({ ...prev, xAxis: e.target.value || undefined }))}
                      className="w-full px-2 py-1.5 rounded text-xs"
                      style={inputStyle()}
                    >
                      <option value="">— Auto —</option>
                      {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle()}>Y Axis / Value column</label>
                    <select
                      value={chartConfig.yAxis ?? ''}
                      onChange={e => setChartConfig(prev => ({ ...prev, yAxis: e.target.value || undefined }))}
                      className="w-full px-2 py-1.5 rounded text-xs"
                      style={inputStyle()}
                    >
                      <option value="">— Auto —</option>
                      {numericColumns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {needsColorField && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle()}>Color field (used for bar color gradient)</label>
                    <select
                      value={chartConfig.colorField ?? ''}
                      onChange={e => setChartConfig(prev => ({ ...prev, colorField: e.target.value || undefined }))}
                      className="w-full px-2 py-1.5 rounded text-xs"
                      style={inputStyle()}
                    >
                      <option value="">— None —</option>
                      {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  {needsDonut && (
                    <div className="flex items-center gap-2 mt-5">
                      <Toggle
                        value={chartConfig.donut ?? false}
                        onChange={v => setChartConfig(prev => ({ ...prev, donut: v }))}
                        label="Donut style"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Toggle
                  value={chartConfig.showLegend ?? true}
                  onChange={v => setChartConfig(prev => ({ ...prev, showLegend: v }))}
                  label="Show legend"
                />
                <Toggle
                  value={chartConfig.showLabels ?? false}
                  onChange={v => setChartConfig(prev => ({ ...prev, showLabels: v }))}
                  label="Show value labels"
                />
              </div>

              {!needsAxes && !needsColorField && (
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  No chart-specific settings for this widget type.
                </p>
              )}
            </div>
          )}

          {/* ── Preview Tab ──────────────────────────────────────────────── */}
          {activeTab === 'preview' && (
            <div className="p-3 flex flex-col gap-2" style={{ minHeight: 360 }}>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Live preview — {previewData ? `${previewData.total} rows` : previewLoading ? 'loading…' : 'no data'}
                </span>
              </div>
              <div
                className="flex-1 rounded-lg overflow-hidden"
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
                  minHeight: 300,
                }}
              >
                {previewLoading && (
                  <div className="flex items-center justify-center h-full animate-pulse" style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                    Loading preview…
                  </div>
                )}
                {!previewLoading && previewData && previewData.rows.length > 0 && (
                  <WidgetRenderer
                    widgetType={widgetType}
                    rows={previewData.rows}
                    columns={previewData.columns}
                    config={previewConfig}
                  />
                )}
                {!previewLoading && previewData && previewData.rows.length === 0 && (
                  <div className="flex items-center justify-center h-full" style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                    No rows returned — adjust filters or columns
                  </div>
                )}
                {!previewLoading && !previewData && (
                  <div className="flex items-center justify-center h-full" style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                    Configure columns then click Preview
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {columns.length} col{columns.length !== 1 ? 's' : ''} · {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} · limit {limit}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className="px-3 py-1.5 rounded text-xs transition-colors"
              style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={saving || columns.length === 0}
              className="px-4 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
              style={{ background: 'var(--accent-brand)', color: '#fff' }}
            >
              {saving ? 'Saving…' : 'Save Widget'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SelectedColumnRow({
  col, idx, total, onRemove, onMove, onUpdate,
}: {
  col: WidgetColumn;
  idx: number;
  total: number;
  onRemove: (id: string) => void;
  onMove: (from: number, to: number) => void;
  onUpdate: <K extends keyof WidgetColumn>(id: string, key: K, val: WidgetColumn[K]) => void;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded px-2 py-1.5"
      style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
    >
      {/* Drag-order arrows */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={() => onMove(idx, idx - 1)}
          disabled={idx === 0}
          className="text-[9px] leading-none disabled:opacity-20 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
        >▲</button>
        <button
          onClick={() => onMove(idx, idx + 1)}
          disabled={idx === total - 1}
          className="text-[9px] leading-none disabled:opacity-20 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
        >▼</button>
      </div>

      <span className="text-xs font-medium truncate flex-shrink-0 w-28" style={{ color: 'var(--text-primary)' }}>
        {col.label}
      </span>

      {/* Aggregation */}
      <select
        value={col.aggregation ?? 'none'}
        onChange={e => onUpdate(col.id, 'aggregation', e.target.value as WidgetColumn['aggregation'])}
        className="px-1.5 py-0.5 rounded text-[10px]"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <option value="none">none</option>
        <option value="sum">SUM</option>
        <option value="avg">AVG</option>
        <option value="min">MIN</option>
        <option value="max">MAX</option>
        <option value="count">COUNT</option>
      </select>

      {/* Format */}
      <select
        value={col.format ?? 'number'}
        onChange={e => onUpdate(col.id, 'format', e.target.value as WidgetColumn['format'])}
        className="px-1.5 py-0.5 rounded text-[10px]"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <option value="text">text</option>
        <option value="number">number</option>
        <option value="percent">percent</option>
        <option value="currency">currency</option>
      </select>

      {/* Color code toggle */}
      <label className="flex items-center gap-1 text-[10px] cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
        <input
          type="checkbox"
          checked={col.colorCode ?? false}
          onChange={e => onUpdate(col.id, 'colorCode', e.target.checked)}
          className="w-3 h-3"
        />
        Color
      </label>

      <button
        onClick={() => onRemove(col.id)}
        className="ml-auto p-1 rounded transition-colors flex-shrink-0"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#EF4444'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function FilterRow({
  spec, value, onChange, onRemove,
}: {
  spec: FilterSpec;
  value: unknown;
  onChange: (v: unknown) => void;
  onRemove: () => void;
}) {
  const strVal = value == null ? '' : String(value);

  return (
    <div
      className="flex items-center gap-2 rounded px-3 py-2"
      style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
    >
      <span className="text-xs w-36 flex-shrink-0 truncate" style={{ color: 'var(--text-primary)' }}>{spec.label}</span>
      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{spec.category}</span>
      <div className="flex-1" />
      {spec.type === 'range' ? (
        <input
          type="number"
          value={strVal}
          onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="value"
          className="w-24 px-2 py-1 rounded text-xs text-right"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
        />
      ) : spec.type === 'select' && spec.options ? (
        <select
          value={strVal}
          onChange={e => onChange(e.target.value)}
          className="px-2 py-1 rounded text-xs"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
        >
          <option value="">— Select —</option>
          {spec.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : null}
      <button
        onClick={onRemove}
        className="p-1 rounded transition-colors flex-shrink-0"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#EF4444'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function Toggle({
  value, onChange, label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className="relative w-8 h-4 rounded-full transition-colors flex-shrink-0"
        style={{ background: value ? 'var(--accent-brand)' : 'var(--border)' }}
      >
        <div
          className="absolute top-0.5 w-3 h-3 rounded-full transition-transform"
          style={{
            background: '#fff',
            left: value ? '18px' : '2px',
          }}
        />
      </div>
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </label>
  );
}
