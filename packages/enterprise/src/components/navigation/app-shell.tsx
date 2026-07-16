'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { composeTwRenderProps, cn } from '../../utils';

interface AppShellProps {
  children: ReactNode;
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
  sidebarPosition?: 'left' | 'right';
  navbarPosition?: 'top' | 'sticky';
}

/**
 * AppShell - Main layout container for enterprise applications
 * Combines navbar, sidebar, and main content area with responsive design
 */
const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      children,
      navbar,
      sidebar,
      footer,
      className,
      sidebarPosition = 'left',
      navbarPosition = 'top',
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex h-screen flex-col bg-background', className)}
        data-slot="app-shell"
      >
        {/* Navbar */}
        {navbar && (
          <nav
            className={composeTwRenderProps(
              '',
              navbarPosition === 'sticky' ? 'sticky top-0 z-40' : 'relative',
              'border-b border-divider bg-background'
            )}
            data-slot="navbar"
          >
            {navbar}
          </nav>
        )}

        {/* Main content with sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          {sidebar && sidebarPosition === 'left' && (
            <aside
              className="border-r border-divider bg-background"
              data-slot="sidebar"
            >
              {sidebar}
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto" data-slot="main">
            {children}
          </main>

          {/* Right Sidebar */}
          {sidebar && sidebarPosition === 'right' && (
            <aside
              className="border-l border-divider bg-background"
              data-slot="sidebar"
            >
              {sidebar}
            </aside>
          )}
        </div>

        {/* Footer */}
        {footer && (
          <footer
            className="border-t border-divider bg-background"
            data-slot="footer"
          >
            {footer}
          </footer>
        )}
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';

export { AppShell, type AppShellProps };
