"use client";

import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant" | "system";
  timestamp?: Date;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
  avatar?: string;
  className?: string;
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({content, role, timestamp, onEdit, onDelete, avatar, className = ""}, ref) => {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleCopy = () => {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveEdit = () => {
      onEdit?.(editedContent);
      setIsEditing(false);
    };

    const isUser = role === "user";
    const isAssistant = role === "assistant";
    const isSystem = role === "system";

    return (
      <div ref={ref} className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3 mb-4 ${className}`} data-component="message-bubble">
        {/* Avatar */}
        {!isUser && avatar && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">
            {avatar.substring(0, 1).toUpperCase()}
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`flex-1 max-w-2xl px-4 py-2 rounded-lg ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : isSystem
                ? "bg-surface-secondary text-foreground rounded-bl-none italic"
                : "bg-surface text-foreground rounded-bl-none border border-divider"
          }`}
        >
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 border border-divider rounded text-sm bg-background text-foreground"
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 text-xs bg-surface hover:bg-surface-secondary rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-2 py-1 text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy message"
                  className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>

                {onEdit && isUser && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    title="Edit message"
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                  >
                    Edit
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    onClick={onDelete}
                    title="Delete message"
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity text-error"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}

          {/* Timestamp */}
          {timestamp && (
            <div className="text-xs opacity-60 mt-1">
              {new Date(timestamp).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
            </div>
          )}
        </div>
      </div>
    );
  },
);

MessageBubble.displayName = "MessageBubble";
