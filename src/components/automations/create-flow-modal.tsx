"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "@phosphor-icons/react";
import { ChannelBadge } from "@/components/shared/channel-badge";
import {
  flowTemplateCategories,
  flowTemplates,
  type FlowTemplateCategory,
  type FlowTemplate,
} from "@/lib/mock-data/automations";
import Link from "next/link";

interface CreateFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFlowModal({ isOpen, onClose }: CreateFlowModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<FlowTemplateCategory>("all");

  const filtered =
    selectedCategory === "all"
      ? flowTemplates
      : flowTemplates.filter((t) => t.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-card w-full max-w-[900px] max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
              style={{ borderRadius: "16px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-separator">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary font-heading">Criar novo fluxo</h2>
                  <p className="text-[13px] text-text-muted mt-0.5">Escolha um template ou comece do zero</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-hover transition-colors"
                >
                  <X size={18} className="text-text-muted" />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Categories sidebar */}
                <div className="w-[200px] border-r border-separator py-3 flex-shrink-0">
                  {flowTemplateCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-[13px] font-medium transition-colors"
                      style={{
                        background:
                          selectedCategory === cat.key ? "rgba(242,107,42,0.08)" : "transparent",
                        color: selectedCategory === cat.key ? "#F26B2A" : "#555",
                        borderRight:
                          selectedCategory === cat.key ? "2px solid #F26B2A" : "2px solid transparent",
                      }}
                    >
                      {cat.label}
                      <span
                        className="text-[11px] px-1.5 py-0.5 rounded-full"
                        style={{
                          background:
                            selectedCategory === cat.key
                              ? "rgba(242,107,42,0.12)"
                              : "rgba(0,0,0,0.05)",
                          color: selectedCategory === cat.key ? "#F26B2A" : "#888",
                        }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Templates grid */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Create from scratch card */}
                    <Link
                      href="/automations/new/builder"
                      onClick={onClose}
                      className="flex flex-col items-center justify-center gap-3 py-8 border-2 border-dashed border-border hover:border-worder-primary/40 hover:bg-worder-primary/5 transition-all cursor-pointer"
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-worder-primary/10">
                        <Plus size={24} weight="bold" className="text-worder-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-text-primary">Criar do zero</p>
                        <p className="text-[11px] text-text-muted mt-0.5">Fluxo em branco</p>
                      </div>
                    </Link>

                    {/* Template cards */}
                    {filtered.map((template, i) => (
                      <TemplateCard key={template.id} template={template} index={i} onClose={onClose} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TemplateCard({
  template,
  index,
  onClose,
}: {
  template: FlowTemplate;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Link
        href={`/automations/new/builder`}
        onClick={onClose}
        className="block p-4 border border-border hover:border-worder-primary hover:shadow-md transition-all group"
        style={{ borderRadius: "12px" }}
      >
        {/* Mini flow preview placeholder */}
        <div
          className="h-[60px] bg-background mb-3 flex items-center justify-center gap-2 overflow-hidden"
          style={{ borderRadius: "8px" }}
        >
          <div className="w-8 h-4 rounded bg-gradient-to-r from-[#F26B2A] to-[#F5A623]" />
          <div className="w-4 h-px bg-[#DDD]" />
          <div className="w-8 h-4 rounded bg-border" />
          <div className="w-4 h-px bg-[#DDD]" />
          <div className="w-8 h-4 rounded bg-border" />
          <div className="w-4 h-px bg-[#DDD]" />
          <div className="w-8 h-4 rounded bg-border" />
        </div>

        <p className="text-[13px] font-semibold text-text-primary group-hover:text-worder-primary transition-colors">
          {template.name}
        </p>
        <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">{template.description}</p>
        <div className="flex items-center gap-1 mt-2">
          {template.channels.map((ch) => (
            <ChannelBadge key={ch} channel={ch} className="!text-[10px] !px-1.5 !py-0.5" />
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
