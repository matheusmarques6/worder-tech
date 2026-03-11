// ============================================
// WORDER TYPE DEFINITIONS
// ============================================

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  tags: string[];
  segment: string;
  ltv: number;
  status: "active" | "inactive" | "at_risk" | "churned";
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";
  total: number;
  items: number;
  date: string;
  paymentMethod: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "email" | "sms" | "whatsapp";
  status: "draft" | "scheduled" | "sending" | "sent" | "paused";
  sentCount: number;
  openRate: number;
  clickRate: number;
  revenue: number;
  createdAt: string;
  scheduledAt?: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  channel: "whatsapp" | "instagram" | "webchat";
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: "open" | "pending" | "resolved";
  assignedTo?: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavigationItem[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
