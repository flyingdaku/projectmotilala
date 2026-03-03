import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import { calculateXIRR, calculateAbsoluteReturn } from "@indiaquant/finance-math";
import type { Holding } from "@indiaquant/types";

/**
 * Portfolio dashboard data hook.
 * Fetches holdings, computes XIRR, CAGR, allocation breakdown.
 * Repository pattern: all DB access is here, not in UI components.
 */
export function usePortfolioDashboard() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["portfolio-dashboard", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      // Fetch all holdings with their transactions
      const { data: holdings, error: holdingsError } = await supabase
        .from("holdings")
        .select(`
          *,
          transactions (*)
        `)
        .eq("portfolio_id", (
          await supabase
            .from("portfolios")
            .select("id")
            .eq("user_id", user.id)
            .eq("is_default", true)
            .single()
        ).data?.id);

      if (holdingsError) throw holdingsError;

      // Fetch current NAVs from mfapi.in via Supabase function or direct
      const isins = (holdings as Holding[])
        .map((h) => h.isin)
        .filter(Boolean) as string[];

      const { data: navData } = await supabase
        .from("mutual_fund_nav")
        .select("isin, nav, nav_date")
        .in("isin", isins);

      const navByIsin: Record<string, string> = {};
      for (const nav of navData ?? []) {
        if (nav.isin) navByIsin[nav.isin] = nav.nav;
      }

      // Compute portfolio metrics
      let totalValue = 0;
      let totalInvested = 0;

      const holdingsWithValue = (holdings as Holding[]).map((holding) => {
        const currentNav = holding.isin ? parseFloat(navByIsin[holding.isin] ?? "0") : 0;
        const units = parseFloat(holding.units);
        const avgNav = parseFloat(holding.avg_nav);
        const currentValue = units * currentNav;
        const investedValue = units * avgNav;

        totalValue += currentValue;
        totalInvested += investedValue;

        return {
          ...holding,
          currentNav,
          currentValue,
          investedValue,
          unrealizedPnL: currentValue - investedValue,
          unrealizedPnLPercent: investedValue > 0 ? (currentValue - investedValue) / investedValue : 0,
        };
      });

      // Build XIRR cashflows from all transactions
      const allTransactions = (holdings as any[]).flatMap((h) => h.transactions ?? []);
      const cashflows = allTransactions
        .map((tx: any) => ({
          date: tx.date,
          amount: ["BUY", "SIP", "SWITCH_IN"].includes(tx.type)
            ? -parseFloat(tx.amount)
            : parseFloat(tx.amount),
        }))
        .filter((cf) => cf.amount !== 0);

      // Add current portfolio value as final positive cashflow
      if (cashflows.length > 0 && totalValue > 0) {
        cashflows.push({
          date: new Date().toISOString().split("T")[0],
          amount: totalValue,
        });
      }

      const xirr = cashflows.length >= 2 ? calculateXIRR(cashflows) : null;
      const absoluteReturn = calculateAbsoluteReturn(
        totalInvested.toFixed(2),
        totalValue.toFixed(2)
      );

      // Allocation breakdown by asset class
      const allocationMap: Record<string, number> = {};
      for (const h of holdingsWithValue) {
        const key = h.asset_class;
        allocationMap[key] = (allocationMap[key] ?? 0) + h.currentValue;
      }
      const allocations = Object.entries(allocationMap).map(([label, value]) => ({
        label,
        value,
        percent: totalValue > 0 ? (value / totalValue) * 100 : 0,
      }));

      return {
        holdings: holdingsWithValue,
        totalValue,
        totalInvested,
        xirr,
        cagr: null, // Computed server-side for accuracy
        absoluteReturn,
        benchmarkXirr: null, // TODO: fetch Nifty 50 XIRR for same period
        allocations,
      };
    },
    enabled: !!user,
  });
}
