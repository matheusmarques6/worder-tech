"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DotsThree,
  PencilSimple,
  Copy,
  Trash,
  Pause,
  Play,
  Percent,
  CurrencyDollar,
  Truck,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { Coupon, CouponType, CouponStatus } from "@/lib/mock-data/content";
import { couponTypeConfig } from "@/lib/mock-data/content";

const statusConfig: Record<CouponStatus, { label: string; color: string; bg: string; dotClass: string }> = {
  active: { label: "Ativo", color: "text-success", bg: "bg-success/10", dotClass: "bg-success" },
  expired: { label: "Expirado", color: "text-[#6B7280]", bg: "bg-[#6B7280]/10", dotClass: "bg-[#6B7280]" },
  depleted: { label: "Esgotado", color: "text-warning", bg: "bg-warning/10", dotClass: "bg-warning" },
};

function formatCurrency(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const typeIcons: Record<CouponType, React.ReactNode> = {
  percentage: <Percent size={14} weight="bold" />,
  fixed: <CurrencyDollar size={14} weight="bold" />,
  free_shipping: <Truck size={14} weight="bold" />,
};

interface CouponsTableProps {
  coupons: Coupon[];
}

export function CouponsTable({ coupons }: CouponsTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1A1A1A] text-white">
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Código</th>
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Tipo</th>
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Desconto</th>
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Uso</th>
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Validade</th>
              <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Receita</th>
              <th className="py-3.5 px-4 text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {coupons.map((cpn, index) => {
              const sc = statusConfig[cpn.status];
              const tc = couponTypeConfig[cpn.type];
              const usagePercent = cpn.usesLimit ? Math.min((cpn.usesCount / cpn.usesLimit) * 100, 100) : null;

              return (
                <motion.tr
                  key={cpn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-[13px] text-worder-primary tracking-wide">
                      {cpn.code}
                    </span>
                    {cpn.minPurchase && (
                      <p className="text-[10px] text-text-muted mt-0.5">
                        Min: {formatCurrency(cpn.minPurchase)}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={tc.variant} size="sm" className="inline-flex items-center gap-1">
                      {typeIcons[cpn.type]} {tc.label}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-text-primary text-[14px]">{cpn.discount}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                      <span className={`w-2 h-2 rounded-full ${sc.dotClass}`} />
                      {sc.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="min-w-[120px]">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-text-secondary font-medium">
                          {cpn.usesCount.toLocaleString("pt-BR")}
                          {cpn.usesLimit ? ` / ${cpn.usesLimit.toLocaleString("pt-BR")}` : ""}
                        </span>
                        {usagePercent !== null && (
                          <span className="text-text-muted">{Math.round(usagePercent)}%</span>
                        )}
                      </div>
                      {usagePercent !== null ? (
                        <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${usagePercent}%` }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="h-full rounded-full"
                            style={{
                              background: usagePercent >= 100
                                ? "#EF4444"
                                : usagePercent >= 75
                                  ? "#F59E0B"
                                  : "linear-gradient(90deg, #F26B2A, #F5A623)",
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] text-text-muted">Ilimitado</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[13px] text-text-secondary">
                      {new Date(cpn.validUntil).toLocaleDateString("pt-BR")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {formatCurrency(cpn.revenue)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === cpn.id ? null : cpn.id)}
                      className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                    >
                      <DotsThree size={18} weight="bold" className="text-text-muted" />
                    </button>
                    {openMenu === cpn.id && (
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
                        {cpn.status === "active" ? (
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                            <Pause size={14} /> Desativar
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
              );
            })}
          </tbody>
        </table>
      </div>
  );
}
