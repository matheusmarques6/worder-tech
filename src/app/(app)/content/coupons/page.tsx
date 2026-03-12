"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  FunnelSimple,
  Plus,
  Ticket,
  X,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { CouponsTable } from "@/components/content/coupons-table";
import { couponsData } from "@/lib/mock-data/content";
import type { CouponStatus } from "@/lib/mock-data/content";

export default function Page() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CouponStatus | "all">("all");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = couponsData.filter((c) => {
    if (search && !c.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  const activeCount = couponsData.filter((c) => c.status === "active").length;
  const totalRevenue = couponsData.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Cupons"
        breadcrumb={["Conteúdo", "Cupons"]}
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
            Criar Cupom
          </button>
        }
      />

      {/* KPI strip */}
      <div
        className="flex items-center gap-6 px-5 py-3.5 bg-white border border-[#E0E0E0]"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}>
            <Ticket size={16} weight="fill" className="text-white" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
              {couponsData.length}
            </p>
            <p className="text-[11px] text-text-muted">Total</p>
          </div>
        </div>
        <div className="w-px h-10 bg-[#E0E0E0]" />
        <div>
          <p className="text-[20px] font-bold text-success" style={{ fontVariantNumeric: "tabular-nums" }}>
            {activeCount}
          </p>
          <p className="text-[11px] text-text-muted">Ativos</p>
        </div>
        <div className="w-px h-10 bg-[#E0E0E0]" />
        <div>
          <p className="text-[20px] font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
            {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <p className="text-[11px] text-text-muted">Receita total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar por código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="relative">
          <FunnelSimple size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CouponStatus | "all")}
            className="pl-8 pr-8 py-2 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
            style={{ borderRadius: "10px" }}
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="expired">Expirados</option>
            <option value="depleted">Esgotados</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white border border-[#E0E0E0] overflow-hidden"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        <CouponsTable coupons={filtered} />
      </div>

      {/* Create Coupon Modal */}
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
              className="bg-white w-full max-w-[480px] overflow-hidden shadow-xl"
              style={{ borderRadius: "16px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
                <h2 className="text-lg font-bold text-text-primary font-heading">Criar Cupom</h2>
                <button
                  onClick={() => setShowCreate(false)}
                  className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <X size={18} className="text-text-muted" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Código</label>
                  <input
                    type="text"
                    placeholder="ex: WORDER20"
                    className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors font-mono uppercase"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Tipo</label>
                    <select
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    >
                      <option value="percentage">Percentual</option>
                      <option value="fixed">Valor fixo</option>
                      <option value="free_shipping">Frete grátis</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Desconto</label>
                    <input
                      type="text"
                      placeholder="ex: 20%"
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Limite de uso</label>
                    <input
                      type="number"
                      placeholder="Ilimitado"
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Validade</label>
                    <input
                      type="date"
                      className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Compra mínima (opcional)</label>
                  <input
                    type="number"
                    placeholder="R$ 0,00"
                    className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E0E0E0]">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-[13px] font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors"
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
                  Criar Cupom
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
