with open("run_pipeline.py", "r") as f:
    content = f.read()

# Add import for golden pipeline
if "from pipelines.golden_ca_pipeline import run_golden_ca_pipeline" not in content:
    content = content.replace(
        "from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline",
        "from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline\nfrom pipelines.golden_ca_pipeline import run_golden_ca_pipeline"
    )

# Find run_corporate_actions and update it
import re

old_run_ca = '''def run_corporate_actions():
    try:
        from core.db import get_connection
        from sources.nse.corporate_actions import NseCorporateActionsIngester

        logger.info(f"Running NSE Corporate Actions...")
        ingester = NseCorporateActionsIngester()
        with get_connection() as conn:
            ingester.run(trade_date, conn)
            
        logger.info(f"Running BSE Corporate Actions...")
        run_bse_corporate_actions_pipeline(trade_date - timedelta(days=3), trade_date + timedelta(days=7))

    except Exception as e:
        logger.error(f"Corporate actions pipeline failed: {e}")'''

new_run_ca = '''def run_corporate_actions():
    try:
        from core.db import get_connection
        from sources.nse.corporate_actions import NseCorporateActionsIngester

        logger.info(f"Running NSE Corporate Actions...")
        ingester = NseCorporateActionsIngester()
        with get_connection() as conn:
            ingester.run(trade_date, conn)
            
        logger.info(f"Running BSE Corporate Actions...")
        run_bse_corporate_actions_pipeline(trade_date - timedelta(days=3), trade_date + timedelta(days=7))
        
        logger.info(f"Running Golden Corporate Actions Merge...")
        run_golden_ca_pipeline(trade_date - timedelta(days=30), trade_date + timedelta(days=30))

    except Exception as e:
        logger.error(f"Corporate actions pipeline failed: {e}")'''

if old_run_ca in content:
    content = content.replace(old_run_ca, new_run_ca)
else:
    # If standard block is slightly different, let's just do a simpler replace
    if "run_bse_corporate_actions_pipeline" in content and "run_golden_ca_pipeline" not in content.split("def run_corporate_actions():")[1]:
        content = re.sub(
            r"(run_bse_corporate_actions_pipeline\(.*?\))",
            r"\1\n        logger.info(f'Running Golden Corporate Actions Merge...')\n        run_golden_ca_pipeline(trade_date - timedelta(days=30), trade_date + timedelta(days=30))",
            content
        )

with open("run_pipeline.py", "w") as f:
    f.write(content)
