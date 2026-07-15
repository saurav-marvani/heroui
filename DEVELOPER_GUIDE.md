# Kinetic UI - Developer Guide

## Quick Start for Development

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/heroui-inc/kinetic.git
cd kinetic

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development Commands
```bash
# Build all packages
pnpm build

# Build React package specifically
pnpm build:react

# Watch mode development
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format:fix

# Storybook
pnpm start:storybook
pnpm build:storybook

# Documentation site
pnpm dev:docs
pnpm build:docs

# Add new component
pnpm add:component
```

---

## Project Structure

```
kinetic/
├── packages/
│   ├── react/                           # @kinetic/react
│   │   ├── src/
│   │   │   ├── components/              # React components
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── modal/
│   │   │   │   ├── input/
│   │   │   │   └── [100+ components]
│   │   │   ├── hooks/                   # React hooks
│   │   │   ├── utils/                   # Utility functions
│   │   │   ├── version.ts               # Version placeholder
│   │   │   └── index.ts                 # Main exports
│   │   ├── dist/                        # Built outputs
│   │   ├── scripts/                     # Build scripts
│   │   ├── rollup.config.mjs            # Rollup configuration
│   │   ├── tsconfig.json                # TypeScript config
│   │   └── package.json
│   │
│   ├── styles/                          # @kinetic/styles
│   │   ├── src/
│   │   │   ├── components/              # Style variants
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   └── [100+ variants]
│   │   │   └── index.ts                 # Style exports
│   │   ├── index.css                    # Main stylesheet
│   │   ├── dist/                        # Built outputs
│   │   └── package.json
│   │
│   └── standard/                        # @kinetic/standard
│       ├── tsconfig/                    # Shared TypeScript configs
│       ├── eslint-config.js             # ESLint configuration
│       └── package.json
│
├── apps/
│   ├── docs/                            # Documentation website
│   │   ├── src/
│   │   │   ├── app/                     # Next.js app
│   │   │   ├── components/              # Doc components
│   │   │   └── content/                 # MDX content
│   │   └── package.json
│   │
│   └── storybook/                       # Component showcase
│       └── package.json
│
├── package.json                         # Workspace root
├── turbo.json                           # Turbo config
├── pnpm-workspace.yaml                  # PNPM workspace
├── tsconfig.json                        # Root TypeScript config
├── REBRANDING_SUMMARY.md                # What changed (this rebranding)
└── NAMING_AND_CUSTOMIZATION.md          # Naming conventions

```

---

## Component Architecture

### Component File Structure
```
packages/react/src/components/button/
├── button.tsx                    # Component implementation
├── button.types.ts               # Type definitions (optional)
├── button.stories.tsx            # Storybook stories
├── button.test.tsx               # Unit tests (optional)
└── index.ts                       # Exports

packages/styles/src/components/button/
├── button.styles.ts              # Style variants (TV)
└── index.ts                       # Export variants
```

### Component Code Pattern
```typescript
// packages/react/src/components/button/button.tsx

import type React from "react";
import { forwardRef } from "react";

import type { ButtonVariants } from "@kinetic/styles";
import { buttonVariants } from "@kinetic/styles";

// Props interface extends both HTML attributes and style variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
          ButtonVariants {
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

// Use forwardRef for compound component pattern
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      color = "default",
      size = "md",
      isLoading,
      children,
      startContent,
      endContent,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Get class names from variants
    const slots = buttonVariants({
      color,
      size,
      variant,
    });

    return (
      <button
        ref={ref}
        className={slots.base({ className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {startContent && <span className={slots.startIcon}>{startContent}</span>}
        {children}
        {endContent && <span className={slots.endIcon}>{endContent}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
```

