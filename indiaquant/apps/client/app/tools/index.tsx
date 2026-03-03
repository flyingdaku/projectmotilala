import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const TOOLS = [
  {
    id: "heatmap",
    title: "Returns Heatmap",
    description: "Visualize CAGR by year × holding period for any Indian asset class",
    emoji: "🗺️",
    href: "/tools/heatmap",
    badge: "Signature",
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator",
    description: "Compare SIP vs Lumpsum returns with step-up and inflation adjustment",
    emoji: "📈",
    href: "/tools/sip-calculator",
    badge: null,
  },
  {
    id: "rolling-returns",
    title: "Rolling Returns",
    description: "See best, worst, and median outcomes for 1/3/5/10yr rolling windows",
    emoji: "🔄",
    href: "/tools/rolling-returns",
    badge: null,
  },
  {
    id: "asset-comparison",
    title: "Asset Comparison",
    description: "Compare Nifty, Gold, FD, G-Sec, Real Estate over any period",
    emoji: "⚖️",
    href: "/tools/asset-comparison",
    badge: null,
  },
];

/**
 * Tools landing page — Phase 0 viral hook.
 * No auth required. SEO-optimized on web.
 */
export default function ToolsIndex() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <View className="bg-brand-500 px-6 pt-16 pb-10">
        <Text className="text-white text-3xl font-bold">IndiaQuant</Text>
        <Text className="text-orange-100 text-lg mt-2">
          Free tools for Indian investors
        </Text>
        <Text className="text-orange-200 text-sm mt-1">
          No signup required · Shareable links · India data
        </Text>
      </View>

      {/* Tools Grid */}
      <View className="px-4 py-6 gap-3">
        {TOOLS.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm active:opacity-80"
            onPress={() => router.push(tool.href as any)}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-2xl">{tool.emoji}</Text>
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {tool.title}
                  </Text>
                  {tool.badge && (
                    <View className="bg-brand-100 dark:bg-brand-900 px-2 py-0.5 rounded-full">
                      <Text className="text-brand-600 dark:text-brand-300 text-xs font-medium">
                        {tool.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.description}
                </Text>
              </View>
              <Text className="text-gray-400 text-lg ml-2">›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign-in CTA */}
      <View className="mx-4 mb-8 bg-brand-50 dark:bg-brand-950 rounded-card p-5 border border-brand-200 dark:border-brand-800">
        <Text className="text-brand-800 dark:text-brand-200 font-semibold mb-1">
          Track your portfolio
        </Text>
        <Text className="text-brand-600 dark:text-brand-400 text-sm mb-3">
          Import your CAS statement to get XIRR, tax reports, and more.
        </Text>
        <TouchableOpacity
          className="bg-brand-500 rounded-lg py-2.5 items-center"
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text className="text-white font-semibold">Get Started Free</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
