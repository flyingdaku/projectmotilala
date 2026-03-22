from __future__ import annotations

from functools import lru_cache
from typing import Any

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore", case_sensitive=True)

    PG_DATABASE_URL: str
    TS_DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_JWT_SECRET: str = ""
    ALLOWED_ORIGINS: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    PROCESS_POOL_WORKERS: int = 4
    PG_POOL_MIN: int = 5
    PG_POOL_MAX: int = 20
    TS_POOL_MIN: int = 3
    TS_POOL_MAX: int = 15

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value: Any) -> list[str]:
        if isinstance(value, list):
            return [str(item).strip() for item in value if str(item).strip()]
        if isinstance(value, str):
            raw = value.strip()
            if not raw:
                return ["http://localhost:3000"]
            if raw.startswith("[") and raw.endswith("]"):
                import json

                parsed = json.loads(raw)
                if isinstance(parsed, list):
                    return [str(item).strip() for item in parsed if str(item).strip()]
            return [item.strip() for item in raw.split(",") if item.strip()]
        return ["http://localhost:3000"]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
