"use client";

import { motion } from "framer-motion";
import { Wrench } from "@phosphor-icons/react";

interface PagePlaceholderProps {
  pageName: string;
}

export function PagePlaceholder({ pageName }: PagePlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-background-card border border-border p-12 flex flex-col items-center justify-center text-center"
      style={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
        minHeight: "400px",
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg, rgba(242,107,42,0.1), rgba(245,166,35,0.1))" }}
      >
        <Wrench size={32} weight="duotone" className="text-worder-primary" />
      </div>
      <h2 className="text-xl font-bold text-text-primary font-heading mb-2">
        Página {pageName}
      </h2>
      <p className="text-sm text-text-muted max-w-md">
        Em desenvolvimento. Esta página será construída com dados mockados
        realistas de e-commerce.
      </p>
      <div className="mt-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-worder-primary animate-pulse" />
        <span className="text-xs text-text-muted font-medium">
          Frontend-first • Mock data
        </span>
      </div>
    </motion.div>
  );
}
