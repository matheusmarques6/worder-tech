"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "text-white",
        secondary:
          "bg-background-card border border-border text-text-primary hover:bg-bg-hover dark:bg-background-card dark:border-border dark:hover:bg-[#2A2A2A]",
        ghost:
          "hover:bg-bg-hover text-text-primary dark:hover:bg-[#2A2A2A]",
        danger:
          "bg-error text-white hover:bg-[#DC2626]",
        link: "text-worder-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const isPrimary = variant === "primary" || variant === undefined;

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        style={
          isPrimary
            ? {
                background: "linear-gradient(135deg, #F26B2A, #F5A623)",
                borderRadius: "var(--radius-button)",
                boxShadow: "0 2px 8px rgba(242, 107, 42, 0.3)",
              }
            : {
                borderRadius: "var(--radius-button)",
              }
        }
        whileHover={
          isPrimary
            ? {
                scale: 1.02,
                boxShadow: "0 4px 16px rgba(242, 107, 42, 0.4)",
              }
            : { scale: 1.01 }
        }
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
