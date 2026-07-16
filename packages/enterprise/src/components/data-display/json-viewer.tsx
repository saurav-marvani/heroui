'use client';

import React, { forwardRef, useMemo } from 'react';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { cn } from '../../utils';

interface JSONViewerProps {
  /** JSON data to display */
  data: unknown;
  /** Custom className */
  className?: string;
  /** Enable collapsible tree nodes */
  collapsible?: boolean;
  /** Initial collapsed state (true = collapsed, number = depth) */
  collapsed?: boolean | number;
  /** Show quote marks around strings */
  quotes?: boolean;
  /** Use dark theme */
  dark?: boolean;
  /** Enable copy to clipboard button */
  enableClipboard?: boolean;
  /** Sort object keys alphabetically */
  sortKeys?: boolean;
  /** Maximum string length before truncation */
  stringMaxLength?: number;
}

/**
 * JSONViewer - Display JSON data with @uiw/react-json-view
 * Provides interactive tree view with collapsible nodes and clipboard support
 */
const JSONViewer = forwardRef<HTMLDivElement, JSONViewerProps>(
  (
    {
      data,
      className,
      collapsible = true,
      collapsed = false,
      quotes = true,
      dark = false,
      enableClipboard = true,
      sortKeys = false,
      stringMaxLength = 50,
    },
    ref,
  ) => {
    // Memoize the theme selection
    const theme = useMemo(() => (dark ? darkTheme : lightTheme), [dark]);

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-divider bg-background overflow-auto',
          'max-h-96 p-4',
          className,
        )}
        data-slot="json-viewer"
      >
        <JsonView
          value={data}
          style={theme}
          collapsed={collapsed}
          enableClipboard={enableClipboard}
          quotesOnKeys={quotes}
          collapseStringsAfterLength={stringMaxLength}
          sortKeys={sortKeys}
          displayObjectSize={true}
          displayDataTypes={true}
          indentWidth={2}
        />
      </div>
    );
  },
);

JSONViewer.displayName = 'JSONViewer';

export { JSONViewer, type JSONViewerProps };
