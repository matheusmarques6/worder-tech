"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash,
  EnvelopeSimple,
  WhatsappLogo,
  DeviceMobile,
  Clock,
  GitFork,
  CaretDown,
  Eye,
  CursorClick,
  PaintBrush,
} from "@phosphor-icons/react";
import { useFlowBuilderStore } from "@/stores/flow-builder-store";
import { propertyOptions, operatorOptions } from "@/lib/mock-data/lists";
import { triggerOptions } from "@/lib/mock-data/automations";

export function DetailPanel() {
  const { nodes, selectedNodeId, selectNode, updateNode, deleteNode } =
    useFlowBuilderStore();

  const node = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="w-[360px] bg-card border-l border-border flex flex-col flex-shrink-0 h-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-separator">
            <div className="flex items-center gap-2">
              <NodeIcon type={node.type} />
              <input
                type="text"
                value={node.label}
                onChange={(e) =>
                  updateNode(node.id, { label: e.target.value })
                }
                className="text-sm font-semibold text-text-primary bg-transparent border-none outline-none max-w-[200px]"
              />
            </div>
            <button
              onClick={() => selectNode(null)}
              className="p-1.5 rounded-lg hover:bg-hover transition-colors"
            >
              <X size={16} className="text-text-muted" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Email node */}
            {node.type === "email" && <EmailNodeConfig node={node} />}

            {/* WhatsApp node */}
            {node.type === "whatsapp" && <WhatsAppNodeConfig node={node} />}

            {/* SMS node */}
            {node.type === "sms" && <SMSNodeConfig node={node} />}

            {/* Delay node */}
            {node.type === "delay" && <DelayNodeConfig node={node} />}

            {/* Condition node */}
            {(node.type === "condition" ||
              node.type === "condition_multi") && (
              <ConditionNodeConfig node={node} />
            )}

            {/* Trigger node */}
            {node.type === "trigger" && <TriggerNodeConfig node={node} />}

            {/* Generic info for other types */}
            {!["email", "whatsapp", "sms", "delay", "condition", "condition_multi", "trigger"].includes(node.type) && (
              <div className="text-[13px] text-text-muted text-center py-8">
                Configurações em breve
              </div>
            )}
          </div>

          {/* Footer — Delete */}
          {node.type !== "trigger" && (
            <div className="px-4 py-3 border-t border-separator">
              <button
                onClick={() => deleteNode(node.id)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-[13px] font-medium text-error border border-error/20 hover:bg-error/5 transition-colors"
                style={{ borderRadius: "10px" }}
              >
                <Trash size={14} />
                Excluir nó
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NodeIcon({ type }: { type: string }) {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    email: { icon: <EnvelopeSimple size={16} weight="fill" />, color: "#3B82F6" },
    whatsapp: { icon: <WhatsappLogo size={16} weight="fill" />, color: "#25D366" },
    sms: { icon: <DeviceMobile size={16} weight="fill" />, color: "#6B7280" },
    delay: { icon: <Clock size={16} weight="fill" />, color: "#6B7280" },
    condition: { icon: <GitFork size={16} weight="fill" />, color: "#F59E0B" },
    condition_multi: { icon: <GitFork size={16} weight="fill" />, color: "#F59E0B" },
  };
  const meta = iconMap[type] || { icon: null, color: "#888" };

  return (
    <div
      className="flex items-center justify-center w-7 h-7 rounded-lg"
      style={{ background: `${meta.color}15`, color: meta.color }}
    >
      {meta.icon}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );
}

function EmailNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();
  const hasMetrics = node.config.template && node.config.template !== "";

  return (
    <>
      <div>
        <FieldLabel>Assunto</FieldLabel>
        <input
          type="text"
          value={node.config.subject || ""}
          onChange={(e) =>
            updateNode(node.id, {
              config: { ...node.config, subject: e.target.value },
            })
          }
          placeholder="Assunto do e-mail..."
          className="w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
          style={{ borderRadius: "10px" }}
        />
      </div>

      <div>
        <FieldLabel>Template</FieldLabel>
        <div
          className="border border-border p-3 hover:border-worder-primary/30 transition-colors cursor-pointer"
          style={{ borderRadius: "10px" }}
        >
          <div className="h-[100px] bg-muted rounded-lg flex items-center justify-center mb-2">
            <PaintBrush size={24} weight="fill" className="text-text-muted/40" />
          </div>
          <p className="text-[12px] text-text-muted text-center">
            Clique para editar template
          </p>
        </div>
      </div>

      {/* Metrics (shown for active nodes) */}
      {hasMetrics && (
        <div>
          <FieldLabel>Métricas</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-3 py-2.5 bg-muted rounded-lg">
              <div className="flex items-center gap-1.5">
                <Eye size={12} className="text-info" />
                <span className="text-[10px] text-text-muted">Aberturas</span>
              </div>
              <p className="text-sm font-bold text-text-primary mt-0.5">23,4%</p>
            </div>
            <div className="px-3 py-2.5 bg-muted rounded-lg">
              <div className="flex items-center gap-1.5">
                <CursorClick size={12} className="text-worder-primary" />
                <span className="text-[10px] text-text-muted">Cliques</span>
              </div>
              <p className="text-sm font-bold text-text-primary mt-0.5">1,8%</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WhatsAppNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();

  return (
    <>
      <div>
        <FieldLabel>Template aprovado</FieldLabel>
        <div className="relative">
          <select
            value={node.config.template || ""}
            onChange={(e) =>
              updateNode(node.id, {
                config: { ...node.config, template: e.target.value },
              })
            }
            className="appearance-none w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
            style={{ borderRadius: "10px" }}
          >
            <option value="">Selecionar template...</option>
            <option value="checkout-abandon-offer">Recuperação de carrinho</option>
            <option value="pix-reminder">Lembrete PIX</option>
            <option value="coupon">Cupom de desconto</option>
          </select>
          <CaretDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
      </div>

      {node.config.message && (
        <div>
          <FieldLabel>Preview da mensagem</FieldLabel>
          <div
            className="bg-[#DCF8C6] p-3 text-[12px] text-[#333] leading-relaxed"
            style={{ borderRadius: "10px" }}
          >
            {node.config.message}
          </div>
        </div>
      )}

      <div>
        <FieldLabel>Variáveis</FieldLabel>
        <div className="flex flex-wrap gap-1.5">
          {["{{first_name}}", "{{cart_url}}", "{{coupon_code}}"].map((v) => (
            <span
              key={v}
              className="px-2 py-1 text-[10px] font-mono bg-muted text-text-muted rounded-md"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function SMSNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();

  return (
    <div>
      <FieldLabel>Mensagem (máx. 160 caracteres)</FieldLabel>
      <textarea
        value={node.config.message || ""}
        onChange={(e) =>
          updateNode(node.id, {
            config: { ...node.config, message: e.target.value },
          })
        }
        maxLength={160}
        rows={3}
        placeholder="Mensagem SMS..."
        className="w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none resize-none"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
}

function DelayNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();

  return (
    <div>
      <FieldLabel>Aguardar</FieldLabel>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={node.config.duration || ""}
          onChange={(e) =>
            updateNode(node.id, {
              config: { ...node.config, duration: e.target.value },
              label: `Aguardar ${e.target.value} ${node.config.unit || "minutos"}`,
            })
          }
          placeholder="5"
          min={1}
          className="w-24 px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
          style={{ borderRadius: "10px" }}
        />
        <div className="relative flex-1">
          <select
            value={node.config.unit || "minutos"}
            onChange={(e) =>
              updateNode(node.id, {
                config: { ...node.config, unit: e.target.value },
                label: `Aguardar ${node.config.duration || "0"} ${e.target.value}`,
              })
            }
            className="appearance-none w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
            style={{ borderRadius: "10px" }}
          >
            <option value="minutos">minutos</option>
            <option value="horas">horas</option>
            <option value="dias">dias</option>
          </select>
          <CaretDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

function ConditionNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();

  return (
    <>
      <div>
        <FieldLabel>Propriedade</FieldLabel>
        <div className="relative">
          <select
            value={node.config.property || ""}
            onChange={(e) =>
              updateNode(node.id, {
                config: { ...node.config, property: e.target.value },
              })
            }
            className="appearance-none w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
            style={{ borderRadius: "10px" }}
          >
            <option value="">Selecionar...</option>
            {propertyOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <CaretDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Operador</FieldLabel>
        <div className="relative">
          <select
            value={node.config.operator || ""}
            onChange={(e) =>
              updateNode(node.id, {
                config: { ...node.config, operator: e.target.value },
              })
            }
            className="appearance-none w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
            style={{ borderRadius: "10px" }}
          >
            <option value="">Selecionar...</option>
            {operatorOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <CaretDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Valor</FieldLabel>
        <input
          type="text"
          value={node.config.value || ""}
          onChange={(e) =>
            updateNode(node.id, {
              config: { ...node.config, value: e.target.value },
            })
          }
          placeholder="Valor..."
          className="w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
          style={{ borderRadius: "10px" }}
        />
      </div>

      <div className="flex gap-2 mt-2">
        <div className="flex-1 px-3 py-2 bg-[#22C55E]/10 rounded-lg text-center">
          <span className="text-[10px] font-bold text-[#22C55E] uppercase">
            Sim → Continua
          </span>
        </div>
        <div className="flex-1 px-3 py-2 bg-[#EF4444]/10 rounded-lg text-center">
          <span className="text-[10px] font-bold text-[#EF4444] uppercase">
            Não → Alternativo
          </span>
        </div>
      </div>
    </>
  );
}

function TriggerNodeConfig({ node }: { node: { id: string; config: Record<string, string> } }) {
  const { updateNode } = useFlowBuilderStore();

  return (
    <div>
      <FieldLabel>Quando...</FieldLabel>
      <div className="relative">
        <select
          value={node.config.trigger || ""}
          onChange={(e) =>
            updateNode(node.id, {
              config: { ...node.config, trigger: e.target.value },
              label: e.target.value,
            })
          }
          className="appearance-none w-full px-3 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
          style={{ borderRadius: "10px" }}
        >
          <option value="">Selecionar trigger...</option>
          {triggerOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <CaretDown
          size={12}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
    </div>
  );
}
