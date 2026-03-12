"use client";

import { motion } from "framer-motion";
import { BuilderNavbar } from "@/components/automations/builder/builder-navbar";
import { ActionSidebar } from "@/components/automations/builder/action-sidebar";
import { FlowCanvas } from "@/components/automations/builder/flow-canvas";
import { DetailPanel } from "@/components/automations/builder/detail-panel";

export default function FlowBuilderPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-64px)]"
    >
      <BuilderNavbar />
      <div className="flex flex-1 overflow-hidden">
        <ActionSidebar />
        <FlowCanvas />
        <DetailPanel />
      </div>
    </motion.div>
  );
}
