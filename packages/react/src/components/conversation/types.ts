export interface ConversationItem {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: Date;
  archived?: boolean;
  pinned?: boolean;
}

export interface ConversationProps {
  conversations: ConversationItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  searchable?: boolean;
  className?: string;
}
