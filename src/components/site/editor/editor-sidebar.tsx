"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Eye,
  PlusCircle,
  TextT,
  CursorClick,
  Image as ImageIcon,
  Ticket,
  Timer,
  SpinnerGap,
  Star,
  Envelope,
  TextAa,
  Phone,
  CalendarBlank,
  CaretDown,
  CheckSquare,
} from "@phosphor-icons/react";
import { useFormEditorStore } from "@/stores/form-editor-store";
import type { ReactNode } from "react";

type SidebarTab = "styles" | "targeting" | "blocks";

const tabConfig: { key: SidebarTab; label: string; icon: ReactNode }[] = [
  { key: "styles", label: "Estilos", icon: <Palette size={16} weight="fill" /> },
  { key: "targeting", label: "Segmentação", icon: <Eye size={16} weight="fill" /> },
  { key: "blocks", label: "Blocos", icon: <PlusCircle size={16} weight="fill" /> },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{
        width: "40px",
        height: "22px",
        background: checked ? "linear-gradient(135deg, #F26B2A, #F5A623)" : "#DDD",
      }}
    >
      <div
        className="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-background-card shadow-sm transition-transform duration-200"
        style={{ transform: checked ? "translateX(20px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );
}

function StylesTab() {
  const { styles, setStyles } = useFormEditorStore();

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>Cor de fundo</FieldLabel>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-border cursor-pointer hover:ring-2 hover:ring-worder-primary/20"
            style={{ background: styles.bgColor }}
          />
          <input
            type="text"
            value={styles.bgColor}
            onChange={(e) => setStyles({ bgColor: e.target.value })}
            className="flex-1 px-2.5 py-1.5 text-[12px] font-mono bg-bg-hover border-none rounded-md outline-none"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Cor do overlay</FieldLabel>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-border cursor-pointer hover:ring-2 hover:ring-worder-primary/20"
            style={{ background: styles.overlayColor }}
          />
          <input
            type="text"
            value={styles.overlayColor}
            onChange={(e) => setStyles({ overlayColor: e.target.value })}
            className="flex-1 px-2.5 py-1.5 text-[12px] font-mono bg-bg-hover border-none rounded-md outline-none"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Posição</FieldLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {(["top", "center", "bottom"] as const).map((pos) => (
            <button
              key={pos}
              onClick={() => setStyles({ position: pos })}
              className="py-2 text-[11px] font-medium capitalize transition-all"
              style={{
                borderRadius: "8px",
                background: styles.position === pos ? "rgba(242,107,42,0.1)" : "#F5F5F5",
                color: styles.position === pos ? "#F26B2A" : "#888",
                border: styles.position === pos ? "1px solid rgba(242,107,42,0.3)" : "1px solid transparent",
              }}
            >
              {pos === "center" ? "Centro" : pos === "top" ? "Topo" : "Rodapé"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Animação de entrada</FieldLabel>
        <div className="grid grid-cols-2 gap-1.5">
          {(["fade", "slide-up", "slide-down", "scale"] as const).map((anim) => (
            <button
              key={anim}
              onClick={() => setStyles({ animation: anim })}
              className="py-2 text-[11px] font-medium capitalize transition-all"
              style={{
                borderRadius: "8px",
                background: styles.animation === anim ? "rgba(242,107,42,0.1)" : "#F5F5F5",
                color: styles.animation === anim ? "#F26B2A" : "#888",
                border: styles.animation === anim ? "1px solid rgba(242,107,42,0.3)" : "1px solid transparent",
              }}
            >
              {anim}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Border radius</FieldLabel>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={32}
            value={styles.borderRadius}
            onChange={(e) => setStyles({ borderRadius: parseInt(e.target.value) })}
            className="flex-1 accent-[#F26B2A]"
          />
          <span className="text-[12px] font-mono text-text-muted w-10 text-right">{styles.borderRadius}px</span>
        </div>
      </div>

      <div>
        <FieldLabel>Shadow</FieldLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {(["none", "sm", "md", "lg"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyles({ shadow: s })}
              className="py-2 text-[11px] font-medium uppercase transition-all"
              style={{
                borderRadius: "8px",
                background: styles.shadow === s ? "rgba(242,107,42,0.1)" : "#F5F5F5",
                color: styles.shadow === s ? "#F26B2A" : "#888",
                border: styles.shadow === s ? "1px solid rgba(242,107,42,0.3)" : "1px solid transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TargetingTab() {
  const {
    displayRules,
    setDisplayRules,
    targetingRules,
    setTargetingRules,
    frequencyRules,
    setFrequencyRules,
  } = useFormEditorStore();

  const [subTab, setSubTab] = useState<"display" | "targeting">("display");

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex bg-bg-hover p-0.5" style={{ borderRadius: "8px" }}>
        {(["display", "targeting"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className="flex-1 py-1.5 text-[11px] font-medium transition-all"
            style={{
              borderRadius: "6px",
              background: subTab === t ? "white" : "transparent",
              color: subTab === t ? "#1A1A1A" : "#888",
              boxShadow: subTab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t === "display" ? "Exibição" : "Segmentação"}
          </button>
        ))}
      </div>

      {subTab === "display" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-text-primary">Quando visitante está saindo</p>
              <p className="text-[10px] text-text-muted">Exit intent detection</p>
            </div>
            <Toggle checked={displayRules.exitIntent} onChange={(v) => setDisplayRules({ exitIntent: v })} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-text-primary">Após atraso</p>
              <p className="text-[10px] text-text-muted">Delay em segundos</p>
            </div>
            <div className="flex items-center gap-2">
              {displayRules.delay && (
                <input
                  type="number"
                  value={displayRules.delaySeconds}
                  onChange={(e) => setDisplayRules({ delaySeconds: parseInt(e.target.value) || 0 })}
                  className="w-14 px-2 py-1 text-[12px] text-center bg-bg-hover border-none rounded-md outline-none"
                  min={1}
                />
              )}
              <Toggle checked={displayRules.delay} onChange={(v) => setDisplayRules({ delay: v })} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-text-primary">Após scroll</p>
              <p className="text-[10px] text-text-muted">% da página</p>
            </div>
            <div className="flex items-center gap-2">
              {displayRules.scroll && (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={displayRules.scrollPercent}
                    onChange={(e) => setDisplayRules({ scrollPercent: parseInt(e.target.value) || 0 })}
                    className="w-14 px-2 py-1 text-[12px] text-center bg-bg-hover border-none rounded-md outline-none"
                    min={1}
                    max={100}
                  />
                  <span className="text-[10px] text-text-muted">%</span>
                </div>
              )}
              <Toggle checked={displayRules.scroll} onChange={(v) => setDisplayRules({ scroll: v })} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-text-primary">Após X páginas visitadas</p>
            </div>
            <div className="flex items-center gap-2">
              {displayRules.pageViews && (
                <input
                  type="number"
                  value={displayRules.pageViewsCount}
                  onChange={(e) => setDisplayRules({ pageViewsCount: parseInt(e.target.value) || 0 })}
                  className="w-14 px-2 py-1 text-[12px] text-center bg-bg-hover border-none rounded-md outline-none"
                  min={1}
                />
              )}
              <Toggle checked={displayRules.pageViews} onChange={(v) => setDisplayRules({ pageViews: v })} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
            <p className="text-[12px] font-medium text-text-primary">Mostrar somente se todas as condições</p>
            <Toggle checked={displayRules.allConditions} onChange={(v) => setDisplayRules({ allConditions: v })} />
          </div>

          {/* Frequency */}
          <div className="pt-3 border-t border-border-subtle space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60">Frequência</p>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-text-primary">Não mostrar se já enviou</p>
              <Toggle checked={frequencyRules.hideAfterSubmit} onChange={(v) => setFrequencyRules({ hideAfterSubmit: v })} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-text-primary">Mostrar novamente após</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={frequencyRules.showAgainDays}
                  onChange={(e) => setFrequencyRules({ showAgainDays: parseInt(e.target.value) || 0 })}
                  className="w-12 px-2 py-1 text-[12px] text-center bg-bg-hover border-none rounded-md outline-none"
                  min={1}
                />
                <span className="text-[10px] text-text-muted">dias</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === "targeting" && (
        <div className="space-y-4">
          <div>
            <FieldLabel>Visitantes</FieldLabel>
            <select
              value={targetingRules.visitors}
              onChange={(e) => setTargetingRules({ visitors: e.target.value as "all" | "new" | "returning" })}
              className="w-full px-3 py-2 text-[12px] bg-bg-hover border-none rounded-lg outline-none"
            >
              <option value="all">Todos</option>
              <option value="new">Novos visitantes</option>
              <option value="returning">Visitantes recorrentes</option>
            </select>
          </div>
          <div>
            <FieldLabel>Dispositivo</FieldLabel>
            <select
              value={targetingRules.device}
              onChange={(e) => setTargetingRules({ device: e.target.value as "all" | "mobile" | "desktop" })}
              className="w-full px-3 py-2 text-[12px] bg-bg-hover border-none rounded-lg outline-none"
            >
              <option value="all">Todos</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
            </select>
          </div>
          <div>
            <FieldLabel>URL contém</FieldLabel>
            <input
              type="text"
              value={targetingRules.urlContains}
              onChange={(e) => setTargetingRules({ urlContains: e.target.value })}
              placeholder="/colecao/verao"
              className="w-full px-3 py-2 text-[12px] bg-bg-hover border-none rounded-lg outline-none placeholder:text-text-muted/40"
            />
          </div>
          <div>
            <FieldLabel>Fonte de tráfego</FieldLabel>
            <select
              value={targetingRules.trafficSource}
              onChange={(e) => setTargetingRules({ trafficSource: e.target.value as "all" | "google" | "facebook" | "instagram" | "direct" })}
              className="w-full px-3 py-2 text-[12px] bg-bg-hover border-none rounded-lg outline-none"
            >
              <option value="all">Todos</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="direct">Direto</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

interface BlockItem {
  type: string;
  label: string;
  icon: ReactNode;
}

const elementBlocks: BlockItem[] = [
  { type: "text", label: "Texto", icon: <TextT size={20} weight="fill" /> },
  { type: "button", label: "Botão", icon: <CursorClick size={20} weight="fill" /> },
  { type: "image", label: "Imagem", icon: <ImageIcon size={20} weight="fill" /> },
  { type: "coupon", label: "Cupom", icon: <Ticket size={20} weight="fill" /> },
  { type: "timer", label: "Timer", icon: <Timer size={20} weight="fill" /> },
  { type: "spinner", label: "Gire p/ ganhar", icon: <SpinnerGap size={20} weight="fill" /> },
  { type: "rating", label: "Avaliações", icon: <Star size={20} weight="fill" /> },
];

const fieldBlocks: BlockItem[] = [
  { type: "email_input", label: "E-mail", icon: <Envelope size={20} weight="fill" /> },
  { type: "text_input", label: "Texto", icon: <TextAa size={20} weight="bold" /> },
  { type: "phone_input", label: "Telefone", icon: <Phone size={20} weight="fill" /> },
  { type: "date_input", label: "Data", icon: <CalendarBlank size={20} weight="fill" /> },
  { type: "dropdown", label: "Dropdown", icon: <CaretDown size={20} weight="bold" /> },
  { type: "checkbox", label: "Checkbox", icon: <CheckSquare size={20} weight="fill" /> },
];

function BlocksTab() {
  const { addBlock, activeStep } = useFormEditorStore();

  function handleAddBlock(item: BlockItem) {
    addBlock(activeStep, {
      id: "",
      type: item.type as PopupBlock["type"],
      content: item.label,
      props: {},
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 mb-2">Elementos</p>
        <div className="grid grid-cols-3 gap-2">
          {elementBlocks.map((block) => (
            <motion.button
              key={block.type}
              whileHover={{ scale: 1.04 }}
              onClick={() => handleAddBlock(block)}
              className="flex flex-col items-center justify-center h-[68px] bg-bg-hover border border-transparent hover:bg-background-card hover:border-worder-primary/30 hover:shadow-sm transition-all cursor-pointer"
              style={{ borderRadius: "10px" }}
            >
              <div className="text-text-muted">{block.icon}</div>
              <span className="text-[10px] text-text-muted font-medium mt-1">{block.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 mb-2">Campos</p>
        <div className="grid grid-cols-3 gap-2">
          {fieldBlocks.map((block) => (
            <motion.button
              key={block.type}
              whileHover={{ scale: 1.04 }}
              onClick={() => handleAddBlock(block)}
              className="flex flex-col items-center justify-center h-[68px] bg-bg-hover border border-transparent hover:bg-background-card hover:border-worder-primary/30 hover:shadow-sm transition-all cursor-pointer"
              style={{ borderRadius: "10px" }}
            >
              <div className="text-text-muted">{block.icon}</div>
              <span className="text-[10px] text-text-muted font-medium mt-1">{block.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Need to import PopupBlock type for addBlock
import type { PopupBlock } from "@/lib/mock-data/forms";

export function EditorSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("styles");

  return (
    <div className="w-[280px] bg-background-card border-r border-border flex flex-col flex-shrink-0 h-full">
      {/* Tab buttons */}
      <div className="flex border-b border-border">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="relative flex-1 py-3 text-[11px] font-medium transition-colors"
            style={{ color: activeTab === tab.key ? "#F26B2A" : "#888" }}
          >
            <div className="flex items-center justify-center gap-1">
              {tab.icon}
              {tab.label}
            </div>
            {activeTab === tab.key && (
              <motion.div
                layoutId="form-sidebar-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "styles" && <StylesTab />}
        {activeTab === "targeting" && <TargetingTab />}
        {activeTab === "blocks" && <BlocksTab />}
      </div>
    </div>
  );
}
