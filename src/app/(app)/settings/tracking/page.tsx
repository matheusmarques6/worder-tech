"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plugs, Cookie, Fingerprint, ShoppingCart, Eye as EyeIcon } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsToggle } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

export default function TrackingPage() {
  const [anonTracking, setAnonTracking] = useState(true);
  const [extendedId, setExtendedId] = useState(false);
  const [trackProducts, setTrackProducts] = useState(true);
  const [trackBehavior, setTrackBehavior] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Tracking"
        breadcrumb={["Configurações", "Tracking"]}
        description="Configure o rastreamento de visitantes e eventos na sua loja."
      />

      {/* Rastreamento anônimo */}
      <SettingsCard
        title="Rastreamento anônimo"
        description="Rastreie visitantes anônimos antes de se identificarem."
      >
        <div className="flex items-center gap-3">
          <SettingsToggle
            label="Ativar rastreamento anônimo"
            description="Coleta dados de navegação de visitantes não identificados para enriquecer perfis após a identificação."
            enabled={anonTracking}
            onChange={setAnonTracking}
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={anonTracking ? "success" : "default"} size="sm">
            {anonTracking ? "Habilitado" : "Desabilitado"}
          </Badge>
          <span className="text-[11px] text-text-muted">
            Visitantes anônimos são rastreados via cookie first-party com duração de 365 dias.
          </span>
        </div>
      </SettingsCard>

      {/* Rastreamento Shopify */}
      <SettingsCard
        title="Rastreamento Shopify"
        description="Configure a sincronização de dados com sua loja Shopify."
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)" }}
            >
              <Plugs size={20} weight="fill" className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-text-primary">Shopify</p>
              <p className="text-[11px] text-text-muted">minha-loja.myshopify.com</p>
            </div>
            <Badge variant="success" size="sm">Conectado</Badge>
          </div>
          <button
            className="px-4 py-2 text-[12px] font-semibold border border-border text-text-primary hover:bg-bg-hover transition-colors"
            style={{ borderRadius: "8px" }}
          >
            Gerenciar
          </button>
        </div>

        <div className="border-t border-border-subtle pt-4 mt-4 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={trackProducts}
              onChange={(e) => setTrackProducts(e.target.checked)}
              className="w-4 h-4 rounded accent-[#F26B2A]"
            />
            <div>
              <p className="text-[13px] font-medium text-text-primary">Rastrear produtos visualizados</p>
              <p className="text-[11px] text-text-muted">Captura eventos de visualização de produto para segmentação e recomendações.</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={trackBehavior}
              onChange={(e) => setTrackBehavior(e.target.checked)}
              className="w-4 h-4 rounded accent-[#F26B2A]"
            />
            <div>
              <p className="text-[13px] font-medium text-text-primary">Rastrear eventos comportamentais</p>
              <p className="text-[11px] text-text-muted">Coleta cliques, scroll e tempo de permanência para análise comportamental.</p>
            </div>
          </label>
        </div>
      </SettingsCard>

      {/* ID estendida */}
      <SettingsCard
        title="ID estendida"
        description="Amplie a janela de identificação de visitantes recorrentes."
      >
        <SettingsToggle
          label="Ativar identificação estendida"
          description="Utiliza cookies estendidos e fingerprinting probabilístico para reconhecer visitantes recorrentes por até 2 anos, mesmo após limpeza de cookies padrão."
          enabled={extendedId}
          onChange={setExtendedId}
        />
        <p className="text-[11px] text-text-muted mt-2 pl-1">
          A ID estendida combina sinais do navegador (resolução, idioma, timezone) para criar um identificador probabilístico.
          Isso aumenta a taxa de reconhecimento de visitantes em até 40%. Compatível com LGPD quando o consentimento é coletado.
        </p>
      </SettingsCard>
    </motion.div>
  );
}
