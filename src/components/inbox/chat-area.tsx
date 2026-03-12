"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { Button } from "@/components/ui/button";
import {
  Flag,
  ArrowsLeftRight,
  CheckCircle,
  DotsThree,
  Smiley,
  Paperclip,
  Image,
  Microphone,
  PaperPlaneRight,
  Robot,
  Sparkle,
  Checks,
} from "@phosphor-icons/react";
import type { ChatMessage, InboxContactContext } from "@/lib/mock-data/inbox";

interface ChatAreaProps {
  messages: ChatMessage[];
  contact: InboxContactContext;
  aiSuggestion: string;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function ChatArea({ messages, contact, aiSuggestion }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState<"reply" | "note">("reply");
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-w-[400px] flex-1">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <Avatar name={contact.name} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">{contact.name}</span>
              <ChannelBadge channel={contact.channel} className="!py-0.5 !text-[10px]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-text-muted">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: Flag, title: "Marcar" },
            { icon: ArrowsLeftRight, title: "Transferir" },
            { icon: CheckCircle, title: "Resolver" },
            { icon: DotsThree, title: "Mais" },
          ].map(({ icon: Icon, title }) => (
            <button
              key={title}
              title={title}
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-hover dark:hover:bg-[#2A2A2A] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <Icon size={18} weight="duotone" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-muted dark:bg-[#0D0D0D]">
        {messages.map((msg, index) => {
          if (msg.direction === "system") {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="flex justify-center py-1"
              >
                <span className="text-[11px] text-text-muted bg-[#EBEBEB] dark:bg-[#1A1A1A] px-3 py-1 rounded-full">
                  {msg.content}
                </span>
              </motion.div>
            );
          }

          const isSent = msg.direction === "sent";

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className={cn("flex", isSent ? "justify-end" : "justify-start")}
            >
              <div className={cn("max-w-[70%]", isSent ? "items-end" : "items-start")}>
                {/* Sender label */}
                {msg.senderName && msg.senderType !== "customer" && (
                  <p className={cn("text-[10px] mb-0.5 px-1", isSent ? "text-right" : "text-left", "text-text-muted")}>
                    {msg.senderType === "bot" ? "🤖 " : ""}{msg.senderName}
                  </p>
                )}
                <div
                  className={cn(
                    "px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    isSent
                      ? "bg-[#DCF8C6] dark:bg-[#005C4B] text-[#111] dark:text-white rounded-xl rounded-br-sm"
                      : "bg-card dark:bg-[#1A1A1A] text-text-primary rounded-xl rounded-bl-sm shadow-sm"
                  )}
                >
                  {msg.content}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 mt-0.5 px-1",
                    isSent ? "justify-end" : "justify-start"
                  )}
                >
                  <span className="text-[10px] text-text-muted">{formatTime(msg.timestamp)}</span>
                  {isSent && msg.read && (
                    <Checks size={14} weight="bold" className="text-info" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestion */}
      <AnimatePresence>
        {showAiSuggestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-card"
          >
            <div className="p-4">
              <div className="border-2 border-dashed border-worder-primary/40 rounded-xl p-4 bg-worder-primary/[0.03]">
                <div className="flex items-center gap-2 mb-2">
                  <Robot size={16} weight="duotone" className="text-worder-primary" />
                  <span className="text-xs font-semibold text-worder-primary">Sugestão da Worder IA</span>
                </div>
                <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed mb-3">
                  {aiSuggestion}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setInputValue(aiSuggestion);
                      setShowAiSuggestion(false);
                    }}
                  >
                    Usar resposta
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowAiSuggestion(false)}>
                    Descartar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="border-t border-border bg-card shrink-0">
        {/* Input mode tabs */}
        <div className="flex items-center gap-0 px-4 pt-2">
          <button
            onClick={() => setInputMode("reply")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-t-lg border border-b-0 transition-colors cursor-pointer",
              inputMode === "reply"
                ? "bg-card border-border text-text-primary"
                : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
            )}
          >
            Resposta
          </button>
          <button
            onClick={() => setInputMode("note")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-t-lg border border-b-0 transition-colors cursor-pointer",
              inputMode === "note"
                ? "bg-[#FFF9E6] border-[#F5E6B8] text-[#92700C]"
                : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
            )}
          >
            Nota interna
          </button>
        </div>

        <div
          className={cn(
            "px-4 pb-3 pt-2",
            inputMode === "note" && "bg-[#FFF9E6]"
          )}
        >
          <div
            className={cn(
              "flex items-end gap-2 rounded-xl border px-3 py-2",
              inputMode === "note"
                ? "border-[#F5E6B8] bg-card"
                : "border-border bg-muted dark:bg-[#1A1A1A]"
            )}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputMode === "note" ? "Escreva uma nota interna..." : "Digite uma mensagem..."}
              rows={1}
              className="flex-1 resize-none text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted min-h-[36px] max-h-[120px] py-1.5"
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = t.scrollHeight + "px";
              }}
            />
            <div className="flex items-center gap-0.5 shrink-0 pb-0.5">
              {inputMode === "reply" && (
                <>
                  <button
                    onClick={() => setShowAiSuggestion(!showAiSuggestion)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-worder-primary/10 text-worder-primary transition-colors cursor-pointer"
                    title="Worder IA"
                  >
                    <div className="relative">
                      <Robot size={18} weight="duotone" />
                      <Sparkle size={8} weight="fill" className="absolute -top-1 -right-1 text-worder-secondary" />
                    </div>
                  </button>
                  {[Smiley, Paperclip, Image, Microphone].map((Icon, i) => (
                    <button
                      key={i}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#E8E8E8] dark:hover:bg-[#2A2A2A] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <Icon size={18} weight="duotone" />
                    </button>
                  ))}
                </>
              )}
              <button
                className="h-8 w-8 flex items-center justify-center rounded-lg text-white cursor-pointer"
                style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
              >
                <PaperPlaneRight size={16} weight="fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
