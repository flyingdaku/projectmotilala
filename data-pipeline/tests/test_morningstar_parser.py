from sources.morningstar.parser import (
    build_tab_urls,
    build_sal_endpoint_urls,
    extract_fund_house_slug,
    extract_morningstar_fund_id,
    parse_html_tables,
    parse_directory_page,
    parse_factsheet_page,
    parse_overview_page,
    parse_performance_page,
    parse_sal_holdings_json,
    parse_sal_page_context,
    parse_sal_performance_json,
    parse_sal_portfolio_json,
    parse_risk_page,
    parse_sal_risk_json,
    parse_sal_runtime_js,
)


DIRECTORY_HTML = """
<html>
  <body>
    <h1>Aditya Birla Sun Life AMC Ltd</h1>
    <table>
      <tr>
        <th>Fund Name</th><th>Category</th><th>Distribution Type</th><th>Structure</th><th>Latest NAV</th><th>NAV Date</th>
      </tr>
      <tr>
        <td><a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx">Aditya Birla Sun Life Small Cap Fund Growth</a></td>
        <td>Small-Cap</td>
        <td>Growth</td>
        <td>Open Ended</td>
        <td>80.3777</td>
        <td>Mar 18, 2026</td>
      </tr>
    </table>
  </body>
</html>
"""

OVERVIEW_HTML = """
<html>
  <head><title>Aditya Birla Sun Life Small Cap Fund Growth INF209K01EN2 | Morningstar India</title></head>
  <body>
    <h1>
      <span id="ctl00_ContentPlaceHolder1_ucQuoteHeader_lblFundname">Aditya Birla Sun Life Small Cap Fund Growth</span>
      <span id="ctl00_ContentPlaceHolder1_ucQuoteHeader_lblISIN">INF209K01EN2</span>
    </h1>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx">Overview</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/portfolio.aspx">Portfolio</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/performance.aspx">Performance</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/detailed-portfolio.aspx">Detailed Portfolio</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/risk-ratings.aspx">Risk & Rating</a>
    <div>Category : Small-Cap Distribution Type : Growth Structure : Open Ended Latest NAV : 80.3777 NAV Date : Mar 18, 2026 Benchmark : Nifty Smallcap 250 TRI</div>
  </body>
</html>
"""

PERFORMANCE_HTML = """
<html>
  <body>
    <h2>Trailing Returns</h2>
    <table>
      <tr><th>Period</th><th>Fund</th><th>Category</th><th>Benchmark</th><th>Quartile</th><th>% Rank</th><th># of Invest. in Category</th></tr>
      <tr><td>1 Year</td><td>12.5</td><td>8.1</td><td>9.4</td><td>1</td><td>92</td><td>117</td></tr>
      <tr><td>3 Years</td><td>18.2</td><td>14.5</td><td>16.9</td><td>1</td><td>88</td><td>104</td></tr>
    </table>
    <h2>Calendar Returns</h2>
    <table>
      <tr><th>Year</th><th>Fund</th><th>Category</th><th>Benchmark</th></tr>
      <tr><td>2024</td><td>24.1</td><td>19.8</td><td>21.0</td></tr>
    </table>
  </body>
</html>
"""

RISK_HTML = """
<html>
  <body>
    <table>
      <tr><th>Metric</th><th>Value</th></tr>
      <tr><td>Alpha</td><td>1.25</td></tr>
      <tr><td>Beta</td><td>0.91</td></tr>
      <tr><td>Sharpe Ratio</td><td>0.88</td></tr>
      <tr><td>Downside Capture Ratio</td><td>89.5</td></tr>
    </table>
    <div>Morningstar Risk High Star Rating 4</div>
  </body>
</html>
"""

FACTSHEET_HTML = """
<html>
  <body>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MH3XMP2"></iframe>
    <iframe src="/pdf/default.aspx?Id=f000000i3x&accesstoken=test-token"></iframe>
    <iframe src="/documents/factsheets/f000000i3x.pdf"></iframe>
  </body>
</html>
"""

FEEDBACK_ONLY_HTML = """
<html>
  <body>
    <h1>Example Fund</h1>
    <table>
      <tr><td>Feedback</td></tr>
    </table>
  </body>
</html>
"""

SAL_CONFIG_JS = """
var DEMO_ENV = 'prod';
var DEMO_USER_TYPE = 'premium';
var contentTypes = {
  free: 'free-token',
  premium: 'premium-token'
};
"""

