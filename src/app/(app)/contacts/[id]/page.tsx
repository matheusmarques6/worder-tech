"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/contacts/profile-header";
import { TabDetails } from "@/components/contacts/tab-details";
import { TabMetrics } from "@/components/contacts/tab-metrics";
import { TabLists } from "@/components/contacts/tab-lists";
import { TabOrders } from "@/components/contacts/tab-orders";
import { TabConversations } from "@/components/contacts/tab-conversations";
import { contactProfile } from "@/lib/mock-data/contact-profile";

const tabs = [
  { label: "Detalhes", value: "details" },
  { label: "Métricas & Insights", value: "metrics" },
  { label: "Listas & Segmentos", value: "lists", badge: 4 },
  { label: "Pedidos", value: "orders", badge: 7 },
  { label: "Conversas", value: "conversations", badge: 5 },
];

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const [activeTab, setActiveTab] = useState("details");

  // In production, fetch contact by ID. For now, use mock data.
  const contact = contactProfile;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title={contact.name}
        breadcrumb={["Contatos", contact.name]}
      />

      <ProfileHeader contact={contact} />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "details" && <TabDetails contact={contact} />}
          {activeTab === "metrics" && <TabMetrics contact={contact} />}
          {activeTab === "lists" && <TabLists contact={contact} />}
          {activeTab === "orders" && <TabOrders contact={contact} />}
          {activeTab === "conversations" && (
            <TabConversations contact={contact} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
