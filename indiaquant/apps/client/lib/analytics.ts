/**
 * PostHog analytics facade.
 *
 * All product analytics calls go through this module.
 * Never import PostHog directly in feature code — use these typed helpers.
 *
 * Feature flag gating (pricing tiers) is also handled here.
 */

import PostHog from "posthog-react-native";

const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST = "https://app.posthog.com";

let _client: PostHog | null = null;

function getClient(): PostHog {
  if (!_client) {
    _client = new PostHog(POSTHOG_KEY, { host: POSTHOG_HOST });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (!POSTHOG_KEY) return;
  getClient().identify(userId, properties);
}

export function resetAnalytics() {
  if (!POSTHOG_KEY) return;
  getClient().reset();
}

// ---------------------------------------------------------------------------
// Event tracking
// ---------------------------------------------------------------------------

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>) {
  if (!POSTHOG_KEY) return;
  getClient().capture(event, properties);
}

// ---------------------------------------------------------------------------
// Feature flags (pricing tier gating)
// ---------------------------------------------------------------------------

/**
 * Check if a feature is enabled for the current user.
 * Feature flags are set in PostHog based on subscription tier.
 */
export async function isFeatureEnabled(flag: FeatureFlag): Promise<boolean> {
  if (!POSTHOG_KEY) return true; // Dev mode: all features enabled
  return getClient().isFeatureEnabled(flag) ?? false;
}

// ---------------------------------------------------------------------------
// Typed event names
// ---------------------------------------------------------------------------

export type AnalyticsEvent =
  // Onboarding
  | "onboarding_started"
  | "onboarding_completed"
  | "cas_import_started"
  | "cas_import_completed"
  | "cas_import_failed"
  // Portfolio
  | "portfolio_viewed"
  | "holding_detail_viewed"
  // Tax
  | "tax_report_viewed"
  | "tax_harvesting_opportunity_viewed"
  | "tax_report_exported"
  // Backtest
  | "backtest_run"
  | "backtest_preset_selected"
  // Tools (viral)
  | "sip_calculator_used"
  | "heatmap_viewed"
  | "rolling_returns_viewed"
  | "asset_comparison_viewed"
  | "tool_shared"
  // Retirement
  | "retirement_planner_used"
  | "monte_carlo_run"
  | "goal_created"
  | "goal_completed"
  // Analytics
  | "screener_run"
  | "factor_analysis_run"
  // Subscription
  | "upgrade_cta_clicked"
  | "subscription_started"
  | "subscription_cancelled"
  // Auth
  | "sign_in_started"
  | "sign_in_completed"
  | "sign_out";

// ---------------------------------------------------------------------------
// Feature flags for pricing tier gating
// ---------------------------------------------------------------------------

export type FeatureFlag =
  | "tax_engine"           // Pro+
  | "backtest"             // Pro+
  | "factor_analysis"      // Expert
  | "monte_carlo"          // Pro+
  | "screener"             // Pro+
  | "broker_sync"          // Pro+
  | "pdf_export"           // Pro+
  | "unlimited_portfolios" // Pro+
  | "ai_insights";         // Expert
