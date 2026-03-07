'use client';

import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, Settings, Trash2 } from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import { cn } from '@/lib/utils';
import { getIndustryGroupEmoji } from '@/lib/utils/emojis';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

type WatchlistMetricKey =
  | 'rvol1'
  | 'atr'
  | 'natr'
  | 'pe'
  | 'pb'
  | 'roe'
  | 'roce'
  | 'debtToEquity'
  | 'dividendYield'
  | 'salesGrowth'
  | 'profitGrowth'
  | 'marketCap';

type SortKey = 'symbol' | 'industryGroup' | WatchlistMetricKey | 'change' | 'price';

interface WatchItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  industryGroup: string;
  rvol1: number;
  atr: number;
  natr: number;
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  dividendYield: number;
  salesGrowth: number;
  profitGrowth: number;
  marketCap: number;
}

interface WatchlistCollection {
  id: string;
  name: string;
  items: WatchItem[];
}

interface WatchlistMetricDefinition {
  key: WatchlistMetricKey;
  label: string;
  shortLabel: string;
  width: number;
  kind: 'number' | 'percent' | 'multiple' | 'currencyCompact';
  periodOptions?: number[];
}

interface WatchlistColumnConfig {
  enabled: boolean;
  period?: number;
}

export interface WatchlistConfig {
  industryIcon: WatchlistColumnConfig;
  rvol1: WatchlistColumnConfig;
  atr: WatchlistColumnConfig;
  natr: WatchlistColumnConfig;
  pe: WatchlistColumnConfig;
  pb: WatchlistColumnConfig;
  roe: WatchlistColumnConfig;
  roce: WatchlistColumnConfig;
  debtToEquity: WatchlistColumnConfig;
  dividendYield: WatchlistColumnConfig;
  salesGrowth: WatchlistColumnConfig;
  profitGrowth: WatchlistColumnConfig;
  marketCap: WatchlistColumnConfig;
}

const WATCHLIST_PANEL_SYMBOL_WIDTH = 136;
const WATCHLIST_PANEL_INDUSTRY_WIDTH = 28;
const WATCHLIST_PANEL_CHANGE_WIDTH = 76;
const WATCHLIST_PANEL_PRICE_WIDTH = 90;
const WATCHLIST_PANEL_PADDING_WIDTH = 16;
const WATCHLIST_MAX_CUSTOM_COLUMNS = 10;

const WATCHLIST_METRICS: WatchlistMetricDefinition[] = [
  { key: 'rvol1', label: 'RVol', shortLabel: 'RVol', width: 88, kind: 'number', periodOptions: [1, 5, 10, 20] },
  { key: 'atr', label: 'ATR', shortLabel: 'ATR', width: 88, kind: 'number', periodOptions: [7, 14, 21] },
  { key: 'natr', label: 'NATR', shortLabel: 'NATR', width: 88, kind: 'percent', periodOptions: [7, 14, 21] },
  { key: 'pe', label: 'P/E', shortLabel: 'P/E', width: 82, kind: 'multiple' },
  { key: 'pb', label: 'P/B', shortLabel: 'P/B', width: 82, kind: 'multiple' },
  { key: 'roe', label: 'ROE', shortLabel: 'ROE', width: 82, kind: 'percent' },
  { key: 'roce', label: 'ROCE', shortLabel: 'ROCE', width: 84, kind: 'percent' },
  { key: 'debtToEquity', label: 'Debt / Eq', shortLabel: 'D/E', width: 88, kind: 'multiple' },
  { key: 'dividendYield', label: 'Dividend Yield', shortLabel: 'Div Yld', width: 98, kind: 'percent' },
  { key: 'salesGrowth', label: 'Sales Growth', shortLabel: 'Sales Gr', width: 96, kind: 'percent' },
  { key: 'profitGrowth', label: 'Profit Growth', shortLabel: 'Profit Gr', width: 96, kind: 'percent' },
  { key: 'marketCap', label: 'Market Cap', shortLabel: 'MCap', width: 104, kind: 'currencyCompact' },
];

