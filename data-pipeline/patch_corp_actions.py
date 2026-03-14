with open("pipelines/corporate_actions.py", "r") as f:
    content = f.read()

content = content.replace(
    '''            conn.execute(
                """INSERT INTO corporate_actions
                   (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                    dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NSE', ?)""",
                (
                    action_id, asset_id, action_type, ex_date.isoformat(),
                    ratio_num, ratio_den, dividend_amount, rights_price,
                    adjustment_factor, json.dumps(raw),
                ),
            )''',
    '''            # Insert into golden table
            conn.execute(
                """INSERT INTO corporate_actions
                   (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                    dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NSE', ?)""",
                (
                    action_id, asset_id, action_type, ex_date.isoformat(),
                    ratio_num, ratio_den, dividend_amount, rights_price,
                    adjustment_factor, json.dumps(raw),
                ),
            )
            
            # Also insert into raw staging table
            conn.execute(
                """INSERT OR IGNORE INTO src_nse_corporate_actions
                   (id, asset_id, symbol, series, subject, ex_date, record_date, bc_start_date, bc_end_date, nd_start_date, nd_end_date, company_name, isin, face_value, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(), asset_id, raw.get("symbol"), raw.get("series"), raw.get("purpose"), 
                    ex_date.isoformat(), raw.get("recordDate"), raw.get("bcStartDate"), raw.get("bcEndDate"), 
                    raw.get("ndStartDate"), raw.get("ndEndDate"), raw.get("comp"), raw.get("isin"), 
                    raw.get("faceVal"), json.dumps(raw)
                )
            )'''
)

with open("pipelines/corporate_actions.py", "w") as f:
    f.write(content)
