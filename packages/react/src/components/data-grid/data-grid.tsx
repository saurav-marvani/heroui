"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {useVirtualizer} from "@tanstack/react-virtual";
import React, {useRef} from "react";

interface DataGridProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  rowHeight?: number;
  overscan?: number;
  onRowClick?: (row: T) => void;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}

export const DataGrid = React.forwardRef<
  HTMLDivElement,
  DataGridProps<any>
>(
  (
    {
      columns,
      data,
      className = "",
      rowHeight = 40,
      overscan = 10,
      onRowClick,
      enableSorting = true,
      enableFiltering = true,
    },
    ref,
  ) => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
      getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    });

    const {rows} = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => tableContainerRef.current,
      estimateSize: () => rowHeight,
      overscan,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom =
      virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg overflow-hidden bg-surface ${className}`}
        data-component="data-grid"
      >
        <div ref={tableContainerRef} className="h-96 overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-surface-secondary border-b border-divider z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-divider">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left font-semibold text-foreground"
                      style={{width: header.getSize()}}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{height: `${paddingTop}px`}} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                if (!row) return null;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className="border-b border-divider hover:bg-surface-secondary transition-colors cursor-pointer"
                    style={{height: `${rowHeight}px`}}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-2"
                        style={{width: cell.column.getSize()}}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{height: `${paddingBottom}px`}} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

DataGrid.displayName = "DataGrid";
