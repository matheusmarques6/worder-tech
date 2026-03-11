// ============================================
// DASHBOARD MOCK DATA — E-commerce BR Realista
// ============================================

// Hero Card
export const heroData = {
  recoveredRevenue: 47280.0,
  changePercent: 23,
  recoveredOrders: 247,
  recoveryRate: 68,
  roi: 12.4,
};

// 4 KPIs Primários
export const kpisPrimary = [
  {
    label: "Receita Total",
    value: "R$ 285.430,00",
    change: 12,
    changeLabel: "vs. período anterior",
    icon: "revenue",
  },
  {
    label: "Pedidos",
    value: "342",
    change: 8,
    changeLabel: "vs. período anterior",
    icon: "orders",
  },
  {
    label: "Ticket Médio",
    value: "R$ 834,59",
    change: -3,
    changeLabel: "vs. período anterior",
    icon: "ticket",
  },
  {
    label: "Novos Leads",
    value: "1.847",
    change: 45,
    changeLabel: "vs. período anterior",
    icon: "leads",
  },
];

// 6 KPIs Secundários
export const kpisSecondary = [
  {
    label: "Carrinhos Abandonados",
    value: "R$ 128.900",
    change: -8,
    changeLabel: "vs. período anterior",
    icon: "cart",
  },
  {
    label: "PIX Pendentes",
    value: "R$ 23.450",
    change: -5,
    changeLabel: "vs. período anterior",
    icon: "pix",
  },
  {
    label: "Boletos Vencendo",
    value: "R$ 15.200",
    change: 3,
    changeLabel: "vs. período anterior",
    icon: "barcode",
  },
  {
    label: "Atendimentos Ativos",
    value: "34",
    change: 12,
    changeLabel: "vs. período anterior",
    icon: "chat",
  },
  {
    label: "Mensagens Enviadas",
    value: "12.430",
    change: 28,
    changeLabel: "vs. período anterior",
    icon: "messages",
  },
  {
    label: "Taxa de Recuperação",
    value: "32%",
    change: 15,
    changeLabel: "vs. período anterior",
    icon: "percent",
  },
];

// Gráfico de Receita — últimos 30 dias
function generateDailyRevenue() {
  const data = [];
  const base = new Date(2026, 2, 11); // Mar 11, 2026
  for (let i = 29; i >= 0; i--) {
    const date = new Date(base);
    date.setDate(date.getDate() - i);
    const day = date.getDate();
    const month = date.toLocaleString("pt-BR", { month: "short" }).replace(".", "");

    // Realistic daily fluctuation
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseTotal = isWeekend ? 6500 : 10200;
    const totalJitter = (Math.random() - 0.3) * 4000;
    const total = Math.round(baseTotal + totalJitter);
    const attributed = Math.round(total * (0.28 + Math.random() * 0.12));

    data.push({
      name: `${day} ${month}`,
      total,
      attributed,
    });
  }
  return data;
}

export const revenueChartData = generateDailyRevenue();

// Receita por Canal
export const channelRevenueData = [
  { name: "E-mail", value: 18200, color: "#3B82F6" },
  { name: "WhatsApp", value: 15800, color: "#25D366" },
  { name: "Chat Web", value: 9880, color: "#F26B2A" },
  { name: "SMS", value: 3400, color: "#999999" },
];

// Top Automações
export const topAutomations = [
  {
    name: "Welcome Series",
    status: "active" as const,
    channel: "email" as const,
    revenue: 12340,
    change: 15,
  },
  {
    name: "Carrinho Abandonado",
    status: "active" as const,
    channel: "whatsapp" as const,
    revenue: 9870,
    change: 28,
  },
  {
    name: "PIX Pendente",
    status: "active" as const,
    channel: "whatsapp" as const,
    revenue: 7230,
    change: 42,
  },
  {
    name: "Win-back 30 dias",
    status: "active" as const,
    channel: "email" as const,
    revenue: 5120,
    change: 8,
  },
  {
    name: "Pós-compra Upsell",
    status: "draft" as const,
    channel: "email" as const,
    revenue: 0,
    change: 0,
  },
];

// Campanhas Recentes
export const recentCampaigns = [
  {
    name: "Promoção Dia das Mães",
    channel: "email" as const,
    status: "sent" as const,
    sent: 45200,
    openRate: 32.5,
    clickRate: 8.7,
    revenue: 89500,
  },
  {
    name: "Flash Sale 48h",
    channel: "whatsapp" as const,
    status: "active" as const,
    sent: 12300,
    openRate: 78.4,
    clickRate: 24.1,
    revenue: 34200,
  },
  {
    name: "Lançamento Verão 2026",
    channel: "email" as const,
    status: "sent" as const,
    sent: 38700,
    openRate: 28.9,
    clickRate: 6.2,
    revenue: 52100,
  },
  {
    name: "Recuperação PIX - Março",
    channel: "sms" as const,
    status: "sending" as const,
    sent: 5430,
    openRate: 92.1,
    clickRate: 18.5,
    revenue: 15600,
  },
  {
    name: "Newsletter Semanal #42",
    channel: "email" as const,
    status: "scheduled" as const,
    sent: 0,
    openRate: 0,
    clickRate: 0,
    revenue: 0,
  },
];
