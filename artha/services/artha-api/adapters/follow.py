from __future__ import annotations

from adapters.base import BaseAdapter
from core.db import get_pg


class FollowAdapter(BaseAdapter):
    def __init__(self) -> None:
        super().__init__(name="follow")

    async def get_status(self, user_id: str, asset_id: str) -> bool:
        async with get_pg() as conn:
            row = await conn.fetchrow(
                """
                SELECT asset_id
                FROM user_asset_follows
                WHERE user_id = $1 AND asset_id = $2
                LIMIT 1
                """,
                user_id,
                asset_id,
            )
        return row is not None

    async def follow(self, user_id: str, asset_id: str) -> None:
        async with get_pg() as conn:
            await conn.execute(
                """
                INSERT INTO user_asset_follows (user_id, asset_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, asset_id) DO NOTHING
                """,
                user_id,
                asset_id,
            )

    async def unfollow(self, user_id: str, asset_id: str) -> None:
        async with get_pg() as conn:
            await conn.execute(
                """
                DELETE FROM user_asset_follows
                WHERE user_id = $1 AND asset_id = $2
                """,
                user_id,
                asset_id,
            )

    async def get_followed_asset_ids(self, user_id: str) -> list[str]:
        async with get_pg() as conn:
            rows = await conn.fetch(
                """
                SELECT asset_id
                FROM user_asset_follows
                WHERE user_id = $1
                ORDER BY updated_at DESC, asset_id ASC
                """,
                user_id,
            )
        return [str(row["asset_id"]) for row in rows]
