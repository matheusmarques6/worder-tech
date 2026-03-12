"use client";

import { motion } from "framer-motion";
import { emailDeliverabilityScore } from "@/lib/mock-data/analytics";

function getScoreColor(score: number): string {
  if (score >= 70) return "#22C55E";
  if (score >= 40) return "#F59E0B";
  return "#EF4444";
}

export function DeliverabilityGauge() {
  const { score, label } = emailDeliverabilityScore;
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border p-6 flex flex-col items-center"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="text-base font-semibold text-text-primary font-heading mb-6">
        Pontuação de Entregabilidade
      </h3>

      {/* Gauge */}
      <div className="relative w-[180px] h-[180px]">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#F0F0F0"
            strokeWidth="12"
          />
          {/* Score arc */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[40px] font-bold font-heading"
            style={{ color, fontVariantNumeric: "tabular-nums" }}
          >
            {score}
          </motion.span>
          <span className="text-[12px] text-text-muted font-medium">{label}</span>
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex items-center justify-between w-full mt-4 px-4">
        <span className="text-[10px] text-error font-medium">0</span>
        <div className="flex-1 mx-2 h-1.5 rounded-full overflow-hidden flex">
          <div className="flex-1 bg-error/20" />
          <div className="flex-1 bg-warning/20" />
          <div className="flex-1 bg-success/20" />
        </div>
        <span className="text-[10px] text-success font-medium">100</span>
      </div>
    </motion.div>
  );
}
