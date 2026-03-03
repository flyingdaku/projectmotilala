import { Tabs } from "expo-router";
import { Platform } from "react-native";

/**
 * Main tab navigator for authenticated users.
 * Tabs: Dashboard, Portfolio, Tax, Backtest, Tools
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Platform.OS === "web" ? "white" : undefined,
          borderTopColor: "#e5e7eb",
        },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{ title: "Portfolio", tabBarLabel: "Portfolio" }}
      />
      <Tabs.Screen
        name="tax"
        options={{ title: "Tax", tabBarLabel: "Tax" }}
      />
      <Tabs.Screen
        name="backtest"
        options={{ title: "Backtest", tabBarLabel: "Backtest" }}
      />
      <Tabs.Screen
        name="more"
        options={{ title: "More", tabBarLabel: "More" }}
      />
    </Tabs>
  );
}