SAL_OVERVIEW_HTML = """
<html>
  <head>
    <meta name="Ticker" content="F0000020YP" />
    <meta name="TickerType" content="FO" />
    <meta name="accessToken" content="access-token-123" />
    <meta name="realTimeToken" content="realtime-456" />
  </head>
  <body>
    <script src="/SAL/fund.config.js?v=240220"></script>
    <script>window.__sal = { id: 'RSIN_SAL' };</script>
  </body>
</html>
"""

SAL_PERFORMANCE_CHART = {
    "asOfDate": "2026-03-19T00:00:00",
    "graphData": {
        "fund": [{"date": "2025-03-19", "value": 10000}, {"date": "2026-03-19", "value": 12340}],
        "category": [{"date": "2025-03-19", "value": 10000}, {"date": "2026-03-19", "value": 11620}],
    },
}

SAL_PERFORMANCE_TABLE = {
    "table": {
        "columnDefs": ["2023", "2024", "2025", "YTD"],
        "growth10KReturnData": [
            {"label": "fund", "datum": [12.0, 24.0, -3.0, 5.5]},
            {"label": "category", "datum": [10.0, 19.5, -4.5, 4.8]},
            {"label": "index", "datum": [11.5, 21.0, -2.9, 5.1]},
            {"label": "percentileRank", "datum": [12, 18, 54, 23]},
            {"label": "fundNumber", "datum": [101, 104, 108, 108]},
        ],
    },
}

SAL_TRAILING = {
    "fundReturnDate": "2026-03-19T00:00:00",
    "columnDefs": ["1Day", "1Week", "1Month", "1Year", "3Year", "SinceInception"],
    "totalReturnNAV": [0.4, 1.1, 2.2, 18.5, 22.3, 15.1],
    "totalReturnCategoryNew": [0.3, 0.9, 1.8, 15.2, 18.1, 13.0],
    "totalReturnIndexNew": [0.2, 0.8, 1.5, 14.0, 17.0, 12.1],
    "returnRank": [32, 28, 21, 14, 11, 7],
    "fundNumber": [126, 126, 126, 126, 122, 118],
}

SAL_QUOTE = {
    "investmentName": "Aditya Birla Sun Life ELSS Tax Saver Growth",
    "categoryName": "India Fund ELSS",
    "primaryIndexNameNew": "NIFTY 500 TRI",
    "index": "NIFTY 500 TRI",
    "equityStyleBox": 3,
    "tNAInShareClassCurrency": 15234.56,
    "minimumInitialInvestment": 500.0,
    "monthlyNetExpenseRatio": 1.63,
    "annualReportNetExpenseRatio": 1.75,
    "lastTurnoverRatio": 0.22,
    "status": "Open Ended",
    "inceptionDate": "2010-01-01T00:00:00",
    "morningstarRating": 4,
    "returnEndDate": "2026-03-19T00:00:00",
}

SAL_ASSET = {
    "portfolioDate": "2026-02-29T00:00:00",
    "assetType": "Equity",
    "allocationMap": {
        "INDAssetAllocStock": {"netAllocation": 96.4},
        "INDAssetAllocBond": {"netAllocation": 0.2},
        "INDAssetAllocCash": {"netAllocation": 3.1},
    },
}

SAL_OWNERSHIP = {
    "fund": {
        "scaledSizeScore": 58.2,
        "scaledStyleScore": 67.1,
        "objectZone75Percentile": 82.0,
    }
}

SAL_STYLE_WEIGHT = {
    "portfolioDate": "2026-02-29T00:00:00",
    "largeValue": 4.3,
    "largeBlend": 52.0,
    "largeGrowth": 26.0,
    "middleValue": 0.9,
    "middleBlend": 7.3,
    "middleGrowth": 5.1,
    "smallValue": 0.0,
    "smallBlend": 0.8,
    "smallGrowth": 3.6,
}

SAL_PEOPLE = {
    "advisorType": "Aditya Birla Sun Life AMC Limited",
    "averageManagerTenure": 4.2,
    "longestManagerTenure": 6.5,
    "managerCount": 2,
    "currentManagerList": [
        {"givenName": "Amit", "familyName": "Patel", "startDate": "2022-01-01T00:00:00", "endDate": None},
        {"givenName": "Ria", "familyName": "Shah", "startDate": "2023-06-15T00:00:00", "endDate": None},
    ],
    "pastManagerList": [
        {"givenName": "Old", "familyName": "Manager", "startDate": "2018-01-01T00:00:00", "endDate": "2021-12-31T00:00:00"},
    ],
}

SAL_RISK_VOL = {
    "fundRiskVolatility": {
        "for3Year": {
            "alpha": 1.2,
            "beta": 0.95,
            "rSquared": 88.4,
            "standardDeviation": 14.7,
            "sharpeRatio": 0.81,
        }
    }
}

