import re
with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Add handling for capital reduction that specifies ratio like 'Capital Reduction 2:1'
# If it has no ratio, we should set num/den to 0/1 to mark it but it doesn't do a regular adjust.
old_struct = """    elif any(k in subject for k in ("SPLIT", "SUB-DIVISION", "CONSOLIDATION", "CAPITAL REDUCTION")):
        action_type = "SPLIT"
        
        # First check explicit consolidations
        if "CONSOLIDATION" in subject and "FROM RE" in subject and "TO RS" in subject:
            match = re.search(r"FROM RE[\\.\\s-]*(\\d+(?:\\.\\d+)?)[\\.\\s-]*.*?TO RS[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)
            if match:
                num = float(match.group(1))
                den = float(match.group(2))
        else:
            match = re.search(r'(?:RS|RE|INR|RE\\.|RS\\.|₹)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR|RE\\.|RS\\.|₹)[\\.\\s-]*(\\d+(?:\\.\\d+)?)', subject.replace('1 RS', 'RS 1'))
            if match:
                num = float(match.group(1))
                den = float(match.group(2))"""

new_struct = """    elif any(k in subject for k in ("SPLIT", "SUB-DIVISION", "CONSOLIDATION", "CAPITAL REDUCTION")):
        action_type = "SPLIT"
        
        # First check explicit consolidations
        if "CONSOLIDATION" in subject and "FROM RE" in subject and "TO RS" in subject:
            match = re.search(r"FROM RE[\\.\\s-]*(\\d+(?:\\.\\d+)?)[\\.\\s-]*.*?TO RS[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)
            if match:
                num = float(match.group(1))
                den = float(match.group(2))
        else:
            match = re.search(r'(?:RS|RE|INR|RE\\.|RS\\.|₹|RE\\s|RS\\s)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR|RE\\.|RS\\.|₹|RE\\s|RS\\s)[\\.\\s-]*(\\d+(?:\\.\\d+)?)', subject.replace('1 RS', 'RS 1').replace('1 RE', 'RE 1'))
            if match:
                num = float(match.group(1))
                den = float(match.group(2))"""

content = content.replace(old_struct, new_struct)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
