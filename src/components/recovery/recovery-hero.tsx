"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendUp, ShieldCheck, Robot } from "@phosphor-icons/react";
import { recoveryHeroData } from "@/lib/mock-data/recovery";

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    if (value >= 1000) {
      return `${prefix}${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
    }
    return `${prefix}${v.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}${suffix}`;
  });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 2,
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

function RecoverySparkline() {
  const data = [18, 22, 20, 28, 26, 30, 32];
  const width = 120;
  const height = 32;
  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2);
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `${pad},${height} ${points} ${width - pad},${height}`;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <polygon points={areaPoints} fill="url(#recovery-spark-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="rgba(34,197,94,0.8)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="recovery-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,197,94,0.25)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function RecoveryHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden p-7 md:p-9"
      style={{ borderRadius: "var(--radius-card)", background: "#1A1A1A" }}
    >
      {/* Grid dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(242,107,42,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Radial orange glow — right */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px]"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(242,107,42,0.06) 40%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[300px] h-[300px]"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm">
              <ShieldCheck size={20} weight="fill" className="text-[#22C55E]" />
            </div>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-[0.08em]">
              Recuperação de Vendas
            </span>
          </div>
          <p
            className="text-[56px] font-extrabold text-white font-heading leading-none"
            style={{ textShadow: "0 2px 20px rgba(34,197,94,0.15)", fontVariantNumeric: "tabular-nums" }}
          >
            <AnimatedCounter value={recoveryHeroData.recoveredAmount} prefix="R$ " />
          </p>
          <p className="text-sm text-white/50 mt-2">recuperados este mês</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/20">
              <TrendUp size={14} weight="bold" className="text-[#22C55E]" />
              <span className="text-xs font-bold text-[#22C55E]">+{recoveryHeroData.changePercent}%</span>
            </div>
            <span className="text-xs text-white/50">vs. período anterior</span>
            <RecoverySparkline />
          </div>
        </div>

        <div className="flex items-center gap-0">
          {[
            { value: `${recoveryHeroData.recoveryRate}%`, label: "TAXA DE RECUPERAÇÃO" },
            { value: recoveryHeroData.savedOrders, label: "PEDIDOS SALVOS" },
          ].map((metric, i) => (
            <div key={metric.label} className="flex items-center">
              {i > 0 && <div className="w-px h-12 bg-white/10 mx-6" />}
              <div className="text-center">
                <p className="text-2xl font-bold text-white font-heading" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {metric.value}
                </p>
                <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-[0.08em] font-medium">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <div className="w-px h-12 bg-white/10 mx-6" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Robot size={20} weight="fill" className="text-[#F5A623]" />
                <p className="text-2xl font-bold text-white font-heading">IA</p>
              </div>
              <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-[0.08em] font-medium">
                WORDER IA ATIVA
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
