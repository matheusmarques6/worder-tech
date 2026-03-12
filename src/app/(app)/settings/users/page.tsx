"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  DotsThree,
  PencilSimple,
  Trash,
  X,
  PaperPlaneTilt,
  ShieldStar,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";

type Role = "owner" | "admin" | "agent" | "viewer";

const roleConfig: Record<Role, { label: string; variant: "warning" | "info" | "success" | "default" }> = {
  owner: { label: "Proprietário", variant: "warning" },
  admin: { label: "Administrador", variant: "info" },
  agent: { label: "Atendente", variant: "success" },
  viewer: { label: "Visualizador", variant: "default" },
};

const users = [
  { id: "u1", name: "Matheus Marques", email: "matheus@worder.com.br", role: "owner" as Role, lastActive: "Agora" },
  { id: "u2", name: "Ana Silva", email: "ana@worder.com.br", role: "admin" as Role, lastActive: "Há 2 horas" },
  { id: "u3", name: "Carlos Santos", email: "carlos@worder.com.br", role: "agent" as Role, lastActive: "Há 1 dia" },
  { id: "u4", name: "Juliana Costa", email: "juliana@worder.com.br", role: "agent" as Role, lastActive: "Há 3 dias" },
  { id: "u5", name: "Pedro Lima", email: "pedro@worder.com.br", role: "viewer" as Role, lastActive: "Há 1 semana" },
];

export default function Page() {
  const [showInvite, setShowInvite] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="p-6 space-y-6">
      <PageHeader
        title="Usuários"
        breadcrumb={["Configurações", "Usuários"]}
        actions={
          <button onClick={() => setShowInvite(true)} className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110" style={{ borderRadius: "10px", background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)", boxShadow: "0 2px 6px rgba(242,107,42,0.25)" }}>
            <Plus size={16} weight="bold" /> Adicionar usuário
          </button>
        }
      />

      <AnimatePresence>
        {showBanner && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-start gap-3 p-4 bg-info/5 border border-info/20" style={{ borderRadius: "10px" }}>
            <ShieldStar size={20} weight="fill" className="text-info mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-text-primary">Funções personalizadas</p>
              <p className="text-[12px] text-text-muted mt-0.5">Crie funções com permissões granulares para controlar o acesso de cada membro.</p>
              <button className="mt-2 px-3 py-1.5 text-[11px] font-semibold text-white" style={{ borderRadius: "6px", background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>Criar função</button>
            </div>
            <button onClick={() => setShowBanner(false)} className="p-1 hover:bg-black/5 rounded-lg transition-colors"><X size={14} className="text-text-muted" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-background-card border border-border overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-table-header text-white">
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Usuário</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Função</th>
              <th className="py-3.5 px-5 text-left text-[11px] uppercase tracking-widest font-semibold">Último acesso</th>
              <th className="py-3.5 px-5 text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {users.map((user, i) => {
              const rc = roleConfig[user.role];
              return (
                <motion.tr key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }} className="hover:bg-[rgba(242,107,42,0.03)] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-worder-primary/10 flex items-center justify-center text-[12px] font-bold text-worder-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-[13px]">{user.name}</p>
                        <p className="text-[11px] text-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5"><Badge variant={rc.variant} size="sm">{rc.label}</Badge></td>
                  <td className="py-3.5 px-5"><span className="text-[13px] text-text-muted">{user.lastActive}</span></td>
                  <td className="py-3.5 px-5 text-center relative">
                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)} className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors">
                      <DotsThree size={18} weight="bold" className="text-text-muted" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-4 top-full mt-1 z-20 w-36 bg-background-card border border-border py-1 shadow-lg" style={{ borderRadius: "10px" }}>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-text-secondary hover:bg-bg-hover transition-colors"><PencilSimple size={13} /> Editar</button>
                        {user.role !== "owner" && (<><div className="my-1 border-t border-border-subtle" /><button className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-error hover:bg-error/5 transition-colors"><Trash size={13} /> Remover</button></>)}
                      </div>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showInvite && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowInvite(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-background-card w-full max-w-[420px] overflow-hidden shadow-xl" style={{ borderRadius: "16px" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary font-heading">Convidar usuário</h2>
                <button onClick={() => setShowInvite(false)} className="p-1.5 rounded-lg hover:bg-border-subtle transition-colors"><X size={18} className="text-text-muted" /></button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">E-mail</label>
                  <input type="email" placeholder="novo@usuario.com" className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors" style={{ borderRadius: "10px" }} />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">Função</label>
                  <select className="w-full mt-1.5 px-4 py-2.5 text-sm border border-border bg-bg-input outline-none focus:border-worder-primary transition-colors appearance-none" style={{ borderRadius: "10px" }}>
                    <option>Administrador</option><option>Atendente</option><option>Visualizador</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                <button onClick={() => setShowInvite(false)} className="px-4 py-2 text-[13px] font-medium text-text-secondary border border-border hover:bg-border-subtle transition-colors" style={{ borderRadius: "8px" }}>Cancelar</button>
                <button className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110" style={{ borderRadius: "8px", background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)" }}>
                  <PaperPlaneTilt size={14} weight="fill" /> Enviar convite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
