'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  height?: number | string;
  readOnly?: boolean;
  showPreview?: boolean;
  previewPosition?: 'right' | 'bottom';
}

/**
 * MarkdownEditor - Markdown editor with live preview
 */
const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  (
    {
      value = '',
      onChange,
      className,
      height = 400,
      readOnly = false,
      showPreview = true,
      previewPosition = 'right',
    },
    ref
  ) => {
    const [markdown, setMarkdown] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setMarkdown(newValue);
      onChange?.(newValue);
    };

    const renderMarkdownPreview = (md: string) => {
      // Simple markdown to HTML conversion
      let html = md;

      // Headers
      html = html.replace(/^### (.*?)$/gm, '<h3 className="text-lg font-semibold">$1</h3>');
      html = html.replace(/^## (.*?)$/gm, '<h2 className="text-xl font-semibold">$2</h2>');
      html = html.replace(/^# (.*?)$/gm, '<h1 className="text-2xl font-semibold">$1</h1>');

      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Italic
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Code
      html = html.replace(/`(.*?)`/g, '<code className="bg-muted px-1 rounded">$1</code>');

      // Links
      html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-primary hover:underline">$1</a>');

      // Line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      html = `<p>${html}</p>`;

      return html;
    };

    const lineCount = markdown.split('\n').length;

    const containerClass = previewPosition === 'right' ? 'flex-row' : 'flex-col';

    return (
      <div
        ref={ref}
        className={cn(
          'flex rounded-lg border border-divider bg-background overflow-hidden',
          containerClass,
          className
        )}
        data-slot="markdown-editor"
        style={{ height }}
      >
        {/* Editor Section */}
        <div className={cn('flex flex-col', showPreview && (previewPosition === 'right' ? 'flex-1 border-r border-divider' : 'border-b border-divider'))}>
          {/* Header */}
          <div className="px-4 py-2 border-b border-divider bg-muted/30 text-xs font-semibold text-muted-foreground uppercase">
            Markdown
          </div>

          {/* Textarea */}
          <div className={cn('flex flex-1 overflow-hidden', previewPosition === 'bottom' && showPreview && 'h-1/2')}>
            <div className="flex flex-col items-end px-3 py-2 bg-muted/20 border-r border-divider select-none text-muted-foreground text-xs font-mono leading-relaxed">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={markdown}
              onChange={handleChange}
              readOnly={readOnly}
              className={cn(
                'flex-1 p-4 font-mono text-sm outline-none resize-none bg-background text-foreground',
                'focus:ring-inset focus:ring-2 focus:ring-primary',
                readOnly && 'opacity-75 cursor-not-allowed'
              )}
              style={{
                fontFamily: 'monospace',
                lineHeight: '1.5',
              }}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className={cn('flex flex-col', previewPosition === 'right' ? 'flex-1' : 'flex-1 border-t border-divider')}>
            {/* Header */}
            <div className="px-4 py-2 border-b border-divider bg-muted/30 text-xs font-semibold text-muted-foreground uppercase">
              Preview
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4 prose prose-sm max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownPreview(markdown),
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';

export { MarkdownEditor, type MarkdownEditorProps };
