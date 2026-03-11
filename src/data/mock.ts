import type { Customer, Order, Campaign, Conversation, ChartDataPoint } from "@/types";

// ============================================
// MOCK DATA — E-COMMERCE REALISTA
// ============================================

export const mockCustomers: Customer[] = [
  {
    id: "cust_001",
    name: "Maria Silva",
    email: "maria.silva@gmail.com",
    phone: "+55 11 99887-6543",
    totalOrders: 23,
    totalSpent: 4520.9,
    lastOrderDate: "2026-03-08",
    tags: ["VIP", "Recorrente", "WhatsApp Ativo"],
    segment: "Champions",
    ltv: 8900,
    status: "active",
  },
  {
    id: "cust_002",
    name: "João Pedro Santos",
    email: "joao.pedro@hotmail.com",
    phone: "+55 21 98765-4321",
    totalOrders: 5,
    totalSpent: 890.5,
    lastOrderDate: "2026-02-14",
    tags: ["Novo", "Boleto"],
    segment: "Potential Loyalists",
    ltv: 2100,
    status: "active",
  },
  {
    id: "cust_003",
    name: "Ana Clara Oliveira",
    email: "anaclara.oliveira@yahoo.com",
    phone: "+55 31 97654-3210",
    totalOrders: 12,
    totalSpent: 2340.0,
    lastOrderDate: "2025-12-20",
    tags: ["Recorrente", "PIX"],
    segment: "At Risk",
    ltv: 4500,
    status: "at_risk",
  },
  {
    id: "cust_004",
    name: "Carlos Eduardo Lima",
    email: "carlos.lima@outlook.com",
    phone: "+55 41 96543-2109",
    totalOrders: 1,
    totalSpent: 199.9,
    lastOrderDate: "2026-03-10",
    tags: ["Primeiro Pedido", "Cartão"],
    segment: "New Customers",
    ltv: 199.9,
    status: "active",
  },
  {
    id: "cust_005",
    name: "Fernanda Costa",
    email: "fernanda.costa@gmail.com",
    phone: "+55 51 95432-1098",
    totalOrders: 45,
    totalSpent: 12800.0,
    lastOrderDate: "2026-03-11",
    tags: ["VIP", "Gold", "WhatsApp Ativo", "Influencer"],
    segment: "Champions",
    ltv: 25000,
    status: "active",
  },
  {
    id: "cust_006",
    name: "Ricardo Mendes",
    email: "ricardo.m@gmail.com",
    phone: "+55 61 94321-0987",
    totalOrders: 8,
    totalSpent: 1560.0,
    lastOrderDate: "2025-10-05",
    tags: ["Inativo"],
    segment: "Hibernating",
    ltv: 1560,
    status: "churned",
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2026-001",
    customerId: "cust_005",
    customerName: "Fernanda Costa",
    status: "delivered",
    total: 459.9,
    items: 3,
    date: "2026-03-11",
    paymentMethod: "PIX",
  },
  {
    id: "ORD-2026-002",
    customerId: "cust_001",
    customerName: "Maria Silva",
    status: "shipped",
    total: 289.0,
    items: 2,
    date: "2026-03-10",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "ORD-2026-003",
    customerId: "cust_004",
    customerName: "Carlos Eduardo Lima",
    status: "paid",
    total: 199.9,
    items: 1,
    date: "2026-03-10",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "ORD-2026-004",
    customerId: "cust_002",
    customerName: "João Pedro Santos",
    status: "pending",
    total: 345.0,
    items: 4,
    date: "2026-03-09",
    paymentMethod: "Boleto",
  },
  {
    id: "ORD-2026-005",
    customerId: "cust_003",
    customerName: "Ana Clara Oliveira",
    status: "cancelled",
    total: 120.0,
    items: 1,
    date: "2026-03-08",
    paymentMethod: "PIX",
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "camp_001",
    name: "Dia do Consumidor — 50% OFF",
    channel: "email",
    status: "sent",
    sentCount: 45200,
    openRate: 32.5,
    clickRate: 8.7,
    revenue: 89500,
    createdAt: "2026-03-05",
    scheduledAt: "2026-03-10",
  },
  {
    id: "camp_002",
    name: "Carrinho Abandonado — Lembrete",
    channel: "whatsapp",
    status: "sending",
    sentCount: 1230,
    openRate: 78.4,
    clickRate: 24.1,
    revenue: 15600,
    createdAt: "2026-03-08",
  },
  {
    id: "camp_003",
    name: "Flash Sale — Só Hoje!",
    channel: "sms",
    status: "scheduled",
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    revenue: 0,
    createdAt: "2026-03-11",
    scheduledAt: "2026-03-12",
  },
  {
    id: "camp_004",
    name: "Boas-vindas — Novo Cliente",
    channel: "email",
    status: "sent",
    sentCount: 890,
    openRate: 54.2,
    clickRate: 18.3,
    revenue: 12400,
    createdAt: "2026-02-20",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv_001",
    customerId: "cust_001",
    customerName: "Maria Silva",
    channel: "whatsapp",
    lastMessage: "Oi, meu pedido já foi enviado?",
    lastMessageAt: "2026-03-11T14:32:00",
    unreadCount: 2,
    status: "open",
    assignedTo: "Agente IA",
  },
  {
    id: "conv_002",
    customerId: "cust_005",
    customerName: "Fernanda Costa",
    channel: "instagram",
    lastMessage: "Vocês têm esse produto em outra cor?",
    lastMessageAt: "2026-03-11T13:15:00",
    unreadCount: 1,
    status: "open",
    assignedTo: "Ana (Humano)",
  },
  {
    id: "conv_003",
    customerId: "cust_002",
    customerName: "João Pedro Santos",
    channel: "whatsapp",
    lastMessage: "Obrigado! Vou pagar agora mesmo.",
    lastMessageAt: "2026-03-11T12:45:00",
    unreadCount: 0,
    status: "resolved",
  },
  {
    id: "conv_004",
    customerId: "cust_004",
    customerName: "Carlos Eduardo Lima",
    channel: "webchat",
    lastMessage: "Como faço para trocar o produto?",
    lastMessageAt: "2026-03-11T11:20:00",
    unreadCount: 3,
    status: "pending",
  },
];

