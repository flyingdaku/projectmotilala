with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

old_parse = """def parse_nse_action(subject: str) -> Dict[str, Any]:
    subject = subject.upper()
    action_type = "OTHER"
    div_amt = 0.0
    num = 0.0
    den = 1.0

    if "SPLIT" in subject:
        action_type = "SPLIT"
        # e.g. "FACE VALUE SPLIT FROM RS.10/- TO RS.2/-"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?).*TO\\s*RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "BONUS" in subject:
        action_type = "BONUS"
        # e.g. "BONUS 1:1"
        match = re.search(r"(\\d+(?:\\.\\d+)?)\\s*:\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "DIVIDEND" in subject:
        action_type = "DIVIDEND"
        # e.g. "DIVIDEND - RS 5.5 PER SHARE"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            div_amt = float(match.group(1))
    elif "FACE VALUE" in subject:
        action_type = "FACE_VALUE_CHANGE"

    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt
    }"""

new_parse = """def parse_nse_action(subject: str) -> Dict[str, Any]:
    subject = subject.upper()
    action_type = "OTHER"
    div_amt = 0.0
    num = 0.0
    den = 1.0

    # Structural
    if any(k in subject for k in ("DEMERGER", "DE-MERGER", "SPIN-OFF")):
        action_type = "DEMERGER"
    elif any(k in subject for k in ("MERGER", "AMALGAMATION")):
        action_type = "MERGER"
    elif "SPLIT" in subject or "SUB-DIVISION" in subject:
        action_type = "SPLIT"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?).*TO\\s*RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "FACE VALUE" in subject:
        action_type = "FACE_VALUE_CHANGE"

    # Issuance / Return
    elif "BONUS" in subject:
        action_type = "BONUS"
        match = re.search(r"(\\d+(?:\\.\\d+)?)\\s*:\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "RIGHTS" in subject or "RIGHT ISSUE" in subject:
        action_type = "RIGHTS"
    elif "BUYBACK" in subject or "BUY BACK" in subject:
        action_type = "BUYBACK"

    # Dividends
    elif "DIVIDEND" in subject:
        action_type = "DIVIDEND"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            div_amt = float(match.group(1))
            
    # Admin
    elif "NAME CHANGE" in subject:
        action_type = "NAME_CHANGE"

    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt
    }"""

content = content.replace(old_parse, new_parse)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
