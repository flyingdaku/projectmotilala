import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { queryClient } from "~/lib/query-client";
import { AuthProvider } from "~/features/auth/model/auth-provider";
import "../global.css";

// Keep splash screen visible while loading fonts/auth
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="tools" options={{ headerShown: false }} />
            <Stack.Screen name="retirement" options={{ title: "Retirement Planner", headerShown: true }} />
            <Stack.Screen name="goals" options={{ title: "Goals", headerShown: true }} />
            <Stack.Screen name="screener" options={{ title: "Stock Screener", headerShown: true }} />
            <Stack.Screen name="factor-analysis" options={{ title: "Factor Analysis", headerShown: true }} />
            <Stack.Screen name="settings" options={{ title: "Settings", headerShown: true }} />
            <Stack.Screen name="monte-carlo" options={{ title: "Monte Carlo", headerShown: true }} />
            <Stack.Screen name="subscription" options={{ title: "Subscription", headerShown: true }} />
            <Stack.Screen name="import-history" options={{ title: "Import History", headerShown: true }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
