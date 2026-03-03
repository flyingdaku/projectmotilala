import { useState, useMemo } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";

/**
 * Asset Class Comparison tool — Phase 0 viral.
 *
 * Compare Nifty 50, Gold, G-Sec, FD, Real Estate over any custom date range.
 * Shows CAGR, total return, max drawdown side-by-side.
 * No auth required.
 */

const ALL_ASSETS = [
  { id: "NIFTY50", label: "Nifty 50", color: "#f97316" },
  { id: "NIFTY_MIDCAP150", label: "Midcap 150", color: "#8b5cf6" },
  { id: "GOLD_MCX", label: "Gold", color: "#f59e0b" },
  { id: "GSEC_10YR", label: "G-Sec 10yr", color: "#3b82f6" },
  { id: "SENSEX", label: "Sensex", color: "#ef4444" },
];

const PRESETS = [
  { label: "5Y", years: 5 },
  { label: "10Y", years: 10 },
  { label: "15Y", years: 15 },
  { label: "20Y", years: 20 },
  { label: "Max", years: 30 },
];

interface AssetStats {
  id: string;
  label: string;
  color: string;
  cagr: number | null;
  totalReturn: number | null;
  maxDrawdown: number | null;
  startPrice: number | null;
  endPrice: number | null;
  dataPoints: number;
}

export default function AssetComparisonScreen() {
  const [selectedAssets, setSelectedAssets] = useState(
    new Set(["NIFTY50", "GOLD_MCX", "GSEC_10YR"])
  );
  const [yearsBack, setYearsBack] = useState(10);

  const startDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsBack);
    return d.toISOString().split("T")[0];
  }, [yearsBack]);

  const { data: allPrices, isLoading } = useQuery({
    queryKey: ["asset-comparison-prices", startDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asset_prices")
        .select("asset_id, date, close_price")
        .in("asset_id", ALL_ASSETS.map((a) => a.id))
        .gte("date", startDate)
        .order("date");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  const stats = useMemo((): AssetStats[] => {
    if (!allPrices) return [];

    return ALL_ASSETS.map((asset) => {
      const prices = allPrices
        .filter((p) => p.asset_id === asset.id)
        .map((p) => ({ date: p.date as string, value: parseFloat(p.close_price) }));

      if (prices.length < 2) {
        return { ...asset, cagr: null, totalReturn: null, maxDrawdown: null, startPrice: null, endPrice: null, dataPoints: 0 };
      }

      const startPrice = prices[0].value;
      const endPrice = prices[prices.length - 1].value;
      const years =
        (new Date(prices[prices.length - 1].date).getTime() - new Date(prices[0].date).getTime()) /
        (365.25 * 24 * 60 * 60 * 1000);

      const cagr = years > 0 ? Math.pow(endPrice / startPrice, 1 / years) - 1 : null;
      const totalReturn = startPrice > 0 ? (endPrice - startPrice) / startPrice : null;

      // Max drawdown
      let peak = startPrice;
      let maxDd = 0;
      for (const p of prices) {
        if (p.value > peak) peak = p.value;
        const dd = peak > 0 ? (p.value - peak) / peak : 0;
        if (dd < maxDd) maxDd = dd;
      }

      return {
        ...asset,
        cagr,
        totalReturn,
        maxDrawdown: maxDd,
        startPrice,
        endPrice,
        dataPoints: prices.length,
      };
    });
  }, [allPrices]);

  const visibleStats = stats.filter((s) => selectedAssets.has(s.id));

  const toggleAsset = (id: string) => {
    setSelectedAssets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // Keep at least 1 selected
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      {/* Period selector */}
      <View className="flex-row px-4 py-4 gap-2">
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.label}
            className={`flex-1 py-2 rounded-lg items-center ${
              yearsBack === preset.years
                ? "bg-brand-500"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            }`}
            onPress={() => setYearsBack(preset.years)}
          >
            <Text
              className={`text-sm font-semibold ${
                yearsBack === preset.years ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {preset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Asset toggles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-4"
        contentContainerClassName="gap-2"
      >
        {ALL_ASSETS.map((asset) => (
          <TouchableOpacity
            key={asset.id}
            className={`px-4 py-2 rounded-full border-2 flex-row items-center gap-1.5 ${
              selectedAssets.has(asset.id) ? "opacity-100" : "opacity-40"
            }`}
            style={{
              borderColor: asset.color,
              backgroundColor: selectedAssets.has(asset.id) ? asset.color + "20" : "transparent",
            }}
            onPress={() => toggleAsset(asset.id)}
          >
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {asset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : (
        <View className="px-4 gap-4">
          {/* Comparison table */}
          <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
            <View className="flex-row px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <Text className="flex-1 text-xs font-semibold text-gray-500 uppercase">Asset</Text>
              <Text className="w-20 text-right text-xs font-semibold text-gray-500 uppercase">CAGR</Text>
              <Text className="w-24 text-right text-xs font-semibold text-gray-500 uppercase">Total Return</Text>
              <Text className="w-20 text-right text-xs font-semibold text-gray-500 uppercase">Max DD</Text>
            </View>

            {visibleStats
              .sort((a, b) => (b.cagr ?? -999) - (a.cagr ?? -999))
              .map((s) => (
                <View
                  key={s.id}
                  className="flex-row px-4 py-3 border-b border-gray-50 dark:border-gray-800 items-center"
                >
                  <View className="flex-1 flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <Text className="text-sm font-medium text-gray-900 dark:text-white">
                      {s.label}
                    </Text>
                  </View>
                  <Text
                    className={`w-20 text-right text-sm font-bold ${
                      (s.cagr ?? 0) >= 0 ? "text-gain" : "text-loss"
                    }`}
                  >
                    {s.cagr !== null ? `${(s.cagr * 100).toFixed(1)}%` : "—"}
                  </Text>
                  <Text
                    className={`w-24 text-right text-sm font-semibold ${
                      (s.totalReturn ?? 0) >= 0 ? "text-gain" : "text-loss"
                    }`}
                  >
                    {s.totalReturn !== null ? `${(s.totalReturn * 100).toFixed(0)}%` : "—"}
                  </Text>
                  <Text className="w-20 text-right text-sm text-loss font-medium">
                    {s.maxDrawdown !== null ? `${(s.maxDrawdown * 100).toFixed(1)}%` : "—"}
                  </Text>
                </View>
              ))}
          </View>

          {/* ₹1 Lakh invested comparison */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              ₹1 Lakh invested {yearsBack} years ago would be worth...
            </Text>
            {visibleStats
              .sort((a, b) => (b.totalReturn ?? -999) - (a.totalReturn ?? -999))
              .map((s) => {
                const finalValue = s.totalReturn !== null ? 100000 * (1 + s.totalReturn) : null;
                return (
                  <View
                    key={s.id}
                    className="flex-row items-center justify-between mb-3"
                  >
                    <View className="flex-row items-center gap-2 flex-1">
                      <View className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <Text className="text-sm text-gray-700 dark:text-gray-300">{s.label}</Text>
                    </View>
                    <Text
                      className={`text-sm font-bold ${
                        (finalValue ?? 0) >= 100000 ? "text-gain" : "text-loss"
                      }`}
                    >
                      {finalValue !== null
                        ? `₹${(finalValue / 100000).toFixed(2)}L`
                        : "—"}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
