"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Brand panel */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
      >
        <div className="text-center text-white z-10 px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-bold font-heading">W</span>
            </div>
            <h1 className="text-4xl font-bold font-heading mb-4">Worder</h1>
            <p className="text-lg opacity-90 max-w-sm mx-auto">
              CRM inteligente para e-commerce. IA conversacional, Inbox
              unificado e campanhas multicanal.
            </p>
          </motion.div>
        </div>
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
