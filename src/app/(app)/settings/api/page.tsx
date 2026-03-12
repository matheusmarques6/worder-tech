"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeSlash, Plus, X, Warning, Key, Copy, CheckCircle } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsField } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

interface APIKey {
  id: string;
  name: string;
  key: string;
  keyFull: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string;
}

const mockKeys: APIKey[] = [
  {
    id: "1",
    name: "Produção",
    key: "wdr_pk_****8a3f",
    keyFull: "wdr_pk_live_a7b2c9d4e5f6g8h1i0j3k4l5m6n7o8a3f",
    permissions: ["Leitura", "Escrita"],
    createdAt: "01/01/2026",
    lastUsed: "12/03/2026",
  },
  {
    id: "2",
    name: "Staging",
    key: "wdr_sk_****2b1c",
    keyFull: "wdr_sk_test_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l2b1c",
    permissions: ["Leitura"],
    createdAt: "15/02/2026",
    lastUsed: "10/03/2026",
  },
];

export default function APIPage() {
  const [keys] = useState<APIKey[]>(mockKeys);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<Record<string, boolean>>({
    readProfiles: false,
    writeProfiles: false,
    campaigns: false,
    automations: false,
    metrics: false,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePermission = (key: string) => {
    setNewKeyPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const permissionLabels: Record<string, string> = {
    readProfiles: "Leitura perfis",
    writeProfiles: "Escrita perfis",
    campaigns: "Campanhas",
    automations: "Automações",
    metrics: "Métricas",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="API"
        breadcrumb={["Configurações", "API"]}
        description="Gerencie as chaves de API para integração com sistemas externos."
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 8px rgba(242,107,42,0.25)",
            }}
          >
            <Plus size={16} weight="bold" />
            Gerar nova chave
          </button>
        }
      />

      <SettingsCard title="Chaves de API" showSave={false}>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr style={{ backgroundColor: "#1A1A1A" }}>
                <th className="px-6 py-3 font-semibold text-white text-[12px] uppercase tracking-wide first:rounded-tl-[10px]">
                  Nome
                </th>
                <th className="px-4 py-3 font-semibold text-white text-[12px] uppercase tracking-wide">
                  Chave
                </th>
                <th className="px-4 py-3 font-semibold text-white text-[12px] uppercase tracking-wide">
                  Permissões
                </th>
                <th className="px-4 py-3 font-semibold text-white text-[12px] uppercase tracking-wide">
                  Criada em
                </th>
                <th className="px-4 py-3 font-semibold text-white text-[12px] uppercase tracking-wide last:rounded-tr-[10px]">
                  Último uso
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.map((apiKey) => (
                <tr
                  key={apiKey.id}
                  className="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors group"
                >
                  <td className="px-6 py-3 font-medium text-text-primary">
                    <div className="flex items-center gap-2">
                      <Key size={16} weight="fill" className="text-[#F26B2A]" />
                      {apiKey.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code
                        className="text-[12px] font-mono px-2 py-1 bg-[#F5F5F5]"
                        style={{ borderRadius: "6px" }}
                      >
                        {revealedKeys[apiKey.id] ? apiKey.keyFull : apiKey.key}
                      </code>
                      <button
                        onClick={() => toggleReveal(apiKey.id)}
                        className="p-1 hover:bg-[#F0F0F0] rounded-md transition-colors"
                        title={revealedKeys[apiKey.id] ? "Ocultar" : "Revelar"}
                      >
                        {revealedKeys[apiKey.id] ? (
                          <EyeSlash size={14} weight="fill" className="text-text-muted" />
                        ) : (
                          <Eye size={14} weight="fill" className="text-text-muted" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            revealedKeys[apiKey.id] ? apiKey.keyFull : apiKey.key,
                            apiKey.id
                          )
                        }
                        className="p-1 hover:bg-[#F0F0F0] rounded-md transition-colors"
                        title="Copiar"
                      >
                        {copiedId === apiKey.id ? (
                          <CheckCircle size={14} weight="fill" className="text-[#22C55E]" />
                        ) : (
                          <Copy size={14} weight="fill" className="text-text-muted" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {apiKey.permissions.map((perm) => (
                        <Badge
                          key={perm}
                          variant={perm === "Escrita" ? "warning" : "info"}
                          size="sm"
                        >
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{apiKey.createdAt}</td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{apiKey.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      {/* Modal - Gerar nova chave */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-md p-6 shadow-xl"
              style={{ borderRadius: "12px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-text-primary font-heading">
                  Gerar nova chave de API
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-[#F0F0F0] rounded-md transition-colors"
                >
                  <X size={18} weight="bold" className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                <SettingsField
                  label="Nome da chave"
                  placeholder="Ex: Integração ERP"
                  value={newKeyName}
                  onChange={setNewKeyName}
                />

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">
                    Permissões
                  </label>
                  <div className="mt-2 space-y-2.5">
                    {Object.entries(permissionLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newKeyPermissions[key]}
                          onChange={() => togglePermission(key)}
                          className="w-4 h-4 rounded accent-[#F26B2A]"
                        />
                        <span className="text-[13px] text-text-primary">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Warning */}
                <div
                  className="flex items-start gap-3 p-3 bg-[#FFF8E1] border border-[#F59E0B]/20"
                  style={{ borderRadius: "8px" }}
                >
                  <Warning size={18} weight="fill" className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#92400E] leading-relaxed">
                    A chave será exibida apenas uma vez. Copie e armazene em local seguro imediatamente após a criação.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F0F0F0]">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 text-[13px] font-semibold border border-[#E0E0E0] text-text-primary hover:bg-[#FAFAFA] transition-colors"
                  style={{ borderRadius: "8px" }}
                >
                  Cancelar
                </button>
                <button
                  className="px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
                    boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
                  }}
                >
                  Gerar chave
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
