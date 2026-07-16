'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
 * SortableCard component with @dnd-kit
 */
const SortableCard = forwardRef<
  HTMLDivElement,
  {
    card: KanbanCard;
    columnId: string;
    onCardClick?: (card: KanbanCard, columnId: string) => void;
  }
>(({ card, columnId, onCardClick }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCardClick?.(card, columnId)}
      className={cn(
        'p-3 rounded-lg border border-divider bg-background transition-all cursor-move hover:shadow-md',
        isDragging && 'opacity-50 shadow-lg'
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
  );
});

SortableCard.displayName = 'SortableCard';

/**
 * KanbanBoard - Drag-and-drop Kanban board using @dnd-kit
 * Provides smooth animations and accessibility features for task management
 */
const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({
    columns,
    onCardMove,
    onCardClick,
    className,
    variant = 'comfortable',
  }, ref) => {
    const [items, setItems] = useState<KanbanColumn[]>(columns);

    // Configure sensors for better UX
    const sensors = useSensors(
      useSensor(PointerSensor, {
        distance: 8,
      })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      // Find which column each card belongs to
      let fromColumn: string | null = null;
      let toColumn: string | null = null;

      for (const column of items) {
        if (column.cards.some((c) => c.id === active.id)) {
          fromColumn = column.id;
        }
        if (column.cards.some((c) => c.id === over.id)) {
          toColumn = column.id;
        }
      }

      if (!fromColumn || !toColumn) return;

      const fromColumnData = items.find((c) => c.id === fromColumn);
      const toColumnData = items.find((c) => c.id === toColumn);

      if (!fromColumnData || !toColumnData) return;

      if (fromColumn === toColumn) {
        // Reorder within same column
        const oldIndex = fromColumnData.cards.findIndex((c) => c.id === active.id);
        const newIndex = toColumnData.cards.findIndex((c) => c.id === over.id);

        const newColumns = items.map((col) => {
          if (col.id === fromColumn) {
            return {
              ...col,
              cards: arrayMove(col.cards, oldIndex, newIndex),
            };
          }
          return col;
        });

        setItems(newColumns);
      } else {
        // Move to different column
        const card = fromColumnData.cards.find((c) => c.id === active.id);
        if (!card) return;

        const newColumns = items.map((col) => {
          if (col.id === fromColumn) {
            return {
              ...col,
              cards: col.cards.filter((c) => c.id !== active.id),
            };
          }
          if (col.id === toColumn) {
            const overIndex = col.cards.findIndex((c) => c.id === over.id);
            const insertIndex = overIndex >= 0 ? overIndex : col.cards.length;
            return {
              ...col,
              cards: [
                ...col.cards.slice(0, insertIndex),
                card,
                ...col.cards.slice(insertIndex),
              ],
            };
          }
          return col;
        });

        setItems(newColumns);
        onCardMove?.(active.id as string, fromColumn, toColumn);
      }
    };

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={ref}
          className={cn(
            'flex gap-4 overflow-x-auto pb-4 bg-background rounded-lg p-4',
            className
          )}
          data-slot="kanban-board"
        >
          {items.map((column) => (
            <div
              key={column.id}
              className="flex flex-col flex-shrink-0 w-80 rounded-lg border border-divider bg-muted/30"
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

              {/* Cards Container with SortableContext */}
              <div className="flex-1 flex flex-col gap-3 p-3 overflow-y-auto">
                <SortableContext
                  items={column.cards.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.cards.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-center text-sm text-muted-foreground">
                      No cards
                    </div>
                  ) : (
                    column.cards.map((card) => (
                      <SortableCard
                        key={card.id}
                        card={card}
                        columnId={column.id}
                        onCardClick={onCardClick}
                      />
                    ))
                  )}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    );
  }
);

KanbanBoard.displayName = 'KanbanBoard';

export { KanbanBoard, type KanbanBoardProps, type KanbanColumn, type KanbanCard };
