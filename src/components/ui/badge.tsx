"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-border-subtle text-text-secondary dark:bg-[#2A2A2A]",
        primary: "bg-worder-primary/10 text-worder-primary",
        success: "bg-success/10 text-success",
        error: "bg-error/10 text-error",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5 rounded-full",
        md: "text-xs px-2.5 py-1 rounded-full",
        lg: "text-sm px-3 py-1.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}
