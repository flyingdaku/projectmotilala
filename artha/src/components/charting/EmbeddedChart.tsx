'use client';

/**
 * EmbeddedChart — compact chart embedded in the company/stock page.
 *
 * Shows a lightweight-charts v5 candlestick + volume chart with:
 *  - Range/timeframe quick selector
 *  - "Open full chart" button that triggers fullscreen mode via Zustand
 *  - All tools, indicators, and layouts available in fullscreen mode
 *
 * This replaces the previous recharts-based ChartSection.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useChartStore } from './store/useChartStore';
import { ChartEngine }   from './core/ChartEngine';
import { PaneManager }   from './core/PaneManager';
import { SeriesManager } from './core/SeriesManager';
import { useChartData }  from './data/useChartData';
import { INDICATOR_REGISTRY } from './indicators/registry';
import type { IndicatorBase }  from './indicators/IndicatorBase';
import { DARK_THEME, LIGHT_THEME } from './core/types';
import type { Timeframe } from './core/types';
import { Loader2 } from 'lucide-react';

const QUICK_RANGES: { label: string; tf: Timeframe }[] = [
  { label: '1D',  tf: '1D' },
  { label: '1W',  tf: '1W' },
  { label: '1M',  tf: '1M' },
];

const QUICK_PERIODS: { label: string; days: number; tf: Timeframe }[] = [
  { label: '1m',  days: 30,   tf: '1D' },
  { label: '3m',  days: 90,   tf: '1D' },
  { label: '6m',  days: 180,  tf: '1D' },
  { label: '1y',  days: 365,  tf: '1D' },
  { label: '3y',  days: 1095, tf: '1D' },
  { label: '5y',  days: 1825, tf: '1D' },
];

interface EmbeddedChartProps {
  symbol:        string;
  currentPrice?: number | null;
  priceChange?:  number | null;
}

export function EmbeddedChart({ symbol, currentPrice, priceChange }: EmbeddedChartProps) {
  const canvasRef  = useRef<HTMLDivElement>(null);
  const engineRef  = useRef<ChartEngine>(new ChartEngine());
  const pmRef      = useRef<PaneManager | null>(null);
  const smRef      = useRef<SeriesManager | null>(null);
  const activeInds = useRef<Map<string, IndicatorBase>>(new Map());
  const router = useRouter();

  const { setSymbol, indicators, isDark, timeframe, setTimeframe, chartType, toggleFullscreen } = useChartStore();
  const [selectedPeriod, setSelectedPeriod] = useState('1y');

  const { bars, loading, error } = useChartData(symbol, timeframe);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  // Sync symbol into the store
  useEffect(() => {
    setSymbol(symbol);
  }, [symbol, setSymbol]);

  // ── Init engine ────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const engine = engineRef.current;
    const chart  = engine.init(container, isDark);
    pmRef.current = new PaneManager(chart);
    smRef.current = new SeriesManager(chart);

    return () => {
      engine.destroy();
      pmRef.current = null;
      smRef.current = null;
      activeInds.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Apply theme ────────────────────────────────────────────────────────────
  useEffect(() => {
    engineRef.current.applyTheme(isDark);
  }, [isDark]);

  // ── Render series ──────────────────────────────────────────────────────────
  useEffect(() => {
    const sm     = smRef.current;
    const pm     = pmRef.current;
    const engine = engineRef.current;
    if (!sm || !pm || !engine.isInitialised || bars.length === 0) return;

    const th = isDark ? DARK_THEME : LIGHT_THEME;

    sm.remove('main');
    sm.remove('volume');

    if (chartType === 'candlestick') {
      sm.addCandlestick('main', th, 0, {
        upColor: th.upColor,
        downColor: th.downColor,
        borderUpColor: th.upColor,
        borderDownColor: th.downColor,
        wickUpColor: th.upColor,
        wickDownColor: th.downColor,
      });
    } else if (chartType === 'ohlc') {
      sm.addOhlc('main', th, 0, {
        upColor: th.upColor,
        downColor: th.downColor,
      });
    } else if (chartType === 'line') {
      sm.addLine('main', 0, { color: th.upColor, lineWidth: 2, priceLineVisible: false, lastValueVisible: true });
    } else {
      sm.addArea('main', 0, {
        lineColor: th.upColor, topColor: `${th.upColor}33`,
        bottomColor: 'transparent', lineWidth: 2, priceLineVisible: false, lastValueVisible: true
      });
    }
    sm.setOHLCVData('main', bars);

    // Volume (overlay on pane 0 for embedded)
    sm.addHistogram('volume', 0, {
      priceLineVisible: false,
      lastValueVisible: false,
      priceScaleId: 'volume',
    });
    engine.api.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });
    sm.setVolumeData('volume', bars, th.volumeUpColor, th.volumeDownColor);

    // Clip to selected period
    if (selectedPeriod !== 'all') {
      const p = QUICK_PERIODS.find(p => p.label === selectedPeriod);
      if (p) {
        const cutoffTime = Math.floor(Date.now() / 1000) - p.days * 86400;
        const visibleBars = bars.filter(b => b.time >= cutoffTime);
        if (visibleBars.length > 1) {
          engineRef.current.api.timeScale().setVisibleRange({
            from: visibleBars[0].time   as unknown as import('lightweight-charts').Time,
            to:   visibleBars[visibleBars.length - 1].time as unknown as import('lightweight-charts').Time,
          });
        }
      }
    } else {
      engine.fitContent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bars, chartType, isDark, selectedPeriod]);

  // ── Sync indicators ────────────────────────────────────────────────────────
  useEffect(() => {
    const sm = smRef.current;
    const pm = pmRef.current;
    if (!sm || !pm) return;
    const th  = isDark ? DARK_THEME : LIGHT_THEME;
    const ids = new Set(indicators.map(c => c.id));

    activeInds.current.forEach((ind, id) => {
      if (!ids.has(id)) { ind.detach(); activeInds.current.delete(id); }
    });

    indicators.forEach(config => {
      if (!activeInds.current.has(config.id)) {
        try {
          const ind = INDICATOR_REGISTRY.create(config);
          ind.attach(sm, pm, th);
          if (bars.length > 0) ind.updateData(bars);
          activeInds.current.set(config.id, ind);
        } catch (e) {
          console.warn('Indicator attach failed:', e);
        }
      }
    });

    if (bars.length > 0) {
      activeInds.current.forEach(ind => ind.updateData(bars));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicators, bars, isDark]);

  // ── Period selector handler ────────────────────────────────────────────────
  const handlePeriodSelect = useCallback((period: string) => {
    setSelectedPeriod(period);
    const p = QUICK_PERIODS.find(p => p.label === period);
    if (p && timeframe !== p.tf) setTimeframe(p.tf);
  }, [timeframe, setTimeframe]);

  const handleOpenFullChart = () => {
    router.push(`/stocks/${symbol}/chart`);
  };

  const isPos = (priceChange ?? 0) > 0;
  const isNeg = (priceChange ?? 0) < 0;

  return (
    <section id="chart" className="scroll-mt-28 space-y-0">
      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Price Chart</h2>
            {currentPrice != null && (
              <div className="flex items-center gap-2">
                <span className="text-base font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                  ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {priceChange != null && (
                  <span className={`text-xs font-semibold font-mono ${isPos ? 'text-emerald-500' : isNeg ? 'text-rose-500' : 'text-muted-foreground'}`}>
                    {isPos ? '+' : ''}{priceChange.toFixed(2)}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Period selector */}
            <div className="flex bg-muted/20 p-0.5 rounded-lg border border-border">
              {QUICK_PERIODS.map(p => (
                <button
                  key={p.label}
                  onClick={() => handlePeriodSelect(p.label)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPeriod === p.label
                      ? 'bg-background shadow-sm text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Full chart button */}
            <button
              onClick={handleOpenFullChart}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-amber-500/50 transition-all"
              title="Toggle fullscreen mode"
            >
              <Maximize2 size={12} />
              Fullscreen
            </button>
          </div>
        </div>

        {/* Chart canvas */}
        <div className="relative" style={{ height: 360 }}>
          <div ref={canvasRef} className="w-full h-full" />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
              <Loader2 size={24} className="animate-spin text-amber-500" />
            </div>
          )}

          {error && !loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <p className="text-xs text-rose-400">Failed to load chart: {error}</p>
            </div>
          )}

          {!loading && bars.length === 0 && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No price data available</p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2 border-t flex items-center justify-end" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={handleOpenFullChart}
            className="text-[10px] text-amber-500 hover:text-amber-400 font-medium transition-colors"
          >
            Open full charting mode →
          </button>
        </div>
      </div>
    </section>
  );
}