### Style Variant Pattern (TV)
```typescript
// packages/styles/src/components/button/button.styles.ts

import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "kinetic-button",
    "inline-flex items-center justify-center",
    "rounded-md font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  slots: {
    base: "kinetic-button",
    startIcon: "kinetic-button__start-icon mr-2",
    endIcon: "kinetic-button__end-icon ml-2",
  },
  variants: {
    variant: {
      solid: {
        base: "kinetic-button--solid",
      },
      outlined: {
        base: "kinetic-button--outlined border border-current",
      },
      light: {
        base: "kinetic-button--light",
      },
      flat: {
        base: "kinetic-button--flat",
      },
      shadow: {
        base: "kinetic-button--shadow shadow-md",
      },
      bordered: {
        base: "kinetic-button--bordered border border-current",
      },
    },
    size: {
      sm: {
        base: "kinetic-button--sm px-3 py-1.5 text-sm",
      },
      md: {
        base: "kinetic-button--md px-4 py-2 text-base",
      },
      lg: {
        base: "kinetic-button--lg px-6 py-3 text-lg",
      },
      xl: {
        base: "kinetic-button--xl px-8 py-4 text-xl",
      },
    },
    color: {
      default: {
        base: "bg-kinetic-default text-kinetic-default-foreground hover:bg-kinetic-default/90",
      },
      primary: {
        base: "bg-kinetic-primary text-kinetic-primary-foreground hover:bg-kinetic-primary/90",
      },
      secondary: {
        base: "bg-kinetic-secondary text-kinetic-secondary-foreground hover:bg-kinetic-secondary/90",
      },
      success: {
        base: "bg-kinetic-success text-kinetic-success-foreground hover:bg-kinetic-success/90",
      },
      warning: {
        base: "bg-kinetic-warning text-kinetic-warning-foreground hover:bg-kinetic-warning/90",
      },
      danger: {
        base: "bg-kinetic-danger text-kinetic-danger-foreground hover:bg-kinetic-danger/90",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 cursor-not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      color: "primary",
      className: {
        base: "border-kinetic-primary text-kinetic-primary hover:bg-kinetic-primary/10",
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
  },
});

// Export type for use in components
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### Export Pattern
```typescript
// packages/react/src/components/button/index.ts

export { Button } from "./button";
export type { ButtonProps } from "./button";
export { buttonVariants } from "@kinetic/styles";
export type { ButtonVariants } from "@kinetic/styles";
```

---

## Adding a New Component

### Step-by-Step Guide

#### 1. Create Component Directory
```bash
mkdir -p packages/react/src/components/my-awesome-component
mkdir -p packages/styles/src/components/my-awesome-component
```

#### 2. Create React Component
```typescript
// packages/react/src/components/my-awesome-component/my-awesome-component.tsx

import type React from "react";
import { forwardRef } from "react";

import type { MyAwesomeComponentVariants } from "@kinetic/styles";
import { myAwesomeComponentVariants } from "@kinetic/styles";

export interface MyAwesomeComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
          MyAwesomeComponentVariants {
  // Add custom props here
  onAction?: () => void;
}

export const MyAwesomeComponent = forwardRef<
  HTMLDivElement,
  MyAwesomeComponentProps
>(({ className, variant = "default", onAction, ...props }, ref) => {
  const slots = myAwesomeComponentVariants({ variant });

  return (
    <div
      ref={ref}
      className={slots.base({ className })}
      role="region"
      {...props}
    >
      {/* Component content */}
    </div>
  );
});

MyAwesomeComponent.displayName = "MyAwesomeComponent";
```

#### 3. Create Style Variants
```typescript
// packages/styles/src/components/my-awesome-component/my-awesome-component.styles.ts

import { tv } from "tailwind-variants";

