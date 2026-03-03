import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";

/**
 * Import History screen — shows all past CAS imports with timestamps.
 */
export default function ImportHistoryScreen() {
  const { user } = useAuth();

  const { data: history, isLoading } = useQuery({
    queryKey: ["import-history", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("audit_log")
        .select("*")
        .eq("user_id", user.id)
        .eq("action", "CAS_IMPORT")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-6 pb-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Import History</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          All past CAS statement imports
        </Text>
      </View>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : !history || history.length === 0 ? (
        <View className="items-center py-20 px-8">
          <Text className="text-4xl mb-4">📥</Text>
          <Text className="text-base font-semibold text-gray-900 dark:text-white text-center mb-2">
            No imports yet
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Import a CAS statement from the Portfolio tab to see history here.
          </Text>
        </View>
      ) : (
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
          {history.map((entry: any, idx: number) => (
            <View
              key={entry.id}
              className={`px-4 py-3.5 ${
                idx < history.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""
              }`}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  CAS Import
                </Text>
                <Text className="text-xs text-gray-400">
                  {new Date(entry.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>
              {entry.metadata && (
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {entry.metadata.folios_imported ?? 0} folios ·{" "}
                  {entry.metadata.transactions_imported ?? 0} transactions
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
