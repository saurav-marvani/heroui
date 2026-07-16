import type {ReactNode} from "react";

export interface SplitViewProps {
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  defaultSizes?: number[];
  onResize?: (sizes: number[]) => void;
}

export interface SplitPaneProps {
  children: ReactNode;
  className?: string;
  minSize?: number;
}
