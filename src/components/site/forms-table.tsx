"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Browsers,
  CodeBlock,
  SidebarSimple,
  Rows,
  DotsThree,
  PencilSimple,
  Copy,
  Pause,
  Play,
  Trash,
  Code,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { FormItem, FormType } from "@/lib/mock-data/forms";
import Link from "next/link";
import type { ReactNode } from "react";

const typeConfig: Record<FormType, { label: string; icon: ReactNode; variant: "default" | "primary" | "info" | "warning" }> = {
  popup: { label: "Pop-up", icon: <Browsers size={14} weight="fill" />, variant: "primary" },
  embedded: { label: "Embedded", icon: <CodeBlock size={14} weight="fill" />, variant: "info" },
  flyout: { label: "Flyout", icon: <SidebarSimple size={14} weight="fill" />, variant: "warning" },
  bar: { label: "Barra", icon: <Rows size={14} weight="fill" />, variant: "default" },
};

function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}


function RateCell({ value }: { value?: number }) {
  if (value === undefined || value === null) return <span className="text-text-muted">—</span>;
  let colorClass = "text-error";
  if (value >= 5) colorClass = "text-success";
  else if (value >= 2) colorClass = "text-warning";
  return (
    <span className={`font-semibold ${colorClass}`} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
    </span>
  );
}

interface FormsTableProps {
  forms: FormItem[];
}

export function FormsTable({ forms }: FormsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const allSelected = forms.length > 0 && selectedIds.length === forms.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-table-header text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelectedIds(allSelected ? [] : forms.map((f) => f.id))}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Formulário</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Tipo</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Visualizações</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Taxa envio</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Receita</th>
            <th className="py-3.5 px-4 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {forms.map((form, index) => {
            const tc = typeConfig[form.type];
            return (
              <motion.tr
                key={form.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(form.id)}
                    onChange={() =>
                      setSelectedIds((prev) =>
                        prev.includes(form.id) ? prev.filter((x) => x !== form.id) : [...prev, form.id]
                      )
                    }
                    className="rounded border-[#DDD] accent-[#F26B2A]"
                  />
                </td>
                <td className="py-3 px-4">
                  <Link href={`/site/forms/${form.id}/editor`} className="block">
                    <p className="font-medium text-text-primary text-[13px] hover:text-worder-primary transition-colors">
                      {form.name}
                    </p>
                    {form.targetList && (
                      <p className="text-[11px] text-text-muted mt-0.5">→ {form.targetList}</p>
                    )}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={tc.variant} size="sm" className="inline-flex items-center gap-1">
                    {tc.icon} {tc.label}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={form.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-text-primary font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {form.views ? formatNumber(form.views) : "—"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <RateCell value={form.submissionRate} />
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {form.revenue ? `R$ ${formatNumber(form.revenue)}` : "—"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === form.id ? null : form.id)}
                    className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors"
                  >
                    <DotsThree size={18} weight="bold" className="text-text-muted" />
                  </button>
                  {openMenu === form.id && (
                    <div
                      className="absolute right-4 top-full mt-1 z-20 w-44 bg-background-card border border-border py-1 shadow-lg"
                      style={{ borderRadius: "10px" }}
                    >
                      <Link
                        href={`/site/forms/${form.id}/editor`}
                        className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-subtle transition-colors"
                      >
                        <PencilSimple size={14} /> Editar
                      </Link>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-subtle transition-colors">
                        <Copy size={14} /> Duplicar
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-subtle transition-colors">
                        <Code size={14} /> Código embed
                      </button>
                      {form.status === "active" ? (
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-subtle transition-colors">
                          <Pause size={14} /> Pausar
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-subtle transition-colors">
                          <Play size={14} /> Ativar
                        </button>
                      )}
                      <div className="my-1 border-t border-border-subtle" />
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
