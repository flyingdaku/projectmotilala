/**
 * Charting DB layer — SQLite-backed persistence for chart layouts, drawings, and alerts.
 *
 * Uses the same DataAdapter pattern as the rest of the app.
 * For now this is a JSON-file-based store (no native sqlite3 dependency needed in
 * Next.js Edge/Node runtime). When migrating to Postgres/ClickHouse, swap out the
 * adapter implementation below — the interface stays unchanged.
 *
 * Storage: ~/.artha-chart-data/ (server-side, per user via userId key)
 * In production, replace with a proper DB client (e.g. Drizzle + Postgres).
 */

import fs from 'fs';
import path from 'path';
import type { LayoutState, DrawingData, ChartAlert } from '@/components/charting/core/types';

// ── Storage path ──────────────────────────────────────────────────────────────

function getStorageDir(): string {
  const dir = process.env.CHART_DATA_DIR
    ?? path.join(process.cwd(), '.chart-data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function userFile(userId: string, name: string): string {
  return path.join(getStorageDir(), `${userId}_${name}.json`);
}

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(file: string, data: unknown): void {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Interface ─────────────────────────────────────────────────────────────────

export interface IChartingDB {
  layouts: {
    list(userId: string): Promise<LayoutState[]>;
    get(userId: string, id: string): Promise<LayoutState | null>;
    save(userId: string, layout: LayoutState): Promise<LayoutState>;
    delete(userId: string, id: string): Promise<void>;
  };
  drawings: {
    get(userId: string, symbol: string, timeframe: string): Promise<DrawingData[]>;
    save(userId: string, symbol: string, timeframe: string, drawings: DrawingData[]): Promise<void>;
    clear(userId: string, symbol: string, timeframe: string): Promise<void>;
  };
  alerts: {
    list(userId: string, symbol?: string): Promise<ChartAlert[]>;
    upsert(userId: string, alert: ChartAlert): Promise<void>;
    delete(userId: string, id: string): Promise<void>;
  };
}

// ── JSON file adapter (dev / SQLite stand-in) ─────────────────────────────────

class JsonFileChartingDB implements IChartingDB {
  layouts = {
    async list(userId: string): Promise<LayoutState[]> {
      return readJSON<LayoutState[]>(userFile(userId, 'layouts'), []);
    },

    async get(userId: string, id: string): Promise<LayoutState | null> {
      const all = readJSON<LayoutState[]>(userFile(userId, 'layouts'), []);
      return all.find(l => l.id === id) ?? null;
    },

    async save(userId: string, layout: LayoutState): Promise<LayoutState> {
      const all = readJSON<LayoutState[]>(userFile(userId, 'layouts'), []);
      const now = new Date().toISOString();

      if (!layout.id) {
        layout.id = `layout_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      }
      layout.updatedAt = now;

      const idx = all.findIndex(l => l.id === layout.id);
      if (idx >= 0) {
        all[idx] = layout;
      } else {
        all.push(layout);
      }

      writeJSON(userFile(userId, 'layouts'), all);
      return layout;
    },

    async delete(userId: string, id: string): Promise<void> {
      const all = readJSON<LayoutState[]>(userFile(userId, 'layouts'), []);
      writeJSON(userFile(userId, 'layouts'), all.filter(l => l.id !== id));
    },
  };

  drawings = {
    async get(userId: string, symbol: string, timeframe: string): Promise<DrawingData[]> {
      const key = `drawings_${symbol}_${timeframe}`;
      const store = readJSON<Record<string, DrawingData[]>>(userFile(userId, 'drawings'), {});
      return store[key] ?? [];
    },

    async save(userId: string, symbol: string, timeframe: string, drawings: DrawingData[]): Promise<void> {
      const key = `drawings_${symbol}_${timeframe}`;
      const store = readJSON<Record<string, DrawingData[]>>(userFile(userId, 'drawings'), {});
      store[key] = drawings;
      writeJSON(userFile(userId, 'drawings'), store);
    },

    async clear(userId: string, symbol: string, timeframe: string): Promise<void> {
      const key = `drawings_${symbol}_${timeframe}`;
      const store = readJSON<Record<string, DrawingData[]>>(userFile(userId, 'drawings'), {});
      delete store[key];
      writeJSON(userFile(userId, 'drawings'), store);
    },
  };

  alerts = {
    async list(userId: string, symbol?: string): Promise<ChartAlert[]> {
      const all = readJSON<ChartAlert[]>(userFile(userId, 'alerts'), []);
      return symbol ? all.filter(a => a.symbol === symbol) : all;
    },

    async upsert(userId: string, alert: ChartAlert): Promise<void> {
      const all = readJSON<ChartAlert[]>(userFile(userId, 'alerts'), []);
      const idx = all.findIndex(a => a.id === alert.id);
      if (idx >= 0) {
        all[idx] = alert;
      } else {
        all.push(alert);
      }
      writeJSON(userFile(userId, 'alerts'), all);
    },

    async delete(userId: string, id: string): Promise<void> {
      const all = readJSON<ChartAlert[]>(userFile(userId, 'alerts'), []);
      writeJSON(userFile(userId, 'alerts'), all.filter(a => a.id !== id));
    },
  };
}

// ── Singleton ─────────────────────────────────────────────────────────────────

let _instance: IChartingDB | null = null;

export function getChartingDB(): IChartingDB {
  if (!_instance) _instance = new JsonFileChartingDB();
  return _instance;
}
