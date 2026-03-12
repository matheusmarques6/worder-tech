"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Warning,
  ShoppingCartSimple,
  UserPlus,
  Package,
  Cake,
  ChartLineUp,
  Clock,
  EnvelopeOpen,
  ArrowRight,
} from "@phosphor-icons/react";
import { segmentTemplates, categoryColors, type SegmentTemplate } from "@/lib/mock-data/lists";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  crown: <Crown size={24} weight="fill" />,
  warning: <Warning size={24} weight="fill" />,
  cart: <ShoppingCartSimple size={24} weight="fill" />,
  userplus: <UserPlus size={24} weight="fill" />,
  package: <Package size={24} weight="fill" />,
  cake: <Cake size={24} weight="fill" />,
  chart: <ChartLineUp size={24} weight="fill" />,
  clock: <Clock size={24} weight="fill" />,
  envelope: <EnvelopeOpen size={24} weight="fill" />,
};

interface SegmentLibraryProps {
  onUseTemplate: (template: SegmentTemplate) => void;
}

export function SegmentLibrary({ onUseTemplate }: SegmentLibraryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {segmentTemplates.map((template, index) => {
        const colors = categoryColors[template.category];
        return (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -3, boxShadow: "var(--shadow-card-hover)" }}
            className="bg-background-card border border-border p-5 flex flex-col gap-4 transition-all duration-200 group"
            style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: colors.bg, color: colors.text }}
              >
                {iconMap[template.icon] || <Package size={24} weight="fill" />}
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {template.category}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-text-primary text-[15px] mb-1">{template.name}</h3>
              <p className="text-[13px] text-text-muted leading-relaxed">{template.description}</p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <span>{template.rules.length} regra{template.rules.length > 1 ? "s" : ""} pré-configurada{template.rules.length > 1 ? "s" : ""}</span>
            </div>

            <button
              onClick={() => onUseTemplate(template)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium border border-border bg-background-card text-text-secondary hover:border-worder-primary hover:text-worder-primary transition-all group/btn"
              style={{ borderRadius: "10px" }}
            >
              Usar template
              <ArrowRight size={14} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
