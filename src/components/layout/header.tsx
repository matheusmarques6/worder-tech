"use client";

import { useAppStore } from "@/stores/app-store";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Bell,
  List,
} from "@phosphor-icons/react";

export function Header() {
  const { toggleMobileSidebar } = useAppStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 bg-background/80 backdrop-blur-md border-b border-border"
    >
      {/* Left: Mobile menu + Logo text */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <List size={24} weight="bold" className="text-text-primary" />
        </button>
        <span className="text-sm font-semibold text-worder-primary font-heading hidden sm:inline">
          Worder CRM
        </span>
      </div>

      {/* Center: Global search */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-muted hover:border-text-muted transition-colors text-sm max-w-md w-full mx-4 cursor-pointer">
        <MagnifyingGlass size={18} weight="bold" />
        <span className="flex-1 text-left">Buscar clientes, pedidos, campanhas...</span>
        <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[10px] font-mono font-bold text-text-muted border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Right: Notifications + Avatar */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer">
          <Bell size={22} weight="duotone" className="text-text-secondary" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-worder-primary rounded-full border-2 border-background" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
            style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
          >
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary leading-none">
              Admin
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
