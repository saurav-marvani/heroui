'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState, useMemo } from 'react';
import { cn } from '../../utils';

interface VirtualScrollerProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  containerHeight?: number;
  overscan?: number;
  keyExtractor?: (item: T, index: number) => string | number;
}

/**
 * VirtualScroller - High-performance virtual scrolling for large lists
 * Only renders visible items plus overscan for smooth scrolling
 */
const VirtualScroller = forwardRef<HTMLDivElement, VirtualScrollerProps<unknown>>(
  (
    {
      items,
      itemHeight,
      renderItem,
      className,
      containerHeight = 400,
      overscan = 3,
      keyExtractor,
    },
    ref
  ) => {
    const [scrollTop, setScrollTop] = useState(0);

    const { startIndex, endIndex, totalHeight, offsetY, visibleItems } = useMemo(() => {
      const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const endIdx = Math.min(
        items.length,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
      );

      const total = items.length * itemHeight;
      const offset = startIdx * itemHeight;
      const visible = items.slice(startIdx, endIdx);

      return {
        startIndex: startIdx,
        endIndex: endIdx,
        totalHeight: total,
        offsetY: offset,
        visibleItems: visible,
      };
    }, [scrollTop, itemHeight, containerHeight, overscan, items]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-y-auto rounded-lg border border-divider bg-background',
          className
        )}
        style={{ height: containerHeight }}
        onScroll={handleScroll}
        data-slot="virtual-scroller"
      >
        {/* Spacer container */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Visible items wrapper */}
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              willChange: 'transform',
            }}
          >
            {visibleItems.map((item, index) => (
              <div
                key={
                  keyExtractor
                    ? keyExtractor(item, startIndex + index)
                    : `${startIndex + index}`
                }
                style={{ height: itemHeight }}
                className="overflow-hidden"
              >
                {renderItem(item, startIndex + index)}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No items
          </div>
        )}
      </div>
    );
  }
);

VirtualScroller.displayName = 'VirtualScroller';

export { VirtualScroller, type VirtualScrollerProps };
