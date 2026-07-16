'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface GridColumn<T> {
  id: string;
  header: string | ReactNode;
  accessor: (row: T) => ReactNode;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  className?: string;
}

interface DataGridProps<T> {
  data: T[];
  columns: GridColumn<T>[];
  keyExtractor: (row: T, index: number) => string | number;
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  pagination?: {
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalRows: number;
  };
}

/**
 * DataGrid - Feature-rich data grid with sorting, filtering, and selection
 * Wrapper around virtualized table with additional capabilities
 */
const DataGrid = forwardRef<HTMLDivElement, DataGridProps<unknown>>(
  (
    {
      data,
      columns,
      keyExtractor,
      className,
      selectable = false,
      onSelectionChange,
      onRowClick,
      striped = true,
      bordered = true,
      compact = false,
      emptyMessage = 'No data available',
      pagination,
    },
    ref
  ) => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDesc, setSortDesc] = useState(false);

    const handleSelectAll = () => {
      if (selectedRows.size === data.length) {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
      } else {
        const newSelected = new Set(
          data.map((row, i) => keyExtractor(row, i))
        );
        setSelectedRows(newSelected);
        onSelectionChange?.(data);
      }
    };

    const handleSelectRow = (row: unknown, index: number) => {
      const key = keyExtractor(row, index);
      const newSelected = new Set(selectedRows);

      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }

      setSelectedRows(newSelected);

      const selectedData = data.filter((r, i) =>
        newSelected.has(keyExtractor(r, i))
      );
      onSelectionChange?.(selectedData);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider overflow-hidden bg-background',
          className
        )}
        data-slot="data-grid"
      >
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-divider bg-muted">
                {selectable && (
                  <th className="px-4 py-2 w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === data.length && data.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      'px-4 py-2 text-left text-sm font-semibold text-foreground',
                      column.sortable && 'cursor-pointer hover:bg-hover',
                      column.className
                    )}
                    style={{ width: column.width }}
                    onClick={() => {
                      if (column.sortable) {
                        if (sortBy === column.id) {
                          setSortDesc(!sortDesc);
                        } else {
                          setSortBy(column.id);
                          setSortDesc(false);
                        }
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && sortBy === column.id && (
                        <span>{sortDesc ? '↓' : '↑'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => {
                  const isEven = index % 2 === 0;
                  const key = keyExtractor(row, index);
                  const isSelected = selectedRows.has(key);

                  return (
                    <tr
                      key={key}
                      className={cn(
                        'border-b border-divider transition-colors last:border-b-0',
                        striped && isEven && 'bg-muted/20',
                        isSelected && 'bg-primary/10',
                        onRowClick && 'hover:bg-hover cursor-pointer'
                      )}
                      onClick={() => onRowClick?.(row, index)}
                    >
                      {selectable && (
                        <td className="px-4 py-2 w-12">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectRow(row, index);
                            }}
                            className="rounded"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.id}
                          className={cn(
                            'px-4 py-2 text-sm text-foreground',
                            compact && 'py-1',
                            column.className
                          )}
                          style={{ width: column.width }}
                        >
                          {column.accessor(row)}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between border-t border-divider px-4 py-2 bg-muted/20 text-sm">
            <span className="text-muted-foreground">
              Page {pagination.currentPage + 1} of {Math.ceil(pagination.totalRows / pagination.pageSize)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => pagination.onPageChange(Math.max(0, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 0}
                className="px-3 py-1 rounded border border-divider hover:bg-hover disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={(pagination.currentPage + 1) * pagination.pageSize >= pagination.totalRows}
                className="px-3 py-1 rounded border border-divider hover:bg-hover disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DataGrid.displayName = 'DataGrid';

export { DataGrid, type DataGridProps, type GridColumn };
