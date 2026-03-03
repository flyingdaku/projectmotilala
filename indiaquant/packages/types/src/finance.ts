import { z } from "zod";
import { AssetClass, RebalanceFrequency, MonteCarloMethod } from "./enums";

/**
 * Finance-domain types used across the analytics engine and client.
 * These are NOT database tables — they are computation inputs/outputs.
 */

// ---------------------------------------------------------------------------
// Asset Allocation
// ---------------------------------------------------------------------------

export const AssetAllocationSchema = z.object({
  asset_id: z.string(), // e.g. "NIFTY50", "GOLD_MCX"
  asset_class: z.nativeEnum(AssetClass),
  label: z.string(),
  weight: z.number().min(0).max(100), // percentage, must sum to 100
});
export type AssetAllocation = z.infer<typeof AssetAllocationSchema>;

export const PortfolioAllocationSchema = z.object({
  name: z.string(),
  allocations: z.array(AssetAllocationSchema),
  rebalance_frequency: z.nativeEnum(RebalanceFrequency),
  rebalance_threshold: z.number().min(0).max(50).nullable(), // % drift before rebalance
});
export type PortfolioAllocation = z.infer<typeof PortfolioAllocationSchema>;

// ---------------------------------------------------------------------------
// Backtest Inputs / Outputs
// ---------------------------------------------------------------------------

export const BacktestInputSchema = z.object({
  portfolio: PortfolioAllocationSchema,
  benchmark_id: z.string().nullable(), // e.g. "NIFTY50"
  start_date: z.string().date(),
  end_date: z.string().date(),
  initial_amount: z.number().positive(),
  monthly_contribution: z.number().min(0).default(0),
  inflation_adjusted: z.boolean().default(false),
  expense_ratio: z.number().min(0).max(5).default(0), // % per annum
});
export type BacktestInput = z.infer<typeof BacktestInputSchema>;

export const BacktestMetricsSchema = z.object({
  cagr: z.number(),
  std_dev: z.number(),
  sharpe_ratio: z.number(),
  sortino_ratio: z.number(),
  max_drawdown: z.number(), // negative number, e.g. -0.55 = -55%
  max_drawdown_date: z.string().date(),
  recovery_period_days: z.number().nullable(),
  longest_drawdown_days: z.number(),
  total_return: z.number(),
  final_value: z.number(),
  ulcer_index: z.number(),
  calmar_ratio: z.number(),
});
export type BacktestMetrics = z.infer<typeof BacktestMetricsSchema>;

export const BacktestDataPointSchema = z.object({
  date: z.string().date(),
  portfolio_value: z.number(),
  benchmark_value: z.number().nullable(),
  drawdown: z.number(), // current drawdown from peak, e.g. -0.15
  inflation_adjusted_value: z.number().nullable(),
});
export type BacktestDataPoint = z.infer<typeof BacktestDataPointSchema>;

export const BacktestResultSchema = z.object({
  metrics: BacktestMetricsSchema,
  data_points: z.array(BacktestDataPointSchema),
  annual_returns: z.record(z.string(), z.number()), // { "2020": 0.15, "2021": 0.28 }
  monthly_returns: z.record(z.string(), z.number()), // { "2020-01": 0.03 }
  rolling_returns: z.object({
    one_year: z.array(z.object({ date: z.string(), value: z.number() })),
    three_year: z.array(z.object({ date: z.string(), value: z.number() })),
    five_year: z.array(z.object({ date: z.string(), value: z.number() })),
    ten_year: z.array(z.object({ date: z.string(), value: z.number() })),
  }),
});
export type BacktestResult = z.infer<typeof BacktestResultSchema>;

// ---------------------------------------------------------------------------
// Monte Carlo Simulation
// ---------------------------------------------------------------------------

export const MonteCarloInputSchema = z.object({
  initial_corpus: z.number().positive(),
  monthly_contribution: z.number().min(0),
  target_corpus: z.number().positive().nullable(),
  years: z.number().int().min(1).max(60),
  expected_return: z.number(), // annual, e.g. 0.12 = 12%
  std_dev: z.number().positive(), // annual
  inflation_rate: z.number().min(0).default(0.06),
  num_simulations: z.number().int().min(1000).max(10000).default(10000),
  method: z.nativeEnum(MonteCarloMethod),
  // Decumulation mode
  annual_withdrawal: z.number().min(0).default(0),
});
export type MonteCarloInput = z.infer<typeof MonteCarloInputSchema>;

