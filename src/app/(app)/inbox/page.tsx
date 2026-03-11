"use client";

import { PageHeader } from "@/components/shared/page-header";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Inbox"
        breadcrumb={["Inbox"]}
      />
      <PagePlaceholder pageName="Inbox" />
    </motion.div>
  );
}
