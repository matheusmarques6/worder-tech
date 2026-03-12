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
import { revenueTimeline } from "@/lib/mock-data/analytics";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;

  const labels: Record<string, string> = {
    total: "Receita Total",
    attributed: "Receita Atribuída",
    recipients: "Destinatários",
  };

  return (
    <div className="bg-background-card border border-border shadow-lg p-3 min-w-[200px]" style={{ borderRadius: "10px" }}>
      <p className="text-xs text-text-muted font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: entry.dataKey === "attributed" ? "#F26B2A" : entry.dataKey === "recipients" ? "#F5A623" : "#E0E0E0",
              }}
            />
            <span className="text-xs text-text-secondary">{labels[entry.dataKey] || entry.dataKey}</span>
          </div>
          <span className="text-xs font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
            {entry.dataKey === "recipients"
              ? entry.value.toLocaleString("pt-BR")
              : `R$ ${(entry.value / 1000000).toFixed(1)}mi`}
          </span>
        </div>
      ))}
    </div>
  );
}

export function OverviewChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-background-card border border-border p-5"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-text-primary font-heading">Receita ao longo do tempo</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-border" />
            <span className="text-text-muted">Receita Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-worder-primary" />
            <span className="text-text-muted">Atribuída</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
            <span className="text-text-muted">Destinatários</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={revenueTimeline}>
          <defs>
            <linearGradient id="colorTotalAn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E0E0E0" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#E0E0E0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAttributedAn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F26B2A" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#F26B2A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} interval={4} />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#999", fontSize: 11 }}
            tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(0)}mi`}
            width={75}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#F5A623", fontSize: 11 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area yAxisId="left" type="monotone" dataKey="total" stroke="#E0E0E0" strokeWidth={2} fill="url(#colorTotalAn)" />
          <Area yAxisId="left" type="monotone" dataKey="attributed" stroke="#F26B2A" strokeWidth={2.5} fill="url(#colorAttributedAn)" />
          <Area yAxisId="right" type="monotone" dataKey="recipients" stroke="#F5A623" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
