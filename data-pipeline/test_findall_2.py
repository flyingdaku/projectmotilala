import re
s = "ANNUAL GENERAL MEETING/DIVIDEND - RE 0.92 PER SHARE"
print(re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", s))

s2 = " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 10/- PER SHARE TO RE 1/- PER SHARE"
print(re.search(r"(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", s2))