export const mockRevenueChart: ChartDataPoint[] = [
  { name: "Seg", value: 12400 },
  { name: "Ter", value: 18900 },
  { name: "Qua", value: 15600 },
  { name: "Qui", value: 22300 },
  { name: "Sex", value: 28700 },
  { name: "Sáb", value: 31200 },
  { name: "Dom", value: 19800 },
];

export const mockChannelChart: ChartDataPoint[] = [
  { name: "E-mail", value: 45 },
  { name: "WhatsApp", value: 32 },
  { name: "SMS", value: 15 },
  { name: "Instagram", value: 8 },
];

export const mockMonthlyRevenue: ChartDataPoint[] = [
  { name: "Out", value: 125000 },
  { name: "Nov", value: 189000 },
  { name: "Dez", value: 245000 },
  { name: "Jan", value: 156000 },
  { name: "Fev", value: 198000 },
  { name: "Mar", value: 267000 },
];

// 4 KPIs Primários (conforme spec doc seção 4.1)
export const dashboardKPIsPrimary = [
  { label: "Receita Total", value: "R$ 267.450", change: 12.5, changeLabel: "vs. mês anterior" },
  { label: "Pedidos", value: "1.847", change: 8.3, changeLabel: "vs. mês anterior" },
  { label: "Ticket Médio", value: "R$ 144,80", change: 3.7, changeLabel: "vs. mês anterior" },
  { label: "Novos Leads", value: "3.420", change: 22.1, changeLabel: "vs. mês anterior" },
];

// 6 KPIs Secundários (conforme spec doc seção 4.1)
export const dashboardKPIsSecondary = [
  { label: "Carrinhos Abandonados", value: "R$ 48.200", change: -5.2, changeLabel: "vs. mês anterior" },
  { label: "Recuperados", value: "R$ 89.450", change: 34.2, changeLabel: "vs. mês anterior" },
  { label: "PIX Pendentes", value: "32", change: -12.0, changeLabel: "vs. mês anterior" },
  { label: "Atendimentos Ativos", value: "18", change: 4.5, changeLabel: "vs. mês anterior" },
  { label: "Mensagens Enviadas", value: "8.920", change: 42.1, changeLabel: "vs. mês anterior" },
  { label: "Taxa de Recuperação", value: "68%", change: 15.8, changeLabel: "vs. mês anterior" },
];

// Backwards compat
export const dashboardKPIs = {
  totalRevenue: dashboardKPIsPrimary[0],
  totalOrders: dashboardKPIsPrimary[1],
  averageTicket: dashboardKPIsPrimary[2],
  conversionRate: { label: "Taxa de Conversão", value: "3,8%", change: -0.4, changeLabel: "vs. mês anterior" },
  activeCustomers: { label: "Clientes Ativos", value: "12.340", change: 15.2, changeLabel: "vs. mês anterior" },
  messagesAI: { label: "Mensagens IA", value: "8.920", change: 42.1, changeLabel: "vs. mês anterior" },
};

// Receita total vs atribuída (gráfico comparação)
export const mockRevenueComparison = [
  { name: "Out", total: 125000, attributed: 42000 },
  { name: "Nov", total: 189000, attributed: 58000 },
  { name: "Dez", total: 245000, attributed: 72000 },
  { name: "Jan", total: 156000, attributed: 51000 },
  { name: "Fev", total: 198000, attributed: 67000 },
  { name: "Mar", total: 267000, attributed: 89450 },
];
