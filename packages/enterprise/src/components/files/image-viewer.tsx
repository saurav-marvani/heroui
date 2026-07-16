'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  showToolbar?: boolean;
  zoomable?: boolean;
  rotatable?: boolean;
  downloadable?: boolean;
}

/**
 * ImageViewer - Image viewer with zoom, rotate, and download capabilities
 */
const ImageViewer = forwardRef<HTMLDivElement, ImageViewerProps>(
  (
    {
      src,
      alt = 'Image',
      className,
      width,
      height,
      showToolbar = true,
      zoomable = true,
      rotatable = true,
      downloadable = true,
    },
    ref
  ) => {
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
    const handleRotate = () => setRotation((r) => (r + 90) % 360);
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = src;
      link.download = alt;
      link.click();
    };
    const handleReset = () => {
      setZoom(100);
      setRotation(0);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-lg border border-divider bg-background overflow-hidden',
          className
        )}
        data-slot="image-viewer"
      >
        {/* Toolbar */}
        {showToolbar && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-divider bg-muted/30">
            {zoomable && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleZoomOut}
                  className="px-2 py-1 text-sm rounded hover:bg-hover transition-colors"
                  disabled={zoom <= 50}
                >
                  −
                </button>
                <span className="text-sm w-12 text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="px-2 py-1 text-sm rounded hover:bg-hover transition-colors"
                  disabled={zoom >= 200}
                >
                  +
                </button>
              </div>
            )}

            <div className="flex-1" />

            {rotatable && (
              <button
                onClick={handleRotate}
                className="px-2 py-1 text-sm rounded hover:bg-hover transition-colors"
                title="Rotate 90°"
              >
                ↻
              </button>
            )}

            {downloadable && (
              <button
                onClick={handleDownload}
                className="px-2 py-1 text-sm rounded hover:bg-hover transition-colors"
                title="Download"
              >
                ↓
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-2 py-1 text-sm rounded hover:bg-hover transition-colors"
              title="Reset"
            >
              ⟲
            </button>
          </div>
        )}

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center overflow-auto bg-muted/10">
          <div
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-4 py-2 border-t border-divider bg-muted/20 text-xs text-muted-foreground">
          {alt} • Zoom: {zoom}% • Rotation: {rotation}°
        </div>
      </div>
    );
  }
);

ImageViewer.displayName = 'ImageViewer';

export { ImageViewer, type ImageViewerProps };
