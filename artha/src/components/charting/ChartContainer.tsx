'use client';

/**
 * ChartContainer — the full-screen capable charting shell.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────┐
 *   │  TopBar                                         │
 *   ├─────┬───────────────────────────────────────────┤
 *   │ DT  │  Chart Canvas     │  Layout Panel (opt.)  │
 *   │ ool │                   │                       │
 *   │ bar │  DataWindow       │                       │
 *   └─────┴───────────────────┴───────────────────────┘
 *
 * When isFullscreen=true the whole shell is portal'd to a fixed overlay.
 */

import { useEffect, useRef, useCallback, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useChartStore } from './store/useChartStore';
import { ChartEngine }    from './core/ChartEngine';
import { PaneManager }    from './core/PaneManager';
import { SeriesManager }  from './core/SeriesManager';
import { DrawingManager } from './drawings/DrawingManager';
import { useChartData }   from './data/useChartData';
import { INDICATOR_REGISTRY } from './indicators/registry';
import type { IndicatorBase }  from './indicators/IndicatorBase';
import { TopBar }             from './widgets/TopBar';
import { DrawingToolbar }     from './widgets/DrawingToolbar';
import { DataWindow }         from './widgets/DataWindow';
import { IndicatorDialog }    from './widgets/IndicatorDialog';
import { LayoutPanel }        from './widgets/LayoutPanel';
import { WatchlistPanel }     from './widgets/WatchlistPanel';
import { DEFAULT_WATCHLIST_CONFIG } from './widgets/WatchlistPanel';
import { getWatchlistPanelWidth } from './widgets/WatchlistPanel';
import type { WatchlistConfig } from './widgets/WatchlistPanel';
import type { CrosshairData, OHLCVBar } from './core/types';
import { DARK_THEME, LIGHT_THEME } from './core/types';
import { Loader2, X } from 'lucide-react';

interface ChartContainerProps {
  symbol: string;
  currentPrice?: number | null;
  priceChange?:  number | null;
  /** If false, renders inline (not fullscreen). */
  fullscreenMode?: boolean;
}

/**
 * Inner chart content — decoupled so it can be rendered
 * both inside the page and inside a portal.
 */
