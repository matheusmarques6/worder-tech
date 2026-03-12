"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PaperPlaneTilt,
  Globe,
  Buildings,
  ChatText,
  Plus,
  ShieldCheck,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

type SubNav = "remetente" | "dominios" | "organizacao" | "mensagens";

const subNavItems: { key: SubNav; label: string; icon: typeof PaperPlaneTilt }[] = [
  { key: "remetente", label: "Remetente", icon: PaperPlaneTilt },
  { key: "dominios", label: "Domínios", icon: Globe },
  { key: "organizacao", label: "Organização", icon: Buildings },
  { key: "mensagens", label: "Mensagens", icon: ChatText },
];

const mockDomains = [
  { domain: "worder.com.br", status: "Ativo" as const },
  { domain: "mail.worder.com.br", status: "Pendente" as const },
];

export default function Page() {
  const [activeSubNav, setActiveSubNav] = useState<SubNav>("remetente");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="E-mail"
        breadcrumb={["Configurações", "E-mail"]}
      />

      <div className="flex gap-6">
        {/* Sub-navigation sidebar */}
        <div className="w-[180px] flex-shrink-0">
          <nav className="space-y-1">
            {subNavItems.map((item) => {
              const isActive = activeSubNav === item.key;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSubNav(item.key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-[13px] font-medium transition-all rounded-r-lg"
                  style={{
                    borderLeft: isActive
                      ? "3px solid #F26B2A"
                      : "3px solid transparent",
                    backgroundColor: isActive ? "rgba(242, 107, 42, 0.08)" : "transparent",
                    color: isActive ? "#F26B2A" : "var(--text-secondary)",
                  }}
                >
                  <Icon
                    size={18}
                    weight="fill"
                    style={{ color: isActive ? "#F26B2A" : "var(--text-muted)" }}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeSubNav === "remetente" && (
              <motion.div
                key="remetente"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <SettingsCard
                  title="Configurações de remetente"
                  description="Defina o nome e endereço de e-mail padrão para suas campanhas."
                >
                  <SettingsField
                    label="Nome padrão"
                    value="Worder"
                    placeholder="Nome exibido para os destinatários"
                  />
                  <SettingsField
                    label="E-mail padrão"
                    value="contato@worder.com.br"
                    placeholder="email@seudominio.com.br"
                    type="email"
                  />

                  <div className="pt-2">
                    <button
                      className="px-5 py-2 text-[13px] font-semibold text-white hover:brightness-110 transition-all"
                      style={{
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                        boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
                      }}
                    >
                      Aplicar a todas as campanhas
                    </button>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeSubNav === "dominios" && (
              <motion.div
                key="dominios"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Domains table */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background-card border border-border overflow-hidden"
                  style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
                >
                  <div className="p-6 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-[15px] font-bold text-text-primary font-heading">
                        Domínios configurados
                      </h3>
                      <p className="text-[12px] text-text-muted mt-0.5">
                        Gerencie os domínios de envio vinculados à sua conta.
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white hover:brightness-110 transition-all"
                      style={{
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                        boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
                      }}
                    >
                      <Plus size={15} weight="fill" />
                      Adicionar domínio
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-bg-table-header text-white">
                          <th className="text-left text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                            Domínio
                          </th>
                          <th className="text-left text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockDomains.map((row, i) => (
                          <motion.tr
                            key={row.domain}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                            className="border-b border-border-subtle hover:bg-bg-hover transition-colors"
                          >
                            <td className="px-6 py-3.5 text-[13px] font-medium text-text-primary">
                              {row.domain}
                            </td>
                            <td className="px-6 py-3.5">
                              <Badge
                                variant={row.status === "Ativo" ? "success" : "warning"}
                                size="sm"
                              >
                                {row.status}
                              </Badge>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* SPF/DKIM/DMARC explanation card */}
                <SettingsCard
                  title="Autenticação de e-mail"
                  description="Configure os registros DNS para melhorar a entregabilidade."
                  showSave={false}
                >
                  <div className="space-y-4">
                    {[
                      {
                        name: "SPF",
                        desc: "Autoriza quais servidores podem enviar e-mails pelo seu domínio.",
                      },
                      {
                        name: "DKIM",
                        desc: "Adiciona uma assinatura digital que valida a autenticidade do e-mail.",
                      },
                      {
                        name: "DMARC",
                        desc: "Define a política de tratamento para e-mails que falham nas verificações SPF/DKIM.",
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-3 p-3 bg-bg-subtle rounded-[10px]"
                      >
                        <ShieldCheck
                          size={20}
                          weight="fill"
                          className="text-worder-primary mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-[13px] font-semibold text-text-primary">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-text-muted mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeSubNav === "organizacao" && (
              <motion.div
                key="organizacao"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <SettingsCard
                  title="Dados da organização"
                  description="Informações exibidas no rodapé dos e-mails para conformidade com legislação anti-spam."
                >
                  <SettingsField
                    label="Nome da empresa"
                    value="Worder Tecnologia LTDA"
                    placeholder="Razão social"
                  />
                  <SettingsField
                    label="Endereço"
                    value="Av. Paulista, 1000 - São Paulo, SP"
                    placeholder="Endereço completo"
                  />
                  <SettingsField
                    label="Cidade / Estado"
                    value="São Paulo, SP"
                    placeholder="Cidade, UF"
                  />
                  <SettingsField
                    label="CEP"
                    value="01310-100"
                    placeholder="00000-000"
                  />
                </SettingsCard>
              </motion.div>
            )}

            {activeSubNav === "mensagens" && (
              <motion.div
                key="mensagens"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <SettingsCard
                  title="Mensagens padrão"
                  description="Textos utilizados automaticamente em e-mails transacionais e de confirmação."
                >
                  <SettingsField
                    label="Assunto de confirmação de inscrição"
                    value="Confirme sua inscrição"
                    placeholder="Assunto do e-mail"
                  />
                  <SettingsField
                    label="Texto do link de descadastro"
                    value="Não deseja mais receber nossos e-mails? Clique aqui para se descadastrar."
                    placeholder="Texto de descadastro"
                  />
                </SettingsCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
