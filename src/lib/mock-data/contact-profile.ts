// Mock data for individual contact profile (/contacts/[id])

export interface ContactChannel {
  channel: "email" | "whatsapp" | "sms";
  label: string;
  subscribed: boolean;
  subscribedAt?: string;
}

export interface ContactProperty {
  key: string;
  value: string;
}

export interface ContactTag {
  id: string;
  label: string;
}

export interface TimelineEvent {
  id: string;
  type:
    | "order_placed"
    | "checkout_started"
    | "product_viewed"
    | "site_active"
    | "email_opened"
    | "email_clicked"
    | "whatsapp_received"
    | "whatsapp_sent"
    | "cart_abandoned"
    | "order_fulfilled"
    | "refund";
  title: string;
  description?: string;
  timestamp: string;
  amount?: number;
  details?: Record<string, string>;
}

export interface ContactOrder {
  id: string;
  orderNumber: string;
  status: "paid" | "fulfilled" | "refunded" | "pending" | "cancelled";
  total: number;
  items: number;
  date: string;
  products: string[];
}

export interface ContactConversation {
  id: string;
  channel: "whatsapp" | "email" | "instagram" | "chat";
  lastMessage: string;
  date: string;
  status: "open" | "closed" | "waiting";
  agent?: string;
}

export interface ContactList {
  id: string;
  name: string;
  type: "list" | "segment";
  contactCount: number;
  addedAt: string;
}

export interface ContactMetrics {
  placedOrders: number;
  revenue: number;
  fulfilledOrders: number;
  refundedOrders: number;
  checkoutStarted: number;
  addedToCart: number;
  clvHistorico: number;
  clvPrevisto: number;
  nextPurchaseDate: string;
  churnRisk: number;
  churnRiskLabel: "Baixo" | "Médio" | "Alto";
}

export interface ContactProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  createdAt: string;
  lastActive: string;
  status: "active" | "inactive" | "suppressed";
  source: string;
  campaign: string;
  medium: string;
  firstUrl: string;
  channels: ContactChannel[];
  properties: ContactProperty[];
  tags: ContactTag[];
  timeline: TimelineEvent[];
  orders: ContactOrder[];
  conversations: ContactConversation[];
  lists: ContactList[];
  metrics: ContactMetrics;
}

