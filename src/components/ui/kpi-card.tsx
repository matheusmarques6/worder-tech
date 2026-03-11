"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  TrendUp,
  TrendDown,
  CurrencyDollar,
  ShoppingCart,
  ShoppingCartSimple,
  Receipt,
  ChartLine,
  Users,
  Robot,
  UserPlus,
  QrCode,
  ChatCircleDots,
  Percent,
  Barcode,
  PaperPlaneRight,
  ArrowCounterClockwise,
  CurrencyCircleDollar,
  Package,
  PixLogo,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  revenue: <CurrencyCircleDollar size={24} weight="fill" />,
  orders: <Package size={24} weight="fill" />,
  ticket: <Receipt size={24} weight="fill" />,
  conversion: <ChartLine size={24} weight="fill" />,
  customers: <Users size={24} weight="fill" />,
  ai: <Robot size={24} weight="fill" />,
  leads: <UserPlus size={24} weight="fill" />,
  cart: <ShoppingCartSimple size={24} weight="fill" />,
  pix: <PixLogo size={24} weight="fill" />,
  chat: <ChatCircleDots size={24} weight="fill" />,
  percent: <Percent size={24} weight="fill" />,
  barcode: <Barcode size={24} weight="fill" />,
  messages: <PaperPlaneRight size={24} weight="fill" />,
  recovery: <ArrowCounterClockwise size={24} weight="bold" />,
  "currency-dollar": <CurrencyDollar size={24} weight="fill" />,
  "shopping-cart": <ShoppingCart size={24} weight="fill" />,
  "qr-code": <QrCode size={24} weight="fill" />,
};

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;

  const width = 80;
  const height = 28;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((v - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="flex-shrink-0"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#F26B2A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon?: string;
  index?: number;
  sparkline?: number[];
  className?: string;
}

export function KPICard({
  label,
  value,
  change,
  changeLabel,
  icon = "revenue",
  index = 0,
  sparkline,
  className,
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "bg-background-card border border-border p-5 flex items-start gap-4",
        "hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200",
        className
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
        <div className="flex items-center gap-3 mt-1">
          <p className="text-2xl font-bold text-text-primary font-heading">
            {value}
          </p>
          {sparkline && sparkline.length >= 2 && (
            <Sparkline data={sparkline} />
          )}
        </div>
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
