import { z } from "zod";
import { AssetClass, TransactionType, TransactionSource, TaxLotMethod, SubscriptionTier } from "./enums";

/**
 * Database schemas — one Zod schema per Supabase table.
 * These are the single source of truth for data shapes across the monorepo.
 * Inferred TypeScript types are exported alongside each schema.
 */

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  subscription_tier: z.nativeEnum(SubscriptionTier).default(SubscriptionTier.FREE),
  tax_lot_method: z.nativeEnum(TaxLotMethod).default(TaxLotMethod.FIFO),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

// ---------------------------------------------------------------------------
// Portfolios
// ---------------------------------------------------------------------------

export const PortfolioSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().nullable(),
  currency: z.string().default("INR"),
  is_default: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Portfolio = z.infer<typeof PortfolioSchema>;

export const CreatePortfolioSchema = PortfolioSchema.pick({
  name: true,
  description: true,
  currency: true,
  is_default: true,
});
export type CreatePortfolioInput = z.infer<typeof CreatePortfolioSchema>;

// ---------------------------------------------------------------------------
// Holdings
// ---------------------------------------------------------------------------

export const HoldingSchema = z.object({
  id: z.string().uuid(),
  portfolio_id: z.string().uuid(),
  isin: z.string().length(12).nullable(), // ISIN is 12 chars
  folio_number: z.string().nullable(),
  scheme_name: z.string(),
  amc_name: z.string().nullable(),
  asset_class: z.nativeEnum(AssetClass),
  units: z.string(), // Stored as string to preserve decimal precision
  avg_nav: z.string(), // Stored as string — use decimal.js for math
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Holding = z.infer<typeof HoldingSchema>;

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  holding_id: z.string().uuid(),
  portfolio_id: z.string().uuid(),
  date: z.string().date(), // YYYY-MM-DD
  type: z.nativeEnum(TransactionType),
  source: z.nativeEnum(TransactionSource),
  units: z.string(), // decimal string
  nav: z.string(), // decimal string — price per unit
  amount: z.string(), // decimal string — total amount
  folio_number: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const CreateTransactionSchema = TransactionSchema.pick({
  holding_id: true,
  portfolio_id: true,
  date: true,
  type: true,
  source: true,
  units: true,
  nav: true,
  amount: true,
  folio_number: true,
  notes: true,
});
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;

// ---------------------------------------------------------------------------
// Tax Lots
// ---------------------------------------------------------------------------

export const TaxLotSchema = z.object({
  id: z.string().uuid(),
  holding_id: z.string().uuid(),
  transaction_id: z.string().uuid(), // The buy transaction that created this lot
  purchase_date: z.string().date(),
  units: z.string(), // remaining units in this lot (decimal string)
  purchase_nav: z.string(), // decimal string
  purchase_amount: z.string(), // decimal string
  grandfathered_nav: z.string().nullable(), // Jan 31 2018 NAV for LTCG grandfathering
  is_elss: z.boolean().default(false),
  elss_unlock_date: z.string().date().nullable(), // purchase_date + 3 years
  created_at: z.string().datetime(),
});
export type TaxLot = z.infer<typeof TaxLotSchema>;

// ---------------------------------------------------------------------------
// Asset Prices (Market Data — no RLS, read-only for users)
// ---------------------------------------------------------------------------

export const AssetPriceSchema = z.object({
  id: z.string().uuid(),
  asset_id: z.string(), // e.g. "NIFTY50", "GOLD_MCX", "GSEC_10YR"
  date: z.string().date(),
  close_price: z.string(), // decimal string
  open_price: z.string().nullable(),
  high_price: z.string().nullable(),
  low_price: z.string().nullable(),
  volume: z.number().nullable(),
  source: z.string(), // "NSE", "MCX", "RBI_DBIE", "MFAPI"
});
export type AssetPrice = z.infer<typeof AssetPriceSchema>;

// ---------------------------------------------------------------------------
// Mutual Fund NAV (updated daily from mfapi.in)
// ---------------------------------------------------------------------------

export const MutualFundNavSchema = z.object({
  id: z.string().uuid(),
  scheme_code: z.string(), // AMFI scheme code
  isin: z.string().length(12).nullable(),
  scheme_name: z.string(),
  amc_name: z.string(),
  asset_class: z.nativeEnum(AssetClass),
  nav: z.string(), // decimal string
  nav_date: z.string().date(),
});
export type MutualFundNav = z.infer<typeof MutualFundNavSchema>;

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export const GoalSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  portfolio_id: z.string().uuid().nullable(),
  name: z.string().min(1).max(100),
  target_amount: z.string(), // decimal string
  target_date: z.string().date(),
  current_value: z.string(), // decimal string — computed
  notes: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Goal = z.infer<typeof GoalSchema>;

// ---------------------------------------------------------------------------
// Watchlist
// ---------------------------------------------------------------------------

export const WatchlistItemSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  isin: z.string().length(12).nullable(),
  scheme_code: z.string().nullable(),
  name: z.string(),
  asset_class: z.nativeEnum(AssetClass),
  added_at: z.string().datetime(),
});
export type WatchlistItem = z.infer<typeof WatchlistItemSchema>;

// ---------------------------------------------------------------------------
// Audit Log
// ---------------------------------------------------------------------------

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  action: z.string(), // e.g. "CREATE_TRANSACTION", "DELETE_HOLDING"
  table_name: z.string(),
  record_id: z.string(),
  old_data: z.record(z.unknown()).nullable(),
  new_data: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;
