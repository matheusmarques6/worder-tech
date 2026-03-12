"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  HouseLine,
  ChatCircleDots,
  UsersThree,
  Megaphone,
  Lightning,
  ShoppingCartSimple,
  Layout,
  FileText,
  ChartBar,
  Plugs,
  GearSix,
  Question,
  CaretLeft,
  CaretRight,
  CaretUpDown,
  Moon,
  Sun,
  SignOut,
  User,
  Storefront,
} from "@phosphor-icons/react";
import { SIDEBAR_NAV, SIDEBAR_BOTTOM, type NavItem } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";

/* ------------------------------------------------------------------ */
/* Icon registry                                                       */
/* ------------------------------------------------------------------ */
const iconComponents: Record<string, typeof HouseLine> = {
  HouseLine,
  ChatCircleDots,
  UsersThree,
  Megaphone,
  Lightning,
  ShoppingCartSimple,
  Layout,
  FileText,
  ChartBar,
  Plugs,
  GearSix,
  Question,
};

/* ------------------------------------------------------------------ */
/* Collapsed popover submenu (shown on hover when sidebar is collapsed)*/
/* ------------------------------------------------------------------ */
function CollapsedPopover({
  item,
  children,
}: {
  item: NavItem;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 150);
  };

  if (!item.children || item.children.length === 0) {
    return (
      <div
        className="relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-[#1A1A1A] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full top-0 ml-2 z-50 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-xl py-1.5 min-w-[180px]"
          >
            <p className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#666] font-semibold">
              {item.label}
            </p>
            {item.children!.map((child) => {
              const isChildActive = pathname === child.href;
              return (
                <Link key={child.href} href={child.href}>
                  <div
                    className={cn(
                      "px-3 py-2 text-sm transition-colors duration-150",
                      isChildActive
                        ? "text-white bg-[rgba(242,107,42,0.1)]"
                        : "text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                    )}
                  >
                    {child.label}
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single nav item                                                     */
/* ------------------------------------------------------------------ */
function NavItemComponent({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const { openSubmenus, toggleSubmenu, openSubmenu } = useAppStore();

  const Icon = iconComponents[item.icon] || HouseLine;
  const hasChildren = item.children && item.children.length > 0;

  // Determine if this item or any child is active
  const isActive = hasChildren
    ? item.children!.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/")
      )
    : item.href === "/dashboard"
      ? pathname === "/dashboard" || pathname === "/"
      : pathname === item.href || pathname.startsWith(item.href + "/");

  const isExpanded = openSubmenus.includes(item.href);

  // Auto-expand submenu when a child route is active
  useEffect(() => {
    if (hasChildren && isActive && !isExpanded) {
      openSubmenu(item.href);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      toggleSubmenu(item.href);
    }
  };

  const content = (
    <motion.div
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer",
        isActive && !hasChildren
          ? "bg-[rgba(242,107,42,0.1)] text-white"
          : isActive && hasChildren
            ? "text-white"
            : "text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
      )}
      whileHover={{ x: collapsed ? 0 : 2 }}
      transition={{ duration: 0.15 }}
      onClick={hasChildren ? handleClick : undefined}
    >
      {/* Active indicator bar */}
      {isActive && !hasChildren && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-worder-primary rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <Icon
        size={22}
        weight={isActive ? "fill" : "duotone"}
        className={cn("flex-shrink-0 transition-opacity duration-200", !isActive && "opacity-50 group-hover:opacity-100")}
      />

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden flex-1"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      {item.badge && !collapsed && (
        <span className="ml-auto flex-shrink-0 bg-[#EF4444] text-white text-[11px] font-bold rounded-full flex items-center justify-center" style={{ minWidth: 18, height: 18, padding: "0 5px" }}>
          {item.badge}
        </span>
      )}

      {/* Badge dot when collapsed */}
      {item.badge && collapsed && (
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
      )}

      {/* Caret for children */}
      {hasChildren && !collapsed && (
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-auto"
        >
          <CaretRight size={14} weight="bold" />
        </motion.div>
      )}
    </motion.div>
  );

  // Wrap in popover when collapsed
  if (collapsed) {
    return (
      <CollapsedPopover item={item}>
        {hasChildren ? (
          content
        ) : (
          <Link href={item.href}>{content}</Link>
        )}
      </CollapsedPopover>
    );
  }

  return (
    <div>
      {hasChildren ? (
        content
      ) : (
        <Link href={item.href}>{content}</Link>
      )}

      {/* Expanded submenu */}
      <AnimatePresence>
        {hasChildren && isExpanded && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-[18px] pl-[18px] mt-1 space-y-0.5 border-l border-[rgba(255,255,255,0.08)]">
              {item.children!.map((child, i) => {
                const isChildActive =
                  pathname === child.href ||
                  pathname.startsWith(child.href + "/");
                return (
                  <motion.div
                    key={child.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link href={child.href}>
                      <div
                        className={cn(
                          "relative px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                          isChildActive
                            ? "text-white font-medium bg-[rgba(242,107,42,0.1)]"
                            : "text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                        )}
                      >
                        {isChildActive && (
                          <motion.div
                            layoutId="sidebar-child-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-worder-primary rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        {child.label}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* User footer dropdown                                                */
/* ------------------------------------------------------------------ */
function UserFooter({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer",
          "text-[#999] hover:bg-[rgba(255,255,255,0.05)]",
          collapsed && "justify-center"
        )}
      >
        <Avatar size="sm" name="Minha Loja" />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">
                Minha Loja
              </p>
              <p className="text-[11px] text-[#666] truncate">
                minhaloja.com.br
              </p>
            </div>
            <CaretUpDown size={16} weight="bold" className="flex-shrink-0 text-[#666]" />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute bottom-full mb-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-xl py-1.5 z-50",
              collapsed ? "left-full ml-2 bottom-0 mb-0" : "left-0 right-0"
            )}
            style={{ minWidth: 200 }}
          >
            <div className="px-3 py-2 border-b border-[#2A2A2A]">
              <p className="text-sm font-semibold text-white">Minha Loja</p>
              <p className="text-[11px] text-[#666]">minhaloja.com.br</p>
            </div>
            <button className="w-full px-3 py-2 text-sm text-left text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2 cursor-pointer">
              <Storefront size={16} weight="duotone" />
              Trocar Loja
            </button>
            <Link href="/settings/account" onClick={() => setOpen(false)}>
              <div className="px-3 py-2 text-sm text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
                <User size={16} weight="duotone" />
                Meu Perfil
              </div>
            </Link>
            <div className="border-t border-[#2A2A2A] mt-1 pt-1">
              <button className="w-full px-3 py-2 text-sm text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer">
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
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
export function Sidebar() {
  const {
    sidebarCollapsed,
    sidebarMobileOpen,
    toggleSidebar,
    closeMobileSidebar,
    darkMode,
    toggleDarkMode,
  } = useAppStore();

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-[rgba(255,255,255,0.08)]">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg font-heading"
            style={{
              background: "linear-gradient(135deg, #F26B2A, #F5A623)",
            }}
          >
            W
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-white font-heading font-bold text-xl whitespace-nowrap overflow-hidden"
              >
                Worder
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Collapse toggle */}
        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="ml-auto p-1.5 rounded-lg text-[#666] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200 cursor-pointer"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {sidebarCollapsed && (
        <div className="px-3 py-2">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 rounded-lg text-[#666] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <CaretLeft size={18} weight="bold" />
            </motion.div>
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {SIDEBAR_NAV.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      {/* Separator */}
      <div className="mx-4 my-2 border-t border-[rgba(255,255,255,0.06)]" />

      {/* Bottom Navigation */}
      <div className="py-3 px-3 space-y-0.5">
        {SIDEBAR_BOTTOM.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            collapsed={sidebarCollapsed}
          />
        ))}

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200 w-full cursor-pointer"
        >
          {darkMode ? (
            <Sun size={22} weight="duotone" className="flex-shrink-0" />
          ) : (
            <Moon size={22} weight="duotone" className="flex-shrink-0" />
          )}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {darkMode ? "Modo Claro" : "Modo Escuro"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* User footer */}
      <div className="px-3 pb-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
        <UserFooter collapsed={sidebarCollapsed} />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-screen z-40 flex-col hidden md:flex",
          "bg-[#1A1A1A] dark:bg-[#0A0A0A] border-r border-[rgba(255,255,255,0.06)] dark:border-[#1A1A1A]"
        )}
        animate={{ width: sidebarCollapsed ? 68 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
            />
            <motion.aside
              className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-[#1A1A1A] dark:bg-[#0A0A0A] w-[260px] md:hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
