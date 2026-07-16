"use client";

import type {ReactNode} from "react";
import React, {createContext, useContext} from "react";

interface AppShellContextType {
  navWidth: number;
  navCollapsed: boolean;
}

export const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

interface AppShellProps {
  children: ReactNode;
  className?: string;
  navWidth?: number;
  navCollapsed?: boolean;
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({children, className = "", navWidth = 250, navCollapsed = false}, ref) => {
    const contextValue: AppShellContextType = {
      navWidth,
      navCollapsed,
    };

    return (
      <AppShellContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`flex h-screen w-full overflow-hidden bg-background ${className}`}
          data-component="app-shell"
        >
          {children}
        </div>
      </AppShellContext.Provider>
    );
  },
);

AppShell.displayName = "AppShell";

interface AppShellNavProps {
  children: ReactNode;
  className?: string;
  position?: "left" | "right";
}

export const AppShellNav = React.forwardRef<HTMLDivElement, AppShellNavProps>(
  ({children, className = "", position = "left"}, ref) => {
    const context = useContext(AppShellContext);
    const width = context?.navCollapsed ? 60 : context?.navWidth;

    return (
      <nav
        ref={ref}
        className={`flex-shrink-0 overflow-hidden border-r border-divider bg-surface transition-all duration-200 ${position === "right" ? "order-last border-l border-r-0" : ""} ${className}`}
        style={{width: `${width}px`}}
        data-component="app-shell-nav"
      >
        {children}
      </nav>
    );
  },
);

AppShellNav.displayName = "AppShellNav";

interface AppShellMainProps {
  children: ReactNode;
  className?: string;
}

export const AppShellMain = React.forwardRef<HTMLDivElement, AppShellMainProps>(
  ({children, className = ""}, ref) => (
    <div
      ref={ref}
      role="main"
      className={`flex-1 overflow-auto ${className}`}
      data-component="app-shell-main"
    >
      {children}
    </div>
  ),
);

AppShellMain.displayName = "AppShellMain";

interface AppShellHeaderProps {
  children: ReactNode;
  className?: string;
}

export const AppShellHeader = React.forwardRef<HTMLDivElement, AppShellHeaderProps>(
  ({children, className = ""}, ref) => (
    <div
      ref={ref}
      className={`flex-shrink-0 border-b border-divider bg-surface px-4 py-3 ${className}`}
      data-component="app-shell-header"
    >
      {children}
    </div>
  ),
);

AppShellHeader.displayName = "AppShellHeader";

interface AppShellFooterProps {
  children: ReactNode;
  className?: string;
}

export const AppShellFooter = React.forwardRef<HTMLDivElement, AppShellFooterProps>(
  ({children, className = ""}, ref) => (
    <div
      ref={ref}
      className={`flex-shrink-0 border-t border-divider bg-surface px-4 py-3 ${className}`}
      data-component="app-shell-footer"
    >
      {children}
    </div>
  ),
);

AppShellFooter.displayName = "AppShellFooter";

export const useAppShell = () => {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used within an AppShell component");
  }
  return context;
};
