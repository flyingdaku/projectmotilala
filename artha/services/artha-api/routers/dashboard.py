from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException

from adapters.dashboard import DEFAULT_PRESET_IDS, PRESET_WIDGETS, DashboardAdapter
from core.auth import get_user_id
from core.db import get_pg, pg_pool
from models.dashboard import CreateDashboardRequest, CreateWidgetRequest, UpdateDashboardRequest, UpdateWidgetRequest, WidgetQueryRequest


router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])
dashboard_adapter = DashboardAdapter()


def _build_default_layout() -> list[dict[str, int | str]]:
    return [
        {"i": "__placeholder__", "x": 0, "y": 0, "w": 6, "h": 4, "minW": 3, "minH": 2},
        {"i": "__placeholder2__", "x": 6, "y": 0, "w": 6, "h": 4, "minW": 3, "minH": 2},
        {"i": "__placeholder3__", "x": 0, "y": 4, "w": 6, "h": 5, "minW": 3, "minH": 2},
        {"i": "__placeholder4__", "x": 6, "y": 4, "w": 6, "h": 5, "minW": 3, "minH": 2},
    ]


async def _get_dashboard_owner(conn: Any, dashboard_id: str) -> str | None:
    row = await conn.fetchrow("SELECT user_id FROM user_dashboards WHERE id = $1", dashboard_id)
    return str(row["user_id"]) if row is not None else None


async def _ensure_dashboard_access(conn: Any, dashboard_id: str, user_id: str) -> None:
    owner = await _get_dashboard_owner(conn, dashboard_id)
    if owner is None:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    if owner != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")


async def _ensure_widget_access(conn: Any, dashboard_id: str, widget_id: str, user_id: str) -> None:
    row = await conn.fetchrow(
        """
        SELECT d.user_id
        FROM user_dashboards d
        JOIN user_widgets w ON w.dashboard_id = d.id
        WHERE d.id = $1 AND w.id = $2
        """,
        dashboard_id,
        widget_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Widget not found")
    if str(row["user_id"]) != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")


def _normalize_widget_row(row: Any) -> dict[str, Any]:
    return {
        "id": str(row["id"]),
        "dashboard_id": str(row["dashboard_id"]),
        "widget_type": row["widget_type"],
        "title": row["title"],
        "config_json": row["config_json"],
        "sort_order": int(row["sort_order"]),
        "created_at": row["created_at"].isoformat() if hasattr(row["created_at"], "isoformat") else str(row["created_at"]),
        "updated_at": row["updated_at"].isoformat() if hasattr(row["updated_at"], "isoformat") else str(row["updated_at"]),
    }


def _normalize_dashboard_summary(row: Any) -> dict[str, Any]:
    return {
        "id": str(row["id"]),
        "name": row["name"],
        "is_default": bool(row["is_default"]),
        "widget_count": int(row["widget_count"]),
        "updated_at": row["updated_at"].isoformat() if hasattr(row["updated_at"], "isoformat") else str(row["updated_at"]),
    }


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "dashboard"}


@router.get("")
async def list_dashboards(user_id: str = Depends(get_user_id)) -> dict[str, Any]:
    async with get_pg() as conn:
        rows = await conn.fetch(
            """
            SELECT d.id, d.name, d.is_default, d.updated_at,
                   COUNT(w.id)::text AS widget_count
            FROM user_dashboards d
            LEFT JOIN user_widgets w ON w.dashboard_id = d.id
            WHERE d.user_id = $1
            GROUP BY d.id
            ORDER BY d.is_default DESC, d.updated_at DESC
            """,
            user_id,
        )
    if not rows:
        if pg_pool is None:
            raise HTTPException(status_code=500, detail="Database pool is not initialized")
        async with pg_pool.acquire() as conn:
            async with conn.transaction():
                dashboard = await conn.fetchrow(
                    """
                    INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
                    VALUES ($1, 'My Dashboard', true, $2::jsonb)
                    RETURNING id, name, is_default, updated_at
                    """,
                    user_id,
                    _build_default_layout(),
                )
                presets = [item for item in PRESET_WIDGETS if item["id"] in DEFAULT_PRESET_IDS]
                for idx, preset in enumerate(presets):
                    await conn.execute(
                        """
                        INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
                        VALUES ($1, $2, $3, $4::jsonb, $5)
                        """,
                        dashboard["id"],
                        preset["widget_type"],
                        preset["name"],
                        preset["config"],
                        idx,
                    )
        seeded = {
            "id": str(dashboard["id"]),
            "name": dashboard["name"],
            "is_default": bool(dashboard["is_default"]),
            "widget_count": len(presets),
            "updated_at": dashboard["updated_at"].isoformat() if hasattr(dashboard["updated_at"], "isoformat") else str(dashboard["updated_at"]),
        }
        return {"dashboards": [seeded]}
    return {"dashboards": [_normalize_dashboard_summary(row) for row in rows]}


