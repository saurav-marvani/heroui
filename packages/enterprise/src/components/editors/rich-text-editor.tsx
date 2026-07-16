'use client';

import React, { forwardRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@kinetic/react';
import { cn } from '../../utils';

interface RichTextEditorProps {
  /** Initial HTML content */
  value?: string;
  /** Callback on content change */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Custom className */
  className?: string;
  /** Editor height */
  height?: number | string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show toolbar */
  toolbar?: boolean;
  /** Focus callback */
  onFocus?: () => void;
  /** Blur callback */
  onBlur?: () => void;
}

/**
 * RichTextEditor - WYSIWYG editor using Tiptap
 * Provides formatting toolbar with essential text editing features like bold, italic, lists, etc.
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
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder,
        }),
      ],
      content: value,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      onFocus: () => onFocus?.(),
      onBlur: () => onBlur?.(),
    });

    const toggleBold = useCallback(() => {
      editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
      editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleCode = useCallback(() => {
      editor?.chain().focus().toggleCode().run();
    }, [editor]);

    const toggleHeading = useCallback((level: 1 | 2 | 3) => {
      editor?.chain().focus().toggleHeading({ level }).run();
    }, [editor]);

    const toggleBulletList = useCallback(() => {
      editor?.chain().focus().toggleBulletList().run();
    }, [editor]);

    const toggleOrderedList = useCallback(() => {
      editor?.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const toggleBlockquote = useCallback(() => {
      editor?.chain().focus().toggleBlockquote().run();
    }, [editor]);

    const toggleCodeBlock = useCallback(() => {
      editor?.chain().focus().toggleCodeBlock().run();
    }, [editor]);

    if (!editor) {
      return <div className="p-4 text-muted-foreground">Loading editor...</div>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider bg-background overflow-hidden',
          className,
        )}
        data-slot="rich-text-editor"
      >
        {/* Toolbar */}
        {toolbar && (
          <div className="flex flex-wrap gap-1 p-2 border-b border-divider bg-muted/30">
            <Button
              size="sm"
              variant={editor.isActive('bold') ? 'solid' : 'ghost'}
              onClick={toggleBold}
              disabled={readOnly}
              className="font-bold"
            >
              B
            </Button>

            <Button
              size="sm"
              variant={editor.isActive('italic') ? 'solid' : 'ghost'}
              onClick={toggleItalic}
              disabled={readOnly}
              className="italic"
            >
              I
            </Button>

            <Button
              size="sm"
              variant={editor.isActive('code') ? 'solid' : 'ghost'}
              onClick={toggleCode}
              disabled={readOnly}
              className="font-mono text-xs"
            >
              Code
            </Button>

            <div className="w-px bg-divider" />

            <Button
              size="sm"
              variant={editor.isActive('heading', { level: 1 }) ? 'solid' : 'ghost'}
              onClick={() => toggleHeading(1)}
              disabled={readOnly}
              className="text-sm font-bold"
            >
              H1
            </Button>

            <Button
              size="sm"
              variant={editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'}
              onClick={() => toggleHeading(2)}
              disabled={readOnly}
              className="text-sm font-bold"
            >
              H2
            </Button>

            <div className="w-px bg-divider" />

            <Button
              size="sm"
              variant={editor.isActive('bulletList') ? 'solid' : 'ghost'}
              onClick={toggleBulletList}
              disabled={readOnly}
            >
              •
            </Button>

            <Button
              size="sm"
              variant={editor.isActive('orderedList') ? 'solid' : 'ghost'}
              onClick={toggleOrderedList}
              disabled={readOnly}
            >
              1.
            </Button>

            <div className="w-px bg-divider" />

            <Button
              size="sm"
              variant={editor.isActive('blockquote') ? 'solid' : 'ghost'}
              onClick={toggleBlockquote}
              disabled={readOnly}
              className="text-sm"
            >
              "
            </Button>

            <Button
              size="sm"
              variant={editor.isActive('codeBlock') ? 'solid' : 'ghost'}
              onClick={toggleCodeBlock}
              disabled={readOnly}
              className="text-xs font-mono"
            >
              &lt;&gt;
            </Button>
          </div>
        )}

        {/* Editor */}
        <div
          style={{ minHeight: height }}
          className="flex-1 overflow-auto p-4 focus-within:ring-inset focus-within:ring-2 focus-within:ring-primary"
        >
          <EditorContent
            editor={editor}
            className={cn(
              'prose prose-sm max-w-none',
              'prose-headings:mt-4 prose-headings:mb-2',
              'prose-p:m-0 prose-p:leading-7',
              readOnly && 'opacity-75 cursor-not-allowed',
            )}
          />
        </div>
      </div>
    );
  },
);

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor, type RichTextEditorProps };
