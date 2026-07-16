'use client';

import React, { forwardRef, useRef, useState } from 'react';
import { cn } from '../../utils';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  className?: string;
  presets?: string[];
  showAlpha?: boolean;
  showHex?: boolean;
}

/**
 * ColorPicker - Color selection component with palette and custom input
 */
const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({
    value = '#000000',
    onChange,
    className,
    presets = [
      '#EF4444',
      '#F97316',
      '#EAB308',
      '#22C55E',
      '#06B6D4',
      '#3B82F6',
      '#8B5CF6',
      '#EC4899',
    ],
    showAlpha = false,
    showHex = true,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      setInputValue(color);
      onChange(color);
    };

    const handlePresetClick = (color: string) => {
      setInputValue(color);
      onChange(color);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        data-slot="color-picker"
      >
        {/* Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-divider rounded-lg hover:bg-hover transition-colors"
        >
          <div
            className="w-6 h-6 rounded border border-divider"
            style={{ backgroundColor: value }}
          />
          {showHex && (
            <span className="text-sm font-mono">{value.toUpperCase()}</span>
          )}
        </button>

        {/* Popup */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 z-50 bg-background border border-divider rounded-lg shadow-lg p-4 w-64">
            {/* Color Presets */}
            {presets.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Presets
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((color) => (
                    <button
                      key={color}
                      onClick={() => handlePresetClick(color)}
                      className={cn(
                        'w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110',
                        value === color
                          ? 'border-primary'
                          : 'border-transparent'
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Color Input */}
            <div className="border-t border-divider pt-4">
              <label className="text-xs font-semibold text-muted-foreground block mb-2">
                Custom Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={handleColorChange}
                  className="w-10 h-10 rounded border border-divider cursor-pointer"
                />
                {showHex && (
                  <input
                    type="text"
                    value={inputValue.toUpperCase()}
                    onChange={(e) => {
                      const hex = e.target.value.startsWith('#')
                        ? e.target.value
                        : `#${e.target.value}`;
                      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                        onChange(hex);
                      }
                      setInputValue(hex);
                    }}
                    className="flex-1 px-3 py-2 border border-divider rounded text-sm font-mono"
                    placeholder="#000000"
                  />
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Done
            </button>
          </div>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

export { ColorPicker, type ColorPickerProps };
