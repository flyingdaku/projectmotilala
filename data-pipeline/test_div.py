import re
cases = [
    "Dividend - Re 0.30 Per Share",
    "Inteim Dividend - Re 0.10 Per Share",
    "Special Dividend Rs -10 Per Share/Interim Dividend Rs - 26 Per Share",
    "Annual General Meeting /Dividend - 1 Rs Per Share"
]

for s in cases:
    s_mod = s.upper().replace('1 RS', 'RS 1')
    matches = re.findall(r'(?:RS|RE|₹|INR|RS\.|RE\.|RS\s|RE\s|₹\s)[\.\s-]*(\d+(?:\.\d+)?)', s_mod)
    print(f"'{s}' -> {matches}")

