"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EditorNavbar } from "@/components/campaigns/editor/editor-navbar";
import { BlockSidebar } from "@/components/campaigns/editor/block-sidebar";
import { EmailCanvas } from "@/components/campaigns/editor/email-canvas";

export default function CampaignEditorPage() {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-64px)]"
    >
      <EditorNavbar previewMode={previewMode} onPreviewModeChange={setPreviewMode} />
      <div className="flex flex-1 overflow-hidden">
        <BlockSidebar />
        <EmailCanvas previewMode={previewMode} />
      </div>
    </motion.div>
  );
}
