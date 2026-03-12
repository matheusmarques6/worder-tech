"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightning,
  EnvelopeSimple,
  WhatsappLogo,
  DeviceMobile,
  Clock,
  GitFork,
  TreeStructure,
  Shuffle,
  UserGear,
  ArrowSquareOut,
  Bell,
  Robot,
  Plus,
  Minus,
  Crosshair,
} from "@phosphor-icons/react";
import { useFlowBuilderStore } from "@/stores/flow-builder-store";
import type { FlowNode, FlowNodeType } from "@/lib/mock-data/automations";
import type { ReactNode } from "react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 72;

const nodeIconMap: Record<FlowNodeType, { icon: ReactNode; color: string }> = {
  trigger: { icon: <Lightning size={18} weight="fill" />, color: "#F26B2A" },
  email: { icon: <EnvelopeSimple size={18} weight="fill" />, color: "#3B82F6" },
  whatsapp: { icon: <WhatsappLogo size={18} weight="fill" />, color: "#25D366" },
  sms: { icon: <DeviceMobile size={18} weight="fill" />, color: "#6B7280" },
  delay: { icon: <Clock size={18} weight="fill" />, color: "#6B7280" },
  condition: { icon: <GitFork size={18} weight="fill" />, color: "#F59E0B" },
  condition_multi: { icon: <TreeStructure size={18} weight="fill" />, color: "#F59E0B" },
  ab_test: { icon: <Shuffle size={18} weight="fill" />, color: "#8B5CF6" },
  update_contact: { icon: <UserGear size={18} weight="fill" />, color: "#8B5CF6" },
  webhook: { icon: <ArrowSquareOut size={18} weight="fill" />, color: "#6366F1" },
  alert: { icon: <Bell size={18} weight="fill" />, color: "#F59E0B" },
  worder_ai: { icon: <Robot size={18} weight="fill" />, color: "#F26B2A" },
};