SAL_RISK_SUMMARY = {
    "endDate": "2026-03-19T00:00:00",
    "for3Year": {"riskVsCategory": "Average", "returnVsCategory": "Above Average", "numberOfFunds": 122},
}

SAL_MARKET_VOL = {
    "measureMap": {
        "fund": {
            "upside": 108.2,
            "downside": 91.4,
            "maxDrawDown": -18.5,
            "peakDate": "2025-09-30T00:00:00",
            "valleyDate": "2026-02-12T00:00:00",
            "duration": 136,
        }
    }
}

SAL_HOLDINGS = {
    "holdingSummary": {"portfolioDate": "2026-02-29T00:00:00"},
    "equityHoldingPage": {
        "holdingList": [
            {
                "securityName": "HDFC Bank Ltd",
                "holdingType": "Equity",
                "isin": "INE040A01034",
                "ticker": "HDFCBANK",
                "weighting": 7.8,
                "marketValue": 1234.5,
                "numberOfShare": 15000,
                "sector": "Financial Services",
                "country": "India",
            }
        ]
    },
    "otherHoldingPage": {
        "holdingList": [
            {
                "securityName": "Cash & Equivalents",
                "holdingType": "Cash",
                "weighting": 3.1,
            }
        ]
    },
}


def test_extract_ids_and_slugs():
    assert extract_morningstar_fund_id("https://www.morningstar.in/mutualfunds/f000000i3x/foo/overview.aspx") == "f000000i3x"
    assert extract_fund_house_slug("https://www.morningstar.in/funds/adityabirla.aspx") == "adityabirla"


def test_parse_directory_page_extracts_scheme_rows():
    parsed = parse_directory_page(DIRECTORY_HTML, "https://www.morningstar.in/funds/adityabirla.aspx")
    assert parsed["fund_house_slug"] == "adityabirla"
    assert parsed["fund_house_name"] == "Aditya Birla Sun Life AMC Ltd"
    assert len(parsed["rows"]) == 1
    row = parsed["rows"][0]
    assert row["morningstar_fund_id"] == "f000000i3x"
    assert row["category_name"] == "Small-Cap"
    assert row["distribution_type"] == "Growth"
    assert row["structure"] == "Open Ended"
    assert row["latest_nav"] == 80.3777


