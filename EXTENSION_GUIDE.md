# Kinetic UI - Extension & Customization Guide

## Overview
After the successful rebranding from HeroUI to Kinetic UI, the codebase is now organized under the `@kinetic/*` namespace, providing a clean foundation for adding custom components, primitives, and extensions.

---

## Architecture Overview

### Current Namespace Structure
```
@kinetic/
├── ui              - Main React component library (formerly @heroui/react)
├── styles          - Tailwind CSS plugin & base styles
├── standard        - Code style & linting standards
└── system          - Design system primitives (if applicable)
```

### Recommended Future Packages
```
@kinetic/
├── ui                  ✓ (Exists - Main components)
├── styles              ✓ (Exists - Styles & variants)
├── standard            ✓ (Exists - Dev tools)
├── primitives          ← Recommended first addition
├── forms               ← Common extension
├── hooks               ← Utility collection
├── utils               ← Helper functions
├── icons               ← Icon system
├── themes              ← Theme packages
├── motion              ← Animation utilities
└── [custom-packages]   ← Organization-specific
```

---

## Adding Custom Components

### Method 1: Extend @kinetic/ui (Easiest)

Add new components directly to the existing package:

```
packages/react/src/components/
├── button/              ✓ (Exists)
├── card/                ✓ (Exists)
├── my-custom-component/ ← Add here
│   ├── index.ts
│   ├── my-custom-component.tsx
│   ├── my-custom-component.stories.tsx
│   └── my-custom-component.test.tsx
└── index.ts             ← Update to export new component
```

#### Step-by-step:

1. **Create component file:**
```typescript
// packages/react/src/components/my-custom-component/my-custom-component.tsx
import React from "react";
import { cn } from "@kinetic/styles";

export interface MyCustomComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary";
}

export const MyCustomComponent = React.forwardRef<
  HTMLDivElement,
  MyCustomComponentProps
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("kinetic-my-custom-component", `kinetic-my-custom-component--${variant}`, className)}
    {...props}
  />
));

MyCustomComponent.displayName = "MyCustomComponent";
```

2. **Export from index:**
```typescript
// packages/react/src/components/my-custom-component/index.ts
export { MyCustomComponent } from "./my-custom-component";
export type { MyCustomComponentProps } from "./my-custom-component";
```

3. **Update main package index:**
```typescript
// packages/react/src/index.ts
export { MyCustomComponent } from "./components/my-custom-component";
export type { MyCustomComponentProps } from "./components/my-custom-component";
```

4. **Add styles (if needed):**
```typescript
// packages/styles/src/components/my-custom-component/index.ts
import { tv } from "tailwind-variants";

export const myCustomComponent = tv({
  base: "kinetic-my-custom-component",
  variants: {
    variant: {
      default: "bg-default-100 text-default-900",
      primary: "bg-primary-100 text-primary-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
```

### Method 2: Create New Package (Advanced)

For significant feature sets, create a dedicated package:

1. **Create package directory:**
```bash
mkdir -p packages/my-custom-package/src
```

2. **Create package.json:**
```json
{
  "name": "@kinetic/my-custom-package",
  "version": "1.0.0",
  "description": "Custom Kinetic UI package",
  "license": "MIT",
  "author": "Kinetic UI <support@kinetic-ui.com>",
  "homepage": "https://kinetic-ui.com",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./src/index.ts"
    },
    "./package.json": "./package.json"
  },
  "dependencies": {
    "@kinetic/styles": "workspace:*",
    "@kinetic/ui": "workspace:*"
  },
  "devDependencies": {
    "@kinetic/standard": "workspace:*"
  }
}
```

3. **Copy TypeScript config:**
```bash
cp packages/react/tsconfig.json packages/my-custom-package/
```

4. **Add to root package.json workspaces:**
```json
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

---

## Creating Custom Themes

### Theme Structure
```
packages/styles/src/themes/
├── default/           ✓ (Exists)
├── dark/              (Optional)
├── custom-theme/      ← Add here
│   ├── variables.css
│   ├── index.css
│   └── index.ts
```

### Create Custom Theme:

```css
/* packages/styles/src/themes/custom-theme/variables.css */
:where(.kinetic-theme-custom) {
  /* Define your color variables */
  --kinetic-primary: #FF6B6B;
  --kinetic-secondary: #4ECDC4;
  --kinetic-success: #45B7D1;
  --kinetic-warning: #FFA500;
  --kinetic-danger: #FF6B6B;
  
  /* Define your spacing */
  --kinetic-spacing-unit: 4px;
  
  /* Define your radius */
  --kinetic-radius-sm: 4px;
  --kinetic-radius-md: 8px;
  --kinetic-radius-lg: 16px;
}
```

### Export and Use:

```typescript
// packages/styles/src/themes/custom-theme/index.ts
export { default as customTheme } from "./variables.css";

// Usage in your app
import "@kinetic/styles/themes/custom-theme";

// Apply theme class
<div className="kinetic-theme-custom">
  {/* Your content with custom theme */}
</div>
```

---

## Creating Custom Hooks

### Hook Package Structure
```
packages/hooks/
├── src/
│   ├── useCustomHook.ts
│   ├── useAnotherHook.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Example Hook:

```typescript
// packages/hooks/src/useCustomHook.ts
import { useState, useCallback } from "react";

export interface UseCustomHookOptions {
  initialValue?: string;
  onChanged?: (value: string) => void;
}

export function useCustomHook(options: UseCustomHookOptions = {}) {
  const { initialValue = "", onChanged } = options;
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChanged?.(newValue);
    },
    [onChanged]
  );

  return {
    value,
    setValue: handleChange,
    reset: () => handleChange(initialValue),
  };
}
```

