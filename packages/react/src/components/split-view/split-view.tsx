"use client";

import type {ReactNode} from "react";
import React, {useState, useRef, useCallback} from "react";

interface SplitViewProps {
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  defaultSizes?: number[];
  onResize?: (sizes: number[]) => void;
}

export const SplitView = React.forwardRef<HTMLDivElement, SplitViewProps>(
  ({children, className = "", direction = "horizontal", defaultSizes, onResize, ...delegated}, ref) => {
    const childArray = React.Children.toArray(children).filter(React.isValidElement);
    const numPanes = childArray.length;
    const defaultPaneSizes = defaultSizes || Array(numPanes).fill(100 / numPanes);
    const [sizes, setSizes] = useState(defaultPaneSizes);
    const isDragging = useRef<{active: boolean; index: number}>({active: false, index: 0});
    const startPos = useRef(0);
    const startSizes = useRef<number[]>([]);
    const containerRef = ref as React.RefObject<HTMLDivElement>;

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging.current.active || !containerRef.current) return;
      
      const delta = direction === "horizontal" ? e.clientX - startPos.current : e.clientY - startPos.current;
      const newSizes = [...startSizes.current];
      const containerSize = direction === "horizontal" 
        ? containerRef.current.clientWidth
        : containerRef.current.clientHeight;
      
      if (containerSize > 0) {
        const percentDelta = (delta / containerSize) * 100;
        const index = isDragging.current.index;
        if (newSizes[index] !== undefined) {
          newSizes[index] = Math.max(10, (newSizes[index] ?? 50) + percentDelta);
        }
        if (index + 1 < newSizes.length && newSizes[index + 1] !== undefined) {
          newSizes[index + 1] = Math.max(10, (newSizes[index + 1] ?? 50) - percentDelta);
        }
        setSizes(newSizes);
        onResize?.(newSizes);
      }
    }, [direction, onResize]);

    const handleMouseUp = useCallback(() => {
      isDragging.current.active = false;
      document.removeEventListener("mousemove", handleMouseMove);
      // eslint-disable-next-line react-hooks/immutability
      document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((index: number, e: React.MouseEvent) => {
      isDragging.current = {active: true, index};
      startPos.current = direction === "horizontal" ? e.clientX : e.clientY;
      startSizes.current = [...sizes];
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }, [direction, sizes, handleMouseMove, handleMouseUp]);
    
    // Suppress unused arg warning
    void delegated;

    return (
      <div
        ref={containerRef}
        className={`h-full w-full flex ${direction === "vertical" ? "flex-col" : "flex-row"} ${className}`}
        data-component="split-view"
      >
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={`pane-${index}`}>
            {React.isValidElement(child) && (
              <>
                <div style={{flex: `${sizes[index]} 0`}} className="overflow-hidden">
                  {child}
                </div>
                {index < numPanes - 1 && (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <button
                    type="button"
                    role="separator"
                    aria-orientation={direction === "vertical" ? "horizontal" : "vertical"}
                    className={`${direction === "horizontal" ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"} bg-divider hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}
                    onMouseDown={(e) => handleMouseDown(index, e)}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

SplitView.displayName = "SplitView";

interface SplitPaneProps {
  children: ReactNode;
  className?: string;
  minSize?: number;
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  ({children, className = ""}, ref) => (
    <div
      ref={ref}
      className={`h-full w-full overflow-auto ${className}`}
      data-component="split-pane"
    >
      {children}
    </div>
  ),
);

SplitPane.displayName = "SplitPane";
