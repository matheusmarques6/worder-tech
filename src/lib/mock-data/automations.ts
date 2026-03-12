// Mock data for /automations

export type AutomationStatus = "active" | "draft" | "paused";
export type AutomationChannel = "email" | "whatsapp" | "sms";

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  channels: AutomationChannel[];
  status: AutomationStatus;
  updatedAt: string;
  revenue: number;
  revenuePerRecipient: number;
  recipients?: number;
}

export const automationsData: Automation[] = [
  {
    id: "auto-001",
    name: "Carrinho Abandonado",
    trigger: "Cart Abandoned",
    channels: ["email", "whatsapp"],
    status: "active",
    updatedAt: "2026-03-12",
    revenue: 45230,
    revenuePerRecipient: 12.45,
    recipients: 3634,
  },
  {
    id: "auto-002",
    name: "Checkout Abandonado",
    trigger: "Checkout Started",
    channels: ["email"],
    status: "active",
    updatedAt: "2026-03-11",
    revenue: 28100,
    revenuePerRecipient: 8.92,
    recipients: 3150,
  },
  {
    id: "auto-003",
    name: "PIX Pendente",
    trigger: "PIX Pendente",
    channels: ["whatsapp"],
    status: "active",
    updatedAt: "2026-03-12",
    revenue: 18900,
    revenuePerRecipient: 15.30,
    recipients: 1235,
  },
  {
    id: "auto-004",
    name: "Boleto Vencendo",
    trigger: "Boleto Emitido",
    channels: ["whatsapp"],
    status: "active",
    updatedAt: "2026-03-10",
    revenue: 12340,
    revenuePerRecipient: 9.80,
    recipients: 1259,
  },
  {
    id: "auto-005",
    name: "Cartão Recusado",
    trigger: "Cartão Recusado",
    channels: ["whatsapp"],
    status: "active",
    updatedAt: "2026-03-09",
    revenue: 8700,
    revenuePerRecipient: 18.50,
    recipients: 470,
  },
  {
    id: "auto-006",
    name: "Welcome Series",
    trigger: "Added to List",
    channels: ["email"],
    status: "active",
    updatedAt: "2026-03-08",
    revenue: 15800,
    revenuePerRecipient: 3.20,
    recipients: 4938,
  },
  {
    id: "auto-007",
    name: "Pós-Compra Upsell",
    trigger: "Placed Order",
    channels: ["email"],
    status: "draft",
    updatedAt: "2026-03-05",
    revenue: 0,
    revenuePerRecipient: 0,
  },
  {
    id: "auto-008",
    name: "Win-back 30 dias",
    trigger: "Date-based",
    channels: ["email"],
    status: "draft",
    updatedAt: "2026-03-01",
    revenue: 0,
    revenuePerRecipient: 0,
  },
  {
    id: "auto-009",
    name: "Avaliação Pós-Entrega",
    trigger: "Placed Order",
    channels: ["whatsapp"],
    status: "draft",
    updatedAt: "2026-02-28",
    revenue: 0,
    revenuePerRecipient: 0,
  },
  {
    id: "auto-010",
    name: "Aniversário do Cliente",
    trigger: "Date-based",
    channels: ["email", "sms"],
    status: "paused",
    updatedAt: "2026-02-20",
    revenue: 3200,
    revenuePerRecipient: 5.10,
    recipients: 627,
  },
];

// Flow Builder types and mock data

export type FlowNodeType =
  | "trigger"
  | "email"
  | "whatsapp"
  | "sms"
  | "delay"
  | "condition"
  | "condition_multi"
  | "ab_test"
  | "update_contact"
  | "webhook"
  | "alert"
  | "worder_ai";

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label: string;
  config: Record<string, string>;
  x: number;
  y: number;
}

export interface FlowConnection {
  id: string;
  from: string;
  to: string;
  fromPort?: "default" | "yes" | "no" | "a" | "b";
  label?: string;
}

export interface FlowData {
  id: string;
  name: string;
  status: AutomationStatus;
  nodes: FlowNode[];
  connections: FlowConnection[];
}

