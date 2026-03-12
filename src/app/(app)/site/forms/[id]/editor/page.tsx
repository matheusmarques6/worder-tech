"use client";

import { motion } from "framer-motion";
import { FormEditorNavbar } from "@/components/site/editor/editor-navbar";
import { EditorSidebar } from "@/components/site/editor/editor-sidebar";
import { PopupPreview } from "@/components/site/editor/popup-preview";

export default function FormEditorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-64px)]"
    >
      <FormEditorNavbar />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <PopupPreview />
      </div>
    </motion.div>
  );
}
