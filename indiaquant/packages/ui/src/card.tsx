import { View, type ViewProps } from "react-native";
import type { ReactNode } from "react";

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

/** Base card container with rounded corners and shadow. */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={`bg-white dark:bg-gray-900 rounded-card shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </View>
  );
}
