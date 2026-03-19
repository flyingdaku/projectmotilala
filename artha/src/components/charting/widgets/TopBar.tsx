'use client';

/**
 * TopBar — the chart's top control strip.
 * Symbol + price, timeframe selector, chart type selector, indicators button,
 * theme toggle, fullscreen toggle.
 */

import { useRouter } from 'next/navigation';
import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import {
  BarChart2, LineChart, AreaChart,
  Maximize2, Minimize2, Moon, Sun, BarChart,
  Camera, Bookmark, Layout, Settings,
} from 'lucide-react';
import { useChartStore } from '../store/useChartStore';
import { DEFAULT_WATCHLIST } from './WatchlistPanel';
import type { WatchlistConfig } from './WatchlistPanel';
import type { Timeframe, ChartType } from '../core/types';
import { TIMEFRAMES } from '../core/types';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const CHART_TYPES: { value: ChartType; icon: ReactNode; label: string }[] = [
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
  embeddedPanel?: boolean;
  workspaceMode?: boolean;
  multiChartMode?: boolean;
  panelNumber?: number;
  extraControls?: ReactNode;
  watchlistConfig: WatchlistConfig;
  onWatchlistConfigChange: Dispatch<SetStateAction<WatchlistConfig>>;
}

export function TopBar({
  symbol,
  currentPrice,
  priceChange,
  onIndicatorsClick,
  onScreenshot,
  fullscreenMode = false,
  embeddedPanel = false,
  workspaceMode = false,
  multiChartMode = false,
  panelNumber,
  extraControls,
  watchlistConfig,
  onWatchlistConfigChange,
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

  const handleFullscreenClick = () => {
    if (embeddedPanel) {
      globalThis.window?.top?.location.assign(`/stocks/${encodeURIComponent(symbol)}/chart`);
      return;
    }

    if (workspaceMode) {
      router.push(`/stocks/${symbol}`);
      return;
    }

    if (fullscreenMode) {
      router.push(`/stocks/${symbol}`);
    } else {
      toggleFullscreen();
    }
  };

  return (
    <div className={cn(
      'flex items-center gap-2 border-b border-border bg-background select-none z-10',
      embeddedPanel ? 'px-2 py-1.5' : 'px-3 py-2 flex-wrap'
    )}>

      {/* Symbol + Price */}
      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/20 border border-border">
        <span className="text-xs font-bold font-mono text-foreground">{symbol || 'RELIANCE'}</span>
        {embeddedPanel && panelNumber ? (
          <span className="rounded-full bg-[var(--brand-tint)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand-primary)]">
            P{panelNumber}
          </span>
        ) : null}
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
      <div className={cn('w-[88px] shrink-0', embeddedPanel ? 'w-[80px]' : null)}>
        <Select
          aria-label="Timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as Timeframe)}
          className="h-8 rounded-md border-[var(--border)] bg-[var(--bg-card)] pr-8 text-xs font-semibold text-[var(--text-primary)] shadow-none"
        >
          <optgroup label="Intraday">
            {TIMEFRAMES.filter((tf) => tf.seconds < 86400).map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Higher Timeframes">
            {TIMEFRAMES.filter((tf) => tf.seconds >= 86400).map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </optgroup>
        </Select>
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
      {!embeddedPanel && (
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
      )}

      {extraControls ? (
        <>
          <div className="w-px h-4 bg-border" />
          {extraControls}
        </>
      ) : null}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Watchlist toggle */}
      {!embeddedPanel && <div className="flex items-center gap-1.5">
        <button
          onClick={toggleWatchlist}
          className={cn(
            'relative flex h-[var(--control-height-sm)] items-center gap-2 rounded-lg border px-3 transition-all active:scale-[0.98] group',
            showWatchlist
              ? 'border-transparent bg-[var(--brand-tint)] text-[var(--brand-primary)]'
              : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
          )}
          title="Watchlist"
        >
          <Bookmark size={16} className="transition-colors group-hover:text-[var(--brand-hover)]" />
          <span className="text-xs font-semibold transition-colors group-hover:text-[var(--brand-hover)]">Watchlist</span>
          {showWatchlist ? (
            <span className="rounded-full bg-[var(--bg-card)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]">
              {DEFAULT_WATCHLIST.length}
            </span>
          ) : null}
        </button>

        {showWatchlist && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Configure watchlist"
              >
                <Settings size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2">
              <DropdownMenuLabel>Watchlist Columns</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={watchlistConfig.industryIcon.enabled}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) =>
                  onWatchlistConfigChange((prev) => ({
                    ...prev,
                    industryIcon: { ...prev.industryIcon, enabled: Boolean(checked) },
                  }))
                }
              >
                Industry Icon
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={watchlistConfig.rvol1.enabled}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) =>
                  onWatchlistConfigChange((prev) => ({
                    ...prev,
                    rvol1: { ...prev.rvol1, enabled: Boolean(checked) },
                  }))
                }
              >
                RVOL
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={watchlistConfig.atr.enabled}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) =>
                  onWatchlistConfigChange((prev) => ({
                    ...prev,
                    atr: { ...prev.atr, enabled: Boolean(checked) },
                  }))
                }
              >
                ATR
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={watchlistConfig.natr.enabled}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) =>
                  onWatchlistConfigChange((prev) => ({
                    ...prev,
                    natr: { ...prev.natr, enabled: Boolean(checked) },
                  }))
                }
              >
                NATR
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <div className="grid gap-3 px-2 py-2">
                <div className="grid grid-cols-[1fr_88px] items-center gap-2">
                  <span className="text-xs text-muted-foreground">RVOL Period</span>
                  <Select
                    value={String(watchlistConfig.rvol1.period ?? 1)}
                    onChange={(e) =>
                      onWatchlistConfigChange((prev) => ({
                        ...prev,
                        rvol1: { ...prev.rvol1, period: Number(e.target.value) },
                      }))
                    }
                    className="h-8 text-xs"
                  >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </Select>
                </div>
                <div className="grid grid-cols-[1fr_88px] items-center gap-2">
                  <span className="text-xs text-muted-foreground">ATR Period</span>
                  <Select
                    value={String(watchlistConfig.atr.period ?? 14)}
                    onChange={(e) =>
                      onWatchlistConfigChange((prev) => ({
                        ...prev,
                        atr: { ...prev.atr, period: Number(e.target.value) },
                      }))
                    }
                    className="h-8 text-xs"
                  >
                    <option value="7">7</option>
                    <option value="14">14</option>
                    <option value="21">21</option>
                  </Select>
                </div>
                <div className="grid grid-cols-[1fr_88px] items-center gap-2">
                  <span className="text-xs text-muted-foreground">NATR Period</span>
                  <Select
                    value={String(watchlistConfig.natr.period ?? 14)}
                    onChange={(e) =>
                      onWatchlistConfigChange((prev) => ({
                        ...prev,
                        natr: { ...prev.natr, period: Number(e.target.value) },
                      }))
                    }
                    className="h-8 text-xs"
                  >
                    <option value="7">7</option>
                    <option value="14">14</option>
                    <option value="21">21</option>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>}

      {/* Layout panel toggle */}
      {!embeddedPanel && !multiChartMode && (
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
      )}

      {/* Screenshot */}
      {!embeddedPanel && onScreenshot && (
        <button
          onClick={onScreenshot}
          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          title="Screenshot"
        >
          <Camera size={20} />
        </button>
      )}

      {/* Theme toggle */}
      {!embeddedPanel && (
        <button
          onClick={toggleDark}
          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}

      {/* Fullscreen toggle */}
      <button
        onClick={handleFullscreenClick}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        title={embeddedPanel ? 'Open full chart' : ((workspaceMode || fullscreenMode) ? 'Back to company' : (isFullscreen ? 'Exit fullscreen' : 'Fullscreen'))}
      >
        {embeddedPanel ? <Maximize2 size={18} /> : ((workspaceMode || fullscreenMode) ? <Minimize2 size={20} /> : (isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />))}
      </button>
    </div>
  );
}
