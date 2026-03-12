// Mock data for /analytics/* pages

// === OVERVIEW ===

export interface AnalyticsOverviewData {
  totalRevenue: number;
  totalRevenueChange: number;
  attributedRevenue: number;
  attributedRevenuePercent: number;
  attributedRevenueChange: number;
}

export const overviewData: AnalyticsOverviewData = {
  totalRevenue: 472737717,
  totalRevenueChange: 61.4,
  attributedRevenue: 47600000,
  attributedRevenuePercent: 10.07,
  attributedRevenueChange: 23.8,
};

// Revenue over time (30 days)
export interface RevenueTimePoint {
  date: string;
  total: number;
  attributed: number;
  recipients: number;
}

export const revenueTimeline: RevenueTimePoint[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 2, i + 1);
  const base = 12000000 + Math.sin(i * 0.5) * 4000000 + Math.random() * 2000000;
  return {
    date: `${d.getDate()}/${d.getMonth() + 1}`,
    total: Math.round(base),
    attributed: Math.round(base * (0.08 + Math.random() * 0.04)),
    recipients: Math.round(40000 + Math.random() * 20000),
  };
});

// Campaign performance
export interface CampaignPerformance {
  month: string;
  value: number;
}

export const campaignPerformanceData: CampaignPerformance[] = [
  { month: "Out", value: 980000 },
  { month: "Nov", value: 1250000 },
  { month: "Dez", value: 1890000 },
  { month: "Jan", value: 1120000 },
  { month: "Fev", value: 1540000 },
  { month: "Mar", value: 1801615 },
];

export const campaignConversionValue = 7581615;

// Channel cards
export interface ChannelMetrics {
  channel: string;
  color: string;
  metrics: { label: string; value: string }[];
}

export const channelMetrics: ChannelMetrics[] = [
  {
    channel: "E-mail",
    color: "#3B82F6",
    metrics: [
      { label: "Enviados", value: "245.320" },
      { label: "Aberturas", value: "53.972 (22%)" },
      { label: "Cliques", value: "5.078 (2,07%)" },
      { label: "Receita", value: "R$ 4.234.500" },
    ],
  },
  {
    channel: "WhatsApp",
    color: "#22C55E",
    metrics: [
      { label: "Enviados", value: "89.450" },
      { label: "Entregues", value: "87.661 (98%)" },
      { label: "Lidos", value: "71.560 (80%)" },
      { label: "Receita", value: "R$ 2.890.000" },
    ],
  },
  {
    channel: "SMS",
    color: "#8B5CF6",
    metrics: [
      { label: "Enviados", value: "32.100" },
      { label: "Cliques", value: "1.926 (6%)" },
      { label: "Receita", value: "R$ 345.200" },
    ],
  },
  {
    channel: "Chat Web",
    color: "#F26B2A",
    metrics: [
      { label: "Conversas", value: "12.340" },
      { label: "Resolvidos", value: "10.456 (85%)" },
      { label: "Vendas", value: "R$ 130.300" },
    ],
  },
];

// === DELIVERABILITY ===

export interface DeliverabilityScore {
  score: number;
  label: string;
}

export const emailDeliverabilityScore: DeliverabilityScore = {
  score: 56,
  label: "Regular",
};

export interface DeliverabilityMetric {
  name: string;
  rate: number;
  display: string;
  threshold: number;
  thresholdDirection: "above" | "below"; // "above" = good if above threshold
  recommendation: string;
  status: "good" | "warning" | "bad";
}

export const deliverabilityMetrics: DeliverabilityMetric[] = [
  { name: "Taxa de abertura", rate: 22, display: "22,0%", threshold: 33, thresholdDirection: "above", recommendation: "Alvo: >33% — Otimize assuntos e horário de envio", status: "warning" },
  { name: "Taxa de cliques", rate: 2.07, display: "2,07%", threshold: 1.5, thresholdDirection: "above", recommendation: "Alvo: >1,5% — Bom desempenho", status: "good" },
  { name: "Taxa de rejeição", rate: 0.81, display: "0,81%", threshold: 1, thresholdDirection: "below", recommendation: "Alvo: <1% — Dentro do aceitável", status: "good" },
  { name: "Taxa de cancelamento", rate: 0.43, display: "0,43%", threshold: 0.3, thresholdDirection: "below", recommendation: "Alvo: <0,3% — Revise frequência de envios", status: "warning" },
  { name: "Taxa de spam", rate: 0.03, display: "0,03%", threshold: 0.1, thresholdDirection: "below", recommendation: "Alvo: <0,1% — Excelente", status: "good" },
];

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  action: string;
  completed: boolean;
}

export const actionCards: ActionCard[] = [
  { id: "ac-1", title: "Criar segmento 'Nunca se engajou'", description: "Identifique contatos inativos há mais de 90 dias para melhorar sua reputação.", action: "Criar segmento", completed: false },
  { id: "ac-2", title: "Limpe sua lista", description: "Remova e-mails inválidos e inativos para reduzir taxa de rejeição.", action: "Iniciar limpeza", completed: false },
  { id: "ac-3", title: "Configure autenticação SPF/DKIM", description: "Melhore a entregabilidade com autenticação de domínio.", action: "Configurar", completed: true },
];

