"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DotsThree,
  PencilSimple,
  Eye,
  Trash,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-data/content";

function formatCurrency(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ProductsTableProps {
  products: Product[];
  search: string;
  statusFilter: string;
}

export function ProductsTable({ products, search, statusFilter }: ProductsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelectedIds(allSelected ? [] : filtered.map((p) => p.id))}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Produto</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">SKU</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Preço</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Estoque</th>
            <th className="py-3.5 px-4 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {filtered.map((prod, index) => (
            <motion.tr
              key={prod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(prod.id)}
                  onChange={() =>
                    setSelectedIds((prev) =>
                      prev.includes(prod.id) ? prev.filter((x) => x !== prod.id) : [...prev, prod.id]
                    )
                  }
                  className="rounded border-[#DDD] accent-[#F26B2A]"
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {/* Product thumbnail placeholder */}
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: prod.color }}
                  >
                    <span className="text-[9px] font-bold text-text-muted">{prod.sku.slice(0, 3)}</span>
                  </div>
                  <p className="font-medium text-text-primary text-[13px]">{prod.name}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="font-mono text-[12px] text-text-secondary">{prod.sku}</span>
              </td>
              <td className="py-3 px-4">
                {prod.status === "published" ? (
                  <Badge variant="success" size="sm">Publicado</Badge>
                ) : (
                  <Badge variant="default" size="sm">Rascunho</Badge>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {formatCurrency(prod.price)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span
                  className={`font-semibold ${prod.stock === 0 ? "text-error" : prod.stock < 20 ? "text-warning" : "text-text-primary"}`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {prod.stock === 0 ? "Esgotado" : prod.stock.toLocaleString("pt-BR")}
                </span>
              </td>
              <td className="py-3 px-4 text-center relative">
                <button
                  onClick={() => setOpenMenu(openMenu === prod.id ? null : prod.id)}
                  className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <DotsThree size={18} weight="bold" className="text-text-muted" />
                </button>
                {openMenu === prod.id && (
                  <div
                    className="absolute right-4 top-full mt-1 z-20 w-40 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                    style={{ borderRadius: "10px" }}
                  >
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Eye size={14} /> Visualizar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <PencilSimple size={14} /> Editar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <ArrowSquareOut size={14} /> Ver na loja
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
        <div className="py-16 text-center text-sm text-text-muted">
          Nenhum produto encontrado.
        </div>
      )}
    </div>
  );
}
