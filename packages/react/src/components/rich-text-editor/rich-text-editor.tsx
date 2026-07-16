"use client";

import type {ReactNode} from "react";
import React, {useState, useCallback} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPreview?: boolean;
  readOnly?: boolean;
  height?: string;
  className?: string;
}

const TOOLBAR_BUTTONS = [
  {label: "Bold", symbol: "**", key: "bold"},
  {label: "Italic", symbol: "*", key: "italic"},
  {label: "Underline", symbol: "__", key: "underline"},
  {label: "Strikethrough", symbol: "~~", key: "strikethrough"},
  {label: "Link", symbol: "[text](url)", key: "link"},
  {label: "Code", symbol: "`", key: "code"},
  {label: "Heading 1", symbol: "# ", key: "h1"},
  {label: "Heading 2", symbol: "## ", key: "h2"},
  {label: "Bullet List", symbol: "- ", key: "list"},
];

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({value, onChange, placeholder = "Enter markdown...", showPreview = true, readOnly = false, height = "400px", className = ""}, ref) => {
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    const handleInsertMarkdown = useCallback(
      (before: string, after: string = "") => {
        if (readOnly) return;

        const textarea = document.activeElement as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end);
        const newValue = value.substring(0, start) + before + selected + after + value.substring(end);

        onChange(newValue);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
        }, 0);
      },
      [value, onChange, readOnly],
    );

    return (
      <div
        ref={ref}
        className={`w-full border border-divider rounded-lg overflow-hidden bg-background ${className}`}
        data-component="rich-text-editor"
      >
        {/* Toolbar */}
        {!readOnly && (
          <div className="flex flex-wrap gap-1 p-2 border-b border-divider bg-surface-secondary">
            {TOOLBAR_BUTTONS.map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => {
                  if (btn.key === "link") {
                    handleInsertMarkdown("[", "](url)");
                  } else if (btn.key === "bold") {
                    handleInsertMarkdown("**", "**");
                  } else if (btn.key === "italic") {
                    handleInsertMarkdown("*", "*");
                  } else if (btn.key === "underline") {
                    handleInsertMarkdown("__", "__");
                  } else if (btn.key === "strikethrough") {
                    handleInsertMarkdown("~~", "~~");
                  } else if (btn.key === "code") {
                    handleInsertMarkdown("`", "`");
                  } else if (btn.key === "h1") {
                    handleInsertMarkdown("# ", "");
                  } else if (btn.key === "h2") {
                    handleInsertMarkdown("## ", "");
                  } else if (btn.key === "list") {
                    handleInsertMarkdown("- ", "");
                  }
                }}
                title={btn.label}
                className="px-2 py-1 text-sm font-medium bg-background text-foreground rounded hover:bg-surface transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        {showPreview && (
          <div className="flex gap-0 border-b border-divider">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "edit"
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "bg-surface text-foreground hover:bg-surface-secondary"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "preview"
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "bg-surface text-foreground hover:bg-surface-secondary"
              }`}
            >
              Preview
            </button>
          </div>
        )}

        {/* Editor/Preview */}
        <div style={{height}} className="overflow-hidden flex">
          {activeTab === "edit" || !showPreview ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              className="flex-1 p-4 border-0 resize-none focus:outline-none bg-background text-foreground font-mono text-sm"
              style={{height: showPreview ? "100%" : height}}
            />
          ) : null}

          {(activeTab === "preview" || showPreview) && showPreview ? (
            <div className="flex-1 p-4 overflow-auto bg-surface prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {value || "Nothing to preview"}
              </ReactMarkdown>
            </div>
          ) : null}
        </div>

        {/* Stats Footer */}
        {!readOnly && (
          <div className="px-4 py-2 border-t border-divider bg-surface-secondary text-sm text-foreground-secondary">
            {value.length} characters · {value.split("\n").length} lines
          </div>
        )}
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";