const METRIC_DEFINITIONS = Object.fromEntries(
  WATCHLIST_METRICS.map((metric) => [metric.key, metric])
) as Record<WatchlistMetricKey, WatchlistMetricDefinition>;

const TECHNICAL_METRIC_KEYS: WatchlistMetricKey[] = ['rvol1', 'atr', 'natr'];
const FUNDAMENTAL_METRIC_KEYS: WatchlistMetricKey[] = ['pe', 'pb', 'roe', 'roce', 'debtToEquity', 'dividendYield', 'salesGrowth', 'profitGrowth', 'marketCap'];

export const DEFAULT_WATCHLIST: WatchItem[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2984.5, change: 1.23, industryGroup: 'Oil&Gas-Integrated', rvol1: 1.84, atr: 72.4, natr: 2.43, pe: 28.1, pb: 2.1, roe: 8.4, roce: 9.8, debtToEquity: 0.34, dividendYield: 0.37, salesGrowth: 11.6, profitGrowth: 7.8, marketCap: 2015 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.3, change: -1.08, industryGroup: 'Computer-Tech Services', rvol1: 0.91, atr: 94.2, natr: 2.29, pe: 31.4, pb: 14.1, roe: 45.8, roce: 58.2, debtToEquity: 0.02, dividendYield: 1.24, salesGrowth: 8.6, profitGrowth: 9.1, marketCap: 1492 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1642.15, change: 0.34, industryGroup: 'Banks-Money Center', rvol1: 1.12, atr: 31.7, natr: 1.93, pe: 19.7, pb: 2.8, roe: 14.7, roce: 8.9, debtToEquity: 5.91, dividendYield: 0.95, salesGrowth: 15.2, profitGrowth: 18.4, marketCap: 1254 },
  { symbol: 'INFY', name: 'Infosys', price: 1540, change: -0.79, industryGroup: 'Computer-Tech Services', rvol1: 1.06, atr: 34.6, natr: 2.25, pe: 24.9, pb: 7.6, roe: 31.2, roce: 39.5, debtToEquity: 0.05, dividendYield: 2.12, salesGrowth: 6.8, profitGrowth: 8.4, marketCap: 639 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1148.9, change: 1.46, industryGroup: 'Banks-Money Center', rvol1: 1.35, atr: 26.1, natr: 2.27, pe: 18.4, pb: 3.2, roe: 17.9, roce: 9.5, debtToEquity: 5.42, dividendYield: 0.68, salesGrowth: 20.6, profitGrowth: 23.7, marketCap: 811 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 780.45, change: 1.58, industryGroup: 'Banks-Money Center', rvol1: 1.41, atr: 21.6, natr: 2.77, pe: 9.8, pb: 1.6, roe: 16.4, roce: 8.1, debtToEquity: 8.42, dividendYield: 1.42, salesGrowth: 18.5, profitGrowth: 21.3, marketCap: 696 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7200.8, change: -0.68, industryGroup: 'Finance-Consumer Loans', rvol1: 0.88, atr: 145.3, natr: 2.02, pe: 29.8, pb: 5.4, roe: 20.1, roce: 12.8, debtToEquity: 3.71, dividendYield: 0.48, salesGrowth: 24.6, profitGrowth: 27.5, marketCap: 447 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2980, change: 3.22, industryGroup: 'Trading & Logistics', rvol1: 1.93, atr: 126.4, natr: 4.24, pe: 92.5, pb: 8.8, roe: 9.2, roce: 10.4, debtToEquity: 1.34, dividendYield: 0, salesGrowth: 28.9, profitGrowth: 16.3, marketCap: 340 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 870.9, change: -2.1, industryGroup: 'Auto-Cars/Passenger Vehicles', rvol1: 1.52, atr: 29.4, natr: 3.38, pe: 10.6, pb: 2.3, roe: 19.7, roce: 16.9, debtToEquity: 0.78, dividendYield: 0.72, salesGrowth: 14.3, profitGrowth: 19.8, marketCap: 320 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2891.2, change: 0.52, industryGroup: 'Chemicals-Paints', rvol1: 0.76, atr: 68.1, natr: 2.36, pe: 52.8, pb: 14.3, roe: 27.4, roce: 33.5, debtToEquity: 0.11, dividendYield: 0.91, salesGrowth: 9.2, profitGrowth: 11.4, marketCap: 277 },
];