function ChartContent({
  symbol,
  currentPrice,
  priceChange,
  fullscreenMode = false,
}: ChartContainerProps) {
  const canvasRef   = useRef<HTMLDivElement>(null);
  const engineRef   = useRef<ChartEngine>(new ChartEngine());
  const pmRef       = useRef<PaneManager | null>(null);
  const smRef       = useRef<SeriesManager | null>(null);
  const dmRef       = useRef<DrawingManager | null>(null);
  const activeInds  = useRef<Map<string, IndicatorBase>>(new Map());

  const [showIndDialog, setShowIndDialog] = useState(false);
  const [crosshair, setCrosshair]         = useState<CrosshairData | null>(null);
  const [paneRects, setPaneRects]         = useState<Array<{ id: string; index: number; top: number; height: number; indicators: string[] }>>([]);
  const [watchlistConfig, setWatchlistConfig] = useState<WatchlistConfig>(DEFAULT_WATCHLIST_CONFIG);

  const {
    timeframe, chartType, isDark, indicators, drawings,
    activeTool, addDrawing, updateDrawing, removeDrawing,
    showDataWindow, showLayoutPanel, showWatchlist,
    removeIndicator,
  } = useChartStore();

  const { bars, loading, error } = useChartData(symbol, timeframe);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  const watchlistWidth = showWatchlist ? getWatchlistPanelWidth(watchlistConfig) : 0;

  // ── 1. Initialise chart engine ────────────────────────────────────────────

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const engine = engineRef.current;
    const chart  = engine.init(container, isDark);

    pmRef.current = new PaneManager(chart);
    smRef.current = new SeriesManager(chart);

    // Subscribe to crosshair
    const unsub = engine.subscribeCrosshair((data: CrosshairData) => {
      setCrosshair(data);
    });

    return () => {
      unsub();
      dmRef.current?.destroy();
      dmRef.current = null;
      engine.destroy();
      pmRef.current  = null;
      smRef.current  = null;
      activeInds.current.clear();
    };
    // Only re-init on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 2. Apply theme changes ────────────────────────────────────────────────

  useEffect(() => {
    engineRef.current.applyTheme(isDark);
  }, [isDark]);

  // ── 3. Render main series when bars or chart type changes ─────────────────

  useEffect(() => {
    const sm = smRef.current;
    const engine = engineRef.current;
    if (!sm || !engine.isInitialised || bars.length === 0) return;

    // Remove old main series
    sm.remove('main');
    sm.remove('volume');

    const th = isDark ? DARK_THEME : LIGHT_THEME;

    // Add main series by chart type
    if (chartType === 'candlestick') {
      sm.addCandlestick('main', th, 0, {
        upColor: th.upColor,
        downColor: th.downColor,
        borderUpColor: th.upColor,
        borderDownColor: th.downColor,
        wickUpColor: th.upColor,
        wickDownColor: th.downColor,
      });
      sm.setOHLCVData('main', bars);
    } else if (chartType === 'ohlc') {
      sm.addOhlc('main', th, 0, {
        upColor: th.upColor,
        downColor: th.downColor,
      });
      sm.setOHLCVData('main', bars);
    } else if (chartType === 'line') {
      sm.addLine('main', 0, {
        color: theme.upColor, lineWidth: 2,
        priceLineVisible: false, lastValueVisible: true,
      });
      sm.setOHLCVData('main', bars);
    } else if (chartType === 'area') {
      sm.addArea('main', 0, {
        lineColor: theme.upColor, topColor: `${theme.upColor}33`,
        bottomColor: 'transparent', lineWidth: 2,
        priceLineVisible: false, lastValueVisible: true,
      });
      sm.setOHLCVData('main', bars);
    }

    // Volume overlay on main pane (TradingView style)
    sm.remove('volume');
    sm.addHistogram('volume', 0, {
      priceLineVisible: false,
      lastValueVisible: false,
      priceScaleId: 'volume', // Separate scale for volume
    });
    
    // Position volume at the bottom 10% of the chart
    engine.api.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.9, // Start at 90% down
        bottom: 0, // Go all the way to bottom
      },
    });
    
    sm.setVolumeData('volume', bars, th.volumeUpColor, th.volumeDownColor);

    engine.fitContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bars, chartType, isDark]);

  // ── 4. Init DrawingManager once after main series exists ──────────────────

  useEffect(() => {
    const sm = smRef.current;
    const engine = engineRef.current;
    const container = canvasRef.current;
    if (!sm || !engine.isInitialised || !container || dmRef.current) return;

    const mainSeries = sm.get('main');
    if (!mainSeries) return;

    dmRef.current = new DrawingManager(
      engine.api,
      mainSeries.api,
      container,
      (d) => addDrawing(d),
      (id, patch) => updateDrawing(id, patch),
      (id) => removeDrawing(id),
    );

    // Restore existing drawings from store
    if (drawings.length > 0) {
      dmRef.current.restoreDrawings(drawings);
    }
    // Apply current tool
    if (activeTool) dmRef.current.setTool(activeTool);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bars.length > 0]);

  // ── 4a. Sync active drawing tool to DrawingManager ───────────────────────

  useEffect(() => {
    if (dmRef.current && activeTool !== null) {
      dmRef.current.setTool(activeTool);
    }
  }, [activeTool]);

  // ── 4b. Sync clear drawings ───────────────────────────────────────────────

  useEffect(() => {
    if (drawings.length === 0 && dmRef.current) {
      dmRef.current.clearAll();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawings.length]);

  // ── 5. Sync indicators (add new / remove deleted) ─────────────────────────

  useEffect(() => {
    const sm = smRef.current;
    const pm = pmRef.current;
    if (!sm || !pm) return;

    const th = isDark ? DARK_THEME : LIGHT_THEME;
    const currentIds = new Set(indicators.map(c => c.id));

    // Remove detached indicators
    activeInds.current.forEach((ind, id) => {
      if (!currentIds.has(id)) {
        ind.detach();
        activeInds.current.delete(id);
      }
    });

    // Add new indicators
    indicators.forEach(config => {
      if (!activeInds.current.has(config.id)) {
        try {
          const ind = INDICATOR_REGISTRY.create(config);
          ind.attach(sm, pm, th);
          if (bars.length > 0) ind.updateData(bars);
          activeInds.current.set(config.id, ind);
        } catch (e) {
          console.warn('Failed to attach indicator', config.type, e);
        }
      }
    });

    // Update data for all active indicators when bars change
    if (bars.length > 0) {
      activeInds.current.forEach(ind => ind.updateData(bars));
    }

    // Sync visibility
    indicators.forEach(config => {
      activeInds.current.get(config.id)?.setVisible(config.visible);
    });

    // We delay slightly to allow lightweight-charts to finish rendering panes
    setTimeout(() => {
      if (pmRef.current) {
        setPaneRects(pmRef.current.getPaneRects());
      }
    }, 50);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicators, bars, isDark]);

  // ── 5. Screenshot ────────────────────────────────────────────────────────

  const handleScreenshot = useCallback(async () => {
    const container = canvasRef.current;
    if (!container) return;
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(container, { useCORS: true, scale: 2 });
      const url    = canvas.toDataURL('image/png');
      const a      = document.createElement('a');
      a.href       = url;
      a.download   = `${symbol}_${timeframe}_chart.png`;
      a.click();
    } catch (e) {
      console.error('Screenshot failed', e);
    }
  }, [symbol, timeframe]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background" style={{ background: theme.background }}>
      {/* Top bar */}
      <TopBar
        symbol={symbol}
        currentPrice={currentPrice}
        priceChange={priceChange}
        onIndicatorsClick={() => setShowIndDialog(true)}
        onScreenshot={handleScreenshot}
        fullscreenMode={fullscreenMode}
        watchlistConfig={watchlistConfig}
        onWatchlistConfigChange={setWatchlistConfig}
      />
  
      {/* Body row */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Drawing toolbar */}
        <DrawingToolbar />

        {/* Chart canvas */}
        <div className="relative flex-1 min-w-0 min-h-0">
          <div ref={canvasRef} className="w-full h-full" />

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-20">
              <Loader2 size={28} className="animate-spin text-amber-500" />
            </div>
          )}

          {/* Error overlay */}
          {error && !loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
              <p className="text-sm text-rose-400">Failed to load chart data: {error}</p>
            </div>
          )}

          {/* Data window overlay - always visible */}
          <div className="pointer-events-none">
            <DataWindow
              bar={crosshair?.bar as OHLCVBar | null ?? null}
              seriesData={crosshair?.seriesData}
            />
          </div>

          {/* Sub-pane overlays (top right of each sub-pane) */}
          {paneRects.filter(p => p.index > 0).map(pane => {
            const paneIndicators = pane.indicators.map(id => activeInds.current.get(id)).filter(Boolean);
            if (paneIndicators.length === 0) return null;

            return (
              <div 
                key={pane.id}
                className="absolute right-2 z-10 flex items-center gap-4 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-border/50 text-[11px] font-mono"
                style={{ top: pane.top + 8 }}
              >
                {paneIndicators.map(ind => {
                  const entries = smRef.current?.getByIndicator(ind!.id) || [];
                  let valStr = '—';
                  if (crosshair?.seriesData) {
                    for (const entry of entries) {
                      const data = crosshair.seriesData.get(entry.api);
                      if (data && 'value' in data) {
                        valStr = (data.value as number).toFixed(2);
                        break;
                      }
                    }
                  }

                  return (
                    <div key={ind!.id} className="flex items-center gap-2 group">
                      <span className="font-bold text-foreground">{ind!.label}</span>
                      <span className="text-muted-foreground mr-1">{valStr}</span>
                      <button 
                        onClick={() => removeIndicator(ind!.id)}
                        className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Indicator"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Layout panel (collapsible) */}
        {showLayoutPanel && (
          <div className="w-56 border-l border-border flex-shrink-0 overflow-y-auto">
            <LayoutPanel symbol={symbol} />
          </div>
        )}

        {showWatchlist && <div className="flex-shrink-0" style={{ width: `${watchlistWidth}px` }} />}

        {/* Watchlist panel */}
        {showWatchlist && (
          <div className="absolute right-0 top-0 bottom-0 z-30 flex">
            <WatchlistPanel config={watchlistConfig} onConfigChange={setWatchlistConfig} />
          </div>
        )}
      </div>

      {/* Indicator dialog */}
      <IndicatorDialog open={showIndDialog} onClose={() => setShowIndDialog(false)} />
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

export function ChartContainer(props: ChartContainerProps) {
  const { fullscreenMode = false } = props;
  const { isFullscreen, toggleFullscreen } = useChartStore();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Keyboard shortcut: Escape closes fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen, toggleFullscreen]);

  if (mounted && ((isFullscreen && mounted) || fullscreenMode)) {
    return createPortal(
      <div className="fixed inset-0 z-[9997] flex flex-col bg-background">
        <ChartContent {...props} />
      </div>,
      document.body
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChartContent {...props} />
    </div>
  );
}
