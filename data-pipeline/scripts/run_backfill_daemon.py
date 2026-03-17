#!/usr/bin/env python3
"""
Robust backfill daemon with auto-restart and progress tracking.

This wrapper runs the backfill in chunks and monitors for stalls.
If the process hangs for more than 10 minutes without progress, it auto-restarts.

Usage:
    python scripts/run_backfill_daemon.py 2006-07-11 2023-03-16
"""
import os
import sys
import time
import signal
import logging
import subprocess
from datetime import date, timedelta
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import execute_one

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("logs/backfill_daemon.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

CHUNK_SIZE_DAYS = 90  # Process 90 days at a time
STALL_TIMEOUT_SECONDS = 600  # 10 minutes without progress = stall
CHECK_INTERVAL_SECONDS = 30  # Check progress every 30 seconds


def get_last_successful_date(source: str = "NSE_BHAVCOPY") -> date:
    """Get the most recent date with successful pipeline run."""
    row = execute_one(
        """SELECT MAX(run_date) as last_date FROM pipeline_runs
           WHERE source = ? AND status = 'SUCCESS'""",
        (source,),
    )
    if row and row["last_date"]:
        return date.fromisoformat(row["last_date"])
    return date(2000, 1, 1)


def run_backfill_chunk(start: date, end: date) -> bool:
    """Run backfill for a date range. Returns True if successful."""
    logger.info(f"Starting backfill chunk: {start} to {end}")
    
    cmd = [
        sys.executable,
        "pipelines/backfill.py",
        start.isoformat(),
        end.isoformat()
    ]
    
    env = os.environ.copy()
    env["PYTHONPATH"] = str(Path(__file__).parent.parent)
    
    last_progress_time = time.time()
    last_date = get_last_successful_date()
    
    try:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            env=env
        )
        
        # Monitor process output and progress
        for line in iter(process.stdout.readline, ''):
            if line:
                print(line, end='')
                
                # Check if we made progress
                current_date = get_last_successful_date()
                if current_date > last_date:
                    last_date = current_date
                    last_progress_time = time.time()
                    logger.info(f"Progress: {current_date}")
                
                # Check for stall
                if time.time() - last_progress_time > STALL_TIMEOUT_SECONDS:
                    logger.error(f"Process stalled for {STALL_TIMEOUT_SECONDS}s, killing...")
                    process.kill()
                    return False
        
        process.wait()
        
        if process.returncode == 0:
            logger.info(f"Chunk completed successfully: {start} to {end}")
            return True
        else:
            logger.error(f"Chunk failed with exit code {process.returncode}")
            return False
            
    except Exception as e:
        logger.error(f"Error running chunk: {e}")
        try:
            process.kill()
        except:
            pass
        return False


def run_backfill_daemon(start: date, end: date):
    """Run backfill in chunks with auto-restart on stall."""
    logger.info(f"Starting backfill daemon: {start} to {end}")
    logger.info(f"Chunk size: {CHUNK_SIZE_DAYS} days")
    logger.info(f"Stall timeout: {STALL_TIMEOUT_SECONDS}s")
    
    current = start
    attempts = 0
    max_attempts = 3
    
    while current <= end:
        # Get actual progress from DB
        last_successful = get_last_successful_date()
        if last_successful >= end:
            logger.info("Backfill complete!")
            break
        
        # Start from last successful date + 1
        if last_successful > current:
            current = last_successful + timedelta(days=1)
            logger.info(f"Resuming from {current}")
        
        # Calculate chunk end
        chunk_end = min(current + timedelta(days=CHUNK_SIZE_DAYS), end)
        
        logger.info(f"Processing chunk {attempts + 1}: {current} to {chunk_end}")
        
        success = run_backfill_chunk(current, chunk_end)
        
        if success:
            # Move to next chunk
            current = chunk_end + timedelta(days=1)
            attempts = 0
        else:
            attempts += 1
            if attempts >= max_attempts:
                logger.error(f"Failed {max_attempts} times on chunk {current} to {chunk_end}")
                logger.error("Manual intervention required")
                sys.exit(1)
            
            logger.warning(f"Chunk failed, attempt {attempts}/{max_attempts}")
            logger.info("Waiting 30s before retry...")
            time.sleep(30)
    
    logger.info("Backfill daemon completed successfully!")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Robust backfill daemon")
    parser.add_argument("start_date", help="Start date (YYYY-MM-DD)")
    parser.add_argument("end_date", help="End date (YYYY-MM-DD)")
    
    args = parser.parse_args()
    
    start = date.fromisoformat(args.start_date)
    end = date.fromisoformat(args.end_date)
    
    run_backfill_daemon(start, end)
