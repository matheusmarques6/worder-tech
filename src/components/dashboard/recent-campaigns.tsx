"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Megaphone, ArrowRight } from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { recentCampaigns } from "@/lib/mock-data/dashboard";

export function RecentCampaigns() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-background-card border border-border overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2">
          <Megaphone
            size={20}
            weight="fill"
            className="text-worder-primary"
          />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Campanhas Recentes
          </h3>
        </div>
        <Link
          href="/campaigns"
          className="flex items-center gap-1 text-sm text-worder-primary font-medium hover:underline"
        >
          Ver todas
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Enviados</TableHead>
              <TableHead className="text-right">Abertura</TableHead>
              <TableHead className="text-right">Cliques</TableHead>
              <TableHead className="text-right">Receita</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCampaigns.map((campaign) => (
              <TableRow key={campaign.name}>
                <TableCell>
                  <span className="font-medium">{campaign.name}</span>
                </TableCell>
                <TableCell>
                  <ChannelBadge channel={campaign.channel} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={campaign.status} />
                </TableCell>
                <TableCell className="text-right">
                  {campaign.sent > 0
                    ? campaign.sent.toLocaleString("pt-BR")
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.openRate > 0 ? `${campaign.openRate}%` : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.clickRate > 0 ? `${campaign.clickRate}%` : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold">
                    {campaign.revenue > 0
                      ? `R$ ${campaign.revenue.toLocaleString("pt-BR")}`
                      : "—"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
