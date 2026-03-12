"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  CurrencyDollar,
  Crown,
  FilePdf,
  EnvelopeSimple,
  ChatCircleDots,
  Users,
  CalendarBlank,
  Warning,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

const usageData = [
  {
    label: "Perfis",
    used: 27452,
    total: 28000,
    icon: Users,
  },
  {
    label: "E-mails",
    used: 0,
    total: 280000,
    icon: EnvelopeSimple,
  },
  {
    label: "Mensagens WhatsApp",
    used: 1230,
    total: 5000,
    icon: ChatCircleDots,
  },
];

const paymentHistory = [
  { date: "15/03/2026", valor: "R$ 497,00", status: "Pago" },
  { date: "15/02/2026", valor: "R$ 497,00", status: "Pago" },
  { date: "15/01/2026", valor: "R$ 497,00", status: "Pago" },
  { date: "15/12/2025", valor: "R$ 497,00", status: "Pago" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

export default function Page() {
  const [, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Cobrança"
        breadcrumb={["Configurações", "Cobrança"]}
      />

      {/* Plano atual */}
      <SettingsCard title="Plano atual" showSave={false}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              }}
            >
              <Crown size={24} weight="fill" className="text-white" />
            </div>
            <div>
              <h4 className="text-[22px] font-bold text-text-primary font-heading">
                Growth
              </h4>
              <p className="text-[24px] font-bold text-worder-primary mt-0.5">
                R$ 497<span className="text-[14px] font-normal text-text-muted">/mês</span>
              </p>
              <div className="flex items-center gap-4 mt-2 text-[13px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CalendarBlank size={14} weight="fill" />
                  Ciclo mensal
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarBlank size={14} weight="fill" />
                  Próxima renovação: 15/04/2026
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="px-4 py-2 text-[13px] font-semibold text-error border border-error/30 hover:bg-error/5 transition-colors"
              style={{ borderRadius: "10px" }}
            >
              Cancelar plano
            </button>
            <button
              className="px-5 py-2 text-[13px] font-semibold text-white hover:brightness-110 transition-all"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
              }}
            >
              Alterar plano
            </button>
          </div>
        </div>
      </SettingsCard>

      {/* Método de pagamento */}
      <SettingsCard title="Método de pagamento" showSave={false}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#F0F0F0]"
            >
              <CreditCard size={22} weight="fill" className="text-text-secondary" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-text-primary">
                Cartão de crédito terminando em <span className="font-bold">4832</span>
              </p>
              <p className="text-[12px] text-text-muted mt-0.5">
                Validade: 12/2027
              </p>
            </div>
          </div>
          <button
            onClick={() => setSaved(true)}
            className="px-5 py-2 text-[13px] font-semibold text-white hover:brightness-110 transition-all"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            Atualizar
          </button>
        </div>
      </SettingsCard>

      {/* Uso do plano */}
      <SettingsCard title="Uso do plano" showSave={false}>
        <div className="space-y-5">
          {usageData.map((item, i) => {
            const percent = item.total > 0 ? (item.used / item.total) * 100 : 0;
            const isWarning = percent > 90;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={16} weight="fill" className={isWarning ? "text-warning" : "text-text-secondary"} />
                    <span className="text-[13px] font-semibold text-text-primary">{item.label}</span>
                    {isWarning && (
                      <Warning size={14} weight="fill" className="text-warning" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-text-muted">
                      {formatNumber(item.used)} de {formatNumber(item.total)}
                    </span>
                    <span
                      className={`text-[12px] font-bold ${
                        isWarning ? "text-warning" : "text-text-secondary"
                      }`}
                    >
                      {percent.toFixed(percent % 1 === 0 ? 0 : 1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: isWarning
                        ? "#F59E0B"
                        : "linear-gradient(90deg, #F26B2A, #F5A623)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </SettingsCard>

      {/* Histórico de pagamentos */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white border border-[#E0E0E0] overflow-hidden"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <CurrencyDollar size={18} weight="fill" className="text-worder-primary" />
            <h3 className="text-[15px] font-bold text-text-primary font-heading">
              Histórico de pagamentos
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] text-white">
                <th className="text-left text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                  Data
                </th>
                <th className="text-left text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                  Valor
                </th>
                <th className="text-left text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                  Status
                </th>
                <th className="text-right text-[12px] font-semibold uppercase tracking-wide px-6 py-3">
                  Fatura
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                  className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors group"
                >
                  <td className="px-6 py-3.5 text-[13px] text-text-primary">
                    {row.date}
                  </td>
                  <td className="px-6 py-3.5 text-[13px] font-semibold text-text-primary">
                    {row.valor}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge variant="success" size="sm">
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1.5 text-[12px] font-medium text-worder-primary hover:underline transition-colors">
                      <FilePdf size={16} weight="fill" />
                      PDF
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
