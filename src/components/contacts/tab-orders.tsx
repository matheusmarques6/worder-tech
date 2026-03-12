"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "info" | "error" | "warning" | "default" }
> = {
  paid: { label: "Pago", variant: "success" },
  fulfilled: { label: "Entregue", variant: "info" },
  refunded: { label: "Reembolsado", variant: "error" },
  pending: { label: "Pendente", variant: "warning" },
  cancelled: { label: "Cancelado", variant: "default" },
};

interface TabOrdersProps {
  contact: ContactProfile;
}

export function TabOrders({ contact }: TabOrdersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="!p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="!cursor-default hover:!bg-[#1A1A1A]">
              <TableHead># Pedido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contact.orders.map((order, index) => {
              const status = statusConfig[order.status];
              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="group relative cursor-pointer transition-colors duration-200 hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:border-l-[3px] before:border-transparent before:transition-all before:duration-200 hover:before:border-worder-primary"
                >
                  <TableCell className="font-mono font-medium text-worder-primary">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant} size="sm">
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {order.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <span className="text-text-secondary text-xs truncate max-w-[200px] block">
                      {order.products.join(", ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-text-muted">
                    {new Date(order.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
