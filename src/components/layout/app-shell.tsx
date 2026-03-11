"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Toast } from "@/components/ui/toast";
import { motion } from "framer-motion";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background">
      <Sidebar />
      <motion.div
        className="min-h-screen flex flex-col"
        animate={{ marginLeft }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Header />
        <main className="flex-1 w-full max-w-[1440px] mx-auto">
          {children}
        </main>
      </motion.div>
      <Toast />
    </div>
  );
}
