"""
Unit tests for corporate actions adjustment factor calculations.
Run with: pytest tests/test_corporate_actions.py -v
"""
import pytest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from pipelines.corporate_actions import calculate_adjustment_factor, _parse_ratio


# ─── ADJUSTMENT FACTOR TESTS ──────────────────────────────────────────────────

class TestSplit:
    def test_split_1_to_5(self):
        """1:5 split — 1 old share becomes 5 new shares, price divides by 5"""
        factor = calculate_adjustment_factor("SPLIT", 1, 5)
        assert factor == pytest.approx(0.2, rel=1e-6)

    def test_split_1_to_2(self):
        """1:2 split"""
        factor = calculate_adjustment_factor("SPLIT", 1, 2)
        assert factor == pytest.approx(0.5, rel=1e-6)

    def test_split_1_to_10(self):
        """1:10 split"""
        factor = calculate_adjustment_factor("SPLIT", 1, 10)
        assert factor == pytest.approx(0.1, rel=1e-6)

    def test_split_zero_denominator(self):
        """Zero denominator should return 1.0 (no adjustment)"""
        factor = calculate_adjustment_factor("SPLIT", 1, 0)
        assert factor == 1.0


class TestBonus:
    def test_bonus_1_to_1(self):
        """1:1 bonus — 1 bonus share per 1 held, holdings double, price halves"""
        factor = calculate_adjustment_factor("BONUS", 1, 1)
        assert factor == pytest.approx(0.5, rel=1e-6)

    def test_bonus_1_to_2(self):
        """1:2 bonus — 1 bonus per 2 held, total becomes 3 per 2 original"""
        factor = calculate_adjustment_factor("BONUS", 1, 2)
        assert factor == pytest.approx(2 / 3, rel=1e-6)

    def test_bonus_3_to_2(self):
        """3:2 bonus — 3 bonus per 2 held, total becomes 5 per 2 original"""
        factor = calculate_adjustment_factor("BONUS", 3, 2)
        assert factor == pytest.approx(0.4, rel=1e-6)

    def test_bonus_3_to_7(self):
        """3:7 bonus (fractional) — total becomes 10 per 7 original"""
        factor = calculate_adjustment_factor("BONUS", 3, 7)
        assert factor == pytest.approx(0.7, rel=1e-6)


class TestDividend:
    def test_dividend_10_on_100(self):
        """₹10 dividend on ₹100 stock → factor = 0.9"""
        factor = calculate_adjustment_factor("DIVIDEND", 0, 0, dividend_amount=10, prev_close=100)
        assert factor == pytest.approx(0.9, rel=1e-6)

    def test_dividend_5_on_200(self):
        """₹5 dividend on ₹200 stock → factor = 0.975"""
        factor = calculate_adjustment_factor("DIVIDEND", 0, 0, dividend_amount=5, prev_close=200)
        assert factor == pytest.approx(0.975, rel=1e-6)

    def test_dividend_zero_prev_close(self):
        """Zero prev_close should return 1.0 (cannot compute)"""
        factor = calculate_adjustment_factor("DIVIDEND", 0, 0, dividend_amount=10, prev_close=0)
        assert factor == 1.0

    def test_dividend_larger_than_price(self):
        """Dividend larger than price should be clamped to 0.01 minimum"""
        factor = calculate_adjustment_factor("DIVIDEND", 0, 0, dividend_amount=200, prev_close=100)
        assert factor >= 0.01


class TestRights:
    def test_rights_1_to_4_at_150_prev_200(self):
        """
        1:4 rights at ₹150 with prev_close ₹200
        TERP = (4*200 + 1*150) / 5 = (800 + 150) / 5 = 190
        Factor = 190 / 200 = 0.95
        """
        factor = calculate_adjustment_factor(
            "RIGHTS", ratio_num=1, ratio_den=4,
            rights_price=150, prev_close=200
        )
        assert factor == pytest.approx(0.95, rel=1e-4)

    def test_rights_1_to_2_at_100_prev_300(self):
        """
        1:2 rights at ₹100 with prev_close ₹300
        TERP = (2*300 + 1*100) / 3 = 700/3 ≈ 233.33
        Factor = 233.33 / 300 ≈ 0.7778
        """
        factor = calculate_adjustment_factor(
            "RIGHTS", ratio_num=1, ratio_den=2,
            rights_price=100, prev_close=300
        )
        assert factor == pytest.approx(700 / 900, rel=1e-4)

    def test_rights_zero_prev_close(self):
        """Zero prev_close should return 1.0"""
        factor = calculate_adjustment_factor("RIGHTS", 1, 4, rights_price=150, prev_close=0)
        assert factor == 1.0


class TestFaceValueChange:
    def test_fv_10_to_2(self):
        """Face value ₹10 → ₹2 is equivalent to 1:5 split"""
        factor = calculate_adjustment_factor("FACE_VALUE_CHANGE", 2, 10)
        assert factor == pytest.approx(0.2, rel=1e-6)

    def test_fv_10_to_5(self):
        """Face value ₹10 → ₹5 is equivalent to 1:2 split"""
        factor = calculate_adjustment_factor("FACE_VALUE_CHANGE", 5, 10)
        assert factor == pytest.approx(0.5, rel=1e-6)


class TestUnknownAction:
    def test_merger_returns_1(self):
        """MERGER should return 1.0 (handled separately)"""
        factor = calculate_adjustment_factor("MERGER", 0, 0)
        assert factor == 1.0

    def test_name_change_returns_1(self):
        """NAME_CHANGE should return 1.0"""
        factor = calculate_adjustment_factor("NAME_CHANGE", 0, 0)
        assert factor == 1.0

    def test_buyback_returns_1(self):
        """BUYBACK should return 1.0"""
        factor = calculate_adjustment_factor("BUYBACK", 0, 0)
        assert factor == 1.0


# ─── RATIO PARSING TESTS ──────────────────────────────────────────────────────

class TestParseRatio:
    def test_colon_format(self):
        assert _parse_ratio("1:5") == (1.0, 5.0)

    def test_slash_format(self):
        assert _parse_ratio("3/2") == (3.0, 2.0)

    def test_decimal_ratio(self):
        num, den = _parse_ratio("1.5:2.5")
        assert num == pytest.approx(1.5)
        assert den == pytest.approx(2.5)

    def test_empty_string(self):
        assert _parse_ratio("") == (0.0, 1.0)

    def test_none(self):
        assert _parse_ratio(None) == (0.0, 1.0)

    def test_spaces(self):
        assert _parse_ratio("1 : 5") == (1.0, 5.0)


# ─── CUMULATIVE FACTOR TESTS ──────────────────────────────────────────────────

class TestCumulativeAdjustment:
    def test_two_splits_compound(self):
        """Two 1:2 splits should compound: 0.5 * 0.5 = 0.25"""
        f1 = calculate_adjustment_factor("SPLIT", 1, 2)
        f2 = calculate_adjustment_factor("SPLIT", 1, 2)
        assert f1 * f2 == pytest.approx(0.25, rel=1e-6)

    def test_split_then_bonus(self):
        """1:5 split then 1:1 bonus: 0.2 * 0.5 = 0.1"""
        f1 = calculate_adjustment_factor("SPLIT", 1, 5)
        f2 = calculate_adjustment_factor("BONUS", 1, 1)
        assert f1 * f2 == pytest.approx(0.1, rel=1e-6)
