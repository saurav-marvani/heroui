'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { cn } from '../../utils';

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
  className?: string;
  height?: number | string;
  readOnly?: boolean;
  lineNumbers?: boolean;
  minimap?: boolean;
  showLanguageSelector?: boolean;
  onLanguageChange?: (language: string) => void;
}

/**
 * CodeEditor - Code editor component
 * Wrapper component - in production, integrate @monaco-editor/react
 * This is a simplified version for demonstration
 */
const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      value = '',
      onChange,
      language = 'javascript',
      theme = 'light',
      className,
      height = 400,
      readOnly = false,
      lineNumbers = true,
      minimap = true,
      showLanguageSelector = true,
      onLanguageChange,
    },
    ref
  ) => {
    const [lineCount, setLineCount] = React.useState(
      value.split('\n').length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLineCount(newValue.split('\n').length);
      onChange?.(newValue);
    };

    const languages = [
      'javascript',
      'typescript',
      'python',
      'java',
      'cpp',
      'csharp',
      'go',
      'rust',
      'sql',
      'html',
      'css',
      'json',
      'yaml',
      'xml',
    ];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider bg-background overflow-hidden',
          theme === 'dark' && 'bg-slate-900 text-slate-50',
          className
        )}
        data-slot="code-editor"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-divider bg-muted/30">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            {language}
          </span>
          {showLanguageSelector && (
            <select
              value={language}
              onChange={(e) => onLanguageChange?.(e.target.value)}
              className="text-xs px-2 py-1 rounded border border-divider bg-background hover:bg-hover"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Editor Container */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{ height }}
        >
          {/* Line Numbers */}
          {lineNumbers && (
            <div className="flex flex-col items-end px-3 py-2 bg-muted/20 border-r border-divider select-none text-muted-foreground text-xs font-mono leading-relaxed">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}

          {/* Code Textarea */}
          <textarea
            value={value}
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

          {/* Minimap */}
          {minimap && (
            <div className="w-12 border-l border-divider bg-muted/10 p-1 text-xs">
              <div className="h-full bg-gradient-to-b from-primary/20 to-primary/10 rounded text-center text-muted-foreground flex items-center justify-center">
                ▦
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-divider bg-muted/20 text-xs text-muted-foreground flex justify-between">
          <span>{value.length} characters</span>
          <span>{lineCount} lines</span>
        </div>
      </div>
    );
  }
);

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor, type CodeEditorProps };
