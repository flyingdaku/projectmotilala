import { useState, useMemo } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { calculateSWRSimple, calculateFIYearsSimple, formatINR, formatPercent } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

const ANALYTICS_URL = process.env.EXPO_PUBLIC_ANALYTICS_ENGINE_URL ?? "http://localhost:8000";

/**
 * Retirement Planner — Phase 4.
 * Combines SWR (Safe Withdrawal Rate) calculation with Monte Carlo simulation.
 * Shows FI number, years to FI, probability of success.
 */
export default function RetirementScreen() {
  const [currentCorpus, setCurrentCorpus] = useState("5000000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("100000");
  const [monthlyInvestment, setMonthlyInvestment] = useState("50000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [inflationRate, setInflationRate] = useState("6");
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("45");

  // Client-side SWR calculation
  const swrResult = useMemo(() => {
    const annualExpenses = parseFloat(monthlyExpenses) * 12;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const corpus = parseFloat(currentCorpus);

    if (isNaN(annualExpenses) || isNaN(returnRate) || isNaN(corpus)) return null;

    return calculateSWRSimple({
      annual_expenses: annualExpenses,
      expected_return: returnRate,
      inflation_rate: inflation,
      current_corpus: corpus,
      monthly_investment: parseFloat(monthlyInvestment) || 0,
    });
  }, [currentCorpus, monthlyExpenses, monthlyInvestment, expectedReturn, inflationRate]);

  const fiYears = useMemo(() => {
    const annualExpenses = parseFloat(monthlyExpenses) * 12;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const corpus = parseFloat(currentCorpus);
    const monthly = parseFloat(monthlyInvestment) || 0;

    if (isNaN(annualExpenses) || isNaN(returnRate) || isNaN(corpus)) return null;

    return calculateFIYearsSimple({
      current_corpus: corpus,
      monthly_investment: monthly,
      annual_expenses: annualExpenses,
      expected_return: returnRate,
      inflation_rate: inflation,
    });
  }, [currentCorpus, monthlyExpenses, monthlyInvestment, expectedReturn, inflationRate]);

  // Monte Carlo from analytics engine
  const { data: mcData, isLoading: mcLoading, refetch: runMC } = useQuery({
    queryKey: ["monte-carlo-retirement"],
    queryFn: async () => {
      const yearsInRetirement = 85 - parseInt(retirementAge);
      const response = await fetch(`${ANALYTICS_URL}/monte-carlo/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initial_corpus: swrResult?.fi_number ?? parseFloat(currentCorpus),
          annual_withdrawal: parseFloat(monthlyExpenses) * 12,
          years: yearsInRetirement,
          expected_return: parseFloat(expectedReturn) / 100,
          std_dev: 0.15,
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
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Retirement Planner</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your path to Financial Independence
        </Text>
      </View>

      {/* Inputs */}
      <View className="mx-4 bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Numbers</Text>
        <View className="gap-3">
          <InputRow label="Current Corpus" value={currentCorpus} onChange={setCurrentCorpus} prefix="₹" />
          <InputRow label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix="₹" />
          <InputRow label="Monthly Investment" value={monthlyInvestment} onChange={setMonthlyInvestment} prefix="₹" />
          <InputRow label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="%" />
          <InputRow label="Inflation Rate" value={inflationRate} onChange={setInflationRate} suffix="%" />
          <InputRow label="Current Age" value={currentAge} onChange={setCurrentAge} suffix="yrs" />
          <InputRow label="Target Retirement Age" value={retirementAge} onChange={setRetirementAge} suffix="yrs" />
        </View>
      </View>

      {/* FI Summary */}
      {swrResult && (
        <View className="mx-4 gap-4 mb-4">
          {/* FI Number */}
          <View className="bg-brand-500 rounded-card p-5">
            <Text className="text-orange-100 text-sm mb-1">Your FI Number (25× rule)</Text>
            <Text className="text-white text-3xl font-bold">
              {formatINR(new Decimal(swrResult.fi_number))}
            </Text>
            <Text className="text-orange-200 text-xs mt-1">
              Annual expenses × 25 at 4% SWR
            </Text>
          </View>

          {/* Key Metrics */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm">
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">Years to FI</Text>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                {fiYears?.years_to_fi != null ? `${fiYears.years_to_fi.toFixed(1)}` : "—"}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {fiYears?.fi_age != null ? `Age ${fiYears.fi_age.toFixed(0)}` : ""}
              </Text>
            </View>
            <View className="flex-1 bg-white dark:bg-gray-900 rounded-card p-4 shadow-sm">
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">Safe Withdrawal</Text>
              <Text className="text-2xl font-bold text-gain">
                {formatPercent(new Decimal(swrResult.safe_withdrawal_rate))}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">Annual rate</Text>
            </View>
          </View>

          {/* Progress to FI */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Progress to FI
              </Text>
              <Text className="text-sm font-bold text-brand-500">
                {((parseFloat(currentCorpus) / swrResult.fi_number) * 100).toFixed(1)}%
              </Text>
            </View>
            <View className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <View
                className="h-full bg-brand-500 rounded-full"
                style={{
                  width: `${Math.min(100, (parseFloat(currentCorpus) / swrResult.fi_number) * 100)}%`,
                }}
              />
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-xs text-gray-400">
                {formatINR(new Decimal(currentCorpus))} saved
              </Text>
              <Text className="text-xs text-gray-400">
                {formatINR(new Decimal(swrResult.fi_number))} target
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Monte Carlo */}
      <View className="mx-4 mb-8">
        <TouchableOpacity
          className={`rounded-card py-3.5 items-center mb-4 ${
            mcLoading ? "bg-gray-300 dark:bg-gray-700" : "bg-gray-800 dark:bg-gray-200"
          }`}
          onPress={() => runMC()}
          disabled={mcLoading}
        >
          {mcLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white dark:text-gray-900 font-semibold">
              Run Monte Carlo (5,000 simulations)
            </Text>
          )}
        </TouchableOpacity>

        {mcData && (
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Monte Carlo Results
            </Text>
            <View className="items-center mb-4">
              <Text
                className={`text-4xl font-bold ${
                  mcData.probability_of_success >= 0.9
                    ? "text-gain"
                    : mcData.probability_of_success >= 0.7
                    ? "text-amber-500"
                    : "text-loss"
                }`}
              >
                {(mcData.probability_of_success * 100).toFixed(1)}%
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Probability of not running out of money
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-xs text-gray-400 mb-1">P10 (Bad)</Text>
                <Text className="text-sm font-semibold text-loss">
                  {formatINR(new Decimal(mcData.percentiles.p10[mcData.percentiles.p10.length - 1] ?? 0))}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-400 mb-1">Median</Text>
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatINR(new Decimal(mcData.median_final_value))}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-400 mb-1">P90 (Good)</Text>
                <Text className="text-sm font-semibold text-gain">
                  {formatINR(new Decimal(mcData.percentiles.p90[mcData.percentiles.p90.length - 1] ?? 0))}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function InputRow({
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
