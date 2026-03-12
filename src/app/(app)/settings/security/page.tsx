"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  DeviceMobile,
  Desktop,
  Laptop,
  SignOut,
  ClockCounterClockwise,
  Warning,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsCard, SettingsToggle } from "@/components/settings/settings-card";
import { Badge } from "@/components/ui/badge";

interface Session {
  id: string;
  device: string;
  icon: "desktop" | "laptop" | "mobile";
  ip: string;
  location: string;
  lastActivity: string;
  current: boolean;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  date: string;
  ip: string;
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "Chrome — macOS Sonoma",
    icon: "desktop",
    ip: "189.44.72.130",
    location: "São Paulo, BR",
    lastActivity: "Agora",
    current: true,
  },
  {
    id: "2",
    device: "Safari — iPhone 15 Pro",
    icon: "mobile",
    ip: "189.44.72.131",
    location: "São Paulo, BR",
    lastActivity: "Há 2 horas",
    current: false,
  },
  {
    id: "3",
    device: "Firefox — Windows 11",
    icon: "laptop",
    ip: "201.17.55.89",
    location: "Rio de Janeiro, BR",
    lastActivity: "Há 3 dias",
    current: false,
  },
];

const mockActivities: ActivityLog[] = [
  { id: "1", action: "Login realizado", user: "carlos@worder.com", date: "12/03/2026 14:32", ip: "189.44.72.130" },
  { id: "2", action: "Chave de API criada", user: "carlos@worder.com", date: "12/03/2026 11:05", ip: "189.44.72.130" },
  { id: "3", action: "Campanha enviada", user: "ana@worder.com", date: "11/03/2026 18:20", ip: "201.17.55.89" },
  { id: "4", action: "Usuário convidado", user: "carlos@worder.com", date: "11/03/2026 15:47", ip: "189.44.72.130" },
  { id: "5", action: "Domínio verificado", user: "carlos@worder.com", date: "10/03/2026 09:12", ip: "189.44.72.130" },
  { id: "6", action: "Senha alterada", user: "ana@worder.com", date: "09/03/2026 16:55", ip: "201.17.55.89" },
  { id: "7", action: "Fluxo ativado", user: "lucas@worder.com", date: "08/03/2026 10:30", ip: "177.22.14.67" },
  { id: "8", action: "2FA ativado", user: "carlos@worder.com", date: "07/03/2026 08:15", ip: "189.44.72.130" },
];

const DeviceIcon = ({ type }: { type: Session["icon"] }) => {
  switch (type) {
    case "desktop":
      return <Desktop size={18} weight="fill" className="text-[#F26B2A]" />;
    case "mobile":
      return <DeviceMobile size={18} weight="fill" className="text-[#F26B2A]" />;
    case "laptop":
      return <Laptop size={18} weight="fill" className="text-[#F26B2A]" />;
  }
};

export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);

  const handleEndSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <PageHeader
        title="Segurança"
        breadcrumb={["Configurações", "Segurança"]}
        description="Gerencie a autenticação, sessões ativas e registro de atividades da sua conta."
      />

      {/* Autenticação */}
      <SettingsCard
        title="Autenticação"
        description="Configure métodos adicionais de proteção para sua conta."
      >
        <SettingsToggle
          label="Autenticação em 2 fatores (2FA)"
          description="Adicione uma camada extra de segurança exigindo um código temporário ao fazer login."
          enabled={twoFactor}
          onChange={setTwoFactor}
        />
        <div
          className="flex items-start gap-3 p-3 mt-2"
          style={{
            borderRadius: "8px",
            backgroundColor: twoFactor ? "rgba(34,197,94,0.06)" : "rgba(245,158,11,0.06)",
            border: twoFactor ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(245,158,11,0.15)",
          }}
        >
          {twoFactor ? (
            <ShieldCheck size={18} weight="fill" className="text-[#22C55E] flex-shrink-0 mt-0.5" />
          ) : (
            <Warning size={18} weight="fill" className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
          )}
          <p className="text-[12px] leading-relaxed" style={{ color: twoFactor ? "#166534" : "#92400E" }}>
            {twoFactor
              ? "A autenticação em 2 fatores está ativa. Utilize um aplicativo autenticador (Google Authenticator, Authy) para gerar códigos temporários."
              : "Recomendamos fortemente ativar a autenticação em 2 fatores para proteger sua conta contra acessos não autorizados."}
          </p>
        </div>
      </SettingsCard>

      {/* Sessões ativas */}
      <SettingsCard
        title="Sessões ativas"
        description="Visualize e gerencie os dispositivos conectados à sua conta."
        showSave={false}
      >
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-table-header">
                <th className="px-6 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide first:rounded-tl-[10px]">
                  Dispositivo
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide">
                  IP
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide">
                  Localização
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide">
                  Última atividade
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide last:rounded-tr-[10px]">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-t border-separator hover:bg-hover transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <DeviceIcon type={session.icon} />
                      <div>
                        <p className="font-medium text-text-primary text-[13px]">{session.device}</p>
                        {session.current && (
                          <Badge variant="success" size="sm" className="mt-0.5">
                            Sessão atual
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-[12px] font-mono">{session.ip}</td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{session.location}</td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{session.lastActivity}</td>
                  <td className="px-4 py-3">
                    {!session.current ? (
                      <button
                        onClick={() => handleEndSession(session.id)}
                        className="flex items-center gap-1.5 text-[12px] font-semibold text-[#EF4444] hover:text-[#DC2626] transition-colors"
                      >
                        <SignOut size={14} weight="fill" />
                        Encerrar
                      </button>
                    ) : (
                      <span className="text-[11px] text-text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      {/* Registro de atividades */}
      <SettingsCard
        title="Registro de atividades"
        description="Histórico de ações realizadas na sua conta."
        showSave={false}
      >
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-table-header">
                <th className="px-6 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide first:rounded-tl-[10px]">
                  Ação
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide">
                  Usuário
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide">
                  Data
                </th>
                <th className="px-4 py-3 font-semibold text-table-header-text text-[12px] uppercase tracking-wide last:rounded-tr-[10px]">
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {mockActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-t border-separator hover:bg-hover transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <ClockCounterClockwise size={14} weight="fill" className="text-[#F26B2A]" />
                      <span className="font-medium text-text-primary">{activity.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{activity.user}</td>
                  <td className="px-4 py-3 text-text-muted text-[12px]">{activity.date}</td>
                  <td className="px-4 py-3 text-text-muted text-[12px] font-mono">{activity.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-separator">
          <p className="text-[12px] text-text-muted">
            Mostrando 1-8 de 20
          </p>
        </div>
      </SettingsCard>
    </motion.div>
  );
}
