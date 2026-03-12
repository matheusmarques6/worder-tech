"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Desktop,
  DeviceTablet,
  DeviceMobileCamera,
  Trash,
  Copy as CopyIcon,
  X,
} from "@phosphor-icons/react";
import { useFormEditorStore } from "@/stores/form-editor-store";
import type { PopupBlock } from "@/lib/mock-data/forms";

const deviceSizes = {
  desktop: { width: 500, height: 700, label: "Desktop" },
  tablet: { width: 400, height: 600, label: "Tablet" },
  phone: { width: 320, height: 580, label: "Celular" },
};

function shadowValue(s: string) {
  switch (s) {
    case "sm": return "0 2px 8px rgba(0,0,0,0.1)";
    case "md": return "0 4px 16px rgba(0,0,0,0.15)";
    case "lg": return "0 8px 32px rgba(0,0,0,0.2)";
    default: return "none";
  }
}

function BlockRenderer({
  block,
  isSelected,
  onSelect,
}: {
  block: PopupBlock;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className="relative cursor-pointer transition-all"
      style={{
        outline: isSelected ? "2px solid #F26B2A" : "2px solid transparent",
        outlineOffset: "2px",
        borderRadius: "4px",
      }}
    >
      {/* Delete button on selection */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 flex gap-0.5 z-10">
          <button className="flex items-center justify-center w-5 h-5 rounded bg-background-card border border-border shadow-sm hover:bg-error/10 transition-colors">
            <Trash size={10} className="text-error" />
          </button>
        </div>
      )}

      {renderBlockContent(block)}
    </div>
  );
}

