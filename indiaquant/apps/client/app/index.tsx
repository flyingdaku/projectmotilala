import { Redirect } from "expo-router";
import { useAuth } from "~/features/auth/model/use-auth";

/**
 * Root index — redirect based on auth state.
 * Authenticated users → portfolio dashboard.
 * Unauthenticated users → tools (viral Phase 0 landing).
 */
export default function Index() {
  const { session, isLoading } = useAuth();

  if (isLoading) return null;

  if (session) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/tools" />;
}
