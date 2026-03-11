"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "table-row";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const variantStyles = {
    text: "h-4 w-full rounded",
    card: "h-32 w-full rounded-xl",
    avatar: "h-10 w-10 rounded-full",
    "table-row": "h-12 w-full rounded-lg",
  };

  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%]",
        "dark:from-[#2A2A2A] dark:via-[#3A3A3A] dark:to-[#2A2A2A]",
        variantStyles[variant],
        className
      )}
    />
  );
}
