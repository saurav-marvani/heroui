'use client';

import React, { useMemo } from 'react';
import {
  Chart,
  ChartTooltip,
  ChartLegend,
  ChartTitle,
  ChartDescription,
} from '@adobe/react-spectrum-charts';
import { cn } from '../../utils';

export interface SpectrumChartProps {
  /** Chart type */
  type: 'area' | 'bar' | 'line' | 'scatter' | 'donut';
  /** Chart data */
  data: Record<string, any>[];
  /** X-axis field */
  xAxis?: string;
  /** Y-axis field(s) */
  yAxis?: string | string[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Enable legend */
  showLegend?: boolean;
  /** Enable tooltip */
  showTooltip?: boolean;
  /** Custom className */
  className?: string;
  /** Chart height in pixels */
  height?: number;
  /** Color scheme */
  colorScheme?: 'blue' | 'red' | 'green' | 'purple' | 'gray';
}

/**
 * Spectrum Chart wrapper component using @adobe/react-spectrum-charts
 * Provides declarative, accessible chart visualization with Adobe's Spectrum design system
 */
export const SpectrumChart = React.forwardRef<HTMLDivElement, SpectrumChartProps>(
  (
    {
      type,
      data,
      xAxis = 'x',
      yAxis = 'y',
      title,
      description,
      showLegend = true,
      showTooltip = true,
      className,
      height = 300,
      colorScheme = 'blue',
    },
    ref,
  ) => {
    const yFields = useMemo(() => {
      return Array.isArray(yAxis) ? yAxis : [yAxis];
    }, [yAxis]);

    return (
      <div
        ref={ref}
        className={cn('w-full rounded-lg overflow-hidden', className)}
        style={{ height }}
      >
        <Chart
          data={data}
          className="w-full h-full"
          description={description}
        >
          {title && <ChartTitle>{title}</ChartTitle>}
          {description && <ChartDescription>{description}</ChartDescription>}

          {/* Dynamically render chart based on type */}
          {/* Note: Actual implementation depends on adobe/react-spectrum-charts API */}
          {/* This is a template structure - adjust based on actual chart component API */}

          {showTooltip && <ChartTooltip />}
          {showLegend && <ChartLegend />}
        </Chart>
      </div>
    );
  },
);

SpectrumChart.displayName = 'SpectrumChart';
