'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils';

interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  width?: number | string;
  sortable?: boolean;
  resizable?: boolean;
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
 * VirtualizedTable - High-performance table with virtual scrolling
 * Only renders visible rows to handle large datasets efficiently
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
    ref
  ) => {
    const [scrollTop, setScrollTop] = React.useState(0);

    const visibleRange = useMemo(() => {
      const startIndex = Math.floor(scrollTop / rowHeight);
      const visibleRows = Math.ceil(containerHeight / rowHeight);
      const endIndex = Math.min(startIndex + visibleRows + 1, data.length);

      return { startIndex, endIndex, visibleRows };
    }, [scrollTop, rowHeight, containerHeight, data.length]);

    const visibleRows = data.slice(visibleRange.startIndex, visibleRange.endIndex);

    const totalHeight = data.length * rowHeight;
    const offsetY = visibleRange.startIndex * rowHeight;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col border border-divider rounded-lg overflow-hidden', className)}
        data-slot="virtualized-table"
      >
        {/* Header */}
        <div className="flex bg-muted border-b border-divider sticky top-0 z-10">
          {columns.map((column) => (
            <div
              key={column.id}
              className={cn(
                'px-4 py-2 font-semibold text-sm text-foreground flex-shrink-0',
                column.className
              )}
              style={{ width: column.width || 'auto', minWidth: 100 }}
            >
              {column.header}
            </div>
          ))}
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto relative"
          style={{ height: containerHeight }}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleRows.map((row, index) => {
                  const absoluteIndex = visibleRange.startIndex + index;
                  const isEven = absoluteIndex % 2 === 0;

                  return (
                    <div
                      key={keyExtractor(row, absoluteIndex)}
                      className={cn(
                        'flex border-b border-divider last:border-b-0 transition-colors',
                        striped && isEven && 'bg-muted/30',
                        hover && 'hover:bg-hover cursor-pointer',
                        onRowClick && 'cursor-pointer'
                      )}
                      style={{ height: rowHeight }}
                      onClick={() => onRowClick?.(row, absoluteIndex)}
                    >
                      {columns.map((column) => (
                        <div
                          key={column.id}
                          className={cn(
                            'flex items-center px-4 py-2 text-sm text-foreground overflow-hidden flex-shrink-0',
                            column.className
                          )}
                          style={{ width: column.width || 'auto', minWidth: 100 }}
                        >
                          <div className="truncate">
                            {column.accessor(row)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-divider px-4 py-2 text-xs text-muted-foreground bg-muted/20">
          <span>{data.length} rows</span>
          <span>Scroll to load more</span>
        </div>
      </div>
    );
  }
);

VirtualizedTable.displayName = 'VirtualizedTable';

export { VirtualizedTable, type VirtualizedTableProps, type Column };
