export interface JSONViewerProps {
  data: unknown;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  copyable?: boolean;
  searchable?: boolean;
  maxDepth?: number;
  theme?: "light" | "dark";
}

export interface JSONNodeProps {
  data: unknown;
  path?: string;
  depth?: number;
  maxDepth?: number;
  onCopy?: (text: string) => void;
}