---

## Extending Tailwind Configuration

### Add Custom Variants

```typescript
// packages/styles/src/tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        kinetic: {
          50: "#f9fafb",
          100: "#f3f4f6",
          // ... add custom colors
        },
      },
      spacing: {
        kinetic: {
          xs: "0.5rem",
          sm: "1rem",
          md: "1.5rem",
          // ... add custom spacing
        },
      },
    },
  },
  plugins: [
    // Add custom plugins here
  ],
} satisfies Config;
```

---

## Component Registry System

### Adding Components to Registry

```typescript
// packages/react/src/components/index.ts
export { Button } from "./button";
export { Card } from "./card";
export { MyCustomComponent } from "./my-custom-component";

// Update component registry for documentation
export const componentRegistry = {
  Button: {
    name: "Button",
    description: "A flexible button component",
    path: "./button",
  },
  Card: {
    name: "Card",
    description: "A container component",
    path: "./card",
  },
  MyCustomComponent: {
    name: "MyCustomComponent",
    description: "Custom component description",
    path: "./my-custom-component",
  },
};
```

---

## Testing Custom Components

### Jest Setup
```typescript
// packages/react/src/components/my-custom-component/__tests__/my-custom-component.test.tsx
import { render, screen } from "@testing-library/react";
import { MyCustomComponent } from "../my-custom-component";

describe("MyCustomComponent", () => {
  it("renders correctly", () => {
    render(<MyCustomComponent>Test</MyCustomComponent>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies variant correctly", () => {
    const { container } = render(<MyCustomComponent variant="primary" />);
    expect(container.querySelector(".kinetic-my-custom-component--primary")).toBeInTheDocument();
  });
});
```

---

## Building & Publishing Custom Packages

### Build All Packages
```bash
pnpm build
```

### Build Specific Package
```bash
pnpm build --filter=@kinetic/my-package
```

### Publish to NPM
```bash
# Requires npm access to @kinetic scope
pnpm publish --filter=@kinetic/my-package --access public
```

### Version Bump
```bash
pnpm version:bump
```

---

## Styling Best Practices

### CSS Class Naming
Always use the `kinetic-` prefix:
```css
.kinetic-component-name
.kinetic-component-name--variant
.kinetic-component-name__element
```

### Using tailwind-variants
```typescript
import { tv } from "tailwind-variants";

const myComponent = tv({
  base: "kinetic-my-component inline-flex items-center",
  variants: {
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
    color: {
      primary: "bg-primary-500 text-white",
      secondary: "bg-secondary-500 text-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export const MyComponent = ({ size, color, ...props }) => (
  <div className={myComponent({ size, color })} {...props} />
);
```

---

## Documentation

### Add Storybook Stories
```typescript
// packages/react/src/components/my-custom-component/my-custom-component.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyCustomComponent } from "./my-custom-component";

const meta = {
  title: "Components/MyCustomComponent",
  component: MyCustomComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MyCustomComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
```

---

## Development Workflow

### Start Development
```bash
# Watch mode for development
pnpm dev

# Build on changes
pnpm dev --filter=@kinetic/ui

# Run storybook
pnpm start:storybook
```

### Testing
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run linting
pnpm lint

# Fix linting errors
pnpm lint:fix

# Type checking
pnpm typecheck
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feat/my-custom-component

# Make changes and commit
git add .
git commit -m "feat: add MyCustomComponent"

# Push and create PR
git push origin feat/my-custom-component
```

---

## Performance Optimization

### Tree-shaking
Ensure components are properly exported:
```typescript
// Good - enables tree-shaking
export { MyComponent } from "./my-component";

// Avoid - prevents tree-shaking
export * from "./my-component";
```

### Code Splitting
Use dynamic imports for heavy components:
```typescript
import { lazy } from "react";

const HeavyComponent = lazy(() => import("./heavy-component"));

export default function App() {
  return <HeavyComponent />;
}
```

---

## Migration from HeroUI

If migrating HeroUI extensions to Kinetic UI:

1. **Update package imports:**
```typescript
// Old
import { Button } from "@heroui/react";

// New
import { Button } from "@kinetic/ui";
```

2. **Update CSS classes:**
```typescript
// Old
<div className="heroui-button">

// New
<div className="kinetic-button">
```

3. **Update style imports:**
```typescript
// Old
import "@heroui/styles";

// New
import "@kinetic/styles";
```

---

## Troubleshooting

### Issue: Module not found @kinetic/package
**Solution:** Ensure package is added to `pnpm-workspace.yaml` and `package.json` workspaces field.

### Issue: Styles not loading
**Solution:** Verify CSS imports are in correct order and `@kinetic/styles` is installed.

### Issue: TypeScript errors with components
**Solution:** Run `pnpm typecheck` to identify issues and ensure `tsconfig.json` paths are correct.

### Issue: Build fails
**Solution:** Clear cache: `pnpm clean:cache && pnpm i`

---

## Resources

- **Main Docs:** https://kinetic-ui.com
- **Storybook:** http://localhost:6006 (local dev)
- **GitHub:** https://github.com/kinetic-ui/kinetic
- **NPM:** https://npmjs.com/@kinetic/ui

---

## Support

For questions or issues with extending Kinetic UI:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact: support@kinetic-ui.com

---

**Last Updated:** July 2026
**Version:** 1.0.0
