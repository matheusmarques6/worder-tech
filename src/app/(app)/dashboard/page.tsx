"use client";

import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ActiveConversations } from "@/components/dashboard/active-conversations";
import { dashboardKPIs } from "@/data/mock";
import { motion } from "framer-motion";

const kpiConfig = [
  { ...dashboardKPIs.totalRevenue, icon: "revenue" },
  { ...dashboardKPIs.totalOrders, icon: "orders" },
  { ...dashboardKPIs.averageTicket, icon: "ticket" },
  { ...dashboardKPIs.conversionRate, icon: "conversion" },
  { ...dashboardKPIs.activeCustomers, icon: "customers" },
  { ...dashboardKPIs.messagesAI, icon: "ai" },
];

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Dashboard"
        breadcrumb={["Dashboard"]}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiConfig.map((kpi, i) => (
          <KPICard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      {/* Charts + Conversations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <ActiveConversations />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </motion.div>
  );
}
