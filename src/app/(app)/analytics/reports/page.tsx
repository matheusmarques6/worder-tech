"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  DotsThree,
  PencilSimple,
  Trash,
  Copy,
  X,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import {
  savedReports,
  reportTypeLabels,
  reportFrequencyLabels,
} from "@/lib/mock-data/analytics";
import type { ReportType } from "@/lib/mock-data/analytics";

const typeVariant: Record<ReportType, "primary" | "info" | "success" | "default"> = {
  complete: "primary",
  revenue: "success",
  email: "info",
  custom: "default",
};

export default function Page() {
  const [showCreate, setShowCreate] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scheduleEmail, setScheduleEmail] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Relatórios"
        breadcrumb={["Analytics", "Relatórios"]}
        actions={
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            <Plus size={16} weight="bold" />
            Criar relatório
          </button>
        }
      />

      {/* Reports table */}
      <div
        className="bg-background-card border border-border overflow-hidden"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-table-header text-white">
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Nome</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Tipo</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Frequência</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Criado em</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Última execução</th>
              <th className="py-3.5 px-5 text-center w-28"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {savedReports.map((report, i) => (
              <motion.tr
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors"
              >
                <td className="py-3.5 px-5">
                  <p className="font-medium text-text-primary text-[13px]">{report.name}</p>
                </td>
                <td className="py-3.5 px-5">
                  <Badge variant={typeVariant[report.type]} size="sm">
                    {reportTypeLabels[report.type]}
                  </Badge>
                </td>
                <td className="py-3.5 px-5">
                  <span className="text-[13px] text-text-secondary">
                    {reportFrequencyLabels[report.frequency]}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className="text-[13px] text-text-muted">
                    {new Date(report.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className="text-[13px] text-text-muted">
                    {new Date(report.lastRun).toLocaleDateString("pt-BR")}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:brightness-110"
                      style={{
                        borderRadius: "6px",
                        background: "linear-gradient(135deg, #F26B2A, #F5A623)",
                      }}
                    >
                      <Play size={12} weight="fill" /> Executar
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === report.id ? null : report.id)}
                        className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors"
                      >
                        <DotsThree size={16} weight="bold" className="text-text-muted" />
                      </button>
                      {openMenu === report.id && (
                        <div
                          className="absolute right-0 top-full mt-1 z-20 w-36 bg-background-card border border-border py-1 shadow-lg"
                          style={{ borderRadius: "10px" }}
                        >
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-text-secondary hover:bg-bg-hover transition-colors">
                            <PencilSimple size={13} /> Editar
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-text-secondary hover:bg-bg-hover transition-colors">
                            <Copy size={13} /> Duplicar
                          </button>
                          <div className="my-1 border-t border-border-subtle" />
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-error hover:bg-error/5 transition-colors">
                            <Trash size={13} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Report Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background-card w-full max-w-[520px] overflow-hidden shadow-xl"
              style={{ borderRadius: "16px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary font-heading">Criar Relatório</h2>
                <button
                  onClick={() => setShowCreate(false)}
                  className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors"
                >
                  <X size={18} className="text-text-muted" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Nome</label>
                  <input
                    type="text"
                    placeholder="ex: Performance Semanal"
                    className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Métricas</label>
                  <select
                    multiple
                    className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors h-24"
                    style={{ borderRadius: "10px" }}
                  >
                    {["Placed Order", "Revenue", "Opened Email", "Clicked Email", "Active on Site", "Viewed Product"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-text-muted mt-1">Segure Ctrl/Cmd para selecionar múltiplas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Período</label>
                    <select
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    >
                      <option>Últimos 7 dias</option>
                      <option>Últimos 30 dias</option>
                      <option>Últimos 90 dias</option>
                      <option>Personalizado</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Canal</label>
                    <select
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    >
                      <option>Todos</option>
                      <option>Email</option>
                      <option>WhatsApp</option>
                      <option>SMS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Formato</label>
                  <div className="flex items-center gap-3 mt-1.5">
                    {["Tabela", "Gráfico"].map((fmt) => (
                      <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="format" defaultChecked={fmt === "Tabela"} className="accent-[#F26B2A]" />
                        <span className="text-sm text-text-secondary">{fmt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Schedule toggle */}
                <div className="flex items-center justify-between p-3 bg-bg-subtle border border-border-subtle" style={{ borderRadius: "10px" }}>
                  <div className="flex items-center gap-2">
                    <EnvelopeSimple size={16} weight="fill" className="text-text-muted" />
                    <div>
                      <p className="text-[13px] font-medium text-text-primary">Agendar envio por e-mail</p>
                      <p className="text-[11px] text-text-muted">Receba o relatório automaticamente</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setScheduleEmail(!scheduleEmail)}
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={{ background: scheduleEmail ? "linear-gradient(90deg, #F26B2A, #F5A623)" : "var(--border)" }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                      style={{ left: scheduleEmail ? "22px" : "2px" }}
                    />
                  </button>
                </div>

                {scheduleEmail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Frequência</label>
                      <select
                        className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
                        style={{ borderRadius: "10px" }}
                      >
                        <option>Diário</option>
                        <option>Semanal</option>
                        <option>Mensal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">E-mail</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-[13px] font-medium text-text-secondary border border-border hover:bg-border-subtle transition-colors"
                  style={{ borderRadius: "8px" }}
                >
                  Cancelar
                </button>
                <button
                  className="px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                    boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
                  }}
                >
                  Criar Relatório
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
