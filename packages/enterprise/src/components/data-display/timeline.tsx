'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  content?: ReactNode;
  status?: 'completed' | 'pending' | 'failed';
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  onItemClick?: (item: TimelineItem) => void;
}

/**
 * Timeline - Visual timeline component for events and milestones
 */
const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({
    items,
    orientation = 'vertical',
    className,
    onItemClick,
  }, ref) => {
    const getStatusColor = (status?: string) => {
      switch (status) {
        case 'completed':
          return 'bg-success text-success-foreground';
        case 'failed':
          return 'bg-danger text-danger-foreground';
        case 'pending':
          return 'bg-warning text-warning-foreground';
        default:
          return 'bg-primary text-primary-foreground';
      }
    };

    if (orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex gap-4 overflow-x-auto pb-4',
            className
          )}
          data-slot="timeline"
        >
          {items.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center flex-shrink-0 w-48">
              {/* Timeline node */}
              <button
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110',
                  getStatusColor(item.status),
                  onItemClick && 'cursor-pointer'
                )}
              >
                {item.icon || index + 1}
              </button>

              {/* Connector */}
              {index < items.length - 1 && (
                <div className="w-0.5 h-8 bg-divider my-2" />
              )}

              {/* Content */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">{item.date}</p>
                <h3 className="font-semibold text-sm mt-1">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </div>

              {item.content && (
                <div className="mt-3 w-full p-2 rounded border border-divider bg-muted/20">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Vertical timeline
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-0', className)}
        data-slot="timeline"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-4 pb-8 relative"
            onClick={() => onItemClick?.(item)}
          >
            {/* Timeline track */}
            <div className="flex flex-col items-center">
              {/* Node */}
              <button
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 relative z-10',
                  getStatusColor(item.status),
                  onItemClick && 'cursor-pointer'
                )}
              >
                {item.icon}
              </button>

              {/* Connector */}
              {index < items.length - 1 && (
                <div className="w-0.5 flex-1 bg-divider my-2 min-h-16" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <p className="text-xs text-muted-foreground">{item.date}</p>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
              {item.content && (
                <div className="mt-3 p-3 rounded border border-divider bg-muted/20">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

export { Timeline, type TimelineProps, type TimelineItem };
