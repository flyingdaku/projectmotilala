import { useState, useMemo } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { calculateRollingReturns } from "@indiaquant/finance-math";

/**
 * Rolling Returns tool — Phase 0 viral.
 *
 * Shows best, worst, median, and percentile distribution of rolling N-year
 * CAGR outcomes for any Indian asset class.
 * Answers: "If I had invested for any 5-year period, what would I have earned?"
 */

const ASSETS = [
  { id: "NIFTY50", label: "Nifty 50" },
  { id: "NIFTY_MIDCAP150", label: "Midcap 150" },
  { id: "GOLD_MCX", label: "Gold" },
  { id: "GSEC_10YR", label: "G-Sec 10yr" },
];

const WINDOWS = [1, 3, 5, 7, 10, 15];

interface RollingStats {
  window: number;
  best: number;
  worst: number;
  median: number;
  p25: number;
  p75: number;
  positivePercent: number;
  count: number;
}

function computeStats(values: number[]): Omit<RollingStats, "window"> {
  if (values.length === 0) {
    return { best: 0, worst: 0, median: 0, p25: 0, p75: 0, positivePercent: 0, count: 0 };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const median = sorted[Math.floor(n / 2)];
  const p25 = sorted[Math.floor(n * 0.25)];
  const p75 = sorted[Math.floor(n * 0.75)];
  const positivePercent = (values.filter((v) => v >= 0).length / n) * 100;
  return {
    best: sorted[n - 1],
    worst: sorted[0],
    median,
    p25,
    p75,
    positivePercent,
    count: n,
  };
}

export default function RollingReturnsScreen() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0].id);
  const [selectedWindow, setSelectedWindow] = useState(5);

  const { data: prices, isLoading } = useQuery({
    queryKey: ["asset-prices-rolling", selectedAsset],
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
    staleTime: 24 * 60 * 60 * 1000,
  });

  const allStats = useMemo((): RollingStats[] => {
    if (!prices || prices.length === 0) return [];
    return WINDOWS.map((window) => {
      const rolling = calculateRollingReturns(prices, window);
      const values = rolling.map((r) => r.cagr);
      return { window, ...computeStats(values) };
    });
  }, [prices]);

  const selectedStats = allStats.find((s) => s.window === selectedWindow);

  const rollingTimeSeries = useMemo(() => {
    if (!prices || prices.length === 0) return [];
    return calculateRollingReturns(prices, selectedWindow);
  }, [prices, selectedWindow]);

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
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
                selectedAsset === asset.id ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {asset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Window selector */}
      <View className="flex-row px-4 gap-2 mb-4">
        {WINDOWS.map((w) => (
          <TouchableOpacity
            key={w}
            className={`flex-1 py-2 rounded-lg items-center ${
              selectedWindow === w
                ? "bg-brand-500"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            }`}
            onPress={() => setSelectedWindow(w)}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedWindow === w ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {w}yr
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : (
        <View className="px-4 gap-4">
          {/* Key stats for selected window */}
          {selectedStats && (
            <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                {selectedWindow}-Year Rolling Returns ({selectedStats.count} periods)
              </Text>

              <View className="flex-row flex-wrap gap-3">
                <StatBox
                  label="Best"
                  value={`${(selectedStats.best * 100).toFixed(1)}%`}
                  positive
                />
                <StatBox
                  label="Worst"
                  value={`${(selectedStats.worst * 100).toFixed(1)}%`}
                  positive={selectedStats.worst >= 0}
                />
                <StatBox
                  label="Median"
                  value={`${(selectedStats.median * 100).toFixed(1)}%`}
                  positive={selectedStats.median >= 0}
                />
                <StatBox
                  label="% Positive"
                  value={`${selectedStats.positivePercent.toFixed(0)}%`}
                  positive={selectedStats.positivePercent >= 50}
                />
              </View>

              {/* Percentile bar */}
              <View className="mt-4">
                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Return distribution (P25–P75 range)
                </Text>
                <View className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-brand-400 rounded-full"
                    style={{
                      marginLeft: `${Math.max(0, (selectedStats.p25 + 0.3) / 0.6 * 100)}%`,
                      width: `${Math.max(5, ((selectedStats.p75 - selectedStats.p25) / 0.6) * 100)}%`,
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-xs text-gray-400">
                    P25: {(selectedStats.p25 * 100).toFixed(1)}%
                  </Text>
                  <Text className="text-xs text-gray-400">
                    P75: {(selectedStats.p75 * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* All windows comparison table */}
          <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
            <View className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                All Holding Periods
              </Text>
            </View>
            <View className="flex-row px-4 py-2 border-b border-gray-50 dark:border-gray-800">
              <Text className="w-12 text-xs font-semibold text-gray-400 uppercase">Period</Text>
              <Text className="flex-1 text-xs font-semibold text-gray-400 uppercase text-right">Best</Text>
              <Text className="flex-1 text-xs font-semibold text-gray-400 uppercase text-right">Worst</Text>
              <Text className="flex-1 text-xs font-semibold text-gray-400 uppercase text-right">Median</Text>
              <Text className="flex-1 text-xs font-semibold text-gray-400 uppercase text-right">+ve%</Text>
            </View>
            {allStats.map((s) => (
              <TouchableOpacity
                key={s.window}
                className={`flex-row px-4 py-3 border-b border-gray-50 dark:border-gray-800 ${
                  selectedWindow === s.window ? "bg-brand-50 dark:bg-brand-950" : ""
                }`}
                onPress={() => setSelectedWindow(s.window)}
              >
                <Text className="w-12 text-sm font-semibold text-gray-900 dark:text-white">
                  {s.window}yr
                </Text>
                <Text className="flex-1 text-sm text-right text-gain font-medium">
                  {(s.best * 100).toFixed(1)}%
                </Text>
                <Text
                  className={`flex-1 text-sm text-right font-medium ${
                    s.worst >= 0 ? "text-gain" : "text-loss"
                  }`}
                >
                  {(s.worst * 100).toFixed(1)}%
                </Text>
                <Text
                  className={`flex-1 text-sm text-right font-medium ${
                    s.median >= 0 ? "text-gain" : "text-loss"
                  }`}
                >
                  {(s.median * 100).toFixed(1)}%
                </Text>
                <Text
                  className={`flex-1 text-sm text-right font-medium ${
                    s.positivePercent >= 80 ? "text-gain" : s.positivePercent >= 50 ? "text-gray-700 dark:text-gray-300" : "text-loss"
                  }`}
                >
                  {s.positivePercent.toFixed(0)}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rolling returns time series (last 20 data points) */}
          {rollingTimeSeries.length > 0 && (
            <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-8">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Recent {selectedWindow}-Year Rolling Returns
              </Text>
              {rollingTimeSeries.slice(-15).map((point) => (
                <View
                  key={point.date}
                  className="flex-row items-center justify-between py-1.5 border-b border-gray-50 dark:border-gray-800"
                >
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Ending {point.date.slice(0, 7)}
                  </Text>
                  <Text
                    className={`text-sm font-semibold ${
                      point.cagr >= 0 ? "text-gain" : "text-loss"
                    }`}
                  >
                    {(point.cagr * 100).toFixed(2)}% CAGR
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function StatBox({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <View className="flex-1 min-w-[80px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 items-center">
      <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</Text>
      <Text className={`text-base font-bold ${positive ? "text-gain" : "text-loss"}`}>
        {value}
      </Text>
    </View>
  );
}
