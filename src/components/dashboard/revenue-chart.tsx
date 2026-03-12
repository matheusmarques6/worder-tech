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
import { revenueChartData } from "@/lib/mock-data/dashboard";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;

  return (
    <div
      className="bg-background-card dark:bg-[#1A1A1A] border border-border rounded-xl shadow-lg p-3 min-w-[180px]"
    >
      <p className="text-xs text-text-muted font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: entry.dataKey === "attributed" ? "#F26B2A" : "#E0E0E0",
              }}
            />
            <span className="text-xs text-text-secondary">
              {entry.dataKey === "attributed" ? "Atribuída Worder" : "Receita Total"}
            </span>
          </div>
          <span className="text-xs font-semibold text-text-primary">
            R$ {entry.value.toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
}

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
            Receita — Últimos 30 dias
          </h3>
          <p className="text-sm text-text-muted mt-0.5">
            Total vs. Atribuída à Worder
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#E0E0E0]" />
            <span className="text-text-muted">Receita Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-worder-primary" />
            <span className="text-text-muted">Receita Atribuída</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={revenueChartData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E0E0E0" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#E0E0E0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAttributed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F26B2A" stopOpacity={0.25} />
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
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            interval={4}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            tickFormatter={(v) =>
              `R$ ${(v / 1000).toFixed(0)}k`
            }
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#E0E0E0"
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
