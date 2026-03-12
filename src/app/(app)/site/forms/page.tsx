"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  X,
  Sparkle,
  Code,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { FormsTable } from "@/components/site/forms-table";
import { formsData } from "@/lib/mock-data/forms";
import Link from "next/link";

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [showBanner, setShowBanner] = useState(true);

  const filtered = useMemo(() => {
    return formsData.filter((f) => {
      const matchesSearch =
        !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "Todos" ||
        (statusFilter === "Ativo" && f.status === "active") ||
        (statusFilter === "Rascunho" && f.status === "draft") ||
        (statusFilter === "Pausado" && f.status === "paused");
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
      <PageHeader title="Formulários" breadcrumb={["Site", "Formulários"]} />

      {/* Promo banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="relative overflow-hidden p-6"
              style={{
                borderRadius: "var(--radius-card)",
                background: "linear-gradient(135deg, rgba(242,107,42,0.08) 0%, rgba(245,166,35,0.08) 100%)",
                border: "1px solid rgba(242,107,42,0.15)",
              }}
            >
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/60 transition-colors"
              >
                <X size={16} className="text-text-muted" />
              </button>
              <div className="flex items-center gap-6">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #F26B2A, #F5A623)",
                  }}
                >
                  <Sparkle size={32} weight="fill" className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary font-heading">
                    Capture mais leads com pop-ups inteligentes
                  </h3>
                  <p className="text-[13px] text-text-muted mt-1 max-w-lg">
                    Crie formulários personalizados com exit intent, gamificação e segmentação avançada. Aumente sua taxa de conversão em até 3x.
                  </p>
                </div>
                <Link
                  href="/site/forms/form-new/editor"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 flex-shrink-0"
                  style={{
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                    boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
                  }}
                >
                  <Plus size={16} weight="bold" />
                  Criar formulário
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              placeholder="Pesquisar formulários..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-[#E0E0E0] w-[240px] focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
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
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors"
            style={{ borderRadius: "10px" }}
          >
            <Code size={16} weight="bold" />
            Adicionar ao site
          </button>
          <Link
            href="/site/forms/form-new/editor"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
            }}
          >
            <Plus size={16} weight="bold" />
            Criar formulário
          </Link>
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
        <FormsTable forms={filtered} />
      </div>
    </motion.div>
  );
}
