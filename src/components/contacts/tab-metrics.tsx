"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventTimeline } from "./event-timeline";
import {
  ShoppingCart,
  CurrencyCircleDollar,
  Package,
  ArrowUUpLeft,
  Cursor,
  ShoppingCartSimple,
  Brain,
  CalendarBlank,
  Warning,
  Storefront,
} from "@phosphor-icons/react";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface TabMetricsProps {
  contact: ContactProfile;
}

export function TabMetrics({ contact }: TabMetricsProps) {
  const [period, setPeriod] = useState<"30d" | "all">("all");
  const m = contact.metrics;
  const clvTotal = m.clvHistorico + m.clvPrevisto;
  const clvHistPct = Math.round((m.clvHistorico / clvTotal) * 100);
  const clvPrevPct = 100 - clvHistPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_0.67fr] gap-6"
    >
      {/* Left column */}
      <div className="space-y-5">
        {/* Métricas */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <CardTitle className="flex items-center gap-2 !pb-0">
              <CurrencyCircleDollar size={18} weight="duotone" className="text-worder-primary" />
              Métricas
            </CardTitle>
            <div className="flex items-center gap-1 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-lg p-0.5">
              <button
                onClick={() => setPeriod("30d")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  period === "30d"
                    ? "bg-white dark:bg-[#1A1A1A] text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                30 dias
              </button>
              <button
                onClick={() => setPeriod("all")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  period === "all"
                    ? "bg-white dark:bg-[#1A1A1A] text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                Todo o período
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MetricKPI
              icon={ShoppingCart}
              label="Placed Orders"
              value={String(m.placedOrders)}
              color="text-worder-primary"
              bg="bg-worder-primary/10"
            />
            <MetricKPI
              icon={CurrencyCircleDollar}
              label="Revenue"
              value={formatCurrency(m.revenue)}
              color="text-success"
              bg="bg-success/10"
            />
            <MetricKPI
              icon={Package}
              label="Fulfilled Orders"
              value={String(m.fulfilledOrders)}
              color="text-info"
              bg="bg-info/10"
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Badge variant="default" size="sm">
              <Storefront size={12} weight="fill" className="mr-1" />
              Shopify
            </Badge>
          </div>
        </Card>

        {/* Métricas Selecionadas */}
        <Card>
          <CardTitle className="mb-4 flex items-center gap-2">
            <Cursor size={18} weight="duotone" className="text-worder-primary" />
            Métricas Selecionadas
          </CardTitle>
          <div className="space-y-0">
            <MetricRow
              icon={ArrowUUpLeft}
              label="Refunded Orders"
              value={String(m.refundedOrders)}
            />
            <MetricRow
              icon={ShoppingCartSimple}
              label="Checkout Started"
              value={String(m.checkoutStarted)}
            />
            <MetricRow
              icon={ShoppingCart}
              label="Added to Cart"
              value={String(m.addedToCart)}
            />
          </div>
        </Card>

        {/* Análise Preditiva */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <CardTitle className="flex items-center gap-2 !pb-0">
              <Brain size={18} weight="duotone" className="text-worder-primary" />
              Análise Preditiva
            </CardTitle>
            <Badge variant="primary" size="sm">
              Worder IA
            </Badge>
          </div>

          {/* CLV Bars */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-text-muted">CLV Histórico</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(m.clvHistorico)}
                </span>
              </div>
              <div className="h-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-info"
                  initial={{ width: 0 }}
                  animate={{ width: `${clvHistPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-text-muted">CLV Previsto</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(m.clvPrevisto)}
                </span>
              </div>
              <div className="h-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-success"
                  initial={{ width: 0 }}
                  animate={{ width: `${clvPrevPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm font-semibold text-text-primary">CLV Total</span>
              <span className="text-lg font-bold text-text-primary">
                {formatCurrency(clvTotal)}
              </span>
            </div>
          </div>

          {/* Predictions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2.5 px-3 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CalendarBlank size={16} weight="duotone" />
                Próximo pedido previsto
              </div>
              <span className="text-sm font-semibold text-text-primary">
                {new Date(m.nextPurchaseDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 px-3 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Warning size={16} weight="duotone" />
                Risco de desistência
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">
                  {m.churnRisk}%
                </span>
                <Badge
                  variant={
                    m.churnRiskLabel === "Baixo"
                      ? "success"
                      : m.churnRiskLabel === "Médio"
                        ? "warning"
                        : "error"
                  }
                  size="sm"
                >
                  {m.churnRiskLabel}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right column — timeline */}
      <div>
        <Card>
          <CardTitle className="mb-4">Linha do Tempo</CardTitle>
          <EventTimeline events={contact.timeline} />
        </Card>
      </div>
    </motion.div>
  );
}

function MetricKPI({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="text-center p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#111]">
      <div
        className={`h-10 w-10 rounded-full ${bg} flex items-center justify-center mx-auto mb-2`}
      >
        <Icon size={20} weight="duotone" className={color} />
      </div>
      <p className="text-xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-muted mt-0.5">{label}</p>
    </div>
  );
}

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-text-primary">
        <Icon size={16} weight="duotone" className="text-text-muted" />
        {label}
      </div>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}
