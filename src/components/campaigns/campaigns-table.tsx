"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  WhatsappLogo,
  ChatText,
  DotsThree,
  PencilSimple,
  Copy,
  Archive,
  Trash,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { Campaign, CampaignChannel, CampaignStatus } from "@/lib/mock-data/campaigns";

interface CampaignsTableProps {
  campaigns: Campaign[];
}

function ChannelBadge({ channel }: { channel: CampaignChannel }) {
  const config = {
    email: { icon: <EnvelopeSimple size={14} weight="fill" />, label: "E-mail", variant: "info" as const },
    whatsapp: { icon: <WhatsappLogo size={14} weight="fill" />, label: "WhatsApp", variant: "success" as const },
    sms: { icon: <ChatText size={14} weight="fill" />, label: "SMS", variant: "default" as const },
  };
  const c = config[channel];
  return (
    <Badge variant={c.variant} size="sm" className="inline-flex items-center gap-1">
      {c.icon} {c.label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const config = {
    sent: { label: "Enviado", variant: "info" as const },
    draft: { label: "Rascunho", variant: "default" as const },
    scheduled: { label: "Agendado", variant: "warning" as const },
  };
  const c = config[status];
  return <Badge variant={c.variant} size="sm">{c.label}</Badge>;
}

function RateCell({ value, type }: { value?: number; type: "open" | "click" }) {
  if (value === undefined || value === null) return <span className="text-text-muted">—</span>;

  let colorClass = "text-error";
  if (type === "open") {
    if (value >= 20) colorClass = "text-success";
    else if (value >= 15) colorClass = "text-warning";
  } else {
    if (value >= 1.5) colorClass = "text-success";
    else if (value >= 1) colorClass = "text-warning";
  }

  return (
    <span className={`font-semibold ${colorClass}`} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value.toLocaleString("pt-BR", { minimumFractionDigits: value < 10 ? 2 : 1, maximumFractionDigits: 2 })}%
    </span>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const allSelected = campaigns.length > 0 && selectedIds.length === campaigns.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="py-3.5 px-4 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelectedIds(allSelected ? [] : campaigns.map((c) => c.id))}
                className="rounded border-white/30 accent-[#F26B2A]"
              />
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Campanha</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Canal</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Status</th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-widest font-semibold">Data</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Enviados</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Abertura</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Cliques</th>
            <th className="py-3.5 px-4 text-right text-[11px] uppercase tracking-widest font-semibold">Receita</th>
            <th className="py-3.5 px-4 text-center text-[11px] uppercase tracking-widest font-semibold w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {campaigns.map((campaign, index) => (
            <motion.tr
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="group hover:bg-[rgba(242,107,42,0.03)] transition-colors duration-150"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(campaign.id)}
                  onChange={() =>
                    setSelectedIds((prev) =>
                      prev.includes(campaign.id) ? prev.filter((x) => x !== campaign.id) : [...prev, campaign.id]
                    )
                  }
                  className="rounded border-[#DDD] accent-[#F26B2A]"
                />
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-text-primary text-[13px] hover:text-worder-primary transition-colors cursor-pointer">
                    {campaign.name}
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">{campaign.audience}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <ChannelBadge channel={campaign.channel} />
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={campaign.status} />
              </td>
              <td className="py-3 px-4">
                <span className="text-[13px] text-text-muted">
                  {campaign.sentDate
                    ? formatDate(campaign.sentDate)
                    : campaign.scheduledDate
                      ? formatDate(campaign.scheduledDate)
                      : "—"}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-text-primary font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {campaign.sent ? campaign.sent.toLocaleString("pt-BR") : "—"}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                {campaign.channel === "whatsapp" ? (
                  <div>
                    <span className="text-[11px] text-text-muted block">Lidas</span>
                    <RateCell value={campaign.readRate} type="open" />
                  </div>
                ) : campaign.channel === "sms" ? (
                  <span className="text-text-muted">—</span>
                ) : (
                  <RateCell value={campaign.openRate} type="open" />
                )}
              </td>
              <td className="py-3 px-4 text-right">
                {campaign.channel === "sms" ? (
                  <span className="text-text-muted">—</span>
                ) : (
                  <RateCell value={campaign.clickRate} type="click" />
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {campaign.revenue !== undefined && campaign.revenue > 0
                    ? `R$ ${campaign.revenue.toLocaleString("pt-BR")}`
                    : campaign.revenue === 0
                      ? "R$ 0"
                      : "—"}
                </span>
              </td>
              <td className="py-3 px-4 text-center relative">
                <button
                  onClick={() => setOpenMenu(openMenu === campaign.id ? null : campaign.id)}
                  className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <DotsThree size={18} weight="bold" className="text-text-muted" />
                </button>
                {openMenu === campaign.id && (
                  <div
                    className="absolute right-4 top-full mt-1 z-20 w-40 bg-white border border-[#E0E0E0] py-1 shadow-lg"
                    style={{ borderRadius: "10px" }}
                  >
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <PencilSimple size={14} /> Editar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Copy size={14} /> Duplicar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-secondary hover:bg-[#FAFAFA] transition-colors">
                      <Archive size={14} /> Arquivar
                    </button>
                    <div className="my-1 border-t border-[#F0F0F0]" />
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-error hover:bg-error/5 transition-colors">
                      <Trash size={14} /> Excluir
                    </button>
                  </div>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
