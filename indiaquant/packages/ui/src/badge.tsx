import { View, Text } from "react-native";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, { container: string; text: string }> = {
  default: { container: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300" },
  success: { container: "bg-gain-light dark:bg-green-900", text: "text-gain dark:text-green-300" },
  warning: { container: "bg-amber-100 dark:bg-amber-900", text: "text-amber-700 dark:text-amber-300" },
  danger: { container: "bg-loss-light dark:bg-red-900", text: "text-loss dark:text-red-300" },
  info: { container: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300" },
};

export function Badge({ label, variant = "default" }: BadgeProps) {
  const { container, text } = VARIANT_CLASSES[variant];
  return (
    <View className={`px-2 py-0.5 rounded-full ${container}`}>
      <Text className={`text-xs font-medium ${text}`}>{label}</Text>
    </View>
  );
}
