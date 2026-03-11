"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  CaretDown,
  Moon,
  Sun,
  SignOut,
  Storefront,
} from "@phosphor-icons/react";
import { SIDEBAR_NAV, SIDEBAR_BOTTOM, type NavItem } from "@/lib/constants";

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

function NavItemComponent({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const Icon = iconComponents[item.icon] || HouseLine;
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard" || pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(item.href + "/") ||
        item.children?.some((c) => pathname === c.href);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setExpanded(!expanded);
    }
  };

  const content = (
    <motion.div
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group cursor-pointer",
        isActive
          ? "bg-sidebar-active-bg text-white"
          : "text-sidebar-text hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
      )}
      whileHover={{ x: collapsed ? 0 : 2 }}
      transition={{ duration: 0.15 }}
      onClick={hasChildren ? handleClick : undefined}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-worder-primary rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <Icon size={22} weight={isActive ? "fill" : "duotone"} className="flex-shrink-0" />

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
        <span className="ml-auto flex-shrink-0 bg-worder-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {item.badge}
        </span>
      )}

      {/* Badge dot when collapsed */}
      {item.badge && collapsed && (
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-worder-primary rounded-full" />
      )}

      {/* Caret for children */}
      {hasChildren && !collapsed && (
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <CaretDown size={14} weight="bold" />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div>
      {hasChildren ? (
        content
      ) : (
        <Link href={item.href}>{content}</Link>
      )}

      {/* Submenu */}
      <AnimatePresence>
        {hasChildren && expanded && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-1 space-y-0.5">
              {item.children!.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link key={child.href} href={child.href}>
                    <div
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                        isChildActive
                          ? "text-white font-medium bg-sidebar-active-bg"
                          : "text-sidebar-text hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                      )}
                    >
                      {child.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, darkMode, toggleDarkMode } =
    useAppStore();

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 flex flex-col",
        "bg-sidebar-bg border-r border-[#2A2A2A]"
      )}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-[#2A2A2A]">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg font-heading"
            style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
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
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      {/* Separator + Bottom Navigation */}
      <div className="py-3 px-3 border-t border-[#2A2A2A] space-y-1">
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-text hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200 w-full cursor-pointer"
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

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-text hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200 w-full cursor-pointer"
        >
          <motion.div
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <CaretLeft size={22} weight="bold" />
          </motion.div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Recolher
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Store info footer */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 px-3 py-2.5 mt-2 border-t border-[#2A2A2A] pt-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <Storefront size={16} weight="fill" className="text-worder-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Minha Loja</p>
                <p className="text-[11px] text-sidebar-text truncate">minhaloja.com.br</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
