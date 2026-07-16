'use client';

import type { InputHTMLAttributes } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface TagInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  tags: string[];
  onChange: (tags: string[]) => void;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  placeholder?: string;
  separator?: string[];
  maxTags?: number;
  className?: string;
  maxLength?: number;
  variant?: 'default' | 'outlined' | 'subtle';
}

/**
 * TagInput - Input field for adding and managing tags
 * Supports custom separators (space, comma, enter) for adding tags
 */
const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      tags,
      onChange,
      onTagAdd,
      onTagRemove,
      placeholder = 'Add tags...',
      separator = [',', ' '],
      maxTags,
      className,
      maxLength: inputMaxLength,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || separator.includes(e.key)) {
        e.preventDefault();
        addTag();
      } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const addTag = () => {
      const newTag = input.trim();
      if (newTag && !tags.includes(newTag)) {
        if (!maxTags || tags.length < maxTags) {
          const newTags = [...tags, newTag];
          onChange(newTags);
          onTagAdd?.(newTag);
          setInput('');
        }
      }
    };

    const removeTag = (index: number) => {
      const removed = tags[index];
      const newTags = tags.filter((_, i) => i !== index);
      onChange(newTags);
      onTagRemove?.(removed);
    };

    const containerVariants = {
      default: 'border border-divider rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary',
      outlined: 'border-2 border-divider rounded-lg px-3 py-2 focus-within:border-primary',
      subtle: 'border-b border-divider rounded-none px-0 py-2 focus-within:border-primary',
    };

    return (
      <div
        className={cn(
          'flex flex-wrap gap-2 bg-background transition-colors',
          containerVariants[variant],
          className
        )}
        data-slot="tag-input"
      >
        {tags.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-primary/70 hover:text-primary ml-1"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          maxLength={inputMaxLength}
          className="flex-1 min-w-20 bg-transparent outline-none text-sm"
          {...props}
        />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';

export { TagInput, type TagInputProps };
