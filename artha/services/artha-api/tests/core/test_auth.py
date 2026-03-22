from __future__ import annotations

from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from core import auth as auth_module
from tests.conftest import make_credentials, make_token


@pytest.mark.asyncio
async def test_verify_jwt_when_valid_token_then_payload_is_returned(monkeypatch, test_settings) -> None:
    monkeypatch.setattr(auth_module, "get_settings", lambda: test_settings)
    token = make_token(sub="user-abc")
    payload = await auth_module.verify_jwt(make_credentials(token))
    assert payload["sub"] == "user-abc"


@pytest.mark.asyncio
async def test_verify_jwt_when_expired_token_then_raises_401(monkeypatch, test_settings) -> None:
    monkeypatch.setattr(auth_module, "get_settings", lambda: test_settings)
    token = make_token(exp_delta_seconds=-1)
    with pytest.raises(HTTPException) as exc:
        await auth_module.verify_jwt(make_credentials(token))
    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_verify_jwt_when_wrong_secret_then_raises_401(monkeypatch, test_settings) -> None:
    monkeypatch.setattr(auth_module, "get_settings", lambda: test_settings)
    token = make_token(secret="wrong-secret")
    async def _fail_fetch() -> list[dict[str, object]]:
        raise RuntimeError("JWKS fetch should not be used in this unit test")
    monkeypatch.setattr(auth_module, "_fetch_jwks", _fail_fetch)
    with pytest.raises(HTTPException) as exc:
        await auth_module.verify_jwt(make_credentials(token))
    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_verify_jwt_when_missing_token_then_raises_401(monkeypatch, test_settings) -> None:
    monkeypatch.setattr(auth_module, "get_settings", lambda: test_settings)
    with pytest.raises(HTTPException) as exc:
        await auth_module.verify_jwt(None)
    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_verify_jwt_when_wrong_audience_then_raises_401(monkeypatch, test_settings) -> None:
    monkeypatch.setattr(auth_module, "get_settings", lambda: test_settings)
    token = make_token(audience="anon")
    async def _fail_fetch() -> list[dict[str, object]]:
        raise RuntimeError("JWKS fetch should not be used in this unit test")
    monkeypatch.setattr(auth_module, "_fetch_jwks", _fail_fetch)
    with pytest.raises(HTTPException) as exc:
        await auth_module.verify_jwt(make_credentials(token))
    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_get_user_id_when_sub_present_then_returns_sub() -> None:
    uid = await auth_module.get_user_id({"sub": "user-xyz", "email": "test@test.com"})
    assert uid == "user-xyz"


@pytest.mark.asyncio
async def test_get_user_id_when_sub_missing_then_raises_401() -> None:
    with pytest.raises(HTTPException) as exc:
        await auth_module.get_user_id({})
    assert exc.value.status_code == 401
