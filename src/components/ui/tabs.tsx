"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TabItem {
  label: string;
  value: string;
  badge?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("relative border-b border-border", className)}>
      <div className="flex gap-0">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                "relative px-4 py-2.5 text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2",
                isActive
                  ? "text-text-primary font-semibold"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className="rounded-full bg-worder-primary/10 text-worder-primary text-xs px-1.5 py-0.5 font-medium leading-none">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-worder-primary rounded-full"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Tabs };
