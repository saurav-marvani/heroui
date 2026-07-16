'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

interface AIChatProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  showTimestamps?: boolean;
  enableMentions?: boolean;
  enableAttachments?: boolean;
  toolCalls?: { tool: string; status: 'pending' | 'completed' | 'failed' }[];
}

/**
 * AIChat - AI chat interface component
 * High-level chat UI for AI interactions with streaming support
 */
const AIChat = forwardRef<HTMLDivElement, AIChatProps>(
  (
    {
      messages = [],
      onSendMessage,
      isLoading = false,
      placeholder = 'Ask me anything...',
      className,
      showTimestamps = true,
      enableMentions = true,
      enableAttachments = false,
      toolCalls = [],
    },
    ref
  ) => {
    const [input, setInput] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleSend = () => {
      if (input.trim() && !isLoading) {
        onSendMessage?.(input);
        setInput('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col h-full rounded-lg border border-divider bg-background overflow-hidden',
          className
        )}
        data-slot="ai-chat"
      >
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-semibold mb-2">Start a conversation</p>
                <p className="text-sm">{placeholder}</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' && 'justify-end'
                )}
              >
                {message.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm">
                    🤖
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-xs lg:max-w-md rounded-lg p-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>

                  {showTimestamps && (
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-sm">
                    👤
                  </div>
                )}
              </div>
            ))
          )}

          {/* Tool Calls Status */}
          {toolCalls.length > 0 && (
            <div className="flex gap-2 items-center text-sm text-muted-foreground">
              <div className="inline-flex gap-1">
                {toolCalls.map((tool, i) => (
                  <span
                    key={i}
                    className={cn(
                      'px-2 py-1 rounded text-xs',
                      tool.status === 'pending' && 'bg-warning/20 text-warning',
                      tool.status === 'completed' && 'bg-success/20 text-success',
                      tool.status === 'failed' && 'bg-danger/20 text-danger'
                    )}
                  >
                    {tool.tool}: {tool.status}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Thinking...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-divider p-4 bg-muted/20">
          <div className="flex gap-2">
            {enableAttachments && (
              <button
                className="px-3 py-2 rounded-lg hover:bg-hover transition-colors"
                title="Attach file"
              >
                📎
              </button>
            )}

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder={placeholder}
              disabled={isLoading}
              className={cn(
                'flex-1 px-3 py-2 rounded-lg border border-divider bg-background resize-none outline-none',
                'focus:ring-2 focus:ring-primary transition-all',
                'disabled:opacity-50'
              )}
              rows={1}
              style={{ minHeight: '40px', maxHeight: '100px' }}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                input.trim() && !isLoading
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'opacity-50 cursor-not-allowed'
              )}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
);

AIChat.displayName = 'AIChat';

export { AIChat, type AIChatProps, type ChatMessage };
