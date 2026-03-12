"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  EnvelopeSimple,
  WhatsappLogo,
  ChatText,
  Users,
  PaintBrush,
  Eye,
  PaperPlaneTilt,
  FunnelSimple,
  ListBullets,
  TextAa,
  Image as ImageIcon,
  ArrowSquareOut,
  Sparkle,
  CalendarBlank,
  Clock,
} from "@phosphor-icons/react";

type WizardStep = 1 | 2 | 3 | 4;

const steps = [
  { num: 1, label: "Canal", icon: <EnvelopeSimple size={18} weight="fill" /> },
  { num: 2, label: "Público", icon: <Users size={18} weight="fill" /> },
  { num: 3, label: "Conteúdo", icon: <PaintBrush size={18} weight="fill" /> },
  { num: 4, label: "Revisar", icon: <Eye size={18} weight="fill" /> },
];

const channels = [
  {
    id: "email" as const,
    name: "E-mail",
    description: "Campanhas de e-mail marketing com editor drag-and-drop",
    icon: <EnvelopeSimple size={28} weight="fill" />,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    id: "whatsapp" as const,
    name: "WhatsApp",
    description: "Broadcast via WhatsApp Business API com templates aprovados",
    icon: <WhatsappLogo size={28} weight="fill" />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
  },
  {
    id: "sms" as const,
    name: "SMS",
    description: "Mensagens de texto diretas, ideais para urgência",
    icon: <ChatText size={28} weight="fill" />,
    color: "#888",
    bg: "rgba(136,136,136,0.1)",
  },
];

const audiences = [
  { id: "all", name: "TODOS OS LEADS", count: 27461, type: "segment" },
  { id: "engaged", name: "Leads Engajados 60d", count: 3584, type: "segment" },
  { id: "vip", name: "VIP Customers", count: 3, type: "segment" },
  { id: "repeat", name: "Compradores Recorrentes", count: 892, type: "segment" },
  { id: "winback", name: "Win-Back Opportunities", count: 3353, type: "segment" },
  { id: "popup", name: "LEADS POP UP", count: 930, type: "list" },
  { id: "bf", name: "Black Friday 2025", count: 15230, type: "list" },
];

interface CampaignWizardProps {
  onBack: () => void;
}

