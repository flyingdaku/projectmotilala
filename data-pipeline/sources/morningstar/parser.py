from __future__ import annotations

import json
import re
from typing import Any, Dict, Iterable, List, Optional
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup


FUND_PATH_RE = re.compile(r"/mutualfunds/([^/]+)/([^/]+)/(?P<tab>[^/?#]+)\.aspx", re.I)
FUND_ID_RE = re.compile(r"/mutualfunds/([^/]+)/", re.I)
FUND_HOUSE_RE = re.compile(r"/funds/([^/.?#]+)\.aspx", re.I)
ISIN_RE = re.compile(r"\b([A-Z0-9]{12})\b")

TAB_KEYS = {
    "overview": "overview.aspx",
    "portfolio": "portfolio.aspx",
    "detailed_portfolio": "detailed-portfolio.aspx",
    "performance": "performance.aspx",
    "risk": "risk-ratings.aspx",
    "factsheet": "fund-factsheet.aspx",
    "analysis": "morningstar-analysis.aspx",
}

RETURN_HORIZON_MAP = {
    "1 day": "1D",
    "1 week": "1W",
    "1 month": "1M",
    "3 months": "3M",
    "6 months": "6M",
    "ytd": "YTD",
    "1 year": "1Y",
    "3 years": "3Y",
    "5 years": "5Y",
    "10 years": "10Y",
    "since inception": "SI",
}

ASSET_BUCKETS = {
    "stock",
    "stocks",
    "bond",
    "bonds",
    "cash",
    "convertible",
    "other",
    "equity",
    "debt",
}

STYLE_KEYWORDS = (
    "large value",
    "large blend",
    "large growth",
    "mid value",
    "mid blend",
    "mid growth",
    "small value",
    "small blend",
    "small growth",
)

RISK_FIELD_MAP = {
    "alpha": "alpha",
    "beta": "beta",
    "r-squared": "r_squared",
    "r squared": "r_squared",
    "sharpe ratio": "sharpe",
    "sortino ratio": "sortino",
    "treynor ratio": "treynor",
    "standard deviation": "stddev",
    "upside capture ratio": "upside_capture",
    "downside capture ratio": "downside_capture",
}

SAL_BASE_URL = "https://www.us-api.morningstar.com/sal/sal-service"
SAL_DEFAULT_CLIENT_ID = "RSIN_SAL"
SAL_DEFAULT_ENV = "prod"
SAL_DEFAULT_USER_TYPE = "premium"
SAL_DEFAULT_CONTENT_TYPES = {
    "free": "e7FDDltrTy+tA2HnLovvGL0LFMwT+KkEptGju5wXVTU=",
    "premium": "nNsGdN3REOnPMlKDShOYjlk6VYiEVLSdpfpXAm7o2Tk=",
}

SAL_ANNUAL_VERSION = "4.81.0"
SAL_RISK_PORTFOLIO_VERSION = "3.73.0"

SAL_TRAILING_PERIOD_MAP = {
    "1Day": "1D",
    "1Week": "1W",
    "1Month": "1M",
    "3Month": "3M",
    "6Month": "6M",
    "YearToDate": "YTD",
    "1Year": "1Y",
    "3Year": "3Y",
    "5Year": "5Y",
    "10Year": "10Y",
    "15Year": "15Y",
    "SinceInception": "SI",
    "EarliestAvailable": "EA",
}

ASSET_ALLOCATION_KEY_MAP = {
    "INDAssetAllocStock": "Stock",
    "INDAssetAllocConvertible": "Convertible",
    "INDAssetAllocBond": "Bond",
    "INDAssetAllocCash": "Cash",
    "INDAssetAllocOther": "Other",
    "INDAssetAllocPreferred": "Preferred",
}

STYLE_BOX_LABEL_MAP = {
    1: "Large Value",
    2: "Large Blend",
    3: "Large Growth",
    4: "Mid Value",
    5: "Mid Blend",
    6: "Mid Growth",
    7: "Small Value",
    8: "Small Blend",
    9: "Small Growth",
}

SAL_PERFORMANCE_LABEL_MAP = {
    "fund": "fund",
    "category": "category",
    "index": "benchmark",
    "percentileRank": "percentile_rank",
    "fundNumber": "peer_count",
    "categoryName": "category_name",
    "categoryNameAbbr": "category_code",
}


def normalize_space(value: Optional[str]) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def maybe_float(value: Any) -> Optional[float]:
    if value is None:
        return None
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    text = normalize_space(value)
    if not text or text in {"-", "--", "N/A", "NA", "n.a."}:
        return None
    text = text.replace("%", "").replace(",", "").replace("₹", "").replace("x", "")
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    if not match:
        return None
    try:
        return float(match.group(0))
    except ValueError:
        return None


def maybe_int(value: Any) -> Optional[int]:
    numeric = maybe_float(value)
    if numeric is None:
        return None
    try:
        return int(numeric)
    except (TypeError, ValueError):
        return None


def iso_to_date_string(value: Any) -> Optional[str]:
    if value is None:
        return None
    text = normalize_space(str(value))
    if not text:
        return None
    if "T" in text:
        return text.split("T", 1)[0]
    return text


def json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=True, sort_keys=True)


def extract_morningstar_fund_id(url: str) -> Optional[str]:
    match = FUND_ID_RE.search(url or "")
    return match.group(1).lower() if match else None


def extract_fund_house_slug(url: str) -> Optional[str]:
    match = FUND_HOUSE_RE.search(url or "")
    return match.group(1).lower() if match else None


