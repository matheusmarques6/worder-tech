"use client";

import {
  EnvelopeSimple,
  WhatsappLogo,
  DeviceMobile,
  UserGear,
  ArrowSquareOut,
  Bell,
  Clock,
  GitFork,
  TreeStructure,
  Shuffle,
  Robot,
} from "@phosphor-icons/react";
import { useFlowBuilderStore } from "@/stores/flow-builder-store";
import type { FlowNodeType } from "@/lib/mock-data/automations";
import type { ReactNode } from "react";

interface ActionItem {
  type: FlowNodeType;
  label: string;
  icon: ReactNode;
  color: string;
  badge?: string;
}

const sections: { title: string; items: ActionItem[] }[] = [
  {
    title: "Mensagens",
    items: [
      {
        type: "email",
        label: "E-mail",
        icon: <EnvelopeSimple size={20} weight="fill" />,
        color: "#3B82F6",
      },
      {
        type: "whatsapp",
        label: "WhatsApp",
        icon: <WhatsappLogo size={20} weight="fill" />,
        color: "#25D366",
      },
      {
        type: "sms",
        label: "SMS",
        icon: <DeviceMobile size={20} weight="fill" />,
        color: "#6B7280",
      },
    ],
  },
  {
    title: "Dados",
    items: [
      {
        type: "update_contact",
        label: "Atualizar contato",
        icon: <UserGear size={20} weight="fill" />,
        color: "#8B5CF6",
      },
      {
        type: "webhook",
        label: "Webhook",
        icon: <ArrowSquareOut size={20} weight="fill" />,
        color: "#6366F1",
      },
      {
        type: "alert",
        label: "Alerta interno",
        icon: <Bell size={20} weight="fill" />,
        color: "#F59E0B",
      },
    ],
  },
  {
    title: "Lógica",
    items: [
      {
        type: "delay",
        label: "Atraso",
        icon: <Clock size={20} weight="fill" />,
        color: "#6B7280",
      },
      {
        type: "condition",
        label: "Divisão condicional",
        icon: <GitFork size={20} weight="fill" />,
        color: "#F59E0B",
      },
      {
        type: "condition_multi",
        label: "Condição múltipla",
        icon: <TreeStructure size={20} weight="fill" />,
        color: "#F59E0B",
      },
      {
        type: "ab_test",
        label: "Randomizador A/B",
        icon: <Shuffle size={20} weight="fill" />,
        color: "#8B5CF6",
      },
    ],
  },
  {
    title: "IA",
    items: [
      {
        type: "worder_ai",
        label: "Worder IA",
        icon: <Robot size={20} weight="fill" />,
        color: "#F26B2A",
        badge: "Novo",
      },
    ],
  },
];

export function ActionSidebar() {
  const { addNode, nodes } = useFlowBuilderStore();

  function handleAddAction(type: FlowNodeType) {
    // Place to the right of the rightmost node
    const maxX = nodes.reduce((max, n) => Math.max(max, n.x), 0);
    const avgY = nodes.length > 0
      ? nodes.reduce((sum, n) => sum + n.y, 0) / nodes.length
      : 220;
    addNode(type, maxX + 260, avgY);
  }

  return (
    <div className="w-[240px] bg-card border-r border-border flex flex-col flex-shrink-0 h-full overflow-y-auto">
      <div className="px-4 py-3 border-b border-separator">
        <h3 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">
          Ações
        </h3>
      </div>

      <div className="py-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-3">
            <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted/60">
              {section.title}
            </p>
            {section.items.map((item) => (
              <button
                key={item.type}
                onClick={() => handleAddAction(item.type)}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-hover transition-colors group"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <span className="text-[13px] font-medium text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-worder-primary/10 text-worder-primary">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
