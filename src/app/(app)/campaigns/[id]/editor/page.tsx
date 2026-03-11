"use client";

import { PageHeader } from "@/components/shared/page-header";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { motion } from "framer-motion";
import { use } from "react";

export default function CampaignEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title={`Editor de Campanha #${id}`}
        breadcrumb={["Campanhas", "Editor"]}
      />
      <PagePlaceholder pageName={`Editor de Campanha #${id}`} />
    </motion.div>
  );
}
