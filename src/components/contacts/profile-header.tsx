"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dropdown } from "@/components/ui/dropdown";
import {
  ChatCircleDots,
  DotsThreeVertical,
  PencilSimple,
  Tag,
  Export,
  Trash,
  MapPin,
  Envelope,
} from "@phosphor-icons/react";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

interface ProfileHeaderProps {
  contact: ContactProfile;
}

export function ProfileHeader({ contact }: ProfileHeaderProps) {
  return (
    <div
      className="bg-background-card border border-border p-6 flex items-center justify-between"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center gap-5">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0"
          style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
        >
          {contact.name
            .split(/\s+/)
            .slice(0, 2)
            .map((w) => w.charAt(0).toUpperCase())
            .join("")}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-text-primary font-heading">
              {contact.name}
            </h2>
            <Badge variant="success" size="sm">
              Ativo
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Envelope size={14} weight="duotone" className="text-text-muted" />
              {contact.email}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} weight="duotone" className="text-text-muted" />
              {contact.location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          <ChatCircleDots size={16} weight="duotone" />
          Ver mensagens
        </Button>

        <Dropdown
          align="right"
          trigger={
            <Button variant="ghost" size="icon">
              <DotsThreeVertical size={20} weight="bold" />
            </Button>
          }
          items={[
            {
              label: "Editar perfil",
              icon: <PencilSimple size={16} weight="duotone" />,
            },
            {
              label: "Adicionar tag",
              icon: <Tag size={16} weight="duotone" />,
            },
            {
              label: "Exportar dados",
              icon: <Export size={16} weight="duotone" />,
            },
            { divider: true, label: "" },
            {
              label: "Excluir contato",
              icon: <Trash size={16} weight="duotone" />,
              danger: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
