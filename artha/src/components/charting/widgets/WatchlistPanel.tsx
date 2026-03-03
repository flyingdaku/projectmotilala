'use client';

/**
 * WatchlistPanel — collapsible right-side watchlist for the fullscreen chart.
 * Allows quick symbol switching without leaving fullscreen mode.
 */

import { useState, useEffect } from 'react';
import { Minus } from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import { cn } from '@/lib/utils';

interface WatchItem {
  symbol: string;
  name:   string;
  price:  number;
  change: number;
}

const DEFAULT_WATCHLIST: WatchItem[] = [
  { symbol: 'RELIANCE',   name: 'Reliance Industries', price: 2450.50, change:  1.23 },
  { symbol: 'TCS',        name: 'Tata Consultancy',    price: 3820.00, change: -0.45 },
  { symbol: 'HDFCBANK',   name: 'HDFC Bank',           price: 1680.75, change:  0.82 },
  { symbol: 'INFY',       name: 'Infosys',             price: 1540.20, change: -1.10 },
  { symbol: 'ICICIBANK',  name: 'ICICI Bank',          price:  950.30, change:  2.05 },
  { symbol: 'WIPRO',      name: 'Wipro',               price:  450.60, change:  0.35 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance',       price: 7200.80, change: -0.68 },
  { symbol: 'SBIN',       name: 'State Bank of India', price:  780.45, change:  1.58 },
  { symbol: 'ADANIENT',   name: 'Adani Enterprises',  price: 2980.00, change:  3.22 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors',        price:  870.90, change: -2.10 },
];

interface WatchlistPanelProps {
  onSymbolSelect?: (symbol: string) => void;
  onClose?: () => void;
}

export function WatchlistPanel({ onSymbolSelect, onClose }: WatchlistPanelProps) {
  const { symbol: activeSymbol, setSymbol } = useChartStore();
  const [items, setItems] = useState<WatchItem[]>(DEFAULT_WATCHLIST);

  function handleSelect(item: WatchItem) {
    setSymbol(item.symbol);
    onSymbolSelect?.(item.symbol);
  }


  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border flex-shrink-0">
        <span className="text-xs font-semibold text-foreground">Watchlist</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">{items.length} stocks</span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-muted/50 transition-colors"
              title="Close watchlist"
            >
              <Minus size={12} />
            </button>
          )}
        </div>
      </div>


      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {items.map(item => {
          const isActive = item.symbol === activeSymbol;
          const isPos    = item.change > 0;
          const isNeg    = item.change < 0;

          return (
            <button
              key={item.symbol}
              onClick={() => handleSelect(item)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-left transition-colors group border-b border-border/40',
                isActive
                  ? 'bg-amber-500/10 border-l-2 border-l-amber-500'
                  : 'hover:bg-muted/30'
              )}
            >
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={cn(
                    'text-[11px] font-mono font-semibold truncate',
                    isActive ? 'text-amber-500' : 'text-foreground'
                  )}>
                    {item.symbol}
                  </span>
                  <span className={cn(
                    'text-[10px] font-mono font-medium flex-shrink-0',
                    isPos ? 'text-emerald-500' : isNeg ? 'text-rose-500' : 'text-muted-foreground'
                  )}>
                    {isPos ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] text-muted-foreground truncate">{item.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0">
                    ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
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
