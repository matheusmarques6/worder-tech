"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "E-mail", value: 89500, color: "#3B82F6" },
  { name: "WhatsApp", value: 45200, color: "#25D366" },
  { name: "SMS", value: 12800, color: "#F59E0B" },
  { name: "Chat Web", value: 8900, color: "#F26B2A" },
];

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

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            horizontal={false}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 13, fontWeight: 500 }}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