export const DEFAULT_WATCHLIST_CONFIG: WatchlistConfig = {
  industryIcon: { enabled: true },
  rvol1: { enabled: true, period: 1 },
  atr: { enabled: false, period: 14 },
  natr: { enabled: false, period: 14 },
  pe: { enabled: false },
  pb: { enabled: false },
  roe: { enabled: false },
  roce: { enabled: false },
  debtToEquity: { enabled: false },
  dividendYield: { enabled: false },
  salesGrowth: { enabled: false },
  profitGrowth: { enabled: false },
  marketCap: { enabled: false },
};

const DEFAULT_WATCHLIST_COLLECTIONS: WatchlistCollection[] = [
  {
    id: 'default',
    name: 'Core',
    items: DEFAULT_WATCHLIST,
  },
  {
    id: 'momentum',
    name: 'Momentum',
    items: DEFAULT_WATCHLIST.filter((item) => item.change > 0),
  },
  {
    id: 'financials',
    name: 'Financials',
    items: DEFAULT_WATCHLIST.filter((item) => item.industryGroup.includes('Bank') || item.industryGroup.includes('Finance')),
  },
];

function getEnabledMetricColumns(config: WatchlistConfig) {
  return WATCHLIST_METRICS.filter((metric) => config[metric.key].enabled).slice(0, WATCHLIST_MAX_CUSTOM_COLUMNS);
}

export function getWatchlistPanelWidth(config: WatchlistConfig) {
  const metricsWidth = getEnabledMetricColumns(config).reduce((sum, metric) => sum + metric.width, 0);
  return WATCHLIST_PANEL_PADDING_WIDTH + WATCHLIST_PANEL_SYMBOL_WIDTH + WATCHLIST_PANEL_CHANGE_WIDTH + WATCHLIST_PANEL_PRICE_WIDTH + metricsWidth + (config.industryIcon.enabled ? WATCHLIST_PANEL_INDUSTRY_WIDTH : 0);
}

interface WatchlistPanelProps {
  config: WatchlistConfig;
  onConfigChange: Dispatch<SetStateAction<WatchlistConfig>>;
  onSymbolSelect?: (symbol: string) => void;
  onClose?: () => void;
}

