'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChartContainer } from './ChartContainer';
import { cn } from '@/lib/utils';
import {
  getWorkspaceLayout,
  isWorkspaceLayout,
  WORKSPACE_LAYOUT_STORAGE_KEY,
  type WorkspaceLayout,
} from './workspace-layouts';
import { WorkspaceLayoutPicker } from './widgets/WorkspaceLayoutPicker';
import { TopBar } from './widgets/TopBar';
import { IndicatorDialog } from './widgets/IndicatorDialog';
import { DrawingToolbar } from './widgets/DrawingToolbar';
import {
  DEFAULT_WATCHLIST_CONFIG,
  WatchlistPanel as ChartWatchlistPanel,
  type WatchlistConfig,
} from './widgets/WatchlistPanel';
import { useChartStore } from './store/useChartStore';

interface MultiChartWorkspaceProps {
  symbol: string;
  initialLayout?: WorkspaceLayout;
}

export function MultiChartWorkspace({ symbol, initialLayout = 'single' }: MultiChartWorkspaceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [layout, setLayout] = useState<WorkspaceLayout>(initialLayout);
  const [showIndDialog, setShowIndDialog] = useState(false);
  const [watchlistConfig, setWatchlistConfig] = useState<WatchlistConfig>(DEFAULT_WATCHLIST_CONFIG);
  const showWatchlist = useChartStore((state) => state.showWatchlist);

  useEffect(() => {
    if (initialLayout !== 'single') return;
    const saved = globalThis.window?.localStorage.getItem(WORKSPACE_LAYOUT_STORAGE_KEY) as WorkspaceLayout | null;
    if (saved && isWorkspaceLayout(saved)) {
      setLayout(saved);
    }
  }, [initialLayout]);

  useEffect(() => {
    globalThis.window?.localStorage.setItem(WORKSPACE_LAYOUT_STORAGE_KEY, layout);
    const query = layout === 'single' ? '' : `?layout=${layout}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  }, [layout, pathname, router]);

  const activeLayout = useMemo(() => getWorkspaceLayout(layout), [layout]);

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)]">
      <TopBar
        symbol={symbol}
        onIndicatorsClick={() => setShowIndDialog(true)}
        workspaceMode
        multiChartMode
        watchlistConfig={watchlistConfig}
        onWatchlistConfigChange={setWatchlistConfig}
        extraControls={<WorkspaceLayoutPicker value={layout} onChange={setLayout} />}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden p-3">
        <DrawingToolbar />

        <div className="min-h-0 min-w-0 flex-1 pl-3">
          {activeLayout.panelCount === 1 ? (
            <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
              <ChartContainer symbol={symbol} minimalPanel />
            </div>
          ) : (
            <div className={cn('grid h-full min-h-0 gap-3', activeLayout.gridClassName)}>
              {activeLayout.cells.map((cell, index) => (
                <div
                  key={cell.key}
                  className={cn(
                    'relative min-h-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm',
                    cell.className
                  )}
                >
                  <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg-card)_82%,transparent)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-[var(--text-secondary)] backdrop-blur-sm">
                    PANEL {index + 1}
                  </div>
                  <ChartContainer symbol={symbol} minimalPanel />
                </div>
              ))}
            </div>
          )}
        </div>

        {showWatchlist ? (
          <div className="ml-3 flex min-h-0 flex-shrink-0 overflow-hidden">
            <ChartWatchlistPanel
              config={watchlistConfig}
              onConfigChange={setWatchlistConfig}
              onSymbolSelect={(nextSymbol) => {
                const query = layout === 'single' ? '' : `?layout=${layout}`;
                router.push(`/stocks/${encodeURIComponent(nextSymbol)}/chart${query}`);
              }}
            />
          </div>
        ) : null}
      </div>

      <IndicatorDialog open={showIndDialog} onClose={() => setShowIndDialog(false)} />
    </div>
  );
}
