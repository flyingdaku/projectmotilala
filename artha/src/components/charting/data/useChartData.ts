/**
 * useChartData — React hook that fetches OHLCV bars from the existing
 * /api/stocks/[symbol]/chart endpoint and returns them as OHLCVBar[].
 *
 * Maps the server's PriceBar (date string) to lightweight-charts time (Unix seconds).
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { OHLCVBar } from '../core/types';
import type { Timeframe } from '../core/types';

/** Intraday timeframes need a shorter date range; EOD uses the existing ranges. */
const TF_TO_RANGE: Record<Timeframe, string> = {
  '1m':  '5d',
  '5m':  '1m',
  '15m': '3m',
  '30m': '3m',
  '1h':  '6m',
  '4h':  '1y',
  '1D':  '3y',
  '1W':  '5y',
  '1M':  '10y',
};

function dateStrToUnix(dateStr: string): number {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

interface PriceBarRaw {
  date: string;
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume?: number | string | null;
}

function toFiniteNumber(value: number | string | null | undefined, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export interface UseChartDataResult {
  bars: OHLCVBar[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useChartData(symbol: string, timeframe: Timeframe): UseChartDataResult {
  const [bars, setBars]     = useState<OHLCVBar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [rev, setRev]       = useState(0);

  const refetch = useCallback(() => setRev(r => r + 1), []);

  useEffect(() => {
    if (!symbol) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    const range = TF_TO_RANGE[timeframe] ?? '3y';
    fetch(`/api/stocks/${encodeURIComponent(symbol)}/chart?range=${range}&tf=${timeframe}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { prices?: PriceBarRaw[]; error?: string }) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);

        const mapped: OHLCVBar[] = (data.prices ?? [])
          .map(p => ({
            time:   dateStrToUnix(p.date),
            open:   toFiniteNumber(p.open),
            high:   toFiniteNumber(p.high),
            low:    toFiniteNumber(p.low),
            close:  toFiniteNumber(p.close),
            volume: toFiniteNumber(p.volume, 0),
          }))
          // ascending by time (lwc requirement)
          .sort((a, b) => a.time - b.time);

        setBars(mapped);
      })
      .catch(e => {
        if (!cancelled) setError(String(e.message ?? e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [symbol, timeframe, rev]);

  return { bars, loading, error, refetch };
}
