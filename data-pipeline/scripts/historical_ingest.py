import os
import io
import logging
import zipfile
import pandas as pd
from datetime import date, datetime, timedelta
from pathlib import Path
import sys

# Add project root to sys.path
sys.path.insert(0, '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline')

from core.db import get_pg_connection, get_ts_connection, generate_id

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RAW_NSE_DIR = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/NSE_BHAVCOPY")
RAW_BSE_DIR = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/BSE_BHAVCOPY")

def _build_asset_caches():
    with get_pg_connection() as conn:
        isin_map = {}
        symbol_map = {}
        code_map = {}
        rows = conn.execute("SELECT id, isin, nse_symbol, bse_code FROM assets WHERE is_active = 1").fetchall()
        for r in rows:
            if r["isin"]: isin_map[r["isin"]] = r["id"]
            if r["nse_symbol"]: symbol_map[r["nse_symbol"]] = r["id"]
            if r["bse_code"]: code_map[str(r["bse_code"]).strip()] = r["id"]
        return isin_map, symbol_map, code_map

def parse_nse_bhav(filepath):
    try:
        with zipfile.ZipFile(filepath) as z:
            csv_name = next((n for n in z.namelist() if n.endswith(".csv")), None)
            if not csv_name: return None
            df = pd.read_csv(z.open(csv_name))
        
        df.columns = df.columns.str.strip()
        cols = set(df.columns)
        
        if "TckrSymb" in cols: # New
            df = df.rename(columns={"TradDt": "date", "TckrSymb": "symbol", "ISIN": "isin", "OpnPric": "open", "HghPric": "high", "LwPric": "low", "ClsPric": "close", "TtlTradgVol": "volume", "TtlNbOfTxsExctd": "trades", "SctySrs": "series"})
        else: # Mid/Legacy
            rename_map = {"TIMESTAMP": "date", "SYMBOL": "symbol", "SERIES": "series", "OPEN": "open", "HIGH": "high", "LOW": "low", "CLOSE": "close", "TOTTRDQTY": "volume"}
            if "ISIN" in cols: rename_map["ISIN"] = "isin"
            if "TOTALTRADES" in cols: rename_map["TOTALTRADES"] = "trades"
            df = df.rename(columns=rename_map)
            if "isin" not in df.columns: df["isin"] = None
        
        if "series" in df.columns:
            df = df[df["series"].str.strip() == "EQ"].copy()
        
        df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
        return df
    except Exception as e:
        logger.error(f"Error parsing NSE bhav {filepath}: {e}")
        return None

def parse_bse_bhav(filepath):
    try:
        with zipfile.ZipFile(filepath) as z:
            csv_name = next((n for n in z.namelist() if n.lower().endswith(".csv")), None)
            if not csv_name: return None
            df = pd.read_csv(z.open(csv_name))
        
        df.columns = df.columns.str.strip()
        rename_map = {
            "CODE": "bse_code", "SC_CODE": "bse_code", "FinInstrmId": "bse_code",
            "NAME": "name", "SC_NAME": "name", "FinInstrmNm": "name",
            "OPEN": "open", "OpnPric": "open",
            "HIGH": "high", "HghPric": "high",
            "LOW": "low", "LwPric": "low",
            "CLOSE": "close", "ClsPric": "close",
            "TOTTRDQTY": "volume", "NO_OF_SHRS": "volume", "TtlTradgVol": "volume",
            "NO_TRADES": "trades", "TtlNbOfTxsExctd": "trades",
            "ISIN": "isin", "ISIN_CODE": "isin",
            "TradDt": "date", "TckrSymb": "symbol"
        }
        for old_col, new_col in rename_map.items():
            if old_col in df.columns and new_col not in df.columns:
                df = df.rename(columns={old_col: new_col})
        
        if "isin" not in df.columns: df["isin"] = None
        
        # Date normalization
        if "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
        else:
            # Extract date from filename for older ones!
            fname = filepath.name
            if fname.startswith("EQ") and "_" in fname:
                dt_str = fname[2:8] # DDMMYY
                dt = datetime.strptime(dt_str, "%d%m%y").strftime("%Y-%m-%d")
                df["date"] = dt
            else:
                 import re
                 match = re.search(r"(\d{8})", fname)
                 if match:
                     dt = datetime.strptime(match.group(1), "%Y%m%d").strftime("%Y-%m-%d")
                     df["date"] = dt
        
        return df
    except Exception as e:
        logger.error(f"Error parsing BSE bhav {filepath}: {e}")
        return None

