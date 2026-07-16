"use client";

import React, {useRef, useEffect, useState} from "react";
import {MessageBubble} from "../message-bubble/message-bubble";
import {ThinkingIndicator} from "../thinking-indicator/thinking-indicator";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isThinking?: boolean;
  placeholder?: string;
  maxHeight?: string;
  showStats?: boolean;
  onMessageEdit?: (id: string, content: string) => void;
  onMessageDelete?: (id: string) => void;
  className?: string;
}

export const AIChat = React.forwardRef<HTMLDivElement, AIChatProps>(
  (
    {
      messages,
      onSendMessage,
      isLoading = false,
      isThinking = false,
      placeholder = "Type your message...",
      maxHeight = "600px",
      showStats = true,
      onMessageEdit,
      onMessageDelete,
      className = "",
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleSend = () => {
      if (inputValue.trim() && !isLoading) {
        onSendMessage(inputValue);
        setInputValue("");
        inputRef.current?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !isLoading) {
        e.preventDefault();
        handleSend();
      }
    };

    const tokenCount = messages.reduce((acc, msg) => acc + msg.content.split(/\s+/).length, 0);

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg bg-background overflow-hidden flex flex-col ${className}`}
        data-component="ai-chat"
      >
        {/* Messages Area */}
        <div style={{maxHeight}} className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-foreground-secondary">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">Start a Conversation</p>
                <p className="text-sm">Send a message to begin</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
              onEdit={(newContent) => onMessageEdit?.(message.id, newContent)}
              onDelete={() => onMessageDelete?.(message.id)}
              avatar={message.role === "assistant" ? "AI" : undefined}
            />
          ))}

          {isThinking && <ThinkingIndicator isThinking message="AI is thinking..." />}
          <div ref={messagesEndRef} />
        </div>

        {/* Stats */}
        {showStats && messages.length > 0 && (
          <div className="px-4 py-2 border-t border-divider bg-surface-secondary text-xs text-foreground-secondary flex gap-4">
            <span>{messages.length} messages</span>
            <span>{tokenCount} words</span>
            <span>{messages.filter((m) => m.role === "user").length} you</span>
            <span>{messages.filter((m) => m.role === "assistant").length} AI</span>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-divider p-4 bg-surface-secondary space-y-2">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              rows={3}
              className="flex-1 p-2 border border-divider rounded text-sm bg-background text-foreground placeholder-foreground-tertiary resize-none focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>

          <div className="text-xs text-foreground-tertiary">
            Shift+Enter for new line
          </div>
        </div>
      </div>
    );
  },
);

AIChat.displayName = "AIChat";
