"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/stores/app-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Bell,
  List,
  CaretRight,
  X,
  SignOut,
  User,
  GearSix,
} from "@phosphor-icons/react";
import { PAGE_TITLES } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Breadcrumb                                                          */
/* ------------------------------------------------------------------ */
function Breadcrumb() {
  const pathname = usePathname();
  const pageInfo = PAGE_TITLES[pathname];

  const crumbs = pageInfo?.breadcrumb || [
    pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Página",
  ];

  return (
    <div className="flex items-center gap-1.5 text-sm">
      {crumbs.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <CaretRight
              size={12}
              weight="bold"
              className="text-text-muted"
            />
          )}
          <span
            className={cn(
              i === crumbs.length - 1
                ? "text-text-primary font-medium"
                : "text-text-muted"
            )}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Command Palette (search modal)                                      */
/* ------------------------------------------------------------------ */
function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Focus input and reset query when opening
  useEffect(() => {
    if (open) {
      // Use microtask to avoid synchronous setState in effect
      queueMicrotask(() => setQuery(""));
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Filter pages based on query
  const results = query.trim()
    ? Object.entries(PAGE_TITLES)
        .filter(
          ([, info]) =>
            info.title.toLowerCase().includes(query.toLowerCase()) ||
            info.breadcrumb.some((b) =>
              b.toLowerCase().includes(query.toLowerCase())
            )
        )
        .slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-[560px] mx-4 bg-background-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <MagnifyingGlass
                size={20}
                weight="bold"
                className="text-text-muted flex-shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar contatos, campanhas, páginas..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="py-2 max-h-[320px] overflow-y-auto">
                <p className="px-4 py-1 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                  Páginas
                </p>
                {results.map(([href, info]) => (
                  <Link key={href} href={href} onClick={onClose}>
                    <div className="px-4 py-2.5 hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors flex items-center gap-3 cursor-pointer">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          {info.title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {info.breadcrumb.join(" › ")}
                        </p>
                      </div>
                      <CaretRight
                        size={14}
                        className="text-text-muted"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-text-muted">
                  Nenhum resultado para &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {!query.trim() && (
              <div className="py-6 text-center">
                <p className="text-sm text-text-muted">
                  Digite para buscar páginas, contatos e campanhas...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* User dropdown (top-right)                                           */
/* ------------------------------------------------------------------ */
function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-3 border-l border-border cursor-pointer"
      >
        <Avatar size="sm" name="Admin" />
        <span className="hidden md:block text-sm font-medium text-text-primary">
          Admin
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-background-card border border-border shadow-xl rounded-xl py-1.5 min-w-[180px] z-50"
          >
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-semibold text-text-primary">Admin</p>
              <p className="text-[11px] text-text-muted">admin@minhaloja.com</p>
            </div>
            <Link href="/settings/account" onClick={() => setOpen(false)}>
              <div className="px-3 py-2 text-sm text-text-primary hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
                <User size={16} weight="duotone" />
                Meu Perfil
              </div>
            </Link>
            <Link href="/settings/account" onClick={() => setOpen(false)}>
              <div className="px-3 py-2 text-sm text-text-primary hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
                <GearSix size={16} weight="duotone" />
                Configurações
              </div>
            </Link>
            <div className="border-t border-border mt-1 pt-1">
              <button className="w-full px-3 py-2 text-sm text-left text-error hover:bg-error/5 transition-colors flex items-center gap-2 cursor-pointer">
                <SignOut size={16} weight="bold" />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header (TopBar)                                                     */
/* ------------------------------------------------------------------ */
export function Header() {
  const { toggleMobileSidebar } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd+K shortcut
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    },
    [searchOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white dark:bg-background-card border-b border-[#E0E0E0] dark:border-border"
      >
        {/* Left: Mobile menu + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <List size={24} weight="bold" className="text-text-primary" />
          </button>
          <Breadcrumb />
        </div>

        {/* Center: Global search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5F5F5] dark:bg-[#2A2A2A] text-text-muted hover:bg-[#EFEFEF] dark:hover:bg-[#333] transition-colors text-sm max-w-[480px] w-full mx-6 cursor-pointer"
        >
          <MagnifyingGlass size={18} weight="bold" />
          <span className="flex-1 text-left">
            Buscar contatos, campanhas...
          </span>
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-white dark:bg-[#1A1A1A] text-[10px] font-mono font-bold text-text-muted border border-border">
            ⌘K
          </kbd>
        </button>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            <Bell
              size={22}
              weight="duotone"
              className="text-text-secondary"
            />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>

          <UserDropdown />
        </div>
      </motion.header>

      {/* Command palette */}
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