def test_parse_overview_page_extracts_ids_and_tabs():
    parsed = parse_overview_page(OVERVIEW_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx")
    assert parsed["morningstar_fund_id"] == "f000000i3x"
    assert parsed["isin"] == "INF209K01EN2"
    assert parsed["scheme_name"] == "Aditya Birla Sun Life Small Cap Fund Growth"
    assert parsed["category_name"] == "Small-Cap"
    assert parsed["benchmark_name"] == "Nifty Smallcap 250 TRI"
    assert parsed["tabs"]["portfolio"].endswith("/portfolio.aspx")
    assert parsed["tabs"]["risk"].endswith("/risk-ratings.aspx")
    assert parsed["tabs"]["detailed_portfolio"].endswith("/detailed-portfolio.aspx")


def test_parse_performance_page_maps_trailing_and_calendar_returns():
    parsed = parse_performance_page(PERFORMANCE_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/performance.aspx")
    assert len(parsed["trailing_returns"]) == 2
    one_year = parsed["trailing_returns"][0]
    assert one_year["horizon_code"] == "1Y"
    assert one_year["fund_return"] == 12.5
    assert one_year["benchmark_return"] == 9.4
    assert one_year["peer_count"] == 117
    assert parsed["calendar_returns"][0]["period_label"] == "2024"


def test_parse_risk_page_maps_metrics():
    parsed = parse_risk_page(RISK_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/riskrating.aspx")
    metrics = parsed["risk_metrics"]
    assert metrics["alpha"] == 1.25
    assert metrics["beta"] == 0.91
    assert metrics["sharpe"] == 0.88
    assert metrics["downside_capture"] == 89.5
    assert metrics["star_rating"] == 4.0
    assert metrics["morningstar_risk_label"] == "High"


def test_parse_factsheet_page_extracts_pdf_url():
    parsed = parse_factsheet_page(FACTSHEET_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/fund-factsheet.aspx")
    assert parsed["document_url"] == "https://www.morningstar.in/pdf/default.aspx?Id=f000000i3x&accesstoken=test-token"


def test_build_tab_urls():
    tabs = build_tab_urls("https://www.morningstar.in/mutualfunds/f000000i3x/foo/overview.aspx")
    assert tabs["factsheet"].endswith("/fund-factsheet.aspx")
    assert tabs["risk"].endswith("/risk-ratings.aspx")
    assert tabs["detailed_portfolio"].endswith("/detailed-portfolio.aspx")


def test_parse_html_tables_ignores_feedback_only_tables():
    assert parse_html_tables(FEEDBACK_ONLY_HTML) == []


def test_parse_sal_runtime_and_context():
    runtime = parse_sal_runtime_js(SAL_CONFIG_JS)
    assert runtime["demo_user_type"] == "premium"
    assert runtime["content_types"]["premium"] == "premium-token"

    context = parse_sal_page_context(
        SAL_OVERVIEW_HTML,
        "https://www.morningstar.in/mutualfunds/f0000020yp/foo/overview.aspx",
        runtime,
    )
    assert context is not None
    assert context["sec_id"] == "F0000020YP"
    assert context["client_id"] == "RSIN_SAL"
    assert context["sal_content_type"] == "premium-token"

    urls = build_sal_endpoint_urls(context)
    assert "/fund/quote/v7/F0000020YP/data" in urls["quote"]
    assert "/fund/portfolio/holding/v2/F0000020YP/data" in urls["holdings"]
    assert "/fund/process/weighting/F0000020YP/data" in urls["style_weight"]


def test_parse_sal_performance_json_maps_annual_and_trailing_returns():
    parsed = parse_sal_performance_json(SAL_PERFORMANCE_CHART, SAL_TRAILING, SAL_PERFORMANCE_TABLE)
    assert parsed["as_of_date"] == "2026-03-19"
    assert len(parsed["calendar_returns"]) == 3
    assert parsed["calendar_returns"][1]["period_label"] == "2024"
    assert len(parsed["trailing_returns"]) == 6
    assert parsed["trailing_returns"][3]["horizon_code"] == "1Y"
    assert parsed["trailing_returns"][3]["quartile"] == "1"
    assert parsed["trailing_returns"][3]["peer_count"] == 126
    assert parsed["growth_of_10000"]["fund"][1]["value"] == 12340


def test_parse_sal_risk_json_maps_summary_and_volatility_metrics():
    parsed = parse_sal_risk_json(SAL_QUOTE, SAL_RISK_VOL, SAL_RISK_SUMMARY, SAL_MARKET_VOL)
    metrics = parsed["risk_metrics"]
    assert parsed["as_of_date"] == "2026-03-19"
    assert parsed["selected_period"] == "for3Year"
    assert metrics["alpha"] == 1.2
    assert metrics["beta"] == 0.95
    assert metrics["stddev"] == 14.7
    assert metrics["upside_capture"] == 108.2
    assert metrics["downside_capture"] == 91.4
    assert metrics["star_rating"] == 4.0


def test_parse_sal_portfolio_json_maps_allocations_style_and_managers():
    parsed = parse_sal_portfolio_json(SAL_QUOTE, SAL_ASSET, SAL_OWNERSHIP, SAL_STYLE_WEIGHT, SAL_PEOPLE)
    assert parsed["as_of_date"] == "2026-02-29"
    assert parsed["asset_allocation"][0]["asset_bucket"] == "Stock"
    assert parsed["asset_allocation"][0]["weight_pct"] == 96.4
    assert len(parsed["style_box"]) == 9
    assert parsed["style_box"][0]["style_dimension"] == "Large Value"
    assert parsed["style_box"][0]["weight_pct"] == 4.3
    assert parsed["style_box"][4]["style_dimension"] == "Mid Blend"
    assert parsed["style_box"][4]["weight_pct"] == 7.3
    assert len(parsed["managers"]) == 3
    assert parsed["managers"][0]["manager_name"] == "Amit Patel"
    assert parsed["characteristics"][0]["characteristic_name"] == "Asset Type"


def test_parse_sal_holdings_json_maps_detailed_holdings():
    parsed = parse_sal_holdings_json(SAL_HOLDINGS)
    assert parsed["as_of_date"] == "2026-02-29"
    assert len(parsed["holdings"]) == 2
    assert parsed["holdings"][0]["holding_name"] == "HDFC Bank Ltd"
    assert parsed["holdings"][0]["holding_isin"] == "INE040A01034"
    assert parsed["holdings"][0]["sector"] == "Financial Services"


def test_parse_sal_overview_json_infers_distribution_and_structure():
    from sources.morningstar.parser import parse_sal_overview_json

    parsed = parse_sal_overview_json(SAL_QUOTE, SAL_PEOPLE, fallback={"scheme_name": "Aditya Birla Sun Life ELSS Tax Saver Growth"})
    assert parsed["distribution_type"] == "Growth"
    assert parsed["structure"] == "Open Ended"
