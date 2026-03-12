"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatCircleDots, Copy, Check } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField, SettingsSelect, SettingsToggle } from "@/components/settings/settings-card";

const SNIPPET_CODE = `<script src="https://cdn.worder.com.br/widget.js" data-id="wdr-abc123"></script>`;

export default function Page() {
  const [corPrimaria, setCorPrimaria] = useState("#F26B2A");
  const [iaChat, setIaChat] = useState(true);
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    await navigator.clipboard.writeText(SNIPPET_CODE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader title="Chat Web" breadcrumb={["Configurações", "Chat Web"]} />

      {/* Widget */}
      <SettingsCard title="Widget" description="Personalize a aparência do chat widget no seu site.">
        {/* Preview */}
        <div>
          <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Pré-visualização</label>
          <div className="mt-1.5 flex justify-end p-6 bg-bg-subtle border border-border-subtle" style={{ borderRadius: "10px" }}>
            <div className="flex flex-col items-end gap-3">
              {/* Chat window mockup */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-[260px] bg-background-card border border-border shadow-lg overflow-hidden"
                style={{ borderRadius: "16px" }}
              >
                {/* Header */}
                <div
                  className="px-4 py-3 flex items-center gap-2 text-white"
                  style={{ background: corPrimaria }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ChatCircleDots size={16} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold leading-tight">Worder Chat</p>
                    <p className="text-[10px] opacity-80">Online agora</p>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-3 space-y-2">
                  <div
                    className="text-[11px] text-text-primary px-3 py-2 bg-bg-hover max-w-[85%]"
                    style={{ borderRadius: "12px 12px 12px 4px" }}
                  >
                    Olá! Como posso ajudar?
                  </div>
                </div>
                {/* Input */}
                <div className="px-3 pb-3">
                  <div
                    className="w-full h-8 bg-bg-subtle border border-border flex items-center px-3"
                    style={{ borderRadius: "10px" }}
                  >
                    <span className="text-[10px] text-text-muted">Digite sua mensagem...</span>
                  </div>
                </div>
              </motion.div>

              {/* Bubble */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
                className="w-12 h-12 flex items-center justify-center text-white shadow-lg cursor-pointer"
                style={{
                  borderRadius: "50%",
                  background: corPrimaria,
                  boxShadow: `0 4px 14px ${corPrimaria}44`,
                }}
              >
                <ChatCircleDots size={24} weight="fill" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Cor primária */}
        <div>
          <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Cor primária</label>
          <div className="flex items-center gap-3 mt-1.5">
            <input
              type="color"
              value={corPrimaria}
              onChange={(e) => setCorPrimaria(e.target.value)}
              className="w-10 h-10 border border-border cursor-pointer p-0.5 bg-background-card"
              style={{ borderRadius: "10px" }}
            />
            <input
              type="text"
              value={corPrimaria}
              onChange={(e) => setCorPrimaria(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors font-mono"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>

        <SettingsSelect
          label="Posição"
          value="bottom-right"
          options={[
            { value: "bottom-right", label: "Inferior direito" },
            { value: "bottom-left", label: "Inferior esquerdo" },
          ]}
        />

        <SettingsField label="Mensagem de boas-vindas" value="Olá! Como posso ajudar?" placeholder="Mensagem exibida ao abrir o chat" />
        <SettingsField label="Título" value="Worder Chat" placeholder="Título exibido no header do widget" />
        <SettingsField label="Avatar do agente" placeholder="URL da imagem do avatar (ex: https://...)" />
      </SettingsCard>

      {/* Worder IA no Chat */}
      <SettingsCard title="Worder IA no Chat" description="Configure o agente de IA para o chat web do seu site.">
        <SettingsToggle
          label="Ativar Worder IA no Chat"
          description="Habilita o agente de IA para responder automaticamente no chat web."
          enabled={iaChat}
          onChange={setIaChat}
        />

        {iaChat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Persona</label>
              <textarea
                placeholder="Defina o tom de voz, regras de atendimento, limites e comportamento do agente..."
                rows={4}
                className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors resize-none"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </motion.div>
        )}
      </SettingsCard>

      {/* Instalação */}
      <SettingsCard title="Instalação" description="Copie o código abaixo e cole antes do fechamento da tag </body> no seu site." showSave={false}>
        <div>
          <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Código de instalação</label>
          <div className="relative mt-1.5">
            <textarea
              readOnly
              value={SNIPPET_CODE}
              rows={2}
              className="w-full px-4 py-3 text-[13px] border border-border bg-bg-table-header text-gray-300 outline-none resize-none"
              style={{ borderRadius: "10px", fontFamily: "JetBrains Mono, monospace" }}
            />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleCopiar}
            className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            <Copy size={16} weight="fill" />
            Copiar
          </button>

          <AnimatePresence>
            {copiado && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 top-full mt-2 flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-success bg-success/10"
                style={{ borderRadius: "8px" }}
              >
                <Check size={14} weight="fill" />
                Copiado!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SettingsCard>
    </motion.div>
  );
}
