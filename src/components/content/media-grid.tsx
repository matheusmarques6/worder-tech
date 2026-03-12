"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CloudArrowUp,
  Image as ImageIcon,
  VideoCamera,
  Eye,
  Trash,
  Copy,
  CheckSquare,
  Square,
  DownloadSimple,
} from "@phosphor-icons/react";
import type { MediaItem } from "@/lib/mock-data/content";

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

interface MediaGridProps {
  items: MediaItem[];
  search: string;
  typeFilter: string;
}

export function MediaGrid({ items, search, typeFilter }: MediaGridProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const filtered = items.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && m.type !== typeFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Batch actions bar */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-2.5 bg-worder-primary/5 border border-worder-primary/20 text-sm"
          style={{ borderRadius: "10px" }}
        >
          <span className="font-medium text-worder-primary">{selectedIds.length} selecionado(s)</span>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-white/80 rounded-lg transition-colors">
            <DownloadSimple size={14} /> Baixar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-error hover:bg-error/5 rounded-lg transition-colors">
            <Trash size={14} /> Excluir
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="text-[12px] text-text-muted hover:text-text-primary transition-colors"
          >
            Limpar
          </button>
        </motion.div>
      )}

      {/* Upload drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
        className={`border-2 border-dashed py-8 flex flex-col items-center gap-2 transition-all duration-200 ${
          dragOver
            ? "border-worder-primary bg-worder-primary/5"
            : "border-[#DDD] hover:border-[#BBB]"
        }`}
        style={{ borderRadius: "12px" }}
      >
        <CloudArrowUp size={32} weight="duotone" className={dragOver ? "text-worder-primary" : "text-text-muted"} />
        <p className="text-sm text-text-secondary">
          Arraste arquivos aqui ou{" "}
          <button className="text-worder-primary font-medium hover:underline">selecione</button>
        </p>
        <p className="text-[11px] text-text-muted">JPG, PNG, SVG, MP4 — Máximo 10MB</p>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item, i) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className={`group relative bg-white border overflow-hidden cursor-pointer transition-all duration-200 ${
                isSelected ? "border-worder-primary ring-2 ring-worder-primary/20" : "border-[#E0E0E0] hover:shadow-md"
              }`}
              style={{ borderRadius: "var(--radius-card)" }}
              onClick={() => toggleSelect(item.id)}
            >
              {/* Thumbnail */}
              <div
                className="aspect-square flex items-center justify-center relative"
                style={{ background: `${item.color}22` }}
              >
                {item.type === "video" ? (
                  <VideoCamera size={32} weight="duotone" style={{ color: item.color }} />
                ) : (
                  <ImageIcon size={32} weight="duotone" style={{ color: item.color }} />
                )}

                {/* Selection checkbox */}
                <div className="absolute top-2 left-2">
                  {isSelected ? (
                    <CheckSquare size={20} weight="fill" className="text-worder-primary" />
                  ) : (
                    <Square size={20} className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  )}
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:scale-105 transition-transform"
                  >
                    <Eye size={14} className="text-text-primary" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:scale-105 transition-transform"
                  >
                    <Copy size={14} className="text-text-primary" />
                  </button>
                </div>

                {/* Type badge */}
                {item.type === "video" && (
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-white font-medium">
                    VIDEO
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-2.5 py-2">
                <p className="text-[12px] font-medium text-text-primary truncate">{item.name}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{formatSize(item.size)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-text-muted">
          Nenhum arquivo encontrado.
        </div>
      )}
    </div>
  );
}
