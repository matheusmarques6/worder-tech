"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DotsThree,
  PencilSimple,
  Copy,
  Pause,
  Play,
  Trash,
} from "@phosphor-icons/react";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChannelBadge } from "@/components/shared/channel-badge";
import type { Automation } from "@/lib/mock-data/automations";
import Link from "next/link";

interface AutomationsTableProps {
  automations: Automation[];
}

function formatCurrency(value: number): string {
  if (value === 0) return "R$ 0";
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AutomationsTable({ automations }: AutomationsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const allSelected = automations.length > 0 && selectedIds.length === automations.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelectedIds(allSelected ? [] : automations.map((a) => a.id))}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Fluxo</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Canal</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Atualizado</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Receita</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Receita/dest.</th>
            <th className="py-3.5 px-4 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {automations.map((auto, index) => (
            <motion.tr
              key={auto.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(auto.id)}
                  onChange={() =>
                    setSelectedIds((prev) =>
                      prev.includes(auto.id) ? prev.filter((x) => x !== auto.id) : [...prev, auto.id]
                    )
                  }
                  className="rounded border-[#DDD] accent-[#F26B2A]"
                />
              </td>
              <td className="py-3 px-4">
                <Link href={`/automations/${auto.id}/builder`} className="block">
                  <p className="font-medium text-text-primary text-[13px] hover:text-worder-primary transition-colors">
                    {auto.name}
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">{auto.trigger}</p>
                </Link>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1 flex-wrap">
                  {auto.channels.map((ch) => (
                    <ChannelBadge key={ch} channel={ch} />
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={auto.status} />
              </td>
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-muted">{formatDate(auto.updatedAt)}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span
                  className="font-bold text-text-primary"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {formatCurrency(auto.revenue)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span
                  className="text-text-secondary font-medium"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {auto.revenuePerRecipient > 0
                    ? `R$ ${auto.revenuePerRecipient.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                    : "—"}
                </span>
              </td>
              <td className="py-3 px-4 text-center relative">
                <button
                  onClick={() => setOpenMenu(openMenu === auto.id ? null : auto.id)}
                  className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <DotsThree size={18} weight="bold" className="text-text-muted" />
                </button>
                {openMenu === auto.id && (
                  <div
                    className="absolute right-4 top-full mt-1 z-20 w-44 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                    style={{ borderRadius: "10px" }}
                  >
                    <Link
                      href={`/automations/${auto.id}/builder`}
                      className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors"
                    >
                      <PencilSimple size={14} /> Editar fluxo
                    </Link>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Copy size={14} /> Duplicar
                    </button>
                    {auto.status === "active" ? (
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                        <Pause size={14} /> Pausar
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                        <Play size={14} /> Ativar
                      </button>
                    )}
                    <div className="my-1 border-t border-[#F0F0F0]" />
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-error hover:bg-error/5 transition-colors">
                      <Trash size={14} /> Excluir
                    </button>
                  </div>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
