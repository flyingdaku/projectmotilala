import re

supported_ids = {
    # Universe
    'uni_mcap_bucket', 'uni_sector', 'uni_index', 'uni_instrument_type',
    # Math
    'abs', 'max', 'min', 'bracket',
    # Price
    'price', 'volume', 'change_pct', 'pct52wHigh', 'pct52wLow',
    # MA
    'sma', # Only sma(50) and sma(200) are actually supported but we'll mark the indicator true and let validation handle it, or we can leave it supported
    # Oscillators
    'rsi', 
    # Fundamentals
    'mcap', 'pe', 'pb', 'ev_ebitda', 'div_yield', 'eps_ttm', 'pat_margin', 'op_margin', 
    # Health
    'de', 'ic', 'current_ratio', 'quality_score', 
    # Growth
    'rev_g1y', 'rev_g3y', 'pat_g1y', 'eps_g1y'
}

with open('src/lib/screener/indicators.ts', 'r') as f:
    lines = f.readlines()

new_lines = []
indicator_id = None
for i, line in enumerate(lines):
    if re.search(r"id:\s*'([^']+)'", line):
        indicator_id = re.search(r"id:\s*'([^']+)'", line).group(1)
    
    if 'supported:' in line and indicator_id:
        if indicator_id in supported_ids:
            line = re.sub(r'supported:\s*(true|false)', 'supported: true', line)
        else:
            line = re.sub(r'supported:\s*(true|false)', 'supported: false', line)
    
    new_lines.append(line)

with open('src/lib/screener/indicators.ts', 'w') as f:
    f.writelines(new_lines)
