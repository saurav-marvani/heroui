"use client";

import React, {useState} from "react";

interface QueryField {
  name: string;
  type: "string" | "number" | "boolean" | "date";
  operators?: string[];
}

interface QueryCondition {
  field: string;
  operator: string;
  value: unknown;
}

interface Query {
  conditions: QueryCondition[];
  logic?: "AND" | "OR";
  limit?: number;
  offset?: number;
}

interface QueryBuilderProps {
  fields: QueryField[];
  initialQuery?: Query;
  onQueryChange: (query: Query) => void;
  readOnly?: boolean;
  className?: string;
}

const DEFAULT_OPERATORS = {
  string: ["equals", "contains", "startsWith", "endsWith"],
  number: ["equals", "greaterThan", "lessThan", "between"],
  boolean: ["equals"],
  date: ["equals", "after", "before", "between"],
};

export const QueryBuilder = React.forwardRef<HTMLDivElement, QueryBuilderProps>(
  ({fields, initialQuery, onQueryChange, readOnly = false, className = ""}, ref) => {
    const [query, setQuery] = useState<Query>(
      initialQuery || {conditions: [{field: fields[0]?.name || "", operator: "equals", value: ""}], logic: "AND"},
    );

    const handleAddCondition = () => {
      if (readOnly) return;
      const newQuery = {
        ...query,
        conditions: [...query.conditions, {field: fields[0]?.name || "", operator: "equals", value: ""}],
      };
      setQuery(newQuery);
      onQueryChange(newQuery);
    };

    const handleRemoveCondition = (index: number) => {
      if (readOnly) return;
      const newQuery = {
        ...query,
        conditions: query.conditions.filter((_, i) => i !== index),
      };
      setQuery(newQuery);
      onQueryChange(newQuery);
    };

    const handleConditionChange = (index: number, field: keyof QueryCondition, value: unknown) => {
      if (readOnly) return;
      const newConditions = [...query.conditions];
      newConditions[index] = {...newConditions[index], [field]: value};
      const newQuery = {...query, conditions: newConditions};
      setQuery(newQuery);
      onQueryChange(newQuery);
    };

    const getOperators = (fieldName: string) => {
      const field = fields.find((f) => f.name === fieldName);
      if (!field) return [];
      return field.operators || DEFAULT_OPERATORS[field.type] || ["equals"];
    };

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg p-4 bg-background ${className}`}
        data-component="query-builder"
      >
        <div className="space-y-3">
          {/* Conditions */}
          {query.conditions.map((condition, index) => (
            <div key={index} className="flex gap-2 items-end">
              <select
                value={condition.field}
                onChange={(e) => handleConditionChange(index, "field", e.target.value)}
                disabled={readOnly}
                className="flex-1 px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
              >
                {fields.map((field) => (
                  <option key={field.name} value={field.name}>
                    {field.name}
                  </option>
                ))}
              </select>

              <select
                value={condition.operator}
                onChange={(e) => handleConditionChange(index, "operator", e.target.value)}
                disabled={readOnly}
                className="px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
              >
                {getOperators(condition.field).map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={String(condition.value)}
                onChange={(e) => handleConditionChange(index, "value", e.target.value)}
                disabled={readOnly}
                className="flex-1 px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
                placeholder="Value"
              />

              <button
                type="button"
                onClick={() => handleRemoveCondition(index)}
                disabled={readOnly}
                className="px-2 py-1 text-sm bg-error text-error-foreground rounded hover:bg-error/90 transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Logic & Controls */}
          <div className="flex gap-2 pt-2">
            <select
              value={query.logic || "AND"}
              onChange={(e) => {
                const newQuery = {...query, logic: e.target.value as "AND" | "OR"};
                setQuery(newQuery);
                onQueryChange(newQuery);
              }}
              disabled={readOnly || query.conditions.length < 2}
              className="px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>

            <button
              type="button"
              onClick={handleAddCondition}
              disabled={readOnly}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Add Condition
            </button>
          </div>

          {/* Limit & Offset */}
          <div className="flex gap-2 pt-2 border-t border-divider">
            <div className="flex-1">
              <label className="text-xs text-foreground-secondary">Limit</label>
              <input
                type="number"
                value={query.limit || ""}
                onChange={(e) => {
                  const newQuery = {...query, limit: e.target.value ? Number(e.target.value) : undefined};
                  setQuery(newQuery);
                  onQueryChange(newQuery);
                }}
                disabled={readOnly}
                className="w-full px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
                placeholder="No limit"
              />
            </div>

            <div className="flex-1">
              <label className="text-xs text-foreground-secondary">Offset</label>
              <input
                type="number"
                value={query.offset || ""}
                onChange={(e) => {
                  const newQuery = {...query, offset: e.target.value ? Number(e.target.value) : undefined};
                  setQuery(newQuery);
                  onQueryChange(newQuery);
                }}
                disabled={readOnly}
                className="w-full px-2 py-1 border border-divider rounded text-sm bg-background text-foreground"
                placeholder="0"
              />
            </div>
          </div>

          {/* Query Preview */}
          <div className="mt-3 p-3 bg-surface-secondary rounded text-xs font-mono text-foreground-secondary overflow-auto max-h-32">
            <div>WHERE {query.conditions.map((c) => `${c.field} ${c.operator} ${c.value}`).join(` ${query.logic} `)}</div>
            {query.limit && <div>LIMIT {query.limit}</div>}
            {query.offset && <div>OFFSET {query.offset}</div>}
          </div>
        </div>
      </div>
    );
  },
);

QueryBuilder.displayName = "QueryBuilder";
