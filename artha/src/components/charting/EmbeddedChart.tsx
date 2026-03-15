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

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Maximize2, Lock, LockOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useChartStore } from './store/useChartStore';
import { ChartEngine }   from './core/ChartEngine';
import { PaneManager }   from './core/PaneManager';
import { SeriesManager } from './core/SeriesManager';
import { useChartData }  from './data/useChartData';
import { INDICATOR_REGISTRY } from './indicators/registry';
import type { IndicatorBase }  from './indicators/IndicatorBase';
import { getChartTheme } from './core/types';
import type { Timeframe } from './core/types';
import { Loader2 } from 'lucide-react';
import { buildDataMeta } from '@/lib/stock/presentation';
import { DataMetaInline } from '@/components/stock/StockUiPrimitives';
import { formatCurrency, formatDateLabel, formatSignedChange } from '@/lib/utils/formatters';
import { useTheme } from '@/contexts/theme-context';

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

  const { setSymbol, indicators, isDark, timeframe, setTimeframe, chartType } = useChartStore();
  const { appearance } = useTheme();
  const initialThemeRef = useRef(getChartTheme(isDark ? 'dark' : 'light', appearance.chartContrast));
  const [selectedPeriod, setSelectedPeriod] = useState('1y');
  const [isChartLocked, setIsChartLocked] = useState(true);

  const { bars, loading, error } = useChartData(symbol, timeframe);

  const selectedWindowBars = useMemo(() => {
    if (bars.length === 0) return [];
    const config = QUICK_PERIODS.find((period) => period.label === selectedPeriod);
    if (!config) return bars;
    const anchorTime = bars[bars.length - 1]?.time ?? 0;
    const cutoffTime = anchorTime - config.days * 86400;
    const visible = bars.filter((bar) => bar.time >= cutoffTime);
    return visible.length > 1 ? visible : bars;
  }, [bars, selectedPeriod]);

  const periodReturn = useMemo(() => {
    if (selectedWindowBars.length < 2) return null;
    const start = selectedWindowBars[0];
    const end = selectedWindowBars[selectedWindowBars.length - 1];
    if (!start?.open) return null;
    return ((end.close - start.open) / start.open) * 100;
  }, [selectedWindowBars]);

  const chartMeta = useMemo(() => buildDataMeta({
    asOf: selectedWindowBars[selectedWindowBars.length - 1]
      ? new Date(selectedWindowBars[selectedWindowBars.length - 1].time * 1000).toISOString()
      : null,
    coverage: selectedWindowBars.length > 1 ? 1 : 0,
    status: selectedWindowBars.length > 1 ? 'delayed' : 'unavailable',
    note: selectedWindowBars.length > 0 ? `${selectedWindowBars.length} sessions in view` : 'No price history loaded',
  }), [selectedWindowBars]);

  const chartTheme = useMemo(
    () => getChartTheme(isDark ? 'dark' : 'light', appearance.chartContrast),
    [appearance.chartContrast, isDark]
  );

  // Sync symbol into the store
  useEffect(() => {
    setSymbol(symbol);
  }, [symbol, setSymbol]);

  // ── Init engine ────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const engine = engineRef.current;
    const indicatorRegistry = activeInds.current;
    const chart  = engine.init(container, initialThemeRef.current);
    pmRef.current = new PaneManager(chart);
    smRef.current = new SeriesManager(chart);

    return () => {
      engine.destroy();
      pmRef.current = null;
      smRef.current = null;
      indicatorRegistry.clear();
    };
  }, []);

  // ── Apply chart lock/unlock ────────────────────────────────────────────────
  useEffect(() => {
    const chart = engineRef.current.api;
    if (!chart) return;
    chart.applyOptions({
      handleScroll: !isChartLocked,
      handleScale: !isChartLocked,
    });
  }, [isChartLocked]);

  // ── Apply theme ────────────────────────────────────────────────────────────
  useEffect(() => {
    engineRef.current.applyTheme(chartTheme);
  }, [chartTheme]);

  // ── Render series ──────────────────────────────────────────────────────────
  useEffect(() => {
    const sm     = smRef.current;
    const pm     = pmRef.current;
    const engine = engineRef.current;
    if (!sm || !pm || !engine.isInitialised || bars.length === 0) return;

    const th = chartTheme;

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
        lineColor: isDark ? '#3B82F6' : '#4338CA',
        topColor: th.areaFillColor,
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
  }, [bars, chartTheme, chartType, isDark, selectedPeriod]);

  // ── Sync indicators ────────────────────────────────────────────────────────
  useEffect(() => {
    const sm = smRef.current;
    const pm = pmRef.current;
    if (!sm || !pm) return;
    const th  = chartTheme;
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
  }, [bars, chartTheme, indicators]);

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
      <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: 'color-mix(in srgb, var(--surface) 96%, transparent)', borderColor: 'var(--border)' }}>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Price Chart</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="metric-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {currentPrice != null ? formatCurrency(currentPrice) : 'Unavailable'}
                </span>
                <span
                  className="metric-mono rounded-full px-2 py-0.5"
                  style={{
                    background: isPos ? 'var(--bull-tint)' : isNeg ? 'var(--bear-tint)' : 'var(--bg-hover)',
                    color: isPos ? 'var(--bull-strong)' : isNeg ? 'var(--bear-strong)' : 'var(--text-secondary)',
                  }}
                >
                  {priceChange != null ? formatSignedChange(priceChange, 2, '%') : 'Flat'}
                </span>
                {periodReturn != null ? (
                  <span style={{ color: periodReturn >= 0 ? 'var(--bull-strong)' : 'var(--bear-strong)' }}>
                    {selectedPeriod.toUpperCase()} return {formatSignedChange(periodReturn, 2, '%')}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex rounded-xl border border-border bg-muted/20 p-0.5">
              {QUICK_PERIODS.map(p => (
                <button
                  key={p.label}
                  onClick={() => handlePeriodSelect(p.label)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedPeriod === p.label
                      ? 'bg-background shadow-sm text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Lock/Unlock toggle */}
            <button
              onClick={() => setIsChartLocked(!isChartLocked)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                isChartLocked
                  ? 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  : 'border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--brand-tint)] hover:opacity-90'
              }`}
              title={isChartLocked ? 'Chart locked (click to unlock zoom/scroll)' : 'Chart unlocked (click to lock)'}
            >
              {isChartLocked ? <Lock size={12} /> : <LockOpen size={12} />}
            </button>

            {/* Full chart button */}
            <button
              onClick={handleOpenFullChart}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-[var(--brand-primary)] transition-all"
              title="Toggle fullscreen mode"
            >
              <Maximize2 size={12} />
              Open Full Chart
            </button>
          </div>
        </div>

        {/* Chart canvas */}
        <div className="relative" style={{ height: 400 }}>
          <div ref={canvasRef} className="w-full h-full" />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
              <Loader2 size={24} className="animate-spin text-[var(--brand-primary)]" />
            </div>
          )}

          {error && !loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <p className="text-xs text-[var(--bear-strong)]">Failed to load chart: {error}</p>
            </div>
          )}

          {!loading && bars.length === 0 && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No price data available</p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: 'var(--border)' }}>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {selectedWindowBars.length > 1
              ? `Viewing ${selectedPeriod.toUpperCase()} window through ${formatDateLabel(chartMeta.asOf ?? undefined)}.`
              : 'Review long-range structure here first. Switch to fullscreen only for indicators, drawings, and intraday work.'}
          </div>
          <button
            onClick={handleOpenFullChart}
            className="text-[11px] font-medium transition-colors"
            style={{ color: 'var(--brand-primary)' }}
          >
            Open full charting mode →
          </button>
        </div>
      </div>
    </section>
  );
}
