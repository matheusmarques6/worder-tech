"use client";

import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventTimeline } from "./event-timeline";
import {
  Envelope,
  WhatsappLogo,
  ChatCircle,
  CheckCircle,
  XCircle,
  Plus,
  Tag,
  Globe,
  IdentificationCard,
  MapPin,
  Clock,
  Megaphone,
  LinkSimple,
  DeviceMobile,
} from "@phosphor-icons/react";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

const channelIcons: Record<string, React.ElementType> = {
  email: Envelope,
  whatsapp: WhatsappLogo,
  sms: DeviceMobile,
};

interface TabDetailsProps {
  contact: ContactProfile;
}

export function TabDetails({ contact }: TabDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_0.67fr] gap-6"
    >
      {/* Left column — data */}
      <div className="space-y-5">
        {/* Canais */}
        <Card>
          <CardTitle className="mb-4 flex items-center gap-2">
            <ChatCircle size={18} weight="duotone" className="text-worder-primary" />
            Canais
          </CardTitle>
          <div className="space-y-3">
            {contact.channels.map((ch) => {
              const Icon = channelIcons[ch.channel];
              return (
                <div
                  key={ch.channel}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} weight="duotone" className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary">
                      {ch.label}
                    </span>
                  </div>
                  {ch.subscribed ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle size={12} weight="fill" className="mr-1" />
                      Inscrito
                    </Badge>
                  ) : (
                    <Badge variant="default" size="sm">
                      <XCircle size={12} weight="fill" className="mr-1" />
                      Não inscrito
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Propriedades Personalizadas */}
        <Card>
          <CardTitle className="mb-4 flex items-center gap-2">
            <IdentificationCard size={18} weight="duotone" className="text-worder-primary" />
            Propriedades Personalizadas
          </CardTitle>
          <div className="space-y-2">
            {contact.properties.map((prop) => (
              <div
                key={prop.key}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm text-text-muted">{prop.key}</span>
                <span className="text-sm font-medium text-text-primary">{prop.value}</span>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 text-worder-primary">
            <Plus size={14} weight="bold" />
            Adicionar propriedade
          </Button>
        </Card>

        {/* Informações */}
        <Card>
          <CardTitle className="mb-4 flex items-center gap-2">
            <Globe size={18} weight="duotone" className="text-worder-primary" />
            Informações
          </CardTitle>
          <div className="space-y-2.5">
            <InfoRow icon={IdentificationCard} label="ID" value={contact.id} />
            <InfoRow icon={MapPin} label="Localidade" value={contact.location} />
            <InfoRow icon={Clock} label="Fuso horário" value={contact.timezone} />
            <div className="pt-2 border-t border-border mt-3">
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-2">
                Como encontrou
              </p>
              <InfoRow icon={Globe} label="Origem" value={contact.source} />
              <InfoRow icon={Megaphone} label="Campanha" value={contact.campaign} />
              <InfoRow icon={Tag} label="Mídia" value={contact.medium} />
              <InfoRow
                icon={LinkSimple}
                label="URL de primeiro acesso"
                value={contact.firstUrl}
                truncate
              />
            </div>
          </div>
        </Card>

        {/* Tags */}
        <Card>
          <CardTitle className="mb-4 flex items-center gap-2">
            <Tag size={18} weight="duotone" className="text-worder-primary" />
            Tags
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {contact.tags.map((tag) => (
              <Badge key={tag.id} variant="primary" size="md">
                {tag.label}
              </Badge>
            ))}
            <button className="h-7 w-7 rounded-full border border-dashed border-border flex items-center justify-center text-text-muted hover:border-worder-primary hover:text-worder-primary transition-colors cursor-pointer">
              <Plus size={14} weight="bold" />
            </button>
          </div>
        </Card>
      </div>

      {/* Right column — timeline */}
      <div>
        <Card>
          <CardTitle className="mb-4">Linha do Tempo</CardTitle>
          <EventTimeline events={contact.timeline} />
        </Card>
      </div>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  truncate,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-1.5">
      <div className="flex items-center gap-2 text-sm text-text-muted shrink-0">
        <Icon size={14} weight="duotone" />
        {label}
      </div>
      <span
        className={`text-sm font-medium text-text-primary text-right ml-4 ${truncate ? "truncate max-w-[220px]" : ""}`}
        title={truncate ? value : undefined}
      >
        {value}
      </span>
    </div>
  );
}
