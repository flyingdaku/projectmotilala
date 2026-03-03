import { ScrollView, View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import { TaxLotMethod, SubscriptionTier } from "@indiaquant/types";

/**
 * Settings screen — profile, tax preferences, subscription, security.
 */
export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: { tax_lot_method?: TaxLotMethod }) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-profile"] }),
  });

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all portfolio data. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const tier = profile?.subscription_tier ?? SubscriptionTier.FREE;
  const taxMethod = profile?.tax_lot_method ?? TaxLotMethod.FIFO;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Settings</Text>
      </View>

      {/* Profile */}
      <View className="mb-4">
        <Text className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
          Account
        </Text>
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
          <View className="px-4 py-4 flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900 items-center justify-center">
              <Text className="text-brand-600 dark:text-brand-300 text-lg font-bold">
                {user?.email?.[0]?.toUpperCase() ?? "?"}
              </Text>
            </View>
            <View>
              <Text className="text-base font-semibold text-gray-900 dark:text-white">
                {profile?.full_name ?? "IndiaQuant User"}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</Text>
            </View>
          </View>

          {/* Subscription tier badge */}
          <View className="px-4 py-3 border-t border-gray-50 dark:border-gray-800 flex-row items-center justify-between">
            <Text className="text-sm text-gray-600 dark:text-gray-400">Subscription</Text>
            <View className={`px-3 py-1 rounded-full ${
              tier === SubscriptionTier.EXPERT
                ? "bg-purple-100 dark:bg-purple-900"
                : tier === SubscriptionTier.PRO
                ? "bg-brand-100 dark:bg-brand-900"
                : "bg-gray-100 dark:bg-gray-800"
            }`}>
              <Text className={`text-xs font-bold ${
                tier === SubscriptionTier.EXPERT
                  ? "text-purple-700 dark:text-purple-300"
                  : tier === SubscriptionTier.PRO
                  ? "text-brand-700 dark:text-brand-300"
                  : "text-gray-600 dark:text-gray-400"
              }`}>
                {tier}
              </Text>
            </View>
          </View>

          {tier === SubscriptionTier.FREE && (
            <TouchableOpacity
              className="mx-4 mb-4 bg-brand-500 rounded-card py-3 items-center"
              onPress={() => router.push("/subscription" as any)}
            >
              <Text className="text-white font-semibold">Upgrade to Pro</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tax Preferences */}
      <View className="mb-4">
        <Text className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
          Tax Preferences
        </Text>
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
          <View className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
            <Text className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Lot Matching Method
            </Text>
            <View className="flex-row gap-2">
              {([TaxLotMethod.FIFO, TaxLotMethod.LIFO, TaxLotMethod.MIN_GAIN] as TaxLotMethod[]).map((method) => (
                <TouchableOpacity
                  key={method}
                  className={`flex-1 py-2 rounded-lg items-center border ${
                    taxMethod === method
                      ? "bg-brand-500 border-brand-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onPress={() => updateProfile.mutate({ tax_lot_method: method })}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      taxMethod === method ? "text-white" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-xs text-gray-400 mt-2">
              FIFO is the default and most commonly used method for Indian mutual funds.
            </Text>
          </View>
        </View>
      </View>

      {/* Security */}
      <View className="mb-4">
        <Text className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
          Security
        </Text>
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
          <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-gray-50 dark:border-gray-800">
            <View>
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Biometric Lock
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Require Face ID / fingerprint to open app
              </Text>
            </View>
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: "#e5e7eb", true: "#f97316" }}
            />
          </View>
          <View className="px-4 py-3.5 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Screen Capture Prevention
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Block screenshots of portfolio data
              </Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: "#e5e7eb", true: "#f97316" }}
            />
          </View>
        </View>
      </View>

      {/* About */}
      <View className="mb-4">
        <Text className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
          About
        </Text>
        <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
          <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-gray-50 dark:border-gray-800">
            <Text className="text-sm text-gray-700 dark:text-gray-300">Version</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">1.0.0</Text>
          </View>
          <TouchableOpacity className="px-4 py-3.5 flex-row items-center justify-between border-b border-gray-50 dark:border-gray-800">
            <Text className="text-sm text-gray-700 dark:text-gray-300">Privacy Policy</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3.5 flex-row items-center justify-between">
            <Text className="text-sm text-gray-700 dark:text-gray-300">Terms of Service</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danger Zone */}
      <View className="mx-4 mb-8 gap-3">
        <TouchableOpacity
          className="bg-white dark:bg-gray-900 rounded-card py-3.5 items-center shadow-sm"
          onPress={() => signOut()}
        >
          <Text className="text-loss font-semibold">Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-card py-3.5 items-center border border-red-200 dark:border-red-800"
          onPress={handleDeleteAccount}
        >
          <Text className="text-loss text-sm">Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
