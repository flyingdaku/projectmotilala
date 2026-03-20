from __future__ import annotations

import logging
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from core.db import get_connection
from sources.morningstar.schema import ensure_morningstar_schema_sqlite


QUERY = """
WITH latest_amfi AS (
  SELECT dp.asset_id, dp.close AS amfi_nav, dp.date AS amfi_nav_date
  FROM daily_prices dp
  JOIN (
    SELECT asset_id, MAX(date) AS max_date
    FROM daily_prices
    WHERE source_exchange = 'AMFI'
    GROUP BY asset_id
  ) latest
    ON latest.asset_id = dp.asset_id
   AND latest.max_date = dp.date
),
latest_ms AS (
  SELECT asset_id, latest_nav, nav_date
  FROM src_morningstar_fund_overview
  WHERE asset_id IS NOT NULL
)
SELECT
  a.name,
  a.amc_name,
  ms.latest_nav AS morningstar_nav,
  ms.nav_date AS morningstar_nav_date,
  amfi.amfi_nav,
  amfi.amfi_nav_date,
  ABS(COALESCE(ms.latest_nav, 0) - COALESCE(amfi.amfi_nav, 0)) AS abs_nav_diff
FROM latest_ms ms
JOIN latest_amfi amfi ON amfi.asset_id = ms.asset_id
JOIN assets a ON a.id = ms.asset_id
ORDER BY abs_nav_diff DESC, a.name
LIMIT 50
"""


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    with get_connection() as conn:
        ensure_morningstar_schema_sqlite(conn.raw_connection)
        rows = conn.fetchall(QUERY)
        for row in rows:
            print(
                f"{row['name']} | AMFI {row['amfi_nav']} ({row['amfi_nav_date']}) "
                f"| Morningstar {row['morningstar_nav']} ({row['morningstar_nav_date']}) "
                f"| diff={row['abs_nav_diff']}"
            )
