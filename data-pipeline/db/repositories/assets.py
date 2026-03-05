"""
Asset Repository — CRUD for the `assets` table.
"""
from __future__ import annotations

import logging
from typing import Optional, List

from core.db import DatabaseConnection, Repository, generate_id
from core.models import Asset

logger = logging.getLogger(__name__)


class AssetRepository(Repository[Asset]):
    """Read/write access to the assets table."""

    def upsert(self, asset: Asset) -> None:
        self._conn.execute(
            """INSERT INTO assets (
                id, isin, nse_symbol, bse_code, amfi_code, screener_id,
                name, asset_class, series,
                sector, industry_group, industry, sub_industry,
                screener_sector_code, screener_industry_group_code,
                screener_industry_code, screener_sub_industry_code,
                msi_sector, msi_industry_group, msi_group_rank,
                listing_date, delisting_date, is_active,
                nse_listed, bse_listed,
                face_value, website_url, description, management_json
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?,
                ?, ?,
                ?, ?, ?, ?
            )
            ON CONFLICT(id) DO UPDATE SET
                name = COALESCE(excluded.name, name),
                nse_symbol = COALESCE(excluded.nse_symbol, nse_symbol),
                bse_code = COALESCE(excluded.bse_code, bse_code),
                sector = COALESCE(excluded.sector, sector),
                industry_group = COALESCE(excluded.industry_group, industry_group),
                industry = COALESCE(excluded.industry, industry),
                sub_industry = COALESCE(excluded.sub_industry, sub_industry),
                is_active = excluded.is_active,
                nse_listed = MAX(excluded.nse_listed, nse_listed),
                bse_listed = MAX(excluded.bse_listed, bse_listed),
                face_value = COALESCE(excluded.face_value, face_value),
                website_url = COALESCE(excluded.website_url, website_url),
                description = COALESCE(excluded.description, description),
                management_json = COALESCE(excluded.management_json, management_json)
            """,
            (
                asset.id, asset.isin, asset.nse_symbol, asset.bse_code,
                asset.amfi_code, asset.screener_id,
                asset.name, asset.asset_class, asset.series,
                asset.sector, asset.industry_group, asset.industry, asset.sub_industry,
                asset.screener_sector_code, asset.screener_industry_group_code,
                asset.screener_industry_code, asset.screener_sub_industry_code,
                asset.msi_sector, asset.msi_industry_group, asset.msi_group_rank,
                asset.listing_date, asset.delisting_date, int(asset.is_active),
                int(asset.nse_listed), int(asset.bse_listed),
                asset.face_value, asset.website_url, asset.description, asset.management_json,
            ),
        )

    def upsert_batch(self, records: List[Asset]) -> int:
        for r in records:
            self.upsert(r)
        return len(records)

    def find_by_id(self, id: str) -> Optional[Asset]:
        row = self._conn.fetchone("SELECT * FROM assets WHERE id = ?", (id,))
        return self._row_to_asset(row) if row else None

    def find_by_symbol(self, symbol: str) -> Optional[Asset]:
        row = self._conn.fetchone(
            "SELECT * FROM assets WHERE (nse_symbol = ? OR bse_code = ?) AND is_active = 1 LIMIT 1",
            (symbol, symbol),
        )
        return self._row_to_asset(row) if row else None

    def find_by_isin(self, isin: str) -> Optional[Asset]:
        row = self._conn.fetchone(
            "SELECT * FROM assets WHERE isin = ? LIMIT 1", (isin,)
        )
        return self._row_to_asset(row) if row else None

    def find_active(self, asset_class: str = "EQUITY", limit: int = 50000) -> List[Asset]:
        rows = self._conn.fetchall(
            "SELECT * FROM assets WHERE is_active = 1 AND asset_class = ? ORDER BY name LIMIT ?",
            (asset_class, limit),
        )
        return [self._row_to_asset(r) for r in rows]

    @staticmethod
    def _row_to_asset(row: dict) -> Asset:
        return Asset(
            id=row["id"],
            name=row["name"],
            asset_class=row["asset_class"],
            isin=row.get("isin"),
            nse_symbol=row.get("nse_symbol"),
            bse_code=row.get("bse_code"),
            amfi_code=row.get("amfi_code"),
            screener_id=row.get("screener_id"),
            series=row.get("series"),
            sector=row.get("sector"),
            industry_group=row.get("industry_group"),
            industry=row.get("industry"),
            sub_industry=row.get("sub_industry"),
            screener_sector_code=row.get("screener_sector_code"),
            screener_industry_group_code=row.get("screener_industry_group_code"),
            screener_industry_code=row.get("screener_industry_code"),
            screener_sub_industry_code=row.get("screener_sub_industry_code"),
            msi_sector=row.get("msi_sector"),
            msi_industry_group=row.get("msi_industry_group"),
            msi_group_rank=row.get("msi_group_rank"),
            listing_date=row.get("listing_date"),
            delisting_date=row.get("delisting_date"),
            is_active=bool(row.get("is_active", 1)),
            nse_listed=bool(row.get("nse_listed", 0)),
            bse_listed=bool(row.get("bse_listed", 0)),
            face_value=row.get("face_value"),
            website_url=row.get("website_url"),
            description=row.get("description"),
            management_json=row.get("management_json"),
        )
