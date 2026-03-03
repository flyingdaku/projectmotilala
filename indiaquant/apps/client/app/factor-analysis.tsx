import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import { formatPercent } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

const ANALYTICS_URL = process.env.EXPO_PUBLIC_ANALYTICS_ENGINE_URL ?? "http://localhost:8000";

const MODELS = [
  { id: "FF3", label: "Fama-French 3-Factor", description: "Market, Size (SMB), Value (HML)" },
  { id: "CARHART4", label: "Carhart 4-Factor", description: "FF3 + Momentum" },
  { id: "FF5", label: "Fama-French 5-Factor", description: "FF3 + Profitability (RMW) + Investment (CMA)" },
];

/**
 * Factor Analysis screen — Phase 5.
 * Runs Fama-French regression on the user's portfolio returns.
 * Calls the Python analytics engine.
 */
export default function FactorAnalysisScreen() {
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState("FF3");
  const [hasRun, setHasRun] = useState(false);

  // Fetch portfolio returns for regression
  const { data: portfolioReturns } = useQuery({
    queryKey: ["portfolio-returns-for-factor", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: portfolio } = await supabase
        .from("portfolios")
        .select("id")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .single();

      if (!portfolio) return [];

      // Get monthly portfolio values from transactions
      const { data: txns } = await supabase
        .from("transactions")
        .select("date, amount, type")
        .eq("portfolio_id", portfolio.id)
        .order("date");

      if (!txns || txns.length === 0) return [];

      // Compute monthly returns from transaction data
      // Group by month, compute net flow
      const monthlyFlows: Record<string, number> = {};
      for (const tx of txns) {
        const month = tx.date.slice(0, 7);
        const amount = parseFloat(tx.amount);
        const isOutflow = ["SELL", "SWITCH_OUT", "SWP"].includes(tx.type);
        monthlyFlows[month] = (monthlyFlows[month] ?? 0) + (isOutflow ? -amount : amount);
      }

      return Object.entries(monthlyFlows)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, flow]) => ({ date: `${date}-01`, return: flow }));
    },
    enabled: !!user,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["factor-analysis", selectedModel, portfolioReturns?.length],
    queryFn: async () => {
      if (!portfolioReturns || portfolioReturns.length < 30) {
        throw new Error("Need at least 30 months of portfolio data for factor regression.");
      }

      const response = await fetch(`${ANALYTICS_URL}/factor-analysis/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolio_returns: portfolioReturns,
          model: selectedModel,
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
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Factor Analysis</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Decompose your alpha using Fama-French factor models
        </Text>
      </View>

      {/* Model Selector */}
      <View className="px-4 mb-4">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Model</Text>
        <View className="gap-2">
          {MODELS.map((model) => (
            <TouchableOpacity
              key={model.id}
              className={`rounded-card px-4 py-3 border ${
                selectedModel === model.id
                  ? "bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }`}
              onPress={() => setSelectedModel(model.id)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedModel === model.id
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {model.label}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {model.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data availability note */}
      {portfolioReturns !== undefined && portfolioReturns.length < 30 && (
        <View className="mx-4 bg-amber-50 dark:bg-amber-950 rounded-card p-4 mb-4">
          <Text className="text-amber-700 dark:text-amber-300 text-sm">
            ⚠️ Need at least 30 months of portfolio data. Currently have {portfolioReturns.length} months.
            Import more CAS statements to enable factor analysis.
          </Text>
        </View>
      )}

      {/* Run Button */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className={`rounded-card py-3.5 items-center ${
            isLoading || (portfolioReturns?.length ?? 0) < 30
              ? "bg-gray-300 dark:bg-gray-700"
              : "bg-brand-500"
          }`}
          onPress={handleRun}
          disabled={isLoading || (portfolioReturns?.length ?? 0) < 30}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Run {selectedModel} Regression</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Error */}
      {error && (
        <View className="mx-4 bg-red-50 dark:bg-red-950 rounded-card p-4 mb-4">
          <Text className="text-loss text-sm">
            {error instanceof Error ? error.message : "Factor analysis failed."}
          </Text>
        </View>
      )}

      {/* Results */}
      {hasRun && data && (
        <View className="px-4 gap-4">
          {/* Alpha */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Annualized Alpha (Jensen's Alpha)
            </Text>
            <Text
              className={`text-3xl font-bold ${
                data.alpha >= 0 ? "text-gain" : "text-loss"
              }`}
            >
              {formatPercent(new Decimal(data.alpha))}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              p-value: {data.alpha_pvalue.toFixed(3)}
              {data.alpha_pvalue < 0.05 ? " ✓ Statistically significant" : " (not significant)"}
            </Text>
          </View>

          {/* Factor Loadings */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Factor Loadings (Beta)
            </Text>
            <FactorRow label="Market (β)" value={data.beta_market} />
            {data.beta_smb !== null && <FactorRow label="Size SMB" value={data.beta_smb} />}
            {data.beta_hml !== null && <FactorRow label="Value HML" value={data.beta_hml} />}
            {data.beta_mom !== null && <FactorRow label="Momentum" value={data.beta_mom} />}
          </View>

          {/* Risk Metrics */}
          <View className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Risk Metrics
            </Text>
            <DetailRow label="R² (Explained Variance)" value={`${(data.r_squared * 100).toFixed(1)}%`} />
            <DetailRow label="Tracking Error" value={formatPercent(new Decimal(data.tracking_error))} />
            <DetailRow label="Information Ratio" value={data.information_ratio.toFixed(2)} />
          </View>

          {/* Rolling Alpha */}
          {data.rolling_alpha && data.rolling_alpha.length > 0 && (
            <View className="bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden mb-8">
              <View className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rolling 12-Month Alpha
                </Text>
              </View>
              {data.rolling_alpha.slice(-12).map((point: any) => (
                <View
                  key={point.date}
                  className="flex-row items-center justify-between px-4 py-2.5 border-b border-gray-50 dark:border-gray-800"
                >
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {point.date.slice(0, 7)}
                  </Text>
                  <Text
                    className={`text-sm font-semibold ${
                      point.alpha >= 0 ? "text-gain" : "text-loss"
                    }`}
                  >
                    {(point.alpha * 100).toFixed(1)}%
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

function FactorRow({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
      <View className="flex-row items-center gap-2">
        <View className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <View
            className={`h-full rounded-full ${value >= 0 ? "bg-brand-400" : "bg-loss"}`}
            style={{ width: `${Math.min(100, Math.abs(value) * 50)}%` }}
          />
        </View>
        <Text className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
          {value.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-1.5">
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-900 dark:text-white">{value}</Text>
    </View>
  );
}
