// Mock data for /content/* pages

// === TEMPLATES ===

export type TemplateType = "promotional" | "transactional" | "seasonal" | "automation" | "engagement";
export type TemplateLayout = "1-col" | "2-col" | "hero";

export interface EmailTemplate {
  id: string;
  name: string;
  type: TemplateType;
  layout: TemplateLayout;
  colors: [string, string]; // [primary, secondary] for preview
  updatedAt: string;
  isCustom?: boolean;
}

export const templateTypeLabels: Record<TemplateType, string> = {
  promotional: "Promocional",
  transactional: "Transacional",
  seasonal: "Sazonal",
  automation: "Automação",
  engagement: "Engajamento",
};

export const emailTemplates: EmailTemplate[] = [
  { id: "tpl-001", name: "Promoção Flash Sale", type: "promotional", layout: "hero", colors: ["#DC2626", "#D97706"], updatedAt: "2026-03-10" },
  { id: "tpl-002", name: "Boas-vindas", type: "automation", layout: "1-col", colors: ["#3B82F6", "#FFFFFF"], updatedAt: "2026-03-08" },
  { id: "tpl-003", name: "Carrinho Abandonado", type: "automation", layout: "1-col", colors: ["#F26B2A", "#FFF7ED"], updatedAt: "2026-03-05" },
  { id: "tpl-004", name: "Dia das Mães", type: "seasonal", layout: "hero", colors: ["#EC4899", "#FDF2F8"], updatedAt: "2026-02-28" },
  { id: "tpl-005", name: "Lançamento Produto", type: "promotional", layout: "2-col", colors: ["#1A1A1A", "#D97706"], updatedAt: "2026-02-25" },
  { id: "tpl-006", name: "Pós-compra Obrigado", type: "transactional", layout: "1-col", colors: ["#22C55E", "#F0FDF4"], updatedAt: "2026-02-20" },
  { id: "tpl-007", name: "Black Friday", type: "seasonal", layout: "hero", colors: ["#1A1A1A", "#EAB308"], updatedAt: "2026-02-15" },
  { id: "tpl-008", name: "Newsletter Semanal", type: "engagement", layout: "2-col", colors: ["#93C5FD", "#EFF6FF"], updatedAt: "2026-02-10" },
  { id: "tpl-009", name: "Cupom Aniversário", type: "engagement", layout: "1-col", colors: ["#8B5CF6", "#F5F3FF"], updatedAt: "2026-02-05" },
  { id: "tpl-010", name: "Reativação", type: "automation", layout: "hero", colors: ["#EA580C", "#FFF7ED"], updatedAt: "2026-01-30" },
  { id: "tpl-011", name: "Avaliação Pedido", type: "transactional", layout: "1-col", colors: ["#EAB308", "#FEFCE8"], updatedAt: "2026-01-25" },
  { id: "tpl-012", name: "Natal/Ano Novo", type: "seasonal", layout: "hero", colors: ["#DC2626", "#22C55E"], updatedAt: "2026-01-20" },
];

// WhatsApp templates
export type WATemplateStatus = "approved" | "pending" | "rejected";
export type WATemplateCategory = "marketing" | "transactional" | "otp";

export interface WATemplate {
  id: string;
  name: string;
  category: WATemplateCategory;
  status: WATemplateStatus;
  language: string;
  updatedAt: string;
  body?: string;
}

export const waTemplates: WATemplate[] = [
  { id: "wa-001", name: "Recuperação de carrinho", category: "marketing", status: "approved", language: "pt_BR", updatedAt: "2026-03-10", body: "Oi {{1}}! Você deixou itens no carrinho. Finalize sua compra com 10% OFF: {{2}}" },
  { id: "wa-002", name: "Confirmação de pedido", category: "transactional", status: "approved", language: "pt_BR", updatedAt: "2026-03-08" },
  { id: "wa-003", name: "Lembrete PIX", category: "transactional", status: "approved", language: "pt_BR", updatedAt: "2026-03-05" },
  { id: "wa-004", name: "Cupom de desconto", category: "marketing", status: "approved", language: "pt_BR", updatedAt: "2026-03-01" },
  { id: "wa-005", name: "Código de verificação", category: "otp", status: "approved", language: "pt_BR", updatedAt: "2026-02-28" },
  { id: "wa-006", name: "Lançamento VIP", category: "marketing", status: "pending", language: "pt_BR", updatedAt: "2026-03-11" },
  { id: "wa-007", name: "Avaliação pós-entrega", category: "marketing", status: "rejected", language: "pt_BR", updatedAt: "2026-02-20" },
];

