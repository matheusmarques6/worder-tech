"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendUp, Lightning } from "@phosphor-icons/react";
import { heroData } from "@/lib/mock-data/dashboard";

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    if (value >= 1000) {
      return `${prefix}${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
    }
    return `${prefix}${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}${suffix}`;
  });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
    });

    const unsubscribe = rounded.on("change", (v) => setDisplay(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, rounded]);

  return <span>{display}</span>;
}

export function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden p-6 md:p-8"
      style={{
        borderRadius: "var(--radius-card)",
        background:
          "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, rgba(242,107,42,0.15) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
        style={{
          background: "radial-gradient(circle, #F5A623, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #F26B2A, transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
              <Lightning
                size={20}
                weight="fill"
                className="text-[#F5A623]"
              />
            </div>
            <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
              Receita Recuperada pela Worder
            </span>
          </div>
          <p className="text-5xl md:text-[48px] font-bold text-white font-heading leading-tight">
            <AnimatedCounter value={heroData.recoveredRevenue} prefix="R$ " />
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#22C55E]/20">
              <TrendUp
                size={14}
                weight="bold"
                className="text-[#22C55E]"
              />
              <span className="text-xs font-semibold text-[#22C55E]">
                +{heroData.changePercent}%
              </span>
            </div>
            <span className="text-sm text-white/60">
              vs. período anterior
            </span>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white font-heading">
              {heroData.recoveredOrders}
            </p>
            <p className="text-xs text-white/50 mt-1">Vendas Recuperadas</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white font-heading">
              {heroData.recoveryRate}%
            </p>
            <p className="text-xs text-white/50 mt-1">Taxa de Recuperação</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white font-heading">
              {heroData.roi}x
            </p>
            <p className="text-xs text-white/50 mt-1">ROI da IA</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
