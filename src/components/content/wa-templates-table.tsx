"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DotsThree,
  PencilSimple,
  Copy,
  Trash,
  CheckCircle,
  Clock,
  XCircle,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { WATemplate, WATemplateStatus, WATemplateCategory } from "@/lib/mock-data/content";

const statusConfig: Record<WATemplateStatus, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  approved: { label: "Aprovado", icon: <CheckCircle size={14} weight="fill" />, color: "text-success", bg: "bg-success/10" },
  pending: { label: "Pendente", icon: <Clock size={14} weight="fill" />, color: "text-warning", bg: "bg-warning/10" },
  rejected: { label: "Rejeitado", icon: <XCircle size={14} weight="fill" />, color: "text-error", bg: "bg-error/10" },
};

const categoryConfig: Record<WATemplateCategory, { label: string; variant: "primary" | "info" | "success" }> = {
  marketing: { label: "Marketing", variant: "primary" },
  transactional: { label: "Transacional", variant: "info" },
  otp: { label: "OTP", variant: "success" },
};

interface WATemplatesTableProps {
  templates: WATemplate[];
}

export function WATemplatesTable({ templates }: WATemplatesTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Nome</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Categoria</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Idioma</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Atualizado</th>
            <th className="py-3.5 px-4 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {templates.map((tpl, index) => {
            const sc = statusConfig[tpl.status];
            const cc = categoryConfig[tpl.category];
            return (
              <motion.tr
                key={tpl.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-text-primary text-[13px]">{tpl.name}</p>
                  {tpl.body && (
                    <p className="text-[11px] text-text-muted mt-0.5 truncate max-w-[320px]">{tpl.body}</p>
                  )}
                </td>
                <td className="py-3 px-4">
                  <Badge variant={cc.variant} size="sm">{cc.label}</Badge>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                    {sc.icon} {sc.label}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-[13px] text-text-secondary">{tpl.language}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-[13px] text-text-muted">
                    {new Date(tpl.updatedAt).toLocaleDateString("pt-BR")}
                  </span>
                </td>
                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === tpl.id ? null : tpl.id)}
                    className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                  >
                    <DotsThree size={18} weight="bold" className="text-text-muted" />
                  </button>
                  {openMenu === tpl.id && (
                    <div
                      className="absolute right-4 top-full mt-1 z-20 w-40 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                      style={{ borderRadius: "10px" }}
                    >
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                        <PencilSimple size={14} /> Editar
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                        <Copy size={14} /> Duplicar
                      </button>
                      <div className="my-1 border-t border-[#F0F0F0]" />
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-error hover:bg-error/5 transition-colors">
                        <Trash size={14} /> Excluir
                      </button>
                    </div>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
