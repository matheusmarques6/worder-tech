"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Export,
  PaperPlaneTilt,
  WhatsappLogo,
  Envelope,
  Funnel,
  ShoppingCartSimple,
  PixLogo,
  Barcode,
  CreditCard,
  CalendarBlank,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { RecoveryHero } from "@/components/recovery/recovery-hero";
import { RecoveryTable } from "@/components/recovery/recovery-table";
import { WhatsAppModal } from "@/components/recovery/whatsapp-modal";
import { DetailsDrawer } from "@/components/recovery/details-drawer";
import {
  recoveryKPIs,
  tabCounts,
  getItemsByTab,
  type RecoveryTab,
  type RecoveryItem,
} from "@/lib/mock-data/recovery";

const tabs: { key: RecoveryTab; label: string; icon: React.ReactNode }[] = [
  { key: "carts", label: "Carrinhos Abandonados", icon: <ShoppingCartSimple size={16} weight="fill" /> },
  { key: "pix", label: "PIX Pendente", icon: <PixLogo size={16} weight="fill" /> },
  { key: "boletos_due", label: "Boletos Vencendo", icon: <Barcode size={16} weight="fill" /> },
  { key: "boletos_overdue", label: "Boletos Vencidos", icon: <Barcode size={16} weight="fill" /> },
  { key: "cards", label: "Cartões Recusados", icon: <CreditCard size={16} weight="fill" /> },
];

const periodOptions = ["Hoje", "7 dias", "30 dias", "90 dias"];
const statusOptions = ["Todos", "Pendente", "Recuperado", "Expirado"];

export default function RecoveryPage() {
  const [activeTab, setActiveTab] = useState<RecoveryTab>("carts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30 dias");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [whatsAppItem, setWhatsAppItem] = useState<RecoveryItem | null>(null);
  const [detailsItem, setDetailsItem] = useState<RecoveryItem | null>(null);

  const items = useMemo(() => {
    let filtered = getItemsByTab(activeTab);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.customerName.toLowerCase().includes(q) ||
          item.orderId.toLowerCase().includes(q) ||
          item.products.some((p) => p.name.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [activeTab, searchQuery]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  function handleToggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  }

  function handleTabChange(tab: RecoveryTab) {
    setActiveTab(tab);
    setSelectedIds([]);
    setSearchQuery("");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-7 py-6 space-y-6"
    >
      <PageHeader
        title="Recuperação de Vendas"
        breadcrumb={["Recuperação"]}
      />

      {/* Hero Card */}
      <RecoveryHero />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recoveryKPIs.map((kpi, i) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeLabel={kpi.changeLabel}
            icon={kpi.icon}
            index={i}
          />
        ))}
      </div>

      {/* Tabs + Table Section */}
      <div
        className="bg-background-card border border-border overflow-hidden"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        {/* Tabs */}
        <div className="border-b border-[#F0F0F0] px-5">
          <div className="flex items-center gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className="relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors whitespace-nowrap"
                style={{ color: activeTab === tab.key ? "#F26B2A" : "#888" }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full"
                  style={{
                    background: activeTab === tab.key ? "rgba(242,107,42,0.1)" : "#F0F0F0",
                    color: activeTab === tab.key ? "#F26B2A" : "#888",
                  }}
                >
                  {tabCounts[tab.key]}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="recovery-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-5 py-4 border-b border-[#F0F0F0] bg-[#FAFAFA]">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar pedido, cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-white border border-[#E0E0E0] w-[240px] focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                style={{ borderRadius: "10px" }}
              />
            </div>
            {/* Period filter */}
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
                style={{ borderRadius: "10px" }}
              >
                {periodOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <CalendarBlank size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
            {/* Status filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
                style={{ borderRadius: "10px" }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <Funnel size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors"
              style={{ borderRadius: "10px" }}
            >
              <Export size={16} weight="bold" />
              Exportar
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
              }}
            >
              <PaperPlaneTilt size={16} weight="fill" />
              Enviar em lote
            </button>
          </div>
        </div>

        {/* Batch selection bar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 bg-worder-primary/5 border-b border-worder-primary/10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-worder-primary">
                    {selectedIds.length} selecionado{selectedIds.length > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-[12px] text-text-muted hover:text-text-secondary transition-colors"
                  >
                    Limpar seleção
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#22C55E] bg-[#22C55E]/10 hover:bg-[#22C55E]/20 transition-colors rounded-lg">
                    <WhatsappLogo size={16} weight="fill" />
                    WhatsApp para todos
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-info bg-info/10 hover:bg-info/20 transition-colors rounded-lg">
                    <Envelope size={16} weight="fill" />
                    E-mail para todos
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <RecoveryTable
          items={items}
          tab={activeTab}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          onWhatsApp={setWhatsAppItem}
          onEmail={() => {}}
          onViewDetails={setDetailsItem}
        />
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        item={whatsAppItem}
        onClose={() => setWhatsAppItem(null)}
        onSend={() => {}}
      />

      {/* Details Drawer */}
      <DetailsDrawer
        item={detailsItem}
        onClose={() => setDetailsItem(null)}
      />
    </motion.div>
  );
}
