import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  toggleDarkMode: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  darkMode: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleMobileSidebar: () =>
    set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newMode);
      }
      return { darkMode: newMode };
    }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
