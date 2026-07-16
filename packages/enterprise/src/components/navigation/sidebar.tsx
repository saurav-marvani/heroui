'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { composeTwRenderProps, cn } from '../../utils';

interface SidebarProps {
  children: ReactNode;
  width?: number;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  children?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

interface SidebarGroupProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Sidebar - Collapsible navigation sidebar container
 */
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      width = 256,
      className,
      collapsible,
      defaultCollapsed = false,
      onCollapsedChange,
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const handleCollapse = () => {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      onCollapsedChange?.(newState);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col bg-surface h-full transition-all duration-300',
          isCollapsed ? 'w-16' : `w-[${width}px]`,
          className
        )}
        style={{ width: isCollapsed ? 64 : width }}
        data-slot="sidebar"
      >
        <div className="flex-1 overflow-y-auto">{children}</div>

        {collapsible && (
          <button
            onClick={handleCollapse}
            className="flex items-center justify-center border-t border-divider p-2 hover:bg-hover"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="text-lg">{isCollapsed ? '→' : '←'}</span>
          </button>
        )}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

/**
 * SidebarItem - Individual sidebar navigation item
 */
const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({
    icon,
    label,
    children,
    active = false,
    disabled = false,
    className,
    onClick,
  }) => {
    return (
      <button
        className={cn(
          'flex w-full items-center gap-3 px-4 py-2 text-left transition-colors',
          active
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-hover',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={disabled}
        onClick={onClick}
        data-slot="sidebar-item"
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1 truncate">{label}</span>
        {children}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

/**
 * SidebarGroup - Grouped sidebar items with optional label
 */
const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, children, className }) => {
    return (
      <div className={cn('py-2', className)} data-slot="sidebar-group">
        {label && (
          <div className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">
            {label}
          </div>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    );
  }
);

SidebarGroup.displayName = 'SidebarGroup';

export {
  Sidebar,
  SidebarItem,
  SidebarGroup,
  type SidebarProps,
  type SidebarItemProps,
  type SidebarGroupProps,
};
