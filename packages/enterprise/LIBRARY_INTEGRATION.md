# Library Integration Guide

This document outlines all third-party libraries integrated into the `@kinetic/enterprise` package and their usage patterns.

## Overview

The enterprise package uses a wrapper-pattern approach for popular libraries, providing consistent APIs while leveraging battle-tested solutions.

## Core Libraries

### 1. **Charts & Visualization**

#### @adobe/react-spectrum-charts
- **Purpose**: Declarative charting library based on Adobe's Spectrum design system
- **Component**: `SpectrumChart`
- **Features**:
  - Multiple chart types: Area, Bar, Line, Scatter, Donut
  - Accessibility-first design
  - 30+ locale support
  - Built on Vega/Vega-Lite

**Usage**:
```tsx
import { SpectrumChart } from '@kinetic/enterprise';

<SpectrumChart
  type="area"
  data={data}
  xAxis="date"
  yAxis={['revenue', 'users']}
  title="Revenue vs Users"
  showLegend
  showTooltip
/>
```

### 2. **Tables & Virtualization**

#### @tanstack/react-virtual
- **Purpose**: High-performance list/table virtualization
- **Component**: `VirtualizedTable`
- **Features**:
  - Renders only visible items (overscan buffer configurable)
  - Supports 1000s of rows efficiently
  - Smooth scrolling
  - Memory efficient

**Usage**:
```tsx
import { VirtualizedTable } from '@kinetic/enterprise';

<VirtualizedTable
  data={largeDataset}
  columns={[
    { id: 'name', header: 'Name', accessor: row => row.name },
    { id: 'email', header: 'Email', accessor: row => row.email }
  ]}
  rowHeight={40}
  containerHeight={500}
  keyExtractor={(row, i) => row.id || i}
/>
```

#### @tanstack/react-table
- **Purpose**: Headless table library for advanced features
- **Planned**: Advanced DataGrid component
- **Features**:
  - Sorting, filtering, pagination
  - Column resizing
  - Row selection

### 3. **Drag & Drop**

#### @dnd-kit
- **Purpose**: Modern drag-and-drop system
- **Component**: `KanbanBoard` (updated with @dnd-kit)
- **Features**:
  - Accessible keyboard support
  - Touch support
  - CSS transforms for performance
  - Sensor configuration

**Usage**:
```tsx
import { KanbanBoard } from '@kinetic/enterprise';

<KanbanBoard
  columns={kanbanColumns}
  onCardMove={(cardId, from, to) => handleMove(cardId, from, to)}
  onCardClick={(card, columnId) => handleClick(card, columnId)}
/>
```

### 4. **JSON Viewing**

#### @uiw/react-json-view
- **Purpose**: Interactive JSON tree viewer
- **Component**: `JSONViewer`
- **Features**:
  - Collapsible tree nodes
  - Copy to clipboard
  - Light/dark themes
  - Customizable display options

**Usage**:
```tsx
import { JSONViewer } from '@kinetic/enterprise';

<JSONViewer
  data={jsonData}
  collapsible
  dark={isDark}
  enableClipboard
  sortKeys
/>
```

### 5. **Rich Text Editing**

#### @tiptap/react + @tiptap/starter-kit
- **Purpose**: WYSIWYG editor with extensive features
- **Component**: `RichTextEditor`
- **Features**:
  - Bold, italic, code, strikethrough
  - Headings (H1-H3)
  - Lists (ordered and unordered)
  - Blockquotes
  - Code blocks
  - Link support

**Usage**:
```tsx
import { RichTextEditor } from '@kinetic/enterprise';

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start typing..."
  height="400px"
  readOnly={false}
/>
```

### 6. **Code Editing**

#### @monaco-editor/react
- **Purpose**: Microsoft's Monaco editor (VS Code editor)
- **Component**: `CodeEditor`
- **Features**:
  - Syntax highlighting for 15+ languages
  - Line numbers and minimap
  - Intelligent code completion ready
  - Light/dark themes
  - Read-only mode

**Supported Languages**:
- JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust
- SQL, HTML, CSS, JSON, YAML, XML, Bash, Dockerfile

**Usage**:
```tsx
import { CodeEditor } from '@kinetic/enterprise';

<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  theme="vs-dark"
  height={400}
  minimap
  lineNumbers
/>
```

## Planned Integrations

### 7. **Flow & Graph Visualization**
- **@xyflow/react**: React Flow for node-based editors
- **Component**: `FlowBuilder` (to be enhanced)
- **Use Cases**: Workflow builders, visual programming, dependency graphs

### 8. **Command Palette**
- **cmdk**: Fast command palette component
- **Use Cases**: Command search, keyboard shortcuts, navigation

### 9. **Tree Views**
- **react-arborist**: Large tree component
- **Use Cases**: File explorers, hierarchical data display

### 10. **State Management**
- **zustand**: Simple state management
- **jotai**: Primitive-based state management
- **Use Cases**: Application state, cross-component communication

### 11. **Forms & Validation**
- **react-hook-form**: Efficient form management
- **zod**: TypeScript-first schema validation
- **Use Cases**: Complex forms with validation

