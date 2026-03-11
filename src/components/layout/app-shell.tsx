"use client";

import { type ReactNode } from "react";
import { useAppStore } from "@/stores/app-store";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { motion } from "framer-motion";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.div
        className="min-h-screen flex flex-col"
        animate={{
          marginLeft: sidebarCollapsed ? 72 : 260,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </motion.div>
    </div>
  );
}
