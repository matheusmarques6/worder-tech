"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  CalendarBlank,
  Export,
  FunnelSimple,
} from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { metricOptions, metricTimelineData, metricBreakdownData } from "@/lib/mock-data/analytics";

function MetricTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-background-card border border-border shadow-lg p-3" style={{ borderRadius: "10px" }}>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-sm font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
        {payload[0].value.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}

export default function Page() {
  const [selectedMetric, setSelectedMetric] = useState("placed_order");
  const [metricSearch, setMetricSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedOption = metricOptions.find((m) => m.id === selectedMetric);
  const filteredOptions = metricOptions.filter((m) =>
    m.name.toLowerCase().includes(metricSearch.toLowerCase())
  );

  // Group by category
  const categories = Array.from(new Set(filteredOptions.map((m) => m.category)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Métricas"
        breadcrumb={["Analytics", "Métricas"]}
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-text-secondary border border-border hover:bg-border-subtle transition-colors"
            style={{ borderRadius: "10px" }}
          >
            <Export size={16} weight="bold" />
            Exportar dados
          </button>
        }
      />

      {/* Metric selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border bg-background-card hover:border-worder-primary transition-colors min-w-[220px] text-left"
            style={{ borderRadius: "10px" }}
          >
            <span className="text-text-primary">{selectedOption?.name || "Selecione"}</span>
            <span className="text-[10px] text-text-muted ml-auto">{selectedOption?.category}</span>
          </button>

          {showDropdown && (
            <div
              className="absolute top-full mt-1 left-0 z-30 w-72 bg-background-card border border-border shadow-xl overflow-hidden"
              style={{ borderRadius: "12px" }}
            >
              <div className="p-2 border-b border-border-subtle">
                <div className="relative">
                  <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar métrica..."
                    value={metricSearch}
                    onChange={(e) => setMetricSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-border outline-none focus:border-worder-primary"
                    style={{ borderRadius: "8px" }}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto py-1">
                {categories.map((cat) => (
                  <div key={cat}>
                    <p className="px-3 py-1.5 text-[10px] text-text-muted uppercase tracking-widest font-semibold">{cat}</p>
                    {filteredOptions
                      .filter((m) => m.category === cat)
                      .map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedMetric(m.id);
                            setShowDropdown(false);
                            setMetricSearch("");
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover transition-colors flex items-center justify-between"
                          style={{
                            color: selectedMetric === m.id ? "#F26B2A" : undefined,
                            fontWeight: selectedMetric === m.id ? 600 : 400,
                          }}
                        >
                          {m.name}
                          {selectedMetric === m.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-worder-primary" />
                          )}
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <CalendarBlank size={14} className="text-text-muted" />
          <select
            className="px-3 py-2 text-[12px] border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
            style={{ borderRadius: "8px" }}
          >
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Últimos 90 dias</option>
          </select>
        </div>

        <div className="relative">
          <FunnelSimple size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select
            className="pl-8 pr-6 py-2 text-[12px] border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
            style={{ borderRadius: "8px" }}
          >
            <option>Todos os canais</option>
            <option>Email</option>
            <option>WhatsApp</option>
            <option>SMS</option>
          </select>
        </div>
      </div>

      {/* Metric chart */}
      <motion.div
        key={selectedMetric}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-bg-input border border-border p-5"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-text-primary font-heading">
            {selectedOption?.name} — Últimos 30 dias
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-worder-primary" />
            <span className="text-[11px] text-text-muted">{selectedOption?.name}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metricTimelineData}>
            <defs>
              <linearGradient id="metricBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F26B2A" stopOpacity={1} />
                <stop offset="100%" stopColor="#F5A623" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} interval={4} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} width={50} />
            <Tooltip content={<MetricTooltip />} />
            <Bar dataKey="value" fill="url(#metricBarGrad)" radius={[4, 4, 0, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Breakdown table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-background-card border border-border overflow-hidden"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="px-5 py-4 border-b border-border-subtle">
          <h3 className="text-base font-semibold text-text-primary font-heading">
            Breakdown por campanha/fluxo
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-subtle">
              <th className="py-3 px-5 text-left text-[11px] uppercase tracking-widest font-semibold text-text-muted">Nome</th>
              <th className="py-3 px-5 text-left text-[11px] uppercase tracking-widest font-semibold text-text-muted">Tipo</th>
              <th className="py-3 px-5 text-right text-[11px] uppercase tracking-widest font-semibold text-text-muted">Contagem</th>
              <th className="py-3 px-5 text-right text-[11px] uppercase tracking-widest font-semibold text-text-muted">Receita</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {metricBreakdownData.map((row, i) => (
              <motion.tr
                key={row.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="hover:bg-[rgba(242,107,42,0.03)] transition-colors"
              >
                <td className="py-3.5 px-5 font-medium text-text-primary text-[13px]">{row.name}</td>
                <td className="py-3.5 px-5">
                  <Badge variant={row.type === "campaign" ? "primary" : "info"} size="sm">
                    {row.type === "campaign" ? "Campanha" : "Fluxo"}
                  </Badge>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {row.count.toLocaleString("pt-BR")}
                </td>
                <td className="py-3.5 px-5 text-right font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  R$ {row.revenue.toLocaleString("pt-BR")}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
