Here is the complete, production-ready India Conviction Score framework — every parameter is objective, formulaically defined, and sourced from BSE/NSE public filings. The CSV reference files are attached for your engineering team.

***
# 🔬 Pre-Filter: Beneish M-Score (Run Before All Scoring)
This is computed entirely from financial statement data and acts as a forensic accounting gate. 

\[
M = -4.84 + 0.920 \cdot DSRI + 0.528 \cdot GMI + 0.404 \cdot AQI + 0.892 \cdot SGI + 0.115 \cdot DEPI - 0.172 \cdot SGAI + 4.679 \cdot TATA - 0.327 \cdot LVGI
\]

| M-Score Result | Action |
|---|---|
| M > −1.78 | 🟡 Cap overall score at 5/10. Display "Forensic Review Required" badge |
| M ≤ −1.78 | ✅ Proceed to full scoring |

All 8 components (DSRI, GMI, AQI, SGI, DEPI, SGAI, TATA, LVGI) are derived exclusively from P&L, Balance Sheet, and Cash Flow — available from BSE XBRL filings for all listed companies.

***
# 📈 Score 1: Growth (0–10)
**Decision dropped:** 1-year YoY. Use 3-year CAGR only — eliminates COVID base effects, election-year anomalies, and one-time commodity windfalls.
### Non-BFSI Formula
| Sub-Metric | Weight | Formula | Data Source | Bands → Points |
|---|---|---|---|---|
| Revenue CAGR (3Y) | **25%** | \((Rev_t / Rev_{t-3})^{1/3} - 1\) | P&L: Operating Revenue, Consolidated | <0%→0 \| 0–8%→2 \| 8–15%→5 \| 15–25%→7.5 \| >25%→10 |
| Adj. PAT CAGR (3Y) | **25%** | \((PAT_{adj,t} / PAT_{adj,t-3})^{1/3} - 1\) | P&L: PAT minus exceptional items (net of tax) | <0%→0 \| 0–10%→2 \| 10–20%→5 \| 20–35%→7.5 \| >35%→10 |
| CFO CAGR (3Y) | **30%** | \((CFO_t / CFO_{t-3})^{1/3} - 1\) | CF Statement: Cash from Operations (post working capital) | <0%→0 \| 0–8%→2 \| 8–15%→5 \| 15–25%→7.5 \| >25%→10 |
| Diluted EPS CAGR (3Y) | **20%** | \((EPS_{dil,t} / EPS_{dil,t-3})^{1/3} - 1\) | P&L: Diluted EPS (Ind AS 33) | <0%→0 \| 0–8%→2 \| 8–15%→5 \| 15–25%→7.5 \| >25%→10 |

**Dilution penalty:** If shares outstanding grew >8% over 3 years, deduct 1 pt from EPS sub-score only. Sources: QIP/rights issue disclosures on BSE.

**If CFO(t-3) is negative:** Use 5-year CAGR. If 5-year base is also negative, score CFO sub-metric = 0 and flag "Cash Flow History Insufficient."
### BFSI Equivalent
Replace Revenue + CFO with: Net Advances/AUM CAGR (30% weight) and NII CAGR (30% weight). Strip one-time provision reversals from PAT before computing PAT CAGR.

***
# 💰 Score 2: Profitability (0–10)
**Decision dropped:** Single-year margin snapshot. Use 3-year averages + trend direction together.
### Non-BFSI Formula
| Sub-Metric | Weight | Formula | Bands → Points | Key Edge Case |
|---|---|---|---|---|
| ROCE (3Y Avg) | **30%** | \(\text{Avg}_{3Y}(EBIT / (TA - CL))\) | <8%→0 \| 8–12%→2 \| 12–18%→5 \| 18–25%→7.5 \| >25%→10 | Switch to ROE for IT/FMCG (asset-light, flag sector) |
| EBITDA Margin (3Y Avg) | **25%** | \(\text{Avg}_{3Y}(EBITDA / OpRevenue)\) | <5%→0 \| 5–10%→2 \| 10–18%→5 \| 18–28%→7.5 \| >28%→10 | Cyclicals: use 5Y avg margin, flag if current margin deviates >800bps |
| CFO / PAT Ratio (3Y Avg) | **30%** | \(\text{Avg}_{3Y}(CFO / Adj.PAT)\) | <0.5x→0 \| 0.5–0.75x→2 \| 0.75–1x→5 \| 1–1.3x→7.5 \| >1.3x→10 | This is intentionally double-counted from Health — it is that critical for India |
| EBITDA Margin Trend | **15%** | \(Margin_t - Margin_{t-3}\) in pp | <−8pp→0 \| −8 to −3pp→2 \| ±3pp→5 \| +3 to +8pp→7.5 \| >+8pp→10 | A 12% margin expanding to 20% beats a 25% margin declining to 18% |
### BFSI Equivalent
Use ROE (25%), NIM (30%), Cost-to-Income ratio (25%), Credit Cost (20%). All calculable from quarterly results in RBI-mandated disclosure format.

