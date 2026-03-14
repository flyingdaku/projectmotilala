import re

s = "ANNUAL GENERAL MEETING/DIVIDEND - RE 0.92 PER SHARE"
matches = re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", s)
print("Matches:", matches)

s2 = " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 10/- PER SHARE TO RE 1/- PER SHARE"
matches2 = re.search(r"(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", s2)
print("Split:", matches2.groups() if matches2 else None)
