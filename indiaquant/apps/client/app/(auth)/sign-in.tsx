import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useAuth } from "~/features/auth/model/use-auth";

/**
 * Sign-in screen.
 * Supports Google OAuth, Apple Sign-In, and Email OTP.
 */
export default function SignInScreen() {
  const { signInWithGoogle, signInWithApple, signInWithOTP } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailOTP = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    setError(null);
    const { error } = await signInWithOTP(email.trim().toLowerCase());
    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-950 px-6 justify-center">
      {/* Logo / Brand */}
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-brand-500">IndiaQuant</Text>
        <Text className="text-gray-500 dark:text-gray-400 mt-2 text-center">
          Portfolio analytics built for Indian investors
        </Text>
      </View>

      {otpSent ? (
        <View className="items-center">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Check your email
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            We sent a magic link to {email}. Tap it to sign in.
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          {/* Email OTP */}
          <TextInput
            className="border border-gray-200 dark:border-gray-700 rounded-card px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {error && (
            <Text className="text-loss text-sm">{error}</Text>
          )}

          <TouchableOpacity
            className="bg-brand-500 rounded-card py-3 items-center"
            onPress={handleEmailOTP}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Continue with Email</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <Text className="text-gray-400 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </View>

          {/* Google OAuth */}
          <TouchableOpacity
            className="border border-gray-200 dark:border-gray-700 rounded-card py-3 items-center flex-row justify-center gap-2"
            onPress={() => signInWithGoogle()}
          >
            <Text className="text-gray-700 dark:text-gray-300 font-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Apple Sign-In — iOS only */}
          {Platform.OS === "ios" && (
            <TouchableOpacity
              className="bg-black rounded-card py-3 items-center flex-row justify-center gap-2"
              onPress={() => signInWithApple()}
            >
              <Text className="text-white font-medium">Continue with Apple</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text className="text-gray-400 text-xs text-center mt-8">
        By signing in, you agree to our Terms of Service and Privacy Policy.
        Your financial data is never shared.
      </Text>
    </View>
  );
}
