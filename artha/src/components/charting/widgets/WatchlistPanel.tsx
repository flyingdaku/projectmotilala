'use client';

/**
 * WatchlistPanel — collapsible right-side watchlist for the fullscreen chart.
 * Allows quick symbol switching without leaving fullscreen mode.
 */

import { useState, useEffect } from 'react';
import { Minus, Settings } from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import { cn } from '@/lib/utils';
import { getIndustryGroupEmoji } from '@/lib/utils/emojis';

interface WatchItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  industry: string;
  rvol1: number;
}

const DEFAULT_WATCHLIST: WatchItem[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2450.50, change: 1.23, industry: 'Oil&Gas-Integrated', rvol1: 1.2 },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3820.00, change: -0.45, industry: 'Computer-Tech Services', rvol1: 0.8 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1680.75, change: 0.82, industry: 'Banks-Money Center', rvol1: 2.1 },
  { symbol: 'INFY', name: 'Infosys', price: 1540.20, change: -1.10, industry: 'Computer-Tech Services', rvol1: 1.5 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 950.30, change: 2.05, industry: 'Banks-Money Center', rvol1: 0.9 },
  { symbol: 'WIPRO', name: 'Wipro', price: 450.60, change: 0.35, industry: 'Computer-Tech Services', rvol1: 1.1 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7200.80, change: -0.68, industry: 'Finance-Consumer Loans', rvol1: 0.7 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 780.45, change: 1.58, industry: 'Banks-Money Center', rvol1: 1.8 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2980.00, change: 3.22, industry: 'Metals', rvol1: 3.4 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 870.90, change: -2.10, industry: 'Auto', rvol1: 1.3 },
];

interface WatchlistPanelProps {
  onSymbolSelect?: (symbol: string) => void;
  onClose?: () => void;
}

