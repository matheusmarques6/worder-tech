"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Lightning, ArrowRight } from "@phosphor-icons/react";

const topAutomations = [
  { name: "Carrinho Abandonado — WhatsApp", status: "active", channel: "WhatsApp", revenue: 34200, change: 18.5 },
  { name: "Boas-vindas — E-mail Série", status: "active", channel: "E-mail", revenue: 22100, change: 12.3 },
  { name: "PIX Pendente — Lembrete", status: "active", channel: "WhatsApp", revenue: 15800, change: 45.2 },
  { name: "Pós-compra — Cross-sell", status: "active", channel: "E-mail", revenue: 11400, change: 8.7 },
  { name: "Win-back 60 dias", status: "paused", channel: "E-mail", revenue: 6300, change: -5.1 },
];

export function TopAutomations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-background-card border border-border overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2">
          <Lightning size={20} weight="fill" className="text-worder-primary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Top Automações
          </h3>
        </div>
        <button className="flex items-center gap-1 text-sm text-worder-primary font-medium hover:underline cursor-pointer">
          Ver todas
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-worder-dark text-white">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nome</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Canal</th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">Receita</th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">Variação</th>
            </tr>
          </thead>
          <tbody>
            {topAutomations.map((auto, i) => (
              <motion.tr
                key={auto.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-background group transition-colors duration-200 cursor-pointer"
              >
                <td className="relative px-5 py-3.5">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-worder-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="text-sm font-medium text-text-primary">{auto.name}</span>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={auto.status === "active" ? "success" : "default"} size="sm">
                    {auto.status === "active" ? "Ativo" : "Pausado"}
                  </Badge>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm text-text-muted">{auto.channel}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="text-sm font-semibold text-text-primary">
                    R$ {auto.revenue.toLocaleString("pt-BR")}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className={`text-xs font-semibold ${auto.change >= 0 ? "text-success" : "text-error"}`}>
                    {auto.change >= 0 ? "+" : ""}{auto.change}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
