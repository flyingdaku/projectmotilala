import { View, Text } from "react-native";

interface Allocation {
  label: string;
  value: number;
  percent: number;
}

interface AllocationChartProps {
  allocations?: Allocation[];
  isLoading?: boolean;
}

// Chart colors for asset classes
const ASSET_COLORS: Record<string, string> = {
  EQUITY_MF: "#f97316",
  DEBT_MF: "#3b82f6",
  ELSS: "#8b5cf6",
  INDEX_FUND: "#f59e0b",
  ETF: "#10b981",
  DIRECT_EQUITY: "#ef4444",
  GOLD: "#fbbf24",
  GSEC: "#6366f1",
  FD: "#14b8a6",
  REAL_ESTATE: "#84cc16",
  CUSTOM: "#9ca3af",
};

/**
 * Asset allocation donut chart + legend.
 * Uses Victory Native (Skia) on mobile, D3 on web.
 * Platform-specific rendering is handled via Platform.OS.
 */
export function AllocationChart({ allocations, isLoading }: AllocationChartProps) {
  if (isLoading) {
    return (
      <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
        <View className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <View className="h-40 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
      </View>
    );
  }

  if (!allocations || allocations.length === 0) {
    return null;
  }

  return (
    <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
      <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Allocation
      </Text>

      {/* Legend */}
      <View className="gap-2">
        {allocations
          .sort((a, b) => b.percent - a.percent)
          .map((item) => (
            <View key={item.label} className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2 flex-1">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ASSET_COLORS[item.label] ?? "#9ca3af" }}
                />
                <Text className="text-sm text-gray-700 dark:text-gray-300 flex-1" numberOfLines={1}>
                  {item.label.replace(/_/g, " ")}
                </Text>
              </View>
              <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.percent.toFixed(1)}%
              </Text>
            </View>
          ))}
      </View>

      {/* TODO Phase 1: Add Victory Native Skia donut chart here */}
      {/* VictoryPie with innerRadius for donut, colorScale from ASSET_COLORS */}
    </View>
  );
}
