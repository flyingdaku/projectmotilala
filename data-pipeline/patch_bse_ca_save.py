import re

with open("pipelines/bse_corporate_actions.py", "r") as f:
    content = f.read()

# Modify fetch_bse_corporate_actions_by_scrip to save JSON and handle errors robustly
old_fetch = """def fetch_bse_corporate_actions_by_scrip(scrip_code: str) -> List[Dict]:
    url = f"{BSE_CORP_ACTION_URL}?scripcode={scrip_code}"
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("Table2", [])
    except Exception as e:
        logger.warning(f"BSE CA fetch failed for {scrip_code}: {e}")
        return []"""

new_fetch = """def fetch_bse_corporate_actions_by_scrip(scrip_code: str) -> List[Dict]:
    import os
    import time
    
    url = f"{BSE_CORP_ACTION_URL}?scripcode={scrip_code}"
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            table_data = data.get("Table2", [])
            
            # Save raw json to file
            if table_data:
                save_dir = os.path.join("raw_data", "BSE_CORP_ACTIONS")
                os.makedirs(save_dir, exist_ok=True)
                file_path = os.path.join(save_dir, f"{scrip_code}_all.json")
                
                # If file exists, we could merge, but since the API returns "all" CA for a scrip, we just overwrite
                with open(file_path, "w") as jf:
                    json.dump(table_data, jf, indent=2)
                    
            return table_data
            
        except requests.exceptions.RequestException as e:
            if attempt < max_retries - 1:
                logger.debug(f"Retry {attempt+1} for {scrip_code} after error: {e}")
                time.sleep(2 * (attempt + 1))  # exponential backoff
            else:
                logger.error(f"BSE CA fetch failed for {scrip_code} after {max_retries} attempts: {e}")
                return []
        except Exception as e:
            logger.error(f"Unexpected error fetching BSE CA for {scrip_code}: {e}")
            return []
    return []"""

content = content.replace(old_fetch, new_fetch)

with open("pipelines/bse_corporate_actions.py", "w") as f:
    f.write(content)
