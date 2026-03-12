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
  revenue: <CurrencyCircleDollar size={22} weight="fill" />,
  orders: <Package size={22} weight="fill" />,
  ticket: <Receipt size={22} weight="fill" />,
  conversion: <ChartLine size={22} weight="fill" />,
  customers: <Users size={22} weight="fill" />,
  ai: <Robot size={22} weight="fill" />,
  leads: <UserPlus size={22} weight="fill" />,
  cart: <ShoppingCartSimple size={22} weight="fill" />,
  pix: <PixLogo size={22} weight="fill" />,
  chat: <ChatCircleDots size={22} weight="fill" />,
  percent: <Percent size={22} weight="fill" />,
  barcode: <Barcode size={22} weight="fill" />,
  messages: <PaperPlaneRight size={22} weight="fill" />,
  recovery: <ArrowCounterClockwise size={22} weight="bold" />,
  "currency-dollar": <CurrencyDollar size={22} weight="fill" />,
  "shopping-cart": <ShoppingCart size={22} weight="fill" />,
  "qr-code": <QrCode size={22} weight="fill" />,
};

const iconColorMap: Record<string, { gradient: string; shadow: string }> = {
  revenue: { gradient: "linear-gradient(135deg, #22C55E, #16A34A)", shadow: "0 4px 12px rgba(34,197,94,0.3)" },
  orders: { gradient: "linear-gradient(135deg, #3B82F6, #2563EB)", shadow: "0 4px 12px rgba(59,130,246,0.3)" },
  ticket: { gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", shadow: "0 4px 12px rgba(139,92,246,0.3)" },
  leads: { gradient: "linear-gradient(135deg, #F26B2A, #F5A623)", shadow: "0 4px 12px rgba(242,107,42,0.3)" },
  customers: { gradient: "linear-gradient(135deg, #3B82F6, #2563EB)", shadow: "0 4px 12px rgba(59,130,246,0.3)" },
  cart: { gradient: "linear-gradient(135deg, #F59E0B, #D97706)", shadow: "0 4px 12px rgba(245,158,11,0.3)" },
  pix: { gradient: "linear-gradient(135deg, #F59E0B, #EAB308)", shadow: "0 4px 12px rgba(245,158,11,0.3)" },
  barcode: { gradient: "linear-gradient(135deg, #EF4444, #DC2626)", shadow: "0 4px 12px rgba(239,68,68,0.3)" },
  chat: { gradient: "linear-gradient(135deg, #3B82F6, #2563EB)", shadow: "0 4px 12px rgba(59,130,246,0.3)" },
  messages: { gradient: "linear-gradient(135deg, #22C55E, #16A34A)", shadow: "0 4px 12px rgba(34,197,94,0.3)" },
  percent: { gradient: "linear-gradient(135deg, #F26B2A, #F5A623)", shadow: "0 4px 12px rgba(242,107,42,0.3)" },
  recovery: { gradient: "linear-gradient(135deg, #F26B2A, #F5A623)", shadow: "0 4px 12px rgba(242,107,42,0.3)" },
  ai: { gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", shadow: "0 4px 12px rgba(139,92,246,0.3)" },
  conversion: { gradient: "linear-gradient(135deg, #22C55E, #16A34A)", shadow: "0 4px 12px rgba(34,197,94,0.3)" },
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
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke="#F26B2A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
  const colors = iconColorMap[icon] || iconColorMap.revenue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -2, boxShadow: "var(--shadow-card-hover)" }}
      className={cn(
        "bg-background-card border border-border p-6 flex items-start gap-4 transition-all duration-200",
        className
      )}
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl text-white"
        style={{ background: colors.gradient, boxShadow: colors.shadow }}
      >
        {iconMap[icon] || iconMap.revenue}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#888] font-medium truncate" style={{ letterSpacing: "0.02em" }}>
          {label}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-[28px] font-bold text-text-primary font-heading leading-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
            {value}
          </p>
          {sparkline && sparkline.length >= 2 && <Sparkline data={sparkline} />}
        </div>
        {change !== 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full",
                isPositive ? "bg-success/10 text-success" : "bg-error/10 text-error"
              )}
            >
              {isPositive ? <TrendUp size={12} weight="bold" /> : <TrendDown size={12} weight="bold" />}
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-[11px] text-text-muted">{changeLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
