'use client';

import React, { forwardRef } from 'react';
import Editor from '@monaco-editor/react';
import { cn } from '../../utils';

interface CodeEditorProps {
  /** Initial code value */
  value?: string;
  /** Change callback */
  onChange?: (value: string) => void;
  /** Programming language */
  language?: string;
  /** Editor theme */
  theme?: 'light' | 'vs-dark';
  /** Custom className */
  className?: string;
  /** Editor height */
  height?: number | string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show line numbers */
  lineNumbers?: boolean;
  /** Show minimap */
  minimap?: boolean;
  /** Show language selector */
  showLanguageSelector?: boolean;
  /** Language change callback */
  onLanguageChange?: (language: string) => void;
}

const SUPPORTED_LANGUAGES = [
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
  'bash',
  'dockerfile',
];

/**
 * CodeEditor - Syntax-highlighted code editor using @monaco-editor/react
 * Provides Microsoft's Monaco editor with full language support and themes
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
    ref,
  ) => {
    const [selectedLanguage, setSelectedLanguage] = React.useState(language);

    const handleLanguageChange = (newLanguage: string) => {
      setSelectedLanguage(newLanguage);
      onLanguageChange?.(newLanguage);
    };

    const monacoTheme = theme === 'light' ? 'vs' : 'vs-dark';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col rounded-lg border border-divider overflow-hidden', className)}
        data-slot="code-editor"
      >
        {/* Header */}
        {showLanguageSelector && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-divider bg-muted/30">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              {selectedLanguage}
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-xs px-2 py-1 rounded border border-divider bg-background hover:bg-hover"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Monaco Editor */}
        <div style={{ height }} className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            language={selectedLanguage}
            value={value}
            onChange={(val) => onChange?.(val || '')}
            theme={monacoTheme}
            options={{
              readOnly,
              lineNumbers: lineNumbers ? 'on' : 'off',
              minimap: { enabled: minimap },
              automaticLayout: true,
              fontSize: 14,
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
            }}
          />
        </div>
      </div>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor, type CodeEditorProps };
