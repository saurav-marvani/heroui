# @kinetic/enterprise Quick Start Guide

Get up and running with @kinetic/enterprise in minutes.

## Installation

### Step 1: Install Package
```bash
npm install @kinetic/enterprise @kinetic/react @kinetic/styles
# or
pnpm add @kinetic/enterprise @kinetic/react @kinetic/styles
# or
yarn add @kinetic/enterprise @kinetic/react @kinetic/styles
```

### Step 2: Setup Tailwind CSS
Ensure your project uses Tailwind CSS v4:

```bash
npm install -D tailwindcss@latest
```

### Step 3: Configure globals.css
Add design tokens to your `globals.css`:

```css
@import 'tailwindcss';

@theme {
  /* Colors */
  --color-primary: oklch(64.07% 0.235 29.23);
  --color-background: white;
  --color-foreground: rgb(23 23 23);
  --color-surface: rgb(245 245 245);
  --color-muted: rgb(229 229 229);
  --color-divider: rgb(229 229 229);
  --color-primary-foreground: white;
  
  /* Semantic Colors */
  --color-success: oklch(60.96% 0.184 142.48);
  --color-danger: oklch(60.12% 0.257 29.21);
  --color-warning: oklch(73.56% 0.206 70.08);
  --color-muted-foreground: rgb(115 115 115);
  
  /* Fonts */
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  
  --radius: 0.5rem;
}
```

## Basic Usage

### Simple App Shell
```tsx
import { AppShell, Sidebar, SidebarItem } from '@kinetic/enterprise';

export default function App() {
  return (
    <AppShell
      navbar={<div className="px-6 py-3 font-semibold">My App</div>}
      sidebar={
        <Sidebar>
          <SidebarItem label="Dashboard" icon="📊" active />
          <SidebarItem label="Users" icon="👥" />
          <SidebarItem label="Settings" icon="⚙️" />
        </Sidebar>
      }
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>
    </AppShell>
  );
}
```

### Data Grid
```tsx
import { DataGrid } from '@kinetic/enterprise';

const columns = [
  { id: 'name', header: 'Name', accessor: (row) => row.name },
  { id: 'email', header: 'Email', accessor: (row) => row.email },
  { id: 'status', header: 'Status', accessor: (row) => row.status },
];

const data = [
  { id: 1, name: 'John', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane', email: 'jane@example.com', status: 'Pending' },
];

export default function DataTable() {
  return (
    <DataGrid
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      selectable
      striped
    />
  );
}
```

### Chat Interface
```tsx
import { AIChat } from '@kinetic/enterprise';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date(),
      },
    ]);

    // Call your AI API here
    // const response = await fetch('/api/chat', { ... });
  };

  return (
    <AIChat
      messages={messages}
      onSendMessage={handleSendMessage}
      placeholder="Ask me anything..."
    />
  );
}
```

### Dashboard
```tsx
import { DashboardLayout, DashboardCard } from '@kinetic/enterprise';

export default function Dashboard() {
  return (
    <DashboardLayout
      header={<h1 className="text-xl font-bold">Analytics</h1>}
      layout="sidebar-left"
    >
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard
          title="Revenue"
          description="Total this month"
        >
          <div className="text-3xl font-bold">$45,231</div>
        </DashboardCard>
        
        <DashboardCard
          title="Users"
          description="Active users"
        >
          <div className="text-3xl font-bold">12,540</div>
        </DashboardCard>
        
        <DashboardCard
          title="Growth"
          description="Month over month"
        >
          <div className="text-3xl font-bold">+23%</div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
```

### Form Wizard
```tsx
import { FormWizard } from '@kinetic/enterprise';

export default function SignupWizard() {
  const steps = [
    {
      id: 'personal',
      title: 'Personal Info',
      content: (
        <div className="space-y-4">
          <input placeholder="Full Name" className="w-full px-3 py-2 border rounded" />
          <input placeholder="Email" className="w-full px-3 py-2 border rounded" />
        </div>
      ),
    },
    {
      id: 'account',
      title: 'Account',
      content: (
        <div className="space-y-4">
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
          <input type="password" placeholder="Confirm Password" className="w-full px-3 py-2 border rounded" />
        </div>
      ),
    },
  ];

  return (
    <FormWizard
      steps={steps}
      onComplete={() => console.log('Done!')}
    />
  );
}
```