def ingest_all():
    isin_cache, symbol_cache, bse_cache = _build_asset_caches()
    logger.info(f"Caches built: NSE symbols={len(symbol_cache)}, BSE codes={len(bse_cache)}, ISINs={len(isin_cache)}")
    
    with get_ts_connection() as ts_conn:
        # 1. Process NSE
        logger.info("Processing NSE Bhavcopies...")
        nse_files = sorted(list(RAW_NSE_DIR.rglob("*.zip")), reverse=True)
        # Limit for context execution
        nse_files = nse_files[:100] 
        
        processed_nse = 0
        total_rows = 0
        
        for filepath in nse_files:
            df = parse_nse_bhav(filepath)
            if df is None or "close" not in df.columns or "date" not in df.columns:
                logger.warning(f"Skipping {filepath}: required columns missing")
                continue
            
            price_rows = []
            for _, row in df.iterrows():
                if pd.isnull(row["close"]): continue
                
                isin = str(row["isin"]).strip() if pd.notnull(row["isin"]) else None
                symbol = str(row["symbol"]).strip() if pd.notnull(row["symbol"]) else None
                
                asset_id = (isin_cache.get(isin) if isin else None) or symbol_cache.get(symbol)
                if not asset_id: continue
                
                price_rows.append((
                    asset_id, row["date"], row.get("open"), row.get("high"), row.get("low"),
                    row["close"], row["close"], int(row.get("volume", 0) or 0), 
                    int(row.get("trades", 0) or 0), 'NSE'
                ))
            
            if price_rows:
                ts_conn.executemany("""
                    INSERT INTO daily_prices (
                        asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (asset_id, date, source_exchange) DO NOTHING
                """, price_rows)
                total_rows += len(price_rows)
            processed_nse += 1
            if processed_nse % 20 == 0:
                logger.info(f"NSE Progress: {processed_nse}/100 files, rows={total_rows}")
        
        # 2. Process BSE
        logger.info("Processing BSE Bhavcopies...")
        bse_files = sorted(list(RAW_BSE_DIR.rglob("*.zip")), reverse=True)
        # Limit for context execution
        bse_files = bse_files[:100]
        
        processed_bse = 0
        
        for filepath in bse_files:
            df = parse_bse_bhav(filepath)
            if df is None or "close" not in df.columns or "date" not in df.columns:
                logger.warning(f"Skipping {filepath}: required columns missing")
                continue
            
            price_rows = []
            for _, row in df.iterrows():
                if pd.isnull(row["close"]): continue
                
                isin = str(row["isin"]).strip() if pd.notnull(row["isin"]) else None
                bse_code = str(row["bse_code"]).strip() if pd.notnull(row["bse_code"]) else None
                
                asset_id = (isin_cache.get(isin) if isin else None) or bse_cache.get(bse_code)
                if not asset_id: continue
                
                price_rows.append((
                    asset_id, row["date"], row.get("open"), row.get("high"), row.get("low"),
                    row["close"], row["close"], int(row.get("volume", 0) or 0), 
                    int(row.get("trades", 0) or 0), 'BSE'
                ))
            
            if price_rows:
                ts_conn.executemany("""
                    INSERT INTO daily_prices (
                        asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (asset_id, date, source_exchange) DO NOTHING
                """, price_rows)
                total_rows += len(price_rows)
            processed_bse += 1
            if processed_bse % 20 == 0:
                logger.info(f"BSE Progress: {processed_bse}/100 files, total rows={total_rows}")
        
        ts_conn.commit()
    logger.info("Ingestion complete.")

if __name__ == "__main__":
    ingest_all()
