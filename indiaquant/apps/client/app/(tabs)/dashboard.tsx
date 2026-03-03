import { ScrollView, View, Text, RefreshControl } from "react-native";
import { usePortfolioDashboard } from "~/features/portfolio/model/use-portfolio-dashboard";
import { NetWorthCard } from "~/features/portfolio/ui/net-worth-card";
import { AllocationChart } from "~/features/portfolio/ui/allocation-chart";
import { HoldingsTable } from "~/features/portfolio/ui/holdings-table";
import { PerformanceCard } from "~/features/portfolio/ui/performance-card";

/**
 * Dashboard screen — Phase 1 core.
 * Shows: Net Worth, Performance (XIRR/CAGR), Allocation chart, Holdings table.
 * Feature-Sliced Design: this screen only composes feature UI components.
 */
export default function DashboardScreen() {
  const { data, isLoading, isRefetching, refetch } = usePortfolioDashboard();

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-gray-950"
      contentContainerClassName="pb-8"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#f97316" />
      }
    >
      {/* Header */}
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <View className="px-4 gap-4">
        {/* Net Worth + Performance */}
        <NetWorthCard
          totalValue={data?.totalValue}
          totalInvested={data?.totalInvested}
          isLoading={isLoading}
        />

        <PerformanceCard
          xirr={data?.xirr}
          absoluteReturn={data?.absoluteReturn}
          benchmarkXirr={data?.benchmarkXirr}
          isLoading={isLoading}
        />

        {/* Allocation Chart */}
        <AllocationChart
          allocations={data?.allocations}
          isLoading={isLoading}
        />

        {/* Holdings Table */}
        <HoldingsTable
          holdings={data?.holdings}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
