from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Body, Depends, Query

from adapters.feed import FeedAdapter
from core.auth import get_user_id


router = APIRouter(prefix="/api/feed", tags=["feed"])
feed_adapter = FeedAdapter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "feed"}


@router.get("")
async def get_feed(
    user_id: str = Depends(get_user_id),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> dict[str, Any]:
    feed = await feed_adapter.get_user_feed(user_id, limit=limit + offset)
    sliced = feed[offset : offset + limit]
    unread_count = sum(1 for item in feed if not item["isRead"])
    return {"feed": sliced, "unreadCount": unread_count}


@router.post("")
async def mark_feed_as_read(
    body: dict[str, Any] = Body(default_factory=dict),
    user_id: str = Depends(get_user_id),
) -> dict[str, int]:
    event_ids = body.get("event_ids")
    if event_ids is None:
        event_ids = body.get("eventIds", [])
    cleaned = [str(item) for item in event_ids] if isinstance(event_ids, list) else []
    await feed_adapter.mark_as_read(user_id, cleaned)
    return {"marked": len(list(dict.fromkeys([item for item in cleaned if item])))}