@router.post("")
async def create_dashboard(
    body: CreateDashboardRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    name = (body.name or "").strip() or "My Dashboard"
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
            VALUES ($1, $2, false, '[]'::jsonb)
            RETURNING id, name, is_default, updated_at
            """,
            user_id,
            name,
        )
    return {"dashboard": {"id": str(row["id"]), "name": row["name"], "is_default": bool(row["is_default"]), "widget_count": 0, "updated_at": row["updated_at"].isoformat() if hasattr(row["updated_at"], "isoformat") else str(row["updated_at"])}}


@router.post("/widget/query")
async def query_widget(
    body: WidgetQueryRequest | dict[str, Any] = Body(...),
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    if isinstance(body, dict):
        payload = WidgetQueryRequest.model_validate(body)
    else:
        payload = body
    return await dashboard_adapter.execute_widget_query(payload.config, payload.widget_type, user_id)


@router.get("/{dashboard_id}")
async def get_dashboard(dashboard_id: str, user_id: str = Depends(get_user_id)) -> dict[str, Any]:
    async with get_pg() as conn:
        await _ensure_dashboard_access(conn, dashboard_id, user_id)
        dashboard = await conn.fetchrow(
            """
            SELECT id, user_id, name, is_default, layout_json, created_at, updated_at
            FROM user_dashboards
            WHERE id = $1
            """,
            dashboard_id,
        )
        widgets = await conn.fetch(
            """
            SELECT id, dashboard_id, widget_type, title, config_json, sort_order, created_at, updated_at
            FROM user_widgets
            WHERE dashboard_id = $1
            ORDER BY sort_order ASC, created_at ASC
            """,
            dashboard_id,
        )
    return {
        "dashboard": {
            "id": str(dashboard["id"]),
            "user_id": str(dashboard["user_id"]),
            "name": dashboard["name"],
            "is_default": bool(dashboard["is_default"]),
            "layout_json": dashboard["layout_json"],
            "widgets": [_normalize_widget_row(row) for row in widgets],
            "created_at": dashboard["created_at"].isoformat() if hasattr(dashboard["created_at"], "isoformat") else str(dashboard["created_at"]),
            "updated_at": dashboard["updated_at"].isoformat() if hasattr(dashboard["updated_at"], "isoformat") else str(dashboard["updated_at"]),
        }
    }


@router.put("/{dashboard_id}")
async def update_dashboard(
    dashboard_id: str,
    body: UpdateDashboardRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    async with get_pg() as conn:
        await _ensure_dashboard_access(conn, dashboard_id, user_id)
        if body.is_default:
            await conn.execute("UPDATE user_dashboards SET is_default = false WHERE user_id = $1 AND id != $2", user_id, dashboard_id)

        set_clauses = ["updated_at = NOW()"]
        params: list[Any] = []
        if body.name is not None:
            params.append(body.name)
            set_clauses.append(f"name = ${len(params)}")
        if body.layout_json is not None:
            params.append([item.model_dump() if hasattr(item, "model_dump") else item for item in body.layout_json])
            set_clauses.append(f"layout_json = ${len(params)}::jsonb")
        if body.is_default is not None:
            params.append(body.is_default)
            set_clauses.append(f"is_default = ${len(params)}")
        params.extend([dashboard_id])
        row = await conn.fetchrow(
            f"""
            UPDATE user_dashboards
            SET {', '.join(set_clauses)}
            WHERE id = ${len(params)}
            RETURNING id, name, is_default, updated_at
            """,
            *params,
        )
    return {"dashboard": {"id": str(row["id"]), "name": row["name"], "is_default": bool(row["is_default"]), "updated_at": row["updated_at"].isoformat() if hasattr(row["updated_at"], "isoformat") else str(row["updated_at"])}}


@router.delete("/{dashboard_id}")
async def delete_dashboard(dashboard_id: str, user_id: str = Depends(get_user_id)) -> dict[str, bool]:
    if pg_pool is None:
        raise HTTPException(status_code=500, detail="Database pool is not initialized")
    async with pg_pool.acquire() as conn:
        async with conn.transaction():
            await _ensure_dashboard_access(conn, dashboard_id, user_id)
            await conn.execute("DELETE FROM user_dashboards WHERE id = $1", dashboard_id)
    return {"success": True}


@router.post("/{dashboard_id}/duplicate")
async def duplicate_dashboard(dashboard_id: str, user_id: str = Depends(get_user_id)) -> dict[str, Any]:
    if pg_pool is None:
        raise HTTPException(status_code=500, detail="Database pool is not initialized")
    async with pg_pool.acquire() as conn:
        async with conn.transaction():
            await _ensure_dashboard_access(conn, dashboard_id, user_id)
            original = await conn.fetchrow("SELECT id, name, layout_json FROM user_dashboards WHERE id = $1", dashboard_id)
            widgets = await conn.fetch(
                """
                SELECT widget_type, title, config_json, sort_order
                FROM user_widgets
                WHERE dashboard_id = $1
                ORDER BY sort_order ASC
                """,
                dashboard_id,
            )
            new_dash = await conn.fetchrow(
                """
                INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
                VALUES ($1, $2, false, $3::jsonb)
                RETURNING id, user_id, name, is_default, layout_json, created_at, updated_at
                """,
                user_id,
                f"{original['name']} (Copy)",
                original["layout_json"],
            )
            for widget in widgets:
                await conn.execute(
                    """
                    INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
                    VALUES ($1, $2, $3, $4::jsonb, $5)
                    """,
                    new_dash["id"],
                    widget["widget_type"],
                    widget["title"],
                    widget["config_json"],
                    widget["sort_order"],
                )
    return {
        "dashboard": {
            "id": str(new_dash["id"]),
            "user_id": str(new_dash["user_id"]),
            "name": new_dash["name"],
            "is_default": bool(new_dash["is_default"]),
            "layout_json": new_dash["layout_json"],
            "widgets": None,
            "created_at": new_dash["created_at"].isoformat() if hasattr(new_dash["created_at"], "isoformat") else str(new_dash["created_at"]),
            "updated_at": new_dash["updated_at"].isoformat() if hasattr(new_dash["updated_at"], "isoformat") else str(new_dash["updated_at"]),
        }
    }


@router.post("/{dashboard_id}/widget")
async def create_widget(
    dashboard_id: str,
    body: CreateWidgetRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    async with get_pg() as conn:
        await _ensure_dashboard_access(conn, dashboard_id, user_id)
        count_row = await conn.fetchrow("SELECT COUNT(*)::text AS cnt FROM user_widgets WHERE dashboard_id = $1", dashboard_id)
        sort_order = int(count_row["cnt"]) if count_row else 0
        widget = await conn.fetchrow(
            """
            INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
            VALUES ($1, $2, $3, $4::jsonb, $5)
            RETURNING id, dashboard_id, widget_type, title, config_json, sort_order, created_at, updated_at
            """,
            dashboard_id,
            body.widget_type,
            body.title or "Untitled Widget",
            body.config_json.model_dump() if hasattr(body.config_json, "model_dump") else (body.config_json or {}),
            sort_order,
        )
    return {"widget": _normalize_widget_row(widget)}


@router.put("/{dashboard_id}/widget/{widget_id}")
async def update_widget(
    dashboard_id: str,
    widget_id: str,
    body: UpdateWidgetRequest,
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    async with get_pg() as conn:
        await _ensure_widget_access(conn, dashboard_id, widget_id, user_id)
        set_clauses = ["updated_at = NOW()"]
        params: list[Any] = []
        if body.title is not None:
            params.append(body.title)
            set_clauses.append(f"title = ${len(params)}")
        if body.widget_type is not None:
            params.append(body.widget_type)
            set_clauses.append(f"widget_type = ${len(params)}")
        if body.config_json is not None:
            params.append(body.config_json.model_dump() if hasattr(body.config_json, "model_dump") else body.config_json)
            set_clauses.append(f"config_json = ${len(params)}::jsonb")
        params.append(widget_id)
        widget = await conn.fetchrow(
            f"""
            UPDATE user_widgets
            SET {', '.join(set_clauses)}
            WHERE id = ${len(params)}
            RETURNING id, dashboard_id, widget_type, title, config_json, sort_order, created_at, updated_at
            """,
            *params,
        )
    return {"widget": _normalize_widget_row(widget)}


@router.delete("/{dashboard_id}/widget/{widget_id}")
async def delete_widget(dashboard_id: str, widget_id: str, user_id: str = Depends(get_user_id)) -> dict[str, bool]:
    async with get_pg() as conn:
        await _ensure_widget_access(conn, dashboard_id, widget_id, user_id)
        await conn.execute("DELETE FROM user_widgets WHERE id = $1", widget_id)
    return {"success": True}
