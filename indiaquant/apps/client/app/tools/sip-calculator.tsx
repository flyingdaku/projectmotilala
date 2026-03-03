import { useState, useMemo } from "react";
import { ScrollView, View, Text, TextInput, Switch } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { calculateSIP, calculateLumpsum, formatINR, formatPercent } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

/**
 * SIP vs Lumpsum Calculator — Phase 0 viral tool.
 *
 * URL state: all inputs are serialized to URL params for sharing.
 * e.g. /tools/sip-calculator?amount=10000&years=10&return=12&stepup=10
 *
 * No auth required. Stateless — no DB writes.
 */
export default function SIPCalculatorScreen() {
  const params = useLocalSearchParams<{
    amount?: string;
    years?: string;
    return?: string;
    stepup?: string;
    inflation?: string;
  }>();

  // Initialize state from URL params (enables shareable links)
  const [monthlyAmount, setMonthlyAmount] = useState(
    params.amount ? parseInt(params.amount) : 10000
  );
  const [years, setYears] = useState(params.years ? parseInt(params.years) : 10);
  const [expectedReturn, setExpectedReturn] = useState(
    params.return ? parseFloat(params.return) : 12
  );
  const [stepUpPercent, setStepUpPercent] = useState(
    params.stepup ? parseFloat(params.stepup) : 0
  );
  const [showInflationAdjusted, setShowInflationAdjusted] = useState(false);

  // Compute results using finance-math package
  const sipResult = useMemo(
    () =>
      calculateSIP({
        monthly_amount: monthlyAmount,
        annual_step_up_percent: stepUpPercent,
        expected_return: expectedReturn / 100,
        years,
        inflation_rate: 0.06,
      }),
    [monthlyAmount, years, expectedReturn, stepUpPercent]
  );

  const lumpsumResult = useMemo(
    () =>
      calculateLumpsum(
        monthlyAmount * 12, // Equivalent annual lumpsum
        expectedReturn / 100,
        years,
        0.06
      ),
    [monthlyAmount, years, expectedReturn]
  );

  const displayValue = showInflationAdjusted
    ? sipResult.inflation_adjusted_value
    : sipResult.final_value;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-6">
      {/* Inputs */}
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Calculator Inputs
        </Text>

        <InputRow
          label="Monthly SIP Amount"
          value={monthlyAmount}
          onChange={setMonthlyAmount}
          prefix="₹"
          min={500}
          max={1000000}
        />
        <InputRow
          label="Investment Period"
          value={years}
          onChange={setYears}
          suffix="years"
          min={1}
          max={50}
        />
        <InputRow
          label="Expected Annual Return"
          value={expectedReturn}
          onChange={setExpectedReturn}
          suffix="%"
          min={1}
          max={50}
          decimal
        />
        <InputRow
          label="Annual Step-Up"
          value={stepUpPercent}
          onChange={setStepUpPercent}
          suffix="%"
          min={0}
          max={50}
          decimal
        />

        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Show inflation-adjusted value
          </Text>
          <Switch
            value={showInflationAdjusted}
            onValueChange={setShowInflationAdjusted}
            trackColor={{ true: "#f97316" }}
          />
        </View>
      </View>

      {/* SIP Result */}
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          SIP Result {stepUpPercent > 0 ? `(${stepUpPercent}% annual step-up)` : ""}
        </Text>

        <View className="items-center mb-4">
          <Text className="text-3xl font-bold text-brand-500">
            {formatINR(new Decimal(displayValue))}
          </Text>
          {showInflationAdjusted && (
            <Text className="text-xs text-gray-500 mt-1">Inflation-adjusted (6% CPI)</Text>
          )}
        </View>

        <View className="flex-row justify-between">
          <MetricBox
            label="Total Invested"
            value={formatINR(new Decimal(sipResult.total_invested))}
          />
          <MetricBox
            label="Total Gains"
            value={formatINR(new Decimal(sipResult.total_gains))}
            positive
          />
          <MetricBox
            label="Gain %"
            value={formatPercent(
              new Decimal(sipResult.total_gains / sipResult.total_invested)
            )}
            positive
          />
        </View>
      </View>

      {/* SIP vs Lumpsum Comparison */}
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          SIP vs Lumpsum Comparison
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Lumpsum: ₹{(monthlyAmount * 12).toLocaleString("en-IN")} invested once per year
        </Text>

        <View className="gap-3">
          <ComparisonRow
            label="SIP Final Value"
            value={formatINR(new Decimal(sipResult.final_value))}
            highlight
          />
          <ComparisonRow
            label="Lumpsum Final Value"
            value={formatINR(new Decimal(lumpsumResult.finalValue))}
          />
          <ComparisonRow
            label="SIP Advantage"
            value={formatINR(
              new Decimal(sipResult.final_value - lumpsumResult.finalValue)
            )}
            positive={sipResult.final_value > lumpsumResult.finalValue}
          />
        </View>
      </View>

      {/* Year-by-year table (last 5 years) */}
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm mb-8">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Year-by-Year Growth
        </Text>
        {sipResult.year_by_year.slice(-Math.min(years, 10)).map((row) => (
          <View
            key={row.year}
            className="flex-row justify-between py-2 border-b border-gray-50 dark:border-gray-800"
          >
            <Text className="text-sm text-gray-600 dark:text-gray-400">Year {row.year}</Text>
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {formatINR(new Decimal(row.value))}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InputRow({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  decimal,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  decimal?: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-sm text-gray-600 dark:text-gray-400 flex-1">{label}</Text>
      <View className="flex-row items-center gap-1">
        {prefix && <Text className="text-sm text-gray-500">{prefix}</Text>}
        <TextInput
          className="text-sm font-semibold text-gray-900 dark:text-white text-right min-w-[60px] border-b border-gray-200 dark:border-gray-700 pb-0.5"
          value={String(value)}
          onChangeText={(t) => {
            const n = decimal ? parseFloat(t) : parseInt(t);
            if (!isNaN(n) && n >= min && n <= max) onChange(n);
          }}
          keyboardType="numeric"
        />
        {suffix && <Text className="text-sm text-gray-500">{suffix}</Text>}
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
  positive?: boolean;
}) {
  return (
    <View className="items-center">
      <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</Text>
      <Text
        className={`text-sm font-semibold ${
          positive ? "text-gain" : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

function ComparisonRow({
  label,
  value,
  highlight,
  positive,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  positive?: boolean;
}) {
  return (
    <View
      className={`flex-row justify-between items-center py-2 px-3 rounded-lg ${
        highlight ? "bg-brand-50 dark:bg-brand-950" : ""
      }`}
    >
      <Text
        className={`text-sm ${
          highlight
            ? "text-brand-700 dark:text-brand-300 font-medium"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {label}
      </Text>
      <Text
        className={`text-sm font-semibold ${
          positive === true
            ? "text-gain"
            : positive === false
            ? "text-loss"
            : highlight
            ? "text-brand-700 dark:text-brand-300"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
