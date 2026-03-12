import { create } from "zustand";
import type { FlowNode, FlowConnection, FlowData, FlowNodeType } from "@/lib/mock-data/automations";
import { checkoutAbandonedFlow } from "@/lib/mock-data/automations";

interface FlowBuilderState {
  // Data
  name: string;
  status: "active" | "draft" | "paused";
  nodes: FlowNode[];
  connections: FlowConnection[];

  // UI state
  selectedNodeId: string | null;
  zoom: number;
  panX: number;
  panY: number;

  // Actions
  setName: (name: string) => void;
  setStatus: (status: "active" | "draft" | "paused") => void;
  loadFlow: (flow: FlowData) => void;

  selectNode: (id: string | null) => void;
  addNode: (type: FlowNodeType, x: number, y: number) => void;
  updateNode: (id: string, updates: Partial<FlowNode>) => void;
  moveNode: (id: string, x: number, y: number) => void;
  deleteNode: (id: string) => void;

  addConnection: (from: string, to: string, fromPort?: string, label?: string) => void;
  deleteConnection: (id: string) => void;

  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

let nodeCounter = 100;
let connCounter = 100;

function defaultLabel(type: FlowNodeType): string {
  const labels: Record<FlowNodeType, string> = {
    trigger: "Trigger",
    email: "E-mail",
    whatsapp: "WhatsApp",
    sms: "SMS",
    delay: "Atraso",
    condition: "Condição",
    condition_multi: "Condição múltipla",
    ab_test: "Teste A/B",
    update_contact: "Atualizar contato",
    webhook: "Webhook",
    alert: "Alerta interno",
    worder_ai: "Worder IA",
  };
  return labels[type] || type;
}

export const useFlowBuilderStore = create<FlowBuilderState>((set) => ({
  name: checkoutAbandonedFlow.name,
  status: checkoutAbandonedFlow.status,
  nodes: checkoutAbandonedFlow.nodes,
  connections: checkoutAbandonedFlow.connections,

  selectedNodeId: null,
  zoom: 1,
  panX: 0,
  panY: 0,

  setName: (name) => set({ name }),
  setStatus: (status) => set({ status }),

  loadFlow: (flow) =>
    set({
      name: flow.name,
      status: flow.status,
      nodes: flow.nodes,
      connections: flow.connections,
      selectedNodeId: null,
      zoom: 1,
      panX: 0,
      panY: 0,
    }),

  selectNode: (id) => set({ selectedNodeId: id }),

  addNode: (type, x, y) => {
    nodeCounter += 1;
    const id = `node-${nodeCounter}`;
    const node: FlowNode = {
      id,
      type,
      label: defaultLabel(type),
      config: {},
      x: Math.round(x / 20) * 20, // snap to grid
      y: Math.round(y / 20) * 20,
    };
    set((state) => ({ nodes: [...state.nodes, node], selectedNodeId: id }));
  },

  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    })),

  moveNode: (id, x, y) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, x: Math.round(x / 20) * 20, y: Math.round(y / 20) * 20 } : n
      ),
    })),

  deleteNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      connections: state.connections.filter((c) => c.from !== id && c.to !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  addConnection: (from, to, fromPort, label) => {
    connCounter += 1;
    const conn: FlowConnection = {
      id: `conn-${connCounter}`,
      from,
      to,
      fromPort: fromPort as FlowConnection["fromPort"],
      label,
    };
    set((state) => ({ connections: [...state.connections, conn] }));
  },

  deleteConnection: (id) =>
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== id),
    })),

  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(2, zoom)) }),
  setPan: (x, y) => set({ panX: x, panY: y }),
  zoomIn: () => set((s) => ({ zoom: Math.min(2, s.zoom + 0.15) })),
  zoomOut: () => set((s) => ({ zoom: Math.max(0.25, s.zoom - 0.15) })),
  resetView: () => set({ zoom: 1, panX: 0, panY: 0 }),
}));
