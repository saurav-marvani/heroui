'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils';

interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  category?: string;
  description?: string;
  onSelect: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  className?: string;
  maxResults?: number;
}

/**
 * CommandPalette - Quick command search and execution
 * Similar to VS Code's command palette with keyboard shortcuts
 */
const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      isOpen,
      onClose,
      items,
      placeholder = 'Type a command...',
      className,
      maxResults = 10,
    },
    ref
  ) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredItems = useMemo(() => {
      if (!search.trim()) return items.slice(0, maxResults);

      const searchLower = search.toLowerCase();
      return items
        .filter((item) => {
          const matchLabel = item.label.toLowerCase().includes(searchLower);
          const matchDesc = item.description?.toLowerCase().includes(searchLower);
          const matchKeywords = item.keywords?.some((kw) =>
            kw.toLowerCase().includes(searchLower)
          );
          return matchLabel || matchDesc || matchKeywords;
        })
        .slice(0, maxResults);
    }, [search, items, maxResults]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredItems.length - 1 ? prev + 1 : prev
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            break;
          case 'Enter':
            if (filteredItems[selectedIndex]) {
              e.preventDefault();
              filteredItems[selectedIndex].onSelect();
              onClose();
            }
            break;
        }
      },
      [filteredItems, selectedIndex, onClose]
    );

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex items-start justify-center pt-[20vh]',
          className
        )}
        data-slot="command-palette"
        onClick={onClose}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Command Box */}
        <div
          className="relative w-full max-w-md rounded-lg border border-divider bg-background shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input */}
          <div className="flex items-center border-b border-divider px-4 py-3">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none"
            />
            <div className="text-xs text-muted-foreground">esc</div>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No commands found
              </div>
            ) : (
              <div>
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.onSelect();
                      onClose();
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 border-b border-divider px-4 py-2 text-left transition-colors',
                      index === selectedIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-hover'
                    )}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs opacity-70 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                    {item.category && (
                      <span className="text-xs opacity-50 flex-shrink-0">
                        {item.category}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';

export { CommandPalette, type CommandPaletteProps, type CommandItem };
