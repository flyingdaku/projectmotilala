from __future__ import annotations

from decimal import Decimal
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status

from core.auth import get_user_id
from core.db import get_pg
from models.charts import (
    ChartAlert,
    ChartLayout,
    CreateAlertRequest,
    CreateLayoutRequest,
    SaveDrawingsRequest,
    UpdateLayoutRequest,
)


router = APIRouter(prefix="/api/charts", tags=["charts"])


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _normalize_record(row: dict[str, Any]) -> dict[str, Any]:
    return {key: _to_float(value) for key, value in row.items()}


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "charts"}


@router.get("/layouts")
async def list_layouts(user_id: str = Depends(get_user_id)) -> dict[str, list[ChartLayout]]:
    async with get_pg() as conn:
        rows = await conn.fetch(
            """
            SELECT id, user_id, name, content, is_default, created_at, updated_at
            FROM chart_layouts
            WHERE user_id = $1
            ORDER BY is_default DESC, updated_at DESC
            """,
            user_id,
        )
    layouts = [ChartLayout(**dict(row)) for row in rows]
    return {"layouts": layouts}


@router.post("/layouts", status_code=status.HTTP_201_CREATED)
async def create_layout(
    payload: CreateLayoutRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, ChartLayout]:
    async with get_pg() as conn:
        async with conn.transaction():
            if payload.is_default:
                await conn.execute(
                    """
                    UPDATE chart_layouts
                    SET is_default = FALSE
                    WHERE user_id = $1
                    """,
                    user_id,
                )

            row = await conn.fetchrow(
                """
                INSERT INTO chart_layouts (user_id, name, content, is_default)
                VALUES ($1, $2, $3::jsonb, $4)
                RETURNING id, user_id, name, content, is_default, created_at, updated_at
                """,
                user_id,
                payload.name.strip(),
                payload.content,
                payload.is_default,
            )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to create layout")
    return {"layout": ChartLayout(**dict(row))}


@router.get("/layouts/{layout_id}")
async def get_layout(layout_id: str, user_id: str = Depends(get_user_id)) -> dict[str, ChartLayout]:
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            SELECT id, user_id, name, content, is_default, created_at, updated_at
            FROM chart_layouts
            WHERE id = $1 AND user_id = $2
            """,
            layout_id,
            user_id,
        )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    return {"layout": ChartLayout(**dict(row))}


@router.put("/layouts/{layout_id}")
async def update_layout(
    layout_id: str,
    payload: UpdateLayoutRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, ChartLayout]:
    update_data = payload.model_dump(exclude_unset=True)
    if "name" in update_data and update_data["name"] is not None:
        update_data["name"] = str(update_data["name"]).strip()

    async with get_pg() as conn:
        existing = await conn.fetchrow(
            """
            SELECT id, user_id, name, content, is_default, created_at, updated_at
            FROM chart_layouts
            WHERE id = $1 AND user_id = $2
            """,
            layout_id,
            user_id,
        )
        if existing is None:
            raise HTTPException(status_code=404, detail="Not found")

        if not update_data:
            return {"layout": ChartLayout(**dict(existing))}

        set_clauses: list[str] = []
        params: list[Any] = []

        async with conn.transaction():
            if update_data.get("is_default") is True:
                await conn.execute(
                    """
                    UPDATE chart_layouts
                    SET is_default = FALSE
                    WHERE user_id = $1 AND id != $2
                    """,
                    user_id,
                    layout_id,
                )

            for field in ("name", "content", "is_default"):
                if field in update_data:
                    params.append(update_data[field])
                    set_clauses.append(f"{field} = ${len(params)}")

            params.extend([layout_id, user_id])
            row = await conn.fetchrow(
                f"""
                UPDATE chart_layouts
                SET {", ".join(set_clauses)}, updated_at = now()
                WHERE id = ${len(params) - 1} AND user_id = ${len(params)}
                RETURNING id, user_id, name, content, is_default, created_at, updated_at
                """,
                *params,
            )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    return {"layout": ChartLayout(**dict(row))}


@router.delete("/layouts/{layout_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_layout(layout_id: str, user_id: str = Depends(get_user_id)) -> Response:
    async with get_pg() as conn:
        async with conn.transaction():
            existing = await conn.fetchrow(
                """
                SELECT id, is_default
                FROM chart_layouts
                WHERE id = $1 AND user_id = $2
                """,
                layout_id,
                user_id,
            )
            if existing is None:
                raise HTTPException(status_code=404, detail="Not found")

            await conn.execute(
                """
                DELETE FROM chart_layouts
                WHERE id = $1 AND user_id = $2
                """,
                layout_id,
                user_id,
            )

            if bool(existing["is_default"]):
                await conn.execute(
                    """
                    WITH next_layout AS (
                        SELECT id
                        FROM chart_layouts
                        WHERE user_id = $1
                        ORDER BY updated_at DESC
                        LIMIT 1
                    )
                    UPDATE chart_layouts
                    SET is_default = TRUE
                    WHERE id IN (SELECT id FROM next_layout)
                    """,
                    user_id,
                )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/drawings/{symbol}/{tf}")
async def get_drawings(symbol: str, tf: str, user_id: str = Depends(get_user_id)) -> dict[str, Any]:
    symbol_upper = symbol.upper()
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            SELECT content, updated_at
            FROM chart_drawings
            WHERE user_id = $1 AND symbol = $2 AND timeframe = $3
            """,
            user_id,
            symbol_upper,
            tf,
        )
    if row is None:
        return {"drawings": []}
    return {"drawings": row["content"] or [], "updated_at": row["updated_at"]}


