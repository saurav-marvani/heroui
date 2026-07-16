'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface JSONEditorProps {
  value?: unknown;
  onChange?: (value: unknown) => void;
  className?: string;
  height?: number | string;
  readOnly?: boolean;
  onError?: (error: Error) => void;
}

/**
 * JSONEditor - JSON-specific editor with validation
 */
const JSONEditor = forwardRef<HTMLDivElement, JSONEditorProps>(
  (
    {
      value = {},
      onChange,
      className,
      height = 400,
      readOnly = false,
      onError,
    },
    ref
  ) => {
    const [json, setJson] = useState(JSON.stringify(value, null, 2));
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newJson = e.target.value;
      setJson(newJson);

      try {
        const parsed = JSON.parse(newJson);
        onChange?.(parsed);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
        setError(errorMessage);
        onError?.(new Error(errorMessage));
      }
    };

    const lineCount = json.split('\n').length;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider bg-background overflow-hidden',
          error && 'border-danger',
          className
        )}
        data-slot="json-editor"
      >
        {/* Header */}
        <div className="px-4 py-2 border-b border-divider bg-muted/30 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            JSON
          </span>
          <button
            onClick={() => {
              try {
                setJson(JSON.stringify(JSON.parse(json), null, 2));
                setError(null);
              } catch (err) {
                const errorMessage =
                  err instanceof Error ? err.message : 'Invalid JSON';
                setError(errorMessage);
              }
            }}
            className="text-xs px-2 py-1 rounded border border-divider bg-background hover:bg-hover transition-colors"
          >
            Format
          </button>
        </div>

        {/* Editor */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{ height }}
        >
          {/* Line Numbers */}
          <div className="flex flex-col items-end px-3 py-2 bg-muted/20 border-r border-divider select-none text-muted-foreground text-xs font-mono leading-relaxed">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={json}
            onChange={handleChange}
            readOnly={readOnly}
            className={cn(
              'flex-1 p-4 font-mono text-sm outline-none resize-none bg-background text-foreground',
              'focus:ring-inset focus:ring-2 focus:ring-primary',
              error && 'ring-danger ring-2',
              readOnly && 'opacity-75 cursor-not-allowed'
            )}
            style={{
              fontFamily: 'monospace',
              lineHeight: '1.5',
            }}
            spellCheck="false"
          />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 border-t border-divider bg-muted/20 text-xs flex items-center justify-between">
          <div>
            {error ? (
              <span className="text-danger">Error: {error}</span>
            ) : (
              <span className="text-success">Valid JSON</span>
            )}
          </div>
          <span className="text-muted-foreground">{lineCount} lines</span>
        </div>
      </div>
    );
  }
);

JSONEditor.displayName = 'JSONEditor';

export { JSONEditor, type JSONEditorProps };
