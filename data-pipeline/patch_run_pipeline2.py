with open("run_pipeline.py", "r") as f:
    content = f.read()

old_block = """    # ── Step 2: NSE Corporate Actions ────────────────────────────
    if not skip_corp_actions:
        logger.info("Step 2: Fetching NSE Corporate Actions...")
        try:
            from pipelines.corporate_actions import run_corporate_actions_pipeline
            run_corporate_actions_pipeline(
                from_date=trade_date - timedelta(days=1),
                to_date=trade_date,
            )
        except Exception as e:
            logger.error(f"Step 2 failed: {e}")"""

new_block = """    # ── Step 2: NSE & Golden Corporate Actions ───────────────────
    if not skip_corp_actions:
        logger.info("Step 2: Fetching NSE Corporate Actions...")
        try:
            from pipelines.corporate_actions import run_corporate_actions_pipeline
            run_corporate_actions_pipeline(
                from_date=trade_date - timedelta(days=1),
                to_date=trade_date,
            )
        except Exception as e:
            logger.error(f"Step 2 (NSE CA) failed: {e}")
            
        logger.info("Step 2b: Running Golden CA Merge...")
        try:
            from pipelines.golden_ca_pipeline import run_golden_ca_pipeline
            run_golden_ca_pipeline(
                from_date=trade_date - timedelta(days=30),
                to_date=trade_date + timedelta(days=30)
            )
        except Exception as e:
            logger.error(f"Step 2b (Golden CA Merge) failed: {e}")"""

content = content.replace(old_block, new_block)

with open("run_pipeline.py", "w") as f:
    f.write(content)
