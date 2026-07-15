# Migration Guide: HeroUI → Kinetic UI

## Overview
This guide helps you migrate your projects from HeroUI (@heroui/*) to Kinetic UI (@kinetic/*). The good news: **no component APIs have changed**, only package names and imports!

---

## Quick Migration (5 minutes)

### Step 1: Uninstall HeroUI packages
```bash
npm uninstall @heroui/react @heroui/styles
# or
yarn remove @heroui/react @heroui/styles
# or
pnpm remove @heroui/react @heroui/styles
```

### Step 2: Install Kinetic UI packages
```bash
npm install @kinetic/ui @kinetic/styles
# or
yarn add @kinetic/ui @kinetic/styles
# or
pnpm add @kinetic/ui @kinetic/styles
```

### Step 3: Update imports
Replace all imports in your codebase:

**Find & Replace (Most IDEs support this):**
- Find: `@heroui/react`
- Replace with: `@kinetic/ui`

**Find & Replace:**
- Find: `@heroui/styles`
- Replace with: `@kinetic/styles`

### Step 4: Update CSS classes (if using custom classes)
Replace all CSS class prefixes:

**Find & Replace:**
- Find: `heroui-`
- Replace with: `kinetic-`

---

## Detailed Migration Steps

### In package.json

**Before:**
```json
{
  "dependencies": {
    "@heroui/react": "^3.0.0",
    "@heroui/styles": "^3.0.0"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@kinetic/ui": "^3.0.0",
    "@kinetic/styles": "^3.0.0"
  }
}
```

### In TypeScript/JavaScript files

**Before:**
```typescript
import { Button, Card, Modal } from "@heroui/react";
import { cn } from "@heroui/react";

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

**After:**
```typescript
import { Button, Card, Modal } from "@kinetic/ui";
import { cn } from "@kinetic/ui";

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### In CSS/JSX with class names

**Before:**
```jsx
<div className="heroui-button heroui-button--primary">
  Click me
</div>

<style>
  .heroui-custom {
    /* styles */
  }
</style>
```

**After:**
```jsx
<div className="kinetic-button kinetic-button--primary">
  Click me
</div>

<style>
  .kinetic-custom {
    /* styles */
  }
</style>
```

### In style imports

**Before:**
```typescript
// In your main.tsx or app.tsx
import "@heroui/styles";
```

**After:**
```typescript
// In your main.tsx or app.tsx
import "@kinetic/styles";
```

### In Next.js projects

**Before (next.config.js):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
};

module.exports = nextConfig;
```

**After (no changes needed, but verify imports):**
All component imports just need to be updated as shown above.

### In Tailwind CSS configuration

**Before:**
```javascript
module.exports = {
  plugins: [require("@heroui/react/plugin")],
};
```

**After:**
```javascript
module.exports = {
  plugins: [require("@kinetic/ui/plugin")],
};
```

---

## Component Changes

### No API Changes ✅
All components work exactly the same way! Only imports changed:

```typescript
// Same API, different import
import { Button } from "@kinetic/ui";

<Button
  color="primary"
  size="lg"
  startContent={<IconAdd />}
  onPress={() => console.log("clicked")}
>
  Add Item
</Button>
```

### Component List
All these components work the same way, just with updated imports:

- Accordion
- Avatar
- Badge
- Breadcrumbs
- Button
- Card
- Checkbox
- Chip
- Code
- Divider
- Dropdown
- Form
- Image
- Input
- Link
- Modal
- Navbar
- Pagination
- Progress
- Radio
- Select
- Skeleton
- Slider
- Spacer
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Tooltip
- User
- And more...

---

## Automated Migration Script

If you have a large codebase, use this script to automate the migration:

### Using sed (macOS/Linux)

```bash
# Replace @heroui/react imports
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) ! -path "*/node_modules/*" -exec sed -i 's/@heroui\/react/@kinetic\/ui/g' {} +

# Replace @heroui/styles imports
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) ! -path "*/node_modules/*" -exec sed -i 's/@heroui\/styles/@kinetic\/styles/g' {} +

# Replace CSS class prefixes
find . -type f \( -name "*.css" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) ! -path "*/node_modules/*" -exec sed -i 's/heroui-/kinetic-/g' {} +
```

