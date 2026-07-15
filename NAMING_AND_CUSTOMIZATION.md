# Kinetic UI - Naming Convention & Customization Guide

## Current Naming Structure

### Package Naming Convention
```
@kinetic/{category}

Examples:
✓ @kinetic/react           (Main library)
✓ @kinetic/styles          (Theme & variants)
✓ @kinetic/standard        (Lint & code standards)
✓ @kinetic/primitives      (Headless components)
✓ @kinetic/forms           (Form utilities)
```

### File & Folder Naming
```
Pattern: kebab-case for files/folders

✓ components/button-group/
✓ components/card-item/
✓ components/select-item/
✓ button-group.tsx
✓ button-group.styles.ts
```

---

## What Should Be Renamed When Adding Features

### 1. Component Files

#### New Component Structure
```
packages/react/src/components/{component-name}/
├── {component-name}.tsx                    # Main component
├── {component-name}.stories.tsx            # Storybook stories
├── {component-name}.test.tsx               (Optional)
├── {component-name}.types.ts               (Optional)
├── index.ts                                # Exports

packages/styles/src/components/{component-name}/
├── {component-name}.styles.ts              # Variant definitions
├── index.ts                                # Export styles
```

#### Naming Rules
- Use **kebab-case** for file/folder names
- Use **PascalCase** for component names in code
- Use **camelCase** for export names and variants
- All internal imports use **@kinetic** scope

#### Example: Adding a New "DataTable" Component
```typescript
// File: packages/react/src/components/data-table/data-table.tsx
import type { DataTableVariants } from "@kinetic/styles";
import { dataTableVariants } from "@kinetic/styles";

export function DataTable({ variant = "default", ...props }) {
  const classes = dataTableVariants({ variant });
  return <div className={classes.base}>{/* ... */}</div>;
}

// File: packages/react/src/components/data-table/index.ts
export { DataTable } from "./data-table";
export type { DataTableProps } from "./data-table";
export { dataTableVariants } from "@kinetic/styles";

// File: packages/styles/src/components/data-table/data-table.styles.ts
import { tv } from "tailwind-variants";

export const dataTableVariants = tv({
  slots: {
    base: "data-table",
    header: "data-table__header",
    body: "data-table__body",
    row: "data-table__row",
    cell: "data-table__cell",
  },
  variants: {
    variant: {
      default: {
        base: "data-table--default",
      },
      striped: {
        base: "data-table--striped",
      },
    },
  },
});
```

### 2. CSS/Tailwind Classes

#### Class Naming Convention
```
Prefix: .kinetic-{component-name}__{element}--{modifier}

Examples:
✓ .kinetic-button              (Component base)
✓ .kinetic-button__icon        (Element)
✓ .kinetic-button--loading     (Modifier/variant)
✓ .kinetic-button--disabled    (State)
✓ .kinetic-card__header--dark  (Element variant)

Structure:
Base:       .kinetic-{component}
Elements:   .kinetic-{component}__{element}
Modifiers:  .kinetic-{component}--{state}
Combined:   .kinetic-{component}__{element}--{modifier}
```

#### Example Classes
```css
/* Button component structure */
.kinetic-button {
  /* base styles */
}

.kinetic-button__icon {
  /* icon within button */
}

.kinetic-button--primary {
  /* primary variant */
}

.kinetic-button--loading {
  /* loading state */
}

.kinetic-button--disabled {
  /* disabled state */
}

/* Card component structure */
.kinetic-card {
  /* base card */
}

.kinetic-card__header {
  /* card header section */
}

.kinetic-card__content {
  /* card content section */
}

.kinetic-card__footer {
  /* card footer section */
}

.kinetic-card--elevated {
  /* elevated variant */
}
```

### 3. Component Type Names

#### TypeScript Export Pattern
```typescript
// For component props
export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "striped" | "bordered";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  items: DataTableItem[];
}

// For variant types
import type { VariantProps } from "tailwind-variants";
export type DataTableVariants = VariantProps<typeof dataTableVariants>;

// For style variants
export interface DataTableStyleProps extends VariantProps<typeof dataTableVariants> {}
```

### 4. Export Pattern

#### Main Component Export (packages/react/src/index.ts)
```typescript
// This file already exports all components automatically
// via: export * from "./components";

// Each component's index.ts should export:
export { DataTable } from "./data-table";
export type { DataTableProps } from "./data-table";
export { dataTableVariants } from "@kinetic/styles";
export type { DataTableVariants } from "@kinetic/styles";
```

### 5. Storybook Stories

#### Story File Pattern
```typescript
// File: packages/react/src/components/data-table/data-table.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [/* ... */],
  },
};

export const Striped: Story = {
  args: {
    variant: "striped",
    items: [/* ... */],
  },
};
```

---

## Recommended New Packages for @kinetic Namespace

### 1. @kinetic/primitives
**Purpose:** Unstyled, headless component primitives
```
Features:
- Base component logic without styling
- Focus management hooks
- Accessibility utilities
- Open for custom styling
```

### 2. @kinetic/forms
**Purpose:** Form-specific utilities and components
```
Features:
- Form state management
- Validation utilities
- Field components (Input, TextArea, Select, etc.)
- Form context provider
```

### 3. @kinetic/icons
**Purpose:** Icon library
```
Features:
- SVG-based icons
- Consistent sizing
- Color variants
- Animation support
```

