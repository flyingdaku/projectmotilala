'use client';

/**
 * TopBar — the chart's top control strip.
 * Symbol + price, timeframe selector, chart type selector, indicators button,
 * theme toggle, fullscreen toggle.
 */

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart2, LineChart, AreaChart,
  Maximize2, Minimize2, Moon, Sun, BarChart,
  Camera, List, Layout,
} from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import type { Timeframe, ChartType } from '../core/types';
import { TIMEFRAMES } from '../core/types';
import { cn } from '@/lib/utils';

const CHART_TYPES: { value: ChartType; icon: React.ReactNode; label: string }[] = [
  { value: 'candlestick', icon: <BarChart size={20} />, label: 'Candlestick' },
  { value: 'ohlc',        icon: <BarChart size={20} />,  label: 'OHLC' },
  { value: 'line',        icon: <LineChart size={20} />,  label: 'Line' },
  { value: 'area',        icon: <AreaChart size={20} />, label: 'Area' },
  { value: 'bar',         icon: <BarChart size={20} />, label: 'Bar' },
];

interface TopBarProps {
  symbol: string;
  currentPrice?: number | null;
  priceChange?: number | null;
  onIndicatorsClick: () => void;
  onScreenshot?: () => void;
  fullscreenMode?: boolean;
}

export function TopBar({
  symbol,
  currentPrice,
  priceChange,
  onIndicatorsClick,
  onScreenshot,
  fullscreenMode = false,
}: TopBarProps) {
  const {
    timeframe, chartType, isDark, isFullscreen, indicators,
    showWatchlist, showLayoutPanel,
    setTimeframe, setChartType, toggleDark, toggleFullscreen,
    toggleWatchlist, toggleLayoutPanel,
  } = useChartStore();

  const router = useRouter();

  const [showChartTypeMenu, setShowChartTypeMenu] = useState(false);

  const isPos = (priceChange ?? 0) > 0;
  const isNeg = (priceChange ?? 0) < 0;

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background flex-wrap select-none z-10">

      {/* Symbol + Price */}
      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/20 border border-border">
        <span className="text-xs font-bold font-mono text-foreground">{symbol || 'RELIANCE'}</span>
        {currentPrice != null && (
          <>
            <span className="text-sm font-mono font-semibold text-foreground">
              ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {priceChange != null && (
              <span className={cn(
                'text-xs font-mono font-medium',
                isPos ? 'text-emerald-500' : isNeg ? 'text-rose-500' : 'text-muted-foreground'
              )}>
                {isPos ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border" />

      {/* Timeframe selector */}
      <div className="flex items-center gap-0.5">
        {TIMEFRAMES.map(tf => (
          <button
            key={tf.value}
            onClick={() => setTimeframe(tf.value as Timeframe)}
            className={cn(
              'px-2 py-0.5 text-[11px] font-medium rounded transition-colors',
              timeframe === tf.value
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border" />

      {/* Chart type selector */}
      <div className="relative">
        <button
          onClick={() => setShowChartTypeMenu(s => !s)}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          title="Chart type"
        >
          {CHART_TYPES.find(c => c.value === chartType)?.icon}
          <span className="capitalize text-[11px]">{chartType}</span>
        </button>

        {showChartTypeMenu && (
          <>
            <div className="fixed inset-0 z-[100]" onClick={() => setShowChartTypeMenu(false)} />
            <div className="absolute top-full left-0 mt-1 z-[101] bg-background border border-border rounded-lg shadow-xl py-1 min-w-[140px]">
              {CHART_TYPES.map(ct => (
                <button
                  key={ct.value}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-1.5 text-xs transition-colors',
                    chartType === ct.value
                      ? 'text-amber-500 bg-amber-500/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  )}
                  onClick={() => { setChartType(ct.value); setShowChartTypeMenu(false); }}
                >
                  {ct.icon}
                  <span>{ct.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border" />

      {/* Indicators button */}
      <button
        onClick={onIndicatorsClick}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors',
          indicators.length > 0
            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/40 hover:bg-amber-500/25'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
        )}
      >
        <BarChart2 size={20} />
        <span>Indicators</span>
        {indicators.length > 0 && (
          <span className="ml-0.5 bg-amber-500 text-black text-[9px] font-bold px-1 rounded-full">
            {indicators.length}
          </span>
        )}
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Watchlist toggle */}
      <button
        onClick={toggleWatchlist}
        className={cn(
          'p-1.5 rounded transition-colors',
          showWatchlist
            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
        )}
        title="Watchlist"
      >
        <List size={20} />
      </button>

      {/* Layout panel toggle */}
      <button
        onClick={toggleLayoutPanel}
        className={cn(
          'p-1.5 rounded transition-colors',
          showLayoutPanel
            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
        )}
        title="Layouts"
      >
        <Layout size={20} />
      </button>

      {/* Screenshot */}
      {onScreenshot && (
        <button
          onClick={onScreenshot}
          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          title="Screenshot"
        >
          <Camera size={20} />
        </button>
      )}

      {/* Theme toggle */}
      <button
        onClick={toggleDark}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Fullscreen toggle */}
      <button
        onClick={() => {
          if (fullscreenMode) {
            router.push(`/stocks/${symbol}`);
          } else {
            toggleFullscreen();
          }
        }}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        title={fullscreenMode ? 'Back to company' : (isFullscreen ? 'Exit fullscreen' : 'Fullscreen')}
      >
        {fullscreenMode ? <Minimize2 size={20} /> : (isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />)}
      </button>
    </div>
  );
}
