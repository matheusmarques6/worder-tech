// Mock data for /site/forms

export type FormType = "popup" | "embedded" | "flyout" | "bar";
export type FormStatus = "active" | "draft" | "paused";

export interface FormItem {
  id: string;
  name: string;
  type: FormType;
  status: FormStatus;
  targetList?: string;
  views?: number;
  submissionRate?: number;
  revenue?: number;
  updatedAt: string;
}

export const formsData: FormItem[] = [
  {
    id: "form-001",
    name: "POPUP PRINCIPAL [MOBILE]",
    type: "popup",
    status: "active",
    targetList: "TODOS OS LEADS",
    views: 12430,
    submissionRate: 3.2,
    revenue: 45200,
    updatedAt: "2026-03-12",
  },
  {
    id: "form-002",
    name: "POPUP PRINCIPAL [DESKTOP]",
    type: "popup",
    status: "active",
    targetList: "TODOS OS LEADS",
    views: 8720,
    submissionRate: 4.1,
    revenue: 62300,
    updatedAt: "2026-03-11",
  },
  {
    id: "form-003",
    name: "BARRA FRETE GRÁTIS",
    type: "bar",
    status: "active",
    targetList: "LEADS POP UP",
    views: 34500,
    updatedAt: "2026-03-10",
  },
  {
    id: "form-004",
    name: "EXIT INTENT CUPOM",
    type: "popup",
    status: "draft",
    targetList: "TODOS OS LEADS",
    updatedAt: "2026-03-05",
  },
  {
    id: "form-005",
    name: "FORMULÁRIO NEWSLETTER",
    type: "embedded",
    status: "active",
    targetList: "LEADS POP UP",
    views: 5230,
    submissionRate: 8.7,
    revenue: 12100,
    updatedAt: "2026-02-28",
  },
  {
    id: "form-006",
    name: "GIRE PARA GANHAR",
    type: "popup",
    status: "draft",
    targetList: "TODOS OS LEADS",
    updatedAt: "2026-02-15",
  },
];

// Form editor types

export type PopupStep = "teaser" | "optin" | "step2" | "success";

export interface PopupBlock {
  id: string;
  type: "heading" | "text" | "email_input" | "button" | "image" | "coupon" | "timer" | "link" | "phone_input" | "text_input" | "checkbox";
  content: string;
  props: Record<string, string>;
}

export interface PopupStepData {
  id: PopupStep;
  label: string;
  blocks: PopupBlock[];
}

export interface DisplayRules {
  exitIntent: boolean;
  delay: boolean;
  delaySeconds: number;
  scroll: boolean;
  scrollPercent: number;
  pageViews: boolean;
  pageViewsCount: number;
  allConditions: boolean;
}

export interface TargetingRules {
  visitors: "all" | "new" | "returning";
  device: "all" | "mobile" | "desktop";
  urlContains: string;
  trafficSource: "all" | "google" | "facebook" | "instagram" | "direct";
}

export interface FrequencyRules {
  hideAfterSubmit: boolean;
  showAgainDays: number;
}

export interface PopupStyles {
  bgColor: string;
  overlayColor: string;
  position: "center" | "bottom" | "top";
  animation: "fade" | "slide-up" | "slide-down" | "scale";
  borderRadius: number;
  shadow: "none" | "sm" | "md" | "lg";
}

// Pre-built popup mock
export const defaultPopupSteps: PopupStepData[] = [
  {
    id: "teaser",
    label: "Teaser",
    blocks: [
      {
        id: "t1",
        type: "text",
        content: "🎁 Ganhe 10% OFF",
        props: { fontSize: "14", fontWeight: "bold", color: "#FFFFFF", align: "center" },
      },
    ],
  },
  {
    id: "optin",
    label: "Email Opt-in",
    blocks: [
      {
        id: "o1",
        type: "heading",
        content: "Seu desconto está esperando!",
        props: { fontSize: "24", fontWeight: "bold", color: "#1A1A1A", align: "center" },
      },
      {
        id: "o2",
        type: "text",
        content: "Cadastre-se e receba 10% OFF na sua primeira compra",
        props: { fontSize: "14", color: "#666", align: "center" },
      },
      {
        id: "o3",
        type: "email_input",
        content: "Seu melhor e-mail",
        props: { placeholder: "seu@email.com" },
      },
      {
        id: "o4",
        type: "button",
        content: "QUERO MEU CUPOM",
        props: { bgColor: "#F26B2A", textColor: "#FFFFFF", fontSize: "14", fontWeight: "bold" },
      },
      {
        id: "o5",
        type: "link",
        content: "Não, obrigado",
        props: { color: "#999", fontSize: "12", align: "center" },
      },
    ],
  },
  {
    id: "success",
    label: "Sucesso",
    blocks: [
      {
        id: "s1",
        type: "heading",
        content: "Cupom enviado! 🎉",
        props: { fontSize: "24", fontWeight: "bold", color: "#1A1A1A", align: "center" },
      },
      {
        id: "s2",
        type: "coupon",
        content: "WORDER10",
        props: { bgColor: "#F5F5F5", textColor: "#F26B2A", fontSize: "20" },
      },
      {
        id: "s3",
        type: "text",
        content: "Use o código acima no checkout. Válido por 7 dias.",
        props: { fontSize: "13", color: "#888", align: "center" },
      },
      {
        id: "s4",
        type: "button",
        content: "IR ÀS COMPRAS",
        props: { bgColor: "#1A1A1A", textColor: "#FFFFFF", fontSize: "14", fontWeight: "bold" },
      },
    ],
  },
];

export const defaultDisplayRules: DisplayRules = {
  exitIntent: true,
  delay: true,
  delaySeconds: 12,
  scroll: false,
  scrollPercent: 70,
  pageViews: false,
  pageViewsCount: 2,
  allConditions: false,
};

export const defaultTargetingRules: TargetingRules = {
  visitors: "all",
  device: "all",
  urlContains: "",
  trafficSource: "all",
};

export const defaultFrequencyRules: FrequencyRules = {
  hideAfterSubmit: true,
  showAgainDays: 5,
};

export const defaultPopupStyles: PopupStyles = {
  bgColor: "#FFFFFF",
  overlayColor: "rgba(0,0,0,0.5)",
  position: "center",
  animation: "scale",
  borderRadius: 16,
  shadow: "lg",
};
