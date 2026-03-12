// Mock data for Inbox (/inbox)

export type InboxChannel = "whatsapp" | "instagram" | "webchat";

export interface InboxConversation {
  id: string;
  contactName: string;
  phone?: string;
  channel: InboxChannel;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
  tab: "you" | "team" | "waiting" | "bot" | "done";
  assignee?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  direction: "sent" | "received" | "system";
  content: string;
  timestamp: string;
  read?: boolean;
  senderName?: string;
  senderType?: "agent" | "bot" | "customer";
}

export interface InboxContactContext {
  name: string;
  email: string;
  phone: string;
  location: string;
  tags: string[];
  ltv: number;
  totalOrders: number;
  lastPurchase: string;
  averageTicket: number;
  createdAt: string;
  channel: InboxChannel;
  status: "online" | "offline";
  orders: { id: string; value: number; date: string; status: string }[];
  notes: { id: string; text: string; author: string; date: string }[];
}

// 15 conversations
export const inboxConversations: InboxConversation[] = [
  { id: "c1", contactName: "Fernanda Costa", phone: "+55 11 99842-3156", channel: "whatsapp", lastMessage: "Ah sim, o frete é grátis então? Perfeito!", timestamp: "2026-03-12T14:28:00Z", unread: true, unreadCount: 2, tab: "you", assignee: "Ana Beatriz", tags: ["VIP"] },
  { id: "c2", contactName: "Lucas Mendes", phone: "+55 21 98765-4321", channel: "whatsapp", lastMessage: "Quando o pedido #4901 vai ser enviado?", timestamp: "2026-03-12T14:15:00Z", unread: true, unreadCount: 1, tab: "you", assignee: "Ana Beatriz" },
  { id: "c3", contactName: "Beatriz Oliveira", channel: "instagram", lastMessage: "Amei esse vestido! Tem no tamanho P?", timestamp: "2026-03-12T13:50:00Z", unread: true, unreadCount: 3, tab: "you", assignee: "Ana Beatriz", tags: ["Fashionista"] },
  { id: "c4", contactName: "Rafael Silva", phone: "+55 31 97654-8901", channel: "whatsapp", lastMessage: "Obrigado pelo atendimento!", timestamp: "2026-03-12T13:20:00Z", unread: false, tab: "team", assignee: "Carlos Eduardo" },
  { id: "c5", contactName: "Camila Rodrigues", channel: "webchat", lastMessage: "Gostaria de saber sobre trocas e devoluções", timestamp: "2026-03-12T13:05:00Z", unread: true, unreadCount: 1, tab: "team", assignee: "Carlos Eduardo" },
  { id: "c6", contactName: "Pedro Henrique", phone: "+55 11 96543-2109", channel: "whatsapp", lastMessage: "Vocês fazem entrega expressa para SP?", timestamp: "2026-03-12T12:45:00Z", unread: false, tab: "team", assignee: "Mariana Souza" },
  { id: "c7", contactName: "Juliana Almeida", channel: "instagram", lastMessage: "Esse look combina com que tipo de sapato?", timestamp: "2026-03-12T12:30:00Z", unread: true, unreadCount: 1, tab: "waiting" },
  { id: "c8", contactName: "Thiago Ferreira", phone: "+55 41 95432-1098", channel: "whatsapp", lastMessage: "Meu PIX não caiu ainda, podem verificar?", timestamp: "2026-03-12T12:10:00Z", unread: true, unreadCount: 2, tab: "waiting" },
  { id: "c9", contactName: "Amanda Nascimento", phone: "+55 11 94321-0987", channel: "whatsapp", lastMessage: "Qual o prazo de entrega para o CEP 01310?", timestamp: "2026-03-12T11:55:00Z", unread: false, tab: "waiting" },
  { id: "c10", contactName: "Gabriel Santos", phone: "+55 21 93210-9876", channel: "whatsapp", lastMessage: "[Bot] Olá Gabriel! Vi que você deixou alguns itens no carrinho...", timestamp: "2026-03-12T11:40:00Z", unread: false, tab: "bot" },
  { id: "c11", contactName: "Carolina Lima", channel: "webchat", lastMessage: "[Bot] Posso ajudar com algo mais?", timestamp: "2026-03-12T11:20:00Z", unread: false, tab: "bot" },
  { id: "c12", contactName: "Mateus Barbosa", phone: "+55 31 92109-8765", channel: "whatsapp", lastMessage: "[Bot] Seu pedido #4878 está a caminho! Rastreio: BR123456789", timestamp: "2026-03-12T10:45:00Z", unread: false, tab: "bot" },
  { id: "c13", contactName: "Isabela Cardoso", phone: "+55 11 91098-7654", channel: "whatsapp", lastMessage: "Perfeito, vou comprar agora mesmo!", timestamp: "2026-03-12T10:00:00Z", unread: false, tab: "done", assignee: "Ana Beatriz" },
  { id: "c14", contactName: "Vinícius Rocha", channel: "instagram", lastMessage: "Valeu, era isso mesmo que eu queria saber", timestamp: "2026-03-11T18:30:00Z", unread: false, tab: "done", assignee: "Bot IA" },
  { id: "c15", contactName: "Larissa Dias", channel: "webchat", lastMessage: "Ok, obrigada pela ajuda!", timestamp: "2026-03-11T16:15:00Z", unread: false, tab: "done", assignee: "Mariana Souza" },
];

