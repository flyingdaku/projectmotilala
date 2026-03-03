import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { formatPercent, formatINR } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

const ANALYTICS_URL = process.env.EXPO_PUBLIC_ANALYTICS_ENGINE_URL ?? "http://localhost:8000";

const PRESET_ALLOCATIONS = [
  {
    label: "Nifty 50 100%",
    allocations: [{ asset_id: "NIFTY50", weight: 100 }],
  },
  {
    label: "60/40 Equity/Debt",
    allocations: [
      { asset_id: "NIFTY50", weight: 60 },
      { asset_id: "GSEC_10YR", weight: 40 },
    ],
  },
  {
    label: "Permanent Portfolio",
    allocations: [
      { asset_id: "NIFTY50", weight: 25 },
      { asset_id: "GSEC_10YR", weight: 25 },
      { asset_id: "GOLD_MCX", weight: 25 },
      { asset_id: "NIFTY_MIDCAP150", weight: 25 },
    ],
  },
];

/**
 * Backtest screen — Phase 3.
 * Calls the Python analytics engine for heavy computation.
 * Shows CAGR, Sharpe, Max Drawdown, rolling returns.
 */
export default function BacktestScreen() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [startYear, setStartYear] = useState("2005");
  const [initialAmount, setInitialAmount] = useState("100000");
  const [monthlyContrib, setMonthlyContrib] = useState("0");
  const [rebalance, setRebalance] = useState("ANNUAL");

  const preset = PRESET_ALLOCATIONS[selectedPreset];

  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ["backtest", selectedPreset, startYear, initialAmount, monthlyContrib, rebalance],
    queryFn: async () => {
      const response = await fetch(`${ANALYTICS_URL}/backtest/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allocations: preset.allocations,
          benchmark_id: "NIFTY50",
          start_date: `${startYear}-01-01`,
          end_date: new Date().toISOString().split("T")[0],
          initial_amount: parseFloat(initialAmount) || 100000,
          monthly_contribution: parseFloat(monthlyContrib) || 0,
          rebalance_frequency: rebalance,
          strategy: "ASSET_ALLOCATION",
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    enabled: false, // Only run on demand
    retry: 0,
  });

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Backtest</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Test any asset allocation against India's historical data
        </Text>
      </View>

      {/* Preset Allocations */}
      <View className="px-4 mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Allocation
        </Text>
        <View className="gap-2">
          {PRESET_ALLOCATIONS.map((p, idx) => (
            <TouchableOpacity
              key={idx}
              className={`rounded-card px-4 py-3 border ${
                selectedPreset === idx
                  ? "bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }`}
              onPress={() => setSelectedPreset(idx)}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedPreset === idx
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {p.label}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {p.allocations.map((a) => `${a.asset_id} ${a.weight}%`).join(" · ")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Parameters */}
      <View className="mx-4 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Parameters
        </Text>
        <View className="gap-3">
          <ParamRow label="Start Year" value={startYear} onChange={setStartYear} suffix="" />
          <ParamRow label="Initial Amount" value={initialAmount} onChange={setInitialAmount} prefix="₹" />
          <ParamRow label="Monthly SIP" value={monthlyContrib} onChange={setMonthlyContrib} prefix="₹" />
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-gray-600 dark:text-gray-400">Rebalance</Text>
            <View className="flex-row gap-1">
              {["MONTHLY", "ANNUAL", "NEVER"].map((r) => (
                <TouchableOpacity
                  key={r}
                  className={`px-2 py-1 rounded ${
                    rebalance === r ? "bg-brand-500" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                  onPress={() => setRebalance(r)}
                >
                  <Text
                    className={`text-xs font-medium ${
                      rebalance === r ? "text-white" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Run Button */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className={`rounded-card py-3.5 items-center ${
            isFetching ? "bg-gray-300 dark:bg-gray-700" : "bg-brand-500"
          }`}
          onPress={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Run Backtest</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Error */}
      {error && (
        <View className="mx-4 bg-red-50 dark:bg-red-950 rounded-card p-4 mb-4">
          <Text className="text-loss text-sm">
            {error instanceof Error ? error.message : "Backtest failed. Is the analytics engine running?"}
          </Text>
        </View>
      )}

      {/* Results */}
      {data && (
        <View className="px-4 gap-4">
          {/* Key Metrics */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Results — {preset.label}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <MetricBox label="CAGR" value={formatPercent(new Decimal(data.metrics.cagr))} positive={data.metrics.cagr >= 0} />
              <MetricBox label="Sharpe" value={data.metrics.sharpe_ratio.toFixed(2)} positive={data.metrics.sharpe_ratio >= 1} />
              <MetricBox label="Max DD" value={formatPercent(new Decimal(data.metrics.max_drawdown))} positive={false} />
              <MetricBox label="Sortino" value={data.metrics.sortino_ratio.toFixed(2)} positive={data.metrics.sortino_ratio >= 1} />
              <MetricBox label="Final Value" value={formatINR(new Decimal(data.metrics.final_value))} positive />
              <MetricBox label="Total Return" value={formatPercent(new Decimal(data.metrics.total_return))} positive={data.metrics.total_return >= 0} />
            </View>
          </View>

          {/* Annual Returns */}
          {data.annual_returns && Object.keys(data.annual_returns).length > 0 && (
            <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
              <View className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Annual Returns
                </Text>
              </View>
              {Object.entries(data.annual_returns)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .slice(0, 15)
                .map(([year, ret]) => (
                  <View
                    key={year}
                    className="flex-row items-center px-4 py-2.5 border-b border-gray-50 dark:border-gray-800"
                  >
                    <Text className="text-sm text-gray-600 dark:text-gray-400 w-16">{year}</Text>
                    <View className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mx-3">
                      <View
                        className={`h-full rounded-full ${(ret as number) >= 0 ? "bg-gain" : "bg-loss"}`}
                        style={{
                          width: `${Math.min(100, Math.abs((ret as number) * 100 * 2))}%`,
                          alignSelf: (ret as number) >= 0 ? "flex-start" : "flex-end",
                        }}
                      />
                    </View>
                    <Text
                      className={`text-sm font-semibold w-16 text-right ${
                        (ret as number) >= 0 ? "text-gain" : "text-loss"
                      }`}
                    >
                      {((ret as number) * 100).toFixed(1)}%
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

function ParamRow({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
      <View className="flex-row items-center gap-1">
        {prefix && <Text className="text-sm text-gray-500">{prefix}</Text>}
        <TextInput
          className="text-sm font-semibold text-gray-900 dark:text-white text-right min-w-[80px] border-b border-gray-200 dark:border-gray-700"
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
        />
        {suffix !== undefined && suffix !== "" && (
          <Text className="text-sm text-gray-500">{suffix}</Text>
        )}
      </View>
    </View>
  );
}

function MetricBox({
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
      <Text className={`text-sm font-bold ${positive ? "text-gain" : "text-loss"}`}>
        {value}
      </Text>
    </View>
  );
}
