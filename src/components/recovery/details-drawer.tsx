"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  WhatsappLogo,
  Envelope,
  ChatText,
  Check,
  Checks,
  XCircle,
  User,
  Phone,
  EnvelopeSimple,
  Package,
  ArrowSquareOut,
  CursorClick,
} from "@phosphor-icons/react";
import type { RecoveryItem, RecoveryAttempt } from "@/lib/mock-data/recovery";

interface DetailsDrawerProps {
  item: RecoveryItem | null;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function getChannelIcon(channel: RecoveryAttempt["channel"]) {
  if (channel === "whatsapp") return <WhatsappLogo size={16} weight="fill" className="text-[#22C55E]" />;
  if (channel === "email") return <Envelope size={16} weight="fill" className="text-info" />;
  return <ChatText size={16} weight="fill" className="text-[#8B5CF6]" />;
}

function getAttemptStatusIcon(status: RecoveryAttempt["status"]) {
  const map = {
    sent: { icon: <Check size={14} weight="bold" className="text-text-muted" />, label: "Enviado" },
    delivered: { icon: <Checks size={14} weight="bold" className="text-text-muted" />, label: "Entregue" },
    read: { icon: <Checks size={14} weight="bold" className="text-info" />, label: "Lido" },
    clicked: { icon: <CursorClick size={14} weight="fill" className="text-[#22C55E]" />, label: "Clicou" },
    failed: { icon: <XCircle size={14} weight="fill" className="text-error" />, label: "Falhou" },
  };
  return map[status];
}

export function DetailsDrawer({ item, onClose }: DetailsDrawerProps) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[400px] bg-white shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[#F0F0F0] bg-white">
              <div>
                <h3 className="font-semibold text-text-primary text-lg">Detalhes do Pedido</h3>
                <p className="font-mono text-sm text-worder-primary font-semibold">{item.orderId}</p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors">
                <X size={18} className="text-text-muted" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Value */}
              <div className="px-4 py-4 bg-[#FAFAFA] rounded-xl">
                <p className="text-[12px] text-text-muted uppercase tracking-wider font-medium mb-1">Valor total</p>
                <p className="text-[28px] font-bold text-text-primary font-heading" style={{ fontVariantNumeric: "tabular-nums" }}>
                  R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>

              {/* Customer */}
              <div>
                <p className="text-[12px] text-text-muted uppercase tracking-wider font-medium mb-3">Cliente</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <User size={16} weight="fill" className="text-text-muted" />
                    <span className="text-sm text-text-primary">{item.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} weight="fill" className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{item.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EnvelopeSimple size={16} weight="fill" className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{item.customerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-[12px] text-text-muted uppercase tracking-wider font-medium mb-3">Produtos</p>
                <div className="space-y-2">
                  {item.products.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-3 bg-[#FAFAFA] rounded-xl"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F0F0F0]">
                        <Package size={20} weight="fill" className="text-text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-text-primary truncate">{product.name}</p>
                        <p className="text-[11px] text-text-muted">Qtd: {product.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra info */}
              {item.dueDate && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAFA] rounded-xl">
                  <span className="text-[12px] text-text-muted font-medium">Vencimento</span>
                  <span className="text-sm font-semibold text-text-primary">{formatDate(item.dueDate)}</span>
                </div>
              )}
              {item.boletoUrl && (
                <a
                  href={item.boletoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-[#E0E0E0] text-sm font-medium text-text-secondary hover:bg-[#F0F0F0] transition-colors"
                  style={{ borderRadius: "10px" }}
                >
                  <ArrowSquareOut size={16} weight="bold" />
                  Abrir boleto
                </a>
              )}
              {item.declineReason && (
                <div className="flex items-center justify-between px-4 py-3 bg-error/5 rounded-xl">
                  <span className="text-[12px] text-error font-medium">Motivo da recusa</span>
                  <span className="text-sm font-semibold text-error">{item.declineReason}</span>
                </div>
              )}

              {/* Recovery Timeline */}
              <div>
                <p className="text-[12px] text-text-muted uppercase tracking-wider font-medium mb-3">
                  Timeline de Recuperação ({item.attempts.length} tentativa{item.attempts.length !== 1 ? "s" : ""})
                </p>
                {item.attempts.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-text-muted bg-[#FAFAFA] rounded-xl">
                    Nenhuma tentativa de recuperação realizada.
                  </div>
                ) : (
                  <div className="space-y-0">
                    {item.attempts.map((attempt, i) => {
                      const statusInfo = getAttemptStatusIcon(attempt.status);
                      return (
                        <div key={i} className="relative pl-8 pb-4 last:pb-0">
                          {/* Vertical line */}
                          {i < item.attempts.length - 1 && (
                            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-[#E0E0E0]" />
                          )}
                          {/* Dot */}
                          <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-[#E0E0E0]">
                            {getChannelIcon(attempt.channel)}
                          </div>
                          {/* Content */}
                          <div className="bg-[#FAFAFA] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-text-secondary capitalize">{attempt.channel}</span>
                                <div className="flex items-center gap-1">
                                  {statusInfo.icon}
                                  <span className="text-[11px] text-text-muted">{statusInfo.label}</span>
                                </div>
                              </div>
                              <span className="text-[11px] text-text-muted">{formatDateTime(attempt.date)}</span>
                            </div>
                            <p className="text-[12px] text-text-secondary leading-relaxed">{attempt.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
