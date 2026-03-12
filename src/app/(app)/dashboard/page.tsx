"use client";

import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroCard } from "@/components/dashboard/hero-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ChannelRevenueChart } from "@/components/dashboard/channel-revenue-chart";
import { TopAutomations } from "@/components/dashboard/top-automations";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import {
  PeriodSelector,
  useDashboardStore,
} from "@/components/dashboard/period-selector";
import { kpisPrimary, kpisSecondary } from "@/lib/mock-data/dashboard";
import { motion, AnimatePresence } from "framer-motion";

const stagger = {
  initial: { opacity: 0, y: 16 } as const,
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function DashboardPage() {
  const loading = useDashboardStore((s) => s.loading);

  return (
    <div className="px-7 py-6 space-y-6">
      {/* Header + Period Selector */}
      <motion.div
        custom={0}
        initial={stagger.initial}
        animate={stagger.animate(0)}
        className="flex items-center justify-between"
      >
        <PageHeader title="Dashboard" breadcrumb={["Dashboard"]} />
        <PeriodSelector />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Skeleton variant="card" className="h-[160px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="card" className="h-[120px]" />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="card" className="h-[100px]" />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Hero Card */}
            <motion.div
              custom={1}
              initial={stagger.initial}
              animate={stagger.animate(1)}
            >
              <HeroCard />
            </motion.div>

            {/* 4 KPIs Primários */}
            <motion.div
              custom={2}
              initial={stagger.initial}
              animate={stagger.animate(2)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {kpisPrimary.map((kpi, i) => (
                <KPICard key={kpi.label} {...kpi} index={i} />
              ))}
            </motion.div>

            {/* 6 KPIs Secundários */}
            <motion.div
              custom={3}
              initial={stagger.initial}
              animate={stagger.animate(3)}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {kpisSecondary.map((kpi, i) => (
                <KPICard key={kpi.label} {...kpi} index={i + 4} />
              ))}
            </motion.div>

            {/* Gráficos: Receita (70%) + Canal (30%) */}
            <motion.div
              custom={4}
              initial={stagger.initial}
              animate={stagger.animate(4)}
              className="grid grid-cols-1 lg:grid-cols-10 gap-4"
            >
              <div className="lg:col-span-7">
                <RevenueChart />
              </div>
              <div className="lg:col-span-3">
                <ChannelRevenueChart />
              </div>
            </motion.div>

            {/* Tabelas: Top Automações (50%) + Campanhas Recentes (50%) */}
            <motion.div
              custom={5}
              initial={stagger.initial}
              animate={stagger.animate(5)}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              <TopAutomations />
              <RecentCampaigns />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
