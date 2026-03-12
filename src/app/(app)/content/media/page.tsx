"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  FunnelSimple,
  CloudArrowUp,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { MediaGrid } from "@/components/content/media-grid";
import { mediaData } from "@/lib/mock-data/content";

export default function Page() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const totalSize = mediaData.reduce((sum, m) => sum + m.size, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Mídia"
        breadcrumb={["Conteúdo", "Mídia"]}
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            <CloudArrowUp size={16} weight="bold" />
            Upload
          </button>
        }
      />

      {/* Stats + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar arquivos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="relative">
          <FunnelSimple size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-8 pr-8 py-2 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
            style={{ borderRadius: "10px" }}
          >
            <option value="all">Todos</option>
            <option value="image">Imagens</option>
            <option value="video">Vídeos</option>
          </select>
        </div>
        <div className="flex-1" />
        <span className="text-[12px] text-text-muted">
          {mediaData.length} arquivos &middot; {(totalSize / 1024).toFixed(1)} MB total
        </span>
      </div>

      <MediaGrid items={mediaData} search={search} typeFilter={typeFilter} />
    </motion.div>
  );
}
