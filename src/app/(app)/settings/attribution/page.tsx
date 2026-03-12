"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartBar, FunnelSimple, ShieldCheck } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard } from "@/components/settings/settings-card";

const periodOptions = ["1 dia", "3 dias", "5 dias", "7 dias", "14 dias", "30 dias"];

const channels = [
  { name: "E-mail", icon: "📧", defaultOpen: "5 dias", defaultClick: "5 dias" },
  { name: "WhatsApp", icon: "💬", defaultOpen: "3 dias", defaultClick: "3 dias" },
  { name: "SMS", icon: "📱", defaultOpen: "1 dia", defaultClick: "1 dia" },
];

export default function AttributionPage() {
  const [attributionData, setAttributionData] = useState(
    channels.map((ch) => ({
      name: ch.name,
      icon: ch.icon,
      openValue: ch.defaultOpen,
      clickValue: ch.defaultClick,
    }))
  );

  const [excludeTransactional, setExcludeTransactional] = useState(true);
  const [excludeBots, setExcludeBots] = useState(true);
  const [excludeAppleMPP, setExcludeAppleMPP] = useState(false);

  const updateAttribution = (index: number, field: "openValue" | "clickValue", value: string) => {
    setAttributionData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Atribuição"
        breadcrumb={["Configurações", "Atribuição"]}
        description="Defina como a Worder atribui receita aos seus canais de comunicação."
      />

      {/* Períodos de atribuição */}
      <SettingsCard
        title="Períodos de atribuição"
        description="Configure a janela de atribuição para cada canal. Uma conversão será atribuída ao canal se ocorrer dentro do período configurado."
        showSave={true}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Canal
                </th>
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Aberto / Entregue
                </th>
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Clicado
                </th>
              </tr>
            </thead>
            <tbody>
              {attributionData.map((channel, index) => (
                <tr
                  key={channel.name}
                  className="border-t border-separator hover:bg-muted transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-text-primary">
                    <span className="mr-2">{channel.icon}</span>
                    {channel.name}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={channel.openValue}
                      onChange={(e) => updateAttribution(index, "openValue", e.target.value)}
                      className="px-3 py-1.5 text-[12px] border border-border bg-card outline-none focus:border-[#F26B2A] transition-colors appearance-none cursor-pointer"
                      style={{ borderRadius: "8px", minWidth: "110px" }}
                    >
                      {periodOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={channel.clickValue}
                      onChange={(e) => updateAttribution(index, "clickValue", e.target.value)}
                      className="px-3 py-1.5 text-[12px] border border-border bg-card outline-none focus:border-[#F26B2A] transition-colors appearance-none cursor-pointer"
                      style={{ borderRadius: "8px", minWidth: "110px" }}
                    >
                      {periodOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            className="px-4 py-2 text-[12px] font-semibold border border-border text-text-primary hover:bg-muted transition-colors"
            style={{ borderRadius: "8px" }}
          >
            <span className="flex items-center gap-2">
              <ChartBar size={14} weight="fill" />
              Comparar modelo
            </span>
          </button>
        </div>
      </SettingsCard>

      {/* Dados de rastreamento */}
      <SettingsCard
        title="Dados de rastreamento"
        description="Exclua determinados tipos de interação do cálculo de atribuição para maior precisão."
      >
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeTransactional}
              onChange={(e) => setExcludeTransactional(e.target.checked)}
              className="w-4 h-4 rounded accent-[#F26B2A] mt-0.5"
            />
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                Excluir transacionais da atribuição
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                E-mails transacionais (confirmação de pedido, envio, etc.) não serão contabilizados como ponto de contato para atribuição de receita.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeBots}
              onChange={(e) => setExcludeBots(e.target.checked)}
              className="w-4 h-4 rounded accent-[#F26B2A] mt-0.5"
            />
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                Excluir interações de bots
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Aberturas e cliques gerados por bots de segurança (como antivírus e firewalls corporativos) serão filtrados automaticamente.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeAppleMPP}
              onChange={(e) => setExcludeAppleMPP(e.target.checked)}
              className="w-4 h-4 rounded accent-[#F26B2A] mt-0.5"
            />
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                Excluir aberturas Apple MPP
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                O Mail Privacy Protection da Apple pré-carrega imagens de rastreamento. Ative para excluir essas aberturas infladas das métricas de atribuição.
              </p>
            </div>
          </label>
        </div>
      </SettingsCard>
    </motion.div>
  );
}
