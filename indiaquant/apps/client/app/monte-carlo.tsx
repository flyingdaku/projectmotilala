import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { formatINR } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

const ANALYTICS_URL = process.env.EXPO_PUBLIC_ANALYTICS_ENGINE_URL ?? "http://localhost:8000";

/**
 * Standalone Monte Carlo screen — Phase 4.
 * Accumulation and decumulation simulations.
 */
export default function MonteCarloScreen() {
  const [mode, setMode] = useState<"accumulation" | "decumulation">("accumulation");
  const [initialCorpus, setInitialCorpus] = useState("1000000");
  const [monthlyContrib, setMonthlyContrib] = useState("25000");
  const [years, setYears] = useState("20");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [stdDev, setStdDev] = useState("15");
  const [inflationRate, setInflationRate] = useState("6");
  const [annualWithdrawal, setAnnualWithdrawal] = useState("600000");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["monte-carlo-standalone", mode, initialCorpus, monthlyContrib, years, expectedReturn, stdDev, inflationRate, annualWithdrawal],
    queryFn: async () => {
      const response = await fetch(`${ANALYTICS_URL}/monte-carlo/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initial_corpus: parseFloat(initialCorpus),
          monthly_contribution: mode === "accumulation" ? parseFloat(monthlyContrib) : 0,
          annual_withdrawal: mode === "decumulation" ? parseFloat(annualWithdrawal) : 0,
          years: parseInt(years),
          expected_return: parseFloat(expectedReturn) / 100,
          std_dev: parseFloat(stdDev) / 100,
          inflation_rate: parseFloat(inflationRate) / 100,
          num_simulations: 5000,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    enabled: false,
    retry: 0,
  });

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-6 pb-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">Monte Carlo Simulation</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">5,000 randomized scenarios</Text>
      </View>

      {/* Mode toggle */}
      <View className="flex-row mx-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-card p-1">
        {(["accumulation", "decumulation"] as const).map((m) => (
          <TouchableOpacity
            key={m}
            className={`flex-1 py-2 rounded-lg items-center ${mode === m ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
            onPress={() => setMode(m)}
          >
            <Text className={`text-sm font-semibold capitalize ${mode === m ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inputs */}
      <View className="mx-4 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm mb-4 gap-3">
        <InputRow label="Initial Corpus" value={initialCorpus} onChange={setInitialCorpus} prefix="₹" />
        {mode === "accumulation" && (
          <InputRow label="Monthly Contribution" value={monthlyContrib} onChange={setMonthlyContrib} prefix="₹" />
        )}
        {mode === "decumulation" && (
          <InputRow label="Annual Withdrawal" value={annualWithdrawal} onChange={setAnnualWithdrawal} prefix="₹" />
        )}
        <InputRow label="Years" value={years} onChange={setYears} suffix="yrs" />
        <InputRow label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="%" />
        <InputRow label="Volatility (Std Dev)" value={stdDev} onChange={setStdDev} suffix="%" />
        <InputRow label="Inflation Rate" value={inflationRate} onChange={setInflationRate} suffix="%" />
      </View>

      {/* Run */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className={`rounded-card py-3.5 items-center ${isLoading ? "bg-gray-300 dark:bg-gray-700" : "bg-brand-500"}`}
          onPress={() => refetch()}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="white" /> : (
            <Text className="text-white font-semibold">Run 5,000 Simulations</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View className="mx-4 bg-red-50 dark:bg-red-950 rounded-card p-4 mb-4">
          <Text className="text-loss text-sm">
            {error instanceof Error ? error.message : "Simulation failed. Is the analytics engine running?"}
          </Text>
        </View>
      )}

      {data && (
        <View className="px-4 gap-4">
          {/* Success probability */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm items-center">
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {mode === "decumulation" ? "Probability of not running out of money" : "Probability of reaching target"}
            </Text>
            <Text className={`text-5xl font-bold ${
              data.probability_of_success >= 0.9 ? "text-gain"
              : data.probability_of_success >= 0.7 ? "text-amber-500"
              : "text-loss"
            }`}>
              {(data.probability_of_success * 100).toFixed(1)}%
            </Text>
          </View>

          {/* Percentile outcomes */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Final Corpus at Year {years}
            </Text>
            {[
              { label: "P10 (Bad scenario)", key: "p10", color: "text-loss" },
              { label: "P25", key: "p25", color: "text-amber-500" },
              { label: "P50 (Median)", key: "p50", color: "text-gray-900 dark:text-white" },
              { label: "P75", key: "p75", color: "text-brand-500" },
              { label: "P90 (Good scenario)", key: "p90", color: "text-gain" },
            ].map(({ label, key, color }) => {
              const series = data.percentiles?.[key];
              const finalVal = Array.isArray(series) ? series[series.length - 1] : null;
              return (
                <View key={key} className="flex-row justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
                  <Text className={`text-sm font-semibold ${color}`}>
                    {finalVal != null ? formatINR(new Decimal(finalVal)) : "—"}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm mb-8">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Median final value: <Text className="font-semibold text-gray-900 dark:text-white">
                {formatINR(new Decimal(data.median_final_value ?? 0))}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function InputRow({ label, value, onChange, prefix, suffix }: {
  label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm text-gray-600 dark:text-gray-400 flex-1">{label}</Text>
      <View className="flex-row items-center gap-1">
        {prefix && <Text className="text-sm text-gray-500">{prefix}</Text>}
        <TextInput
          className="text-sm font-semibold text-gray-900 dark:text-white text-right min-w-[80px] border-b border-gray-200 dark:border-gray-700"
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
        />
        {suffix && <Text className="text-sm text-gray-500">{suffix}</Text>}
      </View>
    </View>
  );
}