// Chat messages for active conversation (Fernanda Costa - cart recovery)
export const chatMessages: ChatMessage[] = [
  { id: "m1", direction: "system", content: "Automação: Carrinho Abandonado • 14:02", timestamp: "2026-03-12T14:02:00Z" },
  { id: "m2", direction: "sent", content: "Oi Fernanda! 😊 Notei que você deixou alguns itens no carrinho. O Vestido Linho Off-White é uma das nossas peças mais amadas! Posso te ajudar a finalizar?", timestamp: "2026-03-12T14:03:00Z", read: true, senderName: "Worder IA", senderType: "bot" },
  { id: "m3", direction: "received", content: "Oi! Sim, eu estava olhando mesmo. Mas achei o frete meio caro 😅", timestamp: "2026-03-12T14:08:00Z", senderName: "Fernanda Costa", senderType: "customer" },
  { id: "m4", direction: "sent", content: "Entendo! Tenho uma boa notícia: para compras acima de R$ 299, o frete é GRÁTIS para todo o Brasil! 🚚✨ E o valor do seu carrinho é R$ 459,90, então você já se qualifica!", timestamp: "2026-03-12T14:10:00Z", read: true, senderName: "Worder IA", senderType: "bot" },
  { id: "m5", direction: "received", content: "Sério?! Que ótimo! E vocês tem esse vestido no tamanho M?", timestamp: "2026-03-12T14:12:00Z", senderName: "Fernanda Costa", senderType: "customer" },
  { id: "m6", direction: "system", content: "IA não conseguiu responder • Conversa transferida para Ana Beatriz • 14:14", timestamp: "2026-03-12T14:14:00Z" },
  { id: "m7", direction: "sent", content: "Oi Fernanda! Sou a Ana, vou te ajudar a partir daqui. 😄 Sim, temos o Vestido Linho Off-White no tamanho M em estoque! Quer que eu mantenha o carrinho com frete grátis pra você?", timestamp: "2026-03-12T14:16:00Z", read: true, senderName: "Ana Beatriz", senderType: "agent" },
  { id: "m8", direction: "received", content: "Sim, por favor! E a bolsa de palha também entra na promoção?", timestamp: "2026-03-12T14:20:00Z", senderName: "Fernanda Costa", senderType: "customer" },
  { id: "m9", direction: "sent", content: "Sim! A Bolsa Palha Natural está com 15% OFF essa semana. Com o desconto fica R$ 127,42 no lugar de R$ 149,90. E o frete continua grátis! 🎉", timestamp: "2026-03-12T14:22:00Z", read: true, senderName: "Ana Beatriz", senderType: "agent" },
  { id: "m10", direction: "received", content: "Ah sim, o frete é grátis então? Perfeito!", timestamp: "2026-03-12T14:28:00Z", senderName: "Fernanda Costa", senderType: "customer" },
];

// Context panel data for active conversation
export const activeContactContext: InboxContactContext = {
  name: "Fernanda Costa",
  email: "fernanda.costa@gmail.com",
  phone: "+55 11 99842-3156",
  location: "São Paulo, SP",
  tags: ["VIP", "Repeat Buyer"],
  ltv: 2850.0,
  totalOrders: 5,
  lastPurchase: "2026-02-18",
  averageTicket: 570.0,
  createdAt: "2025-04-10",
  channel: "whatsapp",
  status: "online",
  orders: [
    { id: "#4890", value: 389.9, date: "2026-02-18", status: "Entregue" },
    { id: "#4712", value: 529.7, date: "2026-01-05", status: "Entregue" },
    { id: "#4580", value: 245.0, date: "2025-11-22", status: "Entregue" },
    { id: "#4401", value: 890.4, date: "2025-09-10", status: "Entregue" },
    { id: "#4210", value: 795.0, date: "2025-06-30", status: "Entregue" },
  ],
  notes: [
    { id: "n1", text: "Cliente VIP, sempre compra na promoção. Gosta de peças em linho e tons neutros.", author: "Ana Beatriz", date: "2026-02-20" },
    { id: "n2", text: "Preferência por frete expresso quando disponível.", author: "Carlos Eduardo", date: "2025-12-15" },
  ],
};

// IA suggestion
export const aiSuggestion = "Que bom que gostou, Fernanda! 🥳 Seu carrinho atualizado fica assim:\n\n• Vestido Linho Off-White (M) — R$ 229,90\n• Sandália Tiras Caramelo — R$ 149,90\n• Bolsa Palha Natural (15% OFF) — R$ 127,42\n\nTotal: R$ 507,22 com frete grátis! Quer que eu envie o link de pagamento?";
