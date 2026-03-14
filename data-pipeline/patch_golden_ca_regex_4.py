with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

old_func_start = """def parse_nse_action(subject: str) -> Dict[str, Any]:
    subject = subject.upper()
    action_type = "OTHER"
    div_amt = 0.0
    num = 0.0
    den = 1.0"""

old_func_end = """    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt
    }"""

start_idx = content.find(old_func_start)
end_idx = content.find(old_func_end) + len(old_func_end)

if start_idx != -1 and end_idx != -1:
    new_func = """def parse_nse_action(subject: str) -> Dict[str, Any]:
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
    elif any(k in subject for k in ("SPLIT", "SUB-DIVISION", "CONSOLIDATION", "CAPITAL REDUCTION")):
        action_type = "SPLIT"
        match = re.search(r"(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)
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

    # Dividends & Typos
    elif any(k in subject for k in ("DIVIDEND", "DIVDEND", "DIVIDNED", "DIV.", "DIV-", "DIV ")):
        action_type = "DIVIDEND"
        # Find all dividend amounts mentioned and sum them (e.g. Special Div Rs 10 + Final Div Rs 26)
        matches = re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)
        if matches:
            div_amt = sum(float(m) for m in matches)
            
    # Admin
    elif "NAME CHANGE" in subject:
        action_type = "NAME_CHANGE"

    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt
    }"""
    
    content = content[:start_idx] + new_func + content[end_idx:]
    with open("pipelines/golden_ca_pipeline.py", "w") as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Could not find function bounds")
