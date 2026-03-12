"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  FunnelSimple,
  FloppyDisk,
  ArrowLeft,
  Users,
  Sparkle,
  CaretDown,
} from "@phosphor-icons/react";
import { propertyOptions, operatorOptions, type SegmentRule } from "@/lib/mock-data/lists";

type LogicOperator = "AND" | "OR";

interface RuleGroup {
  id: string;
  operator: LogicOperator;
  rules: SegmentRule[];
}

interface SegmentBuilderProps {
  initialName?: string;
  initialRules?: SegmentRule[];
  onBack: () => void;
}

let ruleCounter = 0;
function nextId() {
  ruleCounter += 1;
  return `rule-${ruleCounter}-${Date.now()}`;
}
let groupCounter = 0;
function nextGroupId() {
  groupCounter += 1;
  return `group-${groupCounter}-${Date.now()}`;
}

function estimateContacts(groups: RuleGroup[]): number {
  const totalRules = groups.reduce((sum, g) => sum + g.rules.length, 0);
  if (totalRules === 0) return 0;
  // Simulate based on rules
  const base = 27461;
  const factor = Math.max(0.02, 1 / (totalRules * 1.8));
  return Math.round(base * factor);
}

export function SegmentBuilder({ initialName = "", initialRules = [], onBack }: SegmentBuilderProps) {
  const [name, setName] = useState(initialName);
  const [groups, setGroups] = useState<RuleGroup[]>(() => {
    if (initialRules.length > 0) {
      return [{ id: nextGroupId(), operator: "AND" as LogicOperator, rules: initialRules }];
    }
    return [{ id: nextGroupId(), operator: "AND" as LogicOperator, rules: [{ id: nextId(), property: "", operator: "", value: "" }] }];
  });
  const [estimating, setEstimating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);

  const recalcEstimate = useCallback(() => {
    setEstimating(true);
    const timer = setTimeout(() => {
      setEstimate(estimateContacts(groups));
      setEstimating(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [groups]);

  useEffect(() => {
    const cleanup = recalcEstimate();
    return cleanup;
  }, [recalcEstimate]);

  function addRule(groupId: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, rules: [...g.rules, { id: nextId(), property: "", operator: "", value: "" }] }
          : g
      )
    );
  }

  function removeRule(groupId: string, ruleId: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, rules: g.rules.filter((r) => r.id !== ruleId) }
          : g
      ).filter((g) => g.rules.length > 0)
    );
  }

  function updateRule(groupId: string, ruleId: string, field: keyof SegmentRule, value: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, rules: g.rules.map((r) => (r.id === ruleId ? { ...r, [field]: value } : r)) }
          : g
      )
    );
  }

  function toggleGroupOperator(groupId: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, operator: g.operator === "AND" ? "OR" : "AND" } : g
      )
    );
  }

  function addGroup() {
    setGroups((prev) => [
      ...prev,
      { id: nextGroupId(), operator: "AND", rules: [{ id: nextId(), property: "", operator: "", value: "" }] },
    ]);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div
        className="bg-background-card border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[#F0F0F0] transition-colors"
          >
            <ArrowLeft size={18} className="text-text-muted" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-worder-primary/10">
              <FunnelSimple size={20} weight="fill" className="text-worder-primary" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do segmento..."
              className="text-lg font-semibold text-text-primary bg-transparent border-none outline-none placeholder:text-text-muted/50 focus:ring-0 w-full max-w-[300px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-[#F0F0F0] transition-colors"
            style={{ borderRadius: "10px" }}
          >
            Cancelar
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 8px rgba(242,107,42,0.3)",
            }}
          >
            <FloppyDisk size={16} weight="bold" />
            Salvar Segmento
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Rules Builder */}
        <div className="flex-1 space-y-4">
          <AnimatePresence mode="popLayout">
            {groups.map((group, gi) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                layout
              >
                {/* Group operator between groups */}
                {gi > 0 && (
                  <div className="flex items-center justify-center my-4">
                    <div className="h-px flex-1 bg-[#E0E0E0]" />
                    <button
                      onClick={() => toggleGroupOperator(group.id)}
                      className="mx-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors"
                      style={{
                        background: group.operator === "AND" ? "rgba(59,130,246,0.1)" : "rgba(242,107,42,0.1)",
                        color: group.operator === "AND" ? "#2563EB" : "#F26B2A",
                      }}
                    >
                      {group.operator === "AND" ? "E" : "OU"}
                    </button>
                    <div className="h-px flex-1 bg-[#E0E0E0]" />
                  </div>
                )}

                <div
                  className="bg-background-card border-2 border-dashed border-[#E0E0E0] p-5 space-y-3 hover:border-worder-primary/30 transition-colors"
                  style={{ borderRadius: "var(--radius-card)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                      Grupo {gi + 1}
                    </span>
                    {groups.length > 1 && (
                      <button
                        onClick={() => setGroups((prev) => prev.filter((g) => g.id !== group.id))}
                        className="text-[11px] text-text-muted hover:text-error transition-colors"
                      >
                        Remover grupo
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="popLayout">
                    {group.rules.map((rule, ri) => (
                      <motion.div
                        key={rule.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        {/* Operator between rules within a group */}
                        {ri > 0 && (
                          <div className="flex items-center gap-2 py-2 pl-2">
                            <button
                              onClick={() => toggleGroupOperator(group.id)}
                              className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors"
                              style={{
                                background: group.operator === "AND" ? "rgba(59,130,246,0.1)" : "rgba(242,107,42,0.1)",
                                color: group.operator === "AND" ? "#2563EB" : "#F26B2A",
                              }}
                            >
                              {group.operator === "AND" ? "E" : "OU"}
                            </button>
                            <div className="h-px flex-1 bg-[#F0F0F0]" />
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          {/* Property dropdown */}
                          <div className="relative flex-1">
                            <select
                              value={rule.property}
                              onChange={(e) => updateRule(group.id, rule.id, "property", e.target.value)}
                              className="appearance-none w-full pl-3 pr-8 py-2.5 text-sm bg-white border border-[#E0E0E0] text-text-primary cursor-pointer focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                              style={{ borderRadius: "10px" }}
                            >
                              <option value="">Propriedade...</option>
                              {propertyOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <CaretDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                          </div>

                          {/* Operator dropdown */}
                          <div className="relative flex-1">
                            <select
                              value={rule.operator}
                              onChange={(e) => updateRule(group.id, rule.id, "operator", e.target.value)}
                              className="appearance-none w-full pl-3 pr-8 py-2.5 text-sm bg-white border border-[#E0E0E0] text-text-primary cursor-pointer focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                              style={{ borderRadius: "10px" }}
                            >
                              <option value="">Operador...</option>
                              {operatorOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <CaretDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                          </div>

                          {/* Value input */}
                          <input
                            type="text"
                            value={rule.value}
                            onChange={(e) => updateRule(group.id, rule.id, "value", e.target.value)}
                            placeholder="Valor..."
                            className="flex-1 px-3 py-2.5 text-sm bg-white border border-[#E0E0E0] text-text-primary focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                            style={{ borderRadius: "10px" }}
                          />

                          {/* Remove rule */}
                          <button
                            onClick={() => removeRule(group.id, rule.id)}
                            className="flex-shrink-0 p-2 rounded-lg hover:bg-error/10 text-text-muted hover:text-error transition-colors"
                          >
                            <X size={16} weight="bold" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={() => addRule(group.id)}
                    className="flex items-center gap-1.5 mt-3 text-[13px] font-medium text-worder-primary hover:text-worder-primary/80 transition-colors"
                  >
                    <Plus size={14} weight="bold" />
                    Adicionar condição
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={addGroup}
            className="flex items-center gap-2 w-full px-4 py-3 border-2 border-dashed border-[#E0E0E0] text-sm font-medium text-text-muted hover:border-worder-primary/30 hover:text-worder-primary transition-all"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <Plus size={16} weight="bold" />
            Adicionar grupo de regras
          </button>
        </div>

        {/* Estimate Panel */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div
            className="bg-background-card border border-border p-5 sticky top-6"
            style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkle size={16} weight="fill" className="text-worder-primary" />
              <span className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">
                Preview em tempo real
              </span>
            </div>

            <div className="flex items-center justify-center py-6">
              {estimating ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-worder-primary/20 border-t-worder-primary rounded-full animate-spin" />
                  <span className="text-[12px] text-text-muted">Calculando...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Users size={24} weight="fill" className="text-worder-primary" />
                    <span className="text-[32px] font-bold text-text-primary font-heading" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {estimate !== null ? `~${estimate.toLocaleString("pt-BR")}` : "—"}
                    </span>
                  </div>
                  <span className="text-[13px] text-text-muted">contatos estimados</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#F0F0F0] space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-text-muted">Grupos de regras</span>
                <span className="font-semibold text-text-primary">{groups.length}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-text-muted">Total de condições</span>
                <span className="font-semibold text-text-primary">
                  {groups.reduce((sum, g) => sum + g.rules.length, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
