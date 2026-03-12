"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  UsersThree,
  CreditCard,
  EnvelopeSimple,
  WhatsappLogo,
  InstagramLogo,
  ChatCircleDots,
  Crosshair,
  GitBranch,
  Link as LinkIcon,
  Key,
  ShieldCheck,
} from "@phosphor-icons/react";

const settingsTabs = [
  { href: "/settings/account", label: "Conta", icon: <User size={15} weight="fill" /> },
  { href: "/settings/users", label: "Usuários", icon: <UsersThree size={15} weight="fill" /> },
  { href: "/settings/billing", label: "Cobrança", icon: <CreditCard size={15} weight="fill" /> },
  { href: "/settings/email", label: "E-mail", icon: <EnvelopeSimple size={15} weight="fill" /> },
  { href: "/settings/whatsapp", label: "WhatsApp", icon: <WhatsappLogo size={15} weight="fill" /> },
  { href: "/settings/instagram", label: "Instagram", icon: <InstagramLogo size={15} weight="fill" /> },
  { href: "/settings/chat-web", label: "Chat Web", icon: <ChatCircleDots size={15} weight="fill" /> },
  { href: "/settings/tracking", label: "Tracking", icon: <Crosshair size={15} weight="fill" /> },
  { href: "/settings/attribution", label: "Atribuição", icon: <GitBranch size={15} weight="fill" /> },
  { href: "/settings/utm", label: "UTM", icon: <LinkIcon size={15} weight="fill" /> },
  { href: "/settings/api", label: "API", icon: <Key size={15} weight="fill" /> },
  { href: "/settings/security", label: "Segurança", icon: <ShieldCheck size={15} weight="fill" /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {/* Horizontal tabs */}
      <div className="border-b border-[#E0E0E0] bg-white px-6 overflow-x-auto">
        <div className="flex items-center gap-0.5 min-w-max">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-medium transition-colors whitespace-nowrap"
                style={{ color: isActive ? "#F26B2A" : "#888" }}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="settings-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, #F26B2A, #F5A623)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
