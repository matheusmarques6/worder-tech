"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  FunnelSimple,
  ArrowsClockwise,
  Package,
  Tag,
  RssSimple,
  CheckCircle,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { ProductsTable } from "@/components/content/products-table";
import { productsData, productCategories } from "@/lib/mock-data/content";
import { Badge } from "@/components/ui/badge";

type Tab = "items" | "categories" | "feed";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "items", label: "Itens", icon: <Package size={15} weight="fill" /> },
  { id: "categories", label: "Categorias", icon: <Tag size={15} weight="fill" /> },
  { id: "feed", label: "Feed", icon: <RssSimple size={15} weight="fill" /> },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("items");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const publishedCount = productsData.filter((p) => p.status === "published").length;
  const totalStock = productsData.reduce((sum, p) => sum + p.stock, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Produtos"
        breadcrumb={["Conteúdo", "Produtos"]}
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors"
            style={{ borderRadius: "10px" }}
          >
            <ArrowsClockwise size={16} weight="bold" />
            Sincronizar
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
            <Package size={16} weight="fill" className="text-white" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
              {productsData.length}
            </p>
            <p className="text-[11px] text-text-muted">Produtos</p>
          </div>
        </div>
        <div className="w-px h-10 bg-[#E0E0E0]" />
        <div>
          <p className="text-[20px] font-bold text-success" style={{ fontVariantNumeric: "tabular-nums" }}>
            {publishedCount}
          </p>
          <p className="text-[11px] text-text-muted">Publicados</p>
        </div>
        <div className="w-px h-10 bg-[#E0E0E0]" />
        <div>
          <p className="text-[20px] font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
            {totalStock.toLocaleString("pt-BR")}
          </p>
          <p className="text-[11px] text-text-muted">Em estoque</p>
        </div>
        <div className="flex-1" />
        <Badge variant="success" size="sm" className="inline-flex items-center gap-1">
          <CheckCircle size={12} weight="fill" /> Sincronizado
        </Badge>
        <span className="text-[11px] text-text-muted">Última sync: há 2 horas</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E0E0E0]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? "#F26B2A" : "#888",
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="product-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "items" && (
          <motion.div
            key="items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 max-w-xs">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou SKU..."
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
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-8 pr-8 py-2 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
                  style={{ borderRadius: "10px" }}
                >
                  <option value="all">Todos</option>
                  <option value="published">Publicados</option>
                  <option value="unpublished">Rascunho</option>
                </select>
              </div>
            </div>

            <div
              className="bg-white border border-[#E0E0E0] overflow-hidden"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <ProductsTable products={productsData} search={search} statusFilter={statusFilter} />
            </div>
          </motion.div>
        )}

        {activeTab === "categories" && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white border border-[#E0E0E0] overflow-hidden"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Categoria</th>
                    <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Produtos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {productCategories.map((cat, i) => (
                    <motion.tr
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="hover:bg-[rgba(242,107,42,0.03)] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-worder-primary/10">
                            <Tag size={16} weight="fill" className="text-worder-primary" />
                          </div>
                          <span className="font-medium text-text-primary text-[13px]">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {cat.count}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white border border-[#E0E0E0] p-8 text-center"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <RssSimple size={48} weight="duotone" className="text-text-muted mx-auto mb-3" />
              <h3 className="text-lg font-bold text-text-primary font-heading mb-1">Feed de Produtos</h3>
              <p className="text-sm text-text-muted max-w-md mx-auto">
                Configure o feed XML/JSON para sincronizar automaticamente seu catálogo com campanhas e automações.
              </p>
              <button
                className="mt-4 px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                  boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
                }}
              >
                Configurar Feed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