// === PRODUCTS ===

export type ProductStatus = "published" | "unpublished";

export interface Product {
  id: string;
  name: string;
  sku: string;
  status: ProductStatus;
  price: number;
  stock: number;
  color: string; // placeholder color
  addedAt: string;
  updatedAt: string;
}

export const productsData: Product[] = [
  { id: "prod-001", name: "Camiseta Básica Algodão", sku: "CAM-001", status: "published", price: 79.9, stock: 234, color: "#E0E7FF", addedAt: "2025-08-15", updatedAt: "2026-03-12" },
  { id: "prod-002", name: "Tênis Runner Pro", sku: "TEN-002", status: "published", price: 349.9, stock: 56, color: "#FEE2E2", addedAt: "2025-09-01", updatedAt: "2026-03-11" },
  { id: "prod-003", name: "Bolsa Couro Elegance", sku: "BOL-003", status: "published", price: 289.0, stock: 18, color: "#FEF3C7", addedAt: "2025-10-10", updatedAt: "2026-03-10" },
  { id: "prod-004", name: "Kit Skincare Completo", sku: "SKI-004", status: "published", price: 199.9, stock: 89, color: "#D1FAE5", addedAt: "2025-11-05", updatedAt: "2026-03-09" },
  { id: "prod-005", name: "Relógio Digital Sport", sku: "REL-005", status: "published", price: 459.0, stock: 23, color: "#E0E7FF", addedAt: "2025-12-01", updatedAt: "2026-03-08" },
  { id: "prod-006", name: "Óculos Sol Vintage", sku: "OCU-006", status: "published", price: 189.9, stock: 67, color: "#FEF9C3", addedAt: "2026-01-10", updatedAt: "2026-03-07" },
  { id: "prod-007", name: "Vestido Midi Floral", sku: "VES-007", status: "published", price: 259.9, stock: 42, color: "#FCE7F3", addedAt: "2026-01-15", updatedAt: "2026-03-06" },
  { id: "prod-008", name: "Mochila Urban Tech", sku: "MOC-008", status: "published", price: 179.9, stock: 110, color: "#E0E7FF", addedAt: "2026-01-20", updatedAt: "2026-03-05" },
  { id: "prod-009", name: "Perfume Essence 100ml", sku: "PER-009", status: "unpublished", price: 329.0, stock: 0, color: "#F3E8FF", addedAt: "2026-02-01", updatedAt: "2026-03-04" },
  { id: "prod-010", name: "Chinelo Comfort Slide", sku: "CHI-010", status: "published", price: 89.9, stock: 312, color: "#DBEAFE", addedAt: "2026-02-10", updatedAt: "2026-03-03" },
  { id: "prod-011", name: "Jaqueta Jeans Premium", sku: "JAQ-011", status: "published", price: 399.9, stock: 15, color: "#E0E7FF", addedAt: "2026-02-15", updatedAt: "2026-03-02" },
  { id: "prod-012", name: "Brinco Prata Elegante", sku: "BRI-012", status: "unpublished", price: 149.9, stock: 0, color: "#F1F5F9", addedAt: "2026-03-01", updatedAt: "2026-03-01" },
];

export interface ProductCategory {
  id: string;
  name: string;
  count: number;
}