export const MonteCarloResultSchema = z.object({
  probability_of_success: z.number().min(0).max(1),
  percentiles: z.object({
    p10: z.array(z.number()),
    p25: z.array(z.number()),
    p50: z.array(z.number()),
    p75: z.array(z.number()),
    p90: z.array(z.number()),
  }),
  years: z.array(z.number()),
  median_final_value: z.number(),
});
export type MonteCarloResult = z.infer<typeof MonteCarloResultSchema>;

// ---------------------------------------------------------------------------
// Safe Withdrawal Rate
// ---------------------------------------------------------------------------

export const SWRResultSchema = z.object({
  safemax: z.number(), // worst-case SWR across all historical start years
  perpetual_rate: z.number(),
  long_term_rate: z.number(),
  by_start_year: z.record(
    z.string(), // start year e.g. "1990"
    z.object({
      safe_rate: z.number(),
      portfolio_survived: z.boolean(),
    })
  ),
});
export type SWRResult = z.infer<typeof SWRResultSchema>;

// ---------------------------------------------------------------------------
// Tax Calculation
// ---------------------------------------------------------------------------

export const TaxLotMatchSchema = z.object({
  lot_id: z.string().uuid(),
  purchase_date: z.string().date(),
  sale_date: z.string().date(),
  units_sold: z.string(), // decimal string
  purchase_nav: z.string(), // decimal string
  sale_nav: z.string(), // decimal string
  purchase_amount: z.string(), // decimal string
  sale_amount: z.string(), // decimal string
  grandfathered_cost: z.string().nullable(), // Jan 31 2018 cost for LTCG
  holding_period_days: z.number().int(),
  is_long_term: z.boolean(), // >365 days for equity
  gain_loss: z.string(), // decimal string — can be negative
  tax_type: z.enum(["STCG", "LTCG", "DEBT_SLAB"]),
  applicable_tax_rate: z.number(), // e.g. 0.125 = 12.5%
});
export type TaxLotMatch = z.infer<typeof TaxLotMatchSchema>;

export const TaxSummarySchema = z.object({
  financial_year: z.string(), // e.g. "FY_2024_25"
  total_ltcg: z.string(), // decimal string
  total_stcg: z.string(), // decimal string
  ltcg_exempt: z.string(), // ₹1.25L exemption applied
  ltcg_taxable: z.string(),
  stcg_taxable: z.string(),
  estimated_ltcg_tax: z.string(),
  estimated_stcg_tax: z.string(),
  lot_matches: z.array(TaxLotMatchSchema),
});
export type TaxSummary = z.infer<typeof TaxSummarySchema>;

// ---------------------------------------------------------------------------
// SIP Calculator
// ---------------------------------------------------------------------------

export const SIPInputSchema = z.object({
  monthly_amount: z.number().positive(),
  annual_step_up_percent: z.number().min(0).max(100).default(0),
  expected_return: z.number(), // annual CAGR, e.g. 0.12
  years: z.number().int().min(1).max(50),
  inflation_rate: z.number().min(0).default(0.06),
});
export type SIPInput = z.infer<typeof SIPInputSchema>;

export const SIPResultSchema = z.object({
  total_invested: z.number(),
  final_value: z.number(),
  total_gains: z.number(),
  inflation_adjusted_value: z.number(),
  year_by_year: z.array(
    z.object({
      year: z.number(),
      invested: z.number(),
      value: z.number(),
      gains: z.number(),
    })
  ),
});
export type SIPResult = z.infer<typeof SIPResultSchema>;

// ---------------------------------------------------------------------------
// Factor Analysis
// ---------------------------------------------------------------------------

export const FactorRegressionResultSchema = z.object({
  alpha: z.number(), // annualized alpha
  alpha_pvalue: z.number(),
  beta_market: z.number(),
  beta_smb: z.number().nullable(), // Fama-French SMB
  beta_hml: z.number().nullable(), // Fama-French HML
  beta_mom: z.number().nullable(), // Carhart momentum
  r_squared: z.number(),
  tracking_error: z.number(),
  information_ratio: z.number(),
  rolling_alpha: z.array(z.object({ date: z.string(), alpha: z.number() })),
});
export type FactorRegressionResult = z.infer<typeof FactorRegressionResultSchema>;
