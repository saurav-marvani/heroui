'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface JSONViewerProps {
  data: unknown;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  indent?: number;
  onItemClick?: (path: string[], value: unknown) => void;
}

/**
 * JSONViewer - Hierarchical JSON data viewer with expand/collapse
 * Displays JSON data in a readable tree format
 */
const JSONViewer = forwardRef<HTMLDivElement, JSONViewerProps>(
  ({
    data,
    className,
    collapsible = true,
    defaultExpanded = false,
    indent = 2,
    onItemClick,
  }, ref) => {
    const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
      defaultExpanded ? new Set() : new Set()
    );

    const togglePath = (path: string) => {
      const newExpanded = new Set(expandedPaths);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      setExpandedPaths(newExpanded);
    };

    const renderValue = (
      value: unknown,
      path: string[] = [],
      level: number = 0
    ): ReactNode => {
      const pathStr = path.join('.');

      if (value === null) {
        return <span className="text-muted-foreground">null</span>;
      }

      if (typeof value === 'boolean') {
        return <span className="text-warning">{String(value)}</span>;
      }

      if (typeof value === 'number') {
        return <span className="text-success">{value}</span>;
      }

      if (typeof value === 'string') {
        return <span className="text-danger">"{value}"</span>;
      }

      if (Array.isArray(value)) {
        const isExpanded = expandedPaths.has(pathStr);

        return (
          <div>
            <button
              onClick={() => {
                togglePath(pathStr);
                onItemClick?.(path, value);
              }}
              className="text-foreground hover:text-primary font-mono text-sm"
            >
              {collapsible ? (isExpanded ? '▼' : '▶') : ''} [
            </button>
            {isExpanded && (
              <div style={{ marginLeft: `${indent}px` }}>
                {value.map((item, index) => (
                  <div key={index} className="font-mono text-sm">
                    <span className="text-muted-foreground">{index}: </span>
                    {renderValue(item, [...path, `[${index}]`], level + 1)}
                    {index < value.length - 1 && (
                      <span className="text-muted-foreground">,</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <span className="text-foreground font-mono">]</span>
          </div>
        );
      }

      if (typeof value === 'object' && value !== null) {
        const isExpanded = expandedPaths.has(pathStr);
        const entries = Object.entries(value);

        return (
          <div>
            <button
              onClick={() => {
                togglePath(pathStr);
                onItemClick?.(path, value);
              }}
              className="text-foreground hover:text-primary font-mono text-sm"
            >
              {collapsible ? (isExpanded ? '▼' : '▶') : ''} {'{ '}
            </button>
            {isExpanded && (
              <div style={{ marginLeft: `${indent}px` }}>
                {entries.map(([key, val], index) => (
                  <div key={key} className="font-mono text-sm">
                    <span className="text-primary">"{key}"</span>
                    <span className="text-muted-foreground">: </span>
                    {renderValue(val, [...path, key], level + 1)}
                    {index < entries.length - 1 && (
                      <span className="text-muted-foreground">,</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <span className="text-foreground font-mono">{' }'}</span>
          </div>
        );
      }

      return <span className="text-foreground">{String(value)}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-divider bg-background p-4 font-mono text-sm overflow-auto max-h-96',
          className
        )}
        data-slot="json-viewer"
      >
        {renderValue(data)}
      </div>
    );
  }
);

JSONViewer.displayName = 'JSONViewer';

export { JSONViewer, type JSONViewerProps };
