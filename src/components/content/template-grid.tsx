"use client";

import { motion } from "framer-motion";
import {
  Eye,
  PencilSimple,
  Copy,
} from "@phosphor-icons/react";
import type { EmailTemplate, TemplateType } from "@/lib/mock-data/content";
import { templateTypeLabels } from "@/lib/mock-data/content";
import { Badge } from "@/components/ui/badge";

const typeVariant: Record<TemplateType, "primary" | "info" | "success" | "warning" | "default"> = {
  promotional: "primary",
  transactional: "info",
  seasonal: "warning",
  automation: "success",
  engagement: "default",
};

const layoutLabel: Record<string, string> = {
  "1-col": "1 coluna",
  "2-col": "2 colunas",
  hero: "Hero",
};

interface TemplateGridProps {
  templates: EmailTemplate[];
  search: string;
  typeFilter: TemplateType | "all";
}

export function TemplateGrid({ templates, search, typeFilter }: TemplateGridProps) {
  const filtered = templates.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {filtered.map((tpl, i) => (
        <motion.div
          key={tpl.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="group bg-background-card border border-border overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          {/* Preview thumbnail */}
          <div
            className="relative h-44 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${tpl.colors[0]}22, ${tpl.colors[1]}33)`,
            }}
          >
            {/* Mini email layout preview */}
            <div className="absolute inset-4 bg-background-card rounded-lg shadow-sm overflow-hidden">
              {tpl.layout === "hero" && (
                <>
                  <div className="h-16" style={{ background: tpl.colors[0] }} />
                  <div className="p-3 space-y-2">
                    <div className="h-2 rounded" style={{ background: tpl.colors[0], width: "70%", opacity: 0.3 }} />
                    <div className="h-1.5 bg-[#E0E0E0] rounded w-full" />
                    <div className="h-1.5 bg-[#E0E0E0] rounded w-4/5" />
                    <div className="h-6 rounded mt-2" style={{ background: tpl.colors[0], width: "50%" }} />
                  </div>
                </>
              )}
              {tpl.layout === "1-col" && (
                <div className="p-3 space-y-2">
                  <div className="h-3 rounded" style={{ background: tpl.colors[0], width: "60%", opacity: 0.4 }} />
                  <div className="h-1.5 bg-[#E0E0E0] rounded w-full" />
                  <div className="h-1.5 bg-[#E0E0E0] rounded w-5/6" />
                  <div className="h-1.5 bg-[#E0E0E0] rounded w-3/4" />
                  <div className="h-10 rounded-lg mt-2" style={{ background: `${tpl.colors[1]}44` }} />
                  <div className="h-6 rounded mx-auto mt-2" style={{ background: tpl.colors[0], width: "60%" }} />
                </div>
              )}
              {tpl.layout === "2-col" && (
                <div className="p-3 space-y-2">
                  <div className="h-3 rounded" style={{ background: tpl.colors[0], width: "50%", opacity: 0.4 }} />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="space-y-1.5">
                      <div className="h-12 rounded" style={{ background: `${tpl.colors[1]}44` }} />
                      <div className="h-1.5 bg-[#E0E0E0] rounded" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-12 rounded" style={{ background: `${tpl.colors[0]}22` }} />
                      <div className="h-1.5 bg-[#E0E0E0] rounded" />
                    </div>
                  </div>
                  <div className="h-6 rounded mx-auto mt-1" style={{ background: tpl.colors[0], width: "60%" }} />
                </div>
              )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-background-card shadow-md hover:scale-105 transition-transform">
                <Eye size={16} className="text-text-primary" />
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-background-card shadow-md hover:scale-105 transition-transform">
                <PencilSimple size={16} className="text-text-primary" />
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-background-card shadow-md hover:scale-105 transition-transform">
                <Copy size={16} className="text-text-primary" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-3.5">
            <p className="text-[13px] font-semibold text-text-primary truncate">{tpl.name}</p>
            <div className="flex items-center justify-between mt-2">
              <Badge variant={typeVariant[tpl.type]} size="sm">
                {templateTypeLabels[tpl.type]}
              </Badge>
              <span className="text-[11px] text-text-muted">{layoutLabel[tpl.layout]}</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1.5">
              Atualizado em {new Date(tpl.updatedAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </motion.div>
      ))}

      {filtered.length === 0 && (
        <div className="col-span-full py-16 text-center text-sm text-text-muted">
          Nenhum template encontrado.
        </div>
      )}
    </div>
  );
}