export const myAwesomeComponentVariants = tv({
  slots: {
    base: "my-awesome-component",
    content: "my-awesome-component__content",
    header: "my-awesome-component__header",
  },
  variants: {
    variant: {
      default: {
        base: "my-awesome-component--default",
      },
      outlined: {
        base: "my-awesome-component--outlined border border-current",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MyAwesomeComponentVariants = VariantProps<
  typeof myAwesomeComponentVariants
>;
```

#### 4. Create Index Files
```typescript
// packages/react/src/components/my-awesome-component/index.ts
export { MyAwesomeComponent } from "./my-awesome-component";
export type { MyAwesomeComponentProps } from "./my-awesome-component";
export { myAwesomeComponentVariants } from "@kinetic/styles";

// packages/styles/src/components/my-awesome-component/index.ts
export { myAwesomeComponentVariants } from "./my-awesome-component.styles";
export type { MyAwesomeComponentVariants } from "./my-awesome-component.styles";
```

#### 5. Create Storybook Story (Optional)
```typescript
// packages/react/src/components/my-awesome-component/my-awesome-component.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { MyAwesomeComponent } from "./my-awesome-component";

const meta: Meta<typeof MyAwesomeComponent> = {
  title: "Components/MyAwesomeComponent",
  component: MyAwesomeComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "outlined"],
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

#### 6. Run Build & Test
```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build
pnpm build:react

# View in Storybook
pnpm start:storybook
```

---

## Naming Conventions Reference

### Files & Folders
- Use **kebab-case**: `my-component`, `my-component.tsx`, `button-group`
- Avoid camelCase and PascalCase for files

### React Components
- Use **PascalCase**: `MyComponent`, `Button`, `CardHeader`
- Use **forwardRef** for DOM elements
- Use **displayName** for debugging

### Exports & Variants
- Use **camelCase** for exports: `myComponentVariants`, `useMyHook`
- Use **PascalCase** for type exports: `MyComponentProps`, `MyComponentVariants`

### CSS Classes
- Use **kebab-case** with prefix: `.kinetic-button`, `.kinetic-card__header`
- Pattern: `.kinetic-{component}__{element}--{modifier}`
- Examples:
  - `.kinetic-button` - component base
  - `.kinetic-button__icon` - nested element
  - `.kinetic-button--primary` - variant/state

---

## Testing

### Running Tests
```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Test File Pattern
```typescript
// packages/react/src/components/button/button.test.tsx

import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Button variant="outlined">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("kinetic-button--outlined");
  });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Accessibility (a11y)

### Key Principles
1. Use semantic HTML elements
2. Implement keyboard navigation
3. Add ARIA attributes when needed
4. Test with screen readers

### Pattern Example
```typescript
// packages/react/src/components/tabs/tabs.tsx

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  aria-label?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ selectedKey, onSelectionChange, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        {...props}
      >
        {/* Tab items */}
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
```

---

## Performance

### Bundle Size
```bash
# Measure bundle size
pnpm measure-size

# Tree-shaking verification
pnpm build:react
# Check dist/ for unused code
```

### Optimization Tips
1. Use **sideEffects: false** in package.json
2. Keep components **focused and single-purpose**
3. Export only what's needed
4. Avoid circular dependencies
5. Use **React.memo** for expensive renders

---

## Git Workflow

### Branching
```bash
git checkout -b feat/my-awesome-component
```

### Commit Messages
```
feat: add my-awesome-component
fix: button variant styles
docs: update readme
refactor: simplify modal logic
chore: update dependencies
```

### Pull Requests
1. Create branch from `v3`
2. Make changes
3. Run all checks: `pnpm lint && pnpm typecheck && pnpm build`
4. Create PR with description
5. Wait for review and CI

---

## Troubleshooting

### TypeScript Errors
```bash
# Clear cache
pnpm clean:cache

# Rebuild
pnpm build

# Type check
pnpm typecheck
```

### Import Errors
- Always use `@kinetic/*` scope for internal imports
- Check if component is properly exported in index.ts
- Verify file path is correct

### Build Issues
```bash
# Clean and reinstall
pnpm clean:cache
pnpm i

# Rebuild
pnpm build
```

### Storybook Issues
```bash
# Rebuild Storybook
pnpm build:storybook

# Start fresh
rm -rf node_modules
pnpm i
pnpm start:storybook
```

---

## Resources

- **Tailwind Variants**: https://www.tailwind-variants.org/
- **React Aria**: https://react-spectrum.adobe.com/react-aria/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Storybook**: https://storybook.js.org/docs/react/get-started/introduction
- **Turbo**: https://turbo.build/repo/docs

---

## Contributing Guidelines

1. Follow the naming conventions
2. Write tests for new components
3. Add Storybook stories
4. Update documentation
5. Run linting and type checks
6. Keep components focused
7. Maintain accessibility standards
8. Optimize for bundle size

---

## Support

- GitHub Issues: https://github.com/heroui-inc/kinetic/issues
- Discussions: https://github.com/heroui-inc/kinetic/discussions
- Discord: https://discord.gg/9b6yyZKmH4

