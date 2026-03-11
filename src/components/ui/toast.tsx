"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, Warning, X } from "@phosphor-icons/react";
import { create } from "zustand";

// Types
type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

// Store
const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Hook
function useToast() {
  const addToast = useToastStore((s) => s.addToast);

  return {
    toast: (opts: Omit<ToastItem, "id">) => addToast(opts),
  };
}

// Variant config
const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle; borderColor: string; iconColor: string }
> = {
  success: { icon: CheckCircle, borderColor: "border-l-success", iconColor: "text-success" },
  error: { icon: XCircle, borderColor: "border-l-error", iconColor: "text-error" },
  info: { icon: Info, borderColor: "border-l-info", iconColor: "text-info" },
  warning: { icon: Warning, borderColor: "border-l-warning", iconColor: "text-warning" },
};

// Single toast item
function ToastEntry({ toast }: { toast: ToastItem }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "bg-background-card border-l-4 shadow-lg rounded-xl p-4 min-w-[320px] max-w-[420px] flex items-start gap-3",
        config.borderColor
      )}
    >
      <Icon size={20} weight="fill" className={cn("mt-0.5 shrink-0", config.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-text-secondary mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 p-0.5 rounded text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
      >
        <X size={14} weight="bold" />
      </button>
    </motion.div>
  );
}

// Toast container
function Toast() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastEntry key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export { Toast, useToast };
