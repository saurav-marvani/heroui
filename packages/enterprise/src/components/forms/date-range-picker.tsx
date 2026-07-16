'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  placeholder?: string;
  presets?: { label: string; range: DateRange }[];
}

/**
 * DateRangePicker - Date range selection component
 * Includes calendar with preset ranges
 */
const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({
    value,
    onChange,
    disabled,
    className,
    placeholder = 'Select date range',
    presets,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [tempRange, setTempRange] = useState<DateRange>(value || {});

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      // Empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} />);
      }

      // Days of month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isDisabled = disabled?.(date);
        const isInRange =
          tempRange.from &&
          tempRange.to &&
          date >= tempRange.from &&
          date <= tempRange.to;
        const isStart = tempRange.from?.toDateString() === date.toDateString();
        const isEnd = tempRange.to?.toDateString() === date.toDateString();

        days.push(
          <button
            key={day}
            onClick={() => {
              if (!isDisabled) {
                if (!tempRange.from) {
                  setTempRange({ from: date });
                } else if (!tempRange.to) {
                  if (date >= tempRange.from) {
                    setTempRange({ ...tempRange, to: date });
                  } else {
                    setTempRange({ from: date, to: tempRange.from });
                  }
                } else {
                  setTempRange({ from: date });
                }
              }
            }}
            disabled={isDisabled}
            className={cn(
              'p-2 text-sm rounded transition-colors',
              isDisabled && 'opacity-50 cursor-not-allowed',
              isStart || isEnd
                ? 'bg-primary text-primary-foreground'
                : isInRange
                  ? 'bg-primary/20'
                  : 'hover:bg-hover'
            )}
          >
            {day}
          </button>
        );
      }

      return days;
    };

    const formatDate = (date?: Date) => {
      if (!date) return '';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    };

    const displayText =
      value?.from && value?.to
        ? `${formatDate(value.from)} - ${formatDate(value.to)}`
        : placeholder;

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        data-slot="date-range-picker"
      >
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-divider rounded-lg text-left text-sm hover:bg-hover transition-colors"
        >
          {displayText}
        </button>

        {/* Popup */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 z-50 w-80 bg-background border border-divider rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Presets */}
              {presets && (
                <div className="col-span-2 pb-2 border-b border-divider">
                  <div className="text-xs font-semibold mb-2 text-muted-foreground">
                    Quick Select
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          onChange(preset.range);
                          setIsOpen(false);
                        }}
                        className="text-xs px-2 py-1 rounded hover:bg-hover transition-colors text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                      )
                    }
                    className="text-sm hover:bg-hover p-1 rounded"
                  >
                    ←
                  </button>
                  <span className="text-sm font-semibold">
                    {currentMonth.toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                      )
                    }
                    className="text-sm hover:bg-hover p-1 rounded"
                  >
                    →
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center font-semibold p-1 text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-2 mt-4 border-t border-divider pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-3 py-2 rounded border border-divider hover:bg-hover transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onChange(tempRange);
                  setIsOpen(false);
                }}
                className="flex-1 px-3 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';

export { DateRangePicker, type DateRangePickerProps, type DateRange };
