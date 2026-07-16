"use client";

import type {ReactNode} from "react";
import React from "react";

interface TimelineItem {
  id: string | number;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
  status?: "pending" | "completed" | "active" | "error";
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: "vertical" | "horizontal";
  showConnector?: boolean;
  renderItem?: (item: TimelineItem, index: number) => ReactNode;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      className = "",
      variant = "vertical",
      showConnector = true,
      renderItem,
    },
    ref,
  ) => {
    const getStatusColor = (status?: string) => {
      switch (status) {
        case "completed":
          return "bg-success text-success-foreground";
        case "active":
          return "bg-primary text-primary-foreground";
        case "error":
          return "bg-error text-error-foreground";
        case "pending":
          return "bg-muted text-muted-foreground";
        default:
          return "bg-surface-secondary text-foreground";
      }
    };

    return (
      <div
        ref={ref}
        className={`timeline timeline-${variant} ${className}`}
        data-component="timeline"
      >
        <div
          className={
            variant === "vertical"
              ? "space-y-8"
              : "flex gap-8 overflow-x-auto pb-4"
          }
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const statusColor = getStatusColor(item.status);

            if (renderItem) {
              return (
                <div key={item.id} className="relative">
                  {renderItem(item, index)}
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={`relative ${variant === "horizontal" ? "flex-shrink-0 w-64" : ""}`}
              >
                {/* Connector line */}
                {showConnector && !isLast && (
                  <div
                    className={
                      variant === "vertical"
                        ? "absolute left-6 top-12 w-0.5 h-8 bg-divider"
                        : "absolute top-6 left-full w-8 h-0.5 bg-divider"
                    }
                  />
                )}

                {/* Timeline item */}
                <div className="flex gap-4">
                  {/* Icon/Dot */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${statusColor} border-4 border-background shadow-sm transition-all duration-200`}
                    >
                      {item.icon ? (
                        item.icon
                      ) : (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {item.timestamp && (
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {item.timestamp}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Timeline.displayName = "Timeline";

interface TimelineItemProps {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
  status?: "pending" | "completed" | "active" | "error";
  className?: string;
}

export const TimelineItem = React.forwardRef<
  HTMLDivElement,
  TimelineItemProps
>(
  (
    {title, description, timestamp, icon, status, className = ""},
    ref,
  ) => {
    const statusColor =
      status === "completed"
        ? "bg-success"
        : status === "active"
          ? "bg-primary"
          : status === "error"
            ? "bg-error"
            : "bg-muted";

    return (
      <div ref={ref} className={`flex gap-4 ${className}`}>
        <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${statusColor}`} />
        <div>
          <div className="font-semibold text-sm">{title}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>
      </div>
    );
  },
);

TimelineItem.displayName = "TimelineItem";
