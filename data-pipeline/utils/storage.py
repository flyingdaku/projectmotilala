"""
Raw file storage utility.
Saves raw downloaded files (ZIP/CSV/TXT) to disk for audit and reprocessing.
"""
import os
import logging
from datetime import date
from pathlib import Path

logger = logging.getLogger(__name__)

RAW_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data")


def get_raw_path(source: str, trade_date: date, filename: str) -> Path:
    """
    Returns the path where a raw file should be stored.
    Structure: raw_data/{source}/{YYYY}/{MM}/{filename}
    """
    dir_path = Path(RAW_DATA_DIR) / source / str(trade_date.year) / f"{trade_date.month:02d}"
    dir_path.mkdir(parents=True, exist_ok=True)
    return dir_path / filename


def save_raw_file(source: str, trade_date: date, filename: str, content: bytes) -> Path:
    """
    Save raw bytes to disk. Returns the path where it was saved.
    Skips if file already exists (idempotent).
    """
    path = get_raw_path(source, trade_date, filename)
    if path.exists():
        logger.debug(f"Raw file already exists, skipping: {path}")
        return path
    path.write_bytes(content)
    logger.info(f"Saved raw file: {path} ({len(content):,} bytes)")
    return path


def raw_file_exists(source: str, trade_date: date, filename: str) -> bool:
    """Check if a raw file has already been downloaded."""
    return get_raw_path(source, trade_date, filename).exists()


def load_raw_file(source: str, trade_date: date, filename: str) -> bytes:
    """Load a previously saved raw file."""
    path = get_raw_path(source, trade_date, filename)
    if not path.exists():
        raise FileNotFoundError(f"Raw file not found: {path}")
    return path.read_bytes()