// Pre-built "Checkout Abandonado" flow
export const checkoutAbandonedFlow: FlowData = {
  id: "auto-002",
  name: "Checkout Abandonado",
  status: "active",
  nodes: [
    {
      id: "n1",
      type: "trigger",
      label: "Checkout Started",
      config: { trigger: "Checkout Started" },
      x: 60,
      y: 220,
    },
    {
      id: "n2",
      type: "delay",
      label: "Aguardar 5 min",
      config: { duration: "5", unit: "minutos" },
      x: 340,
      y: 220,
    },
    {
      id: "n3",
      type: "email",
      label: "Email #1",
      config: { subject: "Você esqueceu algo no carrinho!", template: "checkout-abandon-1" },
      x: 600,
      y: 220,
    },
    {
      id: "n4",
      type: "delay",
      label: "Aguardar 4h",
      config: { duration: "4", unit: "horas" },
      x: 860,
      y: 220,
    },
    {
      id: "n5",
      type: "condition",
      label: "Abriu email?",
      config: { property: "Abriu email", operator: "é igual a", value: "true" },
      x: 1120,
      y: 220,
    },
    {
      id: "n6",
      type: "email",
      label: "Parar",
      config: { action: "end" },
      x: 1400,
      y: 120,
    },
    {
      id: "n7",
      type: "whatsapp",
      label: "WhatsApp Oferta",
      config: { template: "checkout-abandon-offer", message: "Oi {{first_name}}! Ainda dá tempo de garantir seu pedido com 10% OFF 🔥" },
      x: 1400,
      y: 320,
    },
  ],
  connections: [
    { id: "c1", from: "n1", to: "n2" },
    { id: "c2", from: "n2", to: "n3" },
    { id: "c3", from: "n3", to: "n4" },
    { id: "c4", from: "n4", to: "n5" },
    { id: "c5", from: "n5", to: "n6", fromPort: "yes", label: "Sim" },
    { id: "c6", from: "n5", to: "n7", fromPort: "no", label: "Não" },
  ],
};

// Templates for "Create Flow" modal
export type FlowTemplateCategory = "all" | "ecommerce" | "recovery" | "post_sale" | "engagement";

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  channels: AutomationChannel[];
  category: FlowTemplateCategory;
}

export const flowTemplateCategories: { key: FlowTemplateCategory; label: string; count: number }[] = [
  { key: "all", label: "Todos", count: 37 },
  { key: "ecommerce", label: "E-commerce", count: 18 },
  { key: "recovery", label: "Recuperação", count: 8 },
  { key: "post_sale", label: "Pós-venda", count: 6 },
  { key: "engagement", label: "Engajamento", count: 5 },
];

export const flowTemplates: FlowTemplate[] = [
  { id: "ft-001", name: "Carrinho Abandonado", description: "Recupere vendas com sequência email + WhatsApp", channels: ["email", "whatsapp"], category: "recovery" },
  { id: "ft-002", name: "Checkout Abandonado", description: "Lembrete automático para quem iniciou checkout", channels: ["email"], category: "recovery" },
  { id: "ft-003", name: "Welcome Series", description: "Boas-vindas em 3 e-mails para novos leads", channels: ["email"], category: "engagement" },
  { id: "ft-004", name: "Pós-Compra", description: "Cross-sell e upsell após primeira compra", channels: ["email"], category: "post_sale" },
  { id: "ft-005", name: "PIX Pendente", description: "Lembrete via WhatsApp para pagamento PIX", channels: ["whatsapp"], category: "recovery" },
  { id: "ft-006", name: "Boleto a Vencer", description: "Notificação antes do vencimento do boleto", channels: ["whatsapp"], category: "recovery" },
  { id: "ft-007", name: "Win-back 30 Dias", description: "Reengaje clientes inativos há 30 dias", channels: ["email"], category: "engagement" },
  { id: "ft-008", name: "Avaliação Pós-Entrega", description: "Peça review após confirmação de entrega", channels: ["whatsapp"], category: "post_sale" },
  { id: "ft-009", name: "Aniversário do Cliente", description: "Cupom especial no mês de aniversário", channels: ["email", "sms"], category: "engagement" },
  { id: "ft-010", name: "Recompra Automática", description: "Lembre clientes de reabastecer produtos recorrentes", channels: ["email", "whatsapp"], category: "ecommerce" },
  { id: "ft-011", name: "Cartão Recusado", description: "Recupere pagamentos com cartão recusado", channels: ["whatsapp"], category: "recovery" },
  { id: "ft-012", name: "VIP Exclusivo", description: "Ofertas antecipadas para top clientes", channels: ["email", "whatsapp"], category: "ecommerce" },
];

export const triggerOptions = [
  "Checkout Started",
  "Cart Abandoned",
  "Placed Order",
  "PIX Pendente",
  "Boleto Emitido",
  "Cartão Recusado",
  "Added to List",
  "Active on Site",
  "Date-based",
];
