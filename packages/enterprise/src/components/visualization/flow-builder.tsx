'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface FlowNode {
  id: string;
  label: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'custom';
  position: { x: number; y: number };
  data?: Record<string, unknown>;
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface FlowBuilderProps {
  nodes?: FlowNode[];
  edges?: FlowEdge[];
  onNodesChange?: (nodes: FlowNode[]) => void;
  onEdgesChange?: (edges: FlowEdge[]) => void;
  className?: string;
  readOnly?: boolean;
  showGrid?: boolean;
}

/**
 * FlowBuilder - Visual flow/diagram builder component
 * Simple canvas-based flow visualization (can be enhanced with react-flow-renderer)
 */
const FlowBuilder = forwardRef<HTMLDivElement, FlowBuilderProps>(
  (
    {
      nodes = [],
      edges = [],
      onNodesChange,
      onEdgesChange,
      className,
      readOnly = false,
      showGrid = true,
    },
    ref
  ) => {
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleNodeDragStart = (
      e: React.DragEvent<HTMLDivElement>,
      nodeId: string
    ) => {
      if (readOnly) return;
      setDraggedNode(nodeId);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleNodeDragEnd = (
      e: React.DragEvent<HTMLDivElement>,
      nodeId: string
    ) => {
      e.preventDefault();
      setDraggedNode(null);

      if (readOnly) return;

      const rect = e.currentTarget.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newNodes = nodes.map((node) =>
        node.id === nodeId ? { ...node, position: { x, y } } : node
      );

      onNodesChange?.(newNodes);
    };

    const getNodeColor = (type: string) => {
      switch (type) {
        case 'start':
          return 'bg-success text-success-foreground';
        case 'end':
          return 'bg-danger text-danger-foreground';
        case 'decision':
          return 'bg-warning text-warning-foreground';
        default:
          return 'bg-primary text-primary-foreground';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border border-divider bg-background overflow-hidden',
          className
        )}
        data-slot="flow-builder"
        style={{ minHeight: '400px' }}
      >
        {/* Grid Background */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(100, 100, 100, 0.05) 25%, rgba(100, 100, 100, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 100, 100, 0.05) 75%, rgba(100, 100, 100, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(100, 100, 100, 0.05) 25%, rgba(100, 100, 100, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 100, 100, 0.05) 75%, rgba(100, 100, 100, 0.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        )}

        {/* SVG for Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);

            if (!sourceNode || !targetNode) return null;

            return (
              <g key={edge.id}>
                <line
                  x1={sourceNode.position.x + 50}
                  y1={sourceNode.position.y + 30}
                  x2={targetNode.position.x + 50}
                  y2={targetNode.position.y}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-divider"
                />
                {edge.label && (
                  <text
                    x={(sourceNode.position.x + targetNode.position.x + 100) / 2}
                    y={
                      (sourceNode.position.y + targetNode.position.y + 30) / 2 - 5
                    }
                    fill="currentColor"
                    className="text-muted-foreground text-xs"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="relative w-full h-full">
          {nodes.map((node) => (
            <div
              key={node.id}
              draggable={!readOnly}
              onDragStart={(e) => handleNodeDragStart(e, node.id)}
              onDragEnd={(e) => handleNodeDragEnd(e, node.id)}
              className={cn(
                'absolute w-24 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-opacity',
                getNodeColor(node.type),
                draggedNode === node.id && 'opacity-70',
                !readOnly && 'cursor-move hover:shadow-lg'
              )}
              style={{
                transform: `translate(${node.position.x}px, ${node.position.y}px)`,
              }}
            >
              {node.label}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <p className="text-sm">No nodes yet</p>
          </div>
        )}
      </div>
    );
  }
);

FlowBuilder.displayName = 'FlowBuilder';

export { FlowBuilder, type FlowBuilderProps, type FlowNode, type FlowEdge };
