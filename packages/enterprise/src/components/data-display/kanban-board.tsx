'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  content?: ReactNode;
  metadata?: Record<string, unknown>;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  className?: string;
  variant?: 'compact' | 'comfortable';
}

/**
 * KanbanBoard - Draggable Kanban board for task/project management
 * Uses HTML5 drag and drop API for drag operations
 */
const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({
    columns,
    onCardMove,
    onCardClick,
    className,
    variant = 'comfortable',
  }, ref) => {
    const [draggedCard, setDraggedCard] = useState<{ cardId: string; columnId: string } | null>(null);

    const handleDragStart = (
      e: React.DragEvent<HTMLDivElement>,
      cardId: string,
      columnId: string
    ) => {
      setDraggedCard({ cardId, columnId });
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (
      e: React.DragEvent<HTMLDivElement>,
      toColumnId: string
    ) => {
      e.preventDefault();
      if (draggedCard) {
        onCardMove?.(draggedCard.cardId, draggedCard.columnId, toColumnId);
        setDraggedCard(null);
      }
    };

    const handleDragEnd = () => {
      setDraggedCard(null);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-4 overflow-x-auto pb-4 bg-background rounded-lg p-4',
          className
        )}
        data-slot="kanban-board"
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col flex-shrink-0 w-80 rounded-lg border border-divider bg-muted/30"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div
              className={cn(
                'px-4 py-3 border-b border-divider font-semibold text-sm flex items-center justify-between',
                column.color ? `bg-${column.color}/10` : 'bg-muted/50'
              )}
            >
              <span>{column.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-background">
                {column.cards.length}
              </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 flex flex-col gap-3 p-3 overflow-y-auto">
              {column.cards.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-center text-sm text-muted-foreground">
                  No cards
                </div>
              ) : (
                column.cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onCardClick?.(card, column.id)}
                    className={cn(
                      'p-3 rounded-lg border border-divider bg-background transition-all cursor-move hover:shadow-md',
                      draggedCard?.cardId === card.id && 'opacity-50'
                    )}
                  >
                    <h4 className="font-medium text-sm">{card.title}</h4>
                    {card.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {card.description}
                      </p>
                    )}
                    {card.content && (
                      <div className="mt-2 text-xs">
                        {card.content}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

KanbanBoard.displayName = 'KanbanBoard';

export { KanbanBoard, type KanbanBoardProps, type KanbanColumn, type KanbanCard };