// === METRICS ===

export interface MetricOption {
  id: string;
  name: string;
  category: string;
}

export const metricOptions: MetricOption[] = [
  { id: "placed_order", name: "Placed Order", category: "Conversão" },
  { id: "revenue", name: "Revenue", category: "Conversão" },
  { id: "opened_email", name: "Opened Email", category: "Email" },
  { id: "clicked_email", name: "Clicked Email", category: "Email" },
  { id: "received_email", name: "Received Email", category: "Email" },
  { id: "active_on_site", name: "Active on Site", category: "Comportamento" },
  { id: "viewed_product", name: "Viewed Product", category: "Comportamento" },
  { id: "added_to_cart", name: "Added to Cart", category: "Comportamento" },
  { id: "started_checkout", name: "Started Checkout", category: "Conversão" },
  { id: "ordered_product", name: "Ordered Product", category: "Conversão" },
  { id: "refunded_order", name: "Refunded Order", category: "Pós-venda" },
  { id: "fulfilled_order", name: "Fulfilled Order", category: "Pós-venda" },
  { id: "subscribed_to_list", name: "Subscribed to List", category: "Engajamento" },
];

export interface MetricTimePoint {
  date: string;
  value: number;
}

// Generate sample metric data
export const metricTimelineData: MetricTimePoint[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 2, i + 1);
  return {
    date: `${d.getDate()}/${d.getMonth() + 1}`,
    value: Math.round(200 + Math.sin(i * 0.4) * 80 + Math.random() * 50),
  };
});

export interface MetricBreakdown {
  name: string;
  type: "campaign" | "flow";
  count: number;
  revenue: number;
}

export const metricBreakdownData: MetricBreakdown[] = [
  { name: "Flash Sale Março", type: "campaign", count: 342, revenue: 45200 },
  { name: "Carrinho Abandonado", type: "flow", count: 289, revenue: 38900 },
  { name: "Newsletter Semanal #12", type: "campaign", count: 156, revenue: 12300 },
  { name: "Boas-vindas", type: "flow", count: 134, revenue: 9800 },
  { name: "Reativação 30 dias", type: "flow", count: 98, revenue: 7600 },
  { name: "Pós-compra", type: "flow", count: 87, revenue: 5400 },
];

// === BENCHMARKS ===

export interface BenchmarkRow {
  metric: string;
  yourValue: number;
  sectorValue: number;
  unit: string;
  higherIsBetter: boolean;
}

export const benchmarkData: BenchmarkRow[] = [
  { metric: "Taxa de abertura", yourValue: 21.3, sectorValue: 22.5, unit: "%", higherIsBetter: true },
  { metric: "Taxa de cliques", yourValue: 1.8, sectorValue: 1.5, unit: "%", higherIsBetter: true },
  { metric: "Taxa de conversão", yourValue: 0.4, sectorValue: 0.6, unit: "%", higherIsBetter: true },
  { metric: "Taxa de cancelamento", yourValue: 0.43, sectorValue: 0.3, unit: "%", higherIsBetter: false },
  { metric: "Receita/destinatário", yourValue: 2.85, sectorValue: 2.1, unit: "R$", higherIsBetter: true },
  { metric: "Taxa de rejeição", yourValue: 0.81, sectorValue: 1.0, unit: "%", higherIsBetter: false },
  { metric: "LTV médio", yourValue: 834, sectorValue: 620, unit: "R$", higherIsBetter: true },
];

// === REPORTS ===

export type ReportType = "complete" | "revenue" | "email" | "custom";
export type ReportFrequency = "daily" | "weekly" | "monthly";

export interface SavedReport {
  id: string;
  name: string;
  type: ReportType;
  frequency: ReportFrequency;
  createdAt: string;
  lastRun: string;
}

export const reportTypeLabels: Record<ReportType, string> = {
  complete: "Completo",
  revenue: "Receita",
  email: "Email",
  custom: "Customizado",
};

export const reportFrequencyLabels: Record<ReportFrequency, string> = {
  daily: "Diário",
  weekly: "Semanal",
  monthly: "Mensal",
};

export const savedReports: SavedReport[] = [
  { id: "rpt-001", name: "Performance Mensal", type: "complete", frequency: "monthly", createdAt: "2026-01-15", lastRun: "2026-03-01" },
  { id: "rpt-002", name: "ROI por Canal", type: "revenue", frequency: "weekly", createdAt: "2026-02-01", lastRun: "2026-03-10" },
  { id: "rpt-003", name: "Entregabilidade Email", type: "email", frequency: "daily", createdAt: "2026-02-10", lastRun: "2026-03-12" },
  { id: "rpt-004", name: "Recuperação Worder IA", type: "custom", frequency: "weekly", createdAt: "2026-03-01", lastRun: "2026-03-11" },
];
