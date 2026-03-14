from pipelines.golden_ca_pipeline import parse_nse_action
from pipelines.bse_corporate_actions_parser import classify_bse_action

print("NSE Buy Back:", parse_nse_action("Buy Back"))
print("BSE Buy Back:", classify_bse_action("Buy Back"))
