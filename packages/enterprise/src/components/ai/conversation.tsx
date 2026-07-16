'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: Date;
  messageCount: number;
  pinned?: boolean;
}

interface ConversationProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
  onNewConversation?: () => void;
  className?: string;
}

/**
 * Conversation - Conversation list sidebar component
 */
const ConversationList = forwardRef<HTMLDivElement, ConversationProps>(
  ({
    conversations,
    activeConversationId,
    onSelectConversation,
    onDeleteConversation,
    onNewConversation,
    className,
  }, ref) => {
    const pinnedConversations = conversations.filter((c) => c.pinned);
    const unpinnedConversations = conversations.filter((c) => !c.pinned);

    const renderConversationItem = (conv: Conversation) => (
      <button
        key={conv.id}
        onClick={() => onSelectConversation(conv.id)}
        className={cn(
          'w-full flex items-start gap-3 px-3 py-2 rounded-lg transition-colors text-left',
          activeConversationId === conv.id
            ? 'bg-primary/10 border-l-2 border-primary'
            : 'hover:bg-hover'
        )}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{conv.title}</h3>
          {conv.lastMessage && (
            <p className="text-xs text-muted-foreground truncate">
              {conv.lastMessage}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 ml-2">
          {conv.pinned && <span className="text-xs">📌</span>}
          <span className="text-xs text-muted-foreground">
            {conv.messageCount}
          </span>
        </div>

        {onDeleteConversation && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteConversation(conv.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-danger/10 rounded text-danger text-xs"
          >
            ✕
          </button>
        )}
      </button>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col h-full bg-surface border-r border-divider overflow-hidden',
          className
        )}
        data-slot="conversation-list"
      >
        {/* Header */}
        <div className="p-4 border-b border-divider flex items-center justify-between">
          <h2 className="font-semibold">Conversations</h2>
          {onNewConversation && (
            <button
              onClick={onNewConversation}
              className="p-1 hover:bg-hover rounded-lg transition-colors"
              title="New conversation"
            >
              ➕
            </button>
          )}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned */}
          {pinnedConversations.length > 0 && (
            <div className="px-2 py-2">
              <div className="text-xs font-semibold text-muted-foreground px-1 py-2">
                Pinned
              </div>
              <div className="space-y-1">
                {pinnedConversations.map(renderConversationItem)}
              </div>
              <div className="border-b border-divider my-2" />
            </div>
          )}

          {/* Recent */}
          {unpinnedConversations.length > 0 && (
            <div className="px-2 py-2">
              {pinnedConversations.length > 0 && (
                <div className="text-xs font-semibold text-muted-foreground px-1 py-2">
                  Recent
                </div>
              )}
              <div className="space-y-1">
                {unpinnedConversations.map(renderConversationItem)}
              </div>
            </div>
          )}

          {conversations.length === 0 && (
            <div className="flex items-center justify-center h-full p-4 text-center">
              <div className="text-sm text-muted-foreground">
                No conversations yet
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ConversationList.displayName = 'ConversationList';

export { ConversationList, type ConversationProps, type Conversation };
