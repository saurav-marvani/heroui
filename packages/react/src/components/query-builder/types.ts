export interface QueryField {
  name: string;
  type: "string" | "number" | "boolean" | "date";
  operators?: string[];
}

export interface QueryCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface Query {
  conditions: QueryCondition[];
  logic?: "AND" | "OR";
  limit?: number;
  offset?: number;
}

export interface QueryBuilderProps {
  fields: QueryField[];
  initialQuery?: Query;
  onQueryChange: (query: Query) => void;
  readOnly?: boolean;
  className?: string;
}