function FlowNodeCard({ node }: { node: FlowNode }) {
  const { selectedNodeId, selectNode, moveNode } = useFlowBuilderStore();
  const isSelected = selectedNodeId === node.id;
  const isTrigger = node.type === "trigger";
  const isCondition = node.type === "condition" || node.type === "condition_multi";
  const meta = nodeIconMap[node.type];

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; nodeX: number; nodeY: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectNode(node.id);
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        nodeX: node.x,
        nodeY: node.y,
      };
    },
    [node.id, node.x, node.y, selectNode]
  );

  useEffect(() => {
    if (!isDragging) return;

    function onMouseMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const { zoom } = useFlowBuilderStore.getState();
      const dx = (e.clientX - dragRef.current.startX) / zoom;
      const dy = (e.clientY - dragRef.current.startY) / zoom;
      moveNode(node.id, dragRef.current.nodeX + dx, dragRef.current.nodeY + dy);
    }

    function onMouseUp() {
      setIsDragging(false);
      dragRef.current = null;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, node.id, moveNode]);

  // Config display text
  let configText = "";
  if (node.config.duration && node.config.unit) {
    configText = `${node.config.duration} ${node.config.unit}`;
  } else if (node.config.subject) {
    configText = node.config.subject;
  } else if (node.config.template) {
    configText = node.config.template;
  } else if (node.config.trigger) {
    configText = node.config.trigger;
  } else if (node.config.action === "end") {
    configText = "Finalizar fluxo";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: NODE_WIDTH,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isSelected ? 10 : isDragging ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="overflow-hidden transition-shadow duration-150"
        style={{
          borderRadius: "12px",
          border: isSelected
            ? "2px solid #F26B2A"
            : "1px solid #E0E0E0",
          background: isTrigger
            ? "linear-gradient(135deg, #1A1A1A 0%, #F26B2A 100%)"
            : "white",
          boxShadow: isSelected
            ? "0 4px 16px rgba(242,107,42,0.2)"
            : "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div className="px-3 py-3">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
              style={{
                background: isTrigger ? "rgba(255,255,255,0.2)" : `${meta.color}15`,
                color: isTrigger ? "white" : meta.color,
              }}
            >
              {meta.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[12px] font-semibold truncate"
                style={{ color: isTrigger ? "white" : "#1A1A1A" }}
              >
                {node.label}
              </p>
              {configText && (
                <p
                  className="text-[10px] truncate mt-0.5"
                  style={{ color: isTrigger ? "rgba(255,255,255,0.7)" : "#888" }}
                >
                  {configText}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Condition branches indicator */}
        {isCondition && (
          <div className="flex border-t" style={{ borderColor: isSelected ? "rgba(242,107,42,0.2)" : "#F0F0F0" }}>
            <div className="flex-1 text-center py-1.5 text-[10px] font-bold text-[#22C55E] border-r border-separator">
              Sim ✓
            </div>
            <div className="flex-1 text-center py-1.5 text-[10px] font-bold text-[#EF4444]">
              Não ✗
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Connections() {
  const { nodes, connections, status } = useFlowBuilderStore();
  const isActive = status === "active";

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#BBBBBB" />
        </marker>
        <marker id="arrowhead-yes" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22C55E" />
        </marker>
        <marker id="arrowhead-no" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#EF4444" />
        </marker>
      </defs>
      {connections.map((conn) => {
        const fromNode = nodeMap.get(conn.from);
        const toNode = nodeMap.get(conn.to);
        if (!fromNode || !toNode) return null;

        const isYes = conn.fromPort === "yes";
        const isNo = conn.fromPort === "no";
        const isConditionBranch = isYes || isNo;

        const fromX = fromNode.x + NODE_WIDTH;
        const fromY =
          isYes
            ? fromNode.y + NODE_HEIGHT * 0.3
            : isNo
              ? fromNode.y + NODE_HEIGHT * 0.7
              : fromNode.y + NODE_HEIGHT / 2;

        const toX = toNode.x;
        const toY = toNode.y + NODE_HEIGHT / 2;

        const midX = (fromX + toX) / 2;

        const d = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

        const strokeColor = isYes ? "#22C55E" : isNo ? "#EF4444" : "#CCCCCC";
        const markerId = isYes ? "arrowhead-yes" : isNo ? "arrowhead-no" : "arrowhead";

        return (
          <g key={conn.id}>
            <path
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={2}
              markerEnd={`url(#${markerId})`}
              strokeDasharray={isActive && !isConditionBranch ? "6 4" : "none"}
            >
              {isActive && !isConditionBranch && (
                <animate
                  attributeName="stroke-dashoffset"
                  values="10;0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {conn.label && (
              <text
                x={midX}
                y={fromY + (isNo ? 12 : isYes ? -8 : -8)}
                textAnchor="middle"
                className="text-[10px] font-semibold"
                fill={isYes ? "#22C55E" : isNo ? "#EF4444" : "#888"}
              >
                {conn.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function AddNodeButton({
  x,
  y,
  onClick,
}: {
  x: number;
  y: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center justify-center w-7 h-7 bg-card border border-border rounded-full hover:bg-worder-primary hover:border-worder-primary transition-all group z-20 shadow-sm"
      style={{ left: x - 14, top: y - 14 }}
    >
      <Plus
        size={14}
        weight="bold"
        className="text-text-muted group-hover:text-white transition-colors"
      />
    </button>
  );
}

function Minimap() {
  const { nodes, zoom, panX, panY } = useFlowBuilderStore();

  if (nodes.length === 0) return null;

  const minX = Math.min(...nodes.map((n) => n.x)) - 40;
  const minY = Math.min(...nodes.map((n) => n.y)) - 40;
  const maxX = Math.max(...nodes.map((n) => n.x + NODE_WIDTH)) + 40;
  const maxY = Math.max(...nodes.map((n) => n.y + NODE_HEIGHT)) + 40;

  const scale = 0.08;
  const width = (maxX - minX) * scale;
  const height = (maxY - minY) * scale;

  return (
    <div
      className="absolute bottom-16 right-4 bg-card border border-border overflow-hidden shadow-sm z-30"
      style={{
        borderRadius: "8px",
        width: Math.max(120, Math.min(180, width)),
        height: Math.max(60, Math.min(100, height)),
      }}
    >
      <svg
        className="w-full h-full"
        viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {nodes.map((node) => (
          <rect
            key={node.id}
            x={node.x}
            y={node.y}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            rx={6}
            fill={node.type === "trigger" ? "#F26B2A" : "#E0E0E0"}
            stroke="none"
          />
        ))}
        {/* Viewport indicator */}
        <rect
          x={-panX / zoom}
          y={-panY / zoom}
          width={1200 / zoom}
          height={600 / zoom}
          fill="none"
          stroke="#F26B2A"
          strokeWidth={4 / scale}
          rx={4}
          opacity={0.4}
        />
      </svg>
    </div>
  );
}

export function FlowCanvas() {
  const {
    nodes,
    connections,
    selectedNodeId,
    selectNode,
    zoom,
    panX,
    panY,
    setPan,
    setZoom,
    zoomIn,
    zoomOut,
    resetView,
    deleteNode,
    addNode,
  } = useFlowBuilderStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // Pan handling
  const handleBackgroundMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only for background clicks (not on nodes)
      if (e.target === e.currentTarget || (e.target as HTMLElement).closest("[data-canvas-bg]")) {
        selectNode(null);
        setIsPanning(true);
        panStartRef.current = { x: e.clientX, y: e.clientY, panX, panY };
      }
    },
    [panX, panY, selectNode]
  );

  useEffect(() => {
    if (!isPanning) return;

    function onMouseMove(e: MouseEvent) {
      if (!panStartRef.current) return;
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan(panStartRef.current.panX + dx, panStartRef.current.panY + dy);
    }

    function onMouseUp() {
      setIsPanning(false);
      panStartRef.current = null;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isPanning, setPan]);

  // Zoom via scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setZoom(zoom + delta);
    },
    [zoom, setZoom]
  );

  // Keyboard: delete selected node
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedNodeId) {
        // Don't delete if in an input
        if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
        deleteNode(selectedNodeId);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedNodeId, deleteNode]);

  // Compute + button positions (midpoint between connected nodes)
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const addButtons = connections
    .filter((c) => !c.fromPort) // Don't show on condition branches
    .map((conn) => {
      const from = nodeMap.get(conn.from);
      const to = nodeMap.get(conn.to);
      if (!from || !to) return null;
      return {
        key: conn.id,
        x: (from.x + NODE_WIDTH + to.x) / 2,
        y: (from.y + NODE_HEIGHT / 2 + to.y + NODE_HEIGHT / 2) / 2,
      };
    })
    .filter(Boolean) as { key: string; x: number; y: number }[];

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden"
      style={{
        background: "#FAFAFA",
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        cursor: isPanning ? "grabbing" : "default",
      }}
      onMouseDown={handleBackgroundMouseDown}
      onWheel={handleWheel}
    >
      {/* Transformed canvas */}
      <div
        data-canvas-bg
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          transition: isPanning ? "none" : "transform 0.1s ease-out",
        }}
        onMouseDown={handleBackgroundMouseDown}
      >
        {/* SVG Connections */}
        <Connections />

        {/* Add Node Buttons */}
        {addButtons.map((btn) => (
          <AddNodeButton
            key={btn.key}
            x={btn.x}
            y={btn.y}
            onClick={() => addNode("delay", btn.x - 100, btn.y - 36)}
          />
        ))}

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <FlowNodeCard key={node.id} node={node} />
          ))}
        </AnimatePresence>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-30">
        <button
          onClick={zoomIn}
          className="flex items-center justify-center w-8 h-8 bg-card border border-border rounded-lg hover:bg-hover shadow-sm transition-colors"
        >
          <Plus size={14} weight="bold" className="text-text-muted" />
        </button>
        <button
          onClick={resetView}
          className="flex items-center justify-center w-8 h-8 bg-card border border-border rounded-lg hover:bg-hover shadow-sm transition-colors"
        >
          <Crosshair size={14} weight="bold" className="text-text-muted" />
        </button>
        <button
          onClick={zoomOut}
          className="flex items-center justify-center w-8 h-8 bg-card border border-border rounded-lg hover:bg-hover shadow-sm transition-colors"
        >
          <Minus size={14} weight="bold" className="text-text-muted" />
        </button>
        <div className="text-center text-[10px] text-text-muted font-mono mt-1">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Minimap */}
      <Minimap />
    </div>
  );
}
