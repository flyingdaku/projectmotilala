import { TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps } from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, { container: string; text: string }> = {
  primary: { container: "bg-brand-500 active:bg-brand-600", text: "text-white font-semibold" },
  secondary: { container: "border border-brand-500 active:bg-brand-50", text: "text-brand-500 font-semibold" },
  ghost: { container: "active:bg-gray-100 dark:active:bg-gray-800", text: "text-gray-700 dark:text-gray-300" },
  danger: { container: "bg-loss active:bg-red-700", text: "text-white font-semibold" },
};

const SIZE_CLASSES: Record<ButtonSize, { container: string; text: string }> = {
  sm: { container: "px-3 py-1.5 rounded-lg", text: "text-sm" },
  md: { container: "px-4 py-2.5 rounded-card", text: "text-base" },
  lg: { container: "px-6 py-3.5 rounded-card", text: "text-base" },
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const { container: variantContainer, text: variantText } = VARIANT_CLASSES[variant];
  const { container: sizeContainer, text: sizeText } = SIZE_CLASSES[size];

  return (
    <TouchableOpacity
      className={`items-center justify-center flex-row gap-2 ${variantContainer} ${sizeContainer} ${
        disabled || isLoading ? "opacity-50" : ""
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text className={`${variantText} ${sizeText}`}>{label}</Text>
    </TouchableOpacity>
  );
}
