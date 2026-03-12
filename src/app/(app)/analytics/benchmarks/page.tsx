"use client";

import { motion } from "framer-motion";
import {
  Sparkle,
  ArrowRight,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { BenchmarkTable } from "@/components/analytics/benchmark-table";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Benchmarks"
        breadcrumb={["Analytics", "Benchmarks"]}
      />

      {/* AI Insight card */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden p-5"
        style={{
          borderRadius: "var(--radius-card)",
          background: "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 70%, #F26B2A 100%)",
        }}
      >
        <div className="relative z-10 flex items-start gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
          >
            <Sparkle size={20} weight="fill" className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-white mb-1">Insight da Worder IA</p>
            <p className="text-[12px] text-white/70 leading-relaxed">
              A Worder IA identificou que sua taxa de conversão está 33% abaixo do setor.
              Recomendamos ativar a automação de carrinho abandonado via WhatsApp para melhorar.
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-white hover:text-[#F5A623] transition-colors">
              Ver recomendação <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </div>
        <div
          className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #F5A623, transparent)" }}
        />
      </motion.div>

      {/* Info strip */}
      <div className="flex items-center gap-3 text-[12px] text-text-muted">
        <span>Dados comparados com a média do setor de e-commerce brasileiro.</span>
        <span className="text-text-muted/50">|</span>
        <span>Atualizado em 12/03/2026</span>
      </div>

      <BenchmarkTable />
    </motion.div>
  );
}
