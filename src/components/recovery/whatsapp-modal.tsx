"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, WhatsappLogo, PencilSimple, Robot, Sparkle } from "@phosphor-icons/react";
import type { RecoveryItem } from "@/lib/mock-data/recovery";

interface WhatsAppModalProps {
  item: RecoveryItem | null;
  onClose: () => void;
  onSend: () => void;
}

function generateMessage(item: RecoveryItem): string {
  const firstName = item.customerName.split(" ")[0];
  const product = item.products[0]?.name || "seu produto";
  return `Oi ${firstName}! Vi que você se interessou por ${product}. Ainda temos disponível com 10% off! Garanta o seu antes que acabe 🔥\n\n👉 Clique aqui para finalizar: [link]`;
}

export function WhatsAppModal({ item, onClose, onSend }: WhatsAppModalProps) {
  if (!item) return null;

  const message = generateMessage(item);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white w-full max-w-lg mx-4 overflow-hidden"
          style={{ borderRadius: "var(--radius-card)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#F0F0F0]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#22C55E]/10">
                <WhatsappLogo size={20} weight="fill" className="text-[#22C55E]" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Enviar WhatsApp</h3>
                <p className="text-[12px] text-text-muted">para {item.customerName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors">
              <X size={18} className="text-text-muted" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Order info */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAFA] rounded-xl">
              <div>
                <p className="text-[12px] text-text-muted">Pedido</p>
                <p className="font-mono font-semibold text-worder-primary text-sm">{item.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-text-muted">Valor</p>
                <p className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Message preview */}
            <div>
              <p className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-2">Preview da mensagem</p>
              <div
                className="p-4 bg-[#DCF8C6] text-[13px] text-[#1A1A1A] leading-relaxed whitespace-pre-line"
                style={{ borderRadius: "12px 12px 4px 12px" }}
              >
                {message}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-2">
              <p className="text-[12px] font-medium text-text-muted uppercase tracking-wider">Produtos mencionados</p>
              {item.products.map((product, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 bg-[#FAFAFA] rounded-lg">
                  <span className="text-[13px] text-text-primary">
                    {product.quantity > 1 ? `${product.quantity}x ` : ""}{product.name}
                  </span>
                  <span className="text-[13px] font-semibold text-text-secondary" style={{ fontVariantNumeric: "tabular-nums" }}>
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 p-5 border-t border-[#F0F0F0] bg-[#FAFAFA]">
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E0E0E0] bg-white text-text-secondary text-sm font-medium hover:bg-[#F0F0F0] transition-colors"
              style={{ borderRadius: "10px" }}
            >
              <PencilSimple size={16} weight="bold" />
              Editar antes
            </button>
            <button
              onClick={() => { onSend(); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold transition-all hover:brightness-110"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
              }}
            >
              <Robot size={16} weight="fill" />
              <Sparkle size={12} weight="fill" />
              Enviar via IA
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
