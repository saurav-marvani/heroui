export interface PropertyValue {
  value: unknown;
  type?: "string" | "number" | "boolean" | "date" | "color" | "object" | "array";
  readonly?: boolean;
  description?: string;
  editable?: boolean;
  options?: Array<{label: string; value: unknown}>;
}

export interface PropertyGridProps {
  properties: Record<string, PropertyValue>;
  onPropertyChange?: (key: string, value: unknown) => void;
  categories?: Record<string, string[]>;
  className?: string;
  searchable?: boolean;
  groupByCategory?: boolean;
  readonly?: boolean;
}
