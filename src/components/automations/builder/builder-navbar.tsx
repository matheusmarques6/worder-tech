"use client";

import { useState } from "react";
import {
  ArrowLeft,
  FloppyDisk,
  ArrowRight,
} from "@phosphor-icons/react";
import { StatusBadge } from "@/components/shared/status-badge";
import { useFlowBuilderStore } from "@/stores/flow-builder-store";
import Link from "next/link";

export function BuilderNavbar() {
  const { name, setName, status, setStatus } = useFlowBuilderStore();
  const [isActive, setIsActive] = useState(status === "active");

  function handleToggle() {
    const newActive = !isActive;
    setIsActive(newActive);
    setStatus(newActive ? "active" : "draft");
  }

  return (
    <div className="h-14 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Link
          href="/automations"
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
        <StatusBadge status={status} />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Toggle On/Off */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-text-muted">
            {isActive ? "Ativo" : "Inativo"}
          </span>
          <button
            onClick={handleToggle}
            className="relative w-11 h-6 rounded-full transition-colors duration-200"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #F26B2A, #F5A623)"
                : "#DDD",
            }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{
                transform: isActive ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </button>
        </div>

        <div className="w-px h-6 bg-[#E0E0E0]" />

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors"
          style={{ borderRadius: "8px" }}
        >
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
          <span className="hidden lg:inline">Salvar e Fechar</span>
          <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
