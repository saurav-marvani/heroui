import type {ReactNode} from "react";

export interface TimelineItem {
  id: string | number;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
  status?: "pending" | "completed" | "active" | "error";
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: "vertical" | "horizontal";
  showConnector?: boolean;
  renderItem?: (item: TimelineItem, index: number) => ReactNode;
}

export interface TimelineItemProps {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
  status?: "pending" | "completed" | "active" | "error";
  className?: string;
}
