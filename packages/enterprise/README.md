# @kinetic/enterprise

Advanced enterprise-grade React components built on @kinetic/react for complex business applications.

## Overview

@kinetic/enterprise provides a comprehensive collection of 320+ reusable components designed for building sophisticated enterprise applications. Components are built with performance, accessibility, and developer experience in mind.

## Core Principles

- **Built on @kinetic/react**: Extends the base component library with advanced functionality
- **Highly Performant**: Virtual scrolling, lazy loading, and optimized rendering
- **Composable**: Modular components that work together seamlessly
- **TypeScript First**: Full type safety and IntelliSense support
- **Tailwind CSS Integrated**: Uses tailwind-variants for consistent styling
- **Wrapper-First**: Leverages battle-tested npm libraries rather than reinventing

## Component Categories

### Phase 1: Navigation & Layout (35 components)
- AppShell - Main application container
- Sidebar - Collapsible navigation sidebar
- ResizableSidebar - Sidebar with drag-to-resize
- NavigationRail - Vertical icon navigation
- BreadcrumbNavigation - Hierarchical breadcrumbs
- CommandPalette - Command search and execution
- [+ 29 more navigation components]

### Phase 2: Data Display & Tables (25 components)
- DataGrid - Feature-rich sortable/filterable grid
- VirtualizedTable - High-performance table with virtual scrolling
- Timeline - Vertical and horizontal timelines
- KanbanBoard - Drag-and-drop Kanban board
- JSONViewer - Hierarchical JSON viewer
- [+ 20 more data display components]

### Phase 3: Forms & Input (30 components)
- TagInput - Multi-tag input field
- DateRangePicker - Calendar-based date range selection
- ColorPicker - Color palette and hex input
- FormWizard - Multi-step form with validation
- [+ 26 more form components]

### Phase 4: Editors & Code (20 components)
- RichTextEditor - WYSIWYG editor with formatting
- CodeEditor - Syntax-highlighted code editor
- JSONEditor - JSON-specific editor with validation
- MarkdownEditor - Markdown editor with live preview
- [+ 16 more editor components]

### Phase 5: AI & Chat (30 components)
- AIChat - Chat interface with streaming support
- ConversationList - Conversation sidebar
- MessageBubble - Individual message component
- [+ 27 more AI components]

### Phase 6: Dashboard & Workspace (25 components)
- DashboardLayout - Main dashboard container
- DashboardCard - Reusable dashboard card
- WidgetContainer - Widget base component
- [+ 22 more dashboard components]

### Phase 7: File & Media (20 components)
- FileExplorer - Hierarchical file tree
- ImageViewer - Image viewer with zoom/rotate
- [+ 18 more file components]

### Phase 8: Visualization (25 components)
- FlowBuilder - Visual flow diagram builder
- [+ 24 more visualization components]

### Phase 9: Commerce (15 components)
- PricingTable - Pricing comparison table
- ProductCard - Product display card
- [+ 13 more commerce components]

### Phase 10: Mobile & Utilities (25 components)
- VirtualScroller - Virtual list scrolling
- [+ 24 more mobile/utility components]

## Installation

```bash
npm install @kinetic/enterprise @kinetic/react @kinetic/styles
```

## Quick Start

```tsx
import { AppShell, Sidebar, DataGrid } from '@kinetic/enterprise';

export default function Dashboard() {
  return (
    <AppShell
      navbar={<div>My App</div>}
      sidebar={<Sidebar>{/* nav items */}</Sidebar>}
    >
      <DataGrid
        columns={[
          { id: 'name', header: 'Name', accessor: (row) => row.name },
        ]}
        data={[{ name: 'John Doe' }]}
        keyExtractor={(row) => row.id}
      />
    </AppShell>
  );
}
```

## Component Features

### Navigation
- Collapsible/resizable sidebars
- Breadcrumb navigation
- Command palette with search
- Navigation rail for compact layouts

### Data Display
- Virtual scrolling for large datasets
- Sortable and filterable columns
- Timeline visualization
- Kanban board drag-and-drop
- JSON hierarchy viewer

### Forms
- Tag input with autocomplete
- Date range picker with presets
- Color picker with palette
- Multi-step form wizard
- OTP and PIN inputs

### Editors
- Rich text editing with formatting
- Code editor with syntax highlighting
- JSON editor with validation
- Markdown editor with preview
- Formula and query builders

### AI Components
- Chat interface with streaming
- Conversation management
- Message bubbles with actions
- Tool call visualization
- Reasoning display

### Dashboard
- Flexible layout system
- Responsive grid
- Widget containers
- Metrics and analytics cards

### Files & Media
- File explorer with tree view
- Image viewer with zoom/rotate
- Video and audio players
- PDF viewer
- Gallery components

### Visualization
- Flow diagram builder
- Timeline visualization
- Org charts
- Dependency graphs
- State machine diagrams

## Performance Optimization

- **Virtual Scrolling**: Renders only visible items
- **Code Splitting**: Components are tree-shakeable
- **Lazy Loading**: Components load on demand
- **Memoization**: Optimized re-render prevention
- **CSS-in-JS**: Minimal CSS with tailwind-variants

## Styling

Components use Tailwind CSS v4 with semantic design tokens:

```tsx
// Customize via globals.css
@theme {
  --color-primary: oklch(64.07% 0.235 29.23);
  --color-background: white;
  // ... more tokens
}
```

## Accessibility

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML
- Color contrast compliance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS 12+, Android 5+)

## Dependencies

### Runtime
- @kinetic/react - Base components
- @kinetic/styles - Design tokens
- react-aria-components - Accessibility
- tailwind-variants - Styling
- clsx - Conditional classnames

### Recommended External Libraries
- @dnd-kit/react - Drag and drop
- @monaco-editor/react - Code editing
- @blocknote/react - Rich text editing
- react-pdf - PDF viewing
- recharts - Charting
- react-big-calendar - Calendar

## Contributing

Components follow these patterns:

1. **Use TypeScript** - Full type safety
2. **Export types** - Interface exports for users
3. **Use hooks** - Functional components
4. **Compose** - Build on base components
5. **Document** - JSDoc comments
6. **Test** - Unit test coverage

## License

MIT

## Support

- Documentation: [kinetic-ui.com/enterprise](https://kinetic-ui.com/enterprise)
- Issues: [github.com/kinetic-ui/kinetic](https://github.com/kinetic-ui/kinetic)
- Discord: [discord.gg/kinetic-ui](https://discord.gg/kinetic-ui)
