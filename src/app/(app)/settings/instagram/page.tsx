"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InstagramLogo, ArrowClockwise, CheckSquare, Square } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField, SettingsToggle } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [respostasAuto, setRespostasAuto] = useState(false);
  const [permissoes, setPermissoes] = useState({
    dms: true,
    comentarios: true,
    stories: true,
  });

  const togglePermissao = (key: keyof typeof permissoes) => {
    setPermissoes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader title="Instagram" breadcrumb={["Configurações", "Instagram"]} />

      {/* Conexão */}
      <SettingsCard title="Conexão" description="Status da conexão com sua conta Instagram Business." showSave={false}>
        <div className="flex items-center justify-between p-4 bg-muted border border-separator" style={{ borderRadius: "10px" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)",
              }}
            >
              <InstagramLogo size={22} weight="fill" />
            </div>
            <div>
              <span className="text-[14px] font-semibold text-text-primary">@nomeloja</span>
              <div className="mt-0.5">
                <Badge variant="success" size="sm">Conectado</Badge>
              </div>
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

      {/* Permissões */}
      <SettingsCard title="Permissões" description="Defina quais interações a Worder pode gerenciar no Instagram.">
        {(
          [
            { key: "dms" as const, label: "Responder DMs" },
            { key: "comentarios" as const, label: "Responder comentários" },
            { key: "stories" as const, label: "Responder menções em stories" },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            onClick={() => togglePermissao(item.key)}
            className="flex items-center gap-3 w-full py-2 text-left group"
          >
            {permissoes[item.key] ? (
              <CheckSquare size={22} weight="fill" className="text-worder-primary flex-shrink-0" />
            ) : (
              <Square size={22} weight="fill" className="text-text-muted group-hover:text-text-secondary flex-shrink-0 transition-colors" />
            )}
            <span className="text-[13px] font-medium text-text-primary">{item.label}</span>
          </button>
        ))}
      </SettingsCard>

      {/* Automação */}
      <SettingsCard title="Automação" description="Configure respostas automáticas para o Instagram.">
        <SettingsToggle
          label="Respostas automáticas"
          description="Responde automaticamente às mensagens recebidas no Instagram."
          enabled={respostasAuto}
          onChange={setRespostasAuto}
        />

        {respostasAuto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">
                Mensagem de boas-vindas
              </label>
              <textarea
                placeholder="Olá! Bem-vindo à nossa loja..."
                rows={3}
                className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-card outline-none focus:border-worder-primary transition-colors resize-none"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </motion.div>
        )}
      </SettingsCard>
    </motion.div>
  );
}
