// Mock data for /contacts/lists

export type ListType = "list" | "segment";

export interface ListItem {
  id: string;
  name: string;
  type: ListType;
  members: number;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export const listsData: ListItem[] = [
  {
    id: "lst-001",
    name: "Churn Risks (Shopify)",
    type: "segment",
    members: 0,
    createdAt: "2025-11-15",
    updatedAt: "2026-03-12",
    tags: ["shopify", "churn"],
  },
  {
    id: "lst-002",
    name: "Win-Back Opportunities",
    type: "segment",
    members: 3353,
    createdAt: "2025-10-20",
    updatedAt: "2026-03-11",
    tags: ["retenção"],
  },
  {
    id: "lst-003",
    name: "Repeat Buyers",
    type: "segment",
    members: 328,
    createdAt: "2025-09-05",
    updatedAt: "2026-03-12",
    tags: ["fidelização"],
  },
  {
    id: "lst-004",
    name: "Potential Purchasers",
    type: "segment",
    members: 1569,
    createdAt: "2025-12-01",
    updatedAt: "2026-03-10",
    tags: ["conversão"],
  },
  {
    id: "lst-005",
    name: "VIP Customers",
    type: "segment",
    members: 3,
    createdAt: "2025-08-14",
    updatedAt: "2026-03-12",
    tags: ["vip", "fidelização"],
  },
  {
    id: "lst-006",
    name: "Leads Engajados 60d",
    type: "segment",
    members: 3584,
    createdAt: "2026-01-10",
    updatedAt: "2026-03-12",
    tags: ["engajamento"],
  },
  {
    id: "lst-007",
    name: "Leads Não Engajados",
    type: "segment",
    members: 0,
    createdAt: "2026-01-10",
    updatedAt: "2026-03-12",
    tags: ["retenção"],
  },
  {
    id: "lst-008",
    name: "LEADS SMS",
    type: "list",
    members: 0,
    createdAt: "2025-07-22",
    updatedAt: "2025-12-15",
    tags: ["sms"],
  },
  {
    id: "lst-009",
    name: "LEADS POP UP",
    type: "list",
    members: 930,
    createdAt: "2025-06-18",
    updatedAt: "2026-02-28",
    tags: ["popup", "aquisição"],
  },
  {
    id: "lst-010",
    name: "TODOS OS LEADS",
    type: "segment",
    members: 27461,
    createdAt: "2025-05-01",
    updatedAt: "2026-03-12",
  },
  {
    id: "lst-011",
    name: "Compradores Recorrentes",
    type: "segment",
    members: 892,
    createdAt: "2025-11-30",
    updatedAt: "2026-03-11",
    tags: ["fidelização"],
  },
  {
    id: "lst-012",
    name: "Black Friday 2025",
    type: "list",
    members: 15230,
    createdAt: "2025-11-01",
    updatedAt: "2025-11-30",
    tags: ["campanha", "black-friday"],
  },
];

export type TemplateCategory = "fidelização" | "retenção" | "recuperação" | "aquisição" | "conversão" | "engajamento";

export interface SegmentTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  rules: SegmentRule[];
}

export interface SegmentRule {
  id: string;
  property: string;
  operator: string;
  value: string;
}

export const categoryColors: Record<TemplateCategory, { bg: string; text: string; border: string }> = {
  fidelização: { bg: "rgba(245,166,35,0.1)", text: "#D97706", border: "rgba(245,166,35,0.3)" },
  retenção: { bg: "rgba(239,68,68,0.1)", text: "#DC2626", border: "rgba(239,68,68,0.3)" },
  recuperação: { bg: "rgba(242,107,42,0.1)", text: "#F26B2A", border: "rgba(242,107,42,0.3)" },
  aquisição: { bg: "rgba(34,197,94,0.1)", text: "#16A34A", border: "rgba(34,197,94,0.3)" },
  conversão: { bg: "rgba(59,130,246,0.1)", text: "#2563EB", border: "rgba(59,130,246,0.3)" },
  engajamento: { bg: "rgba(139,92,246,0.1)", text: "#7C3AED", border: "rgba(139,92,246,0.3)" },
};

export const segmentTemplates: SegmentTemplate[] = [
  {
    id: "tpl-001",
    name: "Clientes VIP",
    description: "Compraram 3+ vezes com ticket médio acima de R$ 500",
    category: "fidelização",
    icon: "crown",
    rules: [
      { id: "r1", property: "Total de compras", operator: "é maior que", value: "3" },
      { id: "r2", property: "Ticket médio", operator: "é maior que", value: "500" },
    ],
  },
  {
    id: "tpl-002",
    name: "Em Risco de Churn",
    description: "Sem compra há 60+ dias sendo antes recorrente",
    category: "retenção",
    icon: "warning",
    rules: [
      { id: "r1", property: "Última compra", operator: "nos últimos X dias", value: "60" },
      { id: "r2", property: "Total de compras", operator: "é maior que", value: "2" },
    ],
  },
  {
    id: "tpl-003",
    name: "Carrinho Abandonado 24h",
    description: "Abandonaram carrinho nas últimas 24 horas",
    category: "recuperação",
    icon: "cart",
    rules: [
      { id: "r1", property: "Carrinho abandonado", operator: "nos últimos X dias", value: "1" },
    ],
  },
  {
    id: "tpl-004",
    name: "Novos Leads Semana",
    description: "Cadastrados nos últimos 7 dias",
    category: "aquisição",
    icon: "userplus",
    rules: [
      { id: "r1", property: "Data de cadastro", operator: "nos últimos X dias", value: "7" },
    ],
  },
  {
    id: "tpl-005",
    name: "Compradores de Primeira Vez",
    description: "Realizaram apenas 1 pedido até o momento",
    category: "conversão",
    icon: "package",
    rules: [
      { id: "r1", property: "Total de compras", operator: "é igual a", value: "1" },
    ],
  },
  {
    id: "tpl-006",
    name: "Aniversariantes do Mês",
    description: "Clientes que fazem aniversário no mês atual",
    category: "engajamento",
    icon: "cake",
    rules: [
      { id: "r1", property: "Mês de aniversário", operator: "é igual a", value: "mês atual" },
    ],
  },
  {
    id: "tpl-007",
    name: "Alto LTV",
    description: "Customer Lifetime Value acima de R$ 2.000",
    category: "fidelização",
    icon: "chart",
    rules: [
      { id: "r1", property: "LTV", operator: "é maior que", value: "2000" },
    ],
  },
  {
    id: "tpl-008",
    name: "Inativos 90 Dias",
    description: "Sem nenhuma interação há mais de 90 dias",
    category: "retenção",
    icon: "clock",
    rules: [
      { id: "r1", property: "Última interação", operator: "nos últimos X dias", value: "90" },
    ],
  },
  {
    id: "tpl-009",
    name: "Engajados Email",
    description: "Abriram pelo menos 1 e-mail nos últimos 30 dias",
    category: "engajamento",
    icon: "envelope",
    rules: [
      { id: "r1", property: "Abriu email", operator: "nos últimos X dias", value: "30" },
    ],
  },
];

export const propertyOptions = [
  "Total de compras",
  "LTV",
  "Última compra",
  "Ticket médio",
  "Segmento",
  "Tag",
  "Cidade",
  "Canal de origem",
  "Abriu email",
  "Data de cadastro",
  "Carrinho abandonado",
  "Mês de aniversário",
  "Última interação",
];

export const operatorOptions = [
  "é igual a",
  "não é igual a",
  "é maior que",
  "é menor que",
  "contém",
  "não contém",
  "está entre",
  "nos últimos X dias",
];
