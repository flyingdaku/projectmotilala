import { useAuthContext } from "./auth-provider";
import { supabase } from "~/lib/supabase";

/**
 * Hook for auth state and actions.
 * Use this in components — not useAuthContext directly.
 */
export function useAuth() {
  const { session, isLoading } = useAuthContext();

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: "google" });

  const signInWithApple = () =>
    supabase.auth.signInWithOAuth({ provider: "apple" });

  const signInWithOTP = (email: string) =>
    supabase.auth.signInWithOtp({ email });

  const signOut = () => supabase.auth.signOut();

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session,
    signInWithGoogle,
    signInWithApple,
    signInWithOTP,
    signOut,
  };
}
