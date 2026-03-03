"""
Telegram bot alert utility.
Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env or environment variables.
"""
import os
import logging
import requests

logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")


def send_telegram_alert(message: str, level: str = "INFO") -> bool:
    """
    Send a message to the configured Telegram chat.
    Returns True on success, False on failure (never raises).
    """
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials not configured. Skipping alert.")
        return False

    emoji = {"INFO": "ℹ️", "SUCCESS": "✅", "WARNING": "⚠️", "ERROR": "❌"}.get(level, "📢")
    text = f"{emoji} *Artha Pipeline*\n{message}"

    try:
        resp = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": text,
                "parse_mode": "Markdown",
            },
            timeout=10,
        )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Failed to send Telegram alert: {e}")
        return False


def alert_pipeline_success(source: str, records: int, circuit_breaks: int, duration_ms: int):
    send_telegram_alert(
        f"*{source}* pipeline completed.\n"
        f"Records inserted: `{records}`\n"
        f"Circuit breaks: `{circuit_breaks}`\n"
        f"Duration: `{duration_ms}ms`",
        level="SUCCESS",
    )


def alert_pipeline_failure(source: str, error: str, run_date: str):
    send_telegram_alert(
        f"*{source}* pipeline FAILED on `{run_date}`.\n"
        f"Error: `{error[:500]}`",
        level="ERROR",
    )


def alert_circuit_break(symbol: str, reason: str, details: str):
    send_telegram_alert(
        f"Circuit break triggered for `{symbol}`.\n"
        f"Reason: `{reason}`\n"
        f"Details: {details}",
        level="WARNING",
    )
