"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";

const periods = [
  { label: "Hoje", value: "today" },
  { label: "7 dias", value: "7d" },
  { label: "30 dias", value: "30d" },
  { label: "90 dias", value: "90d" },
  { label: "Personalizado", value: "custom" },
];

export function PeriodSelector() {
  const [selected, setSelected] = useState("30d");
  const [open, setOpen] = useState(false);

  const current = periods.find((p) => p.value === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-background-card border border-border text-sm font-medium text-text-primary hover:border-worder-primary/50 transition-colors duration-200 cursor-pointer"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        <CalendarBlank size={16} weight="fill" className="text-worder-primary" />
        {current?.label}
        <CaretDown size={14} weight="bold" className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 z-50 bg-background-card border border-border py-1 min-w-[160px]"
              style={{
                borderRadius: "var(--radius-card)",
                boxShadow: "var(--shadow-card-hover)",
              }}
            >
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => {
                    setSelected(period.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 cursor-pointer ${
                    selected === period.value
                      ? "bg-worder-primary/10 text-worder-primary font-medium"
                      : "text-text-secondary hover:bg-background"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