export function CampaignWizard({ onBack }: CampaignWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [sendOption, setSendOption] = useState<"now" | "schedule">("now");

  const canProceed = () => {
    switch (step) {
      case 1: return selectedChannel !== null;
      case 2: return selectedAudience !== null;
      case 3: return subject.length > 0 || selectedChannel !== "email";
      case 4: return true;
      default: return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header with progress */}
      <div
        className="bg-card border border-border p-5"
        style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-hover transition-colors">
              <ArrowLeft size={18} className="text-text-muted" />
            </button>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Nome da campanha..."
              className="text-lg font-semibold text-text-primary bg-transparent border-none outline-none placeholder:text-text-muted/50 w-full max-w-[400px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-muted">Passo {step} de 4</span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <button
                onClick={() => s.num < step && setStep(s.num as WizardStep)}
                className="flex items-center gap-2"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all"
                  style={
                    s.num < step
                      ? { background: "#22C55E", color: "white" }
                      : s.num === step
                        ? { background: "linear-gradient(135deg, #F26B2A, #F5A623)", color: "white" }
                        : { background: "#F0F0F0", color: "#888" }
                  }
                >
                  {s.num < step ? <Check size={16} weight="bold" /> : s.num}
                </div>
                <span
                  className="text-[13px] font-medium hidden sm:inline"
                  style={{ color: s.num === step ? "#F26B2A" : s.num < step ? "#22C55E" : "#888" }}
                >
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-3 h-px" style={{ background: s.num < step ? "#22C55E" : "#E0E0E0" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {/* Step 1: Channel */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className="p-6 text-left border-2 transition-all hover:shadow-md"
                  style={{
                    borderRadius: "var(--radius-card)",
                    borderColor: selectedChannel === ch.id ? ch.color : "#E0E0E0",
                    background: selectedChannel === ch.id ? ch.bg : "white",
                    boxShadow: selectedChannel === ch.id ? `0 0 0 1px ${ch.color}` : "var(--shadow-card)",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                    style={{ background: ch.bg, color: ch.color }}
                  >
                    {ch.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{ch.name}</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">{ch.description}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Audience */}
          {step === 2 && (
            <div
              className="bg-card border border-border p-5 space-y-3"
              style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-3">
                Selecione o público-alvo
              </h3>
              {audiences.map((aud) => (
                <button
                  key={aud.id}
                  onClick={() => setSelectedAudience(aud.id)}
                  className="flex items-center gap-3 w-full px-4 py-3 border-2 transition-all text-left"
                  style={{
                    borderRadius: "12px",
                    borderColor: selectedAudience === aud.id ? "#F26B2A" : "#E0E0E0",
                    background: selectedAudience === aud.id ? "rgba(242,107,42,0.03)" : "white",
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{
                    background: aud.type === "segment" ? "rgba(242,107,42,0.1)" : "rgba(59,130,246,0.1)",
                  }}>
                    {aud.type === "segment" ? (
                      <FunnelSimple size={16} weight="fill" className="text-worder-primary" />
                    ) : (
                      <ListBullets size={16} weight="fill" className="text-info" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-text-primary">{aud.name}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-text-secondary" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {aud.count.toLocaleString("pt-BR")} contatos
                  </span>
                  {selectedAudience === aud.id && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-worder-primary">
                      <Check size={14} weight="bold" className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Content */}
          {step === 3 && (
            <div
              className="bg-card border border-border p-6 space-y-5"
              style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
            >
              {selectedChannel === "email" && (
                <>
                  <div>
                    <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider block mb-2">
                      Assunto do e-mail
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Sua oferta exclusiva chegou! 🔥"
                      className="w-full px-4 py-3 text-sm bg-card border border-border text-text-primary focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider block mb-2">
                      Preview text
                    </label>
                    <input
                      type="text"
                      placeholder="Texto que aparece após o assunto na inbox..."
                      className="w-full px-4 py-3 text-sm bg-card border border-border text-text-primary focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>

                  {/* Template preview area */}
                  <div>
                    <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider block mb-3">
                      Template
                    </label>
                    <div
                      className="border-2 border-dashed border-border p-8 text-center hover:border-worder-primary/40 transition-colors cursor-pointer"
                      style={{ borderRadius: "var(--radius-card)" }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-worder-primary/10">
                          <PaintBrush size={24} weight="fill" className="text-worder-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">Escolher template</p>
                          <p className="text-[12px] text-text-muted mt-1">Selecione um template pronto ou crie do zero no editor</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border bg-card text-text-secondary hover:bg-hover transition-colors"
                            style={{ borderRadius: "10px" }}
                          >
                            <ImageIcon size={16} weight="fill" />
                            Templates
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                            style={{
                              borderRadius: "10px",
                              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                            }}
                          >
                            <TextAa size={16} weight="bold" />
                            Criar do zero
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedChannel === "whatsapp" && (
                <div>
                  <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider block mb-3">
                    Template WhatsApp aprovado
                  </label>
                  <div className="space-y-2">
                    {["Recuperação de carrinho", "Lançamento de produto", "Cupom de desconto"].map((tpl) => (
                      <button
                        key={tpl}
                        className="flex items-center gap-3 w-full px-4 py-3 border border-border hover:border-[#22C55E] transition-all text-left"
                        style={{ borderRadius: "12px" }}
                      >
                        <WhatsappLogo size={18} weight="fill" className="text-[#22C55E]" />
                        <span className="text-[13px] font-medium text-text-primary">{tpl}</span>
                        <ArrowSquareOut size={14} className="text-text-muted ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedChannel === "sms" && (
                <div>
                  <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider block mb-2">
                    Mensagem SMS (máx. 160 caracteres)
                  </label>
                  <textarea
                    placeholder="Ex: [LOJA] Seu cupom PROMO10 vale 10% off! Acesse: link.co/abc"
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-3 text-sm bg-card border border-border text-text-primary focus:border-worder-primary focus:ring-1 focus:ring-worder-primary/20 outline-none transition-all resize-none"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div
                className="bg-card border border-border p-6 space-y-4"
                style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">Resumo da Campanha</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="px-4 py-3 bg-muted rounded-xl">
                    <p className="text-[11px] text-text-muted mb-1">Nome</p>
                    <p className="text-sm font-medium text-text-primary">{campaignName || "Sem nome"}</p>
                  </div>
                  <div className="px-4 py-3 bg-muted rounded-xl">
                    <p className="text-[11px] text-text-muted mb-1">Canal</p>
                    <p className="text-sm font-medium text-text-primary capitalize">{selectedChannel || "—"}</p>
                  </div>
                  <div className="px-4 py-3 bg-muted rounded-xl">
                    <p className="text-[11px] text-text-muted mb-1">Público</p>
                    <p className="text-sm font-medium text-text-primary">
                      {audiences.find((a) => a.id === selectedAudience)?.name || "—"}
                    </p>
                  </div>
                  <div className="px-4 py-3 bg-muted rounded-xl">
                    <p className="text-[11px] text-text-muted mb-1">Destinatários</p>
                    <p className="text-sm font-bold text-text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {audiences.find((a) => a.id === selectedAudience)?.count.toLocaleString("pt-BR") || "—"}
                    </p>
                  </div>
                </div>

                {selectedChannel === "email" && subject && (
                  <div className="px-4 py-3 bg-muted rounded-xl">
                    <p className="text-[11px] text-text-muted mb-1">Assunto</p>
                    <p className="text-sm font-medium text-text-primary">{subject}</p>
                  </div>
                )}
              </div>

              {/* Send options */}
              <div
                className="bg-card border border-border p-6 space-y-4"
                style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">Opção de envio</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSendOption("now")}
                    className="flex-1 flex items-center gap-3 px-4 py-4 border-2 transition-all"
                    style={{
                      borderRadius: "12px",
                      borderColor: sendOption === "now" ? "#F26B2A" : "#E0E0E0",
                      background: sendOption === "now" ? "rgba(242,107,42,0.03)" : "white",
                    }}
                  >
                    <PaperPlaneTilt size={20} weight="fill" className={sendOption === "now" ? "text-worder-primary" : "text-text-muted"} />
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary">Enviar agora</p>
                      <p className="text-[11px] text-text-muted">Envio imediato para todos os destinatários</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSendOption("schedule")}
                    className="flex-1 flex items-center gap-3 px-4 py-4 border-2 transition-all"
                    style={{
                      borderRadius: "12px",
                      borderColor: sendOption === "schedule" ? "#F26B2A" : "#E0E0E0",
                      background: sendOption === "schedule" ? "rgba(242,107,42,0.03)" : "white",
                    }}
                  >
                    <CalendarBlank size={20} weight="fill" className={sendOption === "schedule" ? "text-worder-primary" : "text-text-muted"} />
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary">Agendar</p>
                      <p className="text-[11px] text-text-muted">Escolha data e horário de envio</p>
                    </div>
                  </button>
                </div>

                {sendOption === "schedule" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative flex-1">
                      <CalendarBlank size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="date"
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                    <div className="relative flex-1">
                      <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="time"
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border focus:border-worder-primary outline-none"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* AI suggestion */}
              <div
                className="flex items-start gap-3 p-4 border border-dashed border-worder-primary/30 bg-worder-primary/5"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <Sparkle size={18} weight="fill" className="text-worder-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium text-text-primary">Sugestão Worder IA</p>
                  <p className="text-[12px] text-text-muted mt-1">
                    Baseado no histórico, o melhor horário para envio desta campanha é <strong>terça-feira às 10h</strong>, com taxa de abertura estimada de <strong>24,5%</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step > 1 ? setStep((step - 1) as WizardStep) : onBack()}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-hover transition-colors"
          style={{ borderRadius: "10px" }}
        >
          <ArrowLeft size={16} weight="bold" />
          {step === 1 ? "Cancelar" : "Voltar"}
        </button>

        {step < 4 ? (
          <button
            onClick={() => canProceed() && setStep((step + 1) as WizardStep)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: canProceed() ? "0 2px 8px rgba(242,107,42,0.3)" : "none",
            }}
          >
            Próximo
            <ArrowRight size={16} weight="bold" />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: sendOption === "now"
                ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
                : "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: sendOption === "now"
                ? "0 2px 8px rgba(34,197,94,0.3)"
                : "0 2px 8px rgba(242,107,42,0.3)",
            }}
          >
            <PaperPlaneTilt size={16} weight="fill" />
            {sendOption === "now" ? "Enviar campanha" : "Agendar campanha"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
