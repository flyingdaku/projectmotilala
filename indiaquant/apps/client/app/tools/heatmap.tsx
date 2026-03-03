import { useState, useMemo } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { calculateAnnualReturns } from "@indiaquant/finance-math";

/**
 * Returns Heatmap — Phase 0 signature viral tool.
 *
 * Shows a calendar heatmap of annual returns by start year × holding period.
 * Each cell = CAGR if you bought in [start_year] and held for [N] years.
 * Color: green = positive, red = negative, intensity = magnitude.
 *
 * No auth required. Shareable via URL params.
 */

const ASSETS = [
  { id: "NIFTY50", label: "Nifty 50" },
  { id: "NIFTY_MIDCAP150", label: "Midcap 150" },
  { id: "GOLD_MCX", label: "Gold" },
  { id: "GSEC_10YR", label: "G-Sec 10yr" },
  { id: "SENSEX", label: "Sensex" },
];

const HOLDING_PERIODS = [1, 3, 5, 7, 10, 15, 20];

function getHeatmapColor(cagr: number | null): string {
  if (cagr === null) return "#f3f4f6";
  if (cagr >= 0.20) return "#15803d";
  if (cagr >= 0.15) return "#16a34a";
  if (cagr >= 0.10) return "#22c55e";
  if (cagr >= 0.05) return "#86efac";
  if (cagr >= 0) return "#dcfce7";
  if (cagr >= -0.05) return "#fecaca";
  if (cagr >= -0.10) return "#f87171";
  if (cagr >= -0.15) return "#ef4444";
  return "#b91c1c";
}

function getTextColor(cagr: number | null): string {
  if (cagr === null) return "#9ca3af";
  if (Math.abs(cagr) >= 0.10) return "white";
  return "#374151";
}

export default function HeatmapScreen() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0].id);

  const { data: prices, isLoading } = useQuery({
    queryKey: ["asset-prices-heatmap", selectedAsset],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asset_prices")
        .select("date, close_price")
        .eq("asset_id", selectedAsset)
        .order("date");
      if (error) throw error;
      return (data ?? []).map((d) => ({
        date: d.date as string,
        value: parseFloat(d.close_price),
      }));
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24h — prices don't change intraday
  });

  // Build heatmap matrix: rows = start years, cols = holding periods
  const heatmapData = useMemo(() => {
    if (!prices || prices.length === 0) return null;

    const annualReturns = calculateAnnualReturns(prices);
    const years = Object.keys(annualReturns).map(Number).sort();
    const currentYear = new Date().getFullYear();

    // Build price by year-end lookup
    const priceByYear: Record<number, number> = {};
    for (const point of prices) {
      const year = parseInt(point.date.slice(0, 4));
      priceByYear[year] = point.value; // Last price of each year
    }

    const matrix: Array<{
      startYear: number;
      cells: Array<{ holdingPeriod: number; cagr: number | null }>;
    }> = [];

    for (const startYear of years) {
      const startPrice = priceByYear[startYear];
      if (!startPrice) continue;

      const cells = HOLDING_PERIODS.map((period) => {
        const endYear = startYear + period;
        if (endYear > currentYear) return { holdingPeriod: period, cagr: null };
        const endPrice = priceByYear[endYear];
        if (!endPrice) return { holdingPeriod: period, cagr: null };
        const cagr = Math.pow(endPrice / startPrice, 1 / period) - 1;
        return { holdingPeriod: period, cagr };
      });

      matrix.push({ startYear, cells });
    }

    return matrix;
  }, [prices]);

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Asset selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4"
        contentContainerClassName="gap-2"
      >
        {ASSETS.map((asset) => (
          <TouchableOpacity
            key={asset.id}
            className={`px-4 py-2 rounded-full border ${
              selectedAsset === asset.id
                ? "bg-brand-500 border-brand-500"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            }`}
            onPress={() => setSelectedAsset(asset.id)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedAsset === asset.id
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {asset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Legend */}
      <View className="px-4 mb-3">
        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Each cell = CAGR if bought in [year] and held for [N] years
        </Text>
        <View className="flex-row items-center gap-1">
          {[-0.15, -0.10, -0.05, 0, 0.05, 0.10, 0.15, 0.20].map((v) => (
            <View
              key={v}
              className="w-6 h-4 rounded-sm"
              style={{ backgroundColor: getHeatmapColor(v + 0.01) }}
            />
          ))}
          <Text className="text-xs text-gray-400 ml-1">← Loss · Gain →</Text>
        </View>
      </View>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
          <Text className="text-gray-500 mt-3">Loading price data...</Text>
        </View>
      ) : !heatmapData || heatmapData.length === 0 ? (
        <View className="items-center py-20 px-4">
          <Text className="text-gray-500 text-center">
            No price data available for this asset yet.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 pb-8">
          <View>
            {/* Column headers — holding periods */}
            <View className="flex-row mb-1">
              <View className="w-14" />
              {HOLDING_PERIODS.map((period) => (
                <View key={period} className="w-14 items-center">
                  <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {period}yr
                  </Text>
                </View>
              ))}
            </View>

            {/* Rows — start years */}
            {heatmapData.map(({ startYear, cells }) => (
              <View key={startYear} className="flex-row mb-0.5">
                {/* Row label */}
                <View className="w-14 justify-center">
                  <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {startYear}
                  </Text>
                </View>

                {/* Cells */}
                {cells.map(({ holdingPeriod, cagr }) => (
                  <View
                    key={holdingPeriod}
                    className="w-14 h-10 mx-0.5 rounded items-center justify-center"
                    style={{ backgroundColor: getHeatmapColor(cagr) }}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: getTextColor(cagr) }}
                    >
                      {cagr !== null ? `${(cagr * 100).toFixed(1)}%` : "—"}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
}
