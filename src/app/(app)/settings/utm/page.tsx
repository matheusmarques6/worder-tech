"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, LinkSimple } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsToggle } from "@/components/settings/settings-card";

const campaignValueOptions = [
  { value: "worder", label: "worder" },
  { value: "klaviyo", label: "klaviyo" },
  { value: "brand_name", label: "{{nome_da_marca}}" },
  { value: "custom", label: "Personalizado" },
];

const mediumOptions = [
  { value: "email", label: "email" },
  { value: "whatsapp", label: "whatsapp" },
  { value: "sms", label: "sms" },
  { value: "chat", label: "chat" },
  { value: "custom", label: "Personalizado" },
];

const campaignNameOptions = [
  { value: "campaign_name", label: "{{nome_campanha}}" },
  { value: "flow_name", label: "{{nome_fluxo}}" },
  { value: "custom", label: "Personalizado" },
];

const idOptions = [
  { value: "campaign_id", label: "{{id_campanha}}" },
  { value: "flow_id", label: "{{id_fluxo}}" },
  { value: "custom", label: "Personalizado" },
];

const termOptions = [
  { value: "none", label: "Nenhum" },
  { value: "segment_name", label: "{{nome_segmento}}" },
  { value: "list_name", label: "{{nome_lista}}" },
  { value: "custom", label: "Personalizado" },
];

interface UTMRow {
  param: string;
  active: boolean;
  campaignValue: string;
  flowValue: string;
  campaignOptions: { value: string; label: string }[];
  flowOptions: { value: string; label: string }[];
}

const initialRows: UTMRow[] = [
  {
    param: "utm_source",
    active: true,
    campaignValue: "worder",
    flowValue: "worder",
    campaignOptions: campaignValueOptions,
    flowOptions: campaignValueOptions,
  },
  {
    param: "utm_medium",
    active: true,
    campaignValue: "email",
    flowValue: "email",
    campaignOptions: mediumOptions,
    flowOptions: mediumOptions,
  },
  {
    param: "utm_campaign",
    active: true,
    campaignValue: "campaign_name",
    flowValue: "flow_name",
    campaignOptions: campaignNameOptions,
    flowOptions: campaignNameOptions,
  },
  {
    param: "utm_id",
    active: true,
    campaignValue: "campaign_id",
    flowValue: "flow_id",
    campaignOptions: idOptions,
    flowOptions: idOptions,
  },
  {
    param: "utm_term",
    active: false,
    campaignValue: "none",
    flowValue: "none",
    campaignOptions: termOptions,
    flowOptions: termOptions,
  },
];

export default function UTMPage() {
  const [rows, setRows] = useState<UTMRow[]>(initialRows);
  const [autoUTM, setAutoUTM] = useState(true);

  const toggleRowActive = (index: number) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, active: !row.active } : row))
    );
  };

  const updateRowValue = (index: number, field: "campaignValue" | "flowValue", value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
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
        title="UTM"
        breadcrumb={["Configurações", "UTM"]}
        description="Configure os parâmetros UTM adicionados automaticamente aos links das suas campanhas e fluxos."
      />

      <SettingsCard
        title="Rastreamento UTM"
        description="Defina os valores de cada parâmetro UTM para campanhas e fluxos de automação."
        showSave={true}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Parâmetro
                </th>
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide text-center w-16">
                  Ativo
                </th>
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Valor (Campanhas)
                </th>
                <th className="px-4 py-3 font-semibold text-text-secondary text-[12px] uppercase tracking-wide">
                  Valor (Fluxos)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.param}
                  className="border-t border-separator hover:bg-muted transition-colors"
                >
                  <td className="px-4 py-3">
                    <code
                      className="text-[12px] font-mono px-2 py-1 bg-muted text-text-primary"
                      style={{ borderRadius: "6px" }}
                    >
                      {row.param}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.active}
                      onChange={() => toggleRowActive(index)}
                      className="w-4 h-4 rounded accent-[#F26B2A]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.campaignValue}
                      onChange={(e) => updateRowValue(index, "campaignValue", e.target.value)}
                      disabled={!row.active}
                      className="px-3 py-1.5 text-[12px] border border-border bg-card outline-none focus:border-[#F26B2A] transition-colors appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ borderRadius: "8px", minWidth: "140px" }}
                    >
                      {row.campaignOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.flowValue}
                      onChange={(e) => updateRowValue(index, "flowValue", e.target.value)}
                      disabled={!row.active}
                      className="px-3 py-1.5 text-[12px] border border-border bg-card outline-none focus:border-[#F26B2A] transition-colors appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ borderRadius: "8px", minWidth: "140px" }}
                    >
                      {row.flowOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-separator pt-4 mt-4 space-y-4">
          <SettingsToggle
            label="Adicionar UTM automaticamente"
            description="Adiciona parâmetros UTM a todos os links em campanhas e fluxos automaticamente."
            enabled={autoUTM}
            onChange={setAutoUTM}
          />

          <button
            className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold border border-border text-text-primary hover:bg-muted transition-colors"
            style={{ borderRadius: "8px" }}
          >
            <Plus size={14} weight="bold" />
            Adicionar parâmetro custom
          </button>
        </div>
      </SettingsCard>
    </motion.div>
  );
}
