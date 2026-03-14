with open("pipelines/bse_corporate_actions_parser.py", "r") as f:
    content = f.read()

old_div = """    # ── Dividend (lowest structural priority) ────────────────────
    if any(k in p for k in ("INTERIM DIV", "FINAL DIV", "SPECIAL DIV", "DIVIDEND"))"""

new_div = """    # ── Dividend (lowest structural priority) ────────────────────
    if any(k in p for k in ("INTERIM DIV", "FINAL DIV", "SPECIAL DIV", "DIVIDEND", "DIV.", "DIV-", "DIV "))"""

content = content.replace(old_div, new_div)

old_struct = """    if any(k in p for k in ("SPLIT", "SUB-DIVISION", "SUBDIVISION", "STOCK SPLIT")):
        return "SPLIT" """

new_struct = """    if any(k in p for k in ("SPLIT", "SUB-DIVISION", "SUBDIVISION", "STOCK SPLIT", "CONSOLIDATION", "REDUCTION OF CAPITAL")):
        return "SPLIT" """

content = content.replace(old_struct, new_struct)

with open("pipelines/bse_corporate_actions_parser.py", "w") as f:
    f.write(content)
