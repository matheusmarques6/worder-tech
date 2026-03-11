"use client";

import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { HeroCard } from "@/components/dashboard/hero-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ChannelRevenueChart } from "@/components/dashboard/channel-revenue-chart";
import { TopAutomations } from "@/components/dashboard/top-automations";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ActiveConversations } from "@/components/dashboard/active-conversations";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import { dashboardKPIsPrimary, dashboardKPIsSecondary } from "@/data/mock";
import { motion } from "framer-motion";

const primaryIcons = ["revenue", "orders", "ticket", "customers"] as const;
const secondaryIcons = ["orders", "revenue", "orders", "ai", "ai", "conversion"] as const;

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      {/* Header + Period Selector */}
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" breadcrumb={["Dashboard"]} />
        <PeriodSelector />
      </div>

      {/* Hero Card — Receita Recuperada (diferencial visual, spec 4.1) */}
      <HeroCard />

      {/* 4 KPIs Primários: Receita Total, Pedidos, Ticket Médio, Novos Leads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardKPIsPrimary.map((kpi, i) => (
          <KPICard key={kpi.label} {...kpi} icon={primaryIcons[i]} index={i} />
        ))}
      </div>

      {/* 6 KPIs Secundários: Carrinhos, Recuperados, PIX, Atendimentos, Mensagens, Taxa */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {dashboardKPIsSecondary.map((kpi, i) => (
          <KPICard key={kpi.label} {...kpi} icon={secondaryIcons[i]} index={i + 4} />
        ))}
      </div>

      {/* Gráficos: Receita Total vs Atribuída + Receita por Canal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <ChannelRevenueChart />
        </div>
      </div>

      {/* Top Automações + Conversas Ativas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopAutomations />
        </div>
        <div>
          <ActiveConversations />
        </div>
      </div>

      {/* Campanhas Recentes / Pedidos Recentes */}
      <RecentOrders />
    </motion.div>
  );
}
