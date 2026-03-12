"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  WhatsappLogo,
  DeviceMobile,
  Warning,
  ArrowRight,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { DeliverabilityGauge } from "@/components/analytics/deliverability-gauge";
import { DeliverabilityMetricsTable, ActionCenter } from "@/components/analytics/deliverability-metrics";

type Channel = "email" | "whatsapp" | "sms";
type SubNav = "score" | "reports" | "bounces";

const channelTabs: { id: Channel; label: string; icon: React.ReactNode }[] = [
  { id: "email", label: "E-mail", icon: <EnvelopeSimple size={15} weight="fill" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo size={15} weight="fill" /> },
  { id: "sms", label: "SMS", icon: <DeviceMobile size={15} weight="fill" /> },
];

const subNavItems: { id: SubNav; label: string }[] = [
  { id: "score", label: "Pontuação" },
  { id: "reports", label: "Relatórios" },
  { id: "bounces", label: "Detalhes de rejeição" },
];

export default function Page() {
  const [channel, setChannel] = useState<Channel>("email");
  const [subNav, setSubNav] = useState<SubNav>("score");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Entregabilidade"
        breadcrumb={["Analytics", "Entregabilidade"]}
      />

      {/* Channel tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {channelTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setChannel(tab.id)}
            className="relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{ color: channel === tab.id ? "#F26B2A" : "var(--text-muted)" }}
          >
            {tab.icon}
            {tab.label}
            {channel === tab.id && (
              <motion.div
                layoutId="deliv-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
              />
            )}
          </button>
        ))}
      </div>

      {channel === "email" && (
        <div className="flex gap-6">
          {/* Sub-nav */}
          <div className="w-48 flex-shrink-0 space-y-1">
            {subNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSubNav(item.id)}
                className="w-full text-left px-3 py-2 text-[13px] font-medium transition-all"
                style={{
                  borderRadius: "8px",
                  background: subNav === item.id ? "rgba(242,107,42,0.08)" : "transparent",
                  color: subNav === item.id ? "#F26B2A" : "var(--text-muted)",
                  borderLeft: subNav === item.id ? "3px solid #F26B2A" : "3px solid transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {subNav === "score" && (
              <>
                {/* Alert card */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20"
                  style={{ borderRadius: "10px" }}
                >
                  <Warning size={20} weight="fill" className="text-warning mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-text-primary">Baixa taxa de abertura</p>
                    <p className="text-[12px] text-text-muted mt-0.5">
                      Sua taxa de abertura está abaixo do recomendado. Revise os assuntos dos e-mails e o horário de envio.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-[12px] font-medium text-worder-primary hover:underline flex items-center gap-1">
                        Guia de resolução <ArrowRight size={12} />
                      </button>
                      <button className="text-[12px] font-medium text-text-muted hover:text-text-primary flex items-center gap-1">
                        Ver relatórios <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Gauge + Action center */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <DeliverabilityGauge />
                  </div>
                  <div className="lg:col-span-2">
                    <ActionCenter />
                  </div>
                </div>

                {/* Metrics table */}
                <DeliverabilityMetricsTable />
              </>
            )}

            {subNav === "reports" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-card border border-border p-8 text-center"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <EnvelopeSimple size={48} weight="duotone" className="text-text-muted mx-auto mb-3" />
                <h3 className="text-lg font-bold text-text-primary font-heading mb-1">Relatórios de entregabilidade</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto">
                  Acompanhe métricas detalhadas de entrega, bounces e reclamações ao longo do tempo.
                </p>
              </motion.div>
            )}

            {subNav === "bounces" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-card border border-border overflow-hidden"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-table-header text-white">
                      <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Tipo</th>
                      <th className="py-3.5 px-5 text-right text-[11px] uppercase tracking-widest font-semibold">Contagem</th>
                      <th className="py-3.5 px-5 text-right text-[11px] uppercase tracking-widest font-semibold">Taxa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {[
                      { type: "Hard bounce", count: 342, rate: "0,14%" },
                      { type: "Soft bounce", count: 1653, rate: "0,67%" },
                      { type: "Mailbox cheio", count: 890, rate: "0,36%" },
                      { type: "Timeout", count: 234, rate: "0,10%" },
                    ].map((row, i) => (
                      <motion.tr
                        key={row.type}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-[rgba(242,107,42,0.03)] transition-colors"
                      >
                        <td className="py-3.5 px-5 font-medium text-text-primary">{row.type}</td>
                        <td className="py-3.5 px-5 text-right font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {row.count.toLocaleString("pt-BR")}
                        </td>
                        <td className="py-3.5 px-5 text-right text-text-muted">{row.rate}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {channel !== "email" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-card border border-border p-8 text-center"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          {channel === "whatsapp" ? (
            <WhatsappLogo size={48} weight="duotone" className="text-text-muted mx-auto mb-3" />
          ) : (
            <DeviceMobile size={48} weight="duotone" className="text-text-muted mx-auto mb-3" />
          )}
          <h3 className="text-lg font-bold text-text-primary font-heading mb-1">
            Entregabilidade {channel === "whatsapp" ? "WhatsApp" : "SMS"}
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Métricas de entrega para {channel === "whatsapp" ? "WhatsApp" : "SMS"} estarão disponíveis em breve.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