***
# 🏥 Score 3: Financial Health (0–10)
This is the most branched score. The same metric is actively harmful if applied across sector types.
### Branch A: Non-BFSI
| Sub-Metric | Weight | Formula | Bands → Points |
|---|---|---|---|
| Net Debt / EBITDA | **30%** | \((TotalDebt - Cash) / EBITDA_{TTM}\) | >5x→0 \| 3–5x→2 \| 1.5–3x→5 \| 0–1.5x→7.5 \| Net Cash→10 |
| Interest Coverage (ICR) | **25%** | \(EBIT_{TTM} / FinanceCosts_{TTM}\) | <1x→0 \| 1–2x→2 \| 2–4x→5 \| 4–8x→7.5 \| >8x or debt-free→10 |
| Current Ratio | **15%** | \(CurrentAssets / CurrentLiabilities\) | <0.8x→0 \| 0.8–1x→2 \| 1–1.5x→5 \| 1.5–2.5x→7.5 \| >2.5x→10 |
| CFO / PAT (3Y Avg) | **20%** | Same as Profitability sub-metric | Same bands |
| Promoter Pledge % | **10%** | \(PledgedShares / TotalPromoterHolding \times 100\) | >40%→0 \| 20–40%→2 \| 10–20%→5 \| 1–10%→7.5 \| 0%→10 |

