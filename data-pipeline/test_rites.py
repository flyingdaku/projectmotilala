from pipelines.bse_corporate_actions_parser import classify_bse_action
print("Action for RITES:", classify_bse_action("Interim Dividend - Rs. - 4.7500"))
print("Action for REIT:", classify_bse_action("Income Distribution RITES"))
print("Action for RITES Dividend:", classify_bse_action("Dividend by RITES Ltd"))
