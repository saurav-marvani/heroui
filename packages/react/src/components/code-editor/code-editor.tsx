"use client";

import React, {useState, useCallback} from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: "light" | "dark";
  height?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  className?: string;
}

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "csharp",
  "go",
  "rust",
  "sql",
  "html",
  "css",
  "json",
  "xml",
  "markdown",
  "bash",
  "yaml",
];

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      value,
      onChange,
      language = "javascript",
      theme = "light",
      height = "400px",
      readOnly = false,
      showLineNumbers = true,
      className = "",
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [value]);

    const lineCount = value.split("\n").length;
    const lineNumbers = Array.from({length: lineCount}, (_, i) => i + 1);

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg overflow-hidden bg-background ${className}`}
        data-component="code-editor"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-divider bg-surface-secondary">
          <select
            value={language}
            onChange={(e) => {
              // Language selection for syntax highlighting (future implementation)
            }}
            className="px-2 py-1 text-sm border border-divider rounded bg-background text-foreground"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div style={{height}} className="flex overflow-hidden bg-background">
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="bg-surface-secondary border-r border-divider px-3 py-4 font-mono text-sm text-foreground-secondary select-none overflow-hidden">
              {lineNumbers.map((num) => (
                <div key={num} className="leading-relaxed">
                  {num}
                </div>
              ))}
            </div>
          )}

          {/* Code Input */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className="flex-1 p-4 border-0 resize-none focus:outline-none bg-background text-foreground font-mono text-sm"
            style={{
              height: "100%",
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
              color: theme === "dark" ? "#d4d4d4" : "#000000",
            }}
            spellCheck={false}
          />
        </div>

        {/* Stats Footer */}
        {!readOnly && (
          <div className="px-4 py-2 border-t border-divider bg-surface-secondary text-sm text-foreground-secondary">
            {language.toUpperCase()} · {value.length} characters · {lineCount} lines
          </div>
        )}
      </div>
    );
  },
);

CodeEditor.displayName = "CodeEditor";