### 12. **Resizable Layouts**
- **react-resizable-panels**: Resizable panel system
- **Component**: `ResizableSidebar` (can be enhanced)
- **Use Cases**: Flexible layouts, workspace management

## Component Structure

All enterprise components follow this pattern:

```tsx
'use client';

import React, { forwardRef } from 'react';
import { BaseKineticComponent } from '@kinetic/react';
import { cn } from '../../utils';

interface ComponentProps {
  // Props from underlying library
  // Props for customization
  className?: string;
}

/**
 * ComponentName - Description using underlying library
 * Key features and capabilities
 */
const ComponentName = forwardRef<HTMLDivElement, ComponentProps>(
  (props, ref) => {
    // Component implementation
    return <div ref={ref}>{/* content */}</div>;
  }
);

ComponentName.displayName = 'ComponentName';

export { ComponentName, type ComponentProps };
```

## Performance Considerations

### Virtualization
- Use `VirtualizedTable` for datasets with 100+ rows
- Overscan buffer: 10 items (configurable)
- Memory usage: O(n) visible items, not O(total items)

### Drag & Drop
- @dnd-kit uses CSS transforms for 60fps animations
- Sensor debouncing prevents over-firing
- Touch and keyboard support built-in

### Code Editor
- Monaco loads 1-2MB lazily
- Syntax highlighting is fast for most languages
- Consider lazy loading for performance-critical apps

### Charts
- Spectrum Charts renders efficiently for up to 10k data points
- Vega handles aggregation and filtering
- Consider data aggregation for real-time data

## Browser Support

| Library | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| @adobe/react-spectrum-charts | ✓ | ✓ | ✓ | ✓ |
| @tanstack/react-virtual | ✓ | ✓ | ✓ | ✓ |
| @dnd-kit | ✓ | ✓ | ✓ | ✓ |
| @uiw/react-json-view | ✓ | ✓ | ✓ | ✓ |
| @tiptap/react | ✓ | ✓ | ✓ | ✓ |
| @monaco-editor/react | ✓ | ✓ | ✓ | ✓ |

## Dependency Tree

```
@kinetic/enterprise
├── @kinetic/react (base components)
├── @kinetic/styles (design tokens)
├── @adobe/react-spectrum-charts
│   ├── vega
│   ├── vega-lite
│   └── d3
├── @tanstack/react-virtual (14kb)
├── @dnd-kit (35kb core)
│   ├── @dnd-kit/core
│   ├── @dnd-kit/sortable
│   ├── @dnd-kit/utilities
│   └── @dnd-kit/modifiers
├── @uiw/react-json-view (36kb)
├── @tiptap/react (50kb)
│   └── @tiptap/starter-kit
├── @monaco-editor/react (2mb)
│   └── monaco-editor (engine)
├── zustand (2kb)
├── jotai (7kb)
├── react-hook-form (9kb)
├── zod (16kb)
├── @xyflow/react (planned)
├── cmdk (planned)
└── react-arborist (planned)
```

## Migration Guide

### From Custom Implementations

If you previously used custom implementations, here's how to migrate:

#### Table Virtualization
```tsx
// Before: Custom virtualization hook
// After: Use VirtualizedTable component
import { VirtualizedTable } from '@kinetic/enterprise';
```

#### Kanban Board
```tsx
// Before: HTML5 drag-and-drop
// After: @dnd-kit-powered component
import { KanbanBoard } from '@kinetic/enterprise';
```

#### Rich Text
```tsx
// Before: contentEditable div
// After: Tiptap editor
import { RichTextEditor } from '@kinetic/enterprise';
```

## Troubleshooting

### Monaco Editor Not Loading
- Check that `@monaco-editor/react` is installed
- Ensure correct Webpack/bundler config for Monaco
- Monaco requires Web Workers enabled

### @dnd-kit Drag Not Working
- Verify `DndContext` is wrapping the component
- Check sensor configuration (default: PointerSensor with 8px threshold)
- Ensure CSS transforms aren't conflicting

### Tiptap Editor Content Not Appearing
- Verify `prose` CSS classes are imported
- Check that Tailwind typography plugin is configured
- Ensure initial content is valid HTML

### Spectrum Charts Not Displaying
- Verify data format matches expected schema
- Check browser console for Vega errors
- Ensure required theme dependencies are installed

## Contributing

When adding new library integrations:

1. Choose libraries that solve real problems
2. Wrap in consistent component API
3. Export TypeScript types
4. Add comprehensive JSDoc comments
5. Update this guide
6. Add to COMPONENTS.md registry

## Resources

- [Adobe React Spectrum Charts Docs](https://opensource.adobe.com/react-spectrum-charts/)
- [TanStack Virtual Docs](https://tanstack.com/virtual/latest)
- [dnd-kit Docs](https://docs.dndkit.com/)
- [Tiptap Docs](https://tiptap.dev/)
- [Monaco Editor Docs](https://microsoft.github.io/monaco-editor/)
- [TanStack Table Docs](https://tanstack.com/table/latest)
