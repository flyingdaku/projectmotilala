import { BaseRepository } from "./base";
import type { StockSummary } from "../types";

export type DbAsset = {
    id: string; nse_symbol: string | null; bse_code: string | null;
    isin: string | null; name: string; sector: string | null;
    industry_group: string | null; industry: string | null;
    sub_industry: string | null; screener_sector_code: string | null;
    screener_industry_group_code: string | null;
    screener_industry_code: string | null; screener_sub_industry_code: string | null;
    msi_sector: string | null; msi_industry_group: string | null;
    msi_group_rank: number | null; listing_date: string | null;
    nse_listed: number; bse_listed: number; is_active: number;
    website_url: string | null; face_value: number | null;
    management_json: string | null; description: string | null;
};

export class AssetRepository extends BaseRepository {
    public resolveAsset(symbol: string): DbAsset | null {
        const row = this.db.queryOne<DbAsset>(
            `SELECT id, nse_symbol, bse_code, isin, name, sector, industry_group,
                industry, sub_industry, screener_sector_code, screener_industry_group_code, screener_industry_code,
                screener_sub_industry_code, msi_sector, msi_industry_group, msi_group_rank,
                listing_date, nse_listed, bse_listed, is_active,
                website_url, face_value, management_json, description
             FROM assets
             WHERE (nse_symbol = ? OR bse_code = ?) AND is_active = 1
             LIMIT 1`,
            [symbol, symbol]
        );
        return row ?? null;
    }

    public getById(id: string): Partial<DbAsset> | null {
        const row = this.db.queryOne<DbAsset>(
            `SELECT id, nse_symbol, bse_code, name, sector, description, website_url, listing_date, management_json, face_value FROM assets WHERE id = ?`,
            [id]
        );
        return row ?? null;
    }

    public search(query: string, limit: number = 10): StockSummary[] {
        const q = `%${query.toLowerCase()}%`;
        const rows = this.db.queryAll<{
            id: string; nse_symbol: string | null; bse_code: string | null;
            name: string; sector: string | null; industry: string | null;
            isin: string | null;
        }>(
            `SELECT id, nse_symbol, bse_code, name, sector, industry, isin
             FROM assets WHERE is_active = 1 AND (
               LOWER(nse_symbol) LIKE ? OR LOWER(name) LIKE ? OR bse_code LIKE ?
             ) ORDER BY
               CASE WHEN LOWER(nse_symbol) = LOWER(?) THEN 0
                    WHEN LOWER(nse_symbol) LIKE LOWER(?) || '%' THEN 1
                    ELSE 2 END, name LIMIT ?`,
            [q, q, q, query, query, limit * 2] // Get extra for deduplication
        );

        const seen = new Set<string>();
        const results: StockSummary[] = [];

        for (const r of rows) {
            const symbol = r.nse_symbol ?? r.bse_code ?? "";
            if (!symbol || seen.has(symbol)) continue;
            seen.add(symbol);

            results.push({
                id: r.id as unknown as number,
                symbol,
                name: r.name,
                exchange: r.nse_symbol ? "NSE" : "BSE",
                sector: r.sector ?? undefined,
                industry: r.industry ?? undefined,
                isin: r.isin ?? undefined,
                assetClass: "EQUITY",
            });

            if (results.length >= limit) break;
        }

        return results;
    }

    public getPeersBase(asset: DbAsset): { id: string, nse_symbol: string | null, bse_code: string | null, name: string, face_value: number | null }[] {
        const candidates: Array<{ field: string; value: string | null }> = [
            { field: "screener_sub_industry_code", value: asset.screener_sub_industry_code },
            { field: "screener_industry_code", value: asset.screener_industry_code },
            { field: "screener_industry_group_code", value: asset.screener_industry_group_code },
            { field: "screener_sector_code", value: asset.screener_sector_code },
            { field: "sub_industry", value: asset.sub_industry },
            { field: "industry", value: asset.industry },
            { field: "industry_group", value: asset.industry_group },
            { field: "sector", value: asset.sector },
            { field: "msi_industry_group", value: asset.msi_industry_group },
            { field: "msi_sector", value: asset.msi_sector },
        ];

        for (const candidate of candidates) {
            if (!candidate.value || String(candidate.value).trim().length === 0) continue;
            const peers = this.db.queryAll<{
                id: string; nse_symbol: string | null; bse_code: string | null; name: string;
                face_value: number | null;
            }>(
                `SELECT id, nse_symbol, bse_code, name, face_value FROM assets
                 WHERE ${candidate.field} = ? AND id != ? AND is_active = 1
                 ORDER BY name LIMIT 20`,
                [candidate.value, asset.id]
            );
            if (peers.length > 0) return peers;
        }

        return [];
    }
}
