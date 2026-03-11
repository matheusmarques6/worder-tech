"use client";

import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  breadcrumb: string[];
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, breadcrumb, description, actions, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-center justify-between", className)}
    >
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm mb-1">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <CaretRight
                  size={12}
                  weight="bold"
                  className="text-text-muted"
                />
              )}
              <span
                className={cn(
                  i === breadcrumb.length - 1
                    ? "text-text-primary font-medium"
                    : "text-text-muted"
                )}
              >
                {item}
              </span>
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-text-muted mt-1">{description}</p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </motion.div>
  );
}