### Using Node.js script

Create `migrate.js`:

```javascript
const fs = require('fs');
const path = require('path');

const patterns = [
  { find: /@heroui\/react/g, replace: '@kinetic/ui' },
  { find: /@heroui\/styles/g, replace: '@kinetic/styles' },
  { find: /heroui-/g, replace: 'kinetic-' },
];

function migrateFile(filePath) {
  if (filePath.includes('node_modules')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  patterns.forEach(({ find, replace }) => {
    if (find.test(content)) {
      content = content.replace(find, replace);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Migrated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
        walkDir(fullPath);
      }
    } else if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css'].some(ext => file.endsWith(ext))) {
      migrateFile(fullPath);
    }
  });
}

walkDir('./');
console.log('Migration complete!');
```

Run it:
```bash
node migrate.js
```

---

## Testing After Migration

### 1. Run your dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 2. Check for build errors
Look for:
- Module not found errors
- Import errors
- TypeScript errors

### 3. Verify in browser
- Check that UI looks correct
- Test interactive components
- Verify no console errors

### 4. Run tests (if you have them)
```bash
npm run test
# or
yarn test
# or
pnpm test
```

---

## Common Issues & Solutions

### Issue: "Cannot find module '@kinetic/ui'"
**Cause:** Package not installed or cache not cleared
**Solution:**
```bash
npm install
# or
rm -rf node_modules pnpm-lock.yaml && pnpm install
# or
rm -rf node_modules yarn.lock && yarn install
```

### Issue: Styles not loading
**Cause:** Import statement missed or wrong order
**Solution:** Verify this import is in your main file:
```typescript
import "@kinetic/styles";
```

### Issue: TypeScript errors for kinetic imports
**Cause:** Type definitions not found
**Solution:**
```bash
pnpm add -D @types/kinetic
# Usually this auto-installs, but if not, manually add types
```

### Issue: CSS classes not working (.kinetic-*)
**Cause:** Old CSS class names still in code
**Solution:** Search for `heroui-` and replace with `kinetic-`

### Issue: Tailwind not picking up Kinetic styles
**Cause:** Plugin not configured correctly
**Solution:** Verify `tailwind.config.js`:
```javascript
module.exports = {
  plugins: [require("@kinetic/ui/plugin")],
};
```

---

## Rollback (If needed)

If you need to rollback to HeroUI:

```bash
# Remove Kinetic packages
npm uninstall @kinetic/ui @kinetic/styles

# Reinstall HeroUI
npm install @heroui/react@^3 @heroui/styles@^3

# Revert imports using git or find/replace
# Find: @kinetic/ui
# Replace: @heroui/react
```

---

## Version Compatibility

| HeroUI | Kinetic UI | React | Tailwind |
|--------|-----------|-------|----------|
| v3.0.0 | v3.0.0    | 19+   | 4.0+     |
| v2.x   | Not yet   | 18+   | 3.x      |

---

## Next Steps

1. ✅ Uninstall @heroui packages
2. ✅ Install @kinetic packages
3. ✅ Update imports in your code
4. ✅ Update CSS class names
5. ✅ Test your application
6. ✅ Deploy with confidence!

---

## Need Help?

- **Documentation:** https://kinetic-ui.com
- **GitHub Issues:** https://github.com/kinetic-ui/kinetic/issues
- **GitHub Discussions:** https://github.com/kinetic-ui/kinetic/discussions
- **Email:** support@kinetic-ui.com

---

## What's New in Kinetic UI

While maintaining backward compatibility for component APIs:

- ✨ Fresh branding and identity
- 🚀 Improved performance
- 📚 Enhanced documentation
- 🎨 More customization options
- 🔧 Better developer experience
- 🌐 Expanded community

---

**Happy migrating! Welcome to Kinetic UI! 🎉**

---

**Last Updated:** July 2026
**Migration Version:** 1.0.0
