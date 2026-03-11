"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  DownloadSimple,
  UploadSimple,
  ArrowUp,
  ArrowDown,
  MagnifyingGlass,
  Tag,
  ListPlus,
  Trash,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/page-header";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/search-input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  mockContacts,
  contactsKpis,
} from "@/lib/mock-data/contacts";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function relativeDate(isoDate: string): string {
  const now = new Date(2026, 2, 11); // Mar 11, 2026
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem.`;
  if (diffDays < 365) return `há ${Math.floor(diffDays / 30)} meses`;
  return `há ${Math.floor(diffDays / 365)} ano(s)`;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const segmentVariants: Record<string, "primary" | "success" | "error" | "warning" | "info" | "default"> = {
  VIP: "primary",
  "Repeat Buyer": "success",
  "Churn Risk": "error",
  "Novo Lead": "info",
  "Win-back": "warning",
};

type SortKey = "name" | "email" | "ltv" | "lastPurchase" | "createdAt";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/* Sortable Header                                                     */
/* ------------------------------------------------------------------ */
function SortableHead({
  label,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const isActive = currentSort === sortKey;
  return (
    <TableHead
      className={cn("cursor-pointer select-none hover:text-[#ccc] transition-colors", className)}
      onClick={() => onSort(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        {isActive &&
          (currentDir === "asc" ? (
            <ArrowUp size={12} weight="bold" />
          ) : (
            <ArrowDown size={12} weight="bold" />
          ))}
      </span>
    </TableHead>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function ContactsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  // Sorting
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Filtering + sorting
  const filtered = useMemo(() => {
    let list = [...mockContacts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "email") cmp = a.email.localeCompare(b.email);
      else if (sortKey === "ltv") cmp = a.ltv - b.ltv;
      else if (sortKey === "lastPurchase")
        cmp = new Date(a.lastPurchase).getTime() - new Date(b.lastPurchase).getTime();
      else if (sortKey === "createdAt")
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Selection
  const allSelected = paginated.length > 0 && paginated.every((c) => selected.has(c.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((c) => c.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-5"
    >
      <PageHeader title="Contatos" breadcrumb={["Contatos", "Todos"]} />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <KPICard
          label="Total de Contatos"
          value={contactsKpis.total.toLocaleString("pt-BR")}
          change={0}
          changeLabel=""
          icon="customers"
          index={0}
        />
        <KPICard
          label="Perfis Ativos"
          value={contactsKpis.active.toLocaleString("pt-BR")}
          change={12}
          changeLabel="vs. período anterior"
          icon="leads"
          index={1}
        />
        <KPICard
          label="Suprimidos"
          value={contactsKpis.suppressed.toLocaleString("pt-BR")}
          change={-4}
          changeLabel="vs. período anterior"
          icon="customers"
          index={2}
        />
      </div>

      {/* Action bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="w-full sm:max-w-sm">
          <SearchInput
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <UploadSimple size={16} weight="bold" />
            Importar
          </Button>
          <Button variant="secondary" size="sm">
            <DownloadSimple size={16} weight="bold" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus size={16} weight="bold" />
            Criar contato
          </Button>
        </div>
      </motion.div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 bg-worder-primary/5 border border-worder-primary/20 rounded-xl">
              <span className="text-sm font-medium text-text-primary">
                {selected.size} selecionado{selected.size > 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="secondary" size="sm">
                  <Tag size={14} weight="bold" />
                  Adicionar tag
                </Button>
                <Button variant="secondary" size="sm">
                  <ListPlus size={14} weight="bold" />
                  Adicionar à lista
                </Button>
                <Button variant="danger" size="sm">
                  <Trash size={14} weight="bold" />
                  Excluir
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      {paginated.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-background-card border border-border overflow-hidden"
          style={{
            borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-border accent-worder-primary cursor-pointer"
                  />
                </TableHead>
                <SortableHead
                  label="Nome"
                  sortKey="name"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
                <SortableHead
                  label="E-mail"
                  sortKey="email"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead>Telefone</TableHead>
                <SortableHead
                  label="LTV"
                  sortKey="ltv"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  className="text-right"
                />
                <SortableHead
                  label="Última Compra"
                  sortKey="lastPurchase"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead>Segmentos</TableHead>
                <SortableHead
                  label="Criado em"
                  sortKey="createdAt"
                  currentSort={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((contact) => (
                <TableRow
                  key={contact.id}
                  onClick={() => router.push(`/contacts/${contact.id}`)}
                >
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    className="w-10"
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(contact.id)}
                      onChange={() => toggleOne(contact.id)}
                      className="w-4 h-4 rounded border-border accent-worder-primary cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" name={contact.name} />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-text-secondary">
                      {contact.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-text-secondary font-mono text-xs">
                      {contact.phone}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold">
                      R$ {contact.ltv.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-text-secondary text-xs">
                      {relativeDate(contact.lastPurchase)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.segments.map((seg) => (
                        <Badge
                          key={seg}
                          variant={segmentVariants[seg] || "default"}
                          size="sm"
                        >
                          {seg}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-text-muted text-xs">
                      {formatDate(contact.createdAt)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <span className="text-sm text-text-muted">
              Mostrando {(page - 1) * perPage + 1}-
              {Math.min(page * perPage, filtered.length)} de{" "}
              {contactsKpis.total.toLocaleString("pt-BR")}
            </span>
            <div className="flex items-center gap-3">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="text-sm border border-border rounded-lg px-2 py-1 bg-background-card text-text-primary cursor-pointer"
              >
                <option value={20}>20 / página</option>
                <option value={50}>50 / página</option>
                <option value={100}>100 / página</option>
              </select>
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-8 w-8"
                >
                  <CaretLeft size={16} weight="bold" />
                </Button>
                <span className="text-sm text-text-secondary px-2">
                  {page} / {totalPages || 1}
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-8 w-8"
                >
                  <CaretRight size={16} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <EmptyState
          icon={<MagnifyingGlass size={32} weight="duotone" />}
          title="Nenhum contato encontrado"
          description="Tente ajustar os filtros ou termos de busca."
        />
      )}
    </motion.div>
  );
}
