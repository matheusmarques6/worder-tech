"use client";

import {
  ArrowLeft,
  FloppyDisk,
  Rocket,
  Plus,
} from "@phosphor-icons/react";
import { StatusBadge } from "@/components/shared/status-badge";
import { useFormEditorStore } from "@/stores/form-editor-store";
import type { PopupStep } from "@/lib/mock-data/forms";
import Link from "next/link";

const stepOrder: { id: PopupStep; label: string }[] = [
  { id: "teaser", label: "Teaser" },
  { id: "optin", label: "Email Opt-in" },
  { id: "step2", label: "Etapa 2" },
  { id: "success", label: "Sucesso" },
];

export function FormEditorNavbar() {
  const { name, setName, activeStep, setActiveStep, steps } = useFormEditorStore();

  // Only show steps that exist in data
  const existingStepIds = new Set(steps.map((s) => s.id));
  const visibleSteps = stepOrder.filter((s) => existingStepIds.has(s.id));

  return (
    <div className="h-14 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link
          href="/site/forms"
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
          className="text-sm font-semibold text-text-primary bg-transparent border-none outline-none max-w-[180px]"
        />
        <StatusBadge status="active" />
      </div>

      {/* Center — Steps */}
      <div className="flex items-center gap-1 overflow-x-auto mx-4">
        {visibleSteps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1">
            {i > 0 && <div className="w-6 h-px bg-[#E0E0E0] flex-shrink-0" />}
            <button
              onClick={() => setActiveStep(step.id)}
              className="relative px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-all flex-shrink-0"
              style={{
                borderRadius: "8px",
                background:
                  activeStep === step.id
                    ? "linear-gradient(135deg, #F26B2A, #F5A623)"
                    : "transparent",
                color: activeStep === step.id ? "white" : "#888",
              }}
            >
              {step.label}
            </button>
          </div>
        ))}
        <div className="w-6 h-px bg-[#E0E0E0] flex-shrink-0" />
        <button
          className="flex items-center justify-center w-7 h-7 rounded-lg border border-dashed border-[#DDD] text-text-muted hover:border-worder-primary hover:text-worder-primary transition-colors flex-shrink-0"
        >
          <Plus size={12} weight="bold" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0">
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
          <Rocket size={15} weight="fill" />
          <span className="hidden lg:inline">Publicar</span>
        </button>
      </div>
    </div>
  );
}
