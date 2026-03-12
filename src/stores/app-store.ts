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
  initTheme: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSubmenu: (href: string) => void;
  openSubmenu: (href: string) => void;
}

function applyDarkClass(dark: boolean) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.classList.add("transitioning");
  html.classList.toggle("dark", dark);
  setTimeout(() => html.classList.remove("transitioning"), 250);
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
      applyDarkClass(newMode);
      try { localStorage.setItem("worder-theme", newMode ? "dark" : "light"); } catch {}
      return { darkMode: newMode };
    }),
  initTheme: () => {
    if (typeof window === "undefined") return;
    let dark = false;
    try {
      const stored = localStorage.getItem("worder-theme");
      if (stored === "dark") dark = true;
      else if (stored === "light") dark = false;
      else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { dark = false; }
    document.documentElement.classList.toggle("dark", dark);
    set({ darkMode: dark });
  },
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
