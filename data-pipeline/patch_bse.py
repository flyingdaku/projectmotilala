with open("pipelines/bse_corporate_actions.py", "r") as f:
    content = f.read()

content = content.replace(
    '''            with get_db() as conn:
                conn.executemany("""
                    INSERT OR IGNORE INTO corporate_actions
                    (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                     dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, batch)''',
    '''            src_batch = []
            for raw_dict in actions:
                try:
                    scrip_code = str(raw_dict.get("scrip_code", "")).strip()
                    purpose = str(raw_dict.get("purpose", "")).strip()
                    ex_date_str = str(raw_dict.get("Ex_date", "")).strip()
                    
                    if not scrip_code or not ex_date_str:
                        continue
                        
                    from datetime import datetime
                    ex_date_iso = datetime.strptime(ex_date_str, "%d %b %Y").date().isoformat()
                    
                    if date.fromisoformat(ex_date_iso) < from_date or date.fromisoformat(ex_date_iso) > to_date:
                        continue

                    # Fallback mapping if asset_id not found immediately
                    a_id = asset_id if scrip_code == str(scrip_code) else bse_cache.get(scrip_code)
                    if not a_id:
                        continue

                    src_batch.append((
                        generate_id(),
                        a_id,
                        scrip_code,
                        str(raw_dict.get("scrip_name", "")).strip(),
                        purpose,
                        ex_date_iso,
                        str(raw_dict.get("Record_date", "")).strip(),
                        str(raw_dict.get("BC_Start_Date", "")).strip(),
                        str(raw_dict.get("BC_End_Date", "")).strip(),
                        str(raw_dict.get("ND_Start_Date", "")).strip(),
                        str(raw_dict.get("ND_End_Date", "")).strip(),
                        json.dumps(raw_dict)
                    ))
                except Exception as e:
                    logger.debug(f"Failed to extract for src_bse_corporate_actions: {e}")

            with get_db() as conn:
                conn.executemany("""
                    INSERT OR IGNORE INTO corporate_actions
                    (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                     dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, batch)

                if src_batch:
                    conn.executemany("""
                        INSERT OR IGNORE INTO src_bse_corporate_actions
                        (id, asset_id, scrip_code, scrip_name, purpose, ex_date, record_date, 
                         bc_start_date, bc_end_date, nd_start_date, nd_end_date, raw_json)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, src_batch)
'''
)

with open("pipelines/bse_corporate_actions.py", "w") as f:
    f.write(content)
