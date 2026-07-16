'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: Date;
  icon?: ReactNode;
  children?: FileItem[];
}

interface FileExplorerProps {
  items: FileItem[];
  onSelectFile?: (item: FileItem) => void;
  onDeleteFile?: (id: string) => void;
  onRenameFile?: (id: string, newName: string) => void;
  className?: string;
  showSize?: boolean;
  showModified?: boolean;
}

/**
 * FileExplorer - Hierarchical file tree explorer
 */
const FileExplorer = forwardRef<HTMLDivElement, FileExplorerProps>(
  ({
    items,
    onSelectFile,
    onDeleteFile,
    onRenameFile,
    className,
    showSize = true,
    showModified = true,
  }, ref) => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpanded(newExpanded);
    };

    const formatSize = (bytes: number | undefined) => {
      if (!bytes) return '';
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let unitIndex = 0;

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }

      return `${size.toFixed(1)} ${units[unitIndex]}`;
    };

    const renderItem = (item: FileItem, level: number = 0) => {
      const isExpanded = expanded.has(item.id);
      const isSelected = selectedId === item.id;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <div
            className={cn(
              'flex items-center gap-2 px-2 py-1 rounded transition-colors cursor-pointer',
              isSelected && 'bg-primary/10 text-primary'
            )}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => {
              setSelectedId(item.id);
              onSelectFile?.(item);
            }}
          >
            {/* Expand Icon */}
            {item.type === 'folder' && hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.id);
                }}
                className="text-xs hover:bg-hover p-0.5 rounded"
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            ) : (
              <div className="w-4" />
            )}

            {/* Icon */}
            {item.icon ? (
              <span className="text-sm">{item.icon}</span>
            ) : item.type === 'folder' ? (
              <span className="text-sm">📁</span>
            ) : (
              <span className="text-sm">📄</span>
            )}

            {/* Name */}
            <span className="flex-1 text-sm truncate">{item.name}</span>

            {/* Size */}
            {showSize && item.size && (
              <span className="text-xs text-muted-foreground">
                {formatSize(item.size)}
              </span>
            )}

            {/* Actions */}
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
              {onDeleteFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(item.id);
                  }}
                  className="text-xs p-1 hover:bg-danger/10 text-danger rounded"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Children */}
          {item.type === 'folder' && isExpanded && hasChildren && (
            <div>
              {item.children!.map((child) =>
                renderItem(child, level + 1)
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-divider bg-background overflow-y-auto',
          className
        )}
        data-slot="file-explorer"
      >
        {items.length === 0 ? (
          <div className="flex items-center justify-center p-8 text-center text-muted-foreground text-sm">
            No files
          </div>
        ) : (
          <div className="p-2">
            {items.map((item) => renderItem(item, 0))}
          </div>
        )}
      </div>
    );
  }
);

FileExplorer.displayName = 'FileExplorer';

export { FileExplorer, type FileExplorerProps, type FileItem };
