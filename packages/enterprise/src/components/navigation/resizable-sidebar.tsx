'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState, useRef } from 'react';
import { cn } from '../../utils';

interface ResizableSidebarProps {
  children: ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  onResize?: (width: number) => void;
  className?: string;
  side?: 'left' | 'right';
}

/**
 * ResizableSidebar - Sidebar with draggable resize handle
 * Allows users to adjust width within min/max constraints
 */
const ResizableSidebar = forwardRef<HTMLDivElement, ResizableSidebarProps>(
  (
    {
      children,
      minWidth = 200,
      maxWidth = 500,
      defaultWidth = 300,
      onResize,
      className,
      side = 'left',
    },
    ref
  ) => {
    const [width, setWidth] = useState(defaultWidth);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newWidth: number;

        if (side === 'left') {
          newWidth = e.clientX - rect.left;
        } else {
          newWidth = rect.right - e.clientX;
        }

        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        setWidth(newWidth);
        onResize?.(newWidth);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, minWidth, maxWidth, side, onResize]);

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative flex bg-surface',
          side === 'left' ? 'flex-row' : 'flex-row-reverse',
          className
        )}
        style={{ width }}
        data-slot="resizable-sidebar"
      >
        <div
          ref={ref}
          className="flex-1 overflow-auto"
        >
          {children}
        </div>

        <div
          onMouseDown={handleMouseDown}
          className={cn(
            'w-1 cursor-col-resize transition-colors hover:bg-primary',
            isDragging && 'bg-primary',
            isDragging ? 'bg-primary' : 'bg-divider'
          )}
          aria-label="Resize sidebar"
          role="separator"
        />
      </div>
    );
  }
);

ResizableSidebar.displayName = 'ResizableSidebar';

export { ResizableSidebar, type ResizableSidebarProps };
