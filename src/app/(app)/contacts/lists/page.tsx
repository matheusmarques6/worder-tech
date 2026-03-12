"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Plus,
  ListBullets,
  FunnelSimple,
  CaretDown,
  Funnel,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { ListsTable } from "@/components/contacts/lists-table";
import { SegmentLibrary } from "@/components/contacts/segment-library";
import { SegmentBuilder } from "@/components/contacts/segment-builder";
import { listsData, type SegmentTemplate, type SegmentRule } from "@/lib/mock-data/lists";

type View = "lists" | "library" | "builder";

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState<"lists" | "library">("lists");
  const [view, setView] = useState<View>("lists");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [builderName, setBuilderName] = useState("");
  const [builderRules, setBuilderRules] = useState<SegmentRule[]>([]);

  function handleUseTemplate(template: SegmentTemplate) {
    setBuilderName(template.name);
    setBuilderRules(template.rules.map((r) => ({ ...r, id: `r-${Date.now()}-${Math.random()}` })));
    setView("builder");
  }

  function handleNewSegment() {
    setBuilderName("");
    setBuilderRules([]);
    setView("builder");
    setShowCreateMenu(false);
  }

  if (view === "builder") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-7 py-6 space-y-6"
      >
        <PageHeader
          title="Criar Segmento"
          breadcrumb={["Contatos", "Listas & Segmentos", "Criar Segmento"]}
        />
        <SegmentBuilder
          initialName={builderName}
          initialRules={builderRules}
          onBack={() => setView("lists")}
        />
      </motion.div>
    );
  }

  const tabs = [
    { key: "lists" as const, label: "Listas & Segmentos" },
    { key: "library" as const, label: "Biblioteca de Segmentos" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-7 py-6 space-y-6"
    >
      <PageHeader
        title="Listas & Segmentos"
        breadcrumb={["Contatos", "Listas & Segmentos"]}
      />

      {/* Tabs */}
      <div className="border-b border-[#F0F0F0]">
        <div className="flex items-center gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative px-5 py-3 text-sm font-medium transition-colors"
              style={{ color: activeTab === tab.key ? "#F26B2A" : "#888" }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="lists-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "lists" && (
        <>
          {/* Action bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar lista ou segmento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm bg-white border border-[#E0E0E0] w-[260px] focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
                  style={{ borderRadius: "10px" }}
                >
                  <option>Todos</option>
                  <option>Lista</option>
                  <option>Segmento</option>
                </select>
                <Funnel size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                  boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
                }}
              >
                <Plus size={16} weight="bold" />
                Criar
                <CaretDown size={12} weight="bold" />
              </button>
              {showCreateMenu && (
                <div
                  className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                  style={{ borderRadius: "10px" }}
                >
                  <button
                    onClick={() => setShowCreateMenu(false)}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors"
                  >
                    <ListBullets size={16} weight="fill" className="text-info" />
                    Nova Lista
                  </button>
                  <button
                    onClick={handleNewSegment}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors"
                  >
                    <FunnelSimple size={16} weight="fill" className="text-worder-primary" />
                    Novo Segmento
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div
            className="bg-background-card border border-border overflow-hidden"
            style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
          >
            <ListsTable items={listsData} searchQuery={searchQuery} typeFilter={typeFilter} />
          </div>
        </>
      )}

      {activeTab === "library" && (
        <SegmentLibrary onUseTemplate={handleUseTemplate} />
      )}
    </motion.div>
  );
}
