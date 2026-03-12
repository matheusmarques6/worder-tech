"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  FunnelSimple,
  Plus,
  SquaresFour,
  WhatsappLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { TemplateGrid } from "@/components/content/template-grid";
import { WATemplatesTable } from "@/components/content/wa-templates-table";
import { emailTemplates, waTemplates } from "@/lib/mock-data/content";
import type { TemplateType } from "@/lib/mock-data/content";

type Tab = "library" | "custom" | "whatsapp";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "library", label: "Biblioteca", icon: <EnvelopeSimple size={15} weight="fill" /> },
  { id: "custom", label: "Meus templates", icon: <SquaresFour size={15} weight="fill" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo size={15} weight="fill" /> },
];

const typeFilters: { value: TemplateType | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "promotional", label: "Promocional" },
  { value: "transactional", label: "Transacional" },
  { value: "seasonal", label: "Sazonal" },
  { value: "automation", label: "Automação" },
  { value: "engagement", label: "Engajamento" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("library");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TemplateType | "all">("all");

  const customTemplates = emailTemplates.filter((t) => t.isCustom);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Templates"
        breadcrumb={["Conteúdo", "Templates"]}
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            <Plus size={16} weight="bold" />
            Criar Template
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? "#F26B2A" : "var(--text-muted)",
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="template-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Filters — email tabs */}
      {activeTab !== "whatsapp" && (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="relative">
            <FunnelSimple size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TemplateType | "all")}
              className="pl-8 pr-8 py-2 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
              style={{ borderRadius: "10px" }}
            >
              {typeFilters.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "library" && (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TemplateGrid templates={emailTemplates} search={search} typeFilter={typeFilter} />
          </motion.div>
        )}

        {activeTab === "custom" && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {customTemplates.length > 0 ? (
              <TemplateGrid templates={customTemplates} search={search} typeFilter={typeFilter} />
            ) : (
              <div className="py-20 text-center">
                <EnvelopeSimple size={48} weight="duotone" className="text-text-muted mx-auto mb-3" />
                <p className="text-sm text-text-muted">Nenhum template personalizado ainda.</p>
                <p className="text-[12px] text-text-muted mt-1">Crie um novo template ou duplique um da biblioteca.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "whatsapp" && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-background-card border border-border overflow-hidden"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <WATemplatesTable templates={waTemplates} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
