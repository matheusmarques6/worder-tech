"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  DotsThree,
  Export,
  Trash,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { AutomationsTable } from "@/components/automations/automations-table";
import { CreateFlowModal } from "@/components/automations/create-flow-modal";
import { automationsData } from "@/lib/mock-data/automations";

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const filtered = useMemo(() => {
    return automationsData.filter((a) => {
      const matchesSearch =
        !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "Todos" ||
        (statusFilter === "Ativo" && a.status === "active") ||
        (statusFilter === "Rascunho" && a.status === "draft") ||
        (statusFilter === "Pausado" && a.status === "paused");
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-7 py-6 space-y-6"
    >
      <PageHeader title="Automações" breadcrumb={["Automações"]} />

      {/* Action bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Pesquisar fluxos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-bg-input border border-border w-[240px] focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-bg-input border border-border text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
              style={{ borderRadius: "10px" }}
            >
              <option>Todos</option>
              <option>Ativo</option>
              <option>Rascunho</option>
              <option>Pausado</option>
            </select>
            <Funnel
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-bg-input border border-border text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
              style={{ borderRadius: "10px" }}
            >
              <option>Tags</option>
              <option>recuperação</option>
              <option>welcome</option>
              <option>pós-venda</option>
              <option>reengajamento</option>
            </select>
            <Funnel
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary border border-border hover:bg-border-subtle transition-colors"
              style={{ borderRadius: "10px" }}
            >
              <DotsThree size={16} weight="bold" />
              Opções
            </button>
            {showOptionsMenu && (
              <div
                className="absolute right-0 top-full mt-2 z-20 w-44 bg-background-card border border-border py-1 shadow-lg"
                style={{ borderRadius: "10px" }}
              >
                <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-bg-hover transition-colors">
                  <Export size={14} /> Exportar dados
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-error hover:bg-error/5 transition-colors">
                  <Trash size={14} /> Excluir selecionados
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
            }}
          >
            <Plus size={16} weight="bold" />
            Criar fluxo
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-background-card border border-border overflow-hidden"
        style={{
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <AutomationsTable automations={filtered} />
      </div>

      {/* Create modal */}
      <CreateFlowModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </motion.div>
  );
}
