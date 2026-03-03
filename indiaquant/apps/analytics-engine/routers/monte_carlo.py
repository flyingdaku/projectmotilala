"""
Monte Carlo simulation router.
Supports accumulation (portfolio growth) and decumulation (retirement survival) modes.
10,000 simulation paths using vectorized NumPy operations.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import numpy as np

router = APIRouter()


class MonteCarloRequest(BaseModel):
    initial_corpus: float = Field(gt=0)
    monthly_contribution: float = Field(ge=0, default=0)
    annual_withdrawal: float = Field(ge=0, default=0)
    years: int = Field(ge=1, le=60)
    expected_return: float  # annual, e.g. 0.12
    std_dev: float = Field(gt=0)  # annual
    inflation_rate: float = Field(ge=0, default=0.06)
    num_simulations: int = Field(ge=1000, le=10000, default=10000)
    method: str = "PARAMETERIZED"  # PARAMETERIZED | HISTORICAL_BOOTSTRAP


class MonteCarloResponse(BaseModel):
    probability_of_success: float
    percentiles: dict[str, list[float]]
    years: list[int]
    median_final_value: float


@router.post("/run", response_model=MonteCarloResponse)
async def run_monte_carlo(request: MonteCarloRequest):
    """
    Run Monte Carlo simulation with vectorized NumPy operations.
    Returns percentile fan chart data for visualization.
    """
    try:
        n_sims = request.num_simulations
        n_years = request.years
        monthly_rate = (1 + request.expected_return) ** (1 / 12) - 1
        monthly_std = request.std_dev / np.sqrt(12)
        monthly_inflation = (1 + request.inflation_rate) ** (1 / 12) - 1

        # Vectorized simulation: shape (n_sims, n_years * 12)
        n_months = n_years * 12
        random_returns = np.random.normal(
            monthly_rate, monthly_std, size=(n_sims, n_months)
        )

        # Simulate all paths simultaneously
        corpus = np.full(n_sims, request.initial_corpus)
        annual_snapshots = np.zeros((n_sims, n_years))
        monthly_contribution = request.monthly_contribution
        annual_withdrawal = request.annual_withdrawal / 12  # Monthly withdrawal

        for month in range(n_months):
            corpus = corpus * (1 + random_returns[:, month])
            corpus += monthly_contribution
            corpus -= annual_withdrawal
            corpus = np.maximum(corpus, 0)  # Floor at 0 — portfolio can't go negative

            # Adjust withdrawal for inflation annually
            if month > 0 and month % 12 == 0:
                annual_withdrawal *= (1 + monthly_inflation * 12)

            if (month + 1) % 12 == 0:
                year_idx = (month + 1) // 12 - 1
                annual_snapshots[:, year_idx] = corpus

        # Probability of success (corpus > 0 at end)
        prob_success = float(np.mean(corpus > 0))

        # Percentile fan chart
        percentile_values = {
            "p10": [],
            "p25": [],
            "p50": [],
            "p75": [],
            "p90": [],
        }
        for year_idx in range(n_years):
            year_data = annual_snapshots[:, year_idx]
            percentile_values["p10"].append(round(float(np.percentile(year_data, 10)), 2))
            percentile_values["p25"].append(round(float(np.percentile(year_data, 25)), 2))
            percentile_values["p50"].append(round(float(np.percentile(year_data, 50)), 2))
            percentile_values["p75"].append(round(float(np.percentile(year_data, 75)), 2))
            percentile_values["p90"].append(round(float(np.percentile(year_data, 90)), 2))

        return MonteCarloResponse(
            probability_of_success=round(prob_success, 4),
            percentiles=percentile_values,
            years=list(range(1, n_years + 1)),
            median_final_value=round(float(np.median(corpus)), 2),
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
