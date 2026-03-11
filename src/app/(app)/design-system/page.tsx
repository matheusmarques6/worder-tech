"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PencilSimple,
  Trash,
  DotsThree,
  Gear,
  SignOut,
  Package,
  MagnifyingGlass,
} from "@phosphor-icons/react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, type DropdownItem } from "@/components/ui/dropdown";
import { Tabs } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { KPICard } from "@/components/ui/kpi-card";

// Shared Components
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { SearchInput } from "@/components/shared/search-input";

/* ------------------------------------------------------------------ */
/* Section wrapper                                                     */
/* ------------------------------------------------------------------ */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold font-heading text-text-primary border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("geral");
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const dropdownItems: DropdownItem[] = [
    { label: "Editar", icon: <PencilSimple size={16} />, onClick: () => {} },
    { label: "Configurações", icon: <Gear size={16} />, onClick: () => {} },
    { divider: true, label: "" },
    {
      label: "Excluir",
      icon: <Trash size={16} />,
      onClick: () => {},
      danger: true,
    },
  ];

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Design System"
        breadcrumb={["Dashboard", "Design System"]}
        description="Todos os componentes renderizados para revisão visual."
      />

      {/* ---- BUTTONS ---- */}
      <Section title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      {/* ---- INPUT ---- */}
      <Section title="Input">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Input label="Nome" placeholder="Digite seu nome" />
          <Input
            label="E-mail"
            placeholder="email@exemplo.com"
            icon={<MagnifyingGlass size={18} />}
          />
          <Input label="Com erro" placeholder="..." error="Campo obrigatório" />
          <Input label="Desabilitado" placeholder="..." disabled />
        </div>
      </Section>

      {/* ---- CARD ---- */}
      <Section title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Título</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                Conteúdo dentro do card com hover shadow.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Outro Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                Cards usam border-radius e shadow do design system.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ---- BADGE ---- */}
      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm" variant="primary">
            Small
          </Badge>
          <Badge size="md" variant="primary">
            Medium
          </Badge>
          <Badge size="lg" variant="primary">
            Large
          </Badge>
        </div>
      </Section>

      {/* ---- TABLE ---- */}
      <Section title="Table">
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Campanha Black Friday</TableCell>
                <TableCell>
                  <StatusBadge status="active" />
                </TableCell>
                <TableCell>
                  <ChannelBadge channel="email" />
                </TableCell>
                <TableCell>R$ 12.450</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Recuperação PIX</TableCell>
                <TableCell>
                  <StatusBadge status="sending" />
                </TableCell>
                <TableCell>
                  <ChannelBadge channel="whatsapp" />
                </TableCell>
                <TableCell>R$ 8.320</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Newsletter Semanal</TableCell>
                <TableCell>
                  <StatusBadge status="draft" />
                </TableCell>
                <TableCell>
                  <ChannelBadge channel="sms" />
                </TableCell>
                <TableCell>R$ 0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Section>

      {/* ---- MODAL ---- */}
      <Section title="Modal">
        <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirmar ação"
        >
          <p className="text-sm text-text-secondary mb-4">
            Tem certeza que deseja prosseguir com esta ação?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
          </div>
        </Modal>
      </Section>

      {/* ---- TOAST ---- */}
      <Section title="Toast">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: "Salvo!", description: "Alterações salvas com sucesso.", variant: "success" })
            }
          >
            Toast Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: "Erro!", description: "Algo deu errado.", variant: "error" })
            }
          >
            Toast Error
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: "Info", description: "Informação relevante.", variant: "info" })
            }
          >
            Toast Info
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: "Atenção", description: "Verifique os dados.", variant: "warning" })
            }
          >
            Toast Warning
          </Button>
        </div>
      </Section>

      {/* ---- SKELETON ---- */}
      <Section title="Skeleton">
        <div className="space-y-3 max-w-md">
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-3/4" />
          <div className="flex items-center gap-3">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="card" />
          <Skeleton variant="table-row" />
        </div>
      </Section>

      {/* ---- AVATAR ---- */}
      <Section title="Avatar">
        <div className="flex items-center gap-4">
          <Avatar size="sm" name="Maria Silva" />
          <Avatar size="md" name="João Pedro" />
          <Avatar size="lg" name="Ana Costa" />
          <Avatar size="md" />
          <Avatar
            size="md"
            src="https://i.pravatar.cc/80?img=12"
            name="Foto"
          />
        </div>
      </Section>

      {/* ---- DROPDOWN ---- */}
      <Section title="Dropdown">
        <div className="flex gap-4">
          <Dropdown
            trigger={
              <Button variant="secondary" size="icon">
                <DotsThree size={20} weight="bold" />
              </Button>
            }
            items={dropdownItems}
          />
          <Dropdown
            trigger={<Button variant="secondary">Ações</Button>}
            items={[
              { label: "Editar", onClick: () => {} },
              { label: "Duplicar", onClick: () => {} },
              { divider: true, label: "" },
              { label: "Sair", icon: <SignOut size={16} />, onClick: () => {}, danger: true },
            ]}
          />
        </div>
      </Section>

      {/* ---- TABS ---- */}
      <Section title="Tabs">
        <Tabs
          tabs={[
            { label: "Geral", value: "geral" },
            { label: "Métricas", value: "metricas", badge: 5 },
            { label: "Configurações", value: "config" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <p className="text-sm text-text-muted mt-2">
          Aba ativa: <span className="font-semibold text-text-primary">{activeTab}</span>
        </p>
      </Section>

      {/* ---- TOOLTIP ---- */}
      <Section title="Tooltip">
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip content="Tooltip acima" side="top">
            <Button variant="secondary" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip abaixo" side="bottom">
            <Button variant="secondary" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip esquerda" side="left">
            <Button variant="secondary" size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip direita" side="right">
            <Button variant="secondary" size="sm">Right</Button>
          </Tooltip>
        </div>
      </Section>

      {/* ---- KPI CARD ---- */}
      <Section title="KPI Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Receita Total"
            value="R$ 45.230"
            change={12.5}
            changeLabel="vs mês anterior"
            icon="revenue"
            sparkline={[30, 45, 38, 52, 60, 55, 70]}
          />
          <KPICard
            label="Pedidos"
            value="384"
            change={8.2}
            changeLabel="vs mês anterior"
            icon="orders"
            index={1}
          />
          <KPICard
            label="Ticket Médio"
            value="R$ 117,78"
            change={-3.1}
            changeLabel="vs mês anterior"
            icon="ticket"
            index={2}
          />
          <KPICard
            label="Novos Leads"
            value="1.240"
            change={22.4}
            changeLabel="vs mês anterior"
            icon="leads"
            index={3}
          />
        </div>
      </Section>

      {/* ---- STATUS BADGE ---- */}
      <Section title="StatusBadge">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="active" />
          <StatusBadge status="draft" />
          <StatusBadge status="sent" />
          <StatusBadge status="sending" />
          <StatusBadge status="paused" />
          <StatusBadge status="scheduled" />
          <StatusBadge status="error" />
          <StatusBadge status="cancelled" />
        </div>
      </Section>

      {/* ---- CHANNEL BADGE ---- */}
      <Section title="ChannelBadge">
        <div className="flex flex-wrap items-center gap-2">
          <ChannelBadge channel="whatsapp" />
          <ChannelBadge channel="email" />
          <ChannelBadge channel="sms" />
          <ChannelBadge channel="instagram" />
          <ChannelBadge channel="webchat" />
        </div>
      </Section>

      {/* ---- EMPTY STATE ---- */}
      <Section title="EmptyState">
        <Card>
          <EmptyState
            icon={<Package size={32} weight="duotone" />}
            title="Nenhum produto encontrado"
            description="Importe seus produtos da loja ou adicione manualmente."
            action={{ label: "Importar Produtos", onClick: () => {} }}
          />
        </Card>
      </Section>

      {/* ---- SEARCH INPUT ---- */}
      <Section title="SearchInput">
        <div className="max-w-sm">
          <SearchInput
            placeholder="Buscar contatos..."
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
        {searchValue && (
          <p className="text-sm text-text-muted">
            Buscando: <span className="font-semibold text-text-primary">{searchValue}</span>
          </p>
        )}
      </Section>

      {/* ---- PAGE HEADER ---- */}
      <Section title="PageHeader">
        <Card>
          <PageHeader
            title="Campanhas"
            breadcrumb={["Dashboard", "Marketing", "Campanhas"]}
            description="Gerencie suas campanhas de marketing."
            actions={
              <Button size="sm">Nova Campanha</Button>
            }
          />
        </Card>
      </Section>
    </div>
  );
}
