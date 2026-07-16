'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface DashboardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
  layout?: 'sidebar-left' | 'sidebar-right' | 'top-nav' | 'full-width';
  compact?: boolean;
}

/**
 * DashboardLayout - Main dashboard container layout
 * Supports multiple layout configurations for different dashboard types
 */
const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({
    children,
    header,
    sidebar,
    className,
    layout = 'sidebar-left',
    compact = false,
  }, ref) => {
    const isSidebarLayout = layout.includes('sidebar');
    const sidebarPosition = layout === 'sidebar-right' ? 'right' : 'left';

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-screen bg-background',
          layout === 'top-nav' && 'flex-col',
          className
        )}
        data-slot="dashboard-layout"
      >
        {/* Top Navigation */}
        {(layout === 'top-nav' || header) && (
          <header
            className={cn(
              'border-b border-divider bg-surface',
              compact ? 'px-4 py-2' : 'px-6 py-3'
            )}
          >
            {header}
          </header>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          {isSidebarLayout && sidebarPosition === 'left' && sidebar && (
            <aside className="w-64 border-r border-divider bg-surface overflow-y-auto">
              {sidebar}
            </aside>
          )}

          {/* Content */}
          <main className="flex-1 overflow-auto">
            <div className={compact ? 'p-4' : 'p-6'}>
              {children}
            </div>
          </main>

          {/* Right Sidebar */}
          {isSidebarLayout && sidebarPosition === 'right' && sidebar && (
            <aside className="w-64 border-l border-divider bg-surface overflow-y-auto">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout, type DashboardLayoutProps };