def canonicalize_scheme_url(url: str) -> str:
    parsed = urlparse(url)
    clean = parsed._replace(query="", fragment="")
    return clean.geturl()


def parse_fund_house_links(html: str, base_url: str) -> List[Dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    records: List[Dict[str, str]] = []
    seen: set[str] = set()
    reserved = {"fundshome", "fundslist"}
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"]
        slug = extract_fund_house_slug(href)
        if not slug or slug in reserved:
            continue
        full_url = urljoin(base_url, href)
        if full_url in seen:
            continue
        seen.add(full_url)
        records.append({
            "fund_house_slug": slug,
            "fund_house_name": normalize_space(anchor.get_text(" ", strip=True)),
            "url": full_url,
        })
    return records


def _extract_context_metadata(text: str) -> Dict[str, Any]:
    patterns = {
        "category_name": r"Category\s*:\s*(.*?)(?=\s+Distribution Type\s*:|\s+Structure\s*:|\s+Latest NAV\s*:|$)",
        "distribution_type": r"Distribution Type\s*:\s*(.*?)(?=\s+Structure\s*:|\s+Latest NAV\s*:|$)",
        "structure": r"Structure\s*:\s*(.*?)(?=\s+Latest NAV\s*:|\s+NAV Date\s*:|$)",
        "latest_nav": r"Latest NAV\s*:\s*([0-9.,]+)",
        "nav_date": r"NAV Date\s*:\s*([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})",
        "benchmark_name": r"(?:Benchmark|Index)\s*:\s*(.*?)(?=\s+[A-Z][a-z]+?\s*:|$)",
    }
    parsed: Dict[str, Any] = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, text, flags=re.I)
        if not match:
            continue
        parsed[key] = normalize_space(match.group(1))
    parsed["latest_nav"] = maybe_float(parsed.get("latest_nav"))
    return parsed


def parse_directory_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    fund_house_name = ""
    heading = soup.find(["h1", "h2"])
    if heading:
        fund_house_name = normalize_space(heading.get_text(" ", strip=True))
    rows: List[Dict[str, Any]] = []
    seen: set[str] = set()
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"]
        if "/mutualfunds/" not in href.lower() or "overview.aspx" not in href.lower():
            continue
        full_url = canonicalize_scheme_url(urljoin(page_url, href))
        fund_id = extract_morningstar_fund_id(full_url)
        if not fund_id or full_url in seen:
            continue
        seen.add(full_url)
        row_container = anchor.find_parent("tr")
        context_text = ""
        if row_container:
            cells = [normalize_space(cell.get_text(" ", strip=True)) for cell in row_container.find_all(["td", "th"])]
            if len(cells) >= 6:
                rows.append({
                    "morningstar_fund_id": fund_id,
                    "scheme_name": normalize_space(anchor.get_text(" ", strip=True)),
                    "scheme_url": full_url,
                    "category_name": cells[1] or None,
                    "distribution_type": cells[2] or None,
                    "structure": cells[3] or None,
                    "latest_nav": maybe_float(cells[4]),
                    "nav_date": cells[5] or None,
                })
                continue
            context_text = normalize_space(row_container.get_text(" ", strip=True))
        else:
            parent = anchor.find_parent(["li", "div", "p"]) or anchor.parent
            context_text = normalize_space(parent.get_text(" ", strip=True))
        meta = _extract_context_metadata(context_text)
        rows.append({
            "morningstar_fund_id": fund_id,
            "scheme_name": normalize_space(anchor.get_text(" ", strip=True)),
            "scheme_url": full_url,
            **meta,
        })
    return {
        "fund_house_slug": extract_fund_house_slug(page_url),
        "fund_house_name": fund_house_name,
        "rows": rows,
    }


def build_tab_urls(overview_url: str) -> Dict[str, str]:
    base = overview_url.rsplit("/", 1)[0] + "/"
    return {key: urljoin(base, suffix) for key, suffix in TAB_KEYS.items()}


def parse_overview_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    fund_name_node = soup.find(id=re.compile(r"lblFundname$", re.I))
    isin_node = soup.find(id=re.compile(r"lblISIN$", re.I))
    heading = soup.find(["h1", "title"])
    heading_text = normalize_space(heading.get_text(" ", strip=True)) if heading else ""
    heading_text = heading_text.split("|")[0].strip()
    if fund_name_node:
        scheme_name = normalize_space(fund_name_node.get_text(" ", strip=True))
    else:
        isin_match = ISIN_RE.search(heading_text)
        isin_in_heading = isin_match.group(1) if isin_match else None
        scheme_name = normalize_space(heading_text.replace(isin_in_heading or "", "").strip()) if isin_in_heading else heading_text
    isin_text = normalize_space(isin_node.get_text(" ", strip=True)) if isin_node else ""
    isin_match = ISIN_RE.search(isin_text or heading_text)
    isin = isin_match.group(1) if isin_match else None
    tabs = build_tab_urls(canonicalize_scheme_url(page_url))
    for anchor in soup.find_all("a", href=True):
        href = canonicalize_scheme_url(urljoin(page_url, anchor["href"]))
        match = FUND_PATH_RE.search(href)
        if not match:
            continue
        tab_name = match.group("tab").lower()
        for key, suffix in TAB_KEYS.items():
            if suffix.startswith(tab_name):
                tabs[key] = href
                break
    text = normalize_space(soup.get_text(" ", strip=True))
    meta = _extract_context_metadata(text)
    amc_name = ""
    parsed_title = urlparse(page_url).path.strip("/").split("/")
    if len(parsed_title) >= 2 and parsed_title[0].lower() == "mutualfunds":
        amc_name = ""
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "scheme_name": scheme_name or None,
        "isin": isin,
        "amc_name": amc_name or None,
        "tabs": tabs,
        **meta,
    }


