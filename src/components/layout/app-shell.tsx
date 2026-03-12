"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Toast } from "@/components/ui/toast";
import { DynamicTitle } from "@/components/shared/dynamic-title";
import { motion } from "framer-motion";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed, setSidebarCollapsed, initTheme } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

  // Initialize theme from localStorage / system preference
  useEffect(() => { initTheme(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Responsive: collapse sidebar on screens < 1024px, hide on < 768px
  useEffect(() => {
    const lgQuery = window.matchMedia("(max-width: 1023px)");
    const mdQuery = window.matchMedia("(max-width: 767px)");

    const handleLg = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setSidebarCollapsed(true);
    };

    const handleMd = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleLg(lgQuery);
    handleMd(mdQuery);

    lgQuery.addEventListener("change", handleLg);
    mdQuery.addEventListener("change", handleMd);
    return () => {
      lgQuery.removeEventListener("change", handleLg);
      mdQuery.removeEventListener("change", handleMd);
    };
  }, [setSidebarCollapsed]);

  const marginLeft = isMobile ? 0 : sidebarCollapsed ? 68 : 260;

  return (
    <div className="min-h-screen bg-background">
      <DynamicTitle />
      <Sidebar />
      <motion.div
        className="min-h-screen flex flex-col"
        animate={{ marginLeft }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Header />
        <main className="flex-1 w-full max-w-[1440px] mx-auto 2xl:px-4">
          {children}
        </main>
      </motion.div>
      <Toast />
    </div>
  );
}
