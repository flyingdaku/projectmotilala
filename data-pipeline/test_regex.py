from pipelines.golden_ca_pipeline import parse_nse_action

cases = [
    " Interim Dividend - Re 0.75 Per Share",
    " Face Value Split (Sub-Division) - From Rs 10/- Per Share To Re 1/- Per Share",
    "Special Dividend Rs -10 Per Share/Interim Dividend Rs - 26 Per Share",
    " Face Value Split (Sub-Division) - From Rs 5/- Per Share To Re 0.10/- Per Share"
]

for c in cases:
    print(c)
    print("  ->", parse_nse_action(c))
