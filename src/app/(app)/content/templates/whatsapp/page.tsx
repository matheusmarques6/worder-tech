"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { WATemplatesTable } from "@/components/content/wa-templates-table";
import { waTemplates } from "@/lib/mock-data/content";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Templates WhatsApp"
        breadcrumb={["Conteúdo", "Templates", "WhatsApp"]}
      />

      <div
        className="bg-background-card border border-border overflow-hidden"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        <WATemplatesTable templates={waTemplates} />
      </div>
    </motion.div>
  );
}
