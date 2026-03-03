import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";

const ANALYTICS_URL = process.env.EXPO_PUBLIC_ANALYTICS_ENGINE_URL ?? "http://localhost:8000";

/**
 * Stock Screener — Phase 5.
 * Multi-metric filtering with preset screens.
 * Calls the Python analytics engine for server-side filtering.
 */

interface FilterPreset {
  label: string;
  description: string;
  filters: Array<{ metric: string; operator: string; value: number; value2?: number }>;
}

const PRESETS: FilterPreset[] = [
  {
    label: "Quality Compounders",
    description: "High ROE, low debt, consistent earnings growth",
    filters: [
      { metric: "roe", operator: "gte", value: 15 },
      { metric: "debt_to_equity", operator: "lte", value: 0.5 },
      { metric: "eps_growth_1yr", operator: "gte", value: 10 },
    ],
  },
  {
    label: "Value Picks",
    description: "Low P/E, low P/B, decent ROCE",
    filters: [
      { metric: "pe_ratio", operator: "lte", value: 15 },
      { metric: "pb_ratio", operator: "lte", value: 2 },
      { metric: "roce", operator: "gte", value: 12 },
    ],
  },
  {
    label: "Momentum Stocks",
    description: "High revenue growth, strong EPS growth",
    filters: [
      { metric: "revenue_growth_1yr", operator: "gte", value: 20 },
      { metric: "eps_growth_1yr", operator: "gte", value: 20 },
    ],
  },
  {
    label: "Low Pledge",
    description: "Promoter pledge < 5%, high promoter holding",
    filters: [
      { metric: "pledge_percent", operator: "lte", value: 5 },
      { metric: "promoter_holding", operator: "gte", value: 50 },
    ],
  },
];

const SORT_OPTIONS = [
  { label: "Market Cap ↓", value: "market_cap", order: "desc" },
  { label: "P/E ↑", value: "pe_ratio", order: "asc" },
  { label: "ROE ↓", value: "roe", order: "desc" },
  { label: "Score ↓", value: "indiaquant_score", order: "desc" },
];

export default function ScreenerScreen() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState("desc");
  const [hasRun, setHasRun] = useState(false);

  const activeFilters =
    selectedPreset !== null ? PRESETS[selectedPreset].filters : [];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["screener", selectedPreset, sortBy, sortOrder],
    queryFn: async () => {
      const response = await fetch(`${ANALYTICS_URL}/screener/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters: activeFilters,
          sort_by: sortBy,
          sort_order: sortOrder,
          limit: 50,
          offset: 0,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    enabled: false,
    retry: 0,
  });

  const handleRun = () => {
    setHasRun(true);
    refetch();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Stock Screener</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Filter Indian stocks by 50+ fundamental metrics
        </Text>
      </View>

      {/* Preset Screens */}
      <View className="px-4 mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Preset Screens
        </Text>
        <View className="gap-2">
          {PRESETS.map((preset, idx) => (
            <TouchableOpacity
              key={idx}
              className={`rounded-card px-4 py-3 border ${
                selectedPreset === idx
                  ? "bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }`}
              onPress={() => setSelectedPreset(selectedPreset === idx ? null : idx)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedPreset === idx
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {preset.label}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {preset.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Active Filters
          </Text>
          <View className="gap-1.5">
            {activeFilters.map((f, idx) => (
              <View key={idx} className="flex-row items-center gap-2">
                <View className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {f.metric.replace(/_/g, " ")} {f.operator} {f.value}
                  {f.value2 !== undefined ? ` – ${f.value2}` : ""}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Sort */}
      <View className="px-4 mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sort By</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              className={`px-3 py-1.5 rounded-full border ${
                sortBy === opt.value
                  ? "bg-brand-500 border-brand-500"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }`}
              onPress={() => {
                setSortBy(opt.value);
                setSortOrder(opt.order);
              }}
            >
              <Text
                className={`text-xs font-medium ${
                  sortBy === opt.value ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Run Button */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className={`rounded-card py-3.5 items-center ${
            isLoading ? "bg-gray-300 dark:bg-gray-700" : "bg-brand-500"
          }`}
          onPress={handleRun}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">
              {selectedPreset !== null ? `Run "${PRESETS[selectedPreset].label}"` : "Run Screener"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Error */}
      {error && (
        <View className="mx-4 bg-red-50 dark:bg-red-950 rounded-card p-4 mb-4">
          <Text className="text-loss text-sm">
            {error instanceof Error ? error.message : "Screener failed. Is the analytics engine running?"}
          </Text>
        </View>
      )}

      {/* Results */}
      {hasRun && data && (
        <View className="px-4">
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {data.total_count} stocks found
          </Text>
          <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
            {/* Header */}
            <View className="flex-row px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <Text className="flex-1 text-xs font-semibold text-gray-500 uppercase">Company</Text>
              <Text className="w-20 text-right text-xs font-semibold text-gray-500 uppercase">Mkt Cap</Text>
              <Text className="w-14 text-right text-xs font-semibold text-gray-500 uppercase">P/E</Text>
              <Text className="w-14 text-right text-xs font-semibold text-gray-500 uppercase">ROE</Text>
              <Text className="w-14 text-right text-xs font-semibold text-gray-500 uppercase">Score</Text>
            </View>

            {data.results.map((stock: any) => (
              <View
                key={stock.isin}
                className="flex-row px-4 py-3 border-b border-gray-50 dark:border-gray-800 items-center"
              >
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900 dark:text-white" numberOfLines={1}>
                    {stock.company_name}
                  </Text>
                  <Text className="text-xs text-gray-400">{stock.symbol} · {stock.sector ?? "—"}</Text>
                </View>
                <Text className="w-20 text-right text-xs text-gray-600 dark:text-gray-400">
                  {stock.market_cap
                    ? `₹${(stock.market_cap / 1e9).toFixed(0)}B`
                    : "—"}
                </Text>
                <Text className="w-14 text-right text-sm text-gray-700 dark:text-gray-300">
                  {stock.pe_ratio?.toFixed(1) ?? "—"}
                </Text>
                <Text
                  className={`w-14 text-right text-sm font-medium ${
                    (stock.roe ?? 0) >= 15 ? "text-gain" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {stock.roe?.toFixed(1) ?? "—"}%
                </Text>
                <Text
                  className={`w-14 text-right text-sm font-bold ${
                    (stock.indiaquant_score ?? 0) >= 70 ? "text-gain" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {stock.indiaquant_score?.toFixed(0) ?? "—"}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
