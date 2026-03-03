import { z } from "zod";

/**
 * API request/response schemas for the FastAPI analytics engine.
 * All FastAPI endpoints validate inputs and outputs against these schemas.
 */

// ---------------------------------------------------------------------------
// Generic API response wrapper
// ---------------------------------------------------------------------------

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  });

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).nullable(),
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

// ---------------------------------------------------------------------------
// CAS Parser API (client-side only — these types describe the parsed output)
// ---------------------------------------------------------------------------

export const CASTransactionSchema = z.object({
  folio_number: z.string(),
  scheme_name: z.string(),
  isin: z.string().nullable(),
  amc_name: z.string(),
  date: z.string().date(),
  transaction_type: z.string(), // Raw string from PDF — normalized in app
  units: z.string(), // decimal string
  nav: z.string(), // decimal string
  amount: z.string(), // decimal string
  balance_units: z.string(), // units after this transaction
});
export type CASTransaction = z.infer<typeof CASTransactionSchema>;

export const CASParseResultSchema = z.object({
  investor_name: z.string().nullable(),
  pan: z.string().nullable(), // masked PAN
  email: z.string().nullable(),
  statement_period: z.object({
    from: z.string().date(),
    to: z.string().date(),
  }),
  folios: z.array(
    z.object({
      folio_number: z.string(),
      scheme_name: z.string(),
      isin: z.string().nullable(),
      amc_name: z.string(),
      closing_units: z.string(),
      closing_nav: z.string().nullable(),
      transactions: z.array(CASTransactionSchema),
    })
  ),
  source: z.enum(["CAMS", "KFINTECH", "UNKNOWN"]),
});
export type CASParseResult = z.infer<typeof CASParseResultSchema>;

// ---------------------------------------------------------------------------
// XIRR / Performance API
// ---------------------------------------------------------------------------

export const XIRRInputSchema = z.object({
  cashflows: z.array(
    z.object({
      date: z.string().date(),
      amount: z.number(), // negative = outflow (buy), positive = inflow (sell/current value)
    })
  ),
});
export type XIRRInput = z.infer<typeof XIRRInputSchema>;

export const XIRRResultSchema = z.object({
  xirr: z.number().nullable(), // null if no solution found
  twr: z.number().nullable(), // time-weighted return
  absolute_return: z.number(),
  cagr: z.number().nullable(),
});
export type XIRRResult = z.infer<typeof XIRRResultSchema>;

// ---------------------------------------------------------------------------
// Screener API
// ---------------------------------------------------------------------------

export const ScreenerFilterSchema = z.object({
  metric: z.string(), // e.g. "pe_ratio", "roce", "promoter_holding"
  operator: z.enum(["gt", "lt", "gte", "lte", "eq", "between"]),
  value: z.number(),
  value2: z.number().nullable(), // for "between"
});
export type ScreenerFilter = z.infer<typeof ScreenerFilterSchema>;

export const ScreenerInputSchema = z.object({
  filters: z.array(ScreenerFilterSchema),
  sort_by: z.string().default("market_cap"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().int().min(1).max(500).default(100),
  offset: z.number().int().min(0).default(0),
});
export type ScreenerInput = z.infer<typeof ScreenerInputSchema>;

export const ScreenerResultItemSchema = z.object({
  isin: z.string(),
  symbol: z.string(),
  company_name: z.string(),
  sector: z.string().nullable(),
  market_cap: z.number().nullable(),
  pe_ratio: z.number().nullable(),
  pb_ratio: z.number().nullable(),
  roce: z.number().nullable(),
  roe: z.number().nullable(),
  debt_to_equity: z.number().nullable(),
  promoter_holding: z.number().nullable(),
  pledge_percent: z.number().nullable(),
  eps_growth_1yr: z.number().nullable(),
  revenue_growth_1yr: z.number().nullable(),
  indiaquant_score: z.number().nullable(), // 0-100 composite score
});
export type ScreenerResultItem = z.infer<typeof ScreenerResultItemSchema>;
