"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
  Plus,
  GearSix,
  MagnifyingGlass,
  WhatsappLogo,
  InstagramLogo,
  ChatCircle,
} from "@phosphor-icons/react";
import type { InboxConversation, InboxChannel } from "@/lib/mock-data/inbox";

const channelIcon: Record<InboxChannel, { icon: React.ElementType; color: string }> = {
  whatsapp: { icon: WhatsappLogo, color: "text-[#25D366]" },
  instagram: { icon: InstagramLogo, color: "text-[#E4405F]" },
  webchat: { icon: ChatCircle, color: "text-[#F26B2A]" },
};

const tabConfig = [
  { value: "you", label: "Você", count: 3 },
  { value: "team", label: "Equipe", count: 24 },
  { value: "waiting", label: "Aguardando", count: 8 },
  { value: "bot", label: "IA/Bot", count: 156 },
  { value: "done", label: "Concluído" },
] as const;

function formatRelativeTime(iso: string): string {
  const now = new Date(2026, 2, 12, 14, 30);
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin}min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h`;
  if (diffHours < 48) return "ontem";
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

interface ConversationListProps {
  conversations: InboxConversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  const [activeTab, setActiveTab] = useState<string>("you");
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) => {
    const matchesTab = c.tab === activeTab;
    const matchesSearch =
      !search ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background-card border-r border-border" style={{ width: 320 }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-text-primary font-heading">Atendimento</h2>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-bg-hover dark:hover:bg-[#2A2A2A] text-text-muted hover:text-text-primary transition-colors cursor-pointer">
              <Plus size={18} weight="bold" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-bg-hover dark:hover:bg-[#2A2A2A] text-text-muted hover:text-text-primary transition-colors cursor-pointer">
              <GearSix size={18} weight="duotone" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlass
            size={16}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar nome ou telefone..."
            className="w-full h-9 pl-9 pr-3 text-sm bg-bg-hover dark:bg-[#2A2A2A] rounded-lg text-text-primary placeholder:text-text-muted outline-none focus:ring-1 focus:ring-worder-primary/30"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0 overflow-x-auto">
        {tabConfig.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "relative flex items-center gap-1 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer",
              activeTab === tab.value
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            {tab.label}
            {"count" in tab && tab.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none",
                  activeTab === tab.value
                    ? "bg-worder-primary/10 text-worder-primary"
                    : "bg-border-subtle dark:bg-[#2A2A2A] text-text-muted"
                )}
              >
                {tab.count}
              </span>
            )}
            {activeTab === tab.value && (
              <motion.div
                layoutId="inbox-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-worder-primary rounded-full"
                transition={{ duration: 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv, index) => {
          const isActive = conv.id === activeId;
          const ChIcon = channelIcon[conv.channel].icon;
          const chColor = channelIcon[conv.channel].color;

          return (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors relative cursor-pointer",
                isActive
                  ? "bg-worder-primary/[0.08] border-l-[3px] border-worder-primary"
                  : "border-l-[3px] border-transparent hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A]"
              )}
            >
              <div className="relative shrink-0">
                <Avatar name={conv.contactName} size="sm" />
                <span className={cn("absolute -bottom-0.5 -right-0.5", chColor)}>
                  <ChIcon size={14} weight="fill" />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={cn(
                      "text-sm truncate",
                      conv.unread ? "font-bold text-text-primary" : "font-medium text-text-primary"
                    )}
                  >
                    {conv.contactName}
                  </span>
                  <span className="text-[11px] text-text-muted shrink-0 ml-2">
                    {formatRelativeTime(conv.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "text-xs truncate max-w-[200px]",
                      conv.unread ? "text-text-secondary font-medium" : "text-text-muted"
                    )}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread && conv.unreadCount && (
                    <span className="ml-2 shrink-0 h-[18px] min-w-[18px] px-1 rounded-full bg-worder-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