function formatMetricValue(item: WatchItem, metricKey: WatchlistMetricKey) {
  const value = item[metricKey];
  const definition = METRIC_DEFINITIONS[metricKey];

  if (definition.kind === 'percent') {
    return `${value.toFixed(2)}%`;
  }

  if (definition.kind === 'multiple') {
    return value.toFixed(2);
  }

  if (definition.kind === 'currencyCompact') {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}T`;
    }
    return `${value.toFixed(0)}B`;
  }

  return value.toFixed(2);
}

function getSortValue(item: WatchItem, sortKey: SortKey) {
  if (sortKey === 'symbol' || sortKey === 'industryGroup') {
    return item[sortKey].toLowerCase();
  }

  return item[sortKey];
}

function SortArrow({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) {
  if (!active) {
    return <ChevronDown size={11} className="text-foreground/70" />;
  }

  if (direction === 'asc') {
    return <ChevronUp size={11} className="text-foreground" />;
  }

  return <ChevronDown size={11} className="text-foreground" />;
}

export function WatchlistPanel({ config, onConfigChange, onSymbolSelect, onClose }: WatchlistPanelProps) {
  const { symbol: activeSymbol, setSymbol } = useChartStore();
  const [sortKey, setSortKey] = useState<SortKey>('change');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [watchlists, setWatchlists] = useState<WatchlistCollection[]>(DEFAULT_WATCHLIST_COLLECTIONS);
  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState<string[]>([DEFAULT_WATCHLIST_COLLECTIONS[0].id]);

  const enabledMetricColumns = useMemo(() => getEnabledMetricColumns(config), [config]);
  const enabledIndicatorCount = enabledMetricColumns.length;
  const activeWatchlists = useMemo(
    () => watchlists.filter((watchlist) => selectedWatchlistIds.includes(watchlist.id)),
    [selectedWatchlistIds, watchlists]
  );
  const activeWatchlist = activeWatchlists[0] ?? watchlists[0];
  const industryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    (activeWatchlist?.items ?? []).forEach((item) => {
      counts.set(item.industryGroup, (counts.get(item.industryGroup) ?? 0) + 1);
    });

    return counts;
  }, [activeWatchlist]);
  const gridTemplateColumns = useMemo(() => {
    const segments = [`${WATCHLIST_PANEL_SYMBOL_WIDTH}px`];

    if (config.industryIcon.enabled) {
      segments.push(`${WATCHLIST_PANEL_INDUSTRY_WIDTH}px`);
    }

    enabledMetricColumns.forEach((metric) => {
      segments.push(`${metric.width}px`);
    });

    segments.push(`${WATCHLIST_PANEL_PRICE_WIDTH}px`);
    segments.push(`${WATCHLIST_PANEL_CHANGE_WIDTH}px`);
    return segments.join(' ');
  }, [config.industryIcon.enabled, enabledMetricColumns]);

  const sortedItems = useMemo(() => {
    const items = [...(activeWatchlist?.items ?? [])];

    items.sort((left, right) => {
      if (sortKey === 'industryGroup') {
        const leftCount = industryCounts.get(left.industryGroup) ?? 0;
        const rightCount = industryCounts.get(right.industryGroup) ?? 0;

        if (leftCount !== rightCount) {
          return sortDirection === 'asc' ? leftCount - rightCount : rightCount - leftCount;
        }

        const industryCompare = left.industryGroup.localeCompare(right.industryGroup);
        if (industryCompare !== 0) {
          return sortDirection === 'asc' ? industryCompare : -industryCompare;
        }
      }

      const leftValue = getSortValue(left, sortKey);
      const rightValue = getSortValue(right, sortKey);

      if (typeof leftValue === 'string' && typeof rightValue === 'string') {
        return sortDirection === 'asc'
          ? leftValue.localeCompare(rightValue)
          : rightValue.localeCompare(leftValue);
      }

      return sortDirection === 'asc'
        ? Number(leftValue) - Number(rightValue)
        : Number(rightValue) - Number(leftValue);
    });

    return items;
  }, [activeWatchlist, industryCounts, sortDirection, sortKey]);

  function handleSelect(item: WatchItem) {
    setSymbol(item.symbol);
    onSymbolSelect?.(item.symbol);
  }

  function handleClose() {
    onClose?.();
  }

  function toggleWatchlistSelection(watchlistId: string) {
    setSelectedWatchlistIds((current) => {
      if (current.includes(watchlistId)) {
        return current.length === 1 ? current : current.filter((id) => id !== watchlistId);
      }

      return [watchlistId, ...current.filter((id) => id !== watchlistId)];
    });
  }

  function addWatchlist() {
    setWatchlists((current) => {
      const nextIndex = current.length + 1;
      const nextWatchlist: WatchlistCollection = {
        id: `custom-${nextIndex}`,
        name: `Watchlist ${nextIndex}`,
        items: [...DEFAULT_WATCHLIST.slice(0, Math.max(3, 6 - (nextIndex % 3)))],
      };
      setSelectedWatchlistIds([nextWatchlist.id]);
      return [...current, nextWatchlist];
    });
  }

  function removeWatchlist(watchlistId: string) {
    setWatchlists((current) => {
      if (current.length === 1) {
        return current;
      }

      const nextWatchlists = current.filter((watchlist) => watchlist.id !== watchlistId);
      setSelectedWatchlistIds((selected) => {
        const filtered = selected.filter((id) => id !== watchlistId);
        return filtered.length > 0 ? filtered : [nextWatchlists[0].id];
      });
      return nextWatchlists;
    });
  }

  function removeRow(symbol: string) {
    if (!activeWatchlist) {
      return;
    }

    setWatchlists((current) => current.map((watchlist) => {
      if (watchlist.id !== activeWatchlist.id) {
        return watchlist;
      }

      return {
        ...watchlist,
        items: watchlist.items.filter((item) => item.symbol !== symbol),
      };
    }));
  }

  function handleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === 'symbol' || nextKey === 'industryGroup' ? 'asc' : 'desc');
  }

  function updateColumnEnabled(columnKey: keyof WatchlistConfig, enabled: boolean) {
    onConfigChange((current) => {
      if (columnKey !== 'industryIcon' && enabled && !current[columnKey].enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS) {
        return current;
      }

      return {
        ...current,
        [columnKey]: {
          ...current[columnKey],
          enabled,
        },
      };
    });
  }

  function updateColumnPeriod(columnKey: WatchlistMetricKey, period: number) {
    onConfigChange((current) => ({
      ...current,
      [columnKey]: {
        ...current[columnKey],
        period,
      },
    }));
  }

  return (
    <div
      className="flex h-full flex-col overflow-hidden border-l border-border bg-background/95 shadow-2xl backdrop-blur"
      style={{ width: `${getWatchlistPanelWidth(config)}px` }}
    >
      <div className="flex items-center justify-between border-b border-border px-2 py-2">
        <div className="min-w-0 flex-1 pr-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-7 w-[188px] justify-between gap-1 px-1 text-left text-[13px] font-semibold text-foreground">
                <span className="truncate">{activeWatchlist?.name ?? 'Watchlist'}</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[260px] p-1">
              <DropdownMenuLabel>My Watchlists</DropdownMenuLabel>
              {watchlists.map((watchlist) => (
                <div key={watchlist.id} className="flex items-center gap-1">
                  <DropdownMenuCheckboxItem
                    checked={selectedWatchlistIds.includes(watchlist.id)}
                    onSelect={(event) => event.preventDefault()}
                    onCheckedChange={() => toggleWatchlistSelection(watchlist.id)}
                    className="flex-1"
                  >
                    <span className="truncate">{watchlist.name}</span>
                  </DropdownMenuCheckboxItem>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      removeWatchlist(watchlist.id);
                    }}
                    className="mr-1 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    disabled={watchlists.length === 1}
                    title="Remove watchlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={addWatchlist}>
                <Plus size={14} />
                Add watchlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Watchlist settings">
                <Settings size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px] p-0">
              <div className="p-3">
                <DropdownMenuLabel className="px-0 py-0 text-foreground">Watchlist Columns</DropdownMenuLabel>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[420px] space-y-3 overflow-y-auto p-3">
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <div>
                    <div className="text-sm font-medium text-foreground">Industry Group</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateColumnEnabled('industryIcon', !config.industryIcon.enabled)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                      config.industryIcon.enabled
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                        : 'border-border text-muted-foreground hover:bg-muted/50'
                    )}
                  >
                    {config.industryIcon.enabled && <Check size={12} />}
                    <span>{config.industryIcon.enabled ? 'Include' : 'Exclude'}</span>
                  </button>
                </div>

                {[
                  { title: 'Technicals', keys: TECHNICAL_METRIC_KEYS },
                  { title: 'Fundamentals', keys: FUNDAMENTAL_METRIC_KEYS },
                ].map((section) => (
                  <div key={section.title} className="space-y-2">
                    <div className="px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{section.title}</div>
                    {section.keys.map((metricKey) => {
                      const metric = METRIC_DEFINITIONS[metricKey];
                      const column = config[metric.key];
                      const limitReached = !column.enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS;

                      return (
                        <div key={metric.key} className="rounded-lg border border-border bg-background px-3 py-2.5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-medium text-foreground">{metric.label}</div>
                            </div>
                            <button
                              type="button"
                              disabled={limitReached}
                              onClick={() => updateColumnEnabled(metric.key, !column.enabled)}
                              className={cn(
                                'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                column.enabled
                                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                                  : 'border-border text-muted-foreground hover:bg-muted/50'
                              )}
                            >
                              {column.enabled && <Check size={12} />}
                              <span>{column.enabled ? 'Included' : 'Include'}</span>
                            </button>
                          </div>

                          {metric.periodOptions && (
                            <div className="mt-2 grid grid-cols-[1fr_84px] items-center gap-2">
                              <div className="text-[11px] text-muted-foreground">Parameter</div>
                              <Select
                                value={String(column.period ?? metric.periodOptions[0])}
                                onChange={(event) => updateColumnPeriod(metric.key, Number(event.target.value))}
                                className="h-7 text-xs"
                              >
                                {metric.periodOptions.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </Select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid items-center gap-0.5 border-b border-border bg-muted/30 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground" style={{ gridTemplateColumns }}>
        <button type="button" onClick={() => handleSort('symbol')} className="flex min-w-0 items-center gap-0.5 text-left hover:text-foreground">
          <span>Symbol</span>
          <SortArrow active={sortKey === 'symbol'} direction={sortDirection} />
        </button>

        {config.industryIcon.enabled && (
          <button type="button" onClick={() => handleSort('industryGroup')} className="flex items-center justify-center gap-0.5 hover:text-foreground">
            <span>Ind</span>
            <SortArrow active={sortKey === 'industryGroup'} direction={sortDirection} />
          </button>
        )}

        {enabledMetricColumns.map((metric) => (
          <button key={metric.key} type="button" onClick={() => handleSort(metric.key)} className="flex items-center justify-end gap-0.5 text-right hover:text-foreground">
            <span>{metric.shortLabel}{config[metric.key].period ? `(${config[metric.key].period})` : ''}</span>
            <SortArrow active={sortKey === metric.key} direction={sortDirection} />
          </button>
        ))}

        <button type="button" onClick={() => handleSort('price')} className="flex items-center justify-end gap-0.5 text-right hover:text-foreground">
          <span>LTP</span>
          <SortArrow active={sortKey === 'price'} direction={sortDirection} />
        </button>

        <button type="button" onClick={() => handleSort('change')} className="flex items-center justify-end text-right hover:text-foreground">
          <span className="relative inline-block pr-3">
            <span>Chg%</span>
            <span className="absolute -top-1 right-0">
              <SortArrow active={sortKey === 'change'} direction={sortDirection} />
            </span>
          </span>
        </button>
      </div>

      <div className="px-0 pb-1">
        <div>
          {sortedItems.map((item) => {
            const isActive = item.symbol === activeSymbol;
            const isPositive = item.change > 0;
            const isNegative = item.change < 0;

            return (
              <button
                key={item.symbol}
                type="button"
                onClick={() => handleSelect(item)}
                className={cn(
                  'group relative grid min-h-10 w-full items-center gap-0.5 border-b border-border/80 px-2 py-2 text-left transition-colors',
                  isActive
                    ? 'bg-amber-500/5 hover:bg-muted/40'
                    : 'bg-transparent hover:bg-muted/40'
                )}
                style={{ gridTemplateColumns }}
              >
                <div className={cn('min-w-0 truncate text-[12px] font-semibold', isActive ? 'text-amber-500' : 'text-foreground')}>
                  {item.symbol}
                </div>

                {config.industryIcon.enabled && (
                  <div className="flex items-center justify-center text-base leading-none" title={item.industryGroup}>
                    {getIndustryGroupEmoji(item.industryGroup)}
                  </div>
                )}

                {enabledMetricColumns.map((metric) => (
                  <div key={metric.key} className="truncate text-right text-[11px] font-mono text-foreground/90">
                    {formatMetricValue(item, metric.key)}
                  </div>
                ))}

                <div className="truncate pr-5 text-right text-[11px] font-mono text-muted-foreground">
                  ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className={cn('truncate pr-5 text-right text-[11px] font-semibold', isPositive ? 'text-emerald-500' : isNegative ? 'text-rose-500' : 'text-muted-foreground')}>
                  {isPositive ? '+' : ''}{item.change.toFixed(2)}%
                </div>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeRow(item.symbol);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      removeRow(item.symbol);
                    }
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-rose-500 group-hover:opacity-100"
                  title="Remove row"
                >
                  <Trash2 size={13} />
                </span>
              </button>
            );
          })}
        </div>

        {sortedItems.length === 0 && (
          <div className="flex h-32 items-center justify-center border-b border-dashed border-border text-sm text-muted-foreground">
            This watchlist is empty.
          </div>
        )}
      </div>
    </div>
  );
}