### 4. @kinetic/hooks
**Purpose:** Reusable React hooks
```
Features:
- useFocus, useHover, etc.
- useLocalStorage
- useMediaQuery
- Custom form hooks
```

### 5. @kinetic/utils
**Purpose:** Utility functions
```
Features:
- Type guards
- String utilities
- Array utilities
- Class merging (extends tailwind-merge)
```

### 6. @kinetic/motion
**Purpose:** Animation components
```
Features:
- Animated transitions
- Motion presets
- Fade, slide, scale animations
- Custom motion provider
```

### 7. @kinetic/data-table
**Purpose:** Advanced data table component
```
Features:
- Sorting
- Filtering
- Pagination
- Column resizing
- Cell customization
```

### 8. @kinetic/charts
**Purpose:** Chart components
```
Features:
- Line, bar, pie charts
- Customizable themes
- Responsive layouts
- Animation support
```

---

## Adding a Custom Primitive Component

### Step 1: Create Directory
```bash
mkdir -p packages/react/src/components/my-component
```

### Step 2: Create Component File
```typescript
// packages/react/src/components/my-component/my-component.tsx

import React from "react";
import type { MyComponentVariants } from "@kinetic/styles";
import { myComponentVariants } from "@kinetic/styles";

export interface MyComponentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
          MyComponentVariants {
  // Add component-specific props here
}

export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ className, variant, ...props }, ref) => {
  const classes = myComponentVariants({ variant });
  
  return (
    <div
      ref={ref}
      className={classes.base}
      {...props}
    />
  );
});

MyComponent.displayName = "MyComponent";
```

### Step 3: Create Styles
```typescript
// packages/styles/src/components/my-component/my-component.styles.ts

import { tv } from "tailwind-variants";

export const myComponentVariants = tv({
  slots: {
    base: "my-component",
    icon: "my-component__icon",
  },
  variants: {
    variant: {
      default: {
        base: "my-component--default",
      },
      outlined: {
        base: "my-component--outlined",
      },
    },
    size: {
      sm: {
        base: "my-component--sm",
      },
      md: {
        base: "my-component--md",
      },
      lg: {
        base: "my-component--lg",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
```

### Step 4: Create Index File
```typescript
// packages/react/src/components/my-component/index.ts

export { MyComponent } from "./my-component";
export type { MyComponentProps } from "./my-component";
export { myComponentVariants } from "@kinetic/styles";
export type { MyComponentVariants } from "@kinetic/styles";
```

### Step 5: Create Stories (Optional)
```typescript
// packages/react/src/components/my-component/my-component.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "outlined"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};
```

---

## Theme Customization

### Extending Color Tokens
```typescript
// packages/styles/src/components/my-component/my-component.styles.ts

export const myComponentVariants = tv({
  slots: {
    base: [
      "my-component",
      "bg-kinetic-background",
      "text-kinetic-foreground",
      "border-kinetic-border",
    ],
  },
  variants: {
    colorScheme: {
      primary: {
        base: "bg-kinetic-primary text-kinetic-primary-foreground",
      },
      secondary: {
        base: "bg-kinetic-secondary text-kinetic-secondary-foreground",
      },
      accent: {
        base: "bg-kinetic-accent text-kinetic-accent-foreground",
      },
    },
  },
});
```

### Custom Tailwind Variants
```typescript
// Use tailwind-variants for complex styling

import { tv } from "tailwind-variants";

export const customVariant = tv({
  slots: {
    wrapper: "flex items-center gap-2",
    content: "flex-1",
    action: "flex-shrink-0",
  },
  variants: {
    interactive: {
      true: {
        wrapper: "cursor-pointer hover:bg-kinetic-hover active:bg-kinetic-active",
      },
    },
  },
});
```

---

## Checklist for Adding New Components

- [ ] Create component directory in `packages/react/src/components/`
- [ ] Create styles in `packages/styles/src/components/`
- [ ] Add component file with TypeScript types
- [ ] Add styles variant with TV (tailwind-variants)
- [ ] Create index.ts exports
- [ ] Add stories for Storybook (optional)
- [ ] Update main component exports
- [ ] Test imports and type checking
- [ ] Run lint and format checks
- [ ] Build and verify bundle size

---

## Build & Test Commands

```bash
# Build all packages
pnpm build

# Build react package specifically
pnpm build:react

# Type checking
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format:fix

# Storybook development
pnpm start:storybook

# Build Storybook
pnpm build:storybook
```

---

## Directory Structure Reference

```
kinetic/
├── packages/
│   ├── react/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   └── [new-component]/
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── styles/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   └── [new-component]/
│   │   │   └── index.ts
│   │   └── package.json
│   └── standard/
│       └── package.json
└── apps/
    ├── docs/
    └── storybook/
```

---

## Best Practices

1. **Always use @kinetic scope** for internal imports
2. **Use kebab-case** for file/folder names
3. **Use PascalCase** for component names
4. **Use camelCase** for export names and variants
5. **Prefix CSS classes** with `.kinetic-`
6. **Keep components focused** - single responsibility
7. **Export types** alongside components
8. **Write stories** for visual testing
9. **Use compound component pattern** (e.g., `Card.Header`, `Card.Content`)
10. **Leverage React Aria** for accessibility primitives

---

## References

- Tailwind Variants: https://www.tailwind-variants.org/
- React Aria: https://react-spectrum.adobe.com/react-aria/
- Compound Components: https://www.patterns.dev/react/compound-component-pattern/

