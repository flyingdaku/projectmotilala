import { View, type ViewProps } from "react-native";

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number;
  className?: string;
}

/** Animated skeleton placeholder for loading states. */
export function Skeleton({ width, height = 16, className, style, ...props }: SkeletonProps) {
  return (
    <View
      className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className ?? ""}`}
      style={[{ width: width as number, height }, style]}
      {...props}
    />
  );
}