**Ind AS 116 note:** Lease liabilities under Ind AS 116 inflate reported debt. Exclude operating lease liabilities from Net Debt calculation for retail, hospitality, and airline companies (Dmart, Indian Hotels, IndiGo) or it artificially tanks Health scores.
### Branch B: BFSI
| Sub-Metric | Weight | Formula | Bands → Points |
|---|---|---|---|
| GNPA Ratio | **25%** | \(GrossNPA / GrossAdvances \times 100\) | >8%→0 \| 5–8%→2 \| 3–5%→5 \| 1.5–3%→7.5 \| <1.5%→10 |
| NNPA Ratio | **20%** | \(NetNPA / NetAdvances \times 100\) | >4%→0 \| 2–4%→2 \| 1–2%→5 \| 0.5–1%→7.5 \| <0.5%→10 |
| Provision Coverage (PCR) | **20%** | \(Provisions / GrossNPA \times 100\) | <40%→0 \| 40–55%→2 \| 55–70%→5 \| 70–80%→7.5 \| >80%→10 |
| Capital Adequacy (CRAR) | **25%** | \((Tier1 + Tier2) / RWA \times 100\) | <10%→0 \| 10–12%→2 \| 12–15%→5 \| 15–18%→7.5 \| >18%→10  [vinodkothari](https://vinodkothari.com/2022/04/like-banks-nbfc-ul-to-maintain-cet-1-capital/) |
| CASA Ratio | **10%** | \(CASADeposits / TotalDeposits \times 100\) | <20%→0 \| 20–30%→2 \| 30–40%→5 \| 40–50%→7.5 \| >50%→10 |

**NBFC note:** Skip CASA (not applicable), redistribute its 10% weight to PCR and CRAR equally.

***
# 🏛️ Score 4: Governance (0–10)
All 6 sub-metrics sourced exclusively from **BSE mandatory regulatory filings** — no subjective inputs, no analyst judgment required. 

| Sub-Metric | Weight | Formula | Source | Bands → Points |
|---|---|---|---|---|
| Promoter Pledge % | **20%** | \(PledgedShares / TotalPromoterHolding \times 100\) | BSE SAST Reg 29(2) + LODR Reg 31 quarterly XML | >40%→0 \| 20–40%→2 \| 10–20%→5 \| 1–10%→7.5 \| 0%→10 |
| Promoter Holding Trend (4Q) | **15%** | \(PromoterHolding_{Q0} - PromoterHolding_{Q-4}\) in pp | BSE quarterly shareholding pattern (Reg 31) | <−5pp→0 \| −5 to −2pp→2 \| ±2pp→5 \| +2 to +4pp→7.5 \| >+4pp→10 |
| RPT as % of Revenue | **20%** | \(TotalRPT / OperatingRevenue \times 100\) | Notes to Accounts: Ind AS 24 disclosure (BSE XBRL) | >20%→0 \| 10–20%→2 \| 5–10%→5 \| 1–5%→7.5 \| <1%→10 |
| Audit Firm Quality | **15%** | Categorical: Flag if Qualified/Adverse opinion. Tier by firm. | Annual Report: Auditor's Report + Auditor name in XBRL | Qualified/Unknown firm→0–3 \| Reputed regional→6 \| Big 4 clean→8 \| Big 4 clean ≥5Y→10 |
| Board Independence % | **15%** | \(IndependentDirectors / TotalBoardSize \times 100\) | CG Report: SEBI LODR Reg 27 quarterly filing | <25%→0 \| 25–33%→2 \| 33–40%→5 \| 40–50%→7.5 \| >50%→10 |
| Promoter Remuneration / PAT | **15%** | \((Promoter Salaries + Commissions) / Adj.PAT \times 100\) | Schedule V of Annual Report (Companies Act 2013) | >10%→0 \| 5–10%→2 \| 3–5%→5 \| 1–3%→7.5 \| <1%→10 |

**Pledge momentum flag:** If pledge increased >5pp in a single quarter, subtract 1 pt from the sub-score regardless of absolute level — direction matters as much as level.

***
# 📊 Score 5: Valuation (0–10)
**Key principle:** Score relative to the company's own history first, sector peers second. Absolute multiples alone are meaningless for Indian quality compounders.
### Non-BFSI
| Sub-Metric | Weight | Formula | Bands → Points | Edge Case |
|---|---|---|---|---|
| P/E vs Own 5Y Median | **30%** | \(CurrentPE / Median(PE_{last5Y})\) | >2x→0 \| 1.5–2x→2 \| 1–1.5x→5 \| 0.8–1x→7.5 \| <0.8x→10 | If structurally re-rated (above 5Y median for >36 months), revise median up 20% |
| EV/EBITDA vs Sector Median | **30%** | \((MktCap+NetDebt)/EBITDA\) vs peer median | >2x sector→0 \| 1.5–2x→2 \| 1–1.5x→5 \| at sector→7.5 \| below→10 | Cyclicals: use normalised EBITDA (5Y avg margin × current revenue) |
| PEG Ratio | **20%** | \(TrailingPE / EPS_{CAGR3Y}\) | >3x→0 \| 2–3x→2 \| 1.5–2x→5 \| 1–1.5x→7.5 \| <1x→10 | Skip if EPS CAGR < 5% or PE is negative; redistribute weight to FCF Yield |
| FCF Yield | **20%** | \((CFO - Capex) / MarketCap \times 100\) | <0%→0 \| 0–1%→2 \| 1–2.5%→5 \| 2.5–5%→7.5 \| >5%→10 | If Capex/Dep >3x AND Revenue growth >15%: score as 5 (neutral) — don't penalise growth capex |
### BFSI Equivalent
Replace EV/EBITDA + PEG + FCF with: P/Book vs Own 5Y Median (40%), P/Book vs Sector Median (30%), Price/PPOP (30%). 

***
# ⚡ Hard Override Conditions
These 10 rules fire **before** the composite is computed and override it entirely. 

| Condition | Effect | Flag |
|---|---|---|
| ICR < 1x for **2 consecutive years** | Health = 0, Overall capped at 3/10 | 🔴 Debt Service Crisis |
| CFO negative for **3 consecutive years** (non-startup) | Health = 0, Profit capped at 3/10 | 🔴 Cash Burning Operations |
| Promoter Pledge > 60% | Governance = 0, Overall capped at 4/10 | 🔴 Pledge Crisis |
| Qualified / Adverse / Disclaimer audit opinion in last 2Y | Governance = 0, Beneish auto-flagged | 🔴 Accounting Integrity |
| Any debt default in last 3 years | Health = 0, Overall capped at 3/10 | 🔴 Default History |
| GNPA > 12% (BFSI only) | Health = 0, Overall capped at 3/10 | 🔴 Credit Quality Crisis |
| Beneish M-Score > −1.78 | Overall capped at 5/10 | 🟡 Forensic Review |
| Net Debt/EBITDA > 8x (non-BFSI, non-infra) | Health = 0 | 🔴 Extreme Leverage |
| RPT > 30% of Revenue | Governance = 0 | 🔴 Value Extraction Risk |
| Promoter holding < 15% AND falling for 4 consecutive quarters | Governance capped at 3/10 | 🟡 Promoter Disengagement |

***
# 🧮 Final Composite Formula
\[
\text{Conviction Score} = (G \times w_G) + (P \times w_P) + (H \times w_H) + (Gov \times w_{Gov}) + (V \times w_V)
\]
### Sector Weight Matrix
| Sector | Growth | Profit | Health | Gov | Valuation |
|---|---|---|---|---|---|
| Diversified Mfg / Auto | 20% | 25% | 25% | 20% | 10% |
| FMCG / Consumer Staples | 20% | 30% | 15% | 20% | 15% |
| IT Services | 25% | 25% | 10% | 20% | 20% |
| Pharma / Specialty Chem | 20% | 25% | 15% | 20% | 20% |
| Infrastructure / EPC | 15% | 20% | 30% | 20% | 15% |
| Metals / Commodities | 15% | 20% | 25% | 20% | 20% |
| New-Age / Loss-Making | 40% | 5% | 20% | 25% | 10% |
| Private Banks | 20% | 25% | 30% | 15% | 10% |
| PSU Banks | 15% | 15% | 40% | 15% | 15% |
| NBFCs / HFCs | 25% | 20% | 30% | 15% | 10% |

***
# 📐 Worked Illustration
The three-company radar above shows exactly the behaviour the framework is designed to produce: Pidilite scores near-perfect on Health and Governance but low on Valuation (correctly reflecting its quality premium); Coal India scores high on Health (genuinely debt-free) but low on Growth (correctly reflecting its stagnant business); HDFC Bank scores moderate on Valuation (correctly noting it is not cheap on P/B). 

The composite build-up bar makes the sector-weighting effect visible — Health dominates the PSU Bank score; Profitability dominates FMCG. That is by design.