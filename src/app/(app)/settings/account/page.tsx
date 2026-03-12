"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField, SettingsSelect } from "@/components/settings/settings-card";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader title="Conta" breadcrumb={["Configurações", "Conta"]} />

      <SettingsCard title="Pessoal" description="Suas informações pessoais de acesso.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsField label="Nome" value="Matheus" placeholder="Seu nome" />
          <SettingsField label="Sobrenome" value="Marques" placeholder="Seu sobrenome" />
        </div>
        <SettingsField label="E-mail de login" value="matheus@worder.com.br" type="email" />
      </SettingsCard>

      <SettingsCard title="Idioma e formato" description="Configurações regionais da conta.">
        <SettingsSelect
          label="Idioma"
          value="pt-BR"
          options={[
            { value: "pt-BR", label: "Português (Brasil)" },
            { value: "en-US", label: "English (US)" },
            { value: "es", label: "Español" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted border border-separator" style={{ borderRadius: "10px" }}>
            <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Formato de data</p>
            <p className="text-[13px] font-medium text-text-primary">12/03/2026</p>
          </div>
          <div className="p-3 bg-muted border border-separator" style={{ borderRadius: "10px" }}>
            <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Formato de moeda</p>
            <p className="text-[13px] font-medium text-text-primary">R$ 1.234,56</p>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Informações da empresa" description="Dados da sua empresa.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsField label="Nome da empresa" value="Worder Tech Ltda" />
          <SettingsField label="CNPJ" value="12.345.678/0001-00" />
        </div>
        <SettingsField label="Endereço" value="Rua da Inovação, 123" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SettingsField label="Cidade" value="São Paulo" />
          <SettingsSelect
            label="Estado"
            value="SP"
            options={[
              { value: "SP", label: "São Paulo" },
              { value: "RJ", label: "Rio de Janeiro" },
              { value: "MG", label: "Minas Gerais" },
              { value: "PR", label: "Paraná" },
              { value: "SC", label: "Santa Catarina" },
              { value: "RS", label: "Rio Grande do Sul" },
            ]}
          />
          <SettingsField label="Telefone" value="(11) 99999-9999" type="tel" />
        </div>
        <SettingsField label="URL do site" value="https://worder.com.br" type="url" />
      </SettingsCard>
    </motion.div>
  );
}