export const productCategories: ProductCategory[] = [
  { id: "cat-001", name: "Roupas", count: 3 },
  { id: "cat-002", name: "Calçados", count: 3 },
  { id: "cat-003", name: "Acessórios", count: 3 },
  { id: "cat-004", name: "Beleza & Cuidados", count: 2 },
  { id: "cat-005", name: "Bolsas & Mochilas", count: 2 },
];

// === MEDIA ===

export interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video";
  size: number; // in KB
  color: string; // placeholder color
  uploadedAt: string;
}

export const mediaData: MediaItem[] = [
  { id: "med-001", name: "banner-promo.jpg", type: "image", size: 245, color: "#F26B2A", uploadedAt: "2026-03-12" },
  { id: "med-002", name: "hero-blackfriday.png", type: "image", size: 520, color: "#1A1A1A", uploadedAt: "2026-03-11" },
  { id: "med-003", name: "produto-tenis.jpg", type: "image", size: 180, color: "#FEE2E2", uploadedAt: "2026-03-10" },
  { id: "med-004", name: "logo-worder.svg", type: "image", size: 12, color: "#F5A623", uploadedAt: "2026-03-09" },
  { id: "med-005", name: "banner-natal.jpg", type: "image", size: 380, color: "#DC2626", uploadedAt: "2026-03-08" },
  { id: "med-006", name: "social-story.mp4", type: "video", size: 2400, color: "#8B5CF6", uploadedAt: "2026-03-07" },
  { id: "med-007", name: "email-header.png", type: "image", size: 95, color: "#3B82F6", uploadedAt: "2026-03-06" },
  { id: "med-008", name: "popup-bg.jpg", type: "image", size: 310, color: "#EC4899", uploadedAt: "2026-03-05" },
  { id: "med-009", name: "produto-bolsa.jpg", type: "image", size: 205, color: "#FEF3C7", uploadedAt: "2026-03-04" },
  { id: "med-010", name: "unboxing.mp4", type: "video", size: 4800, color: "#22C55E", uploadedAt: "2026-03-03" },
];

// === COUPONS ===

export type CouponType = "percentage" | "fixed" | "free_shipping";
export type CouponStatus = "active" | "expired" | "depleted";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  discount: string; // display value: "10%", "R$ 50", "Frete grátis"
  usesCount: number;
  usesLimit: number | null; // null = unlimited
  validUntil: string;
  status: CouponStatus;
  revenue: number;
  minPurchase?: number;
}

export const couponTypeConfig: Record<CouponType, { label: string; variant: "primary" | "info" | "success" }> = {
  percentage: { label: "Percentual", variant: "primary" },
  fixed: { label: "Valor fixo", variant: "info" },
  free_shipping: { label: "Frete grátis", variant: "success" },
};

export const couponsData: Coupon[] = [
  { id: "cpn-001", code: "WORDER10", type: "percentage", discount: "10%", usesCount: 32, usesLimit: 100, validUntil: "2026-06-30", status: "active", revenue: 12340, minPurchase: 100 },
  { id: "cpn-002", code: "FRETEGRATIS", type: "free_shipping", discount: "Frete grátis", usesCount: 156, usesLimit: 500, validUntil: "2026-12-31", status: "active", revenue: 45200 },
  { id: "cpn-003", code: "BEMVINDO20", type: "percentage", discount: "20%", usesCount: 89, usesLimit: null, validUntil: "2026-12-31", status: "active", revenue: 8900 },
  { id: "cpn-004", code: "FLASH50", type: "fixed", discount: "R$ 50", usesCount: 200, usesLimit: 200, validUntil: "2026-03-15", status: "depleted", revenue: 28100, minPurchase: 200 },
  { id: "cpn-005", code: "NATAL2025", type: "percentage", discount: "15%", usesCount: 500, usesLimit: 500, validUntil: "2025-12-31", status: "expired", revenue: 92300 },
  { id: "cpn-006", code: "VIP30", type: "percentage", discount: "30%", usesCount: 3, usesLimit: 10, validUntil: "2026-06-30", status: "active", revenue: 4500, minPurchase: 300 },
];
