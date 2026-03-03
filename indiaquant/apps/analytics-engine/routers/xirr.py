"""
XIRR / Performance router.
Newton-Raphson XIRR, TWR, and contribution analysis.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np

router = APIRouter()


class CashflowItem(BaseModel):
    date: str  # YYYY-MM-DD
    amount: float  # negative = outflow, positive = inflow


class XIRRRequest(BaseModel):
    cashflows: list[CashflowItem]


class XIRRResponse(BaseModel):
    xirr: float | None
    twr: float | None
    absolute_return: float
    cagr: float | None


@router.post("/calculate", response_model=XIRRResponse)
async def calculate_xirr(request: XIRRRequest):
    """Calculate XIRR, TWR, absolute return, and CAGR from cashflows."""
    try:
        if len(request.cashflows) < 2:
            raise HTTPException(status_code=400, detail="At least 2 cashflows required")

        from datetime import datetime

        dates = [datetime.strptime(cf.date, "%Y-%m-%d") for cf in request.cashflows]
        amounts = [cf.amount for cf in request.cashflows]
        first_date = dates[0]
        day_offsets = [(d - first_date).days for d in dates]

        def npv(rate: float) -> float:
            return sum(
                amt / (1 + rate) ** (days / 365)
                for amt, days in zip(amounts, day_offsets)
            )

        def npv_derivative(rate: float) -> float:
            return sum(
                -(days / 365) * amt / (1 + rate) ** (days / 365 + 1)
                for amt, days in zip(amounts, day_offsets)
            )

        # Newton-Raphson
        rate = 0.1
        xirr = None
        for _ in range(1000):
            npv_val = npv(rate)
            deriv = npv_derivative(rate)
            if abs(deriv) < 1e-15:
                break
            new_rate = rate - npv_val / deriv
            if abs(new_rate - rate) < 1e-10:
                xirr = new_rate
                break
            rate = new_rate
            if rate < -0.999 or rate > 100:
                break

        # Absolute return
        outflows = sum(abs(a) for a in amounts if a < 0)
        inflows = sum(a for a in amounts if a > 0)
        absolute_return = (inflows - outflows) / outflows if outflows > 0 else 0

        # CAGR
        years = (dates[-1] - dates[0]).days / 365
        cagr = None
        if outflows > 0 and inflows > 0 and years > 0:
            cagr = (inflows / outflows) ** (1 / years) - 1

        return XIRRResponse(
            xirr=round(xirr, 6) if xirr is not None else None,
            twr=None,  # TWR requires sub-period returns — computed client-side
            absolute_return=round(absolute_return, 6),
            cagr=round(cagr, 6) if cagr is not None else None,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
