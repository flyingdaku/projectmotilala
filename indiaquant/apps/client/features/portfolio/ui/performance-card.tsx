import { View, Text } from "react-native";
import { formatPercent } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

interface PerformanceCardProps {
  xirr?: number | null;
  absoluteReturn?: number;
  benchmarkXirr?: number | null;
  isLoading?: boolean;
}

/**
 * Performance metrics card.
 * Shows XIRR (money-weighted), CAGR, absolute return, and benchmark comparison.
 */
export function PerformanceCard({
  xirr,
  absoluteReturn,
  benchmarkXirr,
  isLoading,
}: PerformanceCardProps) {
  if (isLoading) {
    return (
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
        <View className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <View className="flex-row gap-4">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-1">
              <View className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <View className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </View>
          ))}
        </View>
      </View>
    );
  }

  const metrics = [
    {
      label: "XIRR",
      value: xirr != null ? formatPercent(new Decimal(xirr)) : "—",
      isPositive: (xirr ?? 0) >= 0,
      tooltip: "Money-weighted return",
    },
    {
      label: "Abs. Return",
      value: absoluteReturn != null ? formatPercent(new Decimal(absoluteReturn)) : "—",
      isPositive: (absoluteReturn ?? 0) >= 0,
      tooltip: "Total absolute gain/loss",
    },
    {
      label: "vs Nifty 50",
      value:
        xirr != null && benchmarkXirr != null
          ? formatPercent(new Decimal(xirr - benchmarkXirr))
          : "—",
      isPositive: xirr != null && benchmarkXirr != null ? xirr >= benchmarkXirr : true,
      tooltip: "Alpha vs Nifty 50",
    },
  ];

  return (
    <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
      <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Performance
      </Text>

      <View className="flex-row">
        {metrics.map((metric, idx) => (
          <View
            key={metric.label}
            className={`flex-1 ${idx < metrics.length - 1 ? "border-r border-gray-100 dark:border-gray-800 pr-4 mr-4" : ""}`}
          >
            <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {metric.label}
            </Text>
            <Text
              className={`text-lg font-bold ${
                metric.isPositive ? "text-gain" : "text-loss"
              }`}
            >
              {metric.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
