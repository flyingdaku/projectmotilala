from __future__ import annotations

import hashlib
import json
import threading
from typing import Any, Awaitable, Callable

from cachetools import TTLCache


_CACHES: dict[str, TTLCache] = {}
_LOCK = threading.Lock()


def get_cache(name: str, maxsize: int = 512, ttl: int = 120) -> TTLCache:
    """Get or create a named TTL cache."""
    with _LOCK:
        if name not in _CACHES:
            _CACHES[name] = TTLCache(maxsize=maxsize, ttl=ttl)
        return _CACHES[name]


def make_cache_key(*args: Any, **kwargs: Any) -> str:
    """
    Create a stable string cache key from arbitrary args.
    Handles: strings, ints, floats, dicts, lists (JSON-serialized).
    """
    raw = json.dumps({"args": args, "kwargs": kwargs}, sort_keys=True, default=str)
    return hashlib.md5(raw.encode()).hexdigest()


async def cached(
    cache_name: str,
    key: str,
    ttl: int,
    fetch_fn: Callable[[], Awaitable[Any]],
    maxsize: int = 256,
) -> Any:
    """
    Try to get value from cache. If miss, call fetch_fn(), store, return.
    """
    cache = get_cache(cache_name, maxsize=maxsize, ttl=ttl)

    with _LOCK:
        if key in cache:
            return cache[key]

    result = await fetch_fn()

    with _LOCK:
        cache[key] = result

    return result


def invalidate(cache_name: str, key: str | None = None) -> None:
    """
    Invalidate a specific key or the entire named cache.
    """
    with _LOCK:
        if cache_name not in _CACHES:
            return
        if key is None:
            _CACHES[cache_name].clear()
        elif key in _CACHES[cache_name]:
            del _CACHES[cache_name][key]


def cache_stats() -> dict[str, dict[str, int]]:
    """Returns stats for all caches."""
    with _LOCK:
        return {
            name: {
                "size": len(cache),
                "maxsize": cache.maxsize,
                "ttl": cache.ttl,
                "currsize": cache.currsize,
            }
            for name, cache in _CACHES.items()
        }
