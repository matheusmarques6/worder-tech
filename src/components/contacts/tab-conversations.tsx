"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  WhatsappLogo,
  Envelope,
  InstagramLogo,
  ChatCircle,
  ArrowRight,
  User,
} from "@phosphor-icons/react";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

const channelConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  whatsapp: { icon: WhatsappLogo, color: "text-success", bg: "bg-success/10", label: "WhatsApp" },
  email: { icon: Envelope, color: "text-info", bg: "bg-info/10", label: "E-mail" },
  instagram: { icon: InstagramLogo, color: "text-[#E1306C]", bg: "bg-[#E1306C]/10", label: "Instagram" },
  chat: { icon: ChatCircle, color: "text-worder-primary", bg: "bg-worder-primary/10", label: "Chat Web" },
};

const statusLabels: Record<string, { label: string; variant: "success" | "default" | "warning" }> = {
  open: { label: "Aberta", variant: "success" },
  closed: { label: "Concluída", variant: "default" },
  waiting: { label: "Aguardando", variant: "warning" },
};

interface TabConversationsProps {
  contact: ContactProfile;
}

export function TabConversations({ contact }: TabConversationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-3">
        {contact.conversations.map((conv, index) => {
          const channel = channelConfig[conv.channel];
          const status = statusLabels[conv.status];
          const Icon = channel.icon;

          return (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
            >
              <Card className="!p-4 group cursor-pointer hover:border-worder-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${channel.bg}`}
                    >
                      <Icon size={20} weight="duotone" className={channel.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge
                          variant={
                            conv.channel === "whatsapp"
                              ? "success"
                              : conv.channel === "email"
                                ? "info"
                                : conv.channel === "instagram"
                                  ? "error"
                                  : "primary"
                          }
                          size="sm"
                        >
                          {channel.label}
                        </Badge>
                        <Badge variant={status.variant} size="sm">
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-primary truncate">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {conv.agent && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <User size={11} weight="fill" />
                            {conv.agent}
                          </span>
                        )}
                        <span className="text-xs text-text-muted">
                          {new Date(conv.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="text-text-muted group-hover:text-worder-primary transition-colors shrink-0 ml-3"
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
