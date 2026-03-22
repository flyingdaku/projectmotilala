from __future__ import annotations

import time
from typing import Any

import httpx
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, ExpiredSignatureError, jwk, jwt
from jose.utils import base64url_decode

from core.config import get_settings


security = HTTPBearer(auto_error=False)
_JWKS_CACHE: dict[str, Any] = {"keys": None, "fetched_at": 0.0}
_JWKS_TTL_SECONDS = 3600


def _ensure_authenticated_audience(claims: dict[str, Any]) -> None:
    audience = claims.get("aud")
    if isinstance(audience, str):
        audiences = [audience]
    elif isinstance(audience, list):
        audiences = [str(item) for item in audience]
    else:
        audiences = []
    if "authenticated" not in audiences:
        raise JWTError("Invalid audience")


def _ensure_not_expired(claims: dict[str, Any]) -> None:
    exp = claims.get("exp")
    if exp is None:
        raise JWTError("Missing exp claim")
    if int(exp) <= int(time.time()):
        raise ExpiredSignatureError("Token expired")


async def _fetch_jwks() -> list[dict[str, Any]]:
    now = time.time()
    cached_keys = _JWKS_CACHE.get("keys")
    fetched_at = float(_JWKS_CACHE.get("fetched_at", 0.0))
    if cached_keys and now - fetched_at < _JWKS_TTL_SECONDS:
        return cached_keys

    settings = get_settings()
    jwks_url = f"{settings.SUPABASE_URL.rstrip('/')}/auth/v1/.well-known/jwks.json"
    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(jwks_url)
        response.raise_for_status()
        payload = response.json()

    keys = payload.get("keys", [])
    _JWKS_CACHE["keys"] = keys
    _JWKS_CACHE["fetched_at"] = now
    return keys


async def _verify_with_local_hs256(token: str) -> dict[str, Any]:
    settings = get_settings()
    if not settings.SUPABASE_JWT_SECRET:
        raise JWTError("Local JWT secret not configured")
    return jwt.decode(
        token,
        settings.SUPABASE_JWT_SECRET,
        algorithms=["HS256"],
        audience="authenticated",
    )


def _verify_signature_with_jwk(token: str, key_data: dict[str, Any]) -> dict[str, Any]:
    header = jwt.get_unverified_header(token)
    algorithm = header.get("alg")
    if not algorithm:
        raise JWTError("Missing signing algorithm")

    public_key = jwk.construct(key_data, algorithm=algorithm)
    message, encoded_signature = token.rsplit(".", 1)
    decoded_signature = base64url_decode(encoded_signature.encode("utf-8"))

    if not public_key.verify(message.encode("utf-8"), decoded_signature):
        raise JWTError("Signature verification failed")

    claims = jwt.get_unverified_claims(token)
    _ensure_authenticated_audience(claims)
    _ensure_not_expired(claims)
    return claims


async def _verify_with_jwks(token: str) -> dict[str, Any]:
    header = jwt.get_unverified_header(token)
    kid = header.get("kid")
    try:
        keys = await _fetch_jwks()
    except Exception as exc:
        raise JWTError("Authentication failed") from exc

    matching_keys = [key for key in keys if kid is None or key.get("kid") == kid]
    for key_data in matching_keys or keys:
        try:
            return _verify_signature_with_jwk(token, key_data)
        except JWTError:
            continue

    raise JWTError("Authentication failed")


async def verify_jwt(
    credentials: HTTPAuthorizationCredentials | None = Security(security),
) -> dict[str, Any]:
    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    token = credentials.credentials
    try:
        return await _verify_with_local_hs256(token)
    except ExpiredSignatureError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc
    except JWTError:
        try:
            return await _verify_with_jwks(token)
        except ExpiredSignatureError as exc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
            ) from exc
        except JWTError as exc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication failed",
            ) from exc


async def get_user_id(payload: dict[str, Any] = Security(verify_jwt)) -> str:
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return str(user_id)


async def get_optional_user_id(
    credentials: HTTPAuthorizationCredentials | None = Security(security),
) -> str | None:
    if credentials is None or not credentials.credentials:
        return None
    payload = await verify_jwt(credentials)
    user_id = payload.get("sub")
    return str(user_id) if user_id else None
