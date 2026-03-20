from __future__ import annotations

from pathlib import Path

import requests

from sources.morningstar.ingester import MorningstarBaseIngester


class _DummyResponse:
    def __init__(self, text: str, url: str):
        self.text = text
        self.url = url
        self.content = text.encode("utf-8")

    def raise_for_status(self) -> None:
        return None


class _RetryProbeSession:
    def __init__(self):
        self.calls = 0

    def get(self, url: str, timeout: int, headers=None):
        self.calls += 1
        if self.calls < 3:
            raise requests.ConnectionError("transient failure")
        return _DummyResponse("ok", url)


class _TestIngester(MorningstarBaseIngester):
    SOURCE_ID = "TEST"
    PIPELINE_TYPE = "TEST"

    def fetch(self, trade_date):
        raise NotImplementedError

    def ingest(self, records, conn):
        raise NotImplementedError


def test_download_text_retries_transient_request_failures(monkeypatch, tmp_path):
    ingester = _TestIngester()
    ingester.session = _RetryProbeSession()
    ingester.DOWNLOAD_RETRIES = 4

    monkeypatch.setattr(ingester, "_sleep", lambda: None)
    monkeypatch.setattr("sources.morningstar.ingester.raw_file_exists", lambda *args, **kwargs: False)

    def _save_raw_file(source_bucket, trade_date, filename, raw):
        path = Path(tmp_path) / filename
        path.write_bytes(raw)
        return path

    monkeypatch.setattr("sources.morningstar.ingester.save_raw_file", _save_raw_file)

    payload = ingester._download_text(
        trade_date=__import__("datetime").date(2026, 3, 20),
        url="https://example.com/data",
        source_bucket="TEST",
        filename_prefix="retry_probe",
        extension="json",
    )

    assert payload["text"] == "ok"
    assert ingester.session.calls == 3
