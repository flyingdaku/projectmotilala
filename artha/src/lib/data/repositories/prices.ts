import { BaseRepository } from "./base";
import type { PriceBar } from "../types";

export class PriceRepository extends BaseRepository {
    public getLatestPrice(assetId: string): { close: number; date: string; pct_change: number } | null {
        // Get last 2 prices to compute 1d change
        const rows = this.db.queryAll<{ close: number; date: string; open: number }>(
            `SELECT close, open, date FROM daily_prices
             WHERE asset_id = ? AND source_exchange IN ('NSE','BSE')
             ORDER BY date DESC, source_exchange ASC
             LIMIT 2`,
            [assetId]
        );
        if (!rows.length) return null;
        const latest = rows[0];
        const prev = rows[1];
        const pct_change = prev
            ? +((((latest.close - prev.close) / prev.close) * 100).toFixed(2))
            : 0;
        return { close: latest.close, date: latest.date, pct_change };
    }

    public get52wRange(assetId: string): { high52w: number | null; low52w: number | null } {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 1);
        const from = cutoff.toISOString().split("T")[0];
        const row = this.db.queryOne<{ high52w: number; low52w: number }>(
            `SELECT MAX(high) as high52w, MIN(low) as low52w FROM daily_prices
             WHERE asset_id = ? AND date >= ? AND source_exchange IN ('NSE','BSE')`,
            [assetId, from]
        );
        return row ?? { high52w: null, low52w: null };
    }

    public getPrices(assetId: string, startDate: string, endDate: string): PriceBar[] {
        type PriceRow = { date: string; open: number; high: number; low: number; close: number; volume: number; source_exchange: string;[key: string]: unknown };
        const rows = this.db.queryAll<PriceRow>(
            `SELECT date, open, high, low, close, volume, source_exchange
             FROM daily_prices
             WHERE asset_id = ? AND date >= ? AND date <= ?
             ORDER BY date ASC`,
            [assetId, startDate, endDate]
        );

        // Deduplicate by date — prefer NSE, fallback BSE
        const byDate = new Map<string, PriceRow>();
        for (const r of rows) {
            const existing = byDate.get(r.date);
            if (!existing || r.source_exchange === "NSE") byDate.set(r.date, r);
        }
        return [...byDate.values()].map(r => ({
            date: r.date, open: r.open, high: r.high,
            low: r.low, close: r.close, volume: r.volume,
        }));
    }

    public getRecentVolume(assetId: string): { volume: number; avg_volume: number } | null {
        const volRow = this.db.queryOne<{ volume: number; avg_volume: number }>(
            `SELECT p.volume,
                  (SELECT AVG(p2.volume) FROM daily_prices p2
                   WHERE p2.asset_id = p.asset_id AND p2.date >= date('now','-30 days')
                   AND p2.source_exchange = p.source_exchange) as avg_volume
             FROM daily_prices p
             WHERE p.asset_id = ? AND p.source_exchange IN ('NSE','BSE')
             ORDER BY p.date DESC LIMIT 1`,
            [assetId]
        );
        return volRow ?? null;
    }
}
