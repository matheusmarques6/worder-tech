"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConversationList } from "@/components/inbox/conversation-list";
import { ChatArea } from "@/components/inbox/chat-area";
import { ContactContext } from "@/components/inbox/contact-context";
import {
  inboxConversations,
  chatMessages,
  activeContactContext,
  aiSuggestion,
} from "@/lib/mock-data/inbox";

export default function InboxPage() {
  const [activeConvId, setActiveConvId] = useState("c1");
  const [showContext, setShowContext] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-[calc(100vh-64px)] overflow-hidden"
    >
      {/* Column 1 — Conversation List */}
      <ConversationList
        conversations={inboxConversations}
        activeId={activeConvId}
        onSelect={setActiveConvId}
      />

      {/* Column 2 — Chat Area */}
      <ChatArea
        messages={chatMessages}
        contact={activeContactContext}
        aiSuggestion={aiSuggestion}
      />

      {/* Column 3 — Contact Context */}
      <AnimatePresence>
        {showContext && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0 overflow-hidden"
          >
            <ContactContext
              contact={activeContactContext}
              onClose={() => setShowContext(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
