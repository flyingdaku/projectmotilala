import { ScrollView, View, Text, RefreshControl } from "react-native";
import { usePortfolioDashboard } from "~/features/portfolio/model/use-portfolio-dashboard";
import { CASImportScreen } from "~/features/cas/ui/cas-import-screen";
import { HoldingsTable } from "~/features/portfolio/ui/holdings-table";

/**
 * Portfolio tab — shows holdings list + CAS import CTA.
 * If no holdings exist, shows the CAS import prompt prominently.
 */
export default function PortfolioScreen() {
  const { data, isLoading, isRefetching, refetch } = usePortfolioDashboard();
  const hasHoldings = (data?.holdings?.length ?? 0) > 0;

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-gray-950"
      contentContainerClassName="pb-8"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#f97316" />
      }
    >
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</Text>
      </View>

      <View className="px-4 gap-4">
        {/* CAS Import — always visible, prominent when no holdings */}
        {!hasHoldings && !isLoading && (
          <View className="mb-2">
            <CASImportScreen />
          </View>
        )}

        {/* Holdings */}
        <HoldingsTable holdings={data?.holdings} isLoading={isLoading} />

        {/* Import more CTA when holdings exist */}
        {hasHoldings && (
          <View className="mt-4">
            <CASImportScreen />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
