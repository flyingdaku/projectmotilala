"""
EODHD data source integration.

Provides supplementary validation and gap-filling for NSE/BSE price data.
"""

from sources.eodhd.eodhd_eod import EODHDEODIngester
from sources.eodhd.eodhd_corporate_actions import EODHDCorporateActionsIngester
