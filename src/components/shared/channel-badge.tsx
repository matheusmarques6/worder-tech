"use client";

import { cn } from "@/lib/utils";
import {
  WhatsappLogo,
  EnvelopeSimple,
  DeviceMobile,
  InstagramLogo,
  ChatCircle,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Channel = "whatsapp" | "email" | "sms" | "instagram" | "webchat";

interface ChannelBadgeProps {
  channel: Channel;
  className?: string;
}

const channelConfig: Record<
  Channel,
  { label: string; color: string; bg: string; icon: ReactNode }
> = {
  whatsapp: {
    label: "WhatsApp",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
    icon: <WhatsappLogo size={16} weight="fill" />,
  },
  email: {
    label: "E-mail",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    icon: <EnvelopeSimple size={16} weight="fill" />,
  },
  sms: {
    label: "SMS",
    color: "text-[#6B7280]",
    bg: "bg-[#6B7280]/10",
    icon: <DeviceMobile size={16} weight="fill" />,
  },
  instagram: {
    label: "Instagram",
    color: "text-[#E4405F]",
    bg: "bg-[#E4405F]/10",
    icon: <InstagramLogo size={16} weight="fill" />,
  },
  webchat: {
    label: "Chat Web",
    color: "text-[#F26B2A]",
    bg: "bg-[#F26B2A]/10",
    icon: <ChatCircle size={16} weight="fill" />,
  },
};

export function ChannelBadge({ channel, className }: ChannelBadgeProps) {
  const config = channelConfig[channel];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.color,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
