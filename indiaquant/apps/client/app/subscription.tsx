import { ScrollView, View, Text, TouchableOpacity } from "react-native";

/**
 * Subscription / Paywall screen.
 * Shows Pro and Expert tier features with pricing.
 */
export default function SubscriptionScreen() {
  const plans = [
    {
      tier: "Free",
      price: "₹0",
      period: "forever",
      color: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-gray-700 dark:text-gray-300",
      features: [
        "Returns Heatmap",
        "SIP Calculator",
        "Rolling Returns",
        "Asset Comparison",
        "1 Portfolio",
      ],
      cta: "Current Plan",
      ctaDisabled: true,
    },
    {
      tier: "Pro",
      price: "₹499",
      period: "per month",
      color: "bg-brand-500",
      textColor: "text-white",
      features: [
        "Everything in Free",
        "Unlimited Portfolios",
        "CAS Import",
        "Tax Engine (LTCG/STCG)",
        "Backtesting",
        "Stock Screener",
        "Monte Carlo",
        "PDF Export",
        "Broker Sync",
      ],
      cta: "Start 7-Day Free Trial",
      ctaDisabled: false,
      highlight: true,
    },
    {
      tier: "Expert",
      price: "₹999",
      period: "per month",
      color: "bg-purple-600",
      textColor: "text-white",
      features: [
        "Everything in Pro",
        "Factor Analysis (FF5)",
        "AI Portfolio Insights",
        "Priority Support",
        "Early Access to Features",
      ],
      cta: "Get Expert",
      ctaDisabled: false,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-6 pb-4 items-center">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Upgrade IndiaQuant
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Unlock India's most powerful portfolio analytics
        </Text>
      </View>

      <View className="px-4 gap-4">
        {plans.map((plan) => (
          <View
            key={plan.tier}
            className={`rounded-card overflow-hidden shadow-sm ${
              plan.highlight ? "border-2 border-brand-500" : ""
            }`}
          >
            {plan.highlight && (
              <View className="bg-brand-500 py-1.5 items-center">
                <Text className="text-white text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </Text>
              </View>
            )}
            <View className="bg-white dark:bg-gray-900 p-5">
              <View className="flex-row items-baseline justify-between mb-4">
                <Text className="text-lg font-bold text-gray-900 dark:text-white">{plan.tier}</Text>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">{plan.period}</Text>
                </View>
              </View>

              <View className="gap-2 mb-5">
                {plan.features.map((feature) => (
                  <View key={feature} className="flex-row items-center gap-2">
                    <Text className="text-gain text-sm">✓</Text>
                    <Text className="text-sm text-gray-700 dark:text-gray-300">{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                className={`rounded-card py-3 items-center ${
                  plan.ctaDisabled
                    ? "bg-gray-100 dark:bg-gray-800"
                    : plan.tier === "Expert"
                    ? "bg-purple-600"
                    : "bg-brand-500"
                }`}
                disabled={plan.ctaDisabled}
                onPress={() => {
                  if (!plan.ctaDisabled) {
                    // TODO: Integrate with RevenueCat / Razorpay
                  }
                }}
              >
                <Text
                  className={`font-semibold ${
                    plan.ctaDisabled ? "text-gray-500 dark:text-gray-400" : "text-white"
                  }`}
                >
                  {plan.cta}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text className="text-xs text-gray-400 text-center mt-2 mb-8">
          Cancel anytime. No questions asked.
        </Text>
      </View>
    </ScrollView>
  );
}
