from __future__ import annotations

import argparse
import json
import sys
from typing import Any
from urllib import error, request


DEFAULT_NODE_URL = "http://localhost:3000/api/screener/run"
DEFAULT_PYTHON_URL = "http://localhost:8000/api/screener/run"


DEFAULT_CASES: list[dict[str, Any]] = [
    {"name": "simple-range", "body": {"filters": {"marketCapCr": {"min": 1000}}}},
    {"name": "multi-sector", "body": {"filters": {"sector": ["Financial Services", "Information Technology"]}}},
    {"name": "dsl-rsi", "body": {"filters": {"formula": ["rsi14 < 30"]}}},
    {"name": "dsl-close-sma", "body": {"filters": {"formula": ["close > sma200 and rsi14 < 50"]}}},
    {"name": "range-and-formula", "body": {"filters": {"peTtm": {"max": 20}, "formula": ["roce > 15"]}}},
    {"name": "sorting", "body": {"filters": {"roe": {"min": 10}, "sort": {"field": "roe", "desc": False}}}},
    {"name": "pagination", "body": {"filters": {"marketCapCr": {"min": 1000}}, "limit": 25, "offset": 25}},
    {"name": "empty-results", "body": {"filters": {"marketCapCr": {"min": 99999999}}}},
    {"name": "max-limit", "body": {"filters": {}, "limit": 500}},
    {"name": "index-filter", "body": {"filters": {"indexMembership": ["nifty50"]}}},
]


def _post_json(url: str, payload: dict[str, Any]) -> tuple[int, dict[str, Any]]:
    req = request.Request(
        url=url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with request.urlopen(req) as resp:
            status_code = resp.getcode()
            body = resp.read().decode("utf-8")
            return status_code, json.loads(body)
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8") if exc.fp is not None else "{}"
        try:
            parsed = json.loads(body)
        except json.JSONDecodeError:
            parsed = {"raw": body}
        return exc.code, parsed


def _symbols(payload: dict[str, Any]) -> list[str]:
    return [str(item.get("symbol")) for item in payload.get("results", [])]


def _load_cases(path: str | None) -> list[dict[str, Any]]:
    if path is None:
        return DEFAULT_CASES
    with open(path, "r", encoding="utf-8") as handle:
        loaded = json.load(handle)
    if not isinstance(loaded, list):
        raise ValueError("Case file must contain a JSON array")
    return loaded


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify screener migration against Node and FastAPI backends.")
    parser.add_argument("--cases", help="JSON file containing a list of {name, body} or legacy {name, filters} test cases")
    parser.add_argument("--node-url", default=DEFAULT_NODE_URL)
    parser.add_argument("--python-url", default=DEFAULT_PYTHON_URL)
    args = parser.parse_args()

    cases = _load_cases(args.cases)
    all_passed = True

    print("Required pre-delete step: run this script and confirm all cases pass before removing the Next.js screener routes.")
    for idx, case in enumerate(cases, start=1):
        name = str(case.get("name") or f"case-{idx}")
        body = case.get("body")
        if body is None and isinstance(case.get("filters"), dict):
            body = {"filters": case["filters"]}
        if not isinstance(body, dict):
            print(f"[FAIL] {name}: body must be an object")
            all_passed = False
            continue

        node_status, node_payload = _post_json(args.node_url, body)
        py_status, py_payload = _post_json(args.python_url, body)

        if node_status != py_status:
            print(f"[FAIL] {name}: status mismatch node={node_status} python={py_status}")
            all_passed = False
            continue

        node_symbols = _symbols(node_payload)
        py_symbols = _symbols(py_payload)
        node_set = set(node_symbols)
        py_set = set(py_symbols)
        same_count = len(node_symbols) == len(py_symbols)
        same_symbols = node_symbols == py_symbols or node_set == py_set

        if same_count and same_symbols:
            print(f"[PASS] {name}: {len(node_symbols)} rows")
            continue

        only_node = sorted(node_set - py_set)
        only_py = sorted(py_set - node_set)
        print(f"[FAIL] {name}: node_count={len(node_symbols)} python_count={len(py_symbols)}")
        if only_node:
            print(f"  Only in Node:   {', '.join(only_node)}")
        if only_py:
            print(f"  Only in Python: {', '.join(only_py)}")
        all_passed = False

    return 0 if all_passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
