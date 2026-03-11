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
  Legend,
} from "recharts";
import { mockRevenueComparison } from "@/data/mock";

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
            Total vs. Atribuída à Worder
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#D1D5DB]" />
            <span className="text-text-muted">Receita Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-worder-primary" />
            <span className="text-text-muted">Receita Atribuída</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={mockRevenueComparison}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAttributed" x1="0" y1="0" x2="0" y2="1">
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
            formatter={(value, name) => [
              `R$ ${Number(value).toLocaleString("pt-BR")}`,
              name === "total" ? "Receita Total" : "Receita Atribuída",
            ]}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#D1D5DB"
            strokeWidth={2}
            fill="url(#colorTotal)"
          />
          <Area
            type="monotone"
            dataKey="attributed"
            stroke="#F26B2A"
            strokeWidth={2.5}
            fill="url(#colorAttributed)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
