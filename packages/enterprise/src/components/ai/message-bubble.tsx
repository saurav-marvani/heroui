'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string | ReactNode;
  timestamp?: Date;
  avatar?: ReactNode;
  actions?: { label: string; onClick: () => void }[];
  className?: string;
  metadata?: Record<string, unknown>;
}

/**
 * MessageBubble - Individual message bubble component
 */
const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({
    role,
    content,
    timestamp,
    avatar,
    actions,
    className,
    metadata,
  }, ref) => {
    const [showActions, setShowActions] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 group',
          role === 'user' && 'justify-end'
        )}
        data-slot="message-bubble"
      >
        {/* Avatar */}
        {role !== 'user' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
            {avatar || '🤖'}
          </div>
        )}

        {/* Message Content */}
        <div className={cn('max-w-xs lg:max-w-md', className)}>
          <div
            className={cn(
              'rounded-lg p-3 break-words',
              role === 'user'
                ? 'bg-primary text-primary-foreground'
                : role === 'system'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-muted'
            )}
          >
            <div className="text-sm">
              {typeof content === 'string' ? (
                <p className="whitespace-pre-wrap">{content}</p>
              ) : (
                content
              )}
            </div>

            {timestamp && (
              <p className="text-xs opacity-70 mt-1">
                {timestamp.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className={cn(
              'mt-2 flex gap-2 flex-wrap',
              !showActions && 'opacity-0 group-hover:opacity-100 transition-opacity'
            )}>
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="text-xs px-2 py-1 rounded border border-divider hover:bg-hover transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        {role === 'user' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
            {avatar || '👤'}
          </div>
        )}
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export { MessageBubble, type MessageBubbleProps };
