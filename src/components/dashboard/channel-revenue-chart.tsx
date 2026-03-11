"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { channelRevenueData } from "@/lib/mock-data/dashboard";

export function ChannelRevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-background-card border border-border p-5"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-text-primary font-heading">
          Receita por Canal
        </h3>
        <p className="text-sm text-text-muted mt-0.5">
          Distribuição de receita atribuída
        </p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={channelRevenueData}
          layout="vertical"
          margin={{ left: 10, right: 60 }}
        >
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--text-muted)",
              fontSize: 13,
              fontWeight: 500,
            }}
            width={80}
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
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
            {channelRevenueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => `R$ ${(Number(v) / 1000).toFixed(1)}k`}
              style={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
