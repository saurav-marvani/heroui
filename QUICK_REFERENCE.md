# Kinetic UI - Quick Reference Card

## What Changed

| Before | After |
|--------|-------|
| `@heroui/react` | `@kinetic/react` |
| `@heroui/styles` | `@kinetic/styles` |
| `@heroui/standard` | `@kinetic/standard` |
| `.heroui-button` | `.kinetic-button` |
| `HeroUI` | `Kinetic UI` |

---

## Import Updates

### ❌ Old Imports (No Longer Work)
```typescript
import { Button } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
```

### ✅ New Imports (Use These)
```typescript
import { Button } from "@kinetic/react";
import { buttonVariants } from "@kinetic/styles";
```

---

## CSS Class Naming

### Pattern
```
.kinetic-{component}__{element}--{modifier}
```

### Examples
```css
.kinetic-button              /* Base component */
.kinetic-button--primary     /* Variant/Color */
.kinetic-button--loading     /* State */
.kinetic-button__icon        /* Element */
.kinetic-button__icon--left  /* Element variant */
```

---

## Common Components

```typescript
import {
  Button,
  Card,
  Modal,
  Input,
  Select,
  Tabs,
  Accordion,
  Breadcrumbs,
  Badge,
  Alert,
  Toast,
  Popover,
  Dropdown,
  Avatar,
  // ... and 90+ more
} from "@kinetic/react";
```

---

## Adding Custom Components

### File Structure
```
packages/react/src/components/my-component/
├── my-component.tsx           # Component code
├── my-component.stories.tsx   # Storybook (optional)
└── index.ts                   # Exports

packages/styles/src/components/my-component/
├── my-component.styles.ts     # Styles
└── index.ts                   # Exports
```

### Minimal Component Example
```typescript
// packages/react/src/components/my-component/my-component.tsx
import { forwardRef } from "react";
import type { MyComponentVariants } from "@kinetic/styles";
import { myComponentVariants } from "@kinetic/styles";

export const MyComponent = forwardRef<HTMLDivElement, any>(
  ({ variant = "default", ...props }, ref) => {
    const { base } = myComponentVariants({ variant });
    return <div ref={ref} className={base} {...props} />;
  }
);

MyComponent.displayName = "MyComponent";
```

```typescript
// packages/styles/src/components/my-component/my-component.styles.ts
import { tv } from "tailwind-variants";

export const myComponentVariants = tv({
  slots: {
    base: "my-component",
  },
  variants: {
    variant: {
      default: { base: "my-component--default" },
    },
  },
});
```

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build
pnpm build
pnpm build:react

# Validation
pnpm typecheck
pnpm lint
pnpm lint:fix

# Format
pnpm format:fix

# Storybook
pnpm start:storybook

# Docs
pnpm dev:docs
```

---

## Package Naming Convention

```
@kinetic/{package-name}

✅ Recommended:
- @kinetic/react           (components)
- @kinetic/styles          (variants)
- @kinetic/primitives      (headless)
- @kinetic/forms           (form utilities)
- @kinetic/icons           (icons)
- @kinetic/hooks           (hooks)
- @kinetic/utils           (utilities)
- @kinetic/motion          (animations)
```

---

## File Naming Convention

```
Format: kebab-case

✅ Correct:
- my-component.tsx
- button-group/
- card-header.tsx

❌ Incorrect:
- MyComponent.tsx
- ButtonGroup/
- CardHeader.tsx
```

---

## Component Type Export Pattern

```typescript
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

export const myVariants = tv({
  // ... config
});

// Export type for component props
export type MyVariants = VariantProps<typeof myVariants>;
```

---

## CSS Class Patterns by Component

### Base Components
```
.kinetic-button
.kinetic-card
.kinetic-input
.kinetic-select
.kinetic-modal
```

### Nested Elements
```
.kinetic-card__header
.kinetic-card__content
.kinetic-card__footer

.kinetic-modal__backdrop
.kinetic-modal__content
```

### States & Variants
```
.kinetic-button--primary
.kinetic-button--secondary
.kinetic-button--loading
.kinetic-button--disabled
.kinetic-button--large
```

---

## TypeScript Configuration

### Updated Path Aliases
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@kinetic/react": ["packages/react/src"],
      "@kinetic/styles": ["packages/styles/src"],
      "@kinetic/standard": ["packages/standard"]
    }
  }
}
```

---

## Documentation Reference

| Document | Purpose |
|----------|---------|
| `REBRANDING_COMPLETE.md` | Overview & status |
| `REBRANDING_SUMMARY.md` | Detailed changes |
| `NAMING_AND_CUSTOMIZATION.md` | Conventions & how to add components |
| `DEVELOPER_GUIDE.md` | Technical reference |
| `README.md` | Main project readme |

---

## Migration Checklist

- [ ] Update package.json dependencies
- [ ] Update all imports from `@heroui/*` to `@kinetic/*`
- [ ] Update CSS custom selectors
- [ ] Update documentation
- [ ] Run type checking: `pnpm typecheck`
- [ ] Run tests: `pnpm test`
- [ ] Build: `pnpm build`
- [ ] Verify in browser

---

## Common Issues & Solutions

### Import Not Found
```
❌ Error: Cannot find module '@heroui/react'
✅ Solution: Update to '@kinetic/react'
```

### CSS Classes Not Working
```
❌ Old: <button className="heroui-button">Click</button>
✅ New: <button className="kinetic-button">Click</button>
```

### TypeScript Path Resolution
```
❌ Can't resolve '@kinetic/styles'
✅ Run: pnpm install
✅ Check: tsconfig.json path aliases
```

---

## Quick Links

- **GitHub:** https://github.com/heroui-inc/kinetic
- **Website:** https://kinetic-ui.com
- **NPM:** https://npmjs.com/@kinetic/react
- **Docs:** https://kinetic-ui.com/docs
- **Storybook:** https://storybook-v3.kinetic-ui.com

---

## Namespace Ready for Expansion

Current packages:
- ✅ @kinetic/react
- ✅ @kinetic/styles
- ✅ @kinetic/standard

Ready to add:
- 📦 @kinetic/primitives
- 📦 @kinetic/forms
- 📦 @kinetic/icons
- 📦 @kinetic/hooks
- 📦 @kinetic/utils
- 📦 @kinetic/motion
- 📦 @kinetic/data-table
- 📦 @kinetic/charts

---

## Support

Need help?
1. Check relevant `.md` file (see Documentation Reference)
2. Review examples in this card
3. Look at existing components in `packages/react/src/components/`
4. Check GitHub Issues or Discussions

---

**Last Updated:** July 15, 2026  
**Status:** Production Ready  
**Version:** Kinetic UI v3

