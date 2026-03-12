"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  CalendarBlank,
  List,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignWizard } from "@/components/campaigns/campaign-wizard";
import { campaignKPIs, campaignsData } from "@/lib/mock-data/campaigns";

export default function CampaignsPage() {
  const [view, setView] = useState<"list" | "wizard">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filtered = useMemo(() => {
    return campaignsData.filter((c) => {
      const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesChannel =
        channelFilter === "Todos" ||
        (channelFilter === "E-mail" && c.channel === "email") ||
        (channelFilter === "WhatsApp" && c.channel === "whatsapp") ||
        (channelFilter === "SMS" && c.channel === "sms");
      const matchesStatus =
        statusFilter === "Todos" ||
        (statusFilter === "Enviado" && c.status === "sent") ||
        (statusFilter === "Rascunho" && c.status === "draft") ||
        (statusFilter === "Agendado" && c.status === "scheduled");
      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [searchQuery, channelFilter, statusFilter]);

  if (view === "wizard") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-7 py-6 space-y-6"
      >
        <PageHeader
          title="Nova Campanha"
          breadcrumb={["Campanhas", "Nova Campanha"]}
        />
        <CampaignWizard onBack={() => setView("list")} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-7 py-6 space-y-6"
    >
      <PageHeader
        title="Campanhas"
        breadcrumb={["Campanhas"]}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignKPIs.map((kpi, i) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeLabel={kpi.changeLabel}
            icon={kpi.icon}
            index={i}
          />
        ))}
      </div>

      {/* Action bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Pesquisar campanhas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-[#E0E0E0] w-[240px] focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="relative">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
              style={{ borderRadius: "10px" }}
            >
              <option>Todos</option>
              <option>E-mail</option>
              <option>WhatsApp</option>
              <option>SMS</option>
            </select>
            <Funnel size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-[#E0E0E0] text-text-secondary cursor-pointer focus:border-worder-primary outline-none"
              style={{ borderRadius: "10px" }}
            >
              <option>Todos</option>
              <option>Enviado</option>
              <option>Rascunho</option>
              <option>Agendado</option>
            </select>
            <CalendarBlank size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F0F0F0] p-0.5" style={{ borderRadius: "10px" }}>
            <button className="px-2.5 py-1.5 rounded-lg bg-white shadow-sm">
              <List size={16} className="text-text-primary" />
            </button>
            <button className="px-2.5 py-1.5 rounded-lg">
              <CalendarBlank size={16} className="text-text-muted" />
            </button>
          </div>
          <button
            onClick={() => setView("wizard")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
            }}
          >
            <Plus size={16} weight="bold" />
            Criar campanha
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-background-card border border-border overflow-hidden"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <CampaignsTable campaigns={filtered} />
      </div>
    </motion.div>
  );
}
