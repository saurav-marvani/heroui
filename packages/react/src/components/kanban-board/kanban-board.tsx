"use client";

import type {ReactNode} from "react";
import React, {useState} from "react";

export interface KanbanCard {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  priority?: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface KanbanColumn {
  id: string;
  title: ReactNode;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  className?: string;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  renderCard?: (card: KanbanCard) => ReactNode;
  renderColumn?: (column: KanbanColumn) => ReactNode;
  readonly?: boolean;
}

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      className = "",
      onCardClick,
      onCardMove,
      renderCard,
      renderColumn,
      readonly = false,
    },
    ref,
  ) => {
    const [draggedCard, setDraggedCard] = useState<{
      cardId: string;
      fromColumnId: string;
    } | null>(null);

    const handleDragStart = (cardId: string, columnId: string) => {
      if (!readonly) {
        setDraggedCard({cardId, fromColumnId: columnId});
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (toColumnId: string) => {
      if (draggedCard && draggedCard.fromColumnId !== toColumnId) {
        onCardMove?.(draggedCard.cardId, draggedCard.fromColumnId, toColumnId);
      }
      setDraggedCard(null);
    };

    const getPriorityColor = (priority?: string) => {
      switch (priority) {
        case "high":
          return "bg-error/10 border-error/50";
        case "medium":
          return "bg-warning/10 border-warning/50";
        case "low":
          return "bg-success/10 border-success/50";
        default:
          return "bg-surface-secondary/50 border-divider";
      }
    };

    return (
      <div
        ref={ref}
        className={`kanban-board overflow-x-auto ${className}`}
        data-component="kanban-board"
      >
        <div className="inline-flex gap-4 pb-4 min-w-full px-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-surface-secondary rounded-lg p-4"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column header */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {column.cards.length} {column.cards.length === 1 ? "card" : "cards"}
                </p>
              </div>

              {renderColumn ? (
                renderColumn(column)
              ) : (
                /* Cards */
                <div className="space-y-3">
                  {column.cards.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No cards yet
                    </div>
                  ) : (
                    column.cards.map((card) => (
                      <div
                        key={card.id}
                        draggable={!readonly}
                        onDragStart={() => handleDragStart(card.id, column.id)}
                        onClick={() => onCardClick?.(card, column.id)}
                        className={`p-3 bg-background rounded border ${getPriorityColor(card.priority)} cursor-move hover:shadow-md transition-shadow ${readonly ? "cursor-default" : ""}`}
                      >
                        {renderCard ? (
                          renderCard(card)
                        ) : (
                          <>
                            <h4 className="font-medium text-sm text-foreground">
                              {card.title}
                            </h4>
                            {card.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {card.description}
                              </p>
                            )}
                            {(card.tags || card.assignee) && (
                              <div className="flex gap-2 mt-2 flex-wrap">
                                {card.assignee && (
                                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                                    {card.assignee}
                                  </span>
                                )}
                                {card.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {card.dueDate && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Due: {card.dueDate}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";
