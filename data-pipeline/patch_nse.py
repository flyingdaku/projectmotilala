import json
import sqlite3
import datetime

with open("sources/nse/corporate_actions.py", "r") as f:
    content = f.read()

content = content.replace('INSERT OR IGNORE INTO corporate_actions', 'INSERT OR IGNORE INTO src_nse_corporate_actions')
content = content.replace('(id, asset_id, action_type, ex_date, record_date, announcement_date,\n                    source_exchange, raw_announcement)', '(id, asset_id, symbol, series, subject, ex_date, record_date, bc_start_date, bc_end_date, nd_start_date, nd_end_date, company_name, isin, face_value, raw_json)')
content = content.replace('(ca.id, ca.asset_id, ca.action_type, ca.ex_date, ca.record_date,\n                    ca.announcement_date, ca.source_exchange, ca.raw_announcement)', '(ca.id, ca.asset_id, row.get("symbol"), row.get("series"), row.get("subject"), ca.ex_date, row.get("recordDate"), row.get("bcStartDate"), row.get("bcEndDate"), row.get("ndStartDate"), row.get("ndEndDate"), row.get("comp"), row.get("isin"), row.get("faceVal"), json.dumps(row))')

with open("sources/nse/corporate_actions.py", "w") as f:
    f.write(content)
