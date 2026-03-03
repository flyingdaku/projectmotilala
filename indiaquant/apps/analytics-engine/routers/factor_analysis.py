"""
Factor analysis router.
Fama-French 3-factor, Carhart 4-factor, and FF5-factor regression.
Uses statsmodels OLS for regression.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
import statsmodels.api as sm

router = APIRouter()


class FactorAnalysisRequest(BaseModel):
    portfolio_returns: list[dict]  # [{"date": "YYYY-MM-DD", "return": 0.01}, ...]
    model: str = "FF3"  # FF3 | CARHART4 | FF5
    start_date: str | None = None
    end_date: str | None = None


class FactorRegressionResult(BaseModel):
    alpha: float
    alpha_pvalue: float
    beta_market: float
    beta_smb: float | None
    beta_hml: float | None
    beta_mom: float | None
    r_squared: float
    tracking_error: float
    information_ratio: float
    rolling_alpha: list[dict]


@router.post("/run", response_model=FactorRegressionResult)
async def run_factor_analysis(request: FactorAnalysisRequest):
    """
    Run factor regression on portfolio returns.
    Fetches India factor data (Nifty 50 as market, size/value proxies) from Supabase.
    """
    try:
        from db.repository import FactorDataRepository

        repo = FactorDataRepository()
        factor_data = await repo.get_factor_data(
            model=request.model,
            start_date=request.start_date,
            end_date=request.end_date,
        )

        # Build portfolio returns series
        port_df = pd.DataFrame(request.portfolio_returns)
        port_df["date"] = pd.to_datetime(port_df["date"])
        port_df = port_df.set_index("date").sort_index()

        # Merge with factor data
        merged = port_df.join(factor_data, how="inner")
        if len(merged) < 30:
            raise HTTPException(
                status_code=400,
                detail="Insufficient overlapping data for factor regression (need ≥30 observations)"
            )

        # Excess returns over risk-free rate
        y = merged["return"] - merged.get("rf", 0)

        # Build factor matrix
        factors = ["mkt_rf"]
        if request.model in ("FF3", "CARHART4", "FF5"):
            factors += ["smb", "hml"]
        if request.model in ("CARHART4",):
            factors += ["mom"]
        if request.model == "FF5":
            factors += ["rmw", "cma"]

        available_factors = [f for f in factors if f in merged.columns]
        X = sm.add_constant(merged[available_factors])

        # OLS regression
        model = sm.OLS(y, X).fit()

        alpha_annualized = model.params.get("const", 0) * 252
        alpha_pvalue = model.pvalues.get("const", 1.0)

        # Tracking error and information ratio
        residuals = model.resid
        tracking_error = float(residuals.std() * np.sqrt(252))
        info_ratio = alpha_annualized / tracking_error if tracking_error > 0 else 0

        # Rolling 12-month alpha (252 trading days)
        rolling_alpha = []
        window = 252
        for i in range(window, len(merged)):
            window_y = y.iloc[i - window:i]
            window_X = X.iloc[i - window:i]
            try:
                roll_model = sm.OLS(window_y, window_X).fit()
                roll_alpha = roll_model.params.get("const", 0) * 252
                rolling_alpha.append({
                    "date": str(merged.index[i].date()),
                    "alpha": round(float(roll_alpha), 6),
                })
            except Exception:
                continue

        return FactorRegressionResult(
            alpha=round(float(alpha_annualized), 6),
            alpha_pvalue=round(float(alpha_pvalue), 6),
            beta_market=round(float(model.params.get("mkt_rf", 0)), 4),
            beta_smb=round(float(model.params.get("smb", 0)), 4) if "smb" in available_factors else None,
            beta_hml=round(float(model.params.get("hml", 0)), 4) if "hml" in available_factors else None,
            beta_mom=round(float(model.params.get("mom", 0)), 4) if "mom" in available_factors else None,
            r_squared=round(float(model.rsquared), 4),
            tracking_error=round(tracking_error, 6),
            information_ratio=round(info_ratio, 4),
            rolling_alpha=rolling_alpha,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
