"use client";

import React, {useState} from "react";
import type {PropertyValue, PropertyGridProps} from "./types";

interface PropertyItemProps {
  name: string;
  property: PropertyValue;
  onChange?: (value: unknown) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({name, property, onChange}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderValue = () => {
    if (property.type === "boolean") {
      return (
        <input
          type="checkbox"
          checked={Boolean(property.value)}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={property.readonly}
          className="w-4 h-4 cursor-pointer"
        />
      );
    }

    if (property.type === "color") {
      return (
        <input
          type="color"
          value={String(property.value) || "#000000"}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={property.readonly}
          className="w-10 h-10 cursor-pointer border border-divider rounded"
        />
      );
    }

    if (property.type === "date") {
      return (
        <input
          type="date"
          value={String(property.value) || ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={property.readonly}
          className="px-2 py-1 border border-divider rounded text-sm"
        />
      );
    }

    if (property.type === "object" && typeof property.value === "object") {
      return (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-2 py-1 bg-surface-secondary text-foreground rounded text-sm hover:bg-surface-tertiary transition-colors"
        >
          {isExpanded ? "▼" : "▶"} {typeof property.value}
        </button>
      );
    }

    return (
      <input
        type={property.type === "number" ? "number" : "text"}
        value={String(property.value) || ""}
        onChange={(e) => onChange?.(property.type === "number" ? parseFloat(e.target.value) : e.target.value)}
        disabled={property.readonly}
        className="px-2 py-1 border border-divider rounded text-sm w-full"
      />
    );
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 py-2 px-3 border-b border-divider hover:bg-surface-secondary transition-colors">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">{name}</div>
          {property.description && (
            <div className="text-xs text-foreground-secondary truncate">{property.description}</div>
          )}
        </div>
        <div className="flex-1 flex justify-end">{renderValue()}</div>
      </div>

      {isExpanded && property.type === "object" && typeof property.value === "object" && (
        <PropertyGrid
          properties={Object.entries(property.value as Record<string, unknown>).reduce(
            (acc, [key, val]) => ({
              ...acc,
              [key]: {
                value: val,
                type: typeof val === "string" ? "string" : typeof val === "number" ? "number" : "object",
              },
            }),
            {},
          )}
          className="ml-4"
        />
      )}
    </>
  );
};

export const PropertyGrid = React.forwardRef<HTMLDivElement, PropertyGridProps>(
  ({properties, onPropertyChange, className = "", searchable = true}, ref) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProperties = searchQuery
      ? Object.entries(properties).filter(([key]) => key.toLowerCase().includes(searchQuery.toLowerCase()))
      : Object.entries(properties);

    return (
      <div ref={ref} className={`w-full bg-background rounded border border-divider ${className}`}>
        {searchable && (
          <div className="p-3 border-b border-divider">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 border border-divider rounded text-sm placeholder-foreground-tertiary"
            />
          </div>
        )}
        <div className="divide-y divide-divider">
          {filteredProperties.map(([key, property]) => (
            <PropertyItem
              key={key}
              name={key}
              property={property}
              onChange={(value: unknown) => onPropertyChange?.(key, value)}
            />
          ))}
        </div>
      </div>
    );
  },
);

PropertyGrid.displayName = "PropertyGrid";
