import type {ColumnDef} from "@tanstack/react-table";

export interface DataGridProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  rowHeight?: number;
  overscan?: number;
  onRowClick?: (row: T) => void;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}
