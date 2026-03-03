import { Stack } from "expo-router";

/**
 * Tools layout — Phase 0 viral tools.
 * No auth required. SEO-optimized static pages on web.
 */
export default function ToolsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#f97316",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "IndiaQuant Tools", headerShown: false }} />
      <Stack.Screen name="heatmap" options={{ title: "Returns Heatmap" }} />
      <Stack.Screen name="sip-calculator" options={{ title: "SIP Calculator" }} />
      <Stack.Screen name="rolling-returns" options={{ title: "Rolling Returns" }} />
      <Stack.Screen name="asset-comparison" options={{ title: "Asset Comparison" }} />
    </Stack>
  );
}
