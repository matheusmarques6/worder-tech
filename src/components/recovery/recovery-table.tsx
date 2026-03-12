"use client";

import { motion } from "framer-motion";
import {
  Robot,
  WhatsappLogo,
  Envelope,
  Eye,
  Clock,
  CreditCard,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { RecoveryItem, RecoveryTab, IAStatus, RecoveryStatus } from "@/lib/mock-data/recovery";

interface RecoveryTableProps {
  items: RecoveryItem[];
  tab: RecoveryTab;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  onWhatsApp: (item: RecoveryItem) => void;
  onEmail: (item: RecoveryItem) => void;
  onViewDetails: (item: RecoveryItem) => void;
}

function getStatusBadge(status: RecoveryStatus) {
  const map: Record<string, { label: string; variant: "primary" | "success" | "error" | "warning" | "info" | "default" }> = {
    abandoned: { label: "Abandonado", variant: "warning" },
    recovering: { label: "Em recuperação", variant: "info" },
    recovered: { label: "Recuperado", variant: "success" },
    expired: { label: "Expirado", variant: "default" },
    awaiting_payment: { label: "Aguardando pagamento", variant: "warning" },
    paid: { label: "Pago", variant: "success" },
    pix_expired: { label: "Expirado", variant: "default" },
    due_today: { label: "Vence hoje", variant: "error" },
    due_tomorrow: { label: "Vence amanhã", variant: "warning" },
    overdue: { label: "Vencido", variant: "error" },
    boleto_paid: { label: "Pago", variant: "success" },
    not_paid: { label: "Não pago", variant: "error" },
    declined: { label: "Recusado", variant: "error" },
    retried: { label: "Retentado", variant: "warning" },
    card_recovered: { label: "Recuperado", variant: "success" },
  };
  const info = map[status] || { label: status, variant: "default" as const };
  return <Badge variant={info.variant} size="sm">{info.label}</Badge>;
}

function IAStatusIcon({ status }: { status: IAStatus }) {
  if (status === "sent") {
    return (
      <div className="flex items-center gap-1.5" title="IA enviou mensagem">
        <Robot size={18} weight="fill" className="text-[#22C55E]" />
        <span className="text-[11px] text-[#22C55E] font-medium">Enviou</span>
      </div>
    );
  }
  if (status === "waiting") {
    return (
      <div className="flex items-center gap-1.5" title="Aguardando IA">
        <Robot size={18} weight="fill" className="text-[#F59E0B]" />
        <span className="text-[11px] text-[#F59E0B] font-medium">Aguardando</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5" title="IA não tentou">
      <Robot size={18} weight="fill" className="text-[#999]" />
      <span className="text-[11px] text-[#999] font-medium">Não tentou</span>
    </div>
  );
}

function formatRelativeTime(dateStr: string): string {
  const now = new Date("2026-03-12T12:00:00Z");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays === 1) return "ontem";
  return `${diffDays}d atrás`;
}

function formatCountdown(expiresAt: string): { text: string; urgent: boolean } {
  const now = new Date("2026-03-12T12:00:00Z");
  const expires = new Date(expiresAt);
  const diffMs = expires.getTime() - now.getTime();

  if (diffMs <= 0) return { text: "Expirado", urgent: true };

  const hours = Math.floor(diffMs / 3600000);
  const mins = Math.floor((diffMs % 3600000) / 60000);

  if (hours === 0) return { text: `${mins}min`, urgent: true };
  return { text: `${hours}h ${mins}min`, urgent: hours < 3 };
}

function truncateProducts(products: RecoveryItem["products"]): string {
  const names = products.map((p) => (p.quantity > 1 ? `${p.quantity}x ${p.name}` : p.name));
  const joined = names.join(", ");
  return joined.length > 45 ? joined.slice(0, 42) + "..." : joined;
}

export function RecoveryTable({
  items,
  tab,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  allSelected,
  onWhatsApp,
  onEmail,
  onViewDetails,
}: RecoveryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-table-header text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold"># Pedido</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Cliente</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Produtos</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Valor</th>
            {tab === "pix" && (
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Expira em</th>
            )}
            {(tab === "boletos_due" || tab === "boletos_overdue") && (
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Vencimento</th>
            )}
            {tab === "cards" && (
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Motivo</th>
            )}
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">
              {tab === "carts" ? "Abandonado em" : "Criado em"}
            </th>
            <th className="py-3.5 px-4 text-center text-[11px] uppercase tracking-widest font-semibold">IA Status</th>
            <th className="py-3.5 px-4 text-center text-[11px] uppercase tracking-widest font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {items.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => onToggleSelect(item.id)}
                  className="rounded border-[#DDD] accent-[#F26B2A]"
                />
              </td>
              <td className="py-3 px-4">
                <span className="font-mono text-[13px] font-semibold text-worder-primary">{item.orderId}</span>
              </td>
              <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-text-primary text-[13px]">{item.customerName}</p>
                  <p className="text-[11px] text-text-muted">{item.customerPhone}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-secondary" title={item.products.map((p) => p.name).join(", ")}>
                  {truncateProducts(item.products)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </td>
              {tab === "pix" && (
                <td className="py-3 px-4">
                  {item.expiresAt && (() => {
                    const countdown = formatCountdown(item.expiresAt!);
                    return (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} weight="bold" className={countdown.urgent ? "text-error" : "text-text-muted"} />
                        <span className={`text-[13px] font-semibold ${countdown.urgent ? "text-error" : "text-text-secondary"}`}>
                          {countdown.text}
                        </span>
                      </div>
                    );
                  })()}
                </td>
              )}
              {(tab === "boletos_due" || tab === "boletos_overdue") && (
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-text-secondary">{item.dueDate}</span>
                    {item.boletoUrl && (
                      <a
                        href={item.boletoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-info hover:text-info/80 transition-colors"
                        title="Ver boleto"
                      >
                        <LinkIcon size={14} weight="bold" />
                      </a>
                    )}
                  </div>
                </td>
              )}
              {tab === "cards" && (
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <CreditCard size={14} weight="fill" className="text-text-muted" />
                    <span className="text-[13px] text-text-secondary">{item.declineReason}</span>
                  </div>
                </td>
              )}
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-muted">{formatRelativeTime(item.createdAt)}</span>
              </td>
              <td className="py-3 px-4 text-center">
                <IAStatusIcon status={item.iaStatus} />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onWhatsApp(item)}
                    className="p-1.5 rounded-lg hover:bg-[#22C55E]/10 transition-colors"
                    title="Enviar WhatsApp"
                  >
                    <WhatsappLogo size={18} weight="fill" className="text-[#22C55E]" />
                  </button>
                  <button
                    onClick={() => onEmail(item)}
                    className="p-1.5 rounded-lg hover:bg-info/10 transition-colors"
                    title="Enviar e-mail"
                  >
                    <Envelope size={18} weight="fill" className="text-info" />
                  </button>
                  <button
                    onClick={() => onViewDetails(item)}
                    className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors"
                    title="Ver detalhes"
                  >
                    <Eye size={18} weight="fill" className="text-text-muted" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="py-12 text-center text-text-muted text-sm">
          Nenhum item encontrado para os filtros selecionados.
        </div>
      )}
    </div>
  );
}
