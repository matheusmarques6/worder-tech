"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bg-subtle dark:bg-[#2A2A2A] text-text-muted mb-4 [&>svg]:w-8 [&>svg]:h-8">
        {icon}
      </div>

      <h3 className="text-lg font-bold font-heading text-text-primary text-center">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-text-muted text-center mt-2 max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
