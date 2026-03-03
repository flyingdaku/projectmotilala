import { View, Text } from "react-native";
import { formatINR, formatPercent } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

interface NetWorthCardProps {
  totalValue?: number;
  totalInvested?: number;
  isLoading?: boolean;
}

/**
 * Net Worth summary card.
 * Shows total current value, total invested, and unrealized P&L.
 */
export function NetWorthCard({ totalValue, totalInvested, isLoading }: NetWorthCardProps) {
  if (isLoading) {
    return (
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
        <View className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
        <View className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        <View className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </View>
    );
  }

  const value = totalValue ?? 0;
  const invested = totalInvested ?? 0;
  const pnl = value - invested;
  const pnlPercent = invested > 0 ? pnl / invested : 0;
  const isPositive = pnl >= 0;

  return (
    <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Portfolio Value</Text>

      <Text className="text-3xl font-bold text-gray-900 dark:text-white">
        {formatINR(new Decimal(value))}
      </Text>

      <View className="flex-row items-center gap-2 mt-2">
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Invested: {formatINR(new Decimal(invested))}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text
            className={`text-sm font-semibold ${
              isPositive ? "text-gain" : "text-loss"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatINR(new Decimal(pnl))}
          </Text>
          <Text
            className={`text-xs ${isPositive ? "text-gain" : "text-loss"}`}
          >
            ({isPositive ? "+" : ""}{formatPercent(new Decimal(pnlPercent))})
          </Text>
        </View>
      </View>
    </View>
  );
}
