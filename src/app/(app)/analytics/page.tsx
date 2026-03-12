"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarBlank,
  TrendUp,
  EnvelopeSimple,
  WhatsappLogo,
  ChatCircleDots,
  DeviceMobile,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { OverviewChart } from "@/components/analytics/overview-chart";
import { CampaignPerformance } from "@/components/analytics/campaign-performance";
import { overviewData, channelMetrics } from "@/lib/mock-data/analytics";

type Tab = "summary" | "channels" | "message_type";
type Period = "30d" | "60d" | "90d" | "custom";

const tabs: { id: Tab; label: string }[] = [
  { id: "summary", label: "Resumo da conversão" },
  { id: "channels", label: "Detalhamento por canal" },
  { id: "message_type", label: "Tipo de mensagem" },
];

const channelIcons: Record<string, React.ReactNode> = {
  "E-mail": <EnvelopeSimple size={20} weight="fill" />,
  "WhatsApp": <WhatsappLogo size={20} weight="fill" />,
  "SMS": <DeviceMobile size={20} weight="fill" />,
  "Chat Web": <ChatCircleDots size={20} weight="fill" />,
};

function formatBigNumber(n: number): string {
  if (n >= 1_000_000_000) return `R$ ${(n / 1_000_000_000).toFixed(0).replace(".", ",")} bi`;
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(1).replace(".", ",")}mi`;
  return `R$ ${n.toLocaleString("pt-BR")}`;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Analytics"
        breadcrumb={["Analytics", "Painel"]}
        actions={
          <div className="flex items-center gap-2">
            <CalendarBlank size={16} className="text-text-muted" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="px-3 py-2 text-[13px] border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
              style={{ borderRadius: "10px" }}
            >
              <option value="30d">Últimos 30 dias</option>
              <option value="60d">Últimos 60 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
        }
      />

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden p-6"
        style={{
          borderRadius: "var(--radius-card)",
          background: "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 60%, #F26B2A 100%)",
        }}
      >
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="text-[12px] text-white/60 uppercase tracking-widest font-medium mb-2">Receita Total</p>
            <p className="text-[40px] font-bold text-white font-heading leading-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatBigNumber(overviewData.totalRevenue)}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <TrendUp size={16} weight="bold" className="text-success" />
              <span className="text-sm font-semibold text-success">+{overviewData.totalRevenueChange}%</span>
              <span className="text-[12px] text-white/50">vs período anterior</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-white/60 uppercase tracking-widest font-medium mb-2">Receita Atribuída</p>
            <p className="text-[28px] font-bold text-white font-heading" style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatBigNumber(overviewData.attributedRevenue)}
              <span className="text-[16px] text-white/50 ml-2">({overviewData.attributedRevenuePercent}%)</span>
            </p>
            <div className="flex items-center justify-end gap-1.5 mt-2">
              <TrendUp size={16} weight="bold" className="text-success" />
              <span className="text-sm font-semibold text-success">+{overviewData.attributedRevenueChange}%</span>
            </div>
          </div>
        </div>
        <div
          className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #F5A623, transparent)" }}
        />
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{ color: activeTab === tab.id ? "#F26B2A" : "var(--text-muted)" }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="analytics-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "summary" && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <OverviewChart />
            <CampaignPerformance />
          </motion.div>
        )}

        {activeTab === "channels" && (
          <motion.div
            key="channels"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {channelMetrics.map((ch, i) => (
                <motion.div
                  key={ch.channel}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="bg-background-card border border-border p-5"
                  style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-white"
                      style={{ background: ch.color }}
                    >
                      {channelIcons[ch.channel]}
                    </div>
                    <h4 className="text-[14px] font-semibold text-text-primary">{ch.channel}</h4>
                  </div>
                  <div className="space-y-2.5">
                    {ch.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <span className="text-[12px] text-text-muted">{m.label}</span>
                        <span className="text-[12px] font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "message_type" && (
          <motion.div
            key="message_type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "Campanhas", sent: "189.430", conv: "R$ 4.120.000", rate: "2,18%" },
                { type: "Automações (Flows)", sent: "156.220", conv: "R$ 3.120.000", rate: "2,00%" },
                { type: "Transacionais", sent: "22.220", conv: "R$ 341.615", rate: "1,54%" },
              ].map((item, i) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="bg-background-card border border-border p-5"
                  style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
                >
                  <h4 className="text-[14px] font-semibold text-text-primary mb-4">{item.type}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Enviados</p>
                      <p className="text-lg font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>{item.sent}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Receita convertida</p>
                      <p className="text-lg font-bold text-worder-primary" style={{ fontVariantNumeric: "tabular-nums" }}>{item.conv}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Taxa conversão</p>
                      <p className="text-lg font-bold text-success" style={{ fontVariantNumeric: "tabular-nums" }}>{item.rate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
