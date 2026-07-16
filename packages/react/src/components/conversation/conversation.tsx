"use client";

import React, {useState, useMemo} from "react";

interface ConversationItem {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: Date;
  archived?: boolean;
  pinned?: boolean;
}

interface ConversationProps {
  conversations: ConversationItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  searchable?: boolean;
  className?: string;
}

export const Conversation = React.forwardRef<HTMLDivElement, ConversationProps>(
  ({conversations, selectedId, onSelect, onDelete, onArchive, searchable = true, className = ""}, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showArchived, setShowArchived] = useState(false);

    const filteredConversations = useMemo(() => {
      return conversations.filter((conv) => {
        const matchesSearch = !searchQuery || conv.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesArchived = showArchived ? conv.archived : !conv.archived;
        return matchesSearch && matchesArchived;
      });
    }, [conversations, searchQuery, showArchived]);

    const pinnedConversations = filteredConversations.filter((c) => c.pinned);
    const unpinnedConversations = filteredConversations.filter((c) => !c.pinned);

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg bg-background overflow-hidden flex flex-col ${className}`}
        data-component="conversation"
      >
        {/* Header */}
        {searchable && (
          <div className="p-3 border-b border-divider space-y-2">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1 border border-divider rounded text-sm bg-background text-foreground placeholder-foreground-tertiary"
            />
            <button
              type="button"
              onClick={() => setShowArchived(!showArchived)}
              className="text-xs px-2 py-1 bg-surface hover:bg-surface-secondary rounded transition-colors"
            >
              {showArchived ? "Show Active" : "Show Archived"}
            </button>
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {pinnedConversations.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-foreground-secondary bg-surface">Pinned</div>
              {pinnedConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedId === conv.id}
                  onSelect={() => onSelect(conv.id)}
                  onDelete={() => onDelete?.(conv.id)}
                  onArchive={() => onArchive?.(conv.id)}
                />
              ))}
            </div>
          )}

          {unpinnedConversations.length > 0 && (
            <div>
              {pinnedConversations.length > 0 && <div className="h-px bg-divider" />}
              {unpinnedConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedId === conv.id}
                  onSelect={() => onSelect(conv.id)}
                  onDelete={() => onDelete?.(conv.id)}
                  onArchive={() => onArchive?.(conv.id)}
                />
              ))}
            </div>
          )}

          {filteredConversations.length === 0 && (
            <div className="p-4 text-center text-foreground-secondary">
              {searchQuery ? "No conversations match your search" : "No conversations yet"}
            </div>
          )}
        </div>
      </div>
    );
  },
);

const ConversationItem: React.FC<{
  conversation: ConversationItem;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onArchive: () => void;
}> = ({conversation, isSelected, onSelect, onDelete, onArchive}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`p-3 border-b border-divider cursor-pointer transition-colors ${
        isSelected ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-surface-secondary"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">{conversation.title}</div>
          {conversation.lastMessage && (
            <div className="text-xs text-foreground-secondary truncate mt-1">{conversation.lastMessage}</div>
          )}
          <div className="text-xs text-foreground-tertiary mt-1">
            {new Date(conversation.updatedAt).toLocaleDateString([], {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
          </div>
        </div>

        {showActions && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
              className="p-1 text-xs hover:bg-surface-secondary rounded transition-colors"
              title="Archive"
            >
              📁
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 text-xs hover:bg-error/10 hover:text-error rounded transition-colors"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Conversation.displayName = "Conversation";
