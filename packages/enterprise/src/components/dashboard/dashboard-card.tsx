'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface DashboardCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'elevated';
  clickable?: boolean;
  onClick?: () => void;
  loading?: boolean;
  error?: string;
}

/**
 * DashboardCard - Reusable card component for dashboard content
 */
const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  (
    {
      title,
      description,
      children,
      footer,
      header,
      className,
      variant = 'default',
      clickable = false,
      onClick,
      loading = false,
      error,
    },
    ref
  ) => {
    const variantStyles = {
      default: 'border border-divider bg-background',
      minimal: 'border-b border-divider bg-transparent',
      elevated: 'border border-divider shadow-lg bg-background',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all',
          variantStyles[variant],
          clickable && 'cursor-pointer hover:shadow-md',
          error && 'border-danger',
          className
        )}
        onClick={onClick}
        data-slot="dashboard-card"
      >
        {/* Header */}
        {(title || header) && (
          <div className="px-4 py-3 border-b border-divider">
            {header ? (
              header
            ) : (
              <div>
                {title && <h3 className="font-semibold text-foreground">{title}</h3>}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="text-sm text-danger bg-danger/10 p-3 rounded">
              {error}
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-4 py-3 border-t border-divider bg-muted/20 text-sm">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

DashboardCard.displayName = 'DashboardCard';

export { DashboardCard, type DashboardCardProps };
