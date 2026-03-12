"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Desktop,
  DeviceMobileCamera,
  Eye,
  FloppyDisk,
  ArrowRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EditorNavbarProps {
  previewMode: "desktop" | "mobile";
  onPreviewModeChange: (mode: "desktop" | "mobile") => void;
}

export function EditorNavbar({ previewMode, onPreviewModeChange }: EditorNavbarProps) {
  const [name, setName] = useState("Promoção Dia da Mulher");

  return (
    <div className="h-14 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Link
          href="/campaigns"
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-[#F0F0F0]"
        >
          <ArrowLeft size={16} weight="bold" />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <div className="w-px h-6 bg-[#E0E0E0]" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm font-semibold text-text-primary bg-transparent border-none outline-none max-w-[200px] lg:max-w-[300px]"
        />
        <Badge variant="default" size="sm">Rascunho</Badge>
      </div>

      {/* Center — Preview toggle */}
      <div className="flex items-center bg-[#F0F0F0] p-0.5" style={{ borderRadius: "10px" }}>
        <button
          onClick={() => onPreviewModeChange("desktop")}
          className="relative flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all rounded-lg"
          style={{
            background: previewMode === "desktop" ? "white" : "transparent",
            boxShadow: previewMode === "desktop" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            color: previewMode === "desktop" ? "#1A1A1A" : "#888",
          }}
        >
          <Desktop size={16} weight={previewMode === "desktop" ? "fill" : "regular"} />
          Desktop
        </button>
        <button
          onClick={() => onPreviewModeChange("mobile")}
          className="relative flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all rounded-lg"
          style={{
            background: previewMode === "mobile" ? "white" : "transparent",
            boxShadow: previewMode === "mobile" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            color: previewMode === "mobile" ? "#1A1A1A" : "#888",
          }}
        >
          <DeviceMobileCamera size={16} weight={previewMode === "mobile" ? "fill" : "regular"} />
          Celular
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors" style={{ borderRadius: "8px" }}>
          <Eye size={15} weight="fill" />
          <span className="hidden lg:inline">Visualizar</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors" style={{ borderRadius: "8px" }}>
          <FloppyDisk size={15} weight="fill" />
          <span className="hidden lg:inline">Salvar</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
          style={{
            borderRadius: "8px",
            background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
            boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
          }}
        >
          <span className="hidden lg:inline">Próximo</span>
          <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
