'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface NavigationRailItem {
  id: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
  onClick?: () => void;
}

interface NavigationRailProps {
  items: NavigationRailItem[];
  onItemClick?: (item: NavigationRailItem) => void;
  position?: 'left' | 'right';
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

/**
 * NavigationRail - Vertical navigation rail with icons
 * Compact navigation for applications with many sections
 */
const NavigationRail = forwardRef<HTMLDivElement, NavigationRailProps>(
  ({
    items,
    onItemClick,
    position = 'left',
    className,
    header,
    footer,
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2 border-r border-divider bg-surface py-2 px-3',
          position === 'right' && 'border-l border-r-0',
          className
        )}
        data-slot="navigation-rail"
      >
        {/* Header */}
        {header && (
          <div className="mb-2 flex items-center justify-center rounded-lg p-2">
            {header}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 w-full">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                onItemClick?.(item);
              }}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-colors',
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title={item.label}
              aria-label={item.label}
            >
              <div className="text-xl">{item.icon}</div>

              {/* Badge */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-danger px-1.5 py-0.5 text-xs font-semibold text-danger-foreground">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}

              {/* Label (hidden on mobile, shown on hover) */}
              <span className="text-xs hidden group-hover:block">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        {footer && (
          <div className="mt-auto flex items-center justify-center rounded-lg p-2">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

NavigationRail.displayName = 'NavigationRail';

export { NavigationRail, type NavigationRailProps, type NavigationRailItem };