def extract_sal_fund_config_url(html: str, page_url: str) -> Optional[str]:
    soup = BeautifulSoup(html, "html.parser")
    for script in soup.find_all("script", src=True):
        src = normalize_space(script.get("src"))
        if "fund.config.js" in src:
            return urljoin(page_url, src)
    return None


def parse_sal_runtime_js(js_text: str) -> Dict[str, Any]:
    parsed = {
        "client_id": SAL_DEFAULT_CLIENT_ID,
        "demo_env": SAL_DEFAULT_ENV,
        "demo_user_type": SAL_DEFAULT_USER_TYPE,
        "content_types": dict(SAL_DEFAULT_CONTENT_TYPES),
    }
    env_match = re.search(r"var\s+DEMO_ENV\s*=\s*'([^']+)'", js_text)
    user_type_match = re.search(r"var\s+DEMO_USER_TYPE\s*=\s*'([^']+)'", js_text)
    if env_match:
        parsed["demo_env"] = normalize_space(env_match.group(1))
    if user_type_match:
        parsed["demo_user_type"] = normalize_space(user_type_match.group(1))
    for match in re.finditer(r"(free|premium)\s*:\s*'([^']+)'", js_text):
        parsed["content_types"][match.group(1)] = match.group(2)
    return parsed


def parse_sal_page_context(html: str, page_url: str, runtime: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
    runtime = runtime or {}
    soup = BeautifulSoup(html, "html.parser")
    meta = {
        normalize_space(tag.get("name")): normalize_space(tag.get("content"))
        for tag in soup.find_all("meta")
        if tag.get("name")
    }
    sec_id = meta.get("Ticker")
    access_token = meta.get("accessToken")
    if not sec_id or not access_token:
        return None
    client_id_match = re.search(r"id:\s*'([^']+)'", html)
    client_id = normalize_space(client_id_match.group(1)) if client_id_match else runtime.get("client_id") or SAL_DEFAULT_CLIENT_ID
    demo_user_type = runtime.get("demo_user_type") or SAL_DEFAULT_USER_TYPE
    content_types = runtime.get("content_types") or SAL_DEFAULT_CONTENT_TYPES
    return {
        "sec_id": sec_id,
        "sec_type": meta.get("TickerType"),
        "access_token": access_token,
        "realtime_token": meta.get("realTimeToken"),
        "client_id": client_id,
        "demo_user_type": demo_user_type,
        "sal_content_type": content_types.get(demo_user_type) or SAL_DEFAULT_CONTENT_TYPES[SAL_DEFAULT_USER_TYPE],
        "config_url": extract_sal_fund_config_url(html, page_url),
        "source_page_url": canonicalize_scheme_url(page_url),
        "user_type": meta.get("UserType"),
    }


def build_sal_endpoint_urls(context: Dict[str, Any]) -> Dict[str, str]:
    sec_id = context["sec_id"]
    client_id = context.get("client_id") or SAL_DEFAULT_CLIENT_ID
    return {
        "quote": (
            f"{SAL_BASE_URL}/fund/quote/v7/{sec_id}/data"
            f"?fundServCode=&showAnalystRatingChinaFund=false&showAnalystRating=false&hideesg=true"
            f"&region=&locale=en&clientId={client_id}&benchmarkId=mstarorcat"
            f"&version={SAL_ANNUAL_VERSION}&secId={sec_id}"
        ),
        "performance_chart": (
            f"{SAL_BASE_URL}/fund/performance/v5/{sec_id}"
            f"?secExchangeList=&limitAge=&hideYTD=false&locale=en&clientId={client_id}"
            f"&benchmarkId=mstarorcat&version={SAL_ANNUAL_VERSION}&secId={sec_id}"
        ),
        "performance_table": (
            f"{SAL_BASE_URL}/fund/performance/table/{sec_id}"
            f"?secExchangeList=&limitAge=&hideYTD=false&locale=en&clientId={client_id}"
            f"&benchmarkId=mstarorcat&version={SAL_ANNUAL_VERSION}&secId={sec_id}"
        ),
        "trailing_returns": (
            f"{SAL_BASE_URL}/fund/trailingReturn/v3/{sec_id}/data"
            f"?duration=daily&limitAge=&locale=en&clientId={client_id}"
            f"&benchmarkId=mstarorcat&version={SAL_ANNUAL_VERSION}&secId={sec_id}"
        ),
        "asset_allocation": (
            f"{SAL_BASE_URL}/fund/process/asset/v3/{sec_id}/data"
            f"?benchmarkId=category&component=assetAllocation&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR&secId={sec_id}"
        ),
        "ownership_zone": (
            f"{SAL_BASE_URL}/fund/process/ownershipZone/{sec_id}/data"
            f"?benchmarkId=category&component=stockStyle&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR&secId={sec_id}"
        ),
        "people": (
            f"{SAL_BASE_URL}/fund/people/{sec_id}/data"
            f"?component=people&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR&secId={sec_id}"
        ),
        "risk_summary": (
            f"{SAL_BASE_URL}/fund/performance/riskReturnSummary/{sec_id}/data"
            f"?benchmarkId=category&component=risk&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR"
            f"&removeGIPSFromStaticData=true&secId={sec_id}"
        ),
        "risk_volatility": (
            f"{SAL_BASE_URL}/fund/performance/riskVolatility/{sec_id}/data"
            f"?benchmarkId=category&component=riskVolatility&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR"
            f"&removeGIPSFromStaticData=true&longestTenure=false&secId={sec_id}"
        ),
        "risk_scatter": (
            f"{SAL_BASE_URL}/fund/performance/riskReturnScatterplot/{sec_id}/data"
            f"?benchmarkId=category&component=riskScatterPlot&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR"
            f"&removeGIPSFromStaticData=true&longestTenure=false&secId={sec_id}"
        ),
        "market_volatility": (
            f"{SAL_BASE_URL}/fund/performance/marketVolatilityMeasure/{sec_id}/data"
            f"?benchmarkId=category&component=marketVolatilityMeasure&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR"
            f"&removeGIPSFromStaticData=true&year=3&longestTenure=false&secId={sec_id}"
        ),
        "holdings": (
            f"{SAL_BASE_URL}/fund/portfolio/holding/v2/{sec_id}/data"
            f"?benchmarkId=category&component=holding&version={SAL_RISK_PORTFOLIO_VERSION}"
            f"&languageId=en&locale=en-IN&clientId={client_id}&currencyId=INR&secId={sec_id}"
        ),
    }


def _coalesce(*values: Any) -> Any:
    for value in values:
        if value is None:
            continue
        if isinstance(value, str) and not normalize_space(value):
            continue
        return value
    return None


def _infer_distribution_type(scheme_name: Optional[str], existing: Optional[str] = None) -> Optional[str]:
    if existing:
        return existing
    name = normalize_space(scheme_name).lower()
    if not name:
        return None
    if "idcw" in name:
        return "IDCW"
    if "dividend" in name:
        return "Dividend"
    if "growth" in name:
        return "Growth"
    return None


def _infer_structure(status: Any, existing: Optional[str] = None) -> Optional[str]:
    if existing:
        return existing
    text = normalize_space(str(status or "")).lower()
    if not text:
        return None
    if "open" in text:
        return "Open Ended"
    if "close" in text:
        return "Closed Ended"
    if "interval" in text:
        return "Interval"
    return None


def _build_manager_name(entry: Dict[str, Any]) -> Optional[str]:
    parts = [
        normalize_space(entry.get("givenName")),
        normalize_space(entry.get("middleName")),
        normalize_space(entry.get("familyName")),
    ]
    name = normalize_space(" ".join([part for part in parts if part]))
    return name or None


def _format_tenure_years(value: Any) -> Optional[str]:
    numeric = maybe_float(value)
    if numeric is None:
        return None
    return f"{numeric:.2f} years"


def _append_characteristic(items: List[Dict[str, Any]], name: str, value: Any) -> None:
    if value is None:
        return
    text = normalize_space(str(value))
    if not text:
        return
    items.append({"characteristic_name": name, "characteristic_value": text})


def _labeled_series_map(items: Any) -> Dict[str, Any]:
    series_map: Dict[str, Any] = {}
    for entry in items or []:
        label = normalize_space(str((entry or {}).get("label")))
        if label:
            series_map[label] = entry
    return series_map


def _percentile_to_quartile(value: Any) -> Optional[str]:
    rank = maybe_int(value)
    if rank is None or rank <= 0:
        return None
    if rank <= 25:
        return "1"
    if rank <= 50:
        return "2"
    if rank <= 75:
        return "3"
    return "4"


def _preferred_risk_period(payload: Dict[str, Any]) -> Optional[str]:
    sections = payload.get("fundRiskVolatility") or {}
    for key in ("for3Year", "for5Year", "for10Year", "for1Year", "for15Year"):
        if sections.get(key):
            return key
    return None


def parse_sal_people_json(people_payload: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    if not people_payload:
        return {"managers": [], "amc_name": None, "manager_summary": {}}

    managers: List[Dict[str, Any]] = []
    current = people_payload.get("currentManagerList") or []
    past = people_payload.get("pastManagerList") or []
    current_tenure = _format_tenure_years(
        people_payload.get("averageManagerTenure") if len(current) == 1 else people_payload.get("longestManagerTenure")
    )
    for entry in current:
        name = _build_manager_name(entry)
        if not name:
            continue
        managers.append({
            "manager_name": name,
            "role": "Current Manager",
            "start_date": iso_to_date_string(entry.get("startDate")),
            "end_date": iso_to_date_string(entry.get("endDate")),
            "tenure_years_text": current_tenure,
        })
    for entry in past:
        name = _build_manager_name(entry)
        if not name:
            continue
        managers.append({
            "manager_name": name,
            "role": "Past Manager",
            "start_date": iso_to_date_string(entry.get("startDate")),
            "end_date": iso_to_date_string(entry.get("endDate")),
            "tenure_years_text": None,
        })
    return {
        "managers": managers,
        "amc_name": people_payload.get("advisorType"),
        "manager_summary": {
            "inception_date": iso_to_date_string(people_payload.get("inceptionDate")),
            "average_manager_tenure": maybe_float(people_payload.get("averageManagerTenure")),
            "longest_manager_tenure": maybe_float(people_payload.get("longestManagerTenure")),
            "manager_count": maybe_int(people_payload.get("managerCount")),
            "longest_tenure_start_date": iso_to_date_string(people_payload.get("longestTenureStartDate")),
            "last_turnover_ratio": maybe_float(people_payload.get("lastTurnoverRatio")),
            "advisor_name": people_payload.get("advisorType"),
        },
    }


def parse_sal_overview_json(
    quote_payload: Optional[Dict[str, Any]],
    people_payload: Optional[Dict[str, Any]] = None,
    fallback: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    overview = dict(fallback or {})
    quote_payload = quote_payload or {}
    people_info = parse_sal_people_json(people_payload)
    overview.update({
        "scheme_name": _coalesce(quote_payload.get("investmentName"), overview.get("scheme_name")),
        "isin": _coalesce(quote_payload.get("isin"), overview.get("isin")),
        "amc_name": _coalesce(people_info.get("amc_name"), overview.get("amc_name")),
        "category_name": _coalesce(quote_payload.get("categoryName"), overview.get("category_name")),
        "distribution_type": _infer_distribution_type(
            _coalesce(quote_payload.get("investmentName"), overview.get("scheme_name")),
            overview.get("distribution_type"),
        ),
        "structure": _infer_structure(quote_payload.get("status"), overview.get("structure")),
        "latest_nav": _coalesce(maybe_float(quote_payload.get("nav")), overview.get("latest_nav")),
        "nav_date": _coalesce(
            iso_to_date_string(quote_payload.get("trailing1DayReturnAsOfDate")),
            iso_to_date_string(quote_payload.get("returnEndDate")),
            overview.get("nav_date"),
        ),
        "benchmark_name": _coalesce(
            quote_payload.get("prospectusBenchmarkName"),
            quote_payload.get("primaryIndexNameNew"),
            quote_payload.get("index"),
            overview.get("benchmark_name"),
        ),
    })
    style_box_label = STYLE_BOX_LABEL_MAP.get(maybe_int(quote_payload.get("equityStyleBox")) or 0)
    overview["overview_stats"] = {
        "category_name": quote_payload.get("categoryName"),
        "status": quote_payload.get("status"),
        "template": quote_payload.get("template"),
        "minimum_initial_investment": maybe_float(quote_payload.get("minimumInitialInvestment")),
        "monthly_net_expense_ratio": maybe_float(quote_payload.get("monthlyNetExpenseRatio")),
        "annual_report_net_expense_ratio": maybe_float(quote_payload.get("annualReportNetExpenseRatio")),
        "expense_ratio": maybe_float(quote_payload.get("expenseRatio")),
        "turnover_ratio": maybe_float(quote_payload.get("lastTurnoverRatio")),
        "total_assets": maybe_float(quote_payload.get("tNAInShareClassCurrency")),
        "style_box_label": style_box_label,
        "ttm_yield": maybe_float(quote_payload.get("sECYield")),
        "inception_date": iso_to_date_string(quote_payload.get("inceptionDate")),
        "medalist_rating": quote_payload.get("medalistRating"),
        "data_coverage": maybe_int(quote_payload.get("dataCoverage")),
        "parent_score": maybe_float(quote_payload.get("parentScore")),
        "people_score": maybe_float(quote_payload.get("peopleScore")),
        "process_score": maybe_float(quote_payload.get("processScore")),
    }
    return overview


def parse_sal_performance_json(
    performance_chart_payload: Optional[Dict[str, Any]],
    trailing_payload: Optional[Dict[str, Any]],
    performance_table_payload: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    performance_chart_payload = performance_chart_payload or {}
    trailing_payload = trailing_payload or {}
    performance_table_payload = performance_table_payload or performance_chart_payload or {}
    annual_table = (performance_table_payload or {}).get("table") or {}
    annual_columns = annual_table.get("columnDefs") or []
    annual_series = _labeled_series_map(annual_table.get("growth10KReturnData"))
    calendar_returns: List[Dict[str, Any]] = []
    for idx, period_label in enumerate(annual_columns):
        if not re.match(r"^(19|20)\d{2}$", str(period_label)):
            continue
        fund_values = annual_series.get("fund", {}).get("datum") or []
        category_values = annual_series.get("category", {}).get("datum") or []
        benchmark_values = annual_series.get("index", {}).get("datum") or []
        calendar_returns.append({
            "period_kind": "YEAR",
            "period_label": str(period_label),
            "fund_return": maybe_float(fund_values[idx] if idx < len(fund_values) else None),
            "category_return": maybe_float(category_values[idx] if idx < len(category_values) else None),
            "benchmark_return": maybe_float(benchmark_values[idx] if idx < len(benchmark_values) else None),
        })

    trailing_returns: List[Dict[str, Any]] = []
    trailing_columns = trailing_payload.get("columnDefs") or []
    fund_series = trailing_payload.get("totalReturnNAV") or []
    category_series = trailing_payload.get("totalReturnCategoryNew") or trailing_payload.get("totalReturnCategory") or []
    benchmark_series = trailing_payload.get("totalReturnIndexNew") or trailing_payload.get("totalReturnIndex") or []
    percentile_series = trailing_payload.get("returnRank") or []
    peer_series = trailing_payload.get("fundNumber") or []
    as_of_date = iso_to_date_string(
        trailing_payload.get("fundReturnDate")
        or performance_chart_payload.get("asOfDate")
        or performance_table_payload.get("asOfDate")
    )
    for idx, label in enumerate(trailing_columns):
        horizon_code = SAL_TRAILING_PERIOD_MAP.get(str(label))
        if not horizon_code:
            continue
        percentile_rank = maybe_float(percentile_series[idx] if idx < len(percentile_series) else None)
        trailing_returns.append({
            "as_of_date": as_of_date,
            "horizon_code": horizon_code,
            "fund_return": maybe_float(fund_series[idx] if idx < len(fund_series) else None),
            "category_return": maybe_float(category_series[idx] if idx < len(category_series) else None),
            "benchmark_return": maybe_float(benchmark_series[idx] if idx < len(benchmark_series) else None),
            "rank": None,
            "quartile": _percentile_to_quartile(percentile_rank),
            "percentile_rank": percentile_rank,
            "peer_count": maybe_int(peer_series[idx] if idx < len(peer_series) else None),
        })

    return {
        "as_of_date": as_of_date,
        "growth_of_10000": performance_chart_payload.get("graphData") or {},
        "annual_table": {
            "columns": annual_columns,
            "series": {
                SAL_PERFORMANCE_LABEL_MAP.get(label, label): entry.get("datum")
                for label, entry in annual_series.items()
            },
        },
        "trailing_returns": trailing_returns,
        "calendar_returns": calendar_returns,
        "monthly_returns": [],
        "quarterly_returns": [],
    }


def parse_sal_risk_json(
    quote_payload: Optional[Dict[str, Any]],
    risk_volatility_payload: Optional[Dict[str, Any]],
    risk_summary_payload: Optional[Dict[str, Any]],
    market_volatility_payload: Optional[Dict[str, Any]],
    risk_scatter_payload: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    quote_payload = quote_payload or {}
    risk_volatility_payload = risk_volatility_payload or {}
    risk_summary_payload = risk_summary_payload or {}
    market_volatility_payload = market_volatility_payload or {}
    selected_period = _preferred_risk_period(risk_volatility_payload)
    selected_metrics = ((risk_volatility_payload.get("fundRiskVolatility") or {}).get(selected_period or "")) or {}
    market_metrics = ((market_volatility_payload.get("measureMap") or {}).get("fund")) or {}
    metrics = {
        "alpha": maybe_float(selected_metrics.get("alpha")),
        "beta": maybe_float(selected_metrics.get("beta")),
        "r_squared": maybe_float(selected_metrics.get("rSquared")),
        "sharpe": maybe_float(selected_metrics.get("sharpeRatio")),
        "sortino": None,
        "treynor": None,
        "stddev": maybe_float(selected_metrics.get("standardDeviation")),
        "upside_capture": maybe_float(market_metrics.get("upside")),
        "downside_capture": maybe_float(market_metrics.get("downside")),
        "morningstar_risk_label": None,
        "star_rating": maybe_float(_coalesce(quote_payload.get("morningstarRating"), quote_payload.get("overallMorningstarRating"))),
    }
    return {
        "as_of_date": iso_to_date_string(
            risk_summary_payload.get("endDate")
            or market_volatility_payload.get("maxDrawDownAsOfDate")
            or quote_payload.get("morningstarRatingAsOfDate")
        ),
        "selected_period": selected_period,
        "risk_metrics": metrics,
        "risk_summary": risk_summary_payload,
        "market_volatility": market_volatility_payload,
        "risk_scatter": risk_scatter_payload or {},
        "risk_volatility": risk_volatility_payload,
    }


def parse_sal_portfolio_json(
    quote_payload: Optional[Dict[str, Any]],
    asset_payload: Optional[Dict[str, Any]],
    ownership_zone_payload: Optional[Dict[str, Any]],
    people_payload: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    quote_payload = quote_payload or {}
    asset_payload = asset_payload or {}
    ownership_zone_payload = ownership_zone_payload or {}
    people_info = parse_sal_people_json(people_payload)

    asset_allocation: List[Dict[str, Any]] = []
    for source_key, bucket_name in ASSET_ALLOCATION_KEY_MAP.items():
        row = (asset_payload.get("allocationMap") or {}).get(source_key) or {}
        asset_allocation.append({
            "asset_bucket": bucket_name,
            "weight_pct": maybe_float(row.get("netAllocation")),
        })

    style_box_label = STYLE_BOX_LABEL_MAP.get(maybe_int(quote_payload.get("equityStyleBox")) or 0)
    style_box = [{"style_dimension": style_box_label, "weight_pct": 100.0}] if style_box_label else []

    characteristics: List[Dict[str, Any]] = []
    _append_characteristic(characteristics, "Asset Type", asset_payload.get("assetType"))
    _append_characteristic(characteristics, "Category", _coalesce(quote_payload.get("categoryName"), asset_payload.get("categoryName")))
    _append_characteristic(characteristics, "Benchmark", _coalesce(quote_payload.get("primaryIndexNameNew"), asset_payload.get("indexName"), quote_payload.get("index")))
    _append_characteristic(characteristics, "Total Assets", quote_payload.get("tNAInShareClassCurrency"))
    _append_characteristic(characteristics, "Minimum Initial Investment", quote_payload.get("minimumInitialInvestment"))
    _append_characteristic(characteristics, "Monthly Net Expense Ratio", quote_payload.get("monthlyNetExpenseRatio"))
    _append_characteristic(characteristics, "Annual Report Net Expense Ratio", quote_payload.get("annualReportNetExpenseRatio"))
    _append_characteristic(characteristics, "Turnover", _coalesce(quote_payload.get("lastTurnoverRatio"), (people_info.get("manager_summary") or {}).get("last_turnover_ratio")))
    _append_characteristic(characteristics, "Status", quote_payload.get("status"))
    _append_characteristic(characteristics, "Inception Date", iso_to_date_string(quote_payload.get("inceptionDate")))
    _append_characteristic(characteristics, "Equity Style Box", style_box_label)
    fund_zone = (ownership_zone_payload.get("fund") or {})
    _append_characteristic(characteristics, "Ownership Zone Size Score", fund_zone.get("scaledSizeScore"))
    _append_characteristic(characteristics, "Ownership Zone Style Score", fund_zone.get("scaledStyleScore"))
    _append_characteristic(characteristics, "Ownership Zone 75 Percentile", fund_zone.get("objectZone75Percentile"))
    _append_characteristic(characteristics, "Average Manager Tenure", (people_info.get("manager_summary") or {}).get("average_manager_tenure"))

    return {
        "as_of_date": iso_to_date_string(
            asset_payload.get("portfolioDate")
            or fund_zone.get("portfolioDate")
            or quote_payload.get("returnEndDate")
        ),
        "asset_allocation": asset_allocation,
        "style_box": style_box,
        "characteristics": characteristics,
        "managers": people_info.get("managers", []),
        "manager_summary": people_info.get("manager_summary", {}),
        "ownership_zone": ownership_zone_payload,
    }


def parse_sal_holdings_json(holdings_payload: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    holdings_payload = holdings_payload or {}
    holdings: List[Dict[str, Any]] = []
    rank = 1
    for page_key, default_kind in (
        ("equityHoldingPage", "Equity"),
        ("bondHoldingPage", "Bond"),
        ("boldHoldingPage", "Bond"),
        ("otherHoldingPage", "Other"),
    ):
        page = holdings_payload.get(page_key) or {}
        for entry in page.get("holdingList") or []:
            holding_name = _coalesce(entry.get("securityName"), entry.get("name"))
            if not holding_name:
                continue
            holdings.append({
                "holding_name": normalize_space(str(holding_name)),
                "holding_type": _coalesce(entry.get("holdingType"), default_kind),
                "holding_isin": entry.get("isin"),
                "holding_ticker": entry.get("ticker"),
                "weight_pct": maybe_float(entry.get("weighting")),
                "market_value": maybe_float(entry.get("marketValue")),
                "share_count": maybe_float(entry.get("numberOfShare")),
                "sector": entry.get("sector"),
                "country": entry.get("country"),
                "rank": rank,
            })
            rank += 1
    return {
        "as_of_date": iso_to_date_string((holdings_payload.get("holdingSummary") or {}).get("portfolioDate")),
        "holdings": holdings,
        "holding_summary": holdings_payload.get("holdingSummary") or {},
    }


def parse_html_tables(html: str) -> List[Dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    tables: List[Dict[str, Any]] = []
    for index, table in enumerate(soup.find_all("table")):
        headers: List[str] = []
        rows: List[List[str]] = []
        title = ""
        caption = table.find("caption")
        if caption:
            title = normalize_space(caption.get_text(" ", strip=True))
        if not title:
            prev_heading = table.find_previous(["h1", "h2", "h3", "h4", "h5", "strong"])
            if prev_heading:
                title = normalize_space(prev_heading.get_text(" ", strip=True))
        for tr in table.find_all("tr"):
            cells = [normalize_space(cell.get_text(" ", strip=True)) for cell in tr.find_all(["th", "td"])]
            if not cells:
                continue
            if tr.find_all("th") and not headers:
                headers = cells
            else:
                rows.append(cells)
        if rows:
            # Ignore Morningstar's generic feedback stub table, which is present
            # on shell pages before widget content loads.
            flattened = [normalize_space(cell) for row in rows for cell in row]
            if flattened and all(cell.lower() == "feedback" for cell in flattened):
                continue
            tables.append({
                "table_index": index,
                "title": title,
                "headers": headers,
                "rows": rows,
            })
    return tables


def _classify_return_table(table: Dict[str, Any]) -> str:
    title = normalize_space(table.get("title", "")).lower()
    headers = [normalize_space(h).lower() for h in table.get("headers", [])]
    first_col = normalize_space(table["rows"][0][0]).lower() if table.get("rows") else ""
    if "monthly" in title or re.match(r"jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec", first_col):
        return "MONTHLY"
    if "quarter" in title or re.match(r"q[1-4]|fy\d{2}", first_col):
        return "QUARTERLY"
    if "calendar" in title or re.match(r"(19|20)\d{2}$", first_col):
        return "CALENDAR"
    if any(key in headers for key in ("fund", "category", "benchmark", "index")):
        return "TRAILING"
    return "OTHER"


def parse_performance_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    trailing_returns: List[Dict[str, Any]] = []
    calendar_returns: List[Dict[str, Any]] = []
    monthly_returns: List[Dict[str, Any]] = []
    quarterly_returns: List[Dict[str, Any]] = []
    for table in tables:
        table_kind = _classify_return_table(table)
        headers = [normalize_space(h).lower() for h in table.get("headers", [])]
        if table_kind == "TRAILING":
            for row in table.get("rows", []):
                if not row:
                    continue
                horizon_key = normalize_space(row[0]).lower()
                horizon_code = RETURN_HORIZON_MAP.get(horizon_key)
                if not horizon_code:
                    continue
                values = {headers[idx]: row[idx] for idx in range(min(len(headers), len(row)))} if headers else {}
                trailing_returns.append({
                    "horizon_code": horizon_code,
                    "fund_return": maybe_float(values.get("fund") or values.get("return") or (row[1] if len(row) > 1 else None)),
                    "category_return": maybe_float(values.get("category") or values.get("category avg") or values.get("category average")),
                    "benchmark_return": maybe_float(values.get("benchmark") or values.get("index")),
                    "rank": maybe_float(values.get("rank")),
                    "quartile": values.get("quartile"),
                    "percentile_rank": maybe_float(values.get("% rank") or values.get("percentage rank") or values.get("percentile rank")),
                    "peer_count": int(maybe_float(values.get("# of invest. in category") or values.get("peer count") or values.get("number of funds")) or 0) or None,
                })
        elif table_kind == "CALENDAR":
            for row in table.get("rows", []):
                if not row:
                    continue
                label = normalize_space(row[0])
                if not re.match(r"(19|20)\d{2}$", label):
                    continue
                calendar_returns.append({
                    "period_kind": "YEAR",
                    "period_label": label,
                    "fund_return": maybe_float(row[1] if len(row) > 1 else None),
                    "category_return": maybe_float(row[2] if len(row) > 2 else None),
                    "benchmark_return": maybe_float(row[3] if len(row) > 3 else None),
                })
        elif table_kind == "MONTHLY":
            for row in table.get("rows", []):
                if row:
                    monthly_returns.append({"cells": row})
        elif table_kind == "QUARTERLY":
            for row in table.get("rows", []):
                if row:
                    quarterly_returns.append({"cells": row})
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "trailing_returns": trailing_returns,
        "calendar_returns": calendar_returns,
        "monthly_returns": monthly_returns,
        "quarterly_returns": quarterly_returns,
    }


def parse_risk_page(html: str, page_url: str) -> Dict[str, Any]:
    text = normalize_space(BeautifulSoup(html, "html.parser").get_text(" ", strip=True))
    tables = parse_html_tables(html)
    metrics: Dict[str, Any] = {}
    for table in tables:
        for row in table.get("rows", []):
            if len(row) < 2:
                continue
            label = normalize_space(row[0]).lower()
            for key, target in RISK_FIELD_MAP.items():
                if key in label:
                    metrics[target] = maybe_float(row[1])
                    break
    risk_label_match = re.search(r"Morningstar Risk\s*(?:Indicates|:)?\s*(Low|Below Average|Average|Above Average|High)", text, flags=re.I)
    star_match = re.search(r"Star Rating\s*:?\s*([0-5](?:\.\d+)?)", text, flags=re.I)
    if risk_label_match:
        metrics["morningstar_risk_label"] = normalize_space(risk_label_match.group(1))
    if star_match:
        metrics["star_rating"] = maybe_float(star_match.group(1))
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "risk_metrics": metrics,
        "tables": tables,
    }


def parse_portfolio_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    asset_allocation: List[Dict[str, Any]] = []
    style_box: List[Dict[str, Any]] = []
    characteristics: List[Dict[str, Any]] = []
    managers: List[Dict[str, Any]] = []
    for table in tables:
        for row in table.get("rows", []):
            if len(row) < 2:
                continue
            label = normalize_space(row[0])
            lower = label.lower()
            value = row[1]
            if lower in ASSET_BUCKETS:
                asset_allocation.append({"asset_bucket": label, "weight_pct": maybe_float(value)})
            elif lower in STYLE_KEYWORDS:
                style_box.append({"style_dimension": label, "weight_pct": maybe_float(value)})
            elif "manager" in lower or "tenure" in lower:
                managers.append({"label": label, "value": value})
            else:
                characteristics.append({"characteristic_name": label, "characteristic_value": value})
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "asset_allocation": asset_allocation,
        "style_box": style_box,
        "characteristics": characteristics,
        "managers": managers,
    }


def parse_holdings_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    holdings: List[Dict[str, Any]] = []
    for table in tables:
        headers = [normalize_space(h).lower() for h in table.get("headers", [])]
        name_idx = 0
        weight_idx = None
        if headers:
            for idx, header in enumerate(headers):
                if "weight" in header or "%" in header or "assets" in header:
                    weight_idx = idx
                    break
        for rank, row in enumerate(table.get("rows", []), start=1):
            if not row:
                continue
            name = normalize_space(row[name_idx]) if len(row) > name_idx else ""
            if not name or name.lower() in {"name", "security", "company"}:
                continue
            holdings.append({
                "holding_name": name,
                "weight_pct": maybe_float(row[weight_idx]) if weight_idx is not None and len(row) > weight_idx else None,
                "rank": rank,
            })
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "holdings": holdings,
    }


def parse_factsheet_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    document_url = None
    for frame in soup.find_all(["iframe", "frame", "embed", "object"], src=True):
        src = normalize_space(frame.get("src"))
        lower = src.lower()
        if not src or "googletagmanager.com" in lower:
            continue
        frame_id = normalize_space(frame.get("id"))
        if (
            frame_id.lower().endswith("frmfactsheet")
            or "snapshotpdf/default.aspx" in lower
            or "/pdf/" in lower
            or ".pdf" in lower
            or "factsheet" in lower
        ):
            document_url = urljoin(page_url, src)
            break
    if not document_url:
        html_text = str(soup)
        match = re.search(r"https?://[^\"']+snapshotpdf/default\.aspx[^\"']*", html_text, flags=re.I)
        if match:
            document_url = match.group(0)
    if not document_url:
        html_text = str(soup)
        match = re.search(r"https?://[^\"']+\.pdf(?:\?[^\"']+)?", html_text, flags=re.I)
        if match:
            document_url = match.group(0)
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "document_url": document_url,
    }


def merge_unique_dicts(items: Iterable[Dict[str, Any]], unique_key: str) -> List[Dict[str, Any]]:
    merged: List[Dict[str, Any]] = []
    seen: set[Any] = set()
    for item in items:
        key = item.get(unique_key)
        if key in seen:
            continue
        seen.add(key)
        merged.append(item)
    return merged
