"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TextT,
  Image as ImageIcon,
  CursorClick,
  Minus,
  ArrowsVertical,
  Code,
  Package,
  Ticket,
  Timer,
  Star,
  Columns,
  Square,
  Palette,
  TextAa,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

interface BlockItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
}

const basicBlocks: BlockItem[] = [
  { id: "text", label: "Texto", icon: <TextT size={24} weight="fill" /> },
  { id: "image", label: "Imagem", icon: <ImageIcon size={24} weight="fill" /> },
  { id: "button", label: "Botão", icon: <CursorClick size={24} weight="fill" /> },
  { id: "divider", label: "Divisor", icon: <Minus size={24} weight="bold" /> },
  { id: "spacer", label: "Espaçador", icon: <ArrowsVertical size={24} weight="bold" /> },
  { id: "html", label: "HTML", icon: <Code size={24} weight="bold" /> },
];

const ecommerceBlocks: BlockItem[] = [
  { id: "product", label: "Produto", icon: <Package size={24} weight="fill" />, badge: "Dinâmico" },
  { id: "coupon", label: "Cupom", icon: <Ticket size={24} weight="fill" /> },
  { id: "timer", label: "Timer", icon: <Timer size={24} weight="fill" /> },
  { id: "rating", label: "Avaliação", icon: <Star size={24} weight="fill" /> },
];

const layoutBlocks: BlockItem[] = [
  { id: "columns", label: "Colunas", icon: <Columns size={24} weight="fill" /> },
  { id: "section", label: "Seção", icon: <Square size={24} weight="fill" /> },
];

function BlockCard({ block }: { block: BlockItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex flex-col items-center justify-center h-[72px] bg-bg-hover border border-transparent hover:bg-background-card hover:border-worder-primary/30 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing relative"
      style={{ borderRadius: "10px" }}
    >
      <div className="text-text-muted group-hover:text-worder-primary">
        {block.icon}
      </div>
      <span className="text-[11px] text-text-muted font-medium mt-1">{block.label}</span>
      {block.badge && (
        <span className="absolute top-1 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-worder-primary/10 text-worder-primary">
          {block.badge}
        </span>
      )}
    </motion.div>
  );
}

function BlockSection({ title, blocks }: { title: string; blocks: BlockItem[] }) {
  return (
    <div className="mb-5">
      <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 px-1">{title}</h4>
      <div className="grid grid-cols-3 gap-2">
        {blocks.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}

export function BlockSidebar() {
  const [activeTab, setActiveTab] = useState<"content" | "styles">("content");

  return (
    <div className="w-[260px] bg-background-card border-r border-border flex flex-col flex-shrink-0 h-full">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["content", "styles"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 py-3 text-[12px] font-medium transition-colors"
            style={{ color: activeTab === tab ? "#F26B2A" : "#888" }}
          >
            <div className="flex items-center justify-center gap-1.5">
              {tab === "content" ? <TextAa size={14} weight="bold" /> : <Palette size={14} weight="fill" />}
              {tab === "content" ? "Conteúdo" : "Estilos"}
            </div>
            {activeTab === tab && (
              <motion.div
                layoutId="editor-sidebar-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "content" ? (
          <>
            <BlockSection title="Básico" blocks={basicBlocks} />
            <BlockSection title="E-commerce" blocks={ecommerceBlocks} />
            <BlockSection title="Layout" blocks={layoutBlocks} />
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3">Cores globais</h4>
              <div className="space-y-3">
                {[
                  { label: "Fundo do e-mail", color: "#FFFFFF" },
                  { label: "Fundo do conteúdo", color: "#FFFFFF" },
                  { label: "Cor do texto", color: "#1A1A1A" },
                  { label: "Cor dos links", color: "#F26B2A" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[12px] text-text-secondary">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-md border border-border cursor-pointer hover:ring-2 hover:ring-worder-primary/20"
                        style={{ background: item.color }}
                      />
                      <span className="text-[11px] font-mono text-text-muted">{item.color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3">Tipografia</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Fonte</span>
                  <select
                    className="text-[12px] bg-bg-hover border-none rounded-md px-2 py-1 outline-none"
                  >
                    <option>Inter</option>
                    <option>Arial</option>
                    <option>Helvetica</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Tamanho base</span>
                  <select
                    className="text-[12px] bg-bg-hover border-none rounded-md px-2 py-1 outline-none"
                  >
                    <option>14px</option>
                    <option>16px</option>
                    <option>18px</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3">Espaçamento</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Largura max</span>
                  <select
                    className="text-[12px] bg-bg-hover border-none rounded-md px-2 py-1 outline-none"
                  >
                    <option>600px</option>
                    <option>640px</option>
                    <option>700px</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Padding</span>
                  <select
                    className="text-[12px] bg-bg-hover border-none rounded-md px-2 py-1 outline-none"
                  >
                    <option>20px</option>
                    <option>30px</option>
                    <option>40px</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
