"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus } from "@phosphor-icons/react";
import { benchmarkData } from "@/lib/mock-data/analytics";
import type { BenchmarkRow } from "@/lib/mock-data/analytics";

function getStatus(row: BenchmarkRow): { label: string; color: string; bgColor: string; isGood: boolean } {
  const diff = row.yourValue - row.sectorValue;
  const isAbove = diff > 0;
  const isEqual = Math.abs(diff) < 0.01;

  if (isEqual) return { label: "Na média", color: "text-[#6B7280]", bgColor: "bg-[#6B7280]/10", isGood: true };

  if (isAbove) {
    const isGood = row.higherIsBetter;
    return {
      label: "Acima",
      color: isGood ? "text-success" : "text-error",
      bgColor: isGood ? "bg-success/10" : "bg-error/10",
      isGood,
    };
  } else {
    const isGood = !row.higherIsBetter;
    return {
      label: "Abaixo",
      color: isGood ? "text-success" : row.higherIsBetter ? (Math.abs(diff / row.sectorValue) > 0.2 ? "text-error" : "text-warning") : "text-success",
      bgColor: isGood ? "bg-success/10" : row.higherIsBetter ? (Math.abs(diff / row.sectorValue) > 0.2 ? "bg-error/10" : "bg-warning/10") : "bg-success/10",
      isGood,
    };
  }
}

function formatValue(value: number, unit: string): string {
  if (unit === "R$") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${value.toLocaleString("pt-BR", { minimumFractionDigits: value < 1 ? 2 : 1, maximumFractionDigits: 2 })}%`;
}

export function BenchmarkTable() {
  const maxVal = Math.max(...benchmarkData.map((r) => Math.max(r.yourValue, r.sectorValue)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-background-card border border-border overflow-hidden"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-table-header text-white">
            <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Métrica</th>
            <th className="py-3.5 px-5 text-right text-[11px] uppercase tracking-widest font-semibold">Seu valor</th>
            <th className="py-3.5 px-5 text-right text-[11px] uppercase tracking-widest font-semibold">Benchmark setor</th>
            <th className="py-3.5 px-5 text-center text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold min-w-[200px]">Comparação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {benchmarkData.map((row, i) => {
            const status = getStatus(row);
            const yourWidth = (row.yourValue / maxVal) * 100;
            const sectorWidth = (row.sectorValue / maxVal) * 100;

            return (
              <motion.tr
                key={row.metric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="hover:bg-[rgba(242,107,42,0.03)] transition-colors"
              >
                <td className="py-4 px-5 font-medium text-text-primary text-[13px]">{row.metric}</td>
                <td className="py-4 px-5 text-right">
                  <span className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatValue(row.yourValue, row.unit)}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="text-text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatValue(row.sectorValue, row.unit)}
                  </span>
                </td>
                <td className="py-4 px-5 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.bgColor} ${status.color}`}>
                    {status.label === "Acima" && <ArrowUp size={12} weight="bold" />}
                    {status.label === "Abaixo" && <ArrowDown size={12} weight="bold" />}
                    {status.label === "Na média" && <Minus size={12} weight="bold" />}
                    {status.label}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-text-muted w-10">Você</span>
                      <div className="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${yourWidth}%` }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-text-muted w-10">Setor</span>
                      <div className="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${sectorWidth}%` }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                          className="h-full rounded-full bg-[#CCC]"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
