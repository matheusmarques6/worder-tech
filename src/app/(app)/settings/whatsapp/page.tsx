"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WhatsappLogo, ArrowClockwise, Robot, Phone } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField, SettingsSelect, SettingsToggle } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [iaEnabled, setIaEnabled] = useState(true);
  const [escalarHumano, setEscalarHumano] = useState(true);
  const [desconto, setDesconto] = useState(10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader title="WhatsApp" breadcrumb={["Configurações", "WhatsApp"]} />

      {/* Conexão */}
      <SettingsCard title="Conexão" description="Status da conexão com o WhatsApp Business API." showSave={false}>
        <div className="flex items-center justify-between p-4 bg-muted border border-separator" style={{ borderRadius: "10px" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              }}
            >
              <WhatsappLogo size={22} weight="fill" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Phone size={14} weight="fill" className="text-text-muted" />
                <span className="text-[14px] font-semibold text-text-primary">+55 11 99999-9999</span>
              </div>
              <Badge variant="success" size="sm" className="mt-1">Conectado</Badge>
            </div>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-text-primary border border-border bg-card hover:bg-muted transition-colors"
            style={{ borderRadius: "10px" }}
          >
            <ArrowClockwise size={15} weight="fill" />
            Reconectar
          </button>
        </div>
      </SettingsCard>

      {/* Perfil do WhatsApp Business */}
      <SettingsCard title="Perfil do WhatsApp Business" description="Informações exibidas no perfil comercial.">
        <SettingsField label="Nome comercial" value="Worder" />
        <div>
          <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Descrição</label>
          <textarea
            placeholder="Descreva sua empresa em poucas palavras..."
            rows={3}
            className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-card outline-none focus:border-worder-primary transition-colors resize-none"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <SettingsSelect
          label="Categoria"
          value="loja-online"
          options={[
            { value: "loja-online", label: "Loja Online" },
            { value: "tecnologia", label: "Tecnologia" },
            { value: "servicos", label: "Serviços" },
          ]}
        />
      </SettingsCard>

      {/* Worder IA */}
      <SettingsCard title="Worder IA" description="Configure o agente de inteligência artificial para atendimento via WhatsApp.">
        <SettingsToggle
          label="Ativar Worder IA"
          description="Habilita o agente de IA para responder automaticamente no WhatsApp."
          enabled={iaEnabled}
          onChange={setIaEnabled}
        />

        {iaEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <SettingsField label="Nome do agente" value="Worder IA" />

            <div>
              <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Persona</label>
              <textarea
                placeholder="Defina o tom de voz, regras de atendimento, limites e comportamento do agente..."
                rows={4}
                className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-card outline-none focus:border-worder-primary transition-colors resize-none"
                style={{ borderRadius: "10px" }}
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">
                Limite de desconto
              </label>
              <div className="flex items-center gap-4 mt-1.5">
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={desconto}
                  onChange={(e) => setDesconto(Number(e.target.value))}
                  className="flex-1 accent-worder-primary h-2 cursor-pointer"
                  style={{ borderRadius: "10px" }}
                />
                <span
                  className="min-w-[48px] text-center px-3 py-1.5 text-[13px] font-bold text-worder-primary bg-worder-primary/10"
                  style={{ borderRadius: "10px" }}
                >
                  {desconto}%
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-1">
                Desconto máximo que a IA pode oferecer automaticamente (0% a 30%).
              </p>
            </div>

            <SettingsToggle
              label="Escalar para humano"
              description="Quando a IA não conseguir resolver, transfere automaticamente para um atendente humano."
              enabled={escalarHumano}
              onChange={setEscalarHumano}
            />
          </motion.div>
        )}
      </SettingsCard>
    </motion.div>
  );
}
