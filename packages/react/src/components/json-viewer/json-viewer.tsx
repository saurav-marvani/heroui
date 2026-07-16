"use client";

import React, {useState} from "react";

export interface JSONViewerProps {
  data: unknown;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  copyable?: boolean;
  searchable?: boolean;
}

interface JSONNodeProps {
  data: unknown;
  path?: string;
  depth?: number;
  maxDepth?: number;
}

const JSONNode: React.FC<JSONNodeProps> = ({data, path = "root", depth = 0, maxDepth = 10}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  if (data === null) {
    return <span className="text-error">null</span>;
  }

  if (typeof data === "boolean") {
    return <span className="text-primary">{String(data)}</span>;
  }

  if (typeof data === "number") {
    return <span className="text-success">{data}</span>;
  }

  if (typeof data === "string") {
    return <span className="text-warning">&quot;{data}&quot;</span>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="text-foreground">[]</span>;
    }

    const isLongArray = data.length > 5;
    const displayItems = isLongArray && !isExpanded ? data.slice(0, 3) : data;

    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-foreground hover:text-primary cursor-pointer font-mono"
        >
          {isExpanded ? "▼" : "▶"} [
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-divider pl-3">
            {displayItems.map((item, index) => (
              <div key={index} className="py-1">
                <span className="text-foreground-secondary">{index}:</span>{" "}
                <JSONNode data={item} path={`${path}[${index}]`} depth={depth + 1} maxDepth={maxDepth} />
                {index < displayItems.length - 1 && <span className="text-foreground-secondary">,</span>}
              </div>
            ))}
            {isLongArray && !isExpanded && (
              <div className="text-foreground-tertiary text-sm">... {data.length - 3} more items</div>
            )}
          </div>
        )}
        <span className="text-foreground">]</span>
      </div>
    );
  }

  if (typeof data === "object") {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span className="text-foreground">{"{}"}</span>;
    }

    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-foreground hover:text-primary cursor-pointer font-mono"
        >
          {isExpanded ? "▼" : "▶"} {"{"}
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-divider pl-3">
            {entries.map(([key, value], index) => (
              <div key={key} className="py-1">
                <span className="text-info">&quot;{key}&quot;</span>
                <span className="text-foreground-secondary">: </span>
                <JSONNode data={value} path={`${path}.${key}`} depth={depth + 1} maxDepth={maxDepth} />
                {index < entries.length - 1 && <span className="text-foreground-secondary">,</span>}
              </div>
            ))}
          </div>
        )}
        <span className="text-foreground">{"}"}</span>
      </div>
    );
  }

  return <span className="text-foreground">{String(data)}</span>;
};

export const JSONViewer = React.forwardRef<HTMLDivElement, JSONViewerProps>(
  ({data, className = "", collapsible = true, copyable = true}, ref) => {
    const handleCopy = () => {
      const text = JSON.stringify(data, null, 2);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
    };

    return (
      <div
        ref={ref}
        className={`w-full bg-background rounded border border-divider p-4 font-mono text-sm ${className}`}
      >
        {copyable && (
          <div className="mb-3 flex justify-end">
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-xs bg-surface-secondary text-foreground rounded hover:bg-surface-tertiary transition-colors"
            >
              Copy JSON
            </button>
          </div>
        )}
        <div className="text-foreground space-y-1 overflow-auto max-h-96">
          {collapsible ? (
            <JSONNode data={data} />
          ) : (
            <pre className="text-foreground-secondary whitespace-pre-wrap break-words">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  },
);

JSONViewer.displayName = "JSONViewer";
