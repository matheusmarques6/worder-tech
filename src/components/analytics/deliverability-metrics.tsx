"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Warning,
  XCircle,
} from "@phosphor-icons/react";
import { deliverabilityMetrics, actionCards } from "@/lib/mock-data/analytics";

const statusIcon: Record<string, React.ReactNode> = {
  good: <CheckCircle size={18} weight="fill" className="text-success" />,
  warning: <Warning size={18} weight="fill" className="text-warning" />,
  bad: <XCircle size={18} weight="fill" className="text-error" />,
};

export function DeliverabilityMetricsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-background-card border border-border overflow-hidden"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="px-5 py-4 border-b border-border-subtle">
        <h3 className="text-base font-semibold text-text-primary font-heading">Métricas de Saúde</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-subtle">
            <th className="py-3 px-5 text-left text-[11px] uppercase tracking-widest font-semibold text-text-muted">Métrica</th>
            <th className="py-3 px-5 text-right text-[11px] uppercase tracking-widest font-semibold text-text-muted">Taxa</th>
            <th className="py-3 px-5 text-left text-[11px] uppercase tracking-widest font-semibold text-text-muted">Recomendação</th>
            <th className="py-3 px-5 text-center text-[11px] uppercase tracking-widest font-semibold text-text-muted w-16">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {deliverabilityMetrics.map((metric, i) => (
            <motion.tr
              key={metric.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="hover:bg-[rgba(242,107,42,0.03)] transition-colors"
            >
              <td className="py-3.5 px-5 font-medium text-text-primary text-[13px]">{metric.name}</td>
              <td className="py-3.5 px-5 text-right">
                <span
                  className={`font-bold text-[14px] ${
                    metric.status === "good" ? "text-success" : metric.status === "warning" ? "text-warning" : "text-error"
                  }`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {metric.display}
                </span>
              </td>
              <td className="py-3.5 px-5 text-[12px] text-text-muted">{metric.recommendation}</td>
              <td className="py-3.5 px-5 text-center">{statusIcon[metric.status]}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export function ActionCenter() {
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(actionCards.filter((c) => c.completed).map((c) => c.id))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-background-card border border-border p-5"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="text-base font-semibold text-text-primary font-heading mb-4">
        Central de Ações
      </h3>

      <div className="space-y-3">
        {actionCards.map((card, i) => {
          const isDone = completed.has(card.id);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`p-4 border transition-all ${
                isDone ? "border-success/20 bg-success/5" : "border-border bg-bg-subtle"
              }`}
              style={{ borderRadius: "10px" }}
            >
              <div className="flex items-start gap-3">
                {isDone ? (
                  <CheckCircle size={20} weight="fill" className="text-success mt-0.5 flex-shrink-0" />
                ) : (
                  <Warning size={20} weight="fill" className="text-warning mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`text-[13px] font-semibold ${isDone ? "text-success line-through" : "text-text-primary"}`}>
                    {card.title}
                  </p>
                  <p className="text-[12px] text-text-muted mt-0.5">{card.description}</p>
                  {!isDone && (
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:brightness-110"
                        style={{
                          borderRadius: "6px",
                          background: "linear-gradient(135deg, #F26B2A, #F5A623)",
                        }}
                      >
                        {card.action}
                      </button>
                      <button
                        onClick={() => setCompleted((prev) => new Set([...prev, card.id]))}
                        className="px-3 py-1.5 text-[11px] font-medium text-text-muted hover:text-text-primary border border-border hover:bg-background-card transition-colors"
                        style={{ borderRadius: "6px" }}
                      >
                        Marcar concluído
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
