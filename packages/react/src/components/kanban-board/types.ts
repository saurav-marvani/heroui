export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  maxCards?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, sourceColumnId: string, targetColumnId: string, index: number) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  onColumnAdd?: () => void;
  editable?: boolean;
  className?: string;
}

export interface KanbanCardProps {
  card: KanbanCard;
  columnId: string;
  index: number;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  isDragging?: boolean;
}

export interface KanbanColumnProps {
  column: KanbanColumn;
  onCardMove?: (cardId: string, targetColumnId: string, index: number) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  editable?: boolean;
}