function renderBlockContent(block: PopupBlock) {
  const props = block.props;

  switch (block.type) {
    case "heading":
      return (
        <h2
          className="py-1.5"
          style={{
            fontSize: `${props.fontSize || 24}px`,
            fontWeight: props.fontWeight || "bold",
            color: props.color || "#1A1A1A",
            textAlign: (props.align as "left" | "center" | "right") || "center",
          }}
        >
          {block.content}
        </h2>
      );

    case "text":
      return (
        <p
          className="py-1"
          style={{
            fontSize: `${props.fontSize || 14}px`,
            fontWeight: props.fontWeight || "normal",
            color: props.color || "#666",
            textAlign: (props.align as "left" | "center" | "right") || "center",
          }}
        >
          {block.content}
        </p>
      );

    case "email_input":
      return (
        <div className="py-1.5">
          <input
            type="email"
            placeholder={props.placeholder || "seu@email.com"}
            className="w-full px-4 py-3 text-sm bg-bg-hover border border-border outline-none pointer-events-none"
            style={{ borderRadius: "10px" }}
            readOnly
          />
        </div>
      );

    case "phone_input":
      return (
        <div className="py-1.5">
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-3 text-sm bg-bg-hover border border-border outline-none pointer-events-none"
            style={{ borderRadius: "10px" }}
            readOnly
          />
        </div>
      );

    case "text_input":
      return (
        <div className="py-1.5">
          <input
            type="text"
            placeholder={block.content || "Digite aqui..."}
            className="w-full px-4 py-3 text-sm bg-bg-hover border border-border outline-none pointer-events-none"
            style={{ borderRadius: "10px" }}
            readOnly
          />
        </div>
      );

    case "button":
      return (
        <div className="py-2 text-center">
          <button
            className="px-8 py-3 text-sm font-bold tracking-wide pointer-events-none"
            style={{
              background: props.bgColor || "#F26B2A",
              color: props.textColor || "#FFFFFF",
              fontSize: `${props.fontSize || 14}px`,
              borderRadius: "10px",
            }}
          >
            {block.content}
          </button>
        </div>
      );

    case "link":
      return (
        <div
          className="py-1"
          style={{ textAlign: (props.align as "left" | "center" | "right") || "center" }}
        >
          <span
            className="underline cursor-pointer pointer-events-none"
            style={{
              color: props.color || "#999",
              fontSize: `${props.fontSize || 12}px`,
            }}
          >
            {block.content}
          </span>
        </div>
      );

    case "coupon":
      return (
        <div className="py-2 flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed"
            style={{
              background: props.bgColor || "#F5F5F5",
              borderColor: props.textColor || "#F26B2A",
              borderRadius: "10px",
            }}
          >
            <span
              className="font-mono font-bold tracking-widest"
              style={{
                color: props.textColor || "#F26B2A",
                fontSize: `${props.fontSize || 20}px`,
              }}
            >
              {block.content}
            </span>
            <CopyIcon size={16} style={{ color: props.textColor || "#F26B2A" }} />
          </div>
        </div>
      );

    case "timer":
      return (
        <div className="py-2 flex justify-center gap-2">
          {["12", "34", "56"].map((n, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-mono">{n}</span>
              </div>
              <span className="text-[9px] text-text-muted mt-1">
                {i === 0 ? "horas" : i === 1 ? "min" : "seg"}
              </span>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <div className="py-2">
          <div className="w-full h-24 bg-border-subtle rounded-lg flex items-center justify-center">
            <span className="text-[11px] text-text-muted">Imagem</span>
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="py-1.5 flex items-center gap-2">
          <div className="w-4 h-4 border border-[#DDD] rounded pointer-events-none" />
          <span className="text-[12px] text-text-secondary">{block.content || "Aceito os termos"}</span>
        </div>
      );

    default:
      return (
        <div className="py-2 px-3 bg-bg-hover rounded-lg text-[11px] text-text-muted text-center">
          {block.type}: {block.content}
        </div>
      );
  }
}

export function PopupPreview() {
  const {
    steps,
    activeStep,
    selectedBlockId,
    selectBlock,
    styles,
    previewDevice,
    setPreviewDevice,
  } = useFormEditorStore();

  const currentStep = steps.find((s) => s.id === activeStep);
  const device = deviceSizes[previewDevice];
  const isTeaser = activeStep === "teaser";

  return (
    <div className="flex-1 bg-[#E8E8E8] flex flex-col overflow-hidden">
      {/* Device toggle */}
      <div className="flex items-center justify-center gap-1 py-2 bg-background-card/80 border-b border-border">
        {([
          { key: "desktop" as const, icon: <Desktop size={16} /> },
          { key: "tablet" as const, icon: <DeviceTablet size={16} /> },
          { key: "phone" as const, icon: <DeviceMobileCamera size={16} /> },
        ]).map(({ key, icon }) => (
          <button
            key={key}
            onClick={() => setPreviewDevice(key)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium transition-all rounded-lg"
            style={{
              background: previewDevice === key ? "rgba(242,107,42,0.1)" : "transparent",
              color: previewDevice === key ? "#F26B2A" : "#888",
            }}
          >
            {icon}
            {device.label === deviceSizes[key].label && previewDevice === key && (
              <span>{deviceSizes[key].label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <motion.div
          animate={{ width: device.width, height: device.height }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative bg-background-card overflow-hidden flex-shrink-0"
          style={{
            borderRadius: previewDevice === "phone" ? "32px" : previewDevice === "tablet" ? "20px" : "12px",
            border: previewDevice === "phone" ? "8px solid #1A1A1A" : previewDevice === "tablet" ? "6px solid #1A1A1A" : "2px solid #DDD",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          }}
        >
          {/* Phone notch */}
          {previewDevice === "phone" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-[#1A1A1A] rounded-b-2xl z-20" />
          )}

          {/* Simulated site background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0F0F0] to-[#E0E0E0]">
            {/* Fake nav */}
            <div className="h-8 bg-background-card/80 border-b border-border flex items-center px-3 gap-2">
              <div className="w-12 h-2 bg-[#DDD] rounded" />
              <div className="flex-1" />
              <div className="w-6 h-2 bg-[#DDD] rounded" />
              <div className="w-6 h-2 bg-[#DDD] rounded" />
            </div>
            {/* Fake content */}
            <div className="p-4 space-y-3">
              <div className="w-3/4 h-3 bg-[#DDD] rounded" />
              <div className="w-1/2 h-3 bg-[#DDD] rounded" />
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-[#DDD] rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Popup overlay + content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                background: isTeaser ? "transparent" : styles.overlayColor,
                alignItems:
                  isTeaser
                    ? "flex-end"
                    : styles.position === "top"
                      ? "flex-start"
                      : styles.position === "bottom"
                        ? "flex-end"
                        : "center",
                padding: isTeaser ? "0" : "16px",
              }}
              onClick={() => selectBlock(null)}
            >
              <motion.div
                initial={
                  styles.animation === "fade"
                    ? { opacity: 0 }
                    : styles.animation === "slide-up"
                      ? { y: 30, opacity: 0 }
                      : styles.animation === "slide-down"
                        ? { y: -30, opacity: 0 }
                        : { scale: 0.9, opacity: 0 }
                }
                animate={
                  styles.animation === "fade"
                    ? { opacity: 1 }
                    : styles.animation === "slide-up"
                      ? { y: 0, opacity: 1 }
                      : styles.animation === "slide-down"
                        ? { y: 0, opacity: 1 }
                        : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.3, delay: 0.1 }}
                className="relative"
                style={{
                  background: isTeaser
                    ? "linear-gradient(135deg, #F26B2A, #F5A623)"
                    : styles.bgColor,
                  borderRadius: isTeaser
                    ? "12px 12px 0 0"
                    : `${styles.borderRadius}px`,
                  boxShadow: isTeaser ? "0 -4px 16px rgba(0,0,0,0.1)" : shadowValue(styles.shadow),
                  width: isTeaser ? "100%" : "90%",
                  maxWidth: isTeaser ? "100%" : "340px",
                  padding: isTeaser ? "12px 16px" : "24px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button (non-teaser) */}
                {!isTeaser && (
                  <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 transition-colors">
                    <X size={14} className="text-text-muted" />
                  </button>
                )}

                {/* Blocks */}
                <div className="space-y-1">
                  {currentStep?.blocks.map((block) => (
                    <BlockRenderer
                      key={block.id}
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => selectBlock(block.id)}
                    />
                  ))}
                </div>

                {(!currentStep || currentStep.blocks.length === 0) && (
                  <div className="py-8 text-center text-[12px] text-text-muted">
                    Arraste blocos da sidebar para começar
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
