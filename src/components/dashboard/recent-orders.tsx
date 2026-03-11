"use client";

import { motion } from "framer-motion";
import { mockOrders } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@phosphor-icons/react";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "default" }> = {
  pending: { label: "Pendente", variant: "warning" },
  paid: { label: "Pago", variant: "info" },
  shipped: { label: "Enviado", variant: "info" },
  delivered: { label: "Entregue", variant: "success" },
  cancelled: { label: "Cancelado", variant: "error" },
  refunded: { label: "Reembolsado", variant: "default" },
};

export function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-background-card border border-border overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Pedidos Recentes
          </h3>
          <p className="text-sm text-text-muted mt-0.5">
            Últimas transações
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm text-worder-primary font-medium hover:underline cursor-pointer">
          Ver todos
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-worder-dark text-white">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                Valor
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, i) => {
              const status = statusConfig[order.status];
              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-background group transition-colors duration-200 cursor-pointer"
                >
                  <td className="relative px-5 py-3.5">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-worder-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-sm font-semibold text-text-primary font-mono">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-text-secondary">
                      {order.customerName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={status.variant} size="sm">
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-semibold text-text-primary">
                      R$ {order.total.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-text-muted">
                      {order.paymentMethod}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
