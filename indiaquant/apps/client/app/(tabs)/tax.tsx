import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import {
  computeTaxSummary,
  matchSaleToLots,
  findHarvestingOpportunities,
  formatINR,
} from "@indiaquant/finance-math";
import { TaxLotMethod } from "@indiaquant/types";
import type { TaxLot, Transaction } from "@indiaquant/types";
import Decimal from "decimal.js";

const FY_OPTIONS = ["2024-25", "2023-24", "2022-23", "2021-22"];

export default function TaxScreen() {
  const { user } = useAuth();
  const [selectedFY, setSelectedFY] = useState("2024-25");
  const [lotMethod, setLotMethod] = useState<TaxLotMethod>(TaxLotMethod.FIFO);

  const { data: taxData, isLoading } = useQuery({
    queryKey: ["tax-summary", user?.id, selectedFY, lotMethod],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const { data: lotsData } = await supabase
        .from("tax_lots")
        .select(`*, holdings!inner(portfolio_id, asset_class, portfolios!inner(user_id))`)
        .eq("holdings.portfolios.user_id", user.id);

      const [startYear] = selectedFY.split("-");
      const fyStart = `${startYear}-04-01`;
      const fyEnd = `${parseInt(startYear) + 1}-03-31`;

      const { data: sellsData } = await supabase
        .from("transactions")
        .select(`*, holdings!inner(portfolio_id, asset_class, portfolios!inner(user_id))`)
        .eq("holdings.portfolios.user_id", user.id)
        .in("type", ["SELL", "SWITCH_OUT", "SWP"])
        .gte("date", fyStart)
        .lte("date", fyEnd)
        .order("date");

      const { data: holdingsData } = await supabase
        .from("holdings")
        .select("id, isin, units, avg_nav, scheme_name, asset_class, portfolio_id");

      const isins = (holdingsData ?? []).map((h) => h.isin).filter(Boolean) as string[];
      const { data: navData } = await supabase
        .from("mutual_fund_nav")
        .select("isin, nav")
        .in("isin", isins);

      const navByIsin: Record<string, string> = {};
      for (const n of navData ?? []) {
        if (n.isin) navByIsin[n.isin] = n.nav;
      }

      // Prepare data for finance-math
      const lots: TaxLot[] = (lotsData ?? []).map((l: any) => ({
        id: l.id,
        holding_id: l.holding_id,
        transaction_id: l.transaction_id,
        purchase_date: l.purchase_date,
        units: l.units,
        purchase_nav: l.purchase_nav,
        purchase_amount: l.purchase_amount,
        grandfathered_nav: l.grandfathered_nav,
        is_elss: l.is_elss,
        elss_unlock_date: l.elss_unlock_date,
        created_at: l.created_at,
      }));

      const sells: Transaction[] = (sellsData ?? []).map((s: any) => ({
        id: s.id,
        holding_id: s.holding_id,
        portfolio_id: s.holdings.portfolio_id,
        date: s.date,
        type: s.type as any,
        source: s.source as any,
        units: s.units,
        nav: s.nav,
        amount: s.amount,
        folio_number: s.folio_number,
        created_at: s.created_at,
        notes: s.notes ?? null,
      }));

      const assetClassByHoldingId: Record<string, string> = {};
      const currentNavByHoldingId: Record<string, string> = {};

      for (const h of holdingsData ?? []) {
        assetClassByHoldingId[h.id] = h.asset_class;
        currentNavByHoldingId[h.id] = h.isin ? (navByIsin[h.isin] ?? h.avg_nav) : h.avg_nav;
      }

      // Match lots for all sell transactions
      const allMatches = [];
      for (const sell of sells) {
        const holdingLots = lots.filter(l => l.holding_id === sell.holding_id);
        const assetClass = assetClassByHoldingId[sell.holding_id] ?? "EQUITY_MF";
        const { matches } = matchSaleToLots(sell, holdingLots, lotMethod, assetClass);
        allMatches.push(...matches);
      }

      const taxSummary = computeTaxSummary(selectedFY, allMatches);

      // Harvesting ops
      const harvestingOps = findHarvestingOpportunities(
        lots,
        currentNavByHoldingId,
        assetClassByHoldingId,
        taxSummary.totalLTCG
      );

      // Transform opportunities to include scheme names
      const enrichedOps = harvestingOps.map(op => {
        const holding = holdingsData?.find(h => h.id === op.lot.holding_id);
        return {
          ...op,
          scheme_name: holding?.scheme_name ?? "Unknown Scheme",
          tax_saving: new Decimal(op.unrealizedGain).abs().mul(0.125).toFixed(2),
        };
      });

      return { taxSummary, harvestingOps: enrichedOps, fyStart, fyEnd };
    },
    enabled: !!user,
  });

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Tax Report</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-4"
        contentContainerClassName="gap-2"
      >
        {FY_OPTIONS.map((fy) => (
          <TouchableOpacity
            key={fy}
            className={`px-4 py-2 rounded-full border ${
              selectedFY === fy
                ? "bg-brand-500 border-brand-500"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            }`}
            onPress={() => setSelectedFY(fy)}
          >
            <Text className={`text-sm font-medium ${selectedFY === fy ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
              FY {fy}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row px-4 gap-2 mb-4">
        {([TaxLotMethod.FIFO, TaxLotMethod.LIFO, TaxLotMethod.MIN_GAIN] as TaxLotMethod[]).map((method) => (
          <TouchableOpacity
            key={method}
            className={`flex-1 py-2 rounded-lg items-center border ${
              lotMethod === method
                ? "bg-brand-500 border-brand-500"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            }`}
            onPress={() => setLotMethod(method)}
          >
            <Text className={`text-xs font-semibold ${lotMethod === method ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : !taxData ? (
        <View className="px-4 items-center py-20">
          <Text className="text-gray-500 text-center">Import your CAS statement to see your tax report.</Text>
        </View>
      ) : (
        <View className="px-4 gap-4">
          <View className="flex-row gap-3">
            <TaxCard label="LTCG" gains={taxData.taxSummary.totalLTCG} tax={taxData.taxSummary.estimatedLTCGTax} rate="12.5%" color="text-gain" />
            <TaxCard label="STCG" gains={taxData.taxSummary.totalSTCG} tax={taxData.taxSummary.estimatedSTCGTax} rate="20%" color="text-loss" />
          </View>

          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Tax Liability (FY {selectedFY})</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatINR(new Decimal(taxData.taxSummary.estimatedLTCGTax).plus(new Decimal(taxData.taxSummary.estimatedSTCGTax)))}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">LTCG exemption ₹1.25L applied · {lotMethod} lot matching</Text>
          </View>

          {taxData.harvestingOps.length > 0 && (
            <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
              <View className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">🌾 Tax Harvesting Opportunities</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sell these to book losses and offset gains</Text>
              </View>
              {taxData.harvestingOps.slice(0, 5).map((op, idx) => (
                <View key={idx} className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
                  <Text className="text-sm font-medium text-gray-900 dark:text-white" numberOfLines={1}>
                    {op.scheme_name}
                  </Text>
                  <View className="flex-row justify-between mt-1">
                    <Text className="text-xs text-gray-500">Unrealized loss: {formatINR(new Decimal(op.unrealizedGain))}</Text>
                    <Text className="text-xs text-gain font-medium">Tax saving: {formatINR(new Decimal(op.tax_saving))}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Realized Gains Breakdown</Text>
            <DetailRow label="LTCG (before exemption)" value={formatINR(new Decimal(taxData.taxSummary.totalLTCG))} />
            <DetailRow label="LTCG exemption (₹1.25L)" value={`-${formatINR(new Decimal(taxData.taxSummary.ltcgExemptApplied))}`} />
            <DetailRow label="Taxable LTCG" value={formatINR(new Decimal(taxData.taxSummary.ltcgTaxable))} />
            <DetailRow label="STCG" value={formatINR(new Decimal(taxData.taxSummary.totalSTCG))} />
            <View className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
            <DetailRow label="Total Tax" value={formatINR(new Decimal(taxData.taxSummary.estimatedLTCGTax).plus(new Decimal(taxData.taxSummary.estimatedSTCGTax)))} bold />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function TaxCard({ label, gains, tax, rate, color }: { label: string; gains: string; tax: string; rate: string; color: string }) {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm">
      <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{label} @ {rate}</Text>
      <Text className={`text-lg font-bold ${color}`}>{formatINR(new Decimal(gains))}</Text>
      <Text className="text-xs text-gray-500 mt-1">Tax: {formatINR(new Decimal(tax))}</Text>
    </View>
  );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View className="flex-row justify-between py-1.5">
      <Text className={`text-sm ${bold ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>{label}</Text>
      <Text className={`text-sm ${bold ? "font-bold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{value}</Text>
    </View>
  );
}
