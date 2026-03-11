"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockMonthlyRevenue } from "@/data/mock";

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-background-card border border-border p-5"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Receita Mensal
          </h3>
          <p className="text-sm text-text-muted mt-0.5">
            Últimos 6 meses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-medium rounded-full bg-worder-primary/10 text-worder-primary cursor-pointer">
            Mensal
          </button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-full text-text-muted hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            Semanal
          </button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-full text-text-muted hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            Diário
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={mockMonthlyRevenue}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F26B2A" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F26B2A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              boxShadow: "var(--shadow-card-hover)",
              fontSize: "13px",
            }}
            formatter={(value) => [
              `R$ ${Number(value).toLocaleString("pt-BR")}`,
              "Receita",
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#F26B2A"
            strokeWidth={2.5}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
