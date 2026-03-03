/**
 * Indicator Registry — extensible map of indicator type → factory function.
 *
 * Adding a new indicator:
 *  1. Create a class extending IndicatorBase in overlays/ or subpane/
 *  2. Register it here with INDICATOR_REGISTRY.register(TYPE, factory, meta)
 *  3. No other files need to change (Open/Closed Principle)
 */

import type { IndicatorConfig } from '../core/types';
import type { IndicatorBase } from './IndicatorBase';
import { createSMA }        from './overlays/SMA';
import { createEMA }        from './overlays/EMA';
import { createBB }         from './overlays/BollingerBands';
import { createVWAP }       from './overlays/VWAP';
import { createRSI }        from './subpane/RSI';
import { createMACD }       from './subpane/MACD';
import { createStochastic } from './subpane/Stochastic';
import { createATR }        from './subpane/ATR';
import { createOBV }        from './subpane/OBV';
import { createCCI }        from './subpane/CCI';

// ── Meta ───────────────────────────────────────────────────────────────────────

export type IndicatorCategory = 'overlay' | 'subpane';

export interface IndicatorMeta {
  type: string;
  label: string;
  description: string;
  category: IndicatorCategory;
  group: string;
  defaultParams: Record<string, number | string | boolean>;
  defaultColor: string;
}

export type IndicatorFactory = (config: IndicatorConfig) => IndicatorBase;

export interface RegistryEntry {
  factory:  IndicatorFactory;
  meta:     IndicatorMeta;
}

// ── Registry class ─────────────────────────────────────────────────────────────

class IndicatorRegistryClass {
  private _entries: Map<string, RegistryEntry> = new Map();

  register(factory: IndicatorFactory, meta: IndicatorMeta): void {
    this._entries.set(meta.type, { factory, meta });
  }

  create(config: IndicatorConfig): IndicatorBase {
    const entry = this._entries.get(config.type);
    if (!entry) throw new Error(`Unknown indicator type: ${config.type}`);
    return entry.factory(config);
  }

  getMeta(type: string): IndicatorMeta | undefined {
    return this._entries.get(type)?.meta;
  }

  /** All registered indicator meta sorted by group then label. */
  getAllMeta(): IndicatorMeta[] {
    return Array.from(this._entries.values())
      .map(e => e.meta)
      .sort((a, b) => a.group.localeCompare(b.group) || a.label.localeCompare(b.label));
  }

  /** All meta filtered by category. */
  getByCategory(category: IndicatorCategory): IndicatorMeta[] {
    return this.getAllMeta().filter(m => m.category === category);
  }
}

export const INDICATOR_REGISTRY = new IndicatorRegistryClass();

// ── Built-in registrations ────────────────────────────────────────────────────

INDICATOR_REGISTRY.register(createSMA, {
  type: 'SMA', label: 'Simple Moving Average', category: 'overlay',
  group: 'Moving Averages', description: 'Arithmetic mean of closing prices over N bars.',
  defaultParams: { period: 20 }, defaultColor: '#F59E0B',
});

INDICATOR_REGISTRY.register(createEMA, {
  type: 'EMA', label: 'Exponential Moving Average', category: 'overlay',
  group: 'Moving Averages', description: 'Exponentially weighted moving average, more weight on recent bars.',
  defaultParams: { period: 20 }, defaultColor: '#3B82F6',
});

INDICATOR_REGISTRY.register(createBB, {
  type: 'BB', label: 'Bollinger Bands', category: 'overlay',
  group: 'Volatility', description: 'Price bands 2 standard deviations above/below a moving average.',
  defaultParams: { period: 20, mult: 2 }, defaultColor: '#8B5CF6',
});

INDICATOR_REGISTRY.register(createVWAP, {
  type: 'VWAP', label: 'VWAP', category: 'overlay',
  group: 'Volume', description: 'Volume-weighted average price since session start.',
  defaultParams: {}, defaultColor: '#EC4899',
});

INDICATOR_REGISTRY.register(createRSI, {
  type: 'RSI', label: 'Relative Strength Index', category: 'subpane',
  group: 'Oscillators', description: 'Momentum oscillator measuring speed and change of price movements (0–100).',
  defaultParams: { period: 14 }, defaultColor: '#F59E0B',
});

INDICATOR_REGISTRY.register(createMACD, {
  type: 'MACD', label: 'MACD', category: 'subpane',
  group: 'Trend', description: 'Moving Average Convergence/Divergence — trend following momentum indicator.',
  defaultParams: { fast: 12, slow: 26, signal: 9 }, defaultColor: '#3B82F6',
});

INDICATOR_REGISTRY.register(createStochastic, {
  type: 'STOCH', label: 'Stochastic Oscillator', category: 'subpane',
  group: 'Oscillators', description: 'Compares closing price to price range over N periods (0–100).',
  defaultParams: { k: 14, d: 3 }, defaultColor: '#3B82F6',
});

INDICATOR_REGISTRY.register(createATR, {
  type: 'ATR', label: 'Average True Range', category: 'subpane',
  group: 'Volatility', description: 'Measures market volatility as the average true range over N periods.',
  defaultParams: { period: 14 }, defaultColor: '#A78BFA',
});

INDICATOR_REGISTRY.register(createOBV, {
  type: 'OBV', label: 'On Balance Volume', category: 'subpane',
  group: 'Volume', description: 'Cumulative volume momentum indicator.',
  defaultParams: {}, defaultColor: '#06B6D4',
});

INDICATOR_REGISTRY.register(createCCI, {
  type: 'CCI', label: 'Commodity Channel Index', category: 'subpane',
  group: 'Oscillators', description: 'Measures deviation of price from its average — identifies overbought/oversold.',
  defaultParams: { period: 20 }, defaultColor: '#F97316',
});
