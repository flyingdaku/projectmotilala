import re

with open("pipelines/daily/eodhd_daily.py", "r") as f:
    code = f.read()

# Replace get_connection import
code = code.replace("from core.db import get_connection", "from core.db import get_ts_connection, get_pg_connection")

# Replace connection usage
code = code.replace("with get_connection() as conn:", "with get_ts_connection() as conn:")

# Fix the ingest_bulk_data which requires pg connection for mapping
pg_mapping = """def ingest_bulk_data(conn: Any, rows: List[Dict], exchange: str) -> int:
    with get_pg_connection() as pg_conn:
        mapping_query = f\"\"\"
            SELECT eodhd_{exchange.lower()}_symbol as symbol, asset_id
            FROM eodhd_symbol_mapping
            WHERE eodhd_{exchange.lower()}_symbol IS NOT NULL
        \"\"\"
        mapping = {row['symbol']: row['asset_id'] for row in pg_conn.execute(mapping_query).fetchall()}"""
        
code = re.sub(r'def ingest_bulk_data.*?mapping_query = f""".*?<replace_marker>', pg_mapping, code, flags=re.DOTALL)
# actually regular expression replacement might be too fragile.
