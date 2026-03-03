'use client';

/**
 * DataWindow — OHLCV data overlay that appears at top-left,
 * updating as the crosshair moves. Always visible.
 */

import type { OHLCVBar } from '../core/types';
import { formatPrice, formatVolume } from '@/lib/utils/formatters';

interface DataWindowProps {
  bar: OHLCVBar | null;
  seriesData?: Map<any, any>;
}

export function DataWindow({ bar, seriesData }: DataWindowProps) {
  // Always show, even without bar data
  const hasBar = bar != null;

  // Get volume from seriesData if available
  let volume: number | null = null;
  if (seriesData) {
    for (const [api, data] of seriesData) {
      if (data && 'value' in data && typeof data.value === 'number') {
        // Assume this is the volume series for now
        volume = data.value;
        break;
      }
    }
  }

  const change = hasBar && bar.open > 0 ? ((bar.close - bar.open) / bar.open) * 100 : 0;
  const isPos = change > 0;
  const isNeg = change < 0;

  // Extract main series and volume if needed, but here we just show the bar
  return (
    <div className="absolute top-3 left-3 z-10 bg-white border border-border rounded-lg shadow-sm px-3 py-2 pointer-events-none">
      <div className="flex items-center gap-4 text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground">O</span>
          <span className="text-foreground">{hasBar ? formatPrice(bar.open) : '—'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground">H</span>
          <span className="text-foreground">{hasBar ? formatPrice(bar.high) : '—'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground">L</span>
          <span className="text-foreground">{hasBar ? formatPrice(bar.low) : '—'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground">C</span>
          <span className="text-foreground">{hasBar ? formatPrice(bar.close) : '—'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground">V</span>
          <span className="text-foreground">{volume !== null ? formatVolume(volume) : (hasBar ? formatVolume(bar.volume) : '—')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-muted-foreground">Chg</span>
          <span className={isPos ? 'text-emerald-500 font-semibold' : isNeg ? 'text-rose-500 font-semibold' : 'text-muted-foreground'}>
            {hasBar ? `${isPos ? '+' : ''}${change.toFixed(2)}%` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
