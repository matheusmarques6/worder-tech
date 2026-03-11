import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  darkMode: boolean;
  openSubmenus: string[];
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleDarkMode: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSubmenu: (href: string) => void;
  openSubmenu: (href: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  darkMode: false,
  openSubmenus: [],
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleMobileSidebar: () =>
    set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),
  closeMobileSidebar: () => set({ sidebarMobileOpen: false }),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newMode);
      }
      return { darkMode: newMode };
    }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSubmenu: (href) =>
    set((state) => ({
      openSubmenus: state.openSubmenus.includes(href)
        ? state.openSubmenus.filter((h) => h !== href)
        : [...state.openSubmenus, href],
    })),
  openSubmenu: (href) =>
    set((state) => ({
      openSubmenus: state.openSubmenus.includes(href)
        ? state.openSubmenus
        : [...state.openSubmenus, href],
    })),
}));
