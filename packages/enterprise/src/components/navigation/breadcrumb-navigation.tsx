'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  className?: string;
  onNavigate?: (item: BreadcrumbItem) => void;
}

/**
 * BreadcrumbNavigation - Navigation breadcrumb component
 * Shows hierarchical navigation path with optional icons
 */
const BreadcrumbNavigation = forwardRef<
  HTMLNavElement,
  BreadcrumbNavigationProps
>(
  (
    {
      items,
      separator = '/',
      maxItems = 5,
      className,
      onNavigate,
    },
    ref
  ) => {
    // If more items than max, show first and last few items with ellipsis
    const displayItems =
      items.length > maxItems
        ? [
            items[0],
            { label: '...', disabled: true },
            ...items.slice(-(maxItems - 2)),
          ]
        : items;

    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        data-slot="breadcrumb"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2">
          {displayItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.icon && (
                <span className="inline-flex text-sm text-muted-foreground">
                  {item.icon}
                </span>
              )}

              {item.href || item.onClick ? (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                      onNavigate?.(item);
                    }
                  }}
                  className="text-sm text-foreground transition-colors hover:text-primary hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'text-sm',
                    item.label === '...'
                      ? 'text-muted-foreground'
                      : 'text-foreground'
                  )}
                >
                  {item.label}
                </span>
              )}

              {index < displayItems.length - 1 && (
                <span className="text-muted-foreground">{separator}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

BreadcrumbNavigation.displayName = 'BreadcrumbNavigation';

export { BreadcrumbNavigation, type BreadcrumbNavigationProps, type BreadcrumbItem };
