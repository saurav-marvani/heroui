'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../../utils';

interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  width?: number | string;
  sortable?: boolean;
  className?: string;
}

interface VirtualizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowHeight?: number;
  containerHeight?: number;
  keyExtractor: (row: T, index: number) => string | number;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
  striped?: boolean;
  hover?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

/**
 * VirtualizedTable - High-performance table with @tanstack/react-virtual
 * Renders only visible rows to efficiently handle large datasets (1000s of rows)
 */
const VirtualizedTable = forwardRef<
  HTMLDivElement,
  VirtualizedTableProps<unknown>
>(
  (
    {
      data,
      columns,
      rowHeight = 40,
      containerHeight = 400,
      keyExtractor,
      className,
      onRowClick,
      striped = true,
      hover = true,
      loading = false,
      emptyMessage = 'No data available',
    },
    ref,
  ) => {
    const parentRef = React.useRef<HTMLDivElement>(null);

    // Initialize virtualizer with tanstack/react-virtual
    const virtualizer = useVirtualizer({
      count: data.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => rowHeight,
      overscan: 10, // Render 10 items outside visible range
    });

    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();

    // Calculate offset for virtual items
    const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
    const paddingBottom =
      virtualItems.length > 0
        ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
        : 0;

    if (loading) {
      return (
        <div className={cn('w-full animate-pulse', className)}>
          <div className="h-10 bg-gray-200 rounded mb-2" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden rounded-lg border', className)}
      >
        {/* Table Header */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex w-full">
            {columns.map((column) => (
              <div
                key={column.id}
                style={{
                  width: column.width || 'auto',
                  flex: column.width ? 'none' : 1,
                }}
                className="px-4 py-3 text-sm font-semibold text-foreground"
              >
                {column.header}
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Scrolling Container */}
        <div
          ref={parentRef}
          style={{
            height: `${containerHeight}px`,
            overflow: 'auto',
          }}
          className="relative"
        >
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <div
              style={{
                height: `${totalSize}px`,
              }}
            >
              {/* Top padding */}
              {paddingTop > 0 && (
                <div style={{ height: paddingTop }} />
              )}

              {/* Rendered items */}
              {virtualItems.map((virtualItem) => {
                const row = data[virtualItem.index];
                const key = keyExtractor(row, virtualItem.index);

                return (
                  <div
                    key={key}
                    data-index={virtualItem.index}
                    style={{
                      height: `${rowHeight}px`,
                      transform: `translateY(${virtualItem.start - paddingTop}px)`,
                    }}
                    className={cn(
                      'flex w-full border-b transition-colors',
                      striped && virtualItem.index % 2 === 0 && 'bg-muted/30',
                      hover && 'hover:bg-muted/50 cursor-pointer',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row, virtualItem.index)}
                  >
                    {columns.map((column) => (
                      <div
                        key={`${key}-${column.id}`}
                        style={{
                          width: column.width || 'auto',
                          flex: column.width ? 'none' : 1,
                        }}
                        className={cn(
                          'px-4 py-3 text-sm flex items-center overflow-hidden',
                          column.className,
                        )}
                      >
                        <span className="truncate">
                          {column.accessor(row)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Bottom padding */}
              {paddingBottom > 0 && (
                <div style={{ height: paddingBottom }} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

VirtualizedTable.displayName = 'VirtualizedTable';

export type { Column, VirtualizedTableProps };
export { VirtualizedTable };