@router.put("/drawings/{symbol}/{tf}")
async def save_drawings(
    symbol: str,
    tf: str,
    payload: SaveDrawingsRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    symbol_upper = symbol.upper()
    async with get_pg() as conn:
        await conn.execute(
            """
            INSERT INTO chart_drawings (user_id, symbol, timeframe, content)
            VALUES ($1, $2, $3, $4::jsonb)
            ON CONFLICT (user_id, symbol, timeframe)
            DO UPDATE SET content = $4::jsonb, updated_at = now()
            """,
            user_id,
            symbol_upper,
            tf,
            payload.drawings,
        )
    return {"ok": True, "symbol": symbol_upper, "timeframe": tf}


@router.delete("/drawings/{symbol}/{tf}", status_code=status.HTTP_204_NO_CONTENT)
async def clear_drawings(symbol: str, tf: str, user_id: str = Depends(get_user_id)) -> Response:
    symbol_upper = symbol.upper()
    async with get_pg() as conn:
        await conn.execute(
            """
            UPDATE chart_drawings
            SET content = '[]'::jsonb, updated_at = now()
            WHERE user_id = $1 AND symbol = $2 AND timeframe = $3
            """,
            user_id,
            symbol_upper,
            tf,
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/alerts")
async def list_alerts(
    symbol: str | None = Query(default=None),
    active_only: bool = Query(default=True),
    user_id: str = Depends(get_user_id),
) -> dict[str, list[ChartAlert]]:
    symbol_upper = symbol.upper() if symbol else None
    params: list[Any] = [user_id]
    where_clauses = ["user_id = $1"]
    if symbol_upper:
        params.append(symbol_upper)
        where_clauses.append(f"symbol = ${len(params)}")
    if active_only:
        where_clauses.append("is_active = TRUE")

    async with get_pg() as conn:
        rows = await conn.fetch(
            f"""
            SELECT id, user_id, symbol, price, condition, message, is_active, triggered_at, created_at
            FROM chart_alerts
            WHERE {" AND ".join(where_clauses)}
            ORDER BY created_at DESC
            """,
            *params,
        )
    alerts = [ChartAlert(**_normalize_record(dict(row))) for row in rows]
    return {"alerts": alerts}


@router.post("/alerts", status_code=status.HTTP_201_CREATED)
async def create_alert(
    payload: CreateAlertRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, ChartAlert]:
    symbol_upper = payload.symbol.upper()
    async with get_pg() as conn:
        duplicate = await conn.fetchrow(
            """
            SELECT id
            FROM chart_alerts
            WHERE user_id = $1
              AND symbol = $2
              AND price = $3
              AND condition = $4
              AND is_active = TRUE
            """,
            user_id,
            symbol_upper,
            payload.price,
            payload.condition,
        )
        if duplicate is not None:
            raise HTTPException(status_code=409, detail="Alert already exists")

        row = await conn.fetchrow(
            """
            INSERT INTO chart_alerts (user_id, symbol, price, condition, message, is_active)
            VALUES ($1, $2, $3, $4, $5, TRUE)
            RETURNING id, user_id, symbol, price, condition, message, is_active, triggered_at, created_at
            """,
            user_id,
            symbol_upper,
            payload.price,
            payload.condition,
            payload.message,
        )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to create alert")
    return {"alert": ChartAlert(**_normalize_record(dict(row)))}


@router.delete("/alerts/{alert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_alert(alert_id: str, user_id: str = Depends(get_user_id)) -> Response:
    async with get_pg() as conn:
        existing = await conn.fetchrow(
            """
            SELECT id
            FROM chart_alerts
            WHERE id = $1 AND user_id = $2
            """,
            alert_id,
            user_id,
        )
        if existing is None:
            raise HTTPException(status_code=404, detail="Not found")

        await conn.execute(
            """
            DELETE FROM chart_alerts
            WHERE id = $1 AND user_id = $2
            """,
            alert_id,
            user_id,
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/alerts/{alert_id}/deactivate")
async def deactivate_alert(alert_id: str, user_id: str = Depends(get_user_id)) -> dict[str, ChartAlert]:
    async with get_pg() as conn:
        existing = await conn.fetchrow(
            """
            SELECT id
            FROM chart_alerts
            WHERE id = $1 AND user_id = $2
            """,
            alert_id,
            user_id,
        )
        if existing is None:
            raise HTTPException(status_code=404, detail="Not found")

        row = await conn.fetchrow(
            """
            UPDATE chart_alerts
            SET is_active = FALSE
            WHERE id = $1 AND user_id = $2
            RETURNING id, user_id, symbol, price, condition, message, is_active, triggered_at, created_at
            """,
            alert_id,
            user_id,
        )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    return {"alert": ChartAlert(**_normalize_record(dict(row)))}
