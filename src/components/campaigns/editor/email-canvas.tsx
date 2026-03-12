"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Trash,
  DotsSixVertical,
  ArrowUp,
  ArrowDown,
  Plus,
} from "@phosphor-icons/react";

interface EmailBlock {
  id: string;
  type: "header" | "text" | "image" | "button" | "divider" | "spacer" | "product";
  content: string;
  props?: Record<string, string>;
}

const initialBlocks: EmailBlock[] = [
  {
    id: "b1",
    type: "header",
    content: "🌸 Promoção Dia da Mulher",
    props: { align: "center", color: "#F26B2A" },
  },
  {
    id: "b2",
    type: "image",
    content: "Banner principal",
    props: { src: "", alt: "Banner promoção", width: "100%" },
  },
  {
    id: "b3",
    type: "text",
    content: "Olá {{first_name}},\n\nPreparamos ofertas especiais para você celebrar o Dia da Mulher com estilo! Confira nossas peças selecionadas com até 40% OFF.",
  },
  {
    id: "b4",
    type: "product",
    content: "Produto em destaque",
    props: { name: "Vestido Midi Floral", price: "R$ 289,90", oldPrice: "R$ 399,90" },
  },
  {
    id: "b5",
    type: "button",
    content: "QUERO APROVEITAR 🔥",
    props: { color: "#F26B2A", textColor: "#FFFFFF", align: "center" },
  },
  {
    id: "b6",
    type: "divider",
    content: "",
  },
  {
    id: "b7",
    type: "text",
    content: "Ofertas válidas até 10/03. Não acumulável com outros cupons.",
    props: { size: "small", color: "#888" },
  },
];

interface EmailCanvasProps {
  previewMode: "desktop" | "mobile";
}

function BlockRenderer({ block }: { block: EmailBlock }) {
  switch (block.type) {
    case "header":
      return (
        <div className="py-6 px-4" style={{ textAlign: (block.props?.align as "center" | "left" | "right") || "center" }}>
          <h1 className="text-2xl font-bold" style={{ color: block.props?.color || "#1A1A1A" }}>
            {block.content}
          </h1>
        </div>
      );
    case "text":
      return (
        <div className="py-3 px-4">
          <p
            className="leading-relaxed whitespace-pre-line"
            style={{
              fontSize: block.props?.size === "small" ? "12px" : "14px",
              color: block.props?.color || "#333",
            }}
          >
            {block.content}
          </p>
        </div>
      );
    case "image":
      return (
        <div className="py-2 px-4">
          <div
            className="w-full h-[200px] bg-border-subtle flex items-center justify-center rounded-lg border-2 border-dashed border-[#DDD]"
          >
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <ImageIcon size={32} weight="fill" />
              <span className="text-[12px] font-medium">{block.content || "Clique para adicionar imagem"}</span>
            </div>
          </div>
        </div>
      );
    case "button":
      return (
        <div className="py-4 px-4" style={{ textAlign: (block.props?.align as "center" | "left" | "right") || "center" }}>
          <button
            className="inline-flex px-8 py-3 text-sm font-bold tracking-wide"
            style={{
              background: block.props?.color || "#F26B2A",
              color: block.props?.textColor || "#FFFFFF",
              borderRadius: "10px",
            }}
          >
            {block.content}
          </button>
        </div>
      );
    case "divider":
      return (
        <div className="py-3 px-4">
          <hr className="border-border" />
        </div>
      );
    case "spacer":
      return <div className="h-6" />;
    case "product":
      return (
        <div className="py-3 px-4">
          <div className="flex gap-4 p-4 border border-border rounded-xl">
            <div className="w-20 h-20 bg-border-subtle rounded-lg flex items-center justify-center">
              <ImageIcon size={24} className="text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-[#1A1A1A]">{block.props?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-bold text-[#F26B2A]">{block.props?.price}</span>
                {block.props?.oldPrice && (
                  <span className="text-xs text-text-muted line-through">{block.props?.oldPrice}</span>
                )}
              </div>
              <span className="text-[10px] text-white bg-[#F26B2A] px-2 py-0.5 rounded-full mt-1 inline-block font-bold">
                -27% OFF
              </span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function EmailCanvas({ previewMode }: EmailCanvasProps) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  function moveBlock(id: string, direction: "up" | "down") {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      if (direction === "up" && idx === 0) return prev;
      if (direction === "down" && idx === prev.length - 1) return prev;
      const newBlocks = [...prev];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      [newBlocks[idx], newBlocks[swapIdx]] = [newBlocks[swapIdx], newBlocks[idx]];
      return newBlocks;
    });
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(null);
  }

  return (
    <div className="flex-1 bg-[#E8E8E8] overflow-y-auto flex justify-center py-8 px-4">
      <motion.div
        animate={{ width: previewMode === "desktop" ? 600 : 375 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-background-card shadow-xl relative"
        style={{ borderRadius: "8px", minHeight: "600px" }}
      >
        {/* Email preview */}
        <AnimatePresence mode="popLayout">
          {blocks.map((block) => {
            const isSelected = selectedBlock === block.id;
            return (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative group"
                onClick={() => setSelectedBlock(block.id)}
              >
                {/* Selection border */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-150 z-10"
                  style={{
                    border: isSelected ? "2px solid #F26B2A" : "2px solid transparent",
                    borderRadius: "4px",
                  }}
                />

                {/* Hover toolbar */}
                <div
                  className={`absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 z-20 transition-opacity duration-150 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "up"); }}
                    className="p-1 bg-background-card border border-border rounded hover:bg-bg-hover transition-colors shadow-sm"
                  >
                    <ArrowUp size={12} className="text-text-muted" />
                  </button>
                  <button className="p-1 bg-background-card border border-border rounded cursor-grab active:cursor-grabbing shadow-sm">
                    <DotsSixVertical size={12} className="text-text-muted" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "down"); }}
                    className="p-1 bg-background-card border border-border rounded hover:bg-bg-hover transition-colors shadow-sm"
                  >
                    <ArrowDown size={12} className="text-text-muted" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                  className={`absolute -right-9 top-1/2 -translate-y-1/2 p-1.5 bg-background-card border border-border rounded hover:bg-error/10 hover:border-error/30 transition-all shadow-sm z-20 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  <Trash size={12} className="text-error" />
                </button>

                <BlockRenderer block={block} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Add block button */}
        <div className="flex items-center justify-center py-6">
          <button className="flex items-center gap-2 px-4 py-2 text-[12px] font-medium text-text-muted border border-dashed border-[#DDD] hover:border-worder-primary/40 hover:text-worder-primary rounded-lg transition-colors">
            <Plus size={14} weight="bold" />
            Adicionar bloco
          </button>
        </div>
      </motion.div>
    </div>
  );
}
