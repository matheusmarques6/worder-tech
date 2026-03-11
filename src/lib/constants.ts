// ============================================
// WORDER CONSTANTS & SIDEBAR CONFIGURATION
// ============================================

export const COLORS = {
  primary: "#F26B2A",
  secondary: "#F5A623",
  dark: "#1A1A1A",
  background: "#FAFAFA",
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
} as const;

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: { label: string; href: string }[];
}

export const SIDEBAR_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "HouseLine",
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: "ChatCircleDots",
    badge: 12,
  },
  {
    label: "Contatos",
    href: "/contacts",
    icon: "UsersThree",
    children: [
      { label: "Todos", href: "/contacts" },
      { label: "Listas & Segmentos", href: "/contacts/lists" },
      { label: "Importar", href: "/contacts/import" },
    ],
  },
  {
    label: "Campanhas",
    href: "/campaigns",
    icon: "Megaphone",
  },
  {
    label: "Automações",
    href: "/automations",
    icon: "Lightning",
  },
  {
    label: "Recuperação",
    href: "/recovery",
    icon: "ShoppingCartSimple",
  },
  {
    label: "Site",
    href: "/site",
    icon: "Layout",
    children: [
      { label: "Formulários", href: "/site/forms" },
      { label: "Chat Widget", href: "/site/chat-widget" },
    ],
  },
  {
    label: "Conteúdo",
    href: "/content",
    icon: "FileText",
    children: [
      { label: "Templates", href: "/content/templates" },
      { label: "Produtos", href: "/content/products" },
      { label: "Mídia", href: "/content/media" },
      { label: "Cupons", href: "/content/coupons" },
    ],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: "ChartBar",
    children: [
      { label: "Painel", href: "/analytics" },
      { label: "Entregabilidade", href: "/analytics/deliverability" },
      { label: "Métricas", href: "/analytics/metrics" },
      { label: "Benchmarks", href: "/analytics/benchmarks" },
      { label: "Relatórios", href: "/analytics/reports" },
    ],
  },
];

export const SIDEBAR_BOTTOM: NavItem[] = [
  {
    label: "Integrações",
    href: "/integrations",
    icon: "Plugs",
  },
  {
    label: "Configurações",
    href: "/settings/account",
    icon: "GearSix",
    children: [
      { label: "Conta", href: "/settings/account" },
      { label: "Usuários", href: "/settings/users" },
      { label: "Cobrança", href: "/settings/billing" },
      { label: "E-mail", href: "/settings/email" },
      { label: "WhatsApp", href: "/settings/whatsapp" },
      { label: "Instagram", href: "/settings/instagram" },
      { label: "Chat Web", href: "/settings/chat-web" },
      { label: "Tracking", href: "/settings/tracking" },
      { label: "Atribuição", href: "/settings/attribution" },
      { label: "UTM", href: "/settings/utm" },
      { label: "API", href: "/settings/api" },
      { label: "Segurança", href: "/settings/security" },
    ],
  },
  {
    label: "Ajuda",
    href: "/help",
    icon: "Question",
  },
];

