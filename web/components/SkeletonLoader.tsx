import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  count?: number; // Number of skeleton items to render
  isCircle?: boolean; // Render as circles if true
  fullWidth?: boolean; // Whether the skeleton should cover full width
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = "",
  count = 1,
  isCircle = false,
  fullWidth = false,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-pulse bg-gray-300 dark:bg-gray-700",
            isCircle
              ? "rounded-full w-10 h-10"
              : fullWidth
              ? "rounded-md h-6 w-full"
              : "rounded-md h-6 w-1/2" // Default size if `fullWidth` is false
          )}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
