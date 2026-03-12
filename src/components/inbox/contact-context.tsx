"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Envelope,
  Phone,
  MapPin,
  CurrencyCircleDollar,
  ShoppingCart,
  CalendarBlank,
  Receipt,
  X,
  CaretRight,
  NotePencil,
  User,
  Package,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import type { InboxContactContext } from "@/lib/mock-data/inbox";

interface ContactContextProps {
  contact: InboxContactContext;
  onClose: () => void;
}

type ContextTab = "profile" | "orders" | "timeline" | "notes";

const tabs: { value: ContextTab; label: string }[] = [
  { value: "profile", label: "Perfil" },
  { value: "orders", label: "Pedidos" },
  { value: "timeline", label: "Timeline" },
  { value: "notes", label: "Notas" },
];

function formatCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ContactContext({ contact, onClose }: ContactContextProps) {
  const [activeTab, setActiveTab] = useState<ContextTab>("profile");

  return (
    <div className="flex flex-col h-full bg-background-card border-l border-border" style={{ width: 320 }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Contexto</span>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] text-text-muted cursor-pointer"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* Contact card */}
        <div className="text-center mb-3">
          <Avatar name={contact.name} size="lg" className="mx-auto mb-2" />
          <h3 className="text-base font-bold text-text-primary font-heading">{contact.name}</h3>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-xs text-text-muted">Online</span>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-1.5">
          <InfoLine icon={Envelope} text={contact.email} />
          <InfoLine icon={Phone} text={contact.phone} />
          <InfoLine icon={MapPin} text={contact.location} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {contact.tags.map((tag) => (
            <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "relative flex-1 py-2.5 text-xs font-medium text-center transition-colors cursor-pointer",
              activeTab === tab.value
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                layoutId="context-tab-underline"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-worder-primary rounded-full"
                transition={{ duration: 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "profile" && <ProfileTab contact={contact} />}
        {activeTab === "orders" && <OrdersTab contact={contact} />}
        {activeTab === "timeline" && <TimelineTab />}
        {activeTab === "notes" && <NotesTab contact={contact} />}
      </div>
    </div>
  );
}

function InfoLine({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-text-secondary">
      <Icon size={14} weight="duotone" className="text-text-muted shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
}

function ProfileTab({ contact }: { contact: InboxContactContext }) {
  const metrics = [
    { icon: CurrencyCircleDollar, label: "LTV", value: formatCurrency(contact.ltv), color: "text-success" },
    { icon: ShoppingCart, label: "Total de Pedidos", value: String(contact.totalOrders), color: "text-worder-primary" },
    { icon: Receipt, label: "Ticket Médio", value: formatCurrency(contact.averageTicket), color: "text-info" },
    { icon: CalendarBlank, label: "Última Compra", value: new Date(contact.lastPurchase).toLocaleDateString("pt-BR"), color: "text-warning" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Métricas</p>
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="p-3 bg-[#F9F9F9] dark:bg-[#111] rounded-xl">
            <m.icon size={16} weight="duotone" className={cn("mb-1.5", m.color)} />
            <p className="text-base font-bold text-text-primary">{m.value}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Informações</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Cliente desde</span>
            <span className="text-text-primary font-medium">
              {new Date(contact.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
            </span>
          </div>
          <button className="w-full flex items-center justify-between text-xs text-worder-primary font-medium hover:underline cursor-pointer">
            Ver perfil completo
            <CaretRight size={12} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({ contact }: { contact: InboxContactContext }) {
  return (
    <div className="space-y-2">
      {contact.orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 bg-[#F9F9F9] dark:bg-[#111] rounded-xl"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
              <Package size={14} weight="duotone" className="text-success" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-primary font-mono">{order.id}</p>
              <p className="text-[10px] text-text-muted">{new Date(order.date).toLocaleDateString("pt-BR")}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-text-primary">{formatCurrency(order.value)}</p>
            <Badge variant="success" size="sm" className="!text-[9px] !px-1.5">{order.status}</Badge>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TimelineTab() {
  const events = [
    { icon: User, label: "Iniciou conversa", time: "14:28", color: "text-worder-primary" },
    { icon: ShoppingCart, label: "Carrinho abandonado detectado", time: "14:02", color: "text-error" },
    { icon: ClockCounterClockwise, label: "Ativo no site — 8 páginas", time: "13:45", color: "text-[#8B5CF6]" },
    { icon: Package, label: "Pedido #4890 entregue", time: "Ontem", color: "text-success" },
    { icon: Envelope, label: "Abriu e-mail: Promoção de Março", time: "10/mar", color: "text-info" },
  ];

  return (
    <div className="relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
      <div className="space-y-4">
        {events.map((evt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 relative pl-7"
          >
            <div className={cn("absolute left-0 top-0.5 h-[23px] w-[23px] rounded-full bg-[#F5F5F5] dark:bg-[#1A1A1A] flex items-center justify-center z-10")}>
              <evt.icon size={12} weight="duotone" className={evt.color} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-primary">{evt.label}</p>
              <p className="text-[10px] text-text-muted">{evt.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NotesTab({ contact }: { contact: InboxContactContext }) {
  return (
    <div className="space-y-3">
      {contact.notes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 bg-[#FFF9E6] dark:bg-[#2A2500] rounded-xl border border-[#F5E6B8] dark:border-[#4A3A00]"
        >
          <p className="text-xs text-text-primary leading-relaxed">{note.text}</p>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-text-muted">
            <NotePencil size={10} weight="fill" />
            <span>{note.author}</span>
            <span>·</span>
            <span>{new Date(note.date).toLocaleDateString("pt-BR")}</span>
          </div>
        </motion.div>
      ))}

      <button className="w-full py-2.5 border border-dashed border-border rounded-xl text-xs text-text-muted hover:border-worder-primary hover:text-worder-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5">
        <NotePencil size={12} weight="duotone" />
        Adicionar nota
      </button>
    </div>
  );
}
