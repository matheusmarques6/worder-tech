"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { campaignPerformanceData, campaignConversionValue } from "@/lib/mock-data/analytics";

type SubTab = "overview" | "metrics" | "best";

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-card border border-border shadow-lg p-3" style={{ borderRadius: "10px" }}>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-sm font-bold text-text-primary">
        R$ {payload[0].value.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}

export function CampaignPerformance() {
  const [subTab, setSubTab] = useState<SubTab>("overview");
  const [channelFilter, setChannelFilter] = useState("all");

  const subTabs: { id: SubTab; label: string }[] = [
    { id: "overview", label: "Visão geral" },
    { id: "metrics", label: "Métricas" },
    { id: "best", label: "Melhores mensagens" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border p-5"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-text-primary font-heading">
          Resumo de desempenho da campanha
        </h3>
        <select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="px-3 py-1.5 text-[12px] border border-border bg-card outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
          style={{ borderRadius: "8px" }}
        >
          <option value="all">Todos os canais</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
        </select>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-separator">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className="relative px-3 py-2 text-[12px] font-medium transition-colors"
            style={{ color: subTab === tab.id ? "#F26B2A" : "#888" }}
          >
            {tab.label}
            {subTab === tab.id && (
              <motion.div
                layoutId="campaign-subtab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
              />
            )}
          </button>
        ))}
      </div>

      {subTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big KPI */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Valor Conversão</p>
            <p className="text-[32px] font-bold text-text-primary font-heading" style={{ fontVariantNumeric: "tabular-nums" }}>
              R$ {campaignConversionValue.toLocaleString("pt-BR")}
            </p>
            <p className="text-[12px] text-success font-medium mt-1">+18,2% vs período anterior</p>
          </div>

          {/* Bar chart */}
          <div className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={campaignPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#999", fontSize: 11 }}
                  tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}mi`}
                  width={75}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="value" fill="#F26B2A" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {subTab === "metrics" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total enviados", value: "367.870" },
            { label: "Aberturas únicas", value: "53.972", sub: "22,0%" },
            { label: "Cliques únicos", value: "5.078", sub: "2,07%" },
            { label: "Conversões", value: "1.482", sub: "0,40%" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-background border border-separator"
              style={{ borderRadius: "10px" }}
            >
              <p className="text-[11px] text-text-muted uppercase tracking-wide">{m.label}</p>
              <p className="text-xl font-bold text-text-primary mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>
                {m.value}
              </p>
              {m.sub && <p className="text-[12px] text-worder-primary font-medium mt-0.5">{m.sub}</p>}
            </motion.div>
          ))}
        </div>
      )}

      {subTab === "best" && (
        <div className="space-y-2">
          {[
            { name: "Flash Sale Março", channel: "Email", revenue: "R$ 45.200", rate: "3,2%" },
            { name: "Carrinho Abandonado WA", channel: "WhatsApp", revenue: "R$ 38.900", rate: "12,4%" },
            { name: "Newsletter #12", channel: "Email", revenue: "R$ 12.300", rate: "1,8%" },
            { name: "Cupom Aniversário", channel: "SMS", revenue: "R$ 9.800", rate: "5,1%" },
            { name: "Reativação 30d", channel: "Email", revenue: "R$ 7.600", rate: "2,3%" },
          ].map((msg, i) => (
            <motion.div
              key={msg.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-4 py-3 bg-background border border-separator hover:bg-[rgba(242,107,42,0.03)] transition-colors"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <p className="text-[13px] font-medium text-text-primary">{msg.name}</p>
                <p className="text-[11px] text-text-muted">{msg.channel}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-bold text-text-primary">{msg.revenue}</p>
                <p className="text-[11px] text-success font-medium">{msg.rate} conv.</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
