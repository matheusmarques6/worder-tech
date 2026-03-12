// Mock data for /campaigns

export type CampaignChannel = "email" | "whatsapp" | "sms";
export type CampaignStatus = "sent" | "draft" | "scheduled";

export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  audience: string;
  sentDate?: string;
  scheduledDate?: string;
  sent?: number;
  openRate?: number;
  clickRate?: number;
  revenue?: number;
  // WhatsApp specific
  deliveredRate?: number;
  readRate?: number;
}

export const campaignKPIs = [
  {
    label: "Taxa Média de Abertura",
    value: "21,3%",
    change: 3,
    changeLabel: "vs. mês anterior",
    icon: "messages",
    health: "Bom" as const,
  },
  {
    label: "Taxa Média de Cliques",
    value: "1,8%",
    change: -0.2,
    changeLabel: "vs. mês anterior",
    icon: "conversion",
    health: "Bom" as const,
  },
  {
    label: "Taxa de Conversão",
    value: "0,4%",
    change: -1.1,
    changeLabel: "vs. mês anterior",
    icon: "cart",
    health: "Ruim" as const,
  },
  {
    label: "Receita por Destinatário",
    value: "R$ 2,85",
    change: 8,
    changeLabel: "vs. mês anterior",
    icon: "revenue",
    health: "Bom" as const,
  },
];

export const campaignsData: Campaign[] = [
  {
    id: "cmp-001",
    name: "[03/03] Promoção Dia da Mulher",
    channel: "email",
    status: "sent",
    audience: "TODOS OS LEADS",
    sentDate: "2026-03-03",
    sent: 6222,
    openRate: 23.79,
    clickRate: 1.53,
    revenue: 399283,
  },
  {
    id: "cmp-002",
    name: "[27/02] Flash Sale 48h",
    channel: "email",
    status: "sent",
    audience: "Leads Engajados 60d",
    sentDate: "2026-02-27",
    sent: 5005,
    openRate: 19.03,
    clickRate: 1.16,
    revenue: 0,
  },
  {
    id: "cmp-003",
    name: "[24/02] Pós Valentines",
    channel: "email",
    status: "sent",
    audience: "Compradores Recorrentes",
    sentDate: "2026-02-24",
    sent: 5674,
    openRate: 21.55,
    clickRate: 1.49,
    revenue: 384870,
  },
  {
    id: "cmp-004",
    name: "[20/02] Lançamento Coleção",
    channel: "whatsapp",
    status: "sent",
    audience: "VIP Customers",
    sentDate: "2026-02-20",
    sent: 2340,
    deliveredRate: 96,
    readRate: 89,
    clickRate: 12.3,
    revenue: 128400,
  },
  {
    id: "cmp-005",
    name: "[15/02] Cupom Aniversário",
    channel: "sms",
    status: "sent",
    audience: "Aniversariantes do Mês",
    sentDate: "2026-02-15",
    sent: 890,
    revenue: 23100,
  },
  {
    id: "cmp-006",
    name: "Semana do Consumidor",
    channel: "email",
    status: "scheduled",
    audience: "TODOS OS LEADS",
    scheduledDate: "2026-03-15",
  },
  {
    id: "cmp-007",
    name: "Queima de Estoque",
    channel: "whatsapp",
    status: "draft",
    audience: "Win-Back Opportunities",
  },
  {
    id: "cmp-008",
    name: "Dia das Mães Early",
    channel: "email",
    status: "draft",
    audience: "Leads Engajados 60d",
  },
  {
    id: "cmp-009",
    name: "Reativação Base Fria",
    channel: "email",
    status: "draft",
    audience: "Leads Não Engajados",
  },
  {
    id: "cmp-010",
    name: "Black Friday Esquenta",
    channel: "email",
    status: "draft",
    audience: "TODOS OS LEADS",
  },
];
