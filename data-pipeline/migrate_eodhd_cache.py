import os
import shutil
from pathlib import Path

base_dir = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/EODHD")

def get_type_from_filename(filename):
    if filename.startswith("eod_") or filename.startswith("bulk_eod_"):
        return "eod"
    elif filename.startswith("intraday_"):
        return "intraday"
    elif filename.startswith("div_") or filename.startswith("bulk_divs_"):
        return "dividends"
    elif filename.startswith("splits_") or filename.startswith("bulk_splits_"):
        return "splits"
    elif filename.startswith("symlist_"):
        return "master"
    return None

count = 0
for file_path in base_dir.rglob("*.json"):
    # Skip already migrated files
    if str(file_path.parent).find("/EODHD/") > 0 and len(file_path.parts) >= 3:
        parent_name = file_path.parts[-4] # Before year
        if parent_name in ["eod", "intraday", "dividends", "splits", "master"]:
            continue

    type_dir = get_type_from_filename(file_path.name)
    if type_dir:
        # Extract year and month from the current path
        # Format: EODHD/YYYY/MM/file.json
        parts = file_path.parts
        
        # Check if path is in expected format
        try:
            # Find index of EODHD
            eodhd_idx = parts.index("EODHD")
            year = parts[eodhd_idx + 1]
            month = parts[eodhd_idx + 2]
            
            # Skip if not a year directory
            if not year.isdigit() or len(year) != 4:
                continue
                
            new_dir = base_dir / type_dir / year / month
            new_dir.mkdir(parents=True, exist_ok=True)
            
            new_path = new_dir / file_path.name
            shutil.move(str(file_path), str(new_path))
            count += 1
            if count % 1000 == 0:
                print(f"Migrated {count} files...")
        except (ValueError, IndexError):
            pass

print(f"Migration complete. Moved {count} files.")

# Clean up empty directories
for dir_path in sorted(base_dir.rglob("*"), key=lambda p: len(p.parts), reverse=True):
    if dir_path.is_dir():
        try:
            dir_path.rmdir() # Only removes if empty
        except OSError:
            pass
