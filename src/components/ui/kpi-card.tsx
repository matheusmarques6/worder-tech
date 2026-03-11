"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  TrendUp,
  TrendDown,
  CurrencyDollar,
  ShoppingCart,
  Receipt,
  ChartLine,
  Users,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  revenue: <CurrencyDollar size={24} weight="fill" />,
  orders: <ShoppingCart size={24} weight="fill" />,
  ticket: <Receipt size={24} weight="fill" />,
  conversion: <ChartLine size={24} weight="fill" />,
  customers: <Users size={24} weight="fill" />,
  ai: <Robot size={24} weight="fill" />,
};

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon?: string;
  index?: number;
}

export function KPICard({
  label,
  value,
  change,
  changeLabel,
  icon = "revenue",
  index = 0,
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "bg-background-card border border-border p-5 flex items-start gap-4",
        "hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200"
      )}
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl text-white"
        style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
      >
        {iconMap[icon] || iconMap.revenue}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-muted font-medium truncate">{label}</p>
        <p className="text-2xl font-bold text-text-primary mt-1 font-heading">
          {value}
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          {isPositive ? (
            <TrendUp size={16} weight="bold" className="text-success" />
          ) : (
            <TrendDown size={16} weight="bold" className="text-error" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-success" : "text-error"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-text-muted">{changeLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}