// Page titles mapping for breadcrumbs and headers
export const PAGE_TITLES: Record<string, { title: string; breadcrumb: string[] }> = {
  "/dashboard": { title: "Dashboard", breadcrumb: ["Dashboard"] },
  "/inbox": { title: "Inbox", breadcrumb: ["Inbox"] },
  "/contacts": { title: "Contatos", breadcrumb: ["Contatos", "Todos"] },
  "/contacts/lists": { title: "Listas & Segmentos", breadcrumb: ["Contatos", "Listas & Segmentos"] },
  "/contacts/import": { title: "Importar Contatos", breadcrumb: ["Contatos", "Importar"] },
  "/campaigns": { title: "Campanhas", breadcrumb: ["Campanhas"] },
  "/campaigns/create": { title: "Nova Campanha", breadcrumb: ["Campanhas", "Nova Campanha"] },
  "/automations": { title: "Automações", breadcrumb: ["Automações"] },
  "/automations/templates": { title: "Templates de Automação", breadcrumb: ["Automações", "Templates"] },
  "/recovery": { title: "Recuperação", breadcrumb: ["Recuperação"] },
  "/site/forms": { title: "Formulários", breadcrumb: ["Site", "Formulários"] },
  "/site/chat-widget": { title: "Chat Widget", breadcrumb: ["Site", "Chat Widget"] },
  "/content/templates": { title: "Templates", breadcrumb: ["Conteúdo", "Templates"] },
  "/content/products": { title: "Produtos", breadcrumb: ["Conteúdo", "Produtos"] },
  "/content/media": { title: "Mídia", breadcrumb: ["Conteúdo", "Mídia"] },
  "/content/coupons": { title: "Cupons", breadcrumb: ["Conteúdo", "Cupons"] },
  "/analytics": { title: "Analytics", breadcrumb: ["Analytics", "Painel"] },
  "/analytics/deliverability": { title: "Entregabilidade", breadcrumb: ["Analytics", "Entregabilidade"] },
  "/analytics/metrics": { title: "Métricas", breadcrumb: ["Analytics", "Métricas"] },
  "/analytics/benchmarks": { title: "Benchmarks", breadcrumb: ["Analytics", "Benchmarks"] },
  "/analytics/reports": { title: "Relatórios", breadcrumb: ["Analytics", "Relatórios"] },
  "/integrations": { title: "Integrações", breadcrumb: ["Integrações"] },
  "/settings/account": { title: "Conta", breadcrumb: ["Configurações", "Conta"] },
  "/settings/users": { title: "Usuários", breadcrumb: ["Configurações", "Usuários"] },
  "/settings/billing": { title: "Cobrança", breadcrumb: ["Configurações", "Cobrança"] },
  "/settings/email": { title: "E-mail", breadcrumb: ["Configurações", "E-mail"] },
  "/settings/whatsapp": { title: "WhatsApp", breadcrumb: ["Configurações", "WhatsApp"] },
  "/settings/instagram": { title: "Instagram", breadcrumb: ["Configurações", "Instagram"] },
  "/settings/chat-web": { title: "Chat Web", breadcrumb: ["Configurações", "Chat Web"] },
  "/settings/tracking": { title: "Tracking", breadcrumb: ["Configurações", "Tracking"] },
  "/settings/attribution": { title: "Atribuição", breadcrumb: ["Configurações", "Atribuição"] },
  "/settings/utm": { title: "UTM", breadcrumb: ["Configurações", "UTM"] },
  "/settings/api": { title: "API", breadcrumb: ["Configurações", "API"] },
  "/settings/security": { title: "Segurança", breadcrumb: ["Configurações", "Segurança"] },
  "/onboarding": { title: "Onboarding", breadcrumb: ["Onboarding"] },
  "/onboarding/connect-store": { title: "Conectar Loja", breadcrumb: ["Onboarding", "Conectar Loja"] },
  "/onboarding/install-pixel": { title: "Instalar Pixel", breadcrumb: ["Onboarding", "Instalar Pixel"] },
  "/onboarding/connect-whatsapp": { title: "Conectar WhatsApp", breadcrumb: ["Onboarding", "Conectar WhatsApp"] },
  "/onboarding/import-contacts": { title: "Importar Contatos", breadcrumb: ["Onboarding", "Importar Contatos"] },
  "/onboarding/first-form": { title: "Primeiro Formulário", breadcrumb: ["Onboarding", "Primeiro Formulário"] },
  "/onboarding/first-automation": { title: "Primeira Automação", breadcrumb: ["Onboarding", "Primeira Automação"] },
  "/help": { title: "Ajuda", breadcrumb: ["Ajuda"] },
  "/design-system": { title: "Design System", breadcrumb: ["Dashboard", "Design System"] },
  "/campaigns/create/channel": { title: "Escolher Canal", breadcrumb: ["Campanhas", "Criar", "Escolher Canal"] },
  "/campaigns/create/audience": { title: "Definir Público", breadcrumb: ["Campanhas", "Criar", "Definir Público"] },
  "/campaigns/create/content": { title: "Montar Conteúdo", breadcrumb: ["Campanhas", "Criar", "Montar Conteúdo"] },
  "/campaigns/create/review": { title: "Revisar e Enviar", breadcrumb: ["Campanhas", "Criar", "Revisar e Enviar"] },
  "/contacts/lists/library": { title: "Biblioteca de Segmentos", breadcrumb: ["Contatos", "Listas", "Biblioteca"] },
  "/contacts/lists/create": { title: "Criar Segmento", breadcrumb: ["Contatos", "Listas", "Criar Segmento"] },
  "/content/templates/whatsapp": { title: "Templates WhatsApp", breadcrumb: ["Conteúdo", "Templates", "WhatsApp"] },
};
