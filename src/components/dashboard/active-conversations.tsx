"use client";

import { motion } from "framer-motion";
import { mockConversations } from "@/data/mock";
import {
  WhatsappLogo,
  InstagramLogo,
  ChatCircle,
  ArrowRight,
} from "@phosphor-icons/react";

const channelIcons = {
  whatsapp: WhatsappLogo,
  instagram: InstagramLogo,
  webchat: ChatCircle,
};

const channelColors = {
  whatsapp: "#25D366",
  instagram: "#E4405F",
  webchat: "#3B82F6",
};

export function ActiveConversations() {
  const openConversations = mockConversations.filter(
    (c) => c.status !== "resolved"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-background-card border border-border p-5"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Conversas Ativas
          </h3>
          <p className="text-sm text-text-muted mt-0.5">
            {openConversations.length} abertas
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm text-worder-primary font-medium hover:underline cursor-pointer">
          Inbox
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <div className="space-y-3">
        {openConversations.map((conv, i) => {
          const ChannelIcon = channelIcons[conv.channel];
          const color = channelColors[conv.channel];

          return (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-background transition-colors duration-200 cursor-pointer group"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-border-subtle dark:bg-[#2A2A2A] flex items-center justify-center text-sm font-bold text-text-primary">
                  {conv.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background-card"
                  style={{ background: color }}
                >
                  <ChannelIcon size={12} weight="fill" className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary truncate">
                    {conv.customerName}
                  </span>
                  {conv.unreadCount > 0 && (
                    <span className="flex-shrink-0 bg-worder-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted truncate mt-0.5">
                  {conv.lastMessage}
                </p>
                {conv.assignedTo && (
                  <p className="text-[11px] text-text-muted mt-1">
                    Atribuído: {conv.assignedTo}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
