"use client";

import { cn } from "@/lib/utils";

type Status =
  | "active"
  | "draft"
  | "sent"
  | "sending"
  | "paused"
  | "scheduled"
  | "error"
  | "cancelled";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<
  Status,
  { label: string; color: string; bg: string; dotClass: string }
> = {
  active: {
    label: "Ativo",
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
    dotClass: "bg-[#22C55E]",
  },
  draft: {
    label: "Rascunho",
    color: "text-[#6B7280]",
    bg: "bg-[#6B7280]/10",
    dotClass: "bg-[#6B7280]",
  },
  sent: {
    label: "Enviado",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    dotClass: "bg-[#3B82F6]",
  },
  sending: {
    label: "Enviando",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    dotClass: "bg-[#3B82F6] animate-pulse",
  },
  paused: {
    label: "Pausado",
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    dotClass: "bg-[#F59E0B]",
  },
  scheduled: {
    label: "Agendado",
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
    dotClass: "bg-[#8B5CF6]",
  },
  error: {
    label: "Erro",
    color: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
    dotClass: "bg-[#EF4444]",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-[#6B7280]",
    bg: "bg-[#6B7280]/10",
    dotClass: "bg-[#6B7280]",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.color,
        className
      )}
    >
      <span
        className={cn("w-2 h-2 rounded-full flex-shrink-0", config.dotClass)}
      />
      {config.label}
    </span>
  );
}
