with open("sources/nse/corporate_actions.py", "r") as f:
    content = f.read()

content = content.replace(
    '''            conn.execute(
                """INSERT OR IGNORE INTO src_nse_corporate_actions
                   (id, asset_id, symbol, series, subject, ex_date, record_date, bc_start_date, bc_end_date, nd_start_date, nd_end_date, company_name, isin, face_value, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    ca.id, ca.asset_id, ca.action_type, ca.ex_date, ca.record_date,
                    ca.announcement_date, ca.source_exchange, ca.raw_announcement
                )
            )''',
    '''            conn.execute(
                """INSERT OR IGNORE INTO src_nse_corporate_actions
                   (id, asset_id, symbol, series, subject, ex_date, record_date, bc_start_date, bc_end_date, nd_start_date, nd_end_date, company_name, isin, face_value, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    ca.id, ca.asset_id, row.get("symbol"), row.get("series"), row.get("subject"), 
                    ca.ex_date, row.get("recordDate"), row.get("bcStartDate"), row.get("bcEndDate"), 
                    row.get("ndStartDate"), row.get("ndEndDate"), row.get("comp"), row.get("isin"), 
                    row.get("faceVal"), json.dumps(row)
                )
            )'''
)

with open("sources/nse/corporate_actions.py", "w") as f:
    f.write(content)
