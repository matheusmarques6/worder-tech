"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  Eye,
  Globe,
  WhatsappLogo,
  ShoppingCartSimple,
  ArrowUUpLeft,
  EnvelopeOpen,
  CaretDown,
  Cursor,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import type { TimelineEvent } from "@/lib/mock-data/contact-profile";

const eventConfig: Record<
  TimelineEvent["type"],
  { icon: React.ElementType; color: string; bg: string }
> = {
  order_placed: { icon: Package, color: "text-success", bg: "bg-success/10" },
  order_fulfilled: { icon: Package, color: "text-info", bg: "bg-info/10" },
  checkout_started: { icon: ShoppingCart, color: "text-worder-primary", bg: "bg-worder-primary/10" },
  product_viewed: { icon: Eye, color: "text-info", bg: "bg-info/10" },
  site_active: { icon: Globe, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  email_opened: { icon: EnvelopeOpen, color: "text-warning", bg: "bg-warning/10" },
  email_clicked: { icon: Cursor, color: "text-worder-primary", bg: "bg-worder-primary/10" },
  whatsapp_received: { icon: WhatsappLogo, color: "text-success", bg: "bg-success/10" },
  whatsapp_sent: { icon: PaperPlaneTilt, color: "text-success", bg: "bg-success/10" },
  cart_abandoned: { icon: ShoppingCartSimple, color: "text-error", bg: "bg-error/10" },
  refund: { icon: ArrowUUpLeft, color: "text-error", bg: "bg-error/10" },
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, "0");
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const month = months[d.getMonth()];
  const hours = d.getHours().toString().padStart(2, "0");
  const mins = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${d.getFullYear()} · ${hours}:${mins}`;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface EventTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function EventTimeline({ events, className }: EventTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filterOptions = [
    { value: "all", label: "Todos os eventos" },
    { value: "order_placed", label: "Pedidos" },
    { value: "product_viewed", label: "Visualizações" },
    { value: "email_opened", label: "E-mails" },
    { value: "whatsapp_received", label: "WhatsApp" },
    { value: "site_active", label: "Atividade no site" },
  ];

  const filtered = filter === "all"
    ? events
    : events.filter((e) => {
        if (filter === "order_placed") return e.type === "order_placed" || e.type === "order_fulfilled" || e.type === "refund";
        if (filter === "email_opened") return e.type === "email_opened" || e.type === "email_clicked";
        if (filter === "whatsapp_received") return e.type === "whatsapp_received" || e.type === "whatsapp_sent";
        return e.type === filter;
      });

  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-3 mb-5">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-9 text-sm border border-border bg-background-card rounded-lg px-3 text-text-primary focus:border-worder-primary focus:ring-0 outline-none cursor-pointer"
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-text-muted">
          {filtered.length} evento{filtered.length !== 1 && "s"}
        </span>
      </div>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-0">
          {filtered.map((event, index) => {
            const config = eventConfig[event.type];
            const Icon = config.icon;
            const isExpanded = expandedId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="relative pl-11 pb-5 last:pb-0"
              >
                {/* Icon circle */}
                <div
                  className={cn(
                    "absolute left-0 top-0.5 h-[35px] w-[35px] rounded-full flex items-center justify-center z-10",
                    config.bg
                  )}
                >
                  <Icon size={18} weight="duotone" className={config.color} />
                </div>

                {/* Content */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary group-hover:text-worder-primary transition-colors truncate">
                        {event.title}
                      </p>
                      {event.description && (
                        <p className="text-xs text-text-muted mt-0.5 truncate">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {event.amount !== undefined && (
                        <span className="text-sm font-semibold text-text-primary">
                          {formatCurrency(event.amount)}
                        </span>
                      )}
                      <CaretDown
                        size={12}
                        weight="bold"
                        className={cn(
                          "text-text-muted transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">
                    {formatTimestamp(event.timestamp)}
                  </p>
                </button>

                {/* Expandable details */}
                <AnimatePresence>
                  {isExpanded && event.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg">
                        {Object.entries(event.details).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between text-xs py-1"
                          >
                            <span className="text-text-muted">{key}</span>
                            <span className="text-text-primary font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