## Common Patterns

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Loading State
```tsx
<DashboardCard loading>
  Content here
</DashboardCard>
```

### Error State
```tsx
<DashboardCard error="Failed to load data">
  Content here
</DashboardCard>
```

### Custom Styling
```tsx
<DataGrid
  className="custom-grid"
  data={data}
  columns={columns}
  keyExtractor={(row) => row.id}
/>
```

### Keyboard Shortcuts
```tsx
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      setIsOpen(true);
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

return <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} />;
```

## Available Components by Category

### Navigation
- `AppShell` - Main container
- `Sidebar` - Side navigation
- `NavigationRail` - Icon navigation
- `BreadcrumbNavigation` - Path navigation
- `CommandPalette` - Command search

### Data Display
- `DataGrid` - Sortable, filterable grid
- `VirtualizedTable` - Large table with scrolling
- `Timeline` - Event timeline
- `KanbanBoard` - Drag-and-drop board
- `JSONViewer` - JSON tree viewer

### Forms
- `TagInput` - Multi-tag input
- `DateRangePicker` - Date selection
- `ColorPicker` - Color selection
- `FormWizard` - Multi-step form

### Editors
- `RichTextEditor` - WYSIWYG editing
- `CodeEditor` - Code highlighting
- `JSONEditor` - JSON editing
- `MarkdownEditor` - Markdown editing

### AI
- `AIChat` - Chat interface
- `ConversationList` - Conversation sidebar
- `MessageBubble` - Message display

### Dashboard
- `DashboardLayout` - Container layout
- `DashboardCard` - Card component

### Files
- `FileExplorer` - File tree
- `ImageViewer` - Image display

### Utilities
- `VirtualScroller` - Virtual list

## TypeScript Support

All components are fully typed:

```tsx
import type { DataGridProps, GridColumn } from '@kinetic/enterprise';

const gridProps: DataGridProps = {
  data: [],
  columns: [],
  keyExtractor: (row) => row.id,
};
```

## Performance Tips

1. **Use VirtualScroller for large lists**
   ```tsx
   <VirtualScroller items={items} itemHeight={40} renderItem={renderRow} />
   ```

2. **Memoize components**
   ```tsx
   const MemoizedCard = React.memo(DashboardCard);
   ```

3. **Lazy load images**
   ```tsx
   <img src={url} loading="lazy" />
   ```

4. **Use pagination for large datasets**
   ```tsx
   <DataGrid pagination={{ pageSize: 50, ... }} />
   ```

## Customization

### Color Theming
Edit `globals.css` to customize colors:

```css
@theme {
  --color-primary: oklch(65% 0.23 29.23);
  --color-danger: oklch(60% 0.26 29.21);
}
```

### Spacing
Use Tailwind's spacing scale:

```tsx
<div className="p-4 gap-2 my-2"> {/* 16px padding, 8px gap */}
```

### Fonts
Install and configure fonts in layout.tsx:

```tsx
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });
```

## Troubleshooting

### Styles not applying
- Ensure Tailwind CSS is installed and configured
- Check that globals.css is imported in your root layout
- Verify design tokens are defined in @theme

### Components not rendering
- Check TypeScript errors
- Ensure all required props are provided
- Review console for warnings

### Performance issues
- Use VirtualScroller for large lists
- Memoize components that don't need re-renders
- Check for unnecessary re-renders in DevTools

## Next Steps

- Read the [full documentation](./README.md)
- Explore the [component registry](./COMPONENTS.md)
- Check the [implementation guide](./IMPLEMENTATION_GUIDE.md)
- Review individual component examples

## Getting Help

- Check component JSDoc comments
- Review existing component implementations
- Check the component registry for similar components
- Read the implementation guide for patterns

---

Happy building! 🚀
