"""
Tests for Fundamentals Pipeline.
"""
import pytest
from datetime import date
from pipelines.nse_fundamentals import _safe_float
from pipelines.bse_corporate_actions_parser import classify_bse_action

def test_safe_float():
    assert _safe_float("1,234.56") == 1234.56
    assert _safe_float(None) is None
    assert _safe_float("invalid") is None

def test_classify_bse_action():
    assert classify_bse_action("Interim Dividend - Rs. - 43.0000") == "DIVIDEND"
    assert classify_bse_action("Bonus issue 1:1") == "BONUS"
    assert classify_bse_action("Sub-division of equity shares") == "SPLIT"

def test_nse_fetch_mock(mocker):
    # Mocking would happen here
    pass

if __name__ == "__main__":
    pytest.main([__file__])
