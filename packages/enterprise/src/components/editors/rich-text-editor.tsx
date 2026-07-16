'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: number | string;
  readOnly?: boolean;
  toolbar?: boolean;
  toolbarPosition?: 'top' | 'bottom' | 'floating';
  formats?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * RichTextEditor - Wrapper around BlockNote or similar rich text editor
 * Supports multiple text formats and customizable toolbar
 * Note: This is a simplified version. In production, use @blocknote/react
 */
const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Enter text...',
      className,
      height = 300,
      readOnly = false,
      toolbar = true,
      toolbarPosition = 'top',
      formats = ['bold', 'italic', 'underline', 'link', 'list'],
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [content, setContent] = React.useState(value);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    };

    const applyFormat = (command: string, value?: string) => {
      document.execCommand(command, false, value);
    };

    const formatOptions = {
      bold: { label: 'B', title: 'Bold', command: 'bold' },
      italic: { label: 'I', title: 'Italic', command: 'italic' },
      underline: { label: 'U', title: 'Underline', command: 'underline' },
      link: { label: '🔗', title: 'Link', command: 'createLink' },
      list: { label: '•', title: 'List', command: 'insertUnorderedList' },
      ol: { label: '1.', title: 'Numbered List', command: 'insertOrderedList' },
      quote: { label: '"', title: 'Quote', command: 'formatBlock', value: '<blockquote>' },
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider bg-background overflow-hidden',
          className
        )}
        data-slot="rich-text-editor"
      >
        {/* Toolbar */}
        {toolbar && toolbarPosition === 'top' && (
          <div className="flex flex-wrap gap-1 p-2 border-b border-divider bg-muted/30">
            {formats.map((format) => {
              const option = formatOptions[format as keyof typeof formatOptions];
              if (!option) return null;

              return (
                <button
                  key={format}
                  onClick={() =>
                    applyFormat(option.command, option.value)
                  }
                  className="px-3 py-1.5 text-sm rounded hover:bg-hover transition-colors border border-transparent hover:border-divider"
                  title={option.title}
                  disabled={readOnly}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Editor */}
        <div
          contentEditable={!readOnly}
          suppressContentEditableWarning
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={cn(
            'flex-1 p-4 outline-none focus:ring-inset focus:ring-2 focus:ring-primary overflow-auto',
            'prose prose-sm max-w-none',
            readOnly && 'opacity-75 cursor-not-allowed'
          )}
          style={{ minHeight: height }}
          data-placeholder={placeholder}
        >
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 border-t border-divider bg-muted/20 text-xs text-muted-foreground flex justify-between">
          <span>
            {content ? `${content.replace(/<[^>]*>/g, '').length} characters` : 'Empty'}
          </span>
          {isFocused && !readOnly && (
            <span className="text-primary">Editing...</span>
          )}
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor, type RichTextEditorProps };