export function WatchlistPanel({ onSymbolSelect, onClose }: WatchlistPanelProps) {
  const { symbol: activeSymbol, setSymbol } = useChartStore();
  const [items, setItems] = useState<WatchItem[]>(DEFAULT_WATCHLIST);
  const [sortKey, setSortKey] = useState<keyof WatchItem>('change');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Column configuration state
  const [showSettings, setShowSettings] = useState(false);
  const [cols, setCols] = useState({
    ind: true,
    rvol1: true,
  });

  // Calculate dynamic physical width of the panel. Base is ~300.
  const getPanelWidth = () => {
    let w = 280; // Base width for Symbol + Chg/Price + padding
    if (cols.ind) w += 40;
    if (cols.rvol1) w += 56;
    return w;
  };

  // Dynamic grid template based on active columns
  const getGridCols = () => {
    let template = '3fr'; // Symbol is always there
    if (cols.ind) template += ' 1.5fr';
    if (cols.rvol1) template += ' 2fr';
    template += ' 2.5fr'; // Price/Change is combined and always there
    return template;
  };
  const gridTemplateColumns = getGridCols();
  const panelWidth = getPanelWidth();

  function handleSelect(item: WatchItem) {
    setSymbol(item.symbol);
    onSymbolSelect?.(item.symbol);
  }

  function handleSort(key: keyof WatchItem) {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    if ((valA as number) < (valB as number)) return sortOrder === 'asc' ? -1 : 1;
    if ((valA as number) > (valB as number)) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });


  return (
    <div
      className="flex flex-col h-full bg-background border-l border-border flex-shrink-0 transition-all duration-300"
      style={{ width: `${panelWidth}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-12 border-b border-border flex-shrink-0">
        <span className="text-xs font-semibold text-foreground">Watchlist</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground mr-1">{items.length} stocks</span>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn("p-1.5 rounded transition-colors", showSettings ? "bg-accent text-accent-foreground" : "hover:bg-muted/50 text-muted-foreground")}
            title="Configure columns"
          >
            <Settings size={12} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-muted/50 transition-colors text-muted-foreground"
              title="Close watchlist"
            >
              <Minus size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Settings Panel Expansion */}
      {showSettings && (
        <div className="px-3 py-2 border-b border-border/50 bg-muted/5 flex flex-wrap gap-3 text-[10px] select-none">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={cols.ind} onChange={(e) => setCols(prev => ({ ...prev, ind: e.target.checked }))} className="accent-amber-500" />
            <span className="text-muted-foreground">Industry Icon</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={cols.rvol1} onChange={(e) => setCols(prev => ({ ...prev, rvol1: e.target.checked }))} className="accent-amber-500" />
            <span className="text-muted-foreground">RVOL(1)</span>
          </label>
        </div>
      )}


      {/* Column Headers */}
      <div
        className="grid gap-2 px-3 py-2 border-b border-border/50 text-[10px] uppercase font-semibold text-muted-foreground select-none flex-shrink-0 bg-muted/10 transition-all"
        style={{ gridTemplateColumns }}
      >
        <div className="cursor-pointer hover:text-foreground flex items-center" onClick={() => handleSort('symbol')}>
          Sym {sortKey === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
        </div>

        {cols.ind && (
          <div className="cursor-pointer hover:text-foreground text-center flex items-center justify-center" onClick={() => handleSort('industry')}>
            Ind {sortKey === 'industry' && (sortOrder === 'asc' ? '↑' : '↓')}
          </div>
        )}

        {cols.rvol1 && (
          <div className="cursor-pointer hover:text-foreground text-right flex items-center justify-end" onClick={() => handleSort('rvol1')}>
            RVOL(1) {sortKey === 'rvol1' && (sortOrder === 'asc' ? '↑' : '↓')}
          </div>
        )}

        <div className="cursor-pointer hover:text-foreground text-right flex items-center justify-end" onClick={() => handleSort('change')}>
          %Chg/LTP {sortKey === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {sortedItems.map(item => {
          const isActive = item.symbol === activeSymbol;
          const isPos = item.change > 0;
          const isNeg = item.change < 0;

          return (
            <button
              key={item.symbol}
              onClick={() => handleSelect(item)}
              className={cn(
                'w-full grid items-center gap-2 px-3 py-2 text-left transition-colors group border-b border-border/40',
                isActive
                  ? 'bg-amber-500/10 border-l-2 border-l-amber-500 pl-2.5'
                  : 'hover:bg-muted/30'
              )}
              style={{ gridTemplateColumns }}
            >
              <div className="flex flex-col min-w-0">
                <span className={cn(
                  'text-[11px] font-mono font-semibold truncate',
                  isActive ? 'text-amber-500' : 'text-foreground'
                )}>
                  {item.symbol}
                </span>
                <span className="text-[9px] text-muted-foreground truncate">{item.name}</span>
              </div>

              {cols.ind && (
                <div className="flex justify-center text-lg" title={item.industry}>
                  {getIndustryGroupEmoji(item.industry)}
                </div>
              )}

              {cols.rvol1 && (
                <div className="text-[10px] font-mono font-medium text-right whitespace-nowrap flex-shrink-0" style={{ color: item.rvol1 > 1.5 ? 'var(--accent-brand)' : 'var(--text-secondary)' }}>
                  {item.rvol1.toFixed(2)}x
                </div>
              )}

              <div className="flex flex-col items-end whitespace-nowrap">
                <span className={cn(
                  'text-[10.5px] font-mono font-medium',
                  isPos ? 'text-emerald-500' : isNeg ? 'text-rose-500' : 'text-muted-foreground'
                )}>
                  {isPos ? '+' : ''}{item.change.toFixed(2)}%
                </span>
                <span className="text-[9.5px] font-mono text-muted-foreground">
                  {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 p-3 border-t border-border flex-shrink-0">
        <button className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          1
        </button>
        <button className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          2
        </button>
        <button className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          3
        </button>
      </div>
    </div>
  );
}
