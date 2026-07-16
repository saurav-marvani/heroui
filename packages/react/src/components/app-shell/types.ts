import type {ReactNode} from "react";

export interface AppShellProps {
  children: ReactNode;
  className?: string;
  navWidth?: number;
  navCollapsed?: boolean;
}

export interface AppShellNavProps {
  children: ReactNode;
  className?: string;
  position?: "left" | "right";
}

export interface AppShellMainProps {
  children: ReactNode;
  className?: string;
}

export interface AppShellHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface AppShellFooterProps {
  children: ReactNode;
  className?: string;
}
