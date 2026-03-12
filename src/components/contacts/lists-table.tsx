"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ListBullets,
  FunnelSimple,
  DotsThree,
  PencilSimple,
  Trash,
  Copy,
  Export,
  UsersThree,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { ListItem } from "@/lib/mock-data/lists";

interface ListsTableProps {
  items: ListItem[];
  searchQuery: string;
  typeFilter: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function ListsTable({ items, searchQuery, typeFilter }: ListsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "Todos" ||
      (typeFilter === "Lista" && item.type === "list") ||
      (typeFilter === "Segmento" && item.type === "segment");
    return matchesSearch && matchesType;
  });

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  function handleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((item) => item.id));
    }
  }

  function handleToggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-center text-[11px] uppercase tracking-widest font-semibold w-12">Tipo</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Nome</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Classificação</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Membros</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Criado em</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Atualizado</th>
            <th className="py-3.5 px-4 text-center text-[11px] uppercase tracking-widest font-semibold w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {filtered.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="rounded border-[#DDD] accent-[#F26B2A]"
                />
              </td>
              <td className="py-3 px-4 text-center">
                {item.type === "segment" ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-worder-primary/10">
                    <FunnelSimple size={18} weight="fill" className="text-worder-primary animate-pulse" style={{ animationDuration: "3s" }} />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-info/10">
                    <ListBullets size={18} weight="fill" className="text-info" />
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                <button className="font-medium text-text-primary text-[13px] hover:text-worder-primary transition-colors text-left">
                  {item.name}
                </button>
              </td>
              <td className="py-3 px-4">
                <Badge variant={item.type === "segment" ? "primary" : "default"} size="sm">
                  {item.type === "segment" ? "Segmento" : "Lista"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <UsersThree size={14} weight="fill" className="text-text-muted" />
                  <span className="font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatNumber(item.members)}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-muted">{formatDate(item.createdAt)}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-muted">{formatDate(item.updatedAt)}</span>
              </td>
              <td className="py-3 px-4 text-center relative">
                <button
                  onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                  className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <DotsThree size={18} weight="bold" className="text-text-muted" />
                </button>
                {openMenu === item.id && (
                  <div
                    className="absolute right-4 top-full mt-1 z-20 w-44 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                    style={{ borderRadius: "10px" }}
                  >
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <PencilSimple size={14} /> Editar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Copy size={14} /> Duplicar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Export size={14} /> Exportar
                    </button>
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
      {filtered.length === 0 && (
        <div className="py-12 text-center text-text-muted text-sm">
          Nenhuma lista ou segmento encontrado.
        </div>
      )}
    </div>
  );
}
