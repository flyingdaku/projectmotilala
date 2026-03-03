import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "~/features/auth/model/use-auth";

/**
 * More tab — settings, account, premium features, and navigation to
 * Retirement, Goals, Screener, Factor Analysis, Macro data.
 */
export default function MoreScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const sections = [
    {
      title: "Analytics",
      items: [
        { label: "Retirement Planner", icon: "🏖️", href: "/retirement" },
        { label: "Goals", icon: "🎯", href: "/goals" },
        { label: "Monte Carlo", icon: "🎲", href: "/monte-carlo" },
        { label: "Stock Screener", icon: "🔍", href: "/screener" },
        { label: "Factor Analysis", icon: "📊", href: "/factor-analysis" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Profile & Settings", icon: "⚙️", href: "/settings" },
        { label: "Subscription", icon: "💎", href: "/subscription" },
        { label: "Import History", icon: "📥", href: "/import-history" },
      ],
    },
    {
      title: "Free Tools",
      items: [
        { label: "Returns Heatmap", icon: "🗺️", href: "/tools/heatmap" },
        { label: "SIP Calculator", icon: "📈", href: "/tools/sip-calculator" },
        { label: "Rolling Returns", icon: "🔄", href: "/tools/rolling-returns" },
        { label: "Asset Comparison", icon: "⚖️", href: "/tools/asset-comparison" },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">More</Text>
        {user && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</Text>
        )}
      </View>

      {sections.map((section) => (
        <View key={section.title} className="mb-4">
          <Text className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            {section.title}
          </Text>
          <View className="mx-4 bg-white dark:bg-gray-900 rounded-card shadow-sm overflow-hidden">
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                className={`flex-row items-center px-4 py-3.5 ${
                  idx < section.items.length - 1
                    ? "border-b border-gray-50 dark:border-gray-800"
                    : ""
                }`}
                onPress={() => router.push(item.href as any)}
              >
                <Text className="text-xl w-8">{item.icon}</Text>
                <Text className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.label}
                </Text>
                <Text className="text-gray-400 text-base">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Sign Out */}
      <View className="mx-4 mt-2 mb-8">
        <TouchableOpacity
          className="bg-white dark:bg-gray-900 rounded-card py-3.5 items-center shadow-sm"
          onPress={() => signOut()}
        >
          <Text className="text-loss font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
