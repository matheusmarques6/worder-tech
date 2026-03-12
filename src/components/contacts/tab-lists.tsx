"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ListBullets,
  FunnelSimple,
  UsersThree,
  Plus,
  CalendarBlank,
} from "@phosphor-icons/react";
import type { ContactProfile } from "@/lib/mock-data/contact-profile";

interface TabListsProps {
  contact: ContactProfile;
}

export function TabLists({ contact }: TabListsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-text-muted">
          {contact.lists.length} lista{contact.lists.length !== 1 && "s"} e segmentos
        </p>
        <Button variant="secondary" size="sm">
          <Plus size={14} weight="bold" />
          Adicionar à lista
        </Button>
      </div>

      <div className="space-y-3">
        {contact.lists.map((list, index) => (
          <motion.div
            key={list.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
          >
            <Card className="!p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      list.type === "segment"
                        ? "bg-worder-primary/10"
                        : "bg-info/10"
                    }`}
                  >
                    {list.type === "segment" ? (
                      <FunnelSimple
                        size={20}
                        weight="duotone"
                        className="text-worder-primary"
                      />
                    ) : (
                      <ListBullets
                        size={20}
                        weight="duotone"
                        className="text-info"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {list.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <Badge
                        variant={list.type === "segment" ? "primary" : "info"}
                        size="sm"
                      >
                        {list.type === "segment" ? "Segmento" : "Lista"}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <UsersThree size={12} weight="duotone" />
                        {list.contactCount.toLocaleString("pt-BR")} contatos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <CalendarBlank size={12} weight="duotone" />
                  Adicionado em{" "}
                  {new Date(list.addedAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