export const contactProfile: ContactProfile = {
  id: "CTT-00482",
  name: "Maria Clara Santos",
  email: "maria.clara@gmail.com",
  phone: "+55 11 99842-3156",
  location: "São Paulo, SP",
  timezone: "America/Sao_Paulo (GMT-3)",
  createdAt: "2025-06-14T10:32:00Z",
  lastActive: "2026-03-10T14:22:00Z",
  status: "active",
  source: "instagram.com",
  campaign: "summer_sale",
  medium: "paid_social",
  firstUrl: "https://loja.exemplo.com.br/colecao-verao?utm_source=instagram",
  channels: [
    { channel: "email", label: "E-mail", subscribed: true, subscribedAt: "2025-06-14T10:32:00Z" },
    { channel: "whatsapp", label: "WhatsApp", subscribed: true, subscribedAt: "2025-07-02T08:15:00Z" },
    { channel: "sms", label: "SMS", subscribed: false },
  ],
  properties: [
    { key: "Data de nascimento", value: "15/03/1992" },
    { key: "Gênero", value: "Feminino" },
    { key: "Tamanho", value: "M" },
  ],
  tags: [
    { id: "tag-1", label: "VIP" },
    { id: "tag-2", label: "Repeat Buyer" },
    { id: "tag-3", label: "Fashionista" },
  ],
  timeline: [
    {
      id: "evt-01",
      type: "order_placed",
      title: "Pedido #4892 realizado",
      description: "3 itens — Vestido Linho, Sandália Tiras, Bolsa Palha",
      timestamp: "2026-03-10T14:22:00Z",
      amount: 459.9,
      details: { "Nº Pedido": "#4892", "Método": "PIX", "Frete": "R$ 0,00" },
    },
    {
      id: "evt-02",
      type: "checkout_started",
      title: "Checkout Started",
      description: "Carrinho com 3 itens",
      timestamp: "2026-03-10T14:18:00Z",
      amount: 459.9,
      details: { "URL": "/checkout", "Itens": "3" },
    },
    {
      id: "evt-03",
      type: "product_viewed",
      title: "Viewed Product — Vestido Linho Off-White",
      timestamp: "2026-03-10T14:10:00Z",
      details: { "Produto": "Vestido Linho Off-White", "Preço": "R$ 229,90", "SKU": "VLO-M-001" },
    },
    {
      id: "evt-04",
      type: "product_viewed",
      title: "Viewed Product — Sandália Tiras Caramelo",
      timestamp: "2026-03-10T14:06:00Z",
      details: { "Produto": "Sandália Tiras Caramelo", "Preço": "R$ 149,90", "SKU": "STC-38-001" },
    },
    {
      id: "evt-05",
      type: "email_opened",
      title: "E-mail aberto: Promoção de Inverno",
      timestamp: "2026-03-08T09:45:00Z",
      details: { "Campanha": "Promoção de Inverno 2026", "Assunto": "❄️ Até 50% OFF nos melhores looks" },
    },
    {
      id: "evt-06",
      type: "site_active",
      title: "Ativo no Site",
      description: "Sessão de 12 min — 8 páginas visualizadas",
      timestamp: "2026-03-07T20:30:00Z",
      details: { "Duração": "12 min", "Páginas": "8", "Dispositivo": "Mobile — iPhone 15" },
    },
    {
      id: "evt-07",
      type: "whatsapp_received",
      title: "Mensagem WhatsApp recebida",
      description: "\"Oi, vocês tem esse vestido no tamanho P?\"",
      timestamp: "2026-03-06T11:20:00Z",
    },
    {
      id: "evt-08",
      type: "order_fulfilled",
      title: "Pedido #4756 entregue",
      timestamp: "2026-03-04T16:00:00Z",
      amount: 312.8,
      details: { "Nº Pedido": "#4756", "Transportadora": "Correios — SEDEX" },
    },
    {
      id: "evt-09",
      type: "order_placed",
      title: "Pedido #4756 realizado",
      timestamp: "2026-02-26T10:15:00Z",
      amount: 312.8,
      details: { "Nº Pedido": "#4756", "Método": "Cartão de Crédito", "Parcelas": "3x R$ 104,27" },
    },
    {
      id: "evt-10",
      type: "email_clicked",
      title: "Clicou no e-mail: Novidades Março",
      timestamp: "2026-02-20T15:33:00Z",
      details: { "Link": "/colecao-marco", "Campanha": "Novidades Março" },
    },
    {
      id: "evt-11",
      type: "product_viewed",
      title: "Viewed Product — Jaqueta Jeans Oversized",
      timestamp: "2026-02-18T21:10:00Z",
      details: { "Produto": "Jaqueta Jeans Oversized", "Preço": "R$ 289,90", "SKU": "JJO-M-003" },
    },
    {
      id: "evt-12",
      type: "cart_abandoned",
      title: "Carrinho abandonado",
      description: "2 itens — R$ 419,80",
      timestamp: "2026-02-15T19:45:00Z",
      amount: 419.8,
      details: { "Itens": "Jaqueta Jeans + Calça Wide Leg", "Recuperação": "E-mail enviado" },
    },
    {
      id: "evt-13",
      type: "whatsapp_sent",
      title: "Mensagem WhatsApp enviada",
      description: "Automação: Recuperação de carrinho",
      timestamp: "2026-02-15T20:15:00Z",
    },
    {
      id: "evt-14",
      type: "site_active",
      title: "Ativo no Site",
      description: "Sessão de 5 min — 3 páginas visualizadas",
      timestamp: "2026-02-10T12:00:00Z",
      details: { "Duração": "5 min", "Páginas": "3", "Dispositivo": "Desktop — Chrome" },
    },
    {
      id: "evt-15",
      type: "refund",
      title: "Reembolso — Pedido #4510",
      timestamp: "2026-01-28T09:00:00Z",
      amount: 189.9,
      details: { "Nº Pedido": "#4510", "Motivo": "Tamanho incorreto", "Status": "Processado" },
    },
  ],
  orders: [
    { id: "ord-1", orderNumber: "#4892", status: "paid", total: 459.9, items: 3, date: "2026-03-10T14:22:00Z", products: ["Vestido Linho", "Sandália Tiras", "Bolsa Palha"] },
    { id: "ord-2", orderNumber: "#4756", status: "fulfilled", total: 312.8, items: 2, date: "2026-02-26T10:15:00Z", products: ["Blusa Cropped", "Saia Midi"] },
    { id: "ord-3", orderNumber: "#4621", status: "fulfilled", total: 589.7, items: 4, date: "2026-01-15T09:30:00Z", products: ["Vestido Floral", "Tênis Branco", "Brinco Argola", "Cinto Couro"] },
    { id: "ord-4", orderNumber: "#4510", status: "refunded", total: 189.9, items: 1, date: "2025-12-20T16:45:00Z", products: ["Calça Wide Leg"] },
    { id: "ord-5", orderNumber: "#4388", status: "fulfilled", total: 749.5, items: 3, date: "2025-11-10T11:20:00Z", products: ["Jaqueta Couro", "Vestido Midi", "Bolsa Tote"] },
    { id: "ord-6", orderNumber: "#4201", status: "fulfilled", total: 298.0, items: 2, date: "2025-09-05T08:00:00Z", products: ["Camisa Linho", "Short Alfaiataria"] },
    { id: "ord-7", orderNumber: "#4055", status: "fulfilled", total: 640.2, items: 3, date: "2025-07-22T13:10:00Z", products: ["Blazer Oversized", "Calça Flare", "Colar Dourado"] },
  ],
  conversations: [
    { id: "conv-1", channel: "whatsapp", lastMessage: "Oi, vocês tem esse vestido no tamanho P?", date: "2026-03-06T11:20:00Z", status: "closed", agent: "Ana Beatriz" },
    { id: "conv-2", channel: "whatsapp", lastMessage: "Meu pedido #4756 já foi enviado?", date: "2026-02-28T15:40:00Z", status: "closed", agent: "Bot IA" },
    { id: "conv-3", channel: "email", lastMessage: "Re: Solicitação de troca — Pedido #4510", date: "2025-12-22T10:00:00Z", status: "closed", agent: "Carlos Eduardo" },
    { id: "conv-4", channel: "instagram", lastMessage: "Amei esse look! Tem em outras cores?", date: "2025-10-15T18:30:00Z", status: "closed", agent: "Bot IA" },
    { id: "conv-5", channel: "chat", lastMessage: "Gostaria de saber sobre frete grátis", date: "2025-08-02T09:15:00Z", status: "closed", agent: "Ana Beatriz" },
  ],
  lists: [
    { id: "list-1", name: "VIP Customers", type: "segment", contactCount: 1243, addedAt: "2025-11-01T00:00:00Z" },
    { id: "list-2", name: "Repeat Buyers", type: "segment", contactCount: 3891, addedAt: "2025-08-15T00:00:00Z" },
    { id: "list-3", name: "LEADS POP UP", type: "list", contactCount: 12480, addedAt: "2025-06-14T10:32:00Z" },
    { id: "list-4", name: "TODOS OS LEADS", type: "list", contactCount: 45718, addedAt: "2025-06-14T10:32:00Z" },
  ],
  metrics: {
    placedOrders: 7,
    revenue: 3240.0,
    fulfilledOrders: 6,
    refundedOrders: 1,
    checkoutStarted: 12,
    addedToCart: 28,
    clvHistorico: 3240,
    clvPrevisto: 890,
    nextPurchaseDate: "2026-03-28",
    churnRisk: 15,
    churnRiskLabel: "Baixo",
  },
};
